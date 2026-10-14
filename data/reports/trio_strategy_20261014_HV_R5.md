# Trio (Any Order) Strategy — Happy Valley | 2026-10-14 | Race 5

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-14 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings (2 reserves not running)
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, kelly 0.35, min-edge 5)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed (odds columns ⚠️ unlabelled; QP/Q matrix not retrieved)
ODDS SOURCE: HKJC pool (fetch-odds.ts, data/odds/odds_20261014_HV.json, captured 11:00 HKT 14-Oct)
             SCMP odds: ⚠️ partial (unlabelled columns) | HKJC live: ✅ loaded (snapshot, not final)

RACE: R5 — Class 4 (Finance Handicap) | 1200m | Turf "A" | Good | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 30.5%) | POOL SIZE: 7
MODE: B: Standard Pool (6) + 1 extra (Rule 8: Adj Place% ≥ 20% must be in pool)
BET STRUCTURE: 膽拖 1膽 + 6腳 = C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Step 2 — Data Validation Summary

```
Meeting: HV 2026-10-14 | Going: Good | Surface: Turf
Target Race(s): R5 (Class 4 | 1200m | 12 starters)
Scratchings: none (reserves Monta Frutta, Green Field Pearl not in field)
Odds coverage: 12/12 horses with win odds
SCMP data: ✅ loaded (odds columns unlabelled; QP/Q grid not retrieved)
```

- ✅ Racing confirmed, ≥3 starters, odds for all runners, 12 jockey + 12 trainer profiles loaded by MC.
- ✅ 12/12 horses enriched with form. #9 MEGA AWESOME has only 3 runs (sparse but ≥2 starts).
- ⚠️ #3 GOLDEN BRILLIANT: last run 08-Apr-2026 (~189 days off, >90-day layoff); vet: left fore fetlock injury, passed 21/09/2026 (23 days ago).
- ⚠️ Place odds used inside the MC were estimated from win odds (tool note).
- Historical sync not re-run (already synced for this meeting, per instruction).

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 1 | BROWNNEEDSFURTHER | 29.5% | 61.4% | 6.2 | ✅ | ✅ | 1/1/2/5/2/11 | ★ 膽 (Banker) | 1-7: 9.3% (10.8) |
| 7 | VICTOR THE RAPID | 13.9% | 41.1% | 6.8 | ✅ | ✅ | 6/9/8/10/10/6 | 腳 (Leg) | 1-7: 9.3% (10.8) |
| 4 | RUN RUN SUNRISE | 12.3% | 36.0% | 18 | ✅ | ❌ | 12/7/11/9/10/3 | 腳 (Leg) | 1-4: 7.4% (13.6) |
| 6 | DAN ATTACK | 11.9% | 36.5% | 5.9 | ✅ | ✅ | 2/2/4/5/2/3 | 腳 (Leg) | 1-6: 7.8% (12.8) |
| 2 | FRIENDS OF SHAJING | 11.3% | 35.4% | 5.5 | ✅ | ✅ | 3/10/5/4/7/4 | 腳 (Leg) | 1-2: 8.2% (12.2) |
| 3 | GOLDEN BRILLIANT | 5.9% | 23.1% | 11 | ✅ | ❌ | 1/1/4/4/10/8 | — (replaced by #12) | 1-3: 4.0% (24.8) |
| 5 | CHARMING BABE | 5.2% | 21.2% | 10 | ✅ | ❌ | 8/4/12/6/7/10 | 腳 (Leg) | — |
| 12 | FREE PONY | 4.1% | 16.2% | 7.6 | ❌ | ✅ | 6/10/8/9/8/3 | 腳 (Leg) — replaced #3 (Win-odds candidate) | — |
| 11 | LUCKY TWENTY | 2.4% | 11.2% | 19 | ❌ | ❌ | 11/12/6/11/14/6 | — | — |
| 10 | EVERSTAR | 2.1% | 9.0% | 20 | ❌ | ❌ | 9/10/9/7/10/13 | — | — |
| 9 | MEGA AWESOME | 1.4% | 7.8% | 28 | ❌ | ❌ | 7/9/7 | — | — |
| 8 | CORNERSTONE | 0.1% | 1.1% | 21 | ❌ | ❌ | 14/10/7/10/12/9 | — | — |

Market: Overround 22.2%. MC's big overlays are #1 Brownneedsfurther (6.2 vs MC fair ~3.4, undervalued ~83%) and #4 Run Run Sunrise (18 vs MC fair ~8.1, undervalued ~121%). Favourite #6 Dan Attack (5.9) and #2 (5.5) are slightly overbet vs MC; #8 Cornerstone rated overvalued (~98%).

---

## STRATEGY A

### SCMP data (Race 5)

| # | Horse | SCMP odds (unlabelled) | Star Form signal | TIR flag | Vet flag | Trackwork | Style |
|---|-------|------------------------|------------------|----------|----------|-----------|-------|
| 1 | Brownneedsfurther | 5.9 / 6.3 / 1.6 | **+form** (back-to-back HV 1200m wins, top weight) | bumped after start (once), raced keenly | clear | — | Midfield |
| 2 | Friends Of Shajing | 5.7 / 5.2 / 2.4 | 5 minor placings from last 7 HV 1200m; difficult gate (11) | clear | clear | — | Midfield |
| 3 | Golden Brilliant | 3.7 | won twice from behind midfield; fetlock injury in April | bumped heavily on jumping; rider stopped riding (**-notRO**) | **-injury30d** (fetlock, passed 21/09) | — | Behind mid |
| 4 | Run Run Sunrise | 6.2 | misfired 5 times; first try at HV 1200m | **+excuses** (bumped several times 900–800M) | clear | — | Midfield |
| 5 | Charming Babe | 8.7 / 10 / 3.4 | one 5th from 9 HV 1200m starts | rider: wants further | clear | — | Back |
| 6 | Dan Attack | 5.6 / 5.8 / 2.4 | **+form** ("rallying" win; closing 2nd last time) | **+excuses** (restricted room) / **-notRO** (not fully ridden out) | 8yo (not on SCMP vet; C4 → no penalty) | — | Closer |
| 7 | Victor The Rapid | 7.9 / 7.2 / 2.5 | closing 6th last time | **+excuses** (shifted for clear run, contact 100M) | clear | **+trial** ("top condition… rates highly") | Closer |
| 8 | Cornerstone | 4.9 | no impression in 8 local sprints | didn't travel; going excuse | clear | — | Midfield |
| 9 | Mega Awesome | 7.0 | 7th/9th/7th | clear | clear | — | Behind mid |
| 10 | Everstar | 5.1 | out of top 10 in 10 starts | **+excuses** (unbalanced after contact 450M) | clear | — | Back |
| 11 | Lucky Twenty | 5.8 | no better than 6th | contact after start (minor) | clear | — | Beyond mid |
| 12 | Free Pony | 8.4 / 8.0 / 2.9 | last-to-6th from gate 11 | shifted across, raced keenly | clear | — | Back |

### HORSE RANKINGS

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1 | 1 | BROWNNEEDSFURTHER | 29.5% | 61.4% | +form +1 | +form +1 | 30.5% | 62.4% | 6.2 | B Avdulla | Mid | +form | ★ 膽 (Banker) |
| 2 | 7 | VICTOR THE RAPID | 13.9% | 41.1% | excuses +2, trial +2 | excuses +2, trial +2 | 17.9% | 45.1% | 6.8 | C Y Ho | Close | +excuses, +trial | 腳 (Leg) |
| 3 | 4 | RUN RUN SUNRISE | 12.3% | 36.0% | excuses +2 | excuses +2 | 14.3% | 38.0% | 18 | K C Leung | Mid | +excuses | 腳 (Leg) |
| 4 | 6 | DAN ATTACK | 11.9% | 36.5% | excuses +2, +form +1, -notRO −2 | excuses +2, +form +1 | 12.9% | 39.5% | 5.9 | H Bentley | Close | +excuses, +form, -notRO | 腳 (Leg) |
| 5 | 2 | FRIENDS OF SHAJING | 11.3% | 35.4% | 0 | 0 | 11.3% | 35.4% | 5.5 | C L Chau (-2) | Mid | — | 腳 (Leg) |
| 6 | 5 | CHARMING BABE | 5.2% | 21.2% | 0 | 0 | 5.2% | 21.2% | 10 | H Y Yuen (-7) | Back | — | 腳 (Leg) |
| 7 | 10 | EVERSTAR | 2.1% | 9.0% | excuses +2 | excuses +2 | 4.1% | 11.0% | 20 | K Teetan | Back | +excuses | — |
| 8 | 12 | FREE PONY | 4.1% | 16.2% | 0 | 0 | 4.1% | 16.2% | 7.6 | M L Yeung | Back | — | — |
| 9 | 11 | LUCKY TWENTY | 2.4% | 11.2% | 0 | 0 | 2.4% | 11.2% | 19 | M F Poon | Beyond mid | — | — |
| 10 | 3 | GOLDEN BRILLIANT | 5.9% | 23.1% | -injury30d −3, -notRO −2, +form +1 | -injury30d −4, +form +1 | 1.9% | 20.1% | 11 | A Badel | Behind mid | -injury30d, -notRO, +form | 腳 (Leg) |
| 11 | 9 | MEGA AWESOME | 1.4% | 7.8% | 0 | 0 | 1.4% | 7.8% | 28 | A Atzeni | Behind mid | — | — |
| 12 | 8 | CORNERSTONE | 0.1% | 1.1% | 0 | 0 | 0.1% | 1.1% | 21 | R Kingscote | Mid | — | — |

Note: positive flags carry the same value onto Adj Place%; -injury30d is −3 Win / −4 Place; other negative flags (-notRO) are Win%-only. Minor start bumps (#1, #11) and wide-barrier shifts (#12) not treated as excuses. Age flag not applied (#6 8yo; C4, rule applies C3+). No horse hit the ±8/±10 caps. Adjusted figures not renormalised.

Reasoning: #1 is the clear MC top (29.5% / 61.4%), arrives on back-to-back HV 1200m wins, has 10 starts (banker-eligible) and a mid draw (5) — Competitive race (30.5% < 35%) → Mode B. Pool = top 3 by Adj Win% (#1, #7, #4) + next by Adj Place% (#6 39.5%, #2 35.4%, #5 21.2%); all five of #1/#7/#4/#6/#2 clear the 25% must-include line. #3 Golden Brilliant (Adj Place% 20.1%) is added as a 7th horse under Rule 8 (≥ 20% Adj Place% must be in pool) despite injury/layoff flags — no narrative exclusion, odds 11 ≤ 15. Pace: HV 1200m favours on-pace runners; #3 (gate 1), #4 (gate 2) and #1 (gate 5) get the best positions, while closers #6/#7 need luck from 6–7 and #2 must overcome gate 11. #7's positive stall test plus last-start interference make it the strongest second string.

### TRIO POOL (any order)

```
POOL: #1, #7, #4, #6, #2, #5, #3
MODE: B (+1 via Rule 8) | POOL SIZE: 7

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #1 BROWNNEEDSFURTHER (Adj Place% 62.4%) ← locked in every combo
腳 (Legs):  #7, #4, #6, #2, #5, #3
2nd-ranked #7 Adj Place% 45.1% < 63% → no 雙膽拖
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville from normalised Adj Win%; fair odds = 1/p, no takeout):

| Rank | Horses (any order) | Trio prob. | Est. Fair Odds |
|------|-------------------|------------|----------------|
| 1 | #1, #7, #4 | 8.2% | $12 |
| 2 | #1, #7, #6 | 7.3% | $14 |
| 3 | #1, #7, #2 | 6.3% | $16 |
| 4 | #1, #4, #6 | 5.6% | $18 |
| 5 | #1, #4, #2 | 4.8% | $21 |
| 6 | #1, #6, #2 | 4.2% | $24 |
| 7 | #1, #7, #5 | 2.7% | $37 |
| 8 | #1, #4, #5 | 2.1% | $49 |

Estimated ticket hit probability (all 15 combos): ~47.7%.

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TICKET: Trio 膽拖  1 >< 2, 3, 4, 5, 6, 7

TOP COMBINATIONS (highest value):
  1-7-4 (both MC overlays: #1 6.2, #4 18), 1-4-6, 1-4-2, 1-7-6, 1-7-2

PASS CONDITIONS:
- If #1 BROWNNEEDSFURTHER (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider; re-run MC
- If a leg is scratched → keep remaining legs (combos drop to C(5,2)=10)
- Optional trim: dropping #3 (Rule-8 borderline, injury) gives 1膽+5腳 = 10 combos / $100
```

CONFIDENCE: MEDIUM

CAVEATS:
- Odds are an 11:00 HKT snapshot; SCMP odds columns were unlabelled (first column read as win: broadly consistent, e.g. #1 5.9 vs 6.2, #6 5.6 vs 5.9).
- SCMP QP/Q matrix not retrieved — Q/QP value cross-check (4e) not done.
- Trio probabilities are Harville-derived from MC/Adj Win%, not direct MC trio counts.
- Banker #1 carries top weight (135 lb) and raced keenly last start; MC finish-time projection actually has #7 and #4 faster than #1 (4.2L) — the main banker risk.
- #3 Golden Brilliant: fetlock injury passed only 23 days ago, ~6-month layoff — high uncertainty either way.
- Field differentiation is low among #7/#4/#6/#2 (all rating 62–63, within 1 pt).

---

## STRATEGY B (MC-only)

```
Banker: #1 BROWNNEEDSFURTHER (MC Win% 29.5%, MC Place% 61.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #7, #6, #4, #2, #3, #5
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #3 GOLDEN BRILLIANT (MC Place% 23.1%, Win odds 11)
   (#5 CHARMING BABE 21.2% at odds 10 — not > 10, so not replaceable)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #12 FREE PONY (Win odds 7.6, MC Place% 16.2%)
Action: #12 replaced #3 (1-for-1 swap)
Final legs: #7, #6, #4, #2, #5, #12
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: Trio 膽拖  1 >< 2, 4, 5, 6, 7, 12
  Top combos (Harville, raw MC Win%): 1-7-4 6.1% ($16), 1-7-6 5.8% ($17), 1-7-2 5.5% ($18),
  1-4-6 5.1% ($20), 1-4-2 4.8% ($21), 1-6-2 4.6% ($22)
  Estimated ticket hit probability: ~47.0%
```

Comparison vs Strategy A: same banker (#1), same cost ($150, 15 combos) and the same banker-plus-five core (#1 + #7, #4, #6, #2, #5). The only difference is the sixth leg — Strategy A keeps #3 Golden Brilliant (Rule 8, Adj Place% 20.1%); Strategy B swaps #3 out for market-backed #12 Free Pony (7.6).

═══════════════════════════════════════════════════════════
