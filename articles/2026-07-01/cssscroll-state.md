---
title: "スクロールの状態変化でスタイル切替が可能に！ CSSコンテナークエリーのscroll-state()入門"
source: "https://ics.media/entry/250602/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2025-06-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

`@container scroll-state()`は、CSSコンテナークエリーの一種です。従来はJavaScriptを使って実装していた、「スクロールされたらヘッダーのスタイルを切り替える」等のインタラクションをCSSだけで実装できるようになります。

![](https://ics.media/entry/250602/images/250602_stuck_header.gif)

本記事では、`scroll-state()`の使い方とできることを作例で紹介します。

コンテナークエリーは、記事『[要素の幅でレスポンシブ対応を行える！コンテナークエリーの使い方](https://ics.media/entry/240617/)』で紹介しています。コンテナー幅でのレイアウト制御にかかわらず、インタラクティブなUI構築にも役立ちます。コンテナークエリーの可能性の広さを感じ取っていただけたら嬉しいです。

本記事の作例は、Chrome・Edgeでご覧ください。

### `@container scroll-state()`の使い方

このクエリーは、`container-type: scroll-state`が指定された要素の**子孫要素に対して**利用できます。`@container scroll-state()`の丸かっこ内には、`stuck`、`scrollable`、`snapped`、`scrolled`を指定できます。それぞれを利用できる条件は以下の通りです。

-   `stuck`
    -   `position: sticky`で要素が固定されている
-   `scrollable`
    -   上下左右いずれかの方向に要素をスクロールできる
-   `snapped`
    -   `scroll-snap-type`プロパティで要素がピタッと止まる
-   `scrolled`
    -   直近のスクロール方向を検知できる

コロン（`:`）のあとには、検知する端・方向・軸を指定します。

▼`stuck`の記述例

```
<div class="item-container">
  <div class="item"></div>
</div>
```

```
.item-container {
  container-type: scroll-state;
  position: sticky;
  top: 0;
  left: 0;
}

.item {
  @container scroll-state(stuck: top) {
    /* .item-container が固定されたときのスタイルを記述する */
  }
}
```

次の章からは、`stuck`、`scrollable`、`snapped`、`scrolled`のそれぞれで、どのようなUI構築ができるか紹介します。

### stuck: 要素が固定された瞬間を検知する

`@container scroll-state(stuck: top)`を指定すると、`position: sticky`で画面上部へ固定された瞬間にスタイルを適用できます。次の作例では、画面の最上部にいるかどうかで、ヘッダーの背景色を切り替えています。画面の最上部から少しでもスクロールすると、背景色が白に変わります。

![](https://ics.media/entry/250602/images/250602_stuck_header.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250526_scroll-state/stuck-header/)
-   [コードを確認する](https://github.com/ics-creative/250526_scroll-state/blob/main/stuck-header/index.html)

#### 固定したら要素を追加表示する

次の作例では、画面上部にボタンが到達した瞬間に、ボタンの横幅を広げています。

![](https://ics.media/entry/250602/images/250602_stuck_navigation.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250526_scroll-state/stuck-navigation/)
-   [コードを確認する](https://github.com/ics-creative/250526_scroll-state/blob/main/stuck-navigation/index.html)

※この作例は、キーボードでの操作やスクリーンリーダーでの読み上げはうまく動かない可能性があります。

#### 固定が終わったらスタイルを適用する

`@container scroll-state(stuck: bottom)`と`not`条件（`@container not scroll-state(stuck: bottom)`）を利用することで、**`position: sticky`の固定が終了した瞬間**にスタイルを適用できます。次の作例では、「セクション01」に配置したボタンを画面下部に固定表示し、スクロールで通過したらボタンにスタイルを追加します。

![](https://ics.media/entry/250602/images/250602_stuck_section_button.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250526_scroll-state/stuck-section-button/)
-   [コードを確認する](https://github.com/ics-creative/250526_scroll-state/blob/main/stuck-section-button/index.html)

### scrollable: スクロールできることを検知する

`@container scroll-state(scrollable: top)`を指定すると、要素が上方向へスクロールできるときにスタイルを適用できます。次の作例は、上方向へスクロールできるとき、画面上部に補助メッセージを追加表示しています。

![](https://ics.media/entry/250602/images/250602_scrollable_hint.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250526_scroll-state/scrollable-hint/)
-   [コードを確認する](https://github.com/ics-creative/250526_scroll-state/blob/main/scrollable-hint/index.html)

### snapped: 要素がピタッと止まることを検知する

`@container scroll-state(snapped: y)`を指定すると、`scroll-snap-type`を指定したスクロールコンテナー内で、対象要素がy軸方向にスナップされている、またはスナップされようとしているときにスタイルを適用できます。次の作例では、要素を少し拡大して強調表示しています。

![](https://ics.media/entry/250602/images/250602_snapped_vertical.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250526_scroll-state/snapped-vertical/)
-   [コードを確認する](https://github.com/ics-creative/250526_scroll-state/blob/main/snapped-vertical/index.html)

#### カルーセルUIに適用する

次の作例は、記事『[JavaScript不要! HTMLとCSSでつくるカルーセルUI](https://ics.media/entry/250516/)』で紹介したカルーセルUIに適用したものです。「▶」ボタンのクリック時に写真が水平方向にスライドしますが、スライド中だけサイズが縮小するような効果を与えています。`snapped`の値には、インライン方向を示す`inline`を指定しています。

![](https://ics.media/entry/250602/images/250602_snapped_carousel.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250526_scroll-state/snapped-carousel/)
-   [コードを確認する](https://github.com/ics-creative/250526_scroll-state/blob/main/snapped-carousel/index.html)

▼追加したCSSを抜粋

```
.item {
  container-type: scroll-state;
  img {
    transition: scale 0.3s;
    transition-delay: 0.2s;

    @container not scroll-state(snapped: inline) {
      scale: 0.85;
      transition-delay: 0s;
    }
  }
}
```

### scrolled: 直近のスクロール方向を検知する

`@container scroll-state(scrolled: bottom)`を指定すると、コンテナーが直近で下方向へスクロールされたときにスタイルを適用できます。`top`を指定すると、直近の上方向へのスクロールを検知できます。

たとえば、下スクロール時だけヘッダーを隠し、上スクロール時だけ表示するには次のように記述します。

```
html {
  container-type: scroll-state;
}

.site-header {
  position: sticky;
  top: 0;
  translate: 0 0;
  transition: translate 0.3s;
}

@container scroll-state(scrolled: bottom) {
  .site-header {
    translate: 0 -100%;
  }
}

@container scroll-state(scrolled: top) {
  .site-header {
    translate: 0 0;
  }
}
```

### 対応ブラウザー

`scroll-state()`は、`stuck`・`scrollable`・`snapped`がChrome 133・Edge 133（2025年2月）以上で利用できます。`scrolled`はChrome 144・Edge 144（2026年1月）以上で利用できます。

参照：[Can I use…](https://caniuse.com/mdn-css_at-rules_container_scroll-state_queries)

### まとめ

`@container scroll-state()`でできることを紹介しました。これまでJavaScriptでしか実現できなかった「スクロールの状態に応じたスタイル変更」をCSSだけで実装できます。

まだ対応ブラウザーが限られていますが、多くの場面で活用できる機能です。CSSでシンプルな演出を追加したいときに、ぜひ活用してみてください。

※この記事が公開されたのは**1年前**ですが、**先月5月**に内容をメンテナンスしています。

このシリーズの記事

-   [前の記事CSSのコンテナースタイルクエリーstyle()の使い方](https://ics.media/entry/240723/)