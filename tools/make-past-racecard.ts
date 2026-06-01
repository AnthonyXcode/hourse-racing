#!/usr/bin/env tsx
/**
 * make-past-racecard — reconstruct a saved racecard JSON for any past race meeting.
 *
 * Data sources:
 *   • HKJC localresults page  → race metadata + runner list (horse/jockey/trainer codes)
 *   • HKJC horse profile page → horse demographics (age, sex, color, origin, sire, dam)
 *   • data/historical/*.json   → past performances filtered to before the race date
 *   • HKJC jockey profile      → current season stats (live fetch)
 *   • HKJC trainer profile     → current season stats (live fetch)
 *
 * Usage:
 *   npx tsx tools/make-past-racecard.ts -d 2026-02-08 -v ST -r 10
 *   npx tsx tools/make-past-racecard.ts -d 2026-02-08 -v ST -r 1-11
 *   npx tsx tools/make-past-racecard.ts -d 2026-02-08 -v ST        # all races
 *   npx tsx tools/make-past-racecard.ts -d 2026-02...2026-05      # all fixtures in range
 *   npx tsx tools/make-past-racecard.ts -d 2026-02-01...2026-05-31 -r 1-11
 *   npx tsx tools/make-past-racecard.ts --help
 *
 * Date ranges use data/historical/fixtures.json for meeting dates and venues (-v not required).
 */

import { readFile } from "fs/promises";
import path from "path";
import {
  format,
  parse as parseDate,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import type {
  Race,
  RaceEntry,
  Horse,
  Jockey,
  Trainer,
  Venue,
  SeasonStats,
} from "../src/types/index.js";
import { PastRaceResultsScraper } from "../src/scrapers/pastRaceResults.js";
import { HorseProfileScraper } from "../src/scrapers/horseProfile.js";
import { RaceCardHistoryScraper } from "../src/scrapers/raceCardHistory.js";
import { HorseDataEnricher } from "../src/data/horseEnricher.js";
import { resolveRaceDayRatingFromProfile } from "../src/data/raceDayRating.js";
import { JockeyEnricher } from "../src/data/jockeyEnricher.js";
import { TrainerEnricher } from "../src/data/trainerEnricher.js";

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

const FIXTURES_FILE = path.join(
  process.cwd(),
  "data",
  "historical",
  "fixtures.json"
);

interface FixtureMeeting {
  date: string;
  venue: "ST" | "HV";
}

interface FixtureStore {
  meetings: FixtureMeeting[];
}

interface MeetingTarget {
  date: Date;
  dateStr: string;
  venue: Venue;
  venueCode: "ST" | "HV";
}

type CliArgs =
  | {
      mode: "single";
      meeting: MeetingTarget;
      raceNumbers: number[];
      help?: boolean;
    }
  | {
      mode: "range";
      meetings: MeetingTarget[];
      raceNumbers: number[];
      help?: boolean;
    };

function printHelp(): void {
  console.log(`
make-past-racecard — reconstruct racecard JSONs for a past race meeting

Usage:
  npx tsx tools/make-past-racecard.ts [options]

Options:
  -d, --date <spec>          Single date (YYYY-MM-DD) or range (see below)
  -v, --venue <ST|HV>        Venue for a single date (required unless using a range)
  -r, --race <N|N-M>         Race number or range (e.g. 10 or 1-11). Omit for all.
  -h, --help                 Show this help

Date spec:
  YYYY-MM-DD                 One meeting (requires -v)
  YYYY-MM...YYYY-MM          Month range from fixtures (e.g. 2026-02...2026-05)
  YYYY-MM-DD...YYYY-MM-DD    Day range from fixtures

Examples:
  npx tsx tools/make-past-racecard.ts -d 2026-02-08 -v ST -r 10
  npx tsx tools/make-past-racecard.ts -d 2026-02-08 -v ST -r 1-11
  npx tsx tools/make-past-racecard.ts -d 2026-02-08 -v ST
  npx tsx tools/make-past-racecard.ts -d 2026-02...2026-05
  npx tsx tools/make-past-racecard.ts -d 2026-02-01...2026-05-31 -r 1-11
`);
}

function venueFromCode(code: "ST" | "HV"): Venue {
  return code === "HV" ? "Happy Valley" : "Sha Tin";
}

function parseVenueArg(venueStr: string): Venue {
  const venueUpper = venueStr.toUpperCase();
  return venueUpper === "HV" || venueStr.toLowerCase().includes("happy")
    ? "Happy Valley"
    : "Sha Tin";
}

function parseRaceNumbers(raceStr: string): number[] {
  if (!raceStr) return [];
  if (raceStr.includes("-")) {
    const [from, to] = raceStr.split("-").map(Number);
    if (!isNaN(from!) && !isNaN(to!)) {
      const nums: number[] = [];
      for (let n = from!; n <= to!; n++) nums.push(n);
      return nums;
    }
    return [];
  }
  const n = parseInt(raceStr, 10);
  return isNaN(n) ? [] : [n];
}

async function loadFixtureMeetings(): Promise<FixtureMeeting[]> {
  const raw = await readFile(FIXTURES_FILE, "utf-8");
  const store = JSON.parse(raw) as FixtureStore;
  return store.meetings ?? [];
}

function meetingTarget(m: FixtureMeeting): MeetingTarget {
  const date = parseDate(m.date, "yyyy-MM-dd", new Date());
  return {
    date,
    dateStr: m.date,
    venue: venueFromCode(m.venue),
    venueCode: m.venue,
  };
}

/** Parse YYYY-MM or YYYY-MM-DD into interval bounds (inclusive). */
function parseRangeBounds(
  startStr: string,
  endStr: string
): { start: Date; end: Date } {
  const monthRe = /^\d{4}-\d{2}$/;
  const dayRe = /^\d{4}-\d{2}-\d{2}$/;

  if (monthRe.test(startStr) && monthRe.test(endStr)) {
    const start = startOfMonth(
      parseDate(`${startStr}-01`, "yyyy-MM-dd", new Date())
    );
    const end = endOfMonth(
      parseDate(`${endStr}-01`, "yyyy-MM-dd", new Date())
    );
    return { start, end };
  }

  if (dayRe.test(startStr) && dayRe.test(endStr)) {
    const start = parseDate(startStr, "yyyy-MM-dd", new Date());
    const end = parseDate(endStr, "yyyy-MM-dd", new Date());
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error(`Error: invalid date range "${startStr}...${endStr}"`);
      process.exit(1);
    }
    return { start, end };
  }

  console.error(
    `Error: invalid range "${startStr}...${endStr}". Use YYYY-MM...YYYY-MM or YYYY-MM-DD...YYYY-MM-DD`
  );
  process.exit(1);
}

async function meetingsInRange(
  startStr: string,
  endStr: string
): Promise<MeetingTarget[]> {
  const { start, end } = parseRangeBounds(startStr, endStr);
  if (start > end) {
    console.error(
      `Error: range start ${format(start, "yyyy-MM-dd")} is after end ${format(end, "yyyy-MM-dd")}`
    );
    process.exit(1);
  }

  const fixtures = await loadFixtureMeetings();
  const filtered = fixtures
    .filter((m) => {
      const d = parseDate(m.date, "yyyy-MM-dd", new Date());
      return isWithinInterval(d, { start, end });
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  if (filtered.length === 0) {
    console.error(
      `Error: no meetings in fixtures.json between ${startStr} and ${endStr}`
    );
    process.exit(1);
  }

  return filtered.map(meetingTarget);
}

function parseSingleDate(dateStr: string): Date {
  const date = parseDate(dateStr, "yyyy-MM-dd", new Date());
  if (isNaN(date.getTime())) {
    console.error(`Error: invalid date "${dateStr}", expected YYYY-MM-DD`);
    process.exit(1);
  }
  return date;
}

async function parseArgs(): Promise<CliArgs> {
  const argv = process.argv.slice(2);

  if (argv.includes("--help") || argv.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  let dateStr = "";
  let venueStr = "";
  let raceStr = "";

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if ((arg === "-d" || arg === "--date") && argv[i + 1]) {
      dateStr = argv[++i]!;
    } else if ((arg === "-v" || arg === "--venue") && argv[i + 1]) {
      venueStr = argv[++i]!;
    } else if ((arg === "-r" || arg === "--race") && argv[i + 1]) {
      raceStr = argv[++i]!;
    }
  }

  const raceNumbers = parseRaceNumbers(raceStr);

  if (!dateStr) {
    console.error("Error: --date is required");
    printHelp();
    process.exit(1);
  }

  if (dateStr.includes("...")) {
    const parts = dateStr.split("...");
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      console.error(`Error: invalid range "${dateStr}"`);
      process.exit(1);
    }
    const meetings = await meetingsInRange(parts[0], parts[1]);
    return { mode: "range", meetings, raceNumbers };
  }

  if (!venueStr) {
    console.error("Error: --venue is required for a single date");
    printHelp();
    process.exit(1);
  }

  const date = parseSingleDate(dateStr);
  const meeting: MeetingTarget = {
    date,
    dateStr: format(date, "yyyy-MM-dd"),
    venue: parseVenueArg(venueStr),
    venueCode:
      parseVenueArg(venueStr) === "Happy Valley" ? "HV" : "ST",
  };

  return { mode: "single", meeting, raceNumbers };
}

// ============================================================================
// HELPER — empty stats placeholders
// ============================================================================

function emptySeasonStats(): SeasonStats {
  return { wins: 0, places: 0, rides: 0, winRate: 0, placeRate: 0, roi: 1 };
}

// ============================================================================
// BUILD ONE RACE
// ============================================================================

async function buildRace(
  date: Date,
  venue: Venue,
  raceNo: number,
  pastScraper: PastRaceResultsScraper,
  horseScraper: HorseProfileScraper,
  horseEnricher: HorseDataEnricher,
  jockeyEnricher: JockeyEnricher,
  trainerEnricher: TrainerEnricher,
  raceCardHistory: RaceCardHistoryScraper
): Promise<boolean> {
  const label = `${format(date, "yyyy-MM-dd")} ${venue === "Happy Valley" ? "HV" : "ST"} R${raceNo}`;
  console.log(`\n[${label}] Scraping results page...`);

  const result = await pastScraper.scrapeRace(date, venue, raceNo);
  if (!result || result.runners.length === 0) {
    console.log(`[${label}] No results found – skipping.`);
    return false;
  }

  console.log(`[${label}] ${result.raceClass} ${result.distance}m ${result.surface} (${result.going}) | ${result.runners.length} runners`);

  // Build RaceEntry array with skeleton horse/jockey/trainer objects
  const entries: RaceEntry[] = [];

  const raceDateStr = format(date, "yyyy-MM-dd");

  for (const runner of result.runners) {
    console.log(`  → [${label}] Scraping horse profile: ${runner.horseName} (${runner.horseCode})`);

    let horse: Horse;
    try {
      const profile = await horseScraper.scrapeHorseProfile(runner.horseCode);

      const raceDayRating = resolveRaceDayRatingFromProfile(
        profile.pastPerformances,
        date,
        raceNo
      );
      if (!raceDayRating) {
        console.warn(
          `  [WARNING] No race-day Rtg for ${runner.horseName} on ${raceDateStr} R${raceNo}`
        );
      }

      // Exclude nameChinese and HorseProfile-only fields when building a Horse.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { nameChinese: _nc, formFigures: _ff, classHistory: _ch, bestRating: _br, distanceWins: _dw, goingRecord: _gr, pastPerformances: _pp, ...baseProfile } = profile;

      horse = {
        ...baseProfile,
        // Use the full HKJC code (e.g. HK_2023_J391), not just the short tail.
        code: runner.horseCode,
        name: runner.horseName || baseProfile.name,
        currentRating: raceDayRating?.currentRating ?? 50,
        ...(raceDayRating?.ratingChange !== undefined
          ? { ratingChange: raceDayRating.ratingChange }
          : {}),
        // pastPerformances will be populated by HorseDataEnricher below.
        pastPerformances: [],
      };
    } catch (err) {
      console.warn(`  [WARNING] Could not scrape profile for ${runner.horseName}: ${err}`);
      // Minimal placeholder so the racecard is still saved
      horse = {
        code: runner.horseCode,
        name: runner.horseName,
        age: 4,
        sex: "G",
        color: "Bay",
        origin: "AUS",
        sire: "",
        dam: "",
        currentRating: 50,
        seasonStarts: 0,
        seasonWins: 0,
        seasonPlaces: 0,
        careerStarts: 0,
        careerWins: 0,
        careerPlaces: 0,
        totalPrizeMoney: 0,
        gear: [],
        pastPerformances: [],
      };
    }

    const jockey: Jockey = {
      code: runner.jockeyCode,
      name: runner.jockeyName,
      nationality: "",
      weightClaim: 0,
      seasonStats: emptySeasonStats(),
      courseStats: [],
    };

    const trainer: Trainer = {
      code: runner.trainerCode,
      name: runner.trainerName,
      seasonStats: emptySeasonStats(),
      courseStats: [],
      specialties: [],
    };

    entries.push({
      horse,
      jockey,
      trainer,
      horseNumber: runner.horseNumber,
      draw: runner.draw,
      weight: runner.actualWeight,
      isScratched: false,
    });
  }

  const venueCode = venue === "Happy Valley" ? "HV" : "ST";
  const dateStr = format(date, "yyyy-MM-dd");

  let race: Race = {
    id: `${dateStr}-${venueCode}-${raceNo}`,
    date,
    venue,
    raceNumber: raceNo,
    name: result.name ?? "",
    class: result.raceClass,
    distance: result.distance,
    surface: result.surface,
    going: result.going,
    prizeMoney: result.prizeMoney,
    entries,
  };

  // Enrich with live jockey stats
  console.log(`  → [${label}] Fetching jockey stats...`);
  try {
    race = await jockeyEnricher.enrichRace(race);
  } catch (err) {
    console.warn(`  [WARNING] Jockey enrichment failed: ${err}`);
  }

  // Enrich with live trainer stats
  console.log(`  → [${label}] Fetching trainer stats...`);
  try {
    race = await trainerEnricher.enrichRace(race);
  } catch (err) {
    console.warn(`  [WARNING] Trainer enrichment failed: ${err}`);
  }

  // Enrich with past performances from historical data (max 10 before race date)
  console.log(`  → [${label}] Loading historical past performances...`);
  race = horseEnricher.enrichRace(race, { beforeDate: date });

  // Count past performances to give feedback
  const totalPPs = race.entries.reduce(
    (sum, e) => sum + e.horse.pastPerformances.length, 0
  );
  const sparseCount = race.entries.filter(
    (e) => e.horse.pastPerformances.length <= 1
  ).length;
  console.log(
    `  → [${label}] PPs: ${totalPPs} total across ${race.entries.length} horses (${sparseCount} sparse)`
  );

  // Save win odds from results (keyed by horse number)
  const winOdds = new Map<number, number>();
  for (const runner of result.runners) {
    if (runner.horseNumber > 0 && runner.winOdds > 0) {
      winOdds.set(runner.horseNumber, runner.winOdds);
    }
  }

  const savedPath = await raceCardHistory.saveRaceCard(race, winOdds);
  console.log(`  ✓ [${label}] Saved → ${savedPath}`);
  return true;
}

// ============================================================================
// PROCESS ONE MEETING
// ============================================================================

interface ScraperBundle {
  pastScraper: PastRaceResultsScraper;
  horseScraper: HorseProfileScraper;
  horseEnricher: HorseDataEnricher;
  jockeyEnricher: JockeyEnricher;
  trainerEnricher: TrainerEnricher;
  raceCardHistory: RaceCardHistoryScraper;
}

async function processMeeting(
  meeting: MeetingTarget,
  raceNumbersArg: number[],
  scrapers: ScraperBundle
): Promise<{ built: number; skipped: number }> {
  const { date, venue } = meeting;
  const label = `${meeting.dateStr} ${meeting.venueCode}`;

  console.log("\n" + "-".repeat(60));
  console.log(`Meeting: ${label}`);
  console.log("-".repeat(60));

  let raceNumbers = raceNumbersArg;
  if (raceNumbers.length === 0) {
    console.log("Auto-detecting race numbers for this meeting...");
    try {
      raceNumbers = await scrapers.pastScraper.scrapeRaceNumbers(date, venue);
      console.log(`  Detected races: ${raceNumbers.join(", ")}`);
    } catch {
      console.warn("  Could not auto-detect race numbers, defaulting to 1-11");
      raceNumbers = Array.from({ length: 11 }, (_, i) => i + 1);
    }
  }

  let built = 0;
  let skipped = 0;

  for (const raceNo of raceNumbers) {
    try {
      const ok = await buildRace(
        date,
        venue,
        raceNo,
        scrapers.pastScraper,
        scrapers.horseScraper,
        scrapers.horseEnricher,
        scrapers.jockeyEnricher,
        scrapers.trainerEnricher,
        scrapers.raceCardHistory
      );
      if (ok) built++;
      else skipped++;
    } catch (err) {
      console.error(`[ERROR] ${label} R${raceNo}: ${err}`);
      skipped++;
    }
  }

  return { built, skipped };
}

// ============================================================================
// MAIN
// ============================================================================

async function main(): Promise<void> {
  const args = await parseArgs();
  const meetings =
    args.mode === "range" ? args.meetings : [args.meeting];

  console.log("\n" + "=".repeat(60));
  console.log(`make-past-racecard`);
  if (args.mode === "range") {
    console.log(
      `  Range : ${meetings[0]!.dateStr} → ${meetings[meetings.length - 1]!.dateStr}`
    );
    console.log(`  Meetings: ${meetings.length} (from fixtures.json)`);
  } else {
    console.log(`  Date  : ${meetings[0]!.dateStr}`);
    console.log(`  Venue : ${meetings[0]!.venue}`);
  }
  if (args.raceNumbers.length > 0) {
    console.log(`  Races : ${args.raceNumbers.join(", ")}`);
  }
  console.log("=".repeat(60));

  const pastScraper = new PastRaceResultsScraper();
  const horseScraper = new HorseProfileScraper();
  const horseEnricher = new HorseDataEnricher();
  const jockeyEnricher = new JockeyEnricher({ fetchFromHKJC: true });
  const trainerEnricher = new TrainerEnricher({ fetchFromHKJC: true });
  const raceCardHistory = new RaceCardHistoryScraper();
  const scrapers: ScraperBundle = {
    pastScraper,
    horseScraper,
    horseEnricher,
    jockeyEnricher,
    trainerEnricher,
    raceCardHistory,
  };

  try {
    console.log("\nInitializing browsers...");
    await pastScraper.init();
    await horseScraper.init();

    await jockeyEnricher.loadFromDirectory();
    await trainerEnricher.loadFromDirectory();

    console.log("Loading historical data from data/historical/...");
    await horseEnricher.loadHistoricalData();
    const summary = horseEnricher.getDataSummary();
    console.log(
      `  Loaded ${summary.totalRaces} races, ${summary.totalHorses} horses from historical data`
    );

    let totalBuilt = 0;
    let totalSkipped = 0;

    for (let i = 0; i < meetings.length; i++) {
      const meeting = meetings[i]!;
      if (args.mode === "range") {
        console.log(`\n[${i + 1}/${meetings.length}] ${meeting.dateStr} @ ${meeting.venueCode}`);
      }
      const { built, skipped } = await processMeeting(
        meeting,
        args.raceNumbers,
        scrapers
      );
      totalBuilt += built;
      totalSkipped += skipped;
    }

    console.log("\n" + "=".repeat(60));
    console.log(
      `Done: ${totalBuilt} racecard(s) saved, ${totalSkipped} skipped across ${meetings.length} meeting(s).`
    );
    if (meetings.length === 1) {
      const m = meetings[0]!;
      console.log("\nYou can now analyze saved racecards with:");
      console.log(
        `  npx tsx tools/analyze-race.ts -d ${m.dateStr} -v ${m.venueCode} -r N --use-saved`
      );
      console.log(
        `  npx tsx tools/batch-analyze.ts -d ${m.dateStr} -v ${m.venueCode} --use-saved`
      );
    }
    console.log("=".repeat(60));
  } finally {
    await pastScraper.close();
    await horseScraper.close();
    await jockeyEnricher.closeBrowser();
    await trainerEnricher.closeBrowser();
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
