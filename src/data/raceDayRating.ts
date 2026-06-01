/**
 * Resolve race-day currentRating and ratingChange from a horse profile form table.
 *
 * - currentRating: Rtg. carried into the target race (speedRating on that form row).
 * - ratingChange: that rating minus the Rtg. from the horse's previous race (not today's rating).
 */

import { format } from "date-fns";
import type { PastPerformance } from "../types/index.js";

export interface RaceDayRating {
  currentRating: number;
  ratingChange?: number;
}

function dateKey(d: Date): string {
  return format(new Date(d), "yyyy-MM-dd");
}

/**
 * Find the form row for the target race and derive ratings.
 * Returns null if the race row or its Rtg. cannot be found.
 */
export function resolveRaceDayRatingFromProfile(
  pastPerformances: readonly PastPerformance[],
  raceDate: Date,
  raceNumber: number
): RaceDayRating | null {
  if (pastPerformances.length === 0) return null;

  const targetKey = dateKey(raceDate);

  let matchingIdx = pastPerformances.findIndex(
    (pp) => dateKey(pp.date) === targetKey && pp.raceNumber === raceNumber
  );
  if (matchingIdx < 0) {
    matchingIdx = pastPerformances.findIndex(
      (pp) => dateKey(pp.date) === targetKey
    );
  }
  if (matchingIdx < 0) return null;

  const raceDayPP = pastPerformances[matchingIdx]!;
  if (raceDayPP.speedRating === undefined) return null;

  const currentRating = raceDayPP.speedRating;

  // Form table is newest-first; the previous race is the next row with a Rtg.
  let ratingChange: number | undefined;
  for (let i = matchingIdx + 1; i < pastPerformances.length; i++) {
    const prev = pastPerformances[i]!;
    if (prev.speedRating !== undefined) {
      ratingChange = currentRating - prev.speedRating;
      break;
    }
  }

  return {
    currentRating,
    ...(ratingChange !== undefined ? { ratingChange } : {}),
  };
}
