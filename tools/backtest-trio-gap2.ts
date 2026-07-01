#!/usr/bin/env tsx
/**
 * Trio backtest — "MC top-3 + rating-gap extension", field-size-dependent pool.
 * Rules:
 *   - Run MC. Top 3 by MC Win% are mandatory picks.
 *   - Walk down from #4: while overallRating gap to the previous runner <= 3, keep
 *     adding; stop at the first gap > 3.
 *   - Field >12 runners  → bet only when pool is 7-8 (else skip).
 *   - Field <=12 runners → bet only when pool is 5-6 (else skip).
 *   - Box Trio over the pool: C(P,3) × $10; hit = actual top-3 ⊆ pool.
 * Output (one file per venue): Strategy, Overall, By Month, By Racing Day, By Races.
 * CLI: --venue=ST|HV  --runs=5000
 */
import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { MonteCarloSimulator } from "../src/simulation/monteCarlo.js";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { loadRaceCard, applyFormSourceFilter, parseRaceCardFileName } from "../src/backtest/differentiationBacktest.js";

const C3 = (n: number) => (n < 3 ? 0 : (n * (n - 1) * (n - 2)) / 6);
const GAP = 3;
const STAKE = 10;

interface Bucket { elig: number; bet: number; hit: number; miss: number; staked: number; ret: number; days: Set<string>; }
const mk = (): Bucket => ({ elig: 0, bet: 0, hit: 0, miss: 0, staked: 0, ret: 0, days: new Set() });
const bumpElig = (b: Bucket, day: string) => { b.elig++; b.days.add(day); };
const bumpBet = (b: Bucket, hit: boolean, cost: number, ret: number) => { b.bet++; b.staked += cost; if (hit) { b.hit++; b.ret += ret; } else b.miss++; };

async function main() {
  const RUNS = parseInt(process.argv.find((a) => a.startsWith("--runs="))?.split("=")[1] ?? "5000", 10);
  const VENUE = (process.argv.find((a) => a.startsWith("--venue="))?.split("=")[1] ?? "ST").toUpperCase();
  const venueName = VENUE === "HV" ? "Happy Valley" : "Sha Tin";
  const root = process.cwd();
  const cardDir = path.join(root, "data", "racecards");
  const resDir = path.join(root, "data", "historical");
  const files = (await readdir(cardDir)).filter((f) => parseRaceCardFileName(f)).sort();
  const fa = new FormAnalyzer();

  const resCache = new Map<string, { fin: Map<number, string[]>; finNums: Map<number, number[]>; div: Map<number, number> }>();
  async function meetingResults(date: string, vc: string) {
    const key = `${date}_${vc}`;
    if (resCache.has(key)) return resCache.get(key)!;
    const fin = new Map<number, string[]>(), finNums = new Map<number, number[]>(), div = new Map<number, number>();
    try {
      const races = JSON.parse(await readFile(path.join(resDir, `results_${date}_${vc}.json`), "utf-8"));
      for (const r of races) {
        const t3 = (r.finishOrder ?? []).filter((x: any) => x.finishPosition <= 3).sort((a: any, b: any) => a.finishPosition - b.finishPosition);
        fin.set(r.raceNumber, t3.map((x: any) => x.horseCode));
        finNums.set(r.raceNumber, t3.map((x: any) => x.horseNumber));
        if (typeof r.trioDividend === "number") div.set(r.raceNumber, r.trioDividend);
      }
    } catch { /* none */ }
    const v = { fin, finNums, div }; resCache.set(key, v); return v;
  }

  const byMonth = new Map<string, Bucket>();
  const byDay = new Map<string, Bucket>();
  const overall = mk();
  const raceRows: { id: string; line: string }[] = [];

  for (const f of files) {
    const p = parseRaceCardFileName(f)!;
    const vc = p.venue === "Happy Valley" ? "HV" : "ST";
    if (vc !== VENUE) continue;
    const loaded = await loadRaceCard(path.join(cardDir, f));
    if (!loaded) continue;
    const race = applyFormSourceFilter(loaded.race, "all");
    const active = race.entries.filter((e) => !e.isScratched);
    if (active.length < 5) continue;

    const big = active.length > 12;
    const floor = big ? 7 : 5;
    const cap = big ? 8 : 6;

    const ndate = p.date.replace(/-/g, "");
    const month = `${ndate.slice(0, 4)}-${ndate.slice(4, 6)}`;
    const day = `${ndate.slice(0, 4)}-${ndate.slice(4, 6)}-${ndate.slice(6, 8)}`;
    const res = await meetingResults(ndate, vc);
    const top3 = res.fin.get(p.raceNumber);
    const top3nums = res.finNums.get(p.raceNumber) ?? [];
    const trioDiv = res.div.get(p.raceNumber) ?? 0;
    const id = `${ndate}_${vc}_R${p.raceNumber}`;

    const mB = byMonth.get(month) ?? byMonth.set(month, mk()).get(month)!;
    const dB = byDay.get(day) ?? byDay.set(day, mk()).get(day)!;
    bumpElig(overall, day); bumpElig(mB, day); bumpElig(dB, day);

    const numByCode = new Map(active.map((e) => [e.horse.code, e.horseNumber]));
    const analyses = fa.analyzeRace(race);
    const ratingByCode = new Map(analyses.map((a) => [a.horseCode, a.overallRating]));
    const sim = new MonteCarloSimulator({ runs: RUNS, performanceStdDev: vc === "HV" ? 11 : 8 });
    const ranked = [...sim.simulateRace(race).results].sort((a, b) => b.winProbability - a.winProbability);
    if (ranked.length < 3) continue;

    // Pool = top 3, then extend while consecutive rating gap <= 3 (no cap here).
    const pool: string[] = ranked.slice(0, 3).map((r) => r.horseCode);
    for (let i = 3; i < ranked.length; i++) {
      if ((ratingByCode.get(ranked[i - 1]!.horseCode) ?? 0) - (ratingByCode.get(ranked[i]!.horseCode) ?? 0) > GAP) break;
      pool.push(ranked[i]!.horseCode);
    }
    const poolSize = pool.length;
    const t3str = top3nums.join(",");
    const divStr = trioDiv ? "$" + trioDiv : "—";
    const regime = big ? ">12" : "≤12";

    if (poolSize < floor || poolSize > cap) {
      const reason = `pool=${poolSize} ${poolSize > cap ? `>${cap}` : `<${floor}`} (${regime})`;
      raceRows.push({ id, line: `| ${id} | SKIP | ${active.length} | ${poolSize} | — | — | ${t3str} | — | — | — | ${divStr} | — | ${reason} |` });
      continue;
    }

    const poolSet = new Set(pool);
    const poolNums = pool.map((c) => numByCode.get(c)!).sort((a, b) => a - b);
    const combos = C3(poolSize);
    const cost = combos * STAKE;
    const hit = !!top3 && top3.length >= 3 && top3.every((c) => poolSet.has(c));
    const pnl = hit ? trioDiv - cost : -cost;

    bumpBet(overall, hit, cost, trioDiv); bumpBet(mB, hit, cost, trioDiv); bumpBet(dB, hit, cost, trioDiv);
    raceRows.push({
      id,
      line: `| ${id} | BET | ${active.length} | ${poolSize} | ${poolNums.join(",")} | ${combos} | ${t3str} | ${hit ? "✅" : "❌"} | $${cost} | ${(pnl >= 0 ? "+" : "") + "$" + pnl} | ${divStr} | ${regime} | — |`,
    });
  }

  const pct = (h: number, b: number) => (b ? (100 * h / b).toFixed(1) + "%" : "—");
  const roi = (rt: number, c: number) => (c ? (((rt - c) / c) * 100).toFixed(1) + "%" : "—");
  const pnlOf = (b: Bucket) => b.ret - b.staked;
  const sign = (n: number) => (n >= 0 ? "+" : "−") + "$" + Math.abs(n).toLocaleString();

  const o: string[] = [];
  o.push(`# Trio Backtest (${VENUE}) — MC top-3 + gap, field-size pool\n`);
  o.push("## Strategy\n");
  o.push("- MC top **3** mandatory; extend down while overallRating gap ≤ **3**");
  o.push("- Field **>12** runners → bet only when pool is **7-8** (else skip)");
  o.push("- Field **≤12** runners → bet only when pool is **5-6** (else skip)");
  o.push("- Box Trio C(P,3) × $10; hit = actual top-3 ⊆ pool\n");
  o.push("## Overall\n");
  o.push("| Metric | Value |", "|--------|-------|");
  o.push(`| Eligible races | ${overall.elig} |`);
  o.push(`| Bet | ${overall.bet} |`);
  o.push(`| Skip | ${overall.elig - overall.bet} |`);
  o.push(`| Trio hits | ${overall.hit}/${overall.bet} (${pct(overall.hit, overall.bet)}) |`);
  o.push(`| Staked | $${overall.staked.toLocaleString()} |`);
  o.push(`| Return | $${overall.ret.toLocaleString()} |`);
  o.push(`| P&L | ${sign(pnlOf(overall))} |`);
  o.push(`| ROI | ${roi(overall.ret, overall.staked)} |\n`);

  const breakdown = (title: string, label: string, m: Map<string, Bucket>) => {
    o.push(`## ${title}\n`);
    o.push(`| ${label} | Races | Bet | Hit | Miss | Skip | Hit Rate | Staked | Return | P&L | ROI |`);
    o.push("|---|---|---|---|---|---|---|---|---|---|---|");
    for (const k of [...m.keys()].sort()) {
      const b = m.get(k)!;
      const lbl = title === "By Month" ? `${k} (${b.days.size}d)` : k;
      o.push(`| ${lbl} | ${b.elig} | ${b.bet} | ${b.hit} | ${b.miss} | ${b.elig - b.bet} | ${pct(b.hit, b.bet)} | $${b.staked.toLocaleString()} | $${b.ret.toLocaleString()} | ${sign(pnlOf(b))} | ${roi(b.ret, b.staked)} |`);
    }
    o.push(`| **TOTAL** | **${overall.elig}** | **${overall.bet}** | **${overall.hit}** | **${overall.miss}** | **${overall.elig - overall.bet}** | **${pct(overall.hit, overall.bet)}** | **$${overall.staked.toLocaleString()}** | **$${overall.ret.toLocaleString()}** | **${sign(pnlOf(overall))}** | **${roi(overall.ret, overall.staked)}** |\n`);
  };
  breakdown("By Month", "Month", byMonth);
  breakdown("By Racing Day", "Date", byDay);

  o.push("## By Races (race-by-race)\n");
  o.push("| Race | Bet | Rnrs | Pool | Pool (#s) | Combos | Top 3 | Hit | Staked | P&L | Trio $ | Regime/Skip |");
  o.push("|------|-----|------|------|-----------|--------|-------|-----|--------|-----|--------|-------------|");
  raceRows.sort((a, b) => a.id.localeCompare(b.id));
  o.push(...raceRows.map((x) => x.line));
  o.push(`\nGenerated: \`npx tsx tools/backtest-trio-gap2.ts --venue=${VENUE}\` (${venueName})`);

  const outPath = path.join(root, "data", "reviews", `trio_gap2_${VENUE}.md`);
  await writeFile(outPath, o.join("\n") + "\n");
  console.log(`[${VENUE}] Eligible ${overall.elig} | Bet ${overall.bet} | Hit ${overall.hit}/${overall.bet} ${pct(overall.hit, overall.bet)} | P&L ${sign(pnlOf(overall))} | ROI ${roi(overall.ret, overall.staked)}`);
  console.log(`Wrote ${outPath}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
