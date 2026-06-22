#!/usr/bin/env tsx
/**
 * Calibrate par times empirically from historical results.
 * Par = median WINNER finish time, normalized back to Good going + 126lb
 * (undo the going/weight adjustments that the speed model applies), per
 * venue / surface / distance / class. Only buckets with >= --min samples
 * (default 8) are emitted; sparser buckets keep the hand-set table fallback.
 *
 * Output: data/static/par_times_empirical.json
 *   { "Venue|Surface|Distance|Class": parSeconds, ... }
 *
 * CLI: --min=8
 */
import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";

const GOING: Record<string, number> = {
  Firm: -0.3, "Good to Firm": -0.15, Good: 0, "Good to Yielding": 0.2,
  Yielding: 0.5, Soft: 0.8, Heavy: 1.2, "Wet Fast": -0.1, "Wet Slow": 0.3,
};
const WPP = 0.045;        // weight adj per lb per 200m (matches speedRating.ts)
const STD_WEIGHT = 126;

function median(a: number[]): number {
  const s = a.slice().sort((x, y) => x - y);
  const m = s.length >> 1;
  return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
}

async function main() {
  const minArg = process.argv.find((a) => a.startsWith("--min="));
  const MIN = minArg ? parseInt(minArg.split("=")[1]!, 10) : 8;
  const dir = path.join(process.cwd(), "data", "historical");
  const files = (await readdir(dir)).filter((f) => /^results_\d{8}_(ST|HV)\.json$/.test(f));

  const buckets = new Map<string, number[]>();
  for (const f of files) {
    let races: any[];
    try { races = JSON.parse(await readFile(path.join(dir, f), "utf-8")); } catch { continue; }
    for (const r of races) {
      const w = r.finishOrder?.find((x: any) => x.finishPosition === 1);
      if (!w || !w.finishTime || w.finishTime <= 0) continue;
      const goingAdj = (GOING[r.going] ?? 0) * (r.distance / 200);
      const weightAdj = (((w.actualWeight ?? STD_WEIGHT) - STD_WEIGHT) * WPP) * (r.distance / 200);
      const norm = w.finishTime - goingAdj - weightAdj; // back to Good / 126lb
      const key = `${r.venue}|${r.surface}|${r.distance}|${r.class}`;
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key)!.push(norm);
    }
  }

  const out: Record<string, number> = {};
  const meta: { bucket: string; n: number; par: number }[] = [];
  for (const [k, arr] of buckets) {
    if (arr.length < MIN) continue;
    const par = Math.round(median(arr) * 100) / 100;
    out[k] = par;
    meta.push({ bucket: k, n: arr.length, par });
  }

  const fp = path.join(process.cwd(), "data", "static", "par_times_empirical.json");
  await writeFile(fp, JSON.stringify(out, null, 2) + "\n");
  meta.sort((a, b) => b.n - a.n);
  console.log(`Calibrated ${meta.length} buckets (min n=${MIN}). Wrote ${fp}\n`);
  console.log("Top buckets by sample size:");
  console.log("bucket".padEnd(40), "n".padStart(5), "par(s)".padStart(9));
  for (const m of meta.slice(0, 20)) console.log(m.bucket.padEnd(40), String(m.n).padStart(5), m.par.toFixed(2).padStart(9));
}

main().catch((e) => { console.error(e); process.exit(1); });
