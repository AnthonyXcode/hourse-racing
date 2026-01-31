#!/usr/bin/env tsx
/**
 * Fetch current win/place odds for HKJC races
 * 
 * Usage:
 *   npx tsx tools/fetch-odds.ts --date=2026-02-01 --venue=ST
 *   npx tsx tools/fetch-odds.ts --date=2026-02-01 --venue=ST --race=8
 *   npx tsx tools/fetch-odds.ts --date=2026-02-01 --venue=ST --json
 */

import { chromium, Browser, Page } from "playwright";
import { format, parse } from "date-fns";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

interface HorseOdds {
  horseNumber: number;
  horseName: string;
  jockey: string;
  trainer: string;
  winOdds: number;
  placeOdds: number;
}

interface RaceOdds {
  raceNumber: number;
  date: string;
  venue: string;
  horses: HorseOdds[];
  fetchedAt: string;
}

interface MeetingOdds {
  date: string;
  venue: string;
  races: RaceOdds[];
  fetchedAt: string;
}

async function fetchRaceOdds(
  page: Page,
  date: string,
  venue: string,
  raceNumber: number
): Promise<RaceOdds> {
  const dateFormatted = date.replace(/-/g, "-");
  const url = `https://bet.hkjc.com/en/racing/wp/${dateFormatted}/${venue}/${raceNumber}`;

  await page.goto(url, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  // Wait for odds to load
  await page.waitForTimeout(3000);

  // Extract odds data (runs in browser context)
  const horses = await page.evaluate(() => {
    const results: {
      horseNumber: number;
      horseName: string;
      jockey: string;
      trainer: string;
      winOdds: number;
      placeOdds: number;
    }[] = [];

    // Find all runner rows - try multiple selectors
    const rows = document.querySelectorAll(
      '[class*="runner"], [class*="horse"], tr, [class*="row"]'
    );

    rows.forEach((row: Element) => {
      const text = row.textContent?.trim().replace(/\s+/g, " ");
      if (!text || !text.match(/^\d+[A-Z]/) || !text.match(/\d\.\d/)) return;

      // Parse format: "1SAGACIOUS LIFE13126Z PurtonP C Ng3.62.3"
      // Number + Name + Draw + Weight + Jockey + Trainer + WinOdds + PlaceOdds
      // Use a more specific pattern that captures odds at the end (X.X format)
      const numMatch = text.match(/^(\d+)/);
      const nameMatch = text.match(/^(\d+)([A-Z][A-Z\s']+)/);
      // Look for two decimal numbers at the end (win and place odds)
      const oddsMatch = text.match(/(\d+\.\d)\s*(\d+\.\d)\s*$/);

      if (numMatch && nameMatch && oddsMatch) {
        const horseNumber = parseInt(numMatch[1], 10);
        const horseName = nameMatch[2].trim();
        const winOdds = parseFloat(oddsMatch[1]);
        const placeOdds = parseFloat(oddsMatch[2]);

        // Extract jockey name (between weight and odds, typically after 126 or 133 etc)
        const jockeyMatch = text.match(/\d{3}([A-Z][a-z]+(?:\s[A-Z][a-z]*)*)/);
        const jockey = jockeyMatch ? jockeyMatch[1].trim() : "";

        // Only add if we haven't seen this horse number
        if (!results.find((r) => r.horseNumber === horseNumber)) {
          results.push({
            horseNumber,
            horseName,
            jockey,
            trainer: "",
            winOdds,
            placeOdds,
          });
        }
      }
    });

    return results;
  });

  return {
    raceNumber,
    date,
    venue,
    horses,
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchMeetingOdds(
  date: string,
  venue: string,
  specificRace?: number
): Promise<MeetingOdds> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const races: RaceOdds[] = [];
  const raceNumbers = specificRace ? [specificRace] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  try {
    for (const raceNo of raceNumbers) {
      try {
        console.log(`Fetching Race ${raceNo}...`);
        const raceOdds = await fetchRaceOdds(page, date, venue, raceNo);
        if (raceOdds.horses.length > 0) {
          races.push(raceOdds);
        }
      } catch (error) {
        console.log(`  Race ${raceNo}: No data or error`);
      }
    }
  } finally {
    await browser.close();
  }

  return {
    date,
    venue,
    races,
    fetchedAt: new Date().toISOString(),
  };
}

function formatOddsTable(odds: MeetingOdds): string {
  const lines: string[] = [];

  lines.push("═".repeat(70));
  lines.push(`CURRENT ODDS - ${odds.venue} | ${odds.date}`);
  lines.push(`Fetched: ${new Date(odds.fetchedAt).toLocaleString()}`);
  lines.push("═".repeat(70));

  for (const race of odds.races) {
    lines.push("");
    lines.push(`RACE ${race.raceNumber}`);
    lines.push("─".repeat(70));
    lines.push(
      " # | Horse                    | Jockey          | WIN   | PLACE | Status"
    );
    lines.push("─".repeat(70));

    // Sort by horse number
    const sorted = [...race.horses].sort(
      (a, b) => a.horseNumber - b.horseNumber
    );

    for (const horse of sorted) {
      const num = horse.horseNumber.toString().padStart(2);
      const name = horse.horseName.substring(0, 24).padEnd(24);
      const jockey = horse.jockey.substring(0, 15).padEnd(15);
      const win = horse.winOdds.toFixed(1).padStart(5);
      const place = horse.placeOdds.toFixed(1).padStart(5);

      // Status based on odds range
      let status = "";
      if (horse.winOdds >= 2.0 && horse.winOdds <= 7.0) {
        status = "✓ WIN";
      } else if (horse.winOdds >= 5.0 && horse.winOdds <= 15.0) {
        status = "✓ PLACE";
      } else {
        status = "-";
      }

      lines.push(`${num} | ${name} | ${jockey} | ${win} | ${place} | ${status}`);
    }
  }

  lines.push("");
  lines.push("═".repeat(70));
  lines.push("Status: ✓ WIN = odds 2.0-7.0, ✓ PLACE = odds 5.0-15.0");
  lines.push("═".repeat(70));

  return lines.join("\n");
}

function filterByOddsRange(
  odds: MeetingOdds,
  minWin: number = 2.0,
  maxWin: number = 7.0
): { race: number; horse: HorseOdds }[] {
  const selections: { race: number; horse: HorseOdds }[] = [];

  for (const race of odds.races) {
    for (const horse of race.horses) {
      if (horse.winOdds >= minWin && horse.winOdds <= maxWin) {
        selections.push({ race: race.raceNumber, horse });
      }
    }
  }

  return selections;
}

async function main() {
  // Parse arguments
  const dateArg =
    process.argv.find((a) => a.startsWith("--date="))?.split("=")[1] ||
    format(new Date(), "yyyy-MM-dd");
  const venueArg =
    process.argv.find((a) => a.startsWith("--venue="))?.split("=")[1] || "ST";
  const raceArg = process.argv.find((a) => a.startsWith("--race="))?.split("=")[1];
  const jsonOutput = process.argv.includes("--json");
  const saveFile = process.argv.includes("--save");

  console.log(`\nFetching odds for ${venueArg} on ${dateArg}...`);
  if (raceArg) {
    console.log(`Specific race: ${raceArg}`);
  }
  console.log("");

  try {
    const odds = await fetchMeetingOdds(
      dateArg,
      venueArg,
      raceArg ? parseInt(raceArg, 10) : undefined
    );

    if (jsonOutput) {
      console.log(JSON.stringify(odds, null, 2));
    } else {
      console.log(formatOddsTable(odds));

      // Show filtered selections
      console.log("\nSELECTIONS IN WIN RANGE (2.0-7.0):");
      console.log("─".repeat(50));
      const winSelections = filterByOddsRange(odds);
      if (winSelections.length === 0) {
        console.log("  No horses currently in WIN odds range");
      } else {
        for (const sel of winSelections) {
          console.log(
            `  R${sel.race} #${sel.horse.horseNumber} ${sel.horse.horseName.substring(0, 20)} @ ${sel.horse.winOdds.toFixed(1)}`
          );
        }
      }
    }

    // Save to file if requested
    if (saveFile) {
      const dir = "data/odds";
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      const filename = `${dir}/odds_${dateArg.replace(/-/g, "")}_${venueArg}.json`;
      await writeFile(filename, JSON.stringify(odds, null, 2));
      console.log(`\nSaved to: ${filename}`);
    }
  } catch (error) {
    console.error(
      "\nError fetching odds:",
      error instanceof Error ? error.message : error
    );
    console.error("\nTroubleshooting:");
    console.error("  1. Check internet connection");
    console.error("  2. Verify date is a race day");
    console.error("  3. Run: npx playwright install chromium");
    process.exit(1);
  }
}

main();
