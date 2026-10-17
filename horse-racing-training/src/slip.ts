// Bet-slip data: what the stake calculator adds and the slip settles.
import { UNIT } from "../shared/betEngine/index";
import type { BetSelection, BetTypeId, MeetingRef, SettleResult } from "../shared/types";

/** "20260923" → Date at noon HK time (safe to format in any timezone). */
export const ymd = (d: string) => new Date(`${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}T12:00:00+08:00`);

/** HKJC's minimum unit bet (HKD). */
export const MIN_UNIT = 10;

/** The unit-bet field's text → a whole number ≥ MIN_UNIT, or null (then Add is blocked and the error shows). */
export function parseUnit(text: string): number | null {
  const s = text.trim();
  if (!/^\d+$/.test(s)) return null;
  const n = Number(s);
  return n >= MIN_UNIT && Number.isSafeInteger(n) ? n : null;
}

export interface SlipItem {
  id: string;
  date: string;
  venue: MeetingRef["venue"];
  betType: BetTypeId;
  selection: BetSelection;
  /** HKD per combination. */
  unit: number;
  combos: number;
  /** combos × unit */
  cost: number;
  /** practice (instant, imaginary HK$) or live (credits, settles after the race). Missing = practice. */
  mode?: "practice" | "live";
}

export interface SettledBet {
  item: SlipItem;
  /** Already scaled to the item's unit bet. */
  result: SettleResult;
}

/** The server settles at $10 a combination; scale money to the slip's unit bet (pool dividends stay per $10). */
export function scaleResult(r: SettleResult, unit: number): SettleResult {
  if (r.allUp) return r; // All Up is settled at its unit (rounded per ticket) by the server: never rescale
  const k = unit / UNIT;
  return { ...r, cost: r.cost * k, payout: r.payout === null ? null : r.payout * k, net: r.net === null ? null : r.net * k };
}
