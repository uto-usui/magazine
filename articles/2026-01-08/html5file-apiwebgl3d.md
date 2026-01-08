---
title: "HTML5のFile APIとWebGLを利用した3D写真ビューア"
source: "https://ics.media/entry/2489/"
publishedDate: "2014-09-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

ブラウザ上で高度なグラフィックを描画できるWebGL。また、HTMLには多彩なAPIが備わっています。今回は**iPhoneでも動作する**3Dの写真ビューアーを作ってみました。本記事では次の4つの技術を中心に解説します。

-   ファイルの取り扱いAPI
-   ドラッグアンドドロップのAPI
-   デバイスの傾き検知処理
-   WebGL

![](https://ics.media/entry/2489/images/democap.jpg)

-   [デモを再生する（別ウインドウが開きます）](https://ics-creative.github.io/140929_webgl_photo_viewer/index.html)
-   [ソースコード](https://github.com/ics-creative/140929_webgl_photo_viewer)

※ Androidについては手元の環境では動作しませんでした。

#### iPhoneでの動作ビデオ

実際にiPhoneで動いているデモは以下の動画です。iPhone 5Sです。

### STEP1. ファイルのアップロード方法

HTML5で登場したFile APIを使用すると、ローカルからファイルをアップロードすることができるようになります。ここでは、`input`要素を使う方法と、ドラッグアンドドロップを使う方法を紹介します。デモでは、`demo.FileUpload`クラスで実装しています。

#### input要素を使ってファイルをアップロード

`input`要素の`type`属性で`file`を指定すると、この`input`要素からファイルをアップロードできるようになります。また、multiple属性を指定することで、複数ファイルのアップロードにも対応します。

```
<!--HTMLコード-->
<input type="file" multiple="multiple" />
```

```
// JavaScriptコード
// イベント設定
document
  .getElementById("fileInput")
  .addEventListener("change", inputChangeHandler);
// イベント処理
function inputChangeHandler(event) {
  const files: FileList = event.target.files;
}
```

JavaScriptでは`change`イベントが発生した時に`event.target.files`を参照します。すると、`input`要素に指定されたファイルを取得できます。

-   [デモを再生する（別ウインドウが開きます）](https://ics-creative.github.io/140929_webgl_photo_viewer/step1_1.html)

#### ドラッグアンドドロップでファイルをアップロード

Drag and Drop APIを使うと、HTMLの任意の要素にドラッグしたファイルを取り扱うことができます。ドロップを受け付けたい要素で`drop`イベントを監視し、`event.dataTransfer.files`でファイルを取得できます。

```
// イベント設定
const fileZone = document.querySelector(".file-zone");
// ドラッグオーバー時のイベント処理
fileZone.addEventListener("dragover", event => {
  // デフォルトの挙動を停止
  event.preventDefault();
});
// ドロップ時のイベント処理
fileZone.addEventListener("drop", event => {
  // デフォルトの挙動を停止
  event.preventDefault();
  const files = event.dataTransfer.files;

  console.log(files);
});
```

-   [デモを再生する（別ウインドウが開きます）](https://ics-creative.github.io/140929_webgl_photo_viewer/step1_2.html)
-   [ソースコード](https://github.com/ics-creative/140929_webgl_photo_viewer/blob/master/docs/js/step1_2.js)

### STEP2. ブラウザで受け取ったファイルを読み込む

Step1でローカルからファイルを受け取ったら、今度はそれらのファイルを読み込んでJavaScript内で使えるようにする必要があります。ファイルの読み取りには、`FileReader`クラスを使います。今回は、受け取った画像ファイルを、`HTMLImageElement`にしてWebGLで処理したいので、`HTMLImageElement`に変換することを目指して処理を進めていきます。

```
// FileReaderのインスタンスを生成
const fileReader = new FileReader();
// イベント設定
fileReader.addEventListener("load", fileReadHandler);
// File型のファイルをデータURLとして読み込み
fileReader.readAsDataURL(file);
```

ファイルの読み込みが完了した時に発行されるイベントオブジェクト`event`から、`event.target.result`を参照することで読み込みが完了したデータが取得できます。

-   [デモを再生する（別ウインドウが開きます）](https://ics-creative.github.io/140929_webgl_photo_viewer/step2.html)
-   [ソースコード](https://github.com/ics-creative/140929_webgl_photo_viewer/blob/master/docs/js/step2.js)

### Step3. WebGLで描画

画像の準備が完了したら、WebGLで描画します。今回は、WebGLを扱いやすくしたフレームワークである[Away3D TypeScript](http://typescript.away3d.com/)を使用します。基本的な使用方法は弊社池田の記事が参考になりますのでそちらをご参照いただければと思います。

-   [簡単なJSで始めるWebGL対応Away3Dチュートリアル - 第1回 入門編](https://ics.media/1129/)

※ JavaScriptでの解説記事ですが、基本的にはTypeScriptでも同じです。

デモのWebGLでの描画は、`demo.Main`クラスで実装しています。Mainクラスの初期化処理`init`関数で、Step1、Step2で作成した画像リストを受け取ります。写真のレイアウトについて行っている処理は大きく分けてふたつです。

1.  個別の写真のMeshを作成
2.  各写真を3D空間に配置

### Step4. スマートフォンにおける傾きの取得

スマートフォンなどデバイスの傾きが取得できる環境においては、以下のコードでデバイスの傾きを取得できます。

```
window.addEventListener(
  "deviceorientation",
  onRotationChange
);
```

デバイスが傾いた時に発行される`DeviceOrientationEvent`イベントにて、傾きの値として`event.alpha`、`event.beta`、`event.gamma`、そして`event.webkitCompassHeading`を取得できます。

この傾きを使い、3D空間に対する視点の移動をします。デモでは、`away.controllers.HoverController`の`panAngle`と`tiltAngle`に適用することで、左右、上下の視点の移動を行います。

```
window.addEventListener(
  "deviceorientation",
  onRotationChange
);

/** デバイスの傾きが変わった時 */
function onRotationChange(event) {
  const alpha = Math.floor(event.alpha); // z軸の傾き
  const beta = Math.floor(event.beta); // x軸の傾き
  const gamma = Math.floor(event.gamma); // y軸の傾き

  // 方位の取得(Webkit限定)
  const compassHeading = Math.floor(
    event.webkitCompassHeading
  );
}
```

-   [デモを再生する（別ウインドウが開きます）](https://ics-creative.github.io/140929_webgl_photo_viewer/step4.html)
-   [ソースコード](https://github.com/ics-creative/140929_webgl_photo_viewer/blob/master/docs/js/step4.js)

※ iOS、Android等傾きが検知できるデバイスでお試しください。

#### Tips. それぞれの軸について

![](https://ics.media/entry/2489/images/axis.jpg)

縦長のスマートフォンをディスプレイを上にして地面に置きます。そのとき、ディスプレイから空に向かって垂直に伸びる軸（Z軸）に対する回転が`event.alpha`、ディスプレイの左右にまっすぐ伸びる軸（X軸）に対する回転が`event.beta`、ディスプレイの上下にまっすぐ伸びる軸（Y軸）に対する回転が`event.gamma`です。各軸の詳細については、[W3Cのドラフト](http://w3c.github.io/deviceorientation/spec-source-orientation.html)に詳しいです。

W3Cの仕様によれば、`event.beta`は`-180`から`180`まで、`event.gamma`は`-90`から`90`まで変化するのですが、iOSでは`event.beta`は`-90`から`90`まで、`event.gamma`は`-180`から`180`までの変化となります。

また、`event.alpha`については、デバイスを地面向きから空向きに傾けて行く際、途中で180度変わるという挙動があるため、カメラの水平視点移動には使用しませんでした。代わりに、方位を取得する`event.webkitCompassHeading`を使用しました。

### まとめ

HTML5で使えるようになった新たな技術を用いれば、**デスクトップ、スマートフォンを問わず、ブラウザだけ**でユーザーにリッチな体験を提供できるようになります。

たとえば、キャンペーンサイトの定番であったカルーセル表示等もWebGLを使えば3D表現にできますし、HTML5の位置情報APIを使えばユーザーの住所入力フォームで入力補助ができます。**ブラウザのサポートが広がったことで実案件でも導入しやすくなったHTML5**の技術をぜひ体験してみませんか？