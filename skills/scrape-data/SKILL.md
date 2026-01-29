# Scrape Data Skill

Automate scraping of HKJC race data including race cards, results, and horse past performances.

## Skill Purpose

This skill guides Cursor through scraping data from HKJC for analysis and model building.

## When to Use

Use this skill when:
- User wants to fetch today's race cards
- User wants historical race results
- User wants to build a database of past performances
- User needs to update horse/jockey/trainer statistics

## Available Scrapers

### 1. Race Card Scraper

Fetches upcoming race information including entries, odds, and race details.

```typescript
import { RaceCardScraper } from '../src/scrapers/raceCard';

const scraper = new RaceCardScraper({ headless: true });
await scraper.init();

// Single race
const race = await scraper.scrapeRaceCard(new Date(), 'Sha Tin', 5);

// Full meeting
const races = await scraper.scrapeFullMeeting(new Date(), 'Sha Tin');

await scraper.close();
```

CLI usage:
```bash
npm run scrape:racecard
```

### 2. Historical Scraper

Fetches past race results and dividends.

```typescript
import { HistoricalScraper } from '../src/scrapers/historical';

const scraper = new HistoricalScraper({ headless: true });
await scraper.init();

// Single race result
const result = await scraper.scrapeRaceResult(date, 'Sha Tin', 5);

// Date range
const results = await scraper.scrapeResultsRange(startDate, endDate);

// Horse past performances
const perfs = await scraper.scrapeHorsePastPerformances('K422');

await scraper.close();
```

CLI usage:
```bash
npm run scrape:historical
```

## Data Output

### Race Card Data
- Race ID, date, venue, race number
- Class, distance, surface, going
- Prize money
- Entries: horse, jockey, trainer, draw, weight, odds

### Historical Data
- Finish order with times and margins
- Dividends (Win, Place, Quinella, Tierce, etc.)
- Horse past performances

### Storage
Data is saved to `data/` directory:
- `data/historical/` - Race results
- `data/horses/` - Horse profiles
- `data/jockeys/` - Jockey statistics

## Workflow

### Daily Race Card Fetch

1. Check if there's racing today
2. Identify venue(s)
3. Scrape all race cards
4. Save to data directory
5. Verify data quality

```bash
# Check racing schedule
npm run scrape:racecard

# Output: data/racecard_YYYYMMDD_ST.json
```

### Weekly Historical Update

1. Determine date range (last 7 days)
2. Scrape results for both venues
3. Update horse past performances
4. Recalculate statistics

```bash
npm run scrape:historical

# Output: data/historical/results_YYYYMMDD_YYYYMMDD.json
```

### Horse Profile Build

For each active horse:
1. Scrape past performances
2. Calculate speed ratings
3. Store in horse profiles

## Important Notes

### Rate Limiting
- HKJC rate limit: ~20 requests/minute
- Scraper automatically delays between requests
- Don't run multiple scrapers simultaneously

### Error Handling
- Network errors: Retry up to 3 times
- Missing data: Log and continue
- Malformed pages: Skip and report

### Data Validation
- All scraped data is validated
- Invalid entries are logged but not stored
- Verify field sizes match expected ranges

## Troubleshooting

### "No data found"
- Check if racing is scheduled for that date
- Verify venue name spelling
- Check HKJC website accessibility

### "Rate limited"
- Wait 5 minutes before retrying
- Reduce request frequency
- Check if IP is blocked

### "Parse error"
- HKJC may have changed page structure
- Update CSS selectors in scraper
- Report issue for maintenance
