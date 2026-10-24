# Shared setup for the marketing cron wrappers. Reuses tools/cron/common.sh (PATH, TZ, HOME,
# Claude auth, cd to repo root, TODAY/YMD, log, lock, raceday) and adds marketing paths/helpers.
. "$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)/tools/cron/common.sh"
APP="$ROOT/horse-racing-training"
MKT="$APP/marketing"
QUEUE="$MKT/queue"
LOG_DIR="$MKT/logs/cron"
STATE_DIR="$MKT/logs/state"
mkdir -p "$LOG_DIR" "$STATE_DIR"

# Kill switch: marketing/PAUSE stops drafting and publishing.
paused() { [ -f "$MKT/PAUSE" ]; }

# Owner alert (Telegram DM if configured, always logs/alerts.log). Never fails the caller.
alert() { log "ALERT: $*"; npx tsx "$MKT/scripts/alert.ts" --message "$*" || true; }

# Race-day check once per day (cached), same exit codes as raceday(): 0 race day, 1 no racing, 2 error.
raceday_cached() {
  local f="$STATE_DIR/raceday-$YMD"
  if [ -f "$f" ]; then return "$(cat "$f")"; fi
  raceday; local rc=$?
  [ "$rc" -ne 2 ] && echo "$rc" > "$f"
  return "$rc"
}

# True when Claude already drafted this slot (any <channel>.md / telegram.html in the queue folder).
drafted() { compgen -G "$QUEUE/$1/$2/*.md" >/dev/null || [ -f "$QUEUE/$1/$2/telegram.html" ]; }

# Publish whatever is in the queue folder (idempotent: already-published channels are skipped).
sweep() {
  local dir="$QUEUE/$1/$2"
  drafted "$1" "$2" || { log "no drafts in queue/$1/$2"; return 1; }
  npx tsx "$MKT/scripts/publish.ts" --queue "$dir"
}

# Run the marketing skill for one slot. $1 = date, $2 = slot id, $3 = extra context line.
run_claude() {
  local date="$1" slot="$2" ctx="$3"
  local dir="marketing/queue/$date/$slot"
  ( cd "$APP" && claude -p "Use the marketing skill for slot \"$slot\" on $date (Hong Kong time). Context: $ctx. Follow the skill exactly: gather data, draft one post per channel, run its guard checks, and write each draft to $dir/<channel>.md (facebook, instagram, threads, telegram; skip a channel by not writing its file) with any image as $dir/image.jpg or $dir/<channel>.jpg (carousel: <channel>-1.jpg, -2.jpg, ...). Then publish with exactly this command and nothing else: npx tsx marketing/scripts/publish.ts --queue $dir . Report its output. Only create or edit files under marketing/queue/, marketing/out/ and marketing/logs/. Never call Facebook, Instagram, Threads or Telegram APIs directly, never set MARKETING_LIVE, never pass --force, never create or delete marketing/PAUSE, never read or print marketing/.env. Do not modify code, do not use git, do not touch .env files." \
      --dangerously-skip-permissions \
      --disallowedTools "Bash(git:*)" "Bash(crontab:*)" "WebFetch(domain:graph.facebook.com)" "WebFetch(domain:graph.threads.com)" "WebFetch(domain:api.telegram.org)" )
}
