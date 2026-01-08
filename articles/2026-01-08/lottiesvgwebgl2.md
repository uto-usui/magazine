---
title: "制作事例：Lottieのアニメーションを手描き風に動かしたい！SVGとWebGLを使った2つのアプローチ"
source: "https://ics.media/entry/230119/"
publishedDate: "2023-01-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

2023年1月19日 公開 / [株式会社ICS 松本 ゆき](https://ics.media/entry/staff/matsumoto/)

ICSでは2022年に株式会社ニコン様の中長期ビジョンを紹介する特設サイト[『2030年のありたい姿』](https://www.nikon.com/vision2030j/)の実装を行いました。この記事ではサイトのメインビジュアルとして使用している手描き感のあるアニメーションを実現するために検証・実装したSVGとWebGLの技術ご紹介します。**SVGやWebGLを活用したビジュアル表現に興味のあるエンジニア**はもちろん、**ウェブ技術を使ってどのような表現ができるのか知っておきたいディレクター・デザイナー**の方も是非ご覧ください。

▼ 特設サイト[『2030年のありたい姿』](https://www.nikon.com/vision2030j/) ![『2030年のありたい姿』のキャプチャ](https://ics.media/entry/230119/images/230119_nikon2030.png)

### 「人と機械の共創」を魅力的なアニメーションで描きたい

『2030年のありたい姿』の重要なキーワードが「人と機械が共創する社会」でした。特設サイトではこのビジョンを広く一般の方向けに伝えるため、[株式会社日本デザインセンター](https://www.ndc.co.jp/)のデザイン・ディレクションの元、アニメーション制作を[株式会社TANGE FILMS](https://tangefilms.jp/)が、ウェブサイトの実装をICSが担当しました。[イラストレーター宮岡瑞樹さん](https://www.instagram.com/miyaoka_mizuki/)の作品をもとにTANGE FILMSがAdobe After Effectsでアニメーションを作成し、これをICSがウェブページで再生できる形に実装します。

具体的な表現としてはイラストレーターさんのオリジナルの作風を再現するため、線の揺れとグラデーションの粒子感にこだわった実装を行いました。

![表現のポイント：線の揺れとグラデーションの粒子感](https://ics.media/entry/230119/images/230119_expression_point.png)

#### 課題：動画の埋め込みはサイズと画質の観点で難しい

単にページにアニメーションを組み込むだけならAfter Effectsから動画を書き出して埋め込む方法が一番簡単です。しかし、フルスクリーンサイズの動画をメインビジュアルとして耐えうる画質でエンコードしようとすると、モバイルフレンドリーとは言いがたいファイルサイズになることは明らかでした。**圧縮の方式にもよりますが、一般に画像・動画の圧縮アルゴリズムは今回のようなイラスト調でざらざらとしたノイズ感のある画像の処理が苦手です**。

![ざらざらの質感の画像をJPEG圧縮した例＝ギリギリまで画質を落としてもサイズが大きい](https://ics.media/entry/230119/images/230119_compress.png)

この課題を解決するため、このプロジェクトでは**実装前に検証期間を設け、ウェブの技術で軽くてきれいなアニメーションを実現する方法を探りました**。検証の結果、今回は採用しなかった手法も含めて、次の節から紹介します。

### 基本のアプローチ：Lottieを使えばAfter Effectsのアニメーションをウェブで再生できる

まずはAfter Effectsで制作されたアニメーションをウェブページで再生する方法から検討します。とはいえ、動画ファイルで書き出さない場合の選択肢はLottieロッティー一択でしょう。LottieはAfter EffectsのアニメーションをJSON形式で出力し、ウェブページやネイティブアプリで再生するためのライブラリです。基本的にはパスや色の情報を文字列で出力するだけなので、動画ファイルと比べて遥かに軽量なのも特徴です。

After Effectsから出力したJSONデータがあれば、次のようなコードで簡単にアニメーションを再生できます。

▼ Lottieアニメーションを再生する基本的な例

```
import lottie from "lottie-web";

// Lottieを再生する親要素（空のdiv要素）を取得
const view = document.querySelector("#lottieView");
// JSONを指定して読み込み・再生
lottie.loadAnimation({
  container: view,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: '/lottie-sample.json',
});
```

Lottieを使ったアニメーションがどんなものかは[LottieFiles](https://lottiefiles.com/featured)を見ると良いでしょう。さまざまな作例が紹介されており、ダウンロードして商用利用することも可能です（ライセンスは[Lottie Simple License](https://lottiefiles.com/page/license)）。

![LottieFilesのアニメーション例](https://ics.media/entry/230119/images/230119_lottiefiles.png)

#### 課題：Lottieでは手描き風のアニメーションは再現できない

LottieFilesの作例を見ると、どの作品も比較的フラットでシンプルな塗りや線のみで作られていることに気づくでしょう。フラットな表現が昨今のトレンドであることももちろんですが、実は**Lottieではざらざらした風合いや揺れる線といった手描き風の表現は基本的にできません**。もちろん、ざらざらの粒ひとつひとつをパスとして書き出せは原理的には再現できるのですが、出力されるJSONのサイズが巨大になる上、描画の負荷も大きく上がります。アニメーションで使うのは困難でしょう。

そこで今回は、**After Effectsで制作するのはLottieが得意なベタ塗りと歪みのない線まで**とし、手描き風の表現はウェブページ側で追加することにしました。Lottieでできることは[Lottie Supported Features](https://lottiefiles.com/supported-features)にまとまっていますが、ここで👍 マークがついていても組み合わせでうまくいかなかったり重くなってしまったりするものも少なくありません。できるだけ基本的な機能のみに絞って使う方が安全でしょう。

![Lottieではベタ塗りまでとして、後加工で手書き風にする](https://ics.media/entry/230119/images/230119_workflow.png)

これでやるべきことが明確になりました。ここからはLottieの描画結果を手描き風に加工する方法を考えます。

### アプローチ1：Lottieの出力をSVGフィルターで加工する

Lottie（`lottie-web`）は基本的にアニメーションを再生するだけのプレイヤーなので、それ自体に描画内容を加工する機能はありません。その一方、出力結果自体はごく普通のSVGなので、線や塗りを動的に調整したりフィルターを追加して表現を加えるのは比較的容易です。さらに、SVGフィルターをCSSを利用して適用することで「線と塗りでフィルターを使い分ける」「特定の要素だけに適用するフィルターを作る」といった調整も簡単です。

次の例はぼかしのSVGフィルターを作成し、これをLottieの生成したSVGの塗り要素だけに適用する例です（※ 線と塗りはAfter Effects上で別の要素として作成しておく必要があります）。

▼ ぼかしのSVGフィルターを定義

```
<svg id="defs">
  <defs>
    <filter id="blurFilter" filterUnits="userSpaceOnUse">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
    </filter>
  </defs>
</svg>

<!-- Lottieアニメーションを再生する空要素 -->
<div id="lottieView"></div>
```

▼ CSSで塗り（`fill`属性）を持つパス（`<path>`要素）だけにフィルターを適用

```
#lottieView path[fill] {
  filter: url("#blurFilter");
}
```

▼ 実行結果：Lottieアニメーションの塗りだけをSVGフィルターでぼかす例

![Lottieアニメーションの塗りだけをSVGフィルターでぼかす例](https://ics.media/entry/230119/images/230119_svg01.gif)

#### 実装例：線のSVGフィルターを作成する

このアプローチで、まずは線をゆらすSVGフィルターを作成します。[『君は使い分けられるか？　CSS/SVG/Canvasのビジュアル表現でできること・できないこと』](https://ics.media/entry/200520/)でも紹介している通り、画像をゆらゆらと揺らすエフェクト自体はノイズを使用すれば比較的簡単です。今回は完全にランダムなノイズよりも整った揺らし方にしたかったので、ノイズとドットのパターン画像を合成して「少しラフ感のある波線」を表現しています。

▼「少しラフ感のある揺らし」を加えるSVGフィルター

```
<svg>
  <defs>
    <filter id="lineFilter" filterUnits="objectBoundingBox">
      <!-- 元絵の輝度を透過度に変更 -->
      <feColorMatrix type="luminanceToAlpha" in="SourceGraphic" />
      <!-- 透過度を二値化 -->
      <feComponentTransfer>
        <feFuncA type="linear" slope="-255" intercept="19" />
      </feComponentTransfer>
      <!-- 合成 -->
      <feComposite in="SourceGraphic" result="line" operator="in" />
      <!-- ノイズを生成する原始フィルター -->
      <feTurbulence type="turbulence" baseFrequency="0.4" numOctaves="1" seed="1" stitchTiles="stitch" result="noise" />
      <!-- ドットのテクスチャを読み込み -->
      <feImage x="0" y="0" width="15" height="15" href="/imgs/dots.png" result="txDots" />
      <!-- テクスチャをタイリング -->
      <feTile in="txDots" result="txDotTile" />
      <!-- テクスチャとノイズを合成 -->
      <feBlend in="noise" in2="txDotTile" mode="normal" result="txNoised" />
      <!-- ノイズを元に画像を歪める -->
      <feDisplacementMap in="line" in2="txNoised" xChannelSelector="R" yChannelSelector="G" scale="1.1" result="displacement" />
      <!-- 領域を拡張して線を太らせる -->
      <feMorphology operator="dilate" radius="0.18" in="displacement" result="morphology" />
    </filter>
  </defs>
</svg>
```

#### 実装例：塗りのSVGフィルターを作成する

塗りのSVGフィルターはもう少し複雑です。今回実現したい表現ではグラデーションを二値化してドットのディザーで表現する必要があります。この処理は**グラデーションの両端が何色なのか**がわかっていないとできません。やや力技になりますが、今回は**Lottieの生成したSVGからグラデーションを抽出し、グラデーションごとにSVGフィルターを動的生成する**アプローチをとります。

Lottieの生成するSVGからグラデーションを抽出するのは簡単です。グラデーションはSVGの`<defs>`要素内にまとめて定義されるので、これを`querySelectorAll()`で取り出せばOKです。今回は線形グラデーションの`<linearGradient>`のみを対象とします。

```
// Lottieの生成したSVG要素を取得
const lottieSvg = document.querySelector("#lottieView svg");
// 全ての線形グラデーションを抽出
const grads = Array.from(lottieSvg.querySelectorAll("linearGradient"));
```

グラデーションの要素（`SVGLinearGradientElement`）が取得できたら、その中を調べることで両端の色が分かります。

```
/** グラデーションの両端の色を取得する */
const getStopColors = (grad: SVGLinearGradientElement) => {
  const stops = Array.from(grad.children).filter((el) => el.tagName === "stop");
  const color1 = stops[0].getAttribute("stop-color");
  const color2 = stops[stops.length - 1].getAttribute("stop-color");
  return [color1, color2];
}
```

グラデーションの色がわかったら、元のグラデーションの色は邪魔なので、これをすべて白から黒のグラデーションに置換します。その上で、「**白黒から元の色に戻しつつ、ざらざらにするフィルター**」を定義・適用します。

以下は赤から青のグラデーション用のフィルター例です。**グラデーションの数だけこのフィルターを生成**し、SVGに差し込みます。

▼ 白から黒のグラデーションを赤と青のディザーに置き換えるSVGフィルターの実装例

```
<!-- 色1(c1)=#ff0000、色2(c2)=#0000ff の場合のフィルター  -->
<filter>
  <!-- 色1の塗りつぶし -->
  <feFlood flood-color="#ff0000" result="c1fill" />
  <!-- 色2の塗りつぶし -->
  <feFlood flood-color="#0000ff" result="c2fill" />
  <!-- 元画像で切り抜いて色1のベタを作る -->
  <feComposite in="c1fill" in2="SourceGraphic" operator="in" result="c1" />

  <!-- ベースのノイズを生成 -->
  <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="2" />
  <!-- モノクロ化 -->
  <feColorMatrix type="saturate" values="0" />
  <!-- モノクロ→アルファ -->
  <feColorMatrix type="luminanceToAlpha" />
  <!-- コントラスト調整 -->
  <feComponentTransfer in="noiseMask" result="noise">
    <feFuncA type="linear" intercept="-0.1" slope="1.18" />
  </feComponentTransfer>

  <!-- 元画像の明るさ（白黒グラデーション）マスクに変換 -->
  <feColorMatrix type="luminanceToAlpha" in="SourceGraphic" />
    <feComponentTransfer>
    <feFuncA type="linear" intercept="0.35" slope="1.2" />
  </feComponentTransfer>
  <!-- マスクをノイズで切り抜き -->
  <feComposite in2="noise" operator="in" />
  <!-- モノクロ二値化 -->
  <feComponentTransfer>
    <feFuncA type="linear" intercept="0.499" slope="0.01" />
  </feComponentTransfer>
  <feComponentTransfer result="noiseClip">
    <feFuncA type="discrete" tableValues="0,1" />
  </feComponentTransfer> 

  <!-- 色2のベタをノイズで切り抜き -->
  <feComposite in="c2fill" in2="noiseClip" operator="in" result="c2noise" />   
  <!-- 色1のベタをの上に重ねて完成 -->
  <feComposite in="c2noise" in2="c1" operator="over" />
</filter>
```

このフィルターも線と同様にCSSから適用します。ただしこちらは動的に挿入する必要があるため、JavaScriptからスタイルシートを追加します。

▼ スタイルを動的に追加して、特定のグラデーションの塗りを持つ要素にフィルターを当てる

```
const insertStyleRule = (rule: string) => {
  const style = document.createElement('style');
  document.head.appendChild(style);
  const sheet = style.sheet;
  sheet?.insertRule(rule);
}

insertStyleRule(
  `svg *[fill="url(#${grad.id})"] {
    filter: url(#${filter.id});
  }`
);
```

▼ 塗りと線にSVGフィルターを適用した結果

![](https://ics.media/entry/230119/images/230119_svg02.gif)

### アプローチ2：Lottieの出力をWebGL（フラグメントシェーダー）で加工する

今回検証したもうひとつのアプローチがWebGLの利用です。**実はLottieはSVGだけでなくCanvasへ出力することもできます**。これをWebGL（フラグメントシェーダー）で加工することで、GPUを活用したハイパフォーマンスなエフェクトを実装できる場合があります。ただし、**パスやレイヤーの構造を持つSVGと異なり、Canvasの出力はただの絵です。線やグラデーションなど、必要な部分に必要な効果を適用するための工夫が必要**になります。

WebGLのフラグメントシェーダーで画像を加工する方法は、[WebGLのシェーダーGLSLでの画像処理の作り方（モノクロ、セピア、モザイク、渦巻き）](https://ics.media/entry/5535/)で解説していますので、基礎から詳しく知りたい方はご参照ください。

#### 実装例：Lottieの出力をPixiJSのテクスチャーとして取得する

Canvasの画像にフィルターを当てること自体はさほど難しくないので、とくにライブラリは使用しなくても構いません。しかし、実際の案件ではThree.jsやPixiJSといった3D/2D描画のライブラリを組み合わせることが多いでしょう。今回はサイト全体でPixiJSを採用する方針だったので、Lottieの出力をCanvasを経由してPixiJSの動的テクスチャーとして取り込みます。

▼ LottieのアニメーションをPixiJSのテクスチャーとして読み込む

```
import * as PIXI from "pixi.js";
import Lottie, { AnimationConfigWithData } from "lottie-web";

/** LottieのJSONを再生してアニメーションのインスタンスとCanvasを返します */
const load = (animData: string) => {
  const tempView = document.createElement("div");
  document.body.append(tempView);
  const animation = Lottie.loadAnimation({
    container: tempView,
    renderer: "canvas", // 描画方法に""canvas"を指定
    loop: true,
    autoplay: true,
    animationData: JSON.parse(animData),
  });

  const canvas = view.querySelector("canvas");
  if (!canvas) return;
  return { animation, canvas };
};

/** LottieのJSONを再生し、Pixiのテクスチャーとして返します */
export const loadAnimationAsTexture = (jsonContent: string) => {
  // lottieのJSONをCanvasに再生する
  const { animation, canvas } = load(jsonContent);
  // CanvasからPixiのテクスチャーを生成
  const texture = PIXI.Texture.from(canvas, {
    scaleMode: PIXI.SCALE_MODES.NEAREST,
  });
  // Lottie側のアニメーションが進むごとにテクスチャを更新する
  animation.addEventListener("enterFrame", () => {
    texture.update();
  });

  return texture;
};
```

#### 実装例：塗りのフラグメントシェーダーを実装する

アニメーションをテクスチャーとして取り込むことができたので、これをPixiJSのカスタムフィルター（フラグメントシェーダー）で加工します。シェーダーの実装をすべて紹介しているととても長くなってしまうので、ここでは単純化した例として、赤から青のグラデーションをざらざらのテクスチャで二値化するシェーダーを紹介します。フラグメントシェーダーは「GLSL」(OpenGL Shading Language)という専用の言語を使って実装します。

![グラデーションをテクスチャとシェーダーで二値化する](https://ics.media/entry/230119/images/230119_webgl01.gif)

▼ 赤から青のグラデーションを二値化するシェーダーの例

```
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 uSize;
uniform float uScale;
// ドット柄のテクスチャ
uniform sampler2D uPaper;

// 色の定義 //
vec3 RED = vec3(1.0, 0.0, 0.0);
vec3 BLUE = vec3(0.0, 0.0, 1.0);

/* フィルタのメイン処理 */
void main(void) {
  // 入力ピクセルの色
  vec4 c = texture2D(uSampler, vTextureCoord);
  // 座標に対応するドットテクスチャの明るさ
  float texVal = texture2D(uPaper, fract(vTextureCoord * uSize / uScale / 128.)).r;
  // ドットテクスチャで二値化+ディザリング
  vec3 gradColor = c.r > texVal ? RED : BLUE;
  // 線部分か？
  bool isStroke = c.r == c.b;
  // 線部分なら入力色そのまま、線以外なら二値化したグラデーションの色（赤or青）
  gl_FragColor = isStroke ? c : vec4(gradColor, 1.0);
}
```

テクスチャーやノイズの設定を調整することで、粒子の形状や大きさ等をコントロールできます。

#### 課題：複数のグラデーションを区別して一度にシェーダーを適用する

実際のイラストではSVGフィルターの場合と同様、複数のグラデーションに対応しなくてはなりません。**SVGの場合と異なり、Canvasに出力した画像はただの一枚絵なので、要素ごとに違うシェーダーを当てることは困難です**。Lottieアニメーションをグラデーションごとに分割することも検討しましたが、数十枚のアニメーションを同時に再生して、それぞれにシェーダーを適用していては、十分なパフォーマンスは期待できません。

そこで今回は、次のアプローチですべてのグラデーションをひとつのシェーダーで処理する方法を実装しました

1.  LottieのJSONデータを解析して含まれるグラデーションを抽出する
2.  すべてのグラデーションを**色空間上で交差しない別なグラデーションに置換**（図では赤緑平面上に再配置）し、元のグラデーションの対応表を保持する
3.  シェーダー内で、処理対象のピクセルの色が**どのグラデーションに含まれるのか**と**グラデーション内のどの位置なのか**を算出（「橙〜黄のグラデーションの30%地点」など）
4.  算出した元のグラデーションの2色と位置を使って、前述の二値化を行う

![グラデーションを置換してシェーダー上で復元する](https://ics.media/entry/230119/images/230119_replace_grad.png)

実際には1〜2の処理は事前に計算可能なので、ビルド時に実行して必要な対応表やロジックを埋め込んだシェーダーを生成します。

LottieのJSON仕様はわかりやすいドキュメントとして公開されていないので、正確な解析が必要な場合[ソースコードのJSONスキーマ](https://github.com/airbnb/lottie-web/tree/master/docs/json)を参照する必要があります。とはいえ、今回のようなケースでは必要な部分はごく一部なので、実際のデータを見ながら必要箇所を抜き出していくだけでも十分でしょう。

構造の当たりがついたら、`jsonpath`等のライブラリを使ってグラデーションやベタ塗りの色を抽出します。

```
import jp from "jsonpath";

// グラデーションとベタ塗りのJSONPath
const GRAD_PATH = "assets[*].layers[*].shapes[*].it[*].g.k.k";
const GRAD_PATH2 = "layers[*].shapes[*].it[*].g.k.k";
const FLAT_COLOR_PATH = "assets[*].layers[*].shapes[*].it[*].c.k";
const FLAT_COLOR_PATH2 = "assets[*].layers[*].shapes[*].it[*].c.k[*].s";

// JSONをテキストとして読み込み
const resp = await fetch(lottieJsonPath);
const json = await resp.text();

// グラデーションを取得
const grads = [...jp.nodes(json, GRAD_PATH), ...jp.nodes(json, GRAD_PATH2)];
// ベタ塗りを取得
const flatColors = uniqColors(
  [...jp.nodes(json, FLAT_COLOR_PATH), ...jp.nodes(json, FLAT_COLOR_PATH2)]);
```

アニメーション制作とフロントの実装は同時並行で、どちらもリリースぎりぎりまでブラッシュアップを続けました。**アニメーションが更新されたらすぐに対応できるよう、処理を自動化してビルドに組み込んでおくことはとても大切です**。

下図はできあがったシェーダーを適用した結果です。アプローチや技術は大きく異なりますが、SVGの場合と同じような表現を実現できていることがわかります。

![完成形のシェーダーを適用したアニメーション](https://ics.media/entry/230119/images/230119_webgl02.gif)

### 2つのアプローチの比較と評価

2つのアプローチを実際に試すことで、SVGとWebGLのどちらでも目指す表現が実現できるとわかりました。最終的な選定は、今回のプロジェクトのサポート環境やパフォーマンス等の要件を踏まえて決定します。

▼ 両方のアプローチのメリット・デメリット

![SVGは高い機能と手軽さ、WebGLは高いパフォーマンスと自由度がポイント](https://ics.media/entry/230119/images/230119_proscons.png)

SVG方式のメリット

-   アニメーションのレイヤー構造を維持したまま加工できる
-   さまざまな画面サイズへの対応が簡単
-   フィルターの実装が比較的容易

SVG方式のデメリット

-   要素数が多くなると比例して重くなる
-   定義済みの原始フィルターを組み合わせた表現しかできないので、自由度が低い
-   環境によってバグや実装の差異が多い

WebGL方式のメリット

-   正しく実装すればパフォーマンスが非常に高い
-   シェーダーを自作すれば自由度の高い表現ができる
-   ブラウザーや端末の差異が比較的少なく、トラブルが起こりにくい

WebGL方式のデメリット

-   レイヤー構造が失われるため、的を絞った効果の適用が難しい
-   シェーダー実装の難易度が高い

今回は比較的**パフォーマンスや表示環境への要求が厳しかった（古いPC・スマートフォンでもスムーズに再生できる必要があった）こともあり、最終的にWebGL方式を採用**しました。検証としてはSVG方式の方が先行していたため、スケジュールが厳しければWebGL方式は諦めていた可能性もありましたが、十分な検証期間をとれたおかけで正しい評価・選定ができたと考えています。

「この表現ならこの方式」という**定石を押さえておくことはもちろん大切**ですが、「定石で要件を満たせるのか？」「他にもっと良い方法はないのか？」など、**定石にとどまらず最適解を探るステップも重要**です。

この記事で紹介したアプローチや考え方が、オリジナルの表現をウェブで実現したい方の参考になれば幸いです。