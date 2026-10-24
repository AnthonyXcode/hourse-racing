#!/bin/bash
# Mondays 04:15 HKT: refresh the Threads long-lived token (60-day expiry) and health-check every channel.
. "$(dirname "$0")/lib.sh"
exec >> "$LOG_DIR/marketing-tokens-$YMD.log" 2>&1
lock marketing-tokens
log "start"
npx tsx "$MKT/scripts/refresh-tokens.ts"; rc=$?
if [ "$rc" -ne 0 ]; then alert "marketing-tokens $TODAY: token refresh/check problem (see marketing/logs/cron/marketing-tokens-$YMD.log)"; exit 1; fi
log "done"
