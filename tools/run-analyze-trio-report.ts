#!/usr/bin/env tsx
/**
 * Run analyze-race for R1–R11 with --form-data all, then generate
 * MC SIMULATION (raw) tables and a result table (top 6 + banker, vs actual results).
 *
 * Usage:
 *   PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/run-analyze-trio-report.ts --date 2026-03-15 --venue "Sha Tin"
 */

import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { format, parse } from "date-fns";
import type { Race, Venue } from "../src/types/index.js";
import { RaceCardScraper } from "../src/scrapers/raceCard.js";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";
import { HorseDataEnricher } from "../src/data/horseEnricher.js";
import { JockeyEnricher } from "../src/data/jockeyEnricher.js";
import { TrainerEnricher } from "../src/data/trainerEnricher.js";

const RUNS = 10000;

interface RaceMcData {
  raceNumber: number;
  race: Race;
  simResults: Array<{
    horseNumber: number;
    horseName: string;
    winProbability: number;
    placeProbability: number;
    formRecordCount?: number;
  }>;
  quinellaProbs: Map<string, number>;
  topQuinellaList: Array<{ combination: string; probability: number }>;
}

interface ResultRace {
  raceNumber: number;
  finishOrder: Array<{ horseNumber: number; finishPosition: number }>;
  trioDividend: number;
}

function parseArgs(): { date: Date; venue: Venue; ignoreRecords: string[] } {
  const args = process.argv.slice(2);
  let date = parse("2026-03-15", "yyyy-MM-dd", new Date());
  let venue: Venue = "Sha Tin";
  let ignoreRecords: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const next = args[i + 1];
    if ((args[i] === "--date" || args[i] === "-d") && next) {
      date = parse(next, "yyyy-MM-dd", new Date());
      i++;
    } else if ((args[i] === "--venue" || args[i] === "-v") && next) {
      venue = next.includes("Happy") ? "Happy Valley" : "Sha Tin";
      i++;
    } else if (args[i] === "--ignore-records" && next) {
      ignoreRecords = next.split(",").map((s) => s.trim()).filter(Boolean);
      i++;
    }
  }
  return { date, venue, ignoreRecords };
}

function buildMcTable(mc: RaceMcData): string {
  const byNumber = new Map(
    mc.simResults.map((r) => [
      r.horseNumber,
      {
        name: r.horseName,
        winPct: r.winProbability * 100,
        placePct: r.placeProbability * 100,
        form: r.formRecordCount ?? 0,
      },
    ])
  );
  const topPairs = new Set<string>();
  for (const q of mc.topQuinellaList.slice(0, 5)) {
    topPairs.add(q.combination);
  }
  const horseNumbers = Array.from(byNumber.keys()).sort((a, b) => a - b);
  const lines: string[] = [
    "",
    "| # | Horse     | MC Win% | MC Place% | Form | Top Quinella (fair odds)     |",
    "|---|------------|---------|-----------|------|-------------------------------|",
  ];
  const simulator = new MonteCarloSimulator({ runs: RUNS });
  for (const num of horseNumbers) {
    const row = byNumber.get(num)!;
    const name = row.name.replace(/\|/g, " ").padEnd(10).substring(0, 10);
    const winStr = `${row.winPct.toFixed(1)}%`.padStart(6);
    const placeStr = `${row.placePct.toFixed(1)}%`.padStart(6);
    let quinellaCell = "—";
    for (const pair of topPairs) {
      const [a, b] = pair.split("-").map(Number);
      if (a === num || b === num) {
        const prob = mc.quinellaProbs.get(pair) ?? 0;
        const pct = (prob * 100).toFixed(1);
        const fair = prob > 0 ? simulator.probabilityToFairOdds(prob).toFixed(1) : "—";
        quinellaCell = `${pair.replace("-", "-")}: ${pct}% (${fair})`;
        break;
      }
    }
    lines.push(`| ${num} | ${name} | ${winStr}   | ${placeStr}    | ${String(row.form).padStart(2)}   | ${quinellaCell.padEnd(29).substring(0, 29)} |`);
  }
  return lines.join("\n");
}

function getTop6AndBanker(mc: RaceMcData): { pool: number[]; banker: number } {
  const top6 = mc.simResults.slice(0, 6).map((r) => r.horseNumber);
  const banker = top6[0] ?? 0;
  return { pool: top6, banker };
}

function getMcRankByHorse(simResults: RaceMcData["simResults"]): Map<number, number> {
  const rank = new Map<number, number>();
  simResults.forEach((r, i) => rank.set(r.horseNumber, i + 1));
  return rank;
}

async function loadResults(date: Date, venue: Venue): Promise<ResultRace[]> {
  const dateStr = format(date, "yyyyMMdd");
  const code = venue === "Sha Tin" ? "ST" : "HV";
  const path = join(process.cwd(), "data", "historical", `results_${dateStr}_${code}.json`);
  if (!existsSync(path)) throw new Error(`Results file not found: ${path}`);
  const raw = await readFile(path, "utf-8");
  const arr = JSON.parse(raw) as any[];
  return arr.map((r) => ({
    raceNumber: r.raceNumber,
    finishOrder: (r.finishOrder ?? []).map((f: any) => ({
      horseNumber: f.horseNumber,
      finishPosition: f.finishPosition,
    })),
    trioDividend: r.trioDividend ?? 0,
  }));
}

function buildResultTable(
  mcDataList: RaceMcData[],
  results: ResultRace[]
): { lines: string[]; totalStake: number; totalReturn: number } {
  const resultByRace = new Map(results.map((r) => [r.raceNumber, r]));
  let totalStake = 0;
  let totalReturn = 0;
  const lines: string[] = [
    "",
    "## Result table (Top 6 MC + #1 banker, 膽拖 $10/unit)",
    "",
    "| Race | MC top 6 (by Win%) | Banker | Result (1→2→3) | Hit? | Pool gap | Banker hit | Trio $ | Return ($) | Stake ($) | P&L ($) |",
    "|------|--------------------|--------|----------------|------|----------|------------|--------|------------|-----------|---------|",
  ];
  for (const mc of mcDataList) {
    const res = resultByRace.get(mc.raceNumber);
    const { pool, banker } = getTop6AndBanker(mc);
    const poolSet = new Set(pool);
    const stake = 100;
    totalStake += stake;
    if (!res || res.finishOrder.length < 3) {
      lines.push(`| R${mc.raceNumber} | ${pool.join(", ")} | ${banker} | — | — | — | — | — | 0 | ${stake} | −${stake} |`);
      totalReturn += 0;
      continue;
    }
    const top3 = res.finishOrder
      .filter((f) => f.finishPosition <= 3)
      .sort((a, b) => a.finishPosition - b.finishPosition)
      .map((f) => f.horseNumber);
    const [first, second, third] = top3;
    const resultStr = [first, second, third].join("-");
    const bankerInFrame = top3.includes(banker);
    const allInPool = top3.every((n) => poolSet.has(n));
    const hit = bankerInFrame && allInPool;
    const rankByHorse = getMcRankByHorse(mc.simResults);
    const poolGapParts: string[] = [];
    for (const n of top3) {
      if (!poolSet.has(n)) poolGapParts.push(`${n}(MC: ${rankByHorse.get(n) ?? "?"})`);
    }
    const poolGap = poolGapParts.length ? poolGapParts.join(", ") : "—";
    const bankerHit = bankerInFrame ? "✅" : "❌";
    const trioDiv = res.trioDividend;
    const returnAmt = hit ? trioDiv : 0;
    totalReturn += returnAmt;
    const pnl = returnAmt - stake;
    const pnlStr = pnl >= 0 ? `+${pnl}` : `${pnl}`;
    lines.push(
      `| R${mc.raceNumber} | ${pool.join(", ")} | ${banker} | ${resultStr} | ${hit ? "**Yes**" : "No"} | ${poolGap} | ${bankerHit} | ${trioDiv.toLocaleString()} | ${returnAmt} | ${stake} | ${pnlStr} |`
    );
  }
  const totalPnl = totalReturn - totalStake;
  const roi = totalStake > 0 ? ((totalReturn - totalStake) / totalStake) * 100 : 0;
  lines.push("");
  lines.push("| **Total** | | | | | | | | **" + totalReturn + "** | **" + totalStake + "** | **" + (totalPnl >= 0 ? "+" : "") + totalPnl + "** |");
  lines.push("");
  const hitCount = mcDataList.filter((mc) => {
    const res = resultByRace.get(mc.raceNumber);
    if (!res) return false;
    const { pool, banker } = getTop6AndBanker(mc);
    const top3 = res.finishOrder.filter((f) => f.finishPosition <= 3).map((f) => f.horseNumber);
    return top3.includes(banker) && top3.every((n) => new Set(pool).has(n));
  }).length;
  lines.push(`Hits: ${hitCount} / ${mcDataList.length} | ROI: ${roi.toFixed(1)}%`);
  return { lines, totalStake, totalReturn };
}

async function main(): Promise<void> {
  const { date, venue, ignoreRecords } = parseArgs();
  const scraper = new RaceCardScraper({ headless: true });
  const formAnalyzer = new FormAnalyzer();
  const simulator = new MonteCarloSimulator({ runs: RUNS });
  const enricher =
    ignoreRecords.length > 0
      ? new HorseDataEnricher({ ignoreFilePatterns: ignoreRecords })
      : new HorseDataEnricher();

  const jockeyEnricher = new JockeyEnricher({ fetchFromHKJC: true });
  const trainerEnricher = new TrainerEnricher({ fetchFromHKJC: true });

  console.log("Loading historical data...");
  if (ignoreRecords.length > 0) console.log(`  Ignore records: ${ignoreRecords.join(", ")}`);
  await enricher.loadHistoricalData();
  await jockeyEnricher.loadFromDirectory();
  await trainerEnricher.loadFromDirectory();
  console.log("Initializing scraper...");
  await scraper.init();

  const mcDataList: RaceMcData[] = [];
  for (let r = 1; r <= 11; r++) {
    console.log(`\nFetching and simulating R${r}...`);
    try {
      let race = await scraper.scrapeRaceCard(date, venue, r);
      if (race.entries.length === 0) {
        console.log(`  No entries for R${r}, skipping`);
        continue;
      }
      race = enricher.enrichRace(race, { formVenue: "all" });
      race = await jockeyEnricher.enrichRace(race);
      race = await trainerEnricher.enrichRace(race);
      formAnalyzer.analyzeRace(race);
      const { results: simResults, exoticProbabilities } = simulator.simulateRace(race);
      const topQuinellaList = simulator.getTopExoticOutcomes(exoticProbabilities.quinella, 10);
      mcDataList.push({
        raceNumber: r,
        race,
        simResults,
        quinellaProbs: exoticProbabilities.quinella,
        topQuinellaList,
      });
    } catch (err) {
      console.error(`  R${r} failed:`, err instanceof Error ? err.message : err);
    }
  }
  await scraper.close();
  await jockeyEnricher.closeBrowser();
  await trainerEnricher.closeBrowser();
  console.log(`  ${jockeyEnricher.getCachedCount()} jockey profiles, ${trainerEnricher.getCachedCount()} trainer profiles loaded`);

  console.log("\nLoading results JSON...");
  const results = await loadResults(date, venue);
  const resultTable = buildResultTable(mcDataList, results);

  const dateStr = format(date, "yyyyMMdd");
  const code = venue === "Sha Tin" ? "ST" : "HV";
  const reportLines: string[] = [
    `# Trio MC Top 6 + Banker Report — ${venue} ${format(date, "yyyy-MM-dd")}`,
    "",
    "Form data: **all venues (HV + ST)**. Pool = first 6 by MC Win%, banker = #1. 膽拖 1+5, $10/unit = $100/race.",
    ...(ignoreRecords.length > 0
      ? ["", `**Ignore records (form):** ${ignoreRecords.join(", ")}`, ""]
      : []),
    "---",
    "",
    "## MC SIMULATION (raw) by race",
  ];
  for (const mc of mcDataList) {
    reportLines.push("");
    reportLines.push("### R" + mc.raceNumber);
    reportLines.push("───────────────────────────────────────────────────────────");
    reportLines.push("MC SIMULATION (raw)");
    reportLines.push("───────────────────────────────────────────────────────────");
    reportLines.push(buildMcTable(mc));
    reportLines.push("");
    const { pool, banker } = getTop6AndBanker(mc);
    reportLines.push(`**Pool (top 6):** ${pool.join(", ")} | **Banker:** #${banker}`);
  }
  reportLines.push("");
  reportLines.push("---");
  reportLines.push(...resultTable.lines);

  const outDir = join(process.cwd(), "data", "test_reports");
  const ignoreSuffix =
    ignoreRecords.length > 0
      ? "_ignore_" + ignoreRecords.join("_").replace(/,/g, "_")
      : "";
  const outPath = join(
    outDir,
    `trio_mc_top6_banker_${dateStr}_${code}_analyze${ignoreSuffix}.md`
  );
  const { writeFile } = await import("fs/promises");
  const { mkdir } = await import("fs/promises");
  await mkdir(outDir, { recursive: true });
  await writeFile(outPath, reportLines.join("\n"), "utf-8");
  console.log(`\nReport written: ${outPath}`);
  console.log(`Total staked: $${resultTable.totalStake}; Total return: $${resultTable.totalReturn}; P&L: $${resultTable.totalReturn - resultTable.totalStake}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
