# Double Trio (2T) Betting Cost Table

## How It Works

- **2T** = Pick the top 3 finishers (any order) in **2 consecutive races** (legs)
- **Banker** = A horse that **must** be in the top 3; reduces combinations
- **Combos per leg** = C(non-bankers, 3 − bankers)
- **Total 2T bets** = Leg 1 combos × Leg 2 combos
- Assumes the **same strategy for both legs**

---

## Cost Table (Uniform Strategy Across Both Legs)

### 5 Horses Per Leg

| Bankers | Non-Bankers | Combos/Leg | Total Bets | Cost ($10) |
|:-------:|:-----------:|:----------:|:----------:|:----------:|
| 0       | 5           | 10         | 100        | $1,000     |
| 1       | 4           | 6          | 36         | $360       |

### 6 Horses Per Leg

| Bankers | Non-Bankers | Combos/Leg | Total Bets | Cost ($10) |
|:-------:|:-----------:|:----------:|:----------:|:----------:|
| 0       | 6           | 20         | 400        | $4,000     |
| 1       | 5           | 10         | 100        | $1,000     |

### 7 Horses Per Leg

| Bankers | Non-Bankers | Combos/Leg | Total Bets | Cost ($10) |
|:-------:|:-----------:|:----------:|:----------:|:----------:|
| 0       | 7           | 35         | 1,225      | $12,250    |
| 1       | 6           | 15         | 225        | $2,250     |

---

## Summary Comparison (All Strategies)

| Horses | Bankers | Combos/Leg | Total Bets | Cost ($10) |
|:------:|:-------:|:----------:|:----------:|:----------:|
| 5      | 0       | 10         | 100        | $1,000     |
| 5      | 1       | 6          | 36         | $360       |
| 6      | 0       | 20         | 400        | $4,000     |
| 6      | 1       | 10         | 100        | $1,000     |
| 7      | 0       | 35         | 1,225      | $12,250    |
| 7      | 1       | 15         | 225        | $2,250     |

---

## Mixed Strategy Examples

When legs have **different** numbers of selections or bankers, multiply each leg's combos individually.

| Leg 1           | Leg 2           | Total Bets | Cost ($10) |
|:---------------:|:---------------:|:----------:|:----------:|
| 5H, 1B (6)     | 5H, 1B (6)     | 36         | $360       |
| 5H, 1B (6)     | 6H, 1B (10)    | 60         | $600       |
| 5H, 1B (6)     | 7H, 1B (15)    | 90         | $900       |
| 6H, 1B (10)    | 6H, 1B (10)    | 100        | $1,000     |
| 6H, 1B (10)    | 7H, 1B (15)    | 150        | $1,500     |
| 7H, 1B (15)    | 7H, 1B (15)    | 225        | $2,250     |
| 5H, 0B (10)    | 5H, 1B (6)     | 60         | $600       |
| 5H, 0B (10)    | 6H, 1B (10)    | 100        | $1,000     |
| 5H, 0B (10)    | 7H, 1B (15)    | 150        | $1,500     |
| 6H, 0B (20)    | 6H, 1B (10)    | 200        | $2,000     |
| 7H, 1B (15)    | 6H, 1B (10)    | 150        | $1,500     |
| 8H, 1B (21)    | 5H, 1B (6)     | 126        | $1,260     |

> **Legend:** `5H, 1B (6)` = 5 horses, 1 banker → 6 combos per leg

---

## Formula Reference

```
Combos per leg = C(total_horses − bankers, 3 − bankers)

where C(n, r) = n! / (r! × (n − r)!)

Total 2T bets = Leg1_combos × Leg2_combos
Total cost     = Total bets × $10
```

---

## Budget-Friendly Sweet Spots

| Budget Range     | Recommended Strategy                        | Total Bets |
|:----------------:|:-------------------------------------------:|:----------:|
| ~$360            | 5H, 1B per leg                              | 36         |
| ~$600            | Mix of 5H & 6H, 1B per leg                 | 60         |
| ~$1,000          | 6H, 1B per leg or 5H, 0B per leg           | 100        |
| ~$2,250          | 7H, 1B per leg                              | 225        |

---

## 2T vs 3T Cost Comparison

With the same per-leg strategy, 2T is significantly cheaper than 3T because you only multiply across 2 legs instead of 3.

| Strategy       | 2T Bets | 2T Cost ($10) | 3T Bets | 3T Cost ($10) |
|:--------------:|:-------:|:-------------:|:-------:|:-------------:|
| 5H, 1B / leg   | 36      | $360          | 216     | $2,160        |
| 6H, 1B / leg   | 100     | $1,000        | 1,000   | $10,000       |
| 7H, 1B / leg   | 225     | $2,250        | 3,375   | $33,750       |
| 5H, 0B / leg   | 100     | $1,000        | 1,000   | $10,000       |
| 6H, 0B / leg   | 400     | $4,000        | 8,000   | $80,000       |
