# アクセシビリティ — 人間にもAIエージェントにも

**対象期間**: 2026年2月2日〜3月23日

---

テキスト分割の危険性、モバイルフォントサイズ、`visually-hidden`の20年史。従来のアクセシビリティの話題に加えて、「AIエージェントがアクセシビリティツリーを使ってアプリを操作する」という新しい軸が加わり、投資対効果の計算式が変わりつつあります。

---

## [You Know What? Just Don't Split Words into Letters](https://adrianroselli.com/2026/02/you-know-what-just-dont-split-words-into-letters.html)

> **出典**: Adrian Roselli | **公開日**: 2026-02-05 | W1

GSAPのSplitTextプラグインは「スクリーンリーダー対応」を謳っているが、8つの組み合わせのうち正常に動作したのは2つだけ。テキストアニメーションのためにDOMを壊す手法自体を避けるのがもっとも安全。2012年から繰り返し指摘されてきた問題。

---

## [Honoring Mobile OS Text Size](https://adrianroselli.com/2026/02/honoring-mobile-os-text-size.html)

> **出典**: Adrian Roselli | **公開日**: 2026-02-06 | W1

モバイルOSのテキストサイズ設定をWebに反映する方法。Firefox=自動、Safari=`-apple-system-body`、Chrome=新しい`<meta name="text-scale">`。3ブラウザ対応の「Frankenstyle」コードは数行で実装できる。

---

## [text-scale によるユーザ指定倍率での文字拡大](https://blog.jxck.io/entries/2026-02-11/text-scale.html)

> **出典**: blog.jxck.io | **公開日**: 2026-02-11 | W4

上の記事の仕様側からの解説。非線形スケールの議論が重要で、200%拡大時に見出しまで2倍にするとViewportを占有する。文字サイズには`rem`、余白には`vw`、線の太さには`px`という使い分けが必要。「`rem`で書いておけばアクセシブル」は不十分。

---

## [Everything you never wanted to know about visually-hidden](https://dbushell.com/2026/02/20/visually-hidden/)

> **出典**: Sidebar | **公開日**: 2026-03-05 | W5

2003年のTom Gilderのスキップナビゲーションから20年以上の「考古学」。`visually-hidden`の標準化には慎重な声が多い。多くの場合はデザインの「応急処置」であり、セマンティックなHTMLを正しく書くことが本質だという結論は20年変わらない。

---

## [Accessibility and AI agents](https://www.conor.fyi/writing/ai-access)

> **出典**: Sidebar | **公開日**: 2026-03-10 | W6

アクセシビリティツリーを整備すると、視覚障害のあるユーザーとAIエージェントの両方が恩恵を受ける「二重の恩恵（dual-use payoff）」。スクリーンショットベースの方法よりトークン消費が少なく決定論的。アクセシビリティの投資対効果に新しいインセンティブが加わった。

---

## [Designing for people with anxiety](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/)

> **出典**: Sidebar | **公開日**: 2026-03-18 | W7

カウントダウンタイマー、希少性を煽る表示、予測不能なUI。不安は特定の障害ではなく多くの人が経験するもの。「予測可能であること」がもっとも効果的な不安軽減策。タイマーの非表示オプション、コードの再リクエスト可能という安心コピーなど、すぐに取り入れられる実践。

---

**この流れの読み方**: DOMを壊さない（W1）→ OS設定を尊重する（W1, W4）→ 歴史に学ぶ（W5）→ AIエージェントにも恩恵（W6）→ 感情に配慮する（W7）。技術的な正しさから始まり、「誰のためのアクセシビリティか」の範囲が拡張していく。
