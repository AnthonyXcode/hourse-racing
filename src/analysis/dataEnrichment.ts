/**
 * Data Enrichment Module
 *
 * Links jockey stats, horse profiles, and race entries together
 * to create enriched data for better analysis and backtesting.
 */

import type {
  Race,
  RaceEntry,
  RaceResult,
  Horse,
  Jockey,
  PastPerformance,
  HorseAnalysis,
  Venue,
} from "../types/index.js";
import type { JockeyProfile } from "../scrapers/jockeyStats.js";
import type { HorseProfile } from "../scrapers/horseProfile.js";
import { isEliteJockey, ELITE_JOCKEYS } from "../scrapers/jockeyStats.js";
import { calculateFormScore, calculateDistanceSuitability } from "../scrapers/horseProfile.js";

// ============================================================================
// INTERFACES
// ============================================================================

export interface EnrichedRaceEntry extends RaceEntry {
  readonly jockeyStats: JockeyEntryStats;
  readonly horseStats: HorseEntryStats;
  readonly combinedScore: number;
  readonly valueRating: number;
}

export interface JockeyEntryStats {
  readonly seasonWinRate: number;
  readonly seasonPlaceRate: number;
  readonly venueWinRate: number;
  readonly distanceWinRate: number;
  readonly isElite: boolean;
  readonly eliteRank: number | null; // 1-8 for elite jockeys
  readonly recentFormScore: number; // 0-1 based on last 10 rides
  readonly trainerComboWinRate: number;
}

export interface HorseEntryStats {
  readonly formFigures: string;
  readonly formScore: number;
  readonly classIndicator: number; // Positive = dropping, negative = rising
  readonly distanceSuitability: number;
  readonly goingRecord: { wins: number; starts: number };
  readonly drawAdvantage: number;
  readonly daysSinceLastRun: number;
  readonly bestRating: number;
  readonly currentRating: number;
  readonly isImproving: boolean;
}

export interface EnrichedRace extends Omit<Race, "entries"> {
  readonly entries: readonly EnrichedRaceEntry[];
  readonly marketConfidence: number; // How well-formed is the market
  readonly predictedFavorite: number; // Horse number
  readonly keyContenders: readonly number[]; // Horse numbers of top 3-4
}

export interface SelectionCriteria {
  readonly minJockeyWinRate: number;
  readonly requireEliteJockey: boolean;
  readonly minFormScore: number;
  readonly oddsRange: { min: number; max: number };
  readonly minClassIndicator: number;
  readonly minDistanceSuitability: number;
  readonly maxDaysSinceRun: number;
}

export const DEFAULT_SELECTION_CRITERIA: SelectionCriteria = {
  minJockeyWinRate: 0.10,
  requireEliteJockey: false,
  minFormScore: 0.4,
  oddsRange: { min: 2.0, max: 10.0 },
  minClassIndicator: -1, // Allow slight class rise
  minDistanceSuitability: 0.5,
  maxDaysSinceRun: 60,
};

export const ELITE_JOCKEY_CRITERIA: SelectionCriteria = {
  minJockeyWinRate: 0.15,
  requireEliteJockey: true,
  minFormScore: 0.35,
  oddsRange: { min: 2.0, max: 7.0 },
  minClassIndicator: -2,
  minDistanceSuitability: 0.4,
  maxDaysSinceRun: 45,
};

// ============================================================================
// DATA ENRICHMENT CLASS
// ============================================================================

export class DataEnrichment {
  private jockeyProfiles: Map<string, JockeyProfile> = new Map();
  private horseProfiles: Map<string, HorseProfile> = new Map();
  private drawBiasData: Map<string, Map<number, number>> = new Map(); // venue+distance -> draw -> advantage

  /**
   * Load jockey profiles from array
   */
  loadJockeyProfiles(profiles: JockeyProfile[]): void {
    for (const profile of profiles) {
      this.jockeyProfiles.set(profile.code.toUpperCase(), profile);
      // Also index by name for fuzzy matching
      const normalizedName = this.normalizeJockeyName(profile.name);
      this.jockeyProfiles.set(normalizedName, profile);
    }
    console.log(`Loaded ${profiles.length} jockey profiles`);
  }

  /**
   * Load horse profiles from array
   */
  loadHorseProfiles(profiles: HorseProfile[]): void {
    for (const profile of profiles) {
      this.horseProfiles.set(profile.code.toUpperCase(), profile);
      // Also index by name
      const normalizedName = profile.name.toUpperCase().replace(/[^A-Z]/g, "");
      this.horseProfiles.set(normalizedName, profile);
    }
    console.log(`Loaded ${profiles.length} horse profiles`);
  }

  /**
   * Calculate draw bias from historical results
   */
  calculateDrawBias(results: RaceResult[]): void {
    // Group results by venue+distance
    const groups = new Map<string, { draw: number; position: number; fieldSize: number }[]>();

    for (const result of results) {
      const key = `${result.venue}-${result.distance}`;
      const entries = groups.get(key) || [];

      for (const horse of result.finishOrder) {
        // We'd need draw data from entries, but results don't always have it
        // For now, use horse number as proxy (not ideal)
        entries.push({
          draw: horse.horseNumber,
          position: horse.finishPosition,
          fieldSize: result.finishOrder.length,
        });
      }

      groups.set(key, entries);
    }

    // Calculate advantage by draw
    for (const [key, entries] of groups) {
      const drawStats = new Map<number, { total: number; positionSum: number }>();

      for (const entry of entries) {
        const stats = drawStats.get(entry.draw) || { total: 0, positionSum: 0 };
        stats.total++;
        // Lower position = better, so advantage is inverse
        stats.positionSum += (entry.fieldSize - entry.position) / entry.fieldSize;
        drawStats.set(entry.draw, stats);
      }

      const drawAdvantage = new Map<number, number>();
      for (const [draw, stats] of drawStats) {
        if (stats.total >= 10) { // Need enough data
          drawAdvantage.set(draw, stats.positionSum / stats.total);
        }
      }

      this.drawBiasData.set(key, drawAdvantage);
    }
  }

  /**
   * Enrich a single race entry
   */
  enrichEntry(
    entry: RaceEntry,
    race: Race
  ): EnrichedRaceEntry {
    const jockeyStats = this.getJockeyStats(entry.jockey, race);
    const horseStats = this.getHorseStats(entry.horse, race);
    
    // Calculate combined score (0-100)
    const combinedScore = this.calculateCombinedScore(jockeyStats, horseStats, entry);
    
    // Calculate value rating (edge vs odds)
    const valueRating = this.calculateValueRating(combinedScore, entry.currentOdds);

    return {
      ...entry,
      jockeyStats,
      horseStats,
      combinedScore,
      valueRating,
    };
  }

  /**
   * Get jockey statistics for entry
   */
  private getJockeyStats(jockey: Jockey, race: Race): JockeyEntryStats {
    const profile = this.findJockeyProfile(jockey);
    
    // Check if elite jockey
    const isElite = isEliteJockey(jockey.name);
    const eliteRank = this.getEliteRank(jockey.name);

    if (!profile) {
      // Return default stats based on elite status
      return {
        seasonWinRate: isElite ? 0.18 : 0.08,
        seasonPlaceRate: isElite ? 0.45 : 0.25,
        venueWinRate: isElite ? 0.17 : 0.08,
        distanceWinRate: isElite ? 0.16 : 0.07,
        isElite,
        eliteRank,
        recentFormScore: isElite ? 0.7 : 0.5,
        trainerComboWinRate: 0.1,
      };
    }

    // Find venue-specific stats
    const venueStats = profile.courseStats.find(s => s.venue === race.venue);
    
    // Find distance-specific stats
    const distanceStats = profile.distanceStats?.find(s => {
      const range = parseInt(s.distanceRange, 10);
      return Math.abs(range - race.distance) <= 200;
    });

    // Calculate recent form score from last 10 rides
    const recentRides = profile.recentForm?.slice(0, 10) || [];
    let formScore = 0.5;
    if (recentRides.length > 0) {
      const wins = recentRides.filter(r => r.finishPosition === 1).length;
      const places = recentRides.filter(r => r.finishPosition <= 3).length;
      formScore = (wins * 2 + places) / (recentRides.length * 2);
    }

    return {
      seasonWinRate: profile.seasonStats.winRate,
      seasonPlaceRate: profile.seasonStats.placeRate,
      venueWinRate: venueStats?.winRate || profile.seasonStats.winRate * 0.9,
      distanceWinRate: distanceStats?.winRate || profile.seasonStats.winRate * 0.9,
      isElite,
      eliteRank,
      recentFormScore: formScore,
      trainerComboWinRate: 0.1, // Would need trainer combo lookup
    };
  }

  /**
   * Get horse statistics for entry
   */
  private getHorseStats(horse: Horse, race: Race): HorseEntryStats {
    const profile = this.findHorseProfile(horse);

    if (!profile) {
      // Return default stats
      return {
        formFigures: "-",
        formScore: 0.5,
        classIndicator: 0,
        distanceSuitability: 0.5,
        goingRecord: { wins: 0, starts: 0 },
        drawAdvantage: 0,
        daysSinceLastRun: 30,
        bestRating: horse.currentRating,
        currentRating: horse.currentRating,
        isImproving: false,
      };
    }

    // Calculate form score
    const formScore = calculateFormScore(profile.pastPerformances);

    // Calculate class indicator
    const classIndicator = this.calculateClassIndicator(profile, race);

    // Calculate distance suitability
    const distanceSuitability = calculateDistanceSuitability(profile, race.distance);

    // Get going record
    const goingData = profile.goingRecord?.find(g => g.going === race.going);
    const goingRecord = goingData 
      ? { wins: goingData.wins, starts: goingData.starts }
      : { wins: 0, starts: 0 };

    // Get draw advantage
    const drawAdvantage = this.getDrawAdvantage(race.venue, race.distance, horse.code);

    // Calculate days since last run
    const lastRun = profile.pastPerformances[0];
    const daysSinceLastRun = lastRun 
      ? Math.floor((race.date.getTime() - lastRun.date.getTime()) / (1000 * 60 * 60 * 24))
      : 999;

    // Check if improving
    const isImproving = this.checkImproving(profile);

    return {
      formFigures: profile.formFigures,
      formScore,
      classIndicator,
      distanceSuitability,
      goingRecord,
      drawAdvantage,
      daysSinceLastRun,
      bestRating: profile.bestRating,
      currentRating: profile.currentRating,
      isImproving,
    };
  }

  /**
   * Calculate combined score (0-100)
   */
  private calculateCombinedScore(
    jockeyStats: JockeyEntryStats,
    horseStats: HorseEntryStats,
    entry: RaceEntry
  ): number {
    // Weights for different factors
    const weights = {
      jockeyWinRate: 15,
      jockeyElite: 10,
      jockeyForm: 10,
      horseForm: 20,
      classIndicator: 10,
      distanceSuit: 10,
      drawAdvantage: 5,
      fitness: 10,
      improving: 10,
    };

    let score = 0;

    // Jockey factors (35 points max)
    score += Math.min(jockeyStats.seasonWinRate * 100, weights.jockeyWinRate);
    if (jockeyStats.isElite) {
      score += weights.jockeyElite * (1 - (jockeyStats.eliteRank || 8) / 10);
    }
    score += jockeyStats.recentFormScore * weights.jockeyForm;

    // Horse form (20 points)
    score += horseStats.formScore * weights.horseForm;

    // Class indicator (10 points)
    const classBonus = Math.max(0, Math.min(1, (horseStats.classIndicator + 2) / 4));
    score += classBonus * weights.classIndicator;

    // Distance suitability (10 points)
    score += horseStats.distanceSuitability * weights.distanceSuit;

    // Draw advantage (5 points)
    score += (horseStats.drawAdvantage + 0.5) * weights.drawAdvantage;

    // Fitness (10 points) - sweet spot is 14-35 days
    let fitnessScore = 0;
    if (horseStats.daysSinceLastRun >= 14 && horseStats.daysSinceLastRun <= 35) {
      fitnessScore = 1;
    } else if (horseStats.daysSinceLastRun < 14) {
      fitnessScore = 0.7; // Slightly backed up
    } else if (horseStats.daysSinceLastRun <= 60) {
      fitnessScore = 0.5;
    } else {
      fitnessScore = 0.2; // Long layoff
    }
    score += fitnessScore * weights.fitness;

    // Improving (10 points)
    if (horseStats.isImproving) {
      score += weights.improving;
    }

    return Math.round(Math.min(100, score));
  }

  /**
   * Calculate value rating based on score vs odds
   */
  private calculateValueRating(score: number, odds?: number): number {
    if (!odds || odds <= 0) return 0;

    // Convert score to implied probability
    // Score of 70 = ~35% chance, 80 = ~45%, 90 = ~55%
    const impliedProb = Math.pow(score / 100, 1.5);
    
    // Market probability
    const marketProb = 1 / odds;
    
    // Value = our probability vs market probability
    const edge = (impliedProb - marketProb) / marketProb;
    
    return Math.round(edge * 100); // Return as percentage
  }

  /**
   * Enrich a full race
   */
  enrichRace(race: Race): EnrichedRace {
    const enrichedEntries = race.entries.map(entry => 
      this.enrichEntry(entry, race)
    );

    // Sort by combined score
    const sorted = [...enrichedEntries].sort((a, b) => b.combinedScore - a.combinedScore);
    
    // Predict favorite (highest score)
    const predictedFavorite = sorted[0]?.horseNumber || 1;
    
    // Key contenders (top 3-4 with score > 60)
    const keyContenders = sorted
      .filter(e => e.combinedScore >= 60)
      .slice(0, 4)
      .map(e => e.horseNumber);

    // Market confidence (how clear is the selection)
    const topScore = sorted[0]?.combinedScore || 0;
    const secondScore = sorted[1]?.combinedScore || 0;
    const marketConfidence = Math.min(1, (topScore - secondScore) / 20);

    return {
      ...race,
      entries: enrichedEntries,
      marketConfidence,
      predictedFavorite,
      keyContenders,
    };
  }

  /**
   * Find selections based on criteria
   */
  findSelections(
    race: EnrichedRace,
    criteria: SelectionCriteria = DEFAULT_SELECTION_CRITERIA
  ): EnrichedRaceEntry[] {
    return race.entries.filter(entry => {
      // Check jockey criteria
      if (criteria.requireEliteJockey && !entry.jockeyStats.isElite) {
        return false;
      }
      if (entry.jockeyStats.seasonWinRate < criteria.minJockeyWinRate) {
        return false;
      }

      // Check odds range
      const odds = entry.currentOdds;
      if (odds && (odds < criteria.oddsRange.min || odds > criteria.oddsRange.max)) {
        return false;
      }

      // Check form score
      if (entry.horseStats.formScore < criteria.minFormScore) {
        return false;
      }

      // Check class indicator
      if (entry.horseStats.classIndicator < criteria.minClassIndicator) {
        return false;
      }

      // Check distance suitability
      if (entry.horseStats.distanceSuitability < criteria.minDistanceSuitability) {
        return false;
      }

      // Check fitness
      if (entry.horseStats.daysSinceLastRun > criteria.maxDaysSinceRun) {
        return false;
      }

      return true;
    });
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  private normalizeJockeyName(name: string): string {
    return name.toLowerCase()
      .replace(/[^a-z]/g, "")
      .replace(/^[a-z]/, "") // Remove initial
      .trim();
  }

  private findJockeyProfile(jockey: Jockey): JockeyProfile | undefined {
    // Try by code first
    let profile = this.jockeyProfiles.get(jockey.code.toUpperCase());
    if (profile) return profile;

    // Try by normalized name
    const normalizedName = this.normalizeJockeyName(jockey.name);
    profile = this.jockeyProfiles.get(normalizedName);
    if (profile) return profile;

    // Try partial match
    for (const [key, p] of this.jockeyProfiles) {
      if (key.includes(normalizedName) || normalizedName.includes(key)) {
        return p;
      }
    }

    return undefined;
  }

  private findHorseProfile(horse: Horse): HorseProfile | undefined {
    // Try by code first
    let profile = this.horseProfiles.get(horse.code.toUpperCase());
    if (profile) return profile;

    // Try by normalized name
    const normalizedName = horse.name.toUpperCase().replace(/[^A-Z]/g, "");
    return this.horseProfiles.get(normalizedName);
  }

  private getEliteRank(jockeyName: string): number | null {
    const normalizedName = jockeyName.toLowerCase();
    
    for (let i = 0; i < ELITE_JOCKEYS.length; i++) {
      const elite = ELITE_JOCKEYS[i]!;
      if (normalizedName.includes(elite.name.toLowerCase().split(" ")[1]!)) {
        return i + 1;
      }
    }

    return null;
  }

  private calculateClassIndicator(profile: HorseProfile, race: Race): number {
    const classRank: Record<string, number> = {
      "Class 5": 5,
      "Class 4": 4,
      "Class 3": 3,
      "Class 2": 2,
      "Class 1": 1,
      "Group 3": 0,
      "Group 2": -1,
      "Group 1": -2,
    };

    const lastRace = profile.pastPerformances[0];
    if (!lastRace) return 0;

    const lastClass = classRank[lastRace.raceClass] ?? 4;
    const currentClass = classRank[race.class] ?? 4;

    return lastClass - currentClass; // Positive = dropping class
  }

  private getDrawAdvantage(venue: Venue, distance: number, draw: string | number): number {
    const key = `${venue}-${distance}`;
    const drawMap = this.drawBiasData.get(key);
    
    if (!drawMap) return 0;
    
    const drawNum = typeof draw === "string" ? parseInt(draw, 10) : draw;
    return drawMap.get(drawNum) || 0;
  }

  private checkImproving(profile: HorseProfile): boolean {
    const recent = profile.pastPerformances.slice(0, 3);
    if (recent.length < 3) return false;

    // Check if positions are improving
    let improving = 0;
    for (let i = 0; i < recent.length - 1; i++) {
      if (recent[i]!.finishPosition < recent[i + 1]!.finishPosition) {
        improving++;
      }
    }

    return improving >= 2;
  }
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Quick selection finder using only race results (for backtesting)
 */
export function findSelectionsFromResults(
  result: RaceResult,
  criteria: SelectionCriteria = ELITE_JOCKEY_CRITERIA
): { horseNumber: number; horseName: string; jockeyName: string; odds: number }[] {
  const selections: { horseNumber: number; horseName: string; jockeyName: string; odds: number }[] = [];

  for (const horse of result.finishOrder) {
    const odds = horse.winOdds || 0;
    const jockeyName = horse.jockeyName || "";

    // Check elite jockey
    if (criteria.requireEliteJockey && !isEliteJockey(jockeyName)) {
      continue;
    }

    // Check odds range
    if (odds < criteria.oddsRange.min || odds > criteria.oddsRange.max) {
      continue;
    }

    selections.push({
      horseNumber: horse.horseNumber,
      horseName: horse.horseName || `Horse #${horse.horseNumber}`,
      jockeyName,
      odds,
    });
  }

  return selections;
}

/**
 * Create a summary of enriched race for display
 */
export function summarizeEnrichedRace(race: EnrichedRace): string {
  const lines: string[] = [];
  
  lines.push(`Race ${race.raceNumber}: ${race.class} ${race.distance}m ${race.surface}`);
  lines.push(`Market Confidence: ${(race.marketConfidence * 100).toFixed(0)}%`);
  lines.push(`Predicted Favorite: #${race.predictedFavorite}`);
  lines.push(`Key Contenders: ${race.keyContenders.join(", ")}`);
  lines.push("");
  lines.push("Top 5 by Score:");
  
  const sorted = [...race.entries].sort((a, b) => b.combinedScore - a.combinedScore);
  for (const entry of sorted.slice(0, 5)) {
    const elite = entry.jockeyStats.isElite ? "⭐" : "";
    lines.push(
      `  #${entry.horseNumber} ${entry.horse.name.padEnd(18)} ` +
      `Score: ${entry.combinedScore} | Form: ${entry.horseStats.formFigures} | ` +
      `${entry.jockey.name} ${elite}`
    );
  }

  return lines.join("\n");
}
