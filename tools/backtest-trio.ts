#!/usr/bin/env tsx
/**
 * Backtest: Trio (Any Order) Hit Rate — MC-based Banker/Legs Structure
 *
 * Strategy:
 *   - MC rank #1 is the BANKER (must finish top-3).
 *   - Remaining pool horses are LEGS (count set by --picks).
 *   - Default --picks=6: banker + 5 legs → C(5,2)=10 combos @ $10 = $100/race.
 *   - --picks=half: pool = ceil(runners/2) MC horses per race (min 3).
 *   - If banker's win odds > --odds threshold, no banker: all picks as legs → C(picks,3).
 *   - Hit = actual top-3 are all within the picked pool AND
 *     (banker mode) banker is in top-3.
 *
 * Parameters mirror backtest-differentiation.ts:
 *   --sparse, --close, --avgdiff, --gap, --odds, --picks, --months, --venue, --surface,
 *   --ignore-class, --ignore-distance, --form/--form-data, --ignore-after
 *
 * trioDividend from results files is used for ROI calculation.
 */

import {
  loadRaceCard,
  applyFormSourceFilter,
  parseRaceCardFileName,
  loadMeetingResults,
  type MeetingResults,
  type FormSource,
} from "../src/backtest/differentiationBacktest.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";
import { readFile, readdir } from "fs/promises";
import path from "path";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import {
  printUpcomingTrioSuggestions,
  runUpcomingTrioSuggestions,
  resolveTrioPickCount,
  DEFAULT_TRIO_PICKS,
  type TrioPicksArg,
} from "../src/backtest/upcomingBetSuggestions.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TrioRaceResult {
  raceId: string;
  date: string;
  venue: "HV" | "ST";
  raceNumber: number;
  numRunners: number;
  surface: string;
  raceClass: string;
  distance: number;
  skipped: boolean;
  skipReason: string;
  avgDiff: number;
  horsesWithDiffLt8: number;
  sparseFormCount: number;
  topGap: number;

  hasBanker: boolean;
  bankerCode: string;
  bankerNumber: number;
  bankerName: string;
  bankerWinOdds: number;
  bankerExpectedPosition: number;
  legCodes: string[];
  legNumbers: number[];
  pickedHorseCodes: string[];
  pickedHorseNumbers: number[];
  combinations: number;

  actualTop3Codes: string[];
  actualTop3Numbers: number[];
  actualWinnerName: string;
  bankerHit: boolean;
  trioHit: boolean;

  trioDividend: number;
  staked: number;
  payout: number;

  topRatedWinOdds: number;
  topRatedExpectedPosition: number;
  topRatedMcPlacePct: number;
  pickCount: number;
}

interface FullResultsFile {
  id: string;
  raceNumber: number;
  finishOrder: { horseNumber: number; finishPosition: number; horseName: string; horseCode: string; winOdds?: number }[];
  trioDividend?: number;
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

async function loadTrioDividends(dateStr: string, venue: string): Promise<Map<number, number>> {
  const venueSuffix = venue === "Happy Valley" ? "HV" : "ST";
  const fileName = `results_${dateStr}_${venueSuffix}.json`;
  const filePath = path.join(process.cwd(), "data", "historical", fileName);
  try {
    const raw = await readFile(filePath, "utf-8");
    const races = JSON.parse(raw) as FullResultsFile[];
    const map = new Map<number, number>();
    for (const race of races) {
      if (race.trioDividend !== undefined) {
        map.set(race.raceNumber, race.trioDividend);
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

// ---------------------------------------------------------------------------
// Argument parsing (mirrors backtest-differentiation.ts)
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  let sparseMax = 3;
  let closeMax = 4;
  let avgDiffMin = 14;
  let gapMin = 0;
  let oddsMax = 0;
  let months: string[] = [];
  let venue: "ST" | "HV" | null = null;
  let surface: "Turf" | "AWT" | null = null;
  let ignoreClasses: string[] = [];
  let ignoreDistances: number[] = [];
  let form: FormSource = "all";
  let ignoreAfter: string | undefined;
  let picks: TrioPicksArg = DEFAULT_TRIO_PICKS;

  for (const arg of args) {
    const m = arg.match(/^--([a-zA-Z-]+)=(.+)$/);
    if (!m) continue;
    const key = m[1];
    const val = m[2];
    if (key === "sparse") sparseMax = parseInt(val, 10);
    else if (key === "close") closeMax = parseInt(val, 10);
    else if (key === "avgdiff") avgDiffMin = parseInt(val, 10);
    else if (key === "gap") gapMin = parseInt(val, 10);
    else if (key === "odds") oddsMax = parseFloat(val);
    else if (key === "picks") {
      if (val.toLowerCase() === "half") picks = "half";
      else {
        const n = parseInt(val, 10);
        if (!Number.isNaN(n) && n >= 3) picks = n;
      }
    }
    else if (key === "months") months = val.split(",").map((s) => s.trim().padStart(2, "0"));
    else if (key === "venue") venue = val.toUpperCase() === "HV" ? "HV" : "ST";
    else if (key === "surface") surface = val.toUpperCase() === "AWT" ? "AWT" : "Turf";
    else if (key === "ignore-class") ignoreClasses = val.split(",").map((s) => s.trim().toUpperCase());
    else if (key === "ignore-distance") ignoreDistances = val.split(",").map((s) => parseInt(s.trim(), 10));
    else if (key === "ignore-after") ignoreAfter = val.trim();
    else if (key === "form" || key === "form-data") {
      const u = val.trim().toUpperCase();
      if (u === "ALL") form = "all";
      else if (u === "ST") form = "ST";
      else if (u === "HV") form = "HV";
    }
  }

  return { sparseMax, closeMax, avgDiffMin, gapMin, oddsMax, picks, months, venue, surface, ignoreClasses, ignoreDistances, form, ignoreAfter };
}

// ---------------------------------------------------------------------------
// Breakdown printer (trio-specific with ROI columns)
// ---------------------------------------------------------------------------

function printTrioBreakdown(label: string, groups: Map<string, TrioRaceResult[]>) {
  const W = 90;
  console.log("\n" + "═".repeat(W));
  console.log(`TRIO HIT RATE BY ${label}`);
  console.log("═".repeat(W));
  console.log(
    `${"Group".padEnd(14)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"Staked".padStart(9)} ${"Return".padStart(9)} ${"ROI".padStart(9)}`
  );
  console.log("─".repeat(W));
  let gTotalRaces = 0, gTotalBet = 0, gTotalHit = 0, gTotalStaked = 0, gTotalReturn = 0;
  for (const [key, races] of [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const gb = races.filter((r) => !r.skipped);
    const gh = gb.filter((r) => r.trioHit).length;
    const staked = gb.reduce((s, r) => s + r.staked, 0);
    const ret = gb.reduce((s, r) => s + r.payout, 0);
    const rate = gb.length > 0 ? ((gh / gb.length) * 100).toFixed(1) + "%" : "N/A";
    const roi = staked > 0 ? (((ret - staked) / staked) * 100).toFixed(1) + "%" : "N/A";
    console.log(
      `${key.substring(0, 13).padEnd(14)} ${races.length.toString().padStart(5)} ${gb.length.toString().padStart(4)} ${gh.toString().padStart(4)} ${(gb.length - gh).toString().padStart(4)} ${(races.length - gb.length).toString().padStart(4)} ${rate.padStart(8)} ${("$" + staked).padStart(9)} ${("$" + ret.toFixed(0)).padStart(9)} ${roi.padStart(9)}`
    );
    gTotalRaces += races.length;
    gTotalBet += gb.length;
    gTotalHit += gh;
    gTotalStaked += staked;
    gTotalReturn += ret;
  }
  console.log("─".repeat(W));
  const totalRate = gTotalBet > 0 ? ((gTotalHit / gTotalBet) * 100).toFixed(1) + "%" : "0.0%";
  const totalRoi = gTotalStaked > 0 ? (((gTotalReturn - gTotalStaked) / gTotalStaked) * 100).toFixed(1) + "%" : "0.0%";
  console.log(
    `${"TOTAL".padEnd(14)} ${gTotalRaces.toString().padStart(5)} ${gTotalBet.toString().padStart(4)} ${gTotalHit.toString().padStart(4)} ${(gTotalBet - gTotalHit).toString().padStart(4)} ${(gTotalRaces - gTotalBet).toString().padStart(4)} ${totalRate.padStart(8)} ${("$" + gTotalStaked).padStart(9)} ${("$" + gTotalReturn.toFixed(0)).padStart(9)} ${totalRoi.padStart(9)}`
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { sparseMax, closeMax, avgDiffMin, gapMin, oddsMax, picks, months, venue, surface, ignoreClasses, ignoreDistances, form, ignoreAfter } =
    parseArgs();
  const monthLabel = months.length === 0 ? "all" : months.join(",");
  const venueLabel = venue ?? "all";
  const surfaceLabel = surface ?? "all";
  const formLabel = form === "all" ? "all (ST+HV)" : form === "ST" ? "ST only" : "HV only";
  const ignoreClassLabel = ignoreClasses.length === 0 ? "none" : ignoreClasses.join(",");
  const ignoreDistLabel = ignoreDistances.length === 0 ? "none" : ignoreDistances.map((d) => `${d}m`).join(",");
  const ignoreAfterLabel = ignoreAfter ?? "none";
  const oddsLabel = oddsMax > 0 ? `>${oddsMax}` : "off";
  const picksLabel = picks === "half" ? "half (ceil(runners/2), min 3)" : String(picks);
  console.log(
    `Trio Backtest (MC Banker/Legs) — banker odds threshold: ${oddsLabel}`
  );
  console.log(
    `  Pool: top MC horses per race (--picks=${picksLabel}, capped at field size, min 3)`
  );
  console.log(
    `  Banker mode: MC#1 banker + remaining legs → C(picks-1,2) combos @ $10`
  );
  console.log(
    `  No-banker mode (odds>${oddsMax || "∞"}): all picks as legs → C(picks,3) combos @ $10`
  );
  console.log(
    `Skip rules: sparse>${sparseMax}, close<8>${closeMax}, avgDiff<${avgDiffMin}, 1st-2nd gap<${gapMin}, odds ${oddsLabel} | picks=${picksLabel} | months=${monthLabel} | venue=${venueLabel} | surface=${surfaceLabel} | form=${formLabel} | ignore-class=${ignoreClassLabel} | ignore-distance=${ignoreDistLabel} | ignore-after=${ignoreAfterLabel}\n`
  );

  const formAnalyzer = new FormAnalyzer();
  const raceCardDir = path.join(process.cwd(), "data", "racecards");
  const files = await readdir(raceCardDir);
  const venueSegment = venue ?? "ST|HV";
  const monthPattern =
    months.length === 0
      ? new RegExp(`racecard_\\d{8}_(${venueSegment})_R\\d+\\.json`)
      : new RegExp(`racecard_2026(${months.join("|")})\\d{2}_(${venueSegment})_R\\d+\\.json`);
  const matchedFiles = files.filter((f) => monthPattern.test(f)).sort();

  const ignoreAfterYmd = ignoreAfter?.replace(/-/g, "") ?? null;

  const resultsCache = new Map<string, MeetingResults>();
  const trioDivCache = new Map<string, Map<number, number>>();
  const allResults: TrioRaceResult[] = [];

  for (const file of matchedFiles) {
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;
    if (ignoreAfterYmd && parsed.date >= ignoreAfterYmd) continue;

    const filePath = path.join(raceCardDir, file);
    const loaded = await loadRaceCard(filePath);
    if (!loaded) continue;

    const { race: rawRace, winOddsMap } = loaded;
    const race = applyFormSourceFilter(rawRace, form);
    const numRunners = race.entries.filter((e) => !e.isScratched).length;
    if (numRunners < 4) continue;
    if (surface && race.surface !== surface) continue;
    if (ignoreClasses.length > 0 && ignoreClasses.includes((race.class ?? "").toUpperCase())) continue;
    if (ignoreDistances.length > 0 && ignoreDistances.includes(race.distance)) continue;

    const cacheKey = `${parsed.date}_${parsed.venue}`;
    if (!resultsCache.has(cacheKey)) {
      resultsCache.set(cacheKey, await loadMeetingResults(parsed.date, parsed.venue));
    }
    const meeting = resultsCache.get(cacheKey)!;
    const finishOrder = meeting.finishOrders.get(parsed.raceNumber);
    if (!finishOrder || finishOrder.length < 3) continue;

    if (!trioDivCache.has(cacheKey)) {
      trioDivCache.set(cacheKey, await loadTrioDividends(parsed.date, parsed.venue));
    }
    const trioDivMap = trioDivCache.get(cacheKey)!;
    const trioDividend = trioDivMap.get(parsed.raceNumber) ?? 0;

    // Form analysis for skip logic
    const analyses = formAnalyzer.analyzeRace(race);
    if (analyses.length === 0) continue;

    const topRating = analyses[0]!.overallRating;
    const diffs = analyses.map((a) => Math.abs(topRating - a.overallRating));
    const avgDiff = Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length);
    const horsesWithDiffLt8 = diffs.filter((d) => d < 8).length;
    const sparseFormCount = race.entries.filter(
      (e) => !e.isScratched && (e.horse.pastPerformances?.length ?? 0) <= 1
    ).length;
    const topGap = analyses.length >= 2 ? Math.abs(analyses[0]!.overallRating - analyses[1]!.overallRating) : 999;

    // Skip decision
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

    // MC simulation
    const hvStdDev = parsed.venue === "Happy Valley" ? 11 : 8;
    const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
    const { results: simResults } = simulator.simulateRace(race);

    const pickCount = resolveTrioPickCount(picks, numRunners);
    const mcPicked = simResults.slice(0, pickCount);
    if (mcPicked.length < 3) continue;
    const mcRank1 = mcPicked[0]!;

    // Banker's win odds (from finish results or racecard)
    const bankerFinish = finishOrder.find((f) => f.horseNumber === mcRank1.horseNumber);
    const bankerWinOdds = (bankerFinish as any)?.winOdds ?? winOddsMap.get(mcRank1.horseNumber) ?? 0;

    // Decide banker vs no-banker mode
    const useBanker = oddsMax <= 0 || bankerWinOdds <= oddsMax;

    let hasBanker: boolean;
    let bankerCode: string;
    let bankerNumber: number;
    let bankerName: string;
    let legCodes: string[];
    let legNumbers: number[];
    let pickedHorseCodes: string[];
    let pickedHorseNumbers: number[];
    let combinations: number;

    if (useBanker) {
      hasBanker = true;
      bankerCode = mcRank1.horseCode;
      bankerNumber = mcRank1.horseNumber;
      bankerName = mcRank1.horseName;
      const legs = mcPicked.slice(1);
      legCodes = legs.map((r) => r.horseCode);
      legNumbers = legs.map((r) => r.horseNumber);
      pickedHorseCodes = mcPicked.map((r) => r.horseCode);
      pickedHorseNumbers = mcPicked.map((r) => r.horseNumber);
      combinations = comb(pickCount - 1, 2);
    } else {
      hasBanker = false;
      bankerCode = mcRank1.horseCode;
      bankerNumber = mcRank1.horseNumber;
      bankerName = mcRank1.horseName;
      legCodes = mcPicked.map((r) => r.horseCode);
      legNumbers = mcPicked.map((r) => r.horseNumber);
      pickedHorseCodes = mcPicked.map((r) => r.horseCode);
      pickedHorseNumbers = mcPicked.map((r) => r.horseNumber);
      combinations = comb(pickCount, 3);
    }

    const staked = combinations * 10;

    // Actual results
    const actualTop3 = finishOrder.slice(0, 3);
    const actualTop3Codes = actualTop3.map((f) => f.horseCode);
    const actualTop3Numbers = actualTop3.map((f) => f.horseNumber);

    // Hit conditions
    let trioHit: boolean;
    let bankerHit: boolean;
    if (hasBanker) {
      bankerHit = actualTop3Codes.includes(bankerCode);
      const nonBankerActual = bankerHit ? actualTop3Codes.filter((c) => c !== bankerCode) : [];
      const legsCoverage = nonBankerActual.filter((c) => legCodes.includes(c)).length;
      trioHit = bankerHit && legsCoverage === 2;
    } else {
      bankerHit = actualTop3Codes.includes(bankerCode);
      trioHit = actualTop3Codes.every((c) => pickedHorseCodes.includes(c));
    }

    const payout = trioHit && trioDividend > 0 ? trioDividend : 0;

    // MC stats for top-rated horse (form rank #1, not MC rank #1)
    const topRatedAnalysis = analyses[0]!;
    const topRatedEntry = race.entries.find((e) => e.horse.code === topRatedAnalysis.horseCode);
    const topRatedHorseNum = topRatedEntry?.horseNumber ?? 0;
    const topRatedFinish = finishOrder.find((f) => f.horseNumber === topRatedHorseNum);
    const topRatedWinOdds = (topRatedFinish as any)?.winOdds ?? winOddsMap.get(topRatedHorseNum) ?? 0;
    const topRatedMcResult = simResults.find((s) => s.horseCode === topRatedAnalysis.horseCode);
    const topRatedMcPlacePct = topRatedMcResult?.placeProbability ?? 0;
    const topRatedExpectedPosition = topRatedMcResult?.expectedPosition ?? 0;

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
      topGap,
      hasBanker,
      bankerCode,
      bankerNumber,
      bankerName,
      bankerWinOdds,
      bankerExpectedPosition: mcRank1.expectedPosition,
      legCodes,
      legNumbers,
      pickedHorseCodes,
      pickedHorseNumbers,
      combinations,
      actualTop3Codes,
      actualTop3Numbers,
      actualWinnerName: finishOrder[0]?.horseName ?? "",
      bankerHit,
      trioHit,
      trioDividend,
      staked,
      payout,
      topRatedWinOdds,
      topRatedExpectedPosition,
      topRatedMcPlacePct,
      pickCount,
    });
  }

  console.log(`Found ${matchedFiles.length} racecards (after venue/surface/month filters)\n`);

  const betted = allResults.filter((r) => !r.skipped);
  const skippedRaces = allResults.filter((r) => r.skipped);
  console.log(`Analyzed ${allResults.length} races — betting ${betted.length}, skipping ${skippedRaces.length}\n`);

  // ═══════════════════════════════════════════════════════════════════════════
  // Race-by-race table
  // ═══════════════════════════════════════════════════════════════════════════
  const tableWidth = 140;
  console.log("═".repeat(tableWidth));
  console.log("TRIO BACKTEST — MC Banker/Legs (pool size from --picks)");
  console.log("═".repeat(tableWidth));
  console.log(
    `${"Race".padEnd(20)} ${"Mode".padEnd(5)} ${"Pk".padStart(3)} ${"Bnkr".padStart(4)} ${"BnkO".padStart(5)} ${"Legs (#s)".padEnd(22)} ${"Top3(#s)".padEnd(12)} ${"BnkH".padStart(4)} ${"Hit".padStart(4)} ${"Combos".padStart(6)} ${"Staked".padStart(7)} ${"TrioDiv".padStart(8)} ${"P&L".padStart(8)} ${"AvgDiff".padStart(7)} ${"Rnrs".padStart(4)} ${"Skip"}`
  );
  console.log("─".repeat(tableWidth));

  for (const r of allResults) {
    const mode = r.hasBanker ? "BKR" : "LEGS";
    const legsStr = r.legNumbers.join(",");
    const top3Str = r.actualTop3Numbers.join(",");
    const bnkHit = r.skipped ? "-" : r.bankerHit ? "Y" : "N";
    const hit = r.skipped ? "-" : r.trioHit ? "Y" : "N";
    const bnkOdds = r.bankerWinOdds > 0 ? r.bankerWinOdds.toFixed(1) : "-";
    const divStr = r.trioDividend > 0 ? `$${r.trioDividend}` : "-";
    const pnl = r.skipped ? "-" : `${r.payout - r.staked >= 0 ? "+" : ""}$${r.payout - r.staked}`;
    const skipStr = r.skipped ? r.skipReason : "";
    console.log(
      `${r.raceId.padEnd(20)} ${mode.padEnd(5)} ${r.pickCount.toString().padStart(3)} ${r.bankerNumber.toString().padStart(4)} ${bnkOdds.padStart(5)} ${legsStr.padEnd(22)} ${top3Str.padEnd(12)} ${bnkHit.padStart(4)} ${hit.padStart(4)} ${r.combinations.toString().padStart(6)} ${("$" + r.staked).padStart(7)} ${divStr.padStart(8)} ${pnl.padStart(8)} ${r.avgDiff.toString().padStart(7)} ${r.numRunners.toString().padStart(4)} ${skipStr}`
    );
  }
  console.log("─".repeat(tableWidth));

  // ═══════════════════════════════════════════════════════════════════════════
  // Summary
  // ═══════════════════════════════════════════════════════════════════════════
  const hits = betted.filter((r) => r.trioHit).length;
  const bankerHits = betted.filter((r) => r.bankerHit).length;
  const bankerModeRaces = betted.filter((r) => r.hasBanker);
  const noBankerModeRaces = betted.filter((r) => !r.hasBanker);
  const totalStaked = betted.reduce((s, r) => s + r.staked, 0);
  const totalReturn = betted.reduce((s, r) => s + r.payout, 0);
  const hitRate = betted.length > 0 ? ((hits / betted.length) * 100).toFixed(1) : "0.0";
  const roi = totalStaked > 0 ? (((totalReturn - totalStaked) / totalStaked) * 100).toFixed(1) : "0.0";

  console.log(`\nTrio hits:     ${hits}/${betted.length} (${hitRate}%)`);
  console.log(`Banker hits:   ${bankerHits}/${betted.length} (${betted.length > 0 ? ((bankerHits / betted.length) * 100).toFixed(1) : "0.0"}%)`);
  console.log(`Skipped:       ${skippedRaces.length} races`);
  console.log(`Staked:        $${totalStaked}`);
  console.log(`Return:        $${totalReturn}`);
  console.log(`P&L:           ${totalReturn - totalStaked >= 0 ? "+" : ""}$${totalReturn - totalStaked} (ROI: ${roi}%)`);

  // ═══════════════════════════════════════════════════════════════════════════
  // Hit rate by betting mode (BKR vs LEGS)
  // ═══════════════════════════════════════════════════════════════════════════
  const byBettingMode = new Map<string, TrioRaceResult[]>();
  for (const r of allResults) {
    const mode = r.hasBanker ? "BKR" : "LEGS";
    if (!byBettingMode.has(mode)) byBettingMode.set(mode, []);
    byBettingMode.get(mode)!.push(r);
  }
  const byBettingModeSorted = new Map<string, TrioRaceResult[]>();
  for (const mode of ["BKR", "LEGS"]) {
    if (byBettingMode.has(mode)) byBettingModeSorted.set(mode, byBettingMode.get(mode)!);
  }
  console.log("\n  BKR  = MC#1 banker + MC#2–#6 legs → C(5,2)=10 combos @ $10 = $100/race");
  console.log("  LEGS = MC#1–#6 all legs (banker odds > threshold) → C(6,3)=20 combos @ $10 = $200/race");
  printTrioBreakdown("BETTING MODE", byBettingModeSorted);

  const bkrBetted = bankerModeRaces;
  const legsBetted = noBankerModeRaces;
  const bkrBankerHits = bkrBetted.filter((r) => r.bankerHit).length;
  const legsMc1InTop3 = legsBetted.filter((r) => r.bankerHit).length;
  console.log(
    `  BKR banker top-3: ${bkrBankerHits}/${bkrBetted.length}` +
      (bkrBetted.length > 0 ? ` (${((bkrBankerHits / bkrBetted.length) * 100).toFixed(1)}%)` : "")
  );
  console.log(
    `  LEGS MC#1 in top-3: ${legsMc1InTop3}/${legsBetted.length}` +
      (legsBetted.length > 0 ? ` (${((legsMc1InTop3 / legsBetted.length) * 100).toFixed(1)}%)` : "")
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // Per racing day hit rate
  // ═══════════════════════════════════════════════════════════════════════════
  const dayTableWidth = 115;
  console.log("\n" + "═".repeat(dayTableWidth));
  console.log("TRIO HIT RATE PER RACING DAY");
  console.log("═".repeat(dayTableWidth));
  console.log(
    `${"Date".padEnd(12)} ${"Venue".padEnd(4)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"Staked".padStart(9)} ${"Return".padStart(9)} ${"P&L".padStart(9)} ${"ROI".padStart(9)}`
  );
  console.log("─".repeat(dayTableWidth));

  const dayMap = new Map<string, TrioRaceResult[]>();
  for (const r of allResults) {
    const key = `${r.date}_${r.venue}`;
    if (!dayMap.has(key)) dayMap.set(key, []);
    dayMap.get(key)!.push(r);
  }

  let gtBet = 0, gtHit = 0, gtStaked = 0, gtReturn = 0;
  for (const [, races] of [...dayMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const dayBetted = races.filter((r) => !r.skipped);
    const dayHits = dayBetted.filter((r) => r.trioHit).length;
    const dayStaked = dayBetted.reduce((s, r) => s + r.staked, 0);
    const dayReturn = dayBetted.reduce((s, r) => s + r.payout, 0);
    const dayRate = dayBetted.length > 0 ? ((dayHits / dayBetted.length) * 100).toFixed(1) + "%" : "N/A";
    const dayPnl = dayReturn - dayStaked;
    const dayRoi = dayStaked > 0 ? (((dayReturn - dayStaked) / dayStaked) * 100).toFixed(1) + "%" : "N/A";
    const firstRace = races[0]!;
    const formattedDate = `${firstRace.date.slice(0, 4)}-${firstRace.date.slice(4, 6)}-${firstRace.date.slice(6, 8)}`;
    console.log(
      `${formattedDate.padEnd(12)} ${firstRace.venue.padEnd(4)} ${races.length.toString().padStart(5)} ${dayBetted.length.toString().padStart(4)} ${dayHits.toString().padStart(4)} ${(dayBetted.length - dayHits).toString().padStart(4)} ${(races.length - dayBetted.length).toString().padStart(4)} ${dayRate.padStart(8)} ${("$" + dayStaked).padStart(9)} ${("$" + dayReturn).padStart(9)} ${((dayPnl >= 0 ? "+" : "") + "$" + dayPnl).padStart(9)} ${dayRoi.padStart(9)}`
    );
    gtBet += dayBetted.length;
    gtHit += dayHits;
    gtStaked += dayStaked;
    gtReturn += dayReturn;
  }
  console.log("─".repeat(dayTableWidth));
  const gtRate = gtBet > 0 ? ((gtHit / gtBet) * 100).toFixed(1) + "%" : "0.0%";
  const gtPnl = gtReturn - gtStaked;
  const gtRoi = gtStaked > 0 ? (((gtReturn - gtStaked) / gtStaked) * 100).toFixed(1) + "%" : "0.0%";
  console.log(
    `${"TOTAL".padEnd(12)} ${"".padEnd(4)} ${allResults.length.toString().padStart(5)} ${gtBet.toString().padStart(4)} ${gtHit.toString().padStart(4)} ${(gtBet - gtHit).toString().padStart(4)} ${(allResults.length - gtBet).toString().padStart(4)} ${gtRate.padStart(8)} ${("$" + gtStaked).padStart(9)} ${("$" + gtReturn).padStart(9)} ${((gtPnl >= 0 ? "+" : "") + "$" + gtPnl).padStart(9)} ${gtRoi.padStart(9)}`
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // ROI by month
  // ═══════════════════════════════════════════════════════════════════════════
  const monthTableWidth = 100;
  console.log("\n" + "═".repeat(monthTableWidth));
  console.log("TRIO ROI BY MONTH");
  console.log("═".repeat(monthTableWidth));
  console.log(
    `${"Month".padEnd(10)} ${"Days".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"HitRate".padStart(8)} ${"Staked".padStart(9)} ${"Return".padStart(9)} ${"P&L".padStart(9)} ${"ROI".padStart(9)}`
  );
  console.log("─".repeat(monthTableWidth));

  const monthMap = new Map<string, TrioRaceResult[]>();
  for (const r of allResults) {
    const key = `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}`;
    if (!monthMap.has(key)) monthMap.set(key, []);
    monthMap.get(key)!.push(r);
  }

  const monthDayMap = new Map<string, Set<string>>();
  for (const r of allResults) {
    const mKey = `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}`;
    if (!monthDayMap.has(mKey)) monthDayMap.set(mKey, new Set());
    monthDayMap.get(mKey)!.add(`${r.date}_${r.venue}`);
  }

  let mGtBet = 0, mGtHit = 0, mGtStaked = 0, mGtReturn = 0, mGtDays = 0;
  for (const [month, races] of [...monthMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const mBetted = races.filter((r) => !r.skipped);
    const mHits = mBetted.filter((r) => r.trioHit).length;
    const mStaked = mBetted.reduce((s, r) => s + r.staked, 0);
    const mReturn = mBetted.reduce((s, r) => s + r.payout, 0);
    const mDays = monthDayMap.get(month)?.size ?? 0;
    const mHitRate = mBetted.length > 0 ? ((mHits / mBetted.length) * 100).toFixed(1) + "%" : "N/A";
    const mPnl = mReturn - mStaked;
    const mRoi = mStaked > 0 ? (((mReturn - mStaked) / mStaked) * 100).toFixed(1) + "%" : "N/A";
    console.log(
      `${month.padEnd(10)} ${mDays.toString().padStart(5)} ${mBetted.length.toString().padStart(4)} ${mHits.toString().padStart(4)} ${mHitRate.padStart(8)} ${("$" + mStaked).padStart(9)} ${("$" + mReturn).padStart(9)} ${((mPnl >= 0 ? "+" : "") + "$" + mPnl).padStart(9)} ${mRoi.padStart(9)}`
    );
    mGtBet += mBetted.length;
    mGtHit += mHits;
    mGtStaked += mStaked;
    mGtReturn += mReturn;
    mGtDays += mDays;
  }
  console.log("─".repeat(monthTableWidth));
  const mGtRate = mGtBet > 0 ? ((mGtHit / mGtBet) * 100).toFixed(1) + "%" : "0.0%";
  const mGtPnl = mGtReturn - mGtStaked;
  const mGtRoi = mGtStaked > 0 ? (((mGtReturn - mGtStaked) / mGtStaked) * 100).toFixed(1) + "%" : "0.0%";
  console.log(
    `${"TOTAL".padEnd(10)} ${mGtDays.toString().padStart(5)} ${mGtBet.toString().padStart(4)} ${mGtHit.toString().padStart(4)} ${mGtRate.padStart(8)} ${("$" + mGtStaked).padStart(9)} ${("$" + mGtReturn).padStart(9)} ${((mGtPnl >= 0 ? "+" : "") + "$" + mGtPnl).padStart(9)} ${mGtRoi.padStart(9)}`
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // Breakdown tables (same as backtest-differentiation.ts)
  // ═══════════════════════════════════════════════════════════════════════════
  function makeGroup(key: (r: TrioRaceResult) => string) {
    const m = new Map<string, TrioRaceResult[]>();
    for (const r of allResults) {
      const k = key(r);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(r);
    }
    return m;
  }

  if (!(venue && surface)) {
    printTrioBreakdown("VENUE", makeGroup((r) => r.venue));
    printTrioBreakdown("SURFACE", makeGroup((r) => r.surface));
  }

  printTrioBreakdown("CLASS", makeGroup((r) => r.raceClass));

  const byDistance = makeGroup((r) => `${r.distance}m`);
  const byDistanceSorted = new Map([...byDistance.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
  printTrioBreakdown("DISTANCE", byDistanceSorted);

  printTrioBreakdown("CLASS × VENUE", makeGroup((r) => `${r.raceClass} ${r.venue}`));

  const byRunners = makeGroup((r) => `${r.numRunners}`);
  const byRunnersSorted = new Map([...byRunners.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
  printTrioBreakdown("NUMBER OF RUNNERS", byRunnersSorted);

  // --- By MC Place% slot (5% buckets) ---
  const byMcPlace = new Map<string, TrioRaceResult[]>();
  for (const r of allResults) {
    const pct = r.topRatedMcPlacePct * 100;
    const lower = Math.floor(pct / 5) * 5;
    const key = `${lower}-${lower + 5}%`;
    if (!byMcPlace.has(key)) byMcPlace.set(key, []);
    byMcPlace.get(key)!.push(r);
  }
  const byMcPlaceSorted = new Map(
    [...byMcPlace.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  );
  printTrioBreakdown("MC PLACE% SLOT (5%)", byMcPlaceSorted);

  // --- By win odds bucket ---
  const byOdds = new Map<string, TrioRaceResult[]>();
  const oddsBuckets = [
    { label: "1-3", min: 1, max: 3 },
    { label: "3-5", min: 3, max: 5 },
    { label: "5-7", min: 5, max: 7 },
    { label: "7-9", min: 7, max: 10 },
    { label: "10-15", min: 10, max: 15 },
    { label: "15+", min: 15, max: Infinity },
  ];
  for (const r of allResults) {
    if (r.topRatedWinOdds <= 0) {
      const key = "N/A";
      if (!byOdds.has(key)) byOdds.set(key, []);
      byOdds.get(key)!.push(r);
      continue;
    }
    for (const b of oddsBuckets) {
      if (r.topRatedWinOdds >= b.min && r.topRatedWinOdds < b.max) {
        if (!byOdds.has(b.label)) byOdds.set(b.label, []);
        byOdds.get(b.label)!.push(r);
        break;
      }
    }
  }
  const oddsOrder = [...oddsBuckets.map((b) => b.label), "N/A"];
  const byOddsSorted = new Map<string, TrioRaceResult[]>();
  for (const key of oddsOrder) {
    if (byOdds.has(key)) byOddsSorted.set(key, byOdds.get(key)!);
  }
  printTrioBreakdown("WIN ODDS (top-rated)", byOddsSorted);

  // --- By expected position bucket ---
  const byEPos = new Map<string, TrioRaceResult[]>();
  const ePosBuckets = [
    { label: "1.0-2.0", min: 1.0, max: 2.0 },
    { label: "2.0-3.0", min: 2.0, max: 3.0 },
    { label: "3.0-4.0", min: 3.0, max: 4.0 },
    { label: "4.0-5.0", min: 4.0, max: 5.0 },
    { label: "5.0-6.0", min: 5.0, max: 6.0 },
    { label: "6.0+", min: 6.0, max: Infinity },
  ];
  for (const r of allResults) {
    if (r.topRatedExpectedPosition <= 0) {
      const key = "N/A";
      if (!byEPos.has(key)) byEPos.set(key, []);
      byEPos.get(key)!.push(r);
      continue;
    }
    for (const b of ePosBuckets) {
      if (r.topRatedExpectedPosition >= b.min && r.topRatedExpectedPosition < b.max) {
        if (!byEPos.has(b.label)) byEPos.set(b.label, []);
        byEPos.get(b.label)!.push(r);
        break;
      }
    }
  }
  const ePosOrder = [...ePosBuckets.map((b) => b.label), "N/A"];
  const byEPosSorted = new Map<string, TrioRaceResult[]>();
  for (const key of ePosOrder) {
    if (byEPos.has(key)) byEPosSorted.set(key, byEPos.get(key)!);
  }
  printTrioBreakdown("EXPECTED POSITION (top-rated)", byEPosSorted);

  // --- By banker expected position bucket ---
  const byBnkEPos = new Map<string, TrioRaceResult[]>();
  for (const r of allResults) {
    if (r.bankerExpectedPosition <= 0) {
      const key = "N/A";
      if (!byBnkEPos.has(key)) byBnkEPos.set(key, []);
      byBnkEPos.get(key)!.push(r);
      continue;
    }
    for (const b of ePosBuckets) {
      if (r.bankerExpectedPosition >= b.min && r.bankerExpectedPosition < b.max) {
        if (!byBnkEPos.has(b.label)) byBnkEPos.set(b.label, []);
        byBnkEPos.get(b.label)!.push(r);
        break;
      }
    }
  }
  const byBnkEPosSorted = new Map<string, TrioRaceResult[]>();
  for (const key of ePosOrder) {
    if (byBnkEPos.has(key)) byBnkEPosSorted.set(key, byBnkEPos.get(key)!);
  }
  printTrioBreakdown("BANKER EXPECTED POSITION (MC#1)", byBnkEPosSorted);

  // --- By banker win odds bucket ---
  const byBnkOdds = new Map<string, TrioRaceResult[]>();
  for (const r of allResults) {
    if (r.bankerWinOdds <= 0) {
      const key = "N/A";
      if (!byBnkOdds.has(key)) byBnkOdds.set(key, []);
      byBnkOdds.get(key)!.push(r);
      continue;
    }
    for (const b of oddsBuckets) {
      if (r.bankerWinOdds >= b.min && r.bankerWinOdds < b.max) {
        if (!byBnkOdds.has(b.label)) byBnkOdds.set(b.label, []);
        byBnkOdds.get(b.label)!.push(r);
        break;
      }
    }
  }
  const byBnkOddsSorted = new Map<string, TrioRaceResult[]>();
  for (const key of oddsOrder) {
    if (byBnkOdds.has(key)) byBnkOddsSorted.set(key, byBnkOdds.get(key)!);
  }
  printTrioBreakdown("BANKER WIN ODDS (MC#1)", byBnkOddsSorted);

  // ═══════════════════════════════════════════════════════════════════════════
  // Skip logic summary
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("\n" + "═".repeat(70));
  console.log("SKIP LOGIC SUMMARY");
  console.log("═".repeat(70));
  console.log("Bet = MC top-6 trio structure. Skip if ANY rule fails:");
  console.log(`  1. Sparse form: count of runners with ≤1 past performance > ${sparseMax} → skip`);
  console.log(`  2. Top-two gap: |rating #1 − rating #2| < ${gapMin} → skip`);
  console.log(`  3. Clustered field: horses within <8 pts of top-rated count > ${closeMax} → skip`);
  console.log(`  4. Low differentiation: mean |topRating − each rating| < ${avgDiffMin} (--avgdiff) → skip`);
  console.log(`  5. Banker odds mode: MC#1 win odds > ${oddsMax > 0 ? oddsMax : "disabled"} → no banker (top 6 as legs, C(6,3)=20)`);
  console.log("\nSkipped races this run (by reason):");
  const skipReasonCounts = new Map<string, number>();
  for (const r of skippedRaces) {
    skipReasonCounts.set(r.skipReason, (skipReasonCounts.get(r.skipReason) ?? 0) + 1);
  }
  const sortedReasons = [...skipReasonCounts.entries()].sort((a, b) => b[1] - a[1]);
  if (sortedReasons.length === 0) {
    console.log("  (none)");
  } else {
    for (const [reason, n] of sortedReasons) {
      console.log(`  ${n.toString().padStart(3)}  ${reason}`);
    }
  }
  console.log("─".repeat(70));

  const upcoming = await runUpcomingTrioSuggestions(
    {
      sparseMax,
      closeMax,
      avgDiffMin,
      gapMin,
      oddsMax,
      months,
      venue,
      surface,
      ignoreClasses,
      ignoreDistances,
      form,
      ...(ignoreAfter ? { ignoreAfter } : {}),
    },
    picks
  );
  printUpcomingTrioSuggestions(upcoming);
}

main().catch(console.error);
