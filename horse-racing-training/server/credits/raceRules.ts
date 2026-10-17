// Per-race grading rules shared by single bets (./grade.ts) and All Up legs (../settleCore.ts): withdrawn and
// unknown-fate runners, dead heats that make a stored dividend ambiguous, and HKJC's official dividends.
// Pure: no DB. Split out of grade.ts so settleCore can use them without an import cycle.
import type { BetSelection, RaceResult } from "../../shared/types";

/** HKJC's official dividends for one race, with the winning combination ("2", "2,12", "7,8,9"). */
export type OfficialDividend = { pool: string; comb: string; div: number };

export interface CardRunner {
  horseNumber: number;
  isScratched?: boolean;
}

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

/**
 * A dead heat makes the stored dividend ambiguous only when it creates more winning combinations than the
 * result stores dividends for (one per pool, or one per placing for Place / QPL, without horse numbers):
 * - Win: a tie for 1st (two winners, two dividends).
 * - Place: one of the bet's placed horses is tied (the tied rows can't be told apart); untied horses keep
 *   their own row, since HKJC skips positions after a tie (1, 2, 2, 4).
 * - Quinella: more than two horses in 1st–2nd. Trio / DT / TT: more than three in 1st–3rd in any leg
 *   (a tie for 1st or 2nd still leaves a single trio).
 * - QPL / Tierce / First 4: any tie inside the placings (ordered pools, or per-pair rows).
 */
export function deadHeatAffects(sel: BetSelection, byRace: Map<number, RaceResult>): boolean {
  return sel.raceLegs.some((leg) => {
    const r = byRace.get(leg.raceNumber)!;
    const within = (d: number) => r.finishOrder.filter((f) => f.finishPosition <= d);
    const tied = (d: number) => {
      const pos = within(d).map((f) => f.finishPosition);
      return new Set(pos).size < pos.length;
    };
    switch (sel.type) {
      case "win":
        return within(1).length > 1;
      case "place": {
        const placed = within(r.placeDividends?.length ?? 3);
        const picked = new Set(leg.legs);
        return placed.some((f) => picked.has(f.horseNumber) && placed.some((o) => o !== f && o.finishPosition === f.finishPosition));
      }
      case "quinella":
        return within(2).length > 2;
      case "trio":
      case "doubleTrio":
      case "tripleTrio":
        return within(3).length > 3;
      case "qpl":
      case "tierce":
        return tied(3);
      case "first4":
        return tied(4);
      case "allUp":
        return false; // graded per leg (server/settleCore.ts)
    }
  });
}

const OFFICIAL_POOL: Partial<Record<BetSelection["type"], string>> = { win: "WIN", place: "PLA", quinella: "QIN", qpl: "QPL", trio: "TRI", tierce: "TCE", first4: "FF" };

/**
 * Total official return per $10 for the winning combinations a single-race bet covers, from HKJC's dividends
 * (one row per winning combination, so dead heats are exact). null when the pool isn't published or the
 * bet's combinations aren't in it — the caller then holds as before. Multi-race pools (DT/TT) aren't covered.
 */
export function officialReturn(sel: BetSelection, official: Map<number, OfficialDividend[]> | undefined): number | null {
  const pool = OFFICIAL_POOL[sel.type];
  const leg = sel.raceLegs[0];
  if (!pool || !leg || sel.raceLegs.length !== 1) return null;
  const rows = (official?.get(leg.raceNumber) ?? []).filter((d) => d.pool === pool);
  if (!rows.length) return null;
  const picked = new Set([...leg.bankers, ...leg.legs]);
  let sum = 0;
  for (const d of rows) {
    const horses = d.comb.split(",").map(Number);
    if (horses.every((h) => picked.has(h)) && leg.bankers.every((b) => horses.includes(b))) sum += d.div;
  }
  return sum > 0 ? sum : null;
}

