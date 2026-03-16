/**
 * JockeyEnricher – enriches race entries with jockey season stats (and optional course stats)
 * so FormAnalyzer/MC can use real jockey edge. Data from:
 * 1) Loaded files: data/jockeys/jockey_stats_*.json or jockeys_all_*.json / jockeys_elite_*.json
 * 2) Live scrape: https://racing.hkjc.com/en-us/local/information/jockeyprofile?jockeyid={code}
 */

import { readdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { chromium, type Browser, type Page } from "playwright";
import * as cheerio from "cheerio";
import type {
  Race,
  RaceEntry,
  Jockey,
  SeasonStats,
  CourseStats,
} from "../types/index.js";
import { DEFAULT_SCRAPER_CONFIG } from "../types/index.js";
import { sleep } from "../utils/index.js";

const JOCKEY_PROFILE_URL =
  "https://racing.hkjc.com/en-us/local/information/jockeyprofile?jockeyid=";

interface JockeyData {
  code: string;
  name: string;
  nationality?: string;
  seasonStats: SeasonStats;
  courseStats: CourseStats[];
}

export interface JockeyEnricherOptions {
  /** Directory for jockey JSON files. Default: data/jockeys */
  dataDir?: string;
  /** If true, fetch missing jockeys from HKJC jockeyprofile page. Default: true when no file data. */
  fetchFromHKJC?: boolean;
}

export class JockeyEnricher {
  private cache = new Map<string, JockeyData>();
  private dataDir: string;
  private fetchFromHKJC: boolean;
  private browser: Browser | null = null;
  private page: Page | null = null;
  private lastRequestTime = 0;

  constructor(options: JockeyEnricherOptions = {}) {
    this.dataDir = options.dataDir ?? join(process.cwd(), "data", "jockeys");
    this.fetchFromHKJC = options.fetchFromHKJC ?? true;
  }

  /**
   * Load jockey data from data/jockeys/*.json (jockey_stats_*.json or jockeys_all_*.json / jockeys_elite_*.json)
   */
  async loadFromDirectory(): Promise<void> {
    if (!existsSync(this.dataDir)) return;

    const files = await readdir(this.dataDir);
    const jsonFiles = files.filter(
      (f) =>
        f.endsWith(".json") &&
        (f.startsWith("jockey_stats_") ||
          f.startsWith("jockeys_all_") ||
          f.startsWith("jockeys_elite_") ||
          f.startsWith("jockeys_"))
    );

    for (const file of jsonFiles) {
      try {
        const raw = await readFile(join(this.dataDir, file), "utf-8");
        const data = JSON.parse(raw);

        if (Array.isArray(data)) {
          for (const j of data as any[]) {
            if (j.code && j.seasonStats) {
              this.cache.set(j.code.toUpperCase(), {
                code: j.code,
                name: j.name ?? "Unknown",
                nationality: j.nationality,
                seasonStats: j.seasonStats,
                courseStats: j.courseStats && j.courseStats.length > 0 ? j.courseStats : [],
              });
            }
          }
        } else if (data.jockeys && Array.isArray(data.jockeys)) {
          for (const j of data.jockeys as any[]) {
            if (!j.code) continue;
            const wins = j.wins ?? 0;
            const seconds = j.seconds ?? 0;
            const thirds = j.thirds ?? 0;
            const rides = j.totalRides ?? j.rides ?? 0;
            const winRate = rides > 0 ? (j.winPercent != null ? j.winPercent / 100 : wins / rides) : 0;
            const placeRate = rides > 0 ? (wins + seconds + thirds) / rides : 0;
            this.cache.set(j.code.toUpperCase(), {
              code: j.code,
              name: j.name ?? "Unknown",
              nationality: j.nationality,
              seasonStats: {
                wins,
                places: seconds + thirds,
                rides,
                winRate,
                placeRate,
                roi: 1,
              },
              courseStats: [],
            });
          }
        }
      } catch {
        continue;
      }
    }
  }

  async initBrowser(): Promise<void> {
    if (this.browser) return;
    this.browser = await chromium.launch({
      headless: DEFAULT_SCRAPER_CONFIG.headless,
    });
    this.page = await this.browser.newPage();
    await this.page.setViewportSize({ width: 1280, height: 800 });
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  /**
   * Fetch jockey profile from HKJC jockeyprofile page and parse season stats
   */
  async fetchProfileFromHKJC(code: string): Promise<JockeyData | null> {
    if (!this.page) await this.initBrowser();
    if (!this.page) return null;

    const minInterval = (60 / DEFAULT_SCRAPER_CONFIG.rateLimit) * 1000;
    const elapsed = Date.now() - this.lastRequestTime;
    if (elapsed < minInterval) await sleep(minInterval - elapsed);

    const url = `${DEFAULT_SCRAPER_CONFIG.baseUrl}/en-us/local/information/jockeyprofile?jockeyid=${encodeURIComponent(code)}`;
    try {
      await this.page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: DEFAULT_SCRAPER_CONFIG.timeout,
      });
      await sleep(1500);
      this.lastRequestTime = Date.now();
      const content = await this.page.content();
      return this.parseProfilePage(content, code);
    } catch {
      return null;
    }
  }

  /**
   * Parse HKJC jockey profile HTML for 25/26 season table (No. of Wins, Total Rides, Win %, etc.)
   */
  private parseProfilePage(html: string, code: string): JockeyData | null {
    const $ = cheerio.load(html);
    const text = $("body").text();

    const winsMatch = text.match(/No\.?\s*of\s*Wins?[:\s]+(\d+)/i);
    const ridesMatch = text.match(/Total\s*Rides?[:\s]+(\d+)/i);
    const winPctMatch = text.match(/Win\s*%[:\s]+([\d.]+)/i);
    const secondsMatch = text.match(/No\.?\s*of\s*2nds?[:\s]+(\d+)/i);
    const thirdsMatch = text.match(/No\.?\s*of\s*3rds?[:\s]+(\d+)/i);

    const wins = winsMatch ? parseInt(winsMatch[1]!, 10) : 0;
    const rides = ridesMatch ? parseInt(ridesMatch[1]!, 10) : 0;
    const seconds = secondsMatch ? parseInt(secondsMatch[1]!, 10) : 0;
    const thirds = thirdsMatch ? parseInt(thirdsMatch[1]!, 10) : 0;

    if (rides === 0 && wins === 0) return null;

    const winRate = winPctMatch ? parseFloat(winPctMatch[1]!) / 100 : (rides > 0 ? wins / rides : 0);
    const places = seconds + thirds;
    const placeRate = rides > 0 ? (wins + places) / rides : 0;

    const name = this.parseJockeyNameFromProfile($, code);
    const nationalityMatch = text.match(/Nationality\s*[:\s]+([A-Z]{2,3})/i);
    const nationality = nationalityMatch?.[1]?.toUpperCase();

    const result: JockeyData = {
      code,
      name,
      seasonStats: {
        wins,
        places,
        rides,
        winRate,
        placeRate,
        roi: 1,
      },
      courseStats: [],
    };
    if (nationality) result.nationality = nationality;
    return result;
  }

  /**
   * Extract jockey name from the profile page HTML.
   * Tries: heading selectors, the self-link matching jockeyid, then fallback regex.
   */
  private parseJockeyNameFromProfile($: cheerio.CheerioAPI, code: string): string {
    for (const selector of [".jockey-name", ".profile-name", "h1", ".title"]) {
      const t = $(selector).first().text().trim();
      if (t.length >= 3 && t.length < 50) return t;
    }

    // The profile page lists "Other Jockeys" links including the current one;
    // find the <a> whose href contains this jockey's code
    const selfLink = $(`a[href*="jockeyid=${code}" i]`).first().text().trim();
    if (selfLink.length >= 3 && selfLink.length < 50) return selfLink;

    // Broader: find links to jockeyprofile matching the code
    let foundName = "";
    $("a").each((_, el) => {
      if (foundName) return;
      const href = $(el).attr("href") || "";
      if (href.toLowerCase().includes(`jockeyid=${code.toLowerCase()}`)) {
        const t = $(el).text().trim();
        if (t.length >= 3 && t.length < 50) foundName = t;
      }
    });
    if (foundName) return foundName;

    return "Unknown";
  }

  /**
   * Enrich a race: replace each entry's jockey with one that has real seasonStats (and courseStats if available)
   */
  async enrichRace(race: Race): Promise<Race> {
    const uniqueCodes = new Set<string>();
    for (const e of race.entries) {
      const c = e.jockey.code?.trim().toUpperCase();
      if (c) uniqueCodes.add(c);
    }

    for (const code of uniqueCodes) {
      if (this.cache.has(code)) continue;
      if (!this.fetchFromHKJC) continue;
      const data = await this.fetchProfileFromHKJC(code);
      if (data) this.cache.set(code, data);
    }

    const enrichedEntries: RaceEntry[] = race.entries.map((entry) => {
      const code = entry.jockey.code?.trim().toUpperCase();
      const data = code ? this.cache.get(code) : null;
      if (!data) return entry;

      const enrichedJockey: Jockey = {
        ...entry.jockey,
        name: entry.jockey.name || data.name,
        nationality: data.nationality ?? entry.jockey.nationality,
        seasonStats: data.seasonStats,
        courseStats: (data.courseStats.length > 0 ? data.courseStats : entry.jockey.courseStats) as readonly CourseStats[],
      };
      return { ...entry, jockey: enrichedJockey };
    });

    return { ...race, entries: enrichedEntries };
  }

  getCachedCount(): number {
    return this.cache.size;
  }
}
