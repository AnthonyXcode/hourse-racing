// Racecards and results, read from the DB (tables racecards / meeting_results — see
// server/data/raceStore.ts; filled by `npm run data:import` and the scheduled fetcher).
// Public dates here are YYYYMMDD (the client's MeetingRef format); the store uses YYYY-MM-DD.
import { momentum } from "./momentum/service";
import { raceStore, type CardDoc, type RaceStore } from "./data/raceStore";
import type { MeetingRef, RaceResult, Venue } from "../shared/types";

let store: RaceStore | null = null;
/** The shared store on the app DB. Tests can swap it with `useRaceStore`. */
export function races(): RaceStore {
  return (store ??= raceStore(momentum().db));
}
export function useRaceStore(s: RaceStore | null) {
  store = s;
}

/** YYYYMMDD ↔ YYYY-MM-DD */
export const isoDate = (ymd: string) => `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
export const compactDate = (iso: string) => iso.replaceAll("-", "");

/** All meetings with saved cards, newest first. */
export function getManifest(): MeetingRef[] {
  return races()
    .meetings()
    .map((m) => ({ date: compactDate(m.date), venue: m.venue, races: m.races, hasResults: m.hasResults }));
}

/** A saved racecard document ({ race, winOdds }) or null. `date` is YYYYMMDD. */
export function readCard(date: string, venue: string, raceNo: number): CardDoc | null {
  return races().card({ date: isoDate(date), venue: venue as Venue, raceNo });
}

/** A meeting's results or null. `date` is YYYYMMDD. */
export function readResults(date: string, venue: string): RaceResult[] | null {
  return races().results<RaceResult>({ date: isoDate(date), venue: venue as Venue });
}
