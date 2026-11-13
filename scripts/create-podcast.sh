#!/bin/bash
#
# create-podcast.sh
# ニュースレターの push のあとに続けて、音声バージョンを作って配る
#
# 使い方:
#   ./scripts/create-podcast.sh <対象日付>   # 例: 2026-11-05
#
# 1. claude -p で台本・音声・カバー画像を作る（/create-podcast --content-only）
# 2. 動画と Show Notes を作り、台本・Show Notes・使用額をコミットして push する
# 3. 号の Release を作って MP3・カバー画像・MP4 を置き、「X に投稿できます」と通知する
#
# Release は push のあとに作る。タグを台本のコミットに付けるため。
# ここで失敗しても、ニュースレターはすでに push 済みなので影響しない。
# 予算・1日の本数・作成済みの判定は pnpm run podcast 側で行い、止めたときはそちらが通知する。
#

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
TARGET_DATE="$1"
MOSHI_TOKEN="${MOSHI_TOKEN:-$(sed -n 's/^MOSHI_TOKEN=//p' "$PROJECT_DIR/.env" 2>/dev/null)}"
STEP="準備"

notify() {
  [ -n "$MOSHI_TOKEN" ] || return 0
  jq -n --arg token "$MOSHI_TOKEN" --arg title "$1" --arg message "$2" '{token: $token, title: $title, message: $message}' |
    curl -s -X POST https://api.getmoshi.app/api/webhook -H "Content-Type: application/json" -d @- > /dev/null || true
}

trap 'notify "Podcast ❌" "${TARGET_DATE} の音声バージョンが「${STEP}」で止まりました。Terminal の出力を確認してください"' ERR

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
SCRIPT="podcasts/scripts/${EPISODE}.json"

echo "=== 音声バージョン: ${EPISODE} ==="
STEP="台本と音声"
claude -p "/create-podcast ${NEWSLETTER} --content-only" --dangerously-skip-permissions

# 予算や1日の本数で止まったときは MP3 ができていない。理由は pnpm run podcast が通知済み
if [ ! -f "podcasts/audio/${EPISODE}.mp3" ]; then
  echo "MP3 ができていないので、動画と Release は作りません"
  exit 0
fi

STEP="動画"
pnpm run podcast:video "$SCRIPT"
STEP="Show Notes"
pnpm run podcast:shownotes "$SCRIPT"

STEP="コミットと push"
git add state/tts-usage.json
[ -f "$SCRIPT" ] && git add "$SCRIPT"
[ -f "podcasts/shownotes/${EPISODE}.md" ] && git add "podcasts/shownotes/${EPISODE}.md"
if ! git diff --cached --quiet; then
  git commit -m "chore(podcast): add script, show notes and usage for ${TARGET_DATE}"
  git pull --rebase origin master
  git push origin master
fi

STEP="Release"
OUT=$(pnpm run podcast:release "$SCRIPT" | tee /dev/stderr)
RELEASE_URL=$(echo "$OUT" | grep -oE 'https://github.com/[^ ]+/releases/tag/[^ ]+' | head -1)
TITLE=$(echo "$OUT" | grep -m1 -oE 'UXエンジニアリング・マガジン [0-9]+月[0-9]+日号(（No\.[0-9]+）)?')

notify "Podcast 📣 投稿できます" "${TITLE}: Release の本文と動画で X に投稿してください ${RELEASE_URL}"
