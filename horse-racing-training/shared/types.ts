// Shared types imported by BOTH the Express server and the React client.
// Mirrors the on-disk shapes in ../../data/racecards and ../../data/historical.

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
  name: string;
}
export interface CardTrainer {
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
}
export interface RaceResult {
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
  /** human-readable explanation (which combo won / why it missed). */
  detail: string;
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
  /** designated multi-race pools, when results expose them. */
  doubleTrioLegs?: number[];
  tripleTrioLegs?: number[];
}
export interface SettleRequest {
  date: string;
  venue: Venue;
  selection: BetSelection;
}
