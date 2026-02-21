#!/usr/bin/env tsx
/**
 * Sync Historical Data
 *
 * Scrapes missing meeting results by comparing known HKJC fixtures
 * against existing files in data/historical/.
 *
 * Usage:
 *   npx tsx tools/sync-historical.ts                    # Sync all missing
 *   npx tsx tools/sync-historical.ts --dry-run          # Show what's missing
 *   npx tsx tools/sync-historical.ts --after=2026-02-01 # Only sync after date
 *
 * To add a new meeting date, edit data/historical/fixtures.json
 * or add it to the defaults in this file.
 */

import { parse, isBefore } from "date-fns";
import { readFile, writeFile, readdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "historical");
const FIXTURES_FILE = path.join(DATA_DIR, "fixtures.json");

interface Meeting {
  date: string;
  venue: "ST" | "HV";
}

interface FixtureStore {
  lastUpdated: string;
  season: string;
  meetings: Meeting[];
}

function parseCliArgs() {
  const args = process.argv.slice(2);
  let dryRun = false;
  let afterDate: Date | null = null;

  for (const arg of args) {
    if (arg === "--dry-run") dryRun = true;
    if (arg.startsWith("--after=")) {
      afterDate = parse(arg.split("=")[1]!, "yyyy-MM-dd", new Date());
    }
  }

  return { dryRun, afterDate };
}

async function loadFixtures(): Promise<FixtureStore> {
  try {
    const raw = await readFile(FIXTURES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    console.log("[INFO] No fixtures.json found. Creating from known schedule...\n");
    return createDefaultFixtures();
  }
}

function createDefaultFixtures(): FixtureStore {
  const meetings: Meeting[] = [
    { date: "2025-10-01", venue: "ST" },
    { date: "2025-10-04", venue: "ST" },
    { date: "2025-10-08", venue: "HV" },
    { date: "2025-10-12", venue: "ST" },
    { date: "2025-10-15", venue: "HV" },
    { date: "2025-10-19", venue: "ST" },
    { date: "2025-10-22", venue: "HV" },
    { date: "2025-10-26", venue: "ST" },
    { date: "2025-10-30", venue: "ST" },
    { date: "2025-11-02", venue: "HV" },
    { date: "2025-11-05", venue: "HV" },
    { date: "2025-11-09", venue: "ST" },
    { date: "2025-11-12", venue: "HV" },
    { date: "2025-11-15", venue: "ST" },
    { date: "2025-11-19", venue: "HV" },
    { date: "2025-11-23", venue: "ST" },
    { date: "2025-11-26", venue: "HV" },
    { date: "2025-11-30", venue: "ST" },
    { date: "2025-12-03", venue: "HV" },
    { date: "2025-12-07", venue: "ST" },
    { date: "2025-12-10", venue: "HV" },
    { date: "2025-12-14", venue: "ST" },
    { date: "2025-12-17", venue: "HV" },
    { date: "2025-12-20", venue: "ST" },
    { date: "2025-12-23", venue: "HV" },
    { date: "2025-12-27", venue: "ST" },
    { date: "2026-01-01", venue: "ST" },
    { date: "2026-01-04", venue: "ST" },
    { date: "2026-01-07", venue: "HV" },
    { date: "2026-01-11", venue: "ST" },
    { date: "2026-01-14", venue: "HV" },
    { date: "2026-01-18", venue: "ST" },
    { date: "2026-01-25", venue: "ST" },
    { date: "2026-01-28", venue: "HV" },
    { date: "2026-02-01", venue: "ST" },
    { date: "2026-02-04", venue: "HV" },
    { date: "2026-02-08", venue: "ST" },
    { date: "2026-02-11", venue: "HV" },
    { date: "2026-02-14", venue: "ST" },
    { date: "2026-02-19", venue: "ST" },
    { date: "2026-02-22", venue: "ST" },
    { date: "2026-02-25", venue: "HV" },
  ];

  return {
    lastUpdated: new Date().toISOString(),
    season: "2025-2026",
    meetings,
  };
}

function expectedFilename(meeting: Meeting): string {
  const dateStr = meeting.date.replace(/-/g, "");
  return `results_${dateStr}_${meeting.venue}.json`;
}

async function getExistingFiles(): Promise<Set<string>> {
  const files = await readdir(DATA_DIR);
  return new Set(files.filter((f) => f.startsWith("results_") && f.endsWith(".json")));
}

async function main() {
  const { dryRun, afterDate } = parseCliArgs();

  console.log("\n" + "=".repeat(60));
  console.log("HISTORICAL DATA SYNC");
  console.log("=".repeat(60) + "\n");

  const fixtures = await loadFixtures();
  const existingFiles = await getExistingFiles();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pastMeetings = fixtures.meetings.filter((m) => {
    const meetingDate = parse(m.date, "yyyy-MM-dd", new Date());
    if (!isBefore(meetingDate, today)) return false;
    if (afterDate && isBefore(meetingDate, afterDate)) return false;
    return true;
  });

  const missing: Meeting[] = [];
  const present: Meeting[] = [];

  for (const meeting of pastMeetings) {
    const filename = expectedFilename(meeting);
    if (existingFiles.has(filename)) {
      present.push(meeting);
    } else {
      missing.push(meeting);
    }
  }

  console.log(`Fixture list: ${fixtures.meetings.length} meetings (${fixtures.season})`);
  console.log(`Past meetings (before today): ${pastMeetings.length}`);
  console.log(`Already scraped: ${present.length}`);
  console.log(`Missing: ${missing.length}`);
  console.log("");

  if (missing.length === 0) {
    console.log("All historical data is up to date!\n");
    await writeFile(FIXTURES_FILE, JSON.stringify(fixtures, null, 2));
    return;
  }

  console.log("Missing meetings:");
  for (const m of missing) {
    console.log(`  ${m.date} @ ${m.venue}`);
  }
  console.log("");

  if (dryRun) {
    console.log("[DRY RUN] No scraping performed.\n");
    await writeFile(FIXTURES_FILE, JSON.stringify(fixtures, null, 2));
    return;
  }

  // Dynamic import to avoid loading Playwright for dry runs
  const { HistoricalScraper } = await import("../src/scrapers/historical.js");
  const scraper = new HistoricalScraper({ headless: true });
  let scraped = 0;
  let failed = 0;

  try {
    await scraper.init();

    for (const meeting of missing) {
      const meetingDate = parse(meeting.date, "yyyy-MM-dd", new Date());
      const venue = meeting.venue === "HV" ? "Happy Valley" as const : "Sha Tin" as const;

      console.log(`Scraping ${meeting.date} @ ${meeting.venue}...`);

      try {
        const results = await scraper.scrapeFullMeetingResults(meetingDate, venue);

        if (results.length === 0) {
          console.log(`  Warning: No results, trying alternate venue...`);
          const altVenue = meeting.venue === "HV" ? "Sha Tin" as const : "Happy Valley" as const;
          const altResults = await scraper.scrapeFullMeetingResults(meetingDate, altVenue);

          if (altResults.length > 0) {
            const altCode = (meeting.venue === "HV" ? "ST" : "HV") as "ST" | "HV";
            const filename = path.join(DATA_DIR, `results_${meeting.date.replace(/-/g, "")}_${altCode}.json`);
            await writeFile(filename, JSON.stringify(altResults, null, 2));
            console.log(`  Done: ${altResults.length} races (venue was actually ${altCode})`);
            meeting.venue = altCode;
            scraped++;
          } else {
            console.log(`  FAILED: No results at either venue`);
            failed++;
          }
        } else {
          const filename = path.join(DATA_DIR, expectedFilename(meeting));
          await writeFile(filename, JSON.stringify(results, null, 2));
          console.log(`  Done: ${results.length} races`);
          scraped++;
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.log(`  FAILED: ${msg.substring(0, 120)}`);
        failed++;
      }

      await new Promise((r) => setTimeout(r, 2000));
    }
  } finally {
    await scraper.close();
  }

  fixtures.lastUpdated = new Date().toISOString();
  await writeFile(FIXTURES_FILE, JSON.stringify(fixtures, null, 2));

  console.log("\n" + "-".repeat(60));
  console.log("SYNC COMPLETE");
  console.log("-".repeat(60));
  console.log(`  Scraped: ${scraped}`);
  console.log(`  Failed:  ${failed}`);
  console.log(`  Total files: ${present.length + scraped}`);
  console.log("");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
