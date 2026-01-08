---
title: "HTML5で色分解した写真をWebGLで3D表示するAway3Dデモ"
source: "https://ics.media/entry/1762/"
publishedDate: "2014-08-05"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2014年8月5日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

先日開催した[Away3D勉強会の発表](https://www.facebook.com/icswebjp/posts/1479026045675741)のフォローアップ記事となります。

写真をRGB3原色に分解して3次元で表示するHTML5 + WebGLのデモを作ってみました。ステージをドラッグすると写真が赤・青・緑の3原色に分解されて表示されます。ライブラリはJSライブラリの「[Away3D TypeScript](http://typescript.away3d.com/)」を使っています。  
![](https://ics.media/entry/1762/images/rgb_demo.jpg)

-   [デモ](https://ics-creative.github.io/data-demos/140804_awayjs_rgb/src/0_demo.html)
-   [ソースコード](https://ics-creative.github.io/data-demos/140804_awayjs_rgb/src/RgbDecomposerDemo.ts) (TypeScript 1.0)

このデモを通して紹介したいのは次の3つです。

1.  色分解のロジック
2.  Flashライクで高機能なHTML5版BitmapDataクラスの紹介
3.  Flash Stage3Dにフォールバック可能なAway3D TypeScriptのレンダラー

以下で、それぞれについて詳しく紹介します。

### 実装方法

このデモでは、img要素で画像を読み込み、それを色分解し、3D空間に表示しています。

![](https://ics.media/entry/1762/images/140804_setsumei.png)

**1\. 色分解のロジック**

Web上の多くの画像は**赤・青・緑の光の3原色（8bit深度）を使って構成**されています。これを確認するにはPhotoshopが便利で、［チャンネル］パネルを使えば赤・青・緑それぞれのピクセル情報を確認できます。

[![](https://ics.media/entry/1762/images/140804_rgb.png)](https://ics.media/entry/1762/images/140804_rgb.png)

今回のデモにおいては写真をRGB（赤・緑・青）のレイヤーに分解し、それぞれ描画モード「スクリーン」(もしくはピクセルのカラー情報を加算するもの）に設定して黒背景に重ねています。そうすることで元の画像が復元されます。参考までにPhotoshopで同じことを再現しようとすると次の状態となります。

[![](https://ics.media/entry/1762/images/140804_rgb_photoshop.png)](https://ics.media/entry/1762/images/140804_rgb_photoshop.png)

**2\. Flashライクで高機能なHTML5版BitmapDataクラスの紹介**

HTML5 Canvas (Context2D)を利用すれば、画像解析/加工できます。ただし、**HTML5 Canvas (Context2D)は低レベルのAPIしか提供されていない**ために、実現したい機能がある場合は自分でJavaScriptのコードを記述する必要があります。

今回利用したJSライブラリ「Away3D TypeScript」には**画像を3原色+透明度に分解するBitmapData#copyChannel()というメソッドがあります**。これを使えば少ないコードで分解した色情報を得ることができます。このクラスの使い方は次の通りです。

```
BitmapData.copyChannel(ソースのビットマップデータ, 元素材の範囲矩形, 貼付け先の座標, 元素材のRGBチャンネルを指定, 貼付け先のRGBチャンネルを指定)
```

```
// 変数
var w:number = image.width;
var h:number = image.height;
var p:Point = new Point(0, 0);
var rect = new Rectangle(0, 0, w, h);

// ImageエレメントをBitmapDataに転写
var bmd = new BitmapData(w, h);
bmd.draw(image);

// 保存先を準備
var r = new BitmapData(w, h, true, 0xFF000000);
var g = new BitmapData(w, h, true, 0xFF000000);
var b = new BitmapData(w, h, true, 0xFF000000);

// 各チェンネルをコピー
b.copyChannel(bmd, rect, p, BitmapDataChannel.BLUE, BitmapDataChannel.BLUE);
r.copyChannel(bmd, rect, p, BitmapDataChannel.RED, BitmapDataChannel.RED);
g.copyChannel(bmd, rect, p, BitmapDataChannel.GREEN, BitmapDataChannel.GREEN);

this._result = [r, g, b];
```

色分解については次のデモを試してみてください。読み込んでいるのはオリジナルの写真ですが、JavaScriptによって赤・緑・青の3画像（Canvasエレメント）に分解されています。

-   [デモ (RGB分解デモ)](https://ics-creative.github.io/data-demos/140804_awayjs_rgb/src/1_decompose.html)

![](https://ics.media/entry/1762/images/140804_rgb_js_decompose.jpg)

Flashの経験者なら気づいたかもしれませんが、**BitmapData クラスはFlashのAPIで存在します**（Flash 8の頃からあります）。BitmapData クラスはHTML5やWebGLには元々存在しないのですが、Away3D TypeScriptにはFlash互換のAPIがいくつか整備されています。**Flash経験者が学びやすい設計になっているのもAway3Dの魅力の1つ**です。

### 3D空間への展開

3原色に画像を分解したらAway3D TypeScriptを使って**WebGLの中で3D空間に配置**。3D上の3平面は描画モードを加算（BlendMode.ADD）にしています。注意した点としては遠近感がつくと3平面がずれてしまうので、Away3DのOrthographicProjectionクラスを利用して、平行投影をするようにしました。Away3D TypeScriptでの平行投影のJavaScriptはつぎの通りです。

```
// 平行投影を利用
var projection = new OrthographicProjection();
projection.far = 60000;
projection.projectionHeight = 1500;
this.camera.projection = projection;
```

### Flash Stage3Dにフォールバック可能なAway3D TypeScriptのレンダラー

Away3D TypeScriptのすごい機能として、**WebGLが未搭載のブラウザではFlash Playerにフォールバック**します。次のキャプチャ画像はWebGLがデフォルトで無効であるMac Safari 7でのデモを動かしたものです。

-   [デモ (Flash Player 版)](https://ics-creative.github.io/data-demos/140804_awayjs_rgb/src/2_flash.html)

[![](https://ics.media/entry/1762/images/140804_safari.png)](https://ics-creative.github.io/data-demos/140804_awayjs_rgb/src/2_flash.html)

※次期Safari 8ではWebGLがデフォルトで有効になるらしいですが、執筆時点の最新の**Mac Safari 7では開発者オプションを使わない限りWebGLは無効となっています**。

スクリプトの処理自体はJSで行われていて、描画部分だけFlash側で再現しているようです。これを実現するには**WebGLのGLSLとFlash Stage3DのAGALのコードの変換**であったり、**JS側からSWF側へのテクスチャの転送**など、どれをとっても実現が難しいことばかりです。 Away3Dではそれが内部的に実現されていて正直驚くばかりです。

### 最後に

Away3D TypeScriptはFlashライクなAPIが用意されているだけでも使いやすくて嬉しいのですが、Flashへのフォールバックのエンジンまで搭載されています。昨今、WebGL対応のブラウザが増えてきてはいるものの、実際のところ古いブラウザも数多く残っています。用途によってはフォールバックの機能は重宝するかもしれません。

今後もICS MEDIAではAway3D TypeScriptのデモを作成して紹介していこうと思います。ぜひ[Facebook公式ページ](https://www.facebook.com/icswebjp)をフォローするなどして、当サイトの更新をチェックくださいませ。

### 参考にしたサイト

-   [簡単なJSで始めるWebGL対応Away3Dチュートリアル ― 第1回入門編](https://ics.media/entry/1129/)
-   [RGB色分解した写真を表示する Papervision3D デモ - ClockMaker Blog](http://clockmaker.jp/blog/2008/11/rgb_sepapater/)