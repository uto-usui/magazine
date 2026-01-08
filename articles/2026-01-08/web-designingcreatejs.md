---
title: "月刊誌Web Designingで掲載されたCreateJSの解説サンプル集"
source: "https://ics.media/entry/4658/"
publishedDate: "2015-01-28"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

マイナビの月刊誌[Web Designing](http://book.mynavi.jp/wd/)にてクリエイティブなコンテンツの制作手法をテーマとした「**応用講座 Flash for HTML5**」を[沖良矢さん](https://x.com/448jp)（世路庵）と私の二人で連載していました。本記事では連載で開設したHTML5 Canvas ([CreateJS](https://ics.media/tutorial-createjs/))のサンプルをまとめて紹介します。

![](https://ics.media/entry/4658/images/140128_book.jpg)

▲連載では操作手順を図解で説明。ソフトの使い方や、コードの流れを丁寧に解説した。

※連載ではHTML5関連機能が充実している[Animate CC](http://www.adobe.com/jp/products/flash.html)(旧：Flash Professional CC)を使っているので、直感的＆効率的にHTML5 Canvasコンテンツを作ることができます。またAnimate CCではJSライブラリ[CreateJS](https://createjs.com/)が内部的に使われていることもあり、連載ではCreateJSの使い方もあわせて解説しています。

### HTML5 Canvas のサンプル紹介

[![光を駆使したHTML5アニメーション](https://ics.media/entry/4658/images/lensflares0036.png)](https://ics-creative.github.io/data-demos/150128_webdesiging/141211_wd02/sample_2/lensflares.html)

▲光を駆使したHTML5アニメーション。JavaScriptが苦手な方でもAnimate CCを使えば直感的に制作することができる。

[![](https://ics.media/entry/4658/images/160114_createjs_clock.png)](https://ics-creative.github.io/data-demos/150128_webdesiging/150122_wd02/sample_3/clock_watch.html)

▲アナログ時計の中にストップウォッチを配置。目盛り描画処理を関数化することで、時計のバリエーションを簡単に作成できるようにしている。

[![パーティクル表現](https://ics.media/entry/4658/images/particles0062.png)](https://ics-creative.github.io/data-demos/150128_webdesiging/141211_wd02/sample_1/particles.html)

▲HTML5 Canvasが得意とするパーティクル表現。ゲームの表現で役立たせることができる。

[![HTML5でサウンド再生の方法を紹介したサンプル](https://ics.media/entry/4658/images/p4_01.png)](https://ics-creative.github.io/data-demos/150128_webdesiging/140618_wd08/sample_3/move_sound.html)

▲HTML5でサウンド再生の方法を紹介したサンプル。CreateJSの1つ「SoundJS」ライブラリの使い方を紹介。

[![Canvas要素を使えばお絵かきアプリケーションを実装することができる](https://ics.media/entry/4658/images/p1_003.png)](https://ics-creative.github.io/data-demos/150128_webdesiging/140815_wd10/sample3/sample_3.html)

▲Canvas要素を使えばお絵かきアプリケーションを実装することができる。jQueryとの連携方法もあわせて解説。

[![文字を印象的に表示するテキストモーション](https://ics.media/entry/4658/images/textmotion0048.png)](https://ics-creative.github.io/data-demos/150128_webdesiging/141211_wd02/sample_3/textmotion.html)

▲文字を印象的に演出するテキストモーション。

[![Flash Pro CCで制作したHTML5コンテンツはFlash PlayerがインスールされていないiPhoneでも再生できる](https://ics.media/entry/4658/images/p1_004.jpg)](https://ics-creative.github.io/data-demos/150128_webdesiging/141211_wd02/sample_2/lensflares.html)

▲Animate CCで制作したHTML5コンテンツはFlash PlayerがインスールされていないiPhoneでも再生できる。それもパフォーマンスが良い。

[![](https://ics.media/entry/4658/images/160114_createjs_touchapp.jpg)](https://ics-creative.github.io/data-demos/150128_webdesiging/150423_wd06/samples/sample_5.html)

▲マウスの軌跡に沿って線を描くドローイング。線の描画時に加速度を取り入れ、さらに一度に描画する線の数を増やすことで、多重線がバネのような動きでマウスに追従するという表現となっている。

### 連載のサンプルを紹介

連載記事で解説しているサンプルは公式サイトから試すことができます。記事はHTML5コンテンツ制作のポイントとなるテクニックや手法を取り上げ、サンプルの制作を通してそれらを学習するスタイルとなっています。なお、サンプルのソースコードもダウンロードできますので、連載とあわせて確認することでより深く学習できます（ダウンロードには誌面に掲載のID/PASSが必要）。

-   [Web Designing: 2014年7月号](http://book.mynavi.jp/wd/2014/07.html) - [サンプル](http://book.mynavi.jp/wd/sampledata/201407view/flashlab/section3.html) （沖さん担当）
-   [Web Designing: 2014年8月号](http://book.mynavi.jp/wd/2014/08.html) - [サンプル3](https://ics-creative.github.io/data-demos/150128_webdesiging/140618_wd08/sample_3/move_sound.html) （池田担当）
-   [Web Designing: 2014年9月号](http://book.mynavi.jp/wd/2014/09.html) - [サンプル](http://book.mynavi.jp/wd/sampledata/201409view/flash/lesson3.html) （沖さん担当）
-   [Web Designing: 2014年10月号](http://book.mynavi.jp/wd/2014/10.html) - [サンプル](https://ics-creative.github.io/data-demos/150128_webdesiging/140815_wd10/sample3/sample_3.html) （池田担当）
-   [Web Designing: 2014年11月号](http://book.mynavi.jp/wd/2014/11.html) - [サンプル](http://book.mynavi.jp/wd/sampledata/201411view/flash4html5/lesson3.html) （沖さん担当）
-   [Web Designing: 2014年12月号](http://book.mynavi.jp/wd/2014/12.html) - [サンプル](http://book.mynavi.jp/wd/sampledata/201412view/flash4html5/index.html) （池田担当）
-   [Web Designing: 2015年1月号](http://book.mynavi.jp/wd/2015/01.html) - [サンプル](http://book.mynavi.jp/wd/sampledata/201501view/flash4html5/lesson3.html) （沖さん担当）
-   [Web Designing: 2015年2月号](http://book.mynavi.jp/wd/2015/02.html) - [サンプル1](https://ics-creative.github.io/data-demos/150128_webdesiging/141211_wd02/sample_1/particles.html) | [サンプル2](https://ics-creative.github.io/data-demos/150128_webdesiging/141211_wd02/sample_2/lensflares.html) | [サンプル3](https://ics-creative.github.io/data-demos/150128_webdesiging/141211_wd02/sample_3/textmotion.html) （池田担当）
-   [Web Designing: 2015年3月号](http://book.mynavi.jp/wd/2015/03.html) - [サンプル2](https://ics-creative.github.io/data-demos/150128_webdesiging/150122_wd02/sample_2/clock_time.html) | [サンプル3](https://ics-creative.github.io/data-demos/150128_webdesiging/150122_wd02/sample_3/clock_watch.html) （池田担当）
-   [Web Designing: 2015年4月号](http://book.mynavi.jp/wd/2015/04.html) - [サンプル](http://book.mynavi.jp/wd/sampledata/201504view/flash4html5/lesson3.html) （沖さん担当）
-   [Web Designing: 2015年5月号](http://book.mynavi.jp/wd/2015/05.html) - [サンプル](http://book.mynavi.jp/wd/sampledata/201505view/flash4html5/lesson3.html) （沖さん担当）
-   [Web Designing: 2015年6月号](http://book.mynavi.jp/wd/2015/06.html) - [サンプル](https://ics-creative.github.io/data-demos/150128_webdesiging/150423_wd06/samples/sample_5.html) （池田担当）

### 最後に

ここ最近はスマートフォンの性能が著しく向上し、HTML5 Canvasがデスクトップブラウザのみならずスマートフォンのブラウザでも十分に動作するようになってきました（60fpsのコンテンツも再生できるようになってきました）。ウェブサイトにおけるキャッチーな表現や、ゲームコンテンツにおけるインタラクティブな描画領域にHTML5 Canvasは適しており、今後はますますその需要が高まっていくでしょう。

連載ではインタラクティブコンテンツ制作の基本的な実装力が身につくようにまとめています。連載は電子書籍「Flash for HTML5 ―HTML5開発環境としてのFlash Pro CC活用テクニック」として販売されていますので、興味のある方はぜひ次のリンクから購入くださいませ。

-   [Amazon.co.jp - Kindleストア](http://www.amazon.co.jp/dp/B014VWO2BU)
-   [マイナビブックス](https://book.mynavi.jp/ec/products/detail/id=42081)

[![Web Designing Library #15「Flash for HTML5　‐HTML5開発環](https://ics.media/entry/4658/images/160119_42081_ext_06_0.jpg)](http://www.amazon.co.jp/dp/B014VWO2BU)