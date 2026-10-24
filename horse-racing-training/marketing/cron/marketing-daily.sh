#!/bin/bash
# 20:30 HKT daily (PLAN.md §5.1): on a NON-race day, one post per channel (slot "daily").
# On race days the daily slot is replaced by the race-day slots (marketing-raceday.sh).
. "$(dirname "$0")/lib.sh"
exec >> "$LOG_DIR/marketing-daily-$YMD.log" 2>&1
lock marketing-daily
log "start"
if paused; then log "marketing/PAUSE present; nothing to do"; exit 0; fi
SLOT="daily"
raceday_cached; rc=$?
if [ "$rc" -eq 0 ]; then log "race day: daily slot replaced by race-day slots; done"; exit 0; fi
if [ "$rc" -ne 1 ]; then alert "marketing-daily $TODAY: race-day check failed (exit $rc); not posting"; exit 1; fi
if drafted "$TODAY" "$SLOT"; then
  log "drafts for $TODAY/$SLOT already exist; publishing any leftovers only"
else
  log "running Claude (marketing skill, slot $SLOT)"
  run_claude "$TODAY" "$SLOT" "non-race day; one evergreen/preview post per channel per marketing/PLAN.md"
  log "claude exited with $?"
fi
sweep "$TODAY" "$SLOT"; prc=$?
if [ "$prc" -ne 0 ]; then alert "marketing-daily $TODAY/$SLOT: publish exit $prc (see marketing/logs/publish.jsonl)"; exit 1; fi
log "done"
