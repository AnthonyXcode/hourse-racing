# HK Horse Racing AI

AI-assisted Hong Kong horse racing analysis and betting recommendation system.

## Overview

This project provides tools to:
- **Scrape** race data from HKJC (Hong Kong Jockey Club)
- **Analyze** horse performance using speed ratings, form analysis, and jockey/trainer statistics
- **Simulate** race outcomes using Monte Carlo methods
- **Recommend** value bets with Kelly Criterion staking

## Architecture

```mermaid
flowchart TB
    subgraph data [Data Collection]
        Scraper[HKJC Scraper]
        RaceCard[Race Card Parser]
        Historical[Historical Results]
    end
    
    subgraph analysis [Analysis Engine]
        SpeedRating[Speed Rating Calculator]
        FormAnalysis[Form Analyzer]
        JockeyTrainer[Jockey/Trainer Stats]
    end
    
    subgraph prediction [Prediction Layer]
        Simulation[Monte Carlo Simulator]
        Probability[Win/Place Probabilities]
    end
    
    subgraph betting [Betting Recommendations]
        ValueCalc[Value Calculator]
        BetSelector[Bet Type Selector]
        StakeCalc[Kelly Criterion Staking]
    end
    
    data --> analysis
    analysis --> prediction
    prediction --> betting
```

## Data Flow

```mermaid
flowchart LR
    subgraph input [Input]
        HKJC[HKJC Website]
        User[User Config]
    end
    
    subgraph process [Processing]
        Scrape[Scrape Data]
        Analyze[Analyze Form]
        Simulate[Run 10K Simulations]
        Compare[Compare vs Market]
    end
    
    subgraph output [Output]
        Report[Race Report]
        Bets[Bet Recommendations]
        Stakes[Stake Amounts]
    end
    
    HKJC --> Scrape
    User --> Scrape
    Scrape --> Analyze
    Analyze --> Simulate
    Simulate --> Compare
    Compare --> Report
    Compare --> Bets
    Compare --> Stakes
```

## Project Structure

```
hourse-racing/
├── src/
│   ├── scrapers/           # HKJC data scrapers
│   ├── analysis/           # Statistical analysis modules
│   ├── simulation/         # Race simulation engine
│   ├── betting/            # Bet recommendation logic
│   ├── types/              # TypeScript interfaces
│   └── utils/              # Helper functions
├── data/                   # Cached race data (gitignored)
├── prompts/                # AI prompts for analysis
├── tools/                  # CLI tools
├── rules/                  # Cursor rules
└── skills/                 # Cursor skills
```

## Installation

```bash
npm install
npx playwright install chromium
```

## Usage

### Scrape Today's Race Card
```bash
npm run scrape:racecard
```

### Analyze a Race
```bash
npm run analyze -- --race 5 --date 2026-01-29
```

## Simulation Process

```mermaid
flowchart LR
    Input[Horse Ratings] --> Variance[Add Random Variance]
    Variance --> Race[Simulate Race]
    Race --> Record[Record Positions]
    Record --> Check{10,000 runs?}
    Check -->|No| Variance
    Check -->|Yes| Output[Calculate Probabilities]
    Output --> Win[Win %]
    Output --> Place[Place %]
    Output --> Exotic[Quinella Matrix]
```

## Value Detection

```mermaid
flowchart TB
    Model[Model Probability] --> Compare{Edge > 15%?}
    Market[Market Odds] --> Compare
    Compare -->|Yes| Kelly[Calculate Kelly Stake]
    Compare -->|No| Pass[No Bet]
    Kelly --> Constraints[Apply Constraints]
    Constraints --> Recommend[Recommend Bet]
```

## Betting Strategy

Based on research, this system focuses on:
- **Exotic bets** (Quinella, Place, Quinella Place) - pools are less efficient
- **Value threshold**: Only bet when model edge > 15%
- **Kelly staking**: 25-50% fractional Kelly for bankroll management

## Key Prediction Factors

1. Speed ratings (adjusted for class/going)
2. Class trajectory (horses dropping in class)
3. Jockey/Trainer win rates
4. Draw bias (track/distance specific)
5. Recent form and fitness

## Disclaimer

This project is for educational and research purposes only. Gambling involves risk. Never bet more than you can afford to lose.
