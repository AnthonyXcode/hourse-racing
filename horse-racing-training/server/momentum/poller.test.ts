import { describe, it, expect, beforeEach } from "vitest";
import { openDb, repo, type Repo } from "./db";
import { createPoller } from "./poller";
import { raceSeries } from "./series";
import type { HkjcClient, MeetingRace, Runner } from "./hkjcClient";

const POST = "2026-09-23T20:00:00+08:00"; // 12:00Z

function fakeClient() {
  const calls = { odds: 0, meeting: [] as string[] };
  const state = { status: "DECLARED", finished: false };
  const client: HkjcClient = {
    async meeting(_date, venue) {
      calls.meeting.push(venue);
      if (venue !== "HV") return [];
      return [{ raceNo: 1, postTime: POST, status: state.status } satisfies MeetingRace];
    },
    async runners() {
      return [1, 2].map((n): Runner => ({
        raceNo: 1, horseNo: n, name: `H${n}`, status: state.finished ? "Ran" : "Declared",
        finalPosition: state.finished ? n : null, winOdds: state.finished ? n * 2 : null,
      }));
    },
    async dividends() {
      return state.finished ? [{ raceNo: 1, pool: "TRI", comb: "1,2,3", div: 250 }] : [];
    },
    async odds() {
      calls.odds++;
      return { win: new Map([[1, 3], [2, 5]]), pla: new Map([[1, 1.4], [2, 1.9]]), winPool: 1e6, plaPool: 5e5, sellStatus: "START_SELL", hkjcUpdatedAt: null };
    },
  };
  return { client, calls, state };
}

describe("momentum poller", () => {
  let r: Repo;
  let t: Date;
  beforeEach(() => {
    r = repo(openDb(":memory:"));
  });

  const make = (fc: ReturnType<typeof fakeClient>) =>
    createPoller({ client: fc.client, repo: r, now: () => t, meetingRefreshSecs: 0, log: () => {} });

  it("finds the venue and does not poll odds outside the 30-min window", async () => {
    const fc = fakeClient();
    t = new Date("2026-09-23T11:00:00Z"); // 60 min before post
    await make(fc).tick();
    expect(fc.calls.meeting).toEqual(["HV"]);
    expect(r.racesOn("2026-09-23")).toHaveLength(1);
    expect(fc.calls.odds).toBe(0);
  });

  it("snapshots odds inside the window with secs-to-post and runner names", async () => {
    const fc = fakeClient();
    const p = make(fc);
    t = new Date("2026-09-23T11:45:00Z"); // 15 min before post
    await p.tick();
    t = new Date("2026-09-23T11:45:30Z");
    await p.tick();
    const s = raceSeries(r, "2026-09-23-HV-1")!;
    expect(s.points.map((x) => x.secsToPost)).toEqual([900, 870]);
    expect(s.points[0]!.win).toEqual({ 1: 3, 2: 5 });
    expect(s.runners.map((x) => x.name)).toEqual(["H1", "H2"]);
  });

  it("skips a tick while the previous one is still running", async () => {
    const fc = fakeClient();
    const p = make(fc);
    t = new Date("2026-09-23T11:45:00Z");
    await Promise.all([p.tick(), p.tick()]);
    expect(fc.calls.odds).toBe(1);
  });

  it("stops polling and settles once HKJC posts the result", async () => {
    const fc = fakeClient();
    const p = make(fc);
    t = new Date("2026-09-23T11:59:00Z");
    await p.tick();
    fc.state.status = "RESULT";
    fc.state.finished = true;
    t = new Date("2026-09-23T12:02:00Z");
    await p.tick();
    expect(fc.calls.odds).toBe(1);
    const race = r.race("2026-09-23-HV-1")!;
    expect(race.status).toBe("settled");
    expect(r.dividends(race.race_id)).toEqual([{ pool: "TRI", win_comb: "1,2,3", dividend: 250 }]);
    expect(r.results(race.race_id)).toEqual([
      { horse_no: 1, finish_pos: 1, sp_win: 2 },
      { horse_no: 2, finish_pos: 2, sp_win: 4 },
    ]);
  });

  it("waits for the full finishing order before settling", async () => {
    const fc = fakeClient();
    const full = fc.client.runners;
    fc.client.runners = async (d, v) =>
      (await full(d, v)).map((r) => (r.horseNo === 2 ? { ...r, status: "Declared", finalPosition: null } : { ...r, status: "Ran" }));
    const p = make(fc);
    fc.state.status = "RESULT";
    fc.state.finished = true;
    t = new Date("2026-09-23T12:02:00Z");
    await p.tick();
    expect(r.race("2026-09-23-HV-1")!.status).not.toBe("settled");
    expect(r.results("2026-09-23-HV-1")).toEqual([{ horse_no: 1, finish_pos: 1, sp_win: 2 }]); // partial result shown early
    fc.client.runners = async (d, v) => (await full(d, v)).map((r) => ({ ...r, status: "Ran" }));
    await p.tick();
    expect(r.race("2026-09-23-HV-1")!.status).toBe("settled");
  });

  it("records the error and keeps going when HKJC fails", async () => {
    const fc = fakeClient();
    fc.client.meeting = async () => {
      throw new Error("boom");
    };
    const p = make(fc);
    t = new Date("2026-09-23T11:45:00Z");
    await p.tick();
    expect(p.state.lastError).toContain("boom");
  });
});
