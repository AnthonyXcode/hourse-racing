// Turn a stored racecard document into the engine's Race object — the same transform as the parent
// repo's loadRaceCard (src/backtest/differentiationBacktest.ts), minus the file read:
// race.date and every pastPerformances[].date become Date objects, winOdds becomes a Map.
import type { CardDoc } from "./raceStore";

type PP = Record<string, unknown> & { date: string | Date };
type DocEntry = { horse: { pastPerformances?: PP[] } & Record<string, unknown> } & Record<string, unknown>;

export function buildRace<R = unknown>(doc: CardDoc): { race: R; winOddsMap: Map<number, number> } | null {
  try {
    const saved = doc.race as unknown as { date: string; entries: DocEntry[] } & Record<string, unknown>;
    const race = {
      ...saved,
      date: new Date(saved.date),
      entries: saved.entries.map((e) => ({
        ...e,
        horse: {
          ...e.horse,
          pastPerformances: (e.horse.pastPerformances ?? []).map((pp) => ({ ...pp, date: new Date(pp.date) })),
        },
      })),
    } as unknown as R;
    const winOddsMap = new Map<number, number>();
    for (const [num, odds] of Object.entries(doc.winOdds ?? {})) winOddsMap.set(Number(num), odds);
    return { race, winOddsMap };
  } catch {
    return null;
  }
}
