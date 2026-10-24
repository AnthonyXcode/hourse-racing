/**
 * Append-only JSONL publish log + per-(slot, channel) markers for idempotency.
 *
 * logs/publish.jsonl          one line per attempt/outcome, never rewritten
 * logs/slots/<mode>/<key>.json marker: claimed -> published | failed (live and dry-run kept apart)
 */
import { appendFileSync, existsSync, mkdirSync, openSync, closeSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { LOG_DIR } from "./env.js";

export type Mode = "live" | "dry-run";
export type Status = "published" | "dry-run" | "skipped-duplicate" | "skipped-unknown" | "paused" | "invalid" | "failed";

export interface LogEntry {
  ts: string;
  mode: Mode;
  slot: string;
  channel: string;
  status: Status;
  textSha?: string;
  chars?: number;
  image?: string;
  postId?: string;
  url?: string;
  error?: string;
  ambiguous?: boolean;
}

export const PUBLISH_LOG = path.join(LOG_DIR, "publish.jsonl");

export function appendLog(e: Omit<LogEntry, "ts">): void {
  mkdirSync(LOG_DIR, { recursive: true });
  appendFileSync(PUBLISH_LOG, JSON.stringify({ ts: new Date().toISOString(), ...e }) + "\n");
}

interface Marker { status: "claimed" | "published" | "failed"; at: string; postId?: string; url?: string; error?: string; ambiguous?: boolean }

function markerPath(mode: Mode, slot: string, channel: string): string {
  return path.join(LOG_DIR, "slots", mode, `${slot.replace(/[^A-Za-z0-9-]/g, "_")}__${channel}.json`);
}

export type Claim =
  | { ok: true; release: (m: Omit<Marker, "at">) => void }
  | { ok: false; existing: Marker };

/**
 * Atomically claim (slot, channel). A slot that is published, or whose last attempt may have
 * gone through (ambiguous failure / crash mid-call), is never claimed again unless force=true.
 * A clean failure (4xx, validation) can be retried by the next run.
 */
export function claim(mode: Mode, slot: string, channel: string, force = false): Claim {
  const p = markerPath(mode, slot, channel);
  mkdirSync(path.dirname(p), { recursive: true });
  if (existsSync(p) && !force) {
    const existing = JSON.parse(readFileSync(p, "utf8")) as Marker;
    if (existing.status === "published" || existing.status === "claimed" || existing.ambiguous) return { ok: false, existing };
  }
  if (force || existsSync(p)) {
    writeFileSync(p, JSON.stringify({ status: "claimed", at: new Date().toISOString() }));
  } else {
    try {
      const fd = openSync(p, "wx"); // fails if another process claimed it first
      writeFileSync(fd, JSON.stringify({ status: "claimed", at: new Date().toISOString() }));
      closeSync(fd);
    } catch {
      return { ok: false, existing: JSON.parse(readFileSync(p, "utf8")) as Marker };
    }
  }
  return { ok: true, release: (m) => writeFileSync(p, JSON.stringify({ ...m, at: new Date().toISOString() })) };
}

export function slotStatus(mode: Mode, slot: string, channel: string): Marker | null {
  const p = markerPath(mode, slot, channel);
  return existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as Marker) : null;
}
