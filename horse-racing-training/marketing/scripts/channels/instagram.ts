/**
 * Instagram professional account via the Instagram Graph API ("Instagram API with Facebook Login":
 * graph.facebook.com + the Page access token of the linked Page; instagram_content_publish).
 *   1. POST /{ig-user-id}/media  image_url (public JPEG), caption      -> container
 *      carousel: one container per image with is_carousel_item=true, then media_type=CAROUSEL children=...
 *   2. GET  /{container}?fields=status_code until FINISHED
 *   3. POST /{ig-user-id}/media_publish creation_id                     -> media id
 * Limit: 100 API-published posts per rolling 24h (carousel = 1).
 * Docs: https://developers.facebook.com/docs/instagram-platform/content-publishing
 */
import { ConfigError, GRAPH_VERSION } from "../lib/env.js";
import { ensureJpeg, ensurePublicUrl } from "../lib/image.js";
import { form, pollUntil, requestJson } from "../lib/http.js";
import { finalStep, notFinal, type Adapter, type Post } from "./types.js";

const MAX_CAPTION = 2200;
const MAX_HASHTAGS = 30;
const MAX_ITEMS = 10; // Meta now documents up to 20; 10 is the safe, app-wide carousel size

function creds() {
  const user = process.env.IG_USER_ID;
  const token = process.env.IG_TOKEN || process.env.FB_PAGE_TOKEN; // Page token works for the linked IG account
  if (!user || !token) throw new ConfigError("missing env: IG_USER_ID and FB_PAGE_TOKEN (or IG_TOKEN)");
  return { user, token };
}

export const instagram: Adapter = {
  channel: "instagram",
  requiredEnv: ["IG_USER_ID", "FB_PAGE_TOKEN"],

  validate(post) {
    const errs: string[] = [];
    if (post.images.length === 0) errs.push("instagram needs at least one image");
    if (post.images.length > MAX_ITEMS) errs.push(`instagram carousel max ${MAX_ITEMS} images`);
    if ([...post.text].length > MAX_CAPTION) errs.push(`caption over ${MAX_CAPTION} chars`);
    if ((post.text.match(/#[\p{L}\p{N}_]+/gu) ?? []).length > MAX_HASHTAGS) errs.push(`more than ${MAX_HASHTAGS} hashtags`);
    return errs;
  },

  plan(post) {
    const g = `graph.facebook.com/${GRAPH_VERSION()}/{IG_USER_ID}`;
    const src = post.images.map((i) => i.url ?? `${i.localPath} -> jpeg -> rsync -> IMAGE_PUBLIC_BASE_URL`);
    const steps = post.images.length > 1
      ? [...src.map((s) => `POST ${g}/media is_carousel_item=true image_url=${s}`), `POST ${g}/media media_type=CAROUSEL children=<ids> caption=<${[...post.text].length} chars>`]
      : [`POST ${g}/media image_url=${src[0]} caption=<${[...post.text].length} chars>`];
    return [...steps, "GET /{container}?fields=status_code (poll until FINISHED)", `POST ${g}/media_publish creation_id=<container>`];
  },

  async publish(post: Post) {
    const { user, token } = creds();
    const g = `https://graph.facebook.com/${GRAPH_VERSION()}`;
    const urls: string[] = [];
    for (const img of post.images) urls.push(await ensurePublicUrl(await ensureJpeg(img, false), false));

    const create = (params: Record<string, string | undefined>) =>
      notFinal(requestJson<{ id: string }>(`${g}/${user}/media`, { method: "POST", body: form({ ...params, access_token: token }) }, { label: "instagram media" }));

    const waitReady = (id: string) => pollUntil(async () => {
      const s = await notFinal(requestJson<{ status_code?: string }>(`${g}/${id}?fields=status_code&access_token=${encodeURIComponent(token)}`, {}, { label: "instagram status" }));
      if (s.status_code === "ERROR" || s.status_code === "EXPIRED") throw new Error(`instagram container ${id}: ${s.status_code}`);
      return s.status_code === "FINISHED";
    }, 5_000, 300_000, "instagram container");

    let containerId: string;
    if (urls.length === 1) {
      containerId = (await create({ image_url: urls[0], caption: post.text })).id;
    } else {
      const children: string[] = [];
      for (const u of urls) {
        const c = await create({ image_url: u, is_carousel_item: "true" });
        await waitReady(c.id);
        children.push(c.id);
      }
      containerId = (await create({ media_type: "CAROUSEL", children: children.join(","), caption: post.text })).id;
    }
    await waitReady(containerId);

    const pub = await finalStep(requestJson<{ id: string }>(`${g}/${user}/media_publish`, {
      method: "POST", body: form({ creation_id: containerId, access_token: token }),
    }, { label: "instagram media_publish" }));

    let url: string | undefined;
    try {
      url = (await requestJson<{ permalink?: string }>(`${g}/${pub.id}?fields=permalink&access_token=${encodeURIComponent(token)}`, {}, { attempts: 1 })).permalink;
    } catch { /* permalink is nice-to-have */ }
    return { id: pub.id, url };
  },
};
