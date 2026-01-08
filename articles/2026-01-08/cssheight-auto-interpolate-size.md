---
title: "CSSでheight: autoでもアニメーションが可能に! interpolate-sizeとは"
source: "https://ics.media/entry/250627/"
publishedDate: "2025-07-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

UIのインタラクションの実装で、`height: 0` → `auto`など、数値とキーワード値とをアニメーションさせたいと思ったことはないでしょうか。 一見可能そうに見えるものの、従来はCSSのみではアニメーションが不可能でした。代替手段として数値同士を変更してトランジションを実装したり、JavaScriptでの実装を行うほかありませんでした。

-   [height: autoの代わりに、offsetHeightを取得してアコーディオンの開閉アニメーションを実装する例](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo3-1/webAnimationsApiAccordion.js#L78)

Chrome 129、Edge 129（2024年9月）で登場した、CSSの`interpolate-size`プロパティと`calc-size()`関数により、固有キーワード値のアニメーションが可能になりました。本記事では`interpolate-size`と`calc-size()`がどのようなものなのか、作例とともに紹介します。

※本記事の作例は、Chrome 129・Edge 129（2024年9月）以上でご覧ください。2025年7月現在、Safari・Firefoxでは動作しません。

### `interpolate-size`

`interpolate-size`インターポレート・サイズプロパティは、`auto`や`min-content`などの固有キーワード値サイズと数値間のアニメーションを有効にできるプロパティです。`root`要素に以下の指定を追加することで、全体的に有効になります。

```
:root {
  interpolate-size: allow-keywords;
}
```

-   [interpolate-size - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size)

`allow-keywords`値を指定すると、**一方が固有キーワード値でもう一方が数値の場合、アニメーションが補間**されます。**異なる固有キーワード値同士の補間はできない**ので注意が必要です。

アニメーション可能な固有キーワード値は以下の通りです。

-   `auto`
-   `min-content`
-   `max-content`
-   `fit-content`
-   `content`（`flex-basis`を使用したコンテナーの場合）

#### 文字量に応じた幅のトランジション

以下は、ホバーやフォーカスした際、文字の量に合わせて`width`プロパティが`auto`な幅にアニメーションする例です。

![メニューの作例](https://ics.media/entry/250627/images/images/250627_interpolate_size_menu.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250627_interpolate_size/menu/)
-   [コードを確認する](https://github.com/ics-creative/250627_interpolate_size/blob/main/menu/index.html)

▼ CSS（一部抜粋）

```
:root {
  interpolate-size: allow-keywords;
}

.button {
  width: 56px; /* ホバー前の幅 */
  transition: width 0.4s;
  overflow: hidden;
  white-space: nowrap;
  display: grid;
  grid-auto-flow: column;

  &:hover,
  &:focus-visible {
    /* 隠していた文字を表示 */
    width: auto;
  }
}
```

▼ HTML（一部抜粋）

```
<button class="button">
  <span class="button-icon"><span class="material-icons">share</span></span>
  <span class="button-text">シェア</span>
</button>
<button class="button">
  <span class="button-icon"><span class="material-icons">link</span></span>
  <span class="button-text">URLをコピーする</span>
</button>
```

#### アコーディオンに使用した例

続いて、アコーディオンの開閉アニメーションに使用した例です。`interpolate-size: allow-keywords;`を指定すれば、詳細コンテンツの量に応じてアコーディオンの高さが変わるアニメーションが簡単に実装できます。

![アコーディオンの高さが変わる例](https://ics.media/entry/250627/images/images/250627_interpolate_size_accordion.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250627_interpolate_size/accordion/)
-   [コードを確認する](https://github.com/ics-creative/250627_interpolate_size/blob/main/accordion/index.html)

アコーディオンの作り方については、記事『[detailsとsummaryタグで作るアコーディオンUI](https://ics.media/entry/220901/)』で解説しています。ぜひご一読ください。

今回は`::details-content`疑似要素に対し、高さを変更するアニメーションを適用しています。

`details`要素によるアコーディオンは、開閉時`content-visibility`プロパティによって詳細コンテンツの表示状態が切り替わります。`content-visibility`プロパティをアニメーションさせる際は、`transition-behavior`プロパティに`allow-discrete`（離散アニメーションプロパティの許可）を指定しておく必要があります。

-   [transition-behavior - CSS | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/transition-behavior)

▼ CSS（一部抜粋）

```
:root {
  interpolate-size: allow-keywords;
}

details {
  /* アコーディオンが閉じている時の中身のスタイル */
  &::details-content {
    transition: height 0.4s, content-visibility 0.4s allow-discrete;
    height: 0;
    overflow: clip;
  }

  /* アコーディオンが開いた時の中身のスタイル */
  &[open]::details-content {
    height: auto;
  }
}
```

▼ HTML

```
<details>
  <summary>
    アコーディオン
  </summary>
  <div>
    1行目<br>2行目
  </div>
</details>
```

### `calc-size()`

`interpolate-size: allow-keywords;`は固有キーワード値のアニメーションを可能にする全体的な設定でしたが、`calc-size()`関数は、`auto`や`min-content`などのキーワードに数値を加減・乗除できる関数です。**計算が必要な細かい制御を行いたい場合に使用**します。

-   [calc-size() - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/calc-size)

▼ 実装例

```
button {
  width: 72px; /* アニメーション前のサイズ */
  transition: width 0.4s;
  
  &:hover {
    width: calc-size(auto, size + 100px);  /* auto + 100px のサイズ */
  }
}
```

1つ目の引数にはアニメーション可能な固有キーワード値を指定します。アニメーション可能な固有キーワード値は`interpolate-size: allow-keywords;`を指定した場合と同様の値です。

-   `auto`
-   `min-content`
-   `max-content`
-   `fit-content`
-   `content`（`flex-basis`を使用したコンテナーの場合）

2つ目の引数には計算サイズを渡します。計算サイズの基準として`size`キーワードを使用し、この`size`キーワードは第1引数の値を表します。

```
width: calc-size(auto, size + 10px);  /* auto + 10px */
width: calc-size(max-content, size * 0.8); /* max-content * 0.8 */
width: calc-size(fit-content, max(50vw, size + 100px));  /* max(50vw, fit-content + 100px) */
```

#### calc-sizeを使用したトランジション

以下はメニューの開閉アニメーションで`calc-size()`を使用した作例です。基本は内部のコンテンツに合わせて`min-content`な幅としつつ、`calc-size`で余白分の幅を追加しています。

![calc-size()を使用したメニューの作例](https://ics.media/entry/250627/images/images/250627_interpolate_size_calc_size.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250627_interpolate_size/menu2/)
-   [コードを確認する](https://github.com/ics-creative/250627_interpolate_size/blob/main/menu2/index.html)

`calc-size()`は固有キーワード値との計算を部分的に使用できる関数なので、`interpolate-size: allow-keywords;`の指定はしなくても動作します。

▼ CSS（一部抜粋）

```
.menu {
  width: 72px;  /* メニューが閉じてるときの幅 */
  height: 72px;
  transition: width 0.4s;

  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  overflow: clip;

  /* 隠していたアイテムを表示 */
  &.open {
    width: auto; /* フォールバック */
    width: calc-size(min-content, size + 14px); /* min-content + 14px */
  }
}
```

▼ HTML

```
<div class="menu">
  <button class="homeButton">
    <span class="homeButton-icon"><span class="material-icons">audiotrack</span></span>
  </button>

  <div class="menu-items">
    <button class="button">
      <span class="material-icons">skip_previous</span>
    </button>
    <button class="button">
      <span class="material-icons">pause</span>
    </button>
    <button class="button">
      <span class="material-icons">fast_forward</span>
    </button>
  </div>
</div>

<script>
  document.querySelector('.homeButton').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('open');
  });
</script>
```

### 対応ブラウザー

`interpolate-size`プロパティと`calc-size()`関数はChrome 129、Edge 129（2024年9月）以上でサポートされています。2025年7月現在、Safari、Firefoxはサポート対象外なのでご注意ください。

![](https://ics.media/entry/250627/images/images/250627_interpolate_size_support.png)

-   [CSS property: interpolate-size | Can I use…](https://caniuse.com/mdn-css_properties_interpolate-size)
    
-   [types: `calc-size()` | Can I use…](https://caniuse.com/mdn-css_types_calc-size)
    

### まとめ

`interpolate-size`プロパティと`calc-size()`関数について紹介しました。`interpolate-size`プロパティと`calc-size()`関数は、一見簡単そうでいて難しかった固有キーワード値のアニメーションを可能にします。

紹介した作例では、主に`transition`プロパティでアニメーションを実装しましたが、**`@keyframes`アットルールを用いた`animation`プロパティでアニメーションさせることも可能**です。

-   [おまけ | @keyframesの検証](https://ics-creative.github.io/250627_interpolate_size/menu2/test.html) (サンプルが別ウインドウで開きます）
-   [コードを確認する](https://github.com/ics-creative/250627_interpolate_size/blob/main/menu2/test.html)

2025年7月現在使用可能なブラウザは限られていますが、とても便利なCSSです。ぜひ使ってみてください。

#### 参考

-   [高さまでアニメーション化: auto;（および他の固有のサイズ設定キーワード）を CSS 内で指定 | CSS and UI | Chrome for Developers](https://developer.chrome.com/docs/css-ui/animate-to-height-auto?hl=ja)