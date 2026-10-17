// Text forms of a selection stored with LIVE bets (same 膽/腳 format practice history stores).
import type { BetSelection, HistoryAllUp, RaceLeg, SettleResult } from "../types";
import { ALL_UP_POOL_CODE } from "../betEngine/allUp";

export function legText(leg: RaceLeg): string {
  const b = leg.bankers.length ? `膽 ${leg.bankers.join(",")}` : "";
  const l = leg.legs.length ? `腳 ${leg.legs.join(",")}` : "";
  return [b, l].filter(Boolean).join("  ") || "—";
}
/** An All Up leg's picks: WIN/PLA legs are plain numbers ("2,8"); banker pools use legText ("膽 1  腳 4,9"). */
export const allUpLegText = (leg: RaceLeg) => (leg.pool === "win" || leg.pool === "place" ? leg.legs.join(",") || "—" : legText(leg));

/** "R11 膽 6  腳 2,4,7"; All Up prefixes each leg's pool code: "R4 WIN 5  |  R6 QIN 膽 1  腳 4,9". */
export const picksText = (sel: BetSelection) =>
  sel.raceLegs.map((l) => `R${l.raceNumber} ${l.pool ? `${ALL_UP_POOL_CODE[l.pool]} ${allUpLegText(l)}` : legText(l)}`).join("  |  ");

/**
 * All Up per-leg summary for History / My bets (docs/all-up/DESIGN-SPEC.md §6.2): LIVE rows (server) and practice
 * rows (client, at save time). Without a result (pending) every leg is toRun.
 */
export function allUpHistory(b: { selection: BetSelection; combos: number; refund: number; result: SettleResult | null }): HistoryAllUp {
  const a = b.result?.allUp;
  const lrs = new Map((b.result?.legResults ?? []).map((lr) => [lr.raceNumber, lr]));
  return {
    formula: b.selection.formula!,
    lines: b.combos,
    linesWon: a ? a.linesWon : null,
    refund: b.refund,
    legs: b.selection.raceLegs.map((leg, i) => {
      const o = a?.legs[i];
      const fin = lrs.get(leg.raceNumber)?.finishers ?? [];
      return {
        raceNumber: leg.raceNumber,
        pool: leg.pool!,
        picks: allUpLegText(leg),
        result: o && fin.length ? fin.slice(0, 4).map((f) => f.horseNumber).join("-") : null,
        dividendText: o ? o.dividendText : null,
        factor: o ? o.factor : null,
        status: o ? o.status : "toRun",
        ...(o && o.refundedCombos > 0 && o.status !== "void" ? { carried: o.refundedCombos } : {}),
      };
    }),
  };
}
