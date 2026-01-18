# ニュースレターHTMLメール送信機能 - 技術調査

**作成日**: 2026-01-18
**目的**: MarkdownニュースレターをHTMLメール化するための技術選定と実装方針の検討

---

## 1. Markdown → HTML 変換ライブラリ調査

### 1.1 候補ライブラリ比較

| ライブラリ | バージョン | 特徴 | メリット | デメリット | 総合評価 |
|-----------|-----------|------|---------|----------|----------|
| **marked** | v14.x | 軽量・高速、拡張性高い | シンプル、実績豊富、カスタマイズ可能 | HTML出力の細かい制御が必要 | ⭐⭐⭐⭐⭐ |
| **markdown-it** | v14.x | プラグイン豊富、高機能 | 多機能、プラグインエコシステム充実 | 設定が複雑になりがち | ⭐⭐⭐⭐ |
| **remark** | v15.x | unified エコシステム | AST操作が柔軟、TypeScript対応優秀 | 学習コスト高、設定が冗長 | ⭐⭐⭐ |
| **showdown** | v2.x | GitHub Flavored Markdown | GFM対応が標準 | パフォーマンスやや劣る | ⭐⭐⭐ |

### 1.2 推奨: marked

**選定理由**:
- 既存プロジェクトで `turndown` (HTML→Markdown) を使用しており、対となる `marked` を使うことで一貫性がある
- 軽量で高速、TypeScript型定義も充実
- カスタムレンダラーでメール向けHTML出力を制御しやすい
- npm週間ダウンロード数 1400万超、実績十分

**インストール**:
```bash
pnpm add marked
pnpm add -D @types/marked
```

**基本的な使用例**:
```typescript
import { marked } from 'marked';

const markdown = '# Hello\n\nThis is a **test**.';
const html = marked(markdown);
```

---

## 2. HTMLメールテンプレート設計

### 2.1 HTMLメールの制約

- **インラインCSS必須**: 多くのメールクライアントは `<style>` タグや外部CSSをサポートしない
- **tableレイアウト推奨**: Flexbox/Gridは多くのクライアントで非対応
- **メディアクエリ制限**: レスポンシブ対応は限定的
- **画像の取り扱い**: 外部画像はブロックされる可能性あり
- **JavaScript不可**: すべてのメールクライアントで無効化

### 2.2 対応すべき主要メールクライアント

1. **Gmail** (Webmail/モバイル)
2. **Outlook** (デスクトップ/Web/モバイル)
3. **Apple Mail** (macOS/iOS)
4. **Yahoo Mail**
5. **Thunderbird**

### 2.3 テンプレートアプローチ

#### オプション1: 手書きHTMLテンプレート + インライン化ライブラリ

**ライブラリ**: `juice` または `inline-css`

- **juice**: より広く使われている、実績豊富
- **inline-css**: 軽量、Promise対応

**推奨**: `juice`

```bash
pnpm add juice
pnpm add -D @types/juice
```

**使用例**:
```typescript
import juice from 'juice';

const htmlWithStyle = `
  <style>
    .header { color: #333; font-size: 24px; }
  </style>
  <div class="header">Title</div>
`;

const inlined = juice(htmlWithStyle);
// Result: <div style="color: #333; font-size: 24px;">Title</div>
```

#### オプション2: メールテンプレートフレームワーク

**MJML** (Mailjet Markup Language):
- 宣言的なメール専用マークアップ
- レスポンシブ対応を自動化
- 各種メールクライアント互換性を担保

```bash
pnpm add mjml
```

**使用例**:
```typescript
import mjml2html from 'mjml';

const mjmlTemplate = `
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>Hello World</mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`;

const { html } = mjml2html(mjmlTemplate);
```

### 2.4 推奨テンプレート戦略

**フェーズ1** (最小実装):
- `marked` でMarkdown→HTML変換
- シンプルな手書きHTMLテンプレート (ヘッダー、フッター、スタイル)
- `juice` でインラインCSS化

**フェーズ2** (高度化):
- MJML導入でレスポンシブ対応強化
- より洗練されたデザイン

---

## 3. メール送信サービス調査

### 3.1 候補サービス比較

| サービス | 無料枠 | 価格 (有料) | 特徴 | API使いやすさ | 総合評価 |
|---------|--------|------------|------|--------------|----------|
| **Resend** | 3,000通/月 | $20/月～ | モダンAPI、開発者向け、React Email対応 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **SendGrid** | 100通/日 | $19.95/月～ | 老舗、実績豊富、ダッシュボード充実 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Postmark** | 100通/月 | $15/月～ | トランザクションメール特化、高速 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **AWS SES** | 62,000通/月 (EC2経由) | $0.10/1000通 | 低コスト、AWSエコシステム統合 | ⭐⭐⭐ | ⭐⭐⭐ |
| **Mailgun** | 5,000通/月 (3ヶ月) | $35/月～ | 柔軟なAPI、ログ機能強力 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

### 3.2 推奨: Resend

**選定理由**:
1. **無料枠が十分**: 3,000通/月 - 月1〜2回のニュースレター配信には十分
2. **モダンなDX**: TypeScript SDKが優秀、エラーハンドリング明快
3. **シンプルなAPI**: 最小限のコードで送信可能
4. **React Email統合**: 将来的にReactベースのテンプレート移行も容易
5. **日本からのアクセス**: レイテンシー問題なし

**インストール**:
```bash
pnpm add resend
```

**基本的な使用例**:
```typescript
import { Resend } from 'resend';

const resend = new Resend('re_xxxxxxxxxxxx'); // API Key

await resend.emails.send({
  from: 'newsletter@example.com',
  to: 'user@example.com',
  subject: 'ニュースレター',
  html: '<h1>Hello</h1><p>Content...</p>',
});
```

### 3.3 代替案: SendGrid

**選定理由** (Resendが使えない場合):
- より長い実績、エンタープライズ向け
- テンプレートエンジン内蔵
- 配信分析機能が充実

---

## 4. 送信先管理

### 4.1 管理方法の選択肢

#### オプション1: YAMLファイル

```yaml
# config/recipients.yml
recipients:
  - email: user1@example.com
    name: User One
    enabled: true
  - email: user2@example.com
    name: User Two
    enabled: false
```

**メリット**: シンプル、既存のconfig/feeds.yml と統一感
**デメリット**: スケールしない、購読解除管理が困難

#### オプション2: JSON ファイル

```json
{
  "recipients": [
    {
      "email": "user1@example.com",
      "name": "User One",
      "subscribed": true,
      "subscribedAt": "2026-01-18"
    }
  ]
}
```

**メリット**: プログラム的に扱いやすい
**デメリット**: YAMLと比べて可読性やや劣る

#### オプション3: 外部サービス (将来)

- Resend Audiences
- Mailchimp
- Buttondown

**現時点の推奨**: YAMLファイル (`config/recipients.yml`)

### 4.2 Zodスキーマ定義 (型安全性)

```typescript
// src/config/recipients-schema.ts
import { z } from 'zod';

export const RecipientSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  enabled: z.boolean().default(true),
});

export const RecipientsConfigSchema = z.object({
  recipients: z.array(RecipientSchema),
});

export type Recipient = z.infer<typeof RecipientSchema>;
export type RecipientsConfig = z.infer<typeof RecipientsConfigSchema>;
```

---

## 5. セキュリティとAPIキー管理

### 5.1 環境変数による管理

**`.env` ファイル** (gitignoreに追加済み想定):
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

**読み込み**:
```typescript
import { config } from 'dotenv';
config();

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  throw new Error('RESEND_API_KEY is not set');
}
```

**`.env.example` を作成** (テンプレートとして):
```
RESEND_API_KEY=your_api_key_here
```

### 5.2 GitHub Actions での設定

**GitHub Secrets に登録**:
1. リポジトリ Settings → Secrets and variables → Actions
2. `RESEND_API_KEY` を追加

**ワークフロー設定**:
```yaml
env:
  RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
```

---

## 6. 実装方式の選択

### 6.1 オプション比較

| 方式 | メリット | デメリット | 推奨度 |
|------|---------|----------|--------|
| **TypeScriptモジュール** | 型安全、テスト可能、再利用性高 | 初期構築コスト | ⭐⭐⭐⭐⭐ |
| **Claude Code command** | 既存コマンドと統一、素早い実装 | 型安全性低、テスト困難 | ⭐⭐⭐ |
| **ハイブリッド** | 両方の利点 | 複雑性増加 | ⭐⭐⭐⭐ |

### 6.2 推奨: ハイブリッド方式

**理由**:
- コア機能 (HTML変換、メール送信) は TypeScript モジュール化 → 型安全、テスト可能
- ユーザーインターフェース (コマンド実行) は Claude Code command → UX向上

**アーキテクチャ**:
```
src/
├── newsletter/
│   ├── converter.ts       # Markdown → HTML 変換
│   ├── template.ts        # HTMLテンプレート生成
│   ├── sender.ts          # メール送信 (Resend API)
│   └── index.ts           # エントリーポイント
├── config/
│   └── recipients.ts      # recipients.yml 読み込み
tests/
└── newsletter/
    ├── converter.test.ts
    ├── template.test.ts
    └── sender.test.ts
.claude/
└── commands/
    └── send-newsletter.md  # 新規コマンド
```

**Claude Code command の役割**:
1. ユーザーに送信対象ニュースレターを選択させる
2. `src/newsletter/index.ts` の関数を呼び出し
3. 送信結果を報告

---

## 7. 実装フロー (詳細)

### 7.1 フェーズ1: 基盤構築 (MVP)

1. **依存関係追加**
   ```bash
   pnpm add marked juice resend dotenv
   pnpm add -D @types/marked @types/juice
   ```

2. **設定ファイル作成**
   - `config/recipients.yml`
   - `.env.example`

3. **TypeScriptモジュール実装**
   - `src/config/recipients.ts` - YAML読み込み
   - `src/newsletter/converter.ts` - Markdown→HTML
   - `src/newsletter/template.ts` - テンプレート適用
   - `src/newsletter/sender.ts` - Resend統合

4. **テスト作成**
   - 各モジュールの単体テスト

5. **Claude Code command**
   - `.claude/commands/send-newsletter.md`

### 7.2 フェーズ2: 機能拡張

1. **テンプレート高度化**
   - MJML導入
   - カスタムスタイル

2. **配信管理強化**
   - 送信履歴記録 (`state/sent-newsletters.json`)
   - エラーリトライ機能

3. **GitHub Actions統合**
   - 自動配信ワークフロー (オプション)

---

## 8. リスクと軽減策

| リスク | 影響 | 確率 | 軽減策 |
|--------|------|------|--------|
| メールがスパム判定される | 高 | 中 | SPF/DKIM設定、Resendのドメイン認証 |
| HTMLが正しく表示されない | 中 | 低 | 主要クライアントでテスト、Litmus/Email on Acid活用 |
| APIキーの漏洩 | 高 | 低 | .gitignoreに.env追加、GitHub Secretsのみ使用 |
| 送信エラー | 中 | 低 | エラーハンドリング、ログ記録 |
| 大量送信でのレート制限 | 中 | 低 | バッチ送信、リトライロジック |

---

## 9. コスト試算

### Resend無料枠 (3,000通/月)

- **想定配信頻度**: 月2回
- **想定受信者数**: 100名
- **月間送信数**: 200通

**結論**: 無料枠で十分運用可能。受信者が1,500名に達するまでコスト不要。

---

## 10. 次のステップ

1. ✅ 技術調査完了
2. ⏳ TODO作成 (`ai/todo/TODO-newsletter-email.md`)
3. 🔍 ユーザー確認事項の整理
4. 🚧 実装開始準備

---

**調査者**: Claude Code Project Manager Agent
**最終更新**: 2026-01-18
