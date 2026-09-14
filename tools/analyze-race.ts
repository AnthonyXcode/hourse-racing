#!/usr/bin/env tsx
/**
 * Race Analysis CLI Tool
 *
 * Usage:
 *   npm run analyze -- --date 2026-01-29 --venue "Sha Tin" --race 5
 *   npm run analyze -- --help
 *
 * The analysis itself lives in src/pipeline/raceAnalysis.ts (shared with the API server);
 * this file parses arguments and prints the report.
 */

import { format, parse } from "date-fns";
import type { Venue } from "../src/types/index.js";
import { formatRaceReport } from "../src/betting/recommendations.js";
import {
  consoleLogger,
  runRaceAnalysis,
  type FinishTimeProjection,
  type RaceAnalysisOptions,
  type RaceAnalysisResult,
} from "../src/pipeline/raceAnalysis.js";
import { tripRunCount } from "../src/backtest/differentiationBacktest.js";

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

interface CliArgs extends RaceAnalysisOptions {
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
  let formData: "all" | undefined;
  let ignoreRecords: string[] | undefined;
  let raceNumber = 1;
  let useSaved = false;
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

      case "--form-data":
      case "-f":
        if (next && next.toLowerCase() === "all") {
          formData = "all";
          i++;
        }
        break;

      case "--ignore-records":
        if (next) {
          ignoreRecords = next.split(",").map((s) => s.trim()).filter(Boolean);
          i++;
        }
        break;

      case "--use-saved":
      case "-s":
        useSaved = true;
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

  const result: CliArgs = {
    date,
    venue,
    raceNumber,
  };
  if (formData !== undefined) result.formData = formData;
  if (ignoreRecords !== undefined && ignoreRecords.length > 0) result.ignoreRecords = ignoreRecords;
  if (useSaved) result.useSaved = true;
  if (bankroll !== undefined) result.bankroll = bankroll;
  if (kellyFraction !== undefined) result.kellyFraction = kellyFraction;
  if (minEdge !== undefined) result.minEdge = minEdge;
  return result;
}

function printHelp(): void {
  console.log(`
HK Horse Racing Analyzer

Usage:
  npm run analyze -- [options]

Options:
  -d, --date <YYYY-MM-DD>   Race date (default: today)
  -v, --venue <venue>       Venue for race card: "Sha Tin" or "Happy Valley" (default: Sha Tin)
  -f, --form-data <mode>    Form data: "all" = use HV + ST records; if omitted, use --venue only
  --ignore-records <list>   Comma-separated list: skip historical files whose name contains any (e.g. 20260315,20260301,HV)
  -s, --use-saved           Use saved race card snapshot from data/racecards/ instead of live scraping
  -r, --race <number>       Race number (default: 1)
  -b, --bankroll <amount>   Bankroll in HKD (default: 10000)
  -k, --kelly <fraction>    Kelly fraction 0-1 (default: 0.25)
  -e, --min-edge <percent>  Minimum edge threshold (default: 15)
  -h, --help                Show this help message

Examples:
  npm run analyze -- --date 2026-01-29 --venue "Sha Tin" --race 5
  npm run analyze -- -d 2026-01-29 -v ST -r 5 --form-data all
  npm run analyze -- -d 2026-01-29 -v "Happy Valley" -r 3 -f all
  npm run analyze -- --race 3 --kelly 0.35
  npm run analyze -- -d 2026-03-29 -v ST -r 1 --use-saved -f all
`);
}

// ============================================================================
// REPORT PRINTING
// ============================================================================

/** Format seconds as M:SS.ss (>=60s) or SS.ss. */
function fmtTime(s: number): string {
  if (s >= 60) {
    const m = Math.floor(s / 60);
    const rem = s - m * 60;
    return `${m}:${rem.toFixed(2).padStart(5, "0")}`;
  }
  return s.toFixed(2);
}

function printHeader(args: CliArgs): void {
  console.log("\n" + "═".repeat(60));
  console.log("HK HORSE RACING ANALYZER");
  console.log("═".repeat(60) + "\n");

  console.log(`Date: ${format(args.date, "yyyy-MM-dd")}`);
  console.log(`Venue: ${args.venue}`);
  console.log(`Form data: ${args.formData === "all" ? "all venues (HV + ST)" : args.venue + " only"}`);
  if (args.ignoreRecords && args.ignoreRecords.length > 0) {
    console.log(`Ignore records: ${args.ignoreRecords.join(", ")}`);
  }
  if (args.useSaved) {
    console.log(`Source: saved race card snapshot`);
  }
  console.log(`Race: ${args.raceNumber}`);
  console.log("");
}

function printFinishTimeProjection(projection: FinishTimeProjection): void {
  if (projection.status === "skipped") {
    console.log(`\nFinish-Time Projection: ${projection.reason} — skipped.`);
    return;
  }
  if (projection.status === "empty") return;

  const { rows, debuts } = projection;
  console.log("\n" + "─".repeat(60));
  console.log(
    `FINISH-TIME PROJECTION (${projection.distance}m, ${projection.going}, ±1σ=${projection.sdSeconds.toFixed(2)}s)`
  );
  console.log("─".repeat(60));
  console.log(`   # Horse              P10     Mean     P90     Margin`);
  for (const r of rows) {
    const marginStr =
      r.marginSeconds === 0 ? "  —  " : `+${r.marginSeconds.toFixed(2)}s (${r.marginLengths.toFixed(1)}L)`;
    console.log(
      `  ${r.horseNumber.toString().padStart(2)} ${r.horseName.substring(0, 16).padEnd(16)} ` +
        `${fmtTime(r.p10).padStart(7)} ${fmtTime(r.mean).padStart(7)} ${fmtTime(r.p90).padStart(7)}   ${marginStr}`
    );
  }
  if (debuts.length > 0) {
    const list = debuts.map((d) => `#${d.horseNumber} ${d.horseName}`).join(", ");
    console.log(`\n  Debut (no form, excluded from projection): ${list}`);
  }
  const winner = rows[0]!;
  console.log(`\n  Projected winning time: ~${fmtTime(winner.mean)} (#${winner.horseNumber} ${winner.horseName}). Times from avg speed figure + par/going/weight; SD from ±${projection.speedStd}pt figure spread.`);
}

function printAnalysis(result: RaceAnalysisResult): void {
  // Print report
  console.log(formatRaceReport(result.recommendation));

  // Additional simulation summary
  console.log("\n" + "─".repeat(60));
  console.log("SIMULATION SUMMARY");
  console.log("─".repeat(60));

  console.log(
    `\nWin Probability Rankings (all ${result.rankings.length} horses, ${result.simulationRuns.toLocaleString()} iterations; trip = past runs at ${result.race.distance}m):`
  );
  for (const { simulation: s, analysis, ratingDiff } of result.rankings) {
    const entry = result.race.entries.find((e) => e.horseNumber === s.horseNumber);
    const tripStr = `${tripRunCount(entry, result.race.distance)} trip`;
    const recStr = s.formRecordCount !== undefined ? ` [${s.formRecordCount} form, ${tripStr}]` : ` [${tripStr}]`;
    const ratingStr = analysis ? ` rating: ${analysis.overallRating.toFixed(0)}` : "";
    const diffStr = analysis ? ` diff: ${ratingDiff.toFixed(0)}` : "";
    const ePosStr = ` ePos: ${s.expectedPosition.toFixed(1)}`;
    console.log(
      `  #${s.horseNumber.toString().padStart(2)} ${s.horseName.padEnd(15).substring(0, 15)}: ` +
        `${(s.winProbability * 100).toFixed(1).padStart(5)}% win, ` +
        `${(s.placeProbability * 100).toFixed(1).padStart(5)}% place` +
        recStr + ratingStr + diffStr + ePosStr
    );
  }

  console.log(
    `\n  Avg differentiation: ${result.avgDifferentiation.toFixed(0)} | Horses with diff < 8: ${result.closeDiffCount} | Sparse (<3 form): ${result.sparseFormCount}`
  );

  // --- Finish-time projection (independent pass) ---
  printFinishTimeProjection(result.finishTimes);

  console.log("\nTop Quinella Combinations:");
  for (const q of result.topExotics.quinella.slice(0, 5)) {
    console.log(
      `  ${q.combination}: ${(q.probability * 100).toFixed(1)}% (fair odds: ${q.fairOdds.toFixed(1)})`
    );
  }

  // Show jockey/trainer analysis
  console.log("\nJockey/Trainer Form (from historical data):");
  const topEntries = result.race.entries
    .filter(e => e.jockey.seasonStats.rides > 0 || e.trainer.seasonStats.rides > 0)
    .sort((a, b) => b.jockey.seasonStats.winRate - a.jockey.seasonStats.winRate);

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

  const efficiency = result.marketEfficiency;
  console.log("\nMarket Efficiency:");
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
}

function printFailure(error: unknown): void {
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
}

// ============================================================================
// ENTRY POINT
// ============================================================================

async function main(args: CliArgs): Promise<void> {
  printHeader(args);
  try {
    const result = await runRaceAnalysis(args, consoleLogger);
    printAnalysis(result);
  } catch (error) {
    printFailure(error);
    process.exit(1);
  }
}

const args = parseArgs();
main(args);
