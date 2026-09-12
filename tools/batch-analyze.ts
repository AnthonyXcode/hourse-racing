#!/usr/bin/env tsx
/**
 * Batch analyze races and output a summary table for place betting decisions.
 *
 * Usage: npx tsx tools/batch-analyze.ts -d 2026-05-03 -v ST -r 1-11 -f all
 *
 * Differentiation metrics set **hist** thresholds (equiv `backtest-differentiation` flags).
 * **Betting** is from hist hit rates only: each bucket 🔴 <60%, 🟡 60–69.9%, 🟢 ≥70%; race
 * signal = worst bucket (⚪ = no %).
 * Optional: \`--backtest-months=04,05\` restricts the historical pool.
 *
 * Hit-rate lines use **this race's** differentiation stats as thresholds (same as running
 * backtest-differentiation with --sparse=<sparse> --close=<close8> --avgdiff=<avgDiff> --gap=<topGap>
 * plus meeting venue and race surface). Historical pool excludes races on or after `-d`
 * via \`--ignore-after\` (same as standalone backtest).
 *
 * The analysis runs in src/pipeline/batchAnalysis.ts (shared with the API); this file parses
 * arguments, prints the tables and writes data/temp/simulation_summaries_*.md.
 */

import { format, parse } from "date-fns";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import type { Venue } from "../src/types/index.js";
import { consoleLogger } from "../src/pipeline/raceAnalysis.js";
import {
  batchContext,
  emojiForHistPct,
  parseHistPercent,
  runBatchAnalysis,
  type BatchAnalysisOptions,
  type BatchHorse,
  type BatchRaceOutcome,
  type BatchRaceResult,
} from "../src/pipeline/batchAnalysis.js";

type BatchContext = ReturnType<typeof batchContext>;

function parseCliArgs() {
  const args = process.argv.slice(2);
  let date = new Date();
  let venue: Venue = "Sha Tin";
  let raceRange = "1-11";
  let formData: "all" | undefined;
  let useSaved = false;
  let btMonths: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!,
      next = args[i + 1];
    const eq = arg.match(/^--([a-zA-Z-]+)=(.+)$/);
    if (eq) {
      const key = eq[1];
      const val = eq[2]!;
      if (key === "backtest-months")
        btMonths = val
          .split(",")
          .map((s) => s.trim().padStart(2, "0"))
          .filter(Boolean);
      continue;
    }
    if ((arg === "-d" || arg === "--date") && next) {
      date = parse(next, "yyyy-MM-dd", new Date());
      i++;
    } else if ((arg === "-v" || arg === "--venue") && next) {
      venue = next.includes("Happy") ? "Happy Valley" : "Sha Tin";
      i++;
    } else if ((arg === "-r" || arg === "--race") && next) {
      raceRange = next;
      i++;
    } else if ((arg === "-f" || arg === "--form-data") && next?.toLowerCase() === "all") {
      formData = "all";
      i++;
    } else if (arg === "-s" || arg === "--use-saved") {
      useSaved = true;
    }
  }

  const bounds = raceRange.split("-").map(Number);
  const start = bounds[0] ?? 1;
  const end = bounds[1];
  const races = Array.from({ length: (end || start) - start + 1 }, (_, i) => start + i);

  return { date, venue, races, formData, useSaved, btMonths };
}

function formatWinRankingsTable(
  horses: BatchHorse[],
  fieldSize: number,
  iterations = 5000
): string[] {
  const lines: string[] = [];
  lines.push(`Win Probability Rankings (all ${fieldSize} horses, ${iterations.toLocaleString()} iterations):`);
  lines.push("");
  lines.push("| # | Horse | Win% | Place% | Form | Rating | Diff | Odds | ePos |");
  lines.push("|---|-------|-----:|-------:|-----:|-------:|-----:|-----:|-----:|");
  for (const h of horses) {
    const odds = h.winOdds > 0 ? h.winOdds.toFixed(1) : "—";
    lines.push(
      `| ${h.number} | ${h.name} | ${h.winProb.toFixed(1)}% | ${h.placeProb.toFixed(1)}% | ${h.formCount} | ${h.rating} | ${h.diff} | ${odds} | ${h.expectedPosition.toFixed(1)} |`
    );
  }
  return lines;
}

/** Per-race progress lines, printed as each race finishes */
function printRaceOutcome(outcome: BatchRaceOutcome, ctx: BatchContext): void {
  if (outcome.status === "no_data") {
    console.log(`  R${outcome.raceNumber}: no data`);
    return;
  }
  if (outcome.status === "scrape_failed") {
    console.log(`  R${outcome.raceNumber}: scrape failed - ${outcome.error}`);
    return;
  }
  if (outcome.status === "no_analysis") return;

  const r = outcome.race;
  const eAll = emojiForHistPct(parseHistPercent(r.histOverall));
  const eClass = emojiForHistPct(parseHistPercent(r.histSameClass));
  const eDist = emojiForHistPct(parseHistPercent(r.histSameDist));
  console.log(
    `  R${r.raceNumber}: ${r.topHorseName.substring(0, 15)} (#${r.topHorseNumber}) rating=${r.rating} avgDiff=${r.avgDiff} close<8=${r.close8} sparse=${r.sparse} gap=${r.topGap} betting=${r.bettingSignal} (diff scan: ${r.diffBet}) → ${r.confidence}`
  );
  console.log(
    `         hist (equiv: npx tsx tools/backtest-differentiation.ts --sparse=${r.sparse} --close=${r.close8} --avgdiff=${r.avgDiff} --gap=${r.topGap} --venue=${ctx.venueCode} --surface=${r.surface === "AWT" ? "AWT" : "Turf"} --form=${ctx.formSource} --ignore-after=${ctx.ignoreAfter}):`
  );
  console.log(
    `           all ${r.surface} ${ctx.venueCode}: ${r.histOverall} ${eAll} | same class (${r.histClass}): ${r.histSameClass} ${eClass} | same dist (${r.distanceM}m): ${r.histSameDist} ${eDist}`
  );
}

function printSummaryTables(results: BatchRaceResult[]): void {
  console.log("\n" + "═".repeat(104));
  console.log("PLACE BET SUMMARY — Top-rated horse per race");
  console.log("═".repeat(104));
  console.log(
    `${"Race".padEnd(5)} ${"Horse".padEnd(16)} ${"#".padStart(2)} ${"Rating".padStart(6)} ${"AvgDiff".padStart(7)} ${"Close<8".padStart(7)} ${"Sparse".padStart(6)} ${"Win%".padStart(6)} ${"Plc%".padStart(6)} ${"Bet".padEnd(4)} ${"Confidence".padStart(10)}`
  );
  console.log("─".repeat(104));

  for (const r of results) {
    console.log(
      `R${r.raceNumber.toString().padEnd(4)} ${r.topHorseName.substring(0, 15).padEnd(16)} ${r.topHorseNumber.toString().padStart(2)} ${r.rating.toString().padStart(6)} ${r.avgDiff.toString().padStart(7)} ${r.close8.toString().padStart(7)} ${r.sparse.toString().padStart(6)} ${r.winProb.toFixed(1).padStart(6)} ${r.placeProb.toFixed(1).padStart(6)} ${r.bettingSignal.padEnd(4)} ${r.confidence.padStart(10)}`
    );
  }
  console.log("─".repeat(104));

  console.log("\nHIST HIT RATES (per race: thresholds = that race's sparse / close<8 / avgDiff / gap; top-rated place among BET rows)");
  console.log(
    `${"Race".padEnd(5)} ${"Bet".padEnd(4)} ${"sparse".padStart(6)} ${"close".padStart(5)} ${"avgD".padStart(5)} ${"gap".padStart(4)} ${"All v+surf".padEnd(22)} ${"Same class".padEnd(22)} ${"Same dist".padEnd(22)}`
  );
  console.log("─".repeat(124));
  for (const r of results) {
    const ho = emojiForHistPct(parseHistPercent(r.histOverall));
    const hc = emojiForHistPct(parseHistPercent(r.histSameClass));
    const hd = emojiForHistPct(parseHistPercent(r.histSameDist));
    console.log(
      `R${r.raceNumber.toString().padEnd(4)} ${r.bettingSignal.padEnd(4)} ${r.sparse.toString().padStart(6)} ${r.close8.toString().padStart(5)} ${r.avgDiff.toString().padStart(5)} ${r.topGap.toString().padStart(4)} ${(r.histOverall + " " + ho).padEnd(22)} ${(r.histSameClass + " " + hc).padEnd(22)} ${(r.histSameDist + " " + hd).padEnd(22)}`
    );
  }
  console.log("─".repeat(124));

  const highConf = results.filter(r => r.confidence === "HIGH");
  const medHighConf = results.filter(r => r.confidence === "MED-HIGH");

  console.log("\n RECOMMENDED (>=70% expected place rate based on April backtest):");
  if (highConf.length > 0) {
    for (const r of highConf) {
      console.log(`  → R${r.raceNumber} #${r.topHorseNumber} ${r.topHorseName.substring(0, 15)} (Rating ${r.rating}, AvgDiff ${r.avgDiff}, Close<8 ${r.close8})`);
    }
  }
  if (medHighConf.length > 0) {
    console.log("\n BORDERLINE (~65% expected):");
    for (const r of medHighConf) {
      console.log(`  → R${r.raceNumber} #${r.topHorseNumber} ${r.topHorseName.substring(0, 15)} (Rating ${r.rating}, AvgDiff ${r.avgDiff}, Close<8 ${r.close8})`);
    }
  }
  if (highConf.length === 0 && medHighConf.length === 0) {
    console.log("  No races meet the >=70% confidence threshold today.");
  }
}

/** Write simulation summaries to data/temp/ */
async function writeSimulationSummaries(
  simDetails: BatchRaceResult[],
  opts: BatchAnalysisOptions,
  ctx: BatchContext
): Promise<void> {
  if (simDetails.length === 0) return;

  const { date, venue, formData, useSaved, backtestMonths: btMonths } = opts;
  const dateStr = format(date, "yyyyMMdd");
  const venueSuffix = venue === "Happy Valley" ? "HV" : "ST";
  const venueLabel = venue;
  const tempDir = path.join(process.cwd(), "data", "temp");
  await mkdir(tempDir, { recursive: true });
  const outPath = path.join(tempDir, `simulation_summaries_${dateStr}_${venueSuffix}.md`);

  const rFirst = simDetails[0]!.raceNumber;
  const rLast = simDetails[simDetails.length - 1]!.raceNumber;
  const vFlag = venue === "Happy Valley" ? `-v "Happy Valley"` : `-v ST`;
  const formFlag = formData === "all" ? " -f all" : "";
  const savedFlag = useSaved ? " --use-saved" : "";
  const monthsFlag = btMonths.length > 0 ? ` --backtest-months=${btMonths.join(",")}` : "";
  const equivBatch = `npx tsx tools/batch-analyze.ts -d ${format(date, "yyyy-MM-dd")} ${vFlag} -r ${rFirst}-${rLast}${formFlag}${savedFlag}${monthsFlag}`;

  const lines: string[] = [];
  lines.push(`# Simulation Summaries — ${venueLabel} ${format(date, "yyyy-MM-dd")} (R${rFirst}–R${rLast})`);
  lines.push(`# MC: 5,000 iterations | Form data: all venues (HV + ST)`);
  lines.push(
    `# Hist hit rates: each race uses its own sparse / close<8 / avgDiff / gap as \`backtest-differentiation\` thresholds (see race block). Pool: months=${btMonths.length ? btMonths.join(",") : "all"} | venue=${ctx.venueCode} | form=${ctx.formSource} | ignore-after=${ctx.ignoreAfter}`
  );
  lines.push(`# Equiv batch: \`${equivBatch}\``);
  lines.push("");

  for (const detail of simDetails) {
    lines.push("═".repeat(55));
    lines.push(`RACE ${detail.raceNumber} - ${venueLabel} | ${detail.raceClass} | ${detail.distance} ${detail.surface} | ${detail.fieldSize} runners`);
    lines.push("═".repeat(55));
    lines.push("");
    lines.push(...formatWinRankingsTable(detail.horses, detail.fieldSize));

    lines.push("");
    lines.push(
      `  Differentiation (equiv hist thresholds): avgDiff ${detail.avgDiff} | diff<8: ${detail.close8} | sparse: ${detail.sparse} | gap: ${detail.topGap}`
    );
    const mdAll = emojiForHistPct(parseHistPercent(detail.histOverall));
    const mdCls = emojiForHistPct(parseHistPercent(detail.histSameClass));
    const mdDst = emojiForHistPct(parseHistPercent(detail.histSameDist));
    lines.push(
      `  **Betting (hist place %):** ${detail.bettingSignal} — all ${detail.surface} ${ctx.venueCode}: ${detail.histOverall} ${mdAll} | same class (${detail.raceClass}): ${detail.histSameClass} ${mdCls} | same dist (${detail.distance}): ${detail.histSameDist} ${mdDst}`
    );
    lines.push(
      `  Equiv CLI: \`npx tsx tools/backtest-differentiation.ts --sparse=${detail.sparse} --close=${detail.close8} --avgdiff=${detail.avgDiff} --gap=${detail.topGap} --venue=${ctx.venueCode} --surface=${detail.surface === "AWT" ? "AWT" : "Turf"} --form=${ctx.formSource} --ignore-after=${ctx.ignoreAfter}\` (+ optional \`--months=\`)`
    );
    lines.push("");
  }

  // Meeting overview table
  lines.push("═".repeat(55));
  lines.push("MEETING OVERVIEW");
  lines.push("═".repeat(55));
  lines.push("");
  lines.push("| Race | Class | Dist | Field | Sparse | Top Horse | Win% | Place% | AvgDiff | Diff<8 | Gap | Betting | Hist all | Hist class | Hist dist |");
  lines.push("|------|-------|------|-------|--------|-----------|------|--------|---------|--------|-----|---------|----------|------------|-----------|");

  for (const detail of simDetails) {
    const topH = detail.horses[0]!;
    lines.push(
      `| R${detail.raceNumber} | ${detail.raceClass} | ${detail.distance} | ${detail.fieldSize} | ${detail.sparse} | #${topH.number} ${topH.name} | ${topH.winProb.toFixed(1)}% | ${topH.placeProb.toFixed(1)}% | ${detail.avgDiff} | ${detail.close8} | ${detail.topGap} | ${detail.bettingSignal} | ${detail.histOverall} | ${detail.histSameClass} | ${detail.histSameDist} |`
    );
  }

  await writeFile(outPath, lines.join("\n") + "\n", "utf-8");
  console.log(`\n📄 Saved: ${outPath}`);
}

async function main() {
  const { date, venue, races, formData, useSaved, btMonths } = parseCliArgs();
  const opts: BatchAnalysisOptions = { date, venue, races, useSaved, backtestMonths: btMonths };
  if (formData) opts.formData = formData;
  const ctx = batchContext(opts);

  console.log(`\nBatch Analysis: ${format(date, "yyyy-MM-dd")} ${venue} R${races[0]}-R${races[races.length - 1]}`);
  console.log(`Form data: ${formData === "all" ? "all venues" : venue}`);
  console.log(
    `Hist hit rates: per race use that race's sparse / close<8 / avgDiff / 1st–2nd gap as backtest thresholds (see each race block). Historical pool: months=${btMonths.length ? btMonths.join(",") : "all"} | venue=${ctx.venueCode} | form=${ctx.formSource} | ignore-after=${ctx.ignoreAfter} (preload never skips so rows carry raw metrics).\n`
  );

  const result = await runBatchAnalysis(opts, {
    log: consoleLogger,
    onRace: (outcome) => printRaceOutcome(outcome, ctx),
  });

  printSummaryTables(result.races);
  await writeSimulationSummaries(result.races, opts, ctx);
}

main().catch(console.error);
