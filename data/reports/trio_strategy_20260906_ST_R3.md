═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-06 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ⚠️ Passed with a corrected data bug (see below) | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations — **output judged unreliable for this race, see MODEL FAILURE**
HISTORICAL SYNC: ✅ 218/219 fixtures scraped
SCMP DATA: ✅ Loaded — TIR + Vet + real Win/Place odds for all 6 runners (no Star Form, no trackwork published)
ODDS SOURCE: **SCMP race card** (real HKJC pool). `fetch-odds.ts` place odds were flagged "estimated from win odds" and are unusable here (it returned 10/20/29/30/40 against SCMP's 1.4/5.6/6.2/6.4/7.3).

RACE: R3 THE HKSAR CHIEF EXECUTIVE'S CUP (HANDICAP) — **Group 3** | 1200m | Turf | Good | **6 runners** | $4,200,000
CLASSIFICATION: Competitive by the letter of the rule (top Adj Win% 34.1%) | POOL SIZE: 6 = **the entire field**

## ►► RECOMMENDATION: **PASS (Mode D)** ◄◄

This is not a close call and it does not depend on which model you believe. See VALUE CHECK.

───────────────────────────────────────────────────────────
DATA BUG FOUND AND FIXED
───────────────────────────────────────────────────────────
`src/scrapers/raceCard.ts:790` accepted a scraped rating only when `rtgVal >= 10 && rtgVal <= 140`:

```ts
let currentRating = 60;                                   // line 783 — default
...
if (!isNaN(rtgVal) && rtgVal >= 10 && rtgVal <= 150) {    // line 790 — was <= 140
```

**#1 KA YING RISING is rated 142.** It failed the upper bound, so the parse silently fell through to the default `currentRating = 60` — against a field rated 86–109. The bound was raised to 150 and the race card re-scraped; the field now reads 142 / 109 / 107 / 103 / 102 / 86 correctly.

**This fix did not rescue the simulation.** Re-running MC moved #1 from 34.5% to 34.1% win. The MC builds its own composite strength (it reports "rating: 63" for #1) from form and speed figures and never consults `currentRating`, so the corrupted field was a symptom, not the cause. The fix is still correct and will matter for any future runner rated above 140.

───────────────────────────────────────────────────────────
MODEL FAILURE — WHY THE MC OUTPUT IS NOT USED
───────────────────────────────────────────────────────────
The MC has #1 KA YING RISING at 34.1% win. The market has him at **1.0** — the display floor, implying ~97%+. Normally I would side with a model showing a large edge. Not here, because the model contradicts its own input data:

**1. The form lines say #1 is far superior, and the MC ignores them.** His last six runs are `1/1/1/1/1/1` — six straight wins, five at Group 1:

| Horse | Recent 1200m times | Level |
|---|---|---|
| #1 KA YING RISING | **67.10, 67.12, 67.66, 67.70, 67.33** | Group 1 wins |
| #3 PATCH OF STARS | 67.94, 68.88, 69.07, 69.19, 69.78 | Group 3 / Class 2 |
| #5 LUCKY WITH YOU | 68.36, 68.86, 69.27, 69.76 | Class 2 / Group 3, mostly beaten |

#1 is roughly 0.8–2.0 seconds faster over 1200m — an enormous margin — while winning at the highest level. The MC still separates him from #5 by only 2 rating points (63 vs 61).

**2. The finish-time projection is not merely noisy, it is inverted.** It places #1 **last, 5.68s / 34.1 lengths behind**, and projects #2 COPARTNER PRANCE (form 8/3/9/6/14/6, 328 in the market) as the winner. A horse whose actual recorded times are the fastest in the race cannot be projected 34 lengths last from those same times. His 135lb impost (vs 115lb for the rest) is real and worth perhaps 10 lengths on a standard weight-to-length scale — not 34.

**3. The market-efficiency block is nonsense on its face** — "#5 undervalued by 7459%", longshot bias "+3889%". These are artefacts of dividing by a 1.0 favourite, and they confirm the module is outside its valid range.

**4. Two further data defects, noted but not fixed** (outside the scope of this request):
   - `winningMargin` is a verbatim copy of `finishPosition` on every past-performance row (fin=1→margin=1, fin=8→margin=8, fin=11→margin=11). Real beaten margins are absent from the dataset.
   - The MC's own strength model does not convert class level or absolute time into a proportionate edge, which is the actual cause of this race's failure. It compresses a 142-rated Group 1 winner and a 102-rated Class 2 horse into a 2-point gap.

Everything below therefore reports the MC numbers **as the skill requires**, but the recommendation rests on a **market-anchored model** fitted to the real SCMP place pool.

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — reported for completeness, not trusted
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place Odds | Place%>20% | Win odds<10 | Rtg | Age | Draw | Form (last 6) | Role (Strategy B) | Top Quinella (fair) |
|---|-------|---------|-----------|----------|------------|------------|-------------|-----|-----|------|---------------|-------------------|---------------------|
| 1 | KA YING RISING | 34.1% | 77.0% | **1.0** | 1.0 | ✅ | ✅ | 142 | 6 | 1 | 1/1/1/1/1/1 | ★ 膽 (Banker) | 1-5: 21.4% (4.7) |
| 5 | LUCKY WITH YOU | 24.6% | 67.0% | 262 | 6.2 | ✅ | ❌ | 102 | 9 | 2 | 2/3/8/5/4/11 | 腳 (Leg) | 3-5: 12.4% (8.1) |
| 3 | PATCH OF STARS | 20.8% | 61.7% | 132 | 1.4 | ✅ | ❌ | 107 | 5 | 4 | 1/1/2/3/4/1 | 腳 (Leg) | 1-3: 17.8% (5.6) |
| 2 | COPARTNER PRANCE | 10.5% | 42.1% | 328 | 5.6 | ✅ | ❌ | 109 | 7 | 5 | 8/3/9/6/14/6 | 腳 (Leg) | 1-2: 9.6% (10.4) |
| 6 | MAGIC CONTROL | 6.5% | 31.8% | 263 | 6.4 | ✅ | ❌ | 86 | 6 | 3 | 10/2/2/5/8/9 | 腳 (Leg) | — |
| 4 | TOMODACHI KOKOROE | 3.5% | 20.3% | 323 | 7.3 | ✅ | ❌ | 103 | 8 | 6 | 7/3/7/6/4/6 | 腳 (Leg) | — |

Note: in a 6-runner field the HKJC **place pool pays top 2 only**, so the Place Odds column is a top-2 price, not top-3.

**Market:** overround 1.6% — implausibly low, another symptom of the 1.0 floor. Every horse bar #1 is 132 or longer. The market prices this as a one-horse race with #3 PATCH OF STARS (place 1.4) the clear second string.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Age | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-----|------|-------|------------|------|
| 1 | 1 | KA YING RISING | 34.1% | 77.0% | 0 | 0 | **34.1%** | **77.0%** | 1.0 | Z Purton | 6 | 1 | — | — | ★ 膽 (Banker) |
| 2 | 5 | LUCKY WITH YOU | 24.6% | 67.0% | -age −2 | -age −2 | 22.6% | **65.0%** | 262 | M F Poon | 9 | 2 | — | −age (9yo) | ★ 膽 2 (see below) |
| 3 | 3 | PATCH OF STARS | 20.8% | 61.7% | 0 | 0 | 20.8% | 61.7% | 132 | K Teetan | 5 | 4 | — | — | 腳 (Leg) |
| 4 | 2 | COPARTNER PRANCE | 10.5% | 42.1% | excuses +2 | excuses +2 | 12.5% | 44.1% | 328 | M L Yeung | 7 | 5 | — | +excuses (pressured in the lead) | 腳 (Leg) |
| 5 | 6 | MAGIC CONTROL | 6.5% | 31.8% | excuses +2 | excuses +2 | 8.5% | 33.8% | 263 | M Chadwick | 6 | 3 | — | +excuses (wide, no cover) | 腳 (Leg) |
| 6 | 4 | TOMODACHI KOKOROE | 3.5% | 20.3% | -age −2 | -age −2 | 1.5% | 18.3% | 323 | H Bentley | 8 | 6 | — | −age (8yo) | 腳 (Leg) |

**Factor legend:** `-age −2` applies to 8yo+ in C3+ races — Group 3 qualifies, and #5 (9) and #4 (8) both trip it. `excuses +2` for the two TIR bad-luck lines. No vet flags beyond the routine "eight years or above" clearances (both passed 21/08/2026, which are age certificates, not injury clearances, so no `-injury30d`). No Star Form or trackwork published → no `+trial`/`+draw`, and running styles are unknown.

**Banker eligibility:** #1 has 10 starts — eligible, and it is the banker on every reading of the race.

**雙膽拖 trigger — and why it should be ignored.** 2nd-ranked #5 LUCKY WITH YOU has Adj Place% 65.0% ≥ 63%, so the skill's rule mechanically calls for a **2-banker ticket**. #5 is a **9-year-old at 262-to-1** whose last six are 2/3/8/5/4/11 and whose real top-2 market price is 6.2. The market-anchored model puts its top-3 chance at **30.2%**, not 65%. Promoting it to co-banker on a broken simulation would be the single worst decision available in this race. Recorded here because the pipeline produces it; not recommended.

───────────────────────────────────────────────────────────
MARKET-ANCHORED MODEL (used for the recommendation)
───────────────────────────────────────────────────────────
Plackett-Luce strengths fitted to the real SCMP place pool (top-2 probabilities reproduced to within 0.2pp), then simulated 400k times for top-3:

| # | Horse | Market top-3% | MC-Adj top-3% | Disagreement |
|---|-------|---------------|---------------|--------------|
| 1 | KA YING RISING | **96.3%** | 81.9% | MC understates the standout |
| 3 | PATCH OF STARS | **84.4%** | 65.5% | MC understates the 2nd string |
| 2 | COPARTNER PRANCE | 33.7% | 45.3% | — |
| 5 | LUCKY WITH YOU | 30.2% | 68.5% | **MC overstates a 9yo 262-shot by 38pp** |
| 6 | MAGIC CONTROL | 29.5% | 32.6% | — |
| 4 | TOMODACHI KOKOROE | 25.9% | 6.3% | — |

All 20 possible trios, market-anchored:

| Trio | Prob | Fair odds | | Trio | Prob | Fair odds |
|------|------|-----------|-|------|------|-----------|
| 1-2-3 | 23.27% | **$4** | | 2-3-5 | 0.66% | $152 |
| 1-3-5 | 20.48% | **$5** | | 2-3-6 | 0.63% | $159 |
| 1-3-6 | 19.94% | **$5** | | 3-5-6 | 0.56% | $177 |
| 1-3-4 | 17.38% | **$6** | | 2-3-4 | 0.53% | $189 |
| 1-2-5 | 2.96% | $34 | | 3-4-5 | 0.50% | $201 |
| 1-2-6 | 2.88% | $35 | | 3-4-6 | 0.47% | $214 |
| 1-5-6 | 2.57% | $39 | | 2-5-6 | 0.10% | $988 |
| 1-2-4 | 2.46% | $41 | | 2-4-6 | 0.08% | $1,258 |
| 1-4-5 | 2.21% | $45 | | 2-4-5 | 0.08% | $1,262 |
| 1-4-6 | 2.17% | $46 | | 4-5-6 | 0.07% | $1,375 |

───────────────────────────────────────────────────────────
VALUE CHECK — THE DECIDING ARGUMENT (Step 4e)
───────────────────────────────────────────────────────────
Step 4e states the Trio dividend is likely low when the top combination has a very short favourite for 1st. #1 is at the **1.0 display floor** — as short as HKJC prices go.

With only 6 runners the entire Trio universe is C(6,3) = **20 combinations**. The skill's Mode B pool of 6 *is the whole field*, and the 膽拖 that follows covers **all 10 combinations containing the banker**. That is where the argument becomes arithmetic rather than opinion:

> Betting every combination that can win means you always collect exactly one dividend, and the amount you collect is your own money back minus the pool takeout. **HKJC's Trio takeout is 25%.** A $100 outlay across all 10 banker combinations returns approximately **$75** in expectation. The loss is structural and model-independent.

| Ticket | Combos | Stake | Market coverage | MC-Adj coverage | Expected return | EV |
|---|---|---|---|---|---|---|
| 膽拖 1膽(#1) + 5腳 — *what Strategy A and Strategy B both produce* | 10 | $100 | 96.3% | 81.8% | ~$75 | **−25%** |
| 雙膽拖 2膽(#1,#5) + 4腳 — *what the ≥63% rule triggers* | 4 | $40 | 28.4% | 53.2% | ~$30 | **−25%** |

Escaping the takeout requires betting a **subset** where your probability genuinely exceeds the market's. That requires a trustworthy model, and this race does not have one: the MC is demonstrably broken here, and the market-anchored model is by construction unable to beat the market it was fitted to. Backing the four short combos (1-2-3, 1-3-5, 1-3-6, 1-3-4 — 81.0% combined) means paying $40 to chase dividends with fair odds of $4–6; after takeout those will very likely return less than the outlay.

There is also no dividend upside to hope for. The scenarios that inflate a Trio pool — a beaten favourite, or an unpredictable minor placing — are both absent: #1 is near-certain, and #3 at place 1.4 makes the second slot near-certain too. The pool will concentrate on 1-3-x and pay accordingly.

**MODE: D — PASS.** Skill rule 6: not every race is a Trio race; a typical meeting plays 2–3. Deploy the bankroll on R1 and R2, which have genuine field spread and real dividend potential.

───────────────────────────────────────────────────────────
IF YOU PLAY IT ANYWAY — the two tickets, for the record
───────────────────────────────────────────────────────────

**Strategy A** (Mode B pool = whole field; banker = 1st by Adj Win%)
POOL: #1, #5, #3, #2, #6, #4 (all six)
膽 (Banker): **#1 KA YING RISING** (Adj Place% 77.0%)
腳 (Legs): #2, #3, #4, #5, #6
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10** | TOTAL STAKE: **$100**
*(The ≥63% rule also triggers 雙膽拖 with #5 as co-banker — 4 combos, $40. Rejected above.)*

| Combo | Market prob | Fair | | Combo | Market prob | Fair |
|-------|-------------|------|-|-------|-------------|------|
| 1-2-3 | 23.27% | $4  | | 1-2-6 | 2.88% | $35 |
| 1-3-5 | 20.48% | $5  | | 1-5-6 | 2.57% | $39 |
| 1-3-6 | 19.94% | $5  | | 1-2-4 | 2.46% | $41 |
| 1-3-4 | 17.38% | $6  | | 1-4-5 | 2.21% | $45 |
| 1-2-5 | 2.96%  | $34 | | 1-4-6 | 2.17% | $46 |

HKJC BET SLIP: Race 3 → Trio → 膽拖 → 膽: 1 | 腳: 2, 3, 4, 5, 6 | $10/combo

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — include in every report
───────────────────────────────────────────────────────────
Banker: **#1 KA YING RISING** (MC Win% 34.1%, MC Place% 77.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #5 (67.0%), #3 (61.7%), #2 (42.1%), #6 (31.8%), #4 (20.3%) — **all five remaining runners qualify**
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **none** (no primary leg sits in the 20–30% band; #4 at 20.3% is the closest and its odds are 323)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **none** (no runner has MC Place% ≤ 20%, and #1 aside, no runner is shorter than 132)
Action: **no replacements, no additions**
Final legs: **#2, #3, #4, #5, #6**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10** | TOTAL STAKE: **$100**
MODELLED COVERAGE: 81.8% (MC-Adj) / 96.3% (market-anchored)

HKJC BET SLIP: Race 3 → Trio → 膽拖 → 膽: 1 | 腳: 2, 3, 4, 5, 6 | $10/combo

**A vs B comparison:** **Strategy A and Strategy B are byte-for-byte the same ticket this week.** With a 6-runner field, every rival clears the MC Place% > 20% bar, so B's leg filter excludes nobody; A's Mode B pool is the whole field, so its leg set is also everybody. The replacement rule finds no candidates because only the banker is priced under 10. Both therefore reduce to "cover all 10 trios containing #1" — which is precisely the ticket the value check rejects. The A/B comparison carries no information in a field this small; that is itself the finding.

CONFIDENCE: **N/A — PASS**

CAVEATS:
1. The MC output for this race is not trustworthy (see MODEL FAILURE). Two data defects remain unfixed: `winningMargin` duplicating `finishPosition`, and the strength model's failure to reflect class or absolute time. The rating-bound bug at `raceCard.ts:790` **was** fixed.
2. The market-anchored model is fitted to the SCMP place pool and cannot, by construction, identify value against that same pool. It is used here to size the structural argument, not to find an edge.
3. In a 6-runner field the place pool pays **top 2**, so SCMP place odds were converted to top-2 probabilities before fitting, and top-3 was derived by simulation rather than read off directly.
4. Season opener — 0 jockey profiles and 0 trainer profiles loaded, as in R1 and R2.
5. HKJC Trio takeout is taken as 25%. If the actual rate differs the percentages shift, but no plausible takeout makes buying an entire pool profitable.
6. #1's price is at the 1.0 display floor, so his true implied probability cannot be read precisely — 96.3% is a fitted lower bound and the real figure is likely higher, which strengthens the PASS rather than weakening it.
═══════════════════════════════════════════════════════════
