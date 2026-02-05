# Betting Recommendation Skill

Generate betting recommendations for upcoming HKJC races using **Monte Carlo simulation**, **edge detection**, and **Kelly staking**.

## Skill Purpose

This skill guides Cursor through the complete analysis workflow:
1. **Live odds fetching** - Filter horses by odds range
2. **Form analysis** - Speed ratings, recent form, class trajectory
3. **Monte Carlo simulation** - Calculate model win/place probabilities
4. **Edge detection** - Compare model vs market (require >15% edge)
5. **Kelly staking** - Optimal bet sizing with bankroll constraints
6. **Elite jockey priority** - Apply validated strike rates

## When to Use

Use this skill when:
- User asks for betting recommendations for a race
- User wants to know what to bet tomorrow
- User asks "which horses should I back?"
- User wants a betting slip for a meeting

## Prerequisites

1. Race card data available (scrape if needed)
2. **Current odds fetched** (use `fetch-odds.ts` tool)
3. Know the venue (Sha Tin or Happy Valley)
4. Know the current season (early/mid/late)

---

## Complete Workflow (8 Steps)

```
STEP 1: FETCH CURRENT ODDS
   ↓
STEP 2: FILTER BY ODDS RANGE
   ↓
STEP 3: FETCH RACE CARD & FORM DATA
   ↓
STEP 4: ANALYZE FORM FACTORS
   ↓
STEP 5: RUN MONTE CARLO SIMULATION
   ↓
STEP 6: CALCULATE EDGE vs MARKET
   ↓
STEP 7: APPLY KELLY STAKING
   ↓
STEP 8: GENERATE RECOMMENDATIONS
```

---

## Step 1: Fetch Current Odds

**ALWAYS START WITH ODDS** - This filters which horses to analyze.

```bash
npx tsx tools/fetch-odds.ts --date=2026-02-01 --venue=ST
```

### URL Formats

| Data Type | URL Format | Date Format |
|-----------|------------|-------------|
| Current Odds | `https://bet.hkjc.com/en/racing/wp/2026-02-01/ST/1` | YYYY-MM-DD |
| Race Card | `https://racing.hkjc.com/en-us/local/information/racecard?RaceDate=2026/02/01&Racecourse=ST&RaceNo=1` | YYYY/MM/DD |
| Jockey Stats | `https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId=PZ` | - |
| Horse Profile | `https://racing.hkjc.com/en-us/local/information/horse?HorseId=HK_2024_K129` | - |

---

## Step 2: Filter by Odds Range (CRITICAL)

### WIN Bets
```
REQUIRED: Win odds between 2.0 and 7.0

- Odds < 2.0: Skip (too short, poor value)
- Odds 2.0-7.0: ✓ Consider for WIN bet
- Odds > 7.0: Skip for WIN (consider for PLACE)
```

### PLACE Bets
```
REQUIRED: Win odds between 5.0 and 15.0

- Odds < 5.0: Skip (place odds too short)
- Odds 5.0-15.0: ✓ Consider for PLACE bet
- Odds > 15.0: Skip (too risky)
```

### QUINELLA Bets
```
1. Select top 2 horses by model probability
2. Both must be in WIN range (2.0-7.0)
3. At Happy Valley: expand to 3-4 horses if probabilities close
```

---

## Step 3: Fetch Race Card & Form Data

For horses that passed odds filter, fetch:

```
https://racing.hkjc.com/en-us/local/information/racecard?RaceDate=2026/02/01&Racecourse=ST&RaceNo=8
```

Extract for each horse:
- [ ] **Last 6 Runs** form figures (e.g., 1/2/3/1/4/2)
- [ ] **Current Rating** (class indicator)
- [ ] **Draw position**
- [ ] **Weight carried**
- [ ] **Jockey code** (for stats lookup)
- [ ] **Days since last race**

---

## Step 4: Analyze Form Factors

For each filtered horse, analyze:

### 4.1 Speed Ratings
```
Base Rating = Horse's current HKJC rating

Adjustments:
  +5 if won last start
  +3 if placed (2nd-3rd) last start
  +2 if improving form trend (last 3 positions getting better)
  -3 if declining form trend
  +3 if class drop (current rating < last race class median)
  -3 if class rise
```

### 4.2 Recent Form (Last 6 Races)
```
EXCELLENT: 3+ wins in last 6 → +10 points
GOOD: 2 wins or 4+ places → +6 points
FAIR: 1 win or 2-3 places → +3 points
POOR: No wins, <2 places → 0 points
```

### 4.3 Days Since Last Race
```
Optimal: 14-35 days → +3 points
Acceptable: 36-60 days → 0 points
Fresh: 61-90 days → -2 points (fitness query)
Long layoff: >90 days → -5 points
First start: → -3 points (unknown)
```

### 4.4 Distance Suitability
```
+5 if won at TODAY'S DISTANCE before
+2 if placed at TODAY'S DISTANCE before
0 if run at distance but no place
-3 if never run at this distance
```

### 4.5 Going Preference
```
+3 if won on TODAY'S GOING before
+1 if placed on TODAY'S GOING before
0 if no record on this going
-2 if poor record on this going (0 places from 3+ starts)
```

### 4.6 Draw Bias (Track/Distance Specific)

#### Sha Tin
| Distance | Favored Draws |
|----------|---------------|
| 1000m | 1-4 (inside) |
| 1200m | 1-6 (inside) |
| 1400m | 4-10 (middle) |
| 1600m | 6-12 (outside) |
| 1800m+ | 8-14 (outside) |

#### Happy Valley
| Distance | Favored Draws |
|----------|---------------|
| 1000m | 1-3 (inside) |
| 1200m | 1-4 (inside) |
| 1650m | 2-6 (middle-inside) |
| 1800m | 4-8 (middle) |

```
+2 if draw in favored zone
0 if draw in neutral zone
-2 if draw in unfavored zone
```

---

## Step 5: Run Monte Carlo Simulation

### 5.1 Calculate Base Rating for Each Horse

```
TOTAL_RATING = Base Rating 
             + Form Adjustment 
             + Days Rest Adjustment
             + Distance Adjustment 
             + Going Adjustment 
             + Draw Adjustment
             + Jockey Adjustment (see Elite Jockey table)
```

### 5.2 Simulate 10,000 Races

```python
# Pseudocode for simulation
for each simulation (1 to 10,000):
    for each horse:
        performance = TOTAL_RATING + random_variance(-15, +15)
    
    rank horses by performance
    record winner (1st place)
    record placers (1st, 2nd, 3rd)
    record quinella pairs (1st-2nd)

# Calculate probabilities
win_probability[horse] = wins / 10,000
place_probability[horse] = places / 10,000
```

### 5.3 Elite Jockey Adjustment

**IMPORTANT**: Always fetch current jockey stats before analysis:

```bash
npx tsx tools/fetch-jockey-stats.ts
```

This creates:
- `data/jockeys/JOCKEY_STATS.md` - Markdown table with current win rates
- `data/jockeys/jockey_stats_YYYYMMDD.json` - Raw JSON data

#### Rating Boost Formula (based on current season win %)

| Win % Range | Rating Boost | Priority |
|-------------|--------------|----------|
| > 20% | +10 | ⭐⭐⭐ Elite |
| 15-20% | +7 | ⭐⭐ Strong |
| 10-15% | +4 | ⭐ Good |
| < 10% | 0 | - |

#### Adding New Jockeys

To add new jockey codes, update `KNOWN_JOCKEY_CODES` in `tools/fetch-jockey-stats.ts`:

```typescript
{ code: "ABC", name: "A B Jockey" },
```

**RULE**: When an elite jockey (Win% > 15%) rides a horse in WIN odds range, **strongly favor** that selection.

---

## Step 6: Calculate Edge vs Market

### 6.1 Convert Odds to Market Probability

```
Market Implied Probability = 1 / Decimal Odds

Example:
  Odds 3.0 → Market Prob = 1/3.0 = 33.3%
  Odds 5.0 → Market Prob = 1/5.0 = 20.0%
```

### 6.2 Calculate Edge

```
Edge = Model Probability - Market Probability

Example:
  Model says 45% win chance
  Market odds 3.0 (33.3% implied)
  Edge = 45% - 33.3% = +11.7%
```

### 6.3 Value Threshold

The minimum edge is **configurable** (default **5%** in code). To use a stricter threshold, run with `--min-edge 15` (or another %).

```
Default: Edge > 5% to recommend (minEdgeThreshold in BettingConfig)

- Edge < 5%: ❌ PASS (no value)
- Edge 5-10%: ⚠️ MARGINAL (bet small; engine may recommend)
- Edge > 10%: ✅ VALUE BET (proceed to Kelly)
- Edge > 25%: ✅✅ STRONG VALUE (increase stake)
```

---

## Step 7: Apply Kelly Staking

### 7.1 Kelly Criterion Formula

```
Kelly % = (Edge × Probability) / (Odds - 1)

Where:
  Edge = Model Prob - Market Prob
  Probability = Model win probability
  Odds = Decimal odds
```

### 7.2 Fractional Kelly (Recommended)

Use **25-50% Kelly** for bankroll protection:

```
Recommended Stake = Kelly % × 0.25 to 0.50 × Bankroll
```

### 7.3 Bankroll Constraints

```
MAX per bet: 5% of bankroll
MAX per race: 10% of bankroll
MAX per meeting: 40% of bankroll

Example ($1000 bankroll):
  Max single bet: $50
  Max per race: $100
  Max per meeting: $400
```

### 7.4 Stake Calculation Example

```
Horse: INVINCIBLE IBIS
Model Win Prob: 42%
Market Odds: 2.9 (34.5% implied)
Edge: 42% - 34.5% = 7.5% → ❌ Below 15% threshold

Horse: SAGACIOUS LIFE
Model Win Prob: 38%
Market Odds: 3.6 (27.8% implied)
Edge: 38% - 27.8% = 10.2% → ⚠️ Marginal

Horse: SUPER EXPRESS  
Model Win Prob: 48%
Market Odds: 2.8 (35.7% implied)
Edge: 48% - 35.7% = 12.3% → ⚠️ Marginal

Horse with elite jockey boost:
  SMART GOLF (J McDonald rides)
  Model Win Prob: 55% (includes +15 jockey boost)
  Market Odds: 2.8 (35.7% implied)
  Edge: 55% - 35.7% = 19.3% → ✅ VALUE BET
  
  Kelly = (0.193 × 0.55) / (2.8 - 1) = 5.9%
  Fractional Kelly (33%): 5.9% × 0.33 = 1.95%
  Stake on $1000: $19.50 → round to $20
```

---

## Step 8: Generate Recommendations

### Output Format

```markdown
# 投注推薦 / BETTING RECOMMENDATIONS
## [Venue] | [Date] | 賠率更新: [timestamp]

### 本金 / Bankroll: $1,000

---

## 模擬結果 / SIMULATION RESULTS

| Race | Horse | Model Prob | Market Prob | Edge | Status |
|------|-------|------------|-------------|------|--------|
| R5 | #1 SMART GOLF | 55% | 35.7% | +19.3% | ✅ VALUE |
| R8 | #3 INVINCIBLE IBIS | 42% | 34.5% | +7.5% | ❌ No Edge |

---

## 獨贏投注 / WIN BETS (Edge > 15%)

| Race | # | Horse | Jockey | Odds | Model% | Edge | Kelly | Stake |
|------|---|-------|--------|------|--------|------|-------|-------|
| R5 | 1 | SMART GOLF | J McDonald | 2.8 | 55% | +19.3% | 2.0% | $20 |

---

## 位置投注 / PLACE BETS (Edge > 15%)

| Race | # | Horse | Odds | Model% | Edge | Stake |
|------|---|-------|------|--------|------|-------|
| ... | ... | ... | ... | ... | ... | ... |

---

## 連贏投注 / QUINELLA BETS

| Race | Combo | Model Prob | Stake |
|------|-------|------------|-------|
| R8 | 1-3 | 18% | $25 |

---

## SUMMARY

| Item | Amount |
|------|--------|
| WIN Bets | $XX |
| PLACE Bets | $XX |
| QUINELLA Bets | $XX |
| **Total Staked** | **$XXX** |
| **Reserve** | **$XXX** |

---

## PASS RACES (No Value)
- R1: No horses with edge > 15%
- R6: Elite jockey on short-priced favorite (no value)
```

---

## Venue-Specific Adjustments

### Sha Tin (More Predictable)
| Adjustment | Value |
|------------|-------|
| WIN stake | Standard |
| Favorite confidence | High |
| Elite jockey boost | Full +15 |
| QNL coverage | Top 2 |
| Expected WIN strike | 60-70% |

### Happy Valley (More Upsets)
| Adjustment | Value |
|------------|-------|
| WIN stake | **-30%** |
| Favorite confidence | Medium |
| Elite jockey boost | Reduced to +10 |
| QNL coverage | **Box 3-4 horses** |
| Short favorites (<3.0) | **AVOID** |
| Expected WIN strike | 40-50% |

---

## Quick Reference: Elite Jockeys

**Always fetch current stats before betting:**

```bash
npx tsx tools/fetch-jockey-stats.ts
```

#### Jockey Tier Action Guide

| Tier | Win % | Action |
|------|-------|--------|
| ⭐⭐⭐ Elite | > 20% | BACK when in WIN range |
| ⭐⭐ Strong | 15-20% | BACK when in WIN range |
| ⭐ Good | 10-15% | Support if form is good |
| - | < 10% | No jockey boost |

#### Live Stats URL

```
https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId={code}
```

Common codes: PZ, MOJ, MCJ, BH, GM, TEK, BA, HEL, FEL, CML

---

## Validated Performance (Backtests)

### 13 Meetings, 125 Races
| Bet Type | Strike Rate | ROI |
|----------|-------------|-----|
| WIN | 56% | +202% |
| PLACE | 73% | +146% |
| QUINELLA | 47% | +1,424% |

### Overall: **+338% ROI** on $1,606 staked

---

## Key Files

| File | Purpose |
|------|---------|
| `tools/fetch-odds.ts` | Live odds fetcher |
| `tools/fetch-jockey-stats.ts` | Live jockey stats fetcher |
| `tools/analyze-race.ts` | Full analysis CLI |
| `data/jockeys/JOCKEY_STATS.md` | Current jockey rankings |
| `data/odds/` | Saved odds data |

---

## Important Reminders

### DO ✅
- **ALWAYS fetch odds first** - Filter before analyzing
- **Run simulation** - Don't skip probability calculation
- **Require edge > 15%** - No edge = no bet
- **Apply Kelly constraints** - Never exceed 5% per bet
- **Trust elite jockeys** - J McDonald/M Guyon at 80% strike rate
- Verify no late scratchings
- Record all bets for tracking

### DON'T ❌
- Skip odds fetching step
- Bet without calculating edge
- Bet horses with edge < 15%
- Exceed bankroll constraints
- Back short favorites at Happy Valley (<3.0 odds)
- Chase losses with bigger bets
- Bet every race - passing is smart

---

## Risk Warnings

1. **Gambling involves risk** - Only bet what you can afford to lose
2. **Past performance ≠ Future results** - Strategy validated but not guaranteed
3. **Variance is real** - Single meeting can lose 50%
4. **Stay disciplined** - Follow the system, don't go rogue
5. **Odds change** - Re-check before placing bets
6. **Edge disappears** - If odds shorten, edge may vanish
