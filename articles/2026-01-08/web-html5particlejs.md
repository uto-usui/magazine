---
title: "Webサイトに華やかな表現を！ HTML5用パーティクルライブラリ「ParticleJS」を公開"
source: "https://ics.media/entry/11172/"
publishedDate: "2016-03-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

JavaScriptライブラリー「[ParticleJS](https://github.com/ics-creative/ParticleJS)」を公開しました。**「ParticleJS」は大量の粒子（パーティクル）の表現を行うためのライブラリー**で、**ゲームの演出やスペシャルコンテンツなどの表現制作に役立ちます**。HTML Canvasとして動作するので、デスクトップ・モバイルを問わずどのブラウザーでも動作します。

また、**「[Particle Develop](https://ics-creative.github.io/project-particle-develop/)」という専用のデザインツールも用意しています。このツールを使うと直感的な操作でデザインでき、**出力したパラメーターを「ParticleJS」にコピペで読み込めます。デザイナーが作成したパーティクル演出をエンジニアが利用するといった連携を想定してます。

MITライセンスで公開していますので、商用利用問わずどなたでも自由に利用が可能です。ソースコードやドキュメントはすべて[GitHub](https://github.com/ics-creative/ParticleJS)にて公開していますので参照ください。

### ParticleJSを使ってみよう

本記事では、**Particle Developでパーティクルのデザインを行い、ParticleJSを使ってHTMLに組み込むまでをステップ形式で解説します**。以下のデモが今回作成するもののサンプルとなります。

![](https://ics.media/entry/11172/images/160226_particlejs_demo_image.png)

-   [サンプルのソースコードを確認する](https://github.com/ics-creative/createjs-particle-system/blob/master/examples/demo.html)
-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/ParticleJS/examples/demo.html)

### ステップ1. Particle Devleopでパーティクルをデザインしよう

まずは、[Particle Develop](https://ics-creative.github.io/project-particle-develop/)でパーティクルをデザインしましょう。画面の右側の\[テンプレート選択\]パネルからベースとなるテンプレートを選択します。次に\[テンプレート選択\]パネルの上部にある\[設定パネル\]タブを切り替え、詳細なパラメーターを変更して、好みのパーティクルを作成します。

![](https://ics.media/entry/11172/images/160226_particlejs_particle-develop.png)  
▲ \[テンプレート選択\]パネルからテンプレートを選択しましょう。

![](https://ics.media/entry/11172/images/160226_particlejs_paramater-detail.png)  
▲ パラメーターを変更して見た目を変えてみましょう。

好みのパーティクルが完成したら、ParticleJSへ設定するためのパラメーターを保存します。［パラメーター保存］ボタンをクリックすると、編集したパーティクルのパラメーターの情報が表示されたモーダルが表示されるので、モーダル内の下部にある［ファイルとして保存 (.json)］ボタンをクリックしてJSON形式のファイルをダウンロードしておきます。これでParticle Develop上の作業は終了です。

![](https://ics.media/entry/11172/images/160226_particlejs_save-paramater.png)

![](https://ics.media/entry/11172/images/160226_particlejs_paramater-modal.png)

### ステップ2. HTMLにライブラリーを組み込もう

HTMLファイルにコードを記述します。**ParticleJSは[CreateJS](https://ics.media/tutorial-createjs/)というHTML5 Canvasの描画ライブラリーに依存しているので**、まずはCreateJSとParticleJSの両方のJavaScriptファイルを読み込みます。

```
<!-- CreateJSのライブラリー読み込み -->
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>

<!-- ParticleJSのライブラリー読み込み -->
<script src="https://cdn.rawgit.com/ics-creative/ParticleJS/release/1.0.0/libs/particlejs.min.js"></script>
```

### ステップ3. パーティクルシステムの準備

body要素内に`canvas`要素を配置します。canvas要素には3つの属性として`id`と`width`（幅）と`height`（高さ）を設定しておきます。

```
<canvas width="960" height="540" id="myCanvas"></canvas>
```

ここからはJavaScriptのコードを記述します。まずは、`createjs.Stage`インスタンスを作成します。`createjs.Stage`とは舞台のようなもので、ここに役者を登録します。コンストラクターの第一引数には、先ほど作成した`canvas`要素のidと同じものを指定して、CreateJSの描画システムと`canvas`要素の関連付けを行います。

続けて、パーティクル制御する`particlejs.ParticleSystem`インスタンスを作成します。作成した`ParticleSystem`の`container`プロパティを`stage.addChild()`メソッドで舞台へ登録します。

```
// Stageオブジェクトを作成します。表示リストのルートになります。
stage = new createjs.Stage("myCanvas");

// パーティクルシステム作成します。
particleSystem = new particlejs.ParticleSystem();

// パーティクルシステムの描画コンテナーを表示リストに登録します。
stage.addChild(particleSystem.container);
```

※CreateJSの描画についてはCreateJSのチュートリアル「[簡単なCreateJSのサンプルを試そう](https://ics.media/tutorial-createjs/quickstart/)」を参照ください。

次にパーティクルの設定を反映させます。「**ステップ1**」で作成したJSON形式のファイルをテキストエディターで開き、中のテキストをコピーします。`particleSystem.importFromJson()`メソッドを記述し、コピーしたJSON形式のテキストを引数として渡します。

```
// Particle Developから保存したパラメーターを反映します。
particleSystem.importFromJson(
// JSONテキストのコピー＆ペースト ここから-- 
{
  "emitFrequency": 300,
  "lifeSpan": "40",
  "lifeSpanVariance": "0",
  ...略...
  "blendMode": true,
  "alphaCurveType": "0"
}
// JSONテキストのコピー＆ペースト ここまで--
);
```

### ステップ4. パーティクルを動かそう

パーティクルを動かすために、`createjs.Ticker`クラスの`addEventListener()`メソッドで、定期的に呼ばれる`handleTick()`関数を登録します。`handleTick()`関数内ではパーティクルの更新のための`particleSystem.update()`メソッドと描画の更新のための `stage.update()`メソッドを呼び出します。

```
// フレームレートの設定
createjs.Ticker.framerate = 60;
// 定期的に呼ばれる関数を登録
createjs.Ticker.on("tick", handleTick);
```

```
function handleTick() {
  // パーティクルの発生・更新
  particleSystem.update();

  // 描画を更新する
  stage.update();
}
```

※`createjs.Ticker`クラスの使い方は、CreateJSのチュートリアル「[CreateJS の Ticker の使い方](https://ics.media/tutorial-createjs/ticker/)」を参照ください。

作業はたったこれだけです！　作成したHTMLファイルを開くと、Particle Developでデザインしたパーティクルがそのままブラウザーで表示することができました。

-   [全体のソースコードを確認する](https://github.com/ics-creative/createjs-particle-system/blob/master/examples/demo.html)

### 終わりに

**Particle DevelopとParticleJSを使うことで、自分でデザインしたパーティクルがあっという間に作成できます**。また、応用としてJavaScript側でパラメーターを制御することで、動的に見た目が変化するパーティクルなども作成できます。[ライブラリのAPI](https://ics-creative.github.io/ParticleJS/docs/)を使えばマウスに追随させたり、時間経過で色を変化させるといったインタラクションを自由に実装できます。次の学習用サンプルもあわせて参照ください。

[![](https://ics.media/entry/11172/images/160226_particlejs_demo-mouse.png)](https://ics-creative.github.io/ParticleJS/docs/examples/mouse-tracking.html)  
▲ マウスに追随するパーティクルのサンプル（[サンプルを開く](https://ics-creative.github.io/ParticleJS/docs/examples/mouse-tracking.html)）

[![](https://ics.media/entry/11172/images/160226_particlejs_demo-color.png)](https://ics-creative.github.io/ParticleJS/docs/examples/color-change.html)  
▲ 時間経過で色が変化するパーティクルのサンプル（[サンプルを開く](https://ics-creative.github.io/ParticleJS/docs/examples/color-change.html)）

ぜひデザインやコンテンツ制作にご活用ください。

-   [ParticleJS - GitHub](https://github.com/ics-creative/ParticleJS)
-   [ParticleJS - APIドキュメント](https://ics-creative.github.io/ParticleJS/docs/)

また、デザインツールのParticle DevelopのソースコードもGitHubにてオープンソースとして公開しています。SPA（シングルページアプリケーション）の作例として参考くださいませ。ちなみに、Particle Developは先進的なウェブコンテンツを紹介するGoogleのサイト「[Chrome Experiments](https://experiments.withgoogle.com/chrome/particle-develop)」に選出されてもいます。

-   [Particle Develop - GitHub](https://github.com/ics-creative/project-particle-develop)

### メディア掲載情報

![](https://ics.media/entry/11172/images/180412_particledevelop_gigazine.png)

2018年4月にGIGAZINEにて「[無料で商用利用も可能なパーティクル表現が作れるHTML5製のデザインツール「Particle Develop」](https://gigazine.net/news/20180412-html5-particle-develop/)」という記事で紹介されました。