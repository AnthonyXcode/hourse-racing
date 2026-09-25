# HKJC Bet Trainer

Local practice tool. Pick a past HKJC meeting, build a bet (any pool, with 膽拖 bankers),
see the cost, submit, and get graded HIT/MISS + payout against the real historical result.

Race cards and results live in the app's SQLite database (`data/momentum.sqlite`), loaded once
from the parent repo's JSON files and kept current by a scheduled fetch — see [Data transfer](#data-transfer).

## Run

```bash
npm install
cp .env.example .env    # optional — defaults are used if absent
npm run dev             # Vite UI on WEB_PORT (5173), API on PORT (8787), proxied
```

Open http://localhost:5173. Pick a racing day → race tab (default R1) → bet type →
click horses to pick (click again = banker 膽 for banker pools, again = clear) →
cost updates live → Place bet → HIT/MISS modal.

**Win / Place** and **Trio** tabs show how the race analyzer (form rating + Monte Carlo,
5,000 runs, seeded per race) performed against real results. Opening either tab runs the
analysis for the date range at the top (default: last 12 months) via `GET /api/analyzer`;
the server imports the parent repo's `src/` engine directly. A cold 12-month run takes
~15 s; per-race results are cached in memory until the racecard or results file changes.
All filters, charts and tables are computed in the browser from that payload.

**Momentum** tab tracks pre-race market moves. On a race day the server snapshots HKJC
WIN/PLA odds and pool totals every 30 s, starting 30 min before each race's post time, into
SQLite (`data/momentum.sqlite`, gitignored). After the result is posted it stores the finishing order.
The tab shows a live odds chart and movers list for each race. Over finished races it compares
win and place hit rates by momentum bucket against the rates implied by the final odds, split by
final-odds band. The collector only records while the server is running, so keep it under pm2 on race days.
Odds come from HKJC's GraphQL API (`info.cld.hkjc.com`). The API accepts only queries on its whitelist,
so `server/momentum/queries/*.graphql` are exact copies of the queries bet.hkjc.com sends. Don't edit them.
If HKJC changes them, capture the new ones from the browser's network tab.

Production (single process serving built SPA + API):

```bash
npm run build && npm start    # http://localhost:8787
```

## Ports

Both ports are set in `.env` (copy `.env.example`). `.env` is gitignored.

| Variable | Default | What it is |
|----------|---------|------------|
| `PORT` | `8787` | Backend. The Express API, and in production the built SPA too — **this is the production port**. |
| `WEB_PORT` | `5173` | Frontend. The Vite dev server, `npm run dev` only. Unused in production. |

`WEB_PORT` proxies `/api` to `PORT`, so changing `PORT` keeps dev working — there is no
second place to update.

**Precedence:** a real environment variable always beats `.env`, so a one-off still works:

```bash
PORT=9000 npm start
```

Both are read at startup only. The server loads `.env` via `--env-file-if-exists`
(missing file is fine); Vite reads it through `loadEnv`. Restart after editing.

## Deployment (pm2)

Assumes Node.js 22 and pm2 are already on the machine. Run everything from this folder —
pm2 records the cwd, and the server reads the parent repo's data via `../data/...`.

**1. Configure**

```bash
npm ci
cp .env.example .env    # set PORT; keep TZ=Asia/Hong_Kong
```

**2. Build**

```bash
npm run build
```

Required, not optional: `server/index.ts` mounts the SPA only `if (existsSync(dist))`.
Skip it and you get a working `/api` with a 404 at `/`.

**3. Start**

```bash
pm2 start "npm start" --name horse-racing-training
pm2 save && pm2 startup      # start on boot — run the command pm2 prints

curl http://localhost:8787/api/meetings    # or whatever PORT you set
```

**4. Update**

```bash
git pull && npm ci && npm run build
pm2 restart horse-racing-training
```

Logs: `pm2 logs horse-racing-training`

**Notes**
- To change the port after deploying, edit `PORT` in `.env` and
  `pm2 restart horse-racing-training`. No `--update-env` needed: the app reads `.env` at
  startup, so pm2 never caches the value. (`--update-env` is only for variables passed to
  pm2 itself, e.g. `PORT=8788 pm2 start ...`.)
- If you also run `npm run dev` on the same machine, give production a different `PORT`
  (e.g. 8788) — otherwise the dev API and the deployed server fight over 8787. The parent
  repo's API uses 3000.
- `npm start` runs the TypeScript directly with `tsx`, so there is no server build step —
  only the SPA needs building. Going through the npm script also means the app does not
  depend on which Node pm2 was installed under.
- Run a single instance: the meeting manifest is an in-memory cache.
- Keep `TZ=Asia/Hong_Kong` in `.env`: on a UTC host, race dates come out a day early.

## Data transfer

How data gets into the app, how it stays current, and how to move it to another machine.

### Where it lives

Everything the app serves is in one SQLite file, **`data/momentum.sqlite`** (gitignored).
Practice-bet history is the one exception: **`history.json`** in this folder.

| Table | Contents | Filled by |
|-------|----------|-----------|
| `racecards` | one row per race: the race card JSON (`{ race, winOdds }`) | import, racecard fetch |
| `meeting_results` | one row per meeting: results + dividends JSON | import, results fetch |
| `data_docs` | small documents, e.g. `fixtures` (HKJC fixture list) | import, fetch |
| `races`, `runners`, `snapshots`, `ticks`, `results`, `dividends` | Momentum: race-day odds snapshots and outcomes | odds poller (race days) |
| `entity_names` | Chinese names of horses, jockeys, trainers and races | names refresher |
| `fetch_runs` | log of every scheduled / manual fetch | fetch job |

The schema is created and migrated automatically on first start (`PRAGMA user_version`).
The JSON in `racecards` / `meeting_results` has exactly the shape of the old files (see
`shared/types.ts`), so nothing downstream depends on where it came from.

### 1. One-time import from the parent repo's files

Copies `../data/racecards/*.json`, `../data/historical/results_*.json` and
`../data/historical/fixtures.json` into the database:

```bash
npm run data:import                      # from ../data (default)
npm run data:import -- --dir /path/to/data   # any folder with racecards/ and historical/
```

It is idempotent — re-running only rewrites documents whose content changed — so it is also
the way to push in files produced by the parent repo's own CLI tools. After the import the app
no longer reads those folders.

### 2. Keeping it current: the scheduled fetch

With **`DATA_FETCH=1`** in `.env` the server fetches from HKJC every 2 hours between
**08:00 and 00:00 Hong Kong time** (08, 10, … 22, 00). If it starts inside that window and the
last successful run is over 2 hours old, it runs once immediately. Runs never overlap.

Each run:
- **Results** — meetings from the last 14 days with no results yet (and today's / yesterday's
  if incomplete), scraped with the parent repo's `HistoricalScraper` plus Double/Triple Trio
  dividends, written straight to `meeting_results`.
- **Race cards** — local meetings (ST / HV) from today to 2 days ahead, races not yet started,
  scraped with the parent repo's race card scraper and enrichers, written to `racecards`.
  Upcoming meetings come from HKJC's live meeting list; overseas simulcasts are ignored.

Requirements: the parent repo checked out at `..` (its `src/` scrapers are imported) and
Playwright's Chromium installed there (`cd .. && npx playwright install chromium`).
`DATA_FETCH` is read at startup, so restart the server after changing it. Leave it off on
development copies — `npm run dev` restarts on every save and would interrupt scrapes.

Manual runs (same code path, logged in `fetch_runs`):

```bash
npm run data:fetch -- --dry-run --discover     # show what would be fetched; no scraping
npm run data:fetch                             # results + race cards now
npm run data:fetch -- --cards-only --date=2026-09-27 --venue=ST   # one meeting's race cards
npm run data:fetch -- --results-only --since=2026-09-01           # widen the results window
```

Status: `GET /api/data/status` → whether a run is in progress, the next run time, the last 10 runs.

### 3. Other background data

- **Odds (Momentum)** — on race days the server polls HKJC every 30 s from 30 min before each
  race (`MOMENTUM_POLLER`, `MOMENTUM_INTERVAL_S`, `MOMENTUM_WINDOW_MIN`). Only while the server runs.
- **Chinese names** — refreshed in the background, one HKJC page per second, and again when a
  record is over 7 days old (`NAMES_REFRESH=0` turns it off, `NAME_TTL_DAYS` changes the age).
  First fill on a new database: `npm run names:backfill` (about 15 min; resumable;
  `-- --limit N` for a trial run).

### 4. Moving the data to another machine

The database runs in WAL mode, so a plain copy of `momentum.sqlite` while the server is running
can miss recent writes. Either stop the server first and copy all three files
(`momentum.sqlite`, `-wal`, `-shm`), or take an online backup:

```bash
# on the old machine (server may keep running)
sqlite3 data/momentum.sqlite ".backup 'momentum-backup.sqlite'"
cp history.json history-backup.json

# on the new machine, with the server stopped
cp momentum-backup.sqlite data/momentum.sqlite
cp history-backup.json history.json
```

Then start the server as usual; missing migrations are applied on start. Alternatively start
from an empty database and rebuild it: `npm run data:import` (race cards + results from the
parent repo's files), `npm run names:backfill` (Chinese names) and `DATA_FETCH=1` for anything
newer. Momentum odds history can't be rebuilt — it only exists in the database it was recorded in.

## Bet types

Win, Place, Quinella, Quinella Place, Trio, Tierce, First 4 (single race);
Double Trio, Triple Trio (multi-race — leg races taken from the result file's
designated legs; disabled for meetings without them).

## Architecture

```
server/   Express API (SQLite in data/momentum.sqlite: race cards, results, odds, names)
shared/   types + betEngine (combinatorics, dead-heat-aware settlement) — imported by server AND client
src/      React + TS SPA (HKJC-style race card, banker/leg picker, cost bar, result modal)
```

Settlement runs server-side; the client imports `cost()` for the live preview.
Single source of truth for combinatorics in `shared/betEngine`.

## Tests

```bash
npm test
```

Covers combinatorics, dead-heat trio settlement, the place field-size rule (≤6 → 2 places),
missing-dividend handling (hit with unknown payout, not $0), every pool's hit/miss,
and real-data settlement (ST 2026-06-27: R11 trio $854, Double Trio $380,689).
