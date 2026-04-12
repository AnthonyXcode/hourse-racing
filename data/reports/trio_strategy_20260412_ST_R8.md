# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 8

**Refreshed:** Full `trio-strategy` pipeline (Steps **1–5**); MC + compile **this run**. **Prior suggestions superseded.**

---

## Pipeline log (Steps 1–3) — do not skip

| Step | Tool / action | Result |
|------|----------------|--------|
| **1b** | `sync-historical.ts` | **All historical data is up to date!** |
| **1c** | `fetch-jockey-stats.ts --date=2026-04-12` | `data/jockeys/jockey_stats_20260411.json` (+ `JOCKEY_STATS.md`); some jockey pages skipped (WDJ, CLR, PFI, WJH, CCW, CKJ) — **H Y Yuen** / **C L Chau** use HKJC card `winRate` where needed |
| **1d** | `fetch-odds.ts --date=2026-04-12 --venue=ST --json --save` | `data/odds/odds_20260412_ST.json` (incl. R8), `fetchedAt` **2026-04-12T05:55:29.724Z** |
| **1e** | Race card via analyzer | `data/racecards/racecard_20260412_ST_R8.json` |
| **1f** | SCMP `https://www.scmp.com/sport/racing/racecard/8` | **Loaded** — HUMPHREYS HANDICAP, Win/Place, Star Form, TIR, trackwork, QP/Q matrices; **tipster picks not used** |
| **3** | `analyze-race.ts` … `--race 8 --form-data all` | **10,000** iters → below |

---

## Step 2 — Data validation

```
Meeting: Sha Tin 2026-04-12 | Going: Good (default — card parse failed) | Surface: Turf
Target: R8 — Class 3 | 1600m Turf | 12 starters (Trio OK, ≥3)
Scratchings: none among active numbers
Jockey stats: non-empty; elite tier (e.g. Moreira, Purton, McDonald) present
Odds: HKJC 12/12 in JSON (R8 block)
SCMP: ✅ loaded (see 1f); used for validation / caveats only — not applied as numeric Strategy A deltas (jockey-only Adj table below, same as R1–R7 refreshes)
```

---

## Race header

**RACE:** R8 — **HUMPHREYS HANDICAP** | Class 3 | **1600m Turf** | **12** runners  
**DATA:** **12/12** form enriched in MC. **Odds source (flags):** HKJC `data/odds/odds_20260412_ST.json` (R8).

---

## MC SIMULATION (raw) — Step 3b

**Sort:** MC **Win%** desc. **Form** = HK runs in MC. **Place%>20%** = MC Place% > 20%. **Win odds<10** = HKJC win < 10.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 7 | AMAZING PARTNERS | 48.7% | 85.9% | 6.1 | ✅ | ✅ | 5 | ★ 膽 (MC #1) | 1-7: 34.7% (2.9) |
| 1 | MISTER DAPPER | 26.9% | 71.4% | 17 | ✅ | ❌ | 6 | 腳 | 4-7: 17.3% (5.8) |
| 4 | ENDUED | 12.5% | 52.2% | 2.9 | ✅ | ✅ | 7 | 腳 | 1-4: 9.1% (11.0) |
| 2 | PRESTIGE GOOD | 2.8% | 19.8% | 16 | ❌ | ❌ | 8 | — | 2-7: 5.2% (19.3) |
| 6 | SHANWAH | 2.4% | 16.0% | 48 | ❌ | ❌ | 6 | — | 6-7: 4.0% (24.8) |
| 5 | FLYING LUCK | 2.4% | 17.5% | 4.7 | ❌ | ✅ | 3 | add-on | — |
| 3 | WINDLORD | 1.8% | 12.7% | 47 | ❌ | ❌ | 4 | — | — |
| 9 | HYMNBOOK | 1.0% | 8.4% | 54 | ❌ | ❌ | 2 | — | — |
| 11 | RISING PHOENIX | 0.7% | 7.5% | 17 | ❌ | ❌ | 10 | — | — |
| 12 | WITHALLMYFAITH | 0.5% | 5.9% | 5.9 | ❌ | ✅ | 10 | add-on | — |
| 8 | HAPPY TERCENTENARY | 0.1% | 1.0% | 52 | ❌ | ❌ | 2 | — | — |
| 10 | LEGEND WINNER | 0.1% | 1.7% | 13 | ❌ | ❌ | 5 | — | — |

**Market vs MC:** **#1** / **#7** strong place edge vs pool; **#10** flagged overvalued vs model.

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP % pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**. **H Y Yuen** / **C L Chau** use HKJC card `winRate` when not reliably in JSON batch.

**Table sorted by Adj Win% (desc).** MC top **4** by Win: **#7, #1, #4, #2**.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 7 | AMAZING PARTNERS | 48.7% | 85.9% | jockey +1.7 | jockey +1.7 | **50.4%** | **87.6%** | 6.1 | C Y Ho | — | ★ 膽 1 |
| 1 | MISTER DAPPER | 26.9% | 71.4% | jockey 0 | jockey 0 | **26.9%** | **71.4%** | 17 | B Avdulla | — | ★ 膽 2 |
| 4 | ENDUED | 12.5% | 52.2% | jockey +2.8 | jockey +2.8 | **15.3%** | **55.0%** | 2.9 | A Atzeni | — | 腳 |
| 2 | PRESTIGE GOOD | 2.8% | 19.8% | jockey +7 | jockey +7 | **9.6%** | **26.8%** | 16 | H Y Yuen (-10) | — | 腳 |
| 5 | FLYING LUCK | 2.4% | 17.5% | jockey +4 (cap) | jockey +4 (cap) | **6.4%** | **21.5%** | 4.7 | J Moreira | — | 腳 |
| 6 | SHANWAH | 2.4% | 16.0% | jockey +3.2 | jockey +3.2 | **5.6%** | **19.2%** | 48 | H Bowman | — | — |
| 3 | WINDLORD | 1.8% | 12.7% | jockey +2.4 | jockey +2.4 | **4.2%** | **15.1%** | 47 | C L Chau (-2) | — | — |
| 9 | HYMNBOOK | 1.0% | 8.4% | jockey 0 | jockey 0 | **1.0%** | **8.4%** | 54 | K Teetan | — | — |
| 11 | RISING PHOENIX | 0.7% | 7.5% | jockey 0 | jockey 0 | **0.7%** | **7.5%** | 17 | A Badel | — | — |
| 12 | WITHALLMYFAITH | 0.5% | 5.9% | jockey 0 | jockey 0 | **0.5%** | **5.9%** | 5.9 | M L Yeung | — | Str B add |
| 8 | HAPPY TERCENTENARY | 0.1% | 1.0% | jockey 0 | jockey 0 | **0.1%** | **1.0%** | 52 | K C Leung | — | — |
| 10 | LEGEND WINNER | 0.1% | 1.7% | jockey 0 | jockey 0 | **0.1%** | **1.7%** | 13 | R Kingscote | — | — |

**Classification:** **Dominant** (**50.4% ≥ 35%**). **Mode A** five: **#7, #1, #4, #2, #5** (next **3** Adj Place among non-膽 after **#7**/**#1**: **#4, #2, #5**).

**雙膽拖:** **#1** second Adj Win, **Adj Place 71.4% ≥ 63%** → **膽 #7 + 膽 #1**.  
**腳:** **#4, #2, #5** → **3** trios → **$30** ($10 × 3).

**Banker eligibility:** **#7** has **5** HK form lines ✅.

**Alternative (single 膽):** **膽 #7** + 腳 **#1, #4, #2, #5** → C(4,2) = **6** → **$60**.

---

## TRIO POOL — Strategy A (Step 4–5)

**POOL:** #7, #1, #4, #2, #5  

**雙膽拖:** **膽** #7 AMAZING PARTNERS | **膽** #1 MISTER DAPPER  
**腳:** #4 ENDUED, #2 PRESTIGE GOOD, #5 FLYING LUCK  

**COMBINATIONS:** **3**  
**UNIT BET:** **$10**  
**TOTAL STAKE:** **$30**

**Trios (any order):** **7-1-4** | **7-1-2** | **7-1-5**

**Full pool (no dual banker):** C(5,3) = **10** → **$100**

---

## STRATEGY B (MC-only)

**Banker:** #7 AMAZING PARTNERS (**48.7%** / **85.9%**)  
**Primary legs (MC Place% > 20%, ex-banker):** #1, #4  

**Win odds &lt; 10, Place% ≤ 20%:** no primary leg in MC Place **20–30%** with Win **&gt; 10** → **no swap**. Candidates (win asc): **#5** FLYING LUCK (**2.4%** / **4.7**) → **add**; **#12** WITHALLMYFAITH (**0.5%** / **5.9**) → **add**. **#4** (win **2.9**) has MC Place **&gt; 20%** → not a Step B candidate.

**Final legs:** #1, #4, #5, #12  

**膽拖:** C(4,2) = **6** → **$60**  
**Trios:** 7-1-4 | 7-1-5 | 7-1-12 | 7-4-5 | 7-4-12 | 7-5-12  

---

## SCMP (Step 1f) — qualitative only

- **Star Form / prose:** Market focus **#4** Endued (draw **1**), **#7** Amazing Partners (1600m trip note), **#5** Flying Luck (trial / Moreira); several runners with wide-draw / acclimatisation negatives — align with MC tails on **#2**/**#3**/**#8**/**#9**.  
- **TIR:** Notable **#1** barrier / contact; **#5** wide / keen; **#9** bumped; **#11** wide no cover; **#7** lay in final 200m — no automatic % table adjustment here (see Strategy A header).  
- **QP/Q:** Strong **4–7** / **1–7** combinations sit in short end of matrix vs longshots — consistent with MC **1-7** / **4-7** quinella mass.

---

## PASS / CAVEATS

- Going **Good** is analyzer default if card parse fails.  
- HKJC vs SCMP: e.g. **#4** HKJC **2.9** vs SCMP table **~3.8** — flags use **HKJC JSON** for Strategy B.  
- **#5** Adj Place **21.5%** is under the **25%** must-include bar — kept as third **腳** after **#4**/**#2** by Adj Place rank.  
- **#5** MC win thin; leg is jockey/market overlay vs model.  
- Re-run **1d** / **3** if pool shifts materially.  

**CONFIDENCE:** **HIGH** on **#7 / #1 / #4** in the frame; **MEDIUM** on **#2 / #5** for third.

---

*Steps 1b–1f + 2 + 3 executed for this file; Strategy A/B compiled per SKILL.md — replaces earlier R8 trio notes.*
