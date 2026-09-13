═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-13 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings (2 reserves not required)
MC SIMULATION: 10,000 iterations (`analyze-race.ts --form-data all`, 2249 historical races / 2311 horse performances indexed)
HISTORICAL SYNC: ✅ Pre-synced before this run (latest file `results_20260909_HV.json`) — not re-run per instruction
SCMP DATA: ⚠️ Partial — Star Form + TIR + Vet + trackwork loaded for all 14 runners. **SCMP Place column is corrupt** (duplicates Win, e.g. #12 Win 16 / Place 16). QP/Q matrix present but not parseable → quinella cross-check (1e-vi) not performed.
ODDS SOURCE: HKJC early-morning pool (`fetch-odds.ts`, captured **10:08 HKT 13-Sep**; `analyze-race.ts` live fetch at ~10:10 HKT returned identical values), full 14-horse coverage.
             SCMP odds: ⚠️ Win loaded, Place corrupt | HKJC live: ✅ loaded

RACE: R3 HONG TUNG HANDICAP — Class 5 | 1400m | Turf ("B" course) | Good | 14 runners
CLASSIFICATION: **Competitive** — top Adj Win% 25.0% (#12 and #3 tied) | POOL SIZE: 6
MODE: **B: Standard Pool (6)**
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)

Data summary
```
Meeting: Sha Tin 2026-09-13 | Going: Good | Surface: Turf
Target Race: R3 (Class 5 | 1400m | 14 runners)
Scratchings: none
Odds coverage: 14 horses with odds (HKJC)
SCMP data: ⚠️ partial (form/TIR/vet/trackwork ✅, place odds ❌, Q/QP matrix ❌)
```

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Off.Rtg | Age | Draw | Days off | Form (last 6, racecard) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------|-----|------|----------|-------------------------|-------------------|--------------------------|
| 12 | CHILL MASTER     | 23.0% | 53.5% | 16  | ✅ | ❌ | 26 | 5 | 1  | 83  | 8/6/3/4/9/10    | ★ 膽 (Banker) | 3-12: 10.7% (9.3) |
| 3  | DOUBLE BINGO     | 22.0% | 52.7% | 7.8 | ✅ | ✅ | 38 | 6 | 14 | 62  | 1/2/3/2/9/2     | 腳 (Leg) | 8-12: 7.8% (12.8) |
| 8  | HE WAS ME        | 15.5% | 44.2% | 6.9 | ✅ | ✅ | 35 | 6 | 8  | 73  | 3/7/1/8/1/3     | 腳 (Leg) | 3-8: 7.5% (13.3) |
| 9  | COLOURFUL WINNER | 10.8% | 34.1% | 18  | ✅ | ❌ | 31 | 6 | 12 | 83  | 9/9/2/4/10/7    | 腳 (Leg) | 9-12: 5.4% (18.6) |
| 13 | DRACO            | 8.3%  | 29.0% | 7.2 | ✅ | ✅ | 26 | 6 | 3  | 62  | 9/4/8/3/8/3     | 腳 (Leg) | 3-9: 5.3% (18.8) |
| 4  | MADE FOR LIFE    | 7.0%  | 25.2% | 7.8 | ✅ | ✅ | 38 | 5 | 6  | 70  | 4/8/6/10/13/10  | 腳 (Leg) | — |
| 14 | SPEEDY TRIDENT   | 4.9%  | 20.8% | 7.5 | ✅ | ✅ | 26 | 6 | 10 | 62  | 3/2/5/9/14/9    | 腳 (Leg) | — |
| 5  | VERBIER          | 4.2%  | 17.9% | 30  | ❌ | ❌ | 38 | 6 | 9  | **6** | 11/3/1/3/7/4  | — | — |
| 11 | PERFECT PEACH    | 2.0%  | 9.1%  | 21  | ❌ | ❌ | 29 | **8** | 5 | **136** | 11/10/10/13/2/1 | — | — |
| 2  | GLORIOUS RYDER   | 1.0%  | 4.8%  | 32  | ❌ | ❌ | 39 | 5 | 13 | 70  | 10/11/12/8/13/1 | — | — |
| 10 | FORTUNE KINGO    | 0.7%  | 4.8%  | 12  | ❌ | ❌ | 31 | 5 | 2  | 73  | 6/10/10/5/11/11 | — | — |
| 1  | GRAND TURBO      | 0.4%  | 2.5%  | 28  | ❌ | ❌ | 40 | 4 | 4  | 70  | 7/9/8/4/13/13   | — | — |
| 6  | SILVER UP        | 0.1%  | 0.6%  | **6.1** | ❌ | ✅ | 37 | 7 | 11 | 62 | 6/4/5/9/9/3 | 腳 (Leg — added, Win-odds rule) | — (replacement candidate) |
| 7  | WINNING NOW      | 0.1%  | 0.7%  | 25  | ❌ | ❌ | 37 | 5 | 7  | 80  | 9/9/4/2/6/11    | — | — |

**Market:** overround 22.7%. The model and the market disagree sharply at both ends:
- **#12 CHILL MASTER** is the MC's #1 (23.0%) but only 8th in the betting at 16 (≈5.1% implied after overround). MC flags it "undervalued by 268%", the largest edge call in the race.
- **#6 SILVER UP** is the market favourite (6.1, ≈13.4% implied), but the MC gives it 0.1% win / 0.6% place. That is the largest divergence in the race, and only Strategy B covers it.

The MC's top five (#12, #3, #8, #9, #13) are four of the market's top six plus #12; the market's other short-priced runners (#14 7.5, #4 7.8) sit 6th–7th in the MC.

**MC stability check (banker-critical).** #12 and #3 are 1.0pp apart in the canonical run. Five further 10k runs on the identical saved snapshot put #12 first **5/5** (avg 22.7% vs 22.1%; place 53.4% each). One earlier single re-run flipped them (22.3% vs 22.7%). Treat the top two as a statistical near-tie with a slight, consistent #12 lean.

───────────────────────────────────────────────────────────
RACE 3 SCMP DATA
───────────────────────────────────────────────────────────

| # | Horse | Win (SCMP) | Place (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------|--------------|------------------|----------|----------|-----------|---------------|
| 1  | GRAND TURBO      | 26  | ❌ corrupt | ran on without threatening ×3 | **−notRO** ("after travelling a short distance was eased", R834) | clear | — | Closer (came from last) |
| 2  | GLORIOUS RYDER   | 23  | ❌ | struggled five times since March win | clear | clear | — | Closer (dashed late) |
| 3  | DOUBLE BINGO     | 9.1 | ❌ | **+form** (rallied 4th in April, then placed four times) | **+excuses** (crowded 1200M, steadied 1000M, R848) | clear | — | Stalker/rallier |
| 4  | MADE FOR LIFE    | 8.8 | ❌ | came from near last for 4th after downgrade | **+excuses** (no clear running approaching 300M, R828); jumped only fairly (×1) | clear | — | Closer |
| 5  | VERBIER          | 27  | ❌ | **+form** (wire-to-wire ST 1200m win in June, then set pace for 3rd) | rider explanation: obliged to lead, failed to finish off (R001) — no penalty | clear (post-race no findings) | — | Front-runner |
| 6  | SILVER UP        | 6   | ❌ | prominently ridden 5th for new trainer | jumped awkwardly (×1), wide-barrier early | clear | — | On-pace |
| 7  | WINNING NOW      | 23  | ❌ | front-running SH 2nd in April, tired on the speed | **+excuses** (crowded on jumping, R800); rider explanation re not finishing off — no penalty | clear | — | Front-runner |
| 8  | HE WAS ME        | 6.4 | ❌ | **+form** (speed-tracking win in March, then made all) | bumped at start (×1) | clear | **+trial** (Conghua trial win) | On-pace / leader |
| 9  | COLOURFUL WINNER | 17  | ❌ | bled when 2nd on dirt 1200m, non-factor twice since | clear | clear (bleed history, no current vet entry) | — | Midfield |
| 10 | FORTUNE KINGO    | 13  | ❌ | beat a couple behind midfield | bumped at start (×1) | clear | — | Midfield |
| 11 | PERFECT PEACH    | 21  | ❌ | veteran; blood in trachea in 2 of 4 defeats | bumped after 250M (R645) | EIPH 29/04 (passed 22/06 — 83 days); **−age** "Eight years of age or above" (passed 19/08) | — | Midfield |
| 12 | CHILL MASTER     | 16  | ❌ | rallied for minor cheques ×4 early last term; **+excuses** (OK 8th after a wide trip, last start) | none | clear | — | Rallier / closer |
| 13 | DRACO            | 7   | ❌ | rallied 3rd in October; mile 3rds ×2 for new trainer | **+excuses** (held up 400M–100M, R848) | clear | — | Closer |
| 14 | SPEEDY TRIDENT   | 7.7 | ❌ | **+form** (turned things around — minor cheques at final 3 starts) | **+excuses** (steadied when crowded 1000M, R848) | clear | — | — |

Tipster picks ignored. SCMP Win prices track HKJC closely, but the same six horses are under 10 in both sources, so the Strategy B flags are unaffected by source.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1  | 12 | CHILL MASTER     | 23.0% | 53.5% | excuses +2 | excuses +2 | **25.0%** | 55.5% | 16  | C Y Ho | Close | +excuses (wide trip) | ★ 膽 (Banker) |
| 2  | 3  | DOUBLE BINGO     | 22.0% | 52.7% | excuses +2, +form +1 | excuses +2, +form +1 | **25.0%** | 55.7% | 7.8 | H Y Yuen (-10) | Stalk | +excuses, +form; gate 14 | 腳 (Leg) |
| 3  | 8  | HE WAS ME        | 15.5% | 44.2% | trial +2, +form +1 | trial +2, +form +1 | 18.5% | 47.2% | 6.9 | A Atzeni | Front | +trial, +form | 腳 (Leg) |
| 4  | 9  | COLOURFUL WINNER | 10.8% | 34.1% | 0 | 0 | 10.8% | 34.1% | 18  | J Orman | Stalk | bleed history (info only) | 腳 (Leg) |
| 5  | 13 | DRACO            | 8.3%  | 29.0% | excuses +2 | excuses +2 | 10.3% | 31.0% | 7.2 | K C Leung | Close | +excuses (held up) | 腳 (Leg) |
| 6  | 4  | MADE FOR LIFE    | 7.0%  | 25.2% | excuses +2 | excuses +2 | 9.0% | 27.2% | 7.8 | Z Purton | Close | +excuses (no clear run) | 腳 (Leg) |
| 7  | 14 | SPEEDY TRIDENT   | 4.9%  | 20.8% | excuses +2, +form +1 | excuses +2, +form +1 | 7.9% | 23.8% | 7.5 | K Teetan | — | +excuses, +form | out (23.8% < 25%) |
| 8  | 5  | VERBIER          | 4.2%  | 17.9% | +form +1 | +form +1 | 5.2% | 18.9% | 30  | E C W Wong (-3) | Front | +form | out |
| 9  | 7  | WINNING NOW      | 0.1%  | 0.7%  | excuses +2 | excuses +2 | 2.1% | 2.7% | 25  | P N Wong (-7) | Front | +excuses (crowded start) | out |
| 10 | 2  | GLORIOUS RYDER   | 1.0%  | 4.8%  | 0 | 0 | 1.0% | 4.8% | 32  | L Ferraris | Close | — | out |
| 11 | 10 | FORTUNE KINGO    | 0.7%  | 4.8%  | 0 | 0 | 0.7% | 4.8% | 12  | C L Chau (-2) | Stalk | — | out |
| 12 | 6  | SILVER UP        | 0.1%  | 0.6%  | 0 | 0 | 0.1% | 0.6% | 6.1 | M L Yeung | On-pace | — | out (see caveat 2) |
| 13 | 11 | PERFECT PEACH    | 2.0%  | 9.1%  | -age −2 | -age −2 | 0.0% | 7.1% | 21  | L Hewitson | Stalk | −age (vet) | out |
| 14 | 1  | GRAND TURBO      | 0.4%  | 2.5%  | -notRO −2 | -notRO −2 | 0.0% | 0.5% | 28  | R Kingscote | Close | −notRO (eased) | out |

**Factor legend:** `+form +1`, `trial +2`, `excuses +2`, `-notRO −2`, `-age −2`. Adj Place% mirrors the Win factor (no injury-specific −4 applies this race). Negatives are floored at 0.0%. No caps are hit; the largest is +3, on #3, #8 and #14. Adj Win% is not renormalised (sums to 115.6%).

**Adjustment calls:**
- **#11 PERFECT PEACH:** no `-injury30d`. The EIPH clearance was 22/06 (83 days). The 19/08 pass is the 8-year-old age exam, which triggers `-age` (vet text "Eight years of age or above"; Class 5 treated as within the "C3+" band).
- **#5 VERBIER and #7 WINNING NOW:** no `-notRO`. Their stewards' entries are rider explanations for tiring after being forced to lead, not an eased or conservative ride. This matches the 06-Sep treatment of rider explanations.
- **#1 GRAND TURBO:** "was eased" counts as `-notRO`.
- **Single barrier incidents (#4, #6, #8, #10):** no `-barrier`, which requires 2 or more.
- **`+form` scope:** applied only where the keyword run belongs to the current form cycle (#3, #5, #8, #14). It was not applied where Star Form places the rally explicitly in the distant past: #12 ("first six runs last term"), #13 ("in October"), #10 ("first 10 Sha Tin starts").

**Tie at the top (25.0% = 25.0%).** It is broken by raw MC Win% (#12 23.0% > #3 22.0%), per Reminder 12 that the MC is the primary model and SCMP does not override it. The 5/5 repeat-run lean also favours #12. Adj Place% would favour #3 by 0.2pp, which is inside simulation noise. Banker eligibility: #12 has 10 recorded starts, so it is not a debutant.

**Reasoning:** The race is a near two-horse MC tie (#12, #3) over a second tier of #8 (with the only positive trial of the race) and three consistent place types (#9, #13, #4).
- **Pace:** four on-pace or front-running types (#5 d9, #7 d7, #8 d8, #6 d11) should give a genuine tempo at 1400m. That suits the ralliers/closers: #12 (gate 1, can save ground), #13 (gate 3) and #4.
- **#3 DOUBLE BINGO** has the widest gate (14). The MC already prices this through its draw factor (−0.04); per Reminder 15 it is a reducer, not an exclusion.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #12, #3, #8, #9, #13, #4
MODE: B | POOL SIZE: 6
Mode B build: top 3 by Adj Win% (#12, #3, #8) + next 3 by Adj Place% (#9 34.1, #13 31.0, #4 27.2).
Must-include (Adj Place% ≥ 25%): #12, #3, #8, #9, #13, #4 — **exactly the six, exactly the pool** ✅. The next horse, #14 SPEEDY TRIDENT at 23.8%, is below the bar (see caveat 4).

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#12 CHILL MASTER** (Adj Place% 55.5%) ← locked in every combo
腳 (Legs):  #3, #8, #9, #13, #4
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**
雙膽拖 check: 2nd-ranked #3 Adj Place% 55.7% < 63% → single banker.

TOP TRIO COMBINATIONS (MC joint trio probability, raw; avg of 5 × 10k runs on the saved snapshot):
| Rank | Horses (any order) | MC Trio % | Fair odds | Fair $10 dividend |
|------|--------------------|-----------|-----------|-------------------|
| 1  | #3, #8, #12  | 6.10% | 16.4 | $164 |
| 2  | #3, #9, #12  | 4.47% | 22.4 | $224 |
| 3  | #3, #12, #13 | 3.88% | 25.8 | $258 |
| 4  | #3, #4, #12  | 3.14% | 31.8 | $318 |
| 5  | #8, #9, #12  | 3.08% | 32.4 | $324 |
| 6  | #8, #12, #13 | 2.67% | 37.5 | $375 |
| 7  | #4, #8, #12  | 2.21% | 45.2 | $452 |
| 8  | #9, #12, #13 | 1.92% | 52.0 | $520 |
| 9  | #4, #9, #12  | 1.59% | 62.7 | $627 |
| 10 | #4, #12, #13 | 1.30% | 76.7 | $767 |

The #1 combination overall in the MC is 3-8-12 (6.10%). The best combination not containing the banker is 3-8-9 (3.12%), the price paid for the banker structure.

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: **$100**
MC TICKET HIT PROBABILITY: **30.4%** (sum of the 10 combos above). The banker ceiling is #12 top-3 at ≈53%.

HKJC BET SLIP: Race 3 → Trio → 膽拖 → 膽: 12 | 腳: 3, 4, 8, 9, 13 | $10/combo

TOP COMBINATIONS (highest value):
  3-8-12 (6.10%), 3-9-12 (4.47%), 3-12-13 (3.88%), 3-4-12 (3.14%), 8-9-12 (3.08%)
  → the #12 + #3 core accounts for 17.6 of the ticket's 30.4 points.

PASS CONDITIONS:
- If **#12 CHILL MASTER** (banker) is scratched → **VOID** the ticket (Reminder 10); do not restructure.
- If #3 DOUBLE BINGO is scratched → promote #14 SPEEDY TRIDENT (next by Adj Place%, 23.8%) into its leg slot.
- If field drops below 3 → pool refunded.
- If going moves to Yielding or worse → re-run MC. #12 has a positive going preference (+0.1) but #3 is negative (−0.28).
- If **#12 drifts beyond ~25** while #6 SILVER UP firms below 5, the market is rejecting the banker outright. Consider Strategy B or passing the race.

CONFIDENCE: **LOW**
The race classifies as Competitive and the ticket is cheap, but confidence is low for three reasons. The banker is only 8th in the betting (16). The MC's banker top-3 rate is ≈53%, so the banker fails roughly one time in two. And the model's top two are a statistical near-tie.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#12 CHILL MASTER** (MC Win% 23.0%, MC Place% 53.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3 (52.7%), #8 (44.2%), #9 (34.1%), #13 (29.0%), #4 (25.2%), #14 (20.8%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **none**. The three legs in the 20–30% band all have Win odds under 10: #13 (7.2), #4 (7.8), #14 (7.5).
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **#6 SILVER UP** (Win odds 6.1, MC Place% 0.6%)
Action: **#6 added directly** (no replaceable leg exists)
Final legs: **#3, #4, #6, #8, #9, #13, #14**
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = **21**
UNIT BET: $10 (fixed)
TOTAL STAKE: **$210**
MC TICKET HIT PROBABILITY: **38.0%**. The #14 combos add 7.6pts. The six #6 combos add ≈0.0pts under the MC, since their value is entirely the market's view of #6.

STRATEGY B TICKET: 膽 12 | 腳 3, 4, 6, 8, 9, 13, 14 → 21 combos:
3-4-12, 3-6-12, 3-8-12, 3-9-12, 3-12-13, 3-12-14, 4-6-12, 4-8-12, 4-9-12, 4-12-13, 4-12-14, 6-8-12, 6-9-12, 6-12-13, 6-12-14, 8-9-12, 8-12-13, 8-12-14, 9-12-13, 9-12-14, 12-13-14

HKJC BET SLIP: Race 3 → Trio → 膽拖 → 膽: 12 | 腳: 3, 4, 6, 8, 9, 13, 14 | $10/combo

**A vs B comparison:** Both use the same banker. B is Strategy A plus two legs:
- **#14**, a primary leg under B's 20% threshold but just below A's 25% bar. It adds +7.6pts of MC hit probability for $50.
- **#6 SILVER UP**, the market favourite that the MC rates as having almost no chance. It costs $60 and the MC rates it as adding nothing.

B costs $110 more (+110%) for +7.6pts of MC coverage (30.4% → 38.0%). If you trust the market's view of #6 over the model's, B is the ticket. If you trust the model, A is the more efficient ticket. Neither ticket survives a banker failure (≈47%).

───────────────────────────────────────────────────────────
CAVEATS
───────────────────────────────────────────────────────────
1. **SCMP place odds are corrupt** (Place duplicates Win for every runner, same fault as the 06-Sep meeting). The SCMP QP/Q matrix could not be parsed, so the step 1e-vi quinella cross-check was not performed. HKJC odds were used throughout.
2. **Model vs market divergence.**
   - #12 (banker): MC 23.0% vs market ≈5.1%.
   - #6 SILVER UP: market favourite at 6.1 but MC 0.1% win. It is omitted from Strategy A by the model (no negative SCMP flags, so Reminder 9 is not engaged) and is covered only by Strategy B.
   - Prior meetings documented a class-of-recent-form bias in the MC. This is a Class 5 field, though, and #6 (rating 37) is not a class-dropper, so the cause of this gap is unexplained.
3. **Banker near-tie.** Adj Win% is tied (25.0%) and was broken by raw MC Win%. Repeat runs favour #12 (5/5), but one single re-run flipped the order. Swapping the banker to #3 over the same 6 legs gives an essentially identical MC hit rate (37.9% vs 38.0%).
4. **Skill inconsistencies.**
   - The must-include bar is Adj Place% ≥ 25% (4c / A/B table) but ≥ 20% in Reminder 8. The 25% bar was followed, per the 06-Sep R5/R10 precedent, so #14 (23.8%) is excluded from A. Under the 20% reading, A would become 7 horses / 15 combos / $150.
   - The 雙膽拖 threshold is quoted as both 63% and 70%. This is moot here (#3 55.7%).
5. The scraper logged `parsed class=Class 5, distance=1200m`, but the analysis used **1400m**: the MC header, saved snapshot and finish-time projection all show 1400m, and SCMP confirms it. No effect, but the log line is misleading.
6. The finish-time projection contradicts the MC win ranking (it puts #3 20.2L behind the leaders) and was ignored, as in prior reports.
7. `careerStarts` is 0 for every runner in the racecard (field unpopulated). Banker eligibility was checked from `pastPerformances` (#12: 10 runs). `winningMargin` still duplicates `finishPosition` in the form data. Racecard last-6 strings for #3 do not fully reconcile with the SCMP Star Form.
8. Trio probabilities are **raw MC** (SCMP adjustments are not propagated into joint probabilities). They are averaged from 5 × 10k re-runs on the saved snapshot, separate from the canonical `analyze-race.ts` run (top-two Win% within ±0.5pp).
9. Early-season race: most runners are first-up after 62–84 days. #11 is off 136 days. #5 VERBIER ran 6 days ago (11th). #9 has a bleed history (no current vet entry, no adjustment).
10. Odds are the 10:08 HKT morning pool and will move. Re-check #12 and #6 before the jump (see pass conditions).
═══════════════════════════════════════════════════════════
