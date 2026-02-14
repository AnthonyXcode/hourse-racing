#!/usr/bin/env tsx
/**
 * Test racecard scraper on upcoming race day
 */

import { RaceCardScraper } from "../src/scrapers/raceCard.js";
import { format } from "date-fns";

async function main() {
  const scraper = new RaceCardScraper({ headless: true });

  try {
    console.log("Initializing scraper...");
    await scraper.init();

    // Try upcoming race dates (Jan 31 or Feb 1, 2026)
    const dates = [
      new Date("2026-01-31"),
      new Date("2026-02-01"),
    ];

    for (const testDate of dates) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`Testing ${format(testDate, "yyyy-MM-dd")}...`);

      try {
        const race = await scraper.scrapeRaceCard(testDate, "Sha Tin", 1);

        console.log("\nRace Details:");
        console.log(`  ID: ${race.id}`);
        console.log(`  Class: ${race.class}`);
        console.log(`  Distance: ${race.distance}m`);
        console.log(`  Surface: ${race.surface}`);
        console.log(`  Going: ${race.going}`);
        console.log(`  Prize: $${race.prizeMoney}`);
        console.log(`  Entries: ${race.entries.length}`);

        if (race.entries.length > 0) {
          console.log("\nEntries:");
          for (const entry of race.entries.slice(0, 5)) {
            console.log(
              `  #${entry.horseNumber} ${entry.horse.name} (Draw: ${entry.draw}, Wt: ${entry.weight})`
            );
          }
          if (race.entries.length > 5) {
            console.log(`  ... and ${race.entries.length - 5} more`);
          }
          break; // Found a working date
        }
      } catch (err) {
        console.log(`  No race card available for this date: ${err instanceof Error ? err.message : err}`);
      }
    }

  } catch (error) {
    console.error("Scraping failed:", error);
  } finally {
    await scraper.close();
  }
}

main();
