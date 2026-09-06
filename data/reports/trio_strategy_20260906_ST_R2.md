═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-06 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --form-data all`, HV+ST form)
HISTORICAL SYNC: ✅ 218/219 fixtures scraped (only 2024-06-19 HV unavailable on HKJC)
SCMP DATA: ✅ Loaded — TIR + Vet parsed for all 11 runners (⚠️ no Star Form comments, no trackwork/trial notes published)
ODDS SOURCE: HKJC early-morning pool (`fetch-odds.ts`, captured 20:07 HKT 05-Sep) — full 11-horse coverage
             SCMP odds: ✅ loaded (cross-check) | HKJC live: ❌ not open

RACE: R2 DUDDELL HANDICAP — Class 4 | 1000m | Turf | Good | 11 runners
CLASSIFICATION: Competitive (top Adj Win% 24.4%) | POOL SIZE: 6
MODE: B — Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)

> **Distance note:** the scraper log line printed `distance=1200m`, but the saved race card, the race conditions and the SCMP card all say **1000m**. 1000m is correct; the log line is a misparse and did not affect the simulation (the race card object carries 1000).

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| #  | Horse              | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B)          | Top Quinella (fair odds) |
|----|--------------------|---------|-----------|----------|------------|-------------|---------------|----------------------------|--------------------------|
| 6  | MABUBU             | 22.4%   | 51.1%     | 18       | ✅          | ❌           | 10/8/4/13/8/1 | ★ 膽 (Banker)              | 2-6: 9.2% (10.9)         |
| 2  | RAPID PHANTOM      | 17.8%   | 46.2%     | 4.1      | ✅          | ✅           | 1/4/3         | 腳 (Leg)                   | 2-4: 5.0% (20.2)         |
| 4  | RUN RUN SUNRISE    | 13.0%   | 36.8%     | 10       | ✅          | ❌           | 11/9/10/3/2/1 | 腳 (Leg)                   | 4-6: 5.9% (16.9)         |
| 3  | ONESHOT            | 8.8%    | 28.0%     | 14       | ✅          | ❌           | 8/10/1/14/5   | — (replaced by #10)        | 3-6: 4.4% (22.8)         |
| 9  | THUNDER PRINCE     | 8.6%    | 27.7%     | 6.7      | ✅          | ✅           | 5/6/11/4/1/8  | 腳 (Leg)                   | 6-9: 4.1% (24.2)         |
| 1  | LIGHTNESS OF MUSIC | 6.7%    | 23.0%     | 3.6      | ✅          | ✅           | 4/4/11/8/1    | 腳 (Leg)                   | —                        |
| 7  | SILVER SPURS       | 5.5%    | 20.2%     | 28       | ✅          | ❌           | 12/1/12/2/11/7| — (replaced by #8)         | —                        |
| 5  | HEY BROS           | 5.4%    | 19.8%     | 50       | ❌          | ❌           | 7/8/10/8/8/5  | —                          | —                        |
| 8  | RUBY THRIVE        | 4.5%    | 16.7%     | 8.3      | ❌          | ✅           | 3/7/14        | 腳 (Leg — replacement)     | —                        |
| 10 | COMET RADIANCE     | 4.0%    | 16.2%     | 9.1      | ❌          | ✅           | 7/11/11/6/2/12| 腳 (Leg — replacement)     | —                        |
| 11 | LET'S HAVE FUN     | 3.4%    | 14.3%     | 25       | ❌          | ❌           | 9/9/3/7/3/10  | —                          | —                        |

**Market:** Overround 22.4%. Favourite bias −51.6%, longshot bias +69.0%.
Model flags **#6 MABUBU undervalued by 304%** and **#5 HEY BROS by 170%**; **#1 LIGHTNESS OF MUSIC overvalued by 76%**.
The core disagreement: the market's top two are **#1 (3.6)** and **#2 (4.1)**, while MC's top pick **#6 MABUBU is only the 6th-shortest price at 18**. MC is leaning on #6's last-start win (form line 10/8/4/13/8/**1**) and its Class-4 speed figures; the market clearly is not. This is a much wider model/market gap than R1's, and it drives the whole ticket — see caveats.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 6 | MABUBU | 22.4% | 51.1% | excuses +2 | excuses +2 | **24.4%** | **53.1%** | 18 | J Orman | 9 | — | +excuses (contact on jump, held up 300–100M) | ★ 膽 (Banker) |
| 2 | 2 | RAPID PHANTOM | 17.8% | 46.2% | -notRO −2 | -notRO −2 | 15.8% | 44.2% | 4.1 | H Y Yuen (-10) | 5 | — | −notRO (laid out, hard to ride out) | 腳 (Leg) |
| 3 | 4 | RUN RUN SUNRISE | 13.0% | 36.8% | excuses +2 | excuses +2 | 15.0% | 38.8% | 10 | K C Leung | 10 | — | +excuses (checked leaving 200M) | 腳 (Leg) |
| 4 | 3 | ONESHOT | 8.8% | 28.0% | excuses +2 | excuses +2 | 10.8% | 30.0% | 14 | K Teetan | 8 | — | +excuses (bumped 900M, checked 150M) | 腳 (Leg) |
| 5 | 9 | THUNDER PRINCE | 8.6% | 27.7% | excuses +2 | excuses +2 | 10.6% | 29.7% | 6.7 | B Avdulla | 11 | — | +excuses (bumped after start, eased 50M) | 腳 (Leg) |
| 6 | 7 | SILVER SPURS | 5.5% | 20.2% | excuses +2 | excuses +2 | 7.5% | 22.2% | 28 | E C W Wong (-3) | 6 | — | +excuses (wide, no cover, whole race) | 腳 (Leg) |
| 7 | 8 | RUBY THRIVE | 4.5% | 16.7% | excuses +2 | excuses +2 | 6.5% | 18.7% | 8.3 | P N Wong (-7) | 1 | — | +excuses (contact, steadied when crowded) | out |
| 8 | 5 | HEY BROS | 5.4% | 19.8% | 0 | 0 | 5.4% | 19.8% | 50 | M L Yeung | 3 | — | — (shifted out itself — not bad luck) | out |
| 9 | 11 | LET'S HAVE FUN | 3.4% | 14.3% | excuses +2 | excuses +2 | 5.4% | 16.3% | 25 | H Bentley | 4 | — | +excuses (checked on jumping) | out |
| 10 | 1 | LIGHTNESS OF MUSIC | 6.7% | 23.0% | -injury30d −3 | -injury30d −4 | 3.7% | 19.0% | 3.6 | Z Purton | 2 | — | −injury30d (blood in trachea, passed 18/08) | out |
| 11 | 10 | COMET RADIANCE | 4.0% | 16.2% | -injury30d −3 | -injury30d −4 | 1.0% | 12.2% | 9.1 | Y L Chung (-2) | 7 | — | −injury30d (lame LF, passed 19/08) | out |

**Factor legend:** `excuses +2` = TIR bad-luck bounce; `-notRO −2` = not ridden out; `-injury30d −3 Win / −4 Place` = vet clearance inside 30 days of the race. No `+trial`/`+draw` (no Star Form or trackwork published), no `-perf`, no repeat "bumped on jumping", and **no horse is 8yo or above** (oldest = #7 and #9, both 6). All adjustments inside the ±8% Win / ±10% Place cap.

**Style column blank on purpose** — SCMP Star Form, the skill's designated running-style source, is not published for this card. Not guessed.

**The two vet flags are the decisive adjustment in this race:**
- **#1 LIGHTNESS OF MUSIC** — post-race endoscope found "a substantial amount of blood in the horse's trachea"; cleared **18/08/2026**, i.e. **19 days** before the race. It is the 3.6 market favourite with Purton, and MC already had it 6th (6.7% win). The −3/−4 drops it out of the Strategy A pool entirely.
- **#10 COMET RADIANCE** — reported **lame in the left front** the day after its last run; cleared **19/08/2026**, 18 days out. −3/−4 takes it to the bottom of the ranking.

Both are inside the skill's <30-day window, so the penalty is mandatory. Note rule 9 (no hard exclusion at odds ≤ 15) is **not** violated: neither horse is being excluded by narrative, they simply fall below the pool cut on adjusted numbers. #1 at 3.6 is the uncomfortable one — see caveats.

**Reasoning:**
- **#6 MABUBU (膽)** — MC #1 on both Win% (22.4) and Place% (51.1), won last start, and carries a genuine TIR excuse before that (contact on jumping, held up for clear running 300–100M). 6 past performances, banker-eligible. Its 18 price is the whole value case.
- **#2 RAPID PHANTOM** — only 3 starts (1/4/3) but all competitive; MC's 46.2% Place% is the second-best in the race even after the −notRO penalty. Gate 5.
- **#4 RUN RUN SUNRISE** — 3/2/1 across its last three; Lor stable, checked at the 200M last time. Wide gate 10 is the negative.
- **#3 ONESHOT** and **#9 THUNDER PRINCE** — both clear the 25% Adj Place% must-include bar with bad-luck excuses. #9 draws the outside gate 11 over 1000m, which is a real reducer at Sha Tin but not an exclusion (rule 15).
- **#7 SILVER SPURS** — sixth slot on Adj Place% (22.2%) after a forced wide trip. 28 in the market, the pool's genuine longshot.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #6, #2, #4, #3, #9, #7
MODE: B (Standard Pool) | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#6 MABUBU** (Adj Place% 53.1%) ← locked in every combo
腳 (Legs):  #2, #4, #3, #9, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

雙膽拖 check: 2nd-ranked #2 RAPID PHANTOM Adj Place% = 44.2% < 63% → **1 banker only**.

TOP TRIO COMBINATIONS (Plackett-Luce over Adj Win%, 300k draws):
| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|--------------------|-----------------|----------------|
| 1 | #6, #2, #4 | 5.40% | $19 |
| 2 | #6, #2, #3 | 3.71% | $27 |
| 3 | #6, #2, #9 | 3.63% | $28 |
| 4 | #6, #3, #4 | 3.52% | $28 |
| 5 | #6, #4, #9 | 3.42% | $29 |

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 10 (膽拖: C(5,2), legs = 5)
UNIT BET: $10 (fixed)
TOTAL STAKE: **$100**
MODELLED COVERAGE: **30.0%** (vs 42.1% for the full C(6,3)=20 ticket at $200 — 50% cheaper for 71% of the coverage)

FULL TICKET (all 10 combos, ranked by modelled probability):
| Combo | Prob | Fair odds |
|-------|------|-----------|
| 6-2-4 | 5.40% | $19 |
| 6-2-3 | 3.71% | $27 |
| 6-2-9 | 3.63% | $28 |
| 6-3-4 | 3.52% | $28 |
| 6-4-9 | 3.42% | $29 |
| 6-2-7 | 2.49% | $40 |
| 6-3-9 | 2.32% | $43 |
| 6-4-7 | 2.32% | $43 |
| 6-3-7 | 1.61% | $62 |
| 6-7-9 | 1.61% | $62 |

HKJC BET SLIP: Race 2 → Trio → 膽拖 → 膽: 6 | 腳: 2, 3, 4, 7, 9 | $10/combo

PASS CONDITIONS:
- **#6 MABUBU scratched → VOID the ticket** (do not restructure; rule 10).
- Any 2 of #2/#4/#3/#9 scratched → pass the race.
- Field drops below 3 starters → pool refunded automatically.
- Going changes to Yielding/Heavy → re-run MC.
- **If #6 shortens dramatically before the jump (e.g. into single figures), that supports the ticket. If it drifts past 25 while #1 and #2 hold, treat the banker as unsupported and consider passing** — the entire ticket rests on a horse the market currently rates 6th.

CONFIDENCE: **LOW–MEDIUM**

CAVEATS:
1. **The banker is the market's 6th choice.** #6 MABUBU is 18 on HKJC / 14 on SCMP while the market's top two are #1 (3.6) and #2 (4.1). The skill mandates the 1st-ranked horse as 膽, and MC's edge estimate on #6 is +304%, but a 膽拖 stakes the entire ticket on that single disagreement. The cross-meeting banker top-3 rate of ~56% is measured on bankers that were usually also short in the market; it should not be assumed here.
2. **Season opener — 0 jockey profiles and 0 trainer profiles loaded.** First meeting of 2026/27; MC ran with no current-season jockey/trainer form. Same limitation as R1, and it matters more here because the model is backing a mid-priced runner over two well-supported favourites.
3. **The favourite is penalised on a vet flag.** #1 LIGHTNESS OF MUSIC (3.6, Purton) scoped with substantial tracheal blood and was cleared only 19 days out. The −3/−4 is the skill's mandated adjustment and it removes the favourite from the Strategy A pool. If you disagree with penalising an EIPH episode that the vets cleared, #1 re-enters the pool at 23.0% raw Place% and would displace #7 SILVER SPURS.
4. **No Star Form or trackwork published** — only stewards' TIR text and vet lines were available, so `+trial` and `+draw` adjustments were unavailable and running styles are unknown. Over 1000m at Sha Tin, gate and early speed matter more than at most trips; that read is missing.
5. **The finish-time projection is unusable for this race** — it puts #10 COMET RADIANCE and #11 LET'S HAVE FUN jointly fastest (56.91) and #2 RAPID PHANTOM last, exactly inverting the win ranking. Speed-figure noise across a field with 3-to-10 form lines. Selection came from the win/place distribution only.
6. **Thin form for two pool horses:** #2 RAPID PHANTOM has 3 starts and #8 RUBY THRIVE 3 starts. MC's estimates for them rest on very little data.
7. **Average differentiation is only 5** (8 of 11 horses inside diff < 8) — a compressed, genuinely open Class 4 sprint. The model is separating the field less confidently than in R1 (avg diff 10).
8. Early-morning pool, 22.4% overround. Re-check prices near the jump.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#6 MABUBU** (MC Win% 22.4%, MC Place% 51.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2 (46.2%), #4 (36.8%), #3 (28.0%), #9 (27.7%), #1 (23.0%), #7 (20.2%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **#3 ONESHOT** (28.0%, odds 14), **#7 SILVER SPURS** (20.2%, odds 28)
  – #9 (27.7%, odds 6.7) and #1 (23.0%, odds 3.6) are in the 20–30% band but their odds are **not** > 10 → not replaceable.
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **#8 RUBY THRIVE** (8.3, 16.7%), **#10 COMET RADIANCE** (9.1, 16.2%)
Action (processed by Win odds ascending):
  1. **#8 (8.3) replaces #7** — lowest MC Place% among the replaceable legs (20.2%).
  2. **#10 (9.1) replaces #3** — #7 is gone and #8 (16.7%) is outside the 20–30% band, leaving #3 as the only replaceable leg.
Final legs: **#2, #4, #9, #1, #8, #10**
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = **15**
UNIT BET: $10 (fixed)
TOTAL STAKE: **$150**
MODELLED COVERAGE: **26.7%** (raw-MC Plackett-Luce, 300k draws)

STRATEGY B TICKET:
| Combo | Prob | Fair odds | | Combo | Prob | Fair odds |
|-------|------|-----------|-|-------|------|-----------|
| 6-2-4  | 5.90% | $17 | | 6-4-10 | 1.11% | $90  |
| 6-2-9  | 3.64% | $27 | | 6-8-9  | 0.78% | $128 |
| 6-1-2  | 2.82% | $35 | | 6-9-10 | 0.68% | $147 |
| 6-4-9  | 2.53% | $40 | | 6-1-8  | 0.61% | $165 |
| 6-1-4  | 1.89% | $53 | | 6-1-10 | 0.51% | $197 |
| 6-2-8  | 1.80% | $56 | | 6-8-10 | 0.36% | $281 |
| 6-2-10 | 1.64% | $61 | |        |       |      |
| 6-4-8  | 1.26% | $79 | |        |       |      |

HKJC BET SLIP: Race 2 → Trio → 膽拖 → 膽: 6 | 腳: 1, 2, 4, 8, 9, 10 | $10/combo

**A vs B comparison:** Same banker (#6 tops both MC Win% and Adj Win%) and the same top combo (6-2-4). Beyond that they diverge sharply, and **the divergence is unflattering to Strategy B this week.**

The replacement rule fired twice and cost coverage rather than buying it: Strategy B's six primary legs alone (#2, #4, #3, #9, #1, #7) would cover **33.8%** for the same $150, but swapping in #8 and #10 drops that to **26.7%** — the rule traded a 28.0% and a 20.2% place-chance for a 16.7% and a 16.2% one purely on market price. It also loads the ticket with six of the fifteen combos priced at fair odds above $120, which is where a $10 unit earns least.

Strategy B also keeps **#1 LIGHTNESS OF MUSIC** and **#10 COMET RADIANCE** as legs — by design, since it ignores SCMP — and those are precisely the two horses carrying sub-30-day vet clearances.

**If backing one only: Strategy A.** It is $50 cheaper, covers more (30.0% vs 26.7%), and its five legs are the five best place-chances in the race on either ranking. Strategy B's value here is as the A/B control, not as the ticket.
═══════════════════════════════════════════════════════════
