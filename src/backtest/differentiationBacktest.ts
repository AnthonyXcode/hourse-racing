/**
 * Shared differentiation backtest (same rules as tools/backtest-differentiation.ts).
 * Used by the CLI tool and batch-analyze for contextual hit rates.
 */

import { readFile, readdir } from "fs/promises";
import path from "path";
import type { Race, RaceEntry, Venue } from "../types/index.js";
import { FormAnalyzer } from "../analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../simulation/monteCarlo.js";

/** Runners with fewer than this many past performances count toward sparseFormCount. */
export const SPARSE_FORM_MIN_RECORDS = 3;

export function isSparseFormEntry(entry: Pick<RaceEntry, "isScratched" | "horse">): boolean {
  if (entry.isScratched) return false;
  return (entry.horse.pastPerformances?.length ?? 0) < SPARSE_FORM_MIN_RECORDS;
}

export interface DifferentiationBacktestRow {
  raceId: string;
  date: string;
  venue: "HV" | "ST";
  raceNumber: number;
  topRatedHorseCode: string;
  topRatedHorseName: string;
  topRatedHorseNumber: number;
  topSimHorseCode: string;
  topSimHorseName: string;
  topSimHorseNumber: number;
  actualWinnerCode: string;
  actualWinnerName: string;
  actualWinnerNumber: number;
  actualTop3Codes: string[];
  overallRating: number;
  avgDiff: number;
  horsesWithDiffLt8: number;
  sparseFormCount: number;
  /** |#1 overall rating − #2| from that race's form analysis */
  topGap: number;
  skipped: boolean;
  skipReason: string;
  surface: string;
  raceClass: string;
  distance: number;
  topRatedWon: boolean;
  topRatedPlaced: boolean;
  /** Actual finishing position of the top-rated pick (0 if unknown/scratched) */
  topRatedFinishPosition: number;
  topSimWon: boolean;
  topSimPlaced: boolean;
  numRunners: number;
  /** MC Place% of the top-rated horse (0–1 scale) */
  topRatedMcPlacePct: number;
  /** Win odds of the top-rated horse at race time (0 if unavailable) */
  topRatedWinOdds: number;
  /** Place odds of the top-rated horse at race time (0 if unavailable) */
  topRatedPlaceOdds: number;
  /** MC expected finishing position of the top-rated horse (e.g. 3.2 = avg 3rd) */
  topRatedExpectedPosition: number;
  /** Handicapper rating change for the top-rated horse (Rtg.+/-), if on racecard */
  topRatedRatingChange?: number;
}

interface FinishEntry {
  horseNumber: number;
  finishPosition: number;
  horseName: string;
  horseCode: string;
  winOdds?: number;
}

interface ResultsFile {
  id: string;
  raceNumber: number;
  finishOrder: FinishEntry[];
  winDividend?: number;
  placeDividends?: number[];
}

export type FormSource = "all" | "ST" | "HV";

export interface DifferentiationBacktestOptions {
  sparseMax: number;
  closeMax: number;
  avgDiffMin: number;
  gapMin: number;
  /** Skip if the top-rated horse's win odds > this value (0 = disabled) */
  oddsMax: number;
  /**
   * Skip if top-rated horse Rtg+/- <= this value (bet only when Rtg+/- > threshold).
   * null = disabled. Default in CLI is -1 (skip -1 and below; bet when Rtg+/- > -1).
   */
  ratingChangeMin?: number | null;
  months: string[];
  venue: "ST" | "HV" | null;
  surface: "Turf" | "AWT" | null;
  ignoreClasses: string[];
  ignoreDistances: number[];
  form: FormSource;
  /**
   * If set (`YYYY-MM-DD` or `YYYYMMDD`), drop races on or after that calendar day
   * (racecard `date` is compared as YYYYMMDD). Use the meeting day so the pool has no lookahead.
   */
  ignoreAfter?: string;
  /** Override racecard directory (default: cwd/data/racecards) */
  raceCardDir?: string;
}

export interface HitRateSummary {
  /** Rows in bucket (including skipped) */
  eligible: number;
  bets: number;
  hits: number;
  ratePct: string;
}

interface OddsFileHorse {
  horseNumber: number;
  winOdds: number;
  placeOdds: number;
}

interface OddsFileRace {
  raceNumber: number;
  horses: OddsFileHorse[];
}

interface OddsFile {
  races: OddsFileRace[];
}

/** Load place odds from data/odds/odds_{date}_{venue}.json, keyed by raceNumber → horseNumber → placeOdds */
export async function loadPlaceOdds(
  dateStr: string,
  venue: string
): Promise<Map<number, Map<number, number>>> {
  const venueSuffix = venue === "Happy Valley" ? "HV" : "ST";
  const fileName = `odds_${dateStr}_${venueSuffix}.json`;
  const filePath = path.join(process.cwd(), "data", "odds", fileName);
  try {
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as OddsFile;
    const result = new Map<number, Map<number, number>>();
    for (const race of data.races) {
      const horseMap = new Map<number, number>();
      for (const h of race.horses) {
        horseMap.set(h.horseNumber, h.placeOdds);
      }
      result.set(race.raceNumber, horseMap);
    }
    return result;
  } catch {
    return new Map();
  }
}

export interface MeetingResults {
  finishOrders: Map<number, FinishEntry[]>;
  /** raceNumber → horseNumber → place dividend as multiplier (e.g. 1.2 = $12 per $10) */
  placeDividendMap: Map<number, Map<number, number>>;
}

export async function loadResults(dateStr: string, venue: string): Promise<Map<number, FinishEntry[]>> {
  return (await loadMeetingResults(dateStr, venue)).finishOrders;
}

export async function loadMeetingResults(dateStr: string, venue: string): Promise<MeetingResults> {
  const venueSuffix = venue === "Happy Valley" ? "HV" : "ST";
  const fileName = `results_${dateStr}_${venueSuffix}.json`;
  const filePath = path.join(process.cwd(), "data", "historical", fileName);

  const finishOrders = new Map<number, FinishEntry[]>();
  const placeDividendMap = new Map<number, Map<number, number>>();
  try {
    const raw = await readFile(filePath, "utf-8");
    const races = JSON.parse(raw) as ResultsFile[];
    for (const race of races) {
      const order = race.finishOrder ?? [];
      finishOrders.set(race.raceNumber, order);

      if (race.placeDividends && race.placeDividends.length >= 3) {
        const horseMap = new Map<number, number>();
        for (let i = 0; i < 3 && i < order.length; i++) {
          horseMap.set(order[i].horseNumber, race.placeDividends[i] / 10);
        }
        placeDividendMap.set(race.raceNumber, horseMap);
      }
    }
  } catch {
    // file not found – both maps empty
  }
  return { finishOrders, placeDividendMap };
}

export async function loadRaceCard(filePath: string): Promise<{ race: Race; winOddsMap: Map<number, number> } | null> {
  try {
    const raw = await readFile(filePath, "utf-8");
    const saved = JSON.parse(raw);

    const race: Race = {
      ...saved.race,
      date: new Date(saved.race.date),
      entries: saved.race.entries.map((e: RaceEntry) => ({
        ...e,
        horse: {
          ...e.horse,
          pastPerformances: (e.horse.pastPerformances ?? []).map((pp: Record<string, unknown>) => ({
            ...pp,
            date: new Date(pp.date as string | Date),
          })),
        },
      })),
    } as Race;

    const winOddsMap = new Map<number, number>();
    for (const [num, odds] of Object.entries(saved.winOdds ?? {})) {
      winOddsMap.set(Number(num), odds as number);
    }

    return { race, winOddsMap };
  } catch {
    return null;
  }
}

export function applyFormSourceFilter(race: Race, form: FormSource): Race {
  if (form === "all") return race;
  const v: Venue = form === "ST" ? "Sha Tin" : "Happy Valley";
  return {
    ...race,
    entries: race.entries.map((e) => ({
      ...e,
      horse: {
        ...e.horse,
        pastPerformances: (e.horse.pastPerformances ?? []).filter((p) => p.venue === v),
      },
    })),
  };
}

export function parseRaceCardFileName(name: string): { date: string; venue: string; raceNumber: number } | null {
  const match = name.match(/racecard_(\d{8})_(ST|HV)_R(\d+)\.json/);
  if (!match) return null;
  return {
    date: match[1],
    venue: match[2] === "HV" ? "Happy Valley" : "Sha Tin",
    raceNumber: parseInt(match[3], 10),
  };
}

/**
 * Same skip rules as backtest-differentiation CLI.
 */
export function computeSkipDecision(
  sparseFormCount: number,
  horsesWithDiffLt8: number,
  avgDiff: number,
  topGap: number,
  opts: Pick<
    DifferentiationBacktestOptions,
    "sparseMax" | "closeMax" | "avgDiffMin" | "gapMin" | "ratingChangeMin"
  > & { oddsMax?: number },
  topRatedWinOdds?: number,
  topRatedRatingChange?: number
): { skipped: boolean; skipReason: string } {
  if (sparseFormCount > opts.sparseMax) {
    return { skipped: true, skipReason: `${sparseFormCount} horses w/ <${SPARSE_FORM_MIN_RECORDS} form` };
  }
  if (topGap < opts.gapMin) {
    return { skipped: true, skipReason: `1st-2nd gap=${topGap}` };
  }
  if (horsesWithDiffLt8 > opts.closeMax || avgDiff < opts.avgDiffMin) {
    return {
      skipped: true,
      skipReason: horsesWithDiffLt8 > opts.closeMax ? `close<8=${horsesWithDiffLt8}` : `avgDiff=${avgDiff}`,
    };
  }
  const oddsMax = opts.oddsMax ?? 0;
  if (oddsMax > 0 && topRatedWinOdds !== undefined && topRatedWinOdds > oddsMax) {
    return { skipped: true, skipReason: `odds=${topRatedWinOdds}>${oddsMax}` };
  }
  if (opts.ratingChangeMin != null) {
    if (topRatedRatingChange === undefined) {
      return { skipped: true, skipReason: "Rtg+/- unknown" };
    }
    if (topRatedRatingChange <= opts.ratingChangeMin) {
      const sign = topRatedRatingChange > 0 ? "+" : "";
      return { skipped: true, skipReason: `Rtg+/-=${sign}${topRatedRatingChange}` };
    }
  }
  return { skipped: false, skipReason: "" };
}

export function summarizeHitRate(
  rows: DifferentiationBacktestRow[],
  filter: (r: DifferentiationBacktestRow) => boolean
): HitRateSummary {
  const bucket = rows.filter(filter);
  const bets = bucket.filter((r) => !r.skipped);
  const hits = bets.filter((r) => r.topRatedPlaced).length;
  const ratePct = bets.length > 0 ? `${((hits / bets.length) * 100).toFixed(1)}%` : "N/A";
  return { eligible: bucket.length, bets: bets.length, hits, ratePct };
}

/**
 * Re-evaluate BET/SKIP per row using the given thresholds (e.g. current race's
 * sparse / close8 / avgDiff / topGap so hist matches `backtest-differentiation`
 * with --sparse=X --close=Y --avgdiff=Z --gap=W for that line).
 */
export function summarizeHitRateWithThresholds(
  rows: DifferentiationBacktestRow[],
  filter: (r: DifferentiationBacktestRow) => boolean,
  opts: Pick<
    DifferentiationBacktestOptions,
    "sparseMax" | "closeMax" | "avgDiffMin" | "gapMin" | "ratingChangeMin"
  > & { oddsMax?: number }
): HitRateSummary {
  const bucket = rows.filter(filter);
  let bets = 0;
  let hits = 0;
  for (const r of bucket) {
    const { skipped } = computeSkipDecision(
      r.sparseFormCount,
      r.horsesWithDiffLt8,
      r.avgDiff,
      r.topGap,
      opts,
      r.topRatedWinOdds,
      r.topRatedRatingChange
    );
    if (skipped) continue;
    bets++;
    if (r.topRatedPlaced) hits++;
  }
  const ratePct = bets > 0 ? `${((hits / bets) * 100).toFixed(1)}%` : "N/A";
  return { eligible: bucket.length, bets, hits, ratePct };
}

/** Venue code for batch row filter */
export function venueToCode(venue: string): "HV" | "ST" {
  return venue === "Happy Valley" || venue === "HV" ? "HV" : "ST";
}

/** Normalize CLI/date-fns values to YYYYMMDD, or null if unset/invalid */
export function parseIgnoreAfterDate(val: string | undefined | null): string | null {
  if (val === undefined || val === null) return null;
  const s = String(val).trim();
  if (!s) return null;
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso?.[1] && iso[2] && iso[3]) return `${iso[1]}${iso[2]}${iso[3]}`;
  const compact = s.match(/^(\d{8})$/);
  if (compact?.[1]) return compact[1];
  return null;
}

export async function runDifferentiationBacktest(
  opts: DifferentiationBacktestOptions
): Promise<DifferentiationBacktestRow[]> {
  const {
    sparseMax,
    closeMax,
    avgDiffMin,
    gapMin,
    oddsMax,
    ratingChangeMin = null,
    months,
    venue,
    surface,
    ignoreClasses,
    ignoreDistances,
    form,
  } = opts;
  const ignoreAfterYmd = parseIgnoreAfterDate(opts.ignoreAfter ?? null);
  const raceCardDir = opts.raceCardDir ?? path.join(process.cwd(), "data", "racecards");

  const formAnalyzer = new FormAnalyzer();
  const files = await readdir(raceCardDir);
  const venueSegment = venue ?? "ST|HV";
  const monthPattern =
    months.length === 0
      ? new RegExp(`racecard_\\d{8}_(${venueSegment})_R\\d+\\.json`)
      : new RegExp(`racecard_2026(${months.join("|")})\\d{2}_(${venueSegment})_R\\d+\\.json`);
  const matchedFiles = files.filter((f) => monthPattern.test(f)).sort();

  const resultsCache = new Map<string, MeetingResults>();
  const allResults: DifferentiationBacktestRow[] = [];

  for (const file of matchedFiles) {
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;
    if (ignoreAfterYmd && parsed.date >= ignoreAfterYmd) continue;

    const filePath = path.join(raceCardDir, file);
    const loaded = await loadRaceCard(filePath);
    if (!loaded) continue;

    const { race: rawRace, winOddsMap } = loaded;
    const race = applyFormSourceFilter(rawRace, form);
    if (race.entries.length < 4) continue;
    if (surface && race.surface !== surface) continue;
    if (ignoreClasses.length > 0 && ignoreClasses.includes((race.class ?? "").toUpperCase())) continue;
    if (ignoreDistances.length > 0 && ignoreDistances.includes(race.distance)) continue;

    const cacheKey = `${parsed.date}_${parsed.venue}`;
    if (!resultsCache.has(cacheKey)) {
      resultsCache.set(cacheKey, await loadMeetingResults(parsed.date, parsed.venue));
    }
    const meeting = resultsCache.get(cacheKey)!;
    const finishOrder = meeting.finishOrders.get(parsed.raceNumber);
    if (!finishOrder || finishOrder.length === 0) continue;

    const analyses = formAnalyzer.analyzeRace(race);
    if (analyses.length === 0) continue;

    const topRating = analyses[0].overallRating;
    const diffs = analyses.map((a) => Math.abs(topRating - a.overallRating));
    const avgDiff = Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length);
    const horsesWithDiffLt8 = diffs.filter((d) => d < 8).length;

    const sparseFormCount = race.entries.filter(isSparseFormEntry).length;

    const topGap =
      analyses.length >= 2 ? Math.abs(analyses[0].overallRating - analyses[1].overallRating) : 999;

    const topRatedAnalysis = analyses[0];
    const topRatedEntry = race.entries.find((e) => e.horse.code === topRatedAnalysis.horseCode);
    const topRatedHorseNum = topRatedEntry?.horseNumber ?? 0;
    const topRatedFinish = finishOrder.find((f) => f.horseNumber === topRatedHorseNum);
    const topRatedWinOdds = topRatedFinish?.winOdds ?? winOddsMap.get(topRatedHorseNum) ?? 0;
    const resultPlaceOdds = meeting.placeDividendMap.get(parsed.raceNumber);
    const topRatedPlaceOdds = resultPlaceOdds?.get(topRatedHorseNum) ?? 0;
    const topRatedRatingChange = topRatedEntry?.horse.ratingChange;

    const { skipped, skipReason } = computeSkipDecision(
      sparseFormCount,
      horsesWithDiffLt8,
      avgDiff,
      topGap,
      { sparseMax, closeMax, avgDiffMin, gapMin, oddsMax, ratingChangeMin },
      topRatedWinOdds,
      topRatedRatingChange
    );

    const hvStdDev = parsed.venue === "Happy Valley" ? 11 : 8;
    const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
    const { results: simResults } = simulator.simulateRace(race);
    const topSimResult = simResults[0];

    const topRatedMcResult = simResults.find((s) => s.horseCode === topRatedAnalysis.horseCode);
    const topRatedMcPlacePct = topRatedMcResult?.placeProbability ?? 0;
    const topRatedExpectedPosition = topRatedMcResult?.expectedPosition ?? 0;

    const winnerCode = finishOrder[0]?.horseCode ?? "";
    const top3Codes = finishOrder.slice(0, 3).map((f) => f.horseCode);

    allResults.push({
      raceId: `${parsed.date}_${parsed.venue === "Happy Valley" ? "HV" : "ST"}_R${parsed.raceNumber}`,
      date: parsed.date,
      venue: parsed.venue === "Happy Valley" ? "HV" : "ST",
      raceNumber: parsed.raceNumber,
      topRatedHorseCode: topRatedAnalysis.horseCode,
      topRatedHorseName: topRatedAnalysis.horseName,
      topRatedHorseNumber: topRatedEntry?.horseNumber ?? 0,
      topSimHorseCode: topSimResult.horseCode,
      topSimHorseName: topSimResult.horseName,
      topSimHorseNumber: topSimResult.horseNumber,
      actualWinnerCode: winnerCode,
      actualWinnerName: finishOrder[0]?.horseName ?? "",
      actualWinnerNumber: finishOrder[0]?.horseNumber ?? 0,
      actualTop3Codes: top3Codes,
      overallRating: topRating,
      avgDiff,
      horsesWithDiffLt8,
      sparseFormCount,
      topGap,
      skipped,
      skipReason,
      surface: race.surface,
      raceClass: race.class,
      distance: race.distance,
      topRatedWon: topRatedAnalysis.horseCode === winnerCode,
      topRatedPlaced: top3Codes.includes(topRatedAnalysis.horseCode),
      topRatedFinishPosition: topRatedFinish?.finishPosition ?? 0,
      topSimWon: topSimResult.horseCode === winnerCode,
      topSimPlaced: top3Codes.includes(topSimResult.horseCode),
      numRunners: race.entries.filter((e) => !e.isScratched).length,
      topRatedMcPlacePct,
      topRatedWinOdds,
      topRatedPlaceOdds,
      topRatedExpectedPosition,
      ...(topRatedEntry?.horse.ratingChange !== undefined
        ? { topRatedRatingChange: topRatedEntry.horse.ratingChange }
        : {}),
    });
  }

  return allResults;
}

/** Parsed CLI flags shared by backtest-differentiation and backtest-mc-accuracy. */
export interface DifferentiationBacktestCliArgs {
  sparseMax: number;
  closeMax: number;
  avgDiffMin: number;
  gapMin: number;
  oddsMax: number;
  ratingChangeMin: number | null;
  months: string[];
  venue: "ST" | "HV" | null;
  surface: "Turf" | "AWT" | null;
  ignoreClasses: string[];
  ignoreDistances: number[];
  form: FormSource;
  ignoreAfter?: string;
}

export function parseDifferentiationBacktestCliArgs(argv: string[]): DifferentiationBacktestCliArgs {
  let sparseMax = 3;
  let closeMax = 4;
  let avgDiffMin = 14;
  let gapMin = 0;
  let oddsMax = 0;
  let ratingChangeMin: number | null = -1;
  let months: string[] = [];
  let venue: "ST" | "HV" | null = null;
  let surface: "Turf" | "AWT" | null = null;
  let ignoreClasses: string[] = [];
  let ignoreDistances: number[] = [];
  let form: FormSource = "all";
  let ignoreAfter: string | undefined;

  for (const arg of argv) {
    const m = arg.match(/^--([a-zA-Z-]+)=(.+)$/);
    if (!m) continue;
    const key = m[1]!;
    const val = m[2] ?? "";
    if (key === "sparse") sparseMax = parseInt(val, 10);
    else if (key === "close") closeMax = parseInt(val, 10);
    else if (key === "avgdiff") avgDiffMin = parseInt(val, 10);
    else if (key === "gap") gapMin = parseInt(val, 10);
    else if (key === "odds") oddsMax = parseFloat(val);
    else if (key === "ratingchange") {
      if (val.toLowerCase() === "off") ratingChangeMin = null;
      else ratingChangeMin = parseInt(val, 10);
    } else if (key === "months") months = val.split(",").map((s) => s.trim().padStart(2, "0"));
    else if (key === "venue") venue = val.toUpperCase() === "HV" ? "HV" : "ST";
    else if (key === "surface") surface = val.toUpperCase() === "AWT" ? "AWT" : "Turf";
    else if (key === "ignore-class") ignoreClasses = val.split(",").map((s) => s.trim().toUpperCase());
    else if (key === "ignore-distance") ignoreDistances = val.split(",").map((s) => parseInt(s.trim(), 10));
    else if (key === "ignore-after") ignoreAfter = val.trim();
    else if (key === "form" || key === "form-data") {
      const u = val.trim().toUpperCase();
      if (u === "ALL") form = "all";
      else if (u === "ST") form = "ST";
      else if (u === "HV") form = "HV";
    }
  }

  return {
    sparseMax,
    closeMax,
    avgDiffMin,
    gapMin,
    oddsMax,
    ratingChangeMin,
    months,
    venue,
    surface,
    ignoreClasses,
    ignoreDistances,
    form,
    ignoreAfter,
  };
}

export interface McAccuracyPick {
  /** 1-based form overall-rating rank */
  ratingRank: number;
  /** 1-based MC win% rank */
  mcRank: number;
  horseCode: string;
  horseName: string;
  horseNumber: number;
  overallRating: number;
  mcWinPct: number;
  mcPlacePct: number;
  winOdds: number;
  placeOdds: number;
  placed: boolean;
}

export interface McAccuracyRaceRow {
  raceId: string;
  date: string;
  venue: "HV" | "ST";
  raceNumber: number;
  skipped: boolean;
  skipReason: string;
  numRunners: number;
  picks: McAccuracyPick[];
}

/**
 * Per-race form-rating ranks + MC ranks with actual place results.
 * Skip rules match backtest-differentiation (evaluated on #1-rated horse).
 */
export async function runMcAccuracyBacktest(
  opts: DifferentiationBacktestOptions
): Promise<McAccuracyRaceRow[]> {
  const {
    sparseMax,
    closeMax,
    avgDiffMin,
    gapMin,
    oddsMax,
    ratingChangeMin = null,
    months,
    venue,
    surface,
    ignoreClasses,
    ignoreDistances,
    form,
  } = opts;
  const ignoreAfterYmd = parseIgnoreAfterDate(opts.ignoreAfter ?? null);
  const raceCardDir = opts.raceCardDir ?? path.join(process.cwd(), "data", "racecards");

  const formAnalyzer = new FormAnalyzer();
  const files = await readdir(raceCardDir);
  const venueSegment = venue ?? "ST|HV";
  const monthPattern =
    months.length === 0
      ? new RegExp(`racecard_\\d{8}_(${venueSegment})_R\\d+\\.json`)
      : new RegExp(`racecard_2026(${months.join("|")})\\d{2}_(${venueSegment})_R\\d+\\.json`);
  const matchedFiles = files.filter((f) => monthPattern.test(f)).sort();

  const resultsCache = new Map<string, MeetingResults>();
  const allRows: McAccuracyRaceRow[] = [];

  for (const file of matchedFiles) {
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;
    if (ignoreAfterYmd && parsed.date >= ignoreAfterYmd) continue;

    const filePath = path.join(raceCardDir, file);
    const loaded = await loadRaceCard(filePath);
    if (!loaded) continue;

    const { race: rawRace, winOddsMap } = loaded;
    const race = applyFormSourceFilter(rawRace, form);
    if (race.entries.length < 4) continue;
    if (surface && race.surface !== surface) continue;
    if (ignoreClasses.length > 0 && ignoreClasses.includes((race.class ?? "").toUpperCase())) continue;
    if (ignoreDistances.length > 0 && ignoreDistances.includes(race.distance)) continue;

    const cacheKey = `${parsed.date}_${parsed.venue}`;
    if (!resultsCache.has(cacheKey)) {
      resultsCache.set(cacheKey, await loadMeetingResults(parsed.date, parsed.venue));
    }
    const meeting = resultsCache.get(cacheKey)!;
    const finishOrder = meeting.finishOrders.get(parsed.raceNumber);
    if (!finishOrder || finishOrder.length === 0) continue;

    const analyses = formAnalyzer.analyzeRace(race);
    if (analyses.length === 0) continue;

    const topRating = analyses[0].overallRating;
    const diffs = analyses.map((a) => Math.abs(topRating - a.overallRating));
    const avgDiff = Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length);
    const horsesWithDiffLt8 = diffs.filter((d) => d < 8).length;
    const sparseFormCount = race.entries.filter(isSparseFormEntry).length;
    const topGap =
      analyses.length >= 2 ? Math.abs(analyses[0].overallRating - analyses[1].overallRating) : 999;

    const topRatedEntry = race.entries.find((e) => e.horse.code === analyses[0].horseCode);
    const topRatedHorseNum = topRatedEntry?.horseNumber ?? 0;
    const topRatedFinish = finishOrder.find((f) => f.horseNumber === topRatedHorseNum);
    const topRatedWinOdds = topRatedFinish?.winOdds ?? winOddsMap.get(topRatedHorseNum) ?? 0;
    const topRatedRatingChange = topRatedEntry?.horse.ratingChange;

    const { skipped, skipReason } = computeSkipDecision(
      sparseFormCount,
      horsesWithDiffLt8,
      avgDiff,
      topGap,
      { sparseMax, closeMax, avgDiffMin, gapMin, oddsMax, ratingChangeMin },
      topRatedWinOdds,
      topRatedRatingChange
    );

    const hvStdDev = parsed.venue === "Happy Valley" ? 11 : 8;
    const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
    const { results: simResults } = simulator.simulateRace(race);

    const mcRankByCode = new Map<string, number>();
    simResults.forEach((s, i) => mcRankByCode.set(s.horseCode, i + 1));
    const simByCode = new Map(simResults.map((s) => [s.horseCode, s]));

    const top3Codes = finishOrder.slice(0, 3).map((f) => f.horseCode);
    const resultPlaceOdds = meeting.placeDividendMap.get(parsed.raceNumber);

    const picks: McAccuracyPick[] = analyses.map((a, i) => {
      const entry = race.entries.find((e) => e.horse.code === a.horseCode);
      const horseNumber = entry?.horseNumber ?? 0;
      const sim = simByCode.get(a.horseCode);
      const finishEntry = finishOrder.find((f) => f.horseNumber === horseNumber);
      const winOdds = finishEntry?.winOdds ?? winOddsMap.get(horseNumber) ?? 0;
      const placeOdds = resultPlaceOdds?.get(horseNumber) ?? 0;
      return {
        ratingRank: i + 1,
        mcRank: mcRankByCode.get(a.horseCode) ?? analyses.length,
        horseCode: a.horseCode,
        horseName: a.horseName,
        horseNumber,
        overallRating: a.overallRating,
        mcWinPct: sim?.winProbability ?? 0,
        mcPlacePct: sim?.placeProbability ?? 0,
        winOdds,
        placeOdds,
        placed: top3Codes.includes(a.horseCode),
      };
    });

    allRows.push({
      raceId: `${parsed.date}_${parsed.venue === "Happy Valley" ? "HV" : "ST"}_R${parsed.raceNumber}`,
      date: parsed.date,
      venue: parsed.venue === "Happy Valley" ? "HV" : "ST",
      raceNumber: parsed.raceNumber,
      skipped,
      skipReason,
      numRunners: race.entries.filter((e) => !e.isScratched).length,
      picks,
    });
  }

  return allRows;
}

function raceClassSortKey(raceClass: string): number {
  const g = raceClass.match(/^Group (\d+)$/);
  if (g) return parseInt(g[1], 10);
  const c = raceClass.match(/^Class (\d+)$/);
  if (c) return 10 + parseInt(c[1], 10);
  if (raceClass === "Griffin") return 90;
  if (raceClass === "Handicap") return 85;
  if (raceClass === "4 Year Olds") return 16;
  return 50;
}

/** Group key: venue + class + distance (sorted HV/ST → class → distance). */
export function groupByClassDistanceVenue(
  rows: DifferentiationBacktestRow[]
): Map<string, DifferentiationBacktestRow[]> {
  const map = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of rows) {
    const key = `${r.venue}  ${r.raceClass}  ${r.distance}m`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }

  const sorted = [...map.entries()].sort((a, b) => {
    const [venueA, classA, distA] = parseClassDistanceVenueKey(a[0]);
    const [venueB, classB, distB] = parseClassDistanceVenueKey(b[0]);
    if (venueA !== venueB) return venueA.localeCompare(venueB);
    const classCmp = raceClassSortKey(classA) - raceClassSortKey(classB);
    if (classCmp !== 0) return classCmp;
    const nameCmp = classA.localeCompare(classB, undefined, { numeric: true });
    if (nameCmp !== 0) return nameCmp;
    return distA - distB;
  });

  return new Map(sorted);
}

function parseClassDistanceVenueKey(key: string): [string, string, number] {
  const m = key.match(/^(HV|ST)\s{2}(.+?)\s{2}(\d+)m$/);
  if (m) return [m[1], m[2], parseInt(m[3], 10)];
  return [key, "", 0];
}

const PLACE_BET_UNIT = 10;

function placeBetReturn(betted: DifferentiationBacktestRow[]): number {
  return betted
    .filter((r) => r.topRatedPlaced)
    .reduce(
      (sum, r) =>
        sum + (r.topRatedPlaceOdds > 0 ? r.topRatedPlaceOdds * PLACE_BET_UNIT : PLACE_BET_UNIT),
      0
    );
}

function placeBetRoiPct(betted: DifferentiationBacktestRow[]): string {
  if (betted.length === 0) return "N/A";
  const cost = betted.length * PLACE_BET_UNIT;
  const placeReturn = placeBetReturn(betted);
  return (((placeReturn - cost) / cost) * 100).toFixed(1) + "%";
}

export function printBreakdown(
  label: string,
  groups: Map<string, DifferentiationBacktestRow[]>,
  options?: { groupWidth?: number; preserveOrder?: boolean }
) {
  const groupWidth = options?.groupWidth ?? 12;
  const width = groupWidth + 48;
  console.log("\n" + "═".repeat(width));
  console.log(`HIT RATE BY ${label}`);
  console.log("═".repeat(width));
  console.log(
    `${"Group".padEnd(groupWidth)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"ROI(Pla)".padStart(10)}`
  );
  console.log("─".repeat(width));
  let gTotalRaces = 0;
  let gTotalBet = 0;
  let gTotalHit = 0;
  let gTotalPlaReturn = 0;
  const entries = options?.preserveOrder
    ? [...groups.entries()]
    : [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [key, races] of entries) {
    const stats = bucketStats(races);
    console.log(
      `${key.padEnd(groupWidth)} ${stats.total.toString().padStart(5)} ${stats.bet.toString().padStart(4)} ${stats.hits.toString().padStart(4)} ${stats.miss.toString().padStart(4)} ${stats.skip.toString().padStart(4)} ${stats.ratePct.padStart(8)} ${stats.roiPlaPct.padStart(10)}`
    );
    gTotalRaces += stats.total;
    gTotalBet += stats.bet;
    gTotalHit += stats.hits;
    gTotalPlaReturn += placeBetReturn(races.filter((r) => !r.skipped));
  }
  console.log("─".repeat(width));
  const totalRate = gTotalBet > 0 ? ((gTotalHit / gTotalBet) * 100).toFixed(1) + "%" : "0.0%";
  const totalCost = gTotalBet * PLACE_BET_UNIT;
  const totalRoi =
    gTotalBet > 0
      ? (((gTotalPlaReturn - totalCost) / totalCost) * 100).toFixed(1) + "%"
      : "0.0%";
  console.log(
    `${"TOTAL".padEnd(groupWidth)} ${gTotalRaces.toString().padStart(5)} ${gTotalBet.toString().padStart(4)} ${gTotalHit.toString().padStart(4)} ${(gTotalBet - gTotalHit).toString().padStart(4)} ${(gTotalRaces - gTotalBet).toString().padStart(4)} ${totalRate.padStart(8)} ${totalRoi.padStart(10)}`
  );
}

function bucketStats(races: DifferentiationBacktestRow[]) {
  const betted = races.filter((r) => !r.skipped);
  const hits = betted.filter((r) => r.topRatedPlaced).length;
  return {
    total: races.length,
    bet: betted.length,
    hits,
    miss: betted.length - hits,
    skip: races.length - betted.length,
    ratePct:
      betted.length > 0 ? ((hits / betted.length) * 100).toFixed(1) + "%" : "N/A",
    roiPlaPct: placeBetRoiPct(betted),
  };
}

function printBreakdownRow(
  label: string,
  stats: ReturnType<typeof bucketStats>,
  groupWidth: number
) {
  console.log(
    `${label.padEnd(groupWidth)} ${stats.total.toString().padStart(5)} ${stats.bet.toString().padStart(4)} ${stats.hits.toString().padStart(4)} ${stats.miss.toString().padStart(4)} ${stats.skip.toString().padStart(4)} ${stats.ratePct.padStart(8)} ${stats.roiPlaPct.padStart(10)}`
  );
}

/**
 * Class × distance × venue table grouped by venue and class.
 * Inserts summary header rows for each venue and each venue+class before distance lines.
 */
export function printClassDistanceVenueBreakdown(rows: DifferentiationBacktestRow[]) {
  const groups = groupByClassDistanceVenue(rows);
  const groupWidth = 28;
  const width = groupWidth + 48;

  const byVenue = new Map<string, DifferentiationBacktestRow[]>();
  const byVenueClass = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of rows) {
    if (!byVenue.has(r.venue)) byVenue.set(r.venue, []);
    byVenue.get(r.venue)!.push(r);
    const vc = `${r.venue}\t${r.raceClass}`;
    if (!byVenueClass.has(vc)) byVenueClass.set(vc, []);
    byVenueClass.get(vc)!.push(r);
  }

  console.log("\n" + "═".repeat(width));
  console.log("HIT RATE BY CLASS × DISTANCE × VENUE");
  console.log("═".repeat(width));
  console.log(
    `${"Group".padEnd(groupWidth)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"ROI(Pla)".padStart(10)}`
  );
  console.log("─".repeat(width));

  const printedVenue = new Set<string>();
  const printedVenueClass = new Set<string>();
  let gTotal = 0;
  let gBet = 0;
  let gHit = 0;
  let gPlaReturn = 0;

  for (const [key, distanceRaces] of groups) {
    const [venue, raceClass, distance] = parseClassDistanceVenueKey(key);
    const vcKey = `${venue}\t${raceClass}`;

    if (!printedVenue.has(venue)) {
      if (printedVenue.size > 0) console.log("─".repeat(width));
      printedVenue.add(venue);
      const venueRows = byVenue.get(venue) ?? [];
      const venueLabel =
        venue === "HV" ? "▶ HV  (Happy Valley)" : "▶ ST  (Sha Tin)";
      printBreakdownRow(venueLabel, bucketStats(venueRows), groupWidth);
    }

    if (!printedVenueClass.has(vcKey)) {
      printedVenueClass.add(vcKey);
      const classRows = byVenueClass.get(vcKey) ?? [];
      printBreakdownRow(`  ▶ ${venue}  ${raceClass}`, bucketStats(classRows), groupWidth);
    }

    printBreakdownRow(`      ${distance}m`, bucketStats(distanceRaces), groupWidth);

    gTotal += distanceRaces.length;
    const distStats = bucketStats(distanceRaces);
    gBet += distStats.bet;
    gHit += distStats.hits;
    gPlaReturn += placeBetReturn(distanceRaces.filter((r) => !r.skipped));
  }

  console.log("─".repeat(width));
  const totalRate = gBet > 0 ? ((gHit / gBet) * 100).toFixed(1) + "%" : "0.0%";
  const totalCost = gBet * PLACE_BET_UNIT;
  const totalRoi =
    gBet > 0 ? (((gPlaReturn - totalCost) / totalCost) * 100).toFixed(1) + "%" : "0.0%";
  console.log(
    `${"TOTAL".padEnd(groupWidth)} ${gTotal.toString().padStart(5)} ${gBet.toString().padStart(4)} ${gHit.toString().padStart(4)} ${(gBet - gHit).toString().padStart(4)} ${(gTotal - gBet).toString().padStart(4)} ${totalRate.padStart(8)} ${totalRoi.padStart(10)}`
  );
}
