---
name: backtest
description: Run multi-meeting backtests to validate betting strategies and analyze historical performance. Use when the user wants to test a strategy, check historical ROI, compare performance across periods, or asks how a strategy would have performed.
---

# Backtest Strategy Skill

Run comprehensive backtests across multiple race meetings to validate betting strategies.

## Quick Start

```bash
# Scrape historical meetings
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/scrape-meeting.ts --date=2025-10-01 --venue=ST

# Run automated backtest
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/run-backtest-real.ts
```

## Workflow

### Step 1: Define Parameters
- Date range, venues, strategy rules, starting bankroll

### Step 2: Scrape Historical Data
```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/scrape-meeting.ts --date=YYYY-MM-DD --venue=ST
# Output: data/historical/results_YYYYMMDD_VENUE.json
```

### Step 3: Apply Strategy Rules
- WIN: odds 2.0-7.0 + elite jockey → bet
- PLACE: odds 5.0-15.0 + form → bet
- QUINELLA: top 2 model picks → bet

### Step 4: Calculate Results + Generate Report

## Data Levels

| Level | Data | Accuracy |
|-------|------|----------|
| Basic | Results only | Low |
| Standard | + Jockey stats | Medium |
| Full | + Horse form, ratings | High |

## Benchmarks

| Bet Type | Target Strike | Target ROI |
|----------|--------------|------------|
| WIN | >50% | +100% |
| PLACE | >70% | +100% |
| QUINELLA | >35% | +500% |

## Key Files

| File | Purpose |
|------|---------|
| `tools/run-backtest-real.ts` | Backtest on real data |
| `tools/run-backtest.ts` | Backtest on sample data |
| `src/backtest/backtester.ts` | Backtest logic |
| `data/historical/` | Historical race data |
