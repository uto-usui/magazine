---
title: "意外？ @propertyがCSSアニメーションを激変させる理由"
source: "https://ics.media/entry/241219/"
publishedDate: "2024-12-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2024年12月19日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

メディアクエリとして知られる`@media`やCSSアニメーションで使われる`@keyframes`など、CSSには`@`から始まるさまざまなルールがあります。その中にある`@property`というルールはご存知でしょうか？

CSS変数の定義をより細かく設定できるものですが、実はアニメーションにも活用できる意外な隠し能力があります。今回は`@property`についてと、そのアニメーションへの応用方法について解説します。

![食べ物が吸い込まれていくアニメーション](https://ics.media/entry/241219/images/images/241219_spiral.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property)

### @propertyとは？

`@property`はCSS変数の定義を宣言できるルールです。その変数の型や初期値、継承の有無などを設定できます。次のコードは`--custom-color`という変数の定義です。

```
@property --custom-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #f00;
}
```

この定義はカラー型の値を持ち、デフォルトで値の継承はされず、初期値は赤色（`#f00`）という意味です。このルールが有効な場合に以下のように変数を使用したとします。

```
.my-element {
  --custom-color: 100px; /* 無効な値 */
  color: var(--custom-color); /* 初期値の赤色になる */
}
```

`--custom-color`に`100px`という長さが指定されましたが、`@property`で定義した型がカラー型であるため無効な値として扱われ、初期値の赤色が適用されます。

つづいて、`inherits`というプロパティですが、親からの継承をデフォルトでするか、しないかの設定です。継承の可否ではないので注意してください。具体例は以下のようになります。

```
@property --custom-inherit-color {
  syntax: "<color>";
  inherits: true; /* デフォルトで親の値を継承する */
  initial-value: #f00; /* 赤色 */
}

@property --custom-non-inherit-color {
  syntax: "<color>";
  inherits: false; /* デフォルトで親の値を継承しない */
  initial-value: #f00; /* 赤色 */
}

.parent {
  --custom-inherit-color: #0f0; /* 緑色 */
  --custom-non-inherit-color: #0f0; /* 緑色 */
  .child1 {
    color: var(--custom-inherit-color); /* 緑色 */
  }
  .child2 {
    color: var(--custom-non-inherit-color); /* 赤色 */
  }
}
```

`--custom-inherit-color`は親からの値を継承するため、`.child1`要素は緑色になります。一方、`--custom-non-inherit-color`は親からの値を継承しないため、`.child2`は初期値の赤色のままになります。なお、明示的に継承する場合は初期値を上書きします。

```
.parent.explicitInherit {
  --custom-non-inherit-color: #0f0; /* 緑色 */
  .child1 {
    --custom-non-inherit-color: inherit; /* 親の値を継承する */
    color: var(--custom-non-inherit-color); /* 緑色 */
  }
  .child2 {
    --custom-non-inherit-color: #0f0; /* 緑色を宣言する */
    color: var(--custom-non-inherit-color); /* 緑色 */
  }
}
```

![@propetyによる継承の違い](https://ics.media/entry/241219/images/images/241219_inherit.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/base/)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property/blob/main/src/assets/style/base.css)

このように`@property`を使うことで、CSS変数の挙動をより細かく制御できるようになります。…が正直それだけではインパクトが薄いかもしれません。しかし、`@property`にはアニメーションに活用できる隠し能力があるのです。

### @propertyを使ったアニメーション

`@property`を使えばCSS変数の型を定義できることがわかりましたが、実はこれにより**アニメーション可能な値**としてCSS変数を定義できるようになります。つまりCSS変数をアニメーションできるのです。たとえば、以下のようなコードを見てみましょう。

```
@property --custom-animation {
  syntax: "<length>";
  inherits: true;
  initial-value: 0;
}

@keyframes custom-animation {
  0% {
    --custom-animation: 0;
  }

  100% {
    --custom-animation: 100px;
  }
}

.movingBox {
  translate: var(--custom-animation) 0;
  animation: custom-animation 1s infinite alternate linear;
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/base/#baseAnimation)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property/blob/6208d0a8c0cd3d00ce12b7a4cf6ed831e62793ae/src/assets/style/base.css#L60-L79)

このコードは、`--custom-animation`という変数を定義し、その値をアニメーションさせる例です。`--custom-animation`は`@property`によって`<length>`という長さの型を指定されています。この値は`width`プロパティなどで用いられるものと同じものです。そのため、`@keyframes`でアニメーションが可能になっています。

`@keyframes`で開始と終了時の値を指定し、`.movingBox`要素にアニメーションを適用すれば要素が左右に100px移動するアニメーションが実現できます。

![左右に100px動く箱](https://ics.media/entry/241219/images/images/241219_basic_animation.webp)

もちろん、これでは従来のCSSアニメーションとなんら変わりありません。ここでのポイントは動かしたいプロパティ自体をCSSアニメーションするのではなく、それを**媒介する別の変数をアニメーションさせている**点です。この媒介変数とも呼べるCSS変数を使うことで、従来では面倒だった動きやアニメーション不可能だったプロパティをアニメーションできるようになります。

### 円運動のアニメーション

`@property`を使った媒介変数を使うことで、複雑なアニメーションも実現できます。たとえば、以下のようなコードを見てみましょう。

```
@property --degree {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0deg;
}

.circleMove1 {
  --r: 134px; /* 半径 */

  translate: calc(var(--r) * cos(var(--degree))) calc(var(--r) * sin(var(--degree)));
  animation: circular 5s linear infinite;
}

@keyframes circular {
  from {
    --degree: 0deg;
  }

  to {
    --degree: 360deg;
  }
}
```

![円運動をするボール](https://ics.media/entry/241219/images/images/241219_circular.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/circular/#circle)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property/blob/719c115f7d072ff317140b1598c4a014f499e999/src/assets/style/circular.css#L21C1-L48C2)

これは半径134pxの円周上を要素が動くアニメーションです。円周上の`x`座標と`y`座標はそれぞれ、半径 × cos、半径 × sinで算出できます。`translate: calc(var(--r) * cos(var(--degree))) calc(var(--r) * sin(var(--degree)));`とすることで角度`--degree`における円周上の位置を表します。この`--degree`の値を`@keyframes`で0度から360度まで変化させれば要素が円周上を動くアニメーションが実現できます。

従来円運動は半径分の長さの要素を用意して、それを回転させることで実現していましたが、`@property`を使った媒介変数を使うことで、要素の大きさに縛られることなく円運動を実現できます。

かなり複雑な式ですが、このようなハート型のアニメーションも実現できます。

```
<div class="circle heartMove"></div>
```

```
.heartMove {
  --a: 7; /* ハートの大きさ */

  translate: calc(var(--a) * 1px * 16 * pow(sin(var(--degree)), 3))
    calc(
      -1px * var(--a) * (13 * cos(var(--degree)) - 5 * cos(2 * var(--degree)) - 2 *
            cos(3 * var(--degree)) - cos(4 * var(--degree)))
    );
  animation: heart 2.5s linear infinite;
}

@keyframes heart {
  from {
    --degree: 0deg;
  }

  to {
    --degree: 360deg;
  }
}
```

▼デモでは軌跡の動きがわかりやすいよう少しずつズラしたボールを複数配置しています。

![ハート型に動くボール](https://ics.media/entry/241219/images/images/241219_heart.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/circular/#heart)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property/blob/719c115f7d072ff317140b1598c4a014f499e999/src/assets/style/circular.css#L50-L71)

ハート型の関数の参考 [Heart Curve – from Wolfram MathWorld](https://mathworld.wolfram.com/HeartCurve.html)

円運動から少し応用して、らせんの運動もできます。吸い込まれるような表現などに応用ができそうです。

```
<div class="foods" style="--index: 0">
  <img src="/assets/images/apple.svg" alt="apple" width="56" height="56" />
</div>
<div class="foods" style="--index: 1">
  <img src="/assets/images/carrot.svg" alt="carrot" width="56" height="56" />
</div>
<!-- 省略 -->
```

```
@property --spiralRadian {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

@property --spiralScale {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

.foods {
  --spiralA: 0.5; /* 係数1 */
  --spiralB: 0.6; /* 係数2 */
  --spiralDistance: 2; /* うずまき距離 */

  --ease-out-sine: cubic-bezier(0.61, 1, 0.88, 1);

  rotate: calc(var(--spiralRadian) * 180deg / 6.18);
  scale: calc(0.01 * pow(var(--spiralScale), 2));
  translate: calc(
      var(--spiralA) * pow(exp(1), var(--spiralB) * var(--spiralRadian)) *
        cos(var(--spiralRadian) + var(--index) * var(--spiralDistance)) * 1px
    )
    calc(
      var(--spiralA) * pow(exp(1), var(--spiralB) * var(--spiralRadian)) *
        sin(var(--spiralRadian) + var(--index) * var(--spiralDistance)) * 1px
    );
  animation: spiral 6s calc(var(--index) * 0.25s) var(--ease-out-sine) infinite;
}

@keyframes spiral {
  from {
    --spiralRadian: 12.56;
    --spiralScale: 20;
  }

  to {
    --spiralRadian: 4.17;
    --spiralScale: 0;
  }
}
```

※主要な部分のみ抜き出しています。

![食べ物がらせんを描いて吸い込まれていくアニメーション](https://ics.media/entry/241219/images/images/241219_spiral.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/spiral/)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property/blob/main/src/assets/style/spiral.css)

### 色のアニメーション

さきほどは`<angle>`で角度を変化させましたが、これを`hsl()`関数に適用することで色相を変化させるアニメーションも実現できます。

```
<p class="gamingText">
  <span style="--index: 1" class="character">G</span
  ><span style="--index: 2" class="character">A</span
  ><span style="--index: 3" class="character">M</span
  ><span style="--index: 4" class="character">I</span
  ><span style="--index: 5" class="character">N</span
  ><span style="--index: 6" class="character">G</span
  ><span style="--index: 7" class="character">T</span
  ><span style="--index: 8" class="character">E</span
  ><span style="--index: 9" class="character">X</span
  ><span style="--index: 10" class="character">T</span>
</p>
```

```
@property --hue {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0deg;
}

.character {
  color: hsl(calc(var(--hue) + var(--index) * 36deg) 80% 70%);
  text-shadow: 0 0 0.1em hsl(calc(var(--hue) + var(--index) * 36deg) 80% 85%);
  animation: hueRotation 3s linear infinite;
}

@keyframes hueRotation {
  from {
    --hue: 0deg;
  }

  to {
    --hue: -360deg;
  }
}
```

![虹色に光る「Gaming Text」の文字](https://ics.media/entry/241219/images/images/241219_gamingText.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/gamingText/)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property/blob/main/src/assets/style/gamingText.css)

ゲーミングデバイスであるような虹色に発光するアニメーションです。1文字ずつ`--index`で開始する色相の位置をずらしています。

`background-image`プロパティの`linear-gradient()`関数を使うことで、背景色をアニメーションさせることもできます。

```
.gamingButton {
  background-image: linear-gradient(
      60deg,
      hsla(var(--hue) 95% 60% / 100%) 0%,
      hsla(calc(var(--hue) + 36deg) 95% 60% / 0%) 100%
    ),
    linear-gradient(
      180deg,
      hsla(calc(var(--hue) + 72deg) 95% 60% / 100%) 0%,
      hsla(calc(var(--hue) + 108deg) 95% 60% / 0%) 100%
    ),
    linear-gradient(
      240deg,
      hsla(calc(var(--hue) + 144deg) 95% 60% / 100%) 0%,
      hsla(calc(var(--hue) + 180deg) 95% 60% / 0%) 100%
    );
  animation: hueRotation 5s linear infinite;
}
@keyframes hueRotation {
  from {
    --hue: 0deg;
  }

  to {
    --hue: -360deg;
  }
}
```

※主要な部分のみ抜き出しています。

![虹色に輝くボタン](https://ics.media/entry/241219/images/images/241219_gamingButton.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/gamingText/)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property/blob/main/src/assets/style/gamingText.css)

`background-position`を動かして色が変わったように見せる手法はありましたが、`@property`を使えば色自体を変更できます。

### 物理運動

`@property`のアニメーションは円運動のように関数で記述できるものなら再現可能です。そのため物理運動を模した動きも実現できます。たとえば、ボールが跳ねながら移動するアニメーションなら`t`を時間として`x = v0x * t`、`y = v0y * t - 0.5 * g * t^2`といった関数で表現できます。最終的にはピクセル単位にするため、`1px`を掛ける必要があり、またブラウザの世界では下方向がy軸の正方向となるため、`y`の値には`-1px`を掛ける必要があります。これをCSSに落とし込むと以下のようになります。

```
<div class="ball"></div>
```

```
@property --timeX {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

@property --timeY {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

.ball {
  --v0x: 640; /* 水平方向の初速度 */
  --v0y: 58.8; /* 垂直方向の初速度。9.8の倍数にすると落下までの時間計算が楽。58.8 = 9.8 × 6 */
  --g: 9.8; /* 重力加速度 */

  translate: calc(var(--v0x) * var(--timeX) * 1px)
    calc(
      (var(--v0y) * var(--timeY) - 0.5 * var(--g) * pow(var(--timeY), 2)) * -1px
    );
  animation:
    ballAnimationX 1.8s linear infinite,
    ballAnimationY 0.6s linear infinite;
}

@keyframes ballAnimationX {
  from {
    --timeX: 0;
  }

  to {
    --timeX: 1;
  }
}

@keyframes ballAnimationY {
  from {
    --timeY: 0;
  }

  to {
    --timeY: 12; /* (2 × v0y ÷ 9.8) で発射から着地までの時間になる */
  }
}
```

▼デモでは軌跡の動きがわかりやすいよう少しずつズラしたボールを複数配置しています。

![跳ねるボール](https://ics.media/entry/241219/images/images/241219_ball.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/physics/#ball)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property/blob/main/src/assets/style/ball.css)

物理では時間`t`は同じですが、CSSアニメーションでは`--timeX`と`--timeY`を別々に設定しています。別々に設定することで水平方向の動きと垂直方向の動きが制御しやすくなります。垂直方向の動きは発射してから着地までを繰り返しますが、`2 × v0y`で算出できます。算出できるので`--timeY: calc(2 * var(--v0y))`としてもよいですが、この記述だとFirefoxで動作しないため、`--timeY: 12`とあらかじめ計算した値を設定しています。

ほかにも減衰振動の式を使うと、バネの振動を模したアニメーションも実現できます。

```
<div class="box shake"></div>
```

```
@property --progress {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

.shake {
  --amplitude: 0.3; /* 振幅 */
  --frequency: 6; /* 周期 */
  --attenuationRate: 2; /* 減衰率 */

  scale: calc(
    1 + var(--amplitude) * (pow(exp(1), var(--progress) * -1 * var(--attenuationRate))) *
      cos(var(--progress) * 3.14 * var(--frequency))
  );
  animation: shake1 4s linear infinite;
}

@keyframes shake1 {
  from {
    --progress: 0;
  }

  to {
    --progress: 6;
  }
}
```

![震える箱](https://ics.media/entry/241219/images/images/241219_shakingBox.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/physics/#shakingBox)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property/blob/719c115f7d072ff317140b1598c4a014f499e999/src/assets/style/scaling.css#L1-L43)

従来も`@keyframes`を細かく指定することで実現できましたが、`@property`を使うことにより計算式で表現できるので調整も容易です。振幅・周期・減衰率を変更することでいろいろな振動を表現できます。

少し変更するとプルプルのプリンも可能です。

```
<div class="pudding shake2">
  <!-- 省略 -->
</div>
```

```
.pudding {
  --amplitude: 1.5; /* 振幅 */
  --frequency: 5; /* 周期 */
  --attenuationRate: 0.9; /* 減衰率 */

  transform: skewX(
    calc(
      10deg * var(--amplitude) * (pow(exp(1), var(--progress) * -1 * var(--attenuationRate))) *
        cos(var(--progress) * 3.14 * var(--frequency))
    )
  );
  transform-origin: 50% 100%;
  animation: shake2 6s linear infinite;
}

@keyframes shake2 {
  from {
    --progress: 0;
  }

  to {
    --progress: 8;
  }
}
```

![プルプル震えるプリン](https://ics.media/entry/241219/images/images/241219_pudding.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241219_at_property/physics/#pudding)
-   [コードを確認する](https://github.com/ics-creative/241219_at_property/blob/719c115f7d072ff317140b1598c4a014f499e999/src/assets/style/scaling.css#L45-L68)

### ブラウザ対応状況

`@property`はChrome・Edge 85（2020年8月）、Safari 16.4（2023年3月）、Firefox 128（2024年7月）以降でサポートされています。一番対応が遅かったのはFirefoxの2024年7月ですが、2024年以降のブラウザならばほぼ対応しているといえるでしょう。

![@propertyのブラウザ対応状況](https://ics.media/entry/241219/images/241219_caniuse.png)

[CSS at-rule: `@property` | Can I use…](https://caniuse.com/mdn-css_at-rules_property)

### まとめ

`@property`はCSS変数を定義するためのルールですが、CSS変数をアニメーション可能な値にする能力もあります。`@property`を使った新しい手法では従来のCSSアニメーションでは難しかった動きができるようになり、関数の組み立て方次第ではいろいろできます。とくに色のグラーデーションなどは他の表現と組み合わせると効果を発揮するでしょう。

また、CSSなのでインタラクティブな要素にも適用可能でJavaScriptライブラリなどなしに表現力を高めることができます。ぜひ、`@property`を使ったアニメーションを試してみてください。

### 参考文献

-   [アニメーション可能な CSS プロパティ - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_animated_properties)