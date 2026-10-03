// Login sessions (PRD §2.4, §5.6): random cookie token, only its SHA-256 stored, 30-day sliding expiry
// that is moved at most once a day.
import { createHash, randomBytes, randomUUID } from "crypto";
import type { MembersDB } from "./db";

export const COOKIE = "pt_session";
const DAY_MS = 24 * 60 * 60_000;

export const newToken = () => randomBytes(32).toString("base64url");
export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

interface Row {
  id: string;
  user_id: string;
  last_seen_at: number;
  expires_at: number;
}

export function sessionStore(db: MembersDB, ttlDays: number, now: () => number = Date.now) {
  const ttl = ttlDays * DAY_MS;
  const ins = db.prepare(
    "INSERT INTO sessions (id, user_id, token_hash, created_at, last_seen_at, expires_at, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  const byHash = db.prepare<[string], Row>("SELECT id, user_id, last_seen_at, expires_at FROM sessions WHERE token_hash = ?");
  const del = db.prepare("DELETE FROM sessions WHERE id = ?");
  const slide = db.prepare("UPDATE sessions SET last_seen_at = ?, expires_at = ? WHERE id = ?");

  return {
    ttlMs: ttl,
    /** New session for a login (a fresh token every time — no fixation). Returns the cookie token. */
    create(userId: string, userAgent?: string): string {
      const token = newToken();
      const t = now();
      ins.run(randomUUID(), userId, hashToken(token), t, t, t + ttl, userAgent ? userAgent.slice(0, 200) : null);
      return token;
    },
    /**
     * The session's user id, or null when the token is unknown or expired (expired rows are deleted).
     * `refreshed` is true when the expiry moved, so the caller re-sends the cookie with a fresh Max-Age.
     */
    lookup(token: string | undefined): { userId: string; refreshed: boolean } | null {
      if (!token || token.length > 100) return null;
      const row = byHash.get(hashToken(token));
      if (!row) return null;
      const t = now();
      if (row.expires_at <= t) {
        del.run(row.id);
        return null;
      }
      if (t - row.last_seen_at > DAY_MS) {
        slide.run(t, t + ttl, row.id);
        return { userId: row.user_id, refreshed: true };
      }
      return { userId: row.user_id, refreshed: false };
    },
    destroy(token: string | undefined): void {
      if (token) db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(hashToken(token));
    },
  };
}
export type SessionStore = ReturnType<typeof sessionStore>;

/** Minimal Cookie header parser (no dependency). */
export function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    if (!k || k in out) continue;
    try {
      out[k] = decodeURIComponent(part.slice(i + 1).trim());
    } catch {
      /* malformed value: ignore */
    }
  }
  return out;
}

export function sessionCookie(token: string, maxAgeMs: number, secure: boolean): string {
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(maxAgeMs / 1000)}${secure ? "; Secure" : ""}`;
}
export function clearedCookie(secure: boolean): string {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`;
}
