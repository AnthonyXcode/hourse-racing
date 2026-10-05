# Shared setup for the cron wrappers (cron starts with an almost empty environment).
set -u
ROOT="/Users/anthonycyy/Documents/HR-project/hourse-racing"
export PATH="/Users/anthonycyy/.local/bin:/Users/anthonycyy/.nvm/versions/node/v22.22.3/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
export TZ="Asia/Hong_Kong"
export HOME="/Users/anthonycyy"
# Claude auth for cron (Keychain login is not reachable from cron); token file lives outside the repo.
[ -f "$HOME/.config/hr-cron.env" ] && . "$HOME/.config/hr-cron.env"
cd "$ROOT" || exit 2
TODAY="$(date +%Y-%m-%d)"
YMD="$(date +%Y%m%d)"
LOG_DIR="$ROOT/logs/cron"
mkdir -p "$LOG_DIR"
log() { echo "[$(date '+%F %T')] $*"; }

# One run at a time per job (mkdir is atomic; macOS has no flock).
lock() {
  LOCK="/tmp/hr-cron-$1.lock"
  if ! mkdir "$LOCK" 2>/dev/null; then log "another $1 run is in progress; skipping"; exit 0; fi
  trap 'rmdir "$LOCK"' EXIT
}

# Race-day check without starting Claude: 0 = race day, 1 = no racing, 2 = tool error (retried once).
raceday() {
  local out code
  out="$(npx tsx tools/check-raceday.ts --json 2>&1)"; code=$?
  if [ "$code" -eq 2 ]; then log "race-day check failed; retrying in 60s"; sleep 60; out="$(npx tsx tools/check-raceday.ts --json 2>&1)"; code=$?; fi
  echo "$out" | head -8
  return "$code"
}
