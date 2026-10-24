/**
 * Facebook Page posts via the Graph API (Page access token, pages_manage_posts).
 *   text/link: POST /{page-id}/feed   message[, link]
 *   photo:     POST /{page-id}/photos url=<public url> | multipart file, caption
 * Docs: https://developers.facebook.com/docs/pages-api/posts
 *       https://developers.facebook.com/docs/graph-api/reference/page/photos
 */
import { GRAPH_VERSION, requireEnv } from "../lib/env.js";
import { fileBlob } from "../lib/image.js";
import { form, requestJson } from "../lib/http.js";
import { finalStep, type Adapter, type Post } from "./types.js";

const MAX_CHARS = 60_000; // Graph allows ~63k; anything near this is a content bug anyway
const firstUrl = (t: string) => t.match(/https?:\/\/[^\s)]+/)?.[0];

export const facebook: Adapter = {
  channel: "facebook",
  requiredEnv: ["FB_PAGE_ID", "FB_PAGE_TOKEN"],

  validate(post) {
    const errs: string[] = [];
    if ([...post.text].length > MAX_CHARS) errs.push(`text over ${MAX_CHARS} chars`);
    if (post.images.length > 1) errs.push("facebook adapter posts one photo; pass a single image");
    return errs;
  },

  plan(post) {
    const g = `graph.facebook.com/${GRAPH_VERSION()}`;
    const img = post.images[0];
    if (!img) return [`POST ${g}/{FB_PAGE_ID}/feed message=<${[...post.text].length} chars>${firstUrl(post.text) ? ` link=${firstUrl(post.text)}` : ""}`];
    return [`POST ${g}/{FB_PAGE_ID}/photos ${img.url ? `url=${img.url}` : `multipart source=${img.localPath}`} caption=<${[...post.text].length} chars>`];
  },

  async publish(post: Post) {
    const env = requireEnv(["FB_PAGE_ID", "FB_PAGE_TOKEN"] as const);
    const base = `https://graph.facebook.com/${GRAPH_VERSION()}/${env.FB_PAGE_ID}`;
    const img = post.images[0];
    let id: string;
    if (!img) {
      const r = await finalStep(requestJson<{ id: string }>(`${base}/feed`, {
        method: "POST",
        body: form({ message: post.text, link: process.env.FB_LINK_PREVIEW === "0" ? undefined : firstUrl(post.text), access_token: env.FB_PAGE_TOKEN }),
      }, { label: "facebook feed" }));
      id = r.id;
    } else {
      let body: FormData | URLSearchParams;
      if (img.url) {
        body = form({ url: img.url, caption: post.text, access_token: env.FB_PAGE_TOKEN });
      } else {
        const fd = new FormData();
        fd.set("caption", post.text);
        fd.set("access_token", env.FB_PAGE_TOKEN);
        fd.set("source", fileBlob(img.localPath!), "image.jpg");
        body = fd;
      }
      const r = await finalStep(requestJson<{ id: string; post_id?: string }>(`${base}/photos`, { method: "POST", body }, { label: "facebook photos" }));
      id = r.post_id ?? r.id;
    }
    return { id, url: `https://www.facebook.com/${id}` };
  },
};
