/**
 * HKJC Past Race Results Scraper
 *
 * Scrapes the HKJC localresults page for a given past race meeting:
 *   https://racing.hkjc.com/en-us/local/information/localresults?racedate=YYYY/MM/DD&Racecourse=ST&RaceNo=N
 *
 * Returns race metadata (class, distance, surface, going, prize) and a
 * per-runner list with horse / jockey / trainer codes extracted from links.
 */

import { chromium, type Browser, type Page } from "playwright";
import * as cheerio from "cheerio";
import type {
  Venue,
  TrackSurface,
  Going,
  RaceClass,
  ScraperConfig,
} from "../types/index.js";
import { DEFAULT_SCRAPER_CONFIG } from "../types/index.js";
import { sleep } from "../utils/index.js";

// ============================================================================
// PUBLIC INTERFACES
// ============================================================================

export interface PastRaceRunner {
  /** Finishing position (1 = winner) */
  finishPosition: number;
  /** Saddle cloth number shown on the race card */
  horseNumber: number;
  horseName: string;
  /** Full HKJC horse id, e.g. "HK_2024_K122" */
  horseCode: string;
  jockeyCode: string;
  jockeyName: string;
  trainerCode: string;
  trainerName: string;
  /** Barrier draw */
  draw: number;
  /** Actual weight carried in pounds */
  actualWeight: number;
  /** Declared horse weight in lbs (horse body weight) */
  horseWeight: number;
  /** Published win odds */
  winOdds: number;
}

export interface PastRaceResult {
  venue: Venue;
  raceNumber: number;
  raceClass: RaceClass;
  distance: number;
  surface: TrackSurface;
  going: Going;
  prizeMoney: number;
  name?: string;
  runners: PastRaceRunner[];
}

// ============================================================================
// SCRAPER CLASS
// ============================================================================

export class PastRaceResultsScraper {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private config: ScraperConfig;
  private lastRequestTime = 0;

  constructor(config: Partial<ScraperConfig> = {}) {
    this.config = { ...DEFAULT_SCRAPER_CONFIG, ...config };
  }

  async init(): Promise<void> {
    this.browser = await chromium.launch({ headless: this.config.headless });
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
    if (elapsed < minInterval) await sleep(minInterval - elapsed);
    if (!this.page) throw new Error("Browser not initialized");
    await this.page.goto(url, { waitUntil: "domcontentloaded", timeout: this.config.timeout });
    await sleep(2000);
    this.lastRequestTime = Date.now();
  }

  // --------------------------------------------------------------------------
  // Detect which race numbers actually ran at a meeting
  // --------------------------------------------------------------------------

  /**
   * Returns the list of race numbers that have results for a given meeting.
   * Navigates to Race 1 and reads the race-tab links in the page header.
   */
  async scrapeRaceNumbers(date: Date, venue: Venue): Promise<number[]> {
    const dateStr = this.formatDateForUrl(date);
    const venueCode = venue === "Happy Valley" ? "HV" : "ST";
    const url = `${this.config.baseUrl}/en-us/local/information/localresults?racedate=${dateStr}&Racecourse=${venueCode}&RaceNo=1`;

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    const content = await this.page.content();
    const $ = cheerio.load(content);

    const raceNumbers: number[] = [];

    // The page shows a row of race-number links:
    // /en-us/local/information/localresults?racedate=2026/02/08&Racecourse=ST&RaceNo=N
    $(`a[href*="localresults"][href*="RaceNo="]`).each((_, el) => {
      const href = $(el).attr("href") ?? "";
      const m = href.match(/RaceNo=(\d{1,2})/i);
      if (m) {
        const n = parseInt(m[1]!, 10);
        if (n >= 1 && n <= 12 && !raceNumbers.includes(n)) {
          raceNumbers.push(n);
        }
      }
    });

    // If parsing failed, default to 1-11
    if (raceNumbers.length === 0) {
      return Array.from({ length: 11 }, (_, i) => i + 1);
    }

    return raceNumbers.sort((a, b) => a - b);
  }

  // --------------------------------------------------------------------------
  // Scrape a single race
  // --------------------------------------------------------------------------

  async scrapeRace(date: Date, venue: Venue, raceNumber: number): Promise<PastRaceResult | null> {
    const dateStr = this.formatDateForUrl(date);
    const venueCode = venue === "Happy Valley" ? "HV" : "ST";
    const url = `${this.config.baseUrl}/en-us/local/information/localresults?racedate=${dateStr}&Racecourse=${venueCode}&RaceNo=${raceNumber}`;

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    const content = await this.page.content();
    const $ = cheerio.load(content);
    const pageText = $("body").text();

    // Check that results exist for this race number
    if (!pageText.includes("RACE") && !pageText.match(/\bRace\s+\d+\b/i)) {
      return null;
    }

    const meta = this.parseRaceMeta($, pageText, venue, raceNumber);
    const runners = this.parseRunners($);

    if (runners.length === 0) return null;

    return { ...meta, runners };
  }

  // --------------------------------------------------------------------------
  // Parse race metadata from the header table
  // --------------------------------------------------------------------------

  private parseRaceMeta(
    $: cheerio.CheerioAPI,
    pageText: string,
    venue: Venue,
    raceNumber: number
  ): Omit<PastRaceResult, "runners"> {
    const allText = $("table").text() + " " + pageText;

    // Race class + distance — "Class 3 - 1400M - (80-60)"
    let raceClass: RaceClass = "Class 4";
    let distance = 1200;

    const classDistMatch = allText.match(/Class\s*(\d)\s*[-–]\s*(\d{3,4})\s*M/i);
    if (classDistMatch) {
      raceClass = `Class ${classDistMatch[1]}` as RaceClass;
      distance = parseInt(classDistMatch[2]!, 10);
    } else {
      // Fallback: parse class and distance separately
      const classMatch = allText.match(/Class\s*(\d)/i);
      if (classMatch) raceClass = `Class ${classMatch[1]}` as RaceClass;

      const groupMatch = allText.match(/Group\s*(\d)/i) || allText.match(/Group\s*(One|Two|Three)/i);
      if (groupMatch) raceClass = `Group ${this.groupWordToNumber(groupMatch[1]!)}` as RaceClass;

      if (/4\s*(?:Year|Yr)\s*Olds?/i.test(allText)) raceClass = "4 Year Olds";
      if (/Griffin/i.test(allText)) raceClass = "Griffin";

      const distMatch = allText.match(/[-–]\s*(\d{3,4})\s*M\b/i);
      if (distMatch) {
        const d = parseInt(distMatch[1]!, 10);
        if (d >= 1000 && d <= 2400) distance = d;
      }
    }

    // Surface — "Course : TURF - "C" Course" or "ALL-WEATHER"
    let surface: TrackSurface = "Turf";
    if (/All.?Weather|AWT/i.test(allText)) {
      surface = "AWT";
    } else if (/TURF|Turf/i.test(allText)) {
      surface = "Turf";
    }

    // Going — "Going : GOOD" or "GOOD TO FIRM" etc.
    let going: Going = "Good";
    const goingCellMatch = allText.match(/Going\s*:\s*([A-Z][A-Z\s]+?)(?:\s{2,}|Course\s*:|$)/im);
    if (goingCellMatch) {
      going = this.parseGoingString(goingCellMatch[1]!.trim());
    }

    // Prize money — "HK$ 1,860,000"
    let prizeMoney = 0;
    const prizeMatch =
      allText.match(/HK\$?\s*([\d,]{6,})/i) ||
      pageText.match(/Prize\s*Money[^:]*:\s*(?:HK)?\$\s*([\d,]+)/i);
    if (prizeMatch) {
      prizeMoney = parseInt(prizeMatch[1]!.replace(/,/g, ""), 10);
    }

    // Race name — "YAN TIN HANDICAP" (all-caps line before the going row)
    let name: string | undefined;
    const nameMatch = allText.match(/[A-Z]{2}[A-Z\s']+(?:HANDICAP|CUP|TROPHY|PLATE|STAKES|CHALLENGE|CLASSIC|SPRINT|DERBY|MILE|GUINEAS)/);
    if (nameMatch) {
      name = nameMatch[0].trim();
    }

    return { venue, raceNumber, raceClass, distance, surface, going, prizeMoney, name };
  }

  // --------------------------------------------------------------------------
  // Parse the results table (runner list)
  // --------------------------------------------------------------------------

  private parseRunners($: cheerio.CheerioAPI): PastRaceRunner[] {
    const runners: PastRaceRunner[] = [];

    $("table tr").each((_, row) => {
      const $row = $(row);
      // Skip header rows
      if ($row.find("th").length > 0) return;

      const cells = $row.find("td");
      if (cells.length < 8) return;

      const cellTexts = cells.map((_, cell) => $(cell).text().trim()).get();

      // Extract links from the row for horse / jockey / trainer codes
      let horseCode = "";
      let jockeyCode = "";
      let trainerCode = "";
      let jockeyName = "";
      let trainerName = "";
      let horseName = "";

      $row.find("a").each((_, el) => {
        const href = $(el).attr("href") ?? "";
        const text = $(el).text().trim();

        // Horse link: ?horseid=HK%5F2024%5FK122 → HK_2024_K122
        if (href.match(/horseid=/i) && !href.match(/jockey|trainer/i)) {
          const m = href.match(/horseid=([^&\s]+)/i);
          if (m) {
            // URL-decode %5F → _
            horseCode = decodeURIComponent(m[1]!).replace(/%5F/gi, "_");
          }
          if (!horseName && text.length > 1) horseName = text.replace(/\s*\([A-Z]\d+\)\s*$/, "").trim();
        }

        // Jockey link: ?jockeyid=CJE
        if (href.match(/jockeyid=/i) || href.match(/jockeyprofile/i)) {
          const m = href.match(/jockeyid=([A-Z0-9]+)/i);
          if (m) jockeyCode = m[1]!.toUpperCase();
          if (!jockeyName && text.length > 1) jockeyName = text;
        }

        // Trainer link: ?trainerid=MWK
        if (href.match(/trainerid=/i) || href.match(/trainerprofile/i)) {
          const m = href.match(/trainerid=([A-Z0-9]+)/i);
          if (m) trainerCode = m[1]!.toUpperCase();
          if (!trainerName && text.length > 1) trainerName = text.trim();
        }
      });

      // Bail out if we couldn't identify a horse
      if (!horseCode && !horseName) return;

      // Fallback: extract horseName from cell text if not yet found via link
      if (!horseName) {
        for (const text of cellTexts) {
          if (/^[A-Z][A-Z\s']{3,}/.test(text) && text.length < 40) {
            horseName = text.replace(/\s*\([A-Z]\d+\)\s*$/, "").trim();
            break;
          }
        }
      }

      // Parse numeric fields from cell texts
      // Expected columns (rough order): Pla. | Horse No. | Horse | Jockey | Trainer | Act.Wt. | Declar.Horse Wt. | Dr. | LBW | RunPos | FinishTime | Win Odds

      let finishPosition = 99;
      let horseNumber = 0;
      let draw = 0;
      let actualWeight = 0;
      let horseWeight = 0;
      let winOdds = 0;

      // Collect all pure-integer cells to assign positional values
      const nums: number[] = [];
      for (const text of cellTexts) {
        const clean = text.replace(/[^\d.]/g, "");
        if (/^\d+$/.test(clean)) {
          nums.push(parseInt(clean, 10));
        }
      }

      // Assign by range heuristics
      for (const text of cellTexts) {
        const n = parseInt(text, 10);
        if (isNaN(n)) continue;

        // Finish position: 1-14 in the first-few cells
        if (n >= 1 && n <= 14 && finishPosition === 99 && /^\d{1,2}$/.test(text)) {
          finishPosition = n;
          continue;
        }
        // Horse number: 1-14
        if (n >= 1 && n <= 14 && horseNumber === 0 && /^\d{1,2}$/.test(text)) {
          horseNumber = n;
          continue;
        }
        // Actual weight: 100-145
        if (n >= 100 && n <= 145 && actualWeight === 0) {
          actualWeight = n;
          continue;
        }
        // Horse body weight: 900-1400
        if (n >= 900 && n <= 1400 && horseWeight === 0) {
          horseWeight = n;
          continue;
        }
        // Draw: 1-14 (also appears later)
        if (n >= 1 && n <= 14 && draw === 0) {
          draw = n;
          continue;
        }
      }

      // Win odds: typically last numeric cell, may include decimal
      for (let i = cellTexts.length - 1; i >= 0; i--) {
        const oddsMatch = cellTexts[i]?.match(/^([\d.]+)$/);
        if (oddsMatch) {
          const o = parseFloat(oddsMatch[1]!);
          if (o >= 1.0 && o <= 999) {
            winOdds = o;
            break;
          }
        }
      }

      // Only add if we got meaningful data
      if (finishPosition <= 14 && (horseCode || horseName)) {
        runners.push({
          finishPosition,
          horseNumber,
          horseName,
          horseCode,
          jockeyCode,
          jockeyName,
          trainerCode,
          trainerName,
          draw,
          actualWeight,
          horseWeight,
          winOdds,
        });
      }
    });

    // Sort by finish position
    runners.sort((a, b) => a.finishPosition - b.finishPosition);
    return runners;
  }

  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------

  private formatDateForUrl(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  }

  private groupWordToNumber(word: string): string {
    if (/one/i.test(word)) return "1";
    if (/two/i.test(word)) return "2";
    if (/three/i.test(word)) return "3";
    return word;
  }

  private parseGoingString(raw: string): Going {
    const t = raw.toLowerCase().trim();
    if (t.includes("wet fast")) return "Wet Fast";
    if (t.includes("wet slow")) return "Wet Slow";
    if (t.includes("good") && t.includes("firm")) return "Good to Firm";
    if (t.includes("good") && (t.includes("yield") || t.includes("yielding"))) return "Good to Yielding";
    if (t.includes("yielding")) return "Yielding";
    if (t.includes("heavy")) return "Heavy";
    if (t.includes("soft")) return "Soft";
    if (t.includes("firm")) return "Firm";
    if (t.includes("good")) return "Good";
    return "Good";
  }
}
