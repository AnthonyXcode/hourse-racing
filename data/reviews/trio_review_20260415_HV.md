# Trio suggestions review — Happy Valley | 15 Apr 2026

## Data sources

- **Suggestions:** `data/reports/trio_strategy_20260415_HV_R1.md` … **R9.md** (Strategy A + Strategy B as written).
- **Results:** scraped HKJC local results → `data/historical/results_20260415_HV.json` (`tools/scrape-meeting.ts --date=2026-04-15 --venue=HV`).
- **Trio dividend:** HKJC **Trio** payout per **$10** unit from results page (one winning combination per race).

**Scope:** **R10** not scraped (page parse error); no Trio report was produced for R10 in this session.

**Actual top 3** (finish order 1→2→3):

| Race | 1st | 2nd | 3rd | Trio ($10) |
|------|-----|-----|-----|------------|
| R1 | 6 | 5 | 4 | $168 |
| R2 | 6 | 7 | 3 | $2,783 |
| R3 | 1 | 10 | 11 | $485 |
| R4 | 4 | 10 | 11 | $465 |
| R5 | 1 | 4 | 10 | $117 |
| R6 | 3 | 9 | 1 | $450 |
| R7 | 11 | 1 | 6 | $393 |
| R8 | 11 | 9 | 8 | $233 |
| R9 | 7 | 6 | 12 | $720 |

---

## P&L summary (if every suggested ticket was played)

Assumptions: **$10** per listed combination; one winning line pays the **full** Trio dividend for that race (standard HKJC 單T).

| Strategy | Total stake | Total return | **Net P&L** |
|----------|-------------|--------------|-------------|
| **A** (as per each report; **R5 = A2** 單膽 **$60** only) | **$700** | **$285** | **−$415** |
| **B** (MC-only + odds rule, **full** legs incl. R6/R8 7-leg, R9 15-line) | **$1,020** | **$750** | **−$270** |

| Strategy | Hits (races) | Hit rate |
|----------|--------------|----------|
| **A** | **2 / 9** | 22.2% |
| **B** | **3 / 9** | 33.3% |

**Note:** **R5** reports offered **A1** (雙膽, **$30**) or **A2** (單膽, **$60**). Table uses **A2 only** (the line that hit). If **A1+A2** both played: R5 stake **$90**, return **$117**, R5 **+$27**; meeting stake **$730**, return **$285**, net **−$445**.

**Strategy B — lean cap (reports):** R6/R8 **primary-only** **$100** each + R9 **lean** **$60** → total stake **$710**, same three hits as full B → **+$40** (**+5.6%**). Long-form: `data/reviews/trio_review_stratC_20260415_HV.md`.

---

## Race-by-race

### Strategy A

| Race | Structure | Stake | Top 3 set | Hit? | Return | P&L |
|------|-----------|-------|-----------|------|--------|-----|
| R1 | 膽拖 1B+4L (#4 + #3,#5,#6,#9) | $60 | {4,5,6} | ✅ | $168 | +$108 |
| R2 | 膽拖 1B+4L (#8 + #6,#9,#4,#2) | $60 | {6,7,3} | ❌ | $0 | −$60 |
| R3 | 膽拖 1B+5L (#2 + five legs) | $100 | {1,10,11} | ❌ | $0 | −$100 |
| R4 | 膽拖 1B+4L (#11 + #4,#3,#7,#5) | $60 | {4,10,11} | ❌ (**#10** not in pool) | $0 | −$60 |
| R5 | A2: 膽拖 1B+4L (#1 + #3,#7,#10,#4) | $60 | {1,4,10} | ✅ | $117 | +$57 |
| R6 | 膽拖 1B+5L (#8 + five legs) | $100 | {3,9,1} | ❌ | $0 | −$100 |
| R7 | 膽拖 1B+5L (#6 + five legs) | $100 | {11,1,6} | ❌ (**#11** not in pool) | $0 | −$100 |
| R8 | 膽拖 1B+5L (#10 + five legs) | $100 | {11,9,8} | ❌ | $0 | −$100 |
| R9 | 膽拖 1B+4L (#12 + #1,#5,#2,#3) | $60 | {7,6,12} | ❌ | $0 | −$60 |

**R1:** Pool covered **4-5-6**; **#4** banker **3rd**.  
**R2:** **#8** (banker) **9th**; **#3** third — not in pool.  
**R4:** **#10** second — excluded from Mode A pool (**#7/#5** legs instead); **B** hits this race via Step B adds (see below).  
**R5:** **A1** would miss (**#3** 6th); **A2** line **1-4-10** collects.  
**R7:** **#11** won — outside pool.  
**R9:** **#7** / **#6** frame — not among A legs.

### Strategy B

| Race | Stake | Top 3 set | Hit? | Return | P&L |
|------|-------|-----------|------|--------|-----|
| R1 | $30 | {4,5,6} | ✅ | $168 | +$138 |
| R2 | $60 | {6,7,3} | ❌ (banker **#8** out) | $0 | −$60 |
| R3 | $100 | {1,10,11} | ❌ (banker **#2** out) | $0 | −$100 |
| R4 | $60 | {4,10,11} | ✅ | $465 | +$405 |
| R5 | $100 | {1,4,10} | ✅ | $117 | +$17 |
| R6 | $210 | {3,9,1} | ❌ (banker **#8** out) | $0 | −$210 |
| R7 | $100 | {11,1,6} | ❌ (**#11** not a leg) | $0 | −$100 |
| R8 | $210 | {11,9,8} | ❌ (banker **#10** out) | $0 | −$210 |
| R9 | $150 | {7,6,12} | ❌ (**#6** not a leg) | $0 | −$150 |

**R2:** Legs include **#7** (add) but not **#3** (third).  
**R4:** **#10** / **#1** on ticket via win-odds Step B — only Strategy **B** among the two collects **R4**.  
**R9:** Full B has **#7**; **#6** (second) still missing.

---

## Themes / learnings

1. **Strategy A vs B on R4:** Step B **adds** short-priced runners (**#10**, **#1**) — **B** hits **4-10-11**; **A** pool without **#10** misses.  
2. **R1 cost:** **B** plays **three** combos (**$30**) vs **A** six (**$60**) — same dividend when **{4,5,6}** lands.  
3. **Banker fails (A: R3/R6/R8; B: R2/R3/R6/R8):** MC **#1** on win% still misses the frame often on 膽拖.  
4. **Wide winners (R7 #11, R9 #7):** Structural gaps vs both pools when longshots take the race.  
5. **Full B stake:** Extra lines on R6/R8/R9 did **not** add hits vs **lean** this card — see **P&L summary** note.

---

## Files

- Results: `data/historical/results_20260415_HV.json`  
- Long-form Strategy B review: `data/reviews/trio_review_stratC_20260415_HV.md`  
- Scraper: `tools/scrape-meeting.ts`  

*Generated after meeting — for post-race learning, not betting advice.*
