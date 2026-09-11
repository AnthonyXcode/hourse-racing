═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-09 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --form-data all`, HV + ST form, 2,251 historical races / 2,311 indexed performances; 11/11 horses enriched)
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction)
SCMP DATA: ✅ Loaded — Win/Place odds, Star Form, TIR, Vet, Trackwork for all 11 runners (tipster picks ignored per skill rule 13)
ODDS SOURCE: **HKJC early-morning pool** (`fetch-odds.ts` → `data/odds/odds_20260909_HV.json`, re-read from the enriched racecard) — complete for all 11 runners
             SCMP odds: ✅ loaded (cross-check; agrees within ~1.5 on every runner — see the ⚠️ note below) | HKJC live: ❌ not open at capture time
             ⚠️ Place odds are NOT usable — `fetch-odds.ts` logged "place odds estimated from win odds". All Strategy B odds tests below use **Win odds only**, which is what the rule specifies anyway.

RACE: R4 KWUN TONG HANDICAP — **Class 4** | 1650m | Turf | Good | **11 runners** | Prize $1,170,000
CLASSIFICATION: **Dominant** (top Adj Win% 36.0%, above the 35% threshold) | POOL SIZE: 5
MODE: **A — Tight Pool (5)**
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | C(4,2) = 6 combinations
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL
───────────────────────────────────────────────────────────
```
Meeting: Happy Valley 2026-09-09 | Going: Good | Surface: Turf
Target Race: R4 (Class 4 | 1650m | 11 runners)
Scratchings: none
Odds coverage: 11 / 11 horses with Win odds
Jockey stats: 10 jockey profiles + 10 trainer profiles loaded
Debutants: none — every runner has ≥5 indexed past performances (#3 has 6, #5 has 5, #8 has 7, #9 has 9, the rest 10). Banker eligibility rule 17 satisfied.
SCMP data: ✅ loaded
```

Critical checks: ≥3 starters ✅ (11) · odds populated for top 3–5 ✅ (all 11) · jockey stats ✅ · racing confirmed ✅.

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Age | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-----|------|-------------------|--------------------------|
| 1 | SHAMZ | 35.0% | 70.9% | 7.4 | ✅ | ✅ | 2 | 5 | 10 | ★ 膽 (Banker) | 1-3: 19.6% (5.1) |
| 3 | SHOOTING TO TOP | 24.9% | 61.9% | 9.5 | ✅ | ✅ | 11 | 5 | 6 | 腳 (Leg) | 1-3: 19.6% (5.1) |
| 4 | SUNDAY'S SERENADE | 15.6% | 49.6% | 4.7 | ✅ | ✅ | 8 | 6 | 10 | 腳 (Leg) | 1-4: 12.4% (8.0) |
| 2 | SKY DEEP | 10.2% | 38.3% | 4.4 | ✅ | ✅ | 1 | 5 | 10 | 腳 (Leg) | 1-2: 9.3% (10.8) |
| 11 | THE LION KING | 4.9% | 21.9% | 9.5 | ✅ | ✅ | 5 | 6 | 10 | 腳 (Leg) | — |
| 6 | INNO SUPER | 2.6% | 15.7% | 16 | ❌ | ❌ | 7 | 5 | 10 | — | — |
| 7 | ROMANTIC LAOS | 2.8% | 14.7% | 15 | ❌ | ❌ | 10 | 8 | 10 | — | — |
| 10 | AMAZING GAZE | 1.6% | 9.9% | 6.6 | ❌ | ✅ | 9 | 5 | 10 | 腳 (Leg) — **added directly** (replacement candidate) | — |
| 5 | MISSION GIANT | 1.3% | 7.9% | 29 | ❌ | ❌ | 4 | 5 | 5 | — | — |
| 9 | COLOURFUL GAN | 1.0% | 7.3% | 21 | ❌ | ❌ | 3 | 5 | 9 | — | — |
| 8 | JOLTIN | 0.3% | 2.0% | 13 | ❌ | ❌ | 6 | 3 | 7 | — | — |

**Market:** Overround **22.5%**, favourite bias **−40.9%**, longshot bias **−71.3%**. Model and market disagree at the very top of the market:
- **#1 SHAMZ — undervalued by 159%.** MC's clear #1 (35.0% win / 70.9% place) is only the market's **4th** choice at 7.4. He is the reigning winner of *this exact race and course-and-distance* (HV R4, 1650m, 15-Jul-2026, won at $38).
- **#3 SHOOTING TO TOP — undervalued by 137%.** MC #2 (24.9% / 61.9%); market joint-5th at 9.5.
- **#8 JOLTIN — overvalued by 97%.** Market has him 13; MC gives 0.3% win / 2.0% place, the bottom of the field.
- The market's two shortest, **#2 SKY DEEP (4.4)** and **#4 SUNDAY'S SERENADE (4.7)**, are only MC's 4th and 3rd — both are in the pool, but neither is the anchor.

**Top quinella combinations (MC):** 1-3 19.6% ($5.1) · 1-4 12.4% ($8.0) · 3-4 9.5% ($10.5) · 1-2 9.3% ($10.8) · 2-3 6.3% ($15.8). Every leading pair contains #1 or #3 — the two horses the market has 4th and 5th. Per skill rule 14, a Trio built around 1-3-x is where the value sits: two model-favoured horses at 7.4 and 9.5 filling the frame would inflate the dividend well beyond what a 4.4/4.7-led result pays.

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | SCMP Win | SCMP Place | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------|------------|------------------|----------|----------|-----------|---------------|
| 1 | SHAMZ | 7 | 7.4 | **+form** ("won at $38 … travelling third last, taking control 50m out") | clear | clear | — | Stalker / rallier |
| 2 | SKY DEEP | 4.9 | 4.3 | **+form** ("led from gate 11 for second"); resumed from knee surgery in June | — ("steadied near 650M **when racing keenly**", "raced greenly" — self-caused, not bad luck) | clear | — | Front-runner |
| 3 | SHOOTING TO TOP | 8.5 | 9.5 | **+form** ("won Valley 1,650m in April … close second from gate 12") | clear | clear | — | Stalker |
| 4 | SUNDAY'S SERENADE | 4.3 | 4.7 | **+form** ("rallying seconds in two of three straight Valley 1,650m runs") | clear | clear | — | Closer / rallier |
| 5 | MISSION GIANT | 23 | 27 | — ("failed to figure; tiring last from midfield") | **−perf** ("finished tailed out; performance unacceptable") | Unacceptable performance 04/07/2026; passed inspection 02/09/2026 | — | Midfield |
| 6 | INNO SUPER | 17 | 16 | **+form** ("rallying second at Valley 1,650m … neck win; third over ST 1,800m") | clear | clear | — | Stalker / rallier |
| 7 | ROMANTIC LAOS | 13 | 15 | **+form** ("dashing late for second on wet track") | **+excuses** ("hampered after start when crowded; raced tight near 1700M") | **−age** ("eight years of age or above", 11/08/2026; passed 19/08/2026) | — | Closer |
| 8 | JOLTIN | 12 | 13 | — ("struggled in Class Three and Four; misfired with market action on dirt") | clear | clear (no significant findings) | **+trial** ("wide at turn in latest ST trial; stuck to task well; ran into second") | Unknown |
| 9 | COLOURFUL GAN | 19 | 20 | — ("fired blanks over mile trips; flat ninth") | — ("raced keenly from 1300M; got head up when steadied" — self-caused) | clear (no significant findings) | — | Unknown |
| 10 | AMAZING GAZE | 7.6 | 7.1 | — ("eight **minor cheques** from 11 starts last term" — consistency, not improvement) | clear | clear | — | Unknown |
| 11 | THE LION KING | 11 | 9.2 | mixed ("minor cheques in six of eight"; **returned with blood in trachea**; "failed after **wide trip**") | **+excuses** (wide trip; "bumped approaching winning post") | none listed | — | Unknown |

Notes on flag discipline (consistent with the R3 report on this card):
- **`+excuses` requires genuine bad luck.** #2 and #9 were both steadied *because they were racing keenly* — self-inflicted, so no bonus. #7 ("hampered after start when crowded") and #11 ("wide trip") qualify.
- **`−barrier` requires "bumped on jumping" in ≥2 recent runs.** #11's single "bumped approaching winning post" is neither at the jump nor repeated → no penalty.
- **`−age` (8yo+, C3+ races)** applies only to #7 ROMANTIC LAOS (age 8 confirmed on the racecard). Class 4 is inside the C3+ band.
- **#5's 02/09/2026 vet clearance is 7 days old but follows an *unacceptable performance*, not an injury** — so `−perf −2` applies and `−injury30d` does **not**. Applying both would double-count one event.
- **#11's "blood in trachea"** is a real fitness concern but SCMP lists **no vet entry** for it, and it maps to no row in the skill's adjustment tables. It is carried as a qualitative flag and a caveat, not a numeric penalty. Per rule 9, his 9.5 market price (well inside 15) also forbids hard exclusion.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 1 | SHAMZ | 35.0% | 70.9% | +form +1 | +form +1 | **36.0%** | **71.9%** | 7.4 | C Y Ho | 2 | Stalk | +form | ★ 膽 (Banker) |
| 2 | 3 | SHOOTING TO TOP | 24.9% | 61.9% | +form +1 | +form +1 | **25.9%** | **62.9%** | 9.5 | K C Leung | 11 | Stalk | +form | 腳 (Leg) |
| 3 | 4 | SUNDAY'S SERENADE | 15.6% | 49.6% | +form +1 | +form +1 | 16.6% | 50.6% | 4.7 | Z Purton | 8 | Close | +form | 腳 (Leg) |
| 4 | 2 | SKY DEEP | 10.2% | 38.3% | +form +1 | +form +1 | 11.2% | 39.3% | 4.4 | E C W Wong (-3) | 1 | Front | +form | 腳 (Leg) |
| 5 | 11 | THE LION KING | 4.9% | 21.9% | excuses +2 | excuses +2 | 6.9% | 23.9% | 9.5 | A Atzeni | 5 | — | +excuses, ⚠ trachea | 腳 (Leg) |
| 6 | 7 | ROMANTIC LAOS | 2.8% | 14.7% | +form +1, excuses +2, -age −2 | +form +1, excuses +2 | 3.8% | 17.7% | 15 | C L Chau (-2) | 10 | Close | +form, +excuses, −age | — |
| 7 | 6 | INNO SUPER | 2.6% | 15.7% | +form +1 | +form +1 | 3.6% | 16.7% | 16 | J Orman | 7 | Stalk | +form | — |
| 8 | 8 | JOLTIN | 0.3% | 2.0% | trial +2 | trial +2 | 2.3% | 4.0% | 13 | M L Yeung | 6 | — | +trial | — |
| 9 | 10 | AMAZING GAZE | 1.6% | 9.9% | 0 | 0 | 1.6% | 9.9% | 6.6 | K Teetan | 9 | — | — | — |
| 10 | 9 | COLOURFUL GAN | 1.0% | 7.3% | 0 | 0 | 1.0% | 7.3% | 21 | B Avdulla | 3 | — | — | — |
| 11 | 5 | MISSION GIANT | 1.3% | 7.9% | -perf −2 (floored at 0) | 0 | 0.0% | 7.9% | 29 | M Chadwick | 4 | Mid | −perf | — |

**Factor legend:** `+form +1` = improving form / "rallied" / "made all" / "led" per Star Form. `excuses +2` = genuine TIR bad luck (crowded, hampered, wide trip). `trial +2` = strong trackwork/trial. `-age −2` = 8yo+ in C3+ (Win% only per the skill table). `-perf −2` = unacceptable performance (Win% only). All totals are far inside the ±8% Win / ±10% Place cap; no horse approaches the 50% Win / 85% Place ceiling. Negative flags that the skill scopes to Win% only are **not** mirrored into the Place% factor; positive flags are mirrored, matching the skill's "(same)" example.

**Banker eligibility (rule 17):** #1 SHAMZ has 10 indexed starts — not a debutant, eligible.

**雙膽拖 — not triggered, unambiguously.** 2nd-ranked #3 SHOOTING TO TOP has Adj Place% **62.9%**, which fails *both* readings of the skill's contradictory threshold (≥63% in the 膽拖 tables, ≥70% in the A/B table). Single 膽拖 it is. (The skill's internal inconsistency is still worth fixing — see caveats — but it does not bite here.)

**Reasoning for the pool.** Four horses clear the mandatory **Adj Place% ≥ 25%** gate — #1 (71.9%), #3 (62.9%), #4 (50.6%), #2 (39.3%) — and are locked in. The race classifies **Dominant** (#1 at 36.0% Adj Win%), which calls for Mode A: banker + 4 contenders by Adj Place%. The 5th slot goes to the next-best Adj Place%, **#11 THE LION KING at 23.9%** — narrowly short of the 25% must-include line but comfortably clear of #7 (17.7%) and #6 (16.7%), and backed by the market at 9.5 (joint-5th choice) rather than being a pure model artefact.

The case for #1 SHAMZ as banker is unusually concrete for a 7.4 chance: he **won this same race — HV R4 over 1650m — on 15-Jul-2026 at $38**, coming from third-last to take control inside the last 50m, and the MC has him with the field's top rating (69) and the shortest expected finishing position (ePos 2.8). The market has him fourth choice; the model says 159% undervalued. Draw 2 at Happy Valley over 1650m is a further plus for a horse who settles back and needs a run.

**Pace read.** #2 SKY DEEP (draw 1) is the confirmed on-pace runner — "led from gate 11 for second" last time and drawn to cross easily this time — and is likely to be uncontested up front, with #4 (draw 8, closer) and #7 (draw 10, closer) coming late. A **soft, uncontested tempo** is the one scenario that hurts this ticket: it would let #2 dictate and blunt the finishing kicks of #1 and #4. Against that, HV 1650m carries a **stalker bias** (per the skill's venue notes, front-runner bias applies to 1,200m; stalkers to 1,650m+), which is exactly the profile of #1 and #3. #3's draw 11 is the pool's main structural negative — although he was a "close second from gate 12" last start, so the wide gate is demonstrably survivable for him.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: #1, #3, #4, #2, #11
MODE: A — Tight Pool | POOL SIZE: 5

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#1 SHAMZ** (Adj Place% 71.9%) ← locked in every combo
腳 (Legs):  #3, #4, #2, #11
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = **6**

TOP TRIO COMBINATIONS (Plackett-Luce fit to Adj Place%; all 6 ticket combos listed):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|-----------------|----------------|
| 1 | #1, #3, #4 | 12.98% | $77 |
| 2 | #1, #2, #3 | 8.94% | $112 |
| 3 | #1, #2, #4 | 5.94% | $168 |
| 4 | #1, #3, #11 | 4.81% | $208 |
| 5 | #1, #4, #11 | 3.19% | $313 |
| 6 | #1, #2, #11 | 2.19% | $457 |

**Ticket coverage: 38.1%** of the adjusted-model probability mass, for **$60** — the cheapest ticket the skill's modes allow, and the payoff of the Dominant classification.

**Largest uncovered combinations (banker misses):** 2-3-4 (4.24%), 3-4-11 (2.28%), 2-3-11 (1.58%). The single biggest hole is **2-3-4** — the three horses the market likes most after #1 — which is the precise shape of a SHAMZ failure. Full-pool C(5,3) = 10 combos at $100 would add those back for ~+7pp of coverage; the 膽拖 saves 40% and accepts rule 18's known trade-off.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- The market has **no dominant favourite** — #2 at 4.4 and #4 at 4.7 are near-equal, with #10 at 6.6 and #1 at 7.4 close behind. A flat market like this spreads the Trio pool and keeps dividends respectable.
- The ticket's leading combination **1-3-4** pairs the market's **4th (7.4) and 5th (9.5)** choices with its 2nd (4.7). Fair odds $77 on a $10 unit; because the public will be underweight both #1 and #3, the **actual dividend on 1-3-4 should comfortably exceed the model's fair estimate**.
- Cross-referencing the quinella matrix (rule 14): the MC's top pair **1-3 at 19.6% (fair $5.1)** is not the market's favoured pair — the market's implied favourite pairing is 2-4. Model and market disagree on the *axis* of the race, which is exactly the condition the skill flags as a value signal for Trio.
- Risk on the other side: **#10 AMAZING GAZE at 6.6 is the market's 3rd choice and is not in the Strategy A pool** (Adj Place% 9.9%). If he fills the frame, Strategy A loses regardless of the banker. Strategy B covers him; Strategy A does not.

Verdict: **genuine value**, and better structured than most — the banker is the model's standout *and* a proven course-distance-and-race winner, while the value legs are market-underrated. Not a stake-escalation race, but a clean one.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (Banker-Leg)
膽 (Banker): #1 SHAMZ
腳 (Legs):  #3 SHOOTING TO TOP, #4 SUNDAY'S SERENADE, #2 SKY DEEP, #11 THE LION KING
COMBINATIONS: C(4,2) = **6**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $60**

TOP COMBINATIONS (highest value):
  1-3-4 (12.98%) · 1-2-3 (8.94%) · 1-2-4 (5.94%) · 1-3-11 (4.81%) · 1-4-11 (3.19%) · 1-2-11 (2.19%)

PASS CONDITIONS:
- If **#1 SHAMZ** (banker) is scratched → **VOID the ticket**, do not restructure (rule 10).
- If #3 SHOOTING TO TOP is scratched → the two best combinations go with him; drop to a 3-leg 膽拖 (C(3,2) = 3 combos, $30) or pass.
- If the field drops below 3 starters → pool refunded (not a live risk with 11 declared).
- If the going turns **Yielding/Heavy**, re-check: #1's July win over this course and distance came **on a wet track**, so he improves — but #4 and #7, both closers, are hurt. The banker case strengthens; the leg mix would want revisiting.
- If #1 drifts materially (out past ~10) in late betting, treat that as the market rejecting the banker and consider passing.
- If #11 THE LION KING's trachea bleed produces a late vet scratching, the ticket drops to 3 legs / $30.

CONFIDENCE: **MEDIUM-HIGH** — the banker is the MC's clear #1 (36.0% Adj Win%, 71.9% Adj Place%) with a literal win in this same race over this course and distance eight weeks ago, and three of the four legs are the market's top choices. Held short of HIGH because the banker is only the market's 4th choice at 7.4, and Happy Valley is the upset-prone venue.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#1 SHAMZ** (MC Win% 35.0%, MC Place% 70.9%) ← 1st by MC Win%

**Step A — Primary legs (MC Place% > 20%, excluding banker):** #3 (61.9%), #4 (49.6%), #2 (38.3%), #11 (21.9%) → **4 primary legs**

**Step B — Win-odds replacement / addition:**
- **Replaceable legs** (MC Place% 20–30% **AND** Win odds > 10): **none.** The only primary leg inside the 20–30% band is **#11 THE LION KING (21.9%)**, but his Win odds are **9.5 — not > 10**, so he is *not* replaceable. #3, #4 and #2 are all above the 30% band.
- **Win-odds candidates** (MC Place% ≤ 20% **AND** Win odds < 10), in ascending odds order:

| Order | # | Horse | Win Odds | MC Place% | Replaceable leg available? | Action |
|-------|---|-------|----------|-----------|----------------------------|--------|
| 1 | 10 | AMAZING GAZE | 6.6 | 9.9% | No | **Added directly** |

(No other horse passes the Win odds < 10 test: #8 13, #7 15, #6 16, #9 21, #5 29.)

**Final legs (5):** #3, #4, #2, #11, #10
BET STRUCTURE: 膽拖 | 1膽 + **5腳** | COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

STRATEGY B TICKET — all 10 combinations (raw-MC probabilities):

| Rank | Combo | MC Prob | Fair odds |
|------|-------|---------|-----------|
| 1 | 1-3-4 | 14.27% | $7 |
| 2 | 1-2-3 | 9.72% | $10 |
| 3 | 1-2-4 | 6.35% | $16 |
| 4 | 1-3-11 | 4.87% | $21 |
| 5 | 1-4-11 | 3.17% | $32 |
| 6 | 1-2-11 | 2.16% | $46 |
| 7 | 1-3-10 | 2.04% | $49 |
| 8 | 1-4-10 | 1.33% | $75 |
| 9 | 1-2-10 | 0.90% | $111 |
| 10 | 1-10-11 | 0.45% | $222 |

**Ticket coverage: 45.3%** of the raw-MC probability mass. Largest uncovered: 2-3-4 (4.44%), 1-3-6 (3.35%), 1-3-7 (3.12%).

**Strategy A vs Strategy B comparison.** The two strategies agree completely on the banker (#1 SHAMZ) and on all four core legs (#3, #4, #2, #11) — SCMP form adjustments moved nothing in the pool, because the `+form +1` bonus landed on four of the top five horses simultaneously and cancelled out in ranking terms. The **only** difference is that Strategy B's Win-odds rule bolts on **#10 AMAZING GAZE** (market 3rd choice at 6.6, MC 8th at 9.9% place), taking the ticket from 4 legs to 5 and the cost from **$60 to $100 (+67%)** for **+7.2pp** of coverage. That is fair value on the arithmetic, and #10 is the biggest model-vs-market gap left uncovered by Strategy A — if you distrust the MC's dismissal of a 6.6 chance, Strategy B is the ticket. If you trust the model, Strategy A buys 84% of the coverage for 60% of the cost.

───────────────────────────────────────────────────────────
CAVEATS
───────────────────────────────────────────────────────────
1. **Historical sync not re-run this session** — per instruction, `sync-historical.ts` was skipped (already synced upstream). The MC loaded 2,251 historical races and enriched 11/11 runners, so form coverage is complete for this race; the very latest meeting's results are unverified from within this run.
2. **Strategy B's leg count turns on a single odds decimal.** #11 THE LION KING is at **9.5 on HKJC** but **11 on SCMP**. Using HKJC (the primary source, per the skill's tool table) he fails the "Win odds > 10" replaceability test, so #10 is *added* and Strategy B has 5 legs / $100. Using SCMP's 11 he would be replaceable, #10 would **swap in for him**, and Strategy B would be 4 legs / **$60** with legs #3, #4, #2, #10. This report follows HKJC. If you prefer the SCMP price, drop #11 and add #10 to the Strategy A ticket instead — note that this is the only place in the analysis where the two odds sources produce different answers.
3. **Place odds are unusable.** `fetch-odds.ts` reports "place odds estimated from win odds". All decisions above use Win odds only.
4. **The scraper logged a distance mismatch.** `[SCRAPER] R4: parsed class=Class 4, distance=1200m`, while the race object, the analysis header and every SCMP form reference say **1650m** (KWUN TONG HANDICAP; horses' Valley form is repeatedly at 1,650m). 1650m is taken as correct. The stray 1200m parse is a scraper artefact worth investigating, but it did not propagate into the simulation inputs.
5. **Finish-time projection is internally inconsistent and was ignored** — the same defect logged in the 6-Sep ST R3 and 9-Sep HV R3 reviews. This run ranks #1 SHAMZ **10th of 11** on projected time (+5.15s) while the same run's Win%/Place% output has him a clear first, and it puts #10 AMAZING GAZE (MC 8th) fastest. Nothing in this report uses the projection block; only the Win%/Place% output.
6. **#11 THE LION KING returned with blood in the trachea.** SCMP records it in Star Form with no corresponding vet entry, so it maps to no row in the skill's adjustment tables and carries no numeric penalty. It is a genuine fitness risk on a horse who is a leg in both strategies. His 9.5 market price (inside the rule-9 threshold of 15) forbids hard exclusion, but treat him as the weakest leg on the ticket.
7. **雙膽拖 threshold ambiguity in the skill** — ≥70% (line 51) vs ≥63% (lines 333/372/469/538). Not decisive here (#3 at 62.9% fails both), but the contradiction should be reconciled in `skills/trio-strategy/SKILL.md`.
8. **Trio probabilities are modelled, not simulated per-combination.** `analyze-race.ts` outputs per-horse Win%/Place% and quinella pairs, not trio joint probabilities. The combination probabilities above come from a Plackett-Luce fit to the place probabilities. The Adj Place% column sums to 312% against the 300% that three podium slots allow, so the fit reproduces each horse's place% about 4% low in relative terms (#1 71.9% → 69.1%); Strategy A figures are therefore mildly conservative. The raw-MC column sums to 300.1% and fits essentially exactly. Relative ranking is unaffected in both.
9. **Running styles for #8, #9, #10 are unknown** — SCMP published no positional commentary. The pace read rests on the eight runners whose styles are documented; #10 in particular is a market-fancied unknown quantity, which is a further argument for the Strategy B version of the ticket.
10. **Trainer strike rates in the loaded sample are near-zero across the board** (A S Cruz 0/9, J Richards 0/5, C Fownes 0/4, F C Lor 0/4). These are small-sample season-to-date figures from an early-September meeting, not meaningful form signals; the MC weights them lightly and so should you.

───────────────────────────────────────────────────────────
SUMMARY
───────────────────────────────────────────────────────────
| | Strategy A | Strategy B |
|---|---|---|
| Banker | #1 SHAMZ | #1 SHAMZ |
| Legs | #3, #4, #2, #11 (4) | #3, #4, #2, #11, #10 (5) |
| Structure | 膽拖 1膽 + 4腳 | 膽拖 1膽 + 5腳 |
| Combinations | C(4,2) = 6 | C(5,2) = 10 |
| Total stake | **$60** | **$100** |
| Coverage | 38.1% (adj model) | 45.3% (raw MC) |
| Confidence | MEDIUM-HIGH | MEDIUM-HIGH |

═══════════════════════════════════════════════════════════
