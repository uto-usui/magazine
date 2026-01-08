---
title: "JSでクリエイティブコーディング - テキストを分解しパーティクルにする演出"
source: "https://ics.media/entry/221216/"
publishedDate: "2022-12-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2022年12月16日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

パーティクルとは粒子のこと。パーティクルを表現に取り入れると、印象的な演出に役立ちます。**JavaScriptやWebGLを使うこと**で、ウェブの技術でもパーティクル表現の制作が可能です。本記事では題材にパーティクル表現の制作に役立つアイデアや着眼点を紹介します。

### 作例の紹介

本記事のチュートリアルの完成形はこちらになります。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle.html)

**この記事で学べること**

-   2Dテキストを粒子化して動かす表現
-   パーリンノイズによる空気感の再現
-   GSAPによる大量のトゥイーン制御
-   WebGLの高速化（PixiJSの応用）

### 制作の技術

本作例を制作するにあたり、利用しているウェブの技術の概要を紹介します。

![](https://ics.media/entry/221216/images/images/221216_tween_particle_technologies.png)

#### WebGL

画面表示はWebGLを利用します。ウェブのレンダリング技術において、もっとも高速な描画性能を得られるのがWebGLであるためです。**WebGLは3D表現のための技術と思われがちですが、2Dでも利用できます**。

2D向けWebGLライブラリとしては[PixiJSピクシィ・ジェイエス](https://pixijs.com/)が有名です。実行性能が極めて高く、Adobe FlashのようなAPIを備えています。本作例ではPixiJSを使いますが、WebGLでレンダリングできればいいので他のJSライブラリを利用しても構いません。

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

### 手順1. テキストをCavnvasに描画する

画像文字として、透過PNG画像を用意します。

![](https://ics.media/entry/221216/images/images/221216_text_image.png)

透過PNG画像をJavaScriptで読み込みます。同期的に読み込みたいので、以下のように`img`要素を作成し、`decode()`メソッドを`await`で待機します。

```
// 画像を読み込む
const image = new Image();
image.src = "images/text_2x.png";
await image.decode();
```

画像要素は`canvas`タグの2次元描画APIである`CanvasRenderingContext2D`（以下、Canvas 2Dと記載）に転写します。Canvas 2Dに転写することで、透過PNG画像の画素情報を調べることが可能になります。

```
// 画像のサイズを算出
const imageW = image.width;
const imageH = image.height;

// 画像をメモリ上のcanvasに転写。ピクセル値を取得するため
const canvas = document.createElement("canvas");
canvas.width = imageW;
canvas.height = imageH;
const context = canvas.getContext("2d", {
  // getImageData() を頻繁に読み出すためのヒント
  willReadFrequently: true,
});
context.drawImage(image, 0, 0);
```

ここで作成した`canvas`要素はメモリ上で利用するだけで、`document.body`のDOMツリーには配置しません。

### 手順2. テキストを粒子に分解する

Canvas 2Dに転写した画像の全ピクセルを調べることで、パーティクルの配置すべき座標を調べます。

Canvas 2DではXY座標を指定すれば、ピクセルのRGBA値を調べられます。`for`文を使って、画像の全ピクセルを走査します。

```
const dots = []; // パーティクルの保存先

const lengthW = imageW;
const lengthH = imageH;

for (let i = 0; i < lengthW * lengthH; i++) {
  // カウンタ変数 i から x, y を算出
  const x = i % lengthW;
  const y = Math.floor(i / lengthW);
  // x,y座標の画素情報を取得
  const dotData = context.getImageData(x, y, 1, 1);
```

ピクセルのRGBA値を調べて、透明ピクセル以外のピクセルを調べます。実行負荷を下げるために生成する粒子は最小限に留めておきたいところです。透明ピクセルでは粒子を生成しないよう、無視するようにします。

```
// 透過チャンネルを取得(0 = 赤, 1 = 緑, 2 = 青, 3 = アルファ)
const alpha = dotData.data[3];

// 透明であればスプライトは作らないようにする
if (alpha === 0) {
  continue;
}
```

透明ピクセル以外であれば、粒子を生成します。粒子はただの白い四角形として、PixiJSのスプライトで生成します。

※PixiJSのセットアップ等はコードを省略しています。詳細はGitHubのコードを参照ください。

```
// パーティクルを生成
const dot = new PIXI.Sprite(PIXI.Texture.WHITE);
dot.x = x;
dot.y = y;
dot.width = 1;
dot.height = 1;
dot.alpha = alpha / 255; // 元画像の透明度を適用
container.addChild(dot);

// 配列に保存
dots.push(dot);
```

わかりやすく可視化したのが、次の図版です。実際は隙間なく敷き詰めています。

![](https://ics.media/entry/221216/images/images/221216_text_images_dot.png)

### 手順3. 粒子を飛ばす

パーティクルが拡散する演出を作成します。パーティクルを拡散させるためには乱数を使って、適当な座標を算出します。

JavaScriptでは`Math.random()`メソッドを使うと、`0.0`〜`1.0`の範囲の数値が得られます。ゼロを中心に値を散らかしたいときは、`Math.random()`の最大値である`1.0`の半分の値を引き算し、`Math.random() - 0.5`という計算式とすることで`-0.5`〜`0.5`の範囲の値が得られます。これに振幅をかけ算すれば、`振幅 * (Math.random() - 0.5)`という計算式となり`-振幅の半分`〜`+振幅の半分`の範囲の値が得られます。

```
// stageW と stageH は画面幅と画面高さ
const randomX = stageW * (Math.random() - 0.5);
const randomY = stageH * (Math.random() - 0.5);
```

配列に対して乱数を計算し適用します。GSAPの`from()`メソッドを使って出発点となるキーフレームを作成します。パーティクルの1つひとつに個別のトゥイーンを指定しますが、トゥイーンを集約管理するためのGSAPのタイムラインを作成しています。

```
// GSAPのタイムラインを作成（各トゥイーンを集約管理するため）
const tl = gsap.timeline({ repeat: -1, yoyo: true });

// 画面サイズを取得
const stageW = app.screen.width;
const stageH = app.screen.height;

for (let i = 0; i < dots.length; i++) {
  const dot = dots[i];
  // パーティクルの移動座標を決める

  const randomX = stageW * (Math.random() - 0.5);
  const randomY = stageH * (Math.random() - 0.5);

  tl.from(
    dot,
    {
      x: randomX,
      y: randomY,
      alpha: 0,
      duration: 4,
      ease: "expo.inOut",
    },
    0, // 各トゥイーンは0秒地点を開始とする
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

  const index = dot.offsetIndex;

  // XとYを正規化 (Normalize X and Y)
  // nx は左辺を基準に 0.0〜1.0の値をとる
  const nx = (index % lengthW) / lengthW;
  // ny は上辺を基準に 0.0〜1.0の値をとる
  const ny = Math.floor(index / lengthW) / lengthH;

  // パーリンノイズでパーティクルの移動座標を決める。
  // パーリンノイズだと連続性が生まれるので、波打つ表現になる。
  // 乗算は周期と考えてもらえばOK。
  const px = noise.perlin2(nx, ny);
  const py = noise.perlin2(nx * 2, ny);

  tl.from(
    dot,
    {
      x: stageW * px,
      y: stageH * py,
      alpha: 0,
      duration: 4,
      ease: "expo.inOut",
    },
    0, // 各トゥイーンは0秒地点を開始とする
  );
}
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle_step2.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle_step2.html)

ぐにゃっと曲がるような表現になりました。

#### 水平方向に流れるような演出

画面の左側から流れるように表示したいと思います。トゥイーンの遅延時間にX座標を加味してみましょう。

```
// 画面左側から遅延
// nxは左端が0.0、右側が1.0の正規化された数値
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
  delay, // 各トゥイーンは0秒地点を開始とする
);
```

![](https://ics.media/entry/221216/images/221216_tween_particle_delay.gif)

パーティクルの出現と退場に「流れ」が生まれてきました。

#### さらに乱数を加えて味付け

パーリンノイズで計算した座標をそのまま使うと規則性が強くでてしまいます。もう一段階、適当な乱数を加算しています。

```
const px = noise.perlin2(nx, ny * 2);
const py = noise.perlin2(nx * 2, ny);

// 画面左側から遅延
const delay = nx * 1;

// 画面左側から拡散度合いを強くする
const spread = (1 - nx) * 100 + 100;
// 追加で乱数で拡散
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
  delay, // 各トゥイーンは0秒地点を開始とする
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

WebGLには大量の要素を同時に動かすには、CPU・GPUの性能を引き出すことが必要です。一般的にドローコール（描画命令）を少なくすることが、取り組みやすい最適化です。

PixiJSだと、`ParticleContainer`クラスを使うと、ドローコールが最適化されます（[公式ドキュメント](https://pixijs.download/dev/docs/PIXI.ParticleContainer.html)）。数万個の粒子を負荷少なめで描画できるようになるので、表現制作においては強力な機能です。

性能が向上するなら`ParticleContainer`クラスを常に使いたくなりますが、実はそのような簡単な話ではありません。`ParticleContainer`クラスだと子どものネストができなかったり、マスクやフィルターが使えないなど、多くの制約があります。また位置座標のみ、回転のみと制約が多ければ多いほど性能が向上します。制約と誓約を課すほど、より強い力を得られるような中二病仕様です。

ドローコールの最適化は記事『[WebGLのドローコール最適化手法](https://ics.media/entry/5221/)』で解説しているので、詳しく知りたい方は読んでみてください。

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

対策としては、ウェブフォントを使うのがよさそうです。ただし、Canvas 2Dでウェブフォントを使うには、フォントの読み込みが描画前に完了している必要があります。ウェブフォントの読み込み状況は検知しづらく、[WebFontLoader](https://github.com/typekit/webfontloader)等のJSライブラリを検討する必要があります。詳しくは記事『[HTML5 CanvasとWebGLでウェブフォントを扱う方法](https://ics.media/entry/8385/)』を参照ください。

つまり、実現したいことに対して**あまりにもコードが複雑になる**ため、画像文字で代用することにしました。

### おまけ：WebGLとJSライブラリを使わずに挑戦してみる

WebGL等の技術ではなく、`div`タグと標準のWeb Animations APIを使って同じような表現を作ってみました。

（動作が重たいので、別タブで再生ください）

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle_dom_waa.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle_dom_waa.html)

実行時の負荷が高く粒子の数を増やすのは、厳しそうです。また、アニメーションのコードが乱雑になっています。Web Animations APIはシンプルな動きを作ることには適していますが、**複数の動きを組み合わせるようなモーションは苦手**だと思います。

![](https://ics.media/entry/221216/images/images/221216_html_div_particles.png)

WebGLを使う方が描画は高速ですが、**技術選定の際に比較検証デモを作って、どの技術が適切なのか判断することは大事**です。DOMで作ったらどうなるかは予想できていましたが、エビデンスを作成すること自体は大切なことだと思います。

### まとめ

この記事で伝えたかったポイントとしては、モーションの実装は**ちょっとした技術を組み合わせることで実現できる**、**工夫をして表現を追求するのは楽しい**ということです。クリエイティブコーディングに興味を持って頂けたら幸いです。