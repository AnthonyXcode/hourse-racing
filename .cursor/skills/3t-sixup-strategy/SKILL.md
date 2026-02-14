---
name: 3t-sixup-strategy
description: Generate Triple Trio (3T) and Six Up betting strategies for HKJC meetings using a 5-step pipeline (query data, validate, simulate, compile, advise). Use when the user asks about 3T, Triple Trio, Six Up, Six Win, multi-race exotic bets, or wants ticket combinations for a meeting.
---

# 3T (Triple Trio) & Six Up Strategy Skill

Generate structured 3T and Six Up strategies using a strict 5-step data pipeline.

## Pipeline (MUST follow in order)

```
STEP 1: QUERY DATA       → fetch-jockey-stats, fetch-odds, race cards
STEP 2: VALIDATE DATA    → check starters ≥4 (3T) / ≥3 (Six Up), going, scratchings
STEP 3: RUN SIMULATION   → analyze-race.ts per leg (MC 10K iterations)
STEP 4: COMPILE RESULTS  → rank by Place% (3T) / Win% (Six Up), classify Banker/Lean/Open
STEP 5: GENERATE ADVICE  → selections, combinations, stakes, save report
```

**IMPORTANT**: Do NOT skip steps. Do NOT use manual probability estimates. Always run the tools.

## Quick Start

```bash
# Step 1: Fetch data
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-jockey-stats.ts
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=2026-02-11 --venue=HV --json --save

# Step 2: Validate (check race cards on HKJC, confirm 3T/Six Up legs)

# Step 3: Run MC for each leg (e.g. 3T=R4,R5,R6; Six Up=R4-R9)
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/analyze-race.ts --date 2026-02-11 --venue "Happy Valley" --race 4 --bankroll 1000 --kelly 0.35 --min-edge 5
# Repeat for each leg race...

# Step 4-5: Compile and generate (see prompts/3t-six-up-strategy.md)
```

**Note**: Use space-separated args for `analyze-race.ts` (not `=` for `--venue`).

## Leg Classification

| Type | 3T Criteria (Place%) | Six Up Criteria (Win%) | Selections |
|------|---------------------|----------------------|------------|
| Banker | Top horse ≥60% | Top horse ≥35% | 3 (3T) / 1 (Six Up) |
| Lean | Top 45-60% | Top 25-35% | 4 (3T) / 1-2 (Six Up) |
| Open | Top <45% | Top <25% | 4-5 (3T) / 2-3 (Six Up) |

## Budget Rules

- 3T: max **5%** of meeting bankroll
- Six Up: max **8%** of meeting bankroll
- If over budget: reduce picks in most open leg first

## Bet Types (HKJC Rules)

- **3T (Triple Trio)**: 3 legs, select 1-2-3 in any order per leg, win = all 3 legs correct
- **Six Up (Pick 6)**: 6 legs, select winner per leg, win = all 6 correct
- **3T ≠ Tierce**: Tierce is single-race, correct order

## Key Files

| File | Purpose |
|------|---------|
| `prompts/3t-six-up-strategy.md` | Full pipeline prompt with output templates |
| `tools/analyze-race.ts` | Monte Carlo per race |
| `tools/fetch-odds.ts` | Live odds |
| `tools/fetch-jockey-stats.ts` | Jockey stats |
| `data/reports/3t_sixup_strategy_*.md` | Saved strategies |
