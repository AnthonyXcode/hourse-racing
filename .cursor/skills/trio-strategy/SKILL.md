---
name: trio-strategy
description: Generate Trio (單T) betting strategies for individual HKJC races using a 5-step pipeline (query data, validate, simulate, compile, advise). Trio = pick the 1st, 2nd, and 3rd finishers in ANY ORDER. Use when the user asks about Trio, 單T, top-3 bets, or wants Trio ticket recommendations for specific races.
---

# Trio (Any Order) Strategy Skill

Generate **Trio (單T)** strategies by querying live data, validating it, running Monte Carlo simulations, and producing actionable ticket advice for individual races. Trio = pick the **1st, 2nd, and 3rd finishers in ANY ORDER** in a single race.

## System Instructions

You are an experienced HKJC bettor focused on the Trio (單T) pool. You MUST follow the 5-step pipeline below — do not skip steps or use manual estimates.

---

## Pipeline Overview

```
STEP 1: QUERY DATA       → Sync historical data, fetch race card, odds, jockey stats, SCMP race card
STEP 2: VALIDATE DATA    → Check field size, going, scratchings, SCMP coverage
STEP 3: RUN SIMULATION   → Monte Carlo 10,000 iterations; derive both Strategy A (with boosts) and Strategy B (raw MC)
STEP 4: COMPILE RESULTS  → Build Strategy A pool (modes A–D, 膽拖) and Strategy B pool (MC #1 banker, legs = Place%>20% or odds<10)
STEP 5: GENERATE ADVICE  → Output both Strategy A and Strategy B suggestions in every report (tickets, stakes, pass conditions)
```

**IMPORTANT**: Do NOT skip steps. Do NOT use manual probability estimates. Always run the tools. **Every Trio report must include both Strategy A and Strategy B suggestions** — do not omit either.

---

## Trio vs 3T — Key Difference

| | Trio (單T) | 3T (Triple Trio) |
|---|---------------|-----------------|
| **Scope** | **Single race** | 3 designated races |
| **Objective** | Pick 1st, 2nd, 3rd in **ANY ORDER** | Pick top 3 in **any order** per leg |
| **Bet type** | Single-race exotic | Multi-race pool |
| **Ranking metric** | Adj Place% (who finishes top 3) | Adj Place% |
| **Permutations** | Order does NOT matter: C(P,3) combos | Order doesn't matter: combinations |

---

## A/B Test: Strategy A vs Strategy B

**Every Trio report must include both Strategy A and Strategy B suggestions** so the user can compare the difference on every race. Do not skip either.

| | **Strategy A** | **Strategy B** (MC-only) |
|---|---------------------------|---------------------------|
| **Ranking** | Adjusted Win% / Place% (MC + jockey boost + SCMP form) | **Raw MC only** — no jockey boost, no SCMP adjustments |
| **Banker** | 1st-ranked by Adj Win% (with banker eligibility: no debutants) | **1st-ranked by MC Win%** (MC #1) — always banker |
| **Legs / Pool** | Modes A–D by race classification (Adj Place% ≥ 25% must-include, pool size 5–7) | **Legs** = horses with **MC Place% > 20%**. Then any horse with **MC Place% ≤ 20% AND Win odds < 10** replaces the lowest MC Place% leg in the 20–25% range (1-for-1 swap). Pool = banker + final legs |
| **Cost** | 膽拖 (1 banker + legs) or 雙膽拖 when 2nd has Adj Place% ≥ 63% | 膽拖 only: 1 banker + N legs → C(N, 2) combos |
| **Use case** | Full pipeline (jockey + SCMP) | Pure model baseline for A/B comparison |

**Strategy B rules in short:**
1. Use **raw MC only**; do not apply 3c (jockey boost) or 3d (SCMP form adjustments).
2. **Banker** = the horse ranked **1st by MC Win%**.
3. **Legs (two-step selection):**
   - **Step A — Primary legs**: every horse with **MC Place% > 20%** (excluding banker).
   - **Step B — Win-odds replacement**: for each horse with **MC Place% ≤ 20% AND Win odds < 10**, it **replaces** the primary leg with the **lowest MC Place%** among those in the **20–25% range** (1-for-1 swap). If no primary leg has MC Place% in the 20–25% range, the Win-odds horse is **not** added. Process replacements one at a time, ordered by Win odds ascending (strongest market signal first).
4. Build **膽拖**: 1 膽 (banker) + 腳 (legs). Combinations = C(N, 2) where N = number of legs.
5. Include Strategy B in **every** report: show Strategy B pool, banker, legs, combos, and ticket summary alongside Strategy A.

---

## Step 1: Query Data

### 1a. Identify the race
Ask for or determine:
- **Date** (YYYY-MM-DD)
- **Venue** (ST / HV)
- **Race number(s)** — Trio can be played on any race; user may specify one or several target races

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

**To add future meeting dates** (e.g. new month’s fixtures): edit `data/historical/fixtures.json` and add entries, then re-run.

> **Critical**: Do NOT skip this step. Running MC simulation on stale historical data means horses’ latest form, speed ratings, and jockey stats may be missing — especially for horses that ran in recent meetings not yet scraped.

### 1c. Fetch jockey stats
```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts --date=YYYY-MM-DD
```
- **--date=YYYY-MM-DD** (optional): Racing date used to find jockeys from race cards and for the output filename. Omit to use today.
Output: `data/jockeys/jockey_stats_YYYYMMDD.json` + `data/jockeys/JOCKEY_STATS.md`

### 1d. Fetch live odds
```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=YYYY-MM-DD --venue=HV --json --save
```
Output: `data/odds/odds_YYYYMMDD_VENUE.json`

### 1e. Fetch race card
For each target race, fetch the HKJC race card to extract:
- Horse entries, jockey assignments, draw, weight, last 6 runs
- Race conditions: class, distance, surface, going

**Race card URL**:
```
https://racing.hkjc.com/racing/information/English/Racing/RaceCard.aspx?RaceDate=YYYY/MM/DD&Racecourse=HV&RaceNo=N
```

### 1f. Fetch SCMP Race Card Data

Fetch the South China Morning Post race card page for supplementary data:

**URL**: `https://www.scmp.com/sport/racing/racecard` (default loads current meeting day)
**Per-race URL**: `https://www.scmp.com/sport/racing/racecard/N` (for race N)

Use `WebFetch` to retrieve each target race page. Extract the following data — **do NOT use tipster picks**:

#### 1f-i. Win/Place Odds

The SCMP race card table includes **Win** and **Place** odds columns for every horse. These are the actual HKJC pool odds and are often more complete than what the `fetch-odds.ts` scraper captures.

**How to use:**
- Use as primary odds source when `fetch-odds.ts` returns partial data
- Record all horses' Win and Place odds
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

**How to use for Trio:**
- Cross-reference MC top quinella combinations with actual QP/Q pool odds
- Trio is like an extended quinella (top 3 instead of top 2) — QP/Q matrices help confirm which horses the market expects to fill the frame
- If the top-2 MC quinella is also a high-paying QP combination, that's a strong Trio value signal

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

Use **all form data** (HV + ST historical results) so horses with limited venue-specific form are not underrated:

```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts \
  --date YYYY-MM-DD \
  --venue "Happy Valley" \
  --race N \
  --form-data all \
  --bankroll BANKROLL \
  --kelly 0.35 \
  --min-edge 5
```

**IMPORTANT**:
- Use space-separated args (not `=` for `--venue`). Set `PLAYWRIGHT_BROWSERS_PATH=0`.
- **`--form-data all`** (or `-f all`): Loads historical results from **all venues** (Happy Valley + Sha Tin) for horse form enrichment. Without it, only the current race venue is used — horses with little form at that venue can be severely underrated by MC (e.g. 0.8% Place% at HV vs 37.6% with all-form data). Always use this flag for Trio strategy.

**For Strategy B**: From the same MC run, use **raw MC output only** — do not apply 3c (jockey boost) or 3d (SCMP form adjustments) for the Strategy B branch. You still apply 3c and 3d for Strategy A; Strategy B uses only MC Win% and MC Place%.

### 3b. Capture MC output
From each run, record:
- **Win% and Place%** for all horses
- **Top quinella combinations** with MC probability and fair odds
- **Market efficiency** (overround, favourite bias, undervalued/overvalued horses)

### 3c. Apply elite jockey priority
Apply a **linear** jockey boost by season win%: **+1%** when win% > 7%, **+7%** when win% > 20%, and linear in between (e.g. ~13.5% win% → +4%).
If MC ranks the mount **outside its top 4**, cap the boost at **+4%** to prevent the jockey premium from overriding MC's assessment of the horse's underlying ability.

**Formula:**  
`boost = win% ≤ 7 ? 0 : min(7, 1 + (win% - 7) * 6 / 13)`  
Then if MC outside top 4: `boost = min(boost, 4)`.

| Win% Range | Boost (MC top 4) | Boost (MC outside top 4) |
|------------|-------------------|--------------------------|
| ≤ 7% | 0% | 0% |
| 7–20% | Linear: +1% at 7% → +7% at 20% | **capped at +4%** |
| > 20% | +7% | **+4% (capped)** |

> **Why cap at +4% when MC disagrees?** (learned 8-Mar-2026)
> - *R6*: Purton on #6 LIVE WIRE — MC rated outside top 6 ("overvalued 81%"). Full +7% inflated #6 to 30% Adj Win% (banker). #6 finished 7th. MC's #1 (#2 YEE CHEONG GLORY) won at $30.5.
> - *R3*: Purton on #2 ONE MAN SHOW — MC rated #2 as #1 (28.3%), so full +7% was justified. Finished 5th due to draw 12 AWT, not boost logic.
> - When MC and jockey agree, the boost reinforces a strong signal. When MC strongly disagrees, the boost can inflate a weak horse to banker — the costliest error pattern (3 "all legs" misses in 61 races, ~$3,400 missed Trio dividends).

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

#### Positive Form Flags (from Star Form, Trackwork)

| Flag | Condition | Adjustment |
|------|-----------|------------|
| **Strong trial** | Trackwork highlight: "travelled well", "looks ready" | +2% to MC Win% |
| **Draw advantage** | Star Form: "drawn to get his chance", "gate should help" | +1% to MC Win% |
| **Improving form** | Star Form: "improved", "rallied", "made all" in recent run | +1% to MC Win% |
| **Excuses last run** | TIR: "crowded", "steadied", "wide trip" = bad luck | +2% to MC Win% (bounce candidate) |

#### Cap rule
- Total SCMP form adjustment per horse: **max ±8%** to MC Win%, **max ±10%** to MC Place%
- If adjustments push any horse's probability above 50% Win or 85% Place, cap at those values
- Always show **raw MC%**, **Adj Win% factor** / **Adj Place% factor** as **lists of reasons with ±%** (e.g. jockey +2.3, excuses +2), and **adjusted%** (after all boosts) in the HORSE RANKINGS table

---

## Step 4: Compile Results

### 4a. Build ranking table

Rank all horses by **Adjusted Win%** and **Adjusted Place%** to determine pool inclusion. Include **Adj Win% factor** and **Adj Place% factor** as **lists of reasons with ±%** (e.g. `jockey +2.3, excuses +2` or `jockey +7, trial +2` or `jockey 0, -perf −2`), not a single number:

```
RACE [N] — [Class] | [Distance] | [Going] | [Field size]
| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP Flags |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|
| 1 | X | NAME | XX.X% | XX.X% | jockey +2.3, excuses +2 | (same) | XX.X% | XX.X% | X.X | Name | +trial, +draw |
```

### 4b. Classify the race

Use **adjusted** probabilities for classification:

| Classification | Criteria | Approach |
|----------------|----------|----------|
| **Dominant** | Top horse Adj Win% >= 35% | **Tight Pool** (Mode A); 5-horse pool centred on the dominant horse. |
| **Competitive** | Top horse Adj Win% 20-35% | **Standard Pool** (Mode B); 6-horse pool with top 3 by Adj Win% + 3 by Adj Place%. |
| **Wide open** | No horse Adj Win% >= 20% | **Wide Pool or PASS** (Mode C/D); 7-horse pool if structural edge exists. Default to PASS. |

### 4c. Select horses and build Trio pool — do both Strategy A and Strategy B

**Strategy A** (below): Use adjusted rankings, classification, Modes A–D, and 膽拖/雙膽拖 as described.

**Strategy B** (always also compile): **Banker** = 1st by MC Win%. **Legs** = all horses with **MC Place% > 20%** (primary); then any horse with **MC Place% ≤ 20% AND Win odds < 10** replaces the lowest MC Place% leg in the 20–25% range (1-for-1 swap). Pool = 1 banker + final legs → 膽拖 with C(N, 2) combinations. No classification or Modes A–D. Include Strategy B pool and ticket in every report (see [A/B Test](#ab-test-strategy-a-vs-strategy-b)).

---

**Strategy A — pool selection**

Trio (單T) requires picking the **1st, 2nd, and 3rd finishers in ANY ORDER**. No positional analysis is needed — just select the right horses to fill the top 3.

#### Pool selection

Select a **single pool** of P horses. The system generates all C(P,3) combinations automatically. Your only job is to pick WHICH horses will finish in the top 3, not their order.

| Key metric | What to look for |
|-----------|-----------------|
| **Adj Win%** | Horses most likely to win — also most likely to place top 3 |
| **Adj Place%** | Horses likely to place in top 3 even if they don't win — consistent place-getters, each-way types |
| **Adj Place% >= 25%** | Any horse with >= 25% Adj Place% MUST be included in the pool |

#### Selection modes (pool size by race classification)

Since Trio is ANY ORDER, there is no 1st/2nd/3rd positional structure. Just select a **pool of P horses** and bet all C(P,3) combinations.

**Mode A: Tight Pool (Dominant race, top horse Adj Win% >= 35%)**
- Pool of **5 horses**: banker + 4 contenders ranked by Adj Place%
- Combinations: C(5,3) = **10**
- Cheap, focused ticket. High hit rate when banker is in the top 3.

**Mode B: Standard Pool (Competitive race, top horse Adj Win% 20-35%)**
- Pool of **6 horses**: top 3 by Adj Win% + 3 others by Adj Place%
- Combinations: C(6,3) = **20**
- Good balance of coverage and cost. The workhorse mode.

**Mode C: Wide Pool (Wide open race, no horse >= 20%)**
- Pool of **7 horses**: top 4 by Adj Win% + 3 others by Adj Place%
- Combinations: C(7,3) = **35**
- Wider coverage for uncertain races. Only play if structural read exists.
- Consider PASS if no clear edge — wide-open races are inherently low hit rate.

**Mode D: PASS**
- If no clear edge and the field is truly open, **skip this race** for Trio
- Better to deploy bankroll on races with clearer structure
- Default to PASS for wide-open races unless strong pace/form conviction

#### 膽拖 (Banker-Leg) structure — cost optimisation

After selecting the pool, the **1st-ranked horse** (by Adj Win%) is **always** designated as the 膽 (Banker):

| Condition | Structure | Formula |
|-----------|-----------|---------|
| **Always (default)** | **膽拖** (1st-ranked as Banker + N Legs) | C(N, 2) = N × (N-1) / 2 |
| **2nd horse also Adj Place% >= 63%** | **雙膽拖** (2 Bankers + N Legs) | N combos |

**Banker eligibility rules (CRITICAL — learned from 8-Mar-2026 review):**

1. **No debutants as banker.** Horses with fewer than 2 race starts cannot be designated as banker. Move to the next-ranked horse with ≥2 starts. The debutant stays in the pool as a leg.
   - **Evidence (8-Mar R1)**: #7 MAPOGO (debutant, 3/3 trials, 1.8x favourite) was banker. Led but faded to 4th under race pressure. Trial form ≠ race form. Next-ranked #8 RUN RUN SUNRISE won at 5.2x.

**Why the 1st-ranked horse is the default banker:**
- **Evidence (19-Feb-2026)**: The 1st-ranked horse finished in the Top 4 in **9/11 races (81.8%)**.
- **Cross-meeting banker top-3 rate**: 34/61 = 55.7% (6 meetings). At Sha Tin: 26/43 = 60.5%.
- When the 1st-ranked horse misses the top 3, it typically means a longshot upset where most pool selections also miss. The cost savings from banker structure outweigh the rare banker failure.

**How it works:**
- **膽 (Banker)**: The 1st-ranked horse is locked into EVERY combination — must finish top 3 for ANY ticket to win.
- **腳 (Legs)**: the remaining pool horses. System picks 2 from legs (1-banker) or 1 from legs (2-banker) to complete each combination.
- The bet slip on HKJC supports 膽拖 directly — select "膽" for the 1st-ranked horse and "腳" for remaining pool horses.

**1 Banker (膽拖) combinations:**

| Legs (腳) | Combos C(N,2) | vs Full Pool | Savings |
|-----------|---------------|-------------|---------|
| 4 腳 | 6 | C(5,3) = 10 | **40%** |
| 5 腳 | 10 | C(6,3) = 20 | **50%** |
| 6 腳 | 15 | C(7,3) = 35 | **57%** |
| 7 腳 | 21 | C(8,3) = 56 | **63%** |

**2 Bankers (雙膽拖) combinations:**

| Legs (腳) | Combos = N | vs Full Pool | Savings |
|-----------|------------|-------------|---------|
| 3 腳 | 3 | C(5,3) = 10 | **70%** |
| 4 腳 | 4 | C(6,3) = 20 | **80%** |
| 5 腳 | 5 | C(7,3) = 35 | **86%** |

**When to use 膽拖:**
1. **Always use 膽拖 with the 1st-ranked horse as banker.** The model's #1 ranked horse has ~82% top-3 rate — strong enough to always anchor.
2. Apply AFTER the pool is selected using Modes A-D. The banker is always the 1st-ranked horse; only the bet slip structure changes to reduce combinations and cost.
3. The same pool of horses is used; the 1st-ranked horse becomes 膽, all others become 腳.
4. If the banker fails to place top 3, ALL tickets lose — this is the trade-off for cheaper tickets. Accept this as variance; the ~82% hit rate means it works most of the time.
5. For 2-banker (雙膽拖), the 2nd horse must have Adj Place% >= 63%. Combined hit probability ≈ B1 × B2. Only use when confident in both.

**Decision flow:**
```
Pool selected (P horses, ranked by Adj Win%)
  │
  ├─ 1st-ranked horse → ALWAYS 膽 (Banker)
  │   ├─ 2nd-ranked horse also Adj Place% >= 63%?
  │   │   ├─ YES → 雙膽拖: 2 膽 + (P-2) 腳 → (P-2) combos
  │   │   └─ NO → 膽拖: 1 膽 + (P-1) 腳 → C(P-1, 2) combos
```

#### Running style integration

Running style is useful for assessing which horses are likely to finish in the top 3:

| Running Style | Top-3 Suitability |
|---------------|------------------|
| **Front-runner / On-pace** | Strong in small fields, weak tempo races. Can hold on for top 3 but vulnerable if pace is hot. |
| **Stalker / Midfield** | Very consistent top-3 type. Reliable in all conditions. Prioritise for pool inclusion. |
| **Closer / Back marker** | Strong in large fields with pace on. Include if pace scenario is favourable. |

Use SCMP Star Form to assess running styles:
- "Made all", "led", "set the pace" → front-runner
- "Stalked the leader", "box seat", "handy position" → stalker
- "Came from the rear", "closed well", "finished strongly" → closer

### 4d. Calculate combinations and cost

Since Trio is ANY ORDER, use the **combinations** formula C(P,3):

```
Trio (Any Order) Combinations:
  Pool size: P horses
  Combinations: C(P,3) = P! / (3! x (P-3)!)

  P=5: C(5,3) = 10 combinations
  P=6: C(6,3) = 20 combinations
  P=7: C(7,3) = 35 combinations
  P=8: C(8,3) = 56 combinations

  Unit bet: $10 (fixed)
  Total stake: combinations x $10
```

**Combination and cost table (Full Pool — no banker):**
| Mode | Pool | Combos | Cost ($10/combo) |
|------|------|--------|-----------------|
| A    | 5    | 10     | $100            |
| B    | 6    | 20     | $200            |
| C    | 7    | 35     | $350            |

**Combination and cost table (膽拖 — 1 Banker, always used):**
| Pool | Structure | Combos | Cost ($10/combo) | vs Full Pool |
|------|-----------|--------|-----------------|-------------|
| 5    | 1膽 + 4腳 | 6      | $60             | 40% cheaper |
| 6    | 1膽 + 5腳 | 10     | $100            | 50% cheaper |
| 7    | 1膽 + 6腳 | 15     | $150            | 57% cheaper |
| 8    | 1膽 + 7腳 | 21     | $210            | 63% cheaper |

**Combination and cost table (雙膽拖 — 2 Bankers):**
| Pool | Structure | Combos | Cost ($10/combo) | vs Full Pool |
|------|-----------|--------|-----------------|-------------|
| 5    | 2膽 + 3腳 | 3      | $30             | 70% cheaper |
| 6    | 2膽 + 4腳 | 4      | $40             | 80% cheaper |
| 7    | 2膽 + 5腳 | 5      | $50             | 86% cheaper |

**Key advantage over Tierce (exact order)**: Same pool of 6 horses = 20 Trio combos vs 120 Tierce permutations. 6x cheaper for the same horse selection.

**Key advantage of 膽拖**: Same horse selection but dramatically fewer combinations. A 6-horse pool with 1 banker = 10 combos (vs 20 full pool). Lower cost, same coverage — IF the banker places top 3.

### 4e. Value check — Trio pool odds

Before finalising, cross-reference with the **Trio pool estimate**:
- Check HKJC Tierce dividends from recent similar races as a benchmark
- If the top MC Trio combination (e.g. 1-5-3) has a very short market favourite for 1st, the Trio dividend is likely low
- **Value Trio bets** occur when: (a) a non-favourite can win, creating large dividends, or (b) the 2nd and 3rd place finishers are hard to predict, inflating the pool

---

## Step 5: Generate Advice

### Output the full report

Save to: `data/reports/trio_strategy_YYYYMMDD_VENUE_RN.md`

---

## Trio Bet Type Explained (HKJC official rules)

### Trio = Any Order (HKJC 單T)
- **Objective**: Select the **1st, 2nd, and 3rd** finishers in **ANY ORDER** in **one** designated race.
- **Trio (Single)**: Pick exactly 3 horses (e.g. 2, 7, 9). If these 3 fill the top 3 in any order, you win. One combination.
- **Trio (Multiple)**: Select a pool of horses; system generates **all C(P,3) combinations** of 3 from your selections.
- **Trio (膽拖 / Banker-Leg)**: Designate 1-2 horses as **膽 (Banker)** and remaining as **腳 (Legs)**. Bankers appear in every combination. Reduces combos dramatically:
  - 1 Banker + N Legs → C(N, 2) combinations (pick 2 from legs)
  - 2 Bankers + N Legs → N combinations (pick 1 from legs)
  - The 1st-ranked horse (by Adj Win%) is always the banker. For 雙膽拖, 2nd horse must also have Adj Place% >= 63%.
- **Minimum**: At least **3 starters**; otherwise pool is closed and refunded.
- **Unit bet**: Always $10 per combination (fixed).
- **Dividend**: The 單T dividend shown on HKJC results pages. Lower than Tierce (三重彩) because order doesn't matter.
- **Source**: [HKJC Betting Rules](https://www.hkjc.com/english/betting/betting_rule.aspx).

### Trio vs Tierce
HKJC offers two top-3 single-race bets:
- **Trio (單T)** = ANY ORDER → **this skill**. Pick 3 horses that fill the top 3 in any order. Lower dividend, higher hit rate.
- **Tierce (三重彩)** = EXACT ORDER → Pick 1st, 2nd, 3rd in correct sequence. Higher dividend, much harder to hit.
- **3T (Triple Trio)** = ANY ORDER across 3 races → see `3t-strategy` skill.

---

## Output Format

Every Trio report must include **both Strategy A and Strategy B** in the same report. Structure:

1. **Shared**: **MC SIMULATION (raw)** table listing **all horses** with columns: MC Win%, MC Place%, **Win Odds**, **Place%>20%** (✅/❌), **Win odds<10** (✅/❌), Form, optional Top Quinella. **Strategy B leg** = primary legs (Place%>20% ✅) after any Win-odds replacements (see Strategy B rules).
2. **Strategy A**: **HORSE RANKINGS** with **Adj Win% factor**, **Adj Place% factor**, **Adj Win%**, **Adj Place%** (factor columns = list of reasons with ±%, e.g. `jockey +2.3, excuses +2`), then **TRIO POOL** and **TICKET SUMMARY** for Strategy A.
3. **Strategy B**: A dedicated **STRATEGY B (MC-only)** block with: banker = MC #1, primary legs = Place% > 20%, Win-odds replacements applied, 膽拖 structure, combinations, and **TICKET SUMMARY** for Strategy B (no Adj columns; raw MC + Odds only).

This allows the user to compare Strategy A vs Strategy B on every race.

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - [Venue] | [Date] | Race [N]
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All checks passed | Going: [X] | [N] scratchings
MC SIMULATION: 10,000 iterations | Jockey boost applied
SCMP DATA: ✅ Loaded | Form/TIR/Vet/Odds parsed
ODDS SOURCE: [HKJC early-morning pool / HKJC live / SCMP race card] ([tool name], captured [HH:MM HKT DD-Mon])
             SCMP odds: [✅ loaded / ❌ not yet published] | HKJC live: [✅ loaded / ❌ not open]

RACE: R[N] — [Class] | [Distance] | [Surface] | [Going] | [Field size] runners
CLASSIFICATION: [Dominant / Competitive / Wide open] | POOL SIZE: [P]
MODE: [A: Tight Pool (5) / B: Standard Pool (6) / C: Wide Pool (7) / D: PASS]
BET STRUCTURE: [Full Pool C(P,3) / 膽拖 1膽+(P-1)腳 C(P-1,2) / 雙膽拖 2膽+(P-2)腳 = P-2]
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
Note: List **all** horses in the field (one row per runner). Two flags: **Place%>20%** — ✅ if MC Place% > 20%, else ❌; **Win odds<10** — ✅ if Win odds < 10, else ❌. Strategy B primary legs = Place%>20% ✅. Horses with Place%>20% ❌ + Win odds<10 ✅ are **replacement candidates** — they swap out the weakest primary leg (MC Place% 20–25%) one-for-one (see Strategy B rules). Top Quinella: show the leading quinella pair for the top few only; use "—" for the rest.

| # | Horse     | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) |Top Quinella (fair odds)     |
|---|------------|---------|-----------|------|------------|-------------|------|-------------------------------|
| X | NAME       | XX.X%   | XX.X%     | X.X  | ✅          | ✅           | N    | ★ 膽 (Banker)    | X-X: X.X% (X.X)               |
| X | NAME       | XX.X%   | XX.X%     | X.X  | ✅          | ❌           | N    | 腳 (Leg)         | —                             |
| X | NAME       | XX.X%   | XX.X%     | X.X  | ❌          | ✅           | N    | 腳 (Leg)         | — (replacement candidate)     |
| X | NAME       | XX.X%   | XX.X%     | X.X  | ❌          | ❌           | N    | —                | —                             |
| … | (all runners) |

Market: [1–2 line summary of over/undervalued vs market]

───────────────────────────────────────────────────────────
HORSE RANKINGS
───────────────────────────────────────────────────────────
| # | Horse     | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role         |
|---|------------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|--------------|
| X | NAME       | XX.X%   | XX.X%     | jockey +2.3, trial +2 | jockey +2.3, trial +2 | XX.X%    | XX.X%      | X.X  | Name   | Front | +trial     | ★ 膽 (Banker)|
| X | NAME       | XX.X%   | XX.X%     | jockey +7, excuses +2 | jockey +7, excuses +2 | XX.X%    | XX.X%      | X.X  | Name   | Stalk | +draw      | 腳 (Leg)     |
| X | NAME       | XX.X%   | XX.X%     | jockey 0, -perf −2   | jockey 0, -perf −2   | XX.X%    | XX.X%      | X.X  | Name   | Close | +excuses   | 腳 (Leg)     |
| X | NAME       | XX.X%   | XX.X%     | 0                   | 0                   | XX.X%    | XX.X%      | X.X  | Name   | Stalk | —          | 腳 (Leg)     |
| X | NAME       | —       | —         | —               | —                 | ~X.X%    | ~XX.X%     | X.X  | Name   | —     | —          | 腳 (Leg)     |

**Factor columns:** Show a **list of reasons with ±%**, e.g. `jockey +2.3, excuses +2` (jockey boost + SCMP reason and percentage). Use reason labels: jockey (always first if non-zero), then SCMP reasons (e.g. excuses +2, trial +2, +draw +1, -perf −2, -injury30d −3). Omit jockey if 0; omit SCMP if 0; use `0` when no adjustment. Adj Win% = MC Win% + sum of factor reasons (after caps). Same for Adj Place% factor.

Note: ★ 膽 = Banker (1st-ranked horse by Adj Win%, always locked in every combo). For 雙膽拖, the 2nd horse must also have Adj Place% >= 63%. Horses without MC output use estimated ~X.X% and "—" for factors.

Reasoning: [Why these horses are in the pool; MC evidence; pace scenario; SCMP insights]

───────────────────────────────────────────────────────────
TRIO POOL (any order)
───────────────────────────────────────────────────────────
POOL: #X, #X, #X, #X, #X [, #X, #X]
MODE: [A/B/C] | POOL SIZE: [P]

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #X [NAME] (Adj Place% XX.X%) ← locked in every combo
腳 (Legs):  #X, #X, #X, #X [, #X]
BET STRUCTURE: 膽拖 | 1膽 + [N]腳 | COMBINATIONS: C([N],2) = [combos]

(If no banker):
BET STRUCTURE: Full Pool | COMBINATIONS: C([P],3) = [combos]

TOP TRIO COMBINATIONS (by combined Adj Place%):
| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #X, #X, #X | X.X% | $XX |
| 2 | #X, #X, #X | X.X% | $XX |
| 3 | #X, #X, #X | X.X% | $XX |
| 4 | #X, #X, #X | X.X% | $XX |
| 5 | #X, #X, #X | X.X% | $XX |

───────────────────────────────────────────────────────────
TICKET SUMMARY
───────────────────────────────────────────────────────────
COMBINATIONS: [N] ([膽拖: C(N,2) where N = legs] or [Full Pool: C(P,3) where P = pool size])
UNIT BET: $10 (fixed)
TOTAL STAKE: $[combos x 10]

TOP COMBINATIONS (highest value):
  [List top 5-10 horse groups of 3, with combined probability]

PASS CONDITIONS:
- If [Horse] (pool anchor) is scratched → VOID ticket or restructure
- If field drops below 3 → pool refunded
- If going changes to Heavy → reconsider front-runner bias

CONFIDENCE: [HIGH/MEDIUM/LOW]

CAVEATS:
- [List any data gaps, missing odds, going uncertainty, SCMP data issues, etc.]

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — include in every report
───────────────────────────────────────────────────────────
Banker: #X [NAME] (MC Win% XX.X%, MC Place% XX.X%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #X, #X, #X, …
Win-odds replacements: #X [NAME] (Win odds X.X, MC Place% XX.X%) replaces #X [NAME] (MC Place% XX.X%, in 20–25% range)
Final legs: #X, #X, #X, …
BET STRUCTURE: 膽拖 | 1膽 + [N]腳 | COMBINATIONS: C([N],2) = [combos]
UNIT BET: $10 (fixed)
TOTAL STAKE: $[combos x 10]

STRATEGY B TICKET: [List legs and combos]

[Optional: 1–2 line comparison vs Strategy A — e.g. "Strategy B has more/fewer legs, higher/lower cost because…"]
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

TOTAL TRIO STAKE: $[combos x 10]
═══════════════════════════════════════════════════════════
```

---

## Venue-Specific Adjustments

### Sha Tin
- Standard selections; trust MC top picks
- Favourites more reliable (~50% win rate) → Mode A (tight pool) more viable
- Front-runners hold up well on standard track settings
- Jockey boosts at full value

### Happy Valley
- **More upsets** — use wider pools (Mode B/C)
- Tight track favours on-pace horses; closers need clear running
- Consider wider pool (7 horses for Mode C) due to unpredictability
- Front-runner bias in HV 1,200m races; stalker bias in 1,650m+

---

## Important Reminders

1. **Follow the pipeline** — Do not skip data fetching or simulation. Manual estimates are unreliable.
2. **Trio ≠ 3T** — Trio (單T) is a single-race bet (pick top 3 in any order). 3T is Triple Trio (three races). Never confuse the two.
3. **Order does NOT matter** — Trio (單T) is ANY ORDER. Just pick the 3 horses that finish in the top 3. This is simpler than Tierce and has a higher hit rate.
4. **Trio is high variance** — Be aware of total exposure across the meeting. Use $10 per combo (fixed), no flexi.
5. **Tight pool for dominant races** — Use Mode A (5-horse pool) when Adj Win% >= 35%. The dominant horse is the anchor; include 4 contenders by Adj Place%.
6. **PASS when appropriate** — Wide open races with no clear edge should be skipped. Not every race is a Trio race. Typical meeting: play Trio on 2-3 races maximum. Default to PASS for Mode C unless strong form/pace conviction.
7. **1st-ranked horse is ALWAYS the banker (膽)** — The model's #1 ranked horse (by Adj Win%) has ~82% top-3 rate. Always designate it as 膽 and use 膽拖 structure. This reduces combos by 40-57% vs full pool while maintaining high hit probability.
**Never use debutants (<2 starts) as banker.**
8. **No narrative-based exclusion** — Never use subjective labels ("not genuine", etc.) from any source to exclude horses from the pool. Use Adj Place% thresholds only: >= 20% Adj Place% must be in the pool.
9. **No hard exclusion if market odds <= 15** — The market knows about injuries, vet flags, and fitness. If a horse is still 15 odds or shorter despite negative flags, include in the pool. Only exclude at >30 odds with zero positive flags.
10. **Scratchings** — Define replacement rules before the race. If the banker is scratched, void the ticket rather than restructuring.
11. **Post-race review is mandatory** — After every meeting, fetch results and cross-reference tickets. Classify misses. Track cumulative P&L. This is how the strategy improves over time.
12. **SCMP is supplementary** — MC simulation is the primary model. SCMP data adjusts and informs but does not override MC probabilities.
13. **Do NOT use tipster picks** — Ignore all tipster selections from SCMP or any other source.
14. **Cross-reference with Quinella odds** — If the top MC quinella pair also shows high SCMP Q/QP odds, the Trio involving those horses likely offers outsized value.
15. **Gate penalties are reducers, not exclusions** — Wide gates (10+) reduce probability by 1-3% but never fully exclude. Gate 13 winners exist (R11 19-Feb, $350).
16. **Always use 膽拖 with 1st-ranked as banker** — The 1st-ranked horse (by Adj Win%) is always the 膽 (Banker). This cuts combinations by 40-57% vs full pool. For 雙膽拖, the 2nd horse must also have Adj Place% >= 63%.
17. **No debutants as banker** — Horses with <2 race starts cannot be banker. Demote to leg and use next eligible horse. Trial form ≠ race form. Evidence (8-Mar R1): debutant #7 MAPOGO (1.8x fav, 3/3 trials) led but faded to 4th.
18. **Cap jockey boost when MC disagrees** — If MC ranks the jockey's mount outside its top 4, cap jockey boost at +4%. The premium should not override MC's assessment. Evidence (8-Mar R6): Purton +7% elevated #6 LIVE WIRE to banker despite MC rating him outside top 6. #6 finished 7th.
19. **Banker failure = total loss (accepted risk)** — If the 膽 fails to finish top 3, ALL tickets lose. This is the trade-off for cheaper tickets. Cross-meeting banker top-3 rate: ~56% (34/61).
20. **2-Banker (雙膽拖) is high-risk** — Both bankers must place top 3. Combined probability ≈ B1 × B2 (e.g., 63% × 65% ≈ 41%). Only use when both horses have Adj Place% >= 63% AND the race is strongly structured.

---

## Key Tools

| Tool | Command / URL | Purpose |
|------|--------------|---------|
| Jockey Stats | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts --date=YYYY-MM-DD` | Season win rates |
| Live Odds | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=YYYY-MM-DD --venue=HV --json --save` | Current odds |
| Race Analysis | `PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date YYYY-MM-DD --venue "Happy Valley" --race N --form-data all --bankroll BANKROLL --kelly 0.35 --min-edge 5` | MC simulation (use `--form-data all` for all-venue form) |
| Race Card | `https://racing.hkjc.com/racing/information/English/Racing/RaceCard.aspx?RaceDate=YYYY/MM/DD&Racecourse=HV&RaceNo=N` | Entries, jockeys |
| **SCMP Race Card** | `https://www.scmp.com/sport/racing/racecard/N` | **Odds, Star Form, TIR, Vet Report, Trackwork, QP/Q odds** |

---

## SCMP Data Quick Reference

### What to extract per race (for Trio)

```
For each target race, build this SCMP data table:

RACE [N] SCMP DATA
| # | Horse | Win Odds | Place Odds | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------|------------|------------------|----------|----------|-----------|---------------|
| X | NAME | X.X | X.X | +draw, +form | clear | clear | +trial | Front-runner |
| X | NAME | X.X | X.X | -disappointed | -barrier | -injury30d | — | Closer |
```

### Shorthand flag codes
- `+trial` = positive trackwork/trial
- `+draw` = favourable draw (Star Form)
- `+form` = improving recent form
- `+excuses` = bad luck last run (TIR bounce)
- `-injury` = recent injury flag (Vet)
- `-injury30d` = injury passed <30 days ago
- `-barrier` = repeated barrier issues (TIR)
- `-perf` = unacceptable performance (TIR)
- `-age` = 8+ years old (Vet)
- `-notRO` = not ridden out (TIR)

---

## Step 6: Post-Race Review (NEW — added from 19-Feb-2026 analysis)

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

### 6b. Cross-reference each ticket

For each race where a Trio ticket was placed, record:

```
| Race | Mode | Pool | Result (top 3) | Hit? | Why Missed | Trio Dividend |
```

### 6c. Classify misses

Categorize each miss into one of these root causes:
- **Pool miss**: One or more of the top-3 finishers was not in the pool (→ review pool selection criteria)
- **Narrative demotion**: Horse demoted from 1st by subjective label despite strong Adj Win% (→ violated Rule 1)
- **Hard exclusion**: Excluded horse placed (→ violated Rule 2 on market odds threshold)
- **Genuine upset**: Winner was >30 odds and not in any reasonable selection (→ accept variance)
- **Model error**: MC/blend significantly mispriced a horse (→ review blend weights)

### 6d. Calculate impact

For each miss, estimate: "Would the proposed fix have caught this result?"
Track cumulative P&L across meetings to validate whether rule changes improve ROI.

### 6e. Save review

Save to: `data/reports/trio_review_YYYYMMDD_VENUE.md`

---

## Example Query

"Generate Trio strategy for Sha Tin Race 7, 14/02/2026."

Expected agent behaviour:
1. Fetch jockey stats → check elite tier
2. Fetch odds for ST 2026-02-14 → save
3. **Fetch SCMP race card for R7** → extract odds, Star Form, TIR, Vet, Trackwork, QP/Q odds (ignore tipster picks)
4. Run `analyze-race.ts` for R7 with `--form-data all`
5. Validate: ≥3 starters, odds populated, no critical scratchings, SCMP data loaded
6. Apply jockey boosts + SCMP form adjustments
7. Classify race (Dominant / Semi-Dominant / Competitive / Wide open)
8. Build **Strategy A** pool (modes A–D, 膽拖) and **Strategy B** pool (MC #1 banker, primary legs = Place% > 20%, Win-odds < 10 replacements)
9. Apply exclusion rules for Strategy A (Rules 1-3) — no narrative demotion, no hard exclusion if odds <= 15
10. Calculate permutations and cost for both strategies
11. **Output both Strategy A and Strategy B** Trio tickets + summary in the same report
12. Save to `data/reports/trio_strategy_20260214_ST_R7.md`
13. **After the meeting**: Fetch results, cross-reference, save review
