---
title: "CSSでテキストの上下余白が調整可能に！text-box-trimの使い方"
source: "https://ics.media/entry/250319/"
publishedDate: "2025-03-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "sawada-naomi"
---

2025年3月19日 公開 / [株式会社ICS 澤田 ナオミ](https://ics.media/entry/staff/sawada-naomi/)

2024年12月〜2025年2月頃にかけてリリースされた[Safari 18.2](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/)、[Chrome 133](https://developer.chrome.com/release-notes/133?hl=ja)、[Microsoft Edge 133](https://learn.microsoft.com/ja-jp/microsoft-edge/web-platform/release-notes/133)から、`text-box-trim`プロパティと`text-box-edge`プロパティが使用可能になりました。**テキスト要素の上下のスペースを調整できるようになります**。

たとえば、次のCSSでテキスト上下の余白を調整できます。

```
.selector {
  text-box: trim-both cap alphabetic;
}
```

※ただし、フォントによります。

本記事では、上記で指定した各プロパティの使用方法と**具体的にどのようなデザインの実装に役立つのか、日本語フォントの場合を中心に**紹介します。

### テキストの上下のスペースとは？

今回調整ができるようになったテキストの上下のスペースとは何でしょうか？　このスペースはテキストに`line-height`プロパティを設定した際、フォントサイズよりも行全体の高さが大きくなる場合に生まれるスペースで、「ハーフ・レディング」とも呼ばれるものです。簡単に説明します。

たとえば、フォントサイズが`60px`のテキストに`line-height: 2`を設定したとします。わかりやすいよう背景色をつけると、見た目は次のようになります。

![ハーフ・レディングのスペースを表した図](https://ics.media/entry/250319/images/250319_text-half-leading.png)

`60px × 2`で算出される行の高さ`120px`のうち、フォントサイズ`60px`を引いた差である`60px`をレディングと呼びます（英語ではleadingと綴り、活版印刷で行間に挟まれる鉛が由来です）。ハーフ・レディングはその半分の値を指しており、`30px`がテキストの上下にそれぞれスペースとして追加される仕組みです。

デザインを再現するために、ハーフ・レディングを考慮して`padding`や`margin`の値を微調整したり、ハーフ・レディング自体を打ち消すような処理を行っていたコーダーも多いのではないでしょうか。

今回、`text-box`プロパティによってハーフ・レディングの上下どちらか（または両方）をトリミングするか、そしてどの位置からトリミングを開始するかといった設定が可能になります。

#### line-height: 1 の指定でも余白調整が可能か？

テキストが1行であれば`line-height: 1`に設定して差分の余白を発生させないよう調整していた、という場合もあるかと思います。しかし、文言の変更や機械翻訳によってテキストが複数行になる場合に詰まって見えてしまいます。

![line-height: 1 を指定した場合のテキスト折り返し表示例](https://ics.media/entry/250319/images/250319_text_one_line.png)

`text-box`プロパティでは余分なハーフ・レディングを除去しつつ、行の間隔は`line-height`で指定した通り保つ、といったことが可能です。

### text-boxプロパティの使い方

ショートハンドプロパティである`text-box`の前に、まずは`text-box-trim`プロパティと`text-box-edge`プロパティについて、順番に見ていきます。

#### text-box-trimプロパティ

上下のスペースのうち、どちらをトリミングするかを指定できるプロパティです。上下の両方のスペースをトリミングする場合は、`trim-both`を指定します。そのほか取りうる値は次の通りです。

-   `none`：初期値。スペースをトリミングしません。
-   `trim-both`：上下両方のスペースをトリミングします。
-   `trim-start`：上のスペースをトリミングします。
-   `trim-end`：下のスペースをトリミングします。

▼CSSの記述例

```
/* 上下両方のスペースをトリミング */
.text {
  text-box-trim: trim-both;
}
```

![text-box-trimプロパティの値によるトリミングの変化を表した図](https://ics.media/entry/250319/images/250319_text-box-trim.png)

![text-box-trimプロパティの値によるトリミングの変化を表した図](https://ics.media/entry/250319/images/250319_text-box-trim_2.png)

▼参考リンク

-   [text-box-trim - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box-trim)

#### text-box-edgeプロパティ

`text-box-edge`プロパティは、トリミングを開始する位置を指定できます。

取りうる値の種類はいくつかありますが、代表的なものをいくつかピックアップします。

-   `text`：初期値。上部を`text-over baseline`（フォントのアセンダーラインを含む）、下部を`text-under baseline`（フォントのディセンダーラインを含む）の位置でトリミングします。
-   `cap`：上部を`cap-height baseline`（英大文字`X`の上限）の位置でトリミングします。
-   `alphabetic`：下部を`alphabetic baseline`（英小文字`x`の下限）の位置でトリミングします。

▼CSSの記述例

```
/* 値を1つ指定する場合 */
.text {
  text-box-trim: trim-both;
  text-box-edge: text;
}

/* 値を2つ指定する場合（左から順に上のスペース、下のスペースに対応します） */
.text2 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
```

それぞれの値によるトリミングのイメージは次のようになります。

![text-box-edgeプロパティの値によるトリミングの変化を表した図](https://ics.media/entry/250319/images/250319_text-box-edge.png)

それぞれのラインの位置はフォントによって異なります。日本語ではあまり変化が見られないことが多いですが、とくに欧文フォントでは種類によって大きく位置が異なる場合があります。

はじめに例として挙げた値のほかに、日中韓言語文字を考慮した`ideographic`、`ideographic-ink`という値もありますが、まだサポートされていません。

▼参考リンク

-   [text-box-edge - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box-edge)
-   [Microsoft Edge 133リリースノートの記載](https://learn.microsoft.com/ja-jp/microsoft-edge/web-platform/release-notes/133#css-text-box-text-box-trim-and-text-box-edge-properties)
-   [text-edge - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-edge)

#### text-boxショートハンドプロパティ

`text-box`プロパティを使用すると、これまで紹介した`text-box-trim`プロパティと`text-box-edge`プロパティを一括で指定できます。

```
.text {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
```

上記の指定を、以下の通りまとめられます。値は`text-box-trim`プロパティ、`text-box-edge`プロパティの順で指定しています。

```
.text {
  text-box: trim-both cap alphabetic;
}
```

指定方法の詳細はMDNのページも参考ください。

-   [text-box - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box)

### 実装しやすくなるデザイン例

ここからは、`text-box`プロパティを使用することで見た目を整えやすくなるデザイン例を紹介します。フォントは昨今のウェブサイトでよく見かけ、また上下でスペース量の差があるGoogle Fontsの[Noto Sans Japanese](https://fonts.google.com/noto/specimen/Noto+Sans+JP)を基本的に使用します。その他、各サンプルで[BIZ UDPGothic](https://fonts.google.com/specimen/BIZ+UDPGothic)と[Zen Old Mincho](https://fonts.google.com/specimen/Zen+Old+Mincho)、そして各OS標準の游ゴシック、ヒラギノ角ゴシック、メイリオの場合も掲載します。

#### 文言の背景に角丸矩形を配置したデザイン

どのサイトでも使用頻度の高い、文言の背景に角丸矩形を配置したデザインを見ていきましょう。

![スクリーンショット：文言の背景に角丸矩形を配置したデザインのサンプルコード。](https://ics.media/entry/250319/images/250319_demo_label.png)

わずかですが、①未指定の場合では数px程度テキストが下に寄って見えます。②の指定ではハーフ・レディングは除かれましたが、依然として下に寄っているようです。③では値を`trim-both cap alphabetic`に変更することで日本語はやや過剰にトリミングされているようにも見えますが、英語と合わせても上下均等にトリミングされるようになりました。そして、④では③の状態から上下に均等に`padding`を追加して調整しています。

他のフォントでの見え方について、次のサンプルを用意したので参考ください。

▼ スクロールして閲覧ください。

-   [サンプルを別タブで開く](https://ics-creative.github.io/250319_text-box/label/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250319_text-box/blob/main/label/index.html)

閲覧環境が限られているヒラギノ角ゴシックとメイリオについてはスクリーンショットを掲載します。

![スクリーンショット：ヒラギノ角ゴシックの場合](https://ics.media/entry/250319/images/250319_demo_label_screenshot_hiragino.png)

![スクリーンショット：メイリオの場合](https://ics.media/entry/250319/images/250319_demo_label_screenshot_meiryo.png)

#### アイコンとテキストの組み合わせ

続いて、アイコンとテキストを組み合わせた場合を考えてみます。これまでは、CSSでアイコンとテキストを上下中央揃えになるよう指定をしても、やはりフォントによっては数pxずれて見えてしまう、ということが起こりました。以下のサンプルでは、さきほどと同様に`text-box: trim-both cap alphabetic`を指定することで上下中央揃えに見えるよう調整しています。

![スクリーンショット：アイコンとテキストの組み合わせのサンプルコード](https://ics.media/entry/250319/images/250319_demo_icon_text.png)

他のフォントでの見え方について、次のサンプルを用意したので参考ください。

▼ スクロールして閲覧ください。

-   [サンプルを別タブで開く](https://ics-creative.github.io/250319_text-box/icon_text/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250319_text-box/blob/main/icon_text/index.html)

閲覧環境が限られているヒラギノ角ゴシックとメイリオについてはスクリーンショットを掲載します。

![スクリーンショット：ヒラギノ角ゴシックの場合](https://ics.media/entry/250319/images/250319_demo_icon_text_screenshot_hiragino.png)

![スクリーンショット：メイリオの場合](https://ics.media/entry/250319/images/250319_demo_icon_text_screenshot_meiryo.png)

#### 画像とテキストの組み合わせ

画像とテキストが横並びになるレイアウトもよく見かけますが、ハーフ・レディングの影響でテキストが画像よりも若干下にずれて見えてしまうことがありました。

この場合も、`text-box`プロパティによって画像とテキストの上辺の揃えを調整できます。

![スクリーンショット：画像とテキストの組み合わせのサンプルコード](https://ics.media/entry/250319/images/250319_demo_image_text.png)

![スクリーンショット：画像とテキストの組み合わせのサンプルコード](https://ics.media/entry/250319/images/250319_demo_image_text_2.png)

しかし、フォントによって少し注意が必要です。Noto Sans Japaneseのような下に寄ったフォントでは`text-box-edge`をどのように設定しても画像とテキストの上辺が微妙に揃わないといったことが起こります。一方で、ヒラギノ角ゴシックでは画像とテキストがNoto Sans Japaneseよりも揃って見えます。

他のフォントでの見え方について、次のサンプルを用意したので参考ください。今回検証したフォントでは、ほとんどの場合で`text-box: trim-both text`の指定がもっとも揃って見えます。

▼ スクロールして閲覧ください。

-   [サンプルを別タブで開く](https://ics-creative.github.io/250319_text-box/image_text/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250319_text-box/blob/main/image_text/index.html)

閲覧環境が限られているヒラギノ角ゴシックとメイリオについてはスクリーンショットを掲載します。

![スクリーンショット：ヒラギノ角ゴシックの場合](https://ics.media/entry/250319/images/250319_demo_image_text_screenshot_hiragino.png)

![スクリーンショット：メイリオの場合](https://ics.media/entry/250319/images/250319_demo_image_text_screenshot_meiryo.png)

### Figmaで役立つ設定

これまでに見てきた`text-box`プロパティの設定は、[Figma](https://www.figma.com/ja-jp/)でも一部表現が可能です。テキスト要素に対して、以下の手順で設定が可能です。

1.  テキスト要素を選択
2.  デザインパネル内、\[タイポグラフィー\]項目の右下にある\[タイプの設定\]アイコンをクリックして設定パネルを開く
3.  \[上下トリミング\]項目を右側アイコンの\[ベースラインまでのキャップハイト\]に設定。

![](https://ics.media/entry/250319/images/250319_figma_trim.gif)

「ベースラインまでのキャップハイト」でのトリミング、つまり`text-box-edge`を`cap`で指定した場合の見た目に近しいです。キャップハイトはアルファベットの大文字のサイズが基準となるため、日本語フォントに適用すると多少はみ出る場合が多いので注意が必要です。

![](https://ics.media/entry/250319/images/250319_figma_setting.png)

Figmaの設定機能については、Figma公式Xにて紹介ポストがあるので参照ください。

-   [上下トリミング設定に関するFigma公式Xのポスト](https://x.com/figma/status/1640750882613493760)

また、2025年3月執筆時点のFigmaでは次の設定ができないので留意が必要です。

-   上下どちらか片方だけのトリミング設定
-   `text-box-edge`の`cap`以外の値を再現する設定

### 対応ブラウザ

`text-box`プロパティは2025年3月現在、Chrome・Edge 133（2025年2月）とSafari 18.2（2024年12月）以降で対応しています。主要なモダンブラウザのなかでは、Firefoxが未対応となっています。

-   参照：[Can I use…](https://caniuse.com/?search=text-box)

![text-boxプロパティのブラウザ対応状況のスクリーンショット](https://ics.media/entry/250319/images/250319_caniuse.png)

### まとめ

`text-box`プロパティについて紹介しました。`line-height`プロパティの指定によって生じるスペースを調節できるのは嬉しいですね。しかしながら、サンプルで紹介したように同じ日本語フォントでもフォントの種類によって見え方が変化するので注意しながら採り入れていくとよいでしょう。日本語フォント向けのサポート強化や未対応のブラウザへの展開を期待しています！

### 参考サイト・記事

-   [CSS text-box-trim | Blog | Chrome for Developers](https://developer.chrome.com/blog/css-text-box-trim)
-   [WebKit Features in Safari 18.2 | WebKit](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/)