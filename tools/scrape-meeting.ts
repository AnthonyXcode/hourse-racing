#!/usr/bin/env tsx
/**
 * Scrape all races from a single meeting date
 */

import { HistoricalScraper } from "../src/scrapers/historical.js";
import { format } from "date-fns";
import { writeFile } from "fs/promises";

async function main() {
  const dateArg = process.argv.find(a => a.startsWith("--date="))?.split("=")[1];
  const venueArg = process.argv.find(a => a.startsWith("--venue="))?.split("=")[1] || "ST";

  if (!dateArg) {
    console.error("Usage: npx tsx tools/scrape-meeting.ts --date=2025-12-27 --venue=ST");
    process.exit(1);
  }

  const date = new Date(dateArg);
  const venue = venueArg === "HV" ? "Happy Valley" as const : "Sha Tin" as const;

  console.log(`\nScraping all races at ${venue} on ${format(date, "yyyy-MM-dd")}...\n`);

  const scraper = new HistoricalScraper({ headless: true });

  try {
    await scraper.init();
    const results = await scraper.scrapeFullMeetingResults(date, venue);

    console.log(`\nScraped ${results.length} races\n`);

    // Display summary for each race
    for (const race of results) {
      console.log("═".repeat(70));
      console.log(`RACE ${race.raceNumber} - ${race.class} | ${race.distance}m ${race.surface}`);
      console.log("═".repeat(70));
      
      if (race.finishOrder.length > 0) {
        console.log("\nTop 4 Finishers:");
        console.log("─".repeat(70));
        console.log("Pos  # Dr Horse                      Jockey            Wt   Odds     Dividend");
        console.log("─".repeat(70));
        
        for (let i = 0; i < Math.min(4, race.finishOrder.length); i++) {
          const finish = race.finishOrder[i];
          const pos = finish.finishPosition.toString().padStart(2);
          const num = finish.horseNumber.toString().padStart(2);
          const dr =
            finish.draw !== undefined ? String(finish.draw).padStart(2) : " -";
          const name = (finish.horseName || "Unknown").padEnd(24).substring(0, 24);
          const jockey = (finish.jockeyName || "").padEnd(17).substring(0, 17);
          const wt =
            finish.actualWeight !== undefined
              ? String(finish.actualWeight).padStart(3)
              : "  -";
          const odds = finish.winOdds ? finish.winOdds.toFixed(1).padStart(6) : "   -  ";
          const div = i === 0 && race.winDividend ? `$${race.winDividend.toFixed(1)}` : "";
          
          console.log(`${pos}   ${num} ${dr} ${name} ${jockey} ${wt}  ${odds}   ${div}`);
        }
        
        console.log("\nDividends:");
        if (race.winDividend) console.log(`  WIN: $${race.winDividend.toFixed(1)}`);
        if (race.quinellaDividend) console.log(`  QNL: $${race.quinellaDividend.toFixed(1)}`);
        if (race.tierceDividend) console.log(`  TRC: $${race.tierceDividend.toFixed(0)}`);
      } else {
        console.log("  No results available");
      }
      console.log("");
    }

    // Save to file
    const filename = `data/historical/results_${format(date, "yyyyMMdd")}_${venueArg}.json`;
    await writeFile(filename, JSON.stringify(results, null, 2));
    console.log(`\nSaved to: ${filename}`);

  } catch (error) {
    console.error("\nScraping failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await scraper.close();
  }
}

main();
