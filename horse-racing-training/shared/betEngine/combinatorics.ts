// Combinatorics + 膽拖 (banker-leg) combo counting.
// Ported self-contained from the analytics repo's tools/*trio*.ts so this app
// has no coupling to the parent codebase.

/** n choose k. Returns 0 when k > n or k < 0. */
export function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return Math.round(r);
}

/** Permutations n P k (ordered), for exact-order pools (tierce, first4). */
export function perm(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return r;
}

/**
 * Combinations for a banker-leg (膽拖) "any order" pool that needs `size` horses.
 *  - 0 bankers: box C(legs, size)
 *  - b bankers (b < size): each combo is the b bankers + (size-b) legs → C(legs, size-b)
 *  - b >= size: invalid (0)
 */
export function bankerLegCombos(bankers: number, legs: number, size: number): number {
  if (bankers >= size) return 0;
  return choose(legs, size - bankers);
}

/** Ordered (exact-order) banker-leg count for tierce/first4 boxes (no banker support → flat box). */
export function orderedBoxCombos(picks: number, size: number): number {
  return perm(picks, size);
}

/** All k-subsets of an array, returned as arrays. */
export function subsets<T>(arr: T[], k: number): T[][] {
  const out: T[][] = [];
  const rec = (start: number, acc: T[]) => {
    if (acc.length === k) {
      out.push(acc.slice());
      return;
    }
    for (let i = start; i < arr.length; i++) {
      acc.push(arr[i]!);
      rec(i + 1, acc);
      acc.pop();
    }
  };
  rec(0, []);
  return out;
}
