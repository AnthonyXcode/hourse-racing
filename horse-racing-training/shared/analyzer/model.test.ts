import { describe, it, expect } from "vitest";
import {
  type AnalyzerRace, type HorseRow, MC, MKT, EMPTY_FILTERS,
  applyFilters, trioCombos, trioOutcome, trioStats, foundIn, doubleTrio, metrics, SBY,
} from "./model";

/** Horse by [mcRank, mktRank, finish, winOdds, placeOdds, tripRuns]; horse number = mcRank. */
const horse = (mc: number, mkt: number, fin: number, wOdds = 0, pOdds = 0, trip = 0): HorseRow =>
  [mc, mc, mkt, 0.1, 0.3, mc, fin, fin === 1 ? 1 : 0, fin >= 1 && fin <= 3 ? 1 : 0, wOdds, pOdds, mc, trip];

const race = (h: HorseRow[], extra: Partial<AnalyzerRace> = {}): AnalyzerRace => ({
  d: "2026-01-01", v: "ST", r: 1, c: "Class 4", dist: 1200, n: h.length, ad: 10, c8: 3, sp: 0, gp: 2,
  tn: "A", tnum: 1, tc: "HK_2020_A001", tj: "", tjc: "", td: 0, dd: 0, ddl: [], h, ...extra,
});

describe("trioCombos", () => {
  it("one combo for a clean 1-2-3", () => {
    const r = race([horse(1, 1, 2), horse(2, 2, 1), horse(3, 3, 3), horse(4, 4, 4)]);
    expect(trioCombos(r).map((c) => c.map((h) => h[11]).sort())).toEqual([[1, 2, 3]]);
  });
  it("dead-heat for 3rd gives two combos", () => {
    const r = race([horse(1, 1, 1), horse(2, 2, 2), horse(3, 3, 3), horse(4, 4, 3), horse(5, 5, 5)]);
    expect(trioCombos(r)).toHaveLength(2);
  });
  it("no combos without three finishers", () => {
    expect(trioCombos(race([horse(1, 1, 1), horse(2, 2, 2), horse(3, 3, 0)]))).toEqual([]);
  });
});

describe("trioOutcome", () => {
  // Model top 4 = horses 1–4; placegetters are 1, 3, 4.
  const r = race([horse(1, 3, 1), horse(2, 1, 5), horse(3, 2, 2), horse(4, 5, 3), horse(5, 4, 4), horse(6, 6, 6)]);
  it("box 3 misses, box 4 hits with 4 combos", () => {
    expect(trioOutcome(r, MC, SBY.b3!)).toEqual({ n: 1, hit: false });
    expect(trioOutcome(r, MC, SBY.b4!)).toEqual({ n: 4, hit: true });
  });
  it("banker #1 + 2–5 hits (banker placed) with C(4,2)=6 combos", () => {
    expect(trioOutcome(r, MC, SBY.k15!)).toEqual({ n: 6, hit: true });
  });
  it("bankers #1, #2 miss when #2 is unplaced", () => {
    expect(trioOutcome(r, MC, SBY.k27!).hit).toBe(false);
  });
  it("uses market ranks when asked", () => {
    // Market top 4 = horses 2,3,1,5 → placegetter 4 (mkt 5) is outside.
    expect(trioOutcome(r, MKT, SBY.b4!).hit).toBe(false);
    expect(foundIn(r, MKT)).toBe(2);
    expect(foundIn(r, MC)).toBe(2);
  });
});

describe("trioStats", () => {
  it("ROI counts only races with a dividend", () => {
    const hit = race([horse(1, 1, 1), horse(2, 2, 2), horse(3, 3, 3), horse(4, 4, 4)], { td: 100 });
    const miss = race([horse(1, 1, 4), horse(2, 2, 2), horse(3, 3, 3), horse(4, 4, 1)], { td: 0 });
    const s = trioStats([hit, miss], MC, SBY.b3!);
    expect(s.races).toBe(2);
    expect(s.hits).toBe(1);
    expect(s.stake).toBe(10);
    expect(s.roi).toBe(900);
  });
});

describe("doubleTrio", () => {
  const row = (hit: number, combos: number) => ({ date: "2026-01-01", venue: "ST", dd: 5000, ddl: [4, 5], combos, hit });
  it("pays only when both legs hit; stake = combos product", () => {
    expect(doubleTrio([row(1, 4), row(1, 4)])).toEqual({ pools: 1, hits: 1, roi: ((5000 - 160) / 160) * 100 });
    expect(doubleTrio([row(1, 4), row(0, 4)]).hits).toBe(0);
  });
  it("skips pools with a leg missing from the list", () => {
    expect(doubleTrio([row(1, 4)]).pools).toBe(0);
  });
});

describe("applyFilters + metrics", () => {
  const a = race([horse(1, 1, 1, 3.5, 1.5, 4), horse(2, 2, 2), horse(3, 3, 3)], { v: "HV" });
  const b = race([horse(1, 5, 4, 20), horse(2, 1, 1), horse(3, 2, 2)], { v: "ST", n: 12 });
  it("filters by venue, field size and top pick market rank", () => {
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, venue: "HV" })).toEqual([a]);
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, fieldMin: "12" })).toEqual([b]);
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, fieldMin: "3" })).toEqual([a, b]);
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, fieldMin: " " })).toEqual([a, b]);
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, mkt: "long" })).toEqual([b]);
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, mkt: "fav" })).toEqual([a]);
  });
  it("≤ limits keep the boundary value, ≥ limits too", () => {
    // a/b: close8 = 3, gap = 2
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, close: "3" })).toHaveLength(2);
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, close: "2" })).toHaveLength(0);
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, gap: "2" })).toHaveLength(2);
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, gap: "2.5" })).toHaveLength(0);
  });
  it("market position ≤ uses the top pick and drops unpriced picks", () => {
    // a: top pick mkt 1, b: top pick mkt 5
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, mktPos: "1" })).toEqual([a]);
    expect(applyFilters([a, b], { ...EMPTY_FILTERS, mktPos: "5" })).toEqual([a, b]);
    const unpriced = race([horse(1, 0, 1), horse(2, 1, 2), horse(3, 2, 3)]);
    expect(applyFilters([unpriced], { ...EMPTY_FILTERS, mktPos: "14" })).toEqual([]);
  });
  it("min trip runs checks the top pick only", () => {
    const c = race([horse(1, 1, 1, 0, 0, 2), horse(2, 2, 2, 0, 0, 9), horse(3, 3, 3)]);
    expect(applyFilters([a, b, c], { ...EMPTY_FILTERS, trip: "3" })).toEqual([a]);
    expect(applyFilters([a, b, c], { ...EMPTY_FILTERS, trip: "2" })).toEqual([a, c]);
  });
  it("top-pick win/place rates and flat-stake ROI", () => {
    const m = metrics([a, b]);
    expect(m.mcTopWin).toBe(50);
    expect(m.mcTopPlace).toBe(50);
    expect(m.winRoi).toBe(((35 - 20) / 20) * 100);
    expect(m.placeRoi).toBe(((15 - 20) / 20) * 100);
    expect(m.favWin).toBe(100);
  });
});
