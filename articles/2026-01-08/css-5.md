---
title: "CSSグリッド入門 - 図解でわかりやすく解説"
source: "https://ics.media/entry/15649/"
publishedDate: "2017-06-12"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

CSSのGrid Layoutグリッド・レイアウトとは、ウェブサイトのレイアウトを構築するための仕様です。昔はウェブサイトのレイアウトを実現するために、floatやFlexboxを使っていた方が多いのではないでしょうか。

**Grid Layoutを使えば、HTML要素の構造を汚さず、従来の手法に比べてウェブサイトのレイアウトがつくりやすくなります**。とくに、Flexboxではつくるのが難しい、縦軸・横軸がある格子状のレイアウトに向いています。

今回はレイアウトをつくりながら、Grid Layoutの基礎知識について紹介します。余裕のある方は、記事を読みながら実際に手を動かしてレイアウトをつくってみましょう。

**この記事で学べること**

-   Grid Layoutの基本的な使い方
-   Grid Layoutの利点
-   サブグリッドの使い方
-   `grid-template`プロパティのアニメーション

### よくあるレイアウトをつくりながらGrid Layoutの基礎を学ぶ

次のようなヘッダー・メインコンテンツ・左右のサイドバー・フッターがあるレイアウトを例に解説します。

![](https://ics.media/entry/15649/images/image1.png)

```
<div class="container">
  <header class="header">header</header>
  <main   class="main"  >main</main>
  <aside  class="aside" >aside</aside>
  <nav    class="nav"   >nav</nav>
  <footer class="footer">footer</footer>
</div>
```

まずHTMLを書きます。配置する各要素と、それを囲む親要素があります。親要素には`container` というクラス名を付けました。

#### Flexboxで作る場合は

Flexboxを使ってこのレイアウトをつくる場合、横ならびにしたい要素（`aside`、`main`、`nav`）を`div`タグなどで囲んでフレックスコンテナーをつくり、横ならびにする要素をフレックスアイテムとして配置します。

わざわざ`div`タグを追加する必要があるため、余計な要素が1つ増えますよね。

#### Grid Layoutで作る場合は

Grid Layoutは**レイアウトを囲むコンテナーの要素**（例では`.container`）**にその子要素の配置の仕方を指定します**。Flexboxと違い、要素を並べる**行・列コンテナーとなる要素を用意する必要はありません**。

Grid Layoutのコンテナーとアイテムについて説明しながらCSSでレイアウトをつくっていきます。

#### グリッドコンテナー

グリッドレイアウトで要素を配置するためにグリッドコンテナーをつくります。要素に `display: grid` を指定すると、その要素はグリッドコンテナーになります。(インライン要素として扱うときは`display: inline-grid`を指定します）

```
.container {
  display: grid;
}
```

![](https://ics.media/entry/15649/images/image2.png)

これだけではまだ要素がただ並んでいるだけです。そこで、グリッドコンテナーにグリッドコンテナーを分割するための指定をします。

グリッドコンテナーを縦・横に分割します。縦方向に分割した各列のサイズは`grid-template-columns` 、横方向に分割した各行のサイズは`grid-template-rows` で指定します。

![](https://ics.media/entry/15649/images/image5.png)

列の幅を指定しましょう。今回のレイアウトでは、左のサイドバーの幅が180px、右のサイドバーの幅が160pxです。中央のメインエリアは親要素の幅から左右のサイドバーの幅を引いた可変幅にします。

ここで、メインエリアの幅指定に`fr`という単位を使います。`fr`はグリッドコンテナーの中を分割するサイズの指定に使える単位です。**全体の幅から`fr`以外の単位（`px`や`%`など）で指定したものを引き、残りの幅が`fr`で指定された列に配分されます**。Flexboxの`flex-grow`プロパティと同じようなイメージです。今回は、全体の幅から左右サイドバー（180px、160px）の幅を引いた幅をメインエリアに配分したいので次のように書きます。

```
.container {
  display: grid;
  /* 1列目から順番に180px、1fr、160pxの幅 */
  grid-template-columns: 180px 1fr 160px;
}
```

同じように各行の高さも指定します。

```
.container {
  display: grid;
  /* 1列目から順番に180px、1fr、160pxの幅 */
  grid-template-columns: 180px 1fr 160px;
  /* 1行目から順番に60px 1fr 90pxの高さ */
  grid-template-rows: 60px 1fr 90px;
}
```

このときの列・行のことをグリッドトラックといいます。**列・行を分割した線をグリッドラインといいます。**グリッドラインは、borderのように見た目上の線ではありません。

![](https://ics.media/entry/15649/images/image3.png)

#### グリッドアイテム

グリッドアイテムを配置します。グリッドコンテナー直下の子要素をグリッドアイテムといいます。今回の場合は、ヘッダー・メインコンテンツ・左右のサイドバー・フッターがグリッドアイテムです。

![](https://ics.media/entry/15649/images/image4.png)

グリッドトラックを分割したグリッドラインは、1本目から順番に1,2,3…と自動的に番号がふられます。`grid-column-start`と`grid-column-end`で、**グリッドアイテムが列の何本目から何本目のグリッドラインまで配置するか指定します**。

同じように`grid-row-start`と`grid-row-end`で行の何本目から何本目のグリッドラインまで配置するか指定します。

```
.header {
  /* 列の1本目から4本目のグリッドラインまで */
  grid-column-start: 1;
  grid-column-end: 4;
  /* 行の1本目から2本目のグリッドラインまで */
  grid-row-start: 1;
  grid-row-end: 2;
}
```

このとき、`grid-column-end`・`grid-row-end`に`auto`を指定すると、それぞれ**`grid-column-start`や`grid-row-start`で指定したグリッドラインの次のグリッドラインまでの範囲**に配置されます。ヘッダーの`grid-row-end`の指定は`auto`にできます。

```
.header {
  /* 列の1本目から4本目のグリッドラインまで */
  grid-column-start: 1;
  grid-column-end: 4;
  /* 行の1本目から2本目のグリッドラインまで */
  grid-row-start: 1;
  grid-row-end: auto;
}
```

同じように他のグリッドアイテムも配置します。

```
.header {
  /* 列の1本目から4本目のグリッドラインまで */
  grid-column-start: 1;
  grid-column-end: 4;
  /* 行の1本目から2本目のグリッドラインまで */
  grid-row-start: 1;
  grid-row-end: auto;
}

.main {
  /* 列の2本目から3本目のグリッドラインまで */
  grid-column-start: 2;
  grid-column-end: auto;
  /* 行の2本目から3本目のグリッドラインまで */
  grid-row-start: 2;
  grid-row-end: auto;
}

.aside {
  /* 列の1本目から2本目のグリッドラインまで */
  grid-column-start: 1;
  grid-column-end: auto;
  /* 行の2本目から3本目のグリッドラインまで */
  grid-row-start: 2;
  grid-row-end: auto;
}

.nav {
  /* 列の3本目から4本目のグリッドラインまで */
  grid-column-start: 3;
  grid-column-end: auto;
  /* 行の2本目から3本目のグリッドラインまで */
  grid-row-start: 2;
  grid-row-end: auto;
}

.footer {
  /* 列の1本目から4本目のグリッドラインまで */
  grid-column-start: 1;
  grid-column-end: 4;
  /* 行の3本目から4本目のグリッドラインまで */
  grid-row-start: 3;
  grid-row-end: auto;
}
```

`grid-column-start`と`grid-column-end`は`grid-column`、`grid-row-start`と`grid-row-end`は`grid-row`という略式プロパティで指定できます。このとき、`auto`は省略できます。今回の `.header`はこのように略式プロパティで書き換えることができます。

```
.header {
  /* 列の1本目から4本目のグリッドラインまで */
  grid-column: 1 / 4;
  /* 行の1本目から2本目のグリッドラインまで */
  grid-row: 1;
}
```

これでレイアウトは完成です。以下のサンプルでコードと表示を確認してみてください。

-   [デモを別ウインドウで見る](https://ics-creative.github.io/170901_css_grid_layout/grid-layout-sample-01)
-   [ソースコードを確認する](https://github.com/ics-creative/170901_css_grid_layout/tree/master/grid-layout-sample-01)

#### コラム： 1frでレイアウトが思った通りにならないとき

`1fr`を指定しているのに思った通りにレイアウトできないことがあります。その場合は以下の記事を参考にするといいでしょう。

-   『[なぜ私の1frはフレックスコンテナをはみ出すのか](https://zenn.dev/storehero/articles/31012c944ddb90)』

### タイル状のレイアウトをGrid Layoutで

タイルが並ぶように同じ幅のアイテムが繰り返し配置されるレイアウトをGrid Layoutでつくってみます。

![](https://ics.media/entry/15649/images/image7.png)

-   [デモを別ウインドウで見る](https://ics-creative.github.io/170901_css_grid_layout/grid-layout-sample-tile)
-   [ソースコードを確認する](https://github.com/ics-creative/170901_css_grid_layout/tree/master/grid-layout-sample-tile)

このようなレイアウトは、floatやFlexboxでもつくることができますがGrid Layoutを使うことで便利になったポイントを紹介します（今回紹介していないプロパティも使っています）。このサンプルでは、Grid Layoutに関するCSSはグリッドコンテナーのみに指定しており、少ないプロパティでこのレイアウトをつくることができました。

```
.container {
  /* グリッドコンテナ */
  display: grid;
  /* 最小100px、最大1frの列を繰り返しつくる */
  grid-template-columns: repeat(
    auto-fill,
    minmax(100px, 1fr)
  );
  column-gap: 10px;
  row-gap: 10px;
}
```

#### レイアウトに関する指定をグリッドコンテナーにまとめられる！

まず1つ目に、グリッドコンテナーの指定のみでこのレイアウトをつくれるのはとても便利です。floatやFlexboxでレイアウトするとき、親要素にコンテナーとなる指定をして、横ならびにするアイテムにはアイテムの幅や余白の指定をする必要があったと思います。Grid Layoutでは、グリッドコンテナーにグリッドアイテムの配置についての指定ができます。

#### アイテム間の余白調整が手軽

2つ目は`row(column)-gap`でグリッドアイテム間の余白を指定していることです。`row(column)-gap`は、**グリッドアイテムの間にだけ余白ができる**ようになっています。

floatやFlexboxでこのレイアウトをするには、余白の処理に工夫をする必要があります（例：`margin`をつけて、レイアウトの端等の不要な`margin`をネガティブマージンや`E:nth-child(n)`で消す）。`gap`を使えば、そういった調整は必要はありません。

![](https://ics.media/entry/15649/images/image8-2.png)

#### 親要素が可変幅でもアイテムのサイズ調整がシンプル

3つ目は`grid-template-columns` の値、`repeat(auto-fill, minmax(100px, 1fr))`です。これは、グリッドトラックのサイズの指定に使える`repeat()`と`auto-fill`を使って親要素におさまるようにアイテムを繰り返し横ならびにし、`minmax`でアイテムの最小幅・最大幅を指定しています。

floatやFlexboxの横並びレイアウトではレスポンシブ対応をするとき、表示の幅によって各列にいくつのアイテムが並ぶように、どんな幅にするかという指定を複数のプロパティでする必要がありました。Grid Layoutの`repeat`や`auto-fill`、`minmax`をうまく使うと、可変幅レイアウトの調整がしやすくなると思います。

### サブグリッド

CSS Gridにはサブグリッドという機能があります。通常のCSS Gridだと直下の要素しかグリッドアイテムとして認識されません。Gridを親子でそれぞれ繰り返し指定すればグリッドの入れ子ができますが、親子のグリッドは連動しません。

サブグリッドを使うと、**グリッドの入れ子ができ、親子のグリッドが連動します**。

具体的には以下の挙動を確認するとわかりやすいでしょう。

![](https://ics.media/entry/15649/images/images/220913_subgrid_10fps.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/170901_css_grid_layout/grid-layout-subgrid/)
-   [ソースコードを確認する](https://github.com/ics-creative/170901_css_grid_layout/tree/master/grid-layout-subgrid)

1カラム内には、サムネイル・タイトル・概要文・リンクを配置しています。それぞれのカラムでは文字量が異なりますが、サブグリッドの効用によって、高さが揃っていることが確認できます。

![](https://ics.media/entry/15649/images/images/220913_subgrid_1.jpg)

![](https://ics.media/entry/15649/images/images/220913_subgrid_2.jpg)

以下はサブグリッドの抜粋です。子要素に`display: grid;`を指定したうえで、`grid-template-rows: subgrid;`を指定していることがポイントです。

```
.container {
  /* グリッドコンテナ */
  display: grid;
  /* 最小256px、最大1frの列を繰り返しつくる */
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  /* 余白 */
  gap: 16px;
}

.item {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid; /* サブグリッド */
}
```

### アニメーション

`grid-template-columns`や`grid-template-rows`、`grid-template`プロパティ（一括指定）はアニメーション可能です。

以下の作例では、グリッドアイテムをホバーした際全体的に行の高さが広がり、ホバーしているアイテムだけ列の幅が拡大します。

![](https://ics.media/entry/15649/images/images/250421_css_grid_animation.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/170901_css_grid_layout/grid-layout-animation/)
-   [ソースコードを確認する](https://github.com/ics-creative/170901_css_grid_layout/tree/master/grid-layout-animation)

`:has()`疑似クラスを使用し、グリッドアイテムがホバーされた時コンテナー側からグリッドサイズを変更しています。

参照：『[has()疑似クラスでコーディングが変わる！　CSS最新スタイリング](https://ics.media/entry/240808/)』

```
/* グリッドコンテナ */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 50px;
  transition: grid-template 0.8s ease;

  /* 列の幅を変更する */
  /* 5fr: ホバーされたアイテムは広めに（5/8エリア分) */
  /* 1fr: ホバーされたアイテム以外はサイズ変更しない */
  &:has(> .item:nth-of-type(1):hover){
    grid-template-columns: 5fr 1fr 1fr 1fr;
  }
  &:has(> .item:nth-of-type(2):hover){
    grid-template-columns: 1fr 5fr 1fr 1fr;
  }
  /* （3・4は省略） */

  /* 行の高さを変更する */
  &:has(> .item:hover){
    grid-template-rows: 280px;
  }

  /* ホバーされたアイテム以外は半透明で表示 */
  &:has(.item:hover) .item:not(:hover) {
    opacity: 0.5;
  }
}

/* グリッドアイテム */
.item{
  min-width: 60px;
  transition: opacity 0.8s;
}
```

※ CSSネスト記法を使用（Grid Layoutに関連する記載を抜粋）

うまくアニメーションさせるには**単位を揃える必要があります**。

▼NG例

-   `repeat(3, 1fr)` → `2fr 1fr 1fr`（列数や行数は同じだが、指定方法が異なるため値が補間されない）
-   `1fr 1fr 1fr` → `2fr 1fr 1fr 1fr`（異なる列数や行数）
-   `80px` → `1fr`（異なる単位）

▼OK例

-   `1fr 1fr 1fr` → `2fr 1fr 1fr`（グリッドのサイズを列挙して指定し、アニメーションさせたい部分だけ変更）
-   `80px` → `200px`（単位が揃っている）

### 各ブラウザの実装状況

Grid Layoutは2017年10月以降リリースの**Chrome、Firefox、Safari、Edge含む主要なブラウザで利用可能**です。

-   参考：『[CSS Grid Layout | Can I use...](https://caniuse.com/css-grid)』

サブグリッドはChrome 117・Edge 117（2023年9月）、Safari 16.0（2022年9月）、Firefox 71（2019年12月）以上で利用できます。

-   参考：『[CSS Subgrid | Can I use...](https://caniuse.com/css-subgrid)』

### 終わりに

今回はGrid Layoutの基本的なレイアウトの作り方と、プロパティを紹介しました。グリッドレイアウトで実現可能なことは他にもたくさんあります。

続編記事『[特徴で使い分けたいCSSレイアウト手法](https://ics.media/entry/15921/)』では、Grid LayoutとfloatとFlexboxとの違いについて紹介します。あわせてご覧くださいませ。