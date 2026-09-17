# TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-16 | Race 2

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 16-Sep-2026 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all, 2,259 historical races)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork / Odds parsed (QP/Q matrix: ⚠️ partial, not used)
ODDS SOURCE: HKJC live pool (fetch-odds.ts, captured 17:55 HKT 16-Sep)
             SCMP odds: ✅ loaded (earlier snapshot, differs) | HKJC live: ✅ loaded

RACE: R2 — LIDO HANDICAP | Class 4 (60-40) | 1200m | Turf "B" course | Good | 12 runners | 19:40
CLASSIFICATION: Dominant (#3 Adj Win% 42.7%) | POOL SIZE: 6
MODE: A: Tight Pool (5) expanded to 6 — Rule 8 (all Adj Place% ≥ 20% must be in pool)
BET STRUCTURE: 膽拖 1膽+5腳 = C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Validation Summary

```
Meeting: Happy Valley 2026-09-16 | Going: Good | Surface: Turf ("B" course)
Target Race(s): R2 (Class 4 | 1200m | 12 runners)
Scratchings: none (reserves HONORARY, I AM BACK not running)
Odds coverage: 12 horses with odds (HKJC win + place)
SCMP data: ✅ loaded (QP/Q matrix extraction unreliable — not used)
```

- ≥3 starters ✅ | Odds for all 12 ✅ | Jockey stats 12/12 ✅ | Trainer stats 12/12 ✅ | Form enriched 12/12 ✅
- Sparse form: #1 GLORIOUS DYNASTY (2 runs), #2 TRUE BROTHERS (3 runs), #4 GRIT SPIRIT (4 runs)

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (runs) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 3 | BRIGHT DAY | 41.7% | 75.1% | 5.7 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 3-11: 15.9% (6.3) |
| 11 | LOVING VIBES | 16.0% | 48.0% | 3.3 | ✅ | ✅ | 10 | 腳 (Leg) | 3-11: 15.9% (6.3) |
| 5 | HOLMES A COURT | 12.2% | 40.7% | 6.6 | ✅ | ✅ | 10 | 腳 (Leg) | 3-5: 12.3% (8.1) |
| 9 | VERY GRATEFUL | 10.4% | 36.7% | 19 | ✅ | ❌ | 10 | 腳 (Leg) | 3-9: 10.8% (9.3) |
| 8 | DAN ATTACK | 5.6% | 23.7% | 5.0 | ✅ | ✅ | 10 | 腳 (Leg) | 3-8: 6.2% (16.2) |
| 7 | CALIFORNIA BAY | 5.0% | 22.0% | 12 | ✅ | ❌ | 10 | — (replaced by #2) | 3-7: 5.6% (17.8) |
| 10 | LEGEND STAR | 2.4% | 13.4% | 31 | ❌ | ❌ | 10 | — | — |
| 6 | KANSAS | 2.1% | 12.2% | 31 | ❌ | ❌ | 8 | — | — |
| 1 | GLORIOUS DYNASTY | 2.0% | 11.1% | 47 | ❌ | ❌ | 2 | — | — |
| 12 | TACTICAL COMMAND | 1.6% | 9.3% | 24 | ❌ | ❌ | 10 | — | — |
| 2 | TRUE BROTHERS | 0.5% | 4.0% | 9.0 | ❌ | ✅ | 3 | 腳 (Leg) (replacement candidate) | — |
| 4 | GRIT SPIRIT | 0.5% | 3.9% | 50 | ❌ | ❌ | 4 | — | — |

Market: Overround 22.5%. MC rates #3 BRIGHT DAY (5.7) and #9 VERY GRATEFUL (19) as clearly undervalued; market favourite #11 LOVING VIBES (3.3) and #8 DAN ATTACK (5.0) are shorter than MC suggests; #2 TRUE BROTHERS (9.0) is heavily overbet vs MC (4.0% Place).

Note: the finish-time projection in the tool output ranks #12 TACTICAL COMMAND and #9 VERY GRATEFUL fastest by speed figure and #3 only 8th — the MC composite rating (form, jockey, class, trip) still makes #3 the clear top pick. Speed figures are a secondary signal that disagrees on #3.

---

## SCMP DATA (R2)

| # | Horse | SCMP Win | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------|------------------|----------|----------|-----------|---------------|
| 1 | GLORIOUS DYNASTY | 41 | ran on from behind midfield (local debut) | +excuses (bumped at start, steadied when crowded) | clear | +trial (3rd to Nyx Gluck) | Closer |
| 2 | TRUE BROTHERS | 10 | faltering last on local debut | bumped once at start (single run) | -injury30d (blood in trachea, passed 28-Aug = 19 days) | — | Midfield |
| 3 | BRIGHT DAY | 6.9 | +form (box-seat 2nd, then won from midfield) | clear | clear | — | Stalker |
| 4 | GRIT SPIRIT | 32 | never likely in 3 local runs | +excuses (very wide, no cover) | clear | — | — |
| 5 | HOLMES A COURT | 7.7 | on the pace for 7th/4th/6th | clear | clear | — | On-pace |
| 6 | KANSAS | 29 | struggled in 7 local sprints | +excuses (keen, steadied) | clear | — | — |
| 7 | CALIFORNIA BAY | 13 | dirt win in May (not recent) | +excuses (bumped, hampered) | clear | — | Midfield |
| 8 | DAN ATTACK | 5.0 | rallying HV 1200m winner last Sep | clear (pressured in front, 2nd last start) | -age (8+) | — | Front/On-pace |
| 9 | VERY GRATEFUL | 15 | ran on for minor cheques at HV 1200m | jumped only fairly, contact (not repeated) | clear | — | Closer |
| 10 | LEGEND STAR | 22 | HV 1200m winner in Nov | shifted across from wide gate | clear | — | Closer |
| 11 | LOVING VIBES | 3.1 | +form (returned to form, 3 straight 2nds) | contact leaving 800m (minor) | clear | — | Stalker |
| 12 | TACTICAL COMMAND | 19 | 2nd in Feb, poor since | clear | clear | — | Midfield |

---

## STRATEGY A

### HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 3 | BRIGHT DAY | 41.7% | 75.1% | +form +1 | +form +1 | 42.7% | 76.1% | 5.7 | K C Leung | Stalk | +form | ★ 膽 (Banker) |
| 11 | LOVING VIBES | 16.0% | 48.0% | +form +1 | +form +1 | 17.0% | 49.0% | 3.3 | A Atzeni | Stalk | +form | 腳 (Leg) |
| 5 | HOLMES A COURT | 12.2% | 40.7% | 0 | 0 | 12.2% | 40.7% | 6.6 | B Avdulla | On-pace | — | 腳 (Leg) |
| 9 | VERY GRATEFUL | 10.4% | 36.7% | 0 | 0 | 10.4% | 36.7% | 19 | M Chadwick | Close | — | 腳 (Leg) |
| 7 | CALIFORNIA BAY | 5.0% | 22.0% | excuses +2 | excuses +2 | 7.0% | 24.0% | 12 | K Teetan | Stalk | +excuses | 腳 (Leg) |
| 1 | GLORIOUS DYNASTY | 2.0% | 11.1% | excuses +2, trial +2 | excuses +2, trial +2 | 6.0% | 15.1% | 47 | L Hewitson | Close | +excuses, +trial | — |
| 6 | KANSAS | 2.1% | 12.2% | excuses +2 | excuses +2 | 4.1% | 14.2% | 31 | R Kingscote | — | +excuses | — |
| 8 | DAN ATTACK | 5.6% | 23.7% | -age −2 | -age −2 | 3.6% | 21.7% | 5.0 | H Bentley | Front | -age | 腳 (Leg) |
| 4 | GRIT SPIRIT | 0.5% | 3.9% | excuses +2 | excuses +2 | 2.5% | 5.9% | 50 | C L Chau | — | +excuses | — |
| 10 | LEGEND STAR | 2.4% | 13.4% | 0 | 0 | 2.4% | 13.4% | 31 | Y L Chung | Close | — | — |
| 12 | TACTICAL COMMAND | 1.6% | 9.3% | 0 | 0 | 1.6% | 9.3% | 24 | M F Poon | Midfield | — | — |
| 2 | TRUE BROTHERS | 0.5% | 4.0% | -injury30d −3 | -injury30d −4 | 0.0% | 0.0% | 9.0 | A Badel | Midfield | -injury30d | — |

**Factor notes:** Adjusted % floored at 0. `-age` applied to #8 in this Class 4 race (interpreting "C3+" as Class 3 and lower grades). `+form` applied only where Star Form cites a win/placings within the last ~3 starts (#3, #11); #7's win was 4 starts back, so it did not count.

**Reasoning:** #3 BRIGHT DAY is the clear MC top pick (41.7% Win / 75.1% Place, 10 form runs, 6 at the trip), draws 3 at HV 1200m and has a positive Star Form. It is well ahead of the field, so the race is **Dominant**. Base Mode A uses the top 4 by Adj Place% as legs (#11, #5, #9, #7). **Rule 8** adds #8 DAN ATTACK (Adj Place% 21.7% ≥ 20%), which the market also backs at 5.0 despite the age flag (Rule 9), so the pool grows to 6. That fits the skill's HV note to use wider pools. #2 TRUE BROTHERS (9.0) stays out: the raw MC already scores it at 4.0% Place, so leaving it out is a model call and not a flag-based exclusion. Pace: HV 1200m favours on-pace horses, which helps #5 and #8; #3 and #11 (low draws / light weight 118 lbs for #11) get a good trip from the stalking positions.

### TRIO POOL (any order)

```
POOL: #3, #11, #5, #9, #7, #8
MODE: A (expanded by Rule 8) | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #3 BRIGHT DAY (Adj Place% 76.1%) ← locked in every combo
腳 (Legs):  #11, #5, #9, #7, #8
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
(雙膽拖 not used: 2nd-ranked #11 Adj Place% 49.0% < 63%)
```

**TOP TRIO COMBINATIONS (by combined Adj Place%)**

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #3, #11, #5 | 15.2% | $7 |
| 2 | #3, #11, #9 | 13.7% | $7 |
| 3 | #3, #5, #9 | 11.4% | $9 |
| 4 | #3, #11, #7 | 8.9% | $11 |
| 5 | #3, #11, #8 | 8.1% | $12 |

(Combined Place% = product of individual Adj Place% — rough independence proxy, not a true joint probability.)

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

ALL COMBINATIONS:
  3-11-5 (15.2%), 3-11-9 (13.7%), 3-5-9 (11.4%), 3-11-7 (8.9%), 3-11-8 (8.1%),
  3-5-7 (7.4%), 3-5-8 (6.7%), 3-9-7 (6.7%), 3-9-8 (6.1%), 3-7-8 (4.0%)

PASS CONDITIONS:
- If #3 BRIGHT DAY (banker) is scratched → VOID ticket (do not restructure)
- If a leg is scratched → drop that leg (combos fall to 6)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider front-runner bias (#5, #8)

CONFIDENCE: MEDIUM-HIGH (dominant MC banker, but HV Class 4 upset risk and speed figures disagree on #3)

CAVEATS:
- Odds sources disagree: HKJC live (17:55 HKT) vs an earlier SCMP snapshot (e.g. #3 5.7 vs 6.9, #2 9.0 vs 10, #9 19 vs 15). Report uses HKJC live odds, the same odds the MC used.
- SCMP QP/Q matrix extraction was unreliable (implausible values), so it was not used for the value check.
- Place odds in MC were estimated from win odds.
- The speed-figure finish-time projection ranks #3 only 8th, a secondary signal against the banker.
- Sparse form: #1 (2 runs), #2 (3 runs), #4 (4 runs) — MC less reliable for these.
- #3 is market 2nd favourite (5.7) and #11 favourite (3.3), so the top combos will pay low Trio dividends. Value comes from #9 (19) or #7 (12) filling the frame.
```

---

## STRATEGY B (MC-only)

```
Banker: #3 BRIGHT DAY (MC Win% 41.7%, MC Place% 75.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #11 (48.0%), #5 (40.7%), #9 (36.7%), #8 (23.7%), #7 (22.0%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #7 CALIFORNIA BAY (MC Place% 22.0%, Win odds 12)
   (#8 DAN ATTACK 23.7% not replaceable — Win odds 5.0 ≤ 10)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #2 TRUE BROTHERS (Win odds 9.0, MC Place% 4.0%)
Action: #2 replaced #7 (1-for-1 swap)
Final legs: #11, #5, #9, #8, #2
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #3 / 腳 #11, #5, #9, #8, #2
  3-11-5 (14.7%), 3-11-9 (13.2%), 3-5-9 (11.2%), 3-11-8 (8.5%), 3-5-8 (7.2%),
  3-9-8 (6.5%), 3-11-2 (1.4%), 3-5-2 (1.2%), 3-9-2 (1.1%), 3-8-2 (0.7%)
  (combined % = product of raw MC Place%)
```

**A vs B comparison:** Same banker (#3), same cost ($100, 10 combos), and 4 of 5 legs are shared (#11, #5, #9, #8). The only difference is the last leg: A keeps #7 CALIFORNIA BAY (Adj Place% 24.0%, excuses last start), while B swaps it for the market-backed #2 TRUE BROTHERS (9.0, MC Place% 4.0%, vet flag). Note that on the SCMP snapshot odds #2 was 10, which is not below 10, so the swap depends on which odds snapshot is used.

```
═══════════════════════════════════════════════════════════
```
