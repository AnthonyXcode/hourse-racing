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
  runDifferentiationBacktest,
  type DifferentiationBacktestRow,
  type FormSource,
} from "../src/backtest/differentiationBacktest.js";

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

  return { sparseMax, closeMax, avgDiffMin, gapMin, months, venue, surface, ignoreClasses, ignoreDistances, form, ignoreAfter };
}

async function main() {
  const { sparseMax, closeMax, avgDiffMin, gapMin, months, venue, surface, ignoreClasses, ignoreDistances, form, ignoreAfter } =
    parseArgs();
  const monthLabel = months.length === 0 ? "all" : months.join(",");
  const venueLabel = venue ?? "all";
  const surfaceLabel = surface ?? "all";
  const formLabel = form === "all" ? "all (ST+HV)" : form === "ST" ? "ST only" : "HV only";
  const ignoreClassLabel = ignoreClasses.length === 0 ? "none" : ignoreClasses.join(",");
  const ignoreDistLabel = ignoreDistances.length === 0 ? "none" : ignoreDistances.map((d) => `${d}m`).join(",");
  const ignoreAfterLabel = ignoreAfter ?? "none";
  console.log(
    `Skip rules: sparse>${sparseMax}, close<8>${closeMax}, avgDiff<${avgDiffMin}, 1st-2nd gap<${gapMin} | months=${monthLabel} | venue=${venueLabel} | surface=${surfaceLabel} | form=${formLabel} | ignore-class=${ignoreClassLabel} | ignore-distance=${ignoreDistLabel} | ignore-after=${ignoreAfterLabel}\n`
  );

  const allResults = await runDifferentiationBacktest({
    sparseMax,
    closeMax,
    avgDiffMin,
    gapMin,
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
  console.log("═".repeat(100));
  console.log(
    `PLACE BET STRATEGY: Pick 1st in ranking, skip if sparse>${sparseMax} OR close<8>${closeMax} OR avgDiff<${avgDiffMin}`
  );
  console.log("═".repeat(100));
  console.log(
    `${"Race".padEnd(18)} ${"Horse".padEnd(16)} ${"#".padStart(2)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"AvgDiff".padStart(7)} ${"Close<8".padStart(7)} ${"Sparse".padStart(6)} ${"Rating".padStart(6)} ${"Winner".padEnd(16)}`
  );
  console.log("─".repeat(100));
  for (const r of allResults) {
    const bet = r.skipped ? "SKIP" : "BET";
    const hit = r.skipped ? "-" : r.topRatedPlaced ? "Y" : "N";
    console.log(
      `${r.raceId.padEnd(18)} ${r.topRatedHorseName.substring(0, 15).padEnd(16)} ${r.topRatedHorseNumber.toString().padStart(2)} ${bet.padStart(4)} ${hit.padStart(4)} ${r.avgDiff.toString().padStart(7)} ${r.horsesWithDiffLt8.toString().padStart(7)} ${r.sparseFormCount.toString().padStart(6)} ${r.overallRating.toString().padStart(6)} ${r.actualWinnerName.substring(0, 15).padEnd(16)}`
    );
  }
  console.log("─".repeat(100));

  const bettedHits = betted.filter((r) => r.topRatedPlaced).length;
  const bettedRate = betted.length > 0 ? ((bettedHits / betted.length) * 100).toFixed(1) : "0.0";
  console.log(`\nBetted: ${bettedHits}/${betted.length} placed (${bettedRate}%)`);
  console.log(`Skipped: ${skippedRaces.length} races`);
  const allPlaces = allResults.filter((r) => r.topRatedPlaced).length;
  console.log(
    `Without filter: ${allPlaces}/${allResults.length} placed (${((allPlaces / allResults.length) * 100).toFixed(1)}%)`
  );

  // --- Per racing day hit rate ---
  console.log("\n" + "═".repeat(70));
  console.log("HIT RATE PER RACING DAY");
  console.log("═".repeat(70));
  const dayMap = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of allResults) {
    const key = `${r.date}_${r.venue}`;
    if (!dayMap.has(key)) dayMap.set(key, []);
    dayMap.get(key)!.push(r);
  }

  console.log(
    `${"Date".padEnd(12)} ${"Venue".padEnd(4)} ${"Total".padStart(5)} ${"Bet".padStart(4)} ${"Hit".padStart(4)} ${"Miss".padStart(4)} ${"Skip".padStart(4)} ${"HitRate".padStart(8)}`
  );
  console.log("─".repeat(70));

  const sortedDays = [...dayMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  let totalBet = 0;
  let totalHit = 0;
  for (const [, races] of sortedDays) {
    const [dateStr, v] = [races[0].date, races[0].venue];
    const dayBetted = races.filter((r) => !r.skipped);
    const dayHits = dayBetted.filter((r) => r.topRatedPlaced).length;
    const dayMiss = dayBetted.length - dayHits;
    const daySkip = races.length - dayBetted.length;
    const dayRate = dayBetted.length > 0 ? ((dayHits / dayBetted.length) * 100).toFixed(1) : "N/A";
    const formattedDate = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
    console.log(
      `${formattedDate.padEnd(12)} ${v.padEnd(4)} ${races.length.toString().padStart(5)} ${dayBetted.length.toString().padStart(4)} ${dayHits.toString().padStart(4)} ${dayMiss.toString().padStart(4)} ${daySkip.toString().padStart(4)} ${(dayRate + "%").padStart(8)}`
    );
    totalBet += dayBetted.length;
    totalHit += dayHits;
  }
  console.log("─".repeat(70));
  const overallRate = totalBet > 0 ? ((totalHit / totalBet) * 100).toFixed(1) : "0.0";
  console.log(
    `${"TOTAL".padEnd(12)} ${"".padEnd(4)} ${allResults.length.toString().padStart(5)} ${totalBet.toString().padStart(4)} ${totalHit.toString().padStart(4)} ${(totalBet - totalHit).toString().padStart(4)} ${(allResults.length - totalBet).toString().padStart(4)} ${(overallRate + "%").padStart(8)}`
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

  // --- By class ---
  const byClass = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of allResults) {
    if (!byClass.has(r.raceClass)) byClass.set(r.raceClass, []);
    byClass.get(r.raceClass)!.push(r);
  }
  printBreakdown("CLASS", byClass);

  // --- By distance ---
  const byDistance = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of allResults) {
    const bucket = `${r.distance}m`;
    if (!byDistance.has(bucket)) byDistance.set(bucket, []);
    byDistance.get(bucket)!.push(r);
  }
  const byDistanceSorted = new Map([...byDistance.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
  printBreakdown("DISTANCE", byDistanceSorted);

  // --- By class × venue ---
  const byClassVenue = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of allResults) {
    const key = `${r.raceClass} ${r.venue}`;
    if (!byClassVenue.has(key)) byClassVenue.set(key, []);
    byClassVenue.get(key)!.push(r);
  }
  printBreakdown("CLASS × VENUE", byClassVenue);

  // --- By number of runners ---
  const byRunners = new Map<string, DifferentiationBacktestRow[]>();
  for (const r of allResults) {
    const key = `${r.numRunners}`;
    if (!byRunners.has(key)) byRunners.set(key, []);
    byRunners.get(key)!.push(r);
  }
  const byRunnersSorted = new Map([...byRunners.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
  printBreakdown("NUMBER OF RUNNERS", byRunnersSorted);

  // --- Skip logic summary ---
  console.log("\n" + "═".repeat(70));
  console.log("SKIP LOGIC SUMMARY");
  console.log("═".repeat(70));
  console.log("Bet = pick top overall-rated runner. Skip if ANY rule fails (first match wins):");
  console.log(`  1. Sparse form: count of runners with ≤1 past performance > ${sparseMax} → skip`);
  console.log(`  2. Top-two gap: |rating #1 − rating #2| < ${gapMin} → skip`);
  console.log(`  3. Clustered field: horses within <8 pts of top-rated count > ${closeMax} → skip`);
  console.log(`  4. Low differentiation: mean |topRating − each rating| < ${avgDiffMin} (--avgdiff) → skip`);
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
