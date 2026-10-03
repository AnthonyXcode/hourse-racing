// Avatar upload (PRD §2.6, §4.2, §5.9): sniff the real type from magic bytes, re-encode to a 256×256 WebP
// centre-crop (sharp drops EXIF/GPS and other metadata), store under a random name.
import sharp, { type Metadata } from "sharp";
import { randomBytes } from "crypto";
import { mkdirSync } from "fs";
import { unlink, writeFile } from "fs/promises";
import path from "path";
import { AVATAR_MAX_PX } from "../../shared/validation";

export const AVATAR_FILE_RE = /^[a-f0-9]{32}\.webp$/;

export type ImageKind = "png" | "jpeg" | "webp";

/** PNG / JPEG / WebP by magic bytes; anything else (GIF, SVG, PDF renamed .png…) → null. */
export function sniffImage(b: Buffer): ImageKind | null {
  if (b.length >= 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpeg";
  if (b.length >= 12 && b.toString("latin1", 0, 4) === "RIFF" && b.toString("latin1", 8, 12) === "WEBP") return "webp";
  return null;
}

/**
 * The bytes of the multipart part named `field` (first one), or null if absent / malformed.
 * Small and strict on purpose: one file field, the body is already size-capped by the raw parser.
 */
export function multipartFile(body: Buffer, contentType: string | undefined, field: string): Buffer | null {
  const m = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType ?? "");
  const boundary = m?.[1] ?? m?.[2];
  if (!boundary) return null;
  const delim = Buffer.from(`--${boundary}`);
  let pos = body.indexOf(delim);
  while (pos >= 0) {
    const start = pos + delim.length;
    if (body.subarray(start, start + 2).toString() === "--") return null; // closing delimiter
    const headEnd = body.indexOf("\r\n\r\n", start);
    if (headEnd < 0) return null;
    const head = body.subarray(start, headEnd).toString("utf8");
    const next = body.indexOf(Buffer.from(`\r\n--${boundary}`), headEnd + 4);
    if (next < 0) return null;
    const name = /content-disposition:[^\r\n]*\bname="([^"]*)"/i.exec(head)?.[1];
    if (name === field) return body.subarray(headEnd + 4, next);
    pos = next + 2;
  }
  return null;
}

export class AvatarError extends Error {
  constructor(public code: "unsupported_type") {
    super(code);
  }
}

/** Validate and re-encode: 256×256 WebP centre-crop, orientation applied, no metadata. */
export async function processAvatar(input: Buffer): Promise<Buffer> {
  if (!sniffImage(input)) throw new AvatarError("unsupported_type");
  let meta: Metadata;
  try {
    meta = await sharp(input, { limitInputPixels: AVATAR_MAX_PX * AVATAR_MAX_PX }).metadata();
  } catch {
    throw new AvatarError("unsupported_type");
  }
  if (!meta.width || !meta.height || meta.width > AVATAR_MAX_PX || meta.height > AVATAR_MAX_PX) throw new AvatarError("unsupported_type");
  try {
    return await sharp(input, { limitInputPixels: AVATAR_MAX_PX * AVATAR_MAX_PX })
      .rotate() // apply EXIF orientation before the metadata is dropped
      .resize(256, 256, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    throw new AvatarError("unsupported_type");
  }
}

export function avatarFiles(dir: string) {
  return {
    dir,
    /** Write a processed avatar under a random 128-bit name; returns the file name. */
    async save(webp: Buffer): Promise<string> {
      mkdirSync(dir, { recursive: true });
      const file = `${randomBytes(16).toString("hex")}.webp`;
      await writeFile(path.join(dir, file), webp, { flag: "wx" });
      return file;
    },
    async remove(file: string | null | undefined): Promise<void> {
      if (!file || !AVATAR_FILE_RE.test(file)) return;
      await unlink(path.join(dir, file)).catch(() => {});
    },
    /** Absolute path for a requested file name, or null if the name isn't one we could have issued. */
    resolve(file: string): string | null {
      return AVATAR_FILE_RE.test(file) ? path.join(dir, file) : null;
    },
  };
}
export type AvatarFiles = ReturnType<typeof avatarFiles>;
