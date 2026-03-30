# 投注推薦 / BETTING RECOMMENDATIONS
## Happy Valley | 04/02/2026 | 賠率更新: bet.hkjc.com

### 本金 / Bankroll: $1,000

*Workflow per @skills/bet-recommendation/SKILL.md: odds from bet.hkjc.com → race card → form analysis → Monte Carlo (10,000 runs) → edge vs market → Kelly staking. Min edge 5%. Max per bet $50, per race $100, per meeting $400.*

---

## 勝出率 / WINNING PERCENTAGE OF RECOMMENDATIONS

*Model probabilities from Monte Carlo (10,000 runs). “Win%” = chance to win (1st); “Place%” = chance to place (1st, 2nd or 3rd).*

| Bet type | Race | Selection | Model Win% | Model Place% | Note |
|----------|------|-----------|------------|--------------|------|
| **Place** | R1 | #1 GOOD LUCK HAPPY | 56.6% | **87.8%** | Place bet: 87.8% = chance to finish 1–2–3 |
| Quinella 膽 | R1 | #1 GOOD LUCK HAPPY | 56.6% | 87.8% | 膽 for 1-4, 1-8 |
| Quinella 膽 | R2 | #4 GIANT BALLON | 34.8% | 73.2% | 膽 for 4-1, 4-7 |
| Quinella 膽 | R3 | #2 HELENE FEELING | 28.1% | 65.7% | 膽 for 2-6, 2-4 |
| Quinella 膽 | R4 | #3 AMAZING GAZE | 29.9% | 67.3% | 膽 for 3-4, 3-1 |
| Quinella 膽 | R5 | #7 TURIN WARRIOR | 19.4% | 49.6% | 膽 for 7-5, 7-3 |
| Quinella 膽 | R6 | #5 CANDLELIGHT DIN | 44.4% | 77.6% | 膽 for 5-3, 5-10 |
| Quinella 膽 | R7 | #5 PERFECTDAY | 47.9% | 79.5% | 膽 for 5-2, 5-8 |
| Quinella 膽 | R8 | #2 STORM RIDER | 31.9% | 64.1% | 膽 for 2-8, 2-9 |

**System backtest (from skill):** WIN strike 56% | PLACE strike 73% | QUINELLA strike 47% (13 meetings, 125 races).

---

## 模擬結果 / SIMULATION RESULTS

| Race | Horse | Model Prob | Market Prob | Edge | Status |
|------|-------|------------|-------------|------|--------|
| R1 | #1 GOOD LUCK HAPPY (Place) | 87.8% | ~72.5% | +21% | ✅ VALUE |
| R2 | #4 GIANT BALLON | 34.8% win | — | — | ❌ No Edge |
| R3 | #2 HELENE FEELING | 28.1% win | — | — | ❌ No Edge |
| R4 | #3 AMAZING GAZE | 29.9% win | — | — | ❌ No Edge |
| R5 | #7 TURIN WARRIOR | 19.4% win | — | — | ❌ No Edge |
| R6 | #5 CANDLELIGHT DIN | 44.4% win | — | — | ❌ No Edge |
| R7 | #5 PERFECTDAY | 47.9% win | — | — | ❌ No Edge |
| R8 | #2 STORM RIDER | 31.9% win | — | — | ❌ No Edge |

---

## 獨贏投注 / WIN BETS (Edge > 5%)

*No WIN bets recommended (engine prefers Place/Quinella; no WIN passed edge in this run).*

| Race | # | Horse | Jockey | Odds | Model% | Edge | Kelly | Stake |
|------|---|-------|--------|------|--------|------|-------|-------|
| — | — | — | — | — | — | — | — | — |

---

## 位置投注 / PLACE BETS (Edge > 5%)

| Race | # | Horse | Odds | Model% | Edge | Stake |
|------|---|-------|------|--------|------|-------|
| R1 | 1 | GOOD LUCK HAPPY | 1.38 | 87.8% | +21% | $50 |

---

## 連贏投注 / QUINELLA BETS (1 膽 + 2 腳)

*Format: 1 膽 + 2 腳 → two combos per race. Model Prob from Monte Carlo. Stake 2% bankroll per line ($20).*

| Race | Combo | Model Prob | Stake |
|------|-------|------------|-------|
| R1 | 1-4 | 29.4% | $20 |
| R1 | 1-8 | 10.8% | $20 |
| R2 | 4-1 | 22.0% | $20 |
| R2 | 4-7 | 13.0% | $20 |
| R3 | 2-6 | 13.6% | $20 |
| R3 | 2-4 | 13.4% | $20 |
| R4 | 3-4 | 17.2% | $20 |
| R4 | 3-1 | 12.7% | $20 |
| R5 | 7-5 | 7.5% | $20 |
| R5 | 7-3 | 7.2% | $20 |
| R6 | 5-3 | 12.9% | $20 |
| R6 | 5-10 | 10.7% | $20 |
| R7 | 5-2 | 14.8% | $20 |
| R7 | 5-8 | 12.2% | $20 |
| R8 | 2-8 | 11.1% | $20 |
| R8 | 2-9 | 10.4% | $20 |

---

## SUMMARY

| Item | Amount |
|------|--------|
| WIN Bets | $0 |
| PLACE Bets | $50 |
| QUINELLA Bets | $320 |
| **Total Staked** | **$370** |
| **Reserve** | **$630** |

---

## PASS RACES (No Value)

- **R2**: No Place/Win bet with edge > 5%
- **R3**: No Place/Win bet with edge > 5%
- **R4**: No Place/Win bet with edge > 5%
- **R5**: No Place/Win bet with edge > 5%
- **R6**: No Place/Win bet with edge > 5%
- **R7**: No Place/Win bet with edge > 5%
- **R8**: No Place/Win bet with edge > 5%

*Quinella above are model-based (1 膽 + 2 腳) suggestions; no market quinella odds in run.*
