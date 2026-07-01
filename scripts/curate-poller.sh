#!/bin/bash
#
# curate-poller.sh
# 週1回、直近1週間の newsletters からピックアップ（キュレーション）を自動生成し、
# master に push する。push 後は send-newsletter.yml が CI 上で配信を行う。
#
# launchd から 1 時間ごとに実行される。日曜21:00 ちょうどに PC がオフでも
# 月曜以降に起動すれば次のポーリングで拾われる。
#
# フロー:
#   1. 「直近過去の日曜21:00 (JST)」以降に生成された pickup があれば skip
#   2. git pull で master を最新化、pull 後も再判定
#   3. Terminal.app を開き claude -p '/curate-articles-auto 今週' を実行
#      → 同 Terminal 内で続けて git push origin master
#   4. Moshi へ開始通知
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$HOME/Library/Logs/curate-articles.log"
export TZ="Asia/Tokyo"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"
}

notify() {
  local title="$1"
  local message="$2"
  if [ -n "$MOSHI_TOKEN" ]; then
    curl -s -X POST https://api.getmoshi.app/api/webhook \
      -H "Content-Type: application/json" \
      -d "{\"token\": \"$MOSHI_TOKEN\", \"title\": \"$title\", \"message\": \"$message\"}" >> "$LOG_FILE" 2>&1
  fi
}

# 直近過去の日曜21:00 (JST) の epoch 秒を返す
last_sunday_21_epoch() {
  local candidate now
  candidate=$(date -v-sun -v21H -v0M -v0S "+%s")
  now=$(date "+%s")
  if [ "$candidate" -gt "$now" ]; then
    candidate=$(date -v-sun -v-1w -v21H -v0M -v0S "+%s")
  fi
  echo "$candidate"
}

# newsletters/pickup/YYYY-MM-DD-HHMMSS.md の最新ファイルの epoch を返す（無ければ 0）
latest_pickup_epoch() {
  local latest=""
  for f in "$PROJECT_DIR"/newsletters/pickup/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9][0-9].md; do
    [ -e "$f" ] || continue
    latest="$f"
  done
  if [ -z "$latest" ]; then
    echo "0"
    return
  fi
  local name datepart timepart hour minute second
  name=$(basename "$latest" .md)
  datepart="${name:0:10}"
  timepart="${name:11:6}"
  hour="${timepart:0:2}"
  minute="${timepart:2:2}"
  second="${timepart:4:2}"
  date -j -f "%Y-%m-%d %H:%M:%S" "$datepart $hour:$minute:$second" "+%s" 2>/dev/null || echo "0"
}

log "=== Curate poller started ==="

DEADLINE=$(last_sunday_21_epoch)
LATEST=$(latest_pickup_epoch)
log "Last Sunday 21:00 JST: $(date -r "$DEADLINE" '+%Y-%m-%d %H:%M:%S %a')"
if [ "$LATEST" -gt 0 ]; then
  log "Latest pickup:         $(date -r "$LATEST" '+%Y-%m-%d %H:%M:%S')"
else
  log "Latest pickup:         (none)"
fi

if [ "$LATEST" -ge "$DEADLINE" ]; then
  log "Pickup for this week already exists, skipping"
  log "=== Curate poller finished (skipped) ==="
  exit 0
fi

cd "$PROJECT_DIR"
if ! git checkout master >> "$LOG_FILE" 2>&1; then
  log "ERROR: git checkout master failed"
  notify "Pickup ❌" "git checkout master に失敗しました"
  exit 1
fi
if ! git pull origin master >> "$LOG_FILE" 2>&1; then
  log "ERROR: git pull origin master failed"
  notify "Pickup ❌" "git pull origin master に失敗しました"
  exit 1
fi
log "Git pull completed"

# pull 後にリモートから今週分の pickup が来ていれば skip
LATEST=$(latest_pickup_epoch)
if [ "$LATEST" -ge "$DEADLINE" ]; then
  log "Pickup arrived from remote, skipping"
  log "=== Curate poller finished (skipped after pull) ==="
  exit 0
fi

# 直近1週間のニュースレターが1本もない場合はスキップ
RECENT=$(find "$PROJECT_DIR/newsletters" -maxdepth 1 -name "*.md" -mtime -7 | head -1)
if [ -z "$RECENT" ]; then
  log "No newsletters in the last 7 days, skipping"
  notify "Pickup ⏭️" "直近1週間のニュースレターが無いためスキップしました"
  log "=== Curate poller finished (no source) ==="
  exit 0
fi

log "Launching Terminal for curate-articles-auto"

osascript -e "
  tell application \"Terminal\"
    activate
    do script \"cd $PROJECT_DIR && claude -p '/curate-articles-auto 今週' --dangerously-skip-permissions && git push origin master; echo 'Done - press any key to close'; read\"
  end tell
" >> "$LOG_FILE" 2>&1

notify "Pickup 🚀" "$(date '+%Y-%m-%d') のピックアップ作成を開始しました（Terminal.app）"
log "Opened Terminal for curate-articles-auto"
log "=== Curate poller finished (launched) ==="
