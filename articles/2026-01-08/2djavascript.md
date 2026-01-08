---
title: "最速の2D描画JavaScriptライブラリは!? 描画性能の比較検証"
source: "https://ics.media/entry/201/"
publishedDate: "2013-04-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

HTML5で2次元のインタラクティブコンテンツを制作するには、さまざまなJavaScriptライブラリがあります。どれを選択するべきか迷いどころではないでしょうか？

そこで今回はHTML5の各種JavaScriptライブラリについて、パフォーマンスを比較検証してみました。

### 今回検証したフレームワーク

メジャーなJavaScirptライブラリとして次の5種類でテストしました。バージョンは2013年4月10日現在の最新版を使っています。詳しい検証方法は記事の後半にまとめています。

-   [CreateJS (EaselJS 0.6.0)](http://clockmaker.jp/labs/130409_objectrender_performance/createjs/index.html)
-   [Arctic.js (v0.1.11)](http://clockmaker.jp/labs/130409_objectrender_performance/arctic/index.html)
-   [enchant.js (v0.6.3-48)](http://clockmaker.jp/labs/130409_objectrender_performance/enchantjs/index.html)
-   [Pixi.js (v1.0.0)](http://clockmaker.jp/labs/130409_objectrender_performance/pixi_canvas/index.html)
-   [Processing.js (v1.4.1)](http://clockmaker.jp/labs/130409_objectrender_performance/processing/index.html)

### 各種JavaScirptライブラリのベンチマーク結果

![](https://ics.media/entry/201/images/130411_performance_cpu.png)

※グラフの数値が高いほどパフォーマンスが高いことを示します

### 考察

Canvas2D(Context2D)においてはpixi.jsがもっとも良く、続いてCreateJSとArctic.jsが続きました （この2つは目立った差ではありません）。**enchant.js はその次でありCreateJSと比べると明らかにパフォーマンスがでていない**ことがわかります。

スマートフォンでも検証しているのですが、PCブラウザと比べると極端にスコアが下がりますが、傾向としてはPCブラウザと同じようです。

なお、Processing.jsは親子構造を実現できなかったため（pImageをpShapeにaddChildできないので）他と実装方法が大きく異なります。今回テストしたなかではもっとも結果が悪かったわけですが、厳密には同列の条件でないのでご注意ください。ただ親子構造の有無を抜きにしても、Processing.jsの画像に対する透過命令のtint()関数の負荷が高いようです。

追記（2013年4月11日）：この検証をうけて shi3z さんがenchant.jsの高速化についての記事を書いていらっしゃいました。現行の enchant.js のボトルネックなどが説明されていて参考になります。

-   [enchant.jsを実験的に高速化 - UEI shi3zの日記](http://d.hatena.ne.jp/shi3z/20130411/1365674602)

追記（2013年4月11日）：この記事の投稿後にさまざまな方が別のJS描画ライブラリで検証してくださいました。ぜひこれらの検証テストもご確認くださいませ！

-   [Procesing.jsの画像の透過処理を高速化  
    ](http://cafe.eyln.com/cgi-bin/wiki/wiki.cgi?page=Diary/2013-4-12)(不憫だったtint()関数の透過処理の高速化ありがとうございます！)
-   [あなたの知らないもうひとつのHTML5フレームワーク『LWF』 | GREE Engineers’ Blog  
    ](http://labs.gree.jp/blog/2013/04/7916/)(LWFはFsiteセミナーでの西澤さんの発表で注目していたのですが、検証ありがとうございます！)
-   [tmlib.js のベンチ (@phi\_jpさん)  
    ](https://x.com/phi_jp/status/322395183775883265)(自作ライブラリの検証ということです。今後のライブラリの進化に期待してます！)

これらを統合すると今回のテストにおいては、Pixi.jsがもっとも高速で、次いでLWFとCreateJSとArctic.jsとtmlib.jsが均衡していて、離れてenchant.jsがあるという感じでしょうか。Processing.jsは透過さえクリアすればこれらと同じ次元の勝負になると思います。

### GPUを使った各種Web技術のベンチマーク結果

つづいてGPUを活用できるWeb技術として、WebGLを利用したCreateJSとPixi.js、FlashのStage3Dを利用したStarlingとStarlingの最適化バージョン（QuadBatchを利用）の4種類を試してみました。

-   [CreateJS (WebGL)](http://clockmaker.jp/labs/130409_objectrender_performance/createjs-webgl/index.html)
-   [Pixi.js (Canvas WebGL)](http://clockmaker.jp/labs/130409_objectrender_performance/pixi_webgl/index.html)
-   [Flash (Starling)](http://clockmaker.jp/labs/130409_objectrender_performance/starling/bin-release/Main.html)
-   [Flash (Starling Batch)](http://clockmaker.jp/labs/130409_objectrender_performance/starling-batch/bin-release/Main.html)

![](https://ics.media/entry/201/images/130411_performance_gpu.png)

※グラフの数値が高いほどパフォーマンスが高いことを示します

グラフで「0」となっている箇所は、WebGLもしくはStage3Dが対応しておらず再生できなかったことを示します。**Flash (Stage3D)がPCのどのブラウザでも動作しているのに対して、WebGLは一部のブラウザ環境でしか再生できません。**

### 考察

GPUを使ったこれらのフレームワークは、Canvas (Context2D)と比べると圧倒的な差があります。

結果としてはGPUを使うPixi.js(WebGL)がもっともパフォーマンスが高く、次いでStarling-Batch(Flash)となりました。CreateJS(WebGL)もパフォーマンスが高いのですがPixi.jsほどではなく、最適化前のStarling(Flash)と近い結果となりました。

WebGLがわずかにStage3Dよりパフォーマンスが良いように思うのですが、Stage3Dは幅広い環境に対応するためDIrectXとOpenGLをラッパーしているので（WebGLはOpenGLのみ）、その分オーバーヘッドがあるのかなと思いました。

### Pixi.jsとStarlingの処理の差の考察

なお、**Pixi.jsは生成時のコストが極めて高く**、表示オブジェクトを大量に生成したときに**数十秒フリーズする現象が発生**します。Pixi.jsは各Spirteの描画命令をテクスチャが同じ限り自動的に1つにまとめています（これをBatchといいます）。Batchを使えばよりGPUの力をより高く発揮できるのですが、Pixi.jsのこのまとめる計算（同じテクスチャが使われているSpriteを調べる計算）が一時的に高い負荷がかかります。

Pixi.jsが自動的にBatch可能なSpriteをまとめるのに対して、Starlingは自動的にはまとめません。そのため明示的にBatch可能なようにスクリプトを実装する必要があります。それを実装したのが今回Flash (Starling-Batch)のデモです。StarlingのBatch(厳密にはQuadBatch)は手動・明示的にやっているためPixi.jsのような同じテクスチャが使われているSpriteを調べる計算が必要なく、**Starling-Batchでは生成時のコストはゼロになります**。Flash (Starling-Batch)のデモで表示するオブジェクトの数値を変更したときにすぐに数が変更できるのもそのためです。

### 比較検証の方法について

比較検証にあたり次の条件を複合したデモを制作して検証しました。

-   移動
-   回転
-   拡縮
-   透明度
-   親子構造
-   表示対象は画像

![](https://ics.media/entry/201/images/130411_performance_test.png)

親オブジェクト（コンテナー）の中には10個の子オブジェクト（画像）を配置しています。この親オブジェクトの数を増やし、最大30fpsを下がった時のオブジェクトの個数をベンチマークの数値としました。

検証環境の詳細

-   PC : iMac / Mac 10.8.2  / Safari 6.0.2 / Corei7 3.4GHz / メモリ16GB / AMD Radeon HD 6970M 2GB (IE10の検証のみParalles DesktopでWindows 8を起動）
-   iOS6 : iPhone 5
-   Android 4.1 : Galaxy S3α

### まとめ

今回はパフォーマンスのみテストしたものの、実際にどのライブラリを使用するかは目的に合わせて選ぶべきと考えています。 processing.jsは少ないコードでスケッチができますし、CreateJSは図形描画・マスクやフィルター機能・強力な制作ソフト「Adobe Flash Professional（現：Adobe Animate CC）」との連携が強みです。他にも学習コストや将来性、動作環境、デバッグの行いやすさ、開発環境の充実度などがあると思います。

動作環境だけ特記すると、**WebGLは2013年現在は使える環境が極めて限定的で商用目的だとまだまだ厳しく、FlashのStage3DはパフォーマンスやどのPCブラウザでも安定して動くのが魅力的**なもののスマホブラウザでは使えず、**Canvas 2DはPC/スマホで使えるがシェア3割のIE8以下で動かず**といった状況です（さらにAndroid機種にはさまざまなバグがある…）。どれを使っても満足にすべての環境を満たすことができないのが2013年でのWeb技術の課題です。

ところでProcessingを除いて**どのJavaScriptライブラリもFlashのDisplayListツリーのAPIに似せて作られている**ので、スクリプトの移植が容易でした。条件を変えれば特性に応じて結果がでてくると思いますので、みなさんも比較するといいと思います。

※いろんな角度から検証したパフォーマンス結果が増えて、JavaScriptライブラリの正しい特性把握ができるようになることを期待してます。

ご意見等がございましたら、ぜひ[私の Twitter アカウント](https://x.com/clockmaker)までお気軽にお寄せくださいませ。

### 謝辞

この検証にあたりかわいいひよこ画像を提供くださった[ひろゆきさん](https://x.com/ProjectNya)、 Processing.jsで協力頂いた [alumican\_net さん](https://x.com/alumican_net)をはじめ、Twitterで多数のフィードバックを頂きました。ここにお礼を申し上げます。

-   [HTML5フレームワークにおける表示オブジェクトのパフォーマンス検証 - Togetter](http://togetter.com/li/485880)