---
title: "文字詰めできるCSSのfont-feature-settingsが凄い！ 日本語フォントこそ指定したい自動カーニング"
source: "https://ics.media/entry/14087/"
publishedDate: "2016-12-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

「ウェブでは文字詰めはできない」と諦めていませんか？　美しいタイポグラフィーのためには文字詰めは「当たり前」というデザイナーは多く、DTPやグラフィックデザインの世界では基礎テクニックのひとつとされています。

そんな文字詰めですが、HTMLでも実はCSSの`font-feature-settings`プロパティを指定するだけで**自動カーニングができます**。ほとんどのブラウザがサポートしており、実務でも十分使えます。今回はそんな`font-feature-settings`プロパティの魅力と使いどころを紹介します。

#### この記事のポイント

使い方は簡単。CSSで次のプロパティを設定するだけです。

```
.selector {
  font-feature-settings: "palt";
}
```

左が未指定の状態、右がCSSを適用した状態です。文字が引き締まって表示されています。

![図版：font-feature-settingsで文字詰めをした結果](https://ics.media/entry/14087/images/kerning-font-feature-settings-palt.png)

たったこれだけのコードで自動カーニングが有効になり、**HTMLでの日本語の見た目が見違えるように引き締まります！**「今すぐ使わないと損！　さっそくコピペして試す」と早まる前に、まずは和文フォントの基本的なところから理解を深めておきましょう。

### そもそもウェブの和文フォントは等幅で表示されてた

`font-family`で指定する日本語のデバイスフォント。多くの場合は、「メイリオ」「ヒラギノ角ゴシック体」「游ゴシック体」が定番でしょうか。これらのフォントはOpenTypeフォントという種類で、正方形の仮想ボディーの中に字面が収まるようにデザインされています。

![図版：フォントの仮想ボディー](https://ics.media/entry/14087/images/kerning-font-rect.png)

フォントをそのまま打っただけだとOpenTypeフォントはこの正方形が連続して配置されるので、**日本語文章は等幅の表示となります**。参考までに「メイリオ」「ヒラギノ角ゴシック体」「游ゴシック体」といった定番フォントで検証したので次の図をご覧ください。原稿用紙の升目のようにキッチリと文字が配置されていることを確認できます。

![図版：ウェブのフォントの表示](https://ics.media/entry/14087/images/kerning-device-font.png)

-   [サンプルページを別窓で開く](https://ics-creative.github.io/161128_font-family/sample-mono.html)

おもしろいことに、全角英数字を使っているニュースサイトではこの現象がよくわかります。

![スクリーションショット：NHK NEWS WEB、macOS Chrome 54（記事初版当時のブラウザ）にて](https://ics.media/entry/14087/images/kerning-nhk.png)

さきほど紹介したサイトのように新聞のような組版を意識するなら和文等幅は適しているでしょう。ただ、今までは和文等幅しか選択肢がなかったため、**ウェブデザイナーは「せめて見出しは文字詰めして欲しい！」と訴えても、HTMLコーダーは「ブラウザの仕様だから無理」と返事していたのではないでしょうか**。

※例外として昔のフォント「ＭＳ Ｐゴシック」や「Osaka」はプロポーショナル幅で作られたTrueTypeフォント（TTF）のため、等幅ではなくプロポーショナル幅で表示されます。

### OpenTypeフォントには字詰のための情報が含まれている

CSSの前に一般的なフォントの話をします。OpenTypeフォント（OTF）にはタイポグラフィのためのさまざまなオプション機能があります。このひとつに**フォントの字間情報を制御する「プロポーショナルメトリクス」という機能があります**。フォントデザイナーが設計時に定めた最適な字間の情報が、OpenTypeフォントに含まれているのです。

プロポーショナルメトリクスを有効にすれば、フォントに含まれる字間情報を参照されるので、次のように字間が詰まります。とくにカタカナの「ォ」と「ト」が詰まっているのが確認できるでしょう。

![図版：プロポーショナルメトリクスを有効にすると文字が詰まる](https://ics.media/entry/14087/images/kerning-propotional-metrics.png)

余談ですが、プロポーショナルメトリクスはOpenTypeフォントの機能なので、ソフトウェアが対応していれば利用できます。たとえば、AdobeのPhotoshopやIllustrator、Figma、AppleのKeynoteで指定すればプロポーショナルメトリクスを有効にできます。

![図版：プロポーショナルメトリクスはデザインソフトで有効にできる](https://ics.media/entry/14087/images/images/210512_font_feature_settings_2.png)

![](https://ics.media/entry/14087/images/images/210512_font_feature_settings_3_figma.png)

![](https://ics.media/entry/14087/images/images/210512_font_feature_settings_4.png)

和文フォントの理解が深まったところで、HTMLの文字詰めを学んでいきましょう。

### font-feature-settingsでOTFのオプション機能を有効に

CSSの`font-feature-settings`はOpenTypeのオプション機能を指定するプロパティです。プロポーショナルメトリクスを有効にするには、`palt`を利用します。`palt`はProportional Alternate Widths（代替プロポーショナル幅）の略称です。

`font-feature-settings`プロパティは機能名と有効可否（`0`か`1`、もしくは`off`か`on`）をセットで指定します。`1`（有効）を省略した場合は、`1`が指定されたと見なされるので有効として設定されます。

```
.selector {
  /* プロポーショナルメトリクスを有効にする指定 */
  font-feature-settings: "palt" 1;
}
```

![図版：プロポーショナルメトリクス有無の違い](https://ics.media/entry/14087/images/kerning-font-feature-settings-palt.png)

-   [サンプルページを別窓で開く](https://ics-creative.github.io/161128_font-family/sample-propotional-metrics.html)
-   [ソースコードを確認する](https://github.com/ics-creative/161128_font-family/blob/master/sample-propotional-metrics.html)

#### 句読点や詰まりすぎを考慮すると

`palt`で句読点が詰まって読みづらいときは、別の指定である`pwid`（プロポーショナル字形に置き換える指定）や`pkna`（仮名や仮名関連の字形セットをプロポーショナル字形に置き換える指定）という値を使うといいでしょう。どの値を使うべきかはフォントやサイトの雰囲気にあわせて検討ください。

また、フォントサイズやレイアウトによって最適な字間は異なるものなので、一概にプロポーショナルにすることだけが正解というわけではありません。字間が詰まりすぎているときは`letter-spacing`で整えることも検討するといいかもしれません。

#### 複数の指定も可能

複数のオプション機能を有効にしたい場合はカンマで区切って指定します。たとえば、プロポーショナルメトリクスと旧字体を同時に指定すると次のコードになります。

```
.selector {
  /* プロポーショナルメトリクスと旧字体指定 */
  font-feature-settings: "palt" 1, "trad" 1;
}
```

![図版：フォントの旧字体有無の違い](https://ics.media/entry/14087/images/kerning-trad.png)

▲`trad`を指定すると旧字体で表示されました。戦前の日本みたいですね！

-   [サンプルページを別窓で開く](https://ics-creative.github.io/161128_font-family/sample-trad.html)
-   [ソースコードを確認する](https://github.com/ics-creative/161128_font-family/blob/master/sample-trad.html)

#### 自動カーニング以外にもおもしろい機能が盛りだくさん

プロポーショナルメトリクスだけでなはなく、OpenTypeフォントにはさまざまなオプションが用意されています。たとえば、スワッシュと合字ごうじ（リガチャー）を試してみましょう。

```
.font-swash {
  /* スワッシュを有効にする */
  font-feature-settings: "swsh" 1;
}

.font-liga {
  /* 任意の合字を有効にする */
  font-variant-ligatures: common-ligatures;
  font-feature-settings: "dlig" 1;
}
```

![図版：フォントのスワッシュ有無の違い](https://ics.media/entry/14087/images/kerning-liga.png)

▲スワッシュ「`swsh`」を指定すると筆記体のぐるぐるが印象的に、任意の合字「`dlig`」を指定すると文字が合体して表示されました。タイポグラフィーで遊ぶのはおもしろいですね！

-   [サンプルページを別窓で開く](https://ics-creative.github.io/161128_font-family/sample-liga.html)
-   [ソースコードを確認する](https://github.com/ics-creative/161128_font-family/blob/master/sample-liga.html)

`font-feature-settings`のさまざまなオプション機能はアドビの「[CSS での OpenType 機能の構文](https://helpx.adobe.com/jp/fonts/using/open-type-syntax.html)」が参考になります。使いこなすとタイポグラフィーの自由度が広がり、幅広いデザインの制作に役立つでしょう。

### プロポーショナルメトリクスが有効になるフォントの一覧

このCSSプロパティを使ったからといってすべてのフォントで自動文字詰めができるわけではありません。利用できる条件は、OpenTypeフォントであることとプロポーショナルメトリクス情報が含まれていることの2点です。代表的なフォントだと**「ヒラギノ角ゴシック体」や「ヒラギノ明朝体」「游ゴシック体」「游明朝体」「Noto Sans CJK JP」で利用できます**。

Windows環境で馴染みある「メイリオ」は日本語部分が等幅として設計されているため、プロポーショナルメトリクスの情報は含まれていません。そのため、**「メイリオ」に対してはプロポーショナルメトリクスで字間が詰まりません**。

フォント名

フォントの種類

文字間隔

ＭＳ Ｐゴシック

TrueType

プロポーショナル

ＭＳ Ｐ明朝

TrueType

プロポーショナル

メイリオ

**OpenType**

等幅

Osaka

TrueType

プロポーショナル

ヒラギノ角ゴシック

**OpenType**

**プロポーショナル  
メトリクス含む**

ヒラギノ明朝

**OpenType**

**プロポーショナル  
メトリクス含む**

游ゴシック体

**OpenType**

**プロポーショナル  
メトリクス含む**

遊明朝体

**OpenType**

**プロポーショナル  
メトリクス含む**

Noto Sans CJK JP

**OpenType**

**プロポーショナル  
メトリクス含む**

#### 游ゴシックではプロポーショナルメトリクスは効果的

WindowsやmacOSに搭載されている游ゴシック体は、仮名が漢字に対してかなり小さめにデザインされています。游ゴシック体ではヒラギノ書体より字間が開いて見えてしまうため、プロポーショナルメトリクスを活用する効果は大きいです。

![図版：游ゴシックのプロポーショナルメトリクス](https://ics.media/entry/14087/images/kerning-font-padding.png)

#### Webフォントにもプロポーショナルメトリクスは効果的

デバイスフォントだけでなく、Webフォントでもプロポーショナルメトリクスに対応したOpenTypeフォントがたくさんあります。Webフォントに関しては記事『[Webフォントサービスの徹底比較！ 和文フォントが使える5つのサービスの利点まとめ](https://ics.media/entry/13875/)』を参考ください。

![ウェブフォントでプロポーショナルメトリクスを適用](https://ics.media/entry/14087/images/kerning-webfont.png)

▲左側は未指定（和文等幅）の状態でカタカナの開きが大きい。右側はプロポーショナル字形を適用した状態で、カタカナが詰まっている。

### 対応環境：ほぼすべてのブラウザで利用可能

`font-feature-settings`は現行のモダンブラウザーではすべて対応しています（参照『[Can I use…](https://caniuse.com/font-feature)』）。

![スクリーションショット：font-feature-settingsの利用できるブラウザ](https://ics.media/entry/14087/images/kerning-caniuse.png)

### font-variantとfont-feature-settingsの違い

本記事で説明した`font-feature-settings`と同じことが、CSSの`font-variant`系プロパティでもできます。CSSの`font-variant`系プロパティは`font-feature-settings`より高レベルな指定方法で、シンプルな記述で指定できます。

たとえば、次のプロポーショナル字形の指定について、以下は同じ結果が得られます。

```
.selector1 {
  /* プロポーショナル字形を有効にする */
  font-feature-settings: "pwid" 1;
}

.selector2 {
  /* プロポーショナル字形を有効にする */
  font-variant-east-asian: proportional-width;
}
```

くわしくは記事『[CSSのfont-variant活用術](https://ics.media/entry/250401/)』を参照ください。

ただし、本記事で紹介したプロポーショナルメトリクスの指定は、`font-feature-settings: "palt"`でしかできません。`font-variant-east-asian`プロパティは`font-feature-settings: "pwid"`（プロポーショナル字形）の指定となります（`palt`と`pwid`は似ていますが、異なる指定です）。

### まとめ

従来、文字詰めにこだわりたいときはCSSの`letter-spacing`を一文字ずつ適用しました（参考記事「[HTMLでカーニング！手軽に文字詰めできる「FLAutoKerning.js」 | 株式会社LIG(リグ)](https://liginc.co.jp/designer/archives/8981)」）。この方法はJavaScriptによって文字列を判別しCSSで調整するという高度な方法のため、精度の高い文字詰めができますが、採用しているサイトは少なかったのではないでしょうか。

![スクリーションショット：電通報](https://ics.media/entry/14087/images/kerning-dentsu.png)

▲タイポグラフィにこだわったサイトの例として。「[電通報](https://dentsu-ho.com/)」では一字ごとに要素を分解し、それぞれに文字詰めの情報を適用している

それに対して、CSSの`font-feature-settings`プロパティはOpenTypeフォントの利点を活かせるため、簡単です。腕に自信のあるフロントエンドエンジニアであれば、両方の手法を組み合わせて完璧な文字詰めに挑戦するのもいいでしょう。`font-feature-settings`プロパティと`letter-spacing`プロパティは同時に使えます。

文字詰めの有無はサイトの雰囲気を含めて検討するべきですが、今まで和文等幅しか選択肢がなかったウェブデザインに新しい選択肢が増えました。本文に使うのは影響が大きいというのであれば、見出しにだけ使ってみるといいかもしれません。ぜひ皆さんも`font-feature-settings`を使っていきませんか。