// All Up formulas, line counts and selection validation (docs/all-up/SPEC.md §2.1–2.2, §8, AC-4/5/7/10).
import { describe, it, expect } from "vitest";
import { ALL_UP_FORMULAS, allUpFormulas, allUpGroups, allUpLines, elementarySums } from "./allUp";
import { betLabel, countCombos } from "./index";
import { choose } from "./combinatorics";
import { validateAllUpSelection } from "../validation";
import { picksText } from "../credits/format";
import type { AllUpFormula, AllUpPool, BetSelection, RaceLeg } from "../types";

const leg = (raceNumber: number, pool: AllUpPool, legs: number[], bankers: number[] = []): RaceLeg => ({ raceNumber, pool, bankers, legs });
const allUp = (formula: AllUpFormula, ...raceLegs: RaceLeg[]): BetSelection => ({ type: "allUp", formula, raceLegs });

describe("All Up formula table (SPEC §2.1)", () => {
  it("has the 41 HKJC formulas; every N x M has M = Σ C(N, k) over its size set", () => {
    const names = Object.keys(ALL_UP_FORMULAS) as AllUpFormula[];
    expect(names).toHaveLength(41);
    for (const f of names) {
      const [n, m] = f.split("x").map(Number);
      const { legs, sizes } = ALL_UP_FORMULAS[f];
      expect(legs, f).toBe(n);
      expect(sizes.reduce((s, k) => s + choose(legs, k), 0), f).toBe(m);
      expect(allUpGroups(f), f).toHaveLength(m!);
      // one combination per leg → lines = M
      expect(allUpLines(f, Array(legs).fill(1)), f).toBe(m);
    }
  });

  it("AC-4: offers exactly the formulas for the leg count, Nx1 first", () => {
    expect(allUpFormulas(2)).toEqual(["2x1", "2x3"]);
    expect(allUpFormulas(3)).toEqual(["3x1", "3x3", "3x4", "3x6", "3x7"]);
    expect([4, 5, 6].map((n) => allUpFormulas(n).length)).toEqual([8, 11, 15]);
    for (const n of [2, 3, 4, 5, 6]) expect(allUpFormulas(n)[0]).toBe(`${n}x1`);
    expect(allUpFormulas(1)).toEqual([]);
    expect(allUpFormulas(7)).toEqual([]);
  });

  it("elementary symmetric sums", () => {
    expect(elementarySums([2, 1, 1])).toEqual([1, 4, 5, 2]);
  });
});

describe("All Up lines and cost (SPEC §2.2, AC-5/6/7)", () => {
  it("3x7 with n = (2,1,1) is 11 lines, not 7 × 2", () => {
    expect(allUpLines("3x7", [2, 1, 1])).toBe(11);
    expect(countCombos(allUp("3x7", leg(1, "place", [1, 2]), leg(2, "win", [3]), leg(3, "win", [4])))).toBe(11);
  });
  it("Ex 2: 23 lines / $230", () => {
    const sel = allUp("3x7", leg(4, "win", [5]), leg(5, "place", [2, 8]), leg(6, "quinella", [1, 4, 9]));
    expect(countCombos(sel)).toBe(23);
    expect(countCombos(sel) * 10).toBe(230);
    expect(countCombos(sel) * 20).toBe(460); // AC-6: $20 doubles the cost
  });
  it("Ex 3: 7 lines / $70", () => {
    expect(countCombos(allUp("3x4", leg(2, "quinella", [1, 3], [6]), leg(3, "win", [4]), leg(5, "place", [7])))).toBe(7);
  });
  it("Ex 4: 9 lines / $90 (QPL 3 pairs × TRI banker 4 with 3 legs)", () => {
    expect(countCombos(allUp("2x1", leg(7, "qpl", [2, 5, 11]), leg(8, "trio", [1, 6, 9], [4])))).toBe(9);
  });
  it("AC-7: leg combos match the single-race pool counts; Nx1 multiplies every leg", () => {
    expect(countCombos(allUp("2x1", leg(1, "trio", [1, 2, 3, 4]), leg(2, "qpl", [1, 2, 3])))).toBe(4 * 3);
    expect(countCombos(allUp("2x1", leg(1, "trio", [1, 2, 3], [5, 6]), leg(2, "quinella", [2, 3], [1])))).toBe(3 * 2);
    // bankers on WIN, or a short leg → 0 lines
    expect(countCombos(allUp("2x1", leg(1, "win", [1], [2]), leg(2, "win", [3])))).toBe(0);
    expect(countCombos(allUp("2x1", leg(1, "quinella", [1]), leg(2, "win", [3])))).toBe(0);
    // formula / leg-count mismatch → 0
    expect(countCombos(allUp("3x1", leg(1, "win", [1]), leg(2, "win", [3])))).toBe(0);
  });
  it("labels and picks text carry the formula and the pool codes", () => {
    const sel = allUp("3x7", leg(4, "win", [5]), leg(5, "place", [2, 8]), leg(6, "quinella", [4, 9], [1]));
    expect(betLabel(sel)).toBe("All Up 3x7");
    expect(picksText(sel)).toBe("R4 WIN 5  |  R5 PLA 2,8  |  R6 QIN 膽 1  腳 4,9");
  });
});

describe("validateAllUpSelection (SPEC §8, AC-10)", () => {
  const ok = allUp("2x1", leg(2, "win", [1]), leg(1, "place", [3, 4]));
  const code = (x: unknown) => {
    const r = validateAllUpSelection(x);
    return r.ok ? "ok" : r.code;
  };

  it("accepts a valid bet and stores legs sorted by race (AC-21), dropping unknown keys", () => {
    const r = validateAllUpSelection({ ...ok, combos: 999, cost: 1 });
    expect(r).toEqual({ ok: true, value: { type: "allUp", formula: "2x1", raceLegs: [leg(1, "place", [3, 4]), leg(2, "win", [1])] } });
  });

  it("rejects 1 leg, 7 legs, duplicate races (own code), a missing / Tierce pool", () => {
    expect(code(allUp("2x1", leg(1, "win", [1])))).toBe("invalid_selection");
    expect(code(allUp("6x1", ...[1, 2, 3, 4, 5, 6, 7].map((n) => leg(n, "win", [1]))))).toBe("invalid_selection");
    expect(code(allUp("2x1", leg(1, "win", [1]), leg(1, "place", [2])))).toBe("all_up_duplicate_race");
    expect(code(allUp("2x1", leg(1, "win", [1]), { raceNumber: 2, bankers: [], legs: [2] }))).toBe("invalid_selection");
    expect(code(allUp("2x1", leg(1, "win", [1]), { ...leg(2, "win", [1, 2, 3]), pool: "tierce" as AllUpPool }))).toBe("invalid_selection");
    expect(code(null)).toBe("invalid_selection");
    expect(code({ ...ok, type: "trio" })).toBe("invalid_selection");
  });

  it("rejects bad horses and banker rules per pool (V4)", () => {
    expect(code(allUp("2x1", leg(1, "win", [1], [2]), leg(2, "win", [3])))).toBe("invalid_selection"); // WIN banker
    expect(code(allUp("2x1", leg(1, "quinella", [1, 2], [3, 4]), leg(2, "win", [3])))).toBe("invalid_selection"); // 2 QIN bankers
    expect(code(allUp("2x1", leg(1, "trio", [1, 2], [3, 4]), leg(2, "win", [3])))).toBe("ok"); // 2 TRI bankers
    expect(code(allUp("2x1", leg(1, "trio", [1, 2], [3, 4, 5]), leg(2, "win", [3])))).toBe("invalid_selection");
    expect(code(allUp("2x1", leg(1, "quinella", [1, 2], [1]), leg(2, "win", [3])))).toBe("invalid_selection"); // banker also a leg
    expect(code(allUp("2x1", leg(1, "win", [1, 1]), leg(2, "win", [3])))).toBe("invalid_selection");
    expect(code(allUp("2x1", leg(1, "win", [100]), leg(2, "win", [3])))).toBe("invalid_selection");
    expect(code(allUp("2x1", leg(1, "win", []), leg(2, "win", [3])))).toBe("invalid_selection"); // n_i = 0
    expect(code(allUp("2x1", leg(1, "trio", [1, 2]), leg(2, "win", [3])))).toBe("invalid_selection"); // TRI needs 3
  });

  it("all_up_too_many_legs: a TRI leg with 4+ legs", () => {
    expect(code(allUp("4x1", leg(1, "trio", [1, 2, 3]), leg(2, "win", [1]), leg(3, "win", [1]), leg(4, "win", [1])))).toBe("all_up_too_many_legs");
    expect(code(allUp("3x7", leg(1, "trio", [1, 2, 3]), leg(2, "win", [1]), leg(3, "win", [1])))).toBe("ok");
  });

  it("all_up_bad_formula: missing, unknown, or not matching the leg count", () => {
    expect(code({ type: "allUp", raceLegs: ok.raceLegs })).toBe("all_up_bad_formula");
    expect(code({ ...ok, formula: "2x2" })).toBe("all_up_bad_formula");
    expect(code({ ...ok, formula: "3x7" })).toBe("all_up_bad_formula");
  });
});
