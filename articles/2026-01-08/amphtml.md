---
title: "モバイルページの高速化！ AMPの利点と対応HTMLの作り方"
source: "https://ics.media/entry/12291/"
publishedDate: "2016-06-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

[AMP（Accelerated Mobile Pages＝アンプ）](https://www.ampproject.org/docs/get_started/about-amp.html)とは、2016年2月にGoogleが導入した、モバイル端末（スマートフォン・タブレット）でのウェブページの表示を高速化するためのプロジェクトです。AMP対応のウェブページは従来に比べ**平均4倍程の速度で表示できるため、さまざまなメリットがあります**。

本記事ではAMP導入のメリットと作り方を紹介します。AMP対応することによってアクセス数が増大した話もありますので、記事のシリーズで紹介します。

#### 導入の利点① ページ表示が超高速になる

モバイルブラウザで、AMPページにアクセスしたときにものすごいスピードでウェブページが表示されます。読み込み待ちのイライラがなくなるため、ユーザーストレスの軽減につながります。

![](https://ics.media/entry/12291/images/161207_amp_speed.png)

#### 導入の利点② 検索結果でAMP（稲妻マーク）が表示される

モバイルでのGoogle検索で、AMP対応のウェブページは稲妻マーク付きで掲載されます。このリンクをタップすれば、AMPページが一瞬で表示されます。

読者のみなさんも手元のスマートフォンで[「ICS CSS」と検索](https://www.google.co.jp/search?q=ICS+CSS)してみてください。一瞬でページが表示されるため、驚くはずです。

![](https://ics.media/entry/12291/images/161207_amp_kekka.png)

通常のウェブページに比べて素早く表示されるため、**ユーザーは稲妻マークの有無をみてウェブページを開く傾向が強まっていくでしょう**。

※AMP対応しているからと言って、他のサイトと比べて掲載順位が優位になるわけではなさそうです。同一コンテンツで通常ページとAMPページの2つがあったら、AMPページが優先して表示されます。  
2016年12月1日よりAMPがGoogle検索結果の一覧に標準で載るようになりました。

#### 導入の利点③ Twitterやはてなブックマークで高速に表示される

スマートフォンのアプリにはAMPに対応したものがあります。代表的なものとしては「Twitter」や「はてなブックマーク」が挙げられます。

これらのアプリからリンクを開くと、自動的にAMPのページが表示されます。通常のHTMLページに比べて高速に表示されるため、アクティビティーの向上（RTやLike、ブックマークの上昇）が期待できるでしょう。

![](https://ics.media/entry/12291/images/170620_amp_twitter.png)

#### 導入の利点④ トップニュースに表示される

AMP対応していれば、モバイルでのGoogleの検索結果の上部に表示されるメリットがあります。**トップニュース欄に載る条件はそのキーワードが旬であることと、対象ページがAMP対応していることの2点です。**

![AMPを表示した様子](https://ics.media/entry/12291/images/160527_amp_demo.gif)

上図はスマートフォンのブラウザにて、Googleで「消費税」というキーワードで検索した際の動画です。当サイトでもトップニュース欄に掲載されたことが幾度かありますが、ビッグワード（検索ボリュームの多いキーワード）で掲載されたときは**わずか数時間で数万PVの巨大なアクセス流入がありました**。

地道にコツコツ対策して上位を狙うのが一般的なSEOですが、AMP対応でのトップニュース欄掲載はいっきに上位に駆け上がれるため、とてもおいしい利点です。

### AMP（Accelerated Mobile Pages）とは

冒頭でも説明しましたが、AMP（アンプ）とはモバイル端末でのウェブページを高速化するためのプロジェクトです。GoogleとTwitterが共同で開発しており、さまざまなプラットフォームでAMPのサポートが拡大しています。国内だとスマートフォンの「はてなブックマーク」アプリでも対応されています。

`AMP HTML`に準拠したウェブページを公開すると、クローラーがAMPページをGoogleのサーバーにキャッシュします。このサーバーが素早くページを転送するため、モバイルでの表示が高速になります。

![AMPページが表示される流れ](https://ics.media/entry/12291/images/160527_amp_flow.png)

※こちらの図は[Google Developers Japan](http://googledevjp.blogspot.jp/2016/02/google-accelerated-mobile-pages.html)より引用しています。

他にもAMPではページ表示を高速にするため、画像ファイルを遅延して読み込む技術（＝レイジーローディング）や、ウェブページの解析を短時間にする技術（レンダリングブロックの回避）が盛り込まれています。

### AMP対応ページの作り方

AMP対応ページは[AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.html)の仕様に準拠する必要があります。HTMLのコーディングと作り方は同じですが、特殊な記述ルールやJavaScriptが使用できない制約があるため、通常のHTMLページとは別にAMP専用ページを作成する方がよいでしょう。

#### 必須で準拠すべき仕様について

AMP対応ページでは、必須で準拠するべき仕様がいくつかあります。準拠していないと検索結果にAMPとして表示されないため、しっかりと対応しましょう。必須で準拠する必要のある仕様を下記にまとめました。項目は多いですが、とくに難しいことをしているわけではありません。

HTMLページはDOCTYPE宣言から開始します。

```
<html !doctype html>
```

html要素には⚡の絵文字か`html amp`と記述します。

```
<html ⚡>
```

`head`要素に`canonical` URLでデスクトップページのURLを指定します。

```
<link rel="canonical" href="デスクトップページのURL">
```

head要素の直下に文字コードを指定します。`UTF-8`以外は対応していないようです。

```
<meta charset="utf-8">
```

head要素にviewportの設定を行います。

```
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
```

AMP用JavaScriptライブラリーを読み込みます。

```
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

head要素内に`boilplate`を記述します。`boilplate`とは「お決まりのコード」のようなもので、`style`要素に`amp-boilerplate`属性を付加して記述する必要があります。

```
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```

[`JSON-LD`](https://ja.wikipedia.org/wiki/Linked_Open_Data)を指定します。`JSON-LD`とはWeb上でコンピューター処理に適したデータを公開・共有するための技術の総称です。指定することで、そのページがどのようなページであるかを正確にクローラーに伝えることができます。

```
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "NewsArticle",
  "headline": "Article headline",
  "image": [
    "thumbnail1.jpg"
   ],
   "datePublished": "2015-02-05T08:00:00+08:00"
}
</script>
```

上記の仕様にそってAMP対応ページのHTMLを作成すると下記のようになります。下記のコードは最低限必要なタグをすべて記述したものになります。コピーしてそのままお使いいただけます。

```
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <title>Sample document</title>
    <link rel="canonical" href="PCページのURL">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-custom>
      h1 {color: red}
    </style>
    <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "headline": "Article headline",
      "image": [
        "thumbnail1.jpg"
      ],
      "datePublished": "2015-02-05T08:00:00+08:00"
    }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
<body>
 
</body>
</html>
```

body要素内は自由に任意のコンテンツの内容を記述できますが、`AMP HTML`に対応させるためには守らなければいけない制約があります。

#### HTMLを作成する際に注意すること

`AMP HTML`は基本的には HTML5で記述すれば問題ありませんが、一部使用できないタグや別のタグに置き換える必要があるタグがあります。下記は`AMP HTML`で制約のあるタグと禁止されているタグの一覧です。

HTML要素

AMP HTML

script

`application/ld+json`以外は禁止。AMPランタイムと拡張コンポーネント用のScriptのみ例外として読み込み可能です。

base

使用禁止

img

`amp-img`に置き換える必要があります。`AMP HTML`では`src`、`width`、`height`属性の指定が必須です。また`layout`属性に`responsive`を指定すると、アスペクト比を保ったまま、画面幅に合わせて画像が拡大、縮小できます。

video

`amp-video`に置き換える必要があります。

audio

`amp-audio`に置き換える必要があります。

iframe

`amp-iframe`に置き換える必要があります。

frame

使用禁止

frameset

使用禁止

object

使用禁止

param

使用禁止

applet

使用禁止

embed

使用禁止

form

使用禁止（将来的にはサポート予定）

input elements

`input`、`textarea`、`select`、`option`の要素はすべて使用禁止

button

使用可能

style

head要素内に必須で記述する必要のあるopacityを調整する処理とSytleの変更用に`amp-custom`属性を付与した`style`要素を`head`要素内に1つだけ使用可能です。

link

`rel`属性は[microformats.org](http://microformats.org/wiki/existing-rel-values)に登録されている値は使用可能です。

`stylesheet`と`preconnect`、`prerender`、`prefetch`の値は許可しない。

例外としてWebフォントの読み込みは使用可能です。

meta

`http-equiv`属性は禁止。それ以外は使用可能。

a

`href`属性に`javascript:`から始まる値を指定するのは禁止。`target`属性を指定する場合は`_blank`のみ設定可能。それ以外は制限なし。

svg

`svg`要素はおおむね使用可能

上記の他に以下の点にも注意して制作する必要があります。

-   CSS総容量は50KB（50,000Byte）までに収める必要があります。
-   `!important`の使用は禁止されています。
-   `style`属性にCSSを記述することは禁止されています。  
    CSSを記述する場合は、`<style amp-custom></style>`内に記述する必要があります。
-   AMP用JavaScriptライブラリー以外のJavaScriptの読み込みは禁止されています。

#### 拡張コンポーネントについて

AMP対応ページでは、AMP用JavaScriptライブラリー以外のJavaScriptの読み込みが禁止されていますが、AMPだけで使用できる[拡張コンポーネント](https://github.com/ampproject/amphtml/tree/master/extensions#amp-html-extensions)が用意されています。

拡張コンポーネントは、専用のJavaScriptを読み込むことで使用できるようになります。さまざまな拡張コンポーネントが準備されていますが、下記ではその中の一部を紹介します。その他の拡張ライブラリーや使用方法につきましては[公式サイト](https://github.com/ampproject/amphtml/tree/master/extensions#amp-html-extensions)をご参照ください。

タグ名

概要

[amp-carousel](https://github.com/ampproject/amphtml/blob/master/extensions/amp-carousel/amp-carousel.md#-amp-carousel)

複数枚の画像をカルーセル形式で表示できます。

[amp-youtube](https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube/amp-youtube.md#-amp-youtube)

YouTubeに投稿されている動画を表示できます。

[amp-lightbox](https://github.com/ampproject/amphtml/blob/master/extensions/amp-lightbox/amp-lightbox.md#-amp-lightbox)

ライトボックスを表示できます。

[amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#amp-analytics)

GoogleAnalyticsを使用したアクセス解析ができます。

[amp-social-share](https://github.com/ampproject/amphtml/blob/master/extensions/amp-social-share/amp-social-share.md#-amp-social-share)

ソーシャルボタンを表示できます。

#### AMP対応ページをデバッグする方法

作成した`AMP HTML`はChromeやFirefoxのデベロッパーツールを使用してデバッグできます。URLの末尾に`#development=1`を付加してアクセスしてください。デベロッパーツールはWindowsの場合F12キー(macOSの場合はCommand＋Option＋Iキー)で開くことができます。

```
https://ics.media/entry/11221?amp=1#development=1
```

![](https://ics.media/entry/12291/images/160527_amp_develop.png)

上記は本サイトのAMP対応ページをChromeで表示した際の画面キャプチャです。URLの末尾に`#development=1`を付加してアクセスすると、デベロッパーツールのConsole画面にAMP対応ページであることのメッセージとバリデーションを行った結果が表示されます。上記画像では`AMP HTML`の仕様に準拠していない箇所はないため、`AMP validation successful`と表示されています。

仕様に準拠していない項目がある場合、下記の画像の通りConsole画面にエラーメッセージと共に、該当箇所の行数と文字数が出力されるため、エラーメッセージを確認しながら修正を進めることができます。下記の画像では206行目で「`img`要素が使われているけれど、`amp-img`要素が正しいのでは？」とメッセージが表示されています。

![](https://ics.media/entry/12291/images/160527_amp_develop_error.png)

#### クローラーにAMP対応ページの存在を通知する

デスクトップ・モバイルのウェブページとは別にAMP専用ページを作成している場合、オリジナルのウェブページ側のmetaタグにAMP対応ページのURLを指定する必要があります。これによりクローラーはAMP対応ページの存在を知ることができます。

```
<link rel="amphtml" href="/xxxx/amp.html">
```

#### AMP CacheのURLを確認する方法

次のURLからキャッシュされているAMPページを確認できます。

```
https://cdn.ampproject.org/c/s/{ドメイン以降のURL}
```

たとえば、元のURLが`https://ics.media/entry/13117/?amp=1`の場合は、`https://cdn.ampproject.org/c/s/ics.media/entry/13117/?amp=1`となります。

### おわりに

AMP対応ページを作るには`AMP HTML`の仕様に準拠する必要がありますが、基本的には通常のHTML5の記述のため、覚えてしまえばそれほど手間がかかりません。また、デベロッパーツールを使ってデバッグができるため、特別なツールを用意することなくAMP対応ページを作成できます。今後、GoogleやTwitter以外にも利用できるプラットフォームが増えてくると思いますので、モバイルページでの流入を増やしたい方などは是非試してください。

続編記事「[モバイルページを高速化するAMPを三ヶ月間運用してどうだったのか](https://ics.media/entry/13197/)」では、実際にAMPを導入してどれだけの効果があったのかレポートしています。AMPの導入を検討されている方はあわせてご覧ください。

また、2016年11月頃から検索結果としてAMPへの流入が増えてきています（[参照ツイート](https://x.com/clockmaker/status/800901593998557184)）。経過をレポートしていくので、ICS MEDIAを引き続きチェックください。