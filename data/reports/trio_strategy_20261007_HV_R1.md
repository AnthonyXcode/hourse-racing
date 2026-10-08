# Trio (單T) Strategy — Happy Valley 2026-10-07 Race 1

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-07 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, 12 jockey + 11 trainer profiles loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Win odds / Star Form / TIR / Vet / Trackwork loaded; Place-odds column looks mis-parsed; Q/QP matrix not retrieved)
ODDS SOURCE: HKJC pool (data/odds/odds_20261007_HV.json, captured 11:01 HKT 07-Oct; analyze-race.ts also fetched live odds during the run)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R1 — Class 5 | 1800m | Turf | Good to Firm | 12 runners — BEDFORD HANDICAP
CLASSIFICATION: Competitive (top Adj Win% 23.8%) | POOL SIZE: 7 (Mode B 6 + #3 forced in by Rule 8, Adj Place% ≥ 20%)
MODE: B: Standard Pool (extended to 7)
BET STRUCTURE (A): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-07 | Going: Good to Firm | Surface: Turf
Target Race(s): R1 (Class 5 | 1800m | 12 runners)
Scratchings: none
Odds coverage: 12 horses with odds (HKJC win; place estimated from win by the tool)
SCMP data: ⚠️ partial
Form gaps: no debutants (all runners have 7–10 recorded runs). Layoffs > 90 days: #4 KINGLY DEMEANOR (last ran 04-Jul, 95 days),
           #2 SHARPEN BRIGHT (13-Jun), #8 GOOD LUCK WIN (10-Jun). Banker #9 GOLDEN FORTUNE has 10 runs (eligible).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 1 | CAN'T GO WONG | 20.2% | 49.9% | 4.1 | ✅ | ✅ | 8/3/3/10/5/11 | ★ 膽 (Banker) | 1-9: 8.8% (11.4) |
| 9 | GOLDEN FORTUNE | 19.8% | 50.0% | 6.3 | ✅ | ✅ | 6/5/2/2/11/13 | 腳 (Leg) | 1-9: 8.8% (11.4) |
| 10 | SPLENDID FORCE | 13.6% | 39.5% | 16 | ✅ | ❌ | 11/11/8/2/7/8 | 腳 (Leg) | 1-10: 6.3% (15.9) / 9-10: 6.3% (15.9) |
| 6 | YOUNG FIGHTER | 13.0% | 38.4% | 15 | ✅ | ❌ | 10/9/8/5/8/7 | 腳 (Leg) | 1-6: 6.2% (16.3) |
| 5 | OCEAN IMPACT | 11.8% | 35.2% | 10 | ✅ | ❌ | 7/8/6/6/4/9 | 腳 (Leg) | — |
| 11 | PERFECT PAIRING | 6.3% | 22.8% | 15 | ✅ | ❌ | 7/13/4/4/2/8 | — (replaced by #4) | — |
| 3 | GRAND TURBO | 5.8% | 20.6% | 9.8 | ✅ | ✅ | 9/7/9/8/4/13 | 腳 (Leg) | — |
| 8 | GOOD LUCK WIN | 2.9% | 11.7% | 11 | ❌ | ❌ | 8/12/6/8/7/5 | — | — |
| 7 | SMILING ONE | 2.7% | 11.6% | 41 | ❌ | ❌ | 12/11/13/8/10/8 | — | — |
| 4 | KINGLY DEMEANOR | 1.7% | 8.2% | 4.9 | ❌ | ✅ | 9/2/6/7/2/2 | 腳 (Leg) — replaced #11 | — |
| 12 | TURF PHOENIX | 1.3% | 6.2% | 24 | ❌ | ❌ | 5/10/12/3/11/8 | — | — |
| 2 | SHARPEN BRIGHT | 1.1% | 6.1% | 15 | ❌ | ❌ | 14/11/12/5/13/11 | — | — |

Market: overround 22.8%. MC and market agree on #1 CAN'T GO WONG (4.1 fav, 20.2%) and roughly on #9 GOLDEN FORTUNE (6.3, 19.8%). MC rates #10 SPLENDID FORCE (16, "undervalued by 118%") and #6 YOUNG FIGHTER (15, "undervalued by 94%") far above the market. The big conflict is #4 KINGLY DEMEANOR: 2nd favourite at 4.9 but MC gives it only 1.7% win ("overvalued by 92%").

Finish-time projection (MC): #9 GOLDEN FORTUNE is fastest (1:47.11), then #10 SPLENDID FORCE (+0.42s), #3 GRAND TURBO (+1.54s), #6 YOUNG FIGHTER (+1.96s). Banker-for-B #1 CAN'T GO WONG projects only 9th (+3.08s); its MC win% leans on jockey (Purton 20%) and course/trip record rather than raw speed.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 9 | GOLDEN FORTUNE | 19.8% | 50.0% | trial +2, excuses +2 | trial +2, excuses +2 | 23.8% | 54.0% | 6.3 | B Avdulla | 7 | 127 | On-pace (sat 3rd) | +trial, +excuses | ★ 膽 (Banker) |
| 2 | 1 | CAN'T GO WONG | 20.2% | 49.9% | 0 | 0 | 20.2% | 49.9% | 4.1 | Z Purton | 2 | 135 | Midfield / handy | — | 腳 (Leg) |
| 3 | 10 | SPLENDID FORCE | 13.6% | 39.5% | excuses +2 | excuses +2 | 15.6% | 41.5% | 16 | J Orman | 4 | 127 | Back | +excuses | 腳 (Leg) |
| 4 | 5 | OCEAN IMPACT | 11.8% | 35.2% | excuses +2 | excuses +2 | 13.8% | 37.2% | 10 | L Ferraris | 11 | 133 | Midfield | +excuses | 腳 (Leg) |
| 5 | 6 | YOUNG FIGHTER | 13.0% | 38.4% | 0 | 0 | 13.0% | 38.4% | 15 | E C W Wong (-3) | 8 | 133 | Unknown (faded last start) | — | 腳 (Leg) |
| 6 | 11 | PERFECT PAIRING | 6.3% | 22.8% | excuses +2 | excuses +2 | 8.3% | 24.8% | 15 | A Atzeni | 12 | 116 | Back | +excuses | 腳 (Leg) |
| 7 | 3 | GRAND TURBO | 5.8% | 20.6% | 0 | 0 | 5.8% | 20.6% | 9.8 | R Kingscote | 1 | 133 | Back (near the rear) | — | 腳 (Leg) |
| 8 | 7 | SMILING ONE | 2.7% | 11.6% | excuses +2 | excuses +2 | 4.7% | 13.6% | 41 | M F Poon | 5 | 132 | Stalk (better than midfield) | +excuses | — |
| 9 | 2 | SHARPEN BRIGHT | 1.1% | 6.1% | excuses +2 | excuses +2 | 3.1% | 8.1% | 15 | K Teetan | 3 | 134 | — | +excuses | — |
| 10 | 8 | GOOD LUCK WIN | 2.9% | 11.7% | 0 | 0 | 2.9% | 11.7% | 11 | K C Leung | 10 | 130 | — | — | — |
| 11 | 4 | KINGLY DEMEANOR | 1.7% | 8.2% | 0 | 0 | 1.7% | 8.2% | 4.9 | M L Yeung | 9 | 133 | Front (set the pace) | — | — |
| 12 | 12 | TURF PHOENIX | 1.3% | 6.2% | 0 | 0 | 1.3% | 6.2% | 24 | H T Mo (-2) | 6 | 115 | — | — | — |

Factor labels: trial +2, excuses +2 (bumped/crowded/raced tight/unbalanced), +draw +1, +form +1, -perf −2, -notRO −2, -injury30d −3, -barrier −1, -age −2. Caps are ±8 win / ±10 place, and none were reached. Banker eligibility: #9 has 10 runs, so it is eligible.

SCMP adjustments applied:
- **#9 GOLDEN FORTUNE**: Trackwork: "Showed plenty to work with when third in a trial on the Sha Tin dirt", so trial +2. TIR: "On jumping was bumped", so excuses +2. Star Form: "Resumed sixth sitting third in the run over 1,600m". Total +4, which lifts it above #1 to rank 1.
- **#1 CAN'T GO WONG**: Star Form: "Earned minor cheques eight times, including four Valley placings up to 1,800m". TIR: "obtained more forward position than intended" is not an excuse. No vet note. It is 8 years old, but SCMP's vet report does not flag age, and this is a Class 5 race. -age was not applied (judgment call).
- **#10 SPLENDID FORCE**: TIR: "became unbalanced when it bumped with a runner", so excuses +2.
- **#5 OCEAN IMPACT**: TIR: "Shifted out shortly after the start and was bumped", so excuses +2. The vet inspection showed nothing significant.
- **#11 PERFECT PAIRING**: TIR: "Bumped shortly after the start", so excuses +2.
- **#7 SMILING ONE**: TIR: "Jumped only fairly and then raced tight", so excuses +2.
- **#2 SHARPEN BRIGHT**: TIR: "was bumped… lay in when under pressure", so excuses +2.
- **#6 YOUNG FIGHTER**: "Resumed off an injury-induced absence with a fading 10th". There is no vet date inside 30 days, so no -injury30d. No flag.
- **#3 GRAND TURBO**: "Jumped only fairly" appears once, so there is no barrier penalty. **#4 KINGLY DEMEANOR**: "Set the pace for second three times over the Valley 1,800m" is a course/trip credential, not a recent improving run, so no flag. **#8, #12**: no scoring flags.

Reasoning: This is a Class 5 Valley 1800m handicap with a bunched top five. #9 GOLDEN FORTUNE and #1 CAN'T GO WONG are close to co-top on MC (19.8% vs 20.2%). #9 has the fastest projected time, a positive dirt trial and an excuse last start, so it takes rank 1 after SCMP adjustments. It also carries 8lb less than #1. The race is Competitive (23.8%), so Mode B applies: top 3 by Adj Win% (#9, #1, #10), plus 3 by Adj Place% (#6 38.4, #5 37.2, #11 24.8). All horses with Adj Place% ≥ 25% (#9, #1, #10, #5, #6) are already in the pool. Rule 8 (Adj Place% ≥ 20% must be in the pool) also forces in #3 GRAND TURBO (20.6%, 9.8 in the market), which makes a 7-horse pool. That fits the Happy Valley "use wider pools" guidance. Pace: #4 KINGLY DEMEANOR (draw 9) is the likely leader, and #9 (draw 7) and #1 (draw 2) should be handy. That suits the HV 1800m stalker bias. #10 and #11 need the pace to collapse. #4 KINGLY DEMEANOR (4.9) sits outside Strategy A on thresholds (Adj Place% 8.2%). It has no negative SCMP flags, so Rule 9 does not force it in. Strategy B picks it up.

## TRIO POOL (Strategy A, any order)

```
POOL: #9, #1, #10, #5, #6, #11, #3
MODE: B (Competitive, #9 Adj Win% 23.8% in 20–35%) | POOL SIZE: 7
  Mode B default = top 3 by Adj Win% (#9, #1, #10) + 3 by Adj Place% (#6 38.4, #5 37.2, #11 24.8)
  Must-include (Adj Place% ≥ 25%): #9, #1, #10, #5, #6 (all already in)
  #3 added: Adj Place% 20.6% ≥ 20% (Rule 8)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #9 GOLDEN FORTUNE (Adj Win% 23.8%, Adj Place% 54.0%) ← locked in every combo
腳 (Legs):  #1, #10, #5, #6, #11, #3
雙膽拖 check: 2nd-ranked #1 Adj Place% 49.9% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #9, #1, #10 | 5.6% | $178 per $10 |
| 2 | #9, #1, #5 | 4.9% | $205 per $10 |
| 3 | #9, #1, #6 | 4.6% | $219 per $10 |
| 4 | #9, #10, #5 | 3.6% | $280 per $10 |
| 5 | #9, #10, #6 | 3.3% | $300 per $10 |
| 6 | #9, #5, #6 | 2.9% | $346 per $10 |
| 7 | #9, #1, #11 | 2.8% | $361 per $10 |
| 8 | #9, #10, #11 | 2.0% | $494 per $10 |
| 9 | #9, #1, #3 | 1.9% | $529 per $10 |
| 10 | #9, #5, #11 | 1.8% | $570 per $10 |
| 11–15 | #9-6-11, #9-10-3, #9-5-3, #9-6-3, #9-11-3 | 0.7–1.6% each | $611–$1,474 |

Estimated chance that the Strategy A ticket hits (sum of the 15 combos): about 39%. Harville from win% tends to overstate how concentrated the finish is, so treat this as an upper bound.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TICKET: 膽 #9 | 腳 #1, #10, #5, #6, #11, #3
  9-1-10, 9-1-5, 9-1-6, 9-10-5, 9-10-6, 9-5-6, 9-1-11, 9-10-11,
  9-1-3, 9-5-11, 9-6-11, 9-10-3, 9-5-3, 9-6-3, 9-11-3
```

Value note: combos that leave out the favourite #1 (e.g. 9-10-5, 9-10-6, 9-5-6) use MC-undervalued horses #10 (16) and #6 (15), so they should pay best if they land.

PASS CONDITIONS:
- If #9 GOLDEN FORTUNE (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If going changes to Yielding/Soft or worse → re-run the MC.
- If #9 drifts beyond ~12 in late betting while #4 firms → consider PASS. Both would be signs the market strongly disagrees with the model.

CONFIDENCE: MEDIUM-LOW. The top two are clear on MC (~50% Place each), but the race is Class 5 with a bunched 3rd–5th group (35–42% Adj Place%). The banker's edge over #1 comes only from SCMP adjustments (+4), and the 2nd favourite (#4) is outside the pool.

CAVEATS:
- **SCMP is partial.** Win odds broadly match HKJC (#1 3.9 vs 4.1, #4 4.9 vs 4.9, #9 8.2 vs 6.3). SCMP "Place" figures are near or above Win odds for most runners, so they look mis-parsed and were not used. The Q/QP matrix was not retrieved, so there is no Q/QP cross-reference.
- **Model vs market conflict on #4 KINGLY DEMEANOR**: it is the 4.9 second favourite and a three-time Valley 1800m runner-up as pace-setter, but MC gives it 1.7% win / 8.2% place (95-day layoff, last 6: 9/2/6/7/2/2). It is excluded from Strategy A. If it places, A suffers a pool miss. Strategy B covers it.
- Banker choice is a near tie. #1 vs #9 on raw MC is 20.2% vs 19.8%, and #9 goes to rank 1 only because of the trial +2 / excuses +2 SCMP credits. Without them, Strategy A's banker would be #1, the same as Strategy B.
- SCMP judgment calls: "bumped at start", "raced tight" and "unbalanced" were scored as excuses +2, following the convention in prior reports. -age was not applied to 8yo #1 (no vet note; Class 5).
- The MC scraper log printed "distance=1200m" while parsing, but the saved race card, MC header and SCMP all confirm 1800m. The simulation ran at 1800m.
- Odds were captured at 11:01 HKT 07-Oct; the HKJC pool will move before the 18:35 jump.
- Historical sync was not re-run in this session (it had already been done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #1 CAN'T GO WONG (MC Win% 20.2%, MC Place% 49.9%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #9 (50.0%), #10 (39.5%), #6 (38.4%), #5 (35.2%), #11 (22.8%), #3 (20.6%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #11 PERFECT PAIRING (MC Place% 22.8%, Win odds 15)
  (#3 GRAND TURBO is in the 20–30% band but Win odds 9.8 < 10, so it is not replaceable)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
  #4 KINGLY DEMEANOR (Win odds 4.9, MC Place% 8.2%)
Action: #4 replaced #11 (1-for-1 swap)
Final legs: #9, #10, #6, #5, #3, #4
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #1 | 腳 #9, #10, #6, #5, #3, #4
  1-9-10 (6.2%), 1-9-6 (5.8%), 1-9-5 (5.2%), 1-10-6 (3.7%), 1-10-5 (3.3%), 1-6-5 (3.1%),
  1-9-3 (2.4%), 1-10-3 (1.5%), 1-6-3 (1.4%), 1-5-3 (1.3%), 1-9-4 (0.7%), 1-10-4 (0.4%),
  1-6-4 (0.4%), 1-5-4 (0.4%), 1-3-4 (0.2%)
  Est. hit chance (Harville, raw MC): about 36%
```

Comparison: both strategies cost $150 for 15 combos and share six horses (#1, #9, #10, #5, #6, #3 appear in both). The differences are the banker and one leg. Strategy A bankers #9 GOLDEN FORTUNE (SCMP trial + excuse) and keeps #11 PERFECT PAIRING. Strategy B bankers the favourite #1 CAN'T GO WONG (MC #1) and swaps #11 for the market's 2nd favourite #4 KINGLY DEMEANOR. B is the hedge if the market is right about #4. A wins if #9's trial form carries over and #1 misses.

═══════════════════════════════════════════════════════════
