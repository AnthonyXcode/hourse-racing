// Settlement primitives shared by single- and multi-race pools.
//
// Dead-heat handling: a "winning combo" is a set of horses that legitimately fills
// the first `depth` placings. With no dead-heat there is exactly one. With a
// dead-heat AT the cutoff placing (e.g. two horses tie for 3rd → finishPositions
// 1,2,3,3) the locked-in finishers (1st, 2nd) plus EACH tied horse form a combo,
// so a trio pays on {1,2,3a} and {1,2,3b} but NOT {1,2} alone or {1,3a,3b}.
//
//   positions 1,2,3      → combos: {1,2,3}
//   positions 1,2,3,3    → combos: {1,2,3a}, {1,2,3b}
//   positions 1,1,3      → combos: {1a,1b,3}        (|placed| == depth)
//
import type { FinishEntry } from "../types";
import { subsets } from "./combinatorics";

/** Horses with finishPosition <= depth. */
export function placedHorses(finish: FinishEntry[], depth: number): number[] {
  return finish.filter((f) => f.finishPosition <= depth).map((f) => f.horseNumber);
}

/** Finishing position lookup. */
export function positionOf(finish: FinishEntry[], horse: number): number | undefined {
  return finish.find((f) => f.horseNumber === horse)?.finishPosition;
}

/**
 * All winning combos (as Sets) that fill the first `depth` placings, accounting
 * for a dead-heat at the cutoff.
 */
export function winningCombos(finish: FinishEntry[], depth: number): Set<number>[] {
  const placed = finish.filter((f) => f.finishPosition <= depth);
  if (placed.length < depth) return []; // not enough finishers (abandoned/short)
  if (placed.length === depth) return [new Set(placed.map((f) => f.horseNumber))];

  // Dead-heat at the cutoff placing.
  const cutoff = Math.max(...placed.map((f) => f.finishPosition));
  const locked = placed.filter((f) => f.finishPosition < cutoff).map((f) => f.horseNumber);
  const tied = placed.filter((f) => f.finishPosition === cutoff).map((f) => f.horseNumber);
  const need = depth - locked.length;
  if (need <= 0) return [new Set(locked.slice(0, depth))];
  return subsets(tied, need).map((pick) => new Set([...locked, ...pick]));
}

/** Pool = bankers ∪ legs (deduped). */
export function pool(bankers: number[], legs: number[]): Set<number> {
  return new Set([...bankers, ...legs]);
}

/**
 * Does this banker-leg pool cover a winning combo of the given depth?
 * Returns how many distinct winning combos are covered (0 = miss).
 * A combo is covered iff every horse in it is in the pool AND every banker is in the combo.
 */
export function coverCount(
  bankers: number[],
  legs: number[],
  finish: FinishEntry[],
  depth: number
): number {
  const p = pool(bankers, legs);
  const bset = new Set(bankers);
  let n = 0;
  for (const combo of winningCombos(finish, depth)) {
    const allInPool = [...combo].every((h) => p.has(h));
    const bankersIn = [...bset].every((b) => combo.has(b));
    if (allInPool && bankersIn) n++;
  }
  return n;
}
