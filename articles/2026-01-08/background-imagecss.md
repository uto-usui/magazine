---
title: "background-imageを使ったCSSのアニメーションテクニック"
source: "https://ics.media/entry/220602/"
publishedDate: "2022-06-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

CSSの`background-image`プロパティは背景画像に関するCSSですが、単に背景に画像を表示させるだけでなく、実はアニメーションと組み合わせて多彩な表現ができます。本記事では`background-image`の特性を活かしたアニメーション表現について解説します。

![background-imageを活用したアニメーション表現事例集](https://ics.media/entry/220602/images/220602_examples.gif)

サンプルコードもありますので、実際の案件に取り入れてみたり`background-image`の仕組みについて学んでみたりしてください。※サンプルコードはSass（SCSS）を使用しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220601_background-image-technique/)
-   [コードを確認する](https://github.com/ics-creative/220601_background-image-technique/tree/main/src)

### background-imageとアニメーション

タイトルと矛盾するようですが、`background-image`プロパティ自体は`animation`プロパティや`transition`プロパティを用いてアニメーションできません。もし`background-image`プロパティをアニメーション可能にしたい場合はJavaScriptによって動的に変更させる必要があります。その手法については[『Canvasだけじゃない！ requestAnimationFrameを使った アニメーション表現』](https://ics.media/entry/210414/)で解説しています。

では、どうやって動かすかというと、`background-position`プロパティによって画像位置を動かせます。`background-image`プロパティの画像と`background-position`プロパティの位置、その他のプロパティを工夫することで表現豊かなアニメーションにします。

では、具体的な作例を見ていきます。

### トグルボタン

トグルボタンはなにかの状態を表すときに使うUIです。ボタンの画像を横に移動させることでこのUIを簡単に実現できます。

![トグルボタンの動き方](https://ics.media/entry/220602/images/220602_toggle.gif)

```
<input type="checkbox" class="toggleButton" />
```

```
.toggleButton {
  width: 48px;
  height: 24px;
  cursor: pointer;
  background-color: #ddd;
  background-image: url("./images/toggle_button.png");
  background-repeat: no-repeat;
  background-position: top 2px left 2px;
  background-size: 20px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 10%) inset;
  transition: background-position 0.4s cubic-bezier(0.65, 0, 0.35, 1),
    background-color 0.4s cubic-bezier(0.65, 0, 0.35, 1)
      /* easeInOutCubicのイージング */;
  appearance: none;
}

.toggleButton:checked {
  background-color: #4ac65f;
  background-position: top 2px right 2px;
}
```

チェックボックス要素のデフォルトスタイルを`appearance: none`などで消したのち、楕円形の枠と灰色の背景色、そしてボタンを模した丸い画像を左上から`2px`のところに配置します。また、`background-position`と`background-color`に`transition`プロパティを設定し、アニメーション可能にしておきます。

チェックが入った場合は背景色を緑色（`#4ac65f`）に変更し、丸画像を右上`2px`の位置に移動させます。これでクリックで状態が変わるトグルボタンのできあがりです。

### ホバーで色が横から変わる文字

ホバーで単純に文字色を変えるには`transition`プロパティと`color`プロパティで済みますが、左から右に色が変わる表現は`background-image`と`background-clip`プロパティで実現できます。

![ホバーで色が横から変わる文字の動き](https://ics.media/entry/220602/images/220602_hover.gif)

コードは以下のようになっています。

```
<p class="slideColor">メロスは激怒した。</p>
```

```
.slideColor {
  display: inline-block;
  color: transparent;
  background-image: linear-gradient(90deg, red, red 50%, black 50%, black);
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 200% 100%;
  transition: background-position 0.4s cubic-bezier(0.25, 1, 0.5, 1); /* easeOutQuartのイージング */
}
.slideColor:hover {
  background-position: 0 0;
}
```

仕組みを解説します。まず、赤と黒が半分ずつの背景画像を`linear-gradient()`関数で作ります。`linear-gradient()`関数については[『1歩踏み込んでみる！　CSSグラデーションのマニアックな世界』](https://ics.media/entry/200212/)で詳しく解説しているのでこちらも参考にしてください。

この背景を`background-size`プロパティで要素の2倍の長さにします。デフォルト位置は`background-position: 100% 0`で半分右にずれた位置に設定し、ホバー時は`background-position: 0 0`で元に位置に戻します。この`background-position`を`transition`でアニメーションさせることで、左から右へ背景が移動します。これをさらに`background-clip: text`で文字で背景を画像をクリップするという指定をすると、左から右へ色が変わったような表現になります。

![文字色が変わる動きの図解](https://ics.media/entry/220602/images/220602_text.png)

なお、Google Chromeなどのブラウザは`background-clip`プロパティは**ベンダープレフィックスつきでないと動作しない**ので、忘れずにつけてください。

### スクロールを促す線の動き

画面全体を1枚絵で見せた場合、下にコンテンツがあることを示すためにスクロールを促すUIを設置することがあります。下へ促す線の動きも`background-image`プロパティを使って作れます。

![スクロールを促す線の動き](https://ics.media/entry/220602/images/220602_scroll_down.gif)

```
<span class="scrollDown"></span>
```

```
.scrollDown {
  display: block;
  width: 1px;
  height: 24px;
  background-image: linear-gradient(
    -180deg,
    transparent,
    black 50%,
    transparent 50%,
    transparent
  );
  background-repeat: no-repeat;
  background-size: 100% 200%;
  animation-name: scroll-down;
  animation-duration: 2s;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); /* easeOutQuintのイージング */
  animation-delay: 0.7s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}

@keyframes scroll-down {
  0% {
    background-position: 0 100%;
  }

  50% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -100%;
  }
}
```

※アニメーションに直接関係しないクラス名などは省いています

基本的な考え方はさきほどのホバーで色が変わるものと同じです。上半分までグラデーション、下半分は透明な背景を作り、`@keyframe`ルールを用いて上から下へ移動させています。今回は下に突き抜けたいので、アニメーションの終わりは`-100%`の位置まで移動しています。デモはグラデーションを`linear-gradient()`関数で作っていますが、画像で用意しても問題ないです。

![スクロールを促す動きの図解](https://ics.media/entry/220602/images/220602_scroll.png)

その際は表示長さの2倍（今回であれば、48px）必要になります。画像だと好きな模様でスクロールを促すアイコンができます。

これを横にすればローディングバーも作れます。こちらは、グラデーションではなく紫ベタを作っています。

![ローディングバーの動き](https://ics.media/entry/220602/images/220602_loading.gif)

```
<div class="loadingBar"></div>
```

```
.loadingBar {
  width: 300px;
  height: 10px;
  background-image: linear-gradient(
    90deg,
    #f3f3f3,
    #f3f3f3 50%,
    #8750d6 50%,
    #8750d6
  );
  background-size: 200%, 100%;
  border-radius: 5px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 15%);
  animation-name: loading-bar;
  animation-duration: 1.4s;
  animation-timing-function: cubic-bezier(0.83, 0, 0.17, 1); /* easeInOutQuintのイージング */
  animation-iteration-count: infinite;
}

@keyframes loading-bar {
  0% {
    background-position: 100% 0;
  }

  50% {
    background-position: 0% 0;
  }

  100% {
    background-position: -100% 0;
  }
}
```

同じ手法を用いて、通信が終わるまで表示させる**スケルトンスクリーン**への応用も可能です。

![スケルトンスクリーンの動き](https://ics.media/entry/220602/images/220602_skeleton.gif)

```
<span class="skeletonElement"></span>
```

```
.skeletonElement {
  background-image: linear-gradient(90deg, #eee 0, #f3f3f3 10%, #f3f3f3 20%, #eee 30%);
  background-size: 400px 100%;
  animation-name: skeleton;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes skeleton {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 800px 0;
  }
}
```

いずれも背景を縦や横に動かしているだけですが、イージングや画像を調整することでさまざまな表現が可能です。

### パラパラマンガのような動き

アニメーションのイージングや動き方に関する`animation-timing-function`の値には`step()`関数が使えます。通常は連続的な動きですが、`step()`関数を使うと指定した値で分割された動き、カクカクしたような動きが可能です。

この`step()`関数とスプライト画像（複数の画像を1つにまとめたもの）を組み合わせることでパラパラマンガ的表現ができます。

![点滅する画像](https://ics.media/entry/220602/images/220602_blinker1.gif)

```
<div class="blinker" id="js-blinker"></div>
```

```
.blinker {
  width: 32px;
  height: 32px;
  background-image: url("./images/blinker.png");
  background-position: 0 0;
  background-size: 64px 32px;
  animation-name: blinker;
  animation-duration: 1.5s;
  animation-timing-function: steps(1, jump-start);
  animation-iteration-count: infinite;
}

@keyframes blinker {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 32px 0;
  }

  100% {
    background-position: 0 0;
  }
}
```

今回は点滅する信号のような2枚の画像を用意しました。表示サイズは`32px`×`32px`ですが、その2つを横につなげて`32px`×`64px`の背景画像を作りました。キーフレームアニメーションの動きは半分の地点で表示幅分ずれて2枚目が表示され、また元の位置に戻るというものです。step()関数を使ってこれを2コマの動きに分割して、あたかも点滅しているような動きを実現しています。

![パラパラマンガの動きの図解](https://ics.media/entry/220602/images/220602_parapara.png)

ただ、これだけならGIFアニメーションやAPNGによる画像を用意すればわざわざ`background-image`で表現する必要はありません。CSSで行うところの利点は動的な変更が可能な点です。たとえば、JavaScriptと組合わせて、目標に近づくと点滅が激しくなるものを作れます。

![近づくと点滅が激しくなる様子](https://ics.media/entry/220602/images/220602_blinker2.gif)

JavaScriptの解説は割愛しますが、マウスカーソルとの距離に応じて`near1`、`near2`、`near3`というクラスを動的に付与しています。そして、そのクラスで`animation-duration`プロパティの値を変えています。

```
.blinker.near1 {
  animation-duration: 1s;
}

.blinker.near2 {
  animation-duration: 0.6s;
}

.blinker.near3 {
  animation-duration: 0.3s;
}
```

インタラクティブなアニメーションを作れるのが静的なアニメ画像にない、`background-image`ならではのポイントです。

### 帯が動く警告表示

`background-image`の特徴は画像を繰り返し配置ができることです。これは繰り返し画像であればループアニメーションを作れることを意味します。次のような帯が横に動き続けるようなアニメーションも得意です。

![帯が動く警告表示](https://ics.media/entry/220602/images/220602_warning.gif)

```
<div class="warning"></div>
<div class="warning reverse"></div>
```

```
.warning {
  width: 100%;
  height: 20px;
  background-image: url("./images/warning.png");
  background-repeat: repeat-x;
  background-size: 30px 36px;
  animation-name: warning;
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.warning.reverse {
  animation-direction: reverse;
}

@keyframes warning {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 30px 0;
  }
}
```

赤いしま模様の画像を配置し、`@keyframes warning`で横に移動させています。ここでポイントになるのが**移動量**です。ループアニメーションの場合、1周して元の位置に戻らないと、カクッとずれたアニメーションになってしまいます。そのため移動量は画像のサイズの整数倍ににする必要があります。今回は横移動で、`backgroudn-size`プロパティで指定している横サイズが`30px`なのでキーフレームアニメーションの`0%`から`100％`の移動量も`30px`で指定しています。

下側のしましまは逆向きに動いていますが、これは`animation-direction: reverse`を指定すると反対方向の移動になります。共通のアニメーションで方向を変えられるテクニックです。

### 雪降る表現

警告表示は横方向だけでしたが、縦横両方に繰り返せます。さらに、`background-image`には複数の画像を設定できる特徴があります。これらを活かし、縦横に繰り返せる画像を複数用意すれば、雪降る表現も可能です。

![雪降るアニメーション](https://ics.media/entry/220602/images/220602_snowfalling.gif)

```
<div class="snowFalling"></div>
```

```
.snowFalling {
  background-image: url("./images/snow1.png"), url("./images/snow2.png"),
    url("./images/snow3.png");
  background-repeat: repeat;
  background-size: 300px 150px, 300px 200px, 300px 300px;
  animation-name: snow-falling;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes snow-falling {
  0% {
    background-position: 0 0, 0 0, 0 0;
  }

  10% {
    background-position: 4px 15px, -4px 20px, 0 30px;
  }

  20% {
    background-position: 0 30px, 0 40px, 3px 60px;
  }

  30% {
    background-position: -4px 45px, 4px 60px, 0 90px;
  }

  40% {
    background-position: 0 60px, 0 80px, 3px 120px;
  }

  50% {
    background-position: 3px 75px, -3px 100px, 0 150px;
  }

  60% {
    background-position: 0 90px, 0 120px, -4px 180px;
  }

  70% {
    background-position: -2px 105px, 2px 140px, 0 210px;
  }

  80% {
    background-position: -1px 120px, 1px 160px, 2px 240px;
  }

  90% {
    background-position: 1px 135px, -1px 180px, 1px 270px;
  }

  100% {
    background-position: 0% 150px, 0% 200px, 0% 300px;
  }
}
```

コード量は多く少し複雑ですが、やっていることはあまり変わっていません。3種類の縦の長さを違う繰り返せる画像（`150px`、`200px`、`300px`）を用意します。この3種類の画像を少し左右にふりながら、それぞれの長さの分だけ移動させています。長さが違うことで1ループの移動量が違うのでそれぞれの画像の速度が違います。速度が違うことで奥行あるような表現を可能にしています。

### まとめ

背景画像の動かし方を工夫するだけで多彩な表現が可能です。CSSと画像だけでできるので実装も比較的容易ですので、`background-image`を活用したアニメーション表現を取り入れてみてはいかがでしょうか？