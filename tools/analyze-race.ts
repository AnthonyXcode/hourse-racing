#!/usr/bin/env tsx
/**
 * Race Analysis CLI Tool
 *
 * Usage:
 *   npm run analyze -- --date 2026-01-29 --venue "Sha Tin" --race 5
 *   npm run analyze -- --help
 */

import { format, parse } from "date-fns";
import type {
  Race,
  Venue,
  BettingConfig,
} from "../src/types/index.js";
import { DEFAULT_BETTING_CONFIG } from "../src/types/index.js";
import { RaceCardScraper } from "../src/scrapers/raceCard.js";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";
import {
  RecommendationEngine,
  formatRaceReport,
} from "../src/betting/recommendations.js";
import { ValueCalculator, MarketOdds } from "../src/betting/valueCalculator.js";
import { HorseDataEnricher } from "../src/data/horseEnricher.js";

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

interface CliArgs {
  date: Date;
  venue: Venue;
  raceNumber: number;
  bankroll?: number;
  kellyFraction?: number;
  minEdge?: number;
  help?: boolean;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  let date = new Date();
  let venue: Venue = "Sha Tin";
  let raceNumber = 1;
  let bankroll: number | undefined;
  let kellyFraction: number | undefined;
  let minEdge: number | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];

    switch (arg) {
      case "--date":
      case "-d":
        if (next) {
          date = parse(next, "yyyy-MM-dd", new Date());
          i++;
        }
        break;

      case "--venue":
      case "-v":
        if (next) {
          venue = next.includes("Happy") ? "Happy Valley" : "Sha Tin";
          i++;
        }
        break;

      case "--race":
      case "-r":
        if (next) {
          raceNumber = parseInt(next, 10);
          i++;
        }
        break;

      case "--bankroll":
      case "-b":
        if (next) {
          bankroll = parseInt(next, 10);
          i++;
        }
        break;

      case "--kelly":
      case "-k":
        if (next) {
          kellyFraction = parseFloat(next);
          i++;
        }
        break;

      case "--min-edge":
      case "-e":
        if (next) {
          minEdge = parseFloat(next);
          i++;
        }
        break;
    }
  }

  return { date, venue, raceNumber, bankroll, kellyFraction, minEdge };
}

function printHelp(): void {
  console.log(`
HK Horse Racing Analyzer

Usage:
  npm run analyze -- [options]

Options:
  -d, --date <YYYY-MM-DD>   Race date (default: today)
  -v, --venue <venue>       Venue: "Sha Tin" or "Happy Valley" (default: Sha Tin)
  -r, --race <number>       Race number (default: 1)
  -b, --bankroll <amount>   Bankroll in HKD (default: 10000)
  -k, --kelly <fraction>    Kelly fraction 0-1 (default: 0.25)
  -e, --min-edge <percent>  Minimum edge threshold (default: 15)
  -h, --help                Show this help message

Examples:
  npm run analyze -- --date 2026-01-29 --venue "Sha Tin" --race 5
  npm run analyze -- -d 2026-01-29 -v ST -r 5 -b 20000
  npm run analyze -- --race 3 --kelly 0.35
`);
}

// ============================================================================
// MAIN ANALYSIS FUNCTION
// ============================================================================

async function analyzeRace(args: CliArgs): Promise<void> {
  console.log("\n" + "═".repeat(60));
  console.log("HK HORSE RACING ANALYZER");
  console.log("═".repeat(60) + "\n");

  console.log(`Date: ${format(args.date, "yyyy-MM-dd")}`);
  console.log(`Venue: ${args.venue}`);
  console.log(`Race: ${args.raceNumber}`);
  console.log("");

  // Initialize components
  const scraper = new RaceCardScraper({ headless: true });
  const formAnalyzer = new FormAnalyzer();
  const simulator = new MonteCarloSimulator({ runs: 10000 });

  const config: Partial<BettingConfig> = {
    bankroll: args.bankroll ?? DEFAULT_BETTING_CONFIG.bankroll,
    kellyFraction: args.kellyFraction ?? DEFAULT_BETTING_CONFIG.kellyFraction,
    minEdgeThreshold: args.minEdge ?? DEFAULT_BETTING_CONFIG.minEdgeThreshold,
  };

  const recommendationEngine = new RecommendationEngine(config);

  try {
    // Load historical data for enrichment
    console.log("Loading historical data...");
    const enricher = new HorseDataEnricher();
    await enricher.loadHistoricalData();
    const dataSummary = enricher.getDataSummary();
    if (dataSummary.totalRaces > 0) {
      console.log(`  Found ${dataSummary.totalRaces} historical races`);
      console.log(`  Indexed ${dataSummary.totalHorses} horse performances`);
    }

    console.log("Initializing scraper...");
    await scraper.init();

    console.log("Fetching race card...");
    let race = await scraper.scrapeRaceCard(
      args.date,
      args.venue,
      args.raceNumber
    );

    // Validate race has entries
    if (race.entries.length === 0) {
      throw new Error(
        `No entries found for Race ${args.raceNumber} at ${args.venue} on ${format(args.date, "yyyy-MM-dd")}. ` +
        `This could mean: (1) No racing on this date, (2) Race card not yet published, or (3) Invalid race number.`
      );
    }

    console.log(`Found ${race.entries.length} entries`);

    // Enrich horses with historical data
    console.log("Enriching horses with past performances...");
    race = enricher.enrichRace(race);
    
    const horsesWithHistory = race.entries.filter(
      e => e.horse.pastPerformances.length > 0
    ).length;
    console.log(`  ${horsesWithHistory}/${race.entries.length} horses enriched with form data\n`);

    // Analyze horses
    console.log("Analyzing form factors...");
    const analyses = formAnalyzer.analyzeRace(race);

    // Run simulations
    console.log("Running Monte Carlo simulation (10,000 iterations)...");
    const { results: simResults, exoticProbabilities } =
      simulator.simulateRace(race);

    // Fetch current odds
    console.log("Fetching current odds...");
    const winOddsMap = await scraper.fetchCurrentOdds(
      args.date,
      args.venue,
      args.raceNumber
    );

    // Estimate place odds if not available
    const valueCalc = new ValueCalculator();
    const placeOddsMap = valueCalc.estimatePlaceOdds(winOddsMap);

    const marketOdds: MarketOdds = {
      winOdds: winOddsMap,
      placeOdds: placeOddsMap,
    };

    // Generate recommendations
    console.log("Generating recommendations...\n");
    const recommendation = recommendationEngine.generateRecommendations(
      race,
      analyses,
      simResults,
      exoticProbabilities,
      marketOdds
    );

    // Print report
    const report = formatRaceReport(recommendation);
    console.log(report);

    // Additional simulation summary
    console.log("\n" + "─".repeat(60));
    console.log("SIMULATION SUMMARY");
    console.log("─".repeat(60));

    console.log("\nWin Probability Rankings:");
    for (const result of simResults.slice(0, 6)) {
      console.log(
        `  #${result.horseNumber.toString().padStart(2)} ${result.horseName.padEnd(15).substring(0, 15)}: ` +
          `${(result.winProbability * 100).toFixed(1).padStart(5)}% win, ` +
          `${(result.placeProbability * 100).toFixed(1).padStart(5)}% place`
      );
    }

    console.log("\nTop Quinella Combinations:");
    const topQuinellas = simulator
      .getTopExoticOutcomes(exoticProbabilities.quinella, 5);
    for (const q of topQuinellas) {
      const fairOdds = simulator.probabilityToFairOdds(q.probability);
      console.log(
        `  ${q.combination}: ${(q.probability * 100).toFixed(1)}% (fair odds: ${fairOdds.toFixed(1)})`
      );
    }

    // Show jockey/trainer analysis
    console.log("\nJockey/Trainer Form (from historical data):");
    const topEntries = race.entries
      .filter(e => e.jockey.seasonStats.rides > 0 || e.trainer.seasonStats.rides > 0)
      .sort((a, b) => b.jockey.seasonStats.winRate - a.jockey.seasonStats.winRate)
      .slice(0, 5);
    
    for (const entry of topEntries) {
      const jWR = (entry.jockey.seasonStats.winRate * 100).toFixed(0);
      const jRides = entry.jockey.seasonStats.rides;
      const tWR = (entry.trainer.seasonStats.winRate * 100).toFixed(0);
      const tRides = entry.trainer.seasonStats.rides;
      console.log(
        `  #${entry.horseNumber.toString().padStart(2)} ${entry.horse.name.substring(0, 15).padEnd(15)} - ` +
        `J: ${entry.jockey.name.substring(0, 12).padEnd(12)} (${jWR}% from ${jRides} rides) | ` +
        `T: ${entry.trainer.name.substring(0, 12).padEnd(12)} (${tWR}% from ${tRides})`
      );
    }

    console.log("\nMarket Efficiency:");
    const efficiency = valueCalc.analyzeMarketEfficiency(simResults, winOddsMap);
    console.log(`  Overround: ${efficiency.overround.toFixed(1)}%`);
    console.log(`  Favorite Bias: ${efficiency.favoriteBias >= 0 ? "+" : ""}${efficiency.favoriteBias.toFixed(1)}%`);
    console.log(`  Longshot Bias: ${efficiency.longShotBias >= 0 ? "+" : ""}${efficiency.longShotBias.toFixed(1)}%`);

    if (efficiency.inefficiencies.length > 0) {
      console.log("\n  Potential Inefficiencies:");
      for (const ineff of efficiency.inefficiencies.slice(0, 3)) {
        const direction = ineff.edge > 0 ? "undervalued" : "overvalued";
        console.log(
          `    #${ineff.horseNumber}: ${direction} by ${Math.abs(ineff.edge).toFixed(0)}%`
        );
      }
    }

  } catch (error) {
    console.error("\n" + "═".repeat(60));
    console.error("ANALYSIS FAILED");
    console.error("═".repeat(60));
    console.error("\nError:", error instanceof Error ? error.message : error);
    console.error("\nPossible causes:");
    console.error("  - No racing on the specified date");
    console.error("  - HKJC website unavailable or structure changed");
    console.error("  - Network connectivity issues");
    console.error("  - Invalid race number for this meeting");
    console.error("\nTry:");
    console.error("  - Check HKJC website for race schedule");
    console.error("  - Verify the date and race number");
    console.error("  - Run 'npm run scrape:racecard' to see available races");
    console.error("═".repeat(60) + "\n");
    
    process.exit(1);
  } finally {
    await scraper.close();
  }
}

// ============================================================================
// ENTRY POINT
// ============================================================================

const args = parseArgs();
analyzeRace(args);
