// Upcoming meetings the odds poller hasn't picked up yet (it only learns a meeting's races on race day),
// built from the saved racecards so the Momentum page can show them — runners and model picks, no odds yet.
import type { RaceSeries } from "../../shared/momentum/model";
import { races } from "../dataIndex";

const RACE_ID = /^(\d{4}-\d{2}-\d{2})-(ST|HV)-(\d{1,2})$/;

/** "2026-09-27-ST-3" → its parts, or null. */
export function parseRaceId(id: string): { date: string; venue: "ST" | "HV"; raceNo: number } | null {
  const m = RACE_ID.exec(id);
  return m ? { date: m[1]!, venue: m[2] as "ST" | "HV", raceNo: Number(m[3]) } : null;
}

/** Racecard meetings on or after `today` that aren't tracked yet, shaped like MomentumDayRef. */
export function upcomingDays(today: string, trackedDates: Set<string>) {
  return races()
    .meetings()
    .filter((m) => m.date >= today && !trackedDates.has(m.date))
    .map((m) => ({ date: m.date, venue: m.venue, races: m.races.length, snapshots: 0, upcoming: true }));
}

/** An untracked day's races from its racecards (post times unknown until race day). */
export function cardRaces(date: string) {
  return races()
    .meetings()
    .filter((m) => m.date === date)
    .flatMap((m) =>
      m.races.map((raceNo) => ({
        race_id: `${date}-${m.venue}-${raceNo}`,
        date,
        venue: m.venue,
        race_no: raceNo,
        post_time: null as string | null,
        status: "scheduled" as const,
        hkjc_status: null as string | null,
        settled_at: null as string | null,
        snapshots: 0,
      }))
    );
}

/** A race known only from its racecard: runners, no odds points or results yet. */
export function cardSeries(raceId: string): RaceSeries | null {
  const k = parseRaceId(raceId);
  if (!k) return null;
  const card = races().card(k);
  if (!card) return null;
  const entries = (card.race.entries ?? []) as { horseNumber: number; isScratched?: boolean; horse?: { name?: string } }[];
  return {
    raceId,
    date: k.date,
    venue: k.venue,
    raceNo: k.raceNo,
    postTime: null,
    status: "scheduled",
    runners: entries
      .filter((e) => e.horseNumber > 0 && !e.isScratched)
      .sort((a, b) => a.horseNumber - b.horseNumber)
      .map((e) => ({ horseNo: e.horseNumber, name: e.horse?.name ?? "", nameZh: null })),
    points: [],
    results: [],
    dividends: [],
  };
}
