#!/usr/bin/env tsx
/**
 * Calibrate going adjustments (seconds per 200m) empirically from results.
 * For each winner: goingComponent = winnerTime − weightAdj − empiricalPar(Good),
 * per 200m. The going's effect vs Good = median(going) − median(Good) (removes the
 * winner-vs-par baseline). "Good" is pinned to 0. Only goings with >= --min
 * winners (default 8) are emitted; others keep the hand-set fallback.
 *
 * Output: data/static/going_adjustments_empirical.json  { Going: secPer200m }
 * CLI: --min=8
 */
import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";

const WPP = 0.045, STD_WEIGHT = 126;

function median(a: number[]): number {
  const s = a.slice().sort((x, y) => x - y);
  const m = s.length >> 1;
  return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
}

async function main() {
  const minArg = process.argv.find((a) => a.startsWith("--min="));
  const MIN = minArg ? parseInt(minArg.split("=")[1]!, 10) : 8;
  const root = process.cwd();
  const pars: Record<string, number> = JSON.parse(
    await readFile(path.join(root, "data", "static", "par_times_empirical.json"), "utf-8")
  );
  const dir = path.join(root, "data", "historical");
  const files = (await readdir(dir)).filter((f) => /^results_\d{8}_(ST|HV)\.json$/.test(f));

  const perGoing = new Map<string, number[]>();
  for (const f of files) {
    let races: any[]; try { races = JSON.parse(await readFile(path.join(dir, f), "utf-8")); } catch { continue; }
    for (const r of races) {
      const w = r.finishOrder?.find((x: any) => x.finishPosition === 1);
      if (!w || !w.finishTime || w.finishTime <= 0) continue;
      const par = pars[`${r.venue}|${r.surface}|${r.distance}|${r.class}`];
      if (par === undefined) continue; // need a Good-baseline par
      const weightAdj = (((w.actualWeight ?? STD_WEIGHT) - STD_WEIGHT) * WPP) * (r.distance / 200);
      const per200 = (w.finishTime - weightAdj - par) / (r.distance / 200);
      if (!perGoing.has(r.going)) perGoing.set(r.going, []);
      perGoing.get(r.going)!.push(per200);
    }
  }

  const goodBase = perGoing.has("Good") ? median(perGoing.get("Good")!) : 0;
  const out: Record<string, number> = { Good: 0 };
  const meta: { g: string; n: number; adj: number }[] = [];
  for (const [g, arr] of perGoing) {
    if (g === "Good") { meta.push({ g, n: arr.length, adj: 0 }); continue; }
    if (arr.length < MIN) continue;
    const adj = Math.round((median(arr) - goodBase) * 100) / 100;
    out[g] = adj; meta.push({ g, n: arr.length, adj });
  }

  const fp = path.join(root, "data", "static", "going_adjustments_empirical.json");
  await writeFile(fp, JSON.stringify(out, null, 2) + "\n");
  meta.sort((a, b) => a.adj - b.adj);
  console.log(`Calibrated ${Object.keys(out).length} goings (min n=${MIN}, Good base=${goodBase.toFixed(3)}s/200m). Wrote ${fp}\n`);
  console.log("going".padEnd(20), "n".padStart(5), "emp(s/200m)".padStart(12));
  for (const m of meta) console.log(m.g.padEnd(20), String(m.n).padStart(5), ((m.adj >= 0 ? "+" : "") + m.adj.toFixed(2)).padStart(12));
}

main().catch((e) => { console.error(e); process.exit(1); });
