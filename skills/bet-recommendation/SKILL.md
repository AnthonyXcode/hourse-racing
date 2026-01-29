# Betting Recommendation Skill

Generate betting recommendations for upcoming HKJC races using validated strategy rules.

## Skill Purpose

This skill guides Cursor through generating betting recommendations based on:
- **Live jockey statistics** (win %, venue/distance performance)
- **Horse past performances** (form, going record, distance wins)
- Venue-specific adjustments
- Season-specific adjustments

## When to Use

Use this skill when:
- User asks for betting recommendations for a race
- User wants to know what to bet tomorrow
- User asks "which horses should I back?"
- User wants a betting slip for a meeting

## Prerequisites

1. Race card data available (scrape if needed)
2. Historical data for context
3. Know the venue (Sha Tin or Happy Valley)
4. Know the current season (early/mid/late)

## Data Fetching Workflow

### Step 0: Fetch Race Card → Jockey/Horse Data → Apply Strategy

```
1. FETCH RACE CARD
   URL: https://racing.hkjc.com/en-us/local/information/racecard?RaceDate={date}&Racecourse={venue}&RaceNo={race}
   Extract: Horse codes, Jockey IDs from HTML links
   
2. FETCH JOCKEY STATS (for each jockey in race)
   URL: https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId={code}
   Extract: Win %, rides, wins by venue/distance
   
3. FETCH HORSE PROFILES (for each horse in race)
   URL: https://racing.hkjc.com/en-us/local/information/horse?HorseId={code}
   Extract: Rating, form records, going record, distance wins
   
4. APPLY STRATEGY with enriched data
```

### Data to Extract

#### From Race Card:
- Horse number, name, code (e.g., `HK_2024_K129`)
- Jockey name, code (e.g., `PZ`, `MOJ`)
- Trainer name, code
- Draw, weight
- Current odds

#### From Jockey Stats:
| Field | Use |
|-------|-----|
| **Season Win %** | Jockey quality indicator |
| **Wins at venue** | ST vs HV specialist |
| **Wins at distance** | Distance suitability |
| **Recent form (10 days)** | Current momentum |

#### From Horse Profile:
| Field | Use |
|-------|-----|
| **Current Rating** | Class indicator |
| **Past performances** | Form analysis |
| **Going record** | Suitability for today's going |
| **Distance wins** | Distance suitability |
| **Weight history** | Optimal weight range |
| **Gear changes** | First-time blinkers, etc. |

## Strategy Rules (From Backtests)

### Validated Performance (13 meetings, 125 races)
| Bet Type | Strike Rate | ROI |
|----------|-------------|-----|
| WIN | 56% | +202% |
| PLACE | 73% | +146% |
| QUINELLA | 47% | +1,424% |

### Overall: **+338% ROI** on $1,606 staked

## Workflow Steps

### Step 1: Fetch Race Card and Extract IDs

```bash
# Option A: Use scraper
npm run scrape:racecard

# Option B: Fetch directly via URL
https://racing.hkjc.com/en-us/local/information/racecard?RaceDate=2026/02/01&Racecourse=ST&RaceNo=1
```

From the race card HTML, extract:
- **Horse codes** from links: `horse?HorseId=HK_2024_K129` → `HK_2024_K129`
- **Jockey codes** from links: `jockeyprofile?jockeyid=PZ` → `PZ`

### Step 1b: Fetch Jockey Stats for Each Jockey

For each jockey in the race, fetch their stats:
```
https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId={code}
```

Record:
- Season win %
- Wins at today's venue (ST or HV)
- Wins at today's distance

### Step 1c: Fetch Horse Profiles for Each Horse

For each horse in the race, fetch their profile:
```
https://racing.hkjc.com/en-us/local/information/horse?HorseId={code}
```

Record:
- Current rating
- Past performances (last 5-10 races)
- Wins at today's distance
- Record on today's going
- Recent form figures

### Step 2: Apply Venue Adjustment

#### Sha Tin (More Predictable)
| Adjustment | Value |
|------------|-------|
| WIN stake | Standard |
| Favorite confidence | High |
| QNL coverage | Top 2 |
| Expected WIN strike | 60-70% |

#### Happy Valley (More Upsets)
| Adjustment | Value |
|------------|-------|
| WIN stake | **-30%** |
| Favorite confidence | Medium |
| QNL coverage | **Box 3-4 horses** |
| Expected WIN strike | 40-50% |

### Step 3: Apply Season Adjustment

#### Early Season (Sep-Oct)
- More upsets expected
- Reduce WIN stakes by 20%
- Widen QUINELLA coverage
- Be patient with variance

#### Mid Season (Nov-Dec)
- More predictable
- Standard stakes
- Trust form lines
- HKIR period (Dec) - excellent for favorites

#### Late Season (Apr-Jul)
- Hot weather factor
- Watch for tired horses
- International jockeys visiting

### Step 4: Identify Selections (Using Fetched Data)

#### WIN Selections
For each horse, score based on **fetched data**:

```
JOCKEY SCORE (from jockey stats API):
  +3 if jockey season win % > 20%
  +2 if jockey season win % > 15%
  +1 if jockey season win % > 10%
  +2 if jockey has wins at TODAY'S DISTANCE at this venue
  +1 if jockey wins in past 10 race days > 5

HORSE SCORE (from horse profile API):
  +3 if horse won at TODAY'S DISTANCE before
  +2 if horse won on TODAY'S GOING before
  +2 if horse finished 1-2-3 in last start
  +1 if horse finished 1-2-3 in 2nd last start
  +2 if class drop (current rating lower than last race class)
  -1 if horse has never run at this distance
  -2 if horse has poor record on today's going (0 wins from 3+ starts)

DRAW SCORE:
  +1 if good draw for this distance (inside draw for sprints, outside for mile+)

ODDS FILTER:
  Only consider horses with odds 2.0-7.0

TOTAL SCORE ≥ 6 → SELECT for WIN bet
```

#### Jockey Quality Reference (fetch live stats):
| Jockey | Code | Check Live Win % |
|--------|------|------------------|
| Z Purton | PZ | [Fetch](https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId=PZ) |
| J Moreira | MOJ | [Fetch](https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId=MOJ) |
| J McDonald | MCJ | [Fetch](https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId=MCJ) |
| H Bowman | BH | [Fetch](https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId=BH) |
| M Guyon | GM | [Fetch](https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId=GM) |
| K Teetan | TEK | [Fetch](https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId=TEK) |
| A Badel | BA | [Fetch](https://racing.hkjc.com/en-us/local/information/jockeywinstat?JockeyId=BA) |

#### PLACE Selections
```
Using fetched horse profile data:

+2 if horse placed (1-2-3) in 3+ of last 5 starts
+2 if horse has good going record (place rate > 50% on today's going)
+1 if horse has distance experience (3+ runs at this distance)
+1 if jockey place % > 40% (from jockey stats)
-1 if first-time at this venue

ODDS FILTER: 5.0-15.0
TOTAL SCORE ≥ 4 → SELECT for PLACE bet
```

#### QUINELLA Selections
```
1. Identify top 2 horses by WIN score
2. Verify both have WIN score ≥ 5
3. At Happy Valley: expand to top 3-4 if scores close
4. Avoid races with many first-starters (check horse profiles for career starts)

SELECT pair for QUINELLA bet
```

### Step 5: Calculate Stakes

Base bankroll allocation (per $100):
| Bet Type | Allocation | Per Race |
|----------|------------|----------|
| WIN | 45% ($45) | $5-8 per selection |
| PLACE | 25% ($25) | $5 per selection |
| QUINELLA | 20% ($20) | $5 per selection |
| Reserve | 10% ($10) | For specials |

Apply venue adjustment:
- **Happy Valley**: Multiply all by 0.7

### Step 6: Generate Betting Slip

Output format:

```markdown
# BETTING RECOMMENDATIONS
## [Venue] | [Date]

### Bankroll: $100

---

## WIN BETS ($X total)

| Race | Selection | Jockey | Odds | Stake | Reasoning |
|------|-----------|--------|------|-------|-----------|
| R1 | #X HORSE | J McDonald | 3.5 | $7 | Elite jockey, good draw |
| R3 | #Y HORSE | Z Purton | 2.8 | $8 | Favorite, class drop |

---

## PLACE BETS ($X total)

| Race | Selection | Odds | Stake | Reasoning |
|------|-----------|------|-------|-----------|
| R2 | #X HORSE | 8.5 | $5 | Consistent placer |
| R5 | #Y HORSE | 12.0 | $5 | Value pick |

---

## QUINELLA BETS ($X total)

| Race | Selection | Stake | Reasoning |
|------|-----------|-------|-----------|
| R1 | 2-5 | $5 | Top 2 market |
| R4 | 1-3-7 BOX | $5 | HV coverage |

---

## TOTAL STAKED: $XX
## EXPECTED VALUE: +$YY (based on historical ROI)

---

## PASS RACES
- R6: No clear selection, skip
- R8: Too many first-starters, skip

## NOTES
- [Any special considerations]
- [Weather/going changes to watch]
```

### Step 7: Post-Race Review

After racing, record:
1. Each bet result (Win/Lose)
2. Dividends received
3. Total P&L
4. Notes on surprises

Use `prompts/post-race-review.md` template.

## Example Usage

**User**: "Give me betting recommendations for tomorrow at Sha Tin"

**Response**:

### Step 1: Fetch Race Card
```
Fetching: https://racing.hkjc.com/en-us/local/information/racecard?RaceDate=2026/02/01&Racecourse=ST&RaceNo=1

Race 1 Entries:
| # | Horse | Code | Jockey | Jockey Code |
|---|-------|------|--------|-------------|
| 1 | WINNING WING | HK_2024_K129 | H T Mo | MHT |
| 2 | BLAZING WIND | HK_2023_J157 | J McDonald | MCJ |
| 3 | FAMILY FORTUNE | HK_2022_H447 | Z Purton | PZ |
```

### Step 2: Fetch Jockey Stats
```
Jockey: Z Purton (PZ)
- Season Win %: 22.2%
- ST 1200m: 20 wins from 54 rides (37%)
- Recent: 20 wins in last 10 race days

Jockey: J McDonald (MCJ)  
- Season Win %: 16.7%
- ST 1200m: 8 wins from 30 rides (27%)
- Recent: 5 wins in last 10 race days
```

### Step 3: Fetch Horse Profiles
```
Horse: WINNING WING (HK_2024_K129)
- Rating: 91
- Distance wins: 2000m (3 wins)
- Going record: Good (2-1-0 from 4)
- Last 5: 1-5-2-1-1

Horse: BLAZING WIND (HK_2023_J157)
- Rating: 58
- Distance wins: 1200m (2 wins)
- Going record: Good (1-0-1 from 3)
- Last 5: 1-2-4-6-3
```

### Step 4: Score Each Horse
```
WINNING WING:
  Jockey: +2 (MHT 12% win rate)
  Distance: +3 (wins at 2000m)
  Going: +2 (good record on Good)
  Form: +2 (won last start)
  TOTAL: 9 → SELECT for WIN

BLAZING WIND:
  Jockey: +2 (MCJ 16.7% win rate)
  Distance: +3 (wins at 1200m)
  Going: +1 (ok record)
  Form: +2 (won last start)
  TOTAL: 8 → SELECT for WIN
```

### Step 5: Generate Betting Slip
(See betting slip format below)

## Key Files

- `tools/analyze-race.ts` - Race analysis CLI
- `src/betting/recommendations.ts` - Recommendation logic
- `prompts/bet-recommendation.md` - Output template
- `data/historical/` - Form reference data

## Important Reminders

### DO
- Check odds just before betting (they change)
- Verify no late scratchings
- Record all bets for tracking
- Accept variance - bad days happen

### DON'T
- Chase losses with bigger bets
- Bet every race - it's okay to pass
- Back short favorites at Happy Valley
- Ignore going/weather changes

## Risk Warnings

1. **Gambling involves risk** - Only bet what you can afford to lose
2. **Past performance ≠ Future results** - Strategy validated but not guaranteed
3. **Variance is real** - Single meeting can lose 50%
4. **Stay disciplined** - Follow the system, don't go rogue
