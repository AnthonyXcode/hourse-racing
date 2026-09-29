// Market momentum: how a horse's win price moved in the final minutes before the off,
// and whether that movement predicts the result better than the final price already does.
//
// Momentum is measured on NORMALISED implied probability, not raw odds:
//   p_i = (1 / odds_i) / Σ_j (1 / odds_j)      (removes the track take / overround)
//   momentum_W = (p_final − p_{T−W}) / p_{T−W}
// Positive = the price shortened ("steamer"); negative = it drifted.

/** Minutes-before-post checkpoints we measure momentum from. */
/** Momentum checkpoints, minutes before post (0 = at post, negative = after post): T−10 … T+5, every minute.
 *  Snapshots run to ~5 min after post (poller grace), so nothing later is measurable. */
export const WINDOWS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5] as const;
export type Window = (typeof WINDOWS)[number];

/** A snapshot must land within this many seconds of the checkpoint to count. */
export const CHECKPOINT_TOLERANCE_S = 150;

export const BUCKETS = ["Strong drift", "Drift", "Flat", "Steam", "Strong steam"] as const;
export type Bucket = (typeof BUCKETS)[number];

/** Bucket thresholds: relative change in implied probability. */
export const BUCKET_STRONG = 0.25;
export const BUCKET_MILD = 0.1;

/** Momentum → bucket. Thresholds are relative change in implied probability. */
export function bucketOf(m: number, strong = BUCKET_STRONG, mild = BUCKET_MILD): Bucket {
  if (m <= -strong) return "Strong drift";
  if (m <= -mild) return "Drift";
  if (m < mild) return "Flat";
  if (m < strong) return "Steam";
  return "Strong steam";
}

/** A bucket's range of implied-probability change, e.g. "+10% ~ +25%" or "≥ +25%". */
export function bucketRange(b: Bucket): string {
  const s = Math.round(BUCKET_STRONG * 100), m = Math.round(BUCKET_MILD * 100);
  return { "Strong drift": `≤ −${s}%`, Drift: `−${m}% ~ −${s}%`, Flat: `±${m}%`, Steam: `+${m}% ~ +${s}%`, "Strong steam": `≥ +${s}%` }[b];
}

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
  /** null for an upcoming race known only from its racecard (post times arrive on race day) */
  postTime: string | null;
  status: string;
  /** nameZh = HKJC Traditional Chinese name (GraphQL name_ch); null when not recorded. */
  /** `code` = HKJC horse code from the racecard, for the names store when the feed has no Chinese name. */
  runners: { horseNo: number; name: string; nameZh: string | null; code?: string | null }[];
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

export const PLACE_SURGE = 0; // Place pick: any positive win-market move over the last RECENT_SECS (the movers table's Last 5m)
export const PLACE_MAX = 5; // at most this many Place picks per race: the biggest moves
/** Cut-off choices for the suggestions, in minutes from post (+ = after post): T+5 … T+1, T−1 … T−5. */
export const CUTOFF_MINUTES = [5, 4, 3, 2, 1, -1, -2, -3, -4, -5] as const;
export type Cutoff = (typeof CUTOFF_MINUTES)[number];
export const DEFAULT_CUTOFF: Cutoff = -1;
export const isCutoff = (v: unknown): v is Cutoff => (CUTOFF_MINUTES as readonly number[]).includes(v as number);
/** The series as it stood `min` minutes from post: only snapshots taken up to then (a live race before then is unchanged). */
export const cutAt = (s: RaceSeries, min: number): RaceSeries => ({ ...s, points: s.points.filter((p) => p.secsToPost >= -min * 60) });

/** Checkpoints for the Place rule around post time, in minutes (− = before post): T−5 … T−1, T+1 … T+5. */
export const PLACE_MINUTES = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5] as const;

export interface PlaceSurge {
  horseNo: number;
  name: string;
  before: number; // win odds ~5 min before the latest snapshot
  now: number; // latest win odds
  change: number; // Mover.recent: relative rise in normalised win implied chance (the movers table's last-5-min figure)
  placeNow: number | null; // latest place odds (what the bet is struck at)
}

/**
 * Place picks: horses whose win-market move over the last RECENT_SECS (Mover.recent) is above
 * PLACE_SURGE, biggest first, at most PLACE_MAX — the market is backing them to win, we bet them to place.
 * Empty until ~5 min of snapshots exist.
 * `asOfSecs`: judge the race as it stood at that many seconds before post (only snapshots up to then);
 * empty when no snapshot lies within CHECKPOINT_TOLERANCE_S of that moment.
 */
export function placeSurges(s: RaceSeries, asOfSecs?: number): PlaceSurge[] {
  if (asOfSecs != null) {
    const points = s.points.filter((p) => p.secsToPost >= asOfSecs);
    const at = points[points.length - 1];
    if (!at || at.secsToPost - asOfSecs > CHECKPOINT_TOLERANCE_S) return [];
    s = { ...s, points };
  }
  const last = s.points[s.points.length - 1];
  const earlier = last ? pointAt(s.points, last.secsToPost + RECENT_SECS) : null;
  if (!last || !earlier || earlier === last) return [];
  return movers(s)
    .flatMap((m) => {
      const before = earlier.win[m.horseNo], now = last.win[m.horseNo];
      if (m.recent == null || !(m.recent > PLACE_SURGE) || !before || !now) return [];
      return [{ horseNo: m.horseNo, name: m.name, before, now, change: m.recent, placeNow: last.pla[m.horseNo] ?? null }];
    })
    .sort((a, b) => b.change - a.change)
    .slice(0, PLACE_MAX);
}

/** Place picks at TRIO_UNIT each: cost, and the PLA dividends collected (null until Place dividends are posted). */
export function placeResult(horses: number[], dividends?: RaceSeries["dividends"]) {
  const pla = (dividends ?? []).filter((d) => d.pool === "PLA");
  const set = new Set(horses.map(String));
  return {
    cost: horses.length * TRIO_UNIT,
    return: pla.length ? pla.filter((d) => set.has(d.comb)).reduce((a, d) => a + d.div, 0) : null,
  };
}

/** One row of the analyzer's ranking (tools/analyze-race.ts), best first. */
export interface ModelRank {
  horseNo: number;
  name: string;
  winProb: number;
  placeProb: number;
}

export const MODEL_PICKS = 5; // analyzer's top N by win probability
export const MOVE_PICKS = 5; // top N by Move (first snapshot → latest)
export const COMBINED_MOVE_PICKS = 3; // Combined (Trio box) takes only the Move top 3, to keep the box small

/** Top MOVE_PICKS by the last-RECENT_SECS move (Mover.recent), biggest first; empty until ~5 min of snapshots exist. */
export const recentTop = (mv: Mover[]): Mover[] =>
  mv
    .filter((m) => m.recent != null)
    .sort((a, b) => b.recent! - a.recent!)
    .slice(0, MOVE_PICKS);

export interface Picks {
  model: ModelRank[]; // analyzer top MODEL_PICKS still in the race
  move: Mover[]; // biggest steamers by Move
  combined: { horseNo: number; name: string; inModel: boolean; inMove: boolean }[]; // union: both first
  /** model picks left out of Combined because the market is strongly against them (bucket "Strong drift") */
  drifted: number[];
}

/**
 * Analyzer top 5 + Move top 5; Combined = model top 5 (minus Strong drift) ∪ Move top 3. Horses no longer priced (scratched)
 * are skipped. `inMove` = in the Move top 5 (so ★ marks a model pick the market is also backing).
 */
export function suggestPicks(model: ModelRank[], mv: Mover[]): Picks {
  const running = new Set(mv.filter((m) => m.now != null).map((m) => m.horseNo));
  const top = model.filter((r) => running.size === 0 || running.has(r.horseNo)).slice(0, MODEL_PICKS);
  const move = mv
    .filter((m) => m.momentum != null)
    .sort((a, b) => b.momentum! - a.momentum!)
    .slice(0, MOVE_PICKS);
  // A model pick in Strong drift (market share down ≥25%) stays in the model list but is left out of Combined.
  const drifted = top.filter((r) => mv.find((m) => m.horseNo === r.horseNo)?.bucket === "Strong drift").map((r) => r.horseNo);
  const keep = top.filter((r) => !drifted.includes(r.horseNo));
  const inModel = new Set(keep.map((r) => r.horseNo)), inMove = new Set(move.map((m) => m.horseNo));
  const names = new Map([...mv.map((m) => [m.horseNo, m.name] as const), ...top.map((r) => [r.horseNo, r.name] as const)]);
  // Model picks first (model rank order), then market-move picks not already listed (move order).
  const combined = [...new Set([...keep.map((r) => r.horseNo), ...move.slice(0, COMBINED_MOVE_PICKS).map((m) => m.horseNo)])].map((h) => ({
    horseNo: h,
    name: names.get(h) ?? "",
    inModel: inModel.has(h),
    inMove: inMove.has(h),
  }));
  return { model: top, move, combined, drifted };
}

/** Site-wide banner: the featured race (next to run, else the last run) and its Combined picks. */
export interface Highlight {
  mode: "upcoming" | "last";
  race: { raceId: string; date: string; venue: "ST" | "HV"; raceNo: number; postTime: string | null; name: string | null };
  picks: { horseNo: number; code: string | null; name: string; nameZh: string | null; both: boolean; marketOnly: boolean; odds: number | null; finishPos: number | null }[];
  /** First three (dead-heats included) when mode = "last" and results are in; else []. */
  placed: { horseNo: number; finishPos: number }[];
}

/** One race in the racing-day review (Momentum → Summary). */
export interface DaySummaryRace {
  raceId: string;
  raceNo: number;
  postTime: string | null;
  /** "result" once a winner is known */
  status: "pending" | "result";
  /** first three (dead-heats included) */
  placed: { horseNo: number; finishPos: number; code: string | null; name: string; nameZh: string | null }[];
  /** Combined picks (model top N, then market-move picks) as of the cut-off, as on the race page */
  picks: { horseNo: number; both: boolean; marketOnly: boolean; code: string | null; name: string; nameZh: string | null }[];
  /** the two source lists, best first (horse numbers): model top N and market-move top N */
  modelList: number[];
  moveList: number[];
  /** market-move top N over the last 5 min up to the cut-off only (Mover.recent), best first */
  recentList: number[];
  /** finishing position of every runner with a result, by horse number */
  finishPos: Record<number, number>;
  /** how the Combined list did; null until there is a result */
  combined: PickHits | null;
  /** the model's top pick and where it finished (null = no result yet / no ranking) */
  modelTop: { horseNo: number; finishPos: number | null } | null;
  /** official Trio dividend per $10 (first one on a dead-heat); null if not posted */
  trioDiv: number | null;
  /** Place picks (win-market move > PLACE_SURGE in the 5 min up to the cut-off), biggest move first */
  place: { horseNo: number; change: number; code: string | null; name: string; nameZh: string | null }[];
  /** $10 each to place; return = PLA dividends collected, null until posted */
  placeCost: number;
  placeReturn: number | null;
  /** Place rule judged at each PLACE_MINUTES checkpoint; picks empty when nothing qualified or no snapshot then */
  placeByMinute: { min: number; picks: number[]; cost: number; return: number | null }[];
}
export interface DaySummary {
  date: string;
  venue: string;
  races: DaySummaryRace[];
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
  name: string;
  nameZh: string | null;
  finishPos: number;
  sp: number; // final win odds (starting price)
  pFinal: number; // normalised implied win prob at the off (from SP)
  pPlaceFinal: number | null; // market-implied place prob (last snapshot place odds, scaled to 3 places)
  plaDiv: number | null; // official Place dividend per $1 (0 = didn't place); null until the race's Place dividends are posted
  mom: Partial<Record<Window, number>>; // momentum from checkpoint W (min before post; negative = after) to the off
  prob: Partial<Record<Window, number>>; // normalised implied win prob at checkpoint W (same field as mom)
  odds: Partial<Record<Window, number>>; // win odds at checkpoint W
  placeProb: Partial<Record<Window, number>>; // market place chance at checkpoint W (place odds, normalised, × places paid)
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
  /** Place chance per horse from a snapshot's place odds, same normalisation as pPlaceFinal. */
  const placeChance = (pla: Record<number, number>) => {
    const p = impliedProbs(Object.fromEntries(finishers.filter((r) => pla[r.horseNo]).map((r) => [r.horseNo, pla[r.horseNo]!])));
    return Object.fromEntries(Object.entries(p).map(([h, v]) => [h, Math.min(1, v * places)])) as Record<number, number>;
  };

  const pts = Object.fromEntries(WINDOWS.map((w) => [w, pointAt(s.points, w * 60)])) as Record<Window, SeriesPoint | null>;
  const placeAt = Object.fromEntries(WINDOWS.map((w) => [w, pts[w] ? placeChance(pts[w]!.pla) : null])) as Record<Window, Record<number, number> | null>;
  // Checkpoint probs are normalised over the SAME finishing field, so scratchings don't skew them.
  const checkpoints = Object.fromEntries(
    WINDOWS.map((w) => {
      const pt = pts[w];
      if (!pt) return [w, null];
      const odds = Object.fromEntries(finishers.filter((r) => pt.win[r.horseNo]).map((r) => [r.horseNo, pt.win[r.horseNo]!]));
      return [w, Object.keys(odds).length === finishers.length ? impliedProbs(odds) : null];
    })
  ) as Record<Window, Record<number, number> | null>;

  const runner = new Map(s.runners.map((x) => [x.horseNo, x]));
  const pla = (s.dividends ?? []).filter((d) => d.pool === "PLA");
  return finishers.map((r) => {
    const mom: Partial<Record<Window, number>> = {};
    const prob: Partial<Record<Window, number>> = {};
    const odds: Partial<Record<Window, number>> = {};
    const placeProb: Partial<Record<Window, number>> = {};
    for (const w of WINDOWS) {
      const p0 = checkpoints[w]?.[r.horseNo];
      if (p0) {
        mom[w] = (pFinal[r.horseNo]! - p0) / p0;
        prob[w] = p0;
      }
      const o = pts[w]?.win[r.horseNo];
      if (o) odds[w] = o;
      const pp = placeAt[w]?.[r.horseNo];
      if (pp) placeProb[w] = pp;
    }
    return {
      raceId: s.raceId,
      date: s.date,
      venue: s.venue,
      horseNo: r.horseNo,
      name: runner.get(r.horseNo)?.name ?? "",
      nameZh: runner.get(r.horseNo)?.nameZh ?? null,
      finishPos: r.finishPos!,
      sp: r.sp!,
      pFinal: pFinal[r.horseNo]!,
      pPlaceFinal: pPla[r.horseNo] != null ? Math.min(1, pPla[r.horseNo]! * places) : null,
      plaDiv: pla.length ? (pla.find((d) => d.comb === String(r.horseNo))?.div ?? 0) / 10 : null,
      mom,
      prob,
      odds,
      placeProb,
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
  placeRoi: number; // flat level-stake place bet at the official dividend, % return (rows with dividends posted)
  placeBets: number; // rows placeRoi is over
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
  const paid = rows.filter((r) => r.plaDiv != null);
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
    placeRoi: paid.length ? (100 * (paid.reduce((s, r) => s + r.plaDiv!, 0) - paid.length)) / paid.length : NaN,
    placeBets: paid.length,
  };
}

/** A table row: its stats plus the runners behind them (for drill-down). */
export type Group = BucketStats & { rows: HorseRow[] };
const group = (key: string, rows: HorseRow[]): Group => ({ ...stats(key, rows), rows });

/** Hit rate by momentum bucket, grouping runners by `move`. Rows it can't measure are excluded. */
export function byBucket(rows: HorseRow[], move: MoveOf): Group[] {
  const m = rows.map((r) => [r, move(r)] as const).filter((x): x is readonly [HorseRow, number] => x[1] != null);
  return BUCKETS.map((b) => group(b, m.filter(([, v]) => bucketOf(v) === b).map(([r]) => r)));
}

/** Move steps for the place-edge chart: 10% wide, open-ended past −30% / +30%. */
export const EDGE_CUTS = [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3] as const;

/**
 * Group runners by move into ranges split at `cuts` (ascending fractions): below the first cut,
 * each [cut, next cut), and from the last cut up. Keys read "< −30%", "−30% ~ −20%" … "≥ +30%".
 */
export function byMoveRange(rows: HorseRow[], move: MoveOf, cuts: readonly number[] = EDGE_CUTS): RangeGroup[] {
  const pct = (x: number) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(Math.round(x * 100))}%`;
  const m = rows.map((r) => [r, move(r)] as const).filter((x): x is readonly [HorseRow, number] => x[1] != null);
  const edges = [-Infinity, ...cuts, Infinity];
  return edges.slice(0, -1).map((lo, i) => {
    const hi = edges[i + 1]!;
    const key = lo === -Infinity ? `< ${pct(hi)}` : hi === Infinity ? `≥ ${pct(lo)}` : `${pct(lo)} ~ ${pct(hi)}`;
    return { ...group(key, m.filter(([, v]) => v >= lo && v < hi).map(([r]) => r)), lo, hi };
  });
}
export type RangeGroup = Group & { lo: number; hi: number };


/** How a runner's move is measured for grouping; null = not measurable (row left out). */
export type MoveOf = (r: HorseRow) => number | null;

/** Relative change in implied win prob from checkpoint `from` to a later checkpoint `to`; null if either is missing. */
export function moveBetween(r: HorseRow, from: Window, to: Window): number | null {
  const a = r.prob[from], b = r.prob[to];
  return a && b ? (b - a) / a : null;
}

/**
 * Steamers you could actually have backed: implied win prob up ≥ BUCKET_MILD from `from` to `to`
 * (`to` later than `from`), judged only on odds known by `to`. Paid at final odds, as HK pools do.
 */
export function bettableSteamers(rows: HorseRow[], from: Window, to: Window): HorseRow[] {
  return rows.filter((r) => (moveBetween(r, from, to) ?? -Infinity) >= BUCKET_MILD);
}
