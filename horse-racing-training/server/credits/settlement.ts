// LIVE settlement (docs/credits/PRD.md §4): grade pending bets once their races have results and pay out
// exactly once — the status flip `WHERE status = 'pending'` and the unique payout:/refund: ledger keys make
// concurrent or repeated sweeps harmless.
import type { MembersDB } from "../members/db";
import type { BetSelection, RaceResult, RaceStatus, Venue } from "../../shared/types";
import { gradeLiveBet, type CardRunner, type Grade } from "./grade";
import type { Ledger } from "./ledger";
import { raceStatus, type ScheduleStore } from "./schedule";

const HOUR = 3_600_000;
const MAX_ATTEMPTS = 5;

export interface SettleDeps {
  db: MembersDB;
  ledger: Ledger;
  schedule: ScheduleStore;
  clock: () => number;
  /** date YYYYMMDD */
  results(date: string, venue: Venue): RaceResult[] | null;
  card(date: string, venue: Venue, raceNo: number): CardRunner[] | null;
  log?: (line: string) => void;
  /** Also record alerts for the admin dashboard (system_alerts), and clear them when the bet settles. */
  onAlert?: (a: { key: string; kind: string; message: string; refType: string; refId: string }) => void;
  onResolved?: (betId: string) => void;
}

interface PendingRow {
  id: string;
  user_id: string;
  date: string;
  venue: Venue;
  bet_type: string;
  selection: string;
  first_post_time: string | null;
  unit: number;
  combos: number;
  stake: number;
  hold_reason: string | null;
  held_since: string | null;
  settle_attempts: number;
}

const isoDate = (d: string) => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;

export type ResolveResult =
  | { ok: true; code: "ok"; message: string; status: "won" | "lost" | "void"; payout: number; refund: number }
  | { ok: false; code: "bet_not_pending" | "results_not_stored" | "still_held"; message: string; reason?: string };

export function settlement(deps: SettleDeps) {
  const { db, ledger } = deps;
  const log = deps.log ?? ((l: string) => console.error(l));
  const alerted = new Set<string>();
  const alertOnce = (key: string, msg: string) => {
    const [kind = "alert", betId = ""] = key.split(":");
    deps.onAlert?.({ key, kind: kind === "hold" ? "held_bet" : kind === "noresult" ? "no_result_6h" : "settle_failure", message: msg, refType: "bet", refId: betId });
    if (alerted.has(key)) return;
    alerted.add(key);
    log(`[credits:alert] ${msg}`);
  };

  /** Grade one bet against the current data (optionally with an operator dividend). */
  function grade(b: PendingRow, override?: number, assumeRunners = false): Grade {
    const sel = JSON.parse(b.selection) as BetSelection;
    const results = deps.results(b.date, b.venue);
    const byRace = new Map((results ?? []).map((r) => [r.raceNumber, r]));
    const races = sel.raceLegs.map((l) => l.raceNumber);
    const statuses = new Map<number, RaceStatus>(
      races.map((n) => [n, raceStatus(deps.schedule.get(isoDate(b.date), b.venue, n), byRace.get(n), deps.clock(), false)])
    );
    const cards = new Map(races.map((n) => [n, deps.card(b.date, b.venue, n)]));
    return gradeLiveBet({ selection: sel, unit: b.unit, combos: b.combos, stake: b.stake }, results, cards, statuses, override, { assumeRunners });
  }

  /** Apply a final grade in one transaction. Returns false if the bet was no longer pending. */
  function apply(b: PendingRow, g: Exclude<Grade, { kind: "wait" } | { kind: "hold" }>, actor = "system"): boolean {
    return db.transaction(() => {
      const t = new Date(deps.clock()).toISOString();
      const status = g.kind === "void" ? "void" : g.status;
      const payout = g.kind === "settle" ? g.payout : 0;
      const result = g.kind === "settle" ? JSON.stringify(g.result) : null;
      const changed = db
        .prepare(
          "UPDATE live_bets SET status = ?, payout = ?, refund = ?, refunded_combos = ?, result = ?, hold_reason = NULL, settled_at = ? WHERE id = ? AND status = 'pending'"
        )
        .run(status, payout, g.refund, g.refundedCombos, result, t, b.id).changes;
      if (!changed) return false;
      const note = JSON.stringify({ date: b.date, venue: b.venue, races: (JSON.parse(b.selection) as BetSelection).raceLegs.map((l) => l.raceNumber), betType: b.bet_type });
      deps.onResolved?.(b.id);
      if (payout > 0) ledger.post({ userId: b.user_id, kind: "bet_payout", amount: payout, idemKey: `payout:${b.id}`, refType: "bet", refId: b.id, actor, note });
      if (g.refund > 0) ledger.post({ userId: b.user_id, kind: "bet_refund", amount: g.refund, idemKey: `refund:${b.id}`, refType: "bet", refId: b.id, actor, note });
      return true;
    }).immediate();
  }

  function pendingRows(filter: { date?: string; venue?: string; userId?: string; id?: string } = {}): PendingRow[] {
    const where = ["status = 'pending'"];
    const args: string[] = [];
    if (filter.id) (where.push("id = ?"), args.push(filter.id));
    if (filter.userId) (where.push("user_id = ?"), args.push(filter.userId));
    if (filter.date) (where.push("date = ?"), args.push(filter.date));
    if (filter.venue) (where.push("venue = ?"), args.push(filter.venue));
    return db.prepare(`SELECT * FROM live_bets WHERE ${where.join(" AND ")} ORDER BY created_at`).all(...args) as PendingRow[];
  }

  return {
    /** Settle every pending bet whose races are done (all of them, or a meeting / member). */
    sweep(filter: { date?: string; venue?: string; userId?: string } = {}): { settled: number; held: number; waiting: number; failed: number } {
      const sum = { settled: 0, held: 0, waiting: 0, failed: 0 };
      deps.schedule.closeDue();
      for (const b of pendingRows(filter)) {
        try {
          const g = grade(b);
          if (g.kind === "wait") {
            sum.waiting++;
            const post = b.first_post_time ? Date.parse(b.first_post_time) : NaN;
            if (post && deps.clock() - post > 6 * HOUR) alertOnce(`noresult:${b.id}`, `bet …${b.id.slice(-4)} (${b.date} ${b.venue}) has no result 6 h after post time`);
            continue;
          }
          if (g.kind === "hold") {
            sum.held++;
            const t = new Date(deps.clock()).toISOString();
            db.prepare("UPDATE live_bets SET hold_reason = ?, held_since = COALESCE(held_since, ?), result = ? WHERE id = ? AND status = 'pending'").run(g.reason, t, JSON.stringify(g.result), b.id);
            const since = b.held_since ? Date.parse(b.held_since) : deps.clock();
            if (g.reason !== "missing_dividend" || deps.clock() - since > 2 * HOUR) alertOnce(`hold:${b.id}`, `bet …${b.id.slice(-4)} held (${g.reason}); resolve with: npm run credits -- resolve-bet ${b.id}`);
            continue;
          }
          if (apply(b, g)) sum.settled++;
        } catch (e) {
          sum.failed++;
          const n = b.settle_attempts + 1;
          db.prepare("UPDATE live_bets SET settle_attempts = ?, hold_reason = CASE WHEN ? >= ? THEN 'settle_failed' ELSE hold_reason END WHERE id = ?").run(n, n, MAX_ATTEMPTS, b.id);
          if (n >= MAX_ATTEMPTS) alertOnce(`fail:${b.id}`, `bet …${b.id.slice(-4)} failed to settle ${n} times: ${e instanceof Error ? e.message : e}`);
        }
      }
      return sum;
    },

    /**
     * Operator: settle a held bet or void it. `settle` treats horses of unknown fate as runners (runner_unknown
     * holds, after checking HKJC's result); `dividend` supplies the per-$10 return for its winning combos.
     */
    resolve(id: string, how: { void?: boolean; dividend?: number; settle?: boolean }, actor: string): ResolveResult {
      const b = pendingRows({ id })[0];
      if (!b) return { ok: false, code: "bet_not_pending", message: "bet not found or not pending" };
      if (how.void)
        return apply(b, { kind: "void", refund: b.stake, refundedCombos: b.combos, reason: "void_race" }, actor)
          ? { ok: true, code: "ok", message: "voided and refunded", status: "void", payout: 0, refund: b.stake }
          : { ok: false, code: "bet_not_pending", message: "already settled" };
      const g = grade(b, how.dividend, !!how.settle);
      if (g.kind === "wait") return { ok: false, code: "results_not_stored", message: "results not stored yet" };
      if (g.kind === "hold")
        return {
          ok: false,
          code: "still_held",
          reason: g.reason,
          message: g.reason === "runner_unknown" ? "still held (runner_unknown): check HKJC's result, then --settle (they ran) or --void" : `still held (${g.reason}); pass --dividend <per $10>`,
        };
      if (!apply(b, g, actor)) return { ok: false, code: "bet_not_pending", message: "already settled" };
      return g.kind === "void"
        ? { ok: true, code: "ok", message: "voided", status: "void", payout: 0, refund: g.refund }
        : { ok: true, code: "ok", message: `${g.status}: payout ${g.payout}, refund ${g.refund}`, status: g.status, payout: g.payout, refund: g.refund };
    },
  };
}
export type Settlement = ReturnType<typeof settlement>;
