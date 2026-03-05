# Trio (單T) Betting Cost Table

## How It Works

- **Trio** = Pick the top 3 finishers (any order) in **1 race**
- **Banker** = A horse that **must** be in the top 3; reduces combinations
- **Combos** = C(non-bankers, 3 − bankers)
- **Total bets** = Combos (single race)

---

## Cost Table (By Pool Size)

### 5 Horses

| Bankers | Non-Bankers | Combos | Cost ($10) |
|:-------:|:-----------:|:------:|:----------:|
| 0       | 5           | 10     | $100       |
| 1       | 4           | 6      | $60        |
| 2       | 3           | 3      | $30        |

### 6 Horses

| Bankers | Non-Bankers | Combos | Cost ($10) |
|:-------:|:-----------:|:------:|:----------:|
| 0       | 6           | 20     | $200       |
| 1       | 5           | 10     | $100       |
| 2       | 4           | 4      | $40        |

### 7 Horses

| Bankers | Non-Bankers | Combos | Cost ($10) |
|:-------:|:-----------:|:------:|:----------:|
| 0       | 7           | 35     | $350       |
| 1       | 6           | 15     | $150       |
| 2       | 5           | 5      | $50        |

### 8 Horses

| Bankers | Non-Bankers | Combos | Cost ($10) |
|:-------:|:-----------:|:------:|:----------:|
| 0       | 8           | 56     | $560       |
| 1       | 7           | 21     | $210       |
| 2       | 6           | 6      | $60        |

---

## Summary Comparison (All Strategies)

| Horses | Bankers | Combos | Cost ($10) |
|:------:|:-------:|:------:|:----------:|
| 5      | 0       | 10     | $100       |
| 5      | 1       | 6      | $60        |
| 5      | 2       | 3      | $30        |
| 6      | 0       | 20     | $200       |
| 6      | 1       | 10     | $100       |
| 6      | 2       | 4      | $40        |
| 7      | 0       | 35     | $350       |
| 7      | 1       | 15     | $150       |
| 7      | 2       | 5      | $50        |
| 8      | 0       | 56     | $560       |
| 8      | 1       | 21     | $210       |
| 8      | 2       | 6      | $60        |

---

## Formula Reference

```
Combos = C(total_horses − bankers, 3 − bankers)

where C(n, r) = n! / (r! × (n − r)!)

Total cost = Combos × $10
```

---

## Budget-Friendly Sweet Spots

| Budget Range | Recommended Strategy       | Combos |
|:------------:|:--------------------------:|:------:|
| ~$30–$50     | 5–7H, 2B                  | 3–5    |
| ~$60         | 5H, 1B                    | 6      |
| ~$100        | 5H, 0B or 6H, 1B          | 10     |
| ~$150        | 7H, 1B                    | 15     |
| ~$200        | 6H, 0B                    | 20     |

---

## T vs 2T vs 3T Cost Comparison

With the same per-leg strategy, cost multiplies across legs.

| Strategy       | T Bets | T Cost ($10) | 2T Bets | 2T Cost ($10) | 3T Bets | 3T Cost ($10) |
|:--------------:|:------:|:------------:|:-------:|:-------------:|:-------:|:-------------:|
| 5H, 2B / leg   | 3      | $30          | 9       | $90           | 27      | $270          |
| 5H, 1B / leg   | 6      | $60          | 36      | $360          | 216     | $2,160        |
| 5H, 0B / leg   | 10     | $100         | 100     | $1,000        | 1,000   | $10,000       |
| 6H, 2B / leg   | 4      | $40          | 16      | $160          | 64      | $640          |
| 6H, 1B / leg   | 10     | $100         | 100     | $1,000        | 1,000   | $10,000       |
| 6H, 0B / leg   | 20     | $200         | 400     | $4,000        | 8,000   | $80,000       |
| 7H, 2B / leg   | 5      | $50          | 25      | $250          | 125     | $1,250        |
| 7H, 1B / leg   | 15     | $150         | 225     | $2,250        | 3,375   | $33,750       |
| 7H, 0B / leg   | 35     | $350         | 1,225   | $12,250       | 42,875  | $428,750      |
