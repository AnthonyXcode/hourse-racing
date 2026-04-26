# Trio Post-Race Review — 26 Apr 2026 Sha Tin (Meeting 8)

**Date:** 2026-04-26 | **Venue:** Sha Tin | **Races:** 11 | **Going:** Good to Firm | **Surface:** Turf
**Feature races:** Champions Day — R5 Chairman's Sprint Prize (G1), R7 FWD Champions Mile (G1), R9 FWD QEII Cup (G1)
**MC runs:** Regenerated with `--ignore-records 20260426` (excludes same-day results from MC input)

---

## 1 · Executive Summary

| Metric | Strategy A | Strategy B |
|--------|-----------|-----------|
| Hits | 1/11 (R2) | 2/11 (R2, R11) |
| Staked | $710 | $1,190 |
| Returned | $166 | $342 |
| **P&L** | **−$544** | **−$848** |
| **ROI** | **−76.6%** | **−71.3%** |

Champions Day remains a losing session for both strategies, but significantly improved from the old MC runs (old: A 0/11 −$630, B 1/11 −$964). The `--ignore-records` fix changed MC #1 bankers in R2 (#4→#6), R3 (#3→#13), R4 (#3→#5), R6 (#3→#6) — all of R2/R3/R4's new bankers placed top 3. Strategy A converted R2 into a hit (+$66); Strategy B added R2 on top of R11 (+$142 total). Banker top-3 rate jumped from 27.3% to **54.5%** (6/11). The G1 international races (R5, R7, R9) still returned nothing despite R5 and R9 bankers winning.

---

## 2 · Race-by-Race Detail

### R1 — Class 4 · 1200m Turf · Trio $640

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #5 THE HEIR, #11 PRESTIGE HALL | #2, #4, #13 | 雙膽拖 | 3 | $30 |
| **B** | #5 THE HEIR | #11, #2, #13, #9, #1 | 膽拖 | 10 | $100 |

**Result:** 13 PACKING KING → 9 LUCRATIVE EIGHT → 10 NAVAS G (16x)
**A:** ❌ Both bankers fail (#5 5th, #11 8th). #13 in legs but #9, #10 outside pool.
**B:** ❌ Banker #5 5th. #13 ✓ #9 ✓ but #10 outside pool (debutant, MC 0%).
**Miss pattern:** A = C (both bankers fail + pool gap) | B = C (banker fail + pool gap #10)

---

### R2 — Class 4 · 1600m Turf · Trio $166

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #6 BIG RETURN | #7, #4, #1, #8, #11 | 膽拖 | 10 | $100 |
| **B** | #6 BIG RETURN | #7, #4, #1, #9, #11 | 膽拖 | 10 | $100 |

**Result:** 6 BIG RETURN → 7 JOLLY BRILLIANT → 1 TURIN CHAMPIONS
**A:** ✅ **HIT!** Banker #6 wins. Combo 6-7-1 ✓. Return **$166** on $100 stake.
**B:** ✅ **HIT!** Banker #6 wins. Combo 6-7-1 ✓. Return **$166** on $100 stake.
**Note:** Old MC had #4 AESTHETICISM as banker — ran 9th. The `--ignore-records` fix correctly identified #6 BIG RETURN (MC 28.7%) as #1 by Win%.

---

### R3 — Class 4 · 1200m Turf · Trio $243

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #13 BETTER AND BETTER | #3, #4, #14, #2, #1 | 膽拖 | 10 | $100 |
| **B** | #13 BETTER AND BETTER | #3, #4, #14, #2, #1, #9 | 膽拖 | 15 | $150 |

**Result:** 2 MR INCREDIBLE → 13 BETTER AND BETTER → 6 SOLID CAR
**A:** ❌ Banker #13 placed 2nd ✅. #2 in legs ✓. But #6 SOLID CAR not in legs.
**B:** ❌ Banker #13 placed 2nd ✅. #2 in legs ✓. But #6 SOLID CAR not in B pool either.
**Miss pattern:** A = B (banker hit, pool gap #6) | B = B (banker hit, pool gap #6)
**Note:** Old MC had #3 HAYDAY as banker — ran 5th. New banker #13 placed 2nd.

---

### R4 — Class 4 · 1400m Turf · Trio $4,397

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #5 KING DANCE, #3 ROBOT STAR | #7, #4, #14 | 雙膽拖 | 3 | $30 |
| **B** | #5 KING DANCE | #3, #7, #4, #10, #9, #12 | 膽拖 | 15 | $150 |

**Result:** 5 KING DANCE (6.1x) → 4 NYX GLUCK (11x) → 14 STAR FIGURE (54x)
**A:** ❌ Banker #5 wins ✅! **All 3 placers (#5, #4, #14) in the 5-horse pool.** But 雙膽拖 locked every combo to include #3 (who ran 7th). → **$4,397 missed** due to structure.
**B:** ❌ Banker #5 wins ✅! #4 in legs ✓. But **#14 STAR FIGURE** replaced by #9 via Step B. Pool gap.
**Miss pattern:** A = **Pattern A structural** (all 3 in pool, 雙膽拖 killed it) | B = B (banker hit, pool gap #14)
**Note:** Old MC had #3 ROBOT STAR as banker — ran 7th. New banker #5 KING DANCE **won**. The day's most painful structural miss: a 膽拖 with #5 as sole banker would have hit.

---

### R5 — Group 1 · Chairman's Sprint Prize · 1200m Turf · Trio $208

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #1 KA YING RISING | #3, #4, #7, #5, #8 | 膽拖 | 10 | $100 |
| **B** | #1 KA YING RISING | #3, #4, #7, #5, #8 | 膽拖 | 10 | $100 |

**Result:** 1 KA YING RISING (1.0x) → 2 SATONO REVE (90x) → 5 RAGING BLIZZARD (345x)
**A:** ❌ Banker #1 wins ✅! #5 in legs ✓. But #2 (90x Japanese raider) outside pool.
**B:** ❌ Banker #1 wins ✅! #5 in legs ✓. But #2 (90x) outside pool.
**Miss pattern:** A = B (banker hit, pool gap #2) | B = B (banker hit, pool gap #2)

---

### R6 — Class 3 · 1200m Turf · Trio $787

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #6 LIFELINE EXPRESS, #5 COOL BOY | #3, #13, #8, #9 | 雙膽拖 | 4 | $40 |
| **B** | #6 LIFELINE EXPRESS | #5, #3, #13, #4, #2, #8 | 膽拖 | 15 | $150 |

**Result:** 4 GENEVA (3.9x) → 13 THUNDER KIT (8.4x) → 14 LUCKY CANDY (23x)
**A:** ❌ Both bankers fail (#6 11th, #5 4th). #13 in legs ✓ but #4, #14 outside pool.
**B:** ❌ Banker #6 11th. #13 ✓ #4 ✓ but #14 outside pool.
**Miss pattern:** A = C (both bankers fail + pool gap) | B = C (banker fail + pool gap #14)
**Note:** Old MC had #3 CELESTIAL HERO as primary banker — ran 6th. New banker #6 LIFELINE EXPRESS also failed (11th).

---

### R7 — Group 1 · FWD Champions Mile · 1600m Turf · Trio $6,045

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #10 INVINCIBLE IBIS | #4, #5, #14, #12, #7 | 膽拖 | 10 | $100 |
| **B** | #10 INVINCIBLE IBIS | #12, #4, #5, #14, #1 | 膽拖 | 10 | $100 |

**Result:** 5 MY WISH (5.4x) → 9 CAP FERRAT (37x) → 3 DOCKLANDS (19x)
**A:** ❌ Banker #10 4th (missed by 0.01s!). #5 in legs ✓ but #9, #3 outside pool.
**B:** ❌ Banker #10 4th. #5 in legs ✓ but #9, #3 outside pool.
**Miss pattern:** A = C (banker fail + pool gap) | B = C (banker fail + pool gap)
**Note:** $6,045 — day's biggest Trio. MC unreliable for international fields.

---

### R8 — Class 3 · 1400m Turf · Trio $526

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #10 AEROINVINCIBLE | #1, #9, #4, #7 | 膽拖 | 6 | $60 |
| **B** | #10 AEROINVINCIBLE | #1, #9, #4, #7 | 膽拖 | 6 | $60 |

**Result:** 9 MIGHTY COMMANDER (18x) → 1 HELENE SUPAFEELING (5.9x) → 4 FIT FOR BEAUTY (3.4x)
**A:** ❌ Banker #10 4th (by 0.02s!). **All 3 placers (#9, #1, #4) in legs.** → $526 missed.
**B:** ❌ Banker #10 4th. **All 3 placers (#1, #9, #4) in pool!** → $526 missed.
**Miss pattern:** A = **Pattern A** (banker fail, all 3 in pool) | B = **Pattern A**

---

### R9 — Group 1 · FWD QEII Cup · 2000m Turf · Trio $35

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #2 ROMANTIC WARRIOR, #8 MASQUERADE BALL | #7, #4, #3 | 雙膽拖 | 3 | $30 |
| **B** | #2 ROMANTIC WARRIOR | #8, #7, #1 | 膽拖 | 3 | $30 |

**Result:** 2 ROMANTIC WARRIOR (1.3x) → 1 MASQUERADE BALL (5.6x) → 4 SOSIE (8.2x)
**A:** ❌ Banker #2 wins ✅! Co-banker #8 6th ❌. #4 in legs ✓ but combo requires #8.
**B:** ❌ Banker #2 wins ✅! #1 in legs ✓ (Step B add) but #4 NOT in legs. Pool gap.
**Miss pattern:** A = C (co-banker fail) | B = B (banker hit, pool gap #4)

---

### R10 — Class 3 · 1600m Turf · Trio $484

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #9 THE GOLDEN KNIGHT | #5, #8, #13, #4 | 膽拖 | 6 | $60 |
| **B** | #9 THE GOLDEN KNIGHT | #5, #8, #13, #10, #3, #6 | 膽拖 | 15 | $150 |

**Result:** 8 BLAZING WUKONG (6.8x) → 5 LOVERO (7.9x) → 3 ENDUED (5.5x)
**A:** ❌ Banker #9 11th. #8 ✓ #5 ✓ but #3 outside pool.
**B:** ❌ Banker #9 11th. **All 3 (#8, #5, #3) in pool!** → $484 missed.
**Miss pattern:** A = C (banker fail + pool gap #3) | B = **Pattern A** (banker fail, all 3 in pool)

---

### R11 — Class 2 · 1400m Turf · Trio $176

| | Banker(s) | Legs | Structure | Combos | Stake |
|---|-----------|------|-----------|--------|-------|
| **A** | #12 MIGHTY MASTS | #9, #11, #7, #2 | 膽拖 | 6 | $60 |
| **B** | #12 MIGHTY MASTS | #9, #11, #7, #2, #5 | 膽拖 | 10 | $100 |

**Result:** 5 WINNING OVATION (4.0x) → 9 SIX PACK (7.7x) → 12 MIGHTY MASTS (4.0x)
**A:** ❌ Banker #12 3rd ✅. #9 in legs ✓. But #5 not in pool.
**B:** ✅ **HIT!** Banker #12 3rd ✅. Legs: #5 (1st) ✓, #9 (2nd) ✓. Return = **$176**.
**Miss pattern (A):** B (banker hit, pool gap #5 — excluded by A's tighter threshold)

---

## 3 · Strategy A — Miss Pattern Analysis

| Pattern | Count | Races | Missed Value |
|---------|-------|-------|-------------|
| **A — All 3 in pool, structural miss** | 2 | R4, R8 | $4,923 |
| **B — Banker hit, pool gap** | 4 | R3, R5, R9, R11 | $662 |
| **C — Banker fail + pool gap** | 4 | R1, R6, R7, R10 | — |
| **Hit** | 1 | R2 | +$166 |
| **Total** | **11** | | |

**Pattern A structural misses dominate the forfeited value.** R4's $4,397 is the biggest single miss in the campaign — all 3 placers inside the 5-horse pool, but the 雙膽拖 format locked every combo to include #3 ROBOT STAR (7th). R8's $526 was the closest: banker #10 AEROINVINCIBLE missed 3rd by 0.02s with all 3 placers in legs.

---

## 4 · Strategy B — Miss Pattern Analysis

| Pattern | Count | Races | Missed Value |
|---------|-------|-------|-------------|
| **A — Banker fail, all 3 in pool** | 2 | R8, R10 | $1,010 |
| **B — Banker hit, pool gap** | 4 | R3, R4, R5, R9 | $4,923 |
| **C — Banker fail + pool gap** | 3 | R1, R6, R7 | — |
| **Hit** | 2 | R2, R11 | +$342 |
| **Total** | **11** | | |

Strategy B's 4 Pattern B misses total $4,923 in forfeited dividends — dominated by R4's $4,397 where Step B replaced #14 STAR FIGURE with #9 DAILY ACCLAIM. Pattern A (2 misses) would have added $1,010 if the banker had held.

---

## 5 · Banker Performance

### Strategy A/B — Primary Banker (MC #1 by Win%)

| Race | Horse | MC Win% | MC Place% | Finish | Top 3? | SP |
|------|-------|---------|-----------|--------|--------|----|
| R1 | #5 THE HEIR | 47.1% | 86.3% | 5th | ❌ | 8.6x |
| R2 | #6 BIG RETURN | 28.7% | 63.9% | **1st** | ✅ | 3.6x |
| R3 | #13 BETTER AND BETTER | 34.3% | 70.3% | **2nd** | ✅ | 6.2x |
| R4 | #5 KING DANCE | 36.1% | 74.4% | **1st** | ✅ | 6.1x |
| R5 | #1 KA YING RISING | 37.1% | 75.8% | **1st** | ✅ | 1.0x |
| R6 | #6 LIFELINE EXPRESS | 32.2% | 71.4% | 11th | ❌ | 11x |
| R7 | #10 INVINCIBLE IBIS | 24.1% | 57.2% | 4th | ❌ | 9.8x |
| R8 | #10 AEROINVINCIBLE | 48.2% | 83.0% | 4th | ❌ | 6.9x |
| R9 | #2 ROMANTIC WARRIOR | 49.5% | 92.2% | **1st** | ✅ | 1.3x |
| R10 | #9 THE GOLDEN KNIGHT | 42.7% | 78.2% | 11th | ❌ | 7.1x |
| R11 | #12 MIGHTY MASTS | 51.2% | 83.9% | **3rd** | ✅ | 4.0x |

**Primary banker top-3 rate: 6/11 (54.5%)** — back to campaign average (~49%). Major improvement from old MC (3/11 = 27.3%).

### Co-Banker Performance (Strategy A 雙膽拖 races)

| Race | Horse | Finish | Top 3? |
|------|-------|--------|--------|
| R1 | #11 PRESTIGE HALL | 8th | ❌ |
| R4 | #3 ROBOT STAR | 7th | ❌ |
| R6 | #5 COOL BOY | 4th | ❌ |
| R9 | #8 MASQUERADE BALL | 6th | ❌ |

**Co-banker top-3 rate: 0/4 (0%)**
**Both bankers top 3 (needed for 雙膽拖): 0/4 (0%)** — zero 雙膽拖 would have hit even with perfect legs.

---

## 6 · Pool Coverage

### How many of the actual top 3 were in each strategy's pool?

| Race | Result | Trio $ | A Pool Covered | B Pool Covered |
|------|--------|--------|---------------|---------------|
| R1 | 13→9→10 | $640 | 1/3 (#13) | 2/3 (#13, #9) |
| R2 | 6→7→1 | $166 | **3/3 ✅** | **3/3 ✅** |
| R3 | 2→13→6 | $243 | 2/3 (#13, #2) | 2/3 (#13, #2) |
| R4 | 5→4→14 | $4,397 | **3/3** (but 雙膽拖!) | 2/3 (#5, #4) |
| R5 | 1→2→5 | $208 | 2/3 (#1, #5) | 2/3 (#1, #5) |
| R6 | 4→13→14 | $787 | 1/3 (#13) | 2/3 (#13, #4) |
| R7 | 5→9→3 | $6,045 | 1/3 (#5) | 1/3 (#5) |
| R8 | 9→1→4 | $526 | **3/3** | **3/3** |
| R9 | 2→1→4 | $35 | 2/3 (#2, #4) | 2/3 (#2, #1) |
| R10 | 8→5→3 | $484 | 2/3 (#8, #5) | **3/3** |
| R11 | 5→9→12 | $176 | 2/3 (#12, #9) | **3/3 ✅** |

**A: Full coverage 3/11 (27.3%)** — but only R2 converted (R4 雙膽拖, R8 banker fail)
**B: Full coverage 4/11 (36.4%)** — R2 and R11 converted (R8, R10 banker fail)

---

## 7 · G1 Races Analysis

| Race | Event | Banker | Finish | Result Notes |
|------|-------|--------|--------|-------------|
| R5 | Chairman's Sprint | #1 KA YING RISING | **1st** | 2nd/3rd were 90x and 345x internationals |
| R7 | Champions Mile | #10 INVINCIBLE IBIS | 4th | #5 MY WISH won at 5.4x; international raiders filled frame |
| R9 | QEII Cup | #2 ROMANTIC WARRIOR | **1st** | French/Japanese runners in 2nd-3rd |

- Combined G1 stake: A = $230, B = $230. Combined return: $0.
- Banker placement: 2/3 won, but co-finishers were always international raiders MC cannot model.
- **Takeaway:** G1 international races remain structurally hostile to the Trio strategy.

---

## 8 · Near-Misses

| Race | What happened | How close | Value missed |
|------|--------------|-----------|-------------|
| R4 | **All 3 in A's pool**, 雙膽拖 blocked | #3 co-banker 7th | **$4,397** (A only) |
| R8 | #10 AEROINVINCIBLE 4th by 0.02s | 1 length | $526 (A+B) |
| R7 | #10 INVINCIBLE IBIS 4th by 0.01s | Nose | $6,045 (but pool gap regardless) |

R4 is the session's defining structural miss: the new MC correctly picked the winner (#5), had all 3 placers in its 5-horse pool, but the 雙膽拖 format wasted a $4,397 hit.

---

## 9 · Confidence vs Outcome

| Classification | Races | A Hits | B Hits | Pattern A Misses |
|---------------|-------|--------|--------|-----------------|
| Dominant (Mode A) | 3 (R1, R4, R8) | 0 | 0 | R4, R8 ($4,923) |
| Competitive (Mode B) | 6 (R2, R3, R5, R6, R10, R11) | 1 (R2) | 2 (R2, R11) | — |
| Wide Open / PASS | 2 (R7, R9) | 0 | 0 | — |

Dominant races went 0/3 for both strategies — the 雙膽拖 structure in R4 and banker failure in R8 were the killers. Competitive races outperformed with the new MC: 1/6 (A) and 2/6 (B).

---

## 10 · Meeting-by-Meeting P&L

### 10a · Strategy A

| M# | Date | Venue | Races | A Hits | A Staked | A Returned | A P&L | A ROI |
|----|------|-------|-------|--------|----------|------------|-------|-------|
| 1 | 18 Mar | HV | 8 | 0/8 | $777 | $0 | −$777 | −100% |
| 2 | 22 Mar | ST | 11 | 2/11 | $778 | $818 | +$40 | +5.1% |
| 3 | 25 Mar | HV | 8 | 0/8 | $440 | $0 | −$440 | −100% |
| 4 | 29 Mar | ST | 8 | 1/8 | $560 | $1,274 | +$714 | +127% |
| 5 | 01 Apr | ST | 11 | 1/11 | $700 | $108 | −$592 | −85% |
| 6 | 06 Apr | ST | 11 | 1/11 | $780 | $68 | −$712 | −91% |
| 7 | 22 Apr | HV | 9 | 2/9 | $477 | $2,408 | +$1,931 | +405% |
| **8** | **26 Apr** | **ST** | **11** | **1/11** | **$710** | **$166** | **−$544** | **−76.6%** |

### 10b · Strategy B

| M# | Date | Venue | Races | B Hits | B Staked | B Returned | B P&L | B ROI |
|----|------|-------|-------|--------|----------|------------|-------|-------|
| 1 | 18 Mar | HV | 8 | 1/8 | $840 | $90 | −$750 | −89% |
| 2 | 22 Mar | ST | 11 | 2/11 | $1,090 | $1,220 | +$130 | +12% |
| 3 | 25 Mar | HV | 8 | 1/8 | $640 | $390 | −$250 | −39% |
| 4 | 29 Mar | ST | 8 | 2/8 | $1,010 | $1,580 | +$570 | +56% |
| 5 | 01 Apr | ST | 11 | 1/11 | $1,350 | $376 | −$974 | −72% |
| 6 | 06 Apr | ST | 11 | 1/11 | $1,190 | $886 | −$304 | −26% |
| 7 | 22 Apr | HV | 9 | 2/9 | $760 | $2,934 | +$2,174 | +286% |
| **8** | **26 Apr** | **ST** | **11** | **2/11** | **$1,190** | **$342** | **−$848** | **−71.3%** |

### 10c · Cumulative A/B Comparison

| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | 8 | 8 | — |
| Total races | 82 | 82 | 0 |
| Hits (rate) | 8/82 (9.8%) | 12/82 (14.6%) | B +4 |
| Total staked | $5,852 | $9,210 | B +$3,358 |
| Total returned | $4,212 | $6,642 | B +$2,430 |
| **Cumulative P&L** | **−$1,640** | **−$2,568** | **A +$928** |
| **Cumulative ROI** | **−28.0%** | **−27.9%** | **B +0.1pp** |
| Banker top 3 rate | 41/82 (50.0%) | 41/82 (50.0%) | Same |

After 8 meetings, both strategies remain in drawdown but improved vs old MC. The 22 Apr recovery (+$1,931 A / +$2,174 B) has been partially erased. A's cumulative ROI dropped from −21.3% to −28.0%; B from −21.5% to −27.9%. Strategies are nearly identical on ROI. Banker top-3 rate recovered to 50.0% (from 46.3% with old MC).

---

## 11 · Learnings

### What Worked

1. **`--ignore-records` fix dramatically improved banker selection.** The 3 changed bankers (R2 #6 BIG RETURN, R3 #13 BETTER AND BETTER, R4 #5 KING DANCE) all placed top 3 — converting one miss to a hit and correctly identifying 2 winners. Banker top-3 rate: 54.5% (vs 27.3% old MC).
2. **Strategy B's wider pool paid off in R11:** The inclusion of #5 WINNING OVATION (market favourite at 4.0x) was the difference between $0 and $176 return.
3. **Pool construction correctly identified value legs in R2, R4, R8:** All three placers were inside the pool — the bet structure (雙膽拖 in R4) was the failure, not the horse selection.

### What Didn't Work

1. **雙膽拖 went 0/4 — zero double-banker tickets would have hit:** R4's 雙膽拖 is the most painful: all 3 placers in pool but the structure forfeited $4,397. R1, R6, R9 also failed.
2. **International G1 fields broke the Trio model:** R5's 2nd and 3rd were 90x and 345x overseas raiders. R7's top 3 included international horses MC couldn't calibrate. R9's 3rd was a French runner.
3. **R6 and R10 bankers collapsed:** #6 LIFELINE EXPRESS (11th) and #9 THE GOLDEN KNIGHT (11th) were not close calls — they ran badly despite high MC confidence.

### Strategy Adjustments

- [ ] **Consider skipping 雙膽拖 or requiring both bankers SP < 5.0x:** Campaign 雙膽拖 hit rate continues to decline. R4's structural miss ($4,397) is the strongest argument for 膽拖 over 雙膽拖.
- [ ] **Consider reducing G1 international race stakes to minimum:** 3 G1 races cost $230 (A) / $230 (B) for $0 return.
- [ ] **Validate `--ignore-records` as standard practice:** The fix produced better banker picks in this meeting. Should be applied to all future regenerations of past meetings.

---

## Files

- Results: `data/historical/results_20260426_ST.json`
- Strategy reports: `data/reports/trio_strategy_20260426_ST_R1.md` … `R11.md` (regenerated with `--ignore-records 20260426`)
- Strategy B review: `data/reviews/trio_review_stratC_20260426_ST.md`
- Previous review: `data/reviews/trio_review_20260422_HV.md`

*Generated after meeting — for post-race learning, not betting advice.*
