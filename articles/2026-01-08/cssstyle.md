---
title: "CSSのコンテナースタイルクエリーstyle()の使い方"
source: "https://ics.media/entry/240723/"
publishedDate: "2024-07-23"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

コンテナークエリーは、要素の幅を条件にする機能だけでなく、**CSS変数を条件にスタイルを適用する、コンテナースタイルクエリー**という機能があります。活用することで、ひとつのクラスに異なるバリエーションのスタイルを定義できます。

前回の記事『[要素の幅でレスポンシブ対応を行える！コンテナークエリーの使い方](https://ics.media/entry/240617/)』では、コンテナークエリーの基本的な使い方を紹介しました。本記事では、コンテナースタイルクエリーの使い方を紹介します。

※本記事のデモは、ChromeまたはEdgeでご覧ください。ブラウザのサポート状況は、後述する「対応ブラウザ」を参照ください。

### コンテナースタイルクエリーの使い方

`@container`の条件を`style()`関数で定義することで、コンテナースタイルクエリーを利用できます。関数の引数には、条件とするCSS変数と値を設定します。CSS変数は、親要素に定義された値を参照します。

また、[前回の記事](https://ics.media/entry/240617/)では、コンテナークエリーを使用するためには親要素に`container-type`プロパティが必要と説明しましたが、コンテナースタイルクエリーを使用する場合は不要です。

▼コンテナースタイルクエリーの実装イメージ

```
/* 親要素で定義された --item-color の値が一致するとき、背景を黒色にする */
@container style(--item-color: "#ffffff") {
  .item {
    background-color: #000000;
  }  
}
```

次の作例では、2つのボタンに同じクラスを指定して、2つ目のボタンに異なるバリエーションのスタイルを適用してみます。異なるバリエーションとして、セカンダリーの見た目となるスタイルを適用します。

![](https://ics.media/entry/240723/images/240723_style_query_demo.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240723_container-query-utils/#style-query)（ChromeやEdgeでご覧ください）
-   [コードを確認する](https://github.com/ics-creative/240723_container-query-utils/blob/main/docs/button.css)

▼作例の実装イメージ

```
<!-- 1つ目のボタン -->
<div>
  <button type="button" class="button">
    <span>ボタン</span>
  </button>
</div>

<!-- 2つ目のボタン。セカンダリーの見た目となるスタイルを適用する -->
<!-- 参照したいCSS変数を親要素に指定する -->
<div style='--secondary: "true"'>
  <button type="button" class="button">
    <span>ボタン</span>
  </button>
</div>
```

```
.button {
  /* 省略 */

  color: #fff;
  background-color: #3223B3;
}

/* --secondary の値が一致するとき、セカンダリーの見た目となるスタイルを適用する */
@container style(--secondary: "true") {
  .button {
    color: #3223B3;
    background-color: #EBE9FC;
  }
}
```

従来の実装では、クラスを追加する対応が考えられましたが、CSS変数に置き換えてスタイルを管理できるようになりました。コンテナースタイルクエリーを利用することで、ひとつのクラスで異なるバリエーションのスタイルを管理できます。

▼従来の実装イメージ

```
<button type="button" class="button button--secondary">
  <span>ボタン</span>
</button>
```

```
.button {
  /* 省略 */
}
.button.button--secondary {
  color: #3223B3;
  background-color: #EBE9FC;
}
```

#### 対応ブラウザ

コンテナースタイルクエリーの対応ブラウザは次の通りです。2024年7月時点では部分的なサポートがされています。

-   Chrome 111・Edge 111（2023年3月リリース）以上

※将来的には、CSS変数だけでなくCSSプロパティも条件に指定できる見込みです。

▼[Can I use…](https://caniuse.com/css-container-queries-style)

![](https://ics.media/entry/240723/images/240723_style_query_support.png)

### そのほかの機能：コンテナークエリーに関する単位

ここからは、スタイルクエリーに限らない話題として、コンテナークエリーに関する単位を説明します。

`container-type`プロパティが設定された要素の子要素は、`cqw`といった**コンテナーのサイズを示す単位**を利用できます（`1cqw` = コンテナーの幅の1%）。コンテナーの幅に応じて、余白や文字サイズを動的に拡縮したいときに便利な機能です。

▼文字サイズを拡縮する実装イメージ

```
<div class="article_wrapper">
  <div class="article">
    <p class="article_title">テキスト</p>
  </div>
</div>
```

```
.article_wrapper {
  container-type: inline-size;
}

.article {
  /* 省略 */
}

.article_title {
  /*
   * 文字サイズを .article_wrapper の幅に応じて拡縮する。
   *
   * 最小値: 0.625rem
   * 中間値:
   *    .article_wrapper の幅に応じて文字サイズを拡縮する。
   *    .article_wrapper の幅が640pxのとき、文字サイズは18pxとする。
   * 最大値: 5rem
   */
  font-size: clamp(0.625rem, 18 / 640 * 100cqw, 5rem);
}
```

次の作例では、コンテナークエリーで作成した横並びのパーツを1カラムの親要素に配置しています。親要素の幅に応じて、余白と文字サイズを動的に拡縮します。

作例の上部にあるレンジスライダーで、親要素の最大幅を調整できるので試してみてください。

![](https://ics.media/entry/240723/images/240723_units_demo.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240723_container-query-utils/#units)
-   [コードを確認する](https://github.com/ics-creative/240723_container-query-utils/blob/main/docs/article.css)

コンテナークエリーに関する単位は、`cqw`の他にもいくつか存在します。詳細はMDNの次のページを参考ください。

-   [CSS コンテナークエリー#コンテナークエリーの長さ単位 - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_containment/Container_queries#%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E3%83%BC%E3%82%AF%E3%82%A8%E3%83%AA%E3%83%BC%E3%81%AE%E9%95%B7%E3%81%95%E5%8D%98%E4%BD%8D)

#### 対応ブラウザ

コンテナークエリーに関する単位は、Chrome 105・Edge 105（2022年8月）、Safari 16.0（2022年9月）、Firefox 110（2023年2月）以上で利用できます。

-   参照：[Can I use…](https://caniuse.com/css-container-query-units)

![](https://ics.media/entry/240723/images/240723_units_support.png)

### まとめ

コンテナースタイルクエリーの使い方を紹介しました。

コンテナークエリーは、要素の幅を条件にできるだけでなく、スタイルの新しい実装方法を提供します。前半の記事『[要素の幅でレスポンシブ対応を行える！コンテナークエリーの使い方](https://ics.media/entry/240617/)』とあわせて、本記事が参考になれば幸いです。

### 参考サイト

-   [コンテナーのサイズおよびスタイルクエリーの使用 - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_containment/Container_size_and_style_queries)
-   [Container Queriesの沼へようこそ - kojika17](https://kojika17.com/2023/03/css-container-queries-swamp.html)
-   [Container queries begin to land in stable browsers while the polyfill gets a big update - Google for Developers](https://developer.chrome.com/blog/cq-polyfill)