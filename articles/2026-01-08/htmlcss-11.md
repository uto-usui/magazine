---
title: "HTMLとCSSでつくる！ リンクテキストのホバー時アニメーション11選"
source: "https://ics.media/entry/240801/"
publishedDate: "2024-08-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "sawada-naomi"
---

テキストをホバーしたときの変化やアニメーションをつくることは、どのようなサイトをつくっていてもほぼ必ず行う工程ではないでしょうか。

テキストがリンクであることをユーザーに伝えるという点では、ブラウザのデフォルトスタイルのような下線のみで十分な場合もあると思います。

しかしそれだけではなく、変化をつけてよりわかりやすくしたい場合や、サイト全体の雰囲気に合わせたい場合にちょっとしたアニメーションが効果的です。

今回は**HTMLとCSSのみで作成できる、シンプルながら少し目を引くアニメーション**をテーマに実装例を紹介します。

▼今回紹介する実装例一覧 ![](https://ics.media/entry/240801/images/240801_demo_all.gif)

とくに、以下のようなデザイナー／エンジニアにとって参考になれば嬉しいです。

-   HTMLとCSSのみでどのようなホバー時のアニメーションができるのか知りたい
-   透明度の変化や、下線のつけ外し以外の実装例の引き出しを増やしたい

※今回の実装例では主にヘッダー／フッターやサイドナビゲーションで使用されるような、比較的短いワード（= 1行に収まるテキスト量）のリンクテキストを想定しています。

### 共通のHTML

実装例の紹介に入る前に、ほとんどの実装例で共通するHTMLを掲載します。`a`タグ1つのシンプルな構成です。

実装例のうち「4. テキストにパースがつくアニメーション」のみ異なるHTMLを使用しますが、こちらは別途CSSとあわせてHTMLの掲載をします。

▼リンクテキストのHTML

```
 <a href="#" class="text">LINK TEXT</a>
```

### 共通のCSS

次に、すべての実装例で共通するCSSを掲載します。こちらはブラウザのデフォルトスタイルを打ち消すための記述です。

▼リンクテキストのCSS

```
a {
  color: #000;
  text-decoration: none;
}
```

※本筋ではないですが、リンクテキストを画面に中央配置するといった表示用のスタイルについてはレイアウト用CSSファイルに記述しています。詳細は以下を参考ください。

-   [レイアウト用CSSのソースコードを確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/layout.css)

ここからは、各実装例を紹介します。

### 1\. 字間が広がるアニメーション

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/1_letter-spacing/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/1_letter-spacing/index.css)

▼リンクテキストのCSS抜粋

```
.text {
  font-size: 60px;
  transition: letter-spacing 0.3s;
}

.text:hover {
  letter-spacing: 0.05em; /* 字間の設定 */
}
```

#### 解説

`letter-spacing`プロパティを使用して字間を広げているシンプルな動きです。

単位には相対値である`em`を使用しています。`em`はその要素自体に適用されているフォントサイズに依存します。今回の場合`font-size: 60px;`の指定があるので、`1em`は`60px`となります。そして、`0.05em`は`60 * 0.05 = 3`となり実質`letter-spacing: 3px;`の設定をしていることになります。

`em`を使用することで、以下のメリットがあります。

-   `px`等の絶対値指定と異なり、テキストのフォントサイズ変更に合わせて微調整する必要がない
-   フォントサイズの異なるテキストにスタイルを適用した場合もホバー時の印象を保てる

ちなみに、テキスト1字ごとの文字幅はフォントによって異なるので注意が必要です。

-   [letter-spacing | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/letter-spacing)
-   [CSS の値と単位 | MDN](https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Values_and_units)

### 2\. テキストが上下に回転するアニメーション

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/2_rotation/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/2_rotation/index.css)

▼CSSを抜粋

```
.text {
  overflow: hidden; /* 1つ目の影を隠す */
  color: transparent; /* テキスト本体は透明にする */
  font-size: 60px;
  /*
   影の設定
   1つ目：Y方向の位置にマイナスに設定してテキスト本体の上に配置、ぼかしなし
   2つ目：位置はテキスト本体と同じ、ぼかしなし
  */
  text-shadow: 0 -1.5em 0 #000, 0 0 0 #000;
  transition: text-shadow 0.3s;
}

.text:hover {
  text-shadow: 0 0 0 #000, 0 1.5em 0 #000; /* 2つの影の位置を上方向に1.5emずつずらす */
}
```

#### 解説

アニメーションを見るとテキストが同時に2つ見えますが、これらはいずれも`text-shadow`プロパティでつくられたテキストの影です。`text-shadow`プロパティの値はカンマ区切りで複数個の影を設定できるので、構造としては影が上下に並んでいる状態です。

-   [text-shadow | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/text-shadow)

そして、1つ目の影は`overflow: hidden;`の指定によって隠されています。 開発ツール上で`overflow: hidden;`の指定を解除して動きを確認すると、より仕組みがわかりやすいかと思います。

### 3\. テキストが上下に回転するアニメーション（背景色つき）

さきほどの「2. テキストが上下に回転するアニメーション」の実装例から、さらに背景色をつけたパターンを紹介します。

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/3_rotation-background/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/3_rotation-background/index.css)

▼リンクテキストのCSS抜粋

```
.text {
  padding: 0 10px;
  /* 1つ目の影を隠す */
  overflow: hidden;
  color: transparent; /* テキスト本体は透明にする */
  font-size: 60px;
  /*
   影の設定
   1つ目：Y方向の位置にマイナスに設定してテキスト本体の上に配置、ぼかしなし
   2つ目：位置はテキスト本体と同じ、ぼかしなし
  */
  text-shadow: 0 -1.5em 0 #000, 0 0 0 #000;
  background: linear-gradient(to bottom, #000 50%, transparent 50%) 0 100%;
  background-size: 100% 200%;
  transition: text-shadow 0.3s, background-position 0.3s;
}

.text:hover {
  /* 2つの影の位置を上方向に1.5emずつずらす */
  text-shadow: 0 0 0 #fff, 0 1.5em 0 #000;

  /* 背景の位置を動かす */
  background-position: 0 0;
}
```

#### 解説

`linear-gradient()`関数を使用して背景の上半分が黒で下半分が透明になるよう指定しています。カッコ内にある`to bottom, #000 50%, transparent 50%`の記述はそれぞれ以下の意味があります。

-   `to bottom`：上から下に向かって変化させる。これにより縦方向のグラデーションになります。
-   `#000 50%`：0〜50%（上半分）は黒。
-   `transparent 50%`：50%〜100%（下半分）は透明。

黒と透明、互いの色が同じ50%の位置で指定されているため、グラデーションの色がはっきりと切り替わって見えます。

サイズは`background-size`プロパティで横幅`100%`、高さ`200%`に設定しており、`overflow: hidden;`の効果で初期状態では上半分の黒背景が隠されています。

そして、ホバー時には`background-position`プロパティで位置を調整することで、黒背景がテキストの1つ目の影と一緒に下に回転しているように見せています。

### 4\. テキストにパースがつくアニメーション

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/4_perspective/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/4_perspective/index.css)

▼リンクテキストのHTMLを抜粋

```
<a href="#" class="text"><span>LINK TEXT</span></a>
```

ほかの実装例と異なり、テキスト要素を`span`タグで囲っています。

▼リンクテキストのCSSを抜粋

```
.text span {
  /* 初期値のinlineではtransformが効かないためinline-blockを指定 */
  display: inline-block;
  font-size: 60px;
  transition: transform 0.3s;
}

.text:hover span {
  transform: perspective(600px) rotateY(-15deg) rotateX(20deg);
}
```

#### 解説

この実装例は`transform`プロパティ内で、`perspective()`関数を使用してパースをつけることで奥行きのある表現にしています。`perspective()`関数がなくとも`rotateY()`関数と`rotateX()`関数によって傾きますが、パースがつくことでより立体感が生まれます。

`perspective()`で設定する値が小さくなるほど、より奥行きが出るのでぜひ開発ツール上で試してみてください。

-   [perspective() | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/transform-function/perspective)

そして、スタイルの指定は今回`text`クラスのついた`a`タグではなく、子要素の`span`タグに対して行っています。`transform`プロパティによる変形がクリック可能な領域に影響を与えないようにするためです。`a`タグに`transform`プロパティで今回の変形を適用すると、ホバー前とホバー中でクリックできる領域が変化していまいます。

### 5\. 左側から円が現れるアニメーション

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/5_circle/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/5_circle/index.css)

▼CSSを抜粋

```
.text {
  display: flex; /* テキストと疑似要素を横並びにする */
  font-size: 60px;
  align-items: center; /* 上下中央に揃える */
}

.text::before {
  width: 0; /* 初期表示は表示しないようにする */
  height: 0;
  content: "";
  background-color: transparent;
  border-radius: 50%;
  transition: 0.3s;
}

.text:hover::before {
  width: 0.25em; /* ホバー時に表示 */
  height: 0.25em;
  margin-right: 36px;
  background-color: #000;
}
```

#### 解説

円が出現するだけでなく、あわせてテキスト全体が動くのでより目を引きます。とくに縦にリンクテキストが並んでいる場合に、ホバー中のテキストがよりわかりやすくなるでしょう。

円は疑似要素でつくり、初期表示は非表示かつレイアウトに影響したくないので`width`プロパティと`height`プロパティは`0`にしておきます。

上記の設定があるので`background-color: transparent;`は不要に思えますが、徐々に現れるようにしたいのでホバー時は`transparent`から`#000`に色変化するようにしています。

### 6\. 下線が左から流れるアニメーション

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/6_underline/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/6_underline/index.css)

▼CSSを抜粋

```
.text {
  padding-bottom: 3px; /* テキストと下線の間隔 */
  font-size: 60px;
  background-image: linear-gradient(#000, #000);
  background-repeat: no-repeat;
  background-position: bottom right; /* 下線の初期位置 */
  background-size: 0 1px; /* 下線のサイズ（横幅、高さ） */
  transition: background-size 0.3s;
}

.text:hover {
  background-position: bottom left; /* 下線のホバー時位置 */
  background-size: 100% 1px; /* 下線の横幅を100%にする */
}
```

#### 解説

`background-image`プロパティと`background-size`プロパティで高さ（太さ）`1px`の線をつくり、`background-position`プロパティの値変化で線が左から右へ流れていくように見せています。

#### 下線の流れ方を変える

`background-position`プロパティの値を少し変更すると、下線の流れ方を変えられます。

▼右から左に流れるようにする（変更した箇所のみ抜粋）

```
.text {
  background-position: bottom left; /* 下線の初期位置 */
}

.text:hover {
  background-position: bottom right; /* 下線のホバー時位置 */
}
```

▼左から出て、左に戻る（変更した箇所のみ抜粋）

```
.text {
  background-position: bottom left; /* 下線の初期位置 */
}

.text:hover {
  background-position: bottom left; /* 下線のホバー時位置 */
}
```

#### 下線を引く方法はさまざま

以下記事にて、場面に応じた記述方法や複数行に対応する方法など詳しく紹介していますので、ぜひ参考ください。

-   『[CSSで下線を引く方法まとめ - 様々な装飾方法とアニメーションに適した指定まで](https://ics.media/entry/230123/)』

### 7\. テキストカラーが左から変化するアニメーション

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/7_text-color-slide-in/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/7_text-color-slide-in/index.css)

▼リンクテキストのCSS抜粋

```
.text {
  /* 文字色は透明にして背景が見えるようにする */
  color: transparent;
  font-size: 60px;

  /* オレンジと黒が50%の位置で切り替わるグラデーション */
  background: linear-gradient(to right, orange 50%, #000 50%) 100%;
  /* 背景をテキストで切り抜く */
  background-clip: text;

  /* 横幅は200%にしてグラデーションの青部分は見えないようにする */
  background-size: 200% 100%;

  transition: background-position 0.3s;
}

.text:hover {
  /* グラデーションの位置を移動して、オレンジ部分を見せる */
  background-position: 0 100%;
}
```

#### 解説

仕組みとしては、テキストの2倍（200%）サイズの背景が左から右へ移動しているイメージです。

「3. テキストが上下に回転するアニメーション（背景色つき）」の実装例でもコメントしていますが、グラデーションの色がパキッと切り替わっているのは、`linear-gradient()`関数内で青と黒の位置パーセンテージを同一にして境界を共有しているためです。

-   [linear-gradient() | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/gradient/linear-gradient)

そして、`background-clip`プロパティの値を`text`にすることで、背景を前景にあるテキストで切り抜いて表示をしています。

-   [background-clip | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/background-clip)

### 8\. テキストカラーと背景色が左から変化するアニメーション

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/8_background-slide-in/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/8_background-slide-in/index.css)

▼リンクテキストのCSS抜粋

```
.text {
  position: relative;
  padding: 0 10px; /* 見た目調整用の余白 */
  color: #000;
  font-size: 60px;
  background-color: #fff;
}

.text::before {
  position: absolute;
  left: 0;
  width: 0;
  height: 100%;
  content: "";
  background-color: #fff;
  mix-blend-mode: difference; /* difference（差分） */
  transition: 0.3s;
}

.text:hover::before {
  width: 100%;
}
```

#### 解説

`mix-blend-mode`プロパティを使用した、要素の重なった部分の見え方が変化していく実装例です。流れる背景は疑似要素で作成しています。初期状態では`0`だった横幅（`width`プロパティ）がホバー時に`100%`に広がるというシンプルな実装です。

ポイントとなるのが、`mix-blend-mode: difference;`の指定です。`mix-blend-mode`プロパティは要素が重なったときの見え方を変化させます。今回は疑似要素に`difference`を指定しているため、疑似要素が他要素と重なる部分は差分の色が見えるようになっています。

そのため疑似要素の白い背景が移動するとき、白地の部分は黒く見えて、黒字テキスト部分は白く見えるという仕組みです。

### 9\. テキストカラーと背景色が左から変化するアニメーション（画像背景あり）

白と黒ですと単純に色が反転しているように見えますが、たとえば画像などさまざまな色が含まれる要素と重ねてもおもしろい効果が得られます。

以下は背景画像を用意して、さらにテキスト自体にも`mix-blend-mode`プロパティを設定した場合の実装例です。

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/9_background-mix-blend/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/9_background-mix-blend/index.css)

▼背景画像とリンクテキストのCSS抜粋

```
body {
  background-image: url("./images/bg.jpg");
  background-size: cover;
}

/* テキストカラーと背景色が左から変化するアニメーション */
.text {
  position: relative;
  padding: 0 10px; /* 見た目調整用の余白 */
  color: #fff;
  font-size: 60px;
  mix-blend-mode: difference; /* difference（差分） */
}

.text::before {
  position: absolute;
  left: 0;
  width: 0;
  height: 100%;
  content: "";
  background-color: white;
  mix-blend-mode: difference; /* difference（差分） */
  transition: 0.3s;
}

.text:hover::before {
  width: 100%;
}
```

### 10\. テキストが一瞬ぼかされるアニメーション

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/10_blur/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/10_blur/index.css)

▼リンクテキストのCSS抜粋

```
.text {
  font-size: 60px;
}

.text:hover {
  animation: text-blur 0.5s;
}

/* アニメーション設定 */
@keyframes text-blur {
  0% {
    filter: blur(0);
  }
  50% {
    filter: blur(4px); /* ぼかしの強さ */
  }
  100% {
    filter: blur(0);
  }
}
```

#### 解説

ホバー時にテキストがぼかされてまた戻る動きをつくるため、`@keyframes`アットルールを使用しています。ぼかされた状態はテキストの可読性が落ちるので変化が起こる時間は短くしています。

ぼかしを行っているのは`filter`プロパティで設定している`blur()`関数です。`0`で「ぼかしなし」となり、値が大きいほど強くぼかされます。

-   [blur() | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/filter-function/blur)

### 11\. テキストの背景がぼかされるアニメーション

▼ホバーしてお試しください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/11_background-image-blur/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/11_background-image-blur/index.css)

▼リンクテキストのCSS抜粋

```
.text {
  position: relative;
  padding: 0 20px;
  color: #fff8;
  font-size: 60px;
}

/* テキストの疑似要素 */
.text::before {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* テキストより背面に表示する */
  width: 100%;
  height: 100%;
  content: "";
  transition: 0.3s;
}

/* テキストホバー時の疑似要素 */
.text:hover::before {
  -webkit-backdrop-filter: blur(10px); /* Safari表示用 */
  backdrop-filter: blur(10px); /* 背景をぼかす */
}
```

#### 解説

画像等の背景要素がある場合に効果的に使える実装例です。

さきほど紹介した「テキストが一瞬ぼかされるアニメーション」の実装例で、`filter`プロパティは指定した要素自体をぼかしましたが、今回使用している`backdrop-filter`プロパティは背面にある要素をぼかします。

-   [backdrop-filter | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/backdrop-filter)

#### `backdrop-filter`プロパティのブラウザ対応状況

ほとんどのモダンブラウザで対応していますが、2024年8月時点ではSafariのみベンダープレフィックスが必要です。2024年秋リリース予定のSafari 18.0からベンダープレフィックスが不要になります。

-   [CSS Backdrop Filter | Can I use…](https://caniuse.com/css-backdrop-filter)

### おまけ

ここからは、サイトに適用する際に調整するとよい点を紹介します。

#### コラム：アニメーションの緩急を調整する

今回紹介している実装例では、`transition`プロパティの値は汎用的な設定としてアニメーション対象のプロパティ名や再生時間のみを指定していました。実装例をサイトに取り入れる際は、他に動きのある要素やサイトの雰囲気に合わせて、ぜひイージング関数を使用してアニメーションの緩急を調整してみてください。

例として`cubic-bezier()`関数を使用して「テキストが上下に回転するアニメーション」を調整してみます。以下に調整前と調整後の両方を掲載しますのでぜひ違いを確認ください。

▼ホバーしてお試しください（調整前）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/2_rotation/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/2_rotation/index.css)

▼ホバーしてお試しください（調整後）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240801_link-hover-animations/extra_rotation-cubic-bezier/)
-   [CSSのソースコード全体を確認する](https://github.com/ics-creative/240801_link-hover-animations/blob/main/extra_rotation-cubic-bezier/index.css)

余韻があり調整前の実装例より凝っているような、少し上品で垢抜けた印象を持ちませんか？

コード上では、CSSに以下の指定を追加しています。

▼CSS追記箇所のみ抜粋

```
.text {
  /*
  cubic-bezierを使用して緩急にメリハリをつける
  easeInOutQuartのイージング
  */
  transition: text-shadow 0.4s cubic-bezier(0.76, 0, 0.24, 1);
}
```

`cubic-bezier()`関数の使い方を含め、アニメーションに緩急をつけて滑らかに見せる方法（イージング）について詳しく知りたい方は、ぜひ以下記事を参考ください。

-   [CSSイージングのお手本- ease-out, ease-in, linearの使い分け](https://ics.media/entry/18730/)

#### コラム： スマホではホバー時のアニメーションをつけたくない場合は？

スマホに限らず、タッチデバイスにおいてタップ時にホバー時用アニメーションがついてしまうのは意図しない場合がほとんどかと思います。

画面幅でデスクトップとスマホのスタイルを切り替えたとしても、大きめのタッチデバイスでタップしてアニメーションしてしまうと困りますよね。

そんなときは`any-hover`メディア特性を使用しましょう。メディア特性とは`@media`の構文のうち、デバイス環境などを記述する箇所を指します。`any-hover: hover`の記述でホバー可能なデバイスかどうか判定できます。

1つ目の、「字間が広がるアニメーション」の実装例を元にすると以下のように書きます。

```
/* ホバー可能なデバイスのみ適用 */
@media (any-hover: hover) {
  .text:hover {
    letter-spacing: 0.05em;
  }
}
```

`any-hover`メディア特性について、以下記事の各セクションでも紹介しているのでこちらも参考ください。

-   [タッチデバイスでのホバーアニメーションの回避 - 『リンク/ボタン/フォームをより良くするHTML・CSS 17選』](https://ics.media/entry/221208/#10.-%E3%82%BF%E3%83%83%E3%83%81%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9%E3%81%A7%E3%81%AE%E3%83%9B%E3%83%90%E3%83%BC%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E5%9B%9E%E9%81%BF)
-   [ホバーが有効なデバイスのみ、ホバー時の演出を行う - 『シンプルで使いやすいHTML・CSSボタンデザイン集11選』](https://ics.media/entry/230629/#%E3%83%9B%E3%83%90%E3%83%BC%E3%81%8C%E6%9C%89%E5%8A%B9%E3%81%AA%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9%E3%81%AE%E3%81%BF%E3%80%81%E3%83%9B%E3%83%90%E3%83%BC%E6%99%82%E3%81%AE%E6%BC%94%E5%87%BA%E3%82%92%E8%A1%8C%E3%81%86)

### まとめ

リンクテキストのホバー時アニメーションを紹介してきました。一つひとつは控えめ・シンプルな演出が多いですが、たとえばアニメーションを組み合わせることで、異なる印象を持たせることもできそうです。実装例を参考に、色々試してみていただけると嬉しいです。

また、以下記事では1文字ずつ変化するテキストアニメーションの実装例を紹介しています。本記事よりもHTMLが少し複雑になりますが、より表現の幅が広がるような内容ですのでぜひ閲覧ください。

-   [『HTMLとCSSでつくる!　1文字ずつ変化するテキストのアニメーション』](https://ics.media/entry/250131/)

ICS MEDIAでは、パーツ実装の引き出しを増やすのに役立つ記事がほかにもあります。こちらも参考ください。

-   [『シンプルで使いやすい HTML・CSSボタンデザイン集11選』](https://ics.media/entry/230629/)
-   [『HTML・CSSで実装する かわいいフキダシのアイデア』](https://ics.media/entry/240425/)