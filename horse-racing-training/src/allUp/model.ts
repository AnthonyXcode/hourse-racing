// All Up (過關) builder logic for the Bet page: pure, so it is unit-tested (docs/all-up/DESIGN-SPEC.md §1–4).
import { ALL_UP_FORMULAS, ALL_UP_MAX_LEGS, ALL_UP_TRIO_MAX_LEGS, allUpFormulas, allUpLines, elementarySums } from "../../shared/betEngine/allUp";
import { allUpLegCombos } from "../../shared/betEngine/index";
import { choose } from "../../shared/betEngine/combinatorics";
import type { AllUpBreakdown, AllUpFormula, AllUpPool, BetSelection, RaceLeg } from "../../shared/types";

/** One leg as the builder holds it: the race and its pool (the horses live in the page's per-race ticks). */
export interface AllUpDraftLeg {
  raceNumber: number;
  pool: AllUpPool;
}
/** A race's Banker / Select ticks. */
export interface LegTicks {
  bankers: number[];
  legs: number[];
}

/** Most bankers a leg pool takes (QIN/QPL 1, TRI 2, WIN/PLA none). */
export const bankerMaxFor = (pool: AllUpPool) => (pool === "trio" ? 2 : pool === "quinella" || pool === "qpl" ? 1 : 0);

/** 6 legs, or 3 when any leg is TRI. */
export const maxLegsFor = (legs: AllUpDraftLeg[]) => (legs.some((l) => l.pool === "trio") ? ALL_UP_TRIO_MAX_LEGS : ALL_UP_MAX_LEGS);

/** `Nx1` for N legs (the default formula), or null under 2 legs. */
export const defaultFormula = (n: number): AllUpFormula | null => (n >= 2 && n <= ALL_UP_MAX_LEGS ? (`${n}x1` as AllUpFormula) : null);

/** Add a race as a WIN leg (kept sorted by race: the first race to run is leg 1). No-op if present or full. */
export function addLeg(legs: AllUpDraftLeg[], raceNumber: number): AllUpDraftLeg[] {
  if (legs.some((l) => l.raceNumber === raceNumber) || legs.length >= maxLegsFor(legs)) return legs;
  return [...legs, { raceNumber, pool: "win" as const }].sort((a, b) => a.raceNumber - b.raceNumber);
}

/** A draft leg + its race's ticks → the RaceLeg sent to the server (WIN/PLA fold bankers into selections). */
export function toRaceLeg(d: AllUpDraftLeg, t: LegTicks | undefined): RaceLeg {
  const p = t ?? { bankers: [], legs: [] };
  return bankerMaxFor(d.pool) === 0
    ? { raceNumber: d.raceNumber, pool: d.pool, bankers: [], legs: [...p.bankers, ...p.legs] }
    : { raceNumber: d.raceNumber, pool: d.pool, bankers: p.bankers, legs: p.legs };
}

export function buildAllUpSelection(legs: AllUpDraftLeg[], ticks: (raceNumber: number) => LegTicks | undefined, formula: AllUpFormula | null): BetSelection {
  return { type: "allUp", ...(formula ? { formula } : {}), raceLegs: [...legs].sort((a, b) => a.raceNumber - b.raceNumber).map((d) => toRaceLeg(d, ticks(d.raceNumber))) };
}

/** n_i of each leg (0 = not enough horses yet). */
export const legCounts = (sel: BetSelection) => sel.raceLegs.map(allUpLegCombos);

/** The first leg race with no combination yet, or null. */
export function firstEmptyLeg(sel: BetSelection): number | null {
  return sel.raceLegs.find((l) => allUpLegCombos(l) === 0)?.raceNumber ?? null;
}

/** The formula pills for the current legs: each formula with its live line count (null while a leg is empty). */
export function formulaOptions(counts: number[]): { formula: AllUpFormula; lines: number | null }[] {
  const empty = counts.some((n) => n < 1);
  return allUpFormulas(counts.length).map((formula) => ({ formula, lines: empty ? null : allUpLines(formula, counts) }));
}

/** "3x7" → 3 singles, 3 doubles, 1 treble: [{ size, count }]. */
export function formulaParts(formula: AllUpFormula): { size: number; count: number }[] {
  const f = ALL_UP_FORMULAS[formula];
  return f.sizes.map((size) => ({ size, count: choose(f.legs, size) }));
}

/**
 * Change a leg's pool, keeping the ticks: WIN/PLA fold every banker into selections; QIN/QPL keep the first
 * banker only (TRI → QIN with 2 bankers). `moved` = bankers that became selections (announced).
 */
export function switchPool(t: LegTicks, to: AllUpPool): { ticks: LegTicks; moved: number[] } {
  const keep = t.bankers.slice(0, bankerMaxFor(to));
  const moved = t.bankers.slice(keep.length);
  return { ticks: { bankers: keep, legs: [...moved, ...t.legs.filter((h) => !moved.includes(h))] }, moved };
}

/** The unrounded total return: unit × Σ over the formula's groups of Π factors. */
export function rawGross(a: AllUpBreakdown): number {
  const e = elementarySums(a.legs.map((l) => l.factor));
  return a.unit * ALL_UP_FORMULAS[a.formula].sizes.reduce((s, k) => s + e[k]!, 0);
}

/** Practice: was the return rounded to $0.50 (show the caption)? */
export function wasRounded(a: AllUpBreakdown): boolean {
  return a.gross != null && Math.abs(rawGross(a) - a.gross) > 1e-6;
}
