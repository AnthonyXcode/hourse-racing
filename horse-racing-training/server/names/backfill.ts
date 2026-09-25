// npm run names:backfill [-- --limit N]
// 1. Seed English names for every code in the data files (source 'data-file').
// 2. Walk races with results, newest first, fetching each Chinese results page (1 per second)
//    until every race/horse/jockey/trainer code has a Chinese name. Resumable: a race whose page
//    keys all already have a fresh Chinese name is skipped, so stop any time and run it again.
// 3. Horses/trainers still missing (no results page lists them) try their profile page.
// 4. Print coverage per kind.
import { openDb } from "../momentum/db";
import { keyOf, nameStore } from "./store";
import { getNameIndex } from "./nameIndex";
import { pageClient } from "./hkjcPages";
import { createRefresher } from "./refresher";

const arg = (name: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
const limit = Number(arg("limit") ?? Infinity);

const store = nameStore(openDb());
const index = getNameIndex();
const refresher = createRefresher({ store, index: () => index, pages: pageClient(), log: () => {} });

const seeded = store.seedMissing(index.keys.map((k) => ({ ...k, nameEn: index.en.get(keyOf(k)) ?? null, nameZh: null })), "data-file");
console.log(`seeded ${seeded} English names (${index.keys.length} codes known)`);

let fetched = 0;
const started = Date.now();
for (const { raceId, keys } of index.resultRaces) {
  if (fetched >= limit) break;
  if (!store.staleOrMissing(keys).length) continue; // this page has nothing new to give
  refresher.enqueue([{ kind: "race", code: raceId }]);
  await refresher.idle();
  fetched++;
  const missing = store.staleOrMissing(index.keys).length;
  console.log(`${String(fetched).padStart(4)}  ${raceId}  ${refresher.state.lastError && refresher.state.failed ? "(error) " : ""}still missing ${missing}`);
  if (!missing) break;
}

// Leftovers not covered by any results page.
if (fetched < limit) {
  const rest = store.staleOrMissing(index.keys).filter((k) => k.kind === "horse" || k.kind === "trainer");
  if (rest.length) {
    console.log(`profile pages for ${rest.length} horses/trainers not on any results page…`);
    refresher.enqueue(rest.slice(0, Math.max(0, limit - fetched)));
    await refresher.idle();
  }
}

console.log(`\n${fetched} results pages in ${Math.round((Date.now() - started) / 1000)} s · ${refresher.state.failed} failures`);
console.log("coverage (codes with a Chinese name / known codes):");
for (const [kind, c] of Object.entries(store.coverage()))
  console.log(`  ${kind.padEnd(8)} ${String(c.zh).padStart(5)} / ${String(c.total).padEnd(5)} ${c.total ? ((100 * c.zh) / c.total).toFixed(1) : "–"}%`);
