---
name: verify-racecard
description: Verify HKJC racecard data against SCMP for a given race day. Use when the user asks to verify a racecard, cross-check race data, validate scraping accuracy, or check if racecard data is correct.
---

# Verify Racecard Skill

Cross-check saved HKJC racecard JSON files against the SCMP racecard page to detect data discrepancies. Compares race-level metadata (class, distance, surface, going) and entry-level data (horse name, jockey, trainer, draw, weight, rating, age, gear), plus jockey and trainer season stats from SCMP profile pages.

## When to Use

- User asks to "verify racecard", "cross-check race data", "validate racecard", "check racecard accuracy"
- User asks "is the racecard data correct?" or "verify today's races"
- After scraping a new racecard, to confirm data quality

## Prerequisites

- Racecard JSON files must already exist in `data/racecards/` (scraped via the racecard scraper)
- The SCMP racecard page must be showing data for the same meeting (works for the current/upcoming meeting only)

## How to Run

```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/verify-racecard-scmp.ts --date=YYYY-MM-DD --venue=HV|ST [--race=N]
```

| Flag | Required | Description |
|------|----------|-------------|
| `--date` | Yes | Meeting date in `YYYY-MM-DD` format |
| `--venue` | Yes | Venue code: `HV` (Happy Valley) or `ST` (Sha Tin) |
| `--race` | No | Verify a single race number only (default: all races) |

## What It Checks

### Racecard Entries (per race)
| Field | Comparison |
|-------|-----------|
| Class | Exact match (normalized) |
| Distance | Exact match |
| Surface | Case-insensitive match |
| Going | Case-insensitive match |
| Horse name | Normalized (strip Chinese chars, horse codes) |
| Jockey | Fuzzy name match (handles initials, dots, middle names) |
| Trainer | Fuzzy name match |
| Draw | Exact match (skips reserves) |
| Weight | Exact match |
| Rating | Exact match |
| Age | Exact match |
| Gear | SCMP gear must be subset of HKJC gear |

### Season Stats (per unique jockey/trainer)
| Field | Comparison |
|-------|-----------|
| Wins | Exact match |
| Rides | Exact match |
| Places (2nd+3rd) | Exact match |
| Win rate | Within 0.2% tolerance |
| Place rate | Within 0.2% tolerance |

## Reading the Output

- 🟢 = field matches between HKJC and SCMP
- 🔴 = mismatch detected (with HKJC vs SCMP values shown)
- `SKIP` = SCMP page failed to load for that race or profile

## Known Acceptable Mismatches

These are expected and do not indicate data errors:

1. **Draw differences** — HKJC re-draws barrier positions after late scratchings; SCMP may still show original draws
2. **Weight differences** — SCMP may show horse body weight instead of jockey allotted weight in some columns
3. **Gear "BO"** — SCMP reports "BO" (blinkers off) as a gear change code; HKJC stores current gear ("B") not removal codes
4. **Stats timing** — Jockey/trainer season stats differ when HKJC racecard was scraped earlier than the SCMP live stats page

## Example

```
User: verify the racecard for 2026-04-29 HV
```

Run:

```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/verify-racecard-scmp.ts --date=2026-04-29 --venue=HV
```

## After Running

Provide the user with:
1. Total races checked and how many passed clean
2. A summary table of any mismatches, grouped by type (draw, weight, gear, stats)
3. Note which mismatches are likely timing/source differences vs genuine data errors
4. The final PASS/FAIL result and total mismatch count

## Key Files

| File | Purpose |
|------|---------|
| `tools/verify-racecard-scmp.ts` | Main CLI verification tool |
| `src/scrapers/scmp/racecard.ts` | SCMP racecard page scraper |
| `src/scrapers/scmp/jockey.ts` | SCMP jockey profile scraper |
| `src/scrapers/scmp/trainer.ts` | SCMP trainer profile scraper |
| `src/scrapers/scmp/index.ts` | Barrel export for all SCMP scrapers |
| `data/racecards/` | Saved HKJC racecard JSON files |
