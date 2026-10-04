# Trio (單T) Strategy — Sha Tin 2026-10-04 Race 6

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey + trainer stats loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds + Q matrix look mis-parsed)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261004_ST.json, captured 10:22 HKT 04-Oct)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R6 — Class 4 | 1400m | Turf | Good | 14 runners — THE YAN CHAI TROPHY (HANDICAP)
CLASSIFICATION: Competitive (top Adj Win% 31.0%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-04 | Going: Good | Surface: Turf
Target Race(s): R6 (Class 4 | 1400m | 14 runners)
Scratchings: none (reserves FIND MY LOVE, FLASH CURRENT not running)
Odds coverage: 14 horses with odds (HKJC win + place)
SCMP data: ⚠️ partial
Form gaps: #5 PEGASUS ELITE is a debutant (0 starts; trials only). #1 SUGAR GOODSON and #8 HERO RISING have 3 starts each.
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | GRAND PATCH | 27.0% | 59.7% | 2.6 | ✅ | ✅ | 4/1/3/10/7 | ★ 膽 (Banker) | 2-11: 11.4% (8.8) |
| 6 | MR COOL | 18.8% | 49.0% | 6.5 | ✅ | ✅ | 8/4/3/3/3/4 | 腳 (Leg) | 2-6: 11.1% (9.0) |
| 11 | TOP TO SKY | 18.2% | 48.7% | 21 | ✅ | ❌ | 12/1/1/7/10/8 | 腳 (Leg) | 2-11: 11.4% (8.8) |
| 3 | POSITIVE SMILE | 13.2% | 40.3% | 5.6 | ✅ | ✅ | 9/7/11/3/7/6 | 腳 (Leg) | 2-3: 8.1% (12.3) |
| 8 | HERO RISING | 7.2% | 26.5% | 11 | ✅ | ❌ | 4/7/5 | 腳 (Leg) | — |
| 1 | SUGAR GOODSON | 4.6% | 17.6% | 27 | ❌ | ❌ | 13/10/8 | — | — |
| 4 | COPARTNER FLEET | 3.0% | 13.7% | 43 | ❌ | ❌ | 10/5/10/5/12/8 | — | — |
| 10 | SUPERB KID | 2.5% | 12.3% | 28 | ❌ | ❌ | 13/7/7/7/10/7 | — | — |
| 9 | SHOTGUN | 1.7% | 8.7% | 10 | ❌ | ❌ | 7/13/3/4/1/2 | — | — |
| 5 | PEGASUS ELITE | 1.3% | 7.3% | 19 | ❌ | ❌ | (debut) | — | — |
| 12 | GOLDENTRONICMIGHTY | 1.1% | 6.0% | 39 | ❌ | ❌ | 13/5/7/7/7/9 | — | — |
| 7 | LESLIE | 0.7% | 4.6% | 26 | ❌ | ❌ | 8/11/1/11/7/4 | — | — |
| 14 | VIEW ALL THINGS | 0.6% | 4.5% | 21 | ❌ | ❌ | 7/7/12/10/9/1 | — | — |
| 13 | APOLAR FIGHTER | 0.1% | 1.1% | 58 | ❌ | ❌ | 7/8/10/14/1/2 | — | — |

Market: overround 23.3%, favourite bias −29.9%. MC agrees with the market on #2 as favourite but makes it shorter-priced than its true chance justifies (value 0.70). The biggest gap is #11 TOP TO SKY (21 in the market vs MC 18.2% win), which MC rates undervalued by 283%. The market likes #3 (5.6) and #9 (10) more than MC does (#9 is only 8.7% place in MC).

Finish-time projection (MC): #6 MR COOL fastest at 1:21.12. #4, #11, #10, #7, #8 are +1.5–1.8s behind, and #2 and #3 are +1.96s. #2's ranking comes from form, consistency and class rather than raw speed figures.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 2 | GRAND PATCH | 27.0% | 59.7% | excuses +2, trial +2 | excuses +2, trial +2 | 31.0% | 63.7% | 2.6 | C Y Ho | 5 | 130 | Stalk (handy) | +excuses, +trial | ★ 膽 (Banker) |
| 2 | 11 | TOP TO SKY | 18.2% | 48.7% | excuses +2, +form +1 | excuses +2, +form +1 | 21.2% | 51.7% | 21 | H Y Yuen (-7) | 14 | 120 | Front (made all) | +excuses, +form | 腳 (Leg) |
| 3 | 6 | MR COOL | 18.8% | 49.0% | 0 | 0 | 18.8% | 49.0% | 6.5 | K Teetan | 2 | 126 | Stalk | — | 腳 (Leg) |
| 4 | 3 | POSITIVE SMILE | 13.2% | 40.3% | trial +2 | trial +2 | 15.2% | 42.3% | 5.6 | Z Purton | 7 | 130 | Midfield / closer | +trial | 腳 (Leg) |
| 5 | 8 | HERO RISING | 7.2% | 26.5% | 0 | 0 | 7.2% | 26.5% | 11 | L Hewitson | 4 | 124 | On-pace (led 850m out) | — | 腳 (Leg) |
| 6 | 9 | SHOTGUN | 1.7% | 8.7% | trial +2 | trial +2 | 3.7% | 10.7% | 10 | M F Poon | 8 | 124 | Front | +trial | — |
| 7 | 4 | COPARTNER FLEET | 3.0% | 13.7% | 0 | 0 | 3.0% | 13.7% | 43 | C L Chau (-2) | 13 | 129 | Back | — | — |
| 8 | 1 | SUGAR GOODSON | 4.6% | 17.6% | -perf −2 | -perf −2 | 2.6% | 15.6% | 27 | K C Leung | 3 | 135 | Back | -perf | 腳 (Leg) |
| 9 | 10 | SUPERB KID | 2.5% | 12.3% | 0 | 0 | 2.5% | 12.3% | 28 | P N Wong (-7) | 1 | 122 | Back (slow to begin) | — | — |
| 10 | 5 | PEGASUS ELITE | 1.3% | 7.3% | 0 | 0 | 1.3% | 7.3% | 19 | L Ferraris | 11 | 127 | — (debut) | (trials made inroads late) | — |
| 11 | 12 | GOLDENTRONICMIGHTY | 1.1% | 6.0% | 0 | 0 | 1.1% | 6.0% | 39 | M L Yeung | 6 | 119 | — | (roarer noted) | — |
| 12 | 7 | LESLIE | 0.7% | 4.6% | 0 | 0 | 0.7% | 4.6% | 26 | R Kingscote | 12 | 125 | Close | (8yo, C4 so no age penalty) | — |
| 13 | 14 | VIEW ALL THINGS | 0.6% | 4.5% | 0 | 0 | 0.6% | 4.5% | 21 | M Chadwick | 9 | 115 | Close | — | — |
| 14 | 13 | APOLAR FIGHTER | 0.1% | 1.1% | 0 | 0 | 0.1% | 1.1% | 58 | A Badel | 10 | 117 | Close | — | — |

Factor labels: excuses +2 (crowded/steadied/held up/wide), trial +2, +form +1 (made all/improved/rallied), -perf −2 (stewards: unacceptable performance), -injury30d −3/−4, -barrier −1 (≥2 runs), -notRO −2, -age −2 (8yo+ in C3 and above only). Caps are ±8 win / ±10 place. The table is ordered by Adj Win%, except that pool membership for the 6th slot follows Adj Place% (see below). Banker eligibility: #2 has 5 starts, so it is eligible.

SCMP adjustments applied:
- **#2 GRAND PATCH**: steadied near 700m and was held up for clear running twice when 4th first-up, so excuses +2. Won its latest trial (on dirt) "under a hold", so trial +2.
- **#11 TOP TO SKY**: bumped at the start, crossed near 600m, and the rider reported the horse uncomfortable on Good to Firm, so excuses +2. It "easily made all" two starts back, so +form +1. Stewards called the run "disappointing" (not "unacceptable"), so no -perf penalty, but this is noted.
- **#3 POSITIVE SMILE**: "easily won a recent trial", so trial +2. Its last-start TIR complaint (raced on-pace against instructions) is tactical rather than trouble, so no excuses credit.
- **#9 SHOTGUN**: "two good trials", so trial +2.
- **#1 SUGAR GOODSON**: stewards and vet recorded an unacceptable performance on 06/09 (passed 21/09), so -perf −2.
- **#7 LESLIE**: 8yo vet note, but this is a Class 4 race, so the age penalty does not apply.

Reasoning: The race is a Class 4 1400m turf handicap. #2 GRAND PATCH is a clear MC top pick and market favourite. It was 3rd and then 1st over 1400m in June before a luckless 4th first-up in a strong race, and it won a trial since. #11 TOP TO SKY is the value play: back-to-back wins (the second making all) before a troubled 12th, now down to 45 with a 7lb claim. Gate 14 is a real concern for a front-runner, but MC still gives it 48.7% place. #6 MR COOL is the most consistent (placed 9 times from 11 starts last term) and is fastest on projected time from gate 2. #3 POSITIVE SMILE has Purton and a strong trial. #8 HERO RISING is lightly raced (3 starts) and showed early pace last time, so it should improve.
Pace: #11 and #9 are natural leaders and #8 pressed forward last time, so a fair-to-strong tempo is likely. That suits stalkers #2 and #6.

## TRIO POOL (Strategy A, any order)

```
POOL: #2, #11, #6, #3, #8, #1
MODE: B: Standard Pool (6) | POOL SIZE: 6
Selection: top 3 by Adj Win% (#2, #11, #6) + 3 by Adj Place% (#3 42.3%, #8 26.5%, #1 15.6%)
Must-include (Adj Place% ≥ 25%): #2, #11, #6, #3, #8 — all included

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 GRAND PATCH (Adj Win% 31.0%, Adj Place% 63.7%) ← locked in every combo
腳 (Legs):  #11, #6, #3, #8, #1
雙膽拖 check: 2nd-ranked #11 Adj Place% 51.7% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #2, #11, #6 | 13.1% | $76 per $10 |
| 2 | #2, #11, #3 | 10.1% | $99 per $10 |
| 3 | #2, #6, #3 | 8.7% | $115 per $10 |
| 4 | #2, #11, #8 | 4.4% | $228 per $10 |
| 5 | #2, #6, #8 | 3.8% | $266 per $10 |
| 6 | #2, #3, #8 | 2.9% | $345 per $10 |
| 7 | #2, #11, #1 | 1.5% | $661 per $10 |
| 8 | #2, #6, #1 | 1.3% | $772 per $10 |
| 9 | #2, #3, #1 | 1.0% | $1001 per $10 |
| 10 | #2, #8, #1 | 0.4% | $2324 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 10 combos): about 47%. Harville from win% tends to overstate how concentrated the finish is, so treat this as an upper bound.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: 膽 #2 | 腳 #11, #6, #3, #8, #1
  2-11-6, 2-11-3, 2-6-3, 2-11-8, 2-6-8, 2-3-8, 2-11-1, 2-6-1, 2-3-1, 2-8-1
```

Value note: #2 is the 2.6 favourite, so combos with #6 and #3 alone will pay modestly. The value is in combos with #11 TOP TO SKY (21) and #8 HERO RISING (11).

PASS CONDITIONS:
- If #2 GRAND PATCH (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going firms to Good to Firm → downgrade #11 (rider reported discomfort on that surface last start).
- If going turns Yielding/Soft → #11 (won a wet-track plunge) gains; keep the ticket.

CONFIDENCE: MEDIUM. The race is Competitive (31% top horse), the banker is the clear favourite with excuses, and MC and the market agree on the top three apart from #11.

CAVEATS:
- SCMP is partial. Win odds broadly match HKJC (#2 2.9 vs 2.6, #6 5.5 vs 6.5), but SCMP Place odds are equal to or above Win odds for most runners, and the Q figures (e.g. 2-9 = 11, 1-2 = 32) look mis-parsed or are not true pool odds. The Q/QP cross-reference was not used.
- 6th pool slot: strict Adj Place% ranking picks #1 SUGAR GOODSON (15.6%, 27 odds, flagged -perf) over #9 SHOTGUN (10.7%, 10 odds, +trial). #9 is the 4th-shortest in the market but MC rates it only 8.7% place. Neither strategy includes #9. This is a known pool-miss risk.
- #11 TOP TO SKY draws gate 14 (the widest) as a front-runner. MC does not model draw bias heavily, so its 48.7% place may be optimistic.
- #5 PEGASUS ELITE is a debutant (no form; MC 1.3%) at 19 in the market. It is unrated by the model.
- A scraper log line reported "distance=1200m" while parsing, but the saved race card, MC header and SCMP all confirm 1400m. The simulation ran at 1400m.
- Odds were captured at 10:22 HKT; the HKJC pool will move before the jump.
- Historical sync was not re-run in this session (it had already been done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #2 GRAND PATCH (MC Win% 27.0%, MC Place% 59.7%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (49.0%), #11 (48.7%), #3 (40.3%), #8 (26.5%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #8 HERO RISING (MC Place% 26.5%, Win odds 11)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
  (#9 SHOTGUN at exactly 10 is not < 10, so it does not qualify. Every sub-10 horse (#2, #3, #6) is already banker or leg.)
Action: no replacement or addition
Final legs: #6, #11, #3, #8
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 膽 #2 | 腳 #6, #11, #3, #8
  2-6-11 (12.4%), 2-6-3 (8.4%), 2-11-3 (8.0%), 2-6-8 (4.3%), 2-11-8 (4.1%), 2-3-8 (2.8%)
  Est. hit chance (Harville, raw MC): about 40%
```

Comparison: both strategies use the same banker (#2) and the same four core legs (#6, #11, #3, #8). Strategy A adds #1 SUGAR GOODSON as a 6th pool horse (Mode B needs 6), which adds 4 combos (+$40, $100 vs $60) for about 4% extra estimated hit probability. Strategy B is the cheaper, tighter ticket. If #1 does not reach the frame, B has the better return on the same core.

═══════════════════════════════════════════════════════════
