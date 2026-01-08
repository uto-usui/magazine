---
title: "どんな背景でも自由に描ける! CSS Paint APIの使い方"
source: "https://ics.media/entry/18733/"
publishedDate: "2018-07-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

最近のChromeにはCSSの新機能が次々と搭載されています。2017年にはCSS Grid Layoutなどインパクトの大きい新機能が話題になりましたが、他にも有用な新機能があることをご存じでしょうか？　この記事では、CSS Paint APIを紹介します。

### CSS Paint APIはグラフィックを描く機能

CSS Paint APIは自由にグラフィックを描ける仕様です。HTML Canvasのようなものを要素の背景画像（`background-image`や`border-image`）として設定できます。JavaScriptを使って自由にグラフィックを描けるため、従来のCSSで再現の難しかった表現が実現可能になります。

たとえば、次のようなビジュアルを考えてみましょう。四隅の形状が欠けたような表現となっています。従来のCSSでは`div`タグを複雑に組む必要がありました。

![](https://ics.media/entry/18733/images/180720_csspaint_9slice.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180720_css_paint/css-paint-9slice/)
-   [コードを確認する](https://github.com/ics-creative/180720_css_paint/blob/master/css-paint-9slice/)

CSS Paint APIを使うと、1つの`div`タグにCSSを割り当てるだけで実現できます。CSSだけでなくJavaScriptを作成する必要はありますが、**HTMLの構造を汚さずに装飾を自由に設計できることが利点**といえるでしょう。

▼CSS Paint APIを使って実現したHTMLコード

```
<script>
  // ペイントワークレットを登録する
  CSS.paintWorklet.addModule('worklet.js');
</script>
<style>
  .graphics {
    /* 背景としてペイントを指定 */
    background-image: paint(rect);
  }
</style>
<body>
  <div class="graphics">
    ･･･
  </div>
</body>
```

### 基本的な利用方法の解説

CSS Paint APIを使って、簡単な三角形を描いてみましょう。下図のように`div`タグの背景にCSS Paint APIで描いた三角形が背景画像として設定されている状態を目指します。

![](https://ics.media/entry/18733/images/180720_csspaint_api.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180720_css_paint/css-paint-simple/)
-   [コードを確認する](https://github.com/ics-creative/180720_css_paint/blob/master/css-paint-simple/)

CSS Paint APIを利用するには、独立したJavaScriptのファイルを作成します。これをペイントワークレットといいます。必ず独立した`.js`ファイルとして作成する必要があります。

![](https://ics.media/entry/18733/images/180720_csspaint_files.png)

#### ペイントワークレット側の作成

ペイントワークレットのJavaScriptファイルには任意のクラスを作成します。クラスのフィールドには`paint()`メソッドを実装し、`registerPaint()`メソッドでクラスとメソッド名の関連付けします。

```
/** 三角形を描くペインタークラスです。 */
class TrianglePainter {
  /**
   * 描画時に呼び出される関数です。
   * @param context {CanvasRenderingContext2D} コンテキストです。
   * @param geometry {{width:number, height:number}} 描画領域の情報(width, heightのみ)です。
   */
  paint(context, geometry) {
    // 三角形の頂点を定義
    const points = [
      { x: 0, y: geometry.height }, // 左下
      { x: geometry.width, y: geometry.height }, // 右下
      { x: geometry.width / 2, y: 0 } // 上
    ];

    // 三角形の形状を作成
    context.beginPath(); // パスの開始
    context.moveTo(points[0].x, points[0].y); // 最初の点
    context.lineTo(points[1].x, points[1].y); // 2番目の点
    context.lineTo(points[2].x, points[2].y); // 3番目の点
    context.closePath(); // 最後の頂点を最初の頂点まで結ぶ

    // 塗りを描く
    context.fillStyle = "red"; //塗りつぶしの色
    context.fill();
  }
}

// paint(triangle)メソッドとして登録
registerPaint("triangle", TrianglePainter);
```

`paint()`メソッドはHTML Canvasの`Canvas2DRendererContext`オブジェクトと似たコンテキストを引数として受け取れます。このコンテキストに対して命令をすることで描画結果を作成します。引数の`geometry`や`properties`に含まれる情報をもとに描画結果を調整します。

-   `geometry` : この引数には描画領域のサイズ情報が入っている
-   `properties` : CSS変数と連携できる引数

#### メインのHTML側の作成

メインのHTML側からはJavaScriptで`CSS.paintWorklet.addModule()`メソッドを利用してワークレットを登録します。引数にはワークレットのJavaScriptファイルを指定します。

▼ JavaScript

```
// workletを登録する
CSS.paintWorklet.addModule("worklet.js");
```

スタイルシート側では、`background-image`プロパティに対して`paint()`メソッドを指定します。`paint()`メソッドにはワークレットの`registerPaint()`登録した描画クラスを指定します。

▼ スタイルシート（CSS）

```
.graphics {
  /* 任意のサイズを指定する */
  width: 80vw;
  height: 80vh;

  /* paint(登録した命令)で背景画像として利用可能 */
  background-image: paint(triangle);
}
```

### パラメーターで動的に描画を変更可能に

CSS Paint APIとCSS変数を連携することで、パラメーターで動的に描画を変更可能になります。

![](https://ics.media/entry/18733/images/180720_csspaint_variables.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180720_css_paint/css-paint-properties/)
-   [コードを確認する](https://github.com/ics-creative/180720_css_paint/blob/master/css-paint-properties/)

ワークレット側のクラスに`static get inputProperties()`を実装し、読み取りたいプロパティ名の配列を戻り値とします。

ワークレット側の`paint()`メソッドの第三引数`properties`はCSSのプロパティを読み出すために使う引数です。`get()`メソッドを使うと`static get inputProperties()`で割り当てたCSS変数を受け取れます。

▼ ペイントワークレット（JavaScript）

```
/** 三角形を描くペインタークラスです。 */
class TrianglePainter {
  /**
   * 入力してのプロパティを定義します。
   * 配列として返したプロパティが取得できます。
   * @returns {string[]}
   */
  static get inputProperties() {
    return ["--fill-color"];
  }

  /**
   * 描画時に呼び出される関数です。
   * @param context {CanvasRenderingContext2D} コンテキストです。
   * @param geometry {{width:number, height:number}} 描画領域の情報(width, heightのみ)です。
   * @param properties {Object} CSS変数です。
   */
  paint(context, geometry, properties) {
    // properties の get メソッドを使って値を取得
    // CSSStyleValue の値を取得
    const color = properties.get("--fill-color").toString();

    // 三角形の頂点を定義
    const points = [
      { x: 0, y: geometry.height }, // 左下
      { x: geometry.width, y: geometry.height }, // 右下
      { x: geometry.width / 2, y: 0 } // 上
    ];

    // 三角形の形状を作成
    context.beginPath(); // パスの開始
    context.moveTo(points[0].x, points[0].y); // 最初の点
    context.lineTo(points[1].x, points[1].y); // 2番目の点
    context.lineTo(points[2].x, points[2].y); // 3番目の点
    context.closePath(); // 最後の頂点を最初の頂点まで結ぶ

    // 塗りを描く
    context.fillStyle = color; //塗りつぶしの色
    context.fill();
  }
}

// paint(triangle)メソッドとして登録
registerPaint("triangle", TrianglePainter);
```

利用する側にはCSS変数を定義します。ハイフンを二個つなげて定義します。

▼ スタイルシート（CSS）

```
.graphics {
  /* 任意のサイズを指定する */
  width: 80vw;
  height: 80vh;

  /* ペイントワークレットに任意のカラーを渡す */
  --fill-color: blue;

  /* paint(登録した命令)で背景画像として利用可能 */
  background-image: paint(triangle);
}
```

CSS変数はデベロッパーツールで変化させてみると、動的に変化可能であることがわかります。

### アニメーションの実装方法

JavaScriptで時間経過によって値が変動するようにしましょう。次のサンプルでは、時間経過で塗りの色が変化するようにしています。

![](https://ics.media/entry/18733/images/180720_csspaint_raf.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180720_css_paint/css-paint-properties-raf/)
-   [コードを確認する](https://github.com/ics-creative/180720_css_paint/blob/master/css-paint-properties-raf/)

具体的にはJavaScriptの`requestAnimationFrame()`メソッドを使って、時間経過でCSS変数の値を書き換えます。

▼ メイン側のJavaScript

```
// workletを登録する
CSS.paintWorklet.addModule("worklet.js");

window.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".graphics");
  tick();

  // アニメーションを開始
  function tick() {
    // 色相を計算（経過時間から算出 0〜360の値を取り得る）
    const hue = Math.round((Date.now() / 10) % 360);
    // CSS変数を更新
    el.style.setProperty(
      "--fill-color",
      `hsl(${hue}, 100%, 50%)`
    );

    requestAnimationFrame(tick);
  }
});
```

このように、CSS変数との連携によってカスタマイズ性に富んだオリジナルのCSSを設計できるようになります。

### 応用作例を紹介〜タイル調グラデーション

次のサンプルはCSS変数を使って、グラデーションを描いたものです。動画を再生して、CSS Paint APIの可能性をご覧ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180720_css_paint/css-paint-brilliant/dot_sample.html)
-   [コードを確認する](https://github.com/ics-creative/180720_css_paint/blob/master/css-paint-brilliant/)

格子状の分割数はCSS変数で管理しているため、簡単に数値の変化でグラフィックを自在に編集できます。プログラミングアートと相性がよく、自由にグラフィックを描けるので応用の幅が広いです。

![](https://ics.media/entry/18733/images/180720_csspaint_briliant.png)

### CSS Paint APIの対象環境と注意点

CSS Paint APIが利用できるのはChrome 65+（2018年3月リリース）とEdge 79+（2020年1月）です。

「[Can I use…](https://caniuse.com/css-paint-api)」で対象ブラウザを確認できます。

CSS Paint APIには制約があるので注意が必要です。

-   HTTPS環境かローカルホストでのみ利用可
-   外部画像が読み込めないため、プログラムだけで描画する必要がある
-   描画結果はステートレスにする必要がある（内部に状態を持たせてはいけない。引数に応じて描画結果が一意に決まる必要がある）

### ワークレットのおかげで描画負荷を分散できる

CSS Paint APIのユニークな点は、ワークレット（Worklet）という仕組みでJavaScriptが動作する点です。Web Workerのように、ワークレットはメインスレッドとは異なるスレッドでスクリプトが動作します。**ペイントワークレットの描画の計算負荷がユーザー操作に影響を与えにくいことは大きな利点**でしょう。

負荷分散のメリットに対して、デメリットもあります。少し難しい話ですが、ワークレットはCSS変数を除いて、メインスレッドのJavaScriptとメモリを共有できません。また、ワークレット上に変数を保持するような設計は次のような不具合を引き起こします。

![](https://ics.media/entry/18733/images/180720_csspaint_bad.gif)

▲ペイントワークレット内部に状態を持たせる設計をしたら、表示がちらつくようになった

ワークレット側は引数の値によってのみ描画結果が一意に決定するような設計にしましょう。関数型の考え方ですね。

### 類似の仕様のCSS Canvas

類似の技術として、以前よりCSS Canvasがあります。ほとんどの人はこの仕様を知らないのではないでしょうか？ `canvas`要素をCSSの背景画像として設定する仕様です。CSS Paint APIはワークレットで描画するのに対し、CSS CanvasはメインスレッドのJavaScriptで描画するので、似てるようでアプローチが異なります。「[Can I use… のCSS Canvas](https://caniuse.com/#feat=css-canvas)」によるとSafari 4（2009年）から最新版まで利用可能。Chromeはバージョン47（2015年）まで利用可能でした。

![](https://ics.media/entry/18733/images/180720_csspaint_csscanvas.png)

▲ SafariやFirefoxで利用可能なCSS Canvasのサンプル

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180720_css_paint/css-paint-brilliant/dot_webkitcanvas.html)
-   [コードを確認する](https://github.com/ics-creative/180720_css_paint/blob/master/css-paint-brilliant/)

### ポリフィルで動作させる

Google Chrome Labsが提供しているポリフィル「[A polyfill for the CSS Paint API](https://github.com/GoogleChromeLabs/css-paint-polyfill)」を利用すると、Chrome以外のブラウザでも利用できるようです。

試しに、このポリフィルを使うと、SafariでもCSS Paint APIが動作しました。Safariでは先述のCSS Canvasにフォールバックするようです。

![](https://ics.media/entry/18733/images/180720_csspaint_api_polyfill.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180720_css_paint/css-paint-polyfill/)
-   [コードを確認する](https://github.com/ics-creative/180720_css_paint/blob/master/css-paint-polyfill/)

### まとめ

現在はChromeが先行して精力的に新機能を実装しているため、表現の選択肢が増えています。

イントラでのみ対象ブラウザをChromeに限定したり、[Electron](https://ics.media/entry/7298/)など動作環境を絞れば活用できます。CSS Paint APIの可能性をぜひお試しください。