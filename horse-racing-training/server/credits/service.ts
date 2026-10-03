// Wires credits / LIVE / Stripe together. One lazily-built instance for the server; tests call
// createCredits() with in-memory DBs, fake race data and a fake Stripe client.
import Stripe from "stripe";
import type { DB } from "../momentum/db";
import type { MembersDB } from "../members/db";
import type { RaceResult, Venue } from "../../shared/types";
import { nowMs } from "../clock";
import { liveEnabled, loadCreditsConfig, type CreditsConfig } from "./config";
import type { CardRunner } from "./grade";
import { ledger } from "./ledger";
import { liveBets } from "./liveBets";
import { meetingStatus, scheduleStore } from "./schedule";
import { settlement } from "./settlement";
import { purchases, type StripeClient } from "./stripe";

/** Race data readers (dates YYYYMMDD). */
export interface RaceData {
  races(date: string, venue: Venue): number[] | null;
  results(date: string, venue: Venue): RaceResult[] | null;
  card(date: string, venue: Venue, raceNo: number): CardRunner[] | null;
}

const isoDate = (d: string) => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;

export function createCredits(opts: {
  cfg: CreditsConfig;
  membersDb: MembersDB;
  raceDb: DB;
  data: RaceData;
  stripe?: StripeClient | null;
  clock?: () => number;
  realNow?: () => number;
  log?: (line: string) => void;
}) {
  const { cfg, data } = opts;
  const clock = opts.clock ?? nowMs;
  const schedule = scheduleStore(opts.raceDb, clock);
  const led = ledger(opts.membersDb, clock);
  const stripe = opts.stripe === undefined ? (cfg.stripe.secretKey ? (new Stripe(cfg.stripe.secretKey) as unknown as StripeClient) : null) : opts.stripe;

  /** Status of a meeting whose race numbers are already known. */
  const statusFor = (date: string, venue: Venue, races: number[]) =>
    meetingStatus(schedule, isoDate(date), venue, races, data.results(date, venue), clock(), liveEnabled(cfg));
  /** Every race's status for one meeting (null when it has no racecards). */
  const meetingInfo = (date: string, venue: Venue) => {
    const races = data.races(date, venue);
    return races ? { races, status: statusFor(date, venue, races) } : null;
  };

  const live = liveBets({
    db: opts.membersDb,
    ledger: led,
    cfg,
    clock,
    meeting: (date, venue) => {
      const m = meetingInfo(date, venue);
      return m ? { raceNos: m.races, status: m.status, card: (n) => data.card(date, venue, n) } : null;
    },
  });
  const settle = settlement({ db: opts.membersDb, ledger: led, schedule, clock, results: data.results, card: data.card, log: opts.log });
  const buy = purchases({ db: opts.membersDb, ledger: led, cfg, stripe, realNow: opts.realNow, log: opts.log });

  return { cfg, db: opts.membersDb, clock, schedule, ledger: led, live, settle, purchases: buy, meetingInfo, statusFor, liveOn: () => liveEnabled(cfg) };
}
export type Credits = ReturnType<typeof createCredits>;

let inst: Credits | null = null;

/** The server's instance (members DB + race DB from their own singletons). */
export function credits(build?: () => { membersDb: MembersDB; raceDb: DB; data: RaceData }): Credits {
  if (!inst) {
    if (!build) throw new Error("credits() not initialised");
    inst = createCredits({ cfg: loadCreditsConfig(), ...build() });
  }
  return inst;
}
