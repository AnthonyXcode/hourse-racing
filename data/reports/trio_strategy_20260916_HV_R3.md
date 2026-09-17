```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-16 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all, 12/12 horses enriched)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed (QP/Q matrix: ⚠️ partial, see caveats)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, captured 17:55 HKT 16-Sep)
             SCMP odds: ✅ loaded (differ from HKJC capture; HKJC used as primary) | HKJC live: ✅ loaded

RACE: R3 — BIG WAVE BAY HANDICAP | Class 4 | 1800m | Turf | Good | 12 runners
CLASSIFICATION: Dominant (top Adj Win% 36.0%) | POOL SIZE: 6
MODE: A: Tight Pool (5) + #10 added under Rule 8 (Adj Place% ≥ 20%)
BET STRUCTURE: 雙膽拖 2膽 + 4腳 = 4 combos
UNIT BET: $10 per combination (fixed)
```

## Data summary

```
Meeting: Happy Valley 2026-09-16 | Going: Good | Surface: Turf
Target Race(s): R3 (Class 4 | 1800m | 12 starters)
Scratchings: none (reserves #R SUPREME MASTERMIND, #R SUPER GOLDENDRAGON not running)
Odds coverage: 12 horses with odds
SCMP data: ✅ loaded (QP/Q matrix partially extracted)
```

## SCMP data (Race 3)

| # | Horse | Win Odds (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------------|------------------|----------|----------|-----------|---------------|
| 1 | NOISY BOY | 4.2 | no-excuse 7th last; "gate is a hurdle" (draw 12) | steadied (but Star Form: no excuse) | clear | +trial (won trial comfortably) | — |
| 2 | JUMBO STEPS | 20 | closing 7th | bumped on jumping (1 run) | clear | — | Closer |
| 3 | SERANGOON | 10 | +form (rallied to win; last-to-third latest) | jumped only fairly | clear | — | Closer |
| 4 | FLUORESCENCE | 45 | still to menace | bumped | clear | — | Midfield |
| 5 | ROMANTIC LAOS | 6.8 | resumed closing 5th last Wed (veteran) | shifted behind runners | clear | — | Closer |
| 6 | ROSEWOOD FLEETFOOT | 4.8 | +form (rallied 2nd, back-to-back wins) | +excuses (raced wide without cover) | clear | — | On-pace |
| 7 | ROMANTIC FANTASY | 13 | placings, ran on | +excuses (caught wide, steadied) | clear | — | Stalker/Closer |
| 8 | FAMILY FORTUNE | 15 | class-record 1650m win, then failed up in grade | +excuses (crowded, held up) | clear | — | — |
| 9 | CAN'T GO WONG | 11 | consistent minor placings | bumped (1 run) | -age (8+ yrs) | — | — |
| 10 | STAR BROSE | 8.4 | ran on for 4th and 2nd | steadied when racing keenly (self-inflicted, not applied) | clear | — | Closer |
| 11 | SMILING ONE | 28 | never likely | -perf (unacceptable, tailed out) | -perf (passed 31/08) | — | Back marker |
| 12 | OCEAN IMPACT | 13 | midfield; light weight | disappointing, responded only fairly | clear | — | Midfield |

```
───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 8 | FAMILY FORTUNE | 34.0% | 70.0% | 19 | ✅ | ❌ | 8/1/4/3/1/5 | ★ 膽 (Banker) | 6-8: 23.6% (4.2) |
| 6 | ROSEWOOD FLEETFOOT | 30.3% | 67.1% | 6.9 | ✅ | ✅ | 1/1/2/7/5/9 | 腳 (Leg) | 3-6: 7.1% (14.1) |
| 3 | SERANGOON | 9.3% | 34.7% | 10 | ✅ | ❌ | 3/10/9/6/7/1 | 腳 (Leg) | 3-8: 7.8% (12.9) |
| 1 | NOISY BOY | 8.6% | 33.9% | 3.2 | ✅ | ✅ | 7/5/11/4/7/5 | 腳 (Leg) | 1-8: 7.7% (13.0) |
| 5 | ROMANTIC LAOS | 6.5% | 27.5% | 6.6 | ✅ | ✅ | 5/2/7/5/7/6 | 腳 (Leg) | — |
| 10 | STAR BROSE | 5.2% | 24.1% | 6.4 | ✅ | ✅ | 2/4/9/6/3/2 | 腳 (Leg) | — |
| 4 | FLUORESCENCE | 1.6% | 9.3% | 53 | ❌ | ❌ | 11/7/14/12/14/11 | — | — |
| 7 | ROMANTIC FANTASY | 1.4% | 9.2% | 15 | ❌ | ❌ | 5/8/14/1/5/3 | — | — |
| 12 | OCEAN IMPACT | 1.3% | 7.6% | 17 | ❌ | ❌ | 8/6/6/4/9/11 | — | — |
| 11 | SMILING ONE | 0.8% | 4.9% | 41 | ❌ | ❌ | 13/8/10/8/14/12 | — | — |
| 9 | CAN'T GO WONG | 0.7% | 6.0% | 12 | ❌ | ❌ | 3/3/10/5/11/4 | — | — |
| 2 | JUMBO STEPS | 0.6% | 5.7% | 15 | ❌ | ❌ | 11/11/7/5/9 | — | — |

Other MC top quinella: 1-6: 6.6% (15.2).

Market: Strong model/market disagreement. MC makes #8 (19) and #6 (6.9) a clear top two (6-8 quinella 23.6%); the market favourite is #1 NOISY BOY (3.2), which MC rates only 8.6% win / 33.9% place. Overround 23.7%. MC flags #8 as undervalued by 545% and #6 by 109%.

```
───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 8 | FAMILY FORTUNE | 34.0% | 70.0% | excuses +2 | excuses +2 | 36.0% | 72.0% | 19 | C Y Ho | — | +excuses | ★ 膽 (Banker 1) |
| 6 | ROSEWOOD FLEETFOOT | 30.3% | 67.1% | excuses +2, form +1 | excuses +2, form +1 | 33.3% | 70.1% | 6.9 | K Teetan | On-pace | +excuses, +form | ★ 膽 (Banker 2) |
| 1 | NOISY BOY | 8.6% | 33.9% | trial +2 | trial +2 | 10.6% | 35.9% | 3.2 | Z Purton | — | +trial | 腳 (Leg) |
| 3 | SERANGOON | 9.3% | 34.7% | form +1 | form +1 | 10.3% | 35.7% | 10 | B Avdulla | Closer | +form | 腳 (Leg) |
| 5 | ROMANTIC LAOS | 6.5% | 27.5% | 0 | 0 | 6.5% | 27.5% | 6.6 | C L Chau (-2) | Closer | — | 腳 (Leg) |
| 10 | STAR BROSE | 5.2% | 24.1% | 0 | 0 | 5.2% | 24.1% | 6.4 | M L Yeung | Closer | — | 腳 (Leg) |
| 7 | ROMANTIC FANTASY | 1.4% | 9.2% | excuses +2 | excuses +2 | 3.4% | 11.2% | 15 | A Badel | Stalker | +excuses | — |
| 4 | FLUORESCENCE | 1.6% | 9.3% | 0 | 0 | 1.6% | 9.3% | 53 | M Chadwick | Midfield | — | — |
| 12 | OCEAN IMPACT | 1.3% | 7.6% | 0 | 0 | 1.3% | 7.6% | 17 | Y L Chung (-2) | Midfield | — | — |
| 2 | JUMBO STEPS | 0.6% | 5.7% | 0 | 0 | 0.6% | 5.7% | 15 | H Bentley | Closer | — | — |
| 9 | CAN'T GO WONG | 0.7% | 6.0% | -age −2 | -age −2 | 0.0% | 4.0% | 12 | M F Poon | — | -age | — |
| 11 | SMILING ONE | 0.8% | 4.9% | -perf −2 | -perf −2 | 0.0% | 2.9% | 41 | R Kingscote | Back | -perf | — |

Adjustments floored at 0%. None hit the ±8% / ±10% caps.

Not applied (judgement calls, noted for transparency): #1 TIR "steadied" was not scored as an excuse because Star Form calls the run "no-excuse". #10 "steadied when racing keenly" was self-inflicted, so no excuse. Wide-gate comments (#1 gate 12, #8 gate 11) are mentioned but not in the adjustment table.

Reasoning: #8 (36.0%) is above the 35% Dominant threshold, so Mode A applies: the banker plus the 4 contenders by Adj Place%. Those are #6, #1, #3 and #5, which are also the horses that must be included at Adj Place% ≥ 25%. #10 (24.1%, 6.4 odds) comes in under Rule 8 (Adj Place% ≥ 20% must be in the pool), making the pool 6. #8 has 10+ starts, so it can be the banker. #6's Adj Place% of 70.1% is at least 63%, so #6 becomes the 2nd banker (雙膽拖). The pace picture over 1800m at HV favours stalkers. #6 made early moves to win back-to-back over 2200m. #3, #5 and #10 are closers who need clean runs from middle or inside draws (5, 3, 7).

```
───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #8, #6, #1, #3, #5, #10
MODE: A (+Rule 8 inclusion) | POOL SIZE: 6

雙膽拖 STRUCTURE:
膽 (Banker 1): #8 FAMILY FORTUNE (Adj Place% 72.0%) ← locked in every combo
膽 (Banker 2): #6 ROSEWOOD FLEETFOOT (Adj Place% 70.1%) ← locked in every combo
腳 (Legs):  #1, #3, #5, #10
BET STRUCTURE: 雙膽拖 | 2膽 + 4腳 | COMBINATIONS: 4
```

TOP TRIO COMBINATIONS (independence proxy = product of Adj Place%):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #8, #6, #1 | 18.1% | $55 |
| 2 | #8, #6, #3 | 18.0% | $56 |
| 3 | #8, #6, #5 | 13.9% | $72 |
| 4 | #8, #6, #10 | 12.2% | $82 |
| 5 | #8, #1, #3 (not on ticket) | 9.2% | $108 |

(Fair odds shown per $10 unit. The product-of-place proxy overstates the true joint probability, so treat these as a relative ranking only.)

```
───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 4 (雙膽拖: 2 bankers + 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $40

TICKETS:
  8-6-1, 8-6-3, 8-6-5, 8-6-10

PASS CONDITIONS:
- If #8 FAMILY FORTUNE or #6 ROSEWOOD FLEETFOOT (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (#6 has placed on a wet track, so it is less affected)
- If #8 drifts well past 20 on final odds → consider dropping to single-banker 膽拖 on #6 or passing (market disagreement, see caveats)

CONFIDENCE: MEDIUM-LOW
```

CAVEATS:
- **Model/market disagreement on the banker.** #8 is 19 on the HKJC pool while MC makes it 34% to win. #1 is the 3.2 favourite but only 8.6% on MC. Research note `notes/2026-09-14-hv-turf-market-agreement-gate.md` found that HV Turf losses in Sep 2026 came from exactly this pattern: a form pick that was not the favourite, MC Place% under 75%, and a return from a summer break. #8 fits all three (MC Place% 70.0%, 77 days since last run on 01-Jul). #6 has been off 84 days.
- **雙膽拖 is high-risk.** Both bankers must place. The rough joint probability is 0.72 × 0.70 ≈ 50%, and less if the two are correlated with the market.
- **Summer-break fitness.** 10 of 12 runners last ran in June or July. Only #5 has had a run this season (09-Sep).
- **Odds snapshot.** HKJC odds were captured at 17:55 HKT, before the pool settles. SCMP odds differed (for example #8 was 15 on SCMP and 19 on HKJC; #1 was 4.2 and 3.2). MC place odds were estimated from win odds.
- **Scraper distance log.** The analyzer log printed "distance=1200m" while parsing the card, but the simulation ran on 1800m. SCMP confirms 1800m, so no impact is expected.
- **Finish-time projection conflicts with Win%.** The analyzer's finish-time projection puts #12 OCEAN IMPACT fastest (1:48.72) despite only 1.3% win. That projection is not used for selection.
- **QP/Q matrix.** SCMP publishes the matrices, but the extracted values were inconsistent (for example 1-5 at 4.2), so they were not used for value cross-checks.
- **Going.** Going is taken from the racecard (Good) and was not independently confirmed on race night.

```
───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: #8 FAMILY FORTUNE (MC Win% 34.0%, MC Place% 70.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6, #3, #1, #5, #10
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (#5 is 6.6, #10 is 6.4)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
Action: no replacement / no addition
Final legs: #6, #3, #1, #5, #10
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET (banker #8 with every pair of legs):
  8-6-3, 8-6-1, 8-6-5, 8-6-10, 8-3-1,
  8-3-5, 8-1-5, 8-3-10, 8-1-10, 8-5-10
  (ordered by raw MC place-product proxy: 16.3%, 15.9%, 12.9%, 11.3%, 8.2%, 6.7%, 6.5%, 5.9%, 5.7%, 4.6%)
```

Comparison: both strategies use the same 6 horses. Strategy A adds #6 as a second banker (Adj Place% 70.1% ≥ 63%), which cuts the ticket to 4 combos ($40), but it loses if #6 misses the top 3. Strategy B uses only #8 as banker, so it costs $100 for 10 combos and still pays when #6 misses and #8 fills the frame with two of #1, #3, #5 and #10.

```
═══════════════════════════════════════════════════════════
```
