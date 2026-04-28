/// <reference lib="dom" />
/**
 * SCMP Jockey Profile Scraper
 *
 * Fetches season stats from an SCMP jockey profile page.
 * Profile URL pattern: https://www.scmp.com/sport/racing/stats/jockey/{id}/{slug}
 */
import type { Page } from "playwright";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScmpJockeyStats {
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
  profitLoss: string;
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
 * Scrape season stats from an SCMP jockey profile page.
 * If the page is not already on the profile URL, navigate to it first.
 */
export async function scrapeScmpJockey(
  page: Page,
  profileUrl?: string,
): Promise<ScmpJockeyStats> {
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
    profitLoss: extractStr(body, "Profit/Loss"),
  };
}
