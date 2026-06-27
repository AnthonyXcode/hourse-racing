# HKJC Bet Trainer

Local practice tool. Pick a past HKJC meeting, build a bet (any pool, with 膽拖 bankers),
see the cost, submit, and get graded HIT/MISS + payout against the real historical result.

Reads the parent repo's data directly — no duplication:
- Race cards: `../data/racecards/racecard_YYYYMMDD_VENUE_RN.json`
- Results:    `../data/historical/results_YYYYMMDD_VENUE.json`

## Run

```bash
npm install
npm run dev      # Vite UI on :5173, API on :8787 (proxied)
```

Open http://localhost:5173. Pick a racing day → race tab (default R1) → bet type →
click horses to pick (click again = banker 膽 for banker pools, again = clear) →
cost updates live → Place bet → HIT/MISS modal.

Production (single process serving built SPA + API):

```bash
npm run build && npm start    # http://localhost:8787
```

## Bet types

Win, Place, Quinella, Quinella Place, Trio, Tierce, First 4 (single race);
Double Trio, Triple Trio (multi-race — leg races taken from the result file's
designated legs; disabled for meetings without them).

## Architecture

```
server/   Express API (reads ../../data, in-memory meeting manifest)
shared/   types + betEngine (combinatorics, dead-heat-aware settlement) — imported by server AND client
src/      React + TS SPA (HKJC-style race card, banker/leg picker, cost bar, result modal)
```

Settlement runs server-side; the client imports `cost()` for the live preview.
Single source of truth for combinatorics in `shared/betEngine`.

## Tests

```bash
npm test
```

Covers combinatorics, dead-heat trio settlement, the place field-size rule (≤6 → 2 places),
missing-dividend handling (hit with unknown payout, not $0), every pool's hit/miss,
and real-data settlement (ST 2026-06-27: R11 trio $854, Double Trio $380,689).
