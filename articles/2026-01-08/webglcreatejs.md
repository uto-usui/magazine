---
title: "WebGLのドローコール最適化手法―CreateJS勉強会/池田発表資料（後編）"
source: "https://ics.media/entry/5221/"
publishedDate: "2015-02-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

本記事は2015年2月10日（火）に開催された[CreateJS勉強会 (第5回)](https://www.facebook.com/icswebjp/posts/1569177426660602/) の発表資料「CreateJSクリエイトジェイエスで制作するスペシャルコンテンツ」の後編となります。[前編(CanvasとWebGLの比較)](https://ics.media/entry/5140/)に続けて本記事ではWebGLウェブジーエルの最適化手法を紹介します。

### WebGLのドローコールの最適化について

前編ではHTML5 CanvasとWebGLの使い分けについて紹介しましたが、ここからはWebGLの最適化手法の1つを紹介します。よく知られているテクニックですが、**WebGLでは描画命令のドローコールを少なくすることが有効**だと言われています。ドローコールが少なくなることで滑らかなモーション = 60fps(遅延なき`RequestAnimationFrame`の達成）を実現し、スマートフォンでの実行時の消費電力を抑えられます。

下図は複数の要素を画面に表示するときのWebGLの内部処理を図示したものです。テクスチャというのは画像（たとえばHTMLの`img`要素）をGPUに転送した状態のものを指します。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.029.jpg)

WebGLでは深度が奥にあるものから順番に描画します。描画するときにテクスチャを参照するのですが、同じテクスチャの表示オブジェクトが重なっていれば1回でドローすることができるものの、**異なるテクスチャの表示オブジェクトが交互に重なっている場合はその度にドローを呼び出す必要がでてきてしまいます**。上図のような配置だとドローコールを4回呼び出す必要があります。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.030.jpg)

対策方法としては**描画順序を調整して、できる限り同じテクスチャの表示オブジェクトが順番に重なるようにします**。これだとドローコールが2回ですみます。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.032.jpg)

もっと効果的なのがスプライトシート（テクスチャアトラス）を使うことです。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.033.jpg)

複数の表示オブジェクトを配置していても、**スプライトシートであれば同一のテクスチャへの参照となるためドローコールが1回ですみます。深度の順番を気にする必要もなくなりますので、表現の自由度も確保できます**。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.031.jpg)

-   [Apple Watch 目コピデモ (ドローコール非最適化版)](https://ics-creative.github.io/data-demos/150210_createjs_seminer/7_pixijs_drawcalls_each/index.html)
-   [Apple Watch 目コピデモ (ドローコール最適化版)](https://ics-creative.github.io/data-demos/150210_createjs_seminer/8_pixijs_drawcalls_spritesheet/index.html)

さきほど紹介したApple Watchの目コピのデモですが、これについてもドローコール最適化有無の比較を行いました。Firefoxの「Canvasの検証」を行うことで、GLSLレベルでドローコールの回数をチェックできます。Flash Stage3Dの開発で重宝したアプリケーション[Adobe Scout](https://helpx.adobe.com/jp/scout/kb/download-adobe-scout-cc.html)と同じようにGPUへの描画命令を検証することができるのでとても便利です。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.034.jpg)

このドローコールの最適化手法については、2014年4月に開催した「[プロが語るAdobe AIR最新事例セミナー](https://www.facebook.com/icswebjp/posts/pfbid02Ru8VbrzomPAh1E88dXH69NTE8FM9czNRcRfC31zH9nNjje23qRycXpyT9YxFi28El)」で弊社鈴木が紹介したFlash Stage3Dの最適化手法（[セミナー資料](https://www.facebook.com/icswebjp/app_566926136738876))と同じものとなります。ここで言いたいのは**Flashの開発から学んだことはWebGLにも役立っていますし、今もFlashから学ぶことは大いにあるということです**。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.035.jpg)

スプライトシートの有用性についてはわかって頂けたかと思いますが、実はスプライトシートにはいくつか課題があります。Pixi.jsでは[TexturePacker](https://www.codeandweb.com/texturepacker)という有料ソフトを使うことを推奨していますが、画像更新の度にスプライトシートを作り直す必要があるためワークフローとしては手間です。スプライトシートのデータ容量も肥大化する傾向があるため、転送量の面からみても必ずしも利点ばかりではありません。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.036.jpg)

CreateJSには`SpriteSheetBuilder`クラスという便利な機能があります。その名のとおりスプライトシートを作成する機能なのですが、特徴として実行時に動的にスプライトシートを作成できます。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.037.jpg)

Apple Watchの目コピデモでは、CreateJSで表示オブジェクトのグラフィックを作成し`SpriteSheetBuilder`クラスを使ってスプライトシートに変換し、それをPixi.jsに展開しています。この画面で表示されているアイコンの部分はCreateJSで動的に作成しているので、実はアイコンの表示も、グラデーションの色も毎回動的にランダムとして決定されています。

このスプライトシートをランタイムで生成する方法はデータ容量面やワークフロー面でも最適であったため、前編の冒頭で紹介した「Shared Drawing (Beta)」でも採用しています。複数人の同時アクセスでも大量のパーティクルを表示できているのは、このWebGLのドローコールの最適化が有効であったためです。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.038.jpg)

上述はCreateJSで作成したスプライトシートをPixi.jsに展開するためのコードです。CreateJS勉強会のときに公開することを約束しましたので、完璧なものではありませんが公開させていただきました。興味のある方は自己責任のもとご利用ください。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5221/images/150207_createjs.039.jpg)

今日紹介したことは、異なる技術を組み合わせて長所をさらに伸ばすための方法でした。HTML5 Canvas(`Context2D`)は自由度が高いので制作がしやすいのが利点です。WebGLはGPUを使うためContext2D以上のパフォーマンスを得たいときには有効ですが、Context2Dに比べて自由度が少なくなるため機能的な制約が発生します。**WebGLのパフォーマンスを活かしながらさまざまな表現を作るには、Context2Dを併用しデメリットを補うことも検討するといいでしょう。**技術の利点と欠点を把握することによって、最適な技術選択の判断をしていけるようになります。

![](https://ics.media/entry/5221/images/150213_createjs_01.jpg)

本日の発表は以上となります。CreateJS勉強会をその時に開催しようと考えていますので、次回もぜひご参加いただけましたら幸いです。

### CreateJS勉強会（第5回）の関連記事

-   [HTML5 CanvasとWebGLの使い分け : 池田発表資料 (前編)](https://ics.media/entry/5140/)
-   WebGLのドローコール最適化手法 : 池田発表資料（後編）
-   [PreloadJSで「悩ませないローディング」の作り方](https://ics.media/entry/5239/)
-   [新CreateJSをコンテンツ制作に活かす | 新しいCreateJSで書くコードはどう変わるのか : 野中氏発表資料](http://fumiononaka.com/samples/CreateJS/CreateJS_150210.html)