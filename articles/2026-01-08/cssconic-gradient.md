---
title: "CSSで円グラフや集中線が描けるconic-gradient入門"
source: "https://ics.media/entry/18966/"
publishedDate: "2018-09-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

CSSのグラデーション`conic-gradient()`関数は、`conic`（円錐）の名のとおり、円錐状にグラデーションを描画するものです。`conic-gradient()`関数を使用すると、**円錐状のグラデーションはもちろん、集中線や市松模様といった表現が手軽に実装できます**。

▼ `conic-gradient()`関数で実装したグラデーション例

![](https://ics.media/entry/18966/images/180914_conic_gradient_samples.png)

▼ `conic-gradient()`関数で実装した演出例

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180914_conic_gradient/line_effect/)

本記事では`conic-gradient()`関数の基本的な使い方を解説しつつ、応用的な表現やクロスブラウザ対応の方法を紹介します。

### conic-gradient()関数の基礎

#### linear-gradient()関数・radial-gradient()関数との比較

CSSでグラデーションを実現する手段は次の3種類があります。

-   `linear-gradient()`関数： 直線状のグラデーション
-   `radial-gradient()`関数： 放射状のグラデーション
-   `conic-gradient()`関数： 円錐状のグラデーション

本記事で紹介する`conic-gradient()`関数は、円錐状のグラデーションです。グラデーションに関する3つのCSSの違いを、コードを通して確認しましょう。

▼ `linear-gradient()`関数

```
.box {
  background-image: linear-gradient(
    to right,
    hsl(177, 100%, 50%),
    hsl(232, 100%, 50%)
  );
}
```

![linear-gradient()関数のサンプル](https://ics.media/entry/18966/images/180914_conic_gradient_linear_sample.png)

▼ `radial-gradient()`関数

```
.box {
  background-image: radial-gradient(
    hsl(177, 100%, 50%),
    hsl(232, 100%, 50%)
  );
}
```

![radial-gradient()関数のサンプル](https://ics.media/entry/18966/images/180914_conic_gradient_ragial_sample.jpg)

▼ `conic-gradient()`関数

```
.box {
  background-image: conic-gradient(
    hsl(177, 100%, 50%),
    hsl(232, 100%, 50%)
  );
}
```

![conic-gradient()関数のサンプル](https://ics.media/entry/18966/images/180914_conic_gradient_conic_sample.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180914_conic_gradient/sample1/)
-   [コードを確認する](https://github.com/ics-creative/180914_conic_gradient/blob/master/docs/sample1/style.css)

#### conic-gradient()関数の基本的な書き方

`conic-gradient()`関数のコードの基本的な書き方を紹介します。前述のコードでは、次のように始点と終点のみを指定しました。

```
.box {
  background-image: conic-gradient(
    hsl(177, 100%, 50%),
    hsl(232, 100%, 50%)
  );
}
```

他のグラデーションと同じく、カラーストップ（途中の色）は複数指定可能です。**追加でカラーストップの位置を指定でき、`deg`（角度）、`%`（割合）、`turn`（回転数）等の単位が使えます**。

```
.box {
  background-image: conic-gradient(
    hsl(0, 100%, 50%) 0,
    hsl(90, 100%, 50%) 90deg,
    hsl(180, 100%, 50%) 180deg,
    hsl(270, 100%, 50%) 270deg,
    hsl(360, 100%, 50%) 360deg
  );
}
```

▼ 実行結果

![カラーストップのサンプル](https://ics.media/entry/18966/images/180914_conic_gradient_color_stop.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180914_conic_gradient/sample2/)
-   [コードを確認する](https://github.com/ics-creative/180914_conic_gradient/blob/master/docs/sample2/style.css)

`conic-gradient()`関数の第一引数はグラデーションの開始位置や中心点の位置を指定可能です。

```
.box {
  /* 100px, 100pxを円錐の中心にする */
  background-image: conic-gradient(
    at 100px 100px,
    blue,
    red
  );

  /* 30degをグラデーションの開始位置とする */
  background-image: conic-gradient(from 30deg, blue, red);
}
```

#### 繰り返しのためのrepeating-conic-gradient()関数

線形グラデーションには繰り返しのための`repeating-linear-gradient()`関数、放射状グラデーションには繰り返しのための`repeating-radial-gradient()`関数があります。同様に**円錐状のグラデーションには繰り返しのための`repeating-conic-gradient()`関数があります**。

水色・青色・水色の`conic-gradient()`関数を繰り返して表示するサンプルを通して、使い方を紹介します。

```
.box {
  background-image: repeating-conic-gradient(
    hsl(177, 100%, 50%) 0,
    hsl(232, 100%, 50%) 10%,
    hsl(177, 100%, 50%) 20%
  );
}
```

▼ 実行結果

![repeating-conic-gradient()関数のサンプル](https://ics.media/entry/18966/images/180914_conic_gradient_repeat.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180914_conic_gradient/sample3/)
-   [コードを確認する](https://github.com/ics-creative/180914_conic_gradient/blob/master/docs/sample3/style.css)

この後は、`conic-gradient()`関数を用いてどのような表現ができるのかを紹介します。

### 円グラフ表現

次のサンプルは、ウェブページ内で円グラフを表示したいときに使える表現です。

![円グラフのサンプル](https://ics.media/entry/18966/images/180914_conic_gradient_graph.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180914_conic_gradient/sample4/)
-   [コードを確認する](https://github.com/ics-creative/180914_conic_gradient/blob/master/docs/sample4/style.css)

ポイントはカラーストップの記述部分です。0%〜65%が赤色（`#f11a50`）、65%〜90%が緑色（`#7cef00`）、それ以外が水色（`#00dbd9`）となり、円グラフのような表現を可能にしています。

```
.graph {
  background-image: conic-gradient(
    #f11a50 0,
    #f11a50 65%,
    #7cef00 65%,
    #7cef00 90%,
    #00dbd9 90%,
    #00dbd9 100%
  );
}
```

※ 中心をくり抜いているのは`mask-image`プロパティによるものです。後述のコラムを参照ください。

### 市松模様

次のサンプルは、二色の正方形を交互に配置する市松模様で使える表現です。

![市松模様のサンプル](https://ics.media/entry/18966/images/180914_conic_gradient_check.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180914_conic_gradient/sample5/)
-   [コードを確認する](https://github.com/ics-creative/180914_conic_gradient/blob/master/docs/sample5/style.css)

`repeating-conic-gradient()`関数でカラーストップの位置を0%、25%、50%に設定すると、市松模様となります。`background-size`で好きなサイズを設定して使います。

```
body {
  background-image: repeating-conic-gradient(
    white 0,
    white 25%,
    #cbcbcb 25%,
    #cbcbcb 50%
  );

  background-size: 20px 20px;
  background-position: center center;
}
```

### 集中線表現

次のサンプルは、ゲーム演出や漫画の一コマのような演出で使える集中線の表現です。

![集中線のサンプル](https://ics.media/entry/18966/images/180914_conic_gradient_line_effect_sample.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180914_conic_gradient/sample6/)
-   [コードを確認する](https://github.com/ics-creative/180914_conic_gradient/blob/master/docs/sample6/style.css)

集中線の太さにランダム性をもたせるために`repeating-conic-gradient()`関数を重ねています。ボーダーの色は変更しやすいようCSS変数を用いています。

```
body {
  background-color: #ffee33;
}

.line-container {
  --border-color: #ffab3c;

  /* ランダムな太さの先を重ねる */
  background-image: repeating-conic-gradient(
      transparent 0,
      transparent 13deg,
      var(--border-color) 13deg,
      var(--border-color) 16deg
    ),
    repeating-conic-gradient(
      transparent 0,
      transparent 20deg,
      var(--border-color) 20deg,
      var(--border-color) 23deg
    ),
    repeating-conic-gradient(
      transparent 0,
      transparent 5deg,
      var(--border-color) 5deg,
      var(--border-color) 8deg
    ),
    repeating-conic-gradient(
      transparent 0,
      transparent 2deg,
      var(--border-color) 2deg,
      var(--border-color) 3deg
    );
}
```

また、集中線が楕円ではなく正円上に広がるよう、次の工夫を行っています。

-   ブラウザサイズが横長のときはエフェクトの幅を`100vw`
-   ブラウザサイズが縦長のときはエフェクトの幅を`100vh`
-   エフェクトの中心点とブラウザの中心点をあわせて配置

```
:root {
  --circle-width: 100vw;
}

@media (orientation: portrait) {
  :root {
    --circle-width: 100vh;
  }
}

.box {
  position: absolute;

  --border-color: #ffab3c;
  --half-circle-width: calc(var(--circle-width) / 2);

  width: var(--circle-width);
  height: var(--circle-width);
  left: calc(50% - var(--half-circle-width));
  top: calc(50% - var(--half-circle-width));
}
```

#### コラム： 中心のくり抜きはmask-imageプロパティ

円グラフ表現や集中線表現では中心をくり抜いていますが、これは`mask-image`プロパティを用いています。`mask-image`プロパティは指定した画像の形状でマスクをかけられるプロパティで、今回は`radial-gradient`を次のように記述しています。

```
.box {
  /* 真ん中をくり抜く表現 */
  -webkit-mask-image: radial-gradient(
    transparent 0%,
    transparent 12%,
    white 30%,
    white
  );
}
```

### ブラウザの対応状況とポリフィル

`conic-gradient()`関数は各種ブラウザで対応しています。具体的にはGoogle Chrome 69（2018年）、Safari 12.1（2019年）、Firefox 83（2020年）で対応しています。

▼ 参照「[Can I use… – CSS Conical Gradients](https://caniuse.com/#feat=css-conic-gradients)」

![conic-gradient()関数の対応状況](https://ics.media/entry/18966/images/180914_conic_gradient_caniuse_220912.png)

### 集中線表現＋アニメーション＋星の配置

記事冒頭で紹介した表現は、集中線表現をベースに回転アニメーションやランダムな星の配置を加えたものです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180914_conic_gradient/line_effect/)
-   [コードを確認する（Sass ファイル）](https://github.com/ics-creative/180914_conic_gradient/blob/master/docs/line_effect/style.scss)

### conic-gradient()関数の応用例

`conic-gradient()`関数の応用例として、[CodePen](https://codepen.io/)に投稿されたユニークな作例をピックアップして紹介します。円錐グラデーションの表現のヒントになるでしょう。

次の作例は、レコードプレーヤーの表現です。`conic-gradient()`関数と`radial-gradient()`関数を組み合わせ、レコードの溝が表現されています。

[![レコードの作例](https://ics.media/entry/18966/images/180914_conic_gradient_codepen_recode.png)](https://codepen.io/lbebber/pen/RPLQxN)

-   [作例を別ウインドウで開く（CodePen）](https://codepen.io/thebabydino/pen/RPLQxN)

次の作例は、レーダーの表現です。回転する光・点滅する光・目盛り部分に`conic-gradient()`関数が使われています。

[![レーダーの作例](https://ics.media/entry/18966/images/180914_conic_gradient_codepen_rader.png)](https://codepen.io/thebabydino/pen/MwEbwE)

-   [作例を別ウインドウで開く（CodePen）](https://codepen.io/thebabydino/pen/MwEbwE)

次の作例は、疑似的な立方体の表現です。円グラフ表現や市松模様の表現で用いたカラーストップの手法と、`clip-path`を組み合わせています。

[![疑似的な立方体の作例](https://ics.media/entry/18966/images/180914_conic_gradient_codepen_cube.jpg)](https://codepen.io/thebabydino/pen/BNEXqZ)

-   [作例を別ウインドウで開く（CodePen）](https://codepen.io/thebabydino/pen/BNEXqZ)

### 新たなCSSのグラデーションを使ってみよう

これまでCSSでは直線状グラデーション・放射線状グラデーションが表示可能でしたが、`conic-gradient()`関数の登場によって円錐状のグラデーションも可能になりました。

筆者はゲームコンテンツを作ることが多いのですが、集中線表現をCSSだけで作れるというのは魅力的に感じます。