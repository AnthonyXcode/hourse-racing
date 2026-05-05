#!/usr/bin/env tsx
/**
 * Cross-check saved HKJC racecard JSON against SCMP racecard page.
 * Compares: class, distance, surface, going, horse name, jockey, trainer,
 *           draw, weight, rating, age, gear, jockey season stats, trainer
 *           season stats. Odds are intentionally skipped.
 *
 * Usage:
 *   PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/verify-racecard-scmp.ts \
 *     --date=2026-04-29 --venue=HV [--race=1]
 */
import { chromium } from "playwright";
import type { Page } from "playwright";
import { readdirSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import {
  scrapeScmpRacecard,
  type ScmpRaceMeta,
  type ScmpEntry,
} from "../src/scrapers/scmp/racecard.js";
import { scrapeScmpJockey, type ScmpJockeyStats } from "../src/scrapers/scmp/jockey.js";
import { scrapeScmpTrainer, type ScmpTrainerStats } from "../src/scrapers/scmp/trainer.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RACECARD_DIR = join(ROOT, "data", "racecards");

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  let date = "";
  let venue = "";
  let race: number | null = null;

  for (const a of args) {
    if (a.startsWith("--date=")) date = a.slice("--date=".length);
    else if (a.startsWith("--venue=")) venue = a.slice("--venue=".length).toUpperCase();
    else if (a.startsWith("--race=")) race = parseInt(a.slice("--race=".length), 10);
  }

  if (!date || !venue) {
    console.error("Usage: npx tsx tools/verify-racecard-scmp.ts --date=YYYY-MM-DD --venue=HV|ST [--race=N]");
    process.exit(1);
  }

  const dateStamp = date.replaceAll("-", "");
  return { date, dateStamp, venue, race };
}

// ---------------------------------------------------------------------------
// Load saved HKJC racecard JSONs
// ---------------------------------------------------------------------------

interface SeasonStats {
  wins: number;
  places: number;
  rides: number;
  winRate: number;
  placeRate: number;
}

interface SavedEntry {
  horse: { name: string; age: number; currentRating: number; gear: string[] };
  jockey: { code: string; name: string; seasonStats?: SeasonStats };
  trainer: { code: string; name: string; seasonStats?: SeasonStats };
  horseNumber: number;
  draw: number;
  weight: number;
  gearChanges?: string[];
  isScratched: boolean;
}

interface SavedRace {
  race: {
    raceNumber: number;
    class: string;
    distance: number;
    surface: string;
    going: string;
    entries: SavedEntry[];
  };
}

function discoverRaceFiles(dateStamp: string, venue: string, raceFilter: number | null): string[] {
  const prefix = `racecard_${dateStamp}_${venue}_R`;
  return readdirSync(RACECARD_DIR)
    .filter((f) => f.startsWith(prefix) && f.endsWith(".json"))
    .filter((f) => {
      if (raceFilter === null) return true;
      const m = f.match(/_R(\d+)\.json$/);
      return m ? parseInt(m[1]!, 10) === raceFilter : false;
    })
    .sort((a, b) => {
      const na = parseInt(a.match(/_R(\d+)/)?.[1] ?? "0", 10);
      const nb = parseInt(b.match(/_R(\d+)/)?.[1] ?? "0", 10);
      return na - nb;
    });
}

function loadRaceCard(filename: string): SavedRace {
  return JSON.parse(readFileSync(join(RACECARD_DIR, filename), "utf-8"));
}

// ---------------------------------------------------------------------------
// Comparison helpers
// ---------------------------------------------------------------------------

interface Mismatch {
  field: string;
  hkjc: string;
  scmp: string;
}

function normName(name: string): string {
  return name
    .toUpperCase()
    .replace(/[\u4e00-\u9fff\u3400-\u4dbf]+/g, "")
    .replace(/\s*\([A-Z]\d{3}\)\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normJockeyTrainer(name: string): string {
  return name
    .replace(/\s*\([-+]?\d+\)\s*$/, "")
    .replace(/\s+[-+]\d+$/, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * Fuzzy compare for jockey/trainer names.
 * Handles initial vs full first name, and extra/dropped middle initials.
 */
function namesMatch(hkjc: string, scmp: string): boolean {
  const a = normJockeyTrainer(hkjc);
  const b = normJockeyTrainer(scmp);
  if (a === b) return true;

  const partsA = a.split(" ");
  const partsB = b.split(" ");
  if (partsA.length < 2 || partsB.length < 2) return false;

  const surnameA = partsA[partsA.length - 1]!;
  const surnameB = partsB[partsB.length - 1]!;
  if (surnameA !== surnameB) return false;

  const initialsA = partsA.slice(0, -1).map((p) => p[0]).join("");
  const initialsB = partsB.slice(0, -1).map((p) => p[0]).join("");

  if (initialsA === initialsB) return true;
  if (initialsA.startsWith(initialsB) || initialsB.startsWith(initialsA)) return true;

  return false;
}

function compareRace(
  hkjc: SavedRace["race"],
  scmp: ScmpRaceMeta,
  infoLines: string[],
): Mismatch[] {
  const mm: Mismatch[] = [];

  if (scmp.class && normName(hkjc.class) !== normName(scmp.class)) {
    mm.push({ field: "class", hkjc: hkjc.class, scmp: scmp.class });
  }
  if (scmp.distance && hkjc.distance !== scmp.distance) {
    mm.push({ field: "distance", hkjc: `${hkjc.distance}`, scmp: `${scmp.distance}` });
  }
  if (scmp.surface && hkjc.surface.toLowerCase() !== scmp.surface.toLowerCase()) {
    mm.push({ field: "surface", hkjc: hkjc.surface, scmp: scmp.surface });
  }
  // Going: SCMP shows "Expected Going" (pre-race forecast); HKJC shows actual race-day going.
  // These legitimately differ (e.g. SCMP="Good", HKJC="Wet Slow" after overnight rain).
  // Log as informational only — do NOT count toward the mismatch total.
  if (scmp.going && hkjc.going.toLowerCase() !== scmp.going.toLowerCase()) {
    infoLines.push(
      `  ℹ️  going differs (expected vs actual): SCMP="${scmp.going}"  HKJC="${hkjc.going}"`,
    );
  }

  return mm;
}

function compareEntry(hkjc: SavedEntry, scmp: ScmpEntry): Mismatch[] {
  const mm: Mismatch[] = [];

  if (normName(hkjc.horse.name) !== normName(scmp.horseName)) {
    mm.push({ field: "name", hkjc: hkjc.horse.name, scmp: scmp.horseName });
  }
  if (!namesMatch(hkjc.jockey.name, scmp.jockey)) {
    mm.push({ field: "jockey", hkjc: hkjc.jockey.name, scmp: scmp.jockey });
  }
  if (!namesMatch(hkjc.trainer.name, scmp.trainer)) {
    mm.push({ field: "trainer", hkjc: hkjc.trainer.name, scmp: scmp.trainer });
  }
  if (!scmp.isReserve && scmp.draw > 0 && hkjc.draw !== scmp.draw) {
    mm.push({ field: "draw", hkjc: `${hkjc.draw}`, scmp: `${scmp.draw}` });
  }
  if (scmp.weight > 0 && hkjc.weight !== scmp.weight) {
    mm.push({ field: "weight", hkjc: `${hkjc.weight}`, scmp: `${scmp.weight}` });
  }
  if (scmp.rating > 0 && hkjc.horse.currentRating !== scmp.rating) {
    mm.push({ field: "rating", hkjc: `${hkjc.horse.currentRating}`, scmp: `${scmp.rating}` });
  }
  if (scmp.age > 0 && hkjc.horse.age !== scmp.age) {
    mm.push({ field: "age", hkjc: `${hkjc.horse.age}`, scmp: `${scmp.age}` });
  }

  const hkjcGearSet = new Set(hkjc.horse.gear);
  const scmpGearSet = new Set(scmp.gear);
  const missingFromHkjc = [...scmpGearSet].filter((g) => !hkjcGearSet.has(g));
  if (missingFromHkjc.length > 0) {
    mm.push({
      field: "gear",
      hkjc: [...hkjcGearSet].sort().join(",") || "(none)",
      scmp: `${[...scmpGearSet].sort().join(",")} (${missingFromHkjc.join(",")} not in HKJC)`,
    });
  }

  return mm;
}

// ---------------------------------------------------------------------------
// Jockey / Trainer stats comparison
// ---------------------------------------------------------------------------

interface ProfileInfo {
  type: "jockey" | "trainer";
  code: string;
  name: string;
  url: string;
  hkjcStats: SeasonStats;
}

function compareJockeyStats(hkjc: SeasonStats, scmp: ScmpJockeyStats): Mismatch[] {
  const mm: Mismatch[] = [];
  if (hkjc.wins !== scmp.seasonWins) {
    mm.push({ field: "jockey.wins", hkjc: `${hkjc.wins}`, scmp: `${scmp.seasonWins}` });
  }
  if (hkjc.rides !== scmp.seasonRuns) {
    mm.push({ field: "jockey.rides", hkjc: `${hkjc.rides}`, scmp: `${scmp.seasonRuns}` });
  }
  // HKJC places = 2nds + 3rds; SCMP has them separate
  const scmpPlaces = scmp.seconds + scmp.thirds;
  if (hkjc.places !== scmpPlaces) {
    mm.push({ field: "jockey.places", hkjc: `${hkjc.places}`, scmp: `${scmpPlaces} (2nd:${scmp.seconds}+3rd:${scmp.thirds})` });
  }
  // winRate: HKJC is decimal (0.065), SCMP is percentage (6.5)
  const hkjcWinPct = Math.round(hkjc.winRate * 1000) / 10;
  if (Math.abs(hkjcWinPct - scmp.winPct) > 0.2) {
    mm.push({ field: "jockey.winRate", hkjc: `${hkjcWinPct}%`, scmp: `${scmp.winPct}%` });
  }
  // placeRate: HKJC = (wins+places)/rides, SCMP "Percentage for season" = same
  const hkjcPlacePct = Math.round(hkjc.placeRate * 10000) / 100;
  if (Math.abs(hkjcPlacePct - scmp.placePct) > 0.2) {
    mm.push({ field: "jockey.placeRate", hkjc: `${hkjcPlacePct}%`, scmp: `${scmp.placePct}%` });
  }
  return mm;
}

function compareTrainerStats(hkjc: SeasonStats, scmp: ScmpTrainerStats): Mismatch[] {
  const mm: Mismatch[] = [];
  if (hkjc.wins !== scmp.seasonWins) {
    mm.push({ field: "trainer.wins", hkjc: `${hkjc.wins}`, scmp: `${scmp.seasonWins}` });
  }
  if (hkjc.rides !== scmp.seasonRuns) {
    mm.push({ field: "trainer.rides", hkjc: `${hkjc.rides}`, scmp: `${scmp.seasonRuns}` });
  }
  const scmpPlaces = scmp.seconds + scmp.thirds;
  if (hkjc.places !== scmpPlaces) {
    mm.push({ field: "trainer.places", hkjc: `${hkjc.places}`, scmp: `${scmpPlaces} (2nd:${scmp.seconds}+3rd:${scmp.thirds})` });
  }
  const hkjcWinPct = Math.round(hkjc.winRate * 1000) / 10;
  if (Math.abs(hkjcWinPct - scmp.winPct) > 0.2) {
    mm.push({ field: "trainer.winRate", hkjc: `${hkjcWinPct}%`, scmp: `${scmp.winPct}%` });
  }
  const hkjcPlacePct = Math.round(hkjc.placeRate * 10000) / 100;
  if (Math.abs(hkjcPlacePct - scmp.placePct) > 0.2) {
    mm.push({ field: "trainer.placeRate", hkjc: `${hkjcPlacePct}%`, scmp: `${scmp.placePct}%` });
  }
  return mm;
}

/**
 * Collect unique jockey/trainer profile URLs from SCMP entries,
 * paired with their HKJC stats from the racecard.
 */
function collectProfiles(
  allRaces: { hkjcEntries: SavedEntry[]; scmpByNum: Map<number, ScmpEntry> }[],
): Map<string, ProfileInfo> {
  const profiles = new Map<string, ProfileInfo>();

  for (const { hkjcEntries, scmpByNum } of allRaces) {
    for (const hEntry of hkjcEntries) {
      const sEntry = scmpByNum.get(hEntry.horseNumber);
      if (!sEntry) continue;

      if (sEntry.jockeyUrl && hEntry.jockey.seasonStats && !profiles.has(sEntry.jockeyUrl)) {
        profiles.set(sEntry.jockeyUrl, {
          type: "jockey",
          code: hEntry.jockey.code,
          name: hEntry.jockey.name,
          url: sEntry.jockeyUrl,
          hkjcStats: hEntry.jockey.seasonStats,
        });
      }

      if (sEntry.trainerUrl && hEntry.trainer.seasonStats && !profiles.has(sEntry.trainerUrl)) {
        profiles.set(sEntry.trainerUrl, {
          type: "trainer",
          code: hEntry.trainer.code,
          name: hEntry.trainer.name,
          url: sEntry.trainerUrl,
          hkjcStats: hEntry.trainer.seasonStats,
        });
      }
    }
  }

  return profiles;
}

async function verifyProfiles(
  page: Page,
  profiles: Map<string, ProfileInfo>,
): Promise<{ totalMM: number }> {
  let totalMM = 0;
  const sorted = [...profiles.values()].sort((a, b) => {
    if (a.type !== b.type) return a.type === "jockey" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const jockeys = sorted.filter((p) => p.type === "jockey");
  const trainers = sorted.filter((p) => p.type === "trainer");

  console.log(`\n=== JOCKEY STATS (${jockeys.length} unique) ===\n`);
  for (const prof of jockeys) {
    try {
      const scmpStats = await scrapeScmpJockey(page, prof.url);
      const mm = compareJockeyStats(prof.hkjcStats, scmpStats);
      if (mm.length === 0) {
        console.log(`  🟢 ${prof.name} .......... OK (W:${prof.hkjcStats.wins} R:${prof.hkjcStats.rides})`);
      } else {
        for (const m of mm) {
          console.log(`  🔴 ${prof.name}  MISMATCH: ${m.field}  HKJC="${m.hkjc}"  SCMP="${m.scmp}"`);
        }
        totalMM += mm.length;
      }
    } catch (err) {
      console.log(`  🔴 ${prof.name}  SKIP — failed to load profile (${(err as Error).message})`);
    }
  }

  console.log(`\n=== TRAINER STATS (${trainers.length} unique) ===\n`);
  for (const prof of trainers) {
    try {
      const scmpStats = await scrapeScmpTrainer(page, prof.url);
      const mm = compareTrainerStats(prof.hkjcStats, scmpStats);
      if (mm.length === 0) {
        console.log(`  🟢 ${prof.name} .......... OK (W:${prof.hkjcStats.wins} R:${prof.hkjcStats.rides})`);
      } else {
        for (const m of mm) {
          console.log(`  🔴 ${prof.name}  MISMATCH: ${m.field}  HKJC="${m.hkjc}"  SCMP="${m.scmp}"`);
        }
        totalMM += mm.length;
      }
    } catch (err) {
      console.log(`  🔴 ${prof.name}  SKIP — failed to load profile (${(err as Error).message})`);
    }
  }

  return { totalMM };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { date, dateStamp, venue, race: raceFilter } = parseArgs();
  const files = discoverRaceFiles(dateStamp, venue, raceFilter);

  if (files.length === 0) {
    console.error(`No racecard files found for ${dateStamp} ${venue} in ${RACECARD_DIR}`);
    process.exit(1);
  }

  console.log(`=== SCMP Cross-Check: ${date} ${venue} ===\n`);
  console.log(`Found ${files.length} racecard file(s) to verify.\n`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  let totalRaceMM = 0;
  let totalEntryMM = 0;
  let totalEntries = 0;

  // Accumulate per-race data for profile collection
  const allRaceData: { hkjcEntries: SavedEntry[]; scmpByNum: Map<number, ScmpEntry> }[] = [];

  for (const file of files) {
    const saved = loadRaceCard(file);
    const rn = saved.race.raceNumber;
    const hkjcEntries = saved.race.entries.filter((e) => !e.isScratched);

    let scmpData;
    try {
      scmpData = await scrapeScmpRacecard(page, rn);
    } catch (err) {
      console.log(`R${rn}: SKIP — failed to load SCMP page (${(err as Error).message})`);
      continue;
    }

    const { meta, entries: scmpEntries } = scmpData;

    console.log(`R${rn}: ${saved.race.class} | ${saved.race.distance}m | ${saved.race.surface} | ${saved.race.going}`);

    // Race-level comparison
    const raceInfoLines: string[] = [];
    const raceMM = compareRace(saved.race, meta, raceInfoLines);
    for (const m of raceMM) {
      console.log(`  🔴 RACE MISMATCH: ${m.field}  HKJC="${m.hkjc}"  SCMP="${m.scmp}"`);
    }
    for (const line of raceInfoLines) {
      console.log(line);
    }
    totalRaceMM += raceMM.length;

    // Build SCMP lookup by horse number
    const scmpByNum = new Map<number, ScmpEntry>();
    for (const e of scmpEntries) {
      if (!e.isReserve && e.horseNumber > 0) scmpByNum.set(e.horseNumber, e);
    }

    allRaceData.push({ hkjcEntries, scmpByNum });

    // Entry-level comparison
    let raceEntryMM = 0;
    for (const hEntry of hkjcEntries) {
      const sEntry = scmpByNum.get(hEntry.horseNumber);
      totalEntries++;

      if (!sEntry) {
        console.log(`  🔴 #${hEntry.horseNumber} ${hEntry.horse.name} .......... MISSING on SCMP`);
        raceEntryMM++;
        continue;
      }

      const entryMM = compareEntry(hEntry, sEntry);
      if (entryMM.length === 0) {
        console.log(`  🟢 #${hEntry.horseNumber} ${hEntry.horse.name} .......... OK`);
      } else {
        for (const m of entryMM) {
          console.log(`  🔴 #${hEntry.horseNumber} ${hEntry.horse.name}  MISMATCH: ${m.field}  HKJC="${m.hkjc}"  SCMP="${m.scmp}"`);
        }
        raceEntryMM += entryMM.length;
      }
    }

    // Check for SCMP entries not in HKJC (extra horses)
    const hkjcNums = new Set(hkjcEntries.map((e) => e.horseNumber));
    for (const sEntry of scmpEntries) {
      if (!sEntry.isReserve && sEntry.horseNumber > 0 && !hkjcNums.has(sEntry.horseNumber)) {
        console.log(`  🔴 #${sEntry.horseNumber} ${sEntry.horseName} .......... EXTRA on SCMP (not in HKJC)`);
        raceEntryMM++;
      }
    }

    totalEntryMM += raceEntryMM;

    if (raceMM.length === 0 && raceEntryMM === 0) {
      console.log(`  All fields match (${hkjcEntries.length} entries)`);
    } else {
      console.log(`  Summary: ${raceMM.length} race mismatch(es), ${raceEntryMM} entry mismatch(es) out of ${hkjcEntries.length} entries`);
    }
    console.log();
  }

  // --- Jockey & Trainer season stats verification ---
  const profiles = collectProfiles(allRaceData);
  console.log(`Verifying ${profiles.size} unique jockey/trainer profiles...`);
  const { totalMM: statsMM } = await verifyProfiles(page, profiles);

  await browser.close();

  // Final summary
  const totalMM = totalRaceMM + totalEntryMM + statsMM;
  console.log(`\n=== TOTALS ===`);
  console.log(`Races checked: ${files.length}`);
  console.log(`Race-level mismatches: ${totalRaceMM}`);
  console.log(`Entry-level mismatches: ${totalEntryMM}`);
  console.log(`Stats mismatches: ${statsMM}`);
  console.log(`RESULT: ${totalMM === 0 ? "PASS" : `FAIL (${totalMM} mismatch${totalMM > 1 ? "es" : ""})`}`);

  process.exit(totalMM === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(2);
});
