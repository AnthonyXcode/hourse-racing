// Grade a selection against a meeting's stored results. Shared by practice (POST /api/settle) and LIVE
// settlement (server/credits/settlement.ts) so both grade bets the same way (docs/credits/PRD.md §4.1).
import { settle } from "../shared/betEngine/index";
import type { BetSelection, RaceResult, SettleResult } from "../shared/types";

/**
 * The DT/TT dividend lives on whichever race object carries it, and only applies when the chosen leg races
 * EXACTLY match the designated pool. Other legs still grade hit/miss but have no official dividend.
 * Returns null when there is no result for the bet's (first) race.
 */
export function settleAgainstResults(selection: BetSelection, results: RaceResult[]): SettleResult | null {
  const byRace = new Map<number, RaceResult>(results.map((r) => [r.raceNumber, r]));
  const sameSet = (a: number[], b: number[]) =>
    a.length === b.length && [...a].sort((x, y) => x - y).join() === [...b].sort((x, y) => x - y).join();
  const selRaces = selection.raceLegs.map((l) => l.raceNumber);

  const multi = selection.type === "doubleTrio" || selection.type === "tripleTrio";
  let dividendSource: RaceResult | undefined;
  if (selection.type === "doubleTrio") {
    dividendSource = results.find((r) => r.doubleTrioDividend != null && r.doubleTrioLegs && sameSet(r.doubleTrioLegs, selRaces));
  } else if (selection.type === "tripleTrio") {
    dividendSource = results.find((r) => r.tripleTrioDividend != null && r.tripleTrioLegs && sameSet(r.tripleTrioLegs, selRaces));
  } else {
    dividendSource = byRace.get(selRaces[0] ?? -1);
  }
  // No matching designated pool: use the bet's own race but STRIP any DT/TT dividend so a non-designated
  // combo never inherits an unrelated pool's payout.
  if (!dividendSource) {
    const fb = byRace.get(selRaces[0] ?? -1);
    if (!fb) return null;
    dividendSource = multi ? { ...fb, doubleTrioDividend: undefined, tripleTrioDividend: undefined } : fb;
  }
  return settle(selection, byRace, dividendSource);
}
