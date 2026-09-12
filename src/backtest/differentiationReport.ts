/**
 * Differentiation backtest report — everything tools/backtest-differentiation.ts prints, as
 * JSON-safe data. Shared by the CLI and the API (POST /v1/backtests/differentiation).
 */

import {
  runDifferentiationBacktest,
  summarizeBreakdown,
  summarizeClassDistanceVenue,
  type BreakdownStats,
  type BreakdownSummary,
  type ClassDistanceVenueRow,
  type DifferentiationBacktestOptions,
  type DifferentiationBacktestRow,
} from "./differentiationBacktest.js";
import { runUpcomingPlaceSuggestions, type UpcomingPlaceRace } from "./upcomingBetSuggestions.js";

type Row = DifferentiationBacktestRow;

/** $ per bet on the 1st-ranked horse, and per racing day for all-up place */
export const BET_UNIT = 10;

export interface BacktestTotals {
  races: number;
  betted: number;
  bettedHits: number;
  skipped: number;
  /** Skipped races where the top-rated pick placed anyway */
  skippedHits: number;
  /** Races where the top-rated pick placed, ignoring the skip rules */
  allPlaces: number;
}

export interface DayStats {
  /** YYYYMMDD */
  date: string;
  venue: "HV" | "ST";
  total: number;
  bet: number;
  hits: number;
  wins: number;
  skip: number;
  /** Percentages; null when the day has no bets */
  hitRate: number | null;
  winRoi: number | null;
  placeRoi: number | null;
  /** $10 all-up place compounded through the day's bets (0 if any leg missed); null when no bets */
  allUpPayout: number | null;
}

export interface DayTotals {
  races: number;
  bet: number;
  hits: number;
  wins: number;
  skip: number;
  hitRate: number | null;
  winRoi: number | null;
  placeRoi: number | null;
  /** Days with at least one bet */
  allUpDays: number;
  allUpCost: number;
  allUpReturn: number;
  allUpRoi: number | null;
}

export interface MonthStats {
  /** YYYY-MM */
  month: string;
  /** Racing days with at least one bet */
  days: number;
  bet: number;
  hits: number;
  wins: number;
  cost: number;
  winReturn: number;
  placeReturn: number;
  /** Percentages; null when the month has no bets */
  hitRate: number | null;
  winRate: number | null;
  winRoi: number | null;
  placeRoi: number | null;
  allUpReturn: number;
  allUpRoi: number | null;
}

export interface MonthTotals extends Omit<MonthStats, "month"> {
  allUpCost: number;
}

export interface DifferentiationReport {
  totals: BacktestTotals;
  /** One row per saved racecard with results, in file order */
  races: Row[];
  byDay: { days: DayStats[]; total: DayTotals };
  byMonth: { months: MonthStats[]; total: MonthTotals };
  breakdowns: {
    /** Omitted when the run is already filtered to one venue and one surface */
    venue?: BreakdownSummary;
    surface?: BreakdownSummary;
    going: BreakdownSummary;
    runners: BreakdownSummary;
    mcPlacePct: BreakdownSummary;
    winOdds: BreakdownSummary;
    expectedPosition: BreakdownSummary;
    rating: BreakdownSummary;
    avgDiff: BreakdownSummary;
    topGap: BreakdownSummary;
    close8: BreakdownSummary;
    ratingChange: BreakdownSummary;
  };
  classDistanceVenue: { rows: ClassDistanceVenueRow[]; total: BreakdownStats };
  /** Skipped races per reason, most common first */
  skipReasons: { reason: string; count: number }[];
  /** Meetings with racecards but no results file yet, with the BET/SKIP call per race */
  upcoming: { meeting: string; races: UpcomingPlaceRace[] }[];
}

// ============================================================================
// HELPERS
// ============================================================================

const percent = (part: number, whole: number): number | null => (whole > 0 ? (part / whole) * 100 : null);
const roi = (ret: number, cost: number): number | null => (cost > 0 ? ((ret - cost) / cost) * 100 : null);

function winReturn(betted: Row[]): number {
  return betted
    .filter((r) => r.topRatedWon)
    .reduce((sum, r) => sum + (r.topRatedWinOdds > 0 ? r.topRatedWinOdds * BET_UNIT : BET_UNIT), 0);
}

function placeReturn(betted: Row[]): number {
  return betted
    .filter((r) => r.topRatedPlaced)
    .reduce((sum, r) => sum + (r.topRatedPlaceOdds > 0 ? r.topRatedPlaceOdds * BET_UNIT : BET_UNIT), 0);
}

/** All-up place: $10 compounds through all legs; $0 if any leg misses */
function allUpPlacePayout(betted: Row[]): number {
  if (!betted.every((r) => r.topRatedPlaced)) return 0;
  let payout = BET_UNIT;
  for (const r of betted) {
    payout *= r.topRatedPlaceOdds > 0 ? r.topRatedPlaceOdds : 1;
  }
  return payout;
}

function groupBy(rows: Row[], keyOf: (r: Row) => string): Map<string, Row[]> {
  const groups = new Map<string, Row[]>();
  for (const r of rows) {
    const key = keyOf(r);
    const group = groups.get(key);
    if (group) group.push(r);
    else groups.set(key, [r]);
  }
  return groups;
}

interface Bucket {
  label: string;
  min: number;
  max: number;
}

/**
 * Rows grouped into [min, max) buckets, in bucket order then "N/A".
 * Values outside every bucket are left out, as in the CLI tables.
 */
function bucketGroups(
  rows: Row[],
  buckets: Bucket[],
  valueOf: (r: Row) => number,
  nonPositiveIsNA = false
): Map<string, Row[]> {
  const found = groupBy(
    rows.filter((r) => (nonPositiveIsNA && valueOf(r) <= 0) || buckets.some((b) => valueOf(r) >= b.min && valueOf(r) < b.max)),
    (r) => {
      const v = valueOf(r);
      if (nonPositiveIsNA && v <= 0) return "N/A";
      return buckets.find((b) => v >= b.min && v < b.max)!.label;
    }
  );
  const ordered = new Map<string, Row[]>();
  for (const key of [...buckets.map((b) => b.label), "N/A"]) {
    const group = found.get(key);
    if (group) ordered.set(key, group);
  }
  return ordered;
}

const ODDS_BUCKETS: Bucket[] = [
  { label: "1-3", min: 1, max: 3 },
  { label: "3-5", min: 3, max: 5 },
  { label: "5-7", min: 5, max: 7 },
  { label: "7-9", min: 7, max: 10 },
  { label: "10-15", min: 10, max: 15 },
  { label: "15+", min: 15, max: Infinity },
];

const EXPECTED_POSITION_BUCKETS: Bucket[] = (() => {
  const buckets: Bucket[] = [];
  for (let min = 1.0; min < 6.0; min += 0.5) {
    const max = min + 0.5;
    buckets.push({ label: `${min.toFixed(1)}-${max.toFixed(1)}`, min, max });
  }
  buckets.push({ label: "6.0+", min: 6.0, max: Infinity });
  return buckets;
})();

const RATING_BUCKETS: Bucket[] = [
  { label: "<60", min: -Infinity, max: 60 },
  { label: "60-65", min: 60, max: 65 },
  { label: "65-70", min: 65, max: 70 },
  { label: "70-75", min: 70, max: 75 },
  { label: "75-80", min: 75, max: 80 },
  { label: "80-85", min: 80, max: 85 },
  { label: "85-90", min: 85, max: 90 },
  { label: "90-95", min: 90, max: 95 },
  { label: "95+", min: 95, max: Infinity },
];

const AVG_DIFF_BUCKETS: Bucket[] = [
  { label: "11-13", min: 11, max: 13 },
  { label: "13-15", min: 13, max: 15 },
  { label: "15-18", min: 15, max: 18 },
  { label: "18-22", min: 18, max: 22 },
  { label: "22-27", min: 22, max: 27 },
  { label: "27+", min: 27, max: Infinity },
];

const TOP_GAP_BUCKETS: Bucket[] = [
  { label: "1", min: 1, max: 2 },
  { label: "2-3", min: 2, max: 4 },
  { label: "4-6", min: 4, max: 7 },
  { label: "7-10", min: 7, max: 11 },
  { label: "11+", min: 11, max: Infinity },
];

/** One bucket per integer Rtg+/- ("+3", "-1"), sorted numerically, "N/A" last */
function ratingChangeGroups(rows: Row[]): Map<string, Row[]> {
  const groups = groupBy(rows, (r) => {
    const change = r.topRatedRatingChange;
    if (change === undefined) return "N/A";
    return change > 0 ? `+${change}` : String(change);
  });
  const sortValue = (key: string): number => {
    if (key === "N/A") return Infinity;
    if (key.startsWith("+")) return parseInt(key.slice(1), 10);
    return parseInt(key, 10);
  };
  return new Map([...groups.entries()].sort((a, b) => sortValue(a[0]) - sortValue(b[0])));
}

// ============================================================================
// SUMMARIES
// ============================================================================

function summarizeByDay(rows: Row[]): DifferentiationReport["byDay"] {
  const sortedDays = [...groupBy(rows, (r) => `${r.date}_${r.venue}`).entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const days: DayStats[] = [];
  let bet = 0;
  let hits = 0;
  let wins = 0;
  let cost = 0;
  let winRet = 0;
  let plaRet = 0;
  let allUpDays = 0;
  let allUpRet = 0;

  for (const [, races] of sortedDays) {
    const betted = races.filter((r) => !r.skipped);
    const dayHits = betted.filter((r) => r.topRatedPlaced).length;
    const dayWins = betted.filter((r) => r.topRatedWon).length;
    const dayCost = betted.length * BET_UNIT;
    const dayWinReturn = winReturn(betted);
    const dayPlaReturn = placeReturn(betted);

    let allUpPayout: number | null = null;
    if (betted.length > 0) {
      allUpDays++;
      allUpPayout = allUpPlacePayout(betted);
      allUpRet += allUpPayout;
    }

    days.push({
      date: races[0]!.date,
      venue: races[0]!.venue,
      total: races.length,
      bet: betted.length,
      hits: dayHits,
      wins: dayWins,
      skip: races.length - betted.length,
      hitRate: percent(dayHits, betted.length),
      winRoi: roi(dayWinReturn, dayCost),
      placeRoi: roi(dayPlaReturn, dayCost),
      allUpPayout,
    });

    bet += betted.length;
    hits += dayHits;
    wins += dayWins;
    cost += dayCost;
    winRet += dayWinReturn;
    plaRet += dayPlaReturn;
  }

  const allUpCost = allUpDays * BET_UNIT;
  return {
    days,
    total: {
      races: rows.length,
      bet,
      hits,
      wins,
      skip: rows.length - bet,
      hitRate: percent(hits, bet),
      winRoi: roi(winRet, cost),
      placeRoi: roi(plaRet, cost),
      allUpDays,
      allUpCost,
      allUpReturn: allUpRet,
      allUpRoi: roi(allUpRet, allUpCost),
    },
  };
}

function summarizeByMonth(rows: Row[]): DifferentiationReport["byMonth"] {
  const sortedMonths = [...groupBy(rows, (r) => `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}`).entries()].sort(
    (a, b) => a[0].localeCompare(b[0])
  );

  const months: MonthStats[] = [];
  let tDays = 0;
  let tBet = 0;
  let tHits = 0;
  let tWins = 0;
  let tCost = 0;
  let tWinRet = 0;
  let tPlaRet = 0;
  let tAllUpRet = 0;

  for (const [month, races] of sortedMonths) {
    const betted = races.filter((r) => !r.skipped);
    const mHits = betted.filter((r) => r.topRatedPlaced).length;
    const mWins = betted.filter((r) => r.topRatedWon).length;
    const mCost = betted.length * BET_UNIT;
    const mWinRet = winReturn(betted);
    const mPlaRet = placeReturn(betted);

    // All-up place: $10 per racing day, compound across all betted legs
    let days = 0;
    let allUpRet = 0;
    for (const dayRaces of groupBy(races, (r) => `${r.date}_${r.venue}`).values()) {
      const dayBetted = dayRaces.filter((r) => !r.skipped);
      if (dayBetted.length === 0) continue;
      days++;
      allUpRet += allUpPlacePayout(dayBetted);
    }

    months.push({
      month,
      days,
      bet: betted.length,
      hits: mHits,
      wins: mWins,
      cost: mCost,
      winReturn: mWinRet,
      placeReturn: mPlaRet,
      hitRate: percent(mHits, betted.length),
      winRate: percent(mWins, betted.length),
      winRoi: roi(mWinRet, mCost),
      placeRoi: roi(mPlaRet, mCost),
      allUpReturn: allUpRet,
      allUpRoi: roi(allUpRet, days * BET_UNIT),
    });

    tDays += days;
    tBet += betted.length;
    tHits += mHits;
    tWins += mWins;
    tCost += mCost;
    tWinRet += mWinRet;
    tPlaRet += mPlaRet;
    tAllUpRet += allUpRet;
  }

  const allUpCost = tDays * BET_UNIT;
  return {
    months,
    total: {
      days: tDays,
      bet: tBet,
      hits: tHits,
      wins: tWins,
      cost: tCost,
      winReturn: tWinRet,
      placeReturn: tPlaRet,
      hitRate: percent(tHits, tBet),
      winRate: percent(tWins, tBet),
      winRoi: roi(tWinRet, tCost),
      placeRoi: roi(tPlaRet, tCost),
      allUpCost,
      allUpReturn: tAllUpRet,
      allUpRoi: roi(tAllUpRet, allUpCost),
    },
  };
}

function summarizeBreakdowns(
  rows: Row[],
  opts: Pick<DifferentiationBacktestOptions, "venue" | "surface">
): DifferentiationReport["breakdowns"] {
  // By venue / surface is redundant when the run already filters by both
  const venueAndSurface =
    opts.venue && opts.surface
      ? {}
      : {
          venue: summarizeBreakdown(groupBy(rows, (r) => r.venue)),
          surface: summarizeBreakdown(groupBy(rows, (r) => r.surface)),
        };

  return {
    ...venueAndSurface,
    // Going is race-time actual, synced from results
    going: summarizeBreakdown(groupBy(rows, (r) => r.going || "(unknown)")),
    runners: summarizeBreakdown(groupBy(rows, (r) => `${r.numRunners}`)),
    mcPlacePct: summarizeBreakdown(
      groupBy(rows, (r) => {
        const lower = Math.floor((r.topRatedMcPlacePct * 100) / 5) * 5;
        return `${lower}-${lower + 5}%`;
      })
    ),
    winOdds: summarizeBreakdown(bucketGroups(rows, ODDS_BUCKETS, (r) => r.topRatedWinOdds, true)),
    expectedPosition: summarizeBreakdown(
      bucketGroups(rows, EXPECTED_POSITION_BUCKETS, (r) => r.topRatedExpectedPosition, true),
      { preserveOrder: true }
    ),
    rating: summarizeBreakdown(bucketGroups(rows, RATING_BUCKETS, (r) => r.overallRating), { preserveOrder: true }),
    avgDiff: summarizeBreakdown(bucketGroups(rows, AVG_DIFF_BUCKETS, (r) => r.avgDiff)),
    topGap: summarizeBreakdown(bucketGroups(rows, TOP_GAP_BUCKETS, (r) => r.topGap)),
    close8: summarizeBreakdown(groupBy(rows, (r) => `${r.horsesWithDiffLt8}`)),
    ratingChange: summarizeBreakdown(ratingChangeGroups(rows), { preserveOrder: true }),
  };
}

// ============================================================================
// REPORT
// ============================================================================

export function buildDifferentiationReport(
  rows: Row[],
  upcoming: Map<string, UpcomingPlaceRace[]>,
  opts: Pick<DifferentiationBacktestOptions, "venue" | "surface">
): DifferentiationReport {
  const betted = rows.filter((r) => !r.skipped);
  const skipped = rows.filter((r) => r.skipped);

  const skipReasonCounts = new Map<string, number>();
  for (const r of skipped) {
    skipReasonCounts.set(r.skipReason, (skipReasonCounts.get(r.skipReason) ?? 0) + 1);
  }

  return {
    totals: {
      races: rows.length,
      betted: betted.length,
      bettedHits: betted.filter((r) => r.topRatedPlaced).length,
      skipped: skipped.length,
      skippedHits: skipped.filter((r) => r.topRatedPlaced).length,
      allPlaces: rows.filter((r) => r.topRatedPlaced).length,
    },
    races: rows,
    byDay: summarizeByDay(rows),
    byMonth: summarizeByMonth(rows),
    breakdowns: summarizeBreakdowns(rows, opts),
    classDistanceVenue: summarizeClassDistanceVenue(rows),
    skipReasons: [...skipReasonCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([reason, count]) => ({ reason, count })),
    upcoming: [...upcoming.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([meeting, races]) => ({ meeting, races })),
  };
}

/** Runs the backtest, then the upcoming-race suggestions, with the same options. */
export async function runDifferentiationReport(opts: DifferentiationBacktestOptions): Promise<DifferentiationReport> {
  const rows = await runDifferentiationBacktest(opts);
  const upcoming = await runUpcomingPlaceSuggestions(opts);
  return buildDifferentiationReport(rows, upcoming, opts);
}
