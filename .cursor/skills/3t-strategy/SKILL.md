---
name: 3t-strategy
description: Generate Triple Trio (3T) betting strategies for HKJC meetings using a 6-step pipeline (query data, validate, simulate, compile, advise, review). Use when the user asks about 3T, Triple Trio, multi-race exotic bets for top 3 finishers, or wants 3T ticket combinations for a meeting.
---

# 3T (Triple Trio) Strategy Skill_test

Generate **Triple Trio (3T)** strategies by querying live data, validating it, running Monte Carlo simulations, and producing actionable ticket advice for the upcoming racing day.

## System Instructions

You are an experienced HKJC bettor focused on the 3T pool. You MUST follow the 6-step pipeline below — do not skip steps or use manual estimates.

---

## Pipeline Overview

```
STEP 1: QUERY DATA       → Sync historical data, fetch race cards, odds, jockey stats, SCMP race card
STEP 2: VALIDATE DATA    → Check fields, going, scratchings, 3T legs, SCMP coverage
STEP 3: RUN SIMULATION   → Monte Carlo 10,000 iterations per leg race + SCMP form adjustments
STEP 4: COMPILE RESULTS  → Rank horses, classify legs, incorporate SCMP insights, calculate combinations
STEP 5: GENERATE ADVICE  → Selections, tickets, stakes, pass conditions
STEP 6: POST-RACE REVIEW → Fetch results, cross-reference, classify misses, save review
```

**IMPORTANT**: Do NOT skip steps. Do NOT use manual probability estimates. Always run the tools.

---

## Step 1: Query Data

### 1a. Identify the meeting
Ask for or determine: **date** (YYYY-MM-DD) and **venue** (ST / HV).

### 1b. Sync historical data

Run the historical data sync tool to ensure all past meeting results are available for the MC simulation. The MC simulator uses `data/historical/` files to enrich horse form, speed ratings, and jockey/trainer stats — stale data degrades simulation accuracy.

```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/sync-historical.ts
```

This will:
- Compare the fixture list against existing `data/historical/results_*.json` files
- Scrape any missing meetings (with automatic venue fallback)
- Report sync status

If the script reports "All historical data is up to date!" proceed immediately. If it scraped new meetings, the MC simulation will automatically pick up the fresh data.

**To add future meeting dates** (e.g. new month's fixtures): edit `data/historical/fixtures.json` and add entries, then re-run.

> **Critical**: Do NOT skip this step. Running MC simulation on stale historical data means horses' latest form, speed ratings, and jockey stats may be missing — especially for horses that ran in recent meetings not yet scraped.

### 1c. Fetch jockey stats
```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts
```
Output: `data/jockeys/jockey_stats_YYYYMMDD.json` + `data/jockeys/JOCKEY_STATS.md`

### 1d. Fetch live odds
```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=YYYY-MM-DD --venue=HV --json --save
```
Output: `data/odds/odds_YYYYMMDD_VENUE.json`

### 1e. Fetch race cards
For each race in the meeting, fetch the HKJC race card to extract:
- Horse entries, jockey assignments, draw, weight, last 6 runs
- Race conditions: class, distance, surface, going
- 3T designated race numbers

**Race card URL**:
```
https://racing.hkjc.com/racing/information/English/Racing/RaceCard.aspx?RaceDate=YYYY/MM/DD&Racecourse=HV&RaceNo=N
```

### 1f. Fetch SCMP Race Card Data

Fetch the South China Morning Post race card page for supplementary data:

**URL**: `https://www.scmp.com/sport/racing/racecard` (default loads current meeting day)
**Per-race URL**: `https://www.scmp.com/sport/racing/racecard/N` (for race N)

Use `WebFetch` to retrieve each leg race page. Extract the following data — **do NOT use tipster picks**:

#### 1f-i. Win/Place Odds

The SCMP race card table includes **Win** and **Place** odds columns for every horse. These are the actual HKJC pool odds and are often more complete than what the `fetch-odds.ts` scraper captures.

**How to use:**
- Use as primary odds source when `fetch-odds.ts` returns partial data
- Record all horses' Win and Place odds for leg races
- Identify market favourites and longshots for edge calculations

#### 1f-ii. Star Form Comments

Each horse has a **Star Form** comment written by SCMP analysts. Extract key signals:
- **Positive signals**: "winner", "made all", "rallied", "improved", "sharp", "does draw well"
- **Negative signals**: "disappointed", "failed", "did not run out the distance", "wide trip", "no excuse"
- **Fitness flags**: "resumed", "first-timer", "off 126 days", "returns from injury"
- **Draw comments**: "gate's a hurdle", "gate should help", "drawn to get his chance"

#### 1f-iii. Trouble in Running (TIR)

Extract recent **stewards' reports** for each horse. Key flags:
- **Recurring issues**: "bumped on jumping" (repeated = barrier problem)
- **Not ridden out**: Indicates jockey concern about soundness
- **Unacceptable performance**: Horse under stewards' watch
- **Crowded / steadied**: Bad luck last run = potential improver

#### 1f-iv. Vet's Report

Check for **health flags**:
- Recent injury / lameness → **reduce confidence** even if passed vet exam
- "Passed on [date]" after injury → check how recent; if <30 days, flag as risk
- "Eight years of age or above" → reduced reliability for form reversal

#### 1f-v. Trackwork Highlights

Extract notable trial / gallop mentions:
- "Travelled well for second in his latest trial" = **positive trial form**
- "Looks ready to strike" = trainer confidence
- Use to **break ties** between similarly ranked MC horses

#### 1f-vi. Quinella Place & Quinella Odds Matrix

The SCMP publishes full **QP and Q odds matrices** for each race. These are the actual HKJC pool odds.

**How to use:**
- Cross-reference MC top quinella combinations with actual QP/Q pool odds
- Identify **value quinellas**: MC probability high but QP/Q odds also high → mispriced
- For 3T legs: use QP matrix to confirm which top-3 combinations the market undervalues
- Save the QP/Q odds for horses in your 3T selections for the report

#### 1f-vii. Philip Woo's Formline

A detailed **race-by-race narrative** from SCMP's senior form analyst. Extract:
- Which horses he highlights as main chances
- Draw analysis and pace scenario
- Specific horse-by-horse notes that may not appear in Star Form

---

### 1g. Confirm 3T legs

**Primary source** — HKJC General Information page (lists all pool types and their designated races):
```
https://racing.hkjc.com/en-us/local/info/summary
```
Use `WebFetch` to retrieve this page on race day. Look for the **Triple Trio** row which specifies the exact leg races (e.g. "Triple Trio: Races 5, 6 & 7"). The default is R4, R5, R6 but this **varies** — always verify.

**Fallback source** — T-T Auto Pick page (if General Information is unavailable or unclear):
```
https://racing.hkjc.com/en-us/local/information/ttautopick?racedate=YYYY/MM/DD
```

**Do NOT assume R4-R5-R6.** The legs can shift to R5-R6-R7 or other combinations depending on the meeting schedule.

---

## Step 2: Validate Data

Before proceeding, verify ALL of the following. **Stop and report if any critical check fails.**

### Critical checks (must pass)
- [ ] Race date has confirmed racing (not cancelled)
- [ ] 3T leg races each have **≥ 4 starters** (otherwise pool closed/refunded)
- [ ] Odds are populated for at least the top 3-5 horses per race
- [ ] Jockey stats file is non-empty (has at least elite jockey data)

### Warning checks (note but continue)
- [ ] Going condition parsed (default "Good" if missing — flag as caveat)
- [ ] Surface parsed (default "Turf" if missing)
- [ ] Scratchings: list any late withdrawals; update field sizes
- [ ] Any horse with missing form data (first-timer, long layoff >90 days)
- [ ] SCMP race card data retrieved (if fetch fails, proceed without — note as caveat)

### Data summary
After validation, output a brief summary:
```
Meeting: [Venue] [Date] | Going: [X] | Surface: [X]
3T Legs: R[X], R[Y], R[Z]
Field sizes: R[X]=N, R[Y]=N, R[Z]=N
Scratchings: [list or "none"]
Jockey stats: [N] jockeys loaded, [N] elite tier
Odds coverage: [N] races with odds, avg [N] horses per race
SCMP data: [✅ loaded / ⚠️ partial / ❌ unavailable] | [N] races with form/odds
```

---

## Step 3: Run Simulation

### 3a. Run Monte Carlo for each 3T leg race

For **every** race that is a 3T leg, run the full analysis:

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

### 3d. Apply SCMP form adjustments

After MC simulation and jockey boosts, apply the following adjustments sourced from SCMP data.
**Skip this step if SCMP data was unavailable (note as caveat in report).**

#### Negative Form Flags (from Star Form, TIR, Vet Report)

| Flag | Condition | Adjustment |
|------|-----------|------------|
| **Recent injury** | Vet report shows injury passed <30 days ago | -3% to MC Win%, -4% to MC Place% |
| **Unacceptable performance** | Stewards flagged unacceptable last run | -2% to MC Win% |
| **Repeated barrier issues** | TIR shows "bumped on jumping" in ≥2 recent runs | -1% to MC Win% |
| **Age concern** | Vet notes "8 years of age or above" | -2% to MC Win% in C3+ races |
| **Not ridden out** | TIR notes jockey didn't ride out | -2% to MC Win% |

#### Positive Form Flags (from Star Form, Trackwork, Formline)

| Flag | Condition | Adjustment |
|------|-----------|------------|
| **Strong trial** | Trackwork highlight: "travelled well", "looks ready" | +2% to MC Win% |
| **Draw advantage** | Star Form / Formline: "drawn to get his chance", "gate should help" | +1% to MC Win% |
| **Improving form** | Star Form: "improved", "rallied", "made all" in recent run | +1% to MC Win% |
| **Excuses last run** | TIR: "crowded", "steadied", "wide trip" = bad luck | +2% to MC Win% (bounce candidate) |

#### Cap rule
- Total SCMP form adjustment per horse: **max ±8%** to MC Win%, **max ±10%** to MC Place%
- If adjustments push any horse's probability above 50% Win or 85% Place, cap at those values
- Always show **raw MC%** and **adjusted%** (after all boosts) in the report

---

## Step 4: Compile Results

### 4a. Build per-leg ranking table

For each 3T leg, rank all horses by **Adjusted Place%** (since 3T needs top 3 in any order):

```
LEG [N] (R[X]) — [Class] | [Distance] | [Going]
| Rank | # | Horse | MC Win% | MC Place% | Adj Place% | Odds | Jockey | SCMP Flags |
|------|---|-------|---------|-----------|------------|------|--------|------------|
| 1 | X | NAME | XX.X% | XX.X% | XX.X% | X.X | Name | +trial, +draw |
```

- **SCMP Flags**: Short codes for adjustments applied (e.g., +trial, +draw, -injury, -TIR)

### 4b. Classify each leg

Use **adjusted** probabilities (after jockey + SCMP form boosts) for classification:

| Classification | Criteria | 3T Picks |
|----------------|----------|----------|
| **Banker** | Top horse Adj Place% ≥ 55% | **5 horses** |
| **Lean** | Top horse Adj Place% 40-55% | **5-6 horses** |
| **Open** | No horse Adj Place% ≥ 40% | **6-7 horses** |

> **Why wider selections?** Backtest over 3 months (25 meetings, 75 legs) showed that narrower picks
> (3 for Banker, 4 for Lean) only achieved an 18.7% per-leg hit rate. Banker legs with 3 picks hit
> just 13.6% — worse than Open legs with 4+ picks (33.3%). Covering the actual top 3 in a 12-14
> horse field requires at least 4-5 picks per leg. Wider selections increase combinations (and lower
> flexi payout per unit) but dramatically improve hit probability, which is the binding constraint.

**Minimum selection rule**: Always select **at least 5 horses** per 3T leg, even if the leg classifies as Banker.

**Longshot insurance rule**: After selecting top-N horses by Adj Place%, check if **all** selected horses have odds < 8.0. If so, add the highest-ranked horse with odds between 8.0 and 20.0 as an extra pick. This guards against mid-range longshot spoilers, which accounted for ~74% of missed legs in backtesting.

**Tie-breaking rules** (when two horses have similar adjusted probabilities within 2%):
1. Prefer the horse with positive SCMP flags (+trial, +draw) over neutral
2. Prefer the horse without negative SCMP flags (-injury, -TIR)
3. Refer to Philip Woo's Formline narrative for final tiebreak

#### Exclusion rules (aligned with Trio skill)

**Rule 1: No hard exclusion if market odds ≤ 15.** Include in the leg pool instead. The market incorporates vet reports, injury flags, and fitness concerns. If the collective market still rates a horse as a serious contender (odds 15 or shorter) despite negative flags, respect it. Only fully exclude horses with SCMP Win odds > 30 AND zero positive SCMP flags.
- **Evidence**: R7 19-Feb — #11 JUST FOLLOW ME (9.2 odds) excluded for "lame LH passed 16d ago" injury flag, came 2nd. $180,691 3T dividend missed.

**Rule 2: Gate penalties are probability reducers (1–3%), not exclusions.** Wide gates (10+) should reduce Adj Place% by 1–3% depending on field size and distance, but NEVER trigger hard exclusion.

#### Per-leg 膽拖 (Banker-Leg) structure — cost optimisation

After classifying each leg and selecting horses, check if any horse within a leg qualifies as a **膽 (Banker)**:

| Condition | Structure | Per-leg combos |
|-----------|-----------|----------------|
| **1 horse Adj Place% >= 63%** | **膽拖** (1 Banker + N Legs) | C(N, 2) = N × (N-1) / 2 |
| **2 horses Adj Place% >= 63%** | **雙膽拖** (2 Bankers + N Legs) | N combos |
| **No horse >= 63%** | **Full pool** (standard) | C(P, 3) per leg |

**How it works in 3T:**
- **膽 (Banker)**: Locked into EVERY per-leg combination — must finish top 3 for ANY ticket covering that leg to win.
- **腳 (Legs)**: The remaining horses in the leg. System picks 2 from legs (1-banker) or 1 from legs (2-banker) to complete each combination.
- Each leg is evaluated independently — Leg 1 might have a banker while Leg 2 uses full pool.
- Total 3T combos = Leg1_combos × Leg2_combos × Leg3_combos.

**Per-leg combination table (1 Banker 膽拖):**

| Leg picks | Structure | Per-leg combos | vs Full pool per-leg | Savings |
|-----------|-----------|----------------|---------------------|---------|
| 5 (1膽+4腳) | 膽拖 | C(4,2) = 6 | C(5,3) = 10 | **40%** |
| 6 (1膽+5腳) | 膽拖 | C(5,2) = 10 | C(6,3) = 20 | **50%** |
| 7 (1膽+6腳) | 膽拖 | C(6,2) = 15 | C(7,3) = 35 | **57%** |

**Per-leg combination table (2 Bankers 雙膽拖):**

| Leg picks | Structure | Per-leg combos | vs Full pool per-leg | Savings |
|-----------|-----------|----------------|---------------------|---------|
| 5 (2膽+3腳) | 雙膽拖 | 3 | C(5,3) = 10 | **70%** |
| 6 (2膽+4腳) | 雙膽拖 | 4 | C(6,3) = 20 | **80%** |
| 7 (2膽+5腳) | 雙膽拖 | 5 | C(7,3) = 35 | **86%** |

**Total 3T combo examples (showing cost impact):**

| Leg 1 | Leg 2 | Leg 3 | Total combos | $50 flexi | Notes |
|-------|-------|-------|-------------|-----------|-------|
| 10 (full 5) | 10 (full 5) | 10 (full 5) | 1,000 | 2.5% | All standard, minimum picks |
| 6 (膽拖 5) | 10 (full 5) | 10 (full 5) | 600 | 4.2% | 1 banker leg saves 40% |
| 6 (膽拖 5) | 6 (膽拖 5) | 10 (full 5) | 360 | 6.9% | 2 banker legs |
| 6 (膽拖 5) | 6 (膽拖 5) | 6 (膽拖 5) | 216 | 11.6% | All banker legs (rare) |
| 10 (膽拖 6) | 10 (膽拖 6) | 20 (full 6) | 2,000 | 1.25% | Mixed wider selections |
| 6 (膽拖 5) | 10 (膽拖 6) | 15 (膽拖 7) | 900 | 2.8% | Mixed with banker savings |

**When to use 膽拖 per leg:**
1. **Adj Place% >= 63%** is the threshold. This means ~63% probability of finishing top 3 — strong enough to anchor a per-leg banker.
2. Apply AFTER the leg pool is selected using Banker/Lean/Open classification. The banker check is a **bet structure optimisation**, not a horse selection change.
3. The same pool of horses is used per leg; only the HKJC bet slip structure changes (select "膽" and "腳" per leg).
4. If the per-leg banker fails to finish top 3, that entire leg is busted → the whole 3T ticket fails.
5. **Never force a banker** if no horse meets the 63% threshold per leg. Use full pool per-leg instead.
6. For 2-banker (雙膽拖) per leg, BOTH must have Adj Place% >= 63%. Only use when the leg is very strongly structured.

**Decision flow per leg:**
```
Leg pool selected (P horses for this leg)
  │
  ├─ Any horse Adj Place% >= 63%?
  │   ├─ YES, 1 horse → 膽拖: 1 膽 + (P-1) 腳 → C(P-1, 2) combos for this leg
  │   ├─ YES, 2 horses → 雙膽拖: 2 膽 + (P-2) 腳 → (P-2) combos for this leg
  │   └─ NO → Full pool: C(P, 3) combos for this leg
  │
  Total 3T combos = Leg1_combos × Leg2_combos × Leg3_combos
```

### 4c. Calculate combinations and cost

```
3T combinations (per-leg, then multiply across legs):

Per leg (no banker):    C(P, 3)  where P = total picks
Per leg (1 膽拖):       C(N, 2)  where N = legs (P-1)
Per leg (2 雙膽拖):     N        where N = legs (P-2)

Total 3T combos = Leg1_combos × Leg2_combos × Leg3_combos
Unit bet: $2 (if total ≥ $100) else $10 min
Total stake: combos × unit bet (or flexi)
```

**3T combination quick reference:**

| Leg 1 | Leg 2 | Leg 3 | Total | $50 flexi | Scenario |
|-------|-------|-------|-------|-----------|----------|
| C(5,3)=10 | C(5,3)=10 | C(5,3)=10 | 1,000 | 2.5% | All full pool, 5 picks |
| C(4,2)=6 | C(5,3)=10 | C(5,3)=10 | 600 | 4.2% | Leg 1 has 膽拖 (5 picks) |
| C(4,2)=6 | C(4,2)=6 | C(5,3)=10 | 360 | 6.9% | Legs 1+2 have 膽拖 |
| C(4,2)=6 | C(4,2)=6 | C(4,2)=6 | 216 | 11.6% | All 3 legs 膽拖 (rare) |
| C(5,2)=10 | C(5,2)=10 | C(6,3)=20 | 2,000 | 1.3% | 膽拖 6 + full 6 |
| C(5,3)=10 | C(6,3)=20 | C(6,3)=20 | 4,000 | 0.6% | Full 5 + full 6 + full 6 |

**Key advantage of 膽拖 per leg**: Same horse coverage but dramatically fewer per-leg combinations. A 5-pick leg with 1 banker = 6 combos (vs 10 full pool). Across 3 legs, the savings compound multiplicatively. Higher flexi %, bigger payout per dollar risked — IF the bankers place top 3.

### 4d. Budget check
- 3T stake is a **fixed flexi bet** (e.g. $50 per ticket regardless of combination count)
- 3T flexi allocation must be ≤ 5% of meeting bankroll
- If over budget: USE 膽拖 per leg (if Adj Place% >= 63% banker exists) to reduce combos, OR reduce picks in the most **open** leg first (drop lowest-ranked horse)
- **Note**: With wider selections (5-5-5 = 125 combos baseline, 6-6-7 = 252 combos max), the flexi percentage is lower per unit, but the priority is achieving a hit. At $50 flexi, 125 combos = 20% flexi; 252 combos ≈ 10% flexi. A lower-flexi winning ticket far outweighs a missed narrow ticket.

---

## Step 5: Generate Advice

### Output the full report

Save to: `data/reports/3t_strategy_YYYYMMDD_VENUE.md`

---

## Step 6: Post-Race Review (aligned with Trio skill)

After each meeting, compare predictions to actual results. This is critical for model calibration.

### 6a. Fetch results

Use the HKJC results page to get actual finishing order:
```
https://racing.hkjc.com/zh-hk/local/information/resultsall
```
(Chinese version shows all races with dividends on one page)

Or per-race English results:
```
https://racing.hkjc.com/en-us/local/information/localresults?racedate=YYYY/MM/DD&Racecourse=ST&RaceNo=N
```

### 6b. Cross-reference each leg

For each 3T leg, record:

```
| Leg | Race | Type | Picks | Result (top 3) | Hit? | Why Missed | 3T Dividend |
```

### 6c. Classify misses

Categorise each miss into one of these root causes:
- **Pool miss**: One or more of the top-3 finishers was not in the leg pool (→ review pick count; consider minimum 5 picks)
- **Hard exclusion**: Excluded horse placed (→ violated Rule 1 on market odds ≤ 15 threshold)
- **Too few picks**: 4th-ranked MC horse placed but was dropped (→ increase minimum to 5 picks)
- **Genuine upset**: Winner was >30 odds and not in any reasonable selection (→ accept variance)
- **Model error**: MC/blend significantly mispriced a horse (→ review blend weights)

### 6d. Calculate impact

For each miss, estimate: "Would the proposed fix have caught this result?"
Track cumulative P&L across meetings to validate whether rule changes improve ROI.

### 6e. Save review

Save to: `data/reports/3t_review_YYYYMMDD_VENUE.md`

---

## 3T Bet Type Explained (HKJC official rules)

### 3T = Triple Trio (not Trio/單T)
- **Objective**: Select the **1st, 2nd, and 3rd** place finishers **in any order** in **each of three designated races** (three legs).
- **Pool**: Multi-race pool. Usually R4-R5-R6 but **varies by meeting** (e.g. R5-R6-R7). Always confirm via the [General Information page](https://racing.hkjc.com/en-us/local/info/summary).
- **Winning**: Your ticket wins if you have selected the actual 1st, 2nd, and 3rd (in **any order**) in **Leg 1** AND in **Leg 2** AND in **Leg 3**.
- **Consolation**: If no one wins the main pool, a **consolation dividend** is paid to tickets that have the 1st, 2nd, and 3rd (in any order) in **the first two legs only** (85% of Net Pool to main; 15% to consolation; see HKJC Rule 3.6).
- **Ticket**: You choose a set of horses for **each leg**. The system generates combinations. Example: 5 horses in Leg 1, 5 in Leg 2, 5 in Leg 3 → C(5,3)×C(5,3)×C(5,3) = 10×10×10 = **1,000 combinations** (unit bet × 1000 = total stake).
- **3T (膽拖 / Banker-Leg)**: Per leg, designate 1-2 horses as **膽 (Banker)** and remaining as **腳 (Legs)**. Bankers appear in every per-leg combination. Reduces per-leg combos dramatically:
  - 1 Banker + N Legs per leg → C(N, 2) combos for that leg (pick 2 from legs)
  - 2 Bankers + N Legs per leg → N combos for that leg (pick 1 from legs)
  - Total 3T combos = Leg1_combos × Leg2_combos × Leg3_combos
  - Use when a horse has **Adj Place% ≥ 70%** (strong top-3 probability) in a specific leg.
- **Minimum**: At least **4 starters in all three legs**; otherwise pool is closed and refunded. Unit bet $2 (if total ticket ≥ $100) or minimum $10 otherwise.
- **Source**: [HKJC Triple Trio](https://www.hkjc.com/english/betting/ticket_3t.asp), [HKJC Betting Rules Rule 3](https://www.hkjc.com/english/betting/betting_rule.aspx).

### Trio / 單T (different from 3T – single race, any order)
- **Objective**: Select the **1st, 2nd, and 3rd** finishers in **ANY ORDER** in **one** designated race.
- **Trio (Single)**: Pick exactly 3 horses. If they fill the top 3 in any order, you win. One combination.
- **Trio (Multiple/Banker)**: Select a pool of horses; system generates all C(P,3) combinations of 3.
- **Key difference from 3T**: Trio covers only 1 race; 3T covers 3 races. Both are any-order.
- **See**: `trio-strategy` skill for single-race Trio (單T) betting.

### Tierce / 三重彩 (exact order – separate bet type)
- **Objective**: Select the **1st, 2nd, and 3rd** finishers in **correct order** in **one** designated race.
- **Much harder** than Trio (單T) but pays higher dividends.
- **Source**: [HKJC Tierce](https://www.hkjc.com/ENGLISH/betting/ticket_tierce.asp).

---

## Output Format

```
═══════════════════════════════════════════════════════════
3T (TRIPLE TRIO) STRATEGY - [Venue] | [Date] | Races [X], [Y], [Z]
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All checks passed | Going: [X] | [N] scratchings
MC SIMULATION: 10,000 iterations per leg | Jockey boost applied
SCMP DATA: ✅ Loaded | Form/TIR/Vet/Odds parsed

3T LEGS: Race [X] (Leg 1), Race [Y] (Leg 2), Race [Z] (Leg 3)
BANKROLL ALLOCATION: $[X] ([X]% of meeting bankroll)

───────────────────────────────────────────────────────────
LEG 1 (R[X]) — [Class] | [Distance] | [Type: Banker/Lean/Open]
───────────────────────────────────────────────────────────
| # | Horse | MC Place% | Adj Place% | Odds | Jockey | SCMP Flags | Role |
|---|-------|-----------|------------|------|--------|------------|----------|
| X | NAME | XX.X% | XX.X% | X.X | Name | +trial | ★ 膽 (Banker) |
| X | NAME | XX.X% | XX.X% | X.X | Name | +draw | 腳 (Leg) |
| X | NAME | XX.X% | XX.X% | X.X | Name | — | 腳 (Leg) |
| X | NAME | XX.X% | XX.X% | X.X | Name | — | 腳 (Leg) |
| X | NAME | XX.X% | XX.X% | X.X | Name | — | (reserve) |

Note: ★ 膽 = Banker (Adj Place% >= 70%, locked in every per-leg combo). If no horse qualifies as 膽, all pool horses are 腳 and full C(P,3) is used for that leg.

Reasoning: [Why these horses; MC evidence; jockey factor; SCMP form insights]
SCMP highlights: [Key Star Form / Formline / Trackwork notes for selected horses]
Top quinella combos: [from MC output + SCMP Q/QP matrix cross-reference]

[Repeat for Leg 2, Leg 3]

───────────────────────────────────────────────────────────
TICKET SUMMARY
───────────────────────────────────────────────────────────
BET STRUCTURE: [Full Pool / 膽拖 per leg] (see per-leg breakdown)
COMBINATIONS: Leg1_combos × Leg2_combos × Leg3_combos = [N]
  Leg 1: [C(P,3) / C(N,2) 膽拖 / N 雙膽拖] = [combos]
  Leg 2: [C(P,3) / C(N,2) 膽拖 / N 雙膽拖] = [combos]
  Leg 3: [C(P,3) / C(N,2) 膽拖 / N 雙膽拖] = [combos]
UNIT BET: $[X]
TOTAL STAKE: $[X] ([X]% of bankroll) ✅ within budget

CONSOLATION NOTE: If Leg 1 + Leg 2 correct → consolation dividend (15% pool)

PASS CONDITIONS:
- If [Horse] is scratched in Leg [N], replace with [Horse] (next MC rank)
- If field drops below 4 in any leg, pool is refunded
- If going changes to Heavy, reconsider all 1650m+ legs

CONFIDENCE:
- 3T: [HIGH/MEDIUM/LOW] — [N] banker legs, [N] open legs

CAVEATS:
- [List any data gaps, missing odds, going uncertainty, SCMP data issues, etc.]
═══════════════════════════════════════════════════════════
```

### 3T Portfolio summary (when comparing multiple ticket options)

```
| Leg | Race | Type | Picks | Bet Structure | Per-leg Combos | Confidence |
|-----|------|------|-------|---------------|-------|------------|
| 1 | R[X] | Banker | 5 | 膽拖 (1膽+4腳) | C(4,2)=6 | HIGH |
| 2 | R[Y] | Lean | 5 | Full pool | C(5,3)=10 | MEDIUM |
| 3 | R[Z] | Open | 6 | Full pool | C(6,3)=20 | LOW |

COMBINATIONS: 6 × 10 × 20 = 1,200 | $50 flexi = 2.1%
```

Example baseline: 5 × 5 × 5 = 125 combos, $50 flexi = 20%. Maximum: 6 × 6 × 7 = 252 combos, $50 flexi ≈ 10%.

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
2. **3T ≠ Trio (單T)** — 3T is Triple Trio (three races, any order per leg). Trio (單T) is a separate single-race bet (top 3 in any order, but just 1 race). Both are any-order; 3T spans 3 races.
3. **3T is high variance** — Only allocate 3–5% of meeting bankroll.
4. **Scratchings** — Define replacement rules before the meeting starts.
5. **Record results** — Track hit rate and payout vs stake for strategy calibration.
6. **Always validate** — If data quality is poor (missing odds, empty jockey stats), note caveats prominently.
7. **SCMP is supplementary** — MC simulation is the primary model. SCMP data adjusts and informs but does not override MC probabilities. If SCMP data is unavailable, proceed without it and note as a caveat.
8. **Do NOT use tipster picks** — Ignore all tipster selections from SCMP or any other source. Rely only on MC simulation, SCMP odds/form/TIR/vet data, elite jockey stats, and market odds for decisions.
9. **Prioritise hit rate over flexi percentage** — Backtesting showed that narrow selections (3 picks/leg) have very low hit rates (~14%). Wider selections (5-6 picks) roughly double or triple the per-leg hit rate. Use flexi betting to keep total stake fixed at $50 per ticket; accept the lower per-unit payout in exchange for a realistic chance of hitting.
10. **Watch for longshot spoilers** — In HK racing, ~69% of leg misses involve a horse at odds ≥ 15.0 finishing in the top 3. The longshot insurance rule (add a mid-range horse if all picks are short-priced) mitigates this. Evidence: R6 19-Feb — #9 REGAL GEM (odds 16, MC Place% 46.4%, 4th highest) was the spoiler; only 4 picks were made for this leg.
11. **Minimum 5 picks per 3T leg** — Never go below 5 selections, even for Banker legs. Backtest Banker legs with 3 picks hit only 13.6% vs 24%+ with 4-5 picks. Evidence: R6 19-Feb — 4 picks missed the 4th-ranked MC horse (#9) in a 10-runner field.
12. **No hard exclusion if market odds ≤ 15** — Aligned with Trio skill Rule 2. Evidence: R7 19-Feb — #11 JUST FOLLOW ME (9.2 odds) excluded for injury flag, came 2nd. $180,691 3T dividend missed.
13. **Post-race review is mandatory** — After every meeting, fetch results and cross-reference tickets. Classify misses (pool miss, hard exclusion, too few picks, genuine upset). Track cumulative P&L. Save to `data/reports/3t_review_YYYYMMDD_VENUE.md`. This is how the strategy improves over time.
14. **Use 膽拖 (Banker-Leg) per leg when Adj Place% >= 70%** — If any horse in a leg has Adj Place% >= 70%, designate it as 膽 (Banker) for that leg and bet 膽拖 structure instead of full pool. This cuts per-leg combinations by 40-57% (1 banker) or 70-86% (2 bankers). Savings compound across legs. Higher flexi %, same horse coverage.
15. **Never force a per-leg banker** — If no horse meets the 70% Adj Place% threshold in a leg, use full pool C(P,3) for that leg. Forcing a weak banker just to save on combinations increases the chance of total loss for that leg.
16. **Per-leg banker failure = entire 3T busted** — If a 膽 fails to finish top 3 in its leg, that leg misses and the whole 3T ticket fails. This is the trade-off for cheaper tickets. Only use 膽拖 when the per-leg banker probability is genuinely strong (>=70%).
17. **2-Banker per leg (雙膽拖) is high-risk** — Both bankers must place top 3 in the same leg. Combined probability ≈ B1 × B2 (e.g., 70% × 72% ≈ 50%). Only use when both horses have Adj Place% >= 70% AND the leg is very strongly structured.

---

## Key Tools

| Tool | Command / URL | Purpose |
|------|--------------|---------|
| Jockey Stats | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts` | Season win rates |
| Live Odds | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=YYYY-MM-DD --venue=HV --json --save` | Current odds |
| Race Analysis | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date YYYY-MM-DD --venue "Happy Valley" --race N --bankroll BANKROLL --kelly 0.35 --min-edge 5` | MC simulation |
| Race Card | `https://racing.hkjc.com/racing/information/English/Racing/RaceCard.aspx?RaceDate=YYYY/MM/DD&Racecourse=HV&RaceNo=N` | Entries, jockeys |
| **General Info** | `https://racing.hkjc.com/en-us/local/info/summary` | **Confirm 3T legs (primary)** |
| T-T Auto Pick | `https://racing.hkjc.com/en-us/local/information/ttautopick?racedate=YYYY/MM/DD` | Confirm 3T legs (fallback) |
| **SCMP Race Card** | `https://www.scmp.com/sport/racing/racecard/N` | **Odds, Star Form, TIR, Vet Report, Trackwork, QP/Q odds, Formline** |

---

## SCMP Data Quick Reference

### What to extract per race (for 3T legs)

```
For each leg race, build this SCMP data table:

RACE [N] SCMP DATA
| # | Horse | Win Odds | Place Odds | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Woo Mention |
|---|-------|----------|------------|------------------|----------|----------|-----------|-------------|
| X | NAME | X.X | X.X | +draw, +form | clear | clear | +trial | ✓ main chance |
| X | NAME | X.X | X.X | -disappointed | -barrier | -injury30d | — | not mentioned |
```

### Shorthand flag codes
- `+trial` = positive trackwork/trial
- `+draw` = favourable draw (Star Form / Woo)
- `+form` = improving recent form
- `+excuses` = bad luck last run (TIR bounce)
- `-injury` = recent injury flag (Vet)
- `-injury30d` = injury passed <30 days ago
- `-barrier` = repeated barrier issues (TIR)
- `-perf` = unacceptable performance (TIR)
- `-age` = 8+ years old (Vet)
- `-notRO` = not ridden out (TIR)

---

## Example Query

"Generate 3T strategy for Happy Valley 11/02/2026. Meeting bankroll $1,000, moderate risk."

Expected agent behaviour:
1. Fetch jockey stats → check elite tier
2. **Confirm 3T legs** → fetch `https://racing.hkjc.com/en-us/local/info/summary` to find the exact Triple Trio leg races (do NOT assume R4-R5-R6; legs vary by meeting)
3. Fetch odds for HV 2026-02-11 → save
4. **Fetch SCMP race card** → extract odds, Star Form, TIR, Vet, Trackwork, QP/Q odds, Formline for leg races (ignore tipster picks)
5. Run `analyze-race.ts` for each confirmed leg race (3 races)
6. Validate: all legs ≥ 4 starters, odds populated, no critical scratchings, SCMP data loaded
7. Apply jockey boosts + SCMP form adjustments (Star Form, TIR, Vet, Trackwork flags)
8. Compile MC results, classify legs (using adjusted probabilities), calculate combinations
9. Output 3T ticket + summary
10. Save to `data/reports/3t_strategy_20260211_HV.md`
11. **After the meeting**: Fetch results, cross-reference legs, classify misses, save to `data/reports/3t_review_20260211_HV.md`
