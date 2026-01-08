---
title: "PreloadJSで「悩ませないローディング」の作り方―CreateJS勉強会"
source: "https://ics.media/entry/5239/"
publishedDate: "2015-02-17"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

先日行われた[CreateJS勉強会 (第5回)](https://atnd.org/events/61440)にて**PreloadJSで「悩ませないローディング」の作り方**というテーマでライトニングトークさせていただきました。時間の関係でお伝えできなかった部分も含め本記事でまとめました。みなさまのローディング作りのご参考になれば幸いです。

### PreloadJSとは？

![PreloadJS](https://ics.media/entry/5239/images/preloadjs_img_01.jpg) [PreloadJS](https://createjs.com/PreloadJS)とは、[CreateJS](https://createjs.com/)のライブラリモジュールの1つで外部ファイル（画像・音声・JSONなど）の読み込み処理を担当しています。**読み込み状況をイベントで監視して読み込み率（0.0〜1.0）を取得できます。**その読み込み率を演出用のJavaScriptに渡してあげることで、読み込み状況に合わせた演出を実現できます。

### ソースコード

PreloadJSで外部ファイルを読み込むソースコードです。今回は[LoadQueueクラス](https://createjs.com/Docs/PreloadJS/classes/LoadQueue.html)を使って拡張子の違うファイルをまとめて読み込んでいますが、同じ勉強会で登壇されていた[野中氏](https://x.com/FumioNonaka)のセッション「[新しいCreateJSで書くコードはどう変わるのか](http://www.fumiononaka.com/samples/CreateJS/CreateJS_150210.html)」で、**読み込むファイルが前もってわかる場合はそのファイルに合ったLoader(画像ファイルなら[ImageLoaderクラス](https://createjs.com/Docs/PreloadJS/classes/ImageLoader.html))を使用することで、Loaderが読み込んだファイルの種類を調べるという処理を省くことができてパフォーマンス的にも良い**と紹介されていました。

```
// 読み込む外部ファイル情報
var manifest = [
  { src: "/images/test.png" }, // Image
  { src: "/js/test.js" }, // JavaScript
  { src: "/css/test.css" } // CSS
];

// LoadQueueクラス
var loadQueue = new createjs.LoadQueue();

// 並列での読み込み数を設定
loadQueue.setMaxConnections(6);

// 読み込みの進行状況が変化した
loadQueue.addEventListener("progress", handleProgress);
// 1つのファイルを読み込み終わったら
loadQueue.addEventListener(
  "fileload",
  handleFileLoadComplete
);
// 全てのファイルを読み込み終わったら
loadQueue.addEventListener("complete", handleComplete);

// 読み込み開始
loadQueue.loadManifest(manifest);

function handleProgress(event) {
  // 読み込み率を0.0~1.0で取得
  var progress = event.progress;
}

function handleFileLoadComplete(event) {
  // 読み込んだファイル
  var result = event.result;
}

function handleComplete() {
  console.log("LOAD COMPLETE");
}
```

### デモ

PreloadJSを使ってローディングのデモを3つ作成しました。それぞれの表現方法の特徴・実例も合わせてご紹介します。  
※実例は過去1年以内に[FWA](http://www.thefwa.com/)などのブックマークサイトで取り上げられていたWebサイトの中から選びました。PreloadJSを使用していないものも含まれています。

#### アニメーションGIF

![](https://ics.media/entry/5239/images/preloadjs_img_02.jpg)

-   使用ライブラリ：PreloadJS
-   [別画面でデモを再生する](https://ics-creative.github.io/data-demos/150217_preloadjs/demo1/)

読み込みが始まると表示、読み込みが終わると非表示とシンプルな手法。

![メリット：表示・非表示の切り替えで表現できるので実装が比較的簡単 デメリット：読み込み状況が伝わらない](https://ics.media/entry/5239/images/preloadjs_img_08.png)

アニメーションGIFだけでは読み込み状況を伝えられないので、読み込み時間が長くなってしまうと「今どれくらい読み込めているのか？」「あとどれくらい待てばいいのか？」「そもそもちゃんと読み込めているのか？」とユーザーを悩ませてしまいます。**画像のようなデータ容量の軽い読み込みに向いています。**

実例

> [![任天堂 公式ホームページ キャプチャ](https://ics.media/entry/5239/images/preloadjs_img_03.jpg)](http://www.nintendo.co.jp/)
> 
> -   [任天堂 公式ホームページ  
>     http://www.nintendo.co.jp/](http://www.nintendo.co.jp/ "http://www.nintendo.co.jp/")  
>     自社のキャラクターをモチーフとしてアニメーションさせることで、Webサイトの世界観にも馴染みます。

#### 数字

![](https://ics.media/entry/5239/images/preloadjs_img_04.jpg)

-   使用ライブラリ：EaselJS、TweenJS、PreloadJS
-   [別画面でデモを再生する](https://ics-creative.github.io/data-demos/150217_preloadjs/demo2/)

数字を使って直接量を伝える手法。

![メリット：具体的な量を伝えられる デメリット：読み込み時間によって演出に差がでてしまう](https://ics.media/entry/5239/images/preloadjs_img_09.png)

0〜100%の演出を作り込んでもデータ容量の軽い比較的読み込み時間が短い場合に使用すると、作り込んだ演出を見せる間もなく終了してしまう可能性があります。**大量の画像などのデータ容量の重い読み込みに向いています。**

実例

> [![Digital Trip キャプチャ](https://ics.media/entry/5239/images/preloadjs_img_05.jpg)](http://dt.htdt.ru/)
> 
> -   [Digital Trip  
>     http://dt.htdt.ru/](http://dt.htdt.ru/ "http://dt.htdt.ru/")  
>     ページタイトルに読み込み率をパーセンテージ表示させるという尖った表現です。

#### 領域

![](https://ics.media/entry/5239/images/preloadjs_img_06.jpg)

-   使用ライブラリ：EaselJS、TweenJS、PreloadJS
-   [別画面でデモを再生する](https://ics-creative.github.io/data-demos/150217_preloadjs/demo3/)

ある領域内の変化を量に置き換えて伝える手法。デモでは背景を1つの領域としており、黒い背景から白い背景に変化していく様子を量として表現しています。

![メリット：視覚的(直感的)に伝えられる デメリット：表現に使用する領域に注意が必要](https://ics.media/entry/5239/images/preloadjs_img_10.png)

デモでは画面を1つの領域としているので問題ないのですが、曖昧な領域（画面の半分など）で表現してしまうと変化と量の関係が明確にならず誤解を与えてしまいます。**数字と同じく量を伝えられるので読み込み時間が長いものはもちろん、演出次第で短いものでも使用できます。**

実例

> [![Code Sketch キャプチャ](https://ics.media/entry/5239/images/preloadjs_img_07.jpg)](http://cs.kenji-special.info/)
> 
> -   [Code Sketch  
>     http://cs.kenji-special.info/](http://cs.kenji-special.info/ "http://cs.kenji-special.info/")  
>     Webサイトの中央にプログレスバーの様に表示させています。読み込み時間も短いのですが、「LOADING」の文字の演出が気持ちよく違和感もありません。

### まとめ

-   **PreloadJSで読み込み状況をイベントで監視できる**  
    取得した読み込み率を演出用のJavaScriptへ渡してあげることで、読み込み率に応じた演出を実現できます。
-   **読み込むファイルに合った表現方法の選択**  
    データ容量によって読み込み時間も変わってくるので最適な表現方法を選択しましょう。
-   **読み込み時間がかかるものは「量」を伝える**  
    とくに読み込み時間が長い場合、ユーザーに「今どれくらい読み込めているのか？」「あとどれくらい待てばいいのか？」「そもそもちゃんと読み込めているのか？」と悩ませないためにも量を伝えましょう。

### CreateJS勉強会（第5回）の関連記事

-   [HTML5 CanvasとWebGLの使い分け : 池田発表資料 (前編)](https://ics.media/entry/5140/)
-   [WebGLのドローコール最適化手法 : 池田発表資料(後編)](https://ics.media/entry/5221/)
-   PreloadJSで「悩ませないローディング」の作り方
-   [CreateJSとNode.jsを使ってサーバーサイドでCanvasを扱おう](https://ics.media/entry/5192/)
-   [新CreateJSをコンテンツ制作に活かす | 新しいCreateJSで書くコードはどう変わるのか : 野中氏発表資料](http://fumiononaka.com/samples/CreateJS/CreateJS_150210.html)