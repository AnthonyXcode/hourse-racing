#!/bin/bash
# Every 5 min, 10:00-00:55 HKT: if a race-day slot (PLAN.md §5.2) is due now, draft + publish it once.
# Slot times come from the day's real post times (raceday-slot.ts reads posttimehk.com/api).
. "$(dirname "$0")/lib.sh"
lock marketing-raceday
if paused; then exit 0; fi   # quiet: this runs every 5 minutes
HOUR="$(date +%H)"
# Gate on the HKJC fixture once a day (cached). Skip the gate after midnight (yesterday's post-meeting slot).
if [ "$HOUR" -ge 3 ]; then
  raceday_cached >/dev/null; rc=$?
  if [ "$rc" -eq 1 ]; then exit 0; fi
  if [ "$rc" -ne 0 ]; then exec >> "$LOG_DIR/marketing-raceday-$YMD.log" 2>&1; alert "marketing-raceday $TODAY: race-day check failed (exit $rc)"; exit 1; fi
fi
out="$(npx tsx "$MKT/scripts/raceday-slot.ts" 2>&1)"; src=$?
if [ "$src" -eq 1 ]; then exit 0; fi   # nothing due right now
exec >> "$LOG_DIR/marketing-raceday-$YMD.log" 2>&1
if [ "$src" -ne 0 ]; then alert "marketing-raceday $TODAY: slot check failed: $out"; exit 1; fi
read -r SDATE SLOT <<< "$out"
if [ -f "$QUEUE/$SDATE/$SLOT/.published" ]; then exit 0; fi
log "slot due: $SDATE $SLOT"
if drafted "$SDATE" "$SLOT"; then
  log "drafts exist; publishing any leftovers only"
else
  # Retry spacing for a slot the skill deferred (e.g. dividends not final): at most every 10 min.
  stamp="$STATE_DIR/attempt-${SDATE}-${SLOT}"
  if [ -f "$stamp" ] && [ $(( $(date +%s) - $(stat -f %m "$stamp") )) -lt 600 ]; then log "last attempt < 10 min ago; waiting"; exit 0; fi
  touch "$stamp"
  log "running Claude (marketing skill, slot $SLOT)"
  run_claude "$SDATE" "$SLOT" "race day; $(npx tsx "$MKT/scripts/raceday-slot.ts" --json 2>/dev/null | head -c 600). If the skill says to wait (e.g. dividends not final), write no drafts; this wrapper retries every 10 minutes until the slot window closes"
  log "claude exited with $?"
  if ! drafted "$SDATE" "$SLOT"; then log "no drafts written (deferred or failed); will retry inside the slot window"; exit 0; fi
fi
sweep "$SDATE" "$SLOT"; prc=$?
if [ "$prc" -ne 0 ]; then alert "marketing-raceday $SDATE/$SLOT: publish exit $prc (see marketing/logs/publish.jsonl)"; exit 1; fi
touch "$QUEUE/$SDATE/$SLOT/.published"
log "done"
