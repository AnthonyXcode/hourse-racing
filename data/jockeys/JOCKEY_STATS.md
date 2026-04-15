## Elite Jockey Statistics

*Data fetched: 4/15/2026, 11:36:36 AM*

### Current Season Win Rates

| Rank | Jockey | Code | Wins | Rides | Win % | Tier |
|------|--------|------|------|-------|-------|------|
| 1 | J Moreira | MOJ | 6 | 23 | 26.09% | ⭐⭐⭐ Elite |
| 2 | Z Purton | PZ | 96 | 493 | 19.47% | ⭐⭐ Strong |
| 3 | J McDonald | MCJ | 16 | 101 | 15.84% | ⭐⭐ Strong |
| 4 | H Bowman | BH | 47 | 402 | 11.69% | ⭐ Good |
| 5 | A Atzeni | AA | 46 | 420 | 10.95% | ⭐ Good |
| 6 | M Guyon | GM | 15 | 169 | 8.88% | - |
| 7 | L Ferraris | FEL | 29 | 329 | 8.81% | - |
| 8 | Y Ho | HCY | 28 | 323 | 8.67% | - |
| 9 | W Wong | WEC | 19 | 229 | 8.30% | - |
| 10 | J Orman | OJM | 25 | 318 | 7.86% | - |
| 11 | H Bentley | BHW | 26 | 333 | 7.81% | - |
| 12 | N Wong | WPN | 7 | 91 | 7.69% | - |
| 13 | B McMonagle | MDB | 10 | 142 | 7.04% | - |
| 14 | A Badel | BA | 24 | 345 | 6.96% | - |
| 15 | L Hewitson | HEL | 23 | 339 | 6.78% | - |
| 16 | C Leung | LDE | 20 | 306 | 6.54% | - |
| 17 | F Poon | PMF | 22 | 342 | 6.43% | - |
| 18 | L Chung | CCY | 18 | 287 | 6.27% | - |
| 19 | K Teetan | TEK | 26 | 434 | 5.99% | - |
| 20 | L Yeung | YML | 16 | 327 | 4.89% | - |
| 21 | B Avdulla | AVB | 14 | 312 | 4.49% | - |
| 22 | T Mo | MHT | 4 | 98 | 4.08% | - |
| 23 | M Chadwick | CML | 11 | 313 | 3.51% | - |

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