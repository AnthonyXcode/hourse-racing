# Trio Review — Strategy B (StratC) | Sha Tin | 17 May 2026

## Rules (Strategy B)
- **Banker**: MC rank #1 (highest raw MC Win%) — no debutant exception
- **Primary legs**: next 5 horses by MC Win% (total 6-horse pool)
- **Structure**: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos
- **Stake**: $10/combo × 10 = **$100 per race**
- **Races**: **All races** (no PASS)
- **Source**: Raw MC Win% from `simulation_summaries_20260517_ST.md`

---

## Summary

| Metric | Strategy B | Strategy A |
|--------|-----------|-----------|
| Races | 11 | 11 |
| Hits | 1/11 (9.1%) | 1/11 (9.1%) |
| Staked | $1,100 | $620 |
| Returned | $456 | $456 |
| **Net P&L** | **−$644** | **−$164** |
| **ROI** | **−58.5%** | **−26.5%** |
| Banker top 3 | 2/11 (18.2%) | 4/11 (36.4%) |

---

## Strategy B: Race-by-Race Results

| Race | Class | Dist | Surf | Banker (MC#1) | Pool (Top 6 by MC Win%) | Combos | Stake | Result (1→2→3) | Banker Top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|------|---------------|------------------------|--------|-------|----------------|--------------|------|--------|--------|-----|
| R1 | C5 | 1800m | AWT | #5 FAMILY FORTUNE (40.4%) | 5,1,9,6,8,7 | 10 | $100 | 6→**10**→7 | ❌ (4th) | MISS ❌ | $3,994 | $0 | −$100 |
| R2 | C4 | 1000m | Turf | #1 RUN RUN SUNRISE (37.9%) | 1,5,2,3,12,8 | 10 | $100 | **14**→**10**→**4** | ❌ (10th) | MISS ❌ | $619 | $0 | −$100 |
| R3 | C5 | 1200m | Turf | #4 MAJESTIC DELIGHT (32.3%) | 4,10,1,11,5,9 | 10 | $100 | **3**→11→5 | ❌ (5th) | MISS ❌ | $3,667 | $0 | −$100 |
| R4 | C4 | 1200m | Turf | #1 PAPAYA BROSE (46.1%) | 1,2,8,5,11,7 | 10 | $100 | 11→**10**→8 | ❌ (4th) | MISS ❌ | $376 | $0 | −$100 |
| R5 | C4 | 1200m | Turf | #7 SUPERB SPIRIT (42.4%) | 7,2,4,3,10,9 | 10 | $100 | 7→3→2 | ✅ (1st) | **HIT ✅** | $456 | $456 | +$356 |
| R6 | C3 | 1200m | Turf | #2 CELESTIAL HERO (40.0%) | 2,3,7,1,5,10 | 10 | $100 | 10→**11**→2 | ✅ (3rd) | MISS ❌ | $1,271 | $0 | −$100 |
| R7 | C4 | 1400m | Turf | #2 FORZA TORO (43.3%) | 2,3,4,1,12,9 | 10 | $100 | 1→4→3 | ❌ (5th) | MISS ❌ | $257 | $0 | −$100 |
| R8 | C4 | 1800m | Turf | #4 VERMILION TEMPEST (60.7%) | 4,5,14,8,6,9 | 10 | $100 | 14→**7**→5 | ❌ (11th) | MISS ❌ | $1,004 | $0 | −$100 |
| R9 | C4 | 1400m | Turf | #10 VOYAGE BOSS (24.5%) | 10,8,11,4,12,2 | 10 | $100 | **5**→**13**→**7** | ❌ (8th) | MISS ❌ | $2,066 | $0 | −$100 |
| R10 | C3 | 1400m | Turf | #2 WINDLORD (23.4%) | 2,1,3,8,6,10 | 10 | $100 | 10→8→6 | ❌ (7th) | MISS ❌ | $191 | $0 | −$100 |
| R11 | C3 | 1400m | Turf | #8 HAPPY BOSS (44.2%) | 8,2,1,3,4,7 | 10 | $100 | 3→7→2 | ❌ (9th) | MISS ❌ | $1,150 | $0 | −$100 |

**Bold** = horse not in 6-horse pool

---

## Strategy A: Race-by-Race Results (for comparison)

| Race | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|--------|-------|--------|------|--------|--------|-----|-------------|
| R1 | C5 1800m | A (1膽+4腳) | #5 FAMILY FORTUNE | #1,#9,#6,#8 | 6 | $60 | 6→**10**→**7** | MISS ❌ | $3,994 | $0 | −$60 | Banker fail (#5 4th) + pool gaps #10, #7 |
| R2 | C4 1000m | A (1膽+4腳) | #1 RUN RUN SUNRISE | #5,#2,#3,#8 | 6 | $60 | **14**→**10**→**4** | MISS ❌ | $619 | $0 | −$60 | Banker fail (#1 10th) + all 3 outside pool |
| R3 | C5 1200m | B (1膽+5腳) | #4 MAJESTIC DELIGHT | #10,#1,#11,#5,#9 | 10 | $100 | **3**→11→5 | MISS ❌ | $3,667 | $0 | −$100 | Banker fail (#4 5th) + pool gap #3 |
| R4 | C4 1200m | 雙膽A (2膽+3腳) | #1 PAPAYA BROSE + #2 A TIME FOR US | #8,#5,#10 | 3 | $30 | **11**→10→8 | MISS ❌ | $376 | $0 | −$30 | Both bankers fail (#1 4th, #2 8th) + gap #11 |
| R5 | C4 1200m | A (1膽+4腳) | #2 ISLAND BUDDY | #7,#4,#3,#10 | 6 | $60 | 7→3→2 | **HIT ✅** | $456 | $456 | +$396 | — |
| R6 | C3 1200m | 雙膽A (2膽+3腳) | #2 CELESTIAL HERO + #3 LIFELINE EXPRESS | #7,#1,#10,#4 | 3 | $30 | 10→**11**→2 | MISS ❌ | $1,271 | $0 | −$30 | B2 #3 fail (5th) + pool gap #11 |
| R7 | C4 1400m | 雙膽A (2膽+3腳) | #2 FORZA TORO + #3 MASTER LUCKY | #4,#1,#12 | 3 | $30 | 1→4→3 | MISS ❌ | $257 | $0 | −$30 | **B1 #2 fail (5th), all 3 in pool!** |
| R8 | C4 1800m | A→B (1膽+5腳) | #4 VERMILION TEMPEST | #5,#14,#8,#9,#13 | 10 | $100 | 14→**7**→5 | MISS ❌ | $1,004 | $0 | −$100 | Banker fail (#4 **11th**!) + pool gap #7 |
| R9 | C4 1400m | B (1膽+4腳) | #10 VOYAGE BOSS | #8,#11,#4,#12 | 6 | $60 | **5**→**13**→**7** | MISS ❌ | $2,066 | $0 | −$60 | Banker fail (#10 8th) + all 3 outside pool |
| R10 | C3 1400m | B (1膽+4腳) | #2 WINDLORD | #1,#3,#8,#6 | 6 | $60 | **10**→8→6 | MISS ❌ | $191 | $0 | −$60 | Banker fail (#2 7th) + pool gap #10 |
| R11 | C3 1400m | 雙膽A (2膽+3腳) | #8 HAPPY BOSS + #2 AEROVOLANIC | #1,#3,#4 | 3 | $30 | 3→**7**→2 | MISS ❌ | $1,150 | $0 | −$30 | B1 #8 fail (9th) + pool gap #7 |

---

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| A: Banker fail — all 3 in pool | 3 | R7, R10, R11 |
| B: Banker hit — pool gap | 1 | R6 |
| C: Banker fail + pool gap | 6 | R1, R2, R3, R4, R8, R9 |

### Pattern A — Banker fail, all 3 placers already in legs (3 races, $1,598 missed)

**R7** — Result: RUN RUN SMART(#1) → SOLID CAR(#4) → MASTER LUCKY(#3) — all three in B's pool {2,3,4,1,12,9}. Banker **FORZA TORO** (#2, MC 43.3%, SP 1.6 overwhelming favourite) finished **5th** on Yielding going. Trio paid $257. This was the most actionable miss: if any other pool horse had been banker, B hits cleanly.

**R10** — Result: PERFECTDAY(#10) → CHILL EASY(#8) → THE UNIQUE STAR(#6) — all three in B's pool {2,1,3,8,6,10}. Banker **WINDLORD** (#2, MC 23.4%, SP 7.3) collapsed to 7th. Trio paid $191. On a tight competitive field (MC top 5 separated by only 13.2 pp), the banker was the most marginal MC #1 of the meeting.

**R11** — Result: BRILLIANT EXPRESS(#3) → ALL'S WELL(#7) → AEROVOLANIC(#2) — all three in B's pool {8,2,1,3,4,7}. Banker **HAPPY BOSS** (#8, MC 44.2%, SP 2.3 short favourite) finished **9th** — a catastrophic failure for a dominant MC call at short odds. Trio paid $1,150. This was the meeting's most frustrating Pattern A miss: all three placers covered, $1,150 sitting right there, but the strongest single-race MC call folded on Yielding turf.

**Combined Pattern A missed return: $257 + $191 + $1,150 = $1,598.** Had B used a no-banker box on top 6 instead of 膽拖, all three would have hit — at a cost of C(6,3)=20 combos ($200/race vs $100/race). The extra $300 stake (3 races × $100) would have yielded +$1,298 net.

### Pattern B — Banker hit, pool gap (1 race, $1,271 missed)

**R6** — Banker **CELESTIAL HERO** (#2, MC 40.0%, SP 2.2) placed **3rd** ✅. Pool had 5 of 6 correct: #10 THUNDER KIT won (L5 ✓), #2 placed 3rd (★ ✓). But **CHICKEN DINNER** (#11, rank 11 out of 12, MC **0.1%** Win, SP 84) ran 2nd at 84-1 — a complete MC blind spot. No rational pool expansion would include a horse at 0.1% MC Win. Structurally unfixable.

### Pattern C — Banker fail + pool gap (6 races)

| Race | Banker | Banker Finish | Pool Gap(s) | Trio $ |
|------|--------|---------------|-------------|--------|
| R1 | #5 FAMILY FORTUNE (SP 2.3) | 4th | #10 ROSEWOOD FLEETFOOT (SP 4.7) | $3,994 |
| R2 | #1 RUN RUN SUNRISE (SP 8.3) | 10th | #14 LAHORE, #10 BUSTLING CITY, #4 COUNTRY PRIDE | $619 |
| R3 | #4 MAJESTIC DELIGHT (SP 4.5) | 5th | #3 ENJOY GOLF (SP 62) | $3,667 |
| R4 | #1 PAPAYA BROSE (SP 2.7) | 4th | #10 BETTER AND BETTER (SP 17) | $376 |
| R8 | #4 VERMILION TEMPEST (SP 6.7) | **11th** | #7 SUPER GOLDENDRAGON (SP 38) | $1,004 |
| R9 | #10 VOYAGE BOSS (SP 14) | 8th | #5 MEANINGFUL DRAGON, #13 QUICK CONTRIBUTION, #7 PROUD BOX | $2,066 |

Pattern C dominated the losses. R8's banker failure was the most severe: VERMILION TEMPEST at **60.7% MC Win** — the meeting's most dominant simulation pick — finished **11th of 14** on Yielding going. R2 and R9 were total wipeouts with all 3 placers outside the pool.

---

## Full MC Place% Table — Per Race

*SP = starting price. MC Win%/Place% from 10k iteration strategy report. **★** = banker (MC #1); **L1…L5** = legs ranked by MC Win% descending; **—** = non-pool starters.*

---

### R1 — C5 | 1800m AWT | Good to Yielding | Actual: 6→10→7 ❌

**Ticket:** ★ **#5** + legs **#1 → #9 → #6 → #8 → #7** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 5 | FAMILY FORTUNE | 40.4% | 77.6% | 2.3 | ✅ | ★ Banker | 4th (SP 2.3) |
| L1 | 1 | HAILTOTHEVICTORS | 17.0% | 54.6% | 6.5 | ✅ | Leg | 10th (SP 6.5) |
| L2 | 9 | PERFECT PAIRING | 14.3% | 49.5% | 7.5 | ✅ | Leg | 8th (SP 7.5) |
| L3 | 6 | ON THE LASH | 12.9% | 44.6% | 5.3 | ✅ | Leg | **1st** (SP 5.3) |
| L4 | 8 | ALL ARE MINE | 11.6% | 44.2% | 31 | ✅ | Leg | 6th (SP 31) |
| L5 | 7 | SUPER HONG KONG | 1.6% | 12.3% | 55 | ✅ | Leg | **3rd** (SP 55) |
| — | 10 | ROSEWOOD FLEETFOOT | 1.4% | 9.5% | 4.7 | ❌ | — | **2nd** (SP 4.7) |
| — | 13 | GOLD TACK | 0.5% | 3.9% | — | ❌ | — | 13th |
| — | 12 | RUN YES RUN | 0.1% | 1.8% | — | ❌ | — | 14th |
| — | 2 | KOLACHI | 0.0% | 0.9% | — | ❌ | — | 11th |
| — | 3 | MATSU VICTOR | 0.0% | 0.6% | — | ❌ | — | 7th |
| — | 11 | SMART BEAUTY | 0.0% | 0.3% | — | ❌ | — | 5th |
| — | 4 | SPECIAL HEDGE | 0.0% | 0.0% | — | ❌ | — | 12th |
| — | 14 | CHATEAU LE PECHE | 0.0% | 0.2% | — | ❌ | — | 9th |

**Pattern C** — Banker **FAMILY FORTUNE** (MC 40.4%, SP 2.3 favourite) ran 4th — one spot off the Trio frame. Leg **ON THE LASH** (L3 ✓) won and **SUPER HONG KONG** (L5 ✓, SP 55) placed 3rd. But **ROSEWOOD FLEETFOOT** (#10, rank 7, MC 1.4%, SP 4.7) ran 2nd — just one MC position below the 6-horse cap. The AWT surface mismatch (simulation ran as Turf) may have contributed to the model error. Had the banker placed, B needed #10 in pool regardless.

---

### R2 — C4 | 1000m Turf | Good to Yielding | Actual: 14→10→4 ❌

**Ticket:** ★ **#1** + legs **#5 → #2 → #3 → #12 → #8** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | RUN RUN SUNRISE | 37.9% | 76.6% | 8.3 | ✅ | ★ Banker | 10th (SP 8.3) |
| L1 | 5 | DAY DAY VICTORY | 20.8% | 57.9% | 4.2 | ✅ | Leg | 8th (SP 4.2) |
| L2 | 2 | MABUBU | 20.6% | 56.7% | 3.1 | ✅ | Leg | 4th (SP 3.1) |
| L3 | 3 | CLOUD NINE | 10.8% | 42.9% | 13 | ✅ | Leg | 12th (SP 13) |
| L4 | 12 | ZOUPER FELLOW | 3.2% | 16.7% | 38 | ✅ | Leg | 6th (SP 38) |
| L5 | 8 | KINGDOM | 2.6% | 14.9% | 26 | ✅ | Leg | 13th (SP 26) |
| — | 14 | LAHORE | 1.2% | 9.3% | 8.5 | ❌ | — | **1st** (SP 8.5) |
| — | 13 | COMET RADIANCE | 1.1% | 8.0% | — | ❌ | — | 11th |
| — | 10 | BUSTLING CITY | 0.7% | 5.1% | 51 | ❌ | — | **2nd** (SP 51) |
| — | 11 | PRECISION MIND | 0.6% | 4.5% | — | ❌ | — | 9th |
| — | 7 | HERO RISING | 0.4% | 2.7% | — | ❌ | — | 5th |
| — | 4 | COUNTRY PRIDE | 0.2% | 3.3% | 223 | ❌ | — | **3rd** (SP 223) |
| — | 6 | FLOWING | 0.0% | 1.3% | — | ❌ | — | 14th |
| — | 9 | RUBY THRIVE | 0.0% | 0.3% | — | ❌ | — | 7th |

**Pattern C (Catastrophic)** — Total collapse. Banker **RUN RUN SUNRISE** (MC 37.9%, SP 8.3) ran 10th. All three placers — **LAHORE** (rank 7, MC 1.2%, SP 8.5 with Purton), **BUSTLING CITY** (rank 9, MC 0.7%, SP 51), and **COUNTRY PRIDE** (rank 12, MC 0.2%, SP 223) — sat outside the pool. The winner LAHORE was Purton-ridden at a reasonable SP; the 2nd and 3rd were total longshots at 51 and 223. No pool expansion could have anticipated this result.

---

### R3 — C5 | 1200m Turf | Good to Yielding | Actual: 3→11→5 ❌

**Ticket:** ★ **#4** + legs **#10 → #1 → #11 → #5 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 4 | MAJESTIC DELIGHT | 32.3% | 66.3% | 4.5 | ✅ | ★ Banker | 5th (SP 4.5) |
| L1 | 10 | HAPPY BOYS | 23.9% | 58.1% | 5.1 | ✅ | Leg | 11th (SP 5.1) |
| L2 | 1 | ALWAYS FLUKE | 11.3% | 37.0% | 12 | ✅ | Leg | 6th (SP 12) |
| L3 | 11 | DOUBLE BINGO | 7.4% | 27.5% | 17 | ✅ | Leg | **2nd** (SP 17) |
| L4 | 5 | NO OTHER CHOICE | 6.1% | 25.6% | 12 | ✅ | Leg | **3rd** (SP 12) |
| L5 | 9 | TRIUMPHANT WARRIOR | 6.0% | 23.0% | 15 | ✅ | Leg | 8th (SP 15) |
| — | 7 | CALL TO COMMAND | 4.8% | 20.8% | 13 | ❌ | — | 4th (SP 13) |
| — | 12 | TURF PHOENIX | 3.9% | 17.1% | — | ❌ | — | 12th |
| — | 6 | BLUE BARON | 2.4% | 12.6% | — | ❌ | — | 7th |
| — | 8 | DASH | 2.1% | 11.5% | — | ❌ | — | 10th |
| — | 3 | ENJOY GOLF | 0.0% | 0.3% | 62 | ❌ | — | **1st** (SP 62) |
| — | 2 | RUBY SAILING | 0.0% | 0.1% | — | ❌ | — | 9th |

**Pattern C** — Banker **MAJESTIC DELIGHT** (MC 32.3%, SP 4.5) ran 5th — close but outside the frame. Legs **DOUBLE BINGO** (L3 ✓) and **NO OTHER CHOICE** (L4 ✓) placed 2nd/3rd. But **ENJOY GOLF** (#3, rank 11 of 12, MC **0.0%** Win, SP 62) won at 62-1 — a total MC blind spot. The 6-horse pool had two of three placers; only the freak winner was missing. Had the banker placed, B still misses due to the #3 gap.

---

### R4 — C4 | 1200m Turf | Good to Yielding | Actual: 11→10→8 ❌

**Ticket:** ★ **#1** + legs **#2 → #8 → #5 → #11 → #7** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | PAPAYA BROSE | 46.1% | 84.9% | 2.7 | ✅ | ★ Banker | 4th (SP 2.7) |
| L1 | 2 | A TIME FOR US | 29.3% | 72.9% | 3.1 | ✅ | Leg | 8th (SP 3.1) |
| L2 | 8 | MIGHTY FIGHTER | 10.0% | 45.7% | 3.3 | ✅ | Leg | **3rd** (SP 3.3) |
| L3 | 5 | OLDTOWN | 8.1% | 39.6% | 9.4 | ✅ | Leg | 5th (SP 9.4) |
| L4 | 11 | LITTLE MONSTER | 1.4% | 12.0% | 22 | ✅ | Leg | **1st** (SP 22) |
| L5 | 7 | LIGHTNESS OF BEING | 1.2% | 11.4% | 39 | ✅ | Leg | 9th (SP 39) |
| — | 9 | AMO ERGO SUM | 1.2% | 11.2% | — | ❌ | — | 10th |
| — | 10 | BETTER AND BETTER | 0.7% | 8.2% | 17 | ❌ | — | **2nd** (SP 17) |
| — | 3 | MASSIVE REWARD | 0.4% | 3.4% | — | ❌ | — | 11th |
| — | 12 | VIVA BOSS | 0.4% | 5.2% | — | ❌ | — | 12th |
| — | 4 | NAVAS G | 0.3% | 4.3% | — | ❌ | — | 6th |
| — | 6 | SPEEDY POWER | 0.1% | 1.1% | — | ❌ | — | 7th |

**Pattern C** — Banker **PAPAYA BROSE** (MC 46.1%, SP 2.7 favourite) ran 4th — agonisingly close. **LITTLE MONSTER** (L4 ✓) won at 22-1 and **MIGHTY FIGHTER** (L2 ✓) placed 3rd. But **BETTER AND BETTER** (#10, rank 8, MC 0.7%, SP 17) ran 2nd — two MC positions below the 6-horse cap. The pool covered 2 of 3 placers; the banker failure and #10 gap combined to kill it. Had #10 been in pool AND the banker placed, B hits.

---

### R5 — C4 | 1200m Turf | Good to Yielding | Actual: 7→3→2 ✅ HIT

**Ticket:** ★ **#7** + legs **#2 → #4 → #3 → #10 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 7 | SUPERB SPIRIT | 42.4% | 79.6% | 5.5 | ✅ | ★ Banker | **1st** (SP 5.5) |
| L1 | 2 | ISLAND BUDDY | 25.9% | 66.8% | 37 | ✅ | Leg | **3rd** (SP 37) |
| L2 | 4 | GOLDENTRONIC MIGRATION | 14.0% | 47.9% | 16 | ✅ | Leg | 7th (SP 16) |
| L3 | 3 | LUCRATIVE EIGHT | 5.3% | 27.0% | 5.9 | ✅ | Leg | **2nd** (SP 5.9) |
| L4 | 10 | PHOENIX LIGHT | 5.0% | 24.5% | 20 | ✅ | Leg | 8th (SP 20) |
| L5 | 9 | TURBO JEFFERIES | 2.8% | 17.7% | 73 | ✅ | Leg | 10th (SP 73) |
| — | 5 | INCREDIBLE MOMENT | 2.1% | 13.7% | — | ❌ | — | 5th |
| — | 6 | DANCING BLAZE | 1.1% | 8.3% | 2.1 | ❌ | — | 4th (SP 2.1) |
| — | 11 | SYNERGY EXPRESS | 0.8% | 6.1% | — | ❌ | — | 9th |
| — | 8 | CASA BUDDY | 0.4% | 5.0% | — | ❌ | — | 12th |
| — | 1 | ANODE | 0.2% | 2.0% | — | ❌ | — | 11th |
| — | 12 | HONORARY | 0.1% | 1.3% | — | ❌ | — | 6th |

**HIT ✅** — Banker **SUPERB SPIRIT** (MC 42.4%, SP 5.5) won cleanly. **LUCRATIVE EIGHT** (L3 ✓, SP 5.9) ran 2nd and **ISLAND BUDDY** (L1 ✓, SP **37**) — a massive MC-over-market edge — placed 3rd. All three inside the pool. MC gave #2 ISLAND BUDDY 25.9% Win and 66.8% Place while the market priced it at 37-1; a spectacular vindication of MC modelling. Note: the market favourite **DANCING BLAZE** (#6, SP 2.1) finished only 4th. **Return: $456 on $100 = +$356.**

---

### R6 — C3 | 1200m Turf | Yielding | Actual: 10→11→2 ❌

**Ticket:** ★ **#2** + legs **#3 → #7 → #1 → #5 → #10** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | CELESTIAL HERO | 40.0% | 78.2% | 2.2 | ✅ | ★ Banker | **3rd** (SP 2.2) |
| L1 | 3 | LIFELINE EXPRESS | 25.5% | 65.7% | 7.0 | ✅ | Leg | 5th (SP 7.0) |
| L2 | 7 | PEGAS | 12.5% | 45.1% | 8.3 | ✅ | Leg | 6th (SP 8.3) |
| L3 | 1 | SAVVY BRILLIANT | 10.6% | 41.6% | 4.5 | ✅ | Leg | 9th (SP 4.5) |
| L4 | 5 | BIENVENUE | 5.6% | 28.2% | 17 | ✅ | Leg | 7th (SP 17) |
| L5 | 10 | THUNDER KIT | 2.0% | 12.8% | 18 | ✅ | Leg | **1st** (SP 18) |
| — | 8 | MASTER CHAMPION | 1.6% | 9.5% | 13 | ❌ | — | 4th (SP 13) |
| — | 4 | MEGASTAR HEART | 1.2% | 8.9% | — | ❌ | — | 10th |
| — | 9 | GLORIOUS DYNASTY | 0.7% | 4.4% | — | ❌ | — | 8th |
| — | 6 | KING EQUINE | 0.6% | 4.7% | — | ❌ | — | 11th |
| — | 11 | CHICKEN DINNER | 0.1% | 0.7% | 84 | ❌ | — | **2nd** (SP 84) |
| — | 12 | IRON SECURITY | 0.0% | 0.2% | — | ❌ | — | 12th |

**Pattern B** — Banker **CELESTIAL HERO** placed 3rd ✅ and **THUNDER KIT** (L5 ✓) won at 18-1 — two of three covered. But **CHICKEN DINNER** (#11, rank 11 of 12, MC **0.1%** Win, **0.7%** Place, SP 84) came 2nd at 84-1. This was the most extreme MC blind spot of the meeting: a horse with essentially zero modelled probability finished 2nd. No pool expansion (even to 11 horses) would include a 0.1% MC pick. Structurally unfixable. Going had changed to Yielding, scrambling form lines.

---

### R7 — C4 | 1400m Turf | Yielding | Actual: 1→4→3 ❌

**Ticket:** ★ **#2** + legs **#3 → #4 → #1 → #12 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | FORZA TORO | 43.3% | 79.3% | 1.6 | ✅ | ★ Banker | 5th (SP 1.6) |
| L1 | 3 | MASTER LUCKY | 22.8% | 63.2% | 4.9 | ✅ | Leg | **3rd** (SP 4.9) |
| L2 | 4 | SOLID CAR | 12.7% | 47.2% | 11 | ✅ | Leg | **2nd** (SP 11) |
| L3 | 1 | RUN RUN SMART | 11.4% | 42.8% | 6.5 | ✅ | Leg | **1st** (SP 6.5) |
| L4 | 12 | NINJA DERBY | 4.7% | 24.3% | 16 | ✅ | Leg | 4th (SP 16) |
| L5 | 9 | KING GLORIOSO | 2.3% | 14.5% | 25 | ✅ | Leg | 7th (SP 25) |
| — | 6 | NEXT FORTUNE | 1.2% | 8.5% | — | ❌ | — | 10th |
| — | 7 | SUPERB BOY | 0.6% | 5.9% | — | ❌ | — | 12th |
| — | 8 | SEA DIAMOND | 0.4% | 3.1% | — | ❌ | — | 6th |
| — | 10 | DUKE OF ORANGE | 0.4% | 4.2% | — | ❌ | — | 8th |
| — | 5 | MERLION | 0.3% | 3.9% | — | ❌ | — | 9th |
| — | 11 | MULTISUPERSTAR | 0.2% | 2.1% | — | ❌ | — | 11th |
| — | 13 | AQUAMAN | 0.0% | 0.8% | — | ❌ | — | 14th |
| — | 14 | SUPER MASTERMIND | 0.0% | 0.4% | — | ❌ | — | 13th |

**Pattern A (most actionable B miss)** — All three placers **RUN RUN SMART** (L3 ✓), **SOLID CAR** (L2 ✓), **MASTER LUCKY** (L1 ✓) were inside the pool. The $257 Trio was fully covered — but banker **FORZA TORO** (MC 43.3%, SP **1.6** overwhelming favourite) finished 5th on Yielding going. Had any leg been the banker, B hits. The going changed to Yielding for this race; FORZA TORO may have been compromised on the soft surface. **NINJA DERBY** (#12, L4 ✓) also placed 4th — the entire B top 5 finished 1st–5th (positions 1,2,3,4,5), just with the banker in the wrong slot.

---

### R8 — C4 | 1800m Turf | Yielding | Actual: 14→7→5 ❌

**Ticket:** ★ **#4** + legs **#5 → #14 → #8 → #9 → #6** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 4 | VERMILION TEMPEST | 60.7% | 87.9% | 6.7 | ✅ | ★ Banker | 11th (SP 6.7) |
| L1 | 5 | ABSOLUTE HONOUR | 9.6% | 44.5% | 14 | ✅ | Leg | **3rd** (SP 14) |
| L2 | 14 | ROMANTIC FANTASY | 6.5% | 33.7% | 11 | ✅ | Leg | **1st** (SP 11) |
| L3 | 8 | GRAND TURBO | 6.2% | 29.6% | 25 | ✅ | Leg | 8th (SP 25) |
| L4 | 9 | STAR ELEGANCE | 5.7% | 28.6% | 37 | ✅ | Leg | 12th (SP 37) |
| L5 | 6 | STATE SECURITY | 5.2% | 26.3% | 101 | ✅ | Leg | 13th (SP 101) |
| — | 11 | KYRUS TREASURE | 1.6% | 11.2% | 21 | ❌ | — | 4th (SP 21) |
| — | 10 | STAR BROSE | 1.4% | 11.8% | — | ❌ | — | 9th |
| — | 2 | CHARITY GAIN | 1.3% | 10.4% | — | ❌ | — | 14th |
| — | 7 | SUPER GOLDENDRAGON | 1.2% | 9.7% | 38 | ❌ | — | **2nd** (SP 38) |
| — | 12 | KINGLY DEMEANOR | 0.4% | 4.9% | — | ❌ | — | 6th |
| — | 1 | PACKING FIGHTER | 0.1% | 0.5% | — | ❌ | — | 5th |
| — | 13 | FORTUNE KINGO | 0.0% | 0.6% | — | ❌ | — | 10th |
| — | 3 | FLUORESCENCE | 0.0% | 0.2% | — | ❌ | — | 7th |

**Pattern C (Season's worst model failure)** — Banker **VERMILION TEMPEST** (MC **60.7%** Win — the highest single-race MC conviction of the entire meeting, SP 6.7) collapsed to **11th of 14** on Yielding going. This was the most catastrophic MC failure of the season. Legs **ROMANTIC FANTASY** (L2 ✓) won and **ABSOLUTE HONOUR** (L1 ✓) placed 3rd — 2 of 3 covered. But **SUPER GOLDENDRAGON** (#7, rank 10, MC 1.2%, SP 38) ran 2nd. The banker failure was absolute; even a 7- or 8-horse pool couldn't overcome it.

---

### R9 — C4 | 1400m Turf | Yielding | Actual: 5→13→7 ❌

**Ticket:** ★ **#10** + legs **#8 → #11 → #4 → #12 → #2** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 10 | VOYAGE BOSS | 24.5% | 58.9% | 14 | ✅ | ★ Banker | 8th (SP 14) |
| L1 | 8 | PRESTIGE RICKY | 24.1% | 60.1% | 4.3 | ✅ | Leg | 5th (SP 4.3) |
| L2 | 11 | ACE | 16.7% | 50.2% | 8.3 | ✅ | Leg | 7th (SP 8.3) |
| L3 | 4 | STRATHPEFFER | 15.0% | 43.4% | 3.5 | ✅ | Leg | 4th (SP 3.5) |
| L4 | 12 | STAR FIGURE | 8.5% | 30.8% | 24 | ✅ | Leg | 9th (SP 24) |
| L5 | 2 | BUCEPHALAS | 4.5% | 19.6% | 30 | ✅ | Leg | 10th (SP 30) |
| — | 7 | PROUD BOX | 2.2% | 12.8% | 5.1 | ❌ | — | **3rd** (SP 5.1) |
| — | 6 | HIGH RISE VICTORY | 1.9% | 10.1% | — | ❌ | — | 11th |
| — | 9 | PRESTIGE SUPERIOR | 0.7% | 3.6% | — | ❌ | — | 13th |
| — | 5 | MEANINGFUL DRAGON | 0.6% | 4.1% | 10 | ❌ | — | **1st** (SP 10) |
| — | 13 | QUICK CONTRIBUTION | 0.6% | 3.7% | 17 | ❌ | — | **2nd** (SP 17) |
| — | 14 | SILVER UP | 0.2% | 1.7% | — | ❌ | — | 6th |
| — | 3 | JOLTIN | 0.1% | 0.9% | — | ❌ | — | 12th |
| — | 1 | GRATIFIDE | 0.0% | 0.1% | — | ❌ | — | 14th |

**Pattern C (Total wipeout)** — Banker **VOYAGE BOSS** (MC 24.5%, SP 14) ran 8th. The MC top 5 (horses #10,#8,#11,#4,#12) finished **8th-5th-7th-4th-9th** respectively — the entire MC backbone collapsed on Yielding going. All three placers — **MEANINGFUL DRAGON** (#5, rank 10, MC 0.6%, SP 10), **QUICK CONTRIBUTION** (#13, rank 11, MC 0.6%, SP 17), and **PROUD BOX** (#7, rank 7, MC 2.2%, SP 5.1) — sat outside the pool. The market priced PROUD BOX at 5.1 and MEANINGFUL DRAGON at 10; MC buried them at 12.8% and 4.1% Place respectively. This was the meeting's worst B miss in terms of MC-market divergence.

---

### R10 — C3 | 1400m Turf | Yielding | Actual: 10→8→6 ❌

**Ticket:** ★ **#2** + legs **#1 → #3 → #8 → #6 → #10** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | WINDLORD | 23.4% | 52.2% | 7.3 | ✅ | ★ Banker | 7th (SP 7.3) |
| L1 | 1 | MAKE YOU SMILE | 20.1% | 47.5% | 5.2 | ✅ | Leg | 4th (SP 5.2) |
| L2 | 3 | MR ENERGIA | 13.5% | 37.2% | 31 | ✅ | Leg | 12th (SP 31) |
| L3 | 8 | CHILL EASY | 10.8% | 33.5% | 5.2 | ✅ | Leg | **2nd** (SP 5.2) |
| L4 | 6 | THE UNIQUE STAR | 10.2% | 31.9% | 16 | ✅ | Leg | **3rd** (SP 16) |
| L5 | 10 | PERFECTDAY | 4.8% | 18.0% | 4.0 | ✅ | Leg | **1st** (SP 4.0) |
| — | 4 | CITY GOLD BANNER | 4.5% | 18.1% | — | ❌ | — | 8th |
| — | 5 | ENDEARED | 3.9% | 17.0% | — | ❌ | — | 5th |
| — | 11 | PATONGA HEART | 2.9% | 13.0% | — | ❌ | — | 11th |
| — | 9 | DARYL FLASH | 2.9% | 13.2% | — | ❌ | — | 6th |
| — | 7 | KANSAS | 2.0% | 8.4% | — | ❌ | — | 10th |
| — | 13 | EXCEED THE LIMIT | 1.9% | 8.8% | — | ❌ | — | 9th |
| — | 14 | LADY'S LOVE | 0.2% | 1.1% | — | ❌ | — | 13th |
| — | 12 | JUMBO STEPS | 0.0% | 0.2% | — | ❌ | — | 14th |

**Pattern A (frustrating B miss)** — All three placers **PERFECTDAY** (L5 ✓), **CHILL EASY** (L3 ✓), **THE UNIQUE STAR** (L4 ✓) were inside the pool. The $191 Trio was fully covered — but banker **WINDLORD** (MC 23.4%, SP 7.3) finished 7th. On this highly competitive field (MC top 5 separated by only 13.2 pp, all with Win% between 10% and 23%), the MC #1 was the weakest single-horse banker pick of the meeting. Had any of the three placers been designated banker, B hits cleanly. Notably, PERFECTDAY won as the **shortest-priced horse** at SP 4.0 despite ranking only 6th by MC Win% (4.8%) — a clear MC underestimation of market form.

---

### R11 — C3 | 1400m Turf | Yielding | Actual: 3→7→2 ❌

**Ticket:** ★ **#8** + legs **#2 → #1 → #3 → #4 → #7** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 8 | HAPPY BOSS | 44.2% | 84.3% | 2.3 | ✅ | ★ Banker | 9th (SP 2.3) |
| L1 | 2 | AEROVOLANIC | 23.6% | 69.3% | 3.3 | ✅ | Leg | **3rd** (SP 3.3) |
| L2 | 1 | EVERYONE'S STAR | 19.2% | 65.6% | 5.1 | ✅ | Leg | 6th (SP 5.1) |
| L3 | 3 | BRILLIANT EXPRESS | 7.5% | 37.4% | 8.1 | ✅ | Leg | **1st** (SP 8.1) |
| L4 | 4 | URANUS STAR | 3.3% | 21.6% | 14 | ✅ | Leg | 5th (SP 14) |
| L5 | 7 | ALL'S WELL | 1.1% | 11.0% | 31 | ✅ | Leg | **2nd** (SP 31) |
| — | 6 | NATURAL NUMBERS | 0.5% | 4.1% | — | ❌ | — | 8th |
| — | 5 | DREAMING TOGETHER | 0.1% | 2.3% | — | ❌ | — | 7th |
| — | 11 | WELL ENOUGH | 0.1% | 1.5% | — | ❌ | — | 13th |
| — | 9 | KEMPES | 0.1% | 1.4% | 31 | ❌ | — | 4th (SP 31) |
| — | 10 | COMPLETE UNKNOWN | 0.0% | 0.8% | — | ❌ | — | 11th |
| — | 13 | GHORGAN | 0.0% | 0.3% | — | ❌ | — | 12th |
| — | 12 | WITHOUT RHYME | 0.0% | 0.0% | — | ❌ | — | 14th |
| — | 14 | TIN FOOK | 0.0% | 0.3% | — | ❌ | — | 10th |

**Pattern A (most frustrating B miss)** — All three placers **BRILLIANT EXPRESS** (L3 ✓), **ALL'S WELL** (L5 ✓), **AEROVOLANIC** (L1 ✓) were inside the pool. The **$1,150** Trio — the meeting's second-largest Pattern A pot — was fully covered. But banker **HAPPY BOSS** (MC 44.2%, SP **2.3** short favourite) collapsed to **9th** on Yielding going. This was the strongest MC call of the final races (44.2% Win, 84.3% Place) and the market agreed (SP 2.3). A catastrophic dual-signal failure: both MC and market got it wrong. Had any pool horse been banker instead, B hits. The going shift to Yielding from R6 onwards was likely the root cause — HAPPY BOSS had shown all his form on Good-to-Yielding or better surfaces.

---

## B Banker Performance

| Race | B Banker | MC Win% | SP | Placed? | Position |
|------|---------|---------|-----|---------|----------|
| R1 | #5 FAMILY FORTUNE | 40.4% | 2.3 | ❌ | 4th |
| R2 | #1 RUN RUN SUNRISE | 37.9% | 8.3 | ❌ | 10th |
| R3 | #4 MAJESTIC DELIGHT | 32.3% | 4.5 | ❌ | 5th |
| R4 | #1 PAPAYA BROSE | 46.1% | 2.7 | ❌ | 4th |
| R5 | #7 SUPERB SPIRIT | 42.4% | 5.5 | ✅ | **1st** |
| R6 | #2 CELESTIAL HERO | 40.0% | 2.2 | ✅ | **3rd** |
| R7 | #2 FORZA TORO | 43.3% | 1.6 | ❌ | 5th |
| R8 | #4 VERMILION TEMPEST | 60.7% | 6.7 | ❌ | 11th |
| R9 | #10 VOYAGE BOSS | 24.5% | 14 | ❌ | 8th |
| R10 | #2 WINDLORD | 23.4% | 7.3 | ❌ | 7th |
| R11 | #8 HAPPY BOSS | 44.2% | 2.3 | ❌ | 9th |

**B Banker top 3 rate: 2/11 = 18.2%** — the worst meeting for Strategy B bankers. Only R5 (1st) and R6 (3rd) placed. The going shift to Yielding from R6 onwards was devastating: 0/6 banker placements on Yielding turf (R6 was the last banker success, on the first Yielding race). MC's strongest picks — #4 R8 (60.7%), #8 R11 (44.2%), #2 R7 (43.3%) — all collapsed. The Pattern A cluster (R7, R10, R11) shows that when the pool coverage was perfect, the banker systematically failed. This session's data strengthens the case for a no-banker box structure when going degrades mid-meeting.

---

*End of Trio Review — Strategy B (StratC) — ST 2026-05-17*
