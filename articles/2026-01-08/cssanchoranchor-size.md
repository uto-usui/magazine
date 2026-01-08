---
title: "CSSアンカーポジショニング入門〜anchor()・anchor-size()の使い方〜"
source: "https://ics.media/entry/251215/"
publishedDate: "2025-12-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "iwama"
---

2025年12月15日 公開 / [株式会社ICS 岩間 日菜](https://ics.media/entry/staff/iwama/)

**CSS Anchor Positioning**（CSSアンカー位置指定）は、要素の位置やサイズを「特定の要素（アンカー）」を基準にコントロールできる仕組みです。その中心となる`anchor()`関数では位置を、`anchor-size()`関数ではサイズを相対的に指定できます。主要ブラウザでも対応が進み、2026年中には全モダンブラウザで使用可能になるでしょう。

この記事では、`anchor()`/`anchor-size()`関数を使った具体的な表現手法や活用テクニックを、デモとともに紹介します。

![記事内で紹介する、anchor()関数とanchor-size()関数を使用したデモ一覧。左端はハートアイコンの位置移動に合わせてフキダシが移動するデモ。中央はハートアイコンの拡縮に合わせてフキダシも拡縮するデモ。右端は本棚風のUIでマウスカーソルをすべらせると、本の下に表示されているポインターアイコンがカーソルに合わせて移動するデモ。](https://ics.media/entry/251215/images/images/251215_demo.gif)

### 1\. 相対的な位置指定（`anchor()`関数）

`anchor()`関数を使うと、**要素同士の相対的な位置関係**をもとにレイアウトを指定できます。別の要素を**アンカー**として登録し、その位置を参照して座標を決めるイメージです。

引数には、アンカー要素のどの位置を参照するかの値（`top`、`left`、`center`、`start`、パーセンテージなど）を指定します。

```
.style {
  position: absolute;
  top: anchor(アンカー要素を基準にした位置);
  left: anchor(アンカー要素を基準にした位置);
}
```

以下のデモでは、動き回るアイコンにフキダシが追従します。

`anchor()`関数でフキダシの位置を指定しているため、アニメーションや座標の更新処理は不要です。アイコンの動きに合わせて、CSSだけで自動的に追従しているのがポイントです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251215_css_anchor/demo/01/)
-   [コードを確認する](https://github.com/ics-creative/251215_css_anchor/blob/main/demo/01/index.html)

▼ HTML（一部）

```
<div class="heart-icon">
  <img class="heart-image" alt="" src="...">
</div>
<div class="tooltip">
  <p>ハートがどこへ行っても下にピタッとついてくるよ。</p>
</div>
```

▼ CSS（一部）

```
/* 動き回るアイコン（アンカー） */
.heart-icon {
  position: absolute;
  animation: move-heart 10s ease-in-out infinite alternate;
  
  anchor-name: --tooltip-anchor; /* 🌟アンカー名を付ける */
}

/* フキダシ */
.tooltip {
  position: absolute;
  top: anchor(bottom);
  left: anchor(center);
  
  position-anchor: --tooltip-anchor; /* 🌟どのアンカーを見るか指定 */
}
```

### 2\. 相対的なサイズ指定（`anchor-size()`関数）

`anchor-size()`関数を使うと、**アンカー要素のサイズをもとに幅や高さを指定**できます。ターゲット要素の大きさに応じて装飾のサイズを自動調整したい場合や、リサイズ・アニメーションなどでサイズが変化する要素に追従させたい場合に便利です。

引数には、アンカー要素のどのサイズを参照するかの値（`width`、`height`、`inline`、`block`など）を指定します。参照するサイズと設定先は一致している必要がなく、たとえば`width: anchor-size(height)`のような指定も可能です。

```
.style {
  position: absolute;
  width: anchor-size(アンカー要素を基準にしたサイズ);
  height: anchor-size(アンカー要素を基準にしたサイズ);
}
```

以下のデモでは、拡大・縮小を繰り返すアイコンに対して、フキダシのサイズを`anchor-size()`関数で連動させています。アイコンの大きさが変わるたびに、フキダシも自動的にサイズ調整されます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251215_css_anchor/demo/02/)
-   [コードを確認する](https://github.com/ics-creative/251215_css_anchor/blob/main/demo/02/index.html)

▼ HTML（一部）

```
<div class="heart-icon">
  <img class="heart-image" alt="" src="...">
</div>
<div class="tooltip">
  <p>フキダシの大きさは、ハートの大きさに合わせて変わるよ。</p>
</div>
```

▼ CSS（一部）

```
/* サイズが大小するアイコン（アンカー） */
.heart-icon {
  position: absolute;
  animation: pulse-heart 10s ease-in-out infinite alternate;
  
  anchor-name: --tooltip-anchor; /* 🌟アンカー名を付ける */
}

/* フキダシ */
.tooltip {
  position: absolute;
  /* 位置指定（省略） */
  
  width: calc(anchor-size(width) * 4);
  height: calc(anchor-size(width) * 2.5);
  
  position-anchor: --tooltip-anchor; /* 🌟どのアンカーを見るか指定 */
}
```

### 3\. 応用 - リストの「今見ている要素」を指し示す

ここまでは、1つのアイコンと1つのフキダシの関係で、`anchor()`/`anchor-size()`関数を使ってきました。

以下の例では、`anchor()`関数を使って、本棚の中で「今見ている本」を指さすUIを実装します。マウスオーバーした本の真下に、指アイコンがぬるっと移動します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251215_css_anchor/demo/03/)
-   [コードを確認する](https://github.com/ics-creative/251215_css_anchor/blob/main/demo/03/index.html)

▼ HTML（一部）

```
<div>
  <div>
    <button class="book is-selected">
      <span>かんたん片付けBOOK</span>
      <span>山田山男</span>
    </button>
    <button class="book">
      <span>おもしろい折り紙</span>
      <span>折紙折太郎</span>
    </button>
    <button class="book">
      <span>魚についての本</span>
      <span>さかなたろう</span>
    </button>
    <button class="book">
      <span>三重県の歴史</span>
      <span>四日市花子</span>
    </button>
    <button class="book">
      <span>エンジニアになろう</span>
      <span>ICS</span>
    </button>
  </div>

  <!-- 指さしポインター（アンカーだけ見て動く） -->
  <div aria-hidden="true" class="pointer"></div>
</div>
```

▼ CSS（一部）

```
/* 本（アンカー候補） */
.book {
  position: relative;
  /* レイアウトまわりの指定は省略 */
}

/* 指さしポインター */
.pointer {
  position: absolute;
  top: calc(anchor(bottom) - 4rem);
  left: anchor(center);

  position-anchor: --selected-book; /* 🌟どのアンカーを見るか指定 */
}
```

▼ JavaScript（一部）

```
const buttons = document.querySelectorAll(".book");
let selectedBook = document.querySelector(".book.is-selected");
// 今ポインターが指している本
let currentAnchorTarget = selectedBook;

// 🌟ポインターの参照先（アンカー）を付け替える処理
const updateAnchor = (target) => {
  currentAnchorTarget.style.anchorName = "";
  currentAnchorTarget = target;
  currentAnchorTarget.style.anchorName = "--selected-book";
};

// 初期状態は選択中の本を指す
updateAnchor(selectedBook);

// クリックやホバーなどのイベントからupdateAnchor(book) を呼び出して切り替える
// （省略）
```

このデモにおいても、座標の計算にはJavaScriptを使用していません。JavaScript側では「どの本をアンカーにするか」だけを切り替え、最終的な位置決めはすべてCSSの`anchor()`関数に任せています。

### ブラウザ対応状況

`anchor()`関数と`anchor-size()`関数は、2025年12月現在、Chrome・Edge 125（2024年5月）以上、Safari 26.0（2025年9月）以上で利用できます。

-   参照：[“anchor()” | Can I use…](https://caniuse.com/?search=anchor%28%29)

![anchor()関数の対応ブラウザ](https://ics.media/entry/251215/images/images/251215_css-anchor_caniuse.jpg)

-   参照：[“anchor-size()” | Can I use…](https://caniuse.com/?search=anchor-size%28%29)

![anchor-size()関数の対応ブラウザ](https://ics.media/entry/251215/images/images/251215_css-anchor-size_caniuse.jpg)

### まとめ

ツールチップ・ポップオーバー・追従するUIなどは、これまでJavaScriptでの座標計算が必要でした。CSSの`anchor()`関数や`anchor-size()`関数を活用することで、よりシンプルに実装できるようになります。

また、CSS Anchor Positioningには、座標やサイズを数値で制御する`anchor()`/`anchor-size()`関数のほかに、**配置する領域を指定する**ための`position-area`というプロパティも用意されています。`position-area`では、アンカー要素の上下左右など、どの領域に配置するかを宣言的に指定できます。

Google I/O 2025で発表された『[What’s new in web UI](https://youtu.be/VTCIStB6y8s?si=OAHZb25Fc2WwPn3I)』セッションでも、CSS Anchor Positioningについて言及されています。

ICS MEDIAでは、以前にもCSS Anchor Positioning関連のトピックを取り上げています。あわせてチェックしてみてください。

-   [階層メニューやトーストUIが簡単に作れる新技術！ JavaScriptで利用するポップオーバーAPI](https://ics.media/entry/230530/#4.-%E3%83%84%E3%83%BC%E3%83%AB%E3%83%81%E3%83%83%E3%83%97)
-   [has()疑似クラスでコーディングが変わる！　CSS最新スタイリング](https://ics.media/entry/240808/#anchor-positioning%E3%81%A8%E7%B5%84%E3%81%BF%E5%90%88%E3%82%8F%E3%81%9B%E3%81%9F%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)

### 参考

-   [una.im | Follow-the-leader pattern with CSS anchor positioning](https://una.im/follow-the-anchor)
-   [CSS anchor positioning API | CSS and UI | Chrome for Developers](https://developer.chrome.com/docs/css-ui/anchor-positioning-api?hl=ja)
-   [anchor() - CSS | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Values/anchor)
-   [anchor-size()（英語） - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor-size)