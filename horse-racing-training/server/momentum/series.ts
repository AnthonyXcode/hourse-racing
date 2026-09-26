// Rebuild a race's odds time-series (and result, once settled) from the momentum DB.
import { races } from "../dataIndex";
import type { Repo } from "./db";
import type { RaceSeries, SeriesPoint } from "../../shared/momentum/model";

export function raceSeries(repo: Repo, raceId: string): RaceSeries | null {
  const race = repo.race(raceId);
  if (!race) return null;
  const points: SeriesPoint[] = [];
  for (const row of repo.series(raceId)) {
    let p = points[points.length - 1];
    if (!p || p.fetchedAt !== row.fetched_at) {
      p = {
        fetchedAt: row.fetched_at,
        respondedAt: row.responded_at,
        hkjcUpdatedAt: row.hkjc_updated_at,
        secsToPost: row.secs_to_post, winPool: row.win_pool, plaPool: row.pla_pool, win: {}, pla: {} };
      points.push(p);
    }
    if (row.win_odds != null) p.win[row.horse_no] = row.win_odds;
    if (row.pla_odds != null) p.pla[row.horse_no] = row.pla_odds;
  }
  // The odds feed carries no Chinese names; the racecard's horse codes let the client look them up.
  const card = races().card({ date: race.date, venue: race.venue as "ST" | "HV", raceNo: race.race_no });
  const entries = (card?.race.entries ?? []) as { horseNumber: number; horse?: { code?: string } }[];
  const codeOf = new Map(entries.map((e) => [e.horseNumber, e.horse?.code ?? null]));
  return {
    raceId,
    date: race.date,
    venue: race.venue,
    raceNo: race.race_no,
    postTime: race.post_time,
    status: race.status,
    runners: repo.runners(raceId).map((r) => ({ horseNo: r.horse_no, name: r.name, nameZh: r.name_zh, code: codeOf.get(r.horse_no) ?? null })),
    points,
    results: repo.results(raceId).map((r) => ({ horseNo: r.horse_no, finishPos: r.finish_pos, sp: r.sp_win })),
    dividends: repo.dividends(raceId).map((d) => ({ pool: d.pool, comb: d.win_comb, div: d.dividend })),
  };
}
