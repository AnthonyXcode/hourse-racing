═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-06 | Race 10
═══════════════════════════════════════════════════════════

DATA VALIDATION: ⚠️ Passed, but one place-odds datapoint is almost certainly corrupt | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations — **worst reliability of the meeting (r = +0.124)**
HISTORICAL SYNC: ✅ 218/219 fixtures scraped
SCMP DATA: ✅ Loaded — Star Form + TIR + Vet + trackwork for all 13 runners. SCMP place odds corrupt again (5th race running).
ODDS SOURCE: HKJC pool re-fetched race morning (`fetch-odds.ts`, **02:32 HKT 06-Sep**), full 13-horse coverage.

RACE: R10 BATTERY HANDICAP — Class 3 | 1200m | Turf | Good | 13 runners | 5:55pm
CLASSIFICATION: **Wide open** — top Adj Win% 19.5%, no horse reaches 20%
MODE: **C / D** — skill text: *"Default to PASS"*

## ►► RECOMMENDATION: **PASS (Mode D)** ◄◄

Three independent reasons converge, which is unusual. Detail below.

───────────────────────────────────────────────────────────
1. WIDE OPEN — and this time the adjustments do not rescue it
───────────────────────────────────────────────────────────
| | Top horse Win% | Classification |
|---|---|---|
| Raw MC | #12 at **18.5%** | Wide open |
| Adjusted | #12 at **19.5%** | **Wide open** |

Unlike R7, where a single +2 tipped the race across the 20% line into "Competitive", here **both readings agree**: no horse reaches 20%, so the skill's Mode C/D applies and its stated default is PASS. This is the only clean Wide-open classification of the meeting.

Eight of thirteen runners sit inside the MC's diff < 8 band, with six horses between 10.2% and 18.5% win.

───────────────────────────────────────────────────────────
2. THE MODEL IS AT ITS LEAST RELIABLE ALL MEETING
───────────────────────────────────────────────────────────
| Race | Pearson r (MC composite vs official rating) | Field |
|---|---|---|
| R7 | +0.713 | uniform Class 2 |
| R9 | +0.631 | Class 3-dominated |
| R6 | +0.581 | Class 3/4 |
| R8 | +0.431 | mostly Class 4 |
| R5 | +0.249 | mostly Class 4 |
| R4 | +0.195 | Class 4/5 mixed |
| **R10** | **+0.124** | **Class 2 / 3 / 4 / Group 1 all mixed** |

This is the most class-heterogeneous field of the meeting and the correlation collapses accordingly. The class-drop bias documented in R3 and R4 is at full strength:

| # | Horse | **Official rtg** | MC composite | MC rank | Recent form class | Market top-3 | MC place% |
|---|-------|------------------|--------------|---------|-------------------|--------------|-----------|
| **1** | **PUBLIC ATTENTION** | **80 — highest** | **50** | **11th of 13** | **Class 2 ×4, G1 ×1** | **35.4%** | **6.1%** |
| 12 | MASTER PAYMENT | 63 — 12th of 13 | **62 — highest** | 1st | Class 4 ×3 | 40.7% | 46.8% |
| 10 | THE HEIR | 67 | 59 | 6th | Class 4 ×5 | 11.5% | 32.5% |

**#1 PUBLIC ATTENTION is R4's AMAZING DUCK all over again.** Highest official rating in the field (80), coming out of Class 2 where its last three runs were 4th (at 4), 3rd (at 5.4) and 3rd (at 9.8), now dropping to Class 3. The market makes it second favourite at 5.4 with a place price of 2.3. The MC rates it 11th of 13 and gives it a 1.1% chance of winning.

Meanwhile the model's top pick #12 MASTER PAYMENT has the field's **second-lowest official rating (63)** and three career starts, all in Class 4. The market does back it — 3.9 favourite, Purton, rating rising +8, carrying 12lb less — so #12 is not the problem. The problem is that the model's ordering *below* the favourite is being driven by the class of recent form rather than by ability.

The finish-time projection is inverted again (it ranks #13 SUGAR GOODSON, a 64-1 shot with two starts, second-fastest, and puts #1 last, 36.8 lengths back) and was ignored, as in R3–R9.

───────────────────────────────────────────────────────────
3. A CORRUPT PLACE-ODDS DATAPOINT
───────────────────────────────────────────────────────────
**#11 THOUSAND SPIRIT is quoted at 15 to win but 2.2 to place.** For comparison, #8 SUPER STRONG KID is 5.9 to win and also 2.2 to place. A 15-1 shot cannot share a place price with a 5.9 chance in a coherent pool.

That single figure makes #11 the joint-second most likely horse in the race to fill the frame (**37.0%** implied) against an MC place% of 4.8 — a +32.2pp gap, the largest single divergence of the meeting. Its form is `8/9/10/2/1/9` off an official rating of 64.

The place pool otherwise sums correctly (22.9% overround, consistent with the win pool), so this looks like one bad cell rather than a broken feed. Sensitivity test, re-setting #11's place price to 4.0 (consistent with its 15 win price):

| Ticket | Market coverage as quoted | With #11 corrected |
|---|---|---|
| Strategy A | 7.7% | 9.5% |
| Strategy B | 16.3% | 20.5% |

It moves the numbers materially, which means **the market-anchored cross-check itself is unreliable for this race.** I have no trustworthy way to arbitrate between a model that is at its weakest and a market read with a known bad value in it.

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Off.Rtg | Age | Draw | Starts | Days off | Form (last 6) | Role (Strategy B) | Top Quinella (fair) |
|---|-------|---------|-----------|----------|------------|-------------|---------|-----|------|--------|----------|---------------|-------------------|---------------------|
| 12 | MASTER PAYMENT   | 18.5% | 46.8% | **3.9** | ✅ | ✅ | 63 | 4 | 7  | **3** | 91  | 1/2/2         | ★ 膽 (Banker) | 6-12: 6.7% (14.8) |
| 6  | GOLD PATCH       | 15.4% | 41.7% | 8.8 | ✅ | ✅ | 74 | 4 | 5  | 6  | 56  | 7/3/1/1/3/1   | 腳 (Leg) | 8-12: 5.1% (19.7) |
| 8  | SUPER STRONG KID | 13.2% | 36.9% | 5.9 | ✅ | ✅ | 70 | 5 | 6  | 8  | 67  | 2/7/5/3/2/1   | 腳 (Leg) | 5-12: 5.0% (20.2) |
| 5  | JUBILANT WINNER  | 13.0% | 36.8% | 19  | ✅ | ❌ | 75 | 6 | 11 | 10 | 60  | 9/5/10/1/4/1  | 腳 (Leg) | 5-6: 4.4% (22.5) |
| 10 | THE HEIR         | 10.2% | 32.5% | 31  | ✅ | ❌ | 67 | 7 | 13 | 10 | 74  | 3/1/1/5/3/2   | 腳 (Leg) | 6-8: 4.4% (22.9) |
| 2  | JUMBO TREASURE   | 10.3% | 31.8% | 10  | ✅ | ❌ | 77 | 6 | 12 | 10 | 74  | 1/8/3/4/12/1  | 腳 (Leg) | — |
| 7  | LUCY IN THE SKY  | 7.4%  | 25.0% | 15  | ✅ | ❌ | 71 | 6 | 1  | 10 | **153** | 8/7/9/9/2/8 | 腳 (Leg) | — |
| 4  | GUSTOSISIMO      | 7.4%  | 24.8% | 13  | ✅ | ❌ | 75 | 6 | 2  | 10 | 71  | 10/4/3/9/10/4 | — (replaced by #1) | — |
| 9  | CALA DEI MORI    | 1.2%  | 5.0%  | 23  | ❌ | ❌ | 67 | 3 | 3  | 2  | 67  | 11/13         | — | — |
| 1  | PUBLIC ATTENTION | 1.1%  | 6.1%  | **5.4** | ❌ | ✅ | **80** | 5 | 8 | 8 | 67 | 4/3/3/12/10/4 | 腳 (Leg — replacement) | — |
| 11 | THOUSAND SPIRIT  | 0.9%  | 4.8%  | 15  | ❌ | ❌ | 64 | 5 | 9  | 10 | 71  | 8/9/10/2/1/9  | — | — |
| 13 | SUGAR GOODSON    | 0.9%  | 4.6%  | 64  | ❌ | ❌ | 62 | 3 | 4  | 2  | 64  | 10/8          | — | — |
| 3  | AKASHVANI        | 0.6%  | 3.4%  | 20  | ❌ | ❌ | 75 | 5 | 10 | 10 | 85  | 13/8/10/7/6/11| — | — |

**Market:** overround 22.9%, favourite bias −28.0%, longshot bias +32.6%. Market frame order: #12 40.7%, #8 37.0%, **#11 37.0% (suspect)**, #1 35.4%, #6 25.4%, #7 24.7%.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|------------|------|
| 1 | 12 | MASTER PAYMENT | 18.5% | 46.8% | +form +1 | +form +1 | **19.5%** | **47.8%** | 3.9 | Z Purton | 7 | +form (made all, stepped up to 1200m); resuming, 12lb less | ★ 膽 (Banker) |
| 2 | 6 | GOLD PATCH | 15.4% | 41.7% | +form +1, trial +2 | (same) | 18.4% | 44.7% | 8.8 | C Y Ho | 5 | +form (reclaimed lead 250m, 3rd win); **+trial (easily won dirt trial)** | 腳 (Leg) |
| 3 | 8 | SUPER STRONG KID | 13.2% | 36.9% | +form +1, excuses +2, trial +2 | (same) | 18.2% | 41.9% | 5.9 | A Atzeni | 6 | +form (won first up, placed all three 1200m); +excuses (held up 400–200M); **+trial (beat smart rivals at Conghua)** | 腳 (Leg) |
| 4 | 5 | JUBILANT WINNER | 13.0% | 36.8% | excuses +2 | excuses +2 | 15.0% | 38.8% | 19 | P N Wong (-7) | 11 | +excuses (crowded after start) | 腳 (Leg) |
| 5 | 10 | THE HEIR | 10.2% | 32.5% | +form +1, excuses +2 | (same) | 13.2% | 35.5% | 31 | H Bentley | 13 | +form (three-win campaign); +excuses (raced tight late) | 腳 (Leg) |
| 6 | 2 | JUMBO TREASURE | 10.3% | 31.8% | +form +1 | +form +1 | 11.3% | 32.8% | 10 | K C Leung | 12 | +form (two wins, wire-to-wire ST 1200m) | 腳 (Leg) |
| 7 | 4 | GUSTOSISIMO | 7.4% | 24.8% | excuses +2 | excuses +2 | 9.4% | 26.8% | 13 | H Bowman | 2 | +excuses (held up for clear running) | 腳 (Leg) |
| 8 | 7 | LUCY IN THE SKY | 7.4% | 25.0% | excuses +2, -injury30d −3 | excuses +2, -injury30d −4 | 6.4% | 23.0% | 15 | A Badel | 1 | +excuses (held up 400M); **−injury30d (blood in trachea, passed 14/08 — 23 days)**; 153 days off | out |
| 9 | 9 | CALA DEI MORI | 1.2% | 5.0% | excuses +2, trial +2 | (same) | 5.2% | 9.0% | 23 | E C W Wong (-3) | 3 | +excuses (unable to improve between runners); +trial (made all in two lead-up trials) | out |
| 10 | 1 | PUBLIC ATTENTION | 1.1% | 6.1% | +form +1, excuses +2 | (same) | 4.1% | 9.1% | 5.4 | K Teetan | 8 | +form (back-to-back ST 1200m thirds); +excuses (no clear run near 200M) | **out — see section 2** |
| 11 | 13 | SUGAR GOODSON | 0.9% | 4.6% | excuses +2 | excuses +2 | 2.9% | 6.6% | 64 | Y L Chung (-2) | 4 | +excuses (bumped, held up on Home Turn) | out |
| 12 | 3 | AKASHVANI | 0.6% | 3.4% | 0 | 0 | 0.6% | 3.4% | 20 | B Avdulla | 10 | TIR self-inflicted (shifted in, unbalanced) | out |
| 13 | 11 | THOUSAND SPIRIT | 0.9% | 4.8% | -notRO −2 | -notRO −2 | 0.0% | 3.8% | 15 | L Hewitson | 9 | **−notRO** (rider "asked to ride the horse in a conservative manner") | out |

**Factor legend:** `+form +1`, `+trial +2`, `excuses +2`, `-notRO −2`, `-injury30d −3 Win / −4 Place`. Negatives floored at 0.0%. No caps hit — #8's +5 total is the largest positive of the meeting and remains inside the ±8 cap.

**Only one vet penalty applies.** #7 LUCY IN THE SKY scoped with a "substantial amount of blood in the horse's trachea", cleared **14/08 — 23 days out**, the same EIPH profile that penalised R2's favourite and R5's #7. Combined with 153 days off, it drops out of the pool.

**`-notRO` for #11 THOUSAND SPIRIT** — "asked to ride the horse in a conservative manner", identical wording to R6's #13 MAJESTIC DELIGHT and treated the same way. Note the irony: the horse the adjustments rank **last** is the one the (suspect) place pool rates joint-second.

**`-perf` not applied to #4 GUSTOSISIMO.** Its stewards' entry records the *rider stating* the horse "did not respond to his riding in the Home Straight" — a rider explanation, not a stewards' finding of unacceptable performance. Only `+excuses +2` applied. Contrast R7's #7 and R9's #11, where the vet report itself recorded an unacceptable-performance order.

**`-age` not applicable** — no runner is 8yo or above (oldest is #10, 7).

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #12, #6, #8, #5, #10, #2, #4 | MODE: **C (Wide Pool, 7)** | POOL SIZE: 7
Must-include (Adj Place% ≥ 25%): #12 (47.8), #6 (44.7), #8 (41.9), #5 (38.8), #10 (35.5), #2 (32.8), #4 (26.8) — **exactly seven, exactly the pool** ✅. Mode C's 7-slot pool accommodates them precisely; no conflict (unlike R4 and R5).

膽 (Banker): **#12 MASTER PAYMENT** (Adj Place% 47.8%) — 3 starts, eligible
腳 (Legs): #2, #4, #5, #6, #8, #10
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = **15** | TOTAL STAKE: **$150**
雙膽拖 check: 2nd-ranked #6 Adj Place% 44.7% < 63% → single banker.
COVERAGE: MC-Adj **28.9%** | **Market 7.7%** — **5.1 market-% per $100, the worst efficiency of the meeting.**

| Combo | MC-Adj | Fair | **Market** | Market fair |
|-------|--------|------|------------|-------------|
| 6-8-12  | 3.50% | $29  | 1.38% | $73  |
| 5-8-12  | 2.75% | $36  | 0.61% | $163 |
| 5-6-12  | 2.72% | $37  | 0.38% | $261 |
| 6-10-12 | 2.39% | $42  | 0.35% | $285 |
| 8-10-12 | 2.30% | $43  | 0.58% | $173 |
| 2-6-12  | 1.99% | $50  | 0.71% | $140 |
| 2-8-12  | 1.98% | $51  | 1.14% | $87  |
| 5-10-12 | 1.85% | $54  | 0.15% | $669 |
| 4-6-12  | 1.62% | $62  | 0.41% | $246 |
| 4-8-12  | 1.62% | $62  | 0.66% | $152 |
| 2-5-12  | 1.58% | $63  | 0.32% | $317 |
| 2-10-12 | 1.35% | $74  | 0.29% | $350 |
| 4-5-12  | 1.27% | $79  | 0.18% | $545 |
| 4-10-12 | 1.08% | $92  | 0.16% | $623 |
| 2-4-12  | 0.90% | $111 | 0.33% | $303 |

HKJC BET SLIP (if played): Race 10 → Trio → 膽拖 → 膽: 12 | 腳: 2, 4, 5, 6, 8, 10 | $10/combo

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#12 MASTER PAYMENT** (MC Win% 18.5%, MC Place% 46.8%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (41.7%), #8 (36.9%), #5 (36.8%), #10 (32.5%), #2 (31.8%), #7 (25.0%), #4 (24.8%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **#7** (25.0%, odds 15) and **#4** (24.8%, odds 13)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **#1 PUBLIC ATTENTION** (5.4, MC Place% 6.1%)
Action: **#1 replaces #4** — the rule takes the lowest MC Place% among replaceable legs, and #4 (24.8%) is marginally below #7 (25.0%).
Final legs: **#1, #2, #5, #6, #7, #8, #10**
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = **21** | TOTAL STAKE: **$210**
COVERAGE: MC-Adj **29.7%** | **Market 16.3%** (20.5% if #11's place price is corrected)

HKJC BET SLIP (if played): Race 10 → Trio → 膽拖 → 膽: 12 | 腳: 1, 2, 5, 6, 7, 8, 10 | $10/combo

**A vs B comparison:** B more than doubles market coverage (7.7% → 16.3%) for $60 more, almost entirely because the Win-odds rule drags in **#1 PUBLIC ATTENTION** — the horse section 2 identifies as the model's biggest error, and the market's 35.4% frame chance. This is the rule doing exactly what it exists for: importing market information the MC cannot see. It is the fourth time this meeting the Win-odds branch has improved on Strategy A (R5, R7, R8, R10) against two where it hurt (R2, R6).

But note what B still cannot fix: it keeps #5 (market 12.7%) and #10 (market 11.5%), both heavily over-rated by the class bias, and the banker is unchanged. **A better ticket does not exist here** — the best alternative found was a #8-bankered line at 13.0% market for $150, still below B.

───────────────────────────────────────────────────────────
WHY PASS
───────────────────────────────────────────────────────────
1. **The skill's own default.** Both raw and adjusted classifications put this in Wide open, where the skill says "Default to PASS ... unless strong pace/form conviction". No such conviction is available.
2. **The model is at its least reliable all meeting** (r = +0.124) on the most class-mixed field of the card, and it buries the market's second favourite — a rating-80 Class 2 horse dropping in grade — at 1.1% to win.
3. **The market cross-check is compromised** by #11's place price, which shifts coverage by 2–4pp depending on how it is treated.
4. **Nothing on offer scores well.** Strategy A returns 5.1 market-% per $100 — the worst of the nine races analysed. For comparison, R9's recommended ticket returned 26.8.
5. **Bankroll discipline.** Skill rule 6 caps a meeting at 2–3 Trio races. R5, R6, R8 and R9 already carry recommendations; this would be a fifth, on the weakest race of the card.

If you play regardless, **take Strategy B ($210, 16.3% market)** — not Strategy A, which is worse on every measure at $60 less.

PASS CONDITIONS (if played):
- **#12 MASTER PAYMENT scratched → VOID** (rule 10).
- Re-check **#11 THOUSAND SPIRIT's place price** near the jump. If it settles near 4.0, the pool was mis-quoted and the market read above firms up. If it holds at 2.2 with the win price at 15, money is coming for it and it belongs in the pool — neither ticket includes it.
- If #1 PUBLIC ATTENTION shortens below 5, the market is confirming the class drop and Strategy B (which includes it) strengthens.
- Going to Yielding/Heavy → re-run MC.

CONFIDENCE: **LOW**

CAVEATS:
1. Model reliability r = +0.124, worst of the meeting; class-drop bias at full strength on a Class 2/3/4/G1 mixed field. Root cause unfixed and outside this request's scope (the `raceCard.ts:790` rating-bound bug fixed during R3 is a separate, resolved issue).
2. **#11 THOUSAND SPIRIT: win 15 / place 2.2.** Almost certainly a bad cell — #8 at 5.9 win shares the same 2.2 place price. Sensitivity shown in section 3.
3. **SCMP place odds corrupt for the fifth race running** (R6 rating/odds collision; R7, R8, R9, R10 place duplicating win). Unusable for this meeting; HKJC used throughout.
4. **Three lightly-raced runners in or near the pool:** banker #12 has **3 starts**, #9 and #13 have 2 each. #12's three starts are all Class 4 while this is Class 3.
5. #7 LUCY IN THE SKY: EIPH clearance 23 days out plus 153 days off — penalised and excluded from Strategy A, but Strategy B keeps it as a primary leg (the MC-only branch ignores SCMP by design).
6. Season opener — 0 jockey profiles and 0 trainer profiles loaded, as in R1–R9. Every runner first-up (56–153 days).
7. `winningMargin` still duplicates `finishPosition` in the historical data (found in R3, unfixed).
8. Market coverage from a Plackett-Luce fit to the HKJC place pool (13 runners → place pays top 3). A market-fitted model reproduces the market and cannot claim value against it; used to size disagreement only — and here it carries a known bad input.
═══════════════════════════════════════════════════════════
