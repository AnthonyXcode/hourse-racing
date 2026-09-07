---
name: research-notes
description: Write a research note to the notes/ directory recording a finding from a backtest, model tune, or strategy experiment. Use whenever a backtest/analysis produces a result worth keeping, when the user says "save this finding", "write a note", "record this", or after any experiment that changes (or could change) the model or betting strategy.
---

# Research Notes Skill

Persist findings so they are not lost between sessions. Every backtest result,
model-tuning decision, or strategy experiment that produced a number worth
remembering gets one note in `notes/`.

## When to write a note
- A backtest produced a hit rate / ROI worth keeping.
- A model or form-analysis parameter was changed (record before/after + why).
- An experiment was tried and **rejected** (negative results are findings too).
- The user says "save this", "note this", "record the finding".

Do NOT write a note for trivial one-off queries with no decision value.

## Where
- One file per finding: `notes/YYYY-MM-DD-slug.md` (kebab-case slug).
- Add a row to the `notes/README.md` index table (Date | link | Status).
- If a note supersedes an older one, link it and set the old one's `status: superseded`.

## Format (required)

Frontmatter:
```yaml
---
title: <one-line summary>
date: YYYY-MM-DD
tags: [backtest, place-bet, ...]
status: confirmed | confirmed-directional | rejected | open | superseded
sample: <n races / horses, date range, venue>
tools: [tools/xxx.ts, ...]
data: <data globs used>
---
```

Body sections, in this order. Omit a section only if truly N/A.

1. **Question** — the exact thing being tested, one or two sentences.
2. **Method** — universe, ranking metric, skip rules, definitions (be precise:
   e.g. "never ran distance = no PP with exact distance == race.distance").
3. **Result** — a table with n, hits, hit-rate (and ROI if money). Numbers, not prose.
4. **Interpretation** — what the numbers mean. Name the actionable subset.
5. **Caveats** — sample size, iteration counts, data gaps. Be honest about thin samples.
6. **Action taken** — code/strategy changes made as a result (with file:line). State
   the measured impact, even if "≈ nil".
7. **Recommendation (open)** — follow-ups not yet done.
8. **Reproduce** — exact command(s) to regenerate the result.

## Rules
- **Numbers over adjectives.** Always give n and the fraction (`31/73 = 42.5%`), never
  just "low" or "good".
- **Record rejections.** A strategy that lost money is a finding — write it.
- **Honest caveats.** If the sample is <30, say so and mark `confirmed-directional`, not `confirmed`.
- **Reproducible.** Every note must carry the command to regenerate it.
- **Link, don't duplicate.** Reference related notes by filename; don't restate them.
- Keep the `notes/README.md` index current on every new note.
