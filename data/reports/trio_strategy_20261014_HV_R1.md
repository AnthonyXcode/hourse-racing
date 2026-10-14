# Trio (Any Order) Strategy — Happy Valley | 2026-10-14 | Race 1

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-14 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings (2 reserves not running)
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, kelly 0.35, min-edge 5)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork / Odds parsed (QP/Q matrix not mappable)
ODDS SOURCE: HKJC pool (fetch-odds.ts, data/odds/odds_20261014_HV.json, captured 11:01 HKT 14-Oct)
             SCMP odds: ✅ loaded | HKJC live: ✅ loaded (snapshot, not final)

RACE: R1 — Class 5 (D'Aguilar Handicap) | 1650m | Turf "A" | Good | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 26.5%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Step 2 — Data Validation Summary

```
Meeting: HV 2026-10-14 | Going: Good | Surface: Turf
Target Race(s): R1 (Class 5 | 1650m | 12 starters)
Scratchings: none (reserves #13 To Infinity, #14 Super Sicario not in field)
Odds coverage: 12/12 horses with win odds
SCMP data: ✅ loaded (QP/Q grid ⚠️ unreadable)
```

- ✅ Racing confirmed, ≥3 starters, odds for all runners, 12 jockey + 12 trainer profiles loaded by MC.
- ✅ All 12 horses enriched with form (7–10 past runs each; no debutants, no sparse form).
- ⚠️ Place odds used inside the MC were estimated from win odds (tool note).
- ⚠️ Scraper log line printed `distance=1200m` early, but the saved racecard, MC header and SCMP all confirm **1650m** — treated as 1650m.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 5 | THE ALL ROUNDER | 24.5% | 55.7% | 6.3 | ✅ | ✅ | 3/2/4/5/9/3 | ★ 膽 (Banker) | 5-6: 8.7% (11.5) |
| 6 | MADE FOR LIFE | 17.0% | 45.3% | 13 | ✅ | ❌ | 4/6/4/8/6/10 | 腳 (Leg) | 5-6: 8.7% (11.5) |
| 1 | CHEERFUL WONGCHOY | 14.6% | 42.4% | 4.8 | ✅ | ✅ | 5/4/8/8/8/8 | 腳 (Leg) | 1-5: 8.1% (12.4) |
| 10 | ORIENTAL SURPRISE | 14.3% | 41.3% | 6.3 | ✅ | ✅ | 3/2/3/2/2/12 | 腳 (Leg) | 5-10: 8.1% (12.3) |
| 11 | WINDICATOR FAMILY | 13.5% | 38.9% | 5.8 | ✅ | ✅ | 3/5/7/12/2/9 | 腳 (Leg) | 5-11: 7.0% (14.4) |
| 8 | SETANTA | 5.5% | 22.4% | 10 | ✅ | ❌ | 8/4/7/4/2/8 | 腳 (Leg) | — |
| 9 | KASA PAPA | 3.6% | 16.0% | 19 | ❌ | ❌ | 5/6/5/4/10/9 | — | — |
| 12 | WINNING DIAMOND | 2.0% | 9.6% | 14 | ❌ | ❌ | 6/11/9/4/10/4 | — | — |
| 3 | WHOWROTETHATSONG | 1.8% | 9.3% | 9.8 | ❌ | ✅ | 7/11/6/7/12/10 | 腳 (Leg) — added (Win-odds candidate) | — |
| 2 | THE LION KING | 1.6% | 8.3% | 22 | ❌ | ❌ | 11/8/11/6/4/3 | — | — |
| 4 | FLASH STAR | 0.9% | 5.9% | 38 | ❌ | ❌ | 8/12/6/9/9/11 | — | — |
| 7 | OUR LUCKY GLORY | 0.8% | 4.9% | 18 | ❌ | ❌ | 11/10/7/4/3/10 | — | — |

Market: Overround 22.9%. MC sees #6 Made For Life as the big overlay (undervalued ~121%, 13.0 vs MC fair ~5.9) and #5 as a mild overlay; favourite #1 (4.8) and #11 (5.8) are slightly overbet vs MC; #3 and #7 rated overvalued (~83–85%).

---

## STRATEGY A

### SCMP data (Race 1)

| # | Horse | Win | Place | Star Form signal | TIR flag | Vet flag | Trackwork | Style |
|---|-------|-----|-------|------------------|----------|----------|-----------|-------|
| 1 | Cheerful Wongchoy | 4.9 | 2.4 | drops to C5 | clear | clear | — | Midfield |
| 2 | The Lion King | 22 | 6.2 | front-runner, drops to C5 | checked | **-perf, blood in trachea 09/09, passed 28/09 (16d)** | — | Front |
| 3 | Whowrotethatsong | 9.1 | 3.7 | close-up in 3 of last 4 at HV 1650 | **+excuses** (tight, no clear run) | clear | — | Midfield |
| 4 | Flash Star | 35 | 9.8 | trip a query | **+excuses** (wide, no cover) | clear | — | Over-races |
| 5 | The All Rounder | 6.3 | 2.0 | placings 5 of last 7 | **+excuses** (held up 500–400M) | clear | — | Midfield/closer |
| 6 | Made For Life | 12 | 4.4 | 4th from near last | slow to begin | clear | — | Closer |
| 7 | Our Lucky Glory | 17 | 4.7 | no luck last time | **+excuses** (steadied) | age note (8yo; C5 → no penalty) | **+trial** (two positive trials) | Midfield |
| 8 | Setanta | 10 | 3.2 | **+draw** ("ideal draw") | **+excuses** (steadied 250M) | clear | — | Closer |
| 9 | Kasa Papa | 19 | 5.4 | HV placings | clear | age note (C5 → no penalty) | — | Stalker |
| 10 | Oriental Surprise | 6.9 | 2.1 | closing 3rd, neck 2nd | clear | clear | **+trial** (eye-catching work) | Stalker/closer |
| 11 | Windicator Family | 5.9 | 1.8 | **+form** ("rallying" 2nd/3rd) | bumped at start (once) | clear | — | Speed/stalker |
| 12 | Winning Diamond | 13 | 4.1 | non-factor from wide gate | shifted across | clear | — | Midfield |

### HORSE RANKINGS

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1 | 5 | THE ALL ROUNDER | 24.5% | 55.7% | excuses +2 | excuses +2 | 26.5% | 57.7% | 6.3 | C Y Ho | Mid/Close | +excuses | ★ 膽 (Banker) |
| 2 | 6 | MADE FOR LIFE | 17.0% | 45.3% | 0 | 0 | 17.0% | 45.3% | 13 | K C Leung | Close | — | 腳 (Leg) |
| 3 | 10 | ORIENTAL SURPRISE | 14.3% | 41.3% | trial +2 | trial +2 | 16.3% | 43.3% | 6.3 | H Y Yuen (-7) | Stalk | +trial | 腳 (Leg) |
| 4 | 1 | CHEERFUL WONGCHOY | 14.6% | 42.4% | 0 | 0 | 14.6% | 42.4% | 4.8 | Z Purton | Mid | — | 腳 (Leg) |
| 5 | 11 | WINDICATOR FAMILY | 13.5% | 38.9% | +form +1 | +form +1 | 14.5% | 39.9% | 5.8 | K Teetan | Stalk | +form | 腳 (Leg) |
| 6 | 8 | SETANTA | 5.5% | 22.4% | excuses +2, +draw +1 | excuses +2, +draw +1 | 8.5% | 25.4% | 10 | Y L Chung (-2) | Close | +excuses, +draw | 腳 (Leg) |
| 7 | 7 | OUR LUCKY GLORY | 0.8% | 4.9% | excuses +2, trial +2 | excuses +2, trial +2 | 4.8% | 8.9% | 18 | H Bentley | Mid | +excuses, +trial | — |
| 8 | 3 | WHOWROTETHATSONG | 1.8% | 9.3% | excuses +2 | excuses +2 | 3.8% | 11.3% | 9.8 | L Ferraris | Mid | +excuses | — |
| 9 | 9 | KASA PAPA | 3.6% | 16.0% | 0 | 0 | 3.6% | 16.0% | 19 | C L Chau (-2) | Stalk | — | — |
| 10 | 4 | FLASH STAR | 0.9% | 5.9% | excuses +2 | excuses +2 | 2.9% | 7.9% | 38 | L Hewitson | Over-races | +excuses | — |
| 11 | 12 | WINNING DIAMOND | 2.0% | 9.6% | 0 | 0 | 2.0% | 9.6% | 14 | R Kingscote | Mid | — | — |
| 12 | 2 | THE LION KING | 1.6% | 8.3% | -injury30d −3, -perf −2 | -injury30d −4 | 0.0% (floored) | 4.3% | 22 | A Atzeni | Front | -injury30d, -perf | — |

Note: positive flags carry the same value onto Adj Place% (per template); -injury30d is −3 Win / −4 Place. Age flag (#7, #9 8yo+) not applied: C5 race (rule applies C3+). No horse hit the ±8/±10 caps. Adjusted figures are not renormalised.

Reasoning: #5 is the clear MC top (24.5% / 55.7%), most consistent place-getter in the field (5 of last 7 placed), and has a legitimate excuse last start (held up 500–400M) — banker eligible (10 starts). Pool = exactly the six horses with Adj Place% ≥ 25% (#5, #6, #10, #1, #11, #8), which is also the Mode B construction (top 3 Adj Win% #5/#6/#10 + next 3 by Adj Place% #1/#11/#8). Pace: #2 The Lion King likely leads but carries injury/perf flags; #11 tracks speed from gate 2; #8 (gate 4) and #6 (gate 5) get the good draws to settle; #5 must overcome gate 11 at HV 1650m — main risk to the banker. Stalker bias at HV 1650m suits #10/#11.

### TRIO POOL (any order)

```
POOL: #5, #6, #10, #1, #11, #8
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #5 THE ALL ROUNDER (Adj Place% 57.7%) ← locked in every combo
腳 (Legs):  #6, #10, #1, #11, #8
2nd-ranked #6 Adj Place% 45.3% < 63% → no 雙膽拖
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville from normalised Adj Win%; fair odds = 1/p, no takeout):

| Rank | Horses (any order) | Trio prob. | Est. Fair Odds |
|------|-------------------|------------|----------------|
| 1 | #5, #6, #10 | 5.5% | $18 |
| 2 | #5, #6, #1 | 4.8% | $21 |
| 3 | #5, #6, #11 | 4.8% | $21 |
| 4 | #5, #10, #1 | 4.6% | $22 |
| 5 | #5, #10, #11 | 4.6% | $22 |
| 6 | #5, #1, #11 | 4.0% | $25 |
| 7 | #5, #6, #8 | 2.6% | $38 |
| 8 | #5, #10, #8 | 2.5% | $40 |

Estimated ticket hit probability (all 10 combos): ~37.8%.

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: Trio 膽拖  5 >< 1, 6, 8, 10, 11

TOP COMBINATIONS (highest value):
  5-6-10, 5-6-1, 5-6-11 (any combo with #6 = MC overlay at 13.0), 5-10-11, 5-6-8

PASS CONDITIONS:
- If #5 THE ALL ROUNDER (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider; re-run MC
- If a leg is scratched → keep remaining legs (combos drop to C(4,2)=6)
```

CONFIDENCE: MEDIUM

CAVEATS:
- Odds are an 11:01 HKT snapshot; SCMP shows small drifts (#5 6.3 vs 7.5 on one SCMP column, #3 9.8 vs 9.1/10).
- SCMP QP/Q matrix was unreadable — Q/QP value cross-check (4e) not done.
- Trio probabilities are Harville-derived from MC/Adj Win%, not direct MC trio counts.
- Banker #5 drawn 11 at HV 1650m and has no prior HV 1650m runs (0 trip runs) — the main banker risk.
- HV is upset-prone; model differentiation is low among #6/#1/#10/#11 (5 horses within 11 pts of rating).

---

## STRATEGY B (MC-only)

```
Banker: #5 THE ALL ROUNDER (MC Win% 24.5%, MC Place% 55.7%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (45.3%), #1 (42.4%), #10 (41.3%), #11 (38.9%), #8 (22.4%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
   (#8 SETANTA is 22.4% but Win odds = 10.0, not > 10)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #3 WHOWROTETHATSONG (Win odds 9.8, MC Place% 9.3%)
Action: #3 added directly (no replaceable leg)
Final legs: #6, #1, #10, #11, #8, #3
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: Trio 膽拖  5 >< 1, 3, 6, 8, 10, 11  (15 combos)
```

Top Strategy B combos (Harville from raw MC Win%): 5-6-1 (7.2%, $14), 5-6-10 (7.0%, $14), 5-6-11 (6.6%, $15), 5-1-10 (5.8%, $17), 5-1-11 (5.5%, $18), 5-10-11 (5.3%, $19). Estimated ticket hit probability ~48.5% (raw MC normalisation; not directly comparable to A's figure).

Comparison vs Strategy A: same banker (#5) and same five core legs; Strategy B adds #3 Whowrotethatsong purely on the market signal (9.8 < 10) → 15 combos / $150 vs A's 10 combos / $100. #3's inclusion is knife-edge: SCMP lists it at 9.1–10, so if the final win odds drift to ≥ 10 Strategy B collapses to the same 10-combo ticket as A.
═══════════════════════════════════════════════════════════
