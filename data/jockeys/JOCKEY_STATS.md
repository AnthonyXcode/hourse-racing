## Elite Jockey Statistics

*Data fetched: 4/8/2026, 9:47:39 AM*

### Current Season Win Rates

| Rank | Jockey | Code | Wins | Rides | Win % | Tier |
|------|--------|------|------|-------|-------|------|
| 1 | J Moreira | MOJ | 2 | 8 | 25.00% | ⭐⭐⭐ Elite |
| 2 | Z Purton | PZ | 94 | 477 | 19.71% | ⭐⭐ Strong |
| 3 | J McDonald | MCJ | 16 | 101 | 15.84% | ⭐⭐ Strong |
| 4 | H Bowman | BH | 45 | 390 | 11.54% | ⭐ Good |
| 5 | A Atzeni | AA | 45 | 406 | 11.08% | ⭐ Good |
| 6 | L Chau | CJE | 34 | 337 | 10.09% | ⭐ Good |
| 7 | M Guyon | GM | 15 | 169 | 8.88% | - |
| 8 | L Ferraris | FEL | 28 | 322 | 8.70% | - |
| 9 | Y Ho | HCY | 27 | 311 | 8.68% | - |
| 10 | J Orman | OJM | 25 | 306 | 8.17% | - |
| 11 | H Bentley | BHW | 25 | 320 | 7.81% | - |
| 12 | B McMonagle | MDB | 10 | 142 | 7.04% | - |
| 13 | L Hewitson | HEL | 23 | 327 | 7.03% | - |
| 14 | A Badel | BA | 23 | 330 | 6.97% | - |
| 15 | C Leung | LDE | 20 | 292 | 6.85% | - |
| 16 | K Teetan | TEK | 25 | 419 | 5.97% | - |
| 17 | L Chung | CCY | 16 | 275 | 5.82% | - |
| 18 | L Yeung | YML | 16 | 315 | 5.08% | - |
| 19 | B Avdulla | AVB | 12 | 302 | 3.97% | - |
| 20 | M Chadwick | CML | 11 | 308 | 3.57% | - |

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