// Every race / horse / jockey / trainer code the app can show, with its English name and the newest
// race (with a results page) it appears in — which is the page the refresher reads to get its
// Chinese name. Built from the racecards / meeting_results tables, rebuilt when either changes.
// Only meetings with saved racecards count: those are the only ones the app displays.
import { races } from "../dataIndex";
import type { RaceStore } from "../data/raceStore";
import { keyOf, type Kind, type NameKey } from "./store";

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

let cache: { version: string; index: NameIndex } | null = null;

export function getNameIndex(): NameIndex {
  const store = races();
  const version = store.version();
  if (cache && cache.version === version) return cache.index;
  cache = { version, index: buildNameIndex(store) };
  return cache.index;
}

export function buildNameIndex(store: RaceStore): NameIndex {
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
  const cards = store
    .cardsInRange("0000-00-00", "9999-99-99")
    .map(({ key, doc }) => ({ doc: doc as unknown as CardFile, date: key.date, venue: key.venue, rn: key.raceNo }))
    .sort((a, b) => b.date.localeCompare(a.date) || a.venue.localeCompare(b.venue) || a.rn - b.rn);

  const results = new Map<string, ResultFile[] | null>();
  const raceOrder: string[] = [];
  for (const c of cards) {
    const raceId = `${c.date}-${c.venue}-${c.rn}`;
    const meeting = `${c.date}_${c.venue}`;
    if (!results.has(meeting)) results.set(meeting, store.results<ResultFile>({ date: c.date, venue: c.venue }));
    const result = results.get(meeting)?.find((r) => r.raceNumber === c.rn) ?? null;
    const card = c.doc;
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
