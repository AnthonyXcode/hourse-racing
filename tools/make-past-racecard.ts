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
 *   npx tsx tools/make-past-racecard.ts --help
 */

import { format } from "date-fns";
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
import { JockeyEnricher } from "../src/data/jockeyEnricher.js";
import { TrainerEnricher } from "../src/data/trainerEnricher.js";

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

interface CliArgs {
  date: Date;
  venue: Venue;
  /** Specific race numbers to build. Empty = auto-detect from meeting. */
  raceNumbers: number[];
  help?: boolean;
}

function printHelp(): void {
  console.log(`
make-past-racecard — reconstruct racecard JSONs for a past race meeting

Usage:
  npx tsx tools/make-past-racecard.ts [options]

Options:
  -d, --date <YYYY-MM-DD>    Race date (required)
  -v, --venue <ST|HV>        Venue: ST = Sha Tin, HV = Happy Valley (required)
  -r, --race <N|N-M>         Race number or range (e.g. 10 or 1-11). Omit for all.
  -h, --help                 Show this help

Examples:
  npx tsx tools/make-past-racecard.ts -d 2026-02-08 -v ST -r 10
  npx tsx tools/make-past-racecard.ts -d 2026-02-08 -v ST -r 1-11
  npx tsx tools/make-past-racecard.ts -d 2026-02-08 -v ST
`);
}

function parseArgs(): CliArgs {
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

  if (!dateStr) {
    console.error("Error: --date is required");
    printHelp();
    process.exit(1);
  }
  if (!venueStr) {
    console.error("Error: --venue is required");
    printHelp();
    process.exit(1);
  }

  // Parse date
  const dateParts = dateStr.split("-").map(Number);
  if (dateParts.length !== 3) {
    console.error(`Error: invalid date "${dateStr}", expected YYYY-MM-DD`);
    process.exit(1);
  }
  const date = new Date(dateParts[0]!, dateParts[1]! - 1, dateParts[2]!);
  if (isNaN(date.getTime())) {
    console.error(`Error: invalid date "${dateStr}"`);
    process.exit(1);
  }

  // Parse venue
  const venueUpper = venueStr.toUpperCase();
  const venue: Venue =
    venueUpper === "HV" || venueStr.toLowerCase().includes("happy")
      ? "Happy Valley"
      : "Sha Tin";

  // Parse race numbers
  let raceNumbers: number[] = [];
  if (raceStr) {
    if (raceStr.includes("-")) {
      const [from, to] = raceStr.split("-").map(Number);
      if (!isNaN(from!) && !isNaN(to!)) {
        for (let n = from!; n <= to!; n++) raceNumbers.push(n);
      }
    } else {
      const n = parseInt(raceStr, 10);
      if (!isNaN(n)) raceNumbers = [n];
    }
  }

  return { date, venue, raceNumbers };
}

// ============================================================================
// HELPER — empty stats placeholders
// ============================================================================

function emptySeasonStats(): SeasonStats {
  return { wins: 0, places: 0, rides: 0, winRate: 0, placeRate: 0, roi: 1 };
}

// ============================================================================
// HELPER — filter past performances to strictly before a date
// ============================================================================

function filterPastPerformances(race: Race, beforeDate: Date): Race {
  const cutoff = beforeDate.getTime();
  return {
    ...race,
    entries: race.entries.map((entry) => ({
      ...entry,
      horse: {
        ...entry.horse,
        pastPerformances: entry.horse.pastPerformances.filter(
          (pp) => new Date(pp.date).getTime() < cutoff
        ),
      },
    })),
  } as Race;
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

      // Find the rating the horse carried into THIS race from the profile's form table.
      // parsePastPerformances now extracts speedRating (the "Rtg." column) per row.
      // Profile PPs are sorted descending (most recent first).
      const matchingIdx = profile.pastPerformances.findIndex((pp) => {
        const ppDate = format(new Date(pp.date), "yyyy-MM-dd");
        return ppDate === raceDateStr && pp.raceNumber === raceNo;
      });
      const matchingPP = matchingIdx >= 0 ? profile.pastPerformances[matchingIdx] : undefined;
      const ratingAtRaceTime = matchingPP?.speedRating ?? profile.currentRating;

      // ratingChange = this race's rating minus the previous race's rating.
      // "Previous" = the entry one position later in the descending list.
      let ratingChange: number | undefined;
      if (matchingPP?.speedRating !== undefined && matchingIdx >= 0) {
        const prevPP = profile.pastPerformances[matchingIdx + 1];
        if (prevPP?.speedRating !== undefined) {
          const delta = matchingPP.speedRating - prevPP.speedRating;
          ratingChange = delta;
        }
      }

      // Exclude nameChinese and HorseProfile-only fields when building a Horse.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { nameChinese: _nc, formFigures: _ff, classHistory: _ch, bestRating: _br, distanceWins: _dw, goingRecord: _gr, pastPerformances: _pp, ...baseProfile } = profile;

      horse = {
        ...baseProfile,
        // Use the full HKJC code (e.g. HK_2023_J391), not just the short tail.
        code: runner.horseCode,
        name: runner.horseName || baseProfile.name,
        currentRating: ratingAtRaceTime,
        ...(ratingChange !== undefined ? { ratingChange } : {}),
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

  // Enrich with past performances from historical data
  console.log(`  → [${label}] Loading historical past performances...`);
  race = horseEnricher.enrichRace(race);

  // Filter past performances to strictly before the race date
  race = filterPastPerformances(race, date);

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
// MAIN
// ============================================================================

async function main(): Promise<void> {
  const args = parseArgs();
  const { date, venue } = args;

  console.log("\n" + "=".repeat(60));
  console.log(`make-past-racecard`);
  console.log(`  Date  : ${format(date, "yyyy-MM-dd")}`);
  console.log(`  Venue : ${venue}`);
  console.log("=".repeat(60));

  // Initialize scrapers
  const pastScraper = new PastRaceResultsScraper();
  const horseScraper = new HorseProfileScraper();
  const horseEnricher = new HorseDataEnricher();
  const jockeyEnricher = new JockeyEnricher({ fetchFromHKJC: true });
  const trainerEnricher = new TrainerEnricher({ fetchFromHKJC: true });
  const raceCardHistory = new RaceCardHistoryScraper();

  try {
    // Initialize browsers
    console.log("\nInitializing browsers...");
    await pastScraper.init();
    await horseScraper.init();

    // Load local jockey/trainer stats (if any cached files exist)
    await jockeyEnricher.loadFromDirectory();
    await trainerEnricher.loadFromDirectory();

    // Load all historical race data once
    console.log("Loading historical data from data/historical/...");
    await horseEnricher.loadHistoricalData();
    const summary = horseEnricher.getDataSummary();
    console.log(
      `  Loaded ${summary.totalRaces} races, ${summary.totalHorses} horses from historical data`
    );

    // Determine race numbers to process
    let raceNumbers = args.raceNumbers;
    if (raceNumbers.length === 0) {
      console.log("\nAuto-detecting race numbers for this meeting...");
      try {
        raceNumbers = await pastScraper.scrapeRaceNumbers(date, venue);
        console.log(`  Detected races: ${raceNumbers.join(", ")}`);
      } catch {
        console.warn("  Could not auto-detect race numbers, defaulting to 1-11");
        raceNumbers = Array.from({ length: 11 }, (_, i) => i + 1);
      }
    }

    // Process each race
    let built = 0;
    let skipped = 0;

    for (const raceNo of raceNumbers) {
      try {
        const ok = await buildRace(
          date,
          venue,
          raceNo,
          pastScraper,
          horseScraper,
          horseEnricher,
          jockeyEnricher,
          trainerEnricher,
          raceCardHistory
        );
        if (ok) built++;
        else skipped++;
      } catch (err) {
        console.error(`[ERROR] Race ${raceNo}: ${err}`);
        skipped++;
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log(`Done: ${built} racecard(s) saved, ${skipped} skipped.`);
    console.log("\nYou can now analyze saved racecards with:");
    console.log(`  npx tsx tools/analyze-race.ts -d ${format(date, "yyyy-MM-dd")} -v ${venue === "Happy Valley" ? "HV" : "ST"} -r N --use-saved`);
    console.log(`  npx tsx tools/batch-analyze.ts -d ${format(date, "yyyy-MM-dd")} -v ${venue === "Happy Valley" ? "HV" : "ST"} --use-saved`);
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
