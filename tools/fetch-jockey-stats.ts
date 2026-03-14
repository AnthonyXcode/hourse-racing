#!/usr/bin/env tsx
/**
 * Fetch current jockey statistics from HKJC
 * 
 * Usage:
 *   npx tsx tools/fetch-jockey-stats.ts
 *   npx tsx tools/fetch-jockey-stats.ts --date=YYYY-MM-DD
 *   npx tsx tools/fetch-jockey-stats.ts --json
 *   npx tsx tools/fetch-jockey-stats.ts --top=10
 *   npx tsx tools/fetch-jockey-stats.ts --add=ABC,XYZ  # Add new jockey codes
 * 
 * --date=YYYY-MM-DD  Use this racing date to find jockeys from race cards (and for output filename).
 *                    Default: today. Example: --date=2026-03-11
 */

import { chromium, Browser, Page } from "playwright";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

interface JockeyBasic {
  code: string;
  name: string;
}

interface JockeyStats {
  code: string;
  name: string;
  nationality: string;
  wins: number;
  seconds: number;
  thirds: number;
  fourths: number;
  totalRides: number;
  winPercent: number;
  stakesWon: number;
  winsLast10Days: number;
  fetchedAt: string;
}

interface JockeyRanking {
  jockeys: JockeyStats[];
  season: string;
  fetchedAt: string;
}

// Comprehensive list of known HKJC jockey codes
// Updated from: https://racing.hkjc.com/en-us/local/info/jockey-ranking
const KNOWN_JOCKEY_CODES: JockeyBasic[] = [
  // Elite & Top Tier
  { code: "PZ", name: "Z Purton" },
  { code: "MOJ", name: "J Moreira" },
  { code: "MCJ", name: "J McDonald" },
  { code: "BH", name: "H Bowman" },
  // Strong Tier
  { code: "GM", name: "M Guyon" },
  { code: "TEK", name: "K Teetan" },
  { code: "BA", name: "A Badel" },
  { code: "HEL", name: "L Hewitson" },
  { code: "FEL", name: "L Ferraris" },
  { code: "AA", name: "A Atzeni" },
  // Regular
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
];

/**
 * Fetch the list of active jockeys from race cards of recent meetings
 * This is more reliable than the profile/ranking pages
 * @param raceDate If set, use this date as the reference (and look back from it); otherwise use today
 */
async function fetchJockeyList(page: Page, raceDate?: Date): Promise<JockeyBasic[]> {
  console.log("Fetching jockey list from recent race cards...");
  
  // Try to get jockeys from a recent race card
  const referenceDate = raceDate ? new Date(raceDate) : new Date();
  const venues = ["ST", "HV"];
  const foundJockeys = new Map<string, string>();
  
  // Check last few days for race meetings (relative to referenceDate)
  for (let dayOffset = 0; dayOffset < 7 && foundJockeys.size < 5; dayOffset++) {
    const date = new Date(referenceDate);
    date.setDate(date.getDate() - dayOffset);
    const dateStr = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
    const sizeBeforeDay = foundJockeys.size;

    venueLoop: for (const venue of venues) {
      for (let raceNo = 1; raceNo <= 11; raceNo++) {
        try {
          const url = `https://racing.hkjc.com/en-us/local/information/racecard?raceDate=${dateStr}&Racecourse=${venue}&RaceNo=${raceNo}`;
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
          await page.waitForTimeout(1500);

          const jockeys = await page.evaluate(() => {
            const results: { code: string; name: string }[] = [];
            // HKJC may use JockeyId= or jockeyid= (case varies); match any <a> with jockey id in href
            const links = document.querySelectorAll('a[href*="jockey"]');
            links.forEach((link: { getAttribute: (a: string) => string | null; textContent: string | null }) => {
              const href = link.getAttribute("href") || "";
              const codeMatch = href.match(/jockeyid[=\/]([^&\/]+)/i);
              const name = (link.textContent || "").trim();
              if (codeMatch && codeMatch[1] && name.length > 1) {
                results.push({ code: codeMatch[1].toUpperCase(), name });
              }
            });
            return results;
          });
          
          jockeys.forEach(j => {
            if (!foundJockeys.has(j.code)) {
              foundJockeys.set(j.code, j.name);
            }
          });
          
          if (foundJockeys.size >= 10) break venueLoop;
        } catch (error) {
          console.log(`  [WARNING] Failed to fetch race card for ${dateStr} ${venue} R${raceNo}: ${error instanceof Error ? error.message : error}`);
        }
      }
    }
    // If we had a specific race date and this day yielded no new jockeys, skip remaining days (e.g. future date or no meeting)
    if (raceDate && dayOffset === 0 && foundJockeys.size === sizeBeforeDay) {
      console.log(`  No jockeys found for ${dateStr}; using known jockey list for stats.\n`);
      break;
    }
  }
  
  if (foundJockeys.size === 0) {
    throw new Error(
      "Could not find any jockeys from race cards. Check date/venue and HKJC availability, or try without --date."
    );
  }
  
  // Merge with known jockeys to ensure comprehensive list
  const result: JockeyBasic[] = [];
  
  // Add scraped jockeys first
  foundJockeys.forEach((name, code) => {
    result.push({ code, name });
  });
  
  // Add known jockeys that weren't scraped
  KNOWN_JOCKEY_CODES.forEach(j => {
    if (!foundJockeys.has(j.code)) {
      result.push(j);
    }
  });
  
  console.log(`Found ${result.length} jockeys (${foundJockeys.size} from race cards, ${result.length - foundJockeys.size} from known list)\n`);
  return result;
}

async function fetchJockeyStats(
  page: Page,
  jockeyCode: string
): Promise<JockeyStats | null> {
  const url = `https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId=${jockeyCode}`;

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2000);

    const stats = await page.evaluate(() => {
      const text = document.body.innerText;

      // Extract name from page title area
      const nameMatch = text.match(/([A-Z][a-z]+ [A-Z][a-z]+|[A-Z] [A-Z][a-z]+)\s*Profile/i) ||
                        text.match(/Performance - ([A-Z] [A-Za-z]+)/);
      
      // Extract nationality
      const nationalityMatch = text.match(/Nationality\s*:\s*(\w+)/);
      
      // Extract wins
      const winsMatch = text.match(/No\. of Wins\s*:\s*(\d+)/);
      
      // Extract 2nds
      const secondsMatch = text.match(/No\. of 2nds\s*:\s*(\d+)/);
      
      // Extract 3rds
      const thirdsMatch = text.match(/No\. of 3rds\s*:\s*(\d+)/);
      
      // Extract 4ths
      const fourthsMatch = text.match(/No\. of 4ths\s*:\s*(\d+)/);
      
      // Extract total rides
      const ridesMatch = text.match(/Total Rides\s*:\s*(\d+)/);
      
      // Extract win %
      const winPercentMatch = text.match(/Win %\s*:\s*([\d.]+)%/);
      
      // Extract stakes won
      const stakesMatch = text.match(/Stakes won\s*:\s*\$\s*([\d,]+)/);
      
      // Extract wins in last 10 days
      const last10Match = text.match(/No\. of Wins in past 10 race days\s*:\s*(\d+)/);

      if (!winsMatch || !ridesMatch) {
        return null;
      }

      const warnings: string[] = [];
      if (!nameMatch) warnings.push("name");
      if (!nationalityMatch) warnings.push("nationality");
      if (!secondsMatch) warnings.push("seconds");
      if (!thirdsMatch) warnings.push("thirds");
      if (!fourthsMatch) warnings.push("fourths");
      if (!winPercentMatch) warnings.push("winPercent");
      if (!stakesMatch) warnings.push("stakesWon");
      if (!last10Match) warnings.push("winsLast10Days");

      return {
        name: nameMatch ? nameMatch[1].trim() : "Unknown",
        nationality: nationalityMatch ? nationalityMatch[1] : "Unknown",
        wins: parseInt(winsMatch[1], 10),
        seconds: secondsMatch ? parseInt(secondsMatch[1], 10) : 0,
        thirds: thirdsMatch ? parseInt(thirdsMatch[1], 10) : 0,
        fourths: fourthsMatch ? parseInt(fourthsMatch[1], 10) : 0,
        totalRides: parseInt(ridesMatch[1], 10),
        winPercent: winPercentMatch ? parseFloat(winPercentMatch[1]) : 0,
        stakesWon: stakesMatch ? parseInt(stakesMatch[1].replace(/,/g, ""), 10) : 0,
        winsLast10Days: last10Match ? parseInt(last10Match[1], 10) : 0,
        _warnings: warnings.length > 0 ? warnings : undefined,
      };
    });

    if (!stats) return null;

    return {
      code: jockeyCode,
      ...stats,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`  Error fetching ${jockeyCode}:`, error);
    return null;
  }
}

async function fetchAllJockeyStats(raceDate?: Date): Promise<JockeyRanking> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const jockeys: JockeyStats[] = [];

  try {
    // First, fetch the list of active jockeys from the ranking page
    const jockeyList = await fetchJockeyList(page, raceDate);
    
    if (jockeyList.length === 0) {
      console.log("[WARNING] Could not scrape any jockeys from recent race cards. Using known jockey list as fallback.");
      console.log("[WARNING] This means stats may include inactive jockeys. Verify results against HKJC ranking page.");
      jockeyList.push(...KNOWN_JOCKEY_CODES);
    }
    
    // Fetch detailed stats for each jockey
    for (const jockey of jockeyList) {
      console.log(`Fetching ${jockey.code} (${jockey.name || "Unknown"})...`);
      const stats = await fetchJockeyStats(page, jockey.code);
      if (stats && stats.totalRides > 0) {
        // Use name from ranking if individual page didn't have it
        if (stats.name === "Unknown" && jockey.name) {
          stats.name = jockey.name;
        }
        // Log warnings for fields that fell back to defaults
        const w = (stats as any)._warnings as string[] | undefined;
        if (w && w.length > 0) {
          console.log(`  [WARNING] ${jockey.code}: defaulted fields: ${w.join(", ")}`);
        }
        delete (stats as any)._warnings;
        jockeys.push(stats);
      } else if (stats === null) {
        console.log(`  [WARNING] ${jockey.code}: Failed to parse stats page — skipping`);
      }
    }
  } finally {
    await browser.close();
  }

  // Sort by win percentage descending
  jockeys.sort((a, b) => b.winPercent - a.winPercent);

  return {
    jockeys,
    season: "25/26",
    fetchedAt: new Date().toISOString(),
  };
}

function formatTable(ranking: JockeyRanking, topN?: number): string {
  const lines: string[] = [];
  const jockeys = topN ? ranking.jockeys.slice(0, topN) : ranking.jockeys;

  lines.push("═".repeat(85));
  lines.push(`ELITE JOCKEY STATISTICS - ${ranking.season} Season`);
  lines.push(`Fetched: ${new Date(ranking.fetchedAt).toLocaleString()}`);
  lines.push("═".repeat(85));
  lines.push("");
  lines.push(
    "Rank | Code | Name              | Wins | Rides | Win %  | Last 10 | Stakes Won"
  );
  lines.push("─".repeat(85));

  jockeys.forEach((j, i) => {
    const rank = (i + 1).toString().padStart(4);
    const code = j.code.padEnd(4);
    const name = j.name.substring(0, 17).padEnd(17);
    const wins = j.wins.toString().padStart(4);
    const rides = j.totalRides.toString().padStart(5);
    const winPct = j.winPercent.toFixed(2).padStart(6) + "%";
    const last10 = j.winsLast10Days.toString().padStart(7);
    const stakes = `$${(j.stakesWon / 1000000).toFixed(1)}M`.padStart(11);

    lines.push(
      `${rank} | ${code} | ${name} | ${wins} | ${rides} | ${winPct} | ${last10} | ${stakes}`
    );
  });

  lines.push("");
  lines.push("═".repeat(85));
  lines.push("");
  lines.push("ELITE TIER (Win % > 15%):");
  const elite = jockeys.filter((j) => j.winPercent > 15);
  elite.forEach((j) => {
    lines.push(`  ⭐ ${j.code} ${j.name} - ${j.winPercent.toFixed(2)}%`);
  });

  lines.push("");
  lines.push("STRONG TIER (Win % 10-15%):");
  const strong = jockeys.filter((j) => j.winPercent >= 10 && j.winPercent <= 15);
  strong.forEach((j) => {
    lines.push(`  ✓ ${j.code} ${j.name} - ${j.winPercent.toFixed(2)}%`);
  });

  lines.push("");
  lines.push("─".repeat(85));
  lines.push("Source: https://racing.hkjc.com/en-us/local/info/jockey-ranking");
  lines.push("═".repeat(85));

  return lines.join("\n");
}

function generateMarkdownTable(ranking: JockeyRanking): string {
  const lines: string[] = [];

  lines.push("## Elite Jockey Statistics");
  lines.push("");
  lines.push(`*Data fetched: ${new Date(ranking.fetchedAt).toLocaleString()}*`);
  lines.push("");
  lines.push("### Current Season Win Rates");
  lines.push("");
  lines.push("| Rank | Jockey | Code | Wins | Rides | Win % | Tier |");
  lines.push("|------|--------|------|------|-------|-------|------|");

  ranking.jockeys.forEach((j, i) => {
    let tier = "-";
    if (j.winPercent > 20) tier = "⭐⭐⭐ Elite";
    else if (j.winPercent > 15) tier = "⭐⭐ Strong";
    else if (j.winPercent >= 10) tier = "⭐ Good";

    lines.push(
      `| ${i + 1} | ${j.name} | ${j.code} | ${j.wins} | ${j.totalRides} | ${j.winPercent.toFixed(2)}% | ${tier} |`
    );
  });

  lines.push("");
  lines.push("### Rating Boosts (for model)");
  lines.push("");
  lines.push("| Win % Range | Rating Boost | Priority |");
  lines.push("|-------------|--------------|----------|");
  lines.push("| > 20% | +10 | ⭐⭐⭐ Elite |");
  lines.push("| 15-20% | +7 | ⭐⭐ Strong |");
  lines.push("| 10-15% | +4 | ⭐ Good |");
  lines.push("| < 10% | 0 | - |");
  lines.push("");
  lines.push("### Data Source");
  lines.push("");
  lines.push("```bash");
  lines.push("# Fetch latest jockey stats");
  lines.push("npx tsx tools/fetch-jockey-stats.ts");
  lines.push("```");
  lines.push("");
  lines.push("URL: `https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId={code}`");

  return lines.join("\n");
}

async function main() {
  const jsonOutput = process.argv.includes("--json");
  const topArg = process.argv.find((a) => a.startsWith("--top="));
  const topN = topArg ? parseInt(topArg.split("=")[1] || "0", 10) : undefined;
  
  // Parse optional --date=YYYY-MM-DD (racing date for race-card lookup and output filename)
  const dateArg = process.argv.find((a) => a.startsWith("--date="));
  let raceDate: Date | undefined;
  if (dateArg) {
    const dateStr = dateArg.split("=")[1]?.trim() || "";
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match && match[1] && match[2] && match[3]) {
      const y = parseInt(match[1], 10);
      const m = parseInt(match[2], 10) - 1;
      const d = parseInt(match[3], 10);
      const d2 = new Date(y, m, d);
      if (d2.getFullYear() === y && d2.getMonth() === m && d2.getDate() === d) {
        raceDate = d2;
        console.log(`Using racing date: ${dateStr}\n`);
      }
    }
    if (!raceDate) {
      console.error("Invalid --date. Use YYYY-MM-DD (e.g. --date=2026-03-11)");
      process.exit(1);
    }
  }
  
  // Handle --add flag for adding new jockey codes
  const addArg = process.argv.find((a) => a.startsWith("--add="));
  if (addArg) {
    const codesStr = addArg.split("=")[1] || "";
    const newCodes = codesStr.split(",").map(c => c.trim().toUpperCase()).filter(c => c);
    console.log(`\nTo add new jockey codes, update KNOWN_JOCKEY_CODES in fetch-jockey-stats.ts:`);
    console.log("Add these entries:\n");
    newCodes.forEach(code => {
      console.log(`  { code: "${code}", name: "" },`);
    });
    console.log("\nThen run the script again to fetch their stats.\n");
    return;
  }

  console.log("\nFetching jockey statistics from HKJC...\n");

  try {
    const ranking = await fetchAllJockeyStats(raceDate);

    if (jsonOutput) {
      console.log(JSON.stringify(ranking, null, 2));
    } else {
      console.log(formatTable(ranking, topN));
    }

    // Always save to file for reference
    const dir = "data/jockeys";
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    const fileDate = raceDate ?? new Date();
    const dateStr = fileDate.toISOString().split("T")[0] || "";
    const date = dateStr.replace(/-/g, "");
    const filename = `${dir}/jockey_stats_${date}.json`;
    await writeFile(filename, JSON.stringify(ranking, null, 2));
    console.log(`\nSaved to: ${filename}`);

    // Generate markdown for skills
    const mdFilename = `${dir}/JOCKEY_STATS.md`;
    await writeFile(mdFilename, generateMarkdownTable(ranking));
    console.log(`Markdown saved to: ${mdFilename}`);

  } catch (error) {
    console.error(
      "\nError fetching jockey stats:",
      error instanceof Error ? error.message : error
    );
    console.error("\nTroubleshooting:");
    console.error("  1. Check internet connection");
    console.error("  2. Run: npx playwright install chromium");
    process.exit(1);
  }
}

main();
