# Trio Strategy B (stratC) Review — Happy Valley | 2026-09-09

**Meeting 2 of the 2026/27 season. 8-race card, no scratchings.** First card generated end-to-end by the scheduled `trio-daily-run` agent loop.

## Rules

- **Banker** = MC #1 by raw MC Win%
- **Primary legs** = every other horse with MC Place% > 20%
- **Step B** = any horse with MC Place% ≤ 20% AND Win odds < 10 replaces the lowest-Place% primary leg that is 20–30% with odds > 10; if no such leg exists, it is **added** instead
- **Unit** $10, structure 膽拖, combos = C(N,2)
- **No SCMP adjustments, no jockey boost, all races played**

## Summary

| Metric | Strategy B (MC-only, as bet) | Strategy A (full pipeline) |
|---|---|---|
| Live races | 8 | 8 |
| Hits | **1/8 (12.5%)** | 0/8 (0.0%) |
| Staked | $1,100 | $640 |
| Returned | $344 | $0 |
| **Net P&L** | **−$756** | **−$640** |
| **ROI** | **−68.7%** | **−100.0%** |
| Banker top 3 | 4/8 (50.0%) | 4/8 (50.0%) |

Strategy B took the meeting on hits — its Win-odds swap in R7 produced the card's only return — but paid $460 more in stake to get there. Both strategies share the same banker in all 8 races, so the 4 banker failures (R1, R4, R6, R8) sank both identically.

## Race-by-Race — Strategy B

| R | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Bk top3? | Hit? | Trio $ | Return | P&L |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1200m | Turf | #7 | 5,6,8,9,10,12 | 15 | $150 | 12→11→5 | ❌ | MISS ❌ | $1,074 | $0 | −150 |
| R2 | Class 4 | 1650m | Turf | #1 | 3,4,6,7,9 | 10 | $100 | 1→7→10 | ✅ | MISS ❌ | $2,460 | $0 | −100 |
| R3 | Class 5 | 1200m | Turf | #1 | 2,3,4,7,8,9,10,11 | 28 | $280 | 6→1→11 | ✅ | MISS ❌ | $1,552 | $0 | −280 |
| R4 | Class 4 | 1650m | Turf | #1 | 2,3,4,10,11 | 10 | $100 | 10→4→6 | ❌ | MISS ❌ | $535 | $0 | −100 |
| R5 | Class 3 | 1650m | Turf | #10 | 1,2,3,4,5,6,8 | 21 | $210 | 10→9→3 | ✅ | MISS ❌ | $2,774 | $0 | −210 |
| R6 | Class 4 | 1000m | Turf | #2 | 1,5,6,9 | 6 | $60 | 6→3→5 | ❌ | MISS ❌ | $197 | $0 | −60 |
| R7 | Class 4 | 1200m | Turf | #2 | 1,3,4,7,12 | 10 | $100 | 1→2→12 | ✅ | **HIT ✅** | $344 | $344 | **+244** |
| R8 | Class 3 | 1200m | Turf | #2 | 1,3,4,10,11 | 10 | $100 | 11→4→1 | ❌ | MISS ❌ | $316 | $0 | −100 |

## Race-by-Race — Strategy A

| R | Class | Mode | Banker | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | A | #7 | 5,6,9,10 | 6 | $60 | 12→11→5 | MISS ❌ | $1,074 | $0 | −60 | Banker 7th + #12, #11 outside |
| R2 | Class 4 | A | #1 | 3,4,6,7 | 6 | $60 | 1→7→10 | MISS ❌ | $2,460 | $0 | −60 | Banker won; #10 (32-1) outside |
| R3 | Class 5 | B | #1 | 2,3,4,8,10 | 10 | $100 | 6→1→11 | MISS ❌ | $1,552 | $0 | −100 | Banker 2nd; #6 (49-1), #11 outside |
| R4 | Class 4 | A | #1 | 2,3,4,11 | 6 | $60 | 10→4→6 | MISS ❌ | $535 | $0 | −60 | Banker 9th + #10, #6 outside |
| R5 | Class 3 | B | #10 | 1,3,4,6,8 | 10 | $100 | 10→9→3 | MISS ❌ | $2,774 | $0 | −100 | Banker won; **#9 only gap** |
| R6 | Class 4 | B | #2 | 1,3,4,5,6 | 10 | $100 | 6→3→5 | MISS ❌ | $197 | $0 | −100 | **Banker 12th — all 3 in legs** |
| R7 | Class 4 | B | #2 | 1,3,4,5,6 | 10 | $100 | 1→2→12 | MISS ❌ | $344 | $0 | −100 | Banker 2nd; #12 outside (B had it) |
| R8 | Class 3 | A | #2 | 1,3,10,11 | 6 | $60 | 11→4→1 | MISS ❌ | $316 | $0 | −60 | Banker 6th + #4 (4.2) outside |

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| **A — Banker fail, all 3 placers in pool** | 2 | R6, R8 |
| **B — Banker hit, pool gap** | 3 | R2, R3, R5 |
| **C — Banker fail + pool gap** | 2 | R1, R4 |

Strategy B's wider pools converted two of Strategy A's Pattern C misses into Pattern A — i.e. **the legs were right and only the banker was wrong**. In R8 the Win-odds rule correctly added #4 TYCOON RESOURCES (4.2, MC rank 8, ran 2nd) and in R4 it correctly added #10 AMAZING GAZE (6.6, MC rank 8, **won**). Both were wasted by banker failure.

**The noteworthy miss is R6.** The mandated 1-for-1 swap removed #3 SUPERB KING (MC Place% 24.1%, 14-1) and inserted #9 (MC Place% 5.5%, 7.6). #3 ran **2nd**. The pre-race report predicted this explicitly. Strategy A, which kept #3, had all three placers in its pool — but its banker also failed, so neither collected. The swap cost nothing in P&L this time purely by luck.

## Full MC Place% Table — Per Race


### R1 — Class 5 1200m Turf | Result 12→11→5 | Trio $1074 | MISS ❌

| Seq | # | Horse | MC Win% | MC Place% | SP | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----|------|------|----------|
| ★ | 7 | NOBLE FANS | 35.9% | 72.8% | 8.0 | ✅ | 膽 Banker | 7  |
| L1 | 6 | ALWAYS FLUKE | 27.4% | 65.8% | 7.1 | ✅ | 腳 Leg | 5  |
| L2 | 5 | AUTUMN VIBES | 14.2% | 47.5% | 5.5 | ✅ | 腳 Leg | 3 🥉 |
| L3 | 9 | DASH | 9.8% | 36.3% | 17.0 | ✅ | 腳 Leg | 10  |
| L4 | 10 | TELECOM POWER | 5.5% | 27.2% | 7.0 | ✅ | 腳 Leg | 4  |
| L5 | 12 | TEAM HAPPY | 1.7% | 10.8% | 8.1 | ✅ | 腳 Leg | 1 🥇 |
| L6 | 8 | SOLAR RIVER | 1.5% | 9.2% | 9.2 | ✅ | 腳 Leg | 11  |
| — | 2 | MARVEL AND GOLD | 1.3% | 9.2% | 17.0 | ❌ | — | 6  |
| — | 4 | STORMY KNIGHT | 0.8% | 6.6% | 11.0 | ❌ | — | 8  |
| — | 1 | FLASH STAR | 0.8% | 6.3% | 12.0 | ❌ | — | 12  |
| — | 11 | VON BAER | 0.5% | 5.0% | 18.0 | ❌ | — | 2 🥈 |
| — | 3 | FORTUNE SUPERNOVA | 0.4% | 3.5% | 17.0 | ❌ | — | 9  |

**Pattern analysis.** Banker #7 finished 7 — ticket dead regardless of leg construction. Also outside the pool: #11 (Pattern C).

### R2 — Class 4 1650m Turf | Result 1→7→10 | Trio $2460 | MISS ❌

| Seq | # | Horse | MC Win% | MC Place% | SP | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----|------|------|----------|
| ★ | 1 | MIGHTY STEED | 45.5% | 79.2% | 4.6 | ✅ | 膽 Banker | 1 🥇 |
| L1 | 6 | THE AZURE | 15.6% | 48.8% | 17.0 | ✅ | 腳 Leg | 7  |
| L2 | 3 | STURDY RUBY | 11.3% | 42.1% | 9.9 | ✅ | 腳 Leg | 8  |
| L3 | 7 | FIREFOOT | 9.9% | 38.0% | 6.9 | ✅ | 腳 Leg | 2 🥈 |
| L4 | 4 | CASA ROCHESTER | 8.3% | 34.7% | 8.5 | ✅ | 腳 Leg | 6  |
| L5 | 9 | PRECISION HOPE | 3.9% | 19.8% | 2.8 | ✅ | 腳 Leg | 4  |
| — | 5 | DECISION LINK | 2.2% | 14.6% | 16.0 | ❌ | — | 5  |
| — | 8 | FRANCIS MEYNELL | 2.0% | 13.3% | 13.0 | ❌ | — | 10  |
| — | 2 | CALIFORNIA MOXIE | 0.9% | 6.3% | 16.0 | ❌ | — | 9  |
| — | 10 | CIRCUIT CENTURY | 0.4% | 3.3% | 32.0 | ❌ | — | 3 🥉 |

**Pattern analysis.** Banker #1 placed (1) but the pool leaked: #10 CIRCUIT CENTURY (MC rank 10, Place% 3.3%, SP 32.0, finished 3). Pattern B — the market signal MC missed.

### R3 — Class 5 1200m Turf | Result 6→1→11 | Trio $1552 | MISS ❌

| Seq | # | Horse | MC Win% | MC Place% | SP | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----|------|------|----------|
| ★ | 1 | LAKESHORE HERO | 30.9% | 66.0% | 4.7 | ✅ | 膽 Banker | 2 🥈 |
| L1 | 10 | WINNING DIAMOND | 25.2% | 59.7% | 20.0 | ✅ | 腳 Leg | 11  |
| L2 | 8 | MR GOOD VIBES | 12.5% | 40.3% | 25.0 | ✅ | 腳 Leg | 9  |
| L3 | 4 | MACANESE MASTER | 10.4% | 37.3% | 9.1 | ✅ | 腳 Leg | 4  |
| L4 | 2 | LEAN MASTER | 9.2% | 33.1% | 10.0 | ✅ | 腳 Leg | 8  |
| L5 | 3 | SWAGGER BRO | 3.0% | 14.5% | 7.7 | ✅ | 腳 Leg | 5  |
| L6 | 11 | ORIENTAL SURPRISE | 1.8% | 10.4% | 6.9 | ✅ | 腳 Leg | 3 🥉 |
| L7 | 9 | THOUSAND CUPS | 1.7% | 8.3% | 7.4 | ✅ | 腳 Leg | 6  |
| — | 6 | NO OTHER CHOICE | 1.4% | 8.2% | 23.0 | ❌ | — | 1 🥇 |
| — | 5 | CONRAD THE GREAT | 1.4% | 8.2% | 22.0 | ❌ | — | 12  |
| L8 | 7 | VIGOR ELLEEGANT | 1.4% | 7.8% | 6.1 | ✅ | 腳 Leg | 6  |
| — | 12 | TURF PHOENIX | 1.1% | 6.3% | 21.0 | ❌ | — | 10  |

**Pattern analysis.** Banker #1 placed (2) but the pool leaked: #6 NO OTHER CHOICE (MC rank 9, Place% 8.2%, SP 23.0, finished 1). Pattern B — the market signal MC missed.

### R4 — Class 4 1650m Turf | Result 10→4→6 | Trio $535 | MISS ❌

| Seq | # | Horse | MC Win% | MC Place% | SP | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----|------|------|----------|
| ★ | 1 | SHAMZ | 35.0% | 70.9% | 7.4 | ✅ | 膽 Banker | 9  |
| L1 | 3 | SHOOTING TO TOP | 24.9% | 61.9% | 9.5 | ✅ | 腳 Leg | 6  |
| L2 | 4 | SUNDAY'S SERENADE | 15.6% | 49.6% | 4.7 | ✅ | 腳 Leg | 2 🥈 |
| L3 | 2 | SKY DEEP | 10.2% | 38.3% | 4.4 | ✅ | 腳 Leg | 4  |
| L4 | 11 | THE LION KING | 4.9% | 21.9% | 9.5 | ✅ | 腳 Leg | 11  |
| — | 7 | ROMANTIC LAOS | 2.8% | 14.7% | 15.0 | ❌ | — | 5  |
| — | 6 | INNO SUPER | 2.6% | 15.7% | 16.0 | ❌ | — | 3 🥉 |
| L5 | 10 | AMAZING GAZE | 1.6% | 9.9% | 6.6 | ✅ | 腳 Leg | 1 🥇 |
| — | 5 | MISSION GIANT | 1.3% | 7.9% | 29.0 | ❌ | — | 7  |
| — | 9 | COLOURFUL GAN | 1.0% | 7.3% | 21.0 | ❌ | — | 8  |
| — | 8 | JOLTIN | 0.3% | 2.0% | 13.0 | ❌ | — | 10  |

**Pattern analysis.** Banker #1 finished 9 — ticket dead regardless of leg construction. Also outside the pool: #6 (Pattern C).

### R5 — Class 3 1650m Turf | Result 10→9→3 | Trio $2774 | MISS ❌

| Seq | # | Horse | MC Win% | MC Place% | SP | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----|------|------|----------|
| ★ | 10 | FORTUNATE SON | 18.5% | 44.9% | 17.0 | ✅ | 膽 Banker | 1 🥇 |
| L1 | 8 | SAMARKAND | 15.4% | 40.6% | 13.0 | ✅ | 腳 Leg | 12  |
| L2 | 1 | DEFINITIVE | 13.7% | 37.8% | 16.0 | ✅ | 腳 Leg | 7  |
| L3 | 6 | ANOTHER ZONDA | 11.7% | 33.4% | 11.0 | ✅ | 腳 Leg | 11  |
| L4 | 4 | DO YOUR PART | 9.9% | 31.1% | 5.6 | ✅ | 腳 Leg | 6  |
| L5 | 3 | CHINA WIN | 8.3% | 26.9% | 8.8 | ✅ | 腳 Leg | 3 🥉 |
| — | 9 | WINDLORD | 5.7% | 19.5% | 16.0 | ❌ | — | 2 🥈 |
| — | 12 | GENERAL REDWOOD | 4.7% | 17.0% | 13.0 | ❌ | — | 9  |
| — | 11 | DREAMING TOGETHER | 4.3% | 15.8% | 25.0 | ❌ | — | 10  |
| L6 | 5 | VIOLET STAR | 3.5% | 14.0% | 3.9 | ✅ | 腳 Leg | 4  |
| L7 | 2 | SOLID WIN | 3.1% | 12.4% | 6.7 | ✅ | 腳 Leg | 5  |
| — | 7 | KEEFY | 1.3% | 6.6% | 16.0 | ❌ | — | 8  |

**Pattern analysis.** Banker #10 placed (1) but the pool leaked: #9 WINDLORD (MC rank 7, Place% 19.5%, SP 16.0, finished 2). Pattern B — the market signal MC missed.

### R6 — Class 4 1000m Turf | Result 6→3→5 | Trio $197 | MISS ❌

| Seq | # | Horse | MC Win% | MC Place% | SP | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----|------|------|----------|
| ★ | 2 | BEAUTY SHOW | 31.2% | 69.9% | 2.6 | ✅ | 膽 Banker | 12  |
| L1 | 6 | JUMBO BLESSING | 25.4% | 63.3% | 6.5 | ✅ | 腳 Leg | 1 🥇 |
| L2 | 5 | GEORGIAN SIGMA | 22.8% | 59.3% | 10.0 | ✅ | 腳 Leg | 3 🥉 |
| L3 | 1 | BLUE ILLUSION | 6.5% | 27.4% | 11.0 | ✅ | 腳 Leg | 9  |
| — | 3 | SUPERB KING | 4.7% | 24.1% | 14.0 | ❌ | — | 2 🥈 |
| — | 4 | DOUBLE ALPHA | 3.8% | 19.3% | 23.0 | ❌ | — | 6  |
| — | 8 | HARMONY FIRE | 2.9% | 15.8% | 11.0 | ❌ | — | 4  |
| — | 11 | TURBO JEFFERIES | 1.1% | 7.0% | 15.0 | ❌ | — | 8  |
| L4 | 9 | DAY DAY VICTORY | 0.8% | 5.5% | 7.6 | ✅ | 腳 Leg | 5  |
| — | 10 | LUCKY TWENTY | 0.6% | 4.3% | 34.0 | ❌ | — | 11  |
| — | 7 | GIANT SPIRIT | 0.3% | 3.3% | 28.0 | ❌ | — | 10  |
| — | 12 | ZETA HEDGE | 0.1% | 0.8% | 23.0 | ❌ | — | 7  |

**Pattern analysis.** Banker #2 finished 12 — ticket dead regardless of leg construction. Also outside the pool: #3 (Pattern C).

### R7 — Class 4 1200m Turf | Result 1→2→12 | Trio $344 | **HIT ✅**

| Seq | # | Horse | MC Win% | MC Place% | SP | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----|------|------|----------|
| ★ | 2 | FORERUNNER | 34.0% | 67.9% | 13.0 | ✅ | 膽 Banker | 2 🥈 |
| L1 | 4 | LEADING DRAGON | 20.4% | 53.7% | 5.9 | ✅ | 腳 Leg | 4  |
| L2 | 3 | COPARTNER FLEET | 12.3% | 38.6% | 32.0 | ✅ | 腳 Leg | 10  |
| L3 | 1 | ROBOT LUCKY STAR | 12.1% | 38.9% | 3.1 | ✅ | 腳 Leg | 1 🥇 |
| — | 6 | THE PERFECT MATCH | 5.9% | 24.8% | 12.0 | ❌ | — | 5  |
| — | 5 | PRESTIGE WIN | 5.2% | 20.4% | 36.0 | ❌ | — | 12  |
| L4 | 12 | FORZA LEADER | 3.5% | 15.3% | 7.1 | ✅ | 腳 Leg | 3 🥉 |
| L5 | 7 | GOOD LUCK HAPPY | 1.8% | 10.0% | 8.5 | ✅ | 腳 Leg | 9  |
| — | 8 | KING OBERON | 1.7% | 10.0% | 17.0 | ❌ | — | 6  |
| — | 10 | RYUI KOKOROE | 1.4% | 8.2% | 16.0 | ❌ | — | 7  |
| — | 11 | BITS SUPERSTAR | 1.0% | 6.8% | 12.0 | ❌ | — | 11  |
| — | 9 | WARRIORS DREAM | 0.8% | 5.3% | 17.0 | ❌ | — | 8  |

**Pattern analysis.** Banker #2 placed and all three frame-fillers sat in the pool. Return $344 on $100.

### R8 — Class 3 1200m Turf | Result 11→4→1 | Trio $316 | MISS ❌

| Seq | # | Horse | MC Win% | MC Place% | SP | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----|------|------|----------|
| ★ | 2 | HARMONY N BLESSED | 39.2% | 73.4% | 5.8 | ✅ | 膽 Banker | 6  |
| L1 | 1 | AURIO | 18.9% | 52.3% | 20.0 | ✅ | 腳 Leg | 3 🥉 |
| L2 | 10 | TANG HEART | 13.4% | 44.0% | 12.0 | ✅ | 腳 Leg | 7  |
| L3 | 3 | MOTOR | 10.3% | 36.9% | 8.0 | ✅ | 腳 Leg | 12  |
| L4 | 11 | ACE CHAMPION | 6.4% | 27.4% | 4.1 | ✅ | 腳 Leg | 1 🥇 |
| — | 12 | DEVAS TWELVE | 3.4% | 16.5% | 28.0 | ❌ | — | 11  |
| — | 6 | POWER KOEPP | 3.2% | 16.4% | 18.0 | ❌ | — | 5  |
| L5 | 4 | TYCOON RESOURCES | 1.7% | 10.2% | 4.2 | ✅ | 腳 Leg | 2 🥈 |
| — | 9 | STORMING DRAGON | 1.4% | 9.2% | 18.0 | ❌ | — | 8  |
| — | 7 | KING MILES | 0.8% | 5.2% | 17.0 | ❌ | — | 9  |
| — | 5 | NORTHERN FIRE BALL | 0.7% | 4.7% | 25.0 | ❌ | — | 10  |
| — | 8 | MATTERS MOST | 0.6% | 4.0% | 14.0 | ❌ | — | 4  |

**Pattern analysis.** Banker #2 finished 6 — ticket dead regardless of leg construction. All three placers were in the pool (Pattern A): a bankerless box would have collected $316.

---

## B Banker Performance

| R | B Banker (MC#1) | MC Win% | SP | Placed? | Position |
|---|---|---|---|---|---|
| R1 | #7 NOBLE FANS | 35.9% | 8.0 | ❌ | 7th |
| R2 | #1 MIGHTY STEED | 45.5% | 4.6 | ✅ | **1st** |
| R3 | #1 LAKESHORE HERO | 30.9% | 4.7 | ✅ | 2nd |
| R4 | #1 SHAMZ | 35.0% | 7.4 | ❌ | 9th |
| R5 | #10 FORTUNATE SON | 18.5% | 17.0 | ✅ | **1st** |
| R6 | #2 BEAUTY SHOW | 31.2% | 2.6 | ❌ | 12th |
| R7 | #2 FORERUNNER | 34.0% | 13.0 | ✅ | 2nd |
| R8 | #2 HARMONY N BLESSED | 39.2% | 5.8 | ❌ | 6th |

**Banker top 3: 4/8 (50.0%)** · **Banker win: 2/8 (25.0%)**

No relationship between MC Win% and outcome this meeting: the two winners came from the **lowest** (18.5%) and **highest** (45.5%) MC Win% in the set, while 39.2% and 31.2% both finished out of the money. The two market-defying bankers (#10 at 17.0, #2 at 13.0) both placed; the shortest-priced banker (#2 at 2.6) ran last.
