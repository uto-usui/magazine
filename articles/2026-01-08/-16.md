---
title: "あえてズレを！ ウェブのアニメーションを「いい感じ」に魅せる手法"
source: "https://ics.media/entry/14346/"
publishedDate: "2017-01-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

アニメーションはウェブサイトやアプリ、ゲームのUIなど、多くの用途で必要となります。流行りのマイクロインタラクションでもアニメーションは重要視されています。しかし、アニメーションにたいして苦手意識を持っている方も少なくないでしょう。今回は私たちがアニメーションを作る時に用いている、**簡単に「いい感じ」に仕上げるテクニック**を紹介します。

![](https://ics.media/entry/14346/images/250901_tween_technique_sample.gif)

CSS Transitionなどは、始めと終わりの状態を指定することで、中間の状態を自動的に補完しアニメーションさせられます。本記事のデモはCSS版、GSAP版、Anime.js版の3種類で作成しています。お使いの技術にあわせて参考にしてください。

-   CSS版：CSSアニメーションを中心に作成したサンプル。演出の精度は簡易的。
-   GSAP版：JSライブラリGSAPジーサップを用いたサンプル。演出の精度が高め。
-   Anime.js版：JSライブラリAnime.jsを用いたサンプル。GSAP級の演出の精度で、コードがややシンプル。

### パラメーターを個別に操作する

複数のパラメーターを同時に変化させる場合、**パラメーター毎に個別に操作**をすると一味違った表現ができます。

#### イージング（加減速）を変える

**パラメーター毎に違うイージングを設定**すると、思わぬ動きになる時があります。たとえばXY座標を変化させる場合に、X座標のイージングを`quartInOut`、Y座標のイージングを`backOut`にすると、直線的な動きから**カーブを描くような動き**に変わります。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/161215_tween_technique/gsap.html#move_01)
-   [ソースコード（CSS版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/css.html#L111-L134)
-   [ソースコード（GSAP版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/gsap.html#L18-L45)
-   [ソースコード（Anime.js版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/animejs.html#L18-L44)

▼CSSの抜粋

```
.dot {
  /* 
  省略 
  ・CSS変数でイージングを定義しています。
  ・move-txとmove-txはCSSアニメーションのキーフレームです。
  */

  &:nth-child(1) {
    animation: move-tx 1.5s var(--ease-quart-out) infinite,
      move-ty 1.5s var(--ease-quart-out) infinite;
  }
  &:nth-child(2) {
    animation: move-tx 1.5s var(--ease-quart-out) infinite, /* 横方向は通常 */
      move-ty 1.5s var(--ease-back-out) infinite; /* ⭐️Back Outにするのがコツ */
  }
}
```

これに拡大する動きを加えると、ズームするような表現にできます。**奥行き感が出て、ちょっと凝っているような雰囲気**が出せます。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/161215_tween_technique/gsap.html#move_02)
-   [ソースコード（CSS版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/css.html#L135-L164)
-   [ソースコード（GSAP版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/gsap.html#L47-L88)
-   [ソースコード（Anime.js版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/animejs.html#L46-L79)

▼CSSの抜粋

```
.dot {
  /* 
  省略 
  ・CSS変数でイージングを定義しています。
  ・move-txとmove-txとscaleはCSSアニメーションのキーフレームです。
  */
  &:nth-child(2) {
    animation:
      move-tx 2s var(--ease-quart-out) infinite,
      /* ⭐️垂直方向の動きだけ異なるイージングに */
      move-ty 2s var(--ease-back-out) infinite,
      scale 2s var(--ease-quart-out) infinite;
  }
}
```

また`backOut`の部分を`linear`に変えると、今度は**ジグザグするような動き**に変わります。このように、**異なったイージングを組み合わせるだけでさまざまな表現**ができます。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/161215_tween_technique/gsap.html#move_03)
-   [ソースコード（CSS版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/css.html#L165-L191)
-   [ソースコード（GSAP版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/gsap.html#L90-L120)
-   [ソースコード（Anime.js版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/animejs.html#L81-L109)

▼CSSの抜粋

```
.dot {
  /* 
  省略 
  ・CSS変数でイージングを定義しています。
  ・move-txとmove-txとscaleはCSSアニメーションのキーフレームです。
  */
  &:nth-child(2) {
    animation:
      move-tx 1.75s var(--ease-quart-out) infinite,
      /* ⭐️あえてリニアに */
      move-ty 1.75s linear infinite;
  }
}
```

イージングを使いこなすと、アニメーションにさまざまな表情がつけられます。詳しく学びたい方は、記事『[アニメーションの調味料「イージング」の使い分けレシピ (透明度、UI、音量)](https://feb19.jp/blog/20161201_animation)』が参考になります。

#### タイミングをずらす

イージングや変化させる値はそのままでも、**タイミングをずらして再生するだけ**でアニメーションの表情は変わります。たとえば、以下の拡大するアニメーションの場合、横方向と縦方向のスケールの変化を、少しだけ再生タイミングをずらすと**スライムのような柔らかい質感**が出てきます。

▲ 左：同時に再生する場合 / 右：縦方向のスケールを0.1秒ずらして再生した場合

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/161215_tween_technique/gsap.html#expand)
-   [ソースコード（CSS版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/css.html#L192-L272)
-   [ソースコード（GSAP版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/gsap.html#L122-L167)
-   [ソースコード（Anime.js版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/animejs.html#L111-L155)

▼CSSの抜粋

```
.dotEx {
  /* 
  省略 
  ・CSS変数でイージングを定義しています。
  ・scaleXとscaleYはCSSアニメーションのキーフレームです。
  */

  .dotExInnerX {
    animation: scaleX 2s var(--ease-elastic-out) infinite;
  }
  .dotExInnerY {
    animation: scaleY 2s var(--ease-elastic-out) infinite;
    /* ⭐️あえて遅延させる */
    animation-delay: 0.1s;
  }
}
```

なお、CSSのアニメーションで「ボヨンボヨンした動き」を付けるには、イージングの`linear()`関数が便利です。次の記事『[CSSイージングのお手本](https://ics.media/entry/18730/#css%E3%81%AElinear\(\)%E9%96%A2%E6%95%B0%E3%81%A7%E8%87%AA%E7%94%B1%E3%81%AA%E5%8B%95%E3%81%8D%E3%82%92%E4%BD%9C%E3%82%8B)』を参照ください。

### 動きをちょい足しする

シンプルなアニメーションでは、動きのメリハリがなく単調な見映えになってしまうことがあります。そういった場合、元になるアニメーションに**少し動きを付け加えるだけで動きにぐっと奥行き**が出せます。

#### 回転を加える

横移動するアニメーションに、回転の動作を足して**「予備動作」と「後追い」**の演出を加えます。「予備動作」はアクションの前兆となるの動きで、「後追い」はアクションの後に追従する動作です。これらによって動きにメリハリがつき、また**大げさに入れるほどアニメーションらしい楽しげな動き**になります。

▲ 上：横移動のみの場合 / 下：横移動に回転の動きを加えた場合

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/161215_tween_technique/gsap.html#rotate)
-   [ソースコード（CSS版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/css.html#L273-L316)
-   [ソースコード（GSAP版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/gsap.html#L169-L200)
-   [ソースコード（Anime.js版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/animejs.html#L157-L198)

▼CSSの抜粋

```
.dot {  
  /* 
  省略 
  ・CSS変数でイージングを定義しています。
  ・rotate-seqとmove-txはCSSアニメーションのキーフレームです。
  */
  &:nth-child(2) {
    animation:
      /* ⭐️回転の予備動作を含める */
      rotate-seq 2.0s infinite,
      move-tx 2.0s cubic-bezier(0.87, 0, 0.13, 1) infinite;
  }
}
```

#### 伸縮を加える

落ちて跳ねるアニメーションに、伸縮の動作を足して「**状態変化**」の演出を加えます。アニメーション中に状態を変化させると**動作が誇張され**、元の動きがより際立ちます。

▲ 左：落ちて跳ねる動きのみの場合 / 右：伸縮の動きを加えた場合

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/161215_tween_technique/gsap.html#drop)
-   [ソースコード（CSS版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/css.html#L317-L422)
-   [ソースコード（GSAP版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/gsap.html#L202-L246)
-   [ソースコード（Anime.js版）](https://github.com/ics-creative/161215_tween_technique/blob/master/docs/animejs.html#L200-L248)

CSS版はやや複雑な実装となったため、Anime.jsのコードで紹介します。

```
animate(dot2, {
  y: { to: positionTo2.y, duration: 1500, ease: "outBounce" },

  // ⭐️スケールも変化
  scaleX: {
    to: scaleTo.x,
    duration: 450,
    ease: "outBack(4)",   // ⭐️異なるイージングを
    delay: 450,
  },
  scaleY: {
    to: scaleTo.y,
    duration: 450,
    ease: "outBack(4)",
    delay: 450,
  },
});
```

### まとめ

パラメーターを変えるだけで、まったく違った動きを試せるのがアニメーションのいいところですね。今回紹介したテクニックを押さえておけば、少し手間をかけるだけでアニメーションの表現をぐっと「いい感じ」にできます。また記事『[CSS Animationだけで実現するキャラクターアニメーション](https://ics.media/entry/11336/)』では、これらのテクニックを使ったキャラクターアニメーションを紹介していますので、ぜひこちらもご覧ください。

紹介したデモとソースコードは以下からまとめて確認できますので、ご参考ください。

-   [ソースコードを確認する](https://github.com/ics-creative/161215_tween_technique/)

※この記事が公開されたのは**8年前**ですが、**4か月前の2025年9月**に内容をメンテナンスしています。