import { describe, it, expect, beforeEach } from "vitest";
import { openDb } from "../momentum/db";
import { raceStore, type RaceStore, type CardDoc } from "./raceStore";
import { runLog, type RunLog } from "./runLog";
import { createScheduler, inWindow, nextSlot } from "./scheduler";
import { planCards, planResults, mergeFixtures, runFetch, resultsIncomplete, type UpcomingMeeting, type FetchDeps } from "./fetchJobs";

/** A Date for an HK wall-clock time. */
const hk = (s: string) => new Date(`${s}+08:00`);
const hkStr = (d: Date) => new Date(d.getTime() + 8 * 3_600_000).toISOString().slice(0, 16).replace("T", " ");

describe("schedule (HKT)", () => {
  it.each([
    ["2026-09-25T07:59", "2026-09-25 08:00"],
    ["2026-09-25T08:00", "2026-09-25 10:00"], // exact slot → the next one
    ["2026-09-25T08:00:01", "2026-09-25 10:00"],
    ["2026-09-25T13:40", "2026-09-25 14:00"],
    ["2026-09-25T22:00", "2026-09-26 00:00"],
    ["2026-09-25T23:30", "2026-09-26 00:00"],
    ["2026-09-26T00:00", "2026-09-26 08:00"],
    ["2026-09-26T00:30", "2026-09-26 08:00"],
    ["2026-12-31T23:59", "2027-01-01 00:00"],
  ])("%s → %s", (now, want) => {
    expect(hkStr(nextSlot(hk(now)))).toBe(want);
  });

  it("has nine runs a day: 08, 10 … 22 and 00", () => {
    let t = hk("2026-09-25T00:30");
    const got: string[] = [];
    for (let i = 0; i < 9; i++) {
      t = nextSlot(t);
      got.push(hkStr(t).slice(11));
    }
    expect(got).toEqual(["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "00:00"]);
  });

  it("window is 08:00–24:00", () => {
    expect(inWindow(hk("2026-09-25T07:59"))).toBe(false);
    expect(inWindow(hk("2026-09-25T08:00"))).toBe(true);
    expect(inWindow(hk("2026-09-25T23:59"))).toBe(true);
    expect(inWindow(hk("2026-09-26T00:30"))).toBe(false);
  });
});

describe("scheduler", () => {
  const harness = (at: string, last: Date | null) => {
    let now = hk(at);
    const timers: { fn: () => void; ms: number }[] = [];
    const runs: string[] = [];
    let release: () => void = () => {};
    const s = createScheduler({
      now: () => now,
      lastSuccess: () => last,
      log: () => {},
      setTimer: (fn, ms) => (timers.push({ fn, ms }), timers.length),
      clearTimer: () => {},
      run: (t) => {
        runs.push(t);
        return new Promise<void>((ok) => (release = ok));
      },
    });
    return { s, timers, runs, finish: () => release(), advance: (t: string) => (now = hk(t)) };
  };

  it("catches up on boot inside the window when the last run is stale, then arms the next slot", () => {
    const h = harness("2026-09-25T13:40", hk("2026-09-25T10:05"));
    h.s.start();
    expect(h.runs).toEqual(["startup"]);
    expect(h.timers[0]!.ms).toBe(20 * 60_000);
  });

  it("no catch-up when the last run is recent, or outside the window", () => {
    const a = harness("2026-09-25T13:40", hk("2026-09-25T12:01"));
    a.s.start();
    expect(a.runs).toEqual([]);
    const b = harness("2026-09-26T02:00", null);
    b.s.start();
    expect(b.runs).toEqual([]);
    expect(b.timers[0]!.ms).toBe(6 * 3_600_000);
  });

  it("never overlaps: a slot firing during a run is skipped", async () => {
    const h = harness("2026-09-25T13:40", null);
    h.s.start(); // startup run in progress
    h.advance("2026-09-25T14:00");
    h.timers[0]!.fn(); // 14:00 slot fires while startup is still running
    expect(h.runs).toEqual(["startup"]);
    expect(h.s.runExclusive("manual")).toBeNull();
    h.finish();
    await new Promise((r) => setTimeout(r, 0));
    expect(h.s.running).toBe(false);
    expect(h.timers).toHaveLength(2); // re-armed for 16:00
  });
});

// ---------------------------------------------------------------- planning

const card = (id: string): CardDoc => ({ race: { id, date: "x", raceNumber: 1, entries: [] }, winOdds: {} });
const result = (n: number, done = true) => ({ raceNumber: n, finishOrder: done ? [{ horseNumber: 1 }] : [], winDividend: done ? 50 : undefined });

describe("meeting selection", () => {
  let store: RaceStore;
  const now = hk("2026-09-25T13:40");
  beforeEach(() => {
    store = raceStore(openDb(":memory:"));
  });

  it("results: missing within the lookback; incomplete only for today/yesterday; old gaps ignored", () => {
    store.putCard({ date: "2026-09-24", venue: "HV", raceNo: 1 }, card("a"), "t");
    store.putCard({ date: "2026-09-24", venue: "HV", raceNo: 2 }, card("b"), "t");
    store.putResults({ date: "2026-09-24", venue: "HV" }, [result(1)], "t"); // 1 of 2 races → incomplete
    store.putResults({ date: "2026-09-20", venue: "ST" }, [result(1, false)], "t"); // incomplete but too old to recheck
    const fixtures = {
      meetings: [
        { date: "2026-09-20", venue: "ST" as const },
        { date: "2026-09-21", venue: "HV" as const }, // missing
        { date: "2026-08-01", venue: "ST" as const }, // missing but outside 14-day lookback
        { date: "2026-09-27", venue: "ST" as const }, // future
      ],
    };
    const plan = planResults(store, fixtures, [], now);
    expect(plan).toEqual([
      { date: "2026-09-21", venue: "HV", reason: "missing" },
      { date: "2026-09-24", venue: "HV", reason: "incomplete" },
    ]);
    expect(planResults(store, fixtures, [], now, { since: "2026-07-01" }).map((m) => m.date)).toContain("2026-08-01");
  });

  it("results: today's meeting waits for its first race", () => {
    const up: UpcomingMeeting[] = [{ date: "2026-09-25", venue: "HV", races: [{ raceNo: 1, postTime: "2026-09-25T18:40:00+08:00" }] }];
    expect(planResults(store, null, up, now)).toEqual([]);
    expect(planResults(store, null, up, hk("2026-09-25T20:00"))).toEqual([{ date: "2026-09-25", venue: "HV", reason: "missing" }]);
  });

  it("incomplete = fewer races than cards, or a race without finish/win dividend", () => {
    expect(resultsIncomplete([result(1), result(2)], 2)).toBe(false);
    expect(resultsIncomplete([result(1)], 2)).toBe(true);
    expect(resultsIncomplete([result(1), result(2, false)], 0)).toBe(true);
  });

  it("cards: listed meetings today..+2 with races not yet started; unlisted fixtures are probed (not today)", () => {
    const up: UpcomingMeeting[] = [
      { date: "2026-09-25", venue: "HV", races: [{ raceNo: 1, postTime: "2026-09-25T13:00:00+08:00" }, { raceNo: 2, postTime: "2026-09-25T14:00:00+08:00" }] },
      { date: "2026-09-27", venue: "ST", races: [{ raceNo: 1, postTime: null }, { raceNo: 2, postTime: null }] },
      { date: "2026-09-30", venue: "HV", races: [{ raceNo: 1, postTime: null }] }, // beyond +2 days
    ];
    const fixtures = { meetings: [{ date: "2026-09-26", venue: "ST" as const }, { date: "2026-09-25", venue: "ST" as const }] };
    expect(planCards(fixtures, up, now)).toEqual([
      { date: "2026-09-25", venue: "HV", races: [2] },
      { date: "2026-09-26", venue: "ST", races: null },
      { date: "2026-09-27", venue: "ST", races: [1, 2] },
    ]);
  });

  it("fixtures: newly listed meetings are merged in, once", () => {
    const up: UpcomingMeeting[] = [{ date: "2026-09-27", venue: "ST", races: [] }];
    const merged = mergeFixtures({ season: "x", meetings: [{ date: "2026-09-06", venue: "ST" }] }, up, now)!;
    expect(merged.meetings).toEqual([{ date: "2026-09-06", venue: "ST" }, { date: "2026-09-27", venue: "ST" }]);
    expect(mergeFixtures(merged, up, now)).toBeNull();
  });
});

// ---------------------------------------------------------------- a whole run with fakes

describe("runFetch", () => {
  let store: RaceStore;
  let log: RunLog;
  const now = hk("2026-09-25T13:40");
  beforeEach(() => {
    const db = openDb(":memory:");
    store = raceStore(db);
    log = runLog(db);
    store.putDoc("fixtures", { meetings: [{ date: "2026-09-23", venue: "HV" }] });
  });
  const deps = (over: Partial<FetchDeps> = {}): FetchDeps => ({
    store,
    runLog: log,
    now: () => now,
    log: () => {},
    discover: async () => [{ date: "2026-09-27", venue: "ST", races: [{ raceNo: 1, postTime: null }, { raceNo: 2, postTime: null }] }],
    openResults: async () => ({ scrape: async (m) => ({ venue: m.venue, races: [result(1), result(2)] }), close: async () => {} }),
    openCards: async () => ({ scrapeRace: async (m, n) => card(`${m.date}-${m.venue}-${n}`), close: async () => {} }),
    ...over,
  });

  it("stores results + cards, merges fixtures and logs a successful run", async () => {
    const sum = await runFetch(deps(), "schedule");
    expect(sum.results).toEqual([{ meeting: "2026-09-23 HV", races: 2, changed: true, note: undefined }]);
    expect(sum.cards).toEqual([{ meeting: "2026-09-27 ST", saved: 2, changed: 2, empty: [] }]);
    expect(store.results({ date: "2026-09-23", venue: "HV" })).toHaveLength(2);
    expect(store.card({ date: "2026-09-27", venue: "ST", raceNo: 2 })).not.toBeNull();
    expect(store.doc<{ meetings: unknown[] }>("fixtures")!.meetings).toHaveLength(2);
    const [run] = log.recent(1);
    expect(run).toMatchObject({ trigger: "schedule", ok: true, error: null });
    expect(log.lastSuccess()).not.toBeNull();
    // Second run: nothing missing, cards unchanged.
    const again = await runFetch(deps(), "schedule");
    expect(again.plan.results).toEqual([]);
    expect(again.cards[0]).toMatchObject({ saved: 2, changed: 0 });
  });

  it("dry run plans without scraping, writing or discovering", async () => {
    let opened = 0;
    const sum = await runFetch(deps({ discover: async () => { throw new Error("no network in dry run"); }, openResults: async () => { opened++; throw new Error("x"); } }), "manual", { dryRun: true });
    expect(opened).toBe(0);
    expect(sum.plan.results).toEqual([{ date: "2026-09-23", venue: "HV", reason: "missing" }]);
    expect(log.recent()).toEqual([]);
    expect(store.results({ date: "2026-09-23", venue: "HV" })).toBeNull();
  });

  it("a failed meeting is recorded and the run is marked not ok; probing stops at the first empty race", async () => {
    const sum = await runFetch(
      deps({
        discover: async () => [],
        openResults: async () => ({ scrape: async () => { throw new Error("HKJC 503"); }, close: async () => {} }),
      }),
      "manual",
      { only: { date: "2026-09-28", venue: "ST" } }
    );
    expect(sum.failures.map((f) => f.what)).toContain("results 2026-09-28 ST");
    expect(log.recent(1)[0]).toMatchObject({ ok: false });

    let asked: number[] = [];
    await runFetch(
      deps({ discover: async () => [], openCards: async () => ({ scrapeRace: async (_m, n) => (asked.push(n), n <= 3 ? card(String(n)) : null), close: async () => {} }) }),
      "manual",
      { cardsOnly: true, only: { date: "2026-09-28", venue: "ST" } }
    );
    expect(asked).toEqual([1, 2, 3, 4]);
    asked = [];
  });

  it("orphaned runs (process stopped mid-run) are closed as interrupted", () => {
    log.start("startup");
    expect(log.closeOrphans()).toBe(1);
    expect(log.recent(1)[0]).toMatchObject({ ok: false, error: "interrupted (process stopped mid-run)" });
  });
});

// ---------------------------------------------------------------- dividend guard

import { fixDividends, parseDividendRows } from "./dividends";

describe("dividend guard (parent scraper drops thousands separators)", () => {
  // Trimmed from https://racing.hkjc.com/en-us/local/information/localresults?RaceDate=2026/09/23&Racecourse=HV&RaceNo=9
  const html = `
    <tr><td class="fontXi" rowspan="1">WIN</td><td class="f_fs14">6</td><td class="f_fs14 f_tar">112.00</td></tr>
    <tr class="bg_dc"><td class="fontXi" rowspan="3">PLACE</td><td class="f_fs14">6</td><td class="f_fs14 f_tar">31.00</td></tr>
    <tr class=""><td class="f_fs14">5</td><td class="f_fs14 f_tar">57.50</td></tr>
    <tr class=""><td class="f_fs14">2</td><td class="f_fs14 f_tar">18.00</td></tr>
    <tr class="bg_dc"><td class="fontXi" rowspan="1">QUINELLA</td><td class="f_fs14">5,6</td><td class="f_fs14 f_tar">1,090.50</td></tr>
    <tr><td class="fontXi" rowspan="3">QUINELLA PLACE</td><td class="f_fs14">5,6</td><td class="f_fs14 f_tar">299.50</td></tr>
    <tr><td class="f_fs14">2,6</td><td class="f_fs14 f_tar">94.00</td></tr>
    <tr><td class="f_fs14">2,5</td><td class="f_fs14 f_tar">REFUND</td></tr>`;

  it("reads pool rows across rowspans, with thousands separators", () => {
    const rows = parseDividendRows(html);
    expect(rows.filter((r) => r.pool === "PLACE").map((r) => r.amount)).toEqual([31, 57.5, 18]);
    expect(rows.find((r) => r.pool === "QUINELLA")).toEqual({ pool: "QUINELLA", combo: "5,6", amount: 1090.5 });
    expect(rows.filter((r) => r.pool === "QUINELLA PLACE").map((r) => r.amount)).toEqual([299.5, 94, null]);
  });

  it("corrects truncated values only; leaves arrays alone when a row isn't a number", () => {
    const race = { winDividend: 112, placeDividends: [31, 57.5, 18], quinellaDividend: 1, quinellaPlaceDividends: [299.5, 94, 172] };
    expect(fixDividends(race, parseDividendRows(html))).toBe(1);
    expect(race.quinellaDividend).toBe(1090.5);
    expect(race.quinellaPlaceDividends).toEqual([299.5, 94, 172]); // REFUND row → untouched
  });
});
