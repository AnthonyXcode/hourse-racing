# Trio backtest — MC Place% rule | Sha Tin | 1 Mar 2026

**Rule tested**

- **Banker**: horse with **highest MC Place%** in the field among runners listed with **MC Place%** in the strategy report.
- **Legs**: all other horses with **MC Place% > 20%** OR **HKJC Win odds < 10** (odds from each report’s ranking table).
- **Bet**: 膽拖 — 1 banker + N legs → **C(N, 2)** combinations × **$10**.
- **Hit**: official top-3 finishers ⊆ **{banker} ∪ {legs}** (Trio any order).

**Sources**

- **Results & Trio dividends**: `data/historical/results_20260301_ST.json` (Races **1–10** used; file also contains R11).
- **MC Place%**: `data/reports/trio_strategy_20260301_ST_R1.md` … **R10.md** — **STEP 4: HORSE RANKINGS** table (`MC Place%` column) plus reserve rows where a numeric / `~x%` MC Place% is given.

**Conventions**

- **Place%**: **strictly > 20%** for exact values; **`~20%`** / **`~21%`** treated as **not** >20% unless **Win < 10** applies.
- **Odds**: **strictly < 10** (10.0 does not qualify).
- Horses **not** given any MC Place% figure in the report cannot be legs (same limitation as prior backtests).

---

## 1. Race-by-race summary

| Race | Banker (max MC Place%) | N legs | Combos | Stake | Actual top 3 | Hit? | Trio $ | P&L |
|------|-------------------------|--------|--------|-------|--------------|------|--------|-----|
| R1 | **#1** AUDACIOUS PURSUIT (48.2% > #9 47.2%) | 7 | 21 | $210 | 9-7-3 | ❌ | $827 | −$210 |
| R2 | **#2** MR COOL (64.6%) | 5 | 10 | $100 | 3-7-2 | ✅ | $361 | +$261 |
| R3 | **#8** CIRCUIT FIERY (59.2%) | 4 | 6 | $60 | 8-14-2 | ❌ | $530 | −$60 |
| R4 | **#3** GOLD PATCH (59.3% > #8 59.2%) | 5 | 10 | $100 | 11-1-3 | ❌ | $1 | −$100 |
| R5 | **#3** ISLAND BUDDY (52.9%) | 6 | 15 | $150 | 6-4-12 | ✅ | $210 | +$60 |
| R6 | **#3** GALACTIC VOYAGE (54.6% > #6 45.3%) | 5 | 10 | $100 | 3-2-4 | ✅ | $197 | +$97 |
| R7 | **#6** WINNING WING (83.3%) | 5 | 10 | $100 | 1-5-6 | ✅ | $296 | +$196 |
| R8 | **#9** WUKONG JEWELLERY (53.1% > #4 52.4%) | 6 | 15 | $150 | 3-4-2 | ✅ | $715 | +$565 |
| R9 | **#2** NUMBERS (48.3%) | 5 | 10 | $100 | 14-4-7 | ❌ | $5 | −$100 |
| R10 | **#1** GENTLEMEN LEGACY (46.0% > #3 45.5%) | 7 | 21 | $210 | 1-11-10 | ✅ | $2 | −$208 |

### Brief notes per race

- **R1**: Legs include **#9** (odds **8.4** &lt; 10) but not **#3** (~14% MC Place, odds 12). Actual **#3** 3rd → **miss**.
- **R2**: Strategy banker was **#2** by Adj Win%; MC Place leader is the same. Frame **#3-#7-#2** covered.
- **R3**: **#14** won at **$30** — **no MC Place%** in STEP 4 (only in SCMP list / “remaining” bucket) → **miss**.
- **R4**: **#1** 2nd at short odds — **~8%** MC Place in table, not a leg. **#11-#1-#3** → **miss**.
- **R5**: MC Place leader **#3** matches main narrative; **#6-#4-#12** all in pool.
- **R6**: MC Place **#1** is **#3 GALACTIC VOYAGE** (54.6%), not Adj Win% banker **#6**. Trio still **hits** (**#3**-**#2**-**#4**).
- **R7** (6 runners): Full field in pool under Place% / odds rules; **1-5-6** **hit**.
- **R8**: MC Place peak **#9** (53.1%) vs Adj Win% banker **#6**; **#2** included via **8.9** odds. **3-4-2** **hit**.
- **R9**: **#14** & **#7** placed — both **reserves** without qualifying MC Place% + odds in table → **miss**.
- **R10**: **1-11-10** **hit**; Trio dividend **$2** → small **negative** on the race despite structural hit.

---

## 2. Totals (R1–R10)

| Metric | Value |
|--------|--------|
| Races | 10 |
| **Hits** | **7 / 10** |
| Total combinations | **128** |
| **Total stake** | **$1,280** |
| **Total return** | **$1,781** |
| **Net P&L** | **+$501** |
| **ROI** | **+$501 / $1,280 ≈ +39.1%** |

---

## 3. Where MC Place banker ≠ live-strategy banker

| Race | MC Place banker (this rule) | Typical live report banker (Adj Win%) |
|------|------------------------------|----------------------------------------|
| R1 | #1 | #9 |
| R4 | #3 | #8 GLACIATED |
| R6 | #3 | #6 PERFECTDAY |
| R8 | #9 | #6 AURIO |

Use this document for **mechanical rule** backtests; the published trio files optimise **Adj Win%** / pool rules as well as MC Place.

---

## 4. Lessons

1. **Missing MC rows** (R3 **#14**, R9 **#7** / **#14**) remain the main failure mode when longshots fill the frame.
2. **R10** shows a **hit** with **negative race P&L** (dividend **$2**) — structural capture ≠ profitable ticket on the day.
3. **R4** and **R1** are **market favourite** failures: **#1** / **#3** short in the market but outside **MC Place% + odds** legs.
