#!/bin/bash
# 23:45 HKT daily: if today was a race day and Trio reports exist, run the post-race review once.
. "$(dirname "$0")/common.sh"
exec >> "$LOG_DIR/trio-review-$YMD.log" 2>&1
lock trio-review
log "start"
raceday; rc=$?
if [ "$rc" -eq 1 ]; then log "no racing today; done"; exit 0; fi
if [ "$rc" -ne 0 ]; then log "race-day check failed (exit $rc); not running"; exit 1; fi
if ! ls data/reports/trio_strategy_${YMD}_*_R*.md >/dev/null 2>&1; then log "no Trio reports for $TODAY; nothing to review"; exit 0; fi
if ls data/reviews/trio_review_${YMD}_*.md >/dev/null 2>&1; then log "review for $TODAY already exists; skipping"; exit 0; fi
log "running Claude (post-race-review)"
claude -p "Run the post-race-review skill for today's meeting, $TODAY (Hong Kong time). The pre-race Trio reports are data/reports/trio_strategy_${YMD}_*_R*.md. Follow the skill exactly (all steps and deliverables). Do not modify code, do not use git, do not touch .env files." \
  --dangerously-skip-permissions
log "claude exited with $?"
