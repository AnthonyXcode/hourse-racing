---
name: trio-strategy
description: Generate Trio (Tierce) betting strategies for individual HKJC races using a 5-step pipeline (query data, validate, simulate, compile, advise). Use when the user asks about Trio, Tierce, Trifecta, correct-order top-3 bets, or wants Trio ticket recommendations for specific races.
---

# Trio (Tierce) Strategy Skill

Generate **Trio (Tierce)** strategies by querying live data, validating it, running Monte Carlo simulations, and producing actionable ticket advice for individual races.

## System Instructions

You are an experienced HKJC bettor focused on the Trio (Tierce) pool. You MUST follow the 5-step pipeline below — do not skip steps or use manual estimates.

---

## Pipeline Overview

```
STEP 1: QUERY DATA       → Fetch race card, odds, jockey stats, SCMP race card
STEP 2: VALIDATE DATA    → Check field size, going, scratchings, SCMP coverage
STEP 3: RUN SIMULATION   → Monte Carlo 10,000 iterations + SCMP form adjustments
STEP 4: COMPILE RESULTS  → Rank horses, build Trio matrix, calculate permutations
STEP 5: GENERATE ADVICE  → Selections, tickets, stakes, pass conditions
```

**IMPORTANT**: Do NOT skip steps. Do NOT use manual probability estimates. Always run the tools.

---

## Trio vs 3T — Key Difference

| | Trio (Tierce) | 3T (Triple Trio) |
|---|---------------|-----------------|
| **Scope** | **Single race** | 3 designated races |
| **Objective** | Pick 1st, 2nd, 3rd in **correct order** | Pick top 3 in **any order** per leg |
| **Bet type** | Single-race exotic | Multi-race pool |
| **Ranking metric** | Adj Win% (positional) | Adj Place% |
| **Permutations** | Order matters: N×(N-1)×(N-2) | Order doesn't matter: combinations |
| **Pool** | Per-race pool | Multi-race pool with consolation |

---

## Step 1: Query Data

### 1a. Identify the race
Ask for or determine:
- **Date** (YYYY-MM-DD)
- **Venue** (ST / HV)
- **Race number(s)** — Trio can be played on any race; user may specify one or several target races

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

### 1d. Fetch race card
For each target race, fetch the HKJC race card to extract:
- Horse entries, jockey assignments, draw, weight, last 6 runs
- Race conditions: class, distance, surface, going

**Race card URL**:
```
https://racing.hkjc.com/racing/information/English/Racing/RaceCard.aspx?RaceDate=YYYY/MM/DD&Racecourse=HV&RaceNo=N
```

### 1e. Fetch SCMP Race Card Data

Fetch the South China Morning Post race card page for supplementary data:

**URL**: `https://www.scmp.com/sport/racing/racecard` (default loads current meeting day)
**Per-race URL**: `https://www.scmp.com/sport/racing/racecard/N` (for race N)

Use `WebFetch` to retrieve each target race page. Extract the following data — **do NOT use tipster picks**:

#### 1e-i. Win/Place Odds

The SCMP race card table includes **Win** and **Place** odds columns for every horse. These are the actual HKJC pool odds and are often more complete than what the `fetch-odds.ts` scraper captures.

**How to use:**
- Use as primary odds source when `fetch-odds.ts` returns partial data
- Record all horses' Win and Place odds
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

#### 1e-vi. Quinella Place & Quinella Odds Matrix

The SCMP publishes full **QP and Q odds matrices** for each race. These are the actual HKJC pool odds.

**How to use for Trio:**
- Cross-reference MC top quinella combinations with actual QP/Q pool odds
- Trio is essentially a quinella with ordered positions — QP/Q matrices help confirm which pairings the market undervalues
- If the top-2 MC quinella is also a high-paying QP combination, that's a strong Trio value signal

#### 1e-vii. Philip Woo's Formline

A detailed **race-by-race narrative** from SCMP's senior form analyst. Extract:
- Which horses he highlights as main chances
- Draw analysis and pace scenario
- Specific horse-by-horse notes that may not appear in Star Form

---

## Step 2: Validate Data

Before proceeding, verify ALL of the following. **Stop and report if any critical check fails.**

### Critical checks (must pass)
- [ ] Race date has confirmed racing (not cancelled)
- [ ] Target race has **≥ 3 starters** (HKJC requires ≥3 for Trio pool)
- [ ] Odds are populated for at least the top 3-5 horses
- [ ] Jockey stats file is non-empty (has at least elite jockey data)

### Warning checks (note but continue)
- [ ] Going condition parsed (default "Good" if missing — flag as caveat)
- [ ] Surface parsed (default "Turf" if missing)
- [ ] Scratchings: list any late withdrawals; update field size
- [ ] Any horse with missing form data (first-timer, long layoff >90 days)
- [ ] SCMP race card data retrieved (if fetch fails, proceed without — note as caveat)

### Data summary
After validation, output a brief summary:
```
Meeting: [Venue] [Date] | Going: [X] | Surface: [X]
Target Race(s): R[N] ([Class] | [Distance] | [Field size])
Scratchings: [list or "none"]
Jockey stats: [N] jockeys loaded, [N] elite tier
Odds coverage: [N] horses with odds
SCMP data: [✅ loaded / ⚠️ partial / ❌ unavailable]
```

---

## Step 3: Run Simulation

### 3a. Run Monte Carlo for each target race

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

### 3b. Capture MC output
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

### 4a. Build ranking table

Rank all horses twice — by **Adjusted Win%** (for 1st position) and by **Adjusted Place%** (for 2nd/3rd positions):

```
RACE [N] — [Class] | [Distance] | [Going] | [Field size]
| Rank | # | Horse | MC Win% | Adj Win% | MC Place% | Adj Place% | Odds | Jockey | SCMP Flags |
|------|---|-------|---------|----------|-----------|------------|------|--------|------------|
| 1 | X | NAME | XX.X% | XX.X% | XX.X% | XX.X% | X.X | Name | +trial, +draw |
```

### 4b. Classify the race

Use **adjusted** probabilities for classification:

| Classification | Criteria | Approach |
|----------------|----------|----------|
| **Dominant** | Top horse Adj Win% ≥ 35% | **Banker on top**; use as fixed 1st. Focus budget on 2nd/3rd permutations. |
| **Competitive** | Top horse Adj Win% 20-35% | **Structured multiple**; select 3-4 horses for all positions, key on top 2 for 1st. |
| **Wide open** | No horse Adj Win% ≥ 20% | **Broad multiple or PASS**; if played, select 4-5 horses and accept high permutation count. Consider skipping if no clear edge. |

### 4c. Select horses and build Trio matrix

Trio requires picking **which horse finishes 1st, 2nd, and 3rd in exact order**. This means positional analysis:

#### Position analysis

| Position | Key metric | What to look for |
|----------|-----------|-----------------|
| **1st** | Adj Win% | Highest win probability; front-runners and on-pace types in small fields; closers in large fields with pace on |
| **2nd** | Adj Place% minus Adj Win% | Horses likely to place but less likely to win — the classic "each-way" types, consistent place-getters |
| **3rd** | Adj Place% at wider odds | Horses that can sneak into top 3; strong closers, improving types, horses with excuses last run |

#### Selection modes

**Mode A: Banker 1st (Dominant race)**
- Fix 1 horse in 1st position
- Select 3-4 horses for 2nd position
- Select 4-5 horses for 3rd position (include all 2nd-position picks + 1-2 extras)
- Permutations: 1 × 3 × 4 = 12 or 1 × 4 × 5 = 20

**Mode B: Structured Multiple (Competitive race)**
- Select 2-3 horses for 1st position
- Select 3-4 horses for 2nd position
- Select 3-4 horses for 3rd position
- Permutations: 2 × 3 × 4 = 24 or 3 × 4 × 4 = 48

**Mode C: Broad Multiple (Wide open race)**
- Select 3-4 horses for 1st position
- Select 4-5 horses for 2nd/3rd positions
- Permutations: 3 × 4 × 5 = 60 or 4 × 5 × 5 = 100
- **Warning**: High permutation count = high cost. Consider using flexi or reducing scope.

**Mode D: PASS**
- If no clear positional edge and field is truly open, **skip this race** for Trio
- Better to deploy bankroll on races with clearer structure

#### Running style integration

For positional accuracy, consider each horse's likely running position:

| Running Style | 1st Position Suitability | 2nd/3rd Suitability |
|---------------|------------------------|---------------------|
| **Front-runner / On-pace** | Strong in small fields (≤10), weak tempo races | Less likely to drop to 2nd/3rd if beaten |
| **Stalker / Midfield** | Consistent; good in all conditions | Very strong — often fills places |
| **Closer / Back marker** | Strong in large fields (≥12) with pace on | Can fill 3rd if the run doesn't quite come off |

Use SCMP Star Form and Philip Woo's Formline to assess running styles:
- "Made all", "led", "set the pace" → front-runner
- "Stalked the leader", "box seat", "handy position" → stalker
- "Came from the rear", "closed well", "finished strongly" → closer

### 4d. Calculate permutations and cost

```
Trio Multiple:
  1st: [N1] horses × 2nd: [N2] horses × 3rd: [N3] horses
  Permutations: N1 × N2 × N3 = [total] (minus overlaps where same horse appears in multiple positions)
  Note: HKJC auto-excludes permutations where the same horse fills two positions

  Actual permutations (after dedup):
  If selecting from a pool of P horses across positions:
    P × (P-1) × (P-2) = permutations (all-in-one pool)
  Or with fixed positions:
    Σ (1st choices) × (remaining 2nd choices) × (remaining 3rd choices)

  Unit bet: $10 min (or $2 if total ≥ $100)
  Total stake: permutations × unit bet
```

### 4e. Budget check
- Trio stake should be ≤ **3% of meeting bankroll** per race
- If playing multiple races, total Trio allocation ≤ **8% of meeting bankroll**
- If over budget: switch to Mode A (fix banker 1st) or reduce pool size
- Consider **flexi Trio**: fixed total stake (e.g. $30) across all permutations

### 4f. Value check — Trio pool odds

Before finalising, cross-reference with the **Trio pool estimate**:
- Check HKJC Tierce dividends from recent similar races as a benchmark
- If the top MC Trio combination (e.g. 1-5-3) has a very short market favourite for 1st, the Trio dividend is likely low
- **Value Trio bets** occur when: (a) a non-favourite can win, creating large dividends, or (b) the 2nd/3rd positions are hard to predict, inflating the pool

---

## Step 5: Generate Advice

### Output the full report

Save to: `data/reports/trio_strategy_YYYYMMDD_VENUE_RN.md`

---

## Trio Bet Type Explained (HKJC official rules)

### Trio = Tierce
- **Objective**: Select the **1st, 2nd, and 3rd** finishers in **correct order** in **one** designated race.
- **Tierce (Single)**: One exact order only (e.g. 2-7-9 meaning #2 wins, #7 second, #9 third). One permutation.
- **Tierce (Multiple)**: Select multiple horses; system generates **all permutations** of 1st-2nd-3rd from your selections.
- **Minimum**: At least **3 starters**; otherwise pool is closed and refunded.
- **Unit bet**: $10 minimum (or $2 if total ticket value ≥ $100).
- **Flexi**: Available — set a fixed total stake and the system distributes across permutations.
- **Source**: [HKJC Tierce](https://www.hkjc.com/ENGLISH/betting/ticket_tierce.asp), [HKJC Betting Rules](https://www.hkjc.com/english/betting/betting_rule.aspx).

### Trio vs Trio Place (Tierce vs Trio)
Note: HKJC also offers **Trio Place** (sometimes called "Trio") where order does **not** matter — just pick 1st, 2nd, 3rd in any order. This skill is for **Tierce** (correct order). If the user asks for "any order" top-3 single-race bets, clarify:
- **Correct order** → this skill (Trio / Tierce)
- **Any order, single race** → Trio Place bet (simpler, lower dividend)
- **Any order, 3 races** → 3T skill (see `3t-strategy`)

---

## Output Format

```
═══════════════════════════════════════════════════════════
TRIO (TIERCE) STRATEGY - [Venue] | [Date] | Race [N]
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All checks passed | Going: [X] | [N] scratchings
MC SIMULATION: 10,000 iterations | Jockey boost applied
SCMP DATA: ✅ Loaded | Form/TIR/Vet/Odds parsed

RACE: R[N] — [Class] | [Distance] | [Surface] | [Going] | [Field size] runners
CLASSIFICATION: [Dominant / Competitive / Wide open]
MODE: [A: Banker 1st / B: Structured Multiple / C: Broad Multiple / D: PASS]
BANKROLL ALLOCATION: $[X] ([X]% of meeting bankroll)

───────────────────────────────────────────────────────────
HORSE RANKINGS
───────────────────────────────────────────────────────────
| # | Horse | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Position |
|---|-------|----------|------------|------|--------|-------|------------|----------|
| X | NAME | XX.X% | XX.X% | X.X | Name | Front | +trial | 1st ✓ |
| X | NAME | XX.X% | XX.X% | X.X | Name | Stalk | +draw | 1st/2nd ✓ |
| X | NAME | XX.X% | XX.X% | X.X | Name | Close | +excuses | 2nd/3rd ✓ |
| X | NAME | XX.X% | XX.X% | X.X | Name | Stalk | — | 3rd ✓ |
| X | NAME | XX.X% | XX.X% | X.X | Name | Close | — | (reserve) |

Reasoning: [Why these horses in these positions; MC evidence; pace scenario; SCMP insights]

───────────────────────────────────────────────────────────
TRIO MATRIX
───────────────────────────────────────────────────────────
| Position | Selections |
|----------|------------|
| 1st | #X, #X [, #X] |
| 2nd | #X, #X, #X [, #X] |
| 3rd | #X, #X, #X, #X [, #X] |

TOP TRIO COMBINATIONS (by MC probability):
| Rank | 1st | 2nd | 3rd | MC Prob | Est. Fair Odds |
|------|-----|-----|-----|---------|----------------|
| 1 | #X | #X | #X | X.X% | $XX |
| 2 | #X | #X | #X | X.X% | $XX |
| 3 | #X | #X | #X | X.X% | $XX |
| 4 | #X | #X | #X | X.X% | $XX |
| 5 | #X | #X | #X | X.X% | $XX |

───────────────────────────────────────────────────────────
TICKET SUMMARY
───────────────────────────────────────────────────────────
PERMUTATIONS: [N]
UNIT BET: $[X]
TOTAL STAKE: $[X] ([X]% of bankroll) ✅ within budget
or FLEXI: $[X] total → [X]% flexi

KEY PERMUTATIONS (highest value):
  [List top 5-10 specific 1st-2nd-3rd combos with MC probability]

PASS CONDITIONS:
- If [Horse] (banker 1st) is scratched → VOID ticket or restructure
- If field drops below 3 → pool refunded
- If going changes to Heavy → reconsider front-runner bias

CONFIDENCE: [HIGH/MEDIUM/LOW]

CAVEATS:
- [List any data gaps, missing odds, going uncertainty, SCMP data issues, etc.]
═══════════════════════════════════════════════════════════
```

### Multi-race Trio report

When playing Trio on multiple races, add a combined summary:

```
═══════════════════════════════════════════════════════════
TRIO PORTFOLIO SUMMARY - [Venue] | [Date]
═══════════════════════════════════════════════════════════

| Race | Class | Classification | Mode | Permutations | Stake | Confidence |
|------|-------|---------------|------|-------------|-------|------------|
| R[N] | C[X] | Dominant | A | 12 | $24 | HIGH |
| R[N] | C[X] | Competitive | B | 24 | $48 | MEDIUM |
| R[N] | C[X] | Wide open | D | — | PASS | — |

TOTAL TRIO STAKE: $[X] ([X]% of $[bankroll] bankroll)
═══════════════════════════════════════════════════════════
```

---

## Venue-Specific Adjustments

### Sha Tin
- Standard selections; trust MC top picks
- Favourites more reliable (~50% win rate) → Banker 1st mode more viable
- Front-runners hold up well on standard track settings
- Jockey boosts at full value

### Happy Valley
- **More upsets** — avoid over-relying on single banker for 1st position
- Tight track favours on-pace horses; closers need clear running
- Reduce jockey boost caps (see Step 3c)
- Consider wider pool for 2nd/3rd positions (more unpredictable)
- Front-runner bias in HV 1,200m races; stalker bias in 1,650m+

---

## Important Reminders

1. **Follow the pipeline** — Do not skip data fetching or simulation. Manual estimates are unreliable.
2. **Trio ≠ 3T** — Trio is Tierce (single race, correct order). 3T is Triple Trio (three races, any order per leg). Never confuse the two.
3. **Order matters** — Unlike 3T where any order counts, Trio requires you to correctly predict 1st, 2nd, AND 3rd in sequence. This makes it significantly harder but pays larger dividends.
4. **Trio is high variance** — Only allocate ≤3% of meeting bankroll per race, ≤8% total across all Trio bets.
5. **Banker 1st is the most efficient structure** — When there's a clear race favourite (Adj Win% ≥ 35%), fixing that horse in 1st position and spreading 2nd/3rd dramatically reduces permutations and cost.
6. **PASS when appropriate** — Wide open races with no positional edge should be skipped. Not every race is a Trio race. Typical meeting: play Trio on 2-3 races maximum.
7. **Running style matters for positions** — Front-runners are better 1st picks; closers are better 3rd picks. Use SCMP Star Form and TIR to assess each horse's likely running position.
8. **Scratchings** — Define replacement rules before the race. If the banker is scratched, void the ticket rather than restructuring.
9. **Record results** — Track hit rate and payout vs stake for strategy calibration.
10. **SCMP is supplementary** — MC simulation is the primary model. SCMP data adjusts and informs but does not override MC probabilities.
11. **Do NOT use tipster picks** — Ignore all tipster selections from SCMP or any other source.
12. **Cross-reference with Quinella odds** — If the top MC quinella pair also shows high SCMP Q/QP odds, the Trio involving those horses likely offers outsized value.

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

### What to extract per race (for Trio)

```
For each target race, build this SCMP data table:

RACE [N] SCMP DATA
| # | Horse | Win Odds | Place Odds | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Woo Mention | Running Style |
|---|-------|----------|------------|------------------|----------|----------|-----------|-------------|---------------|
| X | NAME | X.X | X.X | +draw, +form | clear | clear | +trial | ✓ main chance | Front-runner |
| X | NAME | X.X | X.X | -disappointed | -barrier | -injury30d | — | not mentioned | Closer |
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

"Generate Trio strategy for Sha Tin Race 7, 14/02/2026. Meeting bankroll $1,000."

Expected agent behaviour:
1. Fetch jockey stats → check elite tier
2. Fetch odds for ST 2026-02-14 → save
3. **Fetch SCMP race card for R7** → extract odds, Star Form, TIR, Vet, Trackwork, QP/Q odds, Formline (ignore tipster picks)
4. Run `analyze-race.ts` for R7
5. Validate: ≥3 starters, odds populated, no critical scratchings, SCMP data loaded
6. Apply jockey boosts + SCMP form adjustments
7. Classify race (Dominant / Competitive / Wide open)
8. Build Trio matrix with positional analysis (1st / 2nd / 3rd)
9. Calculate permutations, check budget
10. Output Trio ticket + summary
11. Save to `data/reports/trio_strategy_20260214_ST_R7.md`
