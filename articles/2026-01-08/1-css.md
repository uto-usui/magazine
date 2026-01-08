---
title: "1歩踏み込んでみる！　CSSグラデーションのマニアックな世界"
source: "https://ics.media/entry/200212/"
publishedDate: "2020-02-12"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

CSSでグラデーションがかけられるようになって久しいですが、ただ2色をつないでいるだけの人も多いのではないでしょうか？　あるいはジェネレーターでコピペして終わりにしてはいないでしょうか？

実は、値を細く設定することで、グラデーションに留まらない、より豊かな表現を実現できます。工夫すればこんな表現もCSSのみで行えます。

![色々組み合わせてみたアニメーション](https://ics.media/entry/200212/images/css_gradient25.gif)

後半の応用例の実装は手入力のCSSでは困難な部分もあるので、SCSSを使って記述しています。SCSSを使うとCSSだけでは難しい処理もスムーズに行え、mixin機能を使えば、面倒な入力手間も省けるので便利です。記事内で紹介しているグラデーションの生成mixinも用意しました。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200212_css_gradient/)
-   [使われているmixinを確認する](https://github.com/ics-creative/200212_css_gradient/blob/master/gradient-mixin.scss)

### CSSグラデーションの種類

CSSグラデーションは色を扱うので`background-color`プロパティを使いたくなりますが、`background-image`の値になります。さらに、グラデーションの形によって以下の6つの値があります。

-   `linear-gradient()` ：線形グラデーション
-   `repeating-linear-gradient()` ：繰り返し線形グラデーション
-   `radial-gradient()` ：放射グラデーション
-   `repeating-radial-gradient()` ：繰り返し放射グラデーション
-   `conic-gradient()` ：扇形グラデーション
-   `repeating-conic-gradient()` ：繰り返し扇形グラデーション

このうち、`conic-gradient()` 、`repeating-conic-gradient()`以外はモダンブラウザなら使用できます。扇形グラデーションについては2020年2月現在、Google ChromeとSafari、およびEdge 79以降のみの対応になっています。

今回は線形グラデーションと放射グラデーションについて解説します。`conic-gradient()`に関しては記事『[Chromeの最新機能が楽しいぞ! CSSで円グラフや集中線が描けるconic-gradient入門](https://ics.media/entry/18966/)』に詳しく書かれています。

### CSSグラデーションの基本的な書き方

一番シンプルな書き方は2色を指定する方法です。

```
background-image: linear-gradient(#f4c14e, #d36950);
```

![2色指定の線形グラデーション](https://ics.media/entry/200212/images/css_gradient0.png)

色を追加することでその色を経由したグラデーションができます。

```
background-image: linear-gradient(#6fb8d9, #f4c14e, #d36950);
```

![2色指定の線形グラデーション](https://ics.media/entry/200212/images/css_gradient1.png)

青から黄色、そしてオレンジへと変化します。ここでのポイントは、**指定した色は均等に分布し、変化は直線的**（2色の距離の中間点が2色の中間色）に変化するということです。

### 経由点を指定する

経由点を指定することで色の分布の具合を変えられます。具体的には色の後ろに%もしくはpxを指定します。

```
background-image: linear-gradient(#6fb8d9 50%, #f4c14e 80%, #d36950 90%);
```

![3色で経由点を指定した線形グラデーション](https://ics.media/entry/200212/images/css_gradient2.png)

上記のように指定すると、上から`0%〜50%`の位置までは青、`80%`位置に黄色、`90%〜100%`がオレンジという具合です。

![3色で経由点を指定した線形グラデーション](https://ics.media/entry/200212/images/css_gradient3.png)

さらに経由点は開始位置と終了位置を指定できるので、帯状のグラデーションも可能です。

```
background-image: linear-gradient(#6fb8d9 0% 30%, #f4c14e 40% 70%, #d36950 80% 100%);
```

![3色で経由点を指定し、ベタ塗りのある線形グラデーション](https://ics.media/entry/200212/images/css_gradient4.png)

このように指定すると`0%〜30%`、`40%〜70%`、`80%〜100%`の部分はベタ塗りになり、`30%〜40%`、`70%〜80%`の部分でグラデーションになります。これを応用してグラデーション部分をなくすと、しましま模様ができあがります。

```
background-image: linear-gradient(#6fb8d9 0% 30%, #f4c14e 30% 70%, #d36950 70% 100%);
```

![3色で経由点を指定し、縞模様の線形グラデーション](https://ics.media/entry/200212/images/css_gradient5.png)

以上が線形・放射グラデーションに共通する記法です。ここからは線形・放射グラデーション個別の記法について解説します。

### 線形グラデーションの角度

線形グラデーションの場合、先頭にグラデーションの方向（角度）を渡すことで、グラデーションの向きを変えられます。

```
 background-image: linear-gradient(45deg, #f4c14e, #d36950);
```

![45度の角度2色線形グラデーション](https://ics.media/entry/200212/images/css_gradient6.png)

`45deg`を与えると左下から右上へ45度の角度で黄色からオレンジへグラデーションしています。デフォルト値は180度になります。度数指定の他にキーワード指定（`to bottom` `to top` `to left` `to right`といった文字）でも定められます。

### 放射グラデーションの形と開始位置

放射グラデーションは角度ではなく、グラデーションの形状を指定できます。とくに指定のない場合は要素の矩形に合わせた楕円形のグラデーションになります。（グラデーションの形状が分かりやすいよう経由点を追加しています）

```
background-image: radial-gradient(#f4c14e 0% 40%, #d36950 60% 100%);
```

![楕円形の放射グラデーション](https://ics.media/entry/200212/images/css_gradient7.png)

デフォルトのキーワード値は`ellipse`です。グラデーションの形状を正円にするには`circle`のキーワードを頭にいれます。

```
background-image: radial-gradient(circle, #f4c14e 0% 40%, #d36950 60% 100%);
```

![正円の放射グラデーション](https://ics.media/entry/200212/images/css_gradient8.png)

これでグラデーションの形状は正円になりました。さらに`at x座標 y座標`という構文で形状のキーワードの後ろに挿入することで開始位置も指定できます。

```
background-image: radial-gradient(circle at 100px 200px, #f4c14e 0% 40%, #d36950 60% 100%);
```

![開始位置をずらしたとしたグラデーション](https://ics.media/entry/200212/images/css_gradient9.png)

開始位置を変更したら、円が大きくなって見切れてしまっています。これはデフォルトでは**円の中心から一番遠い頂点を基準にグラデーションの変化具合を決めている**からです。上記の例だと、長方形の右下の頂点が`100%`の値になります。

![右下の頂点を基準としたグラデーション変化具合の図](https://ics.media/entry/200212/images/css_gradient10.png)

この`100%`になる部分を指定するキーワードが4つあります。そのキーワードを形状の後に挿入することで変更できます。最寄りの辺を終端とするキーワード、`closest-side`を使うと次のようになります。

```
background-image: radial-gradient(circle closest-side at 100px 200px, #f4c14e 0% 40%, #d36950 60% 100%);
```

![右下の頂点を基準としたグラデーション変化具合の図](https://ics.media/entry/200212/images/css_gradient11.png)

終端指定に使えるキーワードは下記の4つです。

-   `closest-side` ：中心から一番近い辺（ellipseの場合は縦と横の辺）を終端にする
-   `closest-corner` ：中心から一番近い頂点を終端にする
-   `farthest-side` ：中心から一番遠い辺（ellipseの場合は縦と横の辺）を終端にする
-   `farthest-corner` ：中心から一番遠い頂点を終端にする（デフォルト値）

各キーワードを図にすると下記のようになります。

![closest-side,closest-cornerのイメージ図](https://ics.media/entry/200212/images/css_gradient12.png)

![farthest-side,farthest-cornerのイメージ図](https://ics.media/entry/200212/images/css_gradient13.png)

放射グラデーションの構文は少し複雑ですが、以下のようになります。

```
background-image: radial-gradient(形状 終端を決めるキーワード at x座標 y座標, 色の経由点);
```

### 繰り返しグラデーション

cssのグラデーションには繰り返しグラデーションもあります。`repeating-linear-gradient()`と`repeating-radial-gradient()`です。引数は基本的な線形・放射グラデーションと同じですが、経由点を無限に繰り返して埋める、という違いがあります。

```
background-image: repeating-linear-gradient(#f4c14e 0%, #d36950 50%);
```

![繰り返し線形グラデーションの図](https://ics.media/entry/200212/images/css_gradient14.png)

上記の例だと`50%`のところまでしか経由点を指定していませんが、その先もグラデーションを繰り返して埋めてくれます。（基本的な`linear-gradient()`の場合`50%`以降はオレンジ一色になる）

`repeating-radial-gradient()`も同様です。さきほどのを繰り返しにすると、

```
background-image: repeating-radial-gradient(circle closest-side at 100px 200px, #f4c14e, #d36950);
```

![繰り返し放射グラデーションの図](https://ics.media/entry/200212/images/css_gradient15.png)

`closest-side`を指定しているので、一番近い左の辺まででグラデーションの1周期になります。同じグラデーションが同心円状に広がっていきます。

経由点の値を変えることで繰り返しの頻度を調整できます。はじめに紹介したベタ塗り指定方法を使うことでストライプ模様もできます。

```
background-image: repeating-linear-gradient(45deg, #f4c14e 0%　10%,　transparent 10% 20%);
```

![ストライプ模様のグラデーションの図](https://ics.media/entry/200212/images/css_gradient16.png)

### 複数グラデーションも指定できる

CSSグラデーション自体の設定ではありませんが、background-imageプロパティは複数の値をカンマ区切りで指定できます。それを利用して次のような模様もできます。

```
background-image: radial-gradient(circle closest-side, white 0% 65%, transparent 65% 100%), repeating-linear-gradient(90deg, #f4c14e 0 4.8%, transparent 4.8% 9.6%);
```

![ストライプに真ん中白抜きの図](https://ics.media/entry/200212/images/css_gradient17.png)

### 関数曲線を用いたCSSグラデーション

これらCSSグラデーションの性質を踏まえた上で、ここからは応用編です。経由点の具合を関数の曲線を用いることで規則的に変化するグラデーションができます。正確には、`gradient`の2色間の変化は直線的なので、曲線を多数の直線で近似する形になります。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200212_css_gradient/)
-   [使われているmixinを確認する](https://github.com/ics-creative/200212_css_gradient/blob/master/gradient-mixin.scss)

### クロソイド曲線をつかった透過グラデーション

クロソイド曲線はざっくり言うと直線と曲線を柔らかくつなぐ曲線です。その特性上、高速道路のインターチェンジのループにも使わています。なだらかに直線から曲線に移行することで、急なハンドル操作をせずに済むのです。これをグラデーションに応用すると**目的の色になだらかに変化**します。

![クロソイド曲線の変化具合のグラフ](https://ics.media/entry/200212/images/css_gradient_clothoid_graph.png)

たとえば、無色から透過度を上げて黒色につなぐとき、通常のグラデーションだと最後まで灰色っぽく、最後の部分でようやく黒くなるように感じます。しかし、クロソイド曲線を使うと自然と黒色に変化しているようになります。

![通常のグラデーションとクロソイド曲線のグラデーションを比較した図](https://ics.media/entry/200212/images/css_gradient18.png)

上記のクロソイドグラデーションをCSSで表すと、次のようになります。

```
background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.595) 50%, rgba(0, 0, 0, 0.7225) 65%, rgba(0, 0, 0, 0.78625) 75.5%, rgba(0, 0, 0, 0.81855) 82.85%, rgba(0, 0, 0, 0.83385) 88%, rgba(0, 0, 0, 0.85)); }
```

今回は透過度`0`から`0.85`までの変化ですが、値を細かく設定することでクロソイド曲線を表現できます。

しかし、こんな複雑なのを毎回書くのは面倒なので、sassのmixinを用意しました。

```
@mixin clothoid-linear-gradient(
  $angle: to bottom,
  $color-start: #000000,
  $color-end: #ffffff,
  $start-point: 0
) {
  background-image: linear-gradient(
    $angle,
    $color-start 0 $start-point * 100%,
    mix($color-end, $color-start, 70%) $start-point * 100% + (1 - $start-point) *
      50%,
    mix($color-end, $color-start, 85%) $start-point * 100% + (1 - $start-point) *
      65%,
    mix($color-end, $color-start, 92.5%) $start-point * 100% +
      (1 - $start-point) * 75.5%,
    mix($color-end, $color-start, 96.3%) $start-point * 100% +
      (1 - $start-point) * 82.85%,
    mix($color-end, $color-start, 98.1%) $start-point * 100% +
      (1 - $start-point) * 88%,
    $color-end
  );
}
```

使用する時は`$color-start`と`$color-end`に色を指定すればOKです。

```
@include mixin.clothoid-linear-gradient($color-start: rgba(0,0,0,0), $color-end: rgba(0,0,0,0.85));
```

-   [使われているmixinを確認する](https://github.com/ics-creative/200212_css_gradient/blob/master/gradient-mixin.scss)

### 三角関数をつかったグラデーション

高校数学の鬼門（？）三角関数を使ったグラデーションも紹介します。三角関数の曲線、とくにサインカーブは波の曲線として知られています。関数の特性上、最初はなだらなかに変化し、真ん中で変化率が急になり、最後はまたなだらかになります。周期性のある関数なので、再び戻るような（=ループできる）変化曲線です。

![クロソイド曲線の変化具合のグラフ](https://ics.media/entry/200212/images/css_gradient_sine_graph.png)

これをグラデーションに応用すると波打つような模様が描けます。

![波打つグラデーションの図](https://ics.media/entry/200212/images/css_gradient19.png)

こちらも頑張ってCSSで書くと下記のようになります。

```
background-image: repeating-radial-gradient(circle at center, #6fb8d9, #70b9da 1.25%, #73bcdd 2.5%, #78c0e1 3.75%, #7fc6e6 5%, #86cdec 6.25%, #8cd3f2 7.5%, #93d9f7 8.75%, #98ddfb 10%, #9be0fe 11.25%, #9ce1ff 12.5%, #9be0fe 13.75%, #98ddfb 15%, #93d9f7 16.25%, #8cd3f2 17.5%, #86cdec 18.75%, #7fc6e6 20%, #78c0e1 21.25%, #73bcdd 22.5%, #70b9da 23.75%, #6fb8d9 25%); 
```

もはや人力で書くのは困難なので、こちらもmixinを用意しました。

```
@mixin repeating-sine-radial-gradient(
  $position: circle at center,
  $color-start: #000000,
  $color-end: #ffffff,
  $repetition: 1
) {
  background-image: repeating-radial-gradient(
    $position,
    $color-start,
    mix($color-end, $color-start, 2.4%) calc(100 / $repetition) * 0.05%,
    mix($color-end, $color-start, 9.5%) calc(100 / $repetition) * 0.1%,
    mix($color-end, $color-start, 20.6%) calc(100 / $repetition) * 0.15%,
    mix($color-end, $color-start, 34.5%) calc(100 / $repetition) * 0.2%,
    mix($color-end, $color-start, 50%) calc(100 / $repetition) * 0.25%,
    mix($color-end, $color-start, 65.5%) calc(100 / $repetition) * 0.3%,
    mix($color-end, $color-start, 79.4%) calc(100 / $repetition) * 0.35%,
    mix($color-end, $color-start, 90.5%) calc(100 / $repetition) * 0.4%,
    mix($color-end, $color-start, 97.6%) calc(100 / $repetition) * 0.45%,
    $color-end calc(100 / $repetition) * 0.5%,
    mix($color-end, $color-start, 97.6%) calc(100 / $repetition) * 0.55%,
    mix($color-end, $color-start, 90.5%) calc(100 / $repetition) * 0.6%,
    mix($color-end, $color-start, 79.4%) calc(100 / $repetition) * 0.65%,
    mix($color-end, $color-start, 65.5%) calc(100 / $repetition) * 0.7%,
    mix($color-end, $color-start, 50%) calc(100 / $repetition) * 0.75%,
    mix($color-end, $color-start, 34.5%) calc(100 / $repetition) * 0.8%,
    mix($color-end, $color-start, 20.6%) calc(100 / $repetition) * 0.85%,
    mix($color-end, $color-start, 9.5%) calc(100 / $repetition) * 0.9%,
    mix($color-end, $color-start, 2.4%) calc(100 / $repetition) * 0.95%,
    $color-start calc(100 / $repetition) * 1%
  );
}
```

こちらも使う2色と繰り返し回数を指定すれば使えます。

```
@include mixin.repeating-sine-radial-gradient($color-start: #6fb8d9, $color-end: #9ce1ff, $repetition: 4);
```

クロソイド曲線、三角関数の曲線を利用した線形グラデーション・放射グラデーションのmixinは下記にまとめています。importして使うと便利でしょう。

[使われているmixinを確認する](https://github.com/ics-creative/200212_css_gradient/blob/master/gradient-mixin.scss)

### 工夫すればもっと多彩な表現もできます

**市松模様**

変化具合を変えることでおもしろいグラデーションを実装できましたが、CSSの他のプロパティと組み合わせると、さらに多彩な表現も可能です。たとえば、背景画像のブレンド具合を設定できる、`background-blend-mode`を使えばこんなこともできます。

```
background-image: 
  repeating-linear-gradient(90deg, black 0 48px, white 48px 96px),
  repeating-linear-gradient(180deg, white 0 48px, black 48px 96px);
background-blend-mode:difference;
```

![市松模様の図](https://ics.media/entry/200212/images/css_gradient20.png)

**周辺露光**

他にもクロソイド曲線の放射グラデーションと`mix-blende-mode`を使って周辺露光を表現してみたり、

```
mix-blend-mode: multiply;
@include mixin.reverse-clothoid-radial-gradient(
  $position: circle closest-corner,
  $color-start: rgba(105, 75, 54, 0),
  $color-end: rgba(105, 75, 54, 0.8),
  $start-point: 0.75
);
```

![周辺露光](https://ics.media/entry/200212/images/css_gradient21.png)

**有名ブランドのチェック**

かなり複雑になりますが、複数のグラデーションを組み合わせれば、有名ブランドのチェック模様も再現できます。

![周辺露光](https://ics.media/entry/200212/images/css_gradient22.png)

**波紋のアニメーション**

アニメーションと組み合わせてもおもしろいです。三角関数は波の形状なので広がる波紋も表現できます。

![波紋のアニメーション](https://ics.media/entry/200212/images/css_gradient23.gif)

**ストライプのアニメーション**

`mask-image`を使ってストライプをアニメーションさせています。

![ストライプのアニメーション](https://ics.media/entry/200212/images/css_gradient24.gif)

**色々組み合わせてみたアニメーション**

`mix-blend-mode`、`mask-image`、`animation`を組み合わせたら、こんなこともできます。

![色々組み合わせてみたアニメーション](https://ics.media/entry/200212/images/css_gradient25.gif)

### まとめ

応用例にあげたように、CSSグラデーションは**グラデーション**と名前がついていますが、その応用範囲はグラデーションにおさまりません。仕様を理解して活用することで豊かな表現を生み出せるツールになります。以下の記事も合わせて読むとより深みが増すでしょう。

-   『[Chromeの最新機能が楽しいぞ! CSSで円グラフや集中線が描けるconic-gradient入門](https://ics.media/entry/18966/)』
-   『[アニメーションをデザインしよう！ 知っておきたいCSSイージングのお手本](https://ics.media/entry/18730/)』
-   『[CSS Filtersはトランジションで使うのがお勧め！手軽に実装するいい感じのマウスオーバー演出](https://ics.media/entry/15393/)』
-   『[CSS3のブレンドモードが素敵！ 新プロパティmix-blend-modeを使いこなそう](https://ics.media/entry/7258/)』