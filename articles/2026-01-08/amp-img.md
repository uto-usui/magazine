---
title: "今の時代、ウェブページは一瞬で表示するべき！ 画像の遅延読込に役立つamp-imgの使い方"
source: "https://ics.media/entry/18237/"
publishedDate: "2018-06-07"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

ウェブページの表示速度は、離脱率やコンバージョン率にもっとも影響する重要なポイントです。Googleが公表した[調査結果](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)では、「**表示に3秒以上かかると、約53%のユーザーは離脱する**」「**表示速度が1秒から6秒に落ちると、直帰率は106%上昇する**」というデータが出ているようです。

表示速度を改善する施策は色々とありますが、本記事では「[AMPアンプ（Accelerated Mobile Pages）](https://www.ampproject.org/ja/)」を作成する際に利用するJavaScriptライブラリーを使って、簡単に表示速度を改善する手法を紹介します。

### AMPとはウェブページの読み込みを高速化させる技術

「[AMPアンプ（Accelerated Mobile Pages）](https://www.ampproject.org/ja/)」とは、名前の通り**モバイルでのウェブページの読み込みを高速化させる技術です。**

本サイト（ICS MEDIA）では以前「[AMPの利点と対応HTMLの作り方](https://ics.media/entry/12291/)」で導入方法を紹介していますが、AMPでは表示速度を高速化するために[AMP JS](https://www.ampproject.org/ja/learn/overview/)というJavaScriptのライブラリーを読み込み、表示速度の改善を行っています。

AMP JSは**PCページ・モバイルページ（非AMPページ）でも利用でき、その高速化の恩恵を受けることができます**。今、皆さんがご覧の本サイト（ICS MEDIA）では非AMPページでAMP JS（`amp-img`タグや`amp-youtube`タグなど）を導入して1年以上経ちますが、問題なく運用できています。Googleの画像検索にもインデックスされています。

![](https://ics.media/entry/18237/images/180607_ampimg_icsmedia_googleindex.png)

### amp-imgタグを使って遅延ロードを行う

**遅延ロード（Lazy Load）とは、画面に表示されていない画像は読み込まず、画面のスクロールに応じてあとから読み込むことでウェブページの表示を高速化する手法**です。通常の`img`タグの場合、ページアクセス時に画面の表示有無に関係なくすべての画像を読み込もうとします。そのため、**ページが最低限の操作を受け付けるようになるまでの時間がかかってしまったり、スクロールしない場合でも通信容量がかさむといったデメリットが発生**します。

![](https://ics.media/entry/18237/images/180607_ampimg_lazyload.png)

[jquery.lazyload.js](https://appelsiini.net/projects/lazyload/)などの遅延ロードを実現するためのライブラリは多々ありますが、`src`属性にダミーの画像URLを指定し、カスタムデータ属性などに正規の画像URLを指定する方法が一般的でした。`data-`属性を使うので、無理やり実現している印象ですね。

▼一般的な遅延ロードの記述方法（jQuery.lazyload.jsを使った場合）

```
<img src="dummy.jpg" data-original="original.jpg" width="100" height="100" alt="" />
```

AMP JSでは、カスタムタグの`amp-img`タグを利用し、次のように記述できます。ウェブコンポーネント時代の使い勝手ですね。

▼amp-imgタグの記述方法

```
<head>
　　　　・
　　　　・
    <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
　　　　・
　　　　・
<amp-img src="original.jpg" width="100" height="100" layout="responsive" alt=""></amp-img>
```

`amp-img`タグを有効にするために非同期でAMP JSライブラリを読み込む必要があります。`amp-img`タグは`img`タグで指定できる属性は基本的にはそのまま利用できますが、`width`属性と`height`属性は必須で指定する必要がありますのでご注意ください。

また、`amp-img`タグには、追加で`layout`属性が指定できます。この属性は、CSSで指定する画像表示に関するスタイルを**CSSの定義なしで実現できるものです**。上記の例では、`layout`属性に`responsive`と指定しているため**、要素の幅はコンテナー要素の幅に等しくなり（100%表示）、高さについては、幅と高さの属性によって決まるアスペクト比になるよう自動的に調整**されます。その他のlayout属性に指定できる値については、「[公式リファレンス](https://www.ampproject.org/ja/docs/design/responsive/control_layout)」を参照ください。

### imgタグとamp-imgタグのパフォーマンスを計測

実際に`img`タグと`amp-img`タグを使用して画像を20枚表示するページをそれぞれ準備し、ページ表示時のパフォーマンスを計測しました。デモページでスクロールをすると、**`amp-img`タグのデモでは遅延ロードが行われていることが確認できます。**

-   [imgタグを利用したデモページ](https://ics-creative.github.io/180606_amp-img_demo/)
-   [amp-imgタグを利用したデモページ](https://ics-creative.github.io/180606_amp-img_demo/amp-img.html)

パフォーマンス計測には、Chrome DevToolsのAuditsを使用しました。「主要コンテンツが表示され始める時間」と「ユーザー操作を受けるけるようになるまでの時間」に着目して計測を行いました。

▼imgタグを使用した場合の計測結果  
![](https://ics.media/entry/18237/images/180606_amp-img_performance01.jpg)

▼amp-imgタグを使用した場合の計測結果  
![](https://ics.media/entry/18237/images/180606_amp-img_performance02.jpg)

「First Meaningful Paint」が**ページの主要なコンテンツがスクリーンに表示されるまでの時間**、「First Interactive」が**ページが最低限の操作を受け付けるようになるまでの時間**、「Consistently Interactive」が**ページが完全に操作を受け付けるようになるまでの時間**になります。

計測結果を比較すると「主要コンテンツが表示され始める時間」はさほど変わりませんが、「ユーザー操作を受けるけるようになるまでの時間」が`img`タグの場合は4,040ミリ秒かかっていますが、`amp-img`タグを利用して遅延ロードを行うことで**1,740ミリ秒に短縮されており、約60%の高速化**となっています。

HTMLの**`amp-img`タグを利用することで、これだけの大きなパフォーマンス改善が実現できました**。

![](https://ics.media/entry/18237/images/180607_ampimg_audits_2.png)

### サポートブラウザ

[公式サイト](https://www.ampproject.org/ja/support/faqs/supported-browsers)では、**Chrome、Firefox、Edge、Safari、Operaといった主要ブラウザーの最新バージョンとその1つ前のバージョンをサポート**していると明記されています。スマートフォンに搭載されている Android 4.0 システムブラウザーと Chrome 28 以降については、「完璧ではないが破損もしていない」という状態でのサポートを維持するとのことです。

また、今回のデモを手元の主要ブラウザー以外の環境で確認したところ、次の環境でも動作することが確認できました。

-   Internet Explorer 10
-   Internet Explorer 11
-   Android 4.2 システムブラウザー

![](https://ics.media/entry/18237/images/180607_ampimg_ie11.png)

▲IE11（標準モード）でも利用可能

### `amp-img`タグを利用する際のデメリット

`amp-img`タグは容易に導入できますが、レスポンシブウェブデザインに対応したウェブページなどでは、`layout`属性の挙動を理解しておかないと、意図した動作にならないことがあります。導入する際には次の点を考慮しつつ実装しましょう。

-   `layout`属性の値により、`width`属性、`height`属性の指定が必須のものと不要なものがある
-   画像サイズが小さい画像に対して`layout`属性に`responsive`を指定すると、親のコンテナー要素の幅にあわせて表示されるため、元画像よりも大きく表示されてしまう。その場合は、親のコンテナー要素にCSSで`max-width`を指定するなどの必要がある
-   AMP JSのライブラリー「v0.js」の容量がGZIPで80KBほどあり、JSファイルの解析時間がわずかにかかってしまう。
-   Internet Explorer 8やInternet Explorer 11（互換モード）では、AMP JSライブラリーの読み込み自体でエラーが発生してしまう。（`fallback`属性を使用し代替の動作を指定するなどの対策が必要）

### おわりに

AMP JSには`amp-img`タグ以外にも動画を扱う`amp-video`タグや`amp-youtube`タグ、`amp-iframe`タグなど**スクロールに連動して読み込みを行うためのタグが用意されています**。ページの初期表示時に動画やiframeを読み込むと時間を要するので、スクロール連動にできるのはパフォーマンスの観点で効果が大きいです。

また、性能上だけでなく、画像の拡大表示を行う`amp-image-lightbox`タグ、テキストのフォントサイズを自動調整する`amp-fit-text`タグなど、**機能性に優れた便利なタグもたくさん用意されています**。

![](https://ics.media/entry/18237/images/180607_ampimg_carousel_2.png)

※公式リファレンス[「コンポーネント / タグ – AMP」](https://www.ampproject.org/ja/docs/reference/components)参照。便利なカスタムタグが用意されている

AMP HTMLの作成とあわせて、これらのタグを利用して手軽にPCページ・モバイルページのパフォーマンス改善を行ってみてはいかがでしょうか。他のカスタムタグも同様の手順で簡単に導入できるため、ぜひお試しください。