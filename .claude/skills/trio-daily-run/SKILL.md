---
name: trio-daily-run
description: Morning race-day check for HKJC. If today is a Sha Tin / Happy Valley meeting, spawn one agent per race to generate Trio (單T) suggestion reports. If not, report that and stop.
---

# Trio Daily Run

Runs unattended (scheduled 08:07 HKT daily). Decides whether today is a HKJC race day and,
if so, produces one Trio suggestion report per race.

**Project root**: `/Users/anthonycyy/Documents/HR-project/hourse-racing`
Always `cd` there first — the scheduled session does not start in the project.

Skills live in `.claude/skills/`, shared with Cursor via symlink — `skills/` and
`.cursor/skills` both point at it.

---

## Step 1 — Race-day check

```bash
npx tsx tools/check-raceday.ts --json
```

Reads the HKJC fixture calendar live. Output fields:

| Field | Meaning |
|---|---|
| `isRaceDay` | today (Asia/Hong_Kong) is a meeting day |
| `venue` | `ST` (Sha Tin), `HV` (Happy Valley), `CH` (Conghua) |
| `session` | `D` day / `N` night / `T` twilight |
| `raceCount` | number of races carded |
| `nextMeeting` | next meeting `{date, venue, raceCount}` |

Exit code is also a signal: `0` = race day, `1` = no racing, `2` = tool error.

**If the tool errors (exit 2)**: retry once. If it still fails, report the error in chat and stop —
do NOT guess whether it is a race day.

---

## Step 2a — Not a race day

Reply in chat and stop. Nothing else runs, no agents spawned, no files written.

Format:

```
No HK racing today (YYYY-MM-DD, <weekday>).
Next meeting: <date> @ <venue name> — <N> races.
```

---

## Step 2b — Race day: prepare shared data (do this ONCE, serially)

Run before spawning any agents, so the per-race agents share one cache and do not
hammer HKJC in parallel.

```bash
cd /Users/anthonycyy/Documents/HR-project/hourse-racing
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/sync-historical.ts
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/fetch-odds.ts --date=YYYY-MM-DD --venue=<ST|HV> --json --save
```

Confirm the race count:
- Use `raceCount` from Step 1.
- If it is `0` (race conditions not yet published), fall back to the number of races in
  `data/odds/odds_YYYYMMDD_<VENUE>.json`.
- If both are unusable, report the problem in chat and stop.

---

## Step 3 — Spawn one agent per race

One `Agent` call per race, **in waves of 3 concurrent agents**. Wait for a wave to finish
before starting the next — HKJC rate-limits, and each agent runs a 10,000-iteration Monte Carlo.

Each agent gets this self-contained prompt (substitute `<DATE>`, `<VENUE>`, `<VENUE_NAME>`, `<N>`):

> Work in `/Users/anthonycyy/Documents/HR-project/hourse-racing`.
>
> Read `skills/trio-strategy/SKILL.md` in full and follow its 5-step pipeline for
> **race <N> only** of the `<DATE>` `<VENUE_NAME>` meeting.
>
> Non-negotiable:
> - Do NOT skip pipeline steps and do NOT use manual probability estimates — run the tools.
> - Use `--form-data all` on `analyze-race.ts`.
> - Historical sync and meeting odds are already fetched; do not re-run `sync-historical.ts`.
> - The report MUST contain both Strategy A and Strategy B, per the skill.
> - If SCMP data is unavailable, note it as a caveat and continue with raw MC (Strategy B still valid).
>
> Write the report to `data/reports/trio_strategy_<YYYYMMDD>_<VENUE>_R<N>.md` using the skill's
> output format. Reply with: race number, banker, leg count, combo count, total cost, and any caveat.

If an agent fails, note the race as failed and carry on — one bad race must not kill the meeting.

---

## Step 4 — Report in chat

After all waves finish:

```
Race day: <date> @ <venue name> (<session>) — <N> races.
Reports written to data/reports/trio_strategy_<YYYYMMDD>_<VENUE>_R*.md

R1  banker #<n>  <L> legs  <C> combos  $<cost>
R2  ...
...
Failed: <none | R<n>: reason>
```

---

## Caveats to state in the chat summary

- **Morning odds still move.** The run fires ~5h before a day meeting (13:00 post) and ~11h
  before a Happy Valley night meeting (19:00 post). Pools firm up through the day; treat stakes
  as provisional and re-check odds before betting.
- **Scratchings** declared after the run are not reflected. Re-validate the field before betting.
- Reports are suggestions from a model, not advice. Betting risks real money.
