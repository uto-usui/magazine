---
title: "オフスクリーンキャンバスを使ったJSのマルチスレッド描画 – スムーズなユーザー操作実現の切り札"
source: "https://ics.media/entry/19043/"
publishedDate: "2018-09-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

OffscreenCanvas（オフスクリーンキャンバス）はWeb Workers（ウェブワーカー）を使用してWorkerスレッドで描画処理を行える機能です。**負荷の高い描画処理をWorkerスレッドに移動することで、メインスレッドの負担が軽くなり、余裕ができます**。これにより**メインスレッドでスムーズなユーザー操作を実現できるようになり、ユーザー体験の向上が期待できます**。本記事ではOffscreenCanvasについて機能と使い方を解説します。

![WebGLでOffscreenCanvasを使用するデモ](https://ics.media/entry/19043/images/180905_offscrencanvas_demo_3d.gif)

▲ OffscreenCanvasを使用したデモ。OffscreenCanvasを使用すると、Canvasへの描画負荷が高い場合でもスムーズなユーザー操作とCSSアニメーションの再生を実現できる

### JavaScriptでマルチスレッドに処理を実行できるWeb Workers

OffscreenCanvasの説明の前に、まずはWeb Workersについておさらいしましょう。JavaScriptは従来シングルスレッドで動作するため、**高負荷な処理を行っている最中は他の処理の実行ができず、画面の描画更新やUIの操作ができなくなります**。

Web WorkersはJavaScriptにマルチスレッドの概念を導入し、メインスレッドとは別のスレッドで動作できる機能です。**負荷の高い処理を別スレッドで実行することで、メインスレッドの動作を阻害することなく実行できます**。

メインスレッドとWorkerスレッドはメッセージを送信することでデータのやりとりができます。このとき送信するデータはコピーされるため、巨大なデータのやりとりには時間がかかります。そこでJavaScriptではTransferableインターフェイスという、コピーすることなく転送できるオブジェクトのインターフェイスがあります。しかし、TransferableはArrayBufferなどごく一部のオブジェクトのみが対応しています。

Web Workersには制約があり、**DOMの操作ができません**。そのため、Web Workersを使用するのは、描画とは直接関係しない高負荷なデータ処理などの用途に限られていました。

### これまでできなかったWorkerスレッドでの描画処理を実現できるOffscreenCanvas

OffscreenCanvasはその名の通り、オフスクリーンでレンダリングできる、**DOMから切り離されたCanvas**です。OffscreenCanvasはTransferableオブジェクトのため、Workerへ転送することによってWorkerスレッドでは従来実現できなかった描画処理を行えるというわけです。

OffscreenCanvasのデモを作成したのでご覧ください。

#### CanvasRenderingContext2DでOffscreenCanvasを使用する

![CanvasRenderingContext2DでOffscreenCanvasを使用するデモ](https://ics.media/entry/19043/images/180905_offscrencanvas_demo_2d.gif)

-   デモを別ウインドウで再生する
    -   [OffscreenCanvasを使用していないデモ](https://ics-creative.github.io/180905_offscreencanvas/offscreencanvas-2d/index.html#off)
    -   [OffscreenCanvasを使用したデモ](https://ics-creative.github.io/180905_offscreencanvas/offscreencanvas-2d/index.html#on)
-   [ソースコードを確認する](https://github.com/ics-creative/180905_offscreencanvas/tree/master/offscreencanvas-2d)

Canvas要素に`CanvasRenderingContext2D`でパーティクルを描画しています。まずはOffscreenCanvasを使用していないデモについて見てみましょう。パーティクル数を多くし意図的に高負荷にしているため、フレームレートが著しく落ちています。画面下のハートボタンを押すとCSSアニメーションが再生されますが、Canvas描画の高負荷の影響を受け、ボタンのアニメーションもフレームレートが落ちてカクカクしたものになっています。

次にOffscreenCanvasのデモを見てみましょう。CanvasのパーティクルアニメーションはOffscreenCanvasを使用していないデモの場合と同じくフレームレートが落ちていますが、画面左上に配置しているメインスレッドのフレームレート表示は60FPSを維持しています。また、ハートボタンのCSSアニメーションはなめらかに再生されます。このデモでは**高負荷なCanvasのパーティクル描画をOffscreenCanvasでWorkerスレッドに処理させているため、メインスレッドは影響を受けず、軽快に動作します**。

#### WebGLでOffscreenCanvasを使用する

OffscreenCanvasはWebGLでも使用できます。次のデモはThree.jsを使用してWebGL描画をOffscreenCanvasで行っています。

![WebGLでOffscreenCanvasを使用するデモ](https://ics.media/entry/19043/images/180905_offscrencanvas_demo_3d.gif)

-   デモを別ウインドウで再生する
    -   [OffscreenCanvasを使用していないデモ](https://ics-creative.github.io/180905_offscreencanvas/offscreencanvas-3d/index.html#off)
    -   [OffscreenCanvasを使用したデモ](https://ics-creative.github.io/180905_offscreencanvas/offscreencanvas-3d/index.html#on)
-   [ソースコードを確認する](https://github.com/ics-creative/180905_offscreencanvas/tree/master/offscreencanvas-3d)

WebGL版のデモもCanvasRenderingContext2D版のデモと同じように、**OffscreenCanvasを使用するとメインスレッドのフレームレートが高くなり、ハートボタンのCSSアニメーションもなめらかに再生される**ことがわかります。

### OffscreenCanvasの使用方法

メインスレッドでDOMから取得したCanvas要素に対し、`transferControlToOffscreen()`メソッドを呼ぶことでOffscreenCanvasオブジェクトを取得できます。**このOffscreenCanvasオブジェクトのコンテキストに対して行った描画命令は自動的にもとのCanvas要素に反映されます**。OffscreenCanvasオブジェクトをWorkerに転送し、描画を行います。

▼ メインスレッドの処理

```
// Canvas要素を取得する
const canvas = document.getElementById("myCanvas");

// Canvas要素の描画コントロールをOffscreenCanvasに委譲する
const offscreenCanvas = canvas.transferControlToOffscreen();

// Workerを作成し、OffscreenCanvasを渡す
const worker = new Worker("js/worker.js");
worker.postMessage({ canvas: offscreenCanvas }, [
  offscreenCanvas
]);
```

▼ Workerスレッドの処理

```
// onmessageイベントハンドラーでメインスレッドからのメッセージを受け取る
onmessage = (event) => {
  // メインスレッドからOffscreenCanvasを受け取る
  const offscreenCanvas = event.data.canvas;

  // 以降、offscreenCanvasは通常のCanvasと同様に処理ができる
  ...
};
```

OffscreenCanvasはDOMと切り離されていること以外は通常のCanvasと同じため、Workerスレッドで受け取った後はOffscreenCanvasであることをほとんど意識することなく使用できます。たとえば、2D Canvasの場合は以下のようになります。

▼ Workerスレッドの処理

```
onmessage = event => {
  const offscreenCanvas = event.data.canvas;

  // CanvasRenderingContext2Dを取得する
  const context = offscreenCanvas.getContext("2d");

  // 以降、通常のCanvasRenderingContext2Dと同様に処理ができる
  context.beginPath();
  context.fillStyle = "black";
  context.arc(50, 50, 100, 0, Math.PI * 2, false);
  context.fill();
  context.closePath();
};
```

また、OffscreenCanvasはWebGLにも使用できます。

▼ Workerスレッドの処理

```
onmessage = (event) => {
  const offscreenCanvas = event.data.canvas;

  // WebGLRenderingContextを取得する
  const context = offscreenCanvas.getContext('webgl');

  // 以降、通常のWebGLRenderingContextと同様に処理ができる
  ...
};
```

`transferControlToOffscreen()`メソッドで取得したOffscreenCanvasはCanvasと同じように扱えるため、Three.jsなどのWebGLライブラリにも使用できます。

▼ Workerスレッドの処理

```
onmessage = event => {
  const offscreenCanvas = event.data.canvas;

  // Three.jsで使用する場合、内部でstyle.widthにアクセスするため指定する
  offscreenCanvas.style = { width: 0, height: 0 };

  // THREE.WebGLRendererのコンストラクタにOffscreenCanvasをcanvasとして渡す（内部でWebGLRenderingContextが取得される）
  const renderer = new THREE.WebGLRenderer({
    canvas: offscreenCanvas
  });

  // Three.jsの通常の初期化、描画処理
  renderer.setSize(800, 600);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    800 / 600,
    1,
    10000
  );
  camera.position.set(0, 0, 1000);
  camera.lookAt(0, 0, 0);
  const geometry = new THREE.BoxGeometry(
    10,
    10,
    10,
    1,
    1,
    1
  );
  const material = new THREE.MeshBasicMaterial({
    color: `red`
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const render = () => {
    mesh.rotation.y += 0.05;
    renderer.render(scene, camera);

    // Worker内でrequestAnimationFrame()を実行できる
    requestAnimationFrame(render);
  };

  render();
};
```

Workerスレッド内で`requestAnimationFrame()`メソッドを実行できるため、描画の更新も通常の方法とまったく同様に行えます。

※ Three.jsは内部でCanvas要素の`style`にアクセスします。しかし、前述の通りOffscreenCanvasはDOM要素ではないため、`style`を持ちません。Three.jsで使用する場合はランタイムエラーを避けるため、OffscreenCanvasオブジェクトに明示的に`style`プロパティを付加します。

### OffscreenCanvasの対象環境

2023年3月現在、OffscreenCanvasにはすべてのブラウザで利用可能です。ただし、Safariは2023年3月時点ではContext2Dのみ対応であり、WebGLは未対応です。

-   Chrome 69（2018年）以降
-   Edge 79（2020年）以降
-   Firefox 105（2022年）以降
-   Safari 16.4（2023年3月）以降
    -   ※ただしSafari 16.4はContext2Dのみ対応であり、WebGLは未対応

![OffscreenCanvasを利用可能なブラウザ](https://ics.media/entry/19043/images/images/180905_offscrencanvas_browsers_230328.png)

▲利用可能なブラウザについて。「[Can I use…](https://caniuse.com/offscreencanvas)」より

### おわりに

ユーザー操作のインタラクションの反応が悪いと、ユーザーエクスペリエンスを損ねます。**OffscreenCanvasを使用することで負荷の高い描画処理をWorkerスレッドに移動し、スムーズなユーザー操作を実現できます**。また、今回のデモのような用途以外にも、メインスレッドで使用する画像をOffscreenCanvasを使用してWorkerスレッドで作成するなど、さまざまな用途が考えられます。