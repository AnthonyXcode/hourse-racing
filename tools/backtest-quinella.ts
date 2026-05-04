#!/usr/bin/env tsx
/**
 * Backtest: Quinella betting strategy
 *
 * Picks top 5 in form ranking: #1 = banker, #2-#5 = legs.
 * Bet: Quinella banker (#1) with legs (#2-#5) = 4 combinations.
 * Hit: banker finishes 1st or 2nd AND one leg finishes in the other top-2 spot.
 * Skip rules same as backtest-differentiation.ts.
 */

import { readFile, readdir } from "fs/promises";
import path from "path";
import type { Race, RaceEntry } from "../src/types/index.js";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";

interface QnlResult {
  raceId: string;
  date: string;
  venue: string;
  raceNumber: number;
  bankerCode: string;
  bankerName: string;
  bankerNumber: number;
  legs: { code: string; name: string; number: number; rating: number }[];
  actualTop2Codes: string[];
  actualTop2Names: string[];
  avgDiff: number;
  horsesWithDiffLt8: number;
  sparseFormCount: number;
  topRating: number;
  skipped: boolean;
  skipReason: string;
  bankerInTop2: boolean;
  hit: boolean;
  hitLegNumber: number | null;
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
  let gapMin = 0;
  let pickNo = 5;
  let months: string[] = [];

  for (const arg of args) {
    const m = arg.match(/^--([\w-]+)=(.+)$/);
    if (!m) continue;
    const key = m[1].replace(/-/g, "");
    if (key === "sparse") sparseMax = parseInt(m[2], 10);
    else if (key === "close") closeMax = parseInt(m[2], 10);
    else if (key === "avgdiff") avgDiffMin = parseInt(m[2], 10);
    else if (key === "gap") gapMin = parseInt(m[2], 10);
    else if (key === "pickno") pickNo = parseInt(m[2], 10);
    else if (key === "months") months = m[2].split(",").map(s => s.trim().padStart(2, "0"));
  }

  return { sparseMax, closeMax, avgDiffMin, gapMin, pickNo, months };
}

async function main() {
  const { sparseMax, closeMax, avgDiffMin, gapMin, pickNo, months } = parseArgs();
  const legCount = pickNo - 1;
  const monthLabel = months.length === 0 ? "all" : months.join(",");
  console.log(`QUINELLA BACKTEST: Banker=#1 ranked, Legs=#2-#${pickNo} ranked (${legCount} combos)`);
  console.log(`Skip rules: sparse>${sparseMax}, close<8>${closeMax}, avgDiff<${avgDiffMin}, gap<${gapMin} | months=${monthLabel}\n`);

  const formAnalyzer = new FormAnalyzer();
  const raceCardDir = path.join(process.cwd(), "data", "racecards");

  const files = await readdir(raceCardDir);
  const monthPattern = months.length === 0
    ? /racecard_\d{8}_(ST|HV)_R\d+\.json/
    : new RegExp(`racecard_2026(${months.join("|")})\\d{2}_(ST|HV)_R\\d+\\.json`);
  const matchedFiles = files.filter(f => monthPattern.test(f)).sort();

  console.log(`Found ${matchedFiles.length} racecards (months=${monthLabel})\n`);

  const resultsCache = new Map<string, Map<number, FinishEntry[]>>();
  const allResults: QnlResult[] = [];

  for (const file of matchedFiles) {
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;

    const filePath = path.join(raceCardDir, file);
    const loaded = await loadRaceCard(filePath);
    if (!loaded) continue;

    const { race } = loaded;
    if (race.entries.length < 4) continue;

    const cacheKey = `${parsed.date}_${parsed.venue}`;
    if (!resultsCache.has(cacheKey)) {
      resultsCache.set(cacheKey, await loadResults(parsed.date, parsed.venue));
    }
    const meetingResults = resultsCache.get(cacheKey)!;
    const finishOrder = meetingResults.get(parsed.raceNumber);
    if (!finishOrder || finishOrder.length === 0) continue;

    const analyses = formAnalyzer.analyzeRace(race);
    if (analyses.length < 2) continue;

    const topRating = analyses[0].overallRating;
    const diffs = analyses.map(a => Math.abs(topRating - a.overallRating));
    const avgDiff = Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length);
    const horsesWithDiffLt8 = diffs.filter(d => d < 8).length;

    const sparseFormCount = race.entries.filter(e =>
      !e.isScratched && (e.horse.pastPerformances?.length ?? 0) <= 1
    ).length;

    const topGap = analyses.length >= 2
      ? Math.abs(analyses[0].overallRating - analyses[1].overallRating)
      : 999;

    let skipped = false;
    let skipReason = "";
    if (sparseFormCount > sparseMax) {
      skipped = true;
      skipReason = `${sparseFormCount} horses w/ 0-1 form`;
    } else if (topGap < gapMin) {
      skipped = true;
      skipReason = `1st-2nd gap=${topGap}`;
    } else if (horsesWithDiffLt8 > closeMax || avgDiff < avgDiffMin) {
      skipped = true;
      skipReason = horsesWithDiffLt8 > closeMax ? `close<8=${horsesWithDiffLt8}` : `avgDiff=${avgDiff}`;
    }

    const bankerAnalysis = analyses[0];
    const bankerEntry = race.entries.find(e => e.horse.code === bankerAnalysis.horseCode);

    const actualLegCount = Math.min(legCount, analyses.length - 1);
    const legs = analyses.slice(1, 1 + actualLegCount).map(a => {
      const entry = race.entries.find(e => e.horse.code === a.horseCode);
      return {
        code: a.horseCode,
        name: a.horseName,
        number: entry?.horseNumber ?? 0,
        rating: a.overallRating,
      };
    });

    const top2Codes = finishOrder.slice(0, 2).map(f => f.horseCode);
    const top2Names = finishOrder.slice(0, 2).map(f => f.horseName);

    const bankerInTop2 = top2Codes.includes(bankerAnalysis.horseCode);
    let hit = false;
    let hitLegNumber: number | null = null;

    if (bankerInTop2) {
      for (const leg of legs) {
        if (top2Codes.includes(leg.code)) {
          hit = true;
          hitLegNumber = leg.number;
          break;
        }
      }
    }

    allResults.push({
      raceId: `${parsed.date}_${parsed.venue === "Happy Valley" ? "HV" : "ST"}_R${parsed.raceNumber}`,
      date: parsed.date,
      venue: parsed.venue === "Happy Valley" ? "HV" : "ST",
      raceNumber: parsed.raceNumber,
      bankerCode: bankerAnalysis.horseCode,
      bankerName: bankerAnalysis.horseName,
      bankerNumber: bankerEntry?.horseNumber ?? 0,
      legs,
      actualTop2Codes: top2Codes,
      actualTop2Names: top2Names,
      avgDiff,
      horsesWithDiffLt8,
      sparseFormCount,
      topRating,
      skipped,
      skipReason,
      bankerInTop2,
      hit,
      hitLegNumber,
    });
  }

  const betted = allResults.filter(r => !r.skipped);
  const skippedRaces = allResults.filter(r => r.skipped);
  console.log(`Analyzed ${allResults.length} races — betting ${betted.length}, skipping ${skippedRaces.length}\n`);

  // --- Race-by-race table ---
  console.log("═".repeat(115));
  console.log(`QUINELLA: Banker=#1 + Legs=#2-#${pickNo} (${legCount} combos) | skip if sparse>${sparseMax} OR close<8>${closeMax} OR avgDiff<${avgDiffMin}`);
  console.log("═".repeat(115));
  console.log(
    `${"Race".padEnd(18)} ${"Banker".padEnd(16)} ${"#".padStart(2)} ${"Legs".padEnd(14)} ${"Bet".padStart(4)} ${"BkT2".padStart(4)} ${"Hit".padStart(4)} ${"AvgDiff".padStart(7)} ${"Close<8".padStart(7)} ${"Actual 1st-2nd".padEnd(20)}`
  );
  console.log("─".repeat(115));
  for (const r of allResults) {
    const bet = r.skipped ? "SKIP" : "BET";
    const bkT2 = r.skipped ? "-" : (r.bankerInTop2 ? "Y" : "N");
    const hit = r.skipped ? "-" : (r.hit ? "Y" : "N");
    const legsStr = r.legs.map(l => `#${l.number}`).join(",");
    const actualStr = `${r.actualTop2Names[0]?.substring(0, 9) ?? "?"} / ${r.actualTop2Names[1]?.substring(0, 9) ?? "?"}`;
    console.log(
      `${r.raceId.padEnd(18)} ${r.bankerName.substring(0, 15).padEnd(16)} ${r.bankerNumber.toString().padStart(2)} ${legsStr.padEnd(14)} ${bet.padStart(4)} ${bkT2.padStart(4)} ${hit.padStart(4)} ${r.avgDiff.toString().padStart(7)} ${r.horsesWithDiffLt8.toString().padStart(7)} ${actualStr.padEnd(20)}`
    );
  }
  console.log("─".repeat(115));

  // --- Summary ---
  const bettedHits = betted.filter(r => r.hit).length;
  const bettedBkT2 = betted.filter(r => r.bankerInTop2).length;
  const hitRate = betted.length > 0 ? (bettedHits / betted.length * 100).toFixed(1) : "0.0";
  const bkT2Rate = betted.length > 0 ? (bettedBkT2 / betted.length * 100).toFixed(1) : "0.0";
  console.log(`\nBetted: ${bettedHits}/${betted.length} quinella hit (${hitRate}%) | Banker top2: ${bettedBkT2}/${betted.length} (${bkT2Rate}%)`);
  console.log(`Skipped: ${skippedRaces.length} races`);

  // --- Per racing day ---
  console.log("\n" + "═".repeat(80));
  console.log("QUINELLA HIT RATE PER RACING DAY");
  console.log("═".repeat(80));
  const dayMap = new Map<string, QnlResult[]>();
  for (const r of allResults) {
    const key = `${r.date}_${r.venue}`;
    if (!dayMap.has(key)) dayMap.set(key, []);
    dayMap.get(key)!.push(r);
  }

  console.log(
    `${"Date".padEnd(12)} ${"Venue".padEnd(4)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"BkT2".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"BkT2Rate".padStart(8)}`
  );
  console.log("─".repeat(80));

  const sortedDays = [...dayMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  let totalBet = 0, totalHitSum = 0, totalBkT2Sum = 0;
  for (const [, races] of sortedDays) {
    const [dateStr, venue] = [races[0].date, races[0].venue];
    const dayBetted = races.filter(r => !r.skipped);
    const dayHits = dayBetted.filter(r => r.hit).length;
    const dayBkT2 = dayBetted.filter(r => r.bankerInTop2).length;
    const dayMiss = dayBetted.length - dayHits;
    const daySkip = races.length - dayBetted.length;
    const dayHitRate = dayBetted.length > 0 ? (dayHits / dayBetted.length * 100).toFixed(1) : "N/A";
    const dayBkT2Rate = dayBetted.length > 0 ? (dayBkT2 / dayBetted.length * 100).toFixed(1) : "N/A";
    const formattedDate = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
    console.log(
      `${formattedDate.padEnd(12)} ${venue.padEnd(4)} ${races.length.toString().padStart(5)} ${dayBetted.length.toString().padStart(4)} ${dayHits.toString().padStart(4)} ${dayBkT2.toString().padStart(4)} ${dayMiss.toString().padStart(4)} ${daySkip.toString().padStart(4)} ${(dayHitRate + "%").padStart(8)} ${(dayBkT2Rate + "%").padStart(8)}`
    );
    totalBet += dayBetted.length;
    totalHitSum += dayHits;
    totalBkT2Sum += dayBkT2;
  }
  console.log("─".repeat(80));
  const totalHitRate = totalBet > 0 ? (totalHitSum / totalBet * 100).toFixed(1) : "0.0";
  const totalBkT2Rate = totalBet > 0 ? (totalBkT2Sum / totalBet * 100).toFixed(1) : "0.0";
  console.log(
    `${"TOTAL".padEnd(12)} ${"".padEnd(4)} ${allResults.length.toString().padStart(5)} ${totalBet.toString().padStart(4)} ${totalHitSum.toString().padStart(4)} ${totalBkT2Sum.toString().padStart(4)} ${(totalBet - totalHitSum).toString().padStart(4)} ${(allResults.length - totalBet).toString().padStart(4)} ${(totalHitRate + "%").padStart(8)} ${(totalBkT2Rate + "%").padStart(8)}`
  );
}

main().catch(console.error);
