/**
 * Images: local file or public URL. Instagram and Threads fetch images from a public URL, so a
 * local file is first copied to the web server (rsync over ssh) and served under
 * IMAGE_PUBLIC_BASE_URL, e.g. https://posttimehk.com/social/<sha>.jpg. Facebook and Telegram
 * take a multipart upload directly.
 */
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { ConfigError, MKT_DIR } from "./env.js";

const run = promisify(execFile);

export interface ImageRef {
  localPath?: string; // absolute
  url?: string; // already public
}

export function parseImageArg(arg: string | undefined): ImageRef | undefined {
  if (!arg) return undefined;
  if (/^https?:\/\//.test(arg)) return { url: arg };
  const p = path.resolve(arg);
  if (!existsSync(p)) throw new ConfigError(`image not found: ${p}`);
  return { localPath: p };
}

export function isJpegFile(p: string): boolean {
  const b = readFileSync(p).subarray(0, 3);
  return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
}

/** Instagram accepts JPEG only. Convert with macOS `sips` (no npm dependency). */
export async function ensureJpeg(ref: ImageRef, dryRun: boolean): Promise<ImageRef> {
  if (ref.url) {
    if (!/\.jpe?g(\?|$)/i.test(ref.url)) console.error(`[warn] instagram image URL is not .jpg: ${ref.url}`);
    return ref;
  }
  const p = ref.localPath!;
  if (isJpegFile(p)) return ref;
  const outDir = path.join(MKT_DIR, "out", "jpeg");
  mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, `${path.basename(p).replace(/\.[^.]+$/, "")}.jpg`);
  if (dryRun) return { localPath: out };
  await run("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "90", p, "--out", out]);
  return { localPath: out };
}

/** Content-addressed public name so re-uploads are harmless and URLs never collide. */
export function publicName(localPath: string): string {
  const sha = createHash("sha256").update(readFileSync(localPath)).digest("hex").slice(0, 16);
  return `${sha}${path.extname(localPath).toLowerCase() || ".jpg"}`;
}

/**
 * Make a local image reachable at a public URL. Needs IMAGE_PUBLIC_BASE_URL and
 * IMAGE_RSYNC_TARGET (e.g. deploy@posttimehk.com:/var/www/posttime-social/).
 */
export async function ensurePublicUrl(ref: ImageRef, dryRun: boolean): Promise<string> {
  if (ref.url) return ref.url;
  const base = process.env.IMAGE_PUBLIC_BASE_URL?.replace(/\/$/, "");
  const target = process.env.IMAGE_RSYNC_TARGET;
  const name = existsSync(ref.localPath!) ? publicName(ref.localPath!) : path.basename(ref.localPath!);
  if (dryRun) return `${base ?? "https://posttimehk.com/social"}/${name}`;
  if (!base || !target) throw new ConfigError("local image needs IMAGE_PUBLIC_BASE_URL and IMAGE_RSYNC_TARGET (or pass an https URL)");
  await run("rsync", ["-q", "--chmod=F644", ref.localPath!, `${target.replace(/\/?$/, "/")}${name}`], { timeout: 60_000 });
  const url = `${base}/${name}`;
  const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new ConfigError(`uploaded image not reachable: ${url} (HTTP ${res.status})`);
  return url;
}

/** Blob for multipart uploads (Facebook /photos, Telegram sendPhoto). */
export function fileBlob(p: string): Blob {
  const ext = path.extname(p).toLowerCase();
  const type = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
  return new Blob([readFileSync(p)], { type });
}
