---
title: "Flexbox入門 - 横並びを実現する定番のCSS"
source: "https://ics.media/entry/13117/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2016-08-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ボックス要素の横並びや縦並びをCSSで行う場合は、**CSSの「Flexboxフレックスボックス」** が便利です。Flexboxを使用することで、要素を一方向に整列させるレイアウトを簡潔なコードで実現できます。本記事ではウェブページの作成を通してFlexboxの特徴と使い方について解説します。

**この記事で学べること**

-   Flexboxの基本的な使い方
-   主軸・交差軸の考え方
-   `justify-content`、`align-items`、`flex-wrap`の使い方
-   スマートフォン向けのレスポンシブ対応
-   FlexboxとCSS Gridの使い分け

### Flexboxは1次元レイアウト用のCSS

Flexboxとは、横方向または縦方向の1次元レイアウトを扱うCSSの機能です。ボックスを横並びにしたり、縦並びにしたり、中央揃えにしたり、折り返して配置したりできます。ボックスとは、HTML上の各要素が生成する領域のことです。下図のHTMLコードのウェブページでは、`div`要素・`h1`要素・`p`要素がそれぞれボックスを生成します。

![図版：HTMLのコード](https://ics.media/entry/13117/images/160822_flexbox_box.png)

Flexboxでは、**ボックスの横並び、縦並び、中央揃え、均等配置などを少量のコードで実現できます**。とくに、ナビゲーションやカードリストのように、要素を一方向に整列させるレイアウトに向いています。

![図版：レイアウトの凡例](https://ics.media/entry/13117/images/160822_flexbox_flexbox.png)

### サンプルの紹介

今回はレスポンシブなページのコーディングを例にして、Flexboxについて説明します。まずは完成形のページをご覧ください。シンプルなカラムレイアウトをFlexboxを使って実現しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/160822_flexbox/3_complete.html)
-   [コードを確認する](https://github.com/ics-creative/160822_flexbox/blob/master/docs/3_complete.html)

![](https://ics.media/entry/13117/images/160822_flexbox_webstite.png)

### Flexboxでのレイアウト方法

まずはヘッダー部分のコーディングです。

![](https://ics.media/entry/13117/images/160822_flexbox_header.png)

HTMLコードは次のとおりです。

```
<header>
  <img src="images/logo.png" alt="">
  <ul>
    <li><a href="">menu1</a></li>
    <li><a href="">menu2</a></li>
    <li><a href="">menu3</a></li>
  </ul>
</header>
```

ヘッダー部分のコーディングには、次の3つの過程が必要です。

1.  ボックスをFlexboxレイアウトとして指定する
2.  ロゴとメニューを左右に振り分ける
3.  ヘッダー内を縦方向中央揃えにする

#### Flexboxレイアウトの指定と2つの軸

ボックスの横並びや縦並びといったFlexboxのレイアウトを指定するとき、**ボックスの親要素のスタイルの`display`プロパティに`flex`を設定します**。今回は、`header`タグと`ul`タグです。

```
header {
  display: flex;
}

ul {
  display: flex;
}
```

Flexboxにおけるボックスのレイアウトは、**「主軸」と「交差軸」という2つの軸によって決定されます**。横書きの日本語ページで初期値の`flex-direction: row`の場合、主軸は左から右方向、交差軸は上から下方向です。

![](https://ics.media/entry/13117/images/160822_flexbox_axis.png)

#### 横方向・縦方向にボックスを並べる

**主軸に沿った方向（初期状態で横方向）の並び方は`justify-content`プロパティで設定します**。この記事で扱う代表的な値は次のとおりです。

![](https://ics.media/entry/13117/images/160822_flexbox_justify.png)

-   `flex-start` → 始端揃え（左揃え、初期値）
-   `flex-end` → 終端揃え（右揃え）
-   `center` → 中央揃え
-   `space-between` → 均等配置（両端ボックスは始端と終端）
-   `space-around` → 均等配置（両端ボックスは始端、終端からボックス間隔の半分の距離）
-   `space-evenly` → 均等配置（両端ボックスは始端、終端からボックス間隔と同じ距離）

**交差軸に沿った方向（初期状態で縦方向）の並び方は`align-items`プロパティで設定します**。この記事で扱う代表的な値は次のとおりです。

![](https://ics.media/entry/13117/images/160822_flexbox_align.png)

-   `stretch` → 親要素と同じ高さに伸びる（初期値）
-   `flex-start` → 始端揃え（上揃え）
-   `flex-end` → 終端揃え（下揃え）
-   `center` → 中央揃え
-   `baseline` → ベースライン揃え

ヘッダー部分では、ロゴとメニューを左右に振り分け、メニューを上下中央揃えにするので、次のようにCSSを設定します。

```
header {
  justify-content: space-between; /* 左右均等分布 */
}

ul {
  align-items: center; /* 上下中央揃え */
}
```

#### ボックスを複数行に並べる

つづいて、3カラムのカード部分のレイアウトです。HTMLコード例は次のとおりです。`main`タグの中に`.animal`要素が8個あります。

```
<main>
  <div class="animal">
    <h2>うさぎ</h2>
    <img src="images/animal1.jpg" alt="">
    <p>全身が柔らかい体毛で覆われている小型獣である。最大種はヤブノウサギで体長 50–76 cm。</p>
  </div>
  <div class="animal">
    <h2>キツネ</h2>
    <img src="images/animal2.jpg" alt="">
    <p>食性は肉食に近い雑食性。鳥、ウサギ、齧歯類などの小動物や昆虫を食べる。</p>
  </div>

  (中略)

</main>
```

`.animal`要素を親要素の3分の1の幅にし、横並びにしたいので次のようにスタイルを設定します。

カード同士の余白は`gap`プロパティで指定しています。`gap`プロパティについては、以下の記事で詳しく紹介していますので、あわせてご覧ください。

-   [gapの余白指定が便利！ gridとflexでできる新しいCSSレイアウト手法](https://ics.media/entry/210628/)

```
main {
  display: flex;
  gap: 8px;
}

.animal {
  /*（全体の幅 - gapでつけた余白の合計）をカラム数で割る */
  flex-basis: calc((100% - 16px) / 3);
}
```

`flex-basis`は、フレックスアイテムの主軸方向の初期サイズを指定するプロパティです。ここではカードの基準サイズを3カラム分にしています。伸び方や縮み方もあわせて指定したい場合は、`flex: 0 0 calc((100% - 16px) / 3)`のように`flex`プロパティでまとめて指定できます。

ところが、このコードを実行すると、カードは3カラムに折り返されず、1行に並びます。**Flexboxの初期値では`flex-wrap: nowrap`が指定されているため、アイテムは折り返されません**。

![](https://ics.media/entry/13117/images/160822_flexbox_single_line.png)

複数行のレイアウトを行うには、`flex-wrap`プロパティに`wrap`を設定します。

![](https://ics.media/entry/13117/images/160822_flexbox_multiline.png)

-   `nowrap` → ボックスを単一行に配置する
-   `wrap` → ボックスを複数行に配置する

今回の例では次のように指定します。

```
main {
  flex-wrap: wrap;
}
```

これで3カラムのカードレイアウトが完成しました。

![](https://ics.media/entry/13117/images/160822_flexbox_multi_cap.png)

また、各カードの高さも揃います。これは、`align-items`プロパティの初期値が`stretch`であるためです。複数行レイアウトの場合、`align-items: stretch`が適用されたボックスの高さは、行内でもっとも高いボックスに合わせて広がります。

ここまでのCSSコードとサンプルは次のとおりです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/160822_flexbox/1_layout.html)
-   [コードを確認する](https://github.com/ics-creative/160822_flexbox/blob/master/docs/1_layout.html)

### Flexboxでのレスポンシブ対応

Flexboxでのレスポンシブなレイアウト例を見てみましょう。

ビューポート幅が768px以下のとき、ヘッダー部分を縦並びにし、カード部分を2カラムにする例です。

![](https://ics.media/entry/13117/images/160822_flexbox_responsive.png)

2カラムのカードレイアウトは、カードの基準サイズを変えることで実現します。

```
@media (width <= 768px) {
  .animal {
    /* （全体の幅 - gapでつけた余白の合計）をカラム数で割る */
    flex-basis: calc((100% - 8px) / 2);
  }
}
```

問題はヘッダー部分の縦並びです。

#### ボックスの並び方向を変更する

Flexboxでは、初期設定の場合ボックスは横方向に並びます。並び方向を変更するには、`flex-direction`プロパティを用います。`flex-direction`により、主軸と交差軸の方向が替わります。

![](https://ics.media/entry/13117/images/160822_flexbox_direction.png)

今回はヘッダー内の要素を縦並びにするため、`flex-direction: column`を指定します。`column`を指定すると主軸は縦方向、交差軸は横方向になります。そのため、**横方向の中央揃えには`align-items: center`を指定します**。

```
@media (width <= 768px) {
  header {
    flex-direction: column;
    align-items: center;
  }
}
```

![](https://ics.media/entry/13117/images/160822_flexbox_responsive_header.png)

**`justify-content`と`align-items`は、単純に横方向・縦方向を指定するプロパティではありません**。`justify-content`は主軸方向、`align-items`は交差軸方向の配置を指定します。主軸と交差軸の向きは、`flex-direction`の値によって変わります。

ここまでのCSSコードとサンプルは次のとおりです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/160822_flexbox/2_responsive.html)
-   [コードを確認する](https://github.com/ics-creative/160822_flexbox/blob/master/docs/2_responsive.html)

### まとめ

**Flexboxを使うと、要素の並び方、折り返し、並び方向、中央揃えなどを少ないコードで指定できます**。ナビゲーションやカードリストのように、要素を一方向に整列させたい場面で便利です。

一方で、行と列を同時に制御する格子状のレイアウトにはCSS Gridが向いています。CSS Gridの基本を学びたい方は、記事『[CSS Grid Layout入門](https://ics.media/entry/15649/)』もあわせてご覧ください。