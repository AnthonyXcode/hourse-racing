# Trio (單T) Strategy — Sha Tin | 2026-10-19 | Race 5

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard now shows the 21-Oct Happy Valley card)
ODDS SOURCE: Final starting prices (SP) from saved race-day snapshot, as loaded by analyze-race.ts
             SCMP odds: ❌ not available | HKJC live: ❌ no longer available (meeting completed)

RACE: R5 — Class 4 | 1200m | Turf | Good | 12 runners (LUNG HANG HANDICAP)
CLASSIFICATION: Competitive (top Adj Win% 31.6%) | POOL SIZE: 7
MODE: B: Standard Pool (6) → expanded to 7 (Rule 8: all Adj Place% ≥ 20% must be in the pool)
BET STRUCTURE: 膽拖 1膽 + 6腳 → C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Sha Tin 2026-10-19 | Going: Good | Surface: Turf
Target Race(s): R5 (Class 4 | 1200m | 12 runners)
Scratchings: none
Odds coverage: 12/12 horses with win odds (final SP)
SCMP data: ❌ unavailable (retrospective run)
```

- ≥3 starters ✅ (12) | Odds populated for all 12 ✅ | Jockey/trainer stats loaded from historical data ✅
- **Debutant:** #3 COSMO DRAGON has no form (no projected time; MC 1.0% win).
- **Sparse form (<3 runs):** #7 VOYAGE CAPTAIN (1 run), #6 SMILING SKY (2), #4 HAPPY SPECIAL (2). MC ratings for these rest on very little data.
- **Long layoffs (>90 days):** #7 VOYAGE CAPTAIN and #9 NEVER SETTLE (last run 19-Feb, ~242 days), #5 SHARP PLANET (13-Jun, ~128 days), #8 GUTSY BRAVO (21-Jun, ~120 days), #1 REAL GENTLEMAN (15-Jul, ~96 days).
- Steps 1b–1e (sync-historical, fetch-odds, racecard scrape, SCMP) were intentionally skipped. The data is the prepared leak-free snapshot.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 12 | CIRRUS SPEED | 31.6% | 63.6% | 2.2 | ✅ | ✅ | 1-7-12-6-8-5 | ★ 膽 (Banker) | 6-12: 9.8% (10.2) |
| 6 | SMILING SKY | 13.1% | 39.2% | 39 | ✅ | ❌ | 5-11 | 腳 (Leg) | 2-12: 7.3% (13.6) |
| 2 | WOLF COMING | 10.9% | 33.7% | 4.9 | ✅ | ✅ | 2-6-9-3-11-7 | 腳 (Leg) | 11-12: 6.7% (14.8) |
| 11 | THUNDER PRINCE | 9.6% | 30.6% | 32 | ✅ | ❌ | 7-3-9-5-6-11 | 腳 (Leg) | 4-12: 6.3% (15.9) |
| 4 | HAPPY SPECIAL | 8.8% | 29.0% | 34 | ✅ | ❌ | 4-11 | 腳 (Leg) | 10-12: 6.0% (16.5) |
| 10 | NAVAS G | 8.4% | 28.5% | 11 | ✅ | ❌ | 3-8-7-6-3 | 腳 (Leg) | — |
| 7 | VOYAGE CAPTAIN | 6.8% | 24.8% | 14 | ✅ | ❌ | 7 | — (replaced by #8) | — |
| 9 | NEVER SETTLE | 3.3% | 14.7% | 10 | ❌ | ❌ | 11-8-3-3 | — | — |
| 8 | GUTSY BRAVO | 2.7% | 12.8% | 5.2 | ❌ | ✅ | 3-13-6 | 腳 (Leg) — replacement candidate | — |
| 5 | SHARP PLANET | 1.9% | 8.8% | 91 | ❌ | ❌ | 6-14-2 | — | — |
| 1 | REAL GENTLEMAN | 1.8% | 9.1% | 68 | ❌ | ❌ | 12-12-1-13-13-14 | — | — |
| 3 | COSMO DRAGON | 1.0% | 5.2% | 111 | ❌ | ❌ | — (debut) | — | — |

Market: Overround 23.4%. MC and market agree on the favourite, #12 CIRRUS SPEED (31.6% MC vs ~45% implied at 2.2), but MC thinks it is over-bet. The big disagreements are #6 SMILING SKY (MC 13.1% vs 39 odds, flagged undervalued 411%), #11 (208%) and #4 (200%). In the other direction, the market's 3rd and 4th choices, #8 GUTSY BRAVO (5.2) and #9 NEVER SETTLE (10), get only 12.8% and 14.7% place from MC. Both are returning from long breaks, but they have the two fastest-looking speed profiles in the field (#9 has the best projected time, 1:09.72). The analyzer's own bets were Place #6 @4.02 (HK$500), #11 @3.95, #4 @3.97 and #12 @1.66.

---

## STRATEGY A

### HORSE RANKINGS

SCMP was unavailable, so all factors are 0 and Adj% = MC%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 12 | CIRRUS SPEED | 31.6% | 63.6% | 0 | 0 | 31.6% | 63.6% | 2.2 | M F Poon | — | — (n/a) | ★ 膽 (Banker) |
| 6 | SMILING SKY | 13.1% | 39.2% | 0 | 0 | 13.1% | 39.2% | 39 | C L Chau | — | — (n/a) | 腳 (Leg) |
| 2 | WOLF COMING | 10.9% | 33.7% | 0 | 0 | 10.9% | 33.7% | 4.9 | L Hewitson | — | — (n/a) | 腳 (Leg) |
| 11 | THUNDER PRINCE | 9.6% | 30.6% | 0 | 0 | 9.6% | 30.6% | 32 | B Avdulla | — | — (n/a) | 腳 (Leg) |
| 4 | HAPPY SPECIAL | 8.8% | 29.0% | 0 | 0 | 8.8% | 29.0% | 34 | A Atzeni | — | — (n/a) | 腳 (Leg) |
| 10 | NAVAS G | 8.4% | 28.5% | 0 | 0 | 8.4% | 28.5% | 11 | L Ferraris | — | — (n/a) | 腳 (Leg) |
| 7 | VOYAGE CAPTAIN | 6.8% | 24.8% | 0 | 0 | 6.8% | 24.8% | 14 | H Y Yuen | — | — (n/a) | 腳 (Leg) |
| 9 | NEVER SETTLE | 3.3% | 14.7% | 0 | 0 | 3.3% | 14.7% | 10 | M L Yeung | — | — (n/a) | — (1st reserve) |
| 8 | GUTSY BRAVO | 2.7% | 12.8% | 0 | 0 | 2.7% | 12.8% | 5.2 | J Orman | — | — (n/a) | — (reserve) |
| 5 | SHARP PLANET | 1.9% | 8.8% | 0 | 0 | 1.9% | 8.8% | 91 | E C W Wong | — | — (n/a) | — |
| 1 | REAL GENTLEMAN | 1.8% | 9.1% | 0 | 0 | 1.8% | 9.1% | 68 | K C Leung | — | — (n/a) | — |
| 3 | COSMO DRAGON | 1.0% | 5.2% | 0 | 0 | 1.0% | 5.2% | 111 | H T Mo | — | — (n/a) | — |

Note: ★ 膽 = Banker (1st by Adj Win%). #12 has 10 form lines, so it is eligible to be banker. 2nd-ranked #6 has Adj Place% 39.2% < 63%, so 雙膽拖 does not apply.

**Reasoning:** The top Adj Win% is 31.6%, so the race is Competitive and uses Mode B. The base pool is the top 3 by Adj Win% (#12, #6, #2) plus the next 3 by Adj Place% (#11 30.6%, #4 29.0%, #10 28.5%). Those six are also exactly the horses at Adj Place% ≥ 25% (must-include). #7 VOYAGE CAPTAIN is at 24.8%, so Rule 8 (Adj Place% ≥ 20% must be in the pool) expands the pool to 7. This follows how earlier reports handled Rule 8 expansions.

- #12 CIRRUS SPEED is a clear MC #1. It won last start (1-Oct, 1200m), has gate 1 and carries bottom weight (116 lb, rating 40). Trainer D J Hall is 17% from 47. Jockey M F Poon's strike rate is low (6%). The market also makes it a strong favourite (2.2).
- #6 SMILING SKY and #4 HAPPY SPECIAL are both lightly raced (2 runs each, last run 4-Oct). MC rates them well above the market, but on very little data. Treat them as value legs, not solid ones.
- #2 WOLF COMING is the market's 2nd choice (4.9) and has consistent form (2-6-9-3). It carries top weight of 132 lb and has the slowest projected time among the main contenders.
- #11 THUNDER PRINCE (10 runs, draw 5) and #10 NAVAS G (placed 3rd twice in its last 5) are steady types.
- #7 VOYAGE CAPTAIN has had only 1 run and returns from ~242 days off. It is in the pool only through Rule 8.

Rule 9 (no hard exclusion at odds ≤ 15) covers exclusion because of negative flags. With no SCMP flags, nobody is excluded on flags. #8 GUTSY BRAVO (5.2) and #9 NEVER SETTLE (10) are out of the pool only because their Adj Place% is below the cutoff, and they are the first reserves. This is the same reading of Rule 9 used in the R3 report. No pace or running-style read is available without SCMP Star Form. The finish-time projection has #9, #7, #12 and #6 as the quickest, which suggests a contested early tempo from the inside gates.

### TRIO POOL (any order)

```
POOL: #12, #6, #2, #11, #4, #10, #7
MODE: B (expanded by Rule 8) | POOL SIZE: 7

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #12 CIRRUS SPEED (Adj Place% 63.6%) ← locked in every combo
腳 (Legs):  #6, #2, #11, #4, #10, #7
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville approximation from MC Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #12, #6, #2 | 5.5% | $18.1 |
| 2 | #12, #6, #11 | 4.8% | $20.9 |
| 3 | #12, #6, #4 | 4.4% | $23.0 |
| 4 | #12, #6, #10 | 4.1% | $24.2 |
| 5 | #12, #2, #11 | 3.9% | $25.8 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), banker #12 + legs 6,2,11,4,10,7)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

ALL COMBINATIONS (est. prob):
  12-6-2 5.5%  | 12-6-11 4.8% | 12-6-4 4.4%  | 12-6-10 4.1% | 12-2-11 3.9%
  12-2-4 3.5%  | 12-2-10 3.3% | 12-6-7 3.3%  | 12-11-4 3.0% | 12-11-10 2.9%
  12-2-7 2.7%  | 12-4-10 2.6% | 12-11-7 2.3% | 12-4-7 2.1%  | 12-10-7 2.0%
  Ticket coverage (sum): ~50.4%
  Value note: #12 is a short favourite (2.2), so Trio dividends depend on the legs. Combos with #6/#11/#4 (32–39) should pay well above fair odds; 12-2-x combos will be the shortest.

PASS CONDITIONS:
- If #12 CIRRUS SPEED (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)

CONFIDENCE: MEDIUM-LOW (strong banker; legs are a bunched 24.8–39.2% group, several built on sparse form)
```

---

## STRATEGY B (MC-only)

```
Banker: #12 CIRRUS SPEED (MC Win% 31.6%, MC Place% 63.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (39.2%), #2 (33.7%), #11 (30.6%), #4 (29.0%), #10 (28.5%), #7 (24.8%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
  #4 HAPPY SPECIAL (29.0%, 34) | #10 NAVAS G (28.5%, 11) | #7 VOYAGE CAPTAIN (24.8%, 14)
  (#11 is 30.6% > 30%; #6 39.2%; #2 odds 4.9)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #8 GUTSY BRAVO (Win odds 5.2, MC Place% 12.8%)
  (#9 NEVER SETTLE is exactly 10.0, not < 10)
Action: #8 replaced #7 VOYAGE CAPTAIN (lowest MC Place% among replaceable legs)
Final legs: #6, #2, #11, #4, #10, #8
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #12 / 腳 #6, #2, #11, #4, #10, #8
  12-6-2 5.5%  | 12-6-11 4.8% | 12-6-4 4.4%  | 12-6-10 4.1% | 12-2-11 3.9%
  12-2-4 3.5%  | 12-2-10 3.3% | 12-11-4 3.0% | 12-11-10 2.9% | 12-4-10 2.6%
  12-6-8 1.2%  | 12-2-8 1.0%  | 12-11-8 0.9% | 12-4-8 0.8%  | 12-10-8 0.8%
  Ticket coverage (sum, MC-Harville): ~42.8%
```

Comparison: both strategies use the same banker (#12), the same five core legs and the same cost ($150, 15 combos). The only difference is the 6th leg. Strategy A keeps #7 VOYAGE CAPTAIN (MC 24.8% place, 14 odds) through Rule 8. Strategy B swaps it for the market's 3rd favourite #8 GUTSY BRAVO (5.2, MC 12.8% place). On MC numbers A covers more (~50.4% vs ~42.8%). B hedges against MC under-rating #8, which is returning from ~120 days off.

---

## CAVEATS

- **Retrospective run:** generated 2026-10-20, blind to results. The scheduled pre-race run was missed.
- **Odds are final SP, not morning odds.** They include late market moves that a pre-race run would not have seen. The market comments, the win-odds<10 flags and Strategy B's #8 swap all use closing prices. #9 at exactly 10.0 SP sits on the Strategy B threshold, so a different morning price could have changed Strategy B.
- **SCMP unavailable (retrospective run).** There are no Star Form, TIR, vet, trackwork, QP/Q matrix or running-style inputs. Strategy A adjustments are all 0, so Adj% = MC%. Strategy B is unaffected.
- **Sparse and stale form:** #6 and #4 (2 runs each) and #7 (1 run, ~242 days off) have MC ratings built on very little data. The MC/market gap on #6 (411% "undervalued") is more likely a data artefact than real value. #3 is a debutant.
- **Model vs market on #8/#9:** the market's 3rd and 4th choices get low MC place%. They are returning from long breaks, but #9 has the best projected time. Neither is in Strategy A's pool.
- The banker's jockey (M F Poon) is 6% from 69 rides, and #12 is rated only 40 in a Class 4 race (bottom weight).
- Trio combination probabilities are a Harville approximation from MC Win%, not direct MC trio counts. Place odds were estimated from win odds by the tool.
- Historical sync, odds fetch and racecard scrape were intentionally not run. The data is the prepared leak-free snapshot.
```
═══════════════════════════════════════════════════════════
```
