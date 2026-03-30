# Trio Test: MC Top 6 + #1 as Banker (15 Mar 2026, Sha Tin)

## Methodology

- **Pool:** First 6 horses by **raw MC Win%** (from “MC SIMULATION (raw)” in strategy reports), no SCMP/jockey adjustments.
- **Banker:** MC rank #1 (no “no debutant as banker” rule).
- **Bet type:** 膽拖 — 1 banker + 5 legs → 10 combinations @ $10/unit = **$100 per race**.
- **Hit rule:** We win only if the banker is in the actual top 3 **and** all three placers are in our 6-horse pool (so banker + 2 legs form the winning trio).

---

## Race-by-race results

| Race | MC top 6 (by Win%) | Banker | Result (1→2→3) | Hit? | Pool gap | Banker hit | Trio $ | Return ($) | Stake ($) | P&L ($) |
|------|--------------------|--------|----------------|------|----------|------------|--------|------------|-----------|---------|
| R1   | 2, 6, 5, 12, 7, 13 | 2      | 13-9-14        | No   | 9(MC: 7), 14(MC: 13) | ❌ | 2,479 | 0 | 100 | −100 |
| R2   | 8, 9, 5, 3, 4, 6   | 8      | 9-8-3          | **Yes** | — | ✅ | 168 | 168 | 100 | +68 |
| R3   | 1, 8, 5, 2, 12, 7  | 1      | 4-9-1          | No   | 4(MC: 12), 9(MC: 7) | ✅ | 6,971 | 0 | 100 | −100 |
| R4   | 1, 4, 12, 2, 11, 9 | 1      | 5-12-4         | No   | 5(MC: 12) | ❌ | 744 | 0 | 100 | −100 |
| R5   | 12, 13, 11, 5, 7, 10 | 12   | 1-5-11         | No   | 1(MC: 12) | ❌ | 3,390 | 0 | 100 | −100 |
| R6   | 8, 2, 1, 12, 7, 5  | 8      | 3-10-2 (DH 1st) | No  | 3(MC: 9), 10(MC: 8) | ❌ | 2,099 | 0 | 100 | −100 |
| R7   | 2, 10, 12, 7, 1, 4 | 2      | 1-12-2         | **Yes** | — | ✅ | 183 | 183 | 100 | +83 |
| R8   | 4, 2, 5, 7, 12, 8  | 4      | 8-7-4          | **Yes** | — | ✅ | 765 | 765 | 100 | +665 |
| R9   | 9, 3, 10, 12, 5, 2 | 9      | 5-3-13         | No   | 13(MC: 10) | ❌ | 701 | 0 | 100 | −100 |
| R10  | 4, 9, 2, 3, 7, 6   | 4      | 4-9-3          | **Yes** | — | ✅ | 122 | 122 | 100 | +22 |
| R11  | 1, 8, 7, 2, 11, 4  | 1      | 7-2-11         | No   | — | ❌ | 182 | 0 | 100 | −100 |

---

## Summary

| Metric        | Value   |
|---------------|---------|
| **Hits**      | 4 / 11  |
| **Total staked** | $1,100 |
| **Total returned** | $1,238 |
| **Net P&L**   | **+$138** |
| **ROI**       | +12.5%  |

---

## Comparison with full-pipeline strategy

- **Full pipeline** (jockey boost, SCMP, 膽拖, “no debutant as banker”): 2/11 hits, staked $1,060, return $290, **P&L −$770**.
- **This test** (MC top 6, #1 banker only): 4/11 hits, staked $1,100, return $1,238, **P&L +$138**.

On this day, the simpler rule “first 6 in MC, first as banker” would have **outperformed** the full pipeline: more hits (4 vs 2) and a small profit instead of a large loss. This is a single-meeting result; backtesting over more meetings would be needed to assess robustness.
