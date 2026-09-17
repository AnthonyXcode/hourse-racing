#!/usr/bin/env tsx
/**
 * repair-racecard-draws — fix corrupt horseNumber / draw in saved race cards.
 *
 * Two scraper bugs wrote wrong saddle-cloth numbers and barrier draws into
 * data/racecards/*.json:
 *
 *   1. pastRaceResults.ts assigned Pla./Horse No./Dr. by scanning for "the next
 *      integer in 1-14". HKJC writes a dead heat as "1 DH", which failed that
 *      test, so every later field shifted one column and the Dr. value landed in
 *      horseNumber. Every dead-heater in the archive is affected.
 *   2. raceCard.ts defaulted draw to horseNumber and kept that value when the
 *      "Dr." column could not be located, producing draw === horseNumber rows.
 *
 * Both are fixed at the source now. This repairs the already-written files using
 * data/historical/results_*.json as ground truth — those come from historical.ts,
 * which reads columns by header and was never affected.
 *
 * Entries are matched on horse code first, then on name. Only horseNumber, draw,
 * isScratched and missing winOdds keys are touched; nothing else is rewritten.
 *
 * Usage:
 *   npx tsx tools/repair-racecard-draws.ts              # dry run, reports only
 *   npx tsx tools/repair-racecard-draws.ts --write      # apply the fixes
 *   npx tsx tools/repair-racecard-draws.ts --write -f racecard_20260318_HV_R1.json
 */

import { readFile, writeFile, readdir } from "fs/promises";
import path from "path";

const RACECARD_DIR = path.join(process.cwd(), "data", "racecards");
const RESULTS_DIR = path.join(process.cwd(), "data", "historical");

interface ResultRunner {
  horseNumber: number;
  draw?: number;
  finishPosition: number;
  horseName?: string;
  horseCode?: string;
  winOdds?: number;
}

interface ResultRace {
  raceNumber: number;
  finishOrder: ResultRunner[];
}

interface CardEntry {
  horse: { code?: string; name: string };
  horseNumber: number;
  draw: number;
  isScratched: boolean;
}

interface Card {
  race: { entries: CardEntry[] };
  winOdds?: Record<string, number>;
}

interface Change {
  horse: string;
  field: string;
  from: unknown;
  to: unknown;
}

// ----------------------------------------------------------------------------

function normaliseName(name: string): string {
  return name.replace(/\s*\([A-Z]\d+\)\s*$/, "").replace(/\s+/g, " ").trim().toUpperCase();
}

function normaliseCode(code: string | undefined): string {
  return (code ?? "").replace(/%5F/gi, "_").toUpperCase();
}

/** Repair one card against its results race. Mutates `card`, returns the changes made. */
function repairCard(card: Card, race: ResultRace): Change[] {
  const changes: Change[] = [];

  const byCode = new Map<string, ResultRunner>();
  const byName = new Map<string, ResultRunner>();
  for (const runner of race.finishOrder) {
    const code = normaliseCode(runner.horseCode);
    if (code) byCode.set(code, runner);
    if (runner.horseName) byName.set(normaliseName(runner.horseName), runner);
  }

  const matched = new Set<ResultRunner>();
  const unmatched: CardEntry[] = [];

  for (const entry of card.race.entries) {
    const runner =
      byCode.get(normaliseCode(entry.horse.code)) ?? byName.get(normaliseName(entry.horse.name));

    if (!runner) {
      unmatched.push(entry);
      continue;
    }
    matched.add(runner);

    if (entry.horseNumber !== runner.horseNumber) {
      changes.push({ horse: entry.horse.name, field: "horseNumber", from: entry.horseNumber, to: runner.horseNumber });
      entry.horseNumber = runner.horseNumber;
    }
    if (runner.draw !== undefined && runner.draw >= 1 && entry.draw !== runner.draw) {
      changes.push({ horse: entry.horse.name, field: "draw", from: entry.draw, to: runner.draw });
      entry.draw = runner.draw;
    }
    if (entry.isScratched) {
      // It finished the race, so it was not scratched.
      changes.push({ horse: entry.horse.name, field: "isScratched", from: true, to: false });
      entry.isScratched = false;
    }
  }

  // A declared runner missing from the results did not start.
  for (const entry of unmatched) {
    if (!entry.isScratched) {
      changes.push({ horse: entry.horse.name, field: "isScratched", from: false, to: true });
      entry.isScratched = true;
    }
  }

  // A single scratching leaves exactly one saddle-cloth number unaccounted for,
  // so it can be recovered. With more than one, it cannot — leave those alone.
  if (unmatched.length === 1) {
    const used = new Set(card.race.entries.filter((e) => e !== unmatched[0]).map((e) => e.horseNumber));
    const free: number[] = [];
    for (let n = 1; n <= card.race.entries.length; n++) if (!used.has(n)) free.push(n);
    const entry = unmatched[0]!;
    if (free.length === 1 && entry.horseNumber !== free[0]) {
      changes.push({ horse: entry.horse.name, field: "horseNumber", from: entry.horseNumber, to: free[0] });
      entry.horseNumber = free[0]!;
    }
  }

  // Win odds are keyed by saddle-cloth number, so renumbering can leave gaps.
  // Only fill keys that are absent; never overwrite an odds value already saved.
  if (card.winOdds) {
    for (const runner of race.finishOrder) {
      const key = String(runner.horseNumber);
      if (card.winOdds[key] === undefined && runner.winOdds !== undefined && runner.winOdds > 0) {
        changes.push({ horse: runner.horseName ?? key, field: `winOdds[${key}]`, from: undefined, to: runner.winOdds });
        card.winOdds[key] = runner.winOdds;
      }
    }
  }

  return changes;
}

// ----------------------------------------------------------------------------

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const write = argv.includes("--write");
  const onlyIdx = Math.max(argv.indexOf("-f"), argv.indexOf("--file"));
  const only = onlyIdx >= 0 ? argv[onlyIdx + 1] : undefined;

  const files = (await readdir(RACECARD_DIR))
    .filter((f) => /^racecard_\d{8}_(ST|HV)_R\d+\.json$/.test(f))
    .filter((f) => !only || f === only)
    .sort();

  const resultsCache = new Map<string, ResultRace[] | null>();
  async function loadResults(dateStr: string, venue: string): Promise<ResultRace[] | null> {
    const key = `${dateStr}_${venue}`;
    if (!resultsCache.has(key)) {
      try {
        resultsCache.set(key, JSON.parse(await readFile(path.join(RESULTS_DIR, `results_${key}.json`), "utf-8")));
      } catch {
        resultsCache.set(key, null);
      }
    }
    return resultsCache.get(key) ?? null;
  }

  let filesChanged = 0;
  let totalChanges = 0;
  let noResults = 0;

  for (const file of files) {
    const m = file.match(/^racecard_(\d{8})_(ST|HV)_R(\d+)\.json$/)!;
    const [, dateStr, venue, raceNoStr] = m;

    const results = await loadResults(dateStr!, venue!);
    const race = results?.find((r) => r.raceNumber === parseInt(raceNoStr!, 10));
    if (!race || !Array.isArray(race.finishOrder) || race.finishOrder.length === 0) {
      noResults++;
      continue;
    }

    const full = path.join(RACECARD_DIR, file);
    const card: Card = JSON.parse(await readFile(full, "utf-8"));
    const changes = repairCard(card, race);
    if (changes.length === 0) continue;

    filesChanged++;
    totalChanges += changes.length;
    console.log(`\n${file}  (${changes.length} change${changes.length === 1 ? "" : "s"})`);
    for (const c of changes) {
      console.log(`  ${c.horse}: ${c.field} ${c.from ?? "—"} → ${c.to}`);
    }

    if (write) await writeFile(full, JSON.stringify(card, null, 2) + "\n", "utf-8");
  }

  console.log(
    `\n${write ? "Repaired" : "Would repair"} ${totalChanges} field${totalChanges === 1 ? "" : "s"} ` +
      `across ${filesChanged} of ${files.length} race card${files.length === 1 ? "" : "s"}.`
  );
  if (noResults > 0) console.log(`${noResults} card(s) skipped: no results file to verify against.`);
  if (!write && totalChanges > 0) console.log("Dry run — re-run with --write to apply.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
