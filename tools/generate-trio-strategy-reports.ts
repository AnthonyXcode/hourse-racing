/**
 * Generate trio_strategy_YYYYMMDD_VENUE_RN.md from saved racecards + MC simulation.
 * Usage: npx tsx tools/generate-trio-strategy-reports.ts --date=2026-06-07 --venue=ST
 */
import fs from "fs";
import path from "path";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { HorseDataEnricher } from "../src/data/horseEnricher.js";
import { JockeyEnricher } from "../src/data/jockeyEnricher.js";
import { TrainerEnricher } from "../src/data/trainerEnricher.js";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";
import {
  applyFormSourceFilter,
  loadRaceCard,
  parseRaceCardFileName,
} from "../src/backtest/differentiationBacktest.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const RUNS = 10000;

type McRow = {
  num: number;
  name: string;
  win: number;
  place: number;
  form: number;
  odds: number;
  code: string;
  starts: number;
};

function parseArgs() {
  const dateRaw = process.argv.find((a) => a.startsWith("--date="))?.split("=")[1] ?? "20260607";
  const venue = process.argv.find((a) => a.startsWith("--venue="))?.split("=")[1] ?? "ST";
  const date = dateRaw.replace(/-/g, "");
  return { date, venue };
}

function comb(n: number, k: number): number {
  if (k > n || k < 0) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return Math.round(r);
}

function pickPoolA(rows: McRow[]): number[] {
  const byWin = [...rows].sort((a, b) => b.win - a.win);
  let banker = byWin[0]!;
  if (banker.starts < 2) {
    const alt = byWin.find((h) => h.starts >= 2);
    if (alt) banker = alt;
  }
  const rest = rows.filter((h) => h.num !== banker.num).sort((a, b) => b.place - a.place);
  const legs = rest.slice(0, 4).map((h) => h.num);
  return [banker.num, ...legs];
}

function pickPoolB(rows: McRow[]): number[] {
  const byWin = [...rows].sort((a, b) => b.win - a.win);
  let banker = byWin[0]!;
  if (banker.starts < 2) {
    const alt = byWin.find((h) => h.starts >= 2);
    if (alt) banker = alt;
  }
  const must = rows.filter((h) => h.place >= 25 && h.num !== banker.num).map((h) => h.num);
  const topWin = byWin.filter((h) => h.num !== banker.num).slice(0, 3).map((h) => h.num);
  const pool = new Set<number>([banker.num, ...topWin, ...must]);
  const byPlace = rows.filter((h) => !pool.has(h.num)).sort((a, b) => b.place - a.place);
  for (const h of byPlace) {
    if (pool.size >= 6) break;
    pool.add(h.num);
  }
  return [...pool];
}

function strategyBLegs(rows: McRow[], bankerNum: number, winOdds: Map<number, number>): number[] {
  const primary = rows.filter((h) => h.num !== bankerNum && h.place > 20).map((h) => h.num);
  let legs = [...primary];
  const replaceable = () =>
    legs
      .map((n) => rows.find((r) => r.num === n)!)
      .filter((h) => h.place >= 20 && h.place <= 30 && (winOdds.get(h.num) ?? 99) > 10)
      .sort((a, b) => a.place - b.place);
  const candidates = rows
    .filter((h) => h.num !== bankerNum && h.place <= 20 && (winOdds.get(h.num) ?? 99) < 10)
    .sort((a, b) => (winOdds.get(a.num) ?? 99) - (winOdds.get(b.num) ?? 99));
  for (const c of candidates) {
    const rep = replaceable();
    if (rep.length > 0) {
      const weakest = rep[0]!.num;
      legs = legs.filter((n) => n !== weakest);
      legs.push(c.num);
    } else if (!legs.includes(c.num)) {
      legs.push(c.num);
    }
  }
  return legs;
}

function writeReport(opts: {
  date: string;
  venue: string;
  raceNum: number;
  raceClass: string;
  distance: number;
  surface: string;
  going: string;
  field: number;
  rows: McRow[];
  mode: string;
  pass: boolean;
  pool: number[];
  stake: number;
  combos: number;
  bBanker: number;
  bLegs: number[];
  bStake: number;
  bCombos: number;
}) {
  const {
    date,
    venue,
    raceNum,
    raceClass,
    distance,
    surface,
    going,
    field,
    rows,
    mode,
    pass,
    pool,
    stake,
    combos,
    bBanker,
    bLegs,
    bStake,
    bCombos,
  } = opts;
  const vLabel = venue === "ST" ? "Sha Tin" : "Happy Valley";
  const fmtDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
  const banker = pool[0] ?? rows[0]!.num;
  const legs = pool.slice(1);
  const topWin = rows[0]!.win;

  const mcLines = rows
    .sort((a, b) => b.win - a.win)
    .map((h) => {
      const p20 = h.place > 20 ? "✅" : "❌";
      const w10 = h.odds > 0 && h.odds < 10 ? "✅" : "❌";
      const role =
        h.num === bBanker
          ? "★ 膽 (Banker)"
          : bLegs.includes(h.num)
            ? "腳 (Leg)"
            : "—";
      return `| ${h.num} | ${h.name.substring(0, 18).padEnd(18)} | ${h.win.toFixed(1)}%  | ${h.place.toFixed(1)}%   | ${h.odds > 0 ? h.odds.toFixed(1) : "—"} | ${p20.padStart(10)} | ${w10.padStart(11)} | ${String(h.form).padStart(4)} | ${role.padEnd(24)} | — |`;
    });

  const passBlock = pass
    ? `DEFAULT: **PASS** (Mode D — top MC Win% ${topWin.toFixed(1)}% < 20%)

CONFIDENCE: **LOW** — wide open; no Trio ticket recommended.
`
    : `膽 (Banker): **#${banker}** (${rows.find((r) => r.num === banker)?.name ?? ""})

腳 (Legs): **${legs.map((n) => `#${n}`).join(", ")}**

BET STRUCTURE: 膽拖 | 1膽 + ${legs.length}腳 | C(${legs.length},2) = **${combos}**
TOTAL STAKE **$${stake}**

CONFIDENCE: **${topWin >= 35 ? "HIGH" : topWin >= 25 ? "MEDIUM–HIGH" : "MEDIUM"}**
`;

  const content = `═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - ${vLabel} | ${fmtDate} | Race ${raceNum}
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Saved racecard | Going: ${going} | ${field} runners
MC SIMULATION: ${RUNS.toLocaleString()} iterations | Form data: all venues (HV + ST)
SCMP DATA: ⚠️ Not loaded — Strategy A uses raw MC only (no SCMP adjustments)
ODDS SOURCE: Saved racecard win odds

RACE: R${raceNum} — ${raceClass} | ${distance}M | ${surface} | ${going} | ${field} runners
CLASSIFICATION: **${topWin >= 35 ? "Dominant" : topWin >= 20 ? "Competitive" : "Wide open"}** | POOL SIZE: ${pass ? "—" : pool.length}
MODE: **${mode}**
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| #  | Horse              | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B)        | Top Quinella (fair odds) |
|----|--------------------|--------:|----------:|---------:|:----------:|:-----------:|-----:|:-------------------------|:-------------------------|
${mcLines.join("\n")}

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC only, no SCMP)
───────────────────────────────────────────────────────────

| Rank | #  | Horse              | MC Win% | MC Place% | Adj Win% | Adj Place% | Odds | Role          |
|-----:|---:|--------------------|--------:|----------:|---------:|-----------:|-----:|:--------------|
${rows
  .sort((a, b) => b.win - a.win)
  .slice(0, 7)
  .map((h, i) => {
    const role = !pass && h.num === banker ? "★ 膽 (Banker)" : !pass && legs.includes(h.num) ? "腳 (Leg)" : "—";
    return `| ${i + 1} | ${h.num} | ${h.name.substring(0, 18)} | ${h.win.toFixed(1)}% | ${h.place.toFixed(1)}% | ${h.win.toFixed(1)}% | ${h.place.toFixed(1)}% | ${h.odds > 0 ? h.odds.toFixed(1) : "—"} | ${role} |`;
  })
  .join("\n")}

───────────────────────────────────────────────────────────
TRIO POOL (Strategy A — any order)
───────────────────────────────────────────────────────────
${pass ? "MODE: **D PASS** — no ticket\n" : `POOL: **${pool.map((n) => `#${n}`).join(", ")}**\nMODE: **${mode}** | POOL SIZE: **${pool.length}**\n`}

───────────────────────────────────────────────────────────
TICKET SUMMARY (Strategy A)
───────────────────────────────────────────────────────────
${passBlock}
───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#${bBanker} ${rows.find((r) => r.num === bBanker)?.name ?? ""}** (MC Win% ${rows.find((r) => r.num === bBanker)?.win.toFixed(1)}%)
Primary legs (MC Place% > 20%): **${rows.filter((h) => h.num !== bBanker && h.place > 20).map((h) => `#${h.num}`).join(", ") || "—"}**
Final legs: **${bLegs.map((n) => `#${n}`).join(", ")}**
BET STRUCTURE: 膽拖 | 1膽 + ${bLegs.length}腳 | C(${bLegs.length},2) = **${bCombos}**
TOTAL STAKE: **$${bStake}**

STRATEGY B TICKET: 膽 **#${bBanker}** | 腳 **${bLegs.join(", ")}**
═══════════════════════════════════════════════════════════
`;

  const out = path.join(ROOT, "data/reports", `trio_strategy_${date}_${venue}_R${raceNum}.md`);
  fs.writeFileSync(out, content);
  console.log("Wrote", out);
}

async function main() {
  const { date, venue } = parseArgs();
  const cardDir = path.join(ROOT, "data/racecards");
  const files = fs.readdirSync(cardDir).filter((f) => f.startsWith(`racecard_${date}_${venue}_R`));

  const enricher = new HorseDataEnricher();
  await enricher.loadHistoricalData();
  const jockeyEnricher = new JockeyEnricher({ fetchFromHKJC: false });
  const trainerEnricher = new TrainerEnricher({ fetchFromHKJC: false });
  await jockeyEnricher.loadFromDirectory();
  await trainerEnricher.loadFromDirectory();
  const formAnalyzer = new FormAnalyzer();

  for (const file of files.sort()) {
    const parsed = parseRaceCardFileName(file);
    if (!parsed) continue;
    const loaded = await loadRaceCard(path.join(cardDir, file));
    if (!loaded) continue;
    let race = applyFormSourceFilter(loaded.race, "all");
    race = enricher.enrichRace(race, { formVenue: "all" });
    race = await jockeyEnricher.enrichRace(race);
    race = await trainerEnricher.enrichRace(race);
    formAnalyzer.analyzeRace(race);

    const hvStdDev = parsed.venue === "Happy Valley" ? 11 : 8;
    const simulator = new MonteCarloSimulator({ runs: RUNS, performanceStdDev: hvStdDev });
    const { results: simResults } = simulator.simulateRace(race);

    const rows: McRow[] = simResults.map((s) => {
      const entry = race.entries.find((e) => e.horse.code === s.horseCode);
      const starts = entry?.horse.pastPerformances?.filter((p) => p.finishPosition > 0).length ?? 0;
      return {
        num: s.horseNumber,
        name: s.horseName,
        win: s.winProbability * 100,
        place: s.placeProbability * 100,
        form: s.formRecordCount ?? 0,
        odds: loaded.winOddsMap.get(s.horseNumber) ?? 0,
        code: s.horseCode,
        starts,
      };
    });

    const topWin = rows.reduce((m, r) => Math.max(m, r.win), 0);
    const pass = topWin < 20;
    const mode = topWin >= 35 ? "A" : topWin >= 20 ? "B" : "D";
    const pool = pass ? [] : mode === "A" ? pickPoolA(rows) : pickPoolB(rows);
    const legs = pool.slice(1);
    const combos = pass ? 0 : comb(legs.length, 2);
    const stake = combos * 10;

    const bBanker = [...rows].sort((a, b) => b.win - a.win)[0]!.num;
    const bLegs = strategyBLegs(rows, bBanker, loaded.winOddsMap);
    const bCombos = comb(bLegs.length, 2);
    const bStake = bCombos * 10;

    writeReport({
      date,
      venue,
      raceNum: parsed.raceNumber,
      raceClass: race.class,
      distance: race.distance,
      surface: race.surface,
      going: race.going ?? "Good",
      field: race.entries.filter((e) => !e.isScratched).length,
      rows,
      mode: pass ? "D PASS" : `Mode ${mode}`,
      pass,
      pool,
      stake,
      combos,
      bBanker,
      bLegs,
      bStake,
      bCombos,
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
