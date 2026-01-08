# ux-eng-magazine

UX/エンジニアリング系ブログから記事を自動収集してMarkdownで保存するツール。GitHub Actionsで毎日実行。

## セットアップ

```bash
pnpm install
pnpm run fetch-rss
```

## 購読フィード

| カテゴリ | フィード |
|---------|---------|
| Engineering | Spotify, Meta, GitHub, The Pragmatic Engineer |
| CSS/Frontend | CSS Wizardry, Lea Verou, CSS IRL, Bitovi, Kilian Valkhof |
| Performance | Addy Osmani, web.dev |
| Accessibility | Adrian Roselli, Sara Soueidan |
| Design/UX | Sidebar, Codrops, Smashing Magazine, UX Writing Hub |

## 出力形式

```
articles/
└── YYYY-MM-DD/      # 取得日
    └── <title>.md   # Frontmatter付きMarkdown
```

## ライセンス

MIT
