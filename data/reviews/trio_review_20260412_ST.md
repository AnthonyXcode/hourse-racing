# Trio suggestions review — Sha Tin | 12 Apr 2026

## Data sources

- **Suggestions:** `data/reports/trio_strategy_20260412_ST_R1.md` … **R11.md** (Strategy A + Strategy B as written).
- **Results:** scraped HKJC local results → `data/historical/results_20260412_ST.json` (`tools/scrape-meeting-results.ts 2026-04-12 ST`).
- **Trio dividend:** HKJC **Trio** payout per **$10** unit from results page (one winning combination per race).

**Actual top 3** (finish order 1→2→3):

| Race | 1st | 2nd | 3rd | Trio ($10) |
|------|-----|-----|-----|------------|
| R1 | 2 | 5 | 6 | $18 |
| R2 | 12 | 10 | 9 | $230 |
| R3 | 5 | 9 | 11 | $1,830 |
| R4 | 2 | 3 | 5 | $500 |
| R5 | 5 | 1 | 10 | $1,636 |
| R6 | 2 | 10 | 1 | $90 |
| R7 | 13 | 3 | 2 | $982 |
| R8 | 7 | 1 | 12 | $1,055 |
| R9 | 7 | 1 | 5 | $1,380 |
| R10 | 11 | 6 | 3 | $6,560 |
| R11 | 5 | 9 | 7 | $243 |

---

## P&L summary (if every suggested ticket was played)

Assumptions: **$10** per listed combination; one winning line pays the **full** Trio dividend for that race (standard HKJC 單T).

| Strategy | Total stake | Total return | **Net P&L** |
|----------|-------------|--------------|-------------|
| **A** (as per each report) | **$640** | **$248** | **-$392** |
| **B** (MC-only + odds rule) | **$1,100** | **$1,163** | **+$63** |

| Strategy | Hits (races) | Hit rate |
|----------|--------------|----------|
| **A** | **2 / 11** | 18.2% |
| **B** | **3 / 11** | 27.3% |

**Note:** **R8 Strategy B** alone returned **$1,055** on **$60** staked (**7-1-12**), which flips the whole Strategy B card to a small gain. Without R8, Strategy B would be roughly **-$992** on the other ten races.

---

## Race-by-race

### Strategy A

| Race | Structure | Stake | Top 3 set | Hit? | Return | P&L |
|------|-----------|-------|-----------|------|--------|-----|
| R1 | Full pool C(6,3)=20 | $200 | {2,5,6} | ✅ | $18 | -$182 |
| R2 | 雙膽 9+10, 3腳 | $30 | {9,10,12} | ✅ | $230 | +$200 |
| R3 | 雙膽 1+6, 4腳 | $40 | {5,9,11} | ❌ | $0 | -$40 |
| R4 | 雙膽 14+2, 3腳 | $30 | {2,3,5} | ❌ | $0 | -$30 |
| R5 | 雙膽 1+3, 4腳 | $40 | {1,5,10} | ❌ | $0 | -$40 |
| R6 | 單膽 1 + 4腳 | $60 | {1,2,10} | ❌ | $0 | -$60 |
| R7 | 單膽 3 + 4腳 | $60 | {2,3,13} | ❌ | $0 | -$60 |
| R8 | 雙膽 7+1, 3腳 | $30 | {1,7,12} | ❌ | $0 | -$30 |
| R9 | 單膽 5 + 4腳 | $60 | {1,5,7} | ❌ | $0 | -$60 |
| R10 | 單膽 2 + 4腳 | $60 | {3,6,11} | ❌ | $0 | -$60 |
| R11 | 雙膽 12+1, 3腳 | $30 | {5,7,9} | ❌ | $0 | -$30 |

**R1:** Pool covered all six runners; **2-5-6** was among the 20 combos but the dividend was tiny (**$18**) vs **$200** outlay.  
**R2:** **9-10-12** was an explicit recommended trio — clean hit.  
**R4:** Both **雙膽** horses had to place; **#14** missed the frame (**2-3-5**).  
**R7:** **#13** won; not in the Mode A pool (**#3** banker + **#4,#2,#5,#11**).  
**R8:** **#12** completed the actual trio; Strategy A **腳** were **#4,#2,#5** only — miss.  
**R10:** Model anchored **#2**; actual **11-6-3** — **#11** and **#6** were low in MC.

### Strategy B

| Race | Stake | Top 3 set | Hit? | Return | P&L |
|------|-------|-----------|------|--------|-----|
| R1 | $100 | {2,5,6} | ✅ **6-2-5** | $18 | -$82 |
| R2 | $30 | {9,10,12} | ❌ | $0 | -$30 |
| R3 | $60 | {5,9,11} | ❌ (banker **#1** out) | $0 | -$60 |
| R4 | $100 | {2,3,5} | ❌ (banker **#14** out) | $0 | -$100 |
| R5 | $150 | {1,5,10} | ❌ (**#10** not a leg) | $0 | -$150 |
| R6 | $100 | {1,2,10} | ✅ **1-2-10** | $90 | -$10 |
| R7 | $100 | {2,3,13} | ❌ | $0 | -$100 |
| R8 | $60 | {1,7,12} | ✅ **7-1-12** | $1,055 | +$995 |
| R9 | $150 | {1,5,7} | ❌ (**#7** not a leg) | $0 | -$150 |
| R10 | $100 | {3,6,11} | ❌ | $0 | -$100 |
| R11 | $150 | {5,7,9} | ❌ (banker **#12** out) | $0 | -$150 |

**R2:** Legs were **#10,#11,#1** — missing **#12** (winner).  
**R5:** **#10** third at long odds — not in the Strategy B leg set (**#3,#4,#2,#12,#8,#5**).  
**R9:** **#7** won — not among added shorts vs primary set.  
**R11:** Banker **#12** unplaced; actual **5-9-7** all beat the MC favourite.

---

## Themes / learnings

1. **Dual bankers (雙膽)** hurt when one leg of the pair misses (**R4, R11**) — high confidence cost.  
2. **Short-priced MC favourite** (**R10 #2**, **R11 #12**) both failed to make the top three in the result — classic “skinny div / upset” territory for Trio.  
3. **Strategy B odds adds** helped where they matched the frame (**R1, R6, R8**); where the market short was wrong (**R2** missing **#12**), the same rule hurt.  
4. **R3** actual **5-9-11** sat outside both pools’ core logic (banker **#1** / **#6** not in the trio).  
5. **R7** winner **#13** was a structural hole in the suggested pools — wide-priced winner with strong on-day performance.

---

## Files

- Results: `data/historical/results_20260412_ST.json`  
- Scraper helper: `tools/scrape-meeting-results.ts`  

*Generated after meeting — for post-race learning, not betting advice.*
