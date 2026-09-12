/**
 * Batch meeting analysis (tools/batch-analyze.ts): for each race, form analysis, Monte Carlo
 * (5,000 runs), differentiation metrics, and historical place hit rates that use the race's
 * own metrics as backtest thresholds. Shared by the CLI and the API (POST /v1/batch-analyses).
 *
 * Each race is reported through `onRace` as soon as it finishes, so the CLI can print as it goes.
 */

import { format } from "date-fns";
import type { Race, Venue } from "../types/index.js";
import { RaceCardScraper } from "../scrapers/raceCard.js";
import { RaceCardHistoryScraper } from "../scrapers/raceCardHistory.js";
import { FormAnalyzer } from "../analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../simulation/monteCarlo.js";
import { HorseDataEnricher } from "../data/horseEnricher.js";
import { JockeyEnricher } from "../data/jockeyEnricher.js";
import { TrainerEnricher } from "../data/trainerEnricher.js";
import {
  computeSkipDecision,
  runDifferentiationBacktest,
  summarizeHitRateWithThresholds,
  venueToCode,
  type DifferentiationBacktestOptions,
  type DifferentiationBacktestRow,
  type FormSource,
  type HitRateSummary,
} from "../backtest/differentiationBacktest.js";
import { silentLogger, type AnalysisLogger } from "./raceAnalysis.js";

// ============================================================================
// TYPES
// ============================================================================

export interface BatchAnalysisOptions {
  date: Date;
  venue: Venue;
  /** Race numbers to analyze, in order */
  races: number[];
  /** "all" = HV + ST form; omitted = `venue` only */
  formData?: "all";
  /** Load saved race card snapshots instead of live scraping */
  useSaved?: boolean;
  /** Restrict the historical hit-rate pool to these months ("MM"); empty = all */
  backtestMonths: string[];
}

export interface BatchHorse {
  number: number;
  name: string;
  /** Percent (0–100) */
  winProb: number;
  placeProb: number;
  formCount: number;
  rating: number;
  /** |top rating − this horse's rating| (999 when the horse has no analysis) */
  diff: number;
  /** 0 when unavailable */
  winOdds: number;
  expectedPosition: number;
}

export interface BatchRaceResult {
  raceNumber: number;
  raceClass: string;
  /** Class used for the "same class" hit rate */
  histClass: string;
  /** e.g. "1200m" ("?m" when unknown) */
  distance: string;
  distanceM: number;
  surface: string;
  /** Runners not scratched */
  fieldSize: number;
  topHorseName: string;
  topHorseNumber: number;
  rating: number;
  avgDiff: number;
  /** Horses within 8 rating points of the top-rated horse */
  close8: number;
  /** Runners with at most one past run */
  sparse: number;
  /** |#1 rating − #2 rating| (999 with a single runner) */
  topGap: number;
  /** Differentiation skip rules at this race's own thresholds (not the betting signal) */
  diffBet: "BET" | "SKIP";
  /** Worst of the three hist hit-rate buckets: 🔴 <60%, 🟡 60–69.9%, 🟢 ≥70%, "—" when none */
  bettingSignal: string;
  /** Hit rates as printed by the CLI: "34/73 (46.6%)", "0/0 (no past BET)" or "—" */
  histOverall: string;
  histSameClass: string;
  histSameDist: string;
  /** Same hit rates as numbers; null when the historical pool is empty */
  hist: {
    overall: HitRateSummary | null;
    sameClass: HitRateSummary | null;
    sameDist: HitRateSummary | null;
  };
  /** Top-rated horse's MC percentages */
  winProb: number;
  placeProb: number;
  confidence: string;
  /** Every runner, in MC win-probability order */
  horses: BatchHorse[];
}

export type BatchRaceOutcome =
  | { status: "ok"; race: BatchRaceResult }
  | { status: "no_data"; raceNumber: number }
  | { status: "no_analysis"; raceNumber: number }
  | { status: "scrape_failed"; raceNumber: number; error: string };

export interface BatchAnalysisResult {
  /** YYYY-MM-DD */
  date: string;
  venue: Venue;
  venueCode: "HV" | "ST";
  formSource: FormSource;
  /** Historical pool excludes races on or after this day (the meeting date) */
  ignoreAfter: string;
  backtestMonths: string[];
  /** Races in the historical hit-rate pool; null if loading it failed */
  historicalRaces: number | null;
  races: BatchRaceResult[];
  /** Requested races that produced no result */
  unavailable: { raceNumber: number; reason: "no_data" | "no_analysis" | "scrape_failed"; error?: string }[];
}

// ============================================================================
// HELPERS
// ============================================================================

/** Venue code, form scope and leak-free cutoff for a batch run. */
export function batchContext(opts: BatchAnalysisOptions): {
  venueCode: "HV" | "ST";
  formSource: FormSource;
  ignoreAfter: string;
} {
  return {
    venueCode: venueToCode(opts.venue),
    formSource: opts.formData === "all" ? "all" : opts.venue === "Happy Valley" ? "HV" : "ST",
    ignoreAfter: format(opts.date, "yyyy-MM-dd"),
  };
}

type HistThresholds = Pick<
  DifferentiationBacktestOptions,
  "sparseMax" | "closeMax" | "avgDiffMin" | "gapMin" | "ratingChangeMin"
>;

function histHitRates(
  rows: DifferentiationBacktestRow[],
  vCode: "HV" | "ST",
  surface: string,
  raceClass: string,
  distanceM: number,
  thresholds: HistThresholds
): BatchRaceResult["hist"] {
  if (rows.length === 0) {
    return { overall: null, sameClass: null, sameDist: null };
  }
  const matchVenueSurface = (r: DifferentiationBacktestRow) => r.venue === vCode && r.surface === surface;
  return {
    overall: summarizeHitRateWithThresholds(rows, matchVenueSurface, thresholds),
    sameClass: summarizeHitRateWithThresholds(
      rows,
      (r) => matchVenueSurface(r) && r.raceClass === raceClass,
      thresholds
    ),
    sameDist: summarizeHitRateWithThresholds(
      rows,
      (r) => matchVenueSurface(r) && r.distance === distanceM,
      thresholds
    ),
  };
}

/** "34/73 (46.6%)", "0/0 (no past BET)", or "—" for an empty bucket */
export function formatHitRate(summary: HitRateSummary | null): string {
  if (!summary || summary.eligible === 0) return "—";
  return summary.bets === 0 ? "0/0 (no past BET)" : `${summary.hits}/${summary.bets} (${summary.ratePct})`;
}

/** Parse "34/73 (46.6%)" → 46.6; no rate → null */
export function parseHistPercent(histStr: string): number | null {
  const m = histStr.match(/\((\d+\.?\d*)%\)\s*$/);
  if (!m?.[1]) return null;
  const v = parseFloat(m[1]);
  return Number.isFinite(v) ? v : null;
}

/** 🔴 <60%, 🟡 [60,70), 🟢 ≥70%; null/NaN → ⚪ */
export function emojiForHistPct(pct: number | null): string {
  if (pct === null || Number.isNaN(pct)) return "⚪";
  if (pct < 60) return "🔴";
  if (pct < 70) return "🟡";
  return "🟢";
}

/** Worst valid bucket drives the race-level betting emoji */
export function combinedBettingSignal(overall: string, cls: string, dist: string): string {
  const nums = [parseHistPercent(overall), parseHistPercent(cls), parseHistPercent(dist)].filter(
    (x): x is number => x !== null
  );
  if (nums.length === 0) return "—";
  const min = Math.min(...nums);
  if (min < 60) return "🔴";
  if (min < 70) return "🟡";
  return "🟢";
}

// ============================================================================
// PIPELINE
// ============================================================================

export async function runBatchAnalysis(
  opts: BatchAnalysisOptions,
  hooks: { log?: AnalysisLogger; onRace?: (outcome: BatchRaceOutcome) => void } = {}
): Promise<BatchAnalysisResult> {
  const log = hooks.log ?? silentLogger;
  const { date, venue, formData, useSaved, backtestMonths } = opts;
  const { venueCode: vCode, formSource, ignoreAfter } = batchContext(opts);
  const formAnalyzer = new FormAnalyzer();
  const historyScraper = new RaceCardHistoryScraper();
  const hvStdDev = venue === "Happy Valley" ? 11 : 8;

  // Preload never skips, so rows carry raw metrics for per-race thresholds
  let diffRows: DifferentiationBacktestRow[] = [];
  let historicalRaces: number | null = null;
  try {
    diffRows = await runDifferentiationBacktest({
      sparseMax: 999,
      closeMax: 99,
      avgDiffMin: 0,
      gapMin: 0,
      oddsMax: 0,
      months: backtestMonths,
      venue: vCode,
      surface: null,
      ignoreClasses: [],
      ignoreDistances: [],
      form: formSource,
      ignoreAfter,
    });
    historicalRaces = diffRows.length;
    log.info(`Loaded ${diffRows.length} historical races with results for contextual hit rates.\n`);
  } catch (err) {
    log.warn(`  Differentiation backtest preload failed: ${err instanceof Error ? err.message : err}`);
  }

  const races: BatchRaceResult[] = [];
  const unavailable: BatchAnalysisResult["unavailable"] = [];
  const emit = (outcome: BatchRaceOutcome) => {
    if (outcome.status === "ok") races.push(outcome.race);
    else if (outcome.status === "scrape_failed")
      unavailable.push({ raceNumber: outcome.raceNumber, reason: outcome.status, error: outcome.error });
    else unavailable.push({ raceNumber: outcome.raceNumber, reason: outcome.status });
    hooks.onRace?.(outcome);
  };

  let scraper: RaceCardScraper | null = null;
  let enricher: HorseDataEnricher | null = null;
  let jockeyEnricher: JockeyEnricher | null = null;
  let trainerEnricher: TrainerEnricher | null = null;

  try {
    if (!useSaved) {
      log.info("Loading historical data...");
      enricher = new HorseDataEnricher();
      await enricher.loadHistoricalData();

      scraper = new RaceCardScraper({ headless: true });
      await scraper.init();

      jockeyEnricher = new JockeyEnricher({ fetchFromHKJC: true });
      await jockeyEnricher.loadFromDirectory();

      trainerEnricher = new TrainerEnricher({ fetchFromHKJC: true });
      await trainerEnricher.loadFromDirectory();
    }

    for (const raceNum of opts.races) {
      let race: Race | null = null;
      let winOddsMap = new Map<number, number>();

      if (useSaved) {
        const saved = await historyScraper.loadSavedRaceCard(date, venue, raceNum);
        if (saved) {
          race = saved.race;
          winOddsMap = saved.winOddsMap;
        }
      } else if (scraper && enricher && jockeyEnricher && trainerEnricher) {
        try {
          const scraped = await scraper.scrapeRaceCard(date, venue, raceNum);
          if (scraped.entries.length > 0) {
            race = enricher.enrichRace(scraped, { formVenue: formData === "all" ? "all" : venue });
            race = await jockeyEnricher.enrichRace(race);
            race = await trainerEnricher.enrichRace(race);
            winOddsMap = await scraper.fetchCurrentOdds(date, venue, raceNum);
            await historyScraper.saveRaceCard(race, winOddsMap);
          }
        } catch (err) {
          emit({ status: "scrape_failed", raceNumber: raceNum, error: err instanceof Error ? err.message : String(err) });
          continue;
        }
      }

      if (!race || race.entries.length < 4) {
        emit({ status: "no_data", raceNumber: raceNum });
        continue;
      }
      const card: Race = race;

      const analyses = formAnalyzer.analyzeRace(card);
      const top = analyses[0];
      if (!top) {
        emit({ status: "no_analysis", raceNumber: raceNum });
        continue;
      }

      const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
      const { results: simResults } = simulator.simulateRace(card);

      const topRating = top.overallRating;
      const diffs = analyses.map((a) => Math.abs(topRating - a.overallRating));
      const avgDiff = Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length);
      const close8 = diffs.filter((d) => d < 8).length;

      const topEntry = card.entries.find((e) => e.horse.code === top.horseCode);
      const topSim = simResults.find((s) => s.horseCode === top.horseCode);

      const sparseFormCount = card.entries.filter(
        (e) => !e.isScratched && (e.horse.pastPerformances?.length ?? 0) <= 1
      ).length;

      const second = analyses[1];
      const topGap = second ? Math.abs(topRating - second.overallRating) : 999;
      const thresholds: HistThresholds = {
        sparseMax: sparseFormCount,
        closeMax: close8,
        avgDiffMin: avgDiff,
        gapMin: topGap,
        ratingChangeMin: null,
      };
      const { skipped: diffSkipped } = computeSkipDecision(
        sparseFormCount,
        close8,
        avgDiff,
        topGap,
        thresholds,
        topEntry ? winOddsMap.get(topEntry.horseNumber) : undefined,
        topEntry?.horse.ratingChange
      );

      const surface = card.surface ?? "Turf";
      const histClass = String(card.class);
      const distanceM = card.distance ?? 0;
      const hist = histHitRates(diffRows, vCode, surface, histClass, distanceM, thresholds);
      const histOverall = formatHitRate(hist.overall);
      const histSameClass = formatHitRate(hist.sameClass);
      const histSameDist = formatHitRate(hist.sameDist);

      let confidence = "LOW";
      if (sparseFormCount > 3) confidence = "LOW (sparse form)";
      else if (avgDiff >= 20 && close8 <= 2) confidence = "SUPPER HIGH (avgDiff and close8)";
      else if (avgDiff >= 20) confidence = "HIGH (avgDiff)";
      else if (close8 <= 2) confidence = "HIGH (close8)";
      else if (topRating >= 70 && topRating <= 79) confidence = "MED-HIGH (topRating)";
      else if (avgDiff >= 16 && close8 <= 3) confidence = "MED-HIGH (avgDiff and close8)";
      else if (close8 <= 3) confidence = "MEDIUM (close8)";

      const horses: BatchHorse[] = simResults.map((sim) => {
        const entry = card.entries.find((e) => e.horse.code === sim.horseCode);
        const analysis = analyses.find((a) => a.horseCode === sim.horseCode);
        return {
          number: sim.horseNumber,
          name: sim.horseName,
          winProb: sim.winProbability * 100,
          placeProb: sim.placeProbability * 100,
          formCount: entry?.horse.pastPerformances?.length ?? 0,
          rating: analysis?.overallRating ?? 0,
          diff: analysis ? Math.abs(topRating - analysis.overallRating) : 999,
          winOdds: winOddsMap.get(sim.horseNumber) ?? 0,
          expectedPosition: sim.expectedPosition,
        };
      });

      emit({
        status: "ok",
        race: {
          raceNumber: raceNum,
          raceClass: (card as Race & { raceClass?: string }).raceClass ?? String(card.class),
          histClass,
          distance: card.distance ? `${card.distance}m` : "?m",
          distanceM,
          surface,
          fieldSize: card.entries.filter((e) => !e.isScratched).length,
          topHorseName: top.horseName,
          topHorseNumber: topEntry?.horseNumber ?? 0,
          rating: topRating,
          avgDiff,
          close8,
          sparse: sparseFormCount,
          topGap,
          diffBet: diffSkipped ? "SKIP" : "BET",
          bettingSignal: combinedBettingSignal(histOverall, histSameClass, histSameDist),
          histOverall,
          histSameClass,
          histSameDist,
          hist,
          winProb: topSim ? topSim.winProbability * 100 : 0,
          placeProb: topSim ? topSim.placeProbability * 100 : 0,
          confidence,
          horses,
        },
      });
    }
  } finally {
    if (jockeyEnricher) await jockeyEnricher.closeBrowser();
    if (trainerEnricher) await trainerEnricher.closeBrowser();
    if (scraper) await scraper.close();
  }

  return {
    date: ignoreAfter,
    venue,
    venueCode: vCode,
    formSource,
    ignoreAfter,
    backtestMonths,
    historicalRaces,
    races,
    unavailable,
  };
}
