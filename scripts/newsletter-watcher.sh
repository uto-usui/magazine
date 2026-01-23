#!/bin/bash
#
# newsletter-watcher.sh
# iCloud のトリガーファイルを検知して newsletter を実行
#

TRIGGER_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/newsletter-trigger"
LOG_FILE="$HOME/Library/Logs/newsletter-watcher.log"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"
}

# トリガーファイルが存在するか確認
TRIGGER_FILES=$(find "$TRIGGER_DIR" -type f -name "*.trigger" 2>/dev/null)

if [ -z "$TRIGGER_FILES" ]; then
  log "No trigger files found, exiting"
  exit 0
fi

log "Trigger file detected, starting newsletter creation..."

# トリガーファイルを削除（重複実行防止）
rm -f "$TRIGGER_DIR"/*.trigger

# newsletter スクリプトを実行
/Users/usui.y/work/uto/ux-eng-magazine/scripts/create-newsletter.sh >> "$LOG_FILE" 2>&1

if [ $? -eq 0 ]; then
  log "Newsletter created successfully"
else
  log "Newsletter creation failed"
fi
