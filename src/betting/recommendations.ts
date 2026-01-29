/**
 * Betting Recommendations Engine
 *
 * Generates betting recommendations using:
 * - Value assessments from model vs market odds
 * - Kelly Criterion for optimal stake sizing
 * - Risk management constraints
 * - Bet type preferences based on market efficiency
 */

import type {
  BetRecommendation,
  BetType,
  RaceRecommendation,
  Race,
  HorseAnalysis,
  SimulationResult,
  ExoticProbabilities,
  BettingConfig,
} from "../types/index.js";
import { DEFAULT_BETTING_CONFIG } from "../types/index.js";
import {
  ValueCalculator,
  ValueAssessment,
  MarketOdds,
} from "./valueCalculator.js";
import { formatCurrency, formatPercent } from "../utils/index.js";

// ============================================================================
// KELLY CRITERION IMPLEMENTATION
// ============================================================================

/**
 * Calculate Kelly fraction for a bet
 * Kelly % = (bp - q) / b
 * where:
 *   b = decimal odds - 1 (net odds)
 *   p = probability of winning
 *   q = probability of losing (1 - p)
 */
function calculateKellyFraction(probability: number, decimalOdds: number): number {
  if (probability <= 0 || probability >= 1) return 0;
  if (decimalOdds <= 1) return 0;

  const b = decimalOdds - 1; // Net odds
  const p = probability;
  const q = 1 - p;

  const kellyFraction = (b * p - q) / b;

  // Return 0 if negative (no edge)
  return Math.max(0, kellyFraction);
}

/**
 * Apply fractional Kelly with constraints
 */
function applyKellyConstraints(
  kellyFraction: number,
  config: BettingConfig
): number {
  // Apply fractional Kelly (typically 25-50% of full Kelly)
  let stake = kellyFraction * config.kellyFraction;

  // Cap at maximum bet percentage
  stake = Math.min(stake, config.maxBetPercent / 100);

  // Minimum stake threshold (don't recommend tiny bets)
  if (stake < 0.005) return 0; // Less than 0.5% not worth it

  return stake;
}

// ============================================================================
// RECOMMENDATION ENGINE CLASS
// ============================================================================

export class RecommendationEngine {
  private valueCalculator: ValueCalculator;
  private config: BettingConfig;

  constructor(config: Partial<BettingConfig> = {}) {
    this.config = { ...DEFAULT_BETTING_CONFIG, ...config };
    this.valueCalculator = new ValueCalculator(this.config.minEdgeThreshold);
  }

  /**
   * Generate betting recommendations for a race
   */
  generateRecommendations(
    race: Race,
    analyses: HorseAnalysis[],
    simResults: SimulationResult[],
    exoticProbs: ExoticProbabilities,
    marketOdds: MarketOdds
  ): RaceRecommendation {
    // Find all value bets
    const valueBets = this.valueCalculator.findAllValueBets(
      simResults,
      exoticProbs,
      marketOdds
    );

    // Filter to preferred bet types
    const filteredBets = valueBets.filter((v) =>
      this.config.preferredBetTypes.includes(v.betType)
    );

    // Generate recommendations with stakes
    const recommendations = this.createRecommendations(filteredBets);

    // Apply race-level constraints
    const constrainedRecs = this.applyRaceConstraints(recommendations);

    // Calculate totals
    const totalRecommendedStake = constrainedRecs.reduce(
      (sum, r) => sum + r.recommendedStake,
      0
    );

    // Create top picks summary
    const topPicks = this.createTopPicks(simResults, marketOdds);

    return {
      raceId: race.id,
      race,
      analysis: analyses,
      simulations: simResults,
      exoticProbabilities: exoticProbs,
      recommendations: constrainedRecs,
      totalRecommendedStake,
      topPicks,
    };
  }

  /**
   * Create bet recommendations from value assessments
   */
  private createRecommendations(
    valueBets: ValueAssessment[]
  ): BetRecommendation[] {
    const recommendations: BetRecommendation[] = [];

    for (const value of valueBets) {
      // Calculate Kelly stake
      const kellyFraction = calculateKellyFraction(
        value.modelProbability,
        value.marketOdds
      );

      const stakeFraction = applyKellyConstraints(kellyFraction, this.config);

      if (stakeFraction === 0) continue;

      const recommendedStake = Math.round(
        this.config.bankroll * stakeFraction
      );
      const maxStake = Math.round(
        this.config.bankroll * (this.config.maxBetPercent / 100)
      );

      // Generate reasoning
      const reasoning = this.generateReasoning(value);

      recommendations.push({
        betType: value.betType,
        selection: value.selection,
        modelProbability: value.modelProbability,
        marketProbability: value.marketProbability,
        edge: value.edge,
        expectedOdds: value.modelOdds,
        currentOdds: value.marketOdds,
        recommendedStake,
        maxStake,
        expectedValue: value.expectedValue,
        confidence: value.confidence,
        reasoning,
      });
    }

    // Sort by expected value
    return recommendations.sort(
      (a, b) => b.expectedValue - a.expectedValue
    );
  }

  /**
   * Apply race-level constraints (max total stake per race)
   */
  private applyRaceConstraints(
    recommendations: BetRecommendation[]
  ): BetRecommendation[] {
    const maxRaceStake = this.config.bankroll * (this.config.maxRacePercent / 100);
    let totalStake = 0;

    const constrained: BetRecommendation[] = [];

    for (const rec of recommendations) {
      if (totalStake >= maxRaceStake) break;

      const availableStake = maxRaceStake - totalStake;
      const adjustedStake = Math.min(rec.recommendedStake, availableStake);

      if (adjustedStake > 0) {
        constrained.push({
          ...rec,
          recommendedStake: adjustedStake,
        });
        totalStake += adjustedStake;
      }
    }

    return constrained;
  }

  /**
   * Generate human-readable reasoning for a bet
   */
  private generateReasoning(value: ValueAssessment): string {
    const parts: string[] = [];

    // Edge description
    if (value.edge >= 30) {
      parts.push(`Strong edge of ${value.edge.toFixed(1)}% vs market`);
    } else if (value.edge >= 20) {
      parts.push(`Good edge of ${value.edge.toFixed(1)}% vs market`);
    } else {
      parts.push(`Edge of ${value.edge.toFixed(1)}% vs market`);
    }

    // Probability context
    if (value.betType === "Win") {
      if (value.modelProbability >= 0.25) {
        parts.push("Strong winning chance");
      } else if (value.modelProbability >= 0.15) {
        parts.push("Decent winning chance");
      }
    } else if (value.betType === "Place") {
      if (value.modelProbability >= 0.6) {
        parts.push("Very likely to place");
      } else if (value.modelProbability >= 0.45) {
        parts.push("Good placing chance");
      }
    } else if (value.betType === "Quinella" || value.betType === "Quinella Place") {
      parts.push("Market undervaluing this combination");
    }

    // Expected value
    if (value.expectedValue >= 0.3) {
      parts.push(`EV: +${formatPercent(value.expectedValue)} per $1`);
    }

    return parts.join(". ") + ".";
  }

  /**
   * Create top picks summary
   */
  private createTopPicks(
    simResults: SimulationResult[],
    marketOdds: MarketOdds
  ): RaceRecommendation["topPicks"] {
    return simResults.slice(0, 5).map((result, index) => {
      const marketOddsValue = marketOdds.winOdds.get(result.horseNumber) ?? 0;
      const marketProb = marketOddsValue > 0 ? 1 / marketOddsValue : 0;
      const value = marketProb > 0 ? result.winProbability / marketProb : 1;

      return {
        rank: index + 1,
        horseNumber: result.horseNumber,
        horseName: result.horseName,
        winProb: result.winProbability,
        value,
      };
    });
  }

  /**
   * Format recommendations as a readable report
   */
  formatReport(recommendation: RaceRecommendation): string {
    const lines: string[] = [];

    // Header
    lines.push("═".repeat(60));
    lines.push(
      `RACE ${recommendation.race.raceNumber} - ${recommendation.race.venue} | ${recommendation.race.class} | ${recommendation.race.distance}m ${recommendation.race.surface}`
    );
    lines.push("═".repeat(60));
    lines.push("");

    // Top Contenders
    lines.push("TOP CONTENDERS:");
    lines.push(
      "#  Horse           Win%   Place%  Value  Rating"
    );
    lines.push("─".repeat(50));

    for (const pick of recommendation.topPicks) {
      const winPct = formatPercent(pick.winProb);
      const analysis = recommendation.analysis.find(
        (a) => a.horseName === pick.horseName
      );
      const placeResult = recommendation.simulations.find(
        (s) => s.horseName === pick.horseName
      );
      const placePct = placeResult
        ? formatPercent(placeResult.placeProbability)
        : "N/A";

      const stars = this.getStarRating(analysis?.overallRating ?? 0);

      lines.push(
        `${pick.horseNumber.toString().padStart(2)}  ${pick.horseName.padEnd(14).substring(0, 14)} ${winPct.padStart(6)}  ${placePct.padStart(6)}  ${pick.value.toFixed(2).padStart(5)}  ${stars}`
      );
    }

    lines.push("");

    // Recommended Bets
    if (recommendation.recommendations.length > 0) {
      lines.push("RECOMMENDED BETS:");
      lines.push("┌" + "─".repeat(52) + "┐");
      lines.push(
        "│ BET TYPE      │ SELECTION    │ ODDS  │ STAKE  │"
      );
      lines.push("├" + "─".repeat(52) + "┤");

      for (const rec of recommendation.recommendations) {
        const betType = rec.betType.padEnd(13).substring(0, 13);
        const selection = rec.selection.padEnd(12).substring(0, 12);
        const odds = (rec.currentOdds?.toFixed(2) ?? "N/A").padStart(5);
        const stake = formatCurrency(rec.recommendedStake).padStart(6);

        lines.push(`│ ${betType} │ ${selection} │ ${odds} │ ${stake} │`);
      }

      lines.push("└" + "─".repeat(52) + "┘");
      lines.push("");

      // Edge Analysis
      const topRec = recommendation.recommendations[0];
      if (topRec) {
        lines.push(
          `Edge Analysis: ${topRec.selection} shows ${topRec.edge.toFixed(0)}% edge vs market.`
        );
        lines.push(`Confidence: ${topRec.confidence} (${topRec.reasoning})`);
      }
    } else {
      lines.push("NO VALUE BETS FOUND");
      lines.push("(No bets meet the minimum edge threshold)");
    }

    lines.push("");
    lines.push(
      `Total Stake: ${formatCurrency(recommendation.totalRecommendedStake)}`
    );
    lines.push("");

    return lines.join("\n");
  }

  /**
   * Get star rating string
   */
  private getStarRating(rating: number): string {
    const stars = Math.round(rating / 20);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<BettingConfig>): void {
    this.config = { ...this.config, ...config };
    this.valueCalculator = new ValueCalculator(this.config.minEdgeThreshold);
  }

  /**
   * Get current configuration
   */
  getConfig(): BettingConfig {
    return { ...this.config };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const recommendationEngine = new RecommendationEngine();

/**
 * Convenience function to generate recommendations
 */
export function generateBettingRecommendations(
  race: Race,
  analyses: HorseAnalysis[],
  simResults: SimulationResult[],
  exoticProbs: ExoticProbabilities,
  marketOdds: MarketOdds
): RaceRecommendation {
  return recommendationEngine.generateRecommendations(
    race,
    analyses,
    simResults,
    exoticProbs,
    marketOdds
  );
}

/**
 * Convenience function to format report
 */
export function formatRaceReport(recommendation: RaceRecommendation): string {
  return recommendationEngine.formatReport(recommendation);
}

/**
 * Calculate Kelly stake for a single bet
 */
export function calculateKellyStake(
  probability: number,
  decimalOdds: number,
  bankroll: number,
  kellyFraction: number = 0.25
): number {
  const kelly = calculateKellyFraction(probability, decimalOdds);
  const stake = kelly * kellyFraction * bankroll;

  // Minimum $10 stake
  return stake >= 10 ? Math.round(stake) : 0;
}
