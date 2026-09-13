═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-13 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-13 --venue "Sha Tin" --race 2 --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5`) — 2,249 historical races / 2,311 indexed performances; 11/13 horses enriched (the 2 unraced debutants have no form); 13 jockey + 12 trainer profiles loaded
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction; latest file `results_20260909_HV.json`)
SCMP DATA: ⚠️ Partial — Win odds, Star Form, TIR, Vet and Trackwork loaded for all 13 runners. SCMP's Place column just repeats its Win column, and the Q/QP matrix came back corrupt, so **neither was used** (see caveats). Tipster picks ignored per skill rule 13.
ODDS SOURCE: **HKJC race-day pool** (`fetch-odds.ts`, captured 10:08 HKT 13-Sep, ~3h20m before the 1:30pm off). Complete for all 13 runners.
             SCMP odds: ✅ loaded as a cross-check. Within ~2 points on every runner, and **no horse changes side on the Win-odds<10 test** (#5 5.0/4.8, #9 9/7, #11 11/11, #13 13/13). | HKJC live: ✅ pool open at capture; prices will move before the off

RACE: R2 HING WAH HANDICAP — **Class 4** | 1000m (straight) | Turf | Good | **13 runners**
CLASSIFICATION: **Competitive** (top Adj Win% 24.6%, inside the 20–35% band) | POOL SIZE: 6
MODE: **B — Standard Pool (6)**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | C(5,2) = 10 combinations
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Sha Tin 2026-09-13 | Going: Good | Surface: Turf
Target Race: R2 HING WAH HANDICAP (Class 4 | 1000m straight Turf | 13 runners)
Scratchings: none
Odds coverage: 13 / 13 horses with Win odds (HKJC pool + SCMP cross-check)
Starters: 13 ≥ 3 → Trio pool valid
Jockey stats: 13 jockey profiles + 12 trainer profiles loaded
Debutants / thin form: #4 GOLDEN ELITE (0 starts), #5 HANDSOME HERO (0 starts),
                       #6 GOOD POWER (1), #7 HERO MASTERMIND (1), #9 DANCING BLAZE (2)
Banker (Strategy A) #2 LOOKING BRIGHT has 10 starts → rule 17 satisfied
SCMP data: ⚠️ partial (form/TIR/vet/trackwork/win odds ✅; place odds & Q/QP matrix ❌)
```

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Starts | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|--------|-------------------|--------------------------|
| 7 | HERO MASTERMIND | 22.7% | 55.7% | 56 | ✅ | ❌ | 7 | 1 | ★ 膽 (Banker) | 2-7: 12.1% (8.2) |
| 2 | LOOKING BRIGHT | 22.6% | 57.0% | 4.4 | ✅ | ✅ | 12 | 10 | 腳 (Leg) | 2-8: 11.0% (9.1) |
| 8 | RUBY THRIVE | 21.8% | 55.4% | 3.3 | ✅ | ✅ | 6 | 4 | 腳 (Leg) | 7-8: 11.4% (8.8) |
| 9 | DANCING BLAZE | 15.9% | 45.5% | 9 | ✅ | ✅ | 9 | 2 | 腳 (Leg) | 2-9: 8.3% (12.1) |
| 3 | CHARMING BABE | 3.9% | 17.6% | 22 | ❌ | ❌ | 5 | 10 | — | — |
| 11 | THUNDER PRINCE | 3.0% | 13.9% | 11 | ❌ | ❌ | 1 | 10 | — | — |
| 4 | GOLDEN ELITE | 2.7% | 13.9% | 38 | ❌ | ❌ | 8 | 0 | — | — |
| 5 | HANDSOME HERO | 2.3% | 11.8% | 5.0 | ❌ | ✅ | 11 | 0 | 腳 (Leg) — **Win-odds candidate, added directly** | — |
| 6 | GOOD POWER | 2.0% | 10.2% | 57 | ❌ | ❌ | 10 | 1 | — | — |
| 13 | SUPREME VOYAGER | 0.8% | 4.7% | 13 | ❌ | ❌ | 3 | 8 | — | — |
| 10 | E HO HO | 0.8% | 4.7% | 17 | ❌ | ❌ | 13 | 9 | — | — |
| 1 | HIGH PRAISE | 0.7% | 4.8% | 39 | ❌ | ❌ | 2 | 3 | — | — |
| 12 | PRECISION MIND | 0.6% | 4.6% | 52 | ❌ | ❌ | 4 | 4 | — | — |

**Market:** overround **22.0%**, favourite bias **−14.3%**, longshot bias **+172.6%**. The model and the market agree on three of the top four: **#8 RUBY THRIVE** (market favourite at 3.3, MC 21.8%), **#2 LOOKING BRIGHT** (2nd favourite at 4.4, MC 22.6%) and **#9 DANCING BLAZE** (9, MC 15.9%). They split sharply on two horses:

- **#7 HERO MASTERMIND — "undervalued by 1173%".** MC's #1 on Win% (22.7%, fair ~4.4) is **56** in the market, joint-2nd-longest in the field. One career start: a fading 10th of 14 on debut in June. It is the largest model/market gap in the race, and it decides the Strategy B banker (see the model caveat below).
- **#5 HANDSOME HERO — the market's 3rd choice at 5.0**, but MC has it at only 2.3% / 11.8%. It is an unraced debutant (won 3 of 4 trials), so the MC has no form to rate it on and falls back to defaults.

**Top MC quinellas:** 2-7 12.1% ($8.2) · 7-8 11.4% ($8.8) · 2-8 11.0% ($9.1) · 2-9 8.3% ($12.1) · 7-9 8.1% ($12.3). All five pairs come from **{#2, #7, #8, #9}**, so the model reads this as a four-horse race.

**Stability check (disclosed).** The simulator's RNG is unseeded, so I ran two more independent 10,000-iteration runs on the same saved card (scratch script). **#7 stayed MC #1 on Win% in all three runs** (22.7% / 23.4% / 23.6%), but #2, #7 and #8 swapped order on Place% every time (all within 55–57%). The Strategy B banker is therefore stable across re-runs, but the gap at the top is razor-thin (0.1pp in the canonical run).

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e) — paraphrased, tipster picks ignored
───────────────────────────────────────────────────────────

| # | Horse | SCMP Win | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------|------------------|----------|----------|-----------|---------------|
| 1 | HIGH PRAISE | 41 | — (two well-beaten runs since arriving; drops in grade, first try on the straight) | **+excuses** (raced wide with no cover for most of the race) | clear | — | On-pace (pushed up to the pace three wide) |
| 2 | LOOKING BRIGHT | 4.4 | — (front-running 2nd at HV 1200m last start; 2nd on the straight in Feb after a bleed) | clear | clear (Feb bleed is old history) | **+trial** (showed good speed finishing 2nd to a subsequent winner) | **Front / speed** |
| 3 | CHARMING BABE | 25 | — (won at this level at HV in Nov; bled last start; first try on the straight) | **+excuses** (checked when crowded ~350m) | **−injury30d** (blood in the trachea; passed 21-Aug = 23 days ago) | — | Unclear |
| 4 | GOLDEN ELITE | 38 | — (debutant; breeding notes; gelded in April; led all the way in 1 of 5 trials, on dirt) | — | castration 10-Apr (not an injury; >30d) | — (1 trial win from 5, not flagged) | Front (trial evidence only) |
| 5 | HANDSOME HERO | 4.8 | — (debutant; scratched in July after going down in the gate) | — (fractious in the gate, reared and struck its head, withdrawn by the stewards; one incident, so no −barrier) | **−injury30d** (withdrawn; passed 31-Aug = 13 days ago) | **+trial** (won 3 of 4 trials) | Unknown (unraced) |
| 6 | GOOD POWER | 61 | — (one-paced 9th from beyond midfield on debut) | **+excuses** (bumped at the start) | clear | — | Midfield |
| 7 | HERO MASTERMIND | 55 | — (faded to 10th from midfield on debut) | — (stewards: immature, will benefit from the experience) | clear | — | Midfield |
| 8 | RUBY THRIVE | 3.6 | — (7th → 3rd → distant 2nd, the last run on opening day) | — (hung out under pressure in the straight; self-inflicted, no flag) | clear | — | Midfield / stalker |
| 9 | DANCING BLAZE | 7 | — (distant 4th wide near the lead on debut, then a flat 9th; first try on the straight) | — (stewards: still immature) | clear | — | Mixed |
| 10 | E HO HO | 18 | — (several failures at Class 4; tracked the pace for 6th on dirt) | — (jumped only fairly; self-caused) | clear | — | On-pace |
| 11 | THUNDER PRINCE | 11 | — (won at HV in April; minor placings since) | **+excuses** (badly held up over the final 200m last start) | clear | — | Midfield / closer |
| 12 | PRECISION MIND | 51 | — (tired to 13th after sitting outside the leader last start) | **+excuses** (bumped soon after the start and again near 250m) | clear | — | On-pace |
| 13 | SUPREME VOYAGER | 13 | — (5th from midfield last time on the straight) | **+excuses** (unbalanced when crowded near 250m) | clear | **+trial** (won a recent 1000m trial at Conghua) | Midfield |

**Flag discipline applied (documented decisions):**
- `+excuses` was given only where the horse **received** trouble: #1 wide with no cover, #3 crowded/checked, #6 bumped, #11 held up, #12 bumped twice, #13 crowded. It was withheld from #10 (jumped only fairly), #8 (hung out) and #7 and #9 (immaturity notes). All of those are self-inflicted.
- `−injury30d` applies to **#3** (tracheal bleed, cleared 21-Aug, 23 days ago) and **#5** (struck its head in the gate and withdrawn, cleared 31-Aug, 13 days ago). #4's April castration is neither an injury nor recent.
- `−barrier` requires "bumped on jumping" in ≥2 recent runs. Nobody qualifies. #5's gate incident is a single occurrence (on a scratching), and #6 and #12 each have one "bumped at start" run.
- `trial +2` was granted where SCMP reports a trial **win** or strong trackwork: #2 (trackwork highlight), #5 (3 of 4 trials won), #13 (recent Conghua trial win). It was withheld from #4, which led all the way only once in five trials (a 20% trial strike rate, not described as recent).
- `+form` was not granted to anyone. #8's 7th → 3rd → 2nd sequence is a genuine progression, but SCMP never uses the trigger words (improved / rallied / made all), and the rule is keyword-based.
- `−age`: no runner is 8+. Oldest are #3 and #11 at 6.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 2 | LOOKING BRIGHT | 22.6% | 57.0% | trial +2 | trial +2 | **24.6%** | **59.0%** | 4.4 | K Teetan | 12 | Front | +trial | ★ 膽 (Banker) |
| 2 | 7 | HERO MASTERMIND | 22.7% | 55.7% | 0 | 0 | **22.7%** | **55.7%** | 56 | L Ferraris | 7 | Midfield | — | 腳 (Leg) — banker-ineligible (1 start) |
| 3 | 8 | RUBY THRIVE | 21.8% | 55.4% | 0 | 0 | **21.8%** | **55.4%** | 3.3 | Z Purton | 6 | Stalk | — | 腳 (Leg) |
| 4 | 9 | DANCING BLAZE | 15.9% | 45.5% | 0 | 0 | **15.9%** | **45.5%** | 9 | C Y Ho | 9 | Mixed | — | 腳 (Leg) |
| 5 | 11 | THUNDER PRINCE | 3.0% | 13.9% | excuses +2 | excuses +2 | 5.0% | 15.9% | 11 | B Avdulla | 1 | Midfield | +excuses | 腳 (Leg) |
| 6 | 13 | SUPREME VOYAGER | 0.8% | 4.7% | excuses +2, trial +2 | excuses +2, trial +2 | 4.8% | 8.7% | 13 | H Bentley | 3 | Midfield | +excuses, +trial | — |
| 7 | 6 | GOOD POWER | 2.0% | 10.2% | excuses +2 | excuses +2 | 4.0% | 12.2% | 57 | M L Yeung | 10 | Midfield | +excuses | — |
| 8 | 3 | CHARMING BABE | 3.9% | 17.6% | excuses +2, -injury30d −3 | excuses +2, -injury30d −4 | 2.9% | 15.6% | 22 | H Y Yuen (-10) | 5 | — | +excuses, −injury30d | — (first reserve) |
| 9 | 4 | GOLDEN ELITE | 2.7% | 13.9% | 0 | 0 | 2.7% | 13.9% | 38 | R Kingscote | 8 | Front (trials) | — | — |
| 10 | 1 | HIGH PRAISE | 0.7% | 4.8% | excuses +2 | excuses +2 | 2.7% | 6.8% | 39 | K C Leung | 2 | On-pace | +excuses | — |
| 11 | 12 | PRECISION MIND | 0.6% | 4.6% | excuses +2 | excuses +2 | 2.6% | 6.6% | 52 | H T Mo (-2) | 4 | On-pace | +excuses | — |
| 12 | 5 | HANDSOME HERO | 2.3% | 11.8% | trial +2, -injury30d −3 | trial +2, -injury30d −4 | 1.3% | 9.8% | **5.0** | C L Chau (-2) | 11 | Unknown | +trial, −injury30d | 腳 (Leg) — **rule 9 inclusion** |
| 13 | 10 | E HO HO | 0.8% | 4.7% | 0 | 0 | 0.8% | 4.7% | 17 | P N Wong (-7) | 13 | On-pace | — | — |

**Factor legend:** `trial +2` = trial win or trackwork highlight · `excuses +2` = TIR trouble received (bumped, crowded, held up, wide with no cover) · `-injury30d −3/−4` = vet clearance less than 30 days ago (Win/Place). The largest total adjustment is **+4** (#13). All adjustments sit inside the ±8% Win / ±10% Place cap, and no horse gets near the 50% / 85% ceiling. #4 and #1 tie on Adj Win% (2.7%); the tie is broken by Adj Place%. Adj Win% sums to 111.8% and Adj Place% to 309.8%. Neither is renormalised in the table, and the renormalisation used for the combination maths is disclosed below.

**Banker eligibility (rules 1 / 17):** The 1st-ranked **#2 LOOKING BRIGHT has 10 starts, so it is eligible.** For the record: had #7 been ranked 1st (it is only 0.1pp behind on raw MC Win%), it would have been **barred** under rule 17, because it has 1 career start (<2).

**雙膽拖 — not triggered.** The 2nd-ranked #7 has Adj Place% **55.7%**, below the 63% bar (and it is ineligible to bank anyway). **Single 膽拖.**

**Reasoning for the pool.**
1. **Mode B spine.** Top 3 by Adj Win% = **#2, #7, #8**. The must-include set (Adj Place% ≥ 25%, and equally ≥ 20% under Reminder 8) adds **#9** (45.5%). Nothing else reaches 20%.
2. **Rule 9 (no hard exclusion at ≤15 odds despite negative flags).** **#5 HANDSOME HERO** carries a `−injury30d` flag but is the **market's 3rd choice at 5.0**, so rule 9 forces it into the pool. Its low MC number comes from the model having no form to rate an unraced horse, not from anything the market is ignoring.
3. **Last slot by Adj Place%.** With the five mandatory horses placed, the 6th slot goes to the best remaining Adj Place%: **#11 THUNDER PRINCE (15.9%)**, narrowly ahead of **#3 CHARMING BABE (15.6%)**. #11 also has the only live excuse among the near-misses (badly held up last start) and is an 11 shot. #3 (22, bled last start) becomes first reserve. Rule 9 does not protect #3, because its odds are over 15.
4. **Mode B = 6, so #5 takes the slot that pure Adj Place% ranking would have given #3.** Both orderings are priced below. Under the model, the rule-9 pool gives up ~2pp of coverage in exchange for holding the market's 3rd favourite.

**Pace read.** The 1000m straight is a flat-out dash. The declared speed is **#2** (led for 2nd last start; draw 12), **#10** (draw 13), **#12** (sat outside the leader last time) and **#1** (pushed up three wide). **#8, #7, #13, #6** usually settle midfield. #2's front-running style fits a straight sprint, and it is the only pool member with both early speed and a trackwork highlight, which supports it as the anchor. General course knowledge (not a model input, and not used to adjust anything): the outside (stands-side) draws are often cited as an edge on this straight, and that would suit #2 (12) and #5 (11).

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#2, #7, #8, #9, #11, #5**
MODE: **B — Standard Pool** | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#2 LOOKING BRIGHT** (Adj Place% 59.0%) ← locked in every combo
腳 (Legs):  **#7, #8, #9, #11, #5**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

TOP TRIO COMBINATIONS. The primary column is Plackett-Luce fitted to Adj Place%. The raw-MC simulated probability (from the full 10,000-run Trio distribution) is shown alongside for reference. All 10 ticket combos are listed.

| Rank | Horses (any order) | Combined Place% (Adj, PL) | Est. Fair Odds | Raw MC simulated |
|------|--------------------|---------------------------|----------------|------------------|
| 1 | #2, #7, #8 | 9.49% | $11 | 9.95% |
| 2 | #2, #7, #9 | 6.82% | $15 | 7.22% |
| 3 | #2, #8, #9 | 6.75% | $15 | 7.22% |
| 4 | #2, #7, #11 | 1.85% | $54 | 1.77% |
| 5 | #2, #8, #11 | 1.83% | $55 | 1.61% |
| 6 | #2, #9, #11 | 1.32% | $76 | 1.16% |
| 7 | #2, #5, #7 | 1.10% | $91 | 1.43% |
| 8 | #2, #5, #8 | 1.09% | $92 | 1.29% |
| 9 | #2, #5, #9 | 0.78% | $128 | 1.03% |
| 10 | #2, #5, #11 | 0.21% | $474 | 0.27% |

**Ticket coverage: 31.2%** of the adjusted-model probability mass (**33.0%** under the raw MC simulation). The top three combos carry 23.1% of that.

**Fit note (disclosed):** Adj Place% sums to 309.8%, but a real top-3 distribution must sum to exactly 300%. The PL fit renormalises proportionally (~3.2% down per horse, e.g. #2 59.0% → 57.1%). The fit is exact after renormalisation (max error 0.0pp).

**Biggest hole — the banker-miss frame.** The single largest uncovered combination is **#7-#8-#9 (6.0% adj / 7.3% raw MC)**, larger than every ticket combo except the top three. After that come 7-8-11 (1.6%) and 7-9-11 / 8-9-11 (1.2% each). This is the price of the 膽拖 structure.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- **2-8-9 is the market's frame.** It is made of the favourite (3.3), the 2nd favourite (4.4) and the 4th choice (9). If it lands, the Trio dividend will be short, likely well below the $15 fair price on a public-heavy pool.
- **The value lives in #7.** The top two ticket combos (2-7-8, 2-7-9) both need a 56 shot to place. The model rates them at $11–15. The public will barely hold them, so if #7 does place, the dividend should be many multiples of fair. If the market is right about #7 (~1.5% win implied), those two combos are worth far less than modelled, and effective ticket coverage collapses toward the 2-8-9 frame plus the minor combos.
- **#5 is the other market horse.** Holding the 3rd favourite (the debutant) costs 4 combos ($40). Those 4 combos carry only 3.2% model coverage, because the MC cannot rate an unraced horse. This is the rule-9 hedge, and it is explicitly a market-over-model insurance line.
- **Quinella cross-check (rule 14): not possible.** The SCMP Q/QP matrix came back corrupt (see caveats). The model's quinella view (2-7, 7-8, 2-8, 2-9, 7-9) cannot be checked against pool prices.

**Verdict:** a reasonable-cost ticket anchored on a horse that the model and market both rate as a top-2 chance. The upside comes from the model's contrarian view of #7. Size it as a normal speculative Trio, not a conviction bet.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (Banker-Leg)
膽 (Banker): **#2 LOOKING BRIGHT**
腳 (Legs):  #7 HERO MASTERMIND, #8 RUBY THRIVE, #9 DANCING BLAZE, #11 THUNDER PRINCE, #5 HANDSOME HERO
COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

TOP COMBINATIONS (highest value):
  2-7-8 (9.49%) · 2-7-9 (6.82%) · 2-8-9 (6.75%) · 2-7-11 (1.85%) · 2-8-11 (1.83%) · 2-9-11 (1.32%) · 2-5-7 (1.10%) · 2-5-8 (1.09%)

Priced alternatives (not the recommendation; shown so the trade-offs are visible):
| Variant | Structure | Combos | Cost | Coverage (Adj PL) | Coverage (raw MC sim) |
|---------|-----------|--------|------|-------------------|-----------------------|
| **Recommended** | 膽拖 1膽#2 + 5腳 (7,8,9,11,5) | 10 | **$100** | 31.2% | 33.0% |
| Add #3 CHARMING BABE as 6th leg | 膽拖 1膽#2 + 6腳 | 15 | $150 | 36.7% | 39.6% |
| Pure Adj-Place% pool (#3 instead of #5, ignoring rule 9) | 膽拖 1膽#2 + 5腳 (7,8,9,11,3) | 10 | $100 | 33.3% | 35.2% |
| Full pool, no banker | C(6,3) of 2,7,8,9,11,5 | 20 | $200 | 44.1% | 47.8% |
| 雙膽拖 #2+#7 (**not sanctioned**: #7 is 55.7% < 63% and has 1 start) | 2膽 + 4腳 | 4 | $40 | 19.3% | 20.4% |

PASS CONDITIONS:
- If **#2 LOOKING BRIGHT** (banker) is scratched → **VOID the ticket**. Do not restructure (rule 10).
- If **#5 HANDSOME HERO** is scratched (it was withdrawn in July after acting up in the gate, so a late withdrawal is a live risk) → play 膽#2 + 4腳 (7,8,9,11): C(4,2) = 6 combos, **$60**.
- If **#2 drifts materially** (out past ~8 from 4.4), treat it as the market turning against the anchor and pass the race.
- If the field drops below 3 starters → pool refunded (not a live risk with 13 declared).
- If the going changes to Yielding/Heavy → re-run the MC. A straight-course sprint on soft ground reshuffles the speed horses.

CONFIDENCE: **LOW.** Four reasons: (1) the model cannot separate the top three: **#2, #7 and #8 all have an identical overall rating of 61** (rating diff 0), and their Win% gaps are simulation noise; (2) two of the ticket's three biggest combos depend on **#7, a 56 shot with one career start**, whose rating is largely driven by a default speed figure (see the model caveat); (3) the analyzer's own finish-time projection disagrees with its Win% ranking; (4) the market's 3rd choice is a debutant the model cannot rate. In its favour: the banker is the market's 2nd favourite with early speed and a trackwork highlight, so model and market agree on the anchor.

CAVEATS:
- **SCMP Q/QP matrix corrupt, not used.** The extracted values are impossible: identical Q and QP figures, 2-9 at 1.8 when the two horses are 4.4 and 9 to win, and 4-8 at 3.9 with #4 at 38. The quinella cross-reference (step 1e-vi / rule 14) could not be done.
- **SCMP Place odds unusable.** SCMP's Place column repeats its Win column (4.4/4.4, 41/39). `analyze-race.ts` also logged "place odds estimated from win odds". All Strategy B odds tests use **Win odds only**, which is what the rule specifies anyway.
- **Model caveat: why #7 tops the MC.** #2, #7 and #8 share an overall rating of **61**. There is no rating cap in `computeOverallRatingWithWeights`; the tie comes from the weighted components. With equal ratings, the only thing that separates them in `simulateSingleRace` is extra noise with SD = (1 − formScore) × 5. **#7's formScore is 0.357** (one 10th-place run), against 0.657 for #2 and 0.670 for #8. That gives #7 the widest spread (~3.2 vs ~1.7 rating points), which turns into **more wins but not more places**: its Place% (55.7%) is below #2's (57.0%). #7's average speed figure is 100.0, the same value the two unraced debutants receive. That suggests its single run is shrunk heavily toward a default. **#7's MC #1 Win% is best read as a variance effect on a thin-form horse, not a superior-ability reading.**
- **Internal model inconsistency.** The analyzer's finish-time projection ranks **#13, #12 and #11 as the three fastest**, and puts #2 (+9.2L) and #8 (+6.9L) near the back. It excludes the two debutants. The Trio ranking follows Win%/Place% as the skill specifies, but the two parts of the tool disagree on this race.
- **Distance log discrepancy (cosmetic).** The scraper logged `distance=1200m` for R2. The saved race card, the MC header, the finish-time projection and SCMP all say **1000m**, and the simulation ran at 1000m.
- **Odds snapshot is from 10:08 HKT**, ~3h20m before the off. Re-check #2 (banker), #5 and #9 before betting. #9 at 9 is close to the Win-odds<10 line, although it is a primary leg in Strategy B either way.
- **Thin form across the pool:** #4 and #5 are unraced, #6 and #7 have one start, and #9 has two. Jockey sample sizes are 2–18 rides per rider this season.
- **No `--use-saved` for the canonical run.** Win%/Place% in the tables come from the live-scrape CLI run. The Trio-combination probabilities come from a second 10,000-run simulation on the saved snapshot of the same card, because the CLI only prints the top quinellas. Top-level numbers match within MC noise (±~0.9pp).

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#7 HERO MASTERMIND** (MC Win% 22.7%, MC Place% 55.7%) ← 1st by MC Win% (ahead of #2 at 22.6% by 0.1pp; #1 in all three independent runs)

Primary legs (MC Place% > 20%): **#2 (57.0%), #8 (55.4%), #9 (45.5%)**

Replaceable legs (MC Place% 20–30% **AND** Win odds > 10): **none**. Every primary leg is above 30% on MC Place%, and all three are under 10 in the market (#2 4.4, #8 3.3, #9 9).

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10):
1. **#5 HANDSOME HERO** — Win odds **5.0**, MC Place% 11.8%
   (#9 at 9 is under 10 but is already a primary leg, so it is not a candidate.)

Action: **#5 added directly**, because there was no replaceable leg to swap it for.

Final legs: **#2, #8, #9, #5**
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = **6**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $60**

STRATEGY B TICKET (all 6 combos, raw-MC simulated probabilities):

| Rank | Horses (any order) | Simulated Prob | Est. Fair Odds |
|------|--------------------|----------------|----------------|
| 1 | #2, #7, #8 | 9.95% | $10 |
| 2 | #7, #8, #9 | 7.34% | $14 |
| 3 | #2, #7, #9 | 7.22% | $14 |
| 4 | #2, #5, #7 | 1.43% | $70 |
| 5 | #5, #7, #8 | 1.15% | $87 |
| 6 | #5, #7, #9 | 0.91% | $110 |

**Ticket coverage: 28.0%** (raw MC). The direct addition of #5 buys 3.5pp of coverage for $30. Without it, the 3-combo ticket (7 + 2,8,9) covers 24.5% for $30.

PASS CONDITIONS (B): if **#7** is scratched → VOID. If #5 is scratched → play 膽#7 + 3腳 (2,8,9): 3 combos, **$30**.

**Comparison vs Strategy A.** This race is a clean A/B test of the **banker**, not the legs. Both strategies hold #2, #7, #8, #9 and #5 and share the two biggest combos (2-7-8, 2-7-9). Where they differ:
- **A anchors on #2 LOOKING BRIGHT.** It is the market's 2nd favourite, and the model rates it level with the top. A adds #11 as a leg and spends $100 on 10 combos (33.0% raw-MC coverage).
- **B anchors on #7 HERO MASTERMIND.** It is a 56 shot with one start, and only the model rates it. A's debutant rule (<2 starts) would have barred it, but Strategy B's rules make MC #1 the banker unconditionally. B spends $60 on 6 combos (28.0%), and it covers the **7-8-9 frame that A misses** (7.3%).

Under the MC, both bankers place ~56% of the time, so the two tickets look similar. Under the market, B's banker is far weaker. **If #7 misses the top 3, every Strategy B ticket loses, while Strategy A can still land via 2-8-9, 2-8-11, 2-5-8 and so on.** Recording which banker places makes this race a useful data point for whether raw MC #1 on thin-form horses deserves the unconditional banker slot.
═══════════════════════════════════════════════════════════
