# Trio (單T) Strategy — Sha Tin 2026-10-04 Race 1

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey + trainer stats loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds + Q/QP matrix look mis-parsed)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261004_ST.json, captured 10:22 HKT 04-Oct)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R1 — Class 5 | 1650m | AWT (dirt) | Good | 14 runners — CHAI WAN KOK HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 45.7%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-04 | Going: Good | Surface: AWT
Target Race(s): R1 (Class 5 | 1650m | 14 runners)
Scratchings: none
Odds coverage: 14 horses with odds (HKJC win + place)
SCMP data: ⚠️ partial
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | HAILTOTHEVICTORS | 45.7% | 81.6% | 6.6 | ✅ | ✅ | 9/3/8/2/10/4 | ★ 膽 (Banker) | 2-12: 23.8% (4.2) |
| 12 | ORIENTAL SURPRISE | 20.5% | 59.7% | 4.6 | ✅ | ✅ | 2/3/2/2/12/2 | 腳 (Leg) | 2-12: 23.8% (4.2) |
| 4 | SOARING BRONCO | 14.4% | 49.8% | 20 | ✅ | ❌ | 5/5/3/3/2/1 | 腳 (Leg) | 2-4: 17.1% (5.8) |
| 1 | DOUBLE BINGO | 9.3% | 38.9% | 8.3 | ✅ | ✅ | 10/5/1/2/3/2 | 腳 (Leg) | 1-2: 11.9% (8.4) |
| 7 | CELESTIAL HARMONY | 3.9% | 22.3% | 21 | ✅ | ❌ | 8/7/8/4/6/1 | — (replaced by #14) | 2-7: 5.6% (17.9) |
| 13 | GO GO GO | 1.4% | 11.0% | 17 | ❌ | ❌ | 12/3/5/1/10/4 | — | — |
| 5 | RISING ELITE | 1.3% | 8.8% | 38 | ❌ | ❌ | 9/12/5/5/5/14 | — | — |
| 9 | BLUE BARON | 1.0% | 7.4% | 36 | ❌ | ❌ | 7/8/7/5/9/8 | — | — |
| 11 | MAZING GRACE | 0.9% | 7.4% | 10 | ❌ | ❌ | 10/5/14/5/6/14 | — | — |
| 6 | SWAGGER BRO | 0.8% | 5.9% | 30 | ❌ | ❌ | 14/5/5/6/3/6 | — | — |
| 3 | FORTUNE SUPERNOVA | 0.4% | 3.4% | 26 | ❌ | ❌ | 8/9/6/7/12/11 | — | — |
| 10 | KOLACHI | 0.3% | 2.6% | 66 | ❌ | ❌ | 10/9/10/11/9/10 | — | — |
| 8 | VIVA TASTE | 0.1% | 0.7% | 16 | ❌ | ❌ | 12/7/9/6/10/5 | — | — |
| 14 | HAPPYDEARHAPPYDEER | 0.0% | 0.6% | 3.6 | ❌ | ✅ | 5/5/5/13/11/9 | 腳 (Leg) — replacement candidate | — |

Market: overround 22.7%. MC strongly disagrees with the market: #2 undervalued 202%, #4 undervalued 189%. #14 HAPPYDEARHAPPYDEER is the **market favourite (3.6)** but MC has it at 0.0% win / 0.6% place (rating 23, last 6 runs 5/5/5/13/11/9), so it is overvalued by about 100%. This is the biggest gap between model and market in this race.

Finish-time projection (MC): #2 1:36.96, #4 +0.56s, #7 +1.12s, #1 +2.52s. #12 is projected only 11th on raw speed figures (+4.20s), but MC still ranks it 2nd on form, consistency and jockey (Purton).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 2 | HAILTOTHEVICTORS | 45.7% | 81.6% | 0 | 0 | 45.7% | 81.6% | 6.6 | L Ferraris | 5 | 134 | Stalk (midfield) | — | ★ 膽 (Banker) |
| 2 | 12 | ORIENTAL SURPRISE | 20.5% | 59.7% | trial +2 | trial +2 | 22.5% | 61.7% | 4.6 | Z Purton | 8 | 123 | Stalk | +trial | 腳 (Leg) |
| 3 | 4 | SOARING BRONCO | 14.4% | 49.8% | 0 | 0 | 14.4% | 49.8% | 20 | J Orman | 7 | 132 | — | — | 腳 (Leg) |
| 4 | 1 | DOUBLE BINGO | 9.3% | 38.9% | 0 | 0 | 9.3% | 38.9% | 8.3 | H Y Yuen (-7) | 3 | 135 | — | — | 腳 (Leg) |
| 5 | 7 | CELESTIAL HARMONY | 3.9% | 22.3% | 0 | 0 | 3.9% | 22.3% | 21 | L Hewitson | 13 | 129 | Stalk (chased pace) | (single bump on jumping) | 腳 (Leg) |
| 6 | 6 | SWAGGER BRO | 0.8% | 5.9% | excuses +2 | excuses +2 | 2.8% | 7.9% | 30 | C L Chau (-2) | 4 | 131 | — | +excuses | — |
| 7 | 13 | GO GO GO | 1.4% | 11.0% | 0 | 0 | 1.4% | 11.0% | 17 | K Teetan | 11 | 122 | Front (made all in Mar) | — | — |
| 8 | 5 | RISING ELITE | 1.3% | 8.8% | 0 | 0 | 1.3% | 8.8% | 38 | K C Leung | 10 | 131 | — | — | — |
| 9 | 9 | BLUE BARON | 1.0% | 7.4% | 0 | 0 | 1.0% | 7.4% | 36 | A Badel | 12 | 124 | Front (speed-chasing) | — | — |
| 10 | 11 | MAZING GRACE | 0.9% | 7.4% | 0 | 0 | 0.9% | 7.4% | 10 | R Kingscote | 9 | 123 | — | — | — |
| 11 | 3 | FORTUNE SUPERNOVA | 0.4% | 3.4% | 0 | 0 | 0.4% | 3.4% | 26 | M F Poon | 2 | 132 | Close | — | — |
| 12 | 10 | KOLACHI | 0.3% | 2.6% | 0 | 0 | 0.3% | 2.6% | 66 | M L Yeung | 14 | 123 | — | (keen, steadied; self-inflicted) | — |
| 13 | 8 | VIVA TASTE | 0.1% | 0.7% | -injury30d −3 | -injury30d −4 | 0.0% | 0.0% | 16 | M Chadwick | 6 | 126 | Close | -injury30d | — |
| 14 | 14 | HAPPYDEARHAPPYDEER | 0.0% | 0.6% | 0 | 0 | 0.0% | 0.6% | 3.6 | P N Wong (-7) | 1 | 120 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1 (≥2 runs), -notRO −2, -age −2 (8yo+, C3 and above only). Caps are ±8 win / ±10 place; adjusted values are floored at 0%. All runners have ≥10 starts (no debutants), so every runner is eligible as banker.

Reasoning: The race is a Class 5 handicap over 1650m on the dirt (AWT). MC makes #2 HAILTOTHEVICTORS a clear standout (45.7% win, 81.6% place). SCMP notes it won off 34 on "his favourite dirt 1,650m" in April, it now runs off 37, and it has 4 recent minor placings. It is also fastest on projected time. #12 ORIENTAL SURPRISE has been 2nd in 4 of its last 6 runs and was 2nd at its only dirt 1650m start. SCMP trackwork reads "worked strongly on the dirt Tuesday… rates highly", so it gets trial +2. #4 SOARING BRONCO's form is improving (5/5/3/3/2/1), with 6 past runs at this trip. #1 DOUBLE BINGO has 6 placings last term and a 7lb apprentice claim. #7 CELESTIAL HARMONY won off an identical 32 over this course and distance in January, but draws gate 13. It was bumped on jumping only once, so no barrier penalty applies.
SCMP adjustments: #8 VIVA TASTE had throat surgery (tieback/hobday), passed 21/09/2026, which is 13 days ago, so -injury30d applies. #6 SWAGGER BRO was checked when crowded at the 150m, so excuses +2 applies. #10 KOLACHI was "steadied" because it raced keenly. That trouble was self-inflicted rather than bad luck, so no excuses credit.
Pace: #13 GO GO GO and #9 BLUE BARON are the likely leaders. #2 is effective from midfield, and #12 and #4 should sit handy from middle draws.

## TRIO POOL (Strategy A, any order)

```
POOL: #2, #12, #4, #1, #7
MODE: A: Tight Pool (5) | POOL SIZE: 5
Must-include (Adj Place% ≥ 25%): #2, #12, #4, #1 — all included

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 HAILTOTHEVICTORS (Adj Win% 45.7%, Adj Place% 81.6%) ← locked in every combo
腳 (Legs):  #12, #4, #1, #7
雙膽拖 check: 2nd-ranked #12 Adj Place% 61.7% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #2, #12, #4 | 26.0% | $38 per $10 |
| 2 | #2, #12, #1 | 15.7% | $64 per $10 |
| 3 | #2, #4, #1 | 8.8% | $114 per $10 |
| 4 | #2, #12, #7 | 6.2% | $161 per $10 |
| 5 | #2, #4, #7 | 3.5% | $290 per $10 |
| 6 | #2, #1, #7 | 2.1% | $484 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 6 combos): about 62%. Harville from win% tends to overstate how concentrated the finish is, so treat this as an upper bound.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6 (膽拖: C(4,2), 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

TICKET: 膽 #2 | 腳 #12, #4, #1, #7
  2-12-4, 2-12-1, 2-4-1, 2-12-7, 2-4-7, 2-1-7
```

Value note: the market favourite #14 (3.6) is outside the ticket, so if the favourite misses the frame the dividends should be inflated. Combos built around #4 (20/1) carry the most value.

PASS CONDITIONS:
- If #2 HAILTOTHEVICTORS (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the AWT is rated Wet Slow / sealed → reconsider: the model's going is "Good" and #8's rider has already complained about Wet Slow.
- If #2 drifts above 15 on late money → re-check for a late vet or gear issue before betting.

CONFIDENCE: MEDIUM-HIGH. The banker is clear and the race is Dominant, but MC and the market disagree sharply about the favourite.

CAVEATS:
- **Model vs market conflict**: #14 HAPPYDEARHAPPYDEER is the 3.6 favourite (SCMP shows 3.4) but MC has it at 0.6% place. Its form (5/5/5/13/11/9, rating 23, gear change: V+TT, 7lb claim, gate 1) gives no support for that price. A heavily backed horse like this may be priced on information MC cannot see, such as the visor or trackwork. Strategy B includes #14; Strategy A follows MC + SCMP and excludes it (no negative flags, so Rule 9 does not apply).
- SCMP is partial. Win odds match HKJC broadly, but SCMP Place odds come out higher than Win odds for several horses, and the Q/QP figures (e.g. 2-12 Q 88 / QP 9) look mis-parsed. The Q/QP cross-reference was not used.
- #12's MC finish-time projection is only 11th; its ranking rests on placing consistency rather than raw speed.
- Odds were captured at 10:22 HKT; the HKJC pool will move before the 12:30 jump.
- Historical sync was not re-run in this session (it had already been done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #2 HAILTOTHEVICTORS (MC Win% 45.7%, MC Place% 81.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #12 (59.7%), #4 (49.8%), #1 (38.9%), #7 (22.3%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #7 CELESTIAL HARMONY (MC Place% 22.3%, Win odds 21)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #14 HAPPYDEARHAPPYDEER (Win odds 3.6, MC Place% 0.6%)
  (#11 MAZING GRACE at exactly 10 is not < 10, so it does not qualify)
Action: #14 replaced #7 (1-for-1 swap)
Final legs: #12, #4, #1, #14
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 膽 #2 | 腳 #12, #4, #1, #14
  2-12-4, 2-12-1, 2-4-1, 2-12-14, 2-4-14, 2-1-14
```

Comparison: both strategies use the same banker (#2), the same core legs (#12, #4, #1) and the same cost ($60, 6 combos). The only difference is the 4th leg. Strategy A takes #7 CELESTIAL HARMONY (MC Place 22.3%, course-and-distance winner). Strategy B swaps in the market favourite #14 (3.6) through the Win-odds rule. This race directly tests whether the market's support for #14 beats MC's rejection of it.

═══════════════════════════════════════════════════════════
