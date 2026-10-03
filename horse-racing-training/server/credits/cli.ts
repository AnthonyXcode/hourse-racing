// Operator CLI for credits (docs/credits/PRD.md §3.7). No admin panel: every write needs --operator,
// --reason and --yes, prints before/after, and is recorded in admin_audit.
//
//   npm run credits -- show --phone "9123 4567" | --user <id>
//   npm run credits:adjust -- --phone 91234567 --amount 500 --reason "goodwill top-up" --operator anthony --yes
//   npm run credits -- pending [--held]
//   npm run credits -- resolve-bet <betId> (--settle | --void | --dividend <per $10>) --reason … --operator … --yes
//   npm run credits -- void-race <YYYY-MM-DD> <ST|HV> <raceNo> --reason … --operator … --yes
//   npm run credits -- void-meeting <YYYY-MM-DD> <ST|HV> --reason … --operator … --yes
//   npm run credits -- flag | unflag --user <id> --reason … --operator … --yes
//   npm run credits -- role --phone 91234567 --set admin|user --reason … --operator … --yes   (never the owner)
// Writes go through server/admin/actions.ts, the same code the admin panel uses (audit source = cli).
//   npm run credits:settle            settlement sweep now
//   npm run credits:reconcile         ledger checks (+ Stripe paid sessions, last 30 days, when a key is set)
//   npm run credits -- dev-schedule --date <YYYY-MM-DD> --venue ST (--first 13:00 | --in <min>) [--gap 30]   (dev only)
import Stripe from "stripe";
import { configureClock, nowMs } from "../clock";
import { members } from "../members/service";
import { normalizeHkMobile } from "../../shared/validation";
import { appCredits } from "./instance";
import { adminConfig, appActions } from "../admin/instance";
import { REASON_MAX, REASON_MIN, checkReason } from "../admin/actions";
import { reconcile } from "./reconcile";
import { getManifest } from "../dataIndex";

export interface Args {
  cmd: string;
  pos: string[];
  opt: Record<string, string | true>;
}

/** Options that never take a value. */
const FLAGS = new Set(["yes", "held", "settle", "void", "include-resulted"]);

/** A signed whole number written plainly ("500", "-200", "+5"); rejects 1e3, 1.5, 0x10, "". */
export function parseAmount(v: unknown): number | null {
  if (typeof v !== "string" || !/^[+-]?\d{1,9}$/.test(v.trim())) return null;
  const n = Number(v.trim());
  return n === 0 ? null : n;
}

export function parseArgs(argv: string[]): Args {
  const [cmd = "help", ...rest] = argv;
  const pos: string[] = [];
  const opt: Record<string, string | true> = {};
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i]!;
    if (a.startsWith("--")) {
      const k = a.slice(2);
      const v = rest[i + 1];
      if (v === undefined || v.startsWith("--") || FLAGS.has(k)) opt[k] = true;
      else (opt[k] = v), i++;
    } else pos.push(a);
  }
  return { cmd, pos, opt };
}

/** Write commands need who, why and an explicit yes. Returns an error message or null. */
export function writeGuard(a: Args): string | null {
  if (typeof a.opt.operator !== "string" || !a.opt.operator.trim()) return "--operator <name> is required";
  if (typeof a.opt.reason !== "string" || !a.opt.reason.trim()) return '--reason "<text>" is required';
  // Same rule as the admin panel (shared in admin/actions.ts): 10–200 characters after trimming.
  const rr = checkReason(a.opt.reason);
  if (!rr.ok) return `--reason must be ${REASON_MIN}–${REASON_MAX} characters (yours has ${rr.length})`;
  if (a.opt.yes !== true) return "--yes is required to write";
  return null;
}

type Out = (line: string) => void;

export async function runCli(argv: string[], out: Out = console.log): Promise<number> {
  configureClock();
  const a = parseArgs(argv);
  const c = appCredits();
  const db = c.db;
  const act = () => appActions({ source: "cli", operator: String(a.opt.operator), userId: null, role: "operator" });
  const reason = () => String(a.opt.reason);
  const failMsg = (r: { code: string; extra?: Record<string, unknown> }) =>
    r.code === "reason_required" ? `--reason must be ${REASON_MIN}–${REASON_MAX} characters` : r.code === "insufficient_credits" ? "the balance would go below 0" : r.code === "invalid_amount" ? `--amount must be between −${adminConfig().maxAdjust} and ${adminConfig().maxAdjust}` : `${r.code}${r.extra?.message ? `: ${r.extra.message}` : ""}`;
  const userId = (): string | null => {
    if (typeof a.opt.user === "string") return db.prepare("SELECT 1 FROM users WHERE id = ?").get(a.opt.user) ? a.opt.user : null;
    if (typeof a.opt.phone === "string") {
      const p = normalizeHkMobile(a.opt.phone);
      const u = p ? (db.prepare("SELECT id FROM users WHERE phone_e164 = ?").get(p) as { id: string } | undefined) : undefined;
      return u?.id ?? null;
    }
    return null;
  };
  const snapshot = (id: string) => {
    const w = c.ledger.wallet(id);
    return w ? { balance: w.balance, flagged: !!w.flagged, flagReason: w.flag_reason } : null;
  };
  const needWrite = () => {
    const e = writeGuard(a);
    if (e) out(`refused: ${e}`);
    return !e;
  };

  switch (a.cmd) {
    case "show": {
      const id = userId();
      if (!id) return out("user not found (use --phone or --user)"), 1;
      c.ledger.ensureWallet(id);
      out(JSON.stringify({ user: id, ...snapshot(id) }, null, 2));
      for (const r of c.ledger.list(id, null, 50).rows) out(`${r.createdAt}  ${r.kind.padEnd(17)} ${String(r.amount).padStart(8)}  → ${r.balanceAfter}`);
      for (const b of c.live.list(id, "pending")) out(`pending ${b.id} ${b.date} ${b.venue} ${b.betLabel} ${b.picks} stake ${b.stake}${b.held ? " (held)" : ""}`);
      return 0;
    }
    case "adjust": {
      const id = userId();
      const amount = parseAmount(a.opt.amount);
      if (!id) return out(`user not found: ${typeof a.opt.phone === "string" ? `phone ${a.opt.phone}` : typeof a.opt.user === "string" ? `user ${a.opt.user}` : "pass --phone or --user"}`), 1;
      if (amount === null) return out("--amount must be a plain non-zero whole number, e.g. 500 or -200 (not 1e3, 1.5 or hex)"), 1;
      if (!needWrite()) return 1;
      const before = snapshot(id) ?? { balance: 0 };
      const r = act().adjust({ userId: id, amount, reason: reason() });
      if (!r.ok) return out(`refused: ${failMsg(r)} (audit #${r.auditId})`), 1;
      out(`before ${JSON.stringify(before)}\nafter  ${JSON.stringify(snapshot(id))}  (audit #${r.auditId})`);
      return 0;
    }
    case "pending": {
      const rows = db.prepare(`SELECT id, user_id, date, venue, bet_type, stake, hold_reason, first_post_time FROM live_bets WHERE status = 'pending' ${a.opt.held ? "AND hold_reason IS NOT NULL" : ""} ORDER BY created_at`).all() as {
        id: string; user_id: string; date: string; venue: string; bet_type: string; stake: number; hold_reason: string | null; first_post_time: string | null;
      }[];
      for (const r of rows) out(`${r.id}  ${r.date} ${r.venue} ${r.bet_type} stake ${r.stake} post ${r.first_post_time ?? "?"}${r.hold_reason ? `  HELD: ${r.hold_reason}` : ""}`);
      out(`${rows.length} pending`);
      return 0;
    }
    case "resolve-bet": {
      const id = a.pos[0];
      if (!id) return out("usage: resolve-bet <betId> (--settle | --void | --dividend <per $10>)"), 1;
      if (!needWrite()) return 1;
      const dividend = a.opt.dividend !== undefined ? Number(a.opt.dividend) : undefined;
      if (dividend !== undefined && !(dividend >= 0)) return out("--dividend must be a number ≥ 0 (HK$ per $10 for the bet's winning combinations)"), 1;
      const action = a.opt.void === true ? "void" : dividend !== undefined ? "dividend" : "settle";
      const r = act().resolveBet({ betId: id, action, dividend, reason: reason() }); // failures are audited too
      out(r.ok ? `${r.status}: payout ${r.payout}, refund ${r.refund} (audit #${r.auditId})` : `refused: ${failMsg(r)} (audit #${r.auditId})`);
      return r.ok ? 0 : 1;
    }
    case "void-race":
    case "void-meeting": {
      const [date, venue, raceNo] = a.pos;
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || (venue !== "ST" && venue !== "HV") || (a.cmd === "void-race" && !Number(raceNo)))
        return out(`usage: ${a.cmd} <YYYY-MM-DD> <ST|HV>${a.cmd === "void-race" ? " <raceNo>" : ""}`), 1;
      if (!needWrite()) return 1;
      const r = act().voidRaces({ date, venue, raceNo: a.cmd === "void-race" ? Number(raceNo) : null, includeResulted: a.opt["include-resulted"] === true, reason: reason() });
      if (!r.ok) return out(`refused: ${failMsg(r)} (audit #${r.auditId})`), 1;
      if (r.skipped.length) out(`skipped (already resulted; pass --include-resulted to void them anyway): ${r.skipped.map((n) => `R${n}`).join(", ")}`);
      out(`voided ${r.voided.length} race(s)${r.voided.length ? ` (${r.voided.map((n) => `R${n}`).join(", ")})` : ""}; ${r.settled} bet(s) refunded/settled (audit #${r.auditId})`);
      return 0;
    }
    case "flag":
    case "unflag": {
      const id = userId();
      if (!id) return out("user not found (use --phone or --user)"), 1;
      if (!needWrite()) return 1;
      const before = snapshot(id);
      const r = act().setFlag({ userId: id, flagged: a.cmd === "flag", reason: reason() }); // flag + audit in one transaction
      if (!r.ok) return out(`refused: ${failMsg(r)} (audit #${r.auditId})`), 1;
      out(`before ${JSON.stringify(before)}\nafter  ${JSON.stringify(snapshot(id))}  (audit #${r.auditId})`);
      return 0;
    }
    case "role": {
      const id = userId();
      if (!id) return out(`user not found: ${typeof a.opt.phone === "string" ? `phone ${a.opt.phone}` : typeof a.opt.user === "string" ? `user ${a.opt.user}` : "pass --phone or --user"}`), 1;
      if (a.opt.set !== "admin" && a.opt.set !== "user") return out("--set admin|user is required"), 1;
      if (!needWrite()) return 1;
      const r = act().setRole({ userId: id, role: a.opt.set, reason: reason() });
      if (!r.ok) return out(`refused: ${failMsg(r)} (audit #${r.auditId})`), 1;
      out(`role is now ${r.role} (audit #${r.auditId})`);
      return 0;
    }
    case "settle": {
      const s = c.settle.sweep();
      out(`settled ${s.settled}, held ${s.held}, waiting ${s.waiting}, failed ${s.failed}`);
      return 0;
    }
    case "reconcile": {
      // Local ledger checks always run and print first; the Stripe cross-check is separate and can fail alone.
      const issues = reconcile(db);
      for (const i of issues) out(`[credits:alert] ${i}`);
      out(issues.length ? `ledger: ${issues.length} problem(s)` : "ledger: OK (consistent)");
      let stripeFailed = false;
      if (!c.cfg.stripe.secretKey) out("stripe: skipped (no STRIPE_SECRET_KEY)");
      else {
        const stripeIssues: string[] = [];
        try {
          const stripe = new Stripe(c.cfg.stripe.secretKey);
          const since = Math.floor(Date.now() / 1000) - 30 * 86_400;
          for await (const s of stripe.checkout.sessions.list({ created: { gte: since }, limit: 100 })) {
            if (s.payment_status !== "paid" || !s.metadata?.plan_id) continue;
            const row = db.prepare("SELECT status FROM purchases WHERE stripe_session_id = ?").get(s.id) as { status: string } | undefined;
            if (!row || row.status === "open" || row.status === "expired") stripeIssues.push(`Stripe session …${s.id.slice(-4)} is paid but not credited here`);
          }
          for (const i of stripeIssues) out(`[credits:alert] ${i}`);
          out(stripeIssues.length ? `stripe: ${stripeIssues.length} problem(s)` : "stripe: OK (paid sessions in the last 30 days are credited)");
          issues.push(...stripeIssues);
        } catch (e) {
          stripeFailed = true;
          out(`[credits:alert] stripe: check FAILED (${e instanceof Error ? e.message.replace(/sk_(test|live)_\S+/g, "sk_…") : "error"}); local checks above still apply`);
        }
      }
      return issues.length ? 2 : stripeFailed ? 3 : 0;
    }
    case "dev-schedule": {
      if (process.env.NODE_ENV === "production") return out("refused: dev-schedule is for development only"), 1;
      const date = String(a.opt.date ?? "");
      const venue = String(a.opt.venue ?? "");
      const races = getManifest().find((m) => m.date === date.replaceAll("-", "") && m.venue === venue)?.races;
      if (!races) return out(`no racecards for ${date} ${venue}`), 1;
      const gap = Number(a.opt.gap ?? 30);
      const start =
        typeof a.opt.in === "string" ? nowMs() + Number(a.opt.in) * 60_000 : typeof a.opt.first === "string" ? Date.parse(`${date}T${a.opt.first}:00+08:00`) : NaN;
      if (Number.isNaN(start)) return out("pass --first HH:MM (HK time) or --in <minutes from now>"), 1;
      const hk = (ms: number) => new Date(ms + 8 * 3_600_000).toISOString().replace("Z", "+08:00").replace(/\.\d{3}/, "");
      c.schedule.upsert(races.map((n, i) => ({ date, venue, raceNo: n, postTime: hk(start + i * gap * 60_000) })), "dev");
      out(`dev schedule: ${date} ${venue} R${races[0]}–R${races[races.length - 1]} from ${hk(start)} every ${gap} min (server now ${hk(nowMs())})`);
      return 0;
    }
    default:
      out("commands: show, adjust, pending, resolve-bet, void-race, void-meeting, flag, unflag, role, settle, reconcile, dev-schedule (see server/credits/cli.ts)");
      return a.cmd === "help" ? 0 : 1;
  }
}

if (process.argv[1] && /credits[\\/]cli\.ts$/.test(process.argv[1])) {
  void members(); // open the members DB (MEMBERS_DB)
  runCli(process.argv.slice(2))
    .then((code) => process.exit(code))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
