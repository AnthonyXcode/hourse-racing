// One fetch run (a 5-minute tick, see ./scheduler.ts): decide what needs results / racecards / odds,
// scrape it, store it. Planning is pure (tested with fakes); scraping goes through injected sessions
// (see ./parent.ts). Heavy scrapes are rationed with per-item attempt times (the "fetchAttempts" doc):
//   results  — race day: as soon as a race is RESULT_DELAY past post time without a complete result;
//              otherwise (missing / yesterday incomplete) at most every RETRY_MS
//   racecards — new races at once; races already saved re-scraped every CARD_REFRESH_MS
//   odds     — every tick, a cheap GraphQL call per saved race that hasn't started
import type { RaceStore, Venue, MeetingKey, CardDoc } from "./raceStore";
import type { RunLog } from "./runLog";
import type { Trigger } from "./scheduler";

const DAY = 86_400_000;
const HKT_MS = 8 * 3_600_000;
const MIN = 60_000;
/** A race's result is expected this long after its post time. */
export const RESULT_DELAY_MS = 5 * MIN;
/** Full re-scrape of an already-saved racecard (scratchings, jockey changes). */
export const CARD_REFRESH_MS = 60 * MIN;
/** Retry for results outside the race-day rule, and for probing unlisted fixtures. */
export const RETRY_MS = 60 * MIN;

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
  /** Racecards for meetings from today to today + aheadDays (default 3: HKJC posts cards ~3 days ahead). */
  aheadDays?: number;
}

/** HK calendar date (YYYY-MM-DD) of `now` shifted by `days`. */
export const hkDay = (now: Date, days = 0) => new Date(now.getTime() + HKT_MS + days * DAY).toISOString().slice(0, 10);
const keyOf = (m: MeetingKey) => `${m.date}_${m.venue}`;

/** Last attempt time (ISO) per item: "results:<date>_<venue>", "card:<date>_<venue>_<raceNo>", "probe:<date>_<venue>". */
export type Attempts = Record<string, string>;
export const ATTEMPTS_DOC = "fetchAttempts";
export const attemptKey = {
  results: (m: MeetingKey) => `results:${keyOf(m)}`,
  card: (m: MeetingKey, raceNo: number) => `card:${keyOf(m)}_${raceNo}`,
  probe: (m: MeetingKey) => `probe:${keyOf(m)}`,
};
/** Never attempted, or the last attempt is at least `ms` old. */
const dueAfter = (attempts: Attempts, key: string, now: Date, ms: number) => {
  const t = attempts[key];
  return !t || now.getTime() - Date.parse(t) >= ms;
};

// ---------------------------------------------------------------- planning

type ResultLike = { raceNumber?: number; finishOrder?: unknown[]; winDividend?: number | null };

/** A meeting's results are incomplete if races are missing vs its racecards, or any race lacks a finish or win dividend. */
export function resultsIncomplete(races: ResultLike[], cardCount: number): boolean {
  return races.length < cardCount || races.some((r) => !r.finishOrder?.length || r.winDividend == null);
}

export interface ResultsPlanItem extends MeetingKey {
  reason: "missing" | "incomplete" | "requested";
}

export function planResults(
  store: Pick<RaceStore, "meetings" | "results">,
  fixtures: Fixtures | null,
  upcoming: UpcomingMeeting[],
  now: Date,
  opts: FetchOptions = {},
  attempts: Attempts = {}
): ResultsPlanItem[] {
  const today = hkDay(now);
  const yesterday = hkDay(now, -1);
  const from = opts.since ?? hkDay(now, -(opts.lookbackDays ?? 14));
  const cards = new Map(store.meetings().map((m) => [keyOf(m), m.races.length]));
  const posts = new Map(upcoming.map((m) => [keyOf(m), m.races.filter((r): r is { raceNo: number; postTime: string } => !!r.postTime)]));

  if (opts.only) return [{ ...opts.only, reason: "requested" }];

  const cands = new Map<string, MeetingKey>();
  for (const m of [...(fixtures?.meetings ?? []), ...store.meetings(), ...upcoming]) {
    if (m.venue !== "ST" && m.venue !== "HV") continue;
    if (m.date < from || m.date > today) continue;
    cands.set(keyOf(m), { date: m.date, venue: m.venue });
  }
  const plan: ResultsPlanItem[] = [];
  for (const m of cands.values()) {
    const res = store.results<ResultLike>(m);
    const racePosts = m.date === today ? (posts.get(keyOf(m)) ?? []) : [];
    if (racePosts.length) {
      // Race day: fetch once a race is RESULT_DELAY past its post time without a complete result.
      const done = new Set((res ?? []).filter((r) => r.finishOrder?.length && r.winDividend != null).map((r) => r.raceNumber));
      if (racePosts.some((r) => Date.parse(r.postTime) + RESULT_DELAY_MS <= now.getTime() && !done.has(r.raceNo)))
        plan.push({ ...m, reason: res ? "incomplete" : "missing" });
      continue;
    }
    if (!dueAfter(attempts, attemptKey.results(m), now, RETRY_MS)) continue;
    if (!res) plan.push({ ...m, reason: "missing" });
    else if (m.date >= yesterday && resultsIncomplete(res, cards.get(keyOf(m)) ?? 0)) plan.push({ ...m, reason: "incomplete" });
  }
  return plan.sort((a, b) => a.date.localeCompare(b.date) || a.venue.localeCompare(b.venue));
}

export interface CardsPlanItem extends MeetingKey {
  /** Race numbers to (re)scrape; null = unknown, probe 1, 2, … until a race has no runners. */
  races: number[] | null;
}

const notStartedAt = (m: UpcomingMeeting, now: Date) => m.races.filter((r) => !r.postTime || now.getTime() < Date.parse(r.postTime)).map((r) => r.raceNo);

/**
 * Full racecard scrapes for upcoming meetings (today … today + aheadDays), races not started yet:
 * races we don't have, plus saved ones last scraped CARD_REFRESH_MS ago.
 */
export function planCards(
  store: Pick<RaceStore, "meetings">,
  fixtures: Fixtures | null,
  upcoming: UpcomingMeeting[],
  now: Date,
  opts: FetchOptions = {},
  attempts: Attempts = {}
): CardsPlanItem[] {
  const today = hkDay(now);
  const until = hkDay(now, opts.aheadDays ?? 3);
  const byKey = new Map(upcoming.map((m) => [keyOf(m), m]));
  const notStarted = (m: UpcomingMeeting) => notStartedAt(m, now);
  const saved = new Map(store.meetings().map((m) => [keyOf(m), new Set(m.races)]));
  const needs = (m: MeetingKey, raceNo: number) => !saved.get(keyOf(m))?.has(raceNo) || dueAfter(attempts, attemptKey.card(m, raceNo), now, CARD_REFRESH_MS);

  if (opts.only) {
    const up = byKey.get(keyOf(opts.only));
    return [{ ...opts.only, races: up ? notStarted(up) : null }];
  }
  const plan: CardsPlanItem[] = [];
  const seen = new Set<string>();
  for (const m of upcoming) {
    if (m.date < today || m.date > until) continue;
    const races = notStarted(m).filter((n) => needs(m, n));
    if (races.length) plan.push({ date: m.date, venue: m.venue, races });
    seen.add(keyOf(m));
  }
  // Fixture meetings HKJC doesn't list (yet). Not today — without post times we can't tell which
  // races have already started. Saved races are refreshed like listed ones; with none saved the
  // race count is unknown, so probe (at most every RETRY_MS).
  for (const m of fixtures?.meetings ?? []) {
    if (seen.has(keyOf(m)) || m.date <= today || m.date > until) continue;
    const have = saved.get(keyOf(m));
    if (have?.size) {
      const races = [...have].filter((n) => needs(m, n)).sort((a, b) => a - b);
      if (races.length) plan.push({ date: m.date, venue: m.venue, races });
    } else if (dueAfter(attempts, attemptKey.probe(m), now, RETRY_MS)) plan.push({ date: m.date, venue: m.venue, races: null });
  }
  return plan.sort((a, b) => a.date.localeCompare(b.date) || a.venue.localeCompare(b.venue));
}

export interface OddsPlanItem extends MeetingKey {
  races: number[];
}

/** Win-odds refresh (cheap): HKJC-listed meetings in range, saved races not started and not being fully scraped. */
export function planOdds(store: Pick<RaceStore, "meetings">, upcoming: UpcomingMeeting[], cards: CardsPlanItem[], now: Date, opts: FetchOptions = {}): OddsPlanItem[] {
  const today = hkDay(now);
  const until = hkDay(now, opts.aheadDays ?? 3);
  const saved = new Map(store.meetings().map((m) => [keyOf(m), new Set(m.races)]));
  const scraping = new Map(cards.map((c) => [keyOf(c), c.races]));
  const plan: OddsPlanItem[] = [];
  for (const m of upcoming) {
    if (m.date < today || m.date > until || (opts.only && keyOf(opts.only) !== keyOf(m))) continue;
    const full = scraping.get(keyOf(m));
    if (full === null) continue; // probing the whole card
    const races = notStartedAt(m, now).filter((n) => saved.get(keyOf(m))?.has(n) && !full?.includes(n));
    if (races.length) plan.push({ date: m.date, venue: m.venue, races });
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
  /** Current win odds for a race, horse number → odds; empty when HKJC has none yet. */
  odds(m: MeetingKey, raceNo: number): Promise<Record<string, number>>;
  now?: () => Date;
  log?: (msg: string) => void;
}

export interface FetchSummary {
  discovered: MeetingKey[];
  discoverError?: string;
  fixturesAdded: number;
  plan: { results: ResultsPlanItem[]; cards: CardsPlanItem[]; odds: OddsPlanItem[] };
  results: { meeting: string; races: number; changed: boolean; note?: string }[];
  cards: { meeting: string; saved: number; changed: number; empty: number[] }[];
  odds: { meeting: string; refreshed: number; changed: number }[];
  failures: { what: string; error: string }[];
}

const MAX_PROBE = 14;

export async function runFetch(deps: FetchDeps, trigger: Trigger, opts: FetchOptions = {}): Promise<FetchSummary> {
  const now = deps.now ?? (() => new Date());
  const log = deps.log ?? ((m) => console.log(`[data] ${m}`));
  const { store } = deps;
  const id = opts.dryRun ? null : deps.runLog.start(trigger);
  const sum: FetchSummary = { discovered: [], fixturesAdded: 0, plan: { results: [], cards: [], odds: [] }, results: [], cards: [], odds: [], failures: [] };
  // Attempt times ration the heavy scrapes; saved after each one so a stopped process keeps them.
  const attempts: Attempts = { ...(store.doc<Attempts>(ATTEMPTS_DOC) ?? {}) };
  const attempted = (key: string) => {
    attempts[key] = now().toISOString();
    const cutoff = now().getTime() - 30 * DAY;
    for (const [k, t] of Object.entries(attempts)) if (Date.parse(t) < cutoff) delete attempts[k];
    store.putDoc(ATTEMPTS_DOC, attempts);
  };
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
    sum.plan.results = opts.cardsOnly ? [] : planResults(store, fixtures, upcoming, now(), opts, attempts);
    sum.plan.cards = opts.resultsOnly ? [] : planCards(store, fixtures, upcoming, now(), opts, attempts);
    sum.plan.odds = opts.resultsOnly ? [] : planOdds(store, upcoming, sum.plan.cards, now(), opts);
    if (opts.dryRun) return sum;

    if (sum.plan.results.length) {
      const s = await deps.openResults();
      try {
        for (const m of sum.plan.results) {
          const label = `${m.date} ${m.venue}`;
          attempted(attemptKey.results(m));
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
          if (m.races === null) attempted(attemptKey.probe(m));
          for (const raceNo of races) {
            attempted(attemptKey.card(m, raceNo));
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
    for (const m of sum.plan.odds) {
      const row = { meeting: `${m.date} ${m.venue}`, refreshed: 0, changed: 0 };
      for (const raceNo of m.races) {
        try {
          const odds = await deps.odds(m, raceNo);
          if (!Object.keys(odds).length) continue; // pool not open yet
          row.refreshed++;
          if (store.setCardOdds({ ...m, raceNo }, odds)) row.changed++;
        } catch (e) {
          fail(`odds ${m.date} ${m.venue} R${raceNo}`, e);
        }
      }
      sum.odds.push(row);
      if (row.changed) log(`odds ${row.meeting}: ${row.changed} race(s) updated`);
    }
    deps.runLog.finish(id!, sum.failures.length === 0, sum);
    return sum;
  } catch (e) {
    if (id !== null) deps.runLog.finish(id, false, sum, e instanceof Error ? e.message : String(e));
    throw e;
  }
}
