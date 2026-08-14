---
title: "GSAP入門(第4回) - 高度な制御とユーティリティーを使いこなそう"
source: "https://ics.media/entry/220827/"
publishedDate: "2022-08-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

[GSAPジーサップ](https://gsap.com/)入門の第4回では、透明度の指定、トゥイーンの高度な制御、実装を補助するユーティリティー関数を紹介します。

### 透明度の変化

CSSの透明度を変化させたい場合は、`opacity`を使います。`alpha`も透明度のショートハンドとして利用できます。

```
gsap.to(".rect", {
  opacity: 0
})
```

`autoAlpha`プロパティーを使うと、透明度が`0`のときは自動的にCSSで`visibility: hidden`にしてくれます。透明度の`0`の状態だとテキスト選択ができたり、スクリーンリーダーの読み上げの対象となるので、登場しない状態にしたいときは`autoAlpha`を指定すると便利です。

```
gsap.to(".rect", {
  autoAlpha: 0
})
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/to_opacity.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/to_opacity.html)

▼`opacity`の変化に応じて`visibility`も連動。

![](https://ics.media/entry/220827/images/images/220822_gsap_autoAlpha.gif)

### 相対値の指定

`gsap.to()`で変化させたい値に対して、`"+=数値"`や`"-=数値"`等の文字列で指定できます。

```
// 現在の値から+30加算する指定
gsap.to(".example-scale .rect", {
  rotate: "+=30",
  duration: 1,
});

// 現在の値から色相を45度減らす指定
gsap.to(".example-color .rect", {
  backgroundColor: "hsl(-=45, 50%, 50%)",
  duration: 0.3,
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/to_relative.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/to_relative.html)

相対的な指定は挙動が不安定になりがちなので、筆者はほとんど使わないのですが、GSAPの機能として頭の片隅に入れておくといいでしょう。

### トゥイーンのコールバック

トゥイーンのタイミングはコールバック関数で監視可能です。開始したとき、更新が走ったとき、完了したときは以下のように指定します。

```
// コールバックの指定
gsap.to(".rect", {
  x: 200,
  duration: 2,
  onStart: () => {
    console.log("start");
  },
  onUpdate: () => {
    console.log("update");
  },
  onComplete: () => {
    console.log("complete");
  },
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/callback.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/callback.html)

※デモはコンソールを出力しているため、開発者ツールのコンソールパネルで出力を確認ください。

他にも中断したとき（`onInterrupt`）、繰り返したとき（`onRepeat`）等のイベントもあります。詳しくは[ドキュメント](https://gsap.com/docs/v3/GSAP/gsap.to\(\))を参考ください。

### オブジェクトをトゥイーン

GSAPでトゥイーンできるのはDOM要素だけではなく、**任意のオブジェクトもトゥイーンの対象にできます**。たとえば、円周を移動するようなモーションを考えてみましょう。管理したいのは回転の値だとすれば、`radian`を含むオブジェクトを作成します。

```
const params = { radian: 0 };
```

`params`オブジェクトをトゥイーンするとして、前節で紹介した`onUpdate`コールバックを使います。`onUpdate`コールバックの中で`radian`の値からXY座標を計算します。XY座標は別のHTML要素に適用することで、円周の座標を適用できました。

```
const params = { radian: 0 };

gsap.to(params, {
  radian: Math.PI * 2,
  duration: 2,
  ease: "power4.inOut",
  onUpdate: () => {
    const { radian } = params;
    // 直交座標を計算
    const x = Math.cos(radian) * 100;
    const y = Math.sin(radian) * 100;
    gsap.set(".circle", { x, y }); // 座標を適用
  },
  repeat: -1,
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/onUpdate.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/onUpdate.html)

筆者としては、Three.jsやPixiJSで制御するときに中間オブジェクトをトゥイーンさせる作り方をすることが多いです。とくに3Dのカメラ座標の管理に役立ちます。

### オーバーライト

新しくトゥイーンを開始させるとき、すでにそのオブジェクトがトゥイーン中だったら、トゥイーンを上書きするオーバーライトという機能があります。

たとえばボタンのホバー挙動を考えてみましょう。`mouseover`のトゥイーンが再生中に、`mouseout`となり新しいトゥイーンを再生させたとします。すると、前者のトゥイーンは後者のトゥイーンによって優先されるので、違和感なく再生されるように思えます。しかし、トゥイーンの作り方によっては、不自然な表示になる可能性があります。

次のデモを確認しましょう。`overwrite`の指定有無でどのような違いがあるか確認できます。ボタンのホバーを高速に繰り返すと、画面上部のボタンの表示がおかしくなります。マウスオーバーのトゥイーンより、マウスアウトのトゥイーンが先に終わると、もともと実行されていたマウスオーバーのトゥイーンの残りが適用されてしまうのです。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/overwrite.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/overwrite.html)

解決するにはオーバーライトの指定を有効にします。

```
gsap.to(element, {
  scale: 1.2,
  duration: 0.5,
  overwrite: true, // オーバーライトの指定
});
```

-   `true`の場合、同じターゲットのすべてのトゥイーンが、どのプロパティに影響を与えるかに関係なく、即座に停止します。
-   `auto`の場合、トゥイーンがはじめてレンダリングする際に、アクティブなモーション（同じターゲットの同じプロパティ）の競合を突き止め、他のトゥイーンの競合部分のみを停止します。重複していない部分はそのまま残ります。
-   `false`の場合、上書きは行われません。

デフォルトは`false`なので、動きがバッティングすると思ったら`"auto"`か`true`に指定します。

オーバーライトは多くのトゥイーンライブラリに実装されており、重要な機能のひとつと言えます。

-   参考ドキュメント：[Handling conflicting tweens - Learning Center - GreenSock](https://gsap.com/resources/conflict/)

### quickSetter

マウスストーカーの実装にもGSAPが役立ちます。頻繁に更新するようなケースでは`gsap.quickSetter()`メソッドを利用します。これの最小限の実装コードは以下の通りです。

```
// 要素を取得
const circle = document.querySelector(".circle");
const xSet = gsap.quickSetter(circle, "x", "px");
const ySet = gsap.quickSetter(circle, "y", "px");

window.addEventListener("mousemove", (event) => {
  xSet(event.x);
  ySet(event.y);
});
```

次のサンプルでは、ボタンに触れるときだけマウスストーカーが大きくなる演出を加えています。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/mouse_stalker.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/mouse_stalker.html)

### 便利なユーティリティー関数

GSAPにはさまざまな[ユーティリティー関数](https://gsap.com/docs/v3/GSAP/UtilityMethods)が提供されています。

関数名

説明

例

[clamp()](https://gsap.com/docs/v3/GSAP/UtilityMethods/clamp\(\))

値を指定した範囲内に制限

`clamp(0, 100, -12)`  
→ `0`

[getUnit()](https://gsap.com/docs/v3/GSAP/UtilityMethods/getUnit\(\))

文字列から単位を取得

`getUnit("30px")`  
→ `"px"`

[interpolate()](https://gsap.com/docs/v3/GSAP/UtilityMethods/interpolate\(\))

2つの値を補間。色にも対応

`interpolate("red", "blue", 0.5)`  
→ `"rgba(128,0,128,1)"`

[mapRange()](https://gsap.com/docs/v3/GSAP/UtilityMethods/mapRange\(\))

ある範囲を別の範囲へマッピング

`mapRange(-10, 10, 0, 100, 5)`  
→ `75`

[normalize()](https://gsap.com/docs/v3/GSAP/UtilityMethods/normalize\(\))

範囲内の数値を0〜1に正規化

`normalize(100, 200, 150)`  
→ `0.5`

[pipe()](https://gsap.com/docs/v3/GSAP/UtilityMethods/pipe\(\))

関数を連結し、各結果を次の関数へ渡す

`pipe(clamp(0, 100), snap(5))(8)`  
→ `10`

[random()](https://gsap.com/docs/v3/GSAP/UtilityMethods/random\(\))

パラメーターから乱数を生成。配列からランダムに要素を選択

`random(["red", "green", "blue"])`  
→ `"red"`（一例）

[shuffle()](https://gsap.com/docs/v3/GSAP/UtilityMethods/shuffle\(\))

配列の中身を破壊的にシャッフル

`shuffle([1, 2, 3, 4, 5])`  
→ `[4, 2, 1, 5, 3]`（一例）

[snap()](https://gsap.com/docs/v3/GSAP/UtilityMethods/snap\(\))

指定した増分の倍数、または配列内のもっとも近い値へスナップ

`snap(5, 13)`  
→ `15`

[splitColor()](https://gsap.com/docs/v3/GSAP/UtilityMethods/splitColor\(\))

色をRGB成分に分割。第2引数に`true`を指定するとHSLへ変換

`splitColor("red")`  
→ `[255, 0, 0]`

[toArray()](https://gsap.com/docs/v3/GSAP/UtilityMethods/toArray\(\))

配列風の値やセレクターを配列に変換

`toArray(".class")`  
→ `[element1, element2]`

[wrap()](https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap\(\))

範囲を超えた値を先頭へ折り返す

`wrap(5, 10, 12)`  
→ `7`

[wrapYoyo()](https://gsap.com/docs/v3/GSAP/UtilityMethods/wrapYoyo\(\))

範囲を超えた値をyoyo状に折り返す

`wrapYoyo(5, 10, 12)`  
→ `8`

自前でコードを書ける方にとっては、数値計算のユーティリティー関数は目新しくないでしょう。しかし、色に関するユーティリティー関数は強力だと思います。たとえば、`interpolate()`は中間色を算出できます。

```
const value4 = gsap.utils.interpolate(
  "red", // 色の名前
  "rgb(0, 0, 255)", // rgb記法
  0.5, // 50%の数値を算出
); // rgba(128,0,128,1)
```

#### selector()

`gsap.utils.selector()`メソッドを使うと、特定の要素内だけを検索できます。

```
const container = document.querySelector(".container");
const q = gsap.utils.selector(container);

gsap.to(q(".box"), {
  x: 100,
  stagger: 0.1,
});
```

#### ReactでuseGSAP()を利用

Reactでは、`@gsap/react`パッケージの`useGSAP()`を利用できます。`scope`に`useRef()`の参照を渡すと、コールバック内の文字列セレクターを対象要素の配下に限定できます。また、コンポーネントのアンマウント時には、作成したGSAPアニメーションが自動的にクリーンアップされます。

```
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Box = ({ children }) => <div className="box">{children}</div>;
const Container = () => (
  <div>
    <Box>Nested Box</Box>
  </div>
);

const App = () => {
  const el = useRef(null);

  useGSAP(
    () => {
      gsap.to(".box", {
        x: 100,
        stagger: 0.33,
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
      });
    },
    { scope: el },
  );

  return (
    <div className="app" ref={el}>
      <Box>Box</Box>
      <Container />
      <Box>Box</Box>
    </div>
  );
};
```

参考記事：[Getting Started with GSAP + React. - Learning Center - GreenSock](https://gsap.com/resources/React/)

### 他ライブラリとの連携

GSAPはCanvas・WebGL関連の表現系ライブラリとの相性がよく、柔軟に制御できます。自作のデモを最後に紹介します。

[PixiJS](https://pixijs.com/)とGSAPの連携デモ。

![](https://ics.media/entry/220827/images/images/220825_gsap_pixijs.gif)

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle.html)

[Three.js](https://threejs.org/)とGSAPの連携デモ。

-   [別タブで再生する](https://ics-creative.github.io/150810_threejs_mosaic/DemoCubes.html)
-   [ソースコードを確認する](https://github.com/ics-creative/150810_threejs_mosaic/blob/main/src/DemoCubes.ts)

### GSAPのライセンス（100%無料）

GSAPは商用利用も含め100%無料です。以前は、特定の用途では有料ライセンスが必要でしたが、2025年4月よりボーナスプラグインも含めて無料利用できます。詳しくは公式サイトの次のページをご覧ください。

-   [Pricing | GSAP](https://gsap.com/pricing/)
-   [Standard “No Charge” GSAP License](https://gsap.com/community/standard-license/)
-   [3.13 release](https://gsap.com/blog/3-13/)

### まとめ

GSAPはクリエイティブ系のウェブサイトを作るときに重宝します。本記事で紹介した機能は、たくさん存在する機能の一部です。ぜひともGSAPを使いこなして、よりよいコンテンツの制作に役立てましょう。

### 余談

Flash向けのTweenMaxが公開された2008年から数えると、GSAPの歴史は2026年で18年になります。GSAPの機能の根幹は、当時普及していたActionScriptのライブラリ「[Tweener](https://zehfernando.com/2007/introducing-caurinatransitionstweener/)」にも面影が見られます。技術評論社のサイトにTweenerを紹介した記事があるので、読み返すと懐かしさを感じます。

-   [第6回　動きのある Flash を作る（後編） | gihyo.jp](https://gihyo.jp/dev/feature/01/flash-sdk/0006)（2008年）

プラットフォームとしての技術は変われど、時代を超えてDNAが受け継がれているように思いました。

※この記事が公開されたのは**3年前**ですが、**今月8月**に内容をメンテナンスしています。

このシリーズの記事 4 / 5

[](https://ics.media/entry/220822/)[](https://ics.media/entry/220825/)[](https://ics.media/entry/220826/)[](https://ics.media/entry/7162/)

-   [前の記事![](https://ics.media/entry/220826/images/eyecatch_260814__480.png)GSAP入門(第3回) - ScrollTrigger・MotionPath・FLIP・テキストモーション](https://ics.media/entry/220826/)
-   [次の記事 ![](https://ics.media/entry/7162/images/eyecatch__480.jpg)高機能なモーション制作用JSライブラリGSAPを使ったタイムリマップ表現](https://ics.media/entry/7162/)