/**
 * Form Analysis Module
 *
 * Analyzes horse form factors including:
 * - Recent form (position patterns)
 * - Class indicators (rising/dropping)
 * - Jockey/trainer performance
 * - Draw bias
 * - Surface/going preference
 * - Distance preference
 * - Fitness/freshness
 */

import { differenceInDays } from "date-fns";
import type {
  Horse,
  Jockey,
  Trainer,
  Race,
  RaceEntry,
  HorseAnalysis,
  Venue,
  TrackSurface,
  Going,
  RaceClass,
  PastPerformance,
} from "../types/index.js";
import {
  calculateFormScore,
  parseFormString,
} from "../utils/index.js";
import { SpeedRatingCalculator } from "./speedRating.js";

// ============================================================================
// DRAW BIAS DATA
// Based on historical analysis of HKJC races
// Positive = advantage, Negative = disadvantage
// ============================================================================

type DrawBiasData = Record<number, Record<number, number>>;

const DRAW_BIAS: Record<Venue, Record<TrackSurface, DrawBiasData>> = {
  "Sha Tin": {
    Turf: {
      // Distance -> Draw -> Bias adjustment
      1000: {
        1: 0.08, 2: 0.06, 3: 0.05, 4: 0.04, 5: 0.02,
        6: 0.01, 7: 0, 8: -0.01, 9: -0.02, 10: -0.03,
        11: -0.04, 12: -0.05, 13: -0.06, 14: -0.07,
      },
      1200: {
        1: 0.06, 2: 0.05, 3: 0.04, 4: 0.03, 5: 0.02,
        6: 0.01, 7: 0, 8: -0.01, 9: -0.01, 10: -0.02,
        11: -0.03, 12: -0.03, 13: -0.04, 14: -0.05,
      },
      1400: {
        1: 0.04, 2: 0.03, 3: 0.02, 4: 0.02, 5: 0.01,
        6: 0, 7: 0, 8: 0, 9: -0.01, 10: -0.01,
        11: -0.02, 12: -0.02, 13: -0.03, 14: -0.03,
      },
      1600: {
        1: 0.02, 2: 0.02, 3: 0.01, 4: 0.01, 5: 0,
        6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
        11: -0.01, 12: -0.01, 13: -0.02, 14: -0.02,
      },
      // Longer distances - minimal bias
      1800: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [i + 1, 0])),
      2000: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [i + 1, 0])),
      2400: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [i + 1, 0])),
    },
    AWT: {
      // AWT at Sha Tin - more balanced
      1200: Object.fromEntries(
        Array.from({ length: 14 }, (_, i) => [i + 1, i < 7 ? 0.02 : -0.02])
      ),
      1650: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [i + 1, 0])),
    },
  },
  "Happy Valley": {
    Turf: {
      // Happy Valley - tight track, outside draws can be better
      1000: {
        1: -0.02, 2: -0.01, 3: 0, 4: 0.01, 5: 0.02,
        6: 0.03, 7: 0.03, 8: 0.02, 9: 0.01, 10: 0,
        11: -0.01, 12: -0.02,
      },
      1200: {
        1: -0.01, 2: 0, 3: 0.01, 4: 0.02, 5: 0.02,
        6: 0.02, 7: 0.02, 8: 0.01, 9: 0, 10: -0.01,
        11: -0.02, 12: -0.03,
      },
      1650: {
        1: 0, 2: 0.01, 3: 0.01, 4: 0.01, 5: 0.01,
        6: 0, 7: 0, 8: 0, 9: -0.01, 10: -0.01,
        11: -0.01, 12: -0.02,
      },
      1800: Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i + 1, 0])),
      2200: Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i + 1, 0])),
    },
    AWT: {},
  },
};

// ============================================================================
// CLASS RATING MAPPING
// ============================================================================

const CLASS_RATINGS: Record<RaceClass, number> = {
  "Group 1": 120,
  "Group 2": 115,
  "Group 3": 110,
  "Class 1": 100,
  "Class 2": 90,
  "Class 3": 80,
  "Class 4": 70,
  "Class 5": 60,
  Griffin: 55,
  Handicap: 85, // Average
};

// ============================================================================
// FORM ANALYZER CLASS
// ============================================================================

export class FormAnalyzer {
  private speedCalculator: SpeedRatingCalculator;

  constructor() {
    this.speedCalculator = new SpeedRatingCalculator();
  }

  /**
   * Analyze a horse's form for an upcoming race
   */
  analyzeHorse(horse: Horse, race: Race, entry: RaceEntry): HorseAnalysis {
    const speedFigures = this.speedCalculator.calculateHorseSpeedFigures(horse);

    const analysis: HorseAnalysis = {
        horseCode: horse.code,
        horseName: horse.name,
        averageSpeedRating: this.speedCalculator.getAverageSpeedRating(speedFigures),
        bestSpeedRating: this.speedCalculator.getBestSpeedRating(speedFigures),
        lastSpeedRating: this.speedCalculator.getLastSpeedRating(speedFigures),
        formScore: this.calculateFormScore(horse),
        classIndicator: this.calculateClassIndicator(horse, race.class),
        daysSinceLastRace: this.calculateDaysSinceLastRace(horse, race.date),
        drawAdvantage: this.calculateDrawAdvantage(
          entry.draw,
          race.venue,
          race.surface,
          race.distance
        ),
        jockeyEdge: this.calculateJockeyEdge(entry.jockey, race),
        trainerForm: this.calculateTrainerForm(entry.trainer),
        surfacePreference: this.calculateSurfacePreference(horse, race.surface),
        goingPreference: this.calculateGoingPreference(horse, race.going),
        distancePreference: this.calculateDistancePreference(horse, race.distance),
        ratingMomentum: this.calculateRatingMomentum(horse, race),
        overallRating: 0, // Will be calculated below
    }


    return analysis;
  }

  /**
   * Calculate composite overall rating
   */
  calculateOverallRating(analysis: HorseAnalysis): number {
    // Weights for each factor (must sum to 1)
    const weights = {
      speedRating: 0.35,
      formScore: 0.13,
      classIndicator: 0.06,
      ratingMomentum: 0.06,
      fitness: 0.10,
      drawAdvantage: 0.08,
      jockeyEdge: 0.08,
      trainerForm: 0.05,
      surfacePreference: 0.03,
      goingPreference: 0.03,
      distancePreference: 0.03,
    };

    // Normalize speed rating to 0-1 scale (60-120 range)
    const normalizedSpeed = (analysis.averageSpeedRating - 60) / 60;

    // Fitness score based on days since last race
    const fitnessScore = this.calculateFitnessScore(analysis.daysSinceLastRace);

    // Class indicator normalized (-5 to +5 -> 0 to 1)
    const normalizedClass = (analysis.classIndicator + 5) / 10;

    // Rating momentum normalized (-1 to 1 -> 0 to 1)
    const normalizedMomentum = (analysis.ratingMomentum + 1) / 2;

    // Calculate weighted sum
    const rating =
      normalizedSpeed * weights.speedRating +
      analysis.formScore * weights.formScore +
      normalizedClass * weights.classIndicator +
      normalizedMomentum * weights.ratingMomentum +
      fitnessScore * weights.fitness +
      (analysis.drawAdvantage + 0.1) * 5 * weights.drawAdvantage +
      (analysis.jockeyEdge + 0.1) * 5 * weights.jockeyEdge +
      analysis.trainerForm * weights.trainerForm +
      (analysis.surfacePreference + 1) / 2 * weights.surfacePreference +
      (analysis.goingPreference + 1) / 2 * weights.goingPreference +
      (analysis.distancePreference + 1) / 2 * weights.distancePreference;

    // Scale to 0-100
    return Math.round(rating * 100);
  }

  /**
   * Calculate form score from recent finishes
   */
  private calculateFormScore(horse: Horse): number {
    const recentPerfs = horse.pastPerformances.slice(0, 6);
    if (recentPerfs.length === 0) return 0.5;

    const positions = recentPerfs.map((p) => p.finishPosition);
    const fieldSizes = recentPerfs.map((p) => p.fieldSize);

    return calculateFormScore(positions, fieldSizes);
  }

  /**
   * Calculate class indicator (positive = dropping, negative = rising).
   * Uses the actual HKJC handicap rating when available for intra-class differentiation.
   */
  private calculateClassIndicator(horse: Horse, targetClass: RaceClass): number {
    const targetClassRating = CLASS_RATINGS[targetClass];

    // If we have the actual HKJC rating and past performances, use both
    if (horse.currentRating > 0 && horse.pastPerformances.length > 0) {
      const recentPerfs = horse.pastPerformances.slice(0, 3);
      const avgRecentClass =
        recentPerfs.reduce((sum, p) => sum + CLASS_RATINGS[p.raceClass], 0) /
        recentPerfs.length;

      // Blend: class-level drop/rise + intra-class position
      // A high-rated horse in a class (e.g., Rtg 59 in C4 60-40) is at the top — disadvantaged by weight
      // A low-rated horse (e.g., Rtg 40 in C4 60-40) carries less weight — advantaged
      const classComponent = (avgRecentClass - targetClassRating) / 10;

      // Intra-class: lower rating relative to class midpoint = advantage (less weight)
      const classMid = targetClassRating - 5; // e.g., C4(70) → midpoint ~65, mapped to Rtg ~50
      const ratingAdvantage = (classMid - horse.currentRating) / 20;

      return classComponent * 0.6 + ratingAdvantage * 0.4;
    }

    if (horse.pastPerformances.length === 0) return 0;

    const recentPerfs = horse.pastPerformances.slice(0, 3);
    const avgRecentClass =
      recentPerfs.reduce((sum, p) => sum + CLASS_RATINGS[p.raceClass], 0) /
      recentPerfs.length;

    return (avgRecentClass - targetClassRating) / 10;
  }

  /**
   * Calculate rating momentum from the handicapper's Rtg.+/- and the horse's
   * position within its class. Returns -1 to 1.
   *
   * Positive Rtg.+/- means the handicapper raised the rating (horse improving).
   * But a large rise also means more weight, so there's a diminishing return.
   * Negative Rtg.+/- means the handicapper dropped the rating (horse declining),
   * but this also gives a weight relief advantage.
   */
  private calculateRatingMomentum(horse: Horse, race: Race): number {
    const change = horse.ratingChange;

    // No rating change data available
    if (change === undefined) return 0;

    // Large positive change (+5 to +10): horse improving, but now carrying more weight
    // → net positive but tapered (improving form > weight penalty)
    // Moderate positive (+1 to +4): mildly positive
    // Zero: neutral
    // Moderate negative (-1 to -4): declining form, but getting weight relief
    // → net slightly negative (form decline > weight benefit)
    // Large negative (-5 to -10): strongly declining
    // → negative (even weight relief can't overcome poor form)

    if (change > 0) {
      // Positive: improving form signal. Taper effect at high values (weight penalty).
      // +1 → ~0.15, +5 → ~0.55, +8 → ~0.70, +10 → ~0.75
      return Math.min(1, change * 0.1 * (1 - change * 0.005));
    }
    // Negative: declining form. Small drops slightly buffered by weight relief.
    // -1 → ~-0.07, -2 → ~-0.16, -5 → ~-0.50, -10 → ~-1.0
    return Math.max(-1, change * 0.1);
  }

  /**
   * Calculate days since last race
   */
  private calculateDaysSinceLastRace(horse: Horse, raceDate: Date): number {
    if (horse.pastPerformances.length === 0) return 365; // First-timer

    const lastRace = horse.pastPerformances[0]!;
    return differenceInDays(raceDate, lastRace.date);
  }

  /**
   * Calculate fitness score based on days since last race
   * Optimal: 14-35 days
   */
  private calculateFitnessScore(days: number): number {
    if (days >= 14 && days <= 35) return 1.0;
    if (days >= 7 && days < 14) return 0.85;
    if (days > 35 && days <= 60) return 0.80;
    if (days > 60 && days <= 90) return 0.65;
    if (days > 90 && days <= 180) return 0.50;
    if (days > 180) return 0.35;
    if (days < 7) return 0.70; // Backing up quickly
    return 0.5;
  }

  /**
   * Calculate draw advantage based on historical bias
   */
  private calculateDrawAdvantage(
    draw: number,
    venue: Venue,
    surface: TrackSurface,
    distance: number
  ): number {
    const venueBias = DRAW_BIAS[venue];
    if (!venueBias) return 0;

    const surfaceBias = venueBias[surface];
    if (!surfaceBias) return 0;

    // Find closest distance
    const distances = Object.keys(surfaceBias).map(Number);
    if (distances.length === 0) return 0;
    const closestDistance = distances.reduce((prev, curr) =>
      Math.abs(curr - distance) < Math.abs(prev - distance) ? curr : prev
    );

    const distanceBias = surfaceBias[closestDistance];
    if (!distanceBias) return 0;

    return distanceBias[draw] ?? 0;
  }

  /**
   * Calculate jockey edge compared to field average
   */
  private calculateJockeyEdge(jockey: Jockey, race: Race): number {
    // Base on season win rate vs field average
    const baseWinRate = 0.08; // Average jockey win rate ~8%
    const jockeyWinRate = jockey.seasonStats.winRate;

    let edge = jockeyWinRate - baseWinRate;

    // Check for course-specific stats
    const courseStats = jockey.courseStats.find(
      (cs) =>
        cs.venue === race.venue &&
        (!cs.surface || cs.surface === race.surface) &&
        (!cs.distance || Math.abs(cs.distance - race.distance) <= 200)
    );

    if (courseStats && courseStats.rides >= 10) {
      // Weight course stats more heavily
      edge = edge * 0.5 + (courseStats.winRate - baseWinRate) * 0.5;
    }

    // Clamp to reasonable range
    return Math.max(-0.1, Math.min(0.15, edge));
  }

  /**
   * Calculate trainer recent form
   */
  private calculateTrainerForm(trainer: Trainer): number {
    // Normalize win rate to 0-1 scale
    // Average trainer win rate is ~8%, good trainers 12-15%
    const winRate = trainer.seasonStats.winRate;
    const normalizedForm = Math.min(1, winRate / 0.15);

    // Consider place rate too
    const placeRate = trainer.seasonStats.placeRate;
    const normalizedPlace = Math.min(1, placeRate / 0.40);

    return normalizedForm * 0.7 + normalizedPlace * 0.3;
  }

  /**
   * Calculate surface preference (-1 to 1)
   */
  private calculateSurfacePreference(
    horse: Horse,
    targetSurface: TrackSurface
  ): number {
    const perfs = horse.pastPerformances;
    if (perfs.length < 3) return 0;

    const surfacePerfs = perfs.filter((p) => p.surface === targetSurface);
    const otherPerfs = perfs.filter((p) => p.surface !== targetSurface);

    if (surfacePerfs.length === 0) return -0.3; // Unknown surface
    if (otherPerfs.length === 0) return 0.2; // Only run on this surface

    // Compare average positions
    const surfaceAvgPos =
      surfacePerfs.slice(0, 5).reduce((sum, p) => sum + p.finishPosition, 0) /
      Math.min(5, surfacePerfs.length);
    const otherAvgPos =
      otherPerfs.slice(0, 5).reduce((sum, p) => sum + p.finishPosition, 0) /
      Math.min(5, otherPerfs.length);

    // Lower position = better, so positive preference if surface pos is lower
    const preference = (otherAvgPos - surfaceAvgPos) / 5;
    return Math.max(-1, Math.min(1, preference));
  }

  /**
   * Calculate going preference (-1 to 1)
   */
  private calculateGoingPreference(horse: Horse, targetGoing: Going): number {
    const perfs = horse.pastPerformances;
    if (perfs.length < 3) return 0;

    // Group going conditions
    const isFirmGoing = (g: Going) =>
      ["Firm", "Good to Firm", "Good"].includes(g);
    const targetIsFirm = isFirmGoing(targetGoing);

    const matchingPerfs = perfs.filter(
      (p) => isFirmGoing(p.going) === targetIsFirm
    );
    const otherPerfs = perfs.filter((p) => isFirmGoing(p.going) !== targetIsFirm);

    if (matchingPerfs.length === 0) return -0.2;
    if (otherPerfs.length === 0) return 0.1;

    const matchAvgPos =
      matchingPerfs.slice(0, 5).reduce((sum, p) => sum + p.finishPosition, 0) /
      Math.min(5, matchingPerfs.length);
    const otherAvgPos =
      otherPerfs.slice(0, 5).reduce((sum, p) => sum + p.finishPosition, 0) /
      Math.min(5, otherPerfs.length);

    const preference = (otherAvgPos - matchAvgPos) / 5;
    return Math.max(-1, Math.min(1, preference));
  }

  /**
   * Calculate distance preference (-1 to 1)
   */
  private calculateDistancePreference(
    horse: Horse,
    targetDistance: number
  ): number {
    const perfs = horse.pastPerformances;
    if (perfs.length < 3) return 0;

    // Within 200m = matching distance
    const matchingPerfs = perfs.filter(
      (p) => Math.abs(p.distance - targetDistance) <= 200
    );
    const otherPerfs = perfs.filter(
      (p) => Math.abs(p.distance - targetDistance) > 200
    );

    if (matchingPerfs.length === 0) {
      // Check if going longer or shorter
      const avgPrevDist =
        perfs.slice(0, 3).reduce((sum, p) => sum + p.distance, 0) / 3;
      if (targetDistance > avgPrevDist + 300) return -0.2; // Going up significantly
      if (targetDistance < avgPrevDist - 300) return -0.1; // Dropping significantly
      return 0;
    }

    if (otherPerfs.length === 0) return 0.2;

    const matchAvgPos =
      matchingPerfs.slice(0, 5).reduce((sum, p) => sum + p.finishPosition, 0) /
      Math.min(5, matchingPerfs.length);
    const otherAvgPos =
      otherPerfs.slice(0, 5).reduce((sum, p) => sum + p.finishPosition, 0) /
      Math.min(5, otherPerfs.length);

    const preference = (otherAvgPos - matchAvgPos) / 5;
    return Math.max(-1, Math.min(1, preference));
  }

  /**
   * Analyze all entries for a race
   */
  analyzeRace(race: Race): HorseAnalysis[] {
    const analyses: HorseAnalysis[] = [];

    for (const entry of race.entries) {
      if (entry.isScratched) continue;

      const analysis = this.analyzeHorse(entry.horse, race, entry);
      const overallRating = this.calculateOverallRating(analysis);

      analyses.push({
        ...analysis,
        overallRating,
      });
    }

    // Sort by overall rating (highest first)
    return analyses.sort((a, b) => b.overallRating - a.overallRating);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const formAnalyzer = new FormAnalyzer();

/**
 * Convenience function to analyze a race
 */
export function analyzeRace(race: Race): HorseAnalysis[] {
  return formAnalyzer.analyzeRace(race);
}

/**
 * Convenience function to analyze a single horse
 */
export function analyzeHorse(
  horse: Horse,
  race: Race,
  entry: RaceEntry
): HorseAnalysis {
  return formAnalyzer.analyzeHorse(horse, race, entry);
}
