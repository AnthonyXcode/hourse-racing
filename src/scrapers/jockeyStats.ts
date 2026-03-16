/**
 * HKJC Jockey Statistics Scraper
 *
 * Scrapes jockey statistics from racing.hkjc.com including:
 * - Season statistics (wins, rides, strike rate)
 * - Course/distance statistics
 * - Recent form
 * - Trainer combinations
 */

import { chromium, type Browser, type Page } from "playwright";
import * as cheerio from "cheerio";
import type {
  Jockey,
  SeasonStats,
  CourseStats,
  Venue,
  ScraperConfig,
} from "../types/index.js";
import { DEFAULT_SCRAPER_CONFIG } from "../types/index.js";
import { sleep } from "../utils/index.js";

// ============================================================================
// INTERFACES
// ============================================================================

export interface JockeyProfile extends Jockey {
  readonly recentForm: readonly JockeyRideResult[];
  readonly trainerCombinations: readonly TrainerCombo[];
  readonly distanceStats: readonly DistanceStat[];
}

export interface JockeyRideResult {
  readonly date: Date;
  readonly venue: Venue;
  readonly raceNumber: number;
  readonly horseName: string;
  readonly finishPosition: number;
  readonly fieldSize: number;
  readonly odds: number;
}

export interface TrainerCombo {
  readonly trainerName: string;
  readonly trainerCode: string;
  readonly rides: number;
  readonly wins: number;
  readonly winRate: number;
}

export interface DistanceStat {
  readonly distanceRange: string; // e.g., "1000-1200M"
  readonly rides: number;
  readonly wins: number;
  readonly places: number;
  readonly winRate: number;
  readonly placeRate: number;
}

// ============================================================================
// JOCKEY STATS SCRAPER CLASS
// ============================================================================

export class JockeyStatsScraper {
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
   * Get list of all active jockeys from HKJC jockey ranking page.
   * URL: https://racing.hkjc.com/en-us/local/info/jockey-ranking?season=Current&view=Numbers&racecourse=ALL
   */
  async getActiveJockeys(): Promise<{ code: string; name: string }[]> {
    const url = `${this.config.baseUrl}/en-us/local/info/jockey-ranking?season=Current&view=Numbers&racecourse=ALL`;

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    const content = await this.page.content();
    const $ = cheerio.load(content);

    const jockeys: { code: string; name: string }[] = [];

    // Find jockey links (ranking page may use JockeyId=, jockeyid=, or jockey/ in href)
    $("a").each((_, el) => {
      const href = $(el).attr("href") || "";
      const text = $(el).text().trim();

      if (
        href.includes("jockey/") ||
        href.includes("JockeyId=") ||
        href.includes("jockeyid=") ||
        href.includes("jockeywinstat")
      ) {
        const codeMatch =
          href.match(/jockey\/([A-Za-z0-9]+)/i) ||
          href.match(/[Jj]ockey[Ii]d=([A-Za-z0-9]+)/i) ||
          href.match(/jockeywinstat\?[^&]*[Jj]ockey[Ii]d=([A-Za-z0-9]+)/i);
        if (codeMatch && text.length > 1 && text.length < 50) {
          jockeys.push({
            code: codeMatch[1]!.toUpperCase(),
            name: text,
          });
        }
      }
    });

    // Remove duplicates by code
    const unique = Array.from(
      new Map(jockeys.map((j) => [j.code, j])).values()
    );

    return unique;
  }

  /**
   * Scrape full jockey profile with statistics
   */
  async scrapeJockeyProfile(jockeyCode: string): Promise<JockeyProfile> {
    // HKJC URL format: /en-us/local/information/jockeywinstat?JockeyId={code}
    const url = `${this.config.baseUrl}/en-us/local/information/jockeywinstat?JockeyId=${jockeyCode}`;

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    const content = await this.page.content();
    const $ = cheerio.load(content);

    // Parse basic info
    const name = this.parseJockeyName($);
    const nationality = this.parseNationality($);
    const weightClaim = this.parseWeightClaim($);

    // Parse season stats
    const seasonStats = this.parseSeasonStats($);

    // Parse course stats
    const courseStats = this.parseCourseStats($);

    // Parse recent form
    const recentForm = this.parseRecentForm($);

    // Parse trainer combinations
    const trainerCombinations = this.parseTrainerCombinations($);

    // Parse distance stats
    const distanceStats = this.parseDistanceStats($);

    return {
      code: jockeyCode,
      name,
      nationality,
      weightClaim,
      seasonStats,
      courseStats,
      recentForm,
      trainerCombinations,
      distanceStats,
    };
  }

  /**
   * Parse jockey name from page
   */
  private parseJockeyName($: cheerio.CheerioAPI): string {
    // Try multiple selectors
    const nameSelectors = [
      ".jockey-name",
      ".profile-name",
      "h1",
      ".title",
    ];

    for (const selector of nameSelectors) {
      const text = $(selector).first().text().trim();
      if (text.length > 2 && text.length < 50) {
        return text;
      }
    }

    // Fallback: find name in page text
    const pageText = $("body").text();
    const nameMatch = pageText.match(/(?:Jockey|Name):\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/);
    if (nameMatch) {
      return nameMatch[1]!;
    }

    return "Unknown";
  }

  /**
   * Parse nationality
   */
  private parseNationality($: cheerio.CheerioAPI): string {
    const pageText = $("body").text();
    
    // Common nationalities in HKJC
    const nationalities = [
      "Australian", "British", "French", "Italian", "Japanese",
      "South African", "Irish", "Brazilian", "Hong Kong", "Chinese",
    ];

    for (const nat of nationalities) {
      if (pageText.includes(nat)) {
        return nat;
      }
    }

    return "";
  }

  /**
   * Parse weight claim (apprentice allowance)
   */
  private parseWeightClaim($: cheerio.CheerioAPI): number {
    const pageText = $("body").text();
    
    // Apprentice claims: 10lb, 7lb, 5lb, 3lb
    const claimMatch = pageText.match(/(?:Claim|Allowance):\s*(\d+)\s*(?:lb|lbs)/i);
    if (claimMatch) {
      return parseInt(claimMatch[1]!, 10);
    }

    return 0; // Senior jockey
  }

  /**
   * Parse season statistics
   */
  private parseSeasonStats($: cheerio.CheerioAPI): SeasonStats {
    const pageText = $("body").text();
    const allText = $("table").text() + " " + pageText;

    let wins = 0;
    let places = 0;
    let rides = 0;

    // Try to find season statistics table or text
    // Pattern: "Wins: 50" or "50 wins"
    const winsMatch = allText.match(/(?:Wins?|1st)[:\s]+(\d+)/i) ||
                      allText.match(/(\d+)\s+wins?/i);
    if (winsMatch) {
      wins = parseInt(winsMatch[1]!, 10);
    }

    // Pattern: "2nds: 40" or "Places: 80"
    const secondsMatch = allText.match(/(?:2nds?|Seconds?)[:\s]+(\d+)/i);
    const thirdsMatch = allText.match(/(?:3rds?|Thirds?)[:\s]+(\d+)/i);
    
    if (secondsMatch) {
      places += parseInt(secondsMatch[1]!, 10);
    }
    if (thirdsMatch) {
      places += parseInt(thirdsMatch[1]!, 10);
    }

    // Pattern: "Rides: 200" or "Starters: 200"
    const ridesMatch = allText.match(/(?:Rides?|Starters?|Mounts?)[:\s]+(\d+)/i);
    if (ridesMatch) {
      rides = parseInt(ridesMatch[1]!, 10);
    }

    // Calculate rates
    const winRate = rides > 0 ? wins / rides : 0;
    const placeRate = rides > 0 ? (wins + places) / rides : 0;

    // Try to parse ROI if available
    let roi = 1.0;
    const roiMatch = allText.match(/ROI[:\s]+([+-]?\d+\.?\d*)%?/i);
    if (roiMatch) {
      roi = 1 + parseFloat(roiMatch[1]!) / 100;
    }

    return {
      wins,
      places,
      rides,
      winRate,
      placeRate,
      roi,
    };
  }

  /**
   * Parse course-specific stats
   */
  private parseCourseStats($: cheerio.CheerioAPI): CourseStats[] {
    const stats: CourseStats[] = [];
    const pageText = $("body").text();

    // Try to find venue-specific stats
    const venues: Venue[] = ["Sha Tin", "Happy Valley"];

    for (const venue of venues) {
      const venueCode = venue === "Sha Tin" ? "ST" : "HV";
      
      // Look for venue section
      const venueRegex = new RegExp(
        `${venue}|${venueCode}[^\\d]*(\\d+)[^\\d]*(\\d+)[^\\d]*(\\d+)`,
        "i"
      );
      const match = pageText.match(venueRegex);

      if (match) {
        const wins = parseInt(match[1] || "0", 10);
        const places = parseInt(match[2] || "0", 10);
        const rides = parseInt(match[3] || "0", 10);

        if (rides > 0) {
          stats.push({
            venue,
            wins,
            places,
            rides,
            winRate: wins / rides,
            placeRate: (wins + places) / rides,
            roi: 1.0,
          });
        }
      }
    }

    return stats;
  }

  /**
   * Parse recent ride results
   */
  private parseRecentForm($: cheerio.CheerioAPI): JockeyRideResult[] {
    const results: JockeyRideResult[] = [];

    // Find performance table
    $("table tr").each((_, row) => {
      const $row = $(row);
      if ($row.find("th").length > 0) return;

      const cells = $row.find("td");
      if (cells.length < 5) return;

      const cellTexts = cells.map((_, cell) => $(cell).text().trim()).get();

      // Try to parse date
      const dateText = cellTexts[0] || "";
      const dateMatch = dateText.match(/(\d{2})\/(\d{2})\/(\d{2,4})/);
      if (!dateMatch) return;

      const day = parseInt(dateMatch[1]!, 10);
      const month = parseInt(dateMatch[2]!, 10);
      let year = parseInt(dateMatch[3]!, 10);
      if (year < 100) year += 2000;

      const date = new Date(year, month - 1, day);

      // Parse venue
      const venueText = cellTexts[1] || "";
      const venue: Venue = venueText.includes("HV") ? "Happy Valley" : "Sha Tin";

      // Parse race number
      const raceNum = parseInt(cellTexts[2] || "0", 10);
      if (raceNum < 1) return;

      // Find horse name (usually in a link)
      let horseName = "";
      $row.find("a").each((_, link) => {
        const href = $(link).attr("href") || "";
        if (href.includes("horse") || href.includes("Horse")) {
          horseName = $(link).text().trim();
        }
      });
      if (!horseName) {
        // Try cell text
        horseName = cellTexts[3] || "Unknown";
      }

      // Parse finish position
      let finishPosition = 99;
      for (const text of cellTexts) {
        const posMatch = text.match(/^(\d{1,2})(?:st|nd|rd|th)?$/i);
        if (posMatch) {
          finishPosition = parseInt(posMatch[1]!, 10);
          break;
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

      // Parse odds
      let odds = 10;
      for (let i = cellTexts.length - 1; i >= 0; i--) {
        const oddsMatch = cellTexts[i]?.match(/^(\d+\.?\d*)$/);
        if (oddsMatch) {
          const parsed = parseFloat(oddsMatch[1]!);
          if (parsed >= 1 && parsed <= 999) {
            odds = parsed;
            break;
          }
        }
      }

      results.push({
        date,
        venue,
        raceNumber: raceNum,
        horseName,
        finishPosition,
        fieldSize,
        odds,
      });
    });

    return results.slice(0, 20); // Keep last 20 rides
  }

  /**
   * Parse trainer combination stats
   */
  private parseTrainerCombinations($: cheerio.CheerioAPI): TrainerCombo[] {
    const combos: TrainerCombo[] = [];

    // Look for trainer combination table
    $("table").each((_, table) => {
      const $table = $(table);
      const tableText = $table.text().toLowerCase();

      // Check if this is trainer combination table
      if (!tableText.includes("trainer") || !tableText.includes("win")) return;

      $table.find("tr").each((_, row) => {
        const $row = $(row);
        if ($row.find("th").length > 0) return;

        const cells = $row.find("td");
        if (cells.length < 3) return;

        // Find trainer link
        let trainerName = "";
        let trainerCode = "";
        $row.find("a").each((_, link) => {
          const href = $(link).attr("href") || "";
          if (href.includes("trainer") || href.includes("Trainer")) {
            trainerName = $(link).text().trim();
            const codeMatch = href.match(/trainer\/([A-Z]+)/i) ||
                              href.match(/TrainerId=([A-Z]+)/i);
            if (codeMatch) trainerCode = codeMatch[1]!.toUpperCase();
          }
        });

        if (!trainerName) return;

        // Parse numbers
        const cellTexts = cells.map((_, cell) => $(cell).text().trim()).get();
        let rides = 0;
        let wins = 0;

        for (const text of cellTexts) {
          const numMatch = text.match(/^(\d+)$/);
          if (numMatch) {
            const num = parseInt(numMatch[1]!, 10);
            if (rides === 0 && num > 0 && num < 1000) {
              rides = num;
            } else if (wins === 0 && num >= 0) {
              wins = num;
            }
          }
        }

        if (rides > 0) {
          combos.push({
            trainerName,
            trainerCode,
            rides,
            wins,
            winRate: wins / rides,
          });
        }
      });
    });

    return combos.sort((a, b) => b.wins - a.wins).slice(0, 10);
  }

  /**
   * Parse distance statistics
   */
  private parseDistanceStats($: cheerio.CheerioAPI): DistanceStat[] {
    const stats: DistanceStat[] = [];
    const pageText = $("body").text();

    // Common distance ranges
    const distances = [
      { range: "1000M", min: 1000, max: 1000 },
      { range: "1200M", min: 1200, max: 1200 },
      { range: "1400M", min: 1400, max: 1400 },
      { range: "1600M", min: 1600, max: 1600 },
      { range: "1800M", min: 1800, max: 1800 },
      { range: "2000M", min: 2000, max: 2000 },
      { range: "2200M+", min: 2200, max: 2400 },
    ];

    // Try to find distance stats in tables
    $("table").each((_, table) => {
      const $table = $(table);
      const tableText = $table.text();

      // Check if this looks like a distance table
      if (!tableText.includes("1200") && !tableText.includes("1600")) return;

      $table.find("tr").each((_, row) => {
        const $row = $(row);
        const cells = $row.find("td");
        if (cells.length < 3) return;

        const cellTexts = cells.map((_, cell) => $(cell).text().trim()).get();
        const rowText = cellTexts.join(" ");

        // Find distance in this row
        const distMatch = rowText.match(/(\d{4})\s*M/i);
        if (!distMatch) return;

        const dist = parseInt(distMatch[1]!, 10);
        const distRange = distances.find(d => dist >= d.min && dist <= d.max);
        if (!distRange) return;

        // Parse numbers (usually: rides, wins, 2nds, 3rds)
        const numbers = cellTexts
          .map(t => parseInt(t.replace(/[^\d]/g, ""), 10))
          .filter(n => !isNaN(n) && n >= 0 && n < 1000);

        if (numbers.length >= 2) {
          const rides = numbers[0] || 0;
          const wins = numbers[1] || 0;
          const seconds = numbers[2] || 0;
          const thirds = numbers[3] || 0;
          const places = seconds + thirds;

          if (rides > 0 && !stats.some(s => s.distanceRange === distRange.range)) {
            stats.push({
              distanceRange: distRange.range,
              rides,
              wins,
              places,
              winRate: wins / rides,
              placeRate: (wins + places) / rides,
            });
          }
        }
      });
    });

    return stats.sort((a, b) => {
      const distA = parseInt(a.distanceRange, 10) || 9999;
      const distB = parseInt(b.distanceRange, 10) || 9999;
      return distA - distB;
    });
  }

  /**
   * Scrape stats for all active jockeys
   * Falls back to KNOWN_ACTIVE_JOCKEYS if HKJC jockey list page returns none.
   */
  async scrapeAllJockeys(): Promise<JockeyProfile[]> {
    let activeJockeys = await this.getActiveJockeys();
    if (activeJockeys.length === 0) {
      console.log("Jockey list page returned no links; using known active jockey list.");
      activeJockeys = KNOWN_ACTIVE_JOCKEYS;
    }
    console.log(`Found ${activeJockeys.length} active jockeys`);

    const profiles: JockeyProfile[] = [];

    for (const jockey of activeJockeys) {
      try {
        console.log(`Scraping ${jockey.name} (${jockey.code})...`);
        const profile = await this.scrapeJockeyProfile(jockey.code);
        profiles.push(profile);
      } catch (error) {
        console.warn(`Failed to scrape ${jockey.name}: ${error}`);
      }
    }

    return profiles;
  }

  /**
   * Save jockey profiles to JSON file
   */
  async saveProfiles(profiles: JockeyProfile[], filename: string): Promise<void> {
    const fs = await import("fs/promises");
    const path = await import("path");

    const dataDir = path.join(process.cwd(), "data", "jockeys");
    await fs.mkdir(dataDir, { recursive: true });

    const filepath = path.join(dataDir, filename);
    await fs.writeFile(filepath, JSON.stringify(profiles, null, 2));
    console.log(`Saved ${profiles.length} jockey profiles to ${filepath}`);
  }

  /**
   * Load jockey profiles from JSON file
   */
  async loadProfiles(filename: string): Promise<JockeyProfile[]> {
    const fs = await import("fs/promises");
    const path = await import("path");

    const filepath = path.join(process.cwd(), "data", "jockeys", filename);
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data) as JockeyProfile[];
  }
}

// ============================================================================
// FALLBACK: Known active jockey codes when HKJC jockey list page returns none
// (e.g. page structure changed). Used by scrapeAllJockeys().
// ============================================================================

const KNOWN_ACTIVE_JOCKEYS: { code: string; name: string }[] = [
  { code: "PZ", name: "Z Purton" },
  { code: "MOJ", name: "J Moreira" },
  { code: "MCJ", name: "J McDonald" },
  { code: "BH", name: "H Bowman" },
  { code: "GM", name: "M Guyon" },
  { code: "TEK", name: "K Teetan" },
  { code: "BA", name: "A Badel" },
  { code: "HEL", name: "L Hewitson" },
  { code: "FEL", name: "L Ferraris" },
  { code: "AA", name: "A Atzeni" },
  { code: "CML", name: "M Chadwick" },
  { code: "AVB", name: "B Avdulla" },
  { code: "HCY", name: "C Y Ho" },
  { code: "LDE", name: "K C Leung" },
  { code: "MDB", name: "D B McMonagle" },
  { code: "BHW", name: "H Bentley" },
  { code: "WDJ", name: "D Whyte" },
  { code: "CLR", name: "R Chotard" },
  { code: "PFI", name: "F Poon" },
  { code: "YML", name: "L Yeung" },
  { code: "WJH", name: "J Wong" },
  { code: "CCW", name: "W Chau" },
  { code: "CKJ", name: "J Chao" },
  { code: "SHB", name: "B Shinn" },
];

// ============================================================================
// ELITE JOCKEY QUICK REFERENCE
// ============================================================================

export const ELITE_JOCKEYS = [
  { code: "PZ", name: "Z Purton", expectedWinRate: 0.20 },
  { code: "MCJ", name: "J McDonald", expectedWinRate: 0.22 },
  { code: "BH", name: "H Bowman", expectedWinRate: 0.18 },
  { code: "GM", name: "M Guyon", expectedWinRate: 0.20 },
  { code: "MOJ", name: "J Moreira", expectedWinRate: 0.21 },
  { code: "TEK", name: "K Teetan", expectedWinRate: 0.12 },
  { code: "SHB", name: "B Shinn", expectedWinRate: 0.11 },
  { code: "BA", name: "A Badel", expectedWinRate: 0.14 },
] as const;

export function isEliteJockey(jockeyName: string): boolean {
  const normalizedName = jockeyName.toLowerCase().replace(/[^a-z]/g, "");
  
  const eliteNames = [
    "purton", "zpurton", "zacpurton",
    "mcdonald", "jmcdonald", "jamesmcdonald",
    "bowman", "hbowman", "hughbowman",
    "guyon", "mguyon", "maximeguyon",
    "moreira", "jmoreira", "joaomoreira",
    "teetan", "kteetan", "kaisteetan",
    "shinn", "bshinn", "blakeshinn",
    "badel", "abadel", "alexisbadel",
  ];

  return eliteNames.some(name => normalizedName.includes(name));
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

async function main() {
  const scraper = new JockeyStatsScraper({ headless: true });

  try {
    console.log("Initializing jockey stats scraper...");
    await scraper.init();

    // Scrape elite jockeys first
    console.log("\nScraping elite jockey profiles...");
    const eliteProfiles: JockeyProfile[] = [];

    for (const elite of ELITE_JOCKEYS) {
      try {
        console.log(`\nScraping ${elite.name}...`);
        const profile = await scraper.scrapeJockeyProfile(elite.code);
        eliteProfiles.push(profile);

        console.log(`  Season: ${profile.seasonStats.wins}W from ${profile.seasonStats.rides} rides`);
        console.log(`  Win Rate: ${(profile.seasonStats.winRate * 100).toFixed(1)}%`);
      } catch (error) {
        console.warn(`  Failed: ${error}`);
      }
    }

    // Save profiles
    if (eliteProfiles.length > 0) {
      await scraper.saveProfiles(eliteProfiles, "elite_jockeys.json");
    }

  } catch (error) {
    console.error("Scraping failed:", error);
  } finally {
    await scraper.close();
  }
}

// Run if called directly
if (process.argv[1]?.includes("jockeyStats")) {
  main();
}
