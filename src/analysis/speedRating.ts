/**
 * Speed Rating Calculator
 *
 * Calculates speed figures for horses based on:
 * - Raw finish times
 * - Class adjustments (higher class = faster times)
 * - Going adjustments (soft ground = slower times)
 * - Weight adjustments
 * - Track/distance par times
 */

import fs from "fs";
import path from "path";
import type {
  PastPerformance,
  Horse,
  SpeedFigure,
  Venue,
  TrackSurface,
  Going,
  RaceClass,
} from "../types/index.js";

// ============================================================================
// PAR TIMES (in seconds) - Based on typical HKJC times
// These would ideally be calculated from historical data
// ============================================================================

/**
 * Par times for each distance at each venue/surface
 * Format: venue -> surface -> distance (meters) -> class -> time (seconds)
 */
const PAR_TIMES: Record<
  Venue,
  Record<TrackSurface, Record<number, Record<RaceClass, number>>>
> = {
  "Sha Tin": {
    Turf: {
      1000: {
        "Class 1": 55.5,
        "Class 2": 56.0,
        "Class 3": 56.5,
        "Class 4": 57.2,
        "Class 5": 58.0,
        Griffin: 58.5,
        "Group 1": 54.8,
        "Group 2": 55.2,
        "Group 3": 55.5,
        "4 Year Olds": 55.5,
        Handicap: 56.5,
      },
      1200: {
        "Class 1": 68.0,
        "Class 2": 68.8,
        "Class 3": 69.5,
        "Class 4": 70.3,
        "Class 5": 71.2,
        Griffin: 71.8,
        "Group 1": 67.0,
        "Group 2": 67.5,
        "Group 3": 68.0,
        "4 Year Olds": 68.0,
        Handicap: 69.0,
      },
      1400: {
        "Class 1": 80.5,
        "Class 2": 81.3,
        "Class 3": 82.2,
        "Class 4": 83.2,
        "Class 5": 84.5,
        Griffin: 85.0,
        "Group 1": 79.5,
        "Group 2": 80.0,
        "Group 3": 80.5,
        "4 Year Olds": 80.5,
        Handicap: 81.5,
      },
      1600: {
        "Class 1": 93.0,
        "Class 2": 94.0,
        "Class 3": 95.0,
        "Class 4": 96.2,
        "Class 5": 97.5,
        Griffin: 98.0,
        "Group 1": 91.5,
        "Group 2": 92.0,
        "Group 3": 92.5,
        "4 Year Olds": 92.5,
        Handicap: 94.0,
      },
      1800: {
        "Class 1": 106.0,
        "Class 2": 107.2,
        "Class 3": 108.5,
        "Class 4": 110.0,
        "Class 5": 111.5,
        Griffin: 112.0,
        "Group 1": 104.5,
        "Group 2": 105.0,
        "Group 3": 105.5,
        "4 Year Olds": 105.5,
        Handicap: 107.5,
      },
      2000: {
        "Class 1": 119.5,
        "Class 2": 121.0,
        "Class 3": 122.5,
        "Class 4": 124.0,
        "Class 5": 126.0,
        Griffin: 127.0,
        "Group 1": 118.0,
        "Group 2": 118.5,
        "Group 3": 119.0,
        "4 Year Olds": 119.0,
        Handicap: 121.0,
      },
      2400: {
        "Class 1": 145.0,
        "Class 2": 147.0,
        "Class 3": 149.0,
        "Class 4": 151.5,
        "Class 5": 154.0,
        Griffin: 155.0,
        "Group 1": 142.0,
        "Group 2": 143.0,
        "Group 3": 144.0,
        "4 Year Olds": 144.0,
        Handicap: 147.0,
      },
    },
    AWT: {
      1200: {
        "Class 1": 69.5,
        "Class 2": 70.3,
        "Class 3": 71.0,
        "Class 4": 71.8,
        "Class 5": 72.8,
        Griffin: 73.5,
        "Group 1": 68.5,
        "Group 2": 69.0,
        "Group 3": 69.5,
        "4 Year Olds": 69.5,
        Handicap: 70.5,
      },
      1650: {
        "Class 1": 98.0,
        "Class 2": 99.0,
        "Class 3": 100.0,
        "Class 4": 101.5,
        "Class 5": 103.0,
        Griffin: 104.0,
        "Group 1": 96.5,
        "Group 2": 97.0,
        "Group 3": 97.5,
        "4 Year Olds": 97.5,
        Handicap: 99.0,
      },
    },
  },
  "Happy Valley": {
    Turf: {
      1000: {
        "Class 1": 56.0,
        "Class 2": 56.5,
        "Class 3": 57.0,
        "Class 4": 57.8,
        "Class 5": 58.5,
        Griffin: 59.0,
        "Group 1": 55.0,
        "Group 2": 55.5,
        "Group 3": 56.0,
        "4 Year Olds": 56.0,
        Handicap: 57.0,
      },
      1200: {
        "Class 1": 69.0,
        "Class 2": 69.8,
        "Class 3": 70.5,
        "Class 4": 71.3,
        "Class 5": 72.2,
        Griffin: 72.8,
        "Group 1": 68.0,
        "Group 2": 68.5,
        "Group 3": 69.0,
        "4 Year Olds": 69.0,
        Handicap: 70.0,
      },
      1650: {
        "Class 1": 98.5,
        "Class 2": 99.5,
        "Class 3": 100.5,
        "Class 4": 101.8,
        "Class 5": 103.0,
        Griffin: 104.0,
        "Group 1": 97.0,
        "Group 2": 97.5,
        "Group 3": 98.0,
        "4 Year Olds": 98.0,
        Handicap: 99.5,
      },
      1800: {
        "Class 1": 107.5,
        "Class 2": 108.8,
        "Class 3": 110.0,
        "Class 4": 111.5,
        "Class 5": 113.0,
        Griffin: 114.0,
        "Group 1": 106.0,
        "Group 2": 106.5,
        "Group 3": 107.0,
        "4 Year Olds": 107.0,
        Handicap: 109.0,
      },
      2200: {
        "Class 1": 133.0,
        "Class 2": 134.5,
        "Class 3": 136.0,
        "Class 4": 138.0,
        "Class 5": 140.0,
        Griffin: 141.5,
        "Group 1": 131.0,
        "Group 2": 131.5,
        "Group 3": 132.0,
        "4 Year Olds": 132.0,
        Handicap: 134.5,
      },
    },
    AWT: {}, // Happy Valley doesn't have AWT
  },
};

// ============================================================================
// GOING ADJUSTMENTS (seconds to add/subtract per 200m)
// Negative = faster than standard, Positive = slower than standard
// ============================================================================

const GOING_ADJUSTMENTS: Record<Going, number> = {
  Firm: -0.3,
  "Good to Firm": -0.15,
  Good: 0,
  "Good to Yielding": 0.2,
  Yielding: 0.5,
  Soft: 0.8,
  Heavy: 1.2,
  "Wet Fast": -0.1, // AWT
  "Wet Slow": 0.3, // AWT
};

// ============================================================================
// WEIGHT ADJUSTMENT
// Approximately 0.1 seconds per pound per 200m at sprint distances
// ============================================================================

const STANDARD_WEIGHT = 126; // Standard weight in pounds
// Was 0.08 ≈ 2.4 rating pts/lb at 1200m, which badly over-credited horses that
// ran fast under top weight (a 135lb run got +21 figure points). 0.045 ≈ 1.35 pts/lb,
// closer to realistic handicapping. Validated by weight-coefficient sweep on the
// all-months ST and HV Turf place pools: place hit rate ST 48.1%→52.6%, HV 53.2%→57.9%.
const WEIGHT_ADJUSTMENT_PER_LB_PER_200M = 0.045;

// ============================================================================
// SPEED RATING CALCULATOR CLASS
// ============================================================================

/**
 * Field shrinkage for finish-time projection. The best-on-paper horse's last-6
 * average figure overstates what it runs when the whole field tries, so shrink
 * each horse's figure toward the field mean before projecting a time:
 *   shrunk = fieldMean + FIELD_TIME_SHRINK · (rating − fieldMean)
 * Tuned on 788 races (projected vs actual winning time): 0.7 cut MAE 1.62→1.43s
 * and bias −1.34→−1.06s while keeping a meaningful per-horse spread.
 */
export const FIELD_TIME_SHRINK = 0.7;

/** Empirical par overrides: "Venue|Surface|Distance|Class" → seconds. */
const EMPIRICAL_PARS: Record<string, number> = loadStatic("par_times_empirical.json");
/** Per-bucket residual offset to add to a projected finish time (seconds). */
const TIME_OFFSETS: Record<string, number> = loadStatic("time_offsets.json");
/** Empirical going adjustments (sec per 200m), data-driven. Overrides the hand table. */
const EMPIRICAL_GOING: Record<string, number> = loadStatic("going_adjustments_empirical.json");

function loadStatic(file: string): Record<string, number> {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "static", file), "utf-8"));
  } catch {
    return {};
  }
}

/**
 * Per-bucket calibration offset (seconds) to add to a projected finish time,
 * zeroing the residual bias left after empirical pars + field shrinkage.
 * From tools/calibrate-time-offsets.ts. Returns 0 when no calibrated bucket.
 */
export function getTimeOffset(
  venue: Venue,
  surface: TrackSurface,
  distance: number,
  raceClass: RaceClass
): number {
  return TIME_OFFSETS[`${venue}|${surface}|${distance}|${raceClass}`] ?? 0;
}

export class SpeedRatingCalculator {
  private readonly baseRating = 100; // Par performance = 100
  private readonly secondsPerRatingPoint = 0.2; // 0.2 seconds = 1 rating point

  /**
   * Get par time for a race configuration.
   * Prefers the data-driven empirical par (median winner time normalized to
   * Good/126lb, from tools/calibrate-par-times.ts) when available for the exact
   * venue/surface/distance/class; otherwise falls back to the hand-set table
   * (nearest distance).
   */
  getParTime(
    venue: Venue,
    surface: TrackSurface,
    distance: number,
    raceClass: RaceClass
  ): number | null {
    const emp = EMPIRICAL_PARS[`${venue}|${surface}|${distance}|${raceClass}`];
    if (emp !== undefined) return emp;

    const venuePars = PAR_TIMES[venue];
    if (!venuePars) return null;

    const surfacePars = venuePars[surface];
    if (!surfacePars) return null;

    // Find closest distance
    const distances = Object.keys(surfacePars).map(Number);
    if (distances.length === 0) return null;
    const closestDistance = distances.reduce((prev, curr) =>
      Math.abs(curr - distance) < Math.abs(prev - distance) ? curr : prev
    );

    const classPars = surfacePars[closestDistance];
    if (!classPars) return null;

    return classPars[raceClass];
  }

  /**
   * Calculate going adjustment for a race
   */
  calculateGoingAdjustment(going: Going, distance: number): number {
    // Prefer the data-driven going delta (calibrate-going-adjustments.ts); the
    // hand-set table badly over-slowed wet turf (Soft +0.8 vs empirical ~+0.21).
    const adjustmentPer200m = EMPIRICAL_GOING[going] ?? GOING_ADJUSTMENTS[going] ?? 0;
    return (distance / 200) * adjustmentPer200m;
  }

  /**
   * Calculate weight adjustment
   */
  calculateWeightAdjustment(weight: number, distance: number): number {
    const weightDiff = weight - STANDARD_WEIGHT;
    const adjustmentPer200m = weightDiff * WEIGHT_ADJUSTMENT_PER_LB_PER_200M;
    return (distance / 200) * adjustmentPer200m;
  }

  /**
   * Calculate speed figure for a single performance
   */
  calculateSpeedFigure(
    performance: PastPerformance,
    raceId: string = ""
  ): SpeedFigure | null {
    if (!performance.finishTime || performance.finishTime <= 0) {
      return null;
    }

    const parTime = this.getParTime(
      performance.venue,
      performance.surface,
      performance.distance,
      performance.raceClass
    );

    if (!parTime) {
      console.error(`No par time found for race ${raceId}`);
      return null;
    }

    // Calculate adjustments
    const goingAdj = this.calculateGoingAdjustment(
      performance.going,
      performance.distance
    );
    const weightAdj = this.calculateWeightAdjustment(
      performance.weight,
      performance.distance
    );

    // Adjusted time = actual time - going adjustment - weight adjustment
    // (Negative adjustments make the time faster, so we add them)
    const adjustedTime = performance.finishTime - goingAdj - weightAdj;

    // Speed rating = base + (par - adjusted) / seconds per point
    // Faster than par = higher rating, slower = lower rating
    const speedRating =
      this.baseRating + (parTime - adjustedTime) / this.secondsPerRatingPoint;

    // Clamp to reasonable range (40-130)
    const clampedRating = Math.max(40, Math.min(130, Math.round(speedRating)));

    return {
      horseCode: "", // Will be set by caller
      raceId,
      rawTime: performance.finishTime,
      adjustedTime,
      speedRating: clampedRating,
      classAdjustment: 0, // Already factored into par time
      goingAdjustment: goingAdj,
      weightAdjustment: weightAdj,
    };
  }

  /**
   * Project a finish time (seconds) for a horse running THIS race at a given
   * speed figure. Inverse of calculateSpeedFigure():
   *   speedRating = base + (parTime − adjustedTime) / secPerPt
   *   adjustedTime = finishTime − goingAdj − weightAdj
   * ⇒ finishTime = parTime − (speedRating − base)·secPerPt + goingAdj + weightAdj
   *
   * Returns null if no par time exists for the race configuration.
   */
  projectFinishTime(
    speedRating: number,
    venue: Venue,
    surface: TrackSurface,
    distance: number,
    raceClass: RaceClass,
    going: Going,
    weight: number
  ): number | null {
    const parTime = this.getParTime(venue, surface, distance, raceClass);
    if (parTime === null) return null;
    const goingAdj = this.calculateGoingAdjustment(going, distance);
    const weightAdj = this.calculateWeightAdjustment(weight, distance);
    const adjustedTime = parTime - (speedRating - this.baseRating) * this.secondsPerRatingPoint;
    return adjustedTime + goingAdj + weightAdj;
  }

  /** Seconds added to finish time per 1 point of speed-figure variability. */
  get secondsPerPoint(): number {
    return this.secondsPerRatingPoint;
  }

  /**
   * Calculate speed figures for all of a horse's past performances
   */
  calculateHorseSpeedFigures(horse: Horse, maxRaces: number = 6): SpeedFigure[] {
    const figures: SpeedFigure[] = [];
    const perfs = horse.pastPerformances.slice(0, maxRaces);

    for (const perf of perfs) {
      const figure = this.calculateSpeedFigure(
        perf,
        `${perf.date.toISOString().split("T")[0]}-${perf.venue === "Sha Tin" ? "ST" : "HV"}-${perf.raceNumber}`
      );

      if (figure) {
        figures.push({
          ...figure,
          horseCode: horse.code,
        });
      }
    }

    return figures;
  }

  /**
   * Get average speed rating for last N races
   */
  getAverageSpeedRating(figures: SpeedFigure[], lastN: number = 3): number {
    if (figures.length === 0) return this.baseRating;

    const recentFigures = figures.slice(0, lastN);
    const sum = recentFigures.reduce((acc, f) => acc + f.speedRating, 0);
    return Math.round(sum / recentFigures.length);
  }

  /**
   * Shrunk average speed rating: blends the recent-N average toward the horse's
   * own median figure (over all available runs). alpha=1 → pure recent average
   * (no shrink); alpha=0 → pure median. Pulls peak/outlier recent figures back
   * toward the horse's typical level, countering regression-to-the-mean
   * over-ranking of horses whose rating was built on an unrepeatable best run.
   */
  getShrunkAverageSpeedRating(
    figures: SpeedFigure[],
    lastN: number = 3,
    alpha: number = 0.5,
    peakPenalty: number = 0.4,
    medianWindow: number = 6
  ): number {
    if (figures.length === 0) return this.baseRating;

    const recent = figures.slice(0, lastN).map((f) => f.speedRating);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;

    // Median (and peak) over the last `medianWindow` runs only.
    const all = figures
      .slice(0, medianWindow)
      .map((f) => f.speedRating)
      .sort((a, b) => a - b);
    const mid = Math.floor(all.length / 2);
    const median = all.length % 2 ? all[mid]! : (all[mid - 1]! + all[mid]!) / 2;

    let rating = alpha * recentAvg + (1 - alpha) * median;

    // Peak penalty: discount ratings propped up by a single outlier figure.
    // A consistent horse has max ≈ median (no penalty); a one-peak horse has a
    // best figure far above its typical level, which over-ranks it (regression).
    if (peakPenalty > 0 && all.length >= 2) {
      const max = all[all.length - 1]!;
      rating -= peakPenalty * Math.max(0, max - median);
    }

    return Math.round(rating);
  }

  /**
   * Get best speed rating from last N races
   */
  getBestSpeedRating(figures: SpeedFigure[], lastN: number = 6): number {
    if (figures.length === 0) return this.baseRating;

    const recentFigures = figures.slice(0, lastN);
    return Math.max(...recentFigures.map((f) => f.speedRating));
  }

  /**
   * Get last speed rating
   */
  getLastSpeedRating(figures: SpeedFigure[]): number {
    if (figures.length === 0) return this.baseRating;
    return figures[0]!.speedRating;
  }

  /**
   * Calculate projected speed rating for upcoming race
   * Adjusts based on class change, surface change, distance change
   */
  projectSpeedRating(
    horse: Horse,
    targetVenue: Venue,
    targetSurface: TrackSurface,
    targetDistance: number,
    targetClass: RaceClass
  ): number {
    const figures = this.calculateHorseSpeedFigures(horse);

    if (figures.length === 0) {
      return this.baseRating;
    }

    // Base projection on average of best and recent
    const avgRating = this.getAverageSpeedRating(figures);
    const bestRating = this.getBestSpeedRating(figures);
    let projection = avgRating * 0.6 + bestRating * 0.4;

    // Adjust for surface preference
    const surfacePerfs = horse.pastPerformances.filter(
      (p) => p.surface === targetSurface
    );
    if (surfacePerfs.length >= 2) {
      const surfaceFigures = surfacePerfs
        .map((p, i) => this.calculateSpeedFigure(p, `perf-${i}`))
        .filter((f): f is SpeedFigure => f !== null);

      if (surfaceFigures.length > 0) {
        const surfaceAvg = this.getAverageSpeedRating(surfaceFigures);
        // Weight surface-specific form more heavily
        projection = projection * 0.5 + surfaceAvg * 0.5;
      }
    } else if (surfacePerfs.length === 0) {
      // Unknown surface - apply small penalty
      projection -= 3;
    }

    // Adjust for distance preference
    const distancePerfs = horse.pastPerformances.filter(
      (p) => Math.abs(p.distance - targetDistance) <= 200
    );
    if (distancePerfs.length >= 2) {
      const distFigures = distancePerfs
        .map((p, i) => this.calculateSpeedFigure(p, `perf-${i}`))
        .filter((f): f is SpeedFigure => f !== null);

      if (distFigures.length > 0) {
        const distAvg = this.getAverageSpeedRating(distFigures);
        projection = projection * 0.5 + distAvg * 0.5;
      }
    } else if (distancePerfs.length === 0) {
      // New distance - apply penalty
      projection -= 2;
    }

    return Math.round(projection);
  }

  /**
   * Analyze speed rating trend
   * Returns positive for improving, negative for declining
   */
  calculateTrend(figures: SpeedFigure[], lastN: number = 4): number {
    if (figures.length < 2) return 0;

    const recentFigures = figures.slice(0, Math.min(lastN, figures.length));
    if (recentFigures.length < 2) return 0;

    // Calculate weighted trend
    // More recent races have higher weight
    let weightedSum = 0;
    let weightSum = 0;

    for (let i = 0; i < recentFigures.length - 1; i++) {
      const current = recentFigures[i]!.speedRating;
      const previous = recentFigures[i + 1]!.speedRating;
      const change = current - previous;
      const weight = recentFigures.length - i;

      weightedSum += change * weight;
      weightSum += weight;
    }

    return weightSum > 0 ? weightedSum / weightSum : 0;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const speedRatingCalculator = new SpeedRatingCalculator();

/**
 * Convenience function to calculate speed figure for a performance
 */
export function calculateSpeedFigure(
  performance: PastPerformance
): SpeedFigure | null {
  return speedRatingCalculator.calculateSpeedFigure(performance);
}

/**
 * Convenience function to project speed rating
 */
export function projectSpeedRating(
  horse: Horse,
  venue: Venue,
  surface: TrackSurface,
  distance: number,
  raceClass: RaceClass
): number {
  return speedRatingCalculator.projectSpeedRating(
    horse,
    venue,
    surface,
    distance,
    raceClass
  );
}
