---
title: "CSSの三角関数を理解しよう！ sin()とcos()でできる表現"
source: "https://ics.media/entry/230126/"
publishedDate: "2023-02-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

2023年3月から主要なブラウザでCSSの三角関数が使えるようになりました。

とはいえ、「CSSで三角関数をどうやって使えばいいの？」「そもそも三角関数で何ができるの？」という方も多いのではないでしょうか。この記事では三角関数のうち[サイン関数](https://developer.mozilla.org/en-US/docs/Web/CSS/sin)と[コサイン関数](https://developer.mozilla.org/en-US/docs/Web/CSS/cos)の作例を交えながら解説します。

### 三角関数のおさらい

まずは**サイン関数**と**コサイン関数**のそれぞれの使い方を少しおさらいしてみましょう。下図は角度をθ、半径をrとした時のx座標とy座標を表したものです。

たとえば角度が60°で半径が200だった場合、CSSのサイン関数とコサイン関数を使うと、x座標は`cos(60deg) * 200`、y座標は`sin(60deg) * 200`で求められます。つまり、**角度と半径が分かっている円周上の点の位置を計算できるのです。**

![三角関数でx座標とy座標を計算する](https://ics.media/entry/230126/images/230126_css_trigonometry_sincos.jpg)

### 実装例

#### 1\. ローディングアニメーション

ローディングアニメーションをCSSで実装した例です。一つひとつの丸をCSSの`sin()`と`cos()`を使用して等間隔で並べています。

![ローディングアニメーションのデモ](https://ics.media/entry/230126/images/230126_demo_loading.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230126_css-trigonometry/loading/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230125_css-trigonometry/blob/main/docs/loading/index.html)

まずHTMLで`<span>`要素を必要な丸の数（このデモでは8個）用意します。そして、それぞれに`style="--index: 1;"`といった具合にカスタムプロパティ（変数）として0〜7までのindex番号を振ります。

```
<div class="loading">
  <!-- style="--index: *;" でインデックス番号を振る -->
  <span class="loading-item" style="--index: 0;"></span>
  <span class="loading-item" style="--index: 1;"></span>
  <span class="loading-item" style="--index: 2;"></span>
  <span class="loading-item" style="--index: 3;"></span>
  <span class="loading-item" style="--index: 4;"></span>
  <span class="loading-item" style="--index: 5;"></span>
  <span class="loading-item" style="--index: 6;"></span>
  <span class="loading-item" style="--index: 7;"></span>
</div>
```

カスタムプロパティとはCSSで任意の値に名前をつけられる機能で、`var()`関数を使用して名前をつけた値（変数）を自由に取り出して使えます。

たとえば`--index: 1;`と定義した値は、`var(--index)`のようにすると値の"1"を取り出すことができます。

参考：[var() - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/var)

次に`<span class="loading-item">`要素を親要素の`<div class="loading">`に対して、上下左右真ん中に配置しておきます。デモのローディングでは、親要素の真ん中を中心とした正円上に子要素の`<span>`が並んでいるので、いったんすべての子要素をスタート位置である真ん中に移動させておきます。

上下左右真ん中にする方法はいくつかありますが、ここでは親要素に`position: relative;`を指定し、子要素を絶対位置を指定する`position: absolute;`とし、`top: 50%; left: 50%; translate: -50% -50%;`と50%ずつ移動することで上下左右真ん中を実現させます。

```
.loading {
  position: relative;
  height: 60px;
  width: 60px;
}
.loading-item {
  position: absolute;
  top: 50%;
  left: 50%;
  /** ---省略--- */
  translate: -50% -50%;
  /** ---省略--- */
}
```

![translateに-50%を指定し、子要素を親要素に対して真ん中に配置する](https://ics.media/entry/230126/images/230126_css_trigonometry_translate.jpg)

`<span>`要素で作成した一つひとつの丸の位置を計算します。CSSで計算を行うには`calc()`関数を使用します。

参考：[calc() - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/calc)

まずは丸が円周上のどの角度に位置するのかを計算し、`--angle`変数に格納します。今回は8個の丸を正円上に均等に配置したいので、`calc(360deg / 8 * var(--index))`で角度を計算します。`var(--index)`には、HTMLで設定した0〜7の値が入ってくるため、1つ目の丸の角度は`360° / 8 * 0 = 0°`、2つ目の角度は`360° / 8 * 1 = 45°`となります。

```
.loading-item {
  /** ---省略--- */

  /** HTML内で付与したindex番号を取得して角度を計算。 */
  --angle: calc(360deg / 8 * var(--index));
  
  /** ---省略--- */
}
```

角度が格納されている変数`--angle`を使用してx座標とy座標を計算します。**ここでサイン関数とコサイン関数が登場します。**

「三角関数のおさらい」で説明した通り、x座標を計算するにはコサイン関数を使って`cos(角度) * 半径`と計算します。そのため`--x: calc( cos(var(--angle)) * 30px )`となります。y座標は`sin()`関数を使います。

```
.loading-item {
  /** ---省略--- */

  /** コサイン関数とサイン関数で座標位置を計算。 */
  --x: calc(cos(var(--angle)) * 30px);
  --y: calc(sin(var(--angle)) * 30px);

  /** ---省略--- */
}
```

x座標とy座標を計算できたので、`translate`で座標の位置に丸を移動させます。先ほど`.loading-item`を上下左右真ん中にするため`translate: -50% -50%;`としました。`calc()`を使用し、移動の計算を一緒に行います。

```
.loading-item {
  /** ---省略--- */
  translate: calc(var(--x) - 50%) calc(var(--y) - 50%);
  /** ---省略--- */
}
```

それぞれの丸の`opacity`と`scale`をアニメーションさせればローディングアニメーションの完成です！

```
.loading-item {
  /** ---省略--- */

  /** アニメーション全体の秒数(--duration)に対して、--indexに応じてアニメーションのdelayを設定する。*/
  --duration: 1.8s;
  --delay: calc(var(--duration) * var(--index) / 8);
  animation: animate var(--duration) var(--delay) infinite ease-in-out;
}
@keyframes animate {
  50% {
    opacity: 1;
    transform: scale(1.6);
  }
}
```

#### 2\. 円形に並んだメニュー

次は円形に並べたメニューUIを実装してみましょう。

![メニューUIのデモ](https://ics.media/entry/230126/images/230126_demo_menu.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230126_css-trigonometry/menu/)
-   [ソースコードを確認する](https://github.com/ics-creative/230125_css-trigonometry/blob/main/docs/menu/index.html)

まず1のローディングと同様、HTMLの円形に配置したい要素に対して`--index`でインデックス番号を振ります。

```
<nav class="menu">
  <div class="menu-title"><span>My Menu</span></div>
  <ul class="menu-content">
    <li class="menu-item" style="--index: 0;"><span>Home</span></li>
    <li class="menu-item" style="--index: 1;"><span>Search</span></li>
    <li class="menu-item" style="--index: 2;"><span>Likes</span></li>
    <li class="menu-item" style="--index: 3;"><span>Chat</span></li>
    <li class="menu-item" style="--index: 4;"><span>Setting</span></li>
  </ul>
</nav>
```

CSSで`sin()`と`cos()`を使用して配置していくのですが、今回は360°均等に並べるのではなく扇形に並べます。

CSSの三角関数で座標を算出する場合、角度が0°の場合のx座標とy座標はちょうど時計の針の3時のところに位置します。そこから角度が増えるにつれて、時計回りに座標が移動します。

数学ではy軸の正の方向は上向きですが、CSSでは下向きになります。一般的に角度が増えるにつれて点は**反時計回り**で移動しますが、CSSで操作する場合にはy軸が逆になるため**時計回り**に移動します。

このメニューでは、一番左の「Home」はちょうど200°の位置、一番右の「Setting」は340°の位置になります。つまり、200°から340°の間に35°の間隔でメニューを配置するようにCSSを書けば良いということになります。

![関数に渡す角度と位置の関係](https://ics.media/entry/230126/images/230126_css_trigonometry_angle.jpg)

CSSで角度を計算します。一番右の要素「Setting」の角度340°から一番左の要素「Home」の角度200°を引いた140°を4で割り、それにカスタムプロパティの`--index`を掛けたものを足します。

こうすることで、`--index: 0;`の要素は`200° + (140° / 4 * 0) = 200°`、`--index: 1;`の要素は`200° + (140° / 4 * 1) = 235°`と200°から35°ずつ角度を増やすことができます。

```
.menu-item {
  /** ---省略--- */

  /** 200deg〜340degの間で角度を計算。 */
  --angle: calc(200deg + calc(140deg / 4 * var(--index)));

  /** ---省略--- */
}
```

角度が計算できたら`sin()`と`cos()`を使用して座標を計算して配置します。1のローディングでは正円上に配置するため、掛け算する半径は同じ`30px`という値でした。このメニューではx座標とy座標で半径を変えることで少し横長の楕円上に配置しています。

```
.menu-item {
  /** ---省略--- */

  /** 座標位置を計算。xとyで半径を少し変えることで横長の楕円上に配置する。 */
  --x: calc(cos(var(--angle)) * 120px);
  --y: calc(sin(var(--angle)) * 108px);
  translate: calc(var(--x) - 50%) calc(var(--y) - 50%);
}
```

#### 3\. Sine Waveに沿った配置

最後はSine Wave、サイン波を使った実装例です。**サイン関数はどのような角度を渡しても必ず -1から1の間の値を返します。** その値をグラフにすると以下のように波を描くことができます。

![サイン波のグラフ](https://ics.media/entry/230126/images/230126_css_trigonometry_sinewave.jpg)

0°を与えた場合は`sin(0deg) = 0`、90°になると`sin(90deg) = 1`、180°になると`sin(180deg) = 0`と0に戻り、270°で`sin(270deg) = -1`、360°でまた`sin(360deg) = 0`と0に戻ってきます。つまり、**0°から360°で0 → 1 → 0 → -1 → 0 と1周し、その後値を変えても同じように周期的に値を返します。**

参考：[正弦波 - Wikipedia](https://ja.wikipedia.org/wiki/%E6%AD%A3%E5%BC%A6%E6%B3%A2)

これをテキストに応用したのがこのデモです。

![サイン波に沿ったテキストのデモ](https://ics.media/entry/230126/images/230126_demo_sinewave.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230126_css-trigonometry/sinewave/)
-   [ソースコードを確認する](https://github.com/ics-creative/230125_css-trigonometry/blob/main/docs/sinewave/index.html)

実装は1のローディングや2のメニューよりも簡単です。まずはHTMLで文字をひとつずつ`<span>`要素で囲み、`--index`でインデックス番号を振ります。

```
<div class="line">
  <span class="line-item" style="--index: 0;">こ</span>
  <span class="line-item" style="--index: 1;">れ</span>
  <span class="line-item" style="--index: 2;">は</span>
  <span class="line-item" style="--index: 3;">s</span>
  <span class="line-item" style="--index: 4;">i</span>
  <span class="line-item" style="--index: 5;">n</span>
  <span class="line-item" style="--index: 6;">e</span>
  <span class="line-item" style="--index: 7;">w</span>
  <span class="line-item" style="--index: 8;">a</span>
  <span class="line-item" style="--index: 9;">v</span>
  <span class="line-item" style="--index: 10;">e</span>
  <span class="line-item" style="--index: 11;">を</span>
  <span class="line-item" style="--index: 12;">使</span>
  <span class="line-item" style="--index: 13;">っ</span>
  <span class="line-item" style="--index: 14;">て</span>
  <span class="line-item" style="--index: 15;">い</span>
  <span class="line-item" style="--index: 16;">ま</span>
  <span class="line-item" style="--index: 17;">す。</span>
</div>
```

`--index`を使用して`sin()`関数で各`<span>`要素のy座標を計算します。18個に分けた文字を0°〜360°の間で均等に角度を計算し、その角度から計算したy座標を`translate`で適用します。

```
.line-item {
  /** 0°から360°の間で角度を計算 */
  --angle: calc(360deg / 18 * var(--index));
  /** カーブの振れ幅を10pxにする */
  --y: calc(sin(var(--angle)) * 10px);
  translate: 0 var(--y);
}
```

`* 10px`としている部分はカーブの振れ幅を大きくしている部分です。この値を変更したり`--angle`の計算で`360deg / 18`としている部分を変更するとまた雰囲気が変わっておもしろいと思います。

![Sine waveを調整する](https://ics.media/entry/230126/images/230126_css_trigonometry_edit_sinewave.jpg)

#### コラム: translateプロパティ

この記事では要素の移動に`translate`プロパティを使用していますが、これは比較的新しいプロパティです。元々は`transform: translate(10px, 10px);`のように`transform`プロパティの中で使用するものでしたが、最近になって`transform`プロパティから独立して使えるようになりました。

CSSの記述量が少なくなったり、独立して使うことでアニメーションの制御がしやすくなったりするので、ぜひ新しいプロパティも積極的に使ってみましょう。

参考：[translate - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/translate)

### 対応ブラウザ

CSSの三角関数は、Chrome 111・Edge 111（2023年3月）、Safari 15.4（2022年3月）、Firefox 110（2022年2月）以上で利用できます。

-   参照：[Can I use…](https://caniuse.com/mdn-css_types_sin)

### まとめ

筆者は学生時代三角関数がとても苦手でしたが、ウェブの表現を勉強するうちに避けて通れなくなり、大人になってから学び直しをしました。今でもすべてを理解しているわけではないですが、三角関数が使えるようになると今回の実装例のようなことも簡単にできるようになります。

ぜひこの機会に三角関数でできる表現に興味を持ってもらえると嬉しいです。ICS MEDIAでは三角関数について次の記事でも紹介していますので、合わせてご覧ください。

-   [WebGL開発に役立つ重要な三角関数の数式・概念まとめ （Three.js編）](https://ics.media/entry/10657/)
-   [CreateJS で三角関数を活用しよう](https://ics.media/tutorial-createjs/math_basic/)