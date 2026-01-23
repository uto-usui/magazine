# ニュースレター自動化

PRマージ後にニュースレターを自動作成・送信する仕組みのドキュメント。

## 概要

```
GitHub PR マージ（新着記事）
    ↓
launchd (1時間ごとにポーリング)
    ↓
newsletter-poller.sh
    ↓
新しいマージ & ニュースレター未作成？
    ├─ No  → スキップ
    └─ Yes → Terminal を開いて Claude Code 実行
              ↓
           ニュースレター作成 → コミット → push → メール送信
```

## ファイル構成

| ファイル | 役割 |
|---------|------|
| `scripts/newsletter-poller.sh` | GitHub をポーリングしてマージを検出 |
| `scripts/create-newsletter.sh` | 手動実行用ワンタッチスクリプト |
| `.claude/commands/create-newsletter-auto.md` | Claude Code 非対話版コマンド |
| `~/Library/LaunchAgents/com.uto.newsletter-poller.plist` | launchd 設定 |

## 仕組みの詳細

### 1. ポーリング (`newsletter-poller.sh`)

1時間ごとに以下を実行：

1. `gh pr list` で最近マージされた「新着記事」PRを取得
2. 前回処理したマージ時刻（`~/.newsletter-last-merged`）と比較
3. 新しいマージがあれば `git pull` して最新の記事を取得
4. 最新の `articles/YYYY-MM-DD/` フォルダの日付を確認
5. 同じ日付のニュースレターが存在するかチェック
6. 存在しなければ Terminal を開いて Claude Code を実行

### 2. 非対話版コマンド (`/create-newsletter-auto`)

通常の `/create-newsletter` との違い：

| 項目 | `/create-newsletter` | `/create-newsletter-auto` |
|------|---------------------|--------------------------|
| 既存ニュースレター | 再生成するか確認 | スキップ |
| 記事選定 | ユーザーに確認 | 自動選定 |
| 送信確認 | 確認後に送信 | 確認なしで送信 |

### 3. Terminal での実行

launchd からの直接実行では Claude Code がハングするため、`osascript` で Terminal.app を開いて実行：

```bash
osascript -e "
  tell application \"Terminal\"
    activate
    do script \"cd $PROJECT_DIR && claude -p '/create-newsletter-auto' --dangerously-skip-permissions\"
  end tell
"
```

## 手動実行

### エイリアス

```bash
newsletter           # 最新の記事からニュースレター作成
newsletter 2026-01-20  # 日付指定
```

`~/.zshrc` に以下が設定済み：

```bash
alias newsletter='/Users/usui.y/work/uto/ux-eng-magazine/scripts/create-newsletter.sh'
```

### スクリプト直接実行

```bash
./scripts/create-newsletter.sh
```

## launchd 管理

### 状態確認

```bash
launchctl list | grep newsletter
```

### 停止

```bash
launchctl unload ~/Library/LaunchAgents/com.uto.newsletter-poller.plist
```

### 再起動

```bash
launchctl unload ~/Library/LaunchAgents/com.uto.newsletter-poller.plist
launchctl load ~/Library/LaunchAgents/com.uto.newsletter-poller.plist
```

### 手動でポーリング実行

```bash
~/work/uto/ux-eng-magazine/scripts/newsletter-poller.sh
```

## ログ

```bash
# ポーリングログ
tail -f ~/Library/Logs/newsletter-poller.log

# 最後に処理したマージ時刻
cat ~/.newsletter-last-merged
```

## トラブルシューティング

### ポーリングが動かない

```bash
# launchd の状態確認
launchctl list | grep newsletter

# 手動実行でテスト
~/work/uto/ux-eng-magazine/scripts/newsletter-poller.sh

# ログ確認
cat ~/Library/Logs/newsletter-poller.log
```

### Claude Code がハングする

Terminal を開いて実行する方式に変更済み。もしまだハングする場合は、手動で `newsletter` コマンドを実行。

### ニュースレターが重複作成される

`~/.newsletter-last-merged` にマージ時刻が記録されているか確認：

```bash
cat ~/.newsletter-last-merged
```

記録がない場合は、直近のマージ時刻を手動で設定：

```bash
echo "2026-01-23T12:00:00Z" > ~/.newsletter-last-merged
```

## 依存関係

- **gh CLI**: GitHub API へのアクセス（`brew install gh`）
- **Claude Code**: ニュースレター生成
- **Terminal.app**: TTY を確保するため
- **launchd**: 定期実行

## 設計判断

### なぜ Zapier/Dropbox を使わないか

当初は Zapier + Dropbox/iCloud でトリガーする方式を検討したが、以下の理由で gh CLI ポーリングに変更：

- 外部サービスへの依存を減らせる
- 設定がシンプル
- ローカルで完結

### なぜ Terminal を開くか

launchd からの直接実行では TTY がないため Claude Code がハングする。`osascript` で Terminal を開くことで TTY を確保。

### なぜ1時間ごとか

- PRマージ直後の実行は不要（急ぎではない）
- API レート制限を考慮
- Mac がスリープ中は実行されない（問題なし）
