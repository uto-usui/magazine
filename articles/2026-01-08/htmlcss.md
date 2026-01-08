---
title: "HTML・CSSだけで作れる！ リストのホバー演出アイデア集"
source: "https://ics.media/entry/251010/"
publishedDate: "2025-10-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "iwama"
---

2025年10月10日 公開 / [株式会社ICS 岩間 日菜](https://ics.media/entry/staff/iwama/)

リスト項目のホバー演出は、その要素がクリック可能であることを伝えるだけでなく、操作の気持ちよさや、コンテンツの世界観を表現することにも役立ちます。今回の記事では、**HTMLとCSSだけで実装可能**なリスト項目のホバー演出のアイデアを紹介します。

▼ 今回紹介する実装例一覧

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251010_list_hover_animation/demo/all/)

![](https://ics.media/entry/251010/images/251010_demo_all.gif)

### 1\. 横にアイコンが表示される

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251010_list_hover_animation/demo/01-01/)
-   [コードを確認する](https://github.com/ics-creative/251010_list_hover_animation/blob/main/demo/01-01/index.html)

ホバー時に、アイコンに指定しているCSSの`scale`プロパティの値を0から1に変化させることで、拡大しながら現れるようにしています。初期状態で`scale: 0`に指定しておくことで、アイコンを非表示のように隠しておけます。

### 2\. カーソルが変化する

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251010_list_hover_animation/demo/01-02/)
-   [コードを確認する](https://github.com/ics-creative/251010_list_hover_animation/blob/main/demo/01-02/index.html)

ホバー時に表示されるカーソルをオリジナル画像に変更しています。CSSを以下のように指定すると、カーソル位置やクリック範囲を細かく調整できます。

```
cursor: url("画像パス") x座標 y座標, フォールバック（pointerなど）;
```

### 3\. 文字がノイズ風にブレる

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251010_list_hover_animation/demo/01-03/)
-   [コードを確認する](https://github.com/ics-creative/251010_list_hover_animation/blob/main/demo/01-03/index.html)

`::before`、`::after`の疑似要素で文字を三重に重ね、ホバー時にCSSの`translate`プロパティで左右へわずかにずらすことで、ブレを表現します。

このデモでは、リンク要素に`data-text`というカスタム属性を指定し、本体テキストと同じ文字列を入れています（例：`<a data-text="HOME">HOME</a>`）。疑似要素の`content: attr(data-text)`でこの文字列をそのまま使うことで、余分な要素を増やさずに同じテキストを重ねて表示できます。

### 4\. アイコンが変化する

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251010_list_hover_animation/demo/01-04/)
-   [コードを確認する](https://github.com/ics-creative/251010_list_hover_animation/blob/main/demo/01-04/index.html)

ホバー時に別のアイコンに変化させています。

まったく違うアイコンに変えるのもよいですが、同じモチーフで質感が違ったり、色違いのアイコンに変化するなどしても、おもしろいアニメーションになりそうです。

### 5\. 黒丸が出現する

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251010_list_hover_animation/demo/01-05/)
-   [コードを確認する](https://github.com/ics-creative/251010_list_hover_animation/blob/main/demo/01-05/index.html)

ホバー時に疑似要素の`::after`に指定しているCSSの`scale`プロパティの値を0から1に変化させています。黒丸にCSSの`mix-blend-mode: difference;`を指定することで、**重なった部分のテキストの色が反転**します。

### 6\. 灯りがつく

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251010_list_hover_animation/demo/01-06/)
-   [コードを確認する](https://github.com/ics-creative/251010_list_hover_animation/blob/main/demo/01-06/index.html)

ホバー時に、疑似要素で描いたグラデーションの円を重ねています。

背景が暗い色のときは、CSSの`mix-blend-mode: hard-light`を指定するとパッと明るい印象になります。使いたい色に合わせて`mix-blend-mode`プロパティの色々な値を試してみてください。

▼ `mix-blend-mode: hard-light`ありの場合となしの場合の比較

![「☆わたしたち」というリンクにホバーした際の比較画像。上はmix-blend-mode: hard-lightを指定した場合で、星のアイコンの輪郭がはっきりと際立っている。下は指定なしの場合で、輪郭がぼやけて見える。](https://ics.media/entry/251010/images/251010_demo_hardlight.jpg)

`mix-blend-mode`については以下の記事で紹介しています。

-   [CSSのブレンドモードが素敵！ mix-blend-modeを使いこなそう](https://ics.media/entry/7258/)

### 7\. アイコンが回転する & 文字がアウトライン化する

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251010_list_hover_animation/demo/01-07/)
-   [コードを確認する](https://github.com/ics-creative/251010_list_hover_animation/blob/main/demo/01-07/index.html)

文字の背景にアイコンを配置して、ホバー時のみ回転させています。ホバー時に文字色を背景色と同じ（もしくは`transparent`）に変え、CSSの`-webkit-text-stroke`を指定しています。`-webkit-text-stroke`を使うことで、文字のアウトラインにのみ色をつけられます。

### 8\. 文字がかたかた動く

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251010_list_hover_animation/demo/01-08/)
-   [コードを確認する](https://github.com/ics-creative/251010_list_hover_animation/blob/main/demo/01-08/index.html)

ホバー時に、CSSの`translate`プロパティや`rotate`プロパティの値を調整し、位置や角度をわずかにずらすことで、文字が小刻みに震えて見えるようにしています。デモのように、アイコンのみをアニメーションさせるなどのアレンジも可能です。

### 9\. ねこが出現する

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251010_list_hover_animation/demo/01-09/)
-   [コードを確認する](https://github.com/ics-creative/251010_list_hover_animation/blob/main/demo/01-09/index.html)

『1. 横にアイコンが表示される』の派生です。ホバーするとテキストの上にアイコンが出現します。

`a`要素に`::first-letter`を適用して、先頭文字のみを強調できます。

### まとめ

HTML＆CSSの簡単な指定でリスト項目に一工夫加えるアイデアを紹介しました。画像や動き方、フォント等を変えるだけでも雰囲気は大きく変わります。日常で目についたモチーフや、お好みのデザインを取り入れて、ぜひ自分だけの可愛いホバー演出を作ってみてください！

過去の記事でも、以下のようなアイデアを紹介しています。

-   [HTML・CSSで実装するかわいいフキダシのアイデア](https://ics.media/entry/240425/)
-   [HTMLとCSSでつくる！リンクテキストのホバー時アニメーション11選](https://ics.media/entry/240801/)
-   [シンプルで使いやすいHTML・CSSボタンデザイン集11選](https://ics.media/entry/230629/)