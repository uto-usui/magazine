---
title: "現場で使えるアニメーション系JSライブラリまとめ - GSAP, Anime.js, Motion, Tween.js, WebAnimationなど"
source: "https://ics.media/entry/14973/"
publishedDate: "2017-02-17"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ウェブサイトのインタラクションやUIの演出など、**HTMLでモーションを実装する機会は多々あります**。HTML要素の簡易的なアニメーションであればCSS Transitionを使ったことのある方も多いでしょう。しかし、Canvas、SVGなどJavaScriptを用いる場合は、CSS Transitionでは対応できず、アニメーションライブラリが必要となる場面があります。

JavaScriptのアニメーションライブラリは多種多様なので、どのライブラリを採用するのか悩みどころです。本記事では**HTMLのJavaScriptライブラリについて、使い勝手や書式を紹介します**。

### 今回紹介するメジャーなJSライブラリ6種類

メジャーなJavaScriptライブラリとして次の6種類を紹介します。

-   [GSAP](#gsap) v3.13
-   [Anime.js](#animejs) v4
-   [Motion](#motion) v12
-   [Tween.js](#Tween.js) v25
-   [jQuery](#jQuery) v3.7
-   [Web Animations API](#WebAnimationsAPI)

※記事の末尾に各種ライブラリの容量やライセンス等を記載してます

### GSAPジーサップ - 最速で多機能なライブラリ

![](https://ics.media/entry/14973/images/tweenlib-gsap.png)

同時実行性能：★★★ / 容量：★☆☆ / 機能：★★★

[GSAPジーサップ](https://gsap.com/)はFlashの時代から存在する**歴史のあるハイエンドなライブラリ**です。かつては「TweenMax」「TweenLite」というライブラリ名でしたが、2019年秋からブランド名が「GSAPジーサップ」に統一されました。

GSAPは、かなりの機能が備わっています。**多彩な表現に挑戦したい、多くのオブジェクトを滑らかに動かしたい、という方にオススメです**。

記述例

```
gsap.to(".rect", {
  duration: 3, // 秒指定
  x: 700,
  rotate: 360,
  repeat: -1, // 繰り返し指定
  ease: "power3.inOut" // 加減速の種類
});
```

実行結果

![アニメーションサンプル](https://ics.media/entry/14973/images/180612_animation_sample.gif)

-   [実行サンプルを別窓で開く](https://ics-creative.github.io/170216_tween_performance/sample/gsap.html)
-   [サンプルコードを確認する](https://github.com/ics-creative/170216_tween_performance/blob/main/sample/gsap.html)

GSAPは72KBと容量がやや大きいものの、ツリーシェイキングに対応。パッケージマネージャーnpmやTypeScriptでの利用も対応しています。

GSAPはFlash時代から長期間にわたり継続的に開発されています。[GitHubの履歴](https://github.com/greensock/GSAP/graphs/contributors)をみても高い頻度で更新されています。

GSAPは商用利用も含め100%無料です。以前は、特定の用途では有料ライセンスが必要でしたが、2025年4月よりボーナスプラグインも含めて無料利用できるようになりました。詳しくは公式サイトの次のページをご覧ください。

-   [Pricing | GSAP](https://gsap.com/pricing/)
-   [Standard “No Charge” GSAP License](https://gsap.com/community/standard-license/)
-   [3.13 release](https://gsap.com/blog/3-13/)

GSAPの応用例としてICS MEDIAではスクロール演出やWebGL演出を紹介しています。

-   [GSAP入門](https://ics.media/entry/220822/)
-   [アニメーション最強のライブラリGSAP3](https://ics.media/entry/200805/)
-   [GSAPを使ったタイムリマップ表現](https://ics.media/entry/7162/)
-   [JavaScriptで作る本格スクロール演出](https://ics.media/entry/210426/)

Reactへの組み込みをサポートする機能も提供されています。

-   [React & GSAP | GSAP | Docs & Learning](https://gsap.com/resources/React/)

### Motion - 宣言的UIに適したライブラリ

![](https://ics.media/entry/14973/images/tweenlib-motion.jpg)

同時実行性能：★☆☆ / 容量：★☆☆ / 機能：★★☆

[Motion](https://motion.dev/)はモダンなUIライブラリで使えるアニメーションライブラリです。

ReactやVueに宣言的UIとして組み込むことができるほか、生のJavaScriptとしても利用できます。npmでもダウンロード数は他のライブラリに比べて圧倒的に多いことも特徴です（参照：[npm trends](https://npmtrends.com/animejs-vs-gsap-vs-motion)）。

記述例

▼ 生JSでのサンプルコード

```
import { animate } from "motion";

animate(".rect", {
  x: 800,
  rotate: 360,
}, {
  duration: 3.0, // 秒指定
  repeat: Infinity, // 繰り返し
  ease: "easeInOut" // イージング
});
```

▼ Reactでのサンプルコード

```
import { motion } from "motion/react";

function Component() {
  return <motion.div animate={{ x: 800, rotate: 360 }} />
}
```

-   [実行サンプルを別窓で開く](https://ics-creative.github.io/170216_tween_performance/sample/popmotion.html)
-   [サンプルコードを確認する](https://github.com/ics-creative/170216_tween_performance/blob/main/sample/popmotion.html)

Motionはもとは次のように変遷しています。

1.  [Popmotion](https://popmotion.io/)：2015年頃から登場した容量が軽量なJSライブラリ
2.  [Framer Motion](https://motion.dev/)：React向けのモーションライブラリ。Popmotionの作者がFramerに参加。内部エンジンにPopmotionが使われている。
3.  Motion：Framer Motionの後継。React以外に、Vueや生JSに対応。

そのため、PopmotionやFramer Motionを利用している方は、Motionに移行するほうがよいでしょう。前身のPopmotionの開発は2022年から下火になっています（[GitHub](https://github.com/Popmotion/popmotion/graphs/contributors)）。

Motionは実行性能はあまり優れず、演出の機能が少ないことがネックです。

### Anime.js - API豊富なライブラリ

![](https://ics.media/entry/14973/images/tweenlib-animejs-2025.png)

同時実行性能：★★★ / 容量：★☆☆ / 機能：★★★

[Anime.js](https://animejs.com/)は2016年に登場したJSライブラリです。登場時に公開された[デモ（当時は公式サイト掲載されていた）](https://codepen.io/juliangarnier/pen/xOgyjB)のオシャレな表現が[注目を集めました](https://b.hatena.ne.jp/entry/anime-js.com/)。[公式サイト](https://animejs.com/)（2025年にリニューアル）のセンスのよい演出が施されています。海外製のライブラリなのに、「アニメ」という名前が採用されているのが日本のエンジニアとして嬉しいですね。[ドキュメントのデモ](https://animejs.com/documentation/)もわかりやすいのもよい特徴でしょう。

プロパティごとに異なるアニメーションも設定可能。**簡素な指定で直感的にアニメーションを指定できるのが特徴**と言えるでしょう。

記述例

```
import { animate } from "anime.js";
animate(".rect", {
  x: 800,
  rotate: 360,
  duration: 3000, // ミリ秒指定
  loop: true, // 繰り返し
  easing: "easeInOutCubic" // 加減速の種類
});
```

-   [実行サンプルを別窓で開く](https://ics-creative.github.io/170216_tween_performance/sample/animejs.html)
-   [サンプルコードを確認する](https://github.com/ics-creative/170216_tween_performance/blob/main/sample/animejs.html)

GSAPと同様に、位置・角度など`transform`の指定にショートカットとして`x`や`rotate`が使えるのは便利です。

2020年10月のv3.2.1リリース後から開発へのコミット数が減少していましたが（[GitHub](https://github.com/juliangarnier/anime/graphs/contributors)）、2024年頃にバージョン4が公開されました。以前のバージョンでは、GSAPやTweenJSに比べて同時実行性能が劣っていましたが、バージョン4になり同水準の性能に達しています。

Reactへの組み込みをサポートする機能も提供されています。

-   [Using with React | Anime.js | JavaScript Animation Engine](https://animejs.com/documentation/getting-started/using-with-react/)

### Tween.js - プレーンなJS用ライブラリ

![](https://ics.media/entry/14973/images/tweenlib-tweenjs.png)

同時実行性能：★★☆ / 容量：★★★ / 機能：★☆☆

[Tween.js](https://github.com/tweenjs/tween.js/)は機能はあまりなく、容量の小ささが特徴。余分な機能は搭載せず、プレーンな設計に徹しています。

多くのライブラリ名に採用されている「トゥイーン」はもともとFlashの用語。開始値と終了値の「間」を示す「Between」が語源となっています。終了値までプロパティを変化させる機能を「トゥイーン」と言います。

CSSの単位自動補完には未対応なので、次の記述例のようにHTML要素を制御しようとすると、煩雑なコードになります。CSSには向かないので、WebGL・WebGPUやCanvasの制作に使うのがいいでしょう。

記述例

```
import { Tween, Easing } from "@tweenjs/tween.js";

const element = document.querySelector(".rect"); // 要素を取得
const param = { x: 0, rotation: 0 }; // 仮想の変化値Objectを作成

const tween = new Tween(param)
  .to({ x: 800, rotation: 360 }, 3000)
  .repeat(Infinity) // リピート指定
  .easing(Easing.Cubic.InOut) // 加減速の種類
  .onUpdate(function () {
    // 更新時
    // 仮想の変化値Objectを要素に反映
    element.style.transform = `translateX(${param.x}px) rotate(${param.rotation}deg)`;
  })
  .start();

// 更新は任意のタイミングで行う
loop();

function loop() {
  requestAnimationFrame(loop);
  tween.update();
}
```

実行結果

-   [実行サンプルを別窓で開く](https://ics-creative.github.io/170216_tween_performance/sample/tweenjs.html)
-   [サンプルコードを確認する](https://github.com/ics-creative/170216_tween_performance/blob/main/sample/tweenjs.html)

Tween.jsの開発は継続的に行われているようです（参考：[GitHub](https://github.com/tweenjs/tween.js/graphs/contributors)）。

なお、[CreateJS](https://createjs.com/)に似たような名前のライブラリ「[TweenJS](https://createjs.com/tweenjs)」が存在しますが、本Tween.jsとは別物です。

### jQuery - 幅広い環境で動作する枯れた技術

![](https://ics.media/entry/14973/images/tweenlib-jquery.png)

同時実行性能：★☆☆ / 容量：★☆☆ / 機能：★☆☆

jQueryにはアニメーション用の `animate()` という関数が用意されています。jQueryを読み込むだけで利用できるので導入は簡単ですが、イージング（加減速）の種類が少なかったり、オプション指定がほとんどなかったりするので、複雑なことはできません。位置・角度など`transform`のショートカットの指定がないのも不便です。

記述例

```
$(".rect")
  .css({ left: 0 }) // 初期値
  .animate(
    { left: 800 },
    3000, // ミリ秒指定
    "linear", // 加減速の種類
  );
```

-   [実行サンプルを別窓で開く](https://ics-creative.github.io/170216_tween_performance/sample/jquery.html)
-   [サンプルコードを確認する](https://github.com/ics-creative/170216_tween_performance/blob/main/sample/jquery.html)

jQueryの`animate()`メソッドは後述のWeb Animations APIで代用できるため、今の時代、jQueryの`animate()`を使う必要はないでしょう。

### Web Animations API - DOM要素のアニメーションなら

![](https://ics.media/entry/14973/images/tweenlib-webanimation.png)

同時実行性能：★★☆ / 容量：★★★ / 機能：★☆☆

[Web Animations API](https://www.w3.org/TR/web-animations-1/)はDOM要素をアニメーションできるAPIです。サイト「[Can I Use…](https://caniuse.com/web-animation)」によると、全ブラウザ（Chrome、Edge、Firefox、Safari）が対応しています。

書式はシンプル。CSS TransitionsやCSS Animationsなど類似の標準技術よりも、JavaScriptで制御しやすいのが特徴です。

記述例

```
// 要素を取得
const element = document.querySelector(".rect");
element.animate(
  {
    transform: [
      "translateX(0px) rotate(0deg)", // 開始値
      "translateX(800px) rotate(360deg)" // 終了値
    ]
  },
  {
    duration: 3000, // ミリ秒指定
    iterations: Infinity, // 繰り返し回数
    direction: "normal", // 繰り返し挙動
    easing: "ease" // 加減速種類
  }
);
```

-   [実行サンプルを別窓で開く](https://ics-creative.github.io/170216_tween_performance/sample/webanimations.html)
-   [サンプルコードを確認する](https://github.com/ics-creative/170216_tween_performance/blob/main/sample/webanimations.html)

Web Animations APIはHTML要素の機能となるので、WebGL・WebGPUやCanvasには利用できません。

ライブラリではないため容量を気にしなくて良いことがメリットです。パフォーマンスのために採用するというよりは、「ライブラリ非依存で使いたいか」で決めるといいと思います。

### 付録：ライブラリの容量やライセンスについて

概要

ライブラリ名

容量

ライセンス

CDN  
(UMD)

CDN  
(ESM)

npm

WebGL・  
WebGPU

TS型定義

GSAP

72KB

独自（無償）

◯

◯

◯

◯

同梱

Motion

81KB

MIT

◯

◯

◯

◯

同梱

Anime.js

84KB

MIT

◯

◯

◯

◯

同梱

Tween.js

13KB

MIT

◯

◯

◯

◯

同梱

jQuery

88KB

MIT

◯

×

◯

×

@types提供

Web Animations API

\-

\-

\-

\-

\-

×

\-

※容量はファイルサイズを記載（GZIPではありません）

機能

ライブラリ名

タイムライン

React対応

FLIP

スクロール連動

SVGモーフィング

ドラッグ

スタッガー

CSS補間

GSAP

◯

△

◯

◯

◯

◯

◯

◯

Motion

×

◯

◯  
（React）

△

×

◯

◯

◯

Anime.js

◯

△

×

◯

◯

◯

◯

◯

Tween.js

×

×

×

×

×

×

×

×

jQuery

×

×

×

×

×

×

×

×

Web Animations API

×

\-

×

×

×

×

×

\-

参考

-   タイムライン：[GSAP入門（後編） - タイムライン制御やスクロール演出など](https://ics.media/entry/220825/)
-   FLIP : [FLIPアニメーションの原理と基礎](https://ics.media/entry/240902/)
-   スクロール連動：[JavaScriptで作る本格スクロール演出](https://ics.media/entry/210426/)
-   スタッガー：[バラツキのある動き](https://ics.media/entry/220822/#%E3%83%90%E3%83%A9%E3%83%84%E3%82%AD%E3%81%AE%E3%81%82%E3%82%8B%E5%8B%95%E3%81%8D)
-   CSS補完：`x`等の指定を`transform`か`left`に、`rotate`等の指定を`transform`へマッピングするかどうかの意味で記載。

### まとめ：目的に適したライブラリを

実際にどのライブラリを使用するかは目的に合わせるべきだと思います。GSAPは多機能で高性能が魅力で、DOM制御では簡潔に記述できるAnime.jsも良い選択肢といえます。学習コストや将来性、枯れ具合、動作環境、デバッグの行いやすさ、開発環境の充実度などもあわせて、最適なライブラリを選ぶのがいいでしょう。

調べるのが大変という方は、とりあえずGSAPを使うのがオススメでしょうか。**基本的な使い方はどのライブラリも同じなので、1つを学べば他のライブラリに勉強したことを活かせます**。

続編記事「[JSライブラリの性能をDOMとWebGLで比較検証](https://ics.media/entry/14993/)」で各ライブラリのパフォーマンス（同時実行性能）を紹介しています。こちらも合わせてご覧ください。