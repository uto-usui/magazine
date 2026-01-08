# 技術推奨事項

**作成日**: 2026-01-08
**対象プロジェクト**: ux-eng-magazine

## 1. 言語・フレームワーク

### 推奨: TypeScript

**根拠**:
- 既存のTypeScript環境を活用可能
- 型安全性による保守性向上
- Node.jsエコシステムの活用

**参照**: `package.json`, `tsconfig.json`が既に存在

## 2. 設定ファイル形式

### 推奨: YAML

**根拠**:
- 人間の可読性が高い
- カテゴリ分類等の拡張が容易
- Gitでのバージョン管理に適する

## 3. 依存パッケージ推奨構成

```json
{
  "dependencies": {
    "rss-parser": "^3.13.0",
    "@mozilla/readability": "^0.5.0",
    "jsdom": "^24.0.0",
    "turndown": "^7.1.3",
    "js-yaml": "^4.1.0",
    "axios": "^1.6.5",
    "date-fns": "^3.0.0",
    "date-fns-tz": "^2.0.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/js-yaml": "^4.0.9",
    "@types/turndown": "^5.0.4",
    "tsx": "^4.7.0"
  }
}
```

## 4. GitHub Actions構成

**推奨設定**:
- スケジュール: `cron: '0 0 * * *'` (UTC 00:00 = JST 09:00)
- Node.js: v20 (LTS)
- キャッシング: npm cache有効化
- タイムアウト: 30分

## 5. Markdown保存形式

**推奨Frontmatter**:
```yaml
---
title: 記事タイトル
source: 元URL
publishedDate: YYYY-MM-DD
category: tech/design/ux
author: 著者名
fetchedAt: 取得日時
---
```

## 6. ファイル命名規則

**推奨**: `YYYY-MM-DD_<sanitized-title>.md`

**サニタイズ**:
- 特殊文字除去: `[\/*?:"<>|]`
- スペース→アンダースコア
- 長さ制限: 100文字
