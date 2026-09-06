═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-06 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings (2 reserves declared)
MC SIMULATION: 10,000 iterations — **output judged unreliable for this race, see MODEL FAILURE**
HISTORICAL SYNC: ✅ 218/219 fixtures scraped
SCMP DATA: ✅ Loaded — Star Form + TIR + Vet + trackwork for all 14 runners (richest card so far this meeting)
ODDS SOURCE: HKJC early-morning pool (`fetch-odds.ts`, captured 20:07 HKT 05-Sep), full 14-horse coverage. SCMP cross-checked — **the two place pools disagree materially on #4 and #7**, see caveats.

RACE: R4 HARCOURT HANDICAP — Class 5 | 1600m | Turf | Good | 14 runners | $875,000
CLASSIFICATION: Dominant (top Adj Win% 50.0%) | POOL SIZE: 5
MODE: A — Tight Pool (5)
BET STRUCTURE: 膽拖 1膽 + 4腳 → C(4,2) = 6 | UNIT BET: $10

## ►► RECOMMENDATION: **PASS (Mode D)** ◄◄

The pipeline produces a coherent-looking ticket. The market says it loses 97.3% of the time. The MC that produced it is measurably inverted on this field. Detail below.

───────────────────────────────────────────────────────────
MODEL FAILURE — SAME DEFECT AS R3, NOW MEASURABLE
───────────────────────────────────────────────────────────
R3's report noted that the MC strength model "does not convert class level or absolute time into a proportionate edge". R4 is a **mixed-class field**, which exposes that defect directly and lets it be quantified.

**1. The MC composite rating is essentially uncorrelated with the official HKJC rating.**

Pearson **r = +0.195** across the 14 runners. The two extremes invert completely:

| | Official rtg | MC composite | MC rank | Recent form class | Pace (s/100m) |
|---|---|---|---|---|---|
| #1 AMAZING DUCK | **40 — highest in field** | 46 | **11th of 14** | Class 4 ×6 | **5.914 — fastest** |
| #14 PERFECT PAIRING | **25 — lowest in field** | 52 | 7th of 14 | Class 5 ×6 | 6.204 — slowest |
| #2 HAILTOTHEVICTORS | 39 | **69 — highest** | 1st | Class 5 ×6 | 6.124 |

**2. The driver is the class of recent form, and the sign is backwards.** Every runner whose last six starts were in Class 5 is rated up; every runner dropping down from Class 4 is rated down. #1 AMAZING DUCK has the highest official rating, the fastest average pace in the field, is **dropping from Class 4 into Class 5**, and has Purton aboard — the classic well-in-at-the-weights profile, which the market prices at 4.1. The MC gives it **0.4% win / 3.8% place**.

**3. The finish-time projection is inverted again.** #1's actual recorded 1600m times are 94.64 / 94.75 / 95.36 / 95.95 (= 1:34.64 at best). The projection puts him at **1:41.03, 43.7 lengths last**, and nominates #13 HAPPY BUDDIES — official rating 26, form 6/11/7/12/6/13, 40 in the market — as the winner.

**Scope note on the earlier reports:** R1 and R2 were single-class fields (Class 5 ×14 and Class 4 ×11), so every runner's form came from the same class and this defect was largely inert there. Those two reports stand. R3 and R4, both mixed-class or mixed-grade, are where it bites.

**How wrong the ticket is, in coverage terms:**

| Ticket | Combos | Stake | MC-Adj coverage | **Market coverage** |
|---|---|---|---|---|
| Strategy A (skill-mandated) — 膽 #2 + 腳 #3,#8,#9,#10 | 6 | $60 | 41.7% | **2.7%** |
| Strategy B — 膽 #2 + 腳 #1,#3,#5,#9,#10 | 10 | $100 | 34.4% | **5.1%** |

A 15-fold disagreement. Every combination on the Strategy A ticket carries market fair odds between **$106 and $531**.

───────────────────────────────────────────────────────────
A SECOND FINDING — RULE 9 CANNOT BE SATISFIED IN MODE A
───────────────────────────────────────────────────────────
Skill rule 9: *"No hard exclusion if market odds <= 15 — the market knows about injuries, vet flags, and fitness. If a horse is 15 odds or shorter, include in the pool."*

**Eight runners are at 15 or shorter**: #1 (4.1), #10 (5), #5 (7.9), #2 (11), #9 (11), #7 (12), #11 (14), #8 (15).

Mode A permits a **5-horse pool**. The rule requires 8. The two are structurally incompatible whenever a competitive handicap has six or more runners inside 15 — which is common. Mode A silently excludes #1, #5, #7 and #11, three of which are among the market's four most likely top-3 finishers. A rule-9-compliant ticket (膽 #10 + the other seven) would be 21 combos at $210 and covers **19.6%** on market pricing — 7× the coverage of the skill's ticket for 3.5× the cost.

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — reported as required, not trusted
───────────────────────────────────────────────────────────

| #  | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Off.Rtg | Age | Draw | Form (last 6) | Role (Strategy B) | Top Quinella (fair) |
|----|-------|---------|-----------|----------|------------|-------------|---------|-----|------|---------------|-------------------|---------------------|
| 2  | HAILTOTHEVICTORS | 57.1% | 86.1% | 11  | ✅ | ❌ | 39 | 5 | 2  | 3/8/2/10/4/4  | ★ 膽 (Banker) | 2-3: 20.6% (4.8) |
| 3  | SOARING BRONCO   | 12.7% | 47.7% | 16  | ✅ | ❌ | 38 | 6 | 14 | 3/3/2/1/10/12 | 腳 (Leg) | 2-9: 16.9% (5.9) |
| 9  | SETANTA          | 10.3% | 42.2% | 11  | ✅ | ❌ | 33 | 9 | 5  | 7/4/2/8/10/6  | 腳 (Leg) | 2-8: 9.8% (10.2) |
| 8  | GOLDEN FORTUNE   | 5.2%  | 28.3% | 15  | ✅ | ❌ | 33 | 5 | 11 | 5/2/2/11/13/8 | — (replaced by #1) | 2-10: 8.5% (11.8) |
| 10 | GENERAL SMART    | 4.9%  | 25.1% | 5   | ✅ | ✅ | 29 | 5 | 6  | 3/8/4/12/13/2 | 腳 (Leg) | 2-7: 5.5% (18.1) |
| 7  | ALL ARE MINE     | 2.8%  | 17.5% | 12  | ❌ | ❌ | 33 | 7 | 7  | 1/6/9/6/3/6   | — | — |
| 14 | PERFECT PAIRING  | 2.3%  | 14.5% | 19  | ❌ | ❌ | 25 | 7 | 4  | 4/4/2/8/4/7   | — | — |
| 13 | HAPPY BUDDIES    | 1.8%  | 13.2% | 40  | ❌ | ❌ | 26 | 5 | 10 | 6/11/7/12/6/13| — | — |
| 11 | MAZING GRACE     | 1.4%  | 9.8%  | 14  | ❌ | ❌ | 28 | 4 | 13 | 5/14/5/6/14/10| — | — |
| 6  | SPLENDID FORCE   | 0.9%  | 7.0%  | 34  | ❌ | ❌ | 34 | 5 | 8  | 11/8/2/7/8/13 | — | — |
| 1  | AMAZING DUCK     | 0.4%  | 3.8%  | 4.1 | ❌ | ✅ | **40** | 7 | 12 | 3/4/3/9/5/2   | 腳 (Leg — replacement) | — |
| 5  | FIGHTING MACHINE | 0.2%  | 2.3%  | 7.9 | ❌ | ✅ | 35 | 7 | 1  | 9/11/8/7/10/14| 腳 (Leg — added) | — |
| 12 | GO GO GO         | 0.1%  | 2.0%  | 27  | ❌ | ❌ | 26 | 7 | 3  | 3/5/1/10/4/6  | — | — |
| 4  | I EXCELLE        | 0.0%  | 0.5%  | 17  | ❌ | ❌ | 36 | 5 | 9  | 6/4/10/13/11/11| — | — |

**Market:** overround 22.8%. Favourite bias −98.4%, longshot bias −61.2%. The model claims #2 is undervalued by 642%. Given the rating diagnostic above, read that as a model artefact, not an edge.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|------------|------|
| 1 | 2 | HAILTOTHEVICTORS | 57.1% | 86.1% | excuses +2 | excuses +2 | **50.0%** ⚠ | **85.0%** ⚠ | 11 | L Ferraris | 2 | +excuses (steadied when crowded) | ★ 膽 (Banker) |
| 2 | 3 | SOARING BRONCO | 12.7% | 47.7% | excuses +2 | excuses +2 | 14.7% | 49.7% | 16 | J Orman | 14 | +excuses (no clear run 450–400M); draw won't help | 腳 (Leg) |
| 3 | 9 | SETANTA | 10.3% | 42.2% | excuses +2, -injury30d −3 | excuses +2, -injury30d −4 | 9.3% | 40.2% | 11 | K C Leung | 5 | +excuses (hampered 1400M); −injury30d (lame RH, passed 20/08) | 腳 (Leg) |
| 4 | 10 | GENERAL SMART | 4.9% | 25.1% | +form +1 | +form +1 | 5.9% | 26.1% | 5 | A Atzeni | 6 | +form (nose 2nd, close 3rd from gate 14) | 腳 (Leg) |
| 5 | 8 | GOLDEN FORTUNE | 5.2% | 28.3% | 0 | 0 | 5.2% | 28.3% | 15 | H Bowman | 11 | — | 腳 (Leg) |
| 6 | 7 | ALL ARE MINE | 2.8% | 17.5% | +form +1 | +form +1 | 3.8% | 18.5% | 12 | A Badel | 7 | +form (won last from near last); untried at 1600m | out |
| 7 | 11 | MAZING GRACE | 1.4% | 9.8% | excuses +2 | excuses +2 | 3.4% | 11.8% | 14 | M L Yeung | 13 | +excuses (crowded on jumping, steadied 1000M) | out |
| 8 | 1 | AMAZING DUCK | 0.4% | 3.8% | trial +2 | trial +2 | 2.4% | 5.8% | 4.1 | Z Purton | 12 | +trial (galloped strongly Tue, "rates highly") | **out — see failure note** |
| 9 | 14 | PERFECT PAIRING | 2.3% | 14.5% | 0 | 0 | 2.3% | 14.5% | 19 | M F Poon | 4 | — | out |
| 10 | 13 | HAPPY BUDDIES | 1.8% | 13.2% | 0 | 0 | 1.8% | 13.2% | 40 | M Chadwick | 10 | — | out |
| 11 | 5 | FIGHTING MACHINE | 0.2% | 2.3% | 0 | 0 | 0.2% | 2.3% | 7.9 | B Avdulla | 1 | slow to begin (no code) | out |
| 12 | 12 | GO GO GO | 0.1% | 2.0% | 0 | 0 | 0.1% | 2.0% | 27 | K Teetan | 3 | — | out |
| 13 | 6 | SPLENDID FORCE | 0.9% | 7.0% | excuses +2, -injury30d −3 | excuses +2, -injury30d −4 | 0.0% | 5.0% | 34 | C Y Ho | 8 | +excuses (bumped, restricted); −injury30d (lame both hind, passed 31/08 — **6 days out**) | out |
| 14 | 4 | I EXCELLE | 0.0% | 0.5% | 0 | 0 | 0.0% | 0.5% | 17 | Y L Chung (-2) | 9 | — | out |

⚠ **Cap applied to #2:** raw MC Win 57.1% + 2 = 59.1%, capped to **50.0%**; Place 86.1% + 2 = 88.1%, capped to **85.0%**. Note the Win cap pulls the adjusted figure *below* the raw MC value — the cap rule reads as designed for adjustment-driven excursions rather than for a horse already above 50% before adjustment. It changes nothing here: #2 is Dominant either way.

**Factor legend:** `+trial +2` (trackwork), `+form +1` (improving/placing form), `excuses +2` (TIR bad luck), `-injury30d −3 Win / −4 Place` (vet clearance inside 30 days).

**`-age` not applied.** The skill scopes the 8yo+ penalty to "C3+ races". Read as *Class 3 and better* (the convention where Class 1 outranks Class 5), a Class 5 handicap does not qualify — so #9 SETANTA (9) takes no age penalty here, whereas #5 and #4 in R3's Group 3 did. If you read "C3+" as *Class 3 through Class 5* instead, #9 loses a further 2% Win and drops one rank; it stays in the pool either way. Flagging because the wording is genuinely ambiguous.

**Two sub-30-day vet clearances:** #6 SPLENDID FORCE (lame both hind 05/07, passed **31/08 — 6 days before the race**) and #9 SETANTA (lame right hind 13/08, passed **20/08 — 17 days**). #9 survives in the pool on Adj Place% 40.2%; #6 was never near it.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #2, #3, #9, #8, #10 | MODE: A (Tight Pool) | POOL SIZE: 5
Must-include check (Adj Place% ≥ 25%): #2 (85.0), #3 (49.7), #9 (40.2), #8 (28.3), #10 (26.1) — exactly these five ✅

膽 (Banker): **#2 HAILTOTHEVICTORS** (Adj Place% 85.0%) — 10 starts, eligible
腳 (Legs): #3, #8, #9, #10
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = **6** | TOTAL STAKE: **$60**
雙膽拖 check: 2nd-ranked #3 Adj Place% 49.7% < 63% → single banker.

| Combo | MC-Adj prob | **Market prob** | Market fair odds |
|-------|-------------|-----------------|------------------|
| 2-3-9  | 13.99% | 0.19% | $531 |
| 2-3-10 | 8.53%  | 0.47% | $211 |
| 2-3-8  | 7.37%  | 0.30% | $336 |
| 2-9-10 | 4.92%  | 0.49% | $203 |
| 2-8-9  | 4.28%  | 0.35% | $289 |
| 2-8-10 | 2.62%  | 0.94% | $106 |
| **Total** | **41.7%** | **2.7%** | |

HKJC BET SLIP (if played): Race 4 → Trio → 膽拖 → 膽: 2 | 腳: 3, 8, 9, 10 | $10/combo

PASS CONDITIONS: #2 scratched → void. Going to Yielding/Heavy → re-run.
CONFIDENCE: **N/A — PASS recommended**

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#2 HAILTOTHEVICTORS** (MC Win% 57.1%, MC Place% 86.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3 (47.7%), #9 (42.2%), #8 (28.3%), #10 (25.1%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **#8 GOLDEN FORTUNE** (28.3%, odds 15). #10 (25.1%) is in the band but its odds are 5, not > 10.
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **#1 AMAZING DUCK** (4.1, 3.8%), **#5 FIGHTING MACHINE** (7.9, 2.3%)
Action (by Win odds ascending):
  1. **#1 (4.1) replaces #8** — #8 was the only replaceable leg.
  2. **#5 (7.9): no replaceable leg remains** (#3 and #9 are above 30%, #10's odds are 5, #1 is outside the band) → **added directly**.
Final legs: **#1, #3, #5, #9, #10**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10** | TOTAL STAKE: **$100**
COVERAGE: MC-Adj 34.4% | raw MC 35.0% | **Market 5.1%**

| Combo | Market prob | Fair | | Combo | Market prob | Fair |
|-------|-------------|------|-|-------|-------------|------|
| 1-2-10 | 1.28% | $78  | | 1-2-3  | 0.44% | $229 |
| 2-5-10 | 0.66% | $152 | | 2-5-9  | 0.26% | $390 |
| 1-2-5  | 0.62% | $162 | | 2-3-5  | 0.24% | $421 |
| 2-9-10 | 0.49% | $203 | | 2-3-9  | 0.19% | $531 |
| 2-3-10 | 0.47% | $211 | |        |       |      |
| 1-2-9  | 0.47% | $213 | |        |       |      |

HKJC BET SLIP (if played): Race 4 → Trio → 膽拖 → 膽: 2 | 腳: 1, 3, 5, 9, 10 | $10/combo

**A vs B comparison:** The two diverge more than in any race this meeting, and **Strategy B is the better of the two — because its rules are partly market-driven and therefore partly immune to the model failure.** B's Win-odds step drags in #1 AMAZING DUCK (market's 2nd-most-likely top-3 finisher at 38.9%) and #5 FIGHTING MACHINE (24.0%), both of which Strategy A's purely MC-driven pool discards. That nearly doubles market coverage, 2.7% → 5.1%. It is still a bad ticket in absolute terms, because both share the same banker — #2, whom the market rates at just 21.5% to make the frame. When the banker is wrong, no leg selection rescues the ticket.

───────────────────────────────────────────────────────────
IF YOU INSIST ON PLAYING — market-anchored alternatives
───────────────────────────────────────────────────────────
Derived by fitting Plackett-Luce strengths to the HKJC place pool (14 runners → place pays top 3, so the place pool *is* a direct read on top-3 probability; targets reproduced to within 0.3pp).

Market top-3: **#10 GENERAL SMART 40.8%**, #1 AMAZING DUCK 38.9%, #8 GOLDEN FORTUNE 31.4%, #11 MAZING GRACE 27.2%, #5 FIGHTING MACHINE 24.0%, #2 HAILTOTHEVICTORS 21.5%.

| Option | Structure | Combos | Stake | Market coverage |
|---|---|---|---|---|
| Market 5-pool | 膽 #10 + 腳 #1, #5, #8, #11 | 6 | $60 | 8.4% |
| Rule-9 compliant | 膽 #10 + 腳 #1, #5, #2, #9, #7, #11, #8 | 21 | $210 | **19.6%** |
| Skill Strategy A | 膽 #2 + 腳 #3, #8, #9, #10 | 6 | $60 | 2.7% |

**These are alternatives, not recommendations.** A model fitted to the market cannot, by construction, find value against that market — it reproduces the market's own probabilities, so betting it means paying the ~25% Trio takeout with no demonstrated edge. Its only merit over the skill ticket is that it does not back horses the pool rates at 15× longer than the model claims.

**Why PASS is the honest answer:** an edge has to come from somewhere. The MC is demonstrably inverted on mixed-class fields, so it cannot supply one here. The market-anchored model has no edge by definition. With no trustworthy probability estimate, there is no basis for a bet. Skill rule 6: not every race is a Trio race. R1 and R2 — single-class fields where the defect is inert — are where this meeting's bankroll belongs.

CAVEATS:
1. MC output unreliable for this race; see MODEL FAILURE. Root cause is the strength model's handling of class, unfixed and beyond this request's scope. The `raceCard.ts:790` rating-bound bug fixed during R3 is a separate, already-resolved issue.
2. `winningMargin` still duplicates `finishPosition` on every past-performance row (noted in R3, unfixed).
3. **The two place pools disagree materially.** #4 I EXCELLE: HKJC place 4.6 (17.7% top-3) vs SCMP 3.1 (26.4%). #7 ALL ARE MINE: HKJC 4.6 (17.7%) vs SCMP 3.6 (22.8%). #7's win odds also differ enough to change Strategy B: HKJC 12 (not a Win-odds candidate) vs SCMP 7.6 (**would be** a candidate). HKJC was used as primary per skill 1e-i, since `fetch-odds.ts` returned complete coverage. Both pools carry ~22% overround and look genuine, so this is early-market disagreement, not a scrape error.
4. #5 FIGHTING MACHINE sits exactly on the Strategy B boundary: HKJC 7.9 (< 10, qualifies) vs SCMP 10 (not < 10, would not). Its inclusion is source-dependent.
5. Season opener — 0 jockey profiles and 0 trainer profiles loaded, as in R1–R3.
6. The `-age` "C3+" scoping is ambiguous; resolved as *Class 3 and better*, which spares #9 SETANTA. Documented above.
7. Two reserves (THE CONCENTRATION, PEARL OF PANG'S) are declared. If either replaces a scratching the field changes and the whole analysis needs re-running.
═══════════════════════════════════════════════════════════
