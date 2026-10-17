// How a LIVE bet settles (docs/credits/PRD.md §4.3–4.4). Pure: no DB, so every rule is unit-tested.
import { countCombos } from "../../shared/betEngine/index";
import type { BetSelection, RaceResult, RaceStatus, SettleResult } from "../../shared/types";
import { settleAgainstResults, settleAllUp } from "../settleCore";
import { hasResult } from "./schedule";
import { deadHeatAffects, officialReturn, scratchedIn, unknownRunners, type CardRunner, type OfficialDividend } from "./raceRules";

export { deadHeatAffects, officialReturn, scratchedIn, unknownRunners, type CardRunner, type OfficialDividend };

export interface GradeInput {
  selection: BetSelection;
  unit: number;
  combos: number;
  stake: number;
}

export type Grade =
  /** Some leg has no result yet. */
  | { kind: "wait" }
  /** Full refund (void race / meeting, or every combination scratched). */
  | { kind: "void"; refund: number; refundedCombos: number; reason: "void_race" | "all_scratched"; /** All Up: the per-leg breakdown. */ result?: SettleResult }
  /** Needs an operator: hit with no stored dividend, or an ambiguous dead-heat dividend. */
  | { kind: "hold"; reason: "missing_dividend" | "dead_heat" | "runner_unknown"; result: SettleResult; refund: number; refundedCombos: number }
  | { kind: "settle"; status: "won" | "lost"; payout: number; refund: number; refundedCombos: number; result: SettleResult };

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
  /** assumeRunners: operator decision for a runner_unknown hold (treat horses of unknown fate as runners).
   *  official: HKJC's per-combination dividends by race, used when the stored dividend is missing or a dead heat makes it ambiguous. */
  opts: { assumeRunners?: boolean; official?: Map<number, OfficialDividend[]>; legDividends?: Map<number, number> } = {}
): Grade {
  if (bet.selection.type === "allUp") return gradeAllUp(bet, results, cards, statuses, dividendPer10Override, opts);
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
  const deadHeat = raw.payout !== null && deadHeatAffects(eff, byRace);
  if (raw.payout === null || deadHeat) {
    const off = officialReturn(eff, opts.official);
    if (off == null) return { kind: "hold", reason: deadHeat ? "dead_heat" : "missing_dividend", result: { ...raw, cost: effStake }, refund, refundedCombos };
    const payout = Math.floor(off * scale + 1e-9);
    return { kind: "settle", status: "won", payout, refund, refundedCombos, result: result(payout) };
  }
  // payout = floor(dividendPer10 × unit / 10 × combosWon); raw.payout already sums the matching dividends.
  const payout = Math.floor(raw.payout * scale + 1e-9);
  return { kind: "settle", status: "won", payout, refund, refundedCombos, result: result(payout) };
}

/**
 * Grade a LIVE All Up bet (docs/all-up/SPEC.md §6–7): waits until EVERY leg race is resulted or void; void legs and
 * scratchings carry forward ×1 instead of voiding the bet; status void only when every line is fully refunded.
 * refundedCombos here = fully refunded lines. `dividendPer10Override` applies to the single held leg (if exactly
 * one is held); `opts.legDividends` gives per-leg returns per $10 (resolve-bet --leg R:div).
 */
function gradeAllUp(
  bet: GradeInput,
  results: RaceResult[] | null,
  cards: Map<number, CardRunner[] | null>,
  statuses: Map<number, RaceStatus>,
  dividendPer10Override: number | undefined,
  opts: { assumeRunners?: boolean; official?: Map<number, OfficialDividend[]>; legDividends?: Map<number, number> }
): Grade {
  const races = bet.selection.raceLegs.map((l) => l.raceNumber);
  const voidRaces = new Set(races.filter((n) => statuses.get(n) === "void"));
  const byRace = new Map((results ?? []).map((r) => [r.raceNumber, r]));
  if (!races.every((n) => voidRaces.has(n) || hasResult(byRace.get(n)))) return { kind: "wait" };
  const scratched = new Map(races.filter((n) => !voidRaces.has(n)).map((n) => [n, scratchedIn(cards.get(n) ?? null, byRace.get(n)!)]));
  const run = (legDividends?: Map<number, number>) =>
    settleAllUp(bet.selection, results ?? [], { unit: bet.unit, mode: "live", voidRaces, scratched, official: opts.official, legDividends, checkRunners: true, assumeRunners: opts.assumeRunners });
  let r = run(opts.legDividends);
  if (r.kind === "hold" && dividendPer10Override != null) {
    const held = r.result.allUp!.legs.filter((l) => l.status === "hold");
    if (held.length === 1) r = run(new Map([...(opts.legDividends ?? []), [held[0]!.raceNumber, dividendPer10Override]]));
  }
  if (r.kind === "noResult") return { kind: "wait" };
  if (r.kind === "hold") {
    const a = r.result.allUp!;
    return { kind: "hold", reason: r.reason, result: r.result, refund: a.refund, refundedCombos: a.linesRefunded };
  }
  if (r.status === "void")
    return { kind: "void", refund: bet.stake, refundedCombos: bet.combos, reason: races.every((n) => voidRaces.has(n)) ? "void_race" : "all_scratched", result: r.result };
  return { kind: "settle", status: r.status, payout: r.payout, refund: r.refund, refundedCombos: r.refundedLines, result: r.result };
}
