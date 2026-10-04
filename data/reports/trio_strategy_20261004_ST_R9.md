# Trio (單T) Strategy — Sha Tin 2026-10-04 Race 9

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (11 starters ≥ 3, odds for 11/11, jockey + trainer stats loaded) | Going: Good | Scratchings: #3 RELIABLE PROFIT (withdrawn)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds + Q matrix look mis-parsed)
ODDS SOURCE: HKJC pool (tools/analyze-race.ts live fetch, captured ~10:35 HKT 04-Oct; meeting file data/odds/odds_20261004_ST.json captured 10:22 HKT)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R9 — Class 3 | 1650m | AWT (dirt) | Good | 11 runners — SHEK WAI KOK HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 37.5%) | POOL SIZE: 7 (Mode A 5 + #1 forced in by Rule 8 + #9 kept in by Rule 9)
MODE: A: Tight Pool (extended to 7)
BET STRUCTURE (A): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-04 | Going: Good | Surface: AWT
Target Race(s): R9 (Class 3 | 1650m AWT | 11 runners)
Scratchings: #3 RELIABLE PROFIT (withdrawn per SCMP; absent from HKJC card and odds)
Odds coverage: 11 horses with odds (HKJC win; place estimated from win by the tool)
SCMP data: ⚠️ partial
Form gaps: none critical. #12 QUANTUM LEGEND has only 4 local starts and is trying dirt for the first time. #8 BLOSSOMY has 7 starts (banker-eligible).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 8 | BLOSSOMY | 34.5% | 68.2% | 4.9 | ✅ | ✅ | 1/6/1/9/10/7 | ★ 膽 (Banker) | 8-12: 10.6% (9.4) |
| 12 | QUANTUM LEGEND | 12.6% | 39.7% | 6.2 | ✅ | ✅ | 6/8/6/9 | 腳 (Leg) | 8-12: 10.6% (9.4) |
| 7 | KEEFY | 12.2% | 35.2% | 13 | ✅ | ❌ | 9/8/8/11/8/5 | 腳 (Leg) | 7-8: 9.2% (10.9) |
| 4 | THRIVING BROTHERS | 9.8% | 33.0% | 7.6 | ✅ | ✅ | 3/1/12/6/2/2 | 腳 (Leg) | 4-8: 8.0% (12.5) |
| 2 | CORLEONE | 9.7% | 32.8% | 13 | ✅ | ❌ | 9/8/1/2/1/1 | 腳 (Leg) | 2-8: 7.8% (12.8) |
| 9 | KING DANCE | 5.4% | 21.7% | 13 | ✅ | ❌ | 14/1/1/6/1/6 | — (replaced by #5) | 8-9: 4.4% (22.8) |
| 1 | DRAGON AIR FORCE | 5.0% | 19.4% | 12 | ❌ | ❌ | 14/12/8/8/11/2 | — | — |
| 10 | ALL ROUND WINNER | 3.5% | 15.5% | 19 | ❌ | ❌ | 7/6/8/7/3/1 | — | — |
| 6 | STORMI | 3.4% | 15.8% | 8.3 | ❌ | ✅ | 6/2/7/8/4/6 | 腳 (Leg) — added (Win-odds candidate) | — |
| 5 | NEZHA | 2.6% | 12.1% | 7.4 | ❌ | ✅ | 9/5/7/7/1/11 | 腳 (Leg) — replaced #9 | — |
| 11 | TURIN MASCOT | 1.3% | 6.6% | 9.1 | ❌ | ✅ | 3/6/9/8/10/11 | 腳 (Leg) — added (Win-odds candidate) | — |

Market: overround 22.9%, favourite bias +69.2%. MC and the market agree on #8 BLOSSOMY as favourite, but MC rates it much stronger (34.5% win vs ~17% implied at 4.9). The biggest disagreement is the market's 3rd–6th favourites: #5 NEZHA (7.4), #6 STORMI (8.3) and #11 TURIN MASCOT (9.1), which MC rates overvalued by 81%, 72% and 88%. MC prefers #7 KEEFY and #2 CORLEONE (both 13).

Finish-time projection (MC): #8 BLOSSOMY is fastest at 1:39.90, ahead of #2 CORLEONE (+0.42s), #7 KEEFY (+0.56s), and #1 and #4 (+0.84s). #12 QUANTUM LEGEND is +1.54s; its ranking comes from rating, jockey (Purton) and lightly-raced profile rather than speed figures.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 8 | BLOSSOMY | 34.5% | 68.2% | trial +2, +form +1 | trial +2, +form +1 | 37.5% | 71.2% | 4.9 | A Atzeni | 10 | 121 | Stalk / rally | +trial, +form | ★ 膽 (Banker) |
| 2 | 12 | QUANTUM LEGEND | 12.6% | 39.7% | excuses +2 | excuses +2 | 14.6% | 41.7% | 6.2 | Z Purton | 1 | 119 | Midfield | +excuses | 腳 (Leg) |
| 3 | 7 | KEEFY | 12.2% | 35.2% | excuses +2 | excuses +2 | 14.2% | 37.2% | 13 | H Y Yuen (-7) | 3 | 122 | Stalk (speed-tracking) | +excuses | 腳 (Leg) |
| 4 | 2 | CORLEONE | 9.7% | 32.8% | excuses +2, trial +2 | excuses +2, trial +2 | 13.7% | 36.8% | 13 | L Ferraris | 11 | 134 | Stalk (box seat) | +excuses, +trial | 腳 (Leg) |
| 5 | 4 | THRIVING BROTHERS | 9.8% | 33.0% | 0 | 0 | 9.8% | 33.0% | 7.6 | K Teetan | 9 | 127 | Midfield | — | 腳 (Leg) |
| 6 | 1 | DRAGON AIR FORCE | 5.0% | 19.4% | trial +2 | trial +2 | 7.0% | 21.4% | 12 | M Chadwick | 7 | 135 | Midfield | +trial (blinkers) | 腳 (Leg) |
| 7 | 6 | STORMI | 3.4% | 15.8% | excuses +2 | excuses +2 | 5.4% | 17.8% | 8.3 | C L Chau (-2) | 6 | 123 | Front | +excuses | — |
| 8 | 5 | NEZHA | 2.6% | 12.1% | excuses +2 | excuses +2 | 4.6% | 14.1% | 7.4 | J Orman | 8 | 123 | Midfield / closer | +excuses | — |
| 9 | 10 | ALL ROUND WINNER | 3.5% | 15.5% | 0 | 0 | 3.5% | 15.5% | 19 | H Bentley | 4 | 120 | On-pace | — | — |
| 10 | 11 | TURIN MASCOT | 1.3% | 6.6% | +form +1 | +form +1 | 2.3% | 7.6% | 9.1 | M L Yeung | 2 | 120 | Closer | +form | — |
| 11 | 9 | KING DANCE | 5.4% | 21.7% | -perf −2, -injury30d −3 | -perf −2, -injury30d −4 | 0.4% | 15.7% | 13 | C Y Ho | 5 | 121 | Stalk | -perf, -injury30d | 腳 (Leg, Rule 9) |

Factor labels: excuses +2 (steadied/crowded/held up), trial +2, +form +1 (rallied/improved/fast-finishing), -perf −2 (stewards: unacceptable performance), -injury30d −3 win / −4 place. Caps are ±8 win / ±10 place, and none were reached. Banker eligibility: #8 has 7 starts, so it is eligible.

SCMP adjustments applied:
- **#8 BLOSSOMY**: "Did win a recent Valley 1,700m trial", so trial +2. It rallied for sixth and then won after a dream run in its latest start, so +form +1. Star Form also says "Gate is tricky" (draw 10). That has no line in the adjustment table, so it is noted as a caveat and not scored.
- **#12 QUANTUM LEGEND**: briefly held up approaching 350m and "had difficulty obtaining clear running" from 250m to 200m, so excuses +2.
- **#7 KEEFY**: "Leaving 300M steadied when crowded", so excuses +2. It is an 8yo, but SCMP shows no "eight years of age or above" vet entry, so no -age penalty (see caveats).
- **#2 CORLEONE**: steadied near 500m and "unable to avoid another runner's heels, could not be fully tested", so excuses +2. "Did win a turf trial", so trial +2.
- **#1 DRAGON AIR FORCE**: "wasn't beaten far when third to My Wish in his latest trial"; "Did trial fine wearing blinkers and gets preferred surface". Trial +2.
- **#6 STORMI**: crossed and made contact near 1400m and was briefly held up on the home turn, so excuses +2.
- **#5 NEZHA**: steadied approaching 350m, so excuses +2.
- **#11 TURIN MASCOT**: "fast-finishing third" latest for its new trainer, so +form +1.
- **#9 KING DANCE**: pulled up latest and stewards called the performance "unacceptable", so -perf −2. Vet: "27/06/2026 Rider concerned horse's action… (passed on 10/09/2026)". That pass was 24 days before the race (<30 days), so -injury30d −3 win / −4 place.

Reasoning: The race is a Class 3 1650m dirt handicap. #8 BLOSSOMY is the clear MC top pick (rating 66 vs 60 next, 34.5% win), the market favourite and the fastest on projected time. It is a dirt 1,650m winner, and it rises in class off a Valley win while carrying 8lb less, with a recent trial win. The second tier is tightly bunched at 33–42% Adj Place%: #12 (Purton, unexposed, trouble last time), #7 (veteran placegetter, crowded latest), #2 (dual-trip winner with excuses and a trial win) and #4 (consistent placer, 2-2 before the last two runs). Pace: #6 STORMI is the natural leader and #10 races prominently, so expect an even tempo. That suits stalkers #8, #2 and #7.

## TRIO POOL (Strategy A, any order)

```
POOL: #8, #12, #7, #2, #4, #1, #9
MODE: A (Dominant, #8 Adj Win% 37.5% ≥ 35%) | POOL SIZE: 7
  Mode A default = banker + 4 by Adj Place% (#12 41.7, #7 37.2, #2 36.8, #4 33.0)
  Must-include (Adj Place% ≥ 25%): #8, #12, #7, #2, #4 — all included
  #1 added: Adj Place% 21.4% ≥ 20% must-include (Rule 8)
  #9 added: Rule 9. Raw MC Place% is 21.7% (≥ 20%), and only the negative flags (-perf, -injury30d)
            push it below the threshold. It is still 13 in the market (≤ 15), so it is not hard-excluded.

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #8 BLOSSOMY (Adj Win% 37.5%, Adj Place% 71.2%) ← locked in every combo
腳 (Legs):  #12, #7, #2, #4, #1, #9
雙膽拖 check: 2nd-ranked #12 Adj Place% 41.7% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #8, #12, #7 | 6.9% | $144 per $10 |
| 2 | #8, #12, #2 | 6.6% | $151 per $10 |
| 3 | #8, #7, #2 | 6.4% | $156 per $10 |
| 4 | #8, #12, #4 | 4.5% | $220 per $10 |
| 5 | #8, #7, #4 | 4.4% | $227 per $10 |
| 6 | #8, #2, #4 | 4.2% | $237 per $10 |
| 7 | #8, #12, #1 | 3.2% | $317 per $10 |
| 8 | #8, #7, #1 | 3.1% | $328 per $10 |
| 9 | #8, #2, #1 | 2.9% | $342 per $10 |
| 10 | #8, #4, #1 | 2.0% | $500 per $10 |
| 11–15 | #8 + #9 with #12 / #7 / #2 / #4 / #1 | 0.1–0.2% each | — |

Estimated chance that the Strategy A ticket hits (sum of the 15 combos): about 45%. Harville from win% tends to overstate how concentrated the finish is, so treat this as an upper bound. The five #9 combos add almost nothing on adjusted numbers (#9 Adj Win% 0.4%). They are there only for rule compliance and to cover the market's view.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TICKET: 膽 #8 | 腳 #12, #7, #2, #4, #1, #9
  8-12-7, 8-12-2, 8-7-2, 8-12-4, 8-7-4, 8-2-4, 8-12-1, 8-7-1, 8-2-1, 8-4-1,
  8-12-9, 8-7-9, 8-2-9, 8-4-9, 8-1-9
```

Value note: #8 is a 4.9 favourite, not an odds-on one, so even the banker combos should pay reasonably. The value sits in combos with #7 KEEFY and #2 CORLEONE (both 13), which MC rates well above their market price.

PASS CONDITIONS:
- If #8 BLOSSOMY (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the track is changed or the race is transferred off the AWT → re-run the MC (all form signals here are dirt-specific).
- If #8 drifts beyond ~8 in late betting → reconsider. A big drift on a banker drawn wide is a warning sign.

CONFIDENCE: MEDIUM. The race is Dominant (37.5% top horse) and MC, market and speed figures all agree on the banker. But the banker is drawn 10 ("gate is tricky") and stepping up from Class 4, and the support cast is bunched (33–42% place).

CAVEATS:
- SCMP is partial. Win odds broadly match HKJC (#8 6 vs 4.9, #12 5.2 vs 6.2), but SCMP Place odds are equal to or above Win odds for most runners, and Q figures (e.g. 1-12 = 1) are clearly mis-parsed. The Q/QP cross-reference was not used.
- #8 BLOSSOMY: draw 10 is flagged "tricky" by SCMP and it rises from Class 4 to Class 3. MC does not model draw bias heavily.
- #7 KEEFY is an 8yo in a Class 3 race, but SCMP's vet panel shows no age entry, so the -age −2 rule was not triggered. Had it applied, #7's Adj Win% would be 12.2% (rank 4), and the pool would be unchanged.
- #12 QUANTUM LEGEND tries dirt for the first time with only 4 local starts. Its MC rating rests on limited form.
- The MC scraper log printed "distance=1200m" while parsing, but the saved race card, MC header and SCMP all confirm 1650m AWT. The simulation ran at 1650m.
- Market favourites #5 (7.4), #6 (8.3) and #11 (9.1) are outside Strategy A on threshold rules (Adj Place% 14.1%, 17.8%, 7.6%). Strategy B covers all three. This is a known pool-miss risk for A.
- Odds were captured ~10:35 HKT; the HKJC pool will move before the jump.
- Historical sync was not re-run in this session (it had already been done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #8 BLOSSOMY (MC Win% 34.5%, MC Place% 68.2%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #12 (39.7%), #7 (35.2%), #4 (33.0%), #2 (32.8%), #9 (21.7%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #9 KING DANCE (MC Place% 21.7%, Win odds 13)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #5 NEZHA (Win odds 7.4, MC Place% 12.1%)
  #6 STORMI (Win odds 8.3, MC Place% 15.8%)
  #11 TURIN MASCOT (Win odds 9.1, MC Place% 6.6%)
Action: #5 replaced #9 (1-for-1 swap). There was then no replaceable leg left
        (#12, #7, #4, #2 are all > 30%), so #6 and #11 were added directly.
Final legs: #12, #7, #4, #2, #5, #6, #11
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

STRATEGY B TICKET: 膽 #8 | 腳 #12, #7, #4, #2, #5, #6, #11
  8-12-7 (6.9%), 8-12-4 (5.4%), 8-12-2 (5.3%), 8-7-4 (5.2%), 8-7-2 (5.1%), 8-4-2 (4.0%),
  8-12-6 (1.7%), 8-7-6 (1.7%), 8-12-5 (1.3%), 8-4-6 (1.3%), 8-2-6 (1.3%), 8-7-5 (1.3%),
  8-4-5 (1.0%), 8-2-5 (1.0%), 8-12-11 (0.7%), 8-7-11 (0.6%), 8-4-11 (0.5%), 8-2-11 (0.5%),
  8-5-6 (0.3%), 8-6-11 (0.2%), 8-5-11 (0.1%)
  Est. hit chance (Harville, raw MC): about 45%
```

Comparison: both strategies use the same banker (#8) and the same four core legs (#12, #7, #2, #4). Strategy A adds #1 (trial and Rule 8) and #9 (Rule 9) for 15 combos at $150. Strategy B swaps #9 for the market's #5 and adds #6 and #11, for 21 combos at $210. The estimated hit rates are nearly identical (~45%), because MC rates the extra market horses low. B costs $60 more to cover the three mid-priced favourites that MC calls overvalued.

═══════════════════════════════════════════════════════════
