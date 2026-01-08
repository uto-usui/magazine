---
title: "全モダンブラウザ対応のCSS機能が爆増。Chromium版Edgeのもたらす次世代CSS表現"
source: "https://ics.media/entry/200604/"
publishedDate: "2020-06-04"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

2020年初め、Chromium版のMicrosoft Edge（以下新Edge）がリリースされました。新Edgeは「Microsoft Edge Legacy」（以下Edge Legacy）と比べて多くの機能が使えるようになっており、Chrome・Firefox・Safariのモダンブラウザと遜色ないレベルになっています。

先日5月29日にリリースされた「Windows 10 May 2020 Update」では、Edge Legacyの開発が終了することもアナウンスされており（参考記事「[Windows 10 features we’re no longer developing - Windows Deployment](https://docs.microsoft.com/en-us/windows/deployment/planning/windows-10-deprecated-features)」）、今後のWindows標準ブラウザは新Edgeとなっていくでしょう。

ウェブ制作の面で嬉しいことは、多くのCSSやJavaScriptの機能が使えるようになったことです。

**新Edgeで多くの機能が使えるようになったことで、全モダンブラウザで使える機能もぐっと増えました**。本記事では、その中でもとくに便利なCSSの機能についてピックアップして紹介します。いずれも新Edge、Google Chrome、Firefox、Safariの全モダンブラウザで使える機能です。

記事末尾では、ピックアップしたもの以外で全モダンブラウザで使えるようになったCSSの新機能についても紹介しています。

### clearfixによる回り込み解除がいらなくなる`display: flow-root`

`display`プロパティの`flow-root`値とは、要素の[ブロック整形コンテキスト（block formatting context、BFC）](https://developer.mozilla.org/ja/docs/Web/Guide/CSS/Block_formatting_context)を作成するための値です。**`clearfix`を使うことなくフロートの回り込み解除ができます。**

次のようにして使います。

```
.container {
  display: flow-root;
}
```

次のようなレイアウトを実装するケースで考えてみましょう。画像が2つ横並びになっていて、その後にテキストが続いています。

![](https://ics.media/entry/200604/images/images/200604_edge_display_flowroot.jpg)

HTMLコードは次のような形です。

```
<div class="container">
  <div class="box1"><img src="images/photo_1.jpg" alt="" /></div>
  <div class="box2"><img src="images/photo_2.jpg" alt="" /></div>
</div>

<p>吾輩は猫である。名前はまだ無い。（中略）</p>
```

画像の横並び部分は`float`プロパティを使ってレイアウトします。

```
.box1 {
  float: left;
}

.box2 {
  float: right;
}
```

`float`プロパティにより要素をフロート（左寄せ・右寄せ）にする場合は、後続の要素がフロートされた要素が重なってしまいます。従来は、この問題を解決するためにはclearfixなどが使われてきました。

▼ clearfixの例

```
.container:after {
  content: "";
  clear: both;
  display: block;
}
```

`display: flow-root`を使えば、`clearfix`を使うことなくフロートの回り込み解除ができます。

```
.container {
  display: flow-root;
}
```

実行結果は次のとおりです。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200217_edge_css/display_flow_root/)
-   [ソースコードを確認する](https://github.com/ics-creative/200217_edge_css/tree/master/display_flow_root)

`display: flow-root`の対応ブラウザは次のとおりです（「[Can I use…](https://caniuse.com/#feat=flow-root)」より）。

[![](https://ics.media/entry/200604/images/images/200604_edge_caniuse_flowroot.png)](https://caniuse.com/#feat=flow-root)

-   仕様書「[CSS Display Module Level 3](https://drafts.csswg.org/css-display/#valdef-display-flow-root)」

### 子孫要素にフォーカスがあたっているときのスタイル設定に便利な`:focus-within`疑似クラス

`:focus-within`とは、自分自身または子孫要素にフォーカスがあたっている要素を示すための擬似クラスです。**入力フォームで、子孫要素にフォーカスがあたっときに自分自身のスタイルを変えたいときに便利です。**

次のようにして使います。

▼ `:focus-within`擬似クラスの使い方

```
.container:focus-within {
  background-color: red;
}
```

`:focus-within`擬似クラスは、フォーム要素のフォーカス時のスタイル設定に便利です。次のような入力フォームで、テキスト入力要素にフォーカスをあてたときに背景のスタイルを変えるUIを考えてみましょう。

![](https://ics.media/entry/200604/images/images/200604_edge_focus_within_goal.png)

HTMLコードは次のようにしました。

▼ HTMLコード

```
<label>名前<input type="text"/></label>
<label>住所<input  type="text"/></label>
<label>メールアドレス<input  type="text"/></label>
```

`input`要素にフォーカスがあたった時に`label`要素全体にスタイルをあてたいのですが、ラジオボタンの`:focus`擬似クラスは`input`要素そのものしかスタイルをあてることはできません。

▼ フォーカスがあたったときのスタイルは、`input`要素にしか設定不可能

```
input:focus {
 /* フォーカスがあたったときのスタイル */
}
```

よって、目的のレイアウトを実現したければ、JavaScriptを用いて`input`要素のフォーカスイベントをキャッチして`label`要素のスタイルを変更するという冗長な手段が取られてきました。

`:focus-within`擬似クラスを使えば、`input`要素にフォーカスがあたった状態を、その親要素である`label`要素で検知ができるので、JavaScriptを使わず目的のスタイル設定が可能です。

▼ `input`要素にフォーカスがあたったとき、`label`要素全体にスタイルを付与するCSSコード

```
label:focus-within {
  background-color: rgb(221, 255, 69);
}
```

実行結果は次のとおりです。各フォーム要素に使えるので、フォーカス時のスタイル設定がラクになる機能です。

-   [デモを別ウインドウで確認する](https://ics-creative.github.io/200217_edge_css/focus_within/)
-   [ソースコードを確認する](https://github.com/ics-creative/200217_edge_css/blob/master/focus_within/index.html)

`:focus-within`擬似クラスの挙動については、新EdgeやGoogle ChromeのDevToolで確認できます。CSSを記述する際の参考にするとよいでしょう。

▼ 新EdgeのDevToolで`:focus-within`擬似クラスをチェックしている様子

![](https://ics.media/entry/200604/images/images/200604_edge_focus_within_devtool.png)

`:focus-within`擬似クラスの対応ブラウザは次のとおりです（「[Can I use…](https://caniuse.com/#feat=css-focus-within)」より）。

[![](https://ics.media/entry/200604/images/images/200604_edge_caniuse_focuswithin.png)](https://caniuse.com/#feat=css-focus-within)

-   仕様書「[Selectors Level 4 - :focus-within](https://drafts.csswg.org/selectors-4/#the-focus-within-pseudo)」

### 2つの値のどちらか小さい値を使いたいときの`min()`関数

`min()`関数は、2つの値のどちらか小さい方を使いたいときのための関数です。**最大値または最小値を一括で指定したいときに役立ちます**。

次のようにして使います。「画像の`width`（横幅）について、`700px`か`100%`のうちどちらかを使ってください」という意味になります。

▼ `min()`関数の使い方

```
img {
  width: min(700px, 100%)
}
```

次のようなレイアウトを実装するケースで考えてみましょう。画像の横幅はウインドウサイズに応じて伸び縮みしますが、最大で700pxまでしか伸びないレイアウトです。

![](https://ics.media/entry/200604/images/images/200604_edge_min.gif)

HTMLコードは次のようにしました。

```
<img
  src="images/piyopiyo.svg"
  alt=""
/>
```

従来のコードでは、次のように`max-width`と`width`を別々に指定する必要がありました。

▼ 従来のコード

```
img {
  width: 100%;
  max-width: 700px;
}
```

`min()`関数を使うと、次のように一行で済みます。

```
img {
  width: min(700px, 100%);
}
```

次のような仕組みにより、前述の`max-width`と`width`を組み合わせたときと同じ挙動となっているのです。

-   画面サイズが700px以下のとき、`100%`のほうが小さいので、`100%`の値が採用され、画像横幅は`100%`になる
-   画面サイズが700px以上のとき、`700px`のほうが小さいので、`700px`の値が採用され、画像横幅は`700px`になる

実行結果は次のリンクより確認できます。ウインドウサイズを拡縮すると、挙動がわかりやすいでしょう。

-   [デモを別ウインドウで確認する](https://ics-creative.github.io/200217_edge_css/min_max/)
-   [ソースコードを確認する](https://github.com/ics-creative/200217_edge_css/blob/master/min_max/index.html)

類似の関数として、`max()`関数や`clamp()`関数も使えるようになりました。

-   `max(A, B)`：A, Bの値のうち、どちらか大きい方を採用する
-   `clamp(A, B, C)`：A以上C以下のB。`max(A, min(B, C))`と同じ意味

`min()関数`の対応ブラウザは次のとおりです（「[Can I use…](https://caniuse.com/#feat=mdn-css_types_min)」より）。

[![](https://ics.media/entry/200604/images/images/200604_edge_caniuse_min.png)](https://caniuse.com/#feat=mdn-css_types_min)

-   仕様書「[CSS Values and Units Module Level 4](https://drafts.csswg.org/css-values-4/#calc-notation)」

### CSS Gridでのレイアウトがラクになるdisplay: contents

`display`プロパティの`contents`値とは、自分自身がボックスを生成せず、その子要素（と疑似要素）はボックスを生成するものです。**CSS Gridでのレイアウト時、セマンティックなタグ付けを行いつつもCSS Gridのレイアウトを適用したいときに便利です**。

次のようにして使います。

▼ `display: contents`の使い方

```
.box {
  display: contents;
}
```

`display: contents`はCSS Gridと組み合わせると便利です。次のようなレイアウトを実装するケースで考えてみましょう。各テキストと画像はリンク要素の想定です。

![](https://ics.media/entry/200604/images/images/200604_edge_display_contents_goal.jpg)

HTMLコードは次のようにしました。

▼ HTMLコード

```
<div class="container">
  <a href="#">
    <h2>雪三桜</h2>
    <img src="images/photo_1.jpg" alt="" />
  </a>
  <a href="#">
    <h2>ゴードンの歩道橋</h2>
    <img src="images/photo_2.jpg" alt="" />
  </a>
  <a href="#">
    <h2>セントラルガーデン<br />※ 品川駅</h2>
    <img src="images/photo_3.jpg" alt="" />
  </a>
</div>
```

各要素は横並びなので、CSS Gridを使って次のような2行3列のCSSコードにしたいところです。

▼ CSSコード

```
.container {
  display: grid;
  justify-content: center;
  grid-template:
    repeat(2, auto) /
    repeat(3, 1fr);
  gap: 10px 20px;
  grid-auto-flow: column;
}
```

しかし、CSS Gridによるレイアウトは子要素にのみ適用されるので、`a`要素が邪魔で意図どおりにレイアウトされません。

▼ 意図どおりにレイアウトされないCSS Grid

![](https://ics.media/entry/200604/images/images/200604_edge_display_contents_bad.jpg)

この問題を解決するため、`h2`タグと`img`タグを`a`タグで囲む冗長なコードもしばしば見受けられます。

▼ CSS Gridのレイアウトを適用するために作り出した冗長なHTMLコード

```
<div class="container">
  <a href="#">
    <h2>雪三桜</h2>
  </a>
  <a href="#">
    <img src="images/photo_1.jpg" alt="" />
  </a>
  <a href="#">
    <h2>ゴードンの歩道橋</h2>
  </a>
  <a href="#">
    <img src="images/photo_2.jpg" alt="" />
  </a>
  <a href="#">
    <h2>セントラルガーデン<br />※ 品川駅</h2>
  </a>
  <a href="#">
    <img src="images/photo_3.jpg" alt="" />
  </a>
</div>
```

`a`要素に対して`display: contents`を指定すると、あたかも`a`要素の見た目が消えたかのようにふるまいます。CSS Gridのアイテムは`h2`要素と`img`要素となり、正しくレイアウトされます。

▼ `a`要素に`display: contents`を指定

```
a {
  display: contents;
}
```

実行結果は次のとおりです。`a`要素についても見栄え上消えただけなので、正しくリンクとして機能します。このように、**`display: contents`はHTMLの文書構造を保ちつつ、CSS Gridによるレイアウトを行うのに強力な機能です**。

-   [デモを別ウインドウで確認する](https://ics-creative.github.io/200217_edge_css/display_contents/)
-   [ソースコードを確認する](https://github.com/ics-creative/200217_edge_css/blob/master/display_contents/index.html)

`display: contents`の対応ブラウザは次のとおりです（「[Can I use…](https://caniuse.com/#feat=mdn-css_properties_display_contents)」より）。

[![](https://ics.media/entry/200604/images/images/200604_edge_caniuse_contents.png)](https://caniuse.com/#feat=mdn-css_properties_display_contents)

-   仕様書「[CSS Display Module Level 3 - display: contents](https://drafts.csswg.org/css-display/#valdef-display-contents)」

### ダークモードの判別に便利なprefers-color-scheme

`prefers-color-scheme`とは、ユーザーが明るいカラースキームを好むか、暗いカラースキームを好むかを検知できるメディアクエリです。明るいカラースキームとは明るい背景と暗いテキスト、暗いカラースキームとは暗い背景と明るいテキストを指します。**ユーザーのOSがダークモードかライトモードかでCSSのスタイルを変えたいときに便利です。**

次のようにして使います。

▼ `prefers-color-scheme`の使い方

```
@media (prefers-color-scheme: dark) {
  /* ダークモードの場合のみ適用されるスタイル設定 */
}
```

次に示すのは、OSがダークモード（※ Androidではダークテーマ）か否かで背景色とテキストの色が変わるサンプルです。OSの設定が非ダークモードの場合は背景が`#f9f9f9`・文字色が`#000000`、OSの設定がダークモードの場合は背景が`#333333`・文字色が`#ffffff`となります。

▼ ダークモードでスタイルが変わるサンプル

```
body {
  background-color: #f9f9f9;
}

h1, 
body {
  color: #000000;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #333333;
  }

  h1, p {
    color: #ffffff;
  }
}
```

OSの設定に応じて、背景色とテキストの色が変わっていることがわかります。

▼ ダークモードでスタイルが変わるサンプル

-   [デモを別ウインドウで確認する](https://ics-creative.github.io/200217_edge_css/prefers_color_scheme/)
-   [ソースコードを確認する](https://github.com/ics-creative/200217_edge_css/blob/master/prefers_color_scheme/index.html)

`prefers-color-scheme`でのダークモード切り替えをチェックする場合は、新EdgeやGoogle ChromeのDevToolを使うと便利です。

`prefers-color-scheme`の対応ブラウザは次のとおりです（「[Can I use…](https://caniuse.com/#feat=prefers-color-scheme)」より）。

[![](https://ics.media/entry/200604/images/images/200604_edge_caniuse_mediaquery.png)](https://caniuse.com/#feat=prefers-color-scheme)

-   仕様書「[Media Queries Level 5 - prefers-color-scheme](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme)」

### ピックアップしたもの以外で全モダンブラウザで使えるようになったCSSの新機能

本記事で解説したCSSの新機能以外に、全モダンブラウザで使えるようになったCSSの新機能について紹介します。

-   `text-orientation`プロパティ：縦書きのテキストで、文字の向きを指定するためのプロパティ
-   `will-change`プロパティ：変更するスタイルをあらかじめブラウザに伝えるためのプロパティ
-   `font-variant-numeric`プロパティ：数字、分数、序数の表記を指定するためのプロパティ
-   CSS論理プロパティ（CSS Logical Properties）：論理的方向と次元を通じて、レイアウトを制御するためのプロパティ
-   `font-display`プロパティ：`@font-face`の中で指定し、ダウンロード可能なフォントがダウンロードされる前にどのように表示されるのかを指定するプロパティ
-   `image-rendering`プロパティ：画像を拡大縮小する場合のアルゴリズム
-   `caret-color`プロパティ：テキスト入力エリアでのカレットの色を指定するプロパティ
-   `mix-blend-mode`プロパティ：要素をかさねたときの見え方を指定するプロパティ（記事「[新プロパティmix-blend-modeを使いこなそう](https://ics.media/entry/7258/)」で詳しく解説しています）
-   `background-blend-mode`プロパティ：要素の背景をどのようにブレンドするかを指定するプロパティ
-   `all`プロパティ：要素のプロパティをリセットするためのプロパティ
-   CSS scrollbar styling：スクロールバーのスタイルを指定するための機能
-   `env()`変数：`safe-area-inset-top()`のような環境変数を取り扱う
-   `:placeholder-shown`疑似クラス：プレイスホルダーが表示されている場合の要素を示す
-   `:default`疑似クラス：デフォルトでチェックされている要素を示す（例：ラジオボタン、チェックボックス）

### 現場で使えるようになったCSSの新機能を使いこなそう

モダンブラウザは日々進化を続けています。便利なCSSもどんどん使えるようになっているので、これまで当たり前だと思っていた機能を見直すことで、より効率的に開発が可能になります。

「どうせIE11で使えないから…」と思う方もいるかもしれません。しかし、IE11で使えないからと言って新しい技術を学ばないのはもったいないです。開発の現場ではIE11をサポート対象外とするプロジェクトも増えてきており、**IE11を言い訳に新しい技術を学ばないのは大きな機会損失と言えるでしょう**。

新Edgeで使えるようになったCSSの新機能を使いこなしつつ、楽しく制作をしましょう。