---
title: "エフェクト作成ツールのEffekseerがWebGLに対応。Web表現の新兵器となるか"
source: "https://ics.media/entry/15745/"
publishedDate: "2017-06-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

エフェクトツール「[Effekseer](http://effekseer.github.io/)」ですが、2017年5月25日、WebGLに対応した[EffekseerForWebGL](https://github.com/effekseer/EffekseerForWebGL)がリリースされました。今回はEffekseerで作成したエフェクトをJavaScriptライブラリ「Three.js」を使ってWebGLで表示するまでの流れを紹介します。

### EffekseerForWebGLのデモ

![alt属性です](https://ics.media/entry/15745/images/170612_effekseer_webgl_demo_image.jpg)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/170612_effekseer_webgl/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/170612_effekseer_webgl)

### Effekseerでのエフェクト作成をオススメしたい理由とは？

-   **1つのエフェクトソースでマルチプラットフォームに展開**できる点。たとえばEffekseerはUnityにも対応しているため、**WebブラウザとUnityプラットフォームの両方に対応**できます (DirectXやOpenGLを用いたアプリケーション、[Cocos2d-x](http://www.cocos2d-x.org/)、[Unreal Engine4](https://www.unrealengine.com/ja/blog)、さらには[MMD](http://www.geocities.jp/higuchuu4/)や[Siv3D](http://play-siv3d.hateblo.jp/)にも対応）。Unity用コンテンツをWebに展開する際（逆もまた同様）、**Effekseerでエフェクトを作成しておくと作り直しは必要ありません。**
-   GUIを使ってエフェクトが作成できるため、プログラマーとアーティストの分業ができる点
-   ツールがオープンソースで無料
-   ツールの動作が軽快なところ
-   [公式サイト](http://effekseer.github.io/)で150個以上の自由に使える[サンプル](http://effekseer.github.io/jp/contribute.html)がダウンロードでき、エフェクト初心者でもはじめやすい

### EffekseerForWebGLの使い方

ウェブページでWebGLとして表示するまでの流れはこんな感じです。

#### Step1：JSライブラリの読み込み

HTMLでscriptタグを使って、Three.jsとEffekseerForWebGLのJSライブラリを読み込みます。

```
<script src="three.min.js"></script>
<script src="effekseer.min.js"></script>
```

#### Step2：エフェクトファイルの読み込みとThree.jsへの組み込み

JavaScriptとして次のように書きます。ここではEffecseerのエフェクトファイルを読み込む処理を記載しています。

```
// WebGLRendererの初期化
var renderer = new THREE.WebGLRenderer();

// effekseerの初期化
effekseer.init(renderer.context);

// エフェクトファイルの読み込み
var effect = effekseer.loadEffect(
  "Laser01.efk",
  function() {
    // 読み込み完了
    // エフェクトファイルの再生
    effekseer.play(effect);
  }
);
```

#### Step3:エフェクトのレンダリング

JavaScriptに毎フレーム実行されるループ処理を書きます。EffekseerとThree.jsの3D空間を合わせた後、それぞれのレンダリング処理を行います。「3D空間を合わせる」とは、カメラの位置や画角・ズームなどを合致させる処理になります。

```
(function renderLoop() {
  requestAnimationFrame(renderLoop);

  // Effekseerの更新
  effekseer.update();

  // Three.jsのレンダリング
  renderer.render(scene, camera);

  // EffekseerをThree.jsの3D空間に合わせる
  effekseer.setProjectionMatrix(
    camera.projectionMatrix.elements
  );
  effekseer.setCameraMatrix(
    camera.matrixWorldInverse.elements
  );

  // Effekseerのレンダリング
  effekseer.draw();
})();
```

### 終わりに

Web3Dコンテンツを作る際、Three.jsを選ぶ方は多いと思います。Three.jsの3D空間へ簡単にエフェクトを組み込むことができるEffekseerForWebGL、使ってみたいと思われた方が多いのではないでしょうか？　現在β版のためEffekseerの一部の機能でうまく動かないところもありますが（3Dモデルを使ったエフェクト等）、パーティクルやUVスクロール、リボンを用いたエフェクトなどGUIツールで作成したエフェクトが動作可能となっています。  
Effekseerが気になった方は下記のエフェクト作成入門講座などを参考にしていただき、ぜひチャレンジしてもらえると嬉しく思います。

#### サンプルファイルのダウンロード

-   [GitHub（ics-creative/170612\_effekseer\_webgl）](https://github.com/ics-creative/170612_effekseer_webgl/tree/master/docs/Resource)

#### ライブラリのダウンロード

-   [GitHub（effekseer/EffekseerForWebGL）](https://github.com/effekseer/EffekseerForWebGL)
-   [three.js](https://threejs.org/)

#### エフェクト作成入門講座 (バックナンバー)

-   [Effekseer編 UVスクロールを使ったマグマエフェクトの作成](https://ics.media/entry/8674/)
-   [Effekseer編 リング描画を使った乱れ斬りエフェクトの作成](https://ics.media/entry/9270/)
-   [Effekseer編 Fカーブを使った吹雪エフェクトの作成](https://ics.media/entry/10377/)
-   [PopcornFx編 タービュランスノイズを使った花火エフェクトの作成](https://ics.media/entry/10921/)
-   [Effekseer編 UVスクロールを使ったロゴアニメーションの作成](https://ics.media/entry/11650/)
-   [Effekseer編 ゆがみ効果を使ったトランジションエフェクトの作成](https://ics.media/entry/12467/)
-   [Effekseer編 ネオン風テキストストロークアニメーション](https://ics.media/entry/12967/)