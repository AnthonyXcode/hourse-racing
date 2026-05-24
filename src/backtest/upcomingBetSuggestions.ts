/**
 * Upcoming races: racecards exist but no results file yet.
 * Applies the same skip / pick rules as backtest CLIs.
 */

import { access } from "fs/promises";
import path from "path";
import { readdir } from "fs/promises";
import { FormAnalyzer } from "../analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../simulation/monteCarlo.js";
import {
  applyFormSourceFilter,
  computeSkipDecision,
  loadRaceCard,
  parseRaceCardFileName,
  type DifferentiationBacktestOptions,
} from "./differentiationBacktest.js";

const BET_UNIT = 10;

export type TrioPicksArg = number | "half";
export const DEFAULT_TRIO_PICKS = 6;

/** Resolve pool size (--picks=N or --picks=half). Trio needs at least 3 horses. */
export function resolveTrioPickCount(picks: TrioPicksArg, numRunners: number): number {
  const raw = picks === "half" ? Math.ceil(numRunners / 2) : picks;
  return Math.min(numRunners, Math.max(3, raw));
}

function comb(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) result = (result * (n - i)) / (i + 1);
  return Math.round(result);
}

export async function meetingResultsFileExists(dateStr: string, venue: string): Promise<boolean> {
  const venueSuffix = venue === "Happy Valley" ? "HV" : "ST";
  const filePath = path.join(process.cwd(), "data", "historical", `results_${dateStr}_${venueSuffix}.json`);
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function formatDateYmd(ymd: string): string {
  return `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
}

function raceCardFilterPattern(opts: DifferentiationBacktestOptions): RegExp {
  const venueSegment = opts.venue ?? "ST|HV";
  return opts.months.length === 0
    ? new RegExp(`racecard_\\d{8}_(${venueSegment})_R\\d+\\.json`)
    : new RegExp(`racecard_2026(${opts.months.join("|")})\\d{2}_(${venueSegment})_R\\d+\\.json`);
}

async function listUpcomingMeetings(opts: DifferentiationBacktestOptions): Promise<string[]> {
  const raceCardDir = opts.raceCardDir ?? path.join(process.cwd(), "data", "racecards");
  const files = await readdir(raceCardDir);
  const pattern = raceCardFilterPattern(opts);
  const meetingKeys = new Set<string>();

  for (const file of files) {
    if (!pattern.test(file)) continue;
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;
    meetingKeys.add(`${parsed.date}_${parsed.venue}`);
  }

  const upcoming: string[] = [];
  for (const key of [...meetingKeys].sort()) {
    const [dateStr, venue] = key.split("_") as [string, string];
    if (!(await meetingResultsFileExists(dateStr, venue))) {
      upcoming.push(key);
    }
  }
  return upcoming;
}

export interface UpcomingPlaceRace {
  raceId: string;
  date: string;
  venue: "HV" | "ST";
  raceNumber: number;
  raceClass: string;
  distance: number;
  surface: string;
  numRunners: number;
  skipped: boolean;
  skipReason: string;
  topRatedHorseName: string;
  topRatedHorseNumber: number;
  topRatedWinOdds: number;
  topRatedMcPlacePct: number;
  overallRating: number;
  avgDiff: number;
  horsesWithDiffLt8: number;
  sparseFormCount: number;
  topGap: number;
}

export interface UpcomingTrioRace {
  raceId: string;
  date: string;
  venue: "HV" | "ST";
  raceNumber: number;
  raceClass: string;
  distance: number;
  surface: string;
  numRunners: number;
  skipped: boolean;
  skipReason: string;
  hasBanker: boolean;
  bankerNumber: number;
  bankerName: string;
  bankerWinOdds: number;
  legNumbers: number[];
  combinations: number;
  staked: number;
  avgDiff: number;
}

async function loadMeetingRacecards(
  meetingKey: string,
  opts: DifferentiationBacktestOptions
): Promise<{ file: string; parsed: NonNullable<ReturnType<typeof parseRaceCardFileName>> }[]> {
  const [dateStr, venue] = meetingKey.split("_") as [string, string];
  const venueCode = venue === "Happy Valley" ? "HV" : "ST";
  const raceCardDir = opts.raceCardDir ?? path.join(process.cwd(), "data", "racecards");
  const files = await readdir(raceCardDir);
  const prefix = `racecard_${dateStr}_${venueCode}_R`;
  const out: { file: string; parsed: NonNullable<ReturnType<typeof parseRaceCardFileName>> }[] = [];

  for (const file of files) {
    if (!file.startsWith(prefix)) continue;
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;
    out.push({ file, parsed });
  }
  return out.sort((a, b) => a.parsed.raceNumber - b.parsed.raceNumber);
}

function passesRaceFilters(
  race: ReturnType<typeof applyFormSourceFilter>,
  opts: DifferentiationBacktestOptions
): boolean {
  const numRunners = race.entries.filter((e) => !e.isScratched).length;
  if (numRunners < 4) return false;
  if (opts.surface && race.surface !== opts.surface) return false;
  if (opts.ignoreClasses.length > 0 && opts.ignoreClasses.includes((race.class ?? "").toUpperCase())) return false;
  if (opts.ignoreDistances.length > 0 && opts.ignoreDistances.includes(race.distance)) return false;
  return true;
}

function formMetrics(race: ReturnType<typeof applyFormSourceFilter>, formAnalyzer: FormAnalyzer) {
  const analyses = formAnalyzer.analyzeRace(race);
  if (analyses.length === 0) return null;

  const topRating = analyses[0]!.overallRating;
  const diffs = analyses.map((a) => Math.abs(topRating - a.overallRating));
  const avgDiff = Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length);
  const horsesWithDiffLt8 = diffs.filter((d) => d < 8).length;
  const sparseFormCount = race.entries.filter(
    (e) => !e.isScratched && (e.horse.pastPerformances?.length ?? 0) <= 1
  ).length;
  const topGap = analyses.length >= 2 ? Math.abs(analyses[0]!.overallRating - analyses[1]!.overallRating) : 999;

  return { analyses, topRating, avgDiff, horsesWithDiffLt8, sparseFormCount, topGap };
}

export async function runUpcomingPlaceSuggestions(
  opts: DifferentiationBacktestOptions
): Promise<Map<string, UpcomingPlaceRace[]>> {
  const meetings = await listUpcomingMeetings(opts);
  const formAnalyzer = new FormAnalyzer();
  const raceCardDir = opts.raceCardDir ?? path.join(process.cwd(), "data", "racecards");
  const byMeeting = new Map<string, UpcomingPlaceRace[]>();

  for (const meetingKey of meetings) {
    const cards = await loadMeetingRacecards(meetingKey, opts);
    const rows: UpcomingPlaceRace[] = [];

    for (const { file, parsed } of cards) {
      const loaded = await loadRaceCard(path.join(raceCardDir, file));
      if (!loaded) continue;
      const race = applyFormSourceFilter(loaded.race, opts.form);
      if (!passesRaceFilters(race, opts)) continue;

      const metrics = formMetrics(race, formAnalyzer);
      if (!metrics) continue;

      const topRatedAnalysis = metrics.analyses[0]!;
      const topRatedEntry = race.entries.find((e) => e.horse.code === topRatedAnalysis.horseCode);
      const topRatedHorseNum = topRatedEntry?.horseNumber ?? 0;
      const topRatedWinOdds = loaded.winOddsMap.get(topRatedHorseNum) ?? 0;

      const { skipped, skipReason } = computeSkipDecision(
        metrics.sparseFormCount,
        metrics.horsesWithDiffLt8,
        metrics.avgDiff,
        metrics.topGap,
        opts,
        topRatedWinOdds
      );

      const hvStdDev = parsed.venue === "Happy Valley" ? 11 : 8;
      const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
      const { results: simResults } = simulator.simulateRace(race);
      const topRatedMcResult = simResults.find((s) => s.horseCode === topRatedAnalysis.horseCode);

      rows.push({
        raceId: `${parsed.date}_${parsed.venue === "Happy Valley" ? "HV" : "ST"}_R${parsed.raceNumber}`,
        date: parsed.date,
        venue: parsed.venue === "Happy Valley" ? "HV" : "ST",
        raceNumber: parsed.raceNumber,
        raceClass: race.class,
        distance: race.distance,
        surface: race.surface,
        numRunners: race.entries.filter((e) => !e.isScratched).length,
        skipped,
        skipReason,
        topRatedHorseName: topRatedAnalysis.horseName,
        topRatedHorseNumber: topRatedHorseNum,
        topRatedWinOdds,
        topRatedMcPlacePct: topRatedMcResult?.placeProbability ?? 0,
        overallRating: metrics.topRating,
        avgDiff: metrics.avgDiff,
        horsesWithDiffLt8: metrics.horsesWithDiffLt8,
        sparseFormCount: metrics.sparseFormCount,
        topGap: metrics.topGap,
      });
    }

    if (rows.length > 0) byMeeting.set(meetingKey, rows);
  }

  return byMeeting;
}

export async function runUpcomingTrioSuggestions(
  opts: DifferentiationBacktestOptions,
  picks: TrioPicksArg = DEFAULT_TRIO_PICKS
): Promise<Map<string, UpcomingTrioRace[]>> {
  const meetings = await listUpcomingMeetings(opts);
  const formAnalyzer = new FormAnalyzer();
  const raceCardDir = opts.raceCardDir ?? path.join(process.cwd(), "data", "racecards");
  const byMeeting = new Map<string, UpcomingTrioRace[]>();

  for (const meetingKey of meetings) {
    const cards = await loadMeetingRacecards(meetingKey, opts);
    const rows: UpcomingTrioRace[] = [];

    for (const { file, parsed } of cards) {
      const loaded = await loadRaceCard(path.join(raceCardDir, file));
      if (!loaded) continue;
      const race = applyFormSourceFilter(loaded.race, opts.form);
      if (!passesRaceFilters(race, opts)) continue;

      const metrics = formMetrics(race, formAnalyzer);
      if (!metrics) continue;

      const { skipped, skipReason } = computeSkipDecision(
        metrics.sparseFormCount,
        metrics.horsesWithDiffLt8,
        metrics.avgDiff,
        metrics.topGap,
        opts
      );

      const numRunners = race.entries.filter((e) => !e.isScratched).length;
      const pickCount = resolveTrioPickCount(picks, numRunners);
      const hvStdDev = parsed.venue === "Happy Valley" ? 11 : 8;
      const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
      const { results: simResults } = simulator.simulateRace(race);
      const mcPicked = simResults.slice(0, pickCount);
      if (mcPicked.length < 3) continue;

      const mcRank1 = mcPicked[0]!;
      const bankerWinOdds = loaded.winOddsMap.get(mcRank1.horseNumber) ?? 0;
      const useBanker = opts.oddsMax <= 0 || bankerWinOdds <= opts.oddsMax;

      let hasBanker = false;
      let legNumbers: number[] = [];
      let combinations = 0;

      if (useBanker) {
        hasBanker = true;
        legNumbers = mcPicked.slice(1).map((r) => r.horseNumber);
        combinations = comb(pickCount - 1, 2);
      } else {
        hasBanker = false;
        legNumbers = mcPicked.map((r) => r.horseNumber);
        combinations = comb(pickCount, 3);
      }

      const bankerNumber = mcRank1.horseNumber;
      const bankerName = mcRank1.horseName;

      rows.push({
        raceId: `${parsed.date}_${parsed.venue === "Happy Valley" ? "HV" : "ST"}_R${parsed.raceNumber}`,
        date: parsed.date,
        venue: parsed.venue === "Happy Valley" ? "HV" : "ST",
        raceNumber: parsed.raceNumber,
        raceClass: race.class,
        distance: race.distance,
        surface: race.surface,
        numRunners: race.entries.filter((e) => !e.isScratched).length,
        skipped,
        skipReason,
        hasBanker,
        bankerNumber,
        bankerName,
        bankerWinOdds,
        legNumbers,
        combinations,
        staked: skipped ? 0 : combinations * BET_UNIT,
        avgDiff: metrics.avgDiff,
      });
    }

    if (rows.length > 0) byMeeting.set(meetingKey, rows);
  }

  return byMeeting;
}

export function printUpcomingPlaceSuggestions(byMeeting: Map<string, UpcomingPlaceRace[]>) {
  console.log("\n" + "═".repeat(78));
  console.log("UPCOMING RACE BETTING SUGGESTIONS  (racecards without results file)");
  console.log("═".repeat(78));

  if (byMeeting.size === 0) {
    console.log("  (none — all matching meetings already have results files)\n");
    return;
  }

  for (const [, races] of [...byMeeting.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const first = races[0]!;
    const fmtDate = formatDateYmd(first.date);
    const betted = races.filter((r) => !r.skipped);
    const stake = betted.length * BET_UNIT;

    console.log(`\n${fmtDate} ${first.venue}  —  ${betted.length}/${races.length} races to bet  |  suggested stake $${stake} ($${BET_UNIT}/race)`);
    console.log("─".repeat(78));
    console.log(
      `${"Race".padEnd(8)} ${"Act".padEnd(5)} ${"Horse".padEnd(16)} ${"#".padStart(2)} ${"WinO".padStart(6)} ${"MCPl%".padStart(6)} ${"AvgD".padStart(5)} ${"Cls/Dist".padEnd(14)} ${"Skip reason"}`
    );
    console.log("─".repeat(78));

    for (const r of races) {
      const act = r.skipped ? "SKIP" : "BET";
      const winO = r.topRatedWinOdds > 0 ? r.topRatedWinOdds.toFixed(1) : "-";
      const mcPl = r.topRatedMcPlacePct > 0 ? (r.topRatedMcPlacePct * 100).toFixed(1) : "-";
      const clsDist = `${r.raceClass}/${r.distance}m`.substring(0, 13);
      const horse = r.topRatedHorseName ? r.topRatedHorseName.substring(0, 15) : "-";
      const num = r.topRatedHorseNumber > 0 ? r.topRatedHorseNumber.toString() : "-";
      console.log(
        `${(`R${r.raceNumber}`).padEnd(8)} ${act.padEnd(5)} ${horse.padEnd(16)} ${num.padStart(2)} ${winO.padStart(6)} ${mcPl.padStart(6)} ${r.avgDiff.toString().padStart(5)} ${clsDist.padEnd(14)} ${r.skipped ? r.skipReason : "Place on #1 rated"}`
      );
    }
  }
  console.log("─".repeat(78));
}

export function printUpcomingTrioSuggestions(byMeeting: Map<string, UpcomingTrioRace[]>) {
  console.log("\n" + "═".repeat(98));
  console.log("UPCOMING TRIO BETTING SUGGESTIONS  (racecards without results file)");
  console.log("═".repeat(98));

  if (byMeeting.size === 0) {
    console.log("  (none — all matching meetings already have results files)\n");
    return;
  }

  for (const [, races] of [...byMeeting.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const first = races[0]!;
    const fmtDate = formatDateYmd(first.date);
    const betted = races.filter((r) => !r.skipped);
    const stake = betted.reduce((s, r) => s + r.staked, 0);
    const flatStake = betted.length * BET_UNIT;

    console.log(`\n${fmtDate} ${first.venue}  —  ${betted.length}/${races.length} races to bet  |  full box stake $${stake}  |  flat $${BET_UNIT}/race = $${flatStake}`);
    console.log("─".repeat(98));
    console.log(
      `${"Race".padEnd(8)} ${"Act".padEnd(5)} ${"Horse".padEnd(16)} ${"#".padStart(2)} ${"Mode".padEnd(5)} ${"BnkO".padStart(5)} ${"Legs (#s)".padEnd(20)} ${"Combos".padStart(6)} ${"Stake".padStart(7)} ${"Skip reason"}`
    );
    console.log("─".repeat(98));

    for (const r of races) {
      const act = r.skipped ? "SKIP" : "BET";
      const horse = r.bankerName ? r.bankerName.substring(0, 15) : "-";
      const num = r.bankerNumber > 0 ? r.bankerNumber.toString() : "-";
      const mode = r.hasBanker ? "BKR" : "LEGS";
      const bnkO = r.bankerWinOdds > 0 ? r.bankerWinOdds.toFixed(1) : "-";
      const legs = r.legNumbers.length > 0 ? r.legNumbers.join(",") : "-";
      const combos = r.skipped ? "-" : r.combinations.toString();
      const st = r.skipped ? "-" : `$${r.staked}`;
      const note = r.skipped
        ? r.skipReason
        : r.hasBanker
          ? `Trio: #${r.bankerNumber} banker + legs ${legs}`
          : `Trio box legs ${legs}`;
      console.log(
        `${(`R${r.raceNumber}`).padEnd(8)} ${act.padEnd(5)} ${horse.padEnd(16)} ${num.padStart(2)} ${mode.padEnd(5)} ${bnkO.padStart(5)} ${legs.padEnd(20)} ${combos.padStart(6)} ${st.padStart(7)} ${note}`
      );
    }

    if (betted.length > 0) {
      const consecutivePairs: string[] = [];
      for (let i = 0; i < races.length - 1; i++) {
        const a = races[i]!;
        const b = races[i + 1]!;
        if (b.raceNumber !== a.raceNumber + 1) continue;
        if (!a.skipped && !b.skipped) {
          consecutivePairs.push(`R${a.raceNumber}+R${b.raceNumber}`);
        }
      }
      if (consecutivePairs.length > 0) {
        console.log(`  2-leg all-up pairs ($${BET_UNIT} each): ${consecutivePairs.join(", ")}  (${consecutivePairs.length}×$${BET_UNIT}=$${consecutivePairs.length * BET_UNIT})`);
      }
    }
  }
  console.log("─".repeat(98));
}
