# Trio first banker — place bet hit rate breakdown

*Generated: 2026-04-20*

Source: `data/reviews/trio_banker_place_dataset.json` — first banker from Strategy A across 18 trio review meetings, cross-referenced with actual results.

**Sample:** 178 races across 18 meetings (99 placed, **55.6%** overall).

## By meeting

| Meeting | Races | Placed | Rate |
|---------|-------|--------|------|
| 19 Feb ST | 11 | 9/11 | 81.8% |
| 22 Feb ST | 10 | 5/10 | 50.0% |
| 25 Feb HV | 9 | 4/9 | 44.4% |
| 01 Mar ST | 11 | 6/11 | 54.5% |
| 04 Mar HV | 9 | 4/9 | 44.4% |
| 08 Mar ST | 11 | 7/11 | 63.6% |
| 11 Mar HV | 8 | 3/8 | 37.5% |
| 15 Mar ST | 11 | 4/11 | 36.4% |
| 18 Mar HV | 9 | 6/9 | 66.7% |
| 22 Mar ST | 10 | 9/10 | 90.0% |
| 25 Mar HV | 9 | 6/9 | 66.7% |
| 29 Mar ST | 11 | 7/11 | 63.6% |
| 01 Apr ST | 9 | 3/9 | 33.3% |
| 06 Apr ST | 11 | 8/11 | 72.7% |
| 08 Apr HV | 9 | 2/9 | 22.2% |
| 12 Apr ST | 10 | 6/10 | 60.0% |
| 15 Apr HV | 9 | 5/9 | 55.6% |
| 19 Apr ST | 11 | 5/11 | 45.5% |

## By venue

| Venue | Races | Placed | Rate |
|-------|-------|--------|------|
| Sha Tin | 116 | 69/116 | 59.5% |
| Happy Valley | 62 | 30/62 | 48.4% |

## By surface

| Surface | Races | Placed | Rate |
|---------|-------|--------|------|
| Turf | 157 | 89/157 | 56.7% |
| AWT | 21 | 10/21 | 47.6% |

## By class

| Class | Races | Placed | Rate |
|-------|-------|--------|------|
| Group 1 | 3 | 3/3 | 100.0% |
| Class 1 | 1 | 1/1 | 100.0% |
| Class 2 | 11 | 7/11 | 63.6% |
| Class 3 | 55 | 31/55 | 56.4% |
| Class 5 | 22 | 12/22 | 54.5% |
| Class 4 | 83 | 44/83 | 53.0% |
| Group 2 | 2 | 1/2 | 50.0% |
| 4 Year Olds | 1 | 0/1 | 0.0% |

## By distance

| Distance | Races | Placed | Rate |
|----------|-------|--------|------|
| 2200m | 2 | 2/2 | 100.0% |
| 2000m | 6 | 5/6 | 83.3% |
| 1000m | 12 | 8/12 | 66.7% |
| 1400m | 30 | 20/30 | 66.7% |
| 1800m | 13 | 8/13 | 61.5% |
| 1600m | 13 | 7/13 | 53.8% |
| 1200m | 76 | 40/76 | 52.6% |
| 1650m | 26 | 9/26 | 34.6% |

## By venue × class

| Venue / Class | Races | Placed | Rate |
|---------------|-------|--------|------|
| ST / Group 1 | 3 | 3/3 | 100.0% |
| ST / Class 1 | 1 | 1/1 | 100.0% |
| ST / Class 2 | 9 | 6/9 | 66.7% |
| ST / Class 3 | 35 | 23/35 | 65.7% |
| HV / Class 5 | 9 | 5/9 | 55.6% |
| ST / Class 5 | 13 | 7/13 | 53.8% |
| ST / Class 4 | 52 | 28/52 | 53.8% |
| HV / Class 4 | 31 | 16/31 | 51.6% |
| HV / Class 2 | 2 | 1/2 | 50.0% |
| ST / Group 2 | 2 | 1/2 | 50.0% |
| HV / Class 3 | 20 | 8/20 | 40.0% |
| ST / 4 Year Olds | 1 | 0/1 | 0.0% |

## By venue × surface

| Venue / Surface | Races | Placed | Rate |
|-----------------|-------|--------|------|
| ST Turf | 95 | 59/95 | 62.1% |
| HV Turf | 62 | 30/62 | 48.4% |
| ST AWT | 21 | 10/21 | 47.6% |

## Key takeaways

1. **Overall 55.6% place rate** — the banker is more likely than not to finish top 3, but at typical place dividends (~$12–15 per $10) this is roughly break-even on flat stakes.
2. **Sha Tin Turf is the strongest segment** (62.1%) — focusing on ST Turf would improve the hit rate by ~6pp.
3. **1650m is the danger zone** (34.6%) — almost all HV races at this distance. Avoid or reduce stake.
4. **HV Class 3 is the model's blind spot** (40%) — form-heavy horses at HV produce more chaos than the MC model can handle.
5. **Higher classes are more predictable** — Class 2+ runs at 63%+, suggesting banker selection is strongest when more form data is available.
