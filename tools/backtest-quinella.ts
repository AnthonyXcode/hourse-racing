#!/usr/bin/env tsx
/**
 * Backtest: Quinella betting strategy (form ranking + MC place%)
 *
 * Skip rules: same as backtest-differentiation.ts (computeSkipDecision).
 *
 * Bet structure (form ranking order):
 *   - pla5 = MC Place% of the horse ranked 5th in form (0 if <5 runners ranked)
 *   - pla5 > 70%: top 3 picks — #1 banker + #2,#3 legs → 2 quinella combos
 *   - pla5 ≤ 70%: top 5 picks — no banker → C(5,2) = 10 quinella combos
 *
 * Hit:
 *   - Banker mode: banker in actual top-2 AND one leg in the other top-2 spot
 *   - Box mode: at least two of the five picks finish in actual top-2
 *
 * CLI mirrors backtest-differentiation.ts:
 *   --sparse, --close, --avgdiff, --gap, --odds, --months, --venue, --surface,
 *   --ignore-class, --ignore-distance, --form/--form-data, --ignore-after
 */

import { readFile, readdir } from "fs/promises";
import path from "path";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";
import {
  applyFormSourceFilter,
  computeSkipDecision,
  isSparseFormEntry,
  loadMeetingResults,
  loadRaceCard,
  parseIgnoreAfterDate,
  parseRaceCardFileName,
  SPARSE_FORM_MIN_RECORDS,
  type FormSource,
  type MeetingResults,
} from "../src/backtest/differentiationBacktest.js";

const PLA5_THRESHOLD = 0.7;
const BANKER_PICK_COUNT = 3;
const BOX_PICK_COUNT = 5;
const BET_UNIT = 10;

interface QnlPick {
  code: string;
  name: string;
  number: number;
  rating: number;
  mcPlacePct: number;
}

interface QnlResult {
  raceId: string;
  date: string;
  venue: "HV" | "ST";
  raceNumber: number;
  numRunners: number;
  surface: string;
  raceClass: string;
  distance: number;
  mode: "banker" | "box";
  pla5Pct: number;
  bankerCode: string;
  bankerName: string;
  bankerNumber: number;
  picks: QnlPick[];
  combinations: number;
  actualTop2Codes: string[];
  actualTop2Names: string[];
  avgDiff: number;
  horsesWithDiffLt8: number;
  sparseFormCount: number;
  topGap: number;
  topRating: number;
  topRatedWinOdds: number;
  skipped: boolean;
  skipReason: string;
  bankerInTop2: boolean;
  hit: boolean;
  quinellaDividend: number;
  staked: number;
  payout: number;
}

interface QuinellaResultsFile {
  raceNumber: number;
  quinellaDividend?: number;
}

async function loadQuinellaDividends(dateStr: string, venue: string): Promise<Map<number, number>> {
  const venueSuffix = venue === "Happy Valley" ? "HV" : "ST";
  const filePath = path.join(process.cwd(), "data", "historical", `results_${dateStr}_${venueSuffix}.json`);
  try {
    const raw = await readFile(filePath, "utf-8");
    const races = JSON.parse(raw) as QuinellaResultsFile[];
    const map = new Map<number, number>();
    for (const race of races) {
      if (race.quinellaDividend !== undefined) {
        map.set(race.raceNumber, race.quinellaDividend);
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

function printQnlBreakdown(label: string, groups: Map<string, QnlResult[]>, options?: { preserveOrder?: boolean }) {
  const W = 90;
  console.log("\n" + "═".repeat(W));
  console.log(`QUINELLA HIT RATE BY ${label}`);
  console.log("═".repeat(W));
  console.log(
    `${"Group".padEnd(14)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"Staked".padStart(9)} ${"Return".padStart(9)} ${"ROI".padStart(9)}`
  );
  console.log("─".repeat(W));
  let gTotalRaces = 0;
  let gTotalBet = 0;
  let gTotalHit = 0;
  let gTotalStaked = 0;
  let gTotalReturn = 0;
  const entries = options?.preserveOrder
    ? [...groups.entries()]
    : [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [key, races] of entries) {
    const gb = races.filter((r) => !r.skipped);
    const gh = gb.filter((r) => r.hit).length;
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
  const totalRoi =
    gTotalStaked > 0 ? (((gTotalReturn - gTotalStaked) / gTotalStaked) * 100).toFixed(1) + "%" : "0.0%";
  console.log(
    `${"TOTAL".padEnd(14)} ${gTotalRaces.toString().padStart(5)} ${gTotalBet.toString().padStart(4)} ${gTotalHit.toString().padStart(4)} ${(gTotalBet - gTotalHit).toString().padStart(4)} ${(gTotalRaces - gTotalBet).toString().padStart(4)} ${totalRate.padStart(8)} ${("$" + gTotalStaked).padStart(9)} ${("$" + gTotalReturn.toFixed(0)).padStart(9)} ${totalRoi.padStart(9)}`
  );
}

function makeGroup(allResults: QnlResult[], keyFn: (r: QnlResult) => string) {
  const m = new Map<string, QnlResult[]>();
  for (const r of allResults) {
    const k = keyFn(r);
    if (!m.has(k)) m.set(k, []);
    m.get(k)!.push(r);
  }
  return m;
}

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

  for (const arg of args) {
    const m = arg.match(/^--([a-zA-Z-]+)=(.+)$/);
    if (!m) continue;
    const key = m[1]!;
    const val = m[2] ?? "";
    if (key === "sparse") sparseMax = parseInt(val, 10);
    else if (key === "close") closeMax = parseInt(val, 10);
    else if (key === "avgdiff") avgDiffMin = parseInt(val, 10);
    else if (key === "gap") gapMin = parseInt(val, 10);
    else if (key === "odds") oddsMax = parseFloat(val);
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

  return {
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
    ignoreAfter,
  };
}

function comb(n: number, k: number): number {
  if (k > n || k < 0) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) result = (result * (n - i)) / (i + 1);
  return Math.round(result);
}

function mcPlacePctForCode(
  simResults: { horseCode: string; placeProbability: number }[],
  horseCode: string
): number {
  return simResults.find((s) => s.horseCode === horseCode)?.placeProbability ?? 0;
}

function evaluateQuinellaHit(
  mode: "banker" | "box",
  picks: QnlPick[],
  top2Codes: string[]
): { hit: boolean; bankerInTop2: boolean } {
  const pickCodes = picks.map((p) => p.code);
  const inTop2 = pickCodes.filter((c) => top2Codes.includes(c));

  if (mode === "banker") {
    const bankerCode = picks[0]?.code ?? "";
    const bankerInTop2 = top2Codes.includes(bankerCode);
    const legHit = picks.slice(1).some((p) => top2Codes.includes(p.code));
    return { hit: bankerInTop2 && legHit, bankerInTop2 };
  }

  return { hit: inTop2.length >= 2, bankerInTop2: false };
}

async function main() {
  const {
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
    ignoreAfter,
  } = parseArgs();

  const monthLabel = months.length === 0 ? "all" : months.join(",");
  const venueLabel = venue ?? "all";
  const surfaceLabel = surface ?? "all";
  const formLabel = form === "all" ? "all (ST+HV)" : form === "ST" ? "ST only" : "HV only";
  const ignoreClassLabel = ignoreClasses.length === 0 ? "none" : ignoreClasses.join(",");
  const ignoreDistLabel =
    ignoreDistances.length === 0 ? "none" : ignoreDistances.map((d) => `${d}m`).join(",");
  const ignoreAfterLabel = ignoreAfter ?? "none";
  const oddsLabel = oddsMax > 0 ? `>${oddsMax}` : "off";

  console.log("QUINELLA BACKTEST (form ranking + MC pla5)");
  console.log(
    `  pla5>${(PLA5_THRESHOLD * 100).toFixed(0)}%: top ${BANKER_PICK_COUNT} (#1 banker + 2 legs) → 2 combos`
  );
  console.log(
    `  pla5≤${(PLA5_THRESHOLD * 100).toFixed(0)}%: top ${BOX_PICK_COUNT} box (no banker) → ${comb(BOX_PICK_COUNT, 2)} combos`
  );
  console.log(
    `Skip rules: sparse>${sparseMax}, close<8>${closeMax}, avgDiff<${avgDiffMin}, 1st-2nd gap<${gapMin}, odds ${oddsLabel} | months=${monthLabel} | venue=${venueLabel} | surface=${surfaceLabel} | form=${formLabel} | ignore-class=${ignoreClassLabel} | ignore-distance=${ignoreDistLabel} | ignore-after=${ignoreAfterLabel}\n`
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
  const ignoreAfterYmd = parseIgnoreAfterDate(ignoreAfter ?? null);

  console.log(`Found ${matchedFiles.length} racecards (months=${monthLabel})\n`);

  const resultsCache = new Map<string, MeetingResults>();
  const qnlDivCache = new Map<string, Map<number, number>>();
  const allResults: QnlResult[] = [];

  for (const file of matchedFiles) {
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;
    if (ignoreAfterYmd && parsed.date >= ignoreAfterYmd) continue;

    const filePath = path.join(raceCardDir, file);
    const loaded = await loadRaceCard(filePath);
    if (!loaded) continue;

    const { race: rawRace, winOddsMap } = loaded;
    const race = applyFormSourceFilter(rawRace, form);
    if (race.entries.length < 4) continue;
    if (surface && race.surface !== surface) continue;
    if (ignoreClasses.length > 0 && ignoreClasses.includes((race.class ?? "").toUpperCase())) continue;
    if (ignoreDistances.length > 0 && ignoreDistances.includes(race.distance)) continue;

    const cacheKey = `${parsed.date}_${parsed.venue}`;
    if (!resultsCache.has(cacheKey)) {
      resultsCache.set(cacheKey, await loadMeetingResults(parsed.date, parsed.venue));
    }
    const meeting = resultsCache.get(cacheKey)!;
    const finishOrder = meeting.finishOrders.get(parsed.raceNumber);
    if (!finishOrder || finishOrder.length < 2) continue;

    if (!qnlDivCache.has(cacheKey)) {
      qnlDivCache.set(cacheKey, await loadQuinellaDividends(parsed.date, parsed.venue));
    }
    const quinellaDividend = qnlDivCache.get(cacheKey)!.get(parsed.raceNumber) ?? 0;

    const analyses = formAnalyzer.analyzeRace(race);
    if (analyses.length < 2) continue;

    const topRating = analyses[0]!.overallRating;
    const diffs = analyses.map((a) => Math.abs(topRating - a.overallRating));
    const avgDiff = Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length);
    const horsesWithDiffLt8 = diffs.filter((d) => d < 8).length;
    const sparseFormCount = race.entries.filter(isSparseFormEntry).length;
    const topGap =
      analyses.length >= 2 ? Math.abs(analyses[0]!.overallRating - analyses[1]!.overallRating) : 999;

    const topRatedEntry = race.entries.find((e) => e.horse.code === analyses[0]!.horseCode);
    const topRatedHorseNum = topRatedEntry?.horseNumber ?? 0;
    const topRatedFinish = finishOrder.find((f) => f.horseNumber === topRatedHorseNum);
    const topRatedWinOdds = topRatedFinish?.winOdds ?? winOddsMap.get(topRatedHorseNum) ?? 0;

    const { skipped, skipReason } = computeSkipDecision(
      sparseFormCount,
      horsesWithDiffLt8,
      avgDiff,
      topGap,
      { sparseMax, closeMax, avgDiffMin, gapMin, oddsMax },
      topRatedWinOdds
    );

    const hvStdDev = parsed.venue === "Happy Valley" ? 11 : 8;
    const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
    const { results: simResults } = simulator.simulateRace(race);

    const fifthAnalysis = analyses[4];
    const pla5Pct = fifthAnalysis
      ? mcPlacePctForCode(simResults, fifthAnalysis.horseCode)
      : 0;

    const useBankerMode = pla5Pct > PLA5_THRESHOLD;
    const pickCount = useBankerMode ? BANKER_PICK_COUNT : BOX_PICK_COUNT;
    const mode: "banker" | "box" = useBankerMode ? "banker" : "box";
    const rankedSlice = analyses.slice(0, Math.min(pickCount, analyses.length));

    const picks: QnlPick[] = rankedSlice.map((a) => {
      const entry = race.entries.find((e) => e.horse.code === a.horseCode);
      return {
        code: a.horseCode,
        name: a.horseName,
        number: entry?.horseNumber ?? 0,
        rating: a.overallRating,
        mcPlacePct: mcPlacePctForCode(simResults, a.horseCode),
      };
    });

    const combinations =
      mode === "banker"
        ? Math.max(0, picks.length - 1)
        : comb(picks.length, 2);

    const top2Codes = finishOrder.slice(0, 2).map((f) => f.horseCode);
    const top2Names = finishOrder.slice(0, 2).map((f) => f.horseName);
    const { hit, bankerInTop2 } = evaluateQuinellaHit(mode, picks, top2Codes);
    const staked = combinations * BET_UNIT;
    const payout = hit && quinellaDividend > 0 ? quinellaDividend : 0;

    const banker = picks[0];

    allResults.push({
      raceId: `${parsed.date}_${parsed.venue === "Happy Valley" ? "HV" : "ST"}_R${parsed.raceNumber}`,
      date: parsed.date,
      venue: parsed.venue === "Happy Valley" ? "HV" : "ST",
      raceNumber: parsed.raceNumber,
      numRunners: race.entries.filter((e) => !e.isScratched).length,
      surface: race.surface ?? "Turf",
      raceClass: race.class,
      distance: race.distance,
      mode,
      pla5Pct,
      bankerCode: banker?.code ?? "",
      bankerName: banker?.name ?? "",
      bankerNumber: banker?.number ?? 0,
      picks,
      combinations,
      actualTop2Codes: top2Codes,
      actualTop2Names: top2Names,
      avgDiff,
      horsesWithDiffLt8,
      sparseFormCount,
      topGap,
      topRating,
      topRatedWinOdds,
      skipped,
      skipReason,
      bankerInTop2,
      hit,
      quinellaDividend,
      staked,
      payout,
    });
  }

  const betted = allResults.filter((r) => !r.skipped);
  const skippedRaces = allResults.filter((r) => r.skipped);
  console.log(`Analyzed ${allResults.length} races — betting ${betted.length}, skipping ${skippedRaces.length}\n`);

  const tableWidth = 145;
  console.log("═".repeat(tableWidth));
  const oddsRule = oddsMax > 0 ? ` OR odds>${oddsMax}` : "";
  console.log(
    `QUINELLA: pla5>${(PLA5_THRESHOLD * 100).toFixed(0)}% → banker+top3 (2×$${BET_UNIT}); else top5 box (10×$${BET_UNIT}) | skip if sparse>${sparseMax} OR close<8>${closeMax} OR avgDiff<${avgDiffMin}${oddsRule}`
  );
  console.log("═".repeat(tableWidth));
  console.log(
    `${"Race".padEnd(18)} ${"Mode".padEnd(6)} ${"Pla5%".padStart(6)} ${"Banker".padEnd(12)} ${"Picks".padEnd(14)} ${"Cmb".padStart(3)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Stk".padStart(6)} ${"Div".padStart(7)} ${"PnL".padStart(7)} ${"Actual 1-2".padEnd(20)}`
  );
  console.log("─".repeat(tableWidth));

  for (const r of allResults) {
    const bet = r.skipped ? "SKIP" : "BET";
    const hitStr = r.skipped ? "-" : r.hit ? "Y" : "N";
    const pla5Str = (r.pla5Pct * 100).toFixed(1);
    const picksStr = r.picks.map((p) => `#${p.number}`).join(",");
    const bankerLabel = r.mode === "banker" ? r.bankerName.substring(0, 11) : "(box)";
    const actualStr = `${r.actualTop2Names[0]?.substring(0, 9) ?? "?"} / ${r.actualTop2Names[1]?.substring(0, 9) ?? "?"}`;
    const stkStr = r.skipped ? "-" : `$${r.staked}`;
    const divStr = r.skipped ? "-" : r.hit && r.quinellaDividend > 0 ? `$${r.quinellaDividend}` : "-";
    const pnlStr = r.skipped ? "-" : `${r.payout - r.staked >= 0 ? "+" : ""}$${r.payout - r.staked}`;
    console.log(
      `${r.raceId.padEnd(18)} ${r.mode.padEnd(6)} ${pla5Str.padStart(6)} ${bankerLabel.padEnd(12)} ${picksStr.padEnd(14)} ${r.combinations.toString().padStart(3)} ${bet.padStart(4)} ${hitStr.padStart(4)} ${stkStr.padStart(6)} ${divStr.padStart(7)} ${pnlStr.padStart(7)} ${actualStr.padEnd(20)}`
    );
  }
  console.log("─".repeat(tableWidth));

  const bettedHits = betted.filter((r) => r.hit).length;
  const bettedBkT2 = betted.filter((r) => r.mode === "banker" && r.bankerInTop2).length;
  const bankerBets = betted.filter((r) => r.mode === "banker");
  const boxBets = betted.filter((r) => r.mode === "box");
  const bankerHits = bankerBets.filter((r) => r.hit).length;
  const boxHits = boxBets.filter((r) => r.hit).length;
  const totalStaked = betted.reduce((s, r) => s + r.staked, 0);
  const totalReturn = betted.reduce((s, r) => s + r.payout, 0);
  const totalPnl = totalReturn - totalStaked;

  const hitRate = betted.length > 0 ? ((bettedHits / betted.length) * 100).toFixed(1) : "0.0";
  const roi = totalStaked > 0 ? (((totalReturn - totalStaked) / totalStaked) * 100).toFixed(1) : "0.0";
  const bkT2Rate =
    bankerBets.length > 0 ? ((bettedBkT2 / bankerBets.length) * 100).toFixed(1) : "N/A";

  console.log(`\nQuinella hits: ${bettedHits}/${betted.length} (${hitRate}%)`);
  console.log(
    `  Banker mode (pla5>${(PLA5_THRESHOLD * 100).toFixed(0)}%): ${bankerHits}/${bankerBets.length}` +
      (bankerBets.length > 0 ? ` (${((bankerHits / bankerBets.length) * 100).toFixed(1)}%)` : "") +
      ` | banker top2: ${bettedBkT2}/${bankerBets.length} (${bkT2Rate}%)`
  );
  console.log(
    `  Box mode (pla5≤${(PLA5_THRESHOLD * 100).toFixed(0)}%): ${boxHits}/${boxBets.length}` +
      (boxBets.length > 0 ? ` (${((boxHits / boxBets.length) * 100).toFixed(1)}%)` : "")
  );
  console.log(`Skipped: ${skippedRaces.length} races`);
  console.log(`Staked:  $${totalStaked}`);
  console.log(`Return:  $${totalReturn}`);
  console.log(`P&L:     ${totalPnl >= 0 ? "+" : ""}$${totalPnl} (ROI: ${roi}%)`);
  const allHits = allResults.filter((r) => r.hit).length;
  console.log(
    `Without filter: ${allHits}/${allResults.length} quinella hit (${allResults.length > 0 ? ((allHits / allResults.length) * 100).toFixed(1) : "0.0"}%)`
  );

  // --- Per racing day ---
  const dayTableWidth = 115;
  console.log("\n" + "═".repeat(dayTableWidth));
  console.log(`QUINELLA HIT RATE PER RACING DAY  ($${BET_UNIT} per combo)`);
  console.log("═".repeat(dayTableWidth));
  const dayMap = new Map<string, QnlResult[]>();
  for (const r of allResults) {
    const key = `${r.date}_${r.venue}`;
    if (!dayMap.has(key)) dayMap.set(key, []);
    dayMap.get(key)!.push(r);
  }

  console.log(
    `${"Date".padEnd(12)} ${"Venue".padEnd(4)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"BkMd".padStart(4)} ${"BxMd".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"Staked".padStart(9)} ${"Return".padStart(9)} ${"P&L".padStart(9)} ${"ROI".padStart(9)}`
  );
  console.log("─".repeat(dayTableWidth));

  let gtBet = 0;
  let gtHit = 0;
  let gtStaked = 0;
  let gtReturn = 0;
  for (const [, races] of [...dayMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const first = races[0]!;
    const dayBetted = races.filter((r) => !r.skipped);
    const dayHits = dayBetted.filter((r) => r.hit).length;
    const dayBanker = dayBetted.filter((r) => r.mode === "banker").length;
    const dayBox = dayBetted.filter((r) => r.mode === "box").length;
    const dayStaked = dayBetted.reduce((s, r) => s + r.staked, 0);
    const dayReturn = dayBetted.reduce((s, r) => s + r.payout, 0);
    const dayRate = dayBetted.length > 0 ? ((dayHits / dayBetted.length) * 100).toFixed(1) + "%" : "N/A";
    const dayPnl = dayReturn - dayStaked;
    const dayRoi = dayStaked > 0 ? (((dayReturn - dayStaked) / dayStaked) * 100).toFixed(1) + "%" : "N/A";
    const formattedDate = `${first.date.slice(0, 4)}-${first.date.slice(4, 6)}-${first.date.slice(6, 8)}`;
    console.log(
      `${formattedDate.padEnd(12)} ${first.venue.padEnd(4)} ${races.length.toString().padStart(5)} ${dayBetted.length.toString().padStart(4)} ${dayHits.toString().padStart(4)} ${dayBanker.toString().padStart(4)} ${dayBox.toString().padStart(4)} ${(dayBetted.length - dayHits).toString().padStart(4)} ${(races.length - dayBetted.length).toString().padStart(4)} ${dayRate.padStart(8)} ${("$" + dayStaked).padStart(9)} ${("$" + dayReturn).padStart(9)} ${((dayPnl >= 0 ? "+" : "") + "$" + dayPnl).padStart(9)} ${dayRoi.padStart(9)}`
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
    `${"TOTAL".padEnd(12)} ${"".padEnd(4)} ${allResults.length.toString().padStart(5)} ${gtBet.toString().padStart(4)} ${gtHit.toString().padStart(4)} ${bankerBets.length.toString().padStart(4)} ${boxBets.length.toString().padStart(4)} ${(gtBet - gtHit).toString().padStart(4)} ${(allResults.length - gtBet).toString().padStart(4)} ${gtRate.padStart(8)} ${("$" + gtStaked).padStart(9)} ${("$" + gtReturn).padStart(9)} ${((gtPnl >= 0 ? "+" : "") + "$" + gtPnl).padStart(9)} ${gtRoi.padStart(9)}`
  );

  // --- ROI by month ---
  const monthTableWidth = 100;
  console.log("\n" + "═".repeat(monthTableWidth));
  console.log(`QUINELLA ROI BY MONTH  ($${BET_UNIT} per combo)`);
  console.log("═".repeat(monthTableWidth));
  console.log(
    `${"Month".padEnd(10)} ${"Days".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"HitRate".padStart(8)} ${"Staked".padStart(9)} ${"Return".padStart(9)} ${"P&L".padStart(9)} ${"ROI".padStart(9)}`
  );
  console.log("─".repeat(monthTableWidth));

  const monthMap = new Map<string, QnlResult[]>();
  const monthDayMap = new Map<string, Set<string>>();
  for (const r of allResults) {
    const mKey = `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}`;
    if (!monthMap.has(mKey)) monthMap.set(mKey, []);
    monthMap.get(mKey)!.push(r);
    if (!monthDayMap.has(mKey)) monthDayMap.set(mKey, new Set());
    monthDayMap.get(mKey)!.add(`${r.date}_${r.venue}`);
  }

  let mGtBet = 0;
  let mGtHit = 0;
  let mGtStaked = 0;
  let mGtReturn = 0;
  let mGtDays = 0;
  for (const [month, races] of [...monthMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const mBetted = races.filter((r) => !r.skipped);
    const mHits = mBetted.filter((r) => r.hit).length;
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

  // --- Breakdown tables ---
  const byMode = new Map<string, QnlResult[]>();
  for (const r of allResults) {
    const key = r.mode === "banker" ? "banker (2×$10)" : "box (10×$10)";
    if (!byMode.has(key)) byMode.set(key, []);
    byMode.get(key)!.push(r);
  }
  const byModeSorted = new Map<string, QnlResult[]>();
  for (const key of ["banker (2×$10)", "box (10×$10)"]) {
    if (byMode.has(key)) byModeSorted.set(key, byMode.get(key)!);
  }
  printQnlBreakdown("BETTING MODE", byModeSorted, { preserveOrder: true });

  if (!(venue && surface)) {
    printQnlBreakdown("VENUE", makeGroup(allResults, (r) => r.venue));
    printQnlBreakdown("SURFACE", makeGroup(allResults, (r) => r.surface));
  }

  printQnlBreakdown("CLASS", makeGroup(allResults, (r) => r.raceClass));

  const byDistance = makeGroup(allResults, (r) => `${r.distance}m`);
  const byDistanceSorted = new Map([...byDistance.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
  printQnlBreakdown("DISTANCE", byDistanceSorted);

  printQnlBreakdown("CLASS × VENUE", makeGroup(allResults, (r) => `${r.raceClass} ${r.venue}`));

  const byRunners = makeGroup(allResults, (r) => `${r.numRunners}`);
  const byRunnersSorted = new Map([...byRunners.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
  printQnlBreakdown("NUMBER OF RUNNERS", byRunnersSorted);

  const byPla5 = new Map<string, QnlResult[]>();
  for (const r of allResults) {
    const pct = r.pla5Pct * 100;
    const lower = Math.floor(pct / 5) * 5;
    const key = `${lower}-${lower + 5}%`;
    if (!byPla5.has(key)) byPla5.set(key, []);
    byPla5.get(key)!.push(r);
  }
  const byPla5Sorted = new Map([...byPla5.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
  printQnlBreakdown("PLA5 MC PLACE% (5% buckets)", byPla5Sorted);

  const byOdds = new Map<string, QnlResult[]>();
  const oddsBuckets = [
    { label: "1-3", min: 1, max: 3 },
    { label: "3-5", min: 3, max: 5 },
    { label: "5-7", min: 5, max: 7 },
    { label: "7-10", min: 7, max: 10 },
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
  const byOddsSorted = new Map<string, QnlResult[]>();
  for (const key of [...oddsBuckets.map((b) => b.label), "N/A"]) {
    if (byOdds.has(key)) byOddsSorted.set(key, byOdds.get(key)!);
  }
  printQnlBreakdown("WIN ODDS (top-rated)", byOddsSorted, { preserveOrder: true });

  const byAvgDiff = new Map<string, QnlResult[]>();
  const avgDiffBuckets = [
    { label: "11-13", min: 11, max: 13 },
    { label: "13-15", min: 13, max: 15 },
    { label: "15-18", min: 15, max: 18 },
    { label: "18-22", min: 18, max: 22 },
    { label: "22-27", min: 22, max: 27 },
    { label: "27+", min: 27, max: Infinity },
  ];
  for (const r of allResults) {
    for (const b of avgDiffBuckets) {
      if (r.avgDiff >= b.min && r.avgDiff < b.max) {
        if (!byAvgDiff.has(b.label)) byAvgDiff.set(b.label, []);
        byAvgDiff.get(b.label)!.push(r);
        break;
      }
    }
  }
  const byAvgDiffSorted = new Map<string, QnlResult[]>();
  for (const key of avgDiffBuckets.map((b) => b.label)) {
    if (byAvgDiff.has(key)) byAvgDiffSorted.set(key, byAvgDiff.get(key)!);
  }
  printQnlBreakdown("AVG DIFF (field spread)", byAvgDiffSorted, { preserveOrder: true });

  const byTopGap = new Map<string, QnlResult[]>();
  const topGapBuckets = [
    { label: "1", min: 1, max: 2 },
    { label: "2-3", min: 2, max: 4 },
    { label: "4-6", min: 4, max: 7 },
    { label: "7-10", min: 7, max: 11 },
    { label: "11+", min: 11, max: Infinity },
  ];
  for (const r of allResults) {
    for (const b of topGapBuckets) {
      if (r.topGap >= b.min && r.topGap < b.max) {
        if (!byTopGap.has(b.label)) byTopGap.set(b.label, []);
        byTopGap.get(b.label)!.push(r);
        break;
      }
    }
  }
  const byTopGapSorted = new Map<string, QnlResult[]>();
  for (const key of topGapBuckets.map((b) => b.label)) {
    if (byTopGap.has(key)) byTopGapSorted.set(key, byTopGap.get(key)!);
  }
  printQnlBreakdown("TOP-TWO GAP (#1 vs #2 rating)", byTopGapSorted, { preserveOrder: true });

  const byClose8 = new Map<string, QnlResult[]>();
  for (const r of allResults) {
    const key = `${r.horsesWithDiffLt8}`;
    if (!byClose8.has(key)) byClose8.set(key, []);
    byClose8.get(key)!.push(r);
  }
  const byClose8Sorted = new Map([...byClose8.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
  printQnlBreakdown("CLOSE<8 COUNT (field cluster)", byClose8Sorted);

  // --- Skip logic summary ---
  console.log("\n" + "═".repeat(70));
  console.log("SKIP LOGIC SUMMARY");
  console.log("═".repeat(70));
  console.log("Bet = quinella per pla5 rule. Skip if ANY rule fails (first match wins):");
  console.log(
    `  1. Sparse form: count of runners with <${SPARSE_FORM_MIN_RECORDS} past performances > ${sparseMax} → skip`
  );
  console.log(`  2. Top-two gap: |rating #1 − rating #2| < ${gapMin} → skip`);
  console.log(`  3. Clustered field: horses within <8 pts of top-rated count > ${closeMax} → skip`);
  console.log(`  4. Low differentiation: mean |topRating − each rating| < ${avgDiffMin} (--avgdiff) → skip`);
  console.log(`  5. High odds: top-rated horse win odds > ${oddsMax > 0 ? oddsMax : "disabled"} (--odds) → skip`);
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
}

main().catch(console.error);
