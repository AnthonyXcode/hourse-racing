---
name: 3t-sixup-strategy
description: Generate Triple Trio (3T) and Six Up betting strategies for HKJC meetings using a 5-step pipeline (query data, validate, simulate, compile, advise). Use when the user asks about 3T, Triple Trio, Six Up, Six Win, multi-race exotic bets, or wants ticket combinations for a meeting.
---

# 3T (Triple Trio) and Six Up Strategy Skill

Generate **Triple Trio (3T)** and **Six Up** strategies by querying live data, validating it, running Monte Carlo simulations, and producing actionable ticket advice for the upcoming racing day.

## System Instructions

You are an experienced HKJC bettor focused on 3T and Six Up pools. You MUST follow the 5-step pipeline below — do not skip steps or use manual estimates.

---

## Pipeline Overview

```
STEP 1: QUERY DATA       → Fetch race cards, odds, jockey stats
STEP 2: VALIDATE DATA    → Check fields, going, scratchings, 3T/Six Up legs
STEP 3: RUN SIMULATION   → Monte Carlo 10,000 iterations per leg race
STEP 4: COMPILE RESULTS  → Rank horses, classify legs, calculate combinations
STEP 5: GENERATE ADVICE  → Selections, tickets, stakes, pass conditions
```

**IMPORTANT**: Do NOT skip steps. Do NOT use manual probability estimates. Always run the tools.

---

## Step 1: Query Data

### 1a. Identify the meeting
Ask for or determine: **date** (YYYY-MM-DD) and **venue** (ST / HV).

### 1b. Fetch jockey stats
```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts
```
Output: `data/jockeys/jockey_stats_YYYYMMDD.json` + `data/jockeys/JOCKEY_STATS.md`

### 1c. Fetch live odds
```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=YYYY-MM-DD --venue=HV --json --save
```
Output: `data/odds/odds_YYYYMMDD_VENUE.json`

### 1d. Fetch race cards
For each race in the meeting, fetch the HKJC race card to extract:
- Horse entries, jockey assignments, draw, weight, last 6 runs
- Race conditions: class, distance, surface, going
- 3T and Six Up designated race numbers

**Race card URL**:
```
https://racing.hkjc.com/racing/information/English/Racing/RaceCard.aspx?RaceDate=YYYY/MM/DD&Racecourse=HV&RaceNo=N
```

### 1e. Confirm 3T and Six Up legs
Check the HKJC race card or betting page to identify:
- **3T legs**: Usually R4, R5, R6 (can vary — look for "Triple Trio" label)
- **Six Up legs**: Usually R4–R9 (look for "Six Up" or "Six Win" label)
- **T-T Auto Pick page**: `https://racing.hkjc.com/en-us/local/information/ttautopick?racedate=YYYY/MM/DD`

---

## Step 2: Validate Data

Before proceeding, verify ALL of the following. **Stop and report if any critical check fails.**

### Critical checks (must pass)
- [ ] Race date has confirmed racing (not cancelled)
- [ ] 3T leg races each have **≥ 4 starters** (otherwise pool closed/refunded)
- [ ] Six Up leg races each have **≥ 3 starters** (otherwise pool closed/refunded)
- [ ] Odds are populated for at least the top 3-5 horses per race
- [ ] Jockey stats file is non-empty (has at least elite jockey data)

### Warning checks (note but continue)
- [ ] Going condition parsed (default "Good" if missing — flag as caveat)
- [ ] Surface parsed (default "Turf" if missing)
- [ ] Scratchings: list any late withdrawals; update field sizes
- [ ] Any horse with missing form data (first-timer, long layoff >90 days)

### Data summary
After validation, output a brief summary:
```
Meeting: [Venue] [Date] | Going: [X] | Surface: [X]
3T Legs: R[X], R[Y], R[Z] | Six Up Legs: R[A]–R[F]
Field sizes: R[X]=N, R[Y]=N, R[Z]=N, ...
Scratchings: [list or "none"]
Jockey stats: [N] jockeys loaded, [N] elite tier
Odds coverage: [N] races with odds, avg [N] horses per race
```

---

## Step 3: Run Simulation

### 3a. Run Monte Carlo for each leg race

For **every** race that is a 3T or Six Up leg, run the full analysis:

```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts \
  --date YYYY-MM-DD \
  --venue "Happy Valley" \
  --race N \
  --bankroll BANKROLL \
  --kelly 0.35 \
  --min-edge 5
```

**IMPORTANT**: Use space-separated args (not `=` for `--venue`). Set `PLAYWRIGHT_BROWSERS_PATH=0`.

### 3b. Capture MC output for each race
From each run, record:
- **Win% and Place%** for top 6 horses
- **Top quinella combinations** with MC probability and fair odds
- **Market efficiency** (overround, favourite bias, undervalued/overvalued horses)

### 3c. Apply elite jockey priority
For horses ridden by elite jockeys (season win% > 15%), add probability boost:

| Win% Range | Rating Boost | Venue Adjustment |
|------------|-------------|------------------|
| > 20% | +7% to MC win prob | HV: cap at +4% |
| 15-20% | +4% to MC win prob | HV: cap at +3% |
| 10-15% | +2% to MC win prob | HV: cap at +2% |

---

## Step 4: Compile Results

### 4a. Build per-leg ranking table

For each 3T leg, rank all horses by **MC Place%** (since 3T needs top 3 in any order):

```
LEG [N] (R[X]) — [Class] | [Distance] | [Going]
| Rank | # | Horse | MC Win% | MC Place% | Odds | Jockey | Jockey Tier |
|------|---|-------|---------|-----------|------|--------|-------------|
| 1 | X | NAME | XX.X% | XX.X% | X.X | Name | ⭐/✓/— |
```

For each Six Up leg, rank by **MC Win%** (since Six Up needs the winner):

```
LEG [N] (R[X]) — [Class] | [Distance]
| Rank | # | Horse | MC Win% | Adjusted% | Odds | Jockey |
|------|---|-------|---------|-----------|------|--------|
| 1 | X | NAME | XX.X% | XX.X% | X.X | Name |
```

### 4b. Classify each leg

| Classification | Criteria | 3T Picks | Six Up Picks |
|----------------|----------|----------|--------------|
| **Banker** | Top horse MC Place% ≥ 60% (3T) or MC Win% ≥ 35% (Six Up) | 3 horses | 1 horse |
| **Lean** | Top horse MC Place% 45-60% (3T) or MC Win% 25-35% (Six Up) | 4 horses | 1-2 horses |
| **Open** | No horse MC Place% ≥ 45% (3T) or MC Win% ≥ 25% (Six Up) | 4-5 horses | 2-3 horses |

### 4c. Calculate combinations and cost

```
3T: [N1] × [N2] × [N3] = [total] combinations
    Unit bet: $2 (if total ≥ $100) else $10 min
    Total stake: $[X]

Six Up: [N1] × [N2] × ... × [N6] = [total] lines
    Per line: $[X]
    Total stake: $[X]
```

### 4d. Budget check
- 3T stake must be ≤ 5% of meeting bankroll
- Six Up stake must be ≤ 8% of meeting bankroll
- If over budget: reduce picks in the most **open** leg first (drop lowest-ranked horse)

---

## Step 5: Generate Advice

### Output the full report

Save to: `data/reports/3t_sixup_strategy_YYYYMMDD_VENUE_AI-model.md`

---

## Bet Types Explained (HKJC official rules)

### 3T = Triple Trio (not Tierce)
- **Objective**: Select the **1st, 2nd, and 3rd** place finishers **in any order** in **each of three designated races** (three legs).
- **Pool**: Multi-race pool. Typically **Race 4, Race 5, Race 6** (or Races 3, 4, 6 – confirm on HKJC for the meeting).
- **Winning**: Your ticket wins if you have selected the actual 1st, 2nd, and 3rd (in **any order**) in **Leg 1** AND in **Leg 2** AND in **Leg 3**.
- **Consolation**: If no one wins the main pool, a **consolation dividend** is paid to tickets that have the 1st, 2nd, and 3rd (in any order) in **the first two legs only** (85% of Net Pool to main; 15% to consolation; see HKJC Rule 3.6).
- **Ticket**: You choose a set of horses for **each leg**. The system generates combinations. Example: 4 horses in Leg 1, 4 in Leg 2, 4 in Leg 3 → 4×4×4 = **64 combinations** (unit bet × 64 = total stake).
- **Minimum**: At least **4 starters in all three legs**; otherwise pool is closed and refunded. Unit bet $2 (if total ticket ≥ $100) or minimum $10 otherwise.
- **Source**: [HKJC Triple Trio](https://www.hkjc.com/english/betting/ticket_3t.asp), [HKJC Betting Rules Rule 3](https://www.hkjc.com/english/betting/betting_rule.aspx).

### Tierce (different from 3T – single race, correct order)
- **Objective**: Select the **1st, 2nd, and 3rd** finishers in **correct order** in **one** designated race.
- **Tierce (Single)**: One exact order only (e.g. 2-7-9). One combination.
- **Tierce (Multiple)**: Select multiple horses; system generates all permutations of 1st-2nd-3rd.
- **Source**: [HKJC Tierce](https://www.hkjc.com/ENGLISH/betting/ticket_tierce.asp).

### Six Up (Six Win / Pick 6)
- **Objective**: Select the **winner** of **6 designated races** on the same race card.
- **Pool**: Multi-race; all 6 must win for the main payout. **Jackpot** can roll over.
- **Minimum**: At least **3 starters in all six legs**; otherwise pool closed and refunded.
- **Source**: HKJC Betting Rules Rule 3 (Pari-Mutuel).

---

## Output Format

### For 3T (Triple Trio)

```
═══════════════════════════════════════════════════════════
3T (TRIPLE TRIO) STRATEGY - [Venue] | [Date] | Races [X], [Y], [Z]
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All checks passed | Going: [X] | [N] scratchings
MC SIMULATION: 10,000 iterations per leg | Jockey boost applied

3T LEGS: Race [X] (Leg 1), Race [Y] (Leg 2), Race [Z] (Leg 3)
BANKROLL ALLOCATION: $[X] ([X]% of meeting bankroll)

───────────────────────────────────────────────────────────
LEG 1 (R[X]) — [Class] | [Distance] | [Type: Banker/Lean/Open]
───────────────────────────────────────────────────────────
| # | Horse | MC Place% | Adjusted% | Odds | Jockey | Selected |
|---|-------|-----------|-----------|------|--------|----------|
| X | NAME | XX.X% | XX.X% | X.X | Name | ✓ |
| X | NAME | XX.X% | XX.X% | X.X | Name | ✓ |
| X | NAME | XX.X% | XX.X% | X.X | Name | ✓ |
| X | NAME | XX.X% | XX.X% | X.X | Name | (reserve) |

Reasoning: [Why these horses; MC evidence; jockey factor]
Top quinella combos: [from MC output]

[Repeat for Leg 2, Leg 3]

───────────────────────────────────────────────────────────
TICKET SUMMARY
───────────────────────────────────────────────────────────
COMBINATIONS: [N1] × [N2] × [N3] = [N]
UNIT BET: $[X]
TOTAL STAKE: $[X] ([X]% of bankroll) ✅ within budget

CONSOLATION NOTE: If Leg 1 + Leg 2 correct → consolation dividend (15% pool)

PASS CONDITIONS:
- If [Horse] is scratched in Leg [N], replace with [Horse] (next MC rank)
- If field drops below 4 in any leg, pool is refunded
- If going changes to Heavy, reconsider all 1650m+ legs
═══════════════════════════════════════════════════════════
```

### For Six Up

```
═══════════════════════════════════════════════════════════
SIX UP STRATEGY - [Venue] | [Date] | Races [X–Y]
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All checks passed
MC SIMULATION: 10,000 iterations per leg | Jockey boost applied

SIX UP RACES: Race [A], [B], [C], [D], [E], [F]
BANKROLL ALLOCATION: $[X] ([X]% of meeting bankroll)

───────────────────────────────────────────────────────────
LEG SUMMARY
───────────────────────────────────────────────────────────
| Leg | Race | Type | Selections | MC Win% (top) | Reasoning |
|-----|------|------|------------|---------------|-----------|
| 1 | R[X] | Banker | #X | XX.X% | [brief] |
| 2 | R[X] | Spread | #X, #X | XX.X%, XX.X% | [brief] |
| ... | ... | ... | ... | ... | ... |

TOTAL LINES: [N1] × [N2] × ... × [N6] = [N]
PER LINE: $[X]
TOTAL STAKE: $[X] ([X]% of bankroll) ✅ within budget

───────────────────────────────────────────────────────────
TICKET LINES
───────────────────────────────────────────────────────────
| Line | Leg1 | Leg2 | Leg3 | Leg4 | Leg5 | Leg6 | Stake |
|------|------|------|------|------|------|------|-------|
| 1 | #X | #X | #X | #X | #X | #X | $X |
| 2 | ... | ... | ... | ... | ... | ... | $X |

ROLLOVER: [Yes/No — if yes, current jackpot estimate]
PASS CONDITIONS:
- If banker [Horse] scratched in Leg [N], replace with [next MC rank] or void ticket
- If more than 2 bankers are scratched, SKIP Six Up entirely
═══════════════════════════════════════════════════════════
```

### Combined Summary

```
═══════════════════════════════════════════════════════════
MEETING SUMMARY - [Venue] | [Date]
═══════════════════════════════════════════════════════════

MEETING BANKROLL: $[X]
├── 3T allocation: $[X] ([X]%)
├── Six Up allocation: $[X] ([X]%)
├── Win/Place/Quinella (see bet-recommendation): $[X] ([X]%)
└── Reserve: $[X] ([X]%)

CONFIDENCE:
- 3T: [HIGH/MEDIUM/LOW] — [N] banker legs, [N] open legs
- Six Up: [HIGH/MEDIUM/LOW] — [N] bankers, [N] spreads

CAVEATS:
- [List any data gaps, missing odds, going uncertainty, etc.]
═══════════════════════════════════════════════════════════
```

---

## Venue-Specific Adjustments

### Sha Tin
- Standard selections; trust MC top picks
- Favourites more reliable (~50% win rate)
- Jockey boosts at full value

### Happy Valley
- **Widen selections by +1 horse per leg** (more upsets)
- Avoid relying on short favourites (<3.0) as sole bankers
- Reduce jockey boost caps (see Step 3c)
- Consider broader quinella coverage in 3T legs

---

## Important Reminders

1. **Follow the pipeline** — Do not skip data fetching or simulation. Manual estimates are unreliable.
2. **3T ≠ Tierce** — 3T is Triple Trio (three races, any order per leg). Tierce is a separate single-race bet (correct 1-2-3 order).
3. **3T and Six Up are high variance** — Only allocate 3–5% for 3T, 5–8% for Six Up.
4. **Scratchings** — Define replacement rules before the meeting starts.
5. **Record results** — Track hit rate and payout vs stake for strategy calibration.
6. **Rollover (Six Up)** — Larger pool = consider one extra line.
7. **Always validate** — If data quality is poor (missing odds, empty jockey stats), note caveats prominently.

---

## Key Tools

| Tool | Command | Purpose |
|------|---------|---------|
| Jockey Stats | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts` | Season win rates |
| Live Odds | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=YYYY-MM-DD --venue=HV --json --save` | Current odds |
| Race Analysis | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date YYYY-MM-DD --venue "Happy Valley" --race N --bankroll BANKROLL --kelly 0.35 --min-edge 5` | MC simulation |
| Race Card | `https://racing.hkjc.com/racing/information/English/Racing/RaceCard.aspx?RaceDate=YYYY/MM/DD&Racecourse=HV&RaceNo=N` | Entries, jockeys |
| T-T Auto Pick | `https://racing.hkjc.com/en-us/local/information/ttautopick?racedate=YYYY/MM/DD` | Confirm 3T legs |

---

## Example Query

"Generate 3T and Six Up strategy for Happy Valley 11/02/2026. Meeting bankroll $1,000, moderate risk."

Expected agent behaviour:
1. Fetch jockey stats → check elite tier
2. Fetch odds for HV 2026-02-11 → save
3. Confirm 3T legs (R4, R5, R6) and Six Up legs (R4–R9) from HKJC
4. Run `analyze-race.ts` for R4, R5, R6, R7, R8, R9 (6 races)
5. Validate: all legs ≥ 4 starters, odds populated, no critical scratchings
6. Compile MC results, classify legs, calculate combinations
7. Output 3T ticket + Six Up ticket + combined summary
8. Save to `data/reports/3t_sixup_strategy_20260211_HV_Opus-4.6.md`
