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

    // Use domcontentloaded - faster than networkidle, HKJC pages have lots of async content
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000, // 60 seconds timeout
    });

    // Wait a bit for dynamic content to load
    await sleep(2000);

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
    // Use the correct HKJC URL format (en-us path)
    const url = `${this.config.baseUrl}/en-us/local/information/localresults?RaceDate=${dateStr}&Racecourse=${venueCode}&RaceNo=${raceNumber}`;

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
    let consecutiveFailures = 0;

    for (let raceNum = 1; raceNum <= 11; raceNum++) {
      try {
        const result = await this.scrapeRaceResult(date, venue, raceNum);
        
        // Validate result has actual data
        if (result.finishOrder.length === 0) {
          consecutiveFailures++;
          if (consecutiveFailures >= 2 && raceNum > 1) {
            // Likely no more races on this day
            break;
          }
          continue;
        }
        
        consecutiveFailures = 0;
        results.push(result);
      } catch (error) {
        consecutiveFailures++;
        if (consecutiveFailures >= 2 && raceNum > 1) {
          // Likely no more races on this day
          break;
        }
        // Log but continue - some races may be unavailable
        console.warn(`Race ${raceNum} unavailable: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }

    if (results.length === 0) {
      throw new Error(`No race results found for ${venue} on ${format(date, "yyyy-MM-dd")}. Verify this is a racing day.`);
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
    let daysWithNoRaces = 0;

    while (currentDate <= endDate) {
      let foundRacesForDay = false;
      
      for (const venue of venues) {
        try {
          const meetingResults = await this.scrapeFullMeetingResults(
            currentDate,
            venue
          );
          results.push(...meetingResults);
          foundRacesForDay = true;
          console.log(
            `Scraped ${meetingResults.length} races from ${venue} on ${format(currentDate, "yyyy-MM-dd")}`
          );
        } catch (error) {
          // Expected - not every venue has races every day
          // Only log if it's an unexpected error
          if (error instanceof Error && !error.message.includes("No race results found")) {
            console.warn(`${venue} on ${format(currentDate, "yyyy-MM-dd")}: ${error.message}`);
          }
        }
      }
      
      if (!foundRacesForDay) {
        daysWithNoRaces++;
        if (daysWithNoRaces > 7) {
          throw new Error(
            `No races found for ${daysWithNoRaces} consecutive days. ` +
            `Verify date range and HKJC website accessibility.`
          );
        }
      } else {
        daysWithNoRaces = 0;
      }
      
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }

    if (results.length === 0) {
      throw new Error(
        `No race results found between ${format(startDate, "yyyy-MM-dd")} and ${format(endDate, "yyyy-MM-dd")}. ` +
        `Verify the date range includes racing days.`
      );
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
   * HKJC format: "Class 4 - 1200M - (60-40)", "Going : GOOD", "Course : TURF"
   */
  private parseResultRaceInfo($: cheerio.CheerioAPI): {
    name?: string;
    class: RaceClass;
    distance: number;
    surface: TrackSurface;
    going: Going;
    prizeMoney: number;
  } {
    // Get all text from the page for parsing
    const pageText = $("body").text();
    
    // Also try specific table cells that contain race info
    const raceInfoCells = $("table td").map((_, el) => $(el).text()).get().join(" ");
    const allText = pageText + " " + raceInfoCells;

    // Parse class - look for "Class X" pattern
    let raceClass: RaceClass = "Class 4";
    const classMatch = allText.match(/Class\s*(\d)/i);
    if (classMatch) {
      raceClass = `Class ${classMatch[1]}` as RaceClass;
    } else if (/Group\s*1/i.test(allText)) {
      raceClass = "Group 1";
    } else if (/Group\s*2/i.test(allText)) {
      raceClass = "Group 2";
    } else if (/Group\s*3/i.test(allText)) {
      raceClass = "Group 3";
    } else if (/Griffin/i.test(allText)) {
      raceClass = "Griffin";
    }

    // Parse distance - look for "1200M" or "1200 M" pattern
    let distance = 1200;
    const distanceMatch = allText.match(/(\d{3,4})\s*M(?:\s|$|-)/i);
    if (distanceMatch) {
      distance = parseInt(distanceMatch[1]!, 10);
    }

    // Parse surface - look for "TURF" or "AWT" or "All Weather"
    let surface: TrackSurface | null = null;
    if (/AWT|All Weather/i.test(allText)) {
      surface = "AWT";
    } else if (/TURF|Turf/i.test(allText)) {
      surface = "Turf";
    }
    if (!surface) {
      console.warn(`[WARNING] Could not parse surface from race info, defaulting to Turf`);
      surface = "Turf"; // Turf is more common, but we log the warning
    }

    // Parse going - look for "Going : GOOD" pattern
    let going: Going | null = null;
    const goingMatch = allText.match(/Going\s*:\s*(\w+(?:\s+to\s+\w+)?)/i);
    if (goingMatch) {
      going = this.normalizeGoing(goingMatch[1]!);
    } else {
      // Try alternate patterns
      const goingPatterns: { pattern: RegExp; value: Going }[] = [
        { pattern: /GOOD TO FIRM/i, value: "Good to Firm" },
        { pattern: /GOOD TO YIELDING/i, value: "Good to Yielding" },
        { pattern: /YIELDING/i, value: "Yielding" },
        { pattern: /HEAVY/i, value: "Heavy" },
        { pattern: /SOFT/i, value: "Soft" },
        { pattern: /\bFIRM\b/i, value: "Firm" },
        { pattern: /\bGOOD\b/i, value: "Good" },
        { pattern: /WET FAST/i, value: "Wet Fast" },
        { pattern: /WET SLOW/i, value: "Wet Slow" },
      ];
      for (const { pattern, value } of goingPatterns) {
        if (pattern.test(allText)) {
          going = value;
          break;
        }
      }
    }
    if (!going) {
      throw new Error(`Failed to parse going condition from race info. Raw text snippet: "${allText.substring(0, 200)}..."`);
    }

    // Parse prize money - look for "HK$ X,XXX,XXX" pattern
    let prizeMoney = 0;
    const prizeMatch = allText.match(/HK\$\s*([\d,]+)/i);
    if (prizeMatch) {
      prizeMoney = parseInt(prizeMatch[1]!.replace(/,/g, ""), 10);
    }

    // Parse race name - usually in uppercase after "RACE X"
    let name: string | undefined;
    const nameMatch = allText.match(/(?:RACE\s*\d+[^\n]*\n)?\s*([A-Z][A-Z\s]+HANDICAP|[A-Z][A-Z\s]+CUP|[A-Z][A-Z\s]+TROPHY)/i);
    if (nameMatch) {
      name = nameMatch[1]?.trim();
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
   * HKJC table columns: Pla., Horse No., Horse, Jockey, Trainer, Act. Wt., 
   * Declar. Horse Wt., Dr., LBW, RunningPosition, Finish Time, Win Odds
   */
  private parseFinishOrder($: cheerio.CheerioAPI): RaceResult["finishOrder"] {
    const finishOrder: RaceResult["finishOrder"] = [];

    // Find the main results table - look for table with horse data
    $("table tr").each((_, row) => {
      const $row = $(row);
      
      // Skip header rows
      if ($row.find("th").length > 0) return;
      
      const cells = $row.find("td");
      if (cells.length < 8) return;

      // Get all cell text
      const cellTexts = cells.map((_, cell) => $(cell).text().trim()).get();
      
      // First column should be position (1, 2, 3... or might have finish photo link)
      const posText = cellTexts[0]?.replace(/[^\d]/g, "") || "";
      const position = parseInt(posText, 10);
      if (isNaN(position) || position < 1 || position > 20) return;

      // Second column is horse number
      const horseNumText = cellTexts[1]?.replace(/[^\d]/g, "") || "";
      const horseNum = parseInt(horseNumText, 10);
      if (isNaN(horseNum) || horseNum < 1 || horseNum > 20) return;

      // Find finish time - look for pattern like "1:09.16"
      let finishTime: number | undefined;
      for (const text of cellTexts) {
        const timeMatch = text.match(/(\d+):(\d+\.\d+)/);
        if (timeMatch) {
          finishTime = parseInt(timeMatch[1]!, 10) * 60 + parseFloat(timeMatch[2]!);
          break;
        }
      }

      // Find LBW (lengths behind winner) - look for margin patterns
      let margin: number | undefined;
      for (const text of cellTexts) {
        // Match patterns like "SH", "1/2", "2-1/4", "3", "10-1/2"
        if (text === "-" || text === "") {
          margin = 0; // Winner
        } else if (text === "SH" || text === "SHD") {
          margin = 0.1; // Short head
        } else if (text === "HD" || text === "N") {
          margin = 0.2; // Head or Nose
        } else if (text === "NK") {
          margin = 0.3; // Neck
        } else {
          // Parse fractional margins like "2-1/4" or "1/2"
          const marginMatch = text.match(/^(\d+)?-?(\d+)\/(\d+)$/);
          if (marginMatch) {
            const whole = marginMatch[1] ? parseInt(marginMatch[1], 10) : 0;
            const num = parseInt(marginMatch[2]!, 10);
            const denom = parseInt(marginMatch[3]!, 10);
            margin = whole + num / denom;
          } else {
            // Simple number
            const simpleMargin = parseFloat(text);
            if (!isNaN(simpleMargin) && simpleMargin > 0 && simpleMargin < 50) {
              margin = simpleMargin;
            }
          }
        }
        if (margin !== undefined) break;
      }

      // Find win odds - usually last column, a number like "3.7" or "20"
      let odds: number | undefined;
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

      // Find horse name from links in the row
      let horseName: string | undefined;
      let horseCode: string | undefined;
      let jockeyName: string | undefined;
      let trainerName: string | undefined;
      
      $row.find("a").each((_, link) => {
        const href = $(link).attr("href") || "";
        const text = $(link).text().trim();
        
        if (href.includes("horse") || href.includes("Horse")) {
          horseName = text;
          const codeMatch = href.match(/horseid[=\/]([^&\/]+)/i);
          if (codeMatch) horseCode = codeMatch[1];
        } else if (href.includes("jockey") || href.includes("Jockey")) {
          jockeyName = text;
        } else if (href.includes("trainer") || href.includes("Trainer")) {
          trainerName = text;
        }
      });

      finishOrder.push({
        horseNumber: horseNum,
        finishPosition: position,
        finishTime,
        margin,
        horseName,
        horseCode,
        jockeyName,
        trainerName,
        winOdds: odds,
      });
    });

    // Sort by position just to be safe
    finishOrder.sort((a, b) => a.finishPosition - b.finishPosition);

    return finishOrder;
  }

  /**
   * Parse dividends from results page
   * HKJC dividend table format: Pool | Winning Combination | Dividend (HK$)
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

    // Get all text from the page
    const pageText = $("body").text();

    // Parse dividends using patterns
    // WIN dividend - look for "WIN" followed by number and dividend
    const winMatch = pageText.match(/WIN\s+\d+\s+([\d.]+)/i);
    if (winMatch) {
      dividends.winDividend = parseFloat(winMatch[1]!);
    }

    // PLACE dividends - can have multiple
    const placeDivs: number[] = [];
    // Pattern: PLACE followed by horse number and dividend, or just dividend after PLACE line
    const placeSection = pageText.match(/PLACE\s+([\s\S]*?)(?=QUINELLA|FORECAST|$)/i);
    if (placeSection) {
      // Find all dividend amounts in the place section
      const dividendMatches = placeSection[1]!.matchAll(/(\d+)\s+([\d.]+)/g);
      for (const match of dividendMatches) {
        const dividend = parseFloat(match[2]!);
        if (dividend > 0 && dividend < 1000) {
          placeDivs.push(dividend);
        }
      }
    }
    if (placeDivs.length > 0) {
      dividends.placeDividends = placeDivs;
    }

    // QUINELLA dividend (not QUINELLA PLACE)
    const quinellaMatch = pageText.match(/QUINELLA\s+[\d,]+\s+([\d.]+)/i);
    if (quinellaMatch) {
      dividends.quinellaDividend = parseFloat(quinellaMatch[1]!);
    }

    // QUINELLA PLACE dividends - can have multiple
    const qpDivs: number[] = [];
    const qpSection = pageText.match(/QUINELLA PLACE\s+([\s\S]*?)(?=FORECAST|TIERCE|$)/i);
    if (qpSection) {
      const qpMatches = qpSection[1]!.matchAll(/[\d,]+\s+([\d.]+)/g);
      for (const match of qpMatches) {
        const dividend = parseFloat(match[1]!);
        if (dividend > 0 && dividend < 1000) {
          qpDivs.push(dividend);
        }
      }
    }
    if (qpDivs.length > 0) {
      dividends.quinellaPlaceDividends = qpDivs;
    }

    // TIERCE dividend
    const tierceMatch = pageText.match(/TIERCE\s+[\d,]+\s+([\d,]+)/i);
    if (tierceMatch) {
      dividends.tierceDividend = parseFloat(tierceMatch[1]!.replace(/,/g, ""));
    }

    // TRIO dividend
    const trioMatch = pageText.match(/TRIO\s+[\d,]+\s+([\d,.]+)/i);
    if (trioMatch) {
      dividends.trioDividend = parseFloat(trioMatch[1]!.replace(/,/g, ""));
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
        if (!date) return; // Skip row - invalid date

        const venueText = $(cells[1]).text().trim();
        const venue: Venue = venueText.includes("HV") ? "Happy Valley" : "Sha Tin";

        const raceNum = parseInt($(cells[2]).text().trim(), 10);
        if (isNaN(raceNum) || raceNum < 1) return; // Skip row - invalid race number

        const distanceText = $(cells[3]).text().trim();
        const distance = parseInt(distanceText.replace(/\D/g, ""), 10);
        if (isNaN(distance) || distance < 800 || distance > 2500) return; // Skip row - invalid distance

        const classText = $(cells[4]).text().trim();
        const raceClass = this.normalizeClass(classText);

        const drawText = $(cells[5]).text().trim();
        const draw = parseInt(drawText, 10);
        if (isNaN(draw) || draw < 1 || draw > 14) return; // Skip row - invalid draw

        const weightText = $(cells[6]).text().trim();
        const weight = parseInt(weightText, 10);
        if (isNaN(weight) || weight < 100 || weight > 140) return; // Skip row - invalid weight

        const jockeyCode = $(cells[7]).text().trim().substring(0, 3);

        const posText = $(cells[8]).text().trim();
        const finishPosition = parseInt(posText, 10);
        if (isNaN(finishPosition) || finishPosition < 1 || finishPosition > 20) return; // Skip row - invalid position

        const fieldText = $(cells[9]).text().trim();
        const fieldSize = parseInt(fieldText, 10);
        if (isNaN(fieldSize) || fieldSize < 2 || fieldSize > 20) return; // Skip row - invalid field size

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
    if (normalized === "good" || normalized.includes("good")) return "Good";

    throw new Error(`Failed to normalize going condition: "${goingText}"`);
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

    throw new Error(`Failed to extract going from race info: "${raceInfo.substring(0, 100)}..."`);
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

    throw new Error(`Failed to normalize race class: "${classText}"`);
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
