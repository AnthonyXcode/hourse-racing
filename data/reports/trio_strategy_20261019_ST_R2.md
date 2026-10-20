# Trio (單T) Strategy — Sha Tin 2026-10-19 Race 2

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, win odds for 14/14, 14 jockey + 14 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --use-saved --hide-actual --bankroll 10000 --kelly 0.35 --min-edge 5)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard/2 now shows the 21-Oct Happy Valley card)
ODDS SOURCE: HKJC final starting prices (SP) stored in data/racecards/racecard_20261019_ST_R2.json, as printed/used by analyze-race.ts
             SCMP odds: ❌ unavailable | HKJC live: ❌ no longer available (retrospective)

RACE: R2 — Class 4 | 1400m | Turf | Good | 14 runners — SUN CHUI HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 43.6%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
BET STRUCTURE (B): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-19 | Going: Good | Surface: Turf
Target Race(s): R2 (Class 4 | 1400m | 14 runners)
Scratchings: none
Odds coverage: 14 horses with HKJC win odds (final SP; place odds estimated by the tool from win odds)
SCMP data: ❌ unavailable (retrospective run)
Form gaps: #4 ISLAND HIGHFLYER, #5 LEAN GENERAL, #7 SHANNON GLOW have 0 form records in the snapshot
           (MC treats them as debut/no-form; #5 and #7 have career prize money, so they have probably raced
           before and their form is missing from the snapshot). #6 PEGASUS ELITE has only 1 run.
           Layoff: #13 ILLUMINOUS last ran 09-May (163 days). #10 INVICTUS has 2 runs at the trip; #9 JOKER ORBIT has 0 (all 1200m).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds (SP) | Place%>20% | Win odds<10 | Form (last 6, latest first) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|---------------|------------|-------------|-----------------------------|-------------------|--------------------------|
| 10 | INVICTUS | 43.6% | 76.0% | 4.4 | ✅ | ✅ | 4/4/4/3/7 | ★ 膽 (Banker) | 9-10: 13.7% (7.3) |
| 9 | JOKER ORBIT | 13.2% | 42.5% | 45 | ✅ | ❌ | 6/5/11/4/7/11 | 腳 (Leg) | 9-10: 13.7% (7.3) |
| 2 | CHILL PARTNERS | 11.4% | 38.1% | 16 | ✅ | ❌ | 3/13/12/12/14/1 | 腳 (Leg) | 2-10: 11.9% (8.4) |
| 8 | GHORGAN | 8.9% | 33.4% | 2.3 | ✅ | ✅ | 3/9/8/5/6/12 | 腳 (Leg) | 8-10: 10.3% (9.7) |
| 11 | SHOTGUN | 8.5% | 32.6% | 3.7 | ✅ | ✅ | 3/7/13/3/4/1 | 腳 (Leg) | 10-11: 9.6% (10.4) |
| 3 | POSITIVE SMILE | 4.0% | 17.7% | 33 | ❌ | ❌ | 9/9/7/11/3/7 | — | 3-10: 4.5% (22.4) |
| 6 | PEGASUS ELITE | 3.0% | 15.6% | 16 | ❌ | ❌ | 10 | — | — |
| 4 | ISLAND HIGHFLYER | 2.3% | 12.0% | 89 | ❌ | ❌ | — (no form) | — | — |
| 7 | SHANNON GLOW | 2.1% | 12.5% | 34 | ❌ | ❌ | — (no form) | — | — |
| 12 | TRENDY RUSH | 1.8% | 10.3% | 22 | ❌ | ❌ | 6/2/8/7/10/8 | — | — |
| 5 | LEAN GENERAL | 0.7% | 4.9% | 71 | ❌ | ❌ | — (no form) | — | — |
| 14 | HEALTHY PONY | 0.2% | 1.6% | 193 | ❌ | ❌ | 9/11/13/6/11/14 | — | — |
| 13 | ILLUMINOUS | 0.2% | 1.6% | 79 | ❌ | ❌ | 12/3/10/14/12/14 | — | — |
| 1 | TRUE BROTHERS | 0.1% | 1.3% | 123 | ❌ | ❌ | 13/12/11/8/14 | — | — |

Market: overround 23.6%. The market makes #8 GHORGAN (2.3) and #11 SHOTGUN (3.7) the clear top two, with #10 INVICTUS (4.4) third choice. MC disagrees: it puts #10 INVICTUS well clear (rating 70, 7 points ahead of the next horse; 43.6% win / 76.0% place) and has #8 and #11 only 4th and 5th (~9% win each). The biggest overlay is #9 JOKER ORBIT at 45 (13.2% win, 42.5% place; the tool flags a +101% edge on the Place bet), and #2 CHILL PARTNERS at 16 is also rated above its price. The tool recommends Place bets on #9 and #10. The 4 runners from #6 down to #12 are sparse-form horses MC cannot rate well. The fastest projected time is #3 POSITIVE SMILE (1:22.23, but from gate 14), then #2, #10 and #9.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

SCMP was unavailable, so no 3c adjustments were applied. All factors are `0` and Adj% = MC%.

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds (SP) | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|-----------|--------|------|----|-------|------------|------|
| 1 | 10 | INVICTUS | 43.6% | 76.0% | 0 | 0 | 43.6% | 76.0% | 4.4 | Z Purton | 3 | 128 | — (n/a) | n/a | ★ 膽 (Banker) |
| 2 | 9 | JOKER ORBIT | 13.2% | 42.5% | 0 | 0 | 13.2% | 42.5% | 45 | E C W Wong | 2 | 126 | — | n/a | 腳 (Leg) |
| 3 | 2 | CHILL PARTNERS | 11.4% | 38.1% | 0 | 0 | 11.4% | 38.1% | 16 | K C Leung | 5 | 134 | — | n/a | 腳 (Leg) |
| 4 | 8 | GHORGAN | 8.9% | 33.4% | 0 | 0 | 8.9% | 33.4% | 2.3 | A Atzeni | 4 | 129 | — | n/a | 腳 (Leg) |
| 5 | 11 | SHOTGUN | 8.5% | 32.6% | 0 | 0 | 8.5% | 32.6% | 3.7 | M F Poon | 1 | 128 | — | n/a | 腳 (Leg) |
| 6 | 3 | POSITIVE SMILE | 4.0% | 17.7% | 0 | 0 | 4.0% | 17.7% | 33 | M L Yeung | 14 | 132 | — | n/a | — |
| 7 | 6 | PEGASUS ELITE | 3.0% | 15.6% | 0 | 0 | 3.0% | 15.6% | 16 | L Ferraris | 6 | 131 | — | n/a | — |
| 8 | 4 | ISLAND HIGHFLYER | 2.3% | 12.0% | 0 | 0 | 2.3% | 12.0% | 89 | C Y Ho | 13 | 131 | — | n/a | — |
| 9 | 7 | SHANNON GLOW | 2.1% | 12.5% | 0 | 0 | 2.1% | 12.5% | 34 | C L Chau | 12 | 129 | — | n/a | — |
| 10 | 12 | TRENDY RUSH | 1.8% | 10.3% | 0 | 0 | 1.8% | 10.3% | 22 | B Avdulla | 11 | 127 | — | n/a | — |
| 11 | 5 | LEAN GENERAL | 0.7% | 4.9% | 0 | 0 | 0.7% | 4.9% | 71 | R Kingscote | 8 | 131 | — | n/a | — |
| 12 | 14 | HEALTHY PONY | 0.2% | 1.6% | 0 | 0 | 0.2% | 1.6% | 193 | Y L Chung | 9 | 117 | — | n/a | — |
| 13 | 13 | ILLUMINOUS | 0.2% | 1.6% | 0 | 0 | 0.2% | 1.6% | 79 | M Chadwick | 10 | 121 | — | n/a | — |
| 14 | 1 | TRUE BROTHERS | 0.1% | 1.3% | 0 | 0 | 0.1% | 1.3% | 123 | P N Wong | 7 | 128 | — | n/a | — |

Running style is not given: it comes from SCMP Star Form, which was unavailable. Banker eligibility: #10 INVICTUS has 5 HK starts (≥ 2), so it is eligible.

Reasoning: #10 INVICTUS is a clear MC #1 (rating 70, 43.6% win / 76.0% place) with Z Purton (22% from 102 rides in the historical data) and gate 3. Its form is consistent (4/4/4/3/7), though it is still a maiden after 5 starts. Adj Win% 43.6% ≥ 35% makes the race **Dominant → Mode A** (5-horse pool): banker + the next 4 by Adj Place%: #9 (42.5), #2 (38.1), #8 (33.4), #11 (32.6). These 4 are also exactly the horses at Adj Place% ≥ 25% (must-include) and ≥ 20% (Rule 8), so the pool needs no expansion. Rule 9 (no hard exclusion at odds ≤ 15) is satisfied: the only runners at 15 or shorter are #8 (2.3), #11 (3.7) and #10 (4.4), and all three are in the pool. #2 and #6 at 16 are just over the line; #6 has 15.6% Adj Place%, so it stays out. The 2nd-ranked horse #9 has Adj Place% 42.5% < 63%, so it is a single-banker **膽拖** (not 雙膽拖). All five pool horses draw 1–5, so each can get a handy, economical trip. The main outside threat in the MC is #3 POSITIVE SMILE (fastest projected time, but gate 14 and 17.7% place).

## TRIO POOL (Strategy A, any order)

```
POOL: #10, #9, #2, #8, #11
MODE: A (Dominant, #10 Adj Win% 43.6% ≥ 35%) | POOL SIZE: 5
  Banker + top 4 by Adj Place%: #10 (76.0), #9 (42.5), #2 (38.1), #8 (33.4), #11 (32.6)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #10 INVICTUS (Adj Win% 43.6%, Adj Place% 76.0%) ← locked in every combo
腳 (Legs):  #9, #2, #8, #11
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win% = MC Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds | In ticket? |
|------|--------------------|-----------|----------------|------------|
| 1 | #10, #9, #2 | 10.7% | $94 per $10 | ✅ |
| 2 | #10, #9, #8 | 8.0% | $124 per $10 | ✅ |
| 3 | #10, #9, #11 | 7.6% | $131 per $10 | ✅ |
| 4 | #10, #2, #8 | 6.8% | $148 per $10 | ✅ |
| 5 | #10, #2, #11 | 6.4% | $156 per $10 | ✅ |
| 6 | #10, #8, #11 | 4.8% | $207 per $10 | ✅ |
| 7 | #10, #9, #3 | 3.4% | $294 per $10 | ❌ |
| 8 | #10, #2, #3 | 2.9% | $350 per $10 | ❌ |

Estimated chance the ticket hits (sum of the 6 combos, Harville on MC Win%): about 44%.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6 (膽拖: C(4,2), 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

TICKET: 膽 #10 | 腳 #9, #2, #8, #11
  10-9-2, 10-9-8, 10-9-11, 10-2-8, 10-2-11, 10-8-11

TOP COMBINATIONS (highest value):
  10-9-2 (10.7%), 10-9-8 (8.0%), 10-9-11 (7.6%), 10-2-8 (6.8%), 10-2-11 (6.4%), 10-8-11 (4.8%)
```

Value note: the banker is the market's 3rd choice (4.4), not the favourite. Combinations that include #9 (45) and/or #2 (16) and leave out one of the two market favourites #8/#11 should pay well above the model's fair odds. 10-8-11 (the three market leaders) will pay the least.

PASS CONDITIONS:
- If #10 INVICTUS (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding/Soft or worse → re-run the MC.

CONFIDENCE: MEDIUM. MC has a clear #1 (76% place, 7-point rating gap) and the pool covers the market's top two as well. But the banker is still a maiden (best result 3rd), it is not the market's choice, and SCMP form checks could not be done.

CAVEATS:
- **Retrospective run**: generated 2026-10-20, blind to results. Odds are **final SP**, not the morning odds a pre-race run would have used. In particular, the Strategy B Win-odds checks use SP.
- **SCMP unavailable (retrospective run)**: the SCMP racecard page now shows the 21-Oct Happy Valley card. No Star Form / TIR / Vet / Trackwork / QP-Q checks were done, so Strategy A has no SCMP adjustments (Adj% = raw MC) and no running-style read.
- **MC vs market disagreement**: MC rates the market favourites #8 GHORGAN (2.3) and #11 SHOTGUN (3.7) only ~9% win. Both are in the pool as legs, but the ticket depends on MC being right about #10.
- **#9 JOKER ORBIT at 45** is MC's 2nd pick. All its form is at 1200m (0 runs at 1400m), and its 42.5% place rating is far above the market's view.
- **Sparse form**: #4, #5 and #7 have no form records in the snapshot, and #6 has only 1 run. MC rates them on rating/jockey/trainer only and may underrate them. #5 and #7 have career prize money, which suggests they have past form that is missing from the snapshot.
- Historical sync, odds fetch and racecard scrape were not re-run (data prepared in advance per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #10 INVICTUS (MC Win% 43.6%, MC Place% 76.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #9 (42.5%), #2 (38.1%), #8 (33.4%), #11 (32.6%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (every primary leg is above 30%)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
  (The only sub-10 horses, #8 2.3, #11 3.7 and #10 4.4, are already the banker or primary legs.
   The shortest-priced non-pool runner is #6 at 16.)
Action: no replacement / no addition
Final legs: #9, #2, #8, #11
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 膽 #10 | 腳 #9, #2, #8, #11
  10-9-2, 10-9-8, 10-9-11, 10-2-8, 10-2-11, 10-8-11

Top combos (Harville, raw MC): 10-9-2 10.7% | 10-9-8 8.0% | 10-9-11 7.6% | 10-2-8 6.8% | 10-2-11 6.4%
Est. ticket hit chance (sum of 6 combos, raw MC): ~44%
```

Comparison: Strategy A and Strategy B give the **same ticket** (膽 #10 + 腳 #9, #2, #8, #11; 6 combos / $60). With no SCMP data, Strategy A's adjusted ranking equals raw MC. The Mode A pool (banker + top 4 by Place%) also happens to equal Strategy B's Place% > 20% set, and no Win-odds swap applies.

```
═══════════════════════════════════════════════════════════
```
