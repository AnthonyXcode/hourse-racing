## Elite Jockey Statistics

*Data fetched: 4/18/2026, 10:51:39 PM*

### Current Season Win Rates

| Rank | Jockey | Code | Wins | Rides | Win % | Tier |
|------|--------|------|------|-------|-------|------|
| 1 | J Moreira | MOJ | 7 | 31 | 22.58% | ⭐⭐⭐ Elite |
| 2 | Z Purton | PZ | 98 | 501 | 19.56% | ⭐⭐ Strong |
| 3 | J McDonald | MCJ | 16 | 101 | 15.84% | ⭐⭐ Strong |
| 4 | H Bowman | BH | 49 | 409 | 11.98% | ⭐ Good |
| 5 | A Atzeni | AA | 46 | 428 | 10.75% | ⭐ Good |
| 6 | M Guyon | GM | 15 | 169 | 8.88% | - |
| 7 | L Ferraris | FEL | 29 | 333 | 8.71% | - |
| 8 | Y Ho | HCY | 28 | 325 | 8.62% | - |
| 9 | H Bentley | BHW | 28 | 340 | 8.24% | - |
| 10 | J Orman | OJM | 25 | 325 | 7.69% | - |
| 11 | N Wong | WPN | 7 | 98 | 7.14% | - |
| 12 | B McMonagle | MDB | 10 | 142 | 7.04% | - |
| 13 | A Badel | BA | 24 | 345 | 6.96% | - |
| 14 | L Hewitson | HEL | 23 | 345 | 6.67% | - |
| 15 | L Chung | CCY | 19 | 290 | 6.55% | - |
| 16 | C Leung | LDE | 20 | 306 | 6.54% | - |
| 17 | F Poon | PMF | 22 | 348 | 6.32% | - |
| 18 | K Teetan | TEK | 26 | 439 | 5.92% | - |
| 19 | L Yeung | YML | 16 | 333 | 4.80% | - |
| 20 | B Avdulla | AVB | 15 | 315 | 4.76% | - |
| 21 | R Kingscote | KRW | 12 | 329 | 3.65% | - |
| 22 | M Chadwick | CML | 11 | 318 | 3.46% | - |

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