/**
 * JSON-safe view of a RaceAnalysisResult for API consumers:
 * Maps → fields, Dates → strings, runners without past-performance history.
 */

import { format } from "date-fns";
import { venueCode, type RaceAnalysisResult } from "./raceAnalysis.js";

export type RaceAnalysisJson = ReturnType<typeof toRaceAnalysisJson>;

// Saved snapshots revive `date` but not `postTime`, so it can arrive as a string
function toIsoOrNull(value: Date | string | undefined): string | null {
  if (value === undefined) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function toRaceAnalysisJson(result: RaceAnalysisResult) {
  const { race, winOdds, placeOdds, recommendation } = result;

  return {
    race: {
      id: race.id,
      date: format(race.date, "yyyy-MM-dd"),
      venue: race.venue,
      venueCode: venueCode(race.venue),
      raceNumber: race.raceNumber,
      name: race.name ?? null,
      class: race.class,
      distance: race.distance,
      surface: race.surface,
      going: race.going,
      prizeMoney: race.prizeMoney,
      raceType: race.raceType ?? null,
      postTime: toIsoOrNull(race.postTime),
    },
    config: result.config,
    runners: race.entries.map((e) => ({
      horseNumber: e.horseNumber,
      horseCode: e.horse.code,
      horseName: e.horse.name,
      horseNameChinese: e.horse.nameChinese ?? null,
      draw: e.draw,
      weight: e.weight,
      currentRating: e.horse.currentRating,
      ratingChange: e.horse.ratingChange ?? null,
      gear: e.horse.gear ?? [],
      isScratched: e.isScratched,
      winOdds: winOdds.get(e.horseNumber) ?? null,
      placeOddsEstimate: placeOdds.get(e.horseNumber) ?? null,
      formRecordCount: e.horse.pastPerformances.length,
      jockey: {
        code: e.jockey.code,
        name: e.jockey.name,
        weightClaim: e.jockey.weightClaim,
        seasonStats: e.jockey.seasonStats,
      },
      trainer: {
        code: e.trainer.code,
        name: e.trainer.name,
        seasonStats: e.trainer.seasonStats,
      },
    })),
    simulation: {
      runs: result.simulationRuns,
      avgDifferentiation: result.avgDifferentiation,
      closeDiffCount: result.closeDiffCount,
      sparseFormCount: result.sparseFormCount,
      horses: result.rankings.map(({ simulation: s, analysis, ratingDiff }) => ({
        horseNumber: s.horseNumber,
        horseCode: s.horseCode,
        horseName: s.horseName,
        winProbability: s.winProbability,
        placeProbability: s.placeProbability,
        expectedPosition: s.expectedPosition,
        positionStdDev: s.positionStdDev,
        formRecordCount: s.formRecordCount,
        overallRating: analysis?.overallRating ?? null,
        ratingDiff: analysis ? ratingDiff : null,
      })),
    },
    analysis: result.analyses,
    recommendations: {
      bets: recommendation.recommendations,
      totalRecommendedStake: recommendation.totalRecommendedStake,
      topPicks: recommendation.topPicks,
    },
    exotics: result.topExotics,
    finishTimes: result.finishTimes,
    marketEfficiency: result.marketEfficiency,
  };
}
