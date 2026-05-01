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

async function main() {
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
      topRatedWon: topRatedAnalysis.horseCode === winnerCode,
      topRatedPlaced: top3Codes.includes(topRatedAnalysis.horseCode),
      topSimWon: topSimResult.horseCode === winnerCode,
      topSimPlaced: top3Codes.includes(topSimResult.horseCode),
    });
  }

  console.log(`Analyzed ${allResults.length} races with results\n`);

  // --- Detailed table ---
  console.log("═".repeat(90));
  console.log("RACE-BY-RACE: TOP-RATED HORSE PLACE BET");
  console.log("═".repeat(90));
  console.log(
    `${"Race".padEnd(18)} ${"Horse".padEnd(16)} ${"#".padStart(2)} ${"Hit".padStart(4)} ${"AvgDiff".padStart(7)} ${"Close<8".padStart(7)} ${"Rating".padStart(6)} ${"Winner".padEnd(16)}`
  );
  console.log("─".repeat(90));
  for (const r of allResults) {
    const hit = r.topRatedPlaced ? "Y" : "-";
    console.log(
      `${r.raceId.padEnd(18)} ${r.topRatedHorseName.substring(0, 15).padEnd(16)} ${r.topRatedHorseNumber.toString().padStart(2)} ${hit.padStart(4)} ${r.avgDiff.toString().padStart(7)} ${r.horsesWithDiffLt8.toString().padStart(7)} ${r.overallRating.toString().padStart(6)} ${r.actualWinnerName.substring(0, 15).padEnd(16)}`
    );
  }
  console.log("─".repeat(90));
  const totalPlaces = allResults.filter(r => r.topRatedPlaced).length;
  console.log(`Total: ${totalPlaces}/${allResults.length} placed (${(totalPlaces / allResults.length * 100).toFixed(1)}%)\n`);

  console.log("═".repeat(70));
  console.log("DIFFERENTIATION vs HIT RATE ANALYSIS");
  console.log("═".repeat(70));

  // --- Summary by Avg Differentiation buckets ---
  console.log("\n1. AVG DIFFERENTIATION vs HIT RATE (top-rated horse)");
  console.log("─".repeat(70));
  const diffBuckets = [
    { label: "0-5  (very dominant)", min: 0, max: 5 },
    { label: "6-10 (clear leader)", min: 6, max: 10 },
    { label: "11-15 (moderate edge)", min: 11, max: 15 },
    { label: "16-20 (tight field)", min: 16, max: 20 },
    { label: "21+  (wide open)", min: 21, max: 999 },
  ];

  console.log(
    `${"Avg Diff".padEnd(25)} ${"Races".padStart(5)} ${"Win".padStart(5)} ${"Win%".padStart(6)} ${"Place".padStart(6)} ${"Plc%".padStart(6)}`
  );
  for (const bucket of diffBuckets) {
    const races = allResults.filter(r => r.avgDiff >= bucket.min && r.avgDiff <= bucket.max);
    const wins = races.filter(r => r.topRatedWon).length;
    const places = races.filter(r => r.topRatedPlaced).length;
    const winRate = races.length > 0 ? ((wins / races.length) * 100).toFixed(1) : "N/A";
    const placeRate = races.length > 0 ? ((places / races.length) * 100).toFixed(1) : "N/A";
    console.log(
      `${bucket.label.padEnd(25)} ${races.length.toString().padStart(5)} ${wins.toString().padStart(5)} ${winRate.padStart(6)} ${places.toString().padStart(6)} ${placeRate.padStart(6)}`
    );
  }

  // --- Summary by Horses with diff < 8 ---
  console.log("\n2. HORSES WITH DIFF < 8 vs HIT RATE (top-rated horse)");
  console.log("─".repeat(70));
  const closeBuckets = [
    { label: "1 horse  (standout)", min: 1, max: 1 },
    { label: "2 horses (dual threat)", min: 2, max: 2 },
    { label: "3 horses (open top 3)", min: 3, max: 3 },
    { label: "4+ horses (very open)", min: 4, max: 99 },
  ];

  console.log(
    `${"Horses w/ diff<8".padEnd(25)} ${"Races".padStart(5)} ${"Win".padStart(5)} ${"Win%".padStart(6)} ${"Place".padStart(6)} ${"Plc%".padStart(6)}`
  );
  for (const bucket of closeBuckets) {
    const races = allResults.filter(r => r.horsesWithDiffLt8 >= bucket.min && r.horsesWithDiffLt8 <= bucket.max);
    const wins = races.filter(r => r.topRatedWon).length;
    const places = races.filter(r => r.topRatedPlaced).length;
    const winRate = races.length > 0 ? ((wins / races.length) * 100).toFixed(1) : "N/A";
    const placeRate = races.length > 0 ? ((places / races.length) * 100).toFixed(1) : "N/A";
    console.log(
      `${bucket.label.padEnd(25)} ${races.length.toString().padStart(5)} ${wins.toString().padStart(5)} ${winRate.padStart(6)} ${places.toString().padStart(6)} ${placeRate.padStart(6)}`
    );
  }

  // --- Combined: Avg Diff + Horses with diff < 8 ---
  console.log("\n3. COMBINED: AVG DIFF + HORSES WITH DIFF < 8 vs HIT RATE");
  console.log("─".repeat(70));
  const comboBuckets = [
    { label: "AvgDiff<=10 & Close<=2", diffMax: 10, closeMax: 2 },
    { label: "AvgDiff<=10 & Close>=3", diffMax: 10, closeMin: 3 },
    { label: "AvgDiff 11-15 & Close<=2", diffMin: 11, diffMax: 15, closeMax: 2 },
    { label: "AvgDiff 11-15 & Close>=3", diffMin: 11, diffMax: 15, closeMin: 3 },
    { label: "AvgDiff>=16 & Close<=2", diffMin: 16, closeMax: 2 },
    { label: "AvgDiff>=16 & Close>=3", diffMin: 16, closeMin: 3 },
  ];

  console.log(
    `${"Condition".padEnd(30)} ${"Races".padStart(5)} ${"Win".padStart(5)} ${"Win%".padStart(6)} ${"Place".padStart(6)} ${"Plc%".padStart(6)}`
  );
  for (const bucket of comboBuckets) {
    const races = allResults.filter(r => {
      const diffOk = (bucket.diffMin === undefined || r.avgDiff >= bucket.diffMin) &&
                     (bucket.diffMax === undefined || r.avgDiff <= bucket.diffMax);
      const closeOk = (bucket.closeMin === undefined || r.horsesWithDiffLt8 >= bucket.closeMin) &&
                      (bucket.closeMax === undefined || r.horsesWithDiffLt8 <= bucket.closeMax);
      return diffOk && closeOk;
    });
    const wins = races.filter(r => r.topRatedWon).length;
    const places = races.filter(r => r.topRatedPlaced).length;
    const winRate = races.length > 0 ? ((wins / races.length) * 100).toFixed(1) : "N/A";
    const placeRate = races.length > 0 ? ((places / races.length) * 100).toFixed(1) : "N/A";
    console.log(
      `${bucket.label.padEnd(30)} ${races.length.toString().padStart(5)} ${wins.toString().padStart(5)} ${winRate.padStart(6)} ${places.toString().padStart(6)} ${placeRate.padStart(6)}`
    );
  }

  // --- Sim top pick comparison ---
  console.log("\n4. SIMULATION TOP PICK vs FORM TOP PICK");
  console.log("─".repeat(70));
  const sameTopPick = allResults.filter(r => r.topRatedHorseCode === r.topSimHorseCode);
  const diffTopPick = allResults.filter(r => r.topRatedHorseCode !== r.topSimHorseCode);
  console.log(
    `${"".padEnd(25)} ${"Races".padStart(5)} ${"Win".padStart(5)} ${"Win%".padStart(6)} ${"Place".padStart(6)} ${"Plc%".padStart(6)}`
  );
  const sameWins = sameTopPick.filter(r => r.topRatedWon).length;
  const samePlaces = sameTopPick.filter(r => r.topRatedPlaced).length;
  console.log(
    `${"Same top pick".padEnd(25)} ${sameTopPick.length.toString().padStart(5)} ${sameWins.toString().padStart(5)} ${(sameTopPick.length > 0 ? (sameWins / sameTopPick.length * 100).toFixed(1) : "N/A").padStart(6)} ${samePlaces.toString().padStart(6)} ${(sameTopPick.length > 0 ? (samePlaces / sameTopPick.length * 100).toFixed(1) : "N/A").padStart(6)}`
  );
  const diffWins = diffTopPick.filter(r => r.topSimWon).length;
  const diffPlaces = diffTopPick.filter(r => r.topSimPlaced).length;
  console.log(
    `${"Sim top (when different)".padEnd(25)} ${diffTopPick.length.toString().padStart(5)} ${diffWins.toString().padStart(5)} ${(diffTopPick.length > 0 ? (diffWins / diffTopPick.length * 100).toFixed(1) : "N/A").padStart(6)} ${diffPlaces.toString().padStart(6)} ${(diffTopPick.length > 0 ? (diffPlaces / diffTopPick.length * 100).toFixed(1) : "N/A").padStart(6)}`
  );
  const diffFormWins = diffTopPick.filter(r => r.topRatedWon).length;
  const diffFormPlaces = diffTopPick.filter(r => r.topRatedPlaced).length;
  console.log(
    `${"Form top (when different)".padEnd(25)} ${diffTopPick.length.toString().padStart(5)} ${diffFormWins.toString().padStart(5)} ${(diffTopPick.length > 0 ? (diffFormWins / diffTopPick.length * 100).toFixed(1) : "N/A").padStart(6)} ${diffFormPlaces.toString().padStart(6)} ${(diffTopPick.length > 0 ? (diffFormPlaces / diffTopPick.length * 100).toFixed(1) : "N/A").padStart(6)}`
  );

  // --- Overall summary ---
  console.log("\n" + "═".repeat(70));
  console.log("OVERALL SUMMARY");
  console.log("═".repeat(70));
  const totalWins = allResults.filter(r => r.topRatedWon).length;
  console.log(`Total races: ${allResults.length}`);
  console.log(`Top-rated win rate: ${totalWins}/${allResults.length} (${(totalWins / allResults.length * 100).toFixed(1)}%)`);
  console.log(`Top-rated place rate: ${totalPlaces}/${allResults.length} (${(totalPlaces / allResults.length * 100).toFixed(1)}%)`);

  const simWins = allResults.filter(r => r.topSimWon).length;
  const simPlaces = allResults.filter(r => r.topSimPlaced).length;
  console.log(`Sim-top win rate: ${simWins}/${allResults.length} (${(simWins / allResults.length * 100).toFixed(1)}%)`);
  console.log(`Sim-top place rate: ${simPlaces}/${allResults.length} (${(simPlaces / allResults.length * 100).toFixed(1)}%)`);

  // --- Find >70% place hit rate ranges ---
  console.log("\n" + "═".repeat(70));
  console.log("FINDING >70% PLACE HIT RATE RANGES");
  console.log("═".repeat(70));

  console.log("\nBy AvgDiff (fine-grained):");
  console.log(`${"Range".padEnd(20)} ${"Races".padStart(5)} ${"Hit".padStart(4)} ${"Plc%".padStart(6)}`);
  for (let low = 16; low <= 40; low += 2) {
    const high = low + 3;
    const races = allResults.filter(r => r.avgDiff >= low && r.avgDiff <= high);
    if (races.length < 3) continue;
    const hits = races.filter(r => r.topRatedPlaced).length;
    const rate = (hits / races.length * 100).toFixed(1);
    const marker = hits / races.length >= 0.7 ? " <<<" : "";
    console.log(`AvgDiff ${low}-${high}`.padEnd(20) + `${races.length.toString().padStart(5)} ${hits.toString().padStart(4)} ${rate.padStart(6)}${marker}`);
  }

  console.log("\nBy Horses with diff<8:");
  console.log(`${"Close<8".padEnd(20)} ${"Races".padStart(5)} ${"Hit".padStart(4)} ${"Plc%".padStart(6)}`);
  for (let c = 1; c <= 5; c++) {
    const races = allResults.filter(r => r.horsesWithDiffLt8 === c);
    if (races.length === 0) continue;
    const hits = races.filter(r => r.topRatedPlaced).length;
    const rate = (hits / races.length * 100).toFixed(1);
    const marker = hits / races.length >= 0.7 ? " <<<" : "";
    console.log(`${c} horse(s)`.padEnd(20) + `${races.length.toString().padStart(5)} ${hits.toString().padStart(4)} ${rate.padStart(6)}${marker}`);
  }

  console.log("\nBy Rating of top horse:");
  console.log(`${"Rating".padEnd(20)} ${"Races".padStart(5)} ${"Hit".padStart(4)} ${"Plc%".padStart(6)}`);
  for (let low = 30; low <= 80; low += 5) {
    const high = low + 4;
    const races = allResults.filter(r => r.overallRating >= low && r.overallRating <= high);
    if (races.length < 3) continue;
    const hits = races.filter(r => r.topRatedPlaced).length;
    const rate = (hits / races.length * 100).toFixed(1);
    const marker = hits / races.length >= 0.7 ? " <<<" : "";
    console.log(`Rating ${low}-${high}`.padEnd(20) + `${races.length.toString().padStart(5)} ${hits.toString().padStart(4)} ${rate.padStart(6)}${marker}`);
  }

  console.log("\nCombined filters (>= 3 races, sorted by place rate):");
  console.log(`${"Condition".padEnd(40)} ${"Races".padStart(5)} ${"Hit".padStart(4)} ${"Plc%".padStart(6)}`);
  interface FilterResult { label: string; races: number; hits: number; rate: number }
  const filters: FilterResult[] = [];

  for (let diffMax = 20; diffMax <= 35; diffMax += 5) {
    for (let close = 1; close <= 2; close++) {
      const races = allResults.filter(r => r.avgDiff <= diffMax && r.horsesWithDiffLt8 <= close);
      if (races.length < 3) continue;
      const hits = races.filter(r => r.topRatedPlaced).length;
      filters.push({ label: `AvgDiff<=${diffMax} & Close<8<=${close}`, races: races.length, hits, rate: hits / races.length });
    }
  }
  for (let ratingMin = 40; ratingMin <= 65; ratingMin += 5) {
    for (let close = 1; close <= 2; close++) {
      const races = allResults.filter(r => r.overallRating >= ratingMin && r.horsesWithDiffLt8 <= close);
      if (races.length < 3) continue;
      const hits = races.filter(r => r.topRatedPlaced).length;
      filters.push({ label: `Rating>=${ratingMin} & Close<8<=${close}`, races: races.length, hits, rate: hits / races.length });
    }
  }
  for (let ratingMin = 40; ratingMin <= 65; ratingMin += 5) {
    for (let diffMax = 20; diffMax <= 35; diffMax += 5) {
      const races = allResults.filter(r => r.overallRating >= ratingMin && r.avgDiff <= diffMax);
      if (races.length < 3) continue;
      const hits = races.filter(r => r.topRatedPlaced).length;
      filters.push({ label: `Rating>=${ratingMin} & AvgDiff<=${diffMax}`, races: races.length, hits, rate: hits / races.length });
    }
  }

  filters.sort((a, b) => b.rate - a.rate);
  for (const f of filters.slice(0, 20)) {
    const marker = f.rate >= 0.7 ? " <<<" : "";
    console.log(`${f.label.padEnd(40)} ${f.races.toString().padStart(5)} ${f.hits.toString().padStart(4)} ${(f.rate * 100).toFixed(1).padStart(6)}${marker}`);
  }
}

main().catch(console.error);
