# Betting Recommendation Skill

Generate betting recommendations for upcoming HKJC races using validated strategy rules.

## Skill Purpose

This skill guides Cursor through generating betting recommendations based on:
- Historical backtest performance
- Venue-specific adjustments
- Season-specific adjustments
- Elite jockey tracking

## When to Use

Use this skill when:
- User asks for betting recommendations for a race
- User wants to know what to bet tomorrow
- User asks "which horses should I back?"
- User wants a betting slip for a meeting

## Prerequisites

1. Race card data available (scrape if needed)
2. Historical data for context
3. Know the venue (Sha Tin or Happy Valley)
4. Know the current season (early/mid/late)

## Strategy Rules (From Backtests)

### Validated Performance (13 meetings, 125 races)
| Bet Type | Strike Rate | ROI |
|----------|-------------|-----|
| WIN | 56% | +202% |
| PLACE | 73% | +146% |
| QUINELLA | 47% | +1,424% |

### Overall: **+338% ROI** on $1,606 staked

## Workflow Steps

### Step 1: Gather Race Information

```bash
# Fetch race card for the meeting
npm run scrape:racecard

# Or analyze specific race
npm run analyze -- --date YYYY-MM-DD --venue "Sha Tin" --race N
```

### Step 2: Apply Venue Adjustment

#### Sha Tin (More Predictable)
| Adjustment | Value |
|------------|-------|
| WIN stake | Standard |
| Favorite confidence | High |
| QNL coverage | Top 2 |
| Expected WIN strike | 60-70% |

#### Happy Valley (More Upsets)
| Adjustment | Value |
|------------|-------|
| WIN stake | **-30%** |
| Favorite confidence | Medium |
| QNL coverage | **Box 3-4 horses** |
| Expected WIN strike | 40-50% |

### Step 3: Apply Season Adjustment

#### Early Season (Sep-Oct)
- More upsets expected
- Reduce WIN stakes by 20%
- Widen QUINELLA coverage
- Be patient with variance

#### Mid Season (Nov-Dec)
- More predictable
- Standard stakes
- Trust form lines
- HKIR period (Dec) - excellent for favorites

#### Late Season (Apr-Jul)
- Hot weather factor
- Watch for tired horses
- International jockeys visiting

### Step 4: Identify Selections

#### WIN Selections
For each race, check:
```
1. Is there a horse with odds 2.0-7.0?
2. Is the jockey elite? (Purton, McDonald, Bowman, Guyon, Moreira)
3. Is the horse well-drawn for this track/distance?
4. Is recent form positive (1-2-3 in last 3 starts)?

IF all YES → SELECT for WIN bet
```

Elite Jockeys Priority List:
1. **J McDonald** - 80% strike rate when booked
2. **M Guyon** - 80% strike rate
3. **H Bowman** - 67% strike rate
4. **J Moreira** - 65% strike rate
5. **Z Purton** - 57% strike rate (volume king)

#### PLACE Selections
```
1. Identify value picks (odds 5.0-15.0)
2. Check for consistent placers (form shows 1-2-3 frequently)
3. Look for class drops
4. Check jockey place % stats

IF value AND consistent → SELECT for PLACE bet
```

#### QUINELLA Selections
```
1. Identify top 2 in betting market
2. At Happy Valley: expand to top 3-4
3. Prefer races with clear form standouts
4. Avoid races with many first-starters

SELECT pair for QUINELLA bet
```

### Step 5: Calculate Stakes

Base bankroll allocation (per $100):
| Bet Type | Allocation | Per Race |
|----------|------------|----------|
| WIN | 45% ($45) | $5-8 per selection |
| PLACE | 25% ($25) | $5 per selection |
| QUINELLA | 20% ($20) | $5 per selection |
| Reserve | 10% ($10) | For specials |

Apply venue adjustment:
- **Happy Valley**: Multiply all by 0.7

### Step 6: Generate Betting Slip

Output format:

```markdown
# BETTING RECOMMENDATIONS
## [Venue] | [Date]

### Bankroll: $100

---

## WIN BETS ($X total)

| Race | Selection | Jockey | Odds | Stake | Reasoning |
|------|-----------|--------|------|-------|-----------|
| R1 | #X HORSE | J McDonald | 3.5 | $7 | Elite jockey, good draw |
| R3 | #Y HORSE | Z Purton | 2.8 | $8 | Favorite, class drop |

---

## PLACE BETS ($X total)

| Race | Selection | Odds | Stake | Reasoning |
|------|-----------|------|-------|-----------|
| R2 | #X HORSE | 8.5 | $5 | Consistent placer |
| R5 | #Y HORSE | 12.0 | $5 | Value pick |

---

## QUINELLA BETS ($X total)

| Race | Selection | Stake | Reasoning |
|------|-----------|-------|-----------|
| R1 | 2-5 | $5 | Top 2 market |
| R4 | 1-3-7 BOX | $5 | HV coverage |

---

## TOTAL STAKED: $XX
## EXPECTED VALUE: +$YY (based on historical ROI)

---

## PASS RACES
- R6: No clear selection, skip
- R8: Too many first-starters, skip

## NOTES
- [Any special considerations]
- [Weather/going changes to watch]
```

### Step 7: Post-Race Review

After racing, record:
1. Each bet result (Win/Lose)
2. Dividends received
3. Total P&L
4. Notes on surprises

Use `prompts/post-race-review.md` template.

## Example Usage

**User**: "Give me betting recommendations for tomorrow at Sha Tin"

**Response**:
1. Scrape race card: `npm run scrape:racecard`
2. Identify venue: Sha Tin (standard stakes)
3. Check season: Mid-season (standard approach)
4. Apply selection rules to each race
5. Generate betting slip
6. Present recommendations

## Key Files

- `tools/analyze-race.ts` - Race analysis CLI
- `src/betting/recommendations.ts` - Recommendation logic
- `prompts/bet-recommendation.md` - Output template
- `data/historical/` - Form reference data

## Important Reminders

### DO
- Check odds just before betting (they change)
- Verify no late scratchings
- Record all bets for tracking
- Accept variance - bad days happen

### DON'T
- Chase losses with bigger bets
- Bet every race - it's okay to pass
- Back short favorites at Happy Valley
- Ignore going/weather changes

## Risk Warnings

1. **Gambling involves risk** - Only bet what you can afford to lose
2. **Past performance ≠ Future results** - Strategy validated but not guaranteed
3. **Variance is real** - Single meeting can lose 50%
4. **Stay disciplined** - Follow the system, don't go rogue
