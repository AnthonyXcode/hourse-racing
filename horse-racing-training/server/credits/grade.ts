// How a LIVE bet settles (docs/credits/PRD.md §4.3–4.4). Pure: no DB, so every rule is unit-tested.
import { BET_TYPES, countCombos } from "../../shared/betEngine/index";
import type { BetSelection, RaceResult, RaceStatus, SettleResult } from "../../shared/types";
import { settleAgainstResults } from "../settleCore";
import { hasResult } from "./schedule";

export interface GradeInput {
  selection: BetSelection;
  unit: number;
  combos: number;
  stake: number;
}

export interface CardRunner {
  horseNumber: number;
  isScratched?: boolean;
}

export type Grade =
  /** Some leg has no result yet. */
  | { kind: "wait" }
  /** Full refund (void race / meeting, or every combination scratched). */
  | { kind: "void"; refund: number; refundedCombos: number; reason: "void_race" | "all_scratched" }
  /** Needs an operator: hit with no stored dividend, or an ambiguous dead-heat dividend. */
  | { kind: "hold"; reason: "missing_dividend" | "dead_heat" | "runner_unknown"; result: SettleResult; refund: number; refundedCombos: number }
  | { kind: "settle"; status: "won" | "lost"; payout: number; refund: number; refundedCombos: number; result: SettleResult };

/**
 * Horses POSITIVELY known not to have run (refunded): scratched on the last card refresh before post time,
 * or a withdrawn code (WV, WV-A, WX, WX-A, WXNR…) in the results' runner list. Nothing else counts: a horse that
 * started but didn't finish (PU, FE, UR, DNF, DISQ) is a runner and its bets lose.
 */
export function scratchedIn(card: CardRunner[] | null, result: RaceResult): Set<number> {
  const out = new Set<number>();
  for (const e of card ?? []) if (e.isScratched) out.add(e.horseNumber);
  for (const r of result.runners ?? []) if (r.status === "withdrawn") out.add(r.horseNumber);
  return out;
}

/**
 * Picked horses whose fate is unknown: not withdrawn, not in the finish order, and not listed as a
 * non-finisher (e.g. results stored before runner statuses were kept, or an unrecognised code). The bet is
 * held for the operator rather than guessed either way.
 */
export function unknownRunners(horses: number[], result: RaceResult, withdrawn: Set<number>): number[] {
  const finished = new Set(result.finishOrder.map((f) => f.horseNumber));
  const status = new Map((result.runners ?? []).map((r) => [r.horseNumber, r.status]));
  return horses.filter((h) => !withdrawn.has(h) && !finished.has(h) && status.get(h) !== "nonFinisher" && status.get(h) !== "finished");
}

/** The selection without scratched horses. A scratched banker removes every combination of that leg. */
export function effectiveSelection(sel: BetSelection, scratched: Map<number, Set<number>>): BetSelection | null {
  const legs = [];
  for (const leg of sel.raceLegs) {
    const s = scratched.get(leg.raceNumber) ?? new Set<number>();
    if (leg.bankers.some((b) => s.has(b))) return null;
    legs.push({ ...leg, legs: leg.legs.filter((h) => !s.has(h)) });
  }
  return { ...sel, raceLegs: legs };
}

/** Ties among finishers inside the pool's paying placings for any leg race the bet covers. */
function deadHeatAffects(sel: BetSelection, byRace: Map<number, RaceResult>): boolean {
  const def = BET_TYPES[sel.type];
  return sel.raceLegs.some((leg) => {
    const r = byRace.get(leg.raceNumber)!;
    const depth = sel.type === "place" ? (r.placeDividends?.length ?? 3) : sel.type === "qpl" ? 3 : def.depth;
    const pos = r.finishOrder.filter((f) => f.finishPosition <= depth).map((f) => f.finishPosition);
    return new Set(pos).size < pos.length;
  });
}

/**
 * Grade a pending LIVE bet. `dividendPer10Override` (operator resolve-bet) is the total return per $10 unit
 * for the bet's winning combinations; it replaces a missing or ambiguous dividend.
 */
export function gradeLiveBet(
  bet: GradeInput,
  results: RaceResult[] | null,
  cards: Map<number, CardRunner[] | null>,
  statuses: Map<number, RaceStatus>,
  dividendPer10Override?: number,
  /** Operator decision for a runner_unknown hold: treat horses of unknown fate as runners. */
  opts: { assumeRunners?: boolean } = {}
): Grade {
  const races = bet.selection.raceLegs.map((l) => l.raceNumber);
  if (races.some((n) => statuses.get(n) === "void")) return { kind: "void", refund: bet.stake, refundedCombos: bet.combos, reason: "void_race" };
  const byRace = new Map((results ?? []).map((r) => [r.raceNumber, r]));
  if (!races.every((n) => hasResult(byRace.get(n)))) return { kind: "wait" };

  const scratched = new Map(races.map((n) => [n, scratchedIn(cards.get(n) ?? null, byRace.get(n)!)]));
  const eff = effectiveSelection(bet.selection, scratched);
  const effCombos = eff ? countCombos(eff) : 0;
  const refundedCombos = Math.max(0, bet.combos - effCombos);
  const refund = refundedCombos * bet.unit;
  if (!eff || effCombos === 0) return { kind: "void", refund: bet.stake, refundedCombos: bet.combos, reason: "all_scratched" };

  const raw = settleAgainstResults(eff, results!)!;
  const unknown = eff.raceLegs.flatMap((l) => unknownRunners([...l.bankers, ...l.legs], byRace.get(l.raceNumber)!, scratched.get(l.raceNumber)!));
  if (unknown.length && !opts.assumeRunners) return { kind: "hold", reason: "runner_unknown", result: { ...raw, cost: effCombos * bet.unit }, refund, refundedCombos };
  const scale = bet.unit / 10;
  const effStake = effCombos * bet.unit;
  const result = (payout: number): SettleResult => ({ ...raw, combos: effCombos, cost: effStake, payout, net: payout - effStake });
  if (!raw.hit) return { kind: "settle", status: "lost", payout: 0, refund, refundedCombos, result: result(0) };

  if (dividendPer10Override != null) {
    const payout = Math.floor(dividendPer10Override * scale);
    return { kind: "settle", status: "won", payout, refund, refundedCombos, result: result(payout) };
  }
  if (raw.payout === null) return { kind: "hold", reason: "missing_dividend", result: { ...raw, cost: effStake }, refund, refundedCombos };
  if (deadHeatAffects(eff, byRace)) return { kind: "hold", reason: "dead_heat", result: { ...raw, cost: effStake }, refund, refundedCombos };
  // payout = floor(dividendPer10 × unit / 10 × combosWon); raw.payout already sums the matching dividends.
  const payout = Math.floor(raw.payout * scale + 1e-9);
  return { kind: "settle", status: "won", payout, refund, refundedCombos, result: result(payout) };
}
