---
title: "上下中央揃えのCSSまとめ。Gridだと2行、Flexboxだと3行で実現可能"
source: "https://ics.media/entry/17522/"
publishedDate: "2018-03-28"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

CSSでブロック要素を上下中央揃え（天地左右の中央に配置）する方法はいくつかありますが、CSS Gridを使う方法が現在では一番手軽です。CSS Gridレイアウトを使うと、たった2行で上下中央揃えができます。

▼ CSS

```
.container {
  display: grid;
  place-items: center;
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180326_flexbox/example5_grid/example5_grid.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180326_flexbox/blob/master/docs/example5_grid/example5_grid.css)

### Flexboxだと3行

対して、Flexboxでも上下中央は実現できます。Flexboxの場合、中央揃えしたい要素の親に対して**たった3行記述するだけ**です。すべてのモダンブラウザでベンダープレフィックスなしで動作します。

▼ CSS

```
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

▼ 画像をウインドウの上下中央に配置する例

![](https://ics.media/entry/17522/images/180326_flexbox_example7.gif)

### 使い方

次のようなHTML、CSSで実現されるボックスを上下中央揃えすることを考えてみましょう。

▼ HTML

```
<div class="container">
  <div class="box"></div>
</div>
```

▼ CSS: コンテナー、ボックスの見た目の設定

```
.container {
  border: 2px solid #1b0303;
  box-sizing: border-box;
  width: 100%;
  height: 300px;
}

.box {
  background-color: #f53838;
  width: 300px;
  height: 200px;
}
```

`.box`を`.container`に対して上下中央揃えにするためには、`container`に対して3行のCSSコードを追加するだけです。

▼ CSS: 上下中央揃えのためのコード

```
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

黒枠で囲まれた`.container`に対して、赤の`.box`が上下中央揃えになっています。

![](https://ics.media/entry/17522/images/180326_flexbox_example1.png)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180326_flexbox/example1_flexbox/example1_flexbox.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180326_flexbox/blob/master/docs/example1_flexbox/example1_flexbox.css)

Flexboxにおいて`justify-content`プロパティは主軸方向の並び方を、`align-items`は交差軸方向の並び方を設定します。各々`center`を指定することで、直下の要素の上下中央揃えが実現できるのです（Flexboxについて詳しくは末尾の資料を参照ください）。

### 他の上下中央揃え方法との比較

では、本当にGridやFlexboxによる上下中央揃えが最短なのか、他のレイアウト方法と比較してみましょう。

#### ネガティブマージンを使うと6行〜4行

よく知られている昔ながらの方法として、ネガティブマージンを使った上下中央揃えがあります。この方法では**6行**のCSSコードが必要でした。また、Flexboxによる上下中央揃えと違い、ボックスの縦幅・横幅に応じてマージンの値を変更する必要があります。

▼ CSS

```
.container {
  position: relative;
}

.box {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -100px;
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180326_flexbox/example2_negative_margin/example2_negative_margin.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180326_flexbox/blob/master/docs/example2_negative_margin/example2_negative_margin.css)

`left`プロパティ、`top`プロパティ部分に`calc()`を用いると、4行になります。

▼ CSS

```
.container {
  position: relative;
}

.box {
  position: absolute;
  left: calc(50% - 150px);
  top: calc(50% - 100px);
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180326_flexbox/example2_negative_margin/example2_negative_margin_calc.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180326_flexbox/blob/master/docs/example2_negative_margin/example2_negative_margin_calc.css)

#### 絶対配置して上下左右を0にすると7行

要素を絶対配置して、上下左右を0にする方法です。この方法では7行のコードが必要です。

▼ CSS

```
.container {
  position: relative;
}

.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180326_flexbox/example3_absolute/example3_absolute.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180326_flexbox/blob/master/docs/example3_absolute/example3_absolute.css)

現行のモダンブラウザで可能な書き方として、`inset`プロパティを使用する方法もあります。`inset`プロパティは、`top`、`right`、`bottom`、`left`を一括指定できるショートハンドプロパティです。上下左右の値を1行で指定できるので、コードが4行で済みます。

▼ CSS

```
.container {
  position: relative;
}

.box {
  position: absolute;
  inset: 0;
  margin: auto;
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180326_flexbox/example3_absolute_inset/example3_absolute_inset.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180326_flexbox/blob/master/docs/example3_absolute_inset/example3_absolute_inset.css)

#### `margin: auto;`を組み合わせると2行で済む

次のように`margin: auto;`を組み合わせると2行で済みます

```
.container {
  display: flex;
}

.box {
  margin: auto;
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180326_flexbox/example4_margin/example4_margin.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180326_flexbox/blob/master/docs/example4_margin/example4_margin.css)

こちらの手法でも、各種ブラウザで動作しますが、次の点に注意する必要があります。

-   親要素と子要素の両方にスタイルを設定する必要がある
-   インライン扱いの要素には適用できないため、ブロック扱いの要素に変更が必要（後述の応用例2は`img`タグに`display: block;`の指定が必要）

筆者としては、GridやFlexboxのコードが、さまざまな考慮の必要がなく手軽だと感じています。

### Flexboxによる上下中央揃えの応用例

ここからは、Flexboxによる上下中央揃えを使った応用例を見てみましょう。

#### 応用例1: テキストを上下中央揃え

テキストを上下中央揃えする例です。`text-align`プロパティや`vertical-align`プロパティを用いることなく、テキストが親要素に対して上下中央揃えになります。

▼ HTML

```
<p class="paragraph">
  こんにちは、鈴木一郎です
</p>
```

▼ CSS

```
.paragraph {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

![](https://ics.media/entry/17522/images/180326_flexbox_example6.png)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180326_flexbox/example6_text/example6_text.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180326_flexbox/blob/master/docs/example6_text/example6_text.css)

#### 応用例2：全画面に対して要素を上下中央揃えにする

全画面の上下中央に要素を配置する例です。

▼ HTML

```
<body>
  <img src="images/logo.png" alt="">
</body>
```

▼ CSS

```
html,
body {
  width: 100%;
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

ウインドウ幅を変えても、配置した画像は常にウインドウに対して上下中央の位置に配置されます。

![](https://ics.media/entry/17522/images/180326_flexbox_example7.gif)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180326_flexbox/example7_fullscreen/example7_fullscreen.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180326_flexbox/blob/master/docs/example7_fullscreen/example7_fullscreen.css)

### まとめ

GridやFlexboxによる上下中央揃えは、**たった2〜3行で済む点と、ボックスの横幅・縦幅に応じて指定の変更が不要な点において、他のレイアウト手法よりも便利です**。ボックスレイアウトを行う場合は、今回の上下中央揃えの手法を積極的に使ってみてはいかがでしょうか？

なお、GridとFlexboxの基本については次の記事で詳しく解説していますので参照ください。

-   [CSS Grid入門](https://ics.media/entry/15649/)
-   [Flexbox入門](https://ics.media/entry/13117/)