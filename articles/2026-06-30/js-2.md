---
title: "JSでクリエイティブコーディング - テキストを分解しパーティクルにする演出"
source: "https://ics.media/entry/221216/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2022-12-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

パーティクルとは粒子のこと。パーティクルを表現に取り入れると、印象的な演出に役立ちます。**JavaScriptやWebGPUを使うこと**で、ウェブの技術でもパーティクル表現の制作が可能です。本記事では題材にパーティクル表現の制作に役立つアイデアや着眼点を紹介します。

### 作例の紹介

本記事のチュートリアルの完成形はこちらになります。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle.html)

**この記事で学べること**

-   2Dテキストを粒子化して動かす表現
-   パーリンノイズによる空気感の再現
-   GSAPによる大量のトゥイーン制御
-   WebGPUを使った2D描画（PixiJS v8の応用）

### 制作の技術

本作例を制作するにあたり、利用しているウェブの技術の概要を紹介します。

![](https://ics.media/entry/221216/images/images/221216_tween_particle_technologies.png)

#### WebGPU

画面表示はWebGPUを利用します。今回のデモコードでは、PixiJS v8の`Application.init()`に`preference: "webgpu"`を指定し、WebGPUでレンダリングしています。**WebGPUは3D表現のための技術と思われがちですが、2Dでも利用できます**。

2D向けのGPUレンダリングライブラリとしては[PixiJSピクシィ・ジェイエス](https://pixijs.com/)が有名です。実行性能が極めて高く、Adobe FlashのようなAPIを備えています。本作例ではPixiJSを使っていますが、WebGPUでレンダリングできれば他のJSライブラリを利用しても構いません。

#### Canvas 2D

Canvas 2Dを利用して、画像からピクセル情報の解析を行います。後述の空白ピクセルの有無を判定するためです。

#### トゥイーン

キーフレームごとに位置座標を指定し、キーフレームの間を補間することでモーションを実現します。この補間技術をトゥイーンと呼びます。トゥイーンを実現するJavaScriptとして今回は[GSAPジーサップ](https://ics.media/entry/220822/)を利用します。GSAPは同時実行性能が高いのでオススメしていますが、他のJSライブラリでも問題ありません。

#### 再現性のある乱数

乱数の生成にパーリンノイズを利用するため、JSライブラリ「[josephg/noisejs](https://github.com/josephg/noisejs)」を利用します。パーリンノイズを実現するライブラリは他にもあるので、別のJSライブラリでも問題ありません。

### 4段階の手順で制作

以下のアプローチで表現化します。

1.  テキストをCanvasに描画する
2.  テキストを粒子に分解する
3.  粒子を飛ばす
4.  飛ばし方に風の要素を加える

大量の粒子が集まってテキスト形状を形成するようにします。

### 手順1. テキストをCanvasに描画する

画像文字として、透過PNG画像を用意します。

![](https://ics.media/entry/221216/images/images/221216_text_image.png)

透過PNG画像をJavaScriptで読み込みます。同期的に読み込みたいので、以下のように`img`要素を作成し、`decode()`メソッドを`await`で待機します。

```
// 元になる文字画像を読み込む。
// この画像の不透明な画素だけを、あとでパーティクルへ変換する。
const image = new Image();
image.src = "images/text_2x.png";

// 後続の処理では画像サイズや画素データを使うため、
// decode()が完了するまで待ってから次へ進む。
await image.decode();
```

画像要素は`canvas`タグの2次元描画APIである`CanvasRenderingContext2D`（以下、Canvas 2Dと記載）に転写します。Canvas 2Dに転写することで、透過PNG画像の画素情報を調べることが可能になります。

```
// 画像サイズを控えておく。
// Canvasの作成サイズや、粒子の配置座標を決めるときに利用する。
const imageW = image.width;
const imageH = image.height;

// ピクセル情報を調べるためだけの、一時的なCanvasをメモリ上に作成する。
// 画面に表示する目的ではないので、DOMには追加しない。
const canvas = document.createElement("canvas");
canvas.width = imageW;
canvas.height = imageH;
const context = canvas.getContext("2d", {
  // あとでgetImageData()を使って画素配列を読み出すため、
  // ブラウザに「読み取りが多い用途」であることを伝えておく。
  willReadFrequently: true,
});

// 読み込んだ画像をCanvasへ転写する。
// これでCanvas 2D API経由でRGBA値を取得できるようになる。
context.drawImage(image, 0, 0);
```

ここで作成した`canvas`要素はメモリ上で利用するだけで、`document.body`のDOMツリーには配置しません。

### 手順2. テキストを粒子に分解する

Canvas 2Dに転写した画像の画素情報をもとに、パーティクルの配置すべき座標を調べます。

現在のデモでは、`getImageData()`をピクセルごとに繰り返し呼ぶのではなく、画像全体のRGBA値を一度だけ取得して参照します。また、1粒子あたりの担当範囲を`DOT_SIZE`でまとめ、処理量を抑えています。

```
// すべての粒子が参照する共通テクスチャを1枚だけ作る。
// 各粒子では、このテクスチャの一部だけを切り出して使う。
const texture = PIXI.Texture.from(image);

// 画像全体のRGBA値を一度だけ取り出して配列化する。
// ピクセルごとにgetImageData()を呼ぶよりも、こちらの方が効率がよい。
const imageData = context.getImageData(0, 0, imageW, imageH).data;

// 生成した粒子をあとでまとめてアニメーションさせるため、配列に保持する。
const dots = [];

// 1粒子が担当する画素サイズ。
// 値を大きくすると粒子数は減り、値を小さくするとより細かな見た目になる。
const DOT_SIZE = 2;

// 横方向・縦方向に、何個の粒子を並べるかを計算する。
const lengthW = imageW / DOT_SIZE;
const lengthH = imageH / DOT_SIZE;

for (let i = 0; i < lengthW * lengthH; i++) {
  // 連番のiから、この粒子が担当する左上座標を求める。
  const x = (i % lengthW) * DOT_SIZE;
  const y = Math.floor(i / lengthW) * DOT_SIZE;

  // 担当領域の中央画素を代表値として使う。
  // ここでは色ではなく、透明かどうかだけを判定する。
  const sampleX = x + Math.floor(DOT_SIZE / 2);
  const sampleY = y + Math.floor(DOT_SIZE / 2);

  // RGBA配列のうち、アルファ値の位置を計算する。
  // 1画素あたり4要素なので「* 4」し、最後の「+ 3」でA成分を指す。
  const alphaIndex = (sampleY * imageW + sampleX) * 4 + 3;
  const alpha = imageData[alphaIndex];
```

ピクセルのRGBA値を調べて、透明ピクセル以外のピクセルを調べます。実行負荷を下げるために生成する粒子は最小限に留めておきたいところです。透明ピクセルでは粒子を生成しないよう、無視するようにします。

```
// 透明な領域には粒子を作らない。
// 文字の形に必要な場所だけに絞ることで、無駄なオブジェクト生成を避ける。
if (alpha === 0) {
  continue;
}
```

透明ピクセル以外であれば、粒子を生成します。現在のデモでは白い四角形を描くのではなく、元画像の一部を切り出したテクスチャを各粒子に割り当てています。

※PixiJSのセットアップ等はコードを省略しています。詳細はGitHubのコードを参照ください。

```
// 共通テクスチャのうち、この粒子が担当する小さな領域だけを切り出す。
// これにより、粒子1つ1つが元画像の一部をそのまま持てる。
const texture2 = new PIXI.Texture({
  source: texture,
  frame: new PIXI.Rectangle(x, y, DOT_SIZE, DOT_SIZE),
});

// 切り出したテクスチャを使って粒子スプライトを作成する。
const dot = new Dot(texture2);

// スケール変更時に中心を基準に拡大縮小できるよう、アンカーを中央にする。
dot.anchor.set(0.5);

// 画像の左上基準の座標を、コンテナー中央基準の座標へ変換する。
dot.x = x - imageW / 2;
dot.y = y - imageH / 2;

// あとでノイズや遅延時間を計算するときに使えるよう、元の並び順を保持する。
dot.offsetIndex = i;

// 画面表示用のコンテナーに追加する。
container.addChild(dot);

// GSAPでまとめて処理するため、配列にも保存する。
dots.push(dot);
```

わかりやすく可視化したのが、次の図版です。実際は隙間なく敷き詰めています。

![](https://ics.media/entry/221216/images/images/221216_text_images_dot.png)

### 手順3. 粒子を飛ばす

パーティクルが拡散する演出を作成します。パーティクルを拡散させるためには乱数を使って、適当な座標を算出します。

JavaScriptでは`Math.random()`メソッドを使うと、`0.0`〜`1.0`の範囲の数値が得られます。ゼロを中心に値を散らかしたいときは、`Math.random()`の最大値である`1.0`の半分の値を引き算し、`Math.random() - 0.5`という計算式とすることで`-0.5`〜`0.5`の範囲の値が得られます。これに振幅をかけ算すれば、`振幅 * (Math.random() - 0.5)`という計算式となり`-振幅の半分`〜`+振幅の半分`の範囲の値が得られます。

```
// Math.random() - 0.5 とすることで、値の中心を0に寄せる。
// 画面幅・画面高さを掛けると、画面全体へ散る座標が作れる。
const randomX = stageW * (Math.random() - 0.5);
const randomY = stageH * (Math.random() - 0.5);
```

配列に対して乱数を計算し適用します。GSAPの`from()`メソッドを使って出発点となるキーフレームを作成します。パーティクルの1つひとつに個別のトゥイーンを指定しますが、トゥイーンを集約管理するためのGSAPのタイムラインを作成しています。

```
// すべての粒子トゥイーンを1本のタイムラインで管理する。
// repeat: -1 は無限ループ、yoyo: true は往復アニメーションを意味する。
const tl = gsap.timeline({ repeat: -1, yoyo: true });

// 粒子の飛び散る範囲を決めるため、現在の画面サイズを控えておく。
const stageW = app.screen.width;
const stageH = app.screen.height;

for (let i = 0; i < dots.length; i++) {
  const dot = dots[i];

  // 粒子ごとにランダムな出発位置を作る。
  // これにより、最初はバラバラな場所に散っているように見せられる。
  const randomX = stageW * (Math.random() - 0.5);
  const randomY = stageH * (Math.random() - 0.5);

  tl.from(
    dot,
    {
      // from() は「この値から現在の値へ向かって動く」ことを表す。
      x: randomX,
      y: randomY,
      alpha: 0,
      duration: 4,
      ease: "expo.inOut",
    },
    // すべて0秒開始にすると、全粒子が同時に集まり始める。
    0,
  );
}
```

ここまでの手順でパーティクル演出を作成できました。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle_step1.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle_step1.html)

### 手順4. 飛ばし方に風の要素を加える

風のような表現を加えるために、パーリンノイズを利用します。

さきほど説明した`Math.random()`メソッドは実行するたびに`0.0`〜`1.0`の値を**規則性なく**返します。対して、パーリンノイズは引数によって**規則性のある乱数**が得られます。連続した2つの引数を与えれば、近い値が得られます。

![](https://ics.media/entry/221216/images/images/221201_perlin_noise_zushi.png)

規則性のあるノイズを利用すると、一例として波打つような描画結果を得られます。

![](https://ics.media/entry/221216/images/images/221216_perlin_wave.png)

次のデモで、関数に与える引数を変更すると連続した値を得られていることを確認できます。XとYのスライダーをゆっくり動かして確認しましょう。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_perlin_debug.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_perlin_debug.html)

パーリンノイズは「波」、「風」といった表現に利用できます。応用できることが多いので、クリエイティブコーディングをするなら覚えておきたい手法です。詳しくは記事『[パーリンノイズを使いこなせ](https://ics.media/entry/18812/)』を参考ください。

パーリンノイズで求めた値は、GSAPの出発点の座標に適用します。

```
for (let i = 0; i < dots.length; i++) {
  const dot = dots[i];

  // 生成時に保存しておいた並び順を取り出す。
  // これをもとに、各粒子の「元の位置」を再計算する。
  const index = dot.offsetIndex;

  // X方向の位置を0.0〜1.0へ正規化する。
  // 左端に近い粒子ほど0に、右端に近い粒子ほど1に近づく。
  const nx = (index % lengthW) / lengthW;

  // Y方向の位置も0.0〜1.0へ正規化する。
  // 上端に近い粒子ほど0に、下端に近い粒子ほど1に近づく。
  const ny = Math.floor(index / lengthW) / lengthH;

  // 正規化した座標をパーリンノイズへ入力する。
  // 近い位置の粒子は近い値を返すため、ランダムなのに連続性のある動きになる。
  const px = noise.perlin2(nx, ny);
  const py = noise.perlin2(nx * 2, ny);

  tl.from(
    dot,
    {
      // ノイズ値を画面サイズで拡大し、出発位置として使う。
      x: stageW * px,
      y: stageH * py,
      alpha: 0,
      duration: 4,
      ease: "expo.inOut",
    },
    // まずは全粒子を同時に動かし、ノイズの効果だけを確認しやすくする。
    0,
  );
}
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle_step2.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle_step2.html)

ぐにゃっと曲がるような表現になりました。

#### 水平方向に流れるような演出

画面の左側から流れるように表示したいと思います。トゥイーンの遅延時間にX座標を加味してみましょう。

```
// 左側の粒子ほど早く、右側の粒子ほど遅く開始するようにする。
// nxは0.0〜1.0なので、そのまま遅延時間へ流用できる。
const delay = nx * 1.0;

// (一部省略)

tl.from(
  dot,
  {
    x,
    y,
    alpha: 0,
    duration: 4,
    ease: "expo.inOut",
  },
  // 粒子ごとに少しずつ開始タイミングをずらすことで、
  // 左から右へ流れていくような見え方になる。
  delay,
);
```

![](https://ics.media/entry/221216/images/221216_tween_particle_delay.gif)

パーティクルの出現と退場に「流れ」が生まれてきました。

#### さらに乱数を加えて味付け

パーリンノイズで計算した座標をそのまま使うと規則性が強くでてしまいます。もう一段階、適当な乱数を加算しています。

```
// ノイズの入力値を少し変えて、X方向とY方向で異なる揺れ方を作る。
const px = noise.perlin2(nx, ny * 2);
const py = noise.perlin2(nx * 2, ny);

// 左から右へ時間差で出現する流れは引き続き維持する。
const delay = nx * 1;

// 左側の粒子ほど大きく散らす。
// 文字が流れ込んでくるような印象を強めるための係数。
const spread = (1 - nx) * 100 + 100;

// ノイズだけだと規則性が強く見えるので、
// 最後に乱数を足して「少しだけ崩した自然さ」を加える。
const x = stageW * px + Math.random() * spread;
const y = stageH * py + Math.random() * spread;

tl.from(
  dot,
  {
    x,
    y,
    alpha: 0,
    duration: 4,
    ease: "expo.inOut",
  },
  // ノイズによる流れと、時間差による流れを同時に適用する。
  delay,
);
```

![](https://ics.media/entry/221216/images/221216_tween_particle_random.gif)

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle_step3.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle_step3.html)

これで規則正しい雰囲気を抑制できました。

### 完成形

最後にいろいろと味付けをします。出現時と退場時のイージングを異なるものを指定して余韻を調整したり、少しずつ手前側に近寄ってくるような演出を加えています。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle.html)

本記事で伝えたかったチュートリアルは以上となります。ここからは、とくに読まなくてよい内容ですが、より深く技術のことを知りたい方向けに書きます。

### コラム： 大量の粒子を効率よく表示する

WebGPUのようなGPU描画でも、大量の要素を同時に動かすにはCPU・GPUの両方の負荷を意識する必要があります。一般的にドローコール（描画命令）を少なくすることや、CPU側の無駄な処理を減らすことが、取り組みやすい最適化です。

今回のデモコードでは、まず`context.getImageData(0, 0, imageW, imageH)`を1回だけ呼び出して画素配列を使い回し、ピクセルごとの`getImageData()`呼び出しを避けています。また、`PIXI.Texture.from(image)`で共通テクスチャを1枚だけ作成し、各粒子では`PIXI.Rectangle`で必要な領域だけを切り出しています。

さらに、粒子全体は`PIXI.Container`でまとめて管理し、拡大縮小や中央寄せを一括で制御しています。PixiJSには`ParticleContainer`のような高速化手段もありますが、今回の実装では粒子ごとの`scaleX`や`scaleY`、`alpha`などを柔軟に扱いたいため、通常の`Container`を採用しています。

GPU描画の最適化という考え方自体はWebGL時代から変わりません。ドローコールの最適化について詳しく知りたい方は、記事『[WebGLのドローコール最適化手法](https://ics.media/entry/5221/)』も参考にしてください。

### コラム：パーリンノイズとシンプレックスノイズ

パーリンノイズを開発したのがケン・パーリンさん。映画『[トロン](https://ja.wikipedia.org/wiki/%E3%83%88%E3%83%AD%E3%83%B3_\(%E6%98%A0%E7%94%BB\))』（1982年）の作成のために生み出された技術です。長い間、パーリンノイズはさまざまな場面で利用されていました。たとえば、Adobe After Effectsの[フラクタルノイズ](https://helpx.adobe.com/jp/after-effects/using/noise-grain-effects.html#:~:text=%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82-,%E3%83%95%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%AB%E3%83%8E%E3%82%A4%E3%82%B9%E3%82%99%E3%82%A8%E3%83%95%E3%82%A7%E3%82%AF%E3%83%88,-%E3%80%8C%E3%83%95%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%AB%E3%83%8E%E3%82%A4%E3%82%BA)やタービュレントノイズもパーリンノイズが使われています。Adobe FlashのBitmapDataクラスの[perlinNoize()メソッド](http://www.fumiononaka.com/TechNotes/Flash/FN0510001.html)は名前の通りパーリンノイズそのものです。

そのパーリンさんが2001年に発表したのがシンプレックスノイズです。パーリンノイズよりシンプレックスノイズのほうが、計算量が少なく高速です。本記事の解説を、パーリンノイズとシンプレックスノイズのどちらで説明するか迷ったのですが、知名度からパーリンノイズを利用しました。使い方はあまり変わらないですしね。

パーリンノイズとシンプレックスノイズは出現する値に微妙な違いがあることを、次の2021年の記事で紹介されています。シンプレックスノイズのほうが偏りは少ないらしいです。

-   [Perlin vs. Simplex – BIT-101](https://www.bit-101.com/blog/2021/07/perlin-vs-simplex/)

私は、この傾向の違いが表現に与えるインパクトまでわからないのですが、もしパッと見でパーリンノイズかシンプレックスノイズのどちらで表現されているか判別できる方がいたらすごいと思います。

余談ですが、パーリンノイズとシンプレックスノイズの違いの記事を書いたキース・ピータース氏は、Flash界隈では[神の書](http://tech.nitoyon.com/ja/blog/2010/01/20/p1/)と言われる『Foundation ActionScript 3 Animation』を書いた方です。Flash Playerが終了した時代でも、Flashを扱っていた達人は健在だなと思いました。

### コラム：なぜ画像文字で用意したか

テキストを用意するのに、手間がかからないように画像文字で用意しました。なぜ画像文字を使用したのでしょうか？

Canvas 2Dにはテキストを描画するための`fillText()`メソッドが存在します。Canvas 2Dでテキストを描いてもいいのですが、総称フォント`sans-serif`だと実行環境によってフォントが異なり、期待する結果が得られません。

対策としては、ウェブフォントを使うのがよさそうです。ただし、Canvas 2Dでウェブフォントを使うには、フォントの読み込みが描画前に完了している必要があります。ウェブフォントの読み込み状況は検知しづらく、[WebFontLoader](https://github.com/typekit/webfontloader)等のJSライブラリを検討する必要があります。詳しくは記事『[HTML CanvasとWebGPUでウェブフォントを扱う方法〜FontFace APIの解説](https://ics.media/entry/8385/)』を参照ください。

つまり、実現したいことに対して**あまりにもコードが複雑になる**ため、画像文字で代用することにしました。

### おまけ：WebGPUとJSライブラリを使わずに挑戦してみる

WebGPU等の技術ではなく、`div`タグと標準のWeb Animations APIを使って同じような表現を作ってみました。

（動作が重たいので、別タブで再生ください）

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle_dom_waa.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle_dom_waa.html)

実行時の負荷が高く粒子の数を増やすのは、厳しそうです。また、アニメーションのコードが乱雑になっています。Web Animations APIはシンプルな動きを作ることには適していますが、**複数の動きを組み合わせるようなモーションは苦手**だと思います。

![](https://ics.media/entry/221216/images/images/221216_html_div_particles.png)

WebGPUを使う方が描画は高速ですが、**技術選定の際に比較検証デモを作って、どの技術が適切なのか判断することは大事**です。DOMで作ったらどうなるかは予想できていましたが、エビデンスを作成すること自体は大切なことだと思います。

### まとめ

この記事で伝えたかったポイントとしては、モーションの実装は**ちょっとした技術を組み合わせることで実現できる**、**工夫をして表現を追求するのは楽しい**ということです。クリエイティブコーディングに興味を持って頂けたら幸いです。