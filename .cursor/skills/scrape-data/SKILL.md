---
name: scrape-data
description: Scrape HKJC race data including race cards, results, odds, and horse/jockey profiles. Use when the user wants to fetch race data, scrape results, update statistics, or build historical databases.
---

# Scrape Data Skill

Automate scraping of HKJC race data including race cards, results, and profiles.

## Quick Start

```bash
# Fetch current odds for a meeting
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=2026-02-11 --venue=HV --save

# Scrape all results for a meeting
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/scrape-meeting.ts --date=2026-02-11 --venue=HV

# Fetch jockey stats
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts
```

**IMPORTANT**: Always set `PLAYWRIGHT_BROWSERS_PATH=0` for Playwright.

## Available Tools

| Tool | Purpose | Output |
|------|---------|--------|
| `tools/fetch-odds.ts` | Live win/place odds | `data/odds/odds_YYYYMMDD_VENUE.json` |
| `tools/scrape-meeting.ts` | Full meeting results | `data/historical/results_YYYYMMDD_VENUE.json` |
| `tools/scrape-single-race.ts` | Single race result | `data/historical/race_YYYYMMDD_VENUE_RN.json` |
| `tools/fetch-jockey-stats.ts` | Jockey season stats | `data/jockeys/jockey_stats_YYYYMMDD.json` |
| `tools/scrape-profiles.ts` | Jockey/horse profiles | `data/jockeys/` or `data/horses/` |

## URL Formats

| Data | URL |
|------|-----|
| Odds | `https://bet.hkjc.com/en/racing/wp/2026-02-11/HV/1` |
| Race Card | `https://racing.hkjc.com/racing/information/English/Racing/RaceCard.aspx?RaceDate=2026/02/11&Racecourse=HV&RaceNo=1` |
| Jockey Stats | `https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId=PZ` |

## Data Storage

```
data/
├── historical/    # Race results (results_YYYYMMDD_VENUE.json)
├── odds/          # Odds snapshots (odds_YYYYMMDD_VENUE.json)
├── jockeys/       # Jockey stats and profiles
├── horses/        # Horse profiles
└── reports/       # Generated reports
```

## Rate Limiting

- HKJC allows ~20 requests/minute
- Scrapers auto-delay between requests
- Don't run multiple scrapers simultaneously

## Troubleshooting

- **Playwright not found**: Run `PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install chromium`
- **No data found**: Check if racing is scheduled for that date
- **Rate limited**: Wait 5 minutes before retrying
- **Parse error**: HKJC may have changed page structure; update selectors
