═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-13 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-13 --venue "Sha Tin" --race 5 --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5`) — 2,249 historical races / 2,311 indexed performances; 13/14 horses enriched (#8 KINGMAN REEF is a debutant, so it has no form); 14 jockey + 14 trainer profiles loaded
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction; latest file is `results_20260909_HV.json`)
SCMP DATA: ⚠️ Partial. Star Form, TIR and Trackwork were loaded for all 14 runners. **There is no Vet's Report section** on the SCMP R5 card. SCMP Place odds and Q/QP matrices look unreliable (see caveats), so they were **not used**. Tipster picks were ignored (skill rule 13).
ODDS SOURCE: **HKJC win pool** (`fetch-odds.ts`, captured 10:08 HKT 13-Sep). All 14 runners are covered.
             SCMP odds: ⚠️ Win column loaded; Place column mirrors Win. HKJC live: `analyze-race.ts` took its own later snapshot. Cross-checked against all three snapshots, **no horse flips** on the Win-odds<10 test.
             ⚠️ Place odds are NOT usable: the analyzer logged "place odds estimated from win odds". All Strategy B odds tests use **Win odds only**, as the rule says.

RACE: R5 LOK WAH HANDICAP (Sec 1), 3:00pm — **Class 4** | 1200m | Turf ("B" course) | Good | **14 runners**
CLASSIFICATION: **Dominant** (top Adj Win% is 50.0% after the cap; raw MC 49.7%) | POOL SIZE: 5
MODE: **A — Tight Pool (5)**
BET STRUCTURE: **膽拖** | 1膽 + 4腳 | C(4,2) = 6 combinations. The banker is **#10**, not the 1st-ranked #9, because #9 has only **1 career start** (debutant banker rule).
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Sha Tin 2026-09-13 | Going: Good (SCMP: "Expected Going: Good") | Surface: Turf, "B" course
Target Race: R5 LOK WAH HANDICAP - Sec1 (Class 4 | 1200m Turf | 14 runners)
Scratchings: none (SCMP reserves R. DASHING PEACH / R. EVER WEALTH are not in the field)
Odds coverage: 14 / 14 horses with HKJC Win odds
Starters: 14 ≥ 3 → Trio pool valid
Jockey stats: 14 jockey profiles + 14 trainer profiles loaded
Debutants / low-start horses:
  #8 KINGMAN REEF   — 0 starts (debut; 3 trials, "filled the frame in all three")
  #9 ROAD TO GLORY  — 1 start (2nd at $111 on debut, 04-Jul, ST 1200m); SCMP last-6 = "2"
  #12 NOBLE SUPERIOR — 2 starts; #10, #1, #4, #13 — 3 starts each; all others 10 indexed
  → #9 (MC #1) is NOT eligible as Strategy A banker (rule 17: <2 starts)
Long layoff (>90 days): none. All runners last raced 24-Jun to 12-Jul (63–81 days off; #6 WORLD HERO longest, 81d)
SCMP data: ⚠️ partial — Form/TIR/Trackwork ✅, Vet ❌ (no section), odds + Q/QP suspect
```

⚠️ **Data note on starts:** the scraped racecard's `careerStarts` field is `0` for every runner (the scraper didn't populate it). Starts were counted from indexed past performances and checked against the SCMP last-6 form strings; both sources agree.

⚠️ **Seasonal context:** this is the 2nd Sha Tin meeting of the new season, so the whole field is resuming after 63–81 days. The MC's form data reflects last season.

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Form (indexed runs) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|---------------------|-------------------|--------------------------|
| 9 | ROAD TO GLORY | 49.7% | 83.3% | 7.2 | ✅ | ✅ | 1 | **1** | ★ 膽 (Banker) | 9-10: 23.9% (4.2) |
| 10 | SPIRITED STEED | 18.6% | 57.8% | 3.7 | ✅ | ✅ | 7 | 3 | 腳 (Leg) | 9-10: 23.9% (4.2) |
| 5 | OLDTOWN | 15.8% | 54.4% | 20 | ✅ | ❌ | 13 | 10 | 腳 (Leg) | 5-9: 20.9% (4.8) |
| 3 | LUNAR DASH | 3.6% | 21.2% | 13 | ✅ | ❌ | 5 | 9 | — (replaceable leg; **replaced by #11**) | 3-9: 6.0% (16.6) |
| 2 | KEMPES | 3.3% | 18.3% | 7.5 | ❌ | ✅ | 3 | 10 | 腳 (Leg) — replacement candidate, **added** | 2-9: 5.0% (20.1) |
| 8 | KINGMAN REEF | 2.9% | 17.8% | 15 | ❌ | ❌ | 12 | 0 (debut) | — | — |
| 6 | WORLD HERO | 2.1% | 14.8% | 29 | ❌ | ❌ | 11 | 10 | — | — |
| 14 | VIEW ALL THINGS | 1.3% | 9.8% | 30 | ❌ | ❌ | 8 | 10 | — | — |
| 7 | GHORGAN | 0.8% | 6.7% | 8.1 | ❌ | ✅ | 14 | 10 | 腳 (Leg) — replacement candidate, **added** | — |
| 12 | NOBLE SUPERIOR | 0.7% | 5.9% | 42 | ❌ | ❌ | 6 | 2 | — | — |
| 11 | BETTER AND BETTER | 0.5% | 5.2% | 7.5 | ❌ | ✅ | 10 | 10 | 腳 (Leg) — replacement candidate, **replaces #3** | — |
| 13 | APEX GLORY | 0.3% | 2.6% | 10 | ❌ | ❌ (exactly 10) | 2 | 3 | — | — |
| 1 | TEN LOVES | 0.2% | 1.9% | 52 | ❌ | ❌ | 9 | 3 | — | — |
| 4 | WITHOUT RHYME | 0.0% | 0.3% | 52 | ❌ | ❌ | 4 | 3 | — | — |

**Market:** Overround **23.5%**, favourite bias **−32.9%**, longshot bias **−71.2%**. The model and market disagree at the top. The market favourite is **#10 SPIRITED STEED (3.7)**, but the MC makes **#9 ROAD TO GLORY** a 49.7% winner (fair ~2.0, market 7.2 → "undervalued by 263%"). It also rates **#5 OLDTOWN** at 15.8% win / 54.4% place against a market price of 20 ("undervalued by 200%"). The market's other short-priced runners, #2 (7.5), #11 (7.5), #7 (8.1) and #13 (10), are all under 20% MC Place, and three of them are under 7%.

**Top quinella combinations (MC):** 9-10 23.9% ($4.2) · 5-9 20.9% ($4.8) · 5-10 7.5% ($13.4) · 3-9 6.0% ($16.6) · 2-9 5.0% ($20.1).

**MC trio distribution:** these come straight from the simulator. It was re-run at 10,000 iterations on the enriched card that `analyze-race.ts` saved, using the same `MonteCarloSimulator`; no manual estimates.
5-9-10 **19.6%** · 3-9-10 5.8% · 8-9-10 5.1% · 2-9-10 5.1% · 3-5-9 5.1% · 5-8-9 4.1% · 2-5-9 4.1% · 6-9-10 4.0% · 5-6-9 3.0% · 5-9-14 2.5%.
Two re-runs moved win/place by ≤1.4pp on every horse (e.g. #10 place 57.8 → 59.2 / 58.3). **No Strategy B selection changes:** #3 stays above 20% (21.7 / 20.8), and #2 (17.8) and #8 (18.0 / 18.1) stay at or below 20%.

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | Win / Place (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|--------------------|------------------|----------|----------|-----------|---------------|
| 1 | TEN LOVES | 45 / 46 | — ("failed to come to hand"; "made some ground late for ninth") | **+excuses** ("checked when racing tight") | n/a (no section) | — | Back / closer |
| 2 | KEMPES | 9 / 8.0 | — ("unlucky second" is last season; latest runs 4th / 9th / 7th) | **+excuses** ("hampered when taken wider" near 200M) | n/a | — | Midfield / closer |
| 3 | LUNAR DASH | 11 / 11 | — ("third from midfield") | — (raced keenly, steadied: **self-caused**) | n/a | — | Midfield / speed-tracker |
| 4 | WITHOUT RHYME | 41 / 44 | — ("ended last", "failed to beat a runner") | **+excuses** ("steadied when crowded"); post-race vet: no significant findings | n/a | — | Back marker |
| 5 | OLDTOWN | 23 / 22 | — (May win; "getting up for sixth ridden back from gate 11") | **+excuses** ("bumped on jumping", **one instance** → no −barrier) | n/a | — | On-pace / versatile |
| 6 | WORLD HERO | 34 / 29 | — ("OK efforts in two of three starts") | **+excuses** ("obliged to race wide and without cover" = wide trip) | n/a | — | Stalker ("tracked the pace") |
| 7 | GHORGAN | 7.1 / 7.4 | — ("sitting near the speed for eighth") | **+excuses** ("crowded, severely checked", bumped after the start) | n/a | — | Stalker / on-pace |
| 8 | KINGMAN REEF | 14 / 16 | — (debut; "stuck on all right to fill the frame in all three trials") | — (no runs) | n/a | trial comment is moderate → **no +trial** (see note) | Unknown (debut) |
| 9 | ROAD TO GLORY | 5.8 / 6.3 | **+form** ("coming from last to snatch second" on debut) | **+excuses** ("had difficulty obtaining clear running" 400M–200M) | n/a | — | **Closer** |
| 10 | SPIRITED STEED | 3.9 / 4.2 | — ("sitting near the front for a surprise neck second at $97") | — (none listed) | n/a | — | **On-pace** |
| 11 | BETTER AND BETTER | 7.3 / 7.8 | — ("misfiring over the straight 1,000m") | **+excuses** ("bumped approaching the 250M"; became unbalanced) | n/a | **+trial** ("ran on nicely to narrowly win a recent dirt trial and can figure first up") | Midfield |
| 12 | NOBLE SUPERIOR | 35 / 39 | — ("tiring 11th") | **+excuses** ("held up for clear running", raced tight) | n/a | — | Midfield / prominent |
| 13 | APEX GLORY | 14 / 9.6 | — ("fading 11th after dictating the pace") | **+excuses** (contact on jumping, bumped twice, "pressured in the lead") | n/a | — | **Front-runner** |
| 14 | VIEW ALL THINGS | 33 / 31 | — ("came from towards the rear for seventh") | — (none listed) | n/a (throat surgery in April is not a vet-report entry) | — | Closer |

**Flag discipline (the same rules as the R1 report from this meeting):**
- `+excuses` is given only where the horse **received** the trouble: #1 checked, #2 hampered, #4 crowded/steadied, #5 bumped, #6 wide without cover, #7 crowded/checked, #9 no clear run, #11 bumped, #12 held up, #13 bumped/pressured. It is withheld from **#3**, whose steadying followed its own keenness.
- `+form` is given only for Star Form keywords of the "rallied/improved/made all" type. **#9**'s "coming from last to snatch second" qualifies. **#10**'s "surprise neck second" does not contain such a keyword, so it gets no flag.
- `+trial` goes to **#11** only (explicit Trackwork Highlight). **#8**'s trial line ("stuck on all right to fill the frame") is weaker than the skill's "travelled well / looks ready" bar, so it gets no flag. Even with +2, #8 would reach only 19.8% Adj Place, which is still 6th, so **the pool does not change either way**.
- `−barrier` needs "bumped on jumping" in ≥2 runs. #5 shows one instance and #13 one race, so neither is penalised.
- `−injury30d` / `−age`: **no SCMP vet section**, so these can't be assessed from the vet report. Racecard ages are 4–6, so no runner is 8+.
- `−notRO`: #11 "did not finish the race off" after becoming unbalanced, and #13 "did not finish the race off" when pressured. Neither is a "not ridden out" report, so no penalty.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 9 | ROAD TO GLORY | 49.7% | 83.3% | excuses +2, +form +1 (→ cap) | excuses +2, +form +1 (→ cap) | **50.0%** | **85.0%** | 7.2 | C Y Ho | 1 | Closer | +excuses, +form | 腳 (Leg) — **banker-ineligible (1 start)** |
| 2 | 10 | SPIRITED STEED | 18.6% | 57.8% | 0 | 0 | **18.6%** | **57.8%** | 3.7 | Z Purton | 7 | On-pace | — | ★ 膽 (Banker) |
| 3 | 5 | OLDTOWN | 15.8% | 54.4% | excuses +2 | excuses +2 | **17.8%** | **56.4%** | 20 | A Atzeni | 13 | On-pace | +excuses | 腳 (Leg) |
| 4 | 2 | KEMPES | 3.3% | 18.3% | excuses +2 | excuses +2 | **5.3%** | **20.3%** | 7.5 | J Orman | 3 | Mid / closer | +excuses | 腳 (Leg) |
| 5 | 11 | BETTER AND BETTER | 0.5% | 5.2% | excuses +2, trial +2 | excuses +2, trial +2 | 4.5% | 9.2% | 7.5 | A Badel | 10 | Midfield | +excuses, +trial | — |
| 6 | 6 | WORLD HERO | 2.1% | 14.8% | excuses +2 | excuses +2 | 4.1% | 16.8% | 29 | H Bentley | 11 | Stalker | +excuses | — |
| 7 | 3 | LUNAR DASH | 3.6% | 21.2% | 0 | 0 | **3.6%** | **21.2%** | 13 | C L Chau (-2) | 5 | Midfield | — | 腳 (Leg) |
| 8 | 8 | KINGMAN REEF | 2.9% | 17.8% | 0 | 0 | 2.9% | 17.8% | 15 | K Teetan | 12 | Unknown | — (debut) | — |
| 9 | 7 | GHORGAN | 0.8% | 6.7% | excuses +2 | excuses +2 | 2.8% | 8.7% | 8.1 | K C Leung | 14 | Stalker | +excuses | — |
| 10 | 12 | NOBLE SUPERIOR | 0.7% | 5.9% | excuses +2 | excuses +2 | 2.7% | 7.9% | 42 | M L Yeung | 6 | Midfield | +excuses | — |
| 11 | 13 | APEX GLORY | 0.3% | 2.6% | excuses +2 | excuses +2 | 2.3% | 4.6% | 10 | P N Wong (-7) | 2 | Front | +excuses | — |
| 12 | 1 | TEN LOVES | 0.2% | 1.9% | excuses +2 | excuses +2 | 2.2% | 3.9% | 52 | R Kingscote | 9 | Back | +excuses | — |
| 13 | 4 | WITHOUT RHYME | 0.0% | 0.3% | excuses +2 | excuses +2 | 2.0% | 2.3% | 52 | Y L Chung (-2) | 4 | Back | +excuses | — |
| 14 | 14 | VIEW ALL THINGS | 1.3% | 9.8% | 0 | 0 | 1.3% | 9.8% | 30 | M Chadwick | 8 | Closer | — | — |

**Factor legend:** `excuses +2` = TIR trouble received · `+form +1` = "rallied/came from last" per Star Form · `trial +2` = Trackwork Highlight. The largest adjustment is +4 (#11), well inside the ±8% / ±10% cap.

**Cap note:** #9's adjusted figures (52.7% / 86.3%) exceed the 50% Win / 85% Place ceiling, so they are capped at **50.0% / 85.0%**. This doesn't change its rank (#1 by 31pp) or the Dominant classification. Strategy B uses the uncapped raw figures.

**Banker eligibility (rules 1 / 17) — decisive here.** The 1st-ranked horse, **#9 ROAD TO GLORY, has one career start** (2nd on debut, 04-Jul). Under the rule, "Horses with fewer than 2 race starts cannot be designated as banker", it moves to the legs. The next-ranked horse with ≥2 starts is **#10 SPIRITED STEED** (3 starts), which becomes the banker.

**雙膽拖 — not triggered.** #9 can't be any banker. The next eligible horse, #5 OLDTOWN, has Adj Place% **56.4%**, below the 63% bar (and the 70% bar in the A/B table). So the structure is a single-banker 膽拖.

**Reasoning for the pool.** Mode A = banker #10 + the 4 best other horses by Adj Place%: **#9 (85.0%), #5 (56.4%), #3 (21.2%), #2 (20.3%)**. #9, #10 and #5 clear the mandatory Adj Place% ≥ 25% bar, and #3 and #2 also clear Reminder 8's ≥ 20% bar. The next-best are #8 (17.8%) and #6 (16.8%).
- Four short-priced runners sit outside the pool: #11 (7.5), #7 (8.1), #13 (10) and #8 (15). None is excluded on negative flags, so Reminder 9 doesn't apply. They are simply low on Adj Place% (4.6–17.8%).
- On re-runs, #2's raw place fell to 17.8% (adj 19.8%). It is still 5th by Adj Place%, so the Mode A pool doesn't change.

**Pace read.**
- **Speed:** #13 APEX GLORY (gate 2, "dictating the pace" last time) and #10 SPIRITED STEED (gate 7, "sitting near the front").
- **Pressure from wide:** #7 GHORGAN (gate 14) and #5 OLDTOWN (gate 13, "prominent"). Wide gates reduce their chances but don't exclude them (rule 15).
- **#9 ROAD TO GLORY is a closer drawn gate 1.** At Sha Tin 1200m that setup carries a real traffic risk, and its debut TIR already records "difficulty obtaining clear running".

A genuine tempo suits #9's finish. A soft lead would favour #10 and #13.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#10, #9, #5, #3, #2**
MODE: **A — Tight Pool** | POOL SIZE: 5

膽拖 STRUCTURE (1st *eligible* ranked horse = Banker):
膽 (Banker): **#10 SPIRITED STEED** (Adj Place% 57.8%) ← locked in every combo
腳 (Legs):  **#9, #5, #3, #2**
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = **6**

TOP TRIO COMBINATIONS: all 10 pool combos, Plackett-Luce fitted to Adj Place%, with the direct MC trio counts alongside. Ticket combos are marked ✔.

| Rank | Horses (any order) | Combined Place% (adj PL) | MC Trio% (direct) | Est. Fair Odds ($10, adj) | In 膽拖 ticket |
|------|--------------------|--------------------------|-------------------|---------------------------|----------------|
| 1 | #5, #9, #10 | 15.95% | 19.56% | $63 | ✔ |
| 2 | #3, #9, #10 | 4.38% | 5.81% | $228 | ✔ |
| 3 | #3, #5, #9 | 4.19% | 5.08% | $239 | — (full pool only) |
| 4 | #2, #9, #10 | 4.17% | 5.10% | $240 | ✔ |
| 5 | #2, #5, #9 | 3.99% | 4.06% | $251 | — (full pool only) |
| 6 | #3, #5, #10 | 1.45% | 1.45% | $691 | ✔ |
| 7 | #2, #5, #10 | 1.38% | 1.21% | $726 | ✔ |
| 8 | #2, #3, #9 | 1.09% | 0.99% | $921 | — (full pool only) |
| 9 | #2, #3, #10 | 0.38% | 0.40% | $2,630 | ✔ |
| 10 | #2, #3, #5 | 0.36% | 0.31% | $2,746 | — (full pool only) |

**Ticket coverage:** 膽拖 **27.7%** (adjusted fit) / **33.5%** (direct MC trio counts) for 6 combos. The ticket depends on #10 finishing top 3, which is **~57%** in the MC.

**Fit note:** Adj Place% sums to 321.7%, but any real top-3 distribution must total 300%. The Plackett-Luce fit therefore renormalises proportionally by ~7% (e.g. #9 85.0% → 79.3%, #10 57.8% → 53.9%). The fit is otherwise exact (max error 0.000pp).

**Largest combinations NOT covered by the Strategy A ticket:** 3-5-9 (5.1% MC), 8-9-10 (5.1%; #8 not in pool), 2-5-9 (4.1%), 5-8-9 (4.1%; #8 not in pool), 6-9-10 (4.0%; #6 not in pool). **Every one of these contains #9.** The ticket's main exposure is #10 missing the frame (MC ~43%) while #9 hits.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- **Dividend benchmark:** historical Sha Tin Class 4 / 1200m / turf Trio dividends in `data/historical/` (n = 54) have a **median of $463**, IQR $208–$1,074, and a range of $61–$28,825 per $10.
- The MC's top combination **5-9-10** (19.6%, MC-fair ~$51) pairs the favourite (#10, 3.7) with the 3rd-to-4th choice (#9, 7.2) and a **20/1** horse (#5). Because the market has #5 at 20 while the MC gives it 54% to place, this combination should pay **well above** its MC-fair value if it lands. It is the main value engine for both strategies.
- **Model-vs-market gap on #9** (MC 49.7% vs ~11% market-implied after overround) is very large. It rests on **one indexed run** ("[1 form]"). Treat it with suspicion: the market is not buying the debut 2nd.
- The analyzer's own finish-time projection disagrees with its win/place simulation. It ranks **#14 VIEW ALL THINGS** fastest, then #12 and #13, with **#9 only 4th (+1.15s)** and **#5 8th (+2.36s)**. The Trio ranking follows Win%/Place%, as the skill specifies.
- The SCMP Q/QP matrix could not be used for the rule-14 cross-reference (see caveats).

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (1 Banker + 4 Legs)
膽 (Banker): **#10 SPIRITED STEED**
腳 (Legs):  #9 ROAD TO GLORY, #5 OLDTOWN, #3 LUNAR DASH, #2 KEMPES
COMBINATIONS: **6** (5-9-10, 3-9-10, 2-9-10, 3-5-10, 2-5-10, 2-3-10)
UNIT BET: $10 (fixed)
**TOTAL STAKE: $60**

TOP COMBINATIONS (highest value):
  5-9-10 (16.0% adj / 19.6% MC) · 3-9-10 (4.4% / 5.8%) · 2-9-10 (4.2% / 5.1%) · 3-5-10 (1.5% / 1.5%) · 2-5-10 (1.4% / 1.2%) · 2-3-10 (0.4% / 0.4%)

Priced alternatives (not the recommendation; shown so the trade-offs are visible):
| Variant | Structure | Combos | Cost | Coverage (adj PL / MC) |
|---------|-----------|--------|------|------------------------|
| **Recommended (rule output)** | 膽拖 1膽 #10 + 4腳 (9, 5, 3, 2) | 6 | **$60** | 27.7% / 33.5% |
| Full pool, no banker | C(5,3) {10, 9, 5, 3, 2} | 10 | $100 | 37.3% / 44.0% |
| Rule-breaking (#9 as banker, debutant rule set aside) | 1膽 #9 + 4腳 (10, 5, 3, 2) | 6 | $60 | 33.8% / 40.6% |

PASS CONDITIONS:
- If **#10 SPIRITED STEED** (banker) is scratched → **VOID** the ticket (rule 10).
- If **#9 ROAD TO GLORY** is scratched → the ticket still stands, but coverage falls sharply (#9 is in 3 of the top 4 combos). Consider PASS.
- If the field drops below 3 starters → pool refunded (not a live risk).
- If **#10 drifts past ~7** in late betting → the market is losing faith in the banker. With MC place only 57.8%, downgrade to PASS.
- If the going turns **Yielding/Soft** → re-check #10's on-pace style and #9's single run (on Good). All form lines are on Good or better except #2's 4th on a wet track.

CONFIDENCE: **LOW**
- For: Dominant race by the model; a cheap $60 ticket; the banker is the market favourite with Z Purton up.
- Against:
  1. The debutant rule forces the banker off the model's standout (#9, 84% place) onto a horse with **57.8% MC place and 3 starts**.
  2. #10's best run is a **$97 surprise second**.
  3. The analyzer's finish-time projection ranks #10 only **5th**.
  4. Coverage is **33.5%**, and every large uncovered combination contains #9.

CAVEATS:
- **No SCMP Vet's Report** for R5, so −injury30d / −age flags could not be assessed from vet data. All runners are 4–6 years old.
- **SCMP odds and Q/QP matrices unreliable, so not used.** SCMP's Place column mirrors its Win column (e.g. #1 45/46, #3 11/11, #10 3.9/4.2), and the Q and QP matrices were shown identical (the same defect as the R1 card). The rule-14 cross-reference was skipped. SCMP Win odds differ from the HKJC 10:08 snapshot (e.g. #9 5.8 vs 7.2, #2 9 vs 7.5) but cause **no flag flips**.
- **Place odds estimated** from win odds by the analyzer, so only Win odds were used for the Strategy B tests.
- **#9's MC rating rests on one run.** The model's standout has a single indexed start ("[1 form]"). Its 49.7% win / 83.3% place is the most fragile number in this report.
- **Internal model inconsistency:** the finish-time projection ranks #14, #12, #13 fastest, with #9 4th, #10 5th and #5 8th. The Trio ranking follows the win/place simulation, as specified.
- **Scraper field gap:** `careerStarts` is 0 for all runners in the saved racecard. Starts for the banker rule came from indexed past performances and SCMP form strings.
- **Jockey-stat samples are small** (4–18 rides per jockey in the indexed data). Trainer J Richards (#9) shows 0% from 10.
- **SCMP text was retrieved via WebFetch** (model-summarised page). Quotes are as returned; tipster content was not requested.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#9 ROAD TO GLORY** (MC Win% 49.7%, MC Place% 83.3%) ← 1st by MC Win%
(Strategy B's rule is "MC #1 always banker". The skill applies the debutant exclusion only to Strategy A, so #9's single start doesn't disqualify it here.)

Primary legs (MC Place% > 20%): **#10 (57.8%), #5 (54.4%), #3 (21.2%)**

Replaceable legs (MC Place% in 20–30% **AND** Win odds > 10): **#3 LUNAR DASH** (MC Place% 21.2%, Win odds 13). #10 and #5 are above the 20–30% band.

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10), processed in ascending Win odds:
- **#11 BETTER AND BETTER** (Win odds 7.5, MC Place% 5.2%). It ties #2 at 7.5 in the 10:08 snapshot and is shorter in both later snapshots (7.4 / 7.3 vs 7.6 / 9), so it is processed first.
- **#2 KEMPES** (Win odds 7.5, MC Place% 18.3%)
- **#7 GHORGAN** (Win odds 8.1, MC Place% 6.7%)
- (#13 APEX GLORY at **exactly 10** is not < 10, so it is not a candidate.)

Action:
1. #11 **replaced #3** (the only replaceable leg).
2. #2 was **added directly** (no replaceable leg left).
3. #7 was **added directly**.

The final leg set would be the same in any processing order.

Final legs: **#10, #5, #11, #2, #7**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

STRATEGY B TICKET (direct MC trio counts from the simulator; Plackett-Luce on raw MC Place% in brackets):

| Rank | Horses (any order) | MC Trio% | Est. Fair Odds ($10) |
|------|--------------------|----------|----------------------|
| 1 | #5, #9, #10 | 19.56% (PL 19.60%) | $51 |
| 2 | #2, #9, #10 | 5.10% (PL 4.75%) | $196 |
| 3 | #2, #5, #9 | 4.06% (PL 4.22%) | $246 |
| 4 | #7, #9, #10 | 1.80% (PL 1.63%) | $556 |
| 5 | #5, #7, #9 | 1.48% (PL 1.45%) | $676 |
| 6 | #9, #10, #11 | 1.08% (PL 1.25%) | $926 |
| 7 | #5, #9, #11 | 0.90% (PL 1.11%) | $1,111 |
| 8 | #2, #7, #9 | 0.36% (PL 0.34%) | $2,778 |
| 9 | #2, #9, #11 | 0.19% (PL 0.27%) | $5,263 |
| 10 | #7, #9, #11 | 0.00% (PL 0.09%) | — (0 hits in 10,000 runs) |

**Ticket coverage: 34.5%** (MC direct) / 34.7% (PL on raw MC). It needs only #9 in the frame (MC Place% 83.3%).

**Largest combinations NOT covered:** 3-9-10 (5.8%; #3 was swapped out), 3-5-9 (5.1%), 8-9-10 (5.1%), 5-8-9 (4.1%), 6-9-10 (4.0%).

**Cost of the Win-odds rule on this race:** before the swap/additions (legs #10, #5, #3) the ticket would be 3 combos / **$30 / 30.5% MC coverage**. The market-signal legs (#11, #2, #7) add 7 combos (+$70) but only **+4.1pp** of coverage, because #11 and #7 have MC Place% of 5–7%.

⚠️ **Late-odds watch (Strategy B is sensitive to price moves):**
- If **#3 LUNAR DASH shortens to 10 or below** (SCMP already has it at 11), it is no longer replaceable. #11 would then be **added**, not swapped, giving 6 legs → C(6,2) = 15 combos → **$150**.
- If **#13 APEX GLORY (exactly 10) or #8 KINGMAN REEF (15)** shortens below 10, it becomes a candidate. It would be **added directly**, since there is no replaceable leg after #3's swap: +1 leg, 15 combos, $150.
- If #11, #2 or #7 **drifts to 10+**, it drops out as a candidate. For example, if #11 drifts, #2 replaces #3 instead and the ticket stays 4–5 legs.
- If **#9** (banker) is scratched → **VOID**.

CONFIDENCE (Strategy B): **MEDIUM**. The banker has an 83% MC place and is a closer drawn on the rail. Its figure rests on one run, and two of the five legs (#11, #7) carry very little MC support.

**Comparison vs Strategy A.**
- **Cost and coverage:** Strategy A costs **$60 for 33.5%** MC coverage; Strategy B costs **$100 for 34.5%**. They share the two biggest combos (5-9-10, 2-9-10 = 24.7% MC).
- **Why the bankers differ:** the debutant rule moves A's banker from #9 to #10 (MC place 57.8%). B keeps #9 (83.3%), so B's ticket survives #10 missing the frame and A's does not.
- **Where B loses efficiency:** the Win-odds rule swaps out #3 (21.2% place, in 3-9-10 at 5.8%) for #11 (5.2%) and adds #7 (6.7%). That costs $70 for +4pp.
- **Pure MC view:** the most efficient ticket is the rule-breaking **#9 banker + (10, 5, 3, 2)** at **$60 / 40.6%**. Neither strategy produces it; it is shown in Strategy A's alternatives table for reference only.
═══════════════════════════════════════════════════════════
