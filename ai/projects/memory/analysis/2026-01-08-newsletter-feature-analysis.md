# ニュースレター機能 技術分析レポート

**作成日**: 2026-01-08
**対象プロジェクト**: ux-eng-magazine

## 1. 要件の理解

### TODOファイル記載内容
- ニュースレター機能を作る
- テンプレートを設計する
- 指定された記事（複数）を要約しつつUXエンジニア向けに書く
- Claude Code commandsとして保存
- コマンドを実行した日時で date.md という形で保存

## 2. 既存リソースの分析

### 記事フォーマット（articles/YYYY-MM-DD/*.md）
```yaml
---
title: "記事タイトル"
source: "元URL"
publishedDate: "YYYY-MM-DD"
category: "engineering|css|accessibility|..."
feedName: "フィード名"
author: "著者名"
---

本文（Markdown形式）
```

### カテゴリ一覧
| ID | 名前 | 説明 |
|----|------|------|
| engineering | Engineering | Tech company engineering blogs |
| css | CSS | CSS techniques, layouts |
| accessibility | Accessibility | Web accessibility, a11y |
| performance | Performance | Web performance optimization |
| design | Design | UI/UX design patterns |
| frontend | Frontend | Frontend development |
| web-standards | Web Standards | Web platform standards |
| ux-writing | UX Writing | Content design and UX writing |

### Claude Code Commands形式
- 場所: `.claude/commands/`
- 形式: Markdownファイル（.md）
- フロントマター: `allowed-tools`, `description`
- 引数: `$ARGUMENTS` でコマンド引数を受け取り

## 3. 設計案

### コマンド名
`create-newsletter` → `/project:create-newsletter`

### 出力先
`newsletters/YYYY-MM-DD.md` （日時ベース）

### 想定フロー
1. ユーザーがコマンド実行時に記事ファイルパスまたは日付を指定
2. 指定された記事を読み込み
3. 各記事を要約（Claude AIで実行）
4. テンプレートに沿ってニュースレター形式で出力
5. newsletters/ ディレクトリに保存

## 4. 確認が必要な事項

### 🔴 高優先度（ブロッカー）
1. 記事の選択方法は？
   - a) 日付指定（例: 2026-01-08）
   - b) ファイルパス複数指定
   - c) カテゴリ指定
   - d) 対話的に選択

2. 要約の長さ・形式は？
   - 各記事の要約文字数
   - 要約のトーン（フォーマル/カジュアル）

### 🟡 中優先度
3. ニュースレターの対象読者像は？
   - UXエンジニアとは具体的にどのようなペルソナか

4. テンプレートに含めるセクションは？
   - 挨拶文、ハイライト記事、カテゴリ別一覧など

### 🟢 低優先度
5. 出力ファイル名のフォーマット確認
   - YYYY-MM-DD.md で良いか

## 5. 参照ファイル
- `ai/todo/TODO-news-letter.md`
- `.claude/commands/create-command.md`
- `articles/2026-01-08/*.md` (サンプル記事)
- `config/categories.yml`
