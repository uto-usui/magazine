# Webプラットフォームの進化 — JSに頼らないUIへ

**対象期間**: 2026年2月2日〜3月23日

---

7週間を通じて、ブラウザネイティブの機能がライブラリやフレームワークの役割を静かに引き受けていく流れが一貫していました。CSSの表現力の拡張、宣言的なUI制御、そしてそれらを横断するInteropプロジェクト。派手さはないが、確実に「書かなくていいJS」が増えている。

---

## [CSS `@scope`](https://smashingmagazine.com/2026/02/css-scope-alternative-naming-conventions/)

> **出典**: Smashing Magazine | **公開日**: 2026-02-05 | W1

Firefox 146でBaseline入り。BEM→CSS Modules→CSS-in-JS→Tailwindと変遷してきた「スタイルの衝突をどう避けるか」に、CSSそのものが解を出した。ドーナツスコーピングで「ここからここまで」を宣言的に書ける。近接性という新しい詳細度の解決次元も導入。

---

## [CSS Bar Charts Using Modern Functions](https://css-tricks.com/css-bar-charts-using-modern-functions/)

> **出典**: css-tricks | **公開日**: 2026-02-05 | W1

`sibling-index()`と拡張`attr()`の組み合わせで、JSなしの棒グラフ。核心は2行のCSS。`grid-column: sibling-index()`で自動配置、`grid-row: span attr(data-value number)`で高さ制御。CSSがデータバインディングに近づいている。

---

## [HTML command / commandfor / interestfor 属性](https://ics.media/entry/260209/)

> **出典**: ICS MEDIA | **公開日**: 2026-02-08 | W2

ダイアログやポップオーバーの開閉をHTML属性だけで宣言的に記述。`<button commandfor="my-dialog" command="show-modal">`で完結。JavaScriptによるUI制御の時代からの転換点。

---

## [border-shape](https://una.im/border-shape/)

> **出典**: Una Kravets | **公開日**: 2026-02-19 | W3

ボックスの形状を再定義するCSS。`clip-path`と違い、ボーダー・背景・ボックスシャドウ・アウトラインがすべて新しいジオメトリに追従する。ツールチップのデモでは矢印の形に沿ってボーダーが正しく描画される。

---

## [Interop 2026](https://css-tricks.com/interop-2026/)

> **出典**: css-tricks | **公開日**: 2026-02-17 | W4

Chrome・Safari・Firefoxの3大エンジンが協力するクロスブラウザ対応プロジェクト。Anchor Positioning、Container Style Queries、Scroll-driven Animations、View Transitions、`contrast-color()`、`shape()`などが対象。

---

## [Getting Started With The Popover API](https://smashingmagazine.com/2026/03/getting-started-popover-api/)

> **出典**: Smashing Magazine | **公開日**: 2026-03-02 | W5

約60行+5つのイベントリスナーが、`popover`属性と`popovertarget`属性の約10行に。キーボード操作、スクリーンリーダー対応、ARIA同期がブラウザ側で処理される。アクセシビリティの「やり忘れ」を構造的に防げる。

---

## [Navigation API](https://web.dev/blog/baseline-navigation-api)

> **出典**: web.dev | **公開日**: 2026-02-17 | W5

History APIの構造的問題を10年越しで解決。`navigation.addEventListener('navigate', ...)`ひとつで、あらゆるナビゲーションをインターセプト。View Transitions APIとの組み合わせでアプリライクなページ遷移がネイティブに。

---

## [contrast-color()](https://una.im/contrast-color/)

> **出典**: Una Kravets | **公開日**: 2026-03-12 | W6

CSSの1行でアクセシブルなテキスト色を自動選択。`color: contrast-color(var(--brand-color))`でWCAG AA準拠の黒か白を返す。かつてSassのCompassにあった`contrasted()`のネイティブ版。

---

## [corner-shape](https://smashingmagazine.com/2026/03/beyond-border-radius-css-corner-shape-property-ui/)

> **出典**: Smashing Magazine | **公開日**: 2026-03-12 | W6

15年間`border-radius`で「丸」しか作れなかった制約を解消。squircle、bevel、scoop、notch。コーナーごとに異なる値を指定でき、`round bevel bevel round`のような組み合わせも可能。

---

## [Details that make interfaces feel better](https://jakub.kr/writing/details-that-make-interfaces-feel-better)

> **出典**: Sidebar | **公開日**: 2026-03-16 | W7

`text-wrap: balance`、同心円オフセットのborder-radius、`tabular-nums`、アニメーションの中断可能性（TransitionsとKeyframe Animationsの使い分け）。知っているだけで差がつく小さなCSSの工夫集。

---

**この流れの読み方**: スタイルのスコープ制御（`@scope`）→ データ表現（CSS Bar Charts）→ UI制御（`command`属性、Popover API）→ 形状表現（`border-shape`、`corner-shape`）→ アクセシビリティ（`contrast-color()`）→ ナビゲーション（Navigation API）→ 横断的な標準化（Interop 2026）。それぞれ別の問題を解いているが、「ライブラリがやっていたことをプラットフォームが引き受ける」という方向は共通。
