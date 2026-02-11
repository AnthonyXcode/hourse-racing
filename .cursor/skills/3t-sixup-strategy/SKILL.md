---
name: 3t-sixup-strategy
description: Generate Triple Trio (3T) and Six Up betting strategies for HKJC meetings. Use when the user asks about 3T, Triple Trio, Six Up, Six Win, multi-race exotic bets, or wants ticket combinations for a meeting.
---

# 3T (Triple Trio) & Six Up Strategy Skill

Generate structured Triple Trio and Six Up strategies using Monte Carlo simulation results.

## Quick Start

```bash
# 1. Run Monte Carlo for each leg (e.g. 3T legs R4, R5, R6)
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date=2026-02-11 --venue="Happy Valley" --race=4 --bankroll=1000
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date=2026-02-11 --venue="Happy Valley" --race=5 --bankroll=1000
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date=2026-02-11 --venue="Happy Valley" --race=6 --bankroll=1000

# 2. Use MC win/place probabilities to select horses per leg
# 3. Build ticket and calculate combinations
```

## Bet Types (HKJC Rules)

### 3T = Triple Trio (NOT Tierce)
- **3 legs** (3 designated races, e.g. R4, R5, R6)
- Each leg: select 1st, 2nd, 3rd in **any order**
- Win = correct 1-2-3 (any order) in ALL 3 legs
- **Consolation**: correct first 2 legs only → 15% of pool
- Min 4 starters per leg; unit bet $2 (if total ≥ $100)

### Six Up (Six Win / Pick 6)
- Select the **winner** of 6 designated races
- All 6 must win for main payout; jackpot can roll over
- Min 3 starters per leg

### Tierce (separate bet, NOT 3T)
- Single race, 1st-2nd-3rd in **correct order**

## 3T Strategy

### Selection Logic
1. **Identify 3T legs** — Usually R4, R5, R6 (confirm on HKJC)
2. **Per leg**: Pick top 3-5 horses by MC place probability to cover actual 1-2-3
3. **Banker legs**: Clear top 3 → use 3 picks. Open race → use 4-5 picks.
4. **Combinations**: Product of picks per leg (e.g. 4×4×4 = 64)

### Stake
- Max 3-5% of meeting bankroll
- Unit bet $2 (if ticket ≥ $100) or $10 minimum
- Budget alternative: reduce one leg to 3 picks

## Six Up Strategy

### Selection Logic
1. **Identify 6 legs** — Usually R4-R9 (confirm on HKJC)
2. **Banker legs**: MC top pick >30% win → single selection
3. **Spread legs**: MC top 2 close → use both
4. **Lines** = product of selections per leg

### Stake
- Max 5-8% of meeting bankroll
- $5-10 per line

## Output Format

See `prompts/3t-six-up-strategy.md` for full template including:
- Per-leg selections with MC probabilities
- Combination count and total stake
- Ticket lines table for Six Up

## Key Files

| File | Purpose |
|------|---------|
| `prompts/3t-six-up-strategy.md` | Full strategy prompt with output templates |
| `tools/analyze-race.ts` | Monte Carlo per race |
| `data/reports/3t_sixup_strategy_*.md` | Saved strategies |
