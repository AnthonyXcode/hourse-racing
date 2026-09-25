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

/** Pick the race: tracked race with the earliest post time still ahead → first race of the next meeting
 *  with racecards → latest tracked race already run → last race of the latest racecard meeting. */
export function chooseRace(repo: Repo, now: Date): { mode: Highlight["mode"]; date: string; venue: "ST" | "HV"; raceNo: number; postTime: string | null; tracked: RaceRow | null } | null {
  const t = now.getTime();
  const tracked = repo.allRaces().filter((r) => r.venue === "ST" || r.venue === "HV");
  const ahead = tracked.filter((r) => Date.parse(r.post_time) > t).sort((a, b) => Date.parse(a.post_time) - Date.parse(b.post_time))[0];
  if (ahead) return { mode: "upcoming", date: ahead.date, venue: ahead.venue as "ST" | "HV", raceNo: ahead.race_no, postTime: ahead.post_time, tracked: ahead };

  const today = hkDate(now);
  const meetings = races().meetings(); // newest first
  const next = [...meetings].reverse().find((m) => m.date > today);
  if (next) return { mode: "upcoming", date: next.date, venue: next.venue, raceNo: next.races[0] ?? 1, postTime: null, tracked: null };

  const run = tracked
    .filter((r) => Date.parse(r.post_time) <= t && repo.snapshotCount(r.race_id) > 0)
    .sort((a, b) => Date.parse(b.post_time) - Date.parse(a.post_time))[0];
  if (run) return { mode: "last", date: run.date, venue: run.venue as "ST" | "HV", raceNo: run.race_no, postTime: run.post_time, tracked: run };

  const lastMeeting = meetings[0];
  if (lastMeeting) {
    const raceNo = lastMeeting.races[lastMeeting.races.length - 1] ?? 1;
    return { mode: "last", date: lastMeeting.date, venue: lastMeeting.venue, raceNo, postTime: null, tracked: null };
  }
  return null;
}

export async function highlight(repo: Repo, now = new Date()): Promise<Highlight | null> {
  if (cache && now.getTime() - cache.at < TTL_MS) return cache.value;
  const pick = chooseRace(repo, now);
  let value: Highlight | null = null;
  if (pick) {
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
        odds: odds.get(c.horseNo) ?? null,
        finishPos: fin.get(c.horseNo) ?? null,
      })),
      placed: pick.mode === "last" && series ? series.results.filter((r) => r.finishPos != null && r.finishPos <= 3).sort((a, b) => a.finishPos! - b.finishPos!).map((r) => ({ horseNo: r.horseNo, finishPos: r.finishPos! })) : [],
    };
  }
  cache = { at: now.getTime(), value };
  return value;
}
