import { describe, it, expect } from "vitest";
import { impliedProbs, bucketOf, pointAt, movers, suggestPicks, pickResults, horseRows, byBucket, stats, oddsBand, type RaceSeries, type SeriesPoint, type Mover } from "./model";

const pt = (secsToPost: number, win: Record<number, number>, pla: Record<number, number> = {}): SeriesPoint => ({
  secsToPost,
  fetchedAt: `t${secsToPost}`,
  winPool: null,
  plaPool: null,
  win,
  pla,
});

const race = (points: SeriesPoint[], results: RaceSeries["results"]): RaceSeries => ({
  raceId: "2026-09-23-HV-1",
  date: "2026-09-23",
  venue: "HV",
  raceNo: 1,
  postTime: "2026-09-23T18:40:00+08:00",
  status: "settled",
  runners: results.map((r) => ({ horseNo: r.horseNo, name: `H${r.horseNo}`, nameZh: null })),
  points,
  results,
});

describe("impliedProbs", () => {
  it("normalises out the overround", () => {
    const p = impliedProbs({ 1: 2, 2: 2, 3: 4 }); // 0.5 + 0.5 + 0.25 = 1.25
    expect(p[1]).toBeCloseTo(0.4);
    expect(p[3]).toBeCloseTo(0.2);
    expect(Object.values(p).reduce((a, b) => a + b)).toBeCloseTo(1);
  });
});

describe("bucketOf", () => {
  it("maps relative probability change to buckets at ±10% / ±25%", () => {
    expect(bucketOf(0.3)).toBe("Strong steam");
    expect(bucketOf(0.25)).toBe("Strong steam");
    expect(bucketOf(0.15)).toBe("Steam");
    expect(bucketOf(0)).toBe("Flat");
    expect(bucketOf(-0.1)).toBe("Drift");
    expect(bucketOf(-0.4)).toBe("Strong drift");
  });
});

describe("oddsBand", () => {
  it("bands final odds", () => {
    expect([2, 5, 12, 40].map(oddsBand)).toEqual(["< 5", "5–10", "10–20", "20+"]);
  });
});

describe("pointAt", () => {
  const pts = [pt(1800, {}), pt(600, {}), pt(290, {})];
  it("picks the closest snapshot within tolerance", () => {
    expect(pointAt(pts, 300)?.secsToPost).toBe(290);
    expect(pointAt(pts, 600)?.secsToPost).toBe(600);
  });
  it("returns null when nothing is close enough", () => {
    expect(pointAt(pts, 1200)).toBeNull();
  });
});

describe("movers", () => {
  it("ranks steamers first", () => {
    const s = race([pt(1800, { 1: 4, 2: 4 }), pt(60, { 1: 2, 2: 8 })], [{ horseNo: 1, finishPos: null, sp: null }, { horseNo: 2, finishPos: null, sp: null }]);
    const m = movers(s);
    expect(m[0]!.horseNo).toBe(1);
    expect(m[0]!.momentum!).toBeGreaterThan(0);
    expect(m[1]!.momentum!).toBeLessThan(0);
    expect(m[0]!.recent).toBeNull(); // no snapshot ~5 min before the latest
  });
  it("measures the last-5-min move from the snapshot nearest 5 min before the latest", () => {
    const s = race(
      [pt(1200, { 1: 4, 2: 4 }), pt(360, { 1: 4, 2: 4 }), pt(60, { 1: 3, 2: 6 })],
      [{ horseNo: 1, finishPos: null, sp: null }, { horseNo: 2, finishPos: null, sp: null }]
    );
    const h1 = movers(s).find((x) => x.horseNo === 1)!;
    // p at T−6 = 0.5; latest = (1/3)/(1/3+1/6) = 2/3 → +33%
    expect(h1.recent!).toBeCloseTo(1 / 3);
  });
});

describe("horseRows", () => {
  // Horse 1 steams 4 → 2, horse 2 drifts 4 → 8; horse 3 scratched.
  const s = race(
    [pt(1800, { 1: 4, 2: 4, 3: 10 }, { 1: 1.5, 2: 1.5 }), pt(600, { 1: 3, 2: 5 }), pt(0, { 1: 2, 2: 8 }, { 1: 1.2, 2: 2 })],
    [
      { horseNo: 1, finishPos: 1, sp: 2 },
      { horseNo: 2, finishPos: 2, sp: 8 },
      { horseNo: 3, finishPos: null, sp: null },
    ]
  );
  const rows = horseRows(s);

  it("drops scratched horses", () => {
    expect(rows.map((r) => r.horseNo)).toEqual([1, 2]);
  });
  it("measures momentum from each available checkpoint to SP, over the finishing field only", () => {
    const h1 = rows[0]!;
    // T−30: 1 vs 2 both at 4 → p=0.5. Final SP 2 vs 8 → p = 0.5/0.625 = 0.8.
    expect(h1.mom[30]).toBeCloseTo((0.8 - 0.5) / 0.5);
    expect(h1.mom[10]).toBeDefined();
    expect(h1.mom[5]).toBeUndefined(); // no snapshot near T−5
    expect(rows[1]!.mom[30]!).toBeLessThan(0);
  });
  it("sums final implied probability to 1", () => {
    expect(rows.reduce((s, r) => s + r.pFinal, 0)).toBeCloseTo(1);
  });
});

describe("stats / byBucket", () => {
  const row = (finishPos: number, sp: number, m: number) => ({
    raceId: "r", date: "d", venue: "HV", horseNo: 1, finishPos, sp, pFinal: 1 / sp, pPlaceFinal: 0.3, mom: { 10: m },
  });
  it("computes hit rate, implied rate, edge and ROI", () => {
    const s = stats("x", [row(1, 4, 0.3), row(5, 4, 0.3)]);
    expect(s.n).toBe(2);
    expect(s.winPct).toBe(50);
    expect(s.impliedWinPct).toBe(25);
    expect(s.winEdge).toBe(25);
    expect(s.winRoi).toBe(100); // returned 4 on 2 staked
    expect(s.placePct).toBe(50);
  });
  it("groups rows into all five buckets and skips rows missing the window", () => {
    const b = byBucket([row(1, 4, 0.3), row(2, 4, -0.3), { ...row(3, 4, 0), mom: {} }], 10);
    expect(b.map((x) => x.n)).toEqual([1, 0, 0, 0, 1]);
  });
});

describe("suggestPicks", () => {
  const mover = (horseNo: number, momentum: number | null, now: number | null = 5): Mover => ({
    horseNo, name: `H${horseNo}`, start: 5, now, momentum, recent: null, bucket: null,
  });
  const rank = (horseNo: number, winProb: number) => ({ horseNo, name: `H${horseNo}`, winProb, placeProb: winProb * 2 });

  it("takes the model top 5 and Move top 5, skipping scratched horses", () => {
    const model = [1, 2, 3, 4, 5, 6, 7].map((h, i) => rank(h, 0.3 - i * 0.03));
    const mv = [mover(1, 0.1), mover(2, null, null), mover(3, -0.1), mover(4, 0), mover(5, 0.2), mover(6, 0.05), mover(7, 0.3), mover(8, 0.25)];
    const p = suggestPicks(model, mv);
    expect(p.model.map((r) => r.horseNo)).toEqual([1, 3, 4, 5, 6]); // #2 scratched
    expect(p.move.map((m) => m.horseNo)).toEqual([7, 8, 5, 1, 6]);
  });

  it("combines both lists without duplicates: model picks first, then market-move picks", () => {
    // Model order 1, 2, 3; move order 4, 2, 5 — #2 is in both and keeps its model position.
    const p = suggestPicks([rank(1, 0.3), rank(2, 0.2), rank(3, 0.1)], [mover(1, null), mover(2, 0.4), mover(3, null), mover(4, 0.5), mover(5, 0.3)]);
    expect(p.combined.map((c) => [c.horseNo, c.inModel, c.inMove])).toEqual([
      [1, true, false],
      [2, true, true],
      [3, true, false],
      [4, false, true],
      [5, false, true],
    ]);
  });

  it("works with no model ranking yet", () => {
    const p = suggestPicks([], [mover(1, 0.1)]);
    expect(p.model).toEqual([]);
    expect(p.combined.map((c) => c.horseNo)).toEqual([1]);
  });
});

describe("pickResults", () => {
  const picks = {
    model: [1, 2, 3, 4, 5].map((h) => ({ horseNo: h, name: "", winProb: 0.1, placeProb: 0.3 })),
    move: [6, 1].map((h) => ({ horseNo: h, name: "", start: 5, now: 5, momentum: 0.1, recent: 0.1, bucket: null })),
    combined: [1, 2, 3, 4, 5, 6].map((h) => ({ horseNo: h, name: "", inModel: h <= 5, inMove: h === 1 || h === 6 })),
  };
  const res = (order: number[]) => order.map((h, i) => ({ horseNo: h, finishPos: i + 1, sp: 5 }));

  it("is null until a winner is posted", () => {
    expect(pickResults(picks, [])).toBeNull();
  });
  it("scores winner / top-3 / quinella / trio per list", () => {
    const r = pickResults(picks, res([6, 1, 3, 9]))!;
    expect(r.placed.map((p) => p.horseNo)).toEqual([6, 1, 3]);
    const [model, recent, combined] = r.lists;
    expect(model).toMatchObject({ winner: false, top3: 2, quinella: false, trio: false });
    expect(recent).toMatchObject({ winner: true, top3: 2, quinella: true, trio: false });
    expect(combined).toMatchObject({ winner: true, top3: 3, quinella: true, trio: true });
  });
  it("prices a $10 Trio box per list and collects the dividend on a hit", () => {
    const r = pickResults(picks, res([6, 1, 3]), [{ pool: "TRI", comb: "1,3,6", div: 117 }])!;
    const [model, , combined] = r.lists;
    expect(model).toMatchObject({ trioCost: 100, trioReturn: 0 }); // C(5,3)=10 combos
    expect(combined).toMatchObject({ trioCost: 200, trioReturn: 117 }); // C(6,3)=20 combos
    expect(pickResults(picks, res([6, 1, 3]))!.lists[2]!.trioReturn).toBeNull(); // dividend not out yet
  });
  it("reports partial placings as incomplete", () => {
    const r = pickResults(picks, res([1]))!;
    expect(r.complete).toBe(false);
    expect(r.lists[0]!.winner).toBe(true);
  });
});
