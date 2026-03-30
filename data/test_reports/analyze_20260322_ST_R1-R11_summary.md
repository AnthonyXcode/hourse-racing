# analyze-race summary — Sha Tin | 2026-03-22

**Command:** `npx tsx tools/analyze-race.ts --date 2026-03-22 --venue "Sha Tin" --race N --form-data all`

**Full log:** `data/test_reports/analyze_20260322_ST_R1-R11_full.log`

## Run status

| Race | Status | Notes |
|------|--------|--------|
| R1–R10 | OK | Race card scraped, MC 10,000 runs, jockey/trainer enrich |
| R11 | **Failed** | No entries — meeting has **10 races** only (invalid race number) |

**Caveats (all successful races):**
- `[WARNING] Could not parse going from race card, defaulting to Good` (R1–R10)
- `[WARNING] No win odds fetched` — value bets / market efficiency not reliable; Total stake HK$0 for all races
- R10: 13/14 horses enriched with form

---

## MC #1 (highest MC Win%) — summary table

| Race | Class / dist | Field | MC #1 (horse) | Win% | Place% | Top quinella (1st line) |
|------|----------------|-------|----------------|------|--------|-------------------------|
| R1 | C4 · 1600m Turf | 14 | **#5** GLORIOUS SUCCES | 18.6% | 44.5% | 1-5: 6.7% |
| R2 | C4 · 1200m Turf | 14 | **#1** BABY SAKURA | 24.3% | 58.6% | 1-9: 11.4% |
| R3 | C3 · 1200m Turf | 10 | **#9** CIRCUIT CHAMPION | 46.0% | 80.7% | 6-9: 16.1% |
| R4 | C4 · 1200m Turf | 14 | **#5** HAPPY SHOOTER | 24.5% | 57.2% | 3-5: 11.5% |
| R5 | C4 · 1400m Turf | 14 | **#2** ALL ROUND WINNER | 29.4% | 64.4% | 1-2: 18.8% |
| R6 | C3 · 1200m Turf | 10 | **#4** HOT DELIGHT | 43.0% | 86.9% | 3-4: 43.2% |
| R7 | G1 · 2000m Turf | 14 | **#3** STORMY GROVE | 21.1% | 48.4% | 2-3: 6.3% |
| R8 | C3 · 1800m Turf | 13 | **#5** MONEY CATCHER | 19.8% | 48.9% | 5-11: 7.2% |
| R9 | C3 · 1400m Turf | 12 | **#9** AEROVOLANIC | 29.6% | 69.3% | 5-9: 17.6% |
| R10 | C2 · 1400m Turf | 14 | **#12** SIX PACK | 22.1% | 53.4% | 4-12: 10.1% |

---

## Historical data (loader)

- **520** historical races indexed; **1265** horse performances (enricher summary).

---

## Files

| File | Description |
|------|-------------|
| `analyze_20260322_ST_R1-R11_full.log` | Raw stdout for R1–R11 (R11 = error block) |
| `analyze_20260322_ST_R1-R11_summary.md` | This summary |

Generated from `tools/analyze-race.ts` runs.
