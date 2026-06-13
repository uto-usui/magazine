---
allowed-tools: [Read, Write, Glob, Bash]
description: キュレーション（ピックアップ）を非対話で自動作成し、コミットまで行うコマンド
---

# キュレーション自動作成（非対話版）

このコマンドは `/curate-articles` の非対話版です。
ユーザー確認なしで `newsletters/pickup/YYYY-MM-DD-HHmmss.md` を生成し、コミットまで行います。push は呼び出し元が担当します。

## 処理手順

### 0. 対象期間の決定

**引数**: $ARGUMENTS（オプション: 対象期間の自然言語指定 例: `今週`, `直近1週間`）

1. **引数がある場合**: そのまま `curate-articles` スキルの `$ARGUMENTS` として使用
2. **引数がない場合**: `今週` を既定値として使用（skillのデフォルトは「直近2週間」だがこのコマンドでは「今週」を既定）

### 1. キュレーション実行

`curate-articles` スキルの手順に従い、非対話で以下を実行:

1. `newsletters/*.md` から対象期間のニュースレターを特定
2. 対象0件ならエラー終了（ファイルは作らない）
3. `.claude/skills/curate-articles/references/editorial.md` と `ai/docs/style-guide.md` を読み込む
4. 記事を抽出・選定（基準は skill の定義どおり）
5. キュレーション記事を生成
6. `newsletters/pickup/YYYY-MM-DD-HHmmss.md` に保存

**生成済みチェック**: 同一日の `newsletters/pickup/YYYY-MM-DD-*.md` が既に存在する場合はスキップして終了:

```bash
ls newsletters/pickup/$(date "+%Y-%m-%d")-*.md 2>/dev/null
```

「既に 当日のピックアップが存在します。処理をスキップします。」と報告して終了。

### 2. コミット

生成に成功した場合のみコミット:

```bash
git add newsletters/pickup/YYYY-MM-DD-HHmmss.md
git commit -m "docs: Add pickup for YYYY-MM-DD"
```

### 3. Notion へ保存

`curate-articles` スキルの「6. Notion へ保存」の手順に従い、生成したピックアップを Notion DB に1ページとして保存する。

- DB ID は `.env` の `NOTION_PICKUP_DATABASE_ID` / `NOTION_PICKUP_DATA_SOURCE_ID` から読む（コミット対象ファイルに直書きしない）
- `.env` に該当キーが無い、または Notion API が使えない環境（CI等）では**保存をスキップして続行**する。エラー終了しない

### 4. 完了報告

- 作成したファイルのパス
- 対象ニュースレター数と選定記事数
- 選定記事タイトル一覧
- Notion ページの URL（保存した場合）／スキップ理由（しなかった場合）

## 注意事項

- 対象ニュースレターが0件ならファイルを作らずエラー終了
- 既存のピックアップがある場合はスキップ
- push は呼び出し元スクリプトが担当（このコマンドでは行わない）
- 文体・表記ルールは `ai/docs/style-guide.md` と `.claude/skills/curate-articles/references/editorial.md` に従う
