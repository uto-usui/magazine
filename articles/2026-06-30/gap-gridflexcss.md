---
title: "gapに線をひきたい! gridとflexに罫線を入れられる新しいCSS"
source: "https://ics.media/entry/260618/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2026-06-17"
category: "frontend"
feedName: "ICS MEDIA"
author: "yamamoto"
---

Chrome・Edge 149（2026年6月）で利用できるようになった**CSS Gap Decorations**を紹介します。従来はGrid LayoutやFlexboxの余白に罫線を入れるために、疑似要素や子要素の`border`プロパティに頼る場面も多く、折り返しや列数の変化を考慮しながら要素ごとに罫線を調整する必要がありました。CSS Gap Decorationsにより、余白の罫線をより素直に扱いやすくなります。

### CSS Gap Decorationsとは

CSS Gap Decorationsは、Grid LayoutやFlexbox、Multi-column Layoutのgap部分に対して線や装飾を与えるための仕組みです。要素そのものではなく、**要素間の余白を対象にできる**のが大きな特徴です。レイアウト変更時にも破綻しにくく、レスポンシブなUIとの相性も良好です。

Gap Decorationsなら、**子要素間の罫線を親要素側で管理しやすくなる**ため、コードの見通しと保守性を高められます。可変幅での折り返しにも対応できる点は非常に助かる仕様です。

![](https://ics.media/entry/260618/images/images/260618_gap-decorations_wrap.png)

まずはデモをみてみましょう（Chrome・Edge 149以上でご覧ください）。それぞれのgapにGap Decorationsで罫線を設定しており、シンプルな記述で装飾の自由度が広がることを実感できます。

### 基本的な使い方

#### `rule`プロパティ

gapの中央に表示する線の見た目（`rule-width`・`rule-style`・`rule-color`）をまとめて指定するためのプロパティです。`border`プロパティをイメージするとわかりやすいかもしれません。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260618_gap-decorations/demo/01/)
-   [コードを確認する](https://github.com/ics-creative/260618_gap-decorations/blob/main/demo/01/index.html)

```
.grid-01 {
  rule: 3px solid green; /* 行・列の罫線 一括指定 */
}
```

`column-rule`・`row-rule`プロパティを使用することで行・列の罫線にスタイルを個別に指定できます。値を複数指定したり、`repeat()`関数を使用することも可能です。

```
.grid-02 {
  row-rule-width: 3px; /* 行の罫線 幅指定 */
  row-rule-style: repeat(2, dashed), solid; /* 行の罫線 スタイル指定 */
  row-rule-color: orange; /* 行の罫線 色指定 */
  column-rule:
    3px solid green,
    3px dashed green,
    6px double green; /* 列の罫線 指定 */
}
```

#### `rule-break`プロパティ

T字、十字の交点で、線を繋げるか、分割して表示するかを指定するプロパティです。`column-rule-break`・`row-rule-break`プロパティで行・列の罫線にスタイルを個別に指定できます。

値

内容

normal

T字交点は分割するが、十字交点は分割しないで繋げる。（初期値）

none

交点で分割しないで繋げる。

intersection

T字、十字どちらの交点でも分割する。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260618_gap-decorations/demo/02/)
-   [コードを確認する](https://github.com/ics-creative/260618_gap-decorations/blob/main/demo/02/index.html)

```
.grid {
  row-rule: 3px solid orange;
  column-rule: 3px solid green;

  /* 01 */
  &.grid-01 {
    rule-break: intersection; /* 行・列の罫線 交点で分割 */
  }

  /* 02 */
  &.grid-02 {
    row-rule-break: normal; /* 行の罫線 T字交点のみで分割 */
    column-rule-break: intersection; /* 列の罫線 交点で分割 */
  }
}
```

#### `rule-inset`プロパティ

線の端をどれだけ短くするかを指定します。`column-rule-inset`・`row-rule-inset`プロパティで行・列の罫線にスタイルを個別に指定できます。`rule-inset-cap`・`rule-inset-junction`プロパティで罫線の終端、あるいは交点箇所のみの調整が可能です。罫線の長さを調整することで表組み内のコンテンツ内容が見えやすくなります。

![](https://ics.media/entry/260618/images/images/260618_gap-decorations_inset.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260618_gap-decorations/demo/03/)
-   [コードを確認する](https://github.com/ics-creative/260618_gap-decorations/blob/main/demo/03/index.html)

```
.grid {
  row-rule: 3px solid orange;
  column-rule: 3px solid green;
  rule-break: intersection;

  /* 01 */
  &.grid-01 {
    rule-inset: 12px; /* 行・列の罫線 12px短くする */
  }

  /* 02 */
  &.grid-02 {
    row-rule-inset-junction: 12px; /* 行の罫線 交点のみ12px短くする */
    column-rule-inset-cap: 24px; /* 列の罫線 終端のみ24px短くする */
  }
}
```

#### `rule-visibility-items`プロパティ

空白の領域に隣接する罫線を表示するかどうかを指定します。`column-rule-visibility-items`・`row-rule-visibility-items`プロパティで行・列の罫線にスタイルを個別に指定できます。指定できる値は4種類です。

値

内容

normal

Grid Layoutでは`all`と同じ。  
Multi-column Layoutでは`between`と同じ。（初期値）

all

罫線をすべて表示。

around

隣接する領域のうち、どちらか一方が要素と隣接していれば表示。

between

隣接する領域のうち、両方が要素と隣接していれば表示。

![](https://ics.media/entry/260618/images/images/260618_gap-decorations_visibility-items.png)

以下のデモでは、列に`around`を指定したので、左右どちらかに要素があれば罫線が表示されます。行に`between`を指定したので、上下に要素がある場合のみ罫線が表示されます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260618_gap-decorations/demo/04/)
-   [コードを確認する](https://github.com/ics-creative/260618_gap-decorations/blob/main/demo/04/index.html)

```
.grid {
  row-rule: 3px solid orange;
  column-rule: 3px solid green;
  rule-break: intersection;
  row-rule-visibility-items: between; /* 行の罫線 上下どちらにも要素が存在すれば罫線表示 */
  column-rule-visibility-items: around; /* 列の罫線 左右どちらかに要素が存在すれば罫線表示 */
}
```

#### `rule-overlap`プロパティ

行・列どちらの罫線を上に重ねて表示をするかを制御します。罫線の交点付近を確認してみてください。指定できる値は2種類です。

値

内容

row-over-column

行の罫線を上に重ねて表示。（初期値）

column-over-row

列の罫線を上に重ねて表示。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260618_gap-decorations/demo/05/)
-   [コードを確認する](https://github.com/ics-creative/260618_gap-decorations/blob/main/demo/05/index.html)

```
.grid {
  column-rule: 3px solid green;
  row-rule: 3px solid orange;

  /* 01 */
  &.grid-01 {
    rule-overlap: row-over-column; /* 初期値 */
  }

  /* 02 */
  &.grid-02 {
    rule-overlap: column-over-row; /* 列を行の上に重ねて表示 */
  }
}
```

### 作例

#### リンク集

次のデモでは、区切り線を入れた横並びのリンク集を紹介します。今までは子要素に`border-left`や疑似要素などを設定して実現していましたが、`column-rule`プロパティを使用すれば余白に対して線を表示できるのでシンプルに記述できます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260618_gap-decorations/demo/link-list/)
-   [コードを確認する](https://github.com/ics-creative/260618_gap-decorations/blob/main/demo/link-list/index.html)

```
.list {
  display: flex;
  gap: 12px 32px;
  flex-wrap: wrap;
  column-rule: 1px solid rgb(0 0 0 / 0.45); /* 列の罫線 */
}
```

#### お知らせ

次のデモはウェブサイトでよく目にするお知らせリストです。日付、カテゴリ、タイトル、矢印の間の罫線をGap Decorationsで実装しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260618_gap-decorations/demo/news/)
-   [コードを確認する](https://github.com/ics-creative/260618_gap-decorations/blob/main/demo/news/index.html)

```
.news-list {
  display: grid;
  grid-template-columns: max-content max-content 1fr 40px;
  column-gap: 24px;
  row-rule: 1px solid rgb(0 0 0 / 0.3); /* 行の罫線 */
  row-rule-inset-end: 40px; /* 右側を40px短く指定 */
}
```

`row-rule`と`row-rule-inset-end`でリストの各お知らせを区切る行の罫線を設定しています。お知らせのレイアウトには`subgrid`を使用しています。**サブグリッド**は記事『[CSSグリッド入門 - 図解でわかりやすく解説](https://ics.media/entry/15649/#%E3%82%B5%E3%83%96%E3%82%B0%E3%83%AA%E3%83%83%E3%83%89)』で紹介しています。

```
.news-list__item {
  display: grid;
  grid-template-columns: subgrid; /* サブグリッド */
  grid-column: 1 / -1;

  .news-list__item--anchor {
    column-rule-width: repeat(2, 1px), 4px; /* 1pxを2回、4pxを1回の順序で繰り返す */
    column-rule-style: repeat(2, dashed), double; /* 破線を2回、二重線を1回の順序で繰り返す */
    column-rule-color: rgb(0 0 0 / 0.3);
    column-rule-inset: calc((var(--padding) - 8px) * -1); /* 列の罫線を上下に伸ばす */
  }
}
```

`column-rule-inset`にマイナスの値を渡すことで罫線を伸ばすことができます。上下の`padding`で線が短くなってしまう場合などに有効です。

ホバー時には`column-rule-color`と`column-rule-inset`のスタイルを変化させています。また、ホバーした要素に追従する背景には**CSS Anchor Positioning**を使用しています。記事『[CSS アンカーポジショニング入門](https://ics.media/entry/251215/)』で詳しく解説しています。

```
.news-list {
  /* ホバー・フォーカス時に追従する背景要素 */
  &:after {
    position: absolute;
    inset: anchor(--anchor inside); /* 背景要素の位置、サイズをアンカー要素に合わせる */
  }

  .news-list__item--anchor {
    /* ホバー・フォーカス時のスタイル */
    &:is(:hover, :focus-visible) {
      anchor-name: --anchor; /* 背景要素が参照するアンカー要素として設定 */
      column-rule-color: rgb(0 0 0 / 0.8);
      column-rule-inset: 0;
    }
  }
}
```

#### スケジュール表

次のデモではスケジュール表を作成しています。`rule`プロパティで罫線の指定を行えば、レイアウト変更や、セルの結合などにも対応しやすいUIを簡単に作成できます。

スケジュール上のセルの配置については、`attr()`関数を使用しています。より詳しい説明は『[CSS の attr()関数が進化！HTML 属性値を参照する新しい使い方](https://ics.media/entry/260326/)』からご覧ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260618_gap-decorations/demo/schedule/)
-   [コードを確認する](https://github.com/ics-creative/260618_gap-decorations/blob/main/demo/schedule/index.html)

```
.calendar {
  .calendar-body {
    row-rule-width: 1px;
    row-rule-style: dashed, solid;
    row-rule-color: var(--color_primary-pale);
    row-rule-break: intersection;
    row-rule-inset: var(--inset_offset);
    column-rule: 1px solid var(--color_primary);
  }
}
```

### 対応ブラウザ

CSS Gap Decorationsの`rule`プロパティは、Chrome・Edge 149（2026年6月）以上で利用できます。

参照：[Can I use…](https://caniuse.com/mdn-css_properties_rule)

### まとめ

CSS Gap Decorationsを使うと、Grid LayoutやFlexboxの余白に対する装飾をより素直に書けるようになります。既存のレイアウト手法を変えずに導入しやすいのも嬉しいポイントです。今までは意外と手間のかかっていたUIを手軽に作成できるようになるので今後のブラウザ対応拡大にも期待しつつ、まずは対応環境でぜひ試してみてください。