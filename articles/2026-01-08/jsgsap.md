---
title: "高機能なモーション制作用JSライブラリGSAPを使ったタイムリマップ表現"
source: "https://ics.media/entry/7162/"
publishedDate: "2015-06-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

皆さんはHTMLでモーションを作るときにどのトゥイーンライブラリを使用していますか？ [GSAP](https://gsap.com/)（グリーン・ソック・アニメーション・プラットフォーム）は、Flash全盛時代から存在する歴史あるトゥイーンライブラリです。

**GSAPはCSS/HTML Canvas/WebGLなどさまざまなアニメーション作成に利用できます**。類似トゥイーンライブラリよりも高機能であり、かつ実行パフォーマンスも優れているのが魅力的です。GSAPの詳しい使い方は次の記事で解説しているので、使い方を知りたい方は以下の記事から参照ください。

-   [GSAP入門（前編） - 基本的な使い方](https://ics.media/entry/220822/)
-   [GSAP入門（後編） - タイムライン機能など](https://ics.media/entry/220825/)

この記事では、GSAPのタイムスケールという機能を中心に解説します。

### 作成したモーションデモを紹介

今回はGSAPの機能の1つ「タイムスケール」を使って、3Dの表現を試してみました。まずは次の2つのデモをご覧ください。

▲空間に無数に配置された赤い立方体が落下する演出。落下途中にスローモーションになる。

-   [別ウインドウで再生する](https://ics-creative.github.io/150810_threejs_mosaic/DemoCubes.html)
-   [ソースコードを確認する](https://github.com/ics-creative/150810_threejs_mosaic/blob/master/src/DemoCubes.ts)

![](https://ics.media/entry/7162/images/150601_threejs_mosaic_DemoIcons.jpg)

▲無数のアイコンが四方から集まっていき、最終的にワードの形に配置される。これも演出途中にスローモーションになる。

-   [別ウインドウで再生する](https://ics-creative.github.io/150810_threejs_mosaic/DemoIcons.html)
-   [ソースコードを確認する](https://github.com/ics-creative/150810_threejs_mosaic/blob/master/src/DemoIcons.ts)

デモの制作には[TypeScript 5.8](https://www.typescriptlang.org/)と[Three.js r175](https://threejs.org/)、[gsap 3.12](https://gsap.com/)を使っていますので、手元で試すときは[GitHubのリポジトリ](https://github.com/ics-creative/150810_threejs_mosaic)を参考に環境を準備ください。

### タイムリマップとは

上述のデモはどちらも**再生途中に一瞬スローモーションになりますが、これはタイムリマップ（タイムストレッチやタイムワープ）と呼ばれている演出手法**です。モーションのスピードを変動させスローモーションやクイックモーションを表現しています。考え方は下図の通りで、モーションシーケンスの一部分だけをゆっくり再生させることでその部分だけがスローモーションとなり、全体に緩急のある動きにしあげることができます。

![](https://ics.media/entry/7162/images/150629_timescale_gsap.png)

この手法は[私の個人ブログ](http://clockmaker.jp/blog)で2009年に紹介した次のFlashの手法と同じものです。作り方や考え方は昔とまったく変わっていません。記事「[Flash Stage3Dとの比較から見えてくるWebGLのあり方](https://ics.media/entry/3865/)」でも言及しましたが、Flashの知識はやはりHTML/WebGLでも活用できますね。

-   [ActionScriptでタイムリマップを試してみる](http://clockmaker.jp/blog/2009/07/betweenas3/)
-   [BetweenAS3のトゥイーン制御デモを2本wonderflに投稿](http://clockmaker.jp/blog/2009/07/wonderfl-betweenas3/)

### タイムリマップの作り方

WebGLやHTML5 Canvasといった難しい技術を使わずとも、**シンプルなHTMLでもこのタイムリマップを試すことができます**。簡単なサンプルを通して作り方を紹介しましょう。まずは矩形の`div`要素が画面左側から右側に向かって移動するトゥイーンを作成します。GSAPライブラリの機能の1つ、タイムラインのインスタンスを作成し、`to()`メソッドを使って水平座標と角度をトゥイーンさせています。

```
// "#rect"の参照を取得し、アニメーションを適用
gsap.to("#rect", {
  duration: 2, // 右側に2秒かけて移動するモーションを指定する
  x: 800,
  rotate: 360,
  repeat: -1,
});
```

![](https://ics.media/entry/7162/images/150629_sample_1.gif)

-   [別ウインドウで再生する](https://ics-creative.github.io/150629_tweenmax/sample_1.html)
-   [ソースコードを確認する](https://github.com/ics-creative/150629_tweenmax/blob/master/docs/sample_1.html)

GSAPにはモーションの倍速再生を指定できる`timeScale()`というメソッドが用意されています。試しにこのメソッドへ`2.0`と指定してみましょう。するとモーションが2倍速再生されているのがわかります。

```
// "#rect"の参照を取得し、アニメーションを適用
gsap
  .to("#rect", {
    duration: 2,
    x: 800,
    rotate: 360,
    repeat: -1,
  })
  .timeScale(2.0); // 2倍速再生にする(早送りとなる)
```

![](https://ics.media/entry/7162/images/150629_sample_2.gif)

-   [別ウインドウで再生する](https://ics-creative.github.io/150629_tweenmax/sample_2.html)
-   [ソースコードを確認する](https://github.com/ics-creative/150629_tweenmax/blob/master/docs/sample_2.html)

この倍速再生の制御ができる`timeScale()`メソッドを工夫すればタイムリマップ表現が実現できます。トゥイーンの特定の時間へ到達したときに`call()`メソッドを使ってコールバック関数を仕込むことができます。このコールバック関数を使って、倍速再生速度を何度か変えてみましょう。

```
// タイムラインを作成する
const tl = gsap.timeline({ repeat: -1 });
// 右側に2秒かけて移動するモーションを指定する
tl.add(gsap.to("#rect", 2.0, { x: 800, rotate: 360 }));
// 本来のタイムラインの0.25秒の地点まで到達したら
tl.call(
  () => {
    // 0.1倍速再生にする(スローモーションとなる)
    tl.timeScale(0.1);
  },
  null,
  0.25
);
// 本来のタイムラインの0.50秒の地点まで到達したら
tl.call(
  () => {
    // 1.0倍速再生にする(通常再生速度となる)
    tl.timeScale(1.0);
  },
  null,
  0.5
);
```

![](https://ics.media/entry/7162/images/150629_sample_3.gif)

-   [別ウインドウで再生する](https://ics-creative.github.io/150629_tweenmax/sample_3.html)
-   [ソースコードを確認する](https://github.com/ics-creative/150629_tweenmax/blob/master/docs/sample_3.html)

あっけなく仕上がってしまいましたね。

プログラムによってタイムリマップを実現する最大のメリットはフレームレートが落ちないという点です。どんなに微小時間をスローモーションで再生しても、スクリプトによってコマが生成され、ハイスピードカメラで撮影したように微細な動きまでもが再現されます。GSAP 2からnpmで管理できるようになったので、モダンなフロントエンド開発にも役立ちます。詳しくは記事「[ES Modules対応のgsapの使い方 - Qiita](https://qiita.com/clockmaker/items/4517892a0160282edf24)」を参照ください。

### 最後に

冒頭のデモでは「タイムリマップ」と「3次元（任意プロパティ）のベジェトゥイーン」を実現するにあたりCreateJSでは実現できなかったためGSAPを採用しました。現在採用中のトゥイーンライブラリに不足を感じたら、GSAPを検討してみてはいかがでしょうか？　次の記事で各種トゥイーンライブラリの機能の違いや、性能比較をしています。あわせてご覧ください。

-   [ウェブのアニメーション制作に役立つ！ 流行りのJSライブラリのまとめ](https://ics.media/entry/14973/)
-   [JSライブラリの性能をDOMとWebGLで比較検証](https://ics.media/entry/14993/)
-   [GSAP入門（前編） - 基本的な使い方](https://ics.media/entry/220822/)
-   [GSAP入門（後編） - タイムライン機能など](https://ics.media/entry/220825/)
-   [最強のアニメーションライブラリ GSAP 3](https://ics.media/entry/200805/)

※この記事が公開されたのは**10年前**ですが、**9か月前の2025年4月**に内容をメンテナンスしています。