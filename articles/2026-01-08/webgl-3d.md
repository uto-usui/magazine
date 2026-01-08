---
title: "WebGL入門 - サンプルで理解する3D表現の迫力"
source: "https://ics.media/entry/2328/"
publishedDate: "2014-09-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

WebGLウェブ・ジーエルとはブラウザで3D表示するための標準仕様。いまやスマートフォンを含むすべてのブラウザでWebGLが動作します。WebGLを使えば**GPUによって描画が高速化されるため**高度なグラフィカル表現が可能になります。

WebGLを使えば主に次のようなコンテンツ開発に役立ちます。

-   3Dモデルの表示
-   ゲームコンテンツ
-   データビジュアライゼーション
-   プログラミングアート
-   魅力的で華やかな画面演出（広告系サイトなど）

かつてはFlash PlayerやUnity Web Playerのようなブラウザ・プラグインを使わなければ3D表現はできませんでしたが、WebGLの登場によってプラグイン未搭載のスマートフォンのブラウザでも3D表現が実現可能になりました。

本記事ではWebGL入門者にむけ、**数秒で試せるオリジナルのWebGLのHTMLデモを多数掲載**。どれもスマートフォンのブラウザでも利用可能です。WebGLの可能性を体験したうえで、WebGLの勉強方法を紹介します。

### 燃え盛る炎の表現

では、実際のデモを再生させて試していきましょう。まずは燃え盛る炎を表現した3Dの作例です。タッチして動かすとアングルが変わります。

![](https://ics.media/entry/2328/images/140919_particle_fire.jpg)

-   [デモを再生する](http://clockmaker.jp/labs/140104_away3d_ts_fires/index.html)
-   [ソースコード](http://clockmaker.jp/labs/140104_away3d_ts_fires/main.ts) (TypeScript)

この作例はもともとFlashで作成されたものですが、WebGLに移植しました。Flashが技術として先行していましたが、WebGLはそれに匹敵する表現力を有していることがわかります。

### タイムリマップ表現

![](https://ics.media/entry/2328/images/150601_threejs_mosaic_DemoIcons.jpg)

-   [デモを再生する](https://ics-creative.github.io/150810_threejs_mosaic/DemoIcons.html)
-   [ソースコード](https://github.com/ics-creative/150810_threejs_mosaic/blob/master/src/DemoIcons.ts)

無数のアイコンが集まっていき、最終的にワードが形成される作例。これも演出途中にスローモーションになるリアルタイムモーショングラフィックスとなっています。これらのデモは記事「[高機能なモーション制作用JSライブラリTweenMaxを使ったタイムリマップ表現](https://ics.media/entry/7162/)」で解説してます。

### 3Dゲームエフェクト

![](https://ics.media/entry/2328/images/demo.png)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160907_magma_effect/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/160907_magma_effect)

ゲームやビジュアライゼーションのウェブコンテンツでは、華やかな3D演出の実装をJavaScriptとWebGLで求められることがあります。このデモは必殺技やオーラのようなものがWebGLで表現可能であるかを試した演出サンプルです。作り方のエッセンスは記事「[エフェクト作成入門講座 Three.js編 ゲーム演出に役立つマグマ表現の作り方](https://ics.media/entry/13973/)」で解説しています。

### 青い粒子の表現

![](https://ics.media/entry/2328/images/140919_particle_flare.png)

-   [デモを再生する](http://clockmaker.jp/labs/140102_away3d_ts_particle_flare/)
-   [ソースコード](http://clockmaker.jp/labs/140102_away3d_ts_particle_flare/main.ts) (TypeScript)

青い粒子が飛散する3Dの作例で、タッチでアングルが変えられます。詳しくは記事「[WebGL対応の本格派フレームワークAway3Dを使ったパーティクルデモ](http://clockmaker.jp/blog/2014/01/webgl-away3d-particle/)」をご覧ください。もともとFlashで作成してましたが、WebGLに移植した作例。

### カバーフローの表現

![](https://ics.media/entry/2328/images/coverflow_threehs_960x540.jpg)

-   [デモを再生する](https://ics-creative.github.io/data-demos/140806_threejs_coverflow/src/index.html)
-   [ソースコード](https://ics-creative.github.io/data-demos/140806_threejs_coverflow/src/CoverFlowApp.ts) (TypeScript)

従来のmacOSのカバーフローの表現をWebGLで作成。画面下側のスライダーを動かすことで、左右の写真にスライドさせることができます。フレームワークには[Three.jsスリー・ジェイエス](https://threejs.org/)を利用。詳しくは記事「[HTML5とWebGLで実現するカバーフローの表現](https://ics.media/entry/1787/)」をご覧ください。

### RGBの三原色分解表現

![](https://ics.media/entry/2328/images/rgb_demo.jpg)

-   [デモを再生する](https://ics-creative.github.io/data-demos/140804_awayjs_rgb/src/0_demo.html)
-   [ソースコード](https://ics-creative.github.io/data-demos/140804_awayjs_rgb/src/RgbDecomposerDemo.ts) (TypeScript)

写真をRGB三原色に分解して3次元で表示するHTML5とWebGLの作例。一見するとただの写真を表示しているだけに見えますが、ステージをドラッグすると写真が赤・青・緑の3原色に分解されます。詳しくは記事「[HTML5で色分解した写真をWebGLで3D表示するAway3Dデモ](https://ics.media/entry/1762/)」をご覧ください。

### 衛星軌道の表現

![](https://ics.media/entry/2328/images/1601_trigonometric_function_demo1.jpg)

-   [デモを再生する](https://ics-creative.github.io/160106_threejs_trigonometric/demo/build/)
-   [ソースコード](https://github.com/ics-creative/160106_threejs_trigonometric/tree/master/demo) (TypeScript)

衛星軌道の実装方法を説明した記事「[WebGL開発に役立つ重要な三角関数の数式・概念まとめ (Three.js編)](https://ics.media/entry/10657/)」の作例。タッチでアングルを回転させることができます。航空路や輸出入のデータビジュアライゼーションで使えそうなテクニックです。

Three.jsの使い方は記事「[Three.js入門サイト](https://ics.media/tutorial-three/)」で解説しています。ブラウザとエディターがあれば簡単につくれるので、ぜひ試してください。

### ゲームの3D表現に利用

![](https://ics.media/entry/2328/images/190419_webgl_game.jpg)

弊社も開発に協力したゲームですが、戦闘機のゲーム画面をWebGLを用いて実装しました。詳しくは次の記事をご覧ください。

-   [「編隊少女 -フォーメーションガールズ-」における3Dレンダリング技術解説](https://ics.media/entry/18881/)

### 2次元表現でもWebGLが役立つ

**WebGLに対して誤解されることが多いのですが、「WebGLは3Dのためだけの機能」ではありません**。WebGLは実は2次元表現でも利用できます。次のデモはWebGLの高速なグラフィック処理を利用して作られた、物理演算のシミュレーションです。

![PixiJSを使った2D物理表現](https://ics.media/entry/2328/images/150530_liquildfun_pixijs.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/160527_liquidfun/samples/sample_pixijs.html)
-   [コードを確認する](https://github.com/ics-creative/160527_liquidfun/)

この作例ではWebGLを2D表現として利用できるJSライブラリ「[Pixi.js](https://pixijs.com/)」が用いられています。**WebGLならでは強力な描画性能は、大量の流体表現に適しているでしょう**。

### WebGLのブラウザ対応状況

2022年現在、WebGLはすべてのデスクトップやスマートフォンのブラウザーで対応しています。具体的には**対応ブラウザはChrome 18以上、Firefox 4以上、Safari 8以上、IE 11以上**となります。

![WebGLサポート状況](https://ics.media/entry/2328/images/images/161012_webgl_caniuse_221006.png)

▲ WebGLの対応状況。中央の行が現行版バージョンを、緑色になっているものがWebGLに対応していることを示します。「[Can I Use](https://caniuse.com/webgl)」より

#### 古いブラウザでのWebGL対応の必要はあるか

結論としては、WebGLを利用するのに、ブラウザのバージョンを気にする必要はありません。

WebGLの採用を躊躇する要因として考えられるのは、WebGLはInternet Exploere 10（IE 10）以下で未対応であることです。ただ、記事「[Internet Explorer 11 はサポートを終了しました。長年のご愛顧ありがとうございました。 - Windows Blog for Japan](https://blogs.windows.com/japan/2022/06/15/internet-explorer-11-is-no-longer-supported/)」によると、すでにInternet Explorerは最終バージョンIE11を含め終了しており、ウェブサイト制作で気にする必要はありません。

### スマホでもWebGLがぬるぬる動く検証動画

WebGLがスマホのブラウザでどのぐらい再生できるか録画したので、上のビデオをご覧ください。2014年に録画したビデオなので、検証に用いた端末は古い端末です。それでも**iPhone 6 PlusとiPhone 5sでは滑らかにWebGLが再生できています**。コンテンツの最適化次第なところもありますが、**デスクトップ向けに制作したデモでもぬるぬる動いていることから、iPhoneのWebGLはとても高速に動作すると言えそうです**。

### WebGLを学ぶには

#### 定番はThree.jsを学ぶこと

WebGLは基本的な技術なので応用の幅が大きいです。「WebGLを使うと、はなやかな3D表現ができるようになる」とイメージを想像している方は、WebGLの代名詞とも言われるJavaScriptライブラリ「Three.js」から学ぶのが王道でしょう。

[![](https://ics.media/entry/2328/images/190419_webgl_three.jpg)](https://ics.media/tutorial-three/)

-   [Three.js入門サイト - ICS MEDIA](https://ics.media/tutorial-three/)

Three.jsは短いコード量で3Dを実現でき、**入門者にオススメのJavaScriptライブラリ**です。さらに、Three.jsは入門者に適しているだけでなく、**第一線の制作現場でも使われています**。WebGLの仕事の半分以上はThree.jsと考えても大げさではないはずです。

#### WebGLの仕組みの理解も

WebGLのプリミティブな知識が欲しい方は次のサイトが役立ちます。WebGLの原理的な仕組みを理解していれば、シェーダーの開発に役立ちます。Three.jsだけでもかなりの表現を開発できますが、シェーダーが使えるとさらにその先の表現ができるようになります。

![](https://ics.media/entry/2328/images/190419_webgl_wgld.jpg)

-   [WebGL 開発支援サイト wgld.org](https://wgld.org/)

#### WebGL 2.0

WebGLにはバージョンがあり、WebGL 1.0とWebGL 2.0があります。現在はWebGL 2.0がすべての現行ブラウザで対応しています（参照「[Can I Use…](https://caniuse.com/webgl2)」）。

WebGL 2.0のほうが性能面で有利な仕様がいくつか存在します。専門的な話になるので、興味のある方はサイト「[Web3D Maniacs](https://ics.media/web3d-maniacs/)」をご覧ください。

#### WebGPU

WebGLの次世代の仕様となりうる技術として「WebGPUウェブ・ジーピーユー」があります。WebGPUは、**より高速なグラフィックス表現を可能にする技術**です。

WebGPUはまだ仕様が策定中で、現在はChromeのみで利用できます。WebGLのほうが現状では実用的ですが、将来的にはWebGPUのシェアが伸びていく可能性があります。WebGPUについて少し注目しておくといいでしょう。WebGPUの詳細は記事『[WebGPUがついに利用可能に - WebGL以上の高速な描画と、計算処理への可能性](https://ics.media/entry/230426/)』をご覧ください。

### まとめ

WebGLを使うとネイティブアプリに遜色ない表現を作ることが可能になり、ブラウザ向けの**ウェブコンテンツの可能性が今後ますます広がるはず**です。当サイトでは記事「[Swift/Unity/Cordova/Adobe AIRのパフォーマンス比較検証](https://ics.media/entry/6137/)」で類似技術と比較しましたが、WebGLは非常に高い性能を有していることを確認しました。

ゲームや広告表現、データビジュアライゼーションなどWebGLを必要とするコンテンツは多岐にわたります。ぜひみなさんもWebGLコンテンツに挑戦してみてはいかがでしょうか？