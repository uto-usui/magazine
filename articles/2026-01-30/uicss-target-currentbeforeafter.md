---
title: "スクロール連動UIはCSSだけで作れる！ 疑似クラス:target-current/before/afterが便利"
source: "https://ics.media/entry/260130/"
publishedDate: "2026-01-30"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

CSSには、スクロール位置が対象コンテンツの「前か」「後か」を判定するのに役立つものがあります。`:target-before`、`:target-after`、`:target-current`の3つの疑似クラス、`scroll-target-group`プロパティを使うと、今までJavaScriptを必要としていたスクロール連動のインタラクションをCSSだけで実現できます。

この記事ではそれぞれのCSSの使い方と、CSSだけで実装したインタラクションのデモを紹介します。

**※注意：本記事のデモは、Chrome・Edge 142以上でご覧ください。**

### スクロールに連動させるCSSの基本の使い方

ウェブサイトの「目次」を例に基本的な使い方を説明します。スクロールに連動して目次のスタイルが切り替わるインタラクションをCSSだけで実装してみます。

スクロールが通過したコンテンツは「通過ずみ」のスタイル、今表示しているところは「強調」、これから表示するところは「未到達」のスタイルを設定します。

![](https://ics.media/entry/260130/images/260130_table_of_content.jpg)

#### 1\. 外側に`scroll-target-group`プロパティを設定

まずはスクロールに応じたスタイルを設定したい要素の外側の要素に`scroll-target-group: auto`を記述します。`scroll-target-group`は`auto`または`none`のどちらかを指定します。スクロールに連動させたい場合は`auto`を使います。

この例では目次を`<ol>`要素と`<li>`要素でマークアップしています。外側である`<ol>`要素に`scroll-target-group: auto`を設定します。

```
<ol class="list">
  <li>目次1</li>
  <li>目次2</li>
  <li>目次3</li>
</ol>
```

```
.list {
  scroll-target-group: auto;
}
```

#### 2\. リストの中に`<a>`要素を配置する

`scroll-target-group: auto`を設定したコンテナーの子孫に`<a>`要素を配置します。

`<a>`要素に`href="#section1"`を設定します。`:target-before`などの疑似クラスは、**リンク先の要素（`<section id="section1">`）の表示位置と連動して有効化される**ため、現在のスクロール位置にもとづいた表現が可能になります。

```
<ol class="list">
  <li><a href="#section1">目次1</a></li>
  <li><a href="#section2">目次2</a></li>
  <li><a href="#section3">目次3</a></li>
</ol>

<section id="section1">
  目次1の内容です
</section>
```

#### 3\. 疑似クラスにスタイルを記述する

スクロールに連動したスタイルで使える疑似クラスは以下の3つです。それぞれの疑似クラスに異なるスタイルを記述してみます。

-   `:target-current`：現在表示中の状態
-   `:target-before`：スクロール通過ずみの状態
-   `:target-after`：スクロール未到達の状態

`:target-current`疑似クラスに関しては『[JavaScript不要! HTMLとCSSでつくるカルーセルUI](https://ics.media/entry/250516/)』でも紹介しているのであわせてご確認ください。

```
.list {
  /* 省略 */

   /* スクロール通過ずみ: 薄いグレー */
  a:target-before {
    color: #999;
  }

  /* 現在表示中: 強調表示 */
  a:target-current {
    color: #0066cc;
    font-weight: bold;
  }

  /* スクロール未到達: 濃いグレー */
  a:target-after {
    color: #333;
  }
}
```

最小限の実装でスクロールと連動したインタラクションを実装できました。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260129_target_after_before/00_example/)
-   [コードを確認する](https://github.com/ics-creative/260129_target_after_before/blob/main/docs/00_example/style.css)

### デモの紹介

使い方がわかったところでデモを紹介します。いずれもスタイルはCSSのみで記述しています。

#### デモ①：目次

使い方の説明で実装した目次とほぼ同じ仕組みですが、ヘッダーのメニューに適用した例です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260129_target_after_before/01_header/)
-   [コードを確認する](https://github.com/ics-creative/260129_target_after_before/blob/main/docs/01_header/style.css)

```
.nav__list {
  /* 省略 */
  scroll-target-group: auto;
}

.nav__link {
  /* 省略 */

  /* スクロール通過ずみ */
  &:target-before {
    color: var(--color-text-muted);
  }

  /* 現在表示中 */
  &:target-current {
    color: var(--color-primary);
    text-decoration: underline;
  }

  /* スクロール未到達 */
  &:target-after {
    color: var(--color-secondary);
  }
}
```

#### デモ②：進捗を表示

スクロールの状態に応じて進捗をわかりやすく表示したデモです。申し込みフォームなどにも応用できそうです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260129_target_after_before/02_progress/)
-   [コードを確認する](https://github.com/ics-creative/260129_target_after_before/blob/main/docs/02_progress/style.css)

```
.progress__item {
  /* 省略 */

  /* スクロール通過ずみ */
  /* step間の縦線を表示 */
  &:has(.progress__link:target-before)::after {
    height: 100%;
  }
}

.progress__link {
  /* 省略 */

  /* スクロール通過ずみ */
  &:target-before {
    color: var(--color-text-muted);

    /* ✔️アイコンを表示 */
    .progress__text::after {
      content: "✔️";
      position: absolute;
      top: 0;
      right: -18px;
    }

    .progress__badge {
      color: var(--color-text-muted);
    }
  }

  /* 現在表示中 */
  &:target-current {
    color: var(--color-primary);

    .progress__badge {
      background-color: var(--color-primary);
      color: var(--color-white);
      border-color: transparent;
    }
  }

  /* スクロール未到達 */
  &:target-after {
    color: var(--color-text);
  }
}
```

`:has()`疑似クラスを使うと、リッチなスタイルも簡潔に記述できます。`:has()`疑似クラスの使い方は『[has()疑似クラスでコーディングが変わる！　CSS最新スタイリング](https://ics.media/entry/240808/)』で詳しく解説しています。

#### デモ③：横スクロールと組み合わせた例

縦スクロールだけでなく横スクロールでも使えます。旅程を表示した以下のデモでは横のスクロール位置に応じてヘッダーのスタイルが変わります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260129_target_after_before/03_horizontal/)
-   [コードを確認する](https://github.com/ics-creative/260129_target_after_before/blob/main/docs/03_horizontal/style.css)

```
.nav__list {
  &::after {
    /* バスのアイコンをアンカーポジショニングで表示 */
    top: anchor(top);
    right: anchor(right);
    height: anchor-size(height);
    width: calc(anchor-size(width) + 24px);
    position-anchor: --current-city;
    /* 省略 */
  }
}

.nav__item {
  /* 省略 */

  /* 現在表示中 */
  &:has(.nav__link:target-current) {
    border-bottom: 1px solid var(--color-border);
  }

  /* スクロール未到達 */
  &:has(.nav__link:target-after) {
    border-bottom: 1px solid var(--color-border);
  }
}

.nav__link {
  /* 省略 */

  /* スクロール通過ずみ */
  &:target-before {
    color: var(--color-text-muted);
  }

  /* 現在表示中 */
  &:target-current {
    color: var(--color-primary);
    /* 現在表示中の要素をアンカーとして指定。バスのアイコンを移動させる */
    anchor-name: --current-city;
  }
}
```

バスのアイコンが移動するスタイルはCSSのアンカーポジショニングを使用しています。詳しくは『[CSSアンカーポジショニング入門　anchor()・anchor-size()の使い方](https://ics.media/entry/251215/)』をご確認ください。

### 対応ブラウザ

`:target-before`、`:target-after`疑似クラスは、Chrome・Edge 142（2025年10月）以上で利用可能です。

参照：[Can I use…](https://caniuse.com/wf-scroll-marker-targets)

### まとめ

`:target-before`、`:target-after`疑似クラスを使うことで、JavaScriptなしでインタラクティブなUIを簡単に実装できるようになりました。現在はChromeとEdgeだけの機能ですが、今後他のブラウザにも広がることを期待したいですね！