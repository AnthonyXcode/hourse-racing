/**
 * HKJC Historical Results Scraper
 *
 * Scrapes historical race results and past performances including:
 * - Race results with finish times
 * - Dividends (Win, Place, Quinella, etc.)
 * - Horse past performances
 * - Sectional times
 */

import { chromium, type Browser, type Page } from "playwright";
import * as cheerio from "cheerio";
import { format, subDays, parse } from "date-fns";
import type {
  RaceResult,
  PastPerformance,
  Horse,
  Venue,
  TrackSurface,
  Going,
  RaceClass,
  ScraperConfig,
} from "../types/index.js";
import { DEFAULT_SCRAPER_CONFIG } from "../types/index.js";
import { sleep } from "../utils/index.js";

// ============================================================================
// HISTORICAL SCRAPER CLASS
// ============================================================================

export class HistoricalScraper {
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
      waitUntil: "networkidle",
      timeout: this.config.timeout,
    });

    this.lastRequestTime = Date.now();
  }

  /**
   * Scrape race results for a specific date and race
   */
  async scrapeRaceResult(
    date: Date,
    venue: Venue,
    raceNumber: number
  ): Promise<RaceResult> {
    const dateStr = format(date, "yyyy/MM/dd");
    const venueCode = venue === "Sha Tin" ? "ST" : "HV";
    const url = `${this.config.baseUrl}/racing/information/English/racing/LocalResults.aspx?RaceDate=${dateStr}&Racecourse=${venueCode}&RaceNo=${raceNumber}`;
    console.log("url:", url);

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    const content = await this.page.content();
    return this.parseRaceResult(content, date, venue, raceNumber);
  }

  /**
   * Scrape all results for a meeting date
   */
  async scrapeFullMeetingResults(date: Date, venue: Venue): Promise<RaceResult[]> {
    const results: RaceResult[] = [];

    for (let raceNum = 1; raceNum <= 11; raceNum++) {
      try {
        const result = await this.scrapeRaceResult(date, venue, raceNum);
        results.push(result);
      } catch (error) {
        if (raceNum > 8) break;
        console.warn(`Failed to scrape race ${raceNum} results:`, error);
      }
    }

    return results;
  }

  /**
   * Scrape results for a date range
   */
  async scrapeResultsRange(
    startDate: Date,
    endDate: Date,
    venues: Venue[] = ["Sha Tin", "Happy Valley"]
  ): Promise<RaceResult[]> {
    const results: RaceResult[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      for (const venue of venues) {
        try {
          const meetingResults = await this.scrapeFullMeetingResults(
            currentDate,
            venue
          );
          results.push(...meetingResults);
          console.log(
            `Scraped ${meetingResults.length} races from ${venue} on ${format(currentDate, "yyyy-MM-dd")}`
          );
        } catch (error) {
          // No meeting on this day at this venue
        }
      }
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }

    return results;
  }

  /**
   * Scrape horse past performances
   */
  async scrapeHorsePastPerformances(horseCode: string): Promise<PastPerformance[]> {
    const url = `${this.config.baseUrl}/racing/information/English/Horse/Horse.aspx?HorseId=${horseCode}`;

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    const content = await this.page.content();
    return this.parseHorsePastPerformances(content);
  }

  /**
   * Parse race result HTML
   */
  private parseRaceResult(
    html: string,
    date: Date,
    venue: Venue,
    raceNumber: number
  ): RaceResult {
    const $ = cheerio.load(html);

    // Parse race info
    const raceInfo = this.parseResultRaceInfo($);

    // Parse finish order
    const finishOrder = this.parseFinishOrder($);

    // Parse dividends
    const dividends = this.parseDividends($);

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
      entries: [], // Would need to be populated from race card
      finishOrder,
      ...dividends,
    };
  }

  /**
   * Parse race info from results page
   */
  private parseResultRaceInfo($: cheerio.CheerioAPI): {
    name?: string;
    class: RaceClass;
    distance: number;
    surface: TrackSurface;
    going: Going;
    prizeMoney: number;
  } {
    const headerText = $(".race_result_head, .result-header").text();
    const detailsText = $(".race_info, .race-details").text();

    // Parse class
    let raceClass: RaceClass = "Class 4";
    const classMatch = headerText.match(/Class\s*(\d)/i);
    if (classMatch) {
      raceClass = `Class ${classMatch[1]}` as RaceClass;
    } else if (/Group\s*1/i.test(headerText)) {
      raceClass = "Group 1";
    } else if (/Group\s*2/i.test(headerText)) {
      raceClass = "Group 2";
    } else if (/Group\s*3/i.test(headerText)) {
      raceClass = "Group 3";
    }

    // Parse distance
    let distance = 1200;
    const distanceMatch = headerText.match(/(\d{3,4})\s*M/i);
    if (distanceMatch) {
      distance = parseInt(distanceMatch[1]!, 10);
    }

    // Parse surface
    let surface: TrackSurface = "Turf";
    if (/AWT|All Weather/i.test(headerText)) {
      surface = "AWT";
    }

    // Parse going
    let going: Going = "Good";
    const goingMatch = detailsText.match(
      /Going:\s*([^,\n]+)|Track:\s*[^,]*\s+([^,\n]+)/i
    );
    if (goingMatch) {
      const goingText = (goingMatch[1] || goingMatch[2] || "").trim();
      going = this.normalizeGoing(goingText);
    }

    // Parse prize money
    let prizeMoney = 0;
    const prizeMatch = detailsText.match(/Prize[:\s]*\$?([\d,]+)/i);
    if (prizeMatch) {
      prizeMoney = parseInt(prizeMatch[1]!.replace(/,/g, ""), 10);
    }

    // Parse race name
    let name: string | undefined;
    const nameMatch = headerText.match(/[""]([^""]+)[""]/);
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
   * Parse finish order from results table
   */
  private parseFinishOrder($: cheerio.CheerioAPI): RaceResult["finishOrder"] {
    const finishOrder: RaceResult["finishOrder"] = [];

    $(".result_table tbody tr, .race-result-table tr").each((_, row) => {
      const $row = $(row);
      if ($row.find("th").length > 0) return;

      const cells = $row.find("td");
      if (cells.length < 2) return;

      const posText = $(cells[0]).text().trim();
      const position = parseInt(posText, 10);
      if (isNaN(position)) return;

      const horseNum = parseInt($(cells[1]).text().trim(), 10);
      if (isNaN(horseNum)) return;

      // Parse finish time (usually in format M:SS.ss)
      let finishTime: number | undefined;
      const timeText = $row.find(".time, .finish-time").text().trim();
      const timeMatch = timeText.match(/(\d+):(\d+\.?\d*)/);
      if (timeMatch) {
        finishTime =
          parseInt(timeMatch[1]!, 10) * 60 + parseFloat(timeMatch[2]!);
      }

      // Parse margin
      let margin: number | undefined;
      const marginText = $row.find(".margin, .lengths").text().trim();
      const marginMatch = marginText.match(/([\d.]+)/);
      if (marginMatch) {
        margin = parseFloat(marginMatch[1]!);
      }

      finishOrder.push({
        horseNumber: horseNum,
        finishPosition: position,
        finishTime,
        margin,
      });
    });

    return finishOrder;
  }

  /**
   * Parse dividends from results page
   */
  private parseDividends($: cheerio.CheerioAPI): {
    winDividend?: number;
    placeDividends?: number[];
    quinellaDividend?: number;
    quinellaPlaceDividends?: number[];
    tierceDividend?: number;
    trioDividend?: number;
  } {
    const dividends: {
      winDividend?: number;
      placeDividends?: number[];
      quinellaDividend?: number;
      quinellaPlaceDividends?: number[];
      tierceDividend?: number;
      trioDividend?: number;
    } = {};

    const dividendText = $(".dividend, .payout, .dividend-table").text();

    // Win dividend
    const winMatch = dividendText.match(/WIN[:\s]*\$?([\d.]+)/i);
    if (winMatch) {
      dividends.winDividend = parseFloat(winMatch[1]!);
    }

    // Place dividends
    const placeMatches = dividendText.matchAll(/PLACE[:\s]*#?\d+[:\s]*\$?([\d.]+)/gi);
    const placeDivs: number[] = [];
    for (const match of placeMatches) {
      placeDivs.push(parseFloat(match[1]!));
    }
    if (placeDivs.length > 0) {
      dividends.placeDividends = placeDivs;
    }

    // Quinella
    const quinellaMatch = dividendText.match(/QUINELLA[:\s]*\$?([\d.]+)/i);
    if (quinellaMatch) {
      dividends.quinellaDividend = parseFloat(quinellaMatch[1]!);
    }

    // Quinella Place
    const qpMatches = dividendText.matchAll(/Q\.?\s*PLACE[:\s]*\$?([\d.]+)/gi);
    const qpDivs: number[] = [];
    for (const match of qpMatches) {
      qpDivs.push(parseFloat(match[1]!));
    }
    if (qpDivs.length > 0) {
      dividends.quinellaPlaceDividends = qpDivs;
    }

    // Tierce
    const tierceMatch = dividendText.match(/TIERCE[:\s]*\$?([\d,]+)/i);
    if (tierceMatch) {
      dividends.tierceDividend = parseFloat(tierceMatch[1]!.replace(/,/g, ""));
    }

    // Trio
    const trioMatch = dividendText.match(/TRIO[:\s]*\$?([\d.]+)/i);
    if (trioMatch) {
      dividends.trioDividend = parseFloat(trioMatch[1]!);
    }

    return dividends;
  }

  /**
   * Parse horse past performances
   */
  private parseHorsePastPerformances(html: string): PastPerformance[] {
    const $ = cheerio.load(html);
    const performances: PastPerformance[] = [];

    // HKJC shows past performances in a table
    $(".performance_table tr, .past-performance-table tr").each((_, row) => {
      const $row = $(row);
      if ($row.find("th").length > 0) return;

      const cells = $row.find("td");
      if (cells.length < 10) return;

      try {
        const dateText = $(cells[0]).text().trim();
        const date = this.parseHKJCDate(dateText);
        if (!date) return;

        const venueText = $(cells[1]).text().trim();
        const venue: Venue = venueText.includes("HV") ? "Happy Valley" : "Sha Tin";

        const raceNum = parseInt($(cells[2]).text().trim(), 10) || 1;

        const distanceText = $(cells[3]).text().trim();
        const distance = parseInt(distanceText.replace(/\D/g, ""), 10) || 1200;

        const classText = $(cells[4]).text().trim();
        const raceClass = this.normalizeClass(classText);

        const drawText = $(cells[5]).text().trim();
        const draw = parseInt(drawText, 10) || 1;

        const weightText = $(cells[6]).text().trim();
        const weight = parseInt(weightText, 10) || 126;

        const jockeyCode = $(cells[7]).text().trim().substring(0, 3);

        const posText = $(cells[8]).text().trim();
        const finishPosition = parseInt(posText, 10) || 14;

        const fieldText = $(cells[9]).text().trim();
        const fieldSize = parseInt(fieldText, 10) || 14;

        const marginText = $(cells[10])?.text().trim() || "0";
        const winningMargin = parseFloat(marginText) || 0;

        const timeText = $(cells[11])?.text().trim() || "";
        const finishTime = this.parseFinishTime(timeText);

        const oddsText = $(cells[12])?.text().trim() || "10";
        const odds = parseFloat(oddsText) || 10;

        // Determine surface from race info
        const raceInfo = $row.text();
        const surface: TrackSurface = /AWT|All Weather/i.test(raceInfo)
          ? "AWT"
          : "Turf";

        // Parse going from race info
        const going = this.extractGoing(raceInfo);

        performances.push({
          date,
          venue,
          raceNumber: raceNum,
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
      } catch (error) {
        console.warn("Failed to parse performance row:", error);
      }
    });

    return performances;
  }

  /**
   * Parse HKJC date format (DD/MM/YYYY or DD/MM/YY)
   */
  private parseHKJCDate(dateText: string): Date | null {
    try {
      // Try DD/MM/YYYY format
      let parsed = parse(dateText, "dd/MM/yyyy", new Date());
      if (!isNaN(parsed.getTime())) return parsed;

      // Try DD/MM/YY format
      parsed = parse(dateText, "dd/MM/yy", new Date());
      if (!isNaN(parsed.getTime())) return parsed;

      return null;
    } catch {
      return null;
    }
  }

  /**
   * Parse finish time string (M:SS.ss) to seconds
   */
  private parseFinishTime(timeText: string): number {
    const match = timeText.match(/(\d+):(\d+\.?\d*)/);
    if (match) {
      return parseInt(match[1]!, 10) * 60 + parseFloat(match[2]!);
    }
    return 0;
  }

  /**
   * Normalize going string to Going type
   */
  private normalizeGoing(goingText: string): Going {
    const normalized = goingText.toLowerCase().trim();

    if (normalized.includes("firm") && normalized.includes("good")) {
      return "Good to Firm";
    }
    if (normalized.includes("yielding") && normalized.includes("good")) {
      return "Good to Yielding";
    }
    if (normalized.includes("heavy")) return "Heavy";
    if (normalized.includes("soft")) return "Soft";
    if (normalized.includes("yielding")) return "Yielding";
    if (normalized.includes("firm")) return "Firm";
    if (normalized.includes("wet fast")) return "Wet Fast";
    if (normalized.includes("wet slow")) return "Wet Slow";

    return "Good";
  }

  /**
   * Extract going from race info text
   */
  private extractGoing(raceInfo: string): Going {
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
      if (pattern.test(raceInfo)) return value;
    }

    return "Good";
  }

  /**
   * Normalize class string to RaceClass type
   */
  private normalizeClass(classText: string): RaceClass {
    const match = classText.match(/\d/);
    if (match) {
      return `Class ${match[0]}` as RaceClass;
    }
    if (/group\s*1/i.test(classText)) return "Group 1";
    if (/group\s*2/i.test(classText)) return "Group 2";
    if (/group\s*3/i.test(classText)) return "Group 3";
    if (/griffin/i.test(classText)) return "Griffin";

    return "Class 4";
  }

  /**
   * Save results to JSON file
   */
  async saveResults(results: RaceResult[], filename: string): Promise<void> {
    const fs = await import("fs/promises");
    const path = await import("path");

    const dataDir = path.join(process.cwd(), "data", "historical");
    await fs.mkdir(dataDir, { recursive: true });

    const filepath = path.join(dataDir, filename);
    await fs.writeFile(filepath, JSON.stringify(results, null, 2));
    console.log(`Saved ${results.length} results to ${filepath}`);
  }

  /**
   * Load results from JSON file
   */
  async loadResults(filename: string): Promise<RaceResult[]> {
    const fs = await import("fs/promises");
    const path = await import("path");

    const filepath = path.join(process.cwd(), "data", "historical", filename);
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data) as RaceResult[];
  }
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

async function main() {
  const scraper = new HistoricalScraper({ headless: true });

  try {
    console.log("Initializing historical scraper...");
    await scraper.init();

    // Scrape last week's results as an example
    const endDate = new Date();
    const startDate = subDays(endDate, 7);

    console.log(
      `\nScraping results from ${format(startDate, "yyyy-MM-dd")} to ${format(endDate, "yyyy-MM-dd")}...`
    );

    const results = await scraper.scrapeResultsRange(startDate, endDate);

    console.log(`\nScraped ${results.length} race results`);

    // Save to file
    const filename = `results_${format(startDate, "yyyyMMdd")}_${format(endDate, "yyyyMMdd")}.json`;
    await scraper.saveResults(results, filename);
  } catch (error) {
    console.error("Scraping failed:", error);
  } finally {
    await scraper.close();
  }
}

// Run if called directly
if (process.argv[1]?.includes("historical")) {
  main();
}
