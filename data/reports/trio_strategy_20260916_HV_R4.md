```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-16 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all, 12/12 horses enriched)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed (QP/Q matrix: ⚠️ unreliable, see caveats)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, captured 17:55 HKT 16-Sep; re-read by analyze-race.ts ~18:05 HKT)
             SCMP odds: ✅ loaded (differ from HKJC; HKJC used as primary) | HKJC live: ✅ loaded

RACE: R4 — THE COMMUNITY CHEST CUP | Class 4 | 1200m | Turf | Good | 12 runners
CLASSIFICATION: Dominant (top Adj Win% 35.0%, exactly on threshold) | POOL SIZE: 6
MODE: A: Tight Pool (5) + #12 added under Rule 8 (Adj Place% ≥ 20%)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos
UNIT BET: $10 per combination (fixed)
```

## Data summary

```
Meeting: Happy Valley 2026-09-16 | Going: Good | Surface: Turf
Target Race(s): R4 (Class 4 | 1200m | 12 starters)
Scratchings: none (reserves #R KING OBERON, #R JOKER ORBIT not running)
Odds coverage: 12 horses with odds
SCMP data: ✅ loaded (QP/Q matrix extracted but not usable)
```

## SCMP data (Race 4)

| # | Horse | Win Odds (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------------|------------------|----------|----------|-----------|---------------|
| 1 | FRIENDS OF SHAJING | 8.2 | consistent 4ths/5ths, "chance at this level" (draw 11) | clear | clear | — | Midfield / runs on |
| 2 | SOMELOVEFROMABOVE | 8.5 | made all for 2 Valley wins in Feb; one placing from 3 at this level | vet check nil | clear | +trial (blew turn, "zipped home smartly") | Front-runner |
| 3 | LIVE WIRE | 3.7 | +form (won last start after chasing pace; close front-running 5th before that) | shifted in late (minor) | clear | — | On-pace |
| 4 | GIANT LEAP | 6.1 | 3 placings from last 7 in C4; 2nd two back | +excuses (wide without cover last start) | clear | — | Prominent / midfield |
| 5 | STARRY SHOW | 11 | +form (won going away last start) | trainer rep: advantaged by rain-affected track | clear | — | Prominent |
| 6 | VICTOR THE RAPID | 14 | disappointed 5 straight | hampered when eased (older run) | clear | — | Midfield |
| 7 | A TIME FOR US | 23 | one 3rd from 4 ST runs | +excuses (bumped, severely checked when crowded) | fractious/cast in barriers 25/08, passed 04/09 (behaviour, not injury) | — | Prominent |
| 8 | JOLLY BONUS | 33 | 1 start (beat one home on debut) | clear | clear | — | Midfield |
| 9 | EVERSTAR | 37 | failed to menace 10 times | withdrawn lame | -injury30d (lame LF, passed 26/08 = 21 days) | — | Settles back |
| 10 | LIGHTNESS OF BEING | 23 | struggled 8 straight | held more forward than intended (old) | -injury30d (lame LF, passed 21/08 = 26 days) | — | Speed |
| 11 | KWAI CHUNG TALENTS | 8.4 | minor money in 4 of 6 at Valley 1200m; close 3rd last start | shifted in at start (instructed forward) | clear | — | On-pace |
| 12 | SAME TO YOU | 8.2 | 2nd at Valley, then faded last at ST | instructed forward; may suit conservative ride | -age (8+ yrs, passed 28/08) | — | Forward / stalker |

```
───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 3 | LIVE WIRE | 34.0% | 67.8% | 3.1 | ✅ | ✅ | 1/5/3/7/4/8 | ★ 膽 (Banker) | 2-3: 12.6% (8.0) |
| 2 | SOMELOVEFROMABOVE | 16.1% | 45.7% | 8.5 | ✅ | ✅ | 5/9/3/1/1/10 | 腳 (Leg) | 1-2: 6.0% (16.7) |
| 1 | FRIENDS OF SHAJING | 15.6% | 45.5% | 13 | ✅ | ❌ | 5/4/7/4/4/2 | 腳 (Leg) | 1-3: 11.9% (8.4) |
| 4 | GIANT LEAP | 10.5% | 34.7% | 5.3 | ✅ | ✅ | 9/2/12/4/12/2 | 腳 (Leg) | 3-4: 8.3% (12.1) |
| 5 | STARRY SHOW | 6.6% | 25.8% | 9.2 | ✅ | ✅ | 1/9/10/7/8/8 | 腳 (Leg) | 3-5: 5.6% (17.8) |
| 12 | SAME TO YOU | 6.4% | 25.4% | 8.8 | ✅ | ✅ | 14/2/3/11/5/3 | 腳 (Leg) | — |
| 7 | A TIME FOR US | 3.3% | 15.4% | 28 | ❌ | ❌ | 10/3/8/7/9/3 | — | — |
| 11 | KWAI CHUNG TALENTS | 3.2% | 15.7% | 8.1 | ❌ | ✅ | 3/5/3/9/6/8 | 腳 (Leg) — added (Win-odds candidate) | — |
| 6 | VICTOR THE RAPID | 2.9% | 14.3% | 14 | ❌ | ❌ | 9/8/10/10/6/4 | — | — |
| 8 | JOLLY BONUS | 0.6% | 3.8% | 60 | ❌ | ❌ | 11 | — | — |
| 9 | EVERSTAR | 0.5% | 4.0% | 59 | ❌ | ❌ | 10/9/7/10/13/13 | — | — |
| 10 | LIGHTNESS OF BEING | 0.2% | 2.0% | 33 | ❌ | ❌ | 9/7/12/12/11/12 | — | — |

Market: Model and market agree on the top horse. #3 LIVE WIRE is MC #1 and the 3.1 favourite. The main disagreements: MC rates #1 FRIENDS OF SHAJING (13) undervalued by 103% (45.5% place). #4 GIANT LEAP is 2nd favourite at 5.3 but MC gives it only 10.5% win. #11 (8.1) and #10 (33) are overvalued on MC. Overround 22.3%.

```
───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 3 | LIVE WIRE | 34.0% | 67.8% | form +1 | form +1 | 35.0% | 68.8% | 3.1 | Z Purton | On-pace | +form | ★ 膽 (Banker) |
| 2 | SOMELOVEFROMABOVE | 16.1% | 45.7% | trial +2 | trial +2 | 18.1% | 47.7% | 8.5 | J Orman | Front | +trial | 腳 (Leg) |
| 1 | FRIENDS OF SHAJING | 15.6% | 45.5% | 0 | 0 | 15.6% | 45.5% | 13 | C Y Ho | Midfield | — | 腳 (Leg) |
| 4 | GIANT LEAP | 10.5% | 34.7% | excuses +2 | excuses +2 | 12.5% | 36.7% | 5.3 | H Y Yuen (-10) | Prominent | +excuses | 腳 (Leg) |
| 5 | STARRY SHOW | 6.6% | 25.8% | form +1 | form +1 | 7.6% | 26.8% | 9.2 | R Kingscote | Prominent | +form | 腳 (Leg) |
| 7 | A TIME FOR US | 3.3% | 15.4% | excuses +2 | excuses +2 | 5.3% | 17.4% | 28 | B Avdulla | Prominent | +excuses | — |
| 12 | SAME TO YOU | 6.4% | 25.4% | -age −2 | -age −2 | 4.4% | 23.4% | 8.8 | A Atzeni | Forward | -age | 腳 (Leg) |
| 11 | KWAI CHUNG TALENTS | 3.2% | 15.7% | 0 | 0 | 3.2% | 15.7% | 8.1 | M L Yeung | On-pace | — | — |
| 6 | VICTOR THE RAPID | 2.9% | 14.3% | 0 | 0 | 2.9% | 14.3% | 14 | C L Chau (-2) | Midfield | — | — |
| 8 | JOLLY BONUS | 0.6% | 3.8% | 0 | 0 | 0.6% | 3.8% | 60 | M F Poon | Midfield | — | — |
| 9 | EVERSTAR | 0.5% | 4.0% | -injury30d −3 | -injury30d −4 | 0.0% | 0.0% | 59 | Y L Chung (-2) | Back | -injury30d | — |
| 10 | LIGHTNESS OF BEING | 0.2% | 2.0% | -injury30d −3 | -injury30d −4 | 0.0% | 0.0% | 33 | A Badel | Speed | -injury30d | — |

Adjustments are floored at 0%. None reached the ±8% / ±10% caps.

Judgement calls (listed so they can be checked):
- #3 +form: SCMP says it won its last start ("lip success"). This +1 is what lifts #3 from 34.0% to exactly 35.0%, the Dominant threshold. Without it the race is Competitive (Mode B, 6-horse pool). That pool has the same 6 horses (see Reasoning), so the ticket does not change.
- #2 trial +2: SCMP says it "blew the turn" but "zipped home smartly" in a recent trial. That is mixed, but the finish was positive, so I counted it.
- #5 +form: it won last start, but the trainer's representative said the rain-affected track helped it. Only +1 was applied.
- #7: the vet note (fractious and cast in the barriers, passed 04/09) is about behaviour, not an injury, so no -injury30d. The TIR-based -barrier flag needs 2 or more "bumped on jumping" runs, which #7 does not have.
- #11: "close third" last start was not treated as the "improved/rallied/made all" signal, so 0.
- Not applied: #1's wide draw (11) and #8's draw (12), because SCMP made no draw comments. #8 has only 1 start, so it cannot be a banker (not relevant here).

Reasoning: #3 LIVE WIRE is on 35.0% Adj Win%, so Mode A applies: the banker plus the 4 contenders by Adj Place%. Those are #2 (47.7%), #1 (45.5%), #4 (36.7%) and #5 (26.8%), which are also the horses that must be included at Adj Place% ≥ 25%. #12 SAME TO YOU (23.4%, 8.8 odds) comes in under Rule 8 (Adj Place% ≥ 20% must be in the pool), making the pool 6. The Mode B cross-check gives the same pool: top 3 by Adj Win% (#3, #2, #1) plus the next 3 by Adj Place% (#4, #5, #12). #3 has 7 starts, so it can be the banker. #2's Adj Place% of 47.7% is below 63%, so this is a single-banker 膽拖.

Pace: HV 1200m favours on-pace runners. #3 has draw 2 and races on the pace, #2 (made all) and #12 (draw 3) can go forward, and #5 has draw 1 and races prominently. #11 (draw 4) was told to go forward last time. #1 races from midfield from draw 11 and needs cover. It is the pool's main closer and the horse MC rates most above the market. #11 KWAI CHUNG TALENTS (8.1) is left out of Strategy A (Adj Place% 15.7%, no negative flags, so Rule 9 does not force it in) but is included in Strategy B.

```
───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #3, #2, #1, #4, #5, #12
MODE: A (+Rule 8 inclusion) | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #3 LIVE WIRE (Adj Place% 68.8%) ← locked in every combo
腳 (Legs):  #2, #1, #4, #5, #12
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (estimated as the product of Adj Place%, treating horses as independent):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #3, #2, #1 | 14.9% | $67 |
| 2 | #3, #2, #4 | 12.0% | $83 |
| 3 | #3, #1, #4 | 11.5% | $87 |
| 4 | #3, #2, #5 | 8.8% | $114 |
| 5 | #3, #1, #5 | 8.4% | $119 |

(Fair odds are per $10 unit. Multiplying place chances overstates the real chance of all three placing, so use these only to rank the combinations.)

```
───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKETS (banker #3 with every pair of legs, ordered by proxy):
  3-2-1 (14.9%), 3-2-4 (12.0%), 3-1-4 (11.5%), 3-2-5 (8.8%), 3-1-5 (8.4%),
  3-2-12 (7.7%), 3-1-12 (7.3%), 3-4-5 (6.8%), 3-4-12 (5.9%), 3-5-12 (4.3%)

PASS CONDITIONS:
- If #3 LIVE WIRE (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (#5's last win came on a rain-affected track, so it would move up; front-runner bias may strengthen)
- If #3 drifts past ~6 on final odds (market losing agreement with MC) → consider PASS

CONFIDENCE: MEDIUM-LOW
```

CAVEATS:
- **Banker is below the MC ≥ 75 gate.** #3's MC Place% is 67.8%. Two research notes apply. `notes/2026-09-14-hv-trio-banker.md` found the HV Trio banker edge only at MC Place% ≥ 75. `notes/2026-09-15-hv-mc-place-calibration.md` found that runners shown at 60–70% actually placed only 49.5% of the time. In their favour, model and market agree here (#3 is the favourite), which avoids the disagreement pattern flagged in `notes/2026-09-14-hv-turf-market-agreement-gate.md`.
- **Dominant classification depends on one judgement call.** #3 reaches 35.0% only because of the +1 form adjustment. The pool is the same under Mode B, so the ticket does not change.
- **Summer-break fitness.** #3 has been off 98 days (last ran 10-Jun), which counts as a long layoff (>90 days). Every other runner last ran between late May and mid-July. No one has had a run this season.
- **Odds snapshot.** HKJC odds come from the 17:55 HKT capture and the analyzer's re-read, both before the pool settles. SCMP odds differ a lot in places (#1 8.2 vs 13, #3 3.7 vs 3.1, #5 11 vs 9.2). MC place odds were estimated from win odds.
- **Strategy B depends on the odds source.** On HKJC odds, #5 (9.2) and #12 (8.8) are both under 10, so neither counts as a weak leg that can be swapped out, and #11 is added as a 6th leg. On SCMP odds, #5 would be 11, so #11 would replace #5 (5 legs, 10 combos, $100). Recheck #5's and #11's odds before betting.
- **QP/Q matrix unusable.** The extracted Q and QP matrices were identical and implausible (for example 3-11 at 2.0 while 1-3 was 17), so they were not used for value checks.
- **Finish-time projection conflicts with Win%.** The analyzer's finish-time projection has #9 EVERSTAR fastest (1:09.60) and #3 at +2.29s, which contradicts the MC win rankings. It was not used for selection.
- **Going.** Going is taken from the racecard (Good) and was not independently confirmed on race night.

```
───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: #3 LIVE WIRE (MC Win% 34.0%, MC Place% 67.8%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2, #1, #4, #5, #12
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (#5 is 9.2, #12 is 8.8)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #11 KWAI CHUNG TALENTS (Win odds 8.1, MC Place% 15.7%)
Action: added directly (no replaceable leg)
Final legs: #2, #1, #4, #5, #12, #11
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET (banker #3 with every pair of legs, ordered by raw MC place-product proxy):
  3-2-1 (14.1%), 3-2-4 (10.8%), 3-1-4 (10.7%), 3-2-5 (8.0%), 3-1-5 (8.0%),
  3-2-12 (7.9%), 3-1-12 (7.8%), 3-4-5 (6.1%), 3-4-12 (6.0%), 3-2-11 (4.9%),
  3-1-11 (4.8%), 3-5-12 (4.4%), 3-4-11 (3.7%), 3-5-11 (2.7%), 3-12-11 (2.7%)
```

Comparison: both strategies use the same banker (#3) and the same 5 core legs. Strategy B adds #11 KWAI CHUNG TALENTS as a 6th leg because it is under 10 in the market while MC gives it only 15.7% place. That costs 5 more combos ($150 vs $100). This matches the 6-leg structure that `notes/2026-09-14-hv-trio-banker.md` found worked best at HV, but the extra 5 combos all include #11, which MC rates weak.

```
═══════════════════════════════════════════════════════════
```
