---
title: "CSSのrandom()関数でつくる、不規則なデザイン表現"
source: "https://ics.media/entry/261001/"
publishedDate: "2026-09-30"
category: "frontend"
feedName: "ICS MEDIA"
author: "iwama"
---

CSSの`random()`関数を使うと、**CSSだけでランダムな値を扱える**ようになります。`random()`関数は、Safari 26.2から利用できる新しい関数です。要素ごとのサイズや角度、アニメーションの開始タイミングなどに自然なばらつきを加えられます。

従来、同じような表現を実装するには、`:nth-child()`で値を個別に指定したり、`sibling-index()`関数で並び順から計算したり、JavaScriptの`Math.random()`で値を渡したりする必要がありました。`random()`関数を使えば、「角度は0〜1turn」「animation-delayは0〜600ms」のように、ばらつかせたい範囲をCSSへそのまま記述できます。

この記事では、`random()`関数を使ってどんな表現ができるのかを紹介します。

**※注意：本記事のデモは、Safari 26.2以上でご覧ください。**

### random()関数の基本

`random()`関数は、指定した範囲からランダムな値を返します。CSSの値として記述するため、長さや角度、時間、割合など、プロパティに応じた単位をそのまま扱えます。

以下の例では、`100px`から`300px`までの範囲から値が選ばれます。同じスタイルを複数の要素に適用した場合も、それぞれの要素で異なる値になります。

```
.box {
  width: random(100px, 300px);
}
```

第3引数には、値を選ぶ間隔を指定できます。

```
.box {
  width: random(100px, 300px, 50px);
}
```

この例では、選ばれる値は`100px`、`150px`、`200px`、`250px`、`300px`のいずれかです。細かい連続値ではなく、一定の間隔でばらつかせたいときに便利です。

### デモ1：いいねボタンをrandom()で作り直す

過去記事『[UI改善にキラリと役立つ！ SVGアニメーションの作り方まとめ](https://ics.media/entry/15970/#css%E3%81%AB%E3%82%88%E3%82%8B%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E5%AE%9F%E4%BE%8B2%EF%BC%9A%E3%81%84%E3%81%84%E3%81%AD%E3%83%9C%E3%82%BF%E3%83%B3)』で、ハートをクリックすると周囲へパーティクルが飛び出す「いいねボタン」の作り方を紹介しました。この表現を`random()`関数で作り直してみます。

パーティクルが毎回少し違う方向へ飛ぶようにすると、クリック時の演出に自然なばらつきが生まれます。今回のデモでは、粒子ごとに変えたい値をCSSのカスタムプロパティとして定義しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/261001_css_random/demo/01/)
-   [コードを確認する](https://github.com/ics-creative/261001_css_random/tree/main/demo/01/)

ランダムにしているのは、以下の値です。

-   飛ぶ方向
-   飛距離
-   アニメーションの再生時間
-   開始タイミング
-   色

```
.particle {
  /* 粒子の飛ぶ方向をランダムにする */
  --particle-angle: random(0turn, 1turn);
  transform: rotate(var(--particle-angle));

  circle {
    --particle-distance: random(220px, 290px);
    --particle-duration: random(1200ms, 1800ms);
    --particle-delay: random(0ms, 160ms);

    /* 色相・彩度・明度をランダムにして、毎回違う配色にする */
    fill: hsl(
      random(145deg, 335deg) random(55%, 85%)
        random(68%, 82%)
    );
  }
}

.is-playing {
  .particle {
    circle {
      /* 再生時間・開始タイミングを粒子ごとに変える */
      animation: particle var(--particle-duration) ease-out
        var(--particle-delay) forwards;
    }
  }
}

@keyframes particle {
  0%,
  25% {
    opacity: 0;
    transform: translateX(130px);
  }

  30%,
  85% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    /* 飛距離を粒子ごとに変える */
    transform: translateX(var(--particle-distance));
  }
}
```

`random()`で決まった値はその要素があるあいだ変わらないため、デモではJavaScriptで粒子の要素を作り直しています。

デモ1では、ばらつかせたい値をCSS上で分けて管理しています。「どの値をどの範囲でランダムにしているか」が読み取りやすくなりますね。

[過去記事の実装コード](https://github.com/ics-creative/170713_svg_animation/blob/main/src/css/demo2_common.css)と見比べてみてください。角度や移動先を計算していた部分を`random()`関数に置き換えることで、値の意図がCSSから読み取りやすくなりました。

### デモ2：ホバーアニメーションのタイミングを文字ごとにランダムにする

ホバーしたときに、文字の色が文字ごとにずれたタイミングで変わる演出も、`random()`関数なら手軽に実装できます。文字ごとの`animation-delay`をばらつかせることで、同じアニメーションでも自然なタイミングのずれを作れます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/261001_css_random/demo/02/)
-   [コードを確認する](https://github.com/ics-creative/261001_css_random/tree/main/demo/02/)

デモ2では、ホバー時の`animation-delay`に`random()`関数を指定しています。各文字に同じCSSを適用していても、文字ごとに異なる遅延時間が選ばれます。

```
.headline {
  &:hover {
    .char {
      /* 文字ごとに違う animation-delay を割り当てる */
      animation: flash 500ms ease random(0ms, 600ms);
    }
  }
}

@keyframes flash {
  50% {
    color: #7c71f6;
  }
}
```

### デモ3：星空の位置・大きさ・またたきをランダムにする

星空のように、もともと不規則であるほうが自然に見える装飾では、`random()`関数がとくに効果的です。リロードするたびに、位置や大きさ、またたき方の違う星空を表示できます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/261001_css_random/demo/03/)
-   [コードを確認する](https://github.com/ics-creative/261001_css_random/tree/main/demo/03/)

以下のコードでは、ひとつの`.star`クラスに対して、位置、大きさ、光の強さ、またたきの再生時間、開始タイミングを指定しています。

```
.sky {
  .star {
    position: absolute;
    /* 位置・大きさ・発光の強さを星ごとに変える */
    left: random(2%, 98%);
    top: random(3%, 96%);
    width: random(2px, 7px);
    aspect-ratio: 1;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 random(8px, 28px) rgb(184 176 255 / 95%);
    opacity: 0.18;
    animation: twinkle random(600ms, 1.8s) ease-in-out
      random(-1.8s, 0s) infinite alternate;
  }
}

@keyframes twinkle {
  to {
    opacity: 1;
    transform: scale(2.1);
  }
}
```

### `random()`関数はどんな場面で使うとよい？

`random()`関数は、情報そのものではなく、見た目の揺らぎを作る場面に向いています。たとえば、背景に散る紙吹雪や花びら、泡、粒子、動物の足跡など、同じ形が規則正しく並ぶと不自然に見える装飾です。

装飾や演出では、次のような値を少しずつ変えると自然な印象を作れます。

-   位置
-   角度
-   サイズ
-   透明度
-   移動距離
-   アニメーションの再生時間
-   アニメーションの開始タイミング

一方で、読む順番や操作のしやすさに関わる値へ使うと、ユーザーが内容を理解しにくくなる場合があります。たとえば、記事一覧の並び順が毎回変わると、目的の記事を探しにくくなります。本文やメイン画像のサイズが変わると、行の折り返しや余白が安定せず、読みづらさにつながります。購入、送信、削除のような重要な操作に関わるボタンの位置や色も、ランダムに変えるべきではありません。ユーザーが操作対象を見つけにくくなったり、誤操作につながったりするためです。

### 対応ブラウザ

CSSの`random()`関数は、Safari 26.2以上で利用可能です。

参照：[Can I use…](https://caniuse.com/mdn-css_types_random)

### まとめ

CSSの`random()`関数を使うと、値の範囲を指定するだけで、要素ごとに異なる値を設定できます。装飾やアニメーションにあえて不規則さを加えることで、均一な表現にはない、自然な動きやばらつきを作れます。

CSSだけで表現の幅を広げられるのは、うれしいですね！ぜひ、さまざまな表現に応用してみてください。