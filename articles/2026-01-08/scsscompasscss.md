---
title: "SCSSとCompassでおしゃれなCSSパーティクルを作ってみた"
source: "https://ics.media/entry/1808/"
publishedDate: "2014-08-28"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

Webサイトを構築する際、角丸、グラデーション、アニメーション等、従来では画像やプログラミング言語を使わないと不可能だったデザイン表現が、CSS3を使うことで可能となりました。さらに、CSSの拡張言語であるSCSSや、SCSSのフレームワークであるCompassと組み合わせると、CSSによる表現の幅が広がります。今回は、**CSSのみでのデザイン表現**をテーマとし、SCSSやCompassの便利な機能を活用した幾何学模様の作り方をご紹介します。

-   [別画面でデモを再生する](https://ics-creative.github.io/140828_css_particle/index.html)
-   [ソースコード(SCSS)](https://github.com/ics-creative/140828_css_particle/blob/master/css/index.scss)

### なぜSCSSやCompassを使うのか

[![](https://ics.media/entry/1808/images/sass2_retina.png)](https://ics.media/entry/1808/images/sass2_retina.png)

プログラミングを使って図形を描く場合、基本的な**四則演算**や**三角関数**といった数学的な処理や、**繰り返し文**（for文）、**条件分岐**（if文）等が扱えると便利です。しかし、CSSではcalc()メソッドを使った簡易な計算しかできず、繰り返し文や条件分岐等は実装されておりません。SCSSやCompassは、これらの処理を扱う為のAPIが用意されているので、図形の描画処理が手軽になります。SCSSやCompassのインストールおよび設定は以下のようなサイトを参考にするとわかりやすいでしょう。

-   [Macのターミナルから SCSS + Compass をインストールして使うまでの簡単な手順メモ | memobits](http://m.designbits.jp/13032511/)

以下、SCSSおよびCompassを使える環境が整っているものとして話を進めていきます。

### STEP1. CSSで模様を描く手順

-   [ソースコード(CSS)](https://github.com/ics-creative/140828_css_particle/blob/master/css/1_points.css)

本デモでは、複数の点を並べることで、模様を描くこととします。HTMLにliタグを複数定義し、**各々のliタグを1つの点とみなし**、スタイルを設定します。

```
<!--HTMLコード-->
<ul>
 <li></li>
 <li></li>
 <li></li>
 <li></li>
</ul>
```

たとえば、画面上に3つの点を斜めに並べたい時、liタグのスタイルを、:nth-child()疑似クラスとtransform()メソッドのtranslate値を使用して、以下のように設定することで可能です。CSSは以下のようなコードです。

```
/* CSSコード */
li:nth-child(1) {
  /* 1つ目の点 */
     transform: translate(
    0px,
    0px
  ); /* 横0px,縦0pxの位置に配置 */
}
li:nth-child(2) {
  /* 2つ目の点 */
     transform: translate(
    100px,
    100px
  ); /* 横100px,縦100pxの位置に配置 */
}
li:nth-child(3) {
  /* 3つ目の点 */
     transform: translate(200px, 200px);
}
```

### STEP2. 直線上に点を配置する

-   [ソースコード(SCSS)](https://github.com/ics-creative/140828_css_particle/blob/master/css/2_line.scss)

STEP1の点を100個に増やすと、直線のような図形が描画されます。100回の繰り返し処理を手動で行うのは煩わしいので、繰り返し処理のfor文を使います。Compassにおける変数の定義は以下のように行います。

```
$x:3 // x=3
```

変数$iを1から10まで1ずつ増加させて繰り返し処理を行うには、以下のように記述します。繰り返し処理内で、変数をセレクター名に使いたいときは、#{$i}という記述をします（インターポレーション）。

```
@for $i from 1 through 10 {
 // 繰り返し処理の内容
}
```

Compassで前述のtransform()のtranslate値を扱う場合、以下のような記述で可能です。

```
// $x:横方向の移動距離
// $y:縦方向の移動距離
@include translate($x, $y);
```

これを使って、直線上に点を描くには、SCSSで以下のように表されます。

```
// SCSSのコード
li {
  @for $t from 1 through 100 {
    &:nth-child(#{$t}) { // :&で親要素（li）を参照
      $x: $t + px;
      $y: $t + px;
      @include translate($x, $y); // $x,$yの位置に点をプロット
    }
  }
}
```

これをコンパイルすると、以下の様なCSSが書き出されます。

```
/* CSSコード */
li:nth-child(1) {
   -moz-transform: translate(1px, 1px);
   -ms-transform: translate(1px, 1px);
   -webkit-transform: translate(1px, 1px);
   transform: translate(1px, 1px);
}
li:nth-child(2) {
   -moz-transform: translate(2px, 2px);
   -ms-transform: translate(2px, 2px);
   -webkit-transform: translate(2px, 2px);
   transform: translate(2px, 2px);
}

// -------------(中略)------------------

li:nth-child(100) {
   -moz-transform: translate(100px, 100px);
   -ms-transform: translate(100px, 100px);
   -webkit-transform: translate(100px, 100px);
   transform: translate(100px, 100px);
}
```

### STEP3. 円周上に点を配置する

-   [ソースコード(SCSS)](https://github.com/ics-creative/140828_css_particle/blob/master/css/3_circle.scss)

円周上の点のX座標、Y座標は、半径をr、角度をθとして、以下のように記述されます。

```
x = r \* cosθ  
y = r \* sinθ  
```

SCSS、Compassでは、以下のような数学処理が使用できます。

```

// SCSS
$a + $b // 和算
$a - $b // 減算
$a * $b // 乗算
$a / $b // 除算

// Compass
pi() //円周率
sin($rad) // 正弦関数
cos($rad) // 余弦関数
```

これを使って、円周上に点を描くには以下のように記述します。

```
// SCSSコード
li {
  $r: 100; //円の半径
  @for $t from 1 through 100 {
    &:nth-child(#{$t}) {
      // 100個の点でちょうど360度分の円がプロットされるように
      // 回転角$angleを動かす
      $angle: (360 / 100) * (pi() / 180) * $t;
      $x: $r * cos($angle) + px;
      $y: $r * sin($angle) + px;
      @include translate($x, $y); // $x,$yの位置に点をプロット
    }
  }
}
```

### STEP4. より複雑な曲線を描く

-   [ソースコード(SCSS)](https://github.com/ics-creative/140828_css_particle/blob/master/css/4_figure.scss)

三角関数や対数関数、指数関数などを使用すると、より複雑な曲線を描くことが可能です。Compassでは、それらの関数を算出するAPIも備わっています。

-   [Compass Math Helpers](http://compass-style.org/reference/compass/helpers/math/)

本デモは、螺旋状の曲線、[ハイポトロコイド曲線](http://ja.wikipedia.org/wiki/%E3%83%88%E3%83%AD%E3%82%B3%E3%82%A4%E3%83%89)を2つ、矩形を並べた図形をそれぞれ作成してます。たとえば、ハイポロイド曲線は上記のような描画結果となります。各々の図形は、親要素（div#mathBox）のクラスを切り替えることで配置が変わるようにしました。

#### animationプロパティもCompassを使うと楽になる

-   [ソースコード(SCSS)](https://github.com/ics-creative/140828_css_particle/blob/master/css/5_animation.scss)

CSS3で実装されたanimation()メソッドは、任意のキーフレームで設定されたスタイルを徐々に変化させることができます。今回は、HSL色空間において彩度と明度を固定し色相だけを周期的に変化させるアニメーションを作り、それを点の背景色とします。その為には、0%から100%までを25%刻みでスタイルを設定し、キーフレーム間を制御する必要があり、**Compassの繰り返し処理**を使うと便利です。

```
// SCSSコード
li {
 animation: colorAnimation 4s linear infinite;
}

@keyframes colorAnimation {
  // キーフレームの長さ-1
  $keyFrameLength:4;
  @for $i from 0 through $keyFrameLength {
    // 0%, 25%, 50%,.. と25%ごとにキーフレームを設定。
    // キーフレームはインターポレーションを使う。
    #{(100 / $keyFrameLength) * $i + "%"} {
      $h: (360 / $keyFrameLength) * $i;
      // 色相:$h(度), 彩度:100(%), 輝度:68(%)の色を設定
      $color: hsl($h, 100, 68);
      background-color: $color;
    }
  }
}
```

#### ベンダープレフィックスの制御

Compassでtranslate()等を使ってCSS3のメソッドを記述すると、ほぼすべてのベンダープレフィックスが自動で付与されます。対象ブラウザ次第では不要なベンダープレフィックスは削除しておいたほうがよいでしょう。自動で付与されるベンダープレフィックスをすべて削除するには、$supported-browsersとreject()を使って以下のような設定をします。

```
// SCSSコード
$supported-browsers: reject(browsers(),
 android,
 blackberry,
 chrome,
 android-chrome,
 firefox,
 android-firefox,
 ie,
 ie-mobile,
 safari,
 ios-safari,
 opera,
 opera-mini,
 opera-mobile
);
```

animation周り等の処理は、Webkit系の最新ブラウザ（執筆段階）でもベンダープレフィックスがないと動きません。したがって、本デモでは、Google Chrome、Safariの為のベンダープレフィックスは付与するように設定しました。

### 最後に

モダンブラウザではHTML5、CSS3の対応も進んでおり、一般的なWebサイト上でCSSの表現を使用するシーンが増えるかと思います。SCSSやCompassを使用すると、**CSSの記述が劇的に便利**になり、**表現のブラッシュアップに注力**できるようになります。みなさんもSCSSやCompassを使った快適なCSSコーディングを試してみませんか？