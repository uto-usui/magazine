# 処理済み記事スキップ機能の実装

**作成日**: 2026-01-08
**カテゴリ**: パフォーマンス最適化

---

## 概要

RSS Readerの実行時間を大幅に短縮するため、一度処理した記事を再取得しない機能を実装。

## 問題

- 毎回1000件以上の記事を処理
- 初回実行後も「更新された」記事を再取得
- 実行時間: 30分以上

## 解決策

### コード変更

**src/index.ts:45**
```typescript
// Before
const articlesToProcess = [...newArticles, ...updatedArticles]

// After
const articlesToProcess = [...newArticles]
```

**src/index.ts:43** (ログ改善)
```typescript
// Before
console.log(`🔄 Updated articles: ${updatedArticles.length}`)

// After
console.log(`⏭️ Skipped (already processed): ${updatedArticles.length}`)
```

### 技術的根拠

- `DiffDetector.detectChanges()` が既に `newArticles` と `updatedArticles` を分離
- `processed.json` がURL単位で重複防止
- `updatedArticles` を除外するだけで目的達成

## 効果

| 項目 | 改善前 | 改善後 |
|------|--------|--------|
| 処理記事数 | 1000+件 | 0件（2回目以降） |
| 記事処理時間 | 30分以上 | 0秒 |
| 全体時間 | 30分以上 | 1-2分（RSS取得のみ） |

## 関連コミット

- `82d01aa` - feat: Skip updated articles and process only new ones
- `223fd75` - refactor: Update log message for skipped articles

## 追加対応: フィード無効化

問題のあるフィードを一時的に無効化:

| フィード | 問題 | コミット |
|----------|------|----------|
| Airbnb Engineering | HTTP 403 | `ea079fa` |
| Netflix Tech Blog | SSL証明書エラー | `510a9f0` |
| Hidde de Vries | 空レスポンス | `510a9f0` |

## 学び

1. **最小限の変更で最大効果**: 1行の変更で実行時間を大幅短縮
2. **既存ロジックの活用**: `DiffDetector` が既に分離していたので、除外するだけで済んだ
3. **ログの重要性**: 動作変更に合わせてログメッセージも更新

## 今後の課題

- 無効化したフィードの再調査
- RSS取得自体の並列化（現在1-2分）
