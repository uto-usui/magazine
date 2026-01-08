---
title: "標準のHTML+CSSでスコープ化が可能に！ @scope入門"
source: "https://ics.media/entry/250520/"
publishedDate: "2025-05-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "iwama"
---

2025年5月20日 公開 / [株式会社ICS 岩間 日菜](https://ics.media/entry/staff/iwama/)

CSSの新機能「`@scope`アットルール」。このルールを使えば、CSSセレクターに**適用されるスタイルのスコープ（範囲）をHTMLの特定の一部分に限定**できます。さらに、その**開始点（ルート）や終了点（リミット）も柔軟に設定**できます。

この記事では、CSSのスコープを制御できる`@scope`の基本的な使い方や注意点を解説します。

`@scope`を使用すると、以下のようなメリットがあります。

-   クラス名を複雑にしなくてすむ
-   スタイルの衝突を防ぎやすくなる
-   保守性が高まる

`.title`や`.button`などのよく使うクラス名も、スコープごとにスタイルを分けられます。その結果、複雑なクラス名を増やさずにすみ、意図しないスタイルの上書きも防ぎやすくなります。また、スコープを設定することで**影響範囲が明確に**なり、あとからスタイルを修正したり追加したりしやすくなります。

`@scope`の使い方は大きく2通りに分けられます。それぞれ詳しく紹介します。

### 1.「スコープの開始点と終了点」を明示して使う場合

`@scope`は、CSSファイル（外部CSS）やHTMLの`<style>`要素など、いわゆるグローバルなCSSの中で、独立したブロックとして記述できます。この場合は、**スコープルート（スコープの開始点）と、必要に応じてスコープリミット（スコープの終了点）をカッコ内に記述**します。

基本的な構文は次のようになります。

```
@scope (スコープルート) to (スコープリミット) {
  /* ルールセット */
}
```

-   スコープルート：スコープを開始する要素を指定
-   スコープリミット（省略可能）：スコープを終了する要素を指定

次のように書くと、`.section`の中にある`<p>`要素だけにスタイルを適用できます。

```
@scope (.section) {
  p {
    color: green;
  }
}
```

さらに、スコープの範囲を細かく制御したい場合は、`to`を使ってスコープリミットを指定することもできます。次のように書くと、「`.section_footer`から始まって`.section_footer_textarea_inner`までの間にある`<p>`要素にだけスタイルを当てる」ことができます。

▼ HTML

```
<div class="section">
  <p>適用されません</p>

  <div class="section_footer">
    <p>適用されます</p>

    <div class="section_footer_textarea">
      <p>適用されます</p>

      <div class="section_footer_textarea_inner">
        <p>適用されません</p>
      </div>
    </div>
  </div>
</div>
```

▼ CSS

```
@scope (.section_footer) to (.section_footer_textarea_inner) {
  p {
    color: green;
  }
}
```

![CSSの@scopeルールとHTML構造を使って、スタイルのスコープ範囲を視覚的に示した図。上部にはCSSコードがあり、@scope (.section_footer) to (.section_footer_textarea_inner) の範囲内で p 要素に color: green が適用されることを示している。下部には対応するHTML構造があり、.section_footer から .section_footer_textarea_inner までの範囲にある <p> 要素にスタイルが適用されることが、矢印と「スコープ範囲（スタイルが適用される）」という注釈で示されている。スコープ外の <p> 要素にはスタイルが適用されないことが色の違いで明示されている。](https://ics.media/entry/250520/images/images/250520_css-at-rule_image01.jpg)

![CSSの@scopeルールにおけるスタイルの適用範囲を示す比較図。左側には『適用されません』『適用されます』の文字が並び、それぞれ黒または緑色で表示されている。右側には各テキストがどのHTML構造の要素に対応するかを示すクラス名付きの説明があり、.section、.section_footer、.section_footer_textarea、.section_footer_textarea_inner の順に示されている。.section_footer から .section_footer_textarea_inner までがスコープとして指定されているため、.section_footer および .section_footer_textarea にある <p> 要素にはスタイル（緑色）が適用され、スコープ外の .section や .section_footer_textarea_inner の <p> 要素には適用されていないことが視覚的に示されている。](https://ics.media/entry/250520/images/images/250520_css-at-rule_image02.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250520_css_at-rule/demo/01-01/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250520_css_at-rule/blob/main/demo/01-01/index.html)

#### ⚠️注意点

以下のHTML・CSSをご覧ください。

▼ HTML

```
<div class="section">
  <p>適用されます</p>

  <div class="section_footer">
    <p>適用されません</p>
  </div>

  <!-- 🌟以下の<p>要素に color: green; は適用されるでしょうか？ -->
  <p>適用される？</p>
</div>
```

▼ CSS

```
@scope (.section) to (.section_footer) {
  p {
    color: green;
  }
}
```

このスコープは『`.section`から始まり、`.section_footer`に入る直前まで』が対象範囲になります。最後の`<p>適用される？</p>`に、`color: green;`のスタイルは適用されるでしょうか？

答えは、**適用されます**。理由は、`@scope (スコープルート) to (スコープリミット)` の仕組みにあります。この構文は、『スコープルートから始まり、スコープリミットの**中に入るまで**の要素にスタイルが適用される』という仕組みになっています。

スコープは「記述の位置」ではなく、「DOMツリー上での構造（内側か外側か）」に基づいて判断されるのがポイントです。`.section_footer`の外側にある2つの`<p>`要素は、どちらも同じ階層（兄弟要素）にあり、スコープ内と見なされます。一方で、`.section_footer`の中にある`<p>`要素は、スコープリミットの内側に含まれているため、スコープの範囲外となります。

![CSSの@scopeルールによるスコープのルートとリミットの設定例を示す図。上部にはCSSコードがあり、@scope (.section) to (.section_footer) の範囲内で <p> 要素に color: green が適用されることを示している。右には『.section から .section_footer に入るまでの <p> 要素に適用される』という注釈がある。下部には対応するHTML構造があり、.section に含まれる最初の <p> と最後の <p> はスコープ内であるためスタイルが適用され、.section_footer 内の <p> はスコープリミットに到達しているためスタイルが適用されないことが示されている。図の右側では、スコープのルートとリミットを可視化するために枠線とラベルが用いられており、適用される範囲とされない範囲を視覚的に区別できる構成になっている。](https://ics.media/entry/250520/images/images/250520_css-at-rule_image03.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250520_css_at-rule/demo/01-02/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250520_css_at-rule/blob/main/demo/01-02/index.html)

### 2\. 親要素を自動的にスコープのルートとする場合

`@scope`は、HTMLの`<style>`要素内にインラインスタイルとして記述することもできます。この場合、スコープのルートやリミットをカッコ内に書く必要はありません。`<style>`要素の**親要素が自動的にスコープルートとして扱われます**。

次のコードをご覧ください。

▼ HTML

```
<div class="section">
  <style>
    @scope {
      p {
        color: green;
      }
    }
  </style>
  <p>適用されます</p>
  <div>適用されません</div>

  <div>
    <p>適用されます</p>
  </div>
</div>

<!-- ▼ 別のスコープのため、上記のスタイルは適用されない -->
<div class="section">
  <p>適用されません</p>
</div>
```

![HTML内の<style>要素で@scopeを使用し、親要素である<div class='section'>をスコープとしてp要素のみにスタイル（color: green;）を適用している例。上部の<div class='section'>内にある<p>タグにはスタイルが適用されており、<div>タグや別の<section>内の<p>タグには適用されていない。矢印と注釈で、スコープの範囲と、どの要素にスタイルが適用されるか・されないかが説明されている。スコープ内のp要素にはスタイルが適用され、div要素やスコープ外の同名クラス要素内のpタグにはスタイルが適用されないことが示されている。](https://ics.media/entry/250520/images/images/250520_css-at-rule_image04.jpg)

![HTML内の<style>要素で@scopeを使用し、親要素である<div class='section'>をスコープとしてp要素のみにスタイル（color: green;）を適用している例。1行目は .section 直下の <p> 要素で適用される。2行目は .section 直下の <div> 要素であり、スタイルは適用されない。3行目は .section 直下の <div> 要素の中の <p> 要素であり、.section > div > p のセレクターに一致するためスタイルが適用される。4行目は別スコープの .section 要素内の <p> であるため、スタイルは適用されないことを示している。](https://ics.media/entry/250520/images/images/250520_css-at-rule_image05.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250520_css_at-rule/demo/01-03/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250520_css_at-rule/blob/main/demo/01-03/index.html)

この `<style>`要素に書かれた`p {}`のスタイルは、親要素である`.section`の中すべての`<p>`要素に適用されます。今回は`to`セレクターでスコープの終了点（リミット）が指定されていないため、スコープは`.section`全体になります。

そのため、たとえ`<p>`要素が`.section`の直下ではなく、入れ子になった`<div>`要素の中にあっても、同じ`.section`内にある限りスタイルが適用されます。

ポイントは以下です。

-   `@scope`の前置き`（(ルート) to (リミット)）`は省略される
-   スコープの対象は、`<style>`要素の親要素になる

コンポーネントごとにスタイルを閉じ込めたいときや、限定的にスタイルを適用したいときに便利です。

### `@scope`アットルールと`:scope`疑似クラスの違い

ここまで紹介してきた`@scope`アットルールとは別に、CSSには`:scope`という疑似クラスも存在します。

`:scope`疑似クラスは、使われる文脈によって意味は多少異なりますが、主に「スコープのルート要素を指定する」ことができます。詳しくは以下のMDNのページをご覧ください。

-   [:scope - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/:scope)

次のように、CSSのルート（グローバルな文脈）の中で単独で使用する場合は、`:root`や`html`セレクターと同じく、ページ全体のルートである`<html>`要素への指定となります。

▼ CSS

```
/* ▼ <html> 要素全体への指定（:root {} や html {} と同等） */
:scope {
  /* スタイル */
}
```

#### `@scope`アットルールと`:scope`疑似クラスを組み合わせて使用する

次のように、`@scope`と組み合わせて使用することもできます。

▼ HTML

```
<div class="section">
  <p>文字色は『オレンジ』です</p>
  <div>文字色は『青』です</div>

  <div>
    <p>文字色は『緑』です</p>
    <div>文字色は『青』です</div>
  </div>
</div>
```

▼ CSS

```
@scope (.section) {
  :scope {
    color: blue;
  }

  :scope > p {
    /* ▼ スコープルート（.section）直下の<p>のみオレンジ */
    color: orange;
  }

  p {
    /* ▼ スコープルート（.section）内のすべての<p>を緑に */
    /* ▼ しかし上の「:scope > p {}」のほうが詳細度が高いので、スタイルが上書きされる */
    color: green;
  }
}
```

このコードでは、`.section`をスコープルートとして`@scope`を使い、範囲内の要素にスタイルを適用しています。

-   `:scope { color: blue; }`：`.section`自体に『青』を指定
-   `:scope > p { color: orange; }`：`.section`直下の`<p>`要素に『オレンジ』を指定
-   `p { color: green; }`：`.section`内すべての`<p>`要素に『緑』を指定（ただし『オレンジ』の指定の方が**詳細度が高い**ため、`.section`直下の`<p>`要素は『オレンジ』）

![HTML, CSSコードと説明文を記載した画像。 p { color: green } と :scope > p { color: orange } の2種類の指定があるが、後者のほうが詳細度が高いため指定が優先されることを示している。](https://ics.media/entry/250520/images/images/250520_css-at-rule_image06.jpg)

![CSSの@scopeルールと:scope疑似クラスの組み合わせによって文字色が異なることを視覚的に示す図。左側には『文字色は〇〇です』という文言が4行あり、それぞれの文字色が青または緑またはオレンジに設定されている。右側には各行が対応するHTML要素の構造が記載されている。.section 直下の<p>要素はオレンジ色、.section 直下の<div>要素は青、.section 内の<p>要素（.section > div > p）は緑、.section 内の<div>要素（.section > div > div）は青。](https://ics.media/entry/250520/images/images/250520_css-at-rule_image07.jpg)

-   [サンプルを別タブで開く](https://ics-creative.github.io/250520_css_at-rule/demo/01-04/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250520_css_at-rule/blob/main/demo/01-04/index.html)

### ブラウザ対応状況

`@scope`は2025年5月現在、Chrome・Edge 118（2023年10月）、Safari 17.4（2024年3月）以上で利用できます。

-   参照：[Can I use…](https://caniuse.com/mdn-css_at-rules_scope)

![@scopeアットルールの対応ブラウザ](https://ics.media/entry/250520/images/250520_css-at-rule_caniuse.jpg)

### まとめ

`@scope`は[Interop 2025](https://web.dev/blog/interop-2025?hl=ja#the_css_scope_at-rule)で取り上げられています。そう遠くないうちに、すべての主要ブラウザで使えるようになるでしょう。便利な機能なので、ぜひ活用してみてください。

Interopについては、記事『[ウェブの新機能はいつまで待てば実践投入できるか](https://ics.media/entry/250422/#%E5%B0%86%E6%9D%A5%E3%81%AE%E4%BA%92%E6%8F%9B%E6%80%A7%E3%81%A8interop)』で詳しく紹介しています。

### 参考

-   [@scope - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/@scope)