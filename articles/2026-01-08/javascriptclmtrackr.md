---
title: "JavaScriptライブラリ「clmtrackr」でお手軽フェイストラッキング"
source: "https://ics.media/entry/13038/"
publishedDate: "2016-08-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

**フェイストラッキング**という技術を使うと、**画像から顔のパーツの位置や大きさを特定できる**ようになり、静止画やアニメーションを重ねるといった演出を加えられます。

フェイストラッキングの技術は昔からありましたが、高度な画像解析の知識が必要なため導入するにはハードルの高いものでした。今回は、**JavaScriptライブラリを使って、HTMLでフェイストラッキングを実現する方法を紹介します**。

### ウェブテクノロジーでフェイストラッキングに挑戦しよう

ウェブテクノロジーで簡単にフェイストラキングを実現するには、JavaScriptライブラリ「[clmtrackr](https://github.com/auduno/clmtrackr)」が挙げられます。このライブラリでは、負荷が高いフェイストラッキングの処理をWebGLで行っています。ライブラリの[GitHubページ](https://github.com/auduno/clmtrackr)ではさまざまなデモが用意されています。

![画像から顔を検出しているデモ](https://ics.media/entry/13038/images/160725_face_tracking_02.jpg)

▲画像から顔を検出しているデモ

### JSライブラリclmtrackrで画像や動画の顔の位置を検出する

clmtrackrは、**画像や動画・Webカメラの映像から、顔や顔のパーツの位置や傾きを検出できます。**検出した顔の情報は2D座標として取得できます。鼻の位置に犬の鼻の画像を重ねてデコることも可能です。

本記事では、clmtrackrを使ったフェイストラッキングのオリジナルデモを4つ紹介します。clmtrackrの詳細な使い方は割愛しますが、デモのコードにコメントを記載してますので、そちらを参考ください。

-   [すべてのコードを見る](https://github.com/ics-creative/160725_face_tracking)
-   [デモファイル（ZIP）をダウンロード](https://github.com/ics-creative/160725_face_tracking/archive/master.zip)

#### デモ① 画像から顔を検出

静止画像から顔を検出するデモを紹介します。読み込まれた画像を解析し、眉、目、鼻、口、顔の輪郭を検出します。

![](https://ics.media/entry/13038/images/images/160725_face_tracking_demo1.png)

-   [デモを別ウィンドウで開く](https://ics-creative.github.io/160725_face_tracking/sample1/index.html)
-   [コードを確認する](https://github.com/ics-creative/160725_face_tracking/blob/master/sample1/js/index.js)

#### デモ② 動画から顔を検出

動画から顔を検出するデモです。動画の1コマずつに「画像から顔を検出するデモ」と同じ処理を実行して検出します。

![](https://ics.media/entry/13038/images/160725_face_tracking_demo2.gif)

-   [デモを別ウィンドウで開く](https://ics-creative.github.io/160725_face_tracking/sample2/index.html)
-   [コードを確認する](https://github.com/ics-creative/160725_face_tracking/blob/master/sample2/js/index.js)

#### デモ③ Webカメラの映像から顔を検出

「動画から顔を検出するデモ」の動画部分をWebカメラの映像に差し替えたデモです。ブラウザからWebカメラへのアクセスは、HTMLの[MediaStream API](https://developer.mozilla.org/ja/docs/Web/API/Media_Streams_API)を使用しています。

-   [デモを別ウィンドウで開く](https://ics-creative.github.io/160725_face_tracking/sample3/index.html)
-   [コードを確認する](https://github.com/ics-creative/160725_face_tracking/blob/master/sample3/js/index.js)

MediaStream APIは現行ブラウザではすべて対応しています（[Can I Use…参照](https://caniuse.com/stream)）。

#### デモ④ 検出した顔に画像をマスキング

「Webカメラの映像から顔を検出するデモ」で検出した顔に、顔画像をマスキングしてみます。

-   [デモを別ウィンドウで開く](https://ics-creative.github.io/160725_face_tracking/sample4/index.html)
-   [コードを確認する](https://github.com/ics-creative/160725_face_tracking/blob/master/sample4/js/index.js)

**顔の位置だけではなく表情にも連動します**。検出した顔にマスキングするには、マスク画像と顔のパーツ（眉、目、鼻、口、顔の輪郭）が位置する座標が必要になります。座標は、次の図のような71箇所をJavaScriptの配列で指定します。

![マスキングに必要なデータの解説図](https://ics.media/entry/13038/images/160725_face_tracking_08.jpg)

次のソースコードは、実際に公式サンプルで使用されているものです。図に記載されている数字の順番で配列に格納します。公式のサンプルでは小数点まで詳細に指定されていますが、それほど誤差はでないため、小数点部分は省いても問題ありません。

```
// マスクの座標
var maskData = [
  [266.539778613571, 254.84378898872825],
  [266.3039097561577, 285.302233189556] /* (省略) */,
  ,
  [390.7655312307384, 254.4464699123733],
];
```

### 最後に

JavaScriptでも簡単にフェイストラッキングが実現できました。2016年の本記事公開当時は、スマートフォンでの処理性能の課題がありました。しかし、現代のスマートフォンでは性能が向上しており、実用できるレベルまで到達しています。

ICS MEDIAでは他にもさまざまなフェイストラッキングのJavaScriptライブラリを紹介しています。次の記事も参考にしてみてください！

-   [ブラウザ上で可愛いフィルターを実現！TensorFlow.jsを使ったリアルタイム顔認識](https://ics.media/entry/240709/)
-   [みんなの人気者になれる！？ 機械学習を使ったおもしろカメラ](https://ics.media/entry/191227/)

※この記事が公開されたのは**9年前**ですが、**1年前の2024年7月**に内容をメンテナンスしています。