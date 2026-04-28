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

    // Use domcontentloaded - faster than networkidle, HKJC pages have lots of async content
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Wait for dynamic content to load
    await sleep(2000);

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
    const url = `${this.config.baseUrl}/en-us/local/information/localresults?RaceDate=${dateStr}`;

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
    // Use the correct HKJC URL format (en-us path)
    const url = `${this.config.baseUrl}/en-us/local/information/racecard?raceDate=${dateStr}&Racecourse=${venueCode}&RaceNo=${raceNumber}`;

    await this.navigateTo(url);
    if (!this.page) throw new Error("Browser not initialized");

    // Extract race metadata via Playwright before dumping to Cheerio.
    // This targets specific header elements for the CURRENT race, avoiding
    // the race-selector navigation that lists all races' class/distance.
    const pwMeta = await this.extractRaceMetaViaPlaywright(raceNumber);

    const content = await this.page.content();
    return this.parseRaceCard(content, date, venue, raceNumber, pwMeta);
  }

  /**
   * Use Playwright to extract race class, distance, surface, going from
   * the currently-loaded race card page. This avoids Cheerio regex
   * mismatches caused by the race-selector nav bar listing every race.
   */
  private async extractRaceMetaViaPlaywright(
    raceNumber: number
  ): Promise<{ class?: string; distance?: number; surface?: string; going?: string } | null> {
    if (!this.page) return null;
    try {
      return await this.page.evaluate((raceNum: number) => {
        const result: { class?: string; distance?: number; surface?: string; going?: string } = {};

        // Strategy 1: look for the race detail/header section (common HKJC selectors)
        const headerSelectors = [
          ".race_detail",
          ".raceDetail",
          ".race-detail",
          ".race_head_info",
          ".racecard-header",
          '[class*="raceInfo"]',
          '[class*="race_info"]',
          '[class*="raceDetail"]',
        ];
        let headerText = "";
        for (const sel of headerSelectors) {
          const el = document.querySelector(sel);
          if (el && el.textContent && el.textContent.length > 10) {
            headerText = el.textContent;
            break;
          }
        }

        // Strategy 2: look for a table row or div that contains RACE N header
        if (!headerText) {
          const allEls = document.querySelectorAll("td, div, span, p");
          for (const el of allEls) {
            const t = el.textContent ?? "";
            const racePattern = new RegExp(`Race\\s*${raceNum}\\b`, "i");
            if (racePattern.test(t) && /\d{3,4}\s*M/i.test(t) && t.length < 500) {
              headerText = t;
              break;
            }
          }
        }

        // Strategy 3: look for the selected/active race tab's detail section
        if (!headerText) {
          const activeTab = document.querySelector('.active [class*="race"], .selected [class*="race"], [class*="race"].active');
          if (activeTab?.textContent && activeTab.textContent.length > 5) {
            headerText = activeTab.textContent;
          }
        }

        if (!headerText) return result;

        // Parse class + distance from the header text
        const classDistMatch = headerText.match(
          /(4\s*(?:Year|Yr)\s*Olds?|Griffin|Group\s*(?:\d|One|Two|Three)|Class\s*\d)\s*(?:Race\s*)?[-–—]?\s*(\d{3,4})\s*M/i
        );
        if (classDistMatch) {
          result.class = classDistMatch[1]!;
          result.distance = parseInt(classDistMatch[2]!, 10);
        } else {
          const distOnly = headerText.match(/(\d{3,4})\s*M(?:etres?)?/i);
          if (distOnly) {
            const d = parseInt(distOnly[1]!, 10);
            if (d >= 1000 && d <= 2400) result.distance = d;
          }
        }

        if (/AWT|All Weather/i.test(headerText)) result.surface = "AWT";
        else if (/Turf/i.test(headerText)) result.surface = "Turf";

        const goingMatch = headerText.match(/Going\s*:\s*(\w+(?:\s+to\s+\w+)?)/i);
        if (goingMatch) result.going = goingMatch[1]!;

        return result;
      }, raceNumber);
    } catch {
      return null;
    }
  }

  /**
   * Scrape all races for a meeting
   */
  async scrapeFullMeeting(date: Date, venue: Venue): Promise<Race[]> {
    const races: Race[] = [];
    let consecutiveFailures = 0;

    // Most meetings have 8-11 races
    for (let raceNum = 1; raceNum <= 11; raceNum++) {
      try {
        const race = await this.scrapeRaceCard(date, venue, raceNum);
        
        // Validate race has entries
        if (race.entries.length === 0) {
          consecutiveFailures++;
          if (consecutiveFailures >= 2 && raceNum > 1) {
            // Likely no more races
            break;
          }
          continue;
        }
        
        consecutiveFailures = 0;
        races.push(race);
      } catch (error) {
        consecutiveFailures++;
        if (consecutiveFailures >= 2 && raceNum > 1) {
          // Likely no more races
          break;
        }
        console.warn(`Race ${raceNum} unavailable: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }

    if (races.length === 0) {
      throw new Error(
        `No race cards found for ${venue} on ${format(date, "yyyy-MM-dd")}. ` +
        `Verify this is an upcoming racing day with published entries.`
      );
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
    raceNumber: number,
    pwMeta?: { class?: string; distance?: number; surface?: string; going?: string } | null,
  ): Race {
    const $ = cheerio.load(html);

    // Parse race header info (Cheerio fallback), then overlay Playwright metadata
    const raceInfo = this.parseRaceInfo($, raceNumber);

    if (pwMeta) {
      if (pwMeta.distance && pwMeta.distance >= 1000 && pwMeta.distance <= 2400) {
        raceInfo.distance = pwMeta.distance;
      }
      if (pwMeta.class) {
        raceInfo.class = this.parseClassString(pwMeta.class);
      }
      if (pwMeta.surface) {
        raceInfo.surface = pwMeta.surface.includes("AWT") ? "AWT" : "Turf";
      }
    }

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
   * HKJC format: "Class 4 - 1200M - (60-40)", "Going : GOOD", "Course : TURF"
   */
  private parseRaceInfo($: cheerio.CheerioAPI, raceNumber?: number): {
    name?: string;
    class: RaceClass;
    distance: number;
    surface: TrackSurface;
    going: Going;
    prizeMoney: number;
    raceType?: string;
  } {
    // Extract the race header/info section text rather than the full page body.
    // HKJC race card pages put the race class/distance line in a compact header area.
    const raceHeaderCandidates = [
      $(".race_head, .raceHead, .race-head, .race-info, .raceInfo").text(),
      $(".race_detail, .raceDetail, .race-detail, .race_head_info, .racecard-header").text(),
      $("table").first().text(),
      $("table td").map((_, el) => $(el).text()).get().join(" "),
    ];
    const raceHeaderText = raceHeaderCandidates.join(" ");

    // Fallback to full page only when header candidates are too sparse
    const pageText = $("body").text();
    const allText = raceHeaderText.length > 50 ? raceHeaderText : pageText;

    const CLASS_PAT = `(4\\s*(?:Year|Yr)\\s*Olds?|Griffin|Group\\s*(?:\\d|One|Two|Three)|Class\\s*\\d)`;
    const DIST_PAT = `(\\d{3,4})\\s*M`;

    let raceClass: RaceClass = "Class 4";
    let distance = 1200;
    let matched = false;

    // Strategy 1: race-number-anchored match.
    // Look for "Race N ... Class X - 1600M" so we grab the CURRENT race's
    // info instead of the first race listed in the nav bar.
    if (raceNumber) {
      const anchoredRe = new RegExp(
        `Race\\s*${raceNumber}\\b[^]*?${CLASS_PAT}\\s*(?:Race\\s*)?[-–—]?\\s*${DIST_PAT}\\s*M`,
        "i"
      );
      const anchoredMatch = allText.match(anchoredRe);
      if (anchoredMatch) {
        raceClass = this.parseClassString(anchoredMatch[1]!);
        distance = parseInt(anchoredMatch[2]!, 10);
        matched = true;
      } else {
        // Try: "Race N" followed later by just a distance
        const anchoredDistRe = new RegExp(
          `Race\\s*${raceNumber}\\b[\\s\\S]{0,300}?${CLASS_PAT}[\\s\\S]{0,50}?${DIST_PAT}`,
          "i"
        );
        const m2 = allText.match(anchoredDistRe);
        if (m2) {
          raceClass = this.parseClassString(m2[1]!);
          distance = parseInt(m2[2]!, 10);
          matched = true;
        }
      }
    }

    // Strategy 2: original combined regex (first match in text)
    if (!matched) {
      const combinedMatch = allText.match(
        new RegExp(`${CLASS_PAT}\\s*(?:Race\\s*)?[-–—]?\\s*${DIST_PAT}\\s*M`, "i")
      );
      if (combinedMatch) {
        raceClass = this.parseClassString(combinedMatch[1]!);
        distance = parseInt(combinedMatch[2]!, 10);
        matched = true;
      }
    }

    // Strategy 3: parse class and distance separately
    if (!matched) {
      const classMatch = allText.match(/Class\s*(\d)/i);
      const groupMatch = allText.match(/Group\s*(\d)/i) ||
                         allText.match(/Group\s*(One|Two|Three)/i);
      if (/4\s*(?:Year|Yr)\s*Olds?/i.test(allText)) {
        raceClass = "4 Year Olds";
      } else if (/Griffin/i.test(allText)) {
        raceClass = "Griffin";
      } else if (classMatch) {
        raceClass = `Class ${classMatch[1]}` as RaceClass;
      } else if (groupMatch) {
        raceClass = `Group ${this.groupWordToNumber(groupMatch[1]!)}` as RaceClass;
      }

      const distanceMatch = allText.match(/(?:^|[^\d])(\d{4})\s*M(?:\s|$|-)/i) ||
                            allText.match(/(\d{4})\s*M[^0-9]/i);
      if (distanceMatch) {
        const d = parseInt(distanceMatch[1]!, 10);
        if (d >= 1000 && d <= 2400) {
          distance = d;
        }
      }
    }

    if (raceNumber) {
      console.log(`[SCRAPER] R${raceNumber}: parsed class=${raceClass}, distance=${distance}m`);
    }

    // Parse surface
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
      const goingText = goingMatch[1]!.toLowerCase();
      if (goingText.includes("firm") && goingText.includes("good")) going = "Good to Firm";
      else if (goingText.includes("yielding") && goingText.includes("good")) going = "Good to Yielding";
      else if (goingText.includes("yielding")) going = "Yielding";
      else if (goingText.includes("heavy")) going = "Heavy";
      else if (goingText.includes("soft")) going = "Soft";
      else if (goingText.includes("firm")) going = "Firm";
      else if (goingText.includes("good")) going = "Good";
      else if (goingText.includes("wet fast")) going = "Wet Fast";
      else if (goingText.includes("wet slow")) going = "Wet Slow";
    }
    if (!going) {
      console.warn("[WARNING] Could not parse going from race card, defaulting to Good");
      going = "Good";
    }

    // Parse prize money - look for "HK$ X,XXX,XXX" pattern
    let prizeMoney = 0;
    const prizeMatch = allText.match(/HK\$\s*([\d,]+)/i);
    if (prizeMatch) {
      prizeMoney = parseInt(prizeMatch[1]!.replace(/,/g, ""), 10);
    }

    // Parse race name
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
   * Parse entries table
   * HKJC table columns: Horse No., Horse, Jockey, Trainer, Wt., Draw, etc.
   */
  private parseEntries($: cheerio.CheerioAPI): RaceEntry[] {
    const entries: RaceEntry[] = [];

    // Find all table rows and parse each one
    $("table tr").each((_, row) => {
      const $row = $(row);

      // Skip header rows
      if ($row.find("th").length > 0) return;

      const cells = $row.find("td");
      if (cells.length < 5) return;

      const entry = this.parseEntryRow($, $row);
      if (entry) {
        entries.push(entry);
      }
    });

    return entries;
  }

  /**
   * Parse a single entry row
   * HKJC table typically has: Horse No., Horse Name (with link), Jockey, Trainer, Wt., Draw, etc.
   */
  private parseEntryRow(
    $: cheerio.CheerioAPI,
    $row: cheerio.Cheerio<cheerio.Element>
  ): RaceEntry | null {
    const cells = $row.find("td");
    if (cells.length < 5) return null;

    // Get all cell texts for analysis
    const cellTexts = cells.map((_, cell) => $(cell).text().trim()).get();

    // First column should be horse number
    const horseNumText = cellTexts[0]?.replace(/[^\d]/g, "") || "";
    const horseNumber = parseInt(horseNumText, 10);
    if (isNaN(horseNumber) || horseNumber < 1 || horseNumber > 20) return null;

    // Require a horse link with horseid — rows without one (gear legend, notes) are not entries
    const hasHorseLink = $row.find('a[href*="horse" i]').length > 0 ||
                         $row.find('a[href*="Horse"]').length > 0;
    if (!hasHorseLink) return null;

    // Find horse name - usually in a link with horse ID
    let horseName = "";
    let horseCode = `H${horseNumber}`;
    // Barrier draw; HKJC "Dr." column is often past the first few cells — do not default to horseNumber.
    let draw = horseNumber;
    let weight = 126;
    let jockeyName = "";
    let jockeyCode = "UNK";
    let hasJockeyLink = false;
    let trainerName = "";
    let trainerCode = "UNK";
    let trainerCellIdx = -1;

    // Parse links in the row for horse/jockey/trainer info
    $row.find("a").each((_, link) => {
      const $link = $(link);
      const href = $link.attr("href") || "";
      const text = $link.text().trim();

      if (href.includes("horse") || href.includes("Horse")) {
        horseName = text;
        const codeMatch = href.match(/horseid[=\/]([^&\/]+)/i);
        if (codeMatch) horseCode = codeMatch[1]!;
      } else if (href.includes("jockey") || href.includes("Jockey")) {
        hasJockeyLink = true;
        const codeMatch = href.match(/jockeyid[=\/]([^&\/]+)/i);
        if (codeMatch) jockeyCode = codeMatch[1]!;
        if (text.length >= 2) {
          jockeyName = text;
        } else {
          // HKJC sometimes has jockey name in parent <td> or in link title (link itself has no text)
          const title = $link.attr("title")?.trim();
          let parentText = $link.closest("td").text().trim();
          parentText = parentText.split(/\s*[\n\r]\s*/)[0]?.trim() ?? parentText; // first line only
          if (title && title.length >= 2 && title.length < 50) {
            jockeyName = title;
          } else if (parentText && parentText.length >= 2 && parentText.length < 50) {
            jockeyName = parentText;
          }
        }
      } else if (href.includes("trainer") || href.includes("Trainer")) {
        if (text.length >= 2) {
          trainerName = text;
        } else {
          const title = $link.attr("title")?.trim();
          let parentText = $link.closest("td").text().trim();
          parentText = parentText.split(/\s*[\n\r]\s*/)[0]?.trim() ?? parentText;
          if (title && title.length >= 2 && title.length < 50) {
            trainerName = title;
          } else if (parentText && parentText.length >= 2 && parentText.length < 50) {
            trainerName = parentText;
          }
        }
        const codeMatch = href.match(/trainerid[=\/]([^&\/]+)/i);
        if (codeMatch) trainerCode = codeMatch[1]!;
        // Track trainer cell index for extracting Rtg/Rtg+/- from subsequent cells
        const $trainerTd = $link.closest("td");
        trainerCellIdx = cells.index($trainerTd);
      }
    });

    // No jockey link = stand-by starter (no jockey assigned yet); skip silently
    if (!hasJockeyLink) return null;

    // Weight: the Wt. column is before the jockey/trainer columns.
    // Take the FIRST 3-digit number in 100-140 to avoid later cells (rating, body weight, days) overwriting.
    const weightSearchEnd = trainerCellIdx > 0 ? trainerCellIdx : cellTexts.length;
    for (let i = 0; i < weightSearchEnd; i++) {
      const text = cellTexts[i]!;
      const weightMatch = text.match(/^(\d{3})$/);
      if (weightMatch) {
        const w = parseInt(weightMatch[1]!, 10);
        if (w >= 100 && w <= 140) {
          weight = w;
          break;
        }
      }
    }

    // Draw ("Dr.") — the draw cell is immediately before the trainer cell in the HKJC table.
    // Previous heuristic (scanning for first 1-14 from col 4) picked up jockey weight claims.
    let drawFound = false;
    if (trainerCellIdx > 0) {
      const drawText = cellTexts[trainerCellIdx - 1]?.trim();
      if (drawText && /^\d{1,2}$/.test(drawText)) {
        const d = parseInt(drawText, 10);
        if (d >= 1 && d <= 14) {
          draw = d;
          drawFound = true;
        }
      }
    }
    if (!drawFound) {
      // Fallback: scan from index 4 onward (skip horse #, form, colour, name cells)
      for (let i = 4; i < cellTexts.length; i++) {
        const text = cellTexts[i]!.trim();
        if (!/^\d{1,2}$/.test(text)) continue;
        const d = parseInt(text, 10);
        if (d >= 1 && d <= 14) {
          draw = d;
          drawFound = true;
          break;
        }
      }
    }
    if (!drawFound) {
      console.warn(
        `Entry #${horseNumber} ${horseName || "?"}: barrier draw not parsed; using horse number as draw`
      );
    }

    // If no horse name found, try to get from cell text
    if (!horseName) {
      for (const text of cellTexts) {
        if (text.length > 3 && /^[A-Z][A-Z\s']+$/i.test(text)) {
          horseName = text;
          break;
        }
      }
    }

    // Skip if essential data is missing
    if (!horseName || horseName.length < 2) return null;

    // Extract Rtg. and Rtg.+/- from cells after the Trainer column
    // Column order after Trainer: Int'l Rtg (skip), Rtg., Rtg.+/-
    let currentRating = 60;
    let ratingChange: number | undefined;
    if (trainerCellIdx >= 0 && trainerCellIdx + 2 < cellTexts.length) {
      const rtgText = cellTexts[trainerCellIdx + 2]?.trim();
      const rtgChangeText = cellTexts[trainerCellIdx + 3]?.trim();
      if (rtgText) {
        const rtgVal = parseInt(rtgText, 10);
        if (!isNaN(rtgVal) && rtgVal >= 10 && rtgVal <= 140) {
          currentRating = rtgVal;
        }
      }
      if (rtgChangeText) {
        const changeVal = parseInt(rtgChangeText, 10);
        if (!isNaN(changeVal) && changeVal >= -30 && changeVal <= 30) {
          ratingChange = changeVal;
        }
      }
    }

    // Extract age from cells (after Horse Wt., Wt+/-, Best Time columns)
    let age = 4;
    if (trainerCellIdx >= 0 && trainerCellIdx + 7 < cellTexts.length) {
      const ageText = cellTexts[trainerCellIdx + 7]?.trim();
      if (ageText) {
        const ageVal = parseInt(ageText, 10);
        if (!isNaN(ageVal) && ageVal >= 2 && ageVal <= 12) {
          age = ageVal;
        }
      }
    }

    // Gear: find the specific gear cell rather than searching the entire row text.
    // The gear cell is in the later columns (typically trainerCellIdx+13) and contains
    // only valid gear codes separated by "/", optionally suffixed with "1"/"2"/"-".
    let gearCellText = "";
    if (trainerCellIdx >= 0) {
      const GEAR_CODES = new Set(["B","BO","H","P","TT","V","VO","XB","PC","SR","CP","CO","CC","PS","SB","E"]);
      const searchStart = trainerCellIdx + 8;
      for (let i = searchStart; i < cellTexts.length; i++) {
        const text = cellTexts[i]!.trim();
        if (!text || text.length > 30) continue;
        const parts = text.split("/").map(p => p.replace(/[12-]$/, "").trim());
        if (parts.length > 0 && parts.every(p => GEAR_CODES.has(p))) {
          gearCellText = text;
          break;
        }
      }
    }
    const gear = this.parseGear(gearCellText);

    // Check if scratched
    const rowText = $row.text().toLowerCase();
    const isScratched =
      $row.hasClass("scratched") ||
      rowText.includes("scratched") ||
      rowText.includes("withdrawn");

    // Create horse object
    const horse: Horse = {
      code: horseCode,
      name: horseName,
      age,
      sex: "G",
      color: "Bay",
      origin: "AUS",
      sire: "",
      dam: "",
      currentRating,
      seasonStarts: 0,
      seasonWins: 0,
      seasonPlaces: 0,
      careerStarts: 0,
      careerWins: 0,
      careerPlaces: 0,
      totalPrizeMoney: 0,
      gear,
      pastPerformances: [],
      ...(ratingChange !== undefined ? { ratingChange } : {}),
    };

    // Validate essential data - skip entry if missing critical info
    if (!jockeyName || jockeyName.length < 2) {
      console.warn(`Entry #${horseNumber} ${horseName}: Jockey link found but name empty, skipping`);
      return null;
    }
    if (!trainerName || trainerName.length < 2) {
      console.warn(`Entry #${horseNumber} ${horseName}: Missing trainer name, skipping`);
      return null;
    }

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
      currentOdds: undefined,
      isScratched,
    };
  }

  /** Convert "One"/"Two"/"Three" or "1"/"2"/"3" to the numeric string. */
  private groupWordToNumber(value: string): string {
    const map: Record<string, string> = { one: "1", two: "2", three: "3" };
    return map[value.toLowerCase()] ?? value;
  }

  /** Parse a class descriptor string like "Class 4", "Group Two", "Griffin", "4 Year Olds" into RaceClass. */
  private parseClassString(classStr: string): RaceClass {
    if (/4\s*(?:Year|Yr)\s*Olds?/i.test(classStr)) return "4 Year Olds";
    if (/Griffin/i.test(classStr)) return "Griffin";
    const classDigit = classStr.match(/Class\s*(\d)/i);
    if (classDigit) return `Class ${classDigit[1]}` as RaceClass;
    const groupMatch = classStr.match(/Group\s*(\d)/i) ||
                       classStr.match(/Group\s*(One|Two|Three)/i);
    if (groupMatch) return `Group ${this.groupWordToNumber(groupMatch[1]!)}` as RaceClass;
    return "Class 4";
  }

  /**
   * Parse gear cell text into Gear array.
   * Expects the specific gear cell content (e.g. "B/TT", "CP1/SR", "BO").
   * Splits by "/" and strips trailing "1"/"2"/"-" suffixes (first-time/replaced/removed markers).
   */
  private parseGear(gearCellText: string): Gear[] {
    if (!gearCellText.trim()) return [];
    const gearMap: Record<string, Gear> = {
      B: "B", BO: "BO", H: "H", P: "P", TT: "TT", V: "V", VO: "VO",
      XB: "XB", PC: "PC", SR: "SR", CP: "CP", CO: "CO", CC: "CC",
      PS: "PS", SB: "SB", E: "E",
    };
    const gear: Gear[] = [];
    const seen = new Set<string>();
    for (const part of gearCellText.split("/")) {
      const code = part.replace(/[12-]$/, "").trim();
      const mapped = gearMap[code];
      if (mapped && !seen.has(mapped)) {
        gear.push(mapped);
        seen.add(mapped);
      }
    }
    return gear;
  }

  /**
   * Fetch current win odds for a race from the betting site (bet.hkjc.com).
   * Uses Playwright DOM selectors (same approach as tools/fetch-odds.ts)
   * instead of cheerio text regex, which missed whole-number odds.
   */
  async fetchCurrentOdds(
    date: Date,
    venue: Venue,
    raceNumber: number
  ): Promise<Map<number, number>> {
    const dateStr = format(date, "yyyy-MM-dd");
    const venueCode = venue === "Sha Tin" ? "ST" : "HV";
    const url = `https://bet.hkjc.com/en/racing/wp/${dateStr}/${venueCode}/${raceNumber}`;

    if (!this.page) throw new Error("Browser not initialized");

    await this.page.goto(url, { waitUntil: "load", timeout: 30000 });

    const MAX_ATTEMPTS = 3;
    let extracted: { horseNumber: number; winOdds: number }[] = [];

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      await this.page
        .waitForSelector("td.rc-odds", { timeout: 10000 })
        .catch(() => {});
      await sleep(1000);

      extracted = await this.page.evaluate(() => {
        const results: { horseNumber: number; winOdds: number }[] = [];
        // @ts-expect-error runs in browser context where document exists
        document.querySelectorAll("tr").forEach((row: Element) => {
          const noCell = row.querySelector("td.rc-no");
          const oddsCells = row.querySelectorAll("td.rc-odds");
          if (!noCell || oddsCells.length < 1) return;

          const horseNumber = parseInt(noCell.textContent?.trim() || "0", 10);
          const winText = oddsCells[0].textContent?.trim() || "0";
          const winOdds = parseFloat(winText);

          if (horseNumber > 0 && !isNaN(winOdds) && winOdds > 0) {
            results.push({ horseNumber, winOdds });
          }
        });
        return results;
      });

      if (extracted.length > 0) break;

      if (attempt < MAX_ATTEMPTS) {
        console.log(
          `  [RETRY] fetchCurrentOdds attempt ${attempt}/${MAX_ATTEMPTS} returned 0 horses, waiting...`
        );
        await sleep(3000);
      }
    }

    this.lastRequestTime = Date.now();

    const odds = new Map<number, number>();
    for (const h of extracted) {
      odds.set(h.horseNumber, h.winOdds);
    }
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

    // Try today and next few days to find a racing day
    const today = new Date();
    const venues: ("Sha Tin" | "Happy Valley")[] = ["Sha Tin", "Happy Valley"];
    
    let foundRacing = false;

    for (let dayOffset = 0; dayOffset <= 7 && !foundRacing; dayOffset++) {
      const testDate = new Date(today.getTime() + dayOffset * 24 * 60 * 60 * 1000);
      
      for (const venue of venues) {
        console.log(`\nChecking ${venue} on ${format(testDate, "yyyy-MM-dd")}...`);
        
        try {
          const race = await scraper.scrapeRaceCard(testDate, venue, 1);
          
          if (race.entries.length > 0) {
            foundRacing = true;
            console.log("\n" + "=".repeat(60));
            console.log(`RACE CARD: ${venue} - ${format(testDate, "yyyy-MM-dd")}`);
            console.log("=".repeat(60));
            
            // Scrape all races for this meeting
            const races = await scraper.scrapeFullMeeting(testDate, venue);
            
            for (const r of races) {
              if (r.entries.length === 0) continue;
              
              console.log(`\nRace ${r.raceNumber}: ${r.class} ${r.distance}m ${r.surface}`);
              console.log(`  Going: ${r.going}`);
              console.log(`  Entries: ${r.entries.length}`);
              console.log("  " + "-".repeat(40));
              
              for (const entry of r.entries) {
                const status = entry.isScratched ? " [SCRATCHED]" : "";
                console.log(
                  `    #${entry.horseNumber.toString().padStart(2)} ${entry.horse.name.padEnd(20)} ` +
                  `Draw: ${entry.draw.toString().padStart(2)} Wt: ${entry.weight}${status}`
                );
              }
            }
            
            console.log("\n" + "=".repeat(60));
            console.log(`Total: ${races.length} races, ${races.reduce((s, r) => s + r.entries.length, 0)} entries`);
            break;
          }
        } catch (err) {
          // No racing on this day/venue
        }
      }
    }

    if (!foundRacing) {
      console.log("\nNo upcoming races found in the next 7 days.");
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
