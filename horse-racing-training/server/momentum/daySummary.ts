// Racing-day review for Momentum → Summary: every race's Combined picks and how they did.
// Uses the same pick logic as the race page (suggestPicks + pickResults), computed server-side so the
// page makes one request instead of two per race. Upcoming days come from the racecards (all pending).
import { movers, pickResults, suggestPicks, type DaySummary, type DaySummaryRace, type ModelRank, type RaceSeries } from "../../shared/momentum/model";
import { races } from "../dataIndex";
import type { Repo } from "./db";
import { modelRanks } from "./picks";
import { raceSeries } from "./series";
import { cardRaces, cardSeries } from "./upcoming";

const TTL_MS = 30_000;
const cache = new Map<string, { at: number; value: DaySummary | null }>();

async function summarise(series: RaceSeries): Promise<DaySummaryRace> {
  const card = races().card({ date: series.date, venue: series.venue as "ST" | "HV", raceNo: series.raceNo });
  const entries = (card?.race.entries ?? []) as { horseNumber: number; horse?: { code?: string; name?: string } }[];
  const codeOf = new Map(entries.map((e) => [e.horseNumber, e.horse?.code ?? null]));
  const runner = new Map(series.runners.map((r) => [r.horseNo, r]));
  const who = (h: number) => ({
    code: codeOf.get(h) ?? null,
    name: runner.get(h)?.name ?? entries.find((e) => e.horseNumber === h)?.horse?.name ?? "",
    nameZh: runner.get(h)?.nameZh ?? null,
  });

  let ranks: ModelRank[] = [];
  try {
    ranks = await modelRanks(series.date, series.venue as "ST" | "HV", series.raceNo);
  } catch {
    // no saved racecard: market moves only
  }
  const picks = suggestPicks(ranks, movers(series));
  const res = pickResults(picks, series.results, series.dividends);
  const fin = new Map(series.results.map((r) => [r.horseNo, r.finishPos]));
  const top = ranks[0];
  return {
    raceId: series.raceId,
    raceNo: series.raceNo,
    postTime: series.postTime,
    status: res ? "result" : "pending",
    placed: (res?.placed ?? []).map((p) => ({ horseNo: p.horseNo, finishPos: p.finishPos!, ...who(p.horseNo) })),
    picks: picks.combined.map((c) => ({ horseNo: c.horseNo, both: c.inModel && c.inMove, marketOnly: c.inMove && !c.inModel, ...who(c.horseNo) })),
    modelList: picks.model.map((r) => r.horseNo),
    moveList: picks.move.map((m) => m.horseNo),
    finishPos: Object.fromEntries(series.results.filter((r) => r.finishPos != null).map((r) => [r.horseNo, r.finishPos!])),
    combined: res?.lists[2] ?? null,
    modelTop: top ? { horseNo: top.horseNo, finishPos: res ? (fin.get(top.horseNo) ?? null) : null } : null,
    trioDiv: series.dividends?.find((d) => d.pool === "TRI")?.div ?? null,
  };
}

export async function daySummary(repo: Repo, date: string, now = Date.now()): Promise<DaySummary | null> {
  const hit = cache.get(date);
  if (hit && now - hit.at < TTL_MS) return hit.value;
  const tracked = repo.racesOn(date).filter((r) => r.post_time.slice(0, 10) === date);
  const ids = tracked.length ? tracked.map((r) => r.race_id) : cardRaces(date).map((r) => r.race_id);
  const out: DaySummaryRace[] = [];
  for (const id of ids) {
    const s = raceSeries(repo, id) ?? cardSeries(id);
    if (s) out.push(await summarise(s));
  }
  out.sort((a, b) => a.raceNo - b.raceNo);
  const venue = tracked[0]?.venue ?? cardRaces(date)[0]?.venue ?? "";
  const value = out.length ? { date, venue, races: out } : null;
  cache.set(date, { at: now, value });
  return value;
}
