---
title: "Google製ライブラリLiquidFunを使ったHTML5物理演算入門"
source: "https://ics.media/entry/12206/"
publishedDate: "2016-06-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

物理演算とは物体の運動を物理法則に基づき数値計算することです。Web業界ではゲームやビジュアル表現の分野で利用されています。アクションゲームを例にすると、キャラクターが地面に立つ、ジャンプする、重力落下する、壁とぶつかる、坂道を滑り落ちる、といったことが物理演算の実装範囲になります。

本記事ではGoogleが提供するJavaScriptライブラリ「[LiquidFun](http://google.github.io/liquidfun/)」を題材にHTML5で利用可能な物理演算シミュレーションの表現を紹介します。

![liquildfunの公式ウェブサイト](https://ics.media/entry/12206/images/150530_liquildfun_website.png)

▲「[LiquidFun](http://google.github.io/liquidfun/)」の公式サイトではドキュメントやデモが掲載されている

### 物理演算ライブラリ「LiquidFun.js」とは

LiquidFunは2次元の物理演算ライブラリの定番「[Box2D](https://github.com/erincatto/Box2D)」をベースとした拡張ライブラリです。Box2Dが提供する基本的な物理演算機能をはじめ、LiquidFunによるプラスアルファの機能が提供されています。

-   重力 （Box2Dの機能）
-   摩擦/剛体/跳ね返り （Box2Dの機能）
-   衝突判定 （Box2Dの機能）
-   ジョイント （Box2Dの機能）
-   任意の図形での物理演算 （Box2Dの機能）
-   流体 （LiquidFunの機能）

もともとC++で開発されていることもあり、LiquidFunはJavaScriptに限らずAndroid、iOSなどさまざまなプラットフォーム向けにも利用可能です。

オリジナルのBox2Dと異なる点は大きく2点あります。1つは**流体表現向けの機能が充実している**こと、もう1つは「LiquidFun.js」は**「asm.js」が使われている**ということです。後者のasm.jsはJavaScriptのサブセット言語仕様で、通常のJavaScriptと比べ格段に高い計算処理性能を発揮できる技術です（詳しくは後述）。

### 公式サンプルで体験するLiquidFunの機能

LiquidFunで実現できる機能や利点を紹介します。[公式サイトに掲載されているデモ](http://google.github.io/liquidfun/)で特徴を見ていきましょう。[リンク先のデモ](http://google.github.io/liquidfun/)の左上のセレクトボックスでデモの種類を切り替えられます。

#### Soup

[![LiquildFun サンプル : Soup](https://ics.media/entry/12206/images/150530_liquildfun_sample_soup.png)](http://google.github.io/liquidfun/)

シンプルな流体シミュレーション。LiquidFunはその名の通り、流体の計算を得意とします。

#### Elastic Particles

[![LiquildFun サンプル : Elastic Particles](https://ics.media/entry/12206/images/150530_liquildfun_sample_elastic.png)](http://google.github.io/liquidfun/)

流体の一種ですが、ゼリーみたいな表現を作ることができます。五角形の図形はドラッグ・アンド・ドロップで動かすことができます。

#### Sparky

[![LiquildFun サンプル : Sparky](https://ics.media/entry/12206/images/150530_liquildfun_sample_sparky.png)](http://google.github.io/liquidfun/)

衝突時にパーティクルを発生させるデモ。さりげない演出ですが、パーティクルには色が乗っています。これはパーティクルの色情報制御が可能であることを示しています。

#### Wave Machine

[![](https://ics.media/entry/12206/images/150530_liquildfun_sample_wavemachine.png)](http://google.github.io/liquidfun/)

箱の中に入れたパーティクルのシミュレーション。筆者が2013年に試したBox2Dのデモ「[Physics Demo using CreateJS and Box2D](http://clockmaker.jp/labs/130107_createjs_box2d/?200)」と比較すると、LiquidFunのパフォーマンスの高さがわかります。

本記事オリジナルの簡単なサンプルで、LiquidFunの使い方を紹介します。

### 入門向けの簡単なサンプルで学ぼう

**LiquidFunには描画機能がなく座標更新等の計算のみを行います**。そのため、画面に計算結果を表示するにはいずれかの描画ライブラリと組み合わせる必要があります。本記事ではCreateJSとPixi.jsという描画ライブラリを取り上げサンプルを用意しました。

なお、公式サンプルのコードは難解なので、本記事のサンプルはムダを省いてシンプルにしています。詳しいLiquidFunの使い方は今回は割愛しますが、サンプルコードに事細かにコメントを記載していますので参考ください。

#### 表現の自由度を求めるならHTML5 Canvas対応の「CreateJS」と連携

![](https://ics.media/entry/12206/images/150530_liquildfun_createjs.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/160527_liquidfun/samples/sample_createjs.html)
-   [コードを確認する](https://github.com/ics-creative/160527_liquidfun/blob/gh-pages/samples/js/sample_createjs.js)

[CreateJS](https://ics.media/tutorial-createjs/)はHTML5 Canvasを描画ターゲットにしたJSライブラリです。表現の自由度が高く、スマートフォンやデスクトップブラウザで安定した性能が得られます。CreateJSはHTML5ベクターアニメーションソフト「[Adobe Animate CC](https://www.adobe.com/jp/products/animate.html)」との連携が可能なので、表現の自由度が高いことも利点です。

※コードをさらに短くしたバージョンも用意しています。学習の際にはこちらのデモから試してください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/160527_liquidfun/samples/sample_createjs_simple.html)
-   [コードを確認する](https://github.com/ics-creative/160527_liquidfun/blob/gh-pages/samples/js/sample_createjs_simple.js)

#### パフォーマンス重視ならWebGL対応の「Pixi.js」と連携

![](https://ics.media/entry/12206/images/150530_liquildfun_pixijs.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/160527_liquidfun/samples/sample_pixijs.html)
-   [コードを確認する](https://github.com/ics-creative/160527_liquidfun/blob/gh-pages/samples/js/sample_pixijs.js)

[Pixi.js](https://pixijs.com/)はWebGLを描画ターゲットにしたJSライブラリです。WebGLならでは強力な描画性能と、LiquildFun(asm.js)の高速な計算性能の組み合わせは、大量の粒子/流体表現に適しているでしょう。

### なぜ物理演算にasm.js対応が必要なのか

一般的に物理演算は負荷が高い部類の処理となりますが、JavaScript自体は高速な計算処理を得意としません。物理演算を活かすには通常のJavaScriptの性能だと物足りないため、演算性能が高いasm.jsを採用することに意味があります。Box2DのJavaScript移植版「[box2dweb](https://github.com/hecht-software/box2dweb)」は2010年から提供されていましたが、これは通常のJavaScriptとして実行されます。それに対して、LiquidFunはasm.js版としてコンパイルされているため、高い性能が得られると考えられます。

※LiquidFunはC++で開発したモジュールを[LLVM](https://ja.wikipedia.org/wiki/LLVM)にコンパイルし、[emscripten](https://github.com/emscripten-core/emscripten/wiki)を使ってasm.js準拠のJavaScriptファイルに変換。このJavaScriptファイルは機械的なコードとなっているので、CPUにとって計算速度を得やすいというメリットがあります。

![Box2Dの各種言語のパフォーマンス](https://ics.media/entry/12206/images/150530_box2d_graph.png)

▲参考「[Box2d 2014 Update](https://j15r.com/projects/bench2d/box2d-2014/)」より。ネイティブのC言語との性能比較のグラフで、左側にプロットされている方が高速であることを示す。LiquidFunを扱ったグラフでないが、Box2Dのasm.js版の性能がわかる（LiquidFunは上図の「asm.js」とプロットされているスコアとほぼ一致するはずである）。

### 最後に〜物理演算ライブラリには型情報が必須

物理演算はライブラリを利用することで実装工数を抑えられるものの、実装以前に多大な学習時間を要します。JavaScriptでの物理演算はFlash/ActionScript 3.0と比べて難しいと筆者は考えていますが、それはBox2D/LiquidFunが有する多数のメソッドやプロパティの理解が大変だからです。コード補完のあるエディターを使うと学習負荷が軽減されるため、TypeScript等の型情報のある言語の採用を強くオススメします。

次回はLiquidFunを応用した作例を紹介したいと思います。お楽しみください。