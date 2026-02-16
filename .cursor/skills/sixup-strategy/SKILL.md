---
name: sixup-strategy
description: Generate Six Up (Six Win / Pick 6) betting strategies for HKJC meetings using a 5-step pipeline (query data, validate, simulate, compile, advise). Use when the user asks about Six Up, Six Win, Pick 6, or wants Six Up ticket combinations for a meeting.
---

# Six Up Strategy Skill

Generate **Six Up** strategies by querying live data, validating it, running Monte Carlo simulations, and producing actionable ticket advice for the upcoming racing day.

## System Instructions

You are an experienced HKJC bettor focused on the Six Up pool. You MUST follow the 5-step pipeline below — do not skip steps or use manual estimates.

---

## Pipeline Overview

```
STEP 1: QUERY DATA       → Fetch race cards, odds, jockey stats, SCMP race card
STEP 2: VALIDATE DATA    → Check fields, going, scratchings, Six Up legs, SCMP coverage
STEP 3: RUN SIMULATION   → Monte Carlo 10,000 iterations per leg race + SCMP form adjustments
STEP 4: COMPILE RESULTS  → Rank horses, classify legs, incorporate SCMP insights, calculate combinations
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
- Six Up designated race numbers

**Race card URL**:
```
https://racing.hkjc.com/racing/information/English/Racing/RaceCard.aspx?RaceDate=YYYY/MM/DD&Racecourse=HV&RaceNo=N
```

### 1e. Fetch SCMP Race Card Data

Fetch the South China Morning Post race card page for supplementary data:

**URL**: `https://www.scmp.com/sport/racing/racecard` (default loads current meeting day)
**Per-race URL**: `https://www.scmp.com/sport/racing/racecard/N` (for race N)

Use `WebFetch` to retrieve each leg race page. Extract the following data — **do NOT use tipster picks**:

#### 1e-i. Win/Place Odds

The SCMP race card table includes **Win** and **Place** odds columns for every horse. These are the actual HKJC pool odds and are often more complete than what the `fetch-odds.ts` scraper captures.

**How to use:**
- Use as primary odds source when `fetch-odds.ts` returns partial data
- Record all horses' Win and Place odds for leg races
- Identify market favourites and longshots for edge calculations

#### 1e-ii. Star Form Comments

Each horse has a **Star Form** comment written by SCMP analysts. Extract key signals:
- **Positive signals**: "winner", "made all", "rallied", "improved", "sharp", "does draw well"
- **Negative signals**: "disappointed", "failed", "did not run out the distance", "wide trip", "no excuse"
- **Fitness flags**: "resumed", "first-timer", "off 126 days", "returns from injury"
- **Draw comments**: "gate's a hurdle", "gate should help", "drawn to get his chance"

#### 1e-iii. Trouble in Running (TIR)

Extract recent **stewards' reports** for each horse. Key flags:
- **Recurring issues**: "bumped on jumping" (repeated = barrier problem)
- **Not ridden out**: Indicates jockey concern about soundness
- **Unacceptable performance**: Horse under stewards' watch
- **Crowded / steadied**: Bad luck last run = potential improver

#### 1e-iv. Vet's Report

Check for **health flags**:
- Recent injury / lameness → **reduce confidence** even if passed vet exam
- "Passed on [date]" after injury → check how recent; if <30 days, flag as risk
- "Eight years of age or above" → reduced reliability for form reversal

#### 1e-v. Trackwork Highlights

Extract notable trial / gallop mentions:
- "Travelled well for second in his latest trial" = **positive trial form**
- "Looks ready to strike" = trainer confidence
- Use to **break ties** between similarly ranked MC horses

#### 1e-vi. Philip Woo's Formline

A detailed **race-by-race narrative** from SCMP's senior form analyst. Extract:
- Which horses he highlights as main chances
- Draw analysis and pace scenario
- Specific horse-by-horse notes that may not appear in Star Form

---

### 1f. Confirm Six Up legs
Check the HKJC race card or betting page to identify:
- **Six Up legs**: Usually R4–R9 (look for "Six Up" or "Six Win" label)
- Six Up covers **6 consecutive races** — confirm the exact range for each meeting

---

## Step 2: Validate Data

Before proceeding, verify ALL of the following. **Stop and report if any critical check fails.**

### Critical checks (must pass)
- [ ] Race date has confirmed racing (not cancelled)
- [ ] Six Up leg races each have **≥ 3 starters** (otherwise pool closed/refunded)
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
Six Up Legs: R[A]–R[F]
Field sizes: R[A]=N, R[B]=N, ..., R[F]=N
Scratchings: [list or "none"]
Jockey stats: [N] jockeys loaded, [N] elite tier
Odds coverage: [N] races with odds, avg [N] horses per race
SCMP data: [✅ loaded / ⚠️ partial / ❌ unavailable] | [N] races with form/odds
```

---

## Step 3: Run Simulation

### 3a. Run Monte Carlo for each Six Up leg race

For **every** race that is a Six Up leg, run the full analysis:

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
| **Recent injury** | Vet report shows injury passed <30 days ago | -3% to MC Win% |
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
- Total SCMP form adjustment per horse: **max ±8%** to MC Win%
- If adjustments push any horse's probability above 50% Win, cap at that value
- Always show **raw MC%** and **adjusted%** (after all boosts) in the report

---

## Step 4: Compile Results

### 4a. Build per-leg ranking table

For each Six Up leg, rank by **Adjusted Win%** (since Six Up needs the winner):

```
LEG [N] (R[X]) — [Class] | [Distance]
| Rank | # | Horse | MC Win% | Adj Win% | Odds | Jockey | SCMP Flags |
|------|---|-------|---------|----------|------|--------|------------|
| 1 | X | NAME | XX.X% | XX.X% | X.X | Name | +trial |
```

- **SCMP Flags**: Short codes for adjustments applied (e.g., +trial, +draw, -injury, -TIR)

### 4b. Classify each leg

Use **adjusted** probabilities (after jockey + SCMP form boosts) for classification:

| Classification | Criteria | Six Up Picks |
|----------------|----------|--------------|
| **Banker** | Top horse Adj Win% ≥ 35% | 1 horse |
| **Lean** | Top horse Adj Win% 25-35% | 1-2 horses |
| **Open** | No horse Adj Win% ≥ 25% | 2-3 horses |

**Tie-breaking rules** (when two horses have similar adjusted probabilities within 2%):
1. Prefer the horse with positive SCMP flags (+trial, +draw) over neutral
2. Prefer the horse without negative SCMP flags (-injury, -TIR)
3. Refer to Philip Woo's Formline narrative for final tiebreak

### 4c. Calculate combinations and cost

```
Six Up: [N1] × [N2] × ... × [N6] = [total] lines
    Per line: $[X]
    Total stake: $[X]
```

### 4d. Budget check
- Six Up stake must be ≤ 8% of meeting bankroll
- If over budget: reduce picks in the most **open** leg first (drop lowest-ranked horse)

---

## Step 5: Generate Advice

### Output the full report

Save to: `data/reports/sixup_strategy_YYYYMMDD_VENUE.md`

---

## Six Up Bet Type Explained (HKJC official rules)

### Six Up (Six Win / Pick 6)
- **Objective**: Select the **winner** of **6 designated races** on the same race card.
- **Pool**: Multi-race; all 6 must win for the main payout. **Jackpot** can roll over.
- **Minimum**: At least **3 starters in all six legs**; otherwise pool closed and refunded.
- **Source**: HKJC Betting Rules Rule 3 (Pari-Mutuel).

---

## Output Format

```
═══════════════════════════════════════════════════════════
SIX UP STRATEGY - [Venue] | [Date] | Races [X–Y]
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All checks passed
MC SIMULATION: 10,000 iterations per leg | Jockey boost applied
SCMP DATA: ✅ Loaded | Form/TIR/Vet/Odds parsed

SIX UP RACES: Race [A], [B], [C], [D], [E], [F]
BANKROLL ALLOCATION: $[X] ([X]% of meeting bankroll)

───────────────────────────────────────────────────────────
LEG SUMMARY
───────────────────────────────────────────────────────────
| Leg | Race | Type | Selections | Adj Win% (top) | Reasoning |
|-----|------|------|------------|----------------|-----------|
| 1 | R[X] | Banker | #X | XX.X% | [brief + SCMP form note] |
| 2 | R[X] | Spread | #X, #X | XX.X%, XX.X% | [brief + SCMP form note] |
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

CONFIDENCE:
- Six Up: [HIGH/MEDIUM/LOW] — [N] bankers, [N] spreads

PASS CONDITIONS:
- If banker [Horse] scratched in Leg [N], replace with [next MC rank] or void ticket
- If more than 2 bankers are scratched, SKIP Six Up entirely

CAVEATS:
- [List any data gaps, missing odds, going uncertainty, SCMP data issues, etc.]
═══════════════════════════════════════════════════════════
```

---

## Venue-Specific Adjustments

### Sha Tin
- Standard selections; trust MC top picks
- Favourites more reliable (~50% win rate)
- Jockey boosts at full value

### Happy Valley
- **More upsets** — be cautious with single-horse bankers
- Avoid relying on short favourites (<3.0) as sole bankers
- Reduce jockey boost caps (see Step 3c)
- Consider using 2 horses even in Lean legs at HV

---

## Important Reminders

1. **Follow the pipeline** — Do not skip data fetching or simulation. Manual estimates are unreliable.
2. **Six Up is high variance** — Only allocate 5–8% of meeting bankroll.
3. **Scratchings** — Define replacement rules before the meeting starts.
4. **Rollover** — Larger pool = consider one extra line.
5. **Record results** — Track hit rate and payout vs stake for strategy calibration.
6. **Always validate** — If data quality is poor (missing odds, empty jockey stats), note caveats prominently.
7. **SCMP is supplementary** — MC simulation is the primary model. SCMP data adjusts and informs but does not override MC probabilities. If SCMP data is unavailable, proceed without it and note as a caveat.
8. **Do NOT use tipster picks** — Ignore all tipster selections from SCMP or any other source. Rely only on MC simulation, SCMP odds/form/TIR/vet data, elite jockey stats, and market odds for decisions.
9. **If more than 2 bankers scratched, SKIP** — Six Up relies on banker legs to keep combination count low. Losing multiple bankers makes the ticket uneconomical.

---

## Key Tools

| Tool | Command / URL | Purpose |
|------|--------------|---------|
| Jockey Stats | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts` | Season win rates |
| Live Odds | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=YYYY-MM-DD --venue=HV --json --save` | Current odds |
| Race Analysis | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date YYYY-MM-DD --venue "Happy Valley" --race N --bankroll BANKROLL --kelly 0.35 --min-edge 5` | MC simulation |
| Race Card | `https://racing.hkjc.com/racing/information/English/Racing/RaceCard.aspx?RaceDate=YYYY/MM/DD&Racecourse=HV&RaceNo=N` | Entries, jockeys |
| **SCMP Race Card** | `https://www.scmp.com/sport/racing/racecard/N` | **Odds, Star Form, TIR, Vet Report, Trackwork, QP/Q odds, Formline** |

---

## SCMP Data Quick Reference

### What to extract per race (for Six Up legs)

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

"Generate Six Up strategy for Happy Valley 11/02/2026. Meeting bankroll $1,000, moderate risk."

Expected agent behaviour:
1. Fetch jockey stats → check elite tier
2. Fetch odds for HV 2026-02-11 → save
3. **Fetch SCMP race card** → extract odds, Star Form, TIR, Vet, Trackwork, QP/Q odds, Formline for leg races (ignore tipster picks)
4. Confirm Six Up legs (R4–R9) from HKJC
5. Run `analyze-race.ts` for R4, R5, R6, R7, R8, R9 (6 races)
6. Validate: all legs ≥ 3 starters, odds populated, no critical scratchings, SCMP data loaded
7. Apply jockey boosts + SCMP form adjustments (Star Form, TIR, Vet, Trackwork flags)
8. Compile MC results, classify legs (using adjusted probabilities), calculate combinations
9. Output Six Up ticket + summary
10. Save to `data/reports/sixup_strategy_20260211_HV.md`
