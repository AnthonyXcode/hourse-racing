## Elite Jockey Statistics

*Data fetched: 4/5/2026, 11:53:25 PM*

### Current Season Win Rates

| Rank | Jockey | Code | Wins | Rides | Win % | Tier |
|------|--------|------|------|-------|-------|------|
| 1 | J Moreira | MOJ | 2 | 8 | 25.00% | ⭐⭐⭐ Elite |
| 2 | Y Yuen | YHY | 1 | 5 | 20.00% | ⭐⭐ Strong |
| 3 | Z Purton | PZ | 92 | 466 | 19.74% | ⭐⭐ Strong |
| 4 | J McDonald | MCJ | 16 | 101 | 15.84% | ⭐⭐ Strong |
| 5 | H Bowman | BH | 44 | 382 | 11.52% | ⭐ Good |
| 6 | A Atzeni | AA | 44 | 396 | 11.11% | ⭐ Good |
| 7 | L Chau | CJE | 34 | 329 | 10.33% | ⭐ Good |
| 8 | M Guyon | GM | 15 | 169 | 8.88% | - |
| 9 | Y Ho | HCY | 27 | 305 | 8.85% | - |
| 10 | L Ferraris | FEL | 28 | 319 | 8.78% | - |
| 11 | W Wong | WEC | 19 | 224 | 8.48% | - |
| 12 | J Orman | OJM | 24 | 300 | 8.00% | - |
| 13 | H Bentley | BHW | 24 | 311 | 7.72% | - |
| 14 | B McMonagle | MDB | 10 | 142 | 7.04% | - |
| 15 | L Hewitson | HEL | 22 | 322 | 6.83% | - |
| 16 | C Leung | LDE | 19 | 287 | 6.62% | - |
| 17 | A Badel | BA | 21 | 321 | 6.54% | - |
| 18 | K Teetan | TEK | 25 | 409 | 6.11% | - |
| 19 | L Yeung | YML | 16 | 311 | 5.14% | - |
| 20 | T Mo | MHT | 4 | 92 | 4.35% | - |
| 21 | B Avdulla | AVB | 12 | 296 | 4.05% | - |
| 22 | M Chadwick | CML | 11 | 302 | 3.64% | - |

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