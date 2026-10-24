import type { ImageRef } from "../lib/image.js";

export type Channel = "facebook" | "instagram" | "threads" | "telegram";
export const CHANNELS: readonly Channel[] = ["facebook", "instagram", "threads", "telegram"];

export interface Post {
  channel: Channel;
  slot: string; // YYYY-MM-DD/<slot-id>
  text: string;
  images: ImageRef[]; // 0 = text only; 2+ = carousel where supported
  parseMode?: "HTML" | "MarkdownV2"; // Telegram only
}

export interface PublishResult {
  id: string;
  url?: string;
}

export interface Adapter {
  channel: Channel;
  /** Env vars needed for a live publish. */
  requiredEnv: readonly string[];
  /** Problems that make the post unpublishable on this channel (empty = OK). */
  validate(post: Post): string[];
  /** Human-readable list of the API calls a live run would make (dry run output). */
  plan(post: Post): string[];
  publish(post: Post): Promise<PublishResult>;
}

/** Mark an error from the final "make it public" call as ambiguous when it may have succeeded. */
export function finalStep<T>(p: Promise<T>): Promise<T> {
  return p.catch((e: unknown) => {
    if (e && typeof e === "object" && "status" in e) {
      const s = (e as { status: number }).status;
      (e as { ambiguous?: boolean }).ambiguous = s === 0 || s >= 500;
    }
    throw e;
  });
}

/** Earlier steps (uploads, containers) never make anything public, so failures there are safe to retry. */
export function notFinal<T>(p: Promise<T>): Promise<T> {
  return p.catch((e: unknown) => {
    if (e && typeof e === "object" && "ambiguous" in e) (e as { ambiguous: boolean }).ambiguous = false;
    throw e;
  });
}
