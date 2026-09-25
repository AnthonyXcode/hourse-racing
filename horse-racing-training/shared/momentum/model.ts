// Market momentum: how a horse's win price moved in the final minutes before the off,
// and whether that movement predicts the result better than the final price already does.
//
// Momentum is measured on NORMALISED implied probability, not raw odds:
//   p_i = (1 / odds_i) / Σ_j (1 / odds_j)      (removes the track take / overround)
//   momentum_W = (p_final − p_{T−W}) / p_{T−W}
// Positive = the price shortened ("steamer"); negative = it drifted.

/** Minutes-before-post checkpoints we measure momentum from. */
export const WINDOWS = [30, 20, 10, 5, 2] as const;
export type Window = (typeof WINDOWS)[number];

/** A snapshot must land within this many seconds of the checkpoint to count. */
export const CHECKPOINT_TOLERANCE_S = 150;

export const BUCKETS = ["Strong drift", "Drift", "Flat", "Steam", "Strong steam"] as const;
export type Bucket = (typeof BUCKETS)[number];

/** Momentum → bucket. Thresholds are relative change in implied probability. */
export function bucketOf(m: number, strong = 0.25, mild = 0.1): Bucket {
  if (m <= -strong) return "Strong drift";
  if (m <= -mild) return "Drift";
  if (m < mild) return "Flat";
  if (m < strong) return "Steam";
  return "Strong steam";
}

export const ODDS_BANDS = ["< 5", "5–10", "10–20", "20+"] as const;
export type OddsBand = (typeof ODDS_BANDS)[number];
export const oddsBand = (o: number): OddsBand => (o < 5 ? "< 5" : o < 10 ? "5–10" : o < 20 ? "10–20" : "20+");

// ---- Live series (one race) ----

export interface SeriesPoint {
  secsToPost: number;
  fetchedAt: string; // when the query was sent
  respondedAt?: string | null; // when HKJC's response arrived
  hkjcUpdatedAt?: string | null; // HKJC's WIN pool lastUpdateTime
  winPool: number | null;
  plaPool: number | null;
  win: Record<number, number>; // horseNo → win odds
  pla: Record<number, number>;
}
export interface RaceSeries {
  raceId: string;
  date: string;
  venue: string;
  raceNo: number;
  postTime: string;
  status: string;
  /** nameZh = HKJC Traditional Chinese name (GraphQL name_ch); null when not recorded. */
  runners: { horseNo: number; name: string; nameZh: string | null }[];
  points: SeriesPoint[];
  results: { horseNo: number; finishPos: number | null; sp: number | null }[];
  dividends?: { pool: string; comb: string; div: number }[]; // official, HK$ per $10
}

/** Normalised implied win probability for every horse priced in `odds`. */
export function impliedProbs(odds: Record<number, number>): Record<number, number> {
  const inv = Object.entries(odds).filter(([, o]) => o > 0).map(([h, o]) => [Number(h), 1 / o] as const);
  const sum = inv.reduce((s, [, v]) => s + v, 0);
  return Object.fromEntries(inv.map(([h, v]) => [h, sum > 0 ? v / sum : 0]));
}

/** The point closest to `secs` before post, if one is within tolerance. */
export function pointAt(points: SeriesPoint[], secs: number, tol = CHECKPOINT_TOLERANCE_S): SeriesPoint | null {
  let best: SeriesPoint | null = null;
  for (const p of points) if (!best || Math.abs(p.secsToPost - secs) < Math.abs(best.secsToPost - secs)) best = p;
  return best && Math.abs(best.secsToPost - secs) <= tol ? best : null;
}

export interface Mover {
  horseNo: number;
  name: string;
  start: number | null; // win odds at first snapshot
  now: number | null; // win odds at latest snapshot
  momentum: number | null; // relative change in implied prob, first → latest
  recent: number | null; // same, over the last RECENT_SECS only (null until that much is recorded)
  bucket: Bucket | null;
}

export const RECENT_SECS = 5 * 60;

/** Per-horse move from the first (and from ~5 min before the latest) to the latest snapshot, biggest steamers first. */
export function movers(s: RaceSeries): Mover[] {
  const first = s.points[0], last = s.points[s.points.length - 1];
  const earlier = last ? pointAt(s.points, last.secsToPost + RECENT_SECS) : null;
  const p0 = first ? impliedProbs(first.win) : {}, p1 = last ? impliedProbs(last.win) : {};
  const p5 = earlier && earlier !== last ? impliedProbs(earlier.win) : {};
  const rel = (a: number | undefined, b: number | undefined) => (a && b ? (b - a) / a : null);
  return s.runners
    .map((r) => {
      const m = rel(p0[r.horseNo], p1[r.horseNo]);
      return {
        recent: rel(p5[r.horseNo], p1[r.horseNo]),
        horseNo: r.horseNo,
        name: r.name,
        start: first?.win[r.horseNo] ?? null,
        now: last?.win[r.horseNo] ?? null,
        momentum: m,
        bucket: m == null ? null : bucketOf(m),
      };
    })
    .sort((x, y) => (y.momentum ?? -Infinity) - (x.momentum ?? -Infinity));
}

// ---- Suggested picks ----

/** One row of the analyzer's ranking (tools/analyze-race.ts), best first. */
export interface ModelRank {
  horseNo: number;
  name: string;
  winProb: number;
  placeProb: number;
}

export const MODEL_PICKS = 5; // analyzer's top N by win probability
export const MOVE_PICKS = 5; // top N by Move (first snapshot → latest)

export interface Picks {
  model: ModelRank[]; // analyzer top MODEL_PICKS still in the race
  move: Mover[]; // biggest steamers by Move
  combined: { horseNo: number; name: string; inModel: boolean; inMove: boolean }[]; // union: both first
}

/** Analyzer top 5 + Move top 5. Horses no longer priced (scratched) are skipped. */
export function suggestPicks(model: ModelRank[], mv: Mover[]): Picks {
  const running = new Set(mv.filter((m) => m.now != null).map((m) => m.horseNo));
  const top = model.filter((r) => running.size === 0 || running.has(r.horseNo)).slice(0, MODEL_PICKS);
  const move = mv
    .filter((m) => m.momentum != null)
    .sort((a, b) => b.momentum! - a.momentum!)
    .slice(0, MOVE_PICKS);
  const inModel = new Set(top.map((r) => r.horseNo)), inMove = new Set(move.map((m) => m.horseNo));
  const names = new Map([...mv.map((m) => [m.horseNo, m.name] as const), ...top.map((r) => [r.horseNo, r.name] as const)]);
  const combined = [...new Set([...top.map((r) => r.horseNo), ...move.map((m) => m.horseNo)])]
    .map((h) => ({ horseNo: h, name: names.get(h) ?? "", inModel: inModel.has(h), inMove: inMove.has(h) }))
    .sort((a, b) => Number(b.inModel && b.inMove) - Number(a.inModel && a.inMove));
  return { model: top, move, combined };
}

/** Site-wide banner: the featured race (next to run, else the last run) and its Combined picks. */
export interface Highlight {
  mode: "upcoming" | "last";
  race: { raceId: string; date: string; venue: "ST" | "HV"; raceNo: number; postTime: string | null; name: string | null };
  picks: { horseNo: number; code: string | null; name: string; nameZh: string | null; both: boolean; odds: number | null; finishPos: number | null }[];
  /** First three (dead-heats included) when mode = "last" and results are in; else []. */
  placed: { horseNo: number; finishPos: number }[];
}

export const TRIO_UNIT = 10; // HK$ per Trio combination; dividends are quoted per $10

/** Number of 3-horse combinations in a box of n horses. */
export const choose3 = (n: number) => (n < 3 ? 0 : (n * (n - 1) * (n - 2)) / 6);

export interface PickHits {
  label: string;
  horses: number[];
  winner: boolean; // has the winner
  top3: number; // how many of the first three it holds
  quinella: boolean; // holds both of the first two
  trio: boolean; // holds all of the first three
  trioCost: number; // boxing every 3-horse combination of the list at $10
  trioReturn: number | null; // dividend if the box hits (null when the dividend isn't known yet)
}

/** First three finishers (dead-heats included) and how each pick list fared. Null until a winner is known. */
export function pickResults(picks: Picks, results: RaceSeries["results"], dividends?: RaceSeries["dividends"]) {
  const placed = results.filter((r) => r.finishPos != null && r.finishPos <= 3).sort((a, b) => a.finishPos! - b.finishPos!);
  if (!placed.some((r) => r.finishPos === 1)) return null;
  const first2 = placed.filter((r) => r.finishPos! <= 2).map((r) => r.horseNo);
  const first3 = placed.map((r) => r.horseNo);
  // A dead-heat can pay more than one Trio combination; a box collects every one it covers.
  const trioDivs = (dividends ?? []).filter((d) => d.pool === "TRI");
  const hits = (label: string, horses: number[]): PickHits => {
    const set = new Set(horses);
    const trioWins = trioDivs.filter((d) => d.comb.split(",").every((h) => set.has(Number(h))));
    return {
      trioCost: choose3(horses.length) * TRIO_UNIT,
      trioReturn: trioDivs.length ? trioWins.reduce((s, d) => s + d.div, 0) : null,
      label,
      horses,
      winner: placed.some((r) => r.finishPos === 1 && set.has(r.horseNo)),
      top3: first3.filter((h) => set.has(h)).length,
      quinella: first2.length >= 2 && first2.every((h) => set.has(h)),
      trio: first3.length >= 3 && first3.every((h) => set.has(h)),
    };
  };
  return {
    placed, // [{horseNo, finishPos, sp}] for positions 1–3
    complete: first3.length >= 3,
    dividends: dividends ?? [],
    lists: [
      hits(`Model top ${MODEL_PICKS}`, picks.model.map((r) => r.horseNo)),
      hits(`Move top ${MOVE_PICKS}`, picks.move.map((m) => m.horseNo)),
      hits("Combined", picks.combined.map((c) => c.horseNo)),
    ],
  };
}

// ---- Analysis rows (one per horse per settled race) ----

export interface HorseRow {
  raceId: string;
  date: string;
  venue: string;
  horseNo: number;
  finishPos: number;
  sp: number; // final win odds (starting price)
  pFinal: number; // normalised implied win prob at the off (from SP)
  pPlaceFinal: number | null; // market-implied place prob (last snapshot place odds, scaled to 3 places)
  mom: Partial<Record<Window, number>>; // momentum from T−W to the off
}

/** Build analysis rows for one settled race. Scratched / non-finishers are dropped. */
export function horseRows(s: RaceSeries): HorseRow[] {
  const finishers = s.results.filter((r) => r.finishPos != null && r.sp != null && r.sp > 0);
  if (!finishers.length || !s.points.length) return [];
  const spOdds = Object.fromEntries(finishers.map((r) => [r.horseNo, r.sp!]));
  const pFinal = impliedProbs(spOdds);

  const last = s.points[s.points.length - 1]!;
  const plaFin = Object.fromEntries(finishers.filter((r) => last.pla[r.horseNo]).map((r) => [r.horseNo, last.pla[r.horseNo]!]));
  const places = finishers.length >= 7 ? 3 : 2; // HKJC pays 2 places with ≤ 6 runners
  const pPla = impliedProbs(plaFin);

  // Checkpoint probs are normalised over the SAME finishing field, so scratchings don't skew them.
  const checkpoints = Object.fromEntries(
    WINDOWS.map((w) => {
      const pt = pointAt(s.points, w * 60);
      if (!pt) return [w, null];
      const odds = Object.fromEntries(finishers.filter((r) => pt.win[r.horseNo]).map((r) => [r.horseNo, pt.win[r.horseNo]!]));
      return [w, Object.keys(odds).length === finishers.length ? impliedProbs(odds) : null];
    })
  ) as Record<Window, Record<number, number> | null>;

  return finishers.map((r) => {
    const mom: Partial<Record<Window, number>> = {};
    for (const w of WINDOWS) {
      const p0 = checkpoints[w]?.[r.horseNo];
      if (p0) mom[w] = (pFinal[r.horseNo]! - p0) / p0;
    }
    return {
      raceId: s.raceId,
      date: s.date,
      venue: s.venue,
      horseNo: r.horseNo,
      finishPos: r.finishPos!,
      sp: r.sp!,
      pFinal: pFinal[r.horseNo]!,
      pPlaceFinal: pPla[r.horseNo] != null ? Math.min(1, pPla[r.horseNo]! * places) : null,
      mom,
    };
  });
}

export interface BucketStats {
  key: string;
  n: number;
  winPct: number;
  impliedWinPct: number;
  winEdge: number; // actual − implied, percentage points
  placePct: number;
  impliedPlacePct: number;
  placeEdge: number;
  winRoi: number; // flat level-stake win bet at SP, % return on stake
}

export function stats(key: string, rows: HorseRow[]): BucketStats {
  const n = rows.length;
  const pct = (x: number) => (n ? (100 * x) / n : NaN);
  const wins = rows.filter((r) => r.finishPos === 1);
  const placed = rows.filter((r) => r.finishPos <= 3).length;
  const withPla = rows.filter((r) => r.pPlaceFinal != null);
  const winPct = pct(wins.length), impliedWinPct = pct(rows.reduce((s, r) => s + r.pFinal, 0));
  const placePct = pct(placed);
  const impliedPlacePct = withPla.length ? (100 * withPla.reduce((s, r) => s + r.pPlaceFinal!, 0)) / withPla.length : NaN;
  return {
    key,
    n,
    winPct,
    impliedWinPct,
    winEdge: winPct - impliedWinPct,
    placePct,
    impliedPlacePct,
    placeEdge: placePct - impliedPlacePct,
    winRoi: n ? (100 * (wins.reduce((s, r) => s + r.sp, 0) - n)) / n : NaN,
  };
}

/** Hit rate by momentum bucket for one window. Rows without a checkpoint at `w` are excluded. */
export function byBucket(rows: HorseRow[], w: Window): BucketStats[] {
  return BUCKETS.map((b) => stats(b, rows.filter((r) => r.mom[w] != null && bucketOf(r.mom[w]!) === b)));
}

/** Bucket × final-odds band, so favourite bias doesn't masquerade as momentum. */
export function byBandAndBucket(rows: HorseRow[], w: Window): { band: OddsBand; cells: BucketStats[] }[] {
  return ODDS_BANDS.map((band) => ({ band, cells: byBucket(rows.filter((r) => oddsBand(r.sp) === band), w) }));
}
