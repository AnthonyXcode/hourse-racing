═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-09 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --form-data all`, HV + ST form, 2,251 historical races / 2,311 indexed performances; 12/12 horses enriched)
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction)
SCMP DATA: ✅ Loaded — Win/Place odds, Star Form, TIR, Vet, Trackwork for all 12 runners (tipster picks ignored per skill rule 13)
ODDS SOURCE: **HKJC early-morning pool** (`fetch-odds.ts`, captured 01:19 HKT 09-Sep) — complete for all 12 runners
             SCMP odds: ✅ loaded (cross-check, agrees within ~0.5 on every runner) | HKJC live: ❌ not open at capture time
             ⚠️ Place odds are NOT usable in this race — `fetch-odds.ts` logged "place odds estimated from win odds", and SCMP's Place column mirrors its Win column (4.8/4.9, 9.5/10, 25/25). All Strategy B odds tests below therefore use **Win odds only**, which is what the rule specifies anyway.

RACE: R3 ADMIRALTY HANDICAP (Sec 2) — **Class 5** | 1200m | Turf | Good | **12 runners**
CLASSIFICATION: **Competitive** (top Adj Win% 33.9%, inside the 20–35% band) | POOL SIZE: 6
MODE: **B — Standard Pool (6)**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | C(5,2) = 10 combinations
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL
───────────────────────────────────────────────────────────
```
Meeting: Happy Valley 2026-09-09 | Going: Good | Surface: Turf
Target Race: R3 (Class 5 | 1200m | 12 runners)
Scratchings: none (2 reserves — #13 HANDSOME BLOND, #14 SEA DIAMOND — did not get in)
Odds coverage: 12 / 12 horses with Win odds
Jockey stats: 10 jockey profiles + 12 trainer profiles loaded
Debutants: none — all 12 runners have 10 indexed past performances (banker eligibility rule 17 satisfied)
SCMP data: ✅ loaded
```

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Age | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-----|------|-------------------|--------------------------|
| 1 | LAKESHORE HERO | 30.9% | 66.0% | 4.7 | ✅ | ✅ | 7 | 6 | 10 | ★ 膽 (Banker) | 1-10: 17.3% (5.8) |
| 10 | WINNING DIAMOND | 25.2% | 59.7% | 20 | ✅ | ❌ | 11 | 5 | 10 | 腳 (Leg) | 1-10: 17.3% (5.8) |
| 8 | MR GOOD VIBES | 12.5% | 40.3% | 25 | ✅ | ❌ | 9 | 7 | 10 | 腳 (Leg) | 1-8: 9.3% (10.7) |
| 4 | MACANESE MASTER | 10.4% | 37.3% | 9.1 | ✅ | ✅ | 4 | 7 | 10 | 腳 (Leg) | 1-4: 8.2% (12.2) |
| 2 | LEAN MASTER | 9.2% | 33.1% | 10 | ✅ | ❌ | 12 | 6 | 10 | 腳 (Leg) | 1-2: 6.5% (15.3) |
| 3 | SWAGGER BRO | 3.0% | 14.5% | 7.7 | ❌ | ✅ | 6 | 6 | 10 | 腳 (Leg) — added (replacement candidate) | — |
| 11 | ORIENTAL SURPRISE | 1.8% | 10.4% | 6.9 | ❌ | ✅ | 2 | 6 | 10 | 腳 (Leg) — added (replacement candidate) | — |
| 9 | THOUSAND CUPS | 1.7% | 8.3% | 7.4 | ❌ | ✅ | 1 | 6 | 10 | 腳 (Leg) — added (replacement candidate) | — |
| 6 | NO OTHER CHOICE | 1.4% | 8.2% | 23 | ❌ | ❌ | 10 | 5 | 10 | — | — |
| 5 | CONRAD THE GREAT | 1.4% | 8.2% | 22 | ❌ | ❌ | 8 | 5 | 10 | — | — |
| 7 | VIGOR ELLEEGANT | 1.4% | 7.8% | 6.1 | ❌ | ✅ | 3 | 6 | 10 | 腳 (Leg) — added (replacement candidate) | — |
| 12 | TURF PHOENIX | 1.1% | 6.3% | 21 | ❌ | ❌ | 5 | 5 | 10 | — | — |

**Market:** Overround **22.3%**, favourite bias **+45.3%**, longshot bias −0.7%. The model and the market disagree sharply in this race:
- **#10 WINNING DIAMOND — undervalued by 403%.** MC has it 2nd (25.2% win / 59.7% place); the market has it 20-to-1, roughly 8th choice.
- **#8 MR GOOD VIBES — undervalued by 212%.** MC 3rd on place% (40.3%); market 25-to-1, the outsider of the field.
- **#7 VIGOR ELLEEGANT — overvalued by 92%.** Market 2nd favourite at 6.1; MC gives it 1.4% win / 7.8% place.
- Only **#1 LAKESHORE HERO** (4.7 favourite, MC #1) is agreed on by both. That single point of agreement is why the banker is comfortable and why the *legs* are not.

**Top quinella combinations (MC):** 1-10 17.3% ($5.8) · 1-8 9.3% ($10.7) · 1-4 8.2% ($12.2) · 8-10 7.4% ($13.4) · 1-2 6.5% ($15.3). The leading pair 1-10 pairs the 4.7 favourite with a 20-1 shot — if the model is right about #10 this is the value axis of the race, and a 1-10-x Trio should pay well.

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | SCMP Win | SCMP Place | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------|------------|------------------|----------|----------|-----------|---------------|
| 1 | LAKESHORE HERO | 4.8 | 4.9 | +form ("rallying Valley 1,200m winner") | +excuses ("hampered near 800M when taken wider") | clear | — | Stalker / rallier |
| 2 | LEAN MASTER | 9.5 | 10 | — ("only placed once each over the Valley 1,000m/1,200m from 14 starts") | +excuses ("raced wide and without cover for the majority", contact at 800M, hampered at 100M) | clear | +trial ("relentless gallop to win his latest trial by nearly four lengths") | Front / on-pace (per trial) |
| 3 | SWAGGER BRO | 7.8 | 7.9 | — ("minor cheques seven times from eight runs") | clear | clear | — | Unknown |
| 4 | MACANESE MASTER | 8.6 | 9.0 | +form ("made all for a second Valley 1,000m win") | clear | clear | — | Front-runner |
| 5 | CONRAD THE GREAT | 22 | 21 | +form ("back-to-back seconds") | +excuses ("steadied near 1100M") | clear | — | Stalker / midfield |
| 6 | NO OTHER CHOICE | 19 | 21 | — ("placed three times from first nine runs") | clear | **−injury30d** ("heart irregularity noted after racing, passed 02/09/2026" — 7 days ago) | — | Unknown |
| 7 | VIGOR ELLEEGANT | 6.5 | 6.4 | +form ("improved third over the Valley 1,200m") | — ("raced keenly early" — not a bad-luck excuse) | clear | +trial ("cosy trial win on dirt") | Unknown |
| 8 | MR GOOD VIBES | 25 | 25 | — ("dull runs three times" after a 1,600m win) | — (shifted in / made contact — self-caused, single instance, no −barrier) | clear | — | Unknown |
| 9 | THOUSAND CUPS | 7.7 | 7.2 | +form ("woke up with a front-running second over the Valley 1,200m") | — (shifted out / contact self-caused; "eased" at 550M) | clear | +trial ("did win a recent dirt trial") | Front-runner |
| 10 | WINNING DIAMOND | 20 | 20 | +form ("improved fourth after a wide trip from midfield") | +excuses ("jumped only fairly", "hampered when taken wider" at 800M) | clear | +trial ("did trial well for his new trainer") | Stalker / midfield |
| 11 | ORIENTAL SURPRISE | 7.3 | 6.7 | — ("minor cheques 15 times from 20 starts") | — (bumped at start, single instance) | clear | +trial ("landed a recent dirt trial") | Unknown |
| 12 | TURF PHOENIX | 18 | 20 | +form ("third from midfield" after three non-efforts) | +excuses ("raced wide and without cover for the majority", "hung out") | clear | — | Stalker / midfield |

Notes on flag discipline: `−barrier` requires "bumped on jumping" in **≥2** recent runs — #8 and #11 each show one instance only, so no penalty. `−age` applies at 8yo+; the oldest runners here are 7 (#4, #8), so no age penalty anywhere. #6's heart-irregularity clearance is 7 days old → `−injury30d` applies (−3 Win / −4 Place).

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 1 | LAKESHORE HERO | 30.9% | 66.0% | +form +1, excuses +2 | +form +1, excuses +2 | **33.9%** | **69.0%** | 4.7 | Z Purton | 7 | Stalk | +form, +excuses | ★ 膽 (Banker) |
| 2 | 10 | WINNING DIAMOND | 25.2% | 59.7% | +form +1, excuses +2, trial +2 | +form +1, excuses +2, trial +2 | **30.2%** | **64.7%** | 20 | A Atzeni | 11 | Stalk | +form, +excuses, +trial | 腳 (Leg) |
| 3 | 2 | LEAN MASTER | 9.2% | 33.1% | excuses +2, trial +2 | excuses +2, trial +2 | 13.2% | 37.1% | 10 | H Y Yuen (-10) | 12 | Front | +excuses, +trial | 腳 (Leg) |
| 4 | 8 | MR GOOD VIBES | 12.5% | 40.3% | 0 | 0 | 12.5% | 40.3% | 25 | C Y Ho | 9 | — | — | 腳 (Leg) |
| 5 | 4 | MACANESE MASTER | 10.4% | 37.3% | +form +1 | +form +1 | 11.4% | 38.3% | 9.1 | K Teetan | 4 | Front | +form | 腳 (Leg) |
| 6 | 9 | THOUSAND CUPS | 1.7% | 8.3% | +form +1, trial +2 | +form +1, trial +2 | 4.7% | 11.3% | 7.4 | Y L Chung (-2) | 1 | Front | +form, +trial | — |
| 7 | 5 | CONRAD THE GREAT | 1.4% | 8.2% | +form +1, excuses +2 | +form +1, excuses +2 | 4.4% | 11.2% | 22 | R Kingscote | 8 | Stalk | +form, +excuses | — |
| 7 | 7 | VIGOR ELLEEGANT | 1.4% | 7.8% | +form +1, trial +2 | +form +1, trial +2 | 4.4% | 10.8% | 6.1 | C L Chau (-2) | 3 | — | +form, +trial | — |
| 9 | 12 | TURF PHOENIX | 1.1% | 6.3% | +form +1, excuses +2 | +form +1, excuses +2 | 4.1% | 9.3% | 21 | M L Yeung | 5 | Stalk | +form, +excuses | — |
| 10 | 11 | ORIENTAL SURPRISE | 1.8% | 10.4% | trial +2 | trial +2 | 3.8% | 12.4% | 6.9 | H Bentley | 2 | — | +trial | — |
| 11 | 3 | SWAGGER BRO | 3.0% | 14.5% | 0 | 0 | 3.0% | 14.5% | 7.7 | A Badel | 6 | — | — | 腳 (Leg) |
| 12 | 6 | NO OTHER CHOICE | 1.4% | 8.2% | -injury30d −3 (floored at 0) | -injury30d −4 | 0.0% | 4.2% | 23 | J Orman | 10 | — | −injury30d | — |

**Factor legend:** `+form +1` = improving form / "made all" / "rallied" per Star Form. `excuses +2` = TIR bad luck (wide trip, hampered, steadied). `trial +2` = strong trackwork or trial win. `-injury30d −3/−4` = vet clearance <30 days old. All totals well inside the ±8% Win / ±10% Place cap; no horse reaches the 50% Win / 85% Place ceiling.

**Banker eligibility:** #1 LAKESHORE HERO has 10 indexed starts — not a debutant, eligible (rule 17 satisfied). It is also the market favourite at 4.7, so model and market agree on the anchor.

**雙膽拖 trigger — declined, deliberately.** The skill states the 2-banker threshold twice with different numbers: the A/B table (line 51) says **Adj Place% ≥ 70%**, the 膽拖 tables (lines 333/372/469/538) say **≥ 63%**. 2nd-ranked #10 WINNING DIAMOND sits at **64.7%** — between the two. It fails the stricter reading, and rule 19 additionally requires the race to be "strongly structured", which a Class 5 Happy Valley sprint classified *Competitive* is not. Decisive factor: #10 is a **20-to-1 shot the market rates ~8th**, and its 64.7% rests entirely on the MC's 403% undervaluation claim. Locking it into every combination would be the exact failure pattern flagged in the 6-Sep ST R3 review (promoting a longshot to co-banker on model confidence alone). **Recommendation: single 膽拖.**

**Reasoning for the pool:** Five horses clear the mandatory **Adj Place% ≥ 25%** threshold — #1 (69.0%), #10 (64.7%), #8 (40.3%), #4 (38.3%), #2 (37.1%) — so all five are locked in. Mode B calls for 6, and the 6th slot goes to the next-best Adj Place%: **#3 SWAGGER BRO (14.5%)**, who is also the market's 4th choice at 7.7 and, per SCMP, earned minor cheques in 7 of 8 starts last term — a consistent frame-filler the MC underrates. He beats #11 (12.4%), #9 (11.3%) and #5 (11.2%) on the metric the skill specifies.

**Pace read:** Two confirmed front-runners are drawn inside — #9 THOUSAND CUPS (draw 1, "front-running second" last time) and #4 MACANESE MASTER (draw 4, "made all" for his last Valley win) — with #2 LEAN MASTER (draw 12) likely to be pushed forward from the outside after "kept up a relentless gallop" in his trial. A contested tempo over Happy Valley 1,200m favours the stalkers: **#1 LAKESHORE HERO** (draw 7, a rallier) and **#10 WINNING DIAMOND** (draw 11, midfield). That is a structural argument on the side of the two top-ranked horses, and it is the main reason this race is played rather than passed.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: #1, #10, #2, #8, #4, #3
MODE: B — Standard Pool | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#1 LAKESHORE HERO** (Adj Place% 69.0%) ← locked in every combo
腳 (Legs):  #10, #8, #4, #2, #3
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

TOP TRIO COMBINATIONS (Plackett-Luce fit to Adj Place%, all 10 ticket combos listed):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|-----------------|----------------|
| 1 | #1, #8, #10 | 8.19% | $122 |
| 2 | #1, #4, #10 | 7.64% | $131 |
| 3 | #1, #2, #10 | 7.32% | $137 |
| 4 | #1, #4, #8 | 3.45% | $290 |
| 5 | #1, #2, #8 | 3.31% | $303 |
| 6 | #1, #2, #4 | 3.08% | $324 |
| 7 | #1, #3, #10 | 2.44% | $410 |
| 8 | #1, #3, #8 | 1.10% | $911 |
| 9 | #1, #3, #4 | 1.02% | $976 |
| 10 | #1, #2, #3 | 0.98% | $1,019 |

**Ticket coverage: 38.5%** of the adjusted-model probability mass (42.1% under the raw-MC model). The three combinations that carry the ticket — 1-8-10, 1-4-10, 1-2-10 — are all **1-10-x**, i.e. the whole ticket leans on the model being right that a 20-to-1 shot is the second-best horse in the race.

**Combinations NOT covered by the 膽拖 (banker misses):** 4-8-10 (2.97%), 2-8-10 (2.85%), 2-4-10 (2.66%) and the rest. Full-pool C(6,3) = 20 combos would cost $200 and add ~11pp of coverage; the 膽拖 buys 38.5% for half the price. Given #1 is both the MC #1 and the market favourite, the banker structure is the right trade.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
The Trio dividend is suppressed when the pool concentrates on one obvious combination. That is **not** the case here:
- The favourite is only **4.7** — no crushing short price to collapse the pool.
- The model's second and third strings (#10 at 20, #8 at 25) are the **outsiders of the field** in market terms. If either fills the frame, the Trio pays a large dividend. Fair odds on the top ticket combo (1-8-10) is $122 against a $10 unit — and the actual dividend would very likely exceed that estimate, because the public will have little of 8 or 10.
- Conversely the market's 2nd and 3rd choices (#7 VIGOR ELLEEGANT 6.1, #11 ORIENTAL SURPRISE 6.9) are **not in the Strategy A pool at all** — the two most heavily backed combinations after the favourite are ones this ticket cannot win. That is the price of following the model, and it is the single biggest risk in this race.

Verdict: genuine value **if** the MC's read on #10 and #8 is sound; a fast loser if the market is right about #7/#11. Sized accordingly — Strategy A at $100 is a normal-sized ticket, not a conviction bet.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (Banker-Leg)
膽 (Banker): #1 LAKESHORE HERO
腳 (Legs):  #10 WINNING DIAMOND, #8 MR GOOD VIBES, #4 MACANESE MASTER, #2 LEAN MASTER, #3 SWAGGER BRO
COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

TOP COMBINATIONS (highest value):
  1-8-10 (8.19%) · 1-4-10 (7.64%) · 1-2-10 (7.32%) · 1-4-8 (3.45%) · 1-2-8 (3.31%) · 1-2-4 (3.08%) · 1-3-10 (2.44%)

PASS CONDITIONS:
- If **#1 LAKESHORE HERO** (banker) is scratched → **VOID the ticket**, do not restructure (rule 10).
- If #10 WINNING DIAMOND is scratched → the ticket loses its three highest-probability combinations; drop to a 4-leg 膽拖 (C(4,2) = 6 combos, $60) or pass.
- If the field drops below 3 starters → pool refunded (not a live risk with 12 declared).
- If the going turns **Yielding/Heavy**, the contested-inside-pace read weakens and the two front-runners (#4, #9) become harder to pass — re-check before betting.
- If #1 drifts materially (out past ~7) in late betting, treat that as market disagreement with the banker and consider passing.

CONFIDENCE: **MEDIUM** — the banker is solid (MC #1 and market favourite, 69.0% Adj Place%), but the ticket's payoff depends on model-vs-market disagreements of 200–400% on the legs.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#1 LAKESHORE HERO** (MC Win% 30.9%, MC Place% 66.0%) ← 1st by MC Win%

**Step A — Primary legs (MC Place% > 20%, excluding banker):** #10 (59.7%), #8 (40.3%), #4 (37.3%), #2 (33.1%) → **4 primary legs**

**Step B — Win-odds replacement / addition:**
- Replaceable legs (MC Place% 20–30% **AND** Win odds > 10): **none.** #10 (59.7%, 20), #8 (40.3%, 25), #4 (37.3%, 9.1) and #2 (33.1%, 10) are all above the 30% band, so no primary leg qualifies for a swap.
- Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10), processed in ascending odds order:

| Order | # | Horse | Win Odds | MC Place% | Replaceable leg available? | Action |
|-------|---|-------|----------|-----------|----------------------------|--------|
| 1 | 7 | VIGOR ELLEEGANT | 6.1 | 7.8% | No | **Added directly** |
| 2 | 11 | ORIENTAL SURPRISE | 6.9 | 10.4% | No | **Added directly** |
| 3 | 9 | THOUSAND CUPS | 7.4 | 8.3% | No | **Added directly** |
| 4 | 3 | SWAGGER BRO | 7.7 | 14.5% | No | **Added directly** |

(#12 TURF PHOENIX 21, #5 CONRAD THE GREAT 22, #6 NO OTHER CHOICE 23 fail the Win odds < 10 test and are excluded.)

**Final legs (8):** #10, #8, #4, #2, #7, #11, #9, #3
BET STRUCTURE: 膽拖 | 1膽 + **8腳** | COMBINATIONS: C(8,2) = **28**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $280**

STRATEGY B TICKET — all 28 combinations (raw-MC probabilities):

| Combo | MC Prob | Fair odds | | Combo | MC Prob | Fair odds |
|-------|---------|-----------|-|-------|---------|-----------|
| 1-8-10 | 9.27% | $108 | | 1-8-11 | 0.96% | $1,041 |
| 1-4-10 | 8.32% | $120 | | 1-4-11 | 0.86% | $1,161 |
| 1-2-10 | 7.10% | $141 | | 1-8-9 | 0.76% | $1,322 |
| 1-4-8 | 4.24% | $236 | | 1-2-11 | 0.73% | $1,362 |
| 1-2-8 | 3.62% | $277 | | 1-7-8 | 0.71% | $1,410 |
| 1-2-4 | 3.24% | $308 | | 1-4-9 | 0.68% | $1,473 |
| 1-3-10 | 2.70% | $370 | | 1-4-7 | 0.64% | $1,572 |
| 1-10-11 | 1.89% | $529 | | 1-2-9 | 0.58% | $1,728 |
| 1-9-10 | 1.49% | $672 | | 1-2-7 | 0.54% | $1,844 |
| 1-7-10 | 1.39% | $717 | | 1-3-11 | 0.28% | $3,590 |
| 1-3-8 | 1.37% | $728 | | 1-3-9 | 0.22% | $4,557 |
| 1-3-4 | 1.23% | $811 | | 1-3-7 | 0.21% | $4,863 |
| 1-2-3 | 1.05% | $951 | | 1-9-11 | 0.15% | $6,523 |
|       |         |           | | 1-7-11 | 0.14% | $6,962 |
|       |         |           | | 1-7-9 | 0.11% | $8,837 |

**Ticket coverage: 54.5%** of the raw-MC probability mass.

**Strategy A vs Strategy B comparison:** Both agree on the banker (#1) and on the four core legs (#10, #8, #4, #2) — the disagreement is entirely in the tail. Because **no primary leg sits in the 20–30% band**, Strategy B's replacement mechanism degenerates into pure addition and bolts on **four** market-fancied but model-hated horses (#7, #11, #9, #3), taking the ticket from 5 legs to 8 and the cost from **$100 to $280 (+180%)** to buy an extra **16pp** of coverage. Strategy A's more disciplined pool includes only one of those four (#3, on Adj Place%). Strategy B is the better hedge against the MC being wrong about #7/#11 — precisely the risk flagged in the Value Check — but at 2.8× the cost, and 15 of its 28 combinations have fair odds above $1,000. If cost is a constraint, Strategy A is the efficient ticket; if the model-vs-market gap on #7 (overvalued by 92% per the MC) worries you, Strategy B is the insurance.

───────────────────────────────────────────────────────────
CAVEATS
───────────────────────────────────────────────────────────
1. **Historical sync not re-run this session** — per instruction, `sync-historical.ts` was skipped (already synced upstream). The MC loaded 2,251 historical races and enriched 12/12 runners with 10 form lines each, so form coverage is complete for this race; but the very latest meeting's results are unverified from within this run.
2. **Place odds are unusable.** `fetch-odds.ts` reports its place odds as "estimated from win odds", and SCMP's Place column mirrors its Win column. All decisions above use Win odds only. Do not read the Place Odds figures anywhere as real pool prices.
3. **Finish-time projection is internally inconsistent and was ignored.** The MC's own projection ranks #1 LAKESHORE HERO **11th of 12** (+4.32s / 25.9L behind) and #12 TURF PHOENIX fastest — directly contradicting the same run's Win/Place rankings (#1 top, #12 bottom) and the market (#1 the 4.7 favourite, #12 at 21). This is the same defect documented in the 6-Sep ST R3 review. The projection block is not used in any selection here; the Win%/Place% output is.
4. **Large model-vs-market divergence on the legs.** The MC calls #10 undervalued by 403% and #8 by 212% while calling the market's 2nd favourite #7 overvalued by 92%. The Strategy A ticket is a direct bet on the model over the market. In a **Class 5 Happy Valley sprint** — the most upset-prone combination on the calendar — this deserves the MEDIUM confidence rating and no stake escalation.
5. **雙膽拖 threshold ambiguity in the skill.** ≥70% (line 51) vs ≥63% (lines 333/372/469/538). #10 at 64.7% falls between them. Resolved in favour of single-banker 膽拖; see the HORSE RANKINGS section for the full reasoning. This ambiguity should be reconciled in `skills/trio-strategy/SKILL.md`.
6. **Trio probability estimates are modelled, not simulated per-combination.** `analyze-race.ts` outputs per-horse Win%/Place% and quinella pairs, not trio joint probabilities. The combination probabilities above come from a Plackett-Luce fit to the place probabilities. Because the Adj Place% column sums to 323% against the 300% that three podium slots allow, the fit reproduces each horse's place% about 7% low in relative terms (e.g. #1 69.0% → 64.1%). Combination probabilities are therefore mildly conservative; relative ranking is unaffected.
7. **Running styles for #3, #6, #7, #8, #11 are unknown** — SCMP published no positional commentary for them. The pace read rests on the five horses whose styles are documented.
8. **Two reserves (#13, #14) did not gain entry.** If a late scratching promotes a reserve, re-run the simulation — the field composition changes and the reserve carries no MC output.

───────────────────────────────────────────────────────────
SUMMARY
───────────────────────────────────────────────────────────
| | Strategy A | Strategy B |
|---|---|---|
| Banker | #1 LAKESHORE HERO | #1 LAKESHORE HERO |
| Legs | #10, #8, #4, #2, #3 (5) | #10, #8, #4, #2, #7, #11, #9, #3 (8) |
| Structure | 膽拖 1膽 + 5腳 | 膽拖 1膽 + 8腳 |
| Combinations | C(5,2) = 10 | C(8,2) = 28 |
| Total stake | **$100** | **$280** |
| Coverage | 38.5% (adj model) | 54.5% (raw MC) |
| Confidence | MEDIUM | MEDIUM |

═══════════════════════════════════════════════════════════
