---
title: "mask-compositeでつくるCSSの新しい表現方法"
source: "https://ics.media/entry/241025/"
publishedDate: "2024-10-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2024年10月25日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

CSSで特定の形に切り抜く（マスキングする）には`mask-image`プロパティが便利です。マスク用の画像を`mask-image`プロパティを使って要素に適用すれば、その画像の不透過部分のみにマスキングできます。`mask-image`プロパティに関連して2024年から使用可能になった`mask-composite`プロパティを使うと、マスクの合成方法を指定でき、より幅広いマスク表現ができるようになりました。この記事では`mask-composite`プロパティについて解説します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241025_mask_composite/)
-   [コードを確認する](https://github.com/ics-creative/241025_mask_composite)

![mask-compositeを使ったアニメーション](https://ics.media/entry/241025/images/241025_intro.gif)

### mask-compositeプロパティの値とそのマスク結果の違い

`mask-composite`プロパティは、複数のマスク画像をどのように合成するかの方法を指定するためのプロパティです。実は`mask-image`プロパティは複数画像の指定にも対応しています。複数画像からマスク領域を生成する際に、`mask-composite`プロパティを活用して複雑なマスク領域をつくれます。

複数のマスク画像の指定方法は、複数の`background-image`プロパティと同じようにカンマ区切りで指定できます。

```
mask-image: url("mask1.png"), url("mask2.png");
```

`mask-size`プロパティや`mask-position`プロパティも同様に複数指定できます。`mask-image`の順に対応した値が適用されます。

```
/* 1つ目のマスク画像（mask1.png）のサイズを100px 100px、2つ目のマスク画像（mask2.png）のサイズを50px 50pxにする */
mask-size: 100px 100px, 50px 50px;

/* 1つ目のマスク画像を左上に、2つ目のマスク画像を左上から50px 50pxの位置に配置する */
mask-position: 0 0, 50px 50px;
```

このように複数のマスク画像を配置したとき、そのマスク画像同士をどのように合成するかを`mask-composite`プロパティで決めます。`mask-composite`プロパティは以下の4つの値を取ります。

-   `add`
-   `subtract`
-   `intersect`
-   `exclude`

デフォルトは`add`で、それぞれの領域を足し合わせます。`subtract`は1つ目のマスク画像から2つ目のマスク画像で減算します。`intersect`はマスク画像の塗りが重なる部分をマスク領域とします。`exclude`はマスク画像の塗りが重なる部分**以外**をマスク領域とします。以下のそれぞれの違いの図がわかりやすいでしょう。

▼ マスク画像と合成方法によるマスク領域の結果 ![2つの重なり合う円を、add、subtract、intersect、excludeでマスクした結果](https://ics.media/entry/241025/images/241025_value.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241025_mask_composite/values/)
-   [コードを確認する](https://github.com/ics-creative/241025_mask_composite/blob/main/src/assets/styles/values.css)

3枚以上の場合は複数の`mask-composite`プロパティを使って重ね合わせ具合を指定できますが複雑になります。基本的には上のマスク画像（記述順が後）から逆順で算出します。たとえば以下のような3つのマスク画像と`mask-composite`プロパティがあるとします。

```
mask-image: url("mask1.png"), url("mask2.png"), url("mask3.png");
mask-composite: add, subtract;
```

このとき上から順に処理するのでまずは`mask2.png`と`mask3.png`を`subtract`で合成し、その結果と`mask1.png`を`add`で合成します。

▼3つの画像の合成例 ![三つ巴の円をそれぞれ、addとsubtract、subtractとintersect、intersectとexclude、excludeとexcludeでマスクした結果](https://ics.media/entry/241025/images/241025_value_triple.png)

なお、ベンダープレフィックス付きの`-webkit-mask-composite`もありますが、こちらは現在では非標準となり値が上記で紹介したものと違うので注意してください。2024年以降のブラウザならベンダープレフィックスなしで使えるので、ベンダープレフィックス付きの`-webkit-mask-composite`は古いブラウザへの対応以外では使わないでしょう。

### mask-composite を使ったマスクの合成

`mask-composite`プロパティの挙動についてわかったかと思いますので、ここからはより実践的な`mask-composite`プロパティを使ったマスクの合成の表現を紹介します。

#### 真ん中を丸抜きするマスク

真ん中が丸く黒いマスク画像と`mask-composite: exclude`を使うことで、従来では難しかった**特定の領域以外の部分をマスキングする**ことが可能になります。

![円の画像から円以外の部分をマスキングする](https://ics.media/entry/241025/images/241025_center_hole.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241025_mask_composite/center_hole/)
-   [コードを確認する](https://github.com/ics-creative/241025_mask_composite/blob/main/src/assets/styles/centerHole.css)

以下のようなHTMLとCSSで実現できます（主要なコードのみ抜き出しています）。

```
<div class="centerHoleMask"></div>
```

```
.centerHoleMask {
  mask-image: linear-gradient(#000, #000), url("/assets/images/mask_circle.svg");
  mask-repeat: no-repeat;
  mask-position: 0 0, center center;
  mask-size: 100% 100%, 480px 320px;
  mask-composite: exclude;
}
```

`mask-image`プロパティの値の1つ目には`linear-gradient()`がありますが、これは領域全体にマスクをかけるためのものです。2つ目には真ん中が黒い円形のマスク画像を指定しています。`mask-composite: exclude`により、全体から真ん中の円形の部分を除外した領域がマスクになります。

この方法の利点は、画面サイズの変更にも対応しやすいことです。従来は真ん中以外の不透過で塗りつぶされた画像を用意することで対応していましたが、マスク画像より画面を大きくしたときなどはうまくマスキングできない部分が出てきたり、マスクの穴のサイズを可変にせざるを得なかったりと、制約が多かったです。しかし、この方法ならマスク穴を固定しながら、画面が大きくなってもマスク領域をひろげられます。

#### 交差を使った幾何学的なマスク

`mask-composite: exclude`を使うと、マスク画像の交差部分をマスク領域として使って幾何学的なマスク表現が可能になります。

![円が重なり合って領域をつくる幾何学的な模様](https://ics.media/entry/241025/images/241025_geometric.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241025_mask_composite/geometric_mask/)
-   [コードを確認する](https://github.com/ics-creative/241025_mask_composite/blob/main/src/assets/styles/geometricMask.css)

```
<div class="geometricMaskBg"></div>
<div class="geometricMask"></div>
```

```
.geometricMaskBg {
  background-color: var(--color-primary);
}

.geometricMask {
  background-color: var(--color-secondary);
  mask-image: 
    radial-gradient(
      circle at center,
      #000 0,
      #000 80px,
      transparent 80px,
      transparent 100%
    ), 
    radial-gradient(
      circle at center,
      #000 0, 
      #000 80px, 
      transparent 80px, 
      transparent 100%
    );
  mask-position: 
    0 0, 
    80px 80px, 
    40px 120px, 
    -69px -120px;
  mask-size: 160px 160px;
  mask-composite: exclude;
}
```

配置などを工夫すればいろいろな模様もできそうです。

### マスクを使ったアニメーション

マスク単体ではあらかじめそのような画像をつくって配置すれば十分な場合もありますが、CSSマスクのメリットはマスクアニメーションで幅広い表現ができることです。

#### 交差を使ったアニメーション

2つの画像が流れてきて、重なった部分にはまた別の画像が表示されるようなアニメーションです。

![左右から山と浜辺の画像が流れてきて、交差部分では別の街の画像が見えるアニメーション](https://ics.media/entry/241025/images/241025_intersection_animation.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241025_mask_composite/mask_animation/#intersection)
-   [コードを確認する](https://github.com/ics-creative/241025_mask_composite/blob/main/src/assets/styles/intersectionAnimation.css)

▼コード例（簡略化のため、一部の属性やレイアウトなどスタイルを省略しています）

```
<img
  src="/assets/images/bg.webp"
  class="intersectionAnimationImage intersectionAnimationImage1"
/>
<img
  src="/assets/images/bg2.webp"
  class="intersectionAnimationImage intersectionAnimationImage2"
/>
<img
  src="/assets/images/bg3.webp"
  class="intersectionAnimationImage intersectionAnimationImage3"
/>
```

```
.intersectionAnimationImage {
  mask-repeat: no-repeat;
  animation-duration: 6s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* 山の画像のマスク */
.intersectionAnimationImage1 {
  mask-image: url("/assets/images/intersection_mask1.png");
  animation-name: intersection1;
}

/* 海の画像のマスク */
.intersectionAnimationImage2 {
  mask-image: url("/assets/images/intersection_mask2.png");
  animation-name: intersection2;
}

/* 街の画像のマスク */
.intersectionAnimationImage3 {
  mask-image: url("/assets/images/intersection_mask1.png"),
    url("/assets/images/intersection_mask2.png");
  mask-composite: intersect;
  animation-name: intersection3;
}

@keyframes intersection1 {
  0% {
    mask-position: -1280px 0;
  }

  100% {
    mask-position: 0 0;
  }
}

@keyframes intersection2 {
  0% {
    mask-position: right -1280px bottom 0;
  }

  100% {
    mask-position: right 0 bottom 0;
  }
}

@keyframes intersection3 {
  0% {
    mask-position: -1280px 0, right -1280px bottom 0;
  }

  100% {
    mask-position: 0 0, right 0 bottom 0;
  }
}
```

山の画像と海の画像はそれぞれ別のマスク画像を使って流れてきますが、交差部の街の画像はその2つのマスクを合成したものになっています。アニメーションのキーフレームで`mask-position`を変化させることで、マスク位置を移動させ、画像が流れていくような表現ができます。

#### 注意！ Safari の`intersect`値の怪しい挙動

Safari 18.0では`intersect`値がChromeやFirefoxと違う挙動することが確認されています。`mask-size`でマスク画像を領域より小さくしたうえで`mask-composite: intersect`を使うと、うまく合成されなかったり画像外の部分を交差判定として捉えられたりして意図しない結果になることがあります。

一部をマスキングするときにはそのマスク領域のサイズの画像を`mask-position`で配置するのではなく、余白も含めた`mask-size`調整の不要なマスク画像を用意することで回避できます。上記の交差アニメーションの例でも横幅の大きなマスク画像を使っているのはこのためです。

#### 丸抜きマスクを使ったトランジション表現

さきほどの丸抜きマスクを使った応用表現としてトランジションを使った表現があります。

![青と黄色の円が広がりながら場面が切り替わるアニメーション](https://ics.media/entry/241025/images/241025_transion_animation.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241025_mask_composite/mask_animation/#transition)
-   [コードを確認する](https://github.com/ics-creative/241025_mask_composite/blob/main/src/assets/styles/transitionAnimation.css)

▼コード例（簡略化のため、一部の属性やレイアウトなどスタイルを省略しています）

```
<img src="/assets/images/bg.webp" />
<div class="transitionAnimationMask transitionAnimationMask1"></div>
<div class="transitionAnimationMask transitionAnimationMask2"></div>
```

```
.transitionAnimationMask {
  mask-image: linear-gradient(#000, #000), url("/assets/images/mask_circle.svg");
  mask-repeat: no-repeat;
  mask-position: 0 0, center center;
  mask-size: 100% 100%, 0 0;
  mask-composite: exclude;
  animation-timing-function: var(--ease-out-quart);
  animation-fill-mode: forwards;
}

.transitionAnimationMask1 {
  animation-duration: 1s;
  animation-delay: 0.2s;

  &.isActive {
    animation-name: maskAnimation;
  }
}

.transitionAnimationMask2 {
  animation-duration: 1.1s;

  &.isActive {
    animation-name: maskAnimation;
  }
}

@keyframes maskAnimation {
  0% {
    mask-size: 100% 100%, 0 0;
  }

  100% {
    mask-size: 100% 100%, 800px 800px;
  }
}
```

背景画像の上にマスク用の画像を2つ配置しています。それぞれに丸抜きマスクを適用し、そのマスクサイズをアニメーションで変化させることで、背景画像が丸抜きされて表示されるような表現ができます。1つ目と2つ目のアニメーションの開始時間を少しずらし、またデュレーション時間も少し異なるので拡大感のあるトランジションにしています。

#### スクロールと連動したマスク表現

トランジションマスクの例をさらに応用して、スクロールと連動したマスク表現を紹介します。「GO」という文字のOの穴を通って背景画像が見えるような表現です。

![GOのOの字の中をくぐり抜けていくようなアニメーション](https://ics.media/entry/241025/images/241025_scroll_animation.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241025_mask_composite/mask_animation/#scroll)
-   [コードを確認する](https://github.com/ics-creative/241025_mask_composite/blob/main/src/assets/styles/scrollAnimation.css)

▼コード例（簡略化のため、一部の属性やレイアウトなどスタイルを省略しています）

```
<div class="scrollMask">
  <div class="scrollMaskInner">
    <div class="wall">
      <div class="wallMask"></div>
      <div class="text">GO</div>
    </div>
    <img class="wallImage" src="/assets/images/bg.webp" />
  </div>
</div>
```

```
.wallMask {
  background-color: var(--color-primary);
  mask-image: linear-gradient(#000, #000),
    radial-gradient(#000 0, #000 50%, transparent 50%, transparent 100%);
  mask-repeat: no-repeat;
  mask-position:
    0 0,
    323px 237px; /* 「O」の穴に合う位置 */
  mask-size:
    100% 100%,
    16px 18px; /* 「O」の穴に合うサイズ */
  mask-composite: exclude;
  transform-origin: 331px 246px; /* 拡大した時「O」の穴の中心が起点となるような位置 */
}
```

```
// 十分穴が大きくなる倍率
const ENOUGH_SCALE = 94;
const scrollArea = document.querySelector(".scrollMask");
const wallMask = document.querySelector(".wallMask");
const text = document.querySelector(".text");

// スクロールイベントに応じてスケールを変更
scrollArea.addEventListener("scroll", (event) => {
  // スクロール量に応じた拡大率
  const scaleRatio = 1 + event.target.scrollTop / 11;
  if (event.target.scrollTop < 0) {
    return;
  }
  text.style.scale = `${scaleRatio}`;
  wallMask.style.scale = `${scaleRatio}`;

  // 十分大きくなったら非表示にする
  if (scaleRatio > ENOUGH_SCALE) {
    wallMask.style.visibility = "hidden";
  } else {
    wallMask.style.visibility = "visible";
  }
});
```

マスクやテキスト位置の固定は`position: sticky`で行っていますが、使用場面などに応じて適宜変更してください。Canvasを使わなくても複雑なマスク表現が実現できるようになってCSSの進化を感じます。

他のSVGやCanvasを使ったマスク表現は記事[『変幻自在なグラフィック表現！ CSS, SVG, Canvasでマスクを使いこなせ』](https://ics.media/entry/210701/)で解説されています。

### 対応ブラウザ

Chrome・Edge 120（2023年12月）、Safari 15.4（2022年3月）、Firefox 53（2017年4月）以降のブラウザが`mask-composite`に対応しています。2024年以降のブラウザであれば対応していると考えてよいでしょう。

![mask-compositeのブラウザ対応状況](https://ics.media/entry/241025/images/241025_compatible.png)

### まとめ

`mask-composite`を使うと従来と比べてより柔軟なマスクがつくれます。CSSマスクには可変サイズにしやすい点やアニメーションをしやすいといったメリットがあります。以前ではCanvasであったり、JavaScriptを駆使しないと難しかった表現も手軽に行えるようになったので、さまざまな表現を試してみてください。