---
title: "変幻自在なグラフィック表現！CSS, SVG, Canvasでマスクを使いこなせ"
source: "https://ics.media/entry/210701/"
publishedDate: "2021-07-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

近年、ウェブ技術の発展により、画像の一部だけを表示する「マスク表現」がよく見られるようになりました。一言でマスクと言っても、アニメーションやインタラクションとの組み合わせによりさまざまな表現が可能です。

また、どの技術を用いるかという選択も重要になります。マスク表現はCSS, SVG, Canvas APIといった技術で実現できますが、それぞれが異なる得意分野をもちます。

本記事の前半では、マスク表現を実現する技術について解説を行います。後半では実践的なマスク表現をいくつか紹介しながら、それぞれの実装方法を紹介します。いままで技術的に難しいと諦めていた表現が、マスクによって実現するヒントになれば幸いです。

▼マスク表現の例（背景画像の一部を表示している） - [Erika Moreira Portfolio](https://erikamoreira.co/)

![](https://ics.media/entry/210701/images/210701_mask_sample.webp)

### マスクとは

本記事で紹介するマスク表現とは、画像の一部を切り抜く手法です。マスキングと言ったほうが馴染み深い人もいるかもしれません。マスク表現にはマスク用の画像と、マスクする対象が必要です。

![](https://ics.media/entry/210701/images/210701_mask-description.png)

ブラウザ上でマスクをするメリットとして以下のものがあります。

-   ブラウザ上でトリミングの位置やサイズを指定できるため、画像自体を加工する必要がなく調整や修正がしやすい
-   画像同士のマスクだけではなく、文字のような画面上の要素と組み合わせたマスク表現も可能
-   スクロールやクリックといったインタラクションと連動した描画ができる

以降では、マスクを実現するウェブの技術について紹介していきましょう。 まずは、もっともポピュラーなCSSマスクから順番に紹介します。

### CSSマスク

CSSでマスク表現をするメリットとしては、やはり手軽であること、短いコード量ですむことが挙げられます。マスク表現を実現するCSSプロパティーには、以下のようなものがあります。

-   `mask-image`プロパティー
-   `clip-path`プロパティー
-   `background-clip`プロパティー

#### mask-image

`mask-image`プロパティーには、マスク用の画像を設定できます。次の図は星型の画像で画像をトリミングした例です。

![](https://ics.media/entry/210701/images/210701_mask-image.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210604_mask_variations/css_sample.html)

関連プロパティーとして以下のものがあります。

-   `mask-repeat`：マスク画像の繰り返し
-   `mask-position`：マスクする位置
-   `mask-size`：マスク画像のサイズ

それぞれのプロパティーは`background-image`の関連プロパティーと同様に扱えるため学習コストが低く、扱いやすいのも魅力のひとつです。

注意点として、2021年6月現在ではChromeやSafariで用いる場合は`-webkit-`接頭辞が必要です。

▼コード例

```
.mask-img {
  mask-image: url("./images/star.svg");
  mask-repeat: no-repeat;
  mask-position: 0 0;
  mask-size: 50%;
  /* Chrome, Safari用 */
  -webkit-mask-image: url("./images/star.svg");
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: 0 0;
  -webkit-mask-size: 50%;
}
```

-   参考：[Can I use - mask-image](https://caniuse.com/?search=mask-image)

#### clip-path

次に`clip-path` プロパティーを紹介します。`clip-path`プロパティーは引数に`circle`（円）や`ellipse`（楕円）、`polygon`（多角形）といったプロパティーを与えられます。つまり、単純な形のマスクであればマスク用の画像も不要ということです。`polygon`を用いると、切り抜きが面倒だった三角形や五角形、平行四辺形といった形に手軽に要素をトリミングできます。

![](https://ics.media/entry/210701/images/210701_clip-path.png)

こちらも手元で試せるデモを用意しました。

![](https://ics.media/entry/210701/images/210701_clip-path_demo.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210604_mask_variations/css_sample.html)

▼円形にマスクする例

```
.clip {
  width: 20px;
  height: 20px;
  background-color: skyblue;
  clip-path: circle(50px at center);
}
```

`clip-path`の引数には`mask-image`と同様画像URLを指定することもできます。また、インラインに記述したSVGの形に切り抜いたり、`path`を与えることで曲線の表現もできます。

#### background-clip

最後に紹介するのは`background-clip`プロパティーです。`background-clip`プロパティーによる切り抜きは、もっぱら`background-clip: text`の形で記述されます。

`background-clip:text` が指定された要素は、内部のテキスト要素によってくり抜かれます。下の例では背景の画像が「TEXT」という文字でくり抜かれています。このとき、文字色があるとマスクされないので`color: transparent`を指定します。

![](https://ics.media/entry/210701/images/210701_background-clip.png)

```
<div>
  <p>TEXT</p>
</div>
```

```
div {
  background-image: url("./bg.png");
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

注意点として、EdgeやChrome, Safariでは`-webkit-`接頭辞が必要です。

-   参考：[Can I use - background-clip](https://caniuse.com/?search=background-clip)

以上が、マスクを表現するCSSプロパティーの紹介でした。

### SVGマスク

SVGにおけるマスクでは、マスク用のSVG要素を用意します。`<svg>`タグの中に`<mask>`タグを用意し、その中に描画した図形はマスク用画像として用いることができます。

コードの例を以下に示しました。黒い長方形を円の形に切り抜く例です。長方形を描画する`<rect>`タグの`mask`属性として`<mask>`タグの`id`属性を指定しました。これにより、`<mask>`タグ内に記述された`<circle>`要素でマスクできます。

```
<!-- マスク用SVG -->
<svg>
  <defs>
    <!-- マスク用の図形 -->
    <mask id="circle">
      <circle cx="100" cy="100" r="80" fill="#fff"></circle>
    </mask>
  </defs>
  <!-- 切り抜かれる要素 -->
  <rect x="0" y="0" width="100%" height="100%" mask="(#circle)" fill="#000"/>
</svg>
```

`<mask>`タグと同様に、`<clipPath>`タグでのマスクも可能です。こちらもマスクする側とされる側のSVGを記述します。

```
<!-- マスク用SVG -->
<svg>
  <defs>
    <!-- マスク用の図形 -->
    <clipPath id="circle">
      <circle cx="100" cy="100" r="80" fill="#000"></circle>
    </clipPath>
  </defs>
  <!-- 切り抜かれる要素 -->
  <rect x="0" y="0" width="100%" height="100%" clip-path="(#circle)"/>
</svg>
```

SVGにおけるマスクは、上記の二種類の方法があります。こちらも視覚的に試せるデモを作成しました。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210604_mask_variations/svg_sample.html)

#### clip-pathとmaskの違い

CSS、SVGともにマスクにはどうやら「mask」と「clip-path」が使えることがわかってきました。ここで、それぞれの違いについて説明します。どちらもくり抜くという目的は同じですが、大きな違いとして、**透過情報を適用**できるかどうか、という違いがあります。「mask」はマスク用画像の透過情報が適用されますが、「clip-path」は適用されません。

たとえば、透過情報を持つ画像で両者を適用した場合は、透過情報が適用されるマスクと、適用されないクリップパスで以下のような違いが出ます。

![](https://ics.media/entry/210701/images/210701_mask_vs_clip.png)

さらにSVGにおいては、`<mask>`タグにCSSプロパティーとして`mask-type`プロパティーを設定できます。マスク画像の輝度をもとにマスクの透過を決める**ルミナンスマスク**と、マスク画像の透過情報をもとにマスクの透過を決める**アルファマスク**が選択できます。

それぞれ`mask-type: luminance`、`mask-type: alpha`というように指定します。デフォルトではルミナンスマスクのため、マスク用の画像が黒に近いほど透明になります。

![](https://ics.media/entry/210701/images/210701_mask-type.png)

```
<!-- マスク用SVG -->
<svg>
  <defs>
    <!-- マスクタイプ：ルミナンスを適用 -->
    <mask id="circle" style="mask-type: luminance">
      <circle cx="100" cy="100" r="80" fill="#fff"></circle>
    </mask>
  </defs>
</svg>
```

以下のような、CSSでの指定も可能です。

```
mask {
  mask-type: luminance;
}
```

CSSマスクにおいては、`mask-mode`というプロパティーでルミナンスマスク/アルファマスクを選択できますが、2021年現在はFirefoxしか対応していません。各ブラウザの対応が待たれます。

-   [Can I use - mask-mode](https://caniuse.com/?search=mask-mode)

まとめると、以下のようになります。

-   mask：透明度をもった表現が可能。マスク用画像の明度を透明度として用いるルミナンスマスクと、透明度のみ用いるアルファマスクがある
-   clip-path：透明度をもった表現は不可能

透明度を用いた表現にはmask、輪郭がはっきりとした表現にはclip-path、といった形で使い分けましょう。

### canvasによるマスク

Canvas APIでのマスク表現はCSS, SVGと少し毛色が違います。「画像同士の重なりをどう処理するか」という観点で処理がなされます。

`CanvasRenderingContext2D.globalCompositeOperation` は画像同士の重なりの処理方法を指定します。デフォルトでは上書きする`source-over`が指定されていますが、`destination-in`プロパティーが指定されると、それまでに描画された画像と新たに描画される画像の重なり部分だけを描画する、という計算方式に変わります。

```
const ctx = document.getElementById("canvas").getContext("2d");
// 背景を描画
ctx.globalCompositeOperation = "source-over";
ctx.drawImage("./bg.png", 0, 0);
// 重なり方を指定
ctx.globalCompositeOperation = "destination-in";
// 円を描画（マスク用）
ctx.beginPath();
ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 100, 0, 2 * Math.PI, false);
ctx.fillStyle = "#000000";
ctx.fill();
```

Canvas APIでマスク表現を行うメリットは、マスク表現単体で用いるというよりは、インタラクティブな表現をしたりほかのCanvas APIと組み合わせる場合がほとんどでしょう。デモとしてマウスに連動した切り抜きを作成しました。

![](https://ics.media/entry/210701/images/210701_canvas_mask_demo.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210604_mask_variations/canvas_sample.html)
-   [コードを確認する](https://github.com/ics-creative/210604_mask_variations/blob/main/canvas_sample.html)

画像の重なり方の設定は`source-over`以外にも、重なった部分を乗算する`multiply`や、乗算した後に反転する`screen`などさまざまな指定があり、試してみるとマスク以外にもおもしろい表現ができます。

-   参考：[MDN - CanvasRenderingContext2D.globalCompositeOperation](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

### 実践的なマスク表現

ここからは、マスクを駆使した実践的な表現について解説します。解説用のデモは以下になります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210604_mask_variations/practice_sample.html)
-   [コードを確認する](https://github.com/ics-creative/210604_mask_variations/blob/main/practice_sample.html)

記事内のコードは説明用に単純化しているものですので、実際のコードが気になる方はレポジトリから確認してください。

#### グラデーションマスク

ここまでマスク対象として写真のような画像を例に出しましたが、マスクする対象は必ずしも画像ファイルである必要はありません。CSSでは`background-image`に`linear-gradient`や`radial-gradient`を指定しグラデーションを描画できます。

グラデーション背景をテキストや図形で切り抜く手法はよく用いられます。デモの例では、`p`タグに`background-clip:text`を設定し、`background-image`に`linear-gradient`を設定しています。また、親要素に`background-image: linear-gradient`を設定して枠を作成しています。

![](https://ics.media/entry/210701/images/2110701_gradation_text_description.png)

```
<p class="gradation-text_inner">TEXT</p>
```

```
.gradient-text_inner {
  background-image: linear-gradient(to right, #d83819, #E2CC28, #57DB51);
  /* テキストでマスク */
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

#### グラデーションのアニメーション

こちらのデモもグラデーションとマスク表現を組み合わせた応用例です。

![](https://ics.media/entry/210701/images/210701_gradation_button_demo.gif)

一見グラデーションやマスクは関係ないように見えますが、分解すると図のように中心で分かれた二色の長方形を`background-image`として設定しています。これを移動させて色の変化を表現しています。

テキストと背景は、別々のグラデーションを利用しています。テキスト単体で見たときには、`backgroud-image: linear-gradient`で作成した、白と黒が1:1となるような背景を`background-clip: text`でマスクしています。さらに、ホバー時に`background-position`を移動させてテキストの色が右から変わっているように見せています。

![](https://ics.media/entry/210701/images/210701_gradation-mask_1.png)

背景色はテキストのグラデーションと逆方向のグラデーションを作成し、`background-position`をアニメーションさせます。背景はマスクさせないのがポイントです。

![](https://ics.media/entry/210701/images/210701_gradation-mask_2.png)

詳しくは、サンプルコードを参照ください。

CSSアニメーションにおいて、グラデーションの色自身はアニメーションできないことに注意しましょう。たとえば、`linear-gradient(white 10%, black 50%)`から`linear-gradient(white 80%, black 100%)`といったように数値を変更するようなアニメーションはできないということです。

※Chrome 104・Edge 104ではCSSでのグラデーションのアニメーションは可能ですが、Safari 15.6・Firefox 104ではできません。

デモ中のこちらのアニメーションは2枚の画像を重ね、後ろの画像を白黒にし、前面の画像を`radial-gradient`でマスクし、ホバー時にマスクを拡大しています。解説は省略しますが、興味のある人はコードを参照ください。

![](https://ics.media/entry/210701/images/210701_radial-gradient_demo.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210604_mask_variations/practice_sample.html)
-   [コードを確認する](https://github.com/ics-creative/210604_mask_variations/blob/main/practice_sample.html#L103-L119)

#### スプライトイメージ×マスク

デモのような、手書き感のあるマスク表現はどのように実現すればよいでしょう？

![](https://ics.media/entry/210701/images/210701_sprite_demo.webp)

mp4のような動画ファイルはマスク要素として使用できないため、方法としては`mask-image`としてGIFイメージ、もしくは**スプライトイメージ**を用いるという方法があります。

スプライトイメージとは、以下の画像のように、アニメーションをフレームごとに分割し1枚の画像にまとめたものです。

![](https://ics.media/entry/210701/images/210701_sprite-image.png)

スプライトのコマのサイズで枠を作成し、CSSアニメーションイージングを`step`に設定して背景を動かすと、パラパラマンガのようにコマ送りのアニメーションが作成できます。

▼元のスプライトアニメーション ![](https://ics.media/entry/210701/images/210701_sprite_original.webp)

スプライトイメージをマスク画像に設定しステップアニメーションを行うことで、不透明な箇所だけがマスクされデモのようなアニメーションが実現できます。

コードサンプルは以下になります。

```
<div class="sprite-animation">
  <img class="sprite-animation_image" src="https://picsum.photos/960/540" alt="" width="480" height=270" />
</div>
```

```
/*スプライトイメージのアニメーション*/
.sprite-animation_image {
  display: inline-block;
  width: 480px;
  height: 270px;
  mask-image: url("./images/css_sprites.png");
  mask-repeat: no-repeat;
  mask-position: 0 0;
  /* Chrome, Sarafi用 */
  -webkit-mask-image: url("./images/css_sprites.png");
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: 0 0;
  animation: sprite-animation 2.5s steps(29) infinite;
}

@keyframes sprite-animation {
  0% {
    mask-position: 0 0;
    -webkit-mask-position: 0 0;
  }
  100% {
    /* スプライトイメージ全体の幅 - 1フレームの幅 */
    mask-position: calc(-14400px + 480px) 0;
    -webkit-mask-position: calc(-14400px + 480px) 0;
  }
}
```

#### 背景に依存しないマスク

ここまでやってきたマスク表現は、マスク対象が決まっているものでした。つまり、複数の要素をまたぐような表現に関しては不可能です。

ここでは以下のデモのように、窓のようなマスク表現の実装を紹介します。

![](https://ics.media/entry/210701/images/210701_window_mask.webp)

このように複雑なマスクをするときは、SVGが便利です。`<rect>`タグで平面を作成し`<mask>`タグで切り抜き用の図形を作成します。コードは以下のようになります。

```
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1920"
  height="1280"
  class="parallax-cover_clip"
>
  <defs>
    <! -- マスク用の図形 -->
    <mask id="cross">
      <rect width="100%" height="100%" fill="#ffffff"></rect>
      <rect x="0" y="0" width="50%" height="20%" fill="#000000"></rect>
      <rect x="40%" y="30%" width="60%" height="20%" fill="#000000"></rect>
      <rect x="0" y="65%" width="30%" height="30%" fill="#000000"></rect>
    </mask>
  </defs>
  <! -- 切り抜き対象 -->
  <rect width="100%" height="100%" mask="url(#cross)" fill="#ffffff"></rect>
</svg>
```

`<mask>`タグ内の図形は以下の図におけるマスク用SVGに該当します。白い背景の上に黒い長方形がいくつか重なった図形です。切り抜き対象として白色の`<rect>`要素を用意します。

マスク用SVGを切り抜き対象の`mask`属性に指定すると、`mask-type`はデフォルトでルミナンスマスクなので、結果として黒い部分だけが切り抜かれた長方形となります。

![](https://ics.media/entry/210701/images/210701_window-mask.png)

この要素全体を`position: fixed`や`position: sticky`で固定すると、窓から見える背景だけがスクロールされ、パララックス効果のような表現が可能になります。

### まとめ

今回はいろいろなマスク表現と、その実装法について紹介しました。ひと口にマスクといってもいろいろな表現が可能です。

[Codepen](https://codepen.io/search/pens?q=css+mask&cursor=ZD0xJm89MCZwPTE=)では実験的なアイデアが多数投稿されています。ウェブサイトで気になるマスク表現があったらどんどん取り入れていきましょう！