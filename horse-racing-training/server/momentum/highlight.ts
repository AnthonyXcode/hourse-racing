// The race featured in the site-wide banner, with its Combined picks (model top N ∪ market-move top N,
// exactly what the Momentum page shows). Next race still to run if there is one, else the last one run.
import { movers, suggestPicks, type Highlight, type ModelRank } from "../../shared/momentum/model";
import { races } from "../dataIndex";
import type { RaceRow, Repo } from "./db";
import { modelRanks } from "./picks";
import { hkDate } from "./poller";
import { raceSeries } from "./series";

const TTL_MS = 30_000;
let cache: { at: number; value: Highlight | null } | null = null;

type Candidate = { mode: Highlight["mode"]; date: string; venue: "ST" | "HV"; raceNo: number; postTime: string | null; tracked: RaceRow | null };

/**
 * Races the banner could feature, best first: tracked races still to run (earliest first) → races of the
 * next racecard meeting → tracked races already run (latest first) → last race of the latest racecard
 * meeting. The banner shows the first one that actually has picks (a race needs a saved racecard for the
 * model, or recorded odds for the market moves).
 */
export function raceCandidates(repo: Repo, now: Date): Candidate[] {
  const t = now.getTime();
  const tracked = repo.allRaces().filter((r) => r.venue === "ST" || r.venue === "HV");
  const trackedById = new Map(tracked.map((r) => [r.race_id, r]));
  const out: Candidate[] = [];
  const seen = new Set<string>();
  const add = (c: Candidate) => {
    const id = `${c.date}-${c.venue}-${c.raceNo}`;
    if (seen.has(id)) return;
    seen.add(id);
    const row = c.tracked ?? trackedById.get(id) ?? null; // racecard race that the poller also knows: use its post time
    out.push({ ...c, tracked: row, postTime: c.postTime ?? row?.post_time ?? null });
  };
  const toCand = (r: RaceRow, mode: Highlight["mode"]): Candidate => ({ mode, date: r.date, venue: r.venue as "ST" | "HV", raceNo: r.race_no, postTime: r.post_time, tracked: r });

  tracked
    .filter((r) => Date.parse(r.post_time) > t)
    .sort((a, b) => Date.parse(a.post_time) - Date.parse(b.post_time))
    .forEach((r) => add(toCand(r, "upcoming")));

  const today = hkDate(now);
  const meetings = races().meetings(); // newest first
  const next = [...meetings].reverse().find((m) => m.date > today || (m.date === today && !tracked.some((r) => r.date === today)));
  next?.races.forEach((raceNo) => add({ mode: "upcoming", date: next.date, venue: next.venue, raceNo, postTime: null, tracked: null }));

  tracked
    .filter((r) => Date.parse(r.post_time) <= t && repo.snapshotCount(r.race_id) > 0)
    .sort((a, b) => Date.parse(b.post_time) - Date.parse(a.post_time))
    .forEach((r) => add(toCand(r, "last")));

  const last = meetings.find((m) => m.date <= today);
  if (last) add({ mode: "last", date: last.date, venue: last.venue, raceNo: last.races[last.races.length - 1] ?? 1, postTime: null, tracked: null });
  return out;
}

/** The first candidate (tests / callers that only need the choice, not the picks). */
export const chooseRace = (repo: Repo, now: Date): Candidate | null => raceCandidates(repo, now)[0] ?? null;

const MAX_TRIES = 15; // bound the work if many races have no card and no odds

export async function highlight(repo: Repo, now = new Date()): Promise<Highlight | null> {
  if (cache && now.getTime() - cache.at < TTL_MS) return cache.value;
  let value: Highlight | null = null;
  for (const pick of raceCandidates(repo, now).slice(0, MAX_TRIES)) {
    const raceId = `${pick.date}-${pick.venue}-${pick.raceNo}`;
    const series = pick.tracked ? raceSeries(repo, pick.tracked.race_id) : null;
    const mv = series ? movers(series) : [];
    let ranks: ModelRank[] = [];
    try {
      ranks = await modelRanks(pick.date, pick.venue, pick.raceNo);
    } catch {
      // no saved racecard for this race: market moves only
    }
    const { combined } = suggestPicks(ranks, mv);
    if (!combined.length) continue; // no racecard and no odds yet: try the next candidate
    const zh = new Map(series?.runners.map((r) => [r.horseNo, r.nameZh]) ?? []);
    const odds = new Map(mv.map((m) => [m.horseNo, m.now]));
    const fin = new Map(series?.results.map((r) => [r.horseNo, r.finishPos]) ?? []);
    const card = races().card({ date: pick.date, venue: pick.venue, raceNo: pick.raceNo });
    const entries = (card?.race.entries ?? []) as { horseNumber: number; horse?: { code?: string } }[];
    const codes = new Map(entries.map((e) => [e.horseNumber, e.horse?.code ?? null]));
    value = {
      mode: pick.mode,
      race: { raceId, date: pick.date, venue: pick.venue, raceNo: pick.raceNo, postTime: pick.postTime, name: typeof card?.race.name === "string" ? card.race.name : null },
      picks: combined.map((c) => ({
        horseNo: c.horseNo,
        code: codes.get(c.horseNo) ?? null,
        name: c.name,
        nameZh: zh.get(c.horseNo) ?? null,
        both: c.inModel && c.inMove,
        marketOnly: c.inMove && !c.inModel,
        odds: odds.get(c.horseNo) ?? null,
        finishPos: fin.get(c.horseNo) ?? null,
      })),
      placed: pick.mode === "last" && series ? series.results.filter((r) => r.finishPos != null && r.finishPos <= 3).sort((a, b) => a.finishPos! - b.finishPos!).map((r) => ({ horseNo: r.horseNo, finishPos: r.finishPos! })) : [],
    };
    break;
  }
  cache = { at: now.getTime(), value };
  return value;
}
