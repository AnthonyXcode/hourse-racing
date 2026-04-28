---
name: post-race-review
description: Review race results, calculate P&L, and extract learnings after a meeting. Use when the user asks to review results, check how bets performed, calculate profit/loss, or asks about yesterday's racing.
---

# Trio Post-Race Review Skill

Analyze Trio race results, calculate P&L, classify misses, calibrate the model, and extract actionable learnings after a race meeting. Includes **A/B strategy comparison** to track whether the full pipeline outperforms a simpler MC-only baseline.

## A/B Strategy Definitions

Every review compares two strategies side-by-side:

| | Strategy A (Full Pipeline) | Strategy B (MC Top 6 + #1 Banker) |
|---|---|---|
| **Pool selection** | MC + jockey boost + SCMP adjustments → Adj Win%/Place% → race classification (Dominant/Competitive/Wide) → Mode A (5), B (6), or C (7) | Always first **6** horses by **raw MC Win%** |
| **Banker rule** | 1st by Adj Win%, no debutants (<2 starts) as banker, cap jockey boost if MC disagrees | Always MC rank **#1** (no debutant rule) |
| **Bet structure** | 膽拖 (variable pool size per mode) | 膽拖 1膽 + 5腳 = **10 combos** fixed |
| **Stake per race** | $10/combo × combos (varies by mode: $60–$150) | $10/combo × 10 = **$100 fixed** |
| **SCMP data** | Used (form flags, TIR, vet, trackwork → ±% adjustments) | **Not used** |
| **Jockey boost** | Applied (linear +1% to +7%, capped if MC disagrees) | **Not applied** |
| **Races played** | May PASS wide-open races (Mode D) | **All races** (no PASS) |

**Strategy B derivation:** For each race, read the **MC SIMULATION (raw)** table from the strategy report (or from `run-analyze-trio-report.ts` output). Sort horses by MC Win% descending. Take the first 6 as the pool. The #1 horse is the banker. No further adjustments.

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

#### 10e. Cumulative A/B Comparison

Track both strategies across all meetings to determine which approach is structurally better over time.

```markdown
| Meeting | Date | Venue | A Hits | A P&L | A ROI | B Hits | B P&L | B ROI | Winner |
|---------|------|-------|--------|-------|-------|--------|-------|-------|--------|
| 1 | YYYY-MM-DD | XX | X/N | ±$XXX | ±X% | X/N | ±$XXX | ±X% | A/B/Tie |
| **[Current]** | ... | ... | ... | ... | ... | ... | ... | ... | ... |
| **TOTAL** | | | **X/N** | **±$X,XXX** | **±X.X%** | **X/N** | **±$X,XXX** | **±X.X%** | **A/B** |
```

```markdown
| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | N | N | — |
| Total races | N | N | ±N |
| Hits (rate) | X/N (XX.X%) | X/N (XX.X%) | ±X |
| Total staked | $X,XXX | $X,XXX | ±$XXX |
| Total returned | $X,XXX | $X,XXX | ±$XXX |
| **Cumulative P&L** | **±$X,XXX** | **±$X,XXX** | **±$X,XXX** |
| **Cumulative ROI** | **±XX.X%** | **±XX.X%** | **±XX.X pp** |
| Banker top 3 rate | X/N (XX.X%) | X/N (XX.X%) | ±X |
```

Close with a 2-3 sentence narrative summarising the session's impact on the season and the key structural finding. Include whether the cumulative A/B data is converging toward one strategy or still inconclusive.

### Section 11: A/B Strategy Comparison

Compare Strategy A (full pipeline) and Strategy B (MC top 6, #1 banker) for every race.

#### 11a. How to derive Strategy B

For each race, use the **MC SIMULATION (raw)** table from the strategy report or `run-analyze-trio-report.ts` output:
1. Sort all horses by **MC Win%** descending
2. Take the **first 6** as the pool
3. **#1** (highest MC Win%) is the **banker**
4. Bet: 膽拖 1膽 + 5腳 = **10 combos @ $10 = $100/race**
5. Apply to **all races** (no PASS)
6. Hit rule: banker in top 3 AND all 3 result horses in the 6-horse pool

#### 11b. Race-by-Race A/B Table

```markdown
| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|-------------|----------------|------------------------|----------------------|----------------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1   | [horses]    | #X             | [horses]               | #X                   | X→X→X          | ✅/❌  | ✅/❌  | $X,XXX | $X       | $X       | $XXX    | $100    | [what differed] |
```

- **Strat A Pool/Banker**: From the strategy report (with SCMP/jockey adjustments)
- **Strat B Pool/Banker**: From raw MC Win% ranking only
- **Key Difference**: Note when pools or bankers diverge (e.g. "A banker #10 (debutant swap), B banker #2 (MC #1)", "A Mode A 5-horse pool, B always 6", "Same pool & banker")

#### 11c. A/B Summary

```markdown
| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | N | N | [±N] |
| Hits | X/N (XX.X%) | X/N (XX.X%) | [±X] |
| Total staked | $X,XXX | $X,XXX | [±$XXX] |
| Total returned | $X,XXX | $X,XXX | [±$XXX] |
| **Net P&L** | **±$XXX** | **±$XXX** | **[±$XXX]** |
| **ROI** | ±XX.X% | ±XX.X% | [±XX.X pp] |
| Banker top 3 rate | X/N (XX.X%) | X/N (XX.X%) | [±X] |
```

#### 11d. Where A and B Diverged

List only the races where the two strategies produced **different outcomes** (one hit, one miss, or different pools):

```markdown
| Race | What Differed | A Result | B Result | Impact |
|------|--------------|----------|----------|--------|
| RX   | Banker: A=#X, B=#Y | MISS ❌ | HIT ✅ | B gained $XXX |
| RX   | Pool: A dropped #X, B included | HIT ✅ | HIT ✅ | Same |
```

For each divergence, note the **root cause** — e.g. "debutant banker swap", "SCMP -perf demotion", "jockey boost changed ranking", "Mode A tight pool excluded #X".

#### 11e. Session Verdict

One-paragraph assessment:
- Which strategy won this session and by how much
- Was the difference driven by **systematic edge** (e.g. A's adjustments consistently helped/hurt) or **variance** (one lucky/unlucky race swung the result)?
- Any specific A-only rule that cost/saved money (e.g. "no debutant as banker" rule)

---

## Step 5: Save Deliverables

After generating the main review report (Step 4), produce three additional deliverables.

### 5a. Save Trio Strategy B (stratC) Review

Save a **standalone Strategy B review** to:

```
data/reviews/trio_review_stratC_YYYYMMDD_VENUE.md
```

This file focuses on Strategy B (MC-only) performance and includes:
- **Rules** section (banker = MC #1, primary legs = Place% > 20%, Step B swap/add, unit $10, 膽拖)
- **Summary** table (hits, staked, returned, P&L, ROI for both A and B)
- **Race-by-Race Results** — two tables:
  - **Strategy B**: Race | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L
  - **Strategy A**: Race | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason

This is the primary input for `tools/summarize-trio-stratc-hit-rate.ts`.

### 5b. Append MC #1 Place Review

Append a new meeting block to:

```
data/test_reports/mc_top1_place_allup_summary.md
```

For each race in the meeting, record:
- MC #1 horse (by raw MC Win%)
- MC Win% and MC Place%
- Whether the MC #1 horse **placed** (received an HKJC Place dividend)
- Place dividend if placed

Format:
```markdown
## Meeting N: [Venue] | DD Mon YYYY (N races)

| Race | Class | Dist (m) | MC #1 | MC Win% | MC Place% | Placed? | Place $ (if placed) |
```

Also update the **Meeting Placing Patterns** summary table at the top with a new row for this meeting (date, venue, course, going, races, avg Win%, avg Place%, placed count, rate, pattern, max streak).

This is the primary input for `tools/summarize-mc-top1-place-breakdown.ts`.

### 5c. Generate Statistics

Run the summarize tools to regenerate segment breakdowns in `data/static/`:

```bash
npx tsx tools/summarize-mc-top1-place-breakdown.ts
npx tsx tools/summarize-trio-stratc-hit-rate.ts
```

Output files:
- `data/static/mc_top1_place_hit_rate_by_segment_YYYYMMDD.md`
- `data/static/trio_stratC_hit_rate_by_segment_YYYYMMDD.md`

These aggregate all meetings and break down hit rates by venue, surface, class, distance, and cross-dimensions.

---

## Step 6: Cross-Reference with Previous Reviews

Load the most recent review file to carry forward:
- Season cumulative P&L table (Meeting-by-Meeting)
- Cross-meeting banker performance
- Venue breakdown
- Season trajectory
- **Cumulative A/B comparison table** (10e) — carry forward all prior meeting rows and append the current meeting

Previous reviews are in `data/reports/trio_review_*.md` and `data/reviews/trio_review_*.md`. Use the latest one to populate the Running Total and A/B cumulative sections.

---

## Key Files

| File | Purpose |
|------|---------|
| `tools/scrape-meeting.ts` | Fetch results from HKJC |
| `tools/run-analyze-trio-report.ts` | Generate MC raw data for all races (Strategy B source) |
| `tools/summarize-mc-top1-place-breakdown.ts` | Generate MC #1 place hit rate by segment → `data/static/` |
| `tools/summarize-trio-stratc-hit-rate.ts` | Generate Strategy B Trio hit rate by segment → `data/static/` |
| `data/historical/results_YYYYMMDD_VENUE.json` | Scraped race results |
| `data/reports/trio_strategy_YYYYMMDD_VENUE_RN.md` | Pre-race strategy reports (Strategy A bet records) |
| `data/test_reports/mc_top1_place_allup_summary.md` | MC #1 place running summary (append per meeting) |
| `data/test_reports/trio_mc_top6_banker_YYYYMMDD_VENUE.md` | Strategy B test results |
| `data/reviews/trio_review_YYYYMMDD_VENUE.md` | Saved reviews (output, includes A/B comparison) |
| `data/reviews/trio_review_stratC_YYYYMMDD_VENUE.md` | Strategy B (stratC) standalone review |
| `data/static/` | Generated segment statistics (hit rate by venue/class/surface/distance) |
