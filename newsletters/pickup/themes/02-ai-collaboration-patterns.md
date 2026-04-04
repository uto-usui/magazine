# AIとの協業の型 — 名前がつき、仕組みが整う

**対象期間**: 2026年2月2日〜3月23日

---

「AIを使っている」だけでは話が始まらなくなった7週間でもありました。バイブコーディングとエージェンティックエンジニアリングの区別に始まり、ファクトリーモデル、仕様書の書き方、コンテキストファイルの管理、設計合意のプロセスと、協業の「型」が急速に整理されています。

---

## [Agentic Engineering](https://addyosmani.com/blog/agentic-engineering/)

> **出典**: Addy Osmani | **公開日**: 2026-02-04 | W1

「バイブコーディング」と「エージェンティックエンジニアリング」に名前がついた記事。AIエージェントに実装を任せつつ、人間がアーキテクチャ・品質・正確性を担保する規律ある開発手法を定義した。構造化された設計プロセスがAI時代にいっそう価値を持つ、という出発点。

---

## [The work moved: what the AI coding debate actually agrees on](https://leadership.garden/ai-the-work-moved/)

> **出典**: Sidebar | **公開日**: 2026-02-19 | W3

強気派も慎重派も同じデータを引用して異なる結論を出す。その理由を丁寧に解きほぐした記事。IDCによれば開発者がコードを書く時間は全体の16%。その16%を10倍速にしても、残り84%（設計、仕様、コミュニケーション）の課題は残る。仕事は消えたのではなく「上流に移動した」。

---

## [How Codex is built](https://newsletter.pragmaticengineer.com/p/how-codex-is-built)

> **出典**: The Pragmatic Engineer | **公開日**: 2026-02-17 | W3

OpenAIのCodexチームの内部。コードの90%以上をCodex自身が生成する自己循環体制。エンジニアは4〜8の並列エージェントを管理する「エージェントマネージャー」へ。段階的コードレビュー（AI常時+人間はコアのみ）の仕組みは、ファクトリーモデルの実践例。

---

## [The Factory Model](https://addyosmani.com/blog/factory-model/)

> **出典**: Addy Osmani | **公開日**: 2026-02-25 | W4

「コードを書くシステムのオーケストレーション」という新しい抽象度。エンジニアは複数のエージェントにリファクタ・機能実装・テストを並列で担当させる。出力の品質を左右するのは仕様の精度。曖昧な要件は数十の並列タスクに増幅され、それぞれが微妙に間違った方向へ進む。

---

## [Stop Using /init for AGENTS.md](https://addyosmani.com/blog/agents-md/)

> **出典**: Addy Osmani | **公開日**: 2026-02-23 | W4

コンテキストファイルの「書きすぎ」問題。LLM生成のAGENTS.mdはタスク成功率を2〜3%低下させコストを20%以上増加させた。書くべきはエージェントが自力で発見できない情報だけ。引き算の設計。

---

## [How to write a good spec for AI agents](https://www.oreilly.com/radar/how-to-write-a-good-spec-for-ai-agents/)

> **出典**: O'Reilly Radar | **公開日**: 2026-02-27 | W4

仕様書の書き方を体系化。「常に実行してよい」「確認してから実行」「絶対にしてはいけない」の3段階の境界線。大きな仕様を一度に渡すと「指示の呪い」が発生する。タスクをモジュール化し、必要なコンテキストだけを渡す。

---

## [Design-first collaboration](https://martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html)

> **出典**: Martin Fowler | **公開日**: 2026-03-03 | W5

AIのコードレビューが疲れるのは、5つのレベル（スコープ・アーキテクチャ・インテグレーション・契約・品質）の判断を同時に求められるから。5段階で順に合意を取る「Design-First」アプローチを提案。「コードを書く前に設計に合意する」という1つの制約が、協業の質を変える。

---

## [マルチAIエージェント時代のルールの一元管理](https://tech.smarthr.jp/entry/2026/03/12/134348)

> **出典**: SmartHR Tech Blog | **公開日**: 2026-03-12 | W6

Cursor・Claude Code・Devin・GitHub Copilotのルールを`AGENTS.md`に統一。「フロア案内図を見ながら注意書きを探す運用から、各部屋の入口に注意書きが貼ってある運用へ」。ディレクトリ構造にルールの適用範囲を埋め込む。

---

**この流れの読み方**: 名前の定義（W1）→ 仕事の移動先（W3）→ 実践例（W3）→ メンタルモデル（W4）→ コンテキスト管理（W4）→ 仕様書の型（W4）→ 設計プロセス（W5）→ 複数ツールの統合（W6）。抽象的な概念が、週を追うごとに具体的な「やり方」に落ちていく。
