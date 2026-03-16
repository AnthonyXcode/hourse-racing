/**
 * TrainerEnricher – enriches race entries with trainer season stats
 * so FormAnalyzer/MC can use real trainer form. Data from:
 * 1) Loaded files: data/trainers/trainer_stats_*.json (optional, for offline use)
 * 2) Live scrape: https://racing.hkjc.com/en-us/local/information/trainerprofile?trainerid={code}
 */

import { readdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { chromium, type Browser, type Page } from "playwright";
import * as cheerio from "cheerio";
import type {
  Race,
  RaceEntry,
  Trainer,
  SeasonStats,
  CourseStats,
} from "../types/index.js";
import { DEFAULT_SCRAPER_CONFIG } from "../types/index.js";
import { sleep } from "../utils/index.js";

interface TrainerData {
  code: string;
  name: string;
  seasonStats: SeasonStats;
  courseStats: CourseStats[];
}

export interface TrainerEnricherOptions {
  /** Directory for trainer JSON files. Default: data/trainers */
  dataDir?: string;
  /** If true, fetch missing trainers from HKJC trainerprofile page. Default: true */
  fetchFromHKJC?: boolean;
}

export class TrainerEnricher {
  private cache = new Map<string, TrainerData>();
  private dataDir: string;
  private fetchFromHKJC: boolean;
  private browser: Browser | null = null;
  private page: Page | null = null;
  private lastRequestTime = 0;

  constructor(options: TrainerEnricherOptions = {}) {
    this.dataDir = options.dataDir ?? join(process.cwd(), "data", "trainers");
    this.fetchFromHKJC = options.fetchFromHKJC ?? true;
  }

  /**
   * Load trainer data from data/trainers/*.json (optional, for offline/cached data)
   */
  async loadFromDirectory(): Promise<void> {
    if (!existsSync(this.dataDir)) return;

    const files = await readdir(this.dataDir);
    const jsonFiles = files.filter(
      (f) => f.endsWith(".json") && f.startsWith("trainer")
    );

    for (const file of jsonFiles) {
      try {
        const raw = await readFile(join(this.dataDir, file), "utf-8");
        const data = JSON.parse(raw);

        if (Array.isArray(data)) {
          for (const t of data as any[]) {
            if (t.code && t.seasonStats) {
              this.cache.set(t.code.toUpperCase(), {
                code: t.code,
                name: t.name ?? "Unknown",
                seasonStats: t.seasonStats,
                courseStats: t.courseStats?.length > 0 ? t.courseStats : [],
              });
            }
          }
        } else if (data.trainers && Array.isArray(data.trainers)) {
          for (const t of data.trainers as any[]) {
            if (!t.code) continue;
            const wins = t.wins ?? 0;
            const seconds = t.seconds ?? 0;
            const thirds = t.thirds ?? 0;
            const runners = t.totalRunners ?? t.runners ?? t.rides ?? 0;
            const winRate = runners > 0
              ? (t.winPercent != null ? t.winPercent / 100 : wins / runners)
              : 0;
            const placeRate = runners > 0 ? (wins + seconds + thirds) / runners : 0;
            this.cache.set(t.code.toUpperCase(), {
              code: t.code,
              name: t.name ?? "Unknown",
              seasonStats: {
                wins,
                places: seconds + thirds,
                rides: runners,
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
   * Fetch trainer profile from HKJC trainerprofile page and parse season stats.
   * URL: https://racing.hkjc.com/en-us/local/information/trainerprofile?trainerid={code}
   */
  async fetchProfileFromHKJC(code: string): Promise<TrainerData | null> {
    if (!this.page) await this.initBrowser();
    if (!this.page) return null;

    const minInterval = (60 / DEFAULT_SCRAPER_CONFIG.rateLimit) * 1000;
    const elapsed = Date.now() - this.lastRequestTime;
    if (elapsed < minInterval) await sleep(minInterval - elapsed);

    const url = `${DEFAULT_SCRAPER_CONFIG.baseUrl}/en-us/local/information/trainerprofile?trainerid=${encodeURIComponent(code)}`;
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
   * Parse HKJC trainer profile HTML for season stats.
   * Trainer page uses "Total Runners" instead of jockey's "Total Rides".
   */
  private parseProfilePage(html: string, code: string): TrainerData | null {
    const $ = cheerio.load(html);
    const text = $("body").text();

    const winsMatch = text.match(/No\.?\s*of\s*Wins?[:\s]+(\d+)/i);
    const runnersMatch = text.match(/Total\s*Runners?[:\s]+(\d+)/i);
    const winPctMatch = text.match(/Win\s*%[:\s]+([\d.]+)/i);
    const secondsMatch = text.match(/No\.?\s*of\s*2nds?[:\s]+(\d+)/i);
    const thirdsMatch = text.match(/No\.?\s*of\s*3rds?[:\s]+(\d+)/i);

    const wins = winsMatch ? parseInt(winsMatch[1]!, 10) : 0;
    const runners = runnersMatch ? parseInt(runnersMatch[1]!, 10) : 0;
    const seconds = secondsMatch ? parseInt(secondsMatch[1]!, 10) : 0;
    const thirds = thirdsMatch ? parseInt(thirdsMatch[1]!, 10) : 0;

    if (runners === 0 && wins === 0) return null;

    const winRate = winPctMatch
      ? parseFloat(winPctMatch[1]!) / 100
      : (runners > 0 ? wins / runners : 0);
    const places = seconds + thirds;
    const placeRate = runners > 0 ? (wins + places) / runners : 0;

    const name = this.parseTrainerNameFromProfile($, code);

    return {
      code,
      name,
      seasonStats: {
        wins,
        places,
        rides: runners,
        winRate,
        placeRate,
        roi: 1,
      },
      courseStats: [],
    };
  }

  /**
   * Extract trainer name from the profile page HTML.
   * Tries heading selectors, then the self-link matching trainerid.
   */
  private parseTrainerNameFromProfile($: cheerio.CheerioAPI, code: string): string {
    for (const selector of [".trainer-name", ".profile-name", "h1", ".title"]) {
      const t = $(selector).first().text().trim();
      if (t.length >= 3 && t.length < 50) return t;
    }

    const selfLink = $(`a[href*="trainerid=${code}" i]`).first().text().trim();
    if (selfLink.length >= 3 && selfLink.length < 50) return selfLink;

    let foundName = "";
    $("a").each((_, el) => {
      if (foundName) return;
      const href = $(el).attr("href") || "";
      if (href.toLowerCase().includes(`trainerid=${code.toLowerCase()}`)) {
        const t = $(el).text().trim();
        if (t.length >= 3 && t.length < 50) foundName = t;
      }
    });
    if (foundName) return foundName;

    return "Unknown";
  }

  /**
   * Enrich a race: update each entry's trainer with real seasonStats from HKJC profile.
   * Preserves the original trainer name from the race card.
   */
  async enrichRace(race: Race): Promise<Race> {
    const uniqueCodes = new Set<string>();
    for (const e of race.entries) {
      const c = e.trainer.code?.trim().toUpperCase();
      if (c) uniqueCodes.add(c);
    }

    for (const code of uniqueCodes) {
      if (this.cache.has(code)) continue;
      if (!this.fetchFromHKJC) continue;
      const data = await this.fetchProfileFromHKJC(code);
      if (data) this.cache.set(code, data);
    }

    const enrichedEntries: RaceEntry[] = race.entries.map((entry) => {
      const code = entry.trainer.code?.trim().toUpperCase();
      const data = code ? this.cache.get(code) : null;
      if (!data) return entry;

      const enrichedTrainer: Trainer = {
        ...entry.trainer,
        name: entry.trainer.name || data.name,
        seasonStats: data.seasonStats,
        courseStats: (data.courseStats.length > 0 ? data.courseStats : entry.trainer.courseStats) as readonly CourseStats[],
      };
      return { ...entry, trainer: enrichedTrainer };
    });

    return { ...race, entries: enrichedEntries };
  }

  getCachedCount(): number {
    return this.cache.size;
  }
}
