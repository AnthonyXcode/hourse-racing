// Shared types imported by BOTH the Express server and the React client.
// Mirrors the racecard / results JSON documents (DB tables racecards and meeting_results — originally
// the parent repo's data/racecards and data/historical files).

export type Venue = "ST" | "HV";

// ---- Race card (data/racecards/racecard_YYYYMMDD_VENUE_RN.json) ----
export interface CardHorse {
  code: string;
  name: string;
  age?: number;
  sex?: string;
  origin?: string;
  currentRating?: number;
}
export interface CardJockey {
  /** HKJC jockey id, e.g. "CJE" */
  code: string;
  name: string;
}
export interface CardTrainer {
  /** HKJC trainer id, e.g. "EDJ" */
  code: string;
  name: string;
}
export interface CardEntry {
  horseNumber: number;
  draw: number;
  weight: number;
  isScratched: boolean;
  horse: CardHorse;
  jockey: CardJockey;
  trainer: CardTrainer;
}
export interface RaceCard {
  /** "2026-09-23-HV-1" — the key for this race's display name (/api/names/lookup, kind "race"). */
  id: string;
  date: string;
  venue: string;
  raceNumber: number;
  name: string;
  class: string;
  distance: number;
  surface: string;
  going: string;
  entries: CardEntry[];
  /** horseNumber -> win odds */
  winOdds: Record<string, number>;
}

// ---- Results (data/historical/results_YYYYMMDD_VENUE.json) ----
export interface FinishEntry {
  horseNumber: number;
  finishPosition: number;
  horseName: string;
  horseCode: string;
  winOdds: number;
  jockeyName?: string;
  trainerName?: string;
  /** On-disk HKJC ids (data/historical). */
  jockeyId?: string;
  trainerId?: string;
  /** Same ids, as sent by GET /api/result (name lookup keys). */
  jockeyCode?: string;
  trainerCode?: string;
  draw?: number;
  finishTime?: number;
}
export interface RaceResult {
  /** "2026-09-23-HV-1"; always set by GET /api/result. */
  id?: string;
  raceNumber: number;
  class: string;
  distance: number;
  finishOrder: FinishEntry[];
  winDividend?: number;
  /** indexed by finishing position: [1st place div, 2nd, 3rd]. length = #places paid. */
  placeDividends?: number[];
  quinellaDividend?: number;
  /** the three Quinella Place dividends (any two of the first three). */
  quinellaPlaceDividends?: number[];
  tierceDividend?: number;
  trioDividend?: number;
  first4Dividend?: number;
  doubleTrioLegs?: number[];
  doubleTrioDividend?: number;
  tripleTrioLegs?: number[];
  tripleTrioDividend?: number;
}

// ---- Bet types ----
export type BetTypeId =
  | "win"
  | "place"
  | "quinella"
  | "qpl"
  | "trio"
  | "tierce"
  | "first4"
  | "doubleTrio"
  | "tripleTrio";

/** One race's horse picks. bankers must all appear in the result combo; legs are interchangeable. */
export interface RaceLeg {
  raceNumber: number;
  bankers: number[];
  legs: number[];
}

/** A complete bet slip for one bet type. Single-race bets use raceLegs[0]. */
export interface BetSelection {
  type: BetTypeId;
  raceLegs: RaceLeg[];
}

/** Finish order + cover status for one leg race, shown whether the bet hit or missed. */
export interface LegResult {
  raceNumber: number;
  /** finishers shown for context, ascending position (incl dead-heats). */
  finishers: { position: number; horseNumber: number; horseName: string; horseCode: string }[];
  /** did this leg race cover a winning combo from the selection? */
  covered: boolean;
}

/** Why a bet hit or missed; `detail` is the English rendering of this. */
export type SettleDetail =
  | { code: "invalid" }
  | { code: "noResult"; race: number }
  | { code: "missNoneInTop"; horses: number[]; depth: number }
  | { code: "hitPlaced"; horses: number[]; depth: number }
  | { code: "missNoPair"; top3: number[] }
  | { code: "hitPairs"; pairs: number }
  | { code: "missRace"; race: number }
  | { code: "hitLegs"; legs: { race: number; bankers: number[] }[]; deadHeat: number };

export interface SettleResult {
  hit: boolean;
  /** number of winning combinations the selection covered (>=1 on a hit). */
  combosWon: number;
  /** total combinations bet (cost basis). */
  combos: number;
  cost: number;
  /** payout in HKD for $10 unit stake; null when the bet hit but the dividend is missing from data. */
  payout: number | null;
  /** net = payout - cost; null when payout unknown. */
  net: number | null;
  /** human-readable explanation (which combo won / why it missed), English. */
  detail: string;
  /** the same explanation as data, so the client can render it in any language. */
  detailInfo: SettleDetail;
  /** per leg-race finish order + cover status (always populated). */
  legResults: LegResult[];
  /** the pool's actual winning dividend (what a correct $10 bet paid), shown
   *  whether the user hit or missed. null for multi-value pools (place/qpl) — see text. */
  poolDividend: number | null;
  /** display string of the pool dividend, e.g. "$1,653" or "$45.5 / $33.5 / $18.5". */
  poolDividendText: string;
}

// ---- API DTOs ----
export interface MeetingRef {
  date: string; // YYYYMMDD
  venue: Venue;
  /** race numbers that have a saved card. */
  races: number[];
  /** true when a results file exists for this meeting (settlement possible). */
  hasResults: boolean;
}
export interface MeetingDetail {
  date: string;
  venue: Venue;
  races: number[];
  hasResults: boolean;
  /** all designated Double Trio pools (each a pair of race numbers). */
  doubleTrioPools: number[][];
  /** all designated Triple Trio pools (each a triple of race numbers). */
  tripleTrioPools: number[][];
}
export interface SettleRequest {
  date: string;
  venue: Venue;
  selection: BetSelection;
}

/** A persisted, already-settled bet. */
export interface HistoryEntry {
  id: string;
  ts: string; // ISO timestamp placed
  date: string; // meeting date YYYYMMDD
  venue: Venue;
  betType: BetTypeId;
  betLabel: string; // "Trio", "Double Trio", ...
  picks: string; // human-readable selection, e.g. "R11 膽6 腳2,4,7,5,10"
  result: string; // first 4 of the race(s), e.g. "5-2-6-7" or "R2:12-1-2-7  R3:2-5-8-6"
  combos: number;
  cost: number;
  hit: boolean;
  payout: number | null;
  net: number | null;
  /** the pool's winning dividend (what a correct bet paid), shown even on a miss. */
  poolDividendText: string;
}
