import { describe, it, expect } from "vitest";
import { addLeg, bankerMaxFor, buildAllUpSelection, defaultFormula, firstEmptyLeg, formulaOptions, formulaParts, legCounts, maxLegsFor, rawGross, switchPool, wasRounded, type AllUpDraftLeg } from "./model";
import type { AllUpBreakdown } from "../../shared/types";

const ticks: Record<number, { bankers: number[]; legs: number[] }> = {
  4: { bankers: [], legs: [5] },
  5: { bankers: [], legs: [2, 8] },
  6: { bankers: [], legs: [1, 4, 9] },
};

describe("All Up builder model", () => {
  it("adds legs sorted by race, WIN by default; caps at 6, or 3 with a TRI leg", () => {
    let legs: AllUpDraftLeg[] = [];
    for (const rn of [5, 3, 5]) legs = addLeg(legs, rn);
    expect(legs).toEqual([{ raceNumber: 3, pool: "win" }, { raceNumber: 5, pool: "win" }]);
    legs = [1, 2, 4, 6, 7].reduce((l, rn) => addLeg(l, rn), legs);
    expect(legs.map((l) => l.raceNumber)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(maxLegsFor(legs)).toBe(6);
    const tri: AllUpDraftLeg[] = [{ raceNumber: 1, pool: "trio" }, { raceNumber: 2, pool: "win" }, { raceNumber: 3, pool: "win" }];
    expect(maxLegsFor(tri)).toBe(3);
    expect(addLeg(tri, 4)).toBe(tri);
  });

  it("adds a leg in a given pool; TRI falls back to WIN past 3 legs", () => {
    const two: AllUpDraftLeg[] = [{ raceNumber: 1, pool: "quinella" }, { raceNumber: 2, pool: "quinella" }];
    expect(addLeg(two, 3, "quinella")[2]).toEqual({ raceNumber: 3, pool: "quinella" });
    expect(addLeg(two, 3, "trio")[2]).toEqual({ raceNumber: 3, pool: "trio" });
    const three = addLeg(two, 3, "place");
    expect(addLeg(three, 4, "trio")[3]).toEqual({ raceNumber: 4, pool: "win" });
  });

  it("defaults to Nx1", () => {
    expect([1, 2, 3, 6, 7].map(defaultFormula)).toEqual([null, "2x1", "3x1", "6x1", null]);
  });

  it("builds the Ex 2 selection: formula pills show live lines (3x7 = 23), parts 3+3+1", () => {
    const legs: AllUpDraftLeg[] = [{ raceNumber: 6, pool: "quinella" }, { raceNumber: 4, pool: "win" }, { raceNumber: 5, pool: "place" }];
    const sel = buildAllUpSelection(legs, (rn) => ticks[rn], "3x7");
    expect(sel.raceLegs.map((l) => [l.raceNumber, l.pool])).toEqual([[4, "win"], [5, "place"], [6, "quinella"]]);
    expect(legCounts(sel)).toEqual([1, 2, 3]);
    expect(formulaOptions(legCounts(sel))).toEqual([
      { formula: "3x1", lines: 6 },
      { formula: "3x3", lines: 11 },
      { formula: "3x4", lines: 17 },
      { formula: "3x6", lines: 17 },
      { formula: "3x7", lines: 23 },
    ]);
    expect(formulaParts("3x7")).toEqual([{ size: 1, count: 3 }, { size: 2, count: 3 }, { size: 3, count: 1 }]);
    expect(firstEmptyLeg(sel)).toBeNull();
  });

  it("an empty leg shows — on every pill and is named for the error", () => {
    const sel = buildAllUpSelection([{ raceNumber: 4, pool: "win" }, { raceNumber: 7, pool: "quinella" }], (rn) => (rn === 7 ? { bankers: [], legs: [3] } : ticks[rn]), "2x1");
    expect(formulaOptions(legCounts(sel)).map((o) => o.lines)).toEqual([null, null]);
    expect(firstEmptyLeg(sel)).toBe(7);
  });

  it("WIN/PLA legs fold banker ticks into selections", () => {
    const sel = buildAllUpSelection([{ raceNumber: 1, pool: "win" }, { raceNumber: 2, pool: "trio" }], () => ({ bankers: [3], legs: [4, 5, 6] }), "2x1");
    expect(sel.raceLegs[0]).toEqual({ raceNumber: 1, pool: "win", bankers: [], legs: [3, 4, 5, 6] });
    expect(sel.raceLegs[1]).toEqual({ raceNumber: 2, pool: "trio", bankers: [3], legs: [4, 5, 6] });
  });

  it("switching pool keeps ticks; TRI → QIN keeps the first banker and moves the second", () => {
    expect(bankerMaxFor("trio")).toBe(2);
    expect(switchPool({ bankers: [1, 2], legs: [3, 4] }, "quinella")).toEqual({ ticks: { bankers: [1], legs: [2, 3, 4] }, moved: [2] });
    expect(switchPool({ bankers: [1], legs: [3] }, "win")).toEqual({ ticks: { bankers: [], legs: [1, 3] }, moved: [1] });
    expect(switchPool({ bankers: [1], legs: [3] }, "trio")).toEqual({ ticks: { bankers: [1], legs: [3] }, moved: [] });
  });

  it("knows when a practice return was rounded", () => {
    const base = { formula: "2x1", unit: 10, lines: 1, linesWon: 1, linesRefunded: 0, refund: 0, status: "won" } as const;
    const leg = (factor: number) => ({ raceNumber: 1, pool: "win" as const, combos: 1, winningCombos: 1, refundedCombos: 0, dividend: factor * 10, factor, dividendText: "", status: "won" as const });
    const ex1: AllUpBreakdown = { ...base, legs: [leg(4.55), leg(2.3)], gross: 104.5 };
    expect(rawGross(ex1)).toBeCloseTo(104.65);
    expect(wasRounded(ex1)).toBe(true);
    expect(wasRounded({ ...ex1, legs: [leg(3.8), leg(2)], gross: 76 })).toBe(false);
  });
});
