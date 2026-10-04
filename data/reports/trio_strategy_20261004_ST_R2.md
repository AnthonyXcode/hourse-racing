# Trio (單T) Strategy — Sha Tin 2026-10-04 Race 2

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, 14 jockey + 14 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all; 13/14 horses enriched with form)
SCMP DATA: ⚠️ Partial | Star Form/TIR/Vet/Trackwork parsed (tipster picks ignored); SCMP Win/Place columns unreliable (see caveats)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 10:22 HKT 04-Oct)
             SCMP odds: ⚠️ not usable (mis-parsed) | HKJC live: ✅ loaded

RACE: R2 KWOK SHUI HANDICAP — Class 4 | 1200m | Turf | Good | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 31.4%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 13 | KOL | 31.4% | 62.3% | 2.7 | ✅ | ✅ | 5 | ★ 膽 (Banker) | 3-13: 12.2% (8.2) |
| 3 | COPARTNER A I | 17.9% | 47.1% | 8.5 | ✅ | ✅ | 1 | 腳 (Leg) | 3-13: 12.2% (8.2) |
| 7 | SILVER SPURS | 13.1% | 39.2% | 20 | ✅ | ❌ | 10 | 腳 (Leg) | 7-13: 9.1% (11.0) |
| 9 | GOOD POWER | 7.8% | 26.2% | 54 | ✅ | ❌ | 2 | — (replaced out by #14) | 9-13: 5.6% (17.7) |
| 5 | LEAN ERA | 6.8% | 24.9% | 15 | ✅ | ❌ | 1 | — (replaced out by #2) | 5-13: 5.2% (19.3) |
| 14 | SAME TO YOU | 5.3% | 20.0% | 8.1 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 1 | TEN LOVES | 4.7% | 18.7% | 52 | ❌ | ❌ | 4 | — | — |
| 11 | TRENDY RUSH | 4.3% | 17.3% | 8.3 | ❌ | ✅ | 5 | 腳 (Leg) — added (no replaceable leg left) | — |
| 4 | FAITHFUL WARRIOR | 2.5% | 11.8% | 44 | ❌ | ❌ | 0 | — | — |
| 12 | E HOPEFUL | 1.8% | 8.6% | 30 | ❌ | ❌ | 5 | — | — |
| 6 | HAPPY SPECIAL | 1.5% | 7.5% | 15 | ❌ | ❌ | 1 | — | — |
| 10 | SHANDONG SPIRIT | 1.4% | 7.0% | 34 | ❌ | ❌ | 2 | — | — |
| 8 | SMILING SKY | 0.9% | 5.2% | 42 | ❌ | ❌ | 1 | — | — |
| 2 | WOLF COMING | 0.6% | 4.1% | 6.4 | ❌ | ✅ | 7 | 腳 (Leg) — replacement candidate | — |

Market: overround 21.9%, favourite bias −15.3%, longshot bias +52.8%. MC undervalues vs market: #9 (+323%), #7 (+162%), #1 (+146%). Big model/market disagreements: #2 WOLF COMING (2nd fav 6.4 vs 0.6% MC win), #14 SAME TO YOU (3rd fav 8.1) and #11 TRENDY RUSH (4th fav 8.3) all rated weakly by MC.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 13 | KOL | 31.4% | 62.3% | 0 | 0 | 31.4% | 62.3% | 2.7 | Z Purton | 2 | Stalk (speed-tracking) | — | ★ 膽 (Banker) |
| 2 | 3 | COPARTNER A I | 17.9% | 47.1% | excuses +2 | excuses +2 | 19.9% | 49.1% | 8.5 | C Y Ho | 11 | Stalk (box seat) | +excuses | 腳 (Leg) |
| 3 | 7 | SILVER SPURS | 13.1% | 39.2% | +form +1 | +form +1 | 14.1% | 40.2% | 20 | H Y Yuen (-7) | 10 | Front (wire-to-wire) | +form | 腳 (Leg) |
| 4 | 5 | LEAN ERA | 6.8% | 24.9% | excuses +2 | excuses +2 | 8.8% | 26.9% | 15 | C L Chau (-2) | 13 | Closer | +excuses | 腳 (Leg) |
| 5 | 9 | GOOD POWER | 7.8% | 26.2% | 0 | 0 | 7.8% | 26.2% | 54 | K C Leung | 14 | Midfield | — | 腳 (Leg) |
| 6 | 11 | TRENDY RUSH | 4.3% | 17.3% | excuses +2, +form +1 | excuses +2, +form +1 | 7.3% | 20.3% | 8.3 | B Avdulla | 1 | Closer (rallied) | +excuses, +form | — |
| 7 | 1 | TEN LOVES | 4.7% | 18.7% | excuses +2 | excuses +2 | 6.7% | 20.7% | 52 | R Kingscote | 7 | Front | +excuses (wide) | 腳 (Leg) |
| 8 | 14 | SAME TO YOU | 5.3% | 20.0% | 0 | 0 | 5.3% | 20.0% | 8.1 | A Badel | 8 | Closer | — | — |
| 9 | 12 | E HOPEFUL | 1.8% | 8.6% | excuses +2 | excuses +2 | 3.8% | 10.6% | 30 | H Bentley | 3 | Stalk | +excuses | — |
| 10 | 2 | WOLF COMING | 0.6% | 4.1% | trial +2, +form +1 | trial +2, +form +1 | 3.6% | 7.1% | 6.4 | L Hewitson | 6 | Closer | +trial, +form | — |
| 11 | 10 | SHANDONG SPIRIT | 1.4% | 7.0% | excuses +2 | excuses +2 | 3.4% | 9.0% | 34 | M F Poon | 4 | Closer | +excuses | — |
| 12 | 8 | SMILING SKY | 0.9% | 5.2% | excuses +2 | excuses +2 | 2.9% | 7.2% | 42 | M L Yeung | 9 | Back | +excuses | — |
| 13 | 6 | HAPPY SPECIAL | 1.5% | 7.5% | 0 | 0 | 1.5% | 7.5% | 15 | A Atzeni | 12 | Midfield | — | — |
| 14 | 4 | FAITHFUL WARRIOR | 2.5% | 11.8% | -injury30d −3 | -injury30d −4 | 0.0% (floored) | 7.8% | 44 | H T Mo (-2) | 5 | — (debut) | -injury30d | — |

Factor labels: excuses +2 (held up / hampered / crowded / wide last run), trial +2, +form +1 (rallied / made all / improved), -injury30d −3 win / −4 place (vet clearance <30 days: #4 struck head at barrier, passed 07/09/2026 = 27 days). Caps ±8 win / ±10 place — none hit. Adjusted figures are not re-normalised.

Reasoning: #13 KOL is MC #1 (31.4%) and clear market favourite (2.7), drawn 2 with Z Purton; resumed with a speed-tracking 4th when backed — banker eligible (5 starts). #3 COPARTNER A I (MC 17.9%, held up in the straight last time) is the main threat, and 3-13 is the top MC quinella (12.2%). #7 SILVER SPURS (MC 13.1% vs 20 odds, 7-lb claim, previous wire-to-wire ST 1200m winner) is the value leg. Mode B = top 3 by Adj Win% (#13, #3, #7) + next 3 by Adj Place% (#5 26.9%, #9 26.2%, #1 20.7%). Both Adj Place% ≥ 25% horses (#5, #9) are in the pool, so no expansion is needed. #11 (20.3%) and #14 (20.0%) miss the 6th place by small margins. #2 WOLF COMING (6.4 second favourite) has a positive trial but only 4.1% MC Place%. Pace: #7 and #1 likely lead and #13 tracks them, which suits the banker.

## TRIO POOL (Strategy A, any order)

```
POOL: #13, #3, #7, #5, #9, #1
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #13 KOL (Adj Win% 31.4%, Adj Place% 62.3%) ← locked in every combo
腳 (Legs): #3, #7, #5, #9, #1
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
(雙膽拖 not used: #3 Adj Place% 49.1% < 63%)
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds ($10) |
|------|--------------------|-----------|----------------------|
| 1 | #13, #3, #7 | 6.7% | $149 |
| 2 | #13, #3, #5 | 4.0% | $253 |
| 3 | #13, #3, #9 | 3.5% | $288 |
| 4 | #13, #3, #1 | 3.0% | $339 |
| 5 | #13, #7, #5 | 2.6% | $382 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 27.5%

TOP COMBINATIONS: 13-3-7 (6.7%), 13-3-5 (4.0%), 13-3-9 (3.5%), 13-3-1 (3.0%), 13-7-5 (2.6%), 13-7-9 (2.3%)

PASS CONDITIONS:
- If #13 KOL (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider (MC run on Good)

CONFIDENCE: MEDIUM-LOW (14-runner C4 field. The banker is strong, but legs #5 and #9 rest on 1–2 form runs)
```

## STRATEGY B (MC-only)

```
Banker: #13 KOL (MC Win% 31.4%, MC Place% 62.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3, #7, #9, #5
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #5 LEAN ERA (24.9%, 15), #9 GOOD POWER (26.2%, 54)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #2 WOLF COMING (6.4, MC Place% 4.1%), #14 SAME TO YOU (8.1, 20.0% — not > 20), #11 TRENDY RUSH (8.3, 17.3%)
Action: #2 replaced #5 (lowest replaceable); #14 replaced #9; #11 added directly (no replaceable leg left)
Final legs: #3, #7, #2, #14, #11
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 22.5%

STRATEGY B TICKET: 膽 #13 / 腳 #3, #7, #2, #14, #11
  Top combos: 13-3-7 (9.9%); 13-3-14 (3.6%); 13-3-11 (2.9%); 13-7-14 (2.5%); 13-7-11 (2.0%)

vs Strategy A: same banker (#13) and same core (#3, #7). Both cost $100 (10 combos).
A covers the MC value longshots #5/#9/#1. B swaps them for market-backed #2/#14/#11.
B is the market-hedge ticket.
═══════════════════════════════════════════════════════════
```

## CAVEATS

- **SCMP odds unusable:** the Win/Place columns from the SCMP page do not match HKJC pools (for example, KOL showed 1.6/2.6 and Trendy Rush 1.6). They were probably mis-parsed by the automated page summary, so HKJC fetch-odds prices are used throughout. The SCMP QP/Q matrix was also not reliably extracted. SCMP form, TIR and vet flags were also extracted by an automated summary, so treat the Strategy A factors as approximate. Strategy B (raw MC) is unaffected.
- **Sparse form:** 7 of 14 runners have fewer than 3 form runs. #3 COPARTNER A I and #5 LEAN ERA have 1 run each, #9 GOOD POWER has 2, and #4 FAITHFUL WARRIOR is a debutant with no form. MC ratings for these horses are low-confidence.
- **Model vs market conflict:** the 2nd–4th favourites (#2, #14, #11) are all rated weak by MC. Strategy A leaves them out, while Strategy B includes them through the win-odds rule.
- **Early odds:** prices were captured at 10:22 HKT and will move before the jump.
