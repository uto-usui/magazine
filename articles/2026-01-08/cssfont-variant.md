---
title: "フォントをもっと自由に！ CSSのfont-variant活用術"
source: "https://ics.media/entry/250401/"
publishedDate: "2025-04-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "iwama"
---

2025年4月1日 公開 / [株式会社ICS 岩間 日菜](https://ics.media/entry/staff/iwama/)

`font-variant`プロパティを使用すると、**フォントの特定のスタイルや装飾を制御**できます。これは、OpenTypeフォントのさまざまな機能を有効化するためのプロパティであり、細かい文字の見た目を調整するために役立ちます。この記事では、`font-variant`の各種プロパティについて、とくに日本語フォントに役立つものに焦点を当てて紹介します。

`font-variant`プロパティを適用するには、使用するフォントが対応するOpenType機能をサポートしている必要があります。サポートされていない場合、指定したプロパティが適用されないことがあります。

### font-variant-east-asian

`font-variant-east-asian`プロパティはその名の通り、**日本語や中国語など、東アジアの文字の字形**を指定できます。指定できる値はいくつかありますが、その中から2つを紹介します。

#### font-variant-east-asian: proportional-width

`font-variant-east-asian`プロパティの値に`proportional-width`を指定すると、OpenTypeフォント内のプロポーショナルな字形が適用され、**文字が可変幅で表示されます**。この設定は、`font-feature-settings`プロパティの「`"pwid" 1`」と同じ効果があります。`font-variant`を使う理由については後述します。

▼ デモのスクリーンショット

![font-variant-east-asianプロパティの値にproportional-widthを指定した場合と指定なしの場合の表示を比較した画像。proportional-widthを指定した場合、指定なしの場合より一文字一文字の幅が狭い](https://ics.media/entry/250401/images/250401_font-variant-east-asian-01.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250401_font-variant/sample/font-variant-east-asian-width/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250401_font-variant/blob/main/sample/font-variant-east-asian-width/index.html)

▼ HTML（一部抜粋）

```
<div>
  <h2>① font-variant-east-asian: proportional-width;</h2>
  <p class="proportional-width">おはよう。３月２４日、ヨロシクお願いします！</p>
</div>
<div>
  <h2>② 指定なし</h2>
  <p>おはよう。３月２４日、ヨロシクお願いします！</p>
</div>
```

▼ CSS（一部抜粋）

```
.proportional-width {
  font-variant-east-asian: proportional-width;
}
```

「プロポーショナルな字形」は、字詰めに関する設定である「プロポーショナルメトリクス」とは異なります。プロポーショナルメトリクスを設定したい場合は、`font-feature-settings`プロパティで`"palt"`を指定する必要があります。`font-feature-settings`プロパティについては、以下の記事で詳しく紹介しています。

-   [文字詰めできるCSSのfont-feature-settingsが凄い！日本語フォントこそ指定したい自動カーニング](https://ics.media/entry/14087/)

#### font-variant-east-asian: traditional

`font-variant-east-asian`プロパティの値に`traditional`を指定すると、一部の漢字が旧字や中国語の繁体字で表示されます。

▼ デモのスクリーンショット

![font-variant-east-asianプロパティの値にtraditionalを指定した場合と指定なしの場合の表示を比較した画像。traditionalを指定した場合、「台湾」の台と湾、「仙台」の台、「芸大」の芸が旧字で表示されている](https://ics.media/entry/250401/images/250401_font-variant-east-asian-02.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250401_font-variant/sample/font-variant-east-asian-traditional/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250401_font-variant/blob/main/sample/font-variant-east-asian-traditional/index.html)

▼ HTML（一部抜粋）

```
<div>
  <h2>① font-variant-east-asian: traditional;</h2>
  <p class="traditional">台湾　仙台　芸大</p>
</div>
<div>
  <h2>② 指定なし</h2>
  <p>台湾　仙台　芸大</p>
</div>
```

▼ CSS（一部抜粋）

```
.traditional {
  font-variant-east-asian: traditional;
}
```

### font-variant-emoji

通常、絵文字はブラウザがOS指定のフォントで表示します。そのため、環境によって見た目が異なり、意図しない表示になることがあります。`font-variant-emoji`を使用すると、**絵文字の表示方法を明示的に指定**できます。

▼ デモのスクリーンショット

![font-variant-emojiプロパティの値にemojiを指定した場合とtextを指定した場合の絵文字の表示を比較した画像。emojiを指定した場合はカラフルで立体的な絵文字が、textを指定した場合は黒い簡素な絵文字が表示される。](https://ics.media/entry/250401/images/250401_font-variant-emoji.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250401_font-variant/sample/font-variant-emoji/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250401_font-variant/blob/main/sample/font-variant-emoji/index.html)

▼ HTML（一部抜粋）

```
<div>
  <h2>① font-variant-emoji: emoji;</h2>
  <p class="variant-emoji">☎　♥　✈</p>
</div>
<div>
  <h2>② font-variant-emoji: text;</h2>
  <p class="variant-text">☎　♥　✈</p>
</div>
```

▼ CSS（一部抜粋）

```
.variant-emoji {
  font-variant-emoji: emoji;
}
.variant-text {
  font-variant-emoji: text;
}
```

これは、**Unicode**における異体字セレクター（バリエーションセレクター）の概念に基づいています。絵文字には、以下の2種類の表示方法があり、通常は環境によって適切なものが選ばれます。

-   テキスト（text）表示: `U+FE0E`を適用した場合、絵文字はフォントに依存したモノクロのテキストとして表示されます。
-   絵文字（emoji）表示: `U+FE0F`を適用した場合、カラフルな絵文字として表示されます。

たとえば、`U+2665`（♥️）に`U+FE0E`をつけると「♥」のようなテキスト風のハートに、`U+FE0F`をつけると「♥️」のようなカラフルな絵文字になります。

▼ デモのスクリーンショット

![Unicodeの違いによる絵文字の表示を比較した画像。「Unicode：U+2665U+FE0E（16進数：♥&FE0E）」ではテキスト風の黒い♥ハートに、「Unicode：U+2665U+FE0E（16進数：♥&FE0F）」では赤くやや立体的なハートが表示される。](https://ics.media/entry/250401/images/250401_font-variant-emoji-unicode.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250401_font-variant/sample/font-variant-emoji-unicode/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250401_font-variant/blob/main/sample/font-variant-emoji-unicode/index.html)

▼ HTML（一部抜粋）

```
<div>
  <h2>Unicode：U+2665U+FE0E（16進数：&amp;#x2665&amp;FE0E）</h2>
  <p>&#x2665;&#xFE0E;</p>
</div>
<div>
  <h2>Unicode：U+2665U+FE0E（16進数：&amp;#x2665&amp;FE0F）</h2>
  <p>&#x2665;&#xFE0F;</p>
</div>
```

2025年3月現在、Chrome・Edge 131（2024年11月）以降で対応しています。主要なモダンブラウザのなかでは、SafariとFirefoxが未対応となっています。

-   [Can I use…](https://caniuse.com/mdn-css_properties_font-variant-emoji)

### font-variant-alternates

`font-variant-alternates`プロパティを使用すると、特定のフォントで、代替字体（グリフ）を指定できます。ただし、フォント自体が代替字体をサポートしている必要があります。

#### font-variant-alternates: swash()

その中でも、`font-variant-alternates: swash()`を使うとスワッシュ字形を適用できます。スワッシュ字形とは、筆記体のように装飾が施された字体のことです。たとえば、アルファベットの「T」の先端がカーブするなどの変化を加えられます。

▼ デモのスクリーンショット

![font-variant-alternatesプロパティの値にswashを指定した場合と指定なしの場合の表示を比較した画像。テキストは「こんにちは！　ICS MEDIA　です。」。swashを指定したほうは「ICS MEDIA」の文字が筆記体のように装飾されている。](https://ics.media/entry/250401/images/250401_font-variant-alternates.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250401_font-variant/sample/font-variant-alternates/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250401_font-variant/blob/main/sample/font-variant-alternates/index.html)

▼ HTML（一部抜粋）

```
<div>
  <h2>① font-variant-alternates: swash();</h2>
  <p class="text swash">こんにちは！　ICS MEDIA　です。</p>
</div>
<div>
  <h2>② 指定なし</h2>
  <p class="text">こんにちは！　ICS MEDIA　です。</p>
</div>
```

▼ CSS（一部抜粋）

```
@font-face {
  font-family: MonteCarlo;
  src: url("../../assets/fonts/MonteCarlo-Regular.woff2");
}
@font-feature-values "MonteCarlo" {
  @swash {
    fancy: 1;
  }
}
.text {
  font-family: "MonteCarlo", serif;
}
.swash {
  font-variant-alternates: swash(fancy);
}
```

`swash()`の引数には、`@font-feature-values`アットルールを使って独自の名前を定義できます。詳しくは以下のMDNのページをご確認ください。

-   [font-variant-alternates - CSS: カスケーディングスタイルシート | MDN - スワッシュ字体の有効化](https://developer.mozilla.org/ja/docs/Web/CSS/font-variant-alternates#%E3%82%B9%E3%83%AF%E3%83%83%E3%82%B7%E3%83%A5%E5%AD%97%E4%BD%93%E3%81%AE%E6%9C%89%E5%8A%B9%E5%8C%96)

### font-variant-position

`font-variant-position` プロパティを使用すると、文字を上付き（`superscript`）または下付き（`subscript`）として配置できます。一方、`<sup>`タグや`<sub>`タグも、ブラウザのデフォルトスタイルシートで`vertical-align`と`font-size`を調整することで、上付き・下付き文字を実現しています。しかし、`font-variant-position`プロパティはあくまでフォントのバリエーションとして視覚的に位置を調整するものです。タグを使用した場合と異なり、行の高さに影響を与えません。そのため、行間を維持しながら上付き・下付きの表記を調整できます。

-   `super` ： 上付き文字（指数・べき乗表記など）
-   `sub` ： 下付き文字（化学式・数学記号など）

▼ デモのスクリーンショット

![supタグ・subタグを使用した場合とfont-variantを使用した場合の表示を比較した画像。supタグ・subタグを使用した場合、font-variantを使用する場合に比べて上付き or 下付きの数字が大きく表示されている。](https://ics.media/entry/250401/images/250401_font-variant-position-01.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250401_font-variant/sample/font-variant-position/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250401_font-variant/blob/main/sample/font-variant-position/index.html)

▼ HTML（一部抜粋）

```
<div>
  <h2>① font-variant-position: super;</h2>
  <p>円の面積はπr<span class="super">2</span>で求められます</p>
</div>
<div>
  <h2>② &lt;sup&gt;タグ</h2>
  <p>円の面積はπr<sup>2</sup>で求められます</p>
</div>
<div>
  <h2>③ font-variant-position: sub;</h2>
  <p>水の化学式はH<span class="sub">2</span>Oです</p>
</div>
<div>
  <h2>④ &lt;sub&gt;タグ</h2>
  <p>水の化学式はH<sub>2</sub>Oです</p>
</div>
```

▼ CSS（一部抜粋）

```
.super {
  font-variant-position: super;
}
.sub {
  font-variant-position: sub;
}
```

![supタグ・subタグを使用した場合とfont-variantを使用した場合の表示を比較した画像。supタグ・subタグを使用した場合、font-variantを使用する場合に比べて上付き or 下付きの数字が大きく表示されている。](https://ics.media/entry/250401/images/250401_font-variant-position-02.jpg)

### font-variant-numeric

`font-variant-numeric` プロパティを使用すると、数字の表示方法を細かく指定できます。分数（`diagonal-fractions`, `stacked-fractions`）やスラッシュ付きゼロ（`slashed-zero`）などの表現が可能です。ただし、ほとんどの日本語フォントは`font-variant-numeric`プロパティに対応していません。

また、`stacked-fractions`には以下の制限があります。

1.  **分母が分子より大きい場合にしか適用されない**

-   例： `1/2` → ✅ 適用される
-   例： `2/1` → ❌ 適用されない

2.  **分母・分子ともに1桁までしか表示できない**

-   例： `3/4` → ✅ 適用される
-   例： `12/34` → 🔺 スラッシュ前後の数字のみ適用される（この場合は2/3のみが分数として表示される）

▼ デモのスクリーンショット

![font-variant-numericプロパティの値を変更した場合と、指定なしの場合の表示を比較した画像。diagonal-fractionsを指定した場合、分数（例: 12/25）が斜めの分数形式で表示される。slashed-zeroを指定すると、数字の「0」に斜線が入る。stacked-fractionsを指定すると、分数が縦に積み重ねられた形式で表示される。ただし、スラッシュの前後が同じ数字（例: 2/2）の場合は適用されない。指定なしの場合は、通常のテキストとして表示される。](https://ics.media/entry/250401/images/250401_font-variant-numeric.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250401_font-variant/sample/font-variant-numeric/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250401_font-variant/blob/main/sample/font-variant-numeric/index.html)

▼ HTML（一部抜粋）

```
<div>
  <h2>① font-variant-numeric: diagonal-fractions;</h2>
  <p class="diagonal-fractions">12/25</p>
</div>
<div>
  <h2>② font-variant-numeric: slashed-zero;</h2>
  <p class="slashed-zero">30</p>
</div>
<div>
  <h2>③ font-variant-numeric: stacked-fractions;</h2>
  <p class="stacked-fractions">10/30</p>
  <!-- ↓ スラッシュ前後の数字が同じ（2=2）であるため適用されない -->
  <p class="stacked-fractions">12/25</p>
  <p class="stacked-fractions">16/75</p>
</div>
<div>
  <h2>④ 指定なし</h2>
  <p>12/25</p>
  <p>30</p>
</div>
```

▼ CSS（一部抜粋）

```
.diagonal-fractions {
  font-variant-numeric: diagonal-fractions;
}
.slashed-zero {
  font-variant-numeric: slashed-zero;
}
.stacked-fractions {
  font-variant-numeric: stacked-fractions;
}
```

### font-variant-ligatures

`font-variant-ligatures`プロパティは、合字（リガチャー）を設定するために使用します。リガチャーとは、2文字以上の文字を1つのグリフに結合したものです。たとえば、「fi」や「fl」のような組み合わせがリガチャーとして表示されることがあります。フォントにリガチャー機能が備わっている場合のみ、プロパティが適用されます。

▼ デモのスクリーンショット

![font-variant-ligaturesプロパティを適用した場合と、指定なしの場合の表示を比較した画像。テキストは「fluffy file final office」。font-variant-ligaturesプロパティを適用すると「fl」「fi」「ff」が若干重なって表示される。](https://ics.media/entry/250401/images/250401_font-variant-ligatures.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250401_font-variant/sample/font-variant-ligatures/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250401_font-variant/blob/main/sample/font-variant-ligatures/index.html)

### font-variant-caps

`font-variant-caps`プロパティは、アルファベットの大文字・小文字を制御するために使用します。`font-variant-caps`プロパティを使うと、スモールキャップ（小型の大文字）や、オールスモールキャップなどを適用できます。指定されたフォントに複数の異なる大きさで大文字の字形が含まれている場合、最適なものが選択されます。

▼ デモのスクリーンショット

![font-variant-capsプロパティの値を変更した場合と、指定なしの場合の表示を比較した画像。テキストは「Hello world!」。small-capsを指定すると文章全体が大文字で、最初のHと最後の!が大きく表示される。all-small-capsを指定するとすべて大文字で小さめに表示される。](https://ics.media/entry/250401/images/250401_font-variant-caps.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250401_font-variant/sample/font-variant-caps/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250401_font-variant/blob/main/sample/font-variant-caps/index.html)

テキストの大文字・小文字を制御するプロパティには、`text-transform`プロパティもあります。こちらはすべてのフォントで動作しますが、単に文字の見た目を変えるだけです。フォントのデザインには依存せず、強制的に大文字・小文字を変更できます。

### `font-variant`と`font-feature-settings`の違い

`font-variant`プロパティで設定できる内容は、すべて`font-feature-settings`プロパティでも実現できます。`font-feature-settings`プロパティは低レベルの機能であり直感的ではない指定方法のため、基本的には高レベルな`font-variant`プロパティを使用するのが推奨されます。MDNでは以下のように言及されています。

> 可能な限り、ウェブの作者は代わりに `font-variant` 一括指定プロパティ、または関連する個別指定プロパティである `font-variant-ligatures`, `font-variant-caps`, `font-variant-east-asian`, `font-variant-alternates`, `font-variant-numeric`, `font-variant-position` プロパティを使うべきです。

-   引用元：[font-feature-settings - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/font-feature-settings)

### まとめ

今回の記事では、CSSの`font-variant`プロパティについてご紹介しました。一部のプロパティは未対応のブラウザがあるほか、日本語フォントでは使えない場合もあります。各フォントが特定のOpenType機能をサポートしているかどうかについては、フォントの提供元や公式サイトをご確認ください。

今後、より多くの環境で`font-variant`プロパティが活用できるようになると嬉しいですね！　ウェブ上でフォントを扱う際に、参考になれば幸いです。

### 参考

-   [font-variant - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/font-variant)
-   [可変フォントガイド - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_fonts/Variable_fonts_guide)
-   [CSS での OpenType 機能の構文](https://helpx.adobe.com/jp/fonts/using/open-type-syntax.html)