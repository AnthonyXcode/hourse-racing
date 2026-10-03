// Text forms of a selection stored with LIVE bets (same 膽/腳 format practice history stores).
import type { BetSelection, RaceLeg } from "../types";

export function legText(leg: RaceLeg): string {
  const b = leg.bankers.length ? `膽 ${leg.bankers.join(",")}` : "";
  const l = leg.legs.length ? `腳 ${leg.legs.join(",")}` : "";
  return [b, l].filter(Boolean).join("  ") || "—";
}
export const picksText = (sel: BetSelection) => sel.raceLegs.map((l) => `R${l.raceNumber} ${legText(l)}`).join("  |  ");
