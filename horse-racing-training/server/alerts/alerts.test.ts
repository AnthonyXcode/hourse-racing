import { describe, it, expect, afterEach } from "vitest";
import type { Server } from "http";
import { openMembersDb, type MembersDB } from "../members/db";
import { userStore } from "../members/users";
import { strategyChecks, type PreRaceAnalysis } from "../../shared/analyzer/model";
import type { RaceResult } from "../../shared/types";
import { alertsProductionProblems, loadAlertsConfig } from "./config";
import { fiveStarPicks, postText, preText, smsSegments, type FiveStarResult } from "./content";
import { maskForLog, mockSender, type SmsSender } from "./sender";
import { alertSweeper, isQuietHours, type ScheduledRace } from "./scheduler";

// ---- fixtures ----
/** A Sha Tin card whose top pick meets every ST rule unless `fail` names one to break. */
function card(raceNo: number, fail?: "surface" | "trip" | "gap", top = { no: 4, name: "VIVACIOUS WIN" }): PreRaceAnalysis {
  return {
    raceId: `2026-10-04-ST-${raceNo}`,
    venue: "ST",
    surface: fail === "surface" ? "AWT" : "Turf",
    runners: 12,
    avgDiff: 14,
    close8: 3,
    sparse: 1,
    gap: fail === "gap" ? 2 : 6,
    horses: [
      { horseNo: top.no, code: "K223", name: top.name, modelRank: 1, ratingRank: 1, marketRank: 2, odds: 4, winPct: 30, placePct: 70, tripRuns: fail === "trip" ? 1 : 5 },
      { horseNo: 9, code: "X9", name: "OTHER", modelRank: 2, ratingRank: 2, marketRank: 1, odds: 3, winPct: 20, placePct: 50, tripRuns: 4 },
    ],
  };
}
const HK = (hhmm: string, date = "2026-10-04") => Date.parse(`${date}T${hhmm}:00+08:00`);
const result = (raceNo: number, order: number[]): RaceResult =>
  ({ raceNumber: raceNo, finishOrder: order.map((h, i) => ({ horseNumber: h, finishPosition: i + 1, horseName: `H${h}`, horseCode: `C${h}`, winOdds: 5 })), winDividend: 50 }) as unknown as RaceResult;

let db: MembersDB | null = null;
let server: Server | null = null;
afterEach(() => {
  server?.close();
  server = null;
  db?.close();
  db = null;
});

function setup(opts: { analyses?: PreRaceAnalysis[]; races?: ScheduledRace[]; date?: string } = {}) {
  db = openMembersDb(":memory:");
  const users = userStore(db);
  const ann = users.login("+85291235678", "en").user;
  users.setAlerts(ann.id, true, "en");
  const bo = users.login("+85292224444", "zh-HK").user;
  users.setAlerts(bo.id, true, "zh-HK");
  users.login("+85293330000", "en"); // alerts off: never messaged
  const sent: { to: string; body: string }[] = [];
  const sender: SmsSender = { name: "mock", send: async (to, body) => (sent.push({ to, body }), { id: `m${sent.length}` }) };
  let t = 0;
  let analysesCalls = 0;
  let results: RaceResult[] | null = null;
  const date = opts.date ?? "2026-10-04";
  const races = opts.races ?? [
    { raceNo: 1, post: HK("13:00", date), voided: false },
    { raceNo: 2, post: HK("13:30", date), voided: false },
    { raceNo: 3, post: HK("14:00", date), voided: false },
  ];
  const sweep = alertSweeper({
    db,
    cfg: { appOrigin: "https://posttimehk.com", perSecond: 1000 },
    sender,
    now: () => t,
    meetings: (d) => (d === date ? [{ venue: "ST", races }] : []),
    analyses: async () => (analysesCalls++, opts.analyses ?? [card(1), card(2, "surface"), card(3, undefined, { no: 7, name: "SKY VINO" })]),
    results: () => results,
    sleep: async () => {},
    log: () => {},
  });
  return {
    db,
    ann,
    bo,
    sent,
    sweep,
    at: (ms: number) => (t = ms),
    setResults: (r: RaceResult[] | null) => (results = r),
    analysesCalls: () => analysesCalls,
    log: () => db!.prepare("SELECT user_id, kind, status, error FROM sms_alert_log ORDER BY id").all() as { user_id: string; kind: string; status: string; error: string | null }[],
  };
}

describe("5★ selection", () => {
  it("keeps exactly the races whose top pick meets every rule of the venue strategy (pre-race)", () => {
    const all = [card(1), card(2, "surface"), card(3, "trip"), card(4, "gap"), card(5)];
    expect(fiveStarPicks(all).map((p) => p.raceNo)).toEqual(all.filter((a) => strategyChecks(a).every((c) => c.ok)).map((a) => Number(a.raceId.split("-").at(-1))));
    expect(fiveStarPicks(all)).toEqual([
      { raceNo: 1, num: 4, name: "VIVACIOUS WIN" },
      { raceNo: 5, num: 4, name: "VIVACIOUS WIN" },
    ]);
  });
});

describe("SMS texts", () => {
  const m = { date: "2026-10-04", venue: "ST", firstPost: HK("13:00") };
  const picks = [1, 3, 5].map((r, i) => ({ raceNo: r, num: 4 + i, name: ["VIVACIOUS WIN", "SKY VINO", "HAPPY UNIVERSE"][i]! }));
  it("brand first, opt-out last, within 2 segments in both languages (long lists are cut with +N and a link)", () => {
    const many = [...Array(11)].map((_, i) => ({ raceNo: i + 1, num: i + 2, name: "SUPREME AGILITY OF THE NIGHT" }));
    const res = (p: typeof picks): FiveStarResult[] => p.map((x, i) => ({ ...x, fin: i + 1, placed: i < 3 }));
    for (const lang of ["en", "zh-HK"] as const) {
      for (const text of [preText(lang, m, picks, "https://posttimehk.com"), preText(lang, m, [], "https://posttimehk.com"), preText(lang, m, many, "https://posttimehk.com"), postText(lang, m, res(picks), "https://posttimehk.com"), postText(lang, m, res(many), "https://posttimehk.com")]) {
        expect(smsSegments(text), text).toBeLessThanOrEqual(2);
        expect(text.startsWith(lang === "en" ? "Post Time: " : "開跑前 Post Time:"), text).toBe(true);
        expect(text.endsWith(lang === "en" ? "Turn off in the app (Settings)" : "可於App設定內關閉"), text).toBe(true);
      }
      // 11 races fit once the names are dropped; a list that still doesn't fit is cut with "+N" and a link.
      expect(preText(lang, m, many, "https://posttimehk.com")).not.toContain("SUPREME");
      const huge = [...Array(30)].map((_, i) => ({ raceNo: i + 1, num: i + 2, name: "X" }));
      const cut = preText(lang, m, huge, "https://posttimehk.com");
      expect(cut).toMatch(lang === "en" ? /\+\d+ more https:\/\/posttimehk\.com\// : /另\d+場:https:\/\/posttimehk\.com\//);
      expect(smsSegments(cut)).toBeLessThanOrEqual(2);
    }
    // English stays GSM-7 (160 per segment), Chinese is UCS-2 (70).
    expect(smsSegments("a".repeat(160))).toBe(1);
    expect(smsSegments("a".repeat(161))).toBe(2);
    expect(smsSegments("中".repeat(70))).toBe(1);
    expect(smsSegments("中".repeat(71))).toBe(2);
    expect(preText("en", m, picks, "x")).toBe(
      "Post Time: 5-star picks, Sha Tin Sun 4 Oct (1st race 13:00): R1 #4 VIVACIOUS WIN, R3 #5 SKY VINO, R5 #6 HAPPY UNIVERSE. Model suggestions only, not advice. Turn off in the app (Settings)"
    );
    expect(postText("en", m, res(picks).map((r, i) => ({ ...r, placed: i !== 1, fin: [2, 6, 3][i]! })), "x")).toBe(
      "Post Time: 5-star results, Sha Tin Sun 4 Oct: R1 #4 VIVACIOUS WIN 2nd placed, R3 #5 SKY VINO 6th, R5 #6 HAPPY UNIVERSE 3rd placed. Placed 2 of 3. Turn off in the app (Settings)"
    );
  });
});

describe("alert sweep (timing, idempotency, clamps)", () => {
  it("PRE 30 min before the first race, once; POST after the last race once results are stored, once", async () => {
    const s = setup();
    s.at(HK("12:29"));
    expect((await s.sweep()).sent).toBe(0);
    s.at(HK("12:31"));
    expect(await s.sweep()).toMatchObject({ sent: 2, failed: 0 });
    await s.sweep(); // same minute again
    s.at(HK("12:50"));
    await s.sweep();
    expect(s.sent).toHaveLength(2);
    expect(s.analysesCalls()).toBe(1); // 5★ races chosen once per meeting
    expect(s.sent.find((x) => x.to === "+85291235678")!.body).toContain("R1 #4 VIVACIOUS WIN, R3 #7 SKY VINO");
    expect(s.sent.find((x) => x.to === "+85292224444")!.body).toMatch(/^開跑前 Post Time:10月4日沙田5星首選\(首場13:00\)/);
    // POST: not before last + 30 min, and not before every result is stored.
    s.at(HK("14:29"));
    await s.sweep();
    s.at(HK("14:31"));
    await s.sweep();
    expect(s.sent).toHaveLength(2);
    s.setResults([result(1, [4, 9, 2]), result(2, [1, 2, 3]), result(3, [9, 2, 1, 7])]);
    s.at(HK("15:10"));
    expect((await s.sweep()).sent).toBe(2);
    await s.sweep();
    expect(s.sent).toHaveLength(4);
    expect(s.sent[2]!.body).toContain("R1 #4 VIVACIOUS WIN 1st placed, R3 #7 SKY VINO 4th. Placed 1 of 2.");
    expect(s.log().every((r) => r.status === "sent")).toBe(true);
  });

  it("never sends a PRE after the first race (logged skipped) and then no POST for that member", async () => {
    const s = setup();
    s.at(HK("13:05"));
    expect(await s.sweep()).toMatchObject({ sent: 0, skipped: 2 });
    expect(s.log().map((r) => [r.kind, r.status, r.error])).toEqual([
      ["pre", "skipped", "missed: first race already started"],
      ["pre", "skipped", "missed: first race already started"],
    ]);
    s.setResults([result(1, [4, 9, 2]), result(2, [1, 2, 3]), result(3, [7, 2, 1])]);
    s.at(HK("15:00"));
    await s.sweep();
    expect(s.sent).toHaveLength(0);
  });

  it("no 5★ race: one short SMS, then no POST", async () => {
    const s = setup({ analyses: [card(1, "surface"), card(2, "gap")] });
    s.at(HK("12:40"));
    await s.sweep();
    expect(s.sent.map((x) => x.body)).toEqual([
      "Post Time: No 5-star races at Sha Tin today (Sun 4 Oct). Turn off in the app (Settings)",
      "開跑前 Post Time:今日(10月4日)沙田沒有5星賽事。可於App設定內關閉",
    ]);
    s.setResults([result(1, [4, 9, 2]), result(2, [1, 2, 3]), result(3, [7, 2, 1])]);
    s.at(HK("15:00"));
    expect(await s.sweep()).toMatchObject({ sent: 0, skipped: 2 });
    expect(s.sent).toHaveLength(2);
  });

  it("POST gives up 3 h after it was due when results never arrive", async () => {
    const s = setup();
    s.at(HK("12:40"));
    await s.sweep();
    s.at(HK("17:29"));
    expect((await s.sweep()).skipped).toBe(0);
    s.at(HK("17:31"));
    expect((await s.sweep()).skipped).toBe(2);
    expect(s.log().filter((r) => r.kind === "post").map((r) => r.error)).toEqual(["results not stored in time", "results not stored in time"]);
  });

  it("quiet hours 23:30–08:00: an early PRE waits until 08:00 (still before the first race)", async () => {
    expect([isQuietHours(HK("23:29")), isQuietHours(HK("23:30")), isQuietHours(HK("07:59")), isQuietHours(HK("08:00"))]).toEqual([false, true, true, false]);
    const s = setup({ races: [{ raceNo: 1, post: HK("08:20"), voided: false }] , analyses: [card(1)] });
    s.at(HK("07:55"));
    expect((await s.sweep()).sent).toBe(0);
    s.at(HK("08:01"));
    expect((await s.sweep()).sent).toBe(2);
  });

  it("members who turn alerts off get nothing more", async () => {
    const s = setup();
    userStore(s.db).setAlerts(s.ann.id, false, "en");
    s.at(HK("12:40"));
    await s.sweep();
    expect(s.sent.map((x) => x.to)).toEqual(["+85292224444"]);
  });
});

describe("sender, config", () => {
  it("mock sender logs a masked phone only", async () => {
    const lines: string[] = [];
    await mockSender((l) => lines.push(l)).send("+85291235678", "hello");
    expect(lines).toEqual(["[sms:mock] +852****5678 hello"]);
    expect(maskForLog("+85291235678")).toBe("+852****5678");
  });

  it("production guard: SMS_ALERTS=1 needs Twilio and a messaging service or a from number; off by default in production", () => {
    expect(loadAlertsConfig({ NODE_ENV: "production" }).enabled).toBe(false);
    expect(loadAlertsConfig({}).enabled).toBe(true); // dev: on, mock sender
    expect(loadAlertsConfig({}).provider).toBe("mock");
    expect(alertsProductionProblems(loadAlertsConfig({ NODE_ENV: "production" }))).toEqual([]);
    expect(alertsProductionProblems(loadAlertsConfig({ NODE_ENV: "production", SMS_ALERTS: "1", SMS_PROVIDER: "mock" }))[0]).toMatch(/SMS_PROVIDER must be "twilio"/);
    expect(alertsProductionProblems(loadAlertsConfig({ NODE_ENV: "production", SMS_ALERTS: "1", TWILIO_ACCOUNT_SID: "AC1", TWILIO_AUTH_TOKEN: "t" }))).toEqual([
      "TWILIO_MESSAGING_SERVICE_SID or TWILIO_SMS_FROM must be set (SMS alerts)",
    ]);
    expect(alertsProductionProblems(loadAlertsConfig({ NODE_ENV: "production", SMS_ALERTS: "1", TWILIO_ACCOUNT_SID: "AC1", TWILIO_AUTH_TOKEN: "t", TWILIO_MESSAGING_SERVICE_SID: "MG1" }))).toEqual([]);
  });

  it("there is no inbound SMS endpoint: replying to an alert can't turn it off (app only)", async () => {
    const { readFileSync, existsSync } = await import("fs");
    const here = (f: string) => new URL(f, import.meta.url);
    expect(existsSync(here("./inbound.ts"))).toBe(false);
    expect(readFileSync(here("../index.ts"), "utf8")).not.toMatch(/sms\/inbound|smsInbound/);
  });
});

describe("PATCH /api/me: alerts5Star", () => {
  it("members toggle it (language recorded); guests get 401; non-booleans are rejected", async () => {
    const { harness } = await import("../credits/testHarness");
    const h = await harness();
    try {
      expect((await h.call("PATCH", "/me", { alerts5Star: true })).status).toBe(401);
      const m = await h.login("+85291237777");
      expect((await h.call("GET", "/me", undefined, m.cookie)).body.user.alerts5Star).toBe(false);
      expect((await h.call("PATCH", "/me", { alerts5Star: "yes" }, m.cookie)).body.error).toMatchObject({ field: "alerts5Star" });
      expect((await h.call("PATCH", "/me", { alerts5Star: true, alertsLang: "fr" }, m.cookie)).body.error).toMatchObject({ field: "alertsLang" });
      expect((await h.call("PATCH", "/me", { alerts5Star: true, alertsLang: "en" }, m.cookie)).body.user.alerts5Star).toBe(true);
      expect(h.db.prepare("SELECT alerts_5star, alerts_lang FROM users WHERE id = ?").get(m.user.id)).toEqual({ alerts_5star: 1, alerts_lang: "en" });
      expect((await h.call("PATCH", "/me", { alerts5Star: false }, m.cookie)).body.user.alerts5Star).toBe(false);
    } finally {
      h.close();
    }
  });
});
