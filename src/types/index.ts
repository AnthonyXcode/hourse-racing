/**
 * Core TypeScript interfaces for HK Horse Racing AI
 */

// ============================================================================
// VENUE & TRACK
// ============================================================================

export type Venue = "Sha Tin" | "Happy Valley";
export type TrackSurface = "Turf" | "AWT"; // All Weather Track
export type Going =
  | "Firm"
  | "Good to Firm"
  | "Good"
  | "Good to Yielding"
  | "Yielding"
  | "Soft"
  | "Heavy"
  | "Wet Fast"
  | "Wet Slow"; // AWT conditions

export type RaceClass =
  | "Class 1"
  | "Class 2"
  | "Class 3"
  | "Class 4"
  | "Class 5"
  | "Griffin"
  | "Group 1"
  | "Group 2"
  | "Group 3"
  | "Handicap";

// ============================================================================
// JOCKEY & TRAINER
// ============================================================================

export interface SeasonStats {
  readonly wins: number;
  readonly places: number; // 2nd + 3rd
  readonly rides: number;
  readonly winRate: number; // 0-1
  readonly placeRate: number; // 0-1
  readonly roi: number; // Return on investment (1.0 = break even)
}

export interface CourseStats extends SeasonStats {
  readonly venue: Venue;
  readonly surface?: TrackSurface;
  readonly distance?: number;
}

export interface Jockey {
  readonly code: string; // e.g., "ZPF" for Zac Purton
  readonly name: string;
  readonly nationality: string;
  readonly weightClaim: number; // Apprentice allowance (0 for senior jockeys)
  readonly seasonStats: SeasonStats;
  readonly courseStats: readonly CourseStats[];
}

export interface Trainer {
  readonly code: string; // e.g., "SJJ" for John Size
  readonly name: string;
  readonly seasonStats: SeasonStats;
  readonly courseStats: readonly CourseStats[];
  readonly specialties: readonly string[]; // e.g., ["sprinters", "first-time starters"]
}

// ============================================================================
// HORSE
// ============================================================================

export type Gear = "B" | "H" | "P" | "TT" | "V" | "XB" | "PC" | "SR" | "CP" | "E";
// B=Blinkers, H=Hood, P=Pacifiers, TT=Tongue Tie, V=Visor
// XB=Cross-over Noseband, PC=Cheek Pieces, SR=Shadow Roll, CP=Nose Band Cross, E=Ear Muffs

export interface PastPerformance {
  readonly date: Date;
  readonly venue: Venue;
  readonly raceNumber: number;
  readonly raceClass: RaceClass;
  readonly distance: number;
  readonly surface: TrackSurface;
  readonly going: Going;
  readonly draw: number;
  readonly weight: number;
  readonly jockeyCode: string;
  readonly finishPosition: number;
  readonly fieldSize: number;
  readonly winningMargin: number; // Lengths behind winner (0 if won)
  readonly finishTime: number; // Seconds
  readonly speedRating?: number;
  readonly odds: number;
  readonly comment?: string;
}

export interface Horse {
  readonly code: string; // e.g., "K422"
  readonly name: string;
  readonly nameChinese?: string;
  readonly age: number;
  readonly sex: "G" | "H" | "M" | "R"; // Gelding, Horse (stallion), Mare, Rig
  readonly color: string;
  readonly origin: string; // Country
  readonly sire: string;
  readonly dam: string;
  readonly damSire?: string;
  readonly currentRating: number; // HKJC handicap rating (e.g. 53)
  readonly ratingChange?: number; // Rtg.+/- from handicapper (e.g. +8 or -2)
  readonly seasonStarts: number;
  readonly seasonWins: number;
  readonly seasonPlaces: number;
  readonly careerStarts: number;
  readonly careerWins: number;
  readonly careerPlaces: number;
  readonly totalPrizeMoney: number;
  readonly gear: readonly Gear[];
  readonly pastPerformances: readonly PastPerformance[];
  readonly preferredDistance?: { min: number; max: number };
  readonly preferredGoing?: readonly Going[];
  readonly preferredSurface?: TrackSurface;
}

// ============================================================================
// RACE ENTRY & RACE
// ============================================================================

export interface RaceEntry {
  readonly horse: Horse;
  readonly jockey: Jockey;
  readonly trainer: Trainer;
  readonly horseNumber: number; // Saddle cloth number
  readonly draw: number; // Barrier position
  readonly weight: number; // Declared weight in pounds
  readonly gearChanges?: readonly Gear[]; // New gear for this race
  readonly priority?: number; // Ballot priority (if applicable)
  readonly currentOdds?: number; // Live odds
  readonly morningLineOdds?: number;
  readonly isScratched: boolean;
}

export interface Race {
  readonly id: string; // e.g., "2026-01-29-ST-5" (date-venue-raceNum)
  readonly date: Date;
  readonly venue: Venue;
  readonly raceNumber: number;
  readonly name?: string; // Race name if applicable
  readonly class: RaceClass;
  readonly distance: number; // Meters
  readonly surface: TrackSurface;
  readonly going: Going;
  readonly prizeMoney: number;
  readonly entries: readonly RaceEntry[];
  readonly postTime?: Date;
  readonly raceType?: string; // e.g., "Handicap", "Set Weights"
}

export interface RaceResult extends Race {
  readonly finishOrder: readonly {
    readonly horseNumber: number;
    readonly finishPosition: number;
    readonly finishTime?: number;
    readonly margin?: number; // Lengths behind previous horse
    readonly horseName?: string;
    readonly horseCode?: string;
    readonly jockeyName?: string;
    /** HKJC jockey profile id, e.g. from jockeyprofile?jockeyid=PZ */
    readonly jockeyId?: string;
    readonly trainerName?: string;
    /** HKJC trainer profile id, e.g. from trainerprofile?trainerid=SJJ */
    readonly trainerId?: string;
    /** Barrier / draw — HKJC "Dr." */
    readonly draw?: number;
    /** Weight carried (lb) from results — HKJC "Act. Wt." */
    readonly actualWeight?: number;
    /** Declared horse body weight on raceday — HKJC "Declar. Horse Wt." (club scale units) */
    readonly horseWeight?: number;
    readonly winOdds?: number;
  }[];
  readonly winDividend?: number;
  readonly placeDividends?: readonly number[];
  readonly quinellaDividend?: number;
  readonly quinellaPlaceDividends?: readonly number[];
  readonly tierceDividend?: number;
  readonly trioDividend?: number;
}

// ============================================================================
// ANALYSIS OUTPUTS
// ============================================================================

export interface SpeedFigure {
  readonly horseCode: string;
  readonly raceId: string;
  readonly rawTime: number;
  readonly adjustedTime: number;
  readonly speedRating: number; // 0-120 scale
  readonly classAdjustment: number;
  readonly goingAdjustment: number;
  readonly weightAdjustment: number;
}

export interface HorseAnalysis {
  readonly horseCode: string;
  readonly horseName: string;
  readonly averageSpeedRating: number;
  readonly bestSpeedRating: number;
  readonly lastSpeedRating: number;
  readonly formScore: number; // 0-1, weighted recent form
  readonly classIndicator: number; // Positive = dropping, negative = rising
  readonly daysSinceLastRace: number;
  readonly drawAdvantage: number; // Based on historical draw bias
  readonly jockeyEdge: number; // Jockey's course/distance stats vs field
  readonly trainerForm: number; // Trainer's recent strike rate
  readonly surfacePreference: number; // -1 to 1, how much horse likes this surface
  readonly goingPreference: number; // -1 to 1, how much horse likes this going
  readonly distancePreference: number; // -1 to 1, how suited to this distance
  readonly ratingMomentum: number; // -1 to 1, based on handicap Rtg.+/- and position within class
  readonly overallRating: number; // Composite score
}

// ============================================================================
// SIMULATION & BETTING
// ============================================================================

export interface SimulationResult {
  readonly horseNumber: number;
  readonly horseCode: string;
  readonly horseName: string;
  readonly winProbability: number;
  readonly placeProbability: number; // Top 3
  readonly expectedPosition: number;
  readonly positionStdDev: number;
  readonly simulationRuns: number;
  /** Number of past performances (form records) used for this horse's analysis */
  readonly formRecordCount: number;
}

export interface ExoticProbabilities {
  readonly quinella: Map<string, number>; // "1-3" -> probability
  readonly quinellaPlace: Map<string, number>;
  readonly tierce: Map<string, number>; // "1-3-5" -> probability
  readonly trio: Map<string, number>;
}

export type BetType =
  | "Win"
  | "Place"
  | "Quinella"
  | "Quinella Place"
  | "Forecast"
  | "Tierce"
  | "Trio"
  | "First 4"
  | "Quartet";

export interface BetRecommendation {
  readonly betType: BetType;
  readonly selection: string; // e.g., "3" for Win, "3-7" for Quinella
  readonly modelProbability: number;
  readonly marketProbability: number;
  readonly edge: number; // Percentage edge
  readonly expectedOdds: number;
  readonly currentOdds?: number;
  readonly recommendedStake: number; // Based on Kelly
  readonly maxStake: number; // Capped at bankroll %
  readonly expectedValue: number;
  readonly confidence: "Low" | "Medium" | "High";
  readonly reasoning: string;
}

export interface RaceRecommendation {
  readonly raceId: string;
  readonly race: Race;
  readonly analysis: readonly HorseAnalysis[];
  readonly simulations: readonly SimulationResult[];
  readonly exoticProbabilities: ExoticProbabilities;
  readonly recommendations: readonly BetRecommendation[];
  readonly totalRecommendedStake: number;
  readonly topPicks: readonly {
    readonly rank: number;
    readonly horseNumber: number;
    readonly horseName: string;
    readonly winProb: number;
    readonly value: number;
  }[];
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export interface BettingConfig {
  readonly bankroll: number;
  readonly maxBetPercent: number; // Max % of bankroll per bet
  readonly maxRacePercent: number; // Max % of bankroll per race
  readonly minEdgeThreshold: number; // Minimum edge % to recommend
  readonly kellyFraction: number; // Fraction of Kelly (0.25 - 0.5 recommended)
  readonly preferredBetTypes: readonly BetType[];
}

export interface ScraperConfig {
  readonly baseUrl: string;
  readonly rateLimit: number; // Requests per minute
  readonly timeout: number; // Request timeout in ms
  readonly retries: number;
  readonly headless: boolean;
}

export const DEFAULT_BETTING_CONFIG: BettingConfig = {
  bankroll: 10000,
  maxBetPercent: 5,
  maxRacePercent: 10,
  minEdgeThreshold: 5,
  kellyFraction: 0.25,
  preferredBetTypes: ["Place", "Quinella", "Quinella Place"],
};

export const DEFAULT_SCRAPER_CONFIG: ScraperConfig = {
  baseUrl: "https://racing.hkjc.com",
  rateLimit: 20,
  timeout: 30000,
  retries: 3,
  headless: true,
};
