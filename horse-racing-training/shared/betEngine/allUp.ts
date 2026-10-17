// All Up (過關) formulas and line counting (docs/all-up/SPEC.md §2.1–2.2). Pure; no imports from ./index so
// both the registry (countCombos) and validation can use it without a cycle.
import type { AllUpFormula, AllUpPool } from "../types";

export const ALL_UP_MIN_LEGS = 2;
export const ALL_UP_MAX_LEGS = 6;
/** A bet with any TRI leg has at most 3 legs (HKJC: FCT/TRI All Up is max 3 races). */
export const ALL_UP_TRIO_MAX_LEGS = 3;
export const ALL_UP_POOLS: readonly AllUpPool[] = ["win", "place", "quinella", "qpl", "trio"];
/** HKJC pool codes, for picks text and dividend display. */
export const ALL_UP_POOL_CODE: Record<AllUpPool, string> = { win: "WIN", place: "PLA", quinella: "QIN", qpl: "QPL", trio: "TRI" };

/** Every HKJC formula: leg count and the leg-group sizes it bets (SPEC §2.1). Table order = display order. */
export const ALL_UP_FORMULAS: Record<AllUpFormula, { legs: number; sizes: number[] }> = {
  "2x1": { legs: 2, sizes: [2] },
  "2x3": { legs: 2, sizes: [1, 2] },
  "3x1": { legs: 3, sizes: [3] },
  "3x3": { legs: 3, sizes: [2] },
  "3x4": { legs: 3, sizes: [2, 3] },
  "3x6": { legs: 3, sizes: [1, 2] },
  "3x7": { legs: 3, sizes: [1, 2, 3] },
  "4x1": { legs: 4, sizes: [4] },
  "4x4": { legs: 4, sizes: [3] },
  "4x5": { legs: 4, sizes: [3, 4] },
  "4x6": { legs: 4, sizes: [2] },
  "4x10": { legs: 4, sizes: [1, 2] },
  "4x11": { legs: 4, sizes: [2, 3, 4] },
  "4x14": { legs: 4, sizes: [1, 2, 3] },
  "4x15": { legs: 4, sizes: [1, 2, 3, 4] },
  "5x1": { legs: 5, sizes: [5] },
  "5x5": { legs: 5, sizes: [4] },
  "5x6": { legs: 5, sizes: [4, 5] },
  "5x10": { legs: 5, sizes: [2] },
  "5x15": { legs: 5, sizes: [1, 2] },
  "5x16": { legs: 5, sizes: [3, 4, 5] },
  "5x20": { legs: 5, sizes: [2, 3] },
  "5x25": { legs: 5, sizes: [1, 2, 3] },
  "5x26": { legs: 5, sizes: [2, 3, 4, 5] },
  "5x30": { legs: 5, sizes: [1, 2, 3, 4] },
  "5x31": { legs: 5, sizes: [1, 2, 3, 4, 5] },
  "6x1": { legs: 6, sizes: [6] },
  "6x6": { legs: 6, sizes: [5] },
  "6x7": { legs: 6, sizes: [5, 6] },
  "6x15": { legs: 6, sizes: [2] },
  "6x20": { legs: 6, sizes: [3] },
  "6x21": { legs: 6, sizes: [1, 2] },
  "6x22": { legs: 6, sizes: [4, 5, 6] },
  "6x35": { legs: 6, sizes: [2, 3] },
  "6x41": { legs: 6, sizes: [1, 2, 3] },
  "6x42": { legs: 6, sizes: [3, 4, 5, 6] },
  "6x50": { legs: 6, sizes: [2, 3, 4] },
  "6x56": { legs: 6, sizes: [1, 2, 3, 4] },
  "6x57": { legs: 6, sizes: [2, 3, 4, 5, 6] },
  "6x62": { legs: 6, sizes: [1, 2, 3, 4, 5] },
  "6x63": { legs: 6, sizes: [1, 2, 3, 4, 5, 6] },
};

export const isAllUpFormula = (x: unknown): x is AllUpFormula => typeof x === "string" && Object.hasOwn(ALL_UP_FORMULAS, x);
export const isAllUpPool = (x: unknown): x is AllUpPool => typeof x === "string" && (ALL_UP_POOLS as readonly string[]).includes(x);

/** Formulas offered for a leg count, in table order (the first is `Nx1`, the default). */
export function allUpFormulas(legs: number): AllUpFormula[] {
  return (Object.keys(ALL_UP_FORMULAS) as AllUpFormula[]).filter((f) => ALL_UP_FORMULAS[f].legs === legs);
}

/**
 * Elementary symmetric sums e_0..e_n of xs: e_k = Σ over k-subsets of Π. The sum over a formula's leg groups
 * of Π_{i∈G} x_i is then Σ_{k ∈ sizes} e_k.
 */
export function elementarySums(xs: number[]): number[] {
  const e = [1, ...xs.map(() => 0)];
  for (const x of xs) for (let k = e.length - 1; k >= 1; k--) e[k] = e[k]! + e[k - 1]! * x;
  return e;
}
/** Exact (bigint) elementary symmetric sums, for settlement. */
export function elementarySumsBig(xs: bigint[]): bigint[] {
  const e = [1n, ...xs.map(() => 0n)];
  for (const x of xs) for (let k = e.length - 1; k >= 1; k--) e[k] = e[k]! + e[k - 1]! * x;
  return e;
}

/** lines = Σ over leg groups G of Π_{i∈G} n_i (SPEC §2.2). 0 when the counts don't fit the formula. */
export function allUpLines(formula: AllUpFormula, counts: number[]): number {
  const f = ALL_UP_FORMULAS[formula];
  if (!f || counts.length !== f.legs || counts.some((n) => !(n >= 1))) return 0;
  const e = elementarySums(counts);
  return f.sizes.reduce((s, k) => s + e[k]!, 0);
}

/** The leg groups a formula bets, as index lists into the (race-sorted) legs. */
export function allUpGroups(formula: AllUpFormula): number[][] {
  const f = ALL_UP_FORMULAS[formula];
  const out: number[][] = [];
  for (let mask = 1; mask < 1 << f.legs; mask++) {
    const g = [...Array(f.legs).keys()].filter((i) => mask & (1 << i));
    if (f.sizes.includes(g.length)) out.push(g);
  }
  return out.sort((a, b) => a.length - b.length || a.join().localeCompare(b.join()));
}
