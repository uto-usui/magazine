---
title: "最適なCSSの横並びはどっち!? Flexboxとfloatのパフォーマンス比較"
source: "https://ics.media/entry/11459/"
publishedDate: "2016-04-04"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ボックス要素の横並びをCSSで行う場合、皆さんはどうしていますか？　従来知られている`float`プロパティを使った方法の他に、CSS3から「Flexbox」を使用する方法も選択肢として加わりました。では、**Flexboxとfloatはどちらの方が処理速度が早いのでしょうか？** 本記事ではこの2つをパフォーマンス面から比較し、最適なボックスレイアウト手法について検証します。

![](https://ics.media/entry/11459/images/160330_flexbox_float_timline_example.png)

### Flexboxとは？

Flexbox(CSS Flexible Box Layout Module)は、floatに代わる新しいボックスレイアウト方法。**横並びはもちろん、ボックスを均等位置に配置したり、整列や中央揃えなど、柔軟なレイアウトが可能**です。今やすべてのモダンブラウザーで使用することができ（※1）、[Bootstrap 4](http://v4-alpha.getbootstrap.com/)の新たなレイアウト方法として採用される（※2）等、次世代の標準となっていくであろう技術です。

※1 Flexboxは現在すべてのモダンブラウザーで使用可能（参考記事「[Can I use Flexbox](http://caniuse.com/#search=flexbox)」)。現在はW3Cで仕様策定段階（参考記事「[Flexboxの仕様って勧告に至ってないけど使っていいの？迷ったのでW3Cの仕様策定プロセスを読んでみた – Rriver](http://parashuto.com/rriver/others/w3c-technical-report-dev-process)」)。  
※2 Bootstrap 4ではレイアウト方法の1つとしてFlexboxを選択可能（参考記事「[Flexbox · Bootstrap](http://v4-alpha.getbootstrap.com/getting-started/flexbox/)」）。

### パフォーマンス測定方法

ウェブページを表示した時のパフォーマンスと、ボックスの横並びレイアウトを適応した時と解除した時のパフォーマンス、それぞれFlexboxとfloatでどれくらいの差があるかを検証しました。検証に用いたブラウザーとツールは下記です。

OS

ブラウザー

検証手段

macOS

Google Chrome 49

デベロッパーツール

macOS

Firefox 45

開発ツール

macOS

Safari 9

Webインスペクター

Windows 10

Microsoft Edge 20

F12 開発者ツール

Windows 10

Internet Explorer 11

F12 開発者ツール

### ページを表示した時のパフォーマンス比較

ページを表示した時、Flexboxとfloatにパフォーマンスの違いがあるかどうかを検証しました。検証に用いたのは、`<li>`要素を縦と横に100個ずつ並べ、合計1万個の要素が配置されたHTMLページです。それぞれCSSを用いてボーダーのスタイルを設定していますが、一方はFlexboxを使って横並び、もう一方はfloatを使って横ならびにしています。

-   [Flexboxの検証ページ](http://ics-creative.github.io/160330_flexbox_float/flexbox_onload.html)
-   [floatの検証ページ](http://ics-creative.github.io/160330_flexbox_float/float_onload.html)

```
/* Flexboxで横並び */
ul {
  display: flex;
}
```

▲ Flexbox版：横並び部分のCSSコード

```
/* floatで横並び */
ul li {
  float: left;
}
```

▲ float版：横並び部分のCSSコード

![](https://ics.media/entry/11459/images/160330_flexbox_float_test_page.png)

▲ テストに用いたウェブページ。`<li>`要素が1万個並んでいる。

#### ページ表示時のパフォーマンスはFlexboxの方がよい

各ブラウザーで10回検証し、処理時間の平均値をグラフ化したのが下図です。短い時間であるほど高速な処理であることを示します。**FirefoxではFlexboxが275%高速で、他のブラウザーについてはFlexboxの方がやや早い**結果となりました。

![](https://ics.media/entry/11459/images/160330_flexbox_float_onload_summary.png)

▲ クリックで拡大されます。

ブラウザ

Flexbox 平均値（ミリ秒）

float 平均値（ミリ秒）

floatに対するFlexboxの速度

Google Chrome

150.5

161.6

107%高速

Firefox

274.6

523.6

191%高速

Safari

166.0

174.6

105%高速

Microsoft Edge

732.4

771.8

105%高速

Internet Explorer

784.0

916.2

116%高速

### 横並びの有無を切り替えた時のパフォーマンス比較

レスポンシブなレイアウトでは、ブラウザーの幅によって各々の要素が横ならびになったり縦ならびになったりします。このように横並びのあり・なしを切り替える場合、Flexboxとfloatにパフォーマンスの違いがあるかどうかを検証しました。検証に用いるのは、前ページの速度検証で用いたHTMLを改修したものです。

-   [Flexboxの検証ページ](http://ics-creative.github.io/160330_flexbox_float/flexbox_onresize.html)
-   [floatの検証ページ](http://ics-creative.github.io/160330_flexbox_float/float_onresize.html)

これらのHTMLでは、3秒ごとに`<body>`タグに`no-side`クラスが付与され、`<li>`要素の横並びが解除されます。横並びありから横並びなしへ切り替えた場合（下図①）と、横並びなしから横並びありへ切り替えた場合（下図②）の両方についてパフォーマンスを検証しました。

![](https://ics.media/entry/11459/images/160330_flexbox_float_no-side.png)

```
/* 通常時はFlexboxで横並び */
ul {
  display: flex;
}

/* bodyにno-sideクラスが付与された場合は横並びを解除 */
body.no-side ul {
  display: block;
}
```

▲ Flexbox版：横並びの切り替えを行うCSS

```
/* 通常時はfloatで横並び */
ul li {
  float: left;
}

/* bodyにno-sideクラスが付与された場合は横並びを解除 */
body.no-side li {
  float: none;
}
```

▲ float版：横並びの切り替えを行うCSS

#### 横並びあり→なしの時はFlexboxの方が高速

横並びありから横並びなしへ切り替えた場合（上図①）のFlexboxとfloatのパフォーマンス比較です。各ブラウザーで10回検証し、処理時間の平均値をグラフ化しています。この場合、**すべてのブラウザーでFlexboxの方がよいパフォーマンス**となりました。とくにGoogle Chrome、Firefox、Safariについてはそれぞれ200%〜400%も高いパフォーマンスとなりました。

![](https://ics.media/entry/11459/images/160330_flexbox_float_onresize_summary_1.png)

▲ クリックで拡大されます。

ブラウザ

Flexbox  
平均値（ミリ秒）

float  
平均値（ミリ秒）

floatに対する  
Flexboxの速度

Google Chrome

80.4

251.6

313%高速

Firefox

50.2

197.4

393%高速

Safari

56.6

136.0

222%高速

Microsoft Edge

540.0

631.7

117%高速

Internet Explorer

425.0

520.0

122%高速

#### 横並びなし→ありの時もFlexboxの方が高速

横並びなしから横並びありへ切り替えた場合（上図②）のFlexboxとfloatのパフォーマンス比較です。各ブラウザーで10回検証し、処理時間の平均値をグラフ化しています。この場合、**Microsoft Edgeを除くブラウザーでFlexboxの方がよいパフォーマンス**となりました。

![](https://ics.media/entry/11459/images/160330_flexbox_float_onresize_summary_2.png)

▲ クリックで拡大されます。

ブラウザ

Flexbox  
平均値（ミリ秒）

float  
平均値（ミリ秒）

floatに対する  
Flexboxの速度

Google Chrome

90.4

265.6

292%高速

Firefox

61.5

205.0

333%高速

Safari

83.9

135.9

161%高速

Microsoft Edge

631.6

632.2

（ほぼ同じ）

Internet Explorer

503.6

573.4

113%高速

#### パフォーマンスの差はHTML要素の位置決定処理にある

横並びの切替時にFlexboxとfloatでパフォーマンスの差が大きく出ましたが、その差は何なのでしょうか？　Google Chromeのデベロッパーツールを用いて各処理の所要時間を計測してみたところ、「Rendering」（HTMLの各要素の位置決定処理）の差が一番大きいことがわかりました。

![](https://ics.media/entry/11459/images/160330_flexbox_float_onresize_reason.png)

-   Scripting：JavaScriptの実行
-   Rendering：HTMLの各要素の位置決定処理
-   Painting：画面への描画

### Flexboxはfloatよりも高速だった

これまでの結果をまとめた表が次です。**Flexboxの方がfloatよりも総合的にパフォーマンスが良く、高速な処理である**ことがわかりました。

検証方法

floatに対する  
Flexboxの速度

ページ表示時

**105〜191%高速**

横並びあり→なし

**117〜393%高速**

横並びなし→あり

**100〜333%高速**

今回は1万個の要素で検証したため、実際のウェブページではここまでの差は出ません。とは言え、実際の案件では横並びや入れ子を多用する場合が多いでしょう。塵も積もれば山となりますので、**ボックスの横ならびにはFlexboxを使用した方がパフォーマンスの面では適していると言える**のではないでしょうか。floatを使うのは文章の回り込みが必要な場合のみにし、ボックスのレイアウトにはFlexboxを使うべき時代になっているのかもしれません。