---
title: "君は使い分けられるか？CSS/SVG/Canvasのビジュアル表現でできること・できないこと"
source: "https://ics.media/entry/200520/"
publishedDate: "2020-05-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

2020年5月20日 公開 / [株式会社ICS 松本 ゆき](https://ics.media/entry/staff/matsumoto/)

ブラウザーで新たにインタラクションやアニメーションを作る時、皆さんはどのようにして使う技術を選んでいますか？ 使い慣れたライブラリに機能がないかドキュメントを調べてみたり、流行りのキーワードであればGoogle等で検索してみることも多いでしょう。一方、独自のビジュアル表現やアニメーションの場合、そもそも検索するキーワードがわからないことも多いのではないでしょうか？

この記事では、webのビジュアル表現・アニメーションを実現するベースの技術であるCSS・SVG・Canvas（WebGL）の3つについて、それぞれのできること・できないこと（得意・不得意）を作例とともに紹介します。

### クイズ：どうやって実現する？　webでできるさまざまな表現

下の図はこの記事で紹介する9つのサンプルを並べてみたものです。すべてのサンプルはCSS・SVG・Canvas（WebGL）のいずれかを中心に実装されています。皆さんならそれぞれをどうやって作るでしょうか？

![この記事で紹介するサンプルのキャプチャ画像](https://ics.media/entry/200520/images/200520_demo_all.webp)

もちろん、プロダクト全体の技術選定に関わる要件は複雑で、答えは1つではありません。あえて技術的には難度が高かったり性能リスクがあったりするような選択をする場面もあるでしょう。しかし、ベースとなる技術の勘所をおさえておくことで、手戻りリスクや性能問題を最大限回避することができるはずです。

### webのビジュアル表現で使える3つの要素技術

今日のwebブラウザーでビジュアル表現やアニメーションを実現する基本の技術がCSS・SVG・Canvas（WebGL）の3つです。以前の記事[『CSS・SVGとVue.jsでのアニメーション作成入門　ライブラリに頼らない表現力を身に付けよう』](https://ics.media/entry/200225/)の冒頭でも紹介しているように、この3つの技術は大まかに **「htmlと親和性が高く簡単に使えるCSS」「パスや図形描画に秀でたSVG」「GPUを使った高速なピクセル演算が特徴のCanvas（WebGL）」** と特徴づけることができます。しかし実際には、この3つのどれを使っても実現できそうであったり、どれに当てはまるのか判断に悩む場面も少なくありません。

次の章からはより具体的に「変形のアニメーション」「移動のアニメーション」「エフェクト表現」の3つに分けて、「どれでもできるものはよりシンプルに」「特定の技術でないとできないものはしっかり見極めて」実装するポイントをみていきます。

※この記事で紹介しているデモは記事公開時のChrome/Safari/Firefoxの最新版で動作を確認しています。IE/Edgeでは動作しないものもありますのでご了承ください。

### part1: 変形のアニメーション

最初に取り上げるのは要素を変形させるアニメーション表現です。今回はお題として、ちょっとなつかしいフラワーロックのようなアニメーションを作ってみました。まずはこの3つでCSS・SVG・Canvas（WebGL）の違いを理解していきましょう。

#### 直線的な変形だけならCSSでOK

1つ目の例はCSSだけでアニメーションを作っています。これで十分なケースも多いかもしれませんが、踊る花のアニメーションとしては、ちょっと直線的すぎると感じるかもしれません。

![デモ1:CSSによる変形](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_demo1.webp)

-   [デモを別画面で表示](https://ics-creative.github.io/200520_features_css_svg_canvas/transform1.html)
-   [デモのソースコードを表示](https://github.com/ics-creative/200520_features_css_svg_canvas/blob/master/transform1.html)

実は、CSSでできる変形の操作はScale（縦横のサイズ変更）とSkew（スキュー = 斜めに歪める変形）の2つしかありません。これと3Dの回転（transform3d）を組み合わせても、実現できる表現は下の図の3種類です。**まっすぐのものを曲げる」表現は基本的にはCSSではできない**、と覚えておきましょう。

![CSSでできる基本の変形の説明図](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_fig1.png)

複雑なことができない代わり、CSSによる変形はとても簡単に実装できます。CSS transition/animationによる`transform`プロパティのアニメーションはGPUで処理されるため、低負荷で滑らかなアニメーションを実現できるのもポイントです。

▼ 茎を伸び縮みさせながら左右に振るアニメーション

```
.stem {
  transform-origin: center bottom;
  animation: shake 2s infinite;
} 
@keyframes shake {
  0% { transform: scaleY(1.0) rotate(15deg); }
  25% { transform: scaleY(0.8) rotate(0deg); }
  50% { transform: scaleY(1.0) rotate(15deg); }
  75% { transform: scaleY(0.8) rotate(0deg); }
  100% { transform: scaleY(1.0) rotate(15deg); }
}
```

また、簡単な変形しかできないからと言って良いアニメーションが作れないわけではありません。[『あえてズレを入れるのがミソ！ウェブのアニメーションを「いい感じ」に魅せるズルいテクニック』](https://ics.media/entry/14346/)でも紹介しているように、基本の変形操作でも工夫次第でリッチな表現になることも覚えておきましょう。

#### 曲がったパスならSVGを使おう

2つ目のサンプルはSVGで実装しています。最初のサンプルと似ていますが、こちらは茎の部分が滑らかな曲線になっているのがポイントです。このように **滑らかな曲線（ベジェ曲線）を変形させたいと思ったらSVG** の出番です。

![デモ2:SVGによる変形](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_demo2.webp)

-   [デモを別画面で表示](https://ics-creative.github.io/200520_features_css_svg_canvas/transform2.html)
-   [デモのソースコードを表示](https://github.com/ics-creative/200520_features_css_svg_canvas/blob/master/transform2.html)

下のSVGは茎のアニメーション部分のコードです。アンカーポイントが2つだけのごくシンプルなベジェ曲線ですが、CSSでアニメーションするのと比べるとかなり複雑に見えるのではないでしょうか？

```
<path d="M0,400 C60,350 0,250 -30,200" stroke="#534741" stroke-width="3" fill="none">
  <animate
    attributeName="d"
    begin="0s"
    values="
      M0,400 C60,350 0,250 -30,200;
      M0,400 C-30,350 30,300 0,250;
      M0,400 C0,350 0,250 30,200;
      M0,400 C30,350 -30,200 0,150;
      M0,400 C60,350 0,250 -30,200"
    repeatCount="indefinite"
    dur="1.5s"
    calcMode="spline"
    fill="freeze"
    keyTimes="0;0.25;0.5;0.75;1"
    keySplines="
      0.0 0.5 0.5 1.0;
      0.5 0.0 1.0 0.5;
      0.0 0.5 0.5 1.0;
      0.5 0.0 1.0 0.5"
  />
</path>
```

現実的には複雑なベジェ曲線を手書きするのは難しいので、Adobe Illustratorのようなグラフィックツールや[Adobe Animate](https://www.adobe.com/jp/products/animate.html)・[svgator](https://www.svgator.com/)のようなオーサリングツールを使うと良いでしょう。（ただし、ツールの機能によっては、1コマごとにパスをすべて書き換える非効率なコードを生成するものもあります。事前に検証してから利用することをオススメします）

また、今回のサンプルでは茎の両端についている葉っぱと猫の部分をSVG Marker（参考：[svg要素の基本的な使い方まとめ](http://defghi1977.html.xdomain.jp/tech/svgMemo/svgMemo_07.htm)）で実装してみました。

Markerは少々癖のある機能ですが、パス先端部の向きに合わせて自動的に要素を回転させてくれるので、パスの変形と組み合わせて利用すると便利なケースもあるでしょう。

#### グラフィック全体を曲げたかったらCanvas

3つ目のサンプルはCanvas（WebGL）です。1・2つ目と異なり、猫のグラフィック全体がぐんにゃりと曲がっていることがわかります。このように **ピクセルを操作して要素全体を変形させたい時はCanvas（WebGL）** を使いましょう。

![デモ3:Canvas（WebGL）による変形](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_demo3.webp)

-   [デモを別画面で表示](https://ics-creative.github.io/200520_features_css_svg_canvas/transform3.html)
-   [デモのソースコードを表示](https://github.com/ics-creative/200520_features_css_svg_canvas/blob/master/transform3.html)

Canvas（WebGL）を使うコードを手書きするのは大変なので、今回はライブラリとして[PixiJS](https://www.pixijs.com/)を利用しています。 なお、この記事ではライブラリを使用することでCanvas APIやWebGLを直接操作することなくサンプルを作成していますが、より高度な表現を作るにはこの2つの使い分けも必要です。詳細は以前の記事[『HTML5 CanvasとWebGLの使い分け―CreateJS勉強会/池田発表資料 （前編）』](https://ics.media/entry/5140/)も参照してください。

▼ PixiJSを使って猫のキャラクター全体を歪めるアニメーションのコード

```
// PixiJSのキャンバスを生成
const app = new PIXI.Application({ /* ...省略... */ })
document.getElementById("stage").appendChild(app.view)

// PIXI.SimpleRopeを使って変形のためのメッシュを生成
const catLength = 500
const pointCount = 20
const points = Array(pointCount)
  .fill(0)
  .map((_, index) => new PIXI.Point(catLength * (index / (pointCount - 1)), 0))
const cat = new PIXI.SimpleRope(PIXI.Texture.from("./imgs/longcat.png"), points)
cat.scale.set(0.5)
cat.x = 300
cat.y = 380
app.stage.addChild(cat)

// メッシュのポイントをSin波でフレームごとに動かして変形
app.ticker.add(() => {
  const time = performance.now() / 1000
  points.forEach((p, index) => {
    const xr = index / (pointCount - 1)
    p.y = xr * 50 * Math.sin((time * 5 + xr * 4))
    p.x = (1 + Math.sin(time * 2.5) * 0.2) * (xr * catLength)
  })
  cat.angle = -90 + Math.sin(time * 5) * 20
})
```

JavaScriptを書かないといけないのでCSSやSVGに比べれば複雑に見えるかもしれません。それでもPixiJSであれば`SimpleRope`や`Mesh`といった複雑な変形を簡単に行うためのクラスが用意されているので、これらをうまく使えば実装自体はさほど難しくありません。

なお、SVGを利用するライブラリやオーサリングツールでもグラフィック全体を変形する機能をもつものもあります。ただしSVGで図形全体を変形させるには、構成するすべてのパスの座標を再計算する必要があり、ポイントの数によってかなり負荷の高い処理になります。今回のようにキャラクター全体を変形させたい場合はWebGL（の機能を利用するライブラリ）を利用するほうが良いパフォーマンスを得られるケースが多いでしょう。

#### 「変形のアニメーション」まとめ

-   直線的な変形で表現できるなら → CSS
-   ベジェ曲線でパスを曲げたいなら → SVG
-   複雑な図形や画像を曲げたいなら → Canvas（WebGL）

### part2: 移動のアニメーション

変形の次は何かを動かす表現をみていきましょう。サンプルでは猫を飛ばすアニメーションを3つ、作ってみました。

#### 回転と直線移動の組み合わせならCSS

1つ目のサンプルはCSSのみでアニメーションしたものです。 星がくるくる回ったり、壁に当たってふんわりと跳ね返る猫の表現も、すべてJavaScriptを使わずにCSSのみで表現しています。

![デモ4:CSSによる移動](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_demo4.webp)

-   [デモを別画面で表示](https://ics-creative.github.io/200520_features_css_svg_canvas/move1.html)
-   [デモのソースコードを表示](https://github.com/ics-creative/200520_features_css_svg_canvas/blob/master/move1.html)

変形の場合と同様、CSSによる移動は単純な機能しか用意されていません。**CSSでできるのは水平・垂直の直線移動と、円周移動** です。円周移動は正確には移動ではないのですが、中心点（`transform-origin`）をずらして要素を回転することで円周上を移動しているように見せることができるので、移動操作のひとつとして覚えておきましょう。

![CSSでできる基本の移動の説明図](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_fig2.png)

できることはシンプルですが、移動する要素を入れ子にすることで一見するとCSSだけとは思えないような複雑な動きも作り出すことができます。

![CSSでできる移動の応用説明図](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_fig3.png)

次のコードは壁で跳ね返る猫部分のhtmlとcssです。垂直移動用の要素（`cat_v`）と水平移動用の要素（`cat_h`）を入れ子にして、それぞれを異なる周期で動かします。単純な移動の組み合わせで自由に飛び回って跳ね返るアニメーションを実現できることがわかると思います。

```
<div class="cat_v">
  <div class="cat_h">
    <div class="cat"></div>
  </div>
</div>
```

```
.cat_v {
  animation: 2s ease-in-out infinite alternate-reverse fly_v;
}
.cat_h {
  animation: 3.3s ease-in-out infinite alternate-reverse fly_h;
}
/* 垂直移動のアニメーション */
@keyframes fly_v {
  from { transform: translateY(10px); }
  to { transform: translateY(320px); }
}
/* 水平移動のアニメーション */
@keyframes fly_h {
  from { transform: translateX(10px); }
  to { transform: translateX(420px); }
}
```

#### パスに沿って動かしたいならSVG

変形と同様、曲線を扱う時はSVGの出番です。SVGの`animateMotion`を使うと自由なパスに沿って他の要素を移動させることができます。

![デモ5:SVGによる移動](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_demo5.webp)

-   [デモを別画面で表示](https://ics-creative.github.io/200520_features_css_svg_canvas/move2.html)
-   [デモのソースコードを表示](https://github.com/ics-creative/200520_features_css_svg_canvas/blob/master/move2.html)

次のコードは`animateMotion`を使って凹凸にあわせて猫を動かしている部分です。基準となるパスは`animateMotion`要素の外側の任意の`path`要素を指定できるので、Illustrator等から出力した複雑で長いパスを使ってモーションを作る場合でも、アニメーション部分はシンプルに記述できます。

```
<!-- アニメーションの基準になるパス（今回は表示していますが、非表示のパスでも構いません） -->
<path id="flypath" stroke="#534741" stroke-width="2" stroke-dasharray="3 1 1" fill="none" d="M431.87,..（略）..4.15Z" />

<!-- パスに沿って動かす要素。mpathのhrefで基準にするパスのidを指定します -->
<g>
  <image href="imgs/boxcat_side.svg" width="160" height="80" transform="translate(-80 -40)" />
  <animateMotion begin="0s" dur="15s" repeatCount="indefinite" rotate="auto">
    <mpath href="#flypath"/>
  </animateMotion>
</g>
```

#### 移動前の描画結果を使いたいならCanvas

3つ目のサンプルはCanvas（WebGL）を使ったものです。1・2つ目と違い、移動した後の残像が残るようにしています。

![デモ6:Canvas（WebGL）による移動](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_demo6.webp)

-   [デモを別画面で表示](https://ics-creative.github.io/200520_features_css_svg_canvas/move3.html)
-   [デモのソースコードを表示](https://github.com/ics-creative/200520_features_css_svg_canvas/blob/master/move3.html)

実は、何かを移動させるだけであればCSSとSVGでほとんどのことはできてしまいます。動き自体が複雑でもCSSやSVGにJavaScriptを組み合わせれば、Canvasの出番はあまりないでしょう。CSSとSVGでどうやっても真似できないのは、このサンプルのように「前回の画面描画結果使って何かをしたい」という時です。

下のコードはサンプルから残像の表示に関連する部分を抜粋したものです。フレームごとに「前回の描画結果」を画像として取得し、ぼかしをかけて重ねていくことで滑らかな残像を作り出しています。

```
  // PixiJSのステージを生成
  const app = new PIXI.Application({ /* ... 省略 ... */ })

  // 前回の描画結果を表示するためのSpriteを生成してステージに追加
  // ブラーをかけて透明度を下げる
  const lastFrame = new PIXI.Sprite()
  const blurFilter = new PIXI.filters.BlurFilter(1.0)
  lastFrame.filters = [blurFilter]
  lastFrame.alpha = 0.85
  app.stage.addChild(lastFrame)

  // 猫画像を読み込んでステージに追加
  // ... 省略 ...

  app.ticker.add(() => {
    // 前回の描画結果を画像として取り込む
    lastFrame.texture = app.renderer.generateTexture(
      app.stage,
      PIXI.SCALE_MODES.NEAREST,
      1,
      new PIXI.Rectangle(0, 0, stageSize.x, stageSize.y)
    )
    // 猫を動かす。回転させながら、壁に当たったら適当に跳ね返るようにする
    // 省略 ...
  })
```

「ちょっと動きに残像を付けたい」という要求は往々にして発生しますが、これだけで実装に使える技術が変わってきてしまうので要注意です。

#### 「移動のアニメーション」まとめ

-   直線移動・円周移動の組み合わせなら → CSS  
    （もっと複雑な動きが必要ならJavaScriptを組み合わせる）
-   自由なパス（ベジェ曲線）に沿って動かしたいなら → SVG
-   移動の軌跡を描く等、前フレームの描画結果を使いたいなら → Canvas（WebGL）

### part3: エフェクト表現

最後の章ではCSS・SVG・Canvas（WebGL）で使えるエフェクトについてみていきましょう。3つの技術はそれぞれにフィルターの機能を持っていますが、できることや使い方はちょっとずつ違っています。

#### 色を変えるだけならCSSで

1つ目の例は猫が虹色に発光しているエフェクトです。CSSでは`filter`プロパティを使って簡単にフィルター効果を当てることができます。

![デモ7:CSSによるエフェクト](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_demo7.webp)

-   [デモを別画面で表示](https://ics-creative.github.io/200520_features_css_svg_canvas/effect1.html)
-   [デモのソースコードを表示](https://github.com/ics-creative/200520_features_css_svg_canvas/blob/master/effect1.html)

CSSのフィルターは以下の10種類だけです。どんなことができるのか一度すべて見ておくと良いでしょう

![CSSで適用できる標準フィルターの一覧](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_fig4.png)

CSSフィルターについては活用例も含めて過去の記事[『CSS Filtersはトランジションで使うのがお勧め！手軽に実装するいい感じのマウスオーバー演出』](https://ics.media/entry/15393/)でも解説しています。

今回のサンプルでは`hue-rotate`を使って虹色のアニメーションを、`blur`と`brightness`を使って呼吸するようなアニメーションを実現しています。

```
<div class="cats">
  <!-- 2匹の猫を重ねて表示する -->
  <div class="boxcat cat1"></div>
  <div class="boxcat cat2"></div>
</div>
```

```
.boxcat { /* 省略 */ }
/* 2匹の猫全体に虹色のフィルターを適用 */
.cats {
  position: absolute;
  top: 100px;
  left: 200px;
  animation: 2s ease-in-out infinite party;
}
@keyframes party {
  to { filter: hue-rotate(360deg); }  
}

/* 手前の猫にブラーフィルターを適用し、乗算で合成 */
.cat2 {
  mix-blend-mode: multiply;
  animation: 2s ease-in-out alternate-reverse infinite beat;
}
@keyframes beat {
  from {
    filter: blur(5px) brightness(1.0);
  }
  to {
    transform: scale(1.2);
    filter: blur(30px) brightness(1.6);
  }
}
```

フィルターを複数適用したり、`mix-blend-mode`で合成したりすることで、単純なフィルターでも複雑なアニメーション効果を作れることがわかると思います。

ただし、CSSフィルターでは決してできない表現があることも覚えておきましょう。 10種類あるCSSフィルターですが、`blur` と`drop-shadow`を除いた8種類は単純にピクセルの色を一律の計算式で変えるだけのものです。したがって、**周囲のピクセルの色や画像全体の状態によって変化する表現をCSSフィルターの組み合わせだけで作るのは難しい** でしょう。

### CSSで足りないエフェクトはSVGを検討

2つ目のサンプルはSVGを使って猫に手書きアニメ風のフィルターを適用したものです。SVGのフィルターを使うとCSSだけでは実現できない複雑なエフェクトを実現できます。

![デモ8:SVGによるエフェクト](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_demo8.webp)

-   [デモを別画面で表示](https://ics-creative.github.io/200520_features_css_svg_canvas/effect2.html)
-   [デモのソースコードを表示](https://github.com/ics-creative/200520_features_css_svg_canvas/blob/master/effect2.html)

CSSのフィルターと異なり、SVGではノイズを生成する`feTurbulence`や3Dで使われるようなBumpMap（バンプマップ = 凹凸を表現するためのテクスチャー画像）を使った照明効果を適用する`feDiffuseLighting`といった、複雑なフィルター効果を利用できます。

さらにSVGではこれらの**ベースとなるフィルター（原始フィルター）の入出力をつないで、独自のフィルターを作ることができる**のも特徴です。今回のサンプルでは、元となるノイズを`feTurbulence`で生成し、その出力を使って`feDisplacementMap`でピクセルの位置をずらすことで、手書き風効果を実現しています。

![SVGフィルターが原始フィルターの組み合わせで作られることの説明](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_fig5.png)

▼ サンプルでフィルターの定義をしているのは以下の部分です

```
<!-- 手描き感のあるラフな表現を加えるフィルターの定義 -->
<filter id="roughFilter" filterUnits="objectBoundingBox" x="0" y="0" width="100%" height="100%">
  <!-- ノイズを生成する原始フィルター -->
  <feTurbulence type="turbulence" baseFrequency="0.001 0.01" numOctaves="5" seed="1" stitchTiles="stitch">
    <!-- ノイズのシードをアニメーションで変化させる -->
    <animate
      attributeName="seed"
      from="1"
      to="100"
      dur="10s"
      repeatCount="indefinite"
    />
  </feTurbulence>
  <!-- ノイズを元に画像を歪める -->
  <feDisplacementMap in="SourceGraphic" scale="10"/>
</filter>
```

ちょっと複雑ですが、フィルターは一度作ってしまえばとても簡単に適用できるので、使い回しも容易です。

```
<!-- 定義したフィルターを適用 -->
<image href="imgs/boxcat_front.svg" filter="url(#roughFilter)" width="200" height="200" />
```

さらに、こうして作ったSVGのフィルターはCSSでも利用できます。

```
/* 定義したSVGフィルターをCSSでhtml要素に適用 */
div {
  filter: url(#roughFilter);
}
```

SVGのフィルターは仕様も複雑でブラウザー間の互換性も十分とは言えない部分はありますが、CSSのフィルターで足りない表現力を補えるので、いざというときは活用できるよう覚えておきましょう。

#### もっと高い自由度が欲しいならCanvas

前節の通り、SVGフィルターを使うとかなり複雑な表現も作り込むことができます。もしそれでも足りないと思ったらCanvas（WebGL）で自由なエフェクトを作るのも良いでしょう。最後のサンプルはCanvas（WebGL）で画像をアスキーアートに変換するフィルターを適用したものです。このようなちょっと特殊な効果でもCanvas（WebGL）なら実現可能です。

![デモ9:Canvas（WebGL）によるエフェクト](https://ics.media/entry/200520/images/images/200520_features_css_svg_canvas_demo9.webp)

-   [デモを別画面で表示](https://ics-creative.github.io/200520_features_css_svg_canvas/effect3.html)
-   [デモのソースコードを表示](https://github.com/ics-creative/200520_features_css_svg_canvas/blob/master/effect3.html)

今回のサンプルのソースコードを示します。この例でもPixiJSを利用しています。 用意されたフィルターを使うだけであれば、とても簡単にエフェクトを追加できることがわかると思います。

```
// PixiJSのステージを作る
const app = new PIXI.Application({ /* ... 略 ... */ })
document.getElementById("stage").appendChild(app.view)

// 猫画像を読み込み
const cat = PIXI.Sprite.from("./imgs/boxcat_front.png")
cat.scale.set(3)
cat.x = 300
cat.y = 200
cat.anchor.set(0.5, 0.5)

// アスキーアートフィルターを作って適用
const asciiFilter = new PIXI.filters.AsciiFilter(7)
app.stage.filters = [asciiFilter]
app.stage.addChild(cat)

// 回転アニメーション
app.ticker.add(() => {
  const time = performance.now() / 1000
  cat.angle = time % 360 * 30
}) 
```

PixiJSではさまざまなフィルターが追加のフィルタパックとして提供されています。[効果を確認できるギャラリー](https://filters.pixijs.download/main/demo/index.html)もあるので、どんなフィルターがあるのか一度目を通しておくことをオススメします。

しかし、Canvas（WebGL）やPixiJSを使うことの強みは単にこれらのフィルターをそのまま使うことではなく、**多様なフィルターを開発者自身が作り出せること** にあります。GLSLの知識は必要になりますが、既存のフィルターにないオリジナルなエフェクトが欲しい時には選択肢として検討しても良いでしょう。

GLSLによる画像処理は以前の記事[『WebGLのシェーダーGLSLでの画像処理の作り方（モノクロ、セピア、モザイク、渦巻き）』](https://ics.media/entry/5535/)も参照してください。この記事の方法で作成したシェーダーはPixiJSの`CustomFilter`に組み込むことで、今回のサンプルと同様、簡単に利用することも可能です。

#### 「エフェクト表現」まとめ

-   色の変化とブラー・影だけで実現できるなら → CSS
-   ノイズや照明など、CSSでは足りない表現を使いたければ → SVG  
    （ブラウザーの互換性やバグに注意）
-   CSSやSVGの用意されたフィルターで満足できなければ → Canvas（WebGL）  
    （CSS・SVGと異なり、html要素には適用できないので注意）

### できること・できないことをしっかり押さえて、表現の幅を広げよう

この記事ではwebのビジュアル・アニメーション表現のベースとなるCSS・SVG・Canvas（WebGL）の3つの技術について、それぞれでできること・できないこと（得意なこと・苦手なこと）を作例とともに紹介しました。個々の表現や機能をすべてマスターする必要はありませんが、各技術でどんなことができるのか・できないのかの勘所をつかんでおことは、表現の幅を広げるためにきっと役立ちます。

この記事で概観をつかんだら、ぜひ末尾の関連記事も参考に、それぞれの技術や表現をもっと深く追求してみてください。