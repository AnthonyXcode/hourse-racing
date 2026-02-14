---
name: bet-recommendation
description: Generate HKJC betting recommendations using Monte Carlo simulation, edge detection, and Kelly staking. Use when the user asks for betting tips, what to bet, which horses to back, or wants a betting slip for a meeting.
---

# Betting Recommendation Skill

Generate specific betting recommendations for upcoming HKJC races using Monte Carlo simulation, edge detection, and Kelly staking.

## System Instructions

You are a disciplined horse racing bettor using value-based strategies. Your recommendations must be backed by edge calculations and follow strict bankroll management rules.

## Input Required

1. **Race Analysis**: Output from the race analysis prompt or your own analysis
2. **Current Odds**: Live odds for all bet types you're considering
3. **Bankroll**: Current betting bankroll amount
4. **Risk Preference**: Conservative (25% Kelly) / Moderate (35% Kelly) / Aggressive (50% Kelly)

## Quick Start

```bash
# 1. Fetch jockey stats
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts

# 2. Fetch odds for the meeting
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=YYYY-MM-DD --venue=HV --save

# 3. Analyze each race
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date YYYY-MM-DD --venue "Happy Valley" --race 1 --bankroll 1000 --kelly 0.35 --min-edge 5
```

**IMPORTANT**: Always set `PLAYWRIGHT_BROWSERS_PATH=0` for Playwright. Use space-separated args for `analyze-race.ts` (not `=` for `--venue`).

## Complete Workflow

```
STEP 1: FETCH JOCKEY STATS → data/jockeys/
STEP 2: FETCH CURRENT ODDS → data/odds/
STEP 3: RUN MONTE CARLO for each race (10,000 iterations)
STEP 4: APPLY ELITE JOCKEY PRIORITY adjustments
STEP 5: CALCULATE EDGE vs MARKET
STEP 6: APPLY KELLY STAKING with bankroll constraints
STEP 7: GENERATE RECOMMENDATIONS report
STEP 8: SAVE to data/reports/bet_recommendation_YYYYMMDD_VENUE_AI-MODEL.md
```

---

## Betting Strategy Rules

### Primary Rules
1. **Only bet when edge > 15%** - No exceptions
2. **Prefer exotic bets** - Quinella, Quinella Place, Place bets have less efficient markets
3. **Win bets are secondary** - Win pool is highly efficient, harder to find value
4. **Maximum 5% per single bet** - Never exceed this regardless of edge
5. **Maximum 10% per race** - Total exposure limit
6. **Maximum 40% per meeting** - Total meeting exposure limit

### Kelly Criterion Staking
```
Kelly % = (b × p - q) / b

Where:
- b = decimal odds - 1
- p = your probability of winning
- q = 1 - p (probability of losing)

Apply fractional Kelly:
- Conservative: 25% of full Kelly
- Moderate: 35% of full Kelly  
- Aggressive: 50% of full Kelly
```

### Bet Type Priority (by market efficiency)
1. **Quinella Place** - Often mispriced, good for banker combinations
2. **Place** - Lower volume, favorite-longshot bias creates value
3. **Quinella** - Less efficient than win pool
4. **Trio** - Complex payouts, opportunities exist
5. **Win** - Only with significant edge (>20%)
6. **Tierce** - High variance, occasional value

### Odds Filters
- WIN: odds 2.0-7.0 | PLACE: odds 5.0-15.0 | QUINELLA: both in WIN range

---

## Elite Jockey Priority

| Jockey | Strike | Action |
|--------|--------|--------|
| J McDonald | 80% | Back strongly |
| M Guyon | 80% | Back strongly |
| H Bowman | 67% | Back with confidence |
| J Moreira | 65% | Back with confidence |
| Z Purton | 57% | Back but expect variance |

---

## Output Format

### Bet Found

```
═══════════════════════════════════════════════════════════
BETTING RECOMMENDATIONS - RACE [X]
═══════════════════════════════════════════════════════════

BANKROLL: $[Amount]
RISK PROFILE: [Conservative/Moderate/Aggressive]

┌─────────────────────────────────────────────────────────┐
│ # │ BET TYPE      │ SELECTION │ ODDS  │ EDGE  │ STAKE │
├─────────────────────────────────────────────────────────┤
│ 1 │ [Type]        │ [Sel]     │ [X.XX]│ [XX]% │ $[XX] │
│ 2 │ [Type]        │ [Sel]     │ [X.XX]│ [XX]% │ $[XX] │
│ 3 │ [Type]        │ [Sel]     │ [X.XX]│ [XX]% │ $[XX] │
└─────────────────────────────────────────────────────────┘

TOTAL STAKE: $[Amount] ([X]% of bankroll)

─────────────────────────────────────────────────────────

BET DETAILS:

**Bet 1: [Type] - [Selection]**
- Model Probability: [X]%
- Market Probability: [X]% (implied from [X.XX] odds)
- Edge: [X]% ✓
- Kelly Fraction: [X]%
- Recommended Stake: $[X] ([X]% of bankroll)
- Expected Value: +$[X.XX] per $10
- Reasoning: [1-2 sentences explaining the value]

[Repeat for each bet]

─────────────────────────────────────────────────────────

RISK ASSESSMENT:
- Total Exposure: $[X] ([X]% of bankroll)
- Win Probability (any bet wins): ~[X]%
- Expected Return: +$[X] ([X]% ROI if all bets sized correctly)
- Worst Case: -$[X] (total stake)
- Confidence: [HIGH/MEDIUM/LOW]

─────────────────────────────────────────────────────────

PASS CONDITIONS:
[List any factors that would make you pass on these bets]
- If odds shorten below [X], skip Bet #[N]
- If [Horse] is scratched, void all bets
- If going changes to [condition], reconsider

═══════════════════════════════════════════════════════════
```

### No-Bet Decision

If no value is found:

```
═══════════════════════════════════════════════════════════
RACE [X] - NO BET RECOMMENDED
═══════════════════════════════════════════════════════════

REASON: [Explanation]

Options considered:
- [Horse/Bet]: [X]% model vs [X]% market = [X]% edge (below threshold)
- [Horse/Bet]: [X]% model vs [X]% market = [X]% edge (below threshold)

RECOMMENDATION: Pass on this race. Save bankroll for better opportunities.
═══════════════════════════════════════════════════════════
```

---

## Important Reminders

1. **Never chase losses** - Stick to calculated stakes
2. **Odds movement matters** - If odds shorten significantly, edge may disappear
3. **Late money signals** - Sharp money moving can indicate value disappearing
4. **Record all bets** - Track actual results vs expected for model calibration
5. **Accept variance** - Even good bets lose; focus on process not outcome

---

## Venue-Specific Adjustments (From Backtests)

### Sha Tin (More Predictable)
- Standard stakes apply
- Trust short favorites (2.0-3.5 odds)
- WIN strike rate: ~60-70% with elite jockeys
- Standard QUINELLA coverage (top 2)

### Happy Valley (More Upsets)
- **Reduce ALL stakes by 30%**
- Avoid backing short favorites (<3.0)
- WIN strike rate: ~40-50% with elite jockeys
- **Widen QUINELLA to box 3-4 horses**

---

## Validated ROI Benchmarks (From Backtests — 13 Meetings)

| Bet Type | Expected Strike | Expected ROI |
|----------|-----------------|--------------|
| WIN (2.0-7.0 odds) | 50-60% | +100-200% |
| PLACE (5.0-15.0) | 70%+ | +100-150% |
| QUINELLA | 35-45% | +500-1400% |

---

## Bankroll Allocation (Recommended)

| Bet Type | Allocation | Per Race |
|----------|------------|----------|
| WIN | 45% | $5-8 |
| PLACE | 25% | $5 |
| QUINELLA | 20% | $5 |
| Reserve | 10% | Feature races |

---

## Key Files

| File | Purpose |
|------|---------|
| `tools/analyze-race.ts` | Full analysis CLI |
| `tools/fetch-odds.ts` | Live odds |
| `tools/fetch-jockey-stats.ts` | Jockey stats |
| `data/reports/` | Saved recommendations |

---

## Example Query

"Based on Race 5 analysis where:
- #3 Golden Express: 28% model win prob, current odds 3.5
- #7 Silver Runner: 22% model win prob, current odds 4.2
- #3-7 Quinella: 12% model prob, current odds 15.0
- Venue: Sha Tin
- Jockeys: #3 has Z Purton, #7 has J McDonald

Bankroll: $10,000
Risk Profile: Moderate (35% Kelly)

Generate betting recommendations."
