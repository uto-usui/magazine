# GitHub Actions ニュースレター自動化調査

**Archive Date**: 2026-01-18
**Status**: 保留（Paused）
**Related**: ニュースレター機能実装完了後の自動化検討

## Overview

GitHub Actions上でClaude Codeを実行し、ニュースレター作成から送信までを完全自動化する構想を調査。モデル比較の結果、品質を優先してOpusを選択し、コスト面から自動化は一旦保留とした。

## 調査結果

### モデル比較（2026-01-18実施）

同じ6記事でニュースレター生成を比較:

| モデル | ファイルサイズ | 品質 | コスト/回 |
|--------|---------------|------|-----------|
| **Opus** | 13,782 bytes | 深い考察、具体例豊富 | ~$0.20-0.50 |
| **Haiku** | 11,883 bytes | 要点は押さえている | ~$0.05-0.10 |

#### 品質比較サンプル（同一記事「Humanity as differentiator」の解説）

**Opus生成**:
> 筆者は小売業界のメガイベントで、サプライチェーン最適化からロボットによるデータマッサージまで、すべてがAIレンズで語られる状況を目撃した...人間によるカスタマーサポート、手作業による品質チェック、人の温かみを感じるインタラクションデザインなど...

**Haiku生成**:
> すべての企業が同じ AI 戦略に殺到すれば、誰も差別化できないという逆説です...

### コスト見積もり

| モデル | 入力 (1M tokens) | 出力 (1M tokens) | 月額推定（毎日実行） |
|--------|------------------|------------------|---------------------|
| Haiku | $1 | $5 | ~$1.5-3 |
| Sonnet | $3 | $15 | ~$3-9 |
| Opus | $5 | $25 | ~$6-15 |

## Technical Decisions

### 決定: Opusモデルを選択、自動化は保留

**理由**:
1. ニュースレターの価値は「UXエンジニア視点での深い考察」にある
2. Haikuでも機能するが、読み応えのある内容にはOpusが必要
3. 自動化のコスト（月$6-15）と手動実行の手間を比較し、現時点では手動を選択

### 現在の運用フロー

```
1. fetch-rss.yml (毎日 JST 09:00, GitHub Actions)
   └── RSS記事取得 → articles/ → 自動コミット/プッシュ

2. /create-newsletter (手動実行, Opusモデル)
   └── ニュースレター生成 → newsletters/ → コミット/プッシュ

3. send-newsletter.yml (newsletters/*.md 追加時, GitHub Actions)
   └── メール自動送信
```

## 将来の自動化設計案（参考情報）

### 目標ワークフロー

```yaml
# fetch-rss.yml への追加ステップ案
- name: Generate newsletter with Claude Code
  if: steps.changes.outputs.has_new_articles == 'true'
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  run: |
    npx @anthropic-ai/claude-code \
      -p "/create-newsletter" \
      --dangerously-skip-permissions \
      --model haiku  # コスト重視の場合
```

### 必要なセットアップ

- [ ] ANTHROPIC_API_KEY をGitHub Secretsに追加
- [ ] Claude Code CLI の非対話モード動作確認
- [ ] 記事0件時のスキップ処理実装

## Related Files

**比較テストで生成されたファイル**（削除推奨）:
- `newsletters/2026-01-18-143206.md` (Haiku生成)
- `newsletters/2026-01-18-144033.md` (Sonnet生成)

**正式なニュースレター**:
- `newsletters/2026-01-18-122901.md` (Opus生成)

## Notes

- 将来Anthropic APIの価格が下がった場合、自動化を再検討する価値あり
- Haikuの品質は「十分」だが、Opusの「深い考察」がニュースレターの差別化要因
- 手動実行でも `/create-newsletter` コマンドで簡単に生成可能
