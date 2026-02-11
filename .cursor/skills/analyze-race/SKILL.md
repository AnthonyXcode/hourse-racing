---
name: analyze-race
description: Analyze HKJC horse races using Monte Carlo simulation and form analysis. Use when the user asks to analyze a race, check a horse's chances, compare model vs market, or asks about win/place probabilities.
---

# Analyze Race Skill

Analyze HKJC horse races using Monte Carlo simulation and generate value-based betting recommendations.

## Quick Start

```bash
# Run full analysis for a race (Monte Carlo 10K + form + odds)
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date=2026-02-11 --venue="Happy Valley" --race=4 --bankroll=1000 --kelly=0.35 --min-edge=5
```

## When to Use

- User wants to analyze an upcoming HKJC race
- User needs to understand a specific horse's chances
- User wants to compare model predictions with market odds

## Workflow

### Step 1: Gather Race Information

Ask for: date (YYYY-MM-DD), venue (Sha Tin / Happy Valley), race number, bankroll, risk profile.

### Step 2: Fetch Data + Run Analysis

```bash
# Fetch jockey stats first (important for elite jockey priority)
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts

# Fetch current odds
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=YYYY-MM-DD --venue=ST --save

# Run full analysis (scrapes race card + Monte Carlo + value calc)
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date=YYYY-MM-DD --venue="Sha Tin" --race=5 --bankroll=10000
```

**IMPORTANT**: Always set `PLAYWRIGHT_BROWSERS_PATH=0` to use locally installed Playwright browsers.

### Step 3: Interpret Results

The pipeline outputs:
1. **Simulation Results**: Win% and Place% for each horse (10,000 MC iterations)
2. **Top Quinella Combinations**: Probability and fair odds
3. **Market Efficiency**: Overround, favourite bias, inefficiencies
4. **Value Bets**: Horses where model% > market% by enough edge

### Step 4: Apply Elite Jockey Priority

| Jockey | Backtest Strike | Rating Boost |
|--------|----------------|--------------|
| J McDonald | 80% | +10 |
| M Guyon | 80% | +10 |
| H Bowman | 67% | +7 |
| J Moreira | 65% | +7 |
| Z Purton | 57% | +4 |

**RULE**: When elite jockey (Win% > 15%) rides horse in WIN range (2.0-7.0), add rating boost.

## Venue Adjustments

### Sha Tin
- Standard stakes, favorites reliable (~50% win rate), full jockey boost

### Happy Valley
- **Reduce stakes 30%**, favorites less reliable (~35%), **avoid short favs (<3.0)**, widen quinella to 3-4 horses

## Draw Bias

### Sha Tin
| Distance | Favored Draws |
|----------|---------------|
| 1000m | 1-4 (inside) |
| 1200m | 1-6 (inside) |
| 1400m | 4-10 (middle) |
| 1600m+ | 6-14 (outside) |

### Happy Valley
| Distance | Favored Draws |
|----------|---------------|
| 1000m | 1-3 (inside) |
| 1200m | 1-4 (inside) |
| 1650m | 2-6 (middle) |

## Key Files

| File | Purpose |
|------|---------|
| `tools/analyze-race.ts` | Full analysis CLI |
| `tools/fetch-odds.ts` | Live odds fetcher |
| `tools/fetch-jockey-stats.ts` | Jockey stats |
| `src/simulation/monteCarlo.ts` | MC simulator |
| `src/analysis/formAnalysis.ts` | Form analyzer |
| `src/betting/valueCalculator.ts` | Edge calculator |
| `src/data/horseEnricher.ts` | Historical data enrichment |
