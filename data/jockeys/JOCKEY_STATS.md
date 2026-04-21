## Elite Jockey Statistics

*Data fetched: 4/21/2026, 1:38:42 PM*

### Current Season Win Rates

| Rank | Jockey | Code | Wins | Rides | Win % | Tier |
|------|--------|------|------|-------|-------|------|
| 1 | J Moreira | MOJ | 8 | 39 | 20.51% | ⭐⭐⭐ Elite |
| 2 | Z Purton | PZ | 100 | 507 | 19.72% | ⭐⭐ Strong |
| 3 | J McDonald | MCJ | 16 | 101 | 15.84% | ⭐⭐ Strong |
| 4 | H Bowman | BH | 50 | 418 | 11.96% | ⭐ Good |
| 5 | A Atzeni | AA | 47 | 439 | 10.71% | ⭐ Good |
| 6 | M Guyon | GM | 15 | 169 | 8.88% | - |
| 7 | Y Ho | HCY | 28 | 325 | 8.62% | - |
| 8 | L Ferraris | FEL | 29 | 339 | 8.55% | - |
| 9 | H Bentley | BHW | 29 | 346 | 8.38% | - |
| 10 | W Wong | WEC | 19 | 235 | 8.09% | - |
| 11 | J Orman | OJM | 25 | 334 | 7.49% | - |
| 12 | B McMonagle | MDB | 10 | 142 | 7.04% | - |
| 13 | A Badel | BA | 24 | 345 | 6.96% | - |
| 14 | L Hewitson | HEL | 23 | 348 | 6.61% | - |
| 15 | C Leung | LDE | 20 | 306 | 6.54% | - |
| 16 | K Teetan | TEK | 29 | 449 | 6.46% | - |
| 17 | L Chung | CCY | 19 | 298 | 6.38% | - |
| 18 | F Poon | PMF | 22 | 357 | 6.16% | - |
| 19 | L Yeung | YML | 16 | 341 | 4.69% | - |
| 20 | B Avdulla | AVB | 15 | 322 | 4.66% | - |
| 21 | R Kingscote | KRW | 12 | 338 | 3.55% | - |
| 22 | M Chadwick | CML | 11 | 324 | 3.40% | - |

### Rating Boosts (for model)

| Win % Range | Rating Boost | Priority |
|-------------|--------------|----------|
| > 20% | +10 | ⭐⭐⭐ Elite |
| 15-20% | +7 | ⭐⭐ Strong |
| 10-15% | +4 | ⭐ Good |
| < 10% | 0 | - |

### Data Source

```bash
# Fetch latest jockey stats
npx tsx tools/fetch-jockey-stats.ts
```

URL: `https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId={code}`