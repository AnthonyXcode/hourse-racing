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
  /** Runs before this race, newest first (the racecard keeps up to 10). */
  pastPerformances?: PastPerformance[];
}
export interface PastPerformance {
  /** ISO timestamp, e.g. "2026-09-06T00:00:00.000Z" */
  date: string;
  /** "Sha Tin" | "Happy Valley" */
  venue: string;
  raceNumber: number;
  raceClass: string;
  distance: number;
  surface?: string;
  going?: string;
  draw?: number;
  weight?: number;
  jockeyCode?: string;
  finishPosition: number;
  fieldSize?: number;
  finishTime?: number;
  odds?: number;
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
  /**
   * Every runner with its HKJC place code (results ingest from 2026-10). Unlike finishOrder it keeps
   * non-finishers and withdrawn horses. Missing on older stored results.
   */
  runners?: RunnerStatus[];
}
export interface RunnerStatus {
  horseNumber: number;
  /** HKJC "Pla." text, e.g. "3", "3 DH", "PU", "WV-A". */
  place: string;
  /** finished: has a placing; nonFinisher: started, didn't finish (bets lose); withdrawn: refunded. */
  status: "finished" | "nonFinisher" | "withdrawn" | "unknown";
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
  | "tripleTrio"
  /** All Up (過關): 2–6 races, each leg with its own pool (docs/all-up/SPEC.md). */
  | "allUp";

/** Pools an All Up leg can use (SPEC §3). */
export type AllUpPool = "win" | "place" | "quinella" | "qpl" | "trio";
/** HKJC All Up formulas `N x M` (SPEC §2.1); the table lives in shared/betEngine/allUp.ts. */
export type AllUpFormula =
  | "2x1" | "2x3"
  | "3x1" | "3x3" | "3x4" | "3x6" | "3x7"
  | "4x1" | "4x4" | "4x5" | "4x6" | "4x10" | "4x11" | "4x14" | "4x15"
  | "5x1" | "5x5" | "5x6" | "5x10" | "5x15" | "5x16" | "5x20" | "5x25" | "5x26" | "5x30" | "5x31"
  | "6x1" | "6x6" | "6x7" | "6x15" | "6x20" | "6x21" | "6x22" | "6x35" | "6x41" | "6x42" | "6x50" | "6x56" | "6x57" | "6x62" | "6x63";

/** One race's horse picks. bankers must all appear in the result combo; legs are interchangeable. */
export interface RaceLeg {
  raceNumber: number;
  bankers: number[];
  legs: number[];
  /** All Up only: this leg's pool. Required when BetSelection.type === "allUp". */
  pool?: AllUpPool;
}

/** A complete bet slip for one bet type. Single-race bets use raceLegs[0]. */
export interface BetSelection {
  type: BetTypeId;
  /** All Up: 2–6 legs, sorted by raceNumber (the server sorts them). */
  raceLegs: RaceLeg[];
  /** All Up only, e.g. "3x7". */
  formula?: AllUpFormula;
}

/** One All Up leg as settled (SPEC §5–6). */
export interface AllUpLegOutcome {
  raceNumber: number;
  pool: AllUpPool;
  /** n_i: this leg's combinations as placed. */
  combos: number;
  /** combinations that won in this leg. */
  winningCombos: number;
  /** combinations refunded (scratched / void race) and carried forward ×1. */
  refundedCombos: number;
  /** W_i: the leg's total per-$10 dividend over its winning combinations (0 on a miss). */
  dividend: number;
  /** F_i = W_i / 10 + refundedCombos: the leg's return per $1 on each of its combinations. */
  factor: number;
  /** the pool's dividend(s) for this race, e.g. "$45.5" or "$31.5 / $28 / $40.5", or "VOID". */
  dividendText: string;
  /** void = the race was void/abandoned (whole leg refunded); refund = scratchings left no live combination. */
  status: "won" | "lost" | "refund" | "void" | "hold";
}
export interface AllUpBreakdown {
  formula: AllUpFormula;
  /** $ per line the result is computed at (All Up results are NOT scaled by the client). */
  unit: number;
  /** total lines (= combos). */
  lines: number;
  legs: AllUpLegOutcome[];
  /** lines with a return that are not fully refunded (at least one winning leg, the rest won or refunded). */
  linesWon: number;
  /** lines whose every leg was refunded. */
  linesRefunded: number;
  /** total return before splitting off the refund, rounded (practice: nearest $0.50; LIVE: floor). null on hold. */
  gross: number | null;
  /** money returned from fully refunded lines (= linesRefunded × unit). */
  refund: number;
  status: "won" | "lost" | "void" | "hold";
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
  | { code: "hitLegs"; legs: { race: number; bankers: number[] }[]; deadHeat: number }
  | { code: "allUpHit"; formula: string; linesWon: number; lines: number }
  /** first leg (race order) with no winning combination. */
  | { code: "allUpMiss"; formula: string; race: number }
  | { code: "allUpVoid" }
  /** a leg needs an operator / a dividend that isn't stored (dead heat, missing dividend, runner of unknown fate). */
  | { code: "allUpHold"; formula: string; races: number[] };

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
  /** All Up only: per-leg breakdown. For All Up, combos = lines, cost = lines × unit, payout = return − refund
   *  (net = payout + allUp.refund − cost), all already at allUp.unit. */
  allUp?: AllUpBreakdown;
}

// ---- API DTOs ----
export interface MeetingRef {
  date: string; // YYYYMMDD
  venue: Venue;
  /** race numbers that have a saved card. */
  races: number[];
  /** practice: every race settled/void; live: a race open for LIVE; closed: neither (awaiting results / unavailable). */
  mode?: MeetingMode;
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
  /** All Up only: $ per line (integer ≥ 10, default 10). The ticket total is rounded at this unit. */
  unit?: number;
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
  /** Missing = practice. LIVE rows come from the server's live_bets, never from the client. */
  mode?: "practice" | "live";
  /** LIVE only. */
  status?: LiveBetStatus;
  /** LIVE only: credits returned for scratchings / void races. */
  refund?: number;
  /** All Up only: per-leg breakdown for My bets / History (DESIGN-SPEC §6.2). Missing on old rows: hide the expander. */
  allUp?: HistoryAllUp;
}

/** All Up summary kept with a History row (practice: from SettleResult.allUp at save time; LIVE: from the server). */
export interface HistoryAllUp {
  formula: AllUpFormula;
  lines: number;
  /** null while a LIVE bet is pending. */
  linesWon: number | null;
  refund: number;
  legs: {
    raceNumber: number;
    pool: AllUpPool;
    /** e.g. "腳 2,8" or "膽 1  腳 4,9" (without the race / pool prefix). */
    picks: string;
    /** first 4 home, e.g. "5-2-8-1"; null before the race is resulted (or void). */
    result: string | null;
    dividendText: string | null;
    factor: number | null;
    status: "won" | "lost" | "refund" | "void" | "hold" | "toRun";
    /** combinations refunded by scratchings and carried forward ×1 (not set for a void race). */
    carried?: number;
  }[];
}

// ---- Credits / LIVE (docs/credits/PRD.md §6) ----
/** Per-race status, computed by the server (§2.3). */
export type RaceStatus = "open" | "closed" | "settled" | "void" | "unavailable";
export type MeetingMode = "practice" | "live" | "closed";
export interface RaceInfo {
  raceNumber: number;
  /** ISO with +08:00, or null when unknown. */
  postTime: string | null;
  status: RaceStatus;
  /** Seconds until betting closes (open races only). */
  closesInSec: number | null;
}
/** Extra fields on MeetingRef / MeetingDetail. */
export interface MeetingLiveInfo {
  mode: MeetingMode;
  raceInfo: RaceInfo[];
  /** Designated DT/TT legs known before results (LIVE only offers these). */
  liveDoubleTrioPools: number[][];
  liveTripleTrioPools: number[][];
}

export type LiveBetStatus = "pending" | "won" | "lost" | "void";
export interface LiveBet {
  id: string;
  date: string; // YYYYMMDD
  venue: Venue;
  betType: BetTypeId;
  betLabel: string;
  selection: BetSelection;
  picks: string;
  unit: number;
  combos: number;
  stake: number;
  status: LiveBetStatus;
  refund: number;
  payout: number;
  result: SettleResult | null;
  placedAt: string;
  settledAt: string | null;
  /** Earliest post time of its races. */
  firstPostTime: string | null;
  held: boolean;
}
export type LedgerKind = "signup_bonus" | "purchase" | "bet_stake" | "bet_payout" | "bet_refund" | "purchase_reversal" | "admin_adjust";
export interface LedgerRow {
  id: number;
  kind: LedgerKind;
  amount: number;
  balanceAfter: number;
  /** e.g. { type: "bet", id, label: "20261005 ST R3 Trio" } or { type: "purchase", planId }. */
  ref: { type: string; id: string | null; label?: string; planId?: string; date?: string; venue?: string; races?: number[]; betType?: string };
  createdAt: string;
}
export interface CreditsSummary {
  balance: number;
  flagged: boolean;
  pending: { count: number; stake: number };
  ledger: LedgerRow[];
  nextCursor: number | null;
  /** Show the welcome dialog (once per member). */
  welcome: boolean;
  /** LIVE bets settled since the member last saw them. */
  unseenSettled: { count: number; net: number };
  purchasedTodayHkd: number;
  dailyCapHkd: number;
}

// ---- Membership (docs/membership/PRD.md §7) ----
export type MemberLocale = "zh-HK" | "en";

/** The logged-in member, as the API returns it. Only ever sent to its owner. */
export interface Member {
  id: string;
  /** E.164, "+85291234567" */
  phone: string;
  displayName: string;
  description: string | null;
  telegram: string | null;
  /** E.164 */
  whatsapp: string | null;
  email: string | null;
  avatarUrl: string | null;
  createdAt: string;
  /** 5★ pick SMS alerts (opt-in, off by default). */
  alerts5Star?: boolean;
  /** Shown on the public leaderboard (opt-in, off by default). */
  showOnLeaderboard?: boolean;
  /** Opaque id of this member's public profile (only ever sent to the member themself). */
  publicId?: string | null;
  /** 18+ self-declaration (credits), or null. */
  adultDeclaredAt?: string | null;
  /** Staff only (admin panel): absent for normal members. The owner comes from OWNER_PHONE. */
  role?: "admin" | "owner";
}

/** Error codes the API returns as `{ error: { code, … } }`; the client localises them. */
export type ApiErrorCode =
  | "invalid_phone"
  | "turnstile_failed"
  | "rate_limited"
  | "otp_send_failed"
  | "invalid_code"
  | "code_expired"
  | "too_many_attempts"
  | "unauthorized"
  | "validation_error"
  | "unsupported_type"
  | "file_too_large"
  | "confirm_required"
  | "invalid_entry"
  | "bad_origin"
  | "unsupported_media_type"
  | "bad_request"
  | "not_found"
  | "server_error"
  /** All Up: a TRI leg in a bet with more than 3 legs. */
  | "all_up_too_many_legs"
  /** All Up: missing / unknown formula, or one that doesn't match the leg count. */
  | "all_up_bad_formula"
  /** All Up: two legs on the same race. */
  | "all_up_duplicate_race"
  | "invalid_selection";

export interface ApiErrorBody {
  error: { code: ApiErrorCode | string; field?: string; /** field-specific code for validation_error, e.g. "invalid_email" */ detail?: string; retryAfter?: number; attemptsLeft?: number };
}

export interface PublicConfig {
  turnstileSiteKey: string;
  otp: { length: number; resendSeconds: number };
  features: { liveBetting: boolean; purchases: boolean };
  credits: { signupBonus: number; minUnit: number; termsVersion: string; dailyCapHkd: number };
}

// ---- Home page (docs: coordinator spec, 2026-10-04) ----
/** GET /api/home/summary: the model's last-3-months figures (numbers only, rounded to 0.1). */
export interface HomeSummary {
  /** Requested range, YYYY-MM-DD (HK). */
  from: string;
  to: string;
  /** First / last settled race actually in the range (null when none). */
  firstRace: string | null;
  lastRace: string | null;
  races: number;
  meetings: number;
  /** Model top 3 picks, per race: win = the winner was one of them; place = at least one of them finished top 3. */
  top3Races: number;
  top3WinHits: number;
  top3Win: number | null;
  top3PlaceHits: number;
  top3Place: number | null;
  /** Racing days (YYYY-MM-DD) with settled races in the range, newest first: the Records picker. */
  days: string[];
  /** 5★ races (top pick meets every venue strategy rule): their top pick's place hit rate. */
  fiveStarRaces: number;
  fiveStarPlaceHits: number;
  fiveStarPlace: number | null;
  /** ROI % of a place bet on that top pick in every 5★ race (null = none). */
  fiveStarRoi: number | null;
  /** Trio "Banker #1 + 2–L" (TRIO_STRATS key). */
  trio: { key: string; bankers: number; last: number; races: number; hits: number; hit: number | null; combos: number | null; roi: number | null };
  generatedAt: string;
}

/** Home "Records": one racing day's settled races with the model's top 3 picks vs the actual top 3. */
export interface HomeRecordHorse {
  num: number;
  name: string;
  /** HKJC horse code for the Chinese name lookup (null if the card is missing). */
  code: string | null;
}
export interface HomeRecordRace {
  venue: "ST" | "HV";
  raceNo: number;
  /** Model picks #1–#3 with their finishing position (null = didn't finish). */
  picks: (HomeRecordHorse & { rank: number; fin: number | null; won: boolean; placed: boolean })[];
  /** Actual 1st–3rd (more on a dead heat); picked = one of the model's top 3. */
  top3: (HomeRecordHorse & { pos: number; picked: boolean })[];
  /** Winner among the top 3 picks / at least one of them placed. */
  win: boolean;
  place: boolean;
}
export interface HomeRecordDay {
  date: string;
  races: HomeRecordRace[];
  winHits: number;
  placeHits: number;
}
/** Home "See details": the model's top 3 picks meeting by meeting over [from, to]. */
export interface HomeMeetingRow {
  date: string;
  venue: "ST" | "HV";
  /** Settled races in race order: win = winner among the top 3 picks, place = at least one of them top 3. */
  races: { raceNo: number; win: boolean; place: boolean }[];
  winHits: number;
  placeHits: number;
}
export interface HomeMeetings {
  from: string;
  to: string;
  /** Newest first. */
  meetings: HomeMeetingRow[];
  races: number;
  winHits: number;
  placeHits: number;
}

/** Member profile period. */
export type LeaderboardRange = "30d" | "all";
export interface LeaderboardStats {
  /** Settled LIVE bets (won / lost). */
  bets: number;
  hits: number;
  /** % of settled bets that won. */
  hitRate: number;
  /** Credits staked (after scratch refunds) and returned. */
  staked: number;
  returned: number;
  net: number;
  /** net / staked, %. */
  roi: number;
}
export interface LeaderboardRow extends LeaderboardStats {
  rank: number;
  /** Opaque public id (never the internal user id). */
  publicId: string;
  displayName: string;
  avatarUrl: string | null;
  /** Strategy bot key (rows that fill a board below 5 members): no profile, the client localises the name. */
  bot?: string;
}
export interface LeaderboardBoard {
  /** Bets needed to appear on this board. */
  minBets: number;
  rows: LeaderboardRow[];
}
/** Home "Member performance": two boards, the last racing day and the last 30 days. */
export interface LeaderboardResponse {
  /** Most recent racing day (YYYY-MM-DD) with settled races (else with settled live bets), or null. */
  lastDay: LeaderboardBoard & { date: string | null };
  /** First day (YYYY-MM-DD) of the 30-day window, inclusive. */
  last30: LeaderboardBoard & { from: string };
}
export interface LeaderboardProfile extends LeaderboardStats {
  publicId: string;
  displayName: string;
  avatarUrl: string | null;
  /** YYYY-MM */
  memberSince: string;
  pools: { pool: string; bets: number; hits: number }[];
  recent: { date: string; venue: string; races: number[]; pool: string; picks: string; stake: number; payout: number; result: "won" | "lost" }[];
}

/** A horse on a bot's page: number plus the saved racecard's name and HKJC code (null when not saved). */
export interface BotHorse {
  num: number;
  name: string | null;
  code: string | null;
}
export interface BotProfileBet {
  /** YYYY-MM-DD */
  date: string;
  venue: string;
  raceNo: number;
  pool: "WIN" | "PLACE" | "TRIO";
  /** Every horse backed (bankers first). */
  selection: BotHorse[];
  /** Horse numbers: Trio bankers (empty otherwise) and legs. */
  bankers: number[];
  legs: number[];
  combos: number;
  stake: number;
  returned: number;
  status: "won" | "lost";
  /** The actual first three (more on a dead heat). */
  top3: (BotHorse & { pos: number })[];
}
export type BotRange = "day" | "30d";
/** GET /api/leaderboard/bot-<alias>: the bot's board numbers for the window and every bet behind them. */
export interface BotProfile extends LeaderboardStats {
  /** Public alias only; the strategy behind it is described by the client. */
  alias: string;
  /** Race dates covered, YYYY-MM-DD inclusive. */
  from: string;
  to: string;
  /** Every bet behind the numbers, newest first (`bets` is already the count, as on the board). */
  records: BotProfileBet[];
}
