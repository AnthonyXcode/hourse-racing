// Scans the parent repo's data/ folders once and caches a meeting manifest.
// data/racecards/racecard_YYYYMMDD_VENUE_RN.json  (one file per race)
// data/historical/results_YYYYMMDD_VENUE.json     (one file per meeting)
import { readdirSync, existsSync, readFileSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { MeetingRef, Venue } from "../shared/types";

export const DATA_DIR = fileURLToPath(new URL("../../data", import.meta.url));
const CARD_DIR = path.join(DATA_DIR, "racecards");
const RESULT_DIR = path.join(DATA_DIR, "historical");

const CARD_RE = /^racecard_(\d{8})_(ST|HV)_R(\d+)\.json$/;

interface Manifest {
  meetings: MeetingRef[];
  mtime: number;
}
let cache: Manifest | null = null;

function dirMtime(dir: string): number {
  try {
    return statSync(dir).mtimeMs;
  } catch {
    return 0;
  }
}

/** Build (or return cached) manifest. Rebuilds when either data dir's mtime changes. */
export function getManifest(): MeetingRef[] {
  const mtime = dirMtime(CARD_DIR) + dirMtime(RESULT_DIR);
  if (cache && cache.mtime === mtime) return cache.meetings;

  const byKey = new Map<string, MeetingRef>();
  for (const f of readdirSync(CARD_DIR)) {
    const m = CARD_RE.exec(f);
    if (!m) continue;
    const [, date, venue, rn] = m;
    const key = `${date}_${venue}`;
    if (!byKey.has(key)) {
      byKey.set(key, { date: date!, venue: venue as Venue, races: [], hasResults: false });
    }
    byKey.get(key)!.races.push(Number(rn));
  }
  for (const ref of byKey.values()) {
    ref.races.sort((a, b) => a - b);
    ref.hasResults = existsSync(path.join(RESULT_DIR, `results_${ref.date}_${ref.venue}.json`));
  }
  const meetings = [...byKey.values()].sort((a, b) =>
    a.date === b.date ? a.venue.localeCompare(b.venue) : b.date.localeCompare(a.date)
  );
  cache = { meetings, mtime };
  return meetings;
}

export function cardPath(date: string, venue: string, race: number): string {
  return path.join(CARD_DIR, `racecard_${date}_${venue}_R${race}.json`);
}
export function resultPath(date: string, venue: string): string {
  return path.join(RESULT_DIR, `results_${date}_${venue}.json`);
}

export function readJson<T>(p: string): T | null {
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, "utf-8")) as T;
}
