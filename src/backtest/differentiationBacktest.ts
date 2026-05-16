/**
 * Shared differentiation backtest (same rules as tools/backtest-differentiation.ts).
 * Used by the CLI tool and batch-analyze for contextual hit rates.
 */

import { readFile, readdir } from "fs/promises";
import path from "path";
import type { Race, RaceEntry, Venue } from "../types/index.js";
import { FormAnalyzer } from "../analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../simulation/monteCarlo.js";

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
  topSimWon: boolean;
  topSimPlaced: boolean;
  numRunners: number;
  /** MC Place% of the top-rated horse (0–1 scale) */
  topRatedMcPlacePct: number;
  /** Win odds of the top-rated horse at race time (0 if unavailable) */
  topRatedWinOdds: number;
  /** Place odds of the top-rated horse at race time (0 if unavailable) */
  topRatedPlaceOdds: number;
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
  opts: Pick<DifferentiationBacktestOptions, "sparseMax" | "closeMax" | "avgDiffMin" | "gapMin"> & { oddsMax?: number },
  topRatedWinOdds?: number
): { skipped: boolean; skipReason: string } {
  if (sparseFormCount > opts.sparseMax) {
    return { skipped: true, skipReason: `${sparseFormCount} horses w/ 0-1 form` };
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
  opts: Pick<DifferentiationBacktestOptions, "sparseMax" | "closeMax" | "avgDiffMin" | "gapMin"> & { oddsMax?: number }
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
      r.topRatedWinOdds
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

    const sparseFormCount = race.entries.filter(
      (e) => !e.isScratched && (e.horse.pastPerformances?.length ?? 0) <= 1
    ).length;

    const topGap =
      analyses.length >= 2 ? Math.abs(analyses[0].overallRating - analyses[1].overallRating) : 999;

    const topRatedAnalysis = analyses[0];
    const topRatedEntry = race.entries.find((e) => e.horse.code === topRatedAnalysis.horseCode);
    const topRatedHorseNum = topRatedEntry?.horseNumber ?? 0;
    const topRatedFinish = finishOrder.find((f) => f.horseNumber === topRatedHorseNum);
    const topRatedWinOdds = topRatedFinish?.winOdds ?? winOddsMap.get(topRatedHorseNum) ?? 0;
    const resultPlaceOdds = meeting.placeDividendMap.get(parsed.raceNumber);
    const topRatedPlaceOdds = resultPlaceOdds?.get(topRatedHorseNum) ?? 0;

    const { skipped, skipReason } = computeSkipDecision(
      sparseFormCount,
      horsesWithDiffLt8,
      avgDiff,
      topGap,
      { sparseMax, closeMax, avgDiffMin, gapMin, oddsMax },
      topRatedWinOdds
    );

    const hvStdDev = parsed.venue === "Happy Valley" ? 11 : 8;
    const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
    const { results: simResults } = simulator.simulateRace(race);
    const topSimResult = simResults[0];

    const topRatedMcResult = simResults.find((s) => s.horseCode === topRatedAnalysis.horseCode);
    const topRatedMcPlacePct = topRatedMcResult?.placeProbability ?? 0;

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
      topSimWon: topSimResult.horseCode === winnerCode,
      topSimPlaced: top3Codes.includes(topSimResult.horseCode),
      numRunners: race.entries.filter((e) => !e.isScratched).length,
      topRatedMcPlacePct,
      topRatedWinOdds,
      topRatedPlaceOdds,
    });
  }

  return allResults;
}

export function printBreakdown(label: string, groups: Map<string, DifferentiationBacktestRow[]>) {
  console.log("\n" + "═".repeat(60));
  console.log(`HIT RATE BY ${label}`);
  console.log("═".repeat(60));
  console.log(
    `${"Group".padEnd(12)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)}`
  );
  console.log("─".repeat(60));
  let gTotalRaces = 0;
  let gTotalBet = 0;
  let gTotalHit = 0;
  for (const [key, races] of [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const gb = races.filter((r) => !r.skipped);
    const gh = gb.filter((r) => r.topRatedPlaced).length;
    const rate = gb.length > 0 ? ((gh / gb.length) * 100).toFixed(1) + "%" : "N/A";
    console.log(
      `${key.padEnd(12)} ${races.length.toString().padStart(5)} ${gb.length.toString().padStart(4)} ${gh.toString().padStart(4)} ${(gb.length - gh).toString().padStart(4)} ${(races.length - gb.length).toString().padStart(4)} ${rate.padStart(8)}`
    );
    gTotalRaces += races.length;
    gTotalBet += gb.length;
    gTotalHit += gh;
  }
  console.log("─".repeat(60));
  const totalRate = gTotalBet > 0 ? ((gTotalHit / gTotalBet) * 100).toFixed(1) + "%" : "0.0%";
  console.log(
    `${"TOTAL".padEnd(12)} ${gTotalRaces.toString().padStart(5)} ${gTotalBet.toString().padStart(4)} ${gTotalHit.toString().padStart(4)} ${(gTotalBet - gTotalHit).toString().padStart(4)} ${(gTotalRaces - gTotalBet).toString().padStart(4)} ${totalRate.padStart(8)}`
  );
}
