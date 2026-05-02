#!/usr/bin/env tsx
/**
 * Batch analyze races and output a summary table for place betting decisions.
 * Usage: npx tsx tools/batch-analyze.ts -d 2026-05-03 -v ST -r 1-11 -f all
 */

import { format, parse } from "date-fns";
import type { Race, Venue } from "../src/types/index.js";
import { RaceCardScraper } from "../src/scrapers/raceCard.js";
import { RaceCardHistoryScraper } from "../src/scrapers/raceCardHistory.js";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";
import { HorseDataEnricher } from "../src/data/horseEnricher.js";
import { JockeyEnricher } from "../src/data/jockeyEnricher.js";
import { TrainerEnricher } from "../src/data/trainerEnricher.js";

interface RaceSummary {
  raceNumber: number;
  topHorse: string;
  horseNumber: number;
  rating: number;
  avgDiff: number;
  close8: number;
  winProb: number;
  placeProb: number;
  confidence: string;
}

function parseCliArgs() {
  const args = process.argv.slice(2);
  let date = new Date();
  let venue: Venue = "Sha Tin";
  let raceRange = "1-11";
  let formData: "all" | undefined;
  let useSaved = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i], next = args[i + 1];
    if ((arg === "-d" || arg === "--date") && next) { date = parse(next, "yyyy-MM-dd", new Date()); i++; }
    else if ((arg === "-v" || arg === "--venue") && next) { venue = next.includes("Happy") ? "Happy Valley" : "Sha Tin"; i++; }
    else if ((arg === "-r" || arg === "--race") && next) { raceRange = next; i++; }
    else if ((arg === "-f" || arg === "--form-data") && next?.toLowerCase() === "all") { formData = "all"; i++; }
    else if (arg === "-s" || arg === "--use-saved") { useSaved = true; }
  }

  const [start, end] = raceRange.split("-").map(Number);
  const races = Array.from({ length: (end || start) - start + 1 }, (_, i) => start + i);

  return { date, venue, races, formData, useSaved };
}

async function main() {
  const { date, venue, races, formData, useSaved } = parseCliArgs();
  const formAnalyzer = new FormAnalyzer();
  const historyScraper = new RaceCardHistoryScraper();
  const hvStdDev = venue === "Happy Valley" ? 11 : 8;
  const results: RaceSummary[] = [];

  console.log(`\nBatch Analysis: ${format(date, "yyyy-MM-dd")} ${venue} R${races[0]}-R${races[races.length - 1]}`);
  console.log(`Form data: ${formData === "all" ? "all venues" : venue}\n`);

  let scraper: RaceCardScraper | null = null;
  let enricher: HorseDataEnricher | null = null;
  let jockeyEnricher: JockeyEnricher | null = null;
  let trainerEnricher: TrainerEnricher | null = null;

  try {
    if (!useSaved) {
      console.log("Loading historical data...");
      enricher = new HorseDataEnricher();
      await enricher.loadHistoricalData();

      scraper = new RaceCardScraper({ headless: true });
      await scraper.init();

      jockeyEnricher = new JockeyEnricher({ fetchFromHKJC: true });
      await jockeyEnricher.loadFromDirectory();

      trainerEnricher = new TrainerEnricher({ fetchFromHKJC: true });
      await trainerEnricher.loadFromDirectory();
    }

    for (const raceNum of races) {
      let race: Race | null = null;
      let winOddsMap = new Map<number, number>();

      if (useSaved) {
        const saved = await historyScraper.loadSavedRaceCard(date, venue, raceNum);
        if (saved) { race = saved.race; winOddsMap = saved.winOddsMap; }
      } else if (scraper && enricher) {
        try {
          const scraped = await scraper.scrapeRaceCard(date, venue, raceNum);
          if (scraped.entries.length > 0) {
            race = enricher.enrichRace(scraped, { formVenue: formData === "all" ? "all" : venue });
            race = await jockeyEnricher!.enrichRace(race);
            race = await trainerEnricher!.enrichRace(race);
            winOddsMap = await scraper.fetchCurrentOdds(date, venue, raceNum);
            await historyScraper.saveRaceCard(race, winOddsMap);
          }
        } catch (err) {
          console.log(`  R${raceNum}: scrape failed - ${err instanceof Error ? err.message : err}`);
          continue;
        }
      }

      if (!race || race.entries.length < 4) {
        console.log(`  R${raceNum}: no data`);
        continue;
      }

      const analyses = formAnalyzer.analyzeRace(race);
      if (analyses.length === 0) continue;

      const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
      const { results: simResults } = simulator.simulateRace(race);

      const top = analyses[0];
      const topRating = top.overallRating;
      const diffs = analyses.map(a => Math.abs(topRating - a.overallRating));
      const avgDiff = Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length);
      const close8 = diffs.filter(d => d < 8).length;

      const topEntry = race.entries.find(e => e.horse.code === top.horseCode);
      const topSim = simResults.find(s => s.horseCode === top.horseCode);

      const sparseFormCount = race.entries.filter(e =>
        !e.isScratched && (e.horse.pastPerformances?.length ?? 0) <= 1
      ).length;

      let confidence = "LOW";
      if (sparseFormCount > 3) confidence = "LOW (sparse form)";
      else if (avgDiff >= 20 && close8 <= 2) confidence = "SUPPER HIGH (avgDiff and close8)";
      else if (avgDiff >= 20) confidence = "HIGH (avgDiff)";
      else if (close8 <= 2) confidence = "HIGH (close8)";
      else if (topRating >= 70 && topRating <= 79) confidence = "MED-HIGH (topRating)";
      else if (avgDiff >= 16 && close8 <= 3) confidence = "MED-HIGH (avgDiff and close8)";
      else if (close8 <= 3) confidence = "MEDIUM (close8)";

      results.push({
        raceNumber: raceNum,
        topHorse: top.horseName.substring(0, 15),
        horseNumber: topEntry?.horseNumber ?? 0,
        rating: topRating,
        avgDiff,
        close8,
        winProb: topSim ? topSim.winProbability * 100 : 0,
        placeProb: topSim ? topSim.placeProbability * 100 : 0,
        confidence,
      });

      console.log(`  R${raceNum}: ${top.horseName.substring(0, 15)} (#${topEntry?.horseNumber}) rating=${topRating} avgDiff=${avgDiff} close<8=${close8} → ${confidence}`);
    }

    if (jockeyEnricher) await jockeyEnricher.closeBrowser();
    if (trainerEnricher) await trainerEnricher.closeBrowser();

    // Output table
    console.log("\n" + "═".repeat(90));
    console.log("PLACE BET SUMMARY — Top-rated horse per race");
    console.log("═".repeat(90));
    console.log(
      `${"Race".padEnd(5)} ${"Horse".padEnd(16)} ${"#".padStart(2)} ${"Rating".padStart(6)} ${"AvgDiff".padStart(7)} ${"Close<8".padStart(7)} ${"Win%".padStart(6)} ${"Plc%".padStart(6)} ${"Confidence".padStart(10)}`
    );
    console.log("─".repeat(90));

    for (const r of results) {
      console.log(
        `R${r.raceNumber.toString().padEnd(4)} ${r.topHorse.padEnd(16)} ${r.horseNumber.toString().padStart(2)} ${r.rating.toString().padStart(6)} ${r.avgDiff.toString().padStart(7)} ${r.close8.toString().padStart(7)} ${r.winProb.toFixed(1).padStart(6)} ${r.placeProb.toFixed(1).padStart(6)} ${r.confidence.padStart(10)}`
      );
    }
    console.log("─".repeat(90));

    const highConf = results.filter(r => r.confidence === "HIGH");
    const medHighConf = results.filter(r => r.confidence === "MED-HIGH");

    console.log("\n RECOMMENDED (>=70% expected place rate based on April backtest):");
    if (highConf.length > 0) {
      for (const r of highConf) {
        console.log(`  → R${r.raceNumber} #${r.horseNumber} ${r.topHorse} (Rating ${r.rating}, AvgDiff ${r.avgDiff}, Close<8 ${r.close8})`);
      }
    }
    if (medHighConf.length > 0) {
      console.log("\n BORDERLINE (~65% expected):");
      for (const r of medHighConf) {
        console.log(`  → R${r.raceNumber} #${r.horseNumber} ${r.topHorse} (Rating ${r.rating}, AvgDiff ${r.avgDiff}, Close<8 ${r.close8})`);
      }
    }
    if (highConf.length === 0 && medHighConf.length === 0) {
      console.log("  No races meet the >=70% confidence threshold today.");
    }

  } finally {
    if (scraper) await scraper.close();
  }
}

main().catch(console.error);
