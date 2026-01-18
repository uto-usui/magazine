# ニュースレターHTMLメール送信機能 - 実装推奨プラン

**作成日**: 2026-01-18
**関連調査**: `ai/projects/memory/analysis/newsletter-html-email-research.md`
**関連質問**: `ai/projects/memory/questions/newsletter-email-questions.md`

---

## 📊 実装方針サマリー

**アプローチ**: 段階的実装 (MVP → 機能拡張)
**推奨技術スタック**:
- Markdown→HTML: `marked`
- CSS インライン化: `juice`
- メール送信: `resend`
- 設定管理: YAML + Zod
- 実装形式: TypeScriptモジュール + Claude Code command (ハイブリッド)

---

## 🎯 フェーズ別実装計画

### フェーズ1: MVP (最小実装)

**目標**: 基本的なHTMLメール送信機能を実現
**期間**: 2〜3日
**前提**: オーナーへのテスト送信のみ

#### 実装タスク

1. **依存関係追加** (工数: S)
   - marked, juice, resend, dotenv のインストール
   - 型定義追加

2. **設定ファイル作成** (工数: S)
   - `config/recipients.yml` (最小構成)
   - `.env.example`
   - `.gitignore` に `.env` 追加確認

3. **TypeScriptモジュール実装** (工数: M)
   - `src/config/recipients.ts` - YAML読み込み、Zodバリデーション
   - `src/newsletter/converter.ts` - Markdown→HTML変換
   - `src/newsletter/template.ts` - シンプルなHTMLテンプレート
   - `src/newsletter/sender.ts` - Resend API統合
   - `src/newsletter/index.ts` - エントリーポイント

4. **テスト作成** (工数: M)
   - `tests/newsletter/converter.test.ts`
   - `tests/newsletter/template.test.ts`
   - モック使用で `sender.test.ts` (API呼び出しなし)

5. **Claude Code command** (工数: S)
   - `.claude/commands/send-newsletter.md`
   - ニュースレター選択UI
   - 送信確認プロンプト
   - 結果報告

6. **ドキュメント更新** (工数: S)
   - `CLAUDE.md` に新機能説明追加
   - `README.md` 更新

**成功基準**:
- ✅ ローカルで手動実行し、指定メールアドレスにHTMLメールが届く
- ✅ 主要メールクライアント (Gmail, Outlook, Apple Mail) で正しく表示
- ✅ 単体テストが全てパス

---

### フェーズ2: 機能強化 (公開準備)

**目標**: 複数受信者対応、デザイン改善
**期間**: 2〜3日
**前提**: 限定的な公開配信

#### 実装タスク

1. **デザイン改善** (工数: M)
   - ブランドカラー、ロゴ追加
   - ヘッダー/フッター洗練
   - レスポンシブ対応 (メディアクエリ追加)

2. **購読解除機能** (工数: M)
   - `recipients.yml` に `subscribed` フラグ
   - 購読解除リンク生成 (ユニークトークン)
   - 購読解除処理エンドポイント (将来: Webフォーム)

3. **送信ログ記録** (工数: S)
   - `state/sent-newsletters.json` 作成
   - 送信日時、受信者数、成功/失敗記録

4. **エラーハンドリング強化** (工数: S)
   - リトライロジック
   - エラーログ詳細化

5. **バッチ送信対応** (工数: M)
   - 受信者をバッチに分割 (レート制限対策)
   - 送信間隔調整

**成功基準**:
- ✅ 10名以上への同時配信が安定動作
- ✅ 購読解除リンクが機能
- ✅ 送信履歴が正確に記録される

---

### フェーズ3: 高度化 (オプション)

**目標**: プロフェッショナルなニュースレター体験
**期間**: 3〜5日

#### 実装タスク

1. **MJML導入** (工数: L)
   - テンプレートをMJMLに移行
   - レスポンシブ対応自動化

2. **画像対応** (工数: M)
   - 記事サムネイル画像のホスティング
   - CDN設定 (Resend or 外部サービス)

3. **配信分析** (工数: M)
   - 開封率トラッキング (Resendダッシュボード活用)
   - クリック率測定

4. **GitHub Actions自動配信** (工数: M)
   - ニュースレター生成後の自動送信ワークフロー
   - スケジュール配信 (週次など)

5. **購読フォーム** (工数: L)
   - 公開用の購読受付Webページ
   - メールアドレス検証

---

## 🏗️ 推奨アーキテクチャ (MVP)

```
ux-eng-magazine/
├── src/
│   ├── newsletter/
│   │   ├── index.ts              # メイン処理フロー
│   │   ├── converter.ts          # Markdown→HTML (marked)
│   │   ├── template.ts           # HTMLテンプレート生成
│   │   ├── inline-css.ts         # CSS インライン化 (juice)
│   │   └── sender.ts             # Resend API
│   ├── config/
│   │   ├── recipients.ts         # recipients.yml 読み込み
│   │   └── recipients-schema.ts  # Zod スキーマ
│   └── utils/
│       └── logger.ts             # 既存ロガー活用
├── tests/
│   └── newsletter/
│       ├── converter.test.ts
│       ├── template.test.ts
│       └── sender.test.ts
├── config/
│   └── recipients.yml            # 受信者リスト
├── state/
│   └── sent-newsletters.json     # 送信履歴 (フェーズ2)
├── .claude/
│   └── commands/
│       └── send-newsletter.md    # 新規コマンド
├── .env.example                  # 環境変数テンプレート
└── .env                          # 実際のAPIキー (gitignore)
```

---

## 📝 データフロー (MVP)

```
1. ユーザー: Claude Code command 実行
   └── `send-newsletter` コマンド起動

2. コマンド: ニュースレター選択
   └── newsletters/ から .md ファイル一覧取得
   └── ユーザーに選択肢提示

3. TypeScriptモジュール: メール生成
   ├── converter.ts: Markdown読み込み、HTML変換
   ├── template.ts: ヘッダー/フッター追加、スタイル適用
   └── inline-css.ts: CSS インライン化

4. TypeScriptモジュール: 受信者リスト読み込み
   └── recipients.ts: config/recipients.yml 読み込み
   └── enabled: true のみフィルタ

5. TypeScriptモジュール: メール送信
   └── sender.ts: Resend API 呼び出し
   └── 各受信者に順次送信

6. コマンド: 結果報告
   └── 成功/失敗件数表示
   └── エラーがあればログ出力
```

---

## 🛡️ セキュリティ推奨事項

### 1. APIキー管理

**実装**:
```typescript
// src/newsletter/sender.ts
import 'dotenv/config';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error('RESEND_API_KEY is not set in .env');
}

export const resend = new Resend(apiKey);
```

**チェックリスト**:
- [ ] `.env` を `.gitignore` に追加済み
- [ ] `.env.example` 作成、リポジトリにコミット
- [ ] GitHub Secrets に `RESEND_API_KEY` 登録 (将来のActions用)

### 2. メールアドレスバリデーション

```typescript
// src/config/recipients-schema.ts
export const RecipientSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  enabled: z.boolean().default(true),
});
```

### 3. レート制限対策

```typescript
// src/newsletter/sender.ts
async function sendBatch(recipients: Recipient[], html: string) {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  for (const recipient of recipients) {
    await resend.emails.send({ ... });
    await delay(100); // 100ms間隔で送信
  }
}
```

---

## 🧪 テスト戦略

### 単体テスト

```typescript
// tests/newsletter/converter.test.ts
import { describe, it, expect } from 'vitest';
import { convertMarkdownToHtml } from '../src/newsletter/converter';

describe('Markdown to HTML Converter', () => {
  it('should convert basic markdown', () => {
    const markdown = '# Hello\n\nThis is **bold**.';
    const html = convertMarkdownToHtml(markdown);

    expect(html).toContain('<h1>Hello</h1>');
    expect(html).toContain('<strong>bold</strong>');
  });

  it('should handle code blocks', () => {
    const markdown = '```javascript\nconst x = 1;\n```';
    const html = convertMarkdownToHtml(markdown);

    expect(html).toContain('<code>');
  });
});
```

### 統合テスト (手動)

**手順**:
1. `.env` に有効なAPIキーを設定
2. `config/recipients.yml` に自分のメールアドレスを追加
3. コマンド実行: `/send-newsletter`
4. 各メールクライアントで受信確認:
   - Gmail (Web/Mobile)
   - Outlook (Web/Desktop)
   - Apple Mail (macOS/iOS)

**確認ポイント**:
- [ ] メールが届く
- [ ] HTMLレイアウトが崩れていない
- [ ] リンクが正しく機能
- [ ] スタイルが適用されている
- [ ] 日本語が文字化けしていない

---

## 📊 実装優先順位マトリクス

| タスク | 価値 | 工数 | 優先度 | フェーズ |
|-------|------|------|--------|---------|
| Markdown→HTML変換 | 高 | S | 最高 | 1 |
| Resend統合 | 高 | S | 最高 | 1 |
| シンプルテンプレート | 高 | S | 最高 | 1 |
| 受信者管理 (YAML) | 高 | S | 高 | 1 |
| Claude Code command | 中 | S | 高 | 1 |
| 単体テスト | 中 | M | 中 | 1 |
| デザイン改善 | 中 | M | 中 | 2 |
| 購読解除機能 | 高 | M | 高 | 2 |
| 送信ログ | 低 | S | 低 | 2 |
| MJML導入 | 低 | L | 低 | 3 |
| GitHub Actions | 低 | M | 低 | 3 |

---

## 🚀 次のアクション

### 即座に実行可能

1. **ユーザー確認** (Q1〜Q3 への回答取得)
2. **依存関係追加**
3. **`.env.example` 作成**

### 確認後に実行

4. **TypeScriptモジュール実装開始** (converter.ts から)
5. **並行してテスト作成**

---

## 📚 参考リソース

- [Resend公式ドキュメント](https://resend.com/docs)
- [marked公式ドキュメント](https://marked.js.org/)
- [juice公式ドキュメント](https://github.com/Automattic/juice)
- [MJML公式ドキュメント](https://mjml.io/documentation/)
- [Email on Acid - メールクライアント互換性](https://www.emailonacid.com/)

---

**作成者**: Claude Code Project Manager Agent
**最終更新**: 2026-01-18
