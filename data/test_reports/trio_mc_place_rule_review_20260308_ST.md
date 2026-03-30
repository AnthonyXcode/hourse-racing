# Trio backtest — MC Place% rule | Sha Tin | 8 Mar 2026

**Rule tested**

- **Banker**: horse with **highest MC Place%** in the field (MC rank #1 by Place%).
- **Legs**: all other horses with **MC Place% > 20%** OR **HKJC Win odds < 10** (same odds source as each `trio_strategy` report’s live pool).
- **Bet**: 膽拖 — 1 banker + N legs → **C(N, 2)** combinations × $10.
- **Hit**: the three official top-3 finishers are exactly **{banker} ∪ {two legs}** (Trio any order).

**Sources**

- **Results & Trio dividends**: `data/historical/results_20260308_ST.json` (10 races; **no R11** in file).
- **MC Place%**: extracted from `data/reports/trio_strategy_20260308_ST_R*.md` **only where that report publishes a per-horse MC Place% / MC Pl% column**.

---

## 1. Strict MC Place% (reports with MC Place% table)

These races have an explicit **MC Place%** (or **MC Pl%**) column in the strategy report.

### R8 — CORNWALL HANDICAP (MC table: `trio_strategy_20260308_ST_R8.md`)

| # | MC Place% | HKJC Win |
|---|-----------|----------|
| 6 | **65.0** | 5.7 |
| 7 | 45.6 | 34 |
| 2 | 45.3 | 5.8 |
| 10 | 45.5 | 3.0 |
| 5 | 39.0 | 4.8 |
| 8 | 19.5 | 16 |
| … | (see report) | … |

- **Banker**: **#6** VICTORY SKY (65.0% MC Place — highest).
- **Legs** (Place% > 20% or Win < 10, excluding banker): **#2, #5, #7, #10** (Place% > 20); Win < 10 also picks **#2, #5, #6, #10** → legs **#2, #5, #7, #10**.
- **Combos**: C(4,2) = **6** · **Stake $60**
- **Actual**: 2-6-7 (#2 1st, #6 2nd, #7 3rd) → banker + **#2** + **#7** in pool → **HIT**
- **Trio $536** → **Return $536** · **P&L +$476**

### R9 — (MC Pl% column: `trio_strategy_20260308_ST_R9.md`)

| # | MC Pl% | HKJC Win (report) |
|---|--------|-------------------|
| 5 | **52.1** | 5.7 |
| 6 | 46.3 | 2.8 |
| 7 | 39.8 | 4.9 |
| 9 | 35.1 | 10 |
| 14 | 23.9 | 7.3 |
| 4 | 20.0 | 21 |
| 2 | ~18 | 25 |

- **Banker**: **#5** POWER OF VITAM (52.1%).
- **Legs**: Place% > 20% → **#6, #7, #9, #14** (#4 = 20.0% **excluded** if rule is **strictly > 20%**). Win < 10: **#5, #6, #7, #14** → legs **#6, #7, #9, #14**.
- **Combos**: C(4,2) = **6** · **Stake $60**
- **Actual**: 9-7-6 → **#5 not in top 3** → **MISS** (banker failed)
- **P&L −$60**

### R10 — (`trio_strategy_20260308_ST_R10.md` — MC Win% / MC Place% table)

| # | MC Place% | HKJC Win (report) |
|---|-----------|-------------------|
| 6 | **48.4** | 4.9 |
| 1 | 25.4 | 2.4 |
| 11 | 42.4 | 14 |
| 8 | 37.9 | 5.5 |
| 7 | 37.3 | 25 |
| 5 | 28.9 | 22 |
| … | … | … |

- **Banker**: **#6** STELLAR EXPRESS (48.4% — highest MC Place%).
- **Legs**: Place% > 20% → **#1, #5, #7, #8, #11** (exclude banker #6). Win < 10: **#1, #6, #8** → add nothing new beyond place set except **#1, #8** already in.
- **Legs**: **#1, #5, #7, #8, #11** (5 legs) → C(5,2) = **10** · **Stake $100**
- **Actual**: 1-11-8 → **#6 finished 6th** (not in top 3) → **MISS** (banker failed)
- **P&L −$100**

### R11 — (`trio_strategy_20260308_ST_R11.md`)

- Report lists **MC Place%** (e.g. #3 SUPER EXPRESS **48.0%**, #7 HAROLD WIN **47.0%**, etc.).
- **`results_20260308_ST.json` has no Race 11** → **no official dividend or P&L** for this meeting file.

---

## 2. Summary (strict MC Place% — R8–R10 only)

| Race | Banker (MC Place #1) | Legs (N) | Combos | Stake | Result | Hit? | Trio $ | Return | P&L |
|------|----------------------|----------|--------|-------|--------|------|--------|--------|-----|
| R8 | #6 | 4 | 6 | $60 | 2-6-7 | ✅ | $536 | $536 | +$476 |
| R9 | #5 | 4 | 6 | $60 | 9-7-6 | ❌ | $294 | $0 | −$60 |
| R10 | #6 | 5 | 10 | $100 | 1-11-8 | ❌ | $158 | $0 | −$100 |
| **Total** | | | **22** | **$220** | | **1/3** | | **$536** | **+$316** |

**ROI (R8–R10, strict table):** +$316 / $220 ≈ **+143.6%** on those three races.

---

## 3. R1–R7 — MC Place% not fully tabulated in strategy PDFs

For **R1–R7**, the published `trio_strategy_20260308_ST_R*.md` files **do not** include a full **MC Place%** column for every runner (they use blended **Adj Win% / Adj Place%**, SCMP notes, or partial MC Win% only).

To apply your rule **literally**, you would need either:

- archived **analyze-race** / **MC SIMULATION (raw)** output for `2026-03-08` Sha Tin with `--form-data all`, or  
- a re-run of the Monte Carlo pipeline against stored race cards.

**Do not** mix **Adj Place%** with **MC Place%** without relabelling — they differ (e.g. R10: MC Place #1 is **#6**, while the live strategy banker was **#1** by Adj Win% / blend).

---

## 4. Comparison to original trio suggestions (`trio_review_20260308_ST.md`)

| Item | Original strategy (review) | This test (MC Place #1 banker, R8–R10) |
|------|----------------------------|----------------------------------------|
| Hits (meeting) | 2 / 11 (per review) | 1 / 3 on races with strict MC table |
| Idea | Adj Win%, SCMP, jockey boosts, pool rules | Raw MC **Place%** rank + Place>20% or odds<10 |

**R8** under this rule **hits** and aligns with the story that **#6 / #7** were central — MC Place ranked **#6** on top.

**R9** fails because **#5** (highest MC Place%) missed the frame while **#6–#7–#9** (all legs) filled the top 3 — same “banker fail, all legs good” pattern as in the main review.

**R10** fails because **#6** was MC Place leader but **finished 6th**; the actual top 3 were **#1, #11, #8** (all were structural legs under MC Place + odds rules, but **banker** was wrong).

---

## 5. Files

| File | Role |
|------|------|
| `data/historical/results_20260308_ST.json` | Official order & Trio dividends |
| `data/reports/trio_strategy_20260308_ST_R1.md` … `R11.md` | Pre-race strategy + MC tables where present |
| `data/reviews/trio_review_20260308_ST.md` | Original post-race review |

---

*Generated for: MC Place% banker + (Place% > 20% OR Win odds < 10) legs, 膽拖 structure, vs 8 Mar 2026 Sha Tin results.*
