---
title: "ウェブ制作者のためのNoto Sans JP最新実装ガイド"
source: "https://ics.media/entry/250718/"
publishedDate: "2025-07-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

Notoファミリーは「すべての言語で文字化けのない世界」を掲げて開発されたフォント群です。通常のフォントでは、該当する文字（グリフ）が存在しない場合、代替として四角い記号が表示されます。この四角い記号は「□」のような形で表示され、見た目が豆腐のブロックに似ていることから「豆腐（Tofu）」と呼ばれています。そんな中、Notoファミリーは、豆腐のないフォント＝No Tofuを意味して「Noto」と命名されたことは有名なエピソードです。

「Noto Sans JP」は数多くのウェブで利用されています。今年4月のWindowsにもNoto Sans JPが搭載され大きな話題となりました。しかしNotoフォントは2014年の登場から11年以上経過し、複雑な状態になっているのも事実です。

-   Noto Sans JP、Noto Sans Japanese、Noto Sans CJK JPなどたくさんの名前がある
-   GoogleとAdobeでそれぞれフォント名が異なる
-   CSSの`font-feature-settings`プロパティーの可否が環境により異なる
-   Google Fonts由来のファイルサイズが読み込み速度の悪化の要因となる

この記事では2025年時点の事実を整理し解説します。

**この記事のゴール**

-   複数の種類があるNotoフォントの違いがわかるようになる
-   ウェブ制作で使うNotoフォントを特定できるようになる
-   古い知識をアップデートする

### NotoフォントのOSの搭載状況

それぞれのOSに搭載されているNotoフォントを説明します。

#### WindowsにはNoto Sans JPが標準搭載

2025年4月のWindows UpdateでNotoフォントが以下のように搭載されました。

Windows 11

Windows 10

Noto Sans JP

搭載

搭載

Noto Serif JP

搭載

未搭載

マイクロソフトは「**日中韓（CJK）環境のWebブラウジングでテキスト品質とユーザー体験を向上させる**」目的でNotoフォントを追加したと説明しています。Windows 10でNoto Serif JPだけが搭載されていないのは謎ですが……。

ChromeとEdgeでは、デフォルトフォントがNotoフォントになっており、`font-family: sans-serif`でNoto Sans JPが、Windows 11においては`font-family: serif`でNoto Serif JPがあたります。

Windows 11のOS内のfontsフォルダーにはファイルとして「`NotoSansJP-VF.ttf`」「`NotoSerifJP-VF.ttf`」が格納されています。ファイル名の「`-VF`」は「バリアブルフォント」を指します。

![](https://ics.media/entry/250718/images/images/250718_windows_note_ttf.jpg)

通常のアプリケーションからは「Thin」「Regular」「Black」など7種類のウェイトとして利用できます。

▼メモ帳

![](https://ics.media/entry/250718/images/images/250718_notosansjp_windows.gif)

従来のWindowsでは「メイリオ」、「游ゴシック」、「ＭＳ Ｐゴシック」といった癖や課題のある和文フォントが一般的でした。2018年に「BIZ UDゴシック」が搭載されましたが、残念ながらウェブ制作では注目されていません。そういった経緯もあり、Windowsで知名度のある「Noto Sans JP」が標準的に使えるようになったことは、ウェブの大きな躍進と筆者は評価しています。

#### AndroidではNoto Sans CJK JPが搭載

AndroidにはNoto Sans CJK JPが搭載されています。Android 15（2024年10月リリース）からバリアブルフォントとして搭載され、`font-weight`のバリエーションが豊かに表示できるようになりました。

なお、Android 6.0〜14までは、バリアブルでないNoto Sans CJK JPが採用されていました。1フォント1ウェイト（Regular）のみしか搭載されていなかったため、`font-weight: bold`ではソフトウェア上で疑似的に太字化されていました（太字が少し汚かった原因です）。記事『[Android 15で日本語フォントが大幅改善 #font - Qiita](https://qiita.com/yawamira/items/c197a3c91ff3f1123452)』が詳しいです。

Androidの注意点として、搭載されているのはNoto Sans CJK JPであるため、`font-family: "Noto Sans JP"`と指定しても適用されません。`font-family`にはフォールバックとして`sans-serif`を指定することが多いと思いますが、そのフォールバックに頼るのがよいでしょう。またAndroidは各メーカーがカスタマイズして導入しているため、必ずしもNoto Sans CJK JPが導入されているとも限りません（中国製Androidなど）。

#### AppleのOSには未搭載

iOS／iPadOS／macOSにはNotoの日本語フォントが存在しません。

また、Safariの挙動についても注意点があります。開発者がローカルでNotoフォントをインストールしていても、SafariはCSSの`local()`の参照を遮断するため、ユーザー環境では反映されません。プライバシー保護を目的とするWebKitの方針によるものです。

-   参照『[Tracking Prevention in WebKit | WebKit](https://webkit.org/tracking-prevention/#anti-fingerprinting)』

Apple系のOSで、Noto Sans JPを使いたい場合はウェブフォントに頼るしかありません。

余談ですが、macOSには「Noto Sans Javanese」というフォントが搭載されています。名前が「Japanese」に似ているので勘違いされがちですが、これはジャワ語（Ja**v**anese）のフォントです。[X](https://x.com/search?q=Noto%20Sans%20Javanese%20lang%3Aja&src=typed_query&f=top)でも「フォントの様子がおかしいなと思ったらNoto Sans Javaneseだった」「誤植と思った」といったポストを見かけます。

### ウェブフォントの状況

提供元や配信時期によって、Notoフォントの名前やブランドが異なります。ここではそれぞれのフォントの違いを整理します。

#### Google FontsのNoto Sans JP

Noto Sans JPの導入方法としてもっともメジャーなのが、Google Fontsでしょう。

-   [Noto Sans Japanese - Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+JP)

![](https://ics.media/entry/250718/images/images/250718_google_fonts_notosansjp.png)

Google Fontsで配信されているNoto Sans JPは2024年からバリアブルフォントになりました。詳細は記事『[次世代のフォント技術　バリアブルフォントの世界](https://ics.media/entry/201008/)』に譲りますが、バリアブルフォントは太さなど自在にカスタマイズできます。

![](https://ics.media/entry/250718/images/images/250717_google_font_variable.gif)

CSSでは`font-family: "Noto Sans JP"`と記述しますが、Google Fontsのウェブページでは「Noto Sans Japanese」と掲載されています。「Noto Sans JP」か「Noto Sans Japanese」のどちらの表記が正しいのか紛らわしいです。

![](https://ics.media/entry/250718/images/images/250718_google_fonts_noto_sans_jp_name.png)

Google Fontsでは、Unicode文字範囲の最適化によって配信容量がケアされています。通常、日本語フォントはJIS第1水準の漢字を含む完全版で1ウェイトあたりwoff2で1〜4MB程度の容量になります。Google Fontsの配信最適化の仕組みのおかげで必要な文字範囲のみが配信され、実際の転送量は大幅に削減されます。詳しくは『[高速で美しいウェブフォントを実現する API  |  Articles  |  web.dev](https://web.dev/articles/api-for-fast-beautiful-web-fonts?hl=ja)』を参照ください。

▼いまのGoogle Fontsは「`/css2`」というアドレスになっています

```
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap"
  rel="stylesheet"
/>
```

#### Google FontsのNoto Serif JP

Noto Serif JP（Noto Serif Japanese）は明朝体フォントです。仕組みはNoto Sans JPと同様です。

-   [Noto Serif Japanese - Google Fonts](https://fonts.google.com/noto/specimen/Noto+Serif+JP)

![](https://ics.media/entry/250718/images/images/250718_google_fonts_noto_serif_jp.png)

#### Google Fontsの旧Noto Sans Japanese（早期アクセス）

2014年〜2016年ごろの試験配布版として「Noto Sans Japanese」が提供されていました。この頃のフォント名は「Noto Sans Japanese」です。現行「Noto Sans Japanese（Noto Sans JP）」に対して、本記事では旧Noto Sans Japaneseと記載します。

当時の配信方法は、ウェブフォントをまるごとファイル（woff, woff2, eot）で配信してました。ウェブページの配信速度の観点からは、あまりオススメできません。もしお使いのウェブサイトが以下の指定になっているようであれば、新しい現行Noto Sans JPに見直すことをオススメします。

▼パスに「`earlyaccess`」が含まれているのが古い配信方法です

```
<link
  href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css"
  rel="stylesheet"
/>
```

#### Adobe FontsのNoto Sans CJK JP

Noto Sans CJK JPはGoogle FontsではWebフォントとしては提供されていません。Adobe Fontsで提供されていて、7ウェイト存在します。

-   [Noto Sans CJK JP | Adobe Fonts](https://fonts.adobe.com/fonts/noto-sans-cjk-jp)

なお、CJK（日中韓）フォントでは、HTMLの`lang`属性によって字形が変化します。

![](https://ics.media/entry/250718/images/images/250718_cjk_font.png)

#### Adobe Fontsの源ノ角ゴシック（Source Han Sans）

Adobeブランドで提供されているものが「源ノ角げんのかくゴシック（英名：Source Han Sans）」です。名前やウェイト表記を除いてNoto Sans JPと同じフォントです。そもそもが、源ノ角ゴシック／Noto Sans JPともにAdobeとGoogleとの共同開発であり、Adobeの西塚涼子さんらが中心となって作られたフォントです。

2014年に初版が公開され、2021年にバリアブルフォントも提供されました。

Adobe Fontsから複数の種類のフォントが提供されています。

-   [源ノ角ゴシック](https://fonts.adobe.com/fonts/source-han-sans-japanese) 7ウェイト
-   [源ノ角ゴシック - 日中韓 日本語](https://fonts.adobe.com/fonts/source-han-sans-cjk-japanese) 7ウェイト
-   [源ノ角ゴシックJP - 日本語 サブセット バリアブル](https://fonts.adobe.com/fonts/source-han-sans-jp-japanese-subset-variable)

![](https://ics.media/entry/250718/images/images/250718_adobe_fonts_sourcehansans.png)

#### Adobe Fontsの源ノ明朝（Source Han Serif）

「源氏げんじ」「源頼朝みなもとのよりとも」と空目しそうな名前ですが、「げんのみんちょう」と呼びます。こちらは明朝体で、仕組みは「源ノ角ゴシック」と同じです。2017年に初版が公開され、2021年にバリアブルフォントも提供されました。

-   [源ノ明朝 JP - 日本語サブセット](https://fonts.adobe.com/fonts/source-han-serif-japanese-subset)
-   [源ノ明朝 - 日中韓 日本語](https://fonts.adobe.com/fonts/source-han-serif-japanese)
-   [源ノ明朝 JP - 日本語 サブセット バリアブル](https://fonts.adobe.com/fonts/source-han-serif-japanese-subset-variable)

![](https://ics.media/entry/250718/images/images/250718_adobe_fonts_source_han_serif.png)

### Google Fontsを利用するときの注意点

ウェブ制作者にとって注意したいのは、マシンにあるにもかかわらずウェブフォントを配信してしまうことでしょう。

Google FontsからNoto Sans JPを読み込むと、否応なくウェブフォントが送信されます。Windowsに搭載されているにもかかわらず、です。手元にフォントがあるのに、ムダに通信容量がかさむ、といった具合です。

![](https://ics.media/entry/250718/images/images/250718_google_fonts_noto_sans_jp_windows.png)

モバイル回線では帯域を圧迫する要因となり、Lighthouseの性能スコアに悪影響が出やすくなります。

![](https://ics.media/entry/250718/images/images/250718_google_fonts_noto_sans_jp_lighthouse.png)

#### 回避方法

対策として、以下のCSSのコードで回避できます。WindowsではローカルのNoto Sans JPを、AndroidではNoto Sans CJK JPを読み込ませ、iOSなど別環境ではGoogle Fontsを読ませます。

ローカルのNoto Sans JPをカスタムフォント名として定義し、Google Fontsより優先させています。

```
<!-- Google Fonts の読み込み -->
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;900&display=swap"
  rel="stylesheet"
/>

<style>
  /* @font-face でローカルフォントを優先 */
  @font-face {
    font-family: 'Local Noto Sans JP';
    src: 
      local('Noto Sans JP'), /* Windows用 */
      local('Noto Sans CJK JP Regular') /* Android用 */;
  }

  body {
    font-family: "Local Noto Sans JP", "Noto Sans JP", sans-serif;
  }
</style>
```

### font-feature-settingsの利用可否

フォントにはOpenTypeの機能があります。カタカナなど字間のアキを詰めることで、タイポグラフィーとして美しく表示する、といったことができます。詳しくは記事『[文字詰めできるCSSのfont-feature-settingsが凄い！ 日本語フォントこそ指定したい自動カーニング](https://ics.media/entry/14087/)』をご覧ください。

![](https://ics.media/entry/250718/images/images/250718_font-feature-setings.png)

この`font-feature-settings`について、利用できる場合とそうでない場合があります。そのため、状況をまとめました。

フォント

`palt`

`pwid`

補足

Windows搭載のNoto Sans JP

〇

〇

フォントは2025年に搭載

Android搭載のNoto Sans CJK JP

〇

〇

Google FontsのNoto Sans JP

〇

×

2024年から`palt`が利用可能に

Adobe Fontsの源ノ角ゴシック

〇

〇

※`font-feature-settings: "pwid"`は`font-variant-east-asian: proportional-width`に相当します。詳しくは記事『[CSSのfont-variant活用術](https://ics.media/entry/250401/#font-variant-east-asian)』を参照ください。

### 結局、どうすればいい？

3つの案を提案します。

①配信速度より、表示の一貫性を重視するなら、Google FontsのNoto Sans JPから導入するのがいいでしょう。上記のWindowsでのフォント配信の課題はありますが、大胆に割り切って一律導入とすれば、考えることが減ります。

②サイトの表示速度を重視するなら、ウェブフォントを導入せず、`font-family: sans-serif;` と指定するだけで十分と言えます。これだけでWindowsとAndroidはNotoフォントでカバーできます。iOSやmacOSでは幸いにも美しいヒラギノ書体が存在するので、Noto Sans JPでなくても問題ないと判断してもいいでしょう。

唯一の懸念として、Windows Updateを行っていない利用者がいることです。企業や学校など特定環境では簡単にWindows Updateができないユーザーもいることでしょう。そういったマシン環境では、Noto Sans JPがまだ導入されていないはずです。配信開始から時間が経過したため普及が進んでいると思いますが、統計などで断言できないのが難しいところです。

③最後の提案として、Noto Sans JPを導入せず、無難な旧来方式の「メイリオ」主体のフォント指定をします。

-   [2025年に最適なfont-familyの書き方 - ICS MEDIA](https://ics.media/entry/200317/)

ユーザーは普段見慣れた字形が変わることに違和感を持つことが多いです。4月のWindows UpdateですらNoto Sans JPへフォントが変わったことで多くの不満の声がでたことも事実です……。

-   [Windows 10/11のパッチをあてたら、Webページのフォントが変わった？　戻し方はこれ - やじうまの杜 - 窓の杜](https://forest.watch.impress.co.jp/docs/serial/yajiuma/2006058.html)

### コラム： system-uiはNoto Sans JPがあたらない

総称フォントには`system-ui`があります。Windowsでは`system-ui`を指定すると、「Yu Gothics UI」（游ゴシックのUI書体）があたります。

```
body {
  font-family: system-ui;
}
```

![](https://ics.media/entry/250718/images/images/250718_system-ui.png)

先述のとおり游ゴシックは可読性に難があります（非Hi-DPIモニターでは文字がかすれる事象が知られています）。そのため、日本語環境では`system-ui`を指定しないほうが望ましいでしょう。

なお、海外のUIフレームワークやCSSのテンプレートでは、`system-ui`が指定されていることもあります。海外製のものは日本語環境を考慮されていないことが多いため、必ず確認するほうがいいでしょう。

▼例：[Vite](https://ja.vite.dev/)のテンプレート

```
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  /* …… */
}
```

上記の例だと、総称フォント`system-ui`と`sans-serif`が二重にかかっています。現在のブラウザ環境では`system-ui`はサポートするため、このフォールバック側の`sans-serif`は意味をなさない指定となります。

### まとめ

日本語のNotoフォントを整理しました。Windowsに標準搭載されたことのインパクトが大きく、今後のウェブでさらに利用が拡大していくはずです。さまざまなOS・ブラウザ環境の動向にキャッチアップしつつ、最適なフォント選定に取り組んでいきましょう。