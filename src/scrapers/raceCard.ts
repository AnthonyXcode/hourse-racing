/**
 * HKJC Race Card Scraper
 *
 * Scrapes race card data from racing.hkjc.com including:
 * - Race details (class, distance, surface, going)
 * - Horse entries with jockey/trainer info
 * - Current odds
 * - Draw positions
 */

import { chromium, type Browser, type Page } from "playwright";
import * as cheerio from "cheerio";
import { format } from "date-fns";
import type {
  Race,
  RaceEntry,
  Horse,
  Jockey,
  Trainer,
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
// SCRAPER CLASS
// ============================================================================

export class RaceCardScraper {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private config: ScraperConfig;
  private lastRequestTime = 0;

  constructor(config: Partial<ScraperConfig> = {}) {
    this.config = { ...DEFAULT_SCRAPER_CONFIG, ...config };
  }

  /**
   * Initialize the browser
   */
  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: this.config.headless,
    });
    this.page = await this.browser.newPage();
    await this.page.setViewportSize({ width: 1280, height: 800 });
  }

  /**
   * Close the browser
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  /**
   * Rate-limited navigation
   */
  private async navigateTo(url: string): Promise<void> {
    const minInterval = (60 / this.config.rateLimit) * 1000;
    const elapsed = Date.now() - this.lastRequestTime;

    if (elapsed < minInterval) {
      await sleep(minInterval - elapsed);
    }

    if (!this.page) throw new Error("Browser not initialized");

    await this.page.goto(url, {
      waitUntil: "networkidle",
      timeout: this.config.timeout,
    });

    this.lastRequestTime = Date.now();
  }

  /**
   * Get available race meetings for a date
   */
  async getRaceMeetings(date: Date = new Date()): Promise<
    {
      venue: Venue;
      raceCount: number;
      url: string;
    }[]
  > {
    const dateStr = format(date, "yyyy/MM/dd");
    const url = `${this.config.baseUrl}/racing/information/English/racing/LocalResults.aspx?RaceDate=${dateStr}`;

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    const content = await this.page.content();
    const $ = cheerio.load(content);

    const meetings: { venue: Venue; raceCount: number; url: string }[] = [];

    // Parse meeting selector - this will need adjustment based on actual HTML structure
    $(".race-meeting-selector a, .venue-tab a").each((_, el) => {
      const text = $(el).text().trim();
      const href = $(el).attr("href") || "";

      let venue: Venue | null = null;
      if (text.includes("Sha Tin") || text.includes("沙田")) {
        venue = "Sha Tin";
      } else if (text.includes("Happy Valley") || text.includes("跑馬地")) {
        venue = "Happy Valley";
      }

      if (venue) {
        meetings.push({
          venue,
          raceCount: 0, // Will be populated when scraping
          url: href.startsWith("http")
            ? href
            : `${this.config.baseUrl}${href}`,
        });
      }
    });

    return meetings;
  }

  /**
   * Scrape a single race card
   */
  async scrapeRaceCard(
    date: Date,
    venue: Venue,
    raceNumber: number
  ): Promise<Race> {
    const dateStr = format(date, "yyyy/MM/dd");
    const venueCode = venue === "Sha Tin" ? "ST" : "HV";
    const url = `${this.config.baseUrl}/racing/information/English/racing/RaceCard.aspx?RaceDate=${dateStr}&Racecourse=${venueCode}&RaceNo=${raceNumber}`;

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    const content = await this.page.content();
    return this.parseRaceCard(content, date, venue, raceNumber);
  }

  /**
   * Scrape all races for a meeting
   */
  async scrapeFullMeeting(date: Date, venue: Venue): Promise<Race[]> {
    const races: Race[] = [];

    // Most meetings have 8-11 races
    for (let raceNum = 1; raceNum <= 11; raceNum++) {
      try {
        const race = await this.scrapeRaceCard(date, venue, raceNum);
        races.push(race);
      } catch (error) {
        // Likely no more races
        if (raceNum > 8) break;
        console.warn(`Failed to scrape race ${raceNum}:`, error);
      }
    }

    return races;
  }

  /**
   * Parse race card HTML into Race object
   */
  private parseRaceCard(
    html: string,
    date: Date,
    venue: Venue,
    raceNumber: number
  ): Race {
    const $ = cheerio.load(html);

    // Parse race header info
    const raceInfo = this.parseRaceInfo($);

    // Parse entries table
    const entries = this.parseEntries($);

    const venueCode = venue === "Sha Tin" ? "ST" : "HV";
    const dateStr = format(date, "yyyy-MM-dd");

    return {
      id: `${dateStr}-${venueCode}-${raceNumber}`,
      date,
      venue,
      raceNumber,
      name: raceInfo.name,
      class: raceInfo.class,
      distance: raceInfo.distance,
      surface: raceInfo.surface,
      going: raceInfo.going,
      prizeMoney: raceInfo.prizeMoney,
      entries,
      raceType: raceInfo.raceType,
    };
  }

  /**
   * Parse race info from header section
   */
  private parseRaceInfo($: cheerio.CheerioAPI): {
    name?: string;
    class: RaceClass;
    distance: number;
    surface: TrackSurface;
    going: Going;
    prizeMoney: number;
    raceType?: string;
  } {
    // These selectors will need adjustment based on actual HKJC HTML
    const raceHeader = $(".race_head, .racecard-header").text();
    const raceDetails = $(".race_detail, .race-info").text();

    // Parse class
    let raceClass: RaceClass = "Class 4"; // Default
    const classMatch = raceHeader.match(/Class\s*(\d)/i);
    if (classMatch) {
      raceClass = `Class ${classMatch[1]}` as RaceClass;
    } else if (/Group\s*1/i.test(raceHeader)) {
      raceClass = "Group 1";
    } else if (/Group\s*2/i.test(raceHeader)) {
      raceClass = "Group 2";
    } else if (/Group\s*3/i.test(raceHeader)) {
      raceClass = "Group 3";
    } else if (/Griffin/i.test(raceHeader)) {
      raceClass = "Griffin";
    }

    // Parse distance (in meters)
    let distance = 1200; // Default
    const distanceMatch = raceHeader.match(/(\d{3,4})\s*M/i);
    if (distanceMatch) {
      distance = parseInt(distanceMatch[1]!, 10);
    }

    // Parse surface
    let surface: TrackSurface = "Turf";
    if (/AWT|All Weather/i.test(raceHeader)) {
      surface = "AWT";
    }

    // Parse going
    let going: Going = "Good";
    const goingPatterns: { pattern: RegExp; value: Going }[] = [
      { pattern: /Good to Firm/i, value: "Good to Firm" },
      { pattern: /Good to Yielding/i, value: "Good to Yielding" },
      { pattern: /Yielding/i, value: "Yielding" },
      { pattern: /Heavy/i, value: "Heavy" },
      { pattern: /Soft/i, value: "Soft" },
      { pattern: /Firm/i, value: "Firm" },
      { pattern: /Wet Fast/i, value: "Wet Fast" },
      { pattern: /Wet Slow/i, value: "Wet Slow" },
    ];

    for (const { pattern, value } of goingPatterns) {
      if (pattern.test(raceDetails) || pattern.test(raceHeader)) {
        going = value;
        break;
      }
    }

    // Parse prize money
    let prizeMoney = 0;
    const prizeMatch = raceDetails.match(/\$?([\d,]+)/);
    if (prizeMatch) {
      prizeMoney = parseInt(prizeMatch[1]!.replace(/,/g, ""), 10);
    }

    // Parse race name
    let name: string | undefined;
    const nameMatch = raceHeader.match(/"([^"]+)"/);
    if (nameMatch) {
      name = nameMatch[1];
    }

    return {
      name,
      class: raceClass,
      distance,
      surface,
      going,
      prizeMoney,
    };
  }

  /**
   * Parse entries table
   */
  private parseEntries($: cheerio.CheerioAPI): RaceEntry[] {
    const entries: RaceEntry[] = [];

    // HKJC uses tables for race cards - selector may need adjustment
    $(".runnerList tr, .race_table tbody tr").each((_, row) => {
      const $row = $(row);

      // Skip header rows
      if ($row.find("th").length > 0) return;

      const entry = this.parseEntryRow($, $row);
      if (entry) {
        entries.push(entry);
      }
    });

    return entries;
  }

  /**
   * Parse a single entry row
   */
  private parseEntryRow(
    $: cheerio.CheerioAPI,
    $row: cheerio.Cheerio<cheerio.Element>
  ): RaceEntry | null {
    const cells = $row.find("td");
    if (cells.length < 5) return null;

    // These column indices will need adjustment based on actual HKJC table structure
    const horseNumber = parseInt($(cells[0]).text().trim(), 10);
    if (isNaN(horseNumber)) return null;

    const draw = parseInt($(cells[1]).text().trim(), 10) || horseNumber;

    // Horse info
    const horseCell = $(cells[2]);
    const horseName = horseCell.find("a").first().text().trim() || horseCell.text().trim();
    const horseCode =
      horseCell.find("a").attr("href")?.match(/HorseId=(\w+)/)?.[1] || `H${horseNumber}`;

    // Jockey info
    const jockeyCell = $(cells[3]);
    const jockeyName = jockeyCell.find("a").first().text().trim() || jockeyCell.text().trim();
    const jockeyCode =
      jockeyCell.find("a").attr("href")?.match(/JockeyId=(\w+)/)?.[1] || "UNK";

    // Trainer info
    const trainerCell = $(cells[4]);
    const trainerName = trainerCell.find("a").first().text().trim() || trainerCell.text().trim();
    const trainerCode =
      trainerCell.find("a").attr("href")?.match(/TrainerId=(\w+)/)?.[1] || "UNK";

    // Weight
    const weight = parseInt($(cells[5])?.text().trim(), 10) || 126;

    // Odds (if available)
    const oddsText = $(cells[cells.length - 1]).text().trim();
    const currentOdds = parseFloat(oddsText) || undefined;

    // Gear changes
    const gearText = $row.find(".gear, .equipment").text();
    const gear = this.parseGear(gearText);

    // Check if scratched
    const isScratched =
      $row.hasClass("scratched") ||
      $row.text().toLowerCase().includes("scratched") ||
      $row.find(".scratched").length > 0;

    // Create minimal horse, jockey, trainer objects
    // Full details would be fetched separately
    const horse: Horse = {
      code: horseCode,
      name: horseName,
      age: 4, // Default, needs to be fetched
      sex: "G",
      color: "Bay",
      origin: "AUS",
      sire: "",
      dam: "",
      currentRating: 60,
      seasonStarts: 0,
      seasonWins: 0,
      seasonPlaces: 0,
      careerStarts: 0,
      careerWins: 0,
      careerPlaces: 0,
      totalPrizeMoney: 0,
      gear,
      pastPerformances: [],
    };

    const jockey: Jockey = {
      code: jockeyCode,
      name: jockeyName,
      nationality: "",
      weightClaim: 0,
      seasonStats: {
        wins: 0,
        places: 0,
        rides: 0,
        winRate: 0,
        placeRate: 0,
        roi: 1,
      },
      courseStats: [],
    };

    const trainer: Trainer = {
      code: trainerCode,
      name: trainerName,
      seasonStats: {
        wins: 0,
        places: 0,
        rides: 0,
        winRate: 0,
        placeRate: 0,
        roi: 1,
      },
      courseStats: [],
      specialties: [],
    };

    return {
      horse,
      jockey,
      trainer,
      horseNumber,
      draw,
      weight,
      gearChanges: gear.length > 0 ? gear : undefined,
      currentOdds,
      isScratched,
    };
  }

  /**
   * Parse gear string into Gear array
   */
  private parseGear(gearText: string): Gear[] {
    const gear: Gear[] = [];
    const gearMap: Record<string, Gear> = {
      B: "B",
      H: "H",
      P: "P",
      TT: "TT",
      V: "V",
      XB: "XB",
      PC: "PC",
      SR: "SR",
      CP: "CP",
      E: "E",
    };

    for (const [key, value] of Object.entries(gearMap)) {
      if (gearText.includes(key)) {
        gear.push(value);
      }
    }

    return gear;
  }

  /**
   * Fetch current odds for a race
   */
  async fetchCurrentOdds(
    date: Date,
    venue: Venue,
    raceNumber: number
  ): Promise<Map<number, number>> {
    const dateStr = format(date, "yyyy/MM/dd");
    const venueCode = venue === "Sha Tin" ? "ST" : "HV";
    const url = `${this.config.baseUrl}/racing/information/English/racing/WinOdds.aspx?RaceDate=${dateStr}&Racecourse=${venueCode}&RaceNo=${raceNumber}`;

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    const content = await this.page.content();
    const $ = cheerio.load(content);

    const odds = new Map<number, number>();

    $(".odds_table tr, .win-odds-table tr").each((_, row) => {
      const cells = $(row).find("td");
      if (cells.length >= 2) {
        const horseNum = parseInt($(cells[0]).text().trim(), 10);
        const oddsValue = parseFloat($(cells[1]).text().trim());

        if (!isNaN(horseNum) && !isNaN(oddsValue)) {
          odds.set(horseNum, oddsValue);
        }
      }
    });

    return odds;
  }
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

async function main() {
  const scraper = new RaceCardScraper({ headless: true });

  try {
    console.log("Initializing scraper...");
    await scraper.init();

    const today = new Date();
    console.log(`\nScraping race card for ${format(today, "yyyy-MM-dd")}...`);

    // Try to scrape Sha Tin Race 1 as an example
    const race = await scraper.scrapeRaceCard(today, "Sha Tin", 1);

    console.log("\nRace Details:");
    console.log(`  ID: ${race.id}`);
    console.log(`  Class: ${race.class}`);
    console.log(`  Distance: ${race.distance}m`);
    console.log(`  Surface: ${race.surface}`);
    console.log(`  Going: ${race.going}`);
    console.log(`  Entries: ${race.entries.length}`);

    console.log("\nEntries:");
    for (const entry of race.entries) {
      console.log(
        `  #${entry.horseNumber} ${entry.horse.name} (Draw: ${entry.draw}) - ${entry.jockey.name}`
      );
    }
  } catch (error) {
    console.error("Scraping failed:", error);
  } finally {
    await scraper.close();
  }
}

// Run if called directly
if (process.argv[1]?.includes("raceCard")) {
  main();
}
