# Analyze Race Skill

Analyze HKJC horse races using Monte Carlo simulation and generate value-based betting recommendations.

## Skill Purpose

This skill provides the **analysis engine** for race evaluation. For complete betting workflow including odds fetching and staking, see `skills/bet-recommendation/SKILL.md`.

## When to Use

Use this skill when:
- User wants to analyze an upcoming HKJC race
- User needs to understand a specific horse's chances
- User wants to compare model predictions with market odds
- User asks "what are the chances of X winning?"

## Quick Start

```bash
# Run full analysis for a race
npx tsx tools/analyze-race.ts --date=2026-02-01 --venue=ST --race=8
```

## Workflow Steps

### Step 1: Gather Race Information

Ask the user for:
1. **Race Date** (format: YYYY-MM-DD)
2. **Venue** (Sha Tin or Happy Valley)
3. **Race Number** (1-11)
4. **Bankroll** (optional, default $10,000 HKD)
5. **Risk Profile** (conservative/moderate/aggressive)

### Step 2: Fetch Race Data

```bash
# Fetch current odds first
npx tsx tools/fetch-odds.ts --date=2026-02-01 --venue=ST --race=8

# Then run full analysis
npx tsx tools/analyze-race.ts --date=2026-02-01 --venue=ST --race=8
```

### Step 3: Analyze Form Factors

For each horse, analyze:
- [ ] Speed ratings from past performances
- [ ] Recent form (last 6 races)
- [ ] Class trajectory (rising/dropping)
- [ ] Days since last race (optimal: 14-35)
- [ ] Draw bias for this track/distance
- [ ] Jockey/trainer statistics
- [ ] Surface and going preferences

### Step 4: Run Monte Carlo Simulation

Execute 10,000 race simulations:
```
For each simulation:
  1. Apply random variance (-15 to +15) to each horse's rating
  2. Rank horses by adjusted performance
  3. Record winner and placers

Calculate:
  - Win probability = wins / 10,000
  - Place probability = places / 10,000
  - Quinella probability matrix
```

### Step 5: Compare with Market

```
Market Implied Probability = 1 / Decimal Odds

Edge = Model Probability - Market Probability

VALUE THRESHOLD: Edge > 15%
```

### Step 6: Generate Recommendations

Apply betting rules from `bet-recommendation` skill:
- [ ] Filter to value bets only (edge > 15%)
- [ ] Calculate Kelly stakes
- [ ] Apply bankroll constraints (max 5% per bet, 10% per race)
- [ ] Prioritize exotic bets over win bets

## Elite Jockey Stats

**IMPORTANT**: Always fetch current jockey stats before analysis:

```bash
npx tsx tools/fetch-jockey-stats.ts
```

This creates:
- `data/jockeys/JOCKEY_STATS.md` - Current win rates
- `data/jockeys/jockey_stats_YYYYMMDD.json` - Raw JSON

### Rating Boost Formula

| Win % Range | Rating Boost | Priority |
|-------------|--------------|----------|
| > 20% | +10 | ⭐⭐⭐ Elite |
| 15-20% | +7 | ⭐⭐ Strong |
| 10-15% | +4 | ⭐ Good |
| < 10% | 0 | - |

### Adding New Jockeys

Update `KNOWN_JOCKEY_CODES` in `tools/fetch-jockey-stats.ts`:

```typescript
{ code: "ABC", name: "A B Jockey" },
```

**RULE**: When elite jockey (Win% > 15%) rides horse in WIN range (2.0-7.0), apply rating boost.

## Venue-Specific Adjustments

### Sha Tin
- Standard stakes apply
- Favorites more reliable (~50% win rate)
- Trust elite jockeys (full boost)
- Expected WIN strike rate: 60-70%

### Happy Valley
- **Reduce all stakes by 30%**
- Favorites less reliable (~35% win rate)
- **Short favorites (<3.0) often lose - AVOID**
- Reduce jockey boost to +10 max
- Widen QUINELLA coverage to 3-4 horses
- Expected WIN strike rate: 40-50%

## Draw Bias Reference

### Sha Tin
| Distance | Favored Draws |
|----------|---------------|
| 1000m | 1-4 (inside) |
| 1200m | 1-6 (inside) |
| 1400m | 4-10 (middle) |
| 1600m | 6-12 (outside) |
| 1800m+ | 8-14 (outside) |

### Happy Valley
| Distance | Favored Draws |
|----------|---------------|
| 1000m | 1-3 (inside) |
| 1200m | 1-4 (inside) |
| 1650m | 2-6 (middle-inside) |
| 1800m | 4-8 (middle) |

## Output Format

```markdown
# RACE ANALYSIS
## R8 | Sha Tin | 2026-02-01 | 1600m Class 3

### SIMULATION RESULTS (10,000 runs)

| # | Horse | Rating | Win% | Place% | Market% | Edge |
|---|-------|--------|------|--------|---------|------|
| 3 | INVINCIBLE IBIS | 91 | 42% | 68% | 34.5% | +7.5% |
| 1 | SAGACIOUS LIFE | 97 | 38% | 62% | 27.8% | +10.2% |

### VALUE BETS (Edge > 15%)

| Horse | Type | Odds | Model% | Edge | Kelly | Stake |
|-------|------|------|--------|------|-------|-------|
| #5 SMART GOLF | WIN | 2.8 | 55% | +19.3% | 2.0% | $20 |

### QUINELLA MATRIX

|   | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 1 | - | 8% | 18% | 5% |
| 2 | 8% | - | 12% | 6% |
| 3 | 18% | 12% | - | 9% |

### RECOMMENDATION

✅ WIN: #5 SMART GOLF @ 2.8 ($20) - Elite jockey, strong edge
⚠️ MARGINAL: #3 INVINCIBLE IBIS - Edge 7.5% below threshold
❌ PASS: #1 SAGACIOUS LIFE - Edge 10.2% marginal
```

## Key Files

| File | Purpose |
|------|---------|
| `tools/fetch-odds.ts` | Live odds fetcher |
| `tools/fetch-jockey-stats.ts` | Live jockey stats fetcher |
| `tools/analyze-race.ts` | Full analysis CLI |
| `data/jockeys/JOCKEY_STATS.md` | Current jockey rankings |
| `src/scrapers/raceCard.ts` | Fetch race data |
| `src/simulation/monteCarlo.ts` | Run simulations |

## Troubleshooting

### Scraper fails
- Check if HKJC website is accessible
- Verify race date has scheduled races
- Check for data integrity warnings

### No value found
- This is normal - pass on the race
- Don't force bets; wait for better opportunities
- Most races have no value bets

### Odds mismatch
- Market odds update frequently
- Re-fetch odds closer to race time
- If edge disappears, void the bet

### Data shows "[WARNING]"
- Review the warning message
- Verify data quality before betting
- Re-scrape if critical data missing

## Related Skills

- **bet-recommendation** - Full betting workflow with staking
- This skill focuses on analysis; use bet-recommendation for complete workflow
