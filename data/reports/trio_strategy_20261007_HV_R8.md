# Trio (單T) Strategy — Happy Valley 2026-10-07 Race 8

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-07 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey + trainer stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; SCMP Place column looks mis-parsed; no Q/QP matrix)
ODDS SOURCE: HKJC pool (live win odds pulled by analyze-race.ts, captured ~11:19 HKT 07-Oct;
             early file data/odds/odds_20261007_HV.json captured 11:01 HKT is near-identical)
             SCMP odds: ⚠️ Win column read, Place column mis-parsed (not used) | HKJC: ✅ loaded

RACE: R8 — Class 3 | 1650m | Turf | Good to Firm | 12 runners — HING FAT HANDICAP
CLASSIFICATION: Competitive (top Adj Win% 31.4%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 雙膽拖 | 2膽 + 4腳 | COMBINATIONS: 4
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-07 | Going: Good to Firm | Surface: Turf
Target Race(s): R8 (Class 3 | 1650m | 12 runners)
Scratchings: none among the 12 declared runners (SCMP lists reserves R. WIN METHOD and R. VIOLET STAR; neither is in the field)
Odds coverage: 12 horses with odds (HKJC win; place estimated from win by the tool)
SCMP data: ⚠️ partial
Form gaps: no debutants. #6 CALL ME TOPSEED has 7 runs in the DB and #4 DO YOU JUST has 8. Everyone else has 9-10.
           Layoffs: #3 PRESTIGE GOOD last ran 03-May (157 days), #9 AUDACIOUS PURSUIT 10-Jun (119 days),
           #11 URANUS STAR 21-Jun (108 days), #7 LEGEND WINNER 24-Jun (105 days), #4 DO YOU JUST 08-Jul (91 days).
           All of them are >90 days.
Note: the scraper log printed "distance=1200m" during parsing, but the saved racecard and the MC run both use 1650m (confirmed by SCMP).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | POPE CODY | 30.4% | 66.8% | 6.9 | ✅ | ✅ | 1/2/6/3/9/6 | ★ 膽 (Banker) | 1-2: 19.8% (5.1) |
| 1 | DAZZLING FIT | 28.5% | 64.2% | 4.7 | ✅ | ✅ | 2/10/5/3/6/5 | 腳 (Leg) | 1-2: 19.8% (5.1) |
| 10 | FLYING FORTUNE | 13.7% | 44.4% | 12 | ✅ | ❌ | 7/1/4/3/12/6 | 腳 (Leg) | 2-10: 10.5% (9.6) |
| 5 | RUN RUN SMART | 7.0% | 27.4% | 17 | ✅ | ❌ | 5/5/2/1/3/14 | 腳 (Leg) | 2-5: 5.3% (19.0) |
| 12 | REFUSETOBEENGLISH | 5.8% | 23.7% | 5.8 | ✅ | ✅ | 12/4/2/8/5/9 | 腳 (Leg) | — |
| 9 | AUDACIOUS PURSUIT | 5.2% | 24.1% | 17 | ✅ | ❌ | 7/1/9/13/2/2 | 腳 (Leg) | — |
| 6 | CALL ME TOPSEED | 5.0% | 21.7% | 27 | ✅ | ❌ | 8/2/5/14/8/13 | — (replaced by #4) | — |
| 8 | RISING PHOENIX | 2.0% | 11.4% | 20 | ❌ | ❌ | 13/1/7/8/4/5 | — | — |
| 4 | DO YOU JUST | 1.1% | 6.2% | 5.3 | ❌ | ✅ | 3/9/7/1/6/5 | 腳 (Leg) — replaced #6 | — |
| 7 | LEGEND WINNER | 0.5% | 3.7% | 30 | ❌ | ❌ | 11/1/3/9/9/4 | — | — |
| 11 | URANUS STAR | 0.4% | 3.5% | 10 | ❌ | ❌ (exactly 10) | 9/7/7/12/2/8 | — | — |
| 3 | PRESTIGE GOOD | 0.4% | 2.9% | 11 | ❌ | ❌ | 3/11/6/10/2/5 | — | — |

Market: overround 23.1%. MC has #2 POPE CODY (6.9, 4th in the market) as its top pick, "undervalued by 110%" with a 92% place edge. The market favourite #1 DAZZLING FIT (4.7) is a close MC #2 (28.5% / 64.2%). MC strongly opposes the 2nd and 3rd favourites: #4 DO YOU JUST (5.3; MC 1.1% / 6.2%) and #12 REFUSETOBEENGLISH (5.8; 5.8% / 23.7%). It also opposes #11 URANUS STAR and #3 PRESTIGE GOOD, both "overvalued by 96%". MC's 3rd pick is #10 FLYING FORTUNE (12). The finish-time projection (speed figures only) has #9 AUDACIOUS PURSUIT fastest (1:39.84), then #10 (+0.42s) and #1 (+0.70s). #2 is +1.26s, so its edge comes from rating and form, not raw speed.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 2 | POPE CODY | 30.4% | 66.8% | +form +1 | +form +1 | 31.4% | 67.8% | 6.9 | A Badel | 2 | 132 | Closer/Mid (sustained run) | +form | ★ 膽 (Banker 1) |
| 2 | 1 | DAZZLING FIT | 28.5% | 64.2% | 0 | 0 | 28.5% | 64.2% | 4.7 | Z Purton | 7 | 135 | Stalker (handy) | — | ★ 膽 (Banker 2) |
| 3 | 10 | FLYING FORTUNE | 13.7% | 44.4% | excuses +2 | excuses +2 | 15.7% | 46.4% | 12 | H Bentley | 1 | 117 | Prominent | +excuses (wide) | 腳 (Leg) |
| 4 | 12 | REFUSETOBEENGLISH | 5.8% | 23.7% | excuses +2 | excuses +2 | 7.8% | 25.7% | 5.8 | K C Leung | 9 | 116 | Midfield/back | +excuses | 腳 (Leg) |
| 5 | 5 | RUN RUN SMART | 7.0% | 27.4% | 0 | 0 | 7.0% | 27.4% | 17 | H Y Yuen (-7) | 11 | 123 | Front-runner | (gate won't help) | 腳 (Leg) |
| 6 | 6 | CALL ME TOPSEED | 5.0% | 21.7% | excuses +2 | excuses +2 | 7.0% | 23.7% | 27 | A Atzeni | 12 | 121 | On-pace | +excuses | — |
| 7 | 9 | AUDACIOUS PURSUIT | 5.2% | 24.1% | 0 | 0 | 5.2% | 24.1% | 17 | E C W Wong (-3) | 8 | 118 | Midfield | — | 腳 (Leg) |
| 8 | 4 | DO YOU JUST | 1.1% | 6.2% | trial +2, excuses +2 | trial +2, excuses +2 | 5.1% | 10.2% | 5.3 | Y L Chung (-2) | 4 | 127 | Speed-tracker | +trial, +excuses | — |
| 9 | 11 | URANUS STAR | 0.4% | 3.5% | excuses +2 | excuses +2 | 2.4% | 5.5% | 10 | M Chadwick | 3 | 117 | Front (made all 1650) | +excuses | — |
| 10 | 8 | RISING PHOENIX | 2.0% | 11.4% | 0 | 0 | 2.0% | 11.4% | 20 | P N Wong (-7) | 5 | 119 | Stalker | — | — |
| 11 | 3 | PRESTIGE GOOD | 0.4% | 2.9% | 0 | 0 | 0.4% | 2.9% | 11 | R Kingscote | 6 | 128 | Midfield | — | — |
| 12 | 7 | LEGEND WINNER | 0.5% | 3.7% | -perf −2, -notRO −2 | -perf −2, -notRO −2 | 0.0% (floored) | 0.0% (floored) | 30 | L Hewitson | 10 | 120 | Speed-tracker | -perf, -notRO | — |

Factor labels: +form +1 (rallied/made all), excuses +2 (steadied/crowded/held up/wide trip), trial +2 (positive trial or trackwork), -perf −2 (stewards: unacceptable performance), -notRO −2 (not ridden out). Caps are ±8 win / ±10 place, and none were reached. Following the R6 convention, each factor is applied to both Win% and Place%. Banker eligibility: #2 and #1 each have 10+ starts, so both are eligible.

SCMP adjustments applied:
- **#2 POPE CODY**: Star Form "Rallied to win… rallying for second… Sustained a bid from the 800m to resume a Valley 1,650m winner", so +form +1. TIR "raced wide and without cover from the 800M", but he still won, so this is not a bad-luck bounce case and excuses was not scored. Judgment call: adding excuses +2 would make it 33.4% / 69.8% and change nothing. Rating 77, carries 132 lb, gate 2.
- **#1 DAZZLING FIT**: "Resumed a handily ridden second over the Valley 1,650m" (16-Sep, same C&D). It ran in the Classic Cup and Derby. Positive, but no scoring keyword, so 0. Top weight 135, gate 7, Purton.
- **#10 FLYING FORTUNE**: Star Form "Did have to cover some ground when returning seventh up in grade over 1,800m" (a wide trip), so excuses +2. It has filled the frame twice and won over the Valley 1,650m. Gate 1, 117 lb.
- **#12 REFUSETOBEENGLISH**: TIR "jumped only fairly… steadied… raced tight… held up for clear running when disappointed", so excuses +2.
- **#6 CALL ME TOPSEED**: TIR "jumped awkwardly and then was steadied when crowded", so excuses +2. One awkward jump only, so no -barrier penalty.
- **#4 DO YOU JUST**: Trackwork "went from pillar to post to collect a 1,700m Valley trial last month", so trial +2. TIR "shifted in… steadied when taken in", so excuses +2. Star Form also notes he "has misfired in two past mile runs" (no table flag). He is still only 5.1% / 10.2% after +4.
- **#11 URANUS STAR**: TIR "bumped heavily at the start… bumped" plus Star Form "after a wide trip", so excuses +2. Only one TIR record, so no -barrier penalty.
- **#7 LEGEND WINNER**: Vet "24/06/2026 Unacceptable performance and lame right front leg (passed on 07/09/2026)". The pass was exactly 30 days ago (not <30), so no -injury30d. -perf −2. The rider "desisted from continuing to ride it out", so -notRO −2. Floored at 0.
- **#5 RUN RUN SMART**: "Made all" was in May, not the latest run, so no +form. "Tries the Valley 1,650m but gate won't help" (gate 11) is not in the factor table. It is a reducer only (rule 15) and was not applied.
- **#9 AUDACIOUS PURSUIT**, **#8 RISING PHOENIX** ("slow to begin", once), **#3 PRESTIGE GOOD**: no scoring flags, so 0.

Reasoning: MC rates two horses well clear of the field: #2 POPE CODY (30.4% / 66.8%) and #1 DAZZLING FIT (28.5% / 64.2%). They are the top two by rating, both ran on this C&D on 16-Sep (#2 won, #1 was 2nd), and 1-2 is MC's top quinella at 19.8% (fair 5.1). At Adj Win% 31.4% the race is Competitive, so Mode B applies: top 3 by Adj Win% (#2, #1, #10) plus the next 3 by Adj Place% (#5 27.4%, #12 25.7%, #9 24.1%). Every horse with Adj Place% ≥ 25% (#2, #1, #10, #5, #12) is in the pool. #6 (23.7%) sits just outside, behind #9 (24.1%). The 2nd-ranked #1 has Adj Place% 64.2% ≥ 63%, so the skill's rule gives **雙膽拖** (#2 + #1 as bankers). Pace: at HV 1,650m the skill notes a stalker bias. Likely leaders are #5 RUN RUN SMART (wide gate 11, will need to cross), #11 URANUS STAR and #6. #1 (handy stalker) suits the setup, #2 sustains a long run, and #10 (gate 1, prominent) should get a sit.

## TRIO POOL (Strategy A, any order)

```
POOL: #2, #1, #10, #12, #5, #9
MODE: B (Competitive, #2 Adj Win% 31.4%, between 20% and 35%) | POOL SIZE: 6
  Mode B = top 3 by Adj Win% (#2 31.4, #1 28.5, #10 15.7) + 3 by Adj Place% (#5 27.4, #12 25.7, #9 24.1)
  Must-include (Adj Place% ≥ 25%): #2, #1, #10, #5, #12 — all in pool

雙膽拖 STRUCTURE:
膽 (Banker 1): #2 POPE CODY (Adj Win% 31.4%, Adj Place% 67.8%) ← locked in every combo
膽 (Banker 2): #1 DAZZLING FIT (Adj Win% 28.5%, Adj Place% 64.2% ≥ 63%) ← locked in every combo
腳 (Legs):  #10, #12, #5, #9
BET STRUCTURE: 雙膽拖 | 2膽 + 4腳 | COMBINATIONS: 4
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #2, #1, #10 | 14.1% | $71 per $10 |
| 2 | #2, #1, #12 | 6.5% | $155 per $10 |
| 3 | #2, #1, #5 | 5.8% | $174 per $10 |
| 4 | #2, #1, #9 | 4.2% | $238 per $10 |

Estimated chance that the Strategy A ticket hits: about 30.6% on Adj (about 41.7% on raw MC Harville).

Alternative, if you prefer not to rely on two bankers: use 膽拖 with #2 as the only banker and legs #1, #10, #12, #5, #9. That is C(5,2) = 10 combos, $100, with an estimated hit chance of about 40.9% on Adj. The 雙膽拖 qualifies by a thin margin (64.2% vs the 63% threshold). Rule 19 notes that both bankers must place, and the joint chance is roughly 0.68 × 0.64 ≈ 43%.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 4 (雙膽拖: 2 bankers + 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $40

TICKET: 膽 #2, #1 | 腳 #10, #12, #5, #9
  2-1-10, 2-1-12, 2-1-5, 2-1-9
```

Value note: #1 is the favourite (4.7) and #2 is 6.9, so a 1-2 Trio will pay modestly. 2-1-10 is the most likely combo (MC quinella 2-10 10.5%, 1-10 9.6%). 2-1-5 and 2-1-9 (both 17) carry the dividend upside. The 1-2 quinella (MC fair 5.1) is likely underpriced by the market, since #2 is "undervalued by 110%".

PASS CONDITIONS:
- If #2 POPE CODY or #1 DAZZLING FIT (bankers) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If going changes to Yielding/Soft or worse → re-run the MC.
- If #2 drifts beyond ~12 → reconsider. The MC edge would look even larger, but the market may know something (e.g. a fitness concern).

CONFIDENCE: MEDIUM. Two strong MC anchors who ran 1-2 on this C&D last start. The risks: the 雙膽拖 needs both to place, #1 carries top weight (135) and #2 132, and HV Class 3 is upset-prone.

CAVEATS:
- SCMP partial: the Place odds column looks mis-parsed (several Place values exceed or nearly equal Win). There was no QP/Q matrix, so the quinella cross-check used MC fair odds only.
- SCMP Win odds differ from HKJC in places (e.g. #11 6.9 vs HKJC 10, #2 8.0 vs 6.9). The capture time is unknown, so HKJC odds were used.
- Market strongly disagrees with MC on #4 DO YOU JUST (3rd fav at 5.3; MC 1.1% win) and #12. #4 is excluded from the Strategy A pool by threshold (Adj Place% 10.2%). It carries no negative flags, only low MC.
- Five runners are off layoffs of >90 days (#3, #9, #11, #7, #4).
- The scraper log printed distance=1200m during parsing. The saved racecard and the simulation header use 1650m (correct per SCMP/HKJC).

───────────────────────────────────────────────────────────
## STRATEGY B (MC-only)
───────────────────────────────────────────────────────────

```
Banker: #2 POPE CODY (MC Win% 30.4%, MC Place% 66.8%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #1 (64.2), #10 (44.4), #5 (27.4), #9 (24.1), #12 (23.7), #6 (21.7)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
  #5 RUN RUN SMART (27.4%, 17), #9 AUDACIOUS PURSUIT (24.1%, 17), #6 CALL ME TOPSEED (21.7%, 27)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
  #4 DO YOU JUST (Win odds 5.3, MC Place% 6.2%)
Action: #4 replaced #6 CALL ME TOPSEED (lowest MC Place% among replaceable legs)
Final legs: #1, #10, #5, #9, #12, #4
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
```

STRATEGY B TICKET: 膽 #2 | 腳 #1, #10, #5, #9, #12, #4

| Rank | Horses (any order) | Est. Prob (raw MC Harville) | Est. Fair Odds |
|------|--------------------|-----------------------------|----------------|
| 1 | #2, #1, #10 | 19.0% | $53 per $10 |
| 2 | #2, #1, #5 | 8.9% | $112 per $10 |
| 3 | #2, #1, #12 | 7.3% | $137 per $10 |
| 4 | #2, #1, #9 | 6.5% | $153 per $10 |
| 5 | #2, #10, #5 | 3.3% | $299 per $10 |
| 6 | #2, #10, #12 | 2.7% | $366 per $10 |
| 7 | #2, #10, #9 | 2.4% | $411 per $10 |
| 8 | #2, #1, #4 | 1.3% | $755 per $10 |
| 9–15 | #2-5-12, #2-5-9, #2-9-12, #2-10-4, #2-5-4, #2-12-4, #2-9-4 | 0.2–1.3% each | — |

Estimated hit chance (sum of 15 combos, raw MC): about 56.0%.

Odds sensitivity: #11 URANUS STAR is exactly 10 on the HKJC live odds used here, and 9.9 in the 11:01 odds file. If it shortens below 10 at the off, it becomes a second Win-odds candidate. It would then replace #9 AUDACIOUS PURSUIT (the next-lowest replaceable leg at 24.1%), leaving legs #1, #10, #5, #12, #4, #11 (still 15 combos, $150).

Comparison vs Strategy A: both use #2 POPE CODY as the top banker. Strategy A also locks in #1 (雙膽拖) for a cheap 4-combo $40 ticket, but it only wins if both MC co-favourites place. Strategy B keeps #1 as a leg and covers the market's #4 DO YOU JUST through the Win-odds rule. That gives 15 combos for $150, with much higher coverage (about 56% vs about 31–42%).
═══════════════════════════════════════════════════════════
