# Trio Review — Strategy B (StratC) | Sha Tin | 9 May 2026

## Rules (Strategy B)
- **Banker**: MC rank #1 (highest raw MC Win%) — no debutant exception
- **Primary legs**: next 5 horses by MC Win% (total 6-horse pool)
- **Structure**: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos
- **Stake**: $10/combo × 10 = **$100 per race**
- **Races**: **All races** (no PASS)
- **Source**: Raw MC Win% from `simulation_summaries_20260509_ST.md`

---

## Summary

| Metric | Strategy B | Strategy A |
|--------|-----------|-----------|
| Races | 11 | 11 |
| Hits | 0/11 (0.0%) | 0/11 (0.0%) |
| Staked | $1,100 | $930 |
| Returned | $0 | $0 |
| **Net P&L** | **−$1,100** | **−$930** |
| **ROI** | **−100%** | **−100%** |
| Banker top 3 | 2/11 (18.2%) | 2/11 (18.2%) |

---

## Strategy B: Race-by-Race Results

| Race | Class | Dist | Surf | Banker (MC#1) | Pool (Top 6 by MC Win%) | Combos | Stake | Result (1→2→3) | Banker Top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|------|---------------|------------------------|--------|-------|----------------|--------------|------|--------|--------|-----|
| R1 | Griffin | 1000m | Turf | #4 SILVERY KNIGHT (26.7%) | 4,1,9,7,10,2 | 10 | $100 | **5**→2→**6** | ❌ (8th) | MISS ❌ | $30,907 | $0 | −$100 |
| R2 | C4 | 1200m | Turf | #1 NORTHERN FIRE BALL (30.8%) | 1,7,3,5,4,11 | 10 | $100 | 1→**2**→5 | ✅ (1st) | MISS ❌ | $965 | $0 | −$100 |
| R3 | C5 | 1400m | Turf | #6 GENERAL SMART (49.5%) | 6,5,10,11,8,13 | 10 | $100 | **12**→8→13 | ❌ (12th) | MISS ❌ | $2,216 | $0 | −$100 |
| R4 | C4 | 1000m | Turf | #1 ALSONSO (27.4%) | 1,6,3,4,7,14 | 10 | $100 | **10**→4→**11** | ❌ (9th) | MISS ❌ | $59,723 | $0 | −$100 |
| R5 | C4 | 1200m | Turf | #1 CONRAD PATCH (66.0%) | 1,9,5,3,7,8 | 10 | $100 | **4**→**6**→**2** | ❌ (6th) | MISS ❌ | $100,444 | $0 | −$100 |
| R6 | C4 | 1400m | Turf | #13 THE CONCENTRATION (28.5%) | 13,6,8,5,11,3 | 10 | $100 | 6→**7**→3 | ❌ (7th) | MISS ❌ | $3,632 | $0 | −$100 |
| R7 | C4 | 1600m | Turf | #1 GALLANT EPOCH (26.6%) | 1,5,13,9,6,4 | 10 | $100 | 13→**8**→**11** | ❌ (14th) | MISS ❌ | $18,813 | $0 | −$100 |
| R8 | C3 | 1200m | Turf | #3 GOLD PATCH (62.5%) | 3,10,4,2,5,7 | 10 | $100 | 7→**11**→3 | ✅ (3rd) | MISS ❌ | $6,395 | $0 | −$100 |
| R9 | C3 | 1000m | Turf | #2 MICKLEY (37.7%) | 2,5,1,4,3,7 | 10 | $100 | 7→**13**→**14** | ❌ (7th) | MISS ❌ | $23,334 | $0 | −$100 |
| R10 | C3 | 1600m | Turf | #1 MISTER DAPPER (43.2%) | 1,3,4,5,6,2 | 10 | $100 | 5→4→3 | ❌ (10th) | MISS ❌ | $582 | $0 | −$100 |
| R11 | C2 | 1200m | Turf | #4 PATCH OF STARS (29.7%) | 4,6,11,2,5,1 | 10 | $100 | 4→2→**12** | ✅ (1st) | MISS ❌ | $12,253 | $0 | −$100 |

**Bold** = horse not in 6-horse pool

---

## Strategy A: Race-by-Race Results (for comparison)

| Race | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|--------|-------|--------|------|--------|--------|-----|-------------|
| R1 | Griffin 1000m | Full Pool | (none) | 1,2,4,7,9,10 | 20 | $200 | 5→2→6 | MISS ❌ | $30,907 | $0 | −$200 | Pool gap (#5,#6) |
| R2 | C4 1200m | B | #7 | 1,3,4,5,8 | 10 | $100 | 1→2→5 | MISS ❌ | $965 | $0 | −$100 | Banker fail (#7) + pool gap (#2) |
| R3 | C5 1400m | A | #6 | 5,8,10,11 | 6 | $60 | 12→8→13 | MISS ❌ | $2,216 | $0 | −$60 | Banker fail (#6) + pool gap (#12,#13) |
| R4 | C4 1000m | B | #6 | 1,3,4,7,14 | 10 | $100 | 10→4→11 | MISS ❌ | $59,723 | $0 | −$100 | Banker fail (#6) + pool gap (#10,#11) |
| R5 | C4 1200m | A | #1 | 9,5,3,7 | 6 | $60 | 4→6→2 | MISS ❌ | $100,444 | $0 | −$60 | Complete collapse |
| R6 | C4 1400m | B | #13 | 6,1,4,7,9 | 10 | $100 | 6→7→3 | MISS ❌ | $3,632 | $0 | −$100 | Banker fail (#13) + pool gap (#3,#7) |
| R7 | C4 1600m | B | #1 | 5,13,9,6,4 | 10 | $100 | 13→8→11 | MISS ❌ | $18,813 | $0 | −$100 | Banker fail (#1) + pool gap (#8,#11) |
| R8 | C3 1200m | A (雙膽拖) | #3+#10 | 4,2 | 2 | $20 | 7→11→3 | MISS ❌ | $6,395 | $0 | −$20 | Co-banker #10 fail + pool gap (#7,#11) |
| R9 | C3 1000m | A | #2 | 5,8,4,7 | 6 | $60 | 7→13→14 | MISS ❌ | $23,334 | $0 | −$60 | Banker fail (#2) + pool gap (#13,#14) |
| R10 | C3 1600m | A (雙膽拖) | #1+#3 | 4,5,6 | 3 | $30 | 5→4→3 | MISS ❌ | $582 | $0 | −$30 | Pattern A — co-banker #1 fail, all 3 in pool |
| R11 | C2 1200m | B | #4 | 11,6,2,5,1 | 10 | $100 | 4→2→12 | MISS ❌ | $12,253 | $0 | −$100 | Banker hit, pool gap (#12) |

---

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| A: Banker fail — all 3 in pool | 1 | R10 (#5→#4→#3, all in {1,3,4,5,6,2}, banker #1 failed) |
| B: Banker hit — pool gap | 2 | R2 (#2 gap, banker #1 won), R8 (#11 gap, banker #3 3rd), R11 (#12 gap, banker #4 won) |
| C: Banker fail + pool gap | 8 | R1, R3, R4, R5, R6, R7, R9 (all banker fail + at least 1 placer outside pool) |

### R10 — Pattern A (most frustrating B miss)
Result: SMART AVENUE(#5), AMAZING PARTNERS(#4), ENDUED(#3) — all three in B's pool {1,3,4,5,6,2}. But banker MISTER DAPPER (#1, MC 43.2%, SP 11) collapsed to 10th. $582 Trio was in the pool — wrong banker choice.

### R11 — Pattern B (closest B miss)
PATCH OF STARS (#4, banker) won. CRIMSON FLASH (#2, leg) placed 2nd. But PUBLIC ATTENTION (#12, MC rank 8 at 2.3%) came 3rd at SP 9.8, edging out HOT DELIGHT (#11, 2.1 SP fav, MC rank 3) who ran 4th. The 6-horse pool missed #12 by just 2 MC rank positions.

---

## Full MC Place% Table — Per Race

*SP = starting price from results JSON. MC Win%/Place% from `simulation_summaries_20260509_ST.md`. **★** = banker (MC #1); **L1…L5** = legs ranked by MC Win% descending; **—** = non-pool starters.*

---

### R1 — Griffin | 1000m Turf | Actual: 5→2→6 ❌

**Ticket:** ★ **#4** + legs **#1 → #9 → #7 → #10 → #2** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 4 | SILVERY KNIGHT | 26.7% | 57.5% | 23 | ✅ | ★ Banker | 8th (SP 23) |
| L1 | 1 | ALMIGHTY WARRIOR | 15.3% | 43.3% | 6.3 | ✅ | Leg | 5th (SP 6.3) |
| L2 | 9 | SECRET INGREDIENT | 14.8% | 43.8% | 6 | ✅ | Leg | 10th (SP 6) |
| L3 | 7 | GAUDIUM MAGNUM | 10.5% | 33.5% | 3.7 | ✅ | Leg | 4th (SP 3.7) |
| L4 | 10 | TALENTS CHAMPION | 8.4% | 29.1% | 11 | ✅ | Leg | 7th (SP 11) |
| L5 | 2 | SHARP PLANET | 8.4% | 29.6% | 3.4 | ✅ | Leg | **2nd** (SP 3.4) |
| — | 6 | EVER WEALTH | 5.4% | 20.6% | 10 | ❌ | — | **3rd** (SP 10) |
| — | 5 | SPICE BAG | 4.7% | 17.7% | 49 | ❌ | — | **1st** (SP 49) |
| — | 3 | SHOW ME YOUR LOVE | 4.3% | 17.6% | 14 | ❌ | — | 6th (SP 14) |
| — | 8 | GLORIOUS HERO | 1.5% | 7.2% | 67 | ❌ | — | 9th (SP 67) |

**Pattern C** — Banker **SILVERY KNIGHT** (MC 26.7%, SP 23) collapsed to 8th in a Griffin with 10 debutants. Only **SHARP PLANET** (L5 ✓) placed (2nd). **SPICE BAG** (rank 8, MC 4.7%) won at 49-1 and **EVER WEALTH** (rank 7, MC 5.4%) placed 3rd at SP 10. Both were just below the 6-horse cut. Griffin races remain structurally unpredictable for MC modelling.

---

### R2 — C4 | 1200m Turf | Actual: 1→2→5 ❌

**Ticket:** ★ **#1** + legs **#7 → #3 → #5 → #4 → #11** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | NORTHERN FIRE BALL | 30.8% | 67.7% | 3.4 | ✅ | ★ Banker | **1st** (SP 3.4) |
| L1 | 7 | QUARTZ LEGEND | 29.8% | 67.4% | 7.4 | ✅ | Leg | 5th (SP 7.4) |
| L2 | 3 | RYUI KOKOROE | 13.3% | 42.5% | 12 | ✅ | Leg | 9th (SP 12) |
| L3 | 5 | WARRIORS DREAM | 8.4% | 32.4% | 9.5 | ✅ | Leg | **3rd** (SP 9.5) |
| L4 | 4 | BRIGHT DAY | 7.1% | 28.2% | 6.9 | ✅ | Leg | 4th (SP 6.9) |
| L5 | 11 | RUSSET GLOW | 2.9% | 14.8% | 20 | ✅ | Leg | 12th (SP 20) |
| — | 8 | SPIRITED STEED | 2.7% | 15.2% | 8.5 | ❌ | — | 7th (SP 8.5) |
| — | 2 | MATZDEN | 2.0% | 12.0% | 4.2 | ❌ | — | **2nd** (SP 4.2) |
| — | 12 | LIGHTNING ACE | 1.5% | 9.5% | 122 | ❌ | — | 6th (SP 122) |
| — | 10 | EXTRAORDINARY GALL | 1.2% | 7.1% | 122 | ❌ | — | 10th (SP 122) |
| — | 6 | ACA FAST | 0.2% | 2.3% | 41 | ❌ | — | 8th (SP 41) |
| — | 9 | THE COSMIC POWER | 0.1% | 0.9% | 118 | ❌ | — | 11th (SP 118) |

**Pattern B** — Banker **NORTHERN FIRE BALL** won (✅ 1st) and **WARRIORS DREAM** (L3 ✓) placed 3rd — two of three in pool. But **MATZDEN** (#2, rank 8, MC 2.0%) came 2nd at SP 4.2. The market priced MATZDEN as a clear contender while MC gave it only 12.0% Place. Classic pool gap: the 6-horse cap excluded a market co-favourite.

---

### R3 — C5 | 1400m Turf | Actual: 12→8→13 ❌

**Ticket:** ★ **#6** + legs **#5 → #10 → #11 → #8 → #13** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 6 | GENERAL SMART | 49.5% | 80.3% | 5.7 | ✅ | ★ Banker | 12th (SP 5.7) |
| L1 | 5 | ONLY U | 12.4% | 44.7% | 12 | ✅ | Leg | 6th (SP 12) |
| L2 | 10 | VERBIER | 12.3% | 44.2% | 7.4 | ✅ | Leg | 7th (SP 7.4) |
| L3 | 11 | SPEEDY TRIDENT | 6.7% | 28.0% | 145 | ✅ | Leg | 9th (SP 145) |
| L4 | 8 | SUPERB GUY | 5.4% | 26.3% | 6 | ✅ | Leg | **2nd** (SP 6) |
| L5 | 13 | TEAM HAPPY | 4.1% | 21.1% | 6.5 | ✅ | Leg | **3rd** (SP 6.5) |
| — | 7 | WINNING CIGAR | 3.8% | 19.0% | 32 | ❌ | — | 10th (SP 32) |
| — | 12 | JOLLY JUMPER | 2.3% | 13.6% | 5 | ❌ | — | **1st** (SP 5) |
| — | 9 | SPARKLE AND GOLD | 2.0% | 11.9% | — | ❌ | — | SCR |
| — | 14 | RUN YES RUN | 1.2% | 8.4% | 47 | ❌ | — | 4th (SP 47) |
| — | 2 | FIGHT TIME | 0.2% | 1.9% | 7 | ❌ | — | 8th (SP 7) |
| — | 1 | THE ALL ROUNDER | 0.1% | 0.3% | 15 | ❌ | — | 5th (SP 15) |
| — | 3 | WAVE GARDEN | 0.0% | 0.1% | 54 | ❌ | — | 13th (SP 54) |
| — | 4 | GOLDEN FORTUNE | 0.0% | 0.0% | 98 | ❌ | — | 11th (SP 98) |

**Pattern C** — Banker **GENERAL SMART** (MC 49.5%, Purton, SP 5.7) collapsed to dead last (12th) — catastrophic. **SUPERB GUY** (L4 ✓) and **TEAM HAPPY** (L5 ✓) placed 2nd/3rd but **JOLLY JUMPER** (rank 8, MC 2.3%) won at SP 5, one spot below the 6-horse cap. G-Y going clearly derailed the dominant MC pick.

---

### R4 — C4 | 1000m Turf | Actual: 10→4→11 ❌

**Ticket:** ★ **#1** + legs **#6 → #3 → #4 → #7 → #14** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | ALSONSO | 27.4% | 67.3% | 16 | ✅ | ★ Banker | 9th (SP 16) |
| L1 | 6 | GRAND NOVA | 25.1% | 66.0% | 15 | ✅ | Leg | 12th (SP 15) |
| L2 | 3 | BEAUTY THUNDER | 21.2% | 62.6% | 19 | ✅ | Leg | 13th (SP 19) |
| L3 | 4 | MASTER PAYMENT | 20.7% | 61.8% | 4.4 | ✅ | Leg | **2nd** (SP 4.4) |
| L4 | 7 | RAPID PHANTOM | 2.7% | 15.9% | 7.4 | ✅ | Leg | 4th (SP 7.4) |
| L5 | 14 | CAP LINER | 1.0% | 7.0% | 4.3 | ✅ | Leg | 6th (SP 4.3) |
| — | 12 | CASA PRIMO | 0.8% | 6.1% | 51 | ❌ | — | 5th (SP 51) |
| — | 13 | COMET RADIANCE | 0.4% | 4.6% | 43 | ❌ | — | 11th (SP 43) |
| — | 9 | WINALOT | 0.3% | 3.3% | 73 | ❌ | — | 8th (SP 73) |
| — | 10 | ONESHOT | 0.2% | 2.1% | 70 | ❌ | — | **1st** (SP 70) |
| — | 11 | BUSTLING CITY | 0.2% | 1.7% | 8.1 | ❌ | — | **3rd** (SP 8.1) |
| — | 5 | TACTICAL VICTORY | 0.0% | 0.7% | 233 | ❌ | — | 14th (SP 233) |
| — | 8 | STORM MIRROR | 0.0% | 0.7% | 4.4 | ❌ | — | 7th (SP 4.4) |
| — | 2 | E HO HO | 0.0% | 0.1% | 60 | ❌ | — | 10th (SP 60) |

**Pattern C (Catastrophic)** — Total collapse. Banker **ALSONSO** (MC 27.4%, SP 16) ran 9th. The winner **ONESHOT** (rank 10, MC 0.2%) came from 70-1 and **BUSTLING CITY** (rank 11, MC 0.2%) ran 3rd at SP 8.1. Only **MASTER PAYMENT** (L3 ✓) placed 2nd. The MC top 4 (horses #1,#6,#3,#4 by MC Win%) finished 9th-12th-13th-2nd — three of four completely missed.

---

### R5 — C4 | 1200m Turf | Actual: 4→6→2 ❌

**Ticket:** ★ **#1** + legs **#9 → #5 → #3 → #7 → #8** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | CONRAD PATCH | 66.0% | 91.3% | 7.6 | ✅ | ★ Banker | 6th (SP 7.6) |
| L1 | 9 | BROWNNEEDSFURTHER | 7.4% | 38.7% | 3.6 | ✅ | Leg | 5th (SP 3.6) |
| L2 | 5 | GRACEFUL HEART | 7.1% | 37.9% | 25 | ✅ | Leg | 10th (SP 25) |
| L3 | 3 | FLASHING FIGHTER | 6.8% | 38.1% | 2.8 | ✅ | Leg | 9th (SP 2.8) |
| L4 | 7 | E HOPEFUL | 4.6% | 27.5% | 17 | ✅ | Leg | 4th (SP 17) |
| L5 | 8 | TRENDY RUSH | 3.8% | 25.7% | 83 | ✅ | Leg | 7th (SP 83) |
| — | 6 | GROUPER | 2.1% | 16.2% | 13 | ❌ | — | **2nd** (SP 13) |
| — | 10 | IMPENDING LEGACY | 1.4% | 12.9% | 70 | ❌ | — | 11th (SP 70) |
| — | 4 | REAL GENTLEMAN | 0.4% | 4.4% | 158 | ❌ | — | **1st** (SP 158) |
| — | 11 | EMERGING STAR | 0.2% | 2.4% | 192 | ❌ | — | 12th (SP 192) |
| — | 2 | POSITIVE SMILE | 0.2% | 3.4% | 10 | ❌ | — | **3rd** (SP 10) |
| — | 12 | AMAZING FUN | 0.0% | 1.5% | 6.8 | ❌ | — | 8th (SP 6.8) |

**Pattern C (Catastrophic)** — The session's worst miss. Banker **CONRAD PATCH** (MC 66.0% — the meeting's most dominant pick, SP 7.6) ran only 6th. The **entire winning trio** — REAL GENTLEMAN (rank 9, MC 0.4%, 158-1), GROUPER (rank 7, MC 2.1%), POSITIVE SMILE (rank 11, MC 0.2%) — sat outside the pool. Trio paid $100,444. Structurally unfixable: no rational model would include a 158-1 shot.

---

### R6 — C4 | 1400m Turf | Actual: 6→7→3 ❌

**Ticket:** ★ **#13** + legs **#6 → #8 → #5 → #11 → #3** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 13 | THE CONCENTRATION | 28.5% | 61.1% | 10 | ✅ | ★ Banker | 7th (SP 10) |
| L1 | 6 | INVICTUS DRAGON | 20.8% | 53.5% | 4.4 | ✅ | Leg | **1st** (SP 4.4) |
| L2 | 8 | SUPER DRAGON | 13.0% | 41.7% | 3.8 | ✅ | Leg | 9th (SP 3.8) |
| L3 | 5 | STAR SATYR | 12.3% | 38.8% | 31 | ✅ | Leg | 4th (SP 31) |
| L4 | 11 | DECISION LINK | 11.0% | 36.6% | 6.6 | ✅ | Leg | 6th (SP 6.6) |
| L5 | 3 | INVICTUS | 5.9% | 25.2% | 24 | ✅ | Leg | **3rd** (SP 24) |
| — | 4 | LUCKY BID | 3.4% | 14.8% | 23 | ❌ | — | 13th (SP 23) |
| — | 9 | CHEERFUL WONGCHOY | 2.7% | 12.5% | 16 | ❌ | — | 8th (SP 16) |
| — | 1 | FLYING FORTUNE | 0.9% | 5.2% | 54 | ❌ | — | 12th (SP 54) |
| — | 7 | LUCKY MAN | 0.9% | 5.3% | 5.1 | ❌ | — | **2nd** (SP 5.1) |
| — | 2 | BEST WORLD | 0.3% | 2.8% | 20 | ❌ | — | 5th (SP 20) |
| — | 10 | CELESTIAL STRIDER | 0.2% | 1.6% | 115 | ❌ | — | 10th (SP 115) |
| — | 12 | LEATHER GOODS | 0.1% | 0.4% | 85 | ❌ | — | 14th (SP 85) |
| — | 14 | MONEY TYCOON | 0.1% | 0.6% | 44 | ❌ | — | 11th (SP 44) |

**Pattern C** — Banker **THE CONCENTRATION** (MC 28.5%, SP 10) ran 7th. **INVICTUS DRAGON** (L1 ✓) won and **INVICTUS** (L5 ✓) ran 3rd — two legs placed. But **LUCKY MAN** (#7, rank 10, MC 0.9%) ran 2nd at SP 5.1. The market priced LUCKY MAN as a clear contender; MC buried it at 5.3% Place. The 6-horse pool missed by 4 MC ranking positions.

---

### R7 — C4 | 1600m Turf | Actual: 13→8→11 ❌

**Ticket:** ★ **#1** + legs **#5 → #13 → #9 → #6 → #4** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | GALLANT EPOCH | 26.6% | 62.8% | 10 | ✅ | ★ Banker | 14th (SP 10) |
| L1 | 5 | AUDACIOUS PURSUIT | 21.8% | 57.0% | 5.9 | ✅ | Leg | 9th (SP 5.9) |
| L2 | 13 | BLING BLING GENIUS | 17.9% | 52.6% | 13 | ✅ | Leg | **1st** (SP 13) |
| L3 | 9 | VICTOR SUPREME | 13.4% | 43.6% | 5.6 | ✅ | Leg | 5th (SP 5.6) |
| L4 | 6 | BEAUTY VIVA | 10.8% | 36.9% | 36 | ✅ | Leg | 8th (SP 36) |
| L5 | 4 | TURIN CHAMPIONS | 6.6% | 28.4% | 6.5 | ✅ | Leg | 4th (SP 6.5) |
| — | 8 | LUCKY YEAR | 1.8% | 9.9% | 10 | ❌ | — | **2nd** (SP 10) |
| — | 12 | RED BRICK WARRIOR | 0.7% | 5.0% | 12 | ❌ | — | 7th (SP 12) |
| — | 7 | CIRCUIT MARSHAL | 0.3% | 2.2% | 10 | ❌ | — | 13th (SP 10) |
| — | 14 | FIGHTING MACHINE | 0.1% | 0.9% | 41 | ❌ | — | 11th (SP 41) |
| — | 2 | KA YING SUPERB | 0.0% | 0.3% | 11 | ❌ | — | 6th (SP 11) |
| — | 10 | ILLUMINOUS | 0.0% | 0.4% | 38 | ❌ | — | 12th (SP 38) |
| — | 3 | SUPERB KID | 0.0% | 0.0% | 56 | ❌ | — | 10th (SP 56) |
| — | 11 | AMAZING DUCK | 0.0% | 0.0% | 11 | ❌ | — | **3rd** (SP 11) |

**Pattern C** — Banker **GALLANT EPOCH** (MC 26.6%, SP 10) finished dead last (14th) — total collapse. Leg **BLING BLING GENIUS** (L2 ✓) won, but **LUCKY YEAR** (rank 7, MC 1.8%) ran 2nd and **AMAZING DUCK** (rank 14 last, MC 0.0%) placed 3rd at SP 11. AMAZING DUCK had literally 0.0% in both MC Win and Place — the most extreme MC miss of the meeting. No pool expansion could have anticipated this result.

---

### R8 — C3 | 1200m Turf | Actual: 7→11→3 ❌

**Ticket:** ★ **#3** + legs **#10 → #4 → #2 → #5 → #7** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 3 | GOLD PATCH | 62.5% | 97.2% | 3.3 | ✅ | ★ Banker | **3rd** (SP 3.3) |
| L1 | 10 | SPICY STANDARD | 29.1% | 91.0% | 3.1 | ✅ | Leg | 7th (SP 3.1) |
| L2 | 4 | CHILL BUDDY | 6.4% | 63.9% | 3.6 | ✅ | Leg | 9th (SP 3.6) |
| L3 | 2 | JUBILANT WINNER | 1.3% | 24.1% | 31 | ✅ | Leg | 10th (SP 31) |
| L4 | 5 | KANSAS | 0.5% | 11.8% | 116 | ✅ | Leg | 12th (SP 116) |
| L5 | 7 | EFFORTLESS WIN | 0.1% | 3.9% | 12 | ✅ | Leg | **1st** (SP 12) |
| — | 9 | ACE CHAMPION | 0.1% | 2.4% | 16 | ❌ | — | 6th (SP 16) |
| — | 1 | SUPERB CAPITALIST | 0.0% | 2.1% | 55 | ❌ | — | 11th (SP 55) |
| — | 8 | THUNDER ACTION | 0.0% | 1.6% | 46 | ❌ | — | 4th (SP 46) |
| — | 11 | THRIVING BROTHERS | 0.0% | 1.7% | 16 | ❌ | — | **2nd** (SP 16) |
| — | 6 | LUCKY MY WAY | 0.0% | 0.3% | 64 | ❌ | — | 8th (SP 64) |
| — | 12 | RISING FROM ASHES | 0.0% | 0.0% | 119 | ❌ | — | 5th (SP 119) |

**Pattern B** — Banker **GOLD PATCH** survived (✅ 3rd) and leg **EFFORTLESS WIN** (L5 ✓) won. But **THRIVING BROTHERS** (#11, rank 10, MC 0.0%, SP 16) came 2nd — completely invisible to MC (1.7% Place). SPICY STANDARD (L1, the strong co-pick at MC 29.1%) collapsed to 7th. This was the closest B miss of the meeting: had the pool been expanded to 7, THRIVING BROTHERS still wouldn't have made it.

---

### R9 — C3 | 1000m Turf | Actual: 7→13→14 ❌

**Ticket:** ★ **#2** + legs **#5 → #1 → #4 → #3 → #7** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | MICKLEY | 37.7% | 79.5% | 17 | ✅ | ★ Banker | 7th (SP 17) |
| L1 | 5 | EVER LUCK | 29.6% | 73.8% | 6.9 | ✅ | Leg | 10th (SP 6.9) |
| L2 | 1 | FAST RESPONDER | 20.2% | 63.0% | 6.8 | ✅ | Leg | 9th (SP 6.8) |
| L3 | 4 | ALPHA STRIKE | 6.9% | 36.8% | 6.3 | ✅ | Leg | 12th (SP 6.3) |
| L4 | 3 | METRO POWER | 2.4% | 16.7% | 37 | ✅ | Leg | 6th (SP 37) |
| L5 | 7 | STRAIGHT TO GLORY | 1.5% | 11.4% | 21 | ✅ | Leg | **1st** (SP 21) |
| — | 14 | SPARKLING FELLOW | 0.8% | 6.9% | 21 | ❌ | — | **3rd** (SP 21) |
| — | 10 | PARENTS' LOVE | 0.4% | 4.8% | 15 | ❌ | — | 5th (SP 15) |
| — | 11 | LOOKING BRIGHT | 0.3% | 2.9% | 5.3 | ❌ | — | 11th (SP 5.3) |
| — | 8 | WATCH LEGEND | 0.1% | 1.7% | 24 | ❌ | — | 14th (SP 24) |
| — | 6 | MASTER OF ALL | 0.1% | 1.5% | 83 | ❌ | — | 8th (SP 83) |
| — | 13 | LUCKY CANDY | 0.1% | 0.7% | 5.8 | ❌ | — | **2nd** (SP 5.8) |
| — | 9 | FIERY STEED | 0.0% | 0.2% | 97 | ❌ | — | 13th (SP 97) |
| — | 12 | LIGHTNESS OF MUSIC | 0.0% | 0.3% | 9.8 | ❌ | — | 4th (SP 9.8) |

**Pattern C** — Banker **MICKLEY** (MC 37.7%, SP 17) ran 7th — a total failure. The MC top 4 (horses #2,#5,#1,#4) finished 7th-10th-9th-12th respectively — the entire MC backbone collapsed. Leg **STRAIGHT TO GLORY** (L5 ✓) won at 21-1, but **LUCKY CANDY** (#13, rank 12, MC 0.1%) came 2nd at SP 5.8 and **SPARKLING FELLOW** (#14, rank 7, MC 0.8%) ran 3rd. Both placers outside the pool. The market had LUCKY CANDY as a 5.8 shot; MC gave it 0.7% Place.

---

### R10 — C3 | 1600m Turf | Actual: 5→4→3 ❌

**Ticket:** ★ **#1** + legs **#3 → #4 → #5 → #6 → #2** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | MISTER DAPPER | 43.2% | 80.7% | 11 | ✅ | ★ Banker | 10th (SP 11) |
| L1 | 3 | ENDUED | 23.2% | 66.7% | 7.9 | ✅ | Leg | **3rd** (SP 7.9) |
| L2 | 4 | AMAZING PARTNERS | 18.4% | 62.0% | 6.6 | ✅ | Leg | **2nd** (SP 6.6) |
| L3 | 5 | SMART AVENUE | 5.7% | 30.7% | 2.9 | ✅ | Leg | **1st** (SP 2.9) |
| L4 | 6 | FAMILY JEWEL | 5.2% | 27.0% | 22 | ✅ | Leg | 8th (SP 22) |
| L5 | 2 | BLAZING WUKONG | 3.5% | 21.8% | 6.6 | ✅ | Leg | 4th (SP 6.6) |
| — | 7 | GOLDEN CHAMP | 0.4% | 4.2% | 69 | ❌ | — | 11th (SP 69) |
| — | 9 | HYMNBOOK | 0.1% | 1.9% | 12 | ❌ | — | 6th (SP 12) |
| — | 11 | LEGEND WINNER | 0.1% | 1.3% | 63 | ❌ | — | 9th (SP 63) |
| — | 8 | CALL ME MAGNIFIQUE | 0.1% | 1.4% | 37 | ❌ | — | 13th (SP 37) |
| — | 10 | M M CONCORD | 0.1% | 0.4% | 32 | ❌ | — | 12th (SP 32) |
| — | 12 | MASTER TRILLION | 0.1% | 1.4% | 53 | ❌ | — | 14th (SP 53) |
| — | 13 | RISING PHOENIX | 0.0% | 0.3% | 15 | ❌ | — | 7th (SP 15) |
| — | 14 | WITHALLMYFAITH | 0.0% | 0.2% | 15 | ❌ | — | 5th (SP 15) |

**Pattern A (most frustrating B miss)** — All three placers **SMART AVENUE** (L3 ✓), **AMAZING PARTNERS** (L2 ✓), **ENDUED** (L1 ✓) were inside the pool. But banker **MISTER DAPPER** (MC 43.2%, SP 11) collapsed to 10th. The $582 Trio was sitting right there — wrong banker choice. Had any of the three top legs been designated banker, this was a clean hit. Purton on SMART AVENUE (SP 2.9) was the clear market pick MC underestimated.

---

### R11 — C2 | 1200m Turf | Actual: 4→2→12 ❌

**Ticket:** ★ **#4** + legs **#6 → #11 → #2 → #5 → #1** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 4 | PATCH OF STARS | 29.7% | 67.6% | 6.9 | ✅ | ★ Banker | **1st** (SP 6.9) |
| L1 | 6 | BULB GENERAL | 22.0% | 58.1% | 4.7 | ✅ | Leg | 6th (SP 4.7) |
| L2 | 11 | HOT DELIGHT | 20.6% | 56.5% | 2.1 | ✅ | Leg | 4th (SP 2.1) |
| L3 | 2 | CRIMSON FLASH | 9.4% | 36.6% | 25 | ✅ | Leg | **2nd** (SP 25) |
| L4 | 5 | YOUNG CHAMPION | 7.7% | 31.2% | 10 | ✅ | Leg | 12th (SP 10) |
| L5 | 1 | LUCKY WITH YOU | 5.2% | 20.5% | 26 | ✅ | Leg | 5th (SP 26) |
| — | 3 | INVINCIBLE SAGE | 2.5% | 12.4% | 31 | ❌ | — | 11th (SP 31) |
| — | 12 | PUBLIC ATTENTION | 2.3% | 12.1% | 9.8 | ❌ | — | **3rd** (SP 9.8) |
| — | 10 | AKASHVANI | 0.3% | 2.8% | 25 | ❌ | — | 10th (SP 25) |
| — | 7 | VICTOR THE WINNER | 0.1% | 1.1% | 73 | ❌ | — | 8th (SP 73) |
| — | 9 | LADY'S CHOICE | 0.1% | 1.0% | 59 | ❌ | — | 7th (SP 59) |
| — | 8 | GUSTOSISIMO | 0.0% | 0.0% | 67 | ❌ | — | 9th (SP 67) |

**Pattern B (closest B miss)** — Banker **PATCH OF STARS** won (✅ 1st) and **CRIMSON FLASH** (L3 ✓) placed 2nd — two of three covered. But **PUBLIC ATTENTION** (#12, rank 8, MC 2.3%) came 3rd at SP 9.8, just two MC rank positions below the 6-horse cap. Meanwhile market favourite **HOT DELIGHT** (L2, SP 2.1) ran only 4th. Had the pool been expanded to 7 horses, PUBLIC ATTENTION would still have been excluded (#3 INVINCIBLE SAGE at 2.5% was rank 7). An 8-horse pool was needed — very close to structural feasibility but too expensive.

---

## B Banker Performance

| Race | B Banker | MC Win% | SP | Placed? | Position |
|------|---------|---------|-----|---------|----------|
| R1 | #4 SILVERY KNIGHT | 26.7% | 23 | ❌ | 8th |
| R2 | #1 NORTHERN FIRE BALL | 30.8% | 3.4 | ✅ | **1st** |
| R3 | #6 GENERAL SMART | 49.5% | 5.7 | ❌ | 12th |
| R4 | #1 ALSONSO | 27.4% | 16 | ❌ | 9th |
| R5 | #1 CONRAD PATCH | 66.0% | 7.6 | ❌ | 6th |
| R6 | #13 THE CONCENTRATION | 28.5% | 10 | ❌ | 7th |
| R7 | #1 GALLANT EPOCH | 26.6% | 10 | ❌ | 14th |
| R8 | #3 GOLD PATCH | 62.5% | 3.3 | ✅ | **3rd** |
| R9 | #2 MICKLEY | 37.7% | 17 | ❌ | 7th |
| R10 | #1 MISTER DAPPER | 43.2% | 11 | ❌ | 10th |
| R11 | #4 PATCH OF STARS | 29.7% | 6.9 | ✅ | **1st** |

**B Banker top 3 rate: 3/11 = 27.3%** — the worst meeting for Strategy B bankers. Even the two dominant MC picks (#5 R5 66.0%, #3 R8 62.5%) had one fail (#5 R5) and one scrape-through (#3 R8 placed 3rd).

Note: Strategy A and B share the same banker in 7 of 11 races (R3, R5, R9: same banker; R4: different; R1: A has no banker; R2: A=#7 vs B=#1; R7: identical; R8: A=雙膽拖, B=single #3; R10: A=雙膽拖, B=single #1; R11: identical).
