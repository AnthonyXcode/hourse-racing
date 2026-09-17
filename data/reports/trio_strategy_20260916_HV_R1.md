═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-16 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-16 --venue "Happy Valley" --race 1 --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5`). The analyzer loaded 2,259 historical races and 2,318 indexed performances, enriched 12/12 horses, and loaded 12 jockey and 12 trainer profiles. Stability: 2 more CLI re-runs (3 runs in total).
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction)
SCMP DATA: ✅ Loaded. Star Form, TIR, Vet and Trackwork are available for all 12 runners. ⚠️ SCMP Place odds and the Q/QP matrix are unusable (see caveats) and were **not used**. Tipster picks were ignored (skill rule 13).
ODDS SOURCE: **HKJC win pool** (`fetch-odds.ts`, `data/odds/odds_20260916_HV.json`, captured 17:55 HKT 16-Sep). It covers all 12 runners.
             SCMP odds: ⚠️ Win column loaded (used only as a secondary check); Place column unusable | HKJC: ✅ loaded. The analyzer's own fetch matched except #3 (17 → 18) and #10 (37 → 36).
             ⚠️ The analyzer logged "place odds estimated from win odds". All Strategy B odds tests use **Win odds only**.

RACE: R1 HOI MEI HANDICAP — **Class 5** | **1000m** | Turf ("B" course) | Good | **12 runners** | 7:10pm
CLASSIFICATION: **Competitive** (top Adj Win% 28.9%; raw MC top 28.9%) | POOL SIZE: 6
MODE: **B — Standard Pool (6)**
BET STRUCTURE: **膽拖** | 1膽 + 5腳 | C(5,2) = 10 combinations. 雙膽拖 is not used because the 2nd-ranked #9 has Adj Place% 58.1%, below the 63% bar.
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Happy Valley 2026-09-16 (Wed night) | Going: Good | Surface: Turf, "B" course
Target Race: R1 (Class 5 | 1000m Turf | 12 runners) — 7:10pm
Scratchings: none (all 12 entries isScratched=false; SCMP lists the same 12 with matching draws;
             reserves LEAN MASTER and TELECOM POWER not in the field)
Odds coverage: 12 / 12 horses with HKJC Win odds
Starters: 12 ≥ 3 → Trio pool valid
Jockey stats: 12 jockey profiles + 12 trainer profiles loaded
Debutants: none. Fewest indexed runs: #1 TOPSPIN KING (5) and #3 BEAUTY GEMINI (6); all others have 10.
           The banker for both strategies, #2 ALWAYS MY FOLKS, has 10 indexed runs, so it is eligible (rules 1 / 17).
Long layoff (>90 days): #6 ICONICAL (163d — last run 6-Apr; throat surgery + lung infection since)
                        #5 SWEET BRIAR (140d — last run 29-Apr)
                        #8 DIRIYA (136d — last run 3-May)
                        #1 TOPSPIN KING (95d — last run 13-Jun)
SCMP data: ✅ Form/TIR/Vet/Trackwork loaded (all 12); ⚠️ Place odds + Q/QP unusable
```

⚠️ **Scraper log inconsistency:** the race-card scraper logged "distance=1200m". The saved racecard, the analysis header, the "trip = past runs at 1000m" label, the finish-time projection and SCMP all agree on **1000m**, so 1000m was used.

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|------|-------------------|--------------------------|
| 2 | ALWAYS MY FOLKS | 28.9% | 65.2% | 7.8 | ✅ | ✅ | 12 | 10 | ★ 膽 (Banker) | 2-9: 14.9% (6.7) |
| 9 | RUNJEET | 22.4% | 58.1% | 4.5 | ✅ | ✅ | 4 | 10 | 腳 (Leg) | 2-9: 14.9% (6.7) |
| 11 | SPICY SPANGLE | 20.3% | 55.1% | 4.9 | ✅ | ✅ | 3 | 10 | 腳 (Leg) | 2-11: 13.0% (7.7) |
| 4 | JOLLY COMPANION | 11.8% | 41.0% | 11 | ✅ | ❌ | 11 | 10 | 腳 (Leg) | 2-4: 8.5% (11.8) |
| 7 | MACANESE MASTER | 10.8% | 39.7% | 5.4 | ✅ | ✅ | 10 | 10 | 腳 (Leg) | 2-7: 7.5% (13.4) |
| 10 | SMART CITY | 2.2% | 12.6% | 37 | ❌ | ❌ | 8 | 10 | — | — |
| 6 | ICONICAL | 1.1% | 8.8% | 17 | ❌ | ❌ | 1 | 10 | — | — |
| 12 | SOLAR RIVER | 0.9% | 6.9% | 13 | ❌ | ❌ | 7 | 10 | — | — |
| 3 | BEAUTY GEMINI | 0.6% | 4.3% | 17 | ❌ | ❌ | 2 | 6 | — | — |
| 8 | DIRIYA | 0.5% | 4.2% | **10** | ❌ | ❌ (exactly 10) | 6 | 10 | — (late-odds watch) | — |
| 5 | SWEET BRIAR | 0.3% | 2.0% | 18 | ❌ | ❌ | 5 | 10 | — | — |
| 1 | TOPSPIN KING | 0.2% | 2.2% | 51 | ❌ | ❌ | 9 | 5 | — | — |

**Market:** Overround **22.7%**, favourite bias **+0.1%**, longshot bias **−55.0%**.
- **Agreement:** model and market both have #9 RUNJEET (4.5 favourite) and #11 SPICY SPANGLE (4.9) as top-three material.
- **Disagreement 1:** MC makes **#2 ALWAYS MY FOLKS** its top pick (28.9% win, 65.2% place, fair price ~3.5), but the market has him **4th favourite at 7.8**. The analyzer calls him "undervalued by 126%". The market is probably pricing in **gate 12**.
- **Disagreement 2:** the market's 3rd favourite **#7 MACANESE MASTER (5.4)** is only MC 5th (10.8% win).
- **Disagreement 3:** the market's 5th favourite **#8 DIRIYA (10)** gets just 4.2% MC place. The analyzer rates #8 and #5 "overvalued by 95%".
- **Shape:** MC sees a **five-horse race**. Runners {2, 9, 11, 4, 7} carry 259% of the 300% place mass, and the other seven share the remaining ~41%.

**Top quinella combinations (MC, primary run):** 2-9 14.9% ($6.7) · 2-11 13.0% ($7.7) · 9-11 10.3% ($9.7) · 2-4 8.5% ($11.8) · 2-7 7.5% ($13.4).

**Stability across the 3 CLI runs:**
- The top-5 order (2 > 9 > 11 > 4 > 7) was identical in **3/3** runs.
- #2 ranged 28.5–29.1% win and 65.2–65.7% place. #9 ranged 22.4–22.7% win; #11 ranged 19.6–20.3% win.
- The 20% place line is clean. #7 (38.7–39.7%) is the lowest horse above it and #10 (12.6–13.3%) the highest below it, so **Strategy B's primary legs are stable**.
- The Strategy B banker is **not** a coin-flip: the #2–#9 win gap was 5.9–6.5pp in every run.

**Finish-time projection (analyzer):** #9 is fastest, then #11 (+0.06s), #12 (+0.95s) and **#2 (+1.07s, 4th)**, with #7 5th. This largely agrees with the MC top group, except that #12 SOLAR RIVER projects 3rd despite only 6.9% MC place, and #4 JOLLY COMPANION projects 9th (+2.89s) despite 41.0% MC place.

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | Win Odds (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------------|------------------|----------|----------|-----------|---------------|
| 1 | TOPSPIN KING | 44 | — ("did nothing", "tiring ninth", "last from midfield") | **+excuses** (**badly crowded** shortly after start) | clear | — | Midfield / box seat |
| 2 | ALWAYS MY FOLKS | 6.5 | — (Valley 1,000m **winner** 3 starts back, then two 5ths → stale); "**Gate won't help**" | clear (none noted) | clear | — | Stays on (midfield) |
| 3 | BEAUTY GEMINI | 15 | — ("showed nothing"; tries Valley 1,000m) | **+excuses** (**steadied** twice, **crowded**, wide without cover) | clear | — | On-pace (wide last start) |
| 4 | JOLLY COMPANION | 12 | — (5th/6th in 6 of 8; "Valley 1,000m mystery and **draw won't help**") | clear: self-inflicted ("shifted out at the start and made contact") | clear | — | Midfield |
| 5 | SWEET BRIAR | 17 | — (veteran; "failed to menace six times") | clear | age 8+ note (vet 11-Aug, passed 31-Aug). **−age not applied**: that flag is C3+ only and this is Class 5 | **+trial** ("Trialled well at Conghua … to finish second") | Midfield |
| 6 | ICONICAL | 21 | — (improved 3rd in **February** → stale; "failing ridden box seat") | clear. The rider's "failed to respond" note is not a not-ridden-out note | **−injury30d** (lung infection 10-Jun, **passed 24-Aug = 23 days before race**; throat surgery 22-Apr, passed 28-May) | — | Box seat / speed-tracker |
| 7 | MACANESE MASTER | 5.9 | — ("made all" for a Valley 1,000m win in **February** → stale; four 2nds since; speed-tracking 4th last Wed) | clear | clear | — | On-pace / front-runner |
| 8 | DIRIYA | 9.4 | — ("struggled" in Class 5) | clear: self-inflicted (shifted out, raced keenly, refused to settle) | clear | **+trial** ("Did win a recent Conghua trial on turf") | Keen / midfield |
| 9 | RUNJEET | 4.6 | — (prominently ridden 4th; speed-tracking 4th from gate 13 at Sha Tin); tries 1,000m | clear ("laid out under pressure", no excuse) | clear | — | Prominent / speed-tracker |
| 10 | SMART CITY | 26 | — ("failed to menace"; "**Trip is too sharp**") | **+excuses** (**steadied when crowded** near 1300M) | clear | — | Prominent |
| 11 | SPICY SPANGLE | 5.5 | — ("set the pace for second" 2 runs ago over Valley 1,000m; then "badly flopping the start") | clear: lunged and reared at the start (self-inflicted, not a crowded/steadied/wide excuse) | clear | — | Front-runner |
| 12 | SOLAR RIVER | 12 | — ("set the pace for fifth"; Valley 1,000m 3rd; "tiring 11th") | **+excuses** (**steadied** to allow a runner to cross; **steadied when crowded** near 50M) | clear | — | Prominent / on-pace |

**Flag discipline (same conventions as the 13-Sep ST reports):**
- `+excuses` goes only to horses that **received** trouble: #1, #3, #10 and #12.
  - It is withheld from **#4 and #8** (they shifted out and made contact themselves) and from **#11** (lunged and reared at the start). #11's flopped start is still a genuine reason its last run understated it (see reasoning).
- `+trial` for **#5** (2nd in a Conghua trial) and **#8** (won a Conghua turf trial).
- `−injury30d` for **#6** only: a lung infection passed **23 days** before the race (< 30).
- `+form` **not** applied to anyone, because every win or "made all" is stale and was followed by non-winning runs:
  - **#2** won 3 starts back, then ran 5th and 5th.
  - **#7**'s made-all win came in February.
  - **#6**'s "improved" 3rd came in February.
- `+draw` is not applied to anyone (no "gate should help" wording). SCMP's negative draw comments for **#2** ("Gate won't help", gate 12) and **#4** ("draw won't help", gate 11) have no entry in the skill's adjustment table. Per Reminder 15 they are noted as risks, not applied as exclusions.
- No `−barrier`, `−perf` or `−notRO`. `−age` for #5 is not applicable in Class 5.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 2 | ALWAYS MY FOLKS | 28.9% | 65.2% | 0 | 0 | **28.9%** | **65.2%** | 7.8 | Z Purton | 12 | Mid / stays on | (gate 12 noted) | ★ 膽 (Banker) |
| 2 | 9 | RUNJEET | 22.4% | 58.1% | 0 | 0 | **22.4%** | **58.1%** | 4.5 | L Ferraris | 4 | Prominent | — | 腳 (Leg) |
| 3 | 11 | SPICY SPANGLE | 20.3% | 55.1% | 0 | 0 | **20.3%** | **55.1%** | 4.9 | K C Leung | 3 | Front | — | 腳 (Leg) |
| 4 | 4 | JOLLY COMPANION | 11.8% | 41.0% | 0 | 0 | **11.8%** | **41.0%** | 11 | C Y Ho | 11 | Midfield | (gate 11 noted) | 腳 (Leg) |
| 5 | 7 | MACANESE MASTER | 10.8% | 39.7% | 0 | 0 | **10.8%** | **39.7%** | 5.4 | K Teetan | 10 | On-pace | — | 腳 (Leg) |
| 6 | 10 | SMART CITY | 2.2% | 12.6% | excuses +2 | excuses +2 | **4.2%** | **14.6%** | 37 | J Orman | 8 | Prominent | +excuses | 腳 (Leg) |
| 7 | 12 | SOLAR RIVER | 0.9% | 6.9% | excuses +2 | excuses +2 | 2.9% | 8.9% | 13 | R Kingscote | 7 | On-pace | +excuses | — |
| 8 | 3 | BEAUTY GEMINI | 0.6% | 4.3% | excuses +2 | excuses +2 | 2.6% | 6.3% | 17 | Y L Chung (-2) | 2 | On-pace | +excuses | — |
| 9 | 8 | DIRIYA | 0.5% | 4.2% | trial +2 | trial +2 | 2.5% | 6.2% | 10 | B Avdulla | 6 | Keen / mid | +trial | — |
| 10 | 5 | SWEET BRIAR | 0.3% | 2.0% | trial +2 | trial +2 | 2.3% | 4.0% | 18 | C L Chau (-2) | 5 | Midfield | +trial | — |
| 11 | 1 | TOPSPIN KING | 0.2% | 2.2% | excuses +2 | excuses +2 | 2.2% | 4.2% | 51 | M L Yeung | 9 | Midfield | +excuses | — |
| 12 | 6 | ICONICAL | 1.1% | 8.8% | -injury30d −3 | -injury30d −4 | 0.0% (floored) | 4.8% | 17 | L Hewitson | 1 | Box seat | −injury30d | — |

**Factor legend:**
- `excuses +2`: the horse received trouble in running (TIR).
- `trial +2`: strong trial or trackwork.
- `-injury30d −3 / −4`: the vet report shows an injury passed < 30 days ago (Win / Place).

No horse reaches the ±8% / ±10% cap or the 50% Win / 85% Place ceiling. #6's Adj Win% (1.1 − 3) is floored at 0.0%. The SCMP layer changes **nothing in the top 5**: all five are unadjusted, so Strategy A's top 5 order matches raw MC exactly.

**Banker eligibility (rules 1 / 17):** #2 ALWAYS MY FOLKS has 10 indexed runs, including a win over this course and distance, so it is **eligible**.

**雙膽拖 — NOT triggered.** The 2nd-ranked #9 RUNJEET has Adj Place% **58.1%**, below the 63% bar (range 58.1–59.2% over 3 runs). The rule output is single-banker 膽拖.

**Reasoning for the pool (Mode B = top 3 by Adj Win% + 3 more by Adj Place%):**
- Top 3 by Adj Win%: **#2 (28.9%), #9 (22.4%), #11 (20.3%)**.
- Next 3 by Adj Place%: **#4 (41.0%), #7 (39.7%), #10 (14.6%)**. Both #4 and #7 clear the mandatory Adj Place% ≥ 25% bar.
- 6th slot: #10 SMART CITY (14.6%) beats #12 SOLAR RIVER (8.9%) by 5.7pp. It also led #12 on raw MC place in all 3 runs.
  - ⚠️ SCMP says "**Trip is too sharp**" for #10, which drops from 1,650m to 1,000m. Rule 8 forbids narrative exclusion, so #10 keeps the slot on the numbers.
  - #12 is the stronger 1,000m profile on paper: a Valley 1,000m 3rd, and 3rd in the analyzer's time projection.
- Venue note: Happy Valley produces more upsets, and Mode B is the skill's recommended width here.

**Not in pool, market ≤ 15 (rule 9 check):** #8 DIRIYA (10) and #12 SOLAR RIVER (13).
- Neither is excluded for negative flags: #8 carries `+trial` and #12 `+excuses`.
- They simply rank below #10 on Adj Place% (6.2% and 8.9% vs 14.6%).
- Both are the most likely "third-horse" pool misses (see below).

**Pace read (HV 1000m, "B" course — front-runner / inside-draw bias):**
- **The speed is drawn inside.**
  - #11 SPICY SPANGLE (gate 3) set the pace for 2nd over this course and distance two runs ago. His last run is best ignored: he reared at the start and still ran on for 6th.
  - #9 RUNJEET (gate 4) is a prominent speed-tracker.
  - #12 SOLAR RIVER (gate 7) is a pace-setter type.
- The two MC co-contenders **#9 and #11 get the ideal trips**, which fits the finish-time projection that has them 1-2.
- **The banker #2 ALWAYS MY FOLKS is drawn 12 of 12** ("Gate won't help"). At the Valley over 1,000m this is the single biggest risk on both tickets. He either burns energy crossing or settles back and needs luck in a short straight. Z Purton riding is the best mitigation available.
- **#7 (gate 10) and #4 (gate 11)** also start wide. #7 is on-pace and will likely push forward, which adds early pressure in front of #9 and #11.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#2, #9, #11, #4, #7, #10**
MODE: **B — Standard Pool** | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#2 ALWAYS MY FOLKS** (Adj Place% 65.2%) ← locked in every combo
腳 (Legs):  **#9, #11, #4, #7, #10**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

TOP TRIO COMBINATIONS (Plackett-Luce fitted to Adj Place%; all 10 ticket combos):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds ($10) |
|------|--------------------|-----------------|----------------------|
| 1 | #2, #9, #11 | 11.39% | $88 |
| 2 | #2, #4, #9 | 7.14% | $140 |
| 3 | #2, #7, #9 | 6.82% | $147 |
| 4 | #2, #4, #11 | 6.46% | $155 |
| 5 | #2, #7, #11 | 6.17% | $162 |
| 6 | #2, #4, #7 | 3.86% | $259 |
| 7 | #2, #9, #10 | 2.07% | $483 |
| 8 | #2, #10, #11 | 1.87% | $535 |
| 9 | #2, #4, #10 | 1.17% | $855 |
| 10 | #2, #7, #10 | 1.12% | $894 |

**Ticket coverage: 48.1%** (Plackett-Luce on Adj Place%) for 10 combos.

**Fit note:** Adj Place% sums to **308.1%**, so the fit renormalises by ~2.7%. The fit is otherwise exact (max error 0.000pp). The total is inflated by the net-positive SCMP flags on the outsiders.
- Why Plackett-Luce: an offline re-execution of the simulator on the saved racecard gave a *sharper* distribution than the CLI (#2 33.9% win / 74.8% place), probably because it skips part of the CLI pipeline. It was **not** used for pricing.
- It does confirm the combo order: 2-9-11 (20.3%), then 2-4-9 / 2-7-9 (10.5% / 10.4%), then 2-4-11 / 2-7-11 (9.0% / 8.9%).

**Largest combinations NOT covered by the Strategy A ticket (Plackett-Luce, adjusted):**
- Banker misses, which need #2 out of the frame: **4-9-11 (5.0%)**, **7-9-11 (4.8%)**, 4-7-9 (3.0%), 4-7-11 (2.7%).
- Third-horse pool misses: 2-9-12 / 2-11-12 (#12 SOLAR RIVER), 2-9-6, 2-9-8.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- The headline combo **2-9-11** (~11.4% adjusted, fair ~$88) combines the two market favourites (4.5 / 4.9) with **#2 at 7.8**. It will not pay big, but because the market has #2 at ~11% to win vs MC's 29%, it should still pay near or above fair if the model is right.
- Combos with **#7 (5.4, market 3rd favourite)** carry public money and will pay below their MC-fair prices. Combos with **#4 (11)** are where the model sees an overlay (MC 41% place vs a double-figure price).
- The **main model risk is #2's gate 12**. The market is probably right to discount that more than the MC does, since the MC applies no explicit draw adjustment in this output.
- The SCMP Q/QP matrix could not be used for cross-reference (rule 14); see caveats.

**Verdict:** a structured Class 5 sprint. Five horses hold ~86% of the place mass, and the top trio alone is ~11%. Both tickets are really a bet that **#2 overcomes gate 12** to hit the frame.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (1 Banker + 5 Legs)
膽 (Banker): **#2 ALWAYS MY FOLKS**
腳 (Legs):  #9 RUNJEET, #11 SPICY SPANGLE, #4 JOLLY COMPANION, #7 MACANESE MASTER, #10 SMART CITY
COMBINATIONS: **10** (C(5,2) where 5 = legs)
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

TOP COMBINATIONS (highest value):
  2-9-11 (11.4%) · 2-4-9 (7.1%) · 2-7-9 (6.8%) · 2-4-11 (6.5%) · 2-7-11 (6.2%) · 2-4-7 (3.9%) · 2-9-10 (2.1%) · 2-10-11 (1.9%)

Priced alternatives (not the recommendation, shown so the trade-offs are visible):
| Variant | Structure | Combos | Cost | Coverage (adj PL) |
|---------|-----------|--------|------|-------------------|
| **Recommended (rule output)** | 膽拖 1膽 #2 + 5腳 (9, 11, 4, 7, 10) | 10 | **$100** | 48.1% |
| Full pool, no banker | C(6,3) | 20 | $200 | 69.0% |

PASS CONDITIONS:
- If **#2 ALWAYS MY FOLKS** (Banker) is scratched → **VOID** the ticket (rule 10).
- If the field drops below 3 starters → pool refunded (not a live risk).
- If **#2 drifts past ~12** in late betting → the market is heavily fading gate 12; downgrade to PASS.
- If the going turns **Yielding/Heavy** → re-assess; the inside-draw front-runner bias would strengthen, which hurts the banker further.

CONFIDENCE: **MEDIUM.**
- For: the MC structure is clean and stable (top-5 order identical in 3/3 runs, clear 20% place line). The banker has course-and-distance winning form and Z Purton up. Two of the legs are the market favourites with the best draws.
- Against:
  1. The banker is drawn **12/12** at the Valley over 1,000m, and SCMP flags it.
  2. The market has the banker only 4th favourite (7.8).
  3. The analyzer's time projection has #2 only 4th (+1.07s).
  4. Happy Valley Class 5 races are upset-prone.

CAVEATS:
- **SCMP Place odds and the Q/QP matrix are unusable and were not used.**
  - The SCMP Place column tracks the Win column (e.g. #1 44/48, #2 6.5/7.4, #9 4.6/5.0), which is not credible for place odds.
  - The Q and QP matrices were reported as "presented identically" with no extractable numbers, so the rule 14 cross-reference was skipped.
  - SCMP Win odds were used as a secondary check only.
- **Place odds were estimated** from win odds by the analyzer; only Win odds were used for Strategy B tests.
- **Draw is not explicitly modelled here:** #2 (gate 12), #4 (11) and #7 (10) carry wide draws, and SCMP flags #2 and #4. The skill's SCMP table has no negative-draw entry, so no adjustment was made (Reminder 15: reducer, not exclusion).
- **Internal model inconsistency:** the finish-time projection ranks #12 SOLAR RIVER 3rd (6.9% MC place) and #4 JOLLY COMPANION 9th (41.0% MC place). The Trio ranking follows Win%/Place% as the skill specifies.
- **Scraper log said 1200m**; every other source says 1000m, which was used.
- **Trip changes:** #9 RUNJEET tries 1,000m for the first time (a leg in both tickets). #10 SMART CITY drops from 1,650m ("trip is too sharp").
- **Long layoffs:** #6 (163d, recent throat surgery and lung infection), #5 (140d), #8 (136d) and #1 (95d).
- **Jockey/trainer samples are small** (e.g. L Ferraris 2/11, D J Whyte 0/16 for the 2nd-ranked #9; R Kingscote 0/10).
- **Trio probabilities are Plackett-Luce estimates** fitted to CLI Place%, not direct simulator trio counts (see fit note).
- **Odds snapshot:** 17:55 HKT, 75 minutes before the off. Late moves can change Strategy B (see the late-odds watch).

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#2 ALWAYS MY FOLKS** (MC Win% 28.9%, MC Place% 65.2%) ← 1st by MC Win% (3/3 runs)

Primary legs (MC Place% > 20%): **#9 (58.1%), #11 (55.1%), #4 (41.0%), #7 (39.7%)**

Replaceable legs (MC Place% in 20–30% **AND** Win odds > 10): **none**. The weakest primary leg, #7, is at 39.7% (above the band).

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10): **none**. #8 DIRIYA is exactly **10** in the HKJC snapshot (not < 10); SCMP shows 9.4. The next shortest is #12 at 13.

Action: **no replacement, no addition.**

Final legs: **#9, #11, #4, #7**
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = **6**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $60**

STRATEGY B TICKET (Plackett-Luce fitted to raw MC Place%, sum 300.1%):

| Rank | Horses (any order) | MC Trio% (PL) | Est. Fair Odds ($10) |
|------|--------------------|---------------|----------------------|
| 1 | #2, #9, #11 | 12.58% | $80 |
| 2 | #2, #4, #9 | 7.82% | $128 |
| 3 | #2, #7, #9 | 7.48% | $134 |
| 4 | #2, #4, #11 | 7.06% | $142 |
| 5 | #2, #7, #11 | 6.74% | $148 |
| 6 | #2, #4, #7 | 4.19% | $239 |

**Ticket coverage: 45.9%** (PL on raw MC). The ticket needs only #2 in the frame (MC Place% 65.2%), plus 2 of the 4 legs.

⚠️ **Late-odds watch (Strategy B leg count depends on late prices):**
- **#8 DIRIYA** is 10 in HKJC and 9.4 on SCMP. If it is **< 10** at the off, it becomes a Win-odds candidate. No primary leg is replaceable, so it would be **added directly** → 5 legs → C(5,2) = **10 combos → $100**, adding ~1.8pp of PL coverage (47.7%).
- **#12 SOLAR RIVER (13)** or **#6 / #3 (17)** shortening below 10 → each added directly the same way (+4 combos for the 6th leg).
- The primary legs do not depend on odds: #4 and #7 are well above the 20–30% replaceable band.

**Comparison vs Strategy A.**
- Both strategies pick **the same banker (#2)**, because the SCMP layer did not touch the top 5.
- Strategy B's 6 combos are an **exact subset** of Strategy A's 10. The only difference is Strategy A's 6th pool horse, **#10 SMART CITY** (added by `excuses +2`), which contributes 4 combos worth ~6.2% adjusted coverage for $40.
- **Strategy B ($60, 45.9%)** is the more efficient ticket under the model.
- **Strategy A ($100, 48.1%)** buys a little extra coverage on a horse SCMP says is at the wrong trip.
- Holding both is simply a doubled stake on the six shared combos, not a hedge.
═══════════════════════════════════════════════════════════
