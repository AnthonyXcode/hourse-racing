// Bet-type registry: each pool defines how many leg-races it needs, how to count
// combinations (cost), and how to settle against results. Single source of truth
// used by the server (settle) and the client (cost preview).
import type {
  BetTypeId,
  BetSelection,
  RaceLeg,
  RaceResult,
  SettleResult,
  LegResult,
} from "../types";
import { choose, perm, bankerLegCombos, subsets } from "./combinatorics";
import { coverCount, placedHorses, positionOf } from "./settle";

/** Top finishers of a race for display (ascending position, includes dead-heats). */
function legResult(res: RaceResult, depth: number, covered: boolean): LegResult {
  const finishers = res.finishOrder
    .filter((f) => f.finishPosition <= depth)
    .sort((a, b) => a.finishPosition - b.finishPosition)
    .map((f) => ({ position: f.finishPosition, horseNumber: f.horseNumber, horseName: f.horseName }));
  return { raceNumber: res.raceNumber, finishers, covered };
}

export const UNIT = 10; // HKD per combination

interface BetTypeDef {
  id: BetTypeId;
  label: string;
  legRaces: 1 | 2 | 3;
  /** does this pool support banker (膽) selection? */
  banker: boolean;
  /** horses that must occupy the top-N placings (per leg race). */
  depth: number;
  /** combinations for one leg's picks. */
  legCombos(leg: RaceLeg): number;
}

// "Any order" pools fill `depth` placings; banker support via bankerLegCombos.
const anyOrder = (depth: number, banker: boolean): BetTypeDef["legCombos"] => (leg) =>
  banker
    ? bankerLegCombos(leg.bankers.length, leg.legs.length, depth)
    : choose(leg.legs.length, depth);

export const BET_TYPES: Record<BetTypeId, BetTypeDef> = {
  win: { id: "win", label: "Win", legRaces: 1, banker: false, depth: 1, legCombos: (l) => l.legs.length },
  place: { id: "place", label: "Place", legRaces: 1, banker: false, depth: 1, legCombos: (l) => l.legs.length },
  quinella: { id: "quinella", label: "Quinella", legRaces: 1, banker: true, depth: 2, legCombos: anyOrder(2, true) },
  qpl: { id: "qpl", label: "Quinella Place", legRaces: 1, banker: true, depth: 2, legCombos: anyOrder(2, true) },
  trio: { id: "trio", label: "Trio", legRaces: 1, banker: true, depth: 3, legCombos: anyOrder(3, true) },
  tierce: { id: "tierce", label: "Tierce", legRaces: 1, banker: false, depth: 3, legCombos: (l) => perm(l.legs.length, 3) },
  first4: { id: "first4", label: "First 4", legRaces: 1, banker: false, depth: 4, legCombos: (l) => perm(l.legs.length, 4) },
  doubleTrio: { id: "doubleTrio", label: "Double Trio", legRaces: 2, banker: true, depth: 3, legCombos: anyOrder(3, true) },
  tripleTrio: { id: "tripleTrio", label: "Triple Trio", legRaces: 3, banker: true, depth: 3, legCombos: anyOrder(3, true) },
};

/** Total combinations across all leg races (multi-race pools multiply). */
export function countCombos(sel: BetSelection): number {
  const def = BET_TYPES[sel.type];
  if (sel.raceLegs.length !== def.legRaces) return 0;
  let total = 1;
  for (const leg of sel.raceLegs) {
    const c = def.legCombos(leg);
    if (c <= 0) return 0;
    total *= c;
  }
  return total;
}

export function cost(sel: BetSelection): number {
  return countCombos(sel) * UNIT;
}

/** Dividend lookup per bet type (per $10 unit). null when absent. */
function dividend(type: BetTypeId, res: RaceResult, leg: RaceLeg): number | null {
  switch (type) {
    case "win":
      return res.winDividend ?? null;
    case "place": {
      // Sum the place dividends of every selected horse that placed.
      const divs = res.placeDividends;
      if (!divs) return null;
      let sum = 0;
      let any = false;
      for (const h of leg.legs) {
        const pos = positionOf(res.finishOrder, h);
        if (pos && pos <= divs.length) {
          sum += divs[pos - 1] ?? 0;
          any = true;
        }
      }
      return any ? sum : null;
    }
    case "quinella":
      return res.quinellaDividend ?? null;
    case "qpl": {
      const divs = res.quinellaPlaceDividends;
      if (!divs) return null;
      // Map covered top-3 pairs to the three QPL dividends (by generation order).
      const placed = placedHorses(res.finishOrder, 3);
      const pairs = subsets(placed, 2);
      const p = new Set([...leg.bankers, ...leg.legs]);
      const bset = new Set(leg.bankers);
      let sum = 0;
      let any = false;
      pairs.forEach((pair, i) => {
        const covered = pair.every((h) => p.has(h)) && [...bset].every((b) => pair.includes(b));
        if (covered) {
          sum += divs[i] ?? 0;
          any = true;
        }
      });
      return any ? sum : null;
    }
    case "trio":
      return res.trioDividend ?? null;
    case "tierce":
      return res.tierceDividend ?? null;
    case "first4":
      return res.first4Dividend ?? null;
    case "doubleTrio":
      return res.doubleTrioDividend ?? null;
    case "tripleTrio":
      return res.tripleTrioDividend ?? null;
  }
}

/**
 * Settle a selection against the meeting's results (one RaceResult per leg race).
 * `resultsByRace` maps raceNumber -> RaceResult.
 * `dividendSource` is the RaceResult that carries the pool's dividend (for multi-race
 * pools the DT/TT dividend lives on a single race object in the meeting file).
 */
export function settle(
  sel: BetSelection,
  resultsByRace: Map<number, RaceResult>,
  dividendSource: RaceResult
): SettleResult {
  const def = BET_TYPES[sel.type];
  const combos = countCombos(sel);
  const costAmt = combos * UNIT;

  // Finishers shown for context: top-4 for First 4, else top-3 (top-1 pools still
  // show the placing context).
  const showDepth = sel.type === "first4" ? 4 : 3;

  const base = (
    hit: boolean,
    combosWon: number,
    payout: number | null,
    detail: string,
    legResults: LegResult[]
  ): SettleResult => ({
    hit,
    combosWon,
    combos,
    cost: costAmt,
    payout: hit ? payout : 0,
    net: hit ? (payout === null ? null : payout - costAmt) : -costAmt,
    detail,
    legResults,
  });

  if (combos === 0) return base(false, 0, 0, "Invalid selection (need more horses).", []);

  // Win / Place: hit if any selected horse occupies a paying placing.
  if (sel.type === "win" || sel.type === "place") {
    const leg = sel.raceLegs[0]!;
    const res = resultsByRace.get(leg.raceNumber);
    if (!res) return base(false, 0, 0, `No result for race ${leg.raceNumber}.`, []);
    const depth = sel.type === "win" ? 1 : res.placeDividends?.length ?? 3;
    const placed = new Set(placedHorses(res.finishOrder, depth));
    const winners = leg.legs.filter((h) => placed.has(h));
    const lr = [legResult(res, Math.max(showDepth, depth), winners.length > 0)];
    if (winners.length === 0) return base(false, 0, 0, `Miss — none of [${leg.legs.join(",")}] in top ${depth}.`, lr);
    const div = dividend(sel.type, res, leg);
    return base(true, winners.length, div, `Hit — #${winners.join(",#")} placed (top ${depth}).`, lr);
  }

  // Quinella Place: any TWO of the top three. Up to 3 winning pairs.
  if (sel.type === "qpl") {
    const leg = sel.raceLegs[0]!;
    const res = resultsByRace.get(leg.raceNumber);
    if (!res) return base(false, 0, 0, `No result for race ${leg.raceNumber}.`, []);
    const top3 = placedHorses(res.finishOrder, 3);
    const p = new Set([...leg.bankers, ...leg.legs]);
    const bset = new Set(leg.bankers);
    let combosWon = 0;
    for (const pair of subsets(top3, 2)) {
      if (pair.every((h) => p.has(h)) && [...bset].every((b) => pair.includes(b))) combosWon++;
    }
    const lr = [legResult(res, 3, combosWon > 0)];
    if (combosWon === 0) return base(false, 0, 0, `Miss — no covered pair among top 3 (${top3.join("-")}).`, lr);
    const div = dividend("qpl", res, leg);
    return base(true, combosWon, div, `Hit — ${combosWon} of 3 placing pairs covered.`, lr);
  }

  // Trio / Tierce / First4 / Double Trio / Triple Trio:
  // every leg race must cover a winning combo of `depth`.
  const legResults: LegResult[] = [];
  let combosWon = 1;
  let missRace = -1;
  for (const leg of sel.raceLegs) {
    const res = resultsByRace.get(leg.raceNumber);
    if (!res) return base(false, 0, 0, `No result for race ${leg.raceNumber}.`, legResults);
    const n = coverCount(leg.bankers, leg.legs, res.finishOrder, def.depth);
    legResults.push(legResult(res, showDepth, n > 0));
    if (n === 0) {
      if (missRace < 0) missRace = leg.raceNumber;
      combosWon = 0;
    } else if (combosWon > 0) {
      combosWon *= n;
    }
  }

  if (combosWon === 0) {
    return base(false, 0, 0, `Miss — race ${missRace} not covered.`, legResults);
  }
  const div = dividend(sel.type, dividendSource, sel.raceLegs[0]!);
  const payout = div === null ? null : div * combosWon;
  const legsDesc = sel.raceLegs
    .map((l) => `R${l.raceNumber}${l.bankers.length ? ` 膽${l.bankers.join(",")}` : ""}`)
    .join(" + ");
  return base(true, combosWon, payout, `Hit — ${legsDesc}.${combosWon > 1 ? ` ${combosWon}× (dead-heat)` : ""}`, legResults);
}
