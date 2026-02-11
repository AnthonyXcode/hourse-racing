---
name: post-race-review
description: Review race results, calculate P&L, and extract learnings after a meeting. Use when the user asks to review results, check how bets performed, calculate profit/loss, or asks about yesterday's racing.
---

# Post-Race Review Skill

Analyze race results, calculate P&L, and extract learnings after a race meeting.

## Quick Start

```bash
# Scrape meeting results
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/scrape-meeting.ts --date=2026-02-11 --venue=HV
```

## Workflow

### Step 1: Gather Bet Records
Get from user: meeting date/venue, bets placed, stakes used.

### Step 2: Fetch Actual Results
```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/scrape-meeting.ts --date=YYYY-MM-DD --venue=ST
```

### Step 3: Match Bets to Results
- WIN: horse finished 1st → payout = stake × (winDividend / 10)
- PLACE: horse finished 1st-3rd → payout = stake × (placeDividend / 10)
- QUINELLA: top 2 match selection → payout = stake × (quinellaDividend / 10)

### Step 4: Generate P&L Report

Save to `data/reviews/review_YYYYMMDD_VENUE.md`:

```markdown
# POST-RACE REVIEW
## [Venue] | [Date]

## Overall Performance
| Metric | Value |
|--------|-------|
| Total Staked | $XX |
| Total Returned | $YY |
| Net P&L | +$ZZ |
| ROI | +AA% |

## By Bet Type
| Type | Bets | Wins | Strike% | Staked | Returned | P&L |
|------|------|------|---------|--------|----------|-----|

## Learnings
### What Worked / What Didn't / Adjustments
```

### Step 5: Extract Learnings
1. Did we follow the strategy?
2. Were upsets predictable?
3. Did venue adjustment help?
4. What patterns emerged?

## Key Files

| File | Purpose |
|------|---------|
| `tools/scrape-meeting.ts` | Fetch results |
| `data/reviews/` | Saved reviews |
| `data/historical/` | Race results |
