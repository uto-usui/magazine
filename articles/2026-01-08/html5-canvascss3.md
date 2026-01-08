---
title: "HTML5 CanvasとCSS3のスマホブラウザでの描画性能"
source: "https://ics.media/entry/306/"
publishedDate: "2013-05-27"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

スマートフォンのブラウザでどの程度のグラフィック表現が可能なのか、性能が気になりませんか？　近年、HTML5を利用できる分野はウェブサイトのみならず、ゲームやSPA（シングルページアプリケーション）など多岐に渡っています。そこで、本記事ではiOSやAndroidの新旧さまざまな端末を使ってパフォーマンスを検証。記事の前半では描画性能を、後半ではJavaScriptの計算性能を測定しています。

### 描画性能の検証ビデオをご覧ください

さまざまな端末を使って、描画検証の様子を録画しました。この80秒の動画では画像のオブジェクトの表示可能な個数を測定しています。ビデオの後半が見どころで、iPhone 5のパフォーマンスが良すぎてビデオを早送りするほどスコアがでるまで時間がかかっています。  

### さまざまな端末のスコアを測定しました

次の表に、2012年までに発売されたスマートフォンのスコアを掲載しました。`canvas`だけではなくCSS3の`transform`プロパティを使った手法についても同様の見栄えのデモを作成しテストしています。**HTML5でどの方法がもっともパフォーマンスがいいか把握するため**です。

▼HTML5描画パフォーマンス検証 （数値が高いほど高速）

![HTML5描画パフォーマンス検証](https://ics.media/entry/306/images/130527_graff_1.png)

※1 : translate3dで最初の数匹が点滅  
※2 : translate3dでrotate,scaleが適用されていない  
※3 : transform(3D)が点滅し採点不可

### 検証方法について

計測方法は、位置・スケール・回転をオブジェクト毎にランダムに設定し、毎フレーム移動が発生するもので時間経過とともにオブジェクト数を増やしています。直前3回のフレームレートの平均が24fpsを下回った段階での、表示されているオブジェクトの個数をスコアにしています。検証は[こちらのリンク](https://ics-creative.github.io/data-demos/130527_html5_sp/)から確認できます。

▼BunnyMark方式でスコアを計測

![BunnyMark方式でスコアを計測](https://ics.media/entry/306/images/130527_bunnymark.png)

### 描画テストの考察

iOS 4では`canvas`要素の性能は低かったのですが（参考「[CanvasタグとJavaScriptで3Dのデモを作ってみました](http://clockmaker.jp/blog/2010/10/canvas_js_demo/)」)、iOS 6では`canvas`タグの性能が高い結果となりました。

Androidの各種ブラウザはiOSに比べ描画パフォーマンスが劣っている点で印象的でした。ブラウザの描画部分の最適化が遅れているのかもしれません。下記に気づいた点を箇条書きでまとめています。

-   Appleのデバイスはとくに`canvas`タグの描画パフォーマンスの性能が優れている
-   ただしiPad1(iOS 4)の頃の`canvas`タグの性能は優れない
-   Androidにおいて、標準ブラウザはChromeより描画パフォーマンスが優れている
-   transform(3D)はAndroid 2.x系の標準ブラウザや、最新版のFirefoxで不具合があるので注意が必要
-   AndroidのFirefoxはパフォーマンスが標準ブラウザやChromeに比べ劣る

### iPhone 5s以降の描画性能について （2018年11月追記）

2016年10月現在で最新のiPhone 7までの端末で同一の検証を実施しました。`canvas`要素の描画性能はiPhoneの世代ごとの性能を顕著に示しています。iPhone 3GSでは152だったスコアが、iPhone Xでは9081です。**最新世代のiPhone 7 PlusはiPhone 3GS（2009年）に比べて60倍の、iPhone 5（2012年）に比べて4.7倍のスコアが得られることがわかりました**。

機種名

OS

canvas

transform(2D)

transform(3D)

iPhone 5s

iOS 10.0

1920

460

457

iPhone 6 Plus

iOS 10.0

2920

709

572

iPhone 6s Plus

iOS 10.0

4194

1464

970

iPhone 7 Plus

iOS 10.0

5373

1411

875

iPhone X

iOS 12.1

9081

2388

1234

iPad Pro 2018

iOS 12.1

20177

4899

2957

HTML5 CanvasのiPhone各世代別のスコアをグラフにプロットしました。グラフのスコアが高いほど、性能が高いことを示します。

![HTML5 CanvasのiPhone各世代の性能グラフ](https://ics.media/entry/306/images/161013_html5_performance_canvas.png)

### JavaScriptの計算テスト

JavaScriptの数値演算でどのくらいのパフォーマンスがでるのか測定しました。スコアが小さいほど良好な結果であることを示します。

▼JavaScript計算パフォーマンス検証 （数値が低いほど高速）

![](https://ics.media/entry/306/images/130527_graff_2.png)

※iPad 1はスクリプトタイムアウトし結果が取得できなかったためN/Aとしています

ベンチマークは、Box2Dのstep計算における平均時間（ミリ秒）をスコアとしました。スコアが小さいほど良好な結果です。検証はから確認できます。

-   [スマートフォン検証- ICS MEDIA](https://ics-creative.github.io/data-demos/130527_html5_sp/)

### 計算テストの考察

JavaScriptの計算に関してはデバイスに搭載されているCPUの性能が顕著にあらわれています。もっともスコアが良かったのはGalaxy S3αのFirefoxです。端末ごとのスペックの差が大きい点に実装時は注意が必要となりそうです。

### iPhone 5s以降のJavaScriptの性能について （2018年11月追記）

2016年10月現在で最新のiPhone 7までの端末で同一の検証を実施しました。JavaScriptの計算でもiPhoneの世代ごとの性能差が顕著です。iPhone 3GS（2009年）では1188ミリ秒かかった計算が、iPhone X（2017年）では11ミリ秒しかかかっていません。**108倍も高速です**。

機種名

OS

Score(msec)

iPhone 5s

iOS 10.0

70

iPhone 6 Plus

iOS 10.0

44

iPhone 6s Plus

iOS 10.0

29

iPhone 7 Plus

iOS 10.0

21

iPhone X

iOS 12.1

11

iPad Pro 2018

iOS 12.1

9

JavaScriptのiPhone各世代別のスコアをグラフにプロットしました。グラフのスコアが低いほど、性能が高いことを示します。

![JavaScriptのiPhone各世代別のスコアをグラフ](https://ics.media/entry/306/images/161013_html5_performance_js.png)

### まとめ

描画パフォーマンスにおいてはiOSが現時点では非常に優れており、これだけパフォーマンスがあれば**Flash Playerで実現していたようなリッチな表現がiPhoneやiPadデバイス上で展開できる**と思います。

Appleがアプリ市場のためにブラウザでのリッチコンテンツ（ゲーム等）を牽制しているとよく言われます。しかし**Appleのデバイスがもっともブラウザの描画パフォーマンスが良く、この矛盾している事実は興味深いのではないでしょうか**。

当サイトでは他にもさまざまな視点からHTML5などの技術のパフォーマンスを検証しています。次の検証記事も合わせて把握することで、開発時に役立てることができるはずです。あわせて参照くださいませ。

-   [JavaScriptの描画ライブラリの比較検証](https://ics.media/entry/201/)
-   [Adobe AIR製アプリのパフォーマンス検証](https://ics.media/entry/6/)
-   [スマホブラウザのWebGL描画性能を検証](https://ics.media/entry/2372/)
-   [iOSにおけるSwift/Unity/PhoneGap/Adobe AIRの比較検証](https://ics.media/entry/6137/)

### 参考情報

-   iPhone 3GS（2009年6月発売）
-   iPhone 4（2010年6月発売）
-   iPhone 4s（2011年10月発売）
-   iPhone 5（2012年9月発売）
-   iPhone 5s（2013年9月発売）
-   iPhone 6 Plus（2014年9月発売）
-   iPhone 6s Plus（2015年9月発売）
-   iPhone 7 Plus（2016年9月発売）
-   iPad 1（2010年5月発売）
-   iPad 2（2011年4月発売）
-   iPad mini（2012年11月発売）
-   iPod touch 4th（2010年9月発売）
-   iPod touch 5th（2012年9月発売）
-   Nexus One（2010年1月発売）
-   Galaxy S（2010年10月発売）
-   Galaxy Tab（2010年11月発売）
-   Xperia Arc（2011年3月発売）
-   Galaxy S2（2011年6月発売）
-   INFOBAR A01 （2011年12月発売）
-   Galaxy Note2（2012年11月発売）
-   Galaxy S3a（2012年12月発売）
-   HTC J Butterfly（2012年12月発売）