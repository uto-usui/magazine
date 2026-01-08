---
title: "JavaScriptで取り組むクリエイティブコーディング - パーリンノイズを使いこなせ"
source: "https://ics.media/entry/18812/"
publishedDate: "2018-08-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

HTML Canvas要素とJavaScriptを使うと、手軽にクリエイティブコーディングをはじめられます。

先月7月25日に開催されたイベント「[Frontend de KANPAI! #4](https://frokan.connpass.com/event/92028/)」では、プログラミングアートの楽しさを紹介すべく「JavaScriptとWebGLで取り組むクリエイティブコーディング」と題して発表しました。本記事ではそのときの登壇内容を記事として紹介します。

![](https://ics.media/entry/18812/images/180808_perlin_noise_happyo_01.jpg)

本記事ではHTML CanvasとJavaScriptの理解につながることを目標に、次のモーショングラフィックの作成方法をステップ形式で解説します。サンプルのソースコードはすべて[GitHubにて公開しています](https://github.com/ics-creative/180725_two_waves/)ので、あわせて参照ください。

▲ 完成版サンプル。実装する上で重要な表現のエッセンスだけを絞って解説します

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/line_perlines_colorful.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/line_perlines_colorful.html)

### ステップ① 描画のためのcanvasを用意

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/line.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/line.html)

シンプルなグラフィックから手順を理解していきましょう。まずは直線を描きます。

`canvas`要素と`script`要素をHTMLの`body`要素内に用意します。

```
<body>
  <canvas></canvas>
  <script>
    // JavaScriptの処理を記述する
  </script>
</body>
```

JavaScriptでは、`canvas`要素を使ってアニメーションできるように初期化します。`requestAnimationFrame()`メソッドを使って画面更新タイミングで任意の関数を実行するよう指定します。`requestAnimationFrame()`メソッドは一般的には1秒のうち60回呼び出されます。つまり、約0.016秒ごとに関数が実行されます。

```
// canvas要素の参照を取得
const canvas = document.querySelector("canvas");
// 2Dの描画命令群を取得
const context = canvas.getContext("2d");

/** アニメーションフレームのタイミングです。 */
function tick() {
  requestAnimationFrame(tick);
  draw();
}
```

描画関数`draw()`では、画面に図形を描画します。コード量が多いように見えますが、線の色や太さを設定したうえで、開始点から終了点の2点を線で結ぶという処理をしてます。

```
let stageW = 800; // 画面の幅
let stageH = 600; // 画面の高さ

/** 描画します。 */
function draw() {
  // 画面をリセット
  context.clearRect(0, 0, stageW, stageH);
  context.lineWidth = 10; // 線の太さ
  context.beginPath(); // 線の開始
  context.strokeStyle = "white"; // 線の色
  context.moveTo(0, stageH / 2); // 開始点
  context.lineTo(stageW, stageH / 2); // 終了点
  context.stroke(); // 線を描く
}
```

### ステップ② 曲線を描く

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/line_sin_seg.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/line_sin_seg.html)

三角関数を使って、曲線を描いてみましょう。三角関数は便利なもので、引数であるラジアンを入力すると、-1.0〜+1.0の範囲の値が返ってきます。引数に応じて連続的な値、周期的な値を作るのに役立ちます。

```
const y = 振幅 * Math.sin(ラジアン);
```

ループ文を使って、画面の左側から右側に向かって、線の頂点を増やします。X座標はループカウンター変数を使い、Y座標は三角関数で求めた値を使います。ループ文はES2018流に`[...Array(回数).keys()].forEach(i=>{})`を使っていますが、`for(var i=0; i<回数; i++){}`という従来の記法で問題ありません。

```
const segmentNum = 10; // 分割数
const amplitude = stageH / 3; // 振幅
const time = Date.now() / 1000; // 媒介変数(時間)

[...Array(segmentNum).keys()].forEach(i => {
  // X座標
  const x = (i / (segmentNum - 1)) * stageW;
  // ラジアン
  const radian = (i / segmentNum) * Math.PI + time;
  // Y座標
  const y = amplitude * Math.sin(radian) + stageH / 2;

  if (i === 0) {
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
  }
});
```

### ステップ③ 頂点数を増やす

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/line_sin.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/line_sin.html)

水平方向の分割数を増やせば、曲線は滑らかに表示されます。

```
const 分割数 = 100; // 分割数
```

### ステップ④ パーリンノイズを導入

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/line_perline.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/line_perline.html)

三角関数でもおもしろいですが、乱数を使って曲線の形を変化させましょう。乱数にもさまざまな種類のものがありますが、今回はパーリンノイズを使います。

パーリンノイズは雲や波、炎模様など多用途に使われるアルゴリズムで、プログラミングアートの世界では重宝します。

![](https://ics.media/entry/18812/images/180808_perlin_noise_zushi.png)

パーリンノイズを実現するにあたり、NpmJSにJSライブラリがたくさん公開されています（[参照](https://www.npmjs.com/search?q=perlin)）。今回は導入しやすそうな「[simplenoise](https://www.npmjs.com/package/simplenoise)」というJSライブラリを利用します。

さきほど三角関数で処理していたY座標の計算をパーリンノイズに切り替えます。具体的には、水平方向の距離と時間の2つを引数にして、Y座標の高さを求めます。

![](https://ics.media/entry/18812/images/180808_perlin_noise_calc.png)

```
const segmentNum = 10; // 分割数
const amplitude = stageH / 3; // 振幅
const time = Date.now() / 4000; // 媒介変数(時間)

[...Array(segmentNum).keys()].forEach(i => {
  // X座標
  const x = (i / (segmentNum - 1)) * stageW;

  const px = i / 50; // 横軸の入力値
  const py = time; // 時間の入力値
  // Y座標
  const y = amplitude * noise.perlin2(px, py) + stageH / 2;

  if (i === 0) {
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
  }
});
```

### ステップ⑤ 線の数を増やす

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/line_perlines.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/line_perlines.html)

二重のループ文に変更して曲線の本数を増やします。二重ループ文になったことでループカウンター変数の数が増えます。パーリンノイズ生成時の引数に変化を持たせるのに`j`を利用するといいでしょう。

```
const lineNum = 60; // ラインの数
const segmentNum = 30; // 分割数

[...Array(lineNum).keys()].forEach(j => {
  [...Array(segmentNum).keys()].forEach(i => {
    const x = (i / (segmentNum - 1)) * stageW;
    const px = i / (50 + j);
    const py = j / 50 + time;
    const y = 振幅 * noise.perlin2(px, py) + stageH / 2;
    context.lineTo(x, y);
  });
  context.stroke();
});
```

### ステップ⑥ HSLでカラフルに

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/line_perlines_colorful.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/line_perlines_colorful.html)

HSLは色情報を色相（hue）⁠、彩度（saturation）、輝度（luminance）で表現し、明るさ鮮やかさといった直感的な情報で指定できることが特長です。RGBと比較すると、プログラムで管理するには便利な色情報です。

線が少しずつ変化するように、ループのカウンター変数を利用してHSLで指定します。

```
const lineNum = 60; // ラインの数
const segmentNum = 30; // 分割数

[...Array(lineNum).keys()].forEach(j => {
  const h = Math.round((j / lineNum) * 360); // 色相
  const s = 100; // 彩度
  const l = Math.round((j / lineNum) * 100); // 明度
  // 色を指定
  context.strokeStyle = `hsl(${h}, ${s}%, ${l}%)`;

  [...Array(segmentNum).keys()].forEach(i => {
    // ･･･
  });
});
```

HSLのJavaScriptでの活用方法について、詳しくは記事「[CreateJS で HSL カラーを使いこなそう](https://ics.media/tutorial-createjs/color_hsl/)」を参照ください。

### まとめ

パーリンノイズはプログラミングアートの世界では多くの用途で利用されています。たとえば、ProcessingのJSライブラリ「[p5.js](https://p5js.org/)」にはパーリンノイズが[noise関数](https://p5js.org/reference/#/p5/noise)という名前で標準機能として搭載されています。そのぐらい、一般的に活用する命令です。

余談ですが、今回の解説をp5.jsで制作したバージョンも用意しました。Processingの世界だと短いコードで実現できるのがいいですね。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/line_p5.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/line_p5.html)

パーリンノイズを使った作例としては、記事「[CSS3とHTML5 Canvasで作るモーショングラフィック](https://ics.media/entry/10141/)」で紹介しています。今回はJavaScriptのみの話でしたが、CSSとJavaScriptを組み合わせることで表現の幅が広がります。ぜひ、皆さんも挑戦してみてください。

![](https://ics.media/entry/18812/images/180808_perlin_noise_happyo_03.jpg)

![](https://ics.media/entry/18812/images/180808_perlin_noise_happyo_02.jpg)

続編記事「[パーティクル表現入門](https://ics.media/entry/18835/)」ではパーティクルと乱数の組み合わせ方について解説します。あわせてご覧ください。