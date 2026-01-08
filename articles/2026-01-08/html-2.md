---
title: "HTMLコーディングの人気のスタイルは？ アンケート結果から分析するイマドキのウェブ制作事情"
source: "https://ics.media/entry/17000/"
publishedDate: "2018-01-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ウェブ業界の当たり前だと思っていることでも、同業他社の人には違う常識があるかもしれません。自分が業界多数の傾向と違うところはどこなのか・・・ この連載ではアンケートデータから国内のウェブ業界の傾向を分析します。

連載第3回目となる本記事では**ウェブ業界の「HTMLコーディング」や「フロントエンド」を中心にアンケート結果を紹介します**。アンケートは筆者の[Twitter](https://x.com/clockmaker)から実施していたものです。

### CSSのレイアウトに使うのはFlexboxが多い

ウェブサイトの大枠レイアウトを組むときに一番使っているCSSの種類を質問しました。

727票の回答があり「float」が32%、**「Flexbox」が51%**、「Grid Layout」が11%、「table」が6%でした。

**Flexboxが最多となったのは、[未対応ブラウザ（例：IE9）](https://caniuse.com/#feat=flexbox)が無視できるシェアまで下がったことや、floatよりFlexboxのほうが利便性が高いことが背景にある**と思います。

2017年に主要ブラウザが一斉にGrid Layoutに対応しましたが、実際にGrid Layoutを利用している人は少ないままです。Grid LayoutはFlexboxやfloatと比べると対応ブラウザが限定的（かつ[IEへの対応方法に癖があり](https://ics.media/entry/17403/))で採用しにくいのかもしれません。

### IE11対応はいつまで続く？

Internet Explorer 11（略称：IE11）をいつまで対象ブラウザに含めることになりそうか質問しました。

62票の回答があり「2022〜2025年まで」が21%、**「2019〜2021年まで」が32%**、「2018年まで」が18%、「すでにサポート外にしている」が29%でした。

Windows 10の**IE 11は2025年までサポート期間となります**（参照「[一目で分かる、各Windows OSでのIEのサポート終了時期 - ＠IT](http://www.atmarkit.co.jp/ait/articles/1503/11/news134.html)」）。アンケート結果の通り、長期にわたってIE11と付き合うことになると考えている人は多いようです。

### ファイルパスの種類で多いのは？

HTMLのコーディングでもっとも利用する頻度が高いファイルパスを質問しました。img要素のsrc属性や、外部CSSやJSファイルへのパスの指定方法についてです。

545票の回答があり**「相対パス」が57%**、「絶対パス」が15%、「ルートパス」が28%でした。

それぞれに利点があるのでウェブサイトの方針によりけりでしょう。**相対パスはディレクトリの変更に強かったり、ローカルで確認できる**といった利点があります。

### San Franciscoフォントを使ってる？

フォントの種類に「-apple-system」（Safari用）や「BlinkMacSystemFont」（Chrome用）を指定すると、iOSやmacOSのブラウザで欧文に[San Franciscoフォント](https://developer.apple.com/fonts/)が適用されます。**San Franciscoフォントはsans-serif（iOSやmacOSではHelveticaとなる）に比べて小さいフォントサイズでも可読性が高いといった利点があります**。

256票の回答があり「指定している」が14%、「指定していない」が32%、**「-apple-systemをはじめて知った」が54%**でした。Windows/Androidユーザーにはあまり馴染みがなかったかもしれません。

![](https://ics.media/entry/17000/images/180111_apple-ststem_font.png)

割合としては14%と少なかったですが、**「読者に読みやすい字体で届けたい」とフォントを大事にしているHTMLコーダーは少なくない**でしょう。

### Sassのコンパイル

CSSのプリプロセッサのSass。柔軟かつ高度にスタイルシートを書けるので、CSSではなくSassを利用する人も多いでしょう。Sassのコンパイル方法にはさまざまな種類があるので、どれがメジャーであるか質問しました。

257票の回答があり「コマンドライン（Ruby）」が6%、「コマンドライン（Node.js）」が16%、**「タスクランナー（Gulp, Grunt等）」が60%**、「アプリケーション（Dw, WebStorm等）」が18%でした。

公式サイト「[sass-lang.com](https://sass-lang.com/)」やGoogle検索結果の上位の入門記事では、RubyでSassのインストール手順を解説されています。しかし、**現場ではGulpやnode-sass（LibSass）、最近はsass（DartSass）を使う場面が多く、入門方法と現場の使い方が異なってきています**。

少数派となったRuby Sassはセットアップの手順が多く、コンパイル速度が遅いといったデメリットがありますが、かつて人気だったCSSフレームワーク「[Compass](http://compass-style.org/)」が利用可能です。古い時代のサイトのメンテナンスのために利用しているケースもあるでしょう。

本サイトの記事「[絶対つまずかないGulp入門](https://ics.media/entry/3290/)」ではGulpとnode-sass（LibSass）を使う方法を、記事「[最新版で学ぶwebpack入門 - スタイルシート（CSSやSass）を取り込む方法](https://ics.media/entry/17376/)」ではwebpackとsass（DartSass）を使う方法で解説しています。

### JavaScriptで行末のセミコロンは不要？

最近はJavaScriptで行末にセミコロン ; を省略する流れがあります。JavaScriptで行末にセミコロンを書くか質問しました。

342票の回答があり**「セミコロンを付ける」が78%**、「セミコロンを付けない」が12%、「気にしない」が10%でした。

次の記事「[セミコロンは省略？人気スタイルガイドに学ぶJavaScriptのコーディング規則 - WPJ](https://www.webprofessional.jp/why-use-javascript-style-guide/)」では、セミコロンを省略するスタイルガイド「JavaScript Standard Style」が紹介されています。JSライブラリとして、[Vue.js](https://ja.vuejs.org/index.html)や[D3.js](https://d3js.org/)のサンプルでもセミコロンが省略されて書かれてます。

国内ではアンケートの結果のとおり、**セミコロンを付けることに根強い支持があります**。

### JSでのaddEventListener()の第三引数を使ってる？

JavaScriptのaddEventListener()メソッドには第三引数（useCapture）を指定できます。

```
window.addEventListener("DOMContentLoaded", init, false);
```

書籍やブログなどでfalseが指定されているのを見かけたことがあり、不思議に思ったことはありませんか？　実際にはどのくらい使われているのか質問しました。

163票の回答があり「いつも指定する （明示的にfalseを指定する）」が20%、**「普段は指定しない （必要なときだけ指定する）」が43%**、「気にしたことがない」が37%でした。

addEventListenerの第三引数でfalseを明示的に指定されているのは、昔のブラウザの仕様（Firefox 6以前は必須）だったからでしょう。**今のブラウザは必須ではないので、明示的に指定する必要がありません**。また、addEventListenerの第三引数に真偽値ではなくオブジェクト型で指定することもできます（参照「[EventTarget.addEventListener - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)」）。

### パッケージマネージャーはnpmが多数

フロントエンドの開発ではパッケージマネージャーを利用して、環境構築するのが一般的です。パッケージマネージャーにはさまざまな種類があるので、どれがよく使われているか質問しました。

221票の回答があり「bower」が9%、「yarn」が19%、**「npm」が72%**でした。

[yarn](https://ics.media/entry/13838/)の登場時は高速であることやロックファイルが使えることがnpm 4に対する利点として話題となりましたが、npm 5から同等の機能が入ったため、yarnの必要性が下がりました。ただ、yarnのほうがnpmより今も高速であったりdependencyのツリーがフラットだったりするので、敢えて利用している人もいるようです（参照「[行く2017年、来る2018年 - 開発環境の変化からCSSまで | CodeGrid](https://app.codegrid.net/entry/2017-round-up-2#toc-0)」）。

### Babelのプリセットは？

[Babel](https://babeljs.io/)とは**最新のECMAScriptの仕様で書いたJavaScriptを、互換性のある下位バージョンに変換する（トライスパイルする）ツール**です。たとえば、ECMAScript 2015の仕様の1つであるclassはIE11では利用できません。Babelを使えばclassとして書いたコードは互換のあるprototypeを使った構文に変換されます。

Babelの変換のルールとしてpresetが用意されていますが、どの種類がメジャーであるか質問しました。

39票の回答があり**「babel-preset-2015」が67%**、「babel-preset-2017」が8%、「babel-preset-latest」が10%、「babel-preset-env」が15%でした。

公式では多機能な「babel-preset-env」が推奨されているものの、数年前にメジャーだった「babel-preset-2015」が今も多く使われているようです。

「babel-preset-2015」だとasync/awaitのようなECMAScript 2017の便利な機能が使えないことや、動作環境を無視してECMAScript 5まで変換されてしまうのでToo Fatな印象があります（たとえばIE11対象外の環境であればECMAScript 5まで落とす必要はなく、ECMAScript 2015ぐらいの変換であれば十分である）。

### Gitの接続方法はHTTPS？　それともSSH？

Gitの接続方法について質問しました。

49票の回答があり「HTTPS」が45%、**「SSH」が55%**でした。

### Adobe Museって使われている？

ウェブサイトをコーディング無しで作れるツール「[Adobe Muse](http://www.adobe.com/jp/products/muse.html)」を使っているか質問しました。

233票の回答があり「使ってる」が5%、**「使っていない」が73%**、「Museをはじめて知った」が22%でした。

※Adobe Museは2018年3月のリリースをもって新規機能の開発を中止するそうです（参照「[Product Announcement](http://muse.adobe.com/product-announcement-intl.html?trackingid=5S7K88BQ&mv=email)」（英語）

### グーグル検索の1番目が古い情報だったら

記事の公開日付はGoogle検索結果のディスクリプションの前に入ってるものです。

![](https://ics.media/entry/17000/images/DRY2X5TUQAAuKof.png)

ウェブ技術のことでGoogle検索し1番目の検索結果が3〜5年前の記事だった場合、他の記事を探すか質問しました。

436票の回答があり**「とりあえずアクセスする」が49%**、「アクセスしないで新しい日付の記事を探す」が47%、「公開日を意識しないので気にしない」が4%でした。

テクノロジーの変化が激しいウェブ業界。記事の内容が古くて、使えずにがっかりした人も多いはず。**日付を1年以内に絞って検索をかけると回答した方もいました**。

### まとめ

ウェブは時代の流れが早い業界です。「今まではこれが当たり前だった」という常識もすぐに変わっていくでしょう。さまざまな調査報告に目を通し、多角的に業界を俯瞰していくことは大切な活動だと思います。

シリーズ初回の記事「[HTMLコーダーへのアンケート結果(業務時間やコードの書き方、Web技術について)](https://ics.media/entry/13597/)」では、アンケート対象の母集団を掲載しています。あわせて参照ください。

シリーズ

-   [第一回：業務時間やコードの書き方、Web技術について](https://ics.media/entry/13597/)
-   [第二回：学習方法、h1やCDNの使い分け、労働時間](https://ics.media/entry/15579/)

このようなアンケートは今後も実施していく予定です。興味があれば[私のTwitterアカウント](https://x.com/clockmaker)をフォローいただければ幸いです。今回のアンケート実施にあたり、回答やシェアを多数いただきました。ご協力いただいたことに感謝を申し上げます。