# Trio (單T) Strategy — Sha Tin 2026-10-11 Race 1

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey + trainer stats loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds look mis-parsed; only a 3-pair Q sample, no full Q/QP matrix)
ODDS SOURCE: HKJC pool (data/odds/odds_20261011_ST.json, captured 11:24 HKT 11-Oct; same win odds used by analyze-race.ts)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R1 — Class 5 | 1200m | All Weather Track | Good | 12 runners — HUNG SHUI KIU HANDICAP
CLASSIFICATION: Competitive (top Adj Win% 29.0%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
BET STRUCTURE (B): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: AWT (dirt)
Target Race(s): R1 (Class 5 | 1200m | 12 runners)
Scratchings: none among the 12 declared runners (SCMP lists reserves SWEET BRIAR and THE CONCENTRATION as withdrawn; they were never in the field)
Odds coverage: 12 horses with odds (HKJC win and place)
SCMP data: ⚠️ partial
Form gaps: none. All 12 horses have 7–10 recorded starts, so every horse is banker-eligible.
           Layoffs: #6 MAGIC SUPER last ran 24-May (140 days, and had throat surgery since then). #8 SHINYU KOKOROE last ran 06-May (158 days).
           #1 FLYING SNIPER last ran 12-Jul (91 days).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 4 | JOLLY COMPANION | 27.0% | 59.4% | 5.9 | ✅ | ✅ | 9/6/9/6/5/6 | ★ 膽 (Banker) | 4-5: 13.1% (7.7) |
| 5 | DAILY TROPHY | 22.7% | 54.1% | 11 | ✅ | ❌ | 3/11/4/14/12/7 | 腳 (Leg) | 4-5: 13.1% (7.7) |
| 3 | SO MY FOLKS | 10.9% | 35.0% | 6.3 | ✅ | ✅ | 6/2/13/6/4/6 | 腳 (Leg) | 3-4: 6.7% (14.9) |
| 7 | WAVE GARDEN | 9.2% | 31.2% | 4.9 | ✅ | ✅ | 1/14/13/9/11/9 | 腳 (Leg) | — |
| 10 | HAPPY ACTION | 8.8% | 30.6% | 13 | ✅ | ❌ | 7/10/9/9/8/3 | 腳 (Leg) | 4-10: 5.5% (18.0) |
| 11 | GIMME FIVE | 8.6% | 30.6% | 6.6 | ✅ | ✅ | 2/10/12/7/13/12 | 腳 (Leg) | 4-11: 5.4% (18.5) |
| 2 | MARVEL AND GOLD | 4.4% | 19.0% | 15 | ❌ | ❌ | 6/6/7/6/8/6 | — | — |
| 12 | THOUSAND CUPS | 2.8% | 12.8% | 18 | ❌ | ❌ | 6/7/12/11/2/8 | — | — |
| 9 | CONRAD THE GREAT | 2.5% | 11.3% | 10 | ❌ | ❌ | 12/6/7/9/6/9 | — | — |
| 1 | FLYING SNIPER | 2.1% | 10.5% | 10 | ❌ | ❌ | 8/5/4/8/6/7 | — | — |
| 8 | SHINYU KOKOROE | 0.9% | 5.1% | 26 | ❌ | ❌ | 11/8/7/5/11/13 | — | — |
| 6 | MAGIC SUPER | 0.1% | 0.4% | 42 | ❌ | ❌ | 14/11/11/14/14/10 | — | — |

Market: overround 23.4%. MC and the market disagree on the favourite. The market's favourite is #7 WAVE GARDEN (4.9, a last-start winner), which MC rates only 4th (9.2% win). MC's top pick is #4 JOLLY COMPANION (5.9, Purton, 2nd in the market). MC's biggest value call is #5 DAILY TROPHY (11): 22.7% win and 54.1% place, which the tool reports as "undervalued by 149%". #5 also has the fastest projected time (1:09.38). MC rates #1 FLYING SNIPER and #9 CONRAD THE GREAT (both 10) well below their market price. MC's top quinella is 4-5 (13.1%, fair 7.7). Behind the top two, four horses sit in a tight 30–35% place band (#3, #7, #10, #11).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 4 | JOLLY COMPANION | 27.0% | 59.4% | trial +2 | trial +2 | 29.0% | 61.4% | 5.9 | Z Purton | 11 | 129 | Front | +trial | ★ 膽 (Banker) |
| 2 | 5 | DAILY TROPHY | 22.7% | 54.1% | +form +1 | +form +1 | 23.7% | 55.1% | 11 | L Ferraris | 9 | 128 | Closer | +form | 腳 (Leg) |
| 3 | 3 | SO MY FOLKS | 10.9% | 35.0% | excuses +2 | excuses +2 | 12.9% | 37.0% | 6.3 | C L Chau (-2) | 2 | 130 | Midfield | +excuses | 腳 (Leg) |
| 4 | 10 | HAPPY ACTION | 8.8% | 30.6% | excuses +2 | excuses +2 | 10.8% | 32.6% | 13 | A Atzeni | 3 | 121 | Midfield | +excuses | 腳 (Leg) |
| 5 | 7 | WAVE GARDEN | 9.2% | 31.2% | 0 | 0 | 9.2% | 31.2% | 4.9 | R Kingscote | 7 | 128 | Stalk | — | 腳 (Leg) |
| 6 | 11 | GIMME FIVE | 8.6% | 30.6% | 0 | 0 | 8.6% | 30.6% | 6.6 | H Y Yuen (-7) | 10 | 120 | Front | — | 腳 (Leg) |
| 7 | 12 | THOUSAND CUPS | 2.8% | 12.8% | excuses +2 | excuses +2 | 4.8% | 14.8% | 18 | Y L Chung (-2) | 12 | 120 | Front | +excuses | — |
| 8 | 2 | MARVEL AND GOLD | 4.4% | 19.0% | 0 | 0 | 4.4% | 19.0% | 15 | J Orman | 8 | 131 | Varied | — | — |
| 9 | 8 | SHINYU KOKOROE | 0.9% | 5.1% | excuses +2 | excuses +2 | 2.9% | 7.1% | 26 | K Teetan | 4 | 127 | Closer | +excuses | — |
| 10 | 9 | CONRAD THE GREAT | 2.5% | 11.3% | 0 | 0 | 2.5% | 11.3% | 10 | L Hewitson | 6 | 125 | Midfield | — | — |
| 11 | 1 | FLYING SNIPER | 2.1% | 10.5% | 0 | 0 | 2.1% | 10.5% | 10 | M F Poon | 5 | 133 | Closer | — | — |
| 12 | 6 | MAGIC SUPER | 0.1% | 0.4% | -injury30d −3 | -injury30d −4 | 0.0% | 0.0% | 42 | A Badel | 1 | 128 | — | -injury30d | — |

Factor labels: trial +2, +form +1 (improved/rallied/made all in a race), excuses +2 (steadied/crowded/denied clear run), -injury30d −3 win / −4 place. Caps are ±8 win / ±10 place, and none were reached. #6 was floored at 0%. Banker eligibility: #4 has 10 recorded starts, so it is eligible.

SCMP adjustments applied:
- **#4 JOLLY COMPANION**: Trackwork "Led throughout in recent Sha Tin dirt trial; looks in perfect condition", and Star Form "Easily made all in a recent dirt trial", so trial +2. The "made all" was in a trial, not a race, so +form is not added on top. It has two dirt 1,200m wins, which suits the surface.
- **#5 DAILY TROPHY**: Star Form "Rallying fourth following downgrade ... dirt 1,200m", so +form +1. TIR "Jumped only fairly" is a single note, so no -barrier penalty.
- **#3 SO MY FOLKS**: TIR "steadied; difficulty obtaining clear running near 400M", so excuses +2.
- **#10 HAPPY ACTION**: TIR "Difficulty obtaining clear running between 400–300M and near 200M", so excuses +2.
- **#12 THOUSAND CUPS**: TIR "Could not be ridden out when positioned close to a runner". This was traffic (no room), not a soundness concern, so it is scored as excuses +2 and not as -notRO.
- **#8 SHINYU KOKOROE**: TIR "Tightened for room near 700M after being bumped", so excuses +2.
- **#6 MAGIC SUPER**: Vet "Throat surgery 27/07/2026; passed 21/09/2026", which is 20 days before the race (< 30), so -injury30d −3 win / −4 place.
- **#7 WAVE GARDEN**: Star Form "Resumed a barnstorming winner" has no scoring keyword (same convention as earlier reports, where a win alone is not +form). TIR "Jumped awkwardly" is a single note, so 0. SCMP also says it was "advantaged by downgrade" last start.
- **#11 GIMME FIVE**: "Set the pace for second" identifies a front-runner but carries no scoring keyword, so 0.
- **#1, #2, #9**: no scoring flags. #1 "shifted in at start and bumped" is a single note, so 0.

Reasoning: #4 JOLLY COMPANION is MC #1 (rating 63). It has Purton (21% strike rate in the data), proven dirt 1,200m form (two wins), and a dominant recent dirt trial. Gate 11 is the main negative, but the trial suggests it can lead or sit handy. At Adj Win% 29.0% the race is Competitive, so Mode B applies: the top 3 by Adj Win% (#4, #5, #3) plus the 3 best remaining by Adj Place% (#10 32.6, #7 31.2, #11 30.6). All six horses clear the ≥25% Adj Place% must-include line, and no other horse does (the next best is #2 at 19.0%). Rule 9 (negative flag but odds ≤15) does not apply, because the only negatively flagged horse is #6 at 42. The pool includes all four of the market's shortest prices (#7 4.9, #4 5.9, #3 6.3, #11 6.6) plus MC's value horse #5. Pace: #11 (gate 10), #12 (gate 12) and #4 (gate 11) all have speed from wide gates. #5 is a rallying type that should benefit from a contested tempo. Excluded at 10 odds: #9 CONRAD THE GREAT and #1 FLYING SNIPER (MC 11.3% / 10.5% place, no positive flags).

## TRIO POOL (Strategy A, any order)

```
POOL: #4, #5, #3, #10, #7, #11
MODE: B (Competitive, #4 Adj Win% 29.0% in the 20–35% band) | POOL SIZE: 6
  Top 3 by Adj Win%: #4 (29.0), #5 (23.7), #3 (12.9)
  + 3 by Adj Place%: #10 (32.6), #7 (31.2), #11 (30.6)
  Must-include (Adj Place% ≥ 25%): #4, #5, #3, #10, #7, #11 — all in pool

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #4 JOLLY COMPANION (Adj Win% 29.0%, Adj Place% 61.4%) ← locked in every combo
腳 (Legs):  #5, #3, #10, #7, #11
雙膽拖 check: 2nd-ranked #5 Adj Place% 55.1% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #4, #5, #3 | 8.2% | $122 per $10 |
| 2 | #4, #5, #10 | 6.7% | $149 per $10 |
| 3 | #4, #5, #7 | 5.6% | $178 per $10 |
| 4 | #4, #5, #11 | 5.2% | $192 per $10 |
| 5 | #4, #3, #10 | 3.2% | $316 per $10 |
| 6 | #4, #3, #7 | 2.7% | $377 per $10 |
| 7 | #4, #3, #11 | 2.5% | $406 per $10 |
| 8 | #4, #10, #7 | 2.2% | $462 per $10 |
| 9 | #4, #10, #11 | 2.0% | $497 per $10 |
| 10 | #4, #7, #11 | 1.7% | $594 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 10 combos): about 40% on Adj Win%, or about 44% on raw MC.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: 膽 #4 | 腳 #5, #3, #10, #7, #11
  4-5-3, 4-5-10, 4-5-7, 4-5-11, 4-3-10, 4-3-7, 4-3-11, 4-10-7, 4-10-11, 4-7-11

TOP COMBINATIONS (highest value):
  4-5-3 (8.2%), 4-5-10 (6.7%), 4-5-7 (5.6%), 4-5-11 (5.2%), 4-3-10 (3.2%)
```

Value note: the 4-5 pair is MC's top quinella (13.1%, fair 7.7), and #5 is 11 in the win market, so 4-5-x combos should pay well above chalk. Combos without #5 that include the market favourite #7 and #3/#11 will pay shorter.

PASS CONDITIONS:
- If #4 JOLLY COMPANION (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the AWT going is upgraded to Wet Fast/Wet Slow → re-run the MC (front-runner bias may strengthen).
- If #4 drifts beyond ~10 in late betting (market losing faith in the banker) → consider PASS.

CONFIDENCE: MEDIUM. The banker has a strong trial, dirt form and Purton, but it is a Class 5 race with a wide gate 11. #4's raw form (9/6/9/6/5/6) is modest, and its MC edge comes mainly from its dirt record and the jockey. The 30–35% leg cluster is tight.

CAVEATS:
- SCMP is partial. SCMP win odds broadly match HKJC (#4 5.7 vs 5.9, #7 5.4 vs 4.9, #3 6 vs 6.3, #11 6 vs 6.6; #1 14 vs 10, #2 11 vs 15). SCMP "Place" odds are near or above win odds (e.g. #2 11/14), so they look mis-parsed. Only a 3-pair Q sample (1-7, 3-7) was shown, so a full Q/QP cross-reference was not possible.
- MC disagrees with the market favourite #7 WAVE GARDEN (4.9, MC 4th). It is a leg in both strategies. SCMP notes that its last-start win was "advantaged by downgrade and first race on AWT".
- #5 DAILY TROPHY (MC 22.7% win vs 11 market) is the model's key overlay. If MC is overrating it, 4 of the top 4 combos are affected.
- Banker #4 is drawn 11 of 12. Gate penalties are reducers only, but this is the main risk to the banker.
- SCMP adjustment judgment calls: #12 "could not be ridden out" was scored as excuses (traffic), not -notRO. #4 "made all" in a trial was not double-counted as +form. #7's win was not scored as +form. None of these change the pool.
- Odds were captured at 11:24 HKT on 11-Oct. The HKJC pool will move before the 12:30 jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #4 JOLLY COMPANION (MC Win% 27.0%, MC Place% 59.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #5 (54.1%), #3 (35.0%), #7 (31.2%), #10 (30.6%), #11 (30.6%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
  (every primary leg is above 30% place; #10 is 30.6% at 13 odds, and #11 is 30.6% at 6.6)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
  (#9 CONRAD THE GREAT and #1 FLYING SNIPER are both exactly 10, not < 10)
Action: none (no candidates, so no replacements or additions)
Final legs: #5, #3, #7, #10, #11
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #4 | 腳 #5, #3, #7, #10, #11
  4-5-3, 4-5-7, 4-5-10, 4-5-11, 4-3-7, 4-3-10, 4-3-11, 4-7-10, 4-7-11, 4-10-11

Top combos (Harville, raw MC): 4-5-3 8.7% | 4-5-7 7.2% | 4-5-10 6.8% | 4-5-11 6.6% | 4-3-7 2.9%
Est. ticket hit chance (sum of 10 combos, raw MC): ~44%
```

Comparison: Strategy A and Strategy B produce the **identical ticket** (膽 #4 + 腳 #5, #3, #10, #7, #11; 10 combos, $100). The SCMP adjustments only reorder the legs (#10 moves above #7) and do not change the pool, because the six horses above 25–30% place are clearly separated from the rest of the field (next best is 19.0%). If you place both strategies, it is effectively a single $100 ticket.

```
═══════════════════════════════════════════════════════════
```
