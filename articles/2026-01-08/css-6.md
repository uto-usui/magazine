---
title: "ウェブ制作者なら意識してほしいCSS設計の基礎知識"
source: "https://ics.media/entry/15166/"
publishedDate: "2017-03-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

みなさんは、CSSを書くときに管理のしやすさを意識していますか？　CSSを書くときに命名や構造のルールをシンプルにすることで、他のCSS編集者が理解しやすくなります。

何も意識せずにCSSを書くと、

-   誰も読めない、理解できない
-   何に使っているかわからない謎のルールセットがあるが、必要かもしれないので消せない
-   CSSを修正したら意図していないパーツも修正の影響が出てしまった
-   スタイルが上書きされすぎていて、 `!important` せざるを得ない

といった問題が起こりやすくなります。このような問題を解決するアプローチとして、CSSを設計するという考え方があります。ウェブサイトの規模が大きくなり複雑化していく現代では、CSS設計を意識することの重要性が高まってきています。今回は、CSS設計をしたことがなくても意識してほしいCSS設計の基礎になる考え方と、基本の手法についてご紹介します。

### CSS設計に共通する考え方

ほとんどのCSS設計手法に共通する考え方が、ウェブサイトをパーツの集合体として考え、そのパーツごとに分けてCSSを考えることです。たとえば、ヘッダー、フッダー、大見出し、小見出し、リスト、表、ボタンなどウェブサイトに配置されているものがパーツです。

![](https://ics.media/entry/15166/images/ss-css-sample-640x212.png)

例として、ICS MEDIAのページの上部を、ロゴ・プッシュ通知ボタン・シェアボタン（RSSも含ませました）・見出し・カテゴリーナビゲーションのパーツとして、それぞれ赤枠で囲みました。この例より大きいまたは小さいパーツの単位で考えることもあります。ヘッダーパーツの中にロゴのパーツがある、というような入れ子にすることもあります。

CSS設計にはさまざまな考え方があり、パーツのつくり方も多種多様です。CSS設計をすることでどんな目的を達成しようとするのかが、違うからです。ウェブサイトの運用でスタイルの追加が予想できるときは、柔軟で拡張しやすい設計にしておくのがよいでしょう。逆に、修正がほとんど発生しないだろうというときは、拡張性は必要がなく、壊れにくいようにしておくのがよいかもしれません。私たちがCSS設計をプロジェクトに採用するときにも、そのプロジェクトでどんな管理をしていくのがいいか、よく考える必要があります。

### 基本のCSS設計手法

今から紹介する3つのCSS設計手法は、多くのCSS設計手法のベースとなっています。この3つのCSS設計の考え方を理解していれば、さまざまなCSS設計手法の理解や、プロジェクトに合ったCSS設計を選択する際の助けになると思います。

#### OOCSS

[OOCSS](https://github.com/stubbornella/oocss)オーオーシーエスエスは OBJECT-ORIENTED（オブジェクト指向） CSS の略で、名前の通りオブジェクト指向を取り入れた設計手法です。構造と見た目、コンテナーと内容を分離し、それぞれ別のクラスで指定をします。そのため、マルチクラスで使うことが多いのが特徴です。

![](https://ics.media/entry/15166/images/oocss-image-640x173.png)

```
/* .button というパーツの構造 */
.button {
  display: inline-block;
  border-color: #ccc;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
}

/* ボーダー、背景色、文字色の装飾パターン */
.button-success {
  border-color: green;
  background-color: green;
  color: white;
}

.button-error {
  border-color: tomato;
  background-color: tomato;
  color: white;
}
```

```
<!-- ボタンのHTMLの例 -->
<button type="button" class="button button-success">ボタン</button>
```

[Bootstrap](http://getbootstrap.com/)を使ったことがある人にはパッと見た感じに馴染みがあり、導入しやすいと思うかもしれません。しかし、構造と見た目を分離して考えるOOCSSは、デザインの時点でそのあたりが考慮されていないと、OOCSSのルールに沿った実装がむずかしく、OOCSSとミスマッチになることも多いです。また、マルチクラスの性質上、ルールセットが大量になってしまうことも多いので、スタイルガイドをつくるなどデザイナー、エンジニア間で大量のスタイルをうまく管理していけるようにする工夫も必要になります。

#### BEM

![](https://ics.media/entry/15166/images/BEM-640x360.png)  
[BEM](https://bem.info/)は、ウェブサイトのUIをBlockとして考え、Blockに含まれる要素をElementと、BlockやElementの見た目や動きのパターンをModifierというルールで扱います。もともとBEMはロシアの[Yandex](https://www.yandex.com/)社が開発したBEM Toolsのこと、またその設計のことをいいます。CSS設計においてBEMは、多くの場合、BEMの設計をCSSに応用した[MindBEMding](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)のことを指します。

```
/* MindBEMdingの命名例 */
.navigation {
}
.navigation__item {
}
.navigation__item--active {
}
```

```
<!-- ナビゲーションのHTMLの例 -->
<ul class="navigation">
  <li class="navigation__item"><a href="#">TOP</a></li>
  <li class="navigation__item"><a href="#">ABOUT</a></li>
  <li class="navigation__item--active"><a href="#">SERVICE</a></li>
</ul>
```

`__` 、 `--` を使ったクラスの命名規則は、違和感を覚える人も多いでしょう。しかし、この命名規則はBlock、Elementを区切ることでHTMLの構造がのわかりやすくなるのが利点です。ルールがシンプルなため、学習コストが低く、他のCSS設計手法に比べて導入しやすいと考えられます。クラスセレクターの命名に2つの連続したハイフンとアンダースコアを使っているのには、ハイフン区切りの単語と区別しやすいようにという意味があるようですが、必ずしも `__` 、 `--` にしなければならないという記載はないので、自分の使いやすいものに変更してもいいかもしれません。

#### SMACSS

![](https://ics.media/entry/15166/images/smacss-640x360.png)  
[SMACSS](https://smacss.com/)はScalable and Modular Architecture for CSS（直訳で、CSSのためのスケーラブルでモジュラーなアーキテクチャという意味）の略です。公式のドキュメントは[電子書籍として日本語版でも販売されています](https://smacss.com/ja)。SMACSSでは、CSSをベース、レイアウト、モジュール、ステート、テーマの5つに分けて管理します。

**概要**

**セレクターの規則**

**ベース**

サイト全体に影響するもの、また `reset.css` などのCSSリセットを定義する

class,IDセレクターを使わず要素セレクターに定義する

**レイアウト**

ヘッダーやフッターなど、ページのレイアウトを定義する

`l-` など、レイアウトのクラスだとわかるような接頭辞をつける

**モジュール**

レイアウトの中に配置する再利用可能なパーツを定義する

接頭辞なし

**ステート**

JavaScriptで操作される、レイアウトやモジュールの状態に対するスタイルを定義する

接頭辞 `is-`

**テーマ**

テーマ機能がないときは使わない。テーマがあるときに、テーマごとのスタイルを定義する。

テ接頭辞なし、またはテーマの規模に合わせて、接頭辞 `theme-`をつける

CSSの分け方のルールが決まっているため、SMACSSを知らない人にとって、このルールを理解する学習コストは発生します。ただ、この5つの分け方は感覚的にわかりやすいので、CSS設計をあまり知らない人にもオススメしやすいです。

### 再利用を考えないCSS設計の考え方

> CSSは予測、再利用、保守、拡張しやすいものであってほしい
> 
> [CSS Architecture](https://philipwalton.com/articles/css-architecture/)

CSS設計について書かれた、[CSS Architecture](https://philipwalton.com/articles/css-architecture/)([日本語訳](http://article.enja.io/articles/css-architecture.html))は[Philip Walton](https://philipwalton.com/about/)氏が2013年6月に公開したものです。さきほど紹介したOOCSS/BEM/SMACSSも含め、2013年前後に公開されたCSS設計手法の多くは、ウェブサイトをパーツの集合体とし、パーツを使いまわせるものとして考えます。それに対して、2015年にはパーツを再利用させないものとして考える[ECSS](http://ecss.io/)というCSS設計手法が登場しています。

[ECSS](http://ecss.io/)は、パーツを抽象化したり再利用したりしません。それぞれのパーツは1つのページの1つの箇所でしか使いません。同じパーツが複数ある場合にも、使われる分だけ同じCSSを何度か書くことになります。しかし、同じCSSを書いてコードの量が増えたとしても、パーツを分けてCSSを閉じ込めることでCSSを永続化（Enduring）させようという考え方をするのがECSSです。ドキュメントは英語ですが、[ウェブサイト](http://ecss.io/)で読めるようになっているので、ぜひ読んでみてください。

### まとめ

ここ数年で筆者は、中〜大規模のウェブサイトやウェブアプリケーションのCSSを書くときに、再利用可能なコードを書くのを避けるようになりました。それは、ウェブサイトが大規模になりCSSが複雑化したときに、再利用するCSSの管理が難しくなっていくことを感じたからです。また、ウェブアプリケーションの機能をベースにした実装では、見た目や装飾の単位でパーツを分けて扱わなくなり、CSSの再利用性があまり重要でないと感じるようになりました。

[Angular](https://angular.io/)や[React](https://facebook.github.io/react/)、[Vue.js](https://ja.vuejs.org/)を用いたSPA制作もどんどん増えていくことが予想されます。AngularやVueにはScoped CSSの機能があるため、CSS設計を意識しなくても安全にCSSのバッティングを避けられます。そうなるとBEMなどのCSS設計は意識してなくても問題ありません。

みなさんも、今公開されているCSS設計をただ使うだけでなく、プロジェクトの性質や運用方法にマッチしているかを考え、よりよいCSS設計をするということを考えてみるといいでしょう。CSS設計を考え工夫することで、CSSが安全に運用、管理できるものに近づくと思います。