## Elite Jockey Statistics

*Data fetched: 4/12/2026, 2:00:33 PM*

### Current Season Win Rates

| Rank | Jockey | Code | Wins | Rides | Win % | Tier |
|------|--------|------|------|-------|-------|------|
| 1 | J Moreira | MOJ | 6 | 17 | 35.29% | ⭐⭐⭐ Elite |
| 2 | Z Purton | PZ | 95 | 484 | 19.63% | ⭐⭐ Strong |
| 3 | J McDonald | MCJ | 16 | 101 | 15.84% | ⭐⭐ Strong |
| 4 | H Bowman | BH | 47 | 397 | 11.84% | ⭐ Good |
| 5 | A Atzeni | AA | 45 | 412 | 10.92% | ⭐ Good |
| 6 | M Guyon | GM | 15 | 169 | 8.88% | - |
| 7 | L Ferraris | FEL | 28 | 322 | 8.70% | - |
| 8 | Y Ho | HCY | 27 | 317 | 8.52% | - |
| 9 | N Wong | WPN | 7 | 87 | 8.05% | - |
| 10 | J Orman | OJM | 25 | 312 | 8.01% | - |
| 11 | H Bentley | BHW | 25 | 327 | 7.65% | - |
| 12 | B McMonagle | MDB | 10 | 142 | 7.04% | - |
| 13 | L Hewitson | HEL | 23 | 333 | 6.91% | - |
| 14 | A Badel | BA | 23 | 338 | 6.80% | - |
| 15 | C Leung | LDE | 20 | 298 | 6.71% | - |
| 16 | L Chung | CCY | 18 | 281 | 6.41% | - |
| 17 | K Teetan | TEK | 25 | 425 | 5.88% | - |
| 18 | L Yeung | YML | 16 | 318 | 5.03% | - |
| 19 | B Avdulla | AVB | 12 | 305 | 3.93% | - |
| 20 | R Kingscote | KRW | 12 | 320 | 3.75% | - |
| 21 | M Chadwick | CML | 11 | 310 | 3.55% | - |

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