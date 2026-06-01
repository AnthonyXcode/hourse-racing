#!/usr/bin/env tsx
/**
 * Fix currentRating and ratingChange on saved racecards using horse profile form tables.
 *
 * - currentRating: Rtg. on the race day (not today's profile rating)
 * - ratingChange: race-day Rtg minus the previous race's Rtg
 *
 * Usage:
 *   npx tsx tools/fix-rating.ts 2025-12...2026-01
 *   npx tsx tools/fix-rating.ts 2025-12-01...2026-01-31
 */

import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { Horse, PastPerformance, Race, RaceEntry } from "../src/types/index.js";
import { resolveRaceDayRatingFromProfile } from "../src/data/raceDayRating.js";
import { loadRaceCard } from "../src/backtest/differentiationBacktest.js";
import { HorseProfileScraper } from "../src/scrapers/horseProfile.js";
import {
  listRacecardsInYmdRange,
  parseYmdRangeSpec,
} from "../src/utils/racecardDateRange.js";

interface SavedRaceCard {
  race: Race & { date: string };
  winOdds: Record<string, number>;
}

async function saveRaceCardFile(
  filePath: string,
  race: Race,
  winOdds: Record<string, number>
): Promise<void> {
  const payload: SavedRaceCard = {
    race: {
      ...race,
      date:
        race.date instanceof Date
          ? race.date.toISOString()
          : String(race.date),
    } as SavedRaceCard["race"],
    winOdds,
  };
  await writeFile(filePath, JSON.stringify(payload, null, 2));
}

function patchHorseRating(
  horse: Horse,
  profilePerformances: readonly PastPerformance[],
  raceDate: Date,
  raceNumber: number
): { horse: Horse; updated: boolean; resolved: boolean } {
  const resolved = resolveRaceDayRatingFromProfile(
    profilePerformances,
    raceDate,
    raceNumber
  );
  if (!resolved) {
    return { horse, updated: false, resolved: false };
  }

  const changed =
    horse.currentRating !== resolved.currentRating ||
    horse.ratingChange !== resolved.ratingChange;

  const { ratingChange: _old, ...horseRest } = horse;
  const next: Horse = {
    ...horseRest,
    currentRating: resolved.currentRating,
    ...(resolved.ratingChange !== undefined
      ? { ratingChange: resolved.ratingChange }
      : {}),
  };

  return { horse: next, updated: changed, resolved: true };
}

async function main(): Promise<void> {
  const rangeSpec = process.argv[2];
  if (!rangeSpec || rangeSpec === "--help" || rangeSpec === "-h") {
    console.log(`
fix-rating — update currentRating / ratingChange on saved racecards

Usage:
  npx tsx tools/fix-rating.ts <date-range>

Date range:
  YYYY-MM...YYYY-MM
  YYYY-MM-DD...YYYY-MM-DD

Example:
  npx tsx tools/fix-rating.ts 2025-12...2026-01
`);
    process.exit(rangeSpec ? 0 : 1);
  }

  const range = parseYmdRangeSpec(rangeSpec);
  const files = await listRacecardsInYmdRange(range);
  if (files.length === 0) {
    console.log(`No racecards found between ${range.startYmd} and ${range.endYmd}.`);
    return;
  }

  console.log(
    `Fixing ratings on ${files.length} racecard(s) (${range.startYmd}–${range.endYmd})...\n`
  );

  const horseScraper = new HorseProfileScraper({ headless: true });
  const profileCache = new Map<string, readonly PastPerformance[]>();

  let filesUpdated = 0;
  let entriesUpdated = 0;
  let entriesResolved = 0;
  let entriesMissing = 0;

  try {
    await horseScraper.init();

    for (const filePath of files) {
      const loaded = await loadRaceCard(filePath);
      if (!loaded) {
        console.warn(`[SKIP] Could not load ${path.basename(filePath)}`);
        continue;
      }

      const { race, winOddsMap } = loaded;
      let fileChanged = false;
      const entries = [...race.entries] as RaceEntry[];

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]!;
        const code = entry.horse.code;
        if (!code) continue;

        let performances = profileCache.get(code);
        if (!performances) {
          try {
            const profile = await horseScraper.scrapeHorseProfile(code);
            performances = profile.pastPerformances;
            profileCache.set(code, performances);
          } catch (err) {
            console.warn(
              `  [WARN] ${path.basename(filePath)} #${entry.horseNumber} ${entry.horse.name}: profile fetch failed (${err instanceof Error ? err.message : err})`
            );
            entriesMissing++;
            continue;
          }
        }

        const { horse, updated, resolved } = patchHorseRating(
          entry.horse,
          performances,
          race.date,
          race.raceNumber
        );
        entries[i] = { ...entry, horse };
        if (resolved) entriesResolved++;
        else entriesMissing++;
        if (updated) {
          entriesUpdated++;
          fileChanged = true;
        }
      }

      if (fileChanged) {
        const raw = await readFile(filePath, "utf-8");
        const saved = JSON.parse(raw) as SavedRaceCard;
        const winOdds =
          Object.keys(saved.winOdds ?? {}).length > 0
            ? saved.winOdds
            : Object.fromEntries(winOddsMap.entries());

        await saveRaceCardFile(
          filePath,
          { ...race, entries } as Race,
          winOdds
        );
        filesUpdated++;
        console.log(`✓ ${path.basename(filePath)}`);
      }
    }
  } finally {
    await horseScraper.close();
  }

  console.log("\n" + "─".repeat(50));
  console.log(`Files scanned:   ${files.length}`);
  console.log(`Files updated:   ${filesUpdated}`);
  console.log(`Entries fixed:   ${entriesUpdated}`);
  console.log(`Entries rated:   ${entriesResolved}`);
  console.log(`Entries missed:  ${entriesMissing}`);
  console.log(`Profiles cached: ${profileCache.size}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
