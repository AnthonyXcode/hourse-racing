/**
 * Backtesting Module
 *
 * Tests the betting strategy against historical race data to measure:
 * - Return on Investment (ROI)
 * - Win rate / Hit rate
 * - Brier Score (probability calibration)
 * - Profit/Loss breakdown by bet type
 */

import { format, subDays, parse } from "date-fns";
import type {
  Race,
  RaceResult,
  RaceEntry,
  BetRecommendation,
  SimulationResult,
  ExoticProbabilities,
  BettingConfig,
  Venue,
  Horse,
  Jockey,
  Trainer,
} from "../types/index.js";
import { FormAnalyzer } from "../analysis/formAnalysis.js";
import { MonteCarloSimulator } from "../simulation/monteCarlo.js";
import { RecommendationEngine } from "../betting/recommendations.js";
import { ValueCalculator, MarketOdds } from "../betting/valueCalculator.js";

// ============================================================================
// BACKTEST TYPES
// ============================================================================

export interface BetResult {
  raceId: string;
  raceDate: Date;
  betType: string;
  selection: string;
  stake: number;
  odds: number;
  modelProb: number;
  edge: number;
  won: boolean;
  payout: number;
  profit: number;
}

export interface RaceBacktestResult {
  raceId: string;
  date: Date;
  venue: Venue;
  raceNumber: number;
  predictions: {
    horseNumber: number;
    horseName: string;
    predictedWinProb: number;
    predictedPlaceProb: number;
    actualPosition: number;
  }[];
  betsPlaced: BetResult[];
  totalStaked: number;
  totalReturn: number;
  profit: number;
  brierScoreWin: number;
  brierScorePlace: number;
}

export interface BacktestSummary {
  period: {
    start: Date;
    end: Date;
    racingDays: number;
    totalRaces: number;
  };
  performance: {
    totalBets: number;
    totalStaked: number;
    totalReturn: number;
    netProfit: number;
    roi: number;
    hitRate: number;
    avgOddsWon: number;
    avgOddsLost: number;
  };
  byBetType: Map<
    string,
    {
      bets: number;
      staked: number;
      returned: number;
      profit: number;
      roi: number;
      hitRate: number;
    }
  >;
  calibration: {
    brierScoreWin: number;
    brierScorePlace: number;
    overconfidence: number;
    underconfidence: number;
  };
  topWins: BetResult[];
  worstLosses: BetResult[];
  raceResults: RaceBacktestResult[];
}

// ============================================================================
// SAMPLE HISTORICAL DATA
// In production, this would come from the scraper
// ============================================================================

interface HistoricalRaceData {
  date: Date;
  venue: Venue;
  raceNumber: number;
  class: string;
  distance: number;
  surface: "Turf" | "AWT";
  going: string;
  entries: {
    horseNumber: number;
    horseName: string;
    draw: number;
    weight: number;
    jockey: string;
    trainer: string;
    rating: number;
    form: string;
    odds: number;
  }[];
  result: {
    positions: number[]; // horseNumber in finish order
    winDividend: number;
    placeDividends: number[];
    quinellaDividend: number;
    quinellaPlaceDividends: number[];
  };
}

// Sample data representing last 5 racing days
// In production, this would be scraped from HKJC
const SAMPLE_HISTORICAL_DATA: HistoricalRaceData[] = [
  // Racing Day 1 - Sha Tin (5 days ago)
  {
    date: subDays(new Date(), 5),
    venue: "Sha Tin",
    raceNumber: 1,
    class: "Class 4",
    distance: 1200,
    surface: "Turf",
    going: "Good to Firm",
    entries: [
      { horseNumber: 1, horseName: "Lucky Star", draw: 1, weight: 126, jockey: "Z Purton", trainer: "J Size", rating: 72, form: "2-1-3-4-2", odds: 4.5 },
      { horseNumber: 2, horseName: "Golden Express", draw: 5, weight: 124, jockey: "J Moreira", trainer: "F Lui", rating: 70, form: "1-2-1-3-5", odds: 3.2 },
      { horseNumber: 3, horseName: "Silver Runner", draw: 3, weight: 122, jockey: "K Teetan", trainer: "C Fownes", rating: 68, form: "3-4-2-1-4", odds: 6.8 },
      { horseNumber: 4, horseName: "Thunder Bolt", draw: 8, weight: 120, jockey: "L Ferraris", trainer: "D Whyte", rating: 65, form: "4-3-5-2-3", odds: 12.0 },
      { horseNumber: 5, horseName: "Fast Forward", draw: 2, weight: 118, jockey: "H Bowman", trainer: "P Yiu", rating: 63, form: "5-6-4-5-6", odds: 18.0 },
      { horseNumber: 6, horseName: "Happy Days", draw: 6, weight: 116, jockey: "A Badel", trainer: "R Gibson", rating: 60, form: "6-5-6-4-5", odds: 25.0 },
    ],
    result: {
      positions: [2, 1, 3, 4, 6, 5],
      winDividend: 3.2,
      placeDividends: [1.6, 2.1, 2.8],
      quinellaDividend: 12.5,
      quinellaPlaceDividends: [4.2, 6.8, 8.5],
    },
  },
  {
    date: subDays(new Date(), 5),
    venue: "Sha Tin",
    raceNumber: 5,
    class: "Class 3",
    distance: 1400,
    surface: "Turf",
    going: "Good to Firm",
    entries: [
      { horseNumber: 1, horseName: "Champion Spirit", draw: 4, weight: 128, jockey: "Z Purton", trainer: "J Size", rating: 82, form: "1-1-2-1-3", odds: 2.8 },
      { horseNumber: 2, horseName: "Rising Star", draw: 7, weight: 126, jockey: "J Moreira", trainer: "C Fownes", rating: 80, form: "2-3-1-2-1", odds: 4.2 },
      { horseNumber: 3, horseName: "Ocean Warrior", draw: 2, weight: 124, jockey: "K Teetan", trainer: "F Lui", rating: 78, form: "3-2-4-3-2", odds: 7.5 },
      { horseNumber: 4, horseName: "Mountain Peak", draw: 10, weight: 122, jockey: "L Ferraris", trainer: "D Whyte", rating: 75, form: "4-5-3-4-4", odds: 15.0 },
      { horseNumber: 5, horseName: "Valley King", draw: 1, weight: 120, jockey: "H Bowman", trainer: "P Yiu", rating: 72, form: "5-4-5-6-5", odds: 22.0 },
    ],
    result: {
      positions: [1, 3, 2, 5, 4],
      winDividend: 2.8,
      placeDividends: [1.4, 2.4, 1.9],
      quinellaDividend: 18.0,
      quinellaPlaceDividends: [5.5, 4.8, 7.2],
    },
  },
  // Racing Day 2 - Happy Valley (4 days ago)
  {
    date: subDays(new Date(), 4),
    venue: "Happy Valley",
    raceNumber: 3,
    class: "Class 4",
    distance: 1200,
    surface: "Turf",
    going: "Good",
    entries: [
      { horseNumber: 1, horseName: "Night Rider", draw: 6, weight: 126, jockey: "Z Purton", trainer: "J Size", rating: 70, form: "2-3-1-2-4", odds: 5.0 },
      { horseNumber: 2, horseName: "City Light", draw: 3, weight: 124, jockey: "J Moreira", trainer: "C Fownes", rating: 68, form: "1-4-2-3-1", odds: 3.8 },
      { horseNumber: 3, horseName: "Harbor View", draw: 1, weight: 122, jockey: "K Teetan", trainer: "F Lui", rating: 66, form: "4-2-3-1-3", odds: 6.5 },
      { horseNumber: 4, horseName: "Track Star", draw: 8, weight: 120, jockey: "L Ferraris", trainer: "D Whyte", rating: 64, form: "3-5-4-5-2", odds: 11.0 },
      { horseNumber: 5, horseName: "Speed Demon", draw: 4, weight: 118, jockey: "H Bowman", trainer: "P Yiu", rating: 62, form: "5-6-5-4-6", odds: 20.0 },
    ],
    result: {
      positions: [2, 3, 1, 4, 5],
      winDividend: 3.8,
      placeDividends: [1.8, 2.5, 2.2],
      quinellaDividend: 22.0,
      quinellaPlaceDividends: [6.5, 5.8, 9.0],
    },
  },
  // Racing Day 3 - Sha Tin (3 days ago)
  {
    date: subDays(new Date(), 3),
    venue: "Sha Tin",
    raceNumber: 7,
    class: "Class 2",
    distance: 1600,
    surface: "Turf",
    going: "Good",
    entries: [
      { horseNumber: 1, horseName: "Elite Champion", draw: 3, weight: 128, jockey: "Z Purton", trainer: "J Size", rating: 92, form: "1-2-1-1-2", odds: 2.2 },
      { horseNumber: 2, horseName: "Premier League", draw: 6, weight: 126, jockey: "J Moreira", trainer: "C Fownes", rating: 90, form: "2-1-2-3-1", odds: 3.5 },
      { horseNumber: 3, horseName: "Top Class", draw: 1, weight: 124, jockey: "K Teetan", trainer: "F Lui", rating: 88, form: "3-3-4-2-3", odds: 8.0 },
      { horseNumber: 4, horseName: "High Flyer", draw: 9, weight: 122, jockey: "L Ferraris", trainer: "D Whyte", rating: 85, form: "4-4-3-5-4", odds: 14.0 },
      { horseNumber: 5, horseName: "Sky Rocket", draw: 5, weight: 120, jockey: "H Bowman", trainer: "P Yiu", rating: 82, form: "5-5-5-4-5", odds: 28.0 },
    ],
    result: {
      positions: [2, 1, 3, 4, 5],
      winDividend: 3.5,
      placeDividends: [1.5, 1.3, 2.6],
      quinellaDividend: 8.5,
      quinellaPlaceDividends: [3.2, 4.5, 5.8],
    },
  },
  // Racing Day 4 - Happy Valley (2 days ago)
  {
    date: subDays(new Date(), 2),
    venue: "Happy Valley",
    raceNumber: 5,
    class: "Class 3",
    distance: 1650,
    surface: "Turf",
    going: "Good to Yielding",
    entries: [
      { horseNumber: 1, horseName: "Midnight Sun", draw: 5, weight: 126, jockey: "Z Purton", trainer: "J Size", rating: 80, form: "2-1-3-2-1", odds: 3.5 },
      { horseNumber: 2, horseName: "Dawn Patrol", draw: 2, weight: 124, jockey: "J Moreira", trainer: "C Fownes", rating: 78, form: "1-2-2-1-3", odds: 4.0 },
      { horseNumber: 3, horseName: "Sunrise Glory", draw: 7, weight: 122, jockey: "K Teetan", trainer: "F Lui", rating: 76, form: "3-4-1-3-2", odds: 6.0 },
      { horseNumber: 4, horseName: "Evening Star", draw: 4, weight: 120, jockey: "L Ferraris", trainer: "D Whyte", rating: 73, form: "4-3-4-4-5", odds: 12.0 },
      { horseNumber: 5, horseName: "Twilight Zone", draw: 1, weight: 118, jockey: "H Bowman", trainer: "P Yiu", rating: 70, form: "5-5-5-6-4", odds: 18.0 },
    ],
    result: {
      positions: [3, 1, 2, 4, 5],
      winDividend: 6.0,
      placeDividends: [2.4, 1.6, 1.8],
      quinellaDividend: 15.0,
      quinellaPlaceDividends: [4.5, 5.2, 3.8],
    },
  },
  // Racing Day 5 - Sha Tin (yesterday)
  {
    date: subDays(new Date(), 1),
    venue: "Sha Tin",
    raceNumber: 4,
    class: "Class 4",
    distance: 1400,
    surface: "AWT",
    going: "Wet Fast",
    entries: [
      { horseNumber: 1, horseName: "Steel Force", draw: 2, weight: 126, jockey: "Z Purton", trainer: "J Size", rating: 72, form: "1-3-2-1-4", odds: 4.0 },
      { horseNumber: 2, horseName: "Iron Will", draw: 5, weight: 124, jockey: "J Moreira", trainer: "C Fownes", rating: 70, form: "2-1-3-2-1", odds: 3.5 },
      { horseNumber: 3, horseName: "Bronze Medal", draw: 8, weight: 122, jockey: "K Teetan", trainer: "F Lui", rating: 68, form: "3-2-4-3-3", odds: 7.0 },
      { horseNumber: 4, horseName: "Silver Lining", draw: 3, weight: 120, jockey: "L Ferraris", trainer: "D Whyte", rating: 65, form: "4-5-1-4-2", odds: 10.0 },
      { horseNumber: 5, horseName: "Gold Rush", draw: 6, weight: 118, jockey: "H Bowman", trainer: "P Yiu", rating: 62, form: "5-4-5-5-6", odds: 16.0 },
    ],
    result: {
      positions: [4, 2, 1, 3, 5],
      winDividend: 10.0,
      placeDividends: [3.2, 1.8, 2.0],
      quinellaDividend: 35.0,
      quinellaPlaceDividends: [8.5, 6.2, 7.8],
    },
  },
];

// ============================================================================
// BACKTESTER CLASS
// ============================================================================

export class Backtester {
  private formAnalyzer: FormAnalyzer;
  private simulator: MonteCarloSimulator;
  private recommendationEngine: RecommendationEngine;
  private valueCalculator: ValueCalculator;
  private config: BettingConfig;

  constructor(config: Partial<BettingConfig> = {}) {
    this.config = {
      bankroll: 10000,
      maxBetPercent: 5,
      maxRacePercent: 10,
      minEdgeThreshold: 15,
      kellyFraction: 0.25,
      preferredBetTypes: ["Place", "Quinella", "Quinella Place"],
      ...config,
    };

    this.formAnalyzer = new FormAnalyzer();
    this.simulator = new MonteCarloSimulator({ runs: 5000 }); // Faster for backtesting
    this.recommendationEngine = new RecommendationEngine(this.config);
    this.valueCalculator = new ValueCalculator(this.config.minEdgeThreshold);
  }

  /**
   * Run backtest on historical data
   */
  async runBacktest(data: HistoricalRaceData[] = SAMPLE_HISTORICAL_DATA): Promise<BacktestSummary> {
    const raceResults: RaceBacktestResult[] = [];
    const allBets: BetResult[] = [];

    console.log(`\nRunning backtest on ${data.length} races...`);
    console.log("─".repeat(60));

    for (const raceData of data) {
      const result = this.backtestRace(raceData);
      raceResults.push(result);
      allBets.push(...result.betsPlaced);

      console.log(
        `${format(raceData.date, "yyyy-MM-dd")} ${raceData.venue} R${raceData.raceNumber}: ` +
        `${result.betsPlaced.length} bets, P/L: $${result.profit.toFixed(0)}`
      );
    }

    // Calculate summary statistics
    const summary = this.calculateSummary(raceResults, allBets, data);

    return summary;
  }

  /**
   * Backtest a single race
   */
  private backtestRace(raceData: HistoricalRaceData): RaceBacktestResult {
    // Convert to Race format
    const race = this.convertToRace(raceData);

    // Run analysis (without knowing results)
    const analyses = this.formAnalyzer.analyzeRace(race);

    // Run simulation
    const { results: simResults, exoticProbabilities } = this.simulator.simulateRace(race);

    // Create market odds from historical data
    const marketOdds = this.createMarketOdds(raceData);

    // Generate recommendations
    const recommendation = this.recommendationEngine.generateRecommendations(
      race,
      analyses,
      simResults,
      exoticProbabilities,
      marketOdds
    );

    // Evaluate bets against actual results
    const betsPlaced = this.evaluateBets(
      recommendation.recommendations,
      raceData,
      race.id
    );

    // Calculate prediction accuracy
    const predictions = this.evaluatePredictions(simResults, raceData);

    // Calculate Brier scores
    const brierScoreWin = this.calculateBrierScore(simResults, raceData, "win");
    const brierScorePlace = this.calculateBrierScore(simResults, raceData, "place");

    const totalStaked = betsPlaced.reduce((sum, b) => sum + b.stake, 0);
    const totalReturn = betsPlaced.reduce((sum, b) => sum + b.payout, 0);

    return {
      raceId: race.id,
      date: raceData.date,
      venue: raceData.venue,
      raceNumber: raceData.raceNumber,
      predictions,
      betsPlaced,
      totalStaked,
      totalReturn,
      profit: totalReturn - totalStaked,
      brierScoreWin,
      brierScorePlace,
    };
  }

  /**
   * Convert historical data to Race format
   */
  private convertToRace(data: HistoricalRaceData): Race {
    const entries: RaceEntry[] = data.entries.map((e) => ({
      horse: this.createMockHorse(e),
      jockey: this.createMockJockey(e.jockey),
      trainer: this.createMockTrainer(e.trainer),
      horseNumber: e.horseNumber,
      draw: e.draw,
      weight: e.weight,
      currentOdds: e.odds,
      isScratched: false,
    }));

    return {
      id: `${format(data.date, "yyyy-MM-dd")}-${data.venue === "Sha Tin" ? "ST" : "HV"}-${data.raceNumber}`,
      date: data.date,
      venue: data.venue,
      raceNumber: data.raceNumber,
      class: data.class as any,
      distance: data.distance,
      surface: data.surface,
      going: data.going as any,
      prizeMoney: 1000000,
      entries,
    };
  }

  /**
   * Create mock horse from entry data
   */
  private createMockHorse(entry: HistoricalRaceData["entries"][0]): Horse {
    const formPositions = entry.form.split("-").map(Number);

    return {
      code: `H${entry.horseNumber}`,
      name: entry.horseName,
      age: 5,
      sex: "G",
      color: "Bay",
      origin: "AUS",
      sire: "Unknown",
      dam: "Unknown",
      currentRating: entry.rating,
      seasonStarts: 6,
      seasonWins: formPositions.filter((p) => p === 1).length,
      seasonPlaces: formPositions.filter((p) => p <= 3).length,
      careerStarts: 20,
      careerWins: 3,
      careerPlaces: 8,
      totalPrizeMoney: 500000,
      gear: [],
      pastPerformances: formPositions.map((pos, i) => ({
        date: subDays(new Date(), 14 * (i + 1)),
        venue: "Sha Tin" as Venue,
        raceNumber: 1,
        raceClass: "Class 4" as any,
        distance: 1200,
        surface: "Turf" as any,
        going: "Good" as any,
        draw: entry.draw,
        weight: entry.weight,
        jockeyCode: "ZPF",
        finishPosition: pos,
        fieldSize: 12,
        winningMargin: pos === 1 ? 0 : pos * 0.5,
        finishTime: 70 + pos * 0.3,
        odds: entry.odds,
      })),
    };
  }

  /**
   * Create mock jockey
   */
  private createMockJockey(name: string): Jockey {
    const winRates: Record<string, number> = {
      "Z Purton": 0.22,
      "J Moreira": 0.20,
      "K Teetan": 0.12,
      "L Ferraris": 0.08,
      "H Bowman": 0.15,
      "A Badel": 0.10,
    };

    return {
      code: name.split(" ").map((n) => n[0]).join(""),
      name,
      nationality: "HK",
      weightClaim: 0,
      seasonStats: {
        wins: 50,
        places: 100,
        rides: 300,
        winRate: winRates[name] ?? 0.08,
        placeRate: (winRates[name] ?? 0.08) * 2.5,
        roi: 0.85,
      },
      courseStats: [],
    };
  }

  /**
   * Create mock trainer
   */
  private createMockTrainer(name: string): Trainer {
    const winRates: Record<string, number> = {
      "J Size": 0.18,
      "F Lui": 0.15,
      "C Fownes": 0.14,
      "D Whyte": 0.12,
      "P Yiu": 0.10,
      "R Gibson": 0.08,
    };

    return {
      code: name.split(" ").map((n) => n[0]).join(""),
      name,
      seasonStats: {
        wins: 40,
        places: 80,
        rides: 250,
        winRate: winRates[name] ?? 0.10,
        placeRate: (winRates[name] ?? 0.10) * 2.5,
        roi: 0.90,
      },
      courseStats: [],
      specialties: [],
    };
  }

  /**
   * Create market odds from historical data
   */
  private createMarketOdds(data: HistoricalRaceData): MarketOdds {
    const winOdds = new Map<number, number>();
    const placeOdds = new Map<number, number>();

    for (const entry of data.entries) {
      winOdds.set(entry.horseNumber, entry.odds);
      // Estimate place odds (typically 25-35% of win odds)
      placeOdds.set(entry.horseNumber, Math.max(1.1, entry.odds * 0.3));
    }

    return { winOdds, placeOdds };
  }

  /**
   * Evaluate bets against actual results
   */
  private evaluateBets(
    recommendations: readonly BetRecommendation[],
    raceData: HistoricalRaceData,
    raceId: string
  ): BetResult[] {
    const results: BetResult[] = [];
    const positions = raceData.result.positions;

    for (const rec of recommendations) {
      let won = false;
      let payout = 0;

      switch (rec.betType) {
        case "Win":
          const winHorse = parseInt(rec.selection);
          won = positions[0] === winHorse;
          if (won) payout = rec.recommendedStake * raceData.result.winDividend;
          break;

        case "Place":
          const placeHorse = parseInt(rec.selection);
          const placePos = positions.indexOf(placeHorse);
          won = placePos >= 0 && placePos < 3;
          if (won) {
            const placeDividend = raceData.result.placeDividends[placePos] ?? 1;
            payout = rec.recommendedStake * placeDividend;
          }
          break;

        case "Quinella":
          const [q1, q2] = rec.selection.split("-").map(Number);
          const quinellaWin =
            (positions[0] === q1 && positions[1] === q2) ||
            (positions[0] === q2 && positions[1] === q1);
          won = quinellaWin;
          if (won) payout = rec.recommendedStake * raceData.result.quinellaDividend;
          break;

        case "Quinella Place":
          const [qp1, qp2] = rec.selection.split("-").map(Number);
          const top3 = positions.slice(0, 3);
          const qpWin = top3.includes(qp1) && top3.includes(qp2);
          won = qpWin;
          if (won) {
            // Average of QP dividends
            const avgQP =
              raceData.result.quinellaPlaceDividends.reduce((a, b) => a + b, 0) /
              raceData.result.quinellaPlaceDividends.length;
            payout = rec.recommendedStake * avgQP;
          }
          break;
      }

      results.push({
        raceId,
        raceDate: raceData.date,
        betType: rec.betType,
        selection: rec.selection,
        stake: rec.recommendedStake,
        odds: rec.currentOdds ?? 0,
        modelProb: rec.modelProbability,
        edge: rec.edge,
        won,
        payout,
        profit: payout - rec.recommendedStake,
      });
    }

    return results;
  }

  /**
   * Evaluate prediction accuracy
   */
  private evaluatePredictions(
    simResults: SimulationResult[],
    raceData: HistoricalRaceData
  ): RaceBacktestResult["predictions"] {
    return simResults.map((sim) => {
      const actualPos = raceData.result.positions.indexOf(sim.horseNumber) + 1;
      return {
        horseNumber: sim.horseNumber,
        horseName: sim.horseName,
        predictedWinProb: sim.winProbability,
        predictedPlaceProb: sim.placeProbability,
        actualPosition: actualPos > 0 ? actualPos : raceData.entries.length,
      };
    });
  }

  /**
   * Calculate Brier score for probability calibration
   */
  private calculateBrierScore(
    simResults: SimulationResult[],
    raceData: HistoricalRaceData,
    type: "win" | "place"
  ): number {
    let sumSquaredError = 0;

    for (const sim of simResults) {
      const actualPos = raceData.result.positions.indexOf(sim.horseNumber) + 1;
      const probability = type === "win" ? sim.winProbability : sim.placeProbability;
      const outcome = type === "win" ? (actualPos === 1 ? 1 : 0) : (actualPos <= 3 ? 1 : 0);

      sumSquaredError += Math.pow(probability - outcome, 2);
    }

    return sumSquaredError / simResults.length;
  }

  /**
   * Calculate summary statistics
   */
  private calculateSummary(
    raceResults: RaceBacktestResult[],
    allBets: BetResult[],
    data: HistoricalRaceData[]
  ): BacktestSummary {
    // Period stats
    const dates = data.map((d) => d.date);
    const uniqueDays = new Set(dates.map((d) => format(d, "yyyy-MM-dd"))).size;

    // Performance stats
    const totalStaked = allBets.reduce((sum, b) => sum + b.stake, 0);
    const totalReturn = allBets.reduce((sum, b) => sum + b.payout, 0);
    const netProfit = totalReturn - totalStaked;
    const wonBets = allBets.filter((b) => b.won);

    // Average odds
    const avgOddsWon = wonBets.length > 0
      ? wonBets.reduce((sum, b) => sum + b.odds, 0) / wonBets.length
      : 0;
    const lostBets = allBets.filter((b) => !b.won);
    const avgOddsLost = lostBets.length > 0
      ? lostBets.reduce((sum, b) => sum + b.odds, 0) / lostBets.length
      : 0;

    // By bet type
    const byBetType = new Map<string, any>();
    const betTypes = [...new Set(allBets.map((b) => b.betType))];

    for (const type of betTypes) {
      const typeBets = allBets.filter((b) => b.betType === type);
      const typeWon = typeBets.filter((b) => b.won);
      const typeStaked = typeBets.reduce((sum, b) => sum + b.stake, 0);
      const typeReturn = typeBets.reduce((sum, b) => sum + b.payout, 0);

      byBetType.set(type, {
        bets: typeBets.length,
        staked: typeStaked,
        returned: typeReturn,
        profit: typeReturn - typeStaked,
        roi: typeStaked > 0 ? ((typeReturn - typeStaked) / typeStaked) * 100 : 0,
        hitRate: typeBets.length > 0 ? (typeWon.length / typeBets.length) * 100 : 0,
      });
    }

    // Calibration
    const avgBrierWin =
      raceResults.reduce((sum, r) => sum + r.brierScoreWin, 0) / raceResults.length;
    const avgBrierPlace =
      raceResults.reduce((sum, r) => sum + r.brierScorePlace, 0) / raceResults.length;

    // Identify over/under confidence
    const predictedProbs = allBets.map((b) => b.modelProb);
    const outcomes = allBets.map((b) => (b.won ? 1 : 0));
    const avgPredicted = predictedProbs.reduce((a, b) => a + b, 0) / predictedProbs.length;
    const avgOutcome = outcomes.reduce((a, b) => a + b, 0) / outcomes.length;

    return {
      period: {
        start: dates.reduce((a, b) => (a < b ? a : b)),
        end: dates.reduce((a, b) => (a > b ? a : b)),
        racingDays: uniqueDays,
        totalRaces: data.length,
      },
      performance: {
        totalBets: allBets.length,
        totalStaked,
        totalReturn,
        netProfit,
        roi: totalStaked > 0 ? (netProfit / totalStaked) * 100 : 0,
        hitRate: allBets.length > 0 ? (wonBets.length / allBets.length) * 100 : 0,
        avgOddsWon,
        avgOddsLost,
      },
      byBetType,
      calibration: {
        brierScoreWin: avgBrierWin,
        brierScorePlace: avgBrierPlace,
        overconfidence: avgPredicted > avgOutcome ? avgPredicted - avgOutcome : 0,
        underconfidence: avgOutcome > avgPredicted ? avgOutcome - avgPredicted : 0,
      },
      topWins: wonBets.sort((a, b) => b.profit - a.profit).slice(0, 3),
      worstLosses: lostBets.sort((a, b) => a.profit - b.profit).slice(0, 3),
      raceResults,
    };
  }

  /**
   * Format summary as readable report
   */
  formatReport(summary: BacktestSummary): string {
    const lines: string[] = [];

    lines.push("\n" + "═".repeat(70));
    lines.push("BACKTEST RESULTS");
    lines.push("═".repeat(70));

    // Period
    lines.push("\n## PERIOD");
    lines.push(`Start: ${format(summary.period.start, "yyyy-MM-dd")}`);
    lines.push(`End: ${format(summary.period.end, "yyyy-MM-dd")}`);
    lines.push(`Racing Days: ${summary.period.racingDays}`);
    lines.push(`Total Races: ${summary.period.totalRaces}`);

    // Overall Performance
    lines.push("\n## OVERALL PERFORMANCE");
    lines.push("─".repeat(50));
    lines.push(`Total Bets: ${summary.performance.totalBets}`);
    lines.push(`Total Staked: $${summary.performance.totalStaked.toFixed(0)}`);
    lines.push(`Total Return: $${summary.performance.totalReturn.toFixed(0)}`);
    lines.push(`Net Profit: $${summary.performance.netProfit.toFixed(0)}`);
    lines.push(`ROI: ${summary.performance.roi.toFixed(1)}%`);
    lines.push(`Hit Rate: ${summary.performance.hitRate.toFixed(1)}%`);
    lines.push(`Avg Odds (Won): ${summary.performance.avgOddsWon.toFixed(2)}`);
    lines.push(`Avg Odds (Lost): ${summary.performance.avgOddsLost.toFixed(2)}`);

    // By Bet Type
    lines.push("\n## BY BET TYPE");
    lines.push("─".repeat(50));
    lines.push("Type            Bets   Staked    Return    P/L     ROI%   Hit%");
    lines.push("─".repeat(70));

    for (const [type, stats] of summary.byBetType) {
      lines.push(
        `${type.padEnd(15)} ${stats.bets.toString().padStart(4)} ` +
        `$${stats.staked.toFixed(0).padStart(7)} ` +
        `$${stats.returned.toFixed(0).padStart(8)} ` +
        `$${stats.profit.toFixed(0).padStart(6)} ` +
        `${stats.roi.toFixed(1).padStart(6)}% ` +
        `${stats.hitRate.toFixed(1).padStart(5)}%`
      );
    }

    // Calibration
    lines.push("\n## MODEL CALIBRATION");
    lines.push("─".repeat(50));
    lines.push(`Brier Score (Win): ${summary.calibration.brierScoreWin.toFixed(3)}`);
    lines.push(`Brier Score (Place): ${summary.calibration.brierScorePlace.toFixed(3)}`);
    lines.push(`(Lower is better, <0.25 is good)`);

    if (summary.calibration.overconfidence > 0.02) {
      lines.push(`⚠ Model is overconfident by ${(summary.calibration.overconfidence * 100).toFixed(1)}%`);
    }
    if (summary.calibration.underconfidence > 0.02) {
      lines.push(`⚠ Model is underconfident by ${(summary.calibration.underconfidence * 100).toFixed(1)}%`);
    }

    // Top Wins
    if (summary.topWins.length > 0) {
      lines.push("\n## TOP WINS");
      lines.push("─".repeat(50));
      for (const bet of summary.topWins) {
        lines.push(
          `${bet.betType} ${bet.selection} @ ${bet.odds.toFixed(1)}: +$${bet.profit.toFixed(0)} ` +
          `(${format(bet.raceDate, "MM-dd")})`
        );
      }
    }

    // Worst Losses
    if (summary.worstLosses.length > 0) {
      lines.push("\n## WORST LOSSES");
      lines.push("─".repeat(50));
      for (const bet of summary.worstLosses) {
        lines.push(
          `${bet.betType} ${bet.selection} @ ${bet.odds.toFixed(1)}: -$${Math.abs(bet.profit).toFixed(0)} ` +
          `(${format(bet.raceDate, "MM-dd")})`
        );
      }
    }

    // Race by Race
    lines.push("\n## RACE BY RACE");
    lines.push("─".repeat(70));
    lines.push("Date       Venue    R#  Bets  Staked   Return    P/L   Brier");
    lines.push("─".repeat(70));

    for (const race of summary.raceResults) {
      lines.push(
        `${format(race.date, "yyyy-MM-dd")} ` +
        `${race.venue.padEnd(8).substring(0, 8)} ` +
        `${race.raceNumber.toString().padStart(2)} ` +
        `${race.betsPlaced.length.toString().padStart(4)} ` +
        `$${race.totalStaked.toFixed(0).padStart(7)} ` +
        `$${race.totalReturn.toFixed(0).padStart(8)} ` +
        `$${race.profit.toFixed(0).padStart(6)} ` +
        `${race.brierScoreWin.toFixed(3)}`
      );
    }

    lines.push("\n" + "═".repeat(70));

    return lines.join("\n");
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const backtester = new Backtester();

export async function runBacktest(): Promise<BacktestSummary> {
  return backtester.runBacktest();
}
