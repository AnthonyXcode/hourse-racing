═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-03-01 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations | Jockey boost applied (ST full)
SCMP DATA: ✅ Loaded | Form/TIR/Vet/Odds/Trackwork/QP/Q/Formline parsed
ODDS SOURCE: SCMP race card (captured ~12:04 HKT 01-Mar) + HKJC pool (fetch-odds.ts, ~12:04 HKT 01-Mar)
             SCMP odds: ✅ loaded | HKJC live: ✅ loaded (14 horses)

RACE: R4 — Class 4 | 1200M | Turf "B+2" Course | Good | 14 runners
CLASSIFICATION: Competitive (Adj Win% 30.4%) | POOL SIZE: 6
MODE: B (Standard Pool, 6 horses — all 6 exceed 20% Adj Place%)
BET STRUCTURE: 膽拖 1膽+5腳 C(5,2) = 10 combos
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
STEP 1: QUERY DATA
───────────────────────────────────────────────────────────
1a. Race: ST 2026-03-01 R4 (CITIGOLD HANDICAP - Sec2)
1b. Historical sync: ✅ 513 races, 1210 performances indexed (from R1 pipeline)
1c. Jockey stats: ✅ 17 jockeys; in R4: McDonald 15.8% on #3 (15-20% tier), Bowman 11.3% on #4 (10-15% tier)
1d. HKJC odds: ✅ 14 horses fetched
1e. HKJC race card: ✅ 14 declared runners + 1 reserve (LEAN MASTER)
1f. SCMP data: ✅ All sub-items extracted

───────────────────────────────────────────────────────────
STEP 2: VALIDATION SUMMARY
───────────────────────────────────────────────────────────
Meeting: ST 2026-03-01 | Going: Good | Surface: Turf "B+2" Course
Target Race: R4 (Class 4 | 1200M | 14 runners | Prize: $1,170,000 | Rating: 60-40)
Scratchings: none
Jockey stats: 17 jockeys loaded; 1 strong tier (McDonald on #3), 1 mid tier (Bowman on #4)
Odds coverage: 14 horses (SCMP + HKJC)
SCMP data: ✅ loaded (Star Form ✓ | TIR ✓ | Vet ✓ | Trackwork ✓ | Woo Formline ✓ | QP matrix ✓ | Q matrix ✓)

Critical checks: ✅ Racing confirmed | ✅ 14 starters ≥ 3 | ✅ Odds populated | ✅ Jockey stats non-empty
Warning checks: ⚠️ Going parser defaulted "Good" | ✅ Turf | ✅ No scratchings
                ⚠️ #1 ALSONSO: disappointing last, no excuse, vet clear — concerning
                ⚠️ #3 GOLD PATCH: only 1 start (debut 1000m), stepping to 1200m, gate 13
                ⚠️ #10 VICTORY CHAMPION: blood in trachea 18/01, passed 06/02 (23 days ago, <30d)
                ⚠️ Two debutants: #6 DAILY ACCLAIM, #7 RISING FROM EAST

───────────────────────────────────────────────────────────
STEP 3: SIMULATION RESULTS
───────────────────────────────────────────────────────────

RAW MC OUTPUT (10,000 iterations):
  # 3 GOLD PATCH     :  25.9% win,  59.3% place
  # 8 GLACIATED      :  25.4% win,  59.2% place
  # 2 FIND MY LOVE   :  12.1% win,  38.8% place
  #14 ALWAYS FLUKE   :  11.9% win,  38.7% place
  #11 WARRIORS DREAM :   7.2% win,  26.0% place
  # 4 MOTOR          :   5.6% win,  22.1% place
  (Remaining 8 horses share ~11.9% win)

Top MC Quinella Combinations:
  3-8: 14.5% (fair odds: $6.9)
  3-14: 7.4% (fair odds: $13.6)
  8-14: 7.3% (fair odds: $13.6)
  2-3: 7.1% (fair odds: $14.1)
  2-8: 6.9% (fair odds: $14.4)

Market Efficiency:
  #10 VICTORY CHAMPION: overvalued by 68% (MC ~5% vs market ~9.1%)
  #3 GOLD PATCH: overvalued by 51% (MC 25.9% vs market ~41.7%)
  #8 GLACIATED: **undervalued by 29%** (MC 25.4% vs market ~11.8%)

STEP 3c — JOCKEY BOOSTS (ST full):
  #3 GOLD PATCH — J McDonald (15.79%, 15-20%): +4% Win, +4% Place
  #4 MOTOR — H Bowman (11.29%, 10-15%): +2% Win, +2% Place
  No other elite/strong jockeys in R4.

STEP 3d — SCMP FORM ADJUSTMENTS:

RACE 4 SCMP DATA:
| # | Horse | SCMP Win | SCMP Pl | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Woo Mention | Running Style |
|---|-------|----------|---------|------------------|----------|----------|-----------|-------------|---------------|
| 1 | ALSONSO | 16 | 5.7 | mixed (3rd ×2, 5th, then 3× fail, heart irregularity, retries 1200m, 3★) | -perf (no excuse, disappointing) | clear | — | not mentioned | Handy |
| 2 | FIND MY LOVE | 9.6 | 3.6 | +form (2nd HV, OK in C3, 4th at C4 level caught behind leader, 4★) | — | clear | — | **"each-way claims"** | Midfield |
| 3 | GOLD PATCH | 2.4 | 1.6 | +form (debut winner at $1.5 over 1000m, bred for 1200m, 3★) | — | clear | — | not mentioned | Front/Pace |
| 4 | MOTOR | 20 | 6.9 | mixed (won restricted + 3rd, 2× 1400m defeats, 7th from G11, 3★) | minor (bumped on jumping) | clear | — | not mentioned | Stalker |
| 5 | BEST FARM | 34 | 5.0 | mixed (fading 11th debut, tries 1200m, 1★) | minor (improved into narrow run, contact) | clear | — | not mentioned | Close |
| 6 | DAILY ACCLAIM | 18 | 4.1 | +breeding (dam Listed placed 800m, 6 winners from 6, 3★) | — | clear | — | not mentioned | Debut/Unknown |
| 7 | RISING FROM EAST | 41 | 10 | mixed (dam half-sister to sprint winner, half-bro won 2100m+, poor trials, 2★) | — | clear | — | not mentioned | Debut/Unknown |
| 8 | GLACIATED | 8.5 | 2.2 | +form (placed both dirt 1200m, turf 1200m win box-seat, 3rd after gear change, 3★) | +excuses (slow start, raced wide without cover from 600M) | clear | — | **"drawn to get every chance"** from G3 | Stalker/Box-seat |
| 9 | PRECISION HOPE | 40 | 9.1 | -form (9th, 8th, disappointed for run, nothing at 1400m, 2★) | minor (jumped fairly, bumped, shifted across) | clear | **+trial** ("dashed smartly, looked improved") | not mentioned | Midfield |
| 10 | VICTORY CHAMPION | 11 | 2.1 | +form (2nd + 3rd at C&D, 4★) | +excuses (caught outside, elected to follow) | **-vet** (blood trachea 18/01, passed 06/02, **23d <30d**) | — | **"should map well from gate two"** | Rally/Midfield |
| 11 | WARRIORS DREAM | 7.8 | 2.7 | mixed (5th ×2, 3rd C&D, pestered 6th, 3★) | +excuses (bumped on jumping, bumped ×3) | clear | — | **"place claims"** | Midfield/Handy |
| 12 | YOUNG LEGACY | 33 | 9.0 | -form (only beat a couple debut, non-factor + never figured, 2★) | minor (jumped awkwardly) | clear | — | not mentioned | Mid/Rear |
| 13 | SUPER MASTERMIND | 56 | 12 | -form (0/4, never made impression, 1★) | minor (shifted, bumped, unbalanced) | clear | — | not mentioned | Unknown |
| 14 | ALWAYS FLUKE | 14 | 3.2 | +form (lame March, resumed 2nd C5, 3rd higher grade 1400m, improving, 3★) | minor (jumped fairly) | clear (lame was March 2025, >11 months ago) | — | not mentioned | Midfield |

PHILIP WOO'S FORMLINE SUMMARY:
- #2 FIND MY LOVE: **"Has each-way claims."** Hit the line well for 4th on return to the Valley 1,200m.
- #10 VICTORY CHAMPION: **"Had an excuse (blood in trachea) but was rallying 2nd and 3rd in two other C&D runs. Should map well from gate two."** Clear Woo pick despite vet flag.
- #8 GLACIATED: **"Returned to form... drawn to get every chance."** Close 3rd after gear change despite gate 12 last time.
- #11 WARRIORS DREAM: **"Has place claims."** C&D 3rd to Majestic Valour, then pestered-in-front 6th.

ADJUSTMENTS APPLIED:
| # | Horse | MC Win% | MC Place% | Jockey | SCMP Adj (Win) | SCMP Adj (Place) | Adj Win% | Adj Place% |
|---|-------|---------|-----------|--------|----------------|-----------------|----------|------------|
| 8 | GLACIATED | 25.4% | 59.2% | — | +1% (form: C&D win + 3rd), +2% (excuses: slow start, wide), +1% (draw G3), +1% (Woo: "every chance") = +5% | +5% | **30.4%** | **64.2%** |
| 3 | GOLD PATCH | 25.9% | 59.3% | **+4% McDonald** | +1% (form: debut winner), -2% (gate 13), -1% (weight rise, only 3★) = -2% | -2% | **27.9%** | **61.3%** |
| 2 | FIND MY LOVE | 12.1% | 38.8% | — | +1% (form: 4★, 2nd + 4th), +1% (Woo: "each-way claims") = +2% | +2% | **14.1%** | **40.8%** |
| 14 | ALWAYS FLUKE | 11.9% | 38.7% | — | +1% (form: improving 2nd+3rd), -1% (gate 12) = 0% | 0% | **11.9%** | **38.7%** |
| 11 | WARRIORS DREAM | 7.2% | 26.0% | — | +1% (form: 3rd C&D), +1% (excuses: bumped ×3), +1% (Woo: "place claims") = +3% | +3% | **10.2%** | **29.0%** |
| 4 | MOTOR | 5.6% | 22.1% | **+2% Bowman** | +1% (form: won + 3rd), -2% (gate 14) = -1% | -1% | **6.6%** | **23.1%** |
| 10 | VICTORY CHAMPION | ~5% | ~20% | — | +1% (form 4★ C&D), +1% (draw G2), +1% (Woo: "map well"), -3% (vet blood trachea 23d) = 0% | -1% | **~5%** | **~19%** |
| 1 | ALSONSO | ~2% | ~8% | — | -2% (disappointing no excuse) = -2% | -2% | **~0%** | **~6%** |
| 6 | DAILY ACCLAIM | ~1% | ~5% | — | +1% (breeding) = +1% | +1% | **~2%** | **~6%** |
| 9 | PRECISION HOPE | ~1% | ~5% | — | +2% (trial: "dashed smartly") = +2% | +2% | **~3%** | **~7%** |

Cap check: All adjustments within ±8% Win, ±10% Place. No horse exceeds 50% Win or 85% Place. ✅

───────────────────────────────────────────────────────────
STEP 4: HORSE RANKINGS (sorted by Adj Win%)
───────────────────────────────────────────────────────────
| Rank | # | Horse | MC Win% | Adj Win% | MC Place% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|----------|-----------|------------|------|--------|------|-------|------------|------|
| 1 | 8 | GLACIATED | 25.4% | 30.4% | 59.2% | 64.2% | 8.5 | C.Y. Ho | **3** | Stalk | +form (C&D win + 3rd), +excuses, +draw G3, +Woo | ★ 膽 (Banker) |
| 2 | 3 | GOLD PATCH | 25.9% | 27.9% | 59.3% | 61.3% | **2.4** | **McDonald** | 13 | Front | +McDonald +4%, +debut winner, -gate 13, 3★ | 腳 (Leg) |
| 3 | 2 | FIND MY LOVE | 12.1% | 14.1% | 38.8% | 40.8% | 9.6 | McMonagle | 9 | Mid | +form 4★, +Woo: "each-way claims" | 腳 (Leg) |
| 4 | 14 | ALWAYS FLUKE | 11.9% | 11.9% | 38.7% | 38.7% | 14 | Bentley | 12 | Mid | +form (improving 2nd+3rd), -gate 12 | 腳 (Leg) |
| 5 | 11 | WARRIORS DREAM | 7.2% | 10.2% | 26.0% | 29.0% | 7.8 | Hewitson | 6 | Mid/Handy | +form (3rd C&D), +excuses, +Woo: "place claims" | 腳 (Leg) |
| 6 | 4 | MOTOR | 5.6% | 6.6% | 22.1% | 23.1% | 20 | **Bowman** | 14 | Stalk | +Bowman +2%, +form (won), **-gate 14** | 腳 (Leg) |
| — | 10 | VICTORY CHAMPION | ~5% | ~5% | ~20% | ~19% | 11 | K.C. Leung | **2** | Rally | +form 4★ C&D, +draw G2, +Woo, **-vet blood <30d** | (reserve) |
| — | 9 | PRECISION HOPE | ~1% | ~3% | ~5% | ~7% | 40 | Avdulla | 11 | Mid | +trial ("dashed smartly") | (excluded) |
| — | 6 | DAILY ACCLAIM | ~1% | ~2% | ~5% | ~6% | 18 | Badel | 8 | Debut | Fownes, +breeding, debut | (excluded) |

CLASSIFICATION: **Competitive** (top horse #8 Adj Win% 30.4%, between 20-35%) → **Mode B (Standard Pool)**

Pool inclusion check (Adj Place% ≥ 20% → MUST include):
  ✅ #8 (64.2%) ✅ #3 (61.3%) ✅ #2 (40.8%) ✅ #14 (38.7%)
  ✅ #11 (29.0%) ✅ #4 (23.1%)

6 horses pass the ≥20% threshold → clean Mode B (Standard Pool, 6 horses).

Rule 2 check (market odds ≤ 15, cannot hard-exclude):
  #10 VICTORY CHAMPION (11 odds) — reserve, Adj Place% ~19% (just misses 20% threshold due to vet flag)

雙膽拖 check: #3 (2nd-ranked) Adj Place% 61.3% < 63% → NO → single banker only.

Reasoning:
#8 GLACIATED edges #3 GOLD PATCH as the top-ranked horse after SCMP adjustments. The MC rates them virtually equal (25.4% vs 25.9% raw), but #8 benefits from strong SCMP tailwinds: (1) gate 3 is ideal at ST 1200m vs #3's gate 13, (2) legitimate excuses last start (slow to begin, wide without cover from the 600M), (3) Woo endorsement ("drawn to get every chance"), and (4) returns to the surface and trip of his box-seat win in December. After adjustments, #8 leads at 30.4% Adj Win% vs #3 at 27.9%.

#3 GOLD PATCH is the overwhelming market favourite at 2.4 odds (41.7% implied). His debut win at $1.5 over the straight 1000m was authoritative — he "just held on" leading 350m out. McDonald (+4% boost) is a significant jockey upgrade. However, gate 13 at ST 1200m "B+2" is a major handicap: he'll need to use energy to cross or go wide. The weight rise (135lb) and step up from 1000m to 1200m are untested. Despite the market's confidence, the MC and SCMP adjustments temper his rating.

#2 FIND MY LOVE is the class horse — a 7yo dropping from C3 to C4. His 4th last start was genuine ("caught behind the tiring leader"). Woo: "each-way claims." From gate 9, McMonagle can position him midfield and let him close.

#14 ALWAYS FLUKE is improving — 2nd (C5) then 3rd (higher grade). The March 2025 lameness is >11 months ago, so no vet penalty. Gate 12 is a concern but at 14 odds the market sees a genuine chance.

#11 WARRIORS DREAM has the best C&D form from the lower-ranked contenders: a 3rd to Majestic Valour at this course. Woo: "has place claims." Gate 6 is comfortable, and Hewitson is capable of getting a handy position.

#4 MOTOR has a win (restricted) + 3rd on his resume and gets the Bowman +2% boost, but gate 14 at ST 1200m is the worst possible draw. SCMP: "Gate won't help." He's the most vulnerable leg in the pool.

#10 VICTORY CHAMPION is the most agonizing omission. SCMP 4★, 2nd + 3rd at C&D, Woo endorsement ("should map well from gate two"), and the ideal draw (gate 2). However, the vet flag (blood in trachea, passed only 23 days ago) triggers -3% Win/-4% Place, pulling his Adj Place% to ~19% — just below the 20% mandatory threshold. At 11 odds (Rule 2: ≤15), he cannot be hard-excluded and is the primary reserve.

Pace scenario: ST 1200m "B+2" — typically speed-biased. #3 GOLD PATCH from gate 13 will need to show speed to get across. If he leads, the pace will be fast (he won by leading at 1000m). #8 from gate 3 can sit box-seat, ideally behind #3 if the pace is quick. If the tempo is hot, closers #2, #14, #11 benefit. If it's moderate and #8/#3 control, on-pacers hold their positions.

The gate bias at ST 1200m strongly favours inside draws (1-5). Gates 12-14 are significantly disadvantaged. This penalises #3, #14, and #4.

───────────────────────────────────────────────────────────
MC-MARKET DIVERGENCE (Notable)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | Adj Win% | Market Implied | Divergence | Direction |
|---|-------|---------|----------|---------------|------------|-----------|
| 8 | GLACIATED | 25.4% | 30.4% | 11.8% (8.5 odds) | **+18.6pp** | MC MUCH HIGHER |
| 3 | GOLD PATCH | 25.9% | 27.9% | 41.7% (2.4 odds) | **-13.8pp** | MARKET MUCH HIGHER |
| 2 | FIND MY LOVE | 12.1% | 14.1% | 10.4% (9.6 odds) | +3.7pp | Aligned |
| 14 | ALWAYS FLUKE | 11.9% | 11.9% | 7.1% (14 odds) | +4.8pp | MC slightly higher |
| 11 | WARRIORS DREAM | 7.2% | 10.2% | 12.8% (7.8 odds) | -2.6pp | Aligned |
| 10 | VICTORY CHAMPION | ~5% | ~5% | 9.1% (11 odds) | -4.1pp | Market higher (vet) |

#8 GLACIATED vs #3 GOLD PATCH is the race's central debate. The MC ranks them equal (~26%), but after adjustments #8 leads due to draw advantage. The market massively favours #3 (2.4 vs 8.5 odds). This divergence is driven by:
- Market trusts the $1.5 debut win quality more than the MC
- Market discounts #8's win (lower class, box seat) relative to #3's debut dominance
- Gate 13 concerns are priced in but not enough per the MC/SCMP analysis

QP cross-reference:
  QP(3,8) = 3.0 → market's strongest pair (expected top 2)
  QP(3,10) = 4.2 → #3 + #10 strong (market respects #10 despite vet)
  QP(3,11) = 5.1 → #3 + #11 moderate
  QP(3,14) = 5.1 → #3 + #14 moderate

───────────────────────────────────────────────────────────
TRIO POOL (any order)
───────────────────────────────────────────────────────────
POOL: #8, #3, #2, #14, #11, #4
MODE: B (Standard Pool) | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #8 GLACIATED (Adj Win% 30.4%, Adj Place% 64.2%) ← locked in every combo
腳 (Legs):  #3, #2, #14, #11, #4
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10

TOP TRIO COMBINATIONS (by combined Adj Place%):
| Rank | Horses (any order) | Combined Place% | QP Cross-Ref |
|------|-------------------|-----------------|--------------|
| 1 | #8, #3, #2 | 166.3% | QP 3-8: 3.0, QP 2-3: ~7.5 |
| 2 | #8, #3, #14 | 164.2% | QP 3-8: 3.0, QP 3-14: 5.1 |
| 3 | #8, #2, #14 | 143.7% | QP 2-8: ~11, QP 2-14: ~20 |
| 4 | #8, #3, #11 | 154.5% | QP 3-8: 3.0, QP 3-11: 5.1 |
| 5 | #8, #3, #4 | 148.6% | QP 3-8: 3.0, QP 3-4: ~58 |

───────────────────────────────────────────────────────────
TICKET SUMMARY
───────────────────────────────────────────────────────────
COMBINATIONS: 10 (膽拖: C(5,2) where 5 = legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

HKJC BET SLIP:

單T 膽拖
膽: 8
腳: 2, 3, 4, 11, 14
$10 × 10 combos = $100

PASS CONDITIONS:
- If #8 GLACIATED is scratched → VOID ticket
- If #3 GOLD PATCH is scratched → consider adding #10 VICTORY CHAMPION as replacement leg
- If field drops below 3 → pool refunded
- If going changes to Heavy → benefits closers (#2, #14, #11); penalises front-runners. #3 from gate 13 on heavy going would be severely disadvantaged.

CONFIDENCE: **MEDIUM**

PLAY / PASS: **PLAY**

CAVEATS:
1. **Banker at 8.5 odds (not the market favourite)** — #8 GLACIATED is the model's top pick but #3 GOLD PATCH is the overwhelming market favourite (2.4 odds). If the market is right that Gold Patch's debut quality is superior, and gate 13 isn't a fatal handicap, the banker may not be in the frame. This is another contrarian, model-driven play.
2. **#3 GOLD PATCH gate 13 at ST 1200m** — the shortest distance amplifies gate disadvantage. McDonald will need to use energy crossing or go wide. If the pace is fast and he has to chase from 13, he's vulnerable. But his debut speed suggests he can overcome it.
3. **#10 VICTORY CHAMPION omission** — 4★ SCMP, Woo endorsement, gate 2, C&D form. Only the blood-in-trachea vet flag (<30 days) keeps him out. If he runs well, this is a near-miss. At 11 odds, he's the main pool threat.
4. **Three wide-drawn legs** — #3 (G13), #14 (G12), #4 (G14) are all drawn extremely wide. In a race where gate bias heavily favours inside, this is a structural risk. If inside horses dominate, the pool relies on #8 + #11 + #2 to fill the frame.
5. **Two debutants (#6, #7) outside pool** — #6 DAILY ACCLAIM (Fownes/Badel, 18 odds) and #7 RISING FROM EAST (41 odds) are unknown quantities. #6 has decent breeding and a top trainer. Debutants are always volatile.
6. **MC didn't output full Win/Place% for horses outside top 6** — #10, #1, and debutants use estimated MC base.
═══════════════════════════════════════════════════════════
