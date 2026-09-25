import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { fileURLToPath } from "url";
import { openDb } from "./momentum/db";
import { raceStore } from "./data/raceStore";
import { importDir } from "./data/importFiles";
import { buildRace } from "./data/raceBuilder";
import { getManifest, readCard, readResults, useRaceStore } from "./dataIndex";
import { settle } from "../shared/betEngine/index";
import type { RaceResult, BetSelection } from "../shared/types";

// server/data/__fixtures__ mirrors the old data/ layout (racecards/, historical/) with real files;
// they go into an in-memory DB through the same importer the app uses.
const FIXTURES = fileURLToPath(new URL("./data/__fixtures__/", import.meta.url));

beforeAll(() => {
  const store = raceStore(openDb(":memory:"));
  const rep = importDir(store, FIXTURES);
  expect(rep).toMatchObject({ cards: { seen: 1, changed: 1 }, results: { seen: 1, changed: 1 }, errors: [] });
  expect(importDir(store, FIXTURES)).toMatchObject({ cards: { changed: 0 }, results: { changed: 0 } }); // idempotent
  useRaceStore(store);
});
afterAll(() => useRaceStore(null));

describe("data manifest (DB)", () => {
  it("lists the meeting with its races and results flag, dates as YYYYMMDD", () => {
    expect(getManifest()).toEqual([{ date: "20260627", venue: "ST", races: [11], hasResults: true }]);
  });
  it("reads a card and a meeting's results", () => {
    expect(readCard("20260627", "ST", 11)?.race.raceNumber).toBe(11);
    expect(readCard("20260627", "ST", 1)).toBeNull();
    expect(readResults("20260627", "ST")?.length).toBeGreaterThan(0);
    expect(readResults("20260628", "ST")).toBeNull();
  });
});

describe("race builder", () => {
  it("turns doc dates into Date objects and winOdds into a Map, like the parent's loadRaceCard", () => {
    const loaded = buildRace<{ date: Date; entries: { horse: { pastPerformances: { date: Date }[] } }[] }>(readCard("20260627", "ST", 11)!)!;
    expect(loaded.race.date).toBeInstanceOf(Date);
    expect(loaded.race.date.toISOString()).toBe(readCard("20260627", "ST", 11)!.race.date); // HK midnight, stored as UTC
    const pp = loaded.race.entries.flatMap((e) => e.horse.pastPerformances);
    expect(pp.length).toBeGreaterThan(0);
    expect(pp.every((p) => p.date instanceof Date && !Number.isNaN(p.date.getTime()))).toBe(true);
    expect(loaded.winOddsMap).toBeInstanceOf(Map);
  });
});

describe("settle against real ST 2026-06-27 (Strategy A R11 hit)", () => {
  const byRace = () => new Map<number, RaceResult>(readResults("20260627", "ST")!.map((r) => [r.raceNumber, r]));
  it("R11 trio banker #6 + legs hits for $854", () => {
    // Real result R11: 5-2-6, trioDividend 854.
    const sel: BetSelection = {
      type: "trio",
      raceLegs: [{ raceNumber: 11, bankers: [6], legs: [2, 4, 7, 5, 10] }],
    };
    const m = byRace();
    const r = settle(sel, m, m.get(11)!);
    expect(r.hit).toBe(true);
    expect(r.payout).toBe(854);
    expect(r.cost).toBe(100); // 1膽+5腳 = C(5,2)=10 × $10
  });
  it("R2 trio banker #3 (ran 14th) misses", () => {
    const sel: BetSelection = {
      type: "trio",
      raceLegs: [{ raceNumber: 2, bankers: [3], legs: [12, 2, 7, 8, 1] }],
    };
    const m = byRace();
    expect(settle(sel, m, m.get(2)!).hit).toBe(false);
  });
  it("Double Trio (R2+R3) real legs hits for 380689", () => {
    const sel: BetSelection = {
      type: "doubleTrio",
      raceLegs: [
        { raceNumber: 2, bankers: [], legs: [12, 1, 2] },
        { raceNumber: 3, bankers: [], legs: [2, 5, 8] },
      ],
    };
    const results = readResults("20260627", "ST")!;
    const r = settle(sel, byRace(), results.find((x) => x.doubleTrioDividend != null)!);
    expect(r.hit).toBe(true);
    expect(r.payout).toBe(380689);
  });
});
