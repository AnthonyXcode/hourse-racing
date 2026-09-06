═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-06 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations — **healthiest run of the meeting** (r = +0.713 vs official ratings)
HISTORICAL SYNC: ✅ 218/219 fixtures scraped
SCMP DATA: ✅ Loaded — Star Form + TIR + Vet + one trackwork line. **SCMP place odds are corrupt for this race** (see caveats).
ODDS SOURCE: HKJC pool re-fetched on race morning (`fetch-odds.ts`, **00:26 HKT 06-Sep** — refreshed from yesterday's 20:07 capture), full 9-horse coverage.

RACE: R7 ALBERT HANDICAP — **Class 2** | 1400m | Turf | Good | 9 runners | 4:15pm
CLASSIFICATION: **Competitive by exactly 0.0pp** (top Adj Win% 20.0%) — see CLASSIFICATION NOTE
MODE: B — Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10 | UNIT BET: $10

## ►► RECOMMENDATION: **PASS (Mode D)** ◄◄

Not because the model is broken — it is the best-behaved run of the meeting. Because the **race** is genuinely wide open, every runner is first-up, and the skill's own rule defaults wide-open races to PASS. If you do play, Strategy B is the strongest skill-generated ticket of the meeting.

───────────────────────────────────────────────────────────
CLASSIFICATION NOTE — the play/pass line is decided by 0.0pp
───────────────────────────────────────────────────────────
| | Top horse Win% | Skill classification | Skill action |
|---|---|---|---|
| **Raw MC** | #2 at **18.0%** | **Wide open** (no horse ≥ 20%) | **Mode C / D — "Default to PASS"** |
| **Adjusted** | #2 at **20.0%** | Competitive (20–35%) | Mode B — play |

A single `+excuses +2` on #2 INVINCIBLE SHIELD — for one stewards' line, "held up between 400m-350m for clear running" — moves this race from *default PASS* to *play*. It lands on exactly 20.0%, the boundary value.

That is the third knife-edge classification this meeting (R5 tipped Competitive→Dominant on a +1; R6 was clear). When the decision to bet at all turns on one 2-point adjustment derived from a single sentence of stewards' text, the honest reading is the raw one: **this is a wide-open race.**

The field supports that. **Average differentiation is 4** — the lowest of the meeting — with six horses packed between 12.5% and 18.0% MC win:

```
#2 18.0  #1 17.5  #5 17.5  #4 14.5  #3 14.2  #7 12.5   ← six horses inside 5.5pp
```

───────────────────────────────────────────────────────────
THE FIRST-UP PROBLEM — this race has no current form at all
───────────────────────────────────────────────────────────
Every runner is resuming from the summer break. Days since last start:

| # | Horse | Last run | Days off |
|---|-------|----------|----------|
| 6 | SING DRAGON | 15 Jul | 53 |
| 1 | SOLEIL FIGHTER | 12 Jul | 56 |
| 5 | MAX QUE | 12 Jul | 56 |
| 2 | INVINCIBLE SHIELD | 1 Jul | 67 |
| 7 | VICTORY SKY | 27 Jun | 71 |
| 3 | WINNING OVATION | 21 Jun | 77 |
| 4 | SIX PACK | 21 Jun | 77 |
| 9 | INFINITE RESOLVE | 13 Jun | 85 |
| 8 | DROMBEG BANNER | **26 Apr** | **133** |

SCMP confirms it in words — "Resuming" against #1, #2 and #6, "Resuming after Meydan failure" for #6. The MC is therefore ranking nine horses entirely on form that is two to four months stale, with **zero current-season jockey or trainer data** loaded (season opener).

In a first-up field, trial and trackwork evidence is what separates runners, and SCMP published **exactly one trackwork line** for this race (#4 SIX PACK: "showed a nice turn of foot to finish second in his latest trial"). The single most decision-relevant input for this race type is almost entirely absent.

───────────────────────────────────────────────────────────
MODEL NOTE — healthy model, but it disagrees with the market on 6 of 9
───────────────────────────────────────────────────────────
Correlation with official ratings is the best of the meeting:

| Race | Pearson r |
|---|---|
| R4 | +0.195 |
| R5 | +0.249 |
| R6 | +0.581 |
| **R7** | **+0.713** |

No class artefact here — the field is uniformly Class 2 / Class 1 / Group form. Yet MC and the market still diverge widely, and in a structured way: **MC concentrates, the market spreads.**

| # | Horse | MC place% | Market top-3% | Gap |
|---|-------|-----------|---------------|-----|
| 8 | DROMBEG BANNER | 6.2% | **36.7%** | **+30.5** |
| 9 | INFINITE RESOLVE | 16.0% | **40.4%** | **+24.4** |
| 3 | WINNING OVATION | 44.2% | **57.7%** | +13.5 |
| 4 | SIX PACK | 43.3% | 47.5% | +4.2 |
| 6 | SING DRAGON | 5.6% | 10.2% | +4.6 |
| 5 | MAX QUE | 48.5% | 33.6% | −14.9 |
| 2 | INVINCIBLE SHIELD | 49.4% | 31.1% | −18.3 |
| 1 | SOLEIL FIGHTER | 47.6% | 26.0% | −21.6 |
| 7 | VICTORY SKY | 39.1% | 16.8% | −22.3 |

MC puts 272 of its 300 available place-points on six horses and gives #8 and #9 almost nothing. In a 9-runner field the baseline top-3 chance is 33.3%; **MC rating #8 DROMBEG BANNER (official rating 83, 116lbs, 7yo) at 6.2% is not credible**, and it is exactly the horse with the longest layoff — the model is penalising staleness in a race where every runner is stale. The market's flatter distribution is the more plausible read of a compressed Class 2.

The finish-time projection is inverted again — it ranks #7 VICTORY SKY fastest and puts #3 WINNING OVATION (2.3 favourite) last, 32.8 lengths back — and was ignored, as in R3–R6.

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Off.Rtg | Age | Draw | Days off | Form (last 6) | Role (Strategy B) | Top Quinella (fair) |
|---|-------|---------|-----------|----------|------------|-------------|---------|-----|------|----------|---------------|-------------------|---------------------|
| 2 | INVINCIBLE SHIELD | 18.0% | 49.4% | 12  | ✅ | ❌ | 100 | 6 | 1 | 67  | 5/5/3/2/1/8   | ★ 膽 (Banker) | 2-5: 7.4% (13.4) |
| 1 | SOLEIL FIGHTER    | 17.5% | 47.6% | 11  | ✅ | ❌ | **102** | 6 | 9 | 56 | 4/1/7/2/7/1 | 腳 (Leg) | 1-5: 7.0% (14.4) |
| 5 | MAX QUE           | 17.5% | 48.5% | 9.1 | ✅ | ✅ | 90  | 6 | 3 | 56  | 2/4/6/1/3/2   | 腳 (Leg) | 1-2: 6.8% (14.6) |
| 4 | SIX PACK          | 14.5% | 43.3% | 5.0 | ✅ | ✅ | 95  | 6 | 6 | 77  | 4/1/2/3/2/4   | 腳 (Leg) | 2-4: 6.2% (16.1) |
| 3 | WINNING OVATION   | 14.2% | 44.2% | **2.3** | ✅ | ✅ | 100 | 4 | 4 | 77 | 5/5/1/2/1/1 | 腳 (Leg) | 2-3: 6.3% (15.9) |
| 7 | VICTORY SKY       | 12.5% | 39.1% | 27  | ✅ | ❌ | 84  | 6 | 7 | 71  | 13/5/2/1/2/5  | 腳 (Leg) | — |
| 9 | INFINITE RESOLVE  | 3.8%  | 16.0% | 8.0 | ❌ | ✅ | 83  | 5 | 5 | 85  | 9/5/9/9/6/9   | 腳 (Leg — added) | — |
| 8 | DROMBEG BANNER    | 1.0%  | 6.2%  | 8.9 | ❌ | ✅ | 83  | 7 | 2 | **133** | 5/5/13/4/2/10 | 腳 (Leg — added) | — |
| 6 | SING DRAGON       | 1.0%  | 5.6%  | 45  | ❌ | ❌ | 86  | 7 | 8 | 53  | 11/7/2/7/10/6 | — | — |

**Market:** overround 23.9%, favourite bias −67.4%, longshot bias +91.2%. **#3 WINNING OVATION is a clear favourite at 2.3** (Purton, 4yo, form 5/5/1/2/1/1 with three wins in six) ahead of #4 SIX PACK at 5.0. The market is *not* treating this as wide open, even though the model is.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|------------|------|
| 1 | 2 | INVINCIBLE SHIELD | 18.0% | 49.4% | excuses +2 | excuses +2 | **20.0%** | **51.4%** | 12 | C Y Ho | 1 | +excuses (held up 400–350M); resuming | ★ 膽 (Banker) |
| 2 | 5 | MAX QUE | 17.5% | 48.5% | +form +1 | +form +1 | 18.5% | 49.5% | 9.1 | A Badel | 3 | +form (came from rear, C2 1600m win Mar) | 腳 (Leg) |
| 3 | 1 | SOLEIL FIGHTER | 17.5% | 47.6% | +form +1 | +form +1 | 18.5% | 48.6% | 11 | H Y Yuen (-10) | 9 | +form ("made all" ×2 in C2, 7 placings); resuming | 腳 (Leg) |
| 4 | 4 | SIX PACK | 14.5% | 43.3% | +form +1, trial +2 | (same) | 17.5% | 46.3% | 5.0 | K Teetan | 6 | +form (overdue 1400m winner); **+trial (2nd, nice turn of foot)** | 腳 (Leg) |
| 5 | 3 | WINNING OVATION | 14.2% | 44.2% | +form +1, excuses +2 | (same) | 17.2% | 47.2% | **2.3** | Z Purton | 4 | +form (easily won Apr, third win); +excuses (raced wide, no cover) | 腳 (Leg) |
| 6 | 7 | VICTORY SKY | 12.5% | 39.1% | -perf −2 | -perf −2 | 10.5% | 37.1% | 27 | M F Poon | 7 | **−perf (unacceptable performance 27/06, cleared 31/08)**; fractious in gates | 腳 (Leg) |
| 7 | 9 | INFINITE RESOLVE | 3.8% | 16.0% | +form +1 | +form +1 | 4.8% | 17.0% | 8.0 | A Atzeni | 5 | +form (1200m win Jan, C2 1400m 2nd) | out |
| 8 | 8 | DROMBEG BANNER | 1.0% | 6.2% | +form +1 | +form +1 | 2.0% | 7.2% | 8.9 | Y L Chung (-2) | 2 | +form (cheques in 6 of 8 last term); 133 days off | out |
| 9 | 6 | SING DRAGON | 1.0% | 5.6% | 0 | 0 | 1.0% | 5.6% | 45 | M Chadwick | 8 | resuming after Meydan failure | out |

**Factor legend:** `+form +1`, `+trial +2`, `excuses +2`, `-perf −2`. Ties on Adj Win% (#5 and #1 both 18.5%) broken by Adj Place%. No caps hit.

**`-injury30d` deliberately NOT applied to #7 VICTORY SKY.** Its vet entry reads *"Unacceptable performance; passed 31/08/2026"* — that is a stewards' unacceptable-performance order requiring a clearance before racing again, **not an injury**. The skill scopes `-injury30d` to "Vet report shows **injury** passed <30 days ago", so only `-perf −2` applies. Worth noting anyway that the clearance is dated **6 days before the race** and the horse was under stewards' watch; at 27 in the market it is the pool's weakest member on any reading.

**`-age` not applicable** — no runner is 8yo or above (oldest are #6 and #8, both 7). The C3+ ambiguity flagged in R4–R6 does not bite here.

**No `-notRO` for #9 INFINITE RESOLVE.** Its stewards' line is "a detailed rider judgment matter regarding early placement strategy" — an inquiry into tactics, not a finding that the horse was not ridden out. Not credited either way.

**No `+excuses` for #4 or #5** — both stewards' lines describe the horse **shifting in of its own accord** and causing the bump ("shifted in on jumping, bumped" / "shifted in at start, bumped"), consistent with how R6 treated self-inflicted incidents.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #2, #5, #1, #4, #3, #7 | MODE: B | POOL SIZE: 6
Must-include (Adj Place% ≥ 25%): #2 (51.4), #5 (49.5), #1 (48.6), #3 (47.2), #4 (46.3), #7 (37.1) — **exactly six, exactly the pool** ✅. No Mode conflict (unlike R4 and R5).

膽 (Banker): **#2 INVINCIBLE SHIELD** (Adj Place% 51.4%) — 10 starts, eligible
腳 (Legs): #1, #3, #4, #5, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10** | TOTAL STAKE: **$100**
雙膽拖 check: 2nd-ranked #5 Adj Place% 49.5% < 63% → single banker.
COVERAGE: MC-Adj **42.9%** | raw MC 44.4% | **Market 13.4%**
*(full C(6,3)=20 pool: 76.1% MC-Adj at $200 — note how high that is; six near-equal horses means the pool covers most outcomes, which is itself a sign the race is wide open)*

| Combo | MC-Adj | Fair | **Market** | Market fair |
|-------|--------|------|------------|-------------|
| 1-2-5 | 5.70% | $18 | 0.71% | $142 |
| 1-2-4 | 5.32% | $19 | 1.15% | $87  |
| 2-4-5 | 5.30% | $19 | 1.57% | $64  |
| 1-2-3 | 5.19% | $19 | 1.64% | $61  |
| 2-3-5 | 5.13% | $19 | 2.26% | $44  |
| 2-3-4 | 4.90% | $20 | 3.72% | $27  |
| 1-2-7 | 2.96% | $34 | 0.27% | $364 |
| 2-5-7 | 2.95% | $34 | 0.41% | $242 |
| 2-4-7 | 2.76% | $36 | 0.67% | $150 |
| 2-3-7 | 2.70% | $37 | 0.97% | $103 |

HKJC BET SLIP: Race 7 → Trio → 膽拖 → 膽: 2 | 腳: 1, 3, 4, 5, 7 | $10/combo

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — the best skill ticket of the meeting
───────────────────────────────────────────────────────────
Banker: **#2 INVINCIBLE SHIELD** (MC Win% 18.0%, MC Place% 49.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #5 (48.5%), #1 (47.6%), #3 (44.2%), #4 (43.3%), #7 (39.1%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **none** — every primary leg is at 39.1% or above, so nothing sits in the 20–30% band.
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **#9 INFINITE RESOLVE** (8.0, 16.0%), **#8 DROMBEG BANNER** (8.9, 6.2%)
Action (by Win odds ascending): no replaceable leg exists, so **both are added directly** — #9 first, then #8.
Final legs: **#1, #3, #4, #5, #7, #8, #9**
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = **21** | TOTAL STAKE: **$210**
COVERAGE: MC-Adj **50.8%** | raw MC 50.4% | **Market 28.9%**

**This is the rule working exactly as intended.** The "add directly" branch fires twice and brings in precisely the two horses the MC most underrates — #8 (+30.5pp vs market) and #9 (+24.4pp). Market coverage more than doubles, 13.4% → 28.9%. Contrast R2, where the replacement branch destroyed coverage, and R6, where it dropped the better horse. On a compressed field with no replaceable legs, the additive branch is the rule's best behaviour.

Highest-value combos on this ticket by market pricing: **2-3-4** (3.72%, $27), **2-3-9** (2.93%, $34), **2-3-8** (2.51%, $40), **2-3-5** (2.26%, $44), **2-4-9** (2.01%, $50).

HKJC BET SLIP: Race 7 → Trio → 膽拖 → 膽: 2 | 腳: 1, 3, 4, 5, 7, 8, 9 | $10/combo

**A vs B comparison:** Same banker. B costs $110 more and delivers **more than twice** the market coverage (28.9% vs 13.4%) plus 8pp more MC-Adj coverage (50.8% vs 42.9%). On every measure available, B dominates A here. If a ticket is struck on this race, it should be B.

───────────────────────────────────────────────────────────
THE BANKER — same issue as R6
───────────────────────────────────────────────────────────
#2 INVINCIBLE SHIELD is the skill's 膽 on Adj Win%, but the market rates it only **31.1%** to make the frame — 6th of 9. The market's frame leader is **#3 WINNING OVATION at 57.7%** (2.3 favourite, Purton, three wins from its last six).

| Ticket | Structure | Combos | Stake | MC-Adj | **Market** |
|---|---|---|---|---|---|
| Strategy A | 膽 #2 + 腳 #1,#3,#4,#5,#7 | 10 | $100 | 42.9% | 13.4% |
| Strategy B | 膽 #2 + 腳 #1,#3,#4,#5,#7,#8,#9 | 21 | $210 | 50.8% | 28.9% |
| Banker swap | 膽 #3 + 腳 #2,#4,#5,#8,#9 | 10 | $100 | 19.1% | **35.2%** |
| Banker swap, wider | 膽 #3 + 腳 #1,#2,#4,#5,#8,#9 | 15 | $150 | 34.9% | **46.1%** |

The #3-bankered ticket beats Strategy B on market coverage at **half the stake**. As in R6, the disagreement is about which horse gets locked into every combination — #2 stays in the ticket as a leg either way.

───────────────────────────────────────────────────────────
WHY PASS
───────────────────────────────────────────────────────────
1. **The skill's own default.** Raw MC makes this Wide open, and the skill says "Default to PASS for wide-open races unless strong pace/form conviction." The Competitive reclassification rests on a single +2 landing exactly on the 20.0% boundary.
2. **No conviction is available.** Every runner is first-up after 53–133 days. Trial and trackwork evidence is what resolves first-up fields, and SCMP published one such line for the whole race. Current-season jockey and trainer data: zero records.
3. **Six horses inside 5.5pp of each other** on MC win%, average differentiation 4 — the flattest field of the meeting. That the full 6-horse pool covers 76.1% of MC outcomes is a symptom, not a comfort: it means the model cannot separate them.
4. **Bankroll discipline.** Skill rule 6 caps a typical meeting at 2–3 Trio races. R5 and R6 already carry recommendations; this would be a third, on the weakest structural read of the four playable races.

Points 1–3 are about this race specifically. If you disagree with the PASS, **take Strategy B ($210, 28.9% market) or the #3-bankered swap ($100, 35.2%)** — not Strategy A, which is the weakest of the three on every measure.

PASS CONDITIONS (if played):
- Banker scratched → **VOID**, do not restructure (rule 10).
- Any two of #3, #4, #5 scratched → pass.
- **Watch #3 WINNING OVATION's price.** At 2.3 it is the shortest favourite of any race analysed this meeting. If it drifts beyond ~4 the market has lost confidence in a first-up runner and the whole shape changes; if it shortens further, the #3-bankered ticket strengthens and Strategy B weakens.
- Going to Yielding/Heavy → re-run MC.

CONFIDENCE: **LOW** — driven by race uncertainty, not model failure.

CAVEATS:
1. **SCMP place odds are corrupt for this race** — the Place column duplicates the Win column for 8 of 9 runners (#1 10.0/10.0, #2 11.0/11.0, #3 2.2/2.2, #6 42.0/42.0…). HKJC place odds were used throughout. This is the second SCMP parse fault this meeting, after R6's rating/odds collision on #1 SPICY STANDARD. If anything downstream consumes SCMP place odds, it is reading win odds.
2. **Odds were re-fetched on race morning** (00:26 HKT 06-Sep) and are fresher than R1–R6's 05-Sep capture, but still overnight rather than close to the 4:15pm jump. Re-check before betting.
3. **Every runner is first-up** (53–133 days). All MC form input is 2–4 months stale, and there is almost no trial data to compensate.
4. **Classification decided by 0.0pp.** Raw MC 18.0% (Wide open → PASS) vs adjusted 20.0% (Competitive → Mode B). See CLASSIFICATION NOTE.
5. **MC's distribution is implausibly concentrated** — #8 DROMBEG BANNER at 6.2% top-3 in a 9-runner field (baseline 33.3%), official rating 83, carrying 116lbs. Strategy B corrects for this via the Win-odds rule; Strategy A does not.
6. #7 VICTORY SKY's vet clearance is dated 6 days out following an **unacceptable performance** order. Penalised `-perf −2`; `-injury30d` not applied because no injury was reported. It stays in the Strategy A/B pool on Adj Place% 37.1% despite being 27 in the market.
7. Season opener — 0 jockey profiles and 0 trainer profiles loaded, as in R1–R6.
8. `winningMargin` still duplicates `finishPosition` in the historical data (found in R3, unfixed).
9. Market coverage comes from a Plackett-Luce fit to the HKJC place pool (9 runners → place pays top 3). A market-fitted model reproduces the market and cannot claim value against it; it is used to size disagreement only.
═══════════════════════════════════════════════════════════
