#!/usr/bin/env tsx
/**
 * backfill-weight-allowances — add apprentice claims and overweight to saved race cards.
 *
 * raceCard.ts stored the handicap weight (Wt.) but never read the apprentice
 * allowance beside the jockey's name or the Over Wt. column, so every saved card
 * has jockey.weightClaim = 0 and no overweight. The weight a horse carries is
 * Wt. − claim + overweight, which the results files record as Act. Wt.
 *
 * This recovers both from data/historical/results_*.json:
 *   racecard Wt. − Act. Wt. ∈ {2, 3, 5, 7, 10}  → jockey.weightClaim
 *   racecard Wt. − Act. Wt. ∈ {−1 … −4}         → entry.overweight
 * Any other gap (jockey change, scrape error) is left alone and reported.
 * Cards built by make-past-racecard.ts already store Act. Wt., so their gap is 0.
 * Entries that already have a claim or overweight are skipped.
 *
 * Usage:
 *   npx tsx tools/backfill-weight-allowances.ts            # dry run, reports only
 *   npx tsx tools/backfill-weight-allowances.ts --write    # apply
 */

import { readFile, writeFile, readdir } from "fs/promises";
import path from "path";

const RACECARD_DIR = path.join(process.cwd(), "data", "racecards");
const RESULTS_DIR = path.join(process.cwd(), "data", "historical");

/** HKJC apprentice allowances (lb). */
const CLAIMS = new Set([2, 3, 5, 7, 10]);
const MAX_OVERWEIGHT = 4;

interface ResultRunner {
  horseNumber: number;
  horseCode?: string;
  actualWeight?: number;
}

interface ResultRace {
  raceNumber: number;
  finishOrder: ResultRunner[];
}

interface CardEntry {
  horse: { code?: string; name: string };
  jockey: { name: string; weightClaim?: number };
  horseNumber: number;
  weight: number;
  overweight?: number;
  isScratched: boolean;
}

interface Card {
  race: { entries: CardEntry[] };
}

function normaliseCode(code: string | undefined): string {
  return (code ?? "").replace(/%5F/gi, "_").toUpperCase();
}

async function main(): Promise<void> {
  const write = process.argv.includes("--write");
  const files = (await readdir(RACECARD_DIR)).filter((f) => /^racecard_\d{8}_(ST|HV)_R\d+\.json$/.test(f)).sort();

  const resultsCache = new Map<string, ResultRace[] | null>();
  async function loadResults(key: string): Promise<ResultRace[] | null> {
    if (!resultsCache.has(key)) {
      try {
        resultsCache.set(key, JSON.parse(await readFile(path.join(RESULTS_DIR, `results_${key}.json`), "utf-8")));
      } catch {
        resultsCache.set(key, null);
      }
    }
    return resultsCache.get(key) ?? null;
  }

  let claims = 0;
  let overweights = 0;
  let filesChanged = 0;
  let noResults = 0;
  const unexplained = new Map<number, number>();

  for (const file of files) {
    const [, dateStr, venue, raceNoStr] = file.match(/^racecard_(\d{8})_(ST|HV)_R(\d+)\.json$/)!;
    const race = (await loadResults(`${dateStr}_${venue}`))?.find((r) => r.raceNumber === parseInt(raceNoStr!, 10));
    if (!race?.finishOrder?.length) {
      noResults++;
      continue;
    }

    const byCode = new Map(race.finishOrder.map((r) => [normaliseCode(r.horseCode), r]));
    const full = path.join(RACECARD_DIR, file);
    const card: Card = JSON.parse(await readFile(full, "utf-8"));
    let changed = false;

    for (const entry of card.race.entries) {
      if (entry.isScratched || entry.jockey.weightClaim || entry.overweight) continue;
      const runner = byCode.get(normaliseCode(entry.horse.code)) ?? race.finishOrder.find((r) => r.horseNumber === entry.horseNumber);
      if (!runner?.actualWeight) continue;

      const gap = entry.weight - runner.actualWeight;
      if (gap === 0) continue;
      if (CLAIMS.has(gap)) {
        entry.jockey.weightClaim = gap;
        claims++;
        changed = true;
      } else if (gap < 0 && -gap <= MAX_OVERWEIGHT) {
        entry.overweight = -gap;
        overweights++;
        changed = true;
      } else {
        unexplained.set(gap, (unexplained.get(gap) ?? 0) + 1);
      }
    }

    if (!changed) continue;
    filesChanged++;
    if (write) await writeFile(full, JSON.stringify(card, null, 2) + "\n", "utf-8");
  }

  console.log(
    `${write ? "Set" : "Would set"} ${claims} apprentice claim(s) and ${overweights} overweight(s) ` +
      `across ${filesChanged} of ${files.length} race cards.`
  );
  if (unexplained.size > 0) {
    const list = [...unexplained].sort((a, b) => a[0] - b[0]).map(([g, n]) => `${g > 0 ? "+" : ""}${g}lb×${n}`);
    console.log(`Left alone (not a claim or overweight): ${list.join(", ")}`);
  }
  if (noResults > 0) console.log(`${noResults} card(s) skipped: no results file.`);
  if (!write && filesChanged > 0) console.log("Dry run — re-run with --write to apply.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
