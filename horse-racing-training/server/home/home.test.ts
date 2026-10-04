import { describe, it, expect, afterEach } from "vitest";
import express from "express";
import Database from "better-sqlite3";
import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import type { AddressInfo } from "node:net";
import type { Server } from "http";
import { MIGRATIONS, openMembersDb, type MembersDB } from "../members/db";
import { userStore } from "../members/users";
import type { AnalyzerRace, HorseRow } from "../../shared/analyzer/model";
import { homeSummary, minusMonths, summarize } from "./summary";
import { recordsFor } from "./records";
import { lastRacingDay, leaderboard, memberProfile } from "./leaderboard";
import { homeRouter } from "./routes";
import { botBoard, botStats, fillWithBots, type BotStats } from "./bots";
import type { LeaderboardRow } from "../../shared/types";
import { seo } from "../seo";

// ---- model summary ----
/** [mc, rating, mkt, pWin, pPlace, ePos, fin, won, placed, winOdds, placeOdds, horseNo, trip] */
const horse = (mc: number, mkt: number, fin: number, wodds = 0): HorseRow => [mc, mc, mkt, 0.2, 0.5, mc, fin, fin === 1 ? 1 : 0, fin >= 1 && fin <= 3 ? 1 : 0, wodds, 0, mc, 0];
const race = (d: string, h: HorseRow[], td: number): AnalyzerRace => ({
  d, v: "ST", r: 1, c: "Class 4", dist: 1200, sf: "Turf", n: h.length, ad: 5, c8: 3, sp: 0, gp: 2, tn: "X", tnum: 1, tc: "X1", tj: "", tjc: "", td, dd: 0, ddl: [], h,
});
// A: model top (MC1, 2nd favourite) wins; favourite runs 2nd. Trio 1-2-3 by model rank → hit (dividend 100).
const A = race("2026-08-01", [horse(1, 2, 1, 3), horse(2, 1, 2), horse(3, 3, 3), horse(4, 4, 4)], 100);
// B: model top runs 4th; the favourite (MC2) wins. Trio = MC2,3,4 → banker MC1 missing → miss (dividend 200).
const B = race("2026-09-12", [horse(1, 3, 4), horse(2, 1, 1), horse(3, 2, 2), horse(4, 4, 3)], 200);
// C: only two finishers → not settled, ignored everywhere.
const C = race("2026-09-20", [horse(1, 1, 1), horse(2, 2, 2), horse(3, 3, 0), horse(4, 4, 0)], 0);

describe("home summary", () => {
  it("computes the figures with the analyzer's own metrics over settled races only", () => {
    const s = summarize([A, B, C], "2026-07-04", "2026-10-04", "t");
    expect(s).toEqual({
      from: "2026-07-04",
      to: "2026-10-04",
      firstRace: "2026-08-01",
      lastRace: "2026-09-12",
      races: 2,
      meetings: 2,
      // A and B: the winner is one of the top 3 picks, and at least one of them placed.
      top3Races: 2,
      top3WinHits: 2,
      top3Win: 100,
      top3PlaceHits: 2,
      top3Place: 100,
      days: ["2026-09-12", "2026-08-01"], // newest first; C (unsettled) not listed
      // Banker #1 + 2–6: 4 runners covered → C(3,2) = 3 combos/race; 1 hit of 2; stake 60, return 100 → +66.7%.
      trio: { key: "k16", bankers: 1, last: 6, races: 2, hits: 1, hit: 50, combos: 3, roi: 66.7 },
      generatedAt: "t",
    });
    expect(summarize([C], "a", "b").races).toBe(0);
    expect(summarize([], "a", "b")).toMatchObject({ races: 0, top3Win: null, top3Place: null, firstRace: null, trio: { hit: null, roi: null } });
  });

  it("top-3 picks, per race: win = winner among the top 3; place = at least one of the top 3 placed", () => {
    // D: winner is model #4 → no win hit; pick #1 ran 2nd → place hit.
    const D = race("2026-09-13", [horse(1, 1, 2), horse(2, 2, 4), horse(3, 3, 5), horse(4, 4, 1), horse(5, 5, 3)], 300);
    // E: none of the top 3 picks finished in the top 3 → no win, no place.
    const E = race("2026-09-14", [horse(1, 1, 4), horse(2, 2, 5), horse(3, 3, 6), horse(4, 4, 1), horse(5, 5, 2), horse(6, 6, 3)], 0);
    expect(summarize([A, B, D, E], "2026-07-04", "2026-10-04")).toMatchObject({
      top3Races: 4, top3WinHits: 2, top3Win: 50, top3PlaceHits: 3, top3Place: 75,
    });
  });

  it("records: one day's settled races with the top 3 picks, the actual top 3 and win / place marks", async () => {
    const D = race("2026-09-12", [horse(1, 1, 2), horse(2, 2, 4), horse(3, 3, 5), horse(4, 4, 1), horse(5, 5, 3)], 0);
    const Dr2 = { ...D, r: 2 };
    const runners = (_d: string, _v: string, rn: number) => (rn === 1 ? [{ horseNumber: 2, horse: { code: "HK_X2", name: "TWO" } }] : null);
    const day = await recordsFor({ run: async () => ({ generatedAt: "t", from: "", to: "", races: [Dr2, B, A, C] }), runners }, "2026-09-12");
    expect(day.races.map((r) => r.raceNo)).toEqual([1, 2]); // only that date, sorted; A is another day
    const [b, d2] = day.races;
    // B: model picks #1 (4th), #2 (won), #3 (2nd) → win + place.
    expect(b).toMatchObject({ venue: "ST", raceNo: 1, win: true, place: true });
    expect(b!.picks).toEqual([
      { rank: 1, num: 1, name: "#1", code: null, fin: 4, won: false, placed: false },
      { rank: 2, num: 2, name: "TWO", code: "HK_X2", fin: 1, won: true, placed: true },
      { rank: 3, num: 3, name: "#3", code: null, fin: 2, won: false, placed: true },
    ]);
    expect(b!.top3.map((h) => [h.pos, h.num, h.picked])).toEqual([[1, 2, true], [2, 3, true], [3, 4, false]]);
    // D: winner #4 not picked → no win; pick #1 ran 2nd → place.
    expect(d2).toMatchObject({ raceNo: 2, win: false, place: true });
    expect(day).toMatchObject({ date: "2026-09-12", winHits: 1, placeHits: 2 });
  });

  it("covers exactly 3 calendar months back (HK dates, month ends clamped)", () => {
    expect(minusMonths("2026-10-04", 3)).toBe("2026-07-04");
    expect(minusMonths("2026-05-31", 3)).toBe("2026-02-28");
    expect(minusMonths("2026-01-15", 3)).toBe("2025-10-15");
  });

  it("runs the analyzer once per 10 minutes for the range, serving the cached copy (stale while refreshing)", async () => {
    let t = 0;
    const calls: string[] = [];
    const s = homeSummary({
      run: async (from, to) => (calls.push(`${from}..${to}`), { generatedAt: "", from, to, races: [A, B] }),
      today: () => "2026-10-04",
      now: () => t,
    });
    const [a, b] = await Promise.all([s.get(), s.get()]); // concurrent cold requests share one run
    expect(calls).toEqual(["2026-07-04..2026-10-04"]);
    expect(a).toBe(b);
    t = 9 * 60_000;
    await s.get();
    expect(calls.length).toBe(1);
    t = 11 * 60_000;
    expect(await s.get()).toBe(a); // stale copy straight away…
    await new Promise((r) => setTimeout(r, 0));
    expect(calls.length).toBe(2); // …and one refresh in the background
    // Payload size: numbers only, no per-horse rows.
    expect(JSON.stringify(a).length).toBeLessThan(1000);
    expect(a).not.toHaveProperty("races.0");
  });
});

// ---- leaderboard ----
let db: MembersDB | null = null;
let server: Server | null = null;
afterEach(() => {
  server?.close();
  server = null;
  db?.close();
  db = null;
});

const TODAY = "2026-10-04";
let n = 0;
function seed() {
  db = openMembersDb(":memory:");
  const users = userStore(db);
  const mk = (phone: string, name: string, optIn: boolean) => {
    const u = users.login(phone, "en").user;
    users.update(u.id, { displayName: name, email: `${name.toLowerCase()}@example.com` });
    if (optIn) users.setLeaderboard(u.id, true);
    return users.byId(u.id)!;
  };
  const bet = (userId: string, o: { date?: string; status: "won" | "lost" | "pending" | "void"; stake?: number; payout?: number; refund?: number; type?: string }) =>
    db!
      .prepare(
        `INSERT INTO live_bets (id, user_id, slip_key, date, venue, bet_type, selection, race_ids, unit, combos, stake, status, refund, payout, created_at, settled_at)
         VALUES (?, ?, 'k', ?, 'ST', ?, ?, '[1]', 10, 1, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        `b${++n}`,
        userId,
        o.date ?? "20260920",
        o.type ?? "WIN",
        JSON.stringify({ type: o.type ?? "WIN", raceLegs: [{ raceNumber: 1, bankers: [], legs: [3] }] }),
        o.stake ?? 100,
        o.status,
        o.refund ?? 0,
        o.payout ?? 0,
        `2026-09-20T10:00:${String(n % 60).padStart(2, "0")}.000Z`,
        o.status === "won" || o.status === "lost" ? `2026-09-20T11:00:${String(n % 60).padStart(2, "0")}.000Z` : null
      );
  const ann = mk("+85291230001", "Ann", true); // 6 settled: 2 won (300 each) → staked 600, returned 600 → ROI 0
  for (let i = 0; i < 4; i++) bet(ann.id, { status: "lost" });
  for (let i = 0; i < 2; i++) bet(ann.id, { status: "won", payout: 300 });
  const bob = mk("+85291230002", "Bob", true); // 5 settled + pending/void that must not count: ROI +20%, net +100
  for (let i = 0; i < 4; i++) bet(bob.id, { status: "lost" });
  bet(bob.id, { status: "won", payout: 600 });
  bet(bob.id, { status: "pending", stake: 9999 });
  bet(bob.id, { status: "void", stake: 9999, refund: 9999 });
  const cat = mk("+85291230003", "Cat", true); // same ROI as Bob (+20%) but net +200 → ranked above Bob
  for (let i = 0; i < 9; i++) bet(cat.id, { status: "lost" });
  bet(cat.id, { status: "won", payout: 1200 });
  const dan = mk("+85291230004", "Dan", true); // only 4 settled → below the minimum
  for (let i = 0; i < 4; i++) bet(dan.id, { status: "won", payout: 1000 });
  const eve = mk("+85291230005", "Eve", false); // great results but NOT opted in
  for (let i = 0; i < 8; i++) bet(eve.id, { status: "won", payout: 5000 });
  const fay = mk("+85291230006", "Fay", true); // old bets only: all-time board, not the 90-day one; refund lowers staked
  for (let i = 0; i < 5; i++) bet(fay.id, { status: i ? "lost" : "won", date: "20260101", payout: i ? 0 : 1000, refund: i === 1 ? 50 : 0, type: i ? "TRIO" : "WIN" });
  return { ann, bob, cat, dan, eve, fay };
}

describe("leaderboard", () => {
  it("last racing day: the latest date with settled live bets; a day board counts only that date", () => {
    const { ann } = seed();
    expect(lastRacingDay(db!, "20261004")).toBe("20260920");
    expect(lastRacingDay(db!, "20260919")).toBe("20260101"); // nothing settled after "today" counts
    db!.prepare("UPDATE live_bets SET date = '20260927' WHERE user_id = ? AND status = 'won'").run(ann.id); // Ann's 2 wins move a week on
    expect(lastRacingDay(db!, "20261004")).toBe("20260927");
    expect(leaderboard(db!, { since: "20260927", until: "20260927", minBets: 1 })).toMatchObject([{ displayName: "Ann", bets: 2, roi: 200 }]);
  });

  it("opt-in members only, settled live bets only, minimum bets, ROI then net ordering", () => {
    const { bob } = seed();
    const rows = leaderboard(db!, { since: "20260706", minBets: 5 });
    expect(rows.map((r) => [r.rank, r.displayName, r.bets, r.roi, r.net])).toEqual([
      [1, "Cat", 10, 20, 200],
      [2, "Bob", 5, 20, 100],
      [3, "Ann", 6, 0, 0],
    ]);
    expect(rows[1]).toMatchObject({ bets: 5, hits: 1, hitRate: 20, staked: 500, returned: 600, publicId: bob.public_id });
    // All time adds Fay (old bets); her 50-credit scratch refund comes off what she staked.
    const all = leaderboard(db!, { since: null, minBets: 5 });
    expect(all.find((r) => r.displayName === "Fay")).toMatchObject({ bets: 5, hits: 1, staked: 450, returned: 1000, net: 550, roi: 122.2, rank: 1 });
    // The threshold is configurable.
    expect(leaderboard(db!, { since: null, minBets: 4 }).map((r) => r.displayName)).toContain("Dan");
    expect(leaderboard(db!, { since: null, minBets: 1 }).map((r) => r.displayName)).not.toContain("Eve");
  });

  it("profiles: 404 unless opted in; per-pool breakdown and the 20 most recent settled bets; no PII anywhere", async () => {
    const { ann, eve, fay } = seed();
    expect(memberProfile(db!, eve.public_id!, { since: null })).toBeNull();
    expect(memberProfile(db!, "not-hex!", { since: null })).toBeNull();
    const p = memberProfile(db!, fay.public_id!, { since: null })!;
    expect(p).toMatchObject({ displayName: "Fay", memberSince: ann.created_at.slice(0, 7), bets: 5, hits: 1 });
    expect(p.pools).toEqual([
      { pool: "TRIO", bets: 4, hits: 0 },
      { pool: "WIN", bets: 1, hits: 1 },
    ]);
    expect(p.recent).toHaveLength(5);
    expect(p.recent[0]).toMatchObject({ date: "2026-01-01", venue: "ST", races: [1], picks: "R1 腳 3" });
    expect(memberProfile(db!, fay.public_id!, { since: "20260706" })).toMatchObject({ bets: 0, pools: [], recent: [] });

    // Over HTTP: public, no auth; PII never present.
    const app = express();
    app.use("/api", homeRouter({ db: db!, minBets: 5, today: () => TODAY, summary: { get: async () => summarize([A, B], "x", "y") }, records: async (date) => recordsFor({ run: async () => ({ generatedAt: "t", from: date, to: date, races: [A, B] }), runners: () => null }, date) }));
    server = app.listen(0);
    await new Promise((r) => server!.once("listening", r));
    const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api`;
    const board = await fetch(`${base}/leaderboard`);
    expect(board.status).toBe(200);
    const boardJson = await board.json();
    // Last racing day = 2026-09-20 (Fay's 2026-01-01 bets are older); 30 days = 5 Sep – 4 Oct.
    expect(boardJson).toMatchObject({ lastDay: { date: "2026-09-20", minBets: 3 }, last30: { from: "2026-09-05", minBets: 5 } });
    const names = (b: { rows: { displayName: string }[] }) => b.rows.map((r) => r.displayName);
    expect(names(boardJson.lastDay)).toEqual(["Dan", "Cat", "Bob", "Ann"]); // Dan's 4 bets clear the day minimum (3)
    expect(names(boardJson.last30)).toEqual(["Cat", "Bob", "Ann"]);
    const texts = [JSON.stringify(boardJson), await (await fetch(`${base}/leaderboard/${ann.public_id}?range=all`)).text(), await (await fetch(`${base}/leaderboard/${ann.public_id}?range=30d`)).text()];
    const ids = (db!.prepare("SELECT id FROM users").all() as { id: string }[]).map((r) => r.id);
    for (const text of texts) {
      expect(text).not.toMatch(/\+852|9123000\d|@example\.com|phone|email|whatsapp|telegram|description/i);
      for (const id of ids) expect(text).not.toContain(id);
    }
    expect((await fetch(`${base}/leaderboard/${eve.public_id}`)).status).toBe(404);
    expect((await fetch(`${base}/leaderboard/${ann.public_id}`)).status).toBe(200);
    expect((await fetch(`${base}/leaderboard/${ann.public_id}?range=90d`)).status).toBe(400);
    expect(await (await fetch(`${base}/home/summary`)).json()).toMatchObject({ races: 2, top3Win: 100 });
    expect(await (await fetch(`${base}/home/records?date=2026-09-12`)).json()).toMatchObject({ date: "2026-09-12", winHits: 1, races: [{ raceNo: 1 }] });
    expect((await fetch(`${base}/home/records?date=12-09-2026`)).status).toBe(400);
    expect((await fetch(`${base}/home/records?date=2999-01-01`)).status).toBe(400);
  });

  it("opting out removes the member at once", () => {
    const { cat } = seed();
    userStore(db!).setLeaderboard(cat.id, false);
    expect(leaderboard(db!, { since: null, minBets: 5 }).map((r) => r.displayName)).not.toContain("Cat");
    expect(memberProfile(db!, cat.public_id!, { since: null })).toBeNull();
  });

  it("summary errors become a 503 without details", async () => {
    db = openMembersDb(":memory:");
    const app = express();
    app.use("/api", homeRouter({ db, minBets: 5, today: () => TODAY, summary: { get: async () => Promise.reject(new Error("engine path /secret")) }, records: async () => Promise.reject(new Error("x")) }));
    server = app.listen(0);
    await new Promise((r) => server!.once("listening", r));
    const r = await fetch(`http://127.0.0.1:${(server.address() as AddressInfo).port}/api/home/summary`);
    expect(r.status).toBe(503);
    expect(await r.text()).not.toContain("secret");
  });
});

describe("members DB migration v4 (leaderboard)", () => {
  it("adds the opt-in (off) and a unique random public id to existing members, keeping their data", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "pt-v4-"));
    const file = path.join(dir, "members.sqlite");
    try {
      const old = new Database(file);
      for (const m of MIGRATIONS.slice(0, 3)) old.exec(m);
      old.pragma("user_version = 3");
      const ins = old.prepare("INSERT INTO users (id, phone_e164, display_name, locale, created_at, updated_at, last_login_at) VALUES (?, ?, ?, 'en', 't', 't', 't')");
      ins.run("u1", "+85291110001", "One");
      ins.run("u2", "+85291110002", "Two");
      old.close();
      const db2 = openMembersDb(file);
      expect(db2.pragma("user_version", { simple: true })).toBe(MIGRATIONS.length);
      const rows = db2.prepare("SELECT id, display_name, show_on_leaderboard, public_id FROM users ORDER BY id").all() as { id: string; display_name: string; show_on_leaderboard: number; public_id: string }[];
      expect(rows.map((r) => [r.id, r.display_name, r.show_on_leaderboard])).toEqual([
        ["u1", "One", 0],
        ["u2", "Two", 0],
      ]);
      for (const r of rows) expect(r.public_id).toMatch(/^[0-9a-f]{18}$/);
      expect(rows[0]!.public_id).not.toBe(rows[1]!.public_id);
      expect(() => db2.prepare("UPDATE users SET public_id = ? WHERE id = 'u2'").run(rows[0]!.public_id)).toThrow(/UNIQUE/);
      expect(() => db2.prepare("UPDATE users SET show_on_leaderboard = 2 WHERE id = 'u1'").run()).toThrow(/CHECK/);
      // New sign-ups get a public id too.
      expect(userStore(db2).login("+85291110003", "en").user.public_id).toMatch(/^[0-9a-f]{18}$/);
      db2.close();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("SEO: Home is the site root", () => {
  it("sitemap lists Home at / and Bet at ?tab=bet", async () => {
    const app = express();
    app.use(seo);
    server = app.listen(0);
    await new Promise((r) => server!.once("listening", r));
    const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    const xml = await (await fetch(`${base}/sitemap.xml`)).text();
    expect(xml).toContain(`<loc>${base}/</loc>`);
    expect(xml).toContain(`<loc>${base}/?tab=bet</loc>`);
    expect(xml).not.toContain("tab=home");
  });
});

describe("PATCH /api/me: leaderboard opt-in", () => {
  it("is off by default, toggles with a boolean only, and /api/me returns the member's own public id", async () => {
    const { harness } = await import("../credits/testHarness");
    const h = await harness();
    try {
      const m = await h.login("+85291239999");
      const me = (await h.call("GET", "/me", undefined, m.cookie)).body.user;
      expect(me).toMatchObject({ showOnLeaderboard: false });
      expect(me.publicId).toMatch(/^[0-9a-f]{18}$/);
      expect((await h.call("PATCH", "/me", { showOnLeaderboard: "yes" }, m.cookie)).body.error).toMatchObject({ code: "validation_error", field: "showOnLeaderboard" });
      const on = (await h.call("PATCH", "/me", { showOnLeaderboard: true, displayName: "Lucky Lee" }, m.cookie)).body.user;
      expect(on).toMatchObject({ showOnLeaderboard: true, displayName: "Lucky Lee", publicId: me.publicId });
      expect((await h.call("PATCH", "/me", { showOnLeaderboard: false }, m.cookie)).body.user.showOnLeaderboard).toBe(false);
    } finally {
      h.close();
    }
  });
});

describe("strategy bots (real results, labelled; fill boards below 5 members)", () => {
  // Same shape as A, with every runner priced and place dividends stored for the placed horses.
  const Ap = race("2026-08-02", [
    [1, 1, 2, 0.2, 0.5, 1, 1, 1, 1, 3, 1.5, 1, 0],
    [2, 2, 1, 0.2, 0.5, 2, 2, 0, 1, 2, 1.2, 2, 0],
    [3, 3, 3, 0.2, 0.5, 3, 3, 0, 1, 8, 2.5, 3, 0],
    [4, 4, 4, 0.2, 0.5, 4, 4, 0, 0, 20, 0, 4, 0],
  ], 0);
  const get = (s: BotStats[], k: string) => s.find((b) => b.bot === k)!;

  it("settles each rule on the analyzer's real results (A / B fixtures, hand-worked)", () => {
    const s = botStats([A, B, C]); // C isn't settled: never bet
    // Win on model #1: A priced at 3.0 and won → 10 staked, 30 back. B is unpriced → skipped.
    expect(get(s, "model1Win")).toEqual({ bot: "model1Win", bets: 1, hits: 1, hitRate: 100, staked: 10, returned: 30, net: 20, roi: 200 });
    // No place dividends stored, favourites unpriced → those bots don't bet at all.
    for (const k of ["model1Place", "favWin", "favPlace"]) expect(get(s, k)).toMatchObject({ bets: 0, staked: 0, roi: 0 });
    // Banker #1 + 2–6: 3 combos a race; A hits (100), B misses → 60 staked, 100 back.
    expect(get(s, "trioK16")).toEqual({ bot: "trioK16", bets: 2, hits: 1, hitRate: 50, staked: 60, returned: 100, net: 40, roi: 66.7 });
    // Box top 3: 1 combo; A hits (100), B misses (its 3rd is model #4).
    expect(get(s, "trioBox3")).toEqual({ bot: "trioBox3", bets: 2, hits: 1, hitRate: 50, staked: 20, returned: 100, net: 80, roi: 400 });
    // Box top 4: 4 combos; both hit → 80 staked, 100 + 200 back.
    expect(get(s, "trioBox4")).toEqual({ bot: "trioBox4", bets: 2, hits: 2, hitRate: 100, staked: 80, returned: 300, net: 220, roi: 275 });

    const p = botStats([Ap]); // td 0 → no Trio bets
    expect(get(p, "model1Place")).toMatchObject({ bets: 1, hits: 1, staked: 10, returned: 15, net: 5, roi: 50 });
    expect(get(p, "favWin")).toMatchObject({ bets: 1, hits: 0, staked: 10, returned: 0, net: -10, roi: -100 });
    expect(get(p, "favPlace")).toMatchObject({ bets: 1, hits: 1, staked: 10, returned: 12, net: 2, roi: 20 });
    expect(get(p, "trioK16")).toMatchObject({ bets: 0 });
  });

  it("fill rule: 0 / 3 / 5 members → 5 rows; members first; bots by ROI (net, key); minBets respected", () => {
    const bots = botStats([A, B]);
    const member = (i: number): LeaderboardRow => ({ rank: i + 1, publicId: `m${i}`, displayName: `M${i}`, avatarUrl: null, bets: 9, hits: 1, hitRate: 11.1, staked: 90, returned: 0, net: -90, roi: -100 });
    const at = (n: number, minBets: number) => fillWithBots([...Array(n)].map((_, i) => member(i)), bots, minBets);
    // minBets 1: model1Win (1 bet) qualifies. ROI order: box3 400, box4 275, model1Win 200, k16 66.7, then the 0-bet bots are out.
    expect(at(0, 1).map((r) => [r.rank, r.bot ?? r.displayName, r.publicId])).toEqual([
      [1, "harbour", "bot-harbour"],
      [2, "dragon", "bot-dragon"],
      [3, "comet", "bot-comet"],
      [4, "typhoon", "bot-typhoon"],
    ]);
    // minBets 2 drops model1Win; members always first, bots continue the ranks.
    expect(at(3, 2).map((r) => [r.rank, r.bot ?? r.displayName])).toEqual([
      [1, "M0"],
      [2, "M1"],
      [3, "M2"],
      [4, "harbour"],
      [5, "dragon"],
    ]);
    expect(at(5, 1).every((r) => !r.bot)).toBe(true);
    expect(at(5, 1)).toHaveLength(5);
    // With enough qualifying bots a board always has 5 rows.
    const many = [...bots, ...bots.map((b) => ({ ...b, bot: `${b.bot}X` as BotStats["bot"] }))].map((b) => ({ ...b, bets: 9 }));
    expect([0, 3, 5].map((n) => fillWithBots([...Array(n)].map((_, i) => member(i)), many, 5).length)).toEqual([5, 5, 5]);
    for (const r of at(0, 1)) expect(r).toMatchObject({ displayName: "", avatarUrl: null });
  });

  it("route: the day board is the latest day with settled RACES; bots fill both boards; bot ids have no profile", async () => {
    seed(); // real members bet on 2026-09-20; races latest on 2026-09-28 (nobody bet live that day)
    const calls: string[] = [];
    const app = express();
    app.use(
      "/api",
      homeRouter({
        db: db!,
        minBets: 5,
        minBetsDay: 1,
        today: () => TODAY,
        summary: { get: async () => summarize([A, B], "x", "y") },
        records: async () => Promise.reject(new Error("unused")),
        lastRaceDay: async () => "2026-09-28",
        bots: async (from, to) => (calls.push(`${from}..${to}`), botStats([A, B]).map((b) => ({ ...b, bets: b.bets * 5 }))),
      })
    );
    server = app.listen(0);
    await new Promise((r) => server!.once("listening", r));
    const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api`;
    const body = await (await fetch(`${base}/leaderboard`)).json();
    expect(body.lastDay.date).toBe("2026-09-28");
    expect(calls.sort()).toEqual(["2026-09-05..2026-10-04", "2026-09-28..2026-09-28"]);
    // Day: no live bets on the 28th → 0 members + bots. 30 days: Cat, Bob, Ann then 2 bots.
    expect(body.lastDay.rows.map((r: LeaderboardRow) => r.bot ?? r.displayName)).toEqual(["harbour", "dragon", "comet", "typhoon"]);
    expect(body.last30.rows.map((r: LeaderboardRow) => [r.rank, r.bot ?? r.displayName])).toEqual([
      [1, "Cat"],
      [2, "Bob"],
      [3, "Ann"],
      [4, "harbour"],
      [5, "dragon"],
    ]);
    expect((await fetch(`${base}/leaderboard/bot-harbour`)).status).toBe(404);
    const text = JSON.stringify(body);
    expect(text).not.toMatch(/\+852|9123000\d|@example\.com|phone|email/i);
    for (const { id } of db!.prepare("SELECT id FROM users").all() as { id: string }[]) expect(text).not.toContain(id);
  });

  it("route: without a race day it falls back to the last day with settled live bets", async () => {
    seed();
    const app = express();
    app.use("/api", homeRouter({ db: db!, minBets: 5, today: () => TODAY, summary: { get: async () => summarize([], "x", "y") }, records: async () => Promise.reject(new Error("x")), lastRaceDay: async () => null, bots: async () => [] }));
    server = app.listen(0);
    await new Promise((r) => server!.once("listening", r));
    const body = await (await fetch(`http://127.0.0.1:${(server.address() as AddressInfo).port}/api/leaderboard`)).json();
    expect(body.lastDay.date).toBe("2026-09-20");
  });

  it("caches bot stats per window for ~10 minutes", async () => {
    let t = 0;
    let runs = 0;
    const get = botBoard({ run: async (from, to) => (runs++, { generatedAt: "", from, to, races: [A, B] }), now: () => t }).stats;
    await get("a", "b");
    await get("a", "b");
    await get("a", "c");
    expect(runs).toBe(2);
    t = 11 * 60_000;
    await get("a", "b");
    expect(runs).toBe(3);
  });
});

describe("bot pages (GET /api/leaderboard/bot-<alias>)", () => {
  const runners = (_d: string, _v: string, _r: number) => [1, 2, 3, 4].map((n) => ({ horseNumber: n, horse: { name: `HORSE ${n}`, code: `C00${n}` } }));
  async function serve() {
    db = openMembersDb(":memory:"); // no members: both boards are bots
    const b = botBoard({ run: async (from, to) => ({ generatedAt: "", from, to, races: [A, B, C] }) });
    const app = express();
    app.use(
      "/api",
      homeRouter({
        db,
        minBets: 1,
        minBetsDay: 1,
        today: () => TODAY,
        summary: { get: async () => summarize([A, B], "x", "y") },
        records: async () => Promise.reject(new Error("unused")),
        lastRaceDay: async () => "2026-09-12",
        bots: b.stats,
        botRaces: b.races,
        runners,
      })
    );
    server = app.listen(0);
    await new Promise((r) => server!.once("listening", r));
    return `http://127.0.0.1:${(server.address() as AddressInfo).port}/api`;
  }
  const STAT_KEYS = ["bets", "hits", "hitRate", "staked", "returned", "net", "roi"] as const;
  const pickStats = (o: Record<string, unknown>) => Object.fromEntries(STAT_KEYS.map((k) => [k, o[k]]));

  it("matches the board row exactly for the same window, and its bets add up to the stats", async () => {
    const base = await serve();
    const board = await (await fetch(`${base}/leaderboard`)).json();
    expect(board.lastDay.date).toBe("2026-09-12");
    let checked = 0;
    for (const [range, rows] of [["day", board.lastDay.rows], ["30d", board.last30.rows]] as const) {
      for (const row of rows as LeaderboardRow[]) {
        const p = await (await fetch(`${base}/leaderboard/${row.publicId}?range=${range}`)).json();
        expect(p.alias).toBe(row.bot);
        expect(pickStats(p), `${row.bot} ${range}`).toEqual(pickStats(row as unknown as Record<string, unknown>));
        expect(p.records).toHaveLength(p.bets);
        const sum = (k: "stake" | "returned") => Math.round(p.records.reduce((s: number, b: Record<string, number>) => s + b[k], 0) * 10) / 10;
        expect([sum("stake"), sum("returned"), p.records.filter((b: { status: string }) => b.status === "won").length]).toEqual([p.staked, p.returned, p.hits]);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(3);
  });

  it("lists each bet with its selection (bankers / legs, names, codes) and the actual top 3", async () => {
    const base = await serve();
    // Day 2026-08-01 = race A: Typhoon (Trio banker #1 + 2–6) hits; Comet (Win, model #1 at 3.0) wins.
    const typhoon = await (await fetch(`${base}/leaderboard/bot-typhoon?range=day&date=2026-08-01`)).json();
    expect(typhoon).toMatchObject({ alias: "typhoon", from: "2026-08-01", to: "2026-08-01", bets: 1, hits: 1, staked: 30, returned: 100 });
    expect(typhoon.records).toEqual([
      {
        date: "2026-08-01",
        venue: "ST",
        raceNo: 1,
        pool: "TRIO",
        selection: [1, 2, 3, 4].map((n) => ({ num: n, name: `HORSE ${n}`, code: `C00${n}` })),
        bankers: [1],
        legs: [2, 3, 4],
        combos: 3,
        stake: 30,
        returned: 100,
        status: "won",
        top3: [1, 2, 3].map((n) => ({ pos: n, num: n, name: `HORSE ${n}`, code: `C00${n}` })),
      },
    ]);
    const comet = await (await fetch(`${base}/leaderboard/bot-comet?range=day&date=2026-08-01`)).json();
    expect(comet.records[0]).toMatchObject({ pool: "WIN", selection: [{ num: 1, name: "HORSE 1" }], bankers: [], legs: [1], combos: 1, stake: 10, returned: 30, status: "won" });
    // Default day = the board's day (2026-09-12, race B): Harbour (box top 3 = 1, 2, 3) misses; actual 2-3-4.
    const harbour = await (await fetch(`${base}/leaderboard/bot-harbour?range=day`)).json();
    expect(harbour.records[0]).toMatchObject({ date: "2026-09-12", pool: "TRIO", bankers: [], legs: [1, 2, 3], combos: 1, stake: 10, returned: 0, status: "lost" });
    expect(harbour.records[0].top3.map((h: { pos: number; num: number }) => [h.pos, h.num])).toEqual([[1, 2], [2, 3], [3, 4]]);
    // Comet skipped race B (unpriced) → no bet listed, like the stats.
    expect((await (await fetch(`${base}/leaderboard/bot-comet?range=day`)).json()).records).toEqual([]);
  });

  it("404 for unknown aliases (and internal keys); never puts strategy keys on the wire", async () => {
    const base = await serve();
    for (const id of ["bot-nope", "bot-model1Win", "bot-", "bot-trioK16"]) expect((await fetch(`${base}/leaderboard/${id}?range=30d`)).status, id).toBe(404);
    expect((await fetch(`${base}/leaderboard/bot-comet?range=week`)).status).toBe(400);
    expect((await fetch(`${base}/leaderboard/bot-comet?range=day&date=2999-01-01`)).status).toBe(400);
    const texts = [await (await fetch(`${base}/leaderboard`)).text()];
    for (const a of ["comet", "thunder", "jade", "phoenix", "typhoon", "harbour", "dragon"])
      for (const r of ["day", "30d"]) texts.push(await (await fetch(`${base}/leaderboard/bot-${a}?range=${r}`)).text());
    for (const t of texts) expect(t).not.toMatch(/model1|favWin|favPlace|trioK16|trioBox|k16|"b3"|"b4"/);
  });
});
