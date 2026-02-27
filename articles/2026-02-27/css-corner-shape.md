---
title: "角の形を自在に変える！ CSS corner-shapeプロパティ入門"
source: "https://ics.media/entry/260226/"
publishedDate: "2026-02-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "iwama"
---

CSSの`corner-shape`プロパティは、`border-radius`で定義された角の領域に対して、「**どのような形状で処理するか**」を指定できるプロパティです。

これまで、角の形状を変えるデザインを実現するには、用途に応じて複数の手法を組み合わせる必要がありました。

-   丸くする：`border-radius`
-   斜めに切る：疑似要素や`clip-path`
-   内側にえぐる：SVGやCSS Masking（`mask-image`）

たとえば「角を斜めに切り落としたボタン」を作る場合、`clip-path`で多角形を指定する方法があります。

```
/* 四隅を斜めに切り落とす */
button {
  clip-path: polygon(
    10px 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    10px 100%,
    0 calc(100% - 10px),
    0 10px
  );
}
```

この方法では、角の大きさや形状を変更するたびに座標を再計算する必要があり、調整が複雑になりがちです。また、座標の意味が直感的に分かりにくく、コードから見た目の意図を読み取りにくいという課題もありました。

`corner-shape`プロパティを使えば、`border-radius`で確保した角の領域に対して処理方法を指定するだけで、同様の表現を直感的に実装できます。

![](https://ics.media/entry/260226/images/images/260226_demo_clip-path.jpg)

### 1\. 基本：値の紹介

`corner-shape`プロパティを使用する際のポイントは次のとおりです。

-   `corner-shape`プロパティは単独では機能しない（あわせて`border-radius`プロパティの指定が必要）
-   `border-radius`プロパティの値が0の場合、視覚的変化は起こらない
-   半径が大きいほど、角のデザインの個性が強く出る

以下のデモでは、`corner-shape`プロパティの値による形状の違いを確認できます。あわせて`border-radius`プロパティの値もスライダーで変更できます。ぜひ動かしてみてください。

**※注意：本記事のデモは、Chrome・Edge 139以上でご覧ください。**

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260226_css_corner-shape/demo/01/)
-   [コードを確認する](https://github.com/ics-creative/260226_css_corner-shape/blob/main/demo/01/index.html)

![](https://ics.media/entry/260226/images/images/260226_demo.jpg)

`corner-shape`プロパティの書き方を紹介します。

```
button { 
  border-radius: 12px;
  corner-shape: bevel;
}
```

値として`superellipse()`を指定すると、超楕円（superellipse）と呼ばれる曲線を使用した角を作成できます。引数に数値を指定することで曲率を調整でき、値が1に近いほど円に近い形になります。値が1付近では円に近い形になり、値を小さくすると角が内側にえぐれた形に、大きくすると正方形に近い形に変化します。

`squircle`はこの超楕円の代表的な形状のひとつで、近年のUIデザインでよく見られる「丸すぎない角丸」を表現できます。`superellipse()`を使えば、その曲線を細かく調整することが可能です。

以下のデモでは、`border-radius`プロパティの値とあわせて、`superellipse()`の引数もスライダーで変更できます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260226_css_corner-shape/demo/01-superellipse/)
-   [コードを確認する](https://github.com/ics-creative/260226_css_corner-shape/blob/main/demo/01-superellipse/index.html)

![](https://ics.media/entry/260226/images/images/260226_demo_superellipse.jpg)

指定できる値とそれぞれの形状は、以下のとおりです。

-   `round`：通常の丸みのある角
-   `bevel`：角を直線的に切り落とした形
-   `scoop`：角を内側にえぐったような形
-   `notch`：角が四角く欠けたような形
-   `square`：角の丸みを打ち消した直角
-   `squircle`：円と正方形の中間のような滑らかな曲線（超楕円の一種）
-   `superellipse()`：超楕円の曲率を数値で指定できる形状（値によって円に近い形から四角に近い形まで変化）

### 2\. 応用：デモ

`corner-shape`プロパティは、角の形状を一括で指定できるだけでなく、特定の角や辺ごとに指定するための派生プロパティも用意されています。

`corner-top-left-shape`/`corner-top-right-shape`/`corner-bottom-left-shape`/`corner-bottom-right-shape`を使えば、四隅それぞれを個別に設定できます。さらに、左右・上下の2つの角をまとめて指定する`corner-left-shape`や`corner-right-shape`などのプロパティも存在します。

たとえば、左側の角だけを斜めに切り落とし、右側は丸くする、といった指定も可能です。

```
.label {
  border-radius: 12px;
  /* 「corner-shape: bevel round round bevel」と書く場合と同じ */
  corner-left-shape: bevel;
  corner-right-shape: round;
}
```

`corner-shape`プロパティを様々な形で利用した実装例をいくつか紹介します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260226_css_corner-shape/demo/02/)
-   [コードを確認する](https://github.com/ics-creative/260226_css_corner-shape/blob/main/demo/02/index.html)

![](https://ics.media/entry/260226/images/images/260226_sample_items.jpg)

ボタンなどの角の形を変えたり、あしらいを作ったりするだけでなく、手書き風のフキダシやマーカー線などの表現も可能です。ひらめき次第でさらにいろいろなアレンジができそうですね。

### 対応ブラウザ

`corner-shape`プロパティは、Chrome・Edge 139（2025年8月）以上で利用可能です。

参照：[Can I use…](https://caniuse.com/?search=corner-shape)

### まとめ

`corner-shape`プロパティを使うと、SVGや`clip-path`を使う場合と比べて、何をしているコードなのかが直感的に分かりやすくなります。また、形状や色・大きさなどもCSSの値として簡単に変更できます。アニメーションの表現にも役立ちそうですね。

CSSだけで表現できるデザインの幅が広がるのは、実装者にとって嬉しいことです。ブラウザの対応状況も見ながら、ぜひ積極的に活用していきたいですね。