# Trio (單T) Strategy — Sha Tin 2026-10-04 Race 10

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 10
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey + trainer stats loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds + Q matrix look mis-parsed)
ODDS SOURCE: HKJC pool (tools/analyze-race.ts live fetch during this run, 04-Oct morning; meeting file data/odds/odds_20261004_ST.json captured 10:22 HKT)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R10 — Class 3 | 1000m (straight) | Turf | Good | 14 runners — SHING MUN HANDICAP
CLASSIFICATION: Competitive (top Adj Win% 24.8%) | POOL SIZE: 8 (Mode B 6 + #10 and #3 forced in by Adj Place% ≥ 25%)
MODE: B: Standard Pool (extended to 8)
BET STRUCTURE (A): 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-04 | Going: Good | Surface: Turf
Target Race(s): R10 (Class 3 | 1000m straight | 14 runners)
Scratchings: none (SCMP lists reserves GUSTOSISIMO and NORTHERN FIRE BALL; neither is in the field)
Odds coverage: 14 horses with odds (HKJC win; place estimated from win by the tool)
SCMP data: ⚠️ partial
Form gaps: #6 SMART OINK is a local debutant (0 HK starts, Australian import). #9 CONGHUA GALAXY and
           #12 JIN SHENG have 1 local start each; #10 INVINCIBLE STEED has 3. Banker #1 HORSEPOWER has 10+ starts (eligible).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 1 | HORSEPOWER | 23.8% | 53.4% | 13 | ✅ | ❌ | 4/8/2/2/2/9 | ★ 膽 (Banker) | 1-2: 6.9% (14.6) |
| 2 | ALPHA STRIKE | 13.2% | 37.5% | 8.2 | ✅ | ✅ | 1/12/4/4/10/12 | 腳 (Leg) | 1-2: 6.9% (14.6) |
| 8 | MICKLEY | 11.9% | 33.6% | 9.0 | ✅ | ✅ | 11/10/6/10/7/7 | 腳 (Leg) | 1-8: 5.8% (17.4) |
| 4 | CELESTIAL HERO | 11.3% | 33.1% | 14 | ✅ | ❌ | 10/12/3/6/8/4 | 腳 (Leg) | 1-4: 5.8% (17.3) |
| 9 | CONGHUA GALAXY | 8.9% | 29.5% | 8.3 | ✅ | ✅ | 3 | 腳 (Leg) | 1-9: 5.0% (20.1) |
| 10 | INVINCIBLE STEED | 8.7% | 28.4% | 9.4 | ✅ | ✅ | 5/5/3 | 腳 (Leg) | 1-10: 4.4% (22.5) |
| 13 | LUCKY CANDY | 7.5% | 24.8% | 8.2 | ✅ | ✅ | 6/2/2/2/3/3 | 腳 (Leg) | — |
| 3 | METRO POWER | 7.1% | 24.6% | 12 | ✅ | ❌ | 4/4/4/5/6/11 | — (replaced by #6) | — |
| 14 | LAHORE | 2.7% | 11.8% | 12 | ❌ | ❌ | 1/1/4/2/11/8 | — | — |
| 6 | SMART OINK | 2.1% | 9.6% | 8.1 | ❌ | ✅ | debut | 腳 (Leg) — replaced #3 | — |
| 5 | ETERNAL FORTUNE | 1.5% | 7.1% | 14 | ❌ | ❌ | 9/9/9/2/3/5 | — | — |
| 7 | CASA OF HONOR | 0.7% | 3.5% | 23 | ❌ | ❌ | 7/12/8/1/12/6 | — | — |
| 11 | NOTTHESILLYONE | 0.5% | 2.4% | 17 | ❌ | ❌ | 8/8/9/1/9/1 | — | — |
| 12 | JIN SHENG | 0.1% | 0.7% | 29 | ❌ | ❌ | 11 | — | — |

Market: overround 22.9%. The market has no clear favourite: seven horses sit between 8.1 and 9.4. MC strongly disagrees on #1 HORSEPOWER (13 in the market, 23.8% MC win, "undervalued by 210%"). It is the highest-rated horse (77) and the fastest on projected time. MC rates the debutant market favourite #6 SMART OINK (8.1) at only 2.1% win, because it has no form for MC to use. MC flags #12 and #11 as overvalued.

Finish-time projection (MC): #1 HORSEPOWER is fastest at 55.88, ahead of #8 MICKLEY (+0.42s), #4 CELESTIAL HERO (+0.70s), #3 METRO POWER (+0.84s), and #2 / #5 (+1.12s). #6 SMART OINK is excluded from the projection (debut).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 1 | HORSEPOWER | 23.8% | 53.4% | +form +1 | +form +1 | 24.8% | 54.4% | 13 | A Atzeni | 8 | 135 | Closer (from behind midfield) | +form | ★ 膽 (Banker) |
| 2 | 2 | ALPHA STRIKE | 13.2% | 37.5% | +form +1 | +form +1 | 14.2% | 38.5% | 8.2 | J Orman | 2 | 131 | Front (wire-to-wire) | +form | 腳 (Leg) |
| 3 | 9 | CONGHUA GALAXY | 8.9% | 29.5% | trial +2, +draw +1, excuses +2 | trial +2, +draw +1, excuses +2 | 13.9% | 34.5% | 8.3 | L Ferraris | 13 | 123 | Stalk (better than midfield) | +trial, +draw, +excuses | 腳 (Leg) |
| 4 | 4 | CELESTIAL HERO | 11.3% | 33.1% | excuses +2 | excuses +2 | 13.3% | 35.1% | 14 | Z Purton | 5 | 126 | Midfield | +excuses | 腳 (Leg) |
| 5 | 8 | MICKLEY | 11.9% | 33.6% | excuses +2, -notRO −2 | excuses +2, -notRO −2 | 11.9% | 33.6% | 9.0 | K C Leung | 4 | 124 | Back | +excuses, -notRO | 腳 (Leg) |
| 6 | 13 | LUCKY CANDY | 7.5% | 24.8% | excuses +2, +form +1 | excuses +2, +form +1 | 10.5% | 27.8% | 8.2 | K Teetan | 6 | 122 | Stalk (handy) | +excuses, +form | 腳 (Leg) |
| 7 | 3 | METRO POWER | 7.1% | 24.6% | excuses +2 | excuses +2 | 9.1% | 26.6% | 12 | L Hewitson | 10 | 128 | On-pace | +excuses | 腳 (Leg) |
| 8 | 10 | INVINCIBLE STEED | 8.7% | 28.4% | 0 | 0 | 8.7% | 28.4% | 9.4 | C Y Ho | 7 | 123 | Midfield | — | 腳 (Leg) |
| 9 | 14 | LAHORE | 2.7% | 11.8% | +form +1 | +form +1 | 3.7% | 12.8% | 12 | A Badel | 3 | 119 | On-pace | +form | — |
| 10 | 5 | ETERNAL FORTUNE | 1.5% | 7.1% | excuses +2 | excuses +2 | 3.5% | 9.1% | 14 | P N Wong (-7) | 14 | 125 | Midfield | +excuses | — |
| 11 | 7 | CASA OF HONOR | 0.7% | 3.5% | excuses +2 | excuses +2 | 2.7% | 5.5% | 23 | M F Poon | 11 | 124 | Midfield | +excuses | — |
| 12 | 6 | SMART OINK | 2.1% | 9.6% | 0 | 0 | 2.1% | 9.6% | 8.1 | H Y Yuen (-7) | 12 | 125 | Unknown (debut) | — | — |
| 13 | 11 | NOTTHESILLYONE | 0.5% | 2.4% | 0 | 0 | 0.5% | 2.4% | 17 | R Kingscote | 9 | 123 | Front | — | — |
| 14 | 12 | JIN SHENG | 0.1% | 0.7% | -perf −2, -notRO −2 | -perf −2, -notRO −2 | 0.0% | 0.0% | 29 | C L Chau (-2) | 1 | 122 | — | -perf, -notRO | — |

Factor labels: excuses +2 (crowded/bumped/hampered/wide), trial +2, +draw +1, +form +1 (rallied/improved/made all), -perf −2 (stewards: unacceptable), -notRO −2. Caps are ±8 win / ±10 place, and none were reached. Negative results are floored at 0.0%. Banker eligibility: #1 has 10+ starts, so it is eligible.

SCMP adjustments applied:
- **#1 HORSEPOWER**: "rallied for seconds in three consecutive Valley 1,000m runs… Resumed a closing fourth from behind midfield. Is a past straight 1,000m winner off 71." +form +1. No TIR, vet or trackwork notes.
- **#2 ALPHA STRIKE**: "Resumed a wire-to-wire winner" (made all), so +form +1. Throat surgery in May is more than 30 days ago, so there is no injury penalty. It was crowded early in that run but won, so no excuse credit. It carries 11lb more.
- **#9 CONGHUA GALAXY**: Trackwork: "Looked in good condition in a dirt gallop on Wednesday and has claims here", so trial +2. Star Form: "Gate is ideal" (draw 13, far side of the straight), so +draw +1. TIR: "became unbalanced when bumped" shortly after the start, so excuses +2.
- **#4 CELESTIAL HERO**: "Making Home Turn was hampered when taken wider" (1,200m), so excuses +2.
- **#8 MICKLEY**: "Shifted out at start and was bumped", so excuses +2. "Approaching 100M was eased", so -notRO −2. Net 0. The old trachea bleed is not recent (>30 days).
- **#13 LUCKY CANDY**: "On jumping was crowded", so excuses +2. "Improved to place in his final five sprints… seconds wearing cheek pieces at final three runs", so +form +1.
- **#3 METRO POWER**: "Bumped at start… Near 200M was inconvenienced", so excuses +2. Only one bumped-at-start note is shown, so no -barrier penalty.
- **#14 LAHORE**: "back-to-back Sha Tin wins" on return, so +form +1. The February bleed is more than 30 days ago, so no injury penalty. "Jumped awkwardly" appears only once, so no -barrier penalty.
- **#5 ETERNAL FORTUNE**: "became badly unbalanced with heavy contact" after the start, from gate 10, so excuses +2.
- **#7 CASA OF HONOR**: "crowded" shortly after the start, so excuses +2.
- **#12 JIN SHENG**: Vet/stewards: "Racing manners were considered unacceptable", so -perf −2. TIR: "could not ride out", so -notRO −2.
- **#10, #11, #6**: no scoring flags. #10 "lay in under pressure" is a temperament note, not an excuse.

Reasoning: This is a Class 3 straight 1000m handicap with no market favourite. #1 HORSEPOWER is MC's clear top pick: rating 77 (3 points clear), 23.8% win, fastest projected time, three straight-ish 1,000m seconds, and a past straight-1000m winner. It is unfancied at 13, probably because its last four runs were at Happy Valley and it carries top weight (135). The race is Competitive (24.8%), so Mode B applies: top 3 by Adj Win% (#1, #2, #9), plus 3 by Adj Place% (#4 35.1, #8 33.6, #13 27.8). The Adj Place% ≥ 25% must-include rule also forces in #10 (28.4%) and #3 (26.6%). That gives an 8-horse pool. Pace: #2 (draw 2, wire-to-wire last time) and #11 should lead on the stands side, and #3 sits on pace. Straight 1000m races often split into two groups. The far-side gates (#9 g13, #5 g14, #6 g12) are usually favoured, and SCMP notes "Gate is ideal" for #9. #1 (g8) closes from midfield. Market horses #6 (8.1, debut) and #14 (12) sit outside Strategy A on thresholds (Adj Place% 9.6% and 12.8%). They carry no negative flags, so Rule 9 does not force them in. Strategy B picks up #6.

## TRIO POOL (Strategy A, any order)

```
POOL: #1, #2, #9, #4, #8, #13, #3, #10
MODE: B (Competitive, #1 Adj Win% 24.8% in 20–35%) | POOL SIZE: 8
  Mode B default = top 3 by Adj Win% (#1, #2, #9) + 3 by Adj Place% (#4 35.1, #8 33.6, #13 27.8)
  Must-include (Adj Place% ≥ 25%): #1, #2, #4, #9, #8, #10, #13, #3
  #10 added: Adj Place% 28.4% ≥ 25% must-include
  #3 added:  Adj Place% 26.6% ≥ 25% must-include

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #1 HORSEPOWER (Adj Win% 24.8%, Adj Place% 54.4%) ← locked in every combo
腳 (Legs):  #2, #9, #4, #8, #13, #3, #10
雙膽拖 check: 2nd-ranked #2 Adj Place% 38.5% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #1, #2, #9 | 2.9% | $340 per $10 |
| 2 | #1, #2, #4 | 2.8% | $358 per $10 |
| 3 | #1, #9, #4 | 2.7% | $367 per $10 |
| 4 | #1, #2, #8 | 2.5% | $406 per $10 |
| 5 | #1, #9, #8 | 2.4% | $416 per $10 |
| 6 | #1, #4, #8 | 2.3% | $437 per $10 |
| 7 | #1, #2, #13 | 2.1% | $466 per $10 |
| 8 | #1, #9, #13 | 2.1% | $478 per $10 |
| 9 | #1, #4, #13 | 2.0% | $503 per $10 |
| 10 | #1, #2, #3 | 1.8% | $546 per $10 |
| 11–21 | #1 + remaining leg pairs (with #3 / #10 / #8 / #13) | 1.1–1.8% each | $559–$942 |

Estimated chance that the Strategy A ticket hits (sum of the 21 combos): about 40%. Harville from win% tends to overstate how concentrated the finish is, so treat this as an upper bound. The probability is spread thinly, with no combo above 3%. This is a typical shape for a bunched straight-1000m race.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 21 (膽拖: C(7,2), 7 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

TICKET: 膽 #1 | 腳 #2, #9, #4, #8, #13, #3, #10
  1-2-9, 1-2-4, 1-9-4, 1-2-8, 1-9-8, 1-4-8, 1-2-13, 1-9-13, 1-4-13, 1-2-3,
  1-9-3, 1-8-13, 1-2-10, 1-9-10, 1-4-3, 1-4-10, 1-8-3, 1-8-10, 1-13-3, 1-13-10, 1-10-3
```

Value note: the banker is a 13 shot rather than a short favourite, so any hit should pay well. Combos with #4 CELESTIAL HERO (14, Purton) and #3 METRO POWER (12) are the best value relative to MC.

PASS CONDITIONS:
- If #1 HORSEPOWER (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If going changes to Yielding/Soft or worse → re-run the MC. Straight-course draw bias can flip on rain-affected ground.
- If #1 drifts beyond ~20 in late betting → consider PASS. The banker case rests on MC vs a market that already disagrees.

CONFIDENCE: LOW–MEDIUM. MC has a clear top horse, but the market strongly disagrees (#1 is 9th in the market). The race is Competitive, the 2nd–8th horses are bunched (26–39% Adj Place%), and straight 1000m races carry high draw/split variance.

CAVEATS:
- SCMP is partial. Win odds broadly match HKJC (#6 6.7 vs 8.1, #9 7.9 vs 8.3, #1 15 vs 13), but SCMP Place odds are near or above Win odds for most runners, and the Q/QP figures shown (e.g. 9-14 = 5.7) are inconsistent with the win market. The Q/QP cross-reference was not used.
- **Model vs market conflict on the banker**: #1 HORSEPOWER is MC's 23.8% top pick but only 13 in the market (MC's "undervalued by 210%"). Its last four runs were at Happy Valley, and it carries top weight (135lb). If the market is right, the whole Strategy A ticket fails.
- #6 SMART OINK is the market favourite (8.1) but a local debutant with no HK form. MC can only give it baseline numbers (2.1% win). It is excluded from Strategy A on thresholds (no negative flags, so Rule 9 does not apply). Strategy B covers it. This is a known pool-miss risk for A.
- #9 CONGHUA GALAXY (1 local start) and #10 INVINCIBLE STEED (3 starts) have sparse form, so their MC numbers are less reliable.
- The MC scraper log printed "distance=1200m" while parsing, but the saved race card, MC header and SCMP all confirm 1000m (straight). The simulation ran at 1000m.
- SCMP adjustment judgment calls: #8 was scored excuses +2 and -notRO −2 (bumped at start, then eased near 100m), netting 0. #9 got both +draw ("Gate is ideal") and excuses. Without them #9 drops to rank 6 (Adj Win% 8.9%), and the pool is unchanged.
- MC does not model straight-course draw bias. The far side (high gates) is often favoured; #1 is in gate 8.
- Odds were captured in the morning of 04-Oct; the HKJC pool will move before the jump.
- Historical sync was not re-run in this session (it had already been done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #1 HORSEPOWER (MC Win% 23.8%, MC Place% 53.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2 (37.5%), #8 (33.6%), #4 (33.1%), #9 (29.5%), #10 (28.4%), #13 (24.8%), #3 (24.6%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #3 METRO POWER (MC Place% 24.6%, Win odds 12)
  (#9 8.3, #10 9.4, #13 8.2 are in the 20–30% band but have Win odds < 10, so they are not replaceable)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
  #6 SMART OINK (Win odds 8.1, MC Place% 9.6%)
Action: #6 replaced #3 (1-for-1 swap)
Final legs: #2, #8, #4, #9, #10, #13, #6
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

STRATEGY B TICKET: 膽 #1 | 腳 #2, #8, #4, #9, #10, #13, #6
  1-2-8 (4.0%), 1-2-4 (3.8%), 1-8-4 (3.4%), 1-2-9 (2.9%), 1-2-10 (2.8%), 1-8-9 (2.6%),
  1-8-10 (2.5%), 1-4-9 (2.4%), 1-2-13 (2.4%), 1-4-10 (2.4%), 1-8-13 (2.1%), 1-4-13 (2.0%),
  1-9-10 (1.8%), 1-9-13 (1.5%), 1-10-13 (1.5%), 1-2-6 (0.6%), 1-8-6 (0.6%), 1-4-6 (0.5%),
  1-9-6 (0.4%), 1-10-6 (0.4%), 1-13-6 (0.3%)
  Est. hit chance (Harville, raw MC): about 41%
```

Comparison: both strategies use the same banker (#1) and six shared legs (#2, #8, #4, #9, #10, #13), with 21 combos at $210 each. The only difference is the 7th leg: Strategy A keeps #3 METRO POWER (Adj Place% 26.6%, boosted by an excuse), and Strategy B swaps it for the debutant market favourite #6 SMART OINK. Estimated hit rates are nearly identical (~40–41%). B is the hedge if the market's read on the unraced import is right.

═══════════════════════════════════════════════════════════
