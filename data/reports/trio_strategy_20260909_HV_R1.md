═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-09 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good (parsed from race card) | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-09 --venue "Happy Valley" --race 1 --form-data all --bankroll 10000 --kelly 0.35 --min-edge 5`)
HISTORICAL DATA: ✅ Pre-synced (not re-run this session) — 2,251 historical races loaded, 2,311 horse performances indexed, 12/12 runners enriched
SCMP DATA: ✅ Loaded — Win/Place odds, Star Form, Trouble-In-Running, trial/trackwork notes parsed. ⚠️ Q/QP matrix retrieved but rejected as placeholder data (see Caveat 3)
ODDS SOURCE: HKJC early-morning pool (`fetch-odds.ts`, captured 09:19 HKT 09-Sep) — full 12-horse coverage
             SCMP odds: ✅ loaded (cross-check) | HKJC live: ❌ not open

RACE: R1 ADMIRALTY HANDICAP — Class 5 | 1200m | Turf | Good | 12 runners
CLASSIFICATION: **Dominant** (top Adj Win% 36.9%) | POOL SIZE: 5
MODE: **A — Tight Pool (5)**
BET STRUCTURE: 膽拖 1膽 + 4腳 → C(4,2) = **6**
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| #  | Horse             | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B)         | Top Quinella (fair odds) |
|----|-------------------|---------|-----------|----------|------------|-------------|---------------|---------------------------|--------------------------|
| 7  | NOBLE FANS        | 35.9%   | 72.8%     | 8.0      | ✅          | ✅           | 1/8/11/5/11/9 | ★ 膽 (Banker)             | 6-7: 23.1% (4.3)         |
| 6  | ALWAYS FLUKE      | 27.4%   | 65.8%     | 7.1      | ✅          | ✅           | 3/2/6/10/2/6  | 腳 (Leg)                  | 5-6: 9.6% (10.4)         |
| 5  | AUTUMN VIBES      | 14.2%   | 47.5%     | 5.5      | ✅          | ✅           | 13/2/8/3/10/8 | 腳 (Leg)                  | 5-7: 12.9% (7.7)         |
| 9  | DASH              | 9.8%    | 36.3%     | 17       | ✅          | ❌           | 6/10/11/3/7/6 | 腳 (Leg)                  | 7-9: 8.2% (12.2)         |
| 10 | TELECOM POWER     | 5.5%    | 27.2%     | 7.0      | ✅          | ✅           | 2/5/3/4/10/7  | 腳 (Leg)                  | 6-9: 6.6% (15.1)         |
| 12 | TEAM HAPPY        | 1.7%    | 10.8%     | 8.1      | ❌          | ✅           | 6/3/2/4/11/9  | 腳 (Leg — added directly) | —                        |
| 8  | SOLAR RIVER       | 1.5%    | 9.2%      | 9.2      | ❌          | ✅           | 3/12/5/10/8/3 | 腳 (Leg — added directly) | —                        |
| 2  | MARVEL AND GOLD   | 1.3%    | 9.2%      | 17       | ❌          | ❌           | 6/7/6/8/6/10  | —                         | —                        |
| 4  | STORMY KNIGHT     | 0.8%    | 6.6%      | 11       | ❌          | ❌           | 8/7/11/8/6/8  | —                         | —                        |
| 1  | FLASH STAR        | 0.8%    | 6.3%      | 12       | ❌          | ❌           | 6/9/9/11/5/10 | —                         | —                        |
| 11 | VON BAER          | 0.5%    | 5.0%      | 18       | ❌          | ❌           | 7/10/6/5/11/9 | —                         | —                        |
| 3  | FORTUNE SUPERNOVA | 0.4%    | 3.5%      | 17       | ❌          | ❌           | 6/7/12/11/5/10| —                         | —                        |

**Market:** Overround 23.0% (early-morning pool). Favourite bias +0.0%, longshot bias +0.0%.
Model flags **#7 NOBLE FANS undervalued by 184%** and **#6 ALWAYS FLUKE by 94%**; **#3 FORTUNE SUPERNOVA overvalued by 94%**.
The notable model-vs-market split is **#5 AUTUMN VIBES**: the 5.5 market favourite (Purton) but only MC #3 on Win% (14.2%). MC is siding with #7 and #6 on form lines. #5 stays in both pools (Place% 47.5% clears the 25% must-include bar; Win odds < 10), so the disagreement forces no exclusion.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 7 | NOBLE FANS | 35.9% | 72.8% | +form +1 | +form +1 | **36.9%** | **73.8%** | 8.0 | A Atzeni | 3 | Stalker | +form (won latest, "goes well fresh"), no TIR/vet issues | ★ 膽 (Banker) |
| 6 | ALWAYS FLUKE | 27.4% | 65.8% | excuses +2 | excuses +2 | **29.4%** | **67.8%** | 7.1 | C Y Ho | 4 | Stalker | +excuses (head up when crowded near 800M) | 腳 (Leg) |
| 9 | DASH | 9.8% | 36.3% | +form +1, trial +2 | +form +1, trial +2 | **12.8%** | **39.3%** | 17 | K C Leung | 7 | Closer | +form ("rallied for third"), +trial ("motored through into second", ST trial) | 腳 (Leg) |
| 5 | AUTUMN VIBES | 14.2% | 47.5% | -perf −2 | -perf −2 | **12.2%** | **45.5%** | 5.5 | Z Purton | 9 | On-pace / keen | -perf (raced ungenerously, didn't settle, disappointing run; required trial passed 31/08/26) | 腳 (Leg) |
| 10 | TELECOM POWER | 5.5% | 27.2% | excuses +2, +form +1 | excuses +2, +form +1 | **8.5%** | **30.2%** | 7.0 | H Bentley | 6 | Stalker / Closer | +excuses (steadied, no clear running), +form (close second latest) | 腳 (Leg) |
| 12 | TEAM HAPPY | 1.7% | 10.8% | excuses +2 | excuses +2 | 3.7% | 12.8% | 8.1 | K Teetan | 10 | Stalker | +excuses (obliged to race wide, blundered after start) | out |
| 2 | MARVEL AND GOLD | 1.3% | 9.2% | excuses +2 | excuses +2 | 3.3% | 11.2% | 17 | J Orman | 8 | Varied | +excuses (held up 300M–150M) | out |
| 4 | STORMY KNIGHT | 0.8% | 6.6% | excuses +2 | excuses +2 | 2.8% | 8.6% | 11 | B Avdulla | 1 | Closer | +excuses (held up 300M–200M) | out |
| 11 | VON BAER | 0.5% | 5.0% | excuses +2 | excuses +2 | 2.5% | 7.0% | 18 | M F Poon | 12 | Closer | +excuses (steadied after short distance); poor gate 12 | out |
| 3 | FORTUNE SUPERNOVA | 0.4% | 3.5% | excuses +2 | excuses +2 | 2.4% | 5.5% | 17 | C L Chau (-2) | 2 | Closer | +excuses (steadied near 700M when racing keenly) | out |
| 8 | SOLAR RIVER | 1.5% | 9.2% | 0 | 0 | 1.5% | 9.2% | 9.2 | M L Yeung | 5 | On-pace | — (no TIR, no vet flag) | out |
| 1 | FLASH STAR | 0.8% | 6.3% | 0 | 0 | 0.8% | 6.3% | 12 | R Kingscote | 11 | Midfield | — (wide barrier, lay in when pressured — no listed flag) | out |

**Factor legend:** `+form +1` = improving/positive latest run in Star Form; `excuses +2` = TIR bad-luck bounce candidate (crowded / steadied / held up / wide trip); `trial +2` = positive trial or trackwork note; `-perf −2` = stewards' unacceptable-performance line. No `-injury30d` (no adverse vet findings on any declared runner), no `-barrier` (no horse shows "bumped on jumping" in ≥2 recent runs), no `-age` (no age data published; not applied), no `-notRO`. All adjustments are inside the ±8% Win / ±10% Place cap.

**Reasoning:**
- **#7 NOBLE FANS (膽)** — clear MC #1 on both Win% (35.9) and Place% (72.8), a 10.7-point Win% gap to #6 and a 25-point gap to #3. Won its latest start (04-Jul, ST 1200m C5) from midfield; SCMP notes it "goes well fresh", which matters off a two-month break. Clean TIR and clean vet. Atzeni/Size, inside draw 3. 17 career starts → **banker-eligible** (not a debutant).
- **#6 ALWAYS FLUKE** — the field's best top-3 profile (3/2/6/10/2/6, placed five times to 1,400m), MC Place% 65.8%, drawn 4, and got its head up when crowded near 800M last start → genuine bounce candidate. Second on both raw and adjusted rankings.
- **#9 DASH** — the only pool horse the market has not backed (17). MC 36.3% Place% clears the must-include bar, "rallied for third" over this course-and-distance class, and it is the one runner in the race with an explicitly positive trial line ("motored through into second"). Biggest price/model gap inside the pool.
- **#5 AUTUMN VIBES** — market favourite at 5.5 with Purton, MC Place% 47.5% (2nd-highest in the field). Penalised −2 for the unacceptable-performance line and the mandatory trial, but rule 9 (no hard exclusion at odds ≤ 15) and the 25% must-include threshold both keep it in.
- **#10 TELECOM POWER** — 30.2% Adj Place% after excuses; the most consistent recent placer in the field (2/5/3/4) though all over 1,650m+. Dropping to 1200m at HV is a query, but it clears the must-include bar and is a 7.0 chance.
- **Excluded despite sub-10 odds:** #12 TEAM HAPPY (8.1) and #8 SOLAR RIVER (9.2) both fall well short of 25% Adj Place% (12.8% and 9.2%). Under Mode A's 5-horse cap they miss out — this is exactly where Strategy B diverges.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #7, #6, #9, #5, #10
MODE: A (Tight Pool — Dominant race) | POOL SIZE: 5

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#7 NOBLE FANS** (Adj Place% 73.8%) ← locked in every combo
腳 (Legs):  #6, #9, #5, #10
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = **6**

雙膽拖 check: 2nd-ranked **#6 ALWAYS FLUKE Adj Place% = 67.8%**. This **passes** the ≥63% threshold stated in §4c / the decision flow / reminders 16 & 19, but **fails** the ≥70% threshold stated in the A/B comparison table. The skill is internally inconsistent here (see Caveat 5). **Resolved conservatively: single banker (膽拖).** The 雙膽拖 alternative is priced below for reference.

TOP TRIO COMBINATIONS (Plackett-Luce over Adj Win%, 3M draws):
| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|--------------------|-----------------|----------------|
| 1 | #7, #6, #9  | 12.91% | $8  |
| 2 | #7, #6, #5  | 12.24% | $8  |
| 3 | #7, #6, #10 | 8.20%  | $12 |
| 4 | #7, #5, #9  | 4.28%  | $23 |
| 5 | #7, #9, #10 | 2.87%  | $35 |

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 6 (膽拖: C(4,2), legs = 4)
UNIT BET: $10 (fixed)
TOTAL STAKE: **$60**
MODELLED COVERAGE: **43.2%** of trio outcomes (vs 50.9% for the full C(5,3)=10 ticket at $100 — 40% cheaper for 85% of the coverage)

FULL TICKET (all 6 combos, ranked by modelled probability):
| Combo | Prob | Fair odds |
|-------|------|-----------|
| 7-6-9  | 12.91% | $8  |
| 7-6-5  | 12.24% | $8  |
| 7-6-10 | 8.20%  | $12 |
| 7-5-9  | 4.28%  | $23 |
| 7-9-10 | 2.87%  | $35 |
| 7-5-10 | 2.73%  | $37 |

HKJC BET SLIP: Race 1 → Trio → 膽拖 → 膽: 7 | 腳: 5, 6, 9, 10 | $10/combo

ALTERNATIVE (雙膽拖, if reading the ≥63% rule as sufficient): 膽: 7, 6 | 腳: 5, 9, 10 → 3 combos, **$30**, modelled coverage **33.3%** (7-6-9 / 7-6-5 / 7-6-10). Cheaper, but both #7 and #6 must fill the frame (joint ≈ 50% on adjusted numbers).

PASS CONDITIONS:
- **#7 NOBLE FANS scratched → VOID the ticket** (do not restructure; rule 10).
- Any 2 of #6 / #9 / #5 scratched → drop to the Strategy B leg set or pass.
- Field drops below 3 starters → pool refunded automatically.
- Going changes to Yielding/Heavy → re-run MC; #7's only recent win came on a wet Sha Tin track, so a soft surface would arguably *strengthen* the banker, but the form weighting behind the pool is Good-track based.
- If #7 drifts materially (say beyond 12) before the jump → re-check; the banker case rests on the model, not the market.

CONFIDENCE: **MEDIUM-HIGH** — dominant classification, banker has the field's best Win% and Place% by a clear margin, is banker-eligible, has no adverse TIR or vet line, and the market has it at 8.0 (i.e. the model sees value rather than backing an odds-on favourite). Held below HIGH by the early-season jockey/trainer sample problem (Caveat 1) and Happy Valley's upset rate.

CAVEATS:
1. **Early-season jockey/trainer samples.** 2026-09-09 is only the second meeting of the 2026/27 season. Jockey profiles loaded on 4–10 rides each (e.g. Atzeni 29% from 7, Purton 20% from 10, and eight of the twelve riders showing 0% from ≤9 rides). These strike rates are statistical noise and feed the MC; treat any jockey-driven separation as unreliable.
2. **HKJC live odds are not open.** Prices are the early-morning pool (23.0% overround) captured 09:19 HKT. SCMP's parallel quotes differ slightly (#6 8.3 vs 7.1, #7 7.7 vs 8.0, #9 15 vs 17, #12 7.5 vs 8.1, #8 9.1 vs 9.2). **Both odds sets produce the identical Strategy B leg set**, so the structure is robust to which source is used — but re-check prices near the jump.
3. **SCMP Q/QP matrix retrieved but rejected.** The published matrix is internally inconsistent (3-6 at 2 while 6-7 sits at 42, and 7-11 at 5.1 with #11 an 18 chance) — it looks like pre-market placeholder data. It was **not** used for the Step 4e value cross-check, so the Trio value read rests on MC and win-pool odds alone.
4. **Finish-time projection contradicts the win ranking.** The model's time projection makes #11 VON BAER (0.5% MC Win%) the fastest and puts the banker #7 seventh, ~2.4s adrift. This is speed-figure noise across a Class 5 field with runners coming from 1,000m to 2,200m; the win/place distribution, not the time projection, drove selection. Flagged, not acted on.
5. **Skill rule conflict on 雙膽拖.** The A/B table says the 2nd horse needs Adj Place% ≥ 70%; §4c, the decision flow, and reminders 16/19 all say ≥ 63%. #6 ALWAYS FLUKE lands at 67.8% — inside the gap. Resolved to single-banker 膽拖 (the stricter reading), with the 雙膽拖 priced as an alternative. Worth reconciling in the skill.
6. **Distance/venue queries in the pool.** #10 TELECOM POWER's four "lit board" runs were all at 1,650m–2,200m — it is dropping 450m+ here. #6 ALWAYS FLUKE's whole recent record is at Sha Tin, not HV. #7 NOBLE FANS is first-up after nine weeks. None of these are modelled explicitly beyond the form-data enrichment.
7. **Coverage figures are Plackett-Luce estimates** derived from win probabilities, not direct MC trio frequencies. PL tends to overstate joint top-3 probability for the strongest runners; treat 43.2% (A) and 72.0% (B) as upper-bound coverage, not expected hit rates.
8. **Happy Valley upset rate.** The skill's own venue note says HV produces more upsets and favours wider pools (Mode B/C), yet the adjusted numbers classify this race as Dominant (Mode A, 5 horses). Mode A is followed as specified, but the tight pool is the aggressive read at this venue — Strategy B's 6-leg structure is the natural hedge.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#7 NOBLE FANS** (MC Win% 35.9%, MC Place% 72.8%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (65.8%), #5 (47.5%), #9 (36.3%), #10 (27.2%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **none**
  – #10 TELECOM POWER is the only leg in the 20–30% Place% band (27.2%), but its Win odds are **7.0 (< 10)**, so it fails the "weak by both MC and market" test and is **not** replaceable.
  – #9 (36.3%), #5 (47.5%) and #6 (65.8%) all sit above the 20–30% band.
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), processed by Win odds ascending:
  1. **#12 TEAM HAPPY** (Win odds 8.1, MC Place% 10.8%) → no replaceable leg exists → **added directly**
  2. **#8 SOLAR RIVER** (Win odds 9.2, MC Place% 9.2%) → no replaceable leg exists → **added directly**
Action: **both candidates added directly (no replaceable leg available)** — no 1-for-1 swaps performed.
Final legs: **#6, #5, #9, #10, #12, #8** (6 legs)
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = **15**
UNIT BET: $10 (fixed)
TOTAL STAKE: **$150**
MODELLED COVERAGE: **72.0%** (raw-MC Plackett-Luce, 3M draws)

STRATEGY B TICKET:
| Combo | Prob | Fair odds |
|-------|------|-----------|
| 7-6-5  | 25.08% | $4    |
| 7-6-9  | 16.43% | $6    |
| 7-6-10 | 8.77%  | $11   |
| 7-5-9  | 6.74%  | $15   |
| 7-5-10 | 3.60%  | $28   |
| 7-6-12 | 2.61%  | $38   |
| 7-9-10 | 2.33%  | $43   |
| 7-6-8  | 2.29%  | $44   |
| 7-5-12 | 1.06%  | $94   |
| 7-5-8  | 0.94%  | $106  |
| 7-9-12 | 0.69%  | $145  |
| 7-9-8  | 0.61%  | $163  |
| 7-10-12| 0.37%  | $270  |
| 7-10-8 | 0.32%  | $312  |
| 7-12-8 | 0.10%  | $1019 |

HKJC BET SLIP: Race 1 → Trio → 膽拖 → 膽: 7 | 腳: 5, 6, 8, 9, 10, 12 | $10/combo

**A vs B comparison:** Same banker — **#7 NOBLE FANS tops both MC Win% and Adj Win%**, so the two systems agree on the anchor and on the four core legs (#6, #5, #9, #10). The only structural difference is that Strategy B's Win-odds rule **adds** #12 TEAM HAPPY (8.1) and #8 SOLAR RIVER (9.2) as extra legs, because no primary leg met the "MC Place% 20–30% AND Win odds > 10" replacement test — #10 sits in the Place% band but is a 7.0 market chance, so it survives. That takes B to 6 legs / 15 combos / **$150**, two and a half times Strategy A's **$60**, in exchange for 72.0% modelled coverage vs 43.2%. But the six extra combos B buys are worth only **5.5% of combined probability between them** (7-6-12 down to 7-12-8), i.e. B pays $90 more for about 5.5 points of genuine coverage — the rest of the coverage gap is the ordering effect of the SCMP adjustments, not extra horses. **If backing one only: Strategy A.** #12 and #8 are in Strategy B purely on market price (10.8% and 9.2% MC Place%), and the SCMP form lines behind them are weak (#12 "blundered after start, raced keenly, obliged to race wide"; #8 "gave decent sight" without placing). Strategy B is the correct play only if you distrust the model's low rating of the two sub-10 market chances it excludes.
═══════════════════════════════════════════════════════════
