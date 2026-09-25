// One fetch run: decide which meetings need results / racecards, scrape them, store them.
// Planning is pure (tested with fakes); scraping goes through injected sessions (see ./parent.ts).
import type { RaceStore, Venue, MeetingKey, CardDoc } from "./raceStore";
import type { RunLog } from "./runLog";
import type { Trigger } from "./scheduler";

const DAY = 86_400_000;
const HKT_MS = 8 * 3_600_000;

/** A local (ST/HV) meeting HKJC currently lists, with post times when known. */
export interface UpcomingMeeting extends MeetingKey {
  races: { raceNo: number; postTime: string | null }[];
}
export interface Fixtures {
  lastUpdated?: string;
  season?: string;
  meetings: MeetingKey[];
}
export interface FetchOptions {
  resultsOnly?: boolean;
  cardsOnly?: boolean;
  /** Only this meeting (results and/or cards, whichever it needs). */
  only?: MeetingKey;
  /** Plan only; no scraping, no writes (and no discovery call unless `discover`). */
  dryRun?: boolean;
  discover?: boolean;
  /** Oldest results date to consider (default: today − lookbackDays). */
  since?: string;
  lookbackDays?: number;
  /** Racecards for meetings from today to today + aheadDays. */
  aheadDays?: number;
}

/** HK calendar date (YYYY-MM-DD) of `now` shifted by `days`. */
export const hkDay = (now: Date, days = 0) => new Date(now.getTime() + HKT_MS + days * DAY).toISOString().slice(0, 10);
const keyOf = (m: MeetingKey) => `${m.date}_${m.venue}`;

// ---------------------------------------------------------------- planning

type ResultLike = { raceNumber?: number; finishOrder?: unknown[]; winDividend?: number | null };

/** A meeting's results are incomplete if races are missing vs its racecards, or any race lacks a finish or win dividend. */
export function resultsIncomplete(races: ResultLike[], cardCount: number): boolean {
  return races.length < cardCount || races.some((r) => !r.finishOrder?.length || r.winDividend == null);
}

export interface ResultsPlanItem extends MeetingKey {
  reason: "missing" | "incomplete" | "requested";
}

export function planResults(store: Pick<RaceStore, "meetings" | "results">, fixtures: Fixtures | null, upcoming: UpcomingMeeting[], now: Date, opts: FetchOptions = {}): ResultsPlanItem[] {
  const today = hkDay(now);
  const yesterday = hkDay(now, -1);
  const from = opts.since ?? hkDay(now, -(opts.lookbackDays ?? 14));
  const cards = new Map(store.meetings().map((m) => [keyOf(m), m.races.length]));
  const firstPost = new Map(upcoming.map((m) => [keyOf(m), m.races.map((r) => r.postTime).filter((t): t is string => !!t).sort()[0] ?? null]));

  if (opts.only) return [{ ...opts.only, reason: "requested" }];

  const cands = new Map<string, MeetingKey>();
  for (const m of [...(fixtures?.meetings ?? []), ...store.meetings(), ...upcoming]) {
    if (m.venue !== "ST" && m.venue !== "HV") continue;
    if (m.date < from || m.date > today) continue;
    cands.set(keyOf(m), { date: m.date, venue: m.venue });
  }
  const plan: ResultsPlanItem[] = [];
  for (const m of cands.values()) {
    // Today's meeting before its first race: nothing to scrape yet.
    const first = firstPost.get(keyOf(m));
    if (m.date === today && first && now.getTime() < Date.parse(first)) continue;
    const res = store.results<ResultLike>(m);
    if (!res) plan.push({ ...m, reason: "missing" });
    else if (m.date >= yesterday && resultsIncomplete(res, cards.get(keyOf(m)) ?? 0)) plan.push({ ...m, reason: "incomplete" });
  }
  return plan.sort((a, b) => a.date.localeCompare(b.date) || a.venue.localeCompare(b.venue));
}

export interface CardsPlanItem extends MeetingKey {
  /** Race numbers to (re)scrape; null = unknown, probe 1, 2, … until a race has no runners. */
  races: number[] | null;
}

/** Upcoming meetings (today … today + aheadDays): every race that hasn't started yet. */
export function planCards(fixtures: Fixtures | null, upcoming: UpcomingMeeting[], now: Date, opts: FetchOptions = {}): CardsPlanItem[] {
  const today = hkDay(now);
  const until = hkDay(now, opts.aheadDays ?? 2);
  const byKey = new Map(upcoming.map((m) => [keyOf(m), m]));
  const notStarted = (m: UpcomingMeeting) => m.races.filter((r) => !r.postTime || now.getTime() < Date.parse(r.postTime)).map((r) => r.raceNo);

  if (opts.only) {
    const up = byKey.get(keyOf(opts.only));
    return [{ ...opts.only, races: up ? notStarted(up) : null }];
  }
  const plan: CardsPlanItem[] = [];
  const seen = new Set<string>();
  for (const m of upcoming) {
    if (m.date < today || m.date > until) continue;
    const races = notStarted(m);
    if (races.length) plan.push({ date: m.date, venue: m.venue, races });
    seen.add(keyOf(m));
  }
  // Fixture meetings HKJC doesn't list (yet): race count unknown, so probe. Not today — without
  // post times we can't tell which races have already started.
  for (const m of fixtures?.meetings ?? []) {
    if (seen.has(keyOf(m)) || m.date <= today || m.date > until) continue;
    plan.push({ date: m.date, venue: m.venue, races: null });
  }
  return plan.sort((a, b) => a.date.localeCompare(b.date) || a.venue.localeCompare(b.venue));
}

/** Fixture list with any newly seen local meetings added (null when nothing changed). */
export function mergeFixtures(fixtures: Fixtures | null, upcoming: UpcomingMeeting[], now: Date): Fixtures | null {
  const base: Fixtures = fixtures ?? { meetings: [] };
  const have = new Set(base.meetings.map(keyOf));
  const add = upcoming.filter((m) => !have.has(keyOf(m))).map((m) => ({ date: m.date, venue: m.venue }));
  if (!add.length) return null;
  return {
    ...base,
    lastUpdated: now.toISOString(),
    meetings: [...base.meetings, ...add].sort((a, b) => a.date.localeCompare(b.date) || a.venue.localeCompare(b.venue)),
  };
}

// ---------------------------------------------------------------- running

export interface ResultsSession {
  /** Scrape a meeting's results. `venue` may differ when HKJC ran it at the other course. */
  scrape(m: MeetingKey): Promise<{ venue: Venue; races: unknown[]; note?: string }>;
  close(): Promise<void>;
}
export interface CardsSession {
  /** Scrape + enrich one race; null when the race has no runners (doesn't exist). */
  scrapeRace(m: MeetingKey, raceNo: number): Promise<CardDoc | null>;
  close(): Promise<void>;
}
export interface FetchDeps {
  store: RaceStore;
  runLog: RunLog;
  discover(): Promise<UpcomingMeeting[]>;
  openResults(): Promise<ResultsSession>;
  openCards(): Promise<CardsSession>;
  now?: () => Date;
  log?: (msg: string) => void;
}

export interface FetchSummary {
  discovered: MeetingKey[];
  discoverError?: string;
  fixturesAdded: number;
  plan: { results: ResultsPlanItem[]; cards: CardsPlanItem[] };
  results: { meeting: string; races: number; changed: boolean; note?: string }[];
  cards: { meeting: string; saved: number; changed: number; empty: number[] }[];
  failures: { what: string; error: string }[];
}

const MAX_PROBE = 14;

export async function runFetch(deps: FetchDeps, trigger: Trigger, opts: FetchOptions = {}): Promise<FetchSummary> {
  const now = deps.now ?? (() => new Date());
  const log = deps.log ?? ((m) => console.log(`[data] ${m}`));
  const { store } = deps;
  const id = opts.dryRun ? null : deps.runLog.start(trigger);
  const sum: FetchSummary = { discovered: [], fixturesAdded: 0, plan: { results: [], cards: [] }, results: [], cards: [], failures: [] };
  const fail = (what: string, e: unknown) => {
    const error = e instanceof Error ? e.message : String(e);
    sum.failures.push({ what, error });
    log(`${what} failed: ${error}`);
  };

  try {
    let upcoming: UpcomingMeeting[] = [];
    if (!opts.dryRun || opts.discover) {
      try {
        upcoming = await deps.discover();
        sum.discovered = upcoming.map((m) => ({ date: m.date, venue: m.venue }));
      } catch (e) {
        sum.discoverError = e instanceof Error ? e.message : String(e);
        log(`meeting discovery failed: ${sum.discoverError}`);
      }
    }
    let fixtures = store.doc<Fixtures>("fixtures");
    const merged = mergeFixtures(fixtures, upcoming, now());
    if (merged) {
      sum.fixturesAdded = merged.meetings.length - (fixtures?.meetings.length ?? 0);
      if (!opts.dryRun) store.putDoc("fixtures", merged);
      fixtures = merged;
    }
    sum.plan.results = opts.cardsOnly ? [] : planResults(store, fixtures, upcoming, now(), opts);
    sum.plan.cards = opts.resultsOnly ? [] : planCards(fixtures, upcoming, now(), opts);
    if (opts.dryRun) return sum;

    if (sum.plan.results.length) {
      const s = await deps.openResults();
      try {
        for (const m of sum.plan.results) {
          const label = `${m.date} ${m.venue}`;
          try {
            const got = await s.scrape(m);
            if (!got.races.length) {
              fail(`results ${label}`, "no results published");
              continue;
            }
            const changed = store.putResults({ date: m.date, venue: got.venue }, got.races, "scrape");
            sum.results.push({ meeting: `${m.date} ${got.venue}`, races: got.races.length, changed, note: got.note });
            log(`results ${m.date} ${got.venue}: ${got.races.length} races${changed ? " (updated)" : ""}${got.note ? ` · ${got.note}` : ""}`);
          } catch (e) {
            fail(`results ${label}`, e);
          }
        }
      } finally {
        await s.close().catch(() => {});
      }
    }

    if (sum.plan.cards.length) {
      const s = await deps.openCards();
      try {
        for (const m of sum.plan.cards) {
          const row = { meeting: `${m.date} ${m.venue}`, saved: 0, changed: 0, empty: [] as number[] };
          const races = m.races ?? Array.from({ length: MAX_PROBE }, (_, i) => i + 1);
          for (const raceNo of races) {
            try {
              const doc = await s.scrapeRace(m, raceNo);
              if (!doc) {
                row.empty.push(raceNo);
                if (m.races === null) break; // probing: first race without runners ends the card
                continue;
              }
              row.saved++;
              if (store.putCard({ date: m.date, venue: m.venue, raceNo }, doc, "scrape")) row.changed++;
            } catch (e) {
              fail(`card ${m.date} ${m.venue} R${raceNo}`, e);
            }
          }
          sum.cards.push(row);
          log(`cards ${row.meeting}: ${row.saved} saved, ${row.changed} changed`);
        }
      } finally {
        await s.close().catch(() => {});
      }
    }
    deps.runLog.finish(id!, sum.failures.length === 0, sum);
    return sum;
  } catch (e) {
    if (id !== null) deps.runLog.finish(id, false, sum, e instanceof Error ? e.message : String(e));
    throw e;
  }
}
