// Sliding-window rate limits over rate_events (PRD §5.2, §5.3).
import type { MembersDB } from "./db";

export interface Rule {
  /** Count rows matching this phone (otherwise this IP). */
  by: "phone" | "ip";
  windowMs: number;
  max: number;
}

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const sendRules = (r: { phoneHour: number; phoneDay: number; ipHour: number }): Rule[] => [
  { by: "phone", windowMs: MIN, max: 1 },
  { by: "phone", windowMs: HOUR, max: r.phoneHour },
  { by: "phone", windowMs: DAY, max: r.phoneDay },
  { by: "ip", windowMs: HOUR, max: r.ipHour },
];
export const checkRules: Rule[] = [{ by: "ip", windowMs: HOUR, max: 30 }];

export type Kind = "send" | "check";

export function rateLimiter(db: MembersDB) {
  const byPhone = db.prepare<[Kind, string, number], { ts: number }>(
    "SELECT ts FROM rate_events WHERE kind = ? AND phone_e164 = ? AND ts > ? ORDER BY ts ASC"
  );
  const byIp = db.prepare<[Kind, string, number], { ts: number }>("SELECT ts FROM rate_events WHERE kind = ? AND ip = ? AND ts > ? ORDER BY ts ASC");
  const insert = db.prepare("INSERT INTO rate_events (kind, phone_e164, ip, ts) VALUES (?, ?, ?, ?)");

  return {
    /**
     * Seconds until another event of `kind` is allowed under every rule, or 0 if it's allowed now.
     * When a window is full, the wait is until enough of its oldest events slide out.
     */
    retryAfter(kind: Kind, rules: Rule[], key: { phone?: string | null; ip: string }, now = Date.now()): number {
      let waitMs = 0;
      for (const rule of rules) {
        if (rule.by === "phone" && !key.phone) continue;
        const rows = rule.by === "phone" ? byPhone.all(kind, key.phone!, now - rule.windowMs) : byIp.all(kind, key.ip, now - rule.windowMs);
        if (rows.length >= rule.max) {
          const freeing = rows[rows.length - rule.max]!.ts; // this event must leave the window first
          waitMs = Math.max(waitMs, freeing + rule.windowMs - now);
        }
      }
      return waitMs > 0 ? Math.ceil(waitMs / 1000) : 0;
    },
    record(kind: Kind, key: { phone?: string | null; ip: string }, now = Date.now()): void {
      insert.run(kind, key.phone ?? null, key.ip, now);
    },
    /** Remove every row for a phone (account deletion). */
    forgetPhone(phone: string): void {
      db.prepare("DELETE FROM rate_events WHERE phone_e164 = ?").run(phone);
    },
  };
}
export type RateLimiter = ReturnType<typeof rateLimiter>;
