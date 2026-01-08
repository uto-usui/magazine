# CLAUDE.md

## プロジェクト概要

UX/エンジニアリング系ブログのRSSフィードから記事を自動取得し、Markdown形式で保存するツール。
GitHub Actionsで毎日 JST 09:00 (UTC 00:00) に自動実行される。

## 動作環境

- **Node.js**: v22.15.1 以上 (`.node-version` で指定)
- **pnpm**: v9.14.2 以上 (`packageManager` で固定)
- **TypeScript**: v5.9.3

## コマンド

```bash
pnpm install          # 依存関係インストール
pnpm run build        # TypeScriptビルド (dist/へ出力)
pnpm run type-check   # 型チェックのみ (pre-commit hookで自動実行)
pnpm test             # vitest実行
pnpm test <file>      # 単一テストファイル実行 (例: pnpm test tests/converter.test.ts)
pnpm run fetch-rss    # 記事取得の本番実行
```

## ディレクトリ構成

```
src/
├── index.ts                  # エントリーポイント、メイン処理フロー
├── config/
│   ├── loader.ts             # feeds.yml読み込み (loadFeedConfig)
│   └── schema.ts             # Zodスキーマ定義 (Feed, Category)
├── rss/
│   ├── fetcher.ts            # RssFetcher - rss-parserでフィード取得
│   └── diff.ts               # DiffDetector - 新規/更新記事の検出
├── scraper/
│   ├── extractor.ts          # ContentExtractor - Readabilityで本文抽出
│   ├── converter.ts          # MarkdownConverter - Turndownで変換
│   └── image-downloader.ts   # ImageDownloader - 画像ダウンロード
├── storage/
│   ├── writer.ts             # ArticleWriter - Markdown書き出し
│   └── state.ts              # StateManager - processed.json管理
└── utils/
    └── logger.ts             # ロガー

tests/                        # vitestテストファイル (tests/*.test.ts)

config/
├── feeds.yml                 # フィード定義 (enabled: falseで無効化可能)
└── categories.yml            # カテゴリマスター

state/
└── processed.json            # 処理済み記事のID・ハッシュ (重複排除用、gitで管理)

articles/
└── YYYY-MM-DD/               # 取得日ごとのディレクトリ
    └── <sanitized-title>.md  # Frontmatter付きMarkdown

images/
└── <slug>/                   # 記事ごとの画像
```

## データフロー

```
1. loadFeedConfig()
   └── config/feeds.yml読み込み、enabled: trueのみ抽出

2. RssFetcher.fetchAllFeeds()
   └── 全フィードを並列取得、Promise.allSettledで失敗を許容

3. DiffDetector.detectChanges()
   └── state/processed.jsonと比較、新規記事を抽出

4. 各記事を処理:
   ├── ContentExtractor.extractFromUrl()
   │   └── 失敗時: RSSのcontentをフォールバック
   ├── ImageDownloader.downloadImages()
   ├── MarkdownConverter.createArticle()
   └── ArticleWriter.writeArticle()

5. StateManager.save()
   └── 処理済み記事を保存
```

## 主要な型定義

```typescript
// src/config/schema.ts
interface Feed {
  url: string
  name: string
  category: string
  enabled: boolean  // default: true
}

// src/rss/fetcher.ts
interface FeedItem {
  title: string
  link: string
  pubDate: string | null
  author: string | null
  content: string | null  // RSSのcontent、フォールバック用
  feedName: string
  category: string
}

// src/scraper/extractor.ts
interface ExtractedContent {
  title: string
  content: string        // HTML
  textContent: string    // プレーンテキスト
  excerpt: string | null
  byline: string | null
  images: string[]       // 画像URL配列
}

// src/storage/state.ts
interface ProcessedArticle {
  contentHash: string
  processedAt: string
}

interface State {
  processedArticles: Record<string, ProcessedArticle>  // key = article URL
  lastRun: string | null
}
```

## 記事フォーマット

```markdown
---
title: "記事タイトル"
source: "https://example.com/article"
publishedDate: "2026-01-08"
category: "engineering"
feedName: "Feed Name"
author: "著者名"
---

本文（Markdown形式）
```

**重要**:
- ディレクトリの日付 (`articles/YYYY-MM-DD/`) = スクリプト実行日
- `publishedDate` = RSSに記載の元記事公開日

## テストの書き方

```typescript
// tests/*.test.ts
import { describe, it, expect } from 'vitest'
import { TargetClass } from '../src/path/to/module'

describe('TargetClass', () => {
  it('should do something', () => {
    const instance = new TargetClass()
    expect(instance.method()).toBe(expected)
  })
})
```

テストファイルは `tests/` ディレクトリに配置。各モジュールに対応するテストファイルが存在:
- `converter.test.ts`, `extractor.test.ts`, `diff.test.ts`, `state.test.ts`, `writer.test.ts` など

## エラーハンドリング

| 状況 | 対応 |
|------|------|
| フィード取得失敗 | console.errorでログ出力、空配列を返して続行 |
| 404 Not Found | 記事をスキップ |
| 403/その他4xx | RSSのcontentをフォールバックとして使用 |
| Readability抽出失敗 | RSSのcontentがあれば使用、なければスキップ |
| 画像ダウンロード失敗 | スキップして続行 |

## フィード設定 (config/feeds.yml)

```yaml
feeds:
  - url: https://example.com/feed
    name: Example Blog
    category: engineering
    enabled: true  # falseで無効化

  - url: https://medium.com/feed/example
    name: Medium Example
    category: design
    enabled: false  # 403エラーなどで無効化済み
```

## GitHub Actions

- **ワークフロー**: `.github/workflows/fetch-rss.yml`
- **スケジュール**: 毎日 JST 09:00 (UTC 00:00)
- **手動実行**: workflow_dispatchで可能
- **自動コミット**: `articles/`, `images/`, `state/` の変更を自動プッシュ

## Git Hooks (lefthook)

- **pre-commit**: `pnpm run type-check` 実行

## TypeScript設定

- **target**: ESNext
- **module**: ESNext
- **strict**: true
- **出力先**: dist/

## 使用ライブラリ

| ライブラリ | 用途 |
|-----------|------|
| rss-parser | RSS/Atomフィード解析 |
| @mozilla/readability | 記事本文抽出 |
| jsdom | DOM解析 |
| turndown | HTML→Markdown変換 |
| axios | HTTP通信 |
| zod | スキーマバリデーション |
| date-fns | 日付処理 |
| vitest | テスト |
| tsx | TypeScript実行 |
| lefthook | Git hooks管理 |

## よくある作業

### 新しいフィードを追加
1. `config/feeds.yml` にエントリ追加
2. `pnpm run fetch-rss` で動作確認

### フィードを無効化
1. `config/feeds.yml` で `enabled: false` に設定

### テスト追加
1. `tests/<module>.test.ts` にテストケース追加
2. `pnpm test` で確認

### ローカルで記事取得テスト
```bash
pnpm run fetch-rss
# articles/YYYY-MM-DD/ に記事が保存される
```
