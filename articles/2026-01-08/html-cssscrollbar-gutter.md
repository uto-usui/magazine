---
title: "HTML制作で気をつけたいスクロールバーの挙動 - ガタつきをCSSのscrollbar-gutterで防ぐ方法など"
source: "https://ics.media/entry/230206/"
publishedDate: "2023-02-14"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ブラウザのスクロールバーは、OSの種類によって挙動や見た目がさまざまです。環境によって挙動が違うため、自分の環境では問題なくても、ユーザーの環境から見ると問題が起きていることがあります。次のような問題を経験したことがある人も多いのではないでしょうか？

-   不要なスクロール領域ができていた
-   スクロールバーの切り替わりで画面がガタつく

これらの問題を防ぐためには、対処法のほかにどんな環境で発生するのかを知っておく必要があります。本記事では、スクロールバーの簡単な説明と、2つのよくある問題と対処法について紹介します。

### スクロールバーの簡単な説明と、制作時のポイント

よくある問題を紹介する前に、スクロールバーの簡単な説明と、macOSで制作する時の注意点について触れておきたいと思います。

#### ブラウザのスクロールバーはどのように表示されるのか

HTML/CSSでは、子要素が親要素のボックスからはみだす（オーバーフローを起こす）時の振る舞いを`overflow`プロパティで制御しています。この時、`overflow`プロパティの値が`auto`または`scroll`だった場合にスクロールバーが表示されます。

※ルート要素のみ特殊で、ブラウザの表示サイズからコンテンツがはみ出る時に、スクロールバーが表示されます。

![ボックスにスクロールバーが表示される図](https://ics.media/entry/230206/images/230214_scrollbar.png)

また、スクロールバーはオーバーレイスクロールバーとクラシックスクロールバーの2種類に大きく分類されます。オーバーレイスクロールバーは、**スクロールバーの幅を持たずボックスの上に重ねて表示されます**。対してクラシックスクロールバーは、**ボックスのスペースを削って表示されます**。どちらが適用されるかはOSやブラウザによって変化します。

▼macOS: オーバーレイスクロールバーの表示

![](https://ics.media/entry/230206/images/230214_overlay_scrollbar_mac.webp)

▼macOS: クラシックスクロールバーの表示

![](https://ics.media/entry/230206/images/230214_classic_scrollbar_mac.webp)

デスクトップのOSだと、Windowsはスクロールバーが常に表示されて、クラシックスクロールバーが通常は適用されます。macOSの場合は、スクロールバーはスクロールした時だけ表示されて、オーバーレイスクロールバーが通常は適用されます。

#### macOSで制作する時は、クラシックスクロールバーを常に表示しよう

macOSのオーバーレイスクロールバーは、**DOM要素にスクロールバーが発生しているかが検知しにくい**です。Windows環境のケアが足りず、「あとからWindowsでブラウザを確認をしたら、不要なスクロールバーが表示されていた」ということがよくあります。

そのため、制作時には「常に表示」設定に切り替えて、**クラシックスクロールバーを表示しておくことをオススメ**します。

macOS Ventura 13では、［システム設定］→［外観］にあるスクロールバーの項目から設定を変更できます。通常は「マウスまたはトラックパッドに基づいて自動的に表示」が選択状態となっていて、オーバーレイスクロールが適用されています。「常に表示」を選択すると、クラシックスクロールバーが適用されるようになります。

▼macOS Ventura 13のスクロールバー設定画面

![](https://ics.media/entry/230206/images/230214_os_setting_mac.png)

### よくある問題①: `width: 100vw`を指定した時に横スクロールバーが表示される

`vw`は、ビューポート幅に基づいた割合を指定できる便利な単位ですが、クラシックスクロールバーでは**ルート要素の横幅からスクロールバーの幅分はみだす**可能性があります。

ビューポート幅には**スクロールバーの幅も含まれる**ため、ボックスのスペースを削るクラシックスクロールバーが表示されると、ルート要素の横幅は`100vw - スクロールバーの幅`となります。そこに`width: 100vw`の子要素を追加すると、**ルート要素の横幅からスクロールバーの幅分はみだす**という問題が起こります。

次のサンプルは、Y軸方向へスクロール可能なページに`width: 100%`の要素と、`width: 100vw`の要素を追加しています。クラシックスクロールバーが表示される環境で確認すると、`width: 100vw;`の横幅は`width: 100%`より大きく、スクロール領域ができていると思います。

▼Windows: 100vwの要素で横スクロールバーが表示されるサンプル

![](https://ics.media/entry/230206/images/230214_100vw_win.png)

▼macOS: 100vwの要素で横スクロールバーが表示されるサンプル

![](https://ics.media/entry/230206/images/230214_100vw_mac.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230206_scrollbar_tips/100vw/)
-   [コードを確認する](https://github.com/ics-creative/230206_scrollbar_tips/blob/main/100vw/index.html)

ルート要素のY軸方向にスクロールが発生する場合は、`100vw`自体の使いどころが難しくなります。そういった場合は`width: 100%`を利用した実装にするなど、別のアプローチの検討をオススメします。

また、この問題は、macOSなどのオーバーレイスクロールバーが通常は適用される環境だと起きません。HTML制作時には、Windows環境もケアできるように意識しましょう。

### よくある問題②: `overflow: hidden`の動的切り替えでガタつきが起こる

ルート要素のスクロールを一時的に無効化したい時に、`overflow: hidden`を利用するなど、`overflow`プロパティの値の切り替えを行うことがあります。この切り替えをクラシックスクロールバーで確認すると、**スクロールバーの幅分のガタつきが生じてレイアウトシフトが起きます。**

次のサンプルは、`dialog`タグでモーダルを開いた時に、`body`タグに`overflow: hidden`を指定して、スクロールを一時的に無効化したものです。

▼macOS: スクロールバーの幅分がガタつくサンプル

![](https://ics.media/entry/230206/images/230214_scrollbar_gutter_mac.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230206_scrollbar_tips/scrollbar-gutter/)
-   [コードを確認する](https://github.com/ics-creative/230206_scrollbar_tips/blob/main/scrollbar-gutter/index.html)

モーダルを開いた時にスクロールはできなくなるものの、クラシックスクロールバーの幅分のレイアウトシフトが起きています。

次のセクションでは、この問題を防ぐ2つの対策を紹介します。

#### 対策①: スクロールバーを常に表示してガタつきを防ぐ

ひとつは、スクロール不可能な時でも、スクロールバーを常に表示する対策です。`overflow: scroll`や`position: fixed`を利用して、一時的に「スクロール不可能だけどスクロールバーを常にする」状態を作ります。

この対策はCSSのほかに、JavaScriptの処理が必要になります。作例を用意しましたので、実装の参考にしてみてください。

▼macOS: スクロールバーを常に表示してガタつきを防ぐサンプル

![](https://ics.media/entry/230206/images/230214_scrollbar_gutter_fix_mac.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230206_scrollbar_tips/scrollbar-gutter-fix/)
-   [コードを確認する](https://github.com/ics-creative/230206_scrollbar_tips/blob/main/scrollbar-gutter-fix/index.html)

#### 対策②: `scrollbar-gutter`プロパティでガタつき防ぐ

もうひとつは、`scrollbar-gutter`というCSSプロパティを利用する対策です。

このプロパティは、スクロールバーの幅分の余白を制御できるプロパティで、スクロールバーが表示されていない状態でもスクロールバーのスペースを確保できます。

次のサンプルでは、モーダルを開くタイミングで`body`タグに`overflow: hidden`を指定しつつ、横幅を制御したい要素に`overflow: auto`と`scrollbar-gutter: stable`を指定してガタつきを防いでいます。

▼macOS: scrollbar-gutterプロパティでガタつきを防ぐサンプル

![](https://ics.media/entry/230206/images/230214_scrollbar_gutter_property_mac.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230206_scrollbar_tips/scrollbar-gutter-property/)
-   [コードを確認する](https://github.com/ics-creative/230206_scrollbar_tips/blob/main/scrollbar-gutter-property/index.html)

`scrollbar-gutter`プロパティは、2023年2月現在、ChromeやEdge、Firefoxで利用可能です。Safariでは利用できません。

![scrollbar-gutterプロパティのサポート状況](https://ics.media/entry/230206/images/230214_scrollbar_gutter_support.png)

#### オーバーレイスクロールバーでは、問題が起きないことに注意

スクロールバーがガタつく問題も、「100vwの問題」と同様にmacOS環境だと気付きにくいです。しぶとくお伝えすることになりますが、HTML制作時にはWindows環境もケアできるように意識しましょう。

### おまけ: 見た目を変えたい時は`-webkit-scrollbar-* / scrollbar-*`を利用する

スクロールバーのデザインを調整したい場合、疑似要素`::-webkit-scrollbar-*`と`scrollbar-width / scrollbar-color`というCSSプロパティで調整可能です。

Chrome・Safari・Edge用には`::-webkit-scrollbar-*`を利用し、Firefox用には`scrollbar-width / scrollbar-color`を利用します。

プロパティの詳細は、MDNのドキュメントを参照ください。

-   [MDN - ::-webkit-scrollbar](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)
-   [MDN - scrollbar-width](https://developer.mozilla.org/ja/docs/Web/CSS/scrollbar-width)
-   [MDN - scrollbar-color](https://developer.mozilla.org/ja/docs/Web/CSS/scrollbar-color)

次のサンプルは、疑似要素`::-webkit-scrollbar`と`scrollbar-color`プロパティを利用して、つまみ部分を赤く装飾したものです。

▼Windows: スクロールバーの装飾サンプル

![](https://ics.media/entry/230206/images/230214_styling_win.png)

▼macOS: スクロールバーの装飾サンプル

![](https://ics.media/entry/230206/images/230214_styling_mac.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230206_scrollbar_tips/styling/)
-   [コードを確認する](https://github.com/ics-creative/230206_scrollbar_tips/blob/main/styling/index.html)

#### 外観モードにあわせてスクロールバーの配色を変更する

OSの配色を選択できる外観モードには、一般的にはライトモードとダークモードが提供されています。外観モードの配色には、スクロールバーの配色も提供されています。

HTML/CSSでは、metaタグの`color-scheme`を指定することで、OSの設定にあわせたブラウザの配色を利用できます。外観モードをダークにした状態で`color-scheme`を指定すると、スクロールバーは黒ベースな配色に変更されます。

コードは以下のように記述します。

```
<meta name="color-scheme" content="light dark" />
```

▼Windows: ダークモードの配色が指定されたスクロールバー

![](https://ics.media/entry/230206/images/230214_dark_mode_scrollbar_win.png)

▼macOS: ダークモードの配色が指定されたスクロールバー

![](https://ics.media/entry/230206/images/230214_dark_mode_scrollbar_mac.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230206_scrollbar_tips/scrollbar-gutter-property/)
-   [コードを確認する](https://github.com/ics-creative/230206_scrollbar_tips/blob/main/scrollbar-gutter-property/index.html)

また、metaタグの`color-scheme`に`dark`とだけ指定すれば、OSの設定にかかわらず黒い配色のスクロールバーを指定できます。もし暗めのスクロールバーの表示が望ましければ、検討してみてもいいでしょう。

```
<meta name="color-scheme" content="dark" />
```

color-schemeの詳細は、MDNのドキュメントを参照ください。

-   [MDN - 標準メタデータ名](https://developer.mozilla.org/ja/docs/Web/HTML/Element/meta/name)

### まとめ

スクロールバーの簡単な説明と、よくある問題と対処法について紹介しました。紹介した問題は、オーバーレイスクロールバーでは発生せず、クラシックスクロールバーで起こります。Windows環境ではクラシックスクロールバーが通常は表示されるので、HTML制作時にはWindowsもケアできるように意識しましょう。

### 参考サイト

-   [W3C - Overflow Module Level 3](https://www.w3.org/TR/css-overflow-3/)
-   [Hail2u - meta要素のname=color-schemeについて](https://hail2u.net/blog/meta-name-color-scheme.html)