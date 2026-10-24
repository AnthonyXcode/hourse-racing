#!/usr/bin/env tsx
/**
 * Rehearse browser publishing WITHOUT posting: opens each composer on the personal account, types the draft,
 * attaches the image(s), screenshots it to marketing/logs/browser/, then closes the tab (the draft is discarded).
 * Use it after browser-login.ts and whenever a site changes, before trusting live runs.
 *
 *   npx tsx marketing/scripts/browser-rehearse.ts --queue marketing/queue/2026-10-25/pre-meeting [--channel threads]
 *
 * After the screenshot it closes the composer and answers "don't save" to any draft prompt.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { loadEnv, parseArgs, MKT_DIR } from "./lib/env.js";
import { ensureJpeg, type ImageRef } from "./lib/image.js";
import { COMPOSERS, discardComposer } from "./browser/sites.js";
import { WEB_CHANNELS, openContext, runComposer, type WebChannel } from "./browser/session.js";

async function main() {
  loadEnv();
  const { opts } = parseArgs(process.argv.slice(2));
  if (!opts.queue) throw new Error("usage: browser-rehearse.ts --queue marketing/queue/<date>/<slot> [--channel facebook|instagram|threads]");
  const dir = path.resolve(opts.queue);
  const channels = (opts.channel ? [opts.channel] : WEB_CHANNELS).filter((c): c is WebChannel => (WEB_CHANNELS as readonly string[]).includes(c));
  const files = readdirSync(dir);
  const imagesFor = (c: string): ImageRef[] => {
    const own = files.filter((f) => new RegExp(`^${c}(-\\d+)?\\.(png|jpe?g)$`, "i").test(f)).sort();
    const shared = files.filter((f) => /^image(-\d+)?\.(png|jpe?g)$/i.test(f)).sort();
    return (own.length ? own : shared).map((f) => ({ localPath: path.join(dir, f) }));
  };

  const ctx = await openContext();
  let failed = 0;
  try {
    for (const c of channels) {
      const textFile = path.join(dir, `${c}.md`);
      if (!existsSync(textFile)) {
        console.log(`${c.padEnd(10)} no draft, skipped`);
        continue;
      }
      let images = imagesFor(c);
      if (c === "instagram") images = await Promise.all(images.map((i) => ensureJpeg(i, false)));
      const post = { channel: c, slot: "rehearsal/x", text: readFileSync(textFile, "utf8").trim(), images };
      try {
        const r = await runComposer(c, COMPOSERS[c], post, { submit: false, context: ctx, discard: discardComposer });
        console.log(`${c.padEnd(10)} filled OK, not posted, ${r.discarded ? "draft discarded" : "COULD NOT discard draft (delete it in the app)"}. Screenshot: ${path.relative(MKT_DIR, r.screenshot ?? "")}`);
      } catch (e) {
        failed++;
        console.error(`${c.padEnd(10)} FAILED: ${(e as Error).message}`);
      }
    }
  } finally {
    await ctx.close();
  }
  process.exit(failed ? 1 : 0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(2);
});
