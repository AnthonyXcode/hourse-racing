/**
 * Monte Carlo Race Simulator
 *
 * Simulates horse races thousands of times to generate:
 * - Win probabilities
 * - Place probabilities (Top 3)
 * - Exacta/Quinella probability matrices
 * - Expected finishing positions
 */

import type {
  Race,
  RaceEntry,
  HorseAnalysis,
  SimulationResult,
  ExoticProbabilities,
} from "../types/index.js";
import { randomNormal, clamp } from "../utils/index.js";
import { FormAnalyzer } from "../analysis/formAnalysis.js";

// ============================================================================
// SIMULATION CONFIGURATION
// ============================================================================

interface SimulationConfig {
  /** Number of simulation runs */
  runs: number;
  /** Standard deviation for performance variance */
  performanceStdDev: number;
  /** Minimum probability threshold to report */
  minProbabilityThreshold: number;
}

const DEFAULT_CONFIG: SimulationConfig = {
  runs: 10000,
  performanceStdDev: 8, // Rating points
  minProbabilityThreshold: 0.001, // 0.1%
};

// ============================================================================
// MONTE CARLO SIMULATOR CLASS
// ============================================================================

export class MonteCarloSimulator {
  private config: SimulationConfig;
  private formAnalyzer: FormAnalyzer;

  constructor(config: Partial<SimulationConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.formAnalyzer = new FormAnalyzer();
  }

  /**
   * Simulate a race and return probabilities
   */
  simulateRace(race: Race): {
    results: SimulationResult[];
    exoticProbabilities: ExoticProbabilities;
  } {
    // Analyze all horses
    const analyses = this.formAnalyzer.analyzeRace(race);

    // Map horse numbers to analyses
    const horseMap = new Map<number, HorseAnalysis>();
    for (const entry of race.entries) {
      if (entry.isScratched) continue;
      const analysis = analyses.find((a) => a.horseCode === entry.horse.code);
      if (analysis) {
        horseMap.set(entry.horseNumber, analysis);
      }
    }

    // Initialize counters
    const winCounts = new Map<number, number>();
    const placeCounts = new Map<number, number>(); // Top 3
    const positionSums = new Map<number, number>();
    const positionSqSums = new Map<number, number>();
    const exactaCounts = new Map<string, number>(); // "1-2" format
    const quinellaCounts = new Map<string, number>();
    const tierceCounts = new Map<string, number>(); // "1-2-3" format
    const trioCounts = new Map<string, number>(); // Any order top 3

    const horseNumbers = Array.from(horseMap.keys());

    // Initialize counters
    for (const num of horseNumbers) {
      winCounts.set(num, 0);
      placeCounts.set(num, 0);
      positionSums.set(num, 0);
      positionSqSums.set(num, 0);
    }

    // Run simulations
    for (let run = 0; run < this.config.runs; run++) {
      const finishOrder = this.simulateSingleRace(horseMap);

      // Record results
      for (let pos = 0; pos < finishOrder.length; pos++) {
        const horseNum = finishOrder[pos]!;
        const position = pos + 1;

        // Win (1st place)
        if (position === 1) {
          winCounts.set(horseNum, (winCounts.get(horseNum) ?? 0) + 1);
        }

        // Place (Top 3)
        if (position <= 3) {
          placeCounts.set(horseNum, (placeCounts.get(horseNum) ?? 0) + 1);
        }

        // Position tracking for average/std dev
        positionSums.set(
          horseNum,
          (positionSums.get(horseNum) ?? 0) + position
        );
        positionSqSums.set(
          horseNum,
          (positionSqSums.get(horseNum) ?? 0) + position * position
        );
      }

      // Record exotic results
      if (finishOrder.length >= 2) {
        const first = finishOrder[0]!;
        const second = finishOrder[1]!;

        // Exacta (order matters)
        const exactaKey = `${first}-${second}`;
        exactaCounts.set(exactaKey, (exactaCounts.get(exactaKey) ?? 0) + 1);

        // Quinella (order doesn't matter)
        const quinellaKey =
          first < second ? `${first}-${second}` : `${second}-${first}`;
        quinellaCounts.set(
          quinellaKey,
          (quinellaCounts.get(quinellaKey) ?? 0) + 1
        );
      }

      if (finishOrder.length >= 3) {
        const first = finishOrder[0]!;
        const second = finishOrder[1]!;
        const third = finishOrder[2]!;

        // Tierce (order matters)
        const tierceKey = `${first}-${second}-${third}`;
        tierceCounts.set(tierceKey, (tierceCounts.get(tierceKey) ?? 0) + 1);

        // Trio (order doesn't matter)
        const trioNums = [first, second, third].sort((a, b) => a - b);
        const trioKey = trioNums.join("-");
        trioCounts.set(trioKey, (trioCounts.get(trioKey) ?? 0) + 1);
      }
    }

    // Calculate probabilities
    const results: SimulationResult[] = [];

    for (const [horseNum, analysis] of horseMap) {
      const wins = winCounts.get(horseNum) ?? 0;
      const places = placeCounts.get(horseNum) ?? 0;
      const posSum = positionSums.get(horseNum) ?? 0;
      const posSqSum = positionSqSums.get(horseNum) ?? 0;

      const expectedPos = posSum / this.config.runs;
      const variance = posSqSum / this.config.runs - expectedPos * expectedPos;
      const stdDev = Math.sqrt(Math.max(0, variance));

      const entry = race.entries.find((e) => e.horseNumber === horseNum);
      const formRecordCount = entry?.horse.pastPerformances?.length ?? 0;

      results.push({
        horseNumber: horseNum,
        horseCode: analysis.horseCode,
        horseName: analysis.horseName,
        winProbability: wins / this.config.runs,
        placeProbability: places / this.config.runs,
        expectedPosition: expectedPos,
        positionStdDev: stdDev,
        simulationRuns: this.config.runs,
        formRecordCount,
      });
    }

    // Sort by win probability
    results.sort((a, b) => b.winProbability - a.winProbability);

    // Convert exotic counts to probabilities
    const exoticProbabilities: ExoticProbabilities = {
      quinella: this.countsToProbs(quinellaCounts),
      quinellaPlace: this.calculateQuinellaPlace(results),
      tierce: this.countsToProbs(tierceCounts),
      trio: this.countsToProbs(trioCounts),
    };

    return { results, exoticProbabilities };
  }

  /**
   * Simulate a single race run
   * Returns array of horse numbers in finish order
   */
  private simulateSingleRace(
    horseMap: Map<number, HorseAnalysis>
  ): number[] {
    const performances: { horseNum: number; performance: number }[] = [];

    for (const [horseNum, analysis] of horseMap) {
      // Base performance from overall rating
      const basePerformance = analysis.overallRating;

      // Add random variance (normally distributed)
      const variance = randomNormal(0, this.config.performanceStdDev);

      // Additional variance factors
      const formVariance = this.calculateFormVariance(analysis);

      // Total performance for this simulation
      const totalPerformance = basePerformance + variance + formVariance;

      performances.push({
        horseNum,
        performance: totalPerformance,
      });
    }

    // Sort by performance (higher = better)
    performances.sort((a, b) => b.performance - a.performance);

    return performances.map((p) => p.horseNum);
  }

  /**
   * Calculate additional variance based on form consistency
   */
  private calculateFormVariance(analysis: HorseAnalysis): number {
    // Horses with inconsistent form have higher variance
    const formConsistency = analysis.formScore;

    // More consistent = less additional variance
    // Form score 0.8+ = very consistent, 0.4- = inconsistent
    const inconsistencyFactor = 1 - formConsistency;
    const additionalVariance = randomNormal(0, inconsistencyFactor * 5);

    return additionalVariance;
  }

  /**
   * Convert count map to probability map
   */
  private countsToProbs(counts: Map<string, number>): Map<string, number> {
    const probs = new Map<string, number>();

    for (const [key, count] of counts) {
      const prob = count / this.config.runs;
      if (prob >= this.config.minProbabilityThreshold) {
        probs.set(key, prob);
      }
    }

    return probs;
  }

  /**
   * Calculate Quinella Place probabilities
   * QP pays if your two horses finish in any two of the top 3 positions
   */
  private calculateQuinellaPlace(
    results: SimulationResult[]
  ): Map<string, number> {
    const qpProbs = new Map<string, number>();

    // For each pair of horses
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        const horse1 = results[i]!;
        const horse2 = results[j]!;

        // Approximate QP probability
        // P(both in top 3) ≈ P(A in top 3) * P(B in top 3 | A in top 3)
        // This is a simplification; proper calculation would need position matrices
        const prob1 = horse1.placeProbability;
        const prob2 = horse2.placeProbability;

        // Approximate conditional probability
        // If one is in top 3, the other has slightly lower chance
        const fieldSize = results.length;
        const conditionalFactor = (fieldSize - 1) / fieldSize;

        const qpProb = prob1 * prob2 * conditionalFactor * 3; // Multiply by 3 for 3 place positions

        // Clamp to valid probability
        const clampedProb = Math.min(1, qpProb);

        if (clampedProb >= this.config.minProbabilityThreshold) {
          const key = `${Math.min(horse1.horseNumber, horse2.horseNumber)}-${Math.max(horse1.horseNumber, horse2.horseNumber)}`;
          qpProbs.set(key, clampedProb);
        }
      }
    }

    return qpProbs;
  }

  /**
   * Get top N most likely outcomes for an exotic bet type
   */
  getTopExoticOutcomes(
    probs: Map<string, number>,
    n: number = 10
  ): { combination: string; probability: number }[] {
    const sorted = Array.from(probs.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, n);

    return sorted.map(([combination, probability]) => ({
      combination,
      probability,
    }));
  }

  /**
   * Calculate fair odds from probability
   */
  probabilityToFairOdds(probability: number): number {
    if (probability <= 0) return Infinity;
    if (probability >= 1) return 1;
    return 1 / probability;
  }

  /**
   * Simulate multiple scenarios with different configurations
   */
  runSensitivityAnalysis(
    race: Race,
    stdDevRange: number[] = [5, 8, 12]
  ): Map<number, SimulationResult[]> {
    const results = new Map<number, SimulationResult[]>();

    for (const stdDev of stdDevRange) {
      const simulator = new MonteCarloSimulator({
        ...this.config,
        performanceStdDev: stdDev,
      });

      const { results: simResults } = simulator.simulateRace(race);
      results.set(stdDev, simResults);
    }

    return results;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const defaultSimulator = new MonteCarloSimulator();

/**
 * Convenience function to simulate a race
 */
export function simulateRace(race: Race): {
  results: SimulationResult[];
  exoticProbabilities: ExoticProbabilities;
} {
  return defaultSimulator.simulateRace(race);
}

/**
 * Create a custom simulator with specific configuration
 */
export function createSimulator(
  config: Partial<SimulationConfig>
): MonteCarloSimulator {
  return new MonteCarloSimulator(config);
}
