---
title: "文字の変化を気持ちよく見せる! テキストアニメーションのJavaScriptライブラリまとめ"
source: "https://ics.media/entry/260709/"
publishedDate: "2026-07-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "iwama"
---

テキストの見た目や動きは、ページの印象を大きく左右する要素です。

HTMLやCSSのみでもある程度調整できますが、文字列の切り替えや、文字の形がなめらかにつながる変化（モーフィング）のような表現は、自作すると実装や調整に手間がかかります。文字列が変化する場面では、目的に合ったJavaScriptライブラリを使うことで、難しいロジックを自作することなく、見栄えのする表現を実装できます。

この記事では、テキスト表現に使えるJavaScriptライブラリをいくつか取り上げ、各ライブラリの特徴、向いている場面、使ってみた印象を紹介します。

### 紹介するJSライブラリ

この記事で紹介するライブラリは、次の基準で選定しています（2026年7月時点）。

-   ReactやVue.jsなど特定のフレームワーク専用ではないこと
-   個人でも商用でも利用可能な[MITライセンス](https://opensource.org/license/mit)で公開されていること
-   テキストの見た目や変化に関わる表現を実装できること

ライブラリ

概要

向いている場面

[slot-text](https://github.com/Danilaa1/slot-text)

短いテキストをスロットのように切り替える

ボタン、ステータス

[NumberFlow](https://github.com/barvian/number-flow)

数値の差分を桁ごとになめらかに動かす

価格、カウント

[Torph](https://github.com/lochie/torph)

文字列の形をなめらかにつなげて変化させる

見出し、キーワード

[shuffle-text](https://github.com/ics-ikeda/shuffle-text)

ランダムな文字を本来の文字へ収束させる

トップ画面、メニュー

[Fitty](https://github.com/rikschennink/fitty)

親要素の幅に合わせて文字サイズを自動調整する

見出し、カード

テキスト演出では、見た目だけでなく読み上げや選択、コピーへの影響などアクセシビリティにも注意が必要です。元のテキストが読み取りやすい構造で残るか、装飾のための文字が選択やコピーの邪魔にならないかを確認しておくと安心です。

### slot-text

[slot-text](https://github.com/Danilaa1/slot-text)は、短いUIラベルをスロットのように切り替えるライブラリです。`Copy` / `Copied`、`Online` / `Offline`、`保存中` / `完了` のように、状態が変わったことを伝えたい場面に向いています。

以下のデモでは、テキストが1文字ずつ縦方向に入れ替わるアニメーションで切り替わります。クロスフェードでシンプルに入れ替えるよりも操作の反応が伝わりやすく、UIの「触った感」が増しますね。文章のような長いテキストよりも、ボタンやバッジなどの短いラベルで使うほうが効果的です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260709_text_js_libraries/demo/01/)
-   [コードを確認する](https://github.com/ics-creative/260709_text_js_libraries/blob/main/demo/01/index.html)

```
import { slotText } from "slot-text";

// 初期表示の文字列を渡して、対象要素用のcontrollerを作成する
const label = slotText(document.querySelector(".js-copy-label-en"), "Copy");

// set()に次の文字列を渡すと、スロット風に切り替わる
label.set("Copied", {
  direction: "up",
});
```

### NumberFlow

[NumberFlow](https://github.com/barvian/number-flow)は、数値の変化をなめらかにアニメーション表示できるライブラリです。React、Vue.js、Svelte、素のJavaScript/TypeScript向けに提供されており、内部的にはWeb ComponentsのCustom Elementsを使って実装されています。フレームワークを使う場合は専用のコンポーネントとして、素のJavaScriptで使う場合は`<number-flow>`というカスタム要素として扱えます。値や表示形式を指定することで、カウントアップや金額、パーセントなどの数値表現を手軽に演出できます。

GitHub Star数は約7400で、今回紹介するライブラリの中ではとくに注目度が高いです。数字がパッと変わるのではなく、桁ごとに自然に動くため、ダッシュボードやECサイトの価格表示のように「値が更新された」ことを気持ちよく見せられます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260709_text_js_libraries/demo/02/)
-   [コードを確認する](https://github.com/ics-creative/260709_text_js_libraries/blob/main/demo/02/index.html)

```
<!-- 数値を表示したい場所にカスタム要素を記述する（中身は空でよい） -->
<number-flow class="js-flow"></number-flow>
```

```
// インポートすると<number-flow>タグが使えるようになる
import { continuous } from "number-flow";

const flow = document.querySelector(".js-flow");

// 表示形式やロケール、動きのプラグインを要素へ設定する
flow.locales = "ja-JP";
flow.format = { maximumFractionDigits: 0 };
flow.plugins = [continuous];

// update()に数値を渡すと、差分がアニメーションする
flow.update(12480);
```

### Torph

[Torph](https://github.com/lochie/torph)は、文字列をなめらかにモーフィングするライブラリです。見出しやキーワードを切り替えるときに使うと、単に文言が差し替わるだけでなく、次の言葉へつながっていくような印象を作れます。

表現としては目を引きますが、情報を読ませる本文に使うよりも、トップページの短いコピーや特定の単語に絞って使うほうが扱いやすいです。横にすっと変化していく動きが心地よいですね。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260709_text_js_libraries/demo/03/)
-   [コードを確認する](https://github.com/ics-creative/260709_text_js_libraries/blob/main/demo/03/index.html)

```
import { TextMorph } from "torph";

const wordElement = document.querySelector(".js-morph-word");

// 対象要素とアニメーション設定を渡してTextMorphを作成する
const wordMorph = new TextMorph({
  element: wordElement,
  duration: 460,
  ease: "cubic-bezier(0.19, 1, 0.22, 1)",
  locale: "ja",
});

// update()で次の文字列へモーフィングする
wordMorph.update("Copied");
```

### shuffle-text

[shuffle-text](https://github.com/ics-ikeda/shuffle-text)は、ランダムな文字が切り替わりながら、本来の文字へ収束する演出を実装できるライブラリです。サイバー感や懐かしいFlashコンテンツのような雰囲気を出したいときに相性がよく、演出を強めたい見出しやメニューに使いやすいです。

shuffle-textは弊社の池田が作成したライブラリです。基本的な使い方や制作事例については、記事『[手軽にテキストシャッフル演出ができるJSライブラリ「shuffle-text」を公開](https://ics.media/entry/15498/)』を参照してください。

見た目のインパクトが強いので、雰囲気の合うサイトで使えばとても役立ちそうです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260709_text_js_libraries/demo/04/)
-   [コードを確認する](https://github.com/ics-creative/260709_text_js_libraries/blob/main/demo/04/index.html)

```
import ShuffleText from "shuffle-text";

const title = document.querySelector(".js-shuffle-title");

// 対象要素を渡してShuffleTextを作成する
const shuffle = new ShuffleText(title);

shuffle.duration = 760;
shuffle.emptyCharacter = ".";

// setText()で完成形を指定し、start()で演出を再生する
shuffle.setText("COPY FROM THE FUTURE");
shuffle.start();
```

### Fitty

[Fitty](https://github.com/rikschennink/fitty)は、親要素の幅に合わせてテキストサイズを自動調整するライブラリです。見出しやキャッチコピーを、コンテナー内にきれいに収めたいときに向いています。

Fittyはアニメーションを追加する用途とは異なり、テキストの見た目を整える場面で役立ちます。カードのタイトル、可変幅の見出し、レスポンシブなトップ画面のコピーなどで、文字が折り返されすぎたり、逆に小さく見えたりする問題を抑えられます。

GitHub Star数は約3800です。導入もシンプルで、既存のHTMLに対して後から適用しやすい点も魅力です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260709_text_js_libraries/demo/05/)
-   [コードを確認する](https://github.com/ics-creative/260709_text_js_libraries/blob/main/demo/05/index.html)

```
import fitty from "fitty";

const frame = document.querySelector(".js-fit-frame");
const title = document.querySelector(".js-fit-title");

// 対象テキストと、調整するフォントサイズの範囲を指定する
const fittedTitle = fitty(title, {
  minSize: 10,
  maxSize: 220,
});

frame.style.setProperty("--fit-width", "280px");

// 親要素の幅を変えた場合は、fit()で再計算する
fittedTitle.fit({ sync: true });
```

2026年7月にリリースされたChrome・Edge 150では、CSSの`text-fit`プロパティが搭載されました。テキストノードのフォントサイズを調整し、包含ボックスの幅に収めるためのプロパティです。

-   参考：[Chrome 150 | Release notes | Chrome for Developers](https://developer.chrome.com/release-notes/150)

今後はCSSだけでテキストをコンテナー幅に収められる場面が増えそうですが、2026年7月時点では対応ブラウザーが限られるため、クロスブラウザーで同じような表現を使いたい場合はFittyがオススメです。

### まとめ

CSSだけではまだ難しい表現や、自作すると垢抜けない雰囲気になりがちな表現は、JavaScriptライブラリを使うと手軽に実装できます。

最近はAIで実装する場面も増えていますが、AIに実装を依頼するときにも「このライブラリを使って」と指示できると、細かいアニメーションの調整に時間を使いすぎずに済みます。

一方で、テキストはユーザーに伝えたい情報そのものでもあります。アニメーションによって読みにくくなったり、重要な内容が一時的に把握しづらくなったりしないよう注意が必要です。短いラベルや見出し、ステータス表示など、変化を伝えたい場面に絞って取り入れるとよいでしょう。

テキストまわりの見た目をCSSで整える方法については、記事『[小さな見づらさを減らすCSS - ::selection、caret-color、::target-text など、テキスト周りの装飾を改善しよう](https://ics.media/entry/260521/)』をあわせてご覧ください。