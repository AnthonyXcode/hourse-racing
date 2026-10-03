// Owner write actions, shared by the admin panel (source=panel) and the operator CLI (source=cli), so the
// rules can't drift apart (docs/admin/PRD.md §4). Every change and its audit row are written in ONE
// transaction; refused attempts get their own audit row with outcome "refused".
import { randomUUID } from "crypto";
import type { MembersDB } from "../members/db";
import type { UserRow } from "../members/users";
import { InsufficientCredits } from "../credits/ledger";
import { hasResult } from "../credits/schedule";
import type { Credits } from "../credits/service";
import type { RaceResult, Venue } from "../../shared/types";
import type { AdminConfig } from "./config";
import { effectiveRole, last4, writeAudit, type Role } from "./core";
import { scrubText } from "./scrub";

export interface Actor {
  source: "panel" | "cli";
  /** "owner:5678" in the panel; the CLI's --operator name. */
  operator: string;
  userId: string | null;
  role: Role | "operator";
  ip?: string | null;
  userAgent?: string | null;
}

export interface ActionCtx {
  db: MembersDB;
  credits: Credits;
  cfg: AdminConfig;
  actor: Actor;
  /** Race data for voids (date YYYYMMDD). */
  meetingRaces(date: string, venue: Venue): number[] | null;
  results(date: string, venue: Venue): RaceResult[] | null;
}

export type ActionResult<T = object> =
  | ({ ok: true; auditId: number } & T)
  | { ok: false; status: number; code: string; extra?: Record<string, unknown>; auditId?: number };

const isoToCompact = (d: string) => d.replaceAll("-", "");
const compactToIso = (d: string) => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;

function userById(db: MembersDB, id: string): UserRow | null {
  return (db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRow | undefined) ?? null;
}

/** Reason rules shared by the panel and the CLI (AD-11): trimmed, 10–200 characters, stored scrubbed. */
export const REASON_MIN = 10;
export const REASON_MAX = 200;
export function checkReason(raw: unknown): { ok: true; reason: string } | { ok: false; length: number } {
  const t = typeof raw === "string" ? raw.trim() : "";
  if (t.length < REASON_MIN || t.length > REASON_MAX) return { ok: false, length: t.length };
  return { ok: true, reason: scrubText(t) };
}
const badReason: ActionResult<never> = { ok: false, status: 400, code: "reason_required", extra: { min: REASON_MIN, max: REASON_MAX } };

export function actions(ctx: ActionCtx) {
  const { db, credits, cfg, actor } = ctx;

  const base = (action: string, targetType: "user" | "bet" | "race" | "meeting", targetId: string, reason: string, idemKey?: string | null) => ({
    source: actor.source,
    operator: actor.operator,
    actorUserId: actor.userId,
    actorRole: actor.role,
    action,
    targetType,
    targetId,
    reason,
    ip: actor.ip ?? null,
    userAgent: actor.userAgent ?? null,
    idemKey: idemKey ?? null,
  });

  /** Audit a refused attempt (its own small transaction) and return the error. */
  function refuse(a: ReturnType<typeof base>, args: unknown, status: number, code: string, extra?: Record<string, unknown>): ActionResult<never> {
    // A refused attempt doesn't consume the idempotency key (the owner may retry the same dialog).
    const auditId = writeAudit(db, { ...a, idemKey: null, args, outcome: "refused", after: { code, ...extra } });
    return { ok: false, status, code, extra, auditId };
  }

  const wallet = (userId: string) => credits.ledger.ensureWallet(userId);

  return {
    /** Credit adjust ±amount (PRD §4): whole number, |n| ≤ 100,000, never below 0, stale-state guard. */
    adjust(p: { userId: string; amount: number; reason: string; expected?: { balance?: number }; idemKey?: string | null }): ActionResult<{ balance: number; ledgerId: number }> {
      const rr = checkReason(p.reason);
      if (!rr.ok) return badReason;
      const reason = rr.reason;
      const a = base("credit_adjust", "user", p.userId, reason, p.idemKey);
      const args = { amount: p.amount };
      if (!Number.isInteger(p.amount) || p.amount === 0 || Math.abs(p.amount) > cfg.maxAdjust) return refuse(a, args, 400, "invalid_amount", { max: cfg.maxAdjust });
      const u = userById(db, p.userId);
      if (!u) return refuse(a, args, 404, "not_found");
      const self = !!actor.userId && actor.userId === u.id;
      let out: ActionResult<{ balance: number; ledgerId: number }> | null = null;
      try {
        db.transaction(() => {
          const before = wallet(u.id).balance;
          if (p.expected?.balance !== undefined && p.expected.balance !== before) {
            out = { ok: false, status: 409, code: "stale_state", extra: { current: { balance: before } } };
            return;
          }
          credits.ledger.post({
            userId: u.id,
            kind: "admin_adjust",
            amount: p.amount,
            idemKey: `admin:${randomUUID()}`,
            refType: "admin",
            actor: actor.operator,
            note: JSON.stringify({ reason: reason }),
          });
          const ledgerId = (db.prepare("SELECT id FROM credit_ledger WHERE user_id = ? ORDER BY id DESC LIMIT 1").get(u.id) as { id: number }).id;
          const after = wallet(u.id).balance;
          const auditId = writeAudit(db, { ...a, args, before: { balance: before }, after: { balance: after, ledgerId }, self });
          out = { ok: true, auditId, balance: after, ledgerId };
        }).immediate();
      } catch (e) {
        if (e instanceof InsufficientCredits) return refuse(a, args, 409, "insufficient_credits", { balance: e.balance });
        throw e;
      }
      const r = out!;
      if (!r.ok && r.code === "stale_state") return refuse(a, args, 409, "stale_state", r.extra);
      return r;
    },

    /** Flag / unflag (transactional with its audit row: fixes the CLI's old non-transactional write). */
    setFlag(p: { userId: string; flagged: boolean; reason: string; expected?: { flagged?: boolean }; idemKey?: string | null }): ActionResult<{ flagged: boolean }> {
      const rr = checkReason(p.reason);
      if (!rr.ok) return badReason;
      const reason = rr.reason;
      const a = base(p.flagged ? "flag" : "unflag", "user", p.userId, reason, p.idemKey);
      const args = { flagged: p.flagged };
      const u = userById(db, p.userId);
      if (!u) return refuse(a, args, 404, "not_found");
      let stale: boolean | null = null;
      let auditId = 0;
      db.transaction(() => {
        const w = wallet(u.id);
        const before = { flagged: !!w.flagged, flagReason: w.flag_reason };
        if (p.expected?.flagged !== undefined && p.expected.flagged !== before.flagged) {
          stale = before.flagged;
          return;
        }
        db.prepare("UPDATE wallets SET flagged = ?, flag_reason = ?, updated_at = ? WHERE user_id = ?").run(p.flagged ? 1 : 0, p.flagged ? reason : null, new Date().toISOString(), u.id);
        auditId = writeAudit(db, { ...a, args, before, after: { flagged: p.flagged, flagReason: p.flagged ? reason : null } });
      }).immediate();
      if (stale !== null) return refuse(a, args, 409, "stale_state", { current: { flagged: stale } });
      return { ok: true, auditId, flagged: p.flagged };
    },

    /** Role user ↔ admin. Never the owner, never yourself; takes effect on the target's next request. */
    setRole(p: { userId: string; role: unknown; reason: string; expected?: { role?: string }; idemKey?: string | null }): ActionResult<{ role: "user" | "admin" }> {
      const rr = checkReason(p.reason);
      if (!rr.ok) return badReason;
      const reason = rr.reason;
      const a = base("role_change", "user", p.userId, reason, p.idemKey);
      const args = { role: p.role };
      if (p.role !== "user" && p.role !== "admin") return refuse(a, args, 400, "invalid_role");
      const u = userById(db, p.userId);
      if (!u) return refuse(a, args, 404, "not_found");
      if (effectiveRole(u, cfg) === "owner") return refuse(a, args, 409, "cannot_change_owner");
      if (actor.userId && actor.userId === u.id) return refuse(a, args, 409, "cannot_change_self");
      const current = (u as UserRow & { role: string }).role ?? "user";
      if (p.expected?.role !== undefined && p.expected.role !== current) return refuse(a, args, 409, "stale_state", { current: { role: current } });
      if (current === p.role) return refuse(a, args, 409, "stale_state", { current: { role: current } });
      let auditId = 0;
      db.transaction(() => {
        db.prepare("UPDATE users SET role = ?, role_updated_at = ?, role_updated_by = ? WHERE id = ?").run(p.role, new Date().toISOString(), actor.userId, u.id);
        auditId = writeAudit(db, { ...a, args, before: { role: current }, after: { role: p.role }, targetId: u.id });
      }).immediate();
      return { ok: true, auditId, role: p.role };
    },

    /** Resolve a held LIVE bet (settle / void / dividend). Failed attempts are audited too. */
    resolveBet(p: { betId: string; action: unknown; dividend?: unknown; reason: string; idemKey?: string | null }): ActionResult<{ status: string; payout: number; refund: number }> {
      const rr = checkReason(p.reason);
      if (!rr.ok) return badReason;
      const reason = rr.reason;
      const a = base("bet_resolve", "bet", p.betId, reason, p.idemKey);
      const args = { action: p.action, dividend: p.dividend };
      if (p.action !== "settle" && p.action !== "void" && p.action !== "dividend") return refuse(a, args, 400, "invalid_filter", { field: "action" });
      const dividend = p.action === "dividend" ? Number(p.dividend) : undefined;
      if (p.action === "dividend" && !(typeof p.dividend === "number" && Number.isFinite(dividend) && dividend! >= 0)) return refuse(a, args, 400, "invalid_amount");
      let result: ReturnType<Credits["settle"]["resolve"]> | null = null;
      let auditId = 0;
      db.transaction(() => {
        result = credits.settle.resolve(p.betId, { void: p.action === "void", dividend, settle: p.action === "settle" }, actor.operator);
        if (result.ok) auditId = writeAudit(db, { ...a, args, after: { status: result.status, payout: result.payout, refund: result.refund } });
      }).immediate();
      const r = result as unknown as ReturnType<Credits["settle"]["resolve"]>;
      if (!r.ok) return refuse(a, args, 409, r.code, { message: r.message, ...(r.reason ? { reason: r.reason } : {}) });
      return { ok: true, auditId, status: r.status, payout: r.payout, refund: r.refund };
    },

    /** What a void would do, without writing anything (PRD §4: preview). date is YYYY-MM-DD. */
    previewVoid(p: { date: string; venue: Venue; raceNo?: number | null; includeResulted?: boolean }) {
      const compact = isoToCompact(p.date);
      const all = ctx.meetingRaces(compact, p.venue) ?? [];
      const asked = p.raceNo ? all.filter((n) => n === p.raceNo) : all;
      const resulted = new Set((ctx.results(compact, p.venue) ?? []).filter((r) => hasResult(r)).map((r) => r.raceNumber));
      const races = p.includeResulted ? asked : asked.filter((n) => !resulted.has(n));
      const skipped = asked.filter((n) => !races.includes(n));
      const pending = db
        .prepare("SELECT id, user_id, race_ids, stake FROM live_bets WHERE status = 'pending' AND date = ? AND venue = ?")
        .all(compact, p.venue) as { id: string; user_id: string; race_ids: string; stake: number }[];
      const hit = pending.filter((b) => (JSON.parse(b.race_ids) as number[]).some((n) => races.includes(n)));
      return { races, skipped, bets: hit.length, users: new Set(hit.map((b) => b.user_id)).size, refundTotal: hit.reduce((s, b) => s + b.stake, 0), known: all.length > 0 };
    },

    /** Void a race or a whole meeting: resulted races are skipped unless includeResulted. Then a settlement sweep. */
    voidRaces(p: { date: string; venue: Venue; raceNo?: number | null; includeResulted?: boolean; reason: string; idemKey?: string | null }): ActionResult<{ voided: number[]; skipped: number[]; settled: number }> {
      const rr = checkReason(p.reason);
      if (!rr.ok) return badReason;
      const reason = rr.reason;
      const kind = p.raceNo ? "void_race" : "void_meeting";
      const a = base(kind, p.raceNo ? "race" : "meeting", p.raceNo ? `${p.date}-${p.venue}-${p.raceNo}` : `${p.date}-${p.venue}`, reason, p.idemKey);
      const args = { date: p.date, venue: p.venue, raceNo: p.raceNo ?? null, includeResulted: !!p.includeResulted };
      if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date) || (p.venue !== "ST" && p.venue !== "HV")) return refuse(a, args, 400, "invalid_filter");
      const pv = this.previewVoid(p);
      if (!pv.known) return refuse(a, args, 404, "not_found");
      // A race number that isn't on the card is a failure (audited as refused), never an empty "success".
      if (p.raceNo && !(ctx.meetingRaces(isoToCompact(p.date), p.venue) ?? []).includes(p.raceNo)) return refuse(a, args, 404, "not_found");
      // The race schedule lives in the race DB, so this can't share the members-DB transaction: the voids are
      // written first (they are idempotent), then the settlement sweep and the audit row together.
      for (const n of pv.races) credits.schedule.voidRace(p.date, p.venue, n);
      let auditId = 0;
      let settled = 0;
      db.transaction(() => {
        settled = credits.settle.sweep({ date: isoToCompact(p.date), venue: p.venue }).settled;
        auditId = writeAudit(db, { ...a, args, after: { voided: pv.races, skipped: pv.skipped, settled, refundTotal: pv.refundTotal } });
      }).immediate();
      return { ok: true, auditId, voided: pv.races, skipped: pv.skipped, settled };
    },
  };
}
export type Actions = ReturnType<typeof actions>;

/** "owner:5678" / "admin:1234": the panel's operator name (only last-4 digits, never a phone). */
export const panelOperator = (u: UserRow, role: Role) => `${role}:${last4(u.phone_e164)}`;
export { compactToIso };
