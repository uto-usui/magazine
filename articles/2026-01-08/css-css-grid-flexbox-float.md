---
title: "特徴で使い分けたいCSSレイアウト手法 - CSS Grid, Flexbox, floatの使い分け"
source: "https://ics.media/entry/15921/"
publishedDate: "2017-07-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブページのレイアウトを作る手段には、CSSのGrid Layoutグリッド・レイアウト、Flexboxフレックス・ボックス、floatフロートなどがあります。

CSSのGrid Layoutはウェブページのレイアウト構築に役立ちます。**従来floatやFlexboxでつくっていたようなレイアウトは、Grid Layoutで置き換えられるでしょう**。しかし、すべてをGrid Layoutで置き換えるのが良いとはいえません。

float、Flexbox、Grid Layoutには、それぞれ特徴があるためです。**特徴を使い分けていくことで、保守性の高いコーディングができるでしょう**。本記事では、float、Flexbox、Grid Layoutの特徴と使い分け方をサンプルを通して紹介します。

Grid Layoutの基本については前回の記事『[CSS Grid Layout入門](https://ics.media/entry/15649/)』を参照ください。

**この記事で学べること**

-   ページ全体のレイアウトはGrid Layoutが適してる
-   横並びのレイアウトはFlexboxが適してる
-   格子状のレイアウトはGrid Layoutが適してる
-   テキストが回り込みの指定はfloatが適してる

### float、Flexbox、Grid Layoutの特徴

簡単にfloat、Flexbox、Grid Layoutの特徴を見てみましょう。

#### floatとは

`float`に`left`や`right`を指定された要素は、その包含ブロックの左・右に浮動し、**後続する要素は回り込みます**。印刷物でよくあるような、写真にテキストが回り込むようなレイアウトをつくれます。

![](https://ics.media/entry/15921/images/170628_float.png)

#### Flexboxとは

要素を整列させます。**整列する方向や整列順、整列の折り返しの指定が可能**で、**整列した要素を伸縮**することもできるので、ウェブアプリで必要とされるUIのレイアウト（ツールバーなど）に役立ちます。

![](https://ics.media/entry/15921/images/170628_flexbox.png)

Flexboxについて詳しくは、記事『[Flexbox入門](https://ics.media/entry/13117/)』を参照ください。

#### Grid Layoutとは

テーブル組みのように揃った行・列に要素を配置します。**要素の順番やフローは無関係に、要素の配置される位置を指定**できます。ページの領域を分割するようなレイアウトに役立ちます。

![](https://ics.media/entry/15921/images/170628_grid.png)

### 手法を使い分けてレイアウトする

float、Flexbox、Grid Layoutの特徴を理解したところで、実践的なサンプルを通して使い分けを考えていきましょう。

![](https://ics.media/entry/15921/images/170628_grid1-1.png)

上図のようなシンプルなウェブサイトのレイアウトをつくっていきます。アイテムのHTML記述は、タイトル、ナビゲーション、セクション1、セクション2、サイドバー、フッターの順番です。次のデモも合わせてご覧ください。

-   [デモを別ウインドウで見る](https://ics-creative.github.io/170901_css_grid_layout/grid-layout-flexbox-float)
-   [ソースコードを確認する](https://github.com/ics-creative/170901_css_grid_layout/tree/master/grid-layout-flexbox-float)

#### 全体のレイアウト

![](https://ics.media/entry/15921/images/170628_grid1.png)

ページ全体のレイアウトはGrid Layoutでつくります。**Grid Layoutはページ全体など、ある程度大きな領域を分割するのに向いています**。Grid Layoutを使うことで、全体のレイアウトに関わるCSSをグリッドコンテナーにまとめて指定できるというメリットもあります。

`grid-column-end`に `span 2`という値を指定しています。これは`grid-column-start`の位置から数えて2本後の列のグリッドラインまでグリッドアイテムを配置するという指定です。

グリッドアイテムの終了位置をグリッドラインで指定せず、**開始位置からの距離で指定**するほうがレイアウトをつくりやすいので覚えておくと便利でしょう。もちろん、開始位置（`grid-column-start`）も`span`を使って終了位置からの距離で指定できます。`grid-row-end(start)`のときも同じです。

#### ナビゲーションアイテムの横並び

![](https://ics.media/entry/15921/images/170628_nav.png)

ナビゲーションにはFlexboxを使っています。**幅が決まっていないアイテムを均等に整列させるときはFlexboxが便利**です。

ここでは、`display: flex`でアイテムを横ならびにし、`align-items`でアイテムの上下方向の位置を揃え、`justify-content: space-around` で余白を割り振っています。

#### セクション1のテキスト回り込み

![](https://ics.media/entry/15921/images/170628_float-2.png)

セクション1のテキストを回り込ませるレイアウトではfloatを使っています。FlexboxやGrid Layoutでもテキストが回り込んでいるような見た目に近づけることはできますが、回り込ませることができるのは`float`の特徴です。

特別な理由がなければ、**回り込みのレイアウトはfloat**と考えてよいでしょう。

#### セクション2のタイルレイアウト

![](https://ics.media/entry/15921/images/170628_tile.png)

セクション2は記事[CSS Grid入門](https://ics.media/entry/15649/)で紹介したようなタイル状のレイアウトにGrid Layoutを使っています。

このようなレイアウトは、floatでも、Flexboxでも作れます。しかし、**`grid-row(column)-gap`を使うことでグリッド間の余白を簡単に調整できる**ことや、名前の通り**グリッド（=格子）のレイアウト**であるためGrid Layoutを使いました。

またGrid Layoutでは`auto-fill`や`minmax`が使えるため、レスポンシブサイト等の幅が伸縮するレイアウトの調整がしやすくなります。

#### サンプルのまとめ

今回のサンプルでは次の使い分けをしています。

-   ページ全体のレイアウトでは、ページを大きなエリアに分割したレイアウトをするためGrid Layout
-   ナビゲーションでは、 列の中でアイテムを整列させ、アイテムの上下方向の位置を揃えるためFlexbox
-   セクション1では、画像にテキストが回り込むレイアウトをするためfloat
-   セクション2では、格子状に並びアイテム間の余白をとったレイアウトをするためGrid Layout

**floatは回り込み**、**Flexboxは整列**、**Grid Layoutは分割・格子**などプロパティの特徴をキーワードとして覚えておくと使い分けの判断がしやすいかもしれません。

### おわりに

float、Flexbox、Grid Layoutを使わず、テーブルレイアウトや要素をインラインにしても要素を横ならびにはできます。レイアウトをつくる方法がいろいろある中で、プロパティをどう使い分けるかはつくる人の考え方やレイアウトのつくり方によって異なるでしょう。

「**floatやFlexboxはレイアウトに使う手法として古い**」「**Grid Layoutという新しいやり方でレイアウトするのがかっこいい**」という意見も正しいと思いますが、CSSプロパティの特徴を知り適材適所で使っていくのがもっとも望ましいでしょう。