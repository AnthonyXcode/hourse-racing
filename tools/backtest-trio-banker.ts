#!/usr/bin/env tsx
/**
 * Backtest: Trio banker — bank the form #1 when MC says it places, add N legs.
 *
 * Banker = form #1 (top overall rating; the `diff: 0` row in analyze-race). Bet the race only
 * when the banker's MC Place% >= --banker-mc (default 75); otherwise skip. Legs = the next
 * --legs runners (default 6) ranked by --leg-rank=form (overall rating, default) or mc (MC
 * win%). Banker + N legs = C(N,2) Trio combos at $10, settled on the results-file Trio
 * dividend (a dead-heat for 3rd pays on either winning combo). No odds pick or skip anything.
 *
 * --leg-trip=N moves legs with fewer than N past runs at the race distance behind proven
 * runners (default 0 = off). The LEG TRIP RULE table compares N = 0–3.
 *
 * UPCOMING SUGGESTIONS applies the chosen rule to saved racecards whose meeting has no results
 * file yet (fetch them first with tools/batch-analyze.ts).
 *
 * Usage:
 *   npx tsx tools/backtest-trio-banker.ts --venue=HV --surface=Turf --form=all
 *   npx tsx tools/backtest-trio-banker.ts --venue=HV --surface=Turf --form=all --legs=5 --leg-rank=mc
 *
 * Also accepts --months and --ignore-after (as backtest-differentiation) and --split=YYYY-MM-DD,
 * the date dividing the season into the 1st/2nd-half columns (default 2026-03-01).
 *
 * The strategy lives in src/backtest/trioBanker.ts; this file parses flags and prints.
 */

import {
  parseDifferentiationBacktestCliArgs,
  parseIgnoreAfterDate,
  placedFinishers,
} from "../src/backtest/differentiationBacktest.js";
import {
  combinations,
  evaluateTrioBanker,
  loadTrioBankerRaces,
  loadUpcomingTrioBankerRaces,
  planTrioBanker,
  selectBanker,
  summarizeTickets,
  UPCOMING_MC_RUNS,
  type LegRank,
  type TrioBankerRule,
  type TrioBankerSummary,
  type TrioBankerTicket,
} from "../src/backtest/trioBanker.js";

interface TrioBankerArgs extends TrioBankerRule {
  legMinTripRuns: number;
  /** YYYYMMDD: races before this day are the 1st half */
  split: string;
}

function parseTrioBankerArgs(argv: string[]): TrioBankerArgs {
  const args: TrioBankerArgs = { bankerMcMin: 75, legs: 6, legRank: "form", legMinTripRuns: 0, split: "20260301" };
  for (const arg of argv) {
    const m = arg.match(/^--([a-zA-Z-]+)=(.+)$/);
    if (!m) continue;
    const key = m[1]!;
    const val = m[2]!.trim();
    if (key === "banker-mc") args.bankerMcMin = parseFloat(val);
    else if (key === "legs") args.legs = parseInt(val, 10);
    else if (key === "leg-rank") args.legRank = val.toLowerCase() === "form" ? "form" : "mc";
    else if (key === "leg-trip") args.legMinTripRuns = parseInt(val, 10);
    else if (key === "split") args.split = parseIgnoreAfterDate(val) ?? args.split;
  }
  return args;
}

const money = (n: number): string => `${n < 0 ? "-" : ""}$${Math.abs(Math.round(n)).toLocaleString("en-US")}`;
const signedMoney = (n: number): string => (n > 0 ? "+" : "") + money(n);
const roiStr = (s: TrioBankerSummary): string => (s.roi === null ? "N/A" : `${s.roi >= 0 ? "+" : ""}${s.roi.toFixed(1)}%`);
const rateStr = (n: number, d: number): string => (d > 0 ? `${((n / d) * 100).toFixed(0)}%` : "N/A");
const ymd = (d: string): string => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
const legsLabel = (rank: LegRank): string => (rank === "mc" ? "MC win%" : "form rating");
const tripLabel = (n: number): string => (n > 0 ? `trip ≥ ${n}` : "off");
const venueName = (venue: "HV" | "ST"): string => (venue === "HV" ? "Happy Valley" : "Sha Tin");

async function main() {
  const argv = process.argv.slice(2);
  const base = parseDifferentiationBacktestCliArgs(argv);
  const chosen = parseTrioBankerArgs(argv);
  const tripNote = chosen.legMinTripRuns > 0 ? ` (trip runs ≥ ${chosen.legMinTripRuns} first)` : "";

  console.log(
    `Trio banker: banker = form #1, bet when MC Place% >= ${chosen.bankerMcMin} | legs = next ${chosen.legs} by ${legsLabel(chosen.legRank)}${tripNote} | ` +
      `venue=${base.venue ?? "all"} | surface=${base.surface ?? "all"} | form=${base.form} | ` +
      `months=${base.months.length > 0 ? base.months.join(",") : "all"} | ignore-after=${base.ignoreAfter ?? "none"} | ` +
      `halves split at ${ymd(chosen.split)}\n`
  );

  const races = await loadTrioBankerRaces({
    months: base.months,
    venue: base.venue,
    surface: base.surface,
    form: base.form,
    ...(base.ignoreAfter ? { ignoreAfter: base.ignoreAfter } : {}),
  });
  console.log(`Loaded ${races.length} races with results\n`);

  const tickets = (rule: TrioBankerRule): TrioBankerTicket[] =>
    races.map((r) => evaluateTrioBanker(r, rule)).filter((t): t is TrioBankerTicket => t !== null);
  const inFirstHalf = (t: TrioBankerTicket): boolean => t.race.row.date < chosen.split;

  const gridHeader = (firstColumn: string): string =>
    `  ${firstColumn.padEnd(11)} ${"Legs".padStart(4)} ${"Combos".padStart(6)} ${"MC≥".padStart(4)} ${"Bets".padStart(5)} ${"Banker top3".padStart(13)} ${"Trio hits".padStart(11)} ${"Stake".padStart(8)} ${"Return".padStart(8)} ${"ROI".padStart(8)} ${"1st half".padStart(9)} ${"2nd half".padStart(9)}`;
  const gridRow = (mark: string, label: string, rule: TrioBankerRule): string => {
    const rows = tickets(rule);
    const all = summarizeTickets(rows);
    const first = summarizeTickets(rows.filter(inFirstHalf));
    const second = summarizeTickets(rows.filter((t) => !inFirstHalf(t)));
    return `${mark} ${label.padEnd(11)} ${String(rule.legs).padStart(4)} ${String(combinations(rule.legs, 2)).padStart(6)} ${(rule.bankerMcMin > 0 ? String(rule.bankerMcMin) : "all").padStart(4)} ${String(all.bets).padStart(5)} ${`${all.bankerPlaced} (${rateStr(all.bankerPlaced, all.bets)})`.padStart(13)} ${`${all.hits} (${rateStr(all.hits, all.bets)})`.padStart(11)} ${money(all.stake).padStart(8)} ${money(all.payout).padStart(8)} ${roiStr(all).padStart(8)} ${roiStr(first).padStart(9)} ${roiStr(second).padStart(9)}`;
  };

  // --- Strategy grid: leg ranking × leg count × banker MC threshold ---
  const gridWidth = 118;
  console.log("═".repeat(gridWidth));
  console.log(`STRATEGY GRID  ($10 per Trio combo | ROI = (return − stake) / stake | leg trip rule: ${tripLabel(chosen.legMinTripRuns)} | ▶ = row detailed below)`);
  console.log("═".repeat(gridWidth));
  console.log(gridHeader("Legs by"));
  console.log("─".repeat(gridWidth));
  const legCounts = [...new Set([5, 6, chosen.legs])].sort((a, b) => a - b);
  const mcLevels = [...new Set([0, 70, 75, 80, chosen.bankerMcMin])].sort((a, b) => a - b);
  for (const legRank of ["mc", "form"] as const) {
    for (const legs of legCounts) {
      for (const bankerMcMin of mcLevels) {
        const mark =
          legRank === chosen.legRank && legs === chosen.legs && bankerMcMin === chosen.bankerMcMin ? "▶" : " ";
        console.log(gridRow(mark, legsLabel(legRank), { bankerMcMin, legs, legRank, legMinTripRuns: chosen.legMinTripRuns }));
      }
    }
    console.log("─".repeat(gridWidth));
  }

  // --- Leg trip rule: legs short of N runs at the race distance go behind proven runners ---
  console.log("\n" + "═".repeat(gridWidth));
  console.log(
    `LEG TRIP RULE  (legs by ${legsLabel(chosen.legRank)}, ${chosen.legs} legs | legs with fewer than N past runs at the race distance go behind proven runners)`
  );
  console.log("═".repeat(gridWidth));
  console.log(gridHeader("Leg trip"));
  console.log("─".repeat(gridWidth));
  const tripLevels = [...new Set([0, 1, 2, 3, chosen.legMinTripRuns])].sort((a, b) => a - b);
  for (const bankerMcMin of [...new Set([chosen.bankerMcMin, 0])]) {
    for (const legMinTripRuns of tripLevels) {
      const mark = bankerMcMin === chosen.bankerMcMin && legMinTripRuns === chosen.legMinTripRuns ? "▶" : " ";
      console.log(
        gridRow(mark, tripLabel(legMinTripRuns), { bankerMcMin, legs: chosen.legs, legRank: chosen.legRank, legMinTripRuns })
      );
    }
    console.log("─".repeat(gridWidth));
  }

  // --- Race by race for the chosen rule ---
  const chosenTickets = tickets(chosen);
  const raceWidth = 125;
  console.log("\n" + "═".repeat(raceWidth));
  console.log(
    `RACE BY RACE  (legs by ${legsLabel(chosen.legRank)}${tripNote}, ${chosen.legs} legs = ${combinations(chosen.legs, 2)} combos, banker MC ≥ ${chosen.bankerMcMin}% | Picks = banker + legs, Cost = combos × $10)`
  );
  console.log("═".repeat(raceWidth));
  console.log(
    `${"Race".padEnd(16)} ${"Banker".padEnd(20)} ${"MC%".padStart(5)} ${"Fin".padStart(3)} ${"Legs".padEnd(20)} ${"Picks".padStart(5)} ${"Cost".padStart(6)} ${"Top 3".padEnd(12)} ${"Trio".padStart(4)} ${"Dividend".padStart(9)} ${"P&L".padStart(8)}`
  );
  console.log("─".repeat(raceWidth));
  for (const t of chosenTickets) {
    const fin = t.race.finishOrder.find((f) => f.horseCode === t.banker.horseCode)?.finishPosition;
    const top3 = placedFinishers(t.race.finishOrder)
      .map((f) => f.horseNumber)
      .join(",");
    const banker = `#${t.banker.horseNumber} ${t.banker.horseName}`.substring(0, 20);
    console.log(
      `${t.race.row.raceId.padEnd(16)} ${banker.padEnd(20)} ${(t.banker.mcPlacePct * 100).toFixed(1).padStart(5)} ${String(fin ?? "-").padStart(3)} ${t.legs.map((l) => l.horseNumber).join(",").padEnd(20)} ${String(t.legs.length + 1).padStart(5)} ${money(t.stake).padStart(6)} ${top3.padEnd(12)} ${(t.hit ? "✅" : "❌").padStart(4)} ${(t.hit ? money(t.payout) : "-").padStart(9)} ${signedMoney(t.payout - t.stake).padStart(8)}`
    );
  }
  console.log("─".repeat(raceWidth));
  const total = summarizeTickets(chosenTickets);
  console.log(
    `Bets ${total.bets} | banker top 3: ${total.bankerPlaced}/${total.bets} (${rateStr(total.bankerPlaced, total.bets)}) | ` +
      `Trio hits: ${total.hits}/${total.bets} (${rateStr(total.hits, total.bets)}) | stake ${money(total.stake)} | ` +
      `return ${money(total.payout)} | P&L ${signedMoney(total.payout - total.stake)} | ROI ${roiStr(total)}`
  );
  let streak = 0;
  let longestStreak = 0;
  for (const t of chosenTickets) {
    streak = t.hit ? 0 : streak + 1;
    longestStreak = Math.max(longestStreak, streak);
  }
  const best = chosenTickets.reduce<TrioBankerTicket | null>((b, t) => (t.payout > (b?.payout ?? 0) ? t : b), null);
  console.log(
    `Longest run without a Trio hit: ${longestStreak} bets | biggest dividend: ${best ? `${money(best.payout)} (${best.race.row.raceId})` : "none"}`
  );

  // --- By month ---
  const monthWidth = 60;
  console.log("\n" + "═".repeat(monthWidth));
  console.log("BY MONTH");
  console.log("═".repeat(monthWidth));
  console.log(
    `${"Month".padEnd(8)} ${"Bets".padStart(5)} ${"Hits".padStart(5)} ${"Stake".padStart(8)} ${"Return".padStart(8)} ${"P&L".padStart(9)} ${"ROI".padStart(9)}`
  );
  console.log("─".repeat(monthWidth));
  for (const month of [...new Set(chosenTickets.map((t) => t.race.row.date.slice(0, 6)))].sort()) {
    const s = summarizeTickets(chosenTickets.filter((t) => t.race.row.date.startsWith(month)));
    console.log(
      `${`${month.slice(0, 4)}-${month.slice(4)}`.padEnd(8)} ${String(s.bets).padStart(5)} ${String(s.hits).padStart(5)} ${money(s.stake).padStart(8)} ${money(s.payout).padStart(8)} ${signedMoney(s.payout - s.stake).padStart(9)} ${roiStr(s).padStart(9)}`
    );
  }

  // --- Upcoming: saved racecards whose meeting has no results file yet ---
  const upcoming = await loadUpcomingTrioBankerRaces({
    months: base.months,
    venue: base.venue,
    surface: base.surface,
    form: base.form,
  });
  const upWidth = 104;
  console.log("\n" + "═".repeat(upWidth));
  console.log(
    `UPCOMING SUGGESTIONS  (banker MC ≥ ${chosen.bankerMcMin}% else SKIP | ${chosen.legs} legs by ${legsLabel(chosen.legRank)}${tripNote} | $10 per combo | MC ${UPCOMING_MC_RUNS.toLocaleString("en-US")} runs)`
  );
  console.log("═".repeat(upWidth));
  if (upcoming.length === 0) {
    console.log("  (none — every saved racecard already has a results file)");
  }
  for (const meetingKey of [...new Set(upcoming.map((r) => `${r.date}_${r.venue}`))]) {
    const meetingRaces = upcoming.filter((r) => `${r.date}_${r.venue}` === meetingKey);
    const first = meetingRaces[0]!;
    console.log(`\n${ymd(first.date)} ${venueName(first.venue)} — ${meetingRaces.length} races`);
    console.log(
      `${"Race".padEnd(5)} ${"Class".padEnd(9)} ${"Dist".padStart(6)} ${"Rnrs".padStart(4)} ${"Banker".padEnd(22)} ${"MC%".padStart(5)} ${"Bet".padEnd(4)} ${"Legs".padEnd(20)} ${"Picks".padStart(5)} ${"Cost".padStart(6)}`
    );
    console.log("─".repeat(upWidth));
    let totalCost = 0;
    let betCount = 0;
    for (const race of meetingRaces) {
      const plan = planTrioBanker(race.picks, chosen);
      const banker = selectBanker(race.picks);
      const bankerStr = banker ? `#${banker.horseNumber} ${banker.horseName}`.substring(0, 22) : "-";
      const mc = banker ? (banker.mcPlacePct * 100).toFixed(1) : "-";
      console.log(
        `${`R${race.raceNumber}`.padEnd(5)} ${race.raceClass.padEnd(9)} ${`${race.distance}m`.padStart(6)} ${String(race.numRunners).padStart(4)} ${bankerStr.padEnd(22)} ${mc.padStart(5)} ${(plan ? "BET" : "SKIP").padEnd(4)} ${(plan ? plan.legs.map((l) => l.horseNumber).join(",") : "-").padEnd(20)} ${(plan ? String(plan.legs.length + 1) : "-").padStart(5)} ${(plan ? money(plan.stake) : "-").padStart(6)}`
      );
      if (plan) {
        betCount++;
        totalCost += plan.stake;
        console.log(`      legs: ${plan.legs.map((l) => `#${l.horseNumber} ${l.horseName}`).join(", ")}`);
      }
    }
    console.log("─".repeat(upWidth));
    const lastRace = Math.max(...meetingRaces.map((r) => r.raceNumber));
    console.log(`Bet ${betCount} of ${meetingRaces.length} races | total cost ${money(totalCost)}`);
    console.log(
      `Re-fetch on race day (scratchings and standby changes alter the field): npx tsx tools/batch-analyze.ts -d ${ymd(first.date)} -v "${venueName(first.venue)}" -r 1-${lastRace} -f all`
    );
  }

  console.log("\nNotes:");
  console.log("  - Banker = form #1 by overall rating. MC Place% comes from an unseeded Monte Carlo (5,000 runs in");
  console.log(`    the backtest, ${UPCOMING_MC_RUNS.toLocaleString("en-US")} for upcoming races), so a banker close to the threshold can flip between runs.`);
  console.log("  - Trip runs = past runs at exactly the race distance in the chosen --form source (any surface).");
  console.log("  - Trio dividend per $10 from data/historical results; a dead-heat for 3rd pays on either winning combo.");
  console.log("  - No odds are used to choose the banker, the legs or which races to skip.");
}

main().catch(console.error);
