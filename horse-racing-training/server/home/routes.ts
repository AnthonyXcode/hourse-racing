// Public Home endpoints: model summary + member leaderboard. No auth, no contact data.
import { Router } from "express";
import type { MembersDB } from "../members/db";
import type { HomeRecordDay, HomeSummary, LeaderboardResponse } from "../../shared/types";
import { LEADERBOARD_DAYS, lastRacingDay, leaderboard, memberProfile, parseRange } from "./leaderboard";
import { botKeyOf, botProfile, fillWithBots, type BotStats, type Runners } from "./bots";
import type { AnalyzerRace } from "../../shared/analyzer/model";

export interface HomeDeps {
  db: MembersDB;
  summary: { get(): Promise<HomeSummary> };
  /** One racing day's top-3-pick records (records.ts). */
  records: (date: string) => Promise<HomeRecordDay>;
  /** Settled live bets needed to appear on the 30-day board (LEADERBOARD_MIN_BETS, default 5). */
  minBets: number;
  /** …and on the last-racing-day board (LEADERBOARD_MIN_BETS_DAY, default 3). */
  minBetsDay?: number;
  /** HK date (YYYY-MM-DD) of "now". */
  today: () => string;
  /** Latest racing day (YYYY-MM-DD) with settled races (the summary's days[0]), or null. */
  lastRaceDay?: () => Promise<string | null>;
  /** Strategy-bot results over race dates [from, to] (YYYY-MM-DD), used to fill boards below 5 members. */
  bots?: (from: string, to: string) => Promise<BotStats[]>;
  /** The same window's settled analyzer races (botBoard().races), for a bot's page. */
  botRaces?: (from: string, to: string) => Promise<AnalyzerRace[]>;
  /** Saved racecard runners (names + codes) for a race. */
  runners?: Runners;
}

/** YYYY-MM-DD → YYYYMMDD minus `days`. */
const compactMinusDays = (iso: string, days: number) => new Date(Date.parse(`${iso}T00:00:00Z`) - days * 86_400_000).toISOString().slice(0, 10).replaceAll("-", "");

export function loadMinBets(env: NodeJS.ProcessEnv = process.env, key = "LEADERBOARD_MIN_BETS", fallback = 5): number {
  const n = Number(env[key]);
  return Number.isInteger(n) && n >= 1 && n <= 1000 ? n : fallback;
}
export const loadMinBetsDay = (env: NodeJS.ProcessEnv = process.env) => loadMinBets(env, "LEADERBOARD_MIN_BETS_DAY", 3);

/** YYYYMMDD → YYYY-MM-DD. */
const dashed = (c: string) => `${c.slice(0, 4)}-${c.slice(4, 6)}-${c.slice(6, 8)}`;

export function homeRouter(d: HomeDeps) {
  const r = Router();
  const since = (range: "30d" | "all") => (range === "all" ? null : compactMinusDays(d.today(), LEADERBOARD_DAYS));

  r.get("/home/summary", async (_req, res) => {
    try {
      res.set("Cache-Control", "public, max-age=300");
      res.json(await d.summary.get());
    } catch (e) {
      console.error("[home] summary failed:", e);
      res.status(503).json({ error: { code: "summary_unavailable" } });
    }
  });

  r.get("/home/records", async (req, res) => {
    const date = String(req.query.date ?? "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date > d.today()) return res.status(400).json({ error: { code: "invalid_date" } });
    try {
      res.set("Cache-Control", "public, max-age=300");
      res.json(await d.records(date));
    } catch (e) {
      console.error("[home] records failed:", e);
      res.status(503).json({ error: { code: "records_unavailable" } });
    }
  });

  /** The day board's date (YYYYMMDD): the latest day with settled races, else with settled live bets. */
  const boardDay = async (): Promise<string | null> => {
    const raceDay = await d.lastRaceDay?.().catch((e) => (console.error("[home] last race day failed:", e), null));
    return raceDay ? raceDay.replaceAll("-", "") : lastRacingDay(d.db, d.today().replaceAll("-", ""));
  };

  r.get("/leaderboard", async (_req, res) => {
    const today = d.today().replaceAll("-", "");
    // The day board is about the latest meeting with results, even when nobody bet live on it.
    const day = await boardDay();
    const minDay = d.minBetsDay ?? 3;
    const from = compactMinusDays(d.today(), LEADERBOARD_DAYS - 1); // 30 days including today
    const realDay = day ? leaderboard(d.db, { since: day, until: day, minBets: minDay }) : [];
    const real30 = leaderboard(d.db, { since: from, until: today, minBets: d.minBets });
    // Fewer than 5 members: strategy bots (real results, clearly labelled) fill the board, ranked after members.
    const botsFor = async (real: typeof realDay, f: string, t: string): Promise<BotStats[]> => {
      if (real.length >= 5 || !d.bots) return [];
      try {
        return await d.bots(f, t);
      } catch (e) {
        console.error("[home] bots failed:", e);
        return [];
      }
    };
    const [botsDay, bots30] = await Promise.all([day ? botsFor(realDay, dashed(day), dashed(day)) : Promise.resolve([]), botsFor(real30, dashed(from), d.today())]);
    const body: LeaderboardResponse = {
      lastDay: { date: day ? dashed(day) : null, minBets: minDay, rows: fillWithBots(realDay, botsDay, minDay) },
      last30: { from: dashed(from), minBets: d.minBets, rows: fillWithBots(real30, bots30, d.minBets) },
    };
    res.set("Cache-Control", "no-store");
    res.json(body);
  });

  // A bot's page: its strategy is described by the client from the alias; the API carries the alias only.
  r.get("/leaderboard/:publicId", async (req, res, next) => {
    const id = String(req.params.publicId);
    if (!id.startsWith("bot-")) return next();
    res.set("Cache-Control", "no-store");
    const key = botKeyOf(id.slice(4));
    if (!key || !d.botRaces || !d.bots) return res.status(404).json({ error: { code: "not_found" } });
    const range = req.query.range === undefined || req.query.range === "30d" ? "30d" : req.query.range === "day" ? "day" : null;
    if (!range) return res.status(400).json({ error: { code: "invalid_range" } });
    let from: string, to: string;
    if (range === "30d") {
      from = dashed(compactMinusDays(d.today(), LEADERBOARD_DAYS - 1));
      to = d.today();
    } else {
      const q = req.query.date;
      if (q !== undefined && (typeof q !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(q) || q > d.today())) return res.status(400).json({ error: { code: "invalid_date" } });
      const board = typeof q === "string" ? null : await boardDay();
      const day = typeof q === "string" ? q : board ? dashed(board) : null;
      if (!day) return res.status(404).json({ error: { code: "not_found" } });
      from = to = day;
    }
    try {
      // Same cached window as the board, so the numbers match the row exactly.
      const races = await d.botRaces(from, to);
      res.json({ range, ...botProfile(races, key, d.runners ?? (() => null), { from, to }) });
    } catch (e) {
      console.error("[home] bot profile failed:", e);
      res.status(503).json({ error: { code: "unavailable" } });
    }
  });

  r.get("/leaderboard/:publicId", (req, res) => {
    const range = parseRange(req.query.range);
    if (!range) return res.status(400).json({ error: { code: "invalid_range" } });
    const p = memberProfile(d.db, String(req.params.publicId), { since: since(range) });
    res.set("Cache-Control", "no-store");
    if (!p) return res.status(404).json({ error: { code: "not_found" } });
    res.json({ range, ...p });
  });
  return r;
}
