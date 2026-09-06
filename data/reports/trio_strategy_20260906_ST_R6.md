═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-06 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings (2 reserves declared)
MC SIMULATION: 10,000 iterations — **best-behaved run of the meeting** (see MODEL NOTE)
HISTORICAL SYNC: ✅ 218/219 fixtures scraped
SCMP DATA: ✅ Loaded — Star Form + TIR + Vet + trackwork for all 14 runners
ODDS SOURCE: HKJC early-morning pool (`fetch-odds.ts`, 20:07 HKT 05-Sep), full 14-horse coverage. SCMP cross-checked; **SCMP's win odds for #1 are corrupt** (see caveats).

RACE: R6 — Class 4 | 1200m | Turf | Good | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 32.4%) | POOL SIZE: 6
MODE: B — Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10 | UNIT BET: $10

## ►► RECOMMENDATION: **PLAY, but not the skill's ticket — banker #2, not #3** ◄◄

The skill's ticket covers 7.8% on market pricing. Switching the banker to #2 HAROLD WIN takes that to 21.4% for the same $100, without changing anything else about the method. Reasoning below.

───────────────────────────────────────────────────────────
MODEL NOTE — the class bias is much weaker here
───────────────────────────────────────────────────────────
Correlation between the MC composite rating and the official HKJC rating:

| Race | Pearson r | Field composition |
|---|---|---|
| R4 | +0.195 | mixed Class 4 / Class 5 |
| R5 | +0.249 | mostly Class 4 |
| **R6** | **+0.581** | **Class 4 / Class 3 mix, no Class-5-only runners bar one** |

This is the healthiest MC run of the meeting. The reason is visible in the field: only **#13 MAJESTIC DELIGHT** has predominantly Class 5 form (`C5×5`), and it is the one horse the model badly over-rates — MC place 29.9% against a market top-3 of **8.2%**, at 59 in the betting. Every other runner's form is Class 3 or Class 4, so the model's class handling has little to distort.

The finish-time projection remains inverted (it puts banker #3 MATZDEN 17.6 lengths back while ranking him 1st on win%) and was ignored, as in R3–R5.

───────────────────────────────────────────────────────────
THE BANKER PROBLEM — the one thing worth overriding
───────────────────────────────────────────────────────────
Even with a well-behaved model, MC and the market disagree sharply about *who fills the frame*:

| # | Horse | MC place% | **Market top-3%** | Gap | Win odds |
|---|-------|-----------|-------------------|-----|----------|
| 2 | HAROLD WIN | 49.0% | **58.6%** | +9.6 | **3.7 (fav)** |
| 7 | GROUPER | 29.7% | 41.0% | +11.3 | 6.5 |
| 12 | VICTORY CHAMPION | 14.3% | 35.7% | +21.4 | 7.0 |
| 4 | KA YING RESILIENCE | 40.1% | 26.5% | −13.6 | 7.8 |
| **3** | **MATZDEN (skill's banker)** | **63.3%** | **25.6%** | **−37.7** | 7.0 |
| 13 | MAJESTIC DELIGHT | 29.9% | 8.2% | −21.7 | 59 |

**#3 MATZDEN carries the largest single disagreement in the field.** The skill makes it 膽 because it leads on Adj Win%, but the market rates it only 5th-likeliest to make the frame. Its place price of 3.2 is a long way from #2 HAROLD WIN's **1.4**.

#2 HAROLD WIN is the race favourite at 3.7, has "minor cheques in 12 of 14 runs last term, including five placings", and ran second in a recent Sha Tin dirt trial. On both models it is a top-two frame chance — the only horse in the race about which MC and the market agree strongly.

**What that is worth, holding everything else constant:**

| Ticket | Structure | Combos | Stake | MC-Adj | **Market** |
|---|---|---|---|---|---|
| Strategy A (skill) | 膽 #3 + 腳 #1,#2,#4,#7,#13 | 10 | $100 | 41.1% | **7.8%** |
| Strategy B (skill) | 膽 #3 + 腳 #2,#4,#7,#12,#13 | 10 | $100 | 35.8% | **10.2%** |
| **Banker swap** | **膽 #2 + 腳 #1,#3,#4,#7,#12** | **10** | **$100** | 26.9% | **21.4%** |
| Banker swap, wider | 膽 #2 + 腳 #1,#3,#4,#5,#7,#12 | 15 | $150 | 28.6% | **29.0%** |

The banker swap costs 14pp of MC-Adj coverage and buys 14pp of market coverage — but the MC figure is inflated by the very horse (#3) the market disputes, while the market figure is a direct read on a real pool. Same price, same method, nearly triple the market-implied hit rate.

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| #  | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Off.Rtg | Age | Draw | Starts | Form (last 6) | Role (Strategy B) | Top Quinella (fair) |
|----|-------|---------|-----------|----------|------------|-------------|---------|-----|------|--------|---------------|-------------------|---------------------|
| 3  | MATZDEN            | 30.4% | 63.3% | 7.0 | ✅ | ✅ | 56 | 5 | 2  | 8  | 4/5/2/4/6/12   | ★ 膽 (Banker) | 2-3: 12.6% (7.9) |
| 2  | HAROLD WIN         | 18.7% | 49.0% | 3.7 | ✅ | ✅ | 56 | 6 | 4  | 10 | 3/2/4/10/4/5   | 腳 (Leg) | 3-4: 8.6% (11.6) |
| 4  | KA YING RESILIENCE | 13.6% | 40.1% | 7.8 | ✅ | ✅ | 54 | 5 | 7  | 10 | 6/1/4/6/6/4    | 腳 (Leg) | 3-7: 6.5% (15.3) |
| 13 | MAJESTIC DELIGHT   | 9.1%  | 29.9% | **59** | ✅ | ❌ | 42 | 5 | 14 | 10 | 11/1/4/5/4/6 | 腳 (Leg) ⚠ | 3-13: 6.5% (15.5) |
| 7  | GROUPER            | 8.4%  | 29.7% | 6.5 | ✅ | ✅ | 52 | 4 | 10 | 5  | 3/2/8/8/2      | 腳 (Leg) | 2-4: 5.8% (17.4) |
| 1  | SPICY STANDARD     | 6.7%  | 24.8% | 12  | ✅ | ❌ | **60** | 5 | 13 | 9 | 3/5/7/2/7/2  | — (replaced by #12) | — |
| 12 | VICTORY CHAMPION   | 3.1%  | 14.3% | 7.0 | ❌ | ✅ | 43 | 5 | 9  | 9  | 4/5/9/9/3/11   | 腳 (Leg — replacement) | — |
| 6  | BLAZING METEOR     | 2.2%  | 10.6% | 25  | ❌ | ❌ | 52 | 4 | 11 | **0 — DEBUTANT** | — | — | — |
| 14 | GLACIATED          | 2.1%  | 9.3%  | 32  | ❌ | ❌ | 41 | 5 | 3  | 10 | 9/10/7/12/3/11 | — | — |
| 9  | PRECISION MIND     | 1.8%  | 8.8%  | 43  | ❌ | ❌ | 46 | 4 | 6  | 3  | 9/12/6         | — | — |
| 5  | RISING FROM ASHES  | 1.7%  | 7.4%  | 12  | ❌ | ❌ | 54 | **9** | 1 | 10 | 8/8/5/11/12/9 | — | — |
| 8  | GOOD LUCK BABE     | 0.9%  | 5.8%  | 17  | ❌ | ❌ | 47 | 6 | 8  | 10 | 4/12/10/12/8/7 | — | — |
| 10 | DIAMOND SPARKLE    | 0.7%  | 3.6%  | 52  | ❌ | ❌ | 44 | 4 | 12 | 4  | 9/13/5/8       | — | — |
| 11 | LUCKY GIBS         | 0.6%  | 3.3%  | 36  | ❌ | ❌ | 44 | 4 | 5  | 4  | 11/12/13/10    | — | — |

**Market:** overround 22.5%, favourite bias −32.6%, longshot bias +36.1%. #2 HAROLD WIN is a clear favourite at 3.7 with a place price of 1.4; then a cluster at 6.5–7.8 (#7, #3, #12, #4).

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|------------|------|
| 1 | 3 | MATZDEN | 30.4% | 63.3% | excuses +2 | excuses +2 | **32.4%** | **65.3%** | 7.0 | Z Purton | 2 | +excuses (wide, no cover most of event) | ★ 膽 (Banker) |
| 2 | 2 | HAROLD WIN | 18.7% | 49.0% | +form +1, trial +2 | (same) | 21.7% | 52.0% | 3.7 | H Bowman | 4 | +form (cheques 12 of 14, 5 placings); +trial (2nd in ST dirt trial) | 腳 (Leg) |
| 3 | 4 | KA YING RESILIENCE | 13.6% | 40.1% | trial +2 | trial +2 | 15.6% | 42.1% | 7.8 | K Teetan | 7 | +trial (placed both trials after injury return) | 腳 (Leg) |
| 4 | 13 | MAJESTIC DELIGHT | 9.1% | 29.9% | +form +1, excuses +2, -notRO −2 | (same) | 10.1% | 30.9% | **59** | A Badel | 14 | +form (Valley 1200m win Jun); +excuses (crowded); −notRO (rider "conservative manner") | 腳 (Leg) ⚠ |
| 5 | 7 | GROUPER | 8.4% | 29.7% | +form +1 | +form +1 | 9.4% | 30.7% | 6.5 | E C W Wong (-3) | 10 | +form (speed-tracking 2nd, front-running 3rd) | 腳 (Leg) |
| 6 | 1 | SPICY STANDARD | 6.7% | 24.8% | 0 | 0 | 6.7% | 24.8% | 12 | A Atzeni | 13 | resuming; TIR self-inflicted (shifted out on jumping) | 腳 (Leg) |
| 7 | 12 | VICTORY CHAMPION | 3.1% | 14.3% | 0 | 0 | 3.1% | 14.3% | 7.0 | K C Leung | 9 | bled after March defeat (>30 days, no code) | out |
| 8 | 8 | GOOD LUCK BABE | 0.9% | 5.8% | excuses +2 | excuses +2 | 2.9% | 7.8% | 17 | Y L Chung (-2) | 8 | +excuses (bumped after start, hampered 250M) | out |
| 9 | 10 | DIAMOND SPARKLE | 0.7% | 3.6% | excuses +2 | excuses +2 | 2.7% | 5.6% | 52 | L Hewitson | 12 | +excuses (held up for clear running) | out |
| 10 | 6 | BLAZING METEOR | 2.2% | 10.6% | 0 | 0 | 2.2% | 10.6% | 25 | M F Poon | 11 | DEBUTANT; "distant third from five trials" — weak trial line, no +trial | out |
| 11 | 14 | GLACIATED | 2.1% | 9.3% | 0 | 0 | 2.1% | 9.3% | 32 | H Bentley | 3 | — | out |
| 12 | 9 | PRECISION MIND | 1.8% | 8.8% | 0 | 0 | 1.8% | 8.8% | 43 | M L Yeung | 6 | TIR self-inflicted (made contact) | out |
| 13 | 5 | RISING FROM ASHES | 1.7% | 7.4% | 0 | 0 | 1.7% | 7.4% | 12 | J Orman | 1 | 9yo, age cert passed 19/08; TIR self-inflicted | out |
| 14 | 11 | LUCKY GIBS | 0.6% | 3.3% | 0 | 0 | 0.6% | 3.3% | 36 | P N Wong (-7) | 5 | — | out |

**Factor legend:** `+form +1`, `+trial +2`, `excuses +2`, `-notRO −2`. No `-injury30d` anywhere in this race — #5's 19/08 entry is an **age certificate**, not an injury clearance, and #12's bleed was in March (>30 days). No caps hit.

**`-age` not applied to #5 RISING FROM ASHES (9yo)** — consistent with R4 and R5: "C3+" read as *Class 3 and better*, so a Class 4 handicap does not qualify (R3's Group 3 did). #5 is nowhere near the pool either way, so this is documentation only.

**TIR lines that were deliberately *not* credited as excuses:** #1, #5 and #9 all have stewards' notes describing the horse shifting out or making contact **of its own accord** ("shifted out on jumping and made contact", "jumped awkwardly, shifted in"). Those are the horse's errors, not bad luck, and the skill's `+excuses` flag is scoped to "crowded / steadied / wide trip". Crediting them would have been generous.

**#6 BLAZING METEOR is a debutant** (0 starts) — banker-ineligible under rule 17, and its trial line is explicitly weak ("just stayed on a **distant third** from five trials"), so it earned no `+trial` either. Contrast R5's #3 CAVA PIONEER, which won four of seven trials and did.

**#13 MAJESTIC DELIGHT ⚠** is the class artefact of this race: `C5×5` form, official rating 42 (13th of 14), drawn 14, at **59** in the market, yet MC places it 4th on Adj Place%. It appears on both skill tickets and is the second reason their market coverage is poor.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #3, #2, #4, #13, #7, #1 | MODE: B (Standard Pool) | POOL SIZE: 6
Must-include (Adj Place% ≥ 25%): #3 (65.3), #2 (52.0), #4 (42.1), #13 (30.9), #7 (30.7) — all five in ✅ (#1 at 24.8% takes the 6th slot). **No Mode-conflict this race**, unlike R4 and R5.

膽 (Banker): **#3 MATZDEN** (Adj Place% 65.3%) — 8 starts, eligible
腳 (Legs): #1, #2, #4, #7, #13
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10** | TOTAL STAKE: **$100**
雙膽拖 check: 2nd-ranked #2 Adj Place% 52.0% < 63% → single banker.
COVERAGE: MC-Adj **41.1%** | raw MC 45.6% | **Market 7.8%**
*(full C(6,3)=20 pool: 52.5% MC-Adj at $200 — the 膽拖 keeps 78% of coverage for half the cost)*

| Combo | MC-Adj | Fair | **Market** | Market fair |
|-------|--------|------|------------|-------------|
| 2-3-4  | 9.85% | $10 | 1.53% | $65    |
| 2-3-13 | 6.11% | $16 | 0.41% | $246   |
| 2-3-7  | 5.64% | $18 | 2.76% | $36    |
| 3-4-13 | 4.07% | $25 | 0.11% | $897   |
| 1-2-3  | 3.87% | $26 | 1.03% | $97    |
| 3-4-7  | 3.69% | $27 | 0.82% | $122   |
| 1-3-4  | 2.60% | $38 | 0.29% | $345   |
| 3-7-13 | 2.26% | $44 | 0.23% | $439   |
| 1-3-13 | 1.55% | $65 | 0.07% | $1,338 |
| 1-3-7  | 1.44% | $69 | 0.55% | $182   |

HKJC BET SLIP: Race 6 → Trio → 膽拖 → 膽: 3 | 腳: 1, 2, 4, 7, 13 | $10/combo

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#3 MATZDEN** (MC Win% 30.4%, MC Place% 63.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2 (49.0%), #4 (40.1%), #13 (29.9%), #7 (29.7%), #1 (24.8%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **#13 MAJESTIC DELIGHT** (29.9%, odds 59) and **#1 SPICY STANDARD** (24.8%, odds 12). #7 (29.7%) is in the band but priced 6.5.
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **#12 VICTORY CHAMPION** (7.0, MC Place% 14.3%)
Action: **#12 replaces #1** — the rule takes the **lowest MC Place%** among replaceable legs, and #1 (24.8%) is lower than #13 (29.9%).
Final legs: **#2, #4, #7, #12, #13**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10** | TOTAL STAKE: **$100**
COVERAGE: MC-Adj **35.8%** | raw MC 39.2% | **Market 10.2%**

| Combo | MC-Adj | Market | | Combo | MC-Adj | Market |
|-------|--------|--------|-|-------|--------|--------|
| 2-3-4  | 9.85% | 1.53% | | 3-7-13  | 2.26% | 0.23% |
| 2-3-13 | 6.11% | 0.41% | | 2-3-12  | 1.73% | 2.28% |
| 2-3-7  | 5.64% | 2.76% | | 3-4-12  | 1.15% | 0.67% |
| 3-4-13 | 4.07% | 0.11% | | 3-12-13 | 0.70% | 0.19% |
| 3-4-7  | 3.69% | 0.82% | | 3-7-12  | 0.65% | 1.23% |

HKJC BET SLIP: Race 6 → Trio → 膽拖 → 膽: 3 | 腳: 2, 4, 7, 12, 13 | $10/combo

**A vs B comparison — and a flaw the rule exposes.** B improves market coverage 7.8% → 10.2% by adding **#12 VICTORY CHAMPION** (market top-3 35.7%, the model's biggest underestimate at −21.4pp). Good.

But it removes the **wrong horse**. Both #1 SPICY STANDARD (24.8% MC place, odds 12) and #13 MAJESTIC DELIGHT (29.9%, odds **59**) qualify as replaceable, and the rule selects by *lowest MC Place%* — so it drops #1 and keeps #13. On market pricing that is backwards: #1 is an 18.6% frame chance with the **highest official rating in the race (60)**, John Size and Atzeni; #13 is an 8.2% chance at 59-1. **Ranking replaceable legs by MC Place% ignores the market signal the rule is otherwise built on.** Ranking by longest odds instead would drop #13 and produce 膽 #3 + 腳 #1,#2,#4,#7,#12 — **11.6% market** for the same $100.

───────────────────────────────────────────────────────────
RECOMMENDED TICKET — banker swap
───────────────────────────────────────────────────────────
膽 (Banker): **#2 HAROLD WIN** (market top-3 58.6%, MC place 49.0% — the only horse both models rate highly)
腳 (Legs): **#1, #3, #4, #7, #12**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10** | TOTAL STAKE: **$100**
COVERAGE: MC-Adj 26.9% | **Market 21.4%**

Wider version if you want more cover: 膽 #2 + 腳 #1, #3, #4, #5, #7, #12 → 15 combos, **$150**, market **29.0%**.

Note this keeps #3 MATZDEN in the ticket as a leg — the disagreement is about whether it deserves to be locked into *every* combination, not about whether it belongs in the race. It also drops #13, the class artefact.

PASS CONDITIONS:
- Banker scratched (#2 on the recommended ticket, #3 on the skill ticket) → **VOID**, do not restructure (rule 10).
- #7 or #4 scratched → re-run before betting.
- If #2 drifts beyond ~6 while #3 and #7 hold, the banker case weakens — revert to a wider 6-leg structure or pass.
- Going to Yielding/Heavy → re-run MC.

CONFIDENCE: **MEDIUM** on the banker-swap ticket; **LOW** on the skill's own ticket.

CAVEATS:
1. **The recommended ticket departs from the skill.** The skill mandates the Adj Win% leader as 膽; that is #3 MATZDEN. I am recommending #2 HAROLD WIN because #3 carries the field's largest model/market gap (−37.7pp) and #2 the strongest agreement. If you want the pipeline followed literally, take Strategy B ($100, 10.2% market) over Strategy A ($100, 7.8%).
2. **SCMP's win odds for #1 SPICY STANDARD are corrupt** — it lists "Win: 60-1" alongside "Rating: 60", while quoting a place price of 3.1 that implies roughly 12. HKJC's 12 was used. This looks like a rating/odds field collision in the SCMP parse, the same class of bug as the `raceCard.ts:790` rating issue fixed during R3. Worth checking if you rely on SCMP win odds elsewhere.
3. **#13 MAJESTIC DELIGHT is the class artefact** (MC 29.9% vs market 8.2%) and sits on both skill tickets. The recommended ticket excludes it.
4. **Strategy B's replacement rule ranks by MC Place%, not odds**, and here that drops the better horse (#1, rating 60) while keeping the 59-1 shot (#13). See the A vs B note.
5. Market coverage figures come from a Plackett-Luce fit to the HKJC place pool (14 runners → place pays top 3, so the place pool reads directly on top-3 probability). A market-fitted model cannot find value against that market; it is used to size disagreement, not to claim an edge.
6. **Thin form for two pool horses:** #7 GROUPER has 5 starts, #3 MATZDEN 8. #6 BLAZING METEOR (not in any ticket) has none.
7. Season opener — 0 jockey profiles and 0 trainer profiles loaded, as in R1–R5.
8. `winningMargin` still duplicates `finishPosition` in the historical data (found in R3, unfixed).
9. Two reserves declared (SPEEDY PATCH, RYUI KOKOROE). If either replaces a scratching, re-run.
═══════════════════════════════════════════════════════════
