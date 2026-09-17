/**
 * Trio banker strategy (shared by tools/backtest-trio-banker.ts).
 *
 * Banker = form #1 (top overall rating). Bet the race only when the banker's MC Place% clears
 * a threshold; legs = the next N runners by MC win% rank or form rating rank. Banker + N legs
 * = C(N,2) Trio combos. Standby horses (saddle-cloth number 0 on the card) are never picked.
 * No odds are used to pick or skip.
 */

import path from "path";
import { FormAnalyzer } from "../analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../simulation/monteCarlo.js";
import {
  applyFormSourceFilter,
  buildMcAccuracyPicks,
  loadMeetingResults,
  loadRaceCard,
  runMcAccuracyBacktest,
  winningCombos,
  type DifferentiationBacktestOptions,
  type FormSource,
  type McAccuracyPick,
  type McAccuracyRaceRow,
  type MeetingResults,
} from "./differentiationBacktest.js";
import { listUpcomingMeetings, loadMeetingRacecards } from "./upcomingBetSuggestions.js";

export const TRIO_BET_UNIT = 10;
/** MC runs per upcoming race, as analyze-race (the backtest runs 5,000) */
export const UPCOMING_MC_RUNS = 10_000;

export type LegRank = "mc" | "form";

interface Finisher {
  horseNumber: number;
  horseCode: string;
  finishPosition: number;
}

export interface TrioBankerRace {
  row: McAccuracyRaceRow;
  finishOrder: Finisher[];
  /** Trio dividend per $10 unit (0 when the results file has none) */
  trioDividend: number;
}

export interface TrioBankerRule {
  /** Bet only when the banker's MC Place% (0–100) is at least this; 0 = every race */
  bankerMcMin: number;
  legs: number;
  legRank: LegRank;
  /** Legs with fewer past runs at the race distance go behind proven runners; 0 or unset = off */
  legMinTripRuns?: number;
}

/** What to bet in one race: banker + legs = C(legs, 2) combos */
export interface TrioBankerPlan {
  banker: McAccuracyPick;
  legs: McAccuracyPick[];
  combos: number;
  stake: number;
}

export interface TrioBankerTicket extends TrioBankerPlan {
  race: TrioBankerRace;
  bankerPlaced: boolean;
  hit: boolean;
  payout: number;
}

export interface TrioBankerSummary {
  bets: number;
  bankerPlaced: number;
  hits: number;
  stake: number;
  payout: number;
  /** % return on stake; null with no bets */
  roi: number | null;
}

export function combinations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let result = 1;
  for (let i = 0; i < k; i++) result = (result * (n - i)) / (i + 1);
  return Math.round(result);
}

/** Standby horses carry saddle-cloth number 0 and only run if another horse is withdrawn. */
const isNumberedRunner = (p: McAccuracyPick): boolean => p.horseNumber > 0;

/** The banker: the best form rating among numbered runners (normally form #1). */
export function selectBanker(picks: McAccuracyPick[]): McAccuracyPick | undefined {
  return picks.filter(isNumberedRunner).sort((a, b) => a.ratingRank - b.ratingRank)[0];
}

/**
 * The `count` numbered runners after the banker, ranked by MC win% or form rating. With
 * `minTripRuns` > 0, runners with fewer past runs at the race distance go behind proven ones.
 */
export function selectLegs(
  picks: McAccuracyPick[],
  count: number,
  rank: LegRank,
  minTripRuns = 0
): McAccuracyPick[] {
  const banker = selectBanker(picks);
  const unproven = (p: McAccuracyPick): number => (p.tripRuns < minTripRuns ? 1 : 0);
  return picks
    .filter((p) => isNumberedRunner(p) && p !== banker)
    .sort(
      (a, b) =>
        unproven(a) - unproven(b) || (rank === "mc" ? a.mcRank - b.mcRank : a.ratingRank - b.ratingRank)
    )
    .slice(0, count);
}

/** True when a winning Trio is the banker plus two legs (either winning combo on a dead-heat). */
export function trioBankerHit(bankerCode: string, legCodes: string[], finishOrder: Finisher[]): boolean {
  return winningCombos(finishOrder, 3).some(
    (set) => set.includes(bankerCode) && set.every((c) => c === bankerCode || legCodes.includes(c))
  );
}

/** Banker + legs for one race, or null when the banker's MC Place% is below the threshold (skip). */
export function planTrioBanker(picks: McAccuracyPick[], rule: TrioBankerRule): TrioBankerPlan | null {
  const banker = selectBanker(picks);
  if (!banker || banker.mcPlacePct * 100 < rule.bankerMcMin) return null;
  const legs = selectLegs(picks, rule.legs, rule.legRank, rule.legMinTripRuns ?? 0);
  const combos = combinations(legs.length, 2);
  return { banker, legs, combos, stake: combos * TRIO_BET_UNIT };
}

/** The settled ticket for one race, or null when the rule skips it. */
export function evaluateTrioBanker(race: TrioBankerRace, rule: TrioBankerRule): TrioBankerTicket | null {
  const plan = planTrioBanker(race.row.picks, rule);
  if (!plan) return null;
  const hit = trioBankerHit(plan.banker.horseCode, plan.legs.map((l) => l.horseCode), race.finishOrder);
  return { ...plan, race, bankerPlaced: plan.banker.placed, hit, payout: hit ? race.trioDividend : 0 };
}

export function summarizeTickets(tickets: TrioBankerTicket[]): TrioBankerSummary {
  const stake = tickets.reduce((s, t) => s + t.stake, 0);
  const payout = tickets.reduce((s, t) => s + t.payout, 0);
  return {
    bets: tickets.length,
    bankerPlaced: tickets.filter((t) => t.bankerPlaced).length,
    hits: tickets.filter((t) => t.hit).length,
    stake,
    payout,
    roi: stake > 0 ? ((payout - stake) / stake) * 100 : null,
  };
}

export interface TrioBankerLoadOptions {
  months: string[];
  venue: "ST" | "HV" | null;
  surface: "Turf" | "AWT" | null;
  form: FormSource;
  ignoreAfter?: string;
}

/** Backtest options with every differentiation skip rule off — the banker's MC Place% is the only filter. */
function toBacktestOptions(opts: TrioBankerLoadOptions): DifferentiationBacktestOptions {
  return {
    sparseMax: 99,
    closeMax: 99,
    avgDiffMin: 0,
    gapMin: 0,
    oddsMax: 0,
    ratingChangeMin: null,
    ignoreClasses: [],
    ignoreDistances: [],
    ...opts,
  };
}

/** Every saved race with results: form + MC ranks for all runners, finish order and Trio dividend. */
export async function loadTrioBankerRaces(opts: TrioBankerLoadOptions): Promise<TrioBankerRace[]> {
  const rows = await runMcAccuracyBacktest(toBacktestOptions(opts));

  const meetings = new Map<string, MeetingResults>();
  const races: TrioBankerRace[] = [];
  for (const row of rows) {
    const key = `${row.date}_${row.venue}`;
    let meeting = meetings.get(key);
    if (!meeting) {
      meeting = await loadMeetingResults(row.date, row.venue === "HV" ? "Happy Valley" : "Sha Tin");
      meetings.set(key, meeting);
    }
    races.push({
      row,
      finishOrder: meeting.finishOrders.get(row.raceNumber) ?? [],
      trioDividend: meeting.trioDividendMap.get(row.raceNumber) ?? 0,
    });
  }
  return races;
}

export interface UpcomingTrioBankerRace {
  raceId: string;
  date: string;
  venue: "HV" | "ST";
  raceNumber: number;
  raceClass: string;
  distance: number;
  /** Runners with a saddle-cloth number (standby horses left out) */
  numRunners: number;
  picks: McAccuracyPick[];
}

/**
 * Saved racecards whose meeting has no results file yet, with the same picks as the backtest
 * (form order, MC ranks, trip runs). The MC runs UPCOMING_MC_RUNS iterations per race.
 */
export async function loadUpcomingTrioBankerRaces(opts: TrioBankerLoadOptions): Promise<UpcomingTrioBankerRace[]> {
  const backtestOpts = toBacktestOptions(opts);
  const raceCardDir = path.join(process.cwd(), "data", "racecards");
  const formAnalyzer = new FormAnalyzer();
  const races: UpcomingTrioBankerRace[] = [];

  for (const meetingKey of await listUpcomingMeetings(backtestOpts)) {
    for (const { file, parsed } of await loadMeetingRacecards(meetingKey, backtestOpts)) {
      const loaded = await loadRaceCard(path.join(raceCardDir, file));
      if (!loaded) continue;
      const race = applyFormSourceFilter(loaded.race, opts.form);
      const numRunners = race.entries.filter((e) => !e.isScratched && e.horseNumber > 0).length;
      if (numRunners < 4 || (opts.surface && race.surface !== opts.surface)) continue;

      const analyses = formAnalyzer.analyzeRace(race);
      if (analyses.length === 0) continue;
      const simulator = new MonteCarloSimulator({
        runs: UPCOMING_MC_RUNS,
        performanceStdDev: parsed.venue === "Happy Valley" ? 11 : 8,
      });
      const { results: simResults } = simulator.simulateRace(race);

      const venue = parsed.venue === "Happy Valley" ? "HV" : "ST";
      races.push({
        raceId: `${parsed.date}_${venue}_R${parsed.raceNumber}`,
        date: parsed.date,
        venue,
        raceNumber: parsed.raceNumber,
        raceClass: race.class,
        distance: race.distance,
        numRunners,
        picks: buildMcAccuracyPicks(race, analyses, simResults, loaded.winOddsMap),
      });
    }
  }
  return races;
}
