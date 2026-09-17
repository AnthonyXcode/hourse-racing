#!/usr/bin/env tsx
/**
 * Calibrate per-bucket finish-time offsets to zero the residual bias left after
 * empirical pars + field shrinkage. Offset = median(actual − projected) winning
 * time per venue|surface|distance|class, using the SAME projection the app uses
 * (avg speed figure, field shrinkage FIELD_TIME_SHRINK, empirical pars).
 * Add this offset to a projected time to center it.
 *
 * Output: data/static/time_offsets.json  { "Venue|Surface|Distance|Class": sec }
 * Only buckets with >= --min (default 8) emitted; others default to 0.
 *
 * CLI: --min=8 --form=all
 */
import { readdir } from "fs/promises";
import { writeFile } from "fs/promises";
import path from "path";
import { FormAnalyzer } from "../src/analysis/formAnalysis.js";
import { SpeedRatingCalculator, FIELD_TIME_SHRINK } from "../src/analysis/speedRating.js";
import {
  loadRaceCard, loadMeetingResults, applyFormSourceFilter,
  parseRaceCardFileName, type MeetingResults, type FormSource,
} from "../src/backtest/differentiationBacktest.js";
import { carriedWeight } from "../src/utils/index.js";

function median(a: number[]): number {
  const s = a.slice().sort((x, y) => x - y);
  const m = s.length >> 1;
  return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
}

async function main() {
  const minArg = process.argv.find((a) => a.startsWith("--min="));
  const MIN = minArg ? parseInt(minArg.split("=")[1]!, 10) : 8;
  const formArg = process.argv.find((a) => a.startsWith("--form="))?.split("=")[1];
  const form: FormSource = formArg === "ST" ? "ST" : formArg === "HV" ? "HV" : "all";

  const dir = path.join(process.cwd(), "data", "racecards");
  const files = (await readdir(dir)).filter((f) => /^racecard_\d{8}_(ST|HV)_R\d+\.json$/.test(f)).sort();
  const fa = new FormAnalyzer();
  const speed = new SpeedRatingCalculator();
  const cache = new Map<string, MeetingResults>();
  const buckets = new Map<string, number[]>();

  for (const f of files) {
    const p = parseRaceCardFileName(f); if (!p) continue;
    const loaded = await loadRaceCard(path.join(dir, f)); if (!loaded) continue;
    const race = applyFormSourceFilter(loaded.race, form);
    if (race.entries.length < 4) continue;
    const ck = `${p.date}_${p.venue}`;
    if (!cache.has(ck)) cache.set(ck, await loadMeetingResults(p.date, p.venue));
    const fo = cache.get(ck)!.finishOrders.get(p.raceNumber);
    const actual = fo?.find((x) => x.finishPosition === 1)?.finishTime;
    if (!actual || actual <= 0) continue;

    const aMap = new Map(fa.analyzeRace(race).map((a) => [a.horseCode, a]));
    const active = race.entries.filter((e) => !e.isScratched && aMap.has(e.horse.code));
    if (active.length === 0) continue;
    const ratings = active.map((e) => aMap.get(e.horse.code)!.averageSpeedRating);
    const fieldMean = ratings.reduce((s, r) => s + r, 0) / ratings.length;
    let best: number | null = null;
    for (const e of active) {
      const raw = aMap.get(e.horse.code)!.averageSpeedRating;
      const shrunk = fieldMean + FIELD_TIME_SHRINK * (raw - fieldMean);
      const t = speed.projectFinishTime(shrunk, race.venue, race.surface, race.distance, race.class, race.going, carriedWeight(e));
      if (t !== null && (best === null || t < best)) best = t;
    }
    if (best === null) continue;
    const key = `${race.venue}|${race.surface}|${race.distance}|${race.class}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(actual - best); // offset to ADD to projection
  }

  const out: Record<string, number> = {};
  const meta: { k: string; n: number; off: number }[] = [];
  for (const [k, arr] of buckets) {
    if (arr.length < MIN) continue;
    const off = Math.round(median(arr) * 100) / 100;
    out[k] = off; meta.push({ k, n: arr.length, off });
  }
  const fp = path.join(process.cwd(), "data", "static", "time_offsets.json");
  await writeFile(fp, JSON.stringify(out, null, 2) + "\n");
  meta.sort((a, b) => b.n - a.n);
  console.log(`Calibrated ${meta.length} offset buckets (min n=${MIN}, shrink=${FIELD_TIME_SHRINK}). Wrote ${fp}\n`);
  console.log("bucket".padEnd(40), "n".padStart(5), "offset(s)".padStart(10));
  for (const m of meta.slice(0, 15)) console.log(m.k.padEnd(40), String(m.n).padStart(5), (m.off >= 0 ? "+" : "") + m.off.toFixed(2));
}

main().catch((e) => { console.error(e); process.exit(1); });
