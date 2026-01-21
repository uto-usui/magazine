---
title: "CSSでスタッガーアニメーションがつくれる！　sibling-index() / sibling-count()の活用アイデア"
source: "https://ics.media/entry/260116/"
publishedDate: "2026-01-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "sawada-naomi"
---

`sibling-index()`関数と`sibling-count()`関数は、兄弟要素の「**並び順**」や「**総数**」を**整数として返す**CSS関数です。数値として使えるので、`calc()`関数などと組み合わせられます。

具体例としてわかりやすいのが、スタッガーアニメーション（要素が順番に遅れて動くアニメーション）です。これまでCSSでスタッガーアニメーションを実装するには、`:nth-child(1)`、`:nth-child(2)`…と個別に指定したり、JavaScriptでインデックスを付与する必要がありました。`sibling-index()`関数と`sibling-count()`関数を使えば、これらの手間なく、CSSだけで柔軟なスタイリングが可能になります。

今回はスタッガーアニメーションを含めた2つのCSS関数の活用アイデアを紹介します。

### sibling-index() / sibling-count()とは？

2つのCSS関数について、使い方を簡単に説明します。

#### sibling-index()

指定した要素が「**兄弟要素のなかで何番目か**」を整数で返します。

次の例では、`calc()`関数の計算式に`sibling-index()`を当てはめて、**アイテムが何番目かによって横幅が変化**するようにしています。カッコ内の引数は、なしで使用します。

```
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

```
li {
  /* ⭐️リストのアイテム要素に対して指定します */
  width: calc(sibling-index() * 100px);
}
```

※上記のコードでは装飾用スタイルを省略しています。

番号のカウントは`nth-child()`疑似クラスと同じく`1`から始まります。つまり、1つ目のアイテムの横幅は`1 × 100px`となるため`100px`です。そして2つ目は`200px`、3つ目は`300px`といった増え方をします。

![](https://ics.media/entry/260116/images/260116_sibling-index.png)

#### sibling-count()

`count`と名前につくとおり、こちらは「**兄弟要素の総数**」を整数で返します。

※`sibling-count()`は要素自身もカウントに含みます（兄弟要素＋自分）。

次のコードでは、**リスト全体のアイテム数に応じて**アイテムの横幅が変化します。

```
<!-- 1つ目のリスト -->
<ul>
  <li>1</li>
  <li>2</li>
</ul>

<!-- 2つ目のリスト -->
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

```
li {
  /* ⭐️リストアイテムに対して指定します */
  width: calc(sibling-count() * 100px);
}
```

次の図のように、1つ目のリストでは各アイテムの横幅は`200px`に、2つ目のリストでは`300px`になります。`sibling-count()`関数も`sibling-index()`関数と同様に引数なしで使用します。

![](https://ics.media/entry/260116/images/260116_sibling-count.png)

ちなみに、`sibling-index()`と`sibling-count()`関数はいずれも実際に返される数値をブラウザの開発ツール上で確認できます。

以下はChromeの開発ツールで1つ目のリストアイテムを選択した場合の表示です（`sibling-index()`の例）。

![](https://ics.media/entry/260116/images/260116_devtool.png)

［スタイル］タブで確認できるCSSのうち、`sibling-index()`へ薄く点線が引かれています。カーソルを合わせると`1`や`2`といった実際に適用されている数値が表示されます（上図では`1`）。`sibling-count()`も同じ方法で確認可能です。

### ①sibling-index()でスタッガーアニメーションをつくる

次のデモは、ぱらぱらと表示されるアニメーションの例です。少し回転しながら順番に表示されます。このように順番に時間差で動くアニメーションはスタッガーアニメーションと呼ばれています。

▼ボタンをクリックしてアニメーション再生できます

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260116_sibling-index_sibling-count/01-01_staggered-animation/index.html)
-   [コードを確認する](https://github.com/ics-creative/260116_sibling-index_sibling-count/tree/main/01-01_staggered-animation)

`sibling-index()`関数を使うと、冒頭でも述べた`:nth-child()`の列挙やHTML側でのインデックス付与なしに、よりシンプルに記述できます。

▼HTML一部抜粋

```
<ul>
  <li></li>
  <li></li>
  <li></li>

  <!-- 以下省略 li要素が続きます -->
</ul>
```

▼CSS一部抜粋

```
/* 整列した状態のスタイル */
li {
  transform: rotate(0deg);
  transition: opacity 0.4s, transform 0.4s;
  transition-delay: calc((sibling-index() - 1) * 0.05s);
}

/* 初回表示時のスタイル */
@starting-style {
  li {
    --rotate-deg: calc((sibling-index() - 1) * 1.5deg);
    opacity: 0;
    transform: rotate(var(--rotate-deg));
  }
}
```

※上記のコードでは装飾用スタイルを省略しています。

このデモでは`transition-delay`プロパティに`sibling-index()`関数を使い、並び順に応じて遅延時間を増やすことで、アイテムが時間差で表示されるスタッガー表現を作っています。今回は最初のアイテムを遅延なしで表示したいので、`sibling-index()`からあらかじめ`1`を引いて`0`始まりに調整しています。

`@starting-style`アットルールでは要素が初回表示時のスタイルを指定できます。ここでは初期状態を`opacity: 0`で非表示にしつつ、`sibling-index()`から算出した角度（`--rotate-deg`）で少し回転した状態にしています。表示後は、アイテムが順番に回転しながら集まるような印象になります。

要素数へ依存せず、HTMLへの属性追加なしにCSSだけで実現できるのが嬉しいですね！

### ②sibling-index()でアイテムごとにカラーを変化させる

`sibling-index()`は`hsl()`や`oklch()`などの、色を「数値の組み合わせ」で指定できるCSSの色関数との相性もよいです。

#### hsl()との組み合わせ

`hsl()`は色相・彩度・明度を数値で指定できる関数です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260116_sibling-index_sibling-count/02-01_hsl/index.html)
-   [コードを確認する](https://github.com/ics-creative/260116_sibling-index_sibling-count/tree/main/02-01_hsl)

上のデモでは、`hsl()`関数の記述に`sibling-index()`を含めることで、リストアイテムの順番によって彩度が変化しています。

1番目のアイテムは彩度`100%`になり、次のアイテムから順番に`15%`ずつ減少します。

▼CSS一部抜粋

```
li {
  /* ⭐️彩度を15%ずつ変化させる */
  background: hsl(200deg calc(100% - (sibling-index() - 1) * 15%) 60%);
}
```

#### oklch()との組み合わせ

色相を順番に変化させて、色相環のような見た目もつくれます。

`oklch()`は`hsl()`と同様に色を数値で指定できますが、数値の変化と見た目の変化がより一致しやすいよう設計された色空間です。そのため`sibling-index()`で返る数値のような、一定量ずつの変化でも明るさのムラが出にくいのが特徴です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260116_sibling-index_sibling-count/02-02_color-wheel/index.html)
-   [コードを確認する](https://github.com/ics-creative/260116_sibling-index_sibling-count/tree/main/02-02_color-wheel)

▼CSS一部抜粋

```
/* ⭐️色相を15ずつ変化させる */
li {
  background: oklch(80% 0.25 calc((sibling-index() - 1) * 15));
}
```

今回のデモではアイテムを円形に配置するため、`transform`プロパティの`rotate`の指定にも`sibling-index()`関数を使用しています。

▼CSS一部抜粋

```
li {
  transform: translate(-50%, -50%) rotate(calc((sibling-index() - 1) * 15deg)) translateY(-260px);
}
```

※アイテム数を24個としているため、角度は`15deg`（= `360/24`）を固定値で指定しています。要素数に応じて角度を自動計算したい場合は`sibling-count()`と組み合わせて`360deg / sibling-count()`のように書けます。このような組み合わせ例について、次のセクションで詳しく紹介します。

### ③組み合わせてカードの手札風UIをつくる

`sibling-index()`と`sibling-count()`を組み合わせたUI例を紹介します。

▼トランプカードの手札のように扇状に並ぶUIです。各カードをホバーして「✕」ボタンをクリックするとカードは消えますが、カードが減ったあとも残りのカードは自動的にバランスよく配置されます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260116_sibling-index_sibling-count/03_deck-of-cards/index.html)
-   [コードを確認する](https://github.com/ics-creative/260116_sibling-index_sibling-count/tree/main/03_deck-of-cards)

ポイントはリストアイテムに設定した`transform`プロパティの`rotate`指定です。カード1枚ごとにどれくらい傾けるかを計算するために`sibling-index()`と`sibling-count()`関数を使用しています。

▼CSS一部抜粋

```
li {
  /* transformの指定のみ抜粋 */
  transform:
  translateX(-50%)
  rotate(
    calc(
      (sibling-index() - (sibling-count() + 1) / 2) * 20deg
    )
  )
  translateY(-160px);
}
```

`rotate`の`calc()`関数内にある式は、カード全体の中央位置を`0`として、外側に並ぶカードほど回転角度が大きくなるよう計算しています。

`sibling-count() + 1) / 2`の計算が、カード全体の中央を求めるための式にあたります。今回は総数`7`枚のため、計算式は`(7 + 1) / 2`となり結果は`4`です。

さらに、`calc()`関数全体の計算式にあてはめると`(4 - 4) * 20deg = 0`になるため、4枚目のカードは傾かず表示されます。そして、4枚目の左右のカードはそれぞれ`20`度ずつ傾きが増加していく仕組みです。

![](https://ics.media/entry/260116/images/260116_deck-of-cards.png)

`6`枚に減らした際も、3・4枚目が中央に見えるよう再配置されるので、ぜひデモを触ってカードを削除してみてください。

このように`sibling-index()`と`sibling-count()`を組み合わせることで、CSSだけで可能なレイアウトの幅がひろがります。

### 対応ブラウザ

`sibling-index()`・`sibling-count()`関数は、いずれもChrome・Edge 138（2025年6月）、Safari 26.2（2025年12月）以上で利用可能です。

参照：[Can I use…](https://caniuse.com/wf-sibling-count)

### まとめ

`sibling-index()`関数と`sibling-count()`関数、2つの実装例について紹介しました。スタッガーアニメーションや色の変化、レイアウト調整など要素数が可変なUIに対してCSSだけで柔軟に対応しやすいのが魅力です。ぜひ、実装に取り入れてみてはいかがでしょうか。

### 参考サイト

-   [sibling-index() - CSS | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Values/sibling-index)
-   [sibling-count() - CSS | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Values/sibling-count)
-   [@starting-style - CSS | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Reference/At-rules/@starting-style)