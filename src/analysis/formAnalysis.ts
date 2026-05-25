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
import {
  CLASS_RATINGS,
  DRAW_BIAS,
  getOverallRatingWeights,
  type OverallRatingWeights,
} from "./formAnalysisConfig.js";

export type { OverallRatingWeights } from "./formAnalysisConfig.js";
export {
  CLASS_RATINGS,
  DRAW_BIAS,
  getOverallRatingWeights,
  WEIGHT_BIAS,
  WEIGHT_BIAS_FALLBACK,
} from "./formAnalysisConfig.js";

function fitnessScoreFromDays(days: number): number {
  if (days >= 14 && days <= 35) return 1.0;
  if (days >= 7 && days < 14) return 0.85;
  if (days > 35 && days <= 60) return 0.8;
  if (days > 60 && days <= 90) return 0.65;
  if (days > 90 && days <= 180) return 0.5;
  if (days > 180) return 0.35;
  if (days < 7) return 0.7;
  return 0.5;
}

export function computeOverallRatingWithWeights(
  analysis: HorseAnalysis,
  weights: OverallRatingWeights
): number {
  const normalizedSpeed = Math.max(0, Math.min(1, (analysis.averageSpeedRating - 60) / 60));
  const normalizedClass = (analysis.classIndicator + 5) / 10;
  const normalizedMomentum = (analysis.ratingMomentum + 1) / 2;
  const fitnessScore = fitnessScoreFromDays(analysis.daysSinceLastRace);

  const rating =
    normalizedSpeed * weights.speedRating +
    analysis.formScore * weights.formScore +
    normalizedClass * weights.classIndicator +
    normalizedMomentum * weights.ratingMomentum +
    fitnessScore * weights.fitness +
    (analysis.drawAdvantage + 0.1) * 5 * weights.drawAdvantage +
    (analysis.jockeyEdge + 0.1) * 5 * weights.jockeyEdge +
    analysis.trainerForm * weights.trainerForm +
    ((analysis.surfacePreference + 1) / 2) * weights.surfacePreference +
    ((analysis.goingPreference + 1) / 2) * weights.goingPreference +
    ((analysis.distancePreference + 1) / 2) * weights.distancePreference;

  return Math.round(rating * 100);
}

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
        formRecordCount: horse.pastPerformances?.length ?? 0,
        overallRating: 0,
    }


    return analysis;
  }

  /**
   * Composite overall rating — weights from venue × surface × distance;
   * draw gate bias is in DRAW_BIAS only.
   */
  calculateOverallRating(
    analysis: HorseAnalysis,
    venue?: Venue,
    surface?: TrackSurface,
    _raceClass?: RaceClass,
    distance?: number
  ): number {
    const weights = getOverallRatingWeights(
      venue ?? "Sha Tin",
      surface ?? "Turf",
      distance,
      _raceClass
    );
    return computeOverallRatingWithWeights(analysis, weights);
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
   * Returns true for Group 1/2/3 races.
   * Group races use weight-for-age / penalty systems, not the Class 1-5 rating bands.
   */
  private isGroupClass(cls: RaceClass): boolean {
    return cls === "Group 1" || cls === "Group 2" || cls === "Group 3";
  }

  /**
   * Calculate class indicator (positive = dropping, negative = rising).
   * Uses the actual HKJC handicap rating when available for intra-class
   * differentiation — except for Group races, where the rating band concept
   * does not apply (weight-for-age / penalties system).
   * Return value is clamped to [-5, +5] so calculateOverallRating normalises
   * correctly regardless of the size of the class jump.
   *
   * Distressed dropper check: a horse that recently raced at a higher class but
   * consistently finished in the bottom 40% of those fields is an involuntary
   * dropper (handicapper demoted them). The naive "dropping in class = good"
   * bonus is heavily discounted for these horses.
   */
  private calculateClassIndicator(horse: Horse, targetClass: RaceClass): number {
    const targetClassRating = CLASS_RATINGS[targetClass];

    // If we have the actual HKJC rating and past performances, use both
    if (horse.currentRating > 0 && horse.pastPerformances.length > 0) {
      const recentPerfs = horse.pastPerformances.slice(0, 3);
      const avgRecentClass =
        recentPerfs.reduce((sum, p) => sum + CLASS_RATINGS[p.raceClass], 0) /
        recentPerfs.length;

      let classComponent = (avgRecentClass - targetClassRating) / 10;

      // Intra-class rating advantage only applies to Class 1-5 (rating band races).
      // Group 1/2/3 races use weight-for-age — skip the rating-band component.
      if (this.isGroupClass(targetClass)) {
        return Math.max(-5, Math.min(5, classComponent));
      }

      // Distressed dropper adjustment: discount the class-drop bonus when the
      // horse was performing poorly in the higher class it just came from.
      classComponent = this.adjustForDistressedDropper(classComponent, recentPerfs, targetClassRating);

      // Class 1-5: blend class-level drop/rise with intra-class weight position.
      // A high-rated horse (e.g., Rtg 59 in C4 60-40) carries more weight → disadvantaged.
      // A low-rated horse (e.g., Rtg 40 in C4 60-40) carries less weight → advantaged.
      const classMid = targetClassRating - 5; // e.g., C4(70) → midpoint ~65, mapped to Rtg ~50
      const ratingAdvantage = (classMid - horse.currentRating) / 20;

      return Math.max(-5, Math.min(5, classComponent * 0.6 + ratingAdvantage * 0.4));
    }

    if (horse.pastPerformances.length === 0) return 0;

    const recentPerfs = horse.pastPerformances.slice(0, 3);
    const avgRecentClass =
      recentPerfs.reduce((sum, p) => sum + CLASS_RATINGS[p.raceClass], 0) /
      recentPerfs.length;

    let classComponent = (avgRecentClass - targetClassRating) / 10;
    classComponent = this.adjustForDistressedDropper(classComponent, recentPerfs, targetClassRating);

    return Math.max(-5, Math.min(5, classComponent));
  }

  /**
   * Discount the class-drop bonus for "distressed droppers" — horses that were
   * recently racing at a higher class level but consistently finishing in the
   * bottom 40% of those fields. This indicates an involuntary demotion by the
   * handicapper rather than a strategic placement, and the horse is unlikely
   * to dominate simply by virtue of the lower class level.
   *
   * Only applies when classComponent > 0 (horse is dropping in class) and at
   * least 2 of the recent runs were at the higher class level.
   */
  private adjustForDistressedDropper(
    classComponent: number,
    recentPerfs: PastPerformance[],
    targetClassRating: number
  ): number {
    if (classComponent <= 0) return classComponent;

    const higherClassPerfs = recentPerfs.filter(
      p => CLASS_RATINGS[p.raceClass] > targetClassRating
    );
    if (higherClassPerfs.length < 2) return classComponent;

    const avgRelPos =
      higherClassPerfs.reduce(
        (sum, p) => sum + (p.finishPosition / Math.max(1, p.fieldSize)),
        0
      ) / higherClassPerfs.length;

    // Finished in bottom 40% on average in the higher class → distressed dropper
    if (avgRelPos > 0.60) {
      return classComponent * 0.25;
    }

    return classComponent;
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
    return fitnessScoreFromDays(days);
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
    if (distances.length === 0) {
        console.error(`No distances found for venue ${venue} and surface ${surface}`);
        return 0;
    }
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
    const baseWinRate = 0.08;
    const jockeyWinRate = jockey.seasonStats.winRate;

    let edge = jockeyWinRate - baseWinRate;

    const courseStats = jockey.courseStats.find(
      (cs) =>
        cs.venue === race.venue &&
        (!cs.surface || cs.surface === race.surface) &&
        (!cs.distance || Math.abs(cs.distance - race.distance) <= 200)
    );

    if (courseStats && courseStats.rides >= 10) {
      edge = edge * 0.5 + (courseStats.winRate - baseWinRate) * 0.5;
    }

    // HV: sqrt compression — top jockeys still ahead but the gap to average
    // is compressed, preventing Moreira/Purton mounts from auto-ranking #1.
    if (race.venue === "Happy Valley") {
      const clamped = Math.max(-0.1, Math.min(0.15, edge));
      if (clamped > 0) {
        return Math.sqrt(clamped / 0.15) * 0.10;
      }
      return clamped;
    }

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

    if (surfacePerfs.length === 0) {
      // Unknown AWT history: many entrants are first-timers on AWT, so a flat
      // -0.3 penalty applies to most of the field equally and adds noise.
      // For Turf unknowns, a mild penalty is appropriate (AWT-to-Turf switches
      // often do struggle), but not for AWT (no strong prior of failure).
      if (targetSurface === "AWT") return 0;
      return -0.3;
    }
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
   * Calculate going preference (-1 to 1).
   *
   * Three tiers reflect meaningfully different racing conditions:
   *   "firm" — Firm, Good to Firm, Good  (fast ground, suits speedier types)
   *   "soft" — Good to Yielding, Yielding, Soft, Heavy  (wet Turf)
   *   "wet"  — Wet Fast, Wet Slow  (AWT-specific; very different from Turf soft)
   *
   * AWT going ("Wet Fast"/"Wet Slow") is zeroed out when the horse has no wet
   * history: almost every horse in an AWT field would return the same -0.2,
   * which provides zero differentiation signal and only adds noise.
   */
  private calculateGoingPreference(horse: Horse, targetGoing: Going): number {
    const perfs = horse.pastPerformances;
    if (perfs.length < 3) return 0;

    const goingTier = (g: Going): "firm" | "soft" | "wet" => {
      if (["Firm", "Good to Firm", "Good"].includes(g)) return "firm";
      if (["Wet Fast", "Wet Slow"].includes(g)) return "wet";
      return "soft"; // Good to Yielding, Yielding, Soft, Heavy
    };

    const targetTier = goingTier(targetGoing);

    const matchingPerfs = perfs.filter((p) => goingTier(p.going) === targetTier);
    const otherPerfs = perfs.filter((p) => goingTier(p.going) !== targetTier);

    if (matchingPerfs.length === 0) {
      // For AWT going, nearly all horses lack wet history → applying a uniform
      // -0.2 flattens the field with no signal. Return neutral instead.
      if (targetTier === "wet") return 0;
      return -0.2;
    }
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
      const overallRating = this.calculateOverallRating(
        analysis,
        race.venue,
        race.surface,
        race.class,
        race.distance
      );

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
