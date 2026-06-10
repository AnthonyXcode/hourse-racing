#!/usr/bin/env tsx
/**
 * Backtest: place hit rate by form-rating rank and MC win% rank.
 *
 * Uses the same race pool and skip rules as backtest-differentiation.ts.
 * Reports per-rank place accuracy and top-1..x portfolio cost/return ($10 per leg).
 *
 * CLI (same flags as backtest-differentiation plus --max-rank, --stake):
 *   --sparse, --close, --avgdiff, --gap, --odds, --ratingchange,
 *   --months, --venue, --surface, --ignore-class, --ignore-distance,
 *   --form / --form-data, --ignore-after
 *   --max-rank=6   highest rank to include in portfolio table (default 6)
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

type RankKey = "ratingRank" | "mcRank";

interface PlaceBetStats {
  races: number;
  bets: number;
  hits: number;
  miss: number;
  hitRatePct: string;
  cost: number;
  returnAmt: number;
  roiPct: string;
  racesWithHit: number;
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

function pickByRank(picks: McAccuracyPick[], rankKey: RankKey, rank: number): McAccuracyPick | undefined {
  return picks.find((p) => p[rankKey] === rank);
}

function placePayout(pick: McAccuracyPick, stake: number): number {
  if (!pick.placed) return 0;
  return pick.placeOdds > 0 ? pick.placeOdds * stake : stake;
}

function statsForSingleRank(
  rows: McAccuracyRaceRow[],
  rankKey: RankKey,
  rank: number,
  stake: number
): PlaceBetStats {
  const active = rows.filter((r) => !r.skipped);
  let races = 0;
  let bets = 0;
  let hits = 0;
  let returnAmt = 0;
  let racesWithHit = 0;

  for (const row of active) {
    const pick = pickByRank(row.picks, rankKey, rank);
    if (!pick) continue;
    races++;
    bets++;
    if (pick.placed) {
      hits++;
      returnAmt += placePayout(pick, stake);
      racesWithHit++;
    }
  }

  const cost = bets * stake;
  const miss = bets - hits;
  const hitRatePct = bets > 0 ? ((hits / bets) * 100).toFixed(1) + "%" : "N/A";
  const roiPct = cost > 0 ? (((returnAmt - cost) / cost) * 100).toFixed(1) + "%" : "N/A";

  return {
    races,
    bets,
    hits,
    miss,
    hitRatePct,
    cost,
    returnAmt,
    roiPct,
    racesWithHit,
  };
}

function statsForTopX(
  rows: McAccuracyRaceRow[],
  rankKey: RankKey,
  x: number,
  stake: number
): PlaceBetStats {
  const active = rows.filter((r) => !r.skipped);
  let bets = 0;
  let hits = 0;
  let returnAmt = 0;
  let racesWithHit = 0;

  for (const row of active) {
    const legs = row.picks.filter((p) => p[rankKey] <= x && p[rankKey] <= row.numRunners);
    if (legs.length === 0) continue;
    let raceHit = false;
    for (const pick of legs) {
      bets++;
      if (pick.placed) {
        hits++;
        returnAmt += placePayout(pick, stake);
        raceHit = true;
      }
    }
    if (raceHit) racesWithHit++;
  }

  const cost = bets * stake;
  const miss = bets - hits;
  const hitRatePct = bets > 0 ? ((hits / bets) * 100).toFixed(1) + "%" : "N/A";
  const roiPct = cost > 0 ? (((returnAmt - cost) / cost) * 100).toFixed(1) + "%" : "N/A";

  return {
    races: active.length,
    bets,
    hits,
    miss,
    hitRatePct,
    cost,
    returnAmt,
    roiPct,
    racesWithHit,
  };
}

function printPlaceStatsTable(
  title: string,
  rows: McAccuracyRaceRow[],
  rankKey: RankKey,
  maxRank: number,
  stake: number
) {
  const width = 100;
  console.log("\n" + "═".repeat(width));
  console.log(title);
  console.log("═".repeat(width));
  console.log(
    `${"Rank".padStart(4)} ${"Races".padStart(5)} ${"Bets".padStart(5)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"HitRate".padStart(8)} ${"RaceHit".padStart(7)} ${"Cost".padStart(9)} ${"Return".padStart(9)} ${"ROI".padStart(8)}`
  );
  console.log("─".repeat(width));

  let tBets = 0;
  let tHits = 0;
  let tCost = 0;
  let tReturn = 0;
  let tRaceHit = 0;
  const active = rows.filter((r) => !r.skipped);

  for (let rank = 1; rank <= maxRank; rank++) {
    const s = statsForSingleRank(rows, rankKey, rank, stake);
    if (s.bets === 0) continue;
    console.log(
      `${rank.toString().padStart(4)} ${s.races.toString().padStart(5)} ${s.bets.toString().padStart(5)} ${s.hits.toString().padStart(4)} ${s.miss.toString().padStart(4)} ${s.hitRatePct.padStart(8)} ${s.racesWithHit.toString().padStart(7)} ${("$" + s.cost.toFixed(0)).padStart(9)} ${("$" + s.returnAmt.toFixed(0)).padStart(9)} ${s.roiPct.padStart(8)}`
    );
    tBets += s.bets;
    tHits += s.hits;
    tCost += s.cost;
    tReturn += s.returnAmt;
    tRaceHit += s.racesWithHit;
  }

  console.log("─".repeat(width));
  const tRate = tBets > 0 ? ((tHits / tBets) * 100).toFixed(1) + "%" : "N/A";
  const tRoi = tCost > 0 ? (((tReturn - tCost) / tCost) * 100).toFixed(1) + "%" : "N/A";
  console.log(
    `${"ALL".padStart(4)} ${active.length.toString().padStart(5)} ${tBets.toString().padStart(5)} ${tHits.toString().padStart(4)} ${(tBets - tHits).toString().padStart(4)} ${tRate.padStart(8)} ${tRaceHit.toString().padStart(7)} ${("$" + tCost.toFixed(0)).padStart(9)} ${("$" + tReturn.toFixed(0)).padStart(9)} ${tRoi.padStart(8)}`
  );
  console.log(`  RaceHit = races with ≥1 place hit at that rank | skipped races excluded (${rows.length - active.length} skipped)`);
}

function printTopXTable(
  title: string,
  rows: McAccuracyRaceRow[],
  rankKey: RankKey,
  maxRank: number,
  stake: number
) {
  const width = 100;
  console.log("\n" + "═".repeat(width));
  console.log(title);
  console.log("═".repeat(width));
  console.log(
    `${"Top".padStart(4)} ${"Races".padStart(5)} ${"Bets".padStart(5)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"HitRate".padStart(8)} ${"RaceHit".padStart(7)} ${"Cost".padStart(9)} ${"Return".padStart(9)} ${"ROI".padStart(8)}`
  );
  console.log("─".repeat(width));

  for (let x = 1; x <= maxRank; x++) {
    const s = statsForTopX(rows, rankKey, x, stake);
    if (s.bets === 0) continue;
    console.log(
      `${("1-" + x).padStart(4)} ${s.races.toString().padStart(5)} ${s.bets.toString().padStart(5)} ${s.hits.toString().padStart(4)} ${s.miss.toString().padStart(4)} ${s.hitRatePct.padStart(8)} ${s.racesWithHit.toString().padStart(7)} ${("$" + s.cost.toFixed(0)).padStart(9)} ${("$" + s.returnAmt.toFixed(0)).padStart(9)} ${s.roiPct.padStart(8)}`
    );
  }
  console.log("─".repeat(width));
  console.log(`  Top 1-x = $${stake} place on every horse ranked 1..x (per-race legs may be < x if field smaller)`);
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

  console.log("MC / FORM RATING PLACE ACCURACY BACKTEST");
  console.log(
    `Skip rules: sparse>${sparseMax}, close<8>${closeMax}, avgDiff<${avgDiffMin}, 1st-2nd gap<${gapMin}, odds ${oddsLabel}, ${rtgChangeLabel}`
  );
  console.log(
    `Pool: months=${monthLabel} | venue=${venueLabel} | surface=${surfaceLabel} | form=${formLabel} | ignore-class=${ignoreClassLabel} | ignore-distance=${ignoreDistLabel} | ignore-after=${ignoreAfterLabel}`
  );
  console.log(`Stake: $${stake} per place leg | max-rank=${maxRank}\n`);

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

  printPlaceStatsTable(
    `PLACE HIT RATE BY FORM RATING RANK ($${stake} on that rank only)`,
    rows,
    "ratingRank",
    maxRank,
    stake
  );

  printTopXTable(
    `PORTFOLIO: TOP 1-x BY FORM RATING ($${stake} place each leg)`,
    rows,
    "ratingRank",
    maxRank,
    stake
  );

  printPlaceStatsTable(
    `PLACE HIT RATE BY MC WIN% RANK ($${stake} on that MC rank only)`,
    rows,
    "mcRank",
    maxRank,
    stake
  );

  printTopXTable(
    `PORTFOLIO: TOP 1-x BY MC WIN% RANK ($${stake} place each leg)`,
    rows,
    "mcRank",
    maxRank,
    stake
  );

  // MC top-1 vs form top-1 agreement
  let agree = 0;
  for (const row of active) {
    const form1 = row.picks.find((p) => p.ratingRank === 1);
    const mc1 = row.picks.find((p) => p.mcRank === 1);
    if (form1 && mc1 && form1.horseCode === mc1.horseCode) agree++;
  }
  const agreePct = active.length > 0 ? ((agree / active.length) * 100).toFixed(1) : "N/A";
  console.log("\n" + "═".repeat(70));
  console.log("MC vs FORM #1");
  console.log("═".repeat(70));
  console.log(`  Form #1 = MC #1: ${agree}/${active.length} races (${agreePct}%)`);
  const form1Hits = statsForSingleRank(rows, "ratingRank", 1, stake);
  const mc1Hits = statsForSingleRank(rows, "mcRank", 1, stake);
  console.log(
    `  Form #1 place hit: ${form1Hits.hits}/${form1Hits.bets} (${form1Hits.hitRatePct}) | MC #1 place hit: ${mc1Hits.hits}/${mc1Hits.bets} (${mc1Hits.hitRatePct})`
  );
  console.log("─".repeat(70));
}

main().catch(console.error);
