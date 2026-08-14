---
title: "GSAP入門(第3回) - ScrollTrigger・MotionPath・FLIP・テキストモーション"
source: "https://ics.media/entry/220826/"
publishedDate: "2022-08-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

[GSAPジーサップ](https://gsap.com/)入門の第3回では、強力なプラグインを紹介します。

### スクロール制御

スクロールと連動して制御するにはGSAPのプラグイン「[ScrollTriggerスクロール・トリガー](https://gsap.com/docs/v3/Plugins/ScrollTrigger)」を利用します。ScrollTriggerはGSAPの目玉機能でもあり、クリエイティブ系のウェブサイトで頻繁に利用されています。

次のサンプルで、下部方向にスクロールしてみてください。ビューポートにはいってきたときに、段落が流れるように出現します。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/scrollTrigger/example_2.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/scrollTrigger/example_2.html)

ScrollTriggerを使えば、要素がビューポートに入ってきたら再生する、といった演出を手軽に作れます。ビューポートに入ってきたら何か処理をするなら『[Intersectionインターセクション Observerオブザーバー](https://ics.media/entry/190902/)』を想像されると思いますが、ScrollTriggerだともっと複雑なことも制御できます。

ScrollTriggerでできること

-   発火タイミングの指定
-   再発火のルールの指定（再生後にもう一度再生するか等）
-   スクロール中に要素を固定するかの指定
-   スクロール量とアニメーション進捗の連動（スクラブ）

#### スクロールトリガーの使い方

シンプルな実装例は以下の通りです。

`script`タグで取り込む場合はCDNからプラグインを読み込みます。

```
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
```

npmの場合は『[GreenSock | Docs | Installation](https://gsap.com/docs/v3/Installation?checked=core,requireSyntax#esModules)』を参考ください。

![](https://ics.media/entry/220826/images/images/220822_gsap_install_scrollTrigger.png)

JavaScriptでは`gsap.registerPlugin()`メソッドでプラグインを登録します。プラグイン登録はJavaScriptの実行時に1回だけでよいので、何度も`gsap.registerPlugin()`を呼び出さないようにしましょう。

```
// プラグインを登録
gsap.registerPlugin(ScrollTrigger);
```

使いたい箇所で、`scrollTrigger`プロパティーを指定します。

```
// 演出対象となる要素を取得
gsap.utils.toArray("section").forEach((el) => {
  gsap.from(el, {
    x: 128,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    // スクロールトリガーの設定
    scrollTrigger: {
      trigger: el, // 対象物
    },
  });
});
```

実行結果は以下の通りです（先述のデモよりも演出をシンプルにして、コードを短くしています）。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/scrollTrigger/example_1.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/scrollTrigger/example_1.html)

ScrollTriggerの詳しい解説は当サイトの記事『[トレンドウェブサイトから学べ！　JavaScriptで作る本格スクロール演出](https://ics.media/entry/210426/)』を参照ください。

#### コラム： CSSのスクロール駆動アニメーションとは何が違うか

Chrome・Edge・Safariには「スクロール駆動アニメーション（Scroll-driven Animations）」という機能があります。

-   [CSSだけでスクロールアニメーションが作れる！？ 新技術Scroll-driven Animationsとは - ICS MEDIA](https://ics.media/entry/230718/)

スクロール駆動アニメーションは、JavaScriptライブラリを使わずにCSSだけでスクロールアニメーションを作れます。GSAPのScrollTriggerは、ピン留めやスナップ、コールバック等をJavaScriptで組み合わせて制御できる点が異なります。

### 曲線上に動かす

曲線を扱うようなトゥイーンにはGSAPのプラグイン「[MotionPathPluginモーション・パス・プラグイン](https://gsap.com/docs/v3/Plugins/MotionPathPlugin)」を利用します。

SVGのパスにそって移動させられます。パスにそって回転している点が見どころです。

```
// プラグインを登録
gsap.registerPlugin(MotionPathPlugin);

gsap.to("#rect", {
  duration: 3,
  ease: "power4.inOut",
  // パスを指定
  motionPath: {
    // SVGのパスに沿って移動
    path: "#path",
    align: "#path",
    autoRotate: true,
    alignOrigin: [0.5, 0.5],
  },
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/motionpath.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/motionpath.html)

任意のパラメーターに対してもカーブのきいたトゥイーンを作成できます。個人的には先述のSVGのパスより、この目的でMotionPathPluginをよく使います。XY座標だけでなく、さまざまなプロパティーに対してカーブをつけられることがポイントです。

```
// プラグインを登録
gsap.registerPlugin(MotionPathPlugin);
// （抜粋）
// 一緒くたに移動
const list = gsap.utils.toArray(".rect");
list.forEach((rect, index) => {
  gsap.fromTo(
    rect,
    {
      x: "-40vw",
      scale: 0.0,
    },
    {
      duration: 2 + Math.random() * 3,
      repeat: -1,
      ease: "power1.inOut",
      x: "40vw",
      motionPath: [
        { y: (Math.random() - 0.5) * 20 + "vh", scale: 1 },
        { y: (Math.random() - 0.5) * 50 + "vh", scale: 0 },
      ],
      delay: Math.random(),
    },
  );
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/motionpath_bezier.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/motionpath_bezier.html)

### モーションパスプラグインの導入方法

MotionPathはプラグインの登録が必要です。CDNの場合は次のように記述します。

```
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/MotionPathPlugin.min.js"></script>
```

npmの場合は、gsap本体に含まれていますが、ES Modulesの`import`文に注意ください。[Install Helper](https://gsap.com/docs/v3/Installation?checked=core,motionPath,requireSyntax#modules)を参考にするといいでしょう。

![](https://ics.media/entry/220826/images/images/220822_gsap_install_motionpath.png)

### FLIPプラグイン

FLIPは「First、Last、Invert、Play」の頭文字を取った、レイアウト変更の前後を滑らかにつなぐ手法です。GSAPの[Flipプラグイン](https://gsap.com/docs/v3/Plugins/Flip/)では、変更前の位置や大きさを`Flip.getState()`メソッドで記録し、DOMやCSSを変更したあとに`Flip.from()`メソッドでアニメーションできます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260123_flip_layout/gsap.html)
-   [ソースコードを確認する](https://github.com/ics-creative/260123_flip_layout/blob/main/gsap.html)

詳しくは記事『[JavaScriptで実現するFLIPアニメーションの原理と基礎](https://ics.media/entry/240902/)』を参照ください。

### テキストモーション

GSAPにはテキストモーションに特化したプラグインも用意されています。ここでは3種類のプラグインを紹介します。

※一部のプラグインはもともと有償でしたが、現在のGSAPでは無償で利用できます。

#### TextPluginで1文字ずつ表示する

[TextPlugin](https://gsap.com/docs/v3/Plugins/TextPlugin/)は、DOM要素のテキストを徐々に置き換えます。空の要素を対象にすると、1文字ずつ入力するように表示できます。

```
gsap.registerPlugin(TextPlugin);

gsap.to(".demo", {
  duration: 1,
  text: "テキストが一文字ずつ表示されます",
  ease: "none",
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/text_textplugin.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/text_textplugin.html)

#### SplitTextで文字・行ごとに動かす

[SplitText](https://gsap.com/docs/v3/Plugins/SplitText/)は、テキストを文字・単語・行の単位に分解します。次の作例では各文字にマスクを適用し、`yPercent`と`stagger`で左から順に表示します。

```
gsap.registerPlugin(SplitText);

const split = SplitText.create(".demo", {
  mask: "chars",
});

gsap.from(split.chars, {
  yPercent: 100,
  duration: 0.75,
  ease: "power4.out",
  stagger: 0.04,
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/text_splittext.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/text_splittext.html)

行単位の場合は`type: "lines"`と`mask: "lines"`を指定し、`split.lines`を動かします。

```
const split = SplitText.create(".demo", {
  type: "lines",
  mask: "lines",
});

gsap.from(split.lines, {
  yPercent: 100,
  duration: 1,
  ease: "power4.out",
  stagger: 0.2,
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/text_splittext_lines.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/text_splittext_lines.html)

#### ScrambleTextPluginで文字をスクランブル表示する

[ScrambleTextPlugin](https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/)は、ランダムな文字から本来の文字列を徐々に表示します。`scrambleText: "{original}"`では、要素の元のテキストへ収束します。

```
gsap.registerPlugin(ScrambleTextPlugin);

gsap.to(".demo", {
  duration: 1,
  scrambleText: "{original}",
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/text_scrambletext.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/text_scrambletext.html)

### まとめ

GSAPのプラグインは、魅力的な演出を少ないコードで実現できる点で魅力的です。プラグインを使うと、演出のアイデアまで広がるのがおもしろいと感じます。

続く[第4回](https://ics.media/entry/220827/)では、トゥイーンの高度な制御やユーティリティー関数などを解説します。

※この記事が公開されたのは**3年前**ですが、**今月8月**に内容をメンテナンスしています。

このシリーズの記事 3 / 5

[](https://ics.media/entry/220822/)[](https://ics.media/entry/220825/)[](https://ics.media/entry/220827/)[](https://ics.media/entry/7162/)

-   [前の記事![](https://ics.media/entry/220825/images/eyecatch_260814__480.png)GSAP入門(第2回) - タイムライン](https://ics.media/entry/220825/)
-   [次の記事 ![](https://ics.media/entry/220827/images/eyecatch_260814__480.png)GSAP入門(第4回) - 高度な制御とユーティリティーを使いこなそう](https://ics.media/entry/220827/)