# Triple Trio (3T) Betting Cost Table

## How It Works

- **3T** = Pick the top 3 finishers (any order) in **3 consecutive races** (legs)
- **Banker** = A horse that **must** be in the top 3; reduces combinations
- **Combos per leg** = C(non-bankers, 3 − bankers)
- **Total 3T bets** = Leg 1 combos × Leg 2 combos × Leg 3 combos
- Assumes the **same strategy for all 3 legs**

---

## Cost Table (Uniform Strategy Across All Legs)

### 5 Horses Per Leg

| Bankers | Non-Bankers | Combos/Leg | Total Bets | Cost ($10) |
|:-------:|:-----------:|:----------:|:----------:|:----------:|
| 0       | 5           | 10         | 1,000      | $10,000    |
| 1       | 4           | 6          | 216        | $2,160     |

### 6 Horses Per Leg

| Bankers | Non-Bankers | Combos/Leg | Total Bets | Cost ($10) |
|:-------:|:-----------:|:----------:|:----------:|:----------:|
| 0       | 6           | 20         | 8,000      | $80,000    |
| 1       | 5           | 10         | 1,000      | $10,000    |

### 7 Horses Per Leg

| Bankers | Non-Bankers | Combos/Leg | Total Bets | Cost ($10) |
|:-------:|:-----------:|:----------:|:----------:|:----------:|
| 0       | 7           | 35         | 42,875     | $428,750   |
| 1       | 6           | 15         | 3,375      | $33,750    |

---

## Summary Comparison (All Strategies)

| Horses | Bankers | Combos/Leg | Total Bets | Cost ($10) |
|:------:|:-------:|:----------:|:----------:|:----------:|
| 5      | 0       | 10         | 1,000      | $10,000    |
| 5      | 1       | 6          | 216        | $2,160     |
| 6      | 0       | 20         | 8,000      | $80,000    |
| 6      | 1       | 10         | 1,000      | $10,000    |
| 7      | 0       | 35         | 42,875     | $428,750   |
| 7      | 1       | 15         | 3,375      | $33,750    |

---

## Mixed Strategy Examples

When legs have **different** numbers of selections or bankers, multiply each leg's combos individually.

| Leg 1           | Leg 2           | Leg 3           | Total Bets | Cost ($10) |
|:---------------:|:---------------:|:---------------:|:----------:|:----------:|
| 5H, 1B (6)     | 5H, 1B (6)     | 6H, 1B (10)    | 360        | $3,600     |
| 5H, 1B (6)     | 6H, 1B (10)    | 6H, 1B (10)    | 600        | $6,000     |
| 5H, 1B (6)     | 6H, 1B (10)    | 7H, 1B (15)    | 900        | $9,000     |
| 6H, 1B (10)    | 6H, 1B (10)    | 7H, 1B (15)    | 1,500      | $15,000    |
| 5H, 0B (10)    | 5H, 1B (6)     | 6H, 1B (10)    | 600        | $6,000     |
| 5H, 1B (6)     | 5H, 1B (6)     | 7H, 1B (15)    | 540        | $5,400     |
| 6H, 1B (10)    | 7H, 1B (15)    | 7H, 1B (15)    | 2,250      | $22,500    |
| 5H, 0B (10)    | 6H, 1B (10)    | 7H, 1B (15)    | 1,500      | $15,000    |

> **Legend:** `5H, 1B (6)` = 5 horses, 1 banker → 6 combos per leg

---

## Formula Reference

```
Combos per leg = C(total_horses − bankers, 3 − bankers)

where C(n, r) = n! / (r! × (n − r)!)

Total 3T bets = Leg1_combos × Leg2_combos × Leg3_combos
Total cost     = Total bets × $10
```

---

## Budget-Friendly Sweet Spots

| Budget Range     | Recommended Strategy                        | Total Bets |
|:----------------:|:-------------------------------------------:|:----------:|
| ~$2,160          | 5H, 1B per leg                              | 216        |
| ~$3,600          | Mix of 5H & 6H, 1B per leg                 | 360        |
| ~$10,000         | 6H, 1B per leg or 5H, 0B per leg           | 1,000      |
| ~$33,750         | 7H, 1B per leg                              | 3,375      |
