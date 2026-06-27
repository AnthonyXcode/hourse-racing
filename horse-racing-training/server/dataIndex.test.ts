import { describe, it, expect } from "vitest";
import { getManifest, resultPath, readJson } from "./dataIndex";
import { settle } from "../shared/betEngine/index";
import type { RaceResult, BetSelection } from "../shared/types";

describe("data manifest (real data)", () => {
  const meetings = getManifest();
  it("finds meetings with races sorted", () => {
    expect(meetings.length).toBeGreaterThan(0);
    const m = meetings[0]!;
    expect(m.races).toEqual([...m.races].sort((a, b) => a - b));
  });
  it("flags meetings that have results", () => {
    expect(meetings.some((m) => m.hasResults)).toBe(true);
  });
});

describe("settle against real ST 2026-06-27 (Strategy A R11 hit)", () => {
  const results = readJson<RaceResult[]>(resultPath("20260627", "ST"))!;
  const byRace = new Map(results.map((r) => [r.raceNumber, r]));
  it("R11 trio banker #6 + legs hits for $854", () => {
    // Real result R11: 5-2-6, trioDividend 854.
    const sel: BetSelection = {
      type: "trio",
      raceLegs: [{ raceNumber: 11, bankers: [6], legs: [2, 4, 7, 5, 10] }],
    };
    const r = settle(sel, byRace, byRace.get(11)!);
    expect(r.hit).toBe(true);
    expect(r.payout).toBe(854);
    expect(r.cost).toBe(100); // 1膽+5腳 = C(5,2)=10 × $10
  });
  it("R2 trio banker #3 (ran 14th) misses", () => {
    const sel: BetSelection = {
      type: "trio",
      raceLegs: [{ raceNumber: 2, bankers: [3], legs: [12, 2, 7, 8, 1] }],
    };
    expect(settle(sel, byRace, byRace.get(2)!).hit).toBe(false);
  });
  it("Double Trio (R2+R3) real legs hits for 380689", () => {
    const sel: BetSelection = {
      type: "doubleTrio",
      raceLegs: [
        { raceNumber: 2, bankers: [], legs: [12, 1, 2] },
        { raceNumber: 3, bankers: [], legs: [2, 5, 8] },
      ],
    };
    const src = results.find((r) => r.doubleTrioDividend != null)!;
    const r = settle(sel, byRace, src);
    expect(r.hit).toBe(true);
    expect(r.payout).toBe(380689);
  });
});
