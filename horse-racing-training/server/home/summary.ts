// Home page "Model hit rate · last 3 months": the analyzer's own numbers (shared/analyzer/model.ts) over
// every settled race in [today − 3 months, today] HK time, with no filters. Only the computed figures are
// returned, never the per-horse payload. Cached in memory (~10 min); the analyzer keeps its per-race cache,
// so a refresh only simulates races it hasn't seen.
import { MC, PLACED, SBY, VENUE_DEFAULTS, WON, applyFilters, isSettled, metrics, rate, topOf, trioStats, type AnalyzerPayload, type AnalyzerRace, type RankIdx } from "../../shared/analyzer/model";
import type { HomeSummary } from "../../shared/types";

export const SUMMARY_TTL_MS = 10 * 60_000;
export const SUMMARY_MONTHS = 3;
/** Trio strategy shown on Home: Banker #1 + 2–6. */
export const HOME_TRIO = "k16";

const round = (n: number, d = 1) => (Number.isFinite(n) ? Math.round(n * 10 ** d) / 10 ** d : null);

/** YYYY-MM-DD minus `months` calendar months (day clamped to the target month's length). */
export function minusMonths(iso: string, months: number): string {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  const idx = y * 12 + (m - 1) - months;
  const ty = Math.floor(idx / 12);
  const tm = (idx % 12) + 1;
  const last = new Date(Date.UTC(ty, tm, 0)).getUTCDate();
  return `${ty}-${String(tm).padStart(2, "0")}-${String(Math.min(d, last)).padStart(2, "0")}`;
}

/** Pure maths: the home figures for a set of analyzer races. */
export function summarize(all: AnalyzerRace[], from: string, to: string, generatedAt = new Date().toISOString()): HomeSummary {
  const races = all.filter(isSettled);
  const strat = SBY[HOME_TRIO]!;
  const trio = trioStats(races, MC, strat);
  const dates = races.map((r) => r.d).sort();
  const model = top3(races, MC);
  const five = fiveStar(races);
  return {
    from,
    to,
    firstRace: dates[0] ?? null,
    lastRace: dates.at(-1) ?? null,
    races: races.length,
    meetings: new Set(races.map((r) => `${r.d}_${r.v}`)).size,
    top3Races: model.races,
    top3WinHits: model.winHits,
    top3Win: model.win,
    top3PlaceHits: model.placeHits,
    top3Place: model.place,
    days: [...new Set(dates)].reverse(),
    fiveStarRaces: five.races,
    fiveStarPlaceHits: five.placeHits,
    fiveStarPlace: five.place,
    fiveStarRoi: five.roi,
    trio: { key: strat.key, bankers: strat.B, last: strat.L, races: trio.races, hits: trio.hits, hit: round(trio.hit), combos: round(trio.combos), roi: round(trio.roi) },
    generatedAt,
  };
}

/**
 * Per-race hit rates for a ranking's top 3 picks, over races where it has picks:
 * win = the winner was one of the top 3; place = at least one of the top 3 finished in the top 3.
 */
export function top3(races: AnalyzerRace[], idx: RankIdx) {
  let n = 0, winHits = 0, placeHits = 0;
  for (const r of races) {
    const ps = r.h.filter((h) => h[idx] >= 1 && h[idx] <= 3);
    if (!ps.length) continue;
    n++;
    if (ps.some((h) => h[WON])) winHits++;
    if (ps.some((h) => h[PLACED])) placeHits++;
  }
  return { races: n, winHits, win: round(rate(winHits, n)), placeHits, place: round(rate(placeHits, n)) };
}

/**
 * 5★ races: the model's top pick meets every rule of its venue's strategy (the Bet page's confidence stars,
 * strategyChecks / confidence = 5 of 5; the Win/Place tab's default filters). Place rate of that top pick.
 */
export function fiveStar(races: AnalyzerRace[]) {
  const picked = (["ST", "HV"] as const).flatMap((v) => applyFilters(races, VENUE_DEFAULTS[v]));
  const placeHits = picked.filter((r) => topOf(r)[PLACED]).length;
  // ROI of a 10-credit place bet on that top pick in every 5★ race, at the real place dividends.
  return { races: picked.length, placeHits, place: round(rate(placeHits, picked.length)), roi: picked.length ? round(metrics(picked).placeRoi) : null };
}

/** Cached summary: fresh for `ttlMs`; after that the stale copy is served while one refresh runs. */
export function homeSummary(deps: { run: (from: string, to: string) => Promise<AnalyzerPayload>; today: () => string; ttlMs?: number; now?: () => number }) {
  const ttl = deps.ttlMs ?? SUMMARY_TTL_MS;
  const now = deps.now ?? Date.now;
  let cached: { at: number; key: string; value: HomeSummary } | null = null;
  let inflight: Promise<HomeSummary> | null = null;
  const refresh = (from: string, to: string) =>
    (inflight ??= deps
      .run(from, to)
      .then((p) => {
        const value = summarize(p.races, from, to);
        cached = { at: now(), key: `${from}_${to}`, value };
        return value;
      })
      .finally(() => (inflight = null)));
  return {
    async get(): Promise<HomeSummary> {
      const to = deps.today();
      const from = minusMonths(to, SUMMARY_MONTHS);
      const key = `${from}_${to}`;
      if (cached && cached.key === key) {
        if (now() - cached.at >= ttl) refresh(from, to).catch(() => {}); // stale-while-revalidate
        return cached.value;
      }
      return refresh(from, to);
    },
    /** Tests / admin: forget the cached figures. */
    clear: () => void (cached = null),
  };
}
