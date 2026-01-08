---
title: "CreateJSを使ってインタラクティブなHTML5デモを作ってみた"
source: "https://ics.media/entry/93/"
publishedDate: "2013-02-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

CreateJS勉強会の参加応募数からも関心の高さがうかがえる[CreateJS](https://createjs.com/)ですが、弊社でも研究をしており今回は制作したデモをいくつか紹介します。

### 有名な絵画っぽいもの

![](https://ics.media/entry/93/images/130215_monariza.jpg)

CreateJSとCSSを用いたデモです。カーソルをキャンバス上で動かすと絵が描け、ドラッグするとちょっと3Dっぽい動きをします。絵の描画はCreateJS、3Dっぽい動きはCSSで作っています。絵の描画は重ね塗りし続けると負荷が増大するので、毎フレームキャッシュし描画するコストを減らし最適化しています。

-   [デモはこちらから](https://ics-creative.github.io/data-demos/130215_createjs_monariza/)

### Box2D Drop

![](https://ics.media/entry/93/images/130215_box2d.jpg)

CreateJSと物理演算ライブラリ「Box2D」を組み合わせたデモです。マウスでアイコンをドラッグ＆ドロップすることで投げることができます。Box2DライブラリはActionScript版とほとんど同じAPIで用意されているので、ActionScriptのノウハウを活用できます。

-   [デモはこちらから](https://ics-creative.github.io/data-demos/130215_createjs_box2d/)

### Blur Light

![](https://ics.media/entry/93/images/130215_blur.jpg)

EaselJSのぼかしの表現を使って作成したシンプルなグラフィックデモです。canvasタグにはFlashのように描画モードを設定できるオプション「`compositeOperation`」があるのですが、それを利用してグラフィックがかさねあわさるとより明るくなるように工夫しています。

-   [デモはこちらから](https://ics-creative.github.io/data-demos/130215_createjs_blurs/)