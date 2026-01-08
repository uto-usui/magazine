---
title: "ウェブページの読み込みを高速に！ FacebookのInstant Articlesの導入方法"
source: "https://ics.media/entry/13999/"
publishedDate: "2016-11-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

2016年11月29日 公開 / [株式会社ICS 渡邊 真耶](https://ics.media/entry/staff/watanabe/)

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

Facebookアプリのニュースフィードに流れている記事を選択したものの、読み込みが遅く記事を読むのを諦めた経験はありませんか？　記事を選択すると媒体側のサイトへアクセスしコンテンツを表示しますが、読み込み時間が遅いとせっかく良い記事を作成してもユーザーが離脱してしまう可能性があります。

本記事で提案したいのは、Facebookでのページ表示を高速化させる技術「Instant Articles（インスタント記事）」です。Facebookアプリから外部ウェブページを読み込むのに平均8秒程かかると言われていますが、Instant Articlesを利用すると**10倍の速度で表示できる**ようになります。

読み込み速度が改善すれば、快適にブラウジングできるため利用者にとっては嬉しいことでしょう。また、離脱率を改善やエンゲージメントの向上につながるため、運営者にとっても大きなメリットがあります。Facebookが全世界の1000社以上でテストプログラムを行ったところ、Instant Articlesの導入によって**クリック数が20％アップ、離脱率が70％軽減、シェア数が30％アップしたという結果が出ています。**

![](https://ics.media/entry/13999/images/161121_InstantArticles_infographic.jpg)

引用元：[Facebook Media](https://media.fb.com/2016/04/12/instant-articles-now-open/)

リリース当初は、大手メディアサイトでのみ利用可能でしたが、2016年4月12日よりすべてのサイトで利用できるようになり、最近では徐々に導入している企業が増えてきました。当サイトもInstant Articlesを導入したことで、高い効果が得られています。

WordPressで運営しているサイトであれば、公式のプラグインが提供されているため、**わずか10分程度で簡単に導入できます**。本記事では、Instant Articlesの導入方法について紹介します。

### Instant Articles とは

冒頭でも少し説明しましたが、ブログやメディアサイトなどの媒体の記事をFacebookのサーバーに配信することで、Facebookのニュースフィード上で直接記事を公開できる機能です。これまではニュースフィードに流れてきた記事をクリックすると、媒体のサイトへアクセスするため読み込みに時間がかかっていましたが、Instant Articlesを利用することで、**高速に記事を表示できます。**

![](https://ics.media/entry/13999/images/161127_instantArticles_demo.gif)

Facebookアプリから[弊社Facebookページ](https://www.facebook.com/icswebjp)へアクセスいただくと、実際にInstant Articlesの速度を体感できます。ニュースフィードに⚡（雷）マークが付いているものがInstant Articlesに対応した記事です。  
![](https://ics.media/entry/13999/images/161127_InstantArticles_sample.png)

### Instant Articles の導入手順

Instant Articlesを導入するためには、以下のステップで作業を行います。手順は多いように見えますが、1つ一つの作業は簡単にできるため、時間のかかる作業ではありません。本記事ではWordPressから提供されている公式プラグインを使用した導入方法について紹介します。

1.  事前準備
2.  WordPressへプラグインをインストール
3.  Instant Articlesの利用登録
4.  記事をFacebookへ配信する
5.  配信する記事の確認・手直し
6.  広告、計測タグ、変換ルールの設定
7.  審査を申請する

#### 1\. 事前準備

Instant Articlesを導入するためには、あらかじめ次の3点を準備ください。

-   [Facebookページの作成](https://www.facebook.com/pages/create/)
-   [Facebookアプリの作成](https://developers.facebook.com/apps/)
-   配信する記事を5件以上

FacebookページとFacebookアプリは上記のリンクより作成できますので、あらかじめ準備ください。すでにお持ちであれば新しく作成する必要はありません。また、配信する記事を5件以上用意しておく必要があります。リリース当初は50件以上必要でしたが、50件→10件→5件と必要な記事数が減っており、導入の間口が広くなってきています。

#### 2\. WordPressへプラグインをインストール

WordPress向けにInstant Articlesを簡単に導入可能な[プラグイン](https://wordpress.org/plugins/fb-instant-articles/)が準備されています。管理画面のプラグインの新規追加から`Instant Articles for WP`を検索し、インストールしてください。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step01_plugin_install.png)

#### 3\. Instant Articlesの利用登録

インストールが完了すると、WordPressの左メニューにInstant Articlesという項目が追加されますので、こちらから利用登録を進めていきます。

まず下記の画面が表示されますので、事前準備で作成したFacebookアプリの`App ID`と`App Secret`を入力しログインします。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step02_setup.png)

次に、ログインユーザーが管理しているFacebookページの一覧が表示されるため、事前準備で作成したFacebookページを選択し、「Select」ボタンを押します。

しかし、まだInstant Articlesの利用登録が完了していない場合は、下記の画像のようにサインアップするよう警告が出ており、「Select」ボタンが押せなくなっています。赤枠部分の「sign up」のリンクを選択し、Instant Articlesの利用登録を行ってください。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step03_setup_regist.png)

利用登録が完了すると元の画面に戻ってくるため、「Select」ボタンを選択し次の画面へ進みます。この画面では、Instant Articlesの記事を配信する際のデザインを編集するよう促されます。「Customize」ボタンを選択し、記事のデザイン設定画面へ遷移してください。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step03_style_customize.png)

この画面では、配信する記事のフォントや文字色だけでなく、各種要素の`margin`や`padding`まで細かく設定できます。後からでも変更できるため、デフォルトのままでも構いませんが、ロゴ画像だけは最低限設定する必要があります。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step03_style_customize_fb.png)

以上で、利用登録および初期設定は完了です。

#### 4\. 記事をFacebookへ配信する

媒体側の記事をFacebookに配信する方法は、RSS方式とAPI方式の2つの方法がありますが、WordPressを利用している場合は、RSS形式がオススメです。

手順3で行ったInstant Articlesの利用登録が完了するとFacebookページのメニューから「投稿ツール」へアクセスできるようになっています。「投稿ツール」へアクセスし左メニューからインスタント記事の「構成」を選択してください。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step03_publish_tool.png)

次に「ツール」のブロックから「プロダクションRSSのフィード」を選択し、媒体のRSSフィードのURLを指定し保存します。Facebookは指定したURLから1時間に数回程度、自動的に記事を取得します。

![](https://ics.media/entry/13999/images/161121_InstantArticles_productionrss.png)

#### 5\. 配信する記事の確認・手直し

記事がFacebookに収集されると、「プロダクション関連の記事」に取得された記事の一覧が表示されます。この時Instant Articlesの[ポリシー](https://developers.facebook.com/docs/instant-articles/policy)や[ガイドライン](https://developers.facebook.com/docs/instant-articles/guides/articlecreate)への準拠していない記事があると、下記の画面のように記事タイトルの横に警告マークが表示されます。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step04_production_articles.png)

警告マークが表示された記事を選択すると、ガイドラインに準拠していない箇所に分かりやすくエラーが表示されています。この画面では記事の確認だけでなく、直接修正することもできます。エラーが表示される箇所を適宜修正し「Save」ボタンを押すと配信する記事の内容を更新できます。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step05_edit_article.png)

#### 6\. 広告、計測タグ、変換ルールの設定

手順5では警告が出ている箇所を手動で修正しましたが、記事を公開する度に手動で修正するのはとても手間がかかります。Instant Articlesでは使用できないタグもあるため、記事によってはどうしてもエラーが発生してしまいます。

WordPressのプラグインを使用すると、RSSで記事を配信する際に指定したタグに対して変換ルールを作成できるため、記事配信時にガイドラインに準拠したフォーマットで配信できます。

変換ルールの設定は、プラグインの設定画面の「Open Advanced Settings now」のリンクで表示される詳細設定から設定できます。広告表示や、計測タグもこの画面から設定できます。

「Custom transformer rules」欄の「Enable custom transformer rules」にチェックを入れるとテキストフィールドが表示されるため、こちらに変換ルールを定義します。記述形式に関しては、[公式ページのドキュメント](https://developers.facebook.com/docs/instant-articles/sdk/transformer-rules)に記載がありますので、こちらを参考に設定してください。当サイトでは次の変換ルールを設定しています。

```
{
  "rules": [
    {
      "class": "PassThroughRule",
      "selector": "html"
    },
    {
      "class": "PassThroughRule",
      "selector": "div"
    },
    {
      "class": "PassThroughRule",
      "selector": "dl"
    },
    {
      "class": "PassThroughRule",
      "selector": "dt"
    },
    {
      "class": "PassThroughRule",
      "selector": "dd"
    },
    {
      "class": "BlockquoteRule",
      "selector": "pre"
    },
    {
      "class": "ItalicRule",
      "selector": "code"
    },
    {
      "class": "PassThroughRule",
      "selector": "small"
    },
    {
      "class": "PassThroughRule",
      "selector": "code br"
    },
    {
      "class": "SocialEmbedRule",
      "selector": "iframe",
      "properties": {
        "socialembed.url": {
          "type": "string",
          "selector": "iframe",
          "attribute": "src"
        },
        "socialembed.height": {
          "type": "int",
          "selector": "iframe",
          "attribute": "height"
        },
        "socialembed.width": {
          "type": "int",
          "selector": "iframe",
          "attribute": "width"
        },
        "socialembed.iframe": {
          "type": "children",
          "selector": "iframe"
        },
        "socialembed.caption": {
          "type": "element",
          "selector": "figcaption"
        }
      }
    }
  ]
}
```

#### 7\. 審査を申請する

配信する記事の確認・手直しが完了したら、初期設定のブロックから「ステップ2：審査を申請する」を開き申請をおこないます。「審査を申請する」ボタンを押して、審査を申請しましょう。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step06_review.png)

必要な記事数に満たしていない場合やガイドラインに準拠していない場合は、「審査を申請する」ボタンが押せなくなっています。その際は、エラー内容が表示されていると思いますので、確認し適宜修正を行ってください。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step06_review_ng.png)

審査には1〜3営業日ほどかかります。下記の画面が表示されれば審査は完了です。もし審査が通らない場合はフィードバックが返ってきます。フィードバックの内容を確認し、再度修正をおこなってください。

![](https://ics.media/entry/13999/images/161121_InstantArticles_step06_review_ok.png)

ICS MEDIAでは2営業日で審査のリジェクト結果が返ってきました。その時は本サイトの記事とInstant Articlesの内容の違いについてNGを指摘されています（当サイトの記事で表示されている文言が、一部Instant Articlesで表示されていなかったため）。こちらを修正し再審査に提出することで、2日後に承認されました。

### おわりに

導入するまでの手順は多いようにみえますが、WordPressのプラグインやFacebook側の投稿ツールなど、配信環境が整っているため、難しい技術など必要なく簡単に導入できます。

しかし、Instant Articlesの導入もメリットだけではありません。媒体側のサイトへアクセスせずFacebookのサーバーで公開しているため、サイトへの流入が減り、広告収入などの収益モデルへ影響がでてしまう可能性もあります。これらの問題を解決するために、Facebookは2016年10月12日に[広告フォーマットのアップデート](http://blog.feedmatic.net/entry/2016/10/27/110546)を発表しました。訴求効果が高く、よりリッチな広告を提供できるよう改善されていますので、これを機に是非導入を検討してみてはいかがでしょうか？

また類似の技術として、モバイルブラウザでの読み込みを高速化するAMP（Accelerated Mobile Pages）という技術があります。これまでは通常の検索結果には適用されず、ニュース性の高いものだけにAMPが適用されていましたが、2016年10月よりスマホの通常の検索結果にもAMPが適用されるようになりました。

Instant ArticlesとあわせてAMPも導入することで、Googleの検索結果や他のサービスからの遷移についても高速化できるため、両者の技術を導入することが望ましいと思います。AMPの導入方法については「[モバイルページの高速化！ AMPに対応したHTMLの作成方法](https://ics.media/entry/12291/)」で紹介しているので、本記事とあわせて御覧ください。