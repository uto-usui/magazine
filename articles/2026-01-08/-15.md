---
title: "ウェブ制作に関わる人に役立つウェブアクセシビリティの基本"
source: "https://ics.media/entry/15428/"
publishedDate: "2017-04-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

アクセシビリティという言葉を聞いたことはありますか？　高齢者や障害者などハンディキャップを持つ人だけでなく、健常者を含めただれもがどんな環境からでもサービスを利用しやすいか、その利用のしやすさのことをアクセシビリティといいます。とくに、ウェブに関するものはウェブアクセシビリティといいます。

ウェブ制作者のなかには、アクセシブルなリッチインターネットアプリケーションのための仕様である「[WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/)」を実装に取り入れてる人もいるかもしれません。今回はウェブ制作に関わる人に役立つウェブアクセシビリティの基本を紹介します。

### ウェブアクセシビリティのガイドライン「WCAG」

世界中のウェブアクセシビリティの基本となるガイドラインとして、W3Cの「Web Content Accessibitility Guidelines」(通称：WCAG)があります。現在は2008年に勧告された「[WCAG 2.0](https://www.w3.org/TR/2008/REC-WCAG20-20081211/)」([日本語訳](https://waic.jp/translations/WCAG20/Overview.html))が最新版です。「WCAG 2.0」は2012年に国際規格（ISO/IEC 40500:2012）として承認されています。「WCAG 2.0」ではガイドラインの項目の達成基準と、その達成度合いによる「WCAG 2.0」全体の適合レベルが、それぞれA、AA、AAAの三段階で定められています（参考： [WCAG 2.0 - 適合](https://waic.jp/translations/WCAG20/Overview.html#conformance))。

![](https://ics.media/entry/15428/images/wcag.png)

「WCAG 2.0」の概要の項目には以下のように記述されています。

> Web Content Accessibility Guidelines (WCAG) 2.0 は、ウェブコンテンツをよりアクセシブルにするための広範囲に及ぶ推奨事項を網羅している。このガイドラインに従うことで、全盲又はロービジョン、ろう又は難聴、学習障害、認知障害、運動制限、発話困難、光感受性発作及びこれらの組合せ等を含んだ、様々な障害のある人に対して、コンテンツをアクセシブルにすることができる。又、このガイドラインに従うと、多くの場合、ほとんどの利用者にとってウェブコンテンツがより使いやすくなる。

たとえば、「[ガイドライン 2.1 キーボード操作可能:すべての機能をキーボードから利用できるようにすること。](https://waic.jp/translations/WCAG20/Overview.html#keyboard-operation)」というガイドラインがあります。これについて、ガイドラインの意図や用語が解説されている[「Understanding WCAG 2.0(日本語訳)」の「ガイドライン 2.1 を理解する」](https://waic.jp/translations/UNDERSTANDING-WCAG20/keyboard-operation.html)では以下のように説明されています。

> キーボード入力が時間に依存しない限り、この柔軟性がある、又はあまねくサポートされる、及び様々な障害のある人が操作可能な入力形態は他にはない。

「WCAG 2.0」に記述されている達成基準は、技術に依存しないものとされており、関連文書として「WCAG 2.0」の達成基準の解説書の「[Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/)」([日本語訳](https://waic.jp/translations/UNDERSTANDING-WCAG20/Overview.html))、達成方法集の「[Techniques for WCAG 2.0](https://www.w3.org/TR/WCAG20-TECHS/)」([日本語訳](https://waic.jp/translations/WCAG-TECHS/Overview.html))があります。

### 国内のウェブアクセシビリティ

日本国内でも、ウェブアクセシビリティの規格やガイドラインが決められています。そのうち、2016年に動きがあった3つを紹介します。

#### 日本工業規格「JIS X 8341-3：2016」

日本工業規格に、「JIS X 8341-3」([参考：JIS X 8341-3:2016 解説](https://waic.jp/docs/jis2016/understanding/201604/))があります。  
この規格は、「WCAG 2.0」の日本語訳に、独自の要求事項を推奨事項として加えた内容です。日本の公的機関や一般企業のウェブアクセシビリティ方針では「JIS X 8341-3:2016のレベルAAへの準拠する」のように、「JIS X 8341-3：2016」に沿った目標が決められることがあります。

[ウェブアクセシビリティ基盤委員会](https://waic.jp/)による2016年の実態調査では、公的機関で63、一般企業で12のウェブサイトがウェブアクセシビリティ方針の策定・公開をしていると結果が出ています。ウェブアクセシビリティ方針を発表する公的機関や一般企業は増えています。

-   [函館市ウェブアクセシビリティ方針(2017年3月31日掲載)](https://www.city.hakodate.hokkaido.jp/docs/2017033100056/)
-   [アクセシビリティ方針 - Panasonic(2017年4月1日公開)](https://holdings.panasonic/jp/web-accessibility.html)
-   [アクセシビリティ方針 | チャットワーク（ChatWork）(2017年4月17日制定)](https://go.chatwork.com/ja/accessibility/)

公的機関の例： [港区公式ホームページ／ウェブアクセシビリティ方針](https://www.city.minato.tokyo.jp/portal/houshin.html)

![](https://ics.media/entry/15428/images/minatoku.png)

東京都港区 - 港区公式ホームページ全体について「JIS X 8341-3:2016」の適合レベルAA準拠を維持することを目標としたアクセシビリティ方針です。平成25年から1年ごとに行われた試験結果も掲載されています。

一般企業の例： [ChatWork株式会社 - アクセシビリティ方針](https://go.chatwork.com/ja/accessibility/)

![](https://ics.media/entry/15428/images/chatwork.png)

ウェブサイトの作成とサービスの提供について2018年夏までに「JIS X 8341-3:2016」および「WCAG 2.0」【レベルAA】準拠を目標としたアクセシビリティ方針です。

#### 障害者差別解消法

2016年4月には、「[障害者差別解消法](https://www8.cao.go.jp/shougai/suishin/sabekai.html)」が施行されました。これは障害者の差別を解消するために「不当な差別的取り扱いの禁止」と「合理的配慮の提供」を事業者に求めるものです。ウェブアクセシビリティを確保することは、障害者へ「合理的配慮の提供」をすることといえます。

![](https://ics.media/entry/15428/images/sabekai_poster.jpg)

#### みんなの公共サイト運用ガイドライン

「障害者差別解消法」と「JIS X 8341-3：2016」などを受けて総務省が、日本の公的機関のウェブアクセシビリティ対応について「[みんなの公共サイト運用ガイドライン（2016年版）](https://www.soumu.go.jp/main_sosiki/joho_tsusin/b_free/guideline.html)」を公表しました。

![](https://ics.media/entry/15428/images/minnano.png)

このガイドラインは公的機関に対して、“速やかにウェブアクセシビリティ方針を策定・公開し、2017年度末までにJIS X 8341-3の適合レベルAAに準拠する” ことを求めています。

**今後の国内のウェブアクセシビリティ**

これらにより日本の公的機関のウェブサイトのほとんどはアクセシビリティに配慮されたものになっていくと考えられます。これをきっかけに、一般企業のアクセシビリティに対する意識も少しずつ高まっていくことが期待できます。

### 理解を深める助けになる筆者のオススメ

#### 図解で理解を深められる書籍

もし、ウェブアクセシビリティについて詳しく知りたいと思ったり、会社のメンバーなど他の人にも広めたい！と思った人には、ウェブアクセシビリティの取り組み方が解説された「[デザイニングWebアクセシビリティ](https://www.borndigital.co.jp/book/5388.html)」と、アクセシブルな実装のための「[コーディングWebアクセシビリティ](https://www.borndigital.co.jp/book/5318.html)」という2冊の書籍がオススメです。

![](https://ics.media/entry/15428/images/borndigital.png)

とくに、デザイニングWebアクセシビリティはウェブディレクターやデザイナーなどエンジニア以外の方にとっても読んで損はないものだと思います。内容については他のウェブサイトやブログなどで詳しくレビューされているので、そちらを参考にご覧ください。

-   [コーディングWebアクセシビリティ｜デザイニングWebアクセシビリティ facebookページ](https://www.facebook.com/a11ybooks/)

### 終わりに

フロントエンド界隈で「WAI-ARIA」の話題はよく聞くようになった気がしますが、もっと基本的なウェブアクセシビリティについてあまり知られていないかもしれません。この記事がウェブアクセシビリティについて考えるきっかけになれば幸いです。