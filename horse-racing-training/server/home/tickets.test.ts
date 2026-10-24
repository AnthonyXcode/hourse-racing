import { describe, it, expect } from "vitest";
import { openMembersDb } from "../members/db";
import { userStore } from "../members/users";
import type { PreRaceAnalysis } from "../../shared/analyzer/model";
import { botPreBet, botTickets, memberTickets, type OpenRace } from "./tickets";

const NOW = Date.parse("2026-10-25T03:00:00Z"); // 11:00 HKT

function seed() {
  const db = openMembersDb(":memory:");
  const users = userStore(db);
  const mk = (phone: string, name: string, optIn: boolean) => {
    const u = users.login(phone, "en").user;
    users.update(u.id, { displayName: name, email: `${name.toLowerCase()}@example.com` });
    if (optIn) users.setLeaderboard(u.id, true);
    return u.id;
  };
  let n = 0;
  const bet = (userId: string, o: { stake: number; status?: string; date?: string; post?: string | null }) =>
    db
      .prepare(
        `INSERT INTO live_bets (id, user_id, slip_key, date, venue, bet_type, selection, race_ids, first_post_time, unit, combos, stake, status, created_at)
         VALUES (?, ?, 'k', ?, 'ST', 'trio', ?, '[8]', ?, 10, 1, ?, ?, '2026-10-25T01:00:00.000Z')`
      )
      .run(`bet-${++n}`, userId, o.date ?? "20261025", JSON.stringify({ type: "trio", raceLegs: [{ raceNumber: 8, bankers: [3], legs: [5, 7] }] }), o.post === undefined ? "2026-10-25T16:40:00+08:00" : o.post, o.stake, o.status ?? "pending");
  const ann = mk("+85291230001", "Ann", true);
  const hid = mk("+85291230002", "Hid", false);
  bet(ann, { stake: 50 });
  bet(ann, { stake: 500 });
  bet(ann, { stake: 900, post: "2026-10-25T10:40:00+08:00" }); // already run
  bet(ann, { stake: 800, status: "won" }); // settled
  bet(ann, { stake: 700, date: "20261021" }); // past meeting
  bet(hid, { stake: 999 }); // not on the leaderboard: listed, anonymous
  return db;
}

const analysis = (horses: [horseNo: number, modelRank: number, marketRank: number][]): PreRaceAnalysis =>
  ({
    raceId: "x",
    venue: "ST",
    surface: "Turf",
    runners: horses.length,
    avgDiff: 0,
    close8: 0,
    sparse: 0,
    gap: 0,
    horses: horses.map(([horseNo, modelRank, marketRank]) => ({ horseNo, code: `H${horseNo}`, name: `H${horseNo}`, modelRank, ratingRank: modelRank, marketRank, odds: 0, winPct: 0, placePct: 0, tripRuns: 0, modelRating: 0, formRuns: 0 })),
  }) as PreRaceAnalysis;
const field = analysis([[4, 1, 3], [9, 2, 1], [2, 3, 2], [7, 4, 4], [1, 5, 5], [11, 6, 6], [5, 7, 7]]);

describe("home tickets", () => {
  it("members: pending bets on races not yet run, biggest stake first; hidden members anonymous", () => {
    const t = memberTickets(seed(), NOW, "20261025");
    expect(t.map((x) => [x.displayName, x.stake])).toEqual([["", 999], ["Ann", 500], ["Ann", 50]]);
    expect(t[0]).toMatchObject({ hidden: true, publicId: "", displayName: "", avatarUrl: null });
    expect(JSON.stringify(t[0])).not.toContain("Hid");
    expect(t[1]!.hidden).toBeUndefined();
    expect(t[1]).toMatchObject({ date: "2026-10-25", venue: "ST", betType: "trio", races: [8], picks: "R8 膽 3  腳 5,7", ref: "BET2" });
  });

  it("bots: each strategy's pre-race pick", () => {
    expect(botPreBet("model1Win", field)).toEqual({ betType: "win", bankers: [], legs: [4], combos: 1 });
    expect(botPreBet("favPlace", field)).toEqual({ betType: "place", bankers: [], legs: [9], combos: 1 });
    expect(botPreBet("trioK16", field)).toEqual({ betType: "trio", bankers: [4], legs: [1, 2, 7, 9, 11], combos: 10 });
    expect(botPreBet("trioBox4", field)).toMatchObject({ bankers: [], legs: [2, 4, 7, 9], combos: 4 });
    expect(botPreBet("trioK16", analysis([[1, 1, 1], [2, 2, 2], [3, 3, 3]]))).toBeNull();
  });

  it("bots fill the rest over the open races, biggest stake first", async () => {
    const races: OpenRace[] = [
      { date: "2026-10-25", venue: "ST", raceNo: 2, postTime: "2026-10-25T13:10:00+08:00" },
      { date: "2026-10-25", venue: "ST", raceNo: 1, postTime: "2026-10-25T12:40:00+08:00" },
    ];
    const t = await botTickets(races, async () => field, 3);
    expect(t.map((x) => [x.bot, x.races[0], x.stake])).toEqual([["typhoon", 1, 100], ["dragon", 1, 40], ["comet", 1, 10]]);
    expect(t.map((x) => x.picks)).toEqual(["R1 膽 4  腳 1,2,7,9,11", "R1 腳 2,4,7,9", "R1 4"]);
    expect(await botTickets(races, async () => field, 0)).toEqual([]);
    expect(await botTickets(races, async () => null, 8)).toEqual([]);
  });
});
