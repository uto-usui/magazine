---
allowed-tools: [Read, Write, Glob, Bash, mcp__playwright-mcp__browser_navigate, mcp__playwright-mcp__browser_snapshot, mcp__playwright-mcp__browser_close]
description: Playwrightで取得したページから本文を抽出・クリーンアップするLLMコマンド
---

# 記事コンテンツのクリーンアップ

このコマンドは、Webページから記事本文を抽出し、不要な要素を除去してクリーンなMarkdownを生成します。
正規表現ではなく、LLMの判断力を使ってサイトごとに異なる構造にも柔軟に対応します。

## 引数

`$ARGUMENTS` - 対象のURL、ファイルパス、またはディレクトリパス

## 処理フロー

### 1. 入力の判定

- **URLの場合**: Playwrightでページを取得
- **ファイルパスの場合**: ファイルを読み込む
- **ディレクトリの場合**: `fetchedBy: "playwright"` を持つ記事のみを処理対象にする

### 1-1. ディレクトリ指定時のフィルタリング

ディレクトリが指定された場合（例: `articles/2026-01-21/`）：

1. ディレクトリ内の全`.md`ファイルを列挙
2. 各ファイルのfrontmatterだけを読み取り（トークン節約）
3. `fetchedBy: "playwright"` を持つ記事のみを処理対象として抽出
4. 対象記事をユーザーに確認してから処理を開始

```bash
# frontmatterだけを抽出（最初の---から次の---まで）
head -20 articles/2026-01-21/*.md | grep -l "fetchedBy: \"playwright\""
```

### 2. Playwrightでページ取得（URLの場合）

```
1. browser_navigate でURLにアクセス
2. 3秒待機（JSレンダリング待ち）
3. browser_snapshot でページのアクセシビリティツリーを取得
4. browser_close でブラウザを閉じる
```

### 3. 本文の抽出・クリーンアップ

取得したコンテンツから、以下の**不要な要素を除去**してください：

#### 一般的な不要要素
- ナビゲーション、ヘッダー、フッター
- サイドバー、広告
- 関連記事リンク
- ソーシャルシェアボタン
- コメントセクション
- ニュースレター登録フォーム

#### Medium特有の不要要素
- 読了時間（例: "11 min read"）
- 相対日付（例: "5 days ago"）
- 著者フォローボタン・プロフィールカード
- "Get stories in your inbox" 購読促進セクション
- "Join Medium for free" などのCTA
- 画像プレースホルダーテキスト（"Press enter or click to view image in full size"）
- 拍手数・レスポンス数

#### その他のサイト特有の要素
- ペイウォールのメッセージ
- Cookie同意バナー
- ポップアップ関連のテキスト
- "Read more" / "Continue reading" リンク
- 著者の他の記事へのリンクリスト

### 4. 出力フォーマット

抽出した本文を以下の形式で出力：

```markdown
---
title: "記事タイトル"
source: "元URL"
fetchedBy: "playwright"
---

# 記事タイトル

[本文のMarkdown]
```

### 5. ファイル保存

クリーンアップした内容を保存：
- **デフォルト**: `temp/cleaned-article.md`
- ユーザーが指定した場合はそのパスに保存

## 判断のガイドライン

1. **本文かどうか迷ったら含める** - 重要な情報を失うより、少し余分な情報がある方がマシ
2. **画像のalt/captionは保持** - 画像の説明は本文の一部
3. **コードブロックは完全に保持** - 技術記事では重要
4. **引用・ブロッククォートは保持** - 元記事の構造を維持
5. **リストは保持** - 本文の構造要素として重要

## 学んだパターン（随時追加）

### Medium (2026-01-21時点)
- HTTPリクエストは403を返すが、Playwrightでは取得可能
- `domcontentloaded` + 3秒待機 + スクロールで遅延読み込みコンテンツも取得
- 著者プロフィールは記事の最後にネストしたリンク形式で現れる
- 購読促進は `## Get {author}'s stories` の形式

## 使用例

```
/cleanup-article https://medium.com/@example/article-slug-123
/cleanup-article temp/raw-content.md
/cleanup-article articles/2026-01-21/
```

ディレクトリ指定時は、`fetchedBy: "playwright"`を持つ記事だけが処理対象になります。
