/**
 * HKJC Horse Profile Scraper
 *
 * Scrapes horse profiles from racing.hkjc.com including:
 * - Basic info (age, color, origin, sire/dam)
 * - Current rating
 * - Career statistics
 * - Past performances
 * - Form figures
 */

import { chromium, type Browser, type Page } from "playwright";
import * as cheerio from "cheerio";
import type {
  Horse,
  PastPerformance,
  Venue,
  TrackSurface,
  Going,
  RaceClass,
  Gear,
  ScraperConfig,
} from "../types/index.js";
import { DEFAULT_SCRAPER_CONFIG } from "../types/index.js";
import { sleep } from "../utils/index.js";

// ============================================================================
// INTERFACES
// ============================================================================

export interface HorseProfile extends Horse {
  readonly formFigures: string; // e.g., "1-2-3-4-1" (last 5 runs)
  readonly classHistory: readonly ClassChange[];
  readonly bestRating: number;
  readonly distanceWins: Map<number, number>; // distance -> wins
  readonly goingRecord: readonly GoingRecord[];
}

export interface ClassChange {
  readonly date: Date;
  readonly fromClass: RaceClass;
  readonly toClass: RaceClass;
  readonly ratingBefore: number;
  readonly ratingAfter: number;
}

export interface GoingRecord {
  readonly going: Going;
  readonly starts: number;
  readonly wins: number;
  readonly places: number;
  readonly winRate: number;
}

// ============================================================================
// HORSE PROFILE SCRAPER CLASS
// ============================================================================

export class HorseProfileScraper {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private config: ScraperConfig;
  private lastRequestTime = 0;

  constructor(config: Partial<ScraperConfig> = {}) {
    this.config = { ...DEFAULT_SCRAPER_CONFIG, ...config };
  }

  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: this.config.headless,
    });
    this.page = await this.browser.newPage();
    await this.page.setViewportSize({ width: 1280, height: 800 });
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  private async navigateTo(url: string): Promise<void> {
    const minInterval = (60 / this.config.rateLimit) * 1000;
    const elapsed = Date.now() - this.lastRequestTime;

    if (elapsed < minInterval) {
      await sleep(minInterval - elapsed);
    }

    if (!this.page) throw new Error("Browser not initialized");

    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await sleep(2000);
    this.lastRequestTime = Date.now();
  }

  /**
   * Scrape full horse profile
   */
  async scrapeHorseProfile(horseCode: string): Promise<HorseProfile> {
    // HKJC URL format: /en-us/local/information/horse?HorseId={code}
    const url = `${this.config.baseUrl}/en-us/local/information/horse?HorseId=${horseCode}`;

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    const content = await this.page.content();
    const $ = cheerio.load(content);

    // Parse basic info
    const basicInfo = this.parseBasicInfo($, horseCode);

    // Parse past performances
    const pastPerformances = this.parsePastPerformances($);

    // Calculate derived stats
    const formFigures = this.calculateFormFigures(pastPerformances);
    const classHistory = this.parseClassHistory(pastPerformances);
    const bestRating = this.calculateBestRating($, pastPerformances);
    const distanceWins = this.calculateDistanceWins(pastPerformances);
    const goingRecord = this.calculateGoingRecord(pastPerformances);

    return {
      ...basicInfo,
      pastPerformances,
      formFigures,
      classHistory,
      bestRating,
      distanceWins,
      goingRecord,
    };
  }

  /**
   * Parse basic horse information
   */
  private parseBasicInfo($: cheerio.CheerioAPI, horseCode: string): Omit<Horse, "pastPerformances"> {
    const pageText = $("body").text();
    const allText = $("table").text() + " " + pageText;

    // Parse name
    let name = "Unknown";
    const nameSelectors = [".horse-name", ".profile-name", "h1", ".title"];
    for (const selector of nameSelectors) {
      const text = $(selector).first().text().trim();
      if (text.length > 2 && text.length < 50 && /^[A-Z]/.test(text)) {
        name = text;
        break;
      }
    }

    // Parse Chinese name
    let nameChinese: string | undefined;
    const chineseMatch = allText.match(/[\u4e00-\u9fa5]{2,}/);
    if (chineseMatch) {
      nameChinese = chineseMatch[0];
    }

    // Parse age
    let age = 4;
    const ageMatch = allText.match(/Age[:\s]+(\d+)/i) ||
                     allText.match(/(\d+)\s*(?:yo|y\.o\.|year)/i);
    if (ageMatch) {
      age = parseInt(ageMatch[1]!, 10);
    }

    // Parse sex
    let sex: "G" | "H" | "M" | "R" = "G";
    if (/\bGelding\b/i.test(allText)) sex = "G";
    else if (/\bHorse\b|\bStallion\b|\bColt\b/i.test(allText)) sex = "H";
    else if (/\bMare\b|\bFilly\b/i.test(allText)) sex = "M";
    else if (/\bRig\b/i.test(allText)) sex = "R";

    // Parse color
    let color = "Bay";
    const colors = ["Bay", "Brown", "Chestnut", "Grey", "Black"];
    for (const c of colors) {
      if (allText.toLowerCase().includes(c.toLowerCase())) {
        color = c;
        break;
      }
    }

    // Parse origin
    let origin = "AUS";
    const origins: Record<string, string> = {
      "Australia": "AUS", "New Zealand": "NZ", "Ireland": "IRE",
      "Great Britain": "GB", "USA": "USA", "Japan": "JPN",
      "France": "FR", "Germany": "GER", "Argentina": "ARG",
    };
    for (const [country, code] of Object.entries(origins)) {
      if (allText.includes(country)) {
        origin = code;
        break;
      }
    }

    // Parse sire and dam
    let sire = "";
    let dam = "";
    let damSire: string | undefined;

    const sireMatch = allText.match(/Sire[:\s]+([A-Z][A-Za-z\s']+)/i);
    if (sireMatch) sire = sireMatch[1]!.trim();

    const damMatch = allText.match(/Dam[:\s]+([A-Z][A-Za-z\s']+)/i);
    if (damMatch) dam = damMatch[1]!.trim();

    const damSireMatch = allText.match(/Dam(?:'s)?\s*Sire[:\s]+([A-Z][A-Za-z\s']+)/i);
    if (damSireMatch) damSire = damSireMatch[1]!.trim();

    // Parse current rating
    let currentRating = 52;
    const ratingMatch = allText.match(/Rating[:\s]+(\d+)/i) ||
                        allText.match(/(\d+)\s*(?:pts|points)/i);
    if (ratingMatch) {
      const r = parseInt(ratingMatch[1]!, 10);
      if (r >= 20 && r <= 140) {
        currentRating = r;
      }
    }

    // Parse career stats
    let seasonStarts = 0, seasonWins = 0, seasonPlaces = 0;
    let careerStarts = 0, careerWins = 0, careerPlaces = 0;
    let totalPrizeMoney = 0;

    // Season: "Season 2025/26: 5-1-1"
    const seasonMatch = allText.match(/Season[^:]*:\s*(\d+)-(\d+)-(\d+)/i);
    if (seasonMatch) {
      seasonStarts = parseInt(seasonMatch[1]!, 10);
      seasonWins = parseInt(seasonMatch[2]!, 10);
      seasonPlaces = parseInt(seasonMatch[3]!, 10);
    }

    // Career: "Career: 20-5-3"
    const careerMatch = allText.match(/Career[^:]*:\s*(\d+)-(\d+)-(\d+)/i);
    if (careerMatch) {
      careerStarts = parseInt(careerMatch[1]!, 10);
      careerWins = parseInt(careerMatch[2]!, 10);
      careerPlaces = parseInt(careerMatch[3]!, 10);
    }

    // Prize money
    const prizeMatch = allText.match(/(?:Prize|Earnings)[^$]*\$\s*([\d,]+)/i);
    if (prizeMatch) {
      totalPrizeMoney = parseInt(prizeMatch[1]!.replace(/,/g, ""), 10);
    }

    // Parse gear
    const gear = this.parseGear(allText);

    return {
      code: horseCode,
      name,
      nameChinese,
      age,
      sex,
      color,
      origin,
      sire,
      dam,
      damSire,
      currentRating,
      seasonStarts,
      seasonWins,
      seasonPlaces,
      careerStarts,
      careerWins,
      careerPlaces,
      totalPrizeMoney,
      gear,
    };
  }

  /**
   * Parse gear from text
   */
  private parseGear(text: string): Gear[] {
    const gear: Gear[] = [];
    const gearPatterns: [RegExp, Gear][] = [
      [/\bBlinkers?\b/i, "B"],
      [/\bHood\b/i, "H"],
      [/\bPacifiers?\b/i, "P"],
      [/\bTongue.?Tie\b/i, "TT"],
      [/\bVisor\b/i, "V"],
      [/\bCross.?over.?Noseband\b|XB\b/i, "XB"],
      [/\bCheek.?Pieces?\b|PC\b/i, "PC"],
      [/\bShadow.?Roll\b|SR\b/i, "SR"],
      [/\bEar.?Muffs?\b/i, "E"],
    ];

    for (const [pattern, g] of gearPatterns) {
      if (pattern.test(text)) {
        gear.push(g);
      }
    }

    return gear;
  }

  /**
   * Parse past performances from performance table
   */
  private parsePastPerformances($: cheerio.CheerioAPI): PastPerformance[] {
    const performances: PastPerformance[] = [];

    $("table tr").each((_, row) => {
      const $row = $(row);
      if ($row.find("th").length > 0) return;

      const cells = $row.find("td");
      if (cells.length < 8) return;

      const cellTexts = cells.map((_, cell) => $(cell).text().trim()).get();
      const rowText = cellTexts.join(" ");

      // Parse date
      const dateText = cellTexts[0] || "";
      const dateMatch = dateText.match(/(\d{2})\/(\d{2})\/(\d{2,4})/);
      if (!dateMatch) return;

      const day = parseInt(dateMatch[1]!, 10);
      const month = parseInt(dateMatch[2]!, 10);
      let year = parseInt(dateMatch[3]!, 10);
      if (year < 100) year += 2000;
      const date = new Date(year, month - 1, day);

      // Parse venue
      const venueText = cellTexts[1] || rowText;
      const venue: Venue = venueText.includes("HV") ? "Happy Valley" : "Sha Tin";

      // Parse race number
      let raceNumber = 1;
      for (const text of cellTexts) {
        const raceMatch = text.match(/^R?(\d{1,2})$/i);
        if (raceMatch) {
          const rn = parseInt(raceMatch[1]!, 10);
          if (rn >= 1 && rn <= 11) {
            raceNumber = rn;
            break;
          }
        }
      }

      // Parse class
      let raceClass: RaceClass = "Class 4";
      for (const text of cellTexts) {
        const classMatch = text.match(/C(?:lass)?(\d)/i);
        if (classMatch) {
          raceClass = `Class ${classMatch[1]}` as RaceClass;
          break;
        }
      }

      // Parse distance
      let distance = 1200;
      for (const text of cellTexts) {
        const distMatch = text.match(/(\d{4})\s*M?/i);
        if (distMatch) {
          const d = parseInt(distMatch[1]!, 10);
          if (d >= 1000 && d <= 2400) {
            distance = d;
            break;
          }
        }
      }

      // Parse surface
      const surface: TrackSurface = /AWT/i.test(rowText) ? "AWT" : "Turf";

      // Parse going
      let going: Going = "Good";
      const goingPatterns: [RegExp, Going][] = [
        [/Good to Firm/i, "Good to Firm"],
        [/Good to Yielding/i, "Good to Yielding"],
        [/Yielding/i, "Yielding"],
        [/Heavy/i, "Heavy"],
        [/Soft/i, "Soft"],
        [/Firm/i, "Firm"],
        [/Wet Fast/i, "Wet Fast"],
        [/Wet Slow/i, "Wet Slow"],
      ];
      for (const [pattern, g] of goingPatterns) {
        if (pattern.test(rowText)) {
          going = g;
          break;
        }
      }

      // Parse draw
      let draw = 1;
      for (let i = 0; i < cellTexts.length; i++) {
        const text = cellTexts[i]!;
        // Look for draw column (usually single digit 1-14)
        if (/^(\d{1,2})$/.test(text)) {
          const d = parseInt(text, 10);
          if (d >= 1 && d <= 14) {
            draw = d;
            break;
          }
        }
      }

      // Parse weight
      let weight = 126;
      for (const text of cellTexts) {
        const weightMatch = text.match(/^(\d{3})$/);
        if (weightMatch) {
          const w = parseInt(weightMatch[1]!, 10);
          if (w >= 100 && w <= 140) {
            weight = w;
            break;
          }
        }
      }

      // Parse jockey code
      let jockeyCode = "";
      $row.find("a").each((_, link) => {
        const href = $(link).attr("href") || "";
        if (href.includes("jockey") || href.includes("Jockey")) {
          const codeMatch = href.match(/jockey\/([A-Z]+)/i);
          if (codeMatch) jockeyCode = codeMatch[1]!.toUpperCase();
        }
      });

      // Parse finish position
      let finishPosition = 99;
      for (const text of cellTexts) {
        const posMatch = text.match(/^(\d{1,2})(?:st|nd|rd|th)?$/i);
        if (posMatch) {
          const p = parseInt(posMatch[1]!, 10);
          if (p >= 1 && p <= 14) {
            finishPosition = p;
            break;
          }
        }
      }

      // Parse field size
      let fieldSize = 14;
      for (const text of cellTexts) {
        const fieldMatch = text.match(/\/(\d+)/);
        if (fieldMatch) {
          fieldSize = parseInt(fieldMatch[1]!, 10);
          break;
        }
      }

      // Parse margin
      let winningMargin = 0;
      for (const text of cellTexts) {
        if (text === "-" || text === "WON") {
          winningMargin = 0;
          break;
        }
        const marginMatch = text.match(/^(\d+\.?\d*)$/);
        if (marginMatch) {
          const m = parseFloat(marginMatch[1]!);
          if (m > 0 && m < 50) {
            winningMargin = m;
          }
        }
      }

      // Parse finish time
      let finishTime = 0;
      for (const text of cellTexts) {
        const timeMatch = text.match(/(\d+):(\d+\.?\d*)/);
        if (timeMatch) {
          finishTime = parseInt(timeMatch[1]!, 10) * 60 + parseFloat(timeMatch[2]!);
          break;
        }
      }

      // Parse odds
      let odds = 10;
      for (let i = cellTexts.length - 1; i >= 0; i--) {
        const oddsMatch = cellTexts[i]?.match(/^(\d+\.?\d*)$/);
        if (oddsMatch) {
          const o = parseFloat(oddsMatch[1]!);
          if (o >= 1 && o <= 999) {
            odds = o;
            break;
          }
        }
      }

      performances.push({
        date,
        venue,
        raceNumber,
        raceClass,
        distance,
        surface,
        going,
        draw,
        weight,
        jockeyCode,
        finishPosition,
        fieldSize,
        winningMargin,
        finishTime,
        odds,
      });
    });

    // Sort by date descending (most recent first)
    return performances.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * Calculate form figures (last 5 runs)
   */
  private calculateFormFigures(performances: readonly PastPerformance[]): string {
    const last5 = performances.slice(0, 5);
    if (last5.length === 0) return "-";

    return last5.map(p => {
      if (p.finishPosition === 1) return "1";
      if (p.finishPosition === 2) return "2";
      if (p.finishPosition === 3) return "3";
      if (p.finishPosition <= 6) return p.finishPosition.toString();
      return "0"; // Out of first 6
    }).join("-");
  }

  /**
   * Parse class changes from performance history
   */
  private parseClassHistory(performances: readonly PastPerformance[]): ClassChange[] {
    const changes: ClassChange[] = [];
    
    for (let i = 0; i < performances.length - 1; i++) {
      const current = performances[i]!;
      const previous = performances[i + 1]!;

      if (current.raceClass !== previous.raceClass) {
        changes.push({
          date: current.date,
          fromClass: previous.raceClass,
          toClass: current.raceClass,
          ratingBefore: 0, // Would need additional data
          ratingAfter: 0,
        });
      }
    }

    return changes;
  }

  /**
   * Calculate best rating from performances
   */
  private calculateBestRating(
    $: cheerio.CheerioAPI,
    performances: readonly PastPerformance[]
  ): number {
    const pageText = $("body").text();
    
    // Try to find best rating in page
    const bestMatch = pageText.match(/Best\s*Rating[:\s]+(\d+)/i) ||
                      pageText.match(/Peak[:\s]+(\d+)/i);
    if (bestMatch) {
      return parseInt(bestMatch[1]!, 10);
    }

    // Estimate from class and finishes
    let bestEstimate = 52;
    for (const p of performances) {
      const classBase: Record<RaceClass, number> = {
        "Class 1": 100,
        "Class 2": 85,
        "Class 3": 70,
        "Class 4": 55,
        "Class 5": 40,
        "Griffin": 52,
        "Group 1": 120,
        "Group 2": 110,
        "Group 3": 100,
        "Handicap": 60,
      };

      const base = classBase[p.raceClass] || 52;
      // Boost for winning
      const bonus = p.finishPosition === 1 ? 5 : 0;
      bestEstimate = Math.max(bestEstimate, base + bonus);
    }

    return bestEstimate;
  }

  /**
   * Calculate wins by distance
   */
  private calculateDistanceWins(performances: readonly PastPerformance[]): Map<number, number> {
    const wins = new Map<number, number>();

    for (const p of performances) {
      if (p.finishPosition === 1) {
        const current = wins.get(p.distance) || 0;
        wins.set(p.distance, current + 1);
      }
    }

    return wins;
  }

  /**
   * Calculate record by going
   */
  private calculateGoingRecord(performances: readonly PastPerformance[]): GoingRecord[] {
    const records = new Map<Going, { starts: number; wins: number; places: number }>();

    for (const p of performances) {
      const current = records.get(p.going) || { starts: 0, wins: 0, places: 0 };
      current.starts++;
      if (p.finishPosition === 1) current.wins++;
      if (p.finishPosition <= 3) current.places++;
      records.set(p.going, current);
    }

    return Array.from(records.entries()).map(([going, stats]) => ({
      going,
      starts: stats.starts,
      wins: stats.wins,
      places: stats.places,
      winRate: stats.starts > 0 ? stats.wins / stats.starts : 0,
    }));
  }

  /**
   * Scrape multiple horse profiles
   */
  async scrapeMultipleHorses(horseCodes: string[]): Promise<HorseProfile[]> {
    const profiles: HorseProfile[] = [];

    for (const code of horseCodes) {
      try {
        console.log(`Scraping horse ${code}...`);
        const profile = await this.scrapeHorseProfile(code);
        profiles.push(profile);
      } catch (error) {
        console.warn(`Failed to scrape ${code}: ${error}`);
      }
    }

    return profiles;
  }

  /**
   * Save horse profiles to JSON file
   */
  async saveProfiles(profiles: HorseProfile[], filename: string): Promise<void> {
    const fs = await import("fs/promises");
    const path = await import("path");

    const dataDir = path.join(process.cwd(), "data", "horses");
    await fs.mkdir(dataDir, { recursive: true });

    // Convert Map to object for JSON serialization
    const serializable = profiles.map(p => ({
      ...p,
      distanceWins: Object.fromEntries(p.distanceWins),
    }));

    const filepath = path.join(dataDir, filename);
    await fs.writeFile(filepath, JSON.stringify(serializable, null, 2));
    console.log(`Saved ${profiles.length} horse profiles to ${filepath}`);
  }

  /**
   * Load horse profiles from JSON file
   */
  async loadProfiles(filename: string): Promise<HorseProfile[]> {
    const fs = await import("fs/promises");
    const path = await import("path");

    const filepath = path.join(process.cwd(), "data", "horses", filename);
    const data = await fs.readFile(filepath, "utf-8");
    const parsed = JSON.parse(data) as (Omit<HorseProfile, "distanceWins"> & { distanceWins: Record<string, number> })[];
    
    // Convert object back to Map
    return parsed.map(p => ({
      ...p,
      distanceWins: new Map(Object.entries(p.distanceWins).map(([k, v]) => [parseInt(k, 10), v])),
    }));
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate form score (0-1) based on recent performances
 */
export function calculateFormScore(performances: readonly PastPerformance[]): number {
  if (performances.length === 0) return 0.5;

  const weights = [0.35, 0.25, 0.20, 0.12, 0.08]; // More weight to recent runs
  let totalScore = 0;
  let totalWeight = 0;

  for (let i = 0; i < Math.min(5, performances.length); i++) {
    const p = performances[i]!;
    const weight = weights[i]!;
    
    // Score based on finish position relative to field
    const positionScore = 1 - (p.finishPosition - 1) / (p.fieldSize - 1);
    
    totalScore += positionScore * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? totalScore / totalWeight : 0.5;
}

/**
 * Check if horse is improving based on class changes
 */
export function isHorseImproving(profile: HorseProfile): boolean {
  if (profile.classHistory.length === 0) return false;

  const classRank: Record<RaceClass, number> = {
    "Class 5": 5,
    "Class 4": 4,
    "Class 3": 3,
    "Class 2": 2,
    "Class 1": 1,
    "Group 3": 0,
    "Group 2": -1,
    "Group 1": -2,
    "Griffin": 6,
    "Handicap": 4,
  };

  const recentChanges = profile.classHistory.slice(0, 3);
  let improvementCount = 0;

  for (const change of recentChanges) {
    const fromRank = classRank[change.fromClass] ?? 4;
    const toRank = classRank[change.toClass] ?? 4;
    if (toRank < fromRank) improvementCount++;
  }

  return improvementCount >= 2;
}

/**
 * Calculate distance suitability (0-1)
 */
export function calculateDistanceSuitability(
  profile: HorseProfile,
  targetDistance: number
): number {
  const { pastPerformances, distanceWins } = profile;
  
  // Check for wins at this distance
  const winsAtDistance = distanceWins.get(targetDistance) || 0;
  if (winsAtDistance >= 2) return 1.0;
  if (winsAtDistance === 1) return 0.85;

  // Check performances at similar distances (±200m)
  let goodRuns = 0;
  let totalRuns = 0;

  for (const p of pastPerformances) {
    if (Math.abs(p.distance - targetDistance) <= 200) {
      totalRuns++;
      if (p.finishPosition <= 3) goodRuns++;
    }
  }

  if (totalRuns === 0) return 0.5; // Unknown
  return 0.3 + (goodRuns / totalRuns) * 0.6;
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

async function main() {
  const scraper = new HorseProfileScraper({ headless: true });

  try {
    console.log("Initializing horse profile scraper...");
    await scraper.init();

    // Example: Scrape some sample horses
    // In practice, you would get these codes from race cards
    const sampleCodes = ["J157", "J481", "H197"]; // From the race data

    console.log("\nScraping horse profiles...");
    const profiles = await scraper.scrapeMultipleHorses(sampleCodes);

    for (const profile of profiles) {
      console.log(`\n${profile.name} (${profile.code})`);
      console.log(`  Rating: ${profile.currentRating}`);
      console.log(`  Form: ${profile.formFigures}`);
      console.log(`  Career: ${profile.careerStarts}-${profile.careerWins}-${profile.careerPlaces}`);
      console.log(`  Performances: ${profile.pastPerformances.length}`);
    }

    // Save profiles
    if (profiles.length > 0) {
      await scraper.saveProfiles(profiles, "sample_horses.json");
    }

  } catch (error) {
    console.error("Scraping failed:", error);
  } finally {
    await scraper.close();
  }
}

// Run if called directly
if (process.argv[1]?.includes("horseProfile")) {
  main();
}
