import { describe, it, expect } from "vitest";
import { openDb, repo } from "../momentum/db";
import { raceStore } from "./raceStore";
import { backfillCardOdds } from "./backfillCardOdds";

const DATE = "2026-09-27";

function setup(cardOdds?: Record<string, number>) {
  const db = openDb(":memory:");
  const r = repo(db);
  const id = `${DATE}-ST-1`;
  r.upsertRace({ race_id: id, date: DATE, venue: "ST", race_no: 1, post_time: `${DATE}T12:30:00+08:00`, hkjc_status: "RESULT" });
  const snap = (at: string, secs: number, win: [number, number][]) =>
    r.insertSnapshot(id, { queriedAt: at, respondedAt: at, hkjcUpdatedAt: null }, secs, 1e6, 5e5, win.map(([h, w]) => ({ horseNo: h, win: w, pla: null })));
  snap("2026-09-27T04:00:00Z", 1800, [[1, 5], [2, 3]]);
  snap("2026-09-27T04:29:00Z", 60, [[1, 4.7], [2, 3.4]]); // last before post
  snap("2026-09-27T04:31:00Z", -60, [[1, 4.5], [2, 3.5]]); // after post: ignored
  const store = raceStore(db);
  store.putCard({ date: DATE, venue: "ST", raceNo: 1 }, { race: { id, date: DATE, raceNumber: 1 }, ...(cardOdds ? { winOdds: cardOdds } : {}) }, "test");
  return { db, store };
}

describe("backfillCardOdds", () => {
  it("saves the last snapshot before post as the card's win odds", () => {
    const { db, store } = setup();
    expect(backfillCardOdds(db, DATE, { dryRun: true })).toEqual([{ raceId: `${DATE}-ST-1`, status: "would save", horses: 2, secsToPost: 60 }]);
    expect(store.card({ date: DATE, venue: "ST", raceNo: 1 })!.winOdds).toBeUndefined();
    expect(backfillCardOdds(db, DATE)[0]!.status).toBe("saved");
    expect(store.card({ date: DATE, venue: "ST", raceNo: 1 })!.winOdds).toEqual({ "1": 4.7, "2": 3.4 });
    expect(backfillCardOdds(db, DATE)[0]!.status).toBe("has odds"); // idempotent
  });

  it("leaves cards that already have odds unless forced", () => {
    const { db, store } = setup({ "1": 9, "2": 9 });
    expect(backfillCardOdds(db, DATE)[0]!.status).toBe("has odds");
    expect(backfillCardOdds(db, DATE, { force: true })[0]!.status).toBe("saved");
    expect(store.card({ date: DATE, venue: "ST", raceNo: 1 })!.winOdds).toEqual({ "1": 4.7, "2": 3.4 });
  });
});
