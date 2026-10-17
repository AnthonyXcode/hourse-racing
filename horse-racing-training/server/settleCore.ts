// Grade a selection against a meeting's stored results. Shared by practice (POST /api/settle) and LIVE
// settlement (server/credits/settlement.ts) so both grade bets the same way (docs/credits/PRD.md §4.1).
import { allUpLegCombos, describe, headlineDividend, legResult, settle } from "../shared/betEngine/index";
import { ALL_UP_FORMULAS, allUpLines, elementarySums, elementarySumsBig } from "../shared/betEngine/allUp";
import { deadHeatAffects, officialReturn, scratchedIn, unknownRunners, type OfficialDividend } from "./credits/raceRules";
import type { AllUpBreakdown, AllUpLegOutcome, BetSelection, LegResult, RaceLeg, RaceResult, SettleDetail, SettleResult } from "../shared/types";

/**
 * The DT/TT dividend lives on whichever race object carries it, and only applies when the chosen leg races
 * EXACTLY match the designated pool. Other legs still grade hit/miss but have no official dividend.
 * Returns null when there is no result for the bet's (first) race.
 */
export function settleAgainstResults(selection: BetSelection, results: RaceResult[]): SettleResult | null {
  if (selection.type === "allUp") {
    // Practice at $10 a line; callers that know the unit / official dividends call settleAllUp directly.
    const r = settleAllUp(selection, results, { unit: 10, mode: "practice" });
    return r.kind === "noResult" ? null : r.result;
  }
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

// ---- All Up (過關): docs/all-up/SPEC.md §6 ----

export type AllUpHoldReason = "missing_dividend" | "dead_heat" | "runner_unknown";

export interface AllUpContext {
  /** $ per line; the result is computed (and rounded) at this unit. */
  unit: number;
  /** practice: gross rounded to the nearest $0.50 (quarters up). live: credits, floor(gross). */
  mode: "practice" | "live";
  /** Leg races declared void / abandoned (LIVE): every combination of that leg is refunded. */
  voidRaces?: Set<number>;
  /** Withdrawn horses per race. Default: the result's withdrawn runners. */
  scratched?: Map<number, Set<number>>;
  /** HKJC per-combination dividends by race (dead heats / missing stored dividends). */
  official?: Map<number, OfficialDividend[]>;
  /** Operator per-leg return per $10 for that leg's winning combinations (resolve-bet --leg R:div). */
  legDividends?: Map<number, number>;
  /** LIVE: hold when a picked horse's fate is unknown, unless the operator says they ran (assumeRunners). */
  checkRunners?: boolean;
  assumeRunners?: boolean;
}

export type AllUpSettle =
  /** A leg race (not void) has no result. */
  | { kind: "noResult"; race: number }
  /** A leg needs an operator; result.payout is null. */
  | { kind: "hold"; reason: AllUpHoldReason; result: SettleResult }
  | { kind: "done"; status: "won" | "lost" | "void"; payout: number; refund: number; refundedLines: number; result: SettleResult };

/** Per-$1 scale of a leg factor: F_i is kept as an integer in thousandths (a dividend in cents per $10). */
const S = 1000n;

/**
 * Settle an All Up selection (legs sorted by race, already validated) exactly:
 *   F_i = W_i / 10 + refunded_i,  R_i = refunded_i
 *   gross = unit × Σ_G Π_{i∈G} F_i,  refund = unit × Σ_G Π_{i∈G} R_i,  payout = gross − refund
 * with Σ_G over the formula's leg groups computed as elementary symmetric sums, in bigint (no rounding between
 * legs). Practice rounds gross to the nearest $0.50 (halves up); LIVE floors it. Refunds are whole units.
 */
export function settleAllUp(selection: BetSelection, results: RaceResult[], ctx: AllUpContext): AllUpSettle {
  const formula = selection.formula!;
  const byRace = new Map<number, RaceResult>(results.map((r) => [r.raceNumber, r]));
  const legs: AllUpLegOutcome[] = [];
  const legResults: LegResult[] = [];
  const heldRaces: number[] = [];
  let holdReason: AllUpHoldReason | null = null;
  const hold = (race: number, reason: AllUpHoldReason) => {
    heldRaces.push(race);
    holdReason ??= reason;
  };

  for (const leg of selection.raceLegs) {
    const pool = leg.pool!;
    const n = allUpLegCombos(leg);
    const race = leg.raceNumber;
    const out: AllUpLegOutcome = { raceNumber: race, pool, combos: n, winningCombos: 0, refundedCombos: 0, dividend: 0, factor: 0, dividendText: "—", status: "lost" };
    if (ctx.voidRaces?.has(race)) {
      Object.assign(out, { refundedCombos: n, factor: n, dividendText: "VOID", status: "void" });
      legs.push(out);
      const res = byRace.get(race);
      legResults.push(res ? legResult(res, 4, true) : { raceNumber: race, finishers: [], covered: true });
      continue;
    }
    const res = byRace.get(race);
    if (!res) return { kind: "noResult", race };
    out.dividendText = headlineDividend(pool, res).text;
    const scratched = ctx.scratched?.get(race) ?? scratchedIn(null, res);
    const effLeg: RaceLeg = leg.bankers.some((b) => scratched.has(b)) ? { ...leg, legs: [] } : { ...leg, legs: leg.legs.filter((h) => !scratched.has(h)) };
    const effN = allUpLegCombos(effLeg);
    out.refundedCombos = n - effN;
    let w = 0;
    if (effN > 0) {
      const single: BetSelection = { type: pool, raceLegs: [{ raceNumber: race, bankers: effLeg.bankers, legs: effLeg.legs }] };
      const raw = settle(single, byRace, res);
      if (ctx.checkRunners && !ctx.assumeRunners && unknownRunners([...effLeg.bankers, ...effLeg.legs], res, scratched).length) {
        hold(race, "runner_unknown");
        out.status = "hold";
      } else if (raw.hit) {
        out.winningCombos = raw.combosWon;
        const override = ctx.legDividends?.get(race);
        const deadHeat = raw.payout !== null && deadHeatAffects(single, byRace);
        if (override != null) w = override;
        else if (raw.payout !== null && !deadHeat) w = raw.payout;
        else {
          const off = officialReturn(single, ctx.official);
          if (off == null) {
            hold(race, deadHeat ? "dead_heat" : "missing_dividend");
            out.status = "hold";
          } else w = off;
        }
      }
    }
    out.dividend = w;
    const fMilli = Math.round(w * 100) + out.refundedCombos * 1000;
    out.factor = fMilli / 1000;
    if (out.status !== "hold") out.status = w > 0 ? "won" : out.refundedCombos > 0 ? "refund" : "lost";
    legs.push(out);
    legResults.push(legResult(res, 4, out.winningCombos > 0 || out.refundedCombos > 0));
  }

  const { sizes } = ALL_UP_FORMULAS[formula];
  const N = legs.length;
  const lines = allUpLines(formula, legs.map((l) => l.combos));
  const stake = lines * ctx.unit;
  const sumGroups = (xs: number[]) => sizes.reduce((s, k) => s + elementarySums(xs)[k]!, 0);
  const linesRefunded = sumGroups(legs.map((l) => l.refundedCombos));
  const linesWon = sumGroups(legs.map((l) => l.winningCombos + l.refundedCombos)) - linesRefunded;
  const refund = linesRefunded * ctx.unit;
  const poolDividendText = legs.map((l) => `R${l.raceNumber} ${l.dividendText}`).join(" × ");

  const make = (status: AllUpBreakdown["status"], gross: number | null, payout: number | null, info: SettleDetail): SettleResult => ({
    hit: status === "won",
    combosWon: linesWon,
    combos: lines,
    cost: stake,
    payout,
    net: payout === null ? null : payout + refund - stake,
    detail: describe(info),
    detailInfo: info,
    legResults,
    poolDividend: null,
    poolDividendText,
    allUp: { formula, unit: ctx.unit, lines, legs, linesWon, linesRefunded, gross, refund, status },
  });

  if (holdReason) return { kind: "hold", reason: holdReason, result: make("hold", null, null, { code: "allUpHold", formula, races: heldRaces }) };

  // Exact: gross = unit × Σ_k e_k(F') / S^k = unit × num / S^N, with F' = F × S.
  const eF = elementarySumsBig(legs.map((l) => BigInt(Math.round(l.dividend * 100)) + BigInt(l.refundedCombos) * S));
  const num = sizes.reduce((s, k) => s + eF[k]! * S ** BigInt(N - k), 0n);
  const den = S ** BigInt(N);
  const u = BigInt(ctx.unit);
  const gross =
    ctx.mode === "live"
      ? Number((u * num) / den) // floor
      : Number((4n * u * num + den) / (2n * den)) / 2; // nearest $0.50, exact quarters up
  const payout = gross - refund;
  if (stake > 0 && refund === stake) return { kind: "done", status: "void", payout: 0, refund, refundedLines: linesRefunded, result: make("void", gross, 0, { code: "allUpVoid" }) };
  const status = payout > 0 ? "won" : "lost";
  // The leg that killed the lines: the first one that LOST (not one that was refunded / void).
  const missRace = (legs.find((l) => l.status === "lost") ?? legs.find((l) => l.dividend === 0) ?? legs[0])!.raceNumber;
  const info: SettleDetail = status === "won" ? { code: "allUpHit", formula, linesWon, lines } : { code: "allUpMiss", formula, race: missRace };
  return { kind: "done", status, payout, refund, refundedLines: linesRefunded, result: make(status, gross, payout, info) };
}
