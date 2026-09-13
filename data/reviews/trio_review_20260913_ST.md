# Trio Post-Race Review — Sha Tin | 2026-09-13

**Meeting 3 of the 2026/27 season.** 10-race card, no scratchings, going **Good to Firm** throughout. Results: `data/historical/results_20260913_ST.json`. Bet records: `data/reports/trio_strategy_20260913_ST_R1–R10.md`.

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **10 (R1–R10)** |
| Hit rate | **1/10 (10.0%)** |
| Total staked | $870 |
| Total returned | $476 |
| **Net P&L** | **−$394** |
| **ROI** | **−45.3%** |
| Session Result | **LOSS** |

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 1400m | A 雙膽拖 (2膽+3腳) | #10, #11 | 14, 9, 2 | 10→9→11 | **HIT ✅** | $476 | $476 | **+$446** | — |
| R2 | C4 1000m | B (1膽+5腳) | #2 | 7, 8, 9, 11, 5 | 8→**12**→11 | MISS ❌ | $4,079 | $0 | −$100 | Banker fail (#2 10th) + pool gap (#12 at 94) |
| R3 | C5 1400m | B (1膽+5腳) | #12 | 3, 4, 8, 9, 13 | 13→**10**→8 | MISS ❌ | $783 | $0 | −$100 | Banker fail (#12 7th) + pool gap (#10 at 7.5, mkt 3rd) |
| R4 | C4 1200m | B (1膽+5腳) | #7 | 2, 4, 6, 8, 14 | 2→**3**→4 | MISS ❌ | $3,302 | $0 | −$100 | Banker fail (#7 11th) + pool gap (#3 at 14) |
| R5 | C4 1200m | A (1膽+4腳) | #10 | 9, 5, 3, 2 | 2→**12**→10 | MISS ❌ | $2,271 | $0 | −$60 | **Banker hit (#10 3rd)**, pool gap (#12 at 36) |
| R6 | C4 1600m | A 雙膽拖 (2膽+3腳) | #1, #7 | 4, 9, 11 | **13**→**5**→4 | MISS ❌ | $4,581 | $0 | −$30 | Both bankers fail (#1 9th, #7 8th) + 2 pool gaps |
| R7 | C4 1400m | B (1膽+5腳) | #5 | 2, 13, 1, 12, 9 | 12→1→**6** | MISS ❌ | $18,953 | $0 | −$100 | Banker fail (#5 11th) + pool gap (#6 at 59) |
| R8 | C3 1000m | B+ (1膽+6腳) | #4 | 1, 2, 12, 13, 8, 9 | **10**→1→**11** | MISS ❌ | $880 | $0 | −$150 | Banker fail (#4 7th) + 2 pool gaps (#10 at 11 mkt 2nd, #11 at 29) |
| R9 | C3 1200m | B (1膽+5腳) | #8 | 4, 3, 5, 2, 11 | 5→**1**→2 | MISS ❌ | $159 | $0 | −$100 | Banker fail (#8 8th) + pool gap (#1 at 6, mkt 2nd) |
| R10 | C3 1400m | A+ (1膽+5腳) | #12 | 1, 2, 8, 3, 14 | 12→2→**5** | MISS ❌ | $719 | $0 | −$100 | **Banker hit (#12 won)**, pool gap (#5 at 20) |

## Section 3: Hits Analysis

### R1 — HONG TUNG HANDICAP, Class 5, 1400m Turf

**Result: #10 RATTAN GALAXY (4.3) → #9 THE ALL ROUNDER (12) → #11 SUPERB GUY (7.1) — Trio $476**

| Horse | Role | Odds (SP) | MC Win% / Place% | Adj Place% | Result |
|-------|------|-----------|------------------|------------|--------|
| #10 RATTAN GALAXY | ★ 膽 Banker 1 | 4.3 | 63.3% / 92.2% | 85.0% (capped) | **1st** |
| #11 SUPERB GUY | ★ 膽 Banker 2 | 7.1 | 19.0% / 67.0% | 66.0% | **3rd** |
| #9 THE ALL ROUNDER | 腳 Leg 3 | 12 | 4.5% / 32.3% | 33.3% | **2nd** |
| #14 EXCEED THE WISH | 腳 Leg 1 | 7.3 | 7.5% / 42.4% | 42.4% | 13th |
| #2 LIGHTNING ACE | 腳 Leg 2 | 19 | 1.9% / 17.5% | 20.5% | 8th |

**What made this hit work.** Three things, in order of contribution:

1. **The 雙膽拖 trigger.** #11 SUPERB GUY at Adj Place% **66.0%** cleared the 63% bar and became Banker 2, collapsing the ticket from C(4,2)=6 combos ($60) to 3 combos ($30). He ran 3rd. Same return, half the stake — the structure doubled the ROI.
2. **#9 THE ALL ROUNDER surviving pool selection at MC Win% 4.5%.** He was the 4th leg by Adj Place% (33.3%) and the weakest horse the pool kept. He ran 2nd at 12. Had Mode A trimmed to 4 horses, this race is a miss.
3. **Model and market agreed on the anchor.** #10 was both MC #1 (63.3%, the card's highest) and the market favourite at 4.3. This is the only profile that worked all day (see §7c).

**Return calculation:** 3 combos × $10 = $30 staked. Winning combination 9-10-11 pays the Trio dividend **$476** on a $10 unit. Net **+$446**, ROI **+1,487%** on the race.

## Section 4: Miss Classification

| Pattern | Count | Races |
|---------|-------|-------|
| **A** — Banker fail, all 3 placers already in legs | **0/9** | — |
| **B** — Banker hit, pool gap | **2/9** | R5, R10 |
| **C** — Banker fail **and** pool gap | **7/9** | R2, R3, R4, R6, R7, R8, R9 |

### Pattern A: Banker Fail — All 3 Placers Already in Legs

**None.** Not a single race this meeting had all three placers sitting in the leg pool behind a failed banker. This is worth stating plainly: the losses were not bad luck on the banker choice alone.

### Pattern B: Banker Hit — Pool Gap (2/9)

| Race | Banker | Pos | Other placer in pool | Pool gap | Gap SP | Gap market rank | Missed return |
|------|--------|-----|----------------------|----------|--------|-----------------|---------------|
| R5 | #10 SPIRITED STEED | 3rd | #2 KEMPES (1st) | **#12 NOBLE SUPERIOR** (2nd) | 36 | 12th of 14 | $2,271 |
| R10 | #12 NYX GLUCK | **1st** | #2 AEROVOLANIC (2nd) | **#5 CHIU CHOW SPIRIT** (3rd) | 20 | 8th of 14 | $719 |

Combined Pattern B missed return: **$2,990**. In both cases the pool had 2 of 3 and the banker performed exactly as modelled. Neither gap horse was a reserve; both were rated out of the pool by Adj Place% and out of contention by the market too.

### Pattern C: Banker Fail + Pool Gap (7/9)

| Race | Banker | SP | Pos | Pool gap(s) | Gap SP |
|------|--------|----|-----|-------------|--------|
| R2 | #2 LOOKING BRIGHT | 4.6 | 10th | #12 PRECISION MIND (2nd) | 94 |
| R3 | #12 CHILL MASTER | 8.5 | 7th | #10 FORTUNE KINGO (2nd) | 7.5 (mkt 3rd) |
| R4 | #7 LUCKY DOCTOR | 5.9 | 11th | #3 BRIGHT MORTAR (2nd) | 14 |
| R6 | #1 VICTOR SUPREME + #7 BEAUTY MISSILE | 2.9 / 23 | 9th / 8th | #13 LUCK IS BACK (1st), #5 LUCKY YEAR (2nd) | 32, 5.7 (mkt 3rd) |
| R7 | #5 STORM MIRROR | 4.1 | 11th | #6 LADY'S LOVE (3rd) | 59 |
| R8 | #4 STRAIGHT TO GLORY | 19 | 7th | #10 ALPHA STRIKE (1st), #11 CONGHUA GALAXY (3rd) | 11 (mkt 2nd), 29 |
| R9 | #8 THUNDER KIT | 8.9 | 8th | #1 CHILL BUDDY (2nd) | 6 (mkt 2nd) |

**Pattern C was the dominant miss pattern at 7/9.** Both the anchor and the pool were wrong in the same race, seven times out of nine. No ticket-structure change fixes a Pattern C race — the underlying ranking has to change.

Banker failure positions were not narrow: **10th, 7th, 11th, 9th/8th, 11th, 7th, 8th.** Not one failed banker finished 4th or 5th.

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 雙膽拖 2膽+3腳, $30 | (hit as bet) | ✅ $476 | — |
| R2 | 膽拖 #2 + 5腳, $100 | No structural fix — banker 10th, gap #12 at 94 (mkt 12th) | ❌ | — |
| R3 | 膽拖 #12 + 5腳, $100 | Keep banker, add #10 (mkt 3rd) as 6th leg → C(6,2)=15 | ❌ (banker 7th) | +$50, still loses |
| R4 | 膽拖 #7 + 5腳, $100 | No structural fix — banker 11th | ❌ | — |
| R5 | 膽拖 #10 + 4腳, $60 | **Add #12 NOBLE SUPERIOR as 5th leg → C(5,2)=10** | **✅ $2,271** | **+$40** |
| R6 | 雙膽拖 #1+#7 + 3腳, $30 | No structural fix — both bankers 9th/8th | ❌ | — |
| R7 | 膽拖 #5 + 5腳, $100 | No structural fix — banker 11th | ❌ | — |
| R8 | 膽拖 #4 + 6腳, $150 | No structural fix — banker 7th, two gaps | ❌ | — |
| R9 | 膽拖 #8 + 5腳, $100 | No structural fix — banker 8th | ❌ | — |
| R10 | 膽拖 #12 + 5腳, $100 | **Add #5 CHIU CHOW SPIRIT as 6th leg → C(6,2)=15** | **✅ $719** | **+$50** |

**Fixable misses:** 2 races (R5, R10) — **$2,990 recoverable for $90 extra stake**. Both are pure pool-width fixes on races where the banker already worked. A blanket "+1 leg in every race" rule this card would have cost +$540 across 10 races and returned +$2,990 → net **+$2,450**. That is a single-meeting retrofit and must be backtested before adoption; the same rule applied to the 09-Sep card was also flagged and also unproven.

**Unfixable misses:** 7 races (R2, R3, R4, R6, R7, R8, R9) — every one is a Pattern C banker failure. Adding legs cannot rescue a ticket whose 膽 finished 7th–11th. R2 is additionally a genuine upset: #12 PRECISION MIND ran 2nd at **94**, market rank 12 of 13.

## Section 6: Key Moments

- **Best Bet — R1 雙膽拖.** $30 → $476. The 63% Banker-2 rule fired at 66.0%, cut the ticket from 6 combos to 3, and both bankers placed. The cheapest ticket on the card was the only winning one.

- **Worst Bet — R8.** The card's largest stake ($150, 15 combos) on the card's weakest coverage (19.3% MC). Banker #4 STRAIGHT TO GLORY was a **19-shot** promoted to banker only because the 1st-ranked #1 SOLID STATE was blocked by the <2-starts debutant rule. #1 went on to run **2nd at 1.5**. The A-only debutant-banker rule cost this race directly — see §11e.

- **Most Frustrating — R10.** The model's highest-confidence call of the meeting (MEDIUM-HIGH, MC #1 in 6/6 re-runs, finish-time projection agreeing for the only time all day). #12 NYX GLUCK **won**. #2 AEROVOLANIC, a pool leg, ran **2nd**. Third was #5 CHIU CHOW SPIRIT at 20 — one horse outside a 6-horse pool. Everything the model was confident about came true and it still returned $0.

- **Biggest Surprise — R7.** #12 ABSOLUTE AWAKENED (24) → #1 ETALON OR (9.4) → #6 LADY'S LOVE (59). **Trio paid $18,953**, the card's largest. Two of the three were pool legs; the banker #5 STORM MIRROR, the 4.1 market favourite with a +trial flag, ran **11th**.

- **Best MC Call — R1 #10 RATTAN GALAXY.** MC 63.3% win / 92.2% place, the highest conviction on the card; SP 4.3; won. Runner-up: the MC correctly rated **#9 THE ALL ROUNDER** into the pool at 32.3% place despite a 12 SP and gate 14 — he ran 2nd and completed the only winning combination.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 2 | R1 (#10), R10 (#12) |
| Banker 2nd–3rd | 1 | R5 (#10, 3rd) |
| Banker out of top 3 | 7 | R2, R3, R4, R6, R7, R8, R9 |

**Banker strike rate (top 3): 3/10 = 30.0%**
**Banker win rate: 2/10 = 20.0%**

For the 雙膽拖 races, both bankers must place: R1 ✅ (1st + 3rd), R6 ❌ (9th + 8th).

SKILL.md (trio-strategy) reminder 7 asserts the #1-ranked horse has **~82% top-3 rate**. Observed this meeting: **30.0%**. Season to date: **10/27 = 37.0%**. Across the full MC #1 place log the rate is **50.4%** (186/369 legs, 37 meetings). **Every 膽拖 cost/coverage table in the skill is derived from the 82% figure and none of them is valid at 37%.**

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | **1/10** |
| All 3 in pool OR banker + 2 legs | 1/10 |
| At least 2 placers in pool | **9/10** |
| Banker hit + pool gap | 2/10 |
| Top-3 slots captured by pool (of 30) | **19/30 = 63.3%** |

Random baseline for a ~5.8-horse pool in a ~13.9-runner field is ≈39% of top-3 slots. At 63.3% the pool has real selection signal — it is roughly 1.6× random — but Trio requires all three simultaneously, and 9/10 races stopped at exactly two.

### 7c. MC-Market Divergence Outcomes

| Race | MC #1 | SP | Mkt rank | Fin | Market fav | SP | Fin | Divergence | MC correct? |
|------|-------|----|----------|-----|------------|----|-----|------------|-------------|
| R1 | #10 RATTAN GALAXY | 4.3 | 1 | **1st** | #10 (same) | 4.3 | 1st | agree | — |
| R2 | #7 HERO MASTERMIND | 83 | 11 | 7th | #8 RUBY THRIVE | 3.5 | **1st** | MC prefers mkt-11th | ❌ |
| R3 | #12 CHILL MASTER | 8.5 | 4 | 7th | #13 DRACO | 4.6 | **1st** | MC prefers mkt-4th | ❌ |
| R4 | #8 SPEEDY PATCH | 17 | 8 | 14th | #12 ENJOY GOLF | 2.9 | 9th | MC prefers mkt-8th | ❌ |
| R5 | #9 ROAD TO GLORY | 7.5 | 4 | 8th | #10 SPIRITED STEED | 4.1 | **3rd** | MC prefers mkt-4th | ❌ |
| R6 | #1 VICTOR SUPREME | 2.9 | 1 | 9th | #1 (same) | 2.9 | 9th | agree | — |
| R7 | #2 MEGA MASTERMIND | 6.6 | 4 | 8th | #5 STORM MIRROR | 4.1 | 11th | MC prefers mkt-4th | ❌ |
| R8 | #1 SOLID STATE | 1.5 | 1 | **2nd** | #1 (same) | 1.5 | 2nd | agree | — |
| R9 | #8 THUNDER KIT | 8.9 | 3 | 8th | #5 LUCY IN THE SKY | 2.1 | **1st** | MC prefers mkt-3rd | ❌ |
| R10 | #12 NYX GLUCK | 2.1 | 1 | **1st** | #12 (same) | 2.1 | 1st | agree | — |

**MC divergence accuracy: 0/6 cases MC was correct (0%).**

This is the meeting's central finding. In the **4 races where MC #1 was also the market favourite**, the banker placed **3 times** (R1 1st, R8 2nd, R10 1st; only R6 failed). In the **6 races where MC picked a different horse from the market**, the MC pick finished **7th, 7th, 14th, 8th, 8th, 8th — zero placings**, while the market favourite placed in 3 of those 6.

Market favourite top-3 across the card: **7/10 (70%)**. MC #1 top-3: **3/10 (30%)**. On this card the MC ranking carried no information the odds board did not already carry, and its disagreements were pure noise.

### 7d. SCMP +Excuses Flag Performance

`+excuses` was applied to **74 of ~139 runners — 53% of every horse on the card.**

| Race | Horse | +Excuses For | Finished | Verdict |
|------|-------|--------------|----------|---------|
| R1 | #11 SUPERB GUY | interference received | 3rd | ✅ |
| R2 | #11 THUNDER PRINCE | interference received | 3rd | ✅ |
| R2 | #12 PRECISION MIND | interference received | 2nd | ✅ |
| R3 | #13 DRACO | interference received | 1st | ✅ |
| R4 | #3 BRIGHT MORTAR | interference received | 2nd | ✅ |
| R5 | #2 KEMPES | interference received | 1st | ✅ |
| R5 | #12 NOBLE SUPERIOR | interference received | 2nd | ✅ |
| R6 | #4 FLYING BOOM | steadied near 400M | 3rd | ✅ |
| R6 | #5 LUCKY YEAR | racing tight | 2nd | ✅ |
| R6 | #13 LUCK IS BACK | hampered after start | 1st | ✅ |
| R7 | #1 ETALON OR | interference received | 2nd | ✅ |
| R7 | #12 ABSOLUTE AWAKENED | interference received | 1st | ✅ |
| R7 | #6 LADY'S LOVE | interference received | 3rd | ✅ |
| R8 | #1 SOLID STATE | interference received | 2nd | ✅ |
| R9 | #2 AURORA PATCH | interference received | 3rd | ✅ |
| — | *(59 further flagged runners)* | — | 4th or worse | ❌ |

**+Excuses hit rate (top 3): 15/74 (20.3%)** — against a base rate of 3 places ÷ ~13.9 runners = **21.6%**.

**The flag performed 1.3pp *below* random.** A +2 bonus applied to more than half the field cannot discriminate by construction: it shifts the whole distribution up, inflates Adj Place% (R6's column summed to **324%** against the 300% a real top-3 distribution must total), and pushes races across classification thresholds. R4 is the clearest damage — it qualified as "Competitive" only because SCMP added +4 to #7 LUCKY DOCTOR, who then ran 11th.

For contrast, the other trackwork flag did work:

| Flag | Flagged | Top 3 | Rate | vs 21.6% base |
|------|---------|-------|------|---------------|
| `+excuses` (+2) | 74 (53% of field) | 15 | **20.3%** | **−1.3pp** |
| `+trial` (+2) | 24 | 8 | **33.3%** | **+11.7pp** |

### 7e. Divergence Override Assessment

**No discretionary divergence override was applied this meeting.** All ten tickets were rule output. Two rule-driven banker substitutions did occur and both are assessed in §11e:

- **R5** — 1st-ranked #9 ROAD TO GLORY blocked by the debutant rule (1 career start); banker became #10. **#9 ran 8th, #10 ran 3rd.** The rule was correct and saved the race from a worse outcome.
- **R8** — 1st-ranked #1 SOLID STATE blocked by the same rule (<2 starts); banker became #4 STRAIGHT TO GLORY at 19. **#1 ran 2nd at 1.5, #4 ran 7th.** The rule cost the banker directly.

Net across the two: the debutant rule was 1-for-1 and did not change either race's hit/miss outcome (R5 lost to a pool gap, R8 had two pool gaps), but the R8 application is the stronger signal because the blocked horse was the 1.5 favourite.

## Section 7f: Tooling defect found and fixed during this review

Running the Step 5c aggregator surfaced a pre-existing bug in `tools/summarize-trio-stratc-hit-rate.ts`. Its table parser was written for the earliest review layout and never updated as the review format drifted, so it **silently matched nothing** in files it could not read — no error, no warning, just a missing meeting.

| | Before fix | After fix |
|---|---|---|
| Review files discovered | 37 | 37 |
| Files actually parsed | **19** | **37** |
| Races counted | 205 (2 meetings double/triple-counted) | **369** |
| Hits | 39 | **72** |
| Reported hit rate | 19.0% | **19.5%** |
| Header claimed | "across 37 meetings" | accurate |

Four distinct format variants were unhandled:

1. **Heading drift** — `## Race-by-Race Results` (earliest), `## Strategy B: Race-by-Race Results`, and `## Race-by-Race[ Results] — Strategy B` (21-Jun onward). Only the middle form was matched.
2. **Row-label drift** — rows are `| R1 |` in some files and `| 1 |` in others; only `| R1 |` was matched.
3. **Hit-cell drift** — `✅`, `**✅**`, and `**HIT ✅**` all occur; the code used `startsWith("✅")`, so the bolded forms read as misses.
4. **Sub-headings and indented tables** — two files nest the table under `### Strategy B`, and two indent their table rows by one space.

It also **double-counted** `20260503_ST` (33 rows for 11 races) and `20260527_HV` (24 rows for 9), because the row loop ran past the Strategy B table into the Strategy A table below it whenever no `**TOTAL**` row intervened.

The parser now accepts all four variants, stops at the next heading or TOTAL row, and dedupes by race number. **Cross-check:** the corrected count (369 legs / 37 meetings) matches `summarize-mc-top1-place-breakdown.ts` exactly, which reads the same meetings through an independent path. Every meeting's parsed race count equals the race count in its `results_*.json`.

**Every stratC segment statistic produced before this review understated the sample by 45% and excluded the entire 2026/27 season.** The headline rate barely moved (19.0% → 19.5%), but all per-segment breakdowns in `data/static/trio_stratC_hit_rate_by_segment_*.md` dated before 2026-09-13 should be treated as unreliable.

## Section 8: Learnings

### What Worked

- **雙膽拖 when both anchors are genuine.** R1 returned 15.9× stake on 3 combos. The structure is sound; the entry condition is what needs measuring.
- **`+trial` flag: 8/24 top-3 = 33.3%** vs a 21.6% base — **+11.7pp**. The only SCMP signal that paid for itself this meeting.
- **The debutant-banker rule was net-correct.** Blocked #9 (ran 8th) in R5; blocked #1 (ran 2nd) in R8. 1-for-1, and it protected the meeting's only Mode-A-with-hit structure.
- **Pool selection beats random by 1.6×** (63.3% vs ~39% of top-3 slots). The pipeline has signal — it is miscalibrated, not worthless.
- **Self-reported confidence was well calibrated.** LOW went 0/6; the single hit came from a MEDIUM race. The labels were right (§9).

### What Didn't Work

- **Banker top-3 rate 30.0% against a design assumption of ~82%.** Three meetings: 10/27 = 37.0%. Failed bankers finished 7th–14th, never 4th or 5th — these are not near-misses.
- **MC–market divergence went 0 for 6.** Every banker that beat the market's favourite in the model's ranking finished 7th or worse. The 3 successful bankers were all races where MC #1 *was* the market favourite.
- **`+excuses` is measured noise** — 53% of the field flagged, **20.3%** top-3 rate against a **21.6%** base. It inflates Adj Place% past 300% and promotes races into tighter modes (R4).
- **No PASS discipline.** Six LOW-confidence races took $540 (62% of card stake) for zero return. The reports named the risk (R4: *"A PASS on this race is defensible"*) and bet anyway.
- **Rule 9 is a reporting line, not a rule.** Five of the eleven excluded placers were **market top-3 choices** (R3 #10, R6 #5, R8 #10, R9 #1). Each report printed the "not in pool, market ≤ 15" check and took no action on it.
- **Going was wrong in 7 of 10 reports.** R1–R7 recorded "Good"; the entire card ran **Good to Firm**.

### Strategy Adjustments

- [ ] **Replace the ~82% banker claim in trio-strategy SKILL.md reminder 7 with the measured rate** (37.0% over 27 races this season; ~51% over the full MC #1 place log) and re-derive every 膽拖 combination/coverage table from the real number.
- [ ] **Add a hard PASS rule: confidence LOW → PASS.** On this card that is −$394 → **+$146**. Backtest against the 06-Sep and 09-Sep cards before adopting.
- [ ] **Never bank a horse the market rates outside its top 3.** 0/6 this meeting when MC diverged; 3/4 when MC #1 was the market favourite. Testable as a hard filter.
- [ ] **Set `+excuses` to +0 pending evidence**, or gate it to fire on at most the 25% most severe cases per race. Currently 53% coverage at below-base-rate accuracy.
- [ ] **Keep and re-test `+trial` at +2** (33.3% vs 21.6%, n=24) — track it separately for another 3 meetings before increasing weight.
- [ ] **Renormalise Adj Place% to 300% before classification**, not afterwards inside the Plackett-Luce fit, so flag inflation cannot promote a race into a tighter mode.
- [ ] **Enforce rule 9 as a must-include:** any horse with market rank ≤ 3 enters the pool regardless of Adj Place%. Would have covered R3 #10, R6 #5, R8 #10, R9 #1 this card.
- [ ] **Measure the 雙膽拖 Banker-2 threshold before changing it.** SKILL.md line 51 says ≥70%, lines 333/372/469/658 say ≥63%. R1 fired at 66.0% and was the card's only hit; R6 fired at 70.5% and both bankers failed. Resolve with data, not by picking the stricter number.
- [ ] **Backtest "+1 leg in every race"** — +$540 stake, +$2,990 return on this card (net +$2,450), and the same rule was flagged unproven on 09-Sep. Two single-meeting retrofits do not make a rule.
- [ ] **Fix the going field in the racecard pipeline** (7/10 reports wrong) and the R6 racecard distance log (`distance=1200m` on a 1600m race).
- [ ] **Fix the SCMP scraper**: Place column mirrored Win in all 10 races (rule 14 cross-check skipped card-wide); Q/QP matrix unparseable in all 10 (rule 1e-vi never ran).
- [ ] **Investigate the finish-time projection**, which contradicted the Win%/Place% ranking in 9 of 10 races. Note R10 — the one race where projection and simulation agreed — was the one race the banker won. Test "projection agrees with simulation" as a banker filter.
- [ ] **Re-fetch odds within 30 minutes of each race for R5 onward.** All ten reports used the 10:08 HKT snapshot, 7.5 hours stale by R10, and Strategy B leg counts are odds-gated at <10.
- [x] **Fixed `tools/summarize-trio-stratc-hit-rate.ts`, which was silently dropping 18 of 37 review files** (see §7f). Re-run and verified: 369 legs across 37 meetings, every meeting's race count matching its results JSON.

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | — | — | — | — | — | — |
| MEDIUM-HIGH | R10 | 0/1 | $100 | $0 | −$100 | −100.0% |
| MEDIUM | R1, R7 | **1/2** | $130 | $476 | **+$346** | **+266.2%** |
| MEDIUM-LOW | R9 | 0/1 | $100 | $0 | −$100 | −100.0% |
| LOW | R2, R3, R4, R5, R6, R8 | 0/6 | $540 | $0 | −$540 | −100.0% |
| **TOTAL** | **10** | **1/10** | **$870** | **$476** | **−$394** | **−45.3%** |

The single hit came from the **MEDIUM** band, which was the card's only profitable tier. **LOW confidence went 0/6 for −$540** — 62% of total stake, zero return. The self-assessment was accurate and the staking ignored it: a PASS-on-LOW rule alone converts this meeting from **−$394 (−45.3%)** to **+$146 (+44.2%)**.

MEDIUM-HIGH going 0/1 is not evidence against the top band — R10's banker won and the ticket lost to a single 20-1 pool gap.

## Section 10: Running Total (Season Cumulative)

### 10a. Meeting-by-Meeting P&L

| Meeting | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI |
|---------|------|-------|-------|------|--------|----------|-----|-----|
| 1 | 2026-09-06 | ST | 9 | 2 | $870 | $791 | −$79 | −9.1% |
| 2 | 2026-09-09 | HV | 8 | 0 | $640 | $0 | −$640 | −100.0% |
| **3** | **2026-09-13** | **ST** | **10** | **1** | **$870** | **$476** | **−$394** | **−45.3%** |
| **TOTAL** | | | **27** | **3** | **$2,380** | **$1,267** | **−$1,113** | **−46.8%** |

> Carried forward from the 09-Sep review, including its note that the 06-Sep review is internally inconsistent (§10a there records 6 races / 1 hit / $700; §10e records 9 races / 2 hits / $870). The §10e figures remain the basis here. **Still unreconciled — worth closing before Meeting 4.**

### 10b. Cross-Meeting Banker Performance

| Meeting | Banker Top 3 | Rate |
|---------|--------------|------|
| 2026-09-06 ST | 3/9 | 33.3% |
| 2026-09-09 HV | 4/8 | 50.0% |
| **2026-09-13 ST** | **3/10** | **30.0%** |
| **Combined** | **10/27** | **37.0%** |

Three meetings, three readings between 30% and 50%, none remotely near the 82% the rule assumes.

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| **Sha Tin** | **2** | **19** | **3** | **$1,740** | **$1,267** | **−$473** | **−27.2%** | **6/19 (31.6%)** |
| Happy Valley | 1 | 8 | 0 | $640 | $0 | −$640 | −100.0% | 4/8 (50.0%) |

### 10d. Season Trajectory

| Metric | 2026-09-06 (M1) | 2026-09-09 (M2) | **2026-09-13 (M3)** | Trend |
|--------|-----------------|-----------------|---------------------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | **10.0%** | ↑ off the floor, still far below break-even |
| Cumulative P&L | −$79 | −$719 | **−$1,113** | ↓↓ |
| Cumulative ROI | −9.1% | −47.6% | **−46.8%** | → flat |
| Banker top 3 (meeting) | 33.3% | 50.0% | **30.0%** | ↓ |
| Banker top 3 (cumulative) | 33.3% | 41.2% | **37.0%** | ↓ |

### 10e. Cumulative A/B Comparison

| Meeting | Date | Venue | A Hits | A P&L | A ROI | B Hits | B P&L | B ROI | Winner |
|---------|------|-------|--------|-------|-------|--------|-------|-------|--------|
| 1 | 2026-09-06 | ST | 2/9 | −$79 | −9.1% | 2/9 | −$109 | −12.1% | A |
| 2 | 2026-09-09 | HV | 0/8 | −$640 | −100.0% | 0/8 | −$800 | −100.0% | Tie |
| **3** | **2026-09-13** | **ST** | **1/10** | **−$394** | **−45.3%** | **1/10** | **−$524** | **−52.4%** | **A** |
| **TOTAL** | | | **3/27** | **−$1,113** | **−46.8%** | **3/27** | **−$1,433** | **−53.0%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat). See §11a for the naming collision with B-trio.*

| Cumulative Metric | Strategy A | Strategy B (review-spec) | Delta (B − A) |
|-------------------|-----------|--------------------------|---------------|
| Total meetings | 3 | 3 | — |
| Total races | 27 | 27 | 0 |
| Hits (rate) | 3/27 (11.1%) | 3/27 (11.1%) | 0 |
| Total staked | $2,380 | $2,700 | +$320 |
| Total returned | $1,267 | $1,267 | $0 |
| **Cumulative P&L** | **−$1,113** | **−$1,433** | **−$320** |
| **Cumulative ROI** | **−46.8%** | **−53.0%** | **−6.2 pp** |
| Banker top 3 rate | 10/27 (37.0%) | 10/27 (37.0%) | 0 |

Three meetings in, the season stands at **−$1,113 / −46.8% ROI** on Strategy A, and this card added −$394 without changing the ROI trajectory. **The A/B comparison remains settled but uninformative: A has led B on P&L at all three meetings, and the two have still never diverged on a selection outcome** — both anchor on the same horse in 8 of 10 races here and hit and miss together every time. The difference is stake sizing, nothing more. **The structural finding that actually matters is in §7c: MC #1 placed 30% of the time, and in the six races where the model disagreed with the market about the best horse, it was wrong six times out of six.** Until the banker model is re-fitted, no pool-sizing or ticket-structure choice on either side of the A/B is worth arguing about.

## Section 11: A/B Strategy Comparison

### 11a. Strategy B derivation and the naming collision

> **Two different things are called "Strategy B".** The *post-race-review* skill (§11a) defines it as **MC top 6 by raw Win%, banker = MC #1, 膽拖 1膽+5腳 = 10 combos, $100 flat, all races**. The *trio-strategy* skill defines its own Strategy B as **banker = MC #1, legs = every horse with MC Place% > 20%, plus a Win-odds<10 swap/add rule**, with variable stake. The pre-race reports generated for this meeting — and therefore what was actually "bet" — use the trio-skill version. Both are reported below; the trio-skill version is labelled **B-trio**. This collision was first flagged in the 06-Sep review, again on 09-Sep, and is **still unresolved in the skill files.**

Derivation for this meeting: for each race, all horses from the report's **MC SIMULATION (raw)** table sorted by MC Win% descending; first 6 taken as pool; #1 as banker.

| Race | MC top-6 pool (Win% order) | B Banker | B-trio pool | B-trio stake |
|------|----------------------------|----------|-------------|--------------|
| R1 | 10, 11, 14, 9, 2, 12 | #10 | 10, 11, 14, 9 | $30 |
| R2 | 7, 2, 8, 9, 3, 11 | #7 | 7, 2, 8, 9, 5 | $60 |
| R3 | 12, 3, 8, 9, 13, 4 | #12 | 12, 3, 4, 6, 8, 9, 13, 14 | $210 |
| R4 | 8, 2, 7, 4, 6, 14 | #8 | 8, 2, 4, 7, 11, 12 | $100 |
| R5 | 9, 10, 5, 3, 2, 8 | #9 | 9, 10, 5, 11, 2, 7 | $100 |
| R6 | 1, 7, 4, 9, 8, 11 | #1 | 1, 7, 4, 9, 3, 5 | $100 |
| R7 | 2, 5, 13, 1, 12, 9 | #2 | 2, 5, 13, 1, 3, 7 | $100 |
| R8 | 1, 12, 8, 4, 2, 13 | #1 | 1, 12, 13, 4, 8, 2, 9 | $150 |
| R9 | 8, 4, 5, 3, 11, 2 | #8 | 8, 4, 5, 3, 2, 1 | $100 |
| R10 | 12, 1, 2, 3, 14, 8 | #12 | 12, 1, 2, 3, 14, 8, 4, 10 | $210 |

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | A Banker | Strat B Pool (MC top 6) | B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | B-trio Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------------|----------|-------------------------|------------------|----------------|--------|--------|-------------|--------|----------|----------|---------|---------|----------------|
| R1 | 10,11,14,9,2 | #10, #11 | 10,11,14,9,2,12 | #10 | 10→9→11 | ✅ | ✅ | ✅ | $476 | $476 | $476 | $30 | $100 | A runs 雙膽拖 (2 bankers, 3 combos) — **same hit for 30% of B's stake** |
| R2 | 2,7,8,9,11,5 | #2 | 7,2,8,9,3,11 | #7 | 8→**12**→11 | ❌ | ❌ | ❌ | $4,079 | $0 | $0 | $100 | $100 | Different bankers (A #2 / B #7), both failed; #12 (94) outside all three |
| R3 | 12,3,4,8,9,13 | #12 | 12,3,8,9,13,4 | #12 | 13→**10**→8 | ❌ | ❌ | ❌ | $783 | $0 | $0 | $100 | $100 | **Identical pool and banker**; #10 outside both |
| R4 | 7,2,4,6,8,14 | #7 | 8,2,7,4,6,14 | #8 | 2→**3**→4 | ❌ | ❌ | ❌ | $3,302 | $0 | $0 | $100 | $100 | Same 6 horses, different banker (SCMP +4 promoted #7 over #8); both failed |
| R5 | 10,9,5,3,2 | #10 | 9,10,5,3,2,8 | #9 | 2→**12**→10 | ❌ | ❌ | ❌ | $2,271 | $0 | $0 | $60 | $100 | **A's debutant rule swapped banker #9→#10: A's banker ran 3rd, B's 8th.** Both lost to #12 |
| R6 | 1,7,4,9,11 | #1, #7 | 1,7,4,9,8,11 | #1 | **13**→**5**→4 | ❌ | ❌ | ❌ | $4,581 | $0 | $0 | $30 | $100 | A adds #7 as 2nd banker (ran 8th); B holds #8 instead of nothing. Both dead |
| R7 | 5,2,13,1,12,9 | #5 | 2,5,13,1,12,9 | #2 | 12→1→**6** | ❌ | ❌ | ❌ | $18,953 | $0 | $0 | $100 | $100 | **Same 6 horses**, banker swapped by +trial flag (A #5 ran 11th, B #2 ran 8th) |
| R8 | 4,1,2,12,13,8,9 | #4 | 1,12,8,4,2,13 | #1 | **10**→1→**11** | ❌ | ❌ | ❌ | $880 | $0 | $0 | $150 | $100 | **A's debutant rule blocked #1 (ran 2nd at 1.5) and banked #4 at 19 (ran 7th)** |
| R9 | 8,4,3,5,2,11 | #8 | 8,4,5,3,11,2 | #8 | 5→**1**→2 | ❌ | ❌ | ❌ | $159 | $0 | $0 | $100 | $100 | **Identical pool and banker**; #1 (mkt 2nd) outside both |
| R10 | 12,1,2,8,3,14 | #12 | 12,1,2,3,14,8 | #12 | 12→2→**5** | ❌ | ❌ | ❌ | $719 | $0 | $0 | $100 | $100 | **Identical pool and banker**; #5 (20) outside both |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) | B-trio (as bet) |
|--------|----------------------------|-----------------------|---------------|-----------------|
| Races played | 10 | 10 | 0 | 10 |
| Hits | 1/10 (10.0%) | 1/10 (10.0%) | 0 | 1/10 (10.0%) |
| Total staked | $870 | $1,000 | +$130 | $1,160 |
| Total returned | $476 | $476 | $0 | $476 |
| **Net P&L** | **−$394** | **−$524** | **−$130** | **−$684** |
| **ROI** | **−45.3%** | **−52.4%** | **−7.1 pp** | **−59.0%** |
| Banker top 3 rate | 3/10 (30.0%) | 3/10 (30.0%) | 0 | 3/10 (30.0%) |
| Combinations | 87 | 100 | +13 | 116 |

### 11d. Where A and B Diverged

Only races with a different pool, a different banker, or a different outcome are listed.

| Race | What Differed | A Result | B Result | Impact | Root cause |
|------|---------------|----------|----------|--------|------------|
| R1 | Structure: A 雙膽拖 3 combos, B 膽拖 10 combos | **HIT ✅** $476 | **HIT ✅** $476 | **A +$70 better** (same return, $70 less stake) | Banker-2 rule fired at Adj Place% 66.0% |
| R2 | Banker: A=#2, B=#7 | MISS ❌ | MISS ❌ | None ($0 both) | SCMP +trial on #2 (ran 10th) reordered A's top rank |
| R4 | Banker: A=#7, B=#8 | MISS ❌ | MISS ❌ | None ($0 both) | SCMP +4 on #7 promoted it over MC #1 #8; #7 ran 11th, #8 ran 14th |
| R5 | Banker: A=#10, B=#9; A pool 5 vs B 6 | MISS ❌ | MISS ❌ | None on P&L, but **A's banker placed (3rd) and B's ran 8th** | **Debutant-banker rule** (#9 had 1 start) — the rule was right |
| R6 | A 雙膽拖 (#1+#7), B single banker #1 + #8 in pool | MISS ❌ | MISS ❌ | **A −$70 saved** by the cheaper structure | Banker-2 rule fired at 70.5%; #7 ran 8th |
| R7 | Banker: A=#5, B=#2 (same 6 horses) | MISS ❌ | MISS ❌ | None ($0 both) | SCMP +trial on #5 promoted it over MC #1 #2; #5 ran 11th |
| R8 | Banker: A=#4 (19), B=#1 (1.5); A 7-horse pool | MISS ❌ | MISS ❌ | **A −$50 worse on stake**, and A banked a 19-shot over a 1.5 favourite | **Debutant-banker rule** blocked #1 SOLID STATE, who ran 2nd |
| R3, R9, R10 | **Identical pool and banker** | MISS ❌ | MISS ❌ | Stake only (A $100/$100/$100 vs B $100 each) | Adjustments did not change the ranking |

**Summary of divergence:** the pipeline changed the banker in **5 of 10 races** (R2, R4, R5, R7, R8). Of those five substitutions, **one was right** (R5: A's #10 placed, B's #9 ran 8th), **one was clearly wrong** (R8: blocked the 1.5 favourite who ran 2nd in favour of a 19-shot who ran 7th), and **three were neutral** (R2, R4, R7 — both candidates finished 7th or worse). No substitution changed a hit into a miss or a miss into a hit.

### 11e. Session Verdict

**Strategy A won the session by $130 (−$394 vs −$524), and by $290 against B-trio, entirely on stake efficiency rather than selection.** All three variants hit exactly one race (R1) and missed the same nine. A's margin came from two structural decisions and nothing else: the 雙膽拖 in R1 bought the identical $476 return for $30 instead of $100, and the 雙膽拖 in R6 capped a losing race at $30 instead of $100. That is **$140 of the $130 gap** — the rest is noise from pool sizing.

**The difference is variance, not edge.** A's adjustment layer moved the banker in five races and produced one good outcome, one bad one, and three that didn't matter. Nothing in that record supports the SCMP/jockey overlay adding value; nothing refutes it either at n=10.

**Two A-only rules had measurable effects.** The **debutant-banker rule** ran 1-for-1: it correctly blocked R5's #9 ROAD TO GLORY (1 start, ran 8th) and incorrectly blocked R8's #1 SOLID STATE (ran **2nd at 1.5**), forcing a **19-shot banker that ran 7th** on the card's largest stake. That rule deserves a targeted backtest — "fewer than 2 starts" may be too blunt when the blocked horse is a clear market favourite. The **雙膽拖 threshold** was the meeting's most valuable rule and its most dangerous one in the same card: it produced the only profit at Adj Place% 66.0% (R1) and the double-banker failure at 70.5% (R6) — evidence directly against simply raising the bar to 70%.
