// Model ranking for a race: the saved racecard (from the DB) through the parent repo's 10,000-run
// simulator — the same numbers `tools/analyze-race.ts --use-saved --form-data all` produced, whose
// rankings were the simulator results in order. Cached per race until its racecard row changes.
import path from "path";
import { fileURLToPath } from "url";
import { races } from "../dataIndex";
import { buildRace } from "../data/raceBuilder";
import type { ModelRank } from "../../shared/momentum/model";

type SimResult = { horseNumber: number; horseName: string; winProbability: number; placeProbability: number };
interface Simulator {
  simulateRace(race: unknown): { results: SimResult[] };
}
type SimulatorCtor = new (opts: { runs: number; performanceStdDev: number }) => Simulator;

let ctor: Promise<SimulatorCtor> | null = null;
function simulator(): Promise<SimulatorCtor> {
  // The parent src/ doesn't pass this package's tsconfig, so it's imported by computed path.
  ctor ??= import(/* @vite-ignore */ path.join(fileURLToPath(new URL("../../../src/", import.meta.url)), "simulation/monteCarlo.ts")).then(
    (m: { MonteCarloSimulator: SimulatorCtor }) => m.MonteCarloSimulator
  );
  return ctor;
}

/** Rank one saved racecard. `date` is YYYY-MM-DD. */
export async function rankCard(date: string, venue: "ST" | "HV", raceNo: number): Promise<ModelRank[]> {
  const doc = races().card({ date, venue, raceNo });
  if (!doc) throw new Error(`no saved racecard for ${date} ${venue} R${raceNo}`);
  const loaded = buildRace(doc);
  if (!loaded) throw new Error(`unreadable racecard for ${date} ${venue} R${raceNo}`);
  const Sim = await simulator();
  const sim = new Sim({ runs: 10_000, performanceStdDev: venue === "HV" ? 11 : 8 });
  return sim.simulateRace(loaded.race).results.map((s) => ({
    horseNo: s.horseNumber,
    name: s.horseName,
    winProb: s.winProbability,
    placeProb: s.placeProbability,
  }));
}

const cache = new Map<string, { stamp: string; ranks: Promise<ModelRank[]> }>();

export function modelRanks(date: string, venue: "ST" | "HV", raceNo: number): Promise<ModelRank[]> {
  const row = races()
    .cardsInRange(date, date)
    .find((c) => c.key.venue === venue && c.key.raceNo === raceNo);
  if (!row) return Promise.reject(new Error(`no saved racecard for ${date} ${venue} R${raceNo}`));

  const key = `${date}-${venue}-${raceNo}`;
  const hit = cache.get(key);
  if (hit && hit.stamp === row.updatedAt) return hit.ranks;

  const ranks = rankCard(date, venue, raceNo);
  ranks.catch(() => cache.delete(key)); // don't cache failures
  cache.set(key, { stamp: row.updatedAt, ranks });
  return ranks;
}
