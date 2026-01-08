---
title: "最新版で学ぶThree.js入門 - 手軽にWebGLを扱える3Dライブラリ"
source: "https://ics.media/entry/14771/"
publishedDate: "2017-01-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

[Three.js](https://threejs.org/)とは、**手軽に3Dコンテンツを制作できる商用利用可能なJavaScriptライブラリ**。WebGLだけで3D表現をするためには、立方体1つ表示するだけでも多くのJavaScriptやGLSLコードを書く必要があり専門知識も必要です。Three.jsを使えばJavaScriptの知識だけで簡単に3Dコンテンツが作成できるため、手軽に扱えるようになります。

もともと2000年代のFlashの時代から、ウェブの3D表現が人気を集めてきました。今では標準技術としてのWebGLが、ゲームやビジュアライゼーションなどの多くの場面で採用されています。**WebGLとThree.jsは実際に多くのサイトで使用されており**、ユーザーに印象に残るウェブコンテンツには欠かせない技術となっています。また、**JSライブラリの容量も176KB（GZIP）しかなく、とても軽量です**。

**本記事でThree.jsによってどのような表現が可能なのか、実際にコードをどのように書き始めていくかを学んでいきましょう**。

### 事例紹介

実際にThree.jsがどのような事例で使用されているのか紹介します。

「[Dynamic procedural terrain](https://alteredqualia.com/three/examples/webgl_terrain_dynamic.html)」はThree.jsを使ったアニメーションデモ。地上の質感やぼかしのような表現など、さまざまな工夫がされており、幻想的な世界を味わえます。

「[HexGL](http://hexgl.bkcore.com/)」はブラウザで遊べるF-ZEROのようなレーシングゲーム。ブラウザで動いているとは思えないほどのクオリティーの高さです。一度遊んでみてください。

### 準備しよう！

事例を見て、Three.jsでどんな表現が可能なのかイメージができたかと思います。ここからは**Three.jsを使って3Dコンテンツを作る準備をしていきましょう**。

#### HTMLファイルの作成

作業用ディレクトリに`index.html`という名前で、以下のコードが書かれたHTMLファイルを用意します。

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <!-- three.jsを読み込む -->
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.175.0/build/three.module.js"
      }
    }
  </script>
  <!-- index.jsを読み込む -->
  <script type="module" src="index.js"></script>
</head>
<body>
  <canvas id="myCanvas"></canvas>
</body>
</html>
```

Three.jsを使うにはES Modulesという仕組みを用いて読み込む必要があります。`<script type="importmap">`で囲まれた部分にThree.jsのCDN配布のURLを記載します。`<script type="module" src="index.js"></script>`で`index.js`を読み込むようにしています。どちらの`script`タグも`type`属性を記載しているのは、ES Modulesを使うためです。`type`属性が間違っていると動作しないので、誤りのないように記述ください。

ES Modulesについては、記事『[ES Modules入門 - JavaScriptでモジュールを使う時代](https://ics.media/entry/16511/)』を参照ください。

#### 作業用JavaScriptファイルの作成

作業用ディレクトリに`index.js`という名前で、以下のコードが書かれたJavaScriptファイルを作成します。

```
// ファイルの冒頭に import 文を記載します。
import * as THREE from "three";

// 具体的な処理はここから記載していきます。
```

`index.js`にThree.jsを使用するためのコードを追記します。

ここまでで準備は完了です。

### コードを書いてみよう！

今回は、以下のような立方体を表示する40行程度の簡単なJavaScriptを書いていきます。サンプルコードもGitHubにアップしているので、コピー＆ペーストで試したい方は以下のGitHubのコードを参考ください。

![](https://ics.media/entry/14771/images/demo.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/170116_three_lesson/lesson_1/)
-   [ソースコードを確認する](https://github.com/ics-creative/170116_three_lesson/tree/main/lesson_1)

※このデモはthree.js（2025年4月現在最新のr175）で作成しています。

#### 1\. レンダラーを作る

WebGLのレンダリングをするためのレンダラーを作成します。引数にはHTMLコード上に記載したcanvas要素の参照を渡します。

```
import * as THREE from "three";

// （略）

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#myCanvas")
});
```

デフォルトではレンダラーのサイズが小さいため、`setSize()`メソッドでサイズを設定します。今回のデモでは幅960px、高さ540pxを設定しています。

```
const width = 960;
const height = 540;
// （略）
renderer.setSize(width, height);
```

スマホでも綺麗に見えるよう、デバイスピクセル比も設定しておきましょう。これを設定しないとスマホだとぼやけて表示されます。

```
renderer.setPixelRatio(devicePixelRatio);
```

※古い解説記事では`window.devicePixelRatio || 1`と記載されていることがあります。[昔の2012年頃のブラウザ](https://caniuse.com/devicepixelratio)には`devicePixelRatio`が未実装だったためですが、今のブラウザでは`devicePixelRatio`が取得できるので、`|| 1`を記載する必要はありません。

#### 2\. シーンを作る

シーンを作成します。シーンはオブジェクトや光源などの置き場です。

```
const scene = new THREE.Scene();
```

#### 3\. カメラを作る

Three.jsではカメラを作成し、その視点から見えるものがレンダラーを介して`canvas`要素へ描画されます。

![](https://ics.media/entry/14771/images/concept.png)

`THREE.PerspectiveCamera`に画角、アスペクト比、描画開始距離、描画終了距離の4つの情報を引数として渡しカメラを作成します。

```
const width = 960;
const height = 540;
// （略）

// new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
const camera = new THREE.PerspectiveCamera(
  45,
  width / height,
  1,
  10000
);

// カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
camera.position.set(0, 0, 1000);
```

#### 4\. 立方体を作る

立方体はメッシュという表示オブジェクトを使用して作成します。メッシュを作るには、ジオメトリ（形状）とマテリアル（素材）を用意する必要があります。

ジオメトリは頂点情報や面情報を持っています。Three.jsにはさまざまなジオメトリが用意されていますが、今回は立方体や直方体のような箱状の形状を生成するための`BoxGeometry`を使用します。

```
// new THREE.BoxGeometry(幅, 高さ, 奥行き)
const geometry = new THREE.BoxGeometry(500, 500, 500);
```

マテリアルは色や質感の情報を持っています。今回は青色の箱を表示させたいので、以下のようにマテリアルを生成します。

```
const material = new THREE.MeshStandardMaterial({
  color: 0x0000ff
});
```

作成したジオメトリとマテリアルを使って、メッシュを作ります。作成したメッシュをシーンに追加しましょう。

```
// new THREE.Mesh(ジオメトリ,マテリアル)
const box = new THREE.Mesh(geometry, material);
// シーンに追加
scene.add(box);
```

#### 5\. ライトを作る

このままでは真っ暗なのでライトを作成します。

```
// new THREE.DirectionalLight(色)
const light = new THREE.DirectionalLight(0xffffff);
light.intensity = 2; // 光の強さを倍に
light.position.set(1, 1, 1); // ライトの方向
// シーンに追加
scene.add(light);
```

`THREE.DirectionalLight`クラスは平行光源を意味します。平行光源は太陽光のように一定方向から差し込む光です。ライトもシーンに追加することで反映されます。光源が斜めから差し込むように位置も変更しておきましょう。`set()`メソッドの引数はX方向、Y方向、Z方向を示します。

```
// ライトの位置を変更
light.position.set(1, 1, 1);
```

#### 6\. 描画する

最後はレンダリングです。`renderer.render()`メソッドに、さきほど作成したシーンとカメラを引数に渡すことではじめてcanvas上に描かれます。

```
renderer.render(scene, camera);
```

`index.js`の内容が以下のようになっていれば大丈夫です。実行して確認してみましょう。

```
import * as THREE from "three";

const width = 960;
const height = 540;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#myCanvas')
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
// カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
camera.position.set(0, 0, 1000);

// 箱を作成
const geometry = new THREE.BoxGeometry(500, 500, 500);
const material = new THREE.MeshStandardMaterial({color: 0x0000FF});
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// 平行光源
const light = new THREE.DirectionalLight(0xFFFFFF);
light.intensity = 2; // 光の強さを倍に
light.position.set(1, 1, 1); // ライトの方向
// シーンに追加
scene.add(light);

// レンダリング
renderer.render(scene, camera);
```

次の画像ように表示されていると思います。

![](https://ics.media/entry/14771/images/render.png)

#### 7\. アニメーション

`renderer.render()`を一度しただけでは、`canvas`要素に一度描かれただけなので更新はされません。アニメーションをさせるには、パラパラアニメのようにコマ送りにする必要があります。そのためには、`requestAnimationFrame()`というグローバルメソッドを使用します。`requestAnimationFrame()`は引数として渡された関数を、毎フレーム実行します。`init()`の最後を下のように書き換えてみましょう。

```
// 初回実行
tick();

function tick() {
  requestAnimationFrame(tick);

  // 箱を回転させる
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  // レンダリング
  renderer.render(scene, camera);
}
```

実行結果を見ると立方体が回転しているはずです。Three.jsでのアニメーションはこうして行います。

![](https://ics.media/entry/14771/images/animation.gif)

完成したJavaScriptのコードは次のようになります。

```
import * as THREE from "three";

const width = 960;
const height = 540;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#myCanvas')
});
renderer.setSize(width, height);
renderer.setPixelRatio(devicePixelRatio);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
// カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
camera.position.set(0, 0, 1000);

// 箱を作成
const geometry = new THREE.BoxGeometry(500, 500, 500);
const material = new THREE.MeshStandardMaterial({color: 0x0000FF});
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// 平行光源
const light = new THREE.DirectionalLight(0xFFFFFF);
light.intensity = 2; // 光の強さを倍に
light.position.set(1, 1, 1); // ライトの方向
// シーンに追加
scene.add(light);

// 初回実行
tick();

function tick() {
  requestAnimationFrame(tick);

  // 箱を回転させる
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  // レンダリング
  renderer.render(scene, camera);
}
```

### 最後に

立方体を表示できましたが、これだけではコンテンツとして物足りません。冒頭で紹介したサイトのようにコンテンツとして成立させるためには、**さらにThree.jsを習得する必要があります**。私の周りでThree.jsを触ってみたものの、「次に何を勉強したらいいのかわからない」という声をよく聞きます。

・・・それもそのはず。**Three.jsはさまざまな使い方ができるため学ぶべき分野は多岐にわたるからです**。そこで、Three.jsを学習するにあたり押さえておくべきポイントや方向性を図にまとめました。

![](https://ics.media/entry/14771/images/diagram.png)

さまざまな領域を幅広く勉強したり、専門領域に特化して学ぶのも、人それぞれだと思います。まずは興味のある分野から、ステップアップしてみてはいかがでしょうか？　さらに勉強にするにはICS MEDIAでは「[Three.js入門サイト](https://ics.media/tutorial-three/)」で体系的にまとめているので参照ください。