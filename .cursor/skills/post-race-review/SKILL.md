---
name: post-race-review
description: Review race results, calculate P&L, and extract learnings after a meeting. Use when the user asks to review results, check how bets performed, calculate profit/loss, or asks about yesterday's racing.
---

# Trio Post-Race Review Skill

Analyze Trio race results, calculate P&L, classify misses, calibrate the model, and extract actionable learnings after a race meeting.

## Quick Start

```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/scrape-meeting.ts --date=YYYY-MM-DD --venue=ST
```

---

## Workflow

### Step 1: Gather Bet Records

Locate the Trio strategy reports for the meeting:
- `data/reports/trio_strategy_YYYYMMDD_VENUE_RN.md` for each race
- Extract: banker, legs, pool size, mode, structure, stake, confidence level

### Step 2: Fetch Actual Results

```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/scrape-meeting.ts --date=YYYY-MM-DD --venue=ST
```

Output: `data/historical/results_YYYYMMDD_VENUE.json`

For each race, record:
- Finish order (top 3 + 4th)
- Win/Place/Quinella/Trio/Tierce dividends
- Starting prices of key horses

Verify Trio dividends are correct (check for scraping anomalies — dividends with commas in thousands may be truncated). Cross-check against HKJC results page if any Trio dividend looks unrealistically low.

### Step 3: Match Bets to Results

For each race with a Trio ticket:
1. Check if **banker** finished in top 3
2. Check if **all 3 result horses** are in the pool (banker + legs)
3. If both conditions met → **HIT** — return = Trio dividend (unit bet $10)
4. If miss → classify the miss pattern (see Step 4)

**Trio payout**: Return = Trio dividend (based on $10 unit bet, which is the standard combo cost)

### Step 4: Generate Review Report

Save to `data/reviews/trio_review_YYYYMMDD_VENUE.md`

---

### Section 1: Summary

```markdown
# Trio Post-Race Review — [Venue] | [Date]

## Summary

| Metric | Value |
|--------|-------|
| Races played | **N (R1–RN)** |
| Hit rate | **X/N (XX.X%)** |
| Total staked | $X,XXX |
| Total returned | $X,XXX |
| **Net P&L** | **+/-$XXX** |
| **ROI** | **+/-XX.X%** |
| Session Result | **WIN / LOSS** |
```

### Section 2: Race-by-Race Cross-Reference

One row per race. Columns:

```markdown
| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
```

- **Mode**: B (1膽+5腳), B+ (1膽+6腳), C (1膽+7腳), etc.
- **Result**: Bold horse numbers NOT in pool (e.g. `8→**11**→13`)
- **Hit?**: `**HIT ✅**` or `MISS ❌`
- **Trio $**: Actual Trio dividend from HKJC
- **Return**: Trio dividend if hit, $0 if miss
- **P&L**: Return minus stake for that race
- **Miss Reason**: Brief classification — e.g. "Banker fail (#7 4th) + pool gap (#11 at 24x)", "**Banker fail (all 3 in legs!)**", "Banker hit, pool gap (#2 reserve 3rd at 11x)"

### Section 3: Hits Analysis

For each HIT, provide a detailed breakdown:
- Result line with Trio dividend
- Table: Horse | Role | Odds | MC Rating | Adj Place% | Result
- What made this hit work (critical inclusion, rule that triggered it, etc.)
- Return calculation

### Section 4: Miss Classification

Classify every miss into one of three patterns:

**Pattern A: Banker Fail — All 3 Placers Already in Legs**
- The most frustrating pattern. All three top-3 finishers were in the leg pool, but the banker didn't make top 3.
- For each: banker name, SP, finishing position, result horses, root cause.
- Sum the combined Pattern A missed return.

**Pattern B: Banker Hit — Pool Gap**
- Banker placed top 3, but an excluded horse also placed.
- For each: which horses hit, which horse was the pool gap, its odds and reserve status.
- Note: "Pattern B was the dominant miss pattern at X/N — pool needs expansion."

**Pattern C: Banker Fail + Pool Gap**
- Both banker failed AND an excluded horse placed. Double failure.
- Typically the hardest to fix — genuine upsets or structural blind spots.

### Section 5: What-If Analysis

Table with columns:

```markdown
| Race | Current | Alternative | Would Hit? | Cost Change |
```

For each miss: what structural change (add horse to pool, switch to full box, keep original banker, etc.) would have turned the miss into a hit? Note cost implications.

Summarise:
- **Fixable misses**: races + total recoverable return + total extra stake
- **Unfixable misses**: genuine upsets / deep longshots

### Section 6: Key Moments

Five named highlights:

- **Best Bet**: Highest-returning hit or best model call
- **Worst Bet**: Most costly mistake or worst structural error
- **Most Frustrating**: Miss that hurt the most (e.g. all legs hit but banker failed)
- **Biggest Surprise**: Most unexpected result in any race
- **Best MC Call**: Where MC's probability assessment was most accurate vs market

### Section 7: Model Calibration

#### 7a. Banker Performance

```markdown
| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | X | [list] |
| Banker 2nd-3rd | X | [list] |
| Banker out of top 3 | X | [list] |
```

Report: **Banker strike rate (top 3): X/N = XX.X%** and **Banker win rate: X/N = XX.X%**

#### 7b. Pool Coverage

```markdown
| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | X/N |
| All 3 in pool OR banker + 2 legs | X/N |
| At least 2 placers in pool | X/N |
| Banker hit + pool gap | X/N |
```

#### 7c. MC-Market Divergence Outcomes

Table: Race | Divergence Direction | Result

For each race where MC and market meaningfully disagreed, record who was right. Calculate: **MC divergence accuracy: X/N cases MC was correct (XX%)**

#### 7d. SCMP +Excuses Flag Performance

Table: Race | Horse | +Excuses For | Finished | Verdict (✅/❌)

Report: **+Excuses hit rate (top 3): X/N (XX%)**

#### 7e. Purton Performance (or leading jockey)

Table: Race | Horse | Role | Odds | Finished | Verdict

Report: Purton banker hit rate, Purton as leg hit rate, key observations.

#### 7f. Divergence Override Assessment (if applicable)

If any divergence override was applied during the meeting, document:
- What was overridden and why
- What the result was
- What the cost/benefit was
- Lesson learned

### Section 8: Learnings

Three subsections:

**What Worked** — 3-5 bullet points of positive findings with evidence.

**What Didn't Work** — 3-5 bullet points of failures with evidence.

**Strategy Adjustments** — Actionable checklist items (`- [ ]`) for future meetings. Each must be specific, testable, and tied to evidence from this meeting.

### Section 9: P&L by Confidence Level

```markdown
| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | ... | ... | ... | ... | ... | ... |
| MEDIUM-HIGH | ... | ... | ... | ... | ... | ... |
| MEDIUM | ... | ... | ... | ... | ... | ... |
```

Note which confidence level produced the hits vs losses.

### Section 10: Running Total (Season Cumulative)

#### 10a. Meeting-by-Meeting P&L

```markdown
| Meeting | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI |
```

Include all prior meetings + current meeting. Bold the current meeting row. Show **TOTAL** row.

#### 10b. Cross-Meeting Banker Performance

```markdown
| Meeting | Banker Top 3 | Rate |
```

Show combined rate.

#### 10c. Venue Breakdown

```markdown
| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
```

#### 10d. Season Trajectory

```markdown
| Metric | [Date1] | [Date2] | ... | **[Current]** | Trend |
|--------|---------|---------|-----|---------------|-------|
| Hit rate | ... | ... | ... | **XX.X%** | ... |
| Cumulative P&L | ... | ... | ... | **+$XXX** | ... |
| Cumulative ROI | ... | ... | ... | **+X.X%** | ... |
| Banker top 3 | ... | ... | ... | **XX.X%** | ... |
```

Close with a 2-3 sentence narrative summarising the session's impact on the season and the key structural finding.

---

## Step 5: Cross-Reference with Previous Reviews

Load the most recent review file to carry forward:
- Season cumulative P&L table (Meeting-by-Meeting)
- Cross-meeting banker performance
- Venue breakdown
- Season trajectory

Previous reviews are in `data/reports/trio_review_*.md`. Use the latest one to populate the Running Total section.

---

## Key Files

| File | Purpose |
|------|---------|
| `tools/scrape-meeting.ts` | Fetch results from HKJC |
| `data/historical/results_YYYYMMDD_VENUE.json` | Scraped race results |
| `data/reports/trio_strategy_YYYYMMDD_VENUE_RN.md` | Pre-race strategy reports (bet records) |
| `data/reviews/trio_review_YYYYMMDD_VENUE.md` | Saved reviews (output) |

---

## Reference Review

The canonical example of a complete review is:

`data/reports/trio_review_20260308_ST_full.md` — Sha Tin | 8 Mar 2026 (R1–R11)
