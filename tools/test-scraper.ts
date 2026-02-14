#!/usr/bin/env tsx
/**
 * Test scraper on a single race
 */

import { HistoricalScraper } from "../src/scrapers/historical.js";
import { format } from "date-fns";

async function main() {
  const scraper = new HistoricalScraper({ headless: true });

  try {
    console.log("Initializing scraper...");
    await scraper.init();

    // Test on Jan 25, 2026 Race 2 at Sha Tin (we know this has data)
    const testDate = new Date("2026-01-25");
    const venue = "Sha Tin" as const;
    const raceNum = 2;

    console.log(`\nScraping ${venue} Race ${raceNum} on ${format(testDate, "yyyy-MM-dd")}...`);
    
    const result = await scraper.scrapeRaceResult(testDate, venue, raceNum);

    console.log("\n" + "=".repeat(60));
    console.log("RACE RESULT");
    console.log("=".repeat(60));
    console.log(`Race ID: ${result.id}`);
    console.log(`Class: ${result.class}`);
    console.log(`Distance: ${result.distance}m`);
    console.log(`Surface: ${result.surface}`);
    console.log(`Going: ${result.going}`);
    console.log(`Prize: $${result.prizeMoney}`);
    
    console.log("\nFinish Order:");
    console.log("-".repeat(40));
    for (const finish of result.finishOrder) {
      console.log(
        `  ${finish.finishPosition}. Horse #${finish.horseNumber} ` +
        `Time: ${finish.finishTime?.toFixed(2) ?? "N/A"} ` +
        `Margin: ${finish.margin ?? "N/A"}`
      );
    }

    console.log("\nDividends:");
    console.log("-".repeat(40));
    console.log(`  WIN: $${result.winDividend ?? "N/A"}`);
    console.log(`  PLACE: ${result.placeDividends?.map(d => `$${d}`).join(", ") ?? "N/A"}`);
    console.log(`  QUINELLA: $${result.quinellaDividend ?? "N/A"}`);
    console.log(`  Q PLACE: ${result.quinellaPlaceDividends?.map(d => `$${d}`).join(", ") ?? "N/A"}`);
    console.log(`  TIERCE: $${result.tierceDividend ?? "N/A"}`);
    console.log(`  TRIO: $${result.trioDividend ?? "N/A"}`);

    console.log("\n" + "=".repeat(60));
    console.log("Test completed successfully!");

  } catch (error) {
    console.error("\nScraping failed:", error);
    process.exitCode = 1;
  } finally {
    await scraper.close();
  }
}

main();
