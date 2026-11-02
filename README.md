# ux-eng-magazine

UX/エンジニアリング系ブログから記事を自動収集してMarkdownで保存するツール。

## 自動収集

GitHub Actionsで毎日 JST 09:00 に実行されます。新しい記事があるとPRが作成され、新着が20件以上たまると自動でマージされます。

## セットアップ

```bash
pnpm install
pnpm run fetch-rss
```

## 設定

購読するフィードは `config/feeds.yml` で設定できます。

- 公開から 30 日より古い記事は取り込みません。フィードを追加・再開しても過去記事は流れ込みません。
- `excludePaths` に URL のパスの先頭を書くと、その記事を除外できます（例: Vercel の `/changelog/`）。

### フィードの品質

`pnpm run feed-quality` で、フィードごとに「取り込んだ記事のうちニュースレターのハイライトやピックアップに選ばれた割合」を出します。
毎月 1 日に GitHub Actions が同じレポートを issue にします。たくさん取り込んでいるのに 1 本も選ばれていないフィードが「外す候補」に挙がるので、確認して `enabled: false` にします。

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
