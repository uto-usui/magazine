---
title: "CSSのattr()関数が進化！ HTML属性値を参照する新しい使い方"
source: "https://ics.media/entry/260326/"
publishedDate: "2026-03-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "iwama"
---

HTMLの属性値をCSSから参照できる`attr()`関数は、これまで`::before`や`::after`といった疑似要素の`content`プロパティで使える機能として知られていました。

`attr()`関数の拡張構文は、CSSの値や単位の扱いを定義する仕様書「[CSS Values and Units Module Level 5](https://www.w3.org/TR/css-values-5/#attr-notation)」で定義されています。さらに、Chrome・Edge 133（2025年2月）以降では、この拡張構文を`content`プロパティ以外でも利用できるようになりました。

拡張された`attr()`関数には、次のようなメリットがあります。この記事では、デモを交えながら紹介します。

-   個別の`style`属性やクラスを減らせる
-   HTMLの属性値をCSSの値として直接利用できる

**※注意：本記事のデモは、Chrome・Edge 133以上でご覧ください。**

### 1\. HTML属性で色・サイズを指定するデモ

要素ごとに色やサイズを変えたい場合、これまでは`style`属性でインラインスタイルを書くか、`button-blue`・`button-large`のような複数のクラスを用意する必要がありました。

拡張された`attr()`関数を使うと、HTMLの属性値をCSSの値として利用できます。従来の属性セレクターのように「属性があるか」「特定の値か」で分岐するだけでなく、属性値そのものを数値・長さ・色などとして読み取り、各プロパティに適用できます。

以下のデモでは、HTMLのカスタムデータ属性の値を使って、要素ごとの色やサイズを切り替えています。専用クラスを増やさずにバリエーションを管理できるのがポイントです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260326_advanced_attr/demo/01/)
-   [コードを確認する](https://github.com/ics-creative/260326_advanced_attr/blob/main/demo/01/index.html)

▼ 従来のアプローチ

```
<p class="item item-small">ニュース！</p>
<p class="item item-medium item-orange">ビッグニュース！</p>
<p class="item item-large item-pink">特大ビッグニュース！</p>
```

```
.item {
  border-radius: 0.5rem;
  background: gray;
}
/* サイズごとにクラスを分ける */
.item-small {
  padding: 0.56rem 0.96rem;
  font-size: 0.8rem;
  border-radius: 0.4rem;
}
.item-medium {
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  border-radius: 0.5rem;
}
.item-large {
  padding: 0.84rem 1.44rem;
  font-size: 1.2rem;
  border-radius: 0.6rem;
}

/* 色ごとにクラスを分ける */
.item-orange {
  background: orange;
}
.item-pink {
  background: pink;
}
```

▼ 拡張された`attr()`を使った場合

```
<p class="item" data-size="0.8">ニュース！</p>
<p class="item" data-size="1.2" data-color="orange">ビッグニュース！</p>
<p class="item" data-size="1.6" data-color="pink">特大ビッグニュース！</p>
```

```
.item {
  /* data-sizeの数値を元にpaddingを調整（フォールバックは1） */
  padding:
    calc(attr(data-size type(<number>), 1) * 0.7rem)
    calc(attr(data-size type(<number>), 1) * 1.2rem);

  /* data-sizeを元にフォントサイズを調整 */
  font-size: calc(attr(data-size type(<number>), 1) * 1rem);

  /* data-sizeに応じて角丸の大きさも変化 */
  border-radius: calc(attr(data-size type(<number>), 1) * 0.5rem);

  /* data-colorを背景色として適用（未指定時はグレー） */
  background: attr(data-color type(<color>), gray);
}
```

### 2\. HTML属性でハート評価の見た目を切り替えるデモ

次のデモでは、`data-rating`属性の値をCSSで数値として読み取り、ハート評価の塗りつぶし量に反映しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260326_advanced_attr/demo/02/)
-   [コードを確認する](https://github.com/ics-creative/260326_advanced_attr/blob/main/demo/02/index.html)

```
<div class="heart-rating" data-rating="2.5">
  <span class="hearts"></span>
  <span class="score">2.5</span>
</div>

<div class="heart-rating" data-rating="3.3">
  <span class="hearts"></span>
  <span class="score">3.3</span>
</div>

<div class="heart-rating" data-rating="4.8">
  <span class="hearts"></span>
  <span class="score">4.8</span>
</div>
```

```
.heart-rating {
  --fill: calc(attr(data-rating type(<number>), 0) * 20%);
  ...
  .hearts {
    width: 5.8em; /* ハート5個分 + すき間ぶんを含めた幅 */
    height: 1em;
    background: linear-gradient(to right, #ff5470 var(--fill), #e5e7eb var(--fill));
    mask-image: url("../images/heart.svg");
    mask-repeat: space;
    mask-size: 1em 1em;
  }
}
```

### 3\. HTML属性で進捗バーの幅を変えるデモ

数値属性をそのまま使って、ゲージのようなUIを表現することもできます。次のデモでは、レンジスライダーの値に応じて属性値を更新し、その値を進捗バーの幅に反映しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260326_advanced_attr/demo/03/)
-   [コードを確認する](https://github.com/ics-creative/260326_advanced_attr/blob/main/demo/03/index.html)

```
<input type="range" min="0" max="100" value="50" />
<div class="bar" data-value="50"></div>
```

```
.bar {
  &::before {
    content: "";
    ...
    width: attr(data-value %);
  }
}
```

```
const range = document.querySelector("input");
const bar = document.querySelector(".bar");

  // input要素の現在値をdata-value属性へ反映し、CSSのattr()関数から参照できるようにする
range.addEventListener("input", () => {
  bar.setAttribute("data-value", range.value);
});
```

### 拡張された`attr()`関数の使い方

ここまでのデモでは、HTMLの属性値をそのままスタイルに利用してきました。このような使い方を可能にしているのが、拡張された`attr()`関数の新しい書き方です。

```
attr(属性名 単位) /* px, deg, % などの単位をつけて扱う */
attr(属性名 単位, フォールバック値)
attr(属性名 type(型))
attr(属性名 type(型), フォールバック値)
```

単位を指定する書き方では、数値の属性値に対して単位をつけて扱えます。`type()`関数を使うと、値をCSSの型として解釈できます。

型には以下のようなものがあります。

-   `type(<color>)`：色として読み取る
-   `type(<length>)`：長さとして読み取る
-   `type(<number>)`：数値として読み取る
-   `type(<percentage>)`：パーセンテージとして読み取る

フォールバック値は、属性が存在しない場合や無効な場合に使われる値です。単位指定・型指定のどちらの書き方でも利用できます。

型を指定しない場合、属性値は文字列として扱われます。そのため、数値や色として解釈してほしいプロパティには、そのままでは使えません。たとえば、属性値をサイズ計算に使いたい場合でも、型指定がない`attr()`は`calc()`の中で数値として扱えません。

```
/* NG: data-size は文字列として扱われるため、数値計算に使えない */
.box {
  font-size: calc(attr(data-size) * 0.5rem);
}

/* OK: number型として読み取ることで、数値計算に使える */
.box {
  font-size: calc(attr(data-size type(<number>)) * 0.5rem);
}
```

### 対応ブラウザー

拡張された`attr()`（`content`以外のプロパティでの利用）は、Chrome・Edge 133（2025年2月）以上で利用可能です。Firefoxは通常機能としては未対応ですが、149 Betaではフラグ付きの実験的機能として案内されています。

参照：[Can I use…](https://caniuse.com/css3-attr)

### まとめ

拡張された`attr()`を使うと、HTMLの属性値をそのままスタイルに活用でき、これまでクラスやインラインスタイルで管理していた値を、よりシンプルに表現できます。

気づくと増えてしまいがちな色やサイズなどのクラス指定を整理できるのはとても助かりますね。現時点での対応ブラウザーは限られていますが、今後の普及が楽しみです。

### 参考

-   [CSS attr() gets an upgrade - Chrome Developers](https://developer.chrome.com/blog/advanced-attr)
-   [New capabilities for attr() - una.im](https://una.im/advanced-attr/)
-   [attr() - CSS | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Values/attr)