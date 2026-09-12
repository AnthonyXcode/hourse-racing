#!/usr/bin/env tsx
/**
 * Backtest: Avg Differentiation & Horses-with-diff-<8 vs Hit Rate
 *
 * Runs form analysis on all saved racecards, compares the
 * top-rated horse against actual results, and groups races by differentiation
 * metrics to find patterns.
 *
 * Form history scope (same idea as analyze-race --form-data / enrichRace formVenue):
 *   --form=all       use Sha Tin + Happy Valley past runs (default)
 *   --form=ST       only Sha Tin lines
 *   --form=HV       only Happy Valley lines
 *   (--form-data=… is accepted as an alias for --form)
 *
 * Leak-free pool: `--ignore-after=YYYY-MM-DD` drops saved races on or after that day
 * (same calendar as racecard filenames). batch-analyze passes the meeting date.
 *
 * The report is built in src/backtest/differentiationReport.ts (shared with the API);
 * this file parses flags and prints it.
 */
import {
  parseDifferentiationBacktestCliArgs,
  printBreakdownSummary,
  printClassDistanceVenueSummary,
  type DifferentiationBacktestOptions,
} from "../src/backtest/differentiationBacktest.js";
import { BET_UNIT, runDifferentiationReport } from "../src/backtest/differentiationReport.js";
import { printUpcomingPlaceSuggestions } from "../src/backtest/upcomingBetSuggestions.js";

/** value.toFixed(1), or `fallback` when there is no value (no bets) */
const fixed1 = (value: number | null, fallback: string): string => (value === null ? fallback : value.toFixed(1));

async function main() {
  const { sparseMax, closeMax, avgDiffMin, gapMin, oddsMax, ratingChangeMin, months, venue, surface, ignoreClasses, ignoreDistances, maxRating, maxAvgDiff, form, ignoreAfter } =
    parseDifferentiationBacktestCliArgs(process.argv.slice(2));
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
  const maxRatingLabel = maxRating && maxRating > 0 ? `>${maxRating}` : "off";
  const maxAvgDiffLabel = maxAvgDiff && maxAvgDiff > 0 ? `>${maxAvgDiff}` : "off";
  console.log(
    `Skip rules: sparse>${sparseMax}, close<8>${closeMax}, avgDiff<${avgDiffMin}, 1st-2nd gap<${gapMin}, odds ${oddsLabel}, ${rtgChangeLabel}, max-rating ${maxRatingLabel}, max-avgdiff ${maxAvgDiffLabel} | months=${monthLabel} | venue=${venueLabel} | surface=${surfaceLabel} | form=${formLabel} | ignore-class=${ignoreClassLabel} | ignore-distance=${ignoreDistLabel} | ignore-after=${ignoreAfterLabel}\n`
  );

  const opts: DifferentiationBacktestOptions = {
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
    maxRating: maxRating ?? 0,
    maxAvgDiff: maxAvgDiff ?? 0,
    form,
    ...(ignoreAfter ? { ignoreAfter } : {}),
  };
  const report = await runDifferentiationReport(opts);
  const { totals } = report;

  console.log(`Found ${totals.races} saved racecards with results (after venue/surface/month filters)\n`);
  console.log(`Analyzed ${totals.races} races — betting ${totals.betted}, skipping ${totals.skipped}\n`);

  // --- Race-by-race table with strategy ---
  const skipReasonWidth = 22;
  const tableWidth = 104 + skipReasonWidth + 1;
  console.log("═".repeat(tableWidth));
  const oddsRule = oddsMax > 0 ? ` OR odds>${oddsMax}` : "";
  console.log(
    `PLACE BET STRATEGY: Pick 1st in ranking, skip if sparse>${sparseMax} OR close<8>${closeMax} OR avgDiff<${avgDiffMin}${oddsRule}`
  );
  console.log("═".repeat(tableWidth));
  console.log(
    `${"Race".padEnd(18)} ${"Horse".padEnd(16)} ${"#".padStart(2)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"WinO".padStart(6)} ${"PlcO".padStart(6)} ${"AvgDiff".padStart(7)} ${"Close<8".padStart(7)} ${"Sparse".padStart(6)} ${"Rating".padStart(6)} ${"Pos".padStart(4)} ${"SkipReason".padEnd(skipReasonWidth)}`
  );
  console.log("─".repeat(tableWidth));
  for (const r of report.races) {
    const bet = r.skipped ? "SKIP" : "BET";
    const hit = r.skipped ? "➖" : r.topRatedPlaced ? "✅" : "❌";
    const winO = r.topRatedWinOdds > 0 ? r.topRatedWinOdds.toFixed(1) : "-";
    const plcO = r.topRatedPlaceOdds > 0 ? r.topRatedPlaceOdds.toFixed(1) : "-";
    const skipReason = r.skipped ? r.skipReason.substring(0, skipReasonWidth) : "-";
    const pos =
      r.topRatedFinishPosition > 0 ? r.topRatedFinishPosition.toString() : "-";
    console.log(
      `${r.raceId.padEnd(18)} ${r.topRatedHorseName.substring(0, 15).padEnd(16)} ${r.topRatedHorseNumber.toString().padStart(2)} ${bet.padStart(4)} ${hit.padStart(4)} ${winO.padStart(6)} ${plcO.padStart(6)} ${r.avgDiff.toString().padStart(7)} ${r.horsesWithDiffLt8.toString().padStart(7)} ${r.sparseFormCount.toString().padStart(6)} ${r.overallRating.toString().padStart(6)} ${pos.padStart(4)} ${skipReason.padEnd(skipReasonWidth)}`
    );
  }
  console.log("─".repeat(tableWidth));

  const bettedRate = totals.betted > 0 ? ((totals.bettedHits / totals.betted) * 100).toFixed(1) : "0.0";
  console.log(`\nBetted: ${totals.bettedHits}/${totals.betted} placed (${bettedRate}%)`);
  const skippedRate = totals.skipped > 0 ? ((totals.skippedHits / totals.skipped) * 100).toFixed(1) : "0.0";
  console.log(`Skipped: ${totals.skipped} races — pick would have placed ${totals.skippedHits}/${totals.skipped} (${skippedRate}%)`);
  console.log(
    `Without filter: ${totals.allPlaces}/${totals.races} placed (${((totals.allPlaces / totals.races) * 100).toFixed(1)}%)`
  );

  // --- Per racing day hit rate ---
  const dayTableWidth = 112;
  console.log("\n" + "═".repeat(dayTableWidth));
  console.log("HIT RATE PER RACING DAY  ($10 per bet on 1st-ranked horse)");
  console.log("═".repeat(dayTableWidth));
  console.log(
    `${"Date".padEnd(12)} ${"Venue".padEnd(4)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Won".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"ROI(Win)".padStart(10)} ${"ROI(Pla)".padStart(10)} ${"AllUpPla".padStart(12)}`
  );
  console.log("─".repeat(dayTableWidth));
  for (const d of report.byDay.days) {
    const formattedDate = `${d.date.slice(0, 4)}-${d.date.slice(4, 6)}-${d.date.slice(6, 8)}`;
    const allUpLabel = d.allUpPayout === null ? "-" : "$" + d.allUpPayout.toFixed(0);
    console.log(
      `${formattedDate.padEnd(12)} ${d.venue.padEnd(4)} ${d.total.toString().padStart(5)} ${d.bet.toString().padStart(4)} ${d.hits.toString().padStart(4)} ${d.wins.toString().padStart(4)} ${d.skip.toString().padStart(4)} ${(fixed1(d.hitRate, "N/A") + "%").padStart(8)} ${(fixed1(d.winRoi, "N/A") + "%").padStart(10)} ${(fixed1(d.placeRoi, "N/A") + "%").padStart(10)} ${allUpLabel.padStart(12)}`
    );
  }
  console.log("─".repeat(dayTableWidth));
  const dt = report.byDay.total;
  console.log(
    `${"TOTAL".padEnd(12)} ${"".padEnd(4)} ${dt.races.toString().padStart(5)} ${dt.bet.toString().padStart(4)} ${dt.hits.toString().padStart(4)} ${dt.wins.toString().padStart(4)} ${dt.skip.toString().padStart(4)} ${(fixed1(dt.hitRate, "0.0") + "%").padStart(8)} ${(fixed1(dt.winRoi, "0.0") + "%").padStart(10)} ${(fixed1(dt.placeRoi, "0.0") + "%").padStart(10)} ${(fixed1(dt.allUpRoi, "0.0") + "%").padStart(12)}`
  );
  console.log(`  All-Up Place: ${dt.allUpDays} days × $${BET_UNIT} = $${dt.allUpCost} cost, $${dt.allUpReturn.toFixed(0)} return`);

  // --- ROI by month ---
  const monthTableWidth = 108;
  console.log("\n" + "═".repeat(monthTableWidth));
  console.log("ROI BY MONTH  ($10 per bet on 1st-ranked horse | All-Up = $10/day, compound all legs)");
  console.log("═".repeat(monthTableWidth));
  console.log(
    `${"Month".padEnd(10)} ${"Days".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Won".padStart(4)} ${"HitRate".padStart(8)} ${"WinRate".padStart(8)} ${"Cost".padStart(7)} ${"WinRet".padStart(7)} ${"PlaRet".padStart(7)} ${"ROI(Win)".padStart(10)} ${"ROI(Pla)".padStart(10)} ${"ROI(AllUpPla)".padStart(14)}`
  );
  console.log("─".repeat(monthTableWidth));
  for (const m of report.byMonth.months) {
    console.log(
      `${m.month.padEnd(10)} ${m.days.toString().padStart(5)} ${m.bet.toString().padStart(4)} ${m.hits.toString().padStart(4)} ${m.wins.toString().padStart(4)} ${(fixed1(m.hitRate, "N/A") + "%").padStart(8)} ${(fixed1(m.winRate, "N/A") + "%").padStart(8)} ${("$" + m.cost).padStart(7)} ${("$" + m.winReturn.toFixed(0)).padStart(7)} ${("$" + m.placeReturn.toFixed(0)).padStart(7)} ${(fixed1(m.winRoi, "N/A") + "%").padStart(10)} ${(fixed1(m.placeRoi, "N/A") + "%").padStart(10)} ${(fixed1(m.allUpRoi, "N/A") + "%").padStart(14)}`
    );
  }
  console.log("─".repeat(monthTableWidth));
  const mt = report.byMonth.total;
  console.log(
    `${"TOTAL".padEnd(10)} ${mt.days.toString().padStart(5)} ${mt.bet.toString().padStart(4)} ${mt.hits.toString().padStart(4)} ${mt.wins.toString().padStart(4)} ${(fixed1(mt.hitRate, "0.0") + "%").padStart(8)} ${(fixed1(mt.winRate, "0.0") + "%").padStart(8)} ${("$" + mt.cost).padStart(7)} ${("$" + mt.winReturn.toFixed(0)).padStart(7)} ${("$" + mt.placeReturn.toFixed(0)).padStart(7)} ${(fixed1(mt.winRoi, "0.0") + "%").padStart(10)} ${(fixed1(mt.placeRoi, "0.0") + "%").padStart(10)} ${(fixed1(mt.allUpRoi, "0.0") + "%").padStart(14)}`
  );

  // --- Breakdowns ---
  const b = report.breakdowns;
  if (b.venue) printBreakdownSummary("VENUE", b.venue);
  if (b.surface) printBreakdownSummary("SURFACE", b.surface);
  printBreakdownSummary("GOING", b.going);
  printClassDistanceVenueSummary(report.classDistanceVenue);
  printBreakdownSummary("NUMBER OF RUNNERS", b.runners);
  printBreakdownSummary("MC PLACE% SLOT (5%)", b.mcPlacePct);
  printBreakdownSummary("WIN ODDS (top-rated)", b.winOdds);
  printBreakdownSummary("EXPECTED POSITION (top-rated)", b.expectedPosition);
  printBreakdownSummary("RATING (top-rated)", b.rating);
  printBreakdownSummary("AVG DIFF (field spread)", b.avgDiff);
  printBreakdownSummary("TOP-TWO GAP (#1 vs #2 rating)", b.topGap);
  printBreakdownSummary("CLOSE<8 COUNT (field cluster)", b.close8);
  printBreakdownSummary("RATING CHANGE (top-rated Rtg.+/-)", b.ratingChange);

  // --- Skip logic summary ---
  console.log("\n" + "═".repeat(70));
  console.log("SKIP LOGIC SUMMARY");
  console.log("═".repeat(70));
  console.log("Bet = pick top overall-rated runner. Skip if ANY rule fails (first match wins):");
  console.log(`  1. Sparse form: count of runners with <3 past performances > ${sparseMax} → skip`);
  console.log(`  2. Top-two gap: |rating #1 − rating #2| < ${gapMin} → skip`);
  console.log(`  3. Clustered field: horses within <8 pts of top-rated count > ${closeMax} → skip`);
  console.log(`  4. Low differentiation: mean |topRating − each rating| < ${avgDiffMin} (--avgdiff) → skip`);
  console.log(`  5. High odds: top-rated horse win odds > ${oddsMax > 0 ? oddsMax : "disabled"} (--odds) → skip`);
  console.log(
    `  6. Rating change: top-rated Rtg+/- <= ${ratingChangeMin !== null && ratingChangeMin !== undefined ? ratingChangeMin : "disabled"} (--ratingchange, bet when > threshold) → skip`
  );
  console.log("\nSkipped races this run (by reason):");
  if (report.skipReasons.length === 0) {
    console.log("  (none)");
  } else {
    for (const { reason, count } of report.skipReasons) {
      console.log(`  ${count.toString().padStart(3)}  ${reason}`);
    }
  }
  console.log("─".repeat(70));

  printUpcomingPlaceSuggestions(new Map(report.upcoming.map((m) => [m.meeting, m.races])));
}

main().catch(console.error);
