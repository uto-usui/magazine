#!/bin/bash
#
# sync-push.sh
# poller が起動した Terminal から、作成完了後の push をまとめて行う
#
# claude の実行中に RSS 取得 bot が PR をマージすると master が分岐するため、
# push の直前に必ず rebase で取り込んでから push する。
# 素の `git push origin master` は non-fast-forward で弾かれる。
#
# 使い方:
#   ./scripts/sync-push.sh [ラベル]   # ラベルは通知本文に使う（省略可）
#

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$HOME/Library/Logs/newsletter-poller.log"
LABEL="${1:-push}"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') [sync-push] $1" | tee -a "$LOG_FILE"
}

notify() {
  if [ -n "${MOSHI_TOKEN:-}" ]; then
    curl -s -X POST https://api.getmoshi.app/api/webhook \
      -H "Content-Type: application/json" \
      -d "{\"token\": \"$MOSHI_TOKEN\", \"title\": \"$1\", \"message\": \"$2\"}" >> "$LOG_FILE" 2>&1
  fi
}

cd "$PROJECT_DIR" || { log "ERROR: cd $PROJECT_DIR failed"; exit 1; }

log "$LABEL: pull --rebase origin master"
if ! git pull --rebase --autostash origin master 2>&1 | tee -a "$LOG_FILE"; then
  log "ERROR: rebase failed, aborting"
  git rebase --abort >> "$LOG_FILE" 2>&1
  notify "Push ❌" "$LABEL: rebase に失敗しました。手動で解決が必要です"
  exit 1
fi

log "$LABEL: push origin master"
if ! git push origin master 2>&1 | tee -a "$LOG_FILE"; then
  log "ERROR: push failed"
  notify "Push ❌" "$LABEL: git push に失敗しました（SSH 鍵のパスフレーズ等を確認）"
  exit 1
fi

log "$LABEL: push completed"
