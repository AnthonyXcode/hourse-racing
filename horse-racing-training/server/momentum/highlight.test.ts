import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { openDb, repo, type Repo } from "./db";
import { raceStore, type RaceStore } from "../data/raceStore";
import { useRaceStore } from "../dataIndex";
import { chooseRace } from "./highlight";

const card = (id: string) => ({ race: { id, date: `${id.slice(0, 10)}T00:00:00.000Z`, raceNumber: Number(id.split("-").pop()) } });

describe("banner race choice", () => {
  let r: Repo;
  let store: RaceStore;
  beforeEach(() => {
    const db = openDb(":memory:");
    r = repo(db);
    store = raceStore(db);
    useRaceStore(store);
    r.upsertRace({ race_id: "2026-09-27-ST-1", date: "2026-09-27", venue: "ST", race_no: 1, post_time: "2026-09-27T12:45:00+08:00", hkjc_status: "DECLARED" });
    r.upsertRace({ race_id: "2026-09-27-ST-2", date: "2026-09-27", venue: "ST", race_no: 2, post_time: "2026-09-27T13:15:00+08:00", hkjc_status: "DECLARED" });
    // Next-meeting row filed under a non-race day by an old poller: must be ignored.
    r.upsertRace({ race_id: "2026-09-26-HV-1", date: "2026-09-26", venue: "HV", race_no: 1, post_time: "2026-09-27T12:00:00+08:00", hkjc_status: "DECLARED" });
  });
  afterEach(() => useRaceStore(null));

  it("picks the earliest tracked race still to run", () => {
    const got = chooseRace(r, new Date("2026-09-27T12:50:00+08:00"));
    expect(got).toMatchObject({ mode: "upcoming", date: "2026-09-27", venue: "ST", raceNo: 2 });
  });

  it("falls back to the first race of the next racecard meeting", () => {
    store.putCard({ date: "2026-10-01", venue: "HV", raceNo: 1 }, card("2026-10-01-HV-1"), "test");
    store.putCard({ date: "2026-10-01", venue: "HV", raceNo: 2 }, card("2026-10-01-HV-2"), "test");
    const got = chooseRace(r, new Date("2026-09-28T09:00:00+08:00"));
    expect(got).toMatchObject({ mode: "upcoming", date: "2026-10-01", venue: "HV", raceNo: 1, postTime: null });
  });

  it("otherwise shows the last race of the latest meeting", () => {
    store.putCard({ date: "2026-09-23", venue: "HV", raceNo: 8 }, card("2026-09-23-HV-8"), "test");
    store.putCard({ date: "2026-09-23", venue: "HV", raceNo: 9 }, card("2026-09-23-HV-9"), "test");
    const got = chooseRace(r, new Date("2026-09-28T09:00:00+08:00"));
    expect(got).toMatchObject({ mode: "last", date: "2026-09-23", raceNo: 9 });
  });
});
