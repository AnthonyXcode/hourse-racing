═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-06 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings (1 reserve declared)
MC SIMULATION: 10,000 iterations — usable here, with one known bias (see MODEL NOTE)
HISTORICAL SYNC: ✅ 218/219 fixtures scraped
SCMP DATA: ✅ Loaded — Star Form + TIR + Vet + trackwork for all 14 runners
ODDS SOURCE: HKJC early-morning pool (`fetch-odds.ts`, 20:07 HKT 05-Sep), full 14-horse coverage. SCMP cross-checked — **the two place pools disagree sharply on #8, #11 and #3**, see caveats.

RACE: R5 EDINBURGH HANDICAP — Class 4 | 1200m | Turf | Good | 14 runners
CLASSIFICATION: **Dominant by 0.9pp** (top Adj Win% 35.9%) — but see CLASSIFICATION NOTE
MODE: **B — Standard Pool (6)** (Mode A is infeasible; must-include rule forces 6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10 | UNIT BET: $10

## ►► RECOMMENDATION: **PLAY — Strategy B ($150)**, confidence MEDIUM-LOW ◄◄

This is the first race since R2 where the model is usable. Unlike R3 and R4, MC and the market agree on who the leading two horses are.

───────────────────────────────────────────────────────────
MODEL NOTE — the class bias is present but not disqualifying
───────────────────────────────────────────────────────────
The R4 defect (MC composite rating essentially uncorrelated with official rating; Class-5 form rated up, class drop-downs rated down) is still measurable here: **Pearson r = +0.249** against official ratings, versus +0.195 in R4.

The difference is that R5 is a near-homogeneous field — 11 of 14 runners have Class 4 form only — so the bias has little to bite on, and crucially **MC and the market pick the same top two**:

| | MC place% | Market top-3% (HKJC) |
|---|---|---|
| #7 LIGHT YEARS GLORY | 47.8% | **41.0%** |
| #1 ISLAND BUDDY | **67.5%** | 37.3% |

Compare R4, where MC's banker was the market's 11th-likeliest top-3 finisher. Here the banker is the market's 2nd. That is the difference between an unusable model and a biased one.

**Where the bias does bite: #11 PODIUM.** MC place 32.8% (3rd-best in the field); market 10.4% (12th). #11's recent form is `C5×4` including two Class 5 wins — precisely the profile the model over-rewards. It is an **8-year-old**, official rating 44, and SCMP notes it is **"zero-from-13 at Sha Tin"**. The MC's "#11 undervalued by 309%" flag should be read as the class artefact, not an edge. #11 is the single weakest horse on the Strategy A ticket and the main reason Strategy A's market coverage is only 6.9%.

The finish-time projection is inverted again (it puts banker #1 ISLAND BUDDY 20.7 lengths last while ranking him 1st on win%) and was ignored, as in R3 and R4.

───────────────────────────────────────────────────────────
CLASSIFICATION NOTE — the Dominant call is knife-edge
───────────────────────────────────────────────────────────
Raw MC Win% for #1 is **34.9%** → Competitive. A single `+form +1` SCMP adjustment lifts it to **35.9%** → Dominant, which calls for Mode A (5-horse pool). The classification therefore turns entirely on one +1 adjustment.

**Mode A is infeasible regardless.** Six horses clear the must-include bar of Adj Place% ≥ 25%: #1 (68.5), #7 (41.8), #4 (35.2), #11 (34.8), #5 (26.1), **#13 (25.8)**. Mode A permits five. The skill states must-include as a MUST, so the pool is 6 — which is Mode B's size, and is also what the raw (unadjusted) classification would have given.

This is the second structural conflict found this meeting; R4's report flagged rule 9 (odds ≤ 15) against Mode A's 5-horse cap. Both point the same way: **Mode A's fixed 5-horse pool cannot coexist with the skill's own inclusion rules in a competitive handicap.**

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| #  | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Off.Rtg | Age | Draw | Starts | Form (last 6) | Role (Strategy B) | Top Quinella (fair) |
|----|-------|---------|-----------|----------|------------|-------------|---------|-----|------|--------|---------------|-------------------|---------------------|
| 1  | ISLAND BUDDY      | 34.9% | 67.5% | 7.0 | ✅ | ✅ | 59 | 6 | 1  | 10 | 3/3/3/9/2/4     | ★ 膽 (Banker) | 1-7: 13.7% (7.3) |
| 7  | LIGHT YEARS GLORY | 18.1% | 47.8% | 5.8 | ✅ | ✅ | 50 | 4 | 7  | 10 | 9/6/3/3/4/7     | 腳 (Leg) | 1-11: 8.0% (12.5) |
| 11 | PODIUM            | 9.7%  | 32.8% | 42  | ✅ | ❌ | 44 | 8 | 9  | 10 | 2/4/1/1/7/6     | 腳 (Leg) ⚠ | 1-4: 7.6% (13.2) |
| 4  | STUNNING BUNDLE   | 8.9%  | 32.2% | 6.9 | ✅ | ✅ | 52 | 4 | 4  | **1** | 3            | 腳 (Leg) | 1-5: 5.8% (17.2) |
| 13 | SUPER LOVE        | 6.9%  | 24.8% | 23  | ✅ | ❌ | 47 | 6 | 11 | 10 | 4/8/11/4/11/14  | — (replaced by #3) | 1-13: 5.6% (17.8) |
| 5  | VIRTUS GLORY      | 6.3%  | 24.1% | 7.3 | ✅ | ✅ | 52 | 4 | 13 | **3** | 2/4/9         | 腳 (Leg) | — |
| 8  | NEXT FORTUNE      | 5.5%  | 20.9% | 9.1 | ✅ | ✅ | 48 | 4 | 2  | 5  | 5/2/10/9/8      | 腳 (Leg) | — |
| 14 | JOLLY COMPANION   | 4.0%  | 17.4% | 10  | ❌ | ❌ | 40 | 7 | 3  | 10 | 9/6/5/6/6/5     | — | — |
| 3  | CAVA PIONEER      | 2.6%  | 11.5% | 7.8 | ❌ | ✅ | 52 | 4 | 10 | **0 — DEBUTANT** | — | 腳 (Leg — replacement) | — |
| 12 | MONTA FRUTTA      | 1.2%  | 7.5%  | 12  | ❌ | ❌ | 42 | 7 | 8  | 10 | 8/13/9/10/2/7   | — | — |
| 10 | RIDING HIGH       | 0.7%  | 4.4%  | 15  | ❌ | ❌ | 45 | 6 | 12 | 10 | 2/12/2/2/4/3    | — | — |
| 2  | KANSAS            | 0.5%  | 3.2%  | 54  | ❌ | ❌ | 56 | 3 | 5  | 7  | 11/11/10/12/12/11| — | — |
| 6  | SYNERGY IN ACTION | 0.5%  | 3.1%  | 23  | ❌ | ❌ | 51 | 4 | 6  | **1** | 12           | — | — |
| 9  | LEGEND STAR       | 0.3%  | 2.6%  | 50  | ❌ | ❌ | 46 | 5 | 14 | 10 | 12/6/7/1/14/1   | — | — |

**Market:** overround 22.6%, favourite bias +0.0%, longshot bias +26.7%. A genuinely open Class 4 — **six runners are priced between 5.8 and 9.1** (#7, #4, #1, #5, #3, #8). No horse is shorter than 5.8.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|------------|------|
| 1 | 1 | ISLAND BUDDY | 34.9% | 67.5% | +form +1 | +form +1 | **35.9%** | **68.5%** | 7.0 | K Teetan | 1 | +form (b2b ST 1200m wins, frame 5 of 6) | ★ 膽 (Banker) |
| 2 | 7 | LIGHT YEARS GLORY | 18.1% | 47.8% | -notRO −2, -injury30d −3 | -notRO −2, -injury30d −4 | 13.1% | 41.8% | 5.8 | L Ferraris | 7 | −notRO (racing tight); −injury30d (blood in trachea 15/07, passed **20/08 — 17 days**) | 腳 (Leg) |
| 3 | 4 | STUNNING BUNDLE | 8.9% | 32.2% | +form +1, excuses +2 | (same) | 11.9% | 35.2% | 6.9 | H Bowman | 4 | +form (3rd on debut, box seat); +excuses (held up 350M) | 腳 (Leg) |
| 4 | 11 | PODIUM | 9.7% | 32.8% | excuses +2 | excuses +2 | 11.7% | 34.8% | **42** | A Atzeni | 9 | +excuses (shifted out at start, bumped); 8yo; 0-from-13 at Sha Tin | 腳 (Leg) ⚠ |
| 5 | 8 | NEXT FORTUNE | 5.5% | 20.9% | +form +1, excuses +2 | (same) | 8.5% | 23.9% | 9.1 | C Y Ho | 2 | +form (box-seat 2nd); +excuses (wide, no cover) | out |
| 6 | 5 | VIRTUS GLORY | 6.3% | 24.1% | excuses +2 | excuses +2 | 8.3% | 26.1% | 7.3 | H Y Yuen (-10) | 13 | +excuses (torrid trip, held up 400–250M) | 腳 (Leg) |
| 7 | 13 | SUPER LOVE | 6.9% | 24.8% | +form +1 | +form +1 | 7.9% | 25.8% | 23 | A Badel | 11 | +form (rallying 2nd, one-out one-back win) | 腳 (Leg) |
| 8 | 14 | JOLLY COMPANION | 4.0% | 17.4% | excuses +2 | excuses +2 | 6.0% | 19.4% | 10 | P N Wong (-7) | 3 | +excuses (wide barrier, hampered 100M); 0-from-5 C&D | out |
| 9 | 3 | CAVA PIONEER | 2.6% | 11.5% | trial +2 | trial +2 | 4.6% | 13.5% | 7.8 | M F Poon | 10 | **+trial (won 4 of 7 lead-up trials)**; DEBUTANT | out |
| 10 | 10 | RIDING HIGH | 0.7% | 4.4% | +form +1, excuses +2 | (same) | 3.7% | 7.4% | 15 | L Hewitson | 12 | +form (wire-to-wire ST 1200m win); +excuses (contact, held up) | out |
| 11 | 9 | LEGEND STAR | 0.3% | 2.6% | +form +1, excuses +2 | (same) | 3.3% | 5.6% | 50 | Y L Chung (-2) | 14 | +form (rallied to win); +excuses (checked 150M) | out |
| 12 | 12 | MONTA FRUTTA | 1.2% | 7.5% | excuses +2 | excuses +2 | 3.2% | 9.5% | 12 | Z Purton | 8 | +excuses (slow away, held up, steadied 450M) | out |
| 13 | 2 | KANSAS | 0.5% | 3.2% | excuses +2 | excuses +2 | 2.5% | 5.2% | 54 | H Bentley | 5 | +excuses (shifted out when steadied) | out |
| 14 | 6 | SYNERGY IN ACTION | 0.5% | 3.1% | 0 | 0 | 0.5% | 3.1% | 23 | K C Leung | 6 | — | out |

**Factor legend:** `+form +1`, `+trial +2`, `excuses +2`, `-notRO −2`, `-injury30d −3 Win / −4 Place`. All inside the ±8% Win / ±10% Place cap; no cap was hit.

**`-age` not applied to #11 PODIUM (8yo).** Consistent with R4: the skill scopes the age penalty to "C3+ races", read as *Class 3 and better*, so a Class 4 handicap does not qualify (R3's Group 3 did). Under the alternative reading #11 loses 2% Win and drops to rank 6, which would push it out of the pool in favour of #8 NEXT FORTUNE — a change the market would endorse. Flagged because the wording is ambiguous and it is decision-relevant here.

**#7 LIGHT YEARS GLORY carries the heaviest penalty in the race** (−5 Win / −6 Place): the same EIPH profile that penalised R2's #1 — "substantial blood in trachea" on 15/07, cleared **20/08, 17 days out** — plus a TIR line that he "could not be fully ridden out". He is still the market's shortest price at 5.8, so rule 9 keeps him in the pool, correctly.

**#3 CAVA PIONEER is a debutant** (0 starts) and is therefore **banker-ineligible** under rule 17 regardless of ranking. It is not near the banker slot on MC numbers, but the market rates it 5th-shortest at 7.8 on the strength of four wins from seven trials — a profile the MC cannot see at all. R1's report cited the 8-Mar MAPOGO precedent: strong trial form is not race form. It enters as a leg in Strategy B only.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #1, #7, #4, #11, #5, #13 | MODE: B (forced — see classification note) | POOL SIZE: 6
Must-include (Adj Place% ≥ 25%): #1, #7, #4, #11, #5, #13 — all six ✅

膽 (Banker): **#1 ISLAND BUDDY** (Adj Place% 68.5%) — 10 starts, eligible
腳 (Legs): #4, #5, #7, #11, #13
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10** | TOTAL STAKE: **$100**
雙膽拖 check: 2nd-ranked #7 Adj Place% 41.8% < 63% → single banker.
COVERAGE: MC-Adj **24.5%** | raw MC 42.7% | **Market 6.9%**
*(full C(6,3)=20 pool would be 29.8% MC-Adj at $200 — the 膽拖 keeps 82% of the coverage for half the cost)*

| Combo | MC-Adj | Fair | **Market** | Market fair |
|-------|--------|------|------------|-------------|
| 1-4-7  | 3.58% | $28 | 1.52% | $66  |
| 1-7-11 | 3.45% | $29 | 0.55% | $182 |
| 1-4-11 | 3.15% | $32 | 0.29% | $340 |
| 1-5-7  | 2.34% | $43 | 1.68% | $59  |
| 1-7-13 | 2.30% | $43 | 0.69% | $145 |
| 1-4-5  | 2.19% | $46 | 0.92% | $109 |
| 1-5-11 | 2.10% | $48 | 0.31% | $319 |
| 1-4-13 | 2.06% | $49 | 0.36% | $278 |
| 1-11-13| 1.99% | $50 | 0.13% | $760 |
| 1-5-13 | 1.37% | $73 | 0.41% | $242 |

HKJC BET SLIP: Race 5 → Trio → 膽拖 → 膽: 1 | 腳: 4, 5, 7, 11, 13 | $10/combo

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — ►► the recommended ticket ◄◄
───────────────────────────────────────────────────────────
Banker: **#1 ISLAND BUDDY** (MC Win% 34.9%, MC Place% 67.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #7 (47.8%), #11 (32.8%), #4 (32.2%), #13 (24.8%), #5 (24.1%), #8 (20.9%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **#13 SUPER LOVE** (24.8%, odds 23). #5 (24.1%, odds 7.3) and #8 (20.9%, odds 9.1) are in the band but not above 10.
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **#3 CAVA PIONEER** (7.8, MC Place% 11.5%). #14 at exactly 10 does not qualify.
Action: **#3 replaces #13** — #13 was the only replaceable leg.
Final legs: **#3, #4, #5, #7, #8, #11**
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = **15** | TOTAL STAKE: **$150**
COVERAGE: MC-Adj **30.3%** | raw MC 45.2% | **Market 13.4%**

| Combo | MC-Adj | Market | | Combo | MC-Adj | Market |
|-------|--------|--------|-|-------|--------|--------|
| 1-4-7  | 3.58% | 1.52% | | 1-5-11 | 2.10% | 0.31% |
| 1-7-11 | 3.45% | 0.55% | | 1-5-8  | 1.51% | 0.93% |
| 1-4-11 | 3.15% | 0.29% | | 1-3-7  | 1.30% | 1.53% |
| 1-7-8  | 2.46% | 1.58% | | 1-3-4  | 1.15% | 0.85% |
| 1-5-7  | 2.34% | 1.68% | | 1-3-11 | 1.15% | 0.29% |
| 1-4-5  | 2.19% | 0.92% | | 1-3-5  | 0.79% | 0.94% |
| 1-8-11 | 2.18% | 0.29% | | 1-3-8  | 0.78% | 0.86% |
| 1-4-8  | 2.17% | 0.89% | |        |       |       |

HKJC BET SLIP: Race 5 → Trio → 膽拖 → 膽: 1 | 腳: 3, 4, 5, 7, 8, 11 | $10/combo

**A vs B comparison — and why B wins.** Same banker. B's two rule-driven changes both go the right way: it drops **#13 SUPER LOVE** (market top-3 13.2%, form 4/8/11/4/11/14) and picks up **#3 CAVA PIONEER** (market 26.5%) and **#8 NEXT FORTUNE** (market 27.4%). That nearly doubles market coverage — **6.9% → 13.4%** — for $50 more. This is the mirror image of R2, where the same replacement rule destroyed coverage; here the market signal it keys off is genuinely informative, because it is picking up the two horses the MC structurally cannot rate (a debutant with no form rows, and a lightly-raced 5-start colt).

Both tickets still carry **#11 PODIUM**, which B cannot remove (32.8% MC place keeps it a primary leg and nothing replaces it). If you want the cleanest version, dropping #11 and #13 for #8 and #3 gives **膽 1 + 腳 3, 4, 5, 7, 8** — 10 combos, $100, MC-Adj 18.3%, **market 11.7%**. That is a defensible $100 alternative to Strategy A's $100 at 6.9%.

PASS CONDITIONS:
- **#1 ISLAND BUDDY scratched → VOID** (rule 10; do not restructure).
- #7 or #4 scratched → the pool loses a must-include horse; re-run before betting.
- If #11 PODIUM shortens sharply from 42 the market has changed its mind and the ticket improves; if #1 drifts beyond 12 while #7, #4 and #5 hold, the banker is unsupported — consider passing.
- Going to Yielding/Heavy → re-run MC.

CONFIDENCE: **MEDIUM-LOW**

CAVEATS:
1. **The banker is only ~37% to make the frame on market pricing** (HKJC 37.3%, SCMP 29.2%), against the skill's assumed ~56% cross-meeting banker rate. Six runners are priced 5.8–9.1; this is an open race and the 膽拖 structure concentrates all the risk on one of them. That is the main reason confidence is not higher.
2. **The market's shortest price is #7, not the banker #1.** MC prefers #1; the HKJC place pool marginally prefers #7 (41.0% vs 37.3%) and SCMP clearly does (40.8% vs 29.2%). A #7-bankered ticket (膽 7 + 腳 1,3,4,5,8) scores 12.4% market / 12.1% MC-Adj — better on market, worse on MC. The skill mandates the Adj Win% leader, so #1 it is, but the two horses are close enough that this is close to a coin-flip.
3. **The class bias affects #11 PODIUM specifically** — MC 32.8% place vs market 10.4%. It is on both tickets. See MODEL NOTE.
4. **The two place pools disagree sharply.** #8 NEXT FORTUNE: HKJC 27.4% top-3 vs SCMP 13.8%. #11 PODIUM: HKJC 10.4% vs SCMP 19.9% (win odds 42 vs 23). #3 CAVA PIONEER: HKJC 26.5% vs SCMP 35.5%. HKJC used as primary per skill 1e-i. **This changes Strategy B**: under SCMP odds #8 is 12 (> 10), which would make it a replaceable leg at 20.9% — replaced *instead of* #13. Leg selection is source-dependent.
5. **Thin form for three pool horses:** #4 STUNNING BUNDLE has **1 start**, #5 VIRTUS GLORY has 3, #8 NEXT FORTUNE has 5. MC rated #4 at 55 composite off a single run. #3 CAVA PIONEER has none at all.
6. The classification is decided by a single +1 adjustment (34.9% → 35.9%), and Mode A is infeasible anyway. See CLASSIFICATION NOTE.
7. Season opener — 0 jockey profiles and 0 trainer profiles loaded, as in R1–R4.
8. `winningMargin` still duplicates `finishPosition` in the historical data (found in R3, unfixed).
9. One reserve declared (KA YING RADIANCE). If it replaces a scratching, re-run.
═══════════════════════════════════════════════════════════
