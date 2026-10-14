# Trio (單T) Strategy — Happy Valley | 2026-10-14 | Race 9

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-14 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings (12 declared runners; 2 reserves not in field)
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, 12/12 horses enriched)
SCMP DATA: ⚠️ Partial | Star Form / TIR / Vet / Trackwork parsed; Win/Place odds columns and QP/Q matrix unlabelled on page (not used)
ODDS SOURCE: HKJC morning pool (fetch-odds.ts → data/odds/odds_20261014_HV.json, captured 11:01 HKT 14-Oct)
             SCMP odds: ⚠️ loaded but unlabelled (reference only) | HKJC live: ✅ loaded (morning snapshot)

RACE: R9 — HARBOUR VIEW HANDICAP | Class 3 | 1200m | Turf ("A" course) | Good | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 22.3%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽+5腳 C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

### Data summary (Step 2)

```
Meeting: HV 2026-10-14 | Going: Good | Surface: Turf
Target Race(s): R9 (Class 3 | 1200m | 12 runners)
Scratchings: none (reserves Kyrus Dragon, Perfect General not in final field)
Odds coverage: 12 horses with win/place odds
SCMP data: ⚠️ partial (form/TIR/vet/trackwork OK; odds/QP matrix unlabelled)
```

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|---|---|---|---|---|---|---|---|---|
| 8 | ROBOT LUCKY STAR | 22.3% | 52.5% | 8.8 | ✅ | ✅ | 1-7-5-4-8-2 | ★ 膽 (Banker) | 2-8: 8.2% (12.2) |
| 5 | ACE CHAMPION | 17.1% | 45.3% | 6.6 | ✅ | ✅ | 1-11-3-6-7-2 | 腳 (Leg) | 5-8: 7.7% (12.9) |
| 2 | STRAIGHT TO GLORY | 16.9% | 45.0% | 14 | ✅ | ❌ | 9-7-1-7-1-9 | 腳 (Leg) | 2-5: 6.6% (15.2) |
| 1 | AURORA PATCH | 14.9% | 41.0% | 17 | ✅ | ❌ | 3-3-5-7-3-2 | 腳 (Leg) | 1-8: 7.1% (14.2) |
| 4 | SYMBOL OF STRENGTH | 8.4% | 28.7% | 15 | ✅ | ❌ | 5-5-6-8-4-5 | — (replaced by #7) | — |
| 10 | WUKONG JEWELLERY | 5.7% | 21.8% | 4.5 | ✅ | ✅ | 3-2-5-8-12-1 | 腳 (Leg) | — |
| 6 | ALL OUT FOR SIX | 3.4% | 13.5% | 13 | ❌ | ❌ | 9-11-5-6-6-5 | — | — |
| 3 | MY DAY MY WAY | 3.0% | 12.7% | 15 | ❌ | ❌ | 10-1-1-10-2-8 | — | — |
| 7 | FOUR STARS ALIGN | 2.9% | 13.5% | 7.3 | ❌ | ✅ | 4 (1 local start) | 腳 (Leg) — replacement (in for #4) | — |
| 11 | CALIFORNIA BLITZ | 2.9% | 12.9% | 14 | ❌ | ❌ | 6-5-8-3-2-3 | — | — |
| 9 | NORTHERN FIRE BALL | 1.6% | 7.9% | 16 | ❌ | ❌ | 14-10-11-6-1-12 | — | — |
| 12 | GOLDEN CHAMP | 1.1% | 5.3% | 7.9 | ❌ | ✅ | 6-9-11-11-6-9 | 腳 (Leg) — added directly | — |

Market: Overround 23.6%. MC strongly disagrees with the market. It rates #1 (+153%), #2 (+137%) and #8 (+96%) as undervalued. Market favourite #10 (4.5) gets only 5.7% win, and market fancies #7 (7.3) and #12 (7.9) get just 2.9% and 1.1%. MC also projects 1:09.11 best time for #4 (SYMBOL OF STRENGTH), while #8 ranks only 10th on raw speed figures, so the MC ranking leans on class/form/jockey factors (Z Purton 20% strike).

---

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 8 | ROBOT LUCKY STAR | 22.3% | 52.5% | 0 | 0 | 22.3% | 52.5% | 8.8 | Z Purton | Stalk/On-pace | — (Valley 1200m C4 winner) | ★ 膽 (Banker) |
| 2 | 5 | ACE CHAMPION | 17.1% | 45.3% | trial +2 | trial +2 | 19.1% | 47.3% | 6.6 | C Y Ho | Stalk | +trial; gate 12, +5lb noted | 腳 (Leg) |
| 3 | 2 | STRAIGHT TO GLORY | 16.9% | 45.0% | excuses +2 | excuses +2 | 18.9% | 47.0% | 14 | K C Leung | Stalk | +excuses (steadied, no clear run) | 腳 (Leg) |
| 4 | 1 | AURORA PATCH | 14.9% | 41.0% | excuses +2 | excuses +2 | 16.9% | 43.0% | 17 | E C W Wong (-3) | Stalk (speed-tracking) | +excuses (crowded early) | 腳 (Leg) |
| 5 | 4 | SYMBOL OF STRENGTH | 8.4% | 28.7% | excuses +2 | excuses +2 | 10.4% | 30.7% | 15 | B Avdulla | Closer | +excuses (bumped, raced tight) | 腳 (Leg) |
| 6 | 10 | WUKONG JEWELLERY | 5.7% | 21.8% | excuses +2 | excuses +2 | 7.7% | 23.8% | 4.5 | A Atzeni | On-pace | +excuses (wide, no cover) | 腳 (Leg) |
| 7 | 3 | MY DAY MY WAY | 3.0% | 12.7% | excuses +2 | excuses +2 | 5.0% | 14.7% | 15 | C L Chau (-2) | Midfield | +excuses (caught wide); vet lame LH May, passed 18-Aug (>30d, no penalty) | — |
| 8 | 6 | ALL OUT FOR SIX | 3.4% | 13.5% | +draw +1 | +draw +1 | 4.4% | 14.5% | 13 | K Teetan | Stalk | +draw ("gate helps", gate 1) | — |
| 9 | 7 | FOUR STARS ALIGN | 2.9% | 13.5% | excuses +2, -notRO −2 | excuses +2, -notRO −2 | 2.9% | 13.5% | 7.3 | M L Yeung | Midfield | +excuses (4-wide), -notRO (stewards' advice) | — |
| 10 | 11 | CALIFORNIA BLITZ | 2.9% | 12.9% | 0 | 0 | 2.9% | 12.9% | 14 | M Chadwick | Front | — | — |
| 11 | 9 | NORTHERN FIRE BALL | 1.6% | 7.9% | 0 | 0 | 1.6% | 7.9% | 16 | H Y Yuen (-7) | Front | jumped awkwardly (1 run, below barrier threshold) | — |
| 12 | 12 | GOLDEN CHAMP | 1.1% | 5.3% | 0 | 0 | 1.1% | 5.3% | 7.9 | A Badel | On-pace | — (stable change, trial 3rd) | — |

Note: ★ 膽 = 1st-ranked by Adj Win% (#8, 9 starts, so it passes the banker eligibility check). For 雙膽拖, the 2nd-ranked horse would need Adj Place% ≥ 63%, but #5 has 47.3%, so the structure stays 膽拖.

Reasoning: Top Adj Win% is 22.3%, so the race is Competitive and uses Mode B (6 horses): the top 3 by Adj Win% (#8, #5, #2) plus 3 by Adj Place% (#1, #4, #10). All horses with Adj Place% ≥ 25% (#8, #5, #2, #1, #4) are in the pool, and #10 (23.8%, market favourite) also clears the 20% threshold. #8 is the MC top pick: a recent Valley 1200m winner, drawn 3, ridden by Purton. #5 gets the trial boost but has to overcome gate 12 and 5lb extra. #2 and #1 both had legitimate traffic excuses. In this HV 1200m race the front-runner bias favours #10 and #8 drawn low. #7 and #12 are short in the market but rank low in MC/Adj, so they stay out of Strategy A per the Adj thresholds.

### TRIO POOL (any order)

```
POOL: #8, #5, #2, #1, #4, #10
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #8 ROBOT LUCKY STAR (Adj Place% 52.5%) ← locked in every combo
腳 (Legs):  #5, #2, #1, #4, #10
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (by combined Adj Place%, independence approximation = product of Adj Place%):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|---|---|---|---|
| 1 | #8, #5, #2 | 11.7% | $9 |
| 2 | #8, #5, #1 | 10.7% | $9 |
| 3 | #8, #2, #1 | 10.6% | $9 |
| 4 | #8, #5, #4 | 7.6% | $13 |
| 5 | #8, #2, #4 | 7.6% | $13 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TOP COMBINATIONS (highest value):
  8-5-2 (11.7%), 8-5-1 (10.7%), 8-2-1 (10.6%), 8-5-4 (7.6%), 8-2-4 (7.6%),
  8-1-4 (6.9%), 8-5-10 (5.9%), 8-2-10 (5.9%), 8-1-10 (5.4%), 8-4-10 (3.8%)
  Value angle: #2 (14) and #1 (17) are MC-undervalued, so combos with them should pay well above fair.

PASS CONDITIONS:
- If #8 ROBOT LUCKY STAR (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider; #4 SYMBOL OF STRENGTH has a wet-track win (upgrade)
- If #8 drifts beyond ~15 at jump time → re-check model vs market before betting

CONFIDENCE: MEDIUM-LOW

CAVEATS:
- SCMP Win/Place odds columns and the QP/Q matrix were unlabelled on the page, so the QP/Q cross-check was not possible. HKJC morning odds (11:01 HKT) were used. SCMP figures (e.g. #8 10, #10 3.7) suggest moves since then.
- Big model vs market divergence: the market favourite #10 (4.5), #7 (7.3) and #12 (7.9) all rate low in MC. The banker #8 is only 5th in the market.
- The MC speed-figure projection ranks #8 only 10th. Its banker status rests on form, class and jockey factors.
- Place odds inside the MC run were estimated from win odds.
- #7 FOUR STARS ALIGN has only 1 local start (not banker-eligible; sparse form). Its MC estimate is less reliable.
- #4 "could not be fully ridden out" was read as interference (raced tight), so it was treated as an excuse, not a -notRO jockey/soundness flag.
- HV 1200m is upset-prone. Banker failure = total loss.
```

---

## STRATEGY B (MC-only)

```
Banker: #8 ROBOT LUCKY STAR (MC Win% 22.3%, MC Place% 52.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #5, #2, #1, #4, #10
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #4 SYMBOL OF STRENGTH (MC Place% 28.7%, Win odds 15)
   (#10 is 21.8% but Win odds 4.5, so it is not replaceable)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
   #7 FOUR STARS ALIGN (Win odds 7.3, MC Place% 13.5%)
   #12 GOLDEN CHAMP (Win odds 7.9, MC Place% 5.3%)
Action: #7 replaced #4 (1-for-1 swap); #12 added directly (no replaceable leg remaining)
Final legs: #5, #2, #1, #10, #7, #12
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #8 / 腳 #5, #2, #1, #10, #7, #12 → 15 combos
  8-5-2 (10.7%), 8-5-1 (9.8%), 8-2-1 (9.7%), 8-5-10 (5.2%), 8-2-10 (5.2%),
  8-1-10 (4.7%), 8-5-7 (3.2%), 8-2-7 (3.2%), 8-1-7 (2.9%), 8-10-7 (1.5%),
  8-5-12 (1.3%), 8-2-12 (1.3%), 8-1-12 (1.1%), 8-10-12 (0.6%), 8-7-12 (0.4%)
  (combined % = product of raw MC Place%, independence approximation)
```

Comparison vs Strategy A: both use the same banker (#8) and share #5, #2, #1, #10. Strategy B drops #4 (the MC's 5th pick, 15 odds) for the market-supported #7 and adds #12. That gives one extra leg, 15 combos instead of 10, and $150 instead of $100. Its extra coverage only pays if the market is right about #7 or #12 and the MC is wrong.

═══════════════════════════════════════════════════════════
