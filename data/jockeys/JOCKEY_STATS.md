## Elite Jockey Statistics

*Data fetched: 4/1/2026, 1:38:18 PM*

### Current Season Win Rates

| Rank | Jockey | Code | Wins | Rides | Win % | Tier |
|------|--------|------|------|-------|-------|------|
| 1 | J Moreira | MOJ | 2 | 8 | 25.00% | ⭐⭐⭐ Elite |
| 2 | Z Purton | PZ | 91 | 458 | 19.87% | ⭐⭐ Strong |
| 3 | J McDonald | MCJ | 16 | 101 | 15.84% | ⭐⭐ Strong |
| 4 | H Bowman | BH | 44 | 376 | 11.70% | ⭐ Good |
| 5 | A Atzeni | AA | 43 | 388 | 11.08% | ⭐ Good |
| 6 | L Chau | CJE | 33 | 323 | 10.22% | ⭐ Good |
| 7 | Y Ho | HCY | 27 | 301 | 8.97% | - |
| 8 | M Guyon | GM | 15 | 169 | 8.88% | - |
| 9 | L Ferraris | FEL | 27 | 314 | 8.60% | - |
| 10 | W Wong | WEC | 19 | 222 | 8.56% | - |
| 11 | J Orman | OJM | 24 | 293 | 8.19% | - |
| 12 | H Bentley | BHW | 24 | 307 | 7.82% | - |
| 13 | B McMonagle | MDB | 10 | 142 | 7.04% | - |
| 14 | L Hewitson | HEL | 22 | 317 | 6.94% | - |
| 15 | F Poon | PMF | 22 | 329 | 6.69% | - |
| 16 | A Badel | BA | 21 | 316 | 6.65% | - |
| 17 | C Leung | LDE | 18 | 281 | 6.41% | - |
| 18 | K Teetan | TEK | 25 | 402 | 6.22% | - |
| 19 | L Chung | CCY | 16 | 266 | 6.02% | - |
| 20 | L Yeung | YML | 16 | 303 | 5.28% | - |
| 21 | B Avdulla | AVB | 12 | 293 | 4.10% | - |
| 22 | M Chadwick | CML | 11 | 299 | 3.68% | - |

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