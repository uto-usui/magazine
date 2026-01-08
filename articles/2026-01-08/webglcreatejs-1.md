---
title: "WebGLに対応し高速化したCreateJSの描画性能を探る"
source: "https://ics.media/entry/1291/"
publishedDate: "2014-01-22"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

インタラクティブコンテンツ制作に役立つHTML5向けのフレームワークCreateJS ([使い方は入門サイトを参照ください](https://ics.media/tutorial-createjs/))。2014年1月に公式ブログでWebGLサポートが発表されました（参照記事「[WebGL Support in EaselJS](http://blog.createjs.com/webgl-support-easeljs/)」)。公式ブログによると**パフォーマンスが従来比の6〜50倍**にも達するとのことです。

果たしてどのぐらいの性能があるのか気になりましたので、以前の検証記事「[HTML5開発者必見、最速のJavaScriptライブラリはどれだ!? パフォーマンスの徹底検証](https://ics.media/entry/201/)」を元に、WebGL対応版の**CreateJS(描画を扱うJSライブラリ「[EaselJS](http://www.createjs.com/#!/EaselJS)」)のパフォーマンスを比較検証**してみました。検証に用いたデモは次のリンクをクリックすることで再生できます。

-   [CreateJS (EaselJS 0.7.1)](http://clockmaker.jp/labs/140121_performance/createjs/index.html) : 従来版。CanvasのContext2Dが利用されている。
-   [CreateJS (EaselJS-NEXT)](http://clockmaker.jp/labs/140121_performance/createjs-2014-jan/index.html) : WebGL版。CanvasのWebGL APIが利用されている。

### CreateJSライブラリのベンチマーク結果

![](https://ics.media/entry/1291/images/2014-01-21_1.png)

パフォーマンス計測の結果は上記となりました。グラフで一目瞭然だと思いますが、気づいた点は以下のとおりです。

1.  **WebGL版のCreateJSのパフォーマンスは圧倒的に高い**
2.  WebGL未対応のブラウザでは**自動的にフォールバックし、通常版CreateJSとほぼ同等のパフォーマンスがでる**
3.  **Androidの一部のブラウザではWebGLに対応**しており、高いパフォーマンスが発揮できる

### 1\. WebGL版のCreateJSのパフォーマンスは圧倒的に高い

**WebGL対応版のほうがほとんどのブラウザで圧倒的に高いスコアを記録**しています。[公式ブログの記事](http://blog.createjs.com/webgl-support-easeljs/)でも紹介しているベンチマーク結果とほぼ同じ傾向がでていました（記事「[WebGL Suppert in EaselJS](http://blog.createjs.com/webgl-support-easeljs/)」より）

[![](https://ics.media/entry/1291/images/1ff2f34490e01fc72dd4d415b21fd04a.png)](http://http//blog.createjs.com/webgl-support-easeljs/)

### 2\. WebGL未対応のブラウザでは自動的にフォールバックする

WebGLは一部のブラウザでしか利用できません。とくにiOS SafariがWebGLをサポートしていないので、モバイルも視野にいれるとWebGLが再生できない場合の対策を本来は行わなければなりません。

※2014年9月にiOS 8でWebGLがサポートされたことで、多くのブラウザ環境でWebGL高速化の恩恵が請けれるようになりました (参照「[iOS8向けにWebGLのHTML5デモを作ってみた](https://ics.media/entry/2328/)」)。

![](https://ics.media/entry/1291/images/140122_ios.jpg)

▲WebGLに未対応の環境では、CreateJSは自動的に再生可能な方式にフォールバックする

### 3\. Androidの一部のブラウザではWebGLに対応している

もう1つ特徴的だったのが、AndroidのFirefoxブラウザです。Context2D方式だとほとんどスコアがでなかったのですが、WebGL版はスコアがその25倍に達しています。**AndroidのFirefoxはモバイルブラウザのなかでもWebGLにいち早く対応**したこともあり、開発に力を注いでいるのかもしれません。

![](https://ics.media/entry/1291/images/140122_firefox.jpg)

▲Android FirefoxではWebGLに対応しており、パフォーマンスが高い

### 他の描画系JSライブラリとの比較

また他のJSライブラリとスコアを比較してみました。GPUをフル活用する技術（WebGLやFlashのStage3D）の性能が高い事がわかります。HTML5 CanvasのContext2Dを利用するCreateJS（従来版）やenchant.jsと比べ、WebGLを利用するCreateJS、Pixi.jsが圧倒的なスコアを記録しています。WebGL対応のCreateJSは、ブラウザにもよりますが、Flashのライブラリ「Starling」と同じ次元のスコアを達成することができました。

-   [CreateJS (EaselJS 0.7.1)](http://clockmaker.jp/labs/140121_performance/createjs/index.html) : Context2D版
-   [CreateJS (EaselJS-NEXT)](http://clockmaker.jp/labs/140121_performance/createjs-2014-jan/index.html) : WebGL版
-   [enchant.js (v0.8.0)](http://clockmaker.jp/labs/140121_performance/enchantjs/index.html)
-   [pixi.js (v1.4.1)](http://clockmaker.jp/labs/140121_performance/pixi_canvas/index.html) : Context2D版
-   [pixi.js (v1.4.1)](http://clockmaker.jp/labs/140121_performance/pixi_webgl/index.html) : WebGL版

![](https://ics.media/entry/1291/images/00b26f1743fcaae6d85698645205f305.png)

※Pixi.jsはWebGLとContext2Dと別々に検証しましたが、本来はフォールバックが可能なオプションが存在します。

### まとめ〜普及が進むCreateJS〜

最近**MozillaがCreateJSのスポンサーに加わったり**、オーサリングソフト[Adobe Flash Professional CC](http://www.adobe.com/jp/products/flash.html)の「[HTML5 Canvasドキュメント](http://helpx.adobe.com/jp/flash/using/creating-publishing-html5-canvas-document.html)」の基幹にCreateJSが採用されたこともあり、Canvasを制御するJSライブラリとして**CreateJSが確固たる存在**になってきたように思います。 ICS MEDIAでは引き続き、CreateJSの動向に注目します。

![](https://ics.media/entry/1291/images/140122_FlashProCC.png)

▲Flash Pro CCのスタートアップ画面

### 参考

-   [Mozilla Sponsors CreateJS](http://blog.createjs.com/mozilla-sponsors-createjs/) (現在のスポンサーはAdobe, Microsoft, AOL, Mozillaとなります）

### 本記事の検証環境

-   iMac (27-inch, Mid 2011) / Intel Core i7 3.4 GHz / メモリ16 GB
-   Apple iPhone 5s
-   Samsung Galaxy S3