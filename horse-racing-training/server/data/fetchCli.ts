// Manual fetch run: `npm run data:fetch -- [flags]`
//   --dry-run            plan only (no scraping, no writes, no network unless --discover)
//   --discover           with --dry-run: also ask HKJC which meetings are listed (one small request)
//   --results-only       skip racecards
//   --cards-only         skip results
//   --date=YYYY-MM-DD --venue=ST|HV   just this meeting
//   --since=YYYY-MM-DD   oldest results date to consider (default: 14 days back)
import { openDb } from "../momentum/db";
import { raceStore } from "./raceStore";
import { runLog } from "./runLog";
import { runFetch, type FetchOptions } from "./fetchJobs";
import { discoverMeetings, openCardsSession, openResultsSession } from "./parent";

const flag = (f: string) => process.argv.includes(`--${f}`);
const arg = (k: string) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split("=")[1];

const date = arg("date"), venue = arg("venue");
if ((date || venue) && !(date && /^\d{4}-\d{2}-\d{2}$/.test(date) && (venue === "ST" || venue === "HV"))) {
  console.error("--date=YYYY-MM-DD and --venue=ST|HV go together");
  process.exit(1);
}
const opts: FetchOptions = {
  dryRun: flag("dry-run"),
  discover: flag("discover"),
  resultsOnly: flag("results-only"),
  cardsOnly: flag("cards-only"),
  since: arg("since"),
  only: date && venue ? { date, venue: venue as "ST" | "HV" } : undefined,
};

const db = openDb();
const store = raceStore(db);
const sum = await runFetch(
  { store, runLog: runLog(db), discover: discoverMeetings, openResults: openResultsSession, openCards: () => openCardsSession(store) },
  "manual",
  opts
);
const fmt = (m: { date: string; venue: string }) => `${m.date} ${m.venue}`;
console.log(`\n${opts.dryRun ? "[dry run] " : ""}discovered: ${sum.discovered.map(fmt).join(", ") || (opts.dryRun && !opts.discover ? "(skipped)" : "none")}${sum.discoverError ? ` (error: ${sum.discoverError})` : ""}`);
console.log(`fixtures: ${sum.fixturesAdded} new meeting(s)${opts.dryRun && sum.fixturesAdded ? " (not saved)" : ""}`);
console.log(`results to fetch (${sum.plan.results.length}): ${sum.plan.results.map((m) => `${fmt(m)} [${m.reason}]`).join(", ") || "none"}`);
console.log(`racecards to fetch (${sum.plan.cards.length}): ${sum.plan.cards.map((m) => `${fmt(m)} ${m.races ? `R${m.races.join(",")}` : "(probe)"}`).join(", ") || "none"}`);
if (!opts.dryRun) {
  for (const r of sum.results) console.log(`  results ${r.meeting}: ${r.races} races${r.changed ? " (updated)" : " (unchanged)"}${r.note ? ` · ${r.note}` : ""}`);
  for (const c of sum.cards) console.log(`  cards ${c.meeting}: ${c.saved} saved, ${c.changed} changed${c.empty.length ? `, empty R${c.empty.join(",")}` : ""}`);
  for (const f of sum.failures) console.log(`  FAILED ${f.what}: ${f.error}`);
  process.exitCode = sum.failures.length ? 1 : 0;
}
db.close();
