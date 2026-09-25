// Import racecard / results JSON files into the DB (`npm run data:import [-- --dir <data dir>]`).
// Idempotent: unchanged documents are skipped. Default source is the parent repo's data/ folder.
//   data/racecards/racecard_YYYYMMDD_(ST|HV)_R<n>.json  → racecards
//   data/historical/results_YYYYMMDD_(ST|HV).json       → meeting_results
//   data/historical/fixtures.json                       → data_docs['fixtures']
import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { openDb } from "../momentum/db";
import { raceStore, type CardDoc, type RaceStore, type Venue } from "./raceStore";

export const PARENT_DATA_DIR = fileURLToPath(new URL("../../../data", import.meta.url));
const CARD_RE = /^racecard_(\d{4})(\d{2})(\d{2})_(ST|HV)_R(\d+)\.json$/;
const RESULT_RE = /^results_(\d{4})(\d{2})(\d{2})_(ST|HV)\.json$/;

export interface ImportReport {
  cards: { seen: number; changed: number };
  results: { seen: number; changed: number };
  fixtures: boolean;
  errors: string[];
}

/** Import every card/results file under `dir` (optionally only files modified after `since`). */
export function importDir(store: RaceStore, dir = PARENT_DATA_DIR, opts: { since?: number } = {}): ImportReport {
  const rep: ImportReport = { cards: { seen: 0, changed: 0 }, results: { seen: 0, changed: 0 }, fixtures: false, errors: [] };
  const files = (sub: string) => (existsSync(path.join(dir, sub)) ? readdirSync(path.join(dir, sub)) : []);
  const read = (p: string) => {
    const mtime = statSync(p).mtime;
    if (opts.since && mtime.getTime() <= opts.since) return null;
    return { json: JSON.parse(readFileSync(p, "utf8")), fetchedAt: mtime.toISOString() };
  };

  for (const f of files("racecards")) {
    const m = CARD_RE.exec(f);
    if (!m) continue;
    try {
      const got = read(path.join(dir, "racecards", f));
      if (!got) continue;
      rep.cards.seen++;
      const [, y, mo, d, venue, rn] = m;
      if (store.putCard({ date: `${y}-${mo}-${d}`, venue: venue as Venue, raceNo: Number(rn) }, got.json as CardDoc, "file-import", got.fetchedAt)) rep.cards.changed++;
    } catch (e) {
      rep.errors.push(`${f}: ${e instanceof Error ? e.message : e}`);
    }
  }
  for (const f of files("historical")) {
    try {
      if (f === "fixtures.json") {
        const got = read(path.join(dir, "historical", f));
        if (got) rep.fixtures = store.putDoc("fixtures", got.json);
        continue;
      }
      const m = RESULT_RE.exec(f);
      if (!m) continue;
      const got = read(path.join(dir, "historical", f));
      if (!got) continue;
      rep.results.seen++;
      const [, y, mo, d, venue] = m;
      if (store.putResults({ date: `${y}-${mo}-${d}`, venue: venue as Venue }, got.json as unknown[], "file-import", got.fetchedAt)) rep.results.changed++;
    } catch (e) {
      rep.errors.push(`${f}: ${e instanceof Error ? e.message : e}`);
    }
  }
  return rep;
}

// CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const i = process.argv.indexOf("--dir");
  const dir = i > 0 ? path.resolve(process.argv[i + 1]!) : PARENT_DATA_DIR;
  const t0 = Date.now();
  const rep = importDir(raceStore(openDb()), dir);
  console.log(`[data:import] from ${dir} in ${Date.now() - t0} ms`);
  console.log(`  racecards: ${rep.cards.seen} read, ${rep.cards.changed} new/changed`);
  console.log(`  results:   ${rep.results.seen} read, ${rep.results.changed} new/changed`);
  console.log(`  fixtures:  ${rep.fixtures ? "updated" : "unchanged/absent"}`);
  if (rep.errors.length) {
    console.log(`  errors (${rep.errors.length}):`);
    rep.errors.slice(0, 20).forEach((e) => console.log(`    ${e}`));
    process.exitCode = 1;
  }
}
