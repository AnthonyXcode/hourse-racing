// Analyzer performance: runs the parent repo's form analyzer + Monte Carlo
// simulator over every saved racecard in a date range and pairs each horse's
// prediction with its actual result. Aggregation happens client-side.
//
// Racecards and results come from the DB. Per-race output is cached in memory, keyed by the card and
// results rows' updated_at, so widening or re-running a range only simulates races not seen before.
import path from "path";
import { fileURLToPath } from "url";
import { races as raceDb } from "./dataIndex";
import { buildRace } from "./data/raceBuilder";
import type { CardDoc } from "./data/raceStore";
import type { RaceResult } from "../shared/types";
import type { AnalyzerPayload, AnalyzerRace, HorseRow, PreRaceAnalysis } from "../shared/analyzer/model";

export const MC_RUNS = 5000;
const MIN_RUNNERS = 6;

// ---- Parent-repo engine, loaded at runtime ----
// The parent src/ doesn't pass this package's stricter tsconfig, so it's
// imported by computed path (tsc doesn't follow it) and typed minimally here.
interface Entry {
  horseNumber: number;
  isScratched?: boolean;
  horse: { code: string; name?: string };
  jockey?: { name?: string; code?: string };
}
interface Race {
  class: string | number;
  distance: number;
  surface?: string;
  entries: Entry[];
}
interface Engine {
  isSparseFormEntry(e: Entry): boolean;
  tripRunCount(e: Entry | undefined, distance: number): number;
  analyzeRace(race: Race): { horseCode: string; overallRating: number }[];
  simulateRace(
    race: Race,
    venue: "ST" | "HV"
  ): { horseNumber: number; horseCode: string; horseName: string; winProbability: number; placeProbability: number; expectedPosition: number }[];
}

let enginePromise: Promise<Engine> | null = null;
function engine(): Promise<Engine> {
  enginePromise ??= (async () => {
    const src = fileURLToPath(new URL("../../src/", import.meta.url));
    const load = (p: string) => import(/* @vite-ignore */ path.join(src, p));
    const [bt, fa, mc] = await Promise.all([
      load("backtest/differentiationBacktest.ts"),
      load("analysis/formAnalysis.ts"),
      load("simulation/monteCarlo.ts"),
    ]);
    return {
      isSparseFormEntry: bt.isSparseFormEntry,
      tripRunCount: bt.tripRunCount,
      analyzeRace: (race) => new fa.FormAnalyzer().analyzeRace(race),
      simulateRace: (race, venue) =>
        new mc.MonteCarloSimulator({ runs: MC_RUNS, performanceStdDev: venue === "HV" ? 11 : 8 }).simulateRace(race).results,
    };
  })();
  return enginePromise;
}

// ---- Seeded RNG ----
// The simulator uses Math.random. Swap in a seeded generator for the (fully
// synchronous) duration of one race so results are reproducible and don't
// depend on which other races are in the range.
function mulberry32(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function withSeed<T>(key: string, fn: () => T): T {
  const orig = Math.random;
  Math.random = mulberry32(hash(key));
  try {
    return fn();
  } finally {
    Math.random = orig;
  }
}

const r2 = (n: number) => Math.round(n * 100) / 100;
const r4 = (n: number) => Math.round(n * 10000) / 10000;

// ---- One race ----
async function analyzeOne(
  eng: Engine,
  seedKey: string,
  doc: CardDoc,
  date: string,
  venue: "ST" | "HV",
  rn: number,
  results: RaceResult[]
): Promise<AnalyzerRace | null> {
  const result = results.find((r) => r.raceNumber === rn);
  const order = result?.finishOrder ?? [];
  if (order.length === 0) return null;

  const loaded = buildRace<Race>(doc);
  if (!loaded) return null;
  const { race, winOddsMap } = loaded;
  const active = race.entries.filter((e) => !e.isScratched && e.horseNumber > 0);
  if (active.length < MIN_RUNNERS) return null;

  const { analyses, mc } = withSeed(seedKey, () => ({
    analyses: eng.analyzeRace(race),
    mc: eng.simulateRace(race, venue).filter((r) => r.horseNumber > 0),
  }));
  if (analyses.length === 0 || mc.length === 0) return null;

  const topRating = analyses[0]!.overallRating;
  const diffs = analyses.map((a) => Math.abs(topRating - a.overallRating));
  const second = analyses[1];
  const ratingRank = new Map(analyses.map((a, i) => [a.horseCode, i + 1]));

  // Starting price from results, else the odds saved on the card.
  const sp = new Map<number, number>();
  for (const f of order) if (f.winOdds > 0) sp.set(f.horseNumber, f.winOdds);
  const oddsOf = (n: number) => sp.get(n) ?? winOddsMap.get(n) ?? 0;
  const mktRank = new Map(
    active
      .filter((e) => oddsOf(e.horseNumber) > 0)
      .sort((a, b) => oddsOf(a.horseNumber) - oddsOf(b.horseNumber))
      .map((e, i) => [e.horse.code, i + 1])
  );

  // Place dividends are listed in finish order (four on a dead-heat for 3rd); stored per $1.
  const placedOrder = order.filter((f) => f.finishPosition >= 1 && f.finishPosition <= 3);
  const placeDiv = new Map<number, number>();
  if (result!.placeDividends && result!.placeDividends.length >= 3) {
    placedOrder.forEach((f, i) => {
      const d = result!.placeDividends![i];
      if (d !== undefined) placeDiv.set(f.horseNumber, d / 10);
    });
  }
  const placed = new Set(placedOrder.map((f) => f.horseCode));
  const finishOf = (code: string, num: number) =>
    order.find((f) => f.horseCode === code)?.finishPosition ?? order.find((f) => f.horseNumber === num)?.finishPosition ?? 0;

  const entryByNum = new Map(active.map((e) => [e.horseNumber, e]));
  const h: HorseRow[] = mc.map((r, i) => {
    const fin = finishOf(r.horseCode, r.horseNumber);
    return [
      i + 1,
      ratingRank.get(r.horseCode) ?? 0,
      mktRank.get(r.horseCode) ?? 0,
      r4(r.winProbability),
      r4(r.placeProbability),
      r2(r.expectedPosition),
      fin,
      fin === 1 ? 1 : 0,
      placed.has(r.horseCode) ? 1 : 0,
      r2(oddsOf(r.horseNumber)),
      r2(placeDiv.get(r.horseNumber) ?? 0),
      r.horseNumber,
      eng.tripRunCount(entryByNum.get(r.horseNumber), race.distance),
    ];
  });

  const topRun = order.find((f) => f.horseNumber === mc[0]!.horseNumber);
  const dt = result!.doubleTrioLegs?.length === 2 && result!.doubleTrioDividend ? result! : null;
  return {
    d: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`,
    v: venue,
    r: rn,
    c: String(race.class),
    dist: race.distance,
    sf: String(race.surface),
    n: active.length,
    ad: Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length),
    c8: diffs.filter((d) => d < 8).length,
    sp: active.filter((e) => eng.isSparseFormEntry(e)).length,
    gp: second ? Math.abs(topRating - second.overallRating) : 999,
    tn: mc[0]!.horseName,
    tnum: mc[0]!.horseNumber,
    tc: mc[0]!.horseCode,
    // Actual rider from the result (catches late jockey changes), else the card's.
    tj: topRun?.jockeyName || entryByNum.get(mc[0]!.horseNumber)?.jockey?.name || "",
    tjc: (topRun?.jockeyName ? topRun.jockeyId : entryByNum.get(mc[0]!.horseNumber)?.jockey?.code) || "",
    td: result!.trioDividend ?? 0,
    dd: dt?.doubleTrioDividend ?? 0,
    ddl: dt?.doubleTrioLegs ?? [],
    h,
  };
}

// ---- Range ----
const cache = new Map<string, { stamp: string; race: AnalyzerRace | null }>();

/** from/to are YYYY-MM-DD, inclusive. */
export async function runAnalyzer(from: string, to: string): Promise<AnalyzerPayload> {
  const eng = await engine();
  const db = raceDb();
  const cards = db.cardsInRange(from, to); // date, venue, race order
  const resultStamp = new Map(db.resultMeetings().map((m) => [`${m.date}_${m.venue}`, m.updatedAt]));

  const resultsByMeeting = new Map<string, RaceResult[]>();
  const races: AnalyzerRace[] = [];
  let computed = 0;
  for (const { key, doc, updatedAt } of cards) {
    const date = key.date.replaceAll("-", ""); // YYYYMMDD, as the per-race output and seed expect
    // Seed = the old racecard file name, so predictions stay identical to the file-based version.
    const seedKey = `racecard_${date}_${key.venue}_R${key.raceNo}.json`;
    const meeting = `${key.date}_${key.venue}`;
    const stamp = `${updatedAt}:${resultStamp.get(meeting) ?? ""}`;
    let hit = cache.get(seedKey);
    if (!hit || hit.stamp !== stamp) {
      if (!resultsByMeeting.has(meeting)) resultsByMeeting.set(meeting, db.results<RaceResult>({ date: key.date, venue: key.venue }) ?? []);
      hit = { stamp, race: await analyzeOne(eng, seedKey, doc, date, key.venue, key.raceNo, resultsByMeeting.get(meeting)!) };
      cache.set(seedKey, hit);
      // Yield between simulations so the server stays responsive during a long run.
      if (++computed % 10 === 0) await new Promise((r) => setImmediate(r));
    }
    if (hit.race) races.push(hit.race);
  }
  return { generatedAt: new Date().toISOString(), from, to, races };
}

const preCache = new Map<string, { stamp: string; value: PreRaceAnalysis | null }>();

/**
 * Pre-race analysis of one racecard for the Bet page: model order with win/place %, form-rating rank,
 * market rank (odds saved on the card) and trip runs, plus the race-level metrics. Uses no results or
 * starting prices, so it never reveals the outcome. Same engine and seed as runAnalyzer, so the numbers
 * match the Win/Place tab.
 */
export async function analyzeCard(date: string, venue: "ST" | "HV", rn: number): Promise<PreRaceAnalysis | null> {
  const iso = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
  const row = raceDb().cardsInRange(iso, iso).find((c) => c.key.venue === venue && c.key.raceNo === rn);
  if (!row) return null;
  const seedKey = `racecard_${date}_${venue}_R${rn}.json`;
  const hit = preCache.get(seedKey);
  if (hit && hit.stamp === row.updatedAt) return hit.value;

  const eng = await engine();
  const loaded = buildRace<Race & { surface?: string }>(row.doc);
  let value: PreRaceAnalysis | null = null;
  if (loaded) {
    const { race, winOddsMap } = loaded;
    const active = race.entries.filter((e) => !e.isScratched && e.horseNumber > 0);
    const { analyses, mc } = withSeed(seedKey, () => ({
      analyses: eng.analyzeRace(race),
      mc: eng.simulateRace(race, venue).filter((r) => r.horseNumber > 0),
    }));
    if (analyses.length && mc.length) {
      const topRating = analyses[0]!.overallRating;
      const diffs = analyses.map((a) => Math.abs(topRating - a.overallRating));
      const second = analyses[1];
      const ratingRank = new Map(analyses.map((a, i) => [a.horseCode, i + 1]));
      const odds = (n: number) => winOddsMap.get(n) ?? 0;
      const mktRank = new Map(
        active
          .filter((e) => odds(e.horseNumber) > 0)
          .sort((a, b) => odds(a.horseNumber) - odds(b.horseNumber))
          .map((e, i) => [e.horseNumber, i + 1])
      );
      const entryByNum = new Map(active.map((e) => [e.horseNumber, e]));
      value = {
        raceId: `${iso}-${venue}-${rn}`,
        venue,
        surface: String(race.surface ?? ""),
        runners: active.length,
        avgDiff: Math.round(diffs.reduce((t, d) => t + d, 0) / diffs.length),
        close8: diffs.filter((d) => d < 8).length,
        sparse: active.filter((e) => eng.isSparseFormEntry(e)).length,
        gap: second ? Math.abs(topRating - second.overallRating) : 999,
        horses: mc.map((r, i) => ({
          horseNo: r.horseNumber,
          code: r.horseCode,
          name: r.horseName,
          modelRank: i + 1,
          ratingRank: ratingRank.get(r.horseCode) ?? 0,
          marketRank: mktRank.get(r.horseNumber) ?? 0,
          odds: r2(odds(r.horseNumber)),
          winPct: Math.round(r.winProbability * 1000) / 10,
          placePct: Math.round(r.placeProbability * 1000) / 10,
          tripRuns: eng.tripRunCount(entryByNum.get(r.horseNumber), race.distance),
        })),
      };
    }
  }
  preCache.set(seedKey, { stamp: row.updatedAt, value });
  return value;
}
