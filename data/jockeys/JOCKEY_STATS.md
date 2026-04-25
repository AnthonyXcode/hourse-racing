## Elite Jockey Statistics

*Data fetched: 4/25/2026, 2:51:40 PM*

### Current Season Win Rates

| Rank | Jockey | Code | Wins | Rides | Win % | Tier |
|------|--------|------|------|-------|-------|------|
| 1 | Z Purton | PZ | 102 | 514 | 19.84% | ⭐⭐ Strong |
| 2 | J Moreira | MOJ | 8 | 47 | 17.02% | ⭐⭐ Strong |
| 3 | Y Yuen | YHY | 4 | 24 | 16.67% | ⭐⭐ Strong |
| 4 | J McDonald | MCJ | 16 | 101 | 15.84% | ⭐⭐ Strong |
| 5 | E Brown | BEP | 1 | 7 | 14.29% | ⭐ Good |
| 6 | H Bowman | BH | 50 | 424 | 11.79% | ⭐ Good |
| 7 | A Atzeni | AA | 48 | 447 | 10.74% | ⭐ Good |
| 8 | L Chau | CJE | 35 | 368 | 9.51% | - |
| 9 | M Guyon | GM | 15 | 169 | 8.88% | - |
| 10 | Y Ho | HCY | 28 | 328 | 8.54% | - |
| 11 | L Ferraris | FEL | 29 | 341 | 8.50% | - |
| 12 | H Bentley | BHW | 29 | 349 | 8.31% | - |
| 13 | A Badel | BA | 26 | 351 | 7.41% | - |
| 14 | J Orman | OJM | 25 | 338 | 7.40% | - |
| 15 | B McMonagle | MDB | 10 | 142 | 7.04% | - |
| 16 | L Hewitson | HEL | 23 | 352 | 6.53% | - |
| 17 | C Leung | LDE | 20 | 310 | 6.45% | - |
| 18 | K Teetan | TEK | 29 | 456 | 6.36% | - |
| 19 | L Chung | CCY | 19 | 301 | 6.31% | - |
| 20 | L Yeung | YML | 16 | 345 | 4.64% | - |
| 21 | B Avdulla | AVB | 15 | 325 | 4.62% | - |
| 22 | M Chadwick | CML | 11 | 325 | 3.38% | - |

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