# Trio (單T) Strategy — Sha Tin | 2026-10-19 | Race 1

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard/1 now shows 21-Oct Happy Valley card)
ODDS SOURCE: Final starting prices (SP) from saved race-card snapshot, as loaded by analyze-race.ts
             SCMP odds: ❌ not available | HKJC live: ❌ no longer available (meeting completed)

RACE: R1 — Class 5 | 1800m | Turf | Good | 13 runners (SHEK MUN HANDICAP)
CLASSIFICATION: Competitive (top Adj Win% 34.8%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Sha Tin 2026-10-19 | Going: Good | Surface: Turf
Target Race(s): R1 (Class 5 | 1800m | 13 runners)
Scratchings: none
Odds coverage: 13 horses with odds (final SP)
SCMP data: ❌ unavailable (retrospective run)
```

- ≥3 starters ✅ | Odds populated for all 13 ✅ | Jockey/trainer stats loaded ✅
- All 13 runners have 8–10 form lines (no debutants). Longest layoff: #10 YOUNG STRIKER (last run 4-Jul, ~107 days) and #7 FIGHTING MACHINE (last run 6-Sep, 43 days).

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | GOLDEN FORTUNE | 34.8% | 70.5% | 9.0 | ✅ | ✅ | 1-6-5-2-2-11 | ★ 膽 (Banker) | 2-8: 17.3% (5.8) |
| 8 | FORTUNE KINGO | 21.0% | 55.2% | 4.6 | ✅ | ✅ | 2-2-6-10-10-5 | 腳 (Leg) | 2-6: 12.1% (8.3) |
| 6 | I EXCELLE | 14.5% | 46.1% | 5.1 | ✅ | ✅ | 3-7-6-4-10-13 | 腳 (Leg) | 1-2: 9.8% (10.2) |
| 1 | STAR BROSE | 12.3% | 40.1% | 4.1 | ✅ | ✅ | 7-3-2-4-9-6 | 腳 (Leg) | 6-8: 7.2% (13.9) |
| 4 | KINGLY DEMEANOR | 5.9% | 25.6% | 5.5 | ✅ | ✅ | 2-9-2-6-7-2 | 腳 (Leg) | 2-4: 5.8% (17.2) |
| 5 | YOUNG FIGHTER | 3.6% | 16.9% | 37 | ❌ | ❌ | 7-10-9-8-5-8 | — | — |
| 3 | CAN'T GO WONG | 2.6% | 13.6% | 27 | ❌ | ❌ | 8-8-3-3-10-5 | — | — |
| 11 | SMART CITY | 1.5% | 8.1% | 57 | ❌ | ❌ | 10-10-10-7-14-10 | — | — |
| 12 | SPECIAL HEDGE | 1.4% | 8.2% | 25 | ❌ | ❌ | 6-14-11-12-13-10 | — | — |
| 9 | CIRCUIT DUFFY | 1.2% | 6.9% | 87 | ❌ | ❌ | 8-14-12-14-4-11 | — | — |
| 10 | YOUNG STRIKER | 0.6% | 3.7% | 31 | ❌ | ❌ | 8-12-8-12-11-13 | — | — |
| 13 | PERFECT PAIRING | 0.4% | 2.9% | 11 | ❌ | ❌ | 4-7-13-4-4-2 | — | — |
| 7 | FIGHTING MACHINE | 0.3% | 2.3% | 53 | ❌ | ❌ | 14-9-11-8-7-10 | — | — |

Market: Overround 22.5%. MC strongly prefers #2 GOLDEN FORTUNE (34.8% vs ~11% implied at 9.0, flagged undervalued 213%) over the market favourite #1 STAR BROSE (4.1). MC sees #13 PERFECT PAIRING (11.0) and #7 as overvalued by the market. Analyzer's own bets: Place #2 @3.30 and Place #8 @2.54 (HK$500 each).

---

## STRATEGY A

### HORSE RANKINGS

SCMP was unavailable, so all factors are 0 and Adj% = MC%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 2 | GOLDEN FORTUNE | 34.8% | 70.5% | 0 | 0 | 34.8% | 70.5% | 9.0 | B Avdulla | — | — (n/a) | ★ 膽 (Banker) |
| 8 | FORTUNE KINGO | 21.0% | 55.2% | 0 | 0 | 21.0% | 55.2% | 4.6 | C L Chau | — | — (n/a) | 腳 (Leg) |
| 6 | I EXCELLE | 14.5% | 46.1% | 0 | 0 | 14.5% | 46.1% | 5.1 | C Y Ho | — | — (n/a) | 腳 (Leg) |
| 1 | STAR BROSE | 12.3% | 40.1% | 0 | 0 | 12.3% | 40.1% | 4.1 | Z Purton | — | — (n/a) | 腳 (Leg) |
| 4 | KINGLY DEMEANOR | 5.9% | 25.6% | 0 | 0 | 5.9% | 25.6% | 5.5 | H Y Yuen | — | — (n/a) | 腳 (Leg) |
| 5 | YOUNG FIGHTER | 3.6% | 16.9% | 0 | 0 | 3.6% | 16.9% | 37 | L Ferraris | — | — (n/a) | 腳 (Leg) |
| 3 | CAN'T GO WONG | 2.6% | 13.6% | 0 | 0 | 2.6% | 13.6% | 27 | K C Leung | — | — (n/a) | — |
| 11 | SMART CITY | 1.5% | 8.1% | 0 | 0 | 1.5% | 8.1% | 57 | M Chadwick | — | — (n/a) | — |
| 12 | SPECIAL HEDGE | 1.4% | 8.2% | 0 | 0 | 1.4% | 8.2% | 25 | H T Mo | — | — (n/a) | — |
| 9 | CIRCUIT DUFFY | 1.2% | 6.9% | 0 | 0 | 1.2% | 6.9% | 87 | M L Yeung | — | — (n/a) | — |
| 10 | YOUNG STRIKER | 0.6% | 3.7% | 0 | 0 | 0.6% | 3.7% | 31 | J Orman | — | — (n/a) | — |
| 13 | PERFECT PAIRING | 0.4% | 2.9% | 0 | 0 | 0.4% | 2.9% | 11 | A Atzeni | — | — (n/a) | — |
| 7 | FIGHTING MACHINE | 0.3% | 2.3% | 0 | 0 | 0.3% | 2.3% | 53 | P N Wong | — | — (n/a) | — |

Note: ★ 膽 = Banker (1st by Adj Win%). #2 has 10 career form lines, so it is eligible to be banker. 2nd-ranked #8 Adj Place% 55.2% < 63%, so 雙膽拖 does not apply.

**Reasoning:** The top Adj Win% is 34.8%, just under the 35% Dominant threshold, so the race is Competitive and uses Mode B. Pool = top 3 by Adj Win% (#2, #8, #6) plus the next 3 by Adj Place% (#1 40.1%, #4 25.6%, #5 16.9%). All five horses with Adj Place% ≥ 25% are included. #2 GOLDEN FORTUNE won last start (7-Oct) and has the best projected time (1:49.00, about 0.84s clear of #8 and #10). It also has a good draw (3), and it is MC #1 on rating (66). Its jockey stats are weak (Avdulla 4%), and the market has it only 5th choice. #8 FORTUNE KINGO has two 2nds in its last two runs but must overcome draw 11. #1 STAR BROSE is the market favourite with Purton (22%), but its projected time is slow. #4 KINGLY DEMEANOR has 9 previous runs at 1800m. #5 YOUNG FIGHTER fills the 6th slot on Place% only, which makes it a weak leg. No pace or running-style read is available without SCMP Star Form.

### TRIO POOL (any order)

```
POOL: #2, #8, #6, #1, #4, #5
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 GOLDEN FORTUNE (Adj Place% 70.5%) ← locked in every combo
腳 (Legs):  #8, #6, #1, #4, #5
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville approximation from MC Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #2, #8, #6 | 16.3% | $6.1 |
| 2 | #2, #8, #1 | 13.4% | $7.5 |
| 3 | #2, #6, #1 | 8.4% | $11.9 |
| 4 | #2, #8, #4 | 6.0% | $16.8 |
| 5 | #2, #6, #4 | 3.7% | $26.9 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), banker #2 + legs 8,6,1,4,5)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

ALL COMBINATIONS (est. prob):
  2-8-6 16.3% | 2-8-1 13.4% | 2-6-1 8.4% | 2-8-4 6.0% | 2-6-4 3.7%
  2-8-5 3.6%  | 2-1-4 3.1%  | 2-6-5 2.2% | 2-1-5 1.8% | 2-4-5 0.8%
  Ticket coverage (sum): ~59.2%

PASS CONDITIONS:
- If #2 GOLDEN FORTUNE (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)

CONFIDENCE: MEDIUM
```

---

## STRATEGY B (MC-only)

```
Banker: #2 GOLDEN FORTUNE (MC Win% 34.8%, MC Place% 70.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #8 (55.2%), #6 (46.1%), #1 (40.1%), #4 (25.6%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (#4 is 25.6% but 5.5 odds)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none (#13 PERFECT PAIRING is 11.0, not < 10)
Action: no replacement or addition
Final legs: #8, #6, #1, #4
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 膽 #2 / 腳 #8, #6, #1, #4
  2-8-6 16.3% | 2-8-1 13.4% | 2-6-1 8.4% | 2-8-4 6.0% | 2-6-4 3.7% | 2-1-4 3.1%
  Ticket coverage (sum): ~50.8%
```

Comparison: Strategy A is Strategy B plus #5 YOUNG FIGHTER. Mode B forces a 6th pool horse, and #5 is the next best by Place% at 16.9%. That adds 4 low-probability combos (~8.4% extra coverage) for $40 more. Without SCMP, both strategies have the same banker and ranking.

---

## CAVEATS

- **Retrospective run:** generated 2026-10-20, blind to results. The scheduled pre-race run was missed.
- **Odds are final SP, not morning odds.** They include late market moves that a pre-race run would not have seen, so the market comparisons (undervalued/overvalued) reflect closing prices.
- **SCMP unavailable (retrospective run).** SCMP racecard/1 now shows the 21-Oct Happy Valley card. As a result there are no Star Form, TIR, vet, trackwork, QP/Q matrix or running-style inputs. Strategy A adjustments are all 0, so Adj% = MC%. Strategy B is unaffected.
- Top Adj Win% of 34.8% is right at the Dominant/Competitive boundary (35%). Any small positive SCMP adjustment would have pushed this into Mode A, which would have dropped #5 from the pool and matched Strategy B's $60 ticket.
- There is a big model/market gap on the banker: MC rates #2 at 34.8%, but at 9.0 the market implies about 11%. Jockey B Avdulla is 4% from 67 rides.
- The #5 leg in Strategy A rests on MC Place% only (16.9%, 37 odds). #13 PERFECT PAIRING (11.0) sits outside both pools on MC (2.9% place).
- Trio combination probabilities are a Harville approximation from MC Win%, not direct MC trio counts.
- Historical sync, odds fetch and racecard scrape were intentionally not run. The data is the prepared leak-free snapshot.
```
═══════════════════════════════════════════════════════════
```
