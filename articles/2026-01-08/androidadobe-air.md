---
title: "モバイルアプリ開発者必見！初期型から最新のAndroid端末まで、Adobe AIR製アプリのパフォーマンス徹底検証"
source: "https://ics.media/entry/6/"
publishedDate: "2013-02-13"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

[Adobe AIRの技術](http://www.adobe.com/jp/products/air.html)を使えば、FlashでAndroid/iOS向けアプリを作成できます。それもPCブラウザ向けに作っているFlashコンテンツもコード（設定ファイル関係）を少し変更すれば、モバイルアプリに容易に移植できるので、ワンソース・マルチプラットフォームとして**Flashは幅広くコンテンツ・アプリ制作に役立てることができます**。

しかし、気になるのはAIRアプリのパフォーマンスではないでしょうか。そこで**Androidの新旧さまざまな端末を使ってパフォーマンスを検証**してみました。

### 2Dゲームのパフォーマンス

まずは**2Dゲームでのパフォーマンスの紹介**です。Stage3Dのフレームワーク「Starling」のサンプルとして[ソースが配布されている「Whack」](https://github.com/byxb/whack)を使って、各Android端末で再生させてみました。左上からNexus One、左下がGalaxy Tab（初代）、右上がXperia Arc、右真ん中がGalaxy S2、右下がGalaxyS3αで、古い機種から新しい機種を順番に並べています。

ちなみにこのゲームは[こちらのURL](http://www.whacksite.com/)でPCブラウザで試すこともできます。

パフォーマンスとしては全体的に良好なのですが、**とくにXperia Arc（2011年春モデル）から非常に高いパフォーマンスで動いている**ことが確認できます。Galaxy Tabは表示面積が大きいため若干再生速度が落ちていますが、ゲームのプレイには不自由ないパフォーマンスではないでしょうか。Nexus One （2010年1月）など古い端末でも再生できているところがポイントです。

### 3Dのパフォーマンス (カバーフロー)

iTunesやmacOSでよく使われているカバーフローの表現。これはStage3DのフレームワークAway3Dを使って作成したものです（[著書「Stage3Dプログラミング」](https://ics-web.jp/showcase/stage3d_book)のサンプルでもあります）。テスト端末は、画面左上からNexus One, 左下Galaxy S, 右上Galaxy S2, 右下Galaxy Note2 で、左上側から右下側に向かって新しい機種を並べています。

ちなみにこのデモは[こちらのURL](https://ics-creative.github.io/data-demos/130214_coverflow/CoverFlowStep3.html)でPCブラウザで試すこともできます。

基本的にどの端末も滑らかに動いていますが、Nexus One （2010年1月に発売されたHTC製の端末）だけとくにタップの反応が悪いことがわかります。対して、**Galaxy S（2010年10月に発売されたサムスン電子製の端末）はタップの反応も良好かつ動きも滑ら**かです。3Dコンテンツの制作を考える場合は、Nexus Oneの世代 （2010年初頭のモデル）は厳しく、Galaxy S以降（2010年秋モデル）からを想定したほうが良さそうです。

### 3Dのパフォーマンス （キャラクターアニメーション）

3Dのキャラクターアニメーションがどれだけ再生できるかを測定したビデオです。3Dのキャラクターはモデリングソフト「3ds MAX 2012」で作成したものを、Flash Stage3Dのフレームワーク「Away3D 4.0」で表示・再生させています。テスト端末は、画面左からNexus One, Galaxy S, Galaxy S2, Galaxy Note2 で、左から右に向かって古い機種から新しい機種を並べています（以下のビデオではすべてこの順番です）。

ちなみにこのデモは[こちらのURL](http://ics-web.jp/demos/121025_away3d_animation/)でPCブラウザで試すこともできます。

基本的にどの端末も滑らかに動いていますが、カバーフローのデモと同様にNexus Oneだけとくにタップの反応が悪かったのでタップはしていません。Galaxy S（2010年10月発売）以降の端末はどれも滑らかかつタップの反応が良好です。

### 2Dのパフォーマンス （Stage3Dのパフォーマンス測定）

花のイラストのオブジェクトをどのくらいの個数を表示できるか測定したビデオです。少ない数から表示していき、どのくらいまで多くのオブジェクトを表示できるかを検証しました。

ちなみにこのデモは[こちらのURL](https://ics-creative.github.io/data-demos/130214_mobile_starling/Main.html)でPCブラウザで試すこともできます。

**とくにモバイルAIRにおいてStage3Dのパフォーマンスは良好**で、どの端末も高いスコアを記録しています。フレームレート30fpsを保つことのできるオブジェクトの最大個数を測定してみたのですが、グラフ表示させると次のような結果となりました。ビデオには録画していませんが、他にも検証した端末（Galaxy S3α、Xperia Arc、Galaxy Tab）があるのでそれらも含めています。

![2D - Stage3D using Starling (Number of objects with keeping 30fps) ](https://ics.media/entry/6/images/130213_2d_starling.png)

-   Nexus One（2010年1月発売）: 2000個
-   Galaxy S（2010年10月発売） : 1400個
-   Galaxy Tab（2010年11月発売） : 2000個
-   Xperia Arc（2011年3月発売）: 3200個
-   Galaxy S2（2011年6月発売） : 7200個
-   Galaxy Note2（2012年11月発売） : 5600個
-   Galaxy S3a（2012年12月発売）: 5400個

**Galaxy S3αなど最近の端末は5000個以上のオブジェクトの表示に成功**しています。対して初期の端末であるNexus One、Galaxy Sであっても2000個近くのスコアを残せています。コンテンツの制作においてこれだけ表示できるのであれば、描画パフォーマンスとしては問題無さそうです。

### 2Dのパフォーマンス （DisplayListの計測）

Flashといえば従来DisplayListが用いられてきました。Flash Proで作成するものも基本的にはDisplayListなのでもっとも使われている方法と言えるでしょう。このDisplayListを利用した場合にどのぐらいのパフォーマンスがでるのか測定してみました。

AIRにはレンダリングモードがCPUとGPUとダイレクトの3種類選べるのですが、DisplayListの処理としてはもっとも正確に表示できるレンダリングモードはCPUとしています。Stage3D(Starling)のデモと同じ表現ですので、DisplayListとStage3Dのパフォーマンス比較としても参考になるかと思います。

ちなみにこのデモは[こちらのURL](https://ics-creative.github.io/data-demos/130214_mobile_displaylist/Main.html)でPCブラウザで試すこともできます。

[![2D - DisplayList (Number of objects with keeping 30fps) ](https://ics.media/entry/6/images/130213_2d_displaylist.png)](https://ics.media/entry/6/images/130213_2d_displaylist.png)

-   Nexus One（2010年1月発売） : 400個
-   Galaxy S（2010年10月発売） : 600個
-   Galaxy Tab（2010年11月発売） : 400個
-   Xperia Arc（2011年3月発売） : 600個
-   Galaxy S2（2011年6月発売）: 1000個
-   Galaxy Note2（2012年11月発売） : 800個
-   Galaxy S3a（2012年12月発売） : 1000個

Stage3Dのデモに比べるとDisplayListのスコアが1/2〜1/7ほどの結果となりました。最低のスコアが400で最大が1000です。Nexus Oneや初代Galaxy、Xperia Arcは400〜600個のオブジェクト表示なので、少し心許ないスコアです。DisplayListでの構築は、シンプルなグラフィックのコンテンツであったり、徹底的に最適化したコンテンツに使用が限られそうです。

### 2Dのパフォーマンス （BitmapDataの計測）

Flashの従来の高速化手法として有名なのが、BitmapDataを利用した「Blitting」という方式です。昔、[wonderfl](http://wonderfl.net/)で流行した[パーティクル祭り](http://clockmaker.jp/blog/2009/04/particle_fes/)などでも利用されていた高速化手法で、Bitmap内のピクセル情報を編集することによって、Flashの描画負荷を最小限に留めることができます。この手法を使うことで、古い端末でどのくらい動作するのか測定してみました。

ちなみにこのデモは[こちらのURL](https://ics-creative.github.io/data-demos/130214_mobile_2d_blitting/Main.html)でPCブラウザで試すこともできます。

![2D - BitmapData (Number of objects with keeping 30fps) ](https://ics.media/entry/6/images/130213_2d_bitmapdata.png)

-   Nexus One（2010年1月発売） : 1000個
-   Galaxy S（2010年10月発売） : 1750個
-   Galaxy Tab（2010年11月発売） : 750個
-   Xperia Arc（2011年3月発売）: 1500個
-   Galaxy S2（2011年6月発売） : 4000個
-   Galaxy Note2（2012年11月発売） : 4000個
-   Galaxy S3a（2012年12月発売） : 4000個

結果としては最低のスコアが750で最大が4000であり、比較的良好な結果となりました。ただ、Galaxy Tabの結果がNexus Oneより低いなど、この手法は表示領域の影響するので、高解像度のデバイスではやや不利かもしれません。

測定しているデモが異なっているので正確な判定ではないですが、BlittingよりStage3D (Starling)のほうがパフォーマンスがでている感触がありました。

### 3Dのパフォーマンス（ポリゴン数の計測）

3Dの立方体のオブジェクトをどのくらいのポリゴンを表示できるか測定したビデオです。少ない数から表示していき、どのくらいまで多くのポリゴンを表示できるかを検証しました。

ちなみにこのデモは[こちらのURL](https://ics-creative.github.io/data-demos/130214_mobile_away3d_cubes/ParticleCubes.html)でPCブラウザで試すこともできます。

![3D - Stage3D using Away3D (number of polygons with keeping 30fps)](https://ics.media/entry/6/images/130213_3d_away3d.png)

-   Nexus One（2010年1月発売）: 2592△（ポリゴン）
-   Galaxy S（2010年10月発売） : 49152△
-   Galaxy Tab（2010年11月発売） : 40500△
-   Xperia Arc（2011年3月発売） : 15972△
-   Galaxy S2（2011年6月発売）: 111132△
-   Galaxy Note2（2012年11月発売） : 165888△
-   Galaxy S3a（2012年12月発売） : 165888△

**最新の端末（Galaxy S2以降）では10万ポリゴンを超える表示ができている**ので、3Dコンテンツを制作するにはポリゴン数的には**十分なパフォーマンスを持っている**と言えるでしょう。（その他にも3Dは、ドローコールの回数や、ライトの有無、マテリアルの質感、ボーンアニメーション有無などのパフォーマンスを決定するさまざまな要因があるので、実現したい機能に合わせて個別に検証するのがいいでしょう）

対して、Nexus Oneは2592△、Xperia Arcは15972△で、Galaxyの最新端末に比べると数値は今ひとつな印象です。ただ一昔前（2007〜2009年頃）にFlash（Papervision3D）を用いたスペシャルサイトを作ることが流行った時期がありましたが、その頃のポリゴン数は数百〜2千ぐらいが一般的でした。限られたポリゴン数の制約のなかで[優れた表現のコンテンツが多々あったこと](http://www.anotherbookmark.com/#/search/cGFwZXJ2aXNpb24zZA==/bookmark)を考慮すると、ローポリであればAndroidの古い端末でもさまざまな3Dアプリの開発に役立てられそうです。

### まとめ

特定の機種Nexus Oneだけが結果としては厳しいものとなりましたが、Galaxy S以降の端末は基本的に優良な結果だと思います。Stage3DとはFlashからGPUを利用するための技術のことですが、**とくにStage3Dを利用した場合にFlashのパフォーマンスが劇的に上がっている**ので、Stage3Dを積極的に利用するといいかもしれません。今回の検証では一般的なコンテンツを制作するうえで必要となる30fpsをターゲットにしていましたが、Stage3Dを利用するとモバイルAIRで60fpsを発揮することができることもできます。

今回は検証できませんでしたが、次回はiOS端末についても検証して報告したいと思います。次回の記事もご期待ください。よろしくお願いします。