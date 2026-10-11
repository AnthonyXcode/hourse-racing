// npm run data:backfill-odds -- --date YYYY-MM-DD [--dry-run] [--force]
// One-off: for a meeting whose racecards were saved before HKJC opened the win pools (and never got the
// odds refresh, e.g. 2026-09-27 ST), save each race's last momentum snapshot before post time as the card's
// win odds — what the 5-minute odds refresh would have left there. Cards that already have odds are skipped
// unless --force. The card's updated_at moves, so the pre-race analysis recomputes with the new odds.
import { fileURLToPath } from "url";
import { openDb, repo, type DB } from "../momentum/db";
import { raceStore } from "./raceStore";
import type { Venue } from "../../shared/types";

export interface BackfillRow {
  raceId: string;
  status: "saved" | "unchanged" | "would save" | "has odds" | "no card" | "no snapshot";
  horses?: number;
  secsToPost?: number;
}

export function backfillCardOdds(db: DB, date: string, opts: { dryRun?: boolean; force?: boolean } = {}): BackfillRow[] {
  const r = repo(db);
  const store = raceStore(db);
  return r.racesOn(date).map((race): BackfillRow => {
    const key = { date, venue: race.venue as Venue, raceNo: race.race_no };
    const card = store.card(key);
    if (!card) return { raceId: race.race_id, status: "no card" };
    if (!opts.force && Object.keys(card.winOdds ?? {}).length) return { raceId: race.race_id, status: "has odds" };
    // Rows come oldest first; keep the last snapshot taken before post time.
    const before = r.series(race.race_id).filter((x) => x.secs_to_post > 0 && x.win_odds != null);
    const last = before[before.length - 1];
    if (!last) return { raceId: race.race_id, status: "no snapshot" };
    const odds = Object.fromEntries(before.filter((x) => x.fetched_at === last.fetched_at).map((x) => [String(x.horse_no), x.win_odds!]));
    const meta = { horses: Object.keys(odds).length, secsToPost: last.secs_to_post };
    if (opts.dryRun) return { raceId: race.race_id, status: "would save", ...meta };
    return { raceId: race.race_id, status: store.setCardOdds(key, odds) ? "saved" : "unchanged", ...meta };
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = (name: string) => {
    const i = process.argv.indexOf(`--${name}`);
    return i >= 0 ? process.argv[i + 1] : undefined;
  };
  const date = arg("date") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    console.error("usage: npm run data:backfill-odds -- --date YYYY-MM-DD [--dry-run] [--force]");
    process.exit(1);
  }
  const rows = backfillCardOdds(openDb(), date, { dryRun: process.argv.includes("--dry-run"), force: process.argv.includes("--force") });
  if (!rows.length) console.log(`no tracked races on ${date}`);
  for (const x of rows)
    console.log(`${x.raceId.padEnd(16)} ${x.status.padEnd(11)}${x.horses != null ? ` ${x.horses} horses, snapshot ${x.secsToPost}s before post` : ""}`);
}
