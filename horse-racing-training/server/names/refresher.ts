// Background queue that fetches Chinese names from HKJC and appends them to entity_names.
// - De-duplicated: a key is queued at most once.
// - Grouped by page: one results page refreshes the race name and every runner on it, and every
//   other queued key that page covered is dropped from the queue.
// - Fallback for a horse/trainer with no results page: its profile page title. Jockeys have no
//   usable single page (client-rendered), so only results pages cover them.
// - Backoff per key: 1 min, 2, 4 … capped at 1 h; after 3 failures, 24 h.
import { NAME_TTL_DAYS, keyOf, type NameKey, type NameStore, type NewName } from "./store";
import type { NameIndex } from "./nameIndex";
import { parseProfileTitle, parseResultsPage } from "./parse";
import { horseUrl, resultsUrl, trainerUrl, type PageClient } from "./hkjcPages";

const MIN = 60_000;
const backoffMs = (fails: number) => (fails >= 3 ? 24 * 60 * MIN : Math.min(MIN * 2 ** (fails - 1), 60 * MIN));

export interface RefresherDeps {
  store: NameStore;
  index: () => NameIndex;
  pages: PageClient;
  now?: () => Date;
  log?: (msg: string) => void;
}

export function createRefresher({ store, index, pages, now = () => new Date(), log = (m) => console.log(`[names] ${m}`) }: RefresherDeps) {
  const high: NameKey[] = []; // asked for by a client
  const low: NameKey[] = []; // startup sweep
  const queued = new Set<string>();
  const fails = new Map<string, { n: number; until: number }>();
  const state = { fetched: 0, inserted: 0, failed: 0, lastError: null as string | null };
  let draining: Promise<void> | null = null;

  function enqueue(keys: NameKey[], priority: "high" | "low" = "high") {
    const t = now().getTime();
    for (const k of keys) {
      const key = keyOf(k);
      if (queued.has(key)) continue;
      const f = fails.get(key);
      if (f && f.until > t) continue;
      queued.add(key);
      (priority === "high" ? high : low).push(k);
    }
    if (!draining && queued.size) draining = drain().finally(() => (draining = null));
  }

  function fail(k: NameKey, why: string) {
    const key = keyOf(k);
    const n = (fails.get(key)?.n ?? 0) + 1;
    fails.set(key, { n, until: now().getTime() + backoffMs(n) });
    state.failed++;
    state.lastError = `${key}: ${why}`;
    log(`no name for ${key} (${why}); retry in ${Math.round(backoffMs(n) / MIN)} min`);
  }

  /**
   * Append a record only when the stored one is missing, older than the TTL, or different —
   * one results page covers ~40 codes, most of them already fresh.
   */
  function save(rows: NewName[], source: string) {
    if (!rows.length) return;
    const cutoff = now().getTime() - NAME_TTL_DAYS * 86_400_000;
    const current = store.latest(rows);
    const changed = rows.filter((r) => {
      const cur = current.get(keyOf(r));
      return !cur || cur.nameZh !== r.nameZh || Date.parse(cur.fetchedAt) < cutoff;
    });
    if (changed.length) store.insert(changed, source, now());
    state.inserted += changed.length;
    for (const r of rows) {
      const key = keyOf(r);
      fails.delete(key);
      queued.delete(key); // covered: drop it from wherever it waits
    }
  }

  async function refreshRacePage(raceId: string) {
    const url = resultsUrl(raceId);
    if (!url) throw new Error(`bad race id ${raceId}`);
    const page = parseResultsPage(await pages.get(url), raceId);
    state.fetched++;
    const rows: NewName[] = [
      ...(page.race ? [{ kind: "race" as const, code: page.race.code, nameEn: null, nameZh: page.race.nameZh }] : []),
      ...page.horses.map((f) => ({ kind: "horse" as const, code: f.code, nameEn: null, nameZh: f.nameZh })),
      ...page.jockeys.map((f) => ({ kind: "jockey" as const, code: f.code, nameEn: null, nameZh: f.nameZh })),
      ...page.trainers.map((f) => ({ kind: "trainer" as const, code: f.code, nameEn: null, nameZh: f.nameZh })),
    ];
    save(rows, "results-page");
    return new Set(rows.map(keyOf));
  }

  async function refreshProfile(k: NameKey & { kind: "horse" | "trainer" }) {
    const html = await pages.get(k.kind === "horse" ? horseUrl(k.code) : trainerUrl(k.code));
    state.fetched++;
    const nameZh = parseProfileTitle(html, k.kind);
    if (!nameZh) return false;
    save([{ kind: k.kind, code: k.code, nameEn: null, nameZh }], "profile-page");
    return true;
  }

  async function one(k: NameKey) {
    const key = keyOf(k);
    const ix = index();
    const raceId = k.kind === "race" ? (ix.resultRaces.some((r) => r.raceId === k.code) ? k.code : null) : ix.lastRace.get(key);
    if (raceId) {
      const got = await refreshRacePage(raceId);
      if (got.has(key)) return;
      // Not on its page (e.g. scratched) → try the profile page next.
    }
    if (k.kind === "horse" || k.kind === "trainer") {
      if (await refreshProfile(k as NameKey & { kind: "horse" | "trainer" })) return;
      return fail(k, "not on its results page or profile");
    }
    fail(k, k.kind === "race" ? "no results page yet" : "no results page lists this jockey");
  }

  async function drain() {
    for (;;) {
      const k = high.shift() ?? low.shift();
      if (!k) return;
      if (!queued.has(keyOf(k))) continue; // already covered by an earlier page
      try {
        await one(k);
      } catch (e) {
        fail(k, e instanceof Error ? e.message : String(e));
      } finally {
        queued.delete(keyOf(k));
      }
    }
  }

  return {
    state,
    enqueue,
    /** Seed English names for keys with no row, then queue everything that needs a Chinese name. */
    sweep() {
      const ix = index();
      store.seedMissing(
        ix.keys.map((k) => ({ ...k, nameEn: ix.en.get(keyOf(k)) ?? null, nameZh: null })),
        "data-file",
        now()
      );
      const todo = store.staleOrMissing(ix.keys, now());
      enqueue(todo, "low");
      log(`sweep: ${todo.length} of ${ix.keys.length} names need fetching`);
      return todo.length;
    },
    get pending() {
      return queued.size;
    },
    /** Resolves once the queue is empty (tests, backfill). */
    async idle() {
      while (draining) await draining;
    },
  };
}

export type Refresher = ReturnType<typeof createRefresher>;
