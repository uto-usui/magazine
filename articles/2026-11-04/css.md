---
title: "CSSだけで横スクロールと見出し固定を両立！ 単一軸スクロールコンテナー"
source: "https://ics.media/entry/261104/"
publishedDate: "2026-11-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "yamamoto"
---

Chrome・Edge 156（2026年10月）では、`overflow`プロパティの機能が拡張され、**単一軸スクロールコンテナー**（**Single-axis scroll containers**）に対応しました。これにより、`position: sticky;`の追従する要素を横方向と縦方向で分けられるようになりました。

### 実現したいこと

ウェブページ上の表を考えてみましょう。表がブラウザの幅からはみ出すぐらい横長の場合、表の中を横スクロールさせて全体を確認できるようにします。左側に表の見出しがあれば、スクロール時に位置が固定されている方が内容を読み取りやすいです。

表が縦に長い場合、**通常は表の中を縦スクロール**します。ウェブページ全体の縦スクロールとは別に、表の中を縦横のスクロールコンテナーとして表示させます。

今回実現したいのは、**横スクロール時は表の内部をスクロールさせて左の見出しを固定**しつつ、表の中の**縦スクロールはページのスクロールと連動**させる（表の中のスクロールではない）動きです。その際、表の上部の見出しはページの上端に固定します。

単一軸スクロールコンテナーに対応する前は、左見出しを固定できても、上見出しはページの縦スクロールとともに画面の外へ流れてしまいました。この挙動をCSSだけで実現できるようになります。

次の章から、従来の方法で両立できなかった理由と、新しい仕様を詳しく見ていきましょう。

### なぜ固定見出しの両立が実現できないのか

表を横方向にスクロールさせるため`overflow-x`に`auto`/`scroll`を指定した場合、たとえ縦のスクロールが発生していなかったとしても、**縦方向もスクロールコンテナー**としてあつかわれました。`overflow-y`の場合も同様です。

`position: sticky;`はスクロールに合わせて要素を固定するCSSですが、自分の祖先にスクロールコンテナーがあると、その**コンテナーの領域**が基準になります。

そのため、祖先要素にスクロールコンテナーがある要素にいくら`position: sticky;`を指定しても固定位置の基準はスクロールコンテナーになってしまいます。横方向は表の中でスクロール、縦方向はページに対してstickyをしたくても、これらを分けて考えることはできませんでした。

下のデモでは親要素に高さを設定しており、内側を縦スクロールすれば上見出しをそのスクロール領域の上端に固定できます。ただし、ページの縦スクロールには追従しません。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/261104_single_axis_scroll_containers/demo/previous/)
-   [コードを確認する](https://github.com/ics-creative/261104_single_axis_scroll_containers/tree/main/demo/previous)

### 単一軸スクロールコンテナーが何を可能にしたのか

`overflow`プロパティにスクロール可能な値と`clip`を組み合わせたときの動作が更新されました。それにより、**指定した軸（この場合は横）だけがスクロールコンテナーになります**。縦方向はスクロールコンテナーにならないため、`position: sticky;`はページ全体のスクロールに連動できます。具体的には、次のように指定します。

```
overflow: auto clip;
/*
  以下の指定と同じ意味
  overflow-x: auto;
  overflow-y: clip;
*/
```

`overflow: auto clip;`のように片軸だけに`clip`を指定した場合、単一軸スクロールコンテナーに対応しないブラウザーは`hidden`を指定したものとみなします。つまり、片軸だけに`clip`を指定しても指定通りには動きません。

以下の図は、`table`の親要素の`overflow-y`が`hidden`の場合と`clip`の場合で、縦横それぞれのスクロールコンテナーがどう変わるかを示しています。

![](https://ics.media/entry/261104/images/images/261104_single-axis_figure.png)

`position: sticky;`は、**直近の祖先スクロールコンテナーを基準に固定**されます。この例では、`overflow-y`の値によって縦方向の基準が次のように変わります。

-   `overflow-y: hidden;`（従来）
    
    親要素が縦方向のスクロールコンテナーになるため、ページを縦にスクロールすると上見出しも親要素ごと移動し、画面上部に固定できません。
    
-   `overflow-y: clip;`（今回の仕様）
    
    親要素が縦方向のスクロールコンテナーにならないため、さらに祖先にあるスクロールコンテナーが基準になります。この例ではページ全体の縦スクロールに連動し、上見出しを画面上部に固定できます。
    

これにより、左見出しは表を横スクロールしたときに左端に固定し、上見出しはページを縦スクロールしたときに画面上部に固定できます。

この指定と`position: sticky;`を組み合わせた動きを、次のデモで見ていきます。

### デモ①：工程表

※注意：本記事のデモは、**Chrome・Edge 156以上**でご覧ください。

上と左の見出しを固定した工程表です。左見出しはテーブルに、上見出しは画面上部に固定しているのがポイントです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/261104_single_axis_scroll_containers/demo/01/)
-   [コードを確認する](https://github.com/ics-creative/261104_single_axis_scroll_containers/tree/main/demo/01)

1列目と2列目には、それぞれ`scope="rowgroup"`と`scope="row"`を指定しています。行見出し固定時に重ならないよう、2列目は1セル分右側に固定しています。

```
.table-scroll {
  overflow: auto clip; /* 横方向だけスクロールさせる */

  thead {
    th {
      position: sticky; /* 列見出しを画面上部に固定 */
      top: 0;
    }
  }

  tbody {
    th[scope="rowgroup"] {
      position: sticky; /* 行見出しをテーブル左側に固定 */
      left: 0;
    }

    th[scope="row"] {
      position: sticky; /* 行見出しをテーブル左側に固定 */
      left: 160px; /* 1セル分右側で固定させる */
    }
  }
}
```

`.table-scroll`に`overflow: auto clip;`を指定すると、この要素は横方向だけのスクロールコンテナーになります。縦方向にはスクロールコンテナーが作られないため、上見出しの`position: sticky;`は`.table-scroll`ではなくページ全体のスクロールに追従し、画面上部に固定されます。

### デモ②：国別比較テーブル

次のデモは、単一軸スクロールコンテナーと`scroll-state()`を組み合わせた国別比較テーブルです。**縦横の見出しの固定状態に応じて**、文字サイズの変更や影の表示など、スタイルを切り替えています。

`scroll-state()`は、スクロールの可否や`position: sticky;`の固定状態を判定できるコンテナークエリーです。基本的な使い方は記事『[スクロールの状態変化でスタイル切替が可能に！　CSSコンテナークエリーのscroll-state()入門](https://ics.media/entry/250602/)』をご覧ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/261104_single_axis_scroll_containers/demo/02/)
-   [コードを確認する](https://github.com/ics-creative/261104_single_axis_scroll_containers/tree/main/demo/02)

```
.table-scroll {
  overflow: auto clip; /* 横方向だけスクロールさせる */
  container-type: scroll-state; /* スクロール状態を判定可能に */
  container-name: table-scroll; /* テーブルの参照名 */

  table {
    thead {
      position: sticky; /* 列見出しを上部に固定 */
      top: 0;
      container-type: scroll-state; /* スクロール状態を判定可能に */
      container-name: column-heading; /* 列見出しの参照名 */

      th {
        @container column-heading scroll-state(stuck: top) {
          .country-heading {
            .country-flag {
              grid-template-columns: 1fr;
            }
          }
        }
      }
    }

    tbody {
      th {
        position: sticky; /* 行見出しを左側に固定 */
        left: 0;
      }
    }
  }

  .scroll-shadow {
    /* 右方向にまだスクロールできる場合 */
    @container table-scroll scroll-state(scrollable: right) {
      opacity: 1;
    }
  }
}
```

### 対応ブラウザ

CSSの`overflow`プロパティによるSingle-axis scroll containersは、Chrome・Edge 156（2026年10月）以上で利用可能です。

参照：[Can I use…](https://caniuse.com/mdn-css_at-rules_supports_named-feature_single-axis-scroll-container)

### まとめ

単一軸スクロールコンテナーを紹介しました。機能自体に派手さはないかもしれませんが、活用すればUXを高めることができます。実装に手間がかかっていた表現をCSSのみでシンプルに記述できるので、ぜひ活用してみてください。