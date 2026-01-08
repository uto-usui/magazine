# 質問履歴

**作成日**: 2026-01-08
**更新日**: 2026-01-08
**対象プロジェクト**: ux-eng-magazine

## ステータス凡例
- [ ] 未回答
- [x] 回答済み
- [~] 部分回答

---

## 高優先度（実装前に必須）

### Q1: RSS URLの初期リスト
**重要度**: 🔴高
**ステータス**: [x] 回答済み
**質問**: 対象となるRSSフィードのURLリストを教えてください
**影響範囲**: Phase 2のRSS取得モジュール実装

**回答**: 21個のRSSフィードURL
```
https://netflixtechblog.com/feed
https://www.uber.com/blog/engineering/rss/
https://engineering.atspotify.com/feed/
https://medium.com/feed/airbnb-engineering
https://engineering.fb.com/feed/
https://github.blog/engineering/feed/
https://csswizardry.com/feed
https://addyosmani.com/rss.xml
https://web.dev/feed.xml
https://adrianroselli.com/feed
https://hidde.blog/feed
https://sidebar.io/feed.xml
https://newsletter.pragmaticengineer.com/feed
https://uxwritinghub.com/feed
https://lea.verou.me/feed.xml
https://tympanus.net/codrops/feed/
https://css-irl.info/rss.xml
https://www.smashingmagazine.com/feed
https://www.bitovi.com/blog/rss.xml
https://www.sarasoueidan.com/blog/index.xml
https://feeds.feedburner.com/Kilianvalkhofcom
```

### Q2: 保存形式の詳細
**重要度**: 🔴高
**ステータス**: [x] 回答済み
**質問**: Frontmatter（メタデータ）にどの情報を含めますか？
**推奨案**: `title`, `source`, `publishedDate`, `category`, `author`
**影響範囲**: Markdown変換モジュール

**回答**: 推奨案でOK
- `title`, `source`, `publishedDate`, `category`, `author`

### Q3: ファイル命名規則
**重要度**: 🔴高
**ステータス**: [x] 回答済み
**質問**: 日付ベース？タイトルベース？
**提案**: `YYYY-MM-DD_<sanitized-title>.md`
**影響範囲**: ファイル保存処理

**回答**: 日付フォルダ階層構造
- `articles/YYYY-MM-DD/<sanitized-title>.md`
- スクレイピング時の日付/タイムスタンプでフォルダを作成
- その下にタイトルベースのMarkdownファイル

### Q4: 重複記事の扱い
**重要度**: 🔴高
**ステータス**: [x] 回答済み
**質問**: 同じ記事が複数フィードに出現した場合の処理方針
**選択肢**:
  - 最初に発見したものを採用
  - 両方保存（カテゴリ別）
  - マージして保存
**影響範囲**: 差分検知ロジック

**回答**: 新しいものを採用する（差分があれば更新）

### Q5: ブランチ戦略
**重要度**: 🔴高
**ステータス**: [x] 回答済み
**質問**: mainブランチに直接コミット？それとも別ブランチ？
**推奨**: mainに直接（自動化のため）
**影響範囲**: GitHub Actions設定

**回答**: mainでOK

---

## 中優先度（Phase 2までに決定）

### Q6: スクレイピング失敗時の動作
**重要度**: 🟡中
**ステータス**: [x] 回答済み
**質問**:
  - スキップして続行？
  - リトライ回数は？（推奨: 3回）
  - 部分的な内容でも保存？

**回答**:
- 404: 保存しない
- 何らかの情報が取れる場合: URLを掲載（詳細はユーザーが判断）
- リトライ: 実装時に検討

### Q7: 画像の扱い
**重要度**: 🟡中
**ステータス**: [x] 回答済み
**質問**:
  - 画像URLのみ保存？（推奨）
  - 画像をダウンロードして保存？

**回答**:
- できればダウンロードして保存
- 難しければ保存しない
- 大きな画像は飛ばしてOK

### Q8: カテゴリ分類の方針
**重要度**: 🟡中
**ステータス**: [x] 回答済み
**質問**:
  - フィード単位で自動分類？（推奨）
  - 手動でYAMLに記載？

**回答**:
- 自動分類でOK
- ただしカテゴリライブラリ（マスター）を用意
- カテゴリが増えすぎないよう制御

### Q9: 実行頻度
**重要度**: 🟡中
**ステータス**: [x] 回答済み
**質問**:
  - 1日1回で確定？
  - 時刻の希望は？（現在案: JST 09:00）

**回答**: 1日1回 JST 09:00

---

## 低優先度（Phase 4以降で検討）

**注記**: 別フェーズで検討のため今回は省略

### Q10: 通知機能
**重要度**: 🟢低
**ステータス**: [ ] 未回答（Phase 4以降）
**質問**: 新記事取得時にSlack等への通知が必要か？

### Q11: アーカイブ戦略
**重要度**: 🟢低
**ステータス**: [ ] 未回答（Phase 4以降）
**質問**: 古い記事の扱い（圧縮・削除・別ディレクトリ移動）

### Q12: 全文検索
**重要度**: 🟢低
**ステータス**: [ ] 未回答（Phase 4以降）
**質問**: 記事の検索機能は必要か？
