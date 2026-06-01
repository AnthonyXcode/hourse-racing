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
 */
import {
  printBreakdown,
  printClassDistanceVenueBreakdown,
  runDifferentiationBacktest,
  type DifferentiationBacktestRow,
  type FormSource,
} from "../src/backtest/differentiationBacktest.js";
import {
  printUpcomingPlaceSuggestions,
  runUpcomingPlaceSuggestions,
} from "../src/backtest/upcomingBetSuggestions.js";

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
    const key = m[1];
    const val = m[2];
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

  return { sparseMax, closeMax, avgDiffMin, gapMin, oddsMax, months, venue, surface, ignoreClasses, ignoreDistances, form, ignoreAfter };
}

async function main() {
  const { sparseMax, closeMax, avgDiffMin, gapMin, oddsMax, months, venue, surface, ignoreClasses, ignoreDistances, form, ignoreAfter } =
    parseArgs();
  const monthLabel = months.length === 0 ? "all" : months.join(",");
  const venueLabel = venue ?? "all";
  const surfaceLabel = surface ?? "all";
  const formLabel = form === "all" ? "all (ST+HV)" : form === "ST" ? "ST only" : "HV only";
  const ignoreClassLabel = ignoreClasses.length === 0 ? "none" : ignoreClasses.join(",");
  const ignoreDistLabel = ignoreDistances.length === 0 ? "none" : ignoreDistances.map((d) => `${d}m`).join(",");
  const ignoreAfterLabel = ignoreAfter ?? "none";
  const oddsLabel = oddsMax > 0 ? `>${oddsMax}` : "off";
  console.log(
    `Skip rules: sparse>${sparseMax}, close<8>${closeMax}, avgDiff<${avgDiffMin}, 1st-2nd gap<${gapMin}, odds ${oddsLabel} | months=${monthLabel} | venue=${venueLabel} | surface=${surfaceLabel} | form=${formLabel} | ignore-class=${ignoreClassLabel} | ignore-distance=${ignoreDistLabel} | ignore-after=${ignoreAfterLabel}\n`
  );

  const allResults = await runDifferentiationBacktest({
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
  });

  console.log(`Found ${allResults.length} saved racecards with results (after venue/surface/month filters)\n`);

  const betted = allResults.filter((r) => !r.skipped);
  const skippedRaces = allResults.filter((r) => r.skipped);
  console.log(`Analyzed ${allResults.length} races — betting ${betted.length}, skipping ${skippedRaces.length}\n`);

  // --- Race-by-race table with strategy ---
  const tableWidth = 116;
  console.log("═".repeat(tableWidth));
  const oddsRule = oddsMax > 0 ? ` OR odds>${oddsMax}` : "";
  console.log(
    `PLACE BET STRATEGY: Pick 1st in ranking, skip if sparse>${sparseMax} OR close<8>${closeMax} OR avgDiff<${avgDiffMin}${oddsRule}`
  );
  console.log("═".repeat(tableWidth));
  console.log(
    `${"Race".padEnd(18)} ${"Horse".padEnd(16)} ${"#".padStart(2)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"WinO".padStart(6)} ${"PlcO".padStart(6)} ${"AvgDiff".padStart(7)} ${"Close<8".padStart(7)} ${"Sparse".padStart(6)} ${"Rating".padStart(6)} ${"Winner".padEnd(16)}`
  );
  console.log("─".repeat(tableWidth));
  for (const r of allResults) {
    const bet = r.skipped ? "SKIP" : "BET";
    const hit = r.skipped ? "-" : r.topRatedPlaced ? "Y" : "N";
    const winO = r.topRatedWinOdds > 0 ? r.topRatedWinOdds.toFixed(1) : "-";
    const plcO = r.topRatedPlaceOdds > 0 ? r.topRatedPlaceOdds.toFixed(1) : "-";
    console.log(
      `${r.raceId.padEnd(18)} ${r.topRatedHorseName.substring(0, 15).padEnd(16)} ${r.topRatedHorseNumber.toString().padStart(2)} ${bet.padStart(4)} ${hit.padStart(4)} ${winO.padStart(6)} ${plcO.padStart(6)} ${r.avgDiff.toString().padStart(7)} ${r.horsesWithDiffLt8.toString().padStart(7)} ${r.sparseFormCount.toString().padStart(6)} ${r.overallRating.toString().padStart(6)} ${r.actualWinnerName.substring(0, 15).padEnd(16)}`
    );
  }
  console.log("─".repeat(tableWidth));

  const bettedHits = betted.filter((r) => r.topRatedPlaced).length;
  const bettedRate = betted.length > 0 ? ((bettedHits / betted.length) * 100).toFixed(1) : "0.0";
  console.log(`\nBetted: ${bettedHits}/${betted.length} placed (${bettedRate}%)`);
  console.log(`Skipped: ${skippedRaces.length} races`);
  const allPlaces = allResults.filter((r) => r.topRatedPlaced).length;
  console.log(
    `Without filter: ${allPlaces}/${allResults.length} placed (${((allPlaces / allResults.length) * 100).toFixed(1)}%)`
  );

  // --- Per racing day hit rate ---
  const dayTableWidth = 112;
  console.log("\n" + "═".repeat(dayTableWidth));
  console.log("HIT RATE PER RACING DAY  ($10 per bet on 1st-ranked horse)");
  console.log("═".repeat(dayTableWidth));
  const dayMap = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of allResults) {
    const key = `${r.date}_${r.venue}`;
    if (!dayMap.has(key)) dayMap.set(key, []);
    dayMap.get(key)!.push(r);
  }

  console.log(
    `${"Date".padEnd(12)} ${"Venue".padEnd(4)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Won".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)} ${"ROI(Win)".padStart(10)} ${"ROI(Pla)".padStart(10)} ${"AllUpPla".padStart(12)}`
  );
  console.log("─".repeat(dayTableWidth));

  const BET_UNIT = 10;
  const sortedDays = [...dayMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  let totalBet = 0;
  let totalHit = 0;
  let totalWon = 0;
  let totalWinCost = 0;
  let totalWinReturn = 0;
  let totalPlaCost = 0;
  let totalPlaReturn = 0;
  let totalAllUpDays = 0;
  let totalAllUpRet = 0;
  for (const [, races] of sortedDays) {
    const [dateStr, v] = [races[0].date, races[0].venue];
    const dayBetted = races.filter((r) => !r.skipped);
    const dayHits = dayBetted.filter((r) => r.topRatedPlaced).length;
    const dayWins = dayBetted.filter((r) => r.topRatedWon).length;
    const daySkip = races.length - dayBetted.length;
    const dayRate = dayBetted.length > 0 ? ((dayHits / dayBetted.length) * 100).toFixed(1) : "N/A";
    const dayCost = dayBetted.length * BET_UNIT;
    const dayWinReturn = dayBetted
      .filter((r) => r.topRatedWon)
      .reduce((sum, r) => sum + (r.topRatedWinOdds > 0 ? r.topRatedWinOdds * BET_UNIT : BET_UNIT), 0);
    const dayPlaReturn = dayBetted
      .filter((r) => r.topRatedPlaced)
      .reduce((sum, r) => sum + (r.topRatedPlaceOdds > 0 ? r.topRatedPlaceOdds * BET_UNIT : BET_UNIT), 0);
    const dayWinRoi = dayCost > 0 ? (((dayWinReturn - dayCost) / dayCost) * 100).toFixed(1) : "N/A";
    const dayPlaRoi = dayCost > 0 ? (((dayPlaReturn - dayCost) / dayCost) * 100).toFixed(1) : "N/A";

    // All-up place: $10 compounds through all legs; $0 if any leg misses
    let allUpLabel = "-";
    if (dayBetted.length > 0) {
      totalAllUpDays++;
      const allPlaced = dayBetted.every((r) => r.topRatedPlaced);
      if (allPlaced) {
        let payout = BET_UNIT;
        for (const r of dayBetted) {
          payout *= r.topRatedPlaceOdds > 0 ? r.topRatedPlaceOdds : 1;
        }
        totalAllUpRet += payout;
        allUpLabel = "$" + payout.toFixed(0);
      } else {
        allUpLabel = "$0";
      }
    }

    const formattedDate = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
    console.log(
      `${formattedDate.padEnd(12)} ${v.padEnd(4)} ${races.length.toString().padStart(5)} ${dayBetted.length.toString().padStart(4)} ${dayHits.toString().padStart(4)} ${dayWins.toString().padStart(4)} ${daySkip.toString().padStart(4)} ${(dayRate + "%").padStart(8)} ${(dayWinRoi + "%").padStart(10)} ${(dayPlaRoi + "%").padStart(10)} ${allUpLabel.padStart(12)}`
    );
    totalBet += dayBetted.length;
    totalHit += dayHits;
    totalWon += dayWins;
    totalWinCost += dayCost;
    totalWinReturn += dayWinReturn;
    totalPlaCost += dayCost;
    totalPlaReturn += dayPlaReturn;
  }
  console.log("─".repeat(dayTableWidth));
  const overallRate = totalBet > 0 ? ((totalHit / totalBet) * 100).toFixed(1) : "0.0";
  const overallWinRoi = totalWinCost > 0 ? (((totalWinReturn - totalWinCost) / totalWinCost) * 100).toFixed(1) : "0.0";
  const overallPlaRoi = totalPlaCost > 0 ? (((totalPlaReturn - totalPlaCost) / totalPlaCost) * 100).toFixed(1) : "0.0";
  const totalAllUpCost = totalAllUpDays * BET_UNIT;
  const overallAllUpDayRoi = totalAllUpCost > 0 ? (((totalAllUpRet - totalAllUpCost) / totalAllUpCost) * 100).toFixed(1) : "0.0";
  console.log(
    `${"TOTAL".padEnd(12)} ${"".padEnd(4)} ${allResults.length.toString().padStart(5)} ${totalBet.toString().padStart(4)} ${totalHit.toString().padStart(4)} ${totalWon.toString().padStart(4)} ${(allResults.length - totalBet).toString().padStart(4)} ${(overallRate + "%").padStart(8)} ${(overallWinRoi + "%").padStart(10)} ${(overallPlaRoi + "%").padStart(10)} ${(overallAllUpDayRoi + "%").padStart(12)}`
  );
  console.log(`  All-Up Place: ${totalAllUpDays} days × $${BET_UNIT} = $${totalAllUpCost} cost, $${totalAllUpRet.toFixed(0)} return`);

  // --- ROI by month ---
  const monthTableWidth = 108;
  console.log("\n" + "═".repeat(monthTableWidth));
  console.log("ROI BY MONTH  ($10 per bet on 1st-ranked horse | All-Up = $10/day, compound all legs)");
  console.log("═".repeat(monthTableWidth));
  console.log(
    `${"Month".padEnd(10)} ${"Days".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Won".padStart(4)} ${"HitRate".padStart(8)} ${"WinRate".padStart(8)} ${"Cost".padStart(7)} ${"WinRet".padStart(7)} ${"PlaRet".padStart(7)} ${"ROI(Win)".padStart(10)} ${"ROI(Pla)".padStart(10)} ${"ROI(AllUpPla)".padStart(14)}`
  );
  console.log("─".repeat(monthTableWidth));
  const monthMap = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of allResults) {
    const key = `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}`;
    if (!monthMap.has(key)) monthMap.set(key, []);
    monthMap.get(key)!.push(r);
  }

  // Build month -> day -> races for all-up place calculation
  const monthDayMap = new Map<string, Map<string, DifferentiationBacktestRow[]>>();
  for (const r of allResults) {
    const mKey = `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}`;
    const dKey = `${r.date}_${r.venue}`;
    if (!monthDayMap.has(mKey)) monthDayMap.set(mKey, new Map());
    const days = monthDayMap.get(mKey)!;
    if (!days.has(dKey)) days.set(dKey, []);
    days.get(dKey)!.push(r);
  }

  const sortedMonths = [...monthMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  let mTotalBet = 0, mTotalHit = 0, mTotalWon = 0, mTotalCost = 0, mTotalWinRet = 0, mTotalPlaRet = 0;
  let mTotalAllUpDays = 0, mTotalAllUpRet = 0;
  for (const [month, races] of sortedMonths) {
    const mBetted = races.filter((r) => !r.skipped);
    const mHits = mBetted.filter((r) => r.topRatedPlaced).length;
    const mWins = mBetted.filter((r) => r.topRatedWon).length;
    const mCost = mBetted.length * BET_UNIT;
    const mWinRet = mBetted
      .filter((r) => r.topRatedWon)
      .reduce((sum, r) => sum + (r.topRatedWinOdds > 0 ? r.topRatedWinOdds * BET_UNIT : BET_UNIT), 0);
    const mPlaRet = mBetted
      .filter((r) => r.topRatedPlaced)
      .reduce((sum, r) => sum + (r.topRatedPlaceOdds > 0 ? r.topRatedPlaceOdds * BET_UNIT : BET_UNIT), 0);
    const mHitRate = mBetted.length > 0 ? ((mHits / mBetted.length) * 100).toFixed(1) : "N/A";
    const mWinRate = mBetted.length > 0 ? ((mWins / mBetted.length) * 100).toFixed(1) : "N/A";
    const mWinRoi = mCost > 0 ? (((mWinRet - mCost) / mCost) * 100).toFixed(1) : "N/A";
    const mPlaRoi = mCost > 0 ? (((mPlaRet - mCost) / mCost) * 100).toFixed(1) : "N/A";

    // All-up place: $10 per racing day, compound across all betted legs
    let allUpDays = 0, allUpRet = 0;
    const days = monthDayMap.get(month)!;
    for (const [, dayRaces] of days) {
      const dayBetted = dayRaces.filter((r) => !r.skipped);
      if (dayBetted.length === 0) continue;
      allUpDays++;
      const allPlaced = dayBetted.every((r) => r.topRatedPlaced);
      if (allPlaced) {
        let payout = BET_UNIT;
        for (const r of dayBetted) {
          payout *= r.topRatedPlaceOdds > 0 ? r.topRatedPlaceOdds : 1;
        }
        allUpRet += payout;
      }
    }
    const allUpCost = allUpDays * BET_UNIT;
    const allUpRoi = allUpCost > 0 ? (((allUpRet - allUpCost) / allUpCost) * 100).toFixed(1) : "N/A";

    console.log(
      `${month.padEnd(10)} ${allUpDays.toString().padStart(5)} ${mBetted.length.toString().padStart(4)} ${mHits.toString().padStart(4)} ${mWins.toString().padStart(4)} ${(mHitRate + "%").padStart(8)} ${(mWinRate + "%").padStart(8)} ${("$" + mCost).padStart(7)} ${("$" + mWinRet.toFixed(0)).padStart(7)} ${("$" + mPlaRet.toFixed(0)).padStart(7)} ${(mWinRoi + "%").padStart(10)} ${(mPlaRoi + "%").padStart(10)} ${(allUpRoi + "%").padStart(14)}`
    );
    mTotalBet += mBetted.length;
    mTotalHit += mHits;
    mTotalWon += mWins;
    mTotalCost += mCost;
    mTotalWinRet += mWinRet;
    mTotalPlaRet += mPlaRet;
    mTotalAllUpDays += allUpDays;
    mTotalAllUpRet += allUpRet;
  }
  console.log("─".repeat(monthTableWidth));
  const mOverallHitRate = mTotalBet > 0 ? ((mTotalHit / mTotalBet) * 100).toFixed(1) : "0.0";
  const mOverallWinRate = mTotalBet > 0 ? ((mTotalWon / mTotalBet) * 100).toFixed(1) : "0.0";
  const mOverallWinRoi = mTotalCost > 0 ? (((mTotalWinRet - mTotalCost) / mTotalCost) * 100).toFixed(1) : "0.0";
  const mOverallPlaRoi = mTotalCost > 0 ? (((mTotalPlaRet - mTotalCost) / mTotalCost) * 100).toFixed(1) : "0.0";
  const mTotalAllUpCost = mTotalAllUpDays * BET_UNIT;
  const mOverallAllUpRoi = mTotalAllUpCost > 0 ? (((mTotalAllUpRet - mTotalAllUpCost) / mTotalAllUpCost) * 100).toFixed(1) : "0.0";
  console.log(
    `${"TOTAL".padEnd(10)} ${mTotalAllUpDays.toString().padStart(5)} ${mTotalBet.toString().padStart(4)} ${mTotalHit.toString().padStart(4)} ${mTotalWon.toString().padStart(4)} ${(mOverallHitRate + "%").padStart(8)} ${(mOverallWinRate + "%").padStart(8)} ${("$" + mTotalCost).padStart(7)} ${("$" + mTotalWinRet.toFixed(0)).padStart(7)} ${("$" + mTotalPlaRet.toFixed(0)).padStart(7)} ${(mOverallWinRoi + "%").padStart(10)} ${(mOverallPlaRoi + "%").padStart(10)} ${(mOverallAllUpRoi + "%").padStart(14)}`
  );

  // --- By venue / surface (redundant when CLI already filters by both) ---
  if (!(venue && surface)) {
    const byVenue = new Map<string, DifferentiationBacktestRow[]>();
    for (const r of allResults) {
      if (!byVenue.has(r.venue)) byVenue.set(r.venue, []);
      byVenue.get(r.venue)!.push(r);
    }
    printBreakdown("VENUE", byVenue);

    const bySurface = new Map<string, DifferentiationBacktestRow[]>();
    for (const r of allResults) {
      if (!bySurface.has(r.surface)) bySurface.set(r.surface, []);
      bySurface.get(r.surface)!.push(r);
    }
    printBreakdown("SURFACE", bySurface);
  }

  printClassDistanceVenueBreakdown(allResults);

  // --- By number of runners ---
  const byRunners = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of allResults) {
    const key = `${r.numRunners}`;
    if (!byRunners.has(key)) byRunners.set(key, []);
    byRunners.get(key)!.push(r);
  }
  const byRunnersSorted = new Map([...byRunners.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
  printBreakdown("NUMBER OF RUNNERS", byRunnersSorted);

  // --- By MC Place% slot (5% buckets) ---
  const byMcPlace = new Map<string, DifferentiationBacktestRow[]>();
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
  printBreakdown("MC PLACE% SLOT (5%)", byMcPlaceSorted);

  // --- By win odds bucket ---
  const byOdds = new Map<string, DifferentiationBacktestRow[]>();
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
  const byOddsSorted = new Map<string, DifferentiationBacktestRow[]>();
  for (const key of oddsOrder) {
    if (byOdds.has(key)) byOddsSorted.set(key, byOdds.get(key)!);
  }
  printBreakdown("WIN ODDS (top-rated)", byOddsSorted);

  // --- By expected position bucket ---
  const byEPos = new Map<string, DifferentiationBacktestRow[]>();
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
  const byEPosSorted = new Map<string, DifferentiationBacktestRow[]>();
  for (const key of ePosOrder) {
    if (byEPos.has(key)) byEPosSorted.set(key, byEPos.get(key)!);
  }
  printBreakdown("EXPECTED POSITION (top-rated)", byEPosSorted);

  // --- By avgDiff bucket ---
  const byAvgDiff = new Map<string, DifferentiationBacktestRow[]>();
  const avgDiffBuckets = [
    { label: "11-13", min: 11, max: 13 },
    { label: "13-15", min: 13, max: 15 },
    { label: "15-18", min: 15, max: 18 },
    { label: "18-22", min: 18, max: 22 },
    { label: "22-27", min: 22, max: 27 },
    { label: "27+",   min: 27, max: Infinity },
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
  const avgDiffOrder = avgDiffBuckets.map((b) => b.label);
  const byAvgDiffSorted = new Map<string, DifferentiationBacktestRow[]>();
  for (const key of avgDiffOrder) {
    if (byAvgDiff.has(key)) byAvgDiffSorted.set(key, byAvgDiff.get(key)!);
  }
  printBreakdown("AVG DIFF (field spread)", byAvgDiffSorted);

  // --- By top-two gap bucket ---
  const byTopGap = new Map<string, DifferentiationBacktestRow[]>();
  const topGapBuckets = [
    { label: "1",   min: 1, max: 2 },
    { label: "2-3", min: 2, max: 4 },
    { label: "4-6", min: 4, max: 7 },
    { label: "7-10",min: 7, max: 11 },
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
  const topGapOrder = topGapBuckets.map((b) => b.label);
  const byTopGapSorted = new Map<string, DifferentiationBacktestRow[]>();
  for (const key of topGapOrder) {
    if (byTopGap.has(key)) byTopGapSorted.set(key, byTopGap.get(key)!);
  }
  printBreakdown("TOP-TWO GAP (#1 vs #2 rating)", byTopGapSorted);

  // --- By close<8 count bucket ---
  const byClose8 = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of allResults) {
    const key = `${r.horsesWithDiffLt8}`;
    if (!byClose8.has(key)) byClose8.set(key, []);
    byClose8.get(key)!.push(r);
  }
  const byClose8Sorted = new Map(
    [...byClose8.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  );
  printBreakdown("CLOSE<8 COUNT (field cluster)", byClose8Sorted);

  // --- By rating change (top-rated horse Rtg.+/-), one bucket per integer ---
  const byRatingChange = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of allResults) {
    const change = r.topRatedRatingChange;
    if (change === undefined) {
      const key = "N/A";
      if (!byRatingChange.has(key)) byRatingChange.set(key, []);
      byRatingChange.get(key)!.push(r);
      continue;
    }
    const key = change > 0 ? `+${change}` : String(change);
    if (!byRatingChange.has(key)) byRatingChange.set(key, []);
    byRatingChange.get(key)!.push(r);
  }
  const parseRatingChangeKey = (key: string): number => {
    if (key === "N/A") return Infinity;
    if (key.startsWith("+")) return parseInt(key.slice(1), 10);
    return parseInt(key, 10);
  };
  const byRatingChangeSorted = new Map(
    [...byRatingChange.entries()].sort(
      (a, b) => parseRatingChangeKey(a[0]) - parseRatingChangeKey(b[0])
    )
  );
  printBreakdown("RATING CHANGE (top-rated Rtg.+/-)", byRatingChangeSorted, {
    preserveOrder: true,
  });

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

  const upcoming = await runUpcomingPlaceSuggestions({
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
  });
  printUpcomingPlaceSuggestions(upcoming);
}

main().catch(console.error);
