# Trio Review — No SCMP (15 Mar 2026, Sha Tin)

**Purpose:** Review today’s Trio suggestions with **all SCMP factors removed** — pool and banker from raw MC only, then compare to actual results.

**Results source:** `data/historical/results_20260315_ST.json`  
**Full-pipeline reports:** `data/reports/trio_strategy_20260315_ST_R1.md` … `_R11.md`  
**Full-pipeline review:** `data/reviews/trio_review_20260315_ST.md`

---

## 1. What was suggested today (full pipeline, with SCMP)

The live suggestions used:

- **MC simulation** (10k runs) + **jockey boost** (by season win%) + **SCMP form adjustments** (excuses, trial, draw, vet, -perf, etc.)
- **Adjusted Win% / Place%** to pick pool and banker
- **No debutant as banker** (e.g. R7: #2 PAPAYA BROSE was Adj #1 but debutant → banker was #10 THUNDER PRINCE)
- **Mode A/B** (R3 tight 5-horse pool $60; rest 6-horse 膽拖 $100)
- **Pool selection** by classification (Dominant / Competitive / Wide open)

| Metric | Full pipeline (with SCMP) |
|--------|----------------------------|
| Races played | 11 |
| Hit rate | **2/11 (18.2%)** |
| Total staked | $1,060 |
| Total returned | $290 |
| **Net P&L** | **−$770** |
| **ROI** | −72.6% |

**Hits:** R2, R10. **Notable misses:** R7 (banker #10 4th; 1-12-2 all in legs), R8 (banker #2 4th; 8-7-4 all in legs), R11 (banker #1 not in frame; 7-2-11 all in legs).

---

## 2. No-SCMP rule (what we review here)

**All SCMP and jockey-based overrides removed:**

- **Pool:** First **6** horses by **raw MC Win%** (from “MC SIMULATION (raw)” in the strategy reports). No Adj Win/Place, no SCMP flags, no classification.
- **Banker:** MC rank **#1** only. No “no debutant as banker” swap.
- **Stake:** 膽拖 1 banker + 5 legs → 10 combinations @ $10/unit = **$100 per race** (all 11 races; no Mode A tight pool).

So for each race we only use the raw Monte Carlo ranking; no SCMP form, no jockey boost, no vet/trial/draw adjustments in selection.

---

## 3. Race-by-race: No-SCMP vs result

| Race | MC top 6 (raw) | Banker | Result (1→2→3) | Hit? | Pool gap | Banker hit | Trio $ | Return ($) | Stake ($) | P&L ($) |
|------|----------------|--------|----------------|------|----------|------------|--------|------------|-----------|---------|
| R1 | 2, 6, 5, 12, 7, 13 | 2 | 13-9-14 | No | 9(MC: 7), 14(MC: 13) | ❌ | 2,479 | 0 | 100 | −100 |
| R2 | 8, 9, 5, 3, 4, 6 | 8 | 9-8-3 | **Yes** | — | ✅ | 168 | 168 | 100 | +68 |
| R3 | 1, 8, 5, 2, 12, 7 | 1 | 4-9-1 | No | 4(MC: 12), 9(MC: 7) | ✅ | 6,971 | 0 | 100 | −100 |
| R4 | 1, 4, 12, 2, 11, 9 | 1 | 5-12-4 | No | 5(MC: 12) | ❌ | 744 | 0 | 100 | −100 |
| R5 | 12, 13, 11, 5, 7, 10 | 12 | 1-5-11 | No | 1(MC: 12) | ❌ | 3,390 | 0 | 100 | −100 |
| R6 | 8, 2, 1, 12, 7, 5 | 8 | 3-10-2 (DH 1st) | No | 3(MC: 9), 10(MC: 8) | ❌ | 2,099 | 0 | 100 | −100 |
| R7 | 2, 10, 12, 7, 1, 4 | 2 | 1-12-2 | **Yes** | — | ✅ | 183 | 183 | 100 | +83 |
| R8 | 4, 2, 5, 7, 12, 8 | 4 | 8-7-4 | **Yes** | — | ✅ | 765 | 765 | 100 | +665 |
| R9 | 9, 3, 10, 12, 5, 2 | 9 | 5-3-13 | No | 13(MC: 10) | ❌ | 701 | 0 | 100 | −100 |
| R10 | 4, 9, 2, 3, 7, 6 | 4 | 4-9-3 | **Yes** | — | ✅ | 122 | 122 | 100 | +22 |
| R11 | 1, 8, 7, 2, 11, 4 | 1 | 7-2-11 | No | — | ❌ | 182 | 0 | 100 | −100 |

---

## 4. No-SCMP summary

| Metric | No-SCMP (MC top 6, #1 banker) |
|--------|-------------------------------|
| **Hits** | **4 / 11 (36.4%)** |
| Total staked | $1,100 |
| Total returned | $1,238 |
| **Net P&L** | **+$138** |
| **ROI** | +12.5% |

**Hits:** R2, R7, R8, R10.

---

## 5. Full pipeline vs No-SCMP (today only)

| | Full pipeline (with SCMP) | No-SCMP (MC only) |
|---|---------------------------|---------------------|
| **Hits** | 2/11 | 4/11 |
| **Staked** | $1,060 | $1,100 |
| **Returned** | $290 | $1,238 |
| **P&L** | **−$770** | **+$138** |
| **ROI** | −72.6% | +12.5% |

**Differences that mattered today:**

- **R7:** Full pipeline used #10 as banker (debutant #2 not allowed as banker). #10 finished 4th → miss. No-SCMP used #2 as banker; #2 was 3rd → **hit** (+$183).
- **R8:** Full pipeline had #2 as banker (2nd by Adj); #2 finished 4th → miss. No-SCMP had #4 as banker (MC #1); #4 was 3rd → **hit** (+$765).
- **R11:** Both had #1 as banker. #1 was 11th → miss either way. No-SCMP did not gain here.

So on this day, **dropping SCMP/jockey overrides and using raw MC top 6 + #1 banker** would have given **2 extra hits (R7, R8)** and turned a **−$770** session into **+$138**. Single-meeting result; more meetings would be needed to judge robustness.

---

## 6. Conclusion

- **Today’s Trio suggestions (with SCMP):** 2/11 hits, −$770.
- **Same day with SCMP removed (MC top 6, #1 banker):** 4/11 hits, +$138.
- The no-SCMP version did not use: SCMP form adjustments, jockey boost, “no debutant as banker”, Mode A/B pool sizing, or classification. Only raw MC ranking was used for pool and banker.

Recommendation: keep tracking both full-pipeline and no-SCMP (or similar MC-only) outcomes over more meetings to see whether SCMP/jockey rules add value or add noise on average.
