---
title: "要素の幅でレスポンシブ対応を行える！ コンテナークエリーの使い方"
source: "https://ics.media/entry/240617/"
publishedDate: "2024-06-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

コンテナークエリー（`@container`）は、CSSの新しいアットルールです。従来のメディアクエリー（`@media`）とは異なる手法で、レスポンシブウェブデザインができます。メディアクエリーはビューポート（ブラウザ幅）を条件にスタイルを適用できるのに対して、コンテナークエリーは**要素の幅を条件にスタイルを適用**できます。

![](https://ics.media/entry/240617/images/240617_intro.png)

コンテナークエリーを利用することで、**再利用性の高いパーツ**を実装できます。とくに、**カラム数が多いレイアウト**や**複雑な横並びの要素**において、コンテナークエリーは有効な機能です。

この記事では、簡単な作例と使用上の注意点を紹介します。

### コンテナークエリーの使い方

作例の紹介の前に、コンテナークエリーの使い方を簡単に説明します。

コンテナークエリーを使用するためには、使用したい親の要素に`container-type`プロパティを設定する必要があります。以下の2通りの指定ができます。

-   `container-type: inline-size` ：インライン軸（テキストが流れる方向）に沿った幅をコンテナーの幅として扱います。横書きの場合は水平、縦書きの場合は垂直をコンテナーの幅とします。
-   `container-type: size` ：widthやheightプロパティに基づいた幅を扱います。

次の作例では、`.item`の要素の幅が`320px`以下のとき、色を反転するスタイルを適用します。

```
<div class="item_wrapper">
  <div class="item">アイテム</div>
</div>
```

```
/* .itemの親要素。container-typeを指定 */
.item_wrapper {
  container-type: inline-size;
}

.item {
  background-color: #FFFFFF;
  color: #222222;
}

/* .item要素の要素の幅が320px以下のとき、背景色と文字色を反転する */
@container (width <= 320px) {
  .item {
    background-color: #222222;
    color: #FFFFFF;
  }
}
```

▼実装イメージ

![](https://ics.media/entry/240617/images/240617_tutorial.png)

注意点として、**インライン要素に`container-type`を設定することはできません**。とくに、`button`タグなど`display`プロパティの振る舞いが特殊な要素は注意が必要です。

`container-*`プロパティや`@container`について詳しく知りたい方は次のMDNのページを参照ください。

-   [containerプロパティ - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/container)
-   [@container - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/@container)

#### 1\. 横並びのパーツをコンテナークエリーで実装する

ここからは、コンテナークエリーの簡単な作例を紹介します。

次の作例では、コンテナークエリーで作成した横並びのパーツを1カラムの親要素に配置しています。横並びのパーツには`@container (width <= 640px)`を設定していて、親要素の最大幅が`720px`以下（`640px`に左右の余白`80px`を足した値）になると`@container`内のスタイルが適用されます。

作例の上部にあるレンジスライダーで、親要素の最大幅を調整できるので試してみてください。

![](https://ics.media/entry/240617/images/240617_container_query_demo_01_01.png)

▼レンジスライダーの値が`720px`の見え方

![](https://ics.media/entry/240617/images/240617_container_query_demo_01_02.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230925_container-query/)
-   [コードを確認する](https://github.com/ics-creative/230925_container-query/tree/main/docs)

▼横並びのパーツの実装イメージ

```
<!-- 横並びのパーツ -->
<li class="article_wrapper">
  <div class="article">
    <div class="article_side">
      <time class="article_timestamp" datetime="2024-01-01">2024/01/01</time>
      <span class="article_badge">カテゴリ名</span>
    </div>
    <div class="article_main">
      <a href="#" class="article_title">
        タイトルのテキスト
      </a>
    </div>
  </div>
</li>
```

```
/* 横並びパーツにcontainer-typeを設定 */
.article_wrapper {
  container-type: inline-size;
}

/* 横並びのパーツ */
.article {
  /* 省略 */

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 32px;
}
/* 横並びのパーツが640px以下のとき、スタイルを適用する */
@container (width <= 640px) {
  .article {
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

また、Chromeのデベロッパーツールでは「スタイル」タブから、`@container`が、どの要素の`container-type`を参照しているか確認できます。

![](https://ics.media/entry/240617/images/240617_container_query_demo_01_devtools.png)

#### 2\. 横並びのパーツを2カラムのレイアウトに配置する

次の作例では、さきほどの横並びのパーツを2カラムの親要素に配置してみます。左のカラムに見出し、右カラムに横並びのパーツを配置しています。

親要素にも`container-type`プロパティを設定しており、要素の幅が`768px`以下になると1カラムのスタイルを適用します。

![](https://ics.media/entry/240617/images/240617_container_query_demo_02_container_type.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230925_container-query/#change-layout)
-   [コードを確認する](https://github.com/ics-creative/230925_container-query/tree/main/docs)

▼実装イメージ

```
<!-- 2カラムの親要素-->
<div class="splitLayout_wrapper">
  <div class="splitLayout">
    <!-- 左のカラム-->
    <div class="sectionTitle">
      <p class="sectionTitle_item">ニュース</p>
    </div>
    
    <!-- 右のカラム-->
    <ul class="articleUnit">
      
      <!-- さきほどの横並びのパーツを配置 -->
      <li class="article_wrapper">
        <div class="article">
          <div class="article_side">
            <span class="article_timestamp">2024/01/01</span>
            <span class="article_badge">カテゴリ名</span>
          </div>
          <div class="article_main">
            <a href="#" class="article_title">
              タイトルのテキスト
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
```

```
/* 2カラムの親要素にもcontainer-typeを設定 */
.splitLayout_wrapper {
  container-type: inline-size;
}

.splitLayout {
  /* 省略 */

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}
@container (width <= 768px) {
  .splitLayout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
```

親要素が次の最大幅だったとき、横並びのパーツのスタイルが以下のように適用されます。

-   `960px` ~ `769px`のとき、横並びのパーツは`640px`以下のスタイルが適用される
-   `768px` ~ `748px`のとき、横並びのパーツは**`641px`以上のスタイルが適用される**
-   `747px` ~ `320px`のとき、横並びのパーツは`640px`以下のスタイルが適用される

1カラムのレイアウトになった直後の`768px` ~ `748px`の間は、横並びのパーツの要素の幅が`641px`以上確保されるため、適用されるスタイルが自動的に変わります。

コンテナークエリーで実装されたパーツは、**コンテンツ幅に応じて柔軟なレイアウトができ、どのような場所に配置しても最適なレイアウトが可能**なので、再利用性が高いことがわかります。

▼`960px` ~ `769px`の見え方

![](https://ics.media/entry/240617/images/240617_container_query_demo_02_01.png)

▼`768px` ~ `748px`の見え方

![](https://ics.media/entry/240617/images/240617_container_query_demo_02_02.png)

▼`747px` ~ `320px`の見え方

![](https://ics.media/entry/240617/images/240617_container_query_demo_02_03.png)

### 使用上の注意点：sourceタグ・imgタグのサポート状況

`source`タグの`media`属性や、`img`タグの`sizes`属性は、2024年6月時点ではメディアクエリーと同様の条件しか設定できません。

コンテナー内部で特定の条件で画像を出し分けるアートディレクションは、これらの属性を避けて対応する必要があります。

▼`source`タグの例

```
<picture>
  <source media="(max-width: 640px)" srcset="mobile.png 640w" />
  <source media="(max-width: 960px)" srcset="desktop.png 960w" />
  <img src="fallback.png" alt="" />
</picture>
```

▼`img`タグの例

```
<img
  src="fallback.png" 
  srcset="mobile.png 640w, 
          desktop.png 960w"
  sizes="(max-width: 960px) 100vw, 960px"
  alt=""
/>
```

### 対応ブラウザ

Chrome 106・Edge 106（2022年10月）、Safari 16.0（2022年9月）、Firefox 110（2023年2月）以降で利用できます。

-   参照：[Can I use…](https://caniuse.com/css-container-queries)

![](https://ics.media/entry/240617/images/240617_container_query_support.png)

### まとめ

コンテナークエリーの簡単な作例と使用上の注意点を紹介しました。より多くの実用例を知りたい方は、Ahmad Shadeed氏の次の記事が参考になります。

-   [An Interactive Guide to CSS Container Queries - Ahmad Shadeed](https://ishadeed.com/article/css-container-query-guide/)

コンテナークエリーを利用することで、再利用性の高いパーツを実装できます。問題解決の手段のひとつとして注目したい技術です。

後半の記事『[CSSのコンテナースタイルクエリーstyle()の使い方](https://ics.media/entry/240723/)』では、CSS変数を条件にスタイルを適用できるコンテナースタイルクエリーを説明します。

### 参考サイト

-   [CSS コンテナークエリー考察 - grip on mind](https://griponminds.jp/blog/css-container-queries/)
-   [Container Queriesの沼へようこそ - kojika17](https://kojika17.com/2023/03/css-container-queries-swamp.html)
-   [Container queries begin to land in stable browsers while the polyfill gets a big update - Google for Developers](https://developer.chrome.com/blog/cq-polyfill)