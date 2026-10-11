# Trio (單T) Strategy — Sha Tin | 2026-10-11 | Race 4

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 2 scratchings (#3, #5)
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed (SCMP odds column stale/inconsistent, see caveats)
ODDS SOURCE: HKJC pool (fetch-odds.ts, data/odds/odds_20261011_ST.json, captured 11:24 HKT 11-Oct;
             analyze-race.ts re-fetched win odds for all 8 runners)
             SCMP odds: ⚠️ loaded but inconsistent with HKJC (not used) | HKJC live: ✅ loaded

RACE: R4 LAU FAU SHAN HANDICAP — Class 3 (80-60) | 1200m | All Weather Track | Good | 8 runners
CLASSIFICATION: Dominant (top Adj Win% 50.0%, capped) | POOL SIZE: 6
MODE: A: Tight Pool (5), expanded to 6 under Rule 8 (#7 Adj Place% 20.8% >= 20%)
BET STRUCTURE: 雙膽拖 2膽 + 4腳 = 4 combos
UNIT BET: $10 per combination (fixed)
```

## Step 1–2: Data summary

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: AWT
Target Race(s): R4 (Class 3 | 1200m | 8 runners)
Scratchings: #3 MIGHTY COMMANDER, #5 MUST GO
Odds coverage: 8/8 horses with win odds
SCMP data: ✅ loaded (⚠️ partial: SCMP odds column and Q/QP matrix not usable)
```

- Historical sync: not re-run, per instruction (already up to date). MC loaded 2,318 historical races and 2,335 horse performances.
- Form data: 7/8 horses enriched. #9 ZHUANG YUAN GLORY has 0 form runs in the MC dataset. SCMP says it ran third over dirt 1200m last start, after 8 starts in Australia, so the MC is likely missing that local run.
- Jockeys: 8/8 profiles. Trainers: 8/8 profiles.
- The race passes all critical checks: racing confirmed, 8 starters (at least 3 needed), odds for every runner, jockey stats loaded.

## SCMP data (Race 4)

| # | Horse | Win (SCMP) | Star Form signal | TIR flag | Vet flag | Trackwork | Style |
|---|-------|-----------|------------------|----------|----------|-----------|-------|
| 1 | LUCY IN THE SKY | 15 | front-running 4th, then "made all" (win at $2.1), then hung on for 3rd | — | clear | — | Front-runner |
| 2 | BUSTLING CITY | 1.4 | "set the pace" to place 3 times in a row; resumed as a geared-down 7-length C3 winner | — | clear | — | Front-runner |
| 4 | SKY CAP | 21 | 2 straight HV 1200m wins in C4; "tamely faded" in only C&D run | had to race outside the leader, did not finish off (not an excuse flag) | post-race: no significant findings | — | On-pace |
| 6 | CALA DEI MORI | 39 | beat one on debut; resumed a fading 11th | blundered at the start once (not repeated) | post-race: no significant findings | — | Midfield |
| 7 | TOGETHER WE VALUE | 17 | regular minor cheques; "failing to menace" at Sha Tin | +excuses (no clear running over the final 50m) | clear | — | Midfield / Closer |
| 8 | KEMPES | 19 | "zipped home" to win first up; resumed as a box-seat C4 winner | held up 400–250m (scored under form, not excuses, because it won last start) | clear | — | Stalker (box seat) |
| 9 | ZHUANG YUAN GLORY | 8.4 | Doomben winner (AUS); came from midfield for 3rd over dirt 1200m last start | — | clear | "did plenty wrong" in trial but still 3rd (not a +trial flag) | Midfield |
| 10 | DRAGON JOY | 42 | tendon injury after December; resumed as a non-factor | jumped awkwardly once, raced keenly | post-race: no significant findings (injury > 30 days, no adjustment) | — | Back |
| 3 | MIGHTY COMMANDER | SCR | Withdrawn | — | — | — | — |
| 5 | MUST GO | SCR | Withdrawn (SCMP still shows win 8.2) | — | — | — | — |

Tipster picks ignored.

```
───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 2 | BUSTLING CITY | 63.9% | 93.1% | 1.5 | ✅ | ✅ | 7 | ★ 膽 (Banker) | 2-8: 38.0% (2.6) |
| 8 | KEMPES | 18.8% | 68.9% | 12 | ✅ | ❌ | 10 | 腳 (Leg) | 2-8: 38.0% (2.6) |
| 4 | SKY CAP | 7.2% | 43.8% | 19 | ✅ | ❌ | 10 | 腳 (Leg) | 2-4: 17.2% (5.8) |
| 9 | ZHUANG YUAN GLORY | 3.9% | 29.8% | 6.6 | ✅ | ✅ | 0 | 腳 (Leg) | 2-9: 10.3% (9.7) |
| 1 | LUCY IN THE SKY | 2.6% | 24.6% | 9.2 | ✅ | ✅ | 10 | 腳 (Leg) | 1-2: 7.8% (12.7) |
| 7 | TOGETHER WE VALUE | 1.8% | 18.8% | 13 | ❌ | ❌ | 8 | — | 2-7: 5.5% (18.1) |
| 6 | CALA DEI MORI | 1.2% | 11.9% | 25 | ❌ | ❌ | 3 | — | — |
| 10 | DRAGON JOY | 0.6% | 9.2% | 30 | ❌ | ❌ | 10 | — | — |

Market: overround 21.3%. The MC rates #8 KEMPES (12x) as undervalued by 126% and #7 (13x) and #10 (30x) as overvalued. It agrees with the market that #2 is the favourite. The market's 2nd and 3rd picks, #9 (6.6) and #1 (9.2), sit only 4th and 5th in the MC.

```
───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 2 | BUSTLING CITY | 63.9% | 93.1% | +form +1 (capped at 50) | +form +1 (capped at 85) | 50.0% | 85.0% | 1.5 | B Avdulla | Front | +form | ★ 膽 (Banker 1) |
| 8 | KEMPES | 18.8% | 68.9% | +form +1 | +form +1 | 19.8% | 69.9% | 12 | A Atzeni | Stalk | +form | ★ 膽 (Banker 2) |
| 4 | SKY CAP | 7.2% | 43.8% | 0 | 0 | 7.2% | 43.8% | 19 | K C Leung | On-pace | — | 腳 (Leg) |
| 9 | ZHUANG YUAN GLORY | 3.9% | 29.8% | 0 | 0 | 3.9% | 29.8% | 6.6 | H Y Yuen (-7) | Mid | — | 腳 (Leg) |
| 7 | TOGETHER WE VALUE | 1.8% | 18.8% | excuses +2 | excuses +2 | 3.8% | 20.8% | 13 | H Bentley | Mid/Close | +excuses | 腳 (Leg) |
| 1 | LUCY IN THE SKY | 2.6% | 24.6% | +form +1 | +form +1 | 3.6% | 25.6% | 9.2 | P N Wong (-7) | Front | +form (made all) | 腳 (Leg) |
| 6 | CALA DEI MORI | 1.2% | 11.9% | 0 | 0 | 1.2% | 11.9% | 25 | E C W Wong (-3) | Mid | — | — |
| 10 | DRAGON JOY | 0.6% | 9.2% | 0 | 0 | 0.6% | 9.2% | 30 | M Chadwick | Back | — | — |

Note: ★ 膽 = Banker. #2 is 1st by Adj Win% and has 7 race starts, so it can be the banker. The 2nd-ranked horse, #8, has Adj Place% 69.9% (68.9% raw). That clears the 63% threshold for 雙膽拖, so #8 is the second banker. #2's raw MC figures (63.9% win, 93.1% place) were already above the caps, so its adjusted values are capped at 50% and 85%.

Reasoning: This is a dominant race. #2 BUSTLING CITY has won 2 of its last 2 at Sha Tin AWT 1200m (one of them this same C3 course and distance two weeks ago, by a wide margin). It leads the MC by 45 points and has an 8-point rating edge. #8 KEMPES is a clear second on both MC (68.9% place) and form: a fresh C4 winner, box-seat stalker, 2nd over this C&D last year. The top MC quinella, 2-8, is 38.0%. #4 SKY CAP (43.8% place) is a must-include under the 25% rule, as are #9 (29.8%) and #1 (25.6%). #7 gets to 20.8% only through the excuses adjustment, but Rule 8 (>= 20%) and Rule 9 (odds 13, at or below 15) keep it in the pool. Pace: #2 and #1 are both natural leaders, and #2 draws inside #1 (gate 2 vs gate 5), so #2 should control the race. That favours the stalker #8 in the box seat.

```
───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #2, #8, #4, #9, #7, #1
MODE: A (expanded to 6 under Rule 8) | POOL SIZE: 6

雙膽拖 STRUCTURE:
膽 (Bankers): #2 BUSTLING CITY (Adj Place% 85.0%) + #8 KEMPES (Adj Place% 69.9%) ← locked in every combo
腳 (Legs):  #4, #9, #7, #1
BET STRUCTURE: 雙膽拖 | 2膽 + 4腳 | COMBINATIONS: 4
```

TOP TRIO COMBINATIONS (Harville trio probability from normalised Adj Win%; fair odds = 1/p):

| Rank | Horses (any order) | Trio Prob. | Est. Fair Odds |
|------|-------------------|-----------|----------------|
| 1 | #2, #8, #4 | 27.5% | $3.6 |
| 2 | #2, #8, #9 | 14.3% | $7.0 |
| 3 | #2, #8, #7 | 13.9% | $7.2 |
| 4 | #2, #8, #1 | 13.1% | $7.6 |
| 5 | #2, #8, #6 | 4.3% | $23.3 (not in pool) |

```
───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 4 (雙膽拖: 2 bankers + 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $40
Est. ticket hit probability (Harville, all 4 combos): ~68.7%

TOP COMBINATIONS:
  2-8-4 (27.5%), 2-8-9 (14.3%), 2-8-7 (13.9%), 2-8-1 (13.1%)

Fallback (if you prefer one banker): 膽 #2 / 腳 #8, #4, #9, #7, #1 → C(5,2) = 10 combos, $100,
  est. hit ~85.1%. This covers the case where #8 misses the top 3.

PASS CONDITIONS:
- If #2 BUSTLING CITY (banker) is scratched → VOID the ticket (do not restructure)
- If #8 KEMPES (banker 2) is scratched → switch to 1膽 #2 + 腳 #4, #9, #7, #1 = C(4,2) = 6 combos, $60
- If a leg is scratched → drop it (2膽 + 3腳 = 3 combos, $30)
- If field drops below 3 → pool refunded
- If the AWT going changes (e.g. Wet Fast / Wet Slow) → re-run MC and reconsider the two front-runners (#2, #1)

CONFIDENCE: HIGH for #2 placing. MEDIUM for the full 雙膽拖 ticket, which also needs #8 in the top 3.

CAVEATS:
- Historical sync not re-run in this session (stated as already done).
- Low dividend expected: #2 is 1.5 favourite and the MC top trio 2-8-4 has fair odds of about $3.6. Value depends on #8 (12x) and the third horse being under-bet.
- Skill threshold inconsistency: the A/B comparison table says 雙膽拖 needs the 2nd horse at Adj Place% >= 70%, while the decision flow and Rules 5, 16 and 19 say >= 63%. #8 is at 69.9%, so the 63% rule was used. Under a strict 70% reading, use the fallback 膽拖 ticket above (10 combos, $100).
- #9 ZHUANG YUAN GLORY has 0 form runs in the MC dataset, but SCMP shows a recent local 3rd over dirt 1200m. The MC may underrate it (it is the market's 2nd pick at 6.6). It is in the pool either way.
- The SCMP odds column does not match the HKJC pool (it shows #5 MUST GO at 8.2 despite the scratching, and #8 at 19 vs HKJC 12). The SCMP Q/QP matrix was reported as identical for Q and QP, so it is not usable. HKJC odds were used throughout.
- Trio probabilities come from a Harville approximation on Adj/MC Win%, which tends to overstate a heavy favourite's trio coverage. analyze-race.ts does not output trio probabilities directly.
- Odds snapshot is 11:24 HKT. Re-check before the race.
```

```
───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: #2 BUSTLING CITY (MC Win% 63.9%, MC Place% 93.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #8 (68.9%), #4 (43.8%), #9 (29.8%), #1 (24.6%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (#9 is 6.6 and #1 is 9.2, both under 10)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none (#7 13, #6 25, #10 30)
Action: no replacement or addition
Final legs: #8, #4, #9, #1
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
Est. ticket hit probability (Harville on raw MC Win%): ~73.5%

STRATEGY B TICKET: 膽 #2 / 腳 #8, #4, #9, #1
  2-8-4 (34.2%), 2-8-9 (17.8%), 2-8-1 (11.7%), 2-4-9 (4.9%), 2-4-1 (3.2%), 2-9-1 (1.6%)

Comparison: Strategy A (雙膽拖, 4 combos, $40) locks in #8 alongside #2 and adds #7 (via the SCMP
excuses adjustment). Strategy B (膽拖, 6 combos, $60) leaves #8 as a leg, so it still pays out if #8
misses, but it has no #7.
═══════════════════════════════════════════════════════════
```
