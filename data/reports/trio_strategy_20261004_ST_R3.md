# Trio (單T) Strategy — Sha Tin | 2026-10-04 | Race 3

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good (from racecard) | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all, 2,298 historical races, 8/8 horses enriched)
SCMP DATA: ⚠️ Partial | Star Form / TIR / Trackwork / Win odds parsed; Vet report not shown; QP/Q matrix not parsed
ODDS SOURCE: HKJC early-morning pool (fetch-odds.ts, captured 10:22 HKT 04-Oct)
             SCMP odds: ✅ loaded (win only; place column unreliable) | HKJC live: ✅ loaded (analyze-race refresh)

RACE: R3 MUK MIN HA HANDICAP — Class 2 | 1650m | AWT (dirt) | Good | 8 runners
CLASSIFICATION: Dominant (top Adj Win% 50.0%) | POOL SIZE: 6 (Mode A 5 + #3 forced in by Adj Place% ≥ 20% rule)
MODE: A: Tight Pool (extended to 6)
BET STRUCTURE: 雙膽拖 2膽 + 4腳 = 4 combos
UNIT BET: $10 per combination (fixed)
```

## Data Validation Summary

```
Meeting: Sha Tin 2026-10-04 | Going: Good | Surface: AWT
Target Race(s): R3 (Class 2 | 1650m | 8 runners)
Scratchings: none
Odds coverage: 8 horses with odds
SCMP data: ⚠️ partial (no vet report section, Q/QP matrix not extracted)
```

- [x] Racing confirmed (SCMP: Sunday 4 Oct 2026, 1:30pm, Sha Tin)
- [x] ≥3 starters (8)
- [x] Odds for all 8 horses
- [x] Jockey stats (8 profiles) and trainer stats (7 profiles) loaded
- [!] Scraper log printed `distance=1200m` during parse but the enriched racecard and MC output both use **1650m AWT** (consistent with SCMP Star Form references to dirt 1,650m). Treated as a log artefact.
- [!] Place odds in MC run were estimated from win odds (analyze-race note).

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | TALENTS AMBITION | 62.8% | 93.1% | 2.3 | ✅ | ✅ | 1-9-2-4-7-3 | ★ 膽 (Banker) | 2-6: 31.8% (3.1) |
| 6 | DEFINITIVE | 14.8% | 65.4% | 11 | ✅ | ❌ | 7-1-3-5-7-2 | 腳 (Leg) | 2-7: 27.6% (3.6) |
| 7 | SKY VINO | 13.3% | 62.4% | 5.7 | ✅ | ✅ | 5-4-6-1-2-6 | 腳 (Leg) | 2-5: 8.7% (11.5) |
| 5 | AWESOME FLUKE | 3.7% | 27.1% | 19 | ✅ | ❌ | 10-11-9-6-5-4 | 腳 (Leg) | 2-8: 8.7% (11.5) |
| 8 | LOCH TAY | 2.9% | 26.1% | 7.6 | ✅ | ✅ | 6-4-1-13-9-9 | 腳 (Leg) | 2-3: 6.4% (15.6) |
| 3 | SING DRAGON | 2.3% | 21.4% | 7.1 | ✅ | ✅ | 1-11-7-2-7-10 | 腳 (Leg) | — |
| 1 | CHANCHENG GLORY | 0.1% | 2.3% | 11 | ❌ | ❌ | 10-8-8-6-5-7 | — | — |
| 4 | GORGEOUS WIN | 0.1% | 2.1% | 10 | ❌ | ❌ | 8-10-11-10-8-9 | — | — |

Market: Overround 22.9%, favourite bias +38.2%. MC rates #2 (62.8%) well above market (~43% implied) and #6 (14.8% vs ~9% implied, 55% place edge) as the main overlay; #3 SING DRAGON (3rd fav, 7.1) and #4/#1 are heavily overbet vs MC.

---

## STRATEGY A — HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 2 | TALENTS AMBITION | 62.8% | 93.1% | trial +2 (cap 50%) | trial +2 (cap 85%) | 50.0% | 85.0% | 2.3 | Z Purton | Stalk (midfield) | +trial | ★ 膽 (Banker 1) |
| 6 | DEFINITIVE | 14.8% | 65.4% | excuses +2, +form +1 | excuses +2, +form +1 | 17.8% | 68.4% | 11 | K Teetan | Close | +excuses, +form | ★ 膽 (Banker 2) |
| 7 | SKY VINO | 13.3% | 62.4% | excuses +2 | excuses +2 | 15.3% | 64.4% | 5.7 | A Badel | Front | +excuses | 腳 (Leg) |
| 5 | AWESOME FLUKE | 3.7% | 27.1% | 0 | 0 | 3.7% | 27.1% | 19 | H Y Yuen (-7) | Midfield | dirt debut | 腳 (Leg) |
| 3 | SING DRAGON | 2.3% | 21.4% | +form +1 | +form +1 | 3.3% | 22.4% | 7.1 | M Chadwick | Front | +form | 腳 (Leg) |
| 8 | LOCH TAY | 2.9% | 26.1% | 0 | 0 | 2.9% | 26.1% | 7.6 | H Bentley | Front/on-pace | — | 腳 (Leg) |
| 1 | CHANCHENG GLORY | 0.1% | 2.3% | 0 | 0 | 0.1% | 2.3% | 11 | C L Chau (-2) | — | — | — |
| 4 | GORGEOUS WIN | 0.1% | 2.1% | 0 | 0 | 0.1% | 2.1% | 10 | R Kingscote | — | — | — |

Factor sources (SCMP):
- #2 trial +2: "ran on well under a hold for an eye-catching fourth in his latest trial". Single bump (R813), so no barrier penalty. Raw MC was already above the 50% / 85% caps, so both values are capped.
- #6 excuses +2: "bumped shortly after the start. From a wide barrier was shifted across behind runners". +form +1: "rallying Valley 1,650m success". The knee injury came before a June win (>30 days ago), so no injury penalty.
- #7 excuses +2: "heavy contact with a runner at the start ... reluctant to go forward". Star Form says "Light weight should help" (115 lb), but that is not a draw comment, so no +draw.
- #3 +form +1: "Made all over the dirt 1,650m on this card last year ... resumed a shock short-head winner".
- #5: TIR says "failed to show sufficient pace". One SCMP parse also mentioned "could not be fully ridden out", but a verbatim re-fetch did not confirm it, so the −2 was not applied. If it had been, Adj Place% would fall to about 25.1%, which is still in the pool.
- #8: only a single "bumped at the start", so no adjustment.

Reasoning: #2 is clear top on MC (rating 78, 5L+ projected margin), has Purton, and is the best dirt-place horse in the field. #6 and #7 are both ~65% place on MC with excuses last start; they are near-interchangeable for the second banker slot (#6 edges on Adj Place% and MC value). #5, #8 and #3 each sit 21–27% place: #8 and #3 are proven dirt 1,650m winners on the speed (pace pressure between #7, #8, #3 should suit #2 midfield and #6 closing). #1 and #4 are both ~2% place on MC and excluded (no rule forces inclusion; they carry no negative flags to discount, they are simply rated well below).

## STRATEGY A — TRIO POOL (any order)

```
POOL: #2, #6, #7, #5, #8, #3
MODE: A (Dominant) | POOL SIZE: 6
  Mode A default = banker + 4 by Adj Place% (#6, #7, #5, #8);
  #3 added because Adj Place% 22.4% ≥ 20% must-include (Rule 8).

雙膽拖 STRUCTURE (2nd-ranked #6 Adj Place% 68.4% ≥ 63%):
膽 (Bankers): #2 TALENTS AMBITION (Adj Place% 85.0%), #6 DEFINITIVE (Adj Place% 68.4%)
腳 (Legs):    #7, #5, #8, #3
BET STRUCTURE: 雙膽拖 | 2膽 + 4腳 | COMBINATIONS: 4
```

Top Trio combinations. Combined probability is a Harville estimate from Adj Win%. It is indicative only and overstates the favourite-led trios.

| Rank | Horses (any order) | Combined Prob | Est. Fair Odds | In Strategy A ticket |
|------|--------------------|---------------|----------------|----------------------|
| 1 | #2, #6, #7 | 46.1% | $2.2 | ✅ |
| 2 | #2, #5, #6 | 9.3% | $10.7 | ✅ |
| 3 | #2, #3, #6 | 8.3% | $12.1 | ✅ |
| 4 | #2, #5, #7 | 7.5% | $13.3 | ❌ (1-banker only) |
| 5 | #2, #6, #8 | 7.3% | $13.8 | ✅ |
| 6 | #2, #3, #7 | 6.7% | $14.9 | ❌ (1-banker only) |
| 7 | #2, #7, #8 | 5.9% | $17.1 | ❌ (1-banker only) |

Coverage (Harville): 雙膽拖 ≈ 71%, 1-banker 膽拖 on the same pool ≈ 94%.

## STRATEGY A — TICKET SUMMARY

```
COMBINATIONS: 4 (雙膽拖: 2膽 #2 + #6, 4腳 #7, #5, #8, #3)
UNIT BET: $10 (fixed)
TOTAL STAKE: $40

TICKETS:
  2-6-7, 2-6-5, 2-6-8, 2-6-3

ALTERNATIVE (lower variance, if not comfortable double-banking #6 over #7):
  膽拖 1膽 #2 + 5腳 #6, #7, #5, #8, #3 → C(5,2) = 10 combos → $100
  (identical to the Strategy B ticket)

PASS CONDITIONS:
- If #2 TALENTS AMBITION is scratched → VOID ticket (do not restructure)
- If #6 DEFINITIVE is scratched → revert to 1-banker 膽拖 #2 + #7, #5, #8, #3 (6 combos, $60)
- If field drops below 3 → pool refunded
- If the AWT is rated wet/sloppy → reconsider; front-runners #7, #8 and #3 gain

CONFIDENCE: MEDIUM-HIGH (strong banker; 2nd banker is a coin-flip vs #7)

CAVEATS:
- 雙膽拖 needs both #2 and #6 in the top 3. #6 and #7 are nearly tied (68.4% vs 64.4% Adj Place%), so there is meaningful risk of losing to a 2-7-x result.
- The trio pays short: the favourite trio 2-6-7 is ~46% on the model, so expect a low dividend.
- SCMP is partial: there is no vet report section, the Q/QP matrix was not extracted, and the SCMP place-odds column looked unreliable. HKJC pool odds were used throughout.
- #5 "not ridden out" flag is unconfirmed and was not applied.
- The scraper log showed "distance=1200m". The enriched racecard and MC used 1650m AWT, which matches SCMP.
- Odds snapshot is from 10:22 HKT. Re-check before the 1:30pm jump.
```

---

## STRATEGY B (MC-only)

```
Banker: #2 TALENTS AMBITION (MC Win% 62.8%, MC Place% 93.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (65.4%), #7 (62.4%), #5 (27.1%), #8 (26.1%), #3 (21.4%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #5 AWESOME FLUKE (MC Place% 27.1%, Win odds 19)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
  (#4 GORGEOUS WIN at 10 and #1 CHANCHENG GLORY at 11 are both not < 10)
Action: no replacement / no addition
Final legs: #6, #7, #5, #8, #3
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET:
  2-6-7, 2-6-5, 2-6-8, 2-6-3, 2-7-5, 2-7-8, 2-7-3, 2-5-8, 2-5-3, 2-8-3
```

Comparison: both strategies use the same 6 horses. Strategy A double-banks #6 because its Adj Place% of 68.4% clears the 63% threshold, which costs $40 and covers ~71%. Strategy B single-banks #2 for $100 and covers ~94%, so it also wins on any 2-7-x result.

═══════════════════════════════════════════════════════════
