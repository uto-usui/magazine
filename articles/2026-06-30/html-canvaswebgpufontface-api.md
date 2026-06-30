---
title: "HTML CanvasとWebGPUでウェブフォントを扱う方法〜FontFace APIの解説"
source: "https://ics.media/entry/8385/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2015-08-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ウェブフォントは異なる環境でもフォントの見栄えを確保する手段として、多くのウェブサイトで利用されています。

ウェブフォントはCSSとしては利用しやすいものの、HTML CanvasやWebGL、WebGPUを採用した場合にCSSのように簡単には使えません。この記事ではインタラクションコンテンツ制作で役立つようにHTML CanvasとWebGPUでのウェブフォントの使い方をまとめます。本記事のサンプルコードは[GitHub](https://github.com/ics-creative/150813_fontawesome)で公開していますので、ダウンロードして読み進めてください。

この記事で学べること

-   DOMで日本語ウェブフォントを表示する基本
-   FontFace APIでウェブフォントの読み込み完了を待つ方法
-   Canvas 2Dで日本語テキストを描画する方法
-   WebGPUで日本語テキストをテクスチャ化する方法
-   アイコンフォントにも応用する方法

### オリジナルサンプルを紹介

HTML CanvasとWebGL・WebGPUの活用例をご覧ください。

-   [デモを別ウインドウで再生する](https://ics-ikeda.github.io/250909_apple_watch_modoki/)

記事「[HTML CanvasとWebGLの使い分け](https://ics.media/entry/5140/)」で紹介したApple WatchのUIを模倣したデモです。時計内のアイコン部分にウェブフォントのFont Awesomeを利用しています。HTML CanvasとWebGL(Pixi.js)で制作しています。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/150810_threejs_mosaic/DemoIcons.html)

記事「[高機能なモーション制作用JSライブラリGSAPを使ったタイムリマップ表現](https://ics.media/entry/7162/)」で紹介したWebGLのタイムリマップデモです。無数のアイコンが収束して文字が浮かび上がりますが、このアイコンにウェブフォントのFont Awesomeを利用しています。HTML CanvasとWebGPU(Three.js)で制作しています。

### 1\. DOMでウェブフォントを表示する

はじめに、普通のHTMLでのウェブフォントの表示について触れておきましょう。日本語フォントとアイコンフォントは、どちらもCSSを読み込むだけで利用できます。

日本語フォントの例です。

```
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Reggae+One&display=swap"
/>
<link rel="stylesheet" href="common.css" />

<main class="jp-copy">
  <span>日本語</span>
  <span>ウェブフォント</span>
  <small>Google FontsのReggae OneをDOMで表示します。</small>
</main>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/150813_fontawesome/01_dom_japanese.html)
-   [コードを確認する](https://github.com/ics-creative/150813_fontawesome/blob/master/01_dom_japanese.html)

アイコンフォントの例です。

```
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/css/all.min.css"
/>
<link rel="stylesheet" href="common.css" />

<div class="icon-strip">
  <i class="fa-solid fa-bell"></i>
  <i class="fa-solid fa-chess-knight"></i>
  <i class="fa-solid fa-backward"></i>
  <i class="fa-solid fa-bolt"></i>
  <i class="fa-solid fa-calendar"></i>
  <i class="fa-solid fa-cloud"></i>
  <i class="fa-solid fa-square-rss"></i>
  <i class="fa-solid fa-wifi"></i>
  <i class="fa-solid fa-gear"></i>
  <i class="fa-solid fa-rotate-right"></i>
</div>
```

DOMなら**CSSだけ**で扱えるため、もっとも手軽です。日本語フォントもアイコンフォントも、まずはこの方法で見た目を確認し、その後にCanvasやWebGPUへ展開していくと理解しやすいでしょう。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/150813_fontawesome/02_dom_icon.html)
-   [コードを確認する](https://github.com/ics-creative/150813_fontawesome/blob/master/02_dom_icon.html)

### 2\. Canvas 2Dで日本語を描画する

Canvas 2Dでは、先にフォントファイルを読み込み、利用可能になったあとで`fillText()`メソッドを呼ぶ必要があります。

ウェブフォントはフォントデータのダウンロードが終わるまでは、扱えません。そのため上記のデモを試すと、一瞬「豆腐」が表示されることがあります。豆腐とは、割り当て可能なフォントがないときに表示される四角形の文字です。余談ですが、Googleが提供する「[Noto Fonts](https://www.google.com/get/noto/)」というCJKフォントは「豆腐になることがない」=「No 豆腐」ということで名付けられたものです。[Wikipedia](https://ja.wikipedia.org/wiki/Noto)でも紹介されています。

重要になるのが`FontFace` APIです。JavaScriptからフォントを読み込んで利用可能にするためのブラウザー標準APIです。`new FontFace()`でフォントの定義を作り、`load()`で実ファイルを読み込み、`document.fonts.add()`でページに登録します。さらに`document.fonts.ready`を待つことで、「**まだフォントが読み込み中なので該当フォントで表示できない**」という状態を避けられます。

```
/**
 * フォント「Reggae One」を読み込み、Canvasから使える状態にします。
 */
async function loadFontReggaeOne() {
  // FontFaceとして定義
  const fontFace = new FontFace(
    "Reggae One",
    'url("https://fonts.gstatic.com/s/reggaeone/v19/7r3DqX5msMIkeuwJwOJt_a4.ttf") format("truetype")',
    { style: "normal", weight: "400" },
  );

  // 読み込み完了を待ってdocument.fontsへ登録
  const loadedFontFace = await fontFace.load();
  document.fonts.add(loadedFontFace);

  // 利用可能状態になるまで待機
  await document.fonts.ready;
}
```

フォントの読み込みが終わったら、通常の文字列として日本語を描画します。

```
// 先に日本語フォントを読み込む
await loadFontReggaeOne();

// canvasとcontextの取得、resizeCanvas()は省略
const { cssWidth, scale } = resizeCanvas();

// 文字描画のスタイルを設定
context.fillStyle = "#111111";
context.textAlign = "center";
context.textBaseline = "middle";

// 日本語テキストを順に描画
context.font = `${140 * scale}px "Reggae One"`;
context.fillText("日本語", cssWidth / 2, 170 * scale);
context.font = `${80 * scale}px "Reggae One"`;
context.fillText("ウェブフォント", cssWidth / 2, 300 * scale);
context.font = `${52 * scale}px "Reggae One"`;
context.fillText("Canvas 2D", cssWidth / 2, 420 * scale);
```

DOMと違って、Canvasでは`font`、`fillStyle`、`textAlign`、`textBaseline`を自前で決める必要があります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/150813_fontawesome/11_canvas_japanese.html)
-   [コードを確認する](https://github.com/ics-creative/150813_fontawesome/blob/master/11_canvas_japanese.html)

### 3\. Canvas 2Dでアイコンフォントを描画する

アイコンフォントでも、やることは同じです。最初にフォントを読み込み、描画時にはアイコンを1文字として`fillText()`へ渡します。グリフとは、ここではフォントの中に入っている実際の文字やアイコンの形そのものを指します。

DOMでは`<i class="fa-solid fa-bell"></i>`のようにクラス名で指定できます。ブラウザー側に「`fa-bell`ならベルのアイコン🔔を表示する」という仕組みがあるためです。

一方、Canvasにはその仕組みがありません。`fillText()`メソッドに渡せるのは文字列だけで、`fa-bell`のようなクラス名を書いてもアイコンにはなりません。そこで、まずはFont Awesomeが持っているコードポイントを取り出します。ベル🔔なら`f0f3`のような値です。

この値は「どのグリフを使うか」を表す番号なので、そのままでは描画できません。`String.fromCodePoint()`を使って実際の1文字へ変換し、その1文字を`fillText()`メソッドへ渡すことで、はじめてCanvas上にアイコンを描けます。

```
// コードポイントを1文字へ変換
const icon = String.fromCodePoint(parseInt("f118", 16));

// フォントを読み込んでから描画
await loadIconFont();

// canvasとcontextの取得、resizeCanvas()は省略
const { scale } = resizeCanvas();

// 単体アイコンを1文字として描画
context.font = `900 ${540 * scale}px "Font Awesome 7 Free"`;
context.fillStyle = "#000000";
context.textBaseline = "top";
context.fillText(icon, 0, 0);
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/150813_fontawesome/12_canvas_icon.html)
-   [コードを確認する](https://github.com/ics-creative/150813_fontawesome/blob/master/12_canvas_icon.html)

### 4\. Three.js + WebGPUで日本語を表示する

WebGPUではフォントそのものを直接3D空間へ置くのではなく、一度Canvasに日本語テキストを描いてから**テクスチャへ変換**します。先に日本語フォントを読み込み、Canvas上でそのフォントが使える状態にしてから描画します。

```
// 先に日本語フォントを読み込む
await loadFontReggaeOne();

// sceneやcameraの初期化は省略

// テクスチャの元になるCanvasを作成
const textCanvas = document.createElement("canvas");
const textContext = textCanvas.getContext("2d");

// Canvas上へ日本語テキストを描画
textCanvas.width = 1024;
textCanvas.height = 512;
textContext.fillStyle = "#ffffff";
textContext.textAlign = "center";
textContext.textBaseline = "middle";
textContext.font = '180px "Reggae One"';
textContext.fillText("日本語", 512, 190);
textContext.font = '88px "Reggae One"';
textContext.fillText("WebGPU", 512, 340);

// Canvasの内容をテクスチャと平面へ変換
const texture = new THREE.CanvasTexture(textCanvas);
texture.needsUpdate = true;
const geometry = new THREE.PlaneGeometry(80, 40);
const material = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

Canvasで一度描いてからテクスチャへ変換することで、日本語のウェブフォントもThree.js空間で扱えます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/150813_fontawesome/21_webgpu_japanese.html)
-   [コードを確認する](https://github.com/ics-creative/150813_fontawesome/blob/master/21_webgpu_japanese.html)

### 5\. Three.js + WebGPUでアイコンを並べる

アイコンフォントでも同じ考え方が使えます。各アイコンをCanvasへ描き、その内容を**`CanvasTexture`**に変換して平面メッシュへ貼り付けます。これを繰り返して、多数のアイコンを3D空間へ配置します。

ここでも、Three.jsへ直接「ベルのアイコン」や`fa-bell`のような名前を渡せるわけではありません。Canvasへ渡せるのは文字列だけなので、一覧データの段階でFont Awesomeのコードポイントを実際の1文字へ変換し、その文字をテクスチャ化しています。

筆者の昔の記事「[ベクターテキストを扱えるようになったPapervision3D | ClockMaker Blog](http://clockmaker.jp/blog/2008/12/papervision_vector_font/)」と同じ発想の表現です。

```
const COLOR_LIST = [0x003399, 0x0066cc, 0x0099ff, 0x33ccff];

/**
 * アイコン1文字から平面メッシュを作成します。
 *
 * @param {string} icon Font Awesomeのグリフを1文字に変換した文字列。たとえばベルアイコンなら"\uf0f3"
 */
function createIconMesh(icon) {
  // アイコン1個ぶんの描画先Canvas
  const iconCanvas = document.createElement("canvas");
  const iconContext = iconCanvas.getContext("2d");

  // Canvas上へアイコンを描画
  iconCanvas.width = 256;
  iconCanvas.height = 256;
  iconContext.font = '900 200px "Font Awesome 7 Free"';
  iconContext.fillStyle = "#ffffff";
  iconContext.textAlign = "center";
  iconContext.textBaseline = "middle";
  iconContext.fillText(icon, 128, 128);

  // Canvasをテクスチャ化して平面へ貼る
  const texture = new THREE.CanvasTexture(iconCanvas);
  return new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshBasicMaterial({
      color: COLOR_LIST[(COLOR_LIST.length * Math.random()) >> 0],
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    }),
  );
}
```

日本語フォントの例では表示したい文字列をそのままCanvasへ描きましたが、アイコンフォントではその前に「描画用の1文字」を作る工程が入ります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/150813_fontawesome/23_webgpu_icon_all.html)
-   [コードを確認する](https://github.com/ics-creative/150813_fontawesome/blob/master/23_webgpu_icon_all.html)

### まとめ

今回のサンプルで重要なのは、`FontFace` APIを使ってフォントファイルそのものを明示的に読み込んでいる点です。DOMではCSSだけでも表示できますが、CanvasやWebGPUでは「**いつフォントが使えるようになったか**」を自分で制御する必要があります。

ウェブフォントを使うと、異なる環境でも表示を統一できます。ぜひご活用ください。

### 更新履歴

-   2015年8月：初版。`WebFontLoader`、CreateJS、WebGLを使ったウェブフォントの扱い方を紹介
-   2026年4月：CreateJSと`WebFontLoader`を使った構成をやめ、`FontFace API`を使う構成へ刷新。日本語ウェブフォントの作例とWebGPUの解説を追加

※この記事が公開されたのは**10年前**ですが、**2か月前の4月**に内容をメンテナンスしています。