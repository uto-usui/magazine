---
title: "JavaScriptで作成するサウンドビジュアライザー - Web Audio APIで周波数解析"
source: "https://ics.media/entry/230421/"
publishedDate: "2023-04-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ウェブ技術でサウンドを扱える技術「Web Audio API」。表現系の技術として、JavaScriptを使うことで、**音に連動したビジュアライゼーション**を作成できます。本記事では、Web Audio APIを使ったサウンドビジュアライザーの作り方を解説します。

まずは以下の2つのデモをご覧ください。

### 2Dデモ

-   [別タブで再生する](https://ics-creative.github.io/230411_sound_visualizer/2d.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230411_sound_visualizer/blob/main/docs/2d.html)

1つ目は2D版のデモです。Web Audio APIでフーリエ変換を行い、`div`タグのスタイルでビジュアライゼーションを作成しています。CSSの[Flexbox](https://ics.media/entry/13117/)を利用して水平方向に`div`を並べています。コードがシンプルなので、Web Audio APIの使い方を理解したい方は参考にしてみてください。

### 3Dデモ

-   [別タブで再生する](https://ics-creative.github.io/230411_sound_visualizer/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230411_sound_visualizer/blob/main/docs/index.html)

もう1つは、3D版のデモです。サウンドの解析部分をWeb Audio APIで行い、ビジュアライズ部分では[Three.js](https://threejs.org/)を使ってHTML Canvas（WebGL）で表現しています。音の高さごとに音の大きさを取得し、3D空間に配置されている立方体の上下方向のスケールに用いることで波を表現しています。

### 音のビジュアライズとは

音には、低い音もあれば、高い音もあります。低い音は低い周波数の成分が多く、高い音は高い周波数の成分が多いです。プログラミングで扱うには都合のいい数値情報が欲しいところです。

大学等の数学で「フーリエ変換」を学んだことのある方もいるでしょう。フーリエ変換を使うことで音の高さごとに、音の大きさを取得できます。その値をビジュアライズするロジックに渡すことで音に連動したコンテンツを作成できます。

音楽などのサウンドデータは複数の波形が合わさって1つの波形になっています。フーリエ変換を使うと、その合わさった波形を周波数ごとに分割できます。その分割した周波数（音の高さ）ごとに振幅（音の大きさ）が取得できるので、その値をビジュアライズするロジックに渡してあげることで音に連動したコンテンツを作成できます。

ウェブにおいては、フーリエ変換は[Web Audio API](https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API)で扱えます。Web Audio APIは音声の加工を行うためのJavaScript APIです。

### Web Audio APIの使い方

使い方を説明します。コードをもっともシンプルにした作例を用意しました。120行程度のHTMLコードなので、コピペして試してみてください。

-   [別タブで再生する](https://ics-creative.github.io/230411_sound_visualizer/getting_started.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230411_sound_visualizer/blob/main/docs/getting_started.html)

※音源のmp3ファイルは、[こちら](https://github.com/ics-creative/230411_sound_visualizer/tree/main/docs/sound)からダウンロードできます。

音源を再生するには`audio`タグを用意します。`controls`属性を指定すると、再生・停止ボタンが表示されます。

```
<audio src="sound/q-films.mp3" id="audio" loop controls></audio>
```

可視化のための`div`タグは親要素のなかにたくさん用意します。

![](https://ics.media/entry/230421/images/images/230421_dom.png)

親要素を用意します。

```
<div class="container"></div>
```

`div`タグを64個用意したいので、JavaScriptで`div`タグを生成しています。

```
const boxes = [];
// div要素の配置
for (let i = 0; i < FFT_SIZE / 2; i++) { // FFT_SIZE / 2 は 64
  const div = document.createElement("div");
  div.classList.add("box");
  containerElement.append(div);

  boxes[i] = div; // 配列に保存
}
```

縦棒はCSSのFlexboxで横並びに配置します。Flexboxの`gap`プロパティーで余白をとるといいでしょう（[gapの余白指定の参照記事](https://ics.media/entry/210628/)）。

```
/* 親 */
.container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 1px;
  /* ･･･ */
}

/* 子 */
.box {
  flex: 1;
  height: 100%;
  scale: 1 0;
  background: white;
}
```

Web Audio APIはノードを組み合わせて音声の処理を行います。詳しい使い方は記事『[音を操るWeb技術 - Web Audio API入門](https://ics.media/entry/200427/)』で説明しています。

Web Audio APIでフーリエ変換を行うには、`createAnalyser()`メソッドで[AnalyserNode](https://developer.mozilla.org/ja/docs/Web/API/AnalyserNode)を作成します。AnalyserNodeでは音の波形を何分割にするのかを指定し、音の高さごとの音の大きさを数値の入った配列で取得できます。その値をビジュアライズするロジックに渡せます。

```
const context = new AudioContext();

// アナライザーを生成
const nodeAnalyser = context.createAnalyser();
// フーリエ変換を行う分割数。2の乗数でなくてはならない
nodeAnalyser.fftSize = FFT_SIZE;
// 0～1の範囲でデータの動きの速さ 0だともっとも速く、1に近づくほど遅くなる
nodeAnalyser.smoothingTimeConstant = 0.85;
// オーディオの出力先を設定
nodeAnalyser.connect(context.destination);

// audio 要素と紐付ける
const nodeSource = context.createMediaElementSource(audioElement);
nodeSource.connect(nodeAnalyser);
```

#### フーリエ変換で取得した値でビジュアライズ

ビジュアライゼーションは、`requestAnimationFrame()`を使って、アニメーションを実現します。`requestAnimationFrame()`は、ブラウザの再描画のタイミングでコールバック関数を実行します。多くのデバイスでは1秒間に30回か、60回か、120回が呼ばれます（詳細『[requestAnimationFrameを使ったアニメーション表現](https://ics.media/entry/210414/)』）。

```
loop();

/** 描画します */
function loop() {
  requestAnimationFrame(loop);

  // ･･･
  // ここに描画処理を書く
}
```

フーリエ変換で取得した数値は、AnalyserNodeの`getByteFrequencyData()`メソッドを使うことで、配列で得られます。配列の値は8ビット符号なし整数値の配列、つまり`0`〜`255`の整数値の配列が得られます。詳細は、MDNの[AnalyserNode.getByteFrequencyData()](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData)を参照ください。

```
loop();

/** 描画します */
function loop() {
  requestAnimationFrame(loop);

  // 🌟この処理を追加🌟
  // 波形データを格納する配列の生成
  const freqByteData = new Uint8Array(FFT_SIZE / 2);
  // それぞれの周波数の振幅を取得
  nodeAnalyser.getByteFrequencyData(freqByteData);

  // ･･･
  // ここに描画処理を書く
}
```

取得した`Uint8Array`の配列には周波数毎の音の大きさを256段階で取得できます。たとえば、`div`タグの高さに適用するコードは以下となります。コードの「🌟」の部分が追加した箇所です。

```
loop();

/** 描画します */
function loop() {
  requestAnimationFrame(loop);

  // 波形データを格納する配列の生成
  const freqByteData = new Uint8Array(FFT_SIZE / 2);
  // それぞれの周波数の振幅を取得
  nodeAnalyser.getByteFrequencyData(freqByteData);

  // 🌟この処理を追加🌟
  // 高さの更新
  for (let i = 0; i < freqByteData.length; i++) {
    const freqSum = freqByteData[i]; // 🌟解析した音の値を取得
    // 値は256段階で取得できるので正規化して 0.0 〜 1.0 の値にする
    const scale = freqSum / 256;

    // Y軸のスケールを変更
    const div = boxes[i]; // 🌟DOM要素を取得
    div.style.scale = `1 ${scale}`; // 🌟適用
  }
}
```

以上で完成です。意外とあっけなく動作しますね。

注意点として、音声の再生はユーザーの操作を必要としています。ボタンのクリックなど、ユーザーが明示的に操作した場合でないと動作しないことがあります。音源の自動再生は汎用的に対応できないので諦めるといいでしょう。詳しくはChromeの『[Autoplay Policy](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)』を参照してください。

### Three.jsの作例

[Three.jsの作例](https://ics-creative.github.io/230411_sound_visualizer/index.html)でも考え方は同じです。Y座標に対して、周波数ごとの正規化された値を適用するだけです。考え方は難しくないのですが、実行性能を向上させるために難しい処理をしています。

Three.jsの作例では、実行性能を向上させるためWebGLのインスタシングを利用しています。インスタシングの原理は記事『[サンプルで理解するWebGL 2.0 - WebGL 2.0の利点とは](https://ics.media/entry/16060/#geometry-instancing-1)』で解説しています。Three.jsでは`THREE.InstancedMesh`クラスを使うとインスタシングを利用できます。

該当コード

```
const max = (FFT_SIZE / 2) ** 2; // 個数
const mesh = new THREE.InstancedMesh(geometry, material, max);
scene.add(mesh);
```

インスタシングを利用するとパフォーマンスが激的に向上しますが、座標やスケールの制御は行列計算を行う必要があります（[該当コード](https://github.com/ics-creative/230411_sound_visualizer/blob/main/docs/index.html#L234-L245)）。行列計算に不慣れだとコードを書くのはちょっと大変かもしれません。

縦方向のスケール値に、周波数ごとの振幅を割り当てているというポイントだけ理解できれば十分かと思います。

```
const yScale = Math.max(value, 0.002); // 下限を設定（見た目のため）
matrix.multiply(new THREE.Matrix4().makeScale(1, yScale, 1));
```

### まとめ

今回紹介したことをまとめると下記のようになります。

-   音のビジュアライズにはフーリエ変換が有効
-   フーリエ変換とは、音を周波数（音の高さ）で分割する方式
-   フーリエ変換はWeb Audio APIで扱える

ぜひ、Web Audio APIを使って、クリエイティブコーディングにチャレンジしてみましょう！