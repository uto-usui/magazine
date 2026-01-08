---
title: "CSSで文節の折り返しを！ br・wbrとauto-phraseの活用術"
source: "https://ics.media/entry/241105/"
publishedDate: "2024-11-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2024年11月6日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

ウェブでのテキストの折り返しは、HTMLコーダーにとって意外と難しい分野です。多様な画面サイズが存在する現代では、適切なテキストの折り返しについて悩むことが少なくありません。

この記事で紹介する折り返しとは、以下のようなテキストの区切りの良い場所で改行するかどうかです。

▼固定幅で折り返し

```
どこで生れたかとんと見当がつかぬ。何で
も薄暗いじめじめした所でニャーニャー泣
いていた事だけは記憶している。
```

▼文節での折り返し

```
どこで生れたかとんと見当がつかぬ。
何でも薄暗いじめじめした所で
ニャーニャー泣いていた事だけは記憶している。
```

本記事では、HTMLコーディングにおいて改行・折り返し方法の選択肢を整理し、最適な方法について考察します。

この記事で紹介すること

-   `<br />`と`<wbr />`タグを使った改行指定
-   CSSの`word-break: auto-phrase`を使った自動折り返し
-   JSライブラリBudouXを使った自動折り返し

前回の記事『[文章の折り返し指定のCSS最新版](https://ics.media/entry/240411/)』では日本語の**行末の**折り返し対策を説明していますが、本記事は**文節での**折り返しについて焦点をあてています。

### 文節の折り返しはどこに必要か

テキストの行末の折り返しを調整した方が良いかどうかは、ケースバイケースです。主に望ましいとされるのが、サイトのタイトルや見出しです。適切な折り返しにすることで、**短い文言をキャッチーにみせ、内容を瞬間的に伝えやすくなります**。また、**タイポグラフィーとしての美しさも向上**するため、サイトとしての品位も向上します。

本文に適用するかどうかは、デザインやコンテンツの性質によります。たとえば、ニュース記事やブログなどの情報を提供するコンテンツでは、文節で折り返すと逆に読みづらくなることもあります。

### ウェブでの折り返しの難しさ

スマートフォン、タブレット、パソコンなど幅の異なるデバイスが多種多様に存在します。レスポンシブウェブデザインでは、**行内の文字数はデバイス環境によって変化します**。パソコンでは最適な折り返し位置だったとしても、別のデバイスでは折り返し位置がずれることがあります。

![](https://ics.media/entry/241105/images/images/241105_responsive.png)

そういった事情で、HTMLコーダーにとって、折り返し位置の最適化はムダな作業と思う方もいることでしょう。

しかし、エンドユーザーにとってみれば、実装事情がどうであれ、自分が使っているデバイスで「読みにくい」と気になるものです。さらに、日常的に紙媒体などのグラフィックデザインを通して美しい文字の折り返しに慣れている方も多いのでしょう。デザイナーをはじめ**ウェブ業界内でもテキストの折り返しにこだわる方が少なくない**と経験的に感じます。

テキストの折り返しは文言変更といった些細な作業と思われがちですが、案外と緻密な修正が必要となります。HTMLコーダーとデザイナーが分業している制作環境では、HTMLコーダーが折り返し位置を判断するのが難しい場面が少なくありません。文章の入稿には、ライターやデザイナーも折り返しの指定も考えておくとよいでしょう。

### 改行タグで強制的に折り返し

オーソドックスな手法として、`<br />`タグで改行ができます。

```
吾輩は猫である。名前はまだ無い。<br />
どこで生れたかとんと見当がつかぬ。
```

デバイスによって改行したい文章の位置が異なる場合は、メディアクエリーを併用します。メディアクエリーとCSSの`display`属性を組み合わせれば、特定のデバイスでのみ`<br />`を無効にする、といった調整が可能です。少しコードを見てみましょう。`display: none;`を指定したCSSクラスを用意します。

```
/* モバイル幅では改行を無効化 */
@media (640px < width) {
  .only-mobile {
    display: none;
  }
}
```

HTMLでは上記のCSSクラスを利用して、改行位置を指定します。

```
吾輩は猫である。名前はまだ無い。<br class="only-mobile" />
どこで生れたかとんと見当がつかぬ。<br />
何でも薄暗いじめじめした所で<br class="only-mobile" />
ニャーニャー泣いていた事だけは記憶している。<br  />
吾輩はここで始めて人間というものを見た。
```

このようにして、スマートフォンの幅の狭いブラウザでは行内で少ない文字数で折り返すようにし、より広い画面幅のパソコンでは行内の改行を少なくするといった調整が可能です。

![](https://ics.media/entry/241105/images/images/241105_br.png)

作例を掲載しますので、幅を狭めて確認ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241105_word_break/br.html)
-   [コードを確認する](https://github.com/ics-creative/241105_word_break/blob/main/br.html)

※メディアクエリーで説明しましたが、最近では[コンテナークエリー](https://ics.media/entry/240617/)を指定して改行位置を制御するのもいいでしょう。

### 改行してもいいよ、を指定するwbrタグ

`<br />`タグは改行を行う指定でしたが、`<wbr />`タグは「ここで改行してもいいよ」という指示を与えるものです。ブラウザは`<wbr />`タグを参考にして、折り返しが必要になったところの`<wbr />`タグで折り返します。

```
<p class="example">ジョバンニは、<wbr />口笛を吹いているような<wbr />さびしい口付きで、<wbr />･･･（省略）</p>
```

▼ CSSで`keep-all`を指定

```
.example {
  /* CJKテキストでの折り返しを無効化 */
  word-break: keep-all;

  /* 長い単語でも折り返し可能に */
  overflow-wrap: anywhere;
}
```

![](https://ics.media/entry/241105/images/images/241104_wbr_response.gif)

`<wbr />`タグを有効にするには親要素に以下のいずれかのスタイルを指定します。折り返しを無効にしていないと、`<wbr />`タグは効果が得られないためです。

-   `word-break: keep-all`で、テキストでの折り返しを無効にする  
    （読点や句点、カギ括弧などで折り返しは可能）
-   `white-space: nowrap`で折り返しを完全に無効にする

オススメは`word-break: keep-all`です。ただ、`keep-all`は一部の文字を除いて折り返しできないため、これだけでは不十分です。URLなど長い英単語では折り返せずレイアウトが崩れる可能性があります。`overflow-wrap: anywhere`を併用することで対策します。

作例は次の通りです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241105_word_break/wbr.html)
-   [コードを確認する](https://github.com/ics-creative/241105_word_break/blob/main/wbr.html)

### インラインブロック化して対応

CSSでインラインブロック`display: inline-block`でも折り返し位置を指定できます。たとえば`<span>`タグを使って文節をインラインブロック化すると、`<span>`タグで囲った範囲が折り返しできなくなり、`<span>`タグの**隙間（意図した場所）だけでの折り返しが可能**になります。

```
<p class="example">
  <span>ジョバンニは、</span><span>口笛を吹いているような</span>
  <span>さびしい口付きで、</span>（…省略）
  <span>まわって</span><span>来るのでした。</span>
</p>
```

```
.example span { 
  display: inline-block;
}
/* 説明の便宜上、spanに直接スタイルを当てていますが、状況に応じてCSSクラス名を与えましょう */
```

作例は次の通りです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241105_word_break/inline-block.html)
-   [コードを確認する](https://github.com/ics-creative/241105_word_break/blob/main/inline-block.html)

インラインブロック化する方法は、「ここで改行してもいいよ」を指定するので、手法としては`<wbr />`タグと似ています。

ここまで紹介した`<br />`と`<wbr />`タグと`inline-block`を利用する方法はハードコーディングに近いです。静的コンテンツには有効ですが、**動的なコンテンツには現実的ではありません**。たとえば、ブログのような入稿するようなサービスでは、ユーザーが折り返し位置を指定することは運用上、難しいことも考えられます。そこで新しい解決方法を紹介します。

### 自動的に折り返しを行うCSSプロパティー

新しい手法として、CSSの`word-break: auto-phrase`（オート・フレーズ）プロパティーがあります。`auto-phrase`を利用すると、ブラウザが自動的に文節の適切な位置で折り返しを行います。CSSによって折り返しが自動的に行われるので、HTMLコーディングの手間が減り、レスポンシブに対応しやすくなります。

`auto-phrase`を使うには、日本語であることを明示するため、HTMLに`lang="ja"`属性を指定する必要があります。

作例としてのコードを示します。

```
<html lang="ja">
<head>
  <style>
    .example {
       word-break: auto-phrase;
    }
  </style>
</head>
<body>
  <p class="example">ジョバンニは、口笛を吹いているようなさびしい口付きで、･･･（省略）</p>
</body>
</html>
```

`auto-phrase`の有効有無を切り替えて比較してみました。CSSひとつで文節の折り返しが有効になっていることがわかります。

![](https://ics.media/entry/241105/images/images/241105_auto_phrase_screenshot.gif)

`auto-phrase`は、機械学習によって得られた学習データをもとに、自然な折り返し位置を判断します。静的な`<br />`と`<wbr />`タグと`inline-block`を利用する方法に比べて、手間がかからず、HTML上のコードに不要なタグを追加しないですみます。

作例は次の通りです。ChromeやEdgeで表示してみましょう。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241105_word_break/auto-phrase.html)
-   [コードを確認する](https://github.com/ics-creative/241105_word_break/blob/main/auto-phrase.html)

注意点として、`auto-phrase`は完璧でなく、ときおり意図しない位置で折り返しが行われることがあります。また、利用可能なブラウザはChromeとEdgeのみであることも認識しておきたい点です。

### JavaScriptライブラリ「BudouX」

`word-break: auto-phrase`が未対応のブラウザでも、JavaScriptライブラリの「[BudouX](https://github.com/google/budoux)」を導入すれば、自動折り返しの効果を得られます。先に紹介した`auto-phrase`は実はBudouXをもとに、ChromiumがCSSで利用できるよう組み込んだものです（[参照](https://chromestatus.com/feature/5133892532568064)）。そのためBudouXは`auto-phrase`と同等の効果が得られます。BudouXは20KB程度の軽量なライブラリで、文章を解析し、自動的に文節での折り返しを適用します。

SafariやFirefoxなど`auto-phrase`が未サポートのブラウザでも、BudouXを使うことで一貫した折り返しが実現できます。

▼いずれのブラウザも表示が同じ

![](https://ics.media/entry/241105/images/images/241105_budoux_browser.png)

詳しくは次の記事を参照ください。

-   『[Google Developers Japan: BudouX: 読みやすい改行のための軽量な分かち書き器](https://developers-jp.googleblog.com/2023/09/budoux-adobe.html)』

導入方法はいくつか種類があり、いずれも簡単に導入できます。

-   NPMでのインストール
-   CDNから導入
-   Web Componentsでの導入

#### Web Componentsでの利用方法

HTMLコーディングとしては、Web Componentsとして導入するのがもっとも手軽です。`<script>`タグでJavaScriptライブラリを読み込み、`<budoux-ja>`タグ内に文章を記載するだけです。

```
<!-- CDNからライブラリを導入 -->
<script src="https://unpkg.com/budoux/bundle/budoux-ja.min.js"></script>

<!-- budoux-ja タグが利用できる -->
<budoux-ja>ジョバンニは、口笛を吹いているようなさびしい口付きで、･･･（省略）</budoux-ja>
```

作例は次の通りです。SafariやFirefoxでご確認ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241105_word_break/budoux-webcomponent.html)
-   [コードを確認する](https://github.com/ics-creative/241105_word_break/blob/main/budoux-webcomponent.html)

※Web ComponentsとしてのBudouXの仕組みは、ゼロ幅スペース（ZWSP、`\u200b`、`&ZeroWidthSpace`）を区切り文字として、`word-break: keep-all`と`overflow-wrap: anywhere`を併用しています。見えない文字を使うことで、文節の折り返しを実現しています。

#### JavaScriptでの利用方法

BudouXをJavaScriptとして利用すると、文字列を配列化できます。`<br />`、`<wbr />`などカスタマイズして組み込みたい場合はJavaScriptから利用するのも有効です。

```
import { loadDefaultJapaneseParser } from "budoux";

const SENTENCE =
  "ジョバンニは、口笛を吹いているようなさびしい口付きで、檜のまっ黒にならんだ町の坂を下りて来たのでした。（省略）";

const parser = loadDefaultJapaneseParser();
const list = parser.parse(SENTENCE); 
// ["ジョバンニは、", "口笛を", "吹いているような", "さびしい", "口付きで、", /* 省略 */]
```

▼BudouXを使えば自由に組み込みが可能

![](https://ics.media/entry/241105/images/images/241105_budoux_custom.png)

作例は次の通りです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241105_word_break/budoux-cdn.html)
-   [コードを確認する](https://github.com/ics-creative/241105_word_break/blob/main/budoux-cdn.html)

### 事例

ICS MEDIAでは、2021年からBudouXを導入しています（[参照](https://x.com/clockmaker/status/1462759269627928578)）。記事のタイトル部分は視覚的な印象が強いので、適切に文節で折り返すように配慮しています。

![](https://ics.media/entry/241105/images/images/budoux_icsmedia_title.png)

また、2023年から`word-break: auto-phrase`を導入し（[参照](https://x.com/clockmaker/status/1732381370813669826)）、記事の見出し部分（`<h3>`や`<h4>`タグ）で活用しています。

精度の高い折り返しが必ずしも得られるとは限りませんが、未指定よりも読みやすさが向上する場合が多いように思います。ICS MEDIAの読者の多くはChromium系ブラウザを利用しているため（Chromeが73%、Edgeが8%）、`auto-phrase`による折り返しを体験されているはずです。

### auto-phraseの対象ブラウザ

Chrome 119・Edge 119（2023年10月リリース）以降で対応しています。

![](https://ics.media/entry/241105/images/images/auto_phrase_caniuse.png)

Safari Technology Preview 206（2024年10月）でもFeature Flagsで有効にできるので、いずれリリース版のSafariで使えるようになるかもしれません。

![](https://ics.media/entry/241105/images/images/auto_phrase_safari.png)

### まとめ

日本語のウェブデザインにおける文節での折り返し方法を説明しました。前回の記事『[文章の折り返し指定のCSS最新版](https://ics.media/entry/240411/)』とあわせて和文での折り返しの美しさの追求を感じていただければ幸いです。

筆者としては、文節の折り返しについては、以下の優先度で検討するのが良いと考えています。アイデアのひとつとして参考ください。

1.  文節での折り返しの必要性を関係者と確認
2.  文節の折り返しで機械的な対策が可能な場合
    1.  Chromium系ブラウザだけのサポートでOKならば、`word-break: auto-phrase;`を採用
    2.  クロスブラウザのサポートが必要であれば、BudouXを採用
3.  機械的な対策が難しい場合
    1.  小規模な対応であれば`<br />`タグによる改行で対策
    2.  こだわるなら`<wbr />`タグと`word-break: keep-all`と`overflow-wrap: anywhere`方式で対策