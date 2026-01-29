# Backtest Strategy Skill

Run multi-meeting backtests to validate betting strategies and analyze historical performance.

## Skill Purpose

This skill guides Cursor through running comprehensive backtests across multiple race meetings to:
- Validate betting strategy effectiveness
- Calculate ROI and strike rates
- Identify venue/season patterns
- Refine betting parameters

## When to Use

Use this skill when:
- User wants to test a betting strategy against historical data
- User wants to compare performance across different periods
- User asks "how would my strategy have performed?"
- User wants to validate model predictions

## Prerequisites

Before running a backtest:
1. Ensure historical data is available in `data/historical/`
2. Define the betting strategy clearly
3. Set the evaluation period (dates/meetings)

## Workflow Steps

### Step 1: Define Backtest Parameters

Ask the user for:
1. **Date Range** - Start and end dates (e.g., October 2025)
2. **Venues** - Sha Tin only, Happy Valley only, or both
3. **Strategy** - Which betting rules to apply
4. **Bankroll** - Starting bankroll for P&L calculation

### Step 2: Scrape Historical Data

For each meeting in the date range:

```bash
# Scrape a single meeting
npx tsx tools/scrape-meeting.ts --date=YYYY-MM-DD --venue=ST

# Data saved to: data/historical/results_YYYYMMDD_ST.json
```

Typical meetings per month:
- ~8-10 meetings (mix of ST and HV)
- ~80-100 races total

### Step 3: Apply Betting Strategy

For each race, apply these rules consistently:

#### WIN Bets ($6-8 per race)
```
IF horse.odds >= 2.0 AND horse.odds <= 7.0
AND horse.jockey IN ['Z Purton', 'J McDonald', 'H Bowman', 'M Guyon', 'J Moreira']
THEN bet WIN
```

#### PLACE Bets ($5 per race)
```
IF horse.odds >= 5.0 AND horse.odds <= 15.0
AND horse has consistent form
THEN bet PLACE
```

#### QUINELLA Bets ($5 per selected race)
```
SELECT top 2 horses by odds
BET quinella on pair
```

### Step 4: Calculate Results

For each bet:
```typescript
// WIN bet result
if (horse.finishPosition === 1) {
  return stake * (horse.winOdds / 10); // HKJC dividends are per $10
}

// PLACE bet result  
if (horse.finishPosition <= 3) {
  return stake * (placeDividend / 10);
}

// QUINELLA result
if (matchesQuinella(selection, finishOrder)) {
  return stake * (quinellaDividend / 10);
}
```

### Step 5: Aggregate Statistics

Calculate per meeting:
- Total staked
- Total returned
- Net P&L
- ROI percentage
- Strike rate (wins/bets)

Calculate overall:
- Combined P&L across all meetings
- Average ROI
- Best/worst meeting
- Variance analysis

### Step 6: Generate Report

Output format:

```markdown
# BACKTEST REPORT: [Period]

## Summary
| Metric | Value |
|--------|-------|
| Meetings | X |
| Total Races | Y |
| Total Staked | $Z |
| Total Returned | $A |
| Net P&L | +$B |
| Overall ROI | +C% |

## By Bet Type
| Type | Staked | Returned | P&L | ROI |
|------|--------|----------|-----|-----|
| WIN | $X | $Y | +$Z | +A% |
| PLACE | $X | $Y | +$Z | +A% |
| QUINELLA | $X | $Y | +$Z | +A% |

## By Venue
| Venue | Meetings | WIN Strike | ROI |
|-------|----------|------------|-----|
| Sha Tin | X | Y% | +Z% |
| Happy Valley | X | Y% | +Z% |

## Key Findings
1. [Observation 1]
2. [Observation 2]
3. [Observation 3]
```

## Example Commands

```bash
# Scrape October 2025 meetings
npx tsx tools/scrape-meeting.ts --date=2025-10-01 --venue=ST
npx tsx tools/scrape-meeting.ts --date=2025-10-08 --venue=HV
npx tsx tools/scrape-meeting.ts --date=2025-10-12 --venue=ST
# ... continue for all meetings

# Run automated backtest (if implemented)
npm run backtest -- --start=2025-10-01 --end=2025-10-31
```

## Key Files

- `tools/scrape-meeting.ts` - Scrape full meeting results
- `src/backtest/backtester.ts` - Backtest logic
- `data/historical/` - Historical race data
- `prompts/post-race-review.md` - P&L analysis template

## Interpretation Guidelines

### ROI Benchmarks
| ROI | Assessment |
|-----|------------|
| >200% | Excellent - strategy working well |
| 100-200% | Good - sustainable profit |
| 50-100% | Acceptable - room for improvement |
| 0-50% | Marginal - review strategy |
| <0% | Losing - pause and reassess |

### Strike Rate Benchmarks
| Bet Type | Target | Concern |
|----------|--------|---------|
| WIN | >50% | <40% |
| PLACE | >70% | <60% |
| QUINELLA | >35% | <25% |

### Variance Expectations
- Single meeting can swing -50% to +500%
- 5+ meetings needed for meaningful assessment
- Best meeting often 5-10x worst meeting
- This is NORMAL - don't overreact to variance

## Troubleshooting

### "No data for date"
- Verify racing occurred on that date
- Check venue (ST vs HV)
- Confirm data was scraped successfully

### "Results don't match HKJC"
- Re-scrape the meeting
- Verify dividend parsing
- Check for data integrity warnings

### "Unexpected losses"
- Review individual race results
- Check if upsets were predictable
- Consider seasonal factors
- Assess if strategy followed correctly

## Important Notes

1. **Past performance ≠ Future results** - Backtests validate methodology, not guarantee profits
2. **Include enough data** - Minimum 5 meetings, ideally 10+
3. **Mix venues** - Both ST and HV for complete picture
4. **Track variance** - Single bad meeting doesn't invalidate strategy
5. **Update regularly** - Re-run backtests monthly with new data
