/**
 * Form analysis tuning constants: draw bias, class ratings, overall rating weights.
 * Structure: DRAW_BIAS is venue → surface → distance.
 * WEIGHT_BIAS is venue → surface → class → distance.
 */

import type { RaceClass, TrackSurface, Venue } from "../types/index.js";

// ============================================================================
// DRAW BIAS
// Based on historical analysis of HKJC races.
// Positive = advantage, negative = disadvantage.
// ============================================================================

export type DrawBiasData = Record<number, Record<number, number>>;

export const DRAW_BIAS: Record<Venue, Record<TrackSurface, DrawBiasData>> = {
  "Sha Tin": {
    Turf: {
      1000: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [i + 1, 0])),
      1200: {
        1: 0.06, 2: 0.05, 3: 0.04, 4: 0.03, 5: 0.02,
        6: 0.01, 7: 0, 8: -0.01, 9: -0.01, 10: -0.02,
        11: -0.03, 12: -0.03, 13: -0.04, 14: -0.05,
      },
      1400: {
        1: 0.05, 2: 0.04, 3: 0.03, 4: 0.02, 5: 0.02,
        6: 0.01, 7: 0, 8: -0.01, 9: -0.02, 10: -0.02,
        11: -0.03, 12: -0.03, 13: -0.04, 14: -0.04,
      },
      1600: {
        1: 0.03, 2: 0.03, 3: 0.02, 4: 0.02, 5: 0.01,
        6: 0.01, 7: 0, 8: -0.01, 9: -0.01, 10: -0.01,
        11: -0.02, 12: -0.02, 13: -0.03, 14: -0.03,
      },
      1800: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [i + 1, 0])),
      2000: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [i + 1, 0])),
      2400: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [i + 1, 0])),
    },
    AWT: {
      1200: Object.fromEntries(
        Array.from({ length: 14 }, (_, i) => [i + 1, i < 7 ? 0.02 : -0.02])
      ),
      1650: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [i + 1, 0])),
    },
  },
  "Happy Valley": {
    Turf: {
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
        1: 0.05, 2: 0.04, 3: 0.03, 4: 0.025, 5: 0.015,
        6: 0, 7: -0.015, 8: -0.025, 9: -0.03, 10: -0.035,
        11: -0.04, 12: -0.045,
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

export const CLASS_RATINGS: Record<RaceClass, number> = {
  "Group 1": 120,
  "Group 2": 115,
  "Group 3": 110,
  "4 Year Olds": 110,
  "Class 1": 100,
  "Class 2": 90,
  "Class 3": 80,
  "Class 4": 70,
  "Class 5": 60,
  Griffin: 55,
  Handicap: 85,
};

// ============================================================================
// OVERALL RATING WEIGHTS (venue × surface × class × distance)
// Draw effect per trip is in DRAW_BIAS → drawAdvantage; weights tune other factors.
// ============================================================================

export type OverallRatingWeights = {
  speedRating: number;
  formScore: number;
  classIndicator: number;
  ratingMomentum: number;
  fitness: number;
  drawAdvantage: number;
  jockeyEdge: number;
  trainerForm: number;
  surfacePreference: number;
  goingPreference: number;
  distancePreference: number;
};

/** Distance (m) → weight profile. */
export type WeightBiasData = Record<number, OverallRatingWeights>;

/** Class → distance weights. Use `default` when no class-specific profile exists. */
export type WeightBiasByClass = Partial<Record<RaceClass | "default", WeightBiasData>>;

export type WeightBiasBySurface = Partial<Record<TrackSurface, WeightBiasByClass>>;

const ST_TURF_DISTANCES = [1000, 1200, 1400, 1600, 1800, 2000, 2400];
const ST_AWT_DISTANCES = [1200, 1650];

function uniformDistanceWeights(
  distances: readonly number[],
  weights: OverallRatingWeights
): WeightBiasData {
  return Object.fromEntries(distances.map((d) => [d, weights]));
}

function mergeDistanceWeights(
  base: WeightBiasData,
  overrides: Partial<WeightBiasData>
): WeightBiasData {
  const merged: WeightBiasData = { ...base };
  for (const [distance, weights] of Object.entries(overrides)) {
    if (weights !== undefined) {
      merged[Number(distance)] = weights;
    }
  }
  return merged;
}

const ST_TURF_DEFAULT: OverallRatingWeights = {
  speedRating: 0.36,
  formScore: 0.13,
  classIndicator: 0.06,
  ratingMomentum: 0.06,
  fitness: 0.10,
  drawAdvantage: 0.08,
  jockeyEdge: 0.08,
  trainerForm: 0.02,
  surfacePreference: 0.03,
  goingPreference: 0.03,
  distancePreference: 0.03,
};

const ST_AWT_DEFAULT: OverallRatingWeights = {
  speedRating: 0.27,
  formScore: 0.20,
  classIndicator: 0.08,
  ratingMomentum: 0.08,
  fitness: 0.10,
  drawAdvantage: 0.06,
  jockeyEdge: 0.10,
  trainerForm: 0.02,
  surfacePreference: 0.07,
  goingPreference: 0.0,
  distancePreference: 0.02,
};

const HV_TURF_DEFAULT: OverallRatingWeights = {
  speedRating: 0.19,
  formScore: 0.15,
  classIndicator: 0.10,
  ratingMomentum: 0.14,
  fitness: 0.10,
  drawAdvantage: 0.07,
  jockeyEdge: 0.14,
  trainerForm: 0.03,
  surfacePreference: 0.03,
  goingPreference: 0.03,
  distancePreference: 0.02,
};

/** HV 1650: C3+ — form/momentum; moderate draw weight. */
const HV_TURF_1650: OverallRatingWeights = {
  speedRating: 0.16,
  formScore: 0.17,
  classIndicator: 0.11,
  ratingMomentum: 0.13,
  fitness: 0.10,
  drawAdvantage: 0.09,
  jockeyEdge: 0.13,
  trainerForm: 0.03,
  surfacePreference: 0.03,
  goingPreference: 0.03,
  distancePreference: 0.02,
};

/** HV 1650 Class 4: deep handicaps — distance record, draw, form over raw speed. */
const HV_TURF_1650_C4: OverallRatingWeights = {
  speedRating: 0.08,
  formScore: 0.19,
  classIndicator: 0.14,
  ratingMomentum: 0.10,
  fitness: 0.10,
  drawAdvantage: 0.11,
  jockeyEdge: 0.11,
  trainerForm: 0.03,
  surfacePreference: 0.03,
  goingPreference: 0.03,
  distancePreference: 0.08,
};

const HV_TURF_DEFAULT_MAP: WeightBiasData = mergeDistanceWeights(
  uniformDistanceWeights([1000, 1200, 1800, 2200], HV_TURF_DEFAULT),
//   { 1650: HV_TURF_1650 }
  {}
);

/** ST Turf Class 3: competitive handicaps — official ratings bunch, jockey + momentum > raw speed. */
const ST_TURF_CLASS3_DEFAULT: OverallRatingWeights = {
  speedRating: 0.22,
  formScore: 0.16,
  classIndicator: 0.07,
  ratingMomentum: 0.12,
  fitness: 0.10,
  drawAdvantage: 0.08,
  jockeyEdge: 0.12,
  trainerForm: 0.03,
  surfacePreference: 0.04,
  goingPreference: 0.03,
  distancePreference: 0.03,
};

/** ST Turf Class 3 at 1400m: bend + positioning — draw, distance record, jockey over raw speed. */
const ST_TURF_CLASS3_1400: OverallRatingWeights = {
  speedRating: 0.16,
  formScore: 0.17,
  classIndicator: 0.07,
  ratingMomentum: 0.11,
  fitness: 0.10,
  drawAdvantage: 0.12,
  jockeyEdge: 0.13,
  trainerForm: 0.03,
  surfacePreference: 0.04,
  goingPreference: 0.03,
  distancePreference: 0.04,
};

/** ST Turf Class 3 at 1600m: draw lane + jockey routing decisive on the mile. */
const ST_TURF_CLASS3_1600: OverallRatingWeights = {
  speedRating: 0.18,
  formScore: 0.15,
  classIndicator: 0.07,
  ratingMomentum: 0.12,
  fitness: 0.10,
  drawAdvantage: 0.13,
  jockeyEdge: 0.14,
  trainerForm: 0.03,
  surfacePreference: 0.04,
  goingPreference: 0.03,
  distancePreference: 0.01,
};

const ST_TURF_CLASS3_MAP: WeightBiasData = mergeDistanceWeights(
  uniformDistanceWeights(ST_TURF_DISTANCES, ST_TURF_CLASS3_DEFAULT),
  { 1400: ST_TURF_CLASS3_1400, 1600: ST_TURF_CLASS3_1600 }
);

/** ST Turf Class 4 at 1400m: tactical bend race — form + distance record over raw speed. */
const ST_TURF_CLASS4_1400: OverallRatingWeights = {
  speedRating: 0.20,
  formScore: 0.18,
  classIndicator: 0.07,
  ratingMomentum: 0.10,
  fitness: 0.11,
  drawAdvantage: 0.11,
  jockeyEdge: 0.11,
  trainerForm: 0.03,
  surfacePreference: 0.04,
  goingPreference: 0.02,
  distancePreference: 0.03,
};

const ST_TURF_CLASS4_MAP: WeightBiasData = mergeDistanceWeights(
  uniformDistanceWeights(ST_TURF_DISTANCES, ST_TURF_DEFAULT),
  { 1400: ST_TURF_CLASS4_1400 }
);

export const WEIGHT_BIAS: Record<Venue, WeightBiasBySurface> = {
  "Sha Tin": {
    Turf: {
      default: uniformDistanceWeights(ST_TURF_DISTANCES, ST_TURF_DEFAULT),
    //   "Class 3": ST_TURF_CLASS3_MAP,
    //   "Class 4": ST_TURF_CLASS4_MAP,
    },
    AWT: {
      default: uniformDistanceWeights(ST_AWT_DISTANCES, ST_AWT_DEFAULT),
    },
  },
  "Happy Valley": {
    Turf: {
      default: HV_TURF_DEFAULT_MAP,
      "Class 4": mergeDistanceWeights(HV_TURF_DEFAULT_MAP, {
        // 1650: HV_TURF_1650_C4,
      }),
    },
    AWT: {},
  },
};

export const WEIGHT_BIAS_FALLBACK = ST_TURF_DEFAULT;

function resolveClosestDistanceKey(
  distance: number,
  keys: number[]
): number | undefined {
  if (keys.length === 0) return undefined;
  return keys.reduce((prev, curr) =>
    Math.abs(curr - distance) < Math.abs(prev - distance) ? curr : prev
  );
}

function lookupWeightMap(
  map: WeightBiasData | undefined,
  distance: number
): OverallRatingWeights | undefined {
  if (!map || Object.keys(map).length === 0) return undefined;

  const exact = map[distance];
  if (exact) return exact;

  const distances = Object.keys(map).map(Number);
  const closestDistance = resolveClosestDistanceKey(distance, distances);
  if (closestDistance === undefined) return undefined;

  return map[closestDistance];
}

function resolveClassWeightMap(
  surfaceConfig: WeightBiasByClass | undefined,
  raceClass?: RaceClass
): WeightBiasData | undefined {
  if (!surfaceConfig) return undefined;
  if (raceClass !== undefined && surfaceConfig[raceClass]) {
    return surfaceConfig[raceClass];
  }
  return surfaceConfig.default;
}

function resolveWeightBias(
  venue: Venue,
  surface: TrackSurface,
  distance: number,
  raceClass?: RaceClass
): OverallRatingWeights {
  const surfaceConfig = WEIGHT_BIAS[venue]?.[surface];
  if (!surfaceConfig) return WEIGHT_BIAS_FALLBACK;

  const classMap = resolveClassWeightMap(surfaceConfig, raceClass);
  const fromClass = lookupWeightMap(classMap, distance);
  if (fromClass) return fromClass;

  const fromDefault = lookupWeightMap(surfaceConfig.default, distance);
  return fromDefault ?? WEIGHT_BIAS_FALLBACK;
}

export function getOverallRatingWeights(
  venue: Venue = "Sha Tin",
  surface: TrackSurface = "Turf",
  distance?: number,
  raceClass?: RaceClass
): OverallRatingWeights {
  if (distance === undefined) {
    return resolveWeightBias(venue, surface, 1200, raceClass);
  }

  return resolveWeightBias(venue, surface, distance, raceClass);
}
