---
title: "GIFアニメからAPNGの時代に！ 次世代画像形式APNGを使いこなそう"
source: "https://ics.media/entry/2441/"
publishedDate: "2014-09-30"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

APNG（エーピング）とは**アニメーションするPNG画像**のことで、アニメーションGIFに取って代わる次世代の新しい画像形式です。もともとブラウザベンダーの[Mozilla](https://www.mozilla.jp/)が提案した規格で、ウェブサイトのアニメーション表現に利用できます。従来はアニメーションGIFが主流でしたが、アニメーションGIFは色数の制限や輪郭のジャギーなど品質面の制限が多いファイルフォーマットです。その制限を払拭してくれると期待されるのがAPNG形式です。

### データ容量・品質から比較する画像形式〜APNGは容量が軽くて綺麗

![データ容量・データ品質で比較したマトリクス](https://ics.media/entry/2441/images/zo3.png)

上図ではアニメーションGIF・APNG(8bit・32bit)・PNG連番画像をデータ容量・データ品質でマトリクス図にしました。**APNG 8bitはアニメーションGIFと同じ256色のサポート**なのでAPNG 8bitの方がデータ容量は若干小さいものの、差はほとんどありませんでした。**APNG 32bitはフルカラーに加えアルファチャンネルもサポート**しているため見た目も劣化なくきれいです。さらに可逆圧縮で圧縮されるためPNG連番画像に比べてかなりデータ容量を圧縮できます。

![](https://ics.media/entry/2441/images/140930_img_01_apng.png)

-   [別画面でデモを再生する](https://ics-creative.github.io/140930_apng/sample1/)

※APNGに対応しているブラウザChrome、Firefox、Safariでご覧ください

同じアニメ素材をアニメーションGIFとAPNGとで作成しました。アニメーションGIFでは画像の周りにジャギーが入ってしまううえに、影の部分がグレーにベタ塗り状態になってしまいます。**一方のAPNGは要素の周りにジャギーも入ることなく影も思い通りの透明度を表現できています**。昔のブラウザであるInternet Explorerでは、アニメーションが再生されませんが、1フレーム目が静止画として表示されます。

### 導入するメリット・デメリット

![APNGの導入に対するメリット・デメリット メリット ・アルファチャンネルもサポートされるので思い通りのアニメーションを表現できる ・可逆圧縮なので劣化なくデータ容量を圧縮できる ・連番で書きだした画像の総データ容量よりも圧縮できる ・サポートされていない環境でも1フレーム目を静止画で表示できる デメリット ・サポート環境が少ない ・アニメーションGIFと比べてデータ容量が大きい](https://ics.media/entry/2441/images/140930_merit_apng.png)

**APNGのメリットとしては、アルファチャンネルをサポートしているのでアニメーションGIFのようなジャギーの心配もなく思い通りのアニメーションを表現できることです**。デメリットとしては、未サポートのブラウザが昔に存在したことです。

### APNGのサポート環境

![図版：APNGのブラウザサポート状況](https://ics.media/entry/2441/images/220225_caniuse_apng.png)

**2022年現在では、FirefoxとApple Safari（Safari 8/iOS 8以上）、Google Chrome（59以上）、Edge（79以上）がAPNG形式をサポートしています**（参照「[Can I use](https://caniuse.com/apng)」）。

昔は、一部のブラウザー（Internet Explorer）でサポートされていませんでした。しかし、[IE11は2022年6月に終了しています](https://blogs.windows.com/japan/2022/06/15/internet-explorer-11-is-no-longer-supported/)ので、今はすべてのブラウザで利用可能と判断して差し支えありません。

### APNGとアニメーションGIFとの比較

APNGとアニメーションGIFの表現の差はデモでも明らかですが、表現以外にもどのような違いがあるのかフレームレート・データ容量の2つの視点で比較しました。

#### フレームレートの違い

![APNG AssemblerでのFPS設定方法](https://ics.media/entry/2441/images/140930_assembler_apng.png)

アニメーションGIFはレガシーなブラウザでは表現できるフレームレートが低く、環境によってアニメーションのスピードが異なります。APNGでは変換ソフト「[APNG Assembler](https://apngasm.sourceforge.net/)」で書きだす時にフレームレートを設定できるので、**デスクトップブラウザでは60fpsでアニメーションさせることができます**。ただし、スマートフォンのiOS・AndroidではアニメーションGIFとAPNGともに動作が重くなってしまい60fpsのアニメーションを実感できませんでした。

#### データ容量

画像の種類によってはデータ容量が大きくならない場合があります。本記事の検証では以下の通りになりました。

-   APNG ： 379KB
-   アニメーションGIF ： 337KB

※APNG Assemblerでは、zlib・7zip・Zopfliと3種類の圧縮形式を選択できますが、今回はもっとも圧縮率の高いZopfliで書き出しました。デモで作成した各画像のデータです。

**APNGは可逆圧縮のため、画質が劣化しません**。アニメーションGIFと比べ42KBほどデータ容量が大きくなりましたが、アルファチャンネル・フルカラーを対応していることを考えると、そこまで膨大なデータ容量ではないと感じました。ちなみに連番画像（PNGで34枚）ですと合計で2.4MBほどになりました。アルファチャンネル部分や色数が増えると差が開いていく可能性があります。

### コラム：サポートされていない環境でAPNGを動作させる方法

今やすべてのブラウザでAPNGを利用できますが、Internet ExplorerやEdgeのIEモードを対策したい方のために、ポリフィルを紹介します。

JavaScriptライブラリ「[apng-canvas.js](https://github.com/davidmz/apng-canvas)」を使用するとInternet ExplorerでもAPNGを**疑似的に表示できます**。APNGをHTMLの`canvas`要素で解析して描画するライブラリですので、**canvas要素をサポートしているブラウザー(IE9〜)で動作します。**

![](https://ics.media/entry/2441/images/140930_img_02_apng.png)

-   [別画面でデモを再生する](https://ics-creative.github.io/140930_apng/sample2/)

次の手順で導入できます。

1\. HTMLに`apng-canvas.js`を読み込む`script`要素を記述します。

```
<script src="apng-canvas.min.js"></script>
```

2\. APNGファイルを読み込む`img`要素に`class`属性を設定します。ここでは`png-image`を設定しました。

```
<img class="apng-image" src="../images/elephant_apng_zopfli.png" />
```

3\. 以下のスクリプトをHTML内または外部のJavaScript内に記述します。このスクリプトでは、APNGを取得して`canvas`要素に描画する処理を行っています。

```
APNG.ifNeeded().then(function() {
  var images = document.querySelectorAll(".apng-image");
  for (var i = 0; i < images.length; i++) {
    APNG.animateImage(images[i]);
  }
});
```

### WebPとの使い分けは？

ウェブでアニメーションとして利用できる画像形式に、「WebP（ウェッピー）」があります。APNGとおなじくフルカラーで透過チャンネルを利用できます。

APNGの圧縮方式は可逆圧縮（劣化しない圧縮）のみですが、WebPは可逆圧縮と非可逆圧縮（劣化するが容量を削減できる）を選べます。

APNGもWebPも作り方は同じなので、以下のツールを利用して変換します。

-   [APNGやWebPへ変換可能なアプリ「アニメ画像に変換する君」をリリース](https://ics.media/entry/12746/)

### 最後に

可逆圧縮の選択肢があり容量の圧縮が可能なので、アニメーションGIFを使うシーンで導入を検討しても良いかもしれません。

APNGファイルを取り巻く状況は、Apple Safariが2014年9月のiOS 8/Safari 8からサポートしたことや、Google Chromeが2017年6月のChrome 59からサポートしたことで大きく前進しています。

**APNGの作り方**について「[ウェブ用アニメーションを劣化なく保存できる画像形式APNGの作り方](https://ics.media/entry/3718/)」という記事でご紹介していますので合わせてご覧いただけますと幸いです。

### LINEのアニメーションスタンプがAPNGで作れます

LINEは2016年6月に「**LINE Creators Marketでもアニメーションスタンプが販売できるようになる**」と発表しました。「[アニメーションスタンプ製作ガイドライン](https://creator.line.me/ja/guideline/animationsticker/)」に沿ったAPNGファイルの作成方法を記事「[LINEのアニメーションスタンプはこう作る！ APNGファイルの作り方を徹底解説](https://ics.media/entry/12268/)」にてまとめましたので、あわせてご覧ください。