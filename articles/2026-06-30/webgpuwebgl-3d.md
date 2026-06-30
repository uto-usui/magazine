---
title: "WebGPU・WebGL入門 - サンプルで理解する3D表現の迫力"
source: "https://ics.media/entry/2328/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2014-09-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

WebGPUウェブ・ジーピーユーやWebGLウェブ・ジーエルは、ブラウザーからGPUを活用するための標準仕様です。WebGPUのほうが新しく、WebGPUがWebGLの後継にあたります。3D描画だけでなく、2Dの高負荷な演出、画像処理、シミュレーションのような計算処理にも応用できます。

GPUを使ったウェブ表現は、主に次のようなコンテンツ開発に役立ちます。

-   3Dモデルの表示
-   ゲームコンテンツ
-   データビジュアライゼーション
-   プログラミングアート
-   流体やパーティクルなどのシミュレーション表現
-   魅力的で華やかな画面演出（広告系サイトなど）

2010年代頃までは、Flash PlayerやUnity Web Playerのようなブラウザー・プラグインを使わなければ高度な3D表現はできませんでした。現在はWebGPUやWebGLによって、ブラウザーだけでネイティブアプリに近いグラフィックス表現を実現できます。

本記事ではWebGPU・WebGL入門者にむけ、**数秒で試せるオリジナルのWebGPU・WebGLのHTMLデモを多数掲載**。どれもスマートフォンのブラウザーでも利用可能です。WebGPU・WebGLの可能性を体験したうえで、勉強方法を紹介します。

### 燃え盛る炎の表現

燃え盛る炎を表現したWebGLの作例です。タッチやドラッグでアングルを変えられます。GPUを使ったパーティクル表現の迫力を確認できます。

-   [サンプルを別ウインドウで開く](https://clockmaker.jp/labs/140104_away3d_ts_fires/index.html)
-   [コードを確認する](https://clockmaker.jp/labs/140104_away3d_ts_fires/main.ts)

この作例はもともとFlashで作成されたものをWebGLに移植したものです。Flashが技術として先行していましたが、WebGLでもそれに匹敵する表現力があることがわかります。

### タイムリマップ表現

無数のアイコンが集まり、最終的にワードが形成される作例です。演出途中にスローモーションになる、リアルタイムモーショングラフィックスのデモです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/150810_threejs_mosaic/DemoIcons.html)
-   [コードを確認する](https://github.com/ics-creative/150810_threejs_mosaic/blob/master/src/DemoIcons.ts)

作り方は記事『[高機能なモーション制作用JSライブラリGSAPを使ったタイムリマップ表現](https://ics.media/entry/7162/)』で解説しています。

### 3Dゲームエフェクト

ゲームやビジュアライゼーションのウェブコンテンツでは、華やかな3D演出の実装をJavaScriptとGPU描画で求められることがあります。このデモは必殺技やオーラのようなものをWebGPUで表現可能であるかを試した演出サンプルです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/160907_magma_effect/index.html)
-   [コードを確認する](https://github.com/ics-creative/160907_magma_effect)

作り方のエッセンスは記事『[エフェクト作成入門講座 Three.js編 ゲーム演出に役立つマグマ表現の作り方](https://ics.media/entry/13973/)』で解説しています。

### カバーフローUI

昔のmacOSやiTunesアプリで使われていたカバーフローを、Three.jsのWebGPUレンダラーで再現した作例です。画面下側のスライダーを動かすことで、左右の写真を奥行き方向に傾けながらスライドできます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230428_three_coverflow/)
-   [コードを確認する](https://github.com/ics-creative/230428_three_coverflow)

3DのJavaScriptライブラリとして[Three.js](https://threejs.org/)を利用しています。詳しくは記事『[Three.jsで作る3DのカバーフローUI](https://ics.media/entry/1787/)』で解説しています。

### 2D流体シミュレーション

GPUは3Dだけでなく、2Dの演出や計算にも力を発揮します。次のデモはThree.jsのWebGPUレンダラーとTSL（Three.js Shading Language）を使った流体シミュレーションです。マウスドラッグやタッチ操作で、流体の動きをインタラクティブに変化させられます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250916_threejs_fluids/demo1.html)
-   [コードを確認する](https://github.com/ics-creative/250916_threejs_fluids/blob/main/src/demo1.ts)

流体表現では、画面上の各ピクセルに速度や圧力などの値を持たせ、GPUで並列計算します。ウェブサイトの背景演出、ビジュアライゼーション、インタラクティブなアート表現に応用しやすい作例です。詳しくは記事『[Three.js(WebGPU)で実現するStable Fluids - 2Dの流体シミュレーション](https://ics.media/entry/250916/)』をご覧ください。

### レンズフレア表現

レンズフレアは、カメラのレンズに光源が直接入ったときに発生する光の現象です。映画やゲームでよく見られる演出で、Three.jsのWebGPUレンダラーでも表現できます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250512_three_lens_flare/)
-   [コードを確認する](https://github.com/ics-creative/250512_three_lens_flare)

マウスドラッグで視点を動かすと、光源とカメラの位置関係に応じてレンズフレアの見え方が変化します。詳しくは記事『[エフェクト作成入門講座 Three.js編 - レンズフレア表現](https://ics.media/entry/476/)』で解説しています。

### 衛星軌道の表現

衛星軌道の実装方法を説明した記事『[WebGPU・WebGL開発に役立つ三角関数の数式・概念まとめ （Three.js編）](https://ics.media/entry/10657/)』の作例です。タッチやドラッグでアングルを回転できます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/160106_threejs_trigonometric/demo/build/)
-   [コードを確認する](https://github.com/ics-creative/160106_threejs_trigonometric/tree/master/demo)

航空路や輸出入のデータビジュアライゼーションなど、地球規模のデータを立体的に見せるときに使えそうなテクニックです。

### 2D表現でもWebGPU・WebGLが役立つ

**WebGPU・WebGLは3Dのためだけの機能ではありません**。次のデモは、GPUの高速なグラフィック処理を利用して作られた2D物理演算のシミュレーションです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/160527_liquidfun/samples/sample_pixijs.html)
-   [コードを確認する](https://github.com/ics-creative/160527_liquidfun/)

この作例では、GPUを2D表現に活用できるJSライブラリ「[PixiJS](https://pixijs.com/)」が用いられています。大量の物体や流体のような描画負荷の高い表現では、GPUを使った描画が効果的です。

### ゲームの3D表現に利用

弊社も開発に協力したゲームでは、戦闘機のゲーム画面をWebGLで実装しました。

![](https://ics.media/entry/2328/images/190419_webgl_game.jpg)

-   [CEDEC2018発表資料 「編隊少女 -フォーメーションガールズ-」における3Dレンダリング技術解説 Babylon.jsとBISHAMON WebGL版の合成](https://ics.media/entry/18881/)

ゲーム、広告表現、データビジュアライゼーションなど、GPU描画を必要とするコンテンツは多岐にわたります。

### 対応ブラウザー

2026年現在、WebGPUはChrome・Edge 113以降、Firefox 141以降、Safari 26.0以降などで利用できます。

参照：[Can I use… WebGPU](https://caniuse.com/webgpu)

WebGLはデスクトップ・スマートフォンともに広く対応しています。WebGL 2.0も現行ブラウザーの多くで利用できます。

-   [Can I use… WebGL](https://caniuse.com/webgl)
-   [Can I use… WebGL 2.0](https://caniuse.com/webgl2)

### スマホでもWebGLがぬるぬる動く検証動画

WebGLがスマホのブラウザーでどのぐらい再生できるか録画したので、上のビデオをご覧ください。2014年に録画したビデオなので、検証に用いた端末は古い端末です。それでも**iPhone 6 PlusとiPhone 5sでは滑らかにWebGLが再生できています**。コンテンツの最適化次第なところもありますが、スマートフォンでもGPU描画が有効なことがわかります。

### WebGPU・WebGLを学ぶには

#### Three.jsを学ぶこと

WebGPUやWebGLをそのまま扱うには、レンダリングパイプライン、シェーダー、バッファー、テクスチャーなどの知識が必要です。はなやかな3D表現を作りたい場合は、JavaScriptライブラリ「Three.js」から学ぶのが王道でしょう。

[![](https://ics.media/entry/2328/images/190419_webgl_three.jpg)](https://ics.media/tutorial-three/)

-   [Three.js入門サイト - ICS MEDIA](https://ics.media/tutorial-three/)
-   [Three.jsのWebGPURendererの使い方 - ICS MEDIA](https://ics.media/tutorial-three/webgpu_renderer/)

Three.jsは短いコード量で3Dを実現でき、入門者にも適しています。さらに、Three.jsは入門者に適しているだけでなく、第一線の制作現場でも使われています。

#### WebGPU・WebGLの仕組みを知る

WebGPUの特徴、WebGLとの性能比較、コンピュートシェーダーの可能性については、次の記事で詳しく紹介しています。

-   [WebGPUがついに利用可能に - WebGL以上の高速な描画と、計算処理への可能性](https://ics.media/entry/230426/)
-   [WebGPU対応のThree.jsのはじめ方](https://ics.media/entry/250501/)

WebGPUは、グラフィックス表現だけでなくGPUを使った汎用計算にも利用できます。流体シミュレーションのような表現は、GPUの並列処理と相性がよい題材です。

GPUを描画だけでなく汎用計算に活用する考え方は、記事『[GPGPUを体験しよう！ WebGPUのコンピュートシェーダー入門](https://ics.media/entry/250626/)』で解説しています。コンピュートシェーダーを使って、JavaScriptからGPUによる並列計算を試す入門記事です。

WebGLのプリミティブな知識が欲しい方は次のサイトが役立ちます。WebGLの原理的な仕組みを理解していれば、シェーダーの開発に役立ちます。Three.jsだけでもかなりの表現を開発できますが、シェーダーが使えるとさらにその先の表現ができます。

![](https://ics.media/entry/2328/images/190419_webgl_wgld.jpg)

-   [WebGL 開発支援サイト wgld.org](https://wgld.org/)

WebGLには1.0と2.0があります。現在はWebGL 2.0が多くの現行ブラウザーで対応しており、WebGL 1.0より性能面で有利な仕様がいくつか存在します。

筆者のデモサイト『[ClockMaker Labs](https://labs.clockmaker.jp/)』でも、多数のWebGPU・WebGLの作例を掲載しています。

### まとめ

これからのウェブグラフィックスでは、WebGPUを利用する場面が増えていくでしょう。WebGPUは高性能な描画や計算処理に向いており、Three.jsのようなライブラリから扱いやすくなっています。

WebGPUもWebGLも、ブラウザーで高度な3D表現や2D演出を実現するための重要な技術です。まずはデモを触り、GPUを使ったウェブ表現の可能性を体験してみてください。