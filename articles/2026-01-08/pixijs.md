---
title: "PixiJSで加工する！リアルタイム・クリエイティブカメラ"
source: "https://ics.media/entry/211118/"
publishedDate: "2021-11-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

スマートフォンの普及によって、カメラやマイク、位置情報などを用いたコンテンツに誰もがアクセスできるようになりました。さらに近頃では、ビデオ会議が盛んに行われるようになったり、カメラと同期して動くバーチャルアバターで遊ぶ人も増え、デバイスを介した面白いコンテンツがどんどん増えています。

フロントエンドの開発者としても、時流に乗っておもしろコンテンツを作りたい、そんな思いでいっぱいです。そこで、今回の記事ではカメラを用いたウェブコンテンツを作成してみます。今回作成するのは、次のようなブラウザで動くクリエイティブカメラです。

![pixi-filtersのデモ](https://ics.media/entry/211118/images/211118_capture_pixi_filter.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211021_camera_filters/pages/05_filterDemo02.html)
-   [コードを確認する](https://github.com/ics-creative/211021_camera_filters/blob/main/pages/05_filterDemo02.html)

本記事を読むことで、以下の知識が身につきます。

-   ブラウザからウェブカメラにアクセスする方法
-   デバイスから取得したデータをブラウザに表示する方法
-   映像とCanvasを組み合わせたクリエイティブ表現の作り方

ブラウザはもはや、ブラウジング（閲覧）のためだけのものではありません！　ウェブカメラを用いたコンテンツや、ウェブ技術を用いた表現に興味がある人はぜひ最後まで読んでみてください。

### インターフェースへのアクセス

まずはブラウザからカメラへのアクセスについて学びましょう。

カメラやマイク、スピーカーといったデバイスへのアクセスには、`MediaDevices`インターフェースを介して行われます。`MediaDevices`インターフェースは、`Window`オブジェクトの`Navigator`インターフェースからアクセスできます。

▼MediaDevicesインターフェースの取得例

```
const devices = navigator.mediaDevices;
// 以下でも可だが、一般的にwindowオブジェクトは省略される
// const devices = window.navigator.mediaDevices;
```

`MediaDevices`インターフェースの代表的な2つのメソッドについて紹介します。

-   `getUserMedia()`：カメラやマイクなどのデバイスを取得し、音声や映像としてPromise化された`MadiaStream`オブジェクトを返す
-   `enumerateDevices()`：アクセスできるデバイスを配列で返却する

`MediaStream`オブジェクトについて、実用上はそれほど詳細な理解は必要ありません。むしろ、どのように使われるかを理解することが重要でしょう。HTMLの`video`要素の`srcObject`属性に設定されたり、[MediaStream Recording API](https://developer.mozilla.org/ja/docs/Web/API/MediaStream_Recording_API)の引数として与え録画や録音をする、というのが主要な使い道になります。

以下に、`video`要素の`srcObject`に取得した`MediaStream`オブジェクトを設定する例を示します。ウェブカメラで取得した映像をブラウザに表示するシンプルなものですが、ブラウザとデバイスをつなげる最初の一歩です 。注意点として、`video`タグに`autoplay`属性をつけ自動再生させるようにしてください。

```
<video autoplay></video>
```

```
document.addEventListener("DOMContentLoaded", async () => {
  const videoElement = document.querySelector("video");
  // 引数でデバイスを指定する
  const stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
  videoElement.srcObject = stream;
})
```

![ビデオキャプチャの例](https://ics.media/entry/211118/images/211118_capture_video.png)

ただし、`getUserMedia()`は**https通信でのみ使用できる**という点に注意してください。localhostだけは例外的に使用できます。

`getUserMedia`メソッドには、アクセスしたいデバイスを指定する必要があります。今回はひとまずカメラのみアクセスしたいので上記のように`video: true`を指定しましょう。

### アクセス拒否時の設定

`getUserMedia`でデバイスにアクセスする際、ブラウザにデバイスの許可を求められます。

![ブラウザのダイアログ](https://ics.media/entry/211118/images/211118_brower_dialogue.png)

ダイアログの出現はブラウザごとに挙動が異なり、Chromeは初回アクセス時のみですが、Safariは毎回出現する、といった違いがあるようです。アクセスを拒否した際の処理については、`getUserMedia`のエラー処理で定義できます。拒否した際にアラートを表示する処理を追加してみましょう。

```
document.addEventListener("DOMContentLoaded", async () => {
  const videoElement = document.querySelector("video");
  // 引数でデバイスを指定する
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
    videoElement.srcObject = stream;
  } catch {
    alert("アクセスが拒否されました");
  }
})
```

![アクセス拒否時の挙動](https://ics.media/entry/211118/images/211118_block_access.webp)

### 映像をCanvasに投影する

さて、`<video>`タグに投影した映像ですが、このままではCSSによる加工くらいが限度でしょう。高度な加工のためJavaScriptで扱えるよう`<canvas>`タグに投影する必要があります。canvas要素に映像を投影する方法としては、映像が流れているvideo要素を取得しcanvasに同じものを描画する方法が取られます。

今回は加工の工程も考え、グラフィックの扱いが得意な描画エンジン[PixiJS](https://pixijs.com/)を使用します。まずは、[公式レポジトリ](https://github.com/pixijs/pixijs)に記載されているとおりに、NPMかCDNでライブラリを導入しましょう。

導入が完了したら、処理を記述します。PixiJSでは描画対象を「スプライト」として扱います。次のコードは、videoタグの描画内容をスプライト化してcanvasに描画する処理です。

```
<video autoplay></video>
<canvas></canvas>
```

```
import * as PIXI from "pixi.js";

const videoElement = document.querySelector("video");
const canvasElement = document.querySelector("canvas");

// アプリケーションを生成する
const app = new PIXI.Application({view: canvasElement});
// videoタグをスプライト化する
const videoSprite = PIXI.Sprite.from(videoElement);
videoSprite.width = canvas.width;
videoSprite.height = canvas.height;
// スプライト化したvideoを描画する
app.stage.addChild(videoSprite);
```

![canvasに投影する例](https://ics.media/entry/211118/images/211118_capture_canvas.png)

video要素に流れている映像と同じものがcanvasにも投影されました。

videoタグ（元の映像）は不要なので非表示にしておきたいのですが、ブラウザによっては`display: none;`などで非表示にするとcanvasに映像を渡せなくなることが確認されています。

`opacity: 0;`と`position: absolute;`で非表示にする方法や、videoの上にcanvasを重ねる、といった方法、または`videoElement.remove()`でdomごと除去する方法でも問題なく非表示にできるようです。お好みの方法をご使用ください。

さて、これで描画内容に加工できるようになったので、いろいろな処理を加えてみましょう！

### PixiJSのフィルターを使ってみる

この項ではcanvasにフィルターをかけ、描画した映像を加工します。PixiJSで使えるフィルターには大きく3種類あります。

-   PixiJSに組み込まれているフィルター（例：ノイズフィルター、歪みフィルター）
-   外部ライブラリの[PixiJS Filters](https://github.com/pixijs/filters)に含まれるフィルター（例：ドットフィルター、エンボスフィルター）
-   自作シェーダーを用いたフィルター

#### PixiJSの組み込みフィルター

PixiJSにはデフォルトで歪み、ノイズ、ブラーなどいくつかのフィルターが組み込まれています。[公式ドキュメント](https://filters.pixijs.download/main/docs/index.html)の「Built-In Filters」に使用イメージがあります。

![組み込みフィルターの例](https://ics.media/entry/211118/images/211118_build_in_filters.png)

フィルターを適用する手順としては次の通りです。

1.  フィルターを生成する
2.  フィルターをかけたい対象にフィルターを適用する

フィルターの生成は次のように行います。

```
const filter = new PIXI.filters.NoiseFilter();
```

フィルターを適用したい対象に、フィルターを設定します。次の例はアプリケーション全体にかける例です。

```
app.stage.filters = [filter];
```

Container（複数のスプライトをまとめたもの）やスプライト自身に限定的にかけることも可能です。

```
const container = new PIXI.Container();
container.addChild(sprite);
container.filters = [filter];
```

さらに、フィルターは重ねがけも可能です。次にブラーフィルターとノイズフィルターを重ねがけした例を示します。フィルターは先頭から適用されるので、次のコードではブラーをかけた映像にノイズを当てる形になります。

```
const blurFilter = new PIXI.filters.BlurFilter(4);
const noiseFilter = new PIXI.filters.NoiseFilter();
app.stage.filters = [blurFilter, noiseFilter];
```

個々のフィルターのパラメーターについては公式ドキュメントがあまりフィルターの解説に力を入れていないのか、わかりにくい点が少々あります……。ソースコードには比較的丁寧にコメントが記載されているので、こちらを参照するのがよいでしょう。

-   例：[NoiseFilter.ts（ノイズフィルター）](https://github.com/pixijs/pixijs/blob/dev/packages/filter-noise/src/NoiseFilter.ts)

このパラメーターは[PixiJS Filters Demo](http://filters.pixijs.download/dev/demo/index.html)で視覚的に確認することもできます。

![パラメーター](https://ics.media/entry/211118/images/211118_param.png)

さて、組み込みフィルターについて理解してきたと思うので、ここでひとつフィルターを組み合わせてみましょう。 筆者はノイズフィルター、色彩フィルター、歪みフィルター、ブラーフィルターを組み合わせて以下のように古い映像風な加工をしてみました。

![組み込みフィルターの例](https://ics.media/entry/211118/images/211118_capture_buildin.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211021_camera_filters/pages/04_filterDemo01.html)
-   [コードを確認する](https://github.com/ics-creative/211021_camera_filters/blob/main/pages/04_filterDemo01.html)

みなさんもぜひ色々な表現に挑戦してみてください。

#### PixiJS Filtersの使用

組み込みのフィルターはシンプルなものが多いですが、外部ライブラリである[PixiJS Filters](https://github.com/pixijs/filters)は単体でも大きな効果を発揮するフィルターが多く組み込まれています。エンボス加工風、ドット絵風といったものや、モーションブラーのようにアニメーションするフィルターもあります。

NPMかCDNからライブラリを追加してフィルターを使ってみましょう。 今回は冒頭で紹介したデモで用いた古いテレビ風のフィルターを紹介します。 適用の仕方は基本的に組み込みのフィルターと同様です。

```
import {OldFilmFilter} from "pixi-filters";

// CDNで読み込む場合は new PIXI.filters.OldFilmFilter();
const oldFilmFilter = new OldFilmFilter();
app.stage.filters = [oldFilmFilter];
```

![pixi-filtersのデモ](https://ics.media/entry/211118/images/211118_capture_pixi_filter.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211021_camera_filters/pages/05_filterDemo02.html)
-   [コードを確認する](https://github.com/ics-creative/211021_camera_filters/blob/main/pages/05_filterDemo02.html)

[PixiJS Filters Demo](http://filters.pixijs.download/dev/demo/index.html)ではすべてのフィルターのデモが試せます。お気に入りのフィルターを探してみてください。

#### フィルターの自作

ここまでPixiJSに用意されたフィルターをたくさん使って遊んできましたが、**フィルターの自作**によって、より理想の表現が追求できます。フィルターの作成には**シェーダー言語**が必要なため少し難しいですが、今回は簡単なものに触れて雰囲気を掴んでみましょう。

自作フィルターを作成する手順としては、これまでのフィルターと同様`PIXI.Filter`インスタンスを生成します。引数に頂点シェーダー、フラグメントシェーダーを与えます。第三引数にはユニフォーム変数と呼ばれる、シェーダーに渡すデータを設定できます。

```
// vertex:頂点シェーダー
// fragment:フラグメントシェーダー
const myFilter = new PIXI.Filter(vertex, fragment, {uniform: 1.0});
app.stage.filters = [myFilter];
```

既存の組み込みフィルターもシェーダー言語で書かれていますので、例として[アルファフィルターのソースコード](https://github.com/pixijs/pixijs/tree/dev/packages/filter-alpha/src)を見てみましょう。まず、JavaScript側（AlphaFilter.ts）では以下のようにフィルターを生成しています。（説明用に読み替えています）

```
// defaultVertexは組み込みの頂点シェーダー
const filter = new PIXI.Filter(PIXI.defaultVertex, fragment, { uAlpha: 0.5 });
```

次に、フラグメントシェーダーを見ていきましょう。フラグメントシェーダーはGLSLという言語で記述されます。アルファフィルターでは[alpha.frag](https://github.com/pixijs/pixijs/blob/dev/packages/filter-alpha/src/alpha.frag)ファイルとして記述されています。

```
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uAlpha;

void main(void)
{
    gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;
}
```

vTextureCoord, uSamplerはPixiJSの組み込み変数になります。ここでは詳しくは説明しませんが、`texture2D(uSampler, vTextureCoord)`で加工する対象のテクスチャをとりだし、そこにユニフォーム変数である`uAlpha`の値をかけて透明度を変更しています。こうして変換された画像がcanvasに投影されます。

これが自作フィルター作成の流れです。筆者も、自作フィルターの例としてモザイクフィルターを作成してみました。ユニフォーム変数としてマウスの座標を渡し、インタラクティブなコンテンツに仕上げてみました。

![モザイクフィルターの例](https://ics.media/entry/211118/images/211118_capture_mosaik.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211021_camera_filters/pages/06_filterDemo03.html)
-   [コードを確認する](https://github.com/ics-creative/211021_camera_filters/blob/main/pages/06_filterDemo03.html)

シェーダーのコードは[『WebGLのシェーダーGLSLでの画像処理の作り方（モノクロ、セピア、モザイク、渦巻き）』](https://ics.media/entry/5535/)内でたくさん紹介されているのでぜひ参考にしてください。

シェーダー言語はとっつきにくい言語ではありますが、身に付けると表現の幅がグッと向上します。筆者も[『The Book of Shaders』](https://thebookofshaders.com/?lan=jp)などで目下勉強中です。

### まとめ

今回は、クリエイティブカメラの作成を通じて、ブラウザでのデバイスの扱い、canvasでの動画加工、さらにはシェーダーを用いた加工について学習しました。

今回紹介した技術はアイデア次第でさらに応用することも可能です。たとえば、WebRTCなどの通信技術と組み合わせると、ビデオ通話でフィルターをかけたりできるようになります。

または、[ml5.js](https://ml5js.org/)や[TensorFlow](https://www.tensorflow.org/?hl=ja)といった機械学習ライブラリと組み合わせることで、顔の一部だけエフェクトをかけたり、背景をぼかしたりといった加工も可能でしょう。もちろんそれらを組み合わせることもできます。

ml5.jsに関しては次の記事で紹介しています

-   [『新年会のスターになれる！？ 機械学習を使ったおもしろカメラ』](https://ics.media/entry/191227/)

今回は映像に関してのみ紹介しましたが、`MediaDevices`インターフェースでは音声も取得できます。映像と音声を組み合わせても、いろいろな応用例が浮かびます。

本記事をきっかけに、デバイスを用いたコンテンツづくりに興味をもってもらえれば幸いです。