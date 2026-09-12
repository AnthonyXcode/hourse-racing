# HK Horse Racing AI

AI-assisted Hong Kong horse racing analysis and betting recommendation system.

## Overview

This project provides tools to:
- **Scrape** race data from HKJC (Hong Kong Jockey Club)
- **Fetch live odds** for upcoming races
- **Analyze** horse performance using speed ratings, form analysis, and jockey/trainer statistics
- **Simulate** race outcomes using Monte Carlo methods
- **Recommend** value bets with Kelly Criterion staking

## Architecture

```mermaid
flowchart TB
    subgraph data [Data Collection]
        Scraper[HKJC Scraper]
        RaceCard[Race Card Parser]
        OddsFetcher[Live Odds Fetcher]
        Historical[Historical Results]
    end
    
    subgraph analysis [Analysis Engine]
        SpeedRating[Speed Rating Calculator]
        FormAnalysis[Form Analyzer]
        JockeyTrainer[Jockey/Trainer Stats]
    end
    
    subgraph prediction [Prediction Layer]
        OddsFilter[Odds Range Filter]
        Simulation[Monte Carlo Simulator]
        Probability[Win/Place Probabilities]
    end
    
    subgraph betting [Betting Recommendations]
        ValueCalc[Value Calculator]
        BetSelector[Bet Type Selector]
        StakeCalc[Kelly Criterion Staking]
    end
    
    data --> analysis
    analysis --> prediction
    prediction --> betting
```

## Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browser
npx playwright install chromium

# Fetch current odds for a race meeting
npx tsx tools/fetch-odds.ts --date=2026-02-01 --venue=ST

# Analyze a specific race
npx tsx tools/analyze-race.ts --date=2026-02-01 --venue=ST --race=8
```

## CLI Tools

### Fetch Current Odds

Fetch live win/place odds from HKJC betting site.

```bash
# Fetch all races for a meeting
npx tsx tools/fetch-odds.ts --date=2026-02-01 --venue=ST

# Fetch specific race only
npx tsx tools/fetch-odds.ts --date=2026-02-01 --venue=ST --race=8

# Output as JSON
npx tsx tools/fetch-odds.ts --date=2026-02-01 --venue=ST --json

# Save to file
npx tsx tools/fetch-odds.ts --date=2026-02-01 --venue=ST --save
```

**Output:**
```
RACE 8
────────────────────────────────────────────────────────────────────
 # | Horse                    | Jockey          | WIN   | PLACE | Status
────────────────────────────────────────────────────────────────────
 1 | SAGACIOUS LIFE           | Z Purton        |   3.6 |   2.3 | ✓ WIN
 3 | INVINCIBLE IBIS          | H Bowman        |   2.9 |   1.5 | ✓ WIN
 4 | BEAUTY BOLT              | J McDonald      |   8.3 |   2.3 | -

SELECTIONS IN WIN RANGE (2.0-7.0):
  R8 #1 SAGACIOUS LIFE @ 3.6
  R8 #3 INVINCIBLE IBIS @ 2.9
```

**Output:**
```
ELITE TIER (Win % > 15%):
  ⭐ PZ Z Purton - 22.19%
  ⭐ MCJ J McDonald - 16.67%

STRONG TIER (Win % 10-15%):
  ✓ BH H Bowman - 12.11%
```

### Analyze Race

Run full analysis with Monte Carlo simulation.

```bash
npx tsx tools/analyze-race.ts --date=2026-02-01 --venue=ST --race=8
```

### Scrape Single Race Result

Scrape historical race results.

```bash
npx tsx tools/scrape-single-race.ts --date=2026-01-19 --venue=ST --race=1
```

### Scrape Full Meeting

Scrape all races from a meeting.

```bash
npx tsx tools/scrape-meeting.ts --date=2026-01-19 --venue=ST
```

## Project Structure

```
hourse-racing/
├── src/
│   ├── scrapers/           # HKJC data scrapers
│   ├── analysis/           # Statistical analysis modules
│   ├── simulation/         # Race simulation engine
│   ├── betting/            # Bet recommendation logic
│   ├── types/              # TypeScript interfaces
│   └── utils/              # Helper functions
├── tools/
│   ├── fetch-odds.ts       # Live odds fetcher
│   ├── analyze-race.ts     # Race analysis CLI
│   ├── scrape-single-race.ts
│   └── scrape-meeting.ts
├── data/
│   ├── historical/         # Past race results
│   └── odds/               # Saved odds snapshots
├── prompts/                # AI prompts for analysis
├── rules/                  # Cursor rules
└── skills/                 # Agent skills (shared by Claude Code + Cursor)
    ├── trio-strategy/      # Trio (單T) 5-step pipeline
    ├── trio-daily-run/     # Scheduled race-day check + per-race report fan-out
    ├── post-race-review/   # Results, P&L, learnings
    ├── verify-racecard/    # Racecard vs SCMP cross-check
    └── research-notes/     # Write findings to notes/
```

### Shared skills directory

`.claude/skills/` holds the real skill files — one source of truth for both agents:

```
.claude/skills/     <- real directory (Claude Code reads this)
skills/             -> .claude/skills      (convenience path used in docs)
.cursor/skills/     -> ../.claude/skills   (Cursor reads this)
```

Add or edit a skill under any of the three paths and both Claude Code and Cursor pick it up —
no copying, no sync step. Claude Code's skill loader does not follow a symlinked
`.claude/skills`, which is why the real files live there rather than at the repo root.
Do not replace either symlink with a real directory.

New skills are discovered on the next session start.

## HKJC Data Sources

### Race Card
```
https://racing.hkjc.com/en-us/local/information/racecard?RaceDate={date}&Racecourse={venue}&RaceNo={race}
```
- **Date format**: `YYYY/MM/DD`
- **Venue**: `ST` (Sha Tin) or `HV` (Happy Valley)
- **Returns**: Entries, draws, weights, jockeys, trainers, last 6 runs

### Current Odds (Live)
```
https://bet.hkjc.com/en/racing/wp/{date}/{venue}/{race}
```
- **Date format**: `YYYY-MM-DD`
- **Returns**: Live win/place odds
- **Note**: Requires JavaScript rendering (use `fetch-odds.ts` tool)

### Horse Profile
```
https://racing.hkjc.com/en-us/local/information/horse?HorseId={horseCode}
```
- **Parameter**: Full horse code (e.g., `HK_2024_K129`)
- **Returns**: Stats, past performances, going record, distance wins

### Jockey Statistics
```
https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId={jockeyCode}
```
- **Parameter**: Jockey code (e.g., `PZ` for Z Purton)
- **Returns**: Season stats, win %, venue/distance breakdown

### Race Results (Historical)
```
https://racing.hkjc.com/en-us/local/information/localresults?RaceDate={date}
```
- **Returns**: Finish order, dividends, times

## Betting Strategy

### Edge Detection
```
Edge = Model Probability - Market Probability

Required: Edge > 5% to place bet
```

### Kelly Staking Constraints
```
Max per bet: 5% of bankroll
Max per race: 10% of bankroll
Max per meeting: 40% of bankroll
```

## Horse Code Format

Pattern: `HK_{year}_{brandCode}`

| Example | Description |
|---------|-------------|
| `HK_2024_K129` | Imported 2024, brand K129 |
| `HK_2023_J157` | Imported 2023, brand J157 |

## Betting Workflow

```mermaid
flowchart LR
    A[1. Fetch Odds] --> B[2. Filter by Range]
    B --> C[3. Analyze Form]
    C --> D[4. Monte Carlo Sim]
    D --> E[5. Calculate Edge]
    E --> F[6. Kelly Stakes]
    F --> G[7. Generate Bets]
```

### Complete 7-Step Process

1. **Fetch current odds** using `fetch-odds.ts`
2. **Filter horses** by odds range (WIN: 2.0-7.0, PLACE: 5.0-15.0)
3. **Analyze form** - speed ratings, recent form, class trajectory
4. **Run Monte Carlo simulation** - 10,000 iterations for win/place probabilities
5. **Calculate edge** - Model probability vs market odds (require >15%)
6. **Apply Kelly staking** - Optimal bet sizing with bankroll constraints
7. **Generate betting slip** with stakes and reasoning

See `skills/bet-recommendation/SKILL.md` for detailed workflow.

## Simulation Process

```mermaid
flowchart LR
    Input[Horse Ratings] --> Variance[Add Random Variance]
    Variance --> Race[Simulate Race]
    Race --> Record[Record Positions]
    Record --> Check{10,000 runs?}
    Check -->|No| Variance
    Check -->|Yes| Output[Calculate Probabilities]
```

## Value Detection

```mermaid
flowchart TB
    Model[Model Probability] --> Compare{Edge > 15%?}
    Market[Market Odds] --> Compare
    Compare -->|Yes| Kelly[Calculate Kelly Stake]
    Compare -->|No| Pass[No Bet]
```

## REST API

Express server (`src/server/`) exposing the analysis to other sites. Every route requires an API key.

```bash
# 1. Configure keys (.env is gitignored)
cp .env.example .env
# set API_KEYS in .env — generate with: openssl rand -hex 32
# multiple keys: API_KEYS=key-for-site-a,key-for-site-b

# 2. Run
npm run dev:api          # watch mode
npm run build && npm run start:api

# 3. Call
curl -H "x-api-key: $API_KEY" http://localhost:3000/health
curl -H "Authorization: Bearer $API_KEY" http://localhost:3000/health
```

| Method | Path | Response |
|--------|------|----------|
| GET | `/health` | `{ status, uptime, timestamp, version }` |
| POST | `/v1/analyses` | Race analysis as JSON (see below) |
| POST | `/v1/backtests/differentiation` | Differentiation backtest report as JSON (see below) |
| POST | `/v1/batch-analyses` | Whole-meeting analysis as JSON (see below) |

Errors are JSON: `400 {"error":"invalid_request","details":[…]}`, `401 {"error":"unauthorized"}`,
`404 {"error":"not_found"}` or `{"error":"race_not_found","message":…}`.

### POST /v1/analyses

Runs the same pipeline as `tools/analyze-race.ts` (shared code in `src/pipeline/raceAnalysis.ts`)
and returns the result as JSON.

```bash
curl -X POST http://localhost:3000/v1/analyses \
  -H "x-api-key: $API_KEY" -H "Content-Type: application/json" \
  -d '{"date":"2026-09-09","venue":"HV","race":7,"formData":"all"}'
```

| Field | Required | Default | CLI equivalent |
|-------|----------|---------|----------------|
| `date` | yes | — | `--date` (`YYYY-MM-DD`) |
| `venue` | yes | — | `--venue` (`ST`, `HV`, `Sha Tin`, `Happy Valley`) |
| `race` | yes | — | `--race` (1–14) |
| `formData` | no | `"venue"` | `--form-data all` → `"all"` |
| `useSaved` | no | `false` | `--use-saved` |
| `bankroll` | no | `10000` | `--bankroll` |
| `kellyFraction` | no | `0.25` | `--kelly` |
| `minEdge` | no | `5` | `--min-edge` |
| `ignoreRecords` | no | `[]` | `--ignore-records` (as an array) |

Response: `{ cache, generatedAt, params, result }`. `result` holds `race`, `runners` (odds, jockey/trainer
stats), `simulation` (win/place %, rating diff), `analysis` (form factors), `recommendations` (bets, stakes,
top picks), `exotics` (top 20 quinella / quinella place / trio / tierce with fair odds), `finishTimes` and
`marketEfficiency`.

**Caching**: results are saved to `data/analysis/<ST|HV>-<date>-<race>.json`.
- **Miss** (no file, or a file made with different options): runs the analysis, saves it, returns it
  (`"cache": "miss"`). Live runs scrape HKJC and can take minutes, so give the client a long timeout.
- **Hit**: returns the saved file immediately (`"cache": "hit"`) and re-runs the analysis in the background
  to update the file. If the refresh fails, the old file stays.

Analyses run one at a time by default (`ANALYSIS_MAX_CONCURRENT`) because live runs launch Chromium.

### POST /v1/backtests/differentiation

Runs `tools/backtest-differentiation.ts` over saved racecards that have results and returns the report as JSON
(shared code in `src/backtest/differentiationReport.ts`). Every field is optional; defaults match the CLI.

```bash
curl -X POST http://localhost:3000/v1/backtests/differentiation \
  -H "x-api-key: $API_KEY" -H "Content-Type: application/json" \
  -d '{"sparseMax":3,"closeMax":2,"avgDiffMin":15,"gapMin":1,"venue":"HV","surface":"Turf","form":"all"}'
```

| Field | Default | CLI flag |
|-------|---------|----------|
| `sparseMax` | `3` | `--sparse` |
| `closeMax` | `4` | `--close` |
| `avgDiffMin` | `14` | `--avgdiff` |
| `gapMin` | `0` | `--gap` |
| `oddsMax` | `0` (off) | `--odds` |
| `ratingChangeMin` | `-1` (`null` = off) | `--ratingchange` |
| `months` | `[]` (all) | `--months` (as an array, e.g. `["08","09"]`) |
| `venue` | `null` (both) | `--venue` (`ST` / `HV`) |
| `surface` | `null` (both) | `--surface` (`Turf` / `AWT`) |
| `ignoreClasses` | `[]` | `--ignore-class` (as an array) |
| `ignoreDistances` | `[]` | `--ignore-distance` (array of metres) |
| `maxRating` | `0` (off) | `--max-rating` |
| `maxAvgDiff` | `0` (off) | `--max-avgdiff` |
| `form` | `"all"` | `--form` (`all` / `ST` / `HV`) |
| `ignoreAfter` | `null` | `--ignore-after` (`YYYY-MM-DD`) |

`result` holds `totals`, `races` (one row per race: BET/SKIP, pick, finish, odds, metrics), `byDay` and `byMonth`
(hit rate, win/place ROI, all-up place), `breakdowns` (going, runners, MC place %, win odds, expected position, rating,
avg diff, top-two gap, close<8, rating change, plus venue and surface unless both are filtered), `classDistanceVenue`,
`skipReasons` and `upcoming` (racecards without results yet). Percentages are numbers, `null` when there were no bets.
Cached as `data/analysis/backtest-differentiation-<hash>.json`, one file per option set.

### POST /v1/batch-analyses

Runs `tools/batch-analyze.ts` for a meeting and returns every race as JSON (shared code in
`src/pipeline/batchAnalysis.ts`). Unlike the CLI it does not write `data/temp/simulation_summaries_*.md`.

```bash
curl -X POST http://localhost:3000/v1/batch-analyses \
  -H "x-api-key: $API_KEY" -H "Content-Type: application/json" \
  -d '{"date":"2026-09-09","venue":"HV","firstRace":1,"lastRace":9,"formData":"all","useSaved":true}'
```

| Field | Required | Default | CLI flag |
|-------|----------|---------|----------|
| `date` | yes | — | `-d` (`YYYY-MM-DD`) |
| `venue` | yes | — | `-v` (`ST`, `HV`, `Sha Tin`, `Happy Valley`) |
| `firstRace`, `lastRace` | no | `1`, `11` | `-r 1-11` |
| `formData` | no | `"venue"` | `-f all` → `"all"` |
| `useSaved` | no | `false` | `--use-saved` |
| `backtestMonths` | no | `[]` (all) | `--backtest-months` (as an array) |

`result.races` has one entry per race: top-rated horse, rating, avgDiff / close<8 / sparse / top gap, betting signal
(🔴 / 🟡 / 🟢 from historical place hit rates), the hit rates overall / same class / same distance (as text and as
numbers), confidence, and every runner's MC win/place %, odds and rating. `result.unavailable` lists races with no data.
Cached as `data/analysis/batch-<ST|HV>-<date>-R<first>-<last>.json`.

All three endpoints share the cache directory, the hit/miss behaviour above and the `ANALYSIS_MAX_CONCURRENT` cap.

Keys are only accepted in headers, never the query string. Call the API server-to-server —
a key embedded in browser JavaScript is visible to anyone.

**Postman**: import `docs/hk-horse-racing-api.postman_collection.json` and an environment from `docs/`, then select
the environment. `baseUrl` and `apiKey` live only in the environment:
- `hk-horse-racing-api.postman_environment.json` — template to commit; paste a key from `API_KEYS` into `apiKey`
- `hk-horse-racing-api.local.postman_environment.json` — holds a real key; gitignored, keep it local

## Environment Variables

```bash
# Set Playwright browser path if needed
export PLAYWRIGHT_BROWSERS_PATH=/Users/you/Library/Caches/ms-playwright
```

API server (`.env`, see `.env.example`):

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `API_KEYS` | yes | — | Comma-separated, min 32 chars each |
| `PORT` | no | `3000` | |
| `NODE_ENV` | no | `development` | `production` hides 5xx error details |
| `ANALYSIS_CACHE_DIR` | no | `data/analysis` | Analysis cache, relative to the working directory |
| `ANALYSIS_MAX_CONCURRENT` | no | `1` | Runs at once across all analysis endpoints (1–8) |
| `PLAYWRIGHT_BROWSERS_PATH` | no | — | Set to `0` for live scraping, as the CLI skills do |

## Deployment (Ubuntu + pm2)

Assumes Node.js 22, pm2 and the cloned repo are already on the server, with `npm ci` and
`npx playwright install --with-deps chromium` done. Run everything from the repo folder.

**1. Configure**

```bash
cp .env.example .env    # set API_KEYS and NODE_ENV=production
```

Create `ecosystem.config.cjs`:

```js
module.exports = {
  apps: [
    {
      name: "hk-racing-api",
      cwd: __dirname,
      script: "src/server/index.ts",
      interpreter: "node",
      node_args: "--import tsx",   // runs TypeScript directly, no build step
      exec_mode: "fork",           // a single process
      env: {
        NODE_ENV: "production",
        TZ: "Asia/Hong_Kong",      // race dates are Hong Kong dates
      },
    },
  ],
};
```

**2. Start**

```bash
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup      # start on boot — run the command pm2 prints

curl -H "x-api-key: <your key>" http://localhost:3000/health
```

**3. Update**

```bash
git pull && npm ci
pm2 restart hk-racing-api
```

Logs: `pm2 logs hk-racing-api`

**Notes**
- Keep `TZ=Asia/Hong_Kong`: on a UTC server, race dates come out a day early.
- Keep one instance: the cache and concurrency limit live in memory.
- Behind nginx, use HTTPS and a long timeout (`proxy_read_timeout 900s;`): live analyses can take minutes.

## Troubleshooting

### Playwright Browser Not Found
```bash
npx playwright install chromium
```

### Odds Fetch Timeout
- Check internet connection
- Verify date is a race day
- Try again (HKJC servers can be slow)

### No Races Found
- Check [HKJC Fixtures](https://racing.hkjc.com/en-us/local/information/fixture) for upcoming dates
- Race cards only available for future races

## Disclaimer

This project is for educational and research purposes only. Gambling involves risk. Never bet more than you can afford to lose.
