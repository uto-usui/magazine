---
title: "UI改善にキラリと役立つ！ SVGアニメーションの作り方まとめ"
source: "https://ics.media/entry/15970/"
publishedDate: "2017-07-13"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

SVGアニメーションを用いると、さまざまなサイズのディスプレイで印象的なマイクロインタラクションを実現できます。マイクロインタラクションの導入によってUI改善に役立てているケースもあるでしょう（参考記事『[SVGで始めるマイクロインタラクション入門](https://ics.media/entry/15834/)』）。SVGでアニメーションを実装するには、CSSを使う方法、JavaScriptを使う方法、動画作成ソフトを使う方法等、さまざまなアプローチがあります。

今回は、HTMLコーダー、フロントエンドエンジニア、デザイナーの分野別のSVGアニメーションのアプローチ方法を挙げ、具体的な実装方法について紹介します。

![](https://ics.media/entry/15970/images/170707_svg_approach-1.png)

### 【コーダー向け】CSSでSVGアニメーションを実現する方法

![](https://ics.media/entry/15970/images/170707_svg_cssanimation_title.png)

HTMLコーダーにオススメするSVGアニメーション実現方法の1つは、CSSプロパティを使う方法です。

**SVGはCSSプロパティによってグラフィックの形状を変更できます**。たとえば、次のコードでは、HTML（`index.html`）に記述した円のスタイルを、CSS（`style.css`）によって更新しています。

```
<circle id="myCircle" r="50" cx="270" cy="270" />
```

▲ index.html

```
#myCircle {
  fill: blue;
}
```

▲ style.css

この性質を利用し、**CSSの[Transitions](https://www.w3.org/TR/css-transitions-1/) や[Animations](https://www.w3.org/TR/css-animations-1/)でプロパティを徐々に変化させることで、SVGアニメーションを実現します**。たとえば円（`#myCircle`）の塗り（`fill`プロパティ）の色を、1秒かけて赤色にするCSSは次のとおりです。

```
#myCirle {
  transition: all 1s;
}

#myCirle:hover {
  fill: red;
}
```

▲ style.css

コーディングの様子は次のとおりです。

#### CSSによるアニメーションの実例1：ハンバーガーメニュー

CSSによるアニメーションの実例として、CSSのみでハンバーガーメニューのアニメーションを用意しました。次のデモをご覧ください。ボタンにマウスホバーすることで、アニメーションしながら閉じるボタンに切り替わります。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/170713_svg_animation/demo1_transition.html)
-   [ソースコードを確認する](https://github.com/ics-creative/170713_svg_animation/blob/main/src/css/demo1_common.css)
-   [スローモーション版のデモ](https://ics-creative.github.io/170713_svg_animation/demo1_transition_slow.html)

![](https://ics.media/entry/15970/images/170707_svg_cssanimation_step.png)

このアニメーションを実現するCSSは次の部分です。CSSのTransitionsを使っています。

```
.menu {
  cursor: pointer;

  .border {
    stroke: #fff;
    stroke-width: 45px;
    stroke-linecap: round;
    transition: var(--time);
    transform-origin: center center;
  }

  /* 初期位置 */
  .border1 {
    transform: translateY(-100px);
  }
  .border3 {
    transform: translateY(100px);
  }

  &:hover {
    .border {
      stroke: #890a0c; /* 各ボーダーは、ホバー時に茶色に変更する */
    }
    /* 1本目のボーダーは、ホバー時に回転させる */
    .border1 {
      transform: translateY(0px) rotate(45deg);
    }
    /* 2本目のボーダーは、ホバー時に透明にする */
    .border2 {
      opacity: 0;
    }
    /* 3本目のボーダーは、ホバー時に回転させる */
    .border3 {
      transform: translateY(0px) rotate(-45deg);
    }
  }
}
```

#### CSSによるアニメーションの実例2：いいねボタン

Xのいいねボタンのようなアニメーションを、CSSのみで作成しました（※）。次のデモをご覧ください。各ボタンをクリックすることで、アニメーションが開始します。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/170713_svg_animation/demo2_transition.html)
-   [ソースコードを確認する](https://github.com/ics-creative/170713_svg_animation/blob/main/src/css/demo2_common.css)
-   [スローモーション版のデモ](https://ics-creative.github.io/170713_svg_animation/demo2_transition_slow.html)

※ ボタンクリック時のクラスの付与のみJavaScriptを用いています。

ボタンをクリックすると、爆発のアニメーション、パーティクルのアニメーション、ハートのアニメーションがそれぞれ実行され、全体としてTwitterのいいねボタンのようなアニメーションとなります。

![](https://ics.media/entry/15970/images/170707_svg_animation_step.png)

爆発、ハート、パーティクルのアニメーションを実現するコードについて、それぞれ抜粋します。主にCSSのAnimationsで実現しています。

次のコードは爆発のアニメーションコードの抜粋です。`stroke-width`プロパティ（線の太さ）と`scale`プロパティ（拡大率）を徐々に大きくすることで、爆発時に円が広がる様子を表現しています。

```
/* クリックされたら、爆発のアニメーションを開始 */
.likeButton.clicked .explosion {
  animation: explosionAnime 800ms;
}

/* 爆発のアニメーション内容 */
@keyframes explosionAnime {
  /* 中略 */
  0% {
    transform: scale(0);
    stroke-width: 0;
  }
  5% {
    stroke-width: 200;
  }
  20% {
    stroke-width: 300;
  }
  50% {
    transform: scale(1.1);
  }
  /* 中略 */
}
```

次のコードはハートのアニメーションコードの抜粋です。**縦方向・横方向のスケールを不規則に変化させることで有機的な動きを実現しているのがポイントです**。こういったアニメーションのTipsについては、記事『[CSS Animationだけで実現するキャラクターアニメーション](https://ics.media/entry/11336/)』も参照ください。

```
/* クリックされたら、ハートのアニメーションを開始 */
.likeButton.clicked .heart {
  animation: heartAnime 800ms;
}

/* ハートのアニメーション内容 */
@keyframes heartAnime {
  0% {
    transform: scale(0);
  }
  75% {
    transform: scale(1.1, 0.9) translate(0%, 5%);
  }
  80% {
    transform: scale(0.95, 1.05) translate(0%, -3%);
  }
  100% {
    transform: scale(1, 1) translate(0%, 0%);
  }
}
```

次のコードはパーティクルのアニメーションコードの抜粋です。ボタンクリック後、一定時間後（`@keyframes`の`30%`）に指定の座標への移動を開始します。移動に用いているのは`transform`プロパティの`translate`値です。**17個のパーティクルをランダムな位置に移動させることで、爆発時のパーティクルが広がり、ハートの動きとあいまってキラリとしたアニメーションになります**。

```
/* クリックされたら、パーティクルのアニメーションを開始 */
.likeButton {
  /* 中略 */
  &.clicked {
    /* 中略 */
    .particleLayer {
      circle {
        animation-name: particleAnimate;
        animation-duration: var(--animate-time);
        animation-fill-mode: forwards;
        /* 中略（いろいろ数式で座標計算） */
      }
    }
  }
}

/* パーティクルの移動アニメーション */
@keyframes particleAnimate {
  0% {
    transform: translate(var(--initial-x), var(--initial-y));
  }
  30% {
    opacity: 1;
    transform: translate(var(--initial-x), var(--initial-y));
  }
  80% {
    transform: translate(var(--target-x), var(--target-y));
  }
  90% {
    transform: translate(var(--target-x), var(--target-y));
  }
  100% {
    opacity: 1;
    transform: translate(var(--target-x), var(--target-y));
  }
}
```

#### CSSのアニメーションのメリットとデメリット

CSSによるSVGアニメーションのメリットは、JavaScriptによるプログラミングがほとんど不要なことです。**CSSプロパティでアクセスできる塗りや線、拡縮・回転・移動のプロパティであれば、手軽にアニメーションが実現できます**。ただ、`path`要素の`d`属性にアクセスできないため、パスの変形やパスに沿った移動は実現できません。

CSSプロパティでアクセスできるシンプルなアニメーションである場合には、有効な選択肢です。

### 【コーダー向け】SMILでSVGアニメーションを実現する方法

![](https://ics.media/entry/15970/images/170707_svg_smil_title.png)

「SMILスマイル」というXMLベースの言語（HTMLやSVG）を用いると、CSSやJavaScriptを使わず、HTML内にコードを書くだけでSVGのアニメーションが実現できます。

たとえば、円の塗りを1秒かけて赤色にするコードは、HTML内に記述したSVGコードに対して次のように記述します。

```
<circle>
  <animate attributeName="fill" to="red" dur="1s"></animate>
</circle>
```

▲ index.html

`d`属性を徐々に変化させれば、形状が徐々に変換する「モーフィング」も実現できます。

属性値の変化には`<animate>`タグ、回転・移動・拡縮などのCSSの[Transforms](https://www.w3.org/TR/css-transforms-1/)系の変形には`<animatetransform>`タグ、パスに沿った移動は`<animatemotion>`タグをそれぞれ用います。

#### SMILの特徴

SMILはHTMLコードだけでアニメーションが可能なことが魅力です。塗りと線の変化、拡縮・回転・移動に加えて、パスの変形やパスに沿ったアニメーションが実現できます。現状で多くのブラウザーで対応しています（参考『[SVG SMIL animation | Can I use…](https://caniuse.com/svg-smil)』）。モバイルサイトのみに対応したウェブコンテンツでSVGアニメーションを実装する場合には、SMILが有効が手段です。

SMILはChromeブラウザで一度非推奨になりましたが、後に非推奨の措置の保留が発表されました。2025年5月現在はすべてのモダンブラウザーでSMILが使える状態です。

次は、JavaScript、動画作成ソフトによるアニメーション実現方法について紹介します。

### 【エンジニア向け】JavaScriptでSVGアニメーション

![](https://ics.media/entry/15970/images/170707_svg_js_title.png)

SVGはDOMの仕様に準拠しているので、一定時間毎に**JavaScriptからDOMを操作することでアニメーションを実現**できます。たとえば、円の色を徐々に赤色にするのは次のコードです。

```
let time = 0;
const myCircle = document.querySelector("#myCircle");
function animate() {
  time += 1;
  requestAnimationFrame(() => {
    const l = time;
    myCircle.style.fill = `hsl(0, 100%, ${l}%)`;
    time += 1;
    if (time < 50) {
      animate();
    }
  });
}
animate();
```

**JavaScriptのメリットは、表現力の高さです**。塗りと線の変化、拡縮・回転・移動、パスの変形、パスに沿ったアニメーション等、あらゆるアニメーションが可能です。CSSプロパティやSMILで実現できたものは、すべて実現できます。ただ、前述のコードを見てもわかる通り、CSSやSMILに比べると、コードが煩雑で実装難易度は高めであると言えます。

![](https://ics.media/entry/15970/images/170707_svg_js_feature.png)

### ライブラリを使って効率的にJavaScriptアニメーションを実装する

JavaScriptのアニメーションは、ライブラリを用いることで効率的に実装できるようになります。

![](https://ics.media/entry/15970/images/170707_svg_js_lib_feature.png)

今回は、2つのライブラリを紹介します。

※ここで紹介するJSライブラリは2017年執筆当時のものです。現在も利用できますが、JSライブラリはしばらくバージョンアップがされていません。

#### JavaScriptでのSVG要素の操作を楽にする「Snap.svg」

[Snap.svg](http://snapsvg.io/)を用いると、jQueryライクな記法でJavaScriptによるSVG操作が可能になります。前述の円を徐々に赤色にするアニメーションは、次のように少ないコード量で可能です。

```
// #myCircleの要素を取得
var myCircle = Snap("#myCircle");
// #myCircleのfillプロパティを1秒かけてredにする
myCircle.animate(
  {
    fill: "red",
  },
  1000,
);
```

Snap.svgを用いてアニメーションを行っている様子は次の通りです。

#### 手書き風の演出を楽にするvivus

[vivus](https://maxwellito.github.io/vivus/)（ヴィヴス）は、手描き風のアニメーションを実現するライブラリです。次のコードを記述するだけで、手描き風のアニメーションが実現できます。

```
new Vivus("SVG要素のID", { duration: 速度 });
```

vivusを用いてアニメーションを行っている様子は次の通りです。

手描き風のアニメーションはCSSアニメーションやSMILでも実装できますが、**vivusの場合はJavaScriptアニメーションになるため対応ブラウザーが多い**です。速度変更、遅延実行、複数のラインの同時アニメーション、順次アニメーションなど豊富なオプションが使えることも魅力です。

#### Snap.svgとvivusを組み合わせたデモ

2つのライブラリを使用して、不動産のウェブサイトをイメージしたコンテンツを作成しました。不動産のウェブサイトをイメージしたオリジナルデモを作成しました。次のリンクよりご覧ください。

-   [Snap.svgとvivusを組み合わせたデモ](https://ics-creative.github.io/170713_svg_animation/demo_realestate.html)
-   [ソースコードを確認する（JavaScript）](https://github.com/ics-creative/170713_svg_animation/blob/main/src/js/demo_realestate.js)

ページをスクロールすると、適切な位置に達した場合にvivusによるアニメーションが開始します。**自前で実装する場合に面倒な、特定位置にスクロールした際の処理についても、vivusを使えば手軽に実装できます**。コンテンツ下部の地図部分は、vivusによるアニメーションが完了した後に、透明だった塗りが不透明になり、同時に上部からピンが降りてくる演出が行われます。これらはSnap.svgで実装したものです。

地図部分の具体的なコードは次のとおりです。ライブラリを駆使することで少ないコードで実現可能です。

```
// 地図のピンを上部に固定しておく
Snap("#mapPin").attr({
  transform: "translate(0, -400px)",
});

// 地図のラインアート
new Vivus("map", { duration: 60 }, function () {
  // #map内のpathの塗りの透明度を1にする
  Snap("#map")
    .selectAll("path")
    .animate(
      {
        "fill-opacity": 1,
      },
      60,
      function () {},
    );

  // 地図のピンを下ろす
  Snap("#mapPin").animate(
    {
      transform: "translate(0, 0px)",
    },
    120,
    mina.easeout,
  );
});
```

▲ 地図部分の演出

次は、動画作成作成ソフトを使ってSVGアニメーションを実現する方法（デザイナー向け）、SVGの学習に役立つ参考資料を紹介します。

### 【デザイナー向け】動画作成作成ソフトを使ってSVGアニメーションを実現する方法

![](https://ics.media/entry/15970/images/170707_svg_tools_title.png)

ビデオエフェクト作成ソフトの[Adobe After Effects](https://www.adobe.com/jp/products/aftereffects.html)を用いると、**コードを書かずに直感的にアニメーションを作成し、SVGアニメーションとして出力できます**。コードをほとんど書くことなくSVGアニメーションを出力できるので、デザイナーに向いている手段の1つと言えます。

#### After EffectsでSVGアニメーションを書き出す（Bodymovin）

ビデオエフェクト作成ソフトのAfter Effectsと拡張機能「[Bodymovin](https://exchange.adobe.com/apps/cc/12557/bodymovin)」を組み合わせてSVGアニメーションを出力する方法があります。SVGアニメーションはLottie（ロッティー）という技術で再生できます。

![](https://ics.media/entry/15970/images/170707_svg_ae_demo.png)

詳しい使い方やインストール方法については、記事『[最新版！ Lottieアニメーションの作り方 - After Effects編](https://ics.media/entry/230928/)』にまとまっていますので、参照ください。

#### 動画作成ソフトによるSVGアニメーションの特徴

Animate、After Effects共に、**SVGアニメーションはJavaScriptによって実現されています**。したがって、高い表現力と幅広いブラウザー対応が実現可能です。ただし、動画作成ソフトによって生成されたJavaScriptはカスタマイズしづらいので注意が必要です。

### はじめよう、SVGアニメーション

SVGアニメーションを実現する方法は複数あり、ブラウザーを限定できる簡易的なアニメーションにはCSS、クロスブラウザー対応が必要な場合や、パスを使ったリッチなアニメーションにはJavaScriptが効果的。また、JavaScriptライブラリや動画作成ソフトを使うとより効率的に作成できることを紹介しました。

**高解像度なディスプレイが主流になり、フラットデザインとも相性のよいSVGアニメーションは活躍の場面が多いです**。ぜひ、この機会にSVGアニメーションに挑戦しましょう。

最後に、SVGとSVGアニメーションの勉強役立つ資料を紹介します。

-   [CodeGrid](https://www.codegrid.net/)  
    PixelGrid社のフロントエンド技術情報メディア。「[マークアップ・エンジニアのためのSVG入門](https://www.codegrid.net/series/2014-svg-basic/)」と「[Snap.svgで快適SVGアニメーション](https://www.codegrid.net/series/2015-snapsvg/)」のSVG解説記事がオススメです。
-   [Scalable Vector Graphics (SVG) 2](https://www.w3.org/TR/SVG2/)  
    SVGの仕様を開発しているW3Cによる公式仕様書です。公式の仕様を理解することで、SVGの包括的な知識が手に入ります。有志による日本語訳「[SVG 2 — Changes from SVG 1.1 （日本語訳）](https://triple-underscore.github.io/svg-changes-ja.html)」もありますので、合わせて参照ください。
-   [ウェブ制作者のためのIllustrator＆ベクターデータの教科書 - インプレスブックス](https://book.impress.co.jp/books/1114101097)  
    Illustratorでのベクターデータの作り方からSVGの基礎までをわかりやすく解説している書籍です。