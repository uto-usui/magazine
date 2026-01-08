---
title: "CSSのmix-blend-modeで実現するドローイング表現"
source: "https://ics.media/entry/8376/"
publishedDate: "2015-09-28"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2015年9月28日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

以前の記事「[CSSのブレンドモードが素敵！ mix-blend-modeを使いこなそう](https://ics.media/entry/7258/)」の表現例として、CSSブレンドモードとHTML Canvas/WebGLモーションと組み合わたデモを作成しました。スマートフォンでもデスクトップブラウザでも動作しますので、次のデモをお試しください。

![](https://ics.media/entry/8376/images/thumb.jpg)

-   [デモを別タブで再生する](https://ics-creative.github.io/data-demos/150129_pixijs_particles_150207_2/index.html)
-   [ソースコード](https://github.com/ics-creative/150928_css3_blendmode) (TypeScript 1.5)

**CSSブレンドモードに限らず、HTML周辺技術にはブレンドモードを実現する方法が他にもあります**。本記事ではそれぞれのテクノロジーの理解を深めるべく、デモ作成にあたり技術的に調査したことをまとめて紹介します。

### ウェブでブレンドモードを実現する方法のまとめ

**HTML周辺技術として、CSS、Canvas要素（Context2D）、WebGLのいずれかでブレンドモードを実現できます**。ただし、**利用できるブレンドモードの種類はそれぞれのテクノロジーによって異なります**。そこで、これらのテクノロジーで実現可能なブレンドモードを以下の表にまとめました。この表ではビルドインで備わっているブレンドモードのみを「○」としています。

技術名

CSS3

Canvas要素

WebGL  
(Thee.js)

WebGL  
(PIXI.js)

Flash

通常

○

○

○

○

○

比較（暗）

○

✕

✕

✕

○

乗算

○

✕

✕

○

○

焼きこみ/減算

○

○

✕

○

○

比較（明）

○

✕

✕

✕

○

スクリーン

○

✕

✕

○

○

覆い焼き/加算

○

○

✕

○

○

オーバーレイ

○

✕

✕

✕

○

ソフトライト

○

✕

✕

✕

✕

ハードライト

○

✕

✕

✕

○

差の絶対値

○

✕

✕

✕

○

除外

○

○

✕

✕

○

色相

○

✕

✕

✕

✕

彩度

○

✕

✕

✕

✕

カラー

○

✕

✕

✕

✕

輝度

○

✕

✕

✕

✕

反転

✕

✕

✕

✕

○

アルファ

✕

✕

✕

✕

○

消去

✕

○

✕

✕

○

**CSSはPhotoshopライクなグラフィカルなブレンドモードを搭載しています。デザイナーやモーションクリエイターにとっては直感的に利用しやすいのではないでしょうか**。しかし、CSSのブレンドモードは執筆時点（2015年9月現在）はMicrosoft EdgeやInternet Explorerが対応していないのがデメリットです（追記：2022年現在はほぼすべてのブラウザで利用できます）。

Canvas要素は旧式ブラウザを含め多くのブラウザで利用できるものの、Canvas要素はブレンドモードの種類が少ないという制約があります。ここで挙げたように、**それぞれのテクノロジーには一長一短があるのでコンテンツに応じて最適な手段を検討するのが現実解となります**。

### デモ作成で選んだのはCSS3のブレンドモード

デモ作成にあたり2つのレイヤーを作成しました。1つはカラフルな背景のレイヤー、もう1つはドローイングの曲線が描かれてたレイヤーです。それぞれを独立したデモを用意しましたので、[背景レイヤーデモ](https://ics-creative.github.io/150928_css3_blendmode/debug_layer_bg.html)と[ドローイング曲線デモ](https://ics-creative.github.io/150928_css3_blendmode/debug_layer_lines.html)を再生すると以下の説明がわかりやすくなると思います。

![](https://ics.media/entry/8376/images/150812_dom_layers.jpg)

この2つのレイヤーをどのように組み合わせるのがおもしろいのか、さまざまなブレンドモードの表現を比較しました。以下の図板は試行錯誤の一例です。

![](https://ics.media/entry/8376/images/150812_blend_compare.jpg)

長年の勘から「加算」が妥当だろうと思っていたのですが、CSSの「ハードライト (`mix-blend-mode: hard-light`)」を使えば、ユニークな印象を出せることに気づきました。ハードライトは2つのレイヤーのうち、前面のレイヤーが50％グレーより明るい部分は［スクリーン］に、暗い部分は［乗算］になる合成する方法です。

![](https://ics.media/entry/8376/images/1509287_ipad.jpg)

▲iPadでドローイング

### 広がるブレンドモードの表現

今回はモーションにおけるCSSブレンドモードの活用例を紹介しました。ブレンドモードはPhotoshop 3から搭載されるグラフィックデザインにおける伝統的な手法です。ウェブの世界では2005年登場のFlash Player 8から利用がはじまり、HTML&CSSでは2015年頃からブラウザで利用できるようになってきました。さまざまな表現技術が利用可能になることにワクワクしますね。

#### 注釈

※Canvas要素（Context2D）では`globalCompositeOperation`プロパティでブレンドモードを実現します。`globalCompositeOperation`プロパティで実現可能な合成方法は「[CanvasRenderingContext2D.globalCompositeOperation - MDN](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)」を参照ください。なお、`globalCompositeOperation`プロパティに存在しない合成方法でも、代替手法としてピクセル値の計算処理を実装すれば任意のブレンドモードの実現が可能です。ただし、計算負荷が高いため処理速度は遅く、リアルタイムの合成には向きません。

※WebGLはJSライブラリ「Three.js」と「PIXI.js」で実現可能なブレンドモードをまとめました。Pixi.jsではビルトインで用意されているブレンドモードの種類は多いです。

※WebGLではフラグメントシェーダー―を記述すれば基本的には任意のブレンドモードが可能です。詳しくは記事「[WebGL で高速 BlendMode - ヨモツネット](http://yomotsu.net/blog/2013/08/04/blendmode-in-webgl.html)」を参照ください。この場合の処理速度は良好です。

※Flash(DisplayList)では`blendMode`プロパティでブレンドモードを実現します。なお、`blendMode`プロパティにない合成方法でも、PixelBender機能（`Shader`クラス）を用いて任意のブレンドモード（`blendShader`プロパティ）が可能です。この場合の処理速度は良好です。

※FlashでもWebGLと同様のGPUを利用する技術「Stage3D」が存在します。Stage3Dではフラグメントシェーダー―を作成することで任意のブレンドモードの実現が可能です。この場合の処理速度は良好です。