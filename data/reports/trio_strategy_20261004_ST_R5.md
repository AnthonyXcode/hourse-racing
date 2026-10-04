# Trio (單T) Strategy — Sha Tin | 2026-10-04 | Race 5

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good (from racecard) | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all, 2,298 historical races, 13/13 horses enriched)
SCMP DATA: ⚠️ Partial | Star Form / TIR / Vet / Trackwork / Win odds parsed; place odds & QP/Q matrix unreliable
ODDS SOURCE: HKJC live pool (analyze-race.ts refresh, captured ~10:30 HKT 04-Oct)
             Cross-check: HKJC early-morning pool (fetch-odds.ts, 10:22 HKT 04-Oct)
             SCMP odds: ✅ loaded (win only; place column unreliable) | HKJC live: ✅ loaded

RACE: R5 SHA TSUI HANDICAP — Class 4 | 1650m | AWT (dirt) | Good | 13 runners
CLASSIFICATION: Dominant (top Adj Win% 37.5%) | POOL SIZE: 6 (Mode A 5 + #6 forced in by Adj Place% ≥ 25% rule)
MODE: A: Tight Pool (extended to 6)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos
UNIT BET: $10 per combination (fixed)
```

## Data Validation Summary

```
Meeting: Sha Tin 2026-10-04 | Going: Good | Surface: AWT
Target Race(s): R5 (Class 4 | 1650m | 13 runners)
Scratchings: none
Odds coverage: 13 horses with odds
SCMP data: ⚠️ partial (place odds and Q/QP matrix not usable)
```

- [x] Racing confirmed (SCMP racecard: 4 October 2026, Sha Tin, R5 SHA TSUI HANDICAP 1650m AWT)
- [x] ≥3 starters (13)
- [x] Win odds for all 13 horses (place odds in the MC run were estimated from win odds)
- [x] Jockey stats (13 profiles) and trainer stats (12 profiles) loaded
- [x] No debutants: every runner has 8–10 past performances in the enriched racecard. The racecard's `careerStarts` field reads 0 for all runners, which is a parse artefact. All runners are eligible as banker.
- [!] The scraper log printed `distance=1200m` during parsing. The enriched racecard and the MC run both use **1650m AWT**, which matches SCMP. This is treated as a log artefact, as it was for R3.

---

## MC SIMULATION (raw)

Win odds are from the HKJC live refresh in analyze-race. The morning fetch-odds values differ slightly (#2 9.1, #3 9.7, #8 11, #11 11), but no ✅/❌ flag changes.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 4 | VIVACIOUS WIN | 35.5% | 67.5% | 9.8 | ✅ | ✅ | 6-3-1-5-2-4 | ★ 膽 (Banker) | 2-4: 10.0% (10.1) |
| 2 | HAPPY UNIVERSE | 12.6% | 37.7% | 9.0 | ✅ | ✅ | 13-2-10-1-6-2 | 腳 (Leg) | 4-10: 8.5% (11.8) |
| 10 | PERFECT TEAM | 10.9% | 34.8% | 23 | ✅ | ❌ | 6-5-6-5-10-13 | 腳 (Leg) | 4-8: 8.5% (11.8) |
| 8 | FIREFOOT | 10.0% | 33.2% | 10 | ✅ | ❌ | 2-5-2-1-2-2 | 腳 (Leg) | 1-4: 7.0% (14.2) |
| 1 | GENERAL REDWOOD | 8.3% | 28.3% | 21 | ✅ | ❌ | 9-3-1-10-1-8 | — (replaced by #7) | 4-6: 5.5% (18.2) |
| 6 | NIGHT PUROSANGUE | 6.9% | 24.7% | 5.7 | ✅ | ✅ | 1-9-1-9-6-3 | 腳 (Leg) | — |
| 11 | NEVER PETER OUT | 3.4% | 14.9% | 12 | ❌ | ❌ | 10-13-5-5-5-6 | — | — |
| 7 | CHILL KAKA | 3.3% | 14.8% | 5.1 | ❌ | ✅ | 3-3-2-13-13-7 | 腳 (Leg) — replacement for #1 | — |
| 12 | BULL ATTITUDE | 3.0% | 14.6% | 8.7 | ❌ | ✅ | 2-11-4-2-4-4 | 腳 (Leg) — added directly | — |
| 5 | SUPREME AGILITY | 2.6% | 11.8% | 13 | ❌ | ❌ | 5-9-11-4-2-9 | — | — |
| 3 | ANOTHER WORLD | 2.5% | 11.2% | 9.9 | ❌ | ✅ | 6-10-9-10-10-14 | 腳 (Leg) — added directly | — |
| 9 | LEAPING STAR | 0.8% | 5.2% | 26 | ❌ | ❌ | 11-1-6-9-12-11 | — | — |
| 13 | JOLTIN | 0.2% | 1.3% | 26 | ❌ | ❌ | 7-10-11-12-14-12 | — | — |

Market: overround 22.9%. MC strongly disagrees with the market. It rates #4 VIVACIOUS WIN at 35.5% win against about 10% implied ("undervalued by 248%"), and #10 at 10.9% against about 4% implied. The market's top three, #7 CHILL KAKA (5.1), #6 NIGHT PUROSANGUE (5.7) and #12 BULL ATTITUDE (8.7), are rated only 3–7% win by MC.

---

## STRATEGY A — HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 4 | VIVACIOUS WIN | 35.5% | 67.5% | excuses +2 | excuses +2 | 37.5% | 69.5% | 9.8 | Z Purton | Stalk (prominent/midfield) | +excuses | ★ 膽 (Banker) |
| 2 | HAPPY UNIVERSE | 12.6% | 37.7% | trial +2 | trial +2 | 14.6% | 39.7% | 9.0 | K C Leung | Stalk (box seat) / closer | +trial | 腳 (Leg) |
| 8 | FIREFOOT | 10.0% | 33.2% | +form +1 | +form +1 | 11.0% | 34.2% | 10 | K Teetan | Stalk / on-pace | +form | 腳 (Leg) |
| 10 | PERFECT TEAM | 10.9% | 34.8% | 0 | 0 | 10.9% | 34.8% | 23 | L Ferraris | Midfield | 8yo+ (no −age in C4) | 腳 (Leg) |
| 1 | GENERAL REDWOOD | 8.3% | 28.3% | excuses +2 | excuses +2 | 10.3% | 30.3% | 21 | B Avdulla | Front-runner | +excuses | 腳 (Leg) |
| 6 | NIGHT PUROSANGUE | 6.9% | 24.7% | +form +1 | +form +1 | 7.9% | 25.7% | 5.7 | A Badel | Front-runner | +form | 腳 (Leg) |
| 12 | BULL ATTITUDE | 3.0% | 14.6% | excuses +2 | excuses +2 | 5.0% | 16.6% | 8.7 | L Hewitson | Closer | +excuses | — |
| 5 | SUPREME AGILITY | 2.6% | 11.8% | trial +2 | trial +2 | 4.6% | 13.8% | 13 | J Orman | Midfield / rallier | +trial | — |
| 11 | NEVER PETER OUT | 3.4% | 14.9% | 0 | 0 | 3.4% | 14.9% | 12 | A Atzeni | Midfield | — | — |
| 7 | CHILL KAKA | 3.3% | 14.8% | 0 | 0 | 3.3% | 14.8% | 5.1 | R Kingscote | Stalk (handy) | — | — |
| 9 | LEAPING STAR | 0.8% | 5.2% | excuses +2 | excuses +2 | 2.8% | 7.2% | 26 | H Bentley | Midfield | +excuses | — |
| 3 | ANOTHER WORLD | 2.5% | 11.2% | 0 | 0 | 2.5% | 11.2% | 9.9 | C Y Ho | Closer | tricky gate (11) | — |
| 13 | JOLTIN | 0.2% | 1.3% | 0 | 0 | 0.2% | 1.3% | 26 | M F Poon | Back marker | single awkward jump | — |

Factor labels follow the R1–R3 convention: excuses +2 (crowded/steadied/wide/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place, -perf −2, -barrier −1 (≥2 runs), -notRO −2, and -age −2 (8yo+, Class 3 and above only). Each factor is applied to both win and place. Caps are ±8 win / ±10 place. No runner reached a cap.

Factor sources (SCMP):
- #4 excuses +2: TIR says "raced wide without cover majority of event" in the ground-covering sixth last start. Star Form also notes three seconds at Valley 1,650m and an easy win.
- #2 trial +2: "Ran on from last, beaten only a nose in second in recent dirt trial" and "Caught eye in recent dirt trial". No excuses bonus was given. Star Form mentions a "wide trip", but TIR says "came under pressure from 600m, failed to run on; may have reached end of preparation".
- #8 +form +1: "ran on for second" and "Resumed box-seat second over Valley 1,650m". The form line is 2-5-2-1-2-2.
- #1 excuses +2: "Shifted in at start and bumped; raced wide without cover most of race" on resumption. Star Form says "Downgraded, tries dirt", so this is an AWT debut.
- #6 +form +1: "Easily made all when backed ... last start for third dirt 1,650m win". It carries 7 lb more off a new rating high, but no rule applies to that.
- #12 excuses +2: "Ran on nicely for second after wide trip from behind midfield" last time out. It was bumped at the start only once, so no barrier penalty. Gate 13 is the widest draw.
- #5 trial +2: "Won one of three trials". It has a past bleed, but this is not a recent vet clearance, so no injury penalty.
- #9 excuses +2: "Raced keenly ... steadied to obtain cover". The post-race vet check found nothing significant.
- #10: veteran, 8+ years old, passed vet 02/09/2026 for age, not injury. The -age penalty applies only in C3 and above, so none is applied in this C4 race. SCMP's "no-excuse sixth" comment has no rule attached.
- #3: "Has tricky gate" (gate 11). No penalty was applied because MC already includes the draw.
- #13: "Jumped awkwardly" once, which is below the barrier threshold.

Reasoning: #4 is MC's clear top pick by rating (69 vs 63 next) and win share (35.5%), with Z Purton (21% strike rate in historical data) on a 5-year-old with a 6-3-1-5-2-4 form line. Wide trips last start are excuses. #2, #8 and #10 form the next tier at 34–40% place. #2 is a proven dirt 1,650m placegetter with a good trial. #8 is a consistent placer (five top-2s in 6). #10 is a dirt-place veteran. #1 brings wire-to-wire 1,650m form but is untried on dirt. #6 is forced in by the Adj Place% ≥ 25% rule. As a dirt 1,650m specialist and 2nd favourite, #6 is a sensible inclusion. Pace: #1 and #6 are the natural leaders, and #7 sits handy. That should set up the stalkers (#4, #2, #8). Market favourite #7 (5.1) and 3rd favourite #12 (8.7) sit at 15–17% Adj Place% and stay out of Strategy A on threshold rules (Rule 8: no narrative exclusion, thresholds only). Strategy B covers both.

## STRATEGY A — TRIO POOL (any order)

```
POOL: #4, #2, #8, #10, #1, #6
MODE: A (Dominant, top Adj Win% 37.5% ≥ 35%) | POOL SIZE: 6
  Mode A default = banker + 4 by Adj Place% (#2 39.7, #10 34.8, #8 34.2, #1 30.3);
  #6 added because Adj Place% 25.7% ≥ 25% must-include.

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #4 VIVACIOUS WIN (Adj Place% 69.5%) ← locked in every combo
腳 (Legs):  #2, #8, #10, #1, #6
雙膽拖 check: 2nd-ranked #2 Adj Place% 39.7% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

Top Trio combinations. Combined probability is a Harville estimate from normalised Adj Win%. It is indicative only.

| Rank | Horses (any order) | Combined Prob | Est. Fair Odds | In Strategy A ticket |
|------|--------------------|---------------|----------------|----------------------|
| 1 | #2, #4, #8 | 5.0% | $20 | ✅ |
| 2 | #2, #4, #10 | 4.9% | $20 | ✅ |
| 3 | #1, #2, #4 | 4.6% | $22 | ✅ |
| 4 | #4, #8, #10 | 3.6% | $28 | ✅ |
| 5 | #2, #4, #6 | 3.5% | $29 | ✅ |
| 6 | #1, #4, #8 | 3.4% | $30 | ✅ |
| 7 | #1, #4, #10 | 3.3% | $30 | ✅ |

Coverage (Harville, Adj Win%): ticket ≈ 35.6% of outcomes.

## STRATEGY A — TICKET SUMMARY

```
COMBINATIONS: 10 (膽拖: 1膽 #4 + 5腳 #2, #8, #10, #1, #6 → C(5,2))
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKETS:
  4-2-8, 4-2-10, 4-2-1, 4-2-6, 4-8-10, 4-8-1, 4-8-6, 4-10-1, 4-10-6, 4-1-6

PASS CONDITIONS:
- If #4 VIVACIOUS WIN is scratched → VOID ticket (do not restructure)
- If a leg is scratched → play remaining 4 legs (6 combos, $60)
- If field drops below 3 → pool refunded
- If the AWT is rated wet/sloppy → reconsider; front-runners #1 and #6 gain, closers lose

CONFIDENCE: MEDIUM-LOW (MC banker is a 9.8 shot; large model-vs-market disagreement)

CAVEATS:
- MC vs market divergence is extreme. #4 is 35.5% MC win at 9.8 odds. The market's top 3 (#7, #6, #12) are rated 3–7% win by MC. Banker failure means the whole ticket loses.
- The FINISH-TIME PROJECTION in the same MC run ranks #4 only 5th (+1.82s behind #2), with #2, #10 and #7 projected fastest. The MC banker call rests on rating, form and jockey factors rather than the speed figure.
- Strategy A excludes the favourite #7 CHILL KAKA (5.1) and #12 BULL ATTITUDE (8.7) by Adj Place% thresholds. A result including either loses Strategy A.
- #1 GENERAL REDWOOD is on its first AWT start.
- SCMP is partial. Place-odds columns and Q/QP values did not match HKJC pools (for example, QP 1-6 at 5.5 is implausible), so they were not used. The SCMP Star Form, TIR, vet and trial text came from an automated page summary, so treat the Strategy A factors as approximate.
- Place odds in the MC run were estimated from win odds.
- The scraper log showed "distance=1200m". The racecard and MC used 1650m AWT, which matches SCMP.
- The odds snapshot is from about 10:30 HKT. Re-check before the race.
```

---

## STRATEGY B (MC-only)

```
Banker: #4 VIVACIOUS WIN (MC Win% 35.5%, MC Place% 67.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2 (37.7%), #10 (34.8%), #8 (33.2%), #1 (28.3%), #6 (24.7%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #1 GENERAL REDWOOD (MC Place% 28.3%, Win odds 21)
  (#6 24.7% is in range but odds 5.7; #8 odds 10 is not > 10 and Place% 33.2% is out of range)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), ascending by odds:
  #7 CHILL KAKA (Win odds 5.1, MC Place% 14.8%)
  #12 BULL ATTITUDE (Win odds 8.7, MC Place% 14.6%)
  #3 ANOTHER WORLD (Win odds 9.9, MC Place% 11.2%)
Action:
  #7 → replaced #1 (only replaceable leg)
  #12 → added directly (no replaceable leg left)
  #3 → added directly (no replaceable leg left)
Final legs: #2, #10, #8, #6, #7, #12, #3
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

STRATEGY B TICKET (膽 #4; 腳 #2, #10, #8, #6, #7, #12, #3):
  4-2-10, 4-2-8, 4-2-6, 4-2-7, 4-2-12, 4-2-3,
  4-10-8, 4-10-6, 4-10-7, 4-10-12, 4-10-3,
  4-8-6, 4-8-7, 4-8-12, 4-8-3,
  4-6-7, 4-6-12, 4-6-3,
  4-7-12, 4-7-3,
  4-12-3

Top combos (Harville, raw MC Win%): 2-4-10 6.4% ($16), 2-4-8 5.8% ($17), 4-8-10 4.9% ($20),
  2-4-6 3.9% ($26), 4-6-10 3.3% ($31), 4-6-8 3.0% ($34)
Coverage (Harville, raw MC): ≈ 42.8%
```

Comparison: both strategies bank #4. Strategy B costs twice as much as A ($210 vs $100). It drops #1 for the favourite #7 and adds the market-supported #12 and #3, so it covers the scenario where the market is right about the pace horses. Strategy A stays with the MC/SCMP top 6 and keeps #1 (an MC 1-4 quinella pair at 7.0%). Both lose if #4 misses the top 3.

═══════════════════════════════════════════════════════════
