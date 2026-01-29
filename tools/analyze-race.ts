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
  DEFAULT_BETTING_CONFIG,
} from "../src/types/index.js";
import { RaceCardScraper } from "../src/scrapers/raceCard.js";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";
import {
  RecommendationEngine,
  formatRaceReport,
} from "../src/betting/recommendations.js";
import { ValueCalculator, MarketOdds } from "../src/betting/valueCalculator.js";

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
    console.log("Initializing scraper...");
    await scraper.init();

    console.log("Fetching race card...");
    const race = await scraper.scrapeRaceCard(
      args.date,
      args.venue,
      args.raceNumber
    );

    console.log(`Found ${race.entries.length} entries\n`);

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
    console.error("\nError during analysis:", error);

    // Provide fallback with mock data for demonstration
    console.log("\n⚠ Live data unavailable. Showing demonstration output...\n");
    showDemoOutput(args, config);

  } finally {
    await scraper.close();
  }
}

// ============================================================================
// DEMO OUTPUT (when scraping fails)
// ============================================================================

function showDemoOutput(
  args: CliArgs,
  config: Partial<BettingConfig>
): void {
  console.log("═".repeat(60));
  console.log(
    `RACE ${args.raceNumber} - ${args.venue} | Class 3 | 1400m Turf | Good to Firm`
  );
  console.log("═".repeat(60));
  console.log("");

  console.log("TOP CONTENDERS:");
  console.log("#  Horse           Win%   Place%  Value  Rating");
  console.log("─".repeat(50));
  console.log(" 3  Golden Sixty    28.4%  67.2%   1.12   ★★★★★");
  console.log(" 7  California S.   22.1%  58.9%   1.34   ★★★★☆");
  console.log(" 1  Romantic Warr.  18.7%  51.4%   0.89   ★★★☆☆");
  console.log(" 5  Lucky Express   12.3%  42.1%   1.15   ★★★☆☆");
  console.log("12  Dark Runner      8.9%  35.6%   1.42   ★★☆☆☆");
  console.log("");

  console.log("RECOMMENDED BETS:");
  console.log("┌" + "─".repeat(52) + "┐");
  console.log("│ BET TYPE      │ SELECTION    │ ODDS  │ STAKE  │");
  console.log("├" + "─".repeat(52) + "┤");
  console.log("│ Place         │ #7           │  1.80 │   $200 │");
  console.log("│ Quinella      │ 3-7          │ 12.50 │    $50 │");
  console.log("│ Q Place       │ 3-7          │  3.40 │   $100 │");
  console.log("└" + "─".repeat(52) + "┘");
  console.log("");

  console.log("Edge Analysis: #7 California Spangle shows 34% edge vs market.");
  console.log("Confidence: HIGH (strong speed figures, favorable draw)");
  console.log("");

  console.log(`Bankroll: $${config.bankroll ?? 10000}`);
  console.log("Total Stake: $350 (3.5% of bankroll)");
  console.log("");

  console.log("─".repeat(60));
  console.log("NOTE: This is demonstration output. For live analysis,");
  console.log("ensure HKJC website is accessible and race data is available.");
  console.log("─".repeat(60));
}

// ============================================================================
// ENTRY POINT
// ============================================================================

const args = parseArgs();
analyzeRace(args);
