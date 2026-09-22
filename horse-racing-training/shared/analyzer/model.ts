// Analyzer performance model: per-horse prediction rows (built by the server)
// and the pure aggregations the Win/Place and Trio tabs render.

/** [mcRank, ratingRank, mktRank (0 = unpriced), winProb, placeProb, ePos, finish, won, placed, winOdds, placeOdds, horseNumber, tripRuns] */
export type HorseRow = [number, number, number, number, number, number, number, number, number, number, number, number, number];
/** TRIP = past runs at exactly the race distance (the backtest's --min-trip-runs count). */
export const MC = 0, RATING = 1, MKT = 2, PWIN = 3, PPLACE = 4, EPOS = 5, FIN = 6, WON = 7, PLACED = 8, WODDS = 9, PODDS = 10, HNUM = 11, TRIP = 12;
export type RankIdx = typeof MC | typeof MKT;

export interface AnalyzerRace {
  /** YYYY-MM-DD */
  d: string;
  v: "ST" | "HV";
  r: number;
  /** class */
  c: string;
  dist: number;
  /** runners */
  n: number;
  /** avgDiff: mean rating gap to the top-rated horse */
  ad: number;
  /** runners rated within 8 of the top */
  c8: number;
  /** runners with sparse form */
  sp: number;
  /** rating gap between top two (999 = no second) */
  gp: number;
  /** model top pick name / number */
  tn: string;
  tnum: number;
  /** model top pick's jockey */
  tj: string;
  /** Trio dividend per $10, 0 = not recorded */
  td: number;
  /** Double Trio dividend per $10 (0 = none) and its two legs */
  dd: number;
  ddl: number[];
  h: HorseRow[];
}

export interface AnalyzerPayload {
  generatedAt: string;
  mcRuns: number;
  from: string;
  to: string;
  races: AnalyzerRace[];
}

export const UNIT = 10;

// ---- helpers ----
export const rate = (n: number, d: number) => (d > 0 ? (n / d) * 100 : NaN);
export const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);
export const median = (xs: number[]) => {
  if (!xs.length) return NaN;
  const s = [...xs].sort((a, b) => a - b), m = s.length >> 1;
  return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
};
export const choose = (n: number, k: number) => {
  if (k < 0 || n < k) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return Math.round(r);
};
export const topOf = (race: AnalyzerRace): HorseRow => race.h.find((h) => h[MC] === 1) ?? race.h[0]!;

// ---- filters ----
// Numeric filters hold the raw number-input text; "" (or anything non-numeric) = off.
export interface Filters {
  venue: string;
  cls: string;
  /** runners ≥ */
  fieldMin: string;
  /** avgDiff ≥ */
  diffMin: string;
  /** sparse-form runners ≤ */
  sparse: string;
  /** runners rated within 8 of the top ≤ */
  close: string;
  /** top-2 rating gap ≥ */
  gap: string;
  /** top pick MC place % ≥ */
  mcPlace: string;
  /** top pick's past runs at the race distance ≥ */
  trip: string;
  /** top pick's market position (1 = favourite) ≤; unpriced picks fail when set */
  mktPos: string;
  mkt: string;
}
export const EMPTY_FILTERS: Filters = {
  venue: "", cls: "", fieldMin: "", diffMin: "", sparse: "", close: "", gap: "", mcPlace: "", trip: "", mktPos: "", mkt: "",
};

const num = (s: string) => (s.trim() === "" ? NaN : Number(s));
/** v passes unless the limit is set and v is on the wrong side of it. */
const atLeast = (v: number, s: string) => !(v < num(s));
const atMost = (v: number, s: string) => !(v > num(s));

export function applyFilters(races: AnalyzerRace[], F: Filters): AnalyzerRace[] {
  return races.filter((r) => {
    if (F.venue && r.v !== F.venue) return false;
    if (F.cls && r.c !== F.cls) return false;
    if (!atLeast(r.n, F.fieldMin) || !atLeast(r.ad, F.diffMin)) return false;
    if (!atMost(r.sp, F.sparse) || !atMost(r.c8, F.close) || !atLeast(r.gp, F.gap)) return false;
    const top = topOf(r);
    if (!atLeast(top[PPLACE] * 100, F.mcPlace) || !atLeast(top[TRIP], F.trip)) return false;
    if (F.mktPos.trim() !== "" && !(top[MKT] > 0 && atMost(top[MKT], F.mktPos))) return false;
    if (F.mkt) {
      const m = top[MKT];
      if (F.mkt === "fav" && m !== 1) return false;
      if (F.mkt === "nonfav" && m === 1) return false;
      if (F.mkt === "long" && !(m >= 5)) return false;
    }
    return true;
  });
}

// ---- Win / Place ----
export function metrics(races: AnalyzerRace[]) {
  const horses = races.flatMap((r) => r.h);
  const tops = races.map(topOf);
  const favs = races.map((r) => r.h.find((h) => h[MKT] === 1)).filter((h): h is HorseRow => !!h);
  const ratingTops = races.map((r) => r.h.find((h) => h[RATING] === 1)).filter((h): h is HorseRow => !!h);
  const stake = races.length * UNIT;
  const winRet = tops.reduce((s, h) => s + (h[WON] && h[WODDS] > 0 ? h[WODDS] * UNIT : 0), 0);
  const placeRet = tops.reduce((s, h) => s + (h[PLACED] && h[PODDS] > 0 ? h[PODDS] * UNIT : 0), 0);
  const finished = horses.filter((h) => h[FIN] > 0);
  return {
    races: races.length,
    horses: horses.length,
    mcTopWin: rate(tops.filter((h) => h[WON]).length, tops.length),
    mcTopPlace: rate(tops.filter((h) => h[PLACED]).length, tops.length),
    predWin: mean(tops.map((h) => h[PWIN])) * 100,
    predPlace: mean(tops.map((h) => h[PPLACE])) * 100,
    favWin: rate(favs.filter((h) => h[WON]).length, favs.length),
    favPlace: rate(favs.filter((h) => h[PLACED]).length, favs.length),
    ratingPlace: rate(ratingTops.filter((h) => h[PLACED]).length, ratingTops.length),
    agree: rate(tops.filter((h) => h[MKT] === 1).length, tops.length),
    winRoi: stake ? ((winRet - stake) / stake) * 100 : NaN,
    placeRoi: stake ? ((placeRet - stake) / stake) * 100 : NaN,
    brier: mean(horses.map((h) => Math.pow(h[PWIN] - h[WON], 2))),
    brierPlace: mean(horses.map((h) => Math.pow(h[PPLACE] - h[PLACED], 2))),
    ePosErr: mean(finished.map((h) => Math.abs(h[EPOS] - h[FIN]))),
  };
}
export type Metrics = ReturnType<typeof metrics>;

export interface RankRow {
  rank: number;
  n: number;
  win: number;
  place: number;
}
/** Win/place rate per rank (1–14); ranks with fewer than 20 runners are dropped. */
export function byRank(races: AnalyzerRace[], idx: RankIdx): RankRow[] {
  const horses = races.flatMap((r) => r.h);
  return [...Array(14)]
    .map((_, i) => {
      const k = i + 1, hs = horses.filter((h) => h[idx] === k);
      return { rank: k, n: hs.length, win: rate(hs.filter((h) => h[WON]).length, hs.length), place: rate(hs.filter((h) => h[PLACED]).length, hs.length) };
    })
    .filter((r) => r.n >= 20);
}

export interface CalibBucket {
  mid: number;
  label: string;
  n: number;
  predicted: number;
  actual: number;
}
/** 10%-wide buckets of predicted probability vs observed hit rate (buckets with ≥ 20 horses). */
export function calibration(races: AnalyzerRace[], probIdx: typeof PWIN | typeof PPLACE, hitIdx: typeof WON | typeof PLACED): CalibBucket[] {
  const horses = races.flatMap((r) => r.h);
  const out: CalibBucket[] = [];
  for (let lo = 0; lo < 100; lo += 10) {
    const hs = horses.filter((h) => h[probIdx] * 100 >= lo && h[probIdx] * 100 < lo + 10);
    if (hs.length >= 20)
      out.push({ mid: lo + 5, label: `${lo}-${lo + 10}%`, n: hs.length, predicted: mean(hs.map((h) => h[probIdx])) * 100, actual: rate(hs.filter((h) => h[hitIdx]).length, hs.length) });
  }
  return out;
}

/** Group races by key, sorted by `sorter` (default: string compare). */
export function groupBy<K extends string | number>(races: AnalyzerRace[], keyOf: (r: AnalyzerRace) => K, sorter?: (a: K, b: K) => number) {
  const m = new Map<K, AnalyzerRace[]>();
  for (const r of races) {
    const k = keyOf(r);
    if (!m.has(k)) m.set(k, []);
    m.get(k)!.push(r);
  }
  return [...m.entries()]
    .sort((a, b) => (sorter ? sorter(a[0], b[0]) : String(a[0]).localeCompare(String(b[0]))))
    .map(([key, rs]) => ({ key, rs }));
}

export const DIFF_ORDER = ["≤ 8", "9–10", "11–13", "14+"];
export const diffBucket = (r: AnalyzerRace) => (r.ad <= 8 ? "≤ 8" : r.ad <= 10 ? "9–10" : r.ad <= 13 ? "11–13" : "14+");

// ---- Trio ----
/** B = bankers (ranks 1..B), L = last rank covered; legs are ranks B+1..L. */
export interface TrioStrat {
  key: string;
  name: string;
  B: number;
  L: number;
}
export const TRIO_STRATS: TrioStrat[] = [
  { key: "b3", name: "Box top 3", B: 0, L: 3 },
  { key: "b4", name: "Box top 4", B: 0, L: 4 },
  { key: "b5", name: "Box top 5", B: 0, L: 5 },
  { key: "b6", name: "Box top 6", B: 0, L: 6 },
  { key: "b7", name: "Box top 7", B: 0, L: 7 },
  { key: "k15", name: "Banker #1 + 2–5", B: 1, L: 5 },
  { key: "k16", name: "Banker #1 + 2–6", B: 1, L: 6 },
  { key: "k17", name: "Banker #1 + 2–7", B: 1, L: 7 },
  { key: "k18", name: "Banker #1 + 2–8", B: 1, L: 8 },
  { key: "k27", name: "Bankers #1, #2 + 3–7", B: 2, L: 7 },
];
export const SBY: Record<string, TrioStrat> = Object.fromEntries(TRIO_STRATS.map((s) => [s.key, s]));

/** Winning combos: 1st + 2nd + 3rd, or several on a dead-heat for a paying spot. */
export function trioCombos(race: AnalyzerRace): HorseRow[][] {
  const fin = race.h.filter((h) => h[FIN] > 0).sort((a, b) => a[FIN] - b[FIN]);
  if (fin.length < 3) return [];
  const cut = fin[2]![FIN], must = fin.filter((h) => h[FIN] < cut), pool = fin.filter((h) => h[FIN] === cut);
  const out: HorseRow[][] = [];
  const pick = (i0: number, acc: HorseRow[]) => {
    if (must.length + acc.length === 3) return void out.push([...must, ...acc]);
    for (let i = i0; i < pool.length; i++) pick(i + 1, [...acc, pool[i]!]);
  };
  pick(0, []);
  return out;
}

/** Winning combos are derived once per race object. */
const comboCache = new WeakMap<AnalyzerRace, HorseRow[][]>();
export const combosOf = (race: AnalyzerRace) => {
  let c = comboCache.get(race);
  if (!c) comboCache.set(race, (c = trioCombos(race)));
  return c;
};
export const isSettled = (race: AnalyzerRace) => combosOf(race).length > 0;

export function trioOutcome(race: AnalyzerRace, idx: RankIdx, s: Pick<TrioStrat, "B" | "L">) {
  const covered = race.h.filter((h) => h[idx] > 0 && h[idx] <= s.L).length;
  const n = choose(covered - s.B, 3 - s.B);
  const hit = combosOf(race).some(
    (c) => c.every((h) => h[idx] > 0 && h[idx] <= s.L) && [...Array(s.B)].every((_, b) => c.some((h) => h[idx] === b + 1))
  );
  return { n, hit };
}

export function trioStats(races: AnalyzerRace[], idx: RankIdx, s: Pick<TrioStrat, "B" | "L">) {
  let settled = 0, hits = 0, combos = 0, stake = 0, ret = 0;
  const divs: number[] = [];
  for (const r of races) {
    if (!isSettled(r)) continue;
    const o = trioOutcome(r, idx, s);
    if (!o.n) continue;
    settled++;
    combos += o.n;
    if (o.hit) hits++;
    if (r.td > 0) {
      stake += o.n * UNIT;
      if (o.hit) {
        ret += r.td;
        divs.push(r.td);
      }
    }
  }
  return { races: settled, hits, hit: rate(hits, settled), combos: settled ? combos / settled : NaN, stake, ret, roi: stake ? ((ret - stake) / stake) * 100 : NaN, avgDiv: mean(divs) };
}

/** How many of the actual top 3 are within the top-n picks. */
export const foundIn = (race: AnalyzerRace, idx: RankIdx, n = 3) =>
  race.h.filter((h) => h[FIN] > 0 && h[FIN] <= 3 && h[idx] > 0 && h[idx] <= n).length;

/** Double Trio across rows: same strategy in both legs; tickets = leg 1 combos × leg 2 combos. Only pools with both legs present. */
export function doubleTrio(rows: { date: string; venue: string; dd: number; ddl: number[]; combos: number; hit: number }[]) {
  const pools = new Map<string, typeof rows>();
  for (const r of rows)
    if (r.dd > 0 && r.ddl.length === 2) {
      const k = `${r.date} ${r.venue} ${r.ddl.join("+")}`;
      if (!pools.has(k)) pools.set(k, []);
      pools.get(k)!.push(r);
    }
  let pools2 = 0, hits = 0, stake = 0, ret = 0;
  for (const legs of pools.values()) {
    if (legs.length !== 2) continue;
    pools2++;
    stake += legs[0]!.combos * legs[1]!.combos * UNIT;
    if (legs.every((r) => r.hit)) {
      hits++;
      ret += legs[0]!.dd;
    }
  }
  return { pools: pools2, hits, roi: stake ? ((ret - stake) / stake) * 100 : NaN };
}
