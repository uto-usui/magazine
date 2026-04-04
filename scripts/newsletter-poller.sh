#!/bin/bash
#
# newsletter-poller.sh
# GitHub の新着記事PRマージを検知して newsletter を実行
#
# 1時間ごとに launchd から実行される
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LAST_MERGED_FILE="$HOME/.newsletter-last-merged"
LOG_FILE="$HOME/Library/Logs/newsletter-poller.log"
REPO="uto-usui/magazine"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"
}

log "=== Polling started ==="

# 前回処理したマージ時刻を取得
if [ -f "$LAST_MERGED_FILE" ]; then
  LAST_MERGED=$(cat "$LAST_MERGED_FILE")
else
  LAST_MERGED="1970-01-01T00:00:00Z"
fi
log "Last merged: $LAST_MERGED"

# 最近マージされた「新着記事」PRを取得
NEW_MERGED=$(gh pr list --repo "$REPO" \
  --state merged \
  --search "新着記事 in:title" \
  --json mergedAt \
  --limit 1 \
  --jq '.[0].mergedAt // empty' 2>> "$LOG_FILE")

if [ -z "$NEW_MERGED" ]; then
  log "No merged PR found, exiting"
  exit 0
fi

log "Latest merged: $NEW_MERGED"

# 新しいマージがあるかチェック
if [[ "$NEW_MERGED" > "$LAST_MERGED" ]]; then
  log "New merge detected!"

  # まず git pull して最新の記事を取得
  cd "$PROJECT_DIR"
  git checkout master >> "$LOG_FILE" 2>&1
  git pull origin master >> "$LOG_FILE" 2>&1
  log "Git pull completed"

  # 最新の articles フォルダを取得
  LATEST_ARTICLES=$(ls -d "$PROJECT_DIR/articles/"[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9] 2>/dev/null | sort -r | head -1)
  if [ -z "$LATEST_ARTICLES" ]; then
    log "No articles folder found, skipping"
    echo "$NEW_MERGED" > "$LAST_MERGED_FILE"
    exit 0
  fi

  ARTICLES_DATE=$(basename "$LATEST_ARTICLES")
  log "Latest articles date: $ARTICLES_DATE"

  # 同じ日付のニュースレターが存在するかチェック
  EXISTING_NEWSLETTER=$(ls "$PROJECT_DIR/newsletters/${ARTICLES_DATE}"*.md 2>/dev/null | head -1)
  if [ -n "$EXISTING_NEWSLETTER" ]; then
    log "Newsletter for $ARTICLES_DATE already exists: $EXISTING_NEWSLETTER"
    log "Skipping newsletter creation"
    echo "$NEW_MERGED" > "$LAST_MERGED_FILE"
    exit 0
  fi

  log "No newsletter for $ARTICLES_DATE, starting creation..."

  # ターミナルを開いて Claude Code を実行（TTYが必要なため）
  osascript -e "
    tell application \"Terminal\"
      activate
      do script \"cd $PROJECT_DIR && claude -p '/create-newsletter-auto' --dangerously-skip-permissions && git push origin master; echo 'Done - press any key to close'; read\"
    end tell
  " >> "$LOG_FILE" 2>&1

  # マージ時刻を更新（Terminalでの実行結果は非同期なので、ここでは更新のみ）
  echo "$NEW_MERGED" > "$LAST_MERGED_FILE"
  log "Opened Terminal for newsletter creation"
else
  log "No new merge since last check, skipping"
fi

log "=== Polling finished ==="
