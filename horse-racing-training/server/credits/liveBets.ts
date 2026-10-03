// LIVE bet placement (docs/credits/PRD.md §3.3): validate every item against the server's view of the race,
// then debit and insert all bets in ONE transaction, or nothing. An Idempotency-Key per slip submit makes
// retries and double taps safe.
import { createHash, randomUUID } from "crypto";
import type { MembersDB } from "../members/db";
import type { BetSelection, BetTypeId, HistoryEntry, LiveBet, RaceStatus, SettleResult, Venue } from "../../shared/types";
import { BET_TYPES, countCombos } from "../../shared/betEngine/index";
import { picksText } from "../../shared/credits/format";
import { MAX_LIVE_ITEMS, MIN_LIVE_UNIT } from "../../shared/credits/rules";
import type { CreditsConfig } from "./config";
import { InsufficientCredits, type Ledger } from "./ledger";
import type { CardRunner } from "./grade";
import type { MeetingStatus } from "./schedule";

export const MAX_ITEMS = MAX_LIVE_ITEMS;

export interface MeetingView {
  raceNos: number[];
  status: MeetingStatus;
  card(raceNo: number): CardRunner[] | null;
}

export interface LiveDeps {
  db: MembersDB;
  ledger: Ledger;
  cfg: CreditsConfig;
  clock: () => number;
  /** date YYYYMMDD. Null when the meeting has no racecards. */
  meeting(date: string, venue: Venue): MeetingView | null;
}

export type ItemError = { index: number; code: string; raceNumber?: number; horse?: number };
export interface PlaceResult {
  status: number;
  body: unknown;
}

interface BetRow {
  id: string;
  user_id: string;
  date: string;
  venue: Venue;
  bet_type: BetTypeId;
  selection: string;
  race_ids: string;
  first_post_time: string | null;
  unit: number;
  combos: number;
  stake: number;
  status: LiveBet["status"];
  refund: number;
  payout: number;
  result: string | null;
  hold_reason: string | null;
  created_at: string;
  settled_at: string | null;
}

/** A validated item, ready to insert. */
type NewBet = Pick<BetRow, "date" | "venue" | "bet_type" | "selection" | "race_ids" | "first_post_time" | "unit" | "combos" | "stake">;

const ints = (a: unknown, max = 30): a is number[] =>
  Array.isArray(a) && a.length <= max && a.every((n) => Number.isInteger(n) && n > 0 && n < 100) && new Set(a).size === a.length;

/** A well-formed selection for its pool (shape only; horses are checked against the card later). */
export function parseSelection(x: unknown): BetSelection | null {
  if (!x || typeof x !== "object") return null;
  const s = x as { type?: unknown; raceLegs?: unknown };
  if (typeof s.type !== "string" || !Object.hasOwn(BET_TYPES, s.type)) return null;
  const def = BET_TYPES[s.type as BetTypeId];
  if (!Array.isArray(s.raceLegs) || s.raceLegs.length !== def.legRaces) return null;
  const legs = [];
  for (const l of s.raceLegs as unknown[]) {
    const leg = l as { raceNumber?: unknown; bankers?: unknown; legs?: unknown };
    if (!leg || !Number.isInteger(leg.raceNumber) || !ints(leg.bankers) || !ints(leg.legs)) return null;
    const bankers = leg.bankers as number[];
    const picks = leg.legs as number[];
    if (bankers.length && (!def.banker || bankers.length > def.depth - 1)) return null;
    if (bankers.some((b) => picks.includes(b))) return null;
    legs.push({ raceNumber: leg.raceNumber as number, bankers: [...bankers], legs: [...picks] });
  }
  if (new Set(legs.map((l) => l.raceNumber)).size !== legs.length) return null;
  const sel = { type: s.type as BetTypeId, raceLegs: legs };
  return countCombos(sel) > 0 ? sel : null;
}

const hashBody = (b: unknown) => createHash("sha256").update(JSON.stringify(b ?? null)).digest("hex");

export function toLiveBet(r: BetRow): LiveBet {
  const selection = JSON.parse(r.selection) as BetSelection;
  return {
    id: r.id,
    date: r.date,
    venue: r.venue,
    betType: r.bet_type,
    betLabel: BET_TYPES[r.bet_type].label,
    selection,
    picks: picksText(selection),
    unit: r.unit,
    combos: r.combos,
    stake: r.stake,
    status: r.status,
    refund: r.refund,
    payout: r.payout,
    result: r.result && r.status !== "pending" ? (JSON.parse(r.result) as SettleResult) : null,
    placedAt: r.created_at,
    settledAt: r.settled_at,
    firstPostTime: r.first_post_time,
    held: r.status === "pending" && !!r.hold_reason,
  };
}

/** A LIVE bet as a History row (merged with practice entries; amounts in credits). */
export function liveToHistory(b: LiveBet): HistoryEntry {
  const r = b.result;
  const multi = (r?.legResults.length ?? 0) > 1;
  return {
    id: b.id,
    ts: b.placedAt,
    date: b.date,
    venue: b.venue,
    betType: b.betType,
    betLabel: b.betLabel,
    picks: b.picks,
    result: r
      ? r.legResults.map((lr) => (multi ? `R${lr.raceNumber}:` : "") + lr.finishers.slice(0, 4).map((f) => f.horseNumber).join("-")).join("  ")
      : "",
    combos: b.combos,
    cost: b.stake,
    hit: b.status === "won",
    payout: b.status === "pending" ? null : b.payout,
    net: b.status === "pending" ? null : b.payout + b.refund - b.stake,
    poolDividendText: r?.poolDividendText ?? "—",
    mode: "live",
    status: b.status,
    refund: b.refund,
  };
}

export function liveBets(deps: LiveDeps) {
  const { db, ledger, cfg } = deps;
  const iso = () => new Date(deps.clock()).toISOString();

  /** Validate one item; returns the bet to place or an error. */
  function check(raw: unknown, index: number): { error: ItemError } | { bet: NewBet } {
    const it = (raw && typeof raw === "object" ? raw : {}) as { date?: unknown; venue?: unknown; selection?: unknown; unit?: unknown };
    const err = (code: string, extra: Partial<ItemError> = {}) => ({ error: { index, code, ...extra } });
    if (typeof it.date !== "string" || !/^\d{8}$/.test(it.date) || (it.venue !== "ST" && it.venue !== "HV")) return err("invalid_selection");
    const sel = parseSelection(it.selection);
    if (!sel) return err("invalid_selection");
    if (typeof it.unit !== "number" || !Number.isInteger(it.unit) || it.unit < MIN_LIVE_UNIT) return err("unit_too_small");
    const m = deps.meeting(it.date, it.venue);
    if (!m) return err("race_not_open", { raceNumber: sel.raceLegs[0]!.raceNumber });
    const races = sel.raceLegs.map((l) => l.raceNumber);
    // Multi-race pools: only the meeting's designated legs (known before results), never ad-hoc legs.
    if (sel.type === "doubleTrio" || sel.type === "tripleTrio") {
      const pools = sel.type === "doubleTrio" ? m.status.liveDoubleTrioPools : m.status.liveTripleTrioPools;
      const key = [...races].sort((a, b) => a - b).join();
      if (!pools.some((p) => [...p].sort((a, b) => a - b).join() === key)) return err("pool_not_designated");
    }
    for (const n of races) {
      const st: RaceStatus | undefined = m.status.raceInfo.find((r) => r.raceNumber === n)?.status;
      if (st !== "open") return err(st === "closed" ? "race_closed" : "race_not_open", { raceNumber: n });
    }
    for (const leg of sel.raceLegs) {
      const card = m.card(leg.raceNumber);
      if (!card) return err("race_not_open", { raceNumber: leg.raceNumber });
      for (const h of [...leg.bankers, ...leg.legs]) {
        const e = card.find((c) => c.horseNumber === h);
        if (!e) return err("invalid_selection", { raceNumber: leg.raceNumber, horse: h });
        if (e.isScratched) return err("scratched_runner", { raceNumber: leg.raceNumber, horse: h });
      }
    }
    const combos = countCombos(sel); // the client's combos / cost are never used
    const stake = combos * it.unit;
    if (stake > cfg.maxStake) return err("stake_too_large");
    const posts = races
      .map((n) => m.status.raceInfo.find((r) => r.raceNumber === n)?.postTime)
      .filter((p): p is string => !!p)
      .sort((a, b) => Date.parse(a) - Date.parse(b));
    return {
      bet: { date: it.date, venue: it.venue, bet_type: sel.type, selection: JSON.stringify(sel), race_ids: JSON.stringify(races), first_post_time: posts[0] ?? null, unit: it.unit, combos, stake },
    };
  }

  return {
    /** POST /api/live-bets. Pure function of (user, key, body) + DB state; synchronous, so it can't interleave. */
    place(userId: string, idemKey: string, body: unknown): PlaceResult {
      const bodyHash = hashBody(body);
      const seen = db.prepare<[string, string], { body_hash: string; status: number; response: string }>("SELECT body_hash, status, response FROM idempotency_keys WHERE key = ? AND user_id = ?").get(idemKey, userId);
      if (seen) return seen.body_hash === bodyHash ? { status: seen.status, body: JSON.parse(seen.response) } : { status: 409, body: { error: { code: "idempotency_conflict" } } };

      const items = (body as { items?: unknown })?.items;
      if (!Array.isArray(items) || items.length === 0) return { status: 400, body: { error: { code: "invalid_selection" } } };
      if (items.length > MAX_ITEMS) return { status: 400, body: { error: { code: "too_many_items" } } };

      const checked = items.map((it, i) => check(it, i));
      const errors = checked.flatMap((c) => ("error" in c ? [c.error] : []));
      if (errors.length) {
        const code = errors[0]!.code;
        return { status: code === "race_closed" || code === "race_not_open" ? 409 : 400, body: { error: { code, items: errors } } };
      }
      const bets = checked.map((c) => (c as { bet: NewBet }).bet);
      const total = bets.reduce((s, b) => s + b.stake, 0);

      try {
        return db.transaction((): PlaceResult => {
          // Re-check inside the write lock: a concurrent request with the same key may have just finished.
          const again = db.prepare<[string, string], { body_hash: string; status: number; response: string }>("SELECT body_hash, status, response FROM idempotency_keys WHERE key = ? AND user_id = ?").get(idemKey, userId);
          if (again) return again.body_hash === bodyHash ? { status: again.status, body: JSON.parse(again.response) } : { status: 409, body: { error: { code: "idempotency_conflict" } } };
          const w = ledger.ensureWallet(userId);
          if (w.balance < total) throw new InsufficientCredits(w.balance, total);
          const t = iso();
          const placed: LiveBet[] = [];
          for (const b of bets) {
            const id = randomUUID();
            const row: BetRow = { ...b, id, user_id: userId, status: "pending", refund: 0, payout: 0, result: null, hold_reason: null, created_at: t, settled_at: null };
            db.prepare(
              `INSERT INTO live_bets (id, user_id, slip_key, date, venue, bet_type, selection, race_ids, first_post_time, unit, combos, stake, status, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`
            ).run(id, userId, idemKey, b.date, b.venue, b.bet_type, b.selection, b.race_ids, b.first_post_time, b.unit, b.combos, b.stake, t);
            const races = JSON.parse(b.race_ids) as number[];
            ledger.post({
              userId,
              kind: "bet_stake",
              amount: -b.stake,
              idemKey: `stake:${id}`,
              refType: "bet",
              refId: id,
              actor: "system",
              note: JSON.stringify({ date: b.date, venue: b.venue, races, betType: b.bet_type }),
            });
            placed.push(toLiveBet(row));
          }
          const response = { bets: placed, balance: ledger.wallet(userId)!.balance };
          db.prepare("INSERT INTO idempotency_keys (key, user_id, body_hash, status, response, created_at) VALUES (?, ?, ?, 200, ?, ?)").run(idemKey, userId, bodyHash, JSON.stringify(response), deps.clock());
          return { status: 200, body: response };
        }).immediate();
      } catch (e) {
        if (e instanceof InsufficientCredits) return { status: 402, body: { error: { code: "insufficient_credits", balance: e.balance, required: e.required } } };
        throw e;
      }
    },

    list(userId: string, filter: "pending" | "settled" | "all" = "all", limit = 200): LiveBet[] {
      const where = filter === "pending" ? "AND status = 'pending'" : filter === "settled" ? "AND status <> 'pending'" : "";
      return db
        .prepare<[string, number], BetRow>(`SELECT * FROM live_bets WHERE user_id = ? ${where} ORDER BY created_at DESC LIMIT ?`)
        .all(userId, limit)
        .map(toLiveBet);
    },

    pendingSummary(userId: string): { count: number; stake: number } {
      const r = db.prepare<[string], { n: number; s: number | null }>("SELECT COUNT(*) n, SUM(stake) s FROM live_bets WHERE user_id = ? AND status = 'pending'").get(userId)!;
      return { count: r.n, stake: r.s ?? 0 };
    },
  };
}
export type LiveBets = ReturnType<typeof liveBets>;
