/**
 * Browser adapter: publishes a channel through the owner's logged-in personal account (Playwright + Chrome)
 * instead of the official API. Enabled per channel with BROWSER_CHANNELS (see browser/session.ts).
 * Keeps the API adapter's content checks (length limits etc.); needs no tokens.
 */
import { ensureJpeg } from "../lib/image.js";
import { COMPOSERS } from "../browser/sites.js";
import { HOME, runComposer, type WebChannel } from "../browser/session.js";
import type { Adapter, Post } from "./types.js";

export function webAdapter(channel: WebChannel, api: Adapter): Adapter {
  return {
    channel,
    requiredEnv: [],
    validate(post) {
      const errs = api.validate(post);
      if (post.images.some((i) => !i.localPath)) errs.push("browser publishing needs local image files, not URLs");
      if (channel === "instagram" && !post.images.length) errs.push("instagram needs an image");
      return errs;
    },
    plan(post) {
      return [
        `browser (personal account): open ${HOME[channel]} in Chrome profile marketing/.browser-profile`,
        `fill composer with ${[...post.text].length} chars${post.images.length ? ` + ${post.images.length} image(s)` : ""}, click Post, wait for confirmation`,
      ];
    },
    async publish(post: Post) {
      // Instagram's web uploader takes PNG, but JPEG keeps the file small and matches the API path.
      const images = channel === "instagram" ? await Promise.all(post.images.map((i) => ensureJpeg(i, false))) : post.images;
      return runComposer(channel, COMPOSERS[channel], { ...post, images }, { submit: true });
    },
  };
}
