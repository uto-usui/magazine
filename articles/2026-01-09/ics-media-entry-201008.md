---
title: "次世代のフォント技術　バリアブルフォントの世界"
source: "https://ics.media/entry/201008/"
publishedDate: "2020-10-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

今回の記事では次世代のフォント技術「**バリアブルフォント**」についてお話します。ウェブにおけるタイポグラフィの進化を振り返りつつ、バリアブルフォントが生まれた背景、その魅力について紐解いていきましょう。

### フォントの進化

デジタルフォントはこの半世紀の間にいろいろな進化をたどってきました。フォントのアウトライン化、フォーマット戦争、ウェブフォントの登場などなど……。まずはその歴史をたどっていきます。

#### ビットマップの時代

デジタルフォントの初期に用いられたのはビットマップフォントでした。ビットマップフォントはドットの集合体として表されるフォントです。現在でも一部の端末や、レトロな雰囲気のデザインには用いられることがありますね。

現在よく見るデジタルフォントに比べるとかなり荒々しいビットマップフォントですが、大きな欠点がありました。それは「あらかじめ用意された大きさでしか正しく表示できない」ことです。12pxで表示することを想定したフォントは拡大すると一つ一つのピクセルが大きくなり視認性が悪くなります。それぞれの文字が持つ点の数が一定であるためで、フォントサイズごとにフォントを作成する必要があります。この後に紹介するアウトラインフォントはこの問題を解決した**スケーラブル**なフォントです。

![ビットマップとベクターの違い](https://ics.media/entry/201008/images/images/201008_bitmap.png)

#### アウトラインフォント

アウトラインフォントは点で表すビットマップフォントと違い、ベクターとして描画されます。現在ではほとんどのフォントがアウトラインフォントです。

アウトラインフォントはAdobeが**PostScriptフォント**を開発したところから始まります。それを受けたMicrosoftとAppleは対抗馬として共同で**TrueTypeフォント**を発表しました。TrueTypeフォントの開発はMicrosoft主導で行われました。その結果Windowsマシンでは普及しましたがMacではTrueTypeとPostScriptが共存する形となり、WindowsとMacで互換性がないという問題が生じました。

この問題を解決するため、今度はMicrosoftとAdobeが手を組んで**OpenTypeフォント**を開発します。TrueTypeをベースにPostScriptフォント形式をサポートしたもので、拡張子が複数パターン存在します。PostScript形式のものは`.otf`形式、TrueType形式のものは主に`.ttf`となります。少しややこしいですが、`.ttf`形式のOpenTypeフォントは「TrueType形式のOpenTypeフォント」と呼んだりします。この違いは、TrueTypeフォントとPostScriptフォントのアウトラインの計算方法の違いに由来しています。

▼OpenTypeフォントのなりたち ![オープンタイプの拡張子](https://ics.media/entry/201008/images/201008_opentype.png)

OpenTypeフォントは単にOSの互換性をもっただけでなく、**文字が持てるスタイルの数が大幅に増加**し64,000種のグリフ情報をもてるようになりました。グリフとは文字の形状を司るものです。たとえば画面上に「a」と表示するときはUnicode`U+0061`と、対応したグリフを合わせます。一つのUnicodeには太字や細字、斜体といったグリフも合わせられるため、グリフの数はフォントの表現力の高さと言えるでしょう。

また、OpenTypeフォントでは詳細な字詰めの設定などもできるようになりました。以下はCSSの`font-feature-settings`プロパティでプロポーショナルメトリクスを適用した例です。プロポーショナルメトリクスについては[『文字詰めできるCSSのfont-feature-settingsが凄い！ 日本語フォントこそ指定したい自動カーニング』](https://ics.media/entry/14087/#font-feature-settings)で詳しく解説しています。

![プロポーショナルメトリクスの例](https://ics.media/entry/201008/images/images/201008_proportional.png)

フォントによる表現力は向上の一途をたどりましたが、まだまだ扱える場面は限定されていました。

#### ウェブフォントの登場

OpenTypeの登場によりコンピューターでの文字表現は豊かになりました。しかしウェブに限ってはそうはなりませんでした。なぜなら「コンピューターに入っているフォントしか表示できない」という問題があったからです。

Windowsならメイリオや游ゴシック、Macならヒラギノ角ゴシックファミリーといったフォントはデフォルトでインストールされているため問題なく表示されます。しかし特殊なフォントを`font-family`プロパティに設定しても、フォントを持っていないPCでは表示されません。

この問題への対抗策として現れたのが**ウェブフォント**です。サーバーにフォントファイルを置き、ページの表示時にブラウザに読み込ませる、これで環境に依存せず指定したフォントが表示されます。

ウェブフォントとして用いる際の大きな問題はその巨大なファイルサイズでした。 OpenTypeフォントは64,000種ものグリフ情報をもてます。裏を返せばその分だけファイルサイズは大きくなるということです。さらに、用いるフォントの種類が増えればそのサイズは倍々になります。

現状、ウェブフォントが読み込まれる間は以下の方法でやりくりしています。

-   FOUT（Flash Of Unstyled Text）：ウェブフォントが読み込まれるまでの間は代わりのフォントを表示
-   FOIT（Flash Of Invisible Text）：ウェブフォントが読み込まれるまでテキストを表示しない

FOUTを選べば途中でフォントが切り替わるためユーザー体験がよくない、しかしFOITを選べば通信環境によってはそもそもフォントが表示されない問題も起こります。対策としてJavaScriptによって両者を併用した制御も行われています。

たとえばGoogleやAdobeはJavaScriptによる[Web Font Loader](https://github.com/typekit/webfontloader)を用いた制御を推奨しています。これを用いることでタイムアウト処理やローディング中のクラス制御なども可能になります。フォント自体の形式も、ウェブフォントとして最適化された`.woff`や`.woff2`形式のものを用いるのが主流にはなりました。

しかし、それでも大きなファイルサイズに四苦八苦しているのが現状です。FOIT-FOUT問題が引き起こすユーザー体験の低下をできるだけ解消したい──そんな要望に応えるように生まれたのがバリアブルフォントでした。

#### そしてバリアブルフォントへ

**バリアブルフォント**は2016年9月にApple, Google, Microsoft, Adobeが共同発表しました。

その最大の特徴は、サイズやウェイト、字幅などのパラメーターを**連続的に補完**してくれることにあります。それぞれのパラメーターは**軸**と呼ばれ、その値によって形を変えます。バリアブルフォントには基準となるパターンがいくつか登録されており、軸の値によってそれらの中間値を補完するような見た目になるのです。

こちらは動的にフォントのウェイトと幅を変更するデモです。

![バリアブルフォントデモ１](https://ics.media/entry/201008/images/images/201008_variable_font_demo1.gif)

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/200929_variable_fonts/demo1)
-   [コードを確認する](https://github.com/ics-creative/200929_variable_fonts/blob/master/demo1.html)

このデモで読み込まれるフォントは一種類です。グリフの数だけフォントを読み込む従来のOpenTypeフォントと比べ、小さなサイズで多様なスタイルのフォントを表現できます。ウェブフォントとして用いる際も、より高速な配信が可能になります。

### バリアブルフォントの世界に飛び込もう

以降では、バリアブルフォントについてより詳しく触れてみましょう！

バリアブルフォントを知るにあたって、まずは軸について知る必要があります。標準の軸として「**太さ、幅、イタリック、傾き、オプティカルサイズ**」があります。プログラムからそれぞれの軸にアクセスするときは、プロパティ名を用います。

軸

プロパティ名

太さ（Weight）

`wght`

幅（Width）

`wdth`

イタリック（Italic）

`ital`

傾き（Slant）

`slnt`

オプティカルサイズ（Optical Size）

`opsz`

補完するのは登録された軸のみになります。たとえば`ital`の値が1種類しか登録されていないフォントは`ital`の値によらず一定の傾きをもちます。

オプティカルサイズとは、サイズに連動した文字のスタイルです。フォントサイズが小さなときは簡略化された表記、大きなときは細かく装飾されたフォント、というように設計されることがあります。 標準ではフォントサイズに依存しているため手動での変更はできませんが、一部のフォントでは変更が可能です。先ほどのデモにおいても、オプティカルサイズに応じて文字バランスが微妙に変更されることが確認できますね。

#### Roboto-Flexフォントを例に

バリアブルフォントはまだそれほど普及していないこともあり、入手元がそれほど多くありません。今回は、オープンフォントライセンスで配布されているRoboto-Flexフォントを使用します。

-   [GitHub - Roboto-Flex](https://github.com/googlefonts/roboto-flex)

記事の末尾にバリアブルフォントを配布しているリンクをいくつか貼っておくので参考にしてください。

フォントを入手したらさっそくHTMLに読み込んで……！　と、はやる気持ちを抑えフォントへの理解を深める作業に移りましょう。[『WAKAMAI FONDUE』](https://wakamaifondue.com/)というサイトでは、バリアブルフォントの軸の種類や上限、下限を知れるだけでなくインタラクティブに操作し見た目を確認できます。ここに先ほどダウンロードしたRoboto-Flexを読み込ませてみましょう。

基本の軸である`wght` (Weight) , `wdth` (Width) , `opsz` (Optical Size) , `slnt` (Slant) の他に大文字で表記された軸がいくつかあります。バリアブルフォントでは、開発者がオリジナルの軸を設定することができます。

Roboto-Flexの場合は`GRAD`という軸が設定されており、この軸の値を変更すると`wght`とはまた違った文字の太さの調節を行えます。

ここまでをまとめると、バリアブルフォントの特徴は以下のようになります

-   基本の軸（太さや幅）を持つ
-   オリジナルの軸が設定されたものもある
-   それぞれの軸の上限値、下限値が設定され中間地では補完するような形をとる

### CSSでバリアブルフォントのパラメーターを設定しよう

それではお待ちかね、実際にフォントを表示する作業です。適当なHTMLファイルを作成したあと、CSSを追加していきます。下の手順に従ってスタイルを追加していきましょう。

バリアブルフォントのOS、ブラウザごとの対応状況は以下のページで確認できます。

-   [『Support - Variable Fonts』](https://v-fonts.com/support)

1.  `@font-face`でフォントを読み込む

```
@font-face { 
  font-family: "Roboto Flex";
  src: url("./fonts/RobotoFlex[slnt,wdth,wght,opsz].ttf") format("truetype-variations");   
  font-weight: 100 1000;
  font-stretch: 25% 151%;
}
```

まずはフォントを読み込みます。`font-weight`や`font-stretch`に2つの値を設定しました。これはそれぞれの上限値と下限値になります。

2.  `font-variation-settings`でパラメーターの値を設定する

```
p {
  font-size: 48px;
  font-family: "Roboto Flex", sans-serif;
  font-variation-settings: "wght" 400, "wdth" 90, "GRAD" 1;
}
```

それぞれの軸の値は`font-variation-settings`に「プロパティ名　値」の順で記述します。

実際にブラウザで確認すると、与えた値が適用されていることがわかります。開発者ツールから値を変更すると形が変わります。

![バリアブルフォントデモ２](https://ics.media/entry/201008/images/images/201008_variable_font_param.gif)

#### アニメーションさせてみよう

バリアブルフォントではそれぞれのパラメーターが連続的である特徴を生かし、アニメーションを追加することができます！

```
p {
  font-size: 48px;
  font-family: "Roboto Flex", sans-serif;
  font-variation-settings: "wght" 400, "wdth" 50, "GRAD" 1;
  animation: width-animation 1s ease infinite alternate;;
}

@keyframes width-animation {
  from { font-variation-settings: "wght" 400, "wdth" 50, "GRAD" 1; }
  to   { font-variation-settings: "wght" 400, "wdth" 151, "GRAD" 1; }
}
```

![バリアブルフォントアニメーションデモ](https://ics.media/entry/201008/images/images/201008_variable_font_demo2.gif)

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/200929_variable_fonts/demo2)
-   [コードを確認する](https://github.com/ics-creative/200929_variable_fonts/blob/master/demo2.html)

ここで注意する点としては、アニメーションの前後で変化しない値、上の例だと`whgt`や`GRAD`についても指定してあげることです。指定しなかった場合、デフォルトの値に戻ってしまうため想定したフォントになりません。

▼これはNG例

```
p {
  font-variation-settings: "wght" 400, "wdth" 50, "GRAD" 1;
  animation: width-animation 1s ease infinite alternate;;
}

/*❌‍上で指定したwhgtとGRADの値がリセットされてしまいます！❌*/
@keyframes width-animation {
  from { font-variation-settings: "wdth" 50 }
  to   { font-variation-settings: "wdth" 151 }
}
```

#### CSS変数でパラメーターを管理しよう

軸に与える値はCSS変数で管理すると、何かと便利です。JavaScriptで動的な変更を行う場合など、CSS変数を変更するだけですむからです。

```
:root{
  --wght: 400;
  --wdth: 100;
  --GRAD: 1;
}

p {
  font-size: 48px;
  font-family: "Roboto Flex", sans-serif;
  font-variation-settings: "wght" var(--wght), "wdth" var(--wdth), "GRAD" var(--GRAD);
}
```

JavaScriptから変数を変更する場合は直接CSS変数の値を変更すればよいですが、CSSアニメーションに関してはプロパティそのものを変更しなければアニメーションしないようです。NG例とOK例を記載しておきます。

```
/*❌NG例❌*/
@keyframes width-animation {
  from { --wdth: 25; --wght: 100; }
  to   { --wdth: 151; --wght: 100; }
}
/*OK例*/
@keyframes width-animation { 
  from { font-variation-settings: "wght" 100, "wdth" 25; } 
  to   { font-variation-settings: "wght" 1000, "wdth" 151; }
}
```

#### バリアブルフォントの検索

定番のフォント配信サービスである[Google Fonts](https://fonts.google.com/)と[Adobe Fonts](https://fonts.adobe.com/)には、なんとバリアブルフォントの絞り込み検索機能があります。

![Google FontsとAdobe Fontsのバリアブルフォント絞り込み機能画像](https://ics.media/entry/201008/images/images/201008_google_adobe_variable.jpg)

### 特殊なバリアブルフォント

ここまででバリアブルフォントの強力さを存分に感じてもらえたと思いますが、この仕組みを利用して**文字ではないフォント**も作られています。

[Anicons](https://typogram.github.io/Anicons/)はGoogleマテリアルアイコンを基に作られたバリアブルフォントです。A,B…の文字にそれぞれアイコンが割り当てられています。

軸は`Time`のみで、その値に応じて動きを見せます。

これをCSSアニメーションと組み合わせるとこのような表現が可能になります。

![Aniconsのデモ画像](https://ics.media/entry/201008/images/images/201008_variable_font_demo3.gif)

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/200929_variable_fonts/demo3)
-   [コードを確認する](https://github.com/ics-creative/200929_variable_fonts/blob/master/demo3.html)

バリアブルフォントの技術はこのように応用できるという例を紹介しました。今後もどんなフォントが生まれていくのか楽しみですね。

### 待望の和文フォント登場！

ここまで読んでくださった日本語話者の皆さんは気になっていることがあるのではないでしょうか。

> ところで……和文フォントはあるの？

種類の少ない欧文に比べ、ひらがな、カタカナ、さらに無数の種類がある漢字が含まれる和文は制作コストも高く、フォントファイルとしてもサイズが大きくなってしまうため長らく存在しない状況が続いていました。

しかし！　2021年4月、AdobeからSource Han Sansのバリアブルフォントのリリース発表がありました。日本では源ノ角ゴシックとして親しまれているフォントです。

-   [Source Han Sans（日本語名称：源ノ角ゴシック）がバリアブルフォントに - Adobe Blog](https://blog.adobe.com/jp/publish/2021/04/08/cc-design-source-han-sans-goes-variable)

Source Han Sansのバリアブルフォントでは、前述の「サイズが巨大」という問題を乗り越え現実的なサイズに抑えられています。日中韓のフォントが含まれていますが、日本語のみというように地域別のフォントのみ使用する場合はさらに小さなサイズで導入できます。

> 非バリアブルフォントであるPan-CJK Source Han Sans 2.002フォントのフルセットは593.7MBですが、1つのOTCファイルとしてパッケージ化された同等のバリアブルフォントはわずか32.9MBで、各地域のサブセットフォントはさらに小さくなります。

Source Han Sansのレポジトリから日本語サブセットである[SourceHanSansJP-VF.otf](https://github.com/adobe-fonts/source-han-sans/blob/release/Variable/OTF/Subset/SourceHanSansJP-VF.otf)（7.75 MB）をダウンロードし、上述の[『WAKAMAI FONDUE』](https://wakamaifondue.com/)でWeightを動かしてみました。見事にバリアブルフォントとなっています！

![和文のバリアブルフォント](https://ics.media/entry/201008/images/210419_variable_font_ja.gif)

あわせて、Googleからは[『Noto Sans CJK Variable』](https://github.com/notofonts/noto-cjk/tree/main/Sans/Variable)バリアブルフォントも提供されました。

日本語サイトではなくてはならない[Noto Sans Japanese](https://fonts.google.com/noto/specimen/Noto+Sans+JP?query=noto+sans)、[Noto Serif Japanese](https://fonts.google.com/noto/specimen/Noto+Serif+JP?query=noto+serif)もバリアブルフォントとしてGoogle Fontsから配布されています。

Adobeからは2025年2月に「百千鳥」というレトロなスタイルのバリアブルフォントがリリースされています。

-   [2025年2月 日本語のバリアブルフォント「百千鳥」がついに登場！さらに Adobe Fontsのラインナップが大幅拡充しました](https://blog.adobe.com/jp/publish/2025/02/13/cc-design-adobefonts-2502)

今後はバリアブルフォントがより身近な存在になっていくでしょう。

### まとめ

本記事ではデジタルフォントの歴史を振り返りつつ、次世代のフォント「バリアブルフォント」について紹介しました。

柔軟なバリアブルフォントではありますが、普及というにはまだまだ程遠い状況です。「柔軟すぎる」という点では逆に使いにくい要因のひとつになっていることも想像できます。

とはいえ、これまでのフォントでは難しかった表現がいくつも可能になるためポテンシャルは無限大です。新しいウェブ体験を作る技術の一つとして注目していきましょう！

### 参考文献

-   [モリサワ - フォント用語集](https://www.morisawa.co.jp/culture/dictionary/)
-   [ウェブ上の可変フォントの概要 | Articles | web.dev](https://web.dev/articles/variable-fonts?hl=ja)
-   [可変フォントガイド - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_fonts/Variable_fonts_guide)
-   [Adobe Typekit Blog - Variable fonts, a new kind of font for flexible design](https://blog.typekit.com/2016/09/14/variable-fonts-a-new-kind-of-font-for-flexible-design/)
-   [Glyphs - Creating a Variable Font](https://glyphsapp.com/learn/creating-a-variable-font)：バリアブルフォントの作り方の参考記事です

#### バリアブルフォント配布サイト一覧

-   [Google Fonts](https://fonts.google.com/)：Googleが提供するフォントライブラリで、無料で利用可能なフォントが多数収録されています。
-   [Adobe Fonts](https://fonts.adobe.com/?locale=ja-JP)：基本的には商用利用可能な高品質フォントが揃っていますが、ライセンスは注意が必要です。
-   [Variable Fonts(beta)](https://v-fonts.com/)：名前の通り、有料無料問わず古今東西のバリアブルフォントが紹介されているサイトです
-   [GitHub - TypeNetwork](https://github.com/TypeNetwork)：実験的なオープンフォントライセンスのものが多く、試してみるにはもってこいのレポジトリです。[Decovar](https://github.com/googlefonts/decovar)のようなおもしろいバリアブルフォントが多数開発されているようです
-   [AXISPARAX](https://www.axis-praxis.org/specimens/__DEFAULT__)：バリアブルフォントの実験的なサイトです。ダウンロードはできませんが、さまざまなフォントを試すことができます。個人的に[zycon](https://www.axis-praxis.org/specimens/zycon)というアイコンフォントがお気に入りです。
-   [GitHub - Source Han Sans](https://github.com/adobe-fonts/source-han-sans)：「汎日中韓」フォントである源ノ角ゴシックのセットです。和文のバリアブルフォントが収録されています。
-   [GitHub - Noto Sans CJK](https://github.com/notofonts/noto-cjk)：Googleから配信される和文フォント「Noto Sans CJK」です。「Sans」ディレクトリにバリアブルフォントが収録されています。