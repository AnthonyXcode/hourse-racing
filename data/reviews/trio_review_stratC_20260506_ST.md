# Trio Review — Strategy B (StratC) | Sha Tin | 6 May 2026

## Rules (Strategy B)
- **Banker**: MC rank #1 (highest raw MC Win%) — no debutant exception
- **Primary legs**: next 5 horses by MC Win% (total 6-horse pool)
- **Structure**: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos
- **Stake**: $10/combo × 10 = **$100 per race**
- **Races**: **All races** (no PASS)
- **Source**: Raw MC Win% from `simulation_summaries_20260506_ST.md`

---

## Summary

| Metric | Strategy B | Strategy A |
|--------|-----------|-----------|
| Races | 9 | 7 |
| Hits | 1/9 (11.1%) | 1/7 (14.3%) |
| Staked | $900 | $580 |
| Returned | $475 | $475 |
| **Net P&L** | **−$425** | **−$105** |
| **ROI** | **−47.2%** | **−18.1%** |
| Banker top 3 | 3/9 (33.3%) | 3/7 (42.9%) |

---

## Strategy B: Race-by-Race Results

| Race | Class | Dist | Surf | Banker (MC#1) | Pool (Top 6 by MC Win%) | Combos | Stake | Result (1→2→3) | Banker Top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|------|---------------|------------------------|--------|-------|----------------|--------------|------|--------|--------|-----|
| R1 | C5 | 1650m | AWT | #1 HAILTOTHEVICTORS (43.6%) | 1,9,6,12,7,13 | 10 | $100 | 9→13→**11** | ❌ (4th) | MISS ❌ | $10,103 | $0 | −$100 |
| R2 | C5 | 1200m | AWT | #1 NOBLE DELUXE (37.9%) | 1,6,8,10,9,3 | 10 | $100 | 9→10→**2** | ❌ | MISS ❌ | $1,545 | $0 | −$100 |
| R3 | C4 | 1200m | AWT | #7 JUICY DRAGON (44.2%) | 7,4,3,8,5,10 | 10 | $100 | **7**→**6**→**12** | ✅ (1st) | MISS ❌ | $822 | $0 | −$100 |
| R4 | C4 | 1800m | AWT | #1 HAPPY UNIVERSE (38.0%) | 1,2,3,5,8,4 | 10 | $100 | **9**→**10**→**6** | ❌ | MISS ❌ | $1,115 | $0 | −$100 |
| R5 | C4 | 1200m | AWT | #2 LIGHT YEARS GLORY (51.2%) | 2,3,1,8,5,4 | 10 | $100 | **10**→3→2 | ✅ (3rd) | MISS ❌ | $1,241 | $0 | −$100 |
| R6 | C4 | 1650m | AWT | #6 NEVER PETER OUT (50.4%) | 6,5,3,11,9,7 | 10 | $100 | **13**→**2**→**1** | ❌ | MISS ❌ | $21,954 | $0 | −$100 |
| R7 | C4 | 1200m | AWT | #2 NATURAL HIGH (27.1%) | 2,4,3,1,7,5 | 10 | $100 | 1→5→4 | ❌ (4th) | MISS ❌ | $8,066 | $0 | −$100 |
| R8 | C3 | 1650m | AWT | #1 TALENTS AMBITION (46.7%) | 1,14,7,5,8,9 | 10 | $100 | **1**→7→8→9 | ❌ | MISS ❌ | $2,650 | $0 | −$100 |
| R9 | C3 | 1200m | AWT | #2 VICTORY SKY (49.4%) | 2,11,5,4,7,1 | 10 | $100 | 7→**2**→4 | ✅ (2nd) | **HIT ✅** | $475 | $475 | +$375 |

**Bold** = horse not in 6-horse pool

---

## Strategy A: Race-by-Race Results (for comparison)

| Race | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|--------|-------|--------|------|--------|--------|-----|-------------|
| R1 | C5 1650m | A | #1 | 9,6,12,7 | 6 | $60 | 9→13→11 | MISS ❌ | $10,103 | $0 | −$60 | Banker fail + pool gap (#13,#11) |
| R2 | C5 1200m | PASS | — | — | — | — | 9→10→2 | PASS | $1,545 | — | — | Correctly passed |
| R3 | C4 1200m | B | #7 | 4,3,8,5,10 | 10 | $100 | 7→6→12 | MISS ❌ | $822 | $0 | −$100 | Banker 1st, pool gap (#6,#12) |
| R4 | C4 1800m | B | #1 | 2,3,5,8,4 | 10 | $100 | 9→10→6 | MISS ❌ | $1,115 | $0 | −$100 | Complete upset |
| R5 | C4 1200m | B | #2 | 3,1,8,5,4 | 10 | $100 | 10→3→2 | MISS ❌ | $1,241 | $0 | −$100 | Banker 3rd, pool gap (#10) |
| R6 | C4 1650m | A | #6 | 5,3,11,9 | 6 | $60 | 13→2→1 | MISS ❌ | $21,954 | $0 | −$60 | Complete meltdown |
| R7 | C4 1200m | PASS | — | — | — | — | 1→5→4 | PASS | $8,066 | — | — | Correctly passed |
| R8 | C3 1650m | B | #1 | 14,7,5,8,9 | 10 | $100 | 7→8→9 | MISS ❌ | $2,650 | $0 | −$100 | Pattern A (banker fail, all 3 in legs) |
| R9 | C3 1200m | A | #2 | 11,5,4,7 | 6 | $60 | 7→2→4 | **HIT ✅** | $475 | $475 | +$415 | Clean hit — banker 2nd, legs 1st + 3rd |

---

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| A: Banker fail — all 3 in legs | 2 | R7 (1→5→4 all in top 6), R8 (7→8→9 all in top 6) |
| B: Banker hit — pool gap | 2 | R3 (#6,#12 gap), R5 (#10 gap) |
| C: Banker fail + pool gap | 4 | R1 (#11 gap), R2 (#2 gap), R4 (all 3 outside), R6 (all 3 outside) |

### R7 — Pattern A for B (most noteworthy B-specific miss)
Result: NOTTHESILLYONE(#1), HAPPY SHOOTER(#5), GOOD CHAP(#4) — all in B's 6-horse pool {2,4,3,1,7,5}!
But banker #2 NATURAL HIGH finished 4th. This was the exact race Strategy A correctly PASSED. B paid $100 and got nothing — exactly the type of Pattern A loss A's ❌ classification protects against.

### R8 — Pattern A for both A and B
Pool identical {1,14,7,5,8,9}; banker #1 failed. All 3 winners in pool. The $2,650 Trio was right there — just needed any other horse as banker.

---

## Full MC Place% Table — Per Race

*SP = starting price from results JSON. MC Win%/Place% from `simulation_summaries_20260506_ST.md`. **★** = banker (MC #1); **L1…L5** = legs ranked by MC Win% descending; **—** = non-pool starters.*

---

### R1 — C5 | 1650m AWT | Actual: 9→13→11 ❌

**Ticket:** ★ **#1** + legs **#9 → #6 → #12 → #7 → #13** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | HAILTOTHEVICTORS | 43.6% | 81.2% | 6.3 | ✅ | ★ Banker | 4th (SP 6.3) |
| L1 | 9 | MEEPMEEP | 22.5% | 64.5% | 3.8 | ✅ | Leg | **1st** (SP 3.8) |
| L2 | 6 | LUCKY GENERATIONS | 17.1% | 54.5% | 12 | ✅ | Leg | 7th (SP 12) |
| L3 | 12 | PHANTOM CYCLONE | 7.4% | 32.9% | 12 | ✅ | Leg | 9th (SP 12) |
| L4 | 7 | CONCORDE STAR | 3.1% | 19.4% | 70 | ✅ | Leg | 10th (SP 70) |
| L5 | 13 | ORIENTAL SURPRISE | 2.3% | 14.6% | 59 | ✅ | Leg | **2nd** (SP 59) |
| — | 11 | GO GO GO | 2.0% | 15.4% | 3.5 | ❌ | — | **3rd** (SP 3.5) |
| — | 3 | FLOOF | 0.9% | 6.3% | 35 | ❌ | — | 13th (SP 35) |
| — | 2 | SMART CITY | 0.5% | 5.2% | 15 | ❌ | — | 14th (SP 15) |
| — | 10 | HAPPYDEARHAPPYDEER | 0.1% | 1.8% | 12 | ❌ | — | 5th (SP 12) |
| — | 14 | ALL EYES ON ME | 0.1% | 0.8% | 74 | ❌ | — | 8th (SP 74) |
| — | 8 | FORTUNE WARRIOR | 0.2% | 1.1% | 88 | ❌ | — | 11th (SP 88) |
| — | 5 | SPANGLE FORTUNE | 0.2% | 1.6% | 10 | ❌ | — | 12th (SP 10) |
| — | 4 | MEGA FORCE | 0.0% | 0.7% | 28 | ❌ | — | 6th (SP 28) |

**Pattern C** — Banker **HAILTOTHEVICTORS** finished 4th while **MEEPMEEP** (L1 ✓) and **ORIENTAL SURPRISE** (L5 ✓) placed, but **GO GO GO** (rank 7, 2.0% MC) slipped in 3rd at SP 3.5. Two independent failures: wrong banker seat + one tail placer sneaking through the 6-horse cap.

---

### R2 — C5 | 1200m AWT | Actual: 9→10→2 ❌

**Ticket:** ★ **#1** + legs **#6 → #8 → #10 → #9 → #3** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | NOBLE DELUXE | 37.9% | 74.1% | 17 | ✅ | ★ Banker | 10th (SP 17) |
| L1 | 6 | SPICY SPANGLE | 18.2% | 53.0% | 9.1 | ✅ | Leg | 6th (SP 9.1) |
| L2 | 8 | MACANESE MASTER | 14.0% | 48.1% | 9.5 | ✅ | Leg | 4th (SP 9.5) |
| L3 | 10 | VIVA CHALEUR | 12.8% | 44.4% | 3.2 | ✅ | Leg | **2nd** (SP 3.2) |
| L4 | 9 | ROBOT KNIGHT | 7.2% | 30.9% | 5.2 | ✅ | Leg | **1st** (SP 5.2) |
| L5 | 3 | NO OTHER CHOICE | 7.1% | 29.8% | 5.3 | ✅ | Leg | 9th (SP 5.3) |
| — | 7 | TOP TO SKY | 1.3% | 8.8% | 22 | ❌ | — | 7th (SP 22) |
| — | 4 | SHINYU KOKOROE | 0.7% | 4.6% | 36 | ❌ | — | 11th (SP 36) |
| — | 2 | HAPPY ACTION | 0.4% | 3.1% | 15 | ❌ | — | **3rd** (SP 15) |
| — | 5 | VON BAER | 0.3% | 2.7% | 38 | ❌ | — | 5th (SP 38) |
| — | 12 | BINGO BABE | 0.0% | 0.5% | 13 | ❌ | — | 12th (SP 13) |
| — | 11 | BRILLIANT FIRE | 0.0% | 0.1% | 78 | ❌ | — | 8th (SP 78) |

**Pattern C** — Banker **NOBLE DELUXE** (MC 37.9%, SP 17) collapsed to 10th. **ROBOT KNIGHT** (L4 ✓) and **VIVA CHALEUR** (L3 ✓) were in the pool, but **HAPPY ACTION** (rank 9, MC 0.4%) placed 3rd at SP 15. Classic dual failure: wrong banker + tail inclusion. *Note: Strategy A correctly PASSed this race.*

---

### R3 — C4 | 1200m AWT | Actual: 7→6→12 ❌

**Ticket:** ★ **#7** + legs **#4 → #3 → #8 → #5 → #6** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 7 | JUICY DRAGON | 44.2% | 83.0% | 3.0 | ✅ | ★ Banker | **1st** (SP 3.0) |
| L1 | 4 | CLOUD NINE | 30.4% | 73.7% | 4.8 | ✅ | Leg | 4th (SP 4.8) |
| L2 | 3 | SIGHT DREAMER | 10.7% | 44.8% | 10 | ✅ | Leg | 5th (SP 10) |
| L3 | 8 | PERFECT TRIUMPH | 4.7% | 25.6% | 26 | ✅ | Leg | 10th (SP 26) |
| L4 | 5 | KOL | 3.5% | 18.0% | 25 | ✅ | Leg | 12th (SP 25) |
| L5 | 6 | MEGA CAPTAIN | 1.7% | 12.9% | 8.4 | ✅ | Leg | **2nd** (SP 8.4) |
| — | 10 | JOY STAR | 1.7% | 12.4% | 50 | ❌ | — | 11th (SP 50) |
| — | 9 | TOPSPIN KING | 1.0% | 9.2% | 98 | ❌ | — | 9th (SP 98) |
| — | 12 | LAKESHORE HERO | 1.0% | 7.9% | 4.7 | ❌ | — | **3rd** (SP 4.7) |
| — | 2 | VULCANUS | 0.7% | 8.4% | 8.7 | ❌ | — | 7th (SP 8.7) |
| — | 1 | PRESTIGE WIN | 0.2% | 2.3% | 98 | ❌ | — | 6th (SP 98) |
| — | 11 | ZETA HEDGE | 0.1% | 1.8% | 86 | ❌ | — | 8th (SP 86) |

**Pattern B** — Banker **JUICY DRAGON** won as expected and leg **MEGA CAPTAIN** (L5 ✓) was 2nd, but **LAKESHORE HERO** (rank 9, MC 1.0%) came 3rd at SP 4.7 — the market priced it as a strong contender while MC gave it only 7.9% place. The market was right; MC missed this horse completely. Two of three were caught; the third slipped under the 6-horse cap.

---

### R4 — C4 | 1800m AWT | Actual: 9→10→6 ❌

**Ticket:** ★ **#1** + legs **#2 → #3 → #5 → #8 → #4** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | HAPPY UNIVERSE | 38.0% | 72.4% | 15 | ✅ | ★ Banker | 10th (SP 15) |
| L1 | 2 | ENTHRALLED | 17.8% | 48.7% | 3.6 | ✅ | Leg | 5th (SP 3.6) |
| L2 | 3 | FOREVER FOLKS | 11.6% | 38.5% | 16 | ✅ | Leg | 8th (SP 16) |
| L3 | 5 | GLORIOUS SUCCESS | 8.8% | 31.0% | 41 | ✅ | Leg | 9th (SP 41) |
| L4 | 8 | GLORIOUS ST PAUL'S | 5.7% | 22.6% | 91 | ✅ | Leg | 4th (SP 91) |
| L5 | 4 | PERFECT TEAM | 5.3% | 22.2% | 6.5 | ✅ | Leg | 6th (SP 6.5) |
| — | 9 | YODA'S CHOICE | 4.0% | 18.2% | 4.3 | ❌ | — | **1st** (SP 4.3) |
| — | 6 | ARIEL | 3.1% | 16.2% | 13 | ❌ | — | **3rd** (SP 13) |
| — | 7 | THE LION KING | 3.1% | 15.0% | 22 | ❌ | — | 11th (SP 22) |
| — | 11 | VIVA TASTE | 1.4% | 8.3% | 20 | ❌ | — | 7th (SP 20) |
| — | 10 | FIREFOOT | 1.2% | 7.0% | 4.5 | ❌ | — | **2nd** (SP 4.5) |

**Pattern C** — Total collapse. Banker **HAPPY UNIVERSE** (MC 38%, SP 15 at settlement) finished 10th. The entire winning trio — **YODA'S CHOICE** (rank 7, 4.0%), **FIREFOOT** (rank 11, 1.2%), **ARIEL** (rank 8, 3.1%) — sat outside the 6-horse pool, all priced at SP 4.3–13. The market clearly disagreed with MC here; the top-6 MC pool was completely irrelevant to the result. Unpatchable.

---

### R5 — C4 | 1200m AWT | Actual: 10→3→2 ❌

**Ticket:** ★ **#2** + legs **#3 → #1 → #5 → #8 → #4** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | LIGHT YEARS GLORY | 51.2% | 90.0% | 4.6 | ✅ | ★ Banker | **3rd** (SP 4.6) |
| L1 | 3 | ONE MAN SHOW | 28.9% | 78.6% | 8.3 | ✅ | Leg | **2nd** (SP 8.3) |
| L2 | 1 | TOURBILLON GOLFER | 12.8% | 55.8% | 3.3 | ✅ | Leg | 4th (SP 3.3) |
| L3 | 5 | MEGA AWESOME | 1.6% | 16.0% | 25 | ✅ | Leg | 7th (SP 25) |
| L4 | 8 | FLYING SNIPER | 1.6% | 14.6% | 12 | ✅ | Leg | 6th (SP 12) |
| L5 | 4 | DIAMOND SPARKLE | 1.3% | 13.3% | 28 | ✅ | Leg | 5th (SP 28) |
| — | 10 | CALIFORNIA BAY | 0.8% | 8.8% | 3.5 | ❌ | — | **1st** (SP 3.5) |
| — | 7 | SUPREME VOYAGER | 0.8% | 10.0% | 14 | ❌ | — | 8th (SP 14) |
| — | 6 | WORD OF KINDNESS | 0.7% | 8.4% | 71 | ❌ | — | 12th (SP 71) |
| — | 9 | FOREVER FANCY | 0.3% | 3.5% | 22 | ❌ | — | 9th (SP 22) |
| — | 11 | MAGIC SUPER | 0.0% | 0.9% | 177 | ❌ | — | 11th (SP 177) |
| — | 12 | REGROWTH WINNER | 0.0% | 0.2% | 239 | ❌ | — | 10th (SP 239) |

**Pattern B** — Banker **LIGHT YEARS GLORY** placed 3rd and **ONE MAN SHOW** (L1 ✓) was 2nd — two of three covered — but **CALIFORNIA BAY** (#10, rank 8, MC 0.8%) won at SP 3.5. This is the session's starkest market/MC divergence: the market priced CALIFORNIA BAY as a co-favourite (SP 3.5), yet MC gave it only 0.8% Win. Teetan's booking on this horse was a visible signal MC's form model missed entirely.

---

### R6 — C4 | 1650m AWT | Actual: 13→2→1 ❌

**Ticket:** ★ **#6** + legs **#5 → #3 → #11 → #9 → #7** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 6 | NEVER PETER OUT | 50.4% | 81.9% | 5.0 | ✅ | ★ Banker | 5th (SP 5.0) |
| L1 | 5 | BLOSSOMY | 15.6% | 51.5% | 9.1 | ✅ | Leg | 6th (SP 9.1) |
| L2 | 3 | CALIFORNIA STAR | 10.2% | 42.7% | 23 | ✅ | Leg | 10th (SP 23) |
| L3 | 11 | BULL ATTITUDE | 7.4% | 33.1% | 4.0 | ✅ | Leg | 4th (SP 4.0) |
| L4 | 9 | DAILY TROPHY | 6.2% | 28.2% | 32 | ✅ | Leg | 7th (SP 32) |
| L5 | 7 | HINOKAMI KAGURA | 3.5% | 18.2% | 22 | ✅ | Leg | 8th (SP 22) |
| — | 8 | SHOTGUN | 3.1% | 18.1% | 6.2 | ❌ | — | 13th (SP 6.2) |
| — | 4 | LUCK IS BACK | 1.9% | 12.1% | 14 | ❌ | — | 11th (SP 14) |
| — | 10 | LEAPING STAR | 1.1% | 8.3% | 214 | ❌ | — | 9th (SP 214) |
| — | 12 | FASHION LEGEND | 0.3% | 2.5% | 10 | ❌ | — | 12th (SP 10) |
| — | 1 | ALLCASH | 0.1% | 1.0% | 21 | ❌ | — | **3rd** (SP 21) |
| — | 2 | CHILL KAKA | 0.0% | 0.5% | 14 | ❌ | — | **2nd** (SP 14) |
| — | 13 | NIGHT PUROSANGUE | 0.1% | 1.9% | 11 | ❌ | — | **1st** (SP 11) |

**Pattern C (Catastrophic)** — **NEVER PETER OUT** (MC 50.4%) ran 5th — a complete failure by the season's most-confident MC favourite. The three placers — **NIGHT PUROSANGUE** (rank 13, 0.1%), **CHILL KAKA** (rank 13, 0.0%), **ALLCASH** (rank 11, 0.1%) — had a combined MC Win% of 0.2%. This is structurally unfixable under any model: no rational pool construction would have included all three. Trio paid $21,954 and no strategy on the table was close to catching it. Teetan on NIGHT PUROSANGUE was a subtle market signal but at SP 11, not an obvious one either.

---

### R7 — C4 | 1200m AWT | Actual: 1→5→4 ❌

**Ticket:** ★ **#2** + legs **#4 → #3 → #1 → #7 → #5** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | NATURAL HIGH | 27.1% | 61.0% | 6.9 | ✅ | ★ Banker | 9th (SP 6.9) |
| L1 | 4 | GOOD CHAP | 22.7% | 54.8% | 7.4 | ✅ | Leg | **3rd** (SP 7.4) |
| L2 | 3 | FUN N FUN TOGETHER | 11.5% | 36.5% | 6.5 | ✅ | Leg | 4th (SP 6.5) |
| L3 | 1 | NOTTHESILLYONE | 9.8% | 31.9% | 14 | ✅ | Leg | **1st** (SP 14) |
| L4 | 7 | BIGTIME GENERATION | 9.6% | 31.3% | 11 | ✅ | Leg | 5th (SP 11) |
| L5 | 5 | HAPPY SHOOTER | 5.9% | 23.1% | 5.8 | ✅ | Leg | **2nd** (SP 5.8) |
| — | 6 | GOOD LUCK BABE | 5.4% | 22.3% | 12 | ❌ | — | 10th (SP 12) |
| — | 11 | CONRAD THE GREAT | 2.9% | 14.2% | 8.3 | ❌ | — | 6th (SP 8.3) |
| — | 10 | SILVER SPURS | 2.4% | 10.9% | 15 | ❌ | — | 11th (SP 15) |
| — | 8 | MAPOGO | 2.4% | 12.5% | 6.8 | ❌ | — | 7th (SP 6.8) |
| — | 9 | SKY PHOENIX | 0.2% | 1.0% | 36 | ❌ | — | 12th (SP 36) |
| — | 12 | FULL OF LAUGHTER | 0.1% | 0.4% | 113 | ❌ | — | 8th (SP 113) |

**Pattern A** — All three placers — **NOTTHESILLYONE** (L3 ✓), **HAPPY SHOOTER** (L5 ✓), **GOOD CHAP** (L1 ✓) — were inside B's 6-horse pool. But banker **NATURAL HIGH** (MC #1 at 27.1%) finished 9th. Had any leg been designated as banker, this would have been a $8,066 return. This is the single most expensive "right pool, wrong banker" scenario today. *Strategy A correctly PASSed this race; Strategy B paid $100 for nothing.*

---

### R8 — C3 | 1650m AWT | Actual: 7→8→9 ❌

**Ticket:** ★ **#1** + legs **#14 → #7 → #5 → #8 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | TALENTS AMBITION | 46.7% | 80.3% | 9.7 | ✅ | ★ Banker | 9th (SP 9.7) |
| L1 | 14 | SUPREME AGILITY | 17.2% | 54.8% | 34 | ✅ | Leg | 11th (SP 34) |
| L2 | 7 | SKY VINO | 11.8% | 44.2% | 3.9 | ✅ | Leg | **1st** (SP 3.9) |
| L3 | 5 | DRAGON AIR FORCE | 11.6% | 45.0% | 9.9 | ✅ | Leg | 8th (SP 9.9) |
| L4 | 8 | GLITTERING LEGEND | 3.9% | 19.5% | 11 | ✅ | Leg | **2nd** (SP 11) |
| L5 | 9 | ENDEARED | 3.7% | 22.3% | 6.3 | ✅ | Leg | **3rd** (SP 6.3) |
| — | 6 | LOCH TAY | 3.0% | 16.9% | 10 | ❌ | — | 4th (SP 10) |
| — | 11 | NEZHA | 0.8% | 4.6% | 8.1 | ❌ | — | 5th (SP 8.1) |
| — | 10 | NOISY BOY | 0.8% | 5.8% | 52 | ❌ | — | 7th (SP 52) |
| — | 2 | STEPS AHEAD | 0.2% | 3.3% | 36 | ❌ | — | 12th (SP 36) |
| — | 3 | SWORD POINT | 0.2% | 1.2% | 6.3 | ❌ | — | 10th (SP 6.3) |
| — | 13 | TURIN MASCOT | 0.1% | 0.7% | 19 | ❌ | — | 6th (SP 19) |
| — | 12 | FORTUNATE SON | 0.1% | 1.4% | — | ❌ | — | (not listed in top) |
| — | 4 | WINNING DRAGON | 0.0% | 0.1% | 101 | ❌ | — | 13th (SP 101) |

**Pattern A** — The three placers **SKY VINO** (L2 ✓), **GLITTERING LEGEND** (L4 ✓), **ENDEARED** (L5 ✓) were all inside the pool. Banker **TALENTS AMBITION** (MC 46.7%) collapsed to 9th — Moreira's booking on SKY VINO (rank 3, MC 11.8%) was the winning call that the standard banker selection rule missed. If SKY VINO had been elevated to banker via jockey boost, this $2,650 Trio was ours.

---

### R9 — C3 | 1200m AWT | Actual: 7→2→4 ✅

**Ticket:** ★ **#2** + legs **#11 → #5 → #4 → #7 → #1** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | VICTORY SKY | 49.4% | 85.2% | 4.4 | ✅ | ★ Banker | **2nd** (SP 4.4) |
| L1 | 11 | TARGET AUDIENCE | 21.3% | 64.7% | 6.2 | ✅ | Leg | 5th (SP 6.2) |
| L2 | 5 | SYMBOL OF STRENGTH | 8.4% | 38.6% | 33 | ✅ | Leg | 8th (SP 33) |
| L3 | 4 | AURORA PATCH | 8.3% | 37.0% | 5.8 | ✅ | Leg | **3rd** (SP 5.8) |
| L4 | 7 | BLAZING WIND | 6.8% | 34.8% | 3.2 | ✅ | Leg | **1st** (SP 3.2) |
| L5 | 1 | ROMANTIC SON | 5.2% | 29.3% | 20 | ✅ | Leg | 11th (SP 20) |
| — | 8 | MUST GO | 0.3% | 3.6% | 13 | ❌ | — | 6th (SP 13) |
| — | 3 | GALACTIC VOYAGE | 0.3% | 3.8% | 14 | ❌ | — | 10th (SP 14) |
| — | 6 | CITY GOLD BANNER | 0.1% | 2.1% | 71 | ❌ | — | 9th (SP 71) |
| — | 9 | SUPER JOY N FUN | 0.0% | 0.8% | 14 | ❌ | — | 4th (SP 14) |
| — | 10 | HIGH PRAISE | 0.0% | 0.1% | 54 | ❌ | — | 12th (SP 54) |
| — | 12 | GIANT SPIRIT | 0.0% | 0.0% | 45 | ❌ | — | 7th (SP 45) |

**Hit ✅** — **BLAZING WIND** (L4 ✓) stormed to victory with Purton, **VICTORY SKY** (banker ✓) placed 2nd, and **AURORA PATCH** (L3 ✓) completed the trio in 3rd. The model worked exactly as designed: dominant banker correctly identified, clean top-5 pool covering all three placers, Purton's booking on the rank-4 horse validated. Trio $475 return on $100 stake = +$375.

---

## B Banker Performance

| Race | B Banker | MC Win% | SP | Placed? | Position |
|------|---------|---------|-----|---------|----------|
| R1 | #1 HAILTOTHEVICTORS | 43.6% | 6.3 | ❌ | 4th |
| R2 | #1 NOBLE DELUXE | 37.9% | — | ❌ | >4th |
| R3 | #7 JUICY DRAGON | 44.2% | 3.0 | ✅ | **1st** |
| R4 | #1 HAPPY UNIVERSE | 38.0% | ~7.0 | ❌ | >4th |
| R5 | #2 LIGHT YEARS GLORY | 51.2% | 4.6 | ✅ | **3rd** |
| R6 | #6 NEVER PETER OUT | 50.4% | ~5.5 | ❌ | >4th |
| R7 | #2 NATURAL HIGH | 27.1% | — | ❌ | 4th |
| R8 | #1 TALENTS AMBITION | 46.7% | 3.9 | ❌ | >4th |
| R9 | #2 VICTORY SKY | 49.4% | 4.4 | ✅ | **2nd** |

**B Banker top 3 rate: 3/9 = 33.3%** — well below the 45.9% season average for B. An extremely poor day for high-confidence MC favourites on AWT.
