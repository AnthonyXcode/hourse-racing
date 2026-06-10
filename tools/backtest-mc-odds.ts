#!/usr/bin/env tsx
/**
 * Backtest: place bet on lowest win-odds horse within MC top-x.
 *
 * Strategy per race (non-skipped):
 *   1. Rank runners by MC win%
 *   2. Take the first x by MC rank
 *   3. Bet place ($10) on whichever has the lowest win odds in that pool
 *
 * Same pool / skip rules as backtest-differentiation.ts.
 *
 * CLI: all backtest-differentiation flags plus:
 *   --max-rank=6   highest MC top-x to test (default 6)
 *   --stake=10     HK$ per place bet (default 10)
 */

import {
  parseDifferentiationBacktestCliArgs,
  runMcAccuracyBacktest,
  type McAccuracyPick,
  type McAccuracyRaceRow,
} from "../src/backtest/differentiationBacktest.js";

const BET_UNIT_DEFAULT = 10;
const MAX_RANK_DEFAULT = 6;

interface StrategyStats {
  mcTopX: number;
  races: number;
  bets: number;
  hits: number;
  miss: number;
  hitRatePct: string;
  cost: number;
  returnAmt: number;
  roiPct: string;
}

function parseToolArgs(argv: string[]) {
  const base = parseDifferentiationBacktestCliArgs(argv);
  let maxRank = MAX_RANK_DEFAULT;
  let stake = BET_UNIT_DEFAULT;

  for (const arg of argv) {
    const m = arg.match(/^--([a-zA-Z-]+)=(.+)$/);
    if (!m) continue;
    const key = m[1]!;
    const val = m[2] ?? "";
    if (key === "max-rank") maxRank = parseInt(val, 10);
    else if (key === "stake") stake = parseFloat(val);
  }

  return { ...base, maxRank, stake };
}

/** Lowest win odds among MC ranks 1..mcTopX; tie-break by better MC rank. */
export function selectMcOddsPick(picks: McAccuracyPick[], mcTopX: number): McAccuracyPick | undefined {
  const pool = picks.filter((p) => p.mcRank <= mcTopX);
  if (pool.length === 0) return undefined;

  return pool.reduce((best, p) => {
    const pKey = p.winOdds > 0 ? p.winOdds : Number.POSITIVE_INFINITY;
    const bKey = best.winOdds > 0 ? best.winOdds : Number.POSITIVE_INFINITY;
    if (pKey < bKey) return p;
    if (pKey > bKey) return best;
    return p.mcRank < best.mcRank ? p : best;
  });
}

function placePayout(pick: McAccuracyPick, stake: number): number {
  if (!pick.placed) return 0;
  return pick.placeOdds > 0 ? pick.placeOdds * stake : stake;
}

function statsForMcTopX(rows: McAccuracyRaceRow[], mcTopX: number, stake: number): StrategyStats {
  const active = rows.filter((r) => !r.skipped);
  let bets = 0;
  let hits = 0;
  let returnAmt = 0;

  for (const row of active) {
    const pick = selectMcOddsPick(row.picks, mcTopX);
    if (!pick) continue;
    bets++;
    if (pick.placed) {
      hits++;
      returnAmt += placePayout(pick, stake);
    }
  }

  const cost = bets * stake;
  const miss = bets - hits;
  const hitRatePct = bets > 0 ? ((hits / bets) * 100).toFixed(1) + "%" : "N/A";
  const roiPct = cost > 0 ? (((returnAmt - cost) / cost) * 100).toFixed(1) + "%" : "N/A";

  return {
    mcTopX,
    races: active.length,
    bets,
    hits,
    miss,
    hitRatePct,
    cost,
    returnAmt,
    roiPct,
  };
}

async function main() {
  const {
    sparseMax,
    closeMax,
    avgDiffMin,
    gapMin,
    oddsMax,
    ratingChangeMin,
    months,
    venue,
    surface,
    ignoreClasses,
    ignoreDistances,
    form,
    ignoreAfter,
    maxRank,
    stake,
  } = parseToolArgs(process.argv.slice(2));

  const monthLabel = months.length === 0 ? "all" : months.join(",");
  const venueLabel = venue ?? "all";
  const surfaceLabel = surface ?? "all";
  const formLabel = form === "all" ? "all (ST+HV)" : form === "ST" ? "ST only" : "HV only";
  const ignoreClassLabel = ignoreClasses.length === 0 ? "none" : ignoreClasses.join(",");
  const ignoreDistLabel = ignoreDistances.length === 0 ? "none" : ignoreDistances.map((d) => `${d}m`).join(",");
  const ignoreAfterLabel = ignoreAfter ?? "none";
  const oddsLabel = oddsMax > 0 ? `>${oddsMax}` : "off";
  const rtgChangeLabel =
    ratingChangeMin !== null && ratingChangeMin !== undefined ? `Rtg+/>${ratingChangeMin}` : "off";

  console.log("MC + ODDS PLACE BACKTEST");
  console.log("Strategy: within MC top-x, bet place on lowest win odds");
  console.log(
    `Skip rules: sparse>${sparseMax}, close<8>${closeMax}, avgDiff<${avgDiffMin}, 1st-2nd gap<${gapMin}, odds ${oddsLabel}, ${rtgChangeLabel}`
  );
  console.log(
    `Pool: months=${monthLabel} | venue=${venueLabel} | surface=${surfaceLabel} | form=${formLabel} | ignore-class=${ignoreClassLabel} | ignore-distance=${ignoreDistLabel} | ignore-after=${ignoreAfterLabel}`
  );
  console.log(`Stake: $${stake} per race | max-rank=${maxRank}\n`);

  const rows = await runMcAccuracyBacktest({
    sparseMax,
    closeMax,
    avgDiffMin,
    gapMin,
    oddsMax,
    ratingChangeMin,
    months,
    venue,
    surface,
    ignoreClasses,
    ignoreDistances,
    form,
    ...(ignoreAfter ? { ignoreAfter } : {}),
  });

  const active = rows.filter((r) => !r.skipped);
  const skipped = rows.length - active.length;
  console.log(`Races with results: ${rows.length} — betting ${active.length}, skipping ${skipped}\n`);

  const width = 96;
  console.log("═".repeat(width));
  console.log(`SUMMARY: MC TOP-x → LOWEST ODDS PLACE ($${stake})`);
  console.log("═".repeat(width));
  console.log(
    `${"MC top".padStart(6)} ${"Races".padStart(5)} ${"Bets".padStart(5)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"HitRate".padStart(8)} ${"Cost".padStart(9)} ${"Return".padStart(9)} ${"ROI".padStart(8)}`
  );
  console.log("─".repeat(width));

  let bestHitRate = -1;
  let bestX = 0;
  let bestRoi = Number.NEGATIVE_INFINITY;
  let bestRoiX = 0;

  for (let x = 1; x <= maxRank; x++) {
    const s = statsForMcTopX(rows, x, stake);
    if (s.bets === 0) continue;
    console.log(
      `${x.toString().padStart(6)} ${s.races.toString().padStart(5)} ${s.bets.toString().padStart(5)} ${s.hits.toString().padStart(4)} ${s.miss.toString().padStart(4)} ${s.hitRatePct.padStart(8)} ${("$" + s.cost.toFixed(0)).padStart(9)} ${("$" + s.returnAmt.toFixed(0)).padStart(9)} ${s.roiPct.padStart(8)}`
    );
    const rate = s.bets > 0 ? (s.hits / s.bets) * 100 : 0;
    if (rate > bestHitRate) {
      bestHitRate = rate;
      bestX = x;
    }
    const roi = s.cost > 0 ? ((s.returnAmt - s.cost) / s.cost) * 100 : Number.NEGATIVE_INFINITY;
    if (roi > bestRoi) {
      bestRoi = roi;
      bestRoiX = x;
    }
  }

  console.log("─".repeat(width));
  if (bestX > 0) {
    console.log(`  Best hit rate: MC top-${bestX} (${bestHitRate.toFixed(1)}%)`);
  }
  if (bestRoiX > 0 && Number.isFinite(bestRoi)) {
    console.log(`  Best ROI: MC top-${bestRoiX} (${bestRoi.toFixed(1)}%)`);
  }
  console.log(`  x=1 is MC #1 only; x>1 picks market favourite among MC top-x`);
  console.log("═".repeat(width));
}

main().catch(console.error);
