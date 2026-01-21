---
allowed-tools: [Read, Bash, AskUserQuestion]
description: ニュースレターをHTMLメールとして送信するコマンド
---

# ニュースレター送信

このコマンドは、Markdownで作成されたニュースレターをHTMLメールに変換して送信します。

## 使用方法

```
/send-newsletter <ニュースレターファイルパス>
```

例：
```
/send-newsletter newsletters/2026-01-18-120000.md
```

## 前提条件

1. **環境変数の設定**: `.env` ファイルに `RESEND_API_KEY` が設定されていること
2. **受信者の設定**: `config/recipients.yml` に送信先が設定されていること
3. **ニュースレターの存在**: 指定したMarkdownファイルが存在すること

## 処理手順

### 1. 前提条件の確認

まず、送信に必要な条件を確認します：

```bash
# .envファイルの存在確認
test -f .env && echo ".env exists" || echo ".env not found"
```

**注意**: `.env` ファイルが存在しない場合は、`.env.example` をコピーして設定するよう案内します。

### 2. ニュースレターファイルの確認

引数で指定されたファイルが存在するか確認します：/cl

- ファイルが存在しない場合はエラーメッセージを表示
- `newsletters/` ディレクトリ内の利用可能なファイル一覧を表示

### 3. 送信内容のプレビュー

送信前に以下を確認：

1. **ニュースレターの内容**（Readツールで読み込み）
   - タイトル
   - 記事数
   - 冒頭部分のプレビュー

2. **送信先の確認**
   - `config/recipients.yml` の有効な送信先を表示

### 4. 送信確認

ユーザーに送信確認を求めます（AskUserQuestionツール）：

- 「送信する」
- 「キャンセル」

### 5. メール送信

確認後、送信を実行：

```bash
# 型チェック
pnpm run type-check

# 送信スクリプトを実行
pnpm tsx -e "
import { sendNewsletterFromFile } from './src/newsletter/index.js';
const filePath = '$FILE_PATH';
const result = await sendNewsletterFromFile(filePath);
console.log(JSON.stringify(result, null, 2));
"
```

### 6. 結果報告

送信結果を報告：

- **成功時**: 送信完了メッセージ、送信先数
- **失敗時**: エラー詳細、失敗した送信先

## 注意事項

- **Resend共有ドメイン使用**: 送信元は `onboarding@resend.dev` となります
- **返信先設定**: 返信は `nattyanoranged@gmail.com` に届きます
- **受信者制限**: 現在はオーナーのみに送信されます
- **テスト送信推奨**: 本番送信前にテストすることを推奨します

## トラブルシューティング

### RESEND_API_KEY が設定されていない

```bash
cp .env.example .env
# .envファイルを編集してAPIキーを設定
```

APIキーは [Resend Dashboard](https://resend.com/api-keys) から取得できます。

### 受信者が設定されていない

`config/recipients.yml` を確認し、`enabled: true` の受信者が存在することを確認してください。

### 送信に失敗した

Resend APIのレート制限やネットワークエラーの可能性があります。
エラーメッセージを確認し、再試行してください。
