#!/usr/bin/env tsx
/**
 * Scrape a single historical race for analysis
 */

import { HistoricalScraper } from "../src/scrapers/historical.js";
import { format } from "date-fns";
import { writeFile } from "fs/promises";

async function main() {
  const dateArg = process.argv.find(a => a.startsWith("--date="))?.split("=")[1];
  const venueArg = process.argv.find(a => a.startsWith("--venue="))?.split("=")[1] || "ST";
  const raceArg = process.argv.find(a => a.startsWith("--race="))?.split("=")[1] || "1";

  if (!dateArg) {
    console.error("Usage: npx tsx tools/scrape-single-race.ts --date=2025-01-18 --venue=ST --race=1");
    process.exit(1);
  }

  const date = new Date(dateArg);
  const venue = venueArg === "HV" ? "Happy Valley" as const : "Sha Tin" as const;
  const raceNumber = parseInt(raceArg, 10);

  console.log(`\nScraping ${venue} Race ${raceNumber} on ${format(date, "yyyy-MM-dd")}...\n`);

  const scraper = new HistoricalScraper({ headless: true });

  try {
    await scraper.init();
    const result = await scraper.scrapeRaceResult(date, venue, raceNumber);

    console.log("═".repeat(60));
    console.log(`RACE ${raceNumber} - ${venue} | ${format(date, "yyyy-MM-dd")}`);
    console.log("═".repeat(60));
    console.log(`Class: ${result.class}`);
    console.log(`Distance: ${result.distance}m`);
    console.log(`Surface: ${result.surface}`);
    console.log(`Going: ${result.going}`);
    console.log(`Prize: $${result.prizeMoney.toLocaleString()}`);

    console.log("\nFINISH ORDER:");
    console.log("─".repeat(60));
    console.log("Pos  #  Horse                    Jockey          Time      Odds");
    console.log("─".repeat(60));

    for (const finish of result.finishOrder) {
      const pos = finish.finishPosition.toString().padStart(2);
      const num = finish.horseNumber.toString().padStart(2);
      const name = (finish.horseName || "Unknown").padEnd(24).substring(0, 24);
      const jockey = (finish.jockeyName || "").padEnd(15).substring(0, 15);
      const time = finish.finishTime ? finish.finishTime.toFixed(2) : "-";
      const odds = finish.winOdds ? finish.winOdds.toFixed(1) : "-";
      
      console.log(`${pos}   ${num}  ${name} ${jockey} ${time.padStart(7)}  ${odds.padStart(5)}`);
    }

    console.log("\nDIVIDENDS:");
    console.log("─".repeat(40));
    if (result.winDividend) console.log(`  WIN:      $${result.winDividend.toFixed(1)}`);
    if (result.placeDividends) console.log(`  PLACE:    $${result.placeDividends.map(d => d.toFixed(1)).join(", $")}`);
    if (result.quinellaDividend) console.log(`  QUINELLA: $${result.quinellaDividend.toFixed(1)}`);
    if (result.tierceDividend) console.log(`  TIERCE:   $${result.tierceDividend.toFixed(0)}`);
    if (result.trioDividend) console.log(`  TRIO:     $${result.trioDividend.toFixed(0)}`);

    // Save to file
    const filename = `data/historical/race_${format(date, "yyyyMMdd")}_${venueArg}_R${raceNumber}.json`;
    await writeFile(filename, JSON.stringify(result, null, 2));
    console.log(`\nSaved to: ${filename}`);

  } catch (error) {
    console.error("\nScraping failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await scraper.close();
  }
}

main();
