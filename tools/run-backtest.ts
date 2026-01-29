#!/usr/bin/env tsx
/**
 * Backtest CLI Tool
 *
 * Runs the betting strategy against historical data
 *
 * Usage:
 *   npm run backtest
 *   npx tsx tools/run-backtest.ts
 */

import { Backtester } from "../src/backtest/backtester.js";

async function main() {
  console.log("\n" + "═".repeat(70));
  console.log("HK HORSE RACING - BACKTEST");
  console.log("Testing strategy against last 5 racing days");
  console.log("═".repeat(70));

  const backtester = new Backtester({
    bankroll: 10000,
    maxBetPercent: 5,
    maxRacePercent: 10,
    minEdgeThreshold: 15,
    kellyFraction: 0.25,
    preferredBetTypes: ["Place", "Quinella", "Quinella Place"],
  });

  try {
    const summary = await backtester.runBacktest();
    const report = backtester.formatReport(summary);
    console.log(report);

    // Interpretation
    console.log("\n## INTERPRETATION");
    console.log("─".repeat(50));

    const roi = summary.performance.roi;
    if (roi > 10) {
      console.log("✓ Excellent performance! ROI > 10%");
    } else if (roi > 0) {
      console.log("✓ Profitable strategy with positive ROI");
    } else if (roi > -10) {
      console.log("⚠ Marginal performance, consider adjustments");
    } else {
      console.log("✗ Poor performance, strategy needs revision");
    }

    const hitRate = summary.performance.hitRate;
    if (hitRate > 40) {
      console.log("✓ Good hit rate for value betting");
    } else if (hitRate > 30) {
      console.log("○ Acceptable hit rate, check odds quality");
    } else {
      console.log("⚠ Low hit rate, may need better selection");
    }

    const brierWin = summary.calibration.brierScoreWin;
    if (brierWin < 0.2) {
      console.log("✓ Excellent probability calibration");
    } else if (brierWin < 0.25) {
      console.log("✓ Good probability calibration");
    } else {
      console.log("⚠ Probability calibration needs improvement");
    }

    console.log("\n" + "═".repeat(70));
    console.log("Note: This backtest uses sample data. For production use,");
    console.log("scrape actual historical data from HKJC for accurate results.");
    console.log("═".repeat(70) + "\n");

  } catch (error) {
    console.error("\nBacktest failed:", error);
    process.exit(1);
  }
}

main();
