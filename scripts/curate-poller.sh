#!/bin/bash
#
# curate-poller.sh
# 週1回、直近1週間の newsletters からピックアップ（キュレーション）を自動生成し、
# master に push する。push 後は send-newsletter.yml が CI 上で配信を行う。
#
# launchd から毎週日曜の夜に実行される想定。
#
# フロー:
#   1. 当日分の pickup が既に存在すれば終了（二重生成防止）
#   2. git pull で master を最新化
#   3. Terminal.app を開き claude -p '/curate-articles-auto 今週' を実行
#      → 同 Terminal 内で続けて git push origin master
#   4. Moshi へ開始通知
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$HOME/Library/Logs/curate-articles.log"

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

log "=== Curate poller started ==="

TODAY=$(date "+%Y-%m-%d")

# 当日分のピックアップが既に存在すれば何もしない
EXISTING=$(ls "$PROJECT_DIR/newsletters/pickup/${TODAY}"*.md 2>/dev/null | head -1)
if [ -n "$EXISTING" ]; then
  log "Pickup for $TODAY already exists: $EXISTING"
  log "=== Curate poller finished (skipped) ==="
  exit 0
fi

cd "$PROJECT_DIR"
git checkout master >> "$LOG_FILE" 2>&1
git pull origin master >> "$LOG_FILE" 2>&1
log "Git pull completed"

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

notify "Pickup 🚀" "${TODAY} のピックアップ作成を開始しました（Terminal.app）"
log "Opened Terminal for curate-articles-auto"
log "=== Curate poller finished (launched) ==="
