---
title: "コピペで使える！ CSS Animationだけで実現するキャラクターアニメーション"
source: "https://ics.media/entry/11336/"
publishedDate: "2016-03-14"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

みなさんは、CSSアニメーションどのように使っていますか？　ウェブサイトのちょっとした演出でCSSトランジションを使用している方が多いと思いますが、類似のCSSアニメーションはどういった使い道があるのかよくわかっていない方も多いのではないでしょうか。実は、CSSアニメーションを使うと**キャラクターアニメーション**を作ることができます。

今回は**シンプルな変形アニメーションを組み合わせて**、**1枚の画像で実現できる**キャラクターアニメーションを制作しました。オリジナルのキャラクターをアニメーションさせていますが、CSSのコードの**コピー&ペーストで他のキャラクター（画像）にも簡単に適応できます**。

商用・個人問わず無料で利用できるMITライセンスで公開していますので、ウェブサイトやコンテンツ制作に是非ご活用ください。

### 伸びるアニメーション

上方向に「ぷるんっ」と伸びるアニメーションです。`scale()`でタイミングよく上下左右に拡縮することで、有機的で柔らかい質感を表現しています。

```
.purun {
  animation: purun 0.8s linear 0s 1;
}

@keyframes purun {
  0%   { transform: scale(1.0, 1.0) translate(0%, 0%); }
  15%  { transform: scale(0.9, 0.9) translate(0%, 5%); }
  30%  { transform: scale(1.3, 0.8) translate(0%, 10%); }
  50%  { transform: scale(0.8, 1.3) translate(0%, -10%); }
  70%  { transform: scale(1.1, 0.9) translate(0%, 5%); }
  100% { transform: scale(1.0, 1.0) translate(0%, 0%); }
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160311_css3_animation/demo/purun.html)
-   [ソースコードを確認する](https://github.com/ics-creative/160311_css3_animation/blob/master/demo/purun.html)

### 揺れるアニメーション

左右に「ころころ」と揺れるアニメーションです。`rotate()`の回転に合わせて`translate()`でX座標をずらすことで、自然な転がる動きを表現しています。

```
.korokoro {
  animation: korokoro 2.5s linear 0s 1;
}

@keyframes korokoro {
  0%   { transform: translate(0%, 0%); }
  5%   { transform: translate(10%, 0%) rotate(10deg); }
  25%  { transform: translate(20%, 0%) rotate(20deg); }
  30%  { transform: translate(-10%, 0%) rotate(-10deg); }
  35%  { transform: translate(-15%, 0%) rotate(-15deg); }
  45%  { transform: translate(10%, 0%) rotate(10deg); }
  50%  { transform: translate(15%, 0%) rotate(15deg); }
  60%  { transform: translate(-5%, 0%) rotate(-5deg); }
  65%  { transform: translate(-7%, 0%) rotate(-7deg); }
  75%  { transform: translate(0%, 0%) rotate(0deg); }
  100% { transform: translate(0%, 0%) rotate(0deg); }
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160311_css3_animation/demo/korokoro.html)
-   [ソースコードを確認する](https://github.com/ics-creative/160311_css3_animation/blob/master/demo/korokoro.html)

### ぷるぷるするアニメーション

その場で「ぷるぷる」するアニメーションです。`scale()`の拡大に加え、`skew()`で台形変形させることで複雑な動きを表現しています。

```
.purupuru {
  animation: purupuru 0.8s linear 0s 1;
}

@keyframes purupuru {
  0%   { transform: scale(1.0, 1.0) translate(0%, 0%); }
  20%  { transform: scale(1.0, 1.06) translate(-5%, -4%) skew(6deg, 0deg); }
  50%  { transform: scale(1.0, 0.94) translate(5%, 4%) skew(-6deg, 0deg); }
  65%  { transform: scale(1.0, 1.03) translate(2%, -2%) skew(-3deg, 0deg); }
  80%  { transform: scale(1.0, 0.97) translate(-2%, 2%) skew(3deg, 0deg); }
  100% { transform: scale(1.0, 1.0) translate(0%, 0%); }
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160311_css3_animation/demo/purupuru.html)
-   [ソースコードを確認する](https://github.com/ics-creative/160311_css3_animation/blob/master/demo/purupuru.html)

### 着地するアニメーション

上から「ぽよん」と落ちてくるアニメーションです。落ちている最中`scale()`で上下に引き延ばすことで、落ちる勢いを表現しています。

```
.poyon {
  animation: poyon 1.1s linear 0s 1;
}

@keyframes poyon {
  0%   { transform: scale(0.8, 1.4) translate(0%, -100%); }
  10%  { transform: scale(0.8, 1.4) translate(0%, -15%); }
  20%  { transform: scale(1.4, 0.6) translate(0%, 30%); }
  30%  { transform: scale(0.9, 1.1) translate(0%, -10%); }
  40%  { transform: scale(0.95, 1.2) translate(0%, -30%); }
  50%  { transform: scale(0.95, 1.2) translate(0%, -10%); }
  60%  { transform: scale(1.1, 0.9) translate(0%, 5%); }
  70%  { transform: scale(1.0, 1.0) translate(0%, 0%); }
  100% { transform: scale(1.0, 1.0) translate(0%, 0%); }
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160311_css3_animation/demo/poyon.html)
-   [ソースコードを確認する](https://github.com/ics-creative/160311_css3_animation/blob/master/demo/poyon.html)

### 跳ねるアニメーション

上に「ぽよーん」と跳ねるアニメーションです。跳ねる前の縮むアニメーションの時間を長くすることで、力のタメを表現しています。

```
.poyooon {
  animation: poyooon 0.9s linear 0s 1;
}
@keyframes poyooon {
  0%   { transform: scale(1.0, 1.0) translate(0%, 0%); }
  10%  { transform: scale(1.1, 0.9) translate(0%, 5%); }
  40%  { transform: scale(1.2, 0.8) translate(0%, 15%); }
  50%  { transform: scale(1.0, 1.0) translate(0%, 0%); }
  60%  { transform: scale(0.9, 1.2) translate(0%, -100%); }
  75%  { transform: scale(0.9, 1.2) translate(0%, -20%); }
  85%  { transform: scale(1.2, 0.8) translate(0%, 15%); }
  100% { transform: scale(1.0, 1.0) translate(0%, 0%); }
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160311_css3_animation/demo/poyooon.html)
-   [ソースコードを確認する](https://github.com/ics-creative/160311_css3_animation/blob/master/demo/poyooon.html)

### 元にもどるアニメーション（縦方向）

上に引っ張られて「ぷよん」と元にもどるアニメーションです。「伸びるアニメーション」と同様に、`scale()`の拡縮で柔らかい質感を表現しています。

```
.puyon {
  animation: puyon 1.0s linear 0s 1;
}
@keyframes puyon {
  0%   { transform: scale(1.0, 1.0) translate(0%, 0%); }
  40%  { transform: scale(0.95, 1.2) translate(0%, -10%); }
  50%  { transform: scale(1.1, 0.9) translate(0%, 5%); }
  60%  { transform: scale(0.95, 1.05) translate(0%, -3%); }
  70%  { transform: scale(1.05, 0.95) translate(0%, 3%); }
  80%  { transform: scale(1.0, 1.0) translate(0%, 0%); }
  100% { transform: scale(1.0, 1.0) translate(0%, 0%); }
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160311_css3_animation/demo/puyon.html)
-   [ソースコードを確認する](https://github.com/ics-creative/160311_css3_animation/blob/master/demo/puyon.html)

### 元にもどるアニメーション（横方向）

横に引っ張られて「ぷるるん」と元にもどるアニメーションです。`skew()`で台形変形させ、左右の揺れを表現しています。

```
.pururun {
    animation: pururun 1.2s linear 0.2s 1;
}

@keyframes pururun {
  0%   { transform: scale(1.0, 1.0) translate(0%, 0%); }
  10%  { transform: scale(1.0, 1.0) translate(10%, 0%) skew(-10deg, 0deg); }
  60%  { transform: scale(1.0, 1.0) translate(20%, 0%) skew(-20deg, 0deg); }
  70%  { transform: scale(1.0, 1.0) translate(-15%, 0%) skew(15deg, 0deg); }
  80%  { transform: scale(1.0, 1.0) translate(15%, 0%) skew(-15deg, 0deg); }
  80%  { transform: scale(1.0, 1.0) translate(5%, 0%) skew(-5deg, 0deg); }
  90%  { transform: scale(1.0, 1.0) translate(-5%, 0%) skew(5deg, 0deg); }
  100% { transform: scale(1.0, 1.0) translate(0%, 0%); }
}
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160311_css3_animation/demo/pururun.html)
-   [ソースコードを確認する](https://github.com/ics-creative/160311_css3_animation/blob/master/demo/pururun.html)

### おわりに

CSSアニメーションを使うと、今回制作したキャラクターアニメーションのようにCSSトランジションとはひと味違った演出が可能になります。パラメーターを変更すればアレンジもすぐにできるので、是非遊んでみてください。機会があればアニメーション制作のコツなども、今後紹介したいと思います。