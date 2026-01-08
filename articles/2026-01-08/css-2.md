---
title: "CSSで下線を引く方法まとめ - 様々な装飾方法とアニメーションに適した指定まで"
source: "https://ics.media/entry/230123/"
publishedDate: "2023-01-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

CSSでテキストに下線を引く場合、皆さんはどのプロパティを使いますか？　 `text-decoration`か`border-bottom`か、はたまた`background-image`プロパティか…。いろいろな方法で下線を引けるために、どれを使えばよいのか迷った経験がある方もいるでしょう。

この記事ではテキストの下線を引く方法を**場面別に**紹介します。

たくさんの下線を引く方法があってどれが良いのかわからない方。**シンプルな単語の装飾でも、3点リーダーがある場合でも、アニメーションさせる時でも、どんな時でも下線を引く方法**を探している方。装飾に使えるCSSを広くサラッと知りたい方。王道の内容をおさらいしたい方。本記事は、そんな皆さんに向けた内容となっています。

### 場面別に下線を引く方法まとめ

![場面別に下線を引く方法のチャート](https://ics.media/entry/230123/images/230123_underline_chart.png)

▲場面別に下線を引く方法まとめ。クリックで拡大してご覧ください。

いきなりですが、場面別に最適だと考えられる下線の引く方法を図としてまとめました。AからFの順で紹介していくので、お急ぎの方、お目当ての方法だけを知りたい方は、当てはまるセクションをご参照ください。

### 作り方：基本のHTML

まずは基本のHTMLから作り方を見ていきましょう。

下線を引きたい文字を`<span>`要素で囲み、`<span>`要素につけたクラスに対して、CSSで下線のスタイルを当てていきます。

```
<p>
  これは、<span class="underline">サンプル</span>のテキストです。
</p>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230123_text_underline/)
-   ソースコードを確認する（[HTML](https://github.com/ics-creative/230123_text_underline/blob/main/index.html)、[CSS](https://github.com/ics-creative/230123_text_underline/blob/main/style/underline.css)）

**`<span>`要素は、初期値が`display: inline;`であるインラインレベルな要素**かつ、`<button>`要素や`<a>`要素の中で使える何でも屋なので、今回のような文字の下線を引く場合には最適です。

HTMLが準備できたところで、基本形の下線から順に作っていきましょう。

### A： 基本の下線の引き方

シンプルに文字の下線を引きたいだけであれば、以下の理由から`text-decoration`プロパティがオススメです。

-   文字の装飾のために用意されたプロパティで、指定が簡単。
-   欧文書体の「g, j, p, q, y」には、ディセンダーと呼ばれる下線より下側にはみでる部位があり、`text-decoration: underline;`の場合は、下線とディセンダーとの交差部分の可読性が落ちないような指定ができる。参照：[text-decoration-skip-ink - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/text-decoration-skip-ink)

`text-decoration`プロパティは、線の装飾スタイルを設定できる一括指定プロパティです。以下の4つのプロパティを指定できます。

-   `text-decoration-color`：線の色。初期値は`currentcolor`。
-   `text-decoration-line`：線の位置。初期値は`none`。 そのほかの値については『[text-decoration-line - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/text-decoration-line)』を参照。
-   `text-decoration-style`：線の種類。初期値は`solid`（実線）。そのほかの値については『[text-decoration-style - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/text-decoration-style)』を参照。
-   `text-decoration-thickness`：線の太さ。初期値は`auto`。

```
.textDecoration {
  text-decoration: #05c662 underline 1px;

  /*   
    以下の4つをまとめた形です。
    text-decoration-color: #05c662;
    text-decoration-line: underline;
    text-decoration-style: solid; 初期値がsolidなので今回は省略
    text-decoration-thickness: 1px;
  */
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230123_text_underline/#a)
-   [ソースコードの該当箇所を確認する](https://github.com/ics-creative/230123_text_underline/blob/main/style/underline.css#L1-L30)

一括指定プロパティについて解説したものの、実はSafariでは`text-decoration` プロパティで一括指定ができません。以下の2通りのうち、いずれかの方法で対応します。

1.  ベンダープレフィックス`-webkit-`をつけて一括指定する。ただし`text-decoration-thickness`プロパティは、一括指定できないので個別に指定。
2.  一括指定はせず、すべて個別にプロパティを指定する。

▼`-webkit-`ベンダープレフィックスをつけて対応した例

```
.textDecoration {
  text-decoration: #05c662 underline 1px;
  
  /* -- ▼Safari用に追加 -- */
  -webkit-text-decoration: #05c662 underline;
  text-decoration-thickness: 1px; /* -webkit-text-decorationの一括指定に含められないので個別で指定 */
}
```

#### 下線のオフセット

**下線のオフセットは、`text-underline-offset`プロパティで指定が可能**です。`text-underline-offset` という名の通り、`text-decoration-line`プロパティで**値`underline`を指定した場合のみ適用**されます。

▼プロパティを個別指定してSafari対応しつつ、マーカー風の線を引く例

```
.textDecorationMarker {
  text-decoration-color: #05c662a0;
  text-decoration-line: underline;
  text-decoration-thickness: 8px;
  text-underline-offset: -5px;
}
```

![text_decorationによる下線のサンプル](https://ics.media/entry/230123/images/230123_text_decoration.png)

### B： 3点リーダーを含めたい場合の下線の引き方

文末の3点リーダー（…）を含めたいのであれば、`border-bottom`プロパティが簡単でオススメです。

`border-bottom`プロパティは、境界線の装飾スタイルを設定できる一括指定プロパティです。以下の3つのプロパティを指定できます。

-   `border-bottom-color`：線の色。初期値は`currentcolor`。
-   `border-bottom-style`：線の種類。初期値は`none`。そのほかの値については『[border-bottom-style - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/border-bottom-style)』を参照。
-   `border-bottom-width`：線の太さ。初期値は`medium`。

`border-bottom`プロパティに関しては、オフセットを指定できるプロパティがないので、`padding-bottom`プロパティをオフセットの代わりに指定して下線の位置を調整します。

```
.borderBottom {
  border-bottom: #05c662 solid 1px;
  padding-bottom: 5px; /* オフセット */
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230123_text_underline/#b)
-   [ソースコードの該当箇所を確認する](https://github.com/ics-creative/230123_text_underline/blob/main/style/underline.css#L32-L36)

補足：3点リーダーを作る用途のラッパー要素（`span.textOverflow`等）をHTMLに追加しています。3点リーダーの作り方については長くなるので省略します。[サンプルコードの該当箇所](https://github.com/ics-creative/230123_text_underline/blob/main/style/underline.css#L229-L257)をご覧ください。

```
<p class="textWrapper">
  <span class="textOverflow">
    <span class="borderBottom">これは、サンプルのテキストです。これは、サンプルのテキストです。これは、サンプルのテキストです。</span>
  </span>
</p>
```

#### 3点リーダーの作り方による下線の表示結果の違い

3点リーダーを作る方法は、`text-overflow: ellipsis;`と`-webkit-line-clamp`と2通りありますが、表示結果が少し異なります。複数行の場合は`-webkit-line-clamp`プロパティで、1行の場合はお好みで使いわけると良いでしょう。

※一番外側のラッパー要素と3点リーダーを作るラッパー要素を統合すると表示結果の違いがより顕著にでます。興味あればお試しください。

![3点リーダーの作り方による下線の違い](https://ics.media/entry/230123/images/230123_ellipsis.png)

#### 注意：文字の`font-size`・`line-height`とラッパー要素の`height`の関係について

3点リーダー対応した下線を作る際、複数行の時に3点リーダーを作るラッパー要素（サンプルコードの`.textOverflow`、`.lineClamp1`、`.lineClamp3`クラス）に`height`プロパティを指定しないと、下線の太さ等の指定した値によっては一番下の行の下線が隠れてしまうことがあります。

下線を表示させるために最低限必要な`height`の値の求め方は以下の図の通りです。

▼`height`プロパティのみ抜粋

```
.lineClamp3 {
  height: calc(16px * 1.75 * 3 + 5px);
}
```

![下線表示で最低限必要なheightの求め方](https://ics.media/entry/230123/images/230123_wrapper_height.png)

`font-size`・`line-height`・`padding-bottom`（下線に設定したオフセット）のそれぞれのプロパティで指定した値を確かめつつ、`height`プロパティを指定しておきましょう。

### C： 3点リーダーまで含むマーカー風な下線にしたい場合・グラデーション色を指定したい場合

3点リーダー対応かつ文字と線がかぶるようにしたい（オフセットにマイナスの値を指定したい）場合、もしくはグラデーションの線を作りたい場合は、`background-image`プロパティを使う方法が良いでしょう。

記事[『1歩踏み込んでみる！　CSSグラデーションのマニアックな世界』](https://ics.media/entry/200212/)で解説されているように、グラデーション関数を使えばいろいろなことができます。今回は`linear-gradient()`関数を使って、以下の2通りの方法で文字の下線を引きます。

![background-imageで下線を引いたサンプル](https://ics.media/entry/230123/images/230123_background_image.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230123_text_underline/#c)
-   [ソースコードの該当箇所を確認する](https://github.com/ics-creative/230123_text_underline/blob/main/style/underline.css#L38-L49)

#### 1： 3点リーダーまで含むマーカー風な下線

```
.simpleBackgroundImage {
  background-image: linear-gradient(transparent 50%, #fc40a199 0%);
}
```

背景の上半分を透明に、下半分に色を指定することでマーカー風の下線ができます。

#### 2： グラデーションの下線

方法1はシンプルな記述で済みますが線の太さをピクセル値で指定できません。ピクセル等の固定値を指定したい場合は、`background-size`プロパティで線の太さを指定しましょう。

`background-size`プロパティの幅の値に`100%`を指定して文字の長さに合わせ、`background-size`プロパティの高さの値に好みの線の太さを指定します。また、**背景が縦方向に繰り返さないよう、`background-repeat: no-repeat;`を追加し、`background-position: bottom;`を指定して要素の下位置を基準に配置**します。

オフセットを追加したい場合は、セクションBで紹介した方法と同じく`padding-bottom`を指定しましょう。

▼グラデーションの下線を引く例

```
.gradationBackgroundImage {
  background-image: linear-gradient(to right, #05c662, #fe407e); /* 線の色 */
  background-size: 100% 1px; /* 幅(100%=文字の長さ) | 高さ(線の太さ) */
  background-position: bottom; /* 下に配置 */
  background-repeat: no-repeat; /* 背景を繰り返さない */
  padding-bottom: 5px; /* オフセット */
}
```

### D： 線の幅が変化するようなアニメーションをつける

線の幅が変化するようなアニメーションさせたい場合は、`background-image`を使う方法が引き続き活躍します。

今回はラッパー要素（`p.textWrapper`）をホバーをした時に`background-size`を変化させて線が引かれ、ホバーを外した時に線が抜けていく動きようなアニメーションを作ります。

![background-sizeを使ったサンプルアニメーション](https://ics.media/entry/230123/images/230123_background_size.gif)

まず、`transition`プロパティに`background-size`とアニメーションのパラメーターを指定します。

次に、初期値を`background-size: 0 1px;`で線が見えない（横幅がない）状態にしておき、ホバーで`background-size: 100% 1px;`にして背景幅を文字の長さに合わせ、線がすべて表示されるように指定します。

また、`background-position`プロパティを`bottom right`から、ホバー時には`bottom left`へと起点を移動させることで線が駆け抜けていく動きになります。

```
.backgroundImage {
  background-image: linear-gradient(#05c662, #05c662); /* 単色 */
  background-size: 0 1px; /* 幅(0=見えない状態) | 高さ(=線の太さ) */
  background-position: bottom right; /* 右下に配置 */
  background-repeat: no-repeat;
  padding-bottom: 5px;
  transition: background-size 0.3s ease-out;
}

.textWrapper:hover .backgroundImage {
  background-size: 100% 1px; /* 幅(100%=文字の長さ) | 高さ(=線の太さ) */
  background-position: bottom left;  /* 左下に配置 */
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230123_text_underline/#d)
-   [ソースコードの該当箇所を確認する](https://github.com/ics-creative/230123_text_underline/blob/main/style/underline.css#L51-L76)

#### 簡単に雰囲気の違うアニメーションを作る方法

**複数行をアニメーションさせるときは、(`-webkit-`)`box-decoration-break`プロパティの値を`slice`か`clone`のどちらかに指定する**ことで簡単に雰囲気を変えられます。

-   `slice`：文頭〜文末まで複数行にまたがって、繋がってアニメーションする
-   `clone`：一行ごとに分割され、各行が一斉にアニメーションする

```
.backgroundImage__slice {
  box-decoration-break: slice; /* Firefox用に指定 */
  -webkit-box-decoration-break: slice; /* Firefox以外のブラウザ用に指定 */
  transition: background-size 1.2s ease-out;
}
```

![box-decoration-breakの値による下線アニメーションの違い](https://ics.media/entry/230123/images/230123_box_decoration_break.gif)

### E： 単語（1行以内）の下線で、移動や回転など自由度の高いアニメーションをつける

単語（1行以内）の下線で自由度の高いアニメーションを作りたい場合は、`before`要素や`after`要素といったCSS疑似要素を使って下線を作る方法が良いでしょう。セクションDで紹介した`background-size`プロパティのアニメーションは、線の幅だけを変えるものでしたが、**CSS疑似要素として下線を作る方法では、線の移動や回転などもアニメーションさせることができます。**

まず、以下のようにCSS疑似要素で線を作ります。

```
.pseudoElement {
  position: relative;
}

.pseudoElement::after {
  content: "";
  position: absolute;
  width: 100%; /* 文字の長さに合わせる */
  height: 1px; /* 線の太さ */
  bottom: -5px; /* オフセット */
  left: 0;
  background-color: #05c662;
}
```

そして、疑似要素の下線に対してアニメーションを追加します。サンプルでは、`transform`プロパティで移動や回転などを変化させるアニメーションをつけています。

```
.pseudoElement__translate::after {
  transform: translateY(10px) scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease-out;
}
.textWrapper:hover .pseudoElement__translate::after {
  transform: translateY(0) scaleX(1);
}
```

![CSS疑似要素による下線](https://ics.media/entry/230123/images/230123_pseudo_element.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230123_text_underline/#e)
-   [ソースコードの該当箇所を確認する](https://github.com/ics-creative/230123_text_underline/blob/main/style/underline.css#L78-L125)

### F： 下線用の要素を作る方法で、複数行でも自由度の高いアニメーションをつける

HTMLの構造が煩雑になってしまうので大々的にオススメはできませんが、**テキスト要素と下線要素とを分けて表示させることで、複数行でも自由度の高いアニメーションを**つけることができます。今回のサンプルでは、移動アニメーションや、要素全体に対してクリップマスクをかけて`background-size`プロパティ（線の幅）のアニメーションとは一味違う雰囲気を目指したアニメーションを作りました。

![下線用タグを作る場合のサンプルアニメーション](https://ics.media/entry/230123/images/230123_underline_layer.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230123_text_underline/#f)

作り方は以下の手順の通りです。マークアップを行い、CSSでアニメーションをつけていきます。

① 表示させるテキストと下線用に同じ文字の要素を用意。

② A~Cのセクションで紹介したいずれかの方法で下線を引く（以下のサンプルはセクションAと同じ`text-decoration`プロパティで引く方法を使用しています）。

③ 下線用の要素に`aria-hidden="true"` を追加。

```
<p class="textWrapper">
  <!-- ▼下線のみ表示させる要素 -->
  <span class="textDecoration invisibleText" aria-hidden="true">「ポッシャリ、ポッシャリ、ツイツイ、トン。<br>はやしのなかにふる霧は、<br>蟻のお手玉、三角帽子の、一寸法師のちいさなけまり」</span>
  <!-- ▼テキストのみ表示させる要素 -->
  <span class="visibleText">「ポッシャリ、ポッシャリ、ツイツイ、トン。<br>はやしのなかにふる霧は、<br>蟻のお手玉、三角帽子の、一寸法師のちいさなけまり」</span>
</p>
```

④ テキストのみ表示させる要素の位置を調整。

```
.visibleText {
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px; /* 配置を揃えるため、親要素(p.textWrapper)と同じpaddingを指定する */
}
```

⑤ 下線用の要素に`display: inline-block;`を追加。

⑥ 下線用の要素の文字色を透明にし、選択できないようにする。

⑦ 下線用の要素に対してアニメーションを追加。

```
.invisibleText {
  display: inline-block; /* インライン要素として下線を表示させつつ、ブロック要素としてアニメーションさせる */
  
  /* テキストを透明にし、選択できないようにする */
  color: transparent;
  user-select: none;

  /* アニメーションを追加…（詳しくはソースコードをご覧ください） */
}
```

-   ソースコードの該当箇所を確認する（[HTML](https://github.com/ics-creative/230123_text_underline/blob/main/index.html#L150-L173)、[CSS](https://github.com/ics-creative/230123_text_underline/blob/main/style/underline.css#L127-L198)）

#### 注意：`aria-hidden="true"` と`user-select: none;`の追加でアクセシビリティ対策も忘れずに

下線をアニメーションさせるために同じテキストの要素を2つ用意すると、スクリーンリーダーでは2回読み上げられます。下線のみ表示させる要素に`aria-hidden="true"`を追加し、同じ文章が読み上げられないようにしましょう。また、文字を透明色にしても二重でテキストを選択できてしまうので、下線のCSSには`user-select: none;`を追加し、選択できないようにケアしておくことが大切です。

### おまけ： 背景画像を使う

実線（単線）を主に解説しましたが、いずれの方法も当てはまらなかった場合もあるでしょう。そのような時は、`background-image: url()`で画像を指定する方法が使えます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230123_text_underline/#add)
-   [ソースコードの該当箇所を確認する](https://github.com/ics-creative/230123_text_underline/blob/main/style/underline.css#L200-L207)

### 注意： もともと実線を持つ要素を装飾目的のためだけに使用しないこと

`<u>`: 非言語的注釈（下線）要素など、もともと実線の下線を持つ要素がありますが、装飾目的としての使用は非推奨です。正しいマークアップを心がけつつ、上記で紹介したCSSを用いた実装を行いましょう。

### まとめ

さまざまなケースに応じてCSSプロパティ使い分けることで、どんな時でもテキストの下に線を引けることが理解いただけたかと思います。 場面別に簡単だと考えられる実装方法から順に紹介してありますので、必要な場面が訪れたとき、使い分ける参考になれば幸いです。

#### 参照記事

-   [<span> - MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/span)
-   [text-decoration - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/text-decoration)
-   [border-bottom - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/border-bottom)
-   [background-image - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/background-image)
-   [box-decoration-break - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/box-decoration-break)