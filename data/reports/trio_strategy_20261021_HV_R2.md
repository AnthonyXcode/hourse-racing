# Trio (單T) Strategy — Happy Valley 2026-10-21 Race 2

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-21 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, 12 jockey + 12 trainer profiles loaded) | Going: Good | Scratchings: none (2 reserves not running)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; odds columns unlabelled; Q/QP matrix not parsed)
ODDS SOURCE: HKJC early-morning win pool (fetch-odds.ts, data/odds/odds_20261021_HV.json, captured 11:01 HKT 21-Oct)
             SCMP odds: ⚠️ loaded but unlabelled (cross-reference only) | HKJC: ✅ loaded

RACE: R2 — Class 5 | 1200m | Turf ("B" course) | Good | 12 runners — SUCCESS HANDICAP (7:10pm)
CLASSIFICATION: Competitive (top Adj Win% 20.1%, marginal) | POOL SIZE: 6
MODE: B: Standard Pool (6) (must-include threshold: Adj Place% ≥ 25%)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10  (2nd-ranked #11 Adj Place% 43.9% < 63%, so no 雙膽拖)
BET STRUCTURE (B): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-21 (night) | Going: Good | Surface: Turf
Target Race(s): R2 (Class 5 | 1200m | 12 runners)
Scratchings: none. Reserves R TELECOM POWER and R FOREVER FANCY are not in the field.
Odds coverage: 12 horses with HKJC win odds (the MC tool estimated place odds from the win odds)
SCMP data: ⚠️ partial
Form gaps: none material. All 12 runners have 7–10 form records (#2 CASA PRIMO has 7);
  all last ran between 13-Sep and 11-Oct (no layoffs > 90 days).
Note: the odds file also contains phantom R10/R11 (copies of R1); ignored — the meeting has 9 races.
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6, oldest→newest) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------------------------------|-------------------|--------------------------|
| 5 | ALWAYS MY FOLKS | 18.1% | 44.8% | 22 | ✅ | ❌ | 4/12/1/5/5/8 | ★ 膽 (Banker) | 5-11: 6.0% (16.6) |
| 11 | CHILL MASTER | 16.0% | 40.9% | 6.8 | ✅ | ✅ | 9/4/3/6/8/7 | 腳 (Leg) | 5-11: 6.0% (16.6) |
| 4 | FALCON HUNTER | 11.8% | 33.3% | 3.5 | ✅ | ✅ | 11/3/10/12/9/2 | 腳 (Leg) | 4-5: 4.6% (21.9) |
| 3 | AUTUMN VIBES | 10.0% | 30.2% | 6.1 | ✅ | ✅ | 3/8/2/13/3/3 | 腳 (Leg) | 3-5: 3.8% (26.6) |
| 1 | GOLDEN FRIENDSHIP | 9.9% | 29.8% | 4.9 | ✅ | ✅ | 6/2/6/2/6/11 | 腳 (Leg) | 1-5: 4.0% (25.1) |
| 10 | RUNJEET | 8.2% | 26.8% | 23 | ✅ | ❌ | 7/12/4/9/4/6 | 腳 (Leg; replaceable, no candidate) | — |
| 8 | NOBLE FANS | 7.5% | 24.0% | 10 | ✅ | ❌ | 5/11/8/1/7/5 | 腳 (Leg) | — |
| 6 | VERBIER | 5.2% | 18.9% | 23 | ❌ | ❌ | 3/1/3/11/10/11 | — | — |
| 12 | HAPPY BUDDIES | 4.1% | 14.7% | 33 | ❌ | ❌ | 12/7/11/6/8/10 | — | — |
| 9 | WINNING NOW | 4.0% | 14.9% | 11 | ❌ | ❌ | 6/2/4/9/9/12 | — | — |
| 2 | CASA PRIMO | 2.9% | 12.4% | 32 | ❌ | ❌ | 5/5/6/5/8/10 | — | — |
| 7 | ICONICAL | 2.2% | 9.2% | 21 | ❌ | ❌ | 10/11/3/6/13/3 | — | — |

Form = up to six runs from data/historical (both venues).

Market: overround 23.3%, favourite bias −55.0%, longshot bias +63.8%. MC and market disagree sharply at the top.
- **MC #1 is a big overlay:** #5 ALWAYS MY FOLKS is 22 (8th in the market) but MC #1 (18.1% / 44.8%), flagged undervalued by 299%. The tool recommends Place on #5 (69% edge) and #11.
- **#10 RUNJEET** (23) is MC 6th, undervalued by 89%.
- **Favourite #4 FALCON HUNTER** (3.5) is MC 3rd, overvalued by 59%.
- Ratings are tightly bunched (64 → 58 across the top 7, avg differentiation 6; 7 horses with diff < 8). This is a genuinely open Class 5.
- Speed-figure projection has #3 AUTUMN VIBES fastest (1:09.65), with #5 and #6 next at +0.42s. It puts #11 6th, #4 9th and #1 11th.

Top MC quinellas: 5-11 (6.0%), 4-5 (4.6%), 4-11 (4.2%), 1-5 (4.0%), 3-5 (3.8%).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 5 | ALWAYS MY FOLKS | 18.1% | 44.8% | excuses +2 | excuses +2 | 20.1% | 46.8% | 22 | K C Leung | 10 | 132 | Keen / raced wide | +excuses (wide, no cover) | ★ 膽 (Banker) |
| 2 | 11 | CHILL MASTER | 16.0% | 40.9% | excuses +2, +form +1 | excuses +2, +form +1 | 19.0% | 43.9% | 6.8 | C Y Ho | 6 | 119 | Closer | +excuses, +form (rallied) | 腳 (Leg) |
| 3 | 1 | GOLDEN FRIENDSHIP | 9.9% | 29.8% | excuses +2 | excuses +2 | 11.9% | 31.8% | 4.9 | Z Purton | 4 | 135 | Midfield | +excuses (steadied, crowded) | 腳 (Leg) |
| 4 | 4 | FALCON HUNTER | 11.8% | 33.3% | 0 | 0 | 11.8% | 33.3% | 3.5 | C L Chau (-2) | 8 | 133 | — | — | 腳 (Leg) |
| 5 | 3 | AUTUMN VIBES | 10.0% | 30.2% | 0 | 0 | 10.0% | 30.2% | 6.1 | L Ferraris | 1 | 133 | — | — | 腳 (Leg) |
| 6 | 10 | RUNJEET | 8.2% | 26.8% | 0 | 0 | 8.2% | 26.8% | 23 | H Bentley | 7 | 125 | On-pace | — | 腳 (Leg, ≥25%) |
| 7 | 8 | NOBLE FANS | 7.5% | 24.0% | 0 | 0 | 7.5% | 24.0% | 10 | A Atzeni | 3 | 130 | — | — | — (24.0% < 25%; 20%-variant leg) |
| 8 | 6 | VERBIER | 5.2% | 18.9% | 0 | 0 | 5.2% | 18.9% | 23 | J Orman | 9 | 132 | Front | — | — |
| 9 | 7 | ICONICAL | 2.2% | 9.2% | trial +2 | trial +2 | 4.2% | 11.2% | 21 | L Hewitson | 12 | 130 | Wide/midfield | +trial | — |
| 10 | 12 | HAPPY BUDDIES | 4.1% | 14.7% | 0 | 0 | 4.1% | 14.7% | 33 | M F Poon | 5 | 117 | — | — | — |
| 11 | 9 | WINNING NOW | 4.0% | 14.9% | 0 | 0 | 4.0% | 14.9% | 11 | H Y Yuen (-7) | 2 | 130 | Front | — | — |
| 12 | 2 | CASA PRIMO | 2.9% | 12.4% | 0 | 0 | 2.9% | 12.4% | 32 | B Avdulla | 11 | 134 | On-pace | — | — |

Factor labels used here:
- excuses +2: steadied/crowded, wide trip without cover, or held up for clear running
- +form +1: Star Form "rallied"
- trial +2: positive trackwork/trial note

Positive flags apply equally to Win% and Place%, as in earlier reports. No horse reached the ±8 / ±10 per-horse limits or the 50% / 85% caps. Banker eligibility: #5 has 10 form records (not a debutant), so it is eligible.

SCMP adjustments applied:
- **#5 ALWAYS MY FOLKS**: TIR says it "raced very wide and without cover for most of the race". That is a wide-trip excuse, so excuses +2. The same report says it raced keenly, did not settle and failed to respond. That is partly self-inflicted, so the excuse is only marginal. Vet: no significant findings.
- **#11 CHILL MASTER**: TIR says it "had difficulty obtaining clear running" leaving the 400m, so excuses +2. Star Form says it "Rallied to earn minor cheques four times from his first six Valley 1,200m runs", so +form +1.
- **#1 GOLDEN FRIENDSHIP**: TIR says it "was steadied when crowded" leaving the 600m, so excuses +2.
- **#7 ICONICAL**: Trackwork says it "drew away impressively under a hold to win his latest trial at Conghua and is respected", so trial +2. Still well outside the pool.
- No adjustment:
  - **#2 CASA PRIMO**: "lay out, hard to ride out" describes the horse being difficult. It is not a stewards' not-ridden-out finding.
  - **#6 VERBIER**: "bumped near the 250m" was a single contact, not crowded or steadied.
  - **#8 NOBLE FANS**: "shifted across behind runners" from a wide gate is not a scoring flag.
  - **#9 WINNING NOW**: shifted in and was bumped (one occurrence). Vet found nothing significant.
  - **#10 RUNJEET**: bumped at the start once, so the ≥2-run barrier rule is not met.
  - **#12 HAPPY BUDDIES**: jumped awkwardly (one occurrence).
  - **#3, #4**: no flags.

Reasoning: The top two by Adj Win% are #5 (20.1) and #11 (19.0), with a 7-point gap to #1/#4 (~11.9). #5 at 20.1% makes the race Competitive, so Mode B applies. That rests on the excuses +2; raw MC 18.1% would be Wide open (Mode C/D).

The Mode B pool:
- Top 3 by Adj Win%: #5, #11, #1.
- Next 3 by Adj Place%: #4 (33.3), #3 (30.2), #10 (26.8). All are also ≥ 25% must-includes.
- The must-include threshold is Adj Place% ≥ 25% (SKILL.md rule table). #8 NOBLE FANS (24.0%) falls just short, and the Mode B rules don't otherwise include it, so it is left out.

That gives a standard 6-horse Mode B pool. #11's Adj Place% is 43.9%, below 63%, so this is a single-banker 膽拖.

Left out: #8 NOBLE FANS (24.0%, 10) misses the 25% must-include threshold by 1 point. #6 VERBIER (18.9%, 23), #9 WINNING NOW (14.9%, 11) and #12 (14.7%, 33) are all below 20% Adj Place% and priced above 10. #7 ICONICAL is 11.2% even with trial +2 and is priced 21 from gate 12. Rule 9 (odds ≤ 15) only blocks exclusions based on negative flags, and none of these were excluded on flags.

Pace: HV 1,200m favours on-pace runners.
- #9 (gate 2, a front-running 2nd in April) and #6 (led last start) look the likely leaders. #10 sits near the pace from gate 7.
- #3 (gate 1) and #1 (gate 4) should get cover.
- #5 (gate 10) and #11 (a rallying type) need luck from behind. #5 also has to settle after racing keenly last time. This is the main structural risk to the banker.

## TRIO POOL (Strategy A, any order)

```
POOL: #5, #11, #1, #4, #3, #10
MODE: B (Competitive, #5 Adj Win% 20.1%) | POOL SIZE: 6
  Top 3 by Adj Win%: #5 (20.1), #11 (19.0), #1 (11.9)
  + 3 by Adj Place%: #4 (33.3), #3 (30.2), #10 (26.8)  (all ≥ 25% must-includes)
  Not included: #8 (24.0) is below the 25% must-include threshold

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #5 ALWAYS MY FOLKS (Adj Win% 20.1%, Adj Place% 46.8%) ← locked in every combo
腳 (Legs):  #11, #1, #4, #3, #10
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #5, #11, #1 | 3.7% | $274 per $10 |
| 2 | #5, #11, #4 | 3.6% | $276 per $10 |
| 3 | #5, #11, #3 | 3.0% | $332 per $10 |
| 4 | #5, #11, #10 | 2.4% | $413 per $10 |
| 5 | #5, #1, #4 | 2.1% | $481 per $10 |
| 6 | #5, #1, #3 | 1.7% | $579 per $10 |
| 7 | #5, #4, #3 | 1.7% | $584 per $10 |

Estimated chance the ticket hits (sum of 10 combos): about 22%. Harville gives #5 a top-3 chance of about 50%. MC's direct place figure is 44.8%, so the realistic hit rate is about 19–20%.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: 膽 #5 | 腳 #11, #1, #4, #3, #10

20%-variant (SKILL.md line 650 Adj Place% ≥ 20% rule): 膽 #5 | 腳 #11, #1, #4, #3, #10, #8 → C(6,2) = 15 combos, $150 (est. hit ≈ 29%)

TOP COMBINATIONS (highest value):
  5-11-1 (3.7%), 5-11-4 (3.6%), 5-11-3 (3.0%), 5-11-10 (2.4%), 5-1-4 (2.1%), 5-1-3 (1.7%), 5-4-3 (1.7%)
```

Value note: the banker is a 22 shot, so any hit includes a horse the market rates lowly. Even with the market's top choices (#4 3.5, #1 4.9, #3 6.1, #11 6.8) as the other two, the dividend should be well above a chalky trio. The fair odds above ($274–$584 per $10) show how wide the race is.

PASS CONDITIONS:
- If #5 ALWAYS MY FOLKS (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding/Soft or worse → re-run the MC.
- If #5 drifts beyond ~30 late (no market support at all for the MC #1) → consider PASS. With raw MC < 20% this race is otherwise Wide open (default PASS).
- If a leg is scratched → drop it (C(4,2) = 6 combos, $60).

CONFIDENCE: LOW.
- Strengths: MC #1 is a large overlay (+69% Place edge). #5 and #11 are clear of the rest on both MC and adjusted figures. The top MC quinella 5-11 is in every top-5 combo, and the pool covers 6 of 12 runners, including the four market favourites.
- Risks:
  - The classification is marginal: Competitive only by the excuses +2, and Wide open on raw MC.
  - The banker has about a 45% place chance, ranks 8th in the market and comes from gate 10, a wide draw for HV 1,200m. Its last run was keen and wide.
  - Ratings are bunched (7 horses within 8 points).

CAVEATS:
- **SCMP data is partial.** Star Form, TIR, Vet and Trackwork were read. Each horse shows three unlabelled odds figures (for example #4 3.5 / 3.3 / 1.5 and #11 11 / 8.4 / 2.0). They are consistent with the HKJC order but cannot be mapped to win/place with certainty. The Q/QP matrix was not parsed, so no QP cross-reference was done.
- The SCMP figures suggest late moves after the 11:01 snapshot: #11 is 6.8 on HKJC vs 8.4–11 on SCMP, and #9 is 11 vs 9.5. If #9 shortens below 10, it becomes a Strategy B Win-odds candidate and would replace #10 (see below).
- Classification hinges on #5's excuses +2 (wide trip). The same TIR says it was keen and failed to respond, so the excuse is debatable.
- The speed-figure projection ranks #1 11th and #4 9th, which conflicts with their market and MC standing.
- The Harville hit rates come from normalised win probabilities and overstate the banker's top-3 chance compared with MC place.
- Odds are from the 11:01 HKT early pool. The pool will move before the 7:10pm jump.
- Historical sync was not re-run in this session (already done per instruction). R10/R11 in the odds file are phantom duplicates of R1 and were ignored.
```

## STRATEGY B (MC-only)

```
Banker: #5 ALWAYS MY FOLKS (MC Win% 18.1%, MC Place% 44.8%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #11 (40.9%), #4 (33.3%), #3 (30.2%), #1 (29.8%), #10 (26.8%), #8 (24.0%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #10 RUNJEET (MC Place% 26.8%, Win odds 23)
  (#1 is 29.8% but at 4.9; #8 is 24.0% but at exactly 10, not > 10.)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
  (#9 WINNING NOW is 11 on HKJC, so it is not < 10. All other sub-20% horses are 21+.)
Action: none — no candidate, so no replacement or addition
Final legs: #11, #4, #3, #1, #10, #8
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #5 | 腳 #11, #4, #3, #1, #10, #8

Top combos (Harville, raw MC Win%): 5-11-4 (3.5%), 5-11-3 (2.9%), 5-11-1 (2.9%), 5-11-10 (2.3%),
  5-11-8 (2.1%), 5-4-3 (2.0%), 5-4-1 (2.0%), 5-3-1 (1.7%). Est. ticket hit ≈ 29% (upper bound).

Late-odds trigger: if #9 WINNING NOW is < 10 at the off (SCMP shows 9.5), swap #10 → #9
  (legs #11, #4, #3, #1, #8, #9; still 15 combos, $150).
```

Comparison vs Strategy A: both use #5 as banker. Strategy B has one extra leg, #8 NOBLE FANS (MC Place% 24.0% > 20%), so it costs 15 combos / $150 against Strategy A's 10 combos / $100. Strategy A applies the 25% must-include threshold, and #8 misses it. The SCMP adjustments (excuses on #5, #11, #1; trial on #7) only reorder Strategy A's legs and lift #5 from Wide open to Competitive. Strategy B would also change if the #9 late-odds swap is triggered.

```
═══════════════════════════════════════════════════════════
```
