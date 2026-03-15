/**
 * HorseDataEnricher – loads historical race results and enriches
 * upcoming race entries with past‐performance data so the
 * FormAnalyzer and MonteCarloSimulator can use real form.
 */

import { readdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import type {
  Race,
  RaceEntry,
  RaceResult,
  PastPerformance,
  Horse,
  Venue,
  TrackSurface,
  Going,
  RaceClass,
} from "../types/index.js";

// ============================================================================
// TYPES
// ============================================================================

interface HorseRecord {
  name: string;
  performances: PastPerformance[];
}

interface DataSummary {
  totalRaces: number;
  totalHorses: number;
  dateRange: { from: string; to: string } | null;
}

// ============================================================================
// ENRICHER
// ============================================================================

export interface HorseDataEnricherOptions {
  dataDir?: string;
  /** If set, skip any file whose name contains any of these strings (e.g. ["20260315", "HV"]). */
  ignoreFilePatterns?: string[];
}

export class HorseDataEnricher {
  private horseIndex: Map<string, HorseRecord> = new Map();
  private totalRaces = 0;
  private dataDir: string;
  private ignoreFilePatterns: string[];

  constructor(options?: string | HorseDataEnricherOptions) {
    if (options === undefined || typeof options === "string") {
      this.dataDir = options ?? join(process.cwd(), "data", "historical");
      this.ignoreFilePatterns = [];
    } else {
      this.dataDir = options.dataDir ?? join(process.cwd(), "data", "historical");
      this.ignoreFilePatterns = options.ignoreFilePatterns ?? [];
    }
  }

  // --------------------------------------------------------------------------
  // Load historical JSON files from data/historical/
  // --------------------------------------------------------------------------

  async loadHistoricalData(): Promise<void> {
    if (!existsSync(this.dataDir)) {
      console.log("  No historical data directory found – skipping enrichment");
      return;
    }

    const files = await readdir(this.dataDir);
    let jsonFiles = files.filter((f) => f.endsWith(".json"));
    if (this.ignoreFilePatterns.length > 0) {
      jsonFiles = jsonFiles.filter(
        (f) => !this.ignoreFilePatterns.some((p) => f.includes(p))
      );
    }

    for (const file of jsonFiles) {
      try {
        const raw = await readFile(join(this.dataDir, file), "utf-8");
        const data = JSON.parse(raw);

        // Support both array‐of‐results and single‐result files
        const results: any[] = Array.isArray(data) ? data : [data];

        for (const result of results) {
          if (!result.finishOrder || result.finishOrder.length === 0) continue;
          this.indexRaceResult(result);
        }
      } catch {
        // Skip files that can't be parsed
        continue;
      }
    }
  }

  // --------------------------------------------------------------------------
  // Index a single race result into horseIndex
  // --------------------------------------------------------------------------

  /**
   * Normalize horse name for indexing/lookup so that "SMART FIGHTER" and
   * "SMART FIGHTER (AUS)" map to the same key and all performances are merged.
   */
  private normalizeHorseKey(name: string): string {
    const trimmed = name.trim().toUpperCase();
    if (!trimmed) return trimmed;
    // Strip trailing " (COUNTRY)" or " (XX)" so variants match
    const match = trimmed.match(/^(.+?)\s*\([A-Z]{2,3}\)$/);
    return match?.[1]?.trim() ?? trimmed;
  }

  private indexRaceResult(result: any): void {
    this.totalRaces++;

    const raceDate = new Date(result.date);
    const venue: Venue = result.venue ?? "Sha Tin";
    const raceClass: RaceClass = result.class ?? "Class 4";
    const distance: number = result.distance ?? 1200;
    const surface: TrackSurface = result.surface ?? "Turf";
    const going: Going = result.going ?? "Good";
    const raceNumber: number = result.raceNumber ?? 1;
    const fieldSize: number =
      result.finishOrder?.length ?? result.entries?.length ?? 12;

    for (const finish of result.finishOrder ?? []) {
      const horseName: string = (
        finish.horseName ??
        finish.horse?.name ??
        ""
      )
        .trim()
        .toUpperCase();

      if (!horseName) continue;

      const key = this.normalizeHorseKey(horseName);

      const perf: PastPerformance = {
        date: raceDate,
        venue,
        raceNumber,
        raceClass,
        distance,
        surface,
        going,
        draw: finish.draw ?? 0,
        weight: finish.weight ?? 133,
        jockeyCode: finish.jockeyCode ?? finish.jockeyName ?? "",
        finishPosition: finish.finishPosition ?? 0,
        fieldSize,
        winningMargin: finish.winningMargin ?? finish.margin ?? 0,
        finishTime: finish.finishTime ?? finish.time ?? 0,
        speedRating: finish.speedRating,
        odds: finish.winOdds ?? finish.odds ?? 0,
        comment: finish.comment,
      };

      let record = this.horseIndex.get(key);
      if (!record) {
        record = { name: key, performances: [] };
        this.horseIndex.set(key, record);
      }
      record.performances.push(perf);
    }
  }

  // --------------------------------------------------------------------------
  // Enrich a Race's entries with past performances from the index
  // --------------------------------------------------------------------------

  /**
   * @param formVenue - If "all", use HV + ST records. If a venue, use only that venue's records.
   */
  enrichRace(race: Race, options?: { formVenue?: Venue | "all" }): Race {
    const formVenue = options?.formVenue ?? "all";

    const enrichedEntries: RaceEntry[] = race.entries.map((entry) => {
      const key = this.normalizeHorseKey(entry.horse.name);
      const record = this.horseIndex.get(key);

      if (!record || record.performances.length === 0) {
        return entry as unknown as RaceEntry;
      }

      // Merge existing past performances with historical data (dedup by date+venue+race)
      const existing = new Set(
        entry.horse.pastPerformances.map(
          (p) =>
            `${new Date(p.date).toISOString()}-${p.venue}-${p.raceNumber}`
        )
      );

      const newPerfs = record.performances.filter(
        (p) =>
          !existing.has(
            `${new Date(p.date).toISOString()}-${p.venue}-${p.raceNumber}`
          )
      );

      const allPerfs = [
        ...entry.horse.pastPerformances,
        ...newPerfs,
      ].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      const pastPerformances =
        formVenue === "all"
          ? allPerfs
          : allPerfs.filter((p) => p.venue === formVenue);

      const enrichedHorse: Horse = {
        ...entry.horse,
        pastPerformances,
      };

      return { ...entry, horse: enrichedHorse } as unknown as RaceEntry;
    });

    return { ...race, entries: enrichedEntries } as unknown as Race;
  }

  // --------------------------------------------------------------------------
  // Summary
  // --------------------------------------------------------------------------

  getDataSummary(): DataSummary {
    return {
      totalRaces: this.totalRaces,
      totalHorses: this.horseIndex.size,
      dateRange: null, // Optional: could compute from data
    };
  }
}
