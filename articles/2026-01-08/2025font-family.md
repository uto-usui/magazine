---
title: "2025年に最適なfont-familyの書き方"
source: "https://ics.media/entry/200317/"
publishedDate: "2020-03-17"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ウェブサイトのフォントは何を指定すればよいのでしょうか？　CSSの`font-family`プロパティーに指定可能なフォントは選択肢が多く、HTMLコーダーなら誰もが一度は迷ったことがあるはずです。

`font-family`の組み合わせを紹介している記事は多々あります。しかし、必要のない指定や、考察不足なまま紹介している記事を見かけることは少なくありません。それもそのはず、**フォント事情は日々変化するもの**で、古い情報は役立たないことが多いためです。

本記事ではフォントに関わるここ最近の出来事を取り上げつつ、教訓から学んだ変化に強い「**無難**」なフォント指定を紹介します。

### 結論

いきなり結論ですが、以下のフォントの組み合わせがオススメです。CSSの`body`セレクターなどにコピー＆ペーストして利用ください。

```
body {
  font-family: "Helvetica Neue",
    Arial,
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    Meiryo,
    sans-serif;
}
```

以下では、詳しい理由を説明します。

### コンセプトは「無難」

上記で紹介した組み合わせは最適解のひとつにすぎません。ウェブのフォント指定は幅広い選択肢があり、シチュエーションによっては他にも適した選択も考えられます。このフォントの組み合わせは、**多くのウェブ制作者にとっての最大公約数**の解決案となることを目指して検討しました。

-   容量の肥大化を回避する
-   納品後の保守のリスクを避ける

ウェブ制作を受託で対応している場合、納品後のソースコードを編集できないケースは少なくありません。納品後においても一定期間（たとえば瑕疵担保責任かしたんぽせきにんの期間など）問題が起きないようにしておきたいところです。そう考えると、「無難」なフォント選定はビジネス観点でも無視できません。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.006.png)

### ウェブフォントは課題が多い

ウェブフォントはフォントファイルを配信することで、**どの環境下においてもフォントの見栄えを統一できる仕組み**です。そのためウェブフォントを使うことがデザイン観点でも保守観点でも正解のように考えられます。しかし、ウェブフォントには容量が大きいという悩ましい課題があります。

![](https://ics.media/entry/200317/images/200317_fontfamily_webfont.png)

日本語フォントは常用漢字で約2,000字も存在するため、一般的に容量が数メガバイトになります。代表的なフォントとして[Noto Sans JP](https://fonts.google.com/specimen/Noto+Sans+JP?selection.family=Noto+Sans+JP)は1ウェイトあたり1.6MBです。RegularとBoldの2つのウェイトを使うと、3.2MBにも達します。Googleの推奨は1ページあたり1.6MBとされているので（[参照](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/)）、**ウェブフォントを導入すればすぐに推奨容量を超えてしまいます**。

かねてよりウェブサイトの配信高速化はKPI向上やSEO観点でも重要と言われてきました。「**1秒の表示遅延で、コンバージョンレートが最大20%悪化する**」、「**ページの表示速度はGoogle検索のランキング要素になりうる**」など。もちろん、エンドユーザー観点で読み込みが早いに超したことはないでしょう。

-   参考記事『[サービスにおいて速さこそが神である｜深津 貴之 (fladdict)](https://note.com/fladdict/n/n6a96cd4abeeb)』
-   参考記事『[Googleがスピードアップデートを導入、2018年7月からページ表示速度をランキング要因に | 海外SEO情報ブログ](https://www.suzukikenichi.com/blog/google-will-roll-out-speed-update-in-july-2018/)』

残念ながら日本語ウェブフォントは容量が巨大なため、**導入すればページ表示速度を損なう可能性**があります。「デザインへの強いこだわり」と「高速配信」とを天秤にかけ、ウェブフォントの採用は慎重に判断するべきでしょう。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.005.png)

#### コラム：高速化を実現する技術

容量の大きいウェブフォントを解決する手段には以下があります。

-   ダイナミックサブセット（ページ内で利用する文字だけ配信する仕組み）
-   CDNによるブラウザキャッシュ
-   サービスワーカーとオフラインキャッシュ

ただ、ウェブサイトのさまざまな用途を考慮すると、これらは万能な解決策にはなりません。

-   ダイナミックサブセットは配信が最低限になるが、別ページへの遷移時にはサブセットのキャッシュが効かない
    -   別ページでは再度サブセットの取得が必要となる
-   ブラウザキャッシュは、いろんなウェブサイトの取り合いになっていて、キャッシュヒットしない可能性がある。25.5%はキャッシュにヒットしなかったという[Facebookのレポート](https://engineering.fb.com/2015/04/13/web/web-performance-cache-efficiency-exercise/)がある
-   サービスワーカーによるキャッシュ機構を構築できたとしても、効果が生まれるのは2度目のアクセスから
    -   初回アクセスの速度は向上しない
    -   記事系のコンテンツだと、ユーザーは一度しかアクセスしない

### 目指すは長期的に安定したフォントの組み合わせ

長期的な運用において、フォント表示に影響を与える要因は、ブラウザとOSのアップデートです。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.007.png)

過去を振り返れば、ブラウザとOSのアップデートがさまざまな問題を引き起こしてきました。ウェブサイトの配信元にしてみれば、**何もしていないのにウェブサイトのフォント表示が突然おかしくなる**わけです。今までに起きたフォント変遷の歴史をおさらいしてみましょう。

### sans-serifは万能なフォント？

`sans-serif`はブラウザにフォント指定を委ねる総称フォントです。

ユーザーが設定しない限り、ブラウザにはデフォルトのフォントが指定されています。OSに新しいフォントが搭載されても、デフォルトフォントはめったに変更されることがありません。そういった意味では`sans-serif`は新しいフォント体験を得ることはできないものの、比較的影響の少ない安全な選択とも言えるでしょう。

```
body {
  font-family: sans-serif;
}
```

とはいえ、2017年にWindowsのChromeとFirefoxで`sans-serif`がＭＳ Ｐゴシックからメイリオへ変更となりました。総称フォントは時代の流れをうけることを認識した出来事でした。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.009.png)

#### sans-serifが明朝体になった

2019年のmacOS Catalinaリリース時に、Chromeの`sans-serif`が明朝体で表示される現象が発生しました。macOSでは`sans-serif`は「ヒラギノ角ゴシック ProN」がもともと割り当てられていたのですが、macOS CatalinaのChromeでトラブルがあり明朝体が割り当てられてしまったのです。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.018.png)

結果的に、多くのウェブサイトで明朝体が表示されていました。Amazonや楽天といった大手のウェブサイトで、この現象が発生していたのです。日本語フォントが適切に設定されていないと、海外の怪しい偽サイトのようですよね。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.021.png)

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.020.png)

この問題は、Chromeの根の深いところから修正する必要があったようで、5か月後のChrome 80（2020年2月）がリリースされるまで解消しませんでした。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.022.png)

2025年4月、Windows Updateにより「Noto Sans JP」がWindows 11に標準搭載されました。いまではChrome・Edgeの`sans-serif`には「Noto Sans JP」が割り当てられています。

![](https://ics.media/entry/200317/images/images/200310_FontFamily_notosansjp_windows_250414.png)

ウェブ制作者にとって嬉しい変化ですが、次の記事のように不満の声もあったようです。使い慣れたフォントが変化することを好まないユーザーも多いと言えます。

-   『[Windows 10/11のパッチをあてたら、Webページのフォントが変わった？　戻し方はこれ - やじうまの杜 - 窓の杜](https://forest.watch.impress.co.jp/docs/serial/yajiuma/2006058.html)』

「ＭＳ Ｐゴシック」から「メイリオ」、そして「Noto Sans JP」と、`sans-serif`はブラウザ・OSの進化に伴って変化してきました。そのたびにユーザーの不満が出てきたことも心に留めておきましょう。

### 極端に太いbold表示

iOS 13 Safariで極端に太いフォントで表示される現象が起きました。`font-weight: bold`で指定された箇所が見慣れない太さで表示されることになったのです。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.025.png)

iOS 13.0の`sans-serif`で、`Hiragino Sans`の`font-weight: bold`では従来の`W6`ではなく`W8`が割り当てられてしまったのです。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.026.png)

太字の箇所をハイライトしてみます。どうでしょうか、違和感はありますか？

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.027.png)

iOS 13.0のHiragino Sansには3種類のウェイトが入っています。`font-weight: bold`はウェイト700を適用する指定ですが、`W7`は入っていないので、代わりに`W8`が適用されてしまったのです。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.028.png)

現在は、`font-weight: bold;`で問題なく表示されますが、当時の対策として具体的な数値を示す方法がありました。

```
/* NG */
font-weight: bold;

/* 一時的な対策 */
font-weight: 600;
```

※ 2020年の記事公開時は`font-weight: 600;`で対策する方法を紹介していました。ただ、Android OS（日本語）では太字が表示されない現象があったため、現在は`font-weight: bold;`のほうが望ましいです。

### かすれる游ゴシック

游書体はWindows 8とOS X Mavericksで搭載されたフォントです。Windowsでは「游ゴシック」、macOSでは「游ゴシック体」と名前が異なるなど微妙な違いはあれど、基本的に同じ書体となります。そのため、「**WindowsとMacで同じ見栄えが実現できる**」とウェブ制作者に夢をみせてくれました。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.011.png)

この游ゴシックには大きな問題が知られています。Windowsマシンで文字がかすれてしまい、可読性が著しく下がってしまうのです。以下のスクリーンショットは游ゴシックとメイリオを比べたものですが、游ゴシックは薄く読みづらいことがわかると思います。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.012.png)

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.013.png)

かすれる原因は記事『[游ゴシックは何故Windowsでかすれて見えるのか - Ryusei’s Notes](https://mandel59.hateblo.jp/entry/2016/11/11/012654)』の考察が詳しいです。Windowsのフォントレンダリングが適切でないことに言及されています。

解決策として`font-face`を利用する妙案が編み出されました。2016年の記事『[ピクセルグリッドのフォント選定と実装のプロセス - フォントの実装 | CodeGrid](https://www.codegrid.net/articles/2016-choosing-fonts-3)』で発表され画期的な解決手段と話題になったことがあります。

しかし、Chrome 62で`font-face`が効かなくなりました（現在は解消済み）。この解決案も万全とはいえず、ブラウザの影響を受けてしまったのです。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.014.png)

#### コラム：新しい総称フォント system-ui は万能ではない

`sans-serif`のほかに総称フォントとして`system-ui`という新しい指定があります。OSのUIフォントを適用するというものです。`system-ui`はWindows 10で游ゴシックが割り当てられます。游ゴシックは先述の通りかすれ問題が発生するため、万人に受け入れられる本文用フォントとは言いがたいでしょう。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.015.png)

このような事情から、游ゴシックはベストな選択肢とは言いがたいのが現状です。

### アンチエイリアスの変化

ディスプレイ上のフォントは曲線を滑らかにするため、アンチエイリアスという表示処理が使われています。このアンチエイリアスには二種類の方法があります。グレースケール方式とサブピクセル方式です。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.033.png)

拡大すると滲み方が白黒の濃淡だけなのに対して、サブピクセル方式だと赤緑青の滲み方が確認できます。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.034.png)

2018年のmacOS Mojaveの登場で、デフォルトのテキストアンチエイリアス方式が変化しました。一般的にサブピクセル方式よりグレースケール方式のほうが細くみえるため、**ウェブサイトのフォントまで細くなってしまった**のです。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.032.png)

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.035.png)

シビアだったのは、コントラストの低い環境（文字と背景の色が近い）での可読性です。とくに細いフォントは読みづらくなりました。さまざまな技術的事情で可読性を確保できない可能性があるため、**細いウェイトのフォントは避けるのが無難**でしょう。

![](https://ics.media/entry/200317/images/200310_FontFamily_2020.036.png)

### San Franciscoを使いたい、が…

Appleには可読性に優れたSan Franciscoというフォントが搭載されています。ブラウザでは`font-family`に`-apple-system`と`BlinkMacSystem`を指定することで、San Franciscoで表示できます。

![](https://ics.media/entry/200317/images/200317_fontfamily_sanfrancisco.png)

この特殊なフォント指定はブラウザ側で割り当てが変化する可能性もあります。実際にもすでに変更が行われており、従来は`-apple-system`には**欧文フォントのみ**がSan Franciscoが割り当てられていたものの、現在では**和文にヒラギノ書体**（それも通常より1px程度小さい特殊なヒラギノ書体）が適用されるようになりました。

![](https://ics.media/entry/200317/images/200317_fontfamily_apple-system.png)

▲`-apple-system`の和文フォントは`Hiragino Kaku Gothic ProN`よりわずかに小さい

San Franciscoは人気のフォントなので、モダンなウェブサイトを目指して採用したいHTMLコーダーもいるでしょう。ただ、執筆時点では`-apple-sytem`等の指定は大きな問題が起きていませんが、欧文に限らず和文への影響も考慮すると安全策として避けるのが無難です。

### 各OSのフォント指定はどれがいいか

フォントにまつわる変遷の出来事を振り返ってきました。「過去に起きたことは今後も起こりうる」という消極的な姿勢からフォントの組み合わせを検討してみます。

#### macOS/iOS/iPadOSの欧文フォント

欧文フォントには[定番](http://www.kaminotane.com/2019/05/30/4626/)の`Helvetica Neue`を使います。San Francisco登場前は`Helvetica Neue`がApple系OSの既定フォントだった時期があります（iOS 7〜8）。

#### macOS/iOS/iPadOSの和文フォント

ヒラギノ書体を使います。ヒラギノ書体にもいくつか種類がありますが、伝統的な`Hiragino Kaku Gothic ProN`を優先し、`Hiragino Sans`はフォールバックに指定します。

-   `Hiragino Sans`が必要な理由：
    -   `ヒラギノ角ゴ Pro`と`ヒラギノ角ゴ ProN`はmacOS Catalina（2019年）以降はバンドルされていないので、CSSで`Hiragino Kaku Gothic ProN`を指定しても、macOS Firefoxではフォントがあたらない。そのため、`Hiragino Sans`のフォールバックが必要となる。
-   `Hiragino Kaku Gothic ProN`が必要な理由：
    -   macOSとiOSに搭載されている`Hiragino Sans`のウェイトの種類が異なるので、扱いが容易な`Hiragino Kaku Gothic ProN`を優先にしている。Safariは`Hiragino Kaku Gothic ProN`を指定すると`ヒラギノ角ゴ ProN`ではなく、`Hiragino Sans`の該当ウェイトにマッピングされているようだ。

游ゴシック体は以下の理由から除外しています。

-   游ゴシック体はmacOSでは追加ダウンロードのフォント扱いである（[macOSの初期状態で入っていない](https://support.apple.com/ja-jp/101429)）
-   iOS/iPadOSでは游ゴシック体は入っていない

ちなみに今の時代、フォントの英語名と日本語名の両方を指定する必要ありません。英語名だけでOKです。

```
body {
  /* NG例 */
  font-family:
    "Hiragino Kaku Gothic ProN",
    "ヒラギノ角ゴ ProN W3",
    sans-serif;
}
```

#### Windowsの欧文フォント

Windowsでは`Arial`と`Segoe UI`が選択肢に挙げられます。`Segoe UI`と`Meiryo`との組み合わせは悪くないですが、この組み合わせは個性があります（ウェブサイトの雰囲気が一気にMicrosoft色に染まります）。

![](https://ics.media/entry/200317/images/200317_fontfamily_arial.png)

幸いにも`Helvetica Neue`と`Arial`は[生い立ちから](https://ja.wikipedia.org/wiki/Arial)字形が似ているため、`Arial`を使っておけばApple系OSとWindowsでの表示差異をおさえることができます。

#### Windowsの和文フォント

2025年時点では、無難にメイリオ（`Meiryo`）を使います。

ただ、2025年4月のWindowsの更新プログラムで搭載された「Noto Sans JP」も有力な選択肢となりました。Noto Sans JPを使う場合は、冒頭のCSSは次の通りとなります。`Meiryo`よりも優先指定します。「Noto Sans JP」を使えば、WindowsとAndroidでの表示が統一されます。

```
body {
  /* 「Noto Sans JP」をWindowsで指定 */
  font-family: "Helvetica Neue",
    Arial,
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    "Noto Sans JP",
    Meiryo,
    sans-serif;
}
```

もしくは、Windows 10 October 2018 Updateで搭載されたBIZ UDPゴシック（`BIZ UDPGothic`）もいいでしょう。

```
body {
  /* 「BIZ UDPゴシック」をWindowsで指定 */
  font-family: "Helvetica Neue",
    Arial,
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    "BIZ UDPGothic",
    Meiryo,
    sans-serif;
}
```

なお、参考までに`BIZ UDGothic`はmacOS Sonata 14でも採用されています（`BIZ UDPGothic`は採用されていません）。

`BIZ UDPGothic`は標準搭載から数年経過したものの、知名度が低いことが欠点です。モダンな癖の強いメイリオよりは、`BIZ UDPGothic`は個性が少なく扱いやすいと思うのですが。

![](https://ics.media/entry/200317/images/200317_fontfamily_windows.png)

▲各ブラウザでのWindowsの和文フォントの見え方

游ゴシックはフォントのかすれ問題のため候補から外します。`ＭＳ Ｐゴシック`は[ダサい](https://news.mynavi.jp/techplus/article/20150611-mspg/)ので論外です。

#### Androidは欧文・和文ともにsans-serif

Androidのフォント指定はほとんど効果がないので、`sans-serif`にします。一般的なAndroidならば欧文に`Roboto`と和文に`Noto Sans JP`が使われています（[Material Designの推奨](https://fonts.google.com/noto/use)）。ただ、Xperiaなどメーカー側でデフォルトフォントがカスタマイズされている場合があるので、Androidでのフォント指定は諦めているというのが正直なところです。

-   [Xperia(Android 7)のフォントがウェブ制作者にとって残念 - posfie](https://posfie.com/@clockmaker/p/3qEZ6ku)

### まとめ

ユーザーは見慣れたフォントに愛着があり、変化を好まない傾向があります。対して、ブラウザやOSの実装は今まで何度も変わってきました。安定したフォント表示を提供するには**作る側は常に最新の情報を追いかける必要があります**。

新しいOSやブラウザは正式リリース前の開発者版を通して検証することもできます。ウェブ制作者は外的要因から意図しない変化が適用されないよう、常にフォント事情をキャッチアップしていきましょう。

ICS MEDIAではウェブのフォント指定について記事をまとめてきました。以下の記事も参考くださいませ。

-   [文字詰めできるCSSのfont-feature-settingsを使おう](https://ics.media/entry/14087/)
-   [文章の折り返し指定のCSS最新版](https://ics.media/entry/240411/)
-   [CSSで文節の折り返しを！ br・wbrとauto-phraseの活用術](https://ics.media/entry/241105/)
-   [フォントをもっと自由に！ CSSのfont-variant活用術](https://ics.media/entry/250401/)
-   [CSSでテキストの上下余白が調整可能に！text-box-trimの使い方](https://ics.media/entry/250319/)
-   [高品質なオススメ日本語Webフォント10選](https://ics.media/entry/13498/)
-   [次世代のフォント技術 バリアブルフォントの世界](https://ics.media/entry/201008/)

#### 更新履歴

-   2020年3月17日 初版
-   2021年8月18日 `font-weight:600`を推奨する説明を`font-weight:bold`へ変更
-   2022年4月13日 macOS Firefoxで`Hiragino Kaku Gothic ProN`が無視される説明を追加
-   2025年4月14日 Windows 10/11に搭載された「Noto Sans JP」の説明を追加