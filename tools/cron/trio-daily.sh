#!/bin/bash
# 11:00 HKT daily: on a race day, generate the Trio suggestions (one agent per race, waves of 3).
. "$(dirname "$0")/common.sh"
exec >> "$LOG_DIR/trio-daily-$YMD.log" 2>&1
lock trio-daily
log "start"
raceday; rc=$?
if [ "$rc" -eq 1 ]; then log "no racing today; done"; exit 0; fi
if [ "$rc" -ne 0 ]; then log "race-day check failed (exit $rc); not running"; exit 1; fi
if ls data/reports/trio_strategy_${YMD}_*_R*.md >/dev/null 2>&1; then log "reports for $TODAY already exist; skipping"; exit 0; fi
log "race day: running Claude (trio-daily-run)"
claude -p "Run the trio-daily-run skill for today, $TODAY (Hong Kong time). Follow the skill exactly: race-day check, shared data prep once, then one agent per race in waves of 3, then the chat summary. Write reports only under data/reports/. Do not modify code, do not use git, do not touch .env files." \
  --dangerously-skip-permissions
log "claude exited with $?"
