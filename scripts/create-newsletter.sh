#!/bin/bash
#
# ニュースレター作成ワンタッチスクリプト
#
# 使い方:
#   ./scripts/create-newsletter.sh [日付]
#
# 例:
#   ./scripts/create-newsletter.sh           # 最新の記事から作成
#   ./scripts/create-newsletter.sh 2026-01-20  # 指定日の記事から作成
#

set -e

# このスクリプトのディレクトリを基準にプロジェクトルートへ移動
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "=== UX Engineering Magazine ニュースレター作成 ==="
echo ""

# masterブランチに切り替え
echo "1. masterブランチに切り替え..."
git checkout master

# 最新の状態を取得
echo "2. git pull で最新化..."
git pull origin master

# Claude Code で /create-newsletter-auto を実行
echo "3. Claude Code でニュースレター作成 → コミット → メール送信..."
echo ""

if [ -n "$1" ]; then
  # 日付引数がある場合
  claude -p "/create-newsletter-auto $1" --dangerously-skip-permissions
else
  # 引数なしの場合
  claude -p "/create-newsletter-auto" --dangerously-skip-permissions
fi

echo ""
echo "=== 完了 ==="
