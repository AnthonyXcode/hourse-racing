# Trio (單T) Strategy — Sha Tin 2026-10-11 Race 11

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 11
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, 12 jockey + 11 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds look mis-parsed; Q/QP matrix present but not machine-readable)
ODDS SOURCE: HKJC live win odds fetched by analyze-race.ts during the MC run (stored in data/racecards/racecard_20261011_ST_R11.json).
             Cross-checked against data/odds/odds_20261011_ST.json (captured 11:24 HKT 11-Oct); the two differ by ≤0.2 on the leading horses.
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R11 — Class 2 | 1200m | Turf | Good | 12 runners — YUEN LONG HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 44.2%) | POOL SIZE: 6
MODE: A: Tight Pool (5), expanded to 6 under Rule 8 (Adj Place% ≥ 20% must be in pool)
BET STRUCTURE (A): 雙膽拖 | 2膽 + 4腳 | COMBINATIONS: 4  (2nd-ranked #2 Adj Place% 71.6% ≥ 63%)
BET STRUCTURE (B): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: Turf
Target Race(s): R11 (Class 2 | 1200m | 12 runners)
Scratchings: none (reserve R SIGHT HERMOSO is not in the field)
Odds coverage: 12 horses with HKJC win odds (place odds estimated by the tool from win odds)
SCMP data: ⚠️ partial
Form gaps: none. All 12 horses have 10 form records in MC. Trip data at 1200m: #7 has 0 runs at the trip, and #3 has only 3.
           Layoffs: #5 SELF IMPROVEMENT last ran 11-Apr (183 days). #3 KA YING ATTACK last ran 01-Jul (102 days).
           #9 BLAZING WIND last ran 13-Jun (120 days). #8 and #10 last ran 15-Jul (88 days).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 11 | JUMBO TREASURE | 43.2% | 82.9% | 3.9 | ✅ | ✅ | 1/1/8/3/4/12 | ★ 膽 (Banker) | 2-11: 30.3% (3.3) |
| 2 | RISING FORCE | 26.1% | 71.6% | 7.5 | ✅ | ✅ | 7/1/5/2/2/1 | 腳 (Leg) | 2-11: 30.3% (3.3) |
| 1 | STORM RIDER | 16.8% | 56.5% | 9.2 | ✅ | ✅ | 5/6/7/10/7/13 | 腳 (Leg) | 1-11: 19.1% (5.2) |
| 3 | KA YING ATTACK | 5.6% | 30.5% | 7.1 | ✅ | ✅ | 1/1/7/3/2/5 | 腳 (Leg) | 3-11: 7.2% (13.9) |
| 4 | YOUNG CHAMPION | 3.8% | 23.1% | 14 | ✅ | ❌ | 8/5/3/6/12/3 | 腳 (Leg) | 4-11: 5.4% (18.6) |
| 6 | TURQUOISE VELOCITY | 3.4% | 22.6% | 4.1 | ✅ | ✅ | 2/3/6/2/5/1 | 腳 (Leg) | — |
| 9 | BLAZING WIND | 0.8% | 6.9% | 14 | ❌ | ❌ | 4/1/4/3/7/1 | — | — |
| 7 | JOHANNES BRAHMS | 0.1% | 1.8% | 25 | ❌ | ❌ | 6/10/11/11/12/8 | — | — |
| 12 | PAKISTAN LEGACY | 0.1% | 1.5% | 29 | ❌ | ❌ | 12/2/11/11/2/1 | — | — |
| 10 | BRAVE STAR | 0.1% | 1.4% | 37 | ❌ | ❌ | 9/11/8/2/3/3 | — | — |
| 8 | SON PAK FU | 0.1% | 0.9% | 16 | ❌ | ❌ | 8/1/2/9/5/6 | — | — |
| 5 | SELF IMPROVEMENT | 0.0% | 0.5% | 33 | ❌ | ❌ | 12/8/9/4/7/4 | — | — |

Market: overround 22.0%. MC agrees with the market on the favourite, #11 JUMBO TREASURE (3.9), and makes it a strong 43.2% win / 82.9% place. It is the top-rated horse (75), with a 3-point gap to the next. The big disagreement is #6 TURQUOISE VELOCITY, the 4.1 second favourite. MC rates it only 6th (3.4% win, 22.6% place). MC's main overlay is #2 RISING FORCE at 7.5 (26.1% win, 71.6% place). The tool's Place bet on #2 shows a +111% edge. #1 STORM RIDER at 9.2 is also underpriced (16.8% win), and it has the fastest projected time (1:08.83). The top MC quinellas are 2-11 (30.3%) and 1-11 (19.1%). The bottom six horses together have under 2% win, so MC sees this as a 3–6 horse race.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 11 | JUMBO TREASURE | 43.2% | 82.9% | +form +1 | +form +1 | 44.2% | 83.9% | 3.9 | K C Leung | 1 | 122 | Front/On-pace | +form | ★ 膽 (Banker 1) |
| 2 | 2 | RISING FORCE | 26.1% | 71.6% | 0 | 0 | 26.1% | 71.6% | 7.5 | Z Purton | 5 | 132 | Front/On-pace | — | ★ 膽 (Banker 2) |
| 3 | 1 | STORM RIDER | 16.8% | 56.5% | 0 | 0 | 16.8% | 56.5% | 9.2 | H Y Yuen (-7) | 6 | 134 | Midfield/Closer | — | 腳 (Leg) |
| 4 | 3 | KA YING ATTACK | 5.6% | 30.5% | +form +1 | +form +1 | 6.6% | 31.5% | 7.1 | M F Poon | 10 | 129 | Front | +form (wide gate again) | 腳 (Leg) |
| 5 | 4 | YOUNG CHAMPION | 3.8% | 23.1% | 0 | 0 | 3.8% | 23.1% | 14 | A Atzeni | 8 | 128 | Stalk | — | 腳 (Leg) |
| 6 | 6 | TURQUOISE VELOCITY | 3.4% | 22.6% | 0 | 0 | 3.4% | 22.6% | 4.1 | K Teetan | 4 | 125 | Front | — | 腳 (Leg, Rule 8) |
| 7 | 9 | BLAZING WIND | 0.8% | 6.9% | trial +2 | trial +2 | 2.8% | 8.9% | 14 | R Kingscote | 3 | 122 | Stalk (speed-tracker) | +trial | — |
| 8 | 12 | PAKISTAN LEGACY | 0.1% | 1.5% | excuses +2 | excuses +2 | 2.1% | 3.5% | 29 | M Chadwick | 9 | 120 | Front/Stalk | +excuses | — |
| 9 | 5 | SELF IMPROVEMENT | 0.0% | 0.5% | excuses +2 | excuses +2 | 2.0% | 2.5% | 33 | H T Mo (-2) | 2 | 126 | — | +excuses | — |
| 10 | 7 | JOHANNES BRAHMS | 0.1% | 1.8% | 0 | 0 | 0.1% | 1.8% | 25 | C Y Ho | 11 | 124 | Midfield | — | — |
| 11 | 10 | BRAVE STAR | 0.1% | 1.4% | -age −2 | 0 | 0.0% | 1.4% | 37 | H Bentley | 7 | 122 | — | -age | — |
| 12 | 8 | SON PAK FU | 0.1% | 0.9% | -age −2 | 0 | 0.0% | 0.9% | 16 | P N Wong (-7) | 12 | 124 | Closer/Back | -age | — |

Factor labels: +form +1 (made all / won in most recent run), trial +2, excuses +2 (wide trip / crowded / restrained), -age −2 (8yo+, applied to Win% only, in C3 and above, as in earlier reports). Caps are ±8 win / ±10 place, and none were reached. #8 and #10 have Adj Win% floored at 0%. Banker eligibility: #11 and #2 both have 10 HK form records, so both are eligible.

SCMP adjustments applied:
- **#11 JUMBO TREASURE**: Star Form says it "Resumed an upset winner after a wide trip from better than midfield at Sha Tin". It also has an earlier wire-to-wire Sha Tin 1,200m win and goes "on the upgrade carrying 10lb less". A win in its most recent run gives +form +1. It won anyway, so no excuses credit. Gate 1 suits its handy style.
- **#2 RISING FORCE**: "Easily made all" was its final start of last season, not its most recent run. It resumed with a prominent 7th carrying 6lb more. The TIR shows nothing of note (rider satisfied, vet clear). No adjustment.
- **#1 STORM RIDER**: "Resumed a closing fifth from midfield". This is encouraging, but it does not meet the improved/rallied/made-all bar. No flags. No adjustment.
- **#3 KA YING ATTACK**: Its last start (01-Jul) was "making all from the widest draw" in Class 2 over 1,400m, so +form +1. Star Form notes it "Has another wide berth" (gate 10). Wide gates are reducers only (Rule 15), and MC already accounts for the draw, so there is no extra penalty.
- **#4 YOUNG CHAMPION**: TIR "Jumped only fairly" is a single note, so no -barrier penalty. It resumed "non-threatening eighth". No adjustment.
- **#6 TURQUOISE VELOCITY**: It made all over this course and distance last season and "Resumed a speed-duelling second at Sha Tin". A runner-up finish is not a scoring flag, and it has no TIR/vet issues. No adjustment.
- **#9 BLAZING WIND**: Trackwork says it "Won both his leadup trials... in good heart", so trial +2. Star Form notes it is better on dirt.
- **#12 PAKISTAN LEGACY**: TIR "Raced wide and without cover for the majority of the event", so excuses +2.
- **#5 SELF IMPROVEMENT**: TIR "unnecessarily crowded... restrained" plus Star Form "wide trip", so excuses +2.
- **#8 SON PAK FU, #10 BRAVE STAR**: Vet "Eight years of age or above", so -age −2 win. Their single "bumped at start" / "jumped only fairly" notes do not trigger -barrier. #8 is also "zero-from-13 over the Sha Tin 1,200m".
- **#7 JOHANNES BRAHMS**: It bled in April, which is well outside 30 days, and it has raced since. No adjustment.

Reasoning: #11 JUMBO TREASURE is a clear MC #1 (rating 75). It is a course-and-distance winner from the ideal gate 1, races handily, and drops 10lb on the upgrade. Adj Win% 44.2% makes the race Dominant, so Mode A applies. The base 5 is the banker + 4 by Adj Place%: #2 (71.6), #1 (56.5), #3 (31.5), #4 (23.1). Rule 8 (Adj Place% ≥ 20%) adds #6 (22.6), giving a 6-horse pool. #2 RISING FORCE has Adj Place% 71.6% ≥ 63%, so the decision flow calls for **雙膽拖** (2 bankers + 4 legs). This is backed by MC's dominant quinella 2-11 (30.3%, 1.6× the next pair). #9 BLAZING WIND (14) is excluded: Adj Place% is only 8.9%, it has no negative flags (so Rule 9 does not protect it), and it is a better dirt horse. Pace: #11 (gate 1), #6 (gate 4) and #2 (gate 5) all like to be on the speed, and #3 will try to cross from gate 10. A genuine tempo is likely. That helps the closers #1 STORM RIDER (fastest projected time) and #4 YOUNG CHAMPION fill third place.

## TRIO POOL (Strategy A, any order)

```
POOL: #11, #2, #1, #3, #4, #6
MODE: A (Dominant, #11 Adj Win% 44.2% ≥ 35%), expanded 5 → 6 under Rule 8 | POOL SIZE: 6
  Banker + top 4 by Adj Place%: #11 (83.9), #2 (71.6), #1 (56.5), #3 (31.5), #4 (23.1)
  + Rule 8 (Adj Place% ≥ 20%): #6 (22.6)

雙膽拖 STRUCTURE:
膽 (Banker 1): #11 JUMBO TREASURE (Adj Win% 44.2%, Adj Place% 83.9%) ← locked in every combo
膽 (Banker 2): #2 RISING FORCE (Adj Win% 26.1%, Adj Place% 71.6% ≥ 63%) ← locked in every combo
腳 (Legs):  #1, #3, #4, #6
BET STRUCTURE: 雙膽拖 | 2膽 + 4腳 | COMBINATIONS: 4

(Fallback if you prefer to keep a single banker: 膽拖 | 膽 #11 | 腳 #2, #1, #3, #4, #6 | C(5,2) = 10 combos, $100. This is the same ticket as Strategy B.)
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds | In 雙膽拖 ticket? |
|------|--------------------|-----------|----------------|-------------------|
| 1 | #11, #2, #1 | 30.0% | $33 per $10 | ✅ |
| 2 | #11, #2, #3 | 10.5% | $95 per $10 | ✅ |
| 3 | #11, #2, #4 | 5.9% | $170 per $10 | ✅ |
| 4 | #11, #1, #3 | 5.7% | $174 per $10 | ❌ (1-banker fallback only) |
| 5 | #11, #2, #6 | 5.2% | $191 per $10 | ✅ |
| 6 | #11, #1, #4 | 3.2% | $312 per $10 | ❌ |
| 7 | #11, #1, #6 | 2.9% | $350 per $10 | ❌ |

Estimated chance that the Strategy A 雙膽拖 ticket hits (sum of the 4 combos): about 52% on Adj Win%, or about 69% on raw MC. The 1-banker fallback would hit about 66% (Adj) or 86% (raw MC).

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 4 (雙膽拖: 2 bankers + 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $40

TICKET: 膽 #11, #2 | 腳 #1, #3, #4, #6
  11-2-1, 11-2-3, 11-2-4, 11-2-6

TOP COMBINATIONS (highest value):
  11-2-1 (30.0%), 11-2-3 (10.5%), 11-2-4 (5.9%), 11-2-6 (5.2%)
```

Value note: #11 is the 3.9 favourite, so the Trio dividend will be modest. Value here comes from #2 (7.5) and #1 (9.2), whom the market rates as only the 4th and 5th choices. If #6 (4.1, 2nd favourite) misses the frame, as MC expects, a heavily backed horse drops out of the Trio pool, and 11-2-1 / 11-2-3 / 11-2-4 should pay well above the model's fair odds.

PASS CONDITIONS:
- If #11 JUMBO TREASURE or #2 RISING FORCE (bankers) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding/Soft or worse → re-run the MC.
- If #11 drifts beyond ~7 in late betting (market losing faith in the banker) → consider PASS.

CONFIDENCE: MEDIUM-HIGH. The structure is strong (MC 82.9% / 71.6% place for the two bankers, and a dominant 2-11 quinella). 雙膽拖 needs both bankers to place: MC estimates about 71% that both are top 3, or about 62% on Adj.

CAVEATS:
- **#6 TURQUOISE VELOCITY (4.1, 2nd favourite) is rated only 3.4% win / 22.6% place by MC.** It made all over this course and distance last season and resumed with a 2nd. It is in the pool only as a leg (Rule 8). A result where #6 finishes top 3 together with only one of the two bankers is a loss for 雙膽拖.
- 雙膽拖 risk (Rule 19): if either #11 or #2 misses the top 3, every ticket loses. #2 resumed 7th this season, and its high MC rating leans on last season's form (1/5/2/2/1). If you want more protection, use the 1-banker fallback (10 combos / $100, identical to Strategy B).
- SCMP is partial. SCMP win odds broadly agree on the order of the market (#11 2.9, #6 4.4, #3 7, #2 9, #1 14), but #11 is shorter there than on HKJC (3.9). SCMP "Place" odds are near or above win odds, so they look mis-parsed. The Q/QP matrix was on the page but could not be read into pairs, so no QP cross-reference was done.
- -age −2 was applied to #8 and #10 in this Class 2 race, reading "C3+" as "Class 3 and above". It has no effect on the pool.
- #3 KA YING ATTACK is off 102 days, and its form at 1200m is thin (3 trip runs). It also has a wide gate again (10).
- Odds were taken from the live HKJC pool during the MC run (late morning 11-Oct). The pool will move before the jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #11 JUMBO TREASURE (MC Win% 43.2%, MC Place% 82.9%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2 (71.6%), #1 (56.5%), #3 (30.5%), #4 (23.1%), #6 (22.6%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #4 YOUNG CHAMPION (MC Place% 23.1%, Win odds 14)
  (#6 is 22.6% but at 4.1, which is not > 10. #3 is 30.5%, which is outside 20–30%.)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
  (All five sub-10 horses, #11, #6, #3, #2 and #1, are already the banker or primary legs. The next shortest non-leg is #9 at 14.)
Action: no replacement / no addition
Final legs: #2, #1, #3, #4, #6
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #11 | 腳 #2, #1, #3, #4, #6
  11-2-1, 11-2-3, 11-2-4, 11-2-6, 11-1-3, 11-1-4, 11-1-6, 11-3-4, 11-3-6, 11-4-6

Top combos (Harville, raw MC): 11-2-1 41.5% | 11-2-3 12.1% | 11-2-4 8.0% | 11-2-6 7.2% | 11-1-3 6.4%
Est. ticket hit chance (sum of 10 combos, raw MC): ~86%
```

Comparison: Both strategies use the same 6 horses (#11, #2, #1, #3, #4, #6) and the same lead banker (#11). Strategy A adds #2 as a second banker because its Adj Place% is 71.6% (≥ 63%). That cuts the ticket to 4 combos / $40, but it then needs both #11 and #2 to place. Strategy B keeps a single banker, which gives 10 combos / $100 and also covers #11 with #1/#3/#4/#6 when #2 misses. The SCMP adjustments were small (+1 on #11 and #3) and did not change the pool. The robustness check holds: using either the 11:24 odds snapshot or the SCMP win odds gives the same Strategy B ticket.

```
═══════════════════════════════════════════════════════════
```
