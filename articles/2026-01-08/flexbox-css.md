---
title: "Flexbox入門 - 横並びを実現する定番のCSS"
source: "https://ics.media/entry/13117/"
publishedDate: "2016-08-22"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ボックス要素の横並びをCSSで行う場合は、**CSSの「Flexboxフレックスボックス」** が便利です。Flexboxを使用することで、簡潔なコードで豊富なボックスのレイアウトが可能です。本記事ではウェブページの作成を通してFlexboxの特徴と使い方について解説します。

**この記事で学べること**

-   Flexboxの使い方
-   スマートフォンへのレスポンシブ対応

### Flexboxはボックスレイアウト用のCSS

Flexboxとは、ボックスのレイアウト方法を定めるCSSの機能です。ボックスとは、HTML上の各要素が生成する領域のことです。下図のHTMLコードのウェブページでは、`div`要素・`h1`要素・`p`要素がそれぞれボックスを生成します。

![図版：HTMLのコード](https://ics.media/entry/13117/images/160822_flexbox_box.png)

Flexboxでは、**ボックスを横ならびにしたり、右寄せ・中央寄せ・左寄せをしたりと、さまざまなレイアウトを少量のコードで実現できます**。

![図版：レイアウトの凡例](https://ics.media/entry/13117/images/160822_flexbox_flexbox.png)

### サンプルの紹介

今回はレスポンシブなページのコーディングを例にしてFlexboxの説明します。まずは完成形のページをご覧ください。シンプルなカラムレイアウトをFlexboxを使って実現しています。

-   [完成版デモ](https://ics-creative.github.io/160822_flexbox/flexbox_4_complete.html)

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

Flexboxにおけるボックスのレイアウトは、**「主軸」と「交差軸」という2つの軸によって決定されます**。初期状態では、左から右方向の軸が主軸、上から下方向の軸が交差軸となります。

![](https://ics.media/entry/13117/images/160822_flexbox_axis.png)

#### 横方向・縦方向にボックスを並べる

**主軸に沿った方向（初期状態で横方向）の並び方は`justify-content`プロパティで設定します**。各々の設定値は次の通りです。

![](https://ics.media/entry/13117/images/160822_flexbox_justify.png)

-   `flex-start` → 始端揃え（左揃え、初期値）
-   `flex-end` → 終端揃え（右揃え）
-   `center` → 中央揃え
-   `space-between` → 均等配置（両端ボックスは始端と終端）
-   `space-around` → 均等配置（両端ボックスは始端、終端からボックス間隔の半分の距離）
-   `space-evenly` → 均等配置（両端ボックスは始端、終端からボックス間隔と同じ距離）

**交差軸に沿った方向（初期状態で縦方向）の並び方は`align-items`プロパティで設定します**。各々の設定値は次の通りです。

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

つづいて、3カラムのカード部分のレイアウトです。[HTMLコード](https://github.com/ics-creative/160822_flexbox/blob/master/docs/flexbox_1_layout.html#L21-L62)を抜粋したものが下記です。`main`タグの中に`div`タグが8個あります。

```
<main>
  <div class="animal">
    <h1>うさぎ</h1>
    <img src="images/animal1.jpg" alt="">
    <p>全身が柔らかい体毛で覆われている小型獣である。最大種はヤブノウサギで体長 50–76 cm。</p>
  </div>
  <div class="animal">
    <h1>キツネ</h1>
    <img src="images/animal2.jpg" alt="">
    <p>食性は肉食に近い雑食性。鳥、ウサギ、齧歯類などの小動物や昆虫を食べる。</p>
  </div>

  (中略)

</main>
```

`div`要素のボックス要素を親要素の`1/3`の幅にし、横ならびにしたいので次のようにスタイルを設定するとよさそうです。

カード同士の余白は`gap`プロパティで指定しています。`gap`プロパティについては、以下の記事で詳しく紹介していますので、あわせてご覧ください。

-   『[gapの余白指定が便利！ gridとflexでできる新しいCSSレイアウト手法](https://ics.media/entry/210628/)』

```
main {
  display: flex;
  gap: 10px;
}

main div.animal {
  /*（全体の幅 - gapでつけた余白の合計）をカラム数で割る */
  width: calc((100% - 20px) / 3);
}
```

ところが、このコードを実行するとボックスは3カラムにならず、一行に並びます。**Flexboxの初期設定では、ボックスは親要素の幅にかかわらず一行に並ぶため**です。

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

また、嬉しいことに各カードの高さも揃っています。こちらは、`align-items`プロパティの初期値`stretch`によるものです。複数行レイアウトの場合、`align-items:stretch`が指定されたボックスの高さは、行の高さの最大値まで広がるため、各行毎に高さが揃います。

ここまでのCSSコードとデモは下記です。

-   [ソースコードを確認する](https://github.com/ics-creative/160822_flexbox/blob/master/docs/css/flexbox_1_layout.css)
-   [デモを別ウィンドウで再生する](https://ics-creative.github.io/160822_flexbox/flexbox_1_layout.html)

### Flexboxでのレスポンシブ対応

Flexboxでのレスポンシブなレイアウト例を見てみましょう。

デバイス幅が500px以下のとき、ヘッダー部分を縦並び、カード部分を2カラムする例です。

![](https://ics.media/entry/13117/images/160822_flexbox_responsive.png)

2カラムのカードレイアウトは、ボックスの幅を変えることで実現します。

```
@media (width <= 500px) {
  main div.animal {
    /* （全体の幅 - gapでつけた余白の合計）をカラム数で割る */
    width: calc((100% - 10px) / 2);
  }
}
```

問題はヘッダー部分の縦並びです。

#### ボックスの並び方向を変更する

Flexboxでは、初期設定の場合ボックスは横方向に並びます。並び方向を変更するには、`flex-direction`プロパティを用います。`flex-direction`により、主軸と交差軸の方向が替わります。

![](https://ics.media/entry/13117/images/160822_flexbox_direction.png)

今回は、縦並びを設定するので、`column`を指定します。そして、**横方向の中央揃えを指定するために、交差軸方向の並び方設定である`align-items`プロパティに`center`を指定します**。

```
@media (width <= 500px) {
  header {
    flex-direction: column;
    align-items: center;
  }
}
```

![](https://ics.media/entry/13117/images/160822_flexbox_responsive_header.png)

**`justify-content`と`align-items`は横方向、縦方向の並びを指定するのではなく、主軸と交差軸の位置によってボックスの並び方が変わること、そして主軸と交差軸の位置は`flex-direction`によって変更されうる**ことに注意してください。

ここまでのCSSコードとデモは下記です。

-   [ソースコードを確認する](https://github.com/ics-creative/160822_flexbox/blob/master/docs/css/flexbox_2_responsive.css)
-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160822_flexbox/flexbox_2_responsive.html)

### まとめ

**Flexboxは、並び方、折り返し設定、並び方向の設定等、シンプルな記述で豊富なレイアウトが可能です**。この機会にFlexboxによるボックスレイアウトを始めましょう。

また、別のCSSレイアウトの手法にCSS Gridがあります。気になる方は記事「[CSS Grid Layout入門](https://ics.media/entry/15649/)」もあわせてご覧ください。

※この記事が公開されたのは**9年前**ですが、**1年前の2024年4月**に内容をメンテナンスしています。