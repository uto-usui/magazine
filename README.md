# ux-eng-magazine

UX/エンジニアリング系ブログから記事を自動収集してMarkdownで保存するツール。

## 自動収集

GitHub Actionsで毎日 JST 09:00 に実行されます。新しい記事があるとPRが作成されるので、内容を確認してマージします。

## セットアップ

```bash
pnpm install
pnpm run fetch-rss
```

## 設定

購読するフィードは `config/feeds.yml` で設定できます。

## 出力形式

```
articles/
└── YYYY-MM-DD/      # 取得日
    └── <title>.md   # Frontmatter付きMarkdown
```

## ニュースレター作成

[Claude Code](https://docs.anthropic.com/en/docs/claude-code)で `/create-newsletter` を実行すると、収集した記事からニュースレターを生成できます。
UXエンジニアリングの視点で各記事の要約と解説が作成され、`newsletters/` に保存されます。

## ライセンス

MIT
