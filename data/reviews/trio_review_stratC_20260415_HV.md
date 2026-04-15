# Strategy B Review — MC #1 banker + primary Place%>20% + win-odds add/swap (trio SKILL) | Happy Valley | 15 Apr 2026

## Rules

- **Banker**: MC **#1** by MC Win% (same as “MC #1” in reports).
- **Primary legs**: all other runners with **MC Place% > 20%** (banker excluded).
- **Step B (win odds &lt; 10, Place% ≤ 20%)**: **replace** one primary leg when the SKILL swap rule fires; otherwise **add** short-priced tails (see each `trio_strategy_20260415_HV_R*.md`).
- **Data**: `--form-data all` (all-venue history); HKJC win odds from `data/odds/odds_20260415_HV.json` at report time.
- **Bet type**: Trio (單T) — top 3 in **any** order.
- **Unit**: **$10** per combination; structure **膽拖** 1 banker + N legs → **C(N, 2)** combos.

**Stake convention (this review):** **Full Strategy B** = the published **final legs** after Step B in each report, including **7-leg** R6/R8 and **15-line** R9. Reports also document **lean** caps (R6/R8/R9); see **Summary** for an alternate total.

**Note:** This is the **trio-strategy SKILL** Strategy B pipeline (**MC-only**), **not** Strategy A (Adj Win/Place + jockey + SCMP + Modes A–B).

**Pre-race definitions:** `data/reports/trio_strategy_20260415_HV_R1.md` … **R9.md**. **R10** not in scope (no report in this slice).

**Results source:** `tools/scrape-meeting.ts --date=2026-04-15 --venue=HV` → `data/historical/results_20260415_HV.json`. **Finished** + **SP** = `winOdds` on each finisher row. **MC % / odds** from the trio reports (~03:34 HKT fetch in JSON).

---

## Summary

| Metric | Value |
|--------|-------|
| Races played | **9 (R1–R9)** |
| Hit rate | **3/9 (33.3%)** |
| Total staked | **$1,020** (full Strategy B; see below) |
| Total returned | **$750** |
| **Net P&L** | **−$270** |
| **ROI** | **−26.5%** |
| Session Result | **LOSS** |

**Context — lean cap (where reports offer it):** If R6/R8 use **primary-only** / **lean** **$100** each and R9 uses **lean** **$60** (six lines), total stake **$710**, same three hits → **net +$40** (**ROI +5.6%**). Full B spends **+$310** extra on wider legs that did **not** convert an extra dividend here.

---

## Race-by-Race Results

Banker = MC Win% **#1**. Legs = **final Strategy B legs** after Step B add/swap (see per-race reports).

| Race | Class | Dist | Banker (MC#1) | Final legs (after Step B) | Structure | Combos | Stake | Result (1→2→3) | Banker placed? | Hit? | Trio $ | Return | P&L |
|------|-------|------|---------------|---------------------------|-----------|--------|-------|----------------|----------------|------|--------|--------|-----|
| R1 | C5 | 1000m | #4(44.7W/84.2P) | #3,#5,#6 | 膽拖 1B+3L | 3 | $30 | 6→5→4 | 3rd ✅ | ✅ | $168 | $168 | +$138 |
| R2 | C5 | 1650m | #8(46.8W/87.5P) | #6,#4,#9,#7 | 膽拖 1B+4L | 6 | $60 | 6→7→3 | **9th ❌** | ❌ | $2783 | $0 | −$60 |
| R3 | C4 | 1650m | #2(27.3W/61.1P) | #10,#5,#1,#7,#4 | 膽拖 1B+5L | 10 | $100 | 1→10→11 | **12th ❌** | ❌ | $485 | $0 | −$100 |
| R4 | C4 | 1800m | #11(52.5W/95.4P) | #4,#3,#1,#10 | 膽拖 1B+4L | 6 | $60 | 4→10→11 | 3rd ✅ | ✅ | $465 | $465 | +$405 |
| R5 | C3 | 1650m | #1(33.7W/74.4P) | #3,#7,#10,#4,#2 | 膽拖 1B+5L | 10 | $100 | 1→4→10 | 1st ✅ | ✅ | $117 | $117 | +$17 |
| R6 | C4 | 1200m | #8(32.2W/69.0P) | #5,#4,#1,#11,#2,#9,#3 | 膽拖 1B+7L | 21 | $210 | 3→9→1 | **5th ❌** | ❌ | $450 | $0 | −$210 |
| R7 | C4 | 1200m | #6(35.5W/72.0P) | #3,#4,#7,#5,#1 | 膽拖 1B+5L | 10 | $100 | 11→1→6 | 3rd ✅ | ❌ | $393 | $0 | −$100 |
| R8 | C3 | 1650m | #10(23.6W/58.0P) | #3,#2,#8,#1,#4,#11,#5 | 膽拖 1B+7L | 21 | $210 | 11→9→8 | **6th ❌** | ❌ | $233 | $0 | −$210 |
| R9 | C3 | 1200m | #12(37.4W/73.6P) | #1,#5,#2,#9,#4,#7 | 膽拖 1B+6L | 15 | $150 | 7→6→12 | 3rd ✅ | ❌ | $720 | $0 | −$150 |
| **TOTAL** | | | | | | **102** | **$1,020** | | **5/9** bank in frame | **3/9** | | **$750** | **−$270** |

---

## Full MC Place% Table (Strategy B ticket horses + field highlights)

*Odds* = pre-race HKJC win odds from `data/reports/trio_strategy_20260415_HV_R*.md`. **Finished** + **SP** from `data/historical/results_20260415_HV.json`.

**Column “B ticket”:** **✅** = on **full** Strategy B 膽拖 ticket.

### R1 — Class 5 | 1000m Turf | Actual: 6→5→4 ✅

**Ticket (B):** ★ **#4** + legs **#3,#5,#6** | C(3,2) = **3** × $10 = **$30**

| Seq | # | Horse | Win% | Place% | Odds | B ticket | Finished |
|-----|---|-------|------|--------|------|----------|----------|
| ★ | 4 | SPICY SPANGLE | 44.7% | 84.2% | 7.1 | ✅ | **3rd** (SP 5.5) |
| | 3 | LUCKY GENERATIONS | 19.4% | 64.0% | 3.5 | ✅ | 7th |
| | 5 | MACANESE MASTER | 5.9% | 33.5% | 3.9 | ✅ | **2nd** |
| | 6 | ALWAYS MY FOLKS | 23.9% | 68.8% | 7.5 | ✅ | **1st** |

**Hit.** **vs A:** B drops **#9** (wide-draw cover) and plays **half** the A stake — same paying set **{4,5,6}**.

### R2 — Class 5 | 1650m Turf | Actual: 6→7→3 ❌

**Ticket (B):** ★ **#8** + legs **#6,#4,#9,#7** | C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | B ticket | Finished |
|-----|---|-------|------|--------|------|----------|----------|
| ★ | 8 | COURIER MAGIC | 46.8% | 87.5% | 14 | ✅ | **9th** |
| | 6 | FAMILY FORTUNE | 34.0% | 81.0% | 3.8 | ✅ | **1st** |
| | 7 | DOUBLE BINGO | 1.8% | 15.0% | 9.6 | ✅ | **2nd** |
| | 3 | ZETTA FORCE | 0.1% | 1.8% | 16 | ❌ | **3rd** |

**Banker fail.** **vs A:** B **adds #7** (win-odds rule); A swapped **#2** for **#7** — neither catches **#3** for the trio.

### R3 — Class 4 | 1650m Turf | Actual: 1→10→11 ❌

**Ticket (B):** ★ **#2** + legs **#10,#5,#1,#7,#4** — same **10** lines as A on this card.

**Banker fail.** **#11** 3rd outside both A and B pools.

### R4 — Class 4 | 1800m Turf | Actual: 4→10→11 ✅

**Ticket (B):** ★ **#11** + legs **#4,#3,#1,#10** | C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | B ticket | Finished |
|-----|---|-------|------|--------|------|----------|----------|
| ★ | 11 | ROMANTIC FANTASY | 52.5% | 95.4% | 6.4 | ✅ | **3rd** |
| | 4 | HARMONY GALAXY | 25.0% | 87.2% | 6.1 | ✅ | **1st** |
| | 10 | KINGLY DEMEANOR | 0.0% | 0.4% | 7.2 | ✅ | **2nd** |

**Hit (B only vs published A pool).** Step B **adds #1 and #10**; **#10** fills 2nd — **Strategy A** missed this race (no **#10** in A pool).

### R5 — Class 3 | 1650m Turf | Actual: 1→4→10 ✅

**Ticket (B):** ★ **#1** + legs **#3,#7,#10,#4,#2** | 10 × $10 = $100

**Hit.** Line **1-4-10** on ticket. **vs A:** B **adds #2** (odds rule); both hit the same dividend here.

### R6 — Class 4 | 1200m Turf | Actual: 3→9→1 ❌

**Ticket (B, full):** ★ **#8** + **seven** legs **#5,#4,#1,#11,#2,#9,#3** | 21 × $10 = $210

**Banker fail** (**#8** 5th). **#3** / **#9** are on the **full B** ticket via adds but **#8** not in frame — no collect. **Lean** primary-only (**$100**) matches A’s five legs and also misses.

### R7 — Class 4 | 1200m Turf | Actual: 11→1→6 ❌

**Ticket (B):** ★ **#6** + legs **#3,#4,#7,#5,#1** — same **10** lines as A.

**Banker placed; trio miss.** **#11** won at **~1.2%** MC win — outside both strategies’ pools.

### R8 — Class 3 | 1650m Turf | Actual: 11→9→8 ❌

**Ticket (B, full):** ★ **#10** + seven legs **#3,#2,#8,#1,#4,#11,#5** | 21 × $10 = $210

**Banker fail** (**#10** 6th). Full B **includes #11 and #9** in legs but cannot pay without **#10** in the top three.

### R9 — Class 3 | 1200m Turf | Actual: 7→6→12 ❌

**Ticket (B, full):** ★ **#12** + legs **#1,#5,#2,#9,#4,#7** | 15 × $10 = $150

**Banker placed; trio miss.** **#7** is on B (swap/add) but **#6** (**2nd**) is **not** on the full-B leg list. **Lean** **#1,#5,#2,#3** also misses **#6/#7**.

---

## Hit Detail (3 hits)

### R1 ✅ — Trio $168 | Stake $30 | P&L +$138

Paying **6→5→4**; **#4** banker **3rd**; legs **#5·#6** — line **4-5-6**.

### R4 ✅ — Trio $465 | Stake $60 | P&L +$405

Paying **4→10→11**; **#11** banker **3rd**; **#4** and **#10** from Step B legs.

### R5 ✅ — Trio $117 | Stake $100 | P&L +$17

Paying **1→4→10**; **#2** add-on did not need to run for the collect.

---

## Banker Performance (Strategy B — MC #1)

| Race | Banker | MC Place% | MC Win% | Odds (early) | Finished | Placed? |
|------|--------|-----------|---------|--------------|----------|---------|
| R1 | #4 SPICY SPANGLE | 84.2% | 44.7% | 7.1 | 3rd | ✅ |
| R2 | #8 COURIER MAGIC | 87.5% | 46.8% | 14 | 9th | ❌ |
| R3 | #2 WIN EASE | 61.1% | 27.3% | 31 | 12th | ❌ |
| R4 | #11 ROMANTIC FANTASY | 95.4% | 52.5% | 6.4 | 3rd | ✅ |
| R5 | #1 BEAUTY ALLIANCE | 74.4% | 33.7% | 7.5 | 1st | ✅ |
| R6 | #8 QUARTZ LEGEND | 69.0% | 32.2% | 3.7 | 5th | ❌ |
| R7 | #6 THE HEIR | 72.0% | 35.5% | 3.1 | 3rd | ✅ |
| R8 | #10 RAGGA BOMB | 58.0% | 23.6% | 11 | 6th | ❌ |
| R9 | #12 SOMELOVEFROMABOVE | 73.6% | 37.4% | 2.7 | 3rd | ✅ |

**5/9** MC #1 bankers in the top three — **3** Trio collects. **R4** is the clearest **B vs A** upside this meeting (short-odds **#10** on B only).

---

## Lessons

1. **R4 (Step B adds)** — Win-odds **#10** / **#1** legs delivered the only race where **B** collected and **published A** (no **#10**) did not.

2. **R1 (cost)** — Same hit as A with **$30** vs **$60** by dropping **#9** — lower stake, same dividend.

3. **R6 / R8 / R9 (full vs lean)** — Extra combinations on **full B** did not add hits vs **lean** this card; **lean** total would have been **slightly positive** with the same three winners.

4. **R7 / R9** — Long-shot winners (**#11**; **#7** over **#6**) still outside MC-primary structure — same structural gap as A, different leg lists.

5. **Scratch / scrape** — **R10** not in this report set; keep **starter reconciliation** if extending to a **10-race** card.

---

## Cross-reference

| File | Role |
|------|------|
| `data/reviews/trio_review_stratC_20260412_ST.md` | Long-form template (Strategy B, Sha Tin) |
| `data/reviews/trio_review_20260415_HV.md` | Short post-race note (Strategy A) |
| `data/reports/trio_strategy_20260415_HV_R1.md` … `R9.md` | Pre-race Strategy A + **Strategy B (MC-only)** blocks |
| `data/historical/results_20260415_HV.json` | Finishes + Trio dividends |

---

*Post-race learning only — not betting advice.*
