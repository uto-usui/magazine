# RSS Reader技術分析レポート

**作成日**: 2026-01-08
**対象プロジェクト**: ux-eng-magazine

## 1. プロジェクト要件

### 概要
- GitHub Actionsで定期動作するRSSリーダー
- 1日1回RSSを確認し、差分検知・記事スクレイピング・Markdown保存
- 複数のRSS URLをサポート
- 様々なRSSフォーマット（XML/Atom等）を吸収する汎用設計

## 2. 技術選定分析

### TypeScript vs Python 比較

| 評価項目 | TypeScript | Python | 推奨 |
|---------|-----------|--------|------|
| 既存構成との整合性 | ◎ 既存 | △ 新規環境必要 | **TypeScript** |
| RSS解析ライブラリ成熟度 | ○ rss-parser | ◎ feedparser | Python |
| スクレイピング精度 | △ cheerio | ◎ trafilatura | Python |
| GitHub Actions統合 | ◎ Node.js標準 | ◎ Python標準 | 引き分け |
| 保守性・拡張性 | ◎ 型安全性 | ○ 柔軟 | **TypeScript** |

### 最終推奨: **TypeScript**

**理由**:
1. 既存のTypeScript環境が構築済み（package.json, tsconfig.json）
2. 型安全性による長期保守性
3. `@mozilla/readability` + `turndown` でPython相当の品質達成可能

## 3. 複数RSSフィード管理設計

### 推奨: YAML設定ファイル

**メリット**:
- バージョン管理可能
- 可視性が高い
- 拡張性あり（カテゴリ分類等）

**構成例**:
```yaml
# config/feeds.yml
feeds:
  - id: "zenn-tech"
    url: "https://zenn.dev/feed"
    category: "tech"
    enabled: true
```

## 4. 必要なnpmパッケージ

### コアライブラリ
| パッケージ | 用途 |
|-----------|------|
| rss-parser | RSS/Atom解析 |
| @mozilla/readability | 本文抽出 |
| jsdom | DOM解析 |
| turndown | HTML→Markdown変換 |
| js-yaml | YAML解析 |
| date-fns | 日付処理 |

### 補助ライブラリ
| パッケージ | 用途 |
|-----------|------|
| axios | HTTP通信 |
| zod | バリデーション |

## 5. ディレクトリ構成案

```
/
├── .github/workflows/fetch-rss.yml
├── config/
│   ├── feeds.yml
│   └── schema.ts
├── src/
│   ├── index.ts
│   ├── config/loader.ts
│   ├── rss/parser.ts, fetcher.ts
│   ├── scraper/extractor.ts, converter.ts
│   ├── storage/state.ts, writer.ts
│   └── utils/logger.ts, filename.ts
├── articles/
├── state/processed.json
└── package.json
```

## 6. リスクと軽減策

| リスク | 軽減策 |
|-------|-------|
| スクレイピング失敗（403/Cloudflare） | User-Agent設定、フォールバック |
| RSS形式の多様性 | rss-parserで吸収 |
| GitHub Actions実行時間制限 | timeout設定 |
| リポジトリ肥大化 | .gitignore調整 |

## 7. 参照ファイル

- `/Users/usui.y/work/uto/ux-eng-magazine/package.json`
- `/Users/usui.y/work/uto/ux-eng-magazine/tsconfig.json`
- `/Users/usui.y/work/uto/ux-eng-magazine/ai/todo/TODO-init1.md`
