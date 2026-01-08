---
title: "文章の折り返し指定のCSS最新版"
source: "https://ics.media/entry/240411/"
publishedDate: "2024-04-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

文章の折り返しはウェブ制作において意外と難しいものです。URLが文章に含まれている場合、URLがレイアウトを突き抜けてしまった、という経験をみなさんはお持ちではないでしょうか？　この記事では、国内のウェブ制作において「**開発者が考えることが少なくてよくなる**」安全なCSS指定を紹介します。

結論から説明すると、以下の指定を提案します。

```
body {
  overflow-wrap: anywhere; /* 収まらない場合に折り返す */
  word-break: normal; /* 単語の分割はデフォルトに依存 */
  line-break: strict; /* 禁則処理を厳格に適用 */
}
```

この記事では上記の指定にいたった理由と、折り返しの理解について必要な`overflow-wrap`と`word-break`プロパティを中心に解説します。

### overflow-wrap

`overflow-wrap`は**文字列が長すぎて行ボックス内に収まらない場合に、折り返しするかどうか**を指定するプロパティです。指定できる値は次の3種類です。

-   `normal` : 単語と単語の間など、可能な場所でのみ折り返します（初期値）
-   `break-word`: 単語の途中で折り返します
-   `anywhere`: `break-word`と同様に単語の途中で折り返します（違いは後述）

記法

```
.任意のセレクター {
  overflow-wrap: anywhere;
}
```

表示結果は次の通りです。左から順番に`normal`、`break-word`、`anywhere`を指定しています。

![](https://ics.media/entry/240411/images/images/240411_break_overflowwrap.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240411_text_break/index.html#overflow-wrap)
-   [ソースコードを確認する](https://github.com/ics-creative/240411_text_break/blob/main/index.html)

①と②の箇所を注目しましょう。長い英単語としてURL文字列を例にしました。ブラウザのデフォルトの`overflow-wrap: normal`の場合は、①のようにレイアウトから突き抜けてしまいます。

②の箇所はFlexboxを使ってレイアウトした箇所です。`overflow-wrap: break-word`では突き抜けていますが、`overflow-wrap: anywhere`では突き抜けていないことがわかります。

`break-word`と`anywhere`は似ていますが、上記のようにCSSでFlexboxを使用した場合などで違いがあります。詳しい説明は記事『[Webブラウザの日本語改行問題 -改行を実現するHTML/CSS-（1） #JavaScript - Qiita](https://qiita.com/tamanyan/items/e37e76b7743c59235995)』を参考にしてください。

#### ブラウザの対応状況

`overflow-wrap: anywhere`は、Chrome 80・Edge 80（2020年）、Firefox 65（2019年）、Safari 15.4（2022年）以降でサポートされています。

-   [CSS property: overflow-wrap: anywhere | Can I use...](https://caniuse.com/mdn-css_properties_overflow-wrap_anywhere)

#### コラム：`word-wrap`との違い

`word-wrap`プロパティは過去にInternet Explorer向けに開発されたもので、現在は`overflow-wrap`という名前に改名されています（互換性のために`word-wrap`は残されています）。新規のウェブサイトを作成する際には、`overflow-wrap`を使用しましょう。

### word-break

`word-break`は、**文章内の単語がどの位置で折り返されるか**を制御するプロパティです。

-   `normal` : 単語は慣例にしたがって分割されます（初期値）
-   `break-all` : 単語内でも折り返しを行います
-   `keep-all` : 単語内での折り返しは行われません

記法

```
.任意のセレクター {
  word-break: normal;
}
```

表示結果は次の通りです。左から順に`normal`、`break-all`、`keep-all`を指定しています。

![](https://ics.media/entry/240411/images/images/240411_break_wordbreak.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240411_text_break/index.html#word-break)
-   [ソースコードを確認する](https://github.com/ics-creative/240411_text_break/blob/main/index.html)

①〜③の違いに注目しましょう。

-   ①：URLにおいて、`normal`と`keep-all`が突き抜けていますが、`break-all`では折り返しています。
-   ②：`break-all`だとほとんどの英単語の途中で折り返しています。これだと英文を読むのが難しくなります。
-   ③：`keep-all`だと、和文で突き抜けが発生しています。和文においては句点や読点のみで折り返す指定となるためです。

このように、`break-all`と`keep-all`は**どちらも扱いに注意が必要**です。用途によっては役立つ場合はありますが、**汎用的に使うには無理がありそうです**。そのため、この記事では`word-break`は初期値の`normal`が無難として採用しています。

#### コラム：word-break: break-wordは非推奨

読者のなかには`word-break: break-word`を使っている人もいるかもしれません。`overflow-wrap: anywhere`について説明しましたが、`word-break: break-word`は同じ結果をもたらします。レイアウトを維持し、**どうしても行に収まらない場合にのみ英単語の途中で折り返します**。

ただし、`word-break: break-word`は**非推奨のプロパティ**とされています（根拠：[CSS Text Module Level 3](https://www.w3.org/TR/css-text-3/#word-break-property)）。そのため、現在ではブラウザ環境が許すなら`overflow-wrap: anywhere`を使いましょう。

-   [word-break - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/word-break)

### line-break

`line-break`は文章の禁則処理を指定できるプロパティです。

禁則処理とは、カギ括弧や句点、読点、小書きの仮名など、**行頭での表記が望ましくない文字を制御すること**です。小学校や中学校で原稿用紙で学んだ文章のルール、というとわかりやすいでしょうか。

`line-break`プロパティには次の値を指定できます。

-   `auto`: 規定の折り返し規則（初期値）
-   `anywhere`: どこでも折り返しを行う
-   `loose`: もっとも制限の弱い規則
-   `normal`: 一般的な折り返しの規則
-   `strict`: もっとも制限の強い規則

記法

```
.任意のセレクター {
  line-break: strict;
}
```

表示結果は次の通りです。左から順に`auto`、`anywhere`、`strict`を指定しています。

![](https://ics.media/entry/240411/images/images/240411_break_linebreak_1.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240411_text_break/index.html#line-break)
-   [ソースコードを確認する](https://github.com/ics-creative/240411_text_break/blob/main/index.html)

違いが明確なのは「やぁ、元気かい？」の部分です。カギ括弧と小書きの仮名と読点を含めているため、行頭に出現する文字が変化しています。`line-break: strict`では、行頭に読点`、`と小書きの仮名`ぁ`は禁止されているため、行頭に出現しません。

デモを試して、どのような違いがあるのか確認してみてください。次の図版はブラウザの幅をすこし変更して、異なる折り返し位置での表示結果を確認したものです。

![](https://ics.media/entry/240411/images/images/240411_break_linebreak_2.png)

`strict`がもっとも禁則処理が強いことがわかると思います。

※ブラウザによっては折り返し位置は少し異なる結果で表示される場合があります（ChromeとFirefoxだと小書きの仮名の扱いが異なりました）。

紙面の文章では禁則処理が用いられていることが多いため、ウェブサイトにおいても読み物として禁則処理を適用することは自然なことと考えられます。禁則処理をすれば、**読み間違いを防ぐ効果**も期待できます。

しかし、ウェブサイトでの禁則処理があまり普及していないのも現状です（指定可能なことが知られていないと考えられます）。**現在のブラウザでは十分サポートされている**ので、CSSの文章表現としては検討したいところです。

ブラウザのサポート状況は次の通りです。`line-break: strict`はChrome 25（2013年）、Edge 79（2020年）、Firefox 69（2019年）、Safari 8（2014年）以降でサポートされています。

-   [CSS property: line-break: strict | Can I use...](https://caniuse.com/mdn-css_properties_line-break_strict)

### hyphens

`hyphens`プロパティは、自動的に単語の途中でハイフネーション（単語の分割）を行う指定です。`lang`属性を指定して、ハイフネーションの言語を指定できます。

-   `none`: ハイフネーションを行わない
-   `auto`: ブラウザが自動的にハイフネーションを行う
-   `manual`: 分割候補位置が指定された場合のみハイフネーションを行う（初期値）

記法

```
.任意のセレクター {
  hyphens: auto;
}
```

表示結果は次の通りです。

![](https://ics.media/entry/240411/images/images/240411_break_hyphens.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240411_text_break/index.html#hyphens)
-   [ソースコードを確認する](https://github.com/ics-creative/240411_text_break/blob/main/index.html)

`hyphens: auto`の場合は、折り返しの場所でハイフン「`-`」が挿入されています。

`hyphens: auto`はChrome 88（2021年）、Safari 5.1（2011年）、Firefox 6（2011年）以降でサポートされています。

-   [CSS Hyphenation | Can I use...](https://caniuse.com/css-hyphens)

### 使い分け

ブラウザでの初期値は、`overflow-wrap: normal`、`word-break: normal`、`line-break: auto`です。先述のとおり、長いURLや長い英単語が含まれている場合にレイアウトが維持できないリスクがあります。ユーザーが入力したテキストを表示するようなウェブサービスでは、長い英単語が含まれない可能性はゼロとは言えません。

上記の理由から、折り返しの安全性が高い、`overflow-wrap: anywhere`、`word-break: normal`を基本として、禁則処理の温度感によって`line-break: strict`の指定を使用することをオススメします。

使い方としては`body`セレクターにグローバルに適用し、必要に応じて局所的に異なる`word-break`と`overflow-wrap`を指定するほうが、HTML制作としては考えることが少なくなりオススメです。

```
body {
  overflow-wrap: anywhere; /* 収まらない場合に折り返す */
  word-break: normal; /* 単語の分割はデフォルトに依存 */
  line-break: strict; /* 禁則処理を厳格に適用 */
}

/* 例 */
.例外的に適用する箇所 {
  word-break: break-all; /* 単語の途中でも折り返しOK */
}
```

### コラム：行末のガタつきを抑える

CSSには`text-wrap: pretty`という指定も存在します。欧文での段落全行の行末ガタつきを整えるオプションです。Chrome・Edge 117（2023年9月）、Safari 26.0（2025年9月）以上で利用可能です（参照『[Can I use...](https://caniuse.com/mdn-css_properties_text-wrap_pretty)』）。

```
.selector {
  text-wrap: pretty;
}
```

詳しい挙動は『[CSS テキストの折り返し: きれい  |  Blog  |  Chrome for Developers](https://developer.chrome.com/blog/css-text-wrap-pretty?hl=ja)』を参照ください。

### まとめ

今回の記事では、文末における折り返しの指定について解説しました。まとめると以下の使い分けになります。

**採用したい指定**

-   `overflow-wrap: anywhere` : 収まらない場合に折り返す指定
-   `word-break: normal` : 規定の折り返しの規則。  
    ブラウザの規定値なので、指定しなくてもよい
-   `line-break: strict` : 禁則処理はお好みで。  
    厳格指定にすると行頭の読みやすさが改善する

**今後は使わない指定**

-   `word-wrap`プロパティは使わない。  
    使いたいなら`overflow-wrap`プロパティを使う
-   `word-break: break-word`は非推奨

続編記事『[CSSで文節の折り返しを！ br・wbrとauto-phraseの活用術](https://ics.media/entry/241105/)』は、文章の意図的な折り返し指定について詳しく説明します。