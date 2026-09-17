#!/usr/bin/env tsx
/**
 * Enrich results files with DOUBLE TRIO and TRIPLE TRIO dividends.
 * These multi-race pools settle on their final leg race; the HKJC results page
 * shows e.g. "5TH DOUBLE TRIO  2,8,11/3,4,12  7,479.00". We parse the dividend
 * and the per-leg winning trios, then match each trio to a race via finishOrder
 * top-3 to recover the leg race numbers. Writes onto each leg race:
 *   doubleTrioDividend / doubleTrioLegs   tripleTrioDividend / tripleTrioLegs
 *
 * CLI: --date=YYYY-MM-DD --venue=ST|HV   (one meeting)
 *      --all [--delay=350]               (every results file; polite delay ms)
 *      --overwrite                       (re-enrich even if already present)
 */
import { readdir, readFile, writeFile } from "fs/promises";
import { realpathSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const POOL_RE = /<td class="fontXi"[^>]*>([^<]*?(?:DOUBLE TRIO|TRIPLE TRIO))<\/td>\s*<td[^>]*>([^<]+)<\/td>\s*<td[^>]*>([^<]+)<\/td>/gi;

/** One DT/TT dividend row, tagged with the race page it was shown on (= its final leg). */
export interface PoolRow { pageRace: number; label: string; combos: string; dividend: number }

export function parsePoolRows(html: string, pageRace: number): PoolRow[] {
  const rows: PoolRow[] = [];
  let m: RegExpExecArray | null;
  POOL_RE.lastIndex = 0;
  while ((m = POOL_RE.exec(html)) !== null) {
    const div = parseFloat(m[3].replace(/,/g, ""));
    rows.push({ pageRace, label: m[1].trim(), combos: m[2].trim(), dividend: Number.isFinite(div) ? div : 0 });
  }
  return rows;
}

/**
 * Clear any existing DT/TT fields, then write each pool onto its leg races.
 * Legs are resolved backwards from the page the pool appeared on: the last leg
 * is the nearest race <= pageRace whose placed horses match, each earlier leg
 * the nearest race before the next leg. Two races in a meeting can share the
 * same top-3 set (e.g. 1,2,3 in R3 and R8), so a meeting-wide lookup would
 * assign legs to the wrong race.
 */
export function assignMultiTrio(races: any[], rows: PoolRow[]): { double: number; triple: number } {
  for (const r of races) {
    delete r.doubleTrioDividend; delete r.doubleTrioLegs;
    delete r.tripleTrioDividend; delete r.tripleTrioLegs;
  }
  // Placed set (finishPosition <= 3) per race. Dead-heats put >3 horses here, so a
  // winning DT/TT leg trio is matched by SUBSET (all 3 horses placed in that race)
  // rather than an exact slice(0,3) equality — which would miss the tied combo.
  const placedByRace = new Map<number, Set<number>>();
  for (const r of races) {
    const placed = (r.finishOrder ?? [])
      .filter((f: any) => f.finishPosition <= 3)
      .map((f: any) => f.horseNumber);
    if (placed.length >= 3) placedByRace.set(r.raceNumber, new Set<number>(placed));
  }
  const raceNosDesc = [...placedByRace.keys()].sort((a, b) => b - a);
  // A leg's winning trio matches a race when at least 3 of that race's placed
  // horses appear in the combo tokens. Dead-heats can list a "1,3>5,12"-style
  // combo (extra token / ">" separator), so we compare by intersection size,
  // not exact/subset equality.
  const matches = (rn: number, tokens: number[]): boolean => {
    const tset = new Set(tokens);
    let hit = 0;
    for (const h of placedByRace.get(rn)!) if (tset.has(h)) hit++;
    return hit >= 3;
  };

  const found = { double: 0, triple: 0 };
  const seen = new Set<string>();
  for (const row of rows) {
    const isTriple = /TRIPLE/i.test(row.label);
    const sig = (isTriple ? "T:" : "D:") + row.combos;
    if (seen.has(sig)) continue; seen.add(sig);
    // Extract each leg's numbers with \d+ so HTML entities / dead-heat markers
    // (e.g. "1,3&gt;5,12") don't produce NaN. DT = 2 legs, TT = 3 legs.
    const trios = row.combos.split("/").map((s) => (s.match(/\d+/g) ?? []).map(Number));
    if (!(trios.length === (isTriple ? 3 : 2) && trios.every((t) => t.length >= 3))) continue;
    const legRaces: number[] = [];
    let bound = row.pageRace;
    for (let i = trios.length - 1; i >= 0; i--) {
      const rn = raceNosDesc.find((n) => n <= bound && matches(n, trios[i]));
      if (rn === undefined) break;
      legRaces.unshift(rn);
      bound = rn - 1;
    }
    if (legRaces.length !== trios.length) continue; // couldn't match all legs
    for (const rn of legRaces) {
      const leg = races.find((x) => x.raceNumber === rn);
      if (!leg) continue;
      if (isTriple) { leg.tripleTrioDividend = row.dividend; leg.tripleTrioLegs = legRaces; found.triple = 1; }
      else { leg.doubleTrioDividend = row.dividend; leg.doubleTrioLegs = legRaces; found.double = 1; }
    }
  }
  return found;
}

async function fetchPage(date: string, vc: string, raceNo: number): Promise<string> {
  const url = `https://racing.hkjc.com/racing/information/English/Racing/LocalResults.aspx?RaceDate=${date}&Racecourse=${vc}&RaceNo=${raceNo}`;
  const r = await fetch(url);
  return r.ok ? r.text() : "";
}

export async function enrichMeeting(ymd: string, vc: string, delay = 300, overwrite = false): Promise<string> {
  const fp = path.join(process.cwd(), "data", "historical", `results_${ymd}_${vc}.json`);
  let races: any[];
  try { races = JSON.parse(await readFile(fp, "utf-8")); } catch { return `skip ${ymd}_${vc}: no results file`; }
  if (!overwrite && races.some((r) => r.doubleTrioDividend !== undefined || r.tripleTrioDividend !== undefined)) {
    return `skip ${ymd}_${vc}: already enriched`;
  }
  const apiDate = `${ymd.slice(0, 4)}/${ymd.slice(4, 6)}/${ymd.slice(6, 8)}`;

  const rows: PoolRow[] = [];
  let failed = 0;
  for (const r of races) {
    const html = await fetchPage(apiDate, vc, r.raceNumber);
    if (delay) await new Promise((res) => setTimeout(res, delay));
    if (!html) { failed++; continue; }
    rows.push(...parsePoolRows(html, r.raceNumber));
  }
  // assignMultiTrio clears existing DT/TT fields; don't wipe good data on a partial fetch.
  if (failed) return `skip ${ymd}_${vc}: ${failed} page(s) failed to fetch, file untouched`;
  const found = assignMultiTrio(races, rows);
  await writeFile(fp, JSON.stringify(races, null, 2) + "\n");
  return `${ymd}_${vc}: DT ${found.double ? "✓" : "—"} TT ${found.triple ? "✓" : "—"}`;
}

async function main() {
  const arg = (k: string) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split("=")[1];
  const delay = parseInt(arg("delay") ?? "350", 10);
  const overwrite = process.argv.includes("--overwrite");

  if (process.argv.includes("--all")) {
    const dir = path.join(process.cwd(), "data", "historical");
    const files = (await readdir(dir)).filter((f) => /^results_\d{8}_(ST|HV)\.json$/.test(f)).sort();
    let i = 0;
    for (const f of files) {
      const m = f.match(/^results_(\d{8})_(ST|HV)\.json$/)!;
      console.log(`[${++i}/${files.length}] ${await enrichMeeting(m[1], m[2], delay, overwrite)}`);
    }
    return;
  }
  const date = arg("date"), venue = arg("venue");
  if (!date || !venue) { console.error("need --date=YYYY-MM-DD --venue=ST|HV  (or --all)"); process.exit(1); }
  console.log(await enrichMeeting(date.replace(/-/g, ""), venue.toUpperCase(), delay, overwrite));
}

// Run only when invoked directly (not when imported by scrape-meeting).
function isEntry(): boolean {
  if (!process.argv[1]) return false;
  try { return realpathSync(process.argv[1]) === fileURLToPath(import.meta.url); } catch { return false; }
}
if (isEntry()) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
