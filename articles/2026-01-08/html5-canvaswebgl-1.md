---
title: "HTML5 CanvasとWebGLでウェブフォントを扱う方法"
source: "https://ics.media/entry/8385/"
publishedDate: "2015-08-17"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ウェブフォントは異なる環境でもフォントの見栄えを確保する手段として、多くのウェブサイトで利用されています。

ウェブフォントはCSSとしては利用しやすいものの、**HTML5 CanvasやWebGLを採用した場合にCSSのように簡単に使うことができません**。この記事ではインタラクションコンテンツ制作で役立つようにHTML5 CanvasとWebGLでのウェブフォントの使い方をまとめました。本記事のサンプルコードは[GitHub](https://github.com/ics-creative/150813_fontawesome)で公開していますので、ダウンロードして読み進めてください。

この記事で学べること  
・ウェブフォントの先読み機能を実現するJSライブラリ「WebFontLoader」の使い方  
・FontAwesomeをプログラムで制御する方法  
・HTML5 Canvasでウェブフォントを使う方法  
・WebGLでウェブフォントを使う方法

この記事ではウェブフォントの題材として「[Font Awesome](https://fontawesome.com/v4.7.0/get-started/)」（フォント・オーサム）を利用します。

### オリジナルサンプルを紹介

Font Awesomeを活用したHTML5 CanvasとWebGLの活用例をご覧ください。本サイトで既出のデモですが、実はこれらの作品でFont Awesomeを利用していました。

![](https://ics.media/entry/8385/images/150813_fontawesome_applewatch.png)

-   [デモを別ウインドウで再生する](http://codepen.io/clockmaker/full/VYzrdL/)

記事「[HTML5 CanvasとWebGLの使い分け](https://ics.media/entry/5140/)」で紹介したApple WatchのUIを模倣したデモ。時計内のアイコン部分にWebフォントのFont Awesomeを利用しています。HTML5 CanvasとWebGL(Pixi.js)で制作。

![](https://ics.media/entry/8385/images/150601_threejs_mosaic_DemoIcons.jpg)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/150810_threejs_mosaic/DemoIcons.html)

記事「[高機能なモーション制作用JSライブラリGSAPを使ったタイムリマップ表現](https://ics.media/entry/7162/)」で紹介したWebGLのタイムリマップデモ。無数のアイコンが収束して文字が浮かび上がりますが、このアイコンにはWebフォントのFont Awesomeを利用しています。HTML5 CanvasとWebGL(Three.js)で制作。

### HTML/CSSでの利用方法

HTML/CSSでのウェブフォントの利用方法をおさらいしましょう。FontAwesomeの[公式サイト](https://fontawesome.com/v4.7.0/get-started/)からCDNのURLを取得します。FontAwesomeのバージョン5は無料版・有償版で使い方が複雑なので、あえて古いバージョン4で解説します。

HTMLで使うにはi要素にclass属性「fa fa-○○○」を指定することで任意のアイコンをインラインテキストとして表示させることができます。アイコンの種類はFont Awesomeの[一覧ページ](https://fontawesome.com/v4.7.0/icons/)を確認するとよいでしょう。

```
<html>
<head>
  <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" />
</head>
<body>
  <i class="fa fa-bell"></i>
  <i class="fa fa-chess"></i>
  <i class="fa fa-backward"></i>
  <i class="fa fa-bolt"></i>
  <i class="fa fa-calendar"></i>
  <i class="fa fa-cloud"></i>
  <i class="fa fa-rss-square"></i>
  <i class="fa fa-wifi"></i>
  <i class="fa fa-cog"></i>
  <i class="fa fa-refresh"></i>
</body>
</html>
```

-   [実行結果を確認する](https://ics-creative.github.io/150813_fontawesome/1_simple.html)
-   [全てのコードを確認する：1\_simple.html](https://github.com/ics-creative/150813_fontawesome/blob/master/1_simple.html)

![](https://ics.media/entry/8385/images/150813_fontawesome_1.png)

### HTML5 Canvasでの利用方法

HTML5 Canvasでの使い方は実質的標準のJSフレームワーク「[CreateJS](https://createjs.com/)」で説明します。残念ながらHTML5 CanvasではFont Awesomeのフォントを利用する容易な方法が公式には用意されていません。そのため、文字コードから表示可能な文字列に変換する手順をとります。

手順として、Font Awesomeの公式サイトから使いたいアイコンの詳細ページを開きます。例として[Internet Explorerのアイコンページ](http://fortawesome.github.io/Font-Awesome/icon/internet-explorer/)を確認しましょう。このページの中央に「Unicode: f26b」という表記があります。

![](https://ics.media/entry/8385/images/150813_fontawesome_unicode.png)

「f26b」は16進数で示したユニコードですが、この数字を使って処理を作っていきます。次のコードのiconUnicode変数に「f26b」を指定しましょう。

```
const stage = new createjs.Stage("myCanvas");
// アイコンの Unicode を指定
const iconUnicode = "f26b";
// Unicode から文字コードに変換
const iconInt = parseInt(iconUnicode, 16);
console.log(iconInt); // 「62059」が出力される
// 文字コードから文字列に変換する
const iconStr = String.fromCharCode(iconInt);
console.log(iconStr); // 該当のアイコン文字
// CreateJS のテキストを作成
const text = new createjs.Text(
  iconStr,
  "540px FontAwesome",
  "black"
);
stage.addChild(text);
// 画面のアップデート
createjs.Ticker.addEventListener("tick", stage);
```

-   [実行結果を確認する](https://ics-creative.github.io/150813_fontawesome/2_createjs.html)
-   [全てのコードを確認する：2\_createjs.js](https://github.com/ics-creative/150813_fontawesome/blob/master/2_createjs.js)

![](https://ics.media/entry/8385/images/150813_fontawesome_2.png)

内部の処理はコメントの通り次の手順で展開しています。手順は決っているので仕組みがわかってしまえば、決して難しくありません。ちなみに10進数の番号はWebツール「[10進数・16進数変換ツール](http://tool.muzin.org/16/)」を使って変換すると「62059」になります。どのツールで変換しても当然ながら同じ結果が得られます。

1.  16進数の文字列を指定
2.  10進数の文字コードに変換
3.  文字コードから文字に変換
4.  CreateJSのTextクラスの引数として指定

### 数値計算で全部の文字を表示する

Font Awesome 4.7.0のアイコンは文字コードは10進数表記だと61440から62080の間に割り当てられています。HTML5 Canvasではプログラムを使うので、せっかくなのでループ文を使って全部のアイコンを画面に表示してみましょう。String.fromCharCode()メソッドで指定する引数に10進数の数値を代入するだけでFont Awesomeのフォントを表示できます。

```
const stage = new createjs.Stage("myCanvas");
// FontAwesome 4.4 が取り得る文字コードは 61440〜62080 の間
for (let i = 0; i < 641; i++) {
  // Unicode から文字コードに変換
  const iconInt = 61440 + i;
  // 文字コードから文字列に変換する
  const iconStr = String.fromCharCode(iconInt);
  // CreateJS のテキストを作成
  const text = new createjs.Text(
    iconStr,
    "24px FontAwesome",
    "black"
  );
  text.x = (i % 34) * 28;
  text.y = Math.floor(i / 34) * 28;
  stage.addChild(text);
}
// 画面のアップデート
createjs.Ticker.addEventListener("tick", stage);
```

-   [実行結果を確認する](https://ics-creative.github.io/150813_fontawesome/3_createjs_all.html)
-   [全てのコードを確認する：3\_createjs\_all.js](https://github.com/ics-creative/150813_fontawesome/blob/master/3_createjs_all.js)

![](https://ics.media/entry/8385/images/150813_fontawesome_3.png)

### フォント読み込み完了前の豆腐表示を回避しよう

Webフォントはフォントデータのダウンロードが終わるまでは、異なる代替フォントで表示されます。そのため上記のデモを試すと、一瞬「豆腐」が表示されることがあります。豆腐というのは用語で、割り当て可能なフォントがないときに表示される四角形の文字です。余談ですが、Googleが提供する「[Noto Fonts](https://www.google.com/get/noto/)」というCJKフォントは「豆腐になることがない」=「No 豆腐」ということで名付けられたものです。冗談だと思うかもしれませんが、[Wikipedia](https://ja.wikipedia.org/wiki/Noto)でも紹介されています。

話が脱線しましたが、**Webフォントの豆腐表示を回避するためには、プリロード（先読み）の機能を実装する必要があります**。AdobeとGoogleが共同開発したJSライブラリ「[Web Font Loader](https://github.com/typekit/webfontloader)」を使うとWebフォントのプリロード処理を実装できます。詳しい使い方は記事「[Webフォントがいつ読み込まれたかを判断したい場合は、WebFont Loaderを使おう - W3Q](http://w3q.jp/t/95)」が参考になると思いますが、今回の用途だと具体的には次のように指定します。

```
function preload() {
  // JSライブラリ「WebFont」を使って、フォントの読み込み完了を検知
  WebFont.load({
    custom: {
      // フォントファミリーを指定
      families: ["FontAwesome"],
      // CSS の URL を指定
      urls: [
        "https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css"
      ],
      // 他のフォントでは不要だが、FontAwesome のフォントを利用するには必要な指定
      testStrings: {
        // FontAwesome の検証用テキストを指定
        FontAwesome: "\uf001" // グラスアイコンを指定 (任意で支障ない)
      }
    },
    // Web Fontが使用可能になったとき
    active: init
  });
}

/**
 * コンテンツを初期化します。
 */
function init() {
  // 省略
}
```

-   [実行結果を確認する](https://ics-creative.github.io/150813_fontawesome/4_createjs_preload.html)
-   [全てのコードを確認する : 4\_createjs\_preload.js](https://github.com/ics-creative/150813_fontawesome/blob/master/4_createjs_preload.js)

![](https://ics.media/entry/8385/images/150813_fontawesome_4.png)

この実装をすることで豆腐表示が一瞬画面にされることなく、Font Awesomeのアイコンフォントが表示されるようになります。ここで説明したWebフォントの先読み機能は次のWebGLで実装するときに必須となってきます。

### WebGL (Three.js)での利用方法

今回はWebGLの説明としてJSライブラリ「[Three.js](https://ics.media/tutorial-three/)」で解説します。WebGLでは線か塗り（テクスチャ塗りも含む）しか描画できないため「テキストを表示する」という概念がありません。そのためテキストを3D空間内に表示させたい場合は**テキストを画像化する手順が必要**となります。テキストを画像化するためには事前にフォントの読み込みが完了している必要がありますので、さきほど説明したJSライブラリ「WebFont」の活用が必須となってきます。

**またテキストを画像化するにはHTML5 Canvasを利用します。これはGPU側に転送できる画像要素がImage要素かcanvas要素の2種類に限られるからです。**今回のような用途では動的な画像情報を扱えるcanvas要素が適しています。CreateJSのAPIの[cache()メソッド](http://www.createjs.com/docs/easeljs/classes/DisplayObject.html#method_cache)を使えば、任意のグラフィックを手間なく画像化（canvas要素化）できます。具体的なコードは下記の通りとなります。

```
/**
 * 初期化前に必要な素材を読み込みます。
 */
function preload() {
  // JSライブラリ「WebFont」を使って、フォントの読み込み完了を検知
  WebFont.load({
    // (一部省略)
    // Web Fontが使用可能になったとき
    active: init
  });
}

/**
 * コンテンツを初期化します。
 */
function init() {
  // アイコンの Unicode を指定
  const iconUnicode = "f26b";
  // Unicode から文字コードに変換
  const iconInt = parseInt(iconUnicode, 16);
  // 文字コードから文字列に変換する
  const iconStr = String.fromCharCode(iconInt);
  // CreateJS のテキストを作成
  const iconText = new createjs.Text(
    iconStr,
    "256px FontAwesome",
    "#00F"
  );
  // Canvas 要素としてレンダリングさせる
  iconText.cache(0, 0, 256, 256);

  // Three.js のテクスチャに展開する(GPU にアップロードする)
  const texture = new THREE.Texture(iconText.cacheCanvas);
  texture.needsUpdate = true;

  // 平面を作成する
  const geometry = new THREE.PlaneBufferGeometry(40, 40);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  // メッシュオブジェクトを作成し、3D空間に追加する
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
```

-   [実行結果を確認する](https://ics-creative.github.io/150813_fontawesome/5_threejs.html)
-   [全てのコードを確認する : 5\_threejs.js](https://github.com/ics-creative/150813_fontawesome/blob/master/5_threejs.js)

![](https://ics.media/entry/8385/images/150813_fontawesome_5.png)

### WebGL (Three.js)でさまざまなアイコンを表示する

さきほどの作例と同様にループ文を使ってすべてのアイコンを表示してみましょう。筆者の昔の記事「[ベクターテキストを扱えるようになったPapervision3D | ClockMaker Blog](http://clockmaker.jp/blog/2008/12/papervision_vector_font/)」（2009年）と同じ表現ですが、WebGL(Three.js)にリファクタリングしています。

-   [実行結果を確認する](https://ics-creative.github.io/150813_fontawesome/6_threejs_all.html)
-   [全てのコードを確認する : 6\_threejs\_all.js](https://github.com/ics-creative/150813_fontawesome/blob/master/6_threejs_all.js)

![](https://ics.media/entry/8385/images/150813_fontawesome_6.png)

### まとめ

Webフォントはベクター情報であり装飾の自由度が高いため、表現作成に使いやすいというメリットがあります。DOM（div要素等）を中心とした設計はウェブページに適していますが、**ゲームや広告系コンテンツではパフォーマンスが重視されるためDOMよりはHTML5 CanvasやWebGLを採用するほうがいい場合もあるでしょう。本記事ではアイコン用途のWebフォント「Font Awesome」を紹介しましたが、いかなるWebフォントでも今回紹介したテクニックは利用可能です。**HTML5 CanvasやWebGLを活用したコンテンツ制作のときのアイデアとしてご活用くださいませ。