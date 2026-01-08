# PR通知ワークフロー - 技術調査結果

## 調査日: 2026-01-08

## 📁 調査対象ファイル

- `.github/workflows/fetch-rss.yml` - 現在のワークフロー定義

## 🔍 現状分析

### 現在のワークフロー構造

```yaml
# .github/workflows/fetch-rss.yml (L37-55)
- name: Commit and push changes
  run: |
    git config --local user.email "github-actions[bot]@users.noreply.github.com"
    git config --local user.name "github-actions[bot]"

    if git diff --quiet && git diff --staged --quiet; then
      echo "No changes to commit"
      exit 0
    fi

    git add articles/ images/ state/
    TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")
    git commit -m "chore: Fetch RSS feeds - ${TIMESTAMP}" || echo "Nothing to commit"
    git push
```

### 問題点

1. **通知機能なし**: 直接 master プッシュのため、GitHub 通知が発生しない
2. **変更内容の可視性が低い**: コミットログを見ないと何が追加されたかわからない
3. **制御不可**: 自動的にマージされるため、不要な記事を除外できない

## 🛠️ 実装方針

### 必要な変更

1. **ブランチ作成**: `rss-updates/YYYY-MM-DD` 形式
2. **PR作成**: `gh pr create` コマンド使用
3. **権限設定**: `contents: write` に加えて `pull-requests: write` が必要

### gh CLI の使用

GitHub Actions では `gh` CLI がプリインストールされている。
`GITHUB_TOKEN` は自動的に設定されるため、追加のシークレット設定は不要。

```yaml
env:
  GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 新着記事一覧の取得方法

```bash
# master との差分から追加されたファイルを取得
git diff --name-only origin/master -- articles/

# 記事タイトルの抽出（frontmatter から）
for file in $(git diff --name-only origin/master -- articles/); do
  grep -m1 "^title:" "$file" | sed 's/title: "/- /' | sed 's/"$//'
done
```

## ⚠️ 考慮事項

### 同日複数回実行時の挙動

- 同じブランチ名が使用される
- 既にPRが存在する場合: `gh pr create` はエラーになる
- 対策案:
  1. 既存PRを検出して force push のみ行う
  2. ブランチ名に時刻を含める（`rss-updates/YYYY-MM-DD-HH`）
  3. 既存ブランチを削除してから再作成

### 推奨: 既存PR更新方式

```bash
# 既存PRがあるかチェック
EXISTING_PR=$(gh pr list --head "$BRANCH" --json number -q '.[0].number')

if [ -n "$EXISTING_PR" ]; then
  # 既存PRに force push
  git push -f origin "$BRANCH"
else
  # 新規PR作成
  gh pr create ...
fi
```

## 📊 工数見積もり

| タスク | 工数 | 根拠 |
|--------|------|------|
| ブランチ作成ステップ | S (15min) | 数行の追加 |
| プッシュ処理修正 | S (10min) | 既存コード修正 |
| PR作成ステップ | S (20min) | gh CLI使用 |
| 本文動的生成 | M (30min) | シェルスクリプト |
| 同日複数回対応 | M (45min) | 条件分岐追加 |

## 🔗 参考リンク

- [gh pr create](https://cli.github.com/manual/gh_pr_create)
- [GitHub Actions - GITHUB_TOKEN](https://docs.github.com/en/actions/security-guides/automatic-token-authentication)
