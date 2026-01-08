---
title: "JavaScript不要! HTMLとCSSでつくるカルーセルUI"
source: "https://ics.media/entry/250516/"
publishedDate: "2025-05-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "sawada-naomi"
---

2025年5月16日 公開 / [株式会社ICS 澤田 ナオミ](https://ics.media/entry/staff/sawada-naomi/)

2025年4月にリリースされたChrome 135、Edge 135からHTMLとCSSのみでカルーセルUIがつくれるようになりました。新たに追加された`::scroll-button()`、`::scroll-marker`疑似要素を使用して、ボタンやインジケーターが実装可能です。

▼HTML・CSSだけで実装したカルーセル

![](https://ics.media/entry/250516/images/250516_simple_carousel.gif)

カルーセルUIといえば、いちから自前で用意するのではなく[Swiper.js](https://swiperjs.com/)などのJSライブラリを採用してきたコーダーも多いのではないでしょうか？　ICS MEDIAでもカルーセルUIを作成できるJSライブラリをまとめた記事があります。

-   『[カルーセルUIを実現するJSライブラリまとめ - 導入手間や機能の比較紹介](https://ics.media/entry/210902/)』

本記事では、新しいCSSでどのようなカルーセルが実現可能になるのか紹介します。

**ご注意：本記事のデモは、Chrome 135・Edge 135以上で閲覧ください。**

### ①シンプルなカルーセル

はじめに、次の機能を持ったシンプルなカルーセル例を紹介します。

-   画像を1枚表示して、1枚ずつスライド
-   前へ・次へボタンの表示
-   インジケーターの表示

▲実際に操作してお試しください。AndroidのChromeで閲覧の場合は、スワイプ操作が可能です。

-   [デモを別タブで開く](https://ics-creative.github.io/250516_css_carousel/01/)
-   [ソースコードを見る](https://github.com/ics-creative/250516_css_carousel/tree/main/01)

▼HTML一部抜粋

```
<div class="container">
  <ul class="carousel">
    <li class="item"><img src="./images/flower_01.jpg" alt="" /></li>
    <li class="item"><img src="./images/flower_02.jpg" alt="" /></li>

    <!-- 省略 -->
  </ul>
</div>
```

▼CSS一部抜粋

```
/* ----------------------*
 * コンテナー
 * ----------------------*/
.container {
  /* 省略 */

  /* 各パーツ配置をグリッドでレイアウト */
  display: grid;
  grid-template-areas: "item item item" "left markers right";
  
  /* 省略 */
}

/* ----------------------*
 * カルーセル
 * ----------------------*/
.carousel {
  display: grid;
  /* アイテムを横並びにする */
  grid-auto-flow: column;
  grid-area: item;
  /* 次のスライドとの間隔 */
  gap: 120px;
  overflow-x: auto;
  /* X方向にスナップ */
  scroll-snap-type: x mandatory;
  /* 1度に1枚ずつ移動 */
  scroll-snap-stop: always;
  /* スムーズにスクロールさせる */
  scroll-behavior: smooth;
  /* インジケーターの表示 */
  scroll-marker-group: after;
  /* スクロールバー非表示 */
  scrollbar-width: none;

  /* 省略 */
}

```

HTMLはカルーセルを囲む要素（`div.container`）とカルーセル本体の画像リスト（`ul.carousel`）のみで非常にシンプルです。

今回のシンプルなカルーセルで肝となるのが、冒頭で登場した`::scroll-button()`、`::scroll-marker`疑似要素です。それぞれ前へ・次へボタンとインジケーターの表示に必要です。

#### ::scroll-button()で前へ・次へボタンの表示

カルーセル本体の`ul.carousel`に対して`::scroll-button()`疑似要素を設定することで、前へ・次へボタンを表示させています（※）。カッコ内は`*`で両方のボタンが指定可能になり、`left`、`right`で左右それぞれのボタンのスタイルを指定できます。

※`::scroll-button()`疑似要素はスクロール可能な要素に対してのみ有効です。

▼CSS一部抜粋

```
/* ----------------------*
 * カルーセル
 * ----------------------*/
.carousel {
  /* 省略 */

  /* 前へ・次へボタン */
  &::scroll-button(*) {
    width: 50px;
    height: 50px;
    border-radius: 50%;

    /* 省略 */
  }

  /* 前へボタン（左） */
  &::scroll-button(left) {
    /* 表示内容 / 代替テキスト */
    content: "◀" / "前へ";
    grid-area: left;
    justify-self: end;
  }

  /* 次へボタン（右） */
  &::scroll-button(right) {
    /* 表示内容 / 代替テキスト */
    content: "▶" / "次へ";
    grid-area: right;
  }

  /* 省略 */
}
```

-   参考：[::scroll-button() - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-button)

#### ::scroll-markerでインジケーターの表示

インジケーターは、`li.item`に設定している`::scroll-marker`疑似要素で表示しています。各ドットの見た目もカスタマイズ可能です。インジケーター自体の配置を制御するには、`::scroll-marker-group`を親要素の`ul.carousel`に対して設定します。

▼CSS一部抜粋

```
/* ----------------------*
 * カルーセルの画像アイテム
 * ----------------------*/
.item {
 /* インジケーター */
  &::scroll-marker {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
   
    /* 省略 */
  }

  /* インジケーターのカレントスタイル */
  &::scroll-marker:target-current {
    background-color: blue;
  }
}
```

参考：

-   [::scroll-marker - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-marker)
-   [::scroll-marker-group - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-marker-group)

まとめると、シンプルなカルーセルは次のような構造になります。

![](https://ics.media/entry/250516/images/250516_simple_carousel_explanation.png)

ここからは、ウェブサイト制作で見かけることの多いレイアウトパターンを紹介します。

### ②インジケーターに画像を設定したカルーセル

ECサイトの商品詳細ページ等でよく見かけるようなレイアウト例です。

-   [デモを別タブで開く](https://ics-creative.github.io/250516_css_carousel/02/)
-   [ソースコードを見る](https://github.com/ics-creative/250516_css_carousel/tree/main/02)

特徴的なのはインジケーターが画像ボタンとなり、スライドの画像と対応していることです。この仕組みはCSSのカスタムプロパティ（CSS変数）を利用して実現しています。

▼HTML・CSSを一部抜粋

```
<ul class="carousel">
  <!-- style属性で --img に画像のurlを設定 -->
  <li
    class="item"
    style="--img: url(/250516_css_carousel/02/images/product_01.jpg)"
  >
    <img src="/250516_css_carousel/02/images/product_01.jpg" alt="" />
  </li>

  <!-- 省略 -->
</ul>
```

```
/* インジケーター */
&::scroll-marker {
  /* 省略 */

  /* 背景画像を設定 --imgには画像のsrc属性のurlが入る */
  background-image: var(--img);
  
  /* 省略 */
}
```

カスタムプロパティは、接頭辞`--`をつけた任意の変数名を設定すると`var()`関数で取り出して使用できる機能です。上記ではCSSの`background-image`の画像urlに、HTMLの`img`タグの`src`属性と同じurlが入るように設定しています。

※本デモでは画像パスがCSSファイル配置場所により変化しないようルートパスで記述しています。

-   参考：[カスタムプロパティ (–\*): CSS 変数 - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/--*)

### ③横幅いっぱいのカルーセル

ウェブサイトのトップページで見かけることの多いレイアウトではないでしょうか。リンクつきのバナー画像があり、画像をクリックすると別のページへ遷移できるイメージです。

-   [デモを別タブで開く](https://ics-creative.github.io/250516_css_carousel/03/)
-   [ソースコードを見る](https://github.com/ics-creative/250516_css_carousel/tree/main/03)

このレイアウトでは、前へ・次へボタンはカルーセルの中に配置されています。今回はレイアウトを実現するために、`position-anchor`プロパティを使用してボタンの位置を調整しています。

▼CSSを一部抜粋

```
/* ----------------------*
 * カルーセル
 * ----------------------*/
.carousel {
  /* 基準にするため、アンカー名を指定 */
  anchor-name: --carousel;

  /* 省略 */

  /* 前へ・次へボタン */
  &::scroll-button(*) {
    position: absolute;
    /* カルーセルの位置を基準にする */
    position-anchor: --carousel;
    top: anchor(center);
    transform: translateY(-50%);

    /* 省略 */
  }
}
```

基準としたい要素（今回は`ul.carousel`）に`anchor-name`で名前を設定し、`::scroll-button()`疑似要素側で`position-anchor: --carousel;`を指定します。カルーセル上に、上下中央にボタンが配置可能になります。

注意点として`anchor-name`プロパティと`position-anchor`プロパティについても、主要なブラウザの中ではChrome・Edgeのみで対応しています（2025年5月現在）。詳細は次のサイトを参照ください。

参考サイト：

-   [anchor-name - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor-name)
-   [position-anchor - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position-anchor)

### アクセシビリティーに関するメリット

本記事のカルーセルの実装方法には、アクセシビリティーの利点が挙げられます。具体的にはどのような恩恵が得られるのでしょうか。「①シンプルなカルーセル」のデモを例にいくつか紹介します。

#### キーボード操作可能

![](https://ics.media/entry/250516/images/250516_simple_carousel.gif)

カルーセルの前へ・次へボタンやインジケーターがキーボードのタブキー・矢印キーで操作できます。それぞれ`button`や`tablist`等の`role`属性が自動で設定されるためです。開発者ツールでアクセシビリティーツリーを確認すると、次のように設定されていることがわかります。

![](https://ics.media/entry/250516/images/250516_role.png)

#### スクリーンリーダーで適切に読み上げられる

![](https://ics.media/entry/250516/images/250516_screenreader.png)

スクリーンリーダーによる読み上げについても、たとえばインジケーターのボタンであれば「何番目を選択しているか」といった情報が適切に読み上げられます。

JavaScriptを使用せずに済むという点以外にも、自前で実装しようとすると複雑になりかねない処理を自動に行ってくれるのは嬉しいですね。

### 使用の注意点：対応ブラウザ状況と未対応の機能

ここまで、CSSでつくるカルーセルUIを紹介してきました。ウェブサイト制作に取り入れるにはまだ難しい部分もあるため、改めて注意点についても触れておきます。

1.  対応ブラウザが限られている（2025年5月現在でChrome・Edgeのみ）
2.  検討されているが、まだ実現できない機能がある

`::scroll-button()`と`::scroll-marker`疑似要素の対応ブラウザ状況については次の通りです。

![スクリーンショット：Can I use..での::scroll-button()疑似要素の対応ブラウザ状況](https://ics.media/entry/250516/images/250516_caniuse_scroll-button.png)

-   参照：[::scroll-button() | Can I use…](https://caniuse.com/mdn-css_selectors_scroll-button)

![スクリーンショット：Can I use..での::scroll-marker疑似要素の対応ブラウザ状況](https://ics.media/entry/250516/images/250516_caniuse_scroll-marker.png)

-   参照：[::scroll-marker | Can I use…](https://caniuse.com/mdn-css_selectors_scroll-marker)

2番目の「まだ実現できない機能」については、ループ機能などが該当します。最後のスライドを表示している状態で「次へ」ボタンをクリックした場合は先頭のスライドを表示させるといった挙動を指します。JSライブラリではオプションとして設定できることが多いのでぜひほしい機能ですね。

### まとめ

JavaScriptなしでは難しかったカルーセルUIも、手軽かつアクセシブルに実装できるようになってきました。また今回はデモに含めていないのですが、紹介した疑似要素はカルーセルUIだけでなくタブUIとしても活用ができます。実際のプロジェクトでの採用はまだまだ慎重にならざるを得ないですが、今後の機能追加やサポート拡大に期待したいです！

### 参考サイト

-   [CSS を使用したカルーセル | Blog | Chrome for Developers](https://developer.chrome.com/blog/carousels-with-css?hl=ja)
-   [Carousel Gallery](https://chrome.dev/carousel/)