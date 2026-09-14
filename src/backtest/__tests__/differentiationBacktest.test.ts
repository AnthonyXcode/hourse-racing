import { describe, expect, it } from "vitest";
import { placedFinishers, racecardFilePattern, winningCombos } from "../differentiationBacktest.js";

const finisher = (horseCode: string, finishPosition: number) => ({ horseCode, finishPosition });

describe("placedFinishers", () => {
  it("returns the first three finishers of a normal race", () => {
    const order = [finisher("A", 1), finisher("B", 2), finisher("C", 3), finisher("D", 4)];
    expect(placedFinishers(order).map((f) => f.horseCode)).toEqual(["A", "B", "C"]);
  });

  it("keeps both horses on a dead-heat for 3rd", () => {
    // 20260624_HV_R8: THE HEIR dead-heated 3rd and was paid a place dividend
    const order = [finisher("A", 1), finisher("B", 2), finisher("C", 3), finisher("D", 3), finisher("E", 5)];
    expect(placedFinishers(order).map((f) => f.horseCode)).toEqual(["A", "B", "C", "D"]);
  });

  it("ignores non-finishers with position 0", () => {
    const order = [finisher("A", 1), finisher("B", 2), finisher("C", 3), finisher("X", 0)];
    expect(placedFinishers(order)).toHaveLength(3);
  });
});

describe("winningCombos", () => {
  describe("Trio (size 3)", () => {
    it("has one combo in a normal race", () => {
      const order = [finisher("A", 1), finisher("B", 2), finisher("C", 3), finisher("D", 4)];
      expect(winningCombos(order, 3)).toEqual([["A", "B", "C"]]);
    });

    it("has two combos on a dead-heat for 3rd", () => {
      const order = [finisher("A", 1), finisher("B", 2), finisher("C", 3), finisher("D", 3)];
      expect(winningCombos(order, 3)).toEqual([
        ["A", "B", "C"],
        ["A", "B", "D"],
      ]);
    });

    it("has one combo on a dead-heat for 2nd", () => {
      const order = [finisher("A", 1), finisher("B", 2), finisher("C", 2), finisher("D", 4)];
      expect(winningCombos(order, 3)).toEqual([["A", "B", "C"]]);
    });
  });

  describe("Quinella (size 2)", () => {
    it("has one pair in a normal race", () => {
      const order = [finisher("A", 1), finisher("B", 2), finisher("C", 3)];
      expect(winningCombos(order, 2)).toEqual([["A", "B"]]);
    });

    it("has two pairs on a dead-heat for 2nd", () => {
      const order = [finisher("A", 1), finisher("B", 2), finisher("C", 2), finisher("D", 4)];
      expect(winningCombos(order, 2)).toEqual([
        ["A", "B"],
        ["A", "C"],
      ]);
    });

    it("pairs the two winners on a dead-heat for 1st", () => {
      const order = [finisher("A", 1), finisher("B", 1), finisher("C", 3)];
      expect(winningCombos(order, 2)).toEqual([["A", "B"]]);
    });
  });
});

describe("racecardFilePattern", () => {
  it("matches a month in any season year", () => {
    const pattern = racecardFilePattern(["09"], "HV");
    expect(pattern.test("racecard_20250910_HV_R1.json")).toBe(true);
    expect(pattern.test("racecard_20260909_HV_R1.json")).toBe(true);
    expect(pattern.test("racecard_20251008_HV_R1.json")).toBe(false);
    expect(pattern.test("racecard_20250914_ST_R1.json")).toBe(false);
  });

  it("matches every file for the venue when no months are given", () => {
    const pattern = racecardFilePattern([], null);
    expect(pattern.test("racecard_20250914_ST_R1.json")).toBe(true);
    expect(pattern.test("racecard_20260909_HV_R10.json")).toBe(true);
  });
});
