# Trio (單T) Strategy — Sha Tin 2026-10-11 Race 9

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, 12 jockey + 12 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds look mis-parsed; no Q/QP matrix shown)
ODDS SOURCE: HKJC pool (data/odds/odds_20261011_ST.json, captured 11:24 HKT 11-Oct; same win odds used by analyze-race.ts)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R9 — Class 3 | 1200m | Turf | Good | 12 runners — SAN TIN HANDICAP (4:35pm)
CLASSIFICATION: Dominant (top Adj Win% 39.5%) | POOL SIZE: 7
MODE: A: Tight Pool (5), expanded to 7 under Rule 8 (Adj Place% ≥ 20% must be in pool)
BET STRUCTURE (A): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
BET STRUCTURE (B): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: Turf
Target Race(s): R9 (Class 3 | 1200m | 12 runners)
Scratchings: none (reserves LIFELINE EXPRESS and GLITTERING LEGEND are not in the field)
Odds coverage: 12 horses with HKJC win and place odds
SCMP data: ⚠️ partial
Form gaps: 10/12 horses enriched with HK form.
           #5 ON THE WAY and #9 SILK MASTER are local debutants (Australian imports, 0 HK starts), so MC has no form for them.
           #5 has 3+ Australian starts (2 wins). #9 has 1 Australian start (1 win).
           #8 MEGASTAR HEART (3 starts) and #11 SHANGHAI WARRIOR (2 starts) have sparse form.
           Layoffs: #1 SWIFT ASCEND last ran 08-Mar (217 days, fetlock injury). #5 has been unraced for 12 months.
           #3 HAPPY INDEX, #8 and #10 last ran 27-Jun (106 days).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 3 | HAPPY INDEX | 35.5% | 67.9% | 4.1 | ✅ | ✅ | 6/9/9/3/2/1 | ★ 膽 (Banker) | 3-8: 11.5% (8.7) |
| 8 | MEGASTAR HEART | 15.2% | 42.9% | 7.9 | ✅ | ✅ | 5/10/8 | 腳 (Leg) | 3-8: 11.5% (8.7) |
| 4 | COOL BOY | 13.9% | 42.3% | 7.6 | ✅ | ✅ | 6/5/4/4/1/1 | 腳 (Leg) | 3-4: 11.0% (9.1) |
| 7 | EVER LUCK | 10.0% | 34.8% | 29 | ✅ | ❌ | 13/9/10/1/7/3 | 腳 (Leg) | 3-7: 8.8% (11.4) |
| 2 | GALACTIC VOYAGE | 6.3% | 25.4% | 10 | ✅ | ❌ | 12/3/4/10/4/5 | 腳 (Leg) | 2-3: 6.0% (16.8) |
| 6 | ELITE GOLF | 6.1% | 24.2% | 12 | ✅ | ❌ | 8/1/2/1/5 | — (replaced by #10) | 3-6: 5.4% (18.5) |
| 1 | SWIFT ASCEND | 5.2% | 21.0% | 9.8 | ✅ | ✅ | 9/4/5/2/3/5 | 腳 (Leg) | — |
| 9 | SILK MASTER | 2.3% | 10.8% | 17 | ❌ | ❌ | — (HK debut) | — | — |
| 10 | EMBRACE ABERDEEN | 1.7% | 9.7% | 4.4 | ❌ | ✅ | 2/9/6/8/1/5 | 腳 (Leg, replacement for #6) | — (replacement candidate) |
| 5 | ON THE WAY | 1.3% | 7.1% | 28 | ❌ | ❌ | — (HK debut) | — | — |
| 11 | SHANGHAI WARRIOR | 1.2% | 7.2% | 24 | ❌ | ❌ | 6/10 | — | — |
| 12 | ENDURANCE EXPRESS | 1.1% | 6.7% | 21 | ❌ | ❌ | 5/12/8/4 | — | — |

Market: overround 22.5%. MC agrees with the market on the favourite, #3 HAPPY INDEX (4.1). MC gives it 35.5% win and 67.9% place, and it has the fastest projected time (1:08.84, 4.2L clear). The big disagreement is #10 EMBRACE ABERDEEN, the 4.4 second favourite. MC rates it only 9th (1.7% win), and the tool flags it as "overvalued by 92%". MC's biggest overlay is #7 EVER LUCK at 29 (34.8% place, "undervalued by 191%"). #8 MEGASTAR HEART and #4 COOL BOY are a clear 2nd/3rd tier (about 42–43% place each). The top MC quinellas are 3-8 (11.5%) and 3-4 (11.0%).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 3 | HAPPY INDEX | 35.5% | 67.9% | trial +2, excuses +2 | trial +2, excuses +2 | 39.5% | 71.9% | 4.1 | C Y Ho | 2 | 131 | Stalk (box seat) | +trial, +excuses | ★ 膽 (Banker) |
| 2 | 8 | MEGASTAR HEART | 15.2% | 42.9% | trial +2 | trial +2 | 17.2% | 44.9% | 7.9 | L Ferraris | 3 | 123 | Front/On-pace | +trial | 腳 (Leg) |
| 3 | 4 | COOL BOY | 13.9% | 42.3% | excuses +2 | excuses +2 | 15.9% | 44.3% | 7.6 | A Badel | 5 | 128 | Midfield/Closer | +excuses | 腳 (Leg) |
| 4 | 2 | GALACTIC VOYAGE | 6.3% | 25.4% | excuses +2 | excuses +2 | 8.3% | 27.4% | 10 | C L Chau (-2) | 9 | 134 | Closer | +excuses | 腳 (Leg) |
| 5 | 6 | ELITE GOLF | 6.1% | 24.2% | trial +2 | trial +2 | 8.1% | 26.2% | 12 | H Bentley | 12 | 123 | Stalk (tracks speed) | +trial | 腳 (Leg) |
| 6 | 7 | EVER LUCK | 10.0% | 34.8% | -injury30d −3 | -injury30d −4 | 7.0% | 30.8% | 29 | L Hewitson | 1 | 123 | Front | -injury30d (heart) | 腳 (Leg) |
| 7 | 1 | SWIFT ASCEND | 5.2% | 21.0% | 0 | 0 | 5.2% | 21.0% | 9.8 | Z Purton | 8 | 135 | Closer | layoff (217d) | 腳 (Leg, Rule 8) |
| 8 | 10 | EMBRACE ABERDEEN | 1.7% | 9.7% | trial +2, +form +1 | trial +2, +form +1 | 4.7% | 12.7% | 4.4 | A Atzeni | 6 | 119 | Stalk | +trial, +form | — |
| 9 | 9 | SILK MASTER | 2.3% | 10.8% | trial +2 | trial +2 | 4.3% | 12.8% | 17 | K Teetan | 10 | 121 | — (debut) | +trial | — |
| 10 | 11 | SHANGHAI WARRIOR | 1.2% | 7.2% | 0 | 0 | 1.2% | 7.2% | 24 | M F Poon | 11 | 118 | On-pace | — | — |
| 11 | 12 | ENDURANCE EXPRESS | 1.1% | 6.7% | 0 | 0 | 1.1% | 6.7% | 21 | M Chadwick | 4 | 116 | Front | — | — |
| 12 | 5 | ON THE WAY | 1.3% | 7.1% | -injury30d −3 | -injury30d −4 | 0.0% | 3.1% | 28 | H T Mo (-2) | 7 | 126 | — (debut) | -injury30d (bled/heart) | — |

Factor labels: trial +2, +form +1 (improved/rallied in a race), excuses +2 (wide trip/steadied/hampered), -injury30d −3 win / −4 place. Caps are ±8 win / ±10 place, and none were reached. #5's Adj Win% was floored at 0%. Banker eligibility: #3 has 7 HK starts, so it is eligible.

SCMP adjustments applied:
- **#3 HAPPY INDEX**: Star Form "Comes into this off back-to-back trial wins", so trial +2. TIR from its last run, "raced wide without cover; gave ground in home straight", plus Star Form "ground-covering sixth", is a wide-trip excuse, so excuses +2. It was a box-seat winner over this course and distance in January.
- **#8 MEGASTAR HEART**: "Did win a Conghua trial last month", so trial +2. TIR "hampered near 50m" was minor and late, so no excuses credit.
- **#4 COOL BOY**: TIR "bumped... steadied... held up from home turn to 350m", and Star Form "wide trip from midfield" at 1,400m, so excuses +2. "Shifted out at start, bumped" is a single note, so no -barrier penalty. It is back to 1,200m, where it has three straight wins.
- **#2 GALACTIC VOYAGE**: TIR "Hampered near 400m, eased at 250m" in the 1,600m flop, so excuses +2. "Rallied for third" was two runs back. I did not double-count it as +form.
- **#6 ELITE GOLF**: "Stayed on well for second latest of two trials", so trial +2. Gate 12 of 12 is a reducer only (Rule 15), and I applied no explicit penalty because MC already uses the draw.
- **#7 EVER LUCK**: Vet "Heart condition found after race" on 13-Sep (28 days ago, < 30). The follow-up assessment was clear, but I scored it as -injury30d −3 win / −4 place. One "jumped only fairly, bumped" note, so no -barrier penalty.
- **#1 SWIFT ASCEND**: The fetlock injury passed 28-Aug (44 days ago), which is outside the 30-day window, so no penalty. "Moved fine in both trials" is not strong enough for trial +2. One "bumped on jumping" note, so no -barrier penalty. The 217-day layoff is a caveat but does not change the score.
- **#10 EMBRACE ABERDEEN**: "Has strode out well to fill the frame in both trials", so trial +2. "Getting up a $53 second" last start counts as improving form, so +form +1. The keen/steadied TIR came in its last run, where it still ran 2nd, so no excuses credit.
- **#9 SILK MASTER**: Trackwork "Ran better than the bare result in his latest trial and is an interesting one on debut", so trial +2.
- **#5 ON THE WAY**: Vet "Bled both nostrils and heart irregularity... (passed 21/09/2026)", which is 20 days ago (< 30), so -injury30d −3 / −4. It has been unraced for 12 months.
- **#11, #12**: no scoring flags.

Reasoning: #3 HAPPY INDEX is a clear MC #1 (rating 66, a 5-point gap to the next horse). It has course-and-distance winning form (box-seat win on the ST 1,200m turf), a sharp inside gate (2), and back-to-back trial wins. Its last-start sixth came after a wide trip without cover. Adj Win% 39.5% makes the race Dominant, so Mode A applies. The base 5 is the banker + 4 by Adj Place%: #8 (44.9), #4 (44.3), #7 (30.8), #2 (27.4). Must-include (≥25%) adds #6 (26.2). Rule 8 (≥20%) adds #1 (21.0). That gives 7, the maximum pool. Rule 9 (negatively flagged horse at ≤15 odds) does not apply: the flagged horses are #7 (29) and #5 (28), and #7 is already in. **#10 EMBRACE ABERDEEN (4.4, second favourite) is excluded.** It has no negative flag, so Rule 9 does not protect it, and its Adj Place% is only 12.7%. This is the main structural risk on the ticket (see caveats). Pace: #7 (gate 1), #8 (gate 3) and #12 (gate 4) have early speed from inside gates. #3 should get a box seat behind them from gate 2. #4 and #2 are closers who suit a genuine tempo.

## TRIO POOL (Strategy A, any order)

```
POOL: #3, #8, #4, #7, #2, #6, #1
MODE: A (Dominant, #3 Adj Win% 39.5% ≥ 35%), expanded 5 → 7 under Rule 8 | POOL SIZE: 7
  Banker + top 4 by Adj Place%: #3 (71.9), #8 (44.9), #4 (44.3), #7 (30.8), #2 (27.4)
  + Must-include (Adj Place% ≥ 25%): #6 (26.2)
  + Rule 8 (Adj Place% ≥ 20%): #1 (21.0)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #3 HAPPY INDEX (Adj Win% 39.5%, Adj Place% 71.9%) ← locked in every combo
腳 (Legs):  #8, #4, #2, #6, #7, #1
雙膽拖 check: 2nd-ranked #8 Adj Place% 44.9% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #3, #8, #4 | 10.7% | $93 per $10 |
| 2 | #3, #8, #2 | 5.1% | $195 per $10 |
| 3 | #3, #8, #6 | 5.0% | $200 per $10 |
| 4 | #3, #4, #2 | 4.7% | $214 per $10 |
| 5 | #3, #4, #6 | 4.5% | $220 per $10 |
| 6 | #3, #8, #7 | 4.3% | $234 per $10 |
| 7 | #3, #4, #7 | 3.9% | $258 per $10 |
| 8 | #3, #8, #1 | 3.1% | $321 per $10 |
| 9 | #3, #4, #1 | 2.8% | $353 per $10 |
| 10 | #3, #2, #6 | 2.2% | $461 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 15 combos): about 54% on Adj Win%, or about 60% on raw MC.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TICKET: 膽 #3 | 腳 #8, #4, #2, #6, #7, #1
  3-8-4, 3-8-2, 3-8-6, 3-8-7, 3-8-1, 3-4-2, 3-4-6, 3-4-7, 3-4-1,
  3-2-6, 3-2-7, 3-2-1, 3-6-7, 3-6-1, 3-7-1

TOP COMBINATIONS (highest value):
  3-8-4 (10.7%), 3-8-2 (5.1%), 3-8-6 (5.0%), 3-4-2 (4.7%), 3-4-6 (4.5%), 3-8-7 (4.3%)
```

Value note: #3 is the 4.1 favourite, so 3-8-4 (all three in the top 4 of the market) will pay chalk. Value comes from combos with #7 (29) or #2/#6 (10–12). If #10 (4.4) misses the frame, as MC expects, the Trio pool loses a heavily backed horse and dividends on the remaining combos should improve.

PASS CONDITIONS:
- If #3 HAPPY INDEX (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding/Soft or worse → re-run the MC. #5 and #9 have their only wins on soft going overseas.
- If #3 drifts beyond ~8 in late betting (market losing faith in the banker) → consider PASS.

CONFIDENCE: MEDIUM. The banker is strong: MC 67.9% place, the market favourite, a course-and-distance winner with good trials and gate 2. But the 7-horse pool is wide, and the market's second favourite #10 is left out.

CAVEATS:
- **#10 EMBRACE ABERDEEN (4.4, 2nd favourite) is excluded from Strategy A.** MC rates it 1.7% win / 9.7% place, even though its last start was a 2nd in Class 3 at this course and distance and it has strong trials. This is the largest model-vs-market gap in the race. If MC is underrating it, the ticket's main hole is a 3-10-x or 10-x-y result. Strategy B does include #10.
- SCMP is partial. SCMP win odds broadly match HKJC (#3 4.3 vs 4.1, #10 5 vs 4.4, #4 6 vs 7.6, #8 8.1 vs 7.9, #1 11 vs 9.8, #2 11 vs 10). SCMP "Place" odds are near or above win odds (e.g. #1 11/10), so they look mis-parsed. No Q/QP matrix was shown, so a QP cross-reference was not possible.
- #5 ON THE WAY and #9 SILK MASTER have no HK form, so MC prices them from priors only (1.3% / 2.3% win). Both are Australian winners. #9 has a positive trackwork note.
- #7 EVER LUCK: the heart condition found 28 days ago (later assessment clear) was scored as -injury30d. This is a judgment call. Without it, #7 would be 10.0% / 34.8%, and it stays in the pool either way.
- #1 SWIFT ASCEND is back from a fetlock injury after 217 days. It is in the pool only through Rule 8 (21.0%).
- #8 MEGASTAR HEART has only 3 HK starts (sparse form). Its MC #2 rank partly rests on limited data.
- Odds were captured at 11:24 HKT on 11-Oct. The HKJC pool will move before the 4:35pm jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #3 HAPPY INDEX (MC Win% 35.5%, MC Place% 67.9%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #8 (42.9%), #4 (42.3%), #7 (34.8%), #2 (25.4%), #6 (24.2%), #1 (21.0%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #6 ELITE GOLF (MC Place% 24.2%, Win odds 12)
  (#2 is 25.4% at exactly 10, which is not > 10. #1 is 21.0% at 9.8.)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #10 EMBRACE ABERDEEN (Win odds 4.4, MC Place% 9.7%)
Action: #10 replaces #6 (the only replaceable leg, 1-for-1 swap)
Final legs: #8, #4, #7, #2, #1, #10
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #3 | 腳 #8, #4, #7, #2, #1, #10
  3-8-4, 3-8-7, 3-8-2, 3-8-1, 3-8-10, 3-4-7, 3-4-2, 3-4-1, 3-4-10,
  3-7-2, 3-7-1, 3-7-10, 3-2-1, 3-2-10, 3-1-10

Top combos (Harville, raw MC): 3-8-4 10.7% | 3-8-7 7.3% | 3-4-7 6.6% | 3-8-2 4.4% | 3-4-2 4.0%
Est. ticket hit chance (sum of 15 combos, raw MC): ~50%
```

Comparison: Both strategies use the same banker (#3), the same structure (1膽 + 6腳, 15 combos, $150), and share 5 of 6 legs (#8, #4, #7, #2, #1). The only difference is the 6th leg. Strategy A has #6 ELITE GOLF (Adj Place% 26.2% after trial +2). Strategy B has #10 EMBRACE ABERDEEN, brought in by the market rule (4.4 odds) in place of #6. Strategy B therefore covers the market's second favourite, which MC dislikes. Strategy A follows the model plus SCMP. The robustness check holds: using SCMP win odds instead of HKJC odds gives the same Strategy B ticket.

```
═══════════════════════════════════════════════════════════
```
