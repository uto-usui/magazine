---
title: "CSS Grid Layoutをガッツリ使った所感"
source: "https://ics.media/entry/17403/"
publishedDate: "2017-04-14"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

[CSS Grid Layout Module](https://ics.media/entry/15649/)はレイアウトを構築できる新しいCSSの仕様です。従来は`float`やFlexbox( `display: flex` )で対応していたようなレイアウトを効率的に構築できます。

この記事では、**CSS Grid Layoutをガシガシ使ってどうだったのか？**をお伝えします。

### Grid Layoutで作ったサイト

2017年4月にリニューアルした私の個人プロジェクト「[Beautifl - Flash Gallery🌈](https://beautifl.net/)」でGrid Layoutを採用しました。一般公開されている事例でCSS Grid Layoutを使っているサイトを見かけないので、ベンチマークとして見てもらえたら幸いです。

![Beautifl - Flash Gallery](https://ics.media/entry/17403/images/170414_grid_beautifl.png)

※[Beautifl - Flash Gallery](https://beautifl.net/)は2009年に公開したサイト🌏。従来はIE 7対応をベースに構築してましたが、リニューアルでは脱jQuery🌀の方針のもと、[Vue.js](https://ja.vuejs.org/)やCSS Grid Layoutを導入。WAI-ARIAや部分的にHTTP/2対応もしてます。

### CSS Grid Layoutの所感

#### CSS Grid Layoutの良かった点

-   `float`やFlexboxだとDOMが入れ子構造となりがちだが、CSS Grid Layoutだと入れ子構造を使わずに構築できる
-   DOM構造の自由度が上がるので、モバイル・デスクトップのレスポンシブに対応しやすい
-   動的に画面が変化するSPA(Single Page Application)の構築が楽になる

Beautiflのサイトはいろんなレイアウトに変化しますがCSS Grid Layoutが役立ちました。

#### CSS Grid Layoutの困った点

-   最新ブラウザしか使えない
-   IEとEdgeは古い仕様で実装されているので、工夫が必要
-   検索エンジンのインデックス収集に支障ないか不安
-   Polyfillはイマイチ信用できない
-   レイアウトの切り替わりにアニメーションを付けられない

CSS Grid Layoutは便利なので、SPAなど必要な場面でもっと普及して欲しいと思っています💭 しかし、古いブラウザ、とくにIE 11の存在はビジネス🏢としてやってる立場では無視できません。 Internet Explorer 11はウェブ業界の足かせと思っているコーダーは多いでしょうが、記事「[各Windows OSでのInternet Explorerのサポート終了時期 - ＠IT](http://www.atmarkit.co.jp/ait/articles/1503/11/news134.html)」によると**IE 11は2025年まで生き延びている**はずです💀

ただ実は古い仕様とはいえ、IEがCSS Grid Layoutに対応しているのは救いです😇

### 背景

一般的なサイトでは動作対象ブラウザを「IE 11以上、Chrome最新版、Firefox最新版」としているサイトも多いでしょう。IEとEdgeが先行して実装してていたおかげで、比較的導入しやすい土台が揃っています。

![](https://ics.media/entry/17403/images/180306_css_grid_layout_caniuse.png)

CSS Grid Layoutを利用できるブラウザの最低バージョン

-   Firefox 52 （2017年3月）
-   Safari 10.1 （2017年3月）
-   iOS Safari 10.3 （2017年3月）
-   Internet Explorer 10 （2012年9月）
-   Edge 12 （2015年1月）

### CSS Grid Layoutで困った点を紹介

#### シンプルな例でクロスブラウザ対応を考える

まずはCSS Grid Layoutの説明。CSS Grid Layoutでは、レイアウトを格子状に考えます。どの格子に要素を割り当てるか、という考え方で使います。

まずはレイアウトを区切ります。

![](https://ics.media/entry/17403/images/170414_grid_graff_01.png)

CSSでは次のように書きます。`1fr`という単位は可変するところに指定します。

```
.my-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 50px 1fr 50px;
}
```

ヘッダーやサイドバー、メインコンテンツ、フッターの4要素を割り当てます。

![](https://ics.media/entry/17403/images/170414_grid_graff_02.png)

CSSでは次のように指定します。

```
header {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 1;
}

aside {
  grid-column: 1;
  grid-row-start: 2;
  grid-row-end: 4;
}

main {
  grid-column: 2;
  grid-row: 2;
}

footer {
  grid-column: 2;
  grid-row: 3;
}
```

次のURLでサンプルを公開しているので、アクセスしてみてください。

-   [標準仕様のみ対応版のデモをブラウザで表示する](https://ics-creative.github.io/170414_css_grid/dist/1.html)

ChromeやSafari、Firefoxなど最新のブラウザーでは期待通りに表示されています。

![](https://ics.media/entry/17403/images/170414_grid_sample_01_modern.png)

これでめでたく完成。と思いきやIE 11やEdge 15で見てみましょう。

![](https://ics.media/entry/17403/images/170414_grid_sample_01.png)

はい、全滅ですね🙅

#### IEとEdgeを対応させる

IE 11〜Edge 15ではベンダープレフィックスが必要です。Edge 16はベンダープレフィックスは不要でChromeやFirefoxと同じ最新仕様のCSSで動作します。次はコードの一部ですが、`-ms-`を付与したCSSのコードです。

```
.my-grid {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 200px 1fr;
  grid-template-columns: 200px 1fr;
  -ms-grid-rows: 50px 1fr 50px;
  grid-template-rows: 50px 1fr 50px;
}
header {
  -ms-grid-column: 1;
  grid-column-start: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row: 1;
}
```

さぁ、これでIE 11やEdge 15で見てみます。

-   [ベンダープレフィックス付与版をブラウザで表示する](https://ics-creative.github.io/170414_css_grid/dist/2.html)

![](https://ics.media/entry/17403/images/170414_grid_sample_02.png)

まだ微妙・・・😝 ヘッダーが横一行になっていなかったり、サイドバーが行二列に突き抜けていません。背景の赤色が見えています。

#### ベンダープレフィックスを付けるだけでは十分とは言えない

実はIE 11〜Edge 15はCSS Grid Layoutが使えるとは言え、古い仕様（[Grid Layout | W3C Working Draft 7 April 2011](https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/)）でブラウザに実装されています。標準のCSS Grid Layoutと古い仕様では次のような違いがあります

-   使えるプロパティが少ない
-   片方にはあって、片方にない仕様がある
    -   詳しくは「[Should I try to use the IE implementation of CSS Grid Layout?](https://rachelandrew.co.uk/archives/2016/11/26/should-i-try-to-use-the-ie-implementation-of-css-grid-layout/)」によくまとまってる
    -   `grid-template-areas` が可読性があり、とても便利なのに、古い仕様には存在しない😖
        -   地道にcolumnやrowを数値指定するかない😥

レイアウト崩れの原因は行・列の結合部分に関する部分です。ここに古い仕様と標準仕様の違いがあります。

標準の仕様では、格子状の分割線①から③まで指定するという方法です。

```
header {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 1;
}
```

対してIE 11やEdge 15の仕様は①からセルをいくつ結合するかという指定です。

```
header {
  -ms-grid-column: 1;
  -ms-grid-column-span: 2; /* MS対策(手動) */
  -ms-grid-row: 1;
}
```

標準仕様では`grid-column-end`で、古い仕様は`-ms-grid-column-span`で、仕様自体が異なっています。ここは自分でコードを書き足して対応します。

```
header {
  -ms-grid-column: 1;
  grid-column-start: 1;
  grid-column-end: 3;
  -ms-grid-column-span: 2; /* MS対策(手動) */
  -ms-grid-row: 1;
  grid-row: 1;
}
```

-   [IEとEdgeの対応コード追加をブラウザで表示する](https://ics-creative.github.io/170414_css_grid/dist/3.html)

やっと、期待通りに表示できるようになりました🙆

![](https://ics.media/entry/17403/images/170414_grid_sample_03.png)

#### Autoprefixerの機能で自動対応するのがオススメ

ベンダープレフィックスを手動で付与するのは人類がなすべきことではありません。Autoprefixerという文明の利器を使いましょう。Autoprefixerは記事「[webpack入門：PostCSS(Autoprefixerやcssnano)を使う方法](https://ics.media/entry/17376/#postcss-autoprefixer)」が参考になります。

Autoprefixer（バージョン8）はベンダープレフィックスを付与するだけでなく、IEの旧仕様をエミュレートする機能が備わっています。`grid-template-areas`など**IE11で本来は利用できないプロパティでも、互換性のあるコードに変換してくれます**。この機能はデフォルトでは無効になっているので、オプションで`grid: true`と指定し有効化します。

```
autoprefilxer({ grid: true });
```

完成品のサンプルはこちらになります。

-   [完成品のサンプルをブラウザで表示する](https://ics-creative.github.io/170414_css_grid/dist/)

ソースコードはGitHubで公開しているので、よかったら使ってくださいませ。npmなどコマンドラインが必要になるので、そういうのが得意なフロントエンドエンジニアの向けです😎

[https://github.com/ics-creative/170414\_css\_grid](https://github.com/ics-creative/170414_css_grid)

### 検索エンジンのインデックス収集に支障がないか不安

IE 11、Edge 15まで含めさまざまなブラウザに対応できたので安心してましたが、落とし穴がありました💥 検索エンジンでインデックスされるように、[Google Search Console](https://www.google.com/webmasters/tools/home?hl=ja)のFetch as Googleに送信すると・・・

![](https://ics.media/entry/17403/images/170414_grid_google-search-console.png)

CSS Grid Layoutを使った部分が解釈されずレンダリングされてしまいました😜 **検索エンジンにはレイアウトが崩れたまま解析されてそうで、不安が大いに残ります**。2018年3月現在もFetch as Googleのキャプチャーは改善されておらず、一年間運用した結果からいうと、検索流入が低いままでした。CSS Grid Layoutだから低いのか、コンテンツの性質上の理由で検索流入が低いのか判断つきませんが、参考までに。

#### 追記：検索エンジンがCSS Gridに対応しました

2019年5月にGooglebotがChrome 74相当のブラウザエンジンになったと発表されました（参照『[The new evergreen Googlebot - Official Google Webmaster Central Blog](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)』）。このアップデートにより、CSS Gridも問題なく検索エンジンでレンダリングされるようになっています。

![](https://ics.media/entry/17403/images/images/190508_grid-google-search-console.png)

#### あてにならないPolyfill

Polyfillを探して実験的に試しました。試したのはGitHubで公開されている次のリンクのものです。

-   [css-grid-polyfill](https://github.com/FremyCompany/css-grid-polyfill)

Polyfillを入れるとJavaScriptによって一応CSS Grid Layoutが解釈されるようになります。が、次のような課題がありました🆖

-   `id`属性が付与されまくる
-   `overflow`の解釈・スクロールバーの発生有無が想定と異なった
-   CSS Grid Layoutとはあまり関係ない部分のレイアウトが崩れた
-   PolyfillのJSライブラリの容量がでかい（78 KB）
-   IE 11とEdge 15にも、Polyfillが効いてしまう（エンバグが発生）

じっくり取り組んだり、他のPolyfillを探せば解決できたかもしれません。ただ、Polyfillを使わず、最新のブラウザが普及するのを待つ方が本質的だと考え、採用を見送りました。

### まとめ

CSS Grid Layoutが利用できる最新ブラウザが十分に浸透するまで数ヶ月かかりますが、採用するサイトは今後増えてくるでしょう。DOMの要素の順番や親子構造とレイアウトを分離できるのがCSS Grid Layoutの利点なので、適材適所として選択肢のひとつに入れておくといいでしょう📕

冒頭で紹介した「[Beautifl - Flash Gallery](https://beautifl.net/)」には技術的に新しく取り組んだ箇所が他にもあります。リニューアルの話は続編記事「[脱jQueryのためにしたこと](https://ics.media/entry/17451/)」へと続きます。