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
 */

import { format, parse } from "date-fns";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import type { Race, Venue } from "../src/types/index.js";
import { RaceCardScraper } from "../src/scrapers/raceCard.js";
import { RaceCardHistoryScraper } from "../src/scrapers/raceCardHistory.js";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";
import { HorseDataEnricher } from "../src/data/horseEnricher.js";
import { JockeyEnricher } from "../src/data/jockeyEnricher.js";
import { TrainerEnricher } from "../src/data/trainerEnricher.js";
import {
  runDifferentiationBacktest,
  summarizeHitRateWithThresholds,
  computeSkipDecision,
  venueToCode,
  type FormSource,
  type DifferentiationBacktestRow,
} from "../src/backtest/differentiationBacktest.js";

interface RaceSummary {
  raceNumber: number;
  topHorse: string;
  horseNumber: number;
  rating: number;
  avgDiff: number;
  close8: number;
  sparse: number;
  topGap: number;
  /** Diff-rule outcome (for equiv CLI only; not the betting signal) */
  diffBet: string;
  /** Worst of the three hist hit-rate buckets: 🔴 / 🟡 / 🟢 / — */
  bettingSignal: string;
  histOverall: string;
  histSameClass: string;
  histSameDist: string;
  winProb: number;
  placeProb: number;
  confidence: string;
}

interface RaceSimDetail {
  raceNumber: number;
  raceClass: string;
  distance: string;
  surface: string;
  fieldSize: number;
  avgDiff: number;
  close8: number;
  sparse: number;
  topGap: number;
  diffBet: string;
  bettingSignal: string;
  histOverall: string;
  histSameClass: string;
  histSameDist: string;
  horses: {
    number: number;
    name: string;
    winProb: number;
    placeProb: number;
    formCount: number;
    rating: number;
    diff: number;
  }[];
}

function parseCliArgs() {
  const args = process.argv.slice(2);
  let date = new Date();
  let venue: Venue = "Sha Tin";
  let raceRange = "1-11";
  let formData: "all" | undefined;
  let useSaved = false;
  let btMonths: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i],
      next = args[i + 1];
    const eq = arg.match(/^--([a-zA-Z-]+)=(.+)$/);
    if (eq) {
      const key = eq[1];
      const val = eq[2];
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

  const [start, end] = raceRange.split("-").map(Number);
  const races = Array.from({ length: (end || start) - start + 1 }, (_, i) => start + i);

  return { date, venue, races, formData, useSaved, btMonths };
}

function histThresholdOpts(sparse: number, close8: number, avgDiff: number, topGap: number) {
  return {
    sparseMax: sparse,
    closeMax: close8,
    avgDiffMin: avgDiff,
    gapMin: topGap,
  };
}

function hitRateStrings(
  rows: DifferentiationBacktestRow[],
  vCode: "HV" | "ST",
  surface: string,
  raceClass: string,
  distanceM: number,
  histOpts: ReturnType<typeof histThresholdOpts>
): { histOverall: string; histSameClass: string; histSameDist: string } {
  if (rows.length === 0) {
    return { histOverall: "—", histSameClass: "—", histSameDist: "—" };
  }
  const matchVenueSurface = (r: DifferentiationBacktestRow) => r.venue === vCode && r.surface === surface;
  const o = summarizeHitRateWithThresholds(rows, matchVenueSurface, histOpts);
  const c = summarizeHitRateWithThresholds(
    rows,
    (r) => matchVenueSurface(r) && r.raceClass === raceClass,
    histOpts
  );
  const d = summarizeHitRateWithThresholds(
    rows,
    (r) => matchVenueSurface(r) && r.distance === distanceM,
    histOpts
  );
  const fmt = (x: { eligible: number; bets: number; hits: number; ratePct: string }) =>
    x.eligible === 0
      ? "—"
      : x.bets === 0
        ? "0/0 (no past BET)"
        : `${x.hits}/${x.bets} (${x.ratePct})`;
  return { histOverall: fmt(o), histSameClass: fmt(c), histSameDist: fmt(d) };
}

/** Parse "34/73 (46.6%)" → 46.6; no rate → null */
function parseHistPercent(histStr: string): number | null {
  const m = histStr.match(/\((\d+\.?\d*)%\)\s*$/);
  if (!m) return null;
  const v = parseFloat(m[1]);
  return Number.isFinite(v) ? v : null;
}

/** 🔴 <60%, 🟡 [60,70), 🟢 ≥70%; null/NaN → ⚪ */
function emojiForHistPct(pct: number | null): string {
  if (pct === null || Number.isNaN(pct)) return "⚪";
  if (pct < 60) return "🔴";
  if (pct < 70) return "🟡";
  return "🟢";
}

/** Worst valid bucket drives the race-level betting emoji */
function combinedBettingSignal(overall: string, cls: string, dist: string): string {
  const nums = [parseHistPercent(overall), parseHistPercent(cls), parseHistPercent(dist)].filter(
    (x): x is number => x !== null
  );
  if (nums.length === 0) return "—";
  const min = Math.min(...nums);
  if (min < 60) return "🔴";
  if (min < 70) return "🟡";
  return "🟢";
}

async function main() {
  const { date, venue, races, formData, useSaved, btMonths } = parseCliArgs();
  const formAnalyzer = new FormAnalyzer();
  const historyScraper = new RaceCardHistoryScraper();
  const hvStdDev = venue === "Happy Valley" ? 11 : 8;
  const results: RaceSummary[] = [];
  const simDetails: RaceSimDetail[] = [];

  const vCode = venueToCode(venue);
  const formSource: FormSource = formData === "all" ? "all" : venue === "Happy Valley" ? "HV" : "ST";

  const meetingIgnoreAfter = format(date, "yyyy-MM-dd");

  console.log(`\nBatch Analysis: ${format(date, "yyyy-MM-dd")} ${venue} R${races[0]}-R${races[races.length - 1]}`);
  console.log(`Form data: ${formData === "all" ? "all venues" : venue}`);
  console.log(
    `Hist hit rates: per race use that race's sparse / close<8 / avgDiff / 1st–2nd gap as backtest thresholds (see each race block). Historical pool: months=${btMonths.length ? btMonths.join(",") : "all"} | venue=${vCode} | form=${formSource} | ignore-after=${meetingIgnoreAfter} (preload never skips so rows carry raw metrics).\n`
  );

  let diffRows: DifferentiationBacktestRow[] = [];
  try {
    diffRows = await runDifferentiationBacktest({
      sparseMax: 999,
      closeMax: 99,
      avgDiffMin: 0,
      gapMin: 0,
      oddsMax: 0,
      months: btMonths,
      venue: vCode,
      surface: null,
      ignoreClasses: [],
      ignoreDistances: [],
      form: formSource,
      ignoreAfter: meetingIgnoreAfter,
    });
    console.log(`Loaded ${diffRows.length} historical races with results for contextual hit rates.\n`);
  } catch (err) {
    console.warn(`  Differentiation backtest preload failed: ${err instanceof Error ? err.message : err}`);
  }

  let scraper: RaceCardScraper | null = null;
  let enricher: HorseDataEnricher | null = null;
  let jockeyEnricher: JockeyEnricher | null = null;
  let trainerEnricher: TrainerEnricher | null = null;

  try {
    if (!useSaved) {
      console.log("Loading historical data...");
      enricher = new HorseDataEnricher();
      await enricher.loadHistoricalData();

      scraper = new RaceCardScraper({ headless: true });
      await scraper.init();

      jockeyEnricher = new JockeyEnricher({ fetchFromHKJC: true });
      await jockeyEnricher.loadFromDirectory();

      trainerEnricher = new TrainerEnricher({ fetchFromHKJC: true });
      await trainerEnricher.loadFromDirectory();
    }

    for (const raceNum of races) {
      let race: Race | null = null;
      let winOddsMap = new Map<number, number>();

      if (useSaved) {
        const saved = await historyScraper.loadSavedRaceCard(date, venue, raceNum);
        if (saved) { race = saved.race; winOddsMap = saved.winOddsMap; }
      } else if (scraper && enricher) {
        try {
          const scraped = await scraper.scrapeRaceCard(date, venue, raceNum);
          if (scraped.entries.length > 0) {
            race = enricher.enrichRace(scraped, { formVenue: formData === "all" ? "all" : venue });
            race = await jockeyEnricher!.enrichRace(race);
            race = await trainerEnricher!.enrichRace(race);
            winOddsMap = await scraper.fetchCurrentOdds(date, venue, raceNum);
            await historyScraper.saveRaceCard(race, winOddsMap);
          }
        } catch (err) {
          console.log(`  R${raceNum}: scrape failed - ${err instanceof Error ? err.message : err}`);
          continue;
        }
      }

      if (!race || race.entries.length < 4) {
        console.log(`  R${raceNum}: no data`);
        continue;
      }

      const analyses = formAnalyzer.analyzeRace(race);
      if (analyses.length === 0) continue;

      const simulator = new MonteCarloSimulator({ runs: 5000, performanceStdDev: hvStdDev });
      const { results: simResults } = simulator.simulateRace(race);

      const top = analyses[0];
      const topRating = top.overallRating;
      const diffs = analyses.map(a => Math.abs(topRating - a.overallRating));
      const avgDiff = Math.round(diffs.reduce((s, d) => s + d, 0) / diffs.length);
      const close8 = diffs.filter(d => d < 8).length;

      const topEntry = race.entries.find(e => e.horse.code === top.horseCode);
      const topSim = simResults.find(s => s.horseCode === top.horseCode);

      const sparseFormCount = race.entries.filter(e =>
        !e.isScratched && (e.horse.pastPerformances?.length ?? 0) <= 1
      ).length;

      const topGap =
        analyses.length >= 2 ? Math.abs(analyses[0].overallRating - analyses[1].overallRating) : 999;
      const histOpts = histThresholdOpts(sparseFormCount, close8, avgDiff, topGap);
      const { skipped: diffSkipped } = computeSkipDecision(
        sparseFormCount,
        close8,
        avgDiff,
        topGap,
        histOpts
      );
      const diffBet = diffSkipped ? "SKIP" : "BET";
      const surf = race.surface ?? "Turf";
      const cls = String(race.class);
      const distM = race.distance ?? 0;
      const { histOverall, histSameClass, histSameDist } = hitRateStrings(
        diffRows,
        vCode,
        surf,
        cls,
        distM,
        histOpts
      );
      const bettingSignal = combinedBettingSignal(histOverall, histSameClass, histSameDist);
      const eAll = emojiForHistPct(parseHistPercent(histOverall));
      const eClass = emojiForHistPct(parseHistPercent(histSameClass));
      const eDist = emojiForHistPct(parseHistPercent(histSameDist));

      let confidence = "LOW";
      if (sparseFormCount > 3) confidence = "LOW (sparse form)";
      else if (avgDiff >= 20 && close8 <= 2) confidence = "SUPPER HIGH (avgDiff and close8)";
      else if (avgDiff >= 20) confidence = "HIGH (avgDiff)";
      else if (close8 <= 2) confidence = "HIGH (close8)";
      else if (topRating >= 70 && topRating <= 79) confidence = "MED-HIGH (topRating)";
      else if (avgDiff >= 16 && close8 <= 3) confidence = "MED-HIGH (avgDiff and close8)";
      else if (close8 <= 3) confidence = "MEDIUM (close8)";

      const raceClass = (race as { raceClass?: string }).raceClass ?? String(race.class);
      const distance = race.distance ? `${race.distance}m` : "?m";
      const surface = race.surface ?? "Turf";
      const activeEntries = race.entries.filter((e) => !e.isScratched);

      const detailHorses = simResults.map((sim) => {
        const entry = race.entries.find((e) => e.horse.code === sim.horseCode);
        const analysis = analyses.find((a) => a.horseCode === sim.horseCode);
        return {
          number: sim.horseNumber,
          name: sim.horseName,
          winProb: sim.winProbability * 100,
          placeProb: sim.placeProbability * 100,
          formCount: entry?.horse.pastPerformances?.length ?? 0,
          rating: analysis?.overallRating ?? 0,
          diff: analysis ? Math.abs(topRating - analysis.overallRating) : 999,
        };
      });

      results.push({
        raceNumber: raceNum,
        topHorse: top.horseName.substring(0, 15),
        horseNumber: topEntry?.horseNumber ?? 0,
        rating: topRating,
        avgDiff,
        close8,
        sparse: sparseFormCount,
        topGap,
        diffBet,
        bettingSignal,
        histOverall,
        histSameClass,
        histSameDist,
        winProb: topSim ? topSim.winProbability * 100 : 0,
        placeProb: topSim ? topSim.placeProbability * 100 : 0,
        confidence,
      });

      simDetails.push({
        raceNumber: raceNum,
        raceClass,
        distance,
        surface,
        fieldSize: activeEntries.length,
        avgDiff,
        close8,
        sparse: sparseFormCount,
        topGap,
        diffBet,
        bettingSignal,
        histOverall,
        histSameClass,
        histSameDist,
        horses: detailHorses,
      });

      console.log(
        `  R${raceNum}: ${top.horseName.substring(0, 15)} (#${topEntry?.horseNumber}) rating=${topRating} avgDiff=${avgDiff} close<8=${close8} sparse=${sparseFormCount} gap=${topGap} betting=${bettingSignal} (diff scan: ${diffBet}) → ${confidence}`
      );
      console.log(
        `         hist (equiv: npx tsx tools/backtest-differentiation.ts --sparse=${sparseFormCount} --close=${close8} --avgdiff=${avgDiff} --gap=${topGap} --venue=${vCode} --surface=${surf === "AWT" ? "AWT" : "Turf"} --form=${formSource} --ignore-after=${meetingIgnoreAfter}):`
      );
      console.log(
        `           all ${surf} ${vCode}: ${histOverall} ${eAll} | same class (${cls}): ${histSameClass} ${eClass} | same dist (${distM}m): ${histSameDist} ${eDist}`
      );
    }

    if (jockeyEnricher) await jockeyEnricher.closeBrowser();
    if (trainerEnricher) await trainerEnricher.closeBrowser();

    // Output table
    console.log("\n" + "═".repeat(104));
    console.log("PLACE BET SUMMARY — Top-rated horse per race");
    console.log("═".repeat(104));
    console.log(
      `${"Race".padEnd(5)} ${"Horse".padEnd(16)} ${"#".padStart(2)} ${"Rating".padStart(6)} ${"AvgDiff".padStart(7)} ${"Close<8".padStart(7)} ${"Sparse".padStart(6)} ${"Win%".padStart(6)} ${"Plc%".padStart(6)} ${"Bet".padEnd(4)} ${"Confidence".padStart(10)}`
    );
    console.log("─".repeat(104));

    for (const r of results) {
      console.log(
        `R${r.raceNumber.toString().padEnd(4)} ${r.topHorse.padEnd(16)} ${r.horseNumber.toString().padStart(2)} ${r.rating.toString().padStart(6)} ${r.avgDiff.toString().padStart(7)} ${r.close8.toString().padStart(7)} ${r.sparse.toString().padStart(6)} ${r.winProb.toFixed(1).padStart(6)} ${r.placeProb.toFixed(1).padStart(6)} ${r.bettingSignal.padEnd(4)} ${r.confidence.padStart(10)}`
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
        console.log(`  → R${r.raceNumber} #${r.horseNumber} ${r.topHorse} (Rating ${r.rating}, AvgDiff ${r.avgDiff}, Close<8 ${r.close8})`);
      }
    }
    if (medHighConf.length > 0) {
      console.log("\n BORDERLINE (~65% expected):");
      for (const r of medHighConf) {
        console.log(`  → R${r.raceNumber} #${r.horseNumber} ${r.topHorse} (Rating ${r.rating}, AvgDiff ${r.avgDiff}, Close<8 ${r.close8})`);
      }
    }
    if (highConf.length === 0 && medHighConf.length === 0) {
      console.log("  No races meet the >=70% confidence threshold today.");
    }

    // Write simulation summaries to data/temp/
    if (simDetails.length > 0) {
      const dateStr = format(date, "yyyyMMdd");
      const venueSuffix = venue === "Happy Valley" ? "HV" : "ST";
      const venueLabel = venue;
      const tempDir = path.join(process.cwd(), "data", "temp");
      await mkdir(tempDir, { recursive: true });
      const outPath = path.join(tempDir, `simulation_summaries_${dateStr}_${venueSuffix}.md`);

      const rFirst = simDetails[0].raceNumber;
      const rLast = simDetails[simDetails.length - 1].raceNumber;
      const vFlag = venue === "Happy Valley" ? `-v "Happy Valley"` : `-v ST`;
      const formFlag = formData === "all" ? " -f all" : "";
      const savedFlag = useSaved ? " --use-saved" : "";
      const monthsFlag = btMonths.length > 0 ? ` --backtest-months=${btMonths.join(",")}` : "";
      const equivBatch = `npx tsx tools/batch-analyze.ts -d ${format(date, "yyyy-MM-dd")} ${vFlag} -r ${rFirst}-${rLast}${formFlag}${savedFlag}${monthsFlag}`;

      const lines: string[] = [];
      lines.push(`# Simulation Summaries — ${venueLabel} ${format(date, "yyyy-MM-dd")} (R${rFirst}–R${rLast})`);
      lines.push(`# MC: 5,000 iterations | Form data: all venues (HV + ST)`);
      lines.push(
        `# Hist hit rates: each race uses its own sparse / close<8 / avgDiff / gap as \`backtest-differentiation\` thresholds (see race block). Pool: months=${btMonths.length ? btMonths.join(",") : "all"} | venue=${vCode} | form=${formSource} | ignore-after=${meetingIgnoreAfter}`
      );
      lines.push(`# Equiv batch: \`${equivBatch}\``);
      lines.push("");

      for (const detail of simDetails) {
        lines.push("═".repeat(55));
        lines.push(`RACE ${detail.raceNumber} - ${venueLabel} | ${detail.raceClass} | ${detail.distance} ${detail.surface} | ${detail.fieldSize} runners`);
        lines.push("═".repeat(55));
        lines.push("");
        lines.push(`Win Probability Rankings (all ${detail.fieldSize} horses, 5,000 iterations):`);

        for (const h of detail.horses) {
          const numStr = `#${h.number.toString().padStart(2)}`;
          const nameStr = h.name.substring(0, 15).padEnd(15);
          const winStr = `${h.winProb.toFixed(1)}% win`.padStart(10);
          const plcStr = `${h.placeProb.toFixed(1)}% place`.padStart(12);
          const formStr = `[${h.formCount} form]`;
          lines.push(`  ${numStr} ${nameStr}: ${winStr}, ${plcStr} ${formStr} rating: ${h.rating} diff: ${h.diff}`);
        }

        lines.push("");
        lines.push(
          `  Differentiation (equiv hist thresholds): avgDiff ${detail.avgDiff} | diff<8: ${detail.close8} | sparse: ${detail.sparse} | gap: ${detail.topGap}`
        );
        const mdAll = emojiForHistPct(parseHistPercent(detail.histOverall));
        const mdCls = emojiForHistPct(parseHistPercent(detail.histSameClass));
        const mdDst = emojiForHistPct(parseHistPercent(detail.histSameDist));
        lines.push(
          `  **Betting (hist place %):** ${detail.bettingSignal} — all ${detail.surface} ${vCode}: ${detail.histOverall} ${mdAll} | same class (${detail.raceClass}): ${detail.histSameClass} ${mdCls} | same dist (${detail.distance}): ${detail.histSameDist} ${mdDst}`
        );
        lines.push(
          `  Equiv CLI: \`npx tsx tools/backtest-differentiation.ts --sparse=${detail.sparse} --close=${detail.close8} --avgdiff=${detail.avgDiff} --gap=${detail.topGap} --venue=${vCode} --surface=${detail.surface === "AWT" ? "AWT" : "Turf"} --form=${formSource} --ignore-after=${meetingIgnoreAfter}\` (+ optional \`--months=\`)`
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
        const topH = detail.horses[0];
        lines.push(
          `| R${detail.raceNumber} | ${detail.raceClass} | ${detail.distance} | ${detail.fieldSize} | ${detail.sparse} | #${topH.number} ${topH.name} | ${topH.winProb.toFixed(1)}% | ${topH.placeProb.toFixed(1)}% | ${detail.avgDiff} | ${detail.close8} | ${detail.topGap} | ${detail.bettingSignal} | ${detail.histOverall} | ${detail.histSameClass} | ${detail.histSameDist} |`
        );
      }

      await writeFile(outPath, lines.join("\n") + "\n", "utf-8");
      console.log(`\n📄 Saved: ${outPath}`);
    }

  } finally {
    if (scraper) await scraper.close();
  }
}

main().catch(console.error);
