/// <reference lib="dom" />
/**
 * SCMP Trainer Profile Scraper
 *
 * Fetches season stats from an SCMP trainer profile page.
 * Profile URL pattern: https://www.scmp.com/sport/racing/stats/trainer/{id}/{slug}
 */
import type { Page } from "playwright";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScmpTrainerStats {
  name: string;
  url: string;
  nationality: string;
  seasonWins: number;
  seasonRuns: number;
  winPct: number;
  seconds: number;
  thirds: number;
  placePct: number;
  totalStakes: string;
  winStakes: string;
  profitLoss: string;
  /** Number of all-weather wins this season */
  awtWins: number;
  awtSeconds: number;
  awtThirds: number;
  awtRuns: number;
}

// ---------------------------------------------------------------------------
// Helpers (run in Node context, not browser)
// ---------------------------------------------------------------------------

function extractNum(body: string, label: string): number {
  const re = new RegExp(label + ":\\s*([\\d,.]+)");
  const m = body.match(re);
  return m ? parseFloat(m[1]!.replace(/,/g, "")) : 0;
}

function extractStr(body: string, label: string): string {
  const re = new RegExp(label + ":\\s*([^\\n]+)");
  const m = body.match(re);
  return m ? m[1]!.trim() : "";
}

// ---------------------------------------------------------------------------
// Scrape
// ---------------------------------------------------------------------------

/**
 * Scrape season stats from an SCMP trainer profile page.
 * If the page is not already on the profile URL, navigate to it first.
 */
export async function scrapeScmpTrainer(
  page: Page,
  profileUrl?: string,
): Promise<ScmpTrainerStats> {
  if (profileUrl) {
    await page.goto(profileUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForTimeout(2000);
  }

  const url = page.url();
  const name = await page.textContent("h1") ?? "";
  const body = await page.textContent("body") ?? "";

  const natMatch = body.match(/Nationality:\s*([^\n]+)/);
  const nationality = natMatch ? natMatch[1]!.trim() : "";

  return {
    name: name.trim(),
    url,
    nationality,
    seasonWins: extractNum(body, "No of wins for season"),
    seasonRuns: extractNum(body, "No of runs for season"),
    winPct: extractNum(body, "Win %"),
    seconds: extractNum(body, "No of 2nds"),
    thirds: extractNum(body, "No of 3rds"),
    placePct: extractNum(body, "Percentage for season"),
    totalStakes: extractStr(body, "Total stakes"),
    winStakes: extractStr(body, "Win stakes"),
    profitLoss: extractStr(body, "Profit/Loss"),
    awtWins: extractNum(body, "No of wins for all weather"),
    awtSeconds: extractNum(body, "No of 2nds for all weather"),
    awtThirds: extractNum(body, "No of 3rds for all weather"),
    awtRuns: extractNum(body, "All weather"),
  };
}
