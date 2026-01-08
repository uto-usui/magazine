---
title: "CSSだけでスクロールアニメーションが作れる！？ 新技術Scroll-driven Animationsとは"
source: "https://ics.media/entry/230718/"
publishedDate: "2023-07-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Scroll-driven Animations（スクロール・ドリブン・アニメーション）を使うと、今まではJavaScriptを使わなければ実装できなかった**スクロールと連動するようなアニメーションがCSSだけで実現できる**ようになります。

以下は、CSSだけを使って作成したスクロールアニメーションのデモです。一切JavaScriptは使用していません。

![Scroll-driven Animationsの作例](https://ics.media/entry/230718/images/230718_scroll-driven-animations_demos.webp)

Scroll-driven AnimationsはJavaScriptでも使うこともできますが、本記事では、実装の手軽さを一番にお伝えしたいため、CSSだけを使ったスクロール駆動アニメーションの作り方をご紹介します。

### スクロールアニメーションとは

作り始める前に、まずはスクロールアニメーションについて整理しておきましょう。

#### メリットとユーザー設定に応じた対策

スクロールアニメーションをウェブサイトに導入する理由は複数あると考えられますが、以下のようなメリットが挙げられます。

-   コンテンツの視線誘導に役立つ
-   ウェブサイトの没入感の向上に役立つ

効果的なアニメーションは、優れたユーザー体験を提供する一助となるでしょう。

しかしながら、利用者の中にはアニメーションが苦手であったり画面酔いしやすい方などもいます。

スクロールアニメーションが苦手な方のために、reduced motionに配慮した実装も検討するといいでしょう。記事『[ウェブサイトに演出は不要!? ユーザー設定にレスポンシブ対応できる新しいCSS](https://ics.media/entry/210604/#%E3%83%A2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E7%84%A1%E5%8A%B9%E5%8C%96%E8%A8%AD%E5%AE%9A)』にて解説していますので、ぜひご覧ください。

#### スクロールアニメーションの種類

スクロールアニメーションはいくつかの種類に分類されます。記事『[トレンドウェブサイトから学べ！ JavaScriptで作る本格スクロール演出](https://ics.media/entry/210426/#%E3%82%B9%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%AB%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E5%88%86%E9%A1%9E)』にて紹介しているのは、次のような分類です。

-   スクロールで発火するアニメーション（トリガーアニメーション）：アニメーションは**時間**で行われる
-   スクロールに連動したアニメーション（スクラブアニメーション）：アニメーションは**スクロール進捗量**と連動して行われる
-   一定時間固定されるアニメーション（スティッキーな表現）：アニメーションは**スクロール進捗量**と連動して行われる

今回紹介する、`animation-timeline`や`animation-range`といった新しいCSSのプロパティを使って実装するスクロールアニメーションは、**スクロール進捗量**と連動してアニメーションさせるものです。**スクラブアニメーションやスティッキーな表現を作ることができます。**

### 作り方

それでは作り方をご紹介します。後述の対応ブラウザ以外は動作しませんのでバージョンにご注意ください。

#### ページのスクロール進捗に連動するスクラブアニメーションの実装（Scroll Progress Timeline）

次の作例のように、ページのスクロール進捗に連動して、要素が垂直方向にスケールアップするスクラブアニメーションを作ります。

▼左：紹介するデモ、右：アレンジバージョン ![ページのスクロールに連動するスクラブアニメーションのデモ](https://ics.media/entry/230718/images/230718_scroll-driven-animations_scroll.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230718_scroll_driven_animations/index-scroll.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230718_scroll_driven_animations/blob/main/index-scroll.html)

① 事前準備：アニメーションさせる要素（`div.animationElement`）を用意し、スクロールが発生するよう`body`要素に適当な高さを確保しておきます。

```
<div class="animationElement"></div>
```

```
body {
  height: 200vh; /* スクロールが発生するよう適当な高さを確保 */
}
```

②`@keyframes`ルールでアニメーションを用意し、アニメーションさせる要素に指定します。

```
/* 垂直方向にスケールを変えるキーフレーム */
@keyframes grow-progress {
  from {
    scale: 1 0;
  }
  to {
    scale: 1 1;
  }
}
```

③`animation-timeline`プロパティに`scroll()`関数を指定します。

```
.animationElement {
  /* スタイリング */
  position: fixed;
  width: 100px;
  height: 100px;
  background: royalblue;
  transform-origin: bottom; /* 下部を変形の基準にしておく */
  
  /* スクロールアニメーションの設定 */
  animation: grow-progress linear; /* アニメーションを指定。イージングはlinear */
  animation-timeline: scroll();
}
```

たった数行のCSSで、スクラブアニメーションの完成です。

`scroll()`関数の詳しい構文は[MDNのscroll()の解説](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll)を参照ください。

※Scroll Progress Timelineに関する補足：[MDNの日本語ページ](https://developer.mozilla.org/ja/docs/Web/CSS/scroll-timeline)で紹介されている、アットルールを使用した`@scroll-timeline`は古い構文ですのでご注意ください。新しい構文は、[ドキュメント](https://www.w3.org/TR/scroll-animations-1/)をご確認ください。

#### 画面内に要素が入ってきた時にスクロールと連動するスクラブアニメーションの実装（View Progress Timeline）

続いて、以下の作例のようにスクロールを進めて画面内にアニメーション要素が入ってきた時にマスクが動くスクラブアニメーションを作ります。

![ページのスクロールに連動するスクラブアニメーションのデモ](https://ics.media/entry/230718/images/230718_scroll-driven-animations_view.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230718_scroll_driven_animations/index-view.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230718_scroll_driven_animations/blob/main/index-view.html)

①事前準備：アニメーションさせる要素（`div.animationElement`）を用意し、スクロールが発生するよう前後に適当な高さを確保した要素（`div.skeleton`）を配置しておきます。

```
<div class="skeleton">スクロールを発生させるため適当なエリアを確保しています</div>
<img class="animationElement" src="./images/sapphire.webp" alt="サファイア" width="300" height="300">
<div class="skeleton">スクロールを発生させるため適当なエリアを確保しています</div>
```

```
.skeleton {
  height: 100vh; /* スクロールが発生するよう適当な高さを確保 */
}
```

②`@keyframes`ルールでアニメーションを用意し、アニメーションさせる要素に指定します。

今回はマスクを使うアニメーションを作ります。

マスクについては記事『[変幻自在なグラフィック表現！ CSS, SVG, Canvasでマスクを使いこなせ](https://ics.media/entry/210701/)』にて解説しています。

```
/* 円→（角丸四角形を経由）→正方形 にマスクの形状を変化させるキーフレーム */
@keyframes reveal-image {
  from {
    clip-path: inset(30% round 20%);
  }
  to {
    clip-path: inset(0);
  }
}
```

③`animation-timeline`プロパティに`view()`関数を指定します。

`view()`関数の詳しい構文は[MDNのview()の解説](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view)を参照ください。

④`animation-range`プロパティを設定します。

アニメーションさせる画像がビューポートに完全に入った時点（`contain 0%`）でアニメーションを開始し、画像がビューポートの真ん中まで来た時（`contain 50%`）にアニメーションを終了するよう範囲を指定します。

`animation-range`プロパティに指定できる値については、[MDNのanimation-rangeの解説](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range)を参照ください。

```
.animationElement {
  /* スクロールアニメーションの設定 */
  animation: reveal-image linear both; /* アニメーションを指定。イージングはlinear。animation-fill-modeはboth */
  animation-timeline: view();
  animation-range: contain 0% contain 50%; /* 開始: 要素がビューポートに完全に入った時、終了: ビューポートの真ん中 */
}
```

今回も同様に、たった数行のCSSでスクラブアニメーションが完成しました。

また、`animation-range`プロパティに指定できる値は種類が多く複雑ですので、[View Timeline Ranges Visualizer](https://scroll-driven-animations.style/tools/view-timeline/ranges/#range-start-name=contain&range-start-percentage=0&range-end-name=contain&range-end-percentage=50&view-timeline-axis=block&view-timeline-inset=0&subject-size=smaller&subject-animation=reveal&interactivity=clicktodrag&show-areas=yes&show-fromto=yes&show-labels=yes)ツールが理解の助けになるでしょう。値を変えて試すことができ、わかりやすく視覚化されているのでぜひご活用ください。

▼`animation-range: contain 0% contain 50%;`を指定した例 ![View Timeline Ranges Visualizer](https://ics.media/entry/230718/images/230718_scroll-driven-animations_tool.png)

### そのほかの作例

作り方のセクションにて紹介したデモに加え、新たにスティッキーな表現と組み合わせる動き・パララックス的なアニメーションを追加したデモです。物語の一部を用いており、没入感が生まれるような装飾とアニメーションを施しました。

▼Scroll-driven Animationsの作例ページ ![Scroll-driven Animationsの作例](https://ics.media/entry/230718/images/230718_scroll-driven-animations_demo.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230718_scroll_driven_animations/)
-   ソースコードを確認する（[HTML](https://github.com/ics-creative/230718_scroll_driven_animations/blob/main/index.html)、[CSS](https://github.com/ics-creative/230718_scroll_driven_animations/blob/main/style/style.css)）

色々な種類のアニメーションを使用しましたが、アニメーションとスクロールを連動させる部分は、スクロールタイムライン（`scroll()`関数）かビュータイムライン（`view()`関数）のどちらかであることがわかるかと思います。

前述の作り方とおおよそ同じ内容になるので解説は省略いたします。作例中のアニメーションについて詳しく知りたい方はサンプルコードをご確認ください。

#### Codepenの作例

[Codepen](https://codepen.io/search/pens?q=scroll-driven+animations)にはScroll-driven Animationsを使ってCSSだけで作られたデモがいくつかあります。

新技術であるためまだCodepenにアップロードされているデモの数は少ないですが、CSSだけでどのようなアニメーションが作れるのかが参考になるでしょう。

▼[左上](https://codepen.io/thebabydino/pen/QWVLBqe)、[右上](https://codepen.io/jh3y/pen/NWOJPoO)、[左下](https://codepen.io/fcalderan/pen/YzRVKMM)、[右下](https://codepen.io/jh3y/pen/xxQdPae)

![Codepen - Scroll-driven Animationsのデモ](https://ics.media/entry/230718/images/230718_scroll-driven-animations_codepen.webp)

また、どのようなアニメーションを作るかインスピレーションを得たい場合には、従来のJavaScriptによって実装された[スクラブアニメーションの作例](https://codepen.io/search/pens?q=scrub)なども参考にできます。

どのようなアニメーションが行われているか、どれくらいのスクロール量でアニメーションしていそうかを観察すれば、CSSに置き換えられるかもしれません。

### 対応ブラウザ

対応ブラウザは以下の通りです。Chrome 115・Edge 115（2023年7月リリース）、Safari 26.0（2025年9月）以上が対応しています。

非対応のブラウザや非対応のバージョンでは残念ながらアニメーションは再生されませんが表示自体はされます。対応ブラウザだけでも使ってみたい場合は取り入れてみてはいかがでしょうか。

▼[“animation-timeline” | Can I use…](https://caniuse.com/?search=animation-timeline)（Scroll-driven Animationsで使用する`animation-timeline`プロパティを検索しています）

![](https://ics.media/entry/230718/images/images/230718_scroll-driven-animations_table_250917.png)

### まとめ

CSSだけを使って作れるスクロール駆動アニメーションについてご紹介しました。作りたいと思ったアニメーションが、手軽に実装できるようになったのではないでしょうか。

実装のハードルが下がった分、今後はどのようなアニメーションを作るかが重要になりそうです。

まだすべてのブラウザが対応していませんが閲覧環境を気にせず使える日が来るといいですね！　 スクロールアニメーションだけでも参考になれば幸いです。

#### 参考サイト

-   [W3C Scroll-driven Animations](https://www.w3.org/TR/scroll-animations-1/)
-   [Scroll-driven Animations](https://scroll-driven-animations.style/)
-   [A case study on scroll-driven animations performance](https://developer.chrome.com/blog/scroll-animation-performance-case-study/)