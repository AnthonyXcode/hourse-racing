```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-16 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings among declared runners
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all, 12/12 horses enriched)
SCMP DATA: ✅ Loaded | Star Form / TIR / Trackwork parsed; Vet: none on page (QP/Q matrix: ⚠️ unreliable, see caveats)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, captured 17:55 HKT 16-Sep)
             SCMP odds: ✅ loaded (differ slightly; HKJC used as primary) | HKJC live: ✅ loaded

RACE: R6 — CHUNG HOM KOK HANDICAP | Class 3 | 1650m | Turf | Good | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 31.7%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos
UNIT BET: $10 per combination (fixed)
```

## Data summary

```
Meeting: Happy Valley 2026-09-16 | Going: Good | Surface: Turf
Target Race(s): R6 (Class 3 | 1650m | 12 starters)
Scratchings: none among the 12 runners (SCMP lists STORMI and CALL ME MAGNIFIQUE as scratched; neither is in the field)
Odds coverage: 12 horses with odds
SCMP data: ✅ loaded (no vet reports on page; QP/Q matrix values inconsistent, not used)
```

## SCMP data (Race 6)

| # | Horse | Win / Place (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|--------------------|------------------|----------|----------|-----------|---------------|
| 1 | DAZZLING FIT | 5 / 2.4 | 1600m winner, placed in the Classic Cup, failed from gate 14 in the Derby | +excuses (steadied when crowded) | clear | +trial (strong 2nd in latest trial) | Stalker |
| 2 | POPE CODY | 9 / 2.6 | +form (ran on nicely for 2nd at HV 1800m last start) | clear | clear | — | Closer |
| 3 | ROMANTIC GLADIATOR | 9.2 / 2.9 | +form (2nd, then HV 1650m win, then no-excuse 2nd) | clear | old: blood in trachea (historical) | — | Stalker |
| 4 | WROTE A NEW PAGE | 24 / 5.9 | failed on both tracks for new trainer | bumped at start (1 run, older) | clear | — | — |
| 5 | HIGHLAND RAHY | 11 / 2.9 | +form (front-running 2nd over 1650m) | clear | clear | — | Front-runner |
| 6 | CALL ME TOPSEED | 12 / 4.2 | +form (solid 2nd from behind midfield on closing day) | clear | lame in Dec (>30 days, not applied) | — | Midfield |
| 7 | EMBRACES | 10 / 3.3 | ground-covering 6th | +excuses (wide, no cover) | clear | — | Midfield |
| 8 | SUPER UNICORN | 9.4 / 3.7 | HV 1650m specialist; ran on for 3rd from gate 11 | +excuses (tight, held up) | clear (age 7) | — | Closer |
| 9 | ALL ROUND WINNER | 23 / 6.1 | last-to-6th on dirt | ridden conservatively from wide gate (not an excuse) | clear | — | Back marker |
| 10 | HYMNBOOK | 9.7 / 2.6 | +form (rallying 3rd two runs ago); new trainer, first time at HV | +excuses (heavy contact, held up, steadied) | clear | — | Midfield/keen |
| 11 | VIVA GRACIOUSNESS | 10 / 4.0 | speed-tracking 6th | clear | clear (age 7) | — | On-pace |
| 12 | REFUSETOBEENGLISH | 6.7 / 2.5 | +form (rallied for 2nd, then wove from last to 4th) | +excuses (crowded, steadied, blocked for a run) | clear | — | Closer |

```
───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 1 | DAZZLING FIT | 27.7% | 58.1% | 4.9 | ✅ | ✅ | 10/5/3/6/5/1 | ★ 膽 (Banker) | 1-8: 8.0% (12.5) |
| 8 | SUPER UNICORN | 13.1% | 37.5% | 11 | ✅ | ❌ | 3/9/2/6/9/6 | 腳 (Leg) | 1-8: 8.0% (12.5) |
| 12 | REFUSETOBEENGLISH | 12.3% | 36.0% | 5.3 | ✅ | ✅ | 4/2/8/5/9/6 | 腳 (Leg) | 1-12: 7.5% (13.4) |
| 6 | CALL ME TOPSEED | 11.2% | 34.0% | 15 | ✅ | ❌ | 2/5/14/8/13/11 | 腳 (Leg) | 1-6: 6.6% (15.2) |
| 10 | HYMNBOOK | 9.6% | 29.8% | 8.6 | ✅ | ✅ | 8/3/6/5/12/7 | 腳 (Leg) | 1-10: 6.1% (16.3) |
| 3 | ROMANTIC GLADIATOR | 9.3% | 29.7% | 8.3 | ✅ | ✅ | 2/1/2/6/9/4 | 腳 (Leg) | 1-3: 5.7% (17.4) |
| 5 | HIGHLAND RAHY | 4.6% | 18.7% | 11 | ❌ | ❌ | 2/8/5/9/5/11 | — | — |
| 11 | VIVA GRACIOUSNESS | 3.5% | 14.9% | 13 | ❌ | ❌ | 6/8/9/9/2/4 | — | — |
| 2 | POPE CODY | 3.3% | 14.3% | 8 | ❌ | ✅ | 2/6/3/9/6/6 | 腳 (Leg, added) | — (replacement candidate) |
| 7 | EMBRACES | 2.3% | 11.1% | 12 | ❌ | ❌ | 6/3/3/6/6/4 | — | — |
| 9 | ALL ROUND WINNER | 2.3% | 11.0% | 26 | ❌ | ❌ | 6/8/7/3/1/3 | — | — |
| 4 | WROTE A NEW PAGE | 0.8% | 5.0% | 28 | ❌ | ❌ | 6/11/9/3/6/2 | — | — |

Market: MC and the market agree on the favourite. #1 DAZZLING FIT is 4.9 on HKJC and 27.7% on MC (analyzer: 47% edge on place). MC likes #8 (11) and #6 (15) more than the market does. It rates #2 POPE CODY (8) at only 14.3% place and flags #2, #4 and #7 as overvalued. Overround is 23.6%.

```
───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1 | DAZZLING FIT | 27.7% | 58.1% | trial +2, excuses +2 | trial +2, excuses +2 | 31.7% | 62.1% | 4.9 | Z Purton | Stalker | +trial, +excuses | ★ 膽 (Banker) |
| 12 | REFUSETOBEENGLISH | 12.3% | 36.0% | excuses +2, form +1 | excuses +2, form +1 | 15.3% | 39.0% | 5.3 | K C Leung | Closer | +excuses, +form | 腳 (Leg) |
| 8 | SUPER UNICORN | 13.1% | 37.5% | excuses +2 | excuses +2 | 15.1% | 39.5% | 11 | A Atzeni | Closer | +excuses | 腳 (Leg) |
| 10 | HYMNBOOK | 9.6% | 29.8% | excuses +2, form +1 | excuses +2, form +1 | 12.6% | 32.8% | 8.6 | C Y Ho | Midfield | +excuses, +form | 腳 (Leg) |
| 6 | CALL ME TOPSEED | 11.2% | 34.0% | form +1 | form +1 | 12.2% | 35.0% | 15 | H Y Yuen (-10) | Midfield | +form | 腳 (Leg) |
| 3 | ROMANTIC GLADIATOR | 9.3% | 29.7% | form +1 | form +1 | 10.3% | 30.7% | 8.3 | Y L Chung (-2) | Stalker | +form | 腳 (Leg) |
| 5 | HIGHLAND RAHY | 4.6% | 18.7% | form +1 | form +1 | 5.6% | 19.7% | 11 | L Hewitson | Front | +form | — |
| 2 | POPE CODY | 3.3% | 14.3% | form +1 | form +1 | 4.3% | 15.3% | 8 | A Badel | Closer | +form | — |
| 7 | EMBRACES | 2.3% | 11.1% | excuses +2 | excuses +2 | 4.3% | 13.1% | 12 | C L Chau (-2) | Midfield | +excuses | — |
| 11 | VIVA GRACIOUSNESS | 3.5% | 14.9% | 0 | 0 | 3.5% | 14.9% | 13 | K Teetan | On-pace | — | — |
| 9 | ALL ROUND WINNER | 2.3% | 11.0% | 0 | 0 | 2.3% | 11.0% | 26 | R Kingscote | Back | — | — |
| 4 | WROTE A NEW PAGE | 0.8% | 5.0% | 0 | 0 | 0.8% | 5.0% | 28 | H Bentley | — | — | — |

No horse reached the ±8% / ±10% caps.

Not applied (judgement calls, listed for transparency):
- #4 was bumped at the start in an older run (Race 609). It was one run and not the latest, so it does not count as a repeated barrier issue.
- #9 was told to ride conservatively from a wide gate. That was a riding instruction, not bad luck.
- #6 was lame in December, more than 30 days ago.
- #3 had blood in the trachea in a historical run with no recent vet date.
- #10's "raced keenly" is partly self-inflicted. The +2 excuse rests on the heavy contact at the start and being held up and steadied.

Reasoning: #1 is on 31.7% Adj Win%, inside the 20–35% band, so the race is **Competitive** and uses Mode B. The pool is the top 3 by Adj Win% (#1, #12, #8) plus the next 3 by Adj Place% (#6 35.0%, #10 32.8%, #3 30.7%). Every horse with Adj Place% ≥ 25% is in the pool. #5 (19.7%) is just under the 20% line under Rule 8, so it stays out. #1 has 10 career starts, so it can be the banker. #1 is also the only horse the market and MC both put on top, and it jumps from gate 1. The 2nd-ranked horse, #12, has Adj Place% of 39.0%, below 63%, so the structure is single-banker 膽拖.

Pace: #5 (front-running 2nd last start) and #11 (speed-tracker) should lead. HV 1650m suits stalkers. #1 from gate 1 and #3 should get the box seat or sit just behind the leaders. #8, #12 and #6 are closers. From draws 3 and 5, #8 and #12 need a gap, and #6 needs luck from gate 10. #10 is wide in gate 11 and races keenly, so it is the riskiest leg.

```
───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #1, #12, #8, #6, #10, #3
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #1 DAZZLING FIT (Adj Place% 62.1%) ← locked in every combo
腳 (Legs):  #8, #12, #6, #10, #3
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (independence proxy = product of Adj Place%):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #1, #8, #12 | 9.6% | $105 |
| 2 | #1, #8, #6 | 8.6% | $116 |
| 3 | #1, #12, #6 | 8.5% | $118 |
| 4 | #1, #8, #10 | 8.0% | $124 |
| 5 | #1, #12, #10 | 7.9% | $126 |

(Fair odds are per $10 unit. The product-of-place proxy overstates the true joint probability, so use these for relative ranking only.)

```
───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKETS (banker #1 with every pair of legs):
  1-8-12 (9.6%), 1-8-6 (8.6%), 1-12-6 (8.5%), 1-8-10 (8.0%), 1-12-10 (7.9%),
  1-8-3 (7.5%), 1-12-3 (7.4%), 1-6-10 (7.1%), 1-6-3 (6.7%), 1-10-3 (6.3%)

PASS CONDITIONS:
- If #1 DAZZLING FIT (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider closers (#8, #12, #6) and favour on-pace types
- If #1 drifts past ~8 on final odds (market loses faith after the 6-month layoff) → consider PASS

CONFIDENCE: MEDIUM-LOW
```

CAVEATS:
- **Banker is coming off a long layoff.** #1 last ran on 22-Mar (Derby), 178 days ago, and carries top weight of 135 lb (rating 80, top of Class 3). The trial comment is positive, but fitness is the main risk. MC Place% is 58.1%, under 75%. The research note `notes/2026-09-14-hv-turf-market-agreement-gate.md` warns about HV Turf bankers returning from a break, although here the market does agree (#1 is the 4.9 favourite).
- **Finish-time projection conflicts with Win%.** The analyzer's time projection puts #1 last (+6.49s, based on older and longer races including Group 1 and Derby times) and #12 fastest. The Monte Carlo Win%/Place% ranking drives selection; the projection is not used.
- **Summer-break fitness across the field.** No runner has raced this season. The freshest runners (#6, #8) last ran 63 days ago; #11 was off 140 days and #4 154 days.
- **Odds snapshot.** HKJC odds were captured at 17:55 HKT, before the pool settles. SCMP odds differ slightly (#2 9 vs 8, #8 9.4 vs 11, #7 10 vs 12, #12 6.7 vs 5.3). With SCMP odds, #7 (10) is still not below 10, so the Strategy B legs would not change. MC place odds were estimated from win odds.
- **Scraper distance log.** The analyzer log printed "distance=1200m" while parsing the card, but the simulation and racecard use 1650m, which SCMP confirms.
- **QP/Q matrix.** The SCMP matrix values came back inconsistent (they included a non-existent 12-13 combo), so they were not used for value cross-checks.
- **Vet reports.** SCMP showed no vet section for this race, so no vet adjustments were applied.
- **Going.** Taken from the racecard (Good) and not independently confirmed on race night.

```
───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: #1 DAZZLING FIT (MC Win% 27.7%, MC Place% 58.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #8, #12, #6, #10, #3
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (#10 is 8.6, #3 is 8.3)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #2 POPE CODY (Win odds 8, MC Place% 14.3%)
Action: added directly (no replaceable leg)
Final legs: #8, #12, #6, #10, #3, #2
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET (banker #1 with every pair of legs):
  1-8-12, 1-8-6, 1-12-6, 1-8-10, 1-8-3,
  1-12-10, 1-12-3, 1-6-10, 1-6-3, 1-10-3,
  1-8-2, 1-12-2, 1-6-2, 1-10-2, 1-3-2
  (ordered by raw MC place-product proxy: 7.8%, 7.4%, 7.1%, 6.5%, 6.5%, 6.2%, 6.2%, 5.9%, 5.9%, 5.1%, 3.1%, 3.0%, 2.8%, 2.5%, 2.5%)
```

Comparison: both strategies use the same banker (#1) and the same five core legs. Strategy B also adds #2 POPE CODY because the market has it at 8 even though MC rates it 14.3% place. That adds 5 combos ($150 against $100). The extra combos only pay if #2 fills the frame with #1.

```
═══════════════════════════════════════════════════════════
```
