#!/usr/bin/env tsx
/**
 * Hit vs Miss comparison for backtest-differentiation.
 *
 * Runs the same backtest (same CLI flags as backtest-differentiation.ts), then for
 * every BETTED race writes the full MC win-probability table (same layout as
 * data/temp/simulation_summaries_*.md) plus an "Actual" finishing-position column.
 *
 * Output:
 *   data/backtest-differentiation/backtest-differentiation-hit.md   (pick placed)
 *   data/backtest-differentiation/backtest-differentiation-miss.md  (pick missed)
 *
 * The pick (top form-rated horse) is marked with ⭐ in the table.
 */
import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import {
  parseDifferentiationBacktestCliArgs,
  runDifferentiationBacktest,
  loadRaceCard,
  applyFormSourceFilter,
  loadMeetingResults,
  parseRaceCardFileName,
  racecardFilePattern,
  type MeetingResults,
  type DifferentiationBacktestRow,
} from "../src/backtest/differentiationBacktest.js";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";

/** raceNumber → trio dividend (per $10 unit) from data/historical/results_*.json */
async function loadTrioDividends(dateStr: string, venue: string): Promise<Map<number, number>> {
  const venueSuffix = venue === "Happy Valley" ? "HV" : "ST";
  const filePath = path.join(process.cwd(), "data", "historical", `results_${dateStr}_${venueSuffix}.json`);
  try {
    const races = JSON.parse(await readFile(filePath, "utf-8")) as { raceNumber: number; trioDividend?: number }[];
    const map = new Map<number, number>();
    for (const r of races) if (r.trioDividend !== undefined) map.set(r.raceNumber, r.trioDividend);
    return map;
  } catch {
    return new Map();
  }
}

function buildRaceBlock(
  row: DifferentiationBacktestRow,
  race: ReturnType<typeof applyFormSourceFilter>,
  winOddsMap: Map<number, number>,
  finishOrder: { horseNumber: number; finishPosition: number }[],
  formAnalyzer: FormAnalyzer,
  venue: string,
  trioDividend: number
): string {
  const analyses = formAnalyzer.analyzeRace(race);
  const topRating = analyses[0]?.overallRating ?? 0;
  const hvStdDev = venue === "Happy Valley" ? 11 : 8;
  const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
  const { results: simResults } = simulator.simulateRace(race);
  const posMap = new Map(finishOrder.map((f) => [f.horseNumber, f.finishPosition]));
  const fieldSize = race.entries.filter((e) => !e.isScratched).length;

  const pickPos =
    row.topRatedFinishPosition > 0 ? row.topRatedFinishPosition : posMap.get(row.topRatedHorseNumber) ?? 0;

  const lines: string[] = [];
  lines.push("═".repeat(60));
  lines.push(`${row.raceId} — ${race.class} | ${race.distance}m ${race.surface} | ${fieldSize} runners`);
  lines.push(`Trio dividend: ${trioDividend > 0 ? "$" + trioDividend.toLocaleString() : "n/a"} (per $10)`);
  lines.push(
    `Pick: #${row.topRatedHorseNumber} ${row.topRatedHorseName} | ` +
      `WinO ${row.topRatedWinOdds > 0 ? row.topRatedWinOdds.toFixed(1) : "-"} | ` +
      `Actual finish: ${pickPos > 0 ? pickPos : "-"} | ${row.topRatedPlaced ? "HIT (placed)" : "MISS"}`
  );
  lines.push("═".repeat(60));
  lines.push("");
  lines.push("| # | Horse | Win% | Place% | Form | Rating | Diff | Odds | ePos | Actual |");
  lines.push("|---|-------|-----:|-------:|-----:|-------:|-----:|-----:|-----:|-------:|");
  for (const sim of simResults) {
    const entry = race.entries.find((e) => e.horse.code === sim.horseCode);
    const analysis = analyses.find((a) => a.horseCode === sim.horseCode);
    const odds = winOddsMap.get(sim.horseNumber) ?? 0;
    const actual = posMap.get(sim.horseNumber);
    const mark = sim.horseNumber === row.topRatedHorseNumber ? " ⭐" : "";
    lines.push(
      `| ${sim.horseNumber}${mark} | ${sim.horseName} | ${(sim.winProbability * 100).toFixed(1)}% | ` +
        `${(sim.placeProbability * 100).toFixed(1)}% | ${entry?.horse.pastPerformances?.length ?? 0} | ` +
        `${analysis?.overallRating ?? 0} | ${analysis ? Math.abs(topRating - analysis.overallRating) : 999} | ` +
        `${odds > 0 ? odds.toFixed(1) : "—"} | ${sim.expectedPosition.toFixed(1)} | ${actual ?? "-"} |`
    );
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const opts = parseDifferentiationBacktestCliArgs(process.argv.slice(2));
  const rows = await runDifferentiationBacktest(opts);
  const betted = rows.filter((r) => !r.skipped);
  const byId = new Map(betted.map((r) => [r.raceId, r]));

  const raceCardDir = path.join(process.cwd(), "data", "racecards");
  const files = await readdir(raceCardDir);
  const monthPattern = racecardFilePattern(opts.months, opts.venue);
  const matched = files.filter((f) => monthPattern.test(f)).sort();
  const ignoreAfterYmd = opts.ignoreAfter ? opts.ignoreAfter.replace(/-/g, "") : null;

  const formAnalyzer = new FormAnalyzer();
  const resultsCache = new Map<string, MeetingResults>();
  const trioCache = new Map<string, Map<number, number>>();
  const hitBlocks: string[] = [];
  const missBlocks: string[] = [];

  for (const file of matched) {
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;
    if (ignoreAfterYmd && parsed.date >= ignoreAfterYmd) continue;
    const raceId = `${parsed.date}_${parsed.venue === "Happy Valley" ? "HV" : "ST"}_R${parsed.raceNumber}`;
    const row = byId.get(raceId);
    if (!row) continue; // skipped or filtered out

    const loaded = await loadRaceCard(path.join(raceCardDir, file));
    if (!loaded) continue;
    const race = applyFormSourceFilter(loaded.race, opts.form);

    const cacheKey = `${parsed.date}_${parsed.venue}`;
    if (!resultsCache.has(cacheKey)) {
      resultsCache.set(cacheKey, await loadMeetingResults(parsed.date, parsed.venue));
    }
    const finishOrder = resultsCache.get(cacheKey)!.finishOrders.get(parsed.raceNumber) ?? [];

    if (!trioCache.has(cacheKey)) {
      trioCache.set(cacheKey, await loadTrioDividends(parsed.date, parsed.venue));
    }
    const trioDividend = trioCache.get(cacheKey)!.get(parsed.raceNumber) ?? 0;

    const block = buildRaceBlock(row, race, loaded.winOddsMap, finishOrder, formAnalyzer, parsed.venue, trioDividend);
    if (row.topRatedPlaced) hitBlocks.push(block);
    else missBlocks.push(block);
  }

  const outDir = path.join(process.cwd(), "data", "backtest-differentiation");
  await mkdir(outDir, { recursive: true });

  const header = (kind: string, n: number): string =>
    [
      `# Backtest Differentiation — ${kind} cases`,
      `# Pick = top form-rated horse (marked ⭐). MC: 5,000 iterations | Form data: ${opts.form}`,
      `# Filters: venue=${opts.venue ?? "all"} | surface=${opts.surface ?? "all"} | ` +
        `odds=${opts.oddsMax > 0 ? "<=" + opts.oddsMax : "off"} | ` +
        `ignore-class=${opts.ignoreClasses.length ? opts.ignoreClasses.join(",") : "none"} | ` +
        `ignore-after=${opts.ignoreAfter ?? "none"}`,
      `# Skip thresholds: sparse>${opts.sparseMax} close<8>${opts.closeMax} avgDiff<${opts.avgDiffMin} gap<${opts.gapMin}`,
      `# ${n} ${kind.toLowerCase()} races (betted only)`,
      "",
      "",
    ].join("\n");

  await writeFile(
    path.join(outDir, "backtest-differentiation-hit.md"),
    header("Hit", hitBlocks.length) + hitBlocks.join("\n") + "\n",
    "utf-8"
  );
  await writeFile(
    path.join(outDir, "backtest-differentiation-miss.md"),
    header("Miss", missBlocks.length) + missBlocks.join("\n") + "\n",
    "utf-8"
  );

  console.log(
    `Wrote ${hitBlocks.length} hit + ${missBlocks.length} miss races → data/backtest-differentiation/`
  );
}

main().catch(console.error);
