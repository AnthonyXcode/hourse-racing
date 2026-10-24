/**
 * Threads via the Threads API (threads_basic + threads_content_publish, long-lived user token).
 *   1. POST /{threads-user-id}/threads  media_type=TEXT|IMAGE, text, image_url   -> container
 *      carousel: items with is_carousel_item=true, then media_type=CAROUSEL children=...
 *   2. GET  /{container}?fields=status,error_message until FINISHED (Meta suggests ~30s on average)
 *   3. POST /{threads-user-id}/threads_publish creation_id                         -> media id
 * Text max 500 chars (emoji count by UTF-8 bytes). Images JPEG/PNG, <= 8 MB, public URL.
 * Docs: https://developers.facebook.com/docs/threads/posts
 */
import { requireEnv } from "../lib/env.js";
import { ensurePublicUrl } from "../lib/image.js";
import { form, pollUntil, requestJson } from "../lib/http.js";
import { finalStep, notFinal, type Adapter, type Post } from "./types.js";

const MAX_CHARS = 500;
const base = () => (process.env.THREADS_API_BASE || "https://graph.threads.com/v1.0").replace(/\/$/, "");

/** Threads counts emoji by UTF-8 byte length; everything else as one character. */
export function threadsLength(text: string): number {
  let n = 0;
  for (const ch of text) n += /\p{Extended_Pictographic}/u.test(ch) ? Buffer.byteLength(ch, "utf8") : 1;
  return n;
}

export const threads: Adapter = {
  channel: "threads",
  requiredEnv: ["THREADS_USER_ID", "THREADS_TOKEN"],

  validate(post) {
    const errs: string[] = [];
    const len = threadsLength(post.text);
    if (len > MAX_CHARS) errs.push(`threads text is ${len} > ${MAX_CHARS} (emoji count as UTF-8 bytes)`);
    if (post.images.length > 20) errs.push("threads carousel max 20 images");
    return errs;
  },

  plan(post) {
    const b = `${base()}/{THREADS_USER_ID}`;
    const src = post.images.map((i) => i.url ?? `${i.localPath} -> rsync -> IMAGE_PUBLIC_BASE_URL`);
    const steps = post.images.length === 0 ? [`POST ${b}/threads media_type=TEXT text=<${threadsLength(post.text)} chars>`]
      : post.images.length === 1 ? [`POST ${b}/threads media_type=IMAGE image_url=${src[0]} text=<...>`]
      : [...src.map((s) => `POST ${b}/threads media_type=IMAGE is_carousel_item=true image_url=${s}`), `POST ${b}/threads media_type=CAROUSEL children=<ids> text=<...>`];
    return [...steps, "GET /{container}?fields=status (poll until FINISHED)", `POST ${b}/threads_publish creation_id=<container>`];
  },

  async publish(post: Post) {
    const env = requireEnv(["THREADS_USER_ID", "THREADS_TOKEN"] as const);
    const b = base();
    const token = env.THREADS_TOKEN;
    const urls: string[] = [];
    for (const img of post.images) urls.push(await ensurePublicUrl(img, false));

    const create = (params: Record<string, string | undefined>) =>
      notFinal(requestJson<{ id: string }>(`${b}/${env.THREADS_USER_ID}/threads`, { method: "POST", body: form({ ...params, access_token: token }) }, { label: "threads container" }));

    const waitReady = (id: string) => pollUntil(async () => {
      const s = await notFinal(requestJson<{ status?: string; error_message?: string }>(`${b}/${id}?fields=status,error_message&access_token=${encodeURIComponent(token)}`, {}, { label: "threads status" }));
      if (s.status === "ERROR" || s.status === "EXPIRED") throw new Error(`threads container ${id}: ${s.status} ${s.error_message ?? ""}`);
      return s.status === "FINISHED";
    }, 5_000, 300_000, "threads container");

    let containerId: string;
    if (urls.length === 0) containerId = (await create({ media_type: "TEXT", text: post.text })).id;
    else if (urls.length === 1) containerId = (await create({ media_type: "IMAGE", image_url: urls[0], text: post.text })).id;
    else {
      const children: string[] = [];
      for (const u of urls) children.push((await create({ media_type: "IMAGE", image_url: u, is_carousel_item: "true" })).id);
      for (const c of children) await waitReady(c);
      containerId = (await create({ media_type: "CAROUSEL", children: children.join(","), text: post.text })).id;
    }
    await waitReady(containerId);

    const pub = await finalStep(requestJson<{ id: string }>(`${b}/${env.THREADS_USER_ID}/threads_publish`, {
      method: "POST", body: form({ creation_id: containerId, access_token: token }),
    }, { label: "threads_publish" }));

    let url: string | undefined;
    try {
      url = (await requestJson<{ permalink?: string }>(`${b}/${pub.id}?fields=permalink&access_token=${encodeURIComponent(token)}`, {}, { attempts: 1 })).permalink;
    } catch { /* optional */ }
    return { id: pub.id, url };
  },
};
