# Trio (單T) Strategy — Sha Tin 2026-10-04 Race 11

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 11
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, 14 jockey + 12 trainer profiles loaded) | Going: Good | Scratchings: SYMBOL OF STRENGTH (standby "R", per SCMP; not on HKJC card)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; Win/Place odds + Q/QP matrix mis-parsed)
ODDS SOURCE: HKJC pool (tools/analyze-race.ts live fetch; meeting file data/odds/odds_20261004_ST.json captured 10:22 HKT 04-Oct)
             SCMP odds: ⚠️ mis-parsed (not used) | HKJC: ✅ loaded

RACE: R11 — Class 3 | 1200m | Turf | Good | 14 runners — YAU KOM TAU HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 50.0%, capped) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-04 | Going: Good | Surface: Turf
Target Race(s): R11 (Class 3 | 1200m Turf | 14 runners)
Scratchings: none from the final field (SCMP lists standby SYMBOL OF STRENGTH as "R"/scratched)
Odds coverage: 14 horses with odds (HKJC win; place estimated from win by the tool)
SCMP data: ⚠️ partial
Form gaps: #6 RADIANT PATH has no HK starts (Australian form only; MC 0 form). #11 SHANGHAI WARRIOR has 1 HK start.
           #2 SOLID STATE and #7 GRAND EAGLE have 2 HK starts each. #2 is banker-eligible (≥ 2 starts).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6, latest first) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------------------------------|-------------------|--------------------------|
| 2 | SOLID STATE | 49.2% | 81.8% | 1.9 | ✅ | ✅ | 2/1 | ★ 膽 (Banker) | 1-2: 16.5% (6.1) |
| 1 | HELENE SUPAFEELING | 13.2% | 45.5% | 13 | ✅ | ❌ | 4/2/6/4/4/1 | 腳 (Leg) | 1-2: 16.5% (6.1) |
| 4 | GOLD PATCH | 10.7% | 40.7% | 21 | ✅ | ❌ | 9/7/3/1/1/3 | 腳 (Leg) | 2-4: 14.1% (7.1) |
| 5 | BUNTA BABY | 10.5% | 39.8% | 22 | ✅ | ❌ | 5/3/3/6/1/1 | 腳 (Leg) | 2-5: 13.9% (7.2) |
| 3 | LUCY IN THE SKY | 4.5% | 22.4% | 20 | ✅ | ❌ | 1/4/8/7/9/9 | — (replaced by #10) | 2-3: 6.4% (15.5) |
| 10 | PACKING GLORY | 3.6% | 18.2% | 8.9 | ❌ | ✅ | 1/2/4/5/3/3 | 腳 (Leg) — replaced #3 | 2-10: 5.2% (19.2) |
| 9 | ALMIGHTY LIGHTNING | 2.7% | 15.3% | 15 | ❌ | ❌ | 6/1/2/12/2/1 | — | — |
| 8 | CITY GOLD BANNER | 2.5% | 14.1% | 22 | ❌ | ❌ | 10/4/10/9/7/7 | — | — |
| 14 | MASTER PAYMENT | 2.0% | 13.1% | 20 | ❌ | ❌ | 12/1/2/2 | — | — |
| 13 | LIFELINE EXPRESS | 0.4% | 2.8% | 24 | ❌ | ❌ | 9/7/5/11/6/2 | — | — |
| 7 | GRAND EAGLE | 0.4% | 3.4% | 10 | ❌ | ❌ (exactly 10) | 7/11 | — | — |
| 6 | RADIANT PATH | 0.3% | 2.6% | 31 | ❌ | ❌ | — (HK debut) | — | — |
| 11 | SHANGHAI WARRIOR | 0.0% | 0.2% | 40 | ❌ | ❌ | 10 | — | — |
| 12 | VULCANUS | 0.0% | 0.1% | 39 | ❌ | ❌ | 11/11/8/1/7/4 | — | — |

Win odds are from the MC run's live HKJC fetch. The 10:22 meeting file is nearly identical (#10 9.5, #7 10, #5 21, #9 14).

Market: overround 24.5%. MC and the market agree on #2 SOLID STATE (49.2% MC vs ~42% implied at 1.9). The big disagreement is the next tier. MC rates #4 GOLD PATCH and #5 BUNTA BABY (both ~21) as undervalued by 124–132%. The market's 2nd and 3rd favourites, #10 PACKING GLORY (8.9) and #7 GRAND EAGLE (10), get only 18.2% and 3.4% MC Place%.

Finish-time projection (MC): #1 HELENE SUPAFEELING is fastest on speed figures (1:08.09), with #2 SOLID STATE +0.14s. Then come #3 (+0.84s) and #4 (+0.98s). #5 is +1.68s, and its MC rank comes from rating, form and the K L Man stable.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 2 | SOLID STATE | 49.2% | 81.8% | +form +1 (cap 50) | +form +1 | 50.0% | 82.8% | 1.9 | Z Purton | 7 | 135 | Front | +form | ★ 膽 (Banker) |
| 2 | 4 | GOLD PATCH | 10.7% | 40.7% | excuses +2, trial +2 | excuses +2, trial +2 | 14.7% | 44.7% | 21 | C Y Ho | 9 | 130 | Stalk | +excuses, +trial (blinkers) | 腳 (Leg) |
| 3 | 1 | HELENE SUPAFEELING | 13.2% | 45.5% | 0 | 0 | 13.2% | 45.5% | 13 | C L Chau (-2) | 4 | 135 | Closer (quickens) | — | 腳 (Leg) |
| 4 | 5 | BUNTA BABY | 10.5% | 39.8% | excuses +2 | excuses +2 | 12.5% | 41.8% | 22 | L Ferraris | 2 | 127 | On-pace | +excuses | 腳 (Leg) |
| 5 | 9 | ALMIGHTY LIGHTNING | 2.7% | 15.3% | excuses +2 | excuses +2 | 4.7% | 17.3% | 15 | K C Leung | 11 | 126 | Stalk | +excuses | — |
| 6 | 3 | LUCY IN THE SKY | 4.5% | 22.4% | 0 | 0 | 4.5% | 22.4% | 20 | P N Wong (-7) | 12 | 134 | Front | — (bleed history) | 腳 (Leg, Rule 8) |
| 7 | 8 | CITY GOLD BANNER | 2.5% | 14.1% | excuses +2 | excuses +2 | 4.5% | 16.1% | 22 | J Orman | 1 | 123 | Closer | +excuses | — |
| 8 | 10 | PACKING GLORY | 3.6% | 18.2% | 0 | 0 | 3.6% | 18.2% | 8.9 | H Y Yuen (-7) | 13 | 122 | Stalk | — | — |
| 9 | 11 | SHANGHAI WARRIOR | 0.0% | 0.2% | excuses +2 | excuses +2 | 2.0% | 2.2% | 40 | L Hewitson | 14 | 120 | On-pace | +excuses | — |
| 10 | 14 | MASTER PAYMENT | 2.0% | 13.1% | excuses +2, -injury30d −3 | excuses +2, -injury30d −4 | 1.0% | 11.1% | 20 | A Badel | 10 | 119 | Front | +excuses, -vet30d | — |
| 11 | 7 | GRAND EAGLE | 0.4% | 3.4% | 0 | 0 | 0.4% | 3.4% | 10 | A Atzeni | 3 | 126 | Back | — | — |
| 12 | 13 | LIFELINE EXPRESS | 0.4% | 2.8% | 0 | 0 | 0.4% | 2.8% | 24 | H Bentley | 5 | 119 | Closer | — | — |
| 13 | 6 | RADIANT PATH | 0.3% | 2.6% | 0 | 0 | 0.3% | 2.6% | 31 | M Chadwick | 6 | 127 | — | — (HK debut) | — |
| 14 | 12 | VULCANUS | 0.0% | 0.1% | 0 | 0 | 0.0% | 0.1% | 39 | H T Mo (-2) | 8 | 120 | — | — | — |

Factor labels: excuses +2 (steadied/crowded/held up/bumped/wide without cover), trial +2, +form +1 (made all/rallied/improved), -injury30d −3 win / −4 place. Caps are ±8 win / ±10 place and none were reached. The 50% Win cap was applied to #2 (49.2 + 1 = 50.2 → 50.0). Banker eligibility: #2 has 2 HK starts (2/1), so it is eligible.

SCMP adjustments applied:
- **#2 SOLID STATE**: "Emphatically made all" on its local debut (2 runs ago), then 2nd at 1.5 latest. +form +1. The TIR note (shifted in at start, laid in) is not an excuse flag.
- **#4 GOLD PATCH**: "Steadied when crowded approaching 700M", so excuses +2. Trackwork: "relished the addition of blinkers to win his latest trial and looks a major player here", so trial +2.
- **#5 BUNTA BABY**: "Crowded shortly after start, raced tight over concluding stages", so excuses +2.
- **#9 ALMIGHTY LIGHTNING**: "Had difficulty obtaining clear running when improving into a narrow run" near 200m, so excuses +2.
- **#8 CITY GOLD BANNER**: "bumped when taken wider" approaching 1000m, so excuses +2.
- **#11 SHANGHAI WARRIOR**: rider lost balance and his right foot was dislodged when the horse shifted in abruptly at 500m, so excuses +2.
- **#14 MASTER PAYMENT**: "Raced wide and without cover for the majority of the event", so excuses +2. Vet: "Disappointing performance (06/09/2026); passed exam (19/09/2026)". That pass was 15 days before the race (<30 days), so it is treated as -injury30d (−3 win / −4 place), consistent with the R9 handling of vet-exam passes.
- **#1 HELENE SUPAFEELING / #13 LIFELINE EXPRESS**: one-off "bumped shortly after the start" only. No adjustment.
- **#3 LUCY IN THE SKY**: Star Form says it "returned from a bleed with excuses in three consecutive defeats". There is no current vet entry and no specific TIR, so no adjustment. Noted as a caveat.

Reasoning: The race is a Class 3 1200m turf handicap. #2 SOLID STATE (Purton, rated 79, top weight 135) is a dominant MC top pick (49.2% win, 81.8% place) and a clear market favourite at 1.9. It won its local debut by making all and was a 1.5 favourite when 2nd over 1000m last time. The support tier is well separated from the rest. #1 (fastest on figures, consistent placer), #4 (blinkered trial win, excuses last time) and #5 (dual winner, crowded latest) all sit at 42–46% Adj Place%. After them there is a big drop to #3 (22.4%), and then nobody else is above 18.2%. Pace: #2, #3 and #14 are natural leaders. #2 from gate 7 should hold a forward spot, with #5 (gate 2) on pace and #4/#1 stalking or closing.

## TRIO POOL (Strategy A, any order)

```
POOL: #2, #4, #1, #5, #3
MODE: A (Dominant, #2 Adj Win% 50.0% ≥ 35%) | POOL SIZE: 5
  Mode A = banker + 4 by Adj Place% (#1 45.5, #4 44.7, #5 41.8, #3 22.4)
  Must-include (Adj Place% ≥ 25%): #2, #1, #4, #5 — all included
  Rule 8 (Adj Place% ≥ 20%): #3 (22.4%) — included
  Rule 9 check: no horse at ≤ 15 odds is being excluded because of a negative flag
              (#10 at 8.9, #7 at 10 and #9 at 15 are out on threshold only, not on flags)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 SOLID STATE (Adj Win% 50.0%, Adj Place% 82.8%) ← locked in every combo
腳 (Legs):  #4, #1, #5, #3
雙膽拖 check: 2nd-ranked #4 Adj Place% 44.7% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #2, #1, #4 | 11.7% | $86 per $10 |
| 2 | #2, #4, #5 | 11.0% | $91 per $10 |
| 3 | #2, #1, #5 | 9.6% | $104 per $10 |
| 4 | #2, #4, #3 | 3.6% | $278 per $10 |
| 5 | #2, #1, #3 | 3.2% | $316 per $10 |
| 6 | #2, #5, #3 | 3.0% | $337 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 6 combos): about 42%. Harville tends to overstate how concentrated the finish is, so treat this as an upper bound.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6 (膽拖: C(4,2), 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

TICKET: 膽 #2 | 腳 #4, #1, #5, #3
  2-1-4, 2-4-5, 2-1-5, 2-4-3, 2-1-3, 2-5-3
```

Value note: #2 is odds-on in spirit (1.9), so the value has to come from the legs. #4 and #5 are both ~21, and MC rates them as strongly undervalued. The 2-4-5 combo should pay well if the two mid-priced runners fill the frame.

PASS CONDITIONS:
- If #2 SOLID STATE (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If going changes to Yielding/Soft or worse → re-run the MC. #2 has only 2 runs, both on Good/Good to Firm.
- If #2 drifts beyond ~3.5 in late betting → reconsider the banker.

CONFIDENCE: MEDIUM-HIGH. The race is strongly Dominant (50% top horse), and MC and the market agree on the banker. The three main legs are clearly separated from the field. The risks are that the banker has only 2 runs and carries top weight (135) on a Class 3 rise, and that the market's #10 and #7 are outside the pool.

CAVEATS:
- SCMP is partial. Star Form, TIR, Vet and Trackwork parsed cleanly. The SCMP Win/Place odds are mis-parsed (e.g. #1 Win 2.9 / Place 15 vs HKJC 13), and the Q/QP matrix was not extractable, so the Q/QP cross-reference was not used.
- #14's −3/−4 comes from a "disappointing performance" vet exam passed on 19/09 (15 days before). That is a judgement call (not a strict injury). Without it, #14 would sit at 4.0% / 15.1% Adj, and the pool would be unchanged.
- #3 LUCY IN THE SKY has a bleed history (Star Form). It is in the pool only on Rule 8 (22.4%).
- Market pool-miss risk: #10 PACKING GLORY (8.9, 2nd fav, 1/2/4/5/3/3) and #7 GRAND EAGLE (10, 3rd fav) are outside Strategy A. MC rates both much lower than the market does (#7 has only 2 HK runs: 7/11). Strategy B covers #10.
- #6 RADIANT PATH is making its HK debut on Australian form. MC has no form for it (2.6% place), so it is effectively unrated.
- Odds were captured on the morning of race day; the HKJC pool will move before the jump. #7 sits at exactly 10. If it shortens below 10, it becomes a Strategy B Win-odds candidate.
- Historical sync was not re-run in this session (already done, per instruction).

## STRATEGY B (MC-only)

```
Banker: #2 SOLID STATE (MC Win% 49.2%, MC Place% 81.8%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #1 (45.5%), #4 (40.7%), #5 (39.8%), #3 (22.4%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #3 LUCY IN THE SKY (MC Place% 22.4%, Win odds 20)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
  #10 PACKING GLORY (Win odds 8.9, MC Place% 18.2%)
  (#7 GRAND EAGLE at exactly 10 does not qualify; < 10 is required)
Action: #10 replaced #3 (1-for-1 swap)
Final legs: #1, #4, #5, #10
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 膽 #2 | 腳 #1, #4, #5, #10
  2-1-4 (13.2%), 2-1-5 (12.9%), 2-4-5 (10.0%), 2-1-10 (4.0%), 2-4-10 (3.1%), 2-5-10 (3.1%)
  Est. hit chance (Harville, raw MC): about 46%
```

Comparison: both strategies use the same banker (#2) and the same three core legs (#1, #4, #5), and both cost $60 for 6 combos. The only difference is the fourth leg. Strategy A keeps #3 LUCY IN THE SKY (Rule 8, MC Place% 22.4%). Strategy B swaps in the market's 2nd favourite #10 PACKING GLORY (8.9). B covers the main market pool-miss risk at no extra cost.

═══════════════════════════════════════════════════════════
