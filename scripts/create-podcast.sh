#!/bin/bash
#
# create-podcast.sh
# ニュースレターの push のあとに続けて、音声バージョンを作って push する
#
# 使い方:
#   ./scripts/create-podcast.sh <対象日付>   # 例: 2026-11-05
#
# ここで失敗しても、ニュースレターはすでに push 済みなので影響しない。
# 予算・1日の本数・作成済みの判定は pnpm run podcast 側で行う。
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
TARGET_DATE="$1"
MOSHI_TOKEN="${MOSHI_TOKEN:-$(sed -n 's/^MOSHI_TOKEN=//p' "$PROJECT_DIR/.env" 2>/dev/null)}"

notify() {
  [ -n "$MOSHI_TOKEN" ] || return 0
  curl -s -X POST https://api.getmoshi.app/api/webhook \
    -H "Content-Type: application/json" \
    -d "{\"token\": \"$MOSHI_TOKEN\", \"title\": \"$1\", \"message\": \"$2\"}" > /dev/null || true
}

trap 'notify "Podcast ❌" "${TARGET_DATE} の音声バージョンの作成に失敗しました"' ERR

cd "$PROJECT_DIR"

if [ -z "$TARGET_DATE" ]; then
  echo "Usage: $0 <YYYY-MM-DD>" >&2
  exit 1
fi

NEWSLETTER=$(ls newsletters/"${TARGET_DATE}"-*.md 2>/dev/null | sort | tail -1)
if [ -z "$NEWSLETTER" ]; then
  echo "${TARGET_DATE} のニュースレターがないので、音声バージョンは作りません"
  exit 0
fi
EPISODE=$(basename "$NEWSLETTER" .md)

echo "=== 音声バージョン: ${EPISODE} ==="
claude -p "/create-podcast ${NEWSLETTER}" --dangerously-skip-permissions

git add state/tts-usage.json
[ -f "podcasts/scripts/${EPISODE}.json" ] && git add "podcasts/scripts/${EPISODE}.json"
if git diff --cached --quiet; then
  echo "コミットする変更はありません"
  exit 0
fi
git commit -m "chore(podcast): add script and usage for ${TARGET_DATE}"
git pull --rebase origin master
git push origin master
