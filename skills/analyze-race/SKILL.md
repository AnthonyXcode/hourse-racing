# Analyze Race Skill

Automate the analysis of HKJC horse races and generate betting recommendations.

## Skill Purpose

This skill guides Cursor through the complete workflow of analyzing a Hong Kong Jockey Club horse race, from data collection to betting recommendations.

## When to Use

Use this skill when:
- User wants to analyze an upcoming HKJC race
- User needs betting recommendations for a specific race
- User wants to compare model predictions with market odds

## Workflow Steps

### Step 1: Gather Race Information

Ask the user for:
1. **Race Date** (format: YYYY-MM-DD)
2. **Venue** (Sha Tin or Happy Valley)
3. **Race Number** (1-11)
4. **Bankroll** (optional, default $10,000 HKD)
5. **Risk Profile** (conservative/moderate/aggressive)

### Step 2: Fetch Race Data

Run the scraper to get race card data:

```bash
npm run scrape:racecard
```

Or use the CLI tool:

```bash
npm run analyze -- --date YYYY-MM-DD --venue "Sha Tin" --race N
```

### Step 3: Analyze Form Factors

For each horse, analyze:
- [ ] Speed ratings from past performances
- [ ] Recent form (last 6 races)
- [ ] Class trajectory (rising/dropping)
- [ ] Days since last race (optimal: 14-35)
- [ ] Draw bias for this track/distance
- [ ] Jockey/trainer statistics
- [ ] Surface and going preferences

### Step 4: Run Simulation

Execute Monte Carlo simulation:
- 10,000 iterations
- Calculate win probabilities
- Calculate place probabilities (top 3)
- Generate quinella probability matrix

### Step 5: Compare with Market

Fetch current odds and calculate:
- [ ] Model probability vs market probability
- [ ] Edge percentage for each bet type
- [ ] Market efficiency (overround)
- [ ] Identify value opportunities (edge > 15%)

### Step 6: Generate Recommendations

Apply betting rules:
- [ ] Filter to value bets only (edge > 15%)
- [ ] Calculate Kelly stakes
- [ ] Apply bankroll constraints (max 5% per bet, 10% per race)
- [ ] Prioritize exotic bets over win bets

### Step 7: Present Results

Output format:
1. Race summary
2. Top contenders table
3. Recommended bets with stakes
4. Edge analysis
5. Confidence level
6. Pass conditions (when to void bets)

## Example Usage

User: "Analyze Race 5 at Sha Tin tomorrow"

Response:
1. Confirm date (check if tomorrow has racing at Sha Tin)
2. Fetch race card for Race 5
3. Run full analysis pipeline
4. Present recommendations in formatted report

## Key Files

- `src/scrapers/raceCard.ts` - Fetch race data
- `src/analysis/formAnalysis.ts` - Analyze form factors
- `src/simulation/monteCarlo.ts` - Run simulations
- `src/betting/recommendations.ts` - Generate recommendations
- `tools/analyze-race.ts` - CLI tool
- `prompts/race-analysis.md` - Analysis prompt template
- `prompts/bet-recommendation.md` - Betting recommendation template

## Important Notes

1. **Always verify odds** - Odds change; refresh before finalizing bets
2. **Check for scratching** - Horses can be withdrawn; void affected bets
3. **Going changes matter** - If going changes significantly, reassess
4. **Never exceed limits** - Stick to bankroll management rules
5. **Record results** - Track all bets for model calibration

## Troubleshooting

### Scraper fails
- Check if HKJC website is accessible
- Verify race date has scheduled races
- Use demo output for testing

### No value found
- This is normal - pass on the race
- Don't force bets; wait for better opportunities

### Odds mismatch
- Market odds update frequently
- Re-fetch odds closer to race time
- Adjust recommendations if edge disappears
