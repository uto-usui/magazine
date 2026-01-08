---
title: "フロントエンドから始めるアニメーション 最強のライブラリGSAPを手に入れよう"
source: "https://ics.media/entry/200805/"
publishedDate: "2020-08-05"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

今日では、ほぼすべてのウェブサイトにアニメーションが使われていると言っても過言ではないでしょう。派手な3Dアニメーションから、UIのマイクロインタラクションまで、その物量や時間のスケールはさまざまです。

アニメーション技術もCSSやSVG、Canvasと多岐に渡り、こんな表現まで！？　と驚くようなものも増えました。

しかし、複雑なアニメーションになるほどコードは煩雑になり人間の手には負えなくなります。イメージはあるのに具現化できない！　そんな悔しい思いを抱えたまま諦めるしかないのでしょうか？　いえ、道具です。道具を使うのです。本記事ではイメージをダイレクトに表現する手段としてのアニメーションライブラリ**GSAP**について紹介します。

本記事を読むことで、以下の知識が手に入ります。

-   ウェブにおけるアニメーションの重要性
-   アニメーションライブラリとは？
-   強力なアニメーションライブラリGSAPのメリットや使い方

### そもそもなぜアニメーションが必要か？

アニメーションはウェブサイトにとって必ずしも必要なものではありません。ですが冒頭で述べたように多くのウェブサイトにアニメーションが実装されています。なぜでしょう？　大きく以下の2つの理由が考えられます。

1.  演出としてアニメーションそのものを目的としているもの
2.  ユーザーの視線を誘導するもの

前者はサイトの雰囲気作りとも言い換えられるでしょう。スピーディーで直線的な動きの多いサイトはクールな印象を与えますし、弾むようなアニメーションが多いサイトは愉快な気持ちになります。

後者については下のアニメーションをご覧ください。細かな注意書きがなくても、デザイナーの意図したとおりに視線が誘導されてしまいますね。

ICS MEDIAでもアニメーションに関する記事を発信してきました。以下はその一例になります。

-   [GSAPを使ったタイムリマップ表現](https://ics.media/entry/7162/)
-   [マイクロインタラクションを作るためのズルいAdobe CC活用テクニック](https://ics.media/entry/19498/)
-   [現場で使えるアニメーション系JSライブラリまとめ](https://ics.media/entry/14973/)

### なぜアニメーションライブラリを使うか？

ウェブでアニメーションを実行するのに一番シンプルな方法は、CSSアニメーションでしょう。たしかにCSSアニメーションだけでもかなりクオリティの高いものは作れます。ではなぜあえてJavaScriptでアニメーションライブラリを使う必要があるのでしょう？

#### 1\. インタラクティブなアニメーションを実現するため

クリック、スクロールといったイベントに連動した操作はJavaScriptの大得意とするところです。

#### 2\. 複雑なアニメーションを書きやすくするため

アニメーションする対象が多かったり、動きの多いアニメーションをCSSで記述しようとすると難しい、あるいは不可能になる場合があるでしょう。しかし、ライブラリを用いるとシンプルに、最適化されたアニメーションが実現可能になるのです。

#### 3\. 便利なプラグインやユーティリティ関数によって拡張しやすくするため

ライブラリの中にはアニメーションを実装するための便利な関数やプラグインを持つものもあります。うまく活用すればアニメーションの引き出しを増やすことにも繋がります。

### GSAPとは？

本記事で紹介するアニメーションライブラリ、[GSAP](https://gsap.com/)（**G**reen**S**ock **A**nimation **P**latform）はGreenSock社が開発した高機能アニメーションライブラリです。**2019年11月にGSAP 2からGSAP 3に移行**しました。

従来はTweenLite, TweenMax, TimelineLite, TimelineMaxとライブラリが分割されていましたが、軽量化によりひとつになりシンプルな記述が可能になりました。軽量かつ多機能、豊富なプラグインなどの特徴があり世界中で用いられています。

GSAP 2からの変更点はこちらにまとめられているので気になる方は見てみましょう。

-   [GSAP 3 Release Notes](https://gsap.com/blog/3-release-notes/)

### アニメーションの実装

GSAPを用いて実際にアニメーションを作成します。今回は2つのデモを通じて以下のことを学びます。

-   シンプルなアニメーションの実装
-   Timelineを用いた連続的なアニメーション
-   ScrollTriggerを例としたプラグインの使い方

まずはこちらのデモを作成します。

![デモ](https://ics.media/entry/200805/images/200805_gsap3_demo.webp)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200702_GSAP3/dist)
-   [ソースコードを確認する](https://github.com/ics-creative/200702_GSAP3/blob/master/src/main.ts)

このデモはTypeScript(ver3.9)で記述してあります。環境構築でお困りの方は以下の記事を参考にしてください。

-   [『最新版TypeScript+webpack 4の環境構築まとめ(React, Vue.js, Three.jsのサンプル付き)』](https://ics.media/entry/16329/)

大抵のアニメーションはシンプルな動きの組み合わせでできています。デモのアニメーションをひとつひとつ紐解くと、以下の要素に分解できました。

-   ヘッダー：クリック→四角形になる。色が変わる。ページの上部に移動する。
-   タイトル：ヘッダーのクリックにより出現（透明度が1になる）
-   画像：ヘッダーのクリックにより順番に出現。出現時に少し上に移動する。

![実装するアニメーションの説明](https://ics.media/entry/200805/images/200805_gsap3_animation_description.png)

GSAPによる記法の紹介を交えつつ実装していきます。

#### ヘッダーのアニメーション

```
const tween = gsap.to("header", {
  duration: 0.5, // アニメーションの時間
  paused: true, // 勝手にアニメーションが始まらないように
  ease: "power2.out", // イージング
  // アニメーションの終点
  top: 0,
  // ----省略----
});

document.querySelector("header").addEventListener("click", tween.play());
```

```
<header>
  <h1>title</h1>
</header>
```

```
header {
  /*アニメーション前のスタイル*/
}
```

`gsap.to`内にアニメーション後の状態を記述すると、第一引数に指定した値がなめらかに遷移します。生成されるインスタンスはTweenと呼ばれます。

今回はクリック時に`tween`インスタンスを再生する処理を記述しました。オプションには

-   `duration`：アニメーション時間
-   `delay`：実行から再生までの待ち時間
-   `ease`：イージング

などのプロパティを設定できます。標準で用意されているイージングのバリエーションの多さもGSAPの魅力の一つです。[GreenSock Ease Visualizer](https://gsap.com/docs/v3/Eases)では実際の動きを見ながらイージングを確認できます。直感的なアニメーション作成にもってこいのコンテンツです。

![GreenSock Ease Visualiser](https://ics.media/entry/200805/images/200805_gsap3_ease.png)

#### 複数の要素のアニメーション

順番に画像が出てくる部分のアニメーションを実装します。

![staggerの説明](https://ics.media/entry/200805/images/200805_gsap3_stagger.webp)

```
<div>
  <img src="https://picsum.photos/seed/1/200/300" alt="" />
  <img src="https://picsum.photos/seed/2/200/300" alt="" />
  <img src="https://picsum.photos/seed/3/200/300" alt="" />
</div>
```

複数の要素を順番にアニメーションさせるとき、CSSのみの実装を考えるとなかなか大変そうですね。GSAPでは`stagger`プロパティによって簡単に実装できます。以下が実装例になります。

```
// img要素をまとめてアニメーションさせる
gsap.to("img", {
  delay: 1,
  duration: 1.5,
  y: -10, // 少し上に移動させる
  opacity: 1,
  ease: "power2.out",
  // 複数要素を扱うプロパティ
  stagger: {
    from: "start", //左側から
    amount: 0.8, // 0.8秒おきに
  },
});
```

それぞれの`img` 要素を1.5秒かけて表示するアニメーションですが、特筆すべきは`stagger`プロパティです。これにより第一引数に指定した`img`属性をもつ要素は同時にアニメーションせず、順番にアニメーションしてくれます。

#### timelineによる、つながるアニメーション

次は別のデモを作成しつつ`timeline`プロパティについて説明します。まずは作成するアニメーションを見てみましょう。

![ローディングアニメーション](https://ics.media/entry/200805/images/200805_gsap3_loading.gif)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200702_GSAP3/dist/loading)
-   [ソースコードを確認する](https://github.com/ics-creative/200702_GSAP3/blob/master/src/loading.ts)

2つの四角形が時間経過にしたがって移動しています。ここまでに学習したプロパティで作るとどうなるでしょう？

下の画像に図示してみました。ここで問題になるのはdelayの計算です。「アニメーションが開始して0.5秒delayをかけて左右に移動、さらに0.5秒後右に移動するからdelayは1.0で……」と計算しながらやるのは煩雑で面倒ですよね。

![timelineのメリットの説明](https://ics.media/entry/200805/images/200805_gsap3_timeline.png)

gsapには連続したアニメーションに対応した`timeline`メソッドがあります。GSAP 2以前ではTimelineLite, TimelineMaxと独立したライブラリでしたが、GSAPになり統合されました。先ほどのアニメーションを記述するとこのようになります。

```
// timelineを作成
const tl = gsap.timeline({
  repeat: -1, // アニメーションの繰り返し回数。-1で無限回
  repeatDelay: 0.3, // ループとループの間の時間
  defaults: { duration: 0.5, ease: "power4.out" }, // tweenのデフォルトの値
});

// アニメーションを実行
tl.from(".box", {
  scale: 0,
})
  .to(".box1", {
    left: 50,
  })
  .to(
    ".box2",
    {
      right: 50,
    },
    "<",
  ) // "<"は「前のアニメーションと同時に再生する」オプション
  .to(".box", {
    scale: 0,
  });
```

```
<div class="boxes">
  <div class="box box1"></div>
  <div class="box box2"></div>
</div>
```

```
.boxes {
  position: relative;
  width: 100px;
  height: 100px;
}
.box {
  position: absolute;
  width: 50px;
  height: 50px;
  background: limegreen;
}
/*左上*/
.box1 {
  top: 0;
  left: 0;
}
/*右下*/
.box2 {
  bottom: 0;
  right: 0;
}
```

このように次の状態のプロパティを次々つなげるだけで連続したアニメーションが完成します！　コメントにも記載したように第三引数に`"<"`など与えることで前後のアニメーションとの間隔が調節できます。詳しくは[Timelineのドキュメント](https://gsap.com/docs/v3/GSAP/Timeline/)を参照ください。

### プラグインの紹介

GSAPには魅力的なプラグインが数多くあります！　すべて無料であり、[Draggable](https://gsap.com/docs/v3/Plugins/Draggable/)やパスに沿ったアニメーションを簡単に記述できる[MotionPathPlugin](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/)といった役に立つプラグインがたくさんあります。

中でも2020年6月に登場した[ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)は強力です！ ScrollTriggerは名前の通りスクロールイベントを検知しアニメーションを発火させるプラグインになります。上記のリンクにはたくさんの活用例があります。

デモ中では、スクロール時の画像の表示に用いています。

![scroll](https://ics.media/entry/200805/images/200805_gsap3_scroll.webp)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200702_GSAP3/dist)
-   [ソースコードを確認する](https://github.com/ics-creative/200702_GSAP3/blob/master/src/main.ts)

以下は該当部分のソースコードです。

```
// プラグインを登録
gsap.registerPlugin(ScrollTrigger);

gsap
  .timeline({
    defaults: { ease: "power2.out", duration: 1 }, // timelineのプロパティ
    scrollTrigger: {
      markers: true, // マーカーを表示するか（開発用）
      trigger: ".content", // この要素と交差するとイベントが発火
      start: "top 50%", // ウィンドウのどの位置を発火の基準点にするか
      end: "bottom top", // ウィンドウのどの位置をイベントの終了点にするか
      toggleActions: "restart none none none", // スクロールイベントで発火するアニメーションの種
    },
  })
  .to(".content-text h2", {
    opacity: 1,
    y: -10,
  })
  .to
  // ----省略----
  ();
```

ScrollTriggerをタイムライン中で使う例としてコードを解説します。

1.  プラグインを使用する際は、`gsap.registerPlugin`で登録する必要があるため、コードの頭で記述します。
    
2.  `gsap.timeline`のオプションとして`scrollTrigger`を設定します。
    
3.  `trigger`で要素イベントを発火させる要素を設定します。今回は`.content`クラスを持つ要素です。
    
4.  `start`や`end`では「triggerの位置」と「windowの位置」を設定し、アニメーション発火の基準を設定できます。
    

応用例としてScrollTriggerプラグインは`gsap.to`などの中で使うこともできます。（[ドキュメント](https://gsap.com/docs/v3/Plugins/ScrollTrigger)を参照）

`trigger`と`start`や`end`の位置関係については下の図版も参照ください。

![scrollTriggerの説明](https://ics.media/entry/200805/images/200805_gsap3_scroll.png)

さらに、交差の方向によってそれぞれのタイミングでの挙動を設定できます。下の画像を参考にしてください。GreenSockに提供されたサンプルにも活用法があります。理解を深めるのに役立ちます。

-   [GreenSockによるScrollTriggerのサンプル - codepen](https://codepen.io/GreenSock/pen/LYVKWGo)

![toggleActionsの説明](https://ics.media/entry/200805/images/200805_gsap3_toggleAction.png)

ScrollTrigger以外も本当におもしろいプラグインばかりなのでぜひ使ってみてください！

### おわりに

本記事はチュートリアル的な役割よりも「アニメーションって簡単じゃん！　やってみようかな」と思ってもらえるようなものを目指しました。GSAPの魅力が少しでも伝わり、この後すぐ取り掛かってもらえれば筆者冥利に尽きます。

今回はCSSアニメーションの解説のみでしたが、SVGやCanvasのアニメーションにも使えるのでぜひ応用してみてください。

GSAPの魅力は高機能であることに加え、そのコミュニティの巨大さにもあります。本家の[resources | GSAP | Docs & Learning](https://gsap.com/learning/)にもたくさんの活用法がありますし、YouTubeで「GSAP」と検索するとゴマンとチュートリアルが出てきます。

今回の記事で興味を持った方がいれば、ドキュメントを漁ったり、いろいろなプラグインを試したり、チュートリアルを見てプロパティをいじり倒すのも楽しいでしょう。

ただし！　ライブラリはあくまでも道具です。ただ闇雲にアニメーションを詰め込んだコンテンツは逆に見づらくなってしまいます。そんなコンテンツを一度は見たことがあるのではないでしょうか？

昔の人は言いました、「神は細部に宿る」と。アニメーションライブラリの本質は、手足のようにアニメーションを操れることにあります。

ここはまだ入り口です。最強の武器を携えて、奥深いアニメーションの世界に一緒に飛び込んでみませんか？

#### 参考記事

-   [『ゲームUI演出』](https://gameanimation.info/)：ソーシャルゲーム会社のUIアニメーションデザイナーの方が、汎用的に使えるアニメーションを、わかりやすく解説してくれるサイトです。
-   [『Disney’s motion principles in designing interface animations』](https://medium.com/@ruthiran_b/disneys-motion-principles-in-designing-interface-animations-9ac7707a2b43)：「ディズニーアニメーション12の原則」をUIデザインに応用した面白く、勉強になる記事です。