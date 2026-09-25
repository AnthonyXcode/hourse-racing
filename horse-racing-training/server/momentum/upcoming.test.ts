import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { openDb } from "./db";
import { raceStore } from "../data/raceStore";
import { useRaceStore } from "../dataIndex";
import { cardRaces, cardSeries, parseRaceId, upcomingDays } from "./upcoming";

const entry = (n: number, name: string, isScratched = false) => ({ horseNumber: n, isScratched, horse: { code: `C${n}`, name } });

describe("upcoming meetings from racecards", () => {
  beforeEach(() => {
    const store = raceStore(openDb(":memory:"));
    useRaceStore(store);
    for (const rn of [1, 2]) store.putCard({ date: "2026-09-27", venue: "ST", raceNo: rn }, { race: { id: `2026-09-27-ST-${rn}`, date: "2026-09-27T00:00:00.000Z", raceNumber: rn, entries: [entry(2, "B"), entry(1, "A"), entry(3, "C", true)] } }, "test");
    store.putCard({ date: "2026-09-23", venue: "HV", raceNo: 1 }, { race: { id: "2026-09-23-HV-1", date: "2026-09-23T00:00:00.000Z", raceNumber: 1 } }, "test");
  });
  afterEach(() => useRaceStore(null));

  it("parses race ids", () => {
    expect(parseRaceId("2026-09-27-ST-11")).toEqual({ date: "2026-09-27", venue: "ST", raceNo: 11 });
    expect(parseRaceId("2026-09-26-S1-1")).toBeNull();
  });

  it("lists racecard meetings from today that the poller hasn't tracked", () => {
    expect(upcomingDays("2026-09-26", new Set())).toEqual([{ date: "2026-09-27", venue: "ST", races: 2, snapshots: 0, upcoming: true }]);
    expect(upcomingDays("2026-09-26", new Set(["2026-09-27"]))).toEqual([]);
  });

  it("builds races and a runners-only series from the cards", () => {
    expect(cardRaces("2026-09-27").map((r) => [r.race_id, r.post_time])).toEqual([["2026-09-27-ST-1", null], ["2026-09-27-ST-2", null]]);
    const s = cardSeries("2026-09-27-ST-1")!;
    expect(s.runners.map((r) => r.horseNo)).toEqual([1, 2]); // sorted, scratched #3 dropped
    expect(s.points).toEqual([]);
    expect(s.postTime).toBeNull();
    expect(cardSeries("2026-09-27-ST-9")).toBeNull();
  });
});
