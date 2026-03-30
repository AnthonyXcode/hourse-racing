/**
 * RaceCardHistoryScraper
 *
 * Persists and reloads race card snapshots (data/racecards/).
 * Saving a race card right after scraping preserves race-day ratings,
 * draw, weight and odds so post-meeting analysis stays accurate.
 */

import { format } from "date-fns";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type {
  Race,
  RaceEntry,
  Venue,
} from "../types/index.js";

/** Serialisable snapshot of a race card + win odds, saved right after scraping. */
interface SavedRaceCard {
  race: Race & { date: string };
  winOdds: Record<string, number>;
}

export class RaceCardHistoryScraper {
  private raceCardDir: string;

  constructor() {
    this.raceCardDir = path.join(process.cwd(), "data", "racecards");
  }

  /**
   * Save a Race object (+ optional win odds) so it can be reloaded after
   * the live race card page is no longer available.
   * File: data/racecards/racecard_YYYYMMDD_VV_RN.json
   */
  async saveRaceCard(
    race: Race,
    winOdds?: Map<number, number>
  ): Promise<string> {
    if (!existsSync(this.raceCardDir)) {
      await mkdir(this.raceCardDir, { recursive: true });
    }

    const oddsObj: Record<string, number> = {};
    if (winOdds) {
      for (const [num, odds] of winOdds) {
        oddsObj[String(num)] = odds;
      }
    }

    const payload: SavedRaceCard = {
      race: {
        ...race,
        date: race.date instanceof Date
          ? race.date.toISOString()
          : String(race.date),
      } as SavedRaceCard["race"],
      winOdds: oddsObj,
    };

    const filePath = this.buildRaceCardPath(race.date, race.venue, race.raceNumber);
    await writeFile(filePath, JSON.stringify(payload, null, 2));
    return filePath;
  }

  /**
   * Load a previously saved race card snapshot.
   * Returns null if no saved file exists.
   */
  async loadSavedRaceCard(
    date: Date,
    venue: Venue,
    raceNumber: number
  ): Promise<{ race: Race; winOddsMap: Map<number, number> } | null> {
    const filePath = this.buildRaceCardPath(date, venue, raceNumber);
    if (!existsSync(filePath)) return null;

    try {
      const raw = await readFile(filePath, "utf-8");
      const saved = JSON.parse(raw) as SavedRaceCard;

      const race: Race = {
        ...saved.race,
        date: new Date(saved.race.date),
        entries: saved.race.entries.map((e: RaceEntry) => ({
          ...e,
          horse: {
            ...e.horse,
            pastPerformances: (e.horse.pastPerformances ?? []).map(
              (pp) => ({ ...pp, date: new Date(pp.date) })
            ),
          },
        })),
      } as Race;

      const winOddsMap = new Map<number, number>();
      for (const [num, odds] of Object.entries(saved.winOdds)) {
        winOddsMap.set(Number(num), odds);
      }

      return { race, winOddsMap };
    } catch {
      return null;
    }
  }

  private buildRaceCardPath(date: Date | string, venue: Venue | string, raceNumber: number): string {
    const venueCode = String(venue).includes("Happy") ? "HV" : (String(venue).includes("Sha") ? "ST" : venue);
    const d = date instanceof Date ? date : new Date(date);
    const dateStr = format(d, "yyyyMMdd");
    return path.join(this.raceCardDir, `racecard_${dateStr}_${venueCode}_R${raceNumber}.json`);
  }
}
