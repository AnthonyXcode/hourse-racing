// Home "Records": for one racing day, every settled race with the model's top 3 picks, the actual top 3
// and whether the picks hit (win = winner among the top 3; place = at least one of them in the top 3).
// Same per-race rules as the Top-3-pick cards (summary.ts top3).
import { FIN, HNUM, MC, PLACED, WON, isSettled, type AnalyzerPayload } from "../../shared/analyzer/model";
import type { HomeRecordDay, HomeRecordRace } from "../../shared/types";

interface CardRunner {
  horseNumber: number;
  horse?: { code?: string; name?: string };
}

export interface RecordsDeps {
  /** The analyzer for one day (it caches per race, so this is cheap after the summary has run). */
  run: (from: string, to: string) => Promise<AnalyzerPayload>;
  /** Saved racecard runners for a race (names + HKJC codes), or null. */
  runners: (date: string, venue: string, raceNo: number) => CardRunner[] | null;
}

export async function recordsFor(d: RecordsDeps, date: string): Promise<HomeRecordDay> {
  const payload = await d.run(date, date);
  const races: HomeRecordRace[] = payload.races
    .filter((r) => r.d === date && isSettled(r))
    .sort((a, b) => a.v.localeCompare(b.v) || a.r - b.r)
    .map((r) => {
      const byNum = new Map((d.runners(r.d, r.v, r.r) ?? []).map((e) => [e.horseNumber, e.horse ?? {}]));
      const horse = (num: number) => ({ num, name: byNum.get(num)?.name ?? `#${num}`, code: byNum.get(num)?.code ?? null });
      const picks = r.h
        .filter((h) => h[MC] >= 1 && h[MC] <= 3)
        .sort((a, b) => a[MC] - b[MC])
        .map((h) => ({ rank: h[MC], ...horse(h[HNUM]), fin: h[FIN] > 0 ? h[FIN] : null, won: !!h[WON], placed: !!h[PLACED] }));
      const top3 = r.h
        .filter((h) => h[FIN] >= 1 && h[FIN] <= 3)
        .sort((a, b) => a[FIN] - b[FIN] || a[HNUM] - b[HNUM])
        .map((h) => ({ pos: h[FIN], ...horse(h[HNUM]), picked: h[MC] >= 1 && h[MC] <= 3 }));
      return { venue: r.v, raceNo: r.r, picks, top3, win: picks.some((p) => p.won), place: picks.some((p) => p.placed) };
    });
  return {
    date,
    races,
    winHits: races.filter((r) => r.win).length,
    placeHits: races.filter((r) => r.place).length,
  };
}
