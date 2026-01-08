---
title: "スマホでもWebGLは爆速！ スマホブラウザの描画性能を徹底検証 （HTML CanvasとWebGLを利用）"
source: "https://ics.media/entry/2372/"
publishedDate: "2014-09-24"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

スマートフォン向けのウェブコンテンツでもWebGLを採用すれば高速な描画性能が得られます。たとえば、ゲームやデータビジュアライゼーション、3D表示、広告向けスペシャルコンテンツといった分野でWebGLが役立つでしょう。iOSとAndroidも含め[今やほとんどのスマートフォンでWebGLが利用可能といっても差し支えない](https://caniuse.com/webgl)状況です。この記事ではスマートフォンにおけるWebGLの描画性能を検証し、その結果を紹介します。

### 動作検証ビデオで見る各種スマートフォンの性能差

多くのパーティクル（粒子）を大量に表示することで描画性能を検証しました。パーティクルの数が多いほど高性能であることを示します。

ビデオ撮影の検証に用いたのは画面左上から順に次の端末となっています。検証時期（記事執筆時）は2014年のため、今となっては数世代前の古い端末が多いことはご了承ください。

-   ① Xperia A（Android 4.1 / WebGLが無効）
-   ② Xperia A（Android 4.2.2 / **WebGLが有効**）
-   ③ iPhone 5（iOS 7 / WebGLが無効）
-   ④ iPhone 6（iOS 8 / **WebGLが有効**）
-   ⑤ iPhone 6 Plus（iOS 8 / **WebGLが有効**）
-   ⑥ iPad mini（iOS 7 / WebGLが無効）
-   ⑦ iPad mini Retina（iOS 8 / **WebGLが有効**）

**WebGLが有効の端末では滑らかな動作**であることが確認できます。同じ端末でもOSのバージョンによってWebGLの利用可否が異なっており、WebGLが利用できる場合は無効の場合に比べてスコアが数倍になるとことがわかりました。

※①の端末のスコアが途中からズレてしまったのは手違いとなります（すでに性能限界を超えているので、結果はほぼ変わらないはずです…)

### 世代と利用テクノロジーの違いからみる端末の検証結果

ビデオで記録したスマホ以外にもさまざまな端末を用いて検証しました。結果は次の表の通りになっています（スコアが高いほどパフォーマンスが高いことを示します）。iOS 8以上のSafariのパフォーマンスが群を抜いて良好であることがわかります。

▼ 各種スマートフォンでのスコア一覧。iOSやAndroidの各世代の性能差を確認できます。

![各種スマートフォンにおけるWebGLとHTML Canvasのスコア検証結果](https://ics.media/entry/2372/images/151210_webgl_all.png)

▼ iOS端末（iPhone / iPad）での各種ブラウザでのスコア一覧。ブラウザごとの性能差を確認できます。

![iPhoneにおけるWebGLとHTML Canvasのスコア検証結果](https://ics.media/entry/2372/images/151210_webgl_ios.png)

▼ Android端末での各種ブラウザでのスコア一覧。ブラウザごとの性能差を確認できます。

![AndroidにおけるWebGLとHTML Canvasのスコア検証結果](https://ics.media/entry/2372/images/151210_webgl_android.png)

詳しい詳細結果は次の[Google Driveの検証資料](https://docs.google.com/spreadsheets/d/1dVcvX6QJVh9L0ef_7h3_cO_4ASUP5u5TIRPLY8P02tQ/edit?usp=sharing)に掲載していますのでご覧ください。

### 検証環境の仕様

検証に利用したデモは次の仕様としています。

-   CreateJS(WebGL対応版のEaselJS)を利用
-   エンターフレーム処理には`RequestAnimationFrame`を使用
-   「+」ボタンを押していき、フレームレートが40FPS以上をキープできるオブジェクトの数値をスコアとする
-   WebGL未対応の環境では自動的にHTML Canvas(CanvasRenderingContext2D)にフォールバックする
-   High DPI(高解像度、例：Retina Display)に対応させた場合と、対応させなかった場合のパフォーマンスの差も検証する

検証に用いたデモは次から再生して試すことができます。

![WebGLとHTML Canvasの検証デモ](https://ics.media/entry/2372/images/thumb.png)

-   [デモを再生する（別ウインドウ）](http://clockmaker.jp/labs/140120_createjs_webgl/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/140120_createjs_webgl/tree/master/src)

### 検証の結果

-   **iOS 8以上のWebGLはSafari/Chromeともに挙動が安定**しており、パフォーマンスも良好
-   **iOS SafariはiOS ChromeよりWebGLの描画パフォーマンスが3倍ほど高いスコアが得られた。**HTML Canvasにおいても同じ傾向の結果が得られた。ChromeはWebView（当時のChromeはUIWebView）を使っているため、JavaScriptの実行速度が遅いからだと推測できる
-   Retina Display等の高解像度（High DPI）対応をしても、フレームレートへの影響はほとんど無かった。2D表現においてはWebGLでは積極的に高解像度対応で構築するのが良さそうだ
-   一世代前のiPhone 5sと新モデルのiPhone 6/6 Plusのスコアがほとんど変わらないのがおもしろい結果だった。プロセッサの性能が上がった分が、広くなった画面サイズのレンダリングに回っているのかもしれない
-   **同じ端末でもiOS 7からiOS 8にアップデートすると、WebGLが有効になるため高いスコアが得られる** （iPad 3の結果）
-   iPhone 6s PlusではWebGLの性能が非常に高く、検証デモでのほぼ上限値のスコアとなった
-   AndroidでのWebGLのパフォーマンスは機種やブラウザによって大きく異なる

### 考察

![](https://ics.media/entry/2372/images/140924_ios.jpg)

▲ iOS 8でWebGL対応したことでグラフィカル表現の可能性が広がった

iOSのブラウザは以前からHTML Canvasのパフォーマンスが良かったのですが、WebGLに対応したことでパフォーマンスが飛び抜けて向上しました。これだけパフォーマンスがよければ、**スマートフォンのネイティブアプリに匹敵するグラフィカル表現をスマートフォンのブラウザで展開することが可能**になるのではないでしょうか？　記事「[iOSにおけるSwift/Unity/PhoneGap/Adobe AIRのパフォーマンス比較検証](https://ics.media/entry/6137/)」で検証したように、WebGLは十分なパフォーマンスを秘めています。

当サイトでは他にもさまざまな視点からHTMLなどの技術のパフォーマンスを検証しています。別の検証記事も合わせて把握することで、開発時に役立てることができるはずです。関連記事もあわせて参照くださいませ。