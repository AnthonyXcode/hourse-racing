═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-13 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good (SCMP) / Good to Firm (HKJC card) | 0 scratchings (2 standby starters not required)
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-13 --venue "Sha Tin" --race 8 --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5`). The run loaded 2,249 historical races and 2,311 indexed performances, enriched 13 of 14 horses with form (#11 has no HK form) and loaded 14 jockey and 14 trainer profiles.
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction)
SCMP DATA: ✅ Loaded. Star Form covers all 14 runners; TIR 11/14; Vet reports #5, #10, #11; one trackwork highlight (#1). ⚠️ The SCMP Place odds and Q/QP matrix are unusable and were **not used** (see caveats). Tipster picks were ignored (rule 13).
ODDS SOURCE: **HKJC win pool** (`fetch-odds.ts`, captured 10:08 HKT 13-Sep), complete for all 14 runners
             SCMP odds: ✅ Win loaded, but the Place column mirrors Win (unusable) | HKJC live: the 10:08 snapshot plus the analyzer's own later fetch. Neither source flips any Strategy B flag.
             ⚠️ Place odds NOT usable. `analyze-race.ts` logged "place odds estimated from win odds", so every Strategy B odds test uses **Win odds only**, as the rule specifies.

RACE: R8 WAH FU HANDICAP — **Class 3** | **1000m (straight)** | Turf | Good / Good to Firm | **14 runners**
CLASSIFICATION: **Competitive** (top Adj Win% 27.1%; raw MC 22.1%) | POOL SIZE: **7** (Mode B's 6, plus 1 forced by the ≥25% Adj Place% must-include rule)
MODE: **B — Standard Pool** (expanded to 7)
BET STRUCTURE: **膽拖** | 1膽 + 6腳 | C(6,2) = 15 combinations. The banker is **#4**, because the 1st-ranked #1 has fewer than 2 starts and is ineligible.
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Sha Tin 2026-09-13 | Going: Good (SCMP) vs "Good to Firm" (HKJC racecard / analyzer) | Surface: Turf
Target Race: R8 (Class 3 | 1000m straight | 14 runners) — 4:35pm
Scratchings: none among the 14 declared. SCMP lists standby starters PARENTS' LOVE and DRAGON FOUR SEAS
             as "R" (not required).
Odds coverage: 14 / 14 horses with HKJC Win odds
Starters: 14 ≥ 3 → Trio pool valid
Jockey stats: 14 jockey profiles + 14 trainer profiles loaded
Debutants / <2 starts: #11 CONGHUA GALAXY (0 HK starts; 3 Australian starts, last-start Mildura winner)
                       #1 SOLID STATE (1 HK start: the 04-Jul local-debut win) → NOT banker-eligible (rules 1 / 17)
                       #12 INVINCIBLE STEED has exactly 2 starts → eligible
Long layoff (>90 days): #5 KYRUS DRAGON (214d, last run 11-Feb; knee surgery + lameness)
                        #10 ALPHA STRIKE (127d, last run 09-May; throat surgery)
SCMP data: ✅ Form/TIR/Vet/Trackwork | ⚠️ Place odds + Q/QP unusable
```

⚠️ **Going discrepancy.** The HKJC racecard saved by the analyzer says **Good to Firm**, and the finish-time projection used it. SCMP and the R1–R6 reports for this meeting say **Good**. The two are close for a straight 1,000m, so no adjustment was made.

⚠️ **Weight / rating:** #1 SOLID STATE is top weight (**135 lb**) off a rating of **78, up 12** after his only local run. Five of the field (#2, #4, #6, #8, #13) met last time over this course and distance on 01-Jul (Race 822).

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Starts (form) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|---------------|-------------------|--------------------------|
| 1 | SOLID STATE | 22.1% | 50.6% | 1.7 | ✅ | ✅ | 14 | 1 | ★ 膽 (Banker) | 1-12: 5.6% (17.8) |
| 12 | INVINCIBLE STEED | 12.7% | 36.2% | 27 | ✅ | ❌ | 1 | 2 | 腳 (Leg) | 1-12: 5.6% (17.8) |
| 8 | MICKLEY | 11.2% | 31.7% | 10 | ✅ | ❌ (exactly 10) | 8 | 10 | 腳 (Leg) | 1-8: 5.3% (18.7) |
| 4 | STRAIGHT TO GLORY | 10.8% | 31.8% | 13 | ✅ | ❌ | 13 | 10 | 腳 (Leg) | 1-4: 4.8% (21.0) |
| 2 | FAST RESPONDER | 10.6% | 31.4% | 16 | ✅ | ❌ | 6 | 10 | 腳 (Leg) | 1-2: 5.1% (19.7) |
| 13 | LUCKY CANDY | 10.6% | 32.4% | 9.7 | ✅ | ✅ | 4 | 9 | 腳 (Leg) | 1-13: 5.4% (18.7) |
| 9 | EVER LUCK | 7.1% | 23.9% | 25 | ✅ | ❌ | 12 | 7 | 腳 (Leg) — replaceable (20–30%, odds >10), not replaced | — |
| 11 | CONGHUA GALAXY | 4.8% | 17.0% | 32 | ❌ | ❌ | 11 | 0 | — | — |
| 6 | METRO POWER | 3.3% | 13.9% | 19 | ❌ | ❌ | 9 | 10 | — | — |
| 5 | KYRUS DRAGON | 2.8% | 11.4% | 39 | ❌ | ❌ | 2 | 10 | — | — |
| 3 | DRAGON AIR FORCE | 2.3% | 9.9% | 44 | ❌ | ❌ | 7 | 10 | — | — |
| 10 | ALPHA STRIKE | 1.3% | 6.5% | 22 | ❌ | ❌ | 10 | 6 | — | — |
| 7 | LA FORZA | 0.4% | 2.4% | 51 | ❌ | ❌ | 3 | 10 | — | — |
| 14 | MASTER CHAMPION | 0.1% | 1.0% | 51 | ❌ | ❌ | 5 | 10 | — | — |

**Market:** Overround **22.2%**, favourite bias **−60.2%**, longshot bias **+8.7%**. The model and the market agree on **who** is favourite but disagree sharply on **how strong** he is. The market has #1 SOLID STATE at **1.7**, about 48% to win after overround. MC gives him **22.1%** win and **50.6%** place, which is fair odds of about 4.5. Behind him MC sees a **flat six-horse cluster**: #12, #8, #4, #2 and #13 all sit at 10.6–12.7% win and 31–36% place, with #9 (23.9%) a step lower. The analyzer flags **#12 INVINCIBLE STEED** as "undervalued by 204%" (27 in the market vs MC fair ~7.9).

**Top quinella combinations (MC):** 1-12 5.6% ($17.8) · 1-13 5.4% ($18.7) · 1-8 5.3% ($18.7) · 1-2 5.1% ($19.7) · 1-4 4.8% ($21.0).

**MC trio distribution.** These figures come straight from the simulator, averaged over 5 re-executions of the same `runRaceAnalysis` pipeline (10,000 runs each) on the saved racecard:

1-12-13 **2.59%** · 1-8-12 2.42% · 1-2-12 2.38% · 1-4-12 2.28% · 1-4-13 2.13% · 1-4-8 2.11% · 1-2-4 2.07% · 1-2-13 2.03% · 1-8-13 2.00% · 1-2-8 1.99% · 1-9-12 1.60%.

No trio reaches 3%. This is a **very flat trio market**: the top 10 combos are all worth 2.0–2.6%, and each is #1 plus two of the cluster.

**Stability (10 re-runs in two batches of 5):**
- **#1 was MC #1 in 10/10 runs**, with 21.8–22.7% win and 50.4–52.1% place.
- #12 was MC #2 in 10/10 runs (12.4–13.3% win).
- #8, #4, #2 and #13 swapped places 3–6 every run (win 10.0–11.8%, place 30.0–32.9%) and never dropped below 20% place.
- #9 stayed at **22.9–24.0%** place, always above 20% and always inside the 20–30% replaceable band.
- #11 peaked at 17.7%.
- **No Strategy B selection changed in any re-run.**

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | Win (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork / Trial | Running Style |
|---|-------|-----------|------------------|----------|----------|-------------------|---------------|
| 1 | SOLID STATE | 1.8 | **+form**: "emphatically **made all**" to win on local debut (1,200m, Jul) | **+excuses** (bumped near the 900M turn) | clear | **+trial**: won a Conghua 1,000m trial; highlight "galloped his rivals into the ground" | Front-runner |
| 2 | FAST RESPONDER | 16 | **+form**: **made all** as a 10lb claimer (3 starts back), then third after a slow start | **+excuses** (crowded after the start, unbalanced) | clear | — | On-pace |
| 3 | DRAGON AIR FORCE | 36 | — (the rallying second was 5 starts back, so stale; "misfired four times"; "empty" 1,400m last start) | **+excuses** (hampered at 900M; raced wide without cover) | clear | — | Midfield |
| 4 | STRAIGHT TO GLORY | 14 | **+form**: last-start **winner** over this course and distance "after a troubled start"; 2 wins from his last 3 straight 1,000m runs | **+excuses** (checked after the start when crowded) | clear | — | — |
| 5 | KYRUS DRAGON | 36 | — ("won first-up" pattern from past campaigns; not a recent-run signal) | **+excuses** (raced tight in the final 100M; lay in = own fault, but tight = received) | **−injury30d**: knee surgery 13-Mar + lame 22-Jun, **passed 20-Aug (24d)** | — | — |
| 6 | METRO POWER | 18 | — (his wins are 4+ starts back; "nearly placed" latest) | none (he shifted in and bumped, i.e. self-caused) | clear | — | — |
| 7 | LA FORZA | 49 | — ("goes well fresh", a C&D record from past seasons; "never involved" recently) | **+excuses** (hampered, bumped early) | clear (knee surgery is mentioned in Star Form but there is no current vet entry) | — | — |
| 8 | MICKLEY | 8.2 | — (the seconds are 6+ starts back; blood in trachea; "beat four runners" last start) | none | clear | — | Back marker |
| 9 | EVER LUCK | 26 | **+form**: **made all** over the straight 1,000m in Class 4 (3 starts back); "struggled" twice since in C3 | **+excuses** (steadied at 350M; jumped awkwardly and lost ground) | clear | — | Front / on-pace |
| 10 | ALPHA STRIKE | 17 | — (dull runs, then throat surgery) | none (failed to finish because of epiglottic entrapment, which is a vet finding and not a TIR trouble flag) | throat surgery 12-May, **passed 09-Jun (96d)** → no penalty | **+trial**: "**made all** recent dirt trial" | Front-runner |
| 11 | CONGHUA GALAXY | 28 | **+form**: last-start **winner** (1,200m Mildura, AUS) | — (no HK runs) | **−injury30d**: lame 27-Jun, **passed 27-Aug (17d)** | — (the June trial win came before the lameness; the latest Conghua trial was only "OK") | — |
| 12 | INVINCIBLE STEED | 25 | — (third on local debut at this course and distance, then fifth from gate 10 over 1,200m; no trigger word) | none: he was steadied because he was **racing keenly** (self-caused, as with R5 #3), and the later contact was also his own | clear | — | Midfield (keen) |
| 13 | LUCKY CANDY | 9.3 | — ("placed in past five starts", "close seconds after prominent runs"; consistent, but no trigger word) | none (shifted out at the jump and made contact, i.e. self-caused) | clear | **+trial**: "won recent trial" | On-pace |
| 14 | MASTER CHAMPION | 54 | — ("C&D mystery") | none | clear | — | — |

**Flag discipline.** These are the same conventions as the 13-Sep R1–R6 reports:
- `+excuses` is given only where the horse **received** trouble: #1 bumped, #2 crowded, #3 hampered/wide, #4 checked, #5 raced tight, #7 hampered, #9 steadied. It is withheld where the trouble was self-caused: #12 (steadied for keenness), #13 (shifted out at the jump), #6 (shifted in).
- `+excuses` for **#1** is disclosed as a mechanical application, because he was bumped **and still won**. The rule reads the trouble, not the result (same as R6 #7).
- `+form` is keyword-based ("made all", "winner", "rallied", "improved") and counts only within the **last 3 starts**. It applies to #1, #4 (last start), #2 and #9 (3 starts back) and #11 (last start, overseas). It is not applied to #3 (5 back), #6 (4+ back) or #8 (6+ back).
- `+trial` is given for a trial win or a trackwork highlight: #1 (both), #10 (made all in a trial, same as R1 #3) and #13 (trial win).
- `−injury30d` covers vet clearances within 30 days of 13-Sep: #5 (24d) and #11 (17d). #10's clearance came 96 days ago, so no penalty applies.
- No `−perf`, `−barrier`, `−notRO` or `−age` (the oldest runner, #5, is 7).
- No `+draw`: SCMP made no draw comments for this race.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 1 | SOLID STATE | 22.1% | 50.6% | +form +1, trial +2, excuses +2 | +form +1, trial +2, excuses +2 | **27.1%** | **55.6%** | 1.7 | A Badel | 14 | Front | +form, +trial, +excuses | 腳 (Leg) ⚠️ <2 starts, not banker-eligible |
| 2 | 4 | STRAIGHT TO GLORY | 10.8% | 31.8% | +form +1, excuses +2 | +form +1, excuses +2 | **13.8%** | **34.8%** | 13 | K C Leung | 13 | — | +form, +excuses | ★ 膽 (Banker) |
| 3 | 2 | FAST RESPONDER | 10.6% | 31.4% | +form +1, excuses +2 | +form +1, excuses +2 | **13.6%** | **34.4%** | 16 | H Y Yuen (-10) | 6 | On-pace | +form, +excuses | 腳 (Leg) |
| 4 | 12 | INVINCIBLE STEED | 12.7% | 36.2% | 0 | 0 | **12.7%** | **36.2%** | 27 | C Y Ho | 1 | Mid (keen) | — | 腳 (Leg) |
| 5 | 13 | LUCKY CANDY | 10.6% | 32.4% | trial +2 | trial +2 | **12.6%** | **34.4%** | 9.7 | K Teetan | 4 | On-pace | +trial | 腳 (Leg) |
| 6 | 8 | MICKLEY | 11.2% | 31.7% | 0 | 0 | **11.2%** | **31.7%** | 10 | A Atzeni | 8 | Back | — | 腳 (Leg) |
| 7 | 9 | EVER LUCK | 7.1% | 23.9% | +form +1, excuses +2 | +form +1, excuses +2 | **10.1%** | **26.9%** | 25 | J Orman | 12 | Front / on-pace | +form, +excuses | 腳 (Leg) — must-include (≥25%) |
| 8 | 3 | DRAGON AIR FORCE | 2.3% | 9.9% | excuses +2 | excuses +2 | 4.3% | 11.9% | 44 | M Chadwick | 7 | Midfield | +excuses | — |
| 9 | 6 | METRO POWER | 3.3% | 13.9% | 0 | 0 | 3.3% | 13.9% | 19 | L Hewitson | 9 | — | — | — |
| 10 | 10 | ALPHA STRIKE | 1.3% | 6.5% | trial +2 | trial +2 | 3.3% | 8.5% | 22 | E C W Wong (-3) | 10 | Front | +trial | — |
| 11 | 11 | CONGHUA GALAXY | 4.8% | 17.0% | +form +1, -injury30d −3 | +form +1, -injury30d −4 | 2.8% | 14.0% | 32 | L Ferraris | 11 | — | +form, −injury30d | — |
| 12 | 7 | LA FORZA | 0.4% | 2.4% | excuses +2 | excuses +2 | 2.4% | 4.4% | 51 | B Avdulla | 3 | — | +excuses | — |
| 13 | 5 | KYRUS DRAGON | 2.8% | 11.4% | excuses +2, -injury30d −3 | excuses +2, -injury30d −4 | 1.8% | 9.4% | 39 | P N Wong (-7) | 2 | — | +excuses, −injury30d | — |
| 14 | 14 | MASTER CHAMPION | 0.1% | 1.0% | 0 | 0 | 0.1% | 1.0% | 51 | R Kingscote | 5 | — | — | — |

**Factor legend:**
- `trial +2`: trial win or trackwork highlight
- `excuses +2`: TIR trouble received
- `+form +1`: made all / winner within the last 3 starts
- `-injury30d −3 / −4`: vet clearance less than 30 days ago (Win / Place)

The largest adjustment is +5 (#1). No horse reaches the ±8% / ±10% cap or the 50% Win / 85% Place ceiling. Adj Win% sums to 119.1% and Adj Place% to 317.1%. Neither is renormalised in the table; the renormalisation used for the combination maths is disclosed below. #6 and #10 tie on Adj Win% (3.3%), and Adj Place% breaks the tie. #2 and #13 tie on Adj Place% (34.4%), but both are in the pool anyway.

**Classification:** the top Adj Win% is 27.1% (#1), which falls in the 20–35% band, so the race is **Competitive** and **Mode B** applies.

**Pool construction:**
- Mode B takes the top 3 by Adj Win% (#1, #4, #2) plus the next 3 by Adj Place% (#12 36.2%, #13 34.4%, #8 31.7%).
- The **must-include rule** (Adj Place% ≥ 25%) then adds **#9 EVER LUCK (26.9%)**, taking the pool to **7**. This is within the skill's 5–7 pool range.
- #9's inclusion is robust. His raw place across the 10 re-runs was 22.9–24.0%, which is 25.9–27.0% adjusted, always ≥ 25%.
- No other horse reaches 20% Adj Place%. The next best is #11 at 14.0%.

**Banker eligibility (rules 1 / 17), the key point in this race:**
- The 1st-ranked **#1 SOLID STATE has only 1 race start** (his 04-Jul local-debut win). He **cannot be banker** and stays in the pool as a leg. This follows the 15-Mar R7 and 22-Mar R2 precedents.
- The banker moves to the next-ranked horse with ≥2 starts: **#4 STRAIGHT TO GLORY** (10 starts, Adj Win% 13.8%).

⚠️ **The banker slot is a noise-level tie.**
- In the primary run the order is #4 13.8% > #2 13.6% > #12 12.7% > #13 12.6%.
- Across the 10 re-runs, using the same factors, **#2 led the slot in 6, #4 in 3, and one run was a three-way tie at 13.3%** (#4/#2/#12).
- The rule output from the primary run (#4) stands, as in R6. Neither horse has a trial flag to break the tie (skill 1e-v).
- The market slightly prefers #4: 13 vs 16 at HKJC, 14 vs 16 at SCMP.
- Ticket coverage is practically the same either way: 19.3% with #4 vs 19.0% with #2 (MC direct). The #2 version is priced below.

**雙膽拖:** not triggered. No horse other than #1 reaches 63% Adj Place%, and #1 is ineligible in any case.

**Not in pool, market ≤ 15 (rule 9 check):** none. Every horse priced at 15 or shorter (#1, #13, #8, #4) is in the pool.

**Pace read.** The race is 1,000m straight and there is plenty of early speed:
- **#1** made all on debut and jumps from gate 14, on the outside, which is usually the favoured stands side on the ST straight.
- **#9** made all over this course and distance, from gate 12.
- **#2** made all as a claimer.
- **#10** won sharing the lead on debut.
- **#13** has "prominent runs".

With #1, #4 and #9 all drawn 12–14, the high side should carry the speed. **#12**, from gate 1 and a keen type, is on the far side from that pace. **#8** comes from the rear and needs a genuine tempo, which he should get.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#4, #1, #2, #12, #13, #8, #9**
MODE: **B — Standard Pool (expanded to 7 by must-include)** | POOL SIZE: 7

膽拖 STRUCTURE (1st eligible-ranked horse = Banker):
膽 (Banker): **#4 STRAIGHT TO GLORY** (Adj Win% 13.8%, Adj Place% 34.8%) ← locked in every combo. #1 is excluded as banker because he has fewer than 2 starts.
腳 (Legs):  **#1, #2, #12, #13, #8, #9**
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = **15**

TOP TRIO COMBINATIONS: the top 8 of the 35 pool combos, ranked by Plackett-Luce fitted to Adj Place%. The MC-direct % is in brackets and ticket combos are marked ✔.

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds ($10) | In 膽拖 ticket |
|------|--------------------|-----------------|----------------------|----------------|
| 1 | #1, #4, #12 | 2.45% (MC 2.28%) | $408 | ✔ |
| 2 | #1, #12, #13 | 2.41% (MC 2.59%) | $414 | — |
| 3 | #1, #2, #12 | 2.41% (MC 2.38%) | $414 | — |
| 4 | #1, #4, #13 | 2.29% (MC 2.13%) | $437 | ✔ |
| 5 | #1, #2, #4 | 2.29% (MC 2.07%) | $437 | ✔ |
| 6 | #1, #2, #13 | 2.25% (MC 2.03%) | $444 | — |
| 7 | #1, #8, #12 | 2.17% (MC 2.42%) | $461 | — |
| 8 | #1, #4, #8 | 2.06% (MC 2.11%) | $486 | ✔ |

**Ticket coverage:** 膽拖 **20.4%** (adjusted fit) / **19.3%** (direct MC trio counts) for 15 combos. The ticket needs **#4 in the frame**, which the MC puts at **30.8%**.

**Fit note (disclosed):** Adj Place% sums to **317.1%**, but any real top-3 distribution must total 300%. The Plackett-Luce fit therefore renormalises proportionally by 0.946 (e.g. #1 55.6% → 52.6%). After that the fit is exact (max error < 0.0001pp).

**Largest combinations NOT covered by the 膽拖 (MC direct):** 1-12-13 (2.59%), 1-8-12 (2.42%), 1-2-12 (2.38%), 1-2-13 (2.03%), 1-8-13 (2.00%), 1-2-8 (1.99%). Every one is #1 plus two non-banker legs. The MC's most likely outcome is **#1 in the frame and #4 out of it**.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- **#1 is a 1.7 favourite.** Any trio of #1 plus the market's next picks (#13 9.7, #8 10, #4 13) will pay a modest dividend. MC's fair values for those combos ($400–500) are high only because MC rates #1 at 50% place, against the market's roughly 80%.
- **The model's value angle is the cluster behind #1**, especially #12 INVINCIBLE STEED (27, MC fair ~7.9) and #9 (25). If #1 misses the frame, trios made up only of cluster horses (e.g. 4-8-12 $808 fair, 4-12-13 $896 fair) should pay large dividends. Strategy A's #4-banker ticket includes 10 of those non-#1 combos.
- **The biggest risk is the model–market gap on #1.** MC builds #1 from **a single race** (1 form record) and makes him only 22% to win carrying 135 lb. The market says 48%. If the market is right, Strategy A's banker (#4) is much more likely to be beaten for a place by #1 plus one other.
- The SCMP Q/QP matrix could not be used for the rule-14 cross-reference (see caveats).

**Verdict:** Strategy A here is a **structurally weak ticket**. The natural anchor (#1) is ineligible, and the rule hands the banker role to a ~31%-to-place horse chosen by a 0.2pp coin-flip over #2. The rule output is shown as required, with LOW confidence.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (1 Banker + Legs)
膽 (Banker): **#4 STRAIGHT TO GLORY**
腳 (Legs):  #1 SOLID STATE, #2 FAST RESPONDER, #12 INVINCIBLE STEED, #13 LUCKY CANDY, #8 MICKLEY, #9 EVER LUCK
COMBINATIONS: **15** (C(6,2))
UNIT BET: $10 (fixed)
**TOTAL STAKE: $150**

TOP COMBINATIONS (highest probability, MC direct / adj PL):
  1-4-12 (2.28% / 2.45%) · 1-4-13 (2.13% / 2.29%) · 1-4-8 (2.11% / 2.06%) · 1-2-4 (2.07% / 2.29%) · 1-4-9 (1.27% / 1.68%)
  · 4-8-12 (1.24% / 1.06%) · 2-4-12 (1.14% / 1.17%) · 4-12-13 (1.12% / 1.17%) · 2-4-13 (1.00% / 1.10%) · 2-4-8 (1.00% / 0.99%)

Priced alternatives (not the recommendation; shown so the trade-offs are visible):
| Variant | Structure | Combos | Cost | Coverage (MC direct / adj PL) |
|---------|-----------|--------|------|-------------------------------|
| **Recommended (rule output)** | 膽拖 1膽 #4 + 6腳 (1, 2, 12, 13, 8, 9) | 15 | **$150** | 19.3% / 20.4% |
| Banker tie-break the other way | 膽拖 1膽 #2 + 6腳 (1, 4, 12, 13, 8, 9) | 15 | $150 | 19.0% / 20.2% |
| Full pool, no banker | C(7,3) | 35 | $350 | 47.5% / 49.2% |
| Ignore rule 17 (bank #1) = Strategy B ticket | 膽拖 1膽 #1 + 6腳 | 15 | $150 | 29.1% / 30.6% |

PASS CONDITIONS:
- If **#4 STRAIGHT TO GLORY** (banker) is scratched → **VOID** the ticket (rule 10).
- If the field drops below 3 starters → the pool is refunded (not a live risk).
- If **#1 shortens further (≤ 1.5)** → the market is pricing #1 at roughly 85%+ to place, and a ticket that needs #4 in the frame is fighting the market for one of two remaining places. Prefer Strategy B, or PASS on Strategy A.
- If **#4 drifts past ~20** → the market is fading the banker; downgrade to PASS.
- If the going turns **Yielding or softer** → re-assess. Most of the cluster's straight-course form is on Good / Good to Firm.

CONFIDENCE: **LOW.**
- For: Competitive race; #4 is a last-start course-and-distance winner with an excuse (checked at the start), and 2 of his last 3 straight runs were wins; draw 13 is on the speed side.
- Against:
  1. The banker is only **30.8%** to place in the MC.
  2. The banker choice is a noise tie with #2 (which led 6 of 10 re-runs).
  3. The strongest horse (#1) can only be a leg.
  4. The trio distribution is very flat (no combo reaches 3%).

CAVEATS:
- **SCMP Place odds and Q/QP matrix unusable, so not used.** SCMP's Place column mirrors its Win column (e.g. #1 1.8/1.7, #13 9.3/9.4), as in R1 and R6. The Q and QP matrices came back **identical** and inconsistent with the win market. For example, 1-8 is shown at 38 while #8 is 3rd favourite, and 4-13 at 6.1 is the shortest pair even though #1 is 1.7. The rule-14 cross-reference was skipped.
- **Place odds were estimated** from win odds by the analyzer, so only Win odds were used for the Strategy B tests.
- **Odds snapshots differ slightly but flip nothing.** HKJC 10:08 has #8 at **10** and #13 at 9.7; the analyzer's later fetch has #8 11 and #13 8.8; SCMP has #8 8.2 and #13 9.3. #8 and #13 are primary legs either way, and no horse below 20% place is priced under 10 in any source.
- **The MC has thin form on its top two.** #1 has **1** form record and #12 has **2**; the MC's 50.6% and 36.2% place figures for them rest on one and two runs respectively. #11 has **0** HK form, so his 17.0% comes from rating, jockey and trainer factors only.
- **Internal model inconsistency.** The analyzer's finish-time projection ranks **#8 MICKLEY fastest** and #10 ALPHA STRIKE 2nd (22 in the market, 1.3% MC win). It puts #1 10th (+2.25s) and #4/#2 near last (+2.9 to 3.1s), while the win/place simulation makes #1 MC #1 and #4/#2 top-6. #1's only run was over 1,200m on Good to Yielding, which probably distorts his figure at 1,000m. The Trio ranking follows Win%/Place% as the skill specifies.
- **Scraper log inconsistency:** the race-card scraper logged "distance=1200m", but the saved racecard, the analysis header and SCMP all agree on **1000m**, which was used. This is the same class of log bug seen in R6.
- **Going discrepancy:** Good (SCMP) vs Good to Firm (HKJC card).
- **Long layoffs:** #5 (214d, knee surgery plus lameness, cleared 24 days ago) and #10 (127d, throat surgery). Neither is in either pool.
- **Jockey-stat samples are small** (4–17 rides per jockey in the indexed data). For example, A Badel on #1 is 0/11 and K C Leung on the banker #4 is 10% from 10.
- **Banker tie** (#4 vs #2) is within MC noise; see Rankings.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#1 SOLID STATE** (MC Win% 22.1%, MC Place% 50.6%) ← 1st by MC Win% (10/10 re-runs)
  Note: the skill defines the Strategy B banker as "MC #1 — always banker"; banker eligibility is a Strategy A rule. The 22-Mar R2 report instead applied rule 17 to Strategy B too. That variant is priced below for comparison.

Primary legs (MC Place% > 20%): **#12 (36.2%), #13 (32.4%), #4 (31.8%), #8 (31.7%), #2 (31.4%), #9 (23.9%)**

Replaceable legs (MC Place% in 20–30% **AND** Win odds > 10): **#9 EVER LUCK** (MC Place% 23.9%, Win odds 25). He is the only leg in the band; the others are all ≥ 31%.

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10): **none.** The only horses priced under 10 are #1 (1.7) and #13 (9.7), and both are already above 20% place. #8 is exactly 10, so he is not < 10, and he is a primary leg anyway.

Action: **no replacement and no addition.**

Final legs: **#12, #13, #4, #8, #2, #9**
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = **15**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $150**

STRATEGY B TICKET: direct MC trio counts from the simulator (5-run average), with Plackett-Luce on raw MC Place% in brackets.

| Rank | Horses (any order) | MC Trio% | Est. Fair Odds ($10) |
|------|--------------------|----------|----------------------|
| 1 | #1, #12, #13 | 2.59% (PL 2.44%) | $387 |
| 2 | #1, #8, #12 | 2.42% (PL 2.37%) | $413 |
| 3 | #1, #2, #12 | 2.38% (PL 2.34%) | $420 |
| 4 | #1, #4, #12 | 2.28% (PL 2.38%) | $439 |
| 5 | #1, #4, #13 | 2.13% (PL 2.05%) | $469 |
| 6 | #1, #4, #8 | 2.11% (PL 1.99%) | $474 |
| 7 | #1, #2, #4 | 2.07% (PL 1.96%) | $483 |
| 8 | #1, #2, #13 | 2.03% (PL 2.01%) | $493 |
| 9 | #1, #8, #13 | 2.00% (PL 2.04%) | $500 |
| 10 | #1, #2, #8 | 1.99% (PL 1.95%) | $502 |
| 11 | #1, #9, #12 | 1.60% (PL 1.66%) | $624 |
| 12 | #1, #9, #13 | 1.43% (PL 1.43%) | $700 |
| 13 | #1, #8, #9 | 1.42% (PL 1.39%) | $705 |
| 14 | #1, #2, #9 | 1.39% (PL 1.37%) | $718 |
| 15 | #1, #4, #9 | 1.27% (PL 1.40%) | $785 |

**Ticket coverage: 29.1%** (MC direct) / 28.8% (PL on raw MC). Only #1 needs to be in the frame, which the MC puts at 50.6%; the market implies about 80%.
**Largest combos not covered:** 4-8-12 (1.24%), 8-12-13 (1.22%), 1-11-12 (1.17%), 2-12-13 (1.15%), 2-4-12 (1.14%). These are the "#1 misses the frame" outcomes, plus #11.

⚠️ **Late-odds watch (Strategy B legs depend on late prices):**
- If any non-leg runner **shortens below 10**, it **replaces #9** (1-for-1). The combo count stays at 15 ($150), but the ticket changes. The nearest candidates are #6 METRO POWER (19; SCMP 18) and #10 ALPHA STRIKE (22; SCMP 17), both a long way off.
- If **#9 itself shortens to ≤ 10**, he is no longer "replaceable". That has no effect unless a candidate also appears.
- #11 CONGHUA GALAXY (17.0%, up to 17.7% in re-runs) would need to reach > 20% MC place to become a leg, which is not a live risk.

Strategy B variant (22-Mar R2 precedent: apply rule 17 to B → bank MC #2 #12 INVINCIBLE STEED + legs #1, #8, #4, #2, #13, #9): 15 combos, $150, **21.5%** MC coverage. This is shown for reference only; the skill text says MC #1.

**Comparison vs Strategy A.** Both strategies select the **same 7 horses** (#1, #2, #4, #8, #9, #12, #13) and cost the same **$150 / 15 combos**. The only difference is the banker:
- Strategy B anchors on **#1**, the MC #1 in 10/10 runs and the 1.7 favourite, who is 50.6% to place in the MC. That gives **29.1%** coverage.
- Strategy A's eligibility rule forces the anchor onto **#4**, who is 30.8% to place and won the tie over #2 by 0.2pp. That gives **19.3%** coverage.

Under the model, Strategy B is the clearly stronger ticket for the same money. Strategy A only wins if #1's thin race record, top weight and wide gate find him out, which is exactly the risk rule 17 exists to guard against. If only one ticket is played, the model favours **Strategy B**.
═══════════════════════════════════════════════════════════
