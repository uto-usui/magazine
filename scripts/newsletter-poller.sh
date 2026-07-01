#!/bin/bash
#
# newsletter-poller.sh
# GitHub の新着記事PRマージを検知して newsletter を自動作成
#
# 1時間ごとに launchd から実行される
#
# フロー:
#   1. pendingファイルがあれば → 前回の作成結果を確認、未完了ならリトライ
#   2. pendingファイルがなければ → 新しいマージを検知して作成開始
#
# ファイル:
#   ~/.newsletter-last-merged  - 最後に処理したマージ時刻
#   ~/.newsletter-pending      - 作成中のニュースレター情報 (日付/マージ時刻/リトライ回数)
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LAST_MERGED_FILE="$HOME/.newsletter-last-merged"
PENDING_FILE="$HOME/.newsletter-pending"
LOG_FILE="$HOME/Library/Logs/newsletter-poller.log"
REPO="uto-usui/magazine"
MAX_RETRIES=3

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

# 対象日付のニュースレター commit があれば subject を返す（無ければ空）
find_newsletter_commit() {
  git -C "$PROJECT_DIR" log --grep="^docs: Add newsletter for $1\$" --format=%s -1 2>/dev/null || true
}

# pendingファイルからニュースレター作成を開始/リトライ
launch_newsletter() {
  local target_date="$1"

  cd "$PROJECT_DIR"
  git checkout master >> "$LOG_FILE" 2>&1
  git pull origin master >> "$LOG_FILE" 2>&1
  log "Git pull completed"

  osascript -e "
    tell application \"Terminal\"
      activate
      do script \"cd $PROJECT_DIR && claude -p '/create-newsletter-auto $target_date' --dangerously-skip-permissions && git push origin master; echo 'Done - press any key to close'; read\"
    end tell
  " >> "$LOG_FILE" 2>&1
}

# gh pr list の結果から最新のマージ時刻を取得（searchフォールバック付き）
get_latest_merged() {
  local result

  # プライマリ: --search で絞り込み
  result=$(gh pr list --repo "$REPO" \
    --state merged \
    --search "新着記事 in:title" \
    --json mergedAt \
    --limit 1 \
    --jq '.[0].mergedAt // empty' 2>> "$LOG_FILE")

  if [ -n "$result" ]; then
    echo "$result"
    return
  fi

  # フォールバック: search なしで取得し jq でフィルタ
  log "Primary search returned empty, trying fallback"
  result=$(gh pr list --repo "$REPO" \
    --state merged \
    --json mergedAt,title \
    --limit 10 \
    --jq '[.[] | select(.title | test("新着記事"))] | .[0].mergedAt // empty' 2>> "$LOG_FILE")

  echo "$result"
}

log "=== Polling started ==="

# ── pending チェック（前回の作成結果を確認） ──
if [ -f "$PENDING_FILE" ]; then
  PENDING_DATE=$(sed -n '1p' "$PENDING_FILE")
  PENDING_MERGED=$(sed -n '2p' "$PENDING_FILE")
  RETRY_COUNT=$(sed -n '3p' "$PENDING_FILE")
  RETRY_COUNT=${RETRY_COUNT:-0}

  log "Pending newsletter for $PENDING_DATE (attempt #$RETRY_COUNT)"

  # ニュースレターが作成されたか確認
  EXISTING=$(ls "$PROJECT_DIR/newsletters/${PENDING_DATE}"*.md 2>/dev/null | head -1)
  if [ -n "$EXISTING" ]; then
    log "Newsletter created successfully: $EXISTING"
    echo "$PENDING_MERGED" > "$LAST_MERGED_FILE"
    rm "$PENDING_FILE"
    notify "Newsletter ✅" "${PENDING_DATE} のニュースレター作成完了"
    log "=== Polling finished (success) ==="
    exit 0
  fi

  # Fallback: LLMが実行日ベースのファイル名で作ってしまった場合に備え、commit subjectで成功判定
  COMMITTED=$(find_newsletter_commit "$PENDING_DATE")
  if [ -n "$COMMITTED" ]; then
    log "Newsletter commit found for $PENDING_DATE: $COMMITTED"
    echo "$PENDING_MERGED" > "$LAST_MERGED_FILE"
    rm "$PENDING_FILE"
    notify "Newsletter ✅" "${PENDING_DATE} のニュースレター作成完了（commit fallback）"
    log "=== Polling finished (success by commit fallback) ==="
    exit 0
  fi

  # リトライ上限チェック
  if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
    log "ERROR: Max retries ($MAX_RETRIES) exceeded for $PENDING_DATE"
    notify "Newsletter ❌" "${PENDING_DATE} のニュースレター作成に${MAX_RETRIES}回失敗。手動確認が必要です"
    echo "$PENDING_MERGED" > "$LAST_MERGED_FILE"
    rm "$PENDING_FILE"
    log "=== Polling finished (max retries exceeded) ==="
    exit 0
  fi

  # リトライ実行
  RETRY_COUNT=$((RETRY_COUNT + 1))
  log "Retrying newsletter creation (attempt #$RETRY_COUNT/$MAX_RETRIES)..."
  printf '%s\n%s\n%s\n' "$PENDING_DATE" "$PENDING_MERGED" "$RETRY_COUNT" > "$PENDING_FILE"

  launch_newsletter "$PENDING_DATE"

  log "Opened Terminal for retry #$RETRY_COUNT"
  log "=== Polling finished (retry launched) ==="
  exit 0
fi

# ── 通常フロー: 新しいマージを検知 ──
if [ -f "$LAST_MERGED_FILE" ]; then
  LAST_MERGED=$(cat "$LAST_MERGED_FILE")
else
  LAST_MERGED="1970-01-01T00:00:00Z"
fi
log "Last merged: $LAST_MERGED"

NEW_MERGED=$(get_latest_merged)

if [ -z "$NEW_MERGED" ]; then
  log "No merged PR found, exiting"
  log "=== Polling finished ==="
  exit 0
fi

log "Latest merged: $NEW_MERGED"

if [[ "$NEW_MERGED" > "$LAST_MERGED" ]]; then
  log "New merge detected!"

  cd "$PROJECT_DIR"
  git checkout master >> "$LOG_FILE" 2>&1
  git pull origin master >> "$LOG_FILE" 2>&1
  log "Git pull completed"

  LATEST_ARTICLES=$(ls -d "$PROJECT_DIR/articles/"[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9] 2>/dev/null | sort -r | head -1)
  if [ -z "$LATEST_ARTICLES" ]; then
    log "No articles folder found, skipping"
    echo "$NEW_MERGED" > "$LAST_MERGED_FILE"
    log "=== Polling finished ==="
    exit 0
  fi

  ARTICLES_DATE=$(basename "$LATEST_ARTICLES")
  log "Latest articles date: $ARTICLES_DATE"

  EXISTING_NEWSLETTER=$(ls "$PROJECT_DIR/newsletters/${ARTICLES_DATE}"*.md 2>/dev/null | head -1)
  if [ -n "$EXISTING_NEWSLETTER" ]; then
    log "Newsletter for $ARTICLES_DATE already exists: $EXISTING_NEWSLETTER"
    echo "$NEW_MERGED" > "$LAST_MERGED_FILE"
    log "=== Polling finished ==="
    exit 0
  fi

  # Fallback: 過去に実行日ベースのファイル名で作られた成功commitがあれば作成済み扱い
  COMMITTED=$(find_newsletter_commit "$ARTICLES_DATE")
  if [ -n "$COMMITTED" ]; then
    log "Newsletter commit already exists for $ARTICLES_DATE: $COMMITTED"
    echo "$NEW_MERGED" > "$LAST_MERGED_FILE"
    log "=== Polling finished (already committed) ==="
    exit 0
  fi

  log "No newsletter for $ARTICLES_DATE, starting creation..."

  # last_merged は更新しない。pending ファイルを作成して次サイクルで確認する
  printf '%s\n%s\n%s\n' "$ARTICLES_DATE" "$NEW_MERGED" "0" > "$PENDING_FILE"

  launch_newsletter "$ARTICLES_DATE"

  log "Opened Terminal for newsletter creation"
else
  log "No new merge since last check, skipping"
fi

log "=== Polling finished ==="
