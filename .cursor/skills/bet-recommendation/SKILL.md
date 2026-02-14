---
name: bet-recommendation
description: Generate HKJC betting recommendations using Monte Carlo simulation, edge detection, and Kelly staking. Use when the user asks for betting tips, what to bet, which horses to back, or wants a betting slip for a meeting.
---

# Betting Recommendation Skill

Generate betting recommendations for upcoming HKJC races using Monte Carlo simulation, edge detection, and Kelly staking.

## Quick Start

```bash
# 1. Fetch jockey stats
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts

# 2. Fetch odds for the meeting
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=2026-02-11 --venue=HV --save

# 3. Analyze each race
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date=2026-02-11 --venue="Happy Valley" --race=1 --bankroll=1000 --kelly=0.35 --min-edge=5
```

**IMPORTANT**: Always set `PLAYWRIGHT_BROWSERS_PATH=0` for Playwright.

## Complete Workflow

```
STEP 1: FETCH JOCKEY STATS → data/jockeys/
STEP 2: FETCH CURRENT ODDS → data/odds/
STEP 3: RUN MONTE CARLO for each race (10,000 iterations)
STEP 4: APPLY ELITE JOCKEY PRIORITY adjustments
STEP 5: CALCULATE EDGE vs MARKET
STEP 6: APPLY KELLY STAKING with bankroll constraints
STEP 7: GENERATE RECOMMENDATIONS report
STEP 8: SAVE to data/reports/
```

## Betting Rules

### Edge Threshold
- Default min edge: **5%** (configurable via `--min-edge`)
- Edge 5-10%: Marginal | 10-25%: Value | >25%: Strong value

### Kelly Staking
```
Kelly % = (b × p - q) / b   where b = odds-1, p = model prob, q = 1-p
Apply fractional Kelly: Conservative 25% | Moderate 35% | Aggressive 50%
```

### Bankroll Constraints
- Max per bet: **5%** of bankroll
- Max per race: **10%** of bankroll
- Max per meeting: **40%** of bankroll

### Bet Type Priority
1. Quinella Place (most mispriced)
2. Place (favourite-longshot bias)
3. Quinella (less efficient than win)
4. Win (only with significant edge)

### Odds Filters
- WIN: odds 2.0-7.0 | PLACE: odds 5.0-15.0 | QUINELLA: both in WIN range

## Elite Jockey Priority

| Jockey | Strike | Action |
|--------|--------|--------|
| J McDonald | 80% | Back strongly |
| M Guyon | 80% | Back strongly |
| H Bowman | 67% | Back with confidence |
| J Moreira | 65% | Back with confidence |
| Z Purton | 57% | Back but expect variance |

## Venue Adjustments

### Sha Tin
Standard stakes, trust short favourites (2.0-3.5), quinella top 2

### Happy Valley
**Reduce ALL stakes 30%**, avoid favourites < 3.0, widen quinella to box 3-4

## Output Format

Save to `data/reports/bet_recommendation_YYYYMMDD_VENUEAI-MODEL.md`. See `prompts/bet-recommendation.md` for full template.

## Validated Performance (13 Meetings)

| Bet Type | Strike | ROI |
|----------|--------|-----|
| WIN | 56% | +202% |
| PLACE | 73% | +146% |
| QUINELLA | 47% | +1,424% |

## Key Files

| File | Purpose |
|------|---------|
| `tools/analyze-race.ts` | Full analysis CLI |
| `tools/fetch-odds.ts` | Live odds |
| `tools/fetch-jockey-stats.ts` | Jockey stats |
| `prompts/bet-recommendation.md` | Full prompt template |
| `data/reports/` | Saved recommendations |
