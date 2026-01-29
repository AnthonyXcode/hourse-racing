/**
 * Value Calculator
 *
 * Compares model probabilities against market odds to identify value bets.
 * Calculates expected value, edge percentage, and confidence levels.
 */

import type {
  SimulationResult,
  ExoticProbabilities,
  BetType,
  Race,
  RaceEntry,
} from "../types/index.js";
import { oddsToProb, probToOdds, calculateEdge } from "../utils/index.js";

// ============================================================================
// VALUE CALCULATION TYPES
// ============================================================================

export interface ValueAssessment {
  betType: BetType;
  selection: string;
  modelProbability: number;
  marketProbability: number;
  modelOdds: number;
  marketOdds: number;
  edge: number; // Percentage
  expectedValue: number; // Per $1 bet
  confidence: "Low" | "Medium" | "High";
  isValue: boolean;
  rating: number; // 0-100 composite rating
}

export interface MarketOdds {
  winOdds: Map<number, number>;
  placeOdds?: Map<number, number>;
  quinellaOdds?: Map<string, number>;
  quinellaPlaceOdds?: Map<string, number>;
  tierceOdds?: Map<string, number>;
  trioOdds?: Map<string, number>;
}

// ============================================================================
// VALUE CALCULATOR CLASS
// ============================================================================

export class ValueCalculator {
  private minEdgeThreshold: number;

  constructor(minEdgeThreshold: number = 15) {
    this.minEdgeThreshold = minEdgeThreshold;
  }

  /**
   * Calculate value for all Win bets
   */
  calculateWinValues(
    simResults: SimulationResult[],
    winOdds: Map<number, number>
  ): ValueAssessment[] {
    const assessments: ValueAssessment[] = [];

    for (const result of simResults) {
      const marketOdds = winOdds.get(result.horseNumber);
      if (!marketOdds) continue;

      const assessment = this.assessValue(
        "Win",
        result.horseNumber.toString(),
        result.winProbability,
        marketOdds
      );

      assessments.push(assessment);
    }

    return assessments.sort((a, b) => b.rating - a.rating);
  }

  /**
   * Calculate value for all Place bets
   */
  calculatePlaceValues(
    simResults: SimulationResult[],
    placeOdds: Map<number, number>
  ): ValueAssessment[] {
    const assessments: ValueAssessment[] = [];

    for (const result of simResults) {
      const marketOdds = placeOdds.get(result.horseNumber);
      if (!marketOdds) continue;

      const assessment = this.assessValue(
        "Place",
        result.horseNumber.toString(),
        result.placeProbability,
        marketOdds
      );

      assessments.push(assessment);
    }

    return assessments.sort((a, b) => b.rating - a.rating);
  }

  /**
   * Calculate value for Quinella bets
   */
  calculateQuinellaValues(
    quinellaProbs: Map<string, number>,
    quinellaOdds: Map<string, number>
  ): ValueAssessment[] {
    const assessments: ValueAssessment[] = [];

    for (const [combination, modelProb] of quinellaProbs) {
      const marketOdds = quinellaOdds.get(combination);
      if (!marketOdds) continue;

      const assessment = this.assessValue(
        "Quinella",
        combination,
        modelProb,
        marketOdds
      );

      assessments.push(assessment);
    }

    return assessments.sort((a, b) => b.rating - a.rating);
  }

  /**
   * Calculate value for Quinella Place bets
   */
  calculateQuinellaPlaceValues(
    qpProbs: Map<string, number>,
    qpOdds: Map<string, number>
  ): ValueAssessment[] {
    const assessments: ValueAssessment[] = [];

    for (const [combination, modelProb] of qpProbs) {
      const marketOdds = qpOdds.get(combination);
      if (!marketOdds) continue;

      const assessment = this.assessValue(
        "Quinella Place",
        combination,
        modelProb,
        marketOdds
      );

      assessments.push(assessment);
    }

    return assessments.sort((a, b) => b.rating - a.rating);
  }

  /**
   * Calculate value for Tierce bets
   */
  calculateTierceValues(
    tierceProbs: Map<string, number>,
    tierceOdds: Map<string, number>
  ): ValueAssessment[] {
    const assessments: ValueAssessment[] = [];

    for (const [combination, modelProb] of tierceProbs) {
      const marketOdds = tierceOdds.get(combination);
      if (!marketOdds) continue;

      const assessment = this.assessValue(
        "Tierce",
        combination,
        modelProb,
        marketOdds
      );

      assessments.push(assessment);
    }

    return assessments.sort((a, b) => b.rating - a.rating);
  }

  /**
   * Calculate value for Trio bets
   */
  calculateTrioValues(
    trioProbs: Map<string, number>,
    trioOdds: Map<string, number>
  ): ValueAssessment[] {
    const assessments: ValueAssessment[] = [];

    for (const [combination, modelProb] of trioProbs) {
      const marketOdds = trioOdds.get(combination);
      if (!marketOdds) continue;

      const assessment = this.assessValue(
        "Trio",
        combination,
        modelProb,
        marketOdds
      );

      assessments.push(assessment);
    }

    return assessments.sort((a, b) => b.rating - a.rating);
  }

  /**
   * Core value assessment logic
   */
  assessValue(
    betType: BetType,
    selection: string,
    modelProbability: number,
    marketOdds: number
  ): ValueAssessment {
    const marketProbability = oddsToProb(marketOdds);
    const modelOdds = probToOdds(modelProbability);
    const edge = calculateEdge(modelProbability, marketProbability);

    // Expected value per $1 bet
    // EV = (prob * (odds - 1)) - (1 - prob)
    // Simplified: EV = (prob * odds) - 1
    const expectedValue = modelProbability * marketOdds - 1;

    // Determine confidence level
    const confidence = this.calculateConfidence(modelProbability, edge);

    // Is this a value bet?
    const isValue = edge >= this.minEdgeThreshold && expectedValue > 0;

    // Calculate composite rating (0-100)
    const rating = this.calculateRating(edge, expectedValue, modelProbability);

    return {
      betType,
      selection,
      modelProbability,
      marketProbability,
      modelOdds,
      marketOdds,
      edge,
      expectedValue,
      confidence,
      isValue,
      rating,
    };
  }

  /**
   * Calculate confidence level based on probability and edge
   */
  private calculateConfidence(
    modelProbability: number,
    edge: number
  ): "Low" | "Medium" | "High" {
    // High confidence: Strong edge AND reasonable probability
    if (edge >= 25 && modelProbability >= 0.15) {
      return "High";
    }

    // Medium confidence: Good edge OR high probability with edge
    if (
      (edge >= 15 && modelProbability >= 0.1) ||
      (edge >= 20 && modelProbability >= 0.05)
    ) {
      return "Medium";
    }

    return "Low";
  }

  /**
   * Calculate composite rating for sorting/comparison
   */
  private calculateRating(
    edge: number,
    expectedValue: number,
    probability: number
  ): number {
    if (edge < 0 || expectedValue < 0) return 0;

    // Weight factors:
    // - Edge (40%): Higher edge = better
    // - Expected Value (35%): Higher EV = better
    // - Probability (25%): Higher probability = more reliable

    // Normalize edge (0-50% -> 0-1)
    const normalizedEdge = Math.min(1, edge / 50);

    // Normalize EV (0-1 -> 0-1)
    const normalizedEV = Math.min(1, expectedValue);

    // Probability is already 0-1
    const normalizedProb = probability;

    const rating =
      normalizedEdge * 40 + normalizedEV * 35 + normalizedProb * 25;

    return Math.round(rating);
  }

  /**
   * Find all value bets across all bet types
   */
  findAllValueBets(
    simResults: SimulationResult[],
    exoticProbs: ExoticProbabilities,
    marketOdds: MarketOdds
  ): ValueAssessment[] {
    const allAssessments: ValueAssessment[] = [];

    // Win bets
    if (marketOdds.winOdds) {
      allAssessments.push(
        ...this.calculateWinValues(simResults, marketOdds.winOdds)
      );
    }

    // Place bets
    if (marketOdds.placeOdds) {
      allAssessments.push(
        ...this.calculatePlaceValues(simResults, marketOdds.placeOdds)
      );
    }

    // Quinella bets
    if (marketOdds.quinellaOdds) {
      allAssessments.push(
        ...this.calculateQuinellaValues(
          exoticProbs.quinella,
          marketOdds.quinellaOdds
        )
      );
    }

    // Quinella Place bets
    if (marketOdds.quinellaPlaceOdds) {
      allAssessments.push(
        ...this.calculateQuinellaPlaceValues(
          exoticProbs.quinellaPlace,
          marketOdds.quinellaPlaceOdds
        )
      );
    }

    // Tierce bets
    if (marketOdds.tierceOdds) {
      allAssessments.push(
        ...this.calculateTierceValues(
          exoticProbs.tierce,
          marketOdds.tierceOdds
        )
      );
    }

    // Trio bets
    if (marketOdds.trioOdds) {
      allAssessments.push(
        ...this.calculateTrioValues(exoticProbs.trio, marketOdds.trioOdds)
      );
    }

    // Filter to value bets only and sort by rating
    return allAssessments
      .filter((a) => a.isValue)
      .sort((a, b) => b.rating - a.rating);
  }

  /**
   * Estimate Place odds from Win odds (when place odds not available)
   * Uses Kelly/Harville approximation
   */
  estimatePlaceOdds(
    winOdds: Map<number, number>,
    placePositions: number = 3
  ): Map<number, number> {
    const placeOdds = new Map<number, number>();

    // Calculate total market percentage
    let totalWinProb = 0;
    for (const odds of winOdds.values()) {
      totalWinProb += oddsToProb(odds);
    }

    // Normalize to get true probabilities
    const normalizedProbs = new Map<number, number>();
    for (const [horse, odds] of winOdds) {
      normalizedProbs.set(horse, oddsToProb(odds) / totalWinProb);
    }

    // Calculate place probability for each horse
    // Using simplified Harville model
    for (const [horse, winProb] of normalizedProbs) {
      // Approximate place probability
      // P(place) ≈ 1 - (1 - winProb)^placePositions adjusted for field size
      const fieldSize = winOdds.size;
      const placeProb = Math.min(
        0.95,
        winProb + (1 - winProb) * ((placePositions - 1) / (fieldSize - 1))
      );

      // Convert to odds with typical 20% overround for place betting
      const fairOdds = probToOdds(placeProb);
      const adjustedOdds = fairOdds * 0.8; // Apply overround

      placeOdds.set(horse, Math.max(1.1, adjustedOdds));
    }

    return placeOdds;
  }

  /**
   * Calculate market efficiency (overround)
   */
  calculateOverround(odds: Map<number, number>): number {
    let totalProb = 0;
    for (const o of odds.values()) {
      totalProb += oddsToProb(o);
    }
    // Overround = total implied probability - 1 (expressed as percentage)
    return (totalProb - 1) * 100;
  }

  /**
   * Analyze market for inefficiencies
   */
  analyzeMarketEfficiency(
    simResults: SimulationResult[],
    winOdds: Map<number, number>
  ): {
    overround: number;
    favoriteBias: number;
    longShotBias: number;
    inefficiencies: { horseNumber: number; edge: number }[];
  } {
    const overround = this.calculateOverround(winOdds);

    // Check favorite-longshot bias
    let favoriteBias = 0;
    let longShotBias = 0;
    const inefficiencies: { horseNumber: number; edge: number }[] = [];

    for (const result of simResults) {
      const marketOdds = winOdds.get(result.horseNumber);
      if (!marketOdds) continue;

      const marketProb = oddsToProb(marketOdds);
      const modelProb = result.winProbability;
      const edge = calculateEdge(modelProb, marketProb);

      // Favorites (market odds < 5.0)
      if (marketOdds < 5) {
        favoriteBias += edge;
      }
      // Longshots (market odds > 20.0)
      else if (marketOdds > 20) {
        longShotBias += edge;
      }

      if (Math.abs(edge) > 10) {
        inefficiencies.push({ horseNumber: result.horseNumber, edge });
      }
    }

    // Normalize biases
    const favorites = simResults.filter(
      (r) => (winOdds.get(r.horseNumber) ?? 100) < 5
    ).length;
    const longShots = simResults.filter(
      (r) => (winOdds.get(r.horseNumber) ?? 0) > 20
    ).length;

    return {
      overround,
      favoriteBias: favorites > 0 ? favoriteBias / favorites : 0,
      longShotBias: longShots > 0 ? longShotBias / longShots : 0,
      inefficiencies: inefficiencies.sort(
        (a, b) => Math.abs(b.edge) - Math.abs(a.edge)
      ),
    };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const valueCalculator = new ValueCalculator();

/**
 * Convenience function to find value bets
 */
export function findValueBets(
  simResults: SimulationResult[],
  exoticProbs: ExoticProbabilities,
  marketOdds: MarketOdds
): ValueAssessment[] {
  return valueCalculator.findAllValueBets(simResults, exoticProbs, marketOdds);
}

/**
 * Convenience function to assess single bet value
 */
export function assessBetValue(
  betType: BetType,
  selection: string,
  modelProbability: number,
  marketOdds: number
): ValueAssessment {
  return valueCalculator.assessValue(
    betType,
    selection,
    modelProbability,
    marketOdds
  );
}
