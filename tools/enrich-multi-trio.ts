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

function setKey(nums: number[]) { return nums.slice().sort((a, b) => a - b).join(","); }

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
  // A leg's winning trio matches a race when at least 3 of that race's placed
  // horses appear in the combo tokens. Dead-heats can list a "1,3>5,12"-style
  // combo (extra token / ">" separator), so we compare by intersection size,
  // not exact/subset equality.
  const matchRace = (tokens: number[]): number | undefined => {
    const tset = new Set(tokens);
    for (const [rn, placed] of placedByRace) {
      let hit = 0;
      for (const h of placed) if (tset.has(h)) hit++;
      if (hit >= 3) return rn;
    }
    return undefined;
  };
  const apiDate = `${ymd.slice(0, 4)}/${ymd.slice(4, 6)}/${ymd.slice(6, 8)}`;

  const found = { double: 0, triple: 0 };
  const seen = new Set<string>();
  for (const r of races) {
    const html = await fetchPage(apiDate, vc, r.raceNumber);
    if (delay) await new Promise((res) => setTimeout(res, delay));
    if (!html) continue;
    let m: RegExpExecArray | null;
    POOL_RE.lastIndex = 0;
    while ((m = POOL_RE.exec(html)) !== null) {
      const label = m[1].trim();
      const combos = m[2].trim();
      const div = parseFloat(m[3].replace(/,/g, ""));
      const isTriple = /TRIPLE/i.test(label);
      const sig = (isTriple ? "T:" : "D:") + combos;
      if (seen.has(sig)) continue; seen.add(sig);
      // Extract each leg's numbers with \d+ so HTML entities / dead-heat markers
      // (e.g. "1,3&gt;5,12") don't produce NaN. DT = 2 legs, TT = 3 legs.
      const trios = combos.split("/").map((s) => (s.match(/\d+/g) ?? []).map(Number));
      if (!(trios.length === (isTriple ? 3 : 2) && trios.every((t) => t.length >= 3))) continue;
      const legRaces = trios.map((t) => matchRace(t)).filter((x): x is number => x !== undefined);
      if (legRaces.length !== trios.length) continue; // couldn't match all legs
      const dividend = Number.isFinite(div) ? div : 0;
      for (const rn of legRaces) {
        const leg = races.find((x) => x.raceNumber === rn);
        if (!leg) continue;
        if (isTriple) { leg.tripleTrioDividend = dividend; leg.tripleTrioLegs = legRaces; found.triple = 1; }
        else { leg.doubleTrioDividend = dividend; leg.doubleTrioLegs = legRaces; found.double = 1; }
      }
    }
  }
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
