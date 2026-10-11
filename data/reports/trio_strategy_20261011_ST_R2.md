# Trio (單T) Strategy — Sha Tin | 2026-10-11 | Race 2

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all, 2,318 historical races loaded)
SCMP DATA: ⚠️ Partial | Star Form / TIR / Vet / Win odds / QP parsed; Place-odds column unreliable
ODDS SOURCE: HKJC pool (fetch-odds.ts, data/odds/odds_20261011_ST.json, captured 11:23 HKT 11-Oct)
             SCMP odds: ✅ loaded (Win) | HKJC live: ✅ loaded

RACE: R2 — KAM TIN HANDICAP | Class 5 | 1000m (straight) | Turf | Good | 14 runners
CLASSIFICATION: Dominant (top Adj Win% 38.8% >= 35%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE: 雙膽拖 2膽 + 3腳 = 3 combos (2nd-ranked #2 Adj Place% 73.4% >= 63%)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: Turf
Target Race(s): R2 (Class 5 | 1000m straight | 14 starters)
Scratchings: none
Odds coverage: 14/14 horses with Win odds (HKJC)
SCMP data: ⚠️ partial (Win odds, Star Form, TIR, Vet, QP top combos OK; Place column garbled)
```

- ≥3 starters ✅ | Odds populated ✅ | Jockey stats (14) ✅ | Trainer stats (12) ✅
- All 14 horses have ≥6 runs of form; no debutants; no layoff >90 days except #9 (last run 06-May), #14 (27-Jun), #3 (12-Jul).

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|---|---|---|---|---|---|---|---|---|
| 4 | SPICY SPANGLE | 37.8% | 76.8% | 6.8 | ✅ | ✅ | 1/6/2/6/3/7 | ★ 膽 (Banker) | 2-4: 28.9% (3.5) |
| 2 | AUTUMN VIBES | 31.9% | 71.4% | 4.3 | ✅ | ✅ | 3/13/2/8/3/10 | 腳 (Leg) | 1-2: 10.3% (9.7) |
| 1 | SUNNY Q | 13.1% | 46.9% | 7.6 | ✅ | ✅ | 3/6/2/7/3/9 | 腳 (Leg) | 1-4: 13.4% (7.5) |
| 6 | VERBIER | 7.0% | 32.1% | 15 | ✅ | ❌ | 10/11/3/1/3/7 | 腳 (Leg) | 4-6: 7.2% (13.9) |
| 9 | CONCORDE STAR | 2.2% | 14.2% | 31 | ❌ | ❌ | 10/8/8/7/7/2 | — | — |
| 8 | DIRIYA | 2.1% | 12.6% | 8.4 | ❌ | ✅ | 5/9/14/10/6/5 | 腳 (Leg) — added (Win-odds candidate) | — |
| 13 | VON BAER | 1.2% | 8.3% | 20 | ❌ | ❌ | 11/2/7/10/6/5 | — | — |
| 11 | DASH | 1.2% | 8.3% | 19 | ❌ | ❌ | 10/6/10/11/3/7 | — | — |
| 10 | SOLAR RIVER | 0.9% | 7.9% | 9.4 | ❌ | ✅ | 2/11/3/12/5/10 | 腳 (Leg) — added (Win-odds candidate) | — |
| 7 | BEAUTY GEMINI | 0.8% | 6.5% | 10 | ❌ | ❌ | 4/9/13/12/10/12 | — | — |
| 5 | TOPSPIN KING | 0.7% | 4.7% | 57 | ❌ | ❌ | 11/12/9/10/11/11 | — | — |
| 12 | QUICK MONEY | 0.5% | 4.9% | 10 | ❌ | ❌ | 11/6/14/9/11/13 | — | — |
| 14 | ISLAND BREEZES | 0.5% | 3.8% | 23 | ❌ | ❌ | 10/10/7/10/9/12 | — | — |
| 3 | MAJESTIC LIFE | 0.2% | 1.7% | 39 | ❌ | ❌ | 13/9/7/10/11/9 | — | — |

Market: Overround 22.5%. MC strongly rates #4 SPICY SPANGLE (37.8% vs ~14.7% implied; flagged undervalued 157%) and #6 VERBIER (32.1% place at 15/1). Market rates #8 DIRIYA (4th fav, 8.4) and #10 SOLAR RIVER (5th fav, 9.4) far higher than MC; #12 and #3 flagged overvalued.

---

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 4 | SPICY SPANGLE | 37.8% | 76.8% | +form +1 | +form +1 | 38.8% | 77.8% | 6.8 | K C Leung | Front | +form (resumed easy winner leading from gate 3) | ★ 膽 (Banker 1) |
| 2 | AUTUMN VIBES | 31.9% | 71.4% | excuses +2 | excuses +2 | 33.9% | 73.4% | 4.3 | Z Purton | Stalk | +excuses (wide, no cover, close 3rd) | ★ 膽 (Banker 2) |
| 1 | SUNNY Q | 13.1% | 46.9% | 0 | 0 | 13.1% | 46.9% | 7.6 | C L Chau (-2) | Stalk | — (single awkward jump) | 腳 (Leg) |
| 6 | VERBIER | 7.0% | 32.1% | 0 | 0 | 7.0% | 32.1% | 15 | L Ferraris | Front | — (tired dictating from gate 12) | 腳 (Leg) |
| 8 | DIRIYA | 2.1% | 12.6% | excuses +2 | excuses +2 | 4.1% | 14.6% | 8.4 | B Avdulla | Mid | +excuses (bumped, steadied 100m) | 腳 (Leg) |
| 13 | VON BAER | 1.2% | 8.3% | excuses +2 | excuses +2 | 3.2% | 10.3% | 20 | M F Poon | Mid | +excuses (caught wide, steadied) | — |
| 11 | DASH | 1.2% | 8.3% | excuses +2 | excuses +2 | 3.2% | 10.3% | 19 | P N Wong (-7) | Front | +excuses (caught wide, obliged to lead) | — |
| 7 | BEAUTY GEMINI | 0.8% | 6.5% | excuses +2 | excuses +2 | 2.8% | 8.5% | 10 | Y L Chung (-2) | Mid | +excuses (steadied 400m) | — |
| 12 | QUICK MONEY | 0.5% | 4.9% | excuses +2 | excuses +2 | 2.5% | 6.9% | 10 | H Y Yuen (-7) | Mid | +excuses (wide, no cover) | — |
| 3 | MAJESTIC LIFE | 0.2% | 1.7% | excuses +2 | excuses +2 | 2.2% | 3.7% | 39 | C Y Ho | Close | +excuses (steadied after start) | — |
| 10 | SOLAR RIVER | 0.9% | 7.9% | +form +1 | +form +1 | 1.9% | 8.9% | 9.4 | R Kingscote | Mid | +form (stayed on for 2nd) | — |
| 14 | ISLAND BREEZES | 0.5% | 3.8% | 0 | 0 | 0.5% | 3.8% | 23 | A Atzeni | — | — | — |
| 5 | TOPSPIN KING | 0.7% | 4.7% | 0 | 0 | 0.7% | 4.7% | 57 | M L Yeung | — | — | — |
| 9 | CONCORDE STAR | 2.2% | 14.2% | -injury30d −3 | -injury30d −4 | 0.0% (floored) | 10.2% | 31 | J Orman | Mid | -injury30d (bleeder + ligament, passed 16/09 = 25 days) | — |

Note: adjustments are additive and not re-normalised (per skill). All within the ±8% / ±10% caps.

Reasoning: #4 SPICY SPANGLE is the MC #1 on both Win% and Place%, has the strongest 1000m trip sample (8 runs at the trip), and resumed with an easy front-running win. That makes the race **Dominant**, so Mode A applies. #2 AUTUMN VIBES (Purton, market favourite) gets a wide-trip excuse and its Adj Place% of 73.4% clears the 63% 雙膽 threshold. The three legs are the next three horses by Adj Place%: #1 SUNNY Q (46.9%), #6 VERBIER (32.1%) and #8 DIRIYA (14.6%). #1 and #6 are compulsory because they are at or above 25%. #8 takes the last slot over #11, #13 and #9 (each around 10%), and is also 4th favourite at 8.4. Pace: #4, #6 and #11 are all likely to go forward on the straight course. #4 has a mid draw (7). #2 and #1 come from gates 10 and 9, near the stands side.

---

## STRATEGY A — TRIO POOL (any order)

```
POOL: #4, #2, #1, #6, #8
MODE: A | POOL SIZE: 5

雙膽拖 STRUCTURE:
膽 (Banker 1): #4 SPICY SPANGLE (Adj Place% 77.8%) ← locked in every combo
膽 (Banker 2): #2 AUTUMN VIBES  (Adj Place% 73.4%) ← locked in every combo
腳 (Legs):     #1, #6, #8
BET STRUCTURE: 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
```

TOP TRIO COMBINATIONS (combined Adj Place%, using an independence product as a ranking index):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|---|---|---|---|
| 1 | #4, #2, #1 | 26.8% | $37 (3.7x) |
| 2 | #4, #2, #6 | 18.3% | $55 (5.5x) |
| 3 | #4, #2, #8 | 8.3% | $120 (12.0x) |

## STRATEGY A — TICKET SUMMARY

```
COMBINATIONS: 3 (雙膽拖: 2 bankers + 3 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $30

TICKETS:
  4-2-1   (26.8%)
  4-2-6   (18.3%)
  4-2-8   ( 8.3%)
```

PASS CONDITIONS:
- If #4 SPICY SPANGLE or #2 AUTUMN VIBES is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft or worse → re-run MC; straight-course draw bias may change
- If late money pushes #2 below ~3.0 → the 4-2-x Trio dividend will be short, so consider the cheaper Strategy A ticket only

CONFIDENCE: MEDIUM. Both bankers are strong on MC. However, 雙膽拖 needs both to place (≈ 0.778 × 0.734 ≈ 57%), and the market disagrees with MC on #4.

CAVEATS:
- SCMP Place-odds column did not parse reliably (values mirrored Win odds), so HKJC pool odds were used for every flag. SCMP Win odds differ slightly from the 11:23 HKT HKJC snapshot (#2 5.4 vs 4.3, #8 7.7 vs 8.4, #10 7.4 vs 9.4). No Strategy B flags change under either set.
- During card parsing the scraper logged `distance=1200m`, but the enriched race card and SCMP both say straight 1000m. The simulation ran at 1000m.
- MC and the market disagree sharply on #4 (MC #1, market 2nd favourite at 6.8) and on #8/#10 (market 4th/5th favourites, MC ~1-2% Win).
- MC's finish-time projection puts #1 SUNNY Q fastest and #4 only 5th. #4's MC ranking relies on rating, trip record and form, not projected time.
- Several runners, including #2 AUTUMN VIBES, have 0 runs at the 1000m trip. The straight course is a specialist test (SCMP calls #6 "a straight 1,000m mystery").
- SCMP QP top combos (1-2 at 3.9, 2-4 at 4.9, 1-4 at 11) show the market expects the same top three as MC (#1, #2, #4), so the 4-2-1 Trio dividend will be low.

---

## STRATEGY B (MC-only)

```
Banker: #4 SPICY SPANGLE (MC Win% 37.8%, MC Place% 76.8%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2 (71.4%), #1 (46.9%), #6 (32.1%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (#6 is 32.1%, above the 30% band)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
   #8 DIRIYA      (Win odds 8.4, MC Place% 12.6%)
   #10 SOLAR RIVER (Win odds 9.4, MC Place% 7.9%)
Action: added directly, both (no replaceable leg)
Final legs: #2, #1, #6, #8, #10
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
```

STRATEGY B TICKET (banker #4 with every pair of legs; raw MC Place% independence index):

| Combo | Index |
|---|---|
| 4-2-1 | 25.7% |
| 4-2-6 | 17.6% |
| 4-1-6 | 11.6% |
| 4-2-8 | 6.9% |
| 4-1-8 | 4.5% |
| 4-2-10 | 4.3% |
| 4-6-8 | 3.1% |
| 4-1-10 | 2.8% |
| 4-6-10 | 2.0% |
| 4-8-10 | 0.8% |

Comparison: Strategy B uses one banker, so a top three without #2 is still covered (e.g. 4-1-6), and it adds two market-backed outsiders (#10, #8). That costs $100 against Strategy A's $30. Strategy A bets that both MC leaders place. It covers fewer outcomes but pays more per dollar if #4 and #2 both run top 3.

```
═══════════════════════════════════════════════════════════
```
