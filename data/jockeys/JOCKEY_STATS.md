## Elite Jockey Statistics

*Data fetched: 3/28/2026, 10:51:18 PM*

### Current Season Win Rates

| Rank | Jockey | Code | Wins | Rides | Win % | Tier |
|------|--------|------|------|-------|-------|------|
| 1 | J Moreira | MOJ | 2 | 8 | 25.00% | ⭐⭐⭐ Elite |
| 2 | Z Purton | PZ | 91 | 449 | 20.27% | ⭐⭐⭐ Elite |
| 3 | J McDonald | MCJ | 16 | 101 | 15.84% | ⭐⭐ Strong |
| 4 | H Bowman | BH | 44 | 366 | 12.02% | ⭐ Good |
| 5 | A Atzeni | AA | 41 | 377 | 10.88% | ⭐ Good |
| 6 | L Chau | CJE | 31 | 314 | 9.87% | - |
| 7 | M Guyon | GM | 15 | 169 | 8.88% | - |
| 8 | L Ferraris | FEL | 27 | 305 | 8.85% | - |
| 9 | Y Ho | HCY | 26 | 295 | 8.81% | - |
| 10 | W Wong | WEC | 19 | 218 | 8.72% | - |
| 11 | N Wong | WPN | 6 | 74 | 8.11% | - |
| 12 | J Orman | OJM | 23 | 286 | 8.04% | - |
| 13 | H Bentley | BHW | 23 | 302 | 7.62% | - |
| 14 | L Hewitson | HEL | 22 | 312 | 7.05% | - |
| 15 | B McMonagle | MDB | 10 | 142 | 7.04% | - |
| 16 | F Poon | PMF | 21 | 320 | 6.56% | - |
| 17 | C Leung | LDE | 18 | 277 | 6.50% | - |
| 18 | K Teetan | TEK | 25 | 395 | 6.33% | - |
| 19 | A Badel | BA | 19 | 309 | 6.15% | - |
| 20 | L Chung | CCY | 16 | 260 | 6.15% | - |
| 21 | L Yeung | YML | 16 | 295 | 5.42% | - |
| 22 | B Avdulla | AVB | 12 | 288 | 4.17% | - |
| 23 | M Chadwick | CML | 11 | 296 | 3.72% | - |
| 24 | R Kingscote | KRW | 9 | 299 | 3.01% | - |

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