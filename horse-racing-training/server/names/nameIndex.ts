// Every race / horse / jockey / trainer code the app can show, with its English name and the newest
// race (with a results page) it appears in — which is the page the refresher reads to get its
// Chinese name. Built from the parent repo's data files, rebuilt when either data dir changes.
// Only meetings with saved racecards count: those are the only ones the app displays.
import { readdirSync, statSync } from "fs";
import path from "path";
import { DATA_DIR, readJson } from "../dataIndex";
import { keyOf, type Kind, type NameKey } from "./store";

const CARD_DIR = path.join(DATA_DIR, "racecards");
const RESULT_DIR = path.join(DATA_DIR, "historical");
const CARD_RE = /^racecard_(\d{4})(\d{2})(\d{2})_(ST|HV)_R(\d+)\.json$/;

interface CardFile {
  race: {
    name?: string;
    entries?: { horse?: { code?: string; name?: string }; jockey?: { code?: string; name?: string }; trainer?: { code?: string; name?: string } }[];
  };
}
interface ResultFile {
  raceNumber: number;
  name?: string;
  finishOrder?: { horseCode?: string; horseName?: string; jockeyId?: string; jockeyName?: string; trainerId?: string; trainerName?: string }[];
}

export interface NameIndex {
  /** "kind:code" → English name from the data files. */
  en: Map<string, string>;
  /** "horse|jockey|trainer:code" → newest race id (with results) the runner appears in. */
  lastRace: Map<string, string>;
  /** Races that have a results page, newest first, with the keys that page covers (race + runners). */
  resultRaces: { raceId: string; keys: NameKey[] }[];
  /** Every known key: races newest first, then runners. */
  keys: NameKey[];
}

let cache: { mtime: number; index: NameIndex } | null = null;

const mtimeOf = (dir: string) => {
  try {
    return statSync(dir).mtimeMs;
  } catch {
    return 0;
  }
};

export function getNameIndex(): NameIndex {
  const mtime = mtimeOf(CARD_DIR) + mtimeOf(RESULT_DIR);
  if (cache && cache.mtime === mtime) return cache.index;
  cache = { mtime, index: buildNameIndex(CARD_DIR, RESULT_DIR) };
  return cache.index;
}

export function buildNameIndex(cardDir: string, resultDir: string): NameIndex {
  const en = new Map<string, string>();
  const lastRace = new Map<string, string>();
  const raceKeys = new Map<string, NameKey[]>(); // race id → keys (races with results only)
  const runnerKeys = new Map<string, NameKey>();

  const note = (kind: Kind, code: string | undefined, name: string | undefined, raceId: string | null) => {
    if (!code) return null;
    const k: NameKey = { kind, code };
    const key = keyOf(k);
    if (name?.trim() && !en.has(key)) en.set(key, name.trim());
    if (kind !== "race") runnerKeys.set(key, k);
    // Walking races newest first: the first race seen is the newest one.
    if (raceId && kind !== "race" && !lastRace.has(key)) lastRace.set(key, raceId);
    return k;
  };

  // Newest first, so "first seen" = newest for both English names and lastRace.
  const cards = readdirSync(cardDir)
    .map((f) => CARD_RE.exec(f))
    .filter((m): m is RegExpExecArray => !!m)
    .map((m) => ({ file: m[0], date: `${m[1]}-${m[2]}-${m[3]}`, ymd: `${m[1]}${m[2]}${m[3]}`, venue: m[4]!, rn: Number(m[5]) }))
    .sort((a, b) => b.date.localeCompare(a.date) || a.venue.localeCompare(b.venue) || a.rn - b.rn);

  const results = new Map<string, ResultFile[] | null>();
  const raceOrder: string[] = [];
  for (const c of cards) {
    const raceId = `${c.date}-${c.venue}-${c.rn}`;
    const meeting = `${c.ymd}_${c.venue}`;
    if (!results.has(meeting)) results.set(meeting, readJson<ResultFile[]>(path.join(resultDir, `results_${meeting}.json`)));
    const result = results.get(meeting)?.find((r) => r.raceNumber === c.rn) ?? null;
    const card = readJson<CardFile>(path.join(cardDir, c.file));
    const onPage = result ? raceId : null; // only races with results have a zh-HK page to read

    const covered: NameKey[] = [note("race", raceId, card?.race.name ?? result?.name, null)!];
    // Results first (who actually ran, incl. late jockey changes), then the card.
    for (const f of result?.finishOrder ?? []) {
      for (const k of [note("horse", f.horseCode, f.horseName, onPage), note("jockey", f.jockeyId, f.jockeyName, onPage), note("trainer", f.trainerId, f.trainerName, onPage)])
        if (k) covered.push(k);
    }
    for (const e of card?.race.entries ?? []) {
      note("horse", e.horse?.code, e.horse?.name, null);
      note("jockey", e.jockey?.code, e.jockey?.name, null);
      note("trainer", e.trainer?.code, e.trainer?.name, null);
    }
    raceOrder.push(raceId);
    if (result) raceKeys.set(raceId, dedupe(covered));
  }

  return {
    en,
    lastRace,
    resultRaces: raceOrder.filter((id) => raceKeys.has(id)).map((raceId) => ({ raceId, keys: raceKeys.get(raceId)! })),
    keys: [...raceOrder.map((code): NameKey => ({ kind: "race", code })), ...runnerKeys.values()],
  };
}

function dedupe(keys: NameKey[]): NameKey[] {
  const seen = new Set<string>();
  return keys.filter((k) => !seen.has(keyOf(k)) && !!seen.add(keyOf(k)));
}
