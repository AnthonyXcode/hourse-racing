// Admin building blocks: effective role, masking, audit + access log writers, alerts and job status.
import type { MembersDB } from "../members/db";
import type { UserRow } from "../members/users";
import type { AdminConfig } from "./config";
import { scrubText, scrubValue } from "./scrub";

export type Role = "user" | "admin" | "owner";
export type StoredRole = "user" | "admin";

/** Effective role: owner when the phone is OWNER_PHONE (never stored), else the stored role (PRD §2.1). */
export function effectiveRole(user: Pick<UserRow, "phone_e164"> & { role?: string | null }, cfg: Pick<AdminConfig, "ownerPhone">): Role {
  if (cfg.ownerPhone && user.phone_e164 === cfg.ownerPhone) return "owner";
  return user.role === "admin" ? "admin" : "user";
}

// ---- masking (server-side; admins never receive full values, the owner only via reveal) ----
/** "+85291234567" → "+852 •••• 4567"; other countries keep the country code guess + last 4. */
export function maskPhone(e164: string | null | undefined): string | null {
  if (!e164) return null;
  const d = e164.replace(/[^\d+]/g, "");
  // Country code: +852 for HK; otherwise the leading 1–3 digits that common codes use (+1, +44, +86, +971…).
  const cc = d.startsWith("+852") ? "+852" : /^\+(1|7|2\d|3\d|4\d|5[1-8]|6[0-6]|8[1246]|9[0-58]|\d{3})/.exec(d)?.[0] ?? d.slice(0, 3);
  return `${cc} •••• ${d.slice(-4)}`;
}
/** "tony@example.com" → "t•••@example.com". */
export function maskEmail(email: string | null | undefined): string | null {
  if (!email) return null;
  const at = email.lastIndexOf("@");
  if (at < 1) return "•••";
  return `${email[0]}•••${email.slice(at)}`;
}
/** "tonychan" → "@to•••". */
export const maskTelegram = (t: string | null | undefined) => (t ? `@${t.slice(0, 2)}•••` : null);
/** "203.0.113.42" → "203.0.113.x"; IPv6 keeps the first 3 groups. */
export function maskIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  const v4 = /(\d+\.\d+\.\d+)\.\d+$/.exec(ip);
  if (v4) return `${v4[1]}.x`;
  return ip.split(":").slice(0, 3).join(":") + ":…";
}
export const last4 = (phone: string) => phone.slice(-4);

// ---- audit (append-only; one writer for panel, CLI and system) ----
export interface AuditInput {
  source: "panel" | "cli" | "system";
  /** Display name for the actor: "owner:5678", "admin:1234", or the CLI's --operator. */
  operator: string;
  actorUserId: string | null;
  actorRole: Role | "operator" | "system";
  action: string;
  targetType: "user" | "bet" | "race" | "meeting" | "system" | null;
  targetId: string | null;
  args?: unknown;
  before?: unknown;
  after?: unknown;
  reason: string;
  ip?: string | null;
  userAgent?: string | null;
  idemKey?: string | null;
  outcome?: "ok" | "refused";
  self?: boolean;
}

export function writeAudit(db: MembersDB, raw: AuditInput, now = new Date()): number {
  // Never store contact data in the audit log: free text and payloads are scrubbed on the way in.
  const a: AuditInput = {
    ...raw,
    operator: scrubText(raw.operator),
    reason: scrubText(raw.reason),
    args: scrubValue(raw.args ?? {}),
    before: raw.before === undefined ? undefined : scrubValue(raw.before),
    after: raw.after === undefined ? undefined : scrubValue(raw.after),
  };
  return Number(
    db
      .prepare(
        `INSERT INTO admin_audit (operator, command, args, before, after, reason, created_at, source, actor_user_id, actor_role, action, target_type,
           target_id, ip, user_agent, idem_key, outcome, self)
         VALUES (@operator, @action, @args, @before, @after, @reason, @createdAt, @source, @actorUserId, @actorRole, @action, @targetType,
           @targetId, @ip, @userAgent, @idemKey, @outcome, @self)`
      )
      .run({
        operator: a.operator,
        action: a.action,
        args: JSON.stringify(a.args ?? {}),
        before: a.before === undefined ? null : JSON.stringify(a.before),
        after: a.after === undefined ? null : JSON.stringify(a.after),
        reason: a.reason,
        createdAt: now.toISOString(),
        source: a.source,
        actorUserId: a.actorUserId,
        actorRole: a.actorRole,
        targetType: a.targetType,
        targetId: a.targetId,
        ip: a.ip ?? null,
        userAgent: a.userAgent ? a.userAgent.slice(0, 200) : null,
        idemKey: a.idemKey ?? null,
        outcome: a.outcome ?? "ok",
        self: a.self ? 1 : 0,
      }).lastInsertRowid
  );
}

// ---- access log (who viewed which member's data; kept 12 months) ----
export type AccessKind = "user_detail" | "user_tab" | "export" | "search_full_phone" | "contact_reveal";
export function logAccess(db: MembersDB, a: { actorUserId: string; actorRole: Role; kind: AccessKind; targetId?: string | null; detail?: string; ip?: string | null }): void {
  db.prepare("INSERT INTO admin_access_log (actor_user_id, actor_role, kind, target_id, detail, ip, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    a.actorUserId,
    a.actorRole,
    a.kind,
    a.targetId ?? null,
    a.detail ?? null,
    a.ip ?? null,
    new Date().toISOString()
  );
}
/** Retention purge (daily). The DB trigger refuses anything younger than 365 days anyway. */
export function purgeAccessLog(db: MembersDB, days: number, now = Date.now()): number {
  return db.prepare("DELETE FROM admin_access_log WHERE created_at < ?").run(new Date(now - days * 86_400_000).toISOString()).changes;
}

// ---- system alerts + job status (dashboard / system page) ----
export function raiseAlert(db: MembersDB, a: { key: string; kind: string; message: string; refType?: string; refId?: string }): void {
  const t = new Date().toISOString();
  db.prepare(
    `INSERT INTO system_alerts (key, kind, message, ref_type, ref_id, first_seen_at, last_seen_at) VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (key) DO UPDATE SET message = excluded.message, last_seen_at = excluded.last_seen_at, resolved_at = NULL`
  ).run(a.key, a.kind, a.message, a.refType ?? null, a.refId ?? null, t, t);
}
export function resolveAlert(db: MembersDB, key: string): void {
  db.prepare("UPDATE system_alerts SET resolved_at = ? WHERE key = ? AND resolved_at IS NULL").run(new Date().toISOString(), key);
}
export function setStatus(db: MembersDB, key: string, value: unknown): void {
  db.prepare("INSERT INTO system_status (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at").run(
    key,
    JSON.stringify(value),
    new Date().toISOString()
  );
}
export function getStatus<T>(db: MembersDB, key: string): { value: T; updatedAt: string } | null {
  const r = db.prepare("SELECT value, updated_at FROM system_status WHERE key = ?").get(key) as { value: string; updated_at: string } | undefined;
  return r ? { value: JSON.parse(r.value) as T, updatedAt: r.updated_at } : null;
}

// ---- CSV (owner exports) ----
/** One CSV cell: quoted, and formula-like text (= + - @, tab, CR) prefixed with ' so spreadsheets show it as text. */
const PHONE_CELL = /^\+\d{1,4}[\d •]{6,}$/;
export function csvCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "number" || typeof v === "boolean") return String(v); // numbers are data, never formulas
  let s = typeof v === "string" ? v : JSON.stringify(v);
  // Formula-leading characters are neutralised with a leading ' — except a phone number (+, country code,
  // then only digits / spaces / mask dots), which is data and is emitted as-is (AD-08).
  if (/^[=+\-@\t\r]/.test(s) && !PHONE_CELL.test(s)) s = `'${s}`;
  return /[",\n\r']/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
export const csvRow = (cells: unknown[]) => cells.map(csvCell).join(",") + "\r\n";
