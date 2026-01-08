---
title: "CSS・SVGとVue.jsでのアニメーション作成入門 - ライブラリに頼らない表現力を身に付けよう"
source: "https://ics.media/entry/200225/"
publishedDate: "2020-02-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

WebサイトやWebアプリでアニメーションを使うことは、もはや当たり前になりつつあります。 アニメーションの用途も全画面を使ったゲームや背景ビジュアルからUXを向上させる指先サイズのインタラクションまで多種多様です。

さまざまな目的を簡単に実現するため、たくさんのライブラリやツールが開発されています。 一方でどのツールをどのように学んで使い分けていけばいいのか、学習や選定のコストもまた年々上がり続けています。 この記事では、巷に溢れる専用のアニメーションライブラリやツールはいったん忘れて、 CSSやSVGといった基本の技術を使ったアニメーションをVue.jsで組み立てる方法を紹介します。

↓ この記事のテクニックを使うとアニメーション用のライブラリを使わずにこんな動きも作れるようになります。 ![コンポーネントを利用したキャラクターアニメーションのデモ](https://ics.media/entry/200225/images/images/200225_vue_animation_demo_css4.webp)

アプリケーションの中にインタラクティブな要素を組み込みたいフロントエンジニアの方はもちろん、 同じ動きの繰り返しだけではない、柔軟なアニメーションを作りたいデザイナーの方もぜひご覧ください。

### 土台の技術はそれほど変わっていない

用途に応じたライブラリが増える一方で、その土台となる技術は実はそれほど変わっていません。 主な要素は「CSS Animation/Transition」「SVG Animation」「Canvas/WebGL」の3つでしょう。

CSS Animation/Transition

SVG Animation

Canvas/WebGL

強み

アニメーション以外のhtml要素との親和性が高く、画面の一部を動かしたいときに簡単に導入できる

パスやフィルター等、CSSだけで実現できない強力な図形描画機能がある

GPUを活用した高速な描画が可能。2D/3Dを問わず幅広いアニメーションを実現できる

よく使われる領域

メニューの開閉・ホバー時のエフェクト・スムーズなスクロールやリサイズなどのUIアニメーション

ラインアニメーションやモーフィング等のビジュアル表現・マイクロインタラクションなど

2D/3Dゲームやビジュアルを重視した背景エフェクト等

メジャーなライブラリ

anime.js・Animate.css・jQuery、など

Snap.svg・Lottie、など

PixiJS(2D)・p5.js(2D/3D)・three.js(3D)、など

※ CSS Animationに関しては[Web Animation API](https://developer.mozilla.org/ja/docs/Web/API/Web_Animations_API)を使うことでより簡単にJavaScriptからアニメーションを構築・制御できるようになります。2020年2月時点ではブラウザの実装が不十分でPolyfillを要するため、この記事では対象外としています。

#### 専用ライブラリを使わずにアニメーションを作ろう

各ライブラリは特別な魔法を使っているわけではありません。 原理的にはCSS・SVG・WebGLといった各要素技術をしっかりと習得すれば、専用のライブラリと同等のことができるばかりか、より高い自由度を手に入れながら軽量化を実現できる可能性もあります。 また、専用のライブラリを利用する場合にも、基礎となる原理や各技術の得意不得意を知っていることは大きな武器となるでしょう。

#### Vue.jsを使ってCSSやSVGのアニメーションを書く

とは言え、これらのアニメーションを土台の技術だけで「手書き」するのはとても難しい作業です。 初めからJavaScriptを使うことが前提のWebGLと比較して、CSSやSVGによる複雑なアニメーションの構築はさらに困難です。解決策として、この記事ではJavaScriptのフレームワークであるVue.jsの力を使い、少し楽にCSSとSVGのアニメーションを作る方法を紹介します。 （Vue.js固有のアニメーション機能は使いませんので、ReactやAngular等の他のフレームワークでも構いません）

### 実例1. CSS+Vue.jsでキャラクターアニメーション

1つ目の例としてCSS Transitionを使ったキャラクターのアニメーションの作り方を紹介します。

#### 基本の考え方：Vue+CSSで箱を動かそう

まずはシンプルな箱型のキャラをVue.jsで好きな場所に表示してみましょう。

```
<template>
  <div class="box-cat" :style="{
    transform: `translate(${x}px, 250px)`
  }" />
</template>

<script>
export default {
  data () {
    return {
      x: 300 // キャラのX座標
    }
  }
}
</script>
<style> ... </style>
```

`x`の値を変更するとキャラを任意の位置に移動できます。

![Vueの変数を使ってCSSで任意の場所に箱を置くイメージ](https://ics.media/entry/200225/images/images/200225_vue_animation_vue2css.png)

次にこの箱の位置を動的に変える機能を追加します。 コンポーネントに箱を移動させるメソッドを追加します。

```
  methods: {
    moveTo (x) {
      this.x = x
    }
  }
```

さらにCSSトランジションを追加することで、補間されてアニメーションとして表示されます。

```
.box-cat { transition: transform 500ms; }
```

このメソッドを親コンポーネントから呼び出して、クリックした位置（X座標）に移動させましょう。

![クリックした場所まで移動するアニメーションのデモ](https://ics.media/entry/200225/images/images/200225_vue_animation_demo_css1.webp)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200225_vue_animation/#demo-css-1)
-   [コンポーネントのソースコードを表示](https://github.com/ics-creative/200225_vue_animation/blob/master/src/components/BoxCat1.vue)
-   [呼び出し箇所（親コンポーネント）のソースコードを表示](https://github.com/ics-creative/200225_vue_animation/blob/master/src/App.vue#L76)

このサンプルではX座標だけを変更しましたが、Y座標や回転角（`rotate`）・サイズ（`scale`）等も変更すればさらに多様な動きを表現できます。また、トランジションの長さやイージングを変更可能にすることで動きに変化をつけることも可能です。

#### 応用： async/awaitでアニメーションをチェインする

複雑なアニメーションを組み立てるためには、複数の動きを連続して再生する仕組みが必要です。このようなアニメーションもVue.jsを使って実現できます。

例として、「クリックした場所まで横スライドしてからジャンプする」アニメーションを作っていきます。

![「クリックした場所まで横スライドしてからジャンプする」アニメーションのステップ図解](https://ics.media/entry/200225/images/images/200225_vue_animation_chainedhump.png)

まずはテンプレートで`x`, `y`座標と、トランジションの長さ（`dur`）を指定できるようにします。

```
<template>
  <div class="box-cat"
    :style="{
      transform: `translate(${x}px, ${y}px)`,
      transition: `transform ${dur}ms`
    }"
  />
</template>
```

つづいて`moveTo`メソッドを修正して3つの動きを実装します。

```
  data () {
    return {
      x: 100,
      y: 300,
      dur: 500
    }
  },
  methods: {
    /** xまで横スライドしてからyまでジャンプする（未完成） */
    moveTo (x, y) {
      const lastY = this.y // 移動前のyを覚えておく
      this.x = x // 指定された座標のxまで移動
      this.dur = 500 // 500msかけて横スライド

      // TODO: トランジションが終わるまでまつ

      this.y = y // 指定された座標のyまでジャンプ
      this.dur = 200 // 200msかけてジャンプ

      // TODO: トランジションが終わるまでまつ

      this.y = lastY // 最初のy座標に戻る
      this.dur = 200 // 200msかけて元の高さに戻る
    }
  }
```

アニメーション全体を3つのパートに分けて順番に再生しようとしていますが、各パートの終了を待たずに次を再生してしまうのでうまくいきません。適切な「待ち」を入れるために`async/await`を利用します。

```
// 指定のミリ秒待つPromiseを返す関数を用意
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
```

```
/** xまで横スライドしてからyまでジャンプする（完成版） */
async moveTo (x, y) {
  const lastY = this.y // 移動前のyを覚えておく
  this.x = x // 指定された座標のxまで移動
  this.dur = 500 // 500msかけて横スライド

  await wait(this.dur) // トランジションの時間待つ

  this.y = y // 指定された座標のyまでジャンプ
  this.dur = 200 // 200msかけてジャンプ

  await wait(this.dur) // トランジションの時間待つ

  this.y = lastY // 最初のy座標に戻る
  this.dur = 200 // 200msかけて元の高さに戻る

  await wait(this.dur) // トランジションの時間待つ
}
```

呼び出す親コンポーネント側は単純にx, y座標を渡すだけです。

```
moveCat2 (ev) {
  // クリックされた座標までスライド + ジャンプする
  this.$refs.cat2.moveTo(ev.offsetX, ev.offsetY)
}
```

また、親コンポーネント側でも`await`を使うことで、さらに複雑なアニメーションを組み立てることも可能です。

```
async moveCat2 (ev) {
  // クリックされた座標まで三段跳びでスライド + ジャンプする
  const cat = this.$refs.cat1
  const fromX = cat.x
  const fromY = cat.y
  const toX = ev.offsetX
  const toY = ev.offsetY
  // 1段目 = 20%の地点まで
  await cat.moveTo(fromX + (toX - fromX) * 0.2, fromY + (toY - fromY) * 0.2)
  // 2段目 = 50%の地点まで
  await cat.moveTo(fromX + (toX - fromX) * 0.5, fromY + (toY - fromY) * 0.5)
  // 3段目 = 100%の地点（クリックされた座標）まで
  await cat.moveTo(fromX + (toX - fromX) * 1.0, fromY + (toY - fromY) * 1.0)
}
```

![クリックした場所まで三段跳びで移動するアニメーションのデモ](https://ics.media/entry/200225/images/images/200225_vue_animation_demo_css2.webp)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200225_vue_animation/#demo-css-2)
-   [コンポーネントのソースコードを表示](https://github.com/ics-creative/200225_vue_animation/blob/master/src/components/BoxCat2.vue)
-   [呼び出し箇所のソースコードを表示](https://github.com/ics-creative/200225_vue_animation/blob/master/src/App.vue#L80)

#### 応用： コンポーネント化とネストで複雑なアニメーションを作る

さらに複雑なアニメーションを作るためには、コンポーネントによる抽象化と再利用が有効です。 基本の箱をコンポーネントとして部品化すると、次のような複雑な動きのアニメーションも見通し良く書くことができます。

![少し複雑な動きをつけたアニメーションのデモ](https://ics.media/entry/200225/images/images/200225_vue_animation_demo_css3.webp)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200225_vue_animation/#demo-css-3)
-   [コンポーネントのソースコードを表示](https://github.com/ics-creative/200225_vue_animation/blob/master/src/components/BoxCat3.vue)

下のコードは部品化したコンポーネントを使って複雑なアニメーションを記述している部分です。部品には`animTo`というメソッドを用意し、座標に加えて回転角やアニメーションの長さを指定できるようにしています。

```
await cat.animTo({ r: -10 * rotationDir }, 200) // 横移動の「溜め」
await cat.animTo({ x: x - this.size, r: 20 * rotationDir }, 500) // 横移動+回転
await cat.animTo({ r: 0 }, 100) // 回転を戻す
await cat.animTo({ y: 20, sy: 0.8 }, 300) // ジャンプの「溜め」
await cat.animTo({ y: -jumpHeight, sy: 1.2 }, 200) // ジャンプ往き+伸び
await cat.animTo({ y: 0, sy: 0.8 }, 200) // ジャンプ戻り+縮み
await cat.animTo({ sy: 1.0 }, 100) // 縮みを戻す
```

複数のパラメーターを変更した上で、アニメーションが終わるまで待機する処理を簡潔に表現できています。さらに、このようにして作ったコンポーネントを入れ子にすることで、人物のような複雑なコンポーネントを組み上げて動かすことも可能になります。

![コンポーネントを利用したキャラクターアニメーションのデモ](https://ics.media/entry/200225/images/images/200225_vue_animation_demo_css4.webp)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200225_vue_animation/#demo-css-4)
-   [コンポーネントのソースコードを表示](https://github.com/ics-creative/200225_vue_animation/blob/master/src/components/MyChara.vue)

### 実例2. SVG+Vue.jsでパスアニメーション

ここまではCSSによる要素の移動や回転といった基本的な動きを複雑に組み立てていく方法を紹介しました。後半ではSVGを使用してCSSだけでは実現できない、さらに柔軟なアニメーションを紹介します。

#### 基本の考え方：SVGでベジェ曲線を引く

SVGでは四角や丸といったさまざまな図形を書くための要素が用意されています。 その中でも、もっとも強力な要素が`<path>`です。 Illustrator等のグラフィックツールで生成したSVGファイルをエディターやブラウザの開発者ツールで表示してみると、図形が大量の`<path>`要素で表現されていることがわかります。

![Illustratorで出力したSVGをChromeの開発者ツールで表示しているところ](https://ics.media/entry/200225/images/images/200225_vue_animation_svg_illustrator.png)

この`<path>`要素の`d`属性がパスを表現する文字列です。 `d`属性の文字列を人間が読み書きするのは困難なので、Vue.jsを利用して動的に組み立てる仕組みを作ります。

まずはVue.jsのテンプレート部分に`<path>`要素をつくり、`d`属性を`pathStr`という変数（後述）に連動させます。

```
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" >
    <path :d="pathStr" stroke="#888888" stroke-width="2" fill="none" />
  </svg>
</template>
```

`pathStr`を生成するためのスクリプト部分は以下のようになります。 ランダムなY座標を格納する配列（`$data.values`）を用意し、その配列からパス文字列への変換を算出プロパティ（`$computed.pathStr`）として定義します。これにより、座標の配列を変更するだけで`d`属性の文字列も変わり、パスの形状が更新されます。

```
export default {
  data () {
    return {
      values: [] // Y座標の配列
    }
  },
  computed: {
    pathStr () {
      // 座標の配列からパスの文字列（d属性）を生成して返す関数（後述）
      return valuesToPathStr(this.values)
    }
  },
  methods: {
    next () {
      // ランダムなY座標の配列を新しく生成する関数（コードは省略）
      this.values = generateValues()
    }
  },
  mounted () {
    this.next()
    window.setInterval(this.next, 2000) // 2秒ごとに新しい座標配列を作る
  }
}
```

座標からパス文字列への変換は少しややこしいので別の関数にしました。 この例では座標の各点を結ぶ折れ線を生成しています。

```
const POINTS_COUNT = 20 // 座標点の数
const MAX_Y = 100 // 山の最大値
const WIDTH = 600　// 全体の幅
const HEIGHT = 400 // 全体の高さ

/**
 * 値配列を元にパス（折れ線）を描画するための文字列を生成して返します
 * @values {Number[]} Y座標(-1.0〜+1.0)の配列
 * @return String パス文字列
 */
const valuesToPathStr = (values) => {
  if (values.length < 2) { return 'M0,0' }
  // 画面サイズの設定に合わせて波の座標を拡大
  const points = values.map((y, x) => ({
    x: x / (POINTS_COUNT - 1) * WIDTH,
    y: y * MAX_Y + HEIGHT / 2
  }))
  const p0 = points.shift()
  // 全ての座標を折れ線で結ぶパス文字列を生成して返却
  return `M${p0.x},${p0.y} L` + points.map(p => `${p.x},${p.y}`).join(' ')
}
```

座標点の数を20に設定して実行した結果です。

![SVGのpath要素で折れ線を引くデモ](https://ics.media/entry/200225/images/images/200225_vue_animation_demo_svg1.png)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200225_vue_animation/#demo-svg-1)
-   [コンポーネントのソースコードを表示](https://github.com/ics-creative/200225_vue_animation/blob/master/src/components/SvgPath.vue)

上記の関数の最後の行で、頂点を結ぶ折れ線の文字列を生成しています。 折れ線の書式は下記の通りです。

```
M 頂点1 L 頂点2 頂点3 ...
（それぞれの点は"x,y"の形式で記述）
```

さらに、生成する文字列を少し変えると、ベジェ曲線による滑らかな曲線も表現できます。

```
const POINTS_COUNT = 20 // 座標点の数
const MAX_Y = 100 // 山の最大値
const WIDTH = 600　// 全体の幅
const HEIGHT = 400 // 全体の高さ
const EASE = 0.3 // コーナーの曲がり具合(0.0 - 0.5)

/**
 * 値配列を元にパス（ベジェ曲線）を描画するための文字列を生成して返します
 * @values {Number[]} Y座標(-1.0〜+1.0)の配列
 * @return String パス文字列
 */
const valuesToPathStr = (values) => {
  if (!values.length) { return 'M0,0' }
  const points = values.map((y, x) => ({
    x: x / (POINTS_COUNT - 1) * WIDTH,
    y: y * MAX_Y + HEIGHT / 2
  }))
  const p0 = points.shift()
  const controlX = WIDTH / (POINTS_COUNT - 1) * EASE
  // 全ての座標に制御点を追加しながら曲線（三次ベジェ曲線）を描画するための文字列を生成
  return `M${p0.x},${p0.y} S` +
    points.map(p => `${p.x - controlX},${p.y} ${p.x},${p.y}`).join(' ')
}
```

先ほどの例と同様、20個の頂点を結んだ結果です。

![SVGのpath要素でベジェ曲線を引くデモ](https://ics.media/entry/200225/images/images/200225_vue_animation_demo_svg2.png)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200225_vue_animation/#demo-svg-2)
-   [コンポーネントのソースコードを表示](https://github.com/ics-creative/200225_vue_animation/blob/master/src/components/SvgPath2.vue)

ベジェ曲線の書式は下記の通りです。

```
M 頂点1 C 制御点1b 制御点2a 頂点2 制御点2b 制御点3a 頂点3 ...
　または略式で
M 頂点1 S 制御点2a 頂点2 制御点3a 頂点3 ...
（それぞれの点は"x,y"の形式で記述）
```

少々複雑に見えますが、Illustrator等でパスを引いたことのある方であれば、下の図でイメージをつかめると思います。

![ベジェ曲線の書式の説明図](https://ics.media/entry/200225/images/images/200225_vue_animation_bezier.png)

#### 応用：JavaScriptでアニメーションさせる

ここまでできれば、アニメーションまではもう一息です。 まずはJavaScriptで直接、座標点を変更することでパスをアニメーションさせてみます。

![SVGのpath要素をJavaScriptでアニメーションさせるデモ](https://ics.media/entry/200225/images/images/200225_vue_animation_demo_svg3.webp)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200225_vue_animation/#demo-svg-3)
-   [コンポーネントのソースコードを表示](https://github.com/ics-creative/200225_vue_animation/blob/master/src/components/AnimPathJs.vue)

```
export default {
  data () {
    return {
      time: 0
    }
  },
  computed: {
    /** 時間($data.time)に連動して変わる頂点座標の配列を返す */
    values () {
      return new Array(POINTS_COUNT).fill(0).map((_, index) => {
        const x = index / POINTS_COUNT // x座標(0-1)
        const yBase = index % 2 === 0 ? 1 : -1 // y座標(-1と1を交互に設定)
        const y = Math.sin(x / WAVE_SCALE - this.time * SPEED) * yBase // sin波を掛ける
        return y
      })
    },
    pathStr () {
      return valuesToPathStr(this.values)
    }
  },
  mounted () {
    // requestAnimationFrameを使い一コマごとに時間($data.time)を更新
    const startTime = Date.now()
    const update = () => {
      this.time = Date.now() - startTime
      requestAnimationFrame(update)
    }
    update()
  }
```

`$data`にあった`values`配列を`$computed`に移動して、動的に座標を生成するようにします。 また、算出する座標を変化させるための変数として`$data.time`を追加し、この変数を`requestAnimationFrame`でフレームごとに更新します。

動的に生成する座標をsin波から他の算術関数に変えることでさまざまな表現が可能です。また、マウスやオーディオ（[MDN: Web Audio APIの利用](https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)）の入力に連動させてもおもしろいでしょう。 フレームごとにJavaScriptで座標の計算とパスの更新が行われるためパフォーマンスには注意が必要ですが、柔軟なアニメーションを簡単に組み立てられる方法です。

#### 応用：animate要素でアニメーションさせる

SVGにはJavaScriptやCSSを使わなくともSMILという言語を利用してアニメーションを表現する機能があります。 少々複雑ですが、うまく使えば一コマごとの座標計算が不要になり、パフォーマンスの向上も期待できます。（※なお、本節のコードはIE/Edgeでは動きません。ブラウザサポート等の留意点は以前の記事[「UI改善にキラリと役立つ！ SVGアニメーションの作り方まとめ」](https://ics.media/entry/15970/)の「SMILの特徴」および「Tips: SMILは廃止予定なのか？」をご参照ください）

`<animate>`要素を使って、1.5秒ごとに波形が滑らかに変わるアニメーションを作ります。

![SVGのpath要素をJavaScriptでアニメーションさせるデモ](https://ics.media/entry/200225/images/images/200225_vue_animation_demo_svg4.webp)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200225_vue_animation/#demo-svg-4)
-   [コンポーネントのソースコードを表示](https://github.com/ics-creative/200225_vue_animation/blob/master/src/components/AnimPath.vue)

まずはコンポーネントのテンプレートに`<animate>`要素を追加し、`attributeName="d"`を指定して パスの`d`属性をアニメーションさせることを宣言します。 アニメーションのゴールを指定する`to`属性はVueの`nextPathStr`変数（後述）に連動させます。

```
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" >
    <path d="M0,200 L600,200" stroke="#aaaaaa" stroke-width="1" fill="none" />
    <path :d="pathStr" stroke="#888888" stroke-width="2" fill="none">
      <animate
        ref="anim"
        attributeName="d"
        :to="nextPathStr"
        @endEvent="next"
        repeatCount="1"
        dur="1.5s"
        fill="freeze"
        calcMode="spline"
        keyTimes="0;1"
        keySplines="0 0.3 0.7 1"
        />
    </path>
  </svg>
</template>
```

Vueの`$data`には`values`に加えて`nextValues`を作成しました。 この2つの座標配列からそれぞれ、`<path>`要素の`d`属性（アニメーションの始点）と`<animate>`要素の`to`属性（アニメーションの終点）を生成することでアニメーションが再生されます。

```
export default {
  data () {
    return {
      values: [],
      nextValues: []
    }
  },
  computed: {
    /** 現在のパス（アニメーションの始点） */
    pathStr () {
      return valuesToPathStr(this.values)
    },
    /** 次のパス（アニメーションの終点） */
    nextPathStr () {
      return valuesToPathStr(this.nextValues)
    }
  },
  mounted () {
    // 開始時に現在と次のパスの初期値をランダムに生成
    this.values = generateValues()
    this.nextValues = generateValues()
  }
}
```

そのままだと最初の1回でアニメーションが終了してしまうので、`<animate>`要素の`endEvent`イベントで次の終点を生成し、アニメーションを繰り返し再生しています。

```
  methods: {
    next () {
      this.values = this.nextValues // 終点を次の始点にセット
      this.nextValues = generateValues() // 次の終点を生成
      this.$refs.anim.beginElement() // アニメーションを開始
    }
  },
```

上記のコードでは詳細の説明は省きましたが、SVGの`<animate>`要素ではタイミングやイージング等の細かなコントロールが可能です。また、`<animateMotion>`要素を使えば、パスに沿ってオブジェクトを移動させるようなアニメーションも可能です。 具体的な仕様は[SVG 1.1 仕様 （第２版） 日本語訳：19 アニメーション](https://triple-underscore.github.io/SVG11/animate.html)等にまとまっています。より深く学びたい方は参照してください。

### 基本を知ってもっと自由にアニメーションをつくろう

この記事ではVue.jsのサポートを使いながら、アニメーションライブラリを使用せずにCSSやSVGの複雑なアニメーションを構築する方法を紹介しました。 用途に合わせた適切なライブラリを活用することももちろん大切ですが、基本の技術をしっかり押さえればもっと自由にアニメーションを作り出せるようになるはずです。

また、複雑になりがちなアニメーションのコードをVue.jsのテンプレートやコンポーネントで抽象化・部品化することも有用なテクニックです。ぜひ活用してみてください。