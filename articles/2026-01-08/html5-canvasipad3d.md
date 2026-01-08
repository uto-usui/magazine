---
title: "HTML5 CanvasとiPadで実現する3Dホログラム"
source: "https://ics.media/entry/12049/"
publishedDate: "2016-05-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

みなさんは「3Dホログラム」をご存知でしょうか？　空間に映像を投影するというもので、スター・ウォーズなどSFのイメージがあるかもしれませんが、近年では[TIFFANYのプロモーション](https://www.youtube.com/watch?v=0LRfotyn988)や[マイケル・ジャクソンのライブ](https://www.youtube.com/watch?v=jDRTghGZ7XU)などでも使用されている技術です。

近未来感のある技術ですが、**スマートフォンとCDケースで簡易的なものが自作できる**と2015年夏に[話題になりました](http://gigazine.net/news/20150805-hologram-technology/)。これはCDケースの透明なプラスチック板を使って投影機を作成し、スマートフォンの画面の上に設置し、専用の動画を再生して投影するものです。

週末に子供と遊ぶネタにちょうどいいなと私も作ってみようと思ったので、**投影する映像をHTML5 Canvasで実現**してみました。

### 投影機の作成

投影機は、台形型（上辺1：下辺6：高さ3.5の比率）の透明な板を4枚組み合わせて作成します。今回はiPadのサイズに合わせて、「2.5cm × 14.8cm × 8.6cm」の大きさで作成しました。**板の下辺を端末の画面幅に合わせる**と、端末にぴったり合ったサイズになります。

素材はCDケースではなく、加工のしやすいプラスチック板を使用しました。プラスチック専用のカッターを使うと簡単に切れます。板は接着剤などで接着せず、テープなどで軽くくっつけておくと折りたたむ事ができ、収納が楽になるのでオススメです。

![工作風景](https://ics.media/entry/12049/images/plastic.png)

![投影機](https://ics.media/entry/12049/images/projector.png)

▲ 投影機は15分程度で作成できました

### 投影する映像の作成

今回投影する映像は、以前の記事「[コピペで使える！ CSS Animationだけで実現するキャラクターアニメーション](https://ics.media/entry/11336/)」で作成したキャラクターアニメーションを使用しました。元のアニメーションはCSS Animationで制作していましたが、これを[Adobe Animate CC](https://www.adobe.com/jp/products/animate.html)を使ってHTML5 Canvasフォーマットに移植しました。

![](https://ics.media/entry/12049/images/animation.png)

このアニメーションをJavaScriptでホログラム向けのフォーマットに変換します。元のHTML5 アニメーションを、下図のように**上下左右に4つ転写**します。転写の際には、投影時に正位置で見えるよう**左右反転したものを90度ずつ回転させるのがポイント**です。

![映像の仕組み](https://ics.media/entry/12049/images/canvas.png)

![](https://ics.media/entry/12049/images/hologram.png)

-   [別ウインドウで再生する](https://ics-creative.github.io/160518_hologram/hologram1/)
-   [ソースコードを確認する](https://github.com/ics-creative/160518_hologram/blob/gh-pages/hologram1/index.html)

### 完成

これで完成です！　投影機を画面中央に設置し、映像を再生すると空間上に投影されているように見えます。流れている映像はHTML5 Canvasで作成したものなので、同じ要領で**WebGLで作成した3Dコンテンツも投影できます**。以下の動画では、記事「[WebGL開発に役立つ重要な三角関数の数式・概念まとめ (Three.js編)](https://ics.media/entry/10657/)」で登場した地球の3Dモデルも投影しています。

### おわりに

ちなみにこの手法は「[ペッパーズ・ゴースト](https://ja.wikipedia.org/wiki/%E3%83%9A%E3%83%83%E3%83%91%E3%83%BC%E3%82%BA%E3%83%BB%E3%82%B4%E3%83%BC%E3%82%B9%E3%83%88)」と呼ばれており、150年程前に考案され手品や劇場演出の視覚トリックとして使用されています。

HTML5 Canvasなら簡単にホログラム用のフォーマットに変換できるため、手軽にホログラム映像を作成して楽しめます。是非週末のひとときにお試しください。