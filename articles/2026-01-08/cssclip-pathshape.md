---
title: "CSSのclip-pathとshape()関数で切り抜き表現の引き出しを増やそう！"
source: "https://ics.media/entry/250703/"
publishedDate: "2025-07-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

CSSの[clip-path](https://developer.mozilla.org/ja/docs/Web/CSS/clip-path)を使うと要素を好きな形に切り抜けます。コンテンツを斜めに切り抜いたり、画像を丸く切り抜いたり、おそらくみなさんも見たことがある表現なのではないでしょうか？

`clip-path`では形を切り抜くための関数が利用できます。2025年4月ごろにリリースされたChrome 135、Edge 135、Safari 18.4には[shape()](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/shape)関数が追加されました。`shape()`関数を使うとより自由度の高い切り抜きが可能になります。

今回の記事では`clip-path`と`shape()`関数でどんな表現ができるかをご紹介します！

![fromコマンド](https://ics.media/entry/250703/images/250703_top.jpg)

### clip-pathとは

まずは`clip-path`について簡単に確認しましょう。

冒頭でも紹介した通り、`clip-path`では要素を切り抜くためのクリッピング領域を作ります。`circle()`、`rect()`、`path()`、`polygon()`などの関数を使うことで、その領域の外側を非表示にして好きな形にマスクします。

以下のデモでは、`background`を`polygon()`と`path()`を使って切り抜いています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250704_clip-path-shape/clip-path-demo.html)
-   [コードを確認する](https://github.com/ics-creative/250704_clip-path-shape/blob/main/docs/styles/clip-path-style.css#L33)

`.card-image`で定義したエリアに`background`で背景色を設定します。`clip-path`で切り抜くエリアを定義すると、背景色がその形に切り抜かれます。これが`clip-path`の仕組みです。詳細については『[clip-path - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/clip-path)』をご確認ください。

```
<div class="shape-card">
  <div class="card-image"></div>
  <div class="card-content">
    <h4>polygon()</h4>
    <p>
      多角形を定義する関数。座標点を指定して任意の多角形を作成できます。
    </p>
  </div>
</div>
```

```
/* バリエーション1(斜め） */
.card-image {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}
```

記事『[変幻自在なグラフィック表現！CSS, SVG, Canvasでマスクを使いこなせ](https://ics.media/entry/210701/)』では`clip-path`以外のマスクの表現を紹介しているので、こちらも参考にしてください。

### shape()関数とは

`shape()`関数はコマンドを使って形を定義します。今までも`path()`関数を使えば複雑な形を表現できましたが、SVGの文法で文字列として記載する必要があり扱いづらさがありました。先ほどのデモでも`path()`を使って曲線を描画していますが、SVGに詳しくなければパッと見ても何をしているかわかりづらいのではないでしょうか。

```
/* バリエーション2（曲線） */
.card-image-2 {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  /* SVG形式の文字列 */
  clip-path: path("M0,0 L1000,0 L1000,160 Q500,250 0,160 Z");
}
```

そこで登場したのが`shape()`関数です。

#### shape()とpath()の違い

`shape()`と`path()`には以下のような違いがあります。CSSで扱いやすいように進化した関数といえますね。

1.  `path()`がSVGの文法を扱うのに対し、`shape()`はコマンドを使い読み解きやすい形で記述できる
2.  `px`だけでなく`%`、`em`、`rem`などの単位を扱える
3.  CSSの数式（`calc()`、`max()`、`abs()`）やCSS変数を使える

#### shape()で使えるコマンド

`shape()`関数では以下のコマンドを組み合わせて図形を描画します。

**1\. from**

図形を描き始める点を指定します。

```
clip-path: shape(
  from 0px 0px,
  /* 省略 */
);
```

-   文法：`from x y`
-   パラメーター：
    -   `x y`：描画を開始する座標

![fromコマンド](https://ics.media/entry/250703/images/250703_from.png)

**2\. move**

`move`コマンドは何も描画せず、次のコマンドの開始位置を指定します。

```
clip-path: shape(
  /* 省略 */
  move to 10px 10px,
  /* 省略 */
);
```

-   文法：`move by [dx] [dy]` または `move to [x] [y]`
-   パラメーター：
    -   `by [dx] [dy]`：移動の終点。現在位置からの相対座標。
    -   `to [x] [y]`：移動する終点。絶対座標

![moveコマンド](https://ics.media/entry/250703/images/250703_move.png)

**3\. line**

直線を描画するときに使います。`line`の派生として、水平線を描くために使う`hline`、垂直線を描くために使う`vline`も存在します。

```
clip-path: shape(
  /* 省略 */
  line to 100px 100px,
  /* 省略 */
);
```

-   文法：`line by [dx] [dy]` または `line to [x] [y]`
-   パラメーター：
    -   `by [dx] [dy]`：直線の終点。現在位置からの相対座標。
    -   `to [x] [y]`：直線の終点。絶対座標。

![lineコマンド](https://ics.media/entry/250703/images/250703_line.png)

**4\. curve**

ベジェ曲線を描画するコマンドです。

最初の`x y`は`curve`コマンドの終点、`with`に続く`x1 y1`、`x2 y2`はベジェ曲線の制御点を指定します。`x2 y2`は省略できます。その際制御点は1つになります。

```
clip-path: shape(
  /* 省略 */
  curve to 100px 100px with 20px 20px,
  /* 省略 */
);
```

-   文法：`curve to [x] [y] with [x1] [y1] [x2] [y2]`  
    ※`by`も使用可能、`[x2] [y2]`は省略可
-   パラメーター：
    -   `to [x] [y]`：ベジェ曲線の終点の座標の絶対位置
    -   `with [x1] [y1] [x2] [y2]`：制御点（2つ目は省略可）

![curveコマンド](https://ics.media/entry/250703/images/250703_curve.png)

**5\. smooth**

`curve`と同様ベジェ曲線を描きますが、直前の線とのつながりを滑らかにしたいなら`smooth`を使うのがよいでしょう。

```
clip-path: shape(
  /* 省略 */
  smooth to 50px 50px with 100px 50px,
  /* 省略 */
);
```

-   文法：`smooth to [x] [y] with [x1] [y1]`  
    ※`by`も使用可能
-   パラメーター：
    -   `to [x] [y]`：曲線の終点の絶対座標
    -   `with [x1] [y1]`：制御点

![smoothコマンド](https://ics.media/entry/250703/images/250703_smooth.png)

**6\. arc**

こちらも曲線を描くコマンドですが、その手法に円弧を使います。`arc`はコマンドのパラメーターが多いので少しわかりづらいですが、考え方としては、`to [x] [y]`で指定した点を通る可能性のある2つの円弧のうち、どれを使うかをパラメーターで指定します。

```
clip-path: shape(
  /* 省略 */
  arc to 100px 100px of 50% 50% cw large rotate 0,
  /* 省略 */
);
```

-   文法：`arc to [x] [y] of [a] [b] [cw/ccw] [large/small] rotate [c]`
-   パラメーター：
    -   `to [x] [y]`：曲線の終点の絶対座標
    -   `of [a] [b]`：水平方向・垂直方向の半径
    -   `cw/ccw`：時計回り／反時計回り
        -   ※省略可。省略した場合のデフォルトは`ccw`
    -   `large/small`：大きい弧／小さい弧
        -   ※省略可。省略した場合のデフォルトは`small`
    -   `rotate [c]`：楕円の回転角
        -   ※省略可。省略した場合のデフォルトは`0deg`

![arcコマンド](https://ics.media/entry/250703/images/250703_arc.png)

`arc`については『[Better CSS Shapes Using shape() — Part 1: Lines and Arcs | CSS-Tricks](https://css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs/)』でとてもわかりやすく解説されています。英語の記事になりますが、図も豊富なので気になる方はぜひご覧ください。

**7\. close**

描画を終了させるコマンドです。`close`の直前のコマンドの終点から`from`で最初に指定した点まで直線を描画します。

```
clip-path: shape(
  /* 省略 */
  close
);
```

-   文法：`close`
-   パラメーター：なし

![closeコマンド](https://ics.media/entry/250703/images/250703_close.png)

### clip-pathとshape()を使った作例

ひととおりコマンドを学んだところで、`clip-path`と`shape()`を使った作例をご紹介します。

**特筆したいのは`shape()`関数で作成したクリッピング領域は、%などの単位を使うことでレスポンシブに表示できる**ということです。画面の横幅を変えても、グラデーションやクリッピング領域が崩れることなく表示できます。

#### 1\. タイトル装飾

`line`と`arc`を組み合わせた額縁風のタイトル装飾です。装飾部分の`arc`はピクセルで指定しているので、画面の幅が大きくなっても小さくなっても形は変化せず、幅のみが変化します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250704_clip-path-shape/shape-demo.html#title-decoration)
-   [コードを確認する](https://github.com/ics-creative/250704_clip-path-shape/blob/main/docs/styles/shape-style.css#L47)

```
clip-path: shape(
  from 12px 0,
  line to calc(100% - 12px) 0,
  arc to 100% 12px of 12px,
  line to 100% calc(100% - 12px),
  arc to calc(100% - 12px) 100% of 12px,
  line to 12px 100%,
  arc to 0 calc(100% - 12px) of 12px,
  line to 0 12px,
  arc to 12px 0 of 12px,
  close
);
```

#### 2\. 波形クリッピング

`smooth`を使用した波のような形のクリッピングです。有機的な形も自由度高く表現できるのが`shape()`関数の魅力です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250704_clip-path-shape/shape-demo.html#wave-clip)
-   [コードを確認する](https://github.com/ics-creative/250704_clip-path-shape/blob/main/docs/styles/shape-style.css#L79)

```
clip-path: shape(
  from 0 20%,
  smooth to 10% 12% with 5% 16%,
  smooth to 20% 18% with 15% 15%,
  smooth to 30% 10% with 25% 14%,
  smooth to 40% 16% with 35% 13%,
  smooth to 50% 8% with 45% 12%,
  smooth to 60% 14% with 55% 11%,
  smooth to 70% 6% with 65% 10%,
  smooth to 80% 12% with 75% 9%,
  smooth to 90% 4% with 85% 8%,
  smooth to 100% 10% with 95% 7%,
  line to 100% 100%,
  line to 0 100%,
  close
);
```

#### 3\. アニメーション

`line`と`curve`を使用した形をアニメーションさせた作例です。

「shape()とpath()の違い」でもお伝えしたとおり、`shape()`関数は`calc()`や`var()`等を使って形を制御できます。CSS変数を`@property`で定義しアニメーションさせることで、`curve`の形や`line`の始点/終点を動かしています。

`@property`に関しては記事『[意外？@propertyがCSSアニメーションを激変させる理由](https://ics.media/entry/241219/)』で詳しく解説しているので、ぜひこちらもご確認ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250704_clip-path-shape/shape-demo.html#animation)
-   [コードを確認する](https://github.com/ics-creative/250704_clip-path-shape/blob/main/docs/styles/shape-style.css#L113)

```
@property --y-progress {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}

@property --c-progress {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}

/* 省略 */

clip-path: shape(
  from 0 100%,
  line to 0 calc(100% - var(--y-progress)),
  curve to 100% calc(100% - var(--y-progress)) with 60%
    calc(100% - var(--c-progress)),
  line to 100% calc(100% - var(--y-progress)),
  line to 100% 100%,
  close
);
animation: animateY 3s var(--easeInQuart) infinite 0.7s,
    animateC 3s var(--easeOutQuart) infinite 0.7s;

/* 省略 */
@keyframes animateY {
  0% {
    --y-progress: 0%;
  }
  60% {
    --y-progress: 100%;
  }
  100% {
    --y-progress: 100%;
  }
}

@keyframes animateC {
  0% {
    --c-progress: 0%;
  }
  60% {
    --c-progress: 200%;
  }
  100% {
    --c-progress: 200%;
  }
}
```

#### 4\. 星型スポットライト

`line`を組み合わせて星型のクリッピングをした作例です。JavaScriptでマウスに追従させています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250704_clip-path-shape/shape-demo.html#spotlight)
-   [コードを確認する](https://github.com/ics-creative/250704_clip-path-shape/blob/main/docs/styles/shape-style.css#L175)

```
--mouse-x: 50%;
--mouse-y: 50%;
--spotlight-radius: 180px;
--inner-radius: 120px;

/* 省略 */

clip-path: shape(
  /* 星型の5つの外側頂点と5つの内側頂点を定義 */
    /* 上部の頂点から時計回りに描画 */ from var(--mouse-x)
    calc(var(--mouse-y) - var(--spotlight-radius)),
  /* 右上内側 */ line to calc(var(--mouse-x) + var(--inner-radius) * 0.588)
    calc(var(--mouse-y) - var(--inner-radius) * 0.809),
  /* 右上外側 */ line to
    calc(var(--mouse-x) + var(--spotlight-radius) * 0.951)
    calc(var(--mouse-y) - var(--spotlight-radius) * 0.309),
  /* 右内側 */ line to calc(var(--mouse-x) + var(--inner-radius) * 0.951)
    calc(var(--mouse-y) + var(--inner-radius) * 0.309),
  /* 右下外側 */ line to
    calc(var(--mouse-x) + var(--spotlight-radius) * 0.588)
    calc(var(--mouse-y) + var(--spotlight-radius) * 0.809),
  /* 下内側 */ line to var(--mouse-x)
    calc(var(--mouse-y) + var(--inner-radius)),
  /* 左下外側 */ line to
    calc(var(--mouse-x) - var(--spotlight-radius) * 0.588)
    calc(var(--mouse-y) + var(--spotlight-radius) * 0.809),
  /* 左内側 */ line to calc(var(--mouse-x) - var(--inner-radius) * 0.951)
    calc(var(--mouse-y) + var(--inner-radius) * 0.309),
  /* 左上外側 */ line to
    calc(var(--mouse-x) - var(--spotlight-radius) * 0.951)
    calc(var(--mouse-y) - var(--spotlight-radius) * 0.309),
  /* 左上内側 */ line to calc(var(--mouse-x) - var(--inner-radius) * 0.588)
    calc(var(--mouse-y) - var(--inner-radius) * 0.809),
  close
);
```

```
// マウスが要素上を移動したときの処理
spotlightImage.addEventListener("mousemove", (e) => {
  const rect = spotlightImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  spotlightImage.style.setProperty("--mouse-x", `${x}px`);
  spotlightImage.style.setProperty("--mouse-y", `${y}px`);
});
```

### 対応ブラウザー

`shape()`関数はChrome・Edge 135（2025年4月）、Safari 18.4（2025年3月）以降でサポートされています。FirefoxではNightlyビルドでのみ利用可能です。

![Can I use shape()](https://ics.media/entry/250703/images/250703_caniuse.png)

-   [“shape()” | Can I use… Support tables for HTML5, CSS3, etc](https://caniuse.com/?search=shape\(\))

### まとめ

`clip-path`と`shape()`関数について紹介しました。`shape()`関数と組み合わせると自由度の高いクリッピングができるようになります。アイディア次第で印象的な表現ができるので、ぜひ使いこなしてみましょう！

### 参考サイト

-   [shape() - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/shape)
-   [レスポンシブクリッピングにshape()を使用する | Blog | Chrome for Developers](https://developer.chrome.com/blog/css-shape?hl=ja)