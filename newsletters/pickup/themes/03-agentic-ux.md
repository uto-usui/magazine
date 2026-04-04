# エージェント時代のUX — チャットの先にあるもの

**対象期間**: 2026年2月2日〜3月23日

---

AIエージェントが「提案する」存在から「行動する」存在になるとき、インターフェースはどう変わるのか。チャットUIの限界、信頼の設計、会話と実行の分離、そしてエージェント向けのコンテンツ配信まで。ユーザーの定義が広がっています。

---

## [Designing For Agentic AI: Practical UX Patterns](https://smashingmagazine.com/2026/02/designing-agentic-ai-practical-ux-patterns/)

> **出典**: Smashing Magazine | **公開日**: 2026-02-11 | W2

行動ライフサイクルに沿った6つのUXパターン。行動前のIntent Preview（計画提示）、行動中のAutonomy Dial（自律度の調整）とConfidence Signal（確信度の可視化）、行動後のAction Audit & Undo。各パターンにメトリクス目標値まで付いている。

---

## [Making agent-friendly pages with content negotiation](https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation)

> **出典**: Vercel | **公開日**: 2026-02-03 | W1

エージェント向けにMarkdown形式でコンテンツを配信。500KBのHTMLが2KBに。ユーザーの定義が「人間だけ」ではなくなった。レスポンシブデザインがデバイスに適応したように、コンテンツがクライアントの種類に適応する時代。

---

## [AI's text-trap](https://uxdesign.cc/ais-text-trap-moving-towards-a-more-interactive-future-7035bbc4aaa5)

> **出典**: Sidebar | **公開日**: 2026-02-18 | W3

テキストベースのチャットに閉じるとプロダクトのUXが差別化を失う。3つの脱却モード：リッチな出力（カード・テーブル）、UIとしての入力（クエリビルダー）、共創（テキストと直接操作の切り替え）。デザインシステムのコンポーネントをAIの「出力語彙」にするという発想。

---

## [The Most Exciting Development in GenUI: Buttons and Checkboxes](https://www.nngroup.com/articles/genui-buttons-and-checkboxes/)

> **出典**: Nielsen Norman Group | **公開日**: 2026-03-06 | W5

GenUIの実現が、ボタンやチェックボックスという「地味な」UI要素から始まっている。価値は「新しいUIの発明」ではなく「既存のUIパターンを文脈に応じて適切に配置する」こと。Claudeの段階的な質問収集やGoogle AI Modeの検索チップが具体例。

---

## [Designing AI experiences people actually use](https://buzzusborne.com/writing/designing-ai-for-trust/)

> **出典**: Sidebar | **公開日**: 2026-03-12 | W6

空白のプロンプトは「明確化の壁」。ユーザーに「発明」させるのではなく「反応」させるインターフェースへ。信頼・価値認識・認知的労力の3つの力が互いに増幅し合い、AI機能の採用を左右する。Salesforceの調査では「人間による検証」が信頼のもっとも大きな促進要因。

---

## [Agentic workflows are not conversations](https://blog.raed.dev/posts/agentic-workflows-are-not-conversations/)

> **出典**: Sidebar | **公開日**: 2026-03-09 | W6

フロントエンドでは会話に見せつつ、バックエンドはステートマシンであるべき。ツール呼び出しの3分類（読み取り・書き込み・ハイブリッド）でエラーハンドリングが異なる。Durable Executionのような永続的な実行基盤が適している。

---

## [What Is Your Site's AI Chatbot for? Users Can't Tell](https://www.nngroup.com/articles/site-ai-chatbot/)

> **出典**: Nielsen Norman Group | **公開日**: 2026-03-20 | W7

8つのサイトチャットボットのユーザビリティテスト。多くは検索の再発明になっている。フィルター付き一覧のほうが効率的な場面でチャットを挟むのはフリクション。有効なのは「複数条件を組み合わせた個別文脈の相談」。「AIから始めるな、課題から始めよ」。

---

## [How do you want to remember?](https://zakelfassi.com/how-do-you-want-to-remember)

> **出典**: Sidebar | **公開日**: 2026-03-19 | W7

エージェントのメモリを評価・改善した実験。「何が起きたか」は100%記憶できるが「なぜそう決めたか」は25%しか思い出せない。決定ファイルに「why」フィールドを追加するだけで、リコール率が60%→93%に。情報アーキテクチャがAIの記憶品質を決める。

---

**この流れの読み方**: 行動するAIのUXパターン（W2）→ エージェント向けコンテンツ（W1）→ チャットの限界（W3）→ 地味なUI要素の価値（W5）→ 信頼の設計（W6）→ 会話と実行の分離（W6）→ ユーザビリティの現実（W7）→ メモリの設計（W7）。理想のパターンから出発して、実装の具体性が増し、最後にユーザー調査で現実に着地する。
