# ux-eng-magazine

UX/エンジニアリング系ブログのRSSフィードから記事を自動収集し、Markdown形式で保存するツールです。

## 概要

世界の主要なテック企業やUX専門家のブログから最新記事を定期的に取得し、ローカルにMarkdown形式でアーカイブします。GitHub Actionsを使用して毎日自動実行されます。

## 機能

- 21件のRSSフィードから記事を自動取得
- HTML記事をMarkdown形式に変換
- Frontmatter付きで保存（title, source, publishedDate, category, author）
- 重複検知と差分更新
- 画像のダウンロード保存
- GitHub Actionsによる定期実行（毎日 JST 09:00）

## 購読フィード

### テック企業エンジニアリングブログ
- Netflix Tech Blog
- Uber Engineering
- Spotify Engineering
- Airbnb Engineering
- Meta Engineering
- GitHub Engineering

### UX/フロントエンド専門家
- CSS Wizardry
- Addy Osmani
- web.dev
- Adrian Roselli
- Hidde de Vries
- Lea Verou
- Sara Soueidan

### デザイン/UXメディア
- Sidebar
- The Pragmatic Engineer
- UX Writing Hub
- Codrops
- CSS { In Real Life }
- Smashing Magazine
- Bitovi

## ディレクトリ構造

```
ux-eng-magazine/
├── src/                    # ソースコード
│   ├── config/            # 設定読み込み
│   ├── rss/               # RSS取得・解析
│   ├── scraper/           # Webスクレイピング・変換
│   ├── storage/           # ファイル保存・状態管理
│   └── utils/             # ユーティリティ
├── config/                 # 設定ファイル
│   ├── feeds.yml          # RSSフィードURL
│   └── categories.yml     # カテゴリマスター
├── articles/              # 保存された記事
│   └── YYYY-MM-DD/        # 日付別ディレクトリ
├── images/                # ダウンロードした画像
├── state/                 # 処理状態管理
│   └── processed.json     # 処理済み記事ID
└── .github/workflows/     # GitHub Actions
```

## 技術スタック

- **Runtime**: Node.js + TypeScript
- **RSS解析**: rss-parser
- **コンテンツ抽出**: @mozilla/readability, jsdom
- **Markdown変換**: turndown
- **設定管理**: js-yaml, zod
- **HTTP**: axios
- **日付処理**: date-fns

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 記事の取得
pnpm run fetch-rss
```

## 保存形式

記事は以下の形式で保存されます：

```markdown
---
title: 記事タイトル
source: フィード名
publishedDate: 2026-01-08
category: Engineering
author: 著者名
---

記事本文（Markdown形式）
```

## ライセンス

MIT
