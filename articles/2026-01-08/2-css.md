---
title: "同じ2色でも見た目が違う？ CSSグラデーションの新しい補間方法まとめ"
source: "https://ics.media/entry/250829/"
publishedDate: "2025-08-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

美しいグラデーションづくりで鍵になるのは、色そのものと、色と色をつなぐ「補間」です。たとえ2色のシンプルなグラデーションでも、補間の仕方しだいで中間色がくすみ、意図しない印象になってしまいます。

CSSグラデーションでは色の補間方法を指定できます。

本記事ではCSSで扱えるグラデーションの基本をおさらいしたあと、「色の混ぜ方（補間方法）」の違いを作例で比較します。

### CSSのグラデーションの種類

まず、グラデーションの種類を整理しましょう。グラデーションは概念的に4種類に分けられます。このうちCSSで実装できるのは線形、放射、円錐（扇形）グラデーションの3種類です。

1.  線形グラデーション：`linear-gradient()`関数
2.  放射グラデーション：`radial-gradient()`関数
3.  円錐（扇形）グラデーション：`conic-gradient()`関数
4.  フリーグラデーション・メッシュグラデーション：CSSでは実装不可

![](https://ics.media/entry/250829/images/images/250829_gradient_interpolation_gradation.png)

`linear-gradient(red, blue)`のように2色以上指定すると色が補間されます。詳しい記法は以下の記事を参考にしてください。

-   [1歩踏み込んでみる！　CSSグラデーションのマニアックな世界](https://ics.media/entry/200212/)
-   [CSSで円グラフや集中線が描ける conic-gradient入門](https://ics.media/entry/18966/)

### 色の補間方法を比較

グラデーションの「補間方法」は大きく2種類に分類できます。見た目の印象を左右する重要なポイントです。

-   直交座標系の色空間での補間  
    例：`srgb`、`srgb-linear`、`display-p3`、`oklab`（既定）など
-   極座標（円筒座標）系の色空間での補間  
    例： `hsl`、`hwb`、`lch`、`oklch`

![](https://ics.media/entry/250829/images/images/250829_gradient_interpolation_gradation_color_space.png)

補間に用いる色空間は、 次のように`in 〇〇`で指定します。

```
.bg {
  background: linear-gradient(in hsl, red, blue);
}
```

※本記事では主に`linear-gradient()`関数を例に説明しますが、今回紹介する補間方法は、`radial-gradient()`や`conic-gradient()`、およびリピート系の`repeating-〇〇-gradient()`でも同様に指定できます。

以下は赤と青の2点を指定したグラデーションです。補間方法によって中間地点がいずれも異なる見た目となることがわかります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250829_gradient_interpolation/)
-   [コードを確認する](https://github.com/ics-creative/250829_gradient_interpolation/blob/main/index.html)

次の画像は、**赤と白の2点だけ**を指定したグラデーションですが、一番下のグラデーションに注目すると虹色がかった見た目となっています。極座標系の色空間であるHSLのグラデーションの補間方法が、いかに直線補間のグラデーションと異なるかが一目瞭然です。

▼ Chromeでの結果です（Safariでは異なる見た目となります※）。

![](https://ics.media/entry/250829/images/images/250829_gradient_interpolation_red_to_white.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250829_gradient_interpolation/interpolation-difference.html)
-   [コードを確認する](https://github.com/ics-creative/250829_gradient_interpolation/blob/main/interpolation-difference.html)

※ Chromeでは色相環を一周して虹色に見える`in hsl longer hue`の補間ですが、Safariでは赤ー薄い赤ー白のように直線的に補間されます。この違いは、片方の色が完全な無彩色（白や黒、グレー）の場合、その色のhue（色相）をどう扱うかという仕様解釈の差によるものと考えられます。回避策として、わずかにRGB値をずらしたほぼ白色（`#fffffe`など）を指定すると「無彩色」ではなくなるため、意図通り色相環に沿った補間が得られます。

補間方法によって異なる結果が得られることを体感いただいたところで、いくつかの色空間のグラデーションの特徴を見ていきましょう。

### 直交座標系の色空間

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250829_gradient_interpolation/rectangular-color-space.html)
-   [コードを確認する](https://github.com/ics-creative/250829_gradient_interpolation/blob/main/rectangular-color-space.html)

以下は直交座標系の色空間で、指定した場合は各成分を**線形（直線）に補間**します。

-   `srgb`, `srgb-linear`, `display-p3`, `oklab`（既定）など

#### sRGB色空間

色空間を省略した場合の既定値は`oklab`（後述）の補間ですが、`srgb`は一般的にもっとも目にすることが多いであろう補間方法です。

```
.gradationRect_srgb {
  background: linear-gradient(90deg in srgb, red, blue);
}
```

通常`in srgb`の指定を省略した、以下ような形が馴染み深いかもしれません。

-   名前色：`linear-gradient(red, blue)`
-   16進数表記：`linear-gradient(#ff0000, #0000ffff)`
-   `rgb()`関数：`linear-gradient(rgb(255 0 0), rgb(0 0 255 / 1))`
-   `hsl()`関数：`linear-gradient(hsl(0 100% 50%), hsl(240 100% 50% / 1)`

グラデーションに指定する「色」自体がレガシーな指定方法で構成されている場合、既定であるOklabの補間にはならずsRGBの補間となります。

**RGBの数値を直線的に補間**し、たとえば赤（255, 0, 0）から青（0, 0, 255）へのグラデーションの中間地点をカラーピックすると、R成分とB成分が半分の値になります。

赤

中間

青

R

255

127

0

G

0

0

0

B

0

127

255

#### Oklab色空間

`srgb`の補間で気になりやすい中間の濁りを抑えたいときに有効なのが、知覚均等なOklab色空間での補間です。

```
.gradationRect_oklab {
  background: linear-gradient(90deg in oklab, red, blue);

  /* color()関数のようなモダンな色指定だと、引数を省略しても同等の結果となる */
  /* background: linear-gradient(90deg, color(srgb 1 0 0 / 1), blue); */
}
```

`oklab`は、人の知覚に近い知覚均等な色空間で補間します。**中間色のくすみや不自然さが出にくく、より自然なグラデーションになりやすいのが特徴**です。赤（255, 0, 0）から青（0, 0, 255）へのグラデーションの中間地点をカラーピックすると、G成分が入り、sRGB色空間の補間よりも明るさが持ち上がっていることがわかります。

赤

中間

青

R

255

153

0

G

0

83

0

B

0

152

255

### 極座標・円筒座標系の色空間

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250829_gradient_interpolation/polar-color-space.html)
-   [コードを確認する](https://github.com/ics-creative/250829_gradient_interpolation/blob/main/polar-color-space.html)

極座標・円筒座標系の色空間は次の4種類があり、指定した場合は色相環に沿って**円弧状に補間**します。

-   `hsl`, `hwb`, `lch`, `oklch`

#### HSL色空間

色味の移り変わりを強調したい場面では、HSLでの補間が有効です。**色相環に沿って補間されるため、色鮮やかなグラデーションになりやすい**のが特徴です。

```
.gradationRect_hsl {
  background: linear-gradient(90deg in hsl, red, blue);
}
```

赤（255, 0, 0）から青（0, 0, 255）へのグラデーションの中間点は、色相環の中間（300°付近）であるマゼンタ（255, 0, 255）になります。HSL補間では「赤→マゼンタ→青」と色味がはっきりと変化します。

赤

中間（マゼンタ）※

青

R

255

255

0

G

0

0

0

B

0

255

255

※短い弧の補間

![hslの比較](https://ics.media/entry/250829/images/images/250829_gradient_interpolation_in_hsl.png)

#### 円弧の指定

極座標系の色空間の補間では、補間する弧を指定できます。

-   `shorter hue`: 短い弧（既定値）
-   `longer hue`: 長い弧
-   `increasing hue`: 時計回りの弧
-   `decreasing hue`: 反時計回りの弧

指定した色相が正反対など、弧の長さがまったく同じ場合、補間途中に360°を越えないような円弧の向きで補間されます。

たとえば `red` と `cyan` は色相がちょうど反対に位置しますが、黄色・緑側を通って補間されるため、`shorter hue`と`longer hue`はどちらを指定しても同じ見た目になります。

一方で、青・マゼンタ側を通るように補間したい場合は、`increasing hue`または`decreasing hue`を指定して円弧の向きを制御できます。

▲アニメーション中に2点の色相角が180°を越える場合、`longer hue`だと弧の向きが反転してパッと切り替わってしまうが、`increasing hue`は補間する方向を保つ。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250829_gradient_interpolation/hue-interpolation-difference.html)
-   [コードを確認する](https://github.com/ics-creative/250829_gradient_interpolation/blob/main/hue-interpolation-difference.html)

### TIPS: 虹色は1行

色相環を一周するように、赤（0°）から赤（360° ≒ 0°）の補間を`hsl`の「長い弧（`longer hue`）」で指定すると虹色が作れます。何色もの点が必要に見える「虹色」はなんと1行で実装できるのです。

```
.rainbow {
  background: linear-gradient(90deg in hsl longer hue, red, red);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250829_gradient_interpolation/rainbow-gradation.html)
-   [コードを確認する](https://github.com/ics-creative/250829_gradient_interpolation/blob/main/rainbow-gradation.html)

#### コラム：グラデーションの単色指定

グラデーション関数は単色の画像としても使えます。この性質を利用して、たとえば`mask-image`プロパティで単色の塗りつぶしを作るために、始点・終点を同じ色で指定する（例：`linear-gradient(black, black)`）手法がよく使われます。

実は単色の場合は、より短く書けます。2025年4月以降の主要モダンブラウザーでサポートがそろっています。

```
.circleRainbow {
  /* 省略 */
  
  /* 円形にくり抜く */
  mask-image: linear-gradient(black), radial-gradient(white 45%, transparent 45%);
}
```

![](https://ics.media/entry/250829/images/images/250829_gradient_interpolation_singlestop.png)

作例で使用しているマスク表現の実装方法については、記事『[mask-compositeでつくるCSSの新しい表現方法](https://ics.media/entry/241025/)』にて解説しています。

### 対応ブラウザー

補間方法の指定は、Chrome・Edge 111（2023年3月）、Safari 16.2（2022年12月）、Firefox 127（2024年6月）以降でサポートされています。

![](https://ics.media/entry/250829/images/images/250829_gradient_interpolation_gradation_support.png)

-   [“Hue interpolation method” | Can I use…](https://caniuse.com/?search=Hue%20interpolation%20method)

単色の省略記法は、Chrome・Edge 135（2025年4月）、Safari 18.4（2025年3月）、Firefox 136（2025年4月）以降でサポートされています。

![](https://ics.media/entry/250829/images/images/250829_gradient_interpolation_gradation_support_singlestop.png)

-   [types: `<gradient>`: `linear-gradient()`: Single color stop and 0-1 positions | Can I use…](https://caniuse.com/mdn-css_types_gradient_linear-gradient_single_color_stop)

### まとめ

本記事ではCSSグラデーションの基礎と補間方法の違いを整理しました。同じ配色でも「混ぜ方」が違えば結果は別物になります。sRGBの直線補間に加えOklabやHSLといった色空間を使い分けることで、中間色のくすみを抑え、美しいグラデーションができます。シーンに最適な「混ぜ方」を選び、グラデーションの表現力を最大化しましょう。

#### 参考

-   [CSS Color Module Level 4 - 12.1. Color Space for Interpolation](https://www.w3.org/TR/css-color-4/#interpolation-space)
-   [linear-gradient()](https://developer.mozilla.org/ja/docs/Web/CSS/gradient/linear-gradient)
-   [What are OKLCH colors?](https://jakub.kr/components/oklch-colors)