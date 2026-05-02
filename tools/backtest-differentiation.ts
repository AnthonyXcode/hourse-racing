#!/usr/bin/env tsx
/**
 * Backtest: Avg Differentiation & Horses-with-diff-<8 vs Hit Rate
 *
 * Runs form analysis on all saved April 2026 racecards, compares the
 * top-rated horse against actual results, and groups races by differentiation
 * metrics to find patterns.
 */

import { readFile, readdir } from "fs/promises";
import path from "path";
import type { Race, RaceEntry } from "../src/types/index.js";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";

interface RaceResult {
  raceId: string;
  date: string;
  venue: string;
  raceNumber: number;
  topRatedHorseCode: string;
  topRatedHorseName: string;
  topRatedHorseNumber: number;
  topSimHorseCode: string;
  topSimHorseName: string;
  topSimHorseNumber: number;
  actualWinnerCode: string;
  actualWinnerName: string;
  actualWinnerNumber: number;
  actualTop3Codes: string[];
  overallRating: number;
  avgDiff: number;
  horsesWithDiffLt8: number;
  sparseFormCount: number;
  skipped: boolean;
  skipReason: string;
  topRatedWon: boolean;
  topRatedPlaced: boolean;
  topSimWon: boolean;
  topSimPlaced: boolean;
}

interface FinishEntry {
  horseNumber: number;
  finishPosition: number;
  horseName: string;
  horseCode: string;
}

interface ResultsFile {
  id: string;
  raceNumber: number;
  finishOrder: FinishEntry[];
}

async function loadResults(dateStr: string, venue: string): Promise<Map<number, FinishEntry[]>> {
  const venueSuffix = venue === "Happy Valley" ? "HV" : "ST";
  const fileName = `results_${dateStr}_${venueSuffix}.json`;
  const filePath = path.join(process.cwd(), "data", "historical", fileName);

  try {
    const raw = await readFile(filePath, "utf-8");
    const races = JSON.parse(raw) as ResultsFile[];
    const map = new Map<number, FinishEntry[]>();
    for (const race of races) {
      map.set(race.raceNumber, race.finishOrder ?? []);
    }
    return map;
  } catch {
    return new Map();
  }
}

async function loadRaceCard(filePath: string): Promise<{ race: Race; winOddsMap: Map<number, number> } | null> {
  try {
    const raw = await readFile(filePath, "utf-8");
    const saved = JSON.parse(raw);

    const race: Race = {
      ...saved.race,
      date: new Date(saved.race.date),
      entries: saved.race.entries.map((e: RaceEntry) => ({
        ...e,
        horse: {
          ...e.horse,
          pastPerformances: (e.horse.pastPerformances ?? []).map(
            (pp: any) => ({ ...pp, date: new Date(pp.date) })
          ),
        },
      })),
    } as Race;

    const winOddsMap = new Map<number, number>();
    for (const [num, odds] of Object.entries(saved.winOdds ?? {})) {
      winOddsMap.set(Number(num), odds as number);
    }

    return { race, winOddsMap };
  } catch {
    return null;
  }
}

function parseRaceCardFileName(name: string): { date: string; venue: string; raceNumber: number } | null {
  const match = name.match(/racecard_(\d{8})_(ST|HV)_R(\d+)\.json/);
  if (!match) return null;
  return {
    date: match[1],
    venue: match[2] === "HV" ? "Happy Valley" : "Sha Tin",
    raceNumber: parseInt(match[3], 10),
  };
}

function parseArgs() {
  const args = process.argv.slice(2);
  let sparseMax = 3;
  let closeMax = 4;
  let avgDiffMin = 14;

  for (const arg of args) {
    const m = arg.match(/^--(\w+)=(.+)$/);
    if (!m) continue;
    if (m[1] === "sparse") sparseMax = parseInt(m[2], 10);
    else if (m[1] === "close") closeMax = parseInt(m[2], 10);
    else if (m[1] === "avgdiff") avgDiffMin = parseInt(m[2], 10);
  }

  return { sparseMax, closeMax, avgDiffMin };
}

async function main() {
  const { sparseMax, closeMax, avgDiffMin } = parseArgs();
  console.log(`Skip rules: sparse form > ${sparseMax}, close<8 > ${closeMax}, avgDiff < ${avgDiffMin}\n`);

  const formAnalyzer = new FormAnalyzer();
  const raceCardDir = path.join(process.cwd(), "data", "racecards");

  const files = await readdir(raceCardDir);
  const aprilFiles = files
    .filter(f => f.match(/racecard_202604\d{2}_(ST|HV)_R\d+\.json/))
    .sort();

  console.log(`Found ${aprilFiles.length} April 2026 racecards\n`);

  const resultsCache = new Map<string, Map<number, FinishEntry[]>>();
  const allResults: RaceResult[] = [];

  for (const file of aprilFiles) {
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;

    const filePath = path.join(raceCardDir, file);
    const loaded = await loadRaceCard(filePath);
    if (!loaded) continue;

    const { race } = loaded;
    if (race.entries.length < 4) continue;

    const cacheKey = `${parsed.date}_${parsed.venue}`;
    if (!resultsCache.has(cacheKey)) {
      const venueSuffix = parsed.venue === "Happy Valley" ? "HV" : "ST";
      resultsCache.set(cacheKey, await loadResults(parsed.date, parsed.venue));
    }
    const meetingResults = resultsCache.get(cacheKey)!;
    const finishOrder = meetingResults.get(parsed.raceNumber);
    if (!finishOrder || finishOrder.length === 0) continue;

    const analyses = formAnalyzer.analyzeRace(race);
    if (analyses.length === 0) continue;

    const topRating = analyses[0].overallRating;
    const diffs = analyses.map(a => Math.abs(topRating - a.overallRating));
    const avgDiff = Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length);
    const horsesWithDiffLt8 = diffs.filter(d => d < 8).length;

    const sparseFormCount = race.entries.filter(e =>
      !e.isScratched && (e.horse.pastPerformances?.length ?? 0) <= 1
    ).length;

    let skipped = false;
    let skipReason = "";
    if (sparseFormCount > sparseMax) {
      skipped = true;
      skipReason = `${sparseFormCount} horses w/ 0-1 form`;
    } else if (horsesWithDiffLt8 > closeMax || avgDiff < avgDiffMin) {
      skipped = true;
      skipReason = horsesWithDiffLt8 > closeMax ? `close<8=${horsesWithDiffLt8}` : `avgDiff=${avgDiff}`;
    }

    const topRatedAnalysis = analyses[0];
    const topRatedEntry = race.entries.find(e => e.horse.code === topRatedAnalysis.horseCode);

    const hvStdDev = parsed.venue === "Happy Valley" ? 11 : 8;
    const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
    const { results: simResults } = simulator.simulateRace(race);
    const topSimResult = simResults[0];

    const winnerCode = finishOrder[0]?.horseCode ?? "";
    const top3Codes = finishOrder.slice(0, 3).map(f => f.horseCode);

    allResults.push({
      raceId: `${parsed.date}_${parsed.venue === "Happy Valley" ? "HV" : "ST"}_R${parsed.raceNumber}`,
      date: parsed.date,
      venue: parsed.venue === "Happy Valley" ? "HV" : "ST",
      raceNumber: parsed.raceNumber,
      topRatedHorseCode: topRatedAnalysis.horseCode,
      topRatedHorseName: topRatedAnalysis.horseName,
      topRatedHorseNumber: topRatedEntry?.horseNumber ?? 0,
      topSimHorseCode: topSimResult.horseCode,
      topSimHorseName: topSimResult.horseName,
      topSimHorseNumber: topSimResult.horseNumber,
      actualWinnerCode: winnerCode,
      actualWinnerName: finishOrder[0]?.horseName ?? "",
      actualWinnerNumber: finishOrder[0]?.horseNumber ?? 0,
      actualTop3Codes: top3Codes,
      overallRating: topRating,
      avgDiff,
      horsesWithDiffLt8,
      sparseFormCount,
      skipped,
      skipReason,
      topRatedWon: topRatedAnalysis.horseCode === winnerCode,
      topRatedPlaced: top3Codes.includes(topRatedAnalysis.horseCode),
      topSimWon: topSimResult.horseCode === winnerCode,
      topSimPlaced: top3Codes.includes(topSimResult.horseCode),
    });
  }

  const betted = allResults.filter(r => !r.skipped);
  const skippedRaces = allResults.filter(r => r.skipped);
  console.log(`Analyzed ${allResults.length} races — betting ${betted.length}, skipping ${skippedRaces.length}\n`);

  // --- Race-by-race table with strategy ---
  console.log("═".repeat(100));
  console.log(`PLACE BET STRATEGY: Pick 1st in ranking, skip if sparse>${sparseMax} OR close<8>${closeMax} OR avgDiff<${avgDiffMin}`);
  console.log("═".repeat(100));
  console.log(
    `${"Race".padEnd(18)} ${"Horse".padEnd(16)} ${"#".padStart(2)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"AvgDiff".padStart(7)} ${"Close<8".padStart(7)} ${"Sparse".padStart(6)} ${"Rating".padStart(6)} ${"Winner".padEnd(16)}`
  );
  console.log("─".repeat(100));
  for (const r of allResults) {
    const bet = r.skipped ? "SKIP" : "BET";
    const hit = r.skipped ? "-" : (r.topRatedPlaced ? "Y" : "N");
    console.log(
      `${r.raceId.padEnd(18)} ${r.topRatedHorseName.substring(0, 15).padEnd(16)} ${r.topRatedHorseNumber.toString().padStart(2)} ${bet.padStart(4)} ${hit.padStart(4)} ${r.avgDiff.toString().padStart(7)} ${r.horsesWithDiffLt8.toString().padStart(7)} ${r.sparseFormCount.toString().padStart(6)} ${r.overallRating.toString().padStart(6)} ${r.actualWinnerName.substring(0, 15).padEnd(16)}`
    );
  }
  console.log("─".repeat(100));

  const bettedHits = betted.filter(r => r.topRatedPlaced).length;
  const bettedRate = betted.length > 0 ? (bettedHits / betted.length * 100).toFixed(1) : "0.0";
  console.log(`\nBetted: ${bettedHits}/${betted.length} placed (${bettedRate}%)`);
  console.log(`Skipped: ${skippedRaces.length} races`);
  const allPlaces = allResults.filter(r => r.topRatedPlaced).length;
  console.log(`Without filter: ${allPlaces}/${allResults.length} placed (${(allPlaces / allResults.length * 100).toFixed(1)}%)`);

  // --- Per racing day hit rate ---
  console.log("\n" + "═".repeat(70));
  console.log("HIT RATE PER RACING DAY");
  console.log("═".repeat(70));
  const dayMap = new Map<string, RaceResult[]>();
  for (const r of allResults) {
    const key = `${r.date}_${r.venue}`;
    if (!dayMap.has(key)) dayMap.set(key, []);
    dayMap.get(key)!.push(r);
  }

  console.log(
    `${"Date".padEnd(12)} ${"Venue".padEnd(4)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)}`
  );
  console.log("─".repeat(70));

  const sortedDays = [...dayMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  let totalBet = 0, totalHit = 0;
  for (const [key, races] of sortedDays) {
    const [dateStr, venue] = [races[0].date, races[0].venue];
    const dayBetted = races.filter(r => !r.skipped);
    const dayHits = dayBetted.filter(r => r.topRatedPlaced).length;
    const dayMiss = dayBetted.length - dayHits;
    const daySkip = races.length - dayBetted.length;
    const dayRate = dayBetted.length > 0 ? (dayHits / dayBetted.length * 100).toFixed(1) : "N/A";
    const formattedDate = `${dateStr.slice(0,4)}-${dateStr.slice(4,6)}-${dateStr.slice(6,8)}`;
    console.log(
      `${formattedDate.padEnd(12)} ${venue.padEnd(4)} ${races.length.toString().padStart(5)} ${dayBetted.length.toString().padStart(4)} ${dayHits.toString().padStart(4)} ${dayMiss.toString().padStart(4)} ${daySkip.toString().padStart(4)} ${(dayRate + "%").padStart(8)}`
    );
    totalBet += dayBetted.length;
    totalHit += dayHits;
  }
  console.log("─".repeat(70));
  const overallRate = totalBet > 0 ? (totalHit / totalBet * 100).toFixed(1) : "0.0";
  console.log(
    `${"TOTAL".padEnd(12)} ${"".padEnd(4)} ${allResults.length.toString().padStart(5)} ${totalBet.toString().padStart(4)} ${totalHit.toString().padStart(4)} ${(totalBet - totalHit).toString().padStart(4)} ${(allResults.length - totalBet).toString().padStart(4)} ${(overallRate + "%").padStart(8)}`
  );
}

main().catch(console.error);
