---
title: "HTMLとCSSでつくる!　1文字ずつ変化するテキストのアニメーション"
source: "https://ics.media/entry/250131/"
publishedDate: "2025-01-31"
category: "frontend"
feedName: "ICS MEDIA"
author: "sawada-naomi"
---

2025年1月31日 公開 / [株式会社ICS 澤田 ナオミ](https://ics.media/entry/staff/sawada-naomi/)

前回、以下の記事でリンクテキストをホバーした際のアニメーション実装例をご紹介しました。

-   [『HTMLとCSSでつくる！　リンクテキストのホバー時アニメーション11選』](https://ics.media/entry/240801/)

さて、今回は少しだけ複雑になりますが、HTMLとCSSのみでより凝った表現をする方法を紹介します。

リンクテキストといえば、ヘッダーなどのメニューとして小さめのフォントサイズでデザインされていることも多いでしょう。

![](https://ics.media/entry/250131/images/images/250131_header_design_sample.png)

そんな小さいサイズのテキストでもホバー時に目を引くような、1文字ずつ区切ったテキストアニメーションのアイデアを紹介します。よりサイトの雰囲気に合う演出をしたい、またアイデアの引き出しを増やしたいデザイナーやエンジニアの参考になれば嬉しいです。

▼ 今回紹介する実装例一覧はこちらです。

![](https://ics.media/entry/250131/images/250131_demo_all.gif)

記事前半では、実装方法について基本となるアニメーションの仕組みと実装時に気をつけたいことを解説し、後半はバリエーションの実装例を掲載していきます。 それでは、まずは基本となる実装例を紹介します。

### 基本のアニメーション：1文字ずつ下に回転

▼ ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250131_link_hover_animation2/basic/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/250131_link_hover_animation2/blob/main/basic/index.css)

▼リンクテキスト部分のHTML

```
<a href="#">
  <span aria-hidden="true" translate="no" class="text-wrap">
    <span class="letter" style="--index: 0">S</span>
    <span class="letter" style="--index: 1">E</span>
    <span class="letter" style="--index: 2">R</span>
    <span class="letter" style="--index: 3">V</span>
    <span class="letter" style="--index: 4">I</span>
    <span class="letter" style="--index: 5">C</span>
    <span class="letter" style="--index: 6">E</span>
  </span>
  <span class="sr-only">SERVICE</span>
</a>
```

▼リンクテキスト部分のCSS

```
.text-wrap {
  display: flex;
  gap: 8px;
}

.text-wrap:hover .letter {
  text-shadow: 0 0 0 #000, 0 1.5em 0 #000;

}

.letter {
  overflow: hidden;
  color: transparent;
  text-shadow: 0 -1.5em 0 #000, 0 0 0 #000;
  transition: text-shadow 0.2s;
  transition-delay: calc(var(--index) * 0.05s);
}
```

#### アニメーションの仕組み

時間差で1文字ずつ変化しています。これを実現しているのが、HTMLで`style`属性に指定したCSS変数（カスタムプロパティ）の`--index`と、CSSで設定した`transition-delay: calc(var(--index) * 0.05s)`の組み合わせです。`calc()`関数の計算式に振った番号が入るので、最初の文字（0番目）は`0`秒後、2文字目（1番目）は`0.05`秒後、3文字目（2番目）は`0.1`秒後…といった具合でアニメーションの開始をずらすことがきます。

また、テキストが回転する動きについては`text-shadow`プロパティを活用しているのですが、以下記事の「[2\. テキストが上下に回転するアニメーション](https://ics.media/entry/240801/#2.-%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E3%81%8C%E4%B8%8A%E4%B8%8B%E3%81%AB%E5%9B%9E%E8%BB%A2%E3%81%99%E3%82%8B%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)」にて解説していますので詳しくはこちらを閲覧ください。

-   [『HTMLとCSSでつくる！　リンクテキストのホバー時アニメーション11選』](https://ics.media/entry/240801/)

#### 気をつけたいこと①：意図しないスクリーンリーダーでの読み上げを避ける

文字同士を囲う親要素の`span`タグにつけている、`aria-hidden="true"`の指定について説明します。

```
<span aria-hidden="true" translate="no" class="text-wrap">
```

今回`span`タグで単語を1文字ずつ区切っているため、そのままでは支援技術のスクリーンリーダーなどで、1文字ずつ区切られて読み上げられてしまいます。たとえば、macOSに標準搭載されているVoiceOverでは`aria-hidden="true"`を指定しない場合、「エス」「イー」「アール」…といったように1文字ずつ読み上げます。「SERVICE」のように短い英単語であれば1文字ずつ読まれても元の単語が分かるかもしれません。しかし漢字を含む日本語の場合は、1文字ずつ読まれると意味が分かりにくくなることがあります。これでは見た目の演出のために支援技術での使い勝手が悪くなってしまいます。

そこで、`aria-hidden="true"`を設定することで、支援技術からコンテンツを隠しています。

-   [aria-hidden｜MDN](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)

さらに、以下の部分で支援技術向けのテキストを置くことで「サービス」として読み上げ可能にしています。

```
<span class="sr-only">SERVICE</span>
```

上記のテキストは表示をさせたくないので、たとえば以下のようにCSSで見た目に影響が出ないように調整をします。

```
.sr-only {
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border-width: 0;
  white-space: nowrap;
}
```

#### 気をつけたいこと②：意図しないGoogle翻訳をされないために

さきほど`aria-hidden="true"`を指定していた`span`タグでは、ほかに`translate="no"`を設定しています。この設定で、Google翻訳のような自動翻訳ツールでは要素の翻訳をしないようにできます。

```
<span aria-hidden="true" translate="no" class="text-wrap">
```

-   [translate｜MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/translate)

この設定がない場合、ページに対してGoogle翻訳をかけると以下のような表示になります。「S そして R で 私 C そして」という全く意味の通じない言葉になってしまいました。

![](https://ics.media/entry/250131/images/250131_google_translate.png)

一方で、翻訳対象にしたい場合もあるかと思います。その場合は対策として、アニメーションは無効になりますが`lang`属性を利用して、日本語ではない場合（`lang="ja"`以外の場合）に表示させるテキストを用意してCSSで表示を切り替える方法が考えられます。また、アニメーションさせるテキストとは別に、翻訳可能なテキストを添えたデザインにするという手もあるかと思います。

1文字ずつ区切る際に気をつけたいポイントを2つ紹介しました。ここからは、基本の実装を元にCSSを変化させたバリエーションを見ていきます。HTMLは上述したものと共通なので割愛します。

### バリエーション：交互に変化

▼ ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250131_link_hover_animation2/alternately/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/250131_link_hover_animation2/blob/main/alternately/index.css)

▼CSS一部抜粋

```
.text-wrap {
  display: flex;
  gap: 8px;
}

.letter {
  overflow: hidden;
  color: transparent;
  text-shadow: 0 -1.5em 0 #000, 0 0 0 #000;
  transition: text-shadow 0.2s;
  transition-delay: calc(var(--index) * 0.04s);
}

.text-wrap:hover .letter {
  text-shadow: 0 0 0 orangered, -1.5em 0 0 #000;
}

.text-wrap:hover .letter:nth-child(odd) {
  text-shadow: 0 0 0 blue, 0 1.5em 0 #000;
}
```

`:nth-child()`セレクターで`odd`を指定することで、奇数番目の文字スタイルを上書きしています。これにより、変化する色と回転方向が交互に切り替えることができます。

### バリエーション：背景色の変化

▼ ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250131_link_hover_animation2/color/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/250131_link_hover_animation2/blob/main/color/index.css)

▼CSS一部抜粋

```
.text-wrap {
  display: flex;
}

.text-wrap:hover .letter {
  background-color: hsl(calc((var(--index) + 200) * 10deg) 80% 70%);
  color: #fff;
}

.letter {
  width: 20px;
  height: 20px;
  display: grid;
  place-content: center;
  overflow: hidden;
  transition: 0.2s background-color;
  transition-delay: calc(var(--index) * 0.04s);
  color: #fff;
  background-color: darkblue;
}
```

`transition-delay`に`--index`を使用している点はこれまで通りですが、追加で`hsl()`関数にも使用しています。`hsl()`関数を使用すると、色を色相・彩度・輝度で指定することができます。今回は色相に当てはめることで1文字ずつ色味が変化していくようにしています。また、`+ 200`を計算式に入れておくことで、青みのある色相から開始できるよう設定しています。

今回のようなCSS変数と`hsl()`関数に加えて、`@property`を活用したアニメーション例が以下記事の「[色のアニメーション](https://ics.media/entry/241219/#%E8%89%B2%E3%81%AE%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)」の章に掲載していますのでこちらもぜひご覧ください。

-   [意外？@propertyがCSSアニメーションを激変させる理由](https://ics.media/entry/241219/)

### バリエーション：ふわっと揺れる

▼ ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250131_link_hover_animation2/sway/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/250131_link_hover_animation2/blob/main/sway/index.css)

▼CSS一部抜粋

```
.text-wrap {
  display: flex;
  gap: 8px;
}

.text-wrap:hover .letter {
  animation: sway 0.4s calc(0.04s * var(--index));
}

@keyframes sway {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-0.2em);
  }
  50% {
    transform: translateX(0.5em);
    color: transparent;
  }
  100% {
    transform: translateY(0);
  }
}
```

`@keyframe`アットルールを利用したアニメーションの例です。Y方向とX方向に少しだけ動かし、一時的に文字色に透明を指定することでふわっとした印象にしています。`animation`プロパティの一括指定で`animation-delay`の指定位置に基本の実装にもあった`--index`を含めた計算式を当てはめることで1文字ずつアニメーションします。スクロール時の演出にも活かせそうな表現です。

### バリエーション：グリッチ風

▼ ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250131_link_hover_animation2/glitch/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/250131_link_hover_animation2/blob/main/glitch/index.css)

▼CSS一部抜粋

```
/* 背景色の設定 */
body {
  background-color: midnightblue;
}

/* リンクテキストのスタイル */
.text-wrap {
  color: #fff;
  display: flex;
  gap: 8px;
}

.text-wrap:hover .letter {
  animation: glitch 0.8s calc(0.03s * var(--index)) infinite;
  text-shadow: -1px -1px 0 deeppink, 1px 1px 0 cyan;
}

@keyframes glitch {
  0% {
    transform: translate(0, 0) rotate(0deg);
    text-shadow: -1px -1px 0 deeppink, 1px 1px 0 cyan;
  }
  10% {
    transform: translate(-1px, 1px) rotate(-1deg);
  }
  20% {
    transform: translate(1px, -1px) rotate(1deg);
    text-shadow: 1px 2px 0 deeppink, 1px 1px 0 cyan;
  }
  30% {
    transform: translate(-1px, 1px) rotate(0deg);
    text-shadow: -1px -1px 0 deeppink, 1px 1px 0 cyan;
  }
  40% {
    transform: translate(1px, -1px) rotate(-1deg);
  }
  50% {
    transform: translate(-1px, 1px) rotate(1deg);
    text-shadow: 1px 1px 0 deeppink, 1px 1px 0 cyan;
  }
  60% {
    transform: translate(1px, -1px) rotate(0deg);
  }
  70% {
    transform: translate(-1px, 1px) rotate(-1deg);
    text-shadow: -1px -1px 0 deeppink, 1px 1px 0 cyan;
  }
  80% {
    transform: translate(1px, -1px) rotate(1deg);
    text-shadow: 1px 1px 0 deeppink, 1px 2px 0 cyan;
  }
  90% {
    transform: translate(-1px, 1px) rotate(0deg);
  }
  100% {
    transform: translate(0.5px, -0.5px) rotate(-0.5deg);
    text-shadow: -1px -1px 0 deeppink, 1px 1px 0 cyan;
  }
}
```

一つ前の実装例よりもさらに指定を細かくし、色数を増やしてグリッチ風の演出を作っています。`animation`プロパティの一括指定の際に`infinite`を追加しているため、ホバーしている間はアニメーションが続きます。フォントサイズを大きくする場合は、あわせて`translate`や`text-shadow`で動かす値を大きくするなどバランス調整が必要です。

### まとめ

一文字ずつ変化するアニメーションのバリエーションを紹介してきました。 実現したい演出に近いアニメーションや制作中のサイトの雰囲気に合う実装例はあったでしょうか？ よりよいサイト制作のヒントになれば幸いです。

また、実際に本記事のコードをサイトへ適用する場合に調整したいポイントを、前回記事の以下の章で紹介しています。こちらも閲覧ください。

-   [コラム：アニメーションの緩急を調整する｜『HTMLとCSSでつくる！リンクテキストのホバー時アニメーション11選』](https://ics.media/entry/240801/#%E3%82%B3%E3%83%A9%E3%83%A0%EF%BC%9A%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E7%B7%A9%E6%80%A5%E3%82%92%E8%AA%BF%E6%95%B4%E3%81%99%E3%82%8B)
-   [コラム：スマホではホバー時のアニメーションをつけたくない場合は？｜『HTMLとCSSでつくる！リンクテキストのホバー時アニメーション11選』](https://ics.media/entry/240801/#%E3%82%B3%E3%83%A9%E3%83%A0%EF%BC%9A-%E3%82%B9%E3%83%9E%E3%83%9B%E3%81%A7%E3%81%AF%E3%83%9B%E3%83%90%E3%83%BC%E6%99%82%E3%81%AE%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E3%81%A4%E3%81%91%E3%81%9F%E3%81%8F%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88%E3%81%AF%EF%BC%9F)

#### 参考リンク

実装例制作にあたり参考にした記事を掲載します。

-   [アクセシビリティ通信 #3 aria-hidden](https://griponminds.jp/blog/accessibility-report-03/)

上記記事ではとくに、[例3: 文字ごとに区切ったテキスト](https://griponminds.jp/blog/accessibility-report-03/#%E4%BE%8B3-%E6%96%87%E5%AD%97%E3%81%94%E3%81%A8%E3%81%AB%E5%8C%BA%E5%88%87%E3%81%A3%E3%81%9F%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)の章を参考にしました。