#!/usr/bin/env tsx
/**
 * Backtest: Trio (Any Order) Hit Rate — Single Banker Structure
 *
 * Banker  = MC rank #1 (must finish top-3 for a hit).
 * Legs    = MC ranks #2 … #N  (pick-no − 1 horses).
 * Bet     = banker × C(legs, 2)  combinations, each $10.
 * Hit     = banker is in actual top-3  AND  both other actual top-3 horses
 *           are in the legs pool.
 *
 * Uses the same skip rules as backtest-differentiation.ts:
 *   --sparse, --close, --avgdiff, --gap, --months, --venue, --surface,
 *   --ignore-class, --ignore-distance
 *
 * Additional param:
 *   --pick-no=N   Total horses selected (1 banker + N−1 legs, default: 5)
 *                 Combinations: C(N−1,2) — 3→1, 4→3, 5→6, 6→10, 7→15, 8→21
 */

import { readFile, readdir } from "fs/promises";
import path from "path";
import type { Race, RaceEntry } from "../src/types/index.js";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

interface RaceResult {
  raceId: string;
  date: string;
  venue: string;
  raceNumber: number;
  numRunners: number;
  surface: string;
  raceClass: string;
  distance: number;
  // Skip logic
  skipped: boolean;
  skipReason: string;
  avgDiff: number;
  horsesWithDiffLt8: number;
  sparseFormCount: number;
  // Trio selection (banker structure)
  pickNo: number;
  bankerCode: string;            // MC rank #1
  bankerNumber: number;
  legCodes: string[];            // MC ranks #2…#N
  legNumbers: number[];
  pickedHorseCodes: string[];    // banker + legs (all N)
  pickedHorseNumbers: number[];
  actualTop3Codes: string[];
  actualTop3Numbers: number[];
  actualWinnerName: string;
  bankerHit: boolean;            // banker finished top-3?
  legsCoverage: number;          // how many of the 2 non-banker top-3 are in legs (0-2)
  trioHit: boolean;              // bankerHit && legsCoverage === 2
  combinations: number;          // C(pickNo-1, 2)
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function comb(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
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

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  let sparseMax = 3;
  let closeMax = 4;
  let avgDiffMin = 14;
  let gapMin = 0;
  let months: string[] = [];
  let venue: "ST" | "HV" | null = null;
  let surface: "Turf" | "AWT" | null = null;
  let ignoreClasses: string[] = [];
  let ignoreDistances: number[] = [];
  let pickNo = 5;

  for (const arg of args) {
    const m = arg.match(/^--([a-zA-Z-]+)=(.+)$/);
    if (!m) continue;
    const key = m[1];
    const val = m[2];
    if (key === "sparse") sparseMax = parseInt(val, 10);
    else if (key === "close") closeMax = parseInt(val, 10);
    else if (key === "avgdiff") avgDiffMin = parseInt(val, 10);
    else if (key === "gap") gapMin = parseInt(val, 10);
    else if (key === "months") months = val.split(",").map(s => s.trim().padStart(2, "0"));
    else if (key === "venue") venue = val.toUpperCase() === "HV" ? "HV" : "ST";
    else if (key === "surface") surface = val.toUpperCase() === "AWT" ? "AWT" : "Turf";
    else if (key === "ignore-class") ignoreClasses = val.split(",").map(s => s.trim().toUpperCase());
    else if (key === "ignore-distance") ignoreDistances = val.split(",").map(s => parseInt(s.trim(), 10));
    else if (key === "pick-no") pickNo = parseInt(val, 10);
  }

  return { sparseMax, closeMax, avgDiffMin, gapMin, months, venue, surface, ignoreClasses, ignoreDistances, pickNo };
}

// ---------------------------------------------------------------------------
// Breakdown printer
// ---------------------------------------------------------------------------

function printBreakdown(
  label: string,
  groups: Map<string, RaceResult[]>,
  unitCost: number
) {
  const W = 75;
  console.log("\n" + "═".repeat(W));
  console.log(`HIT RATE BY ${label}`);
  console.log("═".repeat(W));
  console.log(
    `${"Group".padEnd(14)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"Staked".padStart(8)} ${"Break-even".padStart(11)}`
  );
  console.log("─".repeat(W));
  let gTotalRaces = 0, gTotalBet = 0, gTotalHit = 0;
  for (const [key, races] of [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const gb = races.filter(r => !r.skipped);
    const gh = gb.filter(r => r.trioHit).length;
    const staked = gb.reduce((s, r) => s + r.combinations * 10, 0);
    const rate = gb.length > 0 ? (gh / gb.length * 100).toFixed(1) + "%" : "N/A";
    // Break-even dividend needed: staked / hits (if hits > 0)
    const breakEven = gh > 0 ? `$${(staked / gh).toFixed(0)}` : "∞";
    console.log(
      `${key.substring(0, 13).padEnd(14)} ${races.length.toString().padStart(5)} ${gb.length.toString().padStart(4)} ${gh.toString().padStart(4)} ${(gb.length - gh).toString().padStart(4)} ${(races.length - gb.length).toString().padStart(4)} ${rate.padStart(8)} ${("$" + staked).padStart(8)} ${breakEven.padStart(11)}`
    );
    gTotalRaces += races.length;
    gTotalBet += gb.length;
    gTotalHit += gh;
  }
  console.log("─".repeat(W));
  const totalRate = gTotalBet > 0 ? (gTotalHit / gTotalBet * 100).toFixed(1) + "%" : "0.0%";
  const totalStaked = gTotalBet * unitCost;
  const totalBreakEven = gTotalHit > 0 ? `$${(totalStaked / gTotalHit).toFixed(0)}` : "∞";
  console.log(
    `${"TOTAL".padEnd(14)} ${gTotalRaces.toString().padStart(5)} ${gTotalBet.toString().padStart(4)} ${gTotalHit.toString().padStart(4)} ${(gTotalBet - gTotalHit).toString().padStart(4)} ${(gTotalRaces - gTotalBet).toString().padStart(4)} ${totalRate.padStart(8)} ${("$" + totalStaked).padStart(8)} ${totalBreakEven.padStart(11)}`
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { sparseMax, closeMax, avgDiffMin, gapMin, months, venue, surface, ignoreClasses, ignoreDistances, pickNo } = parseArgs();

  if (pickNo < 3) {
    console.error("--pick-no must be >= 3 (1 banker + at least 2 legs)");
    process.exit(1);
  }

  // Banker structure: 1 banker fixed, pick 2 from (pickNo-1) legs
  const combos = comb(pickNo - 1, 2);
  const unitCost = combos * 10;

  const monthLabel = months.length === 0 ? "all" : months.join(",");
  const venueLabel = venue ?? "all";
  const surfaceLabel = surface ?? "all";
  console.log(`Trio Backtest (BANKER) — pick-no=${pickNo} | 1 banker + ${pickNo - 1} legs | C(${pickNo - 1},2)=${combos} combos | $${unitCost}/race`);
  console.log(`Skip rules: sparse>${sparseMax}, close<8>${closeMax}, avgDiff<${avgDiffMin}, gap<${gapMin}`);
  console.log(`Filters: months=${monthLabel} | venue=${venueLabel} | surface=${surfaceLabel}`);
  if (ignoreClasses.length > 0) console.log(`  ignore-class: ${ignoreClasses.join(",")}`);
  if (ignoreDistances.length > 0) console.log(`  ignore-distance: ${ignoreDistances.join(",")}`);
  console.log();

  const formAnalyzer = new FormAnalyzer();
  const raceCardDir = path.join(process.cwd(), "data", "racecards");

  const files = await readdir(raceCardDir);
  const venueSegment = venue ?? "ST|HV";
  const monthPattern = months.length === 0
    ? new RegExp(`racecard_\\d{8}_(${venueSegment})_R\\d+\\.json`)
    : new RegExp(`racecard_2026(${months.join("|")})\\d{2}_(${venueSegment})_R\\d+\\.json`);
  const matchedFiles = files.filter(f => monthPattern.test(f)).sort();

  console.log(`Found ${matchedFiles.length} racecards (months=${monthLabel}, venue=${venueLabel})\n`);

  const resultsCache = new Map<string, Map<number, FinishEntry[]>>();
  const allResults: RaceResult[] = [];

  for (const file of matchedFiles) {
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;

    const filePath = path.join(raceCardDir, file);
    const loaded = await loadRaceCard(filePath);
    if (!loaded) continue;

    const { race } = loaded;
    const numRunners = race.entries.filter(e => !e.isScratched).length;
    if (numRunners < 3) continue;   // Trio needs ≥3
    if (surface && race.surface !== surface) continue;
    if (ignoreClasses.length > 0 && ignoreClasses.includes((race.class ?? "").toUpperCase())) continue;
    if (ignoreDistances.length > 0 && ignoreDistances.includes(race.distance)) continue;

    const cacheKey = `${parsed.date}_${parsed.venue}`;
    if (!resultsCache.has(cacheKey)) {
      resultsCache.set(cacheKey, await loadResults(parsed.date, parsed.venue));
    }
    const meetingResults = resultsCache.get(cacheKey)!;
    const finishOrder = meetingResults.get(parsed.raceNumber);
    if (!finishOrder || finishOrder.length < 3) continue;

    // ── Form analysis for skip logic (same as backtest-differentiation.ts) ──
    const analyses = formAnalyzer.analyzeRace(race);
    if (analyses.length === 0) continue;

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

    // Same C3 Turf rule as the original
    const c3TurfAvgDiffMin = 17;
    const effectiveAvgDiffMin =
      race.surface === "Turf" && race.class === "Class 3"
        ? Math.max(avgDiffMin, c3TurfAvgDiffMin)
        : avgDiffMin;

    let skipped = false;
    let skipReason = "";
    if (sparseFormCount > sparseMax) {
      skipped = true;
      skipReason = `${sparseFormCount} horses w/ 0-1 form`;
    } else if (topGap < gapMin) {
      skipped = true;
      skipReason = `1st-2nd gap=${topGap}`;
    } else if (horsesWithDiffLt8 > closeMax || avgDiff < effectiveAvgDiffMin) {
      skipped = true;
      skipReason = horsesWithDiffLt8 > closeMax ? `close<8=${horsesWithDiffLt8}` : `avgDiff=${avgDiff}`;
    }

    // ── MC simulation for Trio pool selection ──
    const hvStdDev = parsed.venue === "Happy Valley" ? 11 : 8;
    const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
    const { results: simResults } = simulator.simulateRace(race);

    // Banker = MC rank #1, legs = MC ranks #2…#N
    const topN = simResults.slice(0, pickNo);
    const banker = topN[0];
    const legs = topN.slice(1);
    const bankerCode = banker.horseCode;
    const bankerNumber = banker.horseNumber;
    const legCodes = legs.map(r => r.horseCode);
    const legNumbers = legs.map(r => r.horseNumber);
    const pickedHorseCodes = topN.map(r => r.horseCode);
    const pickedHorseNumbers = topN.map(r => r.horseNumber);

    // Actual results
    const actualTop3 = finishOrder.slice(0, 3);
    const actualTop3Codes = actualTop3.map(f => f.horseCode);
    const actualTop3Numbers = actualTop3.map(f => f.horseNumber);

    // Hit conditions
    const bankerHit = actualTop3Codes.includes(bankerCode);
    // When banker hits, there are exactly 2 non-banker actual top-3 horses that need to be in legs.
    // When banker misses, legsCoverage is meaningless for hit purposes — store 0.
    const nonBankerActual = bankerHit
      ? actualTop3Codes.filter(c => c !== bankerCode)   // exactly 2 when banker hit
      : [];
    const legsCoverage = nonBankerActual.filter(c => legCodes.includes(c)).length;
    // Full hit: banker in top-3 AND both other top-3 horses in legs
    const trioHit = bankerHit && legsCoverage === 2;

    allResults.push({
      raceId: `${parsed.date}_${parsed.venue === "Happy Valley" ? "HV" : "ST"}_R${parsed.raceNumber}`,
      date: parsed.date,
      venue: parsed.venue === "Happy Valley" ? "HV" : "ST",
      raceNumber: parsed.raceNumber,
      numRunners,
      surface: race.surface,
      raceClass: race.class,
      distance: race.distance,
      skipped,
      skipReason,
      avgDiff,
      horsesWithDiffLt8,
      sparseFormCount,
      pickNo,
      bankerCode,
      bankerNumber,
      legCodes,
      legNumbers,
      pickedHorseCodes,
      pickedHorseNumbers,
      actualTop3Codes,
      actualTop3Numbers,
      actualWinnerName: finishOrder[0]?.horseName ?? "",
      bankerHit,
      legsCoverage,
      trioHit,
      combinations: combos,
    });
  }

  const betted = allResults.filter(r => !r.skipped);
  const skippedRaces = allResults.filter(r => r.skipped);
  console.log(`Analyzed ${allResults.length} races — betting ${betted.length}, skipping ${skippedRaces.length}\n`);

  // ── Race-by-race table ──
  const W = 118;
  console.log("═".repeat(W));
  console.log(`TRIO BACKTEST (BANKER): 1 banker + ${pickNo - 1} legs → C(${pickNo - 1},2)=${combos} combos @ $10 = $${unitCost}/race`);
  console.log(`Skip rules: sparse>${sparseMax}, close<8>${closeMax}, avgDiff<${avgDiffMin}`);
  console.log("═".repeat(W));
  console.log(
    `${"Race".padEnd(20)} ${"Bnkr".padStart(4)} ${"Legs (#s)".padEnd(18)} ${"Actual Top3(#s)".padEnd(16)} ${"BnkHit".padStart(6)} ${"LCvr".padStart(4)} ${"Hit".padStart(4)} ${"Bet".padStart(4)} ${"AvgDiff".padStart(7)} ${"Cl<8".padStart(4)} ${"Rnrs".padStart(4)} ${"SkipReason"}`
  );
  console.log("─".repeat(W));

  for (const r of allResults) {
    const legsStr = r.legNumbers.join(",");
    const top3Str = r.actualTop3Numbers.join(",");
    const bet = r.skipped ? "SKIP" : "BET";
    const hit = r.skipped ? "-" : (r.trioHit ? "✓" : "✗");
    const bnkHit = r.skipped ? "-" : (r.bankerHit ? "Y" : "N");
    // Show legs coverage only when banker hit (otherwise N/A — banker is the blocker)
    const lcov = r.skipped ? "-" : (r.bankerHit ? `${r.legsCoverage}/2` : "N/A");
    console.log(
      `${r.raceId.padEnd(20)} ${r.bankerNumber.toString().padStart(4)} ${legsStr.padEnd(18)} ${top3Str.padEnd(16)} ${bnkHit.padStart(6)} ${lcov.padStart(4)} ${hit.padStart(4)} ${bet.padStart(4)} ${r.avgDiff.toString().padStart(7)} ${r.horsesWithDiffLt8.toString().padStart(4)} ${r.numRunners.toString().padStart(4)} ${r.skipped ? r.skipReason : ""}`
    );
  }
  console.log("─".repeat(W));

  // ── Summary ──
  const hits = betted.filter(r => r.trioHit).length;
  const bankerHits = betted.filter(r => r.bankerHit).length;
  const totalStaked = betted.length * unitCost;
  const hitRate = betted.length > 0 ? (hits / betted.length * 100).toFixed(1) : "0.0";
  const bankerHitRate = betted.length > 0 ? (bankerHits / betted.length * 100).toFixed(1) : "0.0";
  const breakEvenDiv = hits > 0 ? (totalStaked / hits).toFixed(0) : "∞";

  console.log(`\nBetted:        ${hits}/${betted.length} trio hits (${hitRate}%)`);
  console.log(`Banker hit:    ${bankerHits}/${betted.length} (${bankerHitRate}%)  ← banker finished top-3`);
  console.log(`Skipped:       ${skippedRaces.length} races`);
  console.log(`Staked:        $${totalStaked} ($${unitCost}/race × ${betted.length} races)`);
  console.log(`Break-even dividend needed: $${breakEvenDiv} per winning combo`);

  console.log("\nCoverage breakdown (betted races only):");
  const cntBankerMiss  = betted.filter(r => !r.bankerHit).length;
  const cntLegs0       = betted.filter(r => r.bankerHit && r.legsCoverage === 0).length;
  const cntLegs1       = betted.filter(r => r.bankerHit && r.legsCoverage === 1).length;
  const cntLegs2       = betted.filter(r => r.trioHit).length;
  const pct = (n: number) => betted.length > 0 ? (n / betted.length * 100).toFixed(1) + "%" : "N/A";
  console.log(`  Banker missed (dead loss):             ${cntBankerMiss.toString().padStart(3)} races (${pct(cntBankerMiss)})`);
  console.log(`  Banker hit, legs 0/2 (both missed):   ${cntLegs0.toString().padStart(3)} races (${pct(cntLegs0)})`);
  console.log(`  Banker hit, legs 1/2 (one missed):    ${cntLegs1.toString().padStart(3)} races (${pct(cntLegs1)})`);
  console.log(`  Banker hit, legs 2/2 ← HIT:           ${cntLegs2.toString().padStart(3)} races (${pct(cntLegs2)})`);

  const unfiltered = allResults.filter(r => r.trioHit).length;
  console.log(`\nWithout skip filter: ${unfiltered}/${allResults.length} hits (${(unfiltered / allResults.length * 100).toFixed(1)}%)`);

  // ── Per racing day ──
  const dayW = 85;
  console.log("\n" + "═".repeat(dayW));
  console.log("TRIO HIT RATE PER RACING DAY");
  console.log("═".repeat(dayW));
  console.log(
    `${"Date".padEnd(12)} ${"Venue".padEnd(4)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"Staked".padStart(8)} ${"B/E Div".padStart(9)}`
  );
  console.log("─".repeat(dayW));

  const dayMap = new Map<string, RaceResult[]>();
  for (const r of allResults) {
    const key = `${r.date}_${r.venue}`;
    if (!dayMap.has(key)) dayMap.set(key, []);
    dayMap.get(key)!.push(r);
  }

  let gtBet = 0, gtHit = 0, gtStaked = 0;
  for (const [, races] of [...dayMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const dayBetted = races.filter(r => !r.skipped);
    const dayHits = dayBetted.filter(r => r.trioHit).length;
    const dayStaked = dayBetted.length * unitCost;
    const dayRate = dayBetted.length > 0 ? (dayHits / dayBetted.length * 100).toFixed(1) + "%" : "N/A";
    const dayBE = dayHits > 0 ? `$${(dayStaked / dayHits).toFixed(0)}` : "∞";
    const formattedDate = `${races[0].date.slice(0,4)}-${races[0].date.slice(4,6)}-${races[0].date.slice(6,8)}`;
    console.log(
      `${formattedDate.padEnd(12)} ${races[0].venue.padEnd(4)} ${races.length.toString().padStart(5)} ${dayBetted.length.toString().padStart(4)} ${dayHits.toString().padStart(4)} ${(dayBetted.length - dayHits).toString().padStart(4)} ${(races.length - dayBetted.length).toString().padStart(4)} ${dayRate.padStart(8)} ${("$" + dayStaked).padStart(8)} ${dayBE.padStart(9)}`
    );
    gtBet += dayBetted.length;
    gtHit += dayHits;
    gtStaked += dayStaked;
  }
  console.log("─".repeat(dayW));
  const gtRate = gtBet > 0 ? (gtHit / gtBet * 100).toFixed(1) + "%" : "0.0%";
  const gtBE = gtHit > 0 ? `$${(gtStaked / gtHit).toFixed(0)}` : "∞";
  console.log(
    `${"TOTAL".padEnd(12)} ${"".padEnd(4)} ${allResults.length.toString().padStart(5)} ${gtBet.toString().padStart(4)} ${gtHit.toString().padStart(4)} ${(gtBet - gtHit).toString().padStart(4)} ${(allResults.length - gtBet).toString().padStart(4)} ${gtRate.padStart(8)} ${("$" + gtStaked).padStart(8)} ${gtBE.padStart(9)}`
  );

  // ── Breakdown tables ──
  function makeGroup(key: (r: RaceResult) => string) {
    const m = new Map<string, RaceResult[]>();
    for (const r of allResults) {
      const k = key(r);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(r);
    }
    return m;
  }

  printBreakdown("VENUE", makeGroup(r => r.venue), unitCost);
  printBreakdown("SURFACE", makeGroup(r => r.surface), unitCost);
  printBreakdown("CLASS", makeGroup(r => r.raceClass), unitCost);

  const byDistance = makeGroup(r => `${r.distance}m`);
  const byDistanceSorted = new Map(
    [...byDistance.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  );
  printBreakdown("DISTANCE", byDistanceSorted, unitCost);

  printBreakdown("CLASS × VENUE", makeGroup(r => `${r.raceClass} ${r.venue}`), unitCost);

  const byRunners = makeGroup(r => `${r.numRunners}`);
  const byRunnersSorted = new Map(
    [...byRunners.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  );
  printBreakdown("NUMBER OF RUNNERS", byRunnersSorted, unitCost);

  // ── Pick-no sensitivity (banker structure, same MC ranking) ──
  console.log("\n" + "═".repeat(68));
  console.log("PICK-NO SENSITIVITY — banker structure (same skip filter, same MC results)");
  console.log("═".repeat(68));
  console.log(`Banker = MC rank #1 always. Legs = ranks #2…#N. C(N−1,2) combos.`);
  console.log(`${"pick-no".padEnd(9)} ${"C(N-1,2)".padStart(9)} ${"$/race".padStart(7)} ${"Hit".padStart(5)} ${"BnkHit".padStart(7)} ${"Bet".padStart(5)} ${"HitRate".padStart(8)} ${"B/E Div".padStart(9)}`);
  console.log("─".repeat(68));

  for (let n = 3; n <= pickNo; n++) {
    const nc = comb(n - 1, 2);
    const nHits = betted.filter(r => {
      // Banker is always rank #1 (already stored in bankerCode)
      if (!r.bankerHit) return false;
      const nLegs = r.pickedHorseCodes.slice(1, n);   // ranks #2…#n from stored order
      const nonBanker = r.actualTop3Codes.filter(c => c !== r.bankerCode);
      return nonBanker.every(c => nLegs.includes(c));
    }).length;
    const nBnkHits = betted.filter(r => r.bankerHit).length; // same regardless of n
    const nRate = betted.length > 0 ? (nHits / betted.length * 100).toFixed(1) + "%" : "N/A";
    const nStaked = betted.length * nc * 10;
    const nBE = nHits > 0 ? `$${(nStaked / nHits).toFixed(0)}` : "∞";
    const marker = n === pickNo ? " ◄" : "";
    console.log(
      `${n.toString().padEnd(9)} ${nc.toString().padStart(9)} ${("$" + nc * 10).padStart(7)} ${nHits.toString().padStart(5)} ${nBnkHits.toString().padStart(7)} ${betted.length.toString().padStart(5)} ${nRate.padStart(8)} ${nBE.padStart(9)}${marker}`
    );
  }

  function maxRunners(results: RaceResult[]): number {
    return Math.max(...results.map(r => r.numRunners), 8);
  }
}

main().catch(console.error);
