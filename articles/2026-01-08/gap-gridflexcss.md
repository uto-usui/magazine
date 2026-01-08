---
title: "gapの余白指定が便利！ gridとflexでできる新しいCSSレイアウト手法"
source: "https://ics.media/entry/210628/"
publishedDate: "2021-06-28"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

余白といえば、`margin`プロパティーや`padding`プロパティーを思い浮かべる方が多いと思いますが、CSSの`gap`プロパティーでも余白を指定できます。CSS GridやFlexboxで`gap`プロパティーを使うと柔軟にレイアウトを組めます。

この記事ではFlexbox、CSS Gridで利用できる`gap`プロパティーを活用したレイアウト手法とそのメリットを紹介します。今まで`margin`プロパティーで要素間の余白を調整していたものも`gap`プロパティーで柔軟に対応できる場面もあります。なお、下記サンプルで`margin`プロパティーは一切使っていません。

-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/210628_gap_layout/)

![](https://ics.media/entry/210628/images/210628_sample.webp)

なお、この記事では要素間の空白部分のことを`margin`の訳語としての「余白」との混乱を避けるため、「アキ」と呼ぶことにします。この記事内だけの用法です。

### gapプロパティーの使い方

`gap`プロパティーはFlexboxおよびCSS Gridで要素間のアキを設定できます。

```
.hoge {
  display: flex;
  gap: 30px 20px;
}

.fuga {
  display: grid;
  gap: 30px 20px;
}
```

`gap`プロパティーは1つもしくは2つの値をとり、それぞれ行間・列間のアキを設定します。1つ指定の場合は行間・列間を同一の値で指定します。2つの場合は、1つ目が行間、2つ目が列間の値になります。`gap`プロパティは一括指定プロパティーなので、行間・列間を個別に指定する場合はそれぞれ`row-gap`、`column-gap`を使います。

![gapプロパティーが制御するアキ](https://ics.media/entry/210628/images/210628_gap.png)

CSS Gridでの`gap`プロパティーの使い方などは[『CSS Grid Layout入門』](https://ics.media/entry/15649/)の記事に詳しく解説されています。

### marginを使わないページデザイン

サンプルのページはデスクトップレイアウト、モバイルレイアウトともに`margin`プロパティーを使っていません。`gap`プロパティーおよび`padding`プロパティーのみを用いて要素をレイアウトしています。いくつか`margin`プロパティーを使わない手法をピックアップして解説します。

#### 全体のレイアウトについて

まず全体のレイアウトについて見ていきます。大きく分けてヘッダー、メインコンテンツ、フッターとモバイル版のハンバーガーボタン（デスクトップ版では非表示）で構成されています。さらにメインコンテンツは7つセクションに分かれています。ヘッダー・コンテンツ・フッターはCSS Gridを使っています。（細かい内部のHTMLは省略しています）

```
<body class="global-layout">
  <header class="global-layout__header header">...</header>
  <button class="global-layout__hamburger-button hamburger-button">
    ...
  </button>
  <main class="global-layout__contents contents-layout">...</main>
  <footer class="global-layout__footer footer">...</footer>
</body>
```

```
.global-layout {
  display: grid;
  grid-template: "header" auto "contents" 1fr "footer" auto/100%;
  min-height: 100vh;
}

.global-layout__header {
  position: fixed;
  top: 0;
  left: 0;
  grid-area: header;
  width: 100%;
}

.global-layout__contents {
  grid-area: contents;
}

.global-layout__footer {
  grid-area: footer;
}
```

縦に並んだレイアウトでもCSS Gridで構成するメリットととして、**コンテンツの高さが小さい時にフッターが上がってきてしまう現象を防げる**点です。CSS Gridで`min-height: 100vh`で最小高さとして画面の高さを設定し、コンテンツ部分の高さを`1fr`と設定することで`100vh`からヘッダーとフッターの高さを引いた残りがコンテンツ部分の高さとして確保されます。これによりフッターは最低でも画面の一番下に配置されます。細かいCSS Gridや`fr`のしくみについては[『CSS Grid Layout入門』](https://ics.media/entry/15649/)をご参照ください。

![全体のレイアウト](https://ics.media/entry/210628/images/210628_layout.png)

メインコンテンツは7つのセクションが縦に並んで、各セクションは`120px`ずつ離れています。これはFlexboxと`gap`を組み合わせて次のように実装できます。

```
<main class="global-layout__contents contents-layout">
  <section class="main-visual">...</section>
  <section class="missions">...</section>
  <section class="service">...</section>
  <section class="news">...</section>
  <section class="works">...</section>
  <section class="company">...</section>
  <section class="credits">...</section>
</main>
```

```
.contents-layout {
  display: flex;
  flex-direction: column;
  row-gap: 120px;
  padding-bottom: 120px;
}
```

`display:flex`と`flex-direction:column`で縦に並べています。Flexboxといえば横並びのイメージが強いですが、`flex-direction`プロパティーを用いれば縦方向へのレイアウトも可能です。これでFlexboxによる`gap`プロパティーが使えるようになり、`row-gap:120px`を設定すると各セクション間に`120px`ずつのアキができます。`gap`プロパティーを使うと個々に`margin-bottom`や`margin-top`を設定しなくても一括で設定でき便利です。

#### ヘッダー

デスクトップ版のヘッダーは大きく分けてロゴ部分とナビゲーション部分に分けられます。それぞれ両端に寄っているので次のようなHTMLとCSSで配置します。

```
<header class="global-layout__header header">
  <h1>HOGE</h1>
  <nav>
    <ul class="header__navigation">
      <li>
        <a href="#">ABOUT</a>
      </li>
      <li>
        <a href="#">WORKS</a>
      </li>
      <li>
        <a href="#">COMPANY</a>
      </li>
      <li>
        <a href="#">CONTACT</a>
      </li>
    </ul>
  </nav>
</header>
```

```
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
}
```

つづいて、ナビゲーション部分に注目してみます。ナビゲーションはデスクトップ版では横並びになっています。ここでもFlexboxを用いて並べています。

```
.header__navigation {
  display: flex;
  column-gap: 32px;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
}
```

ここで`gap`プロパティーの登場です。横並びの要素間のアキは`column-gap`プロパティーによって実現しています。

![](https://ics.media/entry/210628/images/210628_header.png)

従来であれば`<li>`要素に対して`margin-left`プロパティーと1つ目の要素に余計な`margin-left`プロパティーがつかないよう`:first-child`疑似クラスを用いていたかと思います。

▼従来的な方法

```
.header__navigation li {
  margin-left: 32px;
}

.header__navigation li:first-child {
  margin-left: 0;
}
```

Flexboxと`gap`プロパティーを組み合わせればたった`column-gap: 32px`の1行で済みます。

#### Service部分

Serviceのセクションでは画像とテキストが横並びになっています。ここはそれぞれ幅50％の要素を`display: flex`で並べているだけなのでそこまで真新しい手法は使っていません。なお偶数行のみ`flex-direction`プロパティーで反転させています。

```
.alternating-layout__item {
  display: flex;
}

.alternating-layout__item:nth-child(2n) {
  flex-direction: row-reverse;
}
```

テキスト部分は上下左右中央に寄せていますが、これは次の2行でできます。

```
.alternating-layout__description {
  display: grid;
  place-items: center;
}
```

同じことは`display:flex`と`justify-content:center`、`align-items:center`でもできますが、1行少なくかけるのでちょっとだけ省力化できます。

#### Works部分

Works部分は3つカードを並べるレイアウトとカード内部のレイアウトに`display:flex`を使用しています。まずは3つ並べるコードをみていきます。

```
.card-list {
  display: flex;
  gap: 32px 24px;
  justify-content: center;
}
```

さきほどのナビゲーション部分と同様にカード間のアキは`gap`プロパティーを使って実現しています。今回は`gap`プロパティーに2つ値を与えて、`row-gap`プロパティーも設定しています。現状横に3つ並ぶ場合には`row-gap`プロパティーの影響はありませんが、将来的に2段になった場合に、上の段とアキができるよう設定しています。

カード自体のレイアウトは次のようなコードになっています。

```
.card {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
```

Flexboxの向きを縦方向にし、画像とタイトル、タイトルと説明文の間を`row-gap`プロパティーで空けています。縦方向の`display:flex`を用いると行数の変化などにも柔軟なレイアウトが可能になります。

#### モバイル版について

モバイル版のレイアウトは全般的に横並びだったものを縦並びにしています。Flexboxを用いているので縦並びにしたい場合は`flex-direction`プロパティーの値を`column`に変更することで対応できます。アキも`row-gap`と`column-gap`プロパティー（あるいは`gap`プロパティー）の値を調整します。一括指定の`gap`プロパティーを用いれば、モバイル版ではPC版の`margin-left`プロパティーをキャンセルして新たに`margin-top`プロパティーを与えるような書き方をしなくて済むのでシンプルになります。

### gapの利点

`gap`プロパティーを使った実践的なレイアウトを紹介しましたが、`gap`プロパティーで要素間のアキをつくるメリットをあげます。

#### :last-childのような疑似クラスによる処理を省ける

ナビゲーションのレイアウト部分でも取り上げましたが、`margin`プロパティーを使った場合は不要なアキが発生する場合があります。それを回避するために`:last-child`や`:nth-child`などの疑似クラスを使った処理をすることもありますが、`gap`プロパティーが**要素と要素の間**を制御するのでそのような記述をせずに済みます。

レスポンシブで列数が変わる場合など疑似クラスでの処理が難しいものでも、`gap`プロパティーを使えば簡単にアキを制御できます。

#### 親が子要素間の余白を制御できる

ほかにも、子要素間のアキの制御をFlexboxなどを使ってレイアウトを行っている**親自身が制御できる点**が挙げられます。配置された子要素側は`margin`などの他要素のレイアウトに影響を与えるプロパティーを持つ必要がなく、子要素内のレイアウトに専念すれば良くなります。

![親要素が子要素の位置を決定する](https://ics.media/entry/210628/images/210628_component.png)

このメリットはCSS設計やコンポーネント指向なReactやVue.jsといったフレームワークにおいて非常にメリットになります。「コンポーネントにmarginを持たせるな」というような言説を聞いたことないでしょうか？　`margin`プロパティーは他の要素へ影響を与えるので意図しないレイアウトの崩れやCSSが複雑になる原因となります。`gap`プロパティーによるアキの制御はこれを実現できます。

本記事のデモでもレイアウトに関わるCSSは階層状に制御しています。

#### Figmaなどのデザインツールの親和性が高い

Figmaには「Auto layout」、Adobe XDには「スタック」という機能があります。この挙動はFlexboxと`gap`プロパティーを組み合わせたもの近いです。デザインデータと同じような感覚でレイアウトができ、デザイナーの意図も汲み取りやすいでしょう。

![AdobeXDでのスタックの挙動](https://ics.media/entry/210628/images/200628_xd_stuck.gif)

#### marginの相殺など考えなくてよい

`margin`プロパティー同士が隣接した場合「marginの相殺」という挙動があります。さきほどのコンポーネントの話と関連しますが、意図しないmarginの相殺や逆に二重にマージンがついてしまうといった問題を考えなくて済みます。

### gapの欠点

しかし`gap`プロパティーにもデメリットがあります。

#### 個別のアキの制御が難しい

`gap`プロパティーはすべてのアキを1つのプロパティーで設定するので各要素間のアキを細かくするのは難しいです。その場合最低限のアキを`gap`プロパティーで制御しつつ、余分なものは別途`margin`プロパティーや`padding`プロパティーで調整する必要があるでしょう。

#### ラッピング要素が多くなるかもしれない

要素同士をレイアウト決定するために親要素を必要になるので、単純に並べた場合に比べ`<div>`要素などが多くなるかもしれません。HTMLの階層が深くなりがちなので、開発体験に影響があるかもしれません。

### まとめ

Flexbox・CSS Gridと`gap`プロパティーを用いたレイアウト手法を紹介しました。デモでは`margin`プロパティーを一切使わないという野心的なアプローチを取りましたが、実際には`margin`プロパティーを使わざるを得ない場面もあるでしょう。

しかし、`gap`プロパティーを活用し`margin`プロパティーへの依存を減らすことで柔軟なレイアウトを実現できます。これからは`margin`プロパティーと並んで`gap`プロパティーもレイアウトで使われるメジャーなCSSプロパティーとなるのではないでしょうか。