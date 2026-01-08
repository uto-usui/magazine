---
title: "SVGコンテンツ制作に役立つ！ 流行りのSVGライブラリまとめ"
source: "https://ics.media/entry/15608/"
publishedDate: "2017-06-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

SVGはベクターグラフィックスの画像形式で、昨今のウェブサイトで幅広く使われています。ウェブサイトのアニメーションやインタラクションにもSVGを使えますが、その用途ではJavaScriptを使わなければなりません。

たとえば矩形を1つ描くだけでも標準のAPIでは10行近いコードの記述が必要になりますが、JSライブラリを利用するとほんの数行で実装可能です。手軽に導入できるだけでなく、JSライブラリを使うことで表現の自由度が上がったり、古いブラウザもサポートできる利点もあります。この記事では有用なSVGライブラリをいくつかピックアップし、それぞれの特徴を紹介します。

### Snap.svg

![](https://ics.media/entry/15608/images/image01.png)

[Snap.svg](http://snapsvg.io/)は[Adobe Systems社](http://www.adobe.com/jp/)が提供しているオープンソースのライブラリです。SVG DOMの操作や、アニメーション・モーフィング、マスキング・クリッピングといったさまざまな高度な機能を簡潔に提供してくれます。SVGライブラリといえば「[Raphaël.js](http://dmitrybaranovskiy.github.io/raphael/)」が代表格としてありましたが、Snap.svgはその後継として同じ作者（Dmitry Baranovskiy氏）によって開発されています。

![](https://ics.media/entry/15608/images/image02.png)

特徴としてはSVGを操作する豊富な機能の他に、座標や角度計算、色に関するユーティリティなどの機能も充実しています。またチェーンメソッドの記述が採用されており、jQueryと同じような感覚で利用できるのも大きな特徴です。

```
// ステージを作成
var stage = Snap("#svg");

// X座標10、Y座標10の位置に、縦横100の赤色の枠線なしの矩形を描く
var box = stage
  .rect(10, 10, 100, 100)
  .attr({ fill: "#f06" });

// 1000ミリ秒かけてX座標100まで移動
box.animate({ x: 100 }, 1000, mina.easein);
```

▲ 記述例

サポートしているブラウザはIE 9+/Chrome/Safari/Firefoxです。レガシーなIEをサポート外としているため、その分高度な機能を提供してくれます。ライセンスは「[Apache License Version 2.0](https://github.com/adobe-webplatform/Snap.svg/blob/master/LICENSE)」が適用されています。またJSファイルの容量は、minifyされたもので\[80.5KB\]となっています。

-   [Snap.svg](http://snapsvg.io/)
-   [ドキュメントを開く](http://snapsvg.io/docs/)
-   [デモを開く](http://snapsvg.io/demos/)

### Raphaël.js

![](https://ics.media/entry/15608/images/image03.png)

前述のSnap.svgの前身となったライブラリです。Snap.svgと比べると機能が少なく制約もありますが、IE 6+/Safari 3.0+/Firefox 3.0+とレガシーな環境もサポートされています。SVGがサポートされていない古いIEでは、VML（Vector Markup Language）というSVGの元となった言語で描画されるようフォールバックが用意されています。

![](https://ics.media/entry/15608/images/image04.png)

Snap.svgと同様にチェーンメソッドが採用されており、提供されているAPIもSnap.svgと似ています。ライセンスは「[MIT License](https://github.com/DmitryBaranovskiy/raphael/blob/master/license.txt)」が適用されおり、JSファイルの容量はminifyされたもので\[91.1KB\]となっています。

```
// ステージを作成
var stage = Raphael("svg");

// X座標10、Y座標10の位置に、縦横100の赤色の枠線なしの矩形を描く
var box = stage
  .rect(10, 10, 100, 100)
  .attr("fill", "#f06")
  .attr("stroke-width", 0);

// 1000ミリ秒かけてX座標100まで移動
box.animate({ x: 100 }, 1000, "easeOut");
```

▲ 記述例

-   [Raphaël.js](http://dmitrybaranovskiy.github.io/raphael/)
-   [ドキュメントを開く](http://dmitrybaranovskiy.github.io/raphael/reference.html)

### SVG.js

![](https://ics.media/entry/15608/images/image05.png)

[SVG.js](http://svgjs.com/)はSVGの仕様を網羅しつつ、軽量かつ高速に動作することを謳っているライブラリです。公式サイトではSnap.svgの何倍も早く動作すると紹介されています。こちらもチェーンメソッドが採用されており、簡潔な記述が可能です。

![](https://ics.media/entry/15608/images/image07.png)

ユニークな特徴として、アニメーションのイージングが「>」(ease out)、「-」(linear) といった動きの特徴を連想させるような記号の文字列で指定できます。またプラグイン機能が備わっており、複雑なイージングやドラッグ機能、ブラーやドロップシャドウといったフィルター機能などはプラグインを追加して利用できます。

```
// ステージを作成
var stage = SVG("svg");

// X座標10、Y座標10の位置に、縦横100の赤色の枠線なしの矩形を描く
var box = stage
  .rect(100, 100)
  .attr({ fill: "#f06" })
  .move(10, 10);

// 1000ミリ秒かけてX座標100まで移動
box.animate(1000, ">").move(100, 10);
```

▲ 記述例

サポートしているブラウザは、デスクトップではIE 9+/Chrome 4.0+/Safari 3.2+/Firefox 3.0+。モバイルではiOS Safari 3.2+/Android Browser 3.0+/Chrome for Android 18+/Firefox for Android 15+となっており、モバイルでのサポートも明記されています。ライセンスは「[MIT License](https://github.com/svgdotjs/svg.js/blob/master/LICENSE.txt)」が適用されており、本体のJSファイルの容量はminifyされたもので\[64.3KB\]となっています。

-   [SVG.js](http://svgjs.com/)

### GraphicsJS

![](https://ics.media/entry/15608/images/image09.png)

[GraphicsJS](http://www.graphicsjs.org/ "GraphicsJS")は[AnyChart社](http://www.anychart.com/)が昨年の秋に公開した、新しいオープンソースのライブラリです。AnyChart社はインタラクティブ・データビジュアライゼーション分野を得意としており、GraphicsJSでは多種多様なグラフやチャートを作成する機能が備わっています。

特徴として、Snap.svgのようなアニメーション機能は持っていませんが、仮想DOMが実装されており、描画プロセスを管理し最適化が行いやすい設計がされています。レイヤー構造も備わっており、重なり順の変更やグループ単位での操作が行えます。またテキストについてもリッチな制御が可能となっており、オーバーフローやインデント、行の高さ、文字の間隔、縦横の整列などが設定できます。

![](https://ics.media/entry/15608/images/image08.png)

```
// ステージを作成
var stage = acgraph.create("div");

// X座標10、Y座標10の位置に、縦横100の赤色の枠線なしの矩形を描く
var box = stage
  .rect(10, 10, 100, 100)
  .fill("#f06")
  .stroke("#000", 0);
```

▲ 記述例

サポートしているブラウザは、IE 6+/Chrome 1.0+/Safari 4.0+/Firefox 2.0+、モバイルではiOS Safari 3.0+/Android Browser 3.0+とレガシーな環境もサポートされています。IEの古いバージョンではRaphaël.jsと同様にVMLで描画されます。ライセンスは元々「Apache License」で公開されていましたが「[3-Clause BSD License](https://github.com/AnyChart/GraphicsJS/blob/master/LICENSE)」に変更されています。またJSファイルの容量はminifyされたもので\[190KB\]と、他のライブラリと比較すると少し大きなものとなっています。

公開されてまだ日が浅いこともあり、ネット上の情報は少ないものの、ドキュメントやAPIリファレンスは詳細なものが整備されているため、こちらを参照するとよいでしょう。

-   [GraphicsJS](http://www.graphicsjs.org/)
-   [ドキュメントを開く](https://docs.anychart.com/Graphics/Overview)
-   [APIリファレンスを開く](https://api.anychart.com/7.14.0/anychart.graphics)
-   [デモを開く](http://www.anychart.com/products/anychart/gallery/)

### まとめ

豊富な機能を取り揃えているSnap.svgがデファクトスタンダードなライブラリとなりそうですが、実行速度を求める場合は「SVG.js」、レガシーな環境のサポートが必要な場合は「Raphaël.js」が選択肢となりそうです。またSPAなどの開発においては、仮想DOMやリッチなテキスト制御を兼ね備えている「GraphicsJS」が威力を発揮しそうです。

今回は紹介したもの以外にも、データビジュアライゼーションに特化した[D3.js](https://d3js.org/)や、インタラクティブコンテンツ制作向けの[Two.js](https://two.js.org/)といったSVGを扱えるJSライブラリがありますが、目的に合った最適なライブラリを選択し、素敵なSVGライフを送りましょう。