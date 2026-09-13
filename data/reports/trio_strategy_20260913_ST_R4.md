═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-13 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings (2 reserves not required)
MC SIMULATION: 10,000 iterations (`analyze-race.ts --form-data all`, 2249 historical races / 2311 horse performances indexed, 13/14 horses enriched — #4 is a debutant)
HISTORICAL SYNC: ✅ Pre-synced before this run (latest file `results_20260909_HV.json`) — not re-run per instruction
SCMP DATA: ⚠️ Partial — Star Form + TIR + Vet + trackwork loaded for all 14 runners. **SCMP Place column is corrupt** (tracks Win, e.g. #12 Win 4 / Place 4.1 vs HKJC place 1.6). Q/QP matrix present but no values parseable → quinella cross-check (1e-vi) not performed.
ODDS SOURCE: HKJC early-morning pool (`fetch-odds.ts`, captured **10:08 HKT 13-Sep**), full 14-horse coverage. `analyze-race.ts` live fetch at run time matched except #2 10 / #4 8.3 / #11 8.1 (no flag changes).
             SCMP odds: ⚠️ Win loaded, Place corrupt | HKJC live: ✅ loaded

RACE: R4 LOK WAH HANDICAP — Class 4 | 1200m | Turf | Good | 14 runners
CLASSIFICATION: **Competitive (borderline)** — top Adj Win% 20.4% (#7) | POOL SIZE: 6
MODE: **B: Standard Pool (6)**
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)

Data summary
```
Meeting: Sha Tin 2026-09-13 | Going: Good | Surface: Turf
Target Race: R4 (Class 4 | 1200m | 14 runners)
Scratchings: none
Odds coverage: 14 horses with odds (HKJC)
SCMP data: ⚠️ partial (form/TIR/vet/trackwork ✅, place odds ❌, Q/QP matrix ❌)
```

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Rtg | Age | Draw | Days off | Form (last 6, most recent first) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|-----|-----|------|----------|----------------------------------|-------------------|--------------------------|
| 8  | SPEEDY PATCH      | 19.1% | 45.5% | 13  | ✅ | ❌ | 50 | 4 | 12 | 63 | 4/8/9 (3 starts)   | ★ 膽 (Banker) | 2-8: 7.5% (13.4) |
| 2  | HAPPY SHOOTER     | 18.8% | 46.1% | 9.9 | ✅ | ✅ | 58 | 6 | 4  | **92** | 3/6/2/8/2/1   | 腳 (Leg) | 2-7: 6.2% (16.2) |
| 7  | LUCKY DOCTOR      | 16.4% | 40.7% | 7.0 | ✅ | ✅ | 50 | 5 | 3  | 71 | 7/8/12/10/11/8     | 腳 (Leg) | 7-8: 6.2% (16.2) |
| 4  | PRIME ACE         | 13.1% | 36.3% | 8.2 | ✅ | ✅ | 52 | 4 | 6  | —  | debut (0 starts)   | 腳 (Leg) | 4-8: 5.2% (19.3) |
| 6  | LITTLE MONSTER    | 8.6%  | 27.0% | 17  | ✅ | ❌ | 50 | 5 | 13 | 60 | 11/7/5/1/4/5       | — (replaced by #12) | 2-4: 5.1% (19.6) |
| 14 | RUSSET GLOW       | 4.3%  | 17.2% | 19  | ❌ | ❌ | 41 | 5 | 10 | 71 | 6/4/12/12/8/3      | — | — |
| 11 | MIGHTY FIGHTER    | 4.3%  | 16.6% | 8.0 | ❌ | ✅ | 47 | 4 | 11 | **92** | 8/3/5/11      | 腳 (Leg — added, Win-odds rule) | — (replacement candidate) |
| 9  | GREEN FIELD PEARL | 3.4%  | 14.0% | 20  | ❌ | ❌ | 49 | 4 | 8  | 74 | 4/10/10            | — | — |
| 3  | BRIGHT MORTAR     | 3.0%  | 13.5% | 10  | ❌ | ❌ (boundary) | 53 | 5 | 7 | 71 | 2/1/7/10/11 | — | — |
| 1  | CHARMING LEGEND   | 2.8%  | 12.6% | 25  | ❌ | ❌ | 58 | 6 | 14 | 67 | 9/2/11/12/12/7     | — | — |
| 12 | ENJOY GOLF        | 2.3%  | 11.2% | **3.8** | ❌ | ✅ | 46 | 6 | 2 | 63 | 2/5/3/1/4/3   | 腳 (Leg — replaced #6, Win-odds rule) | — (replacement candidate) |
| 5  | IRON SECURITY     | 2.1%  | 9.8%  | 32  | ❌ | ❌ | 50 | 5 | 1  | 63 | 10/6/9/10/10/11    | — | — |
| 10 | PARROT BLESSING   | 1.2%  | 5.8%  | 32  | ❌ | ❌ | 49 | 5 | 5  | 74 | 7/14               | — | — |
| 13 | KOL               | 0.6%  | 3.7%  | 28  | ❌ | ❌ | 44 | 4 | 9  | 71 | 7/9/12/11          | — | — |

**Market:** overround 22.6%. The model and the market disagree sharply at both ends:
- **#8 SPEEDY PATCH** is the MC's #1 (19.1%) but only 6th in the betting at 13 (≈6.3% implied after overround). The MC flags it "undervalued by 148%". The MC rating rests on only 3 starts.
- **#12 ENJOY GOLF** is the clear market favourite (3.8, ≈21.5% implied), but the MC gives it 2.3% win / 11.2% place ("overvalued by 91%"). That is the largest divergence in the race. Strategy A omits it; Strategy B covers it through the Win-odds rule.
- **#11 MIGHTY FIGHTER** is also shorter in the market (8.0, ≈10.2%) than in the MC (4.3%).

`analyze-race.ts` itself recommended Place bets on #8 and #2 (not used here).

**MC stability check (banker-critical).** #8 and #2 are 0.3pp apart in the canonical run. Five further 10k `--use-saved` runs on the identical snapshot put #8 first **4/5** (avg 18.7% vs 18.6%). Run 5 flipped them (#2 19.2% vs #8 17.8%). A separate pooled 5×10k average (used for the trio table) also has #8 first (#2 18.1%). Treat the top two as a statistical tie with a slight #8 lean. #7 is a stable 3rd (16.1–17.0%).

───────────────────────────────────────────────────────────
RACE 4 SCMP DATA
───────────────────────────────────────────────────────────

| # | Horse | Win (SCMP) | Place (SCMP) | Star Form Signal (paraphrased) | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------|--------------|--------------------------------|----------|----------|-----------|---------------|
| 1  | CHARMING LEGEND   | 20  | ❌ corrupt | non-factor ×5 at 1400m; set pace for 2nd at HV 1650m, then disappointed after a prominent run | rider "could offer no excuse" (not an "unacceptable" finding) — no flag | clear (post-race no significant findings) | — | Front / prominent |
| 2  | HAPPY SHOOTER     | 9.4 | ❌ | Jan ST 1200m win from midfield, then 2nds on both surfaces; last start returned a bleeder | hampered shortly after start (bleed run) | **−injury30d** — bled from both nostrils 13/06, passed 02/09/2026 (**11 days**) | passed barrier trial (no highlight) | On-pace / midfield |
| 3  | BRIGHT MORTAR     | 9.9 | ❌ | dirt 1200m win, then lame; then darted late for 2nd | **+excuses** (steadied and shifted out near 450M; taken wider near 1000M); jumped only fairly (×1) | clear | — | Closer |
| 4  | PRIME ACE         | 10  | ❌ | debutant; dam a multiple sprint winner; stayed on for 3rd in penultimate of 4 trials | — | clear | trials only (no "travelled well / looks ready") | — (debut) |
| 5  | IRON SECURITY     | 28  | ❌ | continued to misfire; prominent / speed-tracking / handy runs | none | clear | — | On-pace |
| 6  | LITTLE MONSTER    | 19  | ❌ | made all in May (4 starts back), then 5th, 7th, and beat one after a prominent run | shifted out and made contact near 1100M; rider explanation (forced premature use) — no flag | clear | — | Front / on-pace |
| 7  | LUCKY DOCTOR      | 6.1 | ❌ | yet to figure in 7 local starts; box-seat 7th last start; led for a win and a 2nd in two lead-up trials | **+excuses** (raced keenly and steadied approaching 500M; no clear running near 400M) | clear | **+trial** (SCMP highlight: made all in latest trial, strong claims on return) | On-pace / leader |
| 8  | SPEEDY PATCH      | 13  | ❌ | lame after debut (Jan); OK 8th in June, then dashed late for 4th in tongue tie | jumped awkwardly (×1) — no flag | clear (lameness Jan, no current entry) | — | Closer |
| 9  | GREEN FIELD PEARL | 18  | ❌ | badly held up on debut; returned off lameness in March; ground-covering 4th last start | **+excuses** (wide, no cover for most of the race) | clear | — | Back / wide |
| 10 | PARROT BLESSING   | 37  | ❌ | faltering last on debut; 7th from near rear | jumped awkwardly (×1) — no flag | clear | — | Closer |
| 11 | MIGHTY FIGHTER    | 8.1 | ❌ | wide-trip 5th at HV, 3rd on a wet track at ST, then a badly held-up 8th | **+excuses** (steadied at 150M when denied clear running; could not be ridden out fully — traffic-caused) | clear | — | Midfield / behind |
| 12 | ENJOY GOLF        | 4   | ❌ | **+form** (made all to win down in Class 5 at ST 1200m, then placed in 2 of 3 since) | none | clear | — | Front-runner |
| 13 | KOL               | 34  | ❌ | blood in trachea in an earlier failure; 7th sitting wide near the front | **+excuses** (wide, no cover for most of the race) | clear (no current entry) | — | On-pace (wide) |
| 14 | RUSSET GLOW       | 19  | ❌ | improved 3rd at $77 (Feb), 3 unlucky runs, closing 4th at HV | **+excuses** (steadied when crowded shortly after start) | clear | — | Closer / midfield |

Tipster picks ignored. SCMP Win prices track HKJC closely. The only flag-relevant difference is **#3 BRIGHT MORTAR, 9.9 on SCMP vs 10 on HKJC** (see caveat 5).

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1  | 7  | LUCKY DOCTOR      | 16.4% | 40.7% | trial +2, excuses +2 | trial +2, excuses +2 | **20.4%** | 44.7% | 7.0 | L Ferraris | Front | +trial, +excuses | ★ 膽 (Banker) |
| 2  | 8  | SPEEDY PATCH      | 19.1% | 45.5% | 0 | 0 | 19.1% | 45.5% | 13  | C Y Ho | Close | — (gate 12) | 腳 (Leg) |
| 3  | 2  | HAPPY SHOOTER     | 18.8% | 46.1% | -injury30d −3 | -injury30d −4 | 15.8% | 42.1% | 9.9 | L Hewitson | Stalk | −injury30d (bled, cleared 02/09) | 腳 (Leg) |
| 4  | 4  | PRIME ACE         | 13.1% | 36.3% | 0 | 0 | 13.1% | 36.3% | 8.2 | A Atzeni | — | debutant | 腳 (Leg) |
| 5  | 6  | LITTLE MONSTER    | 8.6%  | 27.0% | 0 | 0 | 8.6% | 27.0% | 17  | K C Leung | Front | — (gate 13) | 腳 (Leg) |
| 6  | 14 | RUSSET GLOW       | 4.3%  | 17.2% | excuses +2 | excuses +2 | 6.3% | 19.2% | 19  | M Chadwick | Close | +excuses (crowded) | 腳 (Leg — Mode B 6th slot) |
| 7  | 11 | MIGHTY FIGHTER    | 4.3%  | 16.6% | excuses +2 | excuses +2 | 6.3% | 18.6% | 8.0 | J Orman | Stalk | +excuses (held up) | out (first reserve) |
| 8  | 9  | GREEN FIELD PEARL | 3.4%  | 14.0% | excuses +2 | excuses +2 | 5.4% | 16.0% | 20  | C L Chau (-2) | Close | +excuses (wide) | out |
| 9  | 3  | BRIGHT MORTAR     | 3.0%  | 13.5% | excuses +2 | excuses +2 | 5.0% | 15.5% | 10  | Y L Chung (-2) | Close | +excuses (steadied) | out |
| 10 | 12 | ENJOY GOLF        | 2.3%  | 11.2% | +form +1 | +form +1 | 3.3% | 12.2% | 3.8 | P N Wong (-7) | Front | +form | out (see caveat 2) |
| 11 | 1  | CHARMING LEGEND   | 2.8%  | 12.6% | 0 | 0 | 2.8% | 12.6% | 25  | E C W Wong (-3) | Front | — | out |
| 12 | 13 | KOL               | 0.6%  | 3.7%  | excuses +2 | excuses +2 | 2.6% | 5.7% | 28  | M L Yeung | On-pace | +excuses (wide) | out |
| 13 | 5  | IRON SECURITY     | 2.1%  | 9.8%  | 0 | 0 | 2.1% | 9.8% | 32  | M F Poon | On-pace | — | out |
| 14 | 10 | PARROT BLESSING   | 1.2%  | 5.8%  | 0 | 0 | 1.2% | 5.8% | 32  | H T Mo (-2) | Close | — | out |

**Factor legend:** `trial +2`, `excuses +2`, `+form +1`, `-injury30d −3` (Win) / `−4` (Place). Adj Place% mirrors the Win factor except for the injury rule. No caps are hit; the largest is +4, on #7. Adj Win% is not renormalised (sums to 112.0%).

**Adjustment calls:**
- **#2 HAPPY SHOOTER:** `-injury30d` applied. The vet entry is a bleed on 13/06 that passed on 02/09/2026, 11 days before the race. This is the same category treatment as the R3 EIPH case, but inside 30 days. Its "hampered after the start" TIR entry is **not** credited as `+excuses`, because the bleed is the primary explanation for that run. It is also first-up after 92 days.
- **#7 LUCKY DOCTOR:** `trial +2` comes from the SCMP trackwork highlight (made all in its latest trial, "strong claims on return"). `excuses +2` comes from being steadied and then denied clear running near 400M. Total +4.
- **#11 MIGHTY FIGHTER:** "could not be ridden out fully" is **not** `-notRO`. The stewards tie it to being steadied for lack of clear running (traffic), not to a soundness concern, so it is scored as `excuses +2`.
- **#1 CHARMING LEGEND:** no `-perf`. The rider "could offer no excuse", and the vet had no significant findings, but the stewards did not record an "unacceptable" finding.
- **`+form` scope:** applied to #12, whose made-all Class 5 win was followed by placings in 2 of 3. It was not applied to:
  - #6, whose made-all win was 4 starts back and followed by 5th, 7th and 11th.
  - #14, whose "improved" 3rd was in February, followed by 8th, 12th and 12th.
- **Single barrier incidents (#3, #8, #10):** no `-barrier`, which requires 2 or more.
- **Excuses keywords:** "wide, no cover" (#9, #13) counts as a wide trip (+2). "Steadied" or "crowded" counts for #3, #7, #11 and #14. #6's "made contact / rider explanation" has no qualifying keyword, so no flag (consistent with R3's treatment of rider explanations).

**Banker eligibility:** #7 has 7 recorded starts, so it is not a debutant ✅. #4 PRIME ACE (debutant) could never be banker under the rule, but it ranks 4th anyway.

**Reasoning:** The raw MC is a three-way cluster (#8 19.1 / #2 18.8 / #7 16.4) over debutant #4 (13.1) and #6 (8.6). The SCMP layer moves #7 to the top: it has the race's only positive trackwork highlight plus an excuse last start. It also demotes #2, a recent bleeder only 11 days past clearance, from 2nd to 3rd.
- **Pace:** plenty of inside speed. #12 (d2), #7 (d3), #5 (d1) and #2 (d4) can all be handy, and #6 (d13) and #1 (d14) want to be prominent from wide gates. At Sha Tin 1200m turf this suits #7, which should get the box seat or lead from gate 3.
- **Closers:** #8 (d12, dashed late last start) and #14 need the tempo to hold up.
- **Wide gates:** #8's gate 12 is already priced in the MC draw factor. Per Reminder 15 it is a reducer, not an exclusion.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #7, #8, #2, #4, #6, #14
MODE: B | POOL SIZE: 6
Mode B build: top 3 by Adj Win% (#7, #8, #2) + next 3 by Adj Place% (#4 36.3, #6 27.0, #14 19.2).
Must-include (Adj Place% ≥ 25%): #7, #8, #2, #4, #6 — all in the pool ✅. The same five qualify under Reminder 8's 20% reading, so the threshold ambiguity is moot. #14 takes the 6th slot over #11 by 0.6pp of Adj Place% (see caveat 8).

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#7 LUCKY DOCTOR** (Adj Place% 44.7%) ← locked in every combo
腳 (Legs):  #8, #2, #4, #6, #14
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**
雙膽拖 check: 2nd-ranked #8 Adj Place% 45.5% < 63% → single banker.

TOP TRIO COMBINATIONS (MC joint trio probability, raw; avg of 5 × 10k runs on the saved snapshot):
| Rank | Horses (any order) | MC Trio % | Fair odds | Fair $10 dividend |
|------|--------------------|-----------|-----------|-------------------|
| 1  | #2, #7, #8   | 4.19% | 23.9  | $239 |
| 2  | #4, #7, #8   | 2.93% | 34.1  | $341 |
| 3  | #2, #4, #7   | 2.76% | 36.2  | $362 |
| 4  | #2, #6, #7   | 2.00% | 50.0  | $500 |
| 5  | #6, #7, #8   | 1.95% | 51.3  | $513 |
| 6  | #4, #6, #7   | 1.40% | 71.4  | $714 |
| 7  | #7, #8, #14  | 1.26% | 79.4  | $794 |
| 8  | #2, #7, #14  | 1.15% | 87.1  | $871 |
| 9  | #4, #7, #14  | 0.90% | 111.1 | $1,111 |
| 10 | #6, #7, #14  | 0.52% | 193.1 | $1,931 |

The #1 combination overall in the MC is 2-7-8 (4.19%). The best combination not containing the banker is 2-4-8 (3.33%, the MC's #2 overall), which is the price paid for the #7 banker.

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: **$100**
MC TICKET HIT PROBABILITY: **19.1%** (sum of the 10 combos above). The banker ceiling is #7 top-3 at ≈41.7% raw MC, or 44.7% adjusted.

HKJC BET SLIP: Race 4 → Trio → 膽拖 → 膽: 7 | 腳: 2, 4, 6, 8, 14 | $10/combo

TOP COMBINATIONS (highest value):
  2-7-8 (4.19%), 4-7-8 (2.93%), 2-4-7 (2.76%), 2-6-7 (2.00%), 6-7-8 (1.95%)
  → combos pairing #7 with #8 and/or #2 account for 16.2 of the ticket's 19.1 points (#7+#8: 10.3, #7+#2: 10.1, overlap 2-7-8 4.2).

PASS CONDITIONS:
- If **#7 LUCKY DOCTOR** (banker) is scratched → **VOID** the ticket (Reminder 10); do not restructure.
- If any leg is scratched → promote **#11 MIGHTY FIGHTER** (next by Adj Place%, 18.6%) into its slot.
- If field drops below 3 → pool refunded.
- If going moves to Yielding or worse → re-run the MC.
- If **#7 drifts beyond ~15**, the market is rejecting the trial-driven upgrade that made it banker (it is raw MC #3). Consider Strategy B or passing the race.
- The race only qualifies as Competitive because of the SCMP +4 on #7; raw MC is wide open (see caveat 4). A PASS on this race is defensible if bankroll is better deployed on more structured races.

CONFIDENCE: **LOW**
Three reasons:
- **Borderline classification:** 20.4%, and only after SCMP adjustments.
- **Banker is the raw MC #3**, with a banker top-3 rate of ≈42–45%, so it fails more often than not.
- **The market favourite #12 (3.8) is outside the pool.**

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#8 SPEEDY PATCH** (MC Win% 19.1%, MC Place% 45.5%) ← 1st by MC Win% (3 starts; statistical tie with #2, see stability check)
Primary legs (MC Place% > 20%): #2 (46.1%), #7 (40.7%), #4 (36.3%), #6 (27.0%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **#6 LITTLE MONSTER** (MC Place% 27.0%, Win odds 17)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), processed by odds ascending:
  1. **#12 ENJOY GOLF** (Win odds 3.8, MC Place% 11.2%)
  2. **#11 MIGHTY FIGHTER** (Win odds 8.0, MC Place% 16.6%)
  (#3 BRIGHT MORTAR at exactly 10 on HKJC does not qualify; see caveat 5.)
Action:
  - **#12 replaced #6** (1-for-1 swap; #6 is the only replaceable leg).
  - **#11 added directly**, because no replaceable leg remains: #2, #7 and #4 are all above 30% MC Place%.
Final legs: **#2, #4, #7, #11, #12**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
TOTAL STAKE: **$100**
MC TICKET HIT PROBABILITY: **16.0%**. The same banker with only the four primary legs (6 combos, $60) would be 16.2%. The #6 swap-out costs 5.8pts, and the #12/#11 combos add back 5.6pts under the MC. Their real value is the market's view of #12.

STRATEGY B TICKET: 膽 8 | 腳 2, 4, 7, 11, 12 → 10 combos:
2-4-8 (3.33%), 2-7-8 (4.19%), 2-8-11 (1.38%), 2-8-12 (0.78%), 4-7-8 (2.93%), 4-8-11 (0.87%), 4-8-12 (0.54%), 7-8-11 (1.10%), 7-8-12 (0.71%), 8-11-12 (0.18%)

HKJC BET SLIP: Race 4 → Trio → 膽拖 → 膽: 8 | 腳: 2, 4, 7, 11, 12 | $10/combo

PASS CONDITIONS (B):
- If **#8** is scratched → **VOID** B.
- If #3 BRIGHT MORTAR firms below 10 before the jump → add #3 as an extra leg. That makes 6 legs, C(6,2) = 15 combos, $150.
- Going to Yielding or worse → re-run the MC.

CONFIDENCE (B): **LOW**
- **Weak banker:** #8 is a 3-start horse at 13 in the market, and only 0.3pp clear of #2. Swapping the banker to #2 over the same legs gives 15.9%, essentially identical.
- **Low hit rate:** the MC ticket hit probability is 16%.

**A vs B comparison:** Same cost ($100, 10 combos each), different banker.
- **A** bankers #7, the SCMP-upgraded trial horse, and keeps #6 and #14.
- **B** bankers the raw MC #1 (#8), drops #6, and adds the two short-priced horses the MC dislikes (#12 favourite and #11).
- Only 2 of the 10 combos overlap (2-7-8 and 4-7-8).
- Under the raw MC, A covers more probability (19.1% vs 16.0%). B is the ticket that pays if the market is right about #12.
- An A-pool ticket with #8 as banker would score 20.3% on the raw MC. That is reported for context only; A's rule makes #7 banker.

───────────────────────────────────────────────────────────
CAVEATS
───────────────────────────────────────────────────────────
1. **SCMP place odds are corrupt** (Place tracks Win for every runner, same fault as the R3 and 06-Sep reports). The SCMP Q/QP matrix rendered with no parseable values, so the 1e-vi quinella cross-check was not performed. HKJC odds were used throughout.
2. **Model vs market divergence.**
   - **#12 ENJOY GOLF:** market favourite at 3.8 (≈21.5%) vs MC 2.3% win / 11.2% place. It has no negative SCMP flags, so Reminder 9 (no hard exclusion at ≤15) is not engaged. Its absence from Strategy A is model-driven, not narrative-driven, and it is covered only by Strategy B. The cause is not diagnosed. Prior meetings documented a class-of-recent-form bias in the MC; #12's last win came down in Class 5, and it carries a 7-lb-claiming apprentice (123 lb).
   - **#8 (Strategy B banker):** MC 19.1% vs market ≈6.3%, from only 3 starts.
3. **Banker near-tie (Strategy B).** #8 vs #2 is 0.3pp in the canonical run. #8 was first in 4/5 reruns, and one rerun flipped the order. Swapping B's banker to #2 gives 15.9% vs 16.0%.
4. **Borderline classification (Strategy A).** Raw MC top Win% is 19.1%, which would classify as wide open (Mode C/D, default PASS). The race is Competitive only because SCMP adds +4 to #7 (20.4%). A's banker is therefore the raw MC #3.
5. **#3 BRIGHT MORTAR sits on the Win-odds boundary:** 10 on HKJC (morning pool and live) vs 9.9 on SCMP. At <10 it becomes a third Win-odds candidate and is added directly, taking B to 6 legs / 15 combos / $150.
6. **Debutant #4 PRIME ACE:** MC 13.1% / 36.3% with zero race form. This comes from rating and connections only (trials: a 3rd). It is a leg in both strategies and cannot be a banker.
7. **Layoffs and health:**
   - #2 and #11 are first-up after 92 days (>90-day warning).
   - #2 is also 11 days past bleed clearance (`-injury30d` applied).
   - #8 and #9 have prior lameness in Star Form (no current vet entry, no adjustment).
   - #13 had blood in the trachea in an earlier run (no current vet entry, no adjustment).
8. **6th pool slot is a near-tie:** #14 (Adj Place 19.2%) vs #11 (18.6%). Swapping in #11 changes A's MC hit rate from 19.1% to 18.8%.
9. **Skill inconsistencies:**
   - The must-include bar is 25% in 4c vs 20% in Reminder 8. Moot here, since the same five horses qualify either way.
   - The 雙膽拖 threshold is quoted as both 63% and 70%. Also moot (#8 45.5%).
10. **Finish-time projection ignored.** It contradicts the MC ranking (it puts #14 fastest and #2 15.8L back) and was ignored, as in prior reports.
11. **Racecard data gaps.** `careerStarts` is 0 for every runner (field unpopulated), so banker eligibility was checked from `pastPerformances` (#7: 7 runs, #8: 3 runs). `winningMargin` duplicates `finishPosition` in the form data.
12. **Trio probabilities are raw MC.** SCMP adjustments are not propagated into joint probabilities. They are averaged from 5 × 10k runs on the saved snapshot, separate from the canonical `analyze-race.ts` run.
13. **Odds will move.** They are the 10:08 HKT morning pool. Re-check #7, #8, #12 and #3 before the jump (see pass conditions).
═══════════════════════════════════════════════════════════
