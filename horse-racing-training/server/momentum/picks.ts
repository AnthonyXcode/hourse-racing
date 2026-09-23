// Model ranking for a race — the same pipeline as `tools/analyze-race.ts --use-saved --form-data all`
// (form analysis + 10,000-run Monte Carlo on the saved racecard), sorted by win probability.
//
// Runs in a child process: the parent engine resolves data/ from process.cwd() (so it must run
// from the parent repo), and the simulation takes seconds of CPU that shouldn't stall the poller.
// Cached per race until its racecard file changes.
import { execFile } from "child_process";
import { statSync } from "fs";
import { fileURLToPath } from "url";
import { cardPath } from "../dataIndex";
import type { ModelRank } from "../../shared/momentum/model";

const PARENT_ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const TSX = fileURLToPath(new URL("../../node_modules/.bin/tsx", import.meta.url));
const SCRIPT = fileURLToPath(new URL("./rankRace.ts", import.meta.url));

function runRanker(date: string, venue: string, raceNo: number): Promise<ModelRank[]> {
  return new Promise((resolve, reject) => {
    execFile(TSX, [SCRIPT, date, venue, String(raceNo)], { cwd: PARENT_ROOT, timeout: 120_000, maxBuffer: 16 << 20 }, (err, stdout, stderr) => {
      const line = stdout.split("\n").find((l) => l.startsWith("__RANKS__"));
      if (line) return resolve(JSON.parse(line.slice("__RANKS__".length)) as ModelRank[]);
      const detail = (stderr || stdout).trim().split("\n").slice(-3).join(" ");
      reject(new Error(`analyzer failed for ${date} ${venue} R${raceNo}: ${err?.message ?? ""} ${detail}`.trim()));
    });
  });
}

const cache = new Map<string, { mtime: number; ranks: Promise<ModelRank[]> }>();

export function modelRanks(date: string, venue: "ST" | "HV", raceNo: number): Promise<ModelRank[]> {
  const file = cardPath(date.replaceAll("-", ""), venue, raceNo); // racecard files use YYYYMMDD
  const mtime = statSync(file, { throwIfNoEntry: false })?.mtimeMs;
  if (mtime == null) return Promise.reject(new Error(`no saved racecard for ${date} ${venue} R${raceNo}`));

  const key = `${date}-${venue}-${raceNo}`;
  const hit = cache.get(key);
  if (hit && hit.mtime === mtime) return hit.ranks;

  const ranks = runRanker(date, venue, raceNo);
  ranks.catch(() => cache.delete(key)); // don't cache failures
  cache.set(key, { mtime, ranks });
  return ranks;
}
