# Post-Race Review Skill

Analyze race results, calculate P&L, and extract learnings after a race meeting.

## Skill Purpose

This skill guides Cursor through reviewing race results after a meeting to:
- Calculate profit/loss from bets placed
- Identify what worked and what didn't
- Extract learnings for strategy refinement
- Update historical records

## When to Use

Use this skill when:
- User asks to review yesterday's results
- User wants to know how their bets performed
- User asks "did we make money?"
- User wants to analyze a past meeting

## Workflow Steps

### Step 1: Gather Bet Records

Ask the user for:
1. **Meeting date and venue**
2. **Bets placed** (from betting slip or memory)
3. **Stakes used**

Or retrieve from saved betting slip.

### Step 2: Fetch Actual Results

```bash
# Scrape the meeting results
npx tsx tools/scrape-meeting.ts --date=YYYY-MM-DD --venue=ST
```

This gives us:
- Finish order for each race
- Win dividends
- Quinella dividends
- Place dividends
- Tierce/Trio dividends

### Step 3: Match Bets to Results

For each bet placed:

```typescript
// WIN bet
if (selection.finishPosition === 1) {
  result = "WIN";
  payout = stake * (winDividend / 10);
} else {
  result = "LOSE";
  payout = 0;
}

// PLACE bet
if (selection.finishPosition <= 3) {
  result = "WIN";
  payout = stake * (placeDividend / 10);
} else {
  result = "LOSE";
  payout = 0;
}

// QUINELLA bet
const top2 = [finishOrder[0].number, finishOrder[1].number].sort();
const selected = [sel1, sel2].sort();
if (top2[0] === selected[0] && top2[1] === selected[1]) {
  result = "WIN";
  payout = stake * (quinellaDividend / 10);
} else {
  result = "LOSE";
  payout = 0;
}
```

### Step 4: Calculate P&L Summary

```markdown
## P&L SUMMARY

### WIN Bets
| Race | Selection | Odds | Stake | Result | Payout | P&L |
|------|-----------|------|-------|--------|--------|-----|
| R1 | #2 SALON S | 2.1 | $7 | WIN | $14.70 | +$7.70 |
| R3 | #5 SUPER DRAGON | 3.1 | $6 | LOSE | $0 | -$6.00 |

**WIN Total**: Staked $X, Returned $Y, P&L: +$Z

### PLACE Bets
| Race | Selection | Stake | Result | Payout | P&L |
|------|-----------|-------|--------|--------|-----|
| R2 | #4 BLASTED TALENT | $5 | 3rd | $17.50 | +$12.50 |

**PLACE Total**: Staked $X, Returned $Y, P&L: +$Z

### QUINELLA Bets
| Race | Selection | Stake | Result | Payout | P&L |
|------|-----------|-------|--------|--------|-----|
| R1 | 2-9 | $5 | LOSE | $0 | -$5 |
| R6 | 5-6 | $5 | WIN | $132 | +$127 |

**QNL Total**: Staked $X, Returned $Y, P&L: +$Z

---

## GRAND TOTAL
| Metric | Value |
|--------|-------|
| Total Staked | $XX |
| Total Returned | $YY |
| Net P&L | +$ZZ |
| ROI | +AA% |
```

### Step 5: Analyze Performance

#### Strike Rate Analysis
```
WIN: X/Y = Z% (Target: >50%)
PLACE: X/Y = Z% (Target: >70%)
QUINELLA: X/Y = Z% (Target: >35%)
```

#### What Worked
- List successful selections and why
- Note jockeys that delivered
- Highlight value picks that placed

#### What Didn't Work
- List failed selections and why
- Note any surprises/upsets
- Identify if strategy was followed

### Step 6: Extract Learnings

Questions to answer:
1. **Did we follow the strategy?** (Or deviate?)
2. **Were there predictable upsets?** (Missed signals?)
3. **Did venue adjustment help?** (HV vs ST)
4. **What patterns emerged?**

Document insights:
```markdown
## LEARNINGS

### Positive
- J McDonald 2/2 - continue backing
- Place bets 4/5 - strategy working
- QNL hit on R6 saved the day

### Negative  
- Z Purton 1/3 at HV - reduce trust at this venue
- Short favorite lost R4 - expected at HV
- Missed value in R8 - horse we skipped won at 15:1

### Adjustments
- [ ] Consider wider QNL coverage at HV
- [ ] Review R8 horse for future
- [ ] Track J McDonald form
```

### Step 7: Update Records

Save the review to:
```
data/reviews/review_YYYYMMDD_ST.md
```

Include:
- Full P&L breakdown
- Learnings
- Adjustments to consider

## Output Template

```markdown
# POST-RACE REVIEW
## [Venue] | [Date]

---

## RESULTS SUMMARY

### Overall Performance
| Metric | Value |
|--------|-------|
| Races Bet | X |
| Total Staked | $XX |
| Total Returned | $YY |
| Net P&L | +$ZZ |
| ROI | +AA% |
| Session Result | PROFIT / LOSS |

### By Bet Type
| Type | Bets | Wins | Strike % | Staked | Returned | P&L |
|------|------|------|----------|--------|----------|-----|
| WIN | X | Y | Z% | $A | $B | +$C |
| PLACE | X | Y | Z% | $A | $B | +$C |
| QNL | X | Y | Z% | $A | $B | +$C |

---

## DETAILED RESULTS

[Race-by-race breakdown]

---

## KEY MOMENTS

### Best Bet
- Race X: [Horse] at [odds] - [why it worked]

### Worst Bet  
- Race Y: [Horse] at [odds] - [why it failed]

### Biggest Surprise
- Race Z: [Unexpected result] - [analysis]

---

## LEARNINGS

### What Worked
1. [Point 1]
2. [Point 2]

### What Didn't Work
1. [Point 1]
2. [Point 2]

### Strategy Adjustments
- [ ] [Adjustment 1]
- [ ] [Adjustment 2]

---

## RUNNING TOTAL (Season to Date)

| Metric | Value |
|--------|-------|
| Meetings Reviewed | X |
| Total Staked | $XX |
| Total Returned | $YY |
| Season P&L | +$ZZ |
| Season ROI | +AA% |
```

## Key Files

- `tools/scrape-meeting.ts` - Get results
- `prompts/post-race-review.md` - Review template
- `data/reviews/` - Saved reviews
- `data/historical/` - Race data

## Important Notes

1. **Be honest** - Record losses accurately
2. **Learn from mistakes** - Don't just celebrate wins
3. **Track patterns** - Build knowledge over time
4. **Update strategy** - If evidence warrants changes
5. **Don't overreact** - Single meeting ≠ trend
