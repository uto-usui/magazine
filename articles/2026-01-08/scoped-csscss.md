---
title: "Scoped CSSにおけるCSS設計手法"
source: "https://ics.media/entry/200515/"
publishedDate: "2020-05-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Vue.jsでCSSを利用する際にScoped CSSやCSS Modules、CSS-in-JSなどの手法があります。とくにScoped CSSは気軽に利用できるため、利用する機会も多くなって来るかと思います。

**Scoped CSSがあればCSS設計を使わなくてもよい**という意見もありますがはたして本当なのでしょうか？

ICSではScoped CSSにおけるCSS設計に関する議論が活発におこなわれており、本記事では私たちが考えた方式を紹介します。本記事はVue.jsのSFC（シングル・ファイル・コンポーネント）でScoped CSSを利用しているものを想定しています。

### CSS設計とは

基本的にCSSは常にすべてのページで読み込まれ、増えれば増えるほど相互に上書きし合う状態が起きやすく、**他の言語に比べてかなり壊れやすい言語**と言えます。

そこで登場するのがCSS設計です。[BEM](http://getbem.com/)や[SMACSS](http://smacss.com/ja)、[FLOCSS](https://github.com/hiloki/flocss)、[PRECSS](https://precss.io/ja/)などさまざまなCSS設計手法があります。それぞれ細かい違いはありますが、設計によって**CSSを管理し壊れにくくすることを目標**としています。

具体的には、「**予測可能性**」「**再利用性**」「**保守性**」「**拡張性**」この4つを満たすことです。これはGoogleのエンジニアであるPhilip Walton氏が[「CSS Architecture」](https://philipwalton.com/articles/css-architecture/)という記事で提唱した考え方です。

もっと詳しく知りたいという方は以下の記事もご覧ください。

-   [ウェブ制作者なら意識してほしいCSS設計の基礎知識](https://ics.media/entry/15166/)

### Scoped CSSとは

Scoped CSSとは**ある特定の範囲にのみCSSを適用できる機能**です。

Vue.jsでScoped CSSをどのように実現しているのかというと、HTML側にコンポーネント毎に**カスタムデータ属性を付与**し、CSS側にも対応するデータ属性を付与します。

![Scoped CSSの仕組み](https://ics.media/entry/200515/images/200515-scoped-css_base.png)

カスタムデータ属性によってCSSの影響範囲が閉じられ、同じクラス名やセレクターであっても影響しないようになります。

### Scoped CSS独自の注意点

Vue.jsのScoped CSSには**気付きにくい落とし穴が2つ**あります。

リセットCSSなどが適用されるように、**グローバルのスタイルはすべてのコンポーネントに適用されます**。意図しないスタイルが適用されないように、グローバルCSSに定義するクラス名などは注意しなければいけません。

![グローバルの定義がコンポーネントに影響する例](https://ics.media/entry/200515/images/200515-scoped-css_global.png)

さらに、**スタイルが子コンポーネントのルート要素に適用できる**という仕様があります。上記で解説したように、カスタムデータ属性の付与によってScopedを実現しているため子コンポーネントにはカスタムデータ属性が2つ付与されることになり、子コンポーネントのルート要素にスタイルを適用できるのです。

スタイルが子コンポーネントのルート要素に適用できるという仕様により、**意図しない子コンポーネントのスタイル上書き**が起きてしまう可能性があります。

![親コンポートの定義が子コンポーネントに影響する例](https://ics.media/entry/200515/images/200515-scoped-css_parent.png)

このように、Scoped CSSには**外部のCSSの影響を受けやすい**という特徴があるため、注意が必要です。

### Scoped x CSS設計

ここからが本題になりますが、Scoped CSSを利用すればCSS設計は要らなくなるのでしょうか？**CSS設計は必要である**というのが筆者の考えです。

なぜCSS設計が必要なのか「予測可能性」「再利用性」「保守性」「拡張性」の4つの観点から解説します。

#### 予測可能性

「予測可能性」というのは、スタイルを変更した時の影響範囲が正しく予測できるかという観点です。既存のコードを編集した時やスタイルを追加した時に、意図しない箇所がスタイルの影響を受けてしまうのは望ましくないです。

Scoped CSSを利用するとコンポーネント間の影響は防げますが、**コンポーネント内での「予測可能性」を担保できるわけではありません**。実際にコードを見てみましょう。

```
<template>
  <div>
    <div class="newsBlock">
      <p class="text">...</p>
    </div>
    <div class="aboutBlock">
      <p class="text">...</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.newsBlock {
  .text {
    color: red;
  }
}
.aboutBlock {
  .text {
    color: blue;
  }
}
</style>
```

たとえば、上記のようなコードでHTMLに修正が入るとします。**`.newsBlock`が`.aboutBlock`に内包されました**。

```
<template>
  <div>
    <div class="aboutBlock">
      <!-- .newsBlockを移動 -->
      <div class="newsBlock">
        <p class="text">...</p>
      </div>
      <p class="text">...</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.newsBlock {
  .text {
    color: red;
  }
}
.aboutBlock {
  .text {
    color: blue;
  }
}
</style>
```

CSSだけを見ると、`.newsBlock .text`は赤色が適用されていて`.aboutBlock .text`には青色が適用されていると誰もが予測するでしょう。しかし実際には、`.newsBlock .text`にも`color: blue;`が適用されており、どちらも青色のテキストになってしまいます。これでは「予測可能性」が満たされていません。

このように、**小さなスコープの中でも管理を怠るとカオスなCSSが生まれてしまう**可能性があります。

この場合の一番簡単な解決方法は以下のように `>`（子セレクター）を追記することです。

```
<style lang="scss" scoped>
.newsBlock {
  > .text {
    color: red;
  }
}
.aboutBlock {
  > .text {
    color: blue;
  }
}
</style>
```

しかし、この解決方法だと詳細については後述しますが、別の問題が浮上してきます。

#### 再利用性

次に既存のコンポーネントを別の箇所でも使いたい時に、コード書き直しや上書きの必要がないようにする「再利用性」の観点です。

Scoped CSSを利用すると、コンポーネント単位でスタイルの指定が可能でかつコンポーネント間でスタイルは基本的には影響しません。なので「再利用性」の観点は満たしているといえるでしょう。

しかし、注意点の項で紹介した通り**スタイルが子コンポーネントのルート要素に適用できる**という仕様があります。この仕様の影響で「再利用性」が損なわれる可能性があります。

以下のように、子コンポーネントのルート要素に定義されているクラス名と同じクラス名を親コンポーネントから呼び出す際に定義してしまうと、**子コンポーネントのスタイルを上書き**できてしまいます。

```
<!-- 親コンポーネント -->
<template>
  <div class="parent-component">
    <h1>親コンポーネント</h1>
    <childComponent class="child-component"></childComponent>
  </div>
</template>
<style lang="scss" scoped>
.child-component {
  color: red;
}
</style>
```

```
<!-- 子コンポーネント（childComponent） -->
<template>
  <div class="child-component">
    <h2>子コンポーネント</h2>
  </div>
</template>
<style lang="scss" scoped>
/* この場合親コンポーネントにより上書きされ、color: red;が適用されます。 */
.child-component {
  color: blue;
}
</style>
```

コンポーネント間に依存関係ができてしまい**特定のコンポーネント内だけでスタイルが変化する**という「再利用性」が損なわれたコンポーネントが生まれる恐れがあります。

![Scoped CSSの落とし穴で「再利用性」が損なわれてしまう例](https://ics.media/entry/200515/images/200515-scoped-css_reusability.png)

特定のコンポーネント内だけでスタイルが変化するというケースは、独自ルールを設けて親コンポーネントからのスタイル適用を回避しましょう。例として以下のようなルールが有用です。

-   次の2つのルールを同時に採用する。
    -   子コンポーネントのルート要素にはユニークなclass名（コンポーネント名に相当するclass名など）を定義する。
    -   親コンポーネントから呼び出す際にはユニークなclass名を定義してはいけない。
-   ルート要素はclass名を定義しない。

ただ、上記のルールだけでは不十分です。`.parent-component > div`のような指定により意図せずスタイルの上書きを行ってしまう可能性があるからです。さきほど「予測可能性」で挙げた`>`を追記した際に起きる問題がこちらです。不便ではありますが`>`の使用を非推奨にする必要があるかもしれません。

#### 保守性

コンポーネントの追加や更新、再配置する際に既存のコードのリファクタリングは必要ないようにする「保守性」の観点です。これはScoped CSSの得意分野なので、上記の「再利用性」や「予測可能性」の観点を守っていれば問題ないかと思います。

#### 拡張性

プロジェクト自体が大きくなり、開発者が増えた際にも簡単に管理できるようにする「拡張性」の観点です。

Scoped CSSになったことによりCSS設計を辞めるという選択をしたとしても、**ある程度のルールがないとCSSはどんどんとカオスになっていきます**。そこで独自ルールを策定したとしてプロジェクトが大きくなり開発者も増え、自分の手からコードが離れた際にもCSSを管理し続けられるでしょうか？

「拡張性」を守るためにはCSS設計を利用するのが有効です。CSS設計は汎用性が高く、広く用いられており、経年劣化にも強いためです。

プロジェクト自体が小規模で、かつ規模も変わらないという場合にはCSS設計は不要かと思います。しかし、チームでの開発がメインであるプロジェクトではScoped CSSであってもCSS設計を利用するべきでしょう。

### 私たち流のCSSガイドラインの紹介

以上の方針をもとにCSSガイドラインを用意して、フロントエンド開発の現場で活用しようとしています。その一部を紹介しましょう。

BEMシステムのシンタックスである、Block、Element、Modifierに分類して構成される規則を採用しています。SMACSSやFLOCSSなどのようなCSS設計ではレイアウトなどを接頭辞を付けて管理しますが、それはコンポーネントの粒度で管理できるのでBEMを採用しました。

Elementはアンダースコア1つ、Modifierはアンダースコア2つで表現します。ここはPRECSSの命名規則を踏襲しています。

```
.block {
  &_element {} /* Element */
  &__modifier {} /* Modifier */
} /* Block */

```

**スタイルを当てる要素にはすべてクラス名を付ける**ことを推奨します。このルールは、意図しない子コンポーネントのスタイル上書きの回避と「予測可能性」を確保して`li`から別コンポーネントへ切り出す場合の作業を楽にする意図があります。

▼NG例

```
<template>
  <ul class="todo-list">
    <li>リスト1</li>
    <li>リスト2</li>
    <li>リスト3</li>
  </ul>
</template>
<style lang="scss" scoped>
.todo-list {
  > li {}
}
</style>
```

▼OK例

```
<template>
  <ul class="todo-list">
    <li class="todo-list_item">リスト1</li>
    <li class="todo-list_item">リスト2</li>
    <li class="todo-list_item">リスト3</li>
  </ul>
</template>
<style lang="scss" scoped>
.todo-list {
  &_item {}
}
</style>
```

各コンポーネントの**ルート要素にはコンポーネント名に相当するclass名を付けます**。

```
<!-- PostBlock.vue の場合 -->
<template>
  <div
    class="post-block"
  >
    ...
  </div>
</template>
<style lang="scss" scoped>
  .post-block {}
</style>
```

親コンポーネントから子コンポーネントにクラス名を付ける時は、**コンポーネント名に相当するclass名を付けてはいけません**。子コンポーネントにクラス名を付ける時には、Elementとして扱うなどでコンポーネント名に相当するclass名を付けないようにしましょう。

▼NG例

```
<!-- AboutPage.vueの場合 -->
<template>
  <div
    class="about-page"
  >
    <!-- 親コンポーネントからコンポーネント名をclassに付けるのは禁止 -->
    <PostBlock class="post-block" />
  </div>
</template>
```

▼OK例

```
<!-- AboutPage.vue の場合 -->
<template>
  <div
    class="about-page"
  >
    <PostBlock class="about-page_item" />
  </div>
</template>
```

グローバルCSSはすべてのページに共通して読み込まれるものなので、クラスを扱う時には**具体的な命名**にしましょう。汎用的な名前はコンポーネント内での衝突リスクがあるためです。

▼NG例

```
.button {}
.card {}
.slider {}
```

▼OK例

```
.send-mail-button {}
.post-card {}
.thumbnail-slider {}
```

その他細かいルールはありますが、基本的には上記のようになっています。やっていることは主にCSS設計（BEM）の採用とScoped CSSの落とし穴の回避策の設定です。

### まとめ

Scoped CSSを導入すればCSSは関してのルールは無くても大丈夫、というものではないことが分かって頂けたかと思います。

Scoped CSSは便利ですが意外と落とし穴も大きいです。よりよいCSSを書くためには、それらの回避策が必要になります。回避策として独自ルール策定する際には、「コンポーネントの一部分だけ別コンポーネントに切り分ける場合」「別コンポーネント内に配置する場合」「コンポーネント内でHTMLに変更が起きる場合」など**さまざまな状況を想定し想像力を働かせる**必要があります。

今回紹介したCSSの記述ルールはあくまで一例ですので、プロジェクトに合わせたルールでScoped CSSを使いこなしましょう！