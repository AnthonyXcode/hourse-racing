/**
 * Race analysis pipeline — load the race card (live scrape or saved snapshot),
 * enrich it, run form analysis + Monte Carlo, and build recommendations.
 *
 * Shared by the CLI (tools/analyze-race.ts) and the API server. Returns
 * structured data; printing is the caller's job. Progress goes to `log`.
 */

import { format } from "date-fns";
import type {
  Going,
  HorseAnalysis,
  Race,
  RaceRecommendation,
  SimulationResult,
  Venue,
} from "../types/index.js";
import { DEFAULT_BETTING_CONFIG } from "../types/index.js";
import { RaceCardScraper } from "../scrapers/raceCard.js";
import { RaceCardHistoryScraper } from "../scrapers/raceCardHistory.js";
import { FormAnalyzer } from "../analysis/formAnalysis.js";
import { SpeedRatingCalculator, FIELD_TIME_SHRINK, getTimeOffset } from "../analysis/speedRating.js";
import { MonteCarloSimulator } from "../simulation/monteCarlo.js";
import { RecommendationEngine } from "../betting/recommendations.js";
import { ValueCalculator, type MarketOdds } from "../betting/valueCalculator.js";
import { HorseDataEnricher } from "../data/horseEnricher.js";
import { JockeyEnricher } from "../data/jockeyEnricher.js";
import { TrainerEnricher } from "../data/trainerEnricher.js";

// ============================================================================
// TYPES
// ============================================================================

export interface RaceAnalysisOptions {
  date: Date;
  /** Venue for fetching race card. */
  venue: Venue;
  raceNumber: number;
  /** Form data: "all" = HV + ST; if omitted, form uses `venue` only. */
  formData?: "all";
  /** Ignore historical files whose name contains any of these strings (e.g. 20260315,HV). */
  ignoreRecords?: string[];
  /** When true, load from saved race card snapshot instead of live scraping. */
  useSaved?: boolean;
  bankroll?: number;
  kellyFraction?: number;
  minEdge?: number;
}

export interface AnalysisLogger {
  info(message: string): void;
  warn(message: string): void;
}

export const consoleLogger: AnalysisLogger = {
  info: (message) => console.log(message),
  warn: (message) => console.warn(message),
};

export const silentLogger: AnalysisLogger = { info: () => {}, warn: () => {} };

/** No race card for the requested race (no saved snapshot, or no live entries). */
export class RaceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RaceNotFoundError";
  }
}

export interface RankingRow {
  readonly simulation: SimulationResult;
  readonly analysis: HorseAnalysis | undefined;
  /** |top overallRating − this horse's overallRating| (0 when the horse has no analysis) */
  readonly ratingDiff: number;
}

export interface FinishTimeRow {
  readonly horseNumber: number;
  readonly horseName: string;
  /** Seconds */
  readonly mean: number;
  readonly p10: number;
  readonly p90: number;
  readonly marginSeconds: number;
  readonly marginLengths: number;
}

export type FinishTimeProjection =
  | {
      readonly status: "ok";
      readonly distance: number;
      readonly going: Going;
      /** Finish-time SD in seconds (= speedStd · secondsPerPoint) */
      readonly sdSeconds: number;
      /** Speed-figure SD in points */
      readonly speedStd: number;
      /** Sorted fastest first */
      readonly rows: readonly FinishTimeRow[];
      /** Runners with no past runs — excluded from the projection */
      readonly debuts: readonly { readonly horseNumber: number; readonly horseName: string }[];
    }
  | { readonly status: "skipped"; readonly reason: string }
  | { readonly status: "empty" };

export interface ExoticOutcome {
  readonly combination: string;
  readonly probability: number;
  readonly fairOdds: number;
}

export interface TopExotics {
  readonly quinella: readonly ExoticOutcome[];
  readonly quinellaPlace: readonly ExoticOutcome[];
  readonly trio: readonly ExoticOutcome[];
  readonly tierce: readonly ExoticOutcome[];
}

export type MarketEfficiency = ReturnType<ValueCalculator["analyzeMarketEfficiency"]>;

export interface RaceAnalysisResult {
  readonly race: Race;
  readonly winOdds: Map<number, number>;
  /** Estimated from win odds */
  readonly placeOdds: Map<number, number>;
  readonly config: {
    readonly bankroll: number;
    readonly kellyFraction: number;
    readonly minEdgeThreshold: number;
  };
  readonly analyses: readonly HorseAnalysis[];
  readonly recommendation: RaceRecommendation;
  readonly simulationRuns: number;
  /** One row per simulated horse, in simulation (win probability) order */
  readonly rankings: readonly RankingRow[];
  readonly avgDifferentiation: number;
  /** Horses with ratingDiff < 8 */
  readonly closeDiffCount: number;
  readonly finishTimes: FinishTimeProjection;
  readonly topExotics: TopExotics;
  readonly marketEfficiency: MarketEfficiency;
}

const TOP_EXOTICS = 20;

export function venueCode(venue: Venue): "ST" | "HV" {
  return venue === "Happy Valley" ? "HV" : "ST";
}

// ============================================================================
// RACE CARD LOADING
// ============================================================================

interface LoadedRace {
  race: Race;
  winOddsMap: Map<number, number>;
}

/** Saved snapshot already contains all enrichment + odds — skip scraping & enrichment */
async function loadSavedRace(opts: RaceAnalysisOptions, log: AnalysisLogger): Promise<LoadedRace> {
  const historyScraper = new RaceCardHistoryScraper();
  log.info("Loading saved race card snapshot...");
  const saved = await historyScraper.loadSavedRaceCard(opts.date, opts.venue, opts.raceNumber);
  if (!saved) {
    throw new RaceNotFoundError(
      `No saved race card found for Race ${opts.raceNumber} at ${opts.venue} on ${format(opts.date, "yyyy-MM-dd")}. ` +
      `No file in data/racecards/. Run analyze-race without --use-saved before the meeting to save the race card.`
    );
  }

  const horsesWithHistory = saved.race.entries.filter(
    (e) => e.horse.pastPerformances.length > 0
  ).length;
  log.info(
    `[INFO] Loaded saved race card (${saved.race.entries.length} runners, ${horsesWithHistory} with form data, race-day snapshot)`
  );
  log.info(`[INFO] Win odds loaded for ${saved.winOddsMap.size} horses\n`);
  return saved;
}

/** Scrape the live race card, then fetch current odds while the scraper is still open. */
async function scrapeRaceCardAndOdds(opts: RaceAnalysisOptions, log: AnalysisLogger): Promise<LoadedRace> {
  const scraper = new RaceCardScraper({ headless: true });
  try {
    let race: Race | null = null;
    try {
      log.info("Initializing scraper...");
      await scraper.init();

      log.info("Fetching race card...");
      const scraped = await scraper.scrapeRaceCard(opts.date, opts.venue, opts.raceNumber);
      if (scraped.entries.length > 0) {
        race = scraped;
      }
    } catch (err) {
      log.warn(`[WARNING] Race card scrape failed: ${err instanceof Error ? err.message : err}`);
    }

    if (!race) {
      throw new RaceNotFoundError(
        `No entries found for Race ${opts.raceNumber} at ${opts.venue} on ${format(opts.date, "yyyy-MM-dd")}. ` +
        `Live race card is unavailable. If you have a saved snapshot, re-run with --use-saved.`
      );
    }

    log.info(`Found ${race.entries.length} entries`);

    log.info("Fetching current odds...");
    const winOddsMap = await scraper.fetchCurrentOdds(opts.date, opts.venue, opts.raceNumber);
    return { race, winOddsMap };
  } finally {
    await scraper.close();
  }
}

/** Live scrape + full enrichment pipeline; saves the enriched card for future --use-saved runs. */
async function scrapeAndEnrichRace(opts: RaceAnalysisOptions, log: AnalysisLogger): Promise<LoadedRace> {
  log.info("Loading historical data...");
  const enricher =
    opts.ignoreRecords && opts.ignoreRecords.length > 0
      ? new HorseDataEnricher({ ignoreFilePatterns: opts.ignoreRecords })
      : new HorseDataEnricher();
  await enricher.loadHistoricalData();
  const dataSummary = enricher.getDataSummary();
  if (dataSummary.totalRaces > 0) {
    log.info(`  Found ${dataSummary.totalRaces} historical races`);
    log.info(`  Indexed ${dataSummary.totalHorses} horse performances`);
  }

  const scraped = await scrapeRaceCardAndOdds(opts, log);
  const { winOddsMap } = scraped;

  // Enrich horses with historical data
  log.info("Enriching horses with past performances...");
  let race = enricher.enrichRace(scraped.race, {
    formVenue: opts.formData === "all" ? "all" : opts.venue,
  });

  const horsesWithHistory = race.entries.filter(
    (e) => e.horse.pastPerformances.length > 0
  ).length;
  log.info(`  ${horsesWithHistory}/${race.entries.length} horses enriched with form data\n`);

  // Enrich race with jockey data (from data/jockeys/*.json or HKJC jockeyprofile page)
  const jockeyEnricher = new JockeyEnricher({ fetchFromHKJC: true });
  await jockeyEnricher.loadFromDirectory();
  log.info("Enriching jockeys with season stats...");
  try {
    race = await jockeyEnricher.enrichRace(race);
  } finally {
    await jockeyEnricher.closeBrowser();
  }
  log.info(`  ${jockeyEnricher.getCachedCount()} jockey profiles loaded\n`);

  // Enrich race with trainer data (from HKJC trainerprofile page)
  const trainerEnricher = new TrainerEnricher({ fetchFromHKJC: true });
  await trainerEnricher.loadFromDirectory();
  log.info("Enriching trainers with season stats...");
  try {
    race = await trainerEnricher.enrichRace(race);
  } finally {
    await trainerEnricher.closeBrowser();
  }
  log.info(`  ${trainerEnricher.getCachedCount()} trainer profiles loaded\n`);

  // Save enriched race card + odds for future --use-saved runs
  try {
    const savedPath = await new RaceCardHistoryScraper().saveRaceCard(race, winOddsMap);
    log.info(`[INFO] Enriched race card saved to ${savedPath}`);
  } catch (err) {
    log.warn(`[WARNING] Could not save race card: ${err instanceof Error ? err.message : err}`);
  }

  return { race, winOddsMap };
}

// ============================================================================
// FINISH-TIME PROJECTION
// ============================================================================

const Z90 = 1.2816; // P10/P90 normal quantile
const SEC_PER_LENGTH = 1 / 6; // ≈0.167s per length (HKJC convention)

/**
 * Projected finish times per runner (independent of the ordinal MC).
 * Closed-form: finishTime ~ Normal(mean, sd) where
 *   mean = projectFinishTime(avgSpeedRating), sd = speedStd · secondsPerPoint.
 * P10/P50/P90 from the normal quantiles; margin = lengths behind the fastest mean.
 */
function projectFinishTimes(
  race: Race,
  analysisMap: Map<string, HorseAnalysis>,
  venue: Venue
): FinishTimeProjection {
  const speed = new SpeedRatingCalculator();
  const offset = getTimeOffset(race.venue, race.surface, race.distance, race.class);
  // Speed-figure run-to-run variability (points). HV is tighter/trickier → wider.
  const speedStd = venue === "Happy Valley" ? 6 : 5;
  const sd = speedStd * speed.secondsPerPoint; // seconds

  // Debutants (no past runs) have no speed evidence — their averageSpeedRating
  // falls back to baseRating (100), which is usually above the field and would
  // wrongly project them fastest. Exclude them from the projection and list
  // them separately as "debut".
  const activeAll = race.entries.filter((e) => !e.isScratched && analysisMap.has(e.horse.code));
  const active = activeAll.filter((e) => e.horse.pastPerformances.length > 0);
  const debuts = activeAll.filter((e) => e.horse.pastPerformances.length === 0);

  // Field mean speed figure (formed horses only) → shrink each horse toward it.
  const ratings = active.map((e) => analysisMap.get(e.horse.code)!.averageSpeedRating);
  const fieldMean = ratings.length ? ratings.reduce((s, r) => s + r, 0) / ratings.length : 100;

  const means: { horseNumber: number; horseName: string; mean: number }[] = [];
  for (const entry of active) {
    const a = analysisMap.get(entry.horse.code)!;
    const shrunk = fieldMean + FIELD_TIME_SHRINK * (a.averageSpeedRating - fieldMean);
    const mean = speed.projectFinishTime(
      shrunk,
      race.venue,
      race.surface,
      race.distance,
      race.class,
      race.going,
      entry.weight
    );
    if (mean === null) {
      return {
        status: "skipped",
        reason: `no par time for ${race.venue} ${race.surface} ${race.distance}m ${race.class}`,
      };
    }
    means.push({ horseNumber: entry.horseNumber, horseName: entry.horse.name, mean: mean + offset });
  }
  if (means.length === 0) return { status: "empty" };

  means.sort((a, b) => a.mean - b.mean);
  const fastest = means[0]!.mean;

  return {
    status: "ok",
    distance: race.distance,
    going: race.going,
    sdSeconds: sd,
    speedStd,
    rows: means.map((m) => {
      const marginSeconds = m.mean - fastest;
      return {
        ...m,
        p10: m.mean - Z90 * sd,
        p90: m.mean + Z90 * sd,
        marginSeconds,
        marginLengths: marginSeconds / SEC_PER_LENGTH,
      };
    }),
    debuts: debuts.map((e) => ({ horseNumber: e.horseNumber, horseName: e.horse.name })),
  };
}

// ============================================================================
// MAIN PIPELINE
// ============================================================================

export async function runRaceAnalysis(
  opts: RaceAnalysisOptions,
  log: AnalysisLogger = silentLogger
): Promise<RaceAnalysisResult> {
  // Initialize components
  const formAnalyzer = new FormAnalyzer();
  const hvStdDev = opts.venue === "Happy Valley" ? 11 : 8;
  const simulator = new MonteCarloSimulator({ runs: 10000, performanceStdDev: hvStdDev });

  const config = {
    bankroll: opts.bankroll ?? DEFAULT_BETTING_CONFIG.bankroll,
    kellyFraction: opts.kellyFraction ?? DEFAULT_BETTING_CONFIG.kellyFraction,
    minEdgeThreshold: opts.minEdge ?? DEFAULT_BETTING_CONFIG.minEdgeThreshold,
  };
  const recommendationEngine = new RecommendationEngine(config);

  // Load race card: either from saved snapshot (useSaved) or live scrape
  const { race, winOddsMap } = opts.useSaved
    ? await loadSavedRace(opts, log)
    : await scrapeAndEnrichRace(opts, log);

  // Estimate place odds
  const valueCalc = new ValueCalculator();
  if (winOddsMap.size === 0) {
    log.info("[WARNING] No win odds fetched — value calculations will be unreliable");
  } else {
    log.info(`[INFO] Win odds for ${winOddsMap.size} horses (place odds estimated from win odds)`);
  }

  // Analyze horses
  log.info("Analyzing form factors...");
  const analyses = formAnalyzer.analyzeRace(race);

  // Run simulations
  log.info("Running Monte Carlo simulation (10,000 iterations)...");
  const { results: simResults, exoticProbabilities } = simulator.simulateRace(race);

  const placeOdds = valueCalc.estimatePlaceOdds(winOddsMap);
  const marketOdds: MarketOdds = {
    winOdds: winOddsMap,
    placeOdds,
  };

  // Generate recommendations
  log.info("Generating recommendations...\n");
  const recommendation = recommendationEngine.generateRecommendations(
    race,
    analyses,
    simResults,
    exoticProbabilities,
    marketOdds
  );

  // Rating differentiation vs the top-rated horse
  const analysisMap = new Map(analyses.map((a) => [a.horseCode, a]));
  const topRating = analyses.length > 0 ? analyses[0]?.overallRating ?? 0 : 0;
  const rankings: RankingRow[] = simResults.map((simulation) => {
    const analysis = analysisMap.get(simulation.horseCode);
    return {
      simulation,
      analysis,
      ratingDiff: analysis ? Math.abs(topRating - analysis.overallRating) : 0,
    };
  });
  const diffs = rankings.map((r) => r.ratingDiff);

  const topOutcomes = (probs: Map<string, number>): ExoticOutcome[] =>
    simulator.getTopExoticOutcomes(probs, TOP_EXOTICS).map((o) => ({
      ...o,
      fairOdds: simulator.probabilityToFairOdds(o.probability),
    }));

  return {
    race,
    winOdds: winOddsMap,
    placeOdds,
    config,
    analyses,
    recommendation,
    simulationRuns: simResults[0]?.simulationRuns ?? 10000,
    rankings,
    avgDifferentiation: diffs.length > 0 ? diffs.reduce((s, d) => s + d, 0) / diffs.length : 0,
    closeDiffCount: diffs.filter((d) => d < 8).length,
    finishTimes: projectFinishTimes(race, analysisMap, opts.venue),
    topExotics: {
      quinella: topOutcomes(exoticProbabilities.quinella),
      quinellaPlace: topOutcomes(exoticProbabilities.quinellaPlace),
      trio: topOutcomes(exoticProbabilities.trio),
      tierce: topOutcomes(exoticProbabilities.tierce),
    },
    marketEfficiency: valueCalc.analyzeMarketEfficiency(simResults, winOddsMap),
  };
}
