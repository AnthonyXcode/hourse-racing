import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "fs";
import { openDb } from "../momentum/db";
import { nameStore, type NameKey, type NameStore } from "./store";
import { parseProfileTitle, parseResultsPage } from "./parse";
import { createRefresher } from "./refresher";
import { lookupNames, parseLookupBody } from "./lookup";
import { resultsUrl } from "./hkjcPages";
import type { NameIndex } from "./nameIndex";

const fixture = (f: string) => readFileSync(new URL(`./__fixtures__/${f}`, import.meta.url), "utf8");
const RESULTS = fixture("results_20260923_HV_R1.html");
const RACE = "2026-09-23-HV-1";
const DAY = 86_400_000;

describe("parsers", () => {
  it("reads the race name and every runner from a results page", () => {
    const p = parseResultsPage(RESULTS, RACE);
    expect(p.race).toEqual({ code: RACE, nameZh: "南風讓賽" });
    expect(p.horses).toHaveLength(12);
    expect(p.horses).toContainEqual({ code: "HK_2024_K580", nameZh: "紅磚戰士" });
    expect(p.jockeys).toContainEqual({ code: "CJE", nameZh: "周俊樂" });
    expect(p.trainers).toContainEqual({ code: "EDJ", nameZh: "游達榮" });
    expect(p.seen).toMatchObject({ classLine: "第五班 - 1650米 - (40-0)", going: "好地" });
  });

  it("reads horse and trainer profile titles and rejects generic ones", () => {
    expect(parseProfileTitle(fixture("horse_HK_2024_K580.html"), "horse")).toBe("紅磚戰士");
    expect(parseProfileTitle(fixture("trainer_EDJ.html"), "trainer")).toBe("游達榮");
    expect(parseProfileTitle(fixture("jockey_CJE.html"), "trainer")).toBeNull(); // client-rendered page
    expect(parseProfileTitle(fixture("trainer_EDJ.html"), "horse")).toBeNull(); // wrong section
  });

  it("builds results URLs from race ids", () => {
    expect(resultsUrl(RACE)).toBe("https://racing.hkjc.com/zh-hk/local/information/localresults?RaceDate=2026/09/23&Racecourse=HV&RaceNo=1");
    expect(resultsUrl("nope")).toBeNull();
  });
});

describe("name store", () => {
  let store: NameStore;
  beforeEach(() => {
    store = nameStore(openDb(":memory:"));
  });
  const horse: NameKey = { kind: "horse", code: "HK_2024_K580" };

  it("appends rows; the newest wins and keeps the last known English", () => {
    store.insert([{ ...horse, nameEn: "RED BRICK WARRIOR", nameZh: null }], "data-file", new Date("2026-09-01T00:00:00Z"));
    store.insert([{ ...horse, nameEn: null, nameZh: "紅磚戰士" }], "results-page", new Date("2026-09-10T00:00:00Z"));
    const r = store.latest([horse]).get("horse:HK_2024_K580")!;
    expect(r).toMatchObject({ nameEn: "RED BRICK WARRIOR", nameZh: "紅磚戰士", source: "results-page" });
  });

  it("flags missing, English-only and older-than-TTL keys", () => {
    const now = new Date("2026-09-25T00:00:00Z");
    const fresh: NameKey = { kind: "jockey", code: "CJE" };
    const old: NameKey = { kind: "trainer", code: "EDJ" };
    const enOnly: NameKey = { kind: "race", code: RACE };
    store.insert([{ ...fresh, nameEn: "C L Chau", nameZh: "周俊樂" }], "results-page", new Date(now.getTime() - 2 * DAY));
    store.insert([{ ...old, nameEn: "D Eustace", nameZh: "游達榮" }], "results-page", new Date(now.getTime() - 8 * DAY));
    store.insert([{ ...enOnly, nameEn: "NAM FUNG HANDICAP", nameZh: null }], "data-file", now);
    expect(store.staleOrMissing([horse, fresh, old, enOnly], now, 7)).toEqual([horse, old, enOnly]);
  });

  it("seeds only keys with no row, and prunes to the newest N", () => {
    const aug = new Date("2026-08-01T00:00:00Z");
    expect(store.seedMissing([{ ...horse, nameEn: "A", nameZh: null }], "data-file", aug)).toBe(1);
    expect(store.seedMissing([{ ...horse, nameEn: "B", nameZh: null }], "data-file", aug)).toBe(0);
    for (let d = 1; d <= 7; d++) store.insert([{ ...horse, nameEn: null, nameZh: `v${d}` }], "results-page", new Date(Date.UTC(2026, 8, d)));
    expect(store.prune(5)).toBe(3);
    expect(store.latest([horse]).get("horse:HK_2024_K580")!.nameZh).toBe("v7");
    expect(store.coverage().horse).toEqual({ total: 1, zh: 1 });
  });
});

describe("refresher", () => {
  let store: NameStore;
  let t: Date;
  let calls: string[];
  const index: NameIndex = {
    en: new Map([["horse:HK_2024_K580", "RED BRICK WARRIOR"]]),
    lastRace: new Map([
      ["horse:HK_2024_K580", RACE],
      ["horse:HK_2024_K028", RACE],
      ["jockey:CJE", RACE],
      ["jockey:GONE", RACE], // claims to be on the page but isn't
    ]),
    resultRaces: [{ raceId: RACE, keys: [] }],
    keys: [],
  };
  const make = (fail = false) =>
    createRefresher({
      store,
      index: () => index,
      now: () => t,
      log: () => {},
      pages: {
        async get(url) {
          calls.push(url);
          if (fail) throw new Error("HKJC 503");
          if (url.includes("localresults")) return RESULTS;
          if (url.includes("horse?")) return fixture("horse_HK_2024_K580.html");
          return fixture("jockey_CJE.html"); // generic title
        },
      },
    });
  beforeEach(() => {
    store = nameStore(openDb(":memory:"));
    t = new Date("2026-09-25T00:00:00Z");
    calls = [];
  });

  it("covers a race and its runners with one page request", async () => {
    const r = make();
    r.enqueue([
      { kind: "race", code: RACE },
      { kind: "horse", code: "HK_2024_K580" },
      { kind: "horse", code: "HK_2024_K028" },
      { kind: "jockey", code: "CJE" },
    ]);
    await r.idle();
    expect(calls).toHaveLength(1);
    const got = store.latest([{ kind: "race", code: RACE }, { kind: "jockey", code: "CJE" }]);
    expect(got.get(`race:${RACE}`)!.nameZh).toBe("南風讓賽");
    expect(got.get("jockey:CJE")!.nameZh).toBe("周俊樂");
  });

  it("queues a key once and falls back to the horse profile page", async () => {
    const r = make();
    const unknown = { kind: "horse" as const, code: "HK_2025_Z999" };
    r.enqueue([unknown, unknown]);
    r.enqueue([unknown]);
    await r.idle();
    expect(calls).toEqual(["https://racing.hkjc.com/zh-hk/local/information/horse?horseid=HK_2025_Z999"]);
    expect(store.latest([unknown]).get("horse:HK_2025_Z999")!.nameZh).toBe("紅磚戰士"); // fixture title
  });

  it("backs off after a failure and keeps the old name", async () => {
    store.insert([{ kind: "jockey", code: "CJE", nameEn: "C L Chau", nameZh: "周俊樂" }], "results-page", new Date("2026-09-01T00:00:00Z"));
    const r = make(true);
    const k = { kind: "jockey" as const, code: "CJE" };
    r.enqueue([k]);
    await r.idle();
    expect(r.state.failed).toBe(1);
    r.enqueue([k]); // inside the 1-minute backoff
    await r.idle();
    expect(calls).toHaveLength(1);
    t = new Date(t.getTime() + 61_000);
    r.enqueue([k]);
    await r.idle();
    expect(calls).toHaveLength(2);
    expect(store.latest([k]).get("jockey:CJE")!.nameZh).toBe("周俊樂");
  });

  it("gives up on a jockey its page doesn't list", async () => {
    const r = make();
    r.enqueue([{ kind: "jockey", code: "GONE" }]);
    await r.idle();
    expect(r.state.failed).toBe(1);
    expect(store.latest([{ kind: "jockey", code: "GONE" }]).size).toBe(0);
  });
});

describe("lookup", () => {
  it("validates the body", () => {
    expect(parseLookupBody({})).toHaveProperty("error");
    expect(parseLookupBody({ keys: [{ kind: "owner", code: "X" }] })).toHaveProperty("error");
    expect(parseLookupBody({ keys: [{ kind: "horse", code: "../etc" }] })).toHaveProperty("error");
    expect(parseLookupBody({ keys: Array(501).fill({ kind: "horse", code: "A" }) })).toHaveProperty("error");
    expect(parseLookupBody({ keys: [{ kind: "race", code: RACE }, { kind: "race", code: RACE }] })).toEqual({ keys: [{ kind: "race", code: RACE }] });
  });

  it("answers from the DB at once, seeds English, and queues stale or missing keys", () => {
    const store = nameStore(openDb(":memory:"));
    const now = new Date("2026-09-25T00:00:00Z");
    store.insert([{ kind: "jockey", code: "CJE", nameEn: "C L Chau", nameZh: "周俊樂" }], "results-page", new Date(now.getTime() - 9 * DAY));
    const index: NameIndex = { en: new Map([["horse:HK_2024_K580", "RED BRICK WARRIOR"]]), lastRace: new Map(), resultRaces: [], keys: [] };
    const queued: NameKey[] = [];
    const out = lookupNames(
      [{ kind: "jockey", code: "CJE" }, { kind: "horse", code: "HK_2024_K580" }, { kind: "trainer", code: "ZZZ" }],
      { store, index: () => index, enqueue: (k) => queued.push(...k), now }
    );
    expect(out.names).toEqual({
      "jockey:CJE": { en: "C L Chau", zh: "周俊樂", fetchedAt: new Date(now.getTime() - 9 * DAY).toISOString() },
      "horse:HK_2024_K580": { en: "RED BRICK WARRIOR", zh: null, fetchedAt: now.toISOString() },
      "trainer:ZZZ": { en: null, zh: null, fetchedAt: null },
    });
    expect(out.pending).toEqual(["horse:HK_2024_K580", "trainer:ZZZ"]);
    expect(queued.map((k) => k.code)).toEqual(["CJE", "HK_2024_K580", "ZZZ"]); // stale jockey too
  });
});
