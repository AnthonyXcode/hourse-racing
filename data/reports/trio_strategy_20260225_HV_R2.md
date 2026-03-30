═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-02-25 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations | Jockey boost applied (HV caps)
SCMP DATA: ✅ Loaded | Form/TIR/Vet/Odds/Trackwork/QP/Q/Formline parsed
ODDS SOURCE: SCMP race card (captured ~18:00 HKT 25-Feb) + HKJC pool (fetch-odds.ts, ~17:52 HKT 25-Feb)
             SCMP odds: ✅ loaded | HKJC live: ✅ loaded (partial — 4 horses)

RACE: R2 — Class 4 | 1200M | Turf "B" Course | Good | 12 runners
CLASSIFICATION: Dominant (Adj Win% 36.1%) | POOL SIZE: 5
MODE: A (Tight Pool)
BET STRUCTURE: 膽拖 1膽+4腳 C(4,2) = 6 combos
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
STEP 1: QUERY DATA
───────────────────────────────────────────────────────────
1a. Race: HV 2026-02-25 R2 (KENNEDY HANDICAP)
1b. Historical sync: ✅ 484 races, 1207 performances indexed
1c. Jockey stats: ✅ 23 jockeys, 3 elite (Moreira 25.0%, Purton 20.9%, McDonald 15.8%), 1 strong (Bowman 11.1%)
1d. HKJC odds: ✅ R2 fetched (4 horses with live odds; supplemented by SCMP for full field)
1e. HKJC race card: ✅ 12 declared runners + 2 reserves (YEE CHEONG SPIRIT, SKY CAP)
1f. SCMP data: ✅ All sub-items extracted (Star Form, TIR, Vet, Trackwork, QP matrix, Q matrix, Woo Formline)

───────────────────────────────────────────────────────────
STEP 2: VALIDATE DATA
───────────────────────────────────────────────────────────
Meeting: HV 2026-02-25 | Going: Good | Surface: Turf "B" Course
Target Race: R2 (Class 4 | 1200M | 12 runners | Prize: $1,170,000 | Rating: 60-40)
Scratchings: none
Jockey stats: 23 jockeys loaded, 3 elite tier
Odds coverage: 12 horses (SCMP full, HKJC partial 4/12)
SCMP data: ✅ loaded (Star Form ✓ | TIR ✓ | Vet ✓ | Trackwork ✓ | Woo Formline ✓ | QP matrix ✓ | Q matrix ✓)

Critical checks: ✅ Racing confirmed | ✅ 12 starters ≥ 3 | ✅ Odds populated | ✅ Jockey stats non-empty
Warning checks: ⚠️ Going defaulted "Good" (parser warning) | ✅ Turf | ✅ No scratchings
                ⚠️ #6 TOPSPIN KING: debut (no local form) | ⚠️ #7 AWESOME TREASURE: 8yo veteran
                ⚠️ #4 IMPRESSIVE CHAMP: 1 start only (24d ago)

───────────────────────────────────────────────────────────
STEP 3: SIMULATION RESULTS
───────────────────────────────────────────────────────────

RAW MC OUTPUT (10,000 iterations):
  # 8 BITS SUPERSTAR :  30.1% win,  66.1% place
  # 5 NORTHERN FIRE B:  21.3% win,  55.1% place
  # 1 VICTOR THE RAPI:  20.8% win,  57.1% place
  # 7 AWESOME TREASUR:   8.3% win,  31.5% place
  #11 WINNING CIGAR  :   6.1% win,  24.3% place
  #10 ZEPHYR         :   3.0% win,  14.6% place
  (Remaining 6 horses share ~10.4% win)

Top MC Quinella Combinations:
  1-8: 15.0% (fair odds: $6.7)
  5-8: 14.4% (fair odds: $6.9)
  1-5: 10.6% (fair odds: $9.5)
  7-8:  5.9% (fair odds: $16.9)
  8-11: 4.8% (fair odds: $21.1)

Market Efficiency:
  Overround: -3.2% | Favorite Bias: -8.8%
  #7 AWESOME TREASURE: overvalued by 31% (MC 8.3% vs market ~10%)
  #8 BITS SUPERSTAR: overvalued by 31% (MC 30.1% vs market ~40%)

STEP 3c — ELITE JOCKEY BOOST (HV caps):
  #8 BITS SUPERSTAR — Z Purton (20.9%, >20%): +4% Win, +4% Place (HV cap)
  No other elite/strong jockeys in R2.

STEP 3d — SCMP FORM ADJUSTMENTS:

RACE 2 SCMP DATA:
| # | Horse | SCMP Win | SCMP Pl | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Woo Mention | Running Style |
|---|-------|----------|---------|------------------|----------|----------|-----------|-------------|---------------|
| 1 | VICTOR THE RAPID | 5 | 1.7 | +form (rallying 3rd, saluted from midfield, 4★) | clear | clear | — | "must defy top weight, one for shortlist" | Midfield/Stalker |
| 2 | AUTOMATED | 49 | 10 | -form (still to click in 4 runs, 1★) | +excuses (raced wide/no cover) | clear | — | not mentioned | Midfield |
| 3 | SIR CHARGE | 23 | 5.2 | -form (no impression 5 starts, blood in trachea Nov, 2★) | -barrier (bumped after start) | clear | — | not mentioned | Rear |
| 4 | IMPRESSIVE CHAMP | 47 | 13 | -form (beat one on debut, poor trial, 2★) | -perf (lay out, difficult to ride out) | clear | — | not mentioned | Midfield |
| 5 | NORTHERN FIRE BALL | 5.5 | 1.8 | +form (season-best 4th, returns to C&D of win, 4★) | clear | clear | — | "returns to C&D of win, should give good sight" | Front-runner |
| 6 | TOPSPIN KING | 16 | 5.2 | neutral (debut, family of Mishriff, 3rd in trial, 2★) | N/A | N/A | — | not mentioned | Unknown |
| 7 | AWESOME TREASURE | 10 | 3.5 | mixed (veteran, won then last, new trainer, "gate helps", 3★) | **-notRO** (did not ride out final 200M, concerns) | **-vet** (rider concern action 14/01, passed 09/02, **16d <30d**) | — | not mentioned | On-pace/Stalker |
| 8 | BITS SUPERSTAR | **2.5** | **1.1** | **+form** (placed 4/5 past HV 1200m, 2nd×2 recent, 4★) | clear | clear | — | **"knocking on door, drawn to get every chance"** | On-pace/Stalker |
| 9 | FULL OF LAUGHTER | 23 | 5.3 | mixed (decent debut, fading last from G11, course debut, 3★) | +excuses (lay in, raced wide/no cover) | clear | — | **"draws ideally for Valley debut"** | Midfield |
| 10 | ZEPHYR | 12 | 4.6 | -form (beat couple/one, came from last, 2★) | +excuses (shifted across from wide barrier) | clear | — | not mentioned | Closer |
| 11 | WINNING CIGAR | 17 | 3.2 | mixed (one-paced 8th, staying on 6th, blinkers 1st time, 3★) | -barrier (shifted out/bumped) | clear | **+trackwork** ("kept very busy, one to keep eye on") | not mentioned | Midfield/Closer |
| 12 | HAPPY BUDDIES | 59 | 10 | -form (showed nothing 4 times, 2★) | -barrier (jumped awkwardly) | clear | — | not mentioned | Rear |

ADJUSTMENTS APPLIED:
| # | Horse | MC Win% | MC Place% | Jockey | SCMP Adj (Win) | SCMP Adj (Place) | Adj Win% | Adj Place% |
|---|-------|---------|-----------|--------|----------------|-----------------|----------|------------|
| 8 | BITS SUPERSTAR | 30.1% | 66.1% | **+4% Purton** | +1% (form), +1% (draw) = +2% | +2% | **36.1%** | **72.1%** |
| 5 | NORTHERN FIRE BALL | 21.3% | 55.1% | — | +1% (form) | +1% | **22.3%** | **56.1%** |
| 1 | VICTOR THE RAPID | 20.8% | 57.1% | — | +1% (form) | +1% | **21.8%** | **58.1%** |
| 11 | WINNING CIGAR | 6.1% | 24.3% | — | +2% (trackwork), -1% (barrier) = +1% | +1% | **7.1%** | **25.3%** |
| 7 | AWESOME TREASURE | 8.3% | 31.5% | — | +1% (draw), -2% (notRO), -3% (vet <30d) = -4% | +1%, -2%, -4% = -5% | **4.3%** | **26.5%** |
| 9 | FULL OF LAUGHTER | ~2.5% | ~13% | — | +2% (excuses), +1% (draw) = +3% | +3% | **5.5%** | **16.0%** |
| 10 | ZEPHYR | 3.0% | 14.6% | — | +2% (excuses), -1% (gate 10) = +1% | +1% | **4.0%** | **15.6%** |
| 6 | TOPSPIN KING | ~1.5% | ~8% | — | +1% (form/trial), -1% (gate 11) = 0% | 0% | **1.5%** | **8.0%** |
| 2 | AUTOMATED | ~0.5% | ~5% | — | +2% (excuses) | +2% | **2.5%** | **7.0%** |
| 3 | SIR CHARGE | ~1.5% | ~8% | — | -1% (barrier) | -1% | **0.5%** | **7.0%** |
| 4 | IMPRESSIVE CHAMP | ~1.5% | ~8% | — | -2% (notRO) | -2% | **0%** | **6.0%** |
| 12 | HAPPY BUDDIES | ~0.5% | ~5% | — | -1% (barrier), -2% (gate 12) = -3% | -3% | **0%** | **2.0%** |

Cap check: All adjustments within ±8% Win, ±10% Place. No horse exceeds 50% Win or 85% Place. ✅

───────────────────────────────────────────────────────────
STEP 4: HORSE RANKINGS (sorted by Adj Win%)
───────────────────────────────────────────────────────────
| Rank | # | Horse | MC Win% | Adj Win% | MC Place% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|----------|-----------|------------|------|--------|------|-------|------------|------|
| 1 | 8 | BITS SUPERSTAR | 30.1% | 36.1% | 66.1% | 72.1% | **2.5** | **Purton** | **3** | Stalk | +form (4/5 C&D), +draw (Woo), +Purton | ★ 膽 (Banker) |
| 2 | 5 | NORTHERN FIRE BALL | 21.3% | 22.3% | 55.1% | 56.1% | 5.5 | K C Leung | 9 | Front | +form (C&D winner) | 腳 (Leg) |
| 3 | 1 | VICTOR THE RAPID | 20.8% | 21.8% | 57.1% | 58.1% | 5 | Chau (-2) | 8 | Stalk | +form (rallying 3rd, recent winner) | 腳 (Leg) |
| 4 | 11 | WINNING CIGAR | 6.1% | 7.1% | 24.3% | 25.3% | 17 | Bentley | 4 | Close | **+trackwork**, -barrier, blinkers 1st | 腳 (Leg) |
| 5 | 7 | AWESOME TREASURE | 8.3% | 4.3% | 31.5% | 26.5% | 10 | Wong (-5) | **1** | Stalk | +draw, **-notRO**, **-vet 16d** | 腳 (Leg) |
| — | 9 | FULL OF LAUGHTER | ~2.5% | 5.5% | ~13% | 16.0% | 23 | Kingscote | **2** | Mid | +excuses, +draw (Woo) | (reserve) |
| — | 10 | ZEPHYR | 3.0% | 4.0% | 14.6% | 15.6% | 12 | Hewitson | 10 | Close | +excuses, -gate 10 | (reserve) |
| — | 6 | TOPSPIN KING | ~1.5% | 1.5% | ~8% | 8.0% | 16 | C Y Ho | 11 | ? | debut, Mishriff family | (excluded) |
| — | 2 | AUTOMATED | ~0.5% | 2.5% | ~5% | 7.0% | 49 | Yeung | 7 | Mid | +excuses (wide), -form | (excluded) |
| — | 3 | SIR CHARGE | ~1.5% | 0.5% | ~8% | 7.0% | 23 | McMonagle | 6 | Rear | -barrier, -form (trachea) | (excluded) |
| — | 4 | IMPRESSIVE CHAMP | ~1.5% | 0% | ~8% | 6.0% | 47 | Avdulla | 5 | Mid | -notRO, -lay out | (excluded) |
| — | 12 | HAPPY BUDDIES | ~0.5% | 0% | ~5% | 2.0% | 59 | Teetan | 12 | Rear | -barrier, -gate 12, -form | (excluded) |

Note: ★ 膽 = Banker (1st-ranked horse by Adj Win%, locked in every combo).

CLASSIFICATION: **Dominant** (top horse #8 Adj Win% 36.1% ≥ 35%) → **Mode A (Tight Pool, 5 horses)**

Pool inclusion check (Adj Place% ≥ 20% → MUST include):
  ✅ #8 (72.1%) ✅ #1 (58.1%) ✅ #5 (56.1%) ✅ #7 (26.5%) ✅ #11 (25.3%)
  ❌ #9 (16.0%) ❌ #10 (15.6%) — below 20%, not mandatory

5 horses pass threshold → perfectly matches Mode A (5-horse pool). ✅

Rule 2 check (no hard exclusion if odds ≤ 15):
  #10 ZEPHYR: SCMP 12 (≤15) → reserve, not excluded. Adj Place% 15.6% < 20% → not mandatory.
  #7 AWESOME TREASURE: SCMP 10 (≤15) → included in pool (Adj Place% 26.5% ≥ 20%).

雙膽拖 check: #5 (2nd-ranked) Adj Place% 56.1% < 63% → NO → single banker only.

Reasoning:
#8 BITS SUPERSTAR dominates this race. MC rates him 30.1% raw Win before any adjustments, Purton (+4% HV cap) and strong C&D form (placed 4/5 recent HV 1200m starts, 2nd behind Lucky Planet and Master Resolute) push him to 36.1%. SCMP market agrees — he's clear 2.5 favourite. Woo: "drawn to get every chance" from gate 3 on the "B" course. The quinella data confirms: 1-8 (15.0%) and 5-8 (14.4%) are the two strongest MC pairs.

#5 NORTHERN FIRE BALL and #1 VICTOR THE RAPID are the clear 2nd tier — both above 20% Adj Win%. #5 returns to C&D of a front-running win; #1 backed up a rallying 3rd with a win from a better draw. Both have strong form credentials.

#7 AWESOME TREASURE and #11 WINNING CIGAR qualify via the mandatory ≥20% Adj Place% rule. #7 carries significant risk (vet concern 16d ago + not ridden out last time, 8yo veteran) but gate 1 helps and Wong's -5lb claim is useful. #11 has been "very busy" in morning trackwork (Woo flagged) and adds blinkers first time — this gear change could trigger improvement.

Pace scenario: #5 (front-runner) likely leads from #8 (stalker from gate 3). #1 sits midfield. #7 races on-pace from gate 1. Hot pace if #5 goes hard → favours closers (#11). If pace is moderate → #8 and #5 fight out the finish with #1 closing for 3rd.

───────────────────────────────────────────────────────────
TRIO POOL (any order)
───────────────────────────────────────────────────────────
POOL: #8, #5, #1, #7, #11
MODE: A (Tight Pool) | POOL SIZE: 5

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #8 BITS SUPERSTAR (Adj Win% 36.1%, Adj Place% 72.1%) ← locked in every combo
腳 (Legs):  #5, #1, #7, #11
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6

TOP TRIO COMBINATIONS (by combined Adj Place%):
| Rank | Horses (any order) | Combined Place% | QP Cross-Ref |
|------|-------------------|-----------------|--------------|
| 1 | #8, #1, #5 | 186.3% | QP 1-8: 1.8, QP 5-8: 2.2, QP 1-5: 3.4 — ALL very short |
| 2 | #8, #1, #7 | 156.7% | QP 1-8: 1.8, QP 1-7: 6.6, Q 1-7: 23 |
| 3 | #8, #1, #11 | 155.5% | QP 1-8: 1.8, QP 1-11: 11, Q 1-11: 43 |
| 4 | #8, #5, #7 | 154.7% | QP 5-8: 2.2, QP 5-7: 8.4, Q 5-7: 30 |
| 5 | #8, #5, #11 | 153.5% | QP 5-8: 2.2, QP 5-11: 11, Q 5-11: 47 |
| 6 | #8, #7, #11 | 123.9% | QP 7-8: 3.5, QP 7-11: 20, Q 7-11: 106 — highest payout combo |

QP value signals:
- QP 1-8 at 1.8 and QP 5-8 at 2.2 are extremely short → market strongly expects #1, #5, #8 to fill the frame.
- The "value" in the ticket comes from combos 2-6 where #7 or #11 sneak into the top 3 instead of the expected #1 or #5.
- Combo 6 (#8+#7+#11) would deliver the highest Trio dividend if it lands.

### 4e. Value check — Trio pool odds

Given #8 is the 2.5 hot favourite and #1/#5 are both around 5-5.5, the base Trio (#8+#1+#5) is likely a SHORT-PAYING dividend (estimated $30-60 range). However:
- If #7 (10 odds, vet concerns) or #11 (17 odds, blinkers) sneak in, the Trio dividend jumps significantly (est. $200-800 range).
- The 膽拖 structure ensures we cover ALL scenarios where #8 finishes top 3 — including the value combos.
- 6 combos at $60 total stake is very efficient.

───────────────────────────────────────────────────────────
TICKET SUMMARY
───────────────────────────────────────────────────────────
COMBINATIONS: 6 (膽拖: C(4,2) where 4 = legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: **$60**

ALL COMBINATIONS (6 tickets — all include 膽 #8):
  1. #8 + #1 + #5    (top 3 MC horses — likely short payout)
  2. #8 + #1 + #7    (rally 3rd + gate 1 veteran)
  3. #8 + #1 + #11   (rally 3rd + blinkers 1st time)
  4. #8 + #5 + #7    (front-runner + gate 1 veteran)
  5. #8 + #5 + #11   (front-runner + blinkers 1st time)
  6. #8 + #7 + #11   (upset combo — highest value)

PASS CONDITIONS:
- If #8 BITS SUPERSTAR is scratched → VOID ticket (do not restructure — banker loss)
- If #7 or #11 scratched → continue with remaining 3 legs = C(3,2) = 3 combos = $30
- If field drops below 3 → pool refunded
- If going changes to Heavy → strengthen closer bias (#11), may hurt front-runner #5

CONFIDENCE: **HIGH**

CAVEATS:
1. **Banker is market favourite**: #8 at 2.5 odds is the clear public choice. The MC and market align here (both rate #8 on top). This means the base combo (#8+#1+#5) will likely return a low Trio dividend. The edge is in the wider combos involving #7/#11.
2. **#7 AWESOME TREASURE vet risk**: Rider concerned about action (14/01, passed 09/02 = 16d < 30d). Applied -3% Win, -4% Place. Still in pool at Adj Place% 26.5% (≥20% mandatory) and SCMP 10 odds (≤15, Rule 2). If #7 shows the same action concerns, it won't place. But gate 1 and Wong's -5lb claim give it a chance to hold on.
3. **#11 WINNING CIGAR blinkers**: First-time blinkers can spark or flop. Trackwork positive ("very busy in mornings") suggests trainer is confident. At 17 odds, any frame finish is value.
4. **#9 FULL OF LAUGHTER just missed pool**: Adj Place% 16.0% (< 20% threshold). Woo likes the draw ("draws ideally for Valley debut"). If you want to expand coverage for $40 more, adding #9 as a 5th leg creates C(5,2) = 10 combos = $100 total. This is optional.
═══════════════════════════════════════════════════════════

HKJC BET SLIP:

單T 膽拖
膽: 8
腳: 1, 5, 7, 11
$10 × 6 combos = $60

═══════════════════════════════════════════════════════════
*Report generated: 2026-02-25 | Strategy: Trio 膽拖 with 1st-ranked horse as mandatory banker | Unit: $10/combo*
*Post-race review required — fetch results and cross-reference after R2.*
