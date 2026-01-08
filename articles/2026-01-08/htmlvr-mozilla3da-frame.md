---
title: "HTMLタグで本格VRコンテンツが作れる！ Mozillaが開発した3DライブラリA-Frame"
source: "https://ics.media/entry/13401/"
publishedDate: "2016-09-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

WebXRフレームワークの「A-Frame」を使えば、JavaScriptを記述することなく、HTMLにタグを追加するだけでVRコンテンツが作成できます。

次のデモはA-Frameを用いてt作成したオリジナルのVRデモです。中央の円状のカーソルを牛の3Dモデルに重ねることでアニメーションします。

![プログラムを使わず作成したVRコンテンツ](https://ics.media/entry/13401/images/160914_aframe10.jpg)

※パソコンではドラッグ、スマートフォンではジャイロセンサーが検知した傾きで視点が変わります。右下のアイコンをクリックすると、HMDで閲覧できるモードへ切り替わります。

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/160914_aframe/demo6/)

### HTMLをマークアップするようにVRコンテンツを作成しよう

![A-Frame公式ページキャプチャー](https://ics.media/entry/13401/images/160914_aframe03.jpg)

VRコンテンツをHTMLのマークアップのように作成するには、JavaScriptライブラリ「[A-Frameエー・フレーム](https://aframe.io/)」を使用します。「やっぱりJavaScriptを使うのか」と思うかもしれませんが、HTMLからこのライブラリを読み込むだけで、VRコンテンツに必要な処理を用意してくれます。

![A-FrameのGitHubページで公開されている事例](https://ics.media/entry/13401/images/3258460c-f67c-11e5-8176-5b66c3169a1c.gif)

▲A-Frameを使用して作られたVRコンテンツの事例。A-Frameの[GitHubページ](https://github.com/aframevr/aframe/)より引用

A-Frameは、もともとは[Mozilla](https://www.mozilla.jp/)のVRチームが開発した**WebVRフレームワーク**です。現在はSupermediumやGoogleの開発者が運営しています。WebVRとは、Webブラウザから[Quest](https://www.meta.com/jp/ja/quest/products/quest-2/)などのHMD（ヘッドマウントディスプレイ）へVRコンテンツを出力する仕組みのことです。このWebVRを採用することで、**Webのテクノロジーで作成したVRコンテンツをHMDで体験できるようになります**。HMDを持っていない方でも、[Google Cardboard](https://www.google.com/get/cardboard/)とスマートフォンがあれば体験できます。

![Google Cardboard](https://ics.media/entry/13401/images/160914_aframe01.jpg)

▲Google Cardboard

### A-Frameを使用したVRコンテンツの作り方をデモを交えて紹介

A-Frameを使用したVRコンテンツの作り方を6つのオリジナルデモで紹介します。本記事では、A-Frameの基本的な使いかたの解説となるため、詳しいことを知りたい方はA-Frameの[公式ドキュメントページ](https://aframe.io/docs/)をご覧ください。

-   [すべてのコードを見る](https://github.com/ics-creative/160914_aframe)
-   [デモファイル（ZIP）をダウンロード](https://github.com/ics-creative/160914_aframe/archive/master.zip)

#### A-Frameを使うための下準備

##### ライブラリのダウンロード

A-Frameの[GitHubページ](https://github.com/aframevr/aframe/)からライブラリをダウンロードします。GitHubページの右上にある［Code］ボタンをクリックし、その中から［Download ZIP］をクリックします。すると、ライブラリのデータが入ったZipファイルがダウンロードされるので、任意の場所に展開します。

展開した`aframe-master`フォルダー内の`dist`フォルダーに`aframe-master.min.js`というJavaScriptファイルがあるので、作業する任意の場所に格納します。そのJavaScriptファイルを、次のようにHTMLから読み込むだけで準備完了です。

```
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <!-- A-FrameのJavaScriptファイルを読み込みます -->
    <script src="../assets/js/aframe-master.min.js"></script>
  </head>
  <body>
    <!-- A-Frameのタグを記述します -->
  </body>
</html>
```

もしくは、CDNから以下のscriptタグを読み込むことでも導入できます。

```
<script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
```

### ボックスを配置するデモ

![ボックスを配置するデモ](https://ics.media/entry/13401/images/160914_aframe05.jpg)

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/160914_aframe/demo1/)
-   [コードを確認する](https://github.com/ics-creative/160914_aframe/blob/main/demo1/index.html)

3D空間（シーン）にボックスを配置するデモです。A-Frameでは、シーンにオブジェクトを追加することでコンテンツを作っていきます。

このデモは3種類の要素を`body`要素内に記述するだけで実現できます。まず始めに、3Dを描画するシーンを`a-scene`要素で追加します。その中に`a-box`要素（ボックス）と`a-sky`要素（背景）を追加すると3D空間に表示されます。

```
<body>
  <!-- シーン -->
  <a-scene>
    <!-- ボックス -->
    <a-box
      position="0 0.5 -1.5"
      rotation="0 45 0"
      width="1"
      height="1"
      depth="1"
      color="#e67e22"
    ></a-box>

    <!-- 背景 -->
    <a-sky color="#fafafa"></a-sky>
  </a-scene>
</body>
```

`a-box`要素の`position`属性でXYZ軸方向の座標、`rotation`属性でXYZ軸方向の回転角度、`width`属性で幅、`height`属性で高さ、`depth`属性で奥行き、`color`属性で色を設定します。

```
<!-- ボックス -->
<a-box
  position="0 0.5 -1.5"
  rotation="0 45 0"
  width="1"
  height="1"
  depth="1"
  color="#e67e22"
></a-box>
```

`a-sky`要素でシーンの`color`属性で背景色を設定します。

```
<!-- 背景 -->
<a-sky color="#fafafa"></a-sky>
```

### ボックスにテクスチャーを設定するデモ

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/160914_aframe/demo2/)
-   [コードを確認する](https://github.com/ics-creative/160914_aframe/blob/main/demo2/index.html)

「ボックスを配置するデモ」で配置したボックスにテクスチャーを設定するデモです。

A-Frame内で外部ファイルを使用するときは`a-assets`要素内に追加します。`a-assets`要素内に追加した外部ファイルを使用する場合は、オブジェクトの`src`属性で参照します。

```
<body>
  <!-- シーン -->
  <a-scene>
    <!-- アセット -->
    <a-assets>
      <img id="texture" src="../assets/images/texture.jpg" />
    </a-assets>

    <!-- ボックス -->
    <a-box
      src="#texture"
      position="0 0.5 -1.5"
      rotation="0 45 0"
      width="1"
      height="1"
      depth="1"
    ></a-box>

    <!-- 背景 -->
    <a-sky color="#fafafa"></a-sky>
  </a-scene>
</body>
```

`a-scene`要素内に`img`要素でテクスチャーの画像ファイルを追加します。`img`要素の`id`属性でオブジェクトから参照時に使用するID、`src`属性で画像ファイルのファイルパスを設定します。

```
<!-- アセット -->
<a-assets>
  <img id="texture" src="../assets/images/texture.jpg" />
</a-assets>
```

`a-assets`要素内に追加したテクスチャーをボックスに反映します。`a-box`要素の`src`属性に、テクスチャーIDの先頭に`#`をつけた文字列を設定します。

```
<!-- ボックス -->
<a-box
  src="#texture"
  position="0 0.5 -1.5"
  rotation="0 45 0"
  width="1"
  height="1"
  depth="1"
></a-box>
```

### 3Dモデルを配置するデモ

![3Dモデルを配置するデモ](https://ics.media/entry/13401/images/160914_aframe07.jpg)

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/160914_aframe/demo3/)
-   [コードを確認する](https://github.com/ics-creative/160914_aframe/blob/main/demo3/index.html)

3Dモデルをシーンに配置するデモです。3Dモデルのファイルフォーマットには、多くの3Dモデリング・レンダリングソフトでサポートされているOBJ形式を使用します。

```
<body>
  <!-- シーン -->
  <a-scene>
    <!-- アセット -->
    <a-assets>
      <!-- 3Dモデルデータ -->
      <a-asset-item
        id="cow-obj"
        src="../assets/obj/spot_quadrangulated.obj"
      ></a-asset-item>
      <!-- マテリアルデータ -->
      <a-asset-item
        id="cow-mtl"
        src="../assets/obj/spot_quadrangulated.mtl"
      ></a-asset-item>
    </a-assets>

    <!-- 3Dモデル -->
    <a-entity
      obj-model="obj: #cow-obj; mtl: #cow-mtl"
      position="0 1 -1.5"
      rotation="0 135 0"
    ></a-entity>

    <!-- 背景 -->
    <a-sky color="#fafafa"></a-sky>
  </a-scene>
</body>
```

A-FrameでOBJ形式の3Dモデルを配置するには、3DのモデルデータであるOBJファイルと、マテリアル（オブジェクト上の質感）のデータであるMTLファイルが必要です。`a-scene`要素内に`a-asset-item`要素として追加します。

```
<!-- アセット -->
<a-assets>
  <!-- 3Dモデルデータ -->
  <a-asset-item
    id="cow-obj"
    src="../assets/obj/spot_quadrangulated.obj"
  ></a-asset-item>
  <!-- マテリアルデータ -->
  <a-asset-item
    id="cow-mtl"
    src="../assets/obj/spot_quadrangulated.mtl"
  ></a-asset-item>
</a-assets>
```

3Dモデルの描画には`a-entity`要素を使用します。`obj-model`属性に`obj: #cow-obj`で3Dモデルデータを、`mtl: #cow-mtl`でマテリアルデータを設定します。

```
<!-- 3Dモデル -->
<a-entity
  obj-model="obj: #cow-obj; mtl: #cow-mtl"
  position="0 1 -1.5"
  rotation="0 135 0"
></a-entity>
```

### アニメーションを設定するデモ

![アニメーションを設定するデモ](https://ics.media/entry/13401/images/160914_aframe08.jpg)

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/160914_aframe/demo4/)
-   [コードを確認する](https://github.com/ics-creative/160914_aframe/blob/main/demo4/index.html)

「3Dモデルを配置するデモ」で配置した3Dモデルにアニメーションを設定します。

```
<body>
  <!-- シーン -->
  <a-scene>
    <!-- アセット -->
    <a-assets>
      <!-- 3Dモデルデータ -->
      <a-asset-item
        id="cow-obj"
        src="../assets/obj/spot_quadrangulated.obj"
      ></a-asset-item>
      <!-- マテリアルデータ -->
      <a-asset-item
        id="cow-mtl"
        src="../assets/obj/spot_quadrangulated.mtl"
      ></a-asset-item>
    </a-assets>

    <!-- 3Dモデル -->
    <a-entity
      obj-model="obj: #cow-obj; mtl: #cow-mtl"
      position="0 0.5 -1.5"
      rotation="0 180 0"
    >
      <a-animation
        attribute="rotation"
        dur="5000"
        to="0 540 0"
        repeat="indefinite"
      ></a-animation>
    </a-entity>

    <!-- 背景 -->
    <a-sky color="#fafafa"></a-sky>
  </a-scene>
</body>
```

`a-entity`要素内に`a-animation`要素を追加してアニメーションを設定します。`attribute`属性でアニメーションさせる属性（ここでは角度させたいため`rotation`）、`dur`属性でアニメーションの再生時間、`to`属性でアニメーションの目標値、`repeat`でアニメーションのリピート回数（ここではループし続けたいため`indefinite`）を設定します。

```
<a-animation
  attribute="rotation"
  dur="5000"
  to="0 540 0"
  easing="ease-in-out-back"
  repeat="indefinite"
></a-animation>
```

### 背景に全天球画像を設定するデモ

![背景に全天球画像を設定するデモ](https://ics.media/entry/13401/images/160914_aframe09.jpg)

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/160914_aframe/demo5/)
-   [コードを確認する](https://github.com/ics-creative/160914_aframe/blob/main/demo5/index.html)

シーンの背景に全天球画像を設定するデモです。背景を単色から全天球画像へ差し替えるだけでグッと没入感が増します。

```
<body>
  <!-- シーン -->
  <a-scene>
    <!-- アセット -->
    <a-assets>
      <!-- 3Dモデルデータ -->
      <a-asset-item
        id="cow-obj"
        src="../assets/obj/spot_quadrangulated.obj"
      ></a-asset-item>
      <!-- マテリアルデータ -->
      <a-asset-item
        id="cow-mtl"
        src="../assets/obj/spot_quadrangulated.mtl"
      ></a-asset-item>
      <!-- 全天球画像 -->
      <img id="sky" src="../assets/images/puydesancy.jpg" />
    </a-assets>

    <!-- 3Dモデル -->
    <a-entity
      obj-model="obj: #cow-obj; mtl: #cow-mtl"
      position="0 1 -2"
      rotation="0 180 0"
    >
      <a-animation
        attribute="rotation"
        dur="5000"
        to="0 540 0"
        repeat="indefinite"
      ></a-animation>
    </a-entity>

    <!-- 全天球背景 -->
    <a-sky src="#sky" rotation="0 -130 0"></a-sky>
  </a-scene>
</body>
```

`a-assets`要素内に全天球画像を追加します。

```
<!-- アセット -->
<a-assets>
  // 略
  <!-- 全天球画像 -->
  <img id="sky" src="../assets/images/puydesancy.jpg" />
</a-assets>
```

`a-sky`要素の`src`属性で`a-assets`要素内に追加した全天球画像を設定します。

```
<!-- 全天球背景 -->
<a-sky src="#sky" rotation="0 -130 0"></a-sky>
```

### VRコンテンツを操作するUIの実装するデモ

![VRコンテンツを操作するUIの実装するデモ](https://ics.media/entry/13401/images/160914_aframe10.jpg)

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/160914_aframe/demo6/)
-   [コードを確認する](https://github.com/ics-creative/160914_aframe/blob/main/demo6/index.html)

VRコンテンツは視界が奪われてしまうため、キーボードやマウスでの操作は向いてません。そのため、視界の中央にカーソルを配置し、そのカーソルが一定時間とどまったところをアクティブ状態と判断するといったVR独特なUIの実装が必要になります。

```
<body>
  <!-- シーン -->
  <a-scene>
    <!-- アセット -->
    <a-assets>
      <!-- 3Dモデルデータ -->
      <a-asset-item
        id="cow-obj"
        src="../assets/obj/spot_quadrangulated.obj"
      ></a-asset-item>
      <!-- マテリアルデータ -->
      <a-asset-item
        id="cow-mtl"
        src="../assets/obj/spot_quadrangulated.mtl"
      ></a-asset-item>
      <!-- 全天球画像 -->
      <img id="sky" src="../assets/images/puydesancy.jpg" />
    </a-assets>

    <!-- カメラ -->
    <a-camera>
      <!-- カーソル -->
      <a-entity cursor="fuse: true; fuseTimeout: 1000">
        <!-- リング -->
        <a-ring
          color="#e74c3c"
          radius-inner="0.01"
          radius-outer="0.015"
          position="0 0 -0.75"
        ></a-ring>
      </a-entity>
    </a-camera>

    <!-- 3Dモデル -->
    <a-entity
      obj-model="obj: #cow-obj; mtl: #cow-mtl"
      position="0 0.5 -3"
      rotation="0 180 0"
    >
      <a-animation
        begin="click"
        attribute="rotation"
        dur="5000"
        to="0 540 0"
      ></a-animation>
    </a-entity>

    <!-- 全天球背景 -->
    <a-sky src="#sky" rotation="0 -130 0"></a-sky>
  </a-scene>
</body>
```

カーソルを常に視界の中央に配置するには、カメラと結びつける必要があります。`a-scene`要素に`a-camera`要素を追加し、その中にカーソルとなる`a-entity`要素を追加します。`a-entity`要素の`cursor`属性に`fuse: true`でカーソルを有効、`fuseTimeout: 1000`でアクティブと判断するまでの時間（ここでは1000ミリ秒＝1秒）を設定します。

```
<!-- カメラ -->
<a-camera>
  <!-- カーソル -->
  <a-entity cursor="fuse: true; fuseTimeout: 1000">
    <!-- リング -->
    <a-ring
      color="#e74c3c"
      radius-inner="0.01"
      radius-outer="0.015"
      position="0 0 -0.75"
    ></a-ring>
  </a-entity>
</a-camera>
```

このデモでは、3Dモデルがアクティブになったらアニメーションが始まるようにするため、`a-animation`要素の`begin`属性に`click`を指定します。

```
<a-animation
  begin="click"
  attribute="rotation"
  dur="5000"
  to="0 540 0"
></a-animation>
```

### まとめ

A-Frameだと手軽にVRコンテンツを作成できます。スマートフォンのジャイロセンサーの機能を使って空間をぐるぐる見渡したいコンテンツなどには、A-Frameでも充分ではないでしょうか。

JavaScriptが得意でない方にはなかなか手が出せなかったWebVRですが、これを期に挑戦してみてはいかがでしょうか。ここぞというときのネタの1つとなれれば幸いです。

類似のライブラリには、JSX構文を使ってThree.jsを制御する「[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)」というJSライブラリがあります。A-Frameは内部的にはThree.jsが使われているので、A-FrameとReact Three Fiberは似ていると思われることがあります。

A-Frameはお手軽VRを試すモノだとすると、React Three Fiberは汎用的な3D表現を作成するものです。