---
title: "頑張らない3D表現！ WebGLを使わずにウェブサイトで3Dを実現するCSSテクニック"
source: "https://ics.media/entry/230519/"
publishedDate: "2023-05-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2023年5月19日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

ウェブデザインにおける3D表現はリッチでユーザーの興味を惹くものがあります。しかし3Dコンテンツの実装は技術レベルも高く、予算も豊富でないと難しいものです。そこで、今回はWebGLや代表的な3DライブラリのThree.jsを**使わない**で3D表現（あるいは3D風）を実現する方法を紹介します。

![3D感のあるスライド](https://ics.media/entry/230519/images/230519_slide.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230519_noWebGl_3d/)
-   [コードを確認する](https://github.com/ics-creative/230519_noWebGl_3d/tree/main/src)

### 3Dを感じる理由

まず3Dをユーザーに感じさせる理由について考えてみます。紙面にしても画面にしても実態は2Dの平面世界です。画面の中で3Dを感じるのは、人間が2D的に描かれたものから奥行きを知覚する特性があるからです。たとえば、すぼまっていく2本の線があると線が平行であると認知し、奥行きを感じます。この現象を体系化したものが遠近法です。

![2Dの絵でも平行な2本の線があるように感じたり、箱型の図形のように感じる](https://ics.media/entry/230519/images/230519_perspective.png)

より具体的な手法として透視図法があります。Three.jsを使った3D表現もこの透視図法によって描画されています。描画自体はThree.jsでなくてもできるので、これを利用して遠近感を演出できます。

もう1つ、ウェブサイトならではの特性として**動き**があります。透視図法のみでは単なる静止画の話ですが、ウェブサイトは動きによって3Dをより感じさせるものもあります。たとえばマウス操作で向きが変わったり、ボタン操作によって動作したりすることで静止画ではなく生き生きとした3Dを感じられます。

これらの3Dを感じる特性を踏まえていくつか手法を紹介します。

### 素材を3D動画にする

やや身も蓋もない手法ですが、素材に3Dで描画された動画を使う手法があります。動きのある動画は3Dに感じさせる効果が高いです。とくに透過動画を使うとテキストや背景などの他のコンテンツとも馴染み、効果的な3D表現ができます。

![3Dのドーナツが回転する](https://ics.media/entry/230519/images/230519_donuts.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230519_noWebGl_3d/#material3d)

デモは透過動画を使っています。動画というと四角い領域をともなったもののイメージがありますが、背景が透過しているのでドーナツのみが回転しているように見えます。この手法の場合、動画を作成する手間がありますが、3D的な表現を自由にできます。**3Dのコンテンツにインタラクティブ性が求められない場面で有効**でしょう。透過動画の実装方法は記事[『ウェブサイトに透過動画を埋め込む方法』](https://ics.media/entry/221007/)にて解説しています。

▼HTML

```
<video muted playsinline autoplay loop width="360" height="360">
  <source src="/assets/movies/donut.mov" type="video/quicktime" />
  <source src="/assets/movies/donut.webm" type="video/webm" />
</video>
```

### CSS 3D Transformを使う

3D的な描画はCSSでも可能です。`transform`プロパティには3D的に変形できる値が用意されています。これらを使うと3D表現が可能です。

![太陽の周りを回る地球と月](https://ics.media/entry/230519/images/230519_solar.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230519_noWebGl_3d/#cssTransform)

この太陽系を模したデモはCSSのみで作成しました。`translate`プロパティと三角関数を使って円周運動をアニメーションしています。

▼月の円運動アニメーションのkeyframes。実際にはSassのmixinを使って生成しています。

```
:root {
  --pi: acos(-1);
}

@keyframes moon {
  0% {
    translate: calc(sin(calc(var(--pi) * 0)) * 36px) 0
      calc(cos(calc(var(--pi) * 0)) * 36px);
  }
  2.7777777778% {
    translate: calc(sin(calc(var(--pi) * 0.0555555556)) * 36px) 0
      calc(cos(calc(var(--pi) * 0.0555555556)) * 36px);
  }
  5.5555555556% {
    translate: calc(sin(calc(var(--pi) * 0.1111111111)) * 36px) 0
      calc(cos(calc(var(--pi) * 0.1111111111)) * 36px);
  }
  /* 中略 */
  100% {
    translate: calc(sin(calc(var(--pi) * 2)) * 36px) 0
      calc(cos(calc(var(--pi) * 2)) * 36px);
  }
}
```

▼円運動のmixin

```
/**
 * keyframes生成用のmixin
 * @prams $radius - 半径
 * @prams $precision - 精度。大きくするほど真円に近づく
 */
@mixin circleAnimation($radius, $precision: 36) {
  @for $i from 0 through $precision {
    #{$i * math.div(100 , $precision)}% {
      translate: calc(
          sin(calc(var(--pi) * #{$i * math.div(1, $precision) * 2})) *
            #{$radius}
        )
        0
        calc(
          cos(calc(var(--pi) * #{$i * math.div(1, $precision) * 2})) *
            #{$radius}
        );
    }
  }
}
```

CSS 3D Transformには弱点があり、要素自体は平面であることです。上記のデモも太陽、地球、月の絵は常にこちらを向いたままです。3Dモデルのように厚みをもっておらずペラペラとしています。

厚みはもてないことを逆手にとり、要素を層状に重ねると独特の表現ができます。

![層状になった「メロスは激怒した」の文字](https://ics.media/entry/230519/images/230519_run.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230519_noWebGl_3d/#meros)

CSS 3D Transformの詳しい使い方については記事[『もう誤魔化さない！ CSS Transform完全入門(3D編)』](https://ics.media/entry/210519/)で解説しています。CSSの三角関数については[『CSSの三角関数を理解しよう！ sin()とcos()でできる表現』](https://ics.media/entry/230126/)で紹介されているので合わせて読むと理解が深まります。

### レイヤーを用いて3Dを表現する

レイヤーを用いると奥行き感を演出できます。代表的なテクニックにパララックスがあります。

![パララックスで表現した空。雲が視差効果で別々に動く](https://ics.media/entry/230519/images/230519_sky.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230519_noWebGl_3d/#layer)

空の画像の部分でスクロールすると雲が動きます。このとき、雲の動きがすべておなじでなく、速いもの、遅いものがあるので奥行きを感じさせます。

遠近法では手前にあるものほど移動が速く、遠くにあるものほど遅く見えます。この速さの違いをスクロールに応用し、要素に速度差をつけています。また手前にあるものは大きく、遠くにあるものは小さくし、さらに一番手前にある雲をボケさせています。これは被写界深度を表現し、これも奥行き感を演出します。

▼パララックスの実装例

```
// パララックス
const element = document.querySelector(".skyWrapper");
const cloudLayer1 = document.querySelectorAll(".cloudLayer1");
const cloudLayer2 = document.querySelectorAll(".cloudLayer2");
const cloudLayer3 = document.querySelectorAll(".cloudLayer3");

// 事前に各要素のoffsetTopを取得して、配列化しておく
const layer1OffsetList = Array.from(cloudLayer1).map(
  (cloud) => cloud.offsetTop
);
const layer2OffsetList = Array.from(cloudLayer2).map(
  (cloud) => cloud.offsetTop
);
const layer3OffsetList = Array.from(cloudLayer3).map(
  (cloud) => cloud.offsetTop
);

// それぞれのレイヤーの移動スピード倍率
const LAYER1_SPEED = 0.5;
const LAYER2_SPEED = -0.5;
const LAYER3_SPEED = -1.5;

// 移動量に応じてパララックスを実行する関数
const moveParallax = (scrollVal) => {
  cloudLayer1.forEach((cloud, index) => {
    cloud.style.transform = `translateY(${
      (scrollVal - layer1OffsetList[index]) * LAYER1_SPEED
    }px)`;
  });
  cloudLayer2.forEach((cloud, index) => {
    cloud.style.transform = `translateY(${
      (scrollVal - layer2OffsetList[index]) * LAYER2_SPEED
    }px)`;
  });
  cloudLayer3.forEach((cloud, index) => {
    cloud.style.transform = `translateY(${
      (scrollVal - layer3OffsetList[index]) * LAYER3_SPEED
    }px)`;
  });
};

// 初期位置セット
moveParallax(0);

// スクロールに応じて移動
element.addEventListener("scroll", () => {
  const scrollVal = element.scrollTop;
  moveParallax(scrollVal);
});
```

パララックスを実装するライブラリやプラグインも多数あるので、それを利用するのも良いでしょう。

パララックスはスクロールだけでなく、マウスの移動でも表現できます。

![パララックスで表現した雪景色。雪や遠景が視差効果で別々に動く](https://ics.media/entry/230519/images/230519_snow.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230519_noWebGl_3d/#snow)

雪景色の例はマウスの動きに応じて3枚のレイヤー化した画像をずらしています。近景・中景・遠景の切り抜いた画像、そして降雪の画像を重ねて、マウスの動きでパララックスのように動かしています。

▼マウス操作で視差効果の実装例

```
// マウスで視差効果
const mouseArea = document.querySelector(".snowImageWrapper");
const snowFalling = document.querySelector(".snowFalling");
const snowBg1 = document.querySelector(".snowFallingBgLayer1");
const snowBg2 = document.querySelector(".snowFallingBgLayer2");
const snowBg3 = document.querySelector(".snowFallingBgLayer3");

// マウスの移動に応じて、各要素を移動させる
mouseArea.addEventListener("mousemove", (e) => {
  // ビューポート内のマウス位置と要素の位置から、要素内の相対位置を計算する。中心が原点になるように調整
  const mouseAreaRect = mouseArea.getBoundingClientRect();
  const posX = e.clientX - mouseAreaRect.left - mouseAreaRect.width / 2;
  const posY = e.clientY - mouseAreaRect.top - mouseAreaRect.height / 2;

  // マウス移動量に対する各要素の移動量の比率
  const SNOW_SPEED_RATIO = 0.2;
  const BG1_SPEED_RATIO = 0.04;
  const BG2_SPEED_RATIO = 0.03;
  const BG3_SPEED_RATIO = 0.025;
  // 雪は横移動しかしない（縦移動すると降雪と干渉して不自然になるので）
  snowFalling.style.transform = `translateX(${posX * SNOW_SPEED_RATIO}px)`;
  snowBg1.style.transform = `translate(${posX * BG1_SPEED_RATIO}px, ${
    posY * BG1_SPEED_RATIO
  }px)`;
  snowBg2.style.transform = `translate(${posX * BG2_SPEED_RATIO}px, ${
    posY * BG2_SPEED_RATIO
  }px)`;
  snowBg3.style.transform = `translate(${posX * BG3_SPEED_RATIO}px, ${
    posY * BG3_SPEED_RATIO
  }px)`;
});
```

雪が降る様子は`background-image`プロパティで実装しています。背景画像を使ったやり方は記事[『background-imageを使ったCSSのアニメーションテクニック』](https://ics.media/entry/220602/#%E9%9B%AA%E9%99%8D%E3%82%8B%E8%A1%A8%E7%8F%BE)にて紹介しています。

### シャドウを用いる

目の錯覚のような手法ですが、影を落とすことで浮遊感を演出できます。

![サッカーボールの下に影があり、浮いているように見える](https://ics.media/entry/230519/images/230519_soccer.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230519_noWebGl_3d/#shadow)

サッカーボールの下に影の画像を配置しています。影があることでボールが浮いているように見えます。またボールの動きに合わせて影が拡縮することで3D的な動きを演出しています。

影といえばCSSの`box-shadow`プロパティがあります。このプロパティも同様に奥行き感の演出に使えます。

![タイルの下に影があり、浮いているように見える](https://ics.media/entry/230519/images/230519_tile.png)

影は距離が遠くなると薄く、ぼやけます。近づくと濃く、はっきりします。これを`box-shadow`プロパティの値を変更することで表現できます。影の濃淡で四角いタイルが画面手前方向に動いているような演出ができます。

▼アニメーションで設定している`box-shadow`プロパティと`transform`プロパティの値

```
@keyframes tileHoverAnimation {
  0% {
    box-shadow: 0 0 8px 0 rgb(0 0 0 / 20%);
    transform: scale(1) translateY(0);
  }
  15% {
    box-shadow: 0 30px 16px -8px rgb(0 0 0 / 10%);
    transform: scale(1.08) translateY(-36px);
  }

  30% {
    box-shadow: 0 0 8px 0 rgb(0 0 0 / 20%);
    transform: scale(1) translateY(0);
  }
}
```

影を使った表現は記事[『box-shadowだけじゃない！CSSでできる色々な影の表現と意外に知らない落とし穴』](https://ics.media/entry/200406/)にても多数紹介されています。

### 組み合わせて使う

これまでは個別の手法を紹介してきましたが、3D素材やレイヤーのテクニックを組み合わせることでより一層3Dを演出できます。

![3D感のあるスライド](https://ics.media/entry/230519/images/230519_slide.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230519_noWebGl_3d/#combo)

この例はスライダーのコンテンツに透過動画を配置し、影を落とし、さらにスライドの移動にパララックス効果をつけています。スライドには[Swiperスワイパー.js](https://swiperjs.com/)を使っていますが、特別なカスタマイズは施していません。

▼スライドのアニメーションのスタイル抜粋（SCSS記法）

```
:root {
  --easeOutQuint: cubic-bezier(0.22, 1, 0.36, 1);
}

.polygonInfo {
  filter: blur(0);
  transition: transform 0.8s var(--easeOutQuint), filter 0.8s 0.1s ease;
  transition-delay: 0.15s;
  transform: translateX(0);
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
}

.swiper-slide-next {
  .polygonInfo {
    filter: blur(4px);
    transition-delay: 0s;
    transform: translateX(500px);
  }
}

.swiper-slide-prev {
  .polygonInfo {
    filter: blur(4px);
    transition-delay: 0s;
    transform: translateX(-500px);
  }
}
```

Swiper.jsの使い方は[『カルーセルUIを実現するJSライブラリまとめ(2021年版) - 導入手間や機能の比較紹介』](https://ics.media/entry/210902/#swiper.js)にて解説しています。

透過画像をCSS 3D Transformで重ねて3Dマップも作れます。

![3D感のある地図](https://ics.media/entry/230519/images/230519_map.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230519_noWebGl_3d/#map)

3Dマップの例はJavaScriptでドラッグ操作を追加することで回転させることもできます。

### まとめ

今回はWebGLを使わない3D表現の実装方法を紹介しました。WebGLを使わなくても工夫することで3D風の演出が可能です。アイデア次第ではおもしろい表現もできるでしょう。ぜひ参考にしてみてください。