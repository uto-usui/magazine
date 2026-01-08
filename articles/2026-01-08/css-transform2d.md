---
title: "もう誤魔化さない！　CSS Transform完全入門(2D編)"
source: "https://ics.media/entry/210311/"
publishedDate: "2021-03-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

2021年3月11日 公開 / [株式会社ICS 松本 ゆき](https://ics.media/entry/staff/matsumoto/)

CSS Transformの仕様は意外にも複雑です。思った通りの場所に表示できず、その場凌ぎにmarginやpaddingの目分量で位置合わせをしてしまった……。そんな経験をもつ方もいるのではないでしょうか？

この記事では、CSS Transformの基礎をおさらいした上で、陥りやすいミスの回避方法や最新の機能を紹介します。

### CSS Transformとは？

CSS Transformはwebページで高度な表示やアニメーションを高速に描画するための仕様として生まれました。 往年のwebユーザーの方であれば、Google検索のイースターエッグのひとつ[『do a barrel roll』](https://www.google.com/search?q=do+a+barrel+roll)をご存知かもしれません。このイースターエッグは当時（2010年代初頭）最先端であったCSS Transformをデモする意味もありました。

2021年現在では、発展系の3D変形も含め、ほぼすべての機能がIE(Internet Explorer)を含めた主要な全ブラウザーで利用できます。ベンダープレフィックスもいりません。

### transform(2D)の基本

CSS Transformの基本は平行移動（translate）・回転（rotate）・拡大縮小（scale）・斜傾変形（skew）の4つです。この4つの変形操作を組み合わせることで自由に要素を動かせるようになります。 この記事では対象を2Dの変形に限定していますが、CSS Transformでは擬似的な3Dの変形も行えます。基本は同じなので、まずは2Dの変形をしっかり押さえておきましょう。

3Dの変形については後編の記事[『CSS Transform完全入門(3D編)』](https://ics.media/entry/210519/)で解説しています。

#### 基本の4操作

まずは基本の変形操作の挙動と書き方をおさらいしましょう。

![基本の4操作](https://ics.media/entry/210311/images/210311_basic.png)

各変形操作を実際に入力しながら試せるサンプルを用意しました。色々な値や組み合わせでどのような表示になるか、確認してみてください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210311_css_transform/sandbox.html)

なお、rotate以外の3つの操作はXYをそれぞれバラバラに指定する方法と、一括して指定する方法があります。 基本的には直感に反するものはないのですが、skewだけは異なります。 `translate(100px, 200px)`は`translateX(100px) translateY(200px)`のように分解しても意味は変わりませんが、`skew(30deg, 15deg)`と`skewX(30deg) skewY(30deg)`は異なる変形です。 skew自体利用頻度の高いものではないので無理に覚える必要はありませんが、困ったときには思い出してください。

#### 4つの操作を組み合わせる

基本の変形操作は自由に組み合わせて使うことができます。 次の例では、要素を2倍に拡大して、時計回りに45度回転させます。

```
#charactor {
  transform: rotate(45deg) scale(2);
}
```

同じ種類の変形を複数回書くこともできます。 次の例では、キャラクターをクリックするたびに`scale(1〜2)`のランダムな拡大操作を追加します。

▼ クリックするたびにscaleが追加されて大きくなる

![クリックするたびに少しずつ大きくなるサンプル](https://ics.media/entry/210311/images/210311_sample1.gif)

```
const chara = document.getElementById("charactor");
chara.addEventListener("click", () => {
  const scale = (1 + Math.random()).toFixed(2); // 1.00〜2.00の乱数
  chara.style.transform = `scale(${scale}) ` + chara.style.transform;
  document.getElementById("transformValue").textContent = chara.style.transform;
});
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210311_css_transform/sample01.html)
-   [コードを確認する](https://github.com/ics-creative/210311_css_transform/blob/master/sample01.html)

`transform`の値は「`scale(1.3) scale(1.1) scale(1.8)...`」のようにクリックするたびに長くなりますが、最終的にはそれらがすべて合算されてひとつのscaleにまとめられます。あまり不用意に使うべきではありませんが、すでに設定されている`transform`の値を壊さずに変形操作を追加したい場合に使うと良いでしょう。

### カンに頼らないtransformの本質

ここまでの内容を理解していれば、基本的なCSS Transformは自由に扱うことができるはずです。 その一方、複雑な変形操作を思った通りに行うには、もう少し詳細を理解する必要があります。

#### 変形の合成と順序

`transform`には複数の変形操作を書くことができますが、順序には注意が必要です。

顕著なのは`translate`と`rotate`や`scale`を組み合わせた場合です。次の例はどちらも100pxの水平移動と45度の回転を行なっていますが、順序によって結果が変わっていることがわかります。

```
#charactor1 {
  transform: translateX(200px) rotate(45deg);
}
#charactor2 {
  transform: rotate(45deg) translateX(200px);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210311_css_transform/sample02.html)
-   [コードを確認する](https://github.com/ics-creative/210311_css_transform/blob/master/sample02.html)

少し直感的でないように思われるかもしれませんが、**複数列挙したtransformの変形は「右から順番に」適用**されます。

![複数の変形操作の適用順序](https://ics.media/entry/210311/images/210311_composite.png)

この順序を正しく理解できていれば、次の2つのアニメーションがどのように動くのかは簡単にイメージできるでしょう。

```
#charactor1 {
  animation: 3s linear 1s infinite cyclic1;
}
@keyframes cyclic1 {
  from {
    transform: rotate(0deg) translateX(200px);
  }
  to {
    transform: rotate(360deg) translateX(200px);
  }
}

#charactor2 {
  animation: 3s linear 1s infinite cyclic2;
}
@keyframes cyclic2 {
  from {
    transform: translateX(200px) rotate(0deg);
  }
  to {
    transform: translateX(200px) rotate(360deg);
  }
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210311_css_transform/sample03.html)
-   [コードを確認する](https://github.com/ics-creative/210311_css_transform/blob/master/sample03.html)

▼ 解答（2つのアニメーションが動作する様子）

![変形操作の適用順序によるアニメーションの違い例](https://ics.media/entry/210311/images/210311_sample3.gif)

#### 変形の基準点

合成順序と並んで大切な要素が変形の基準点です。これまでの例では暗黙的に要素の中心を基準として回転や拡大縮小を行なっていましたが、現実には中心以外を基準としたいことも多いでしょう。このような場合に利用できるのが`transform-origin`です。

![origin=変形操作の基準点](https://ics.media/entry/210311/images/210311_origin.png)

次のCSSは、キャラクターにカーソルを載せると足元を基準に震わせるアニメーションを表示する例です。

```
#charactor:hover {
  animation: shake 1s 1 ease-in-out both;
  transform-origin: center bottom;
}
@keyframes shake {
  20% {
    transform: rotate(30deg);
  }
  40% {
    transform: rotate(-20deg);
  }
  60% {
    transform: rotate(10deg);
  }
  80% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210311_css_transform/sample04.html)
-   [コードを確認する](https://github.com/ics-creative/210311_css_transform/blob/master/sample04.html)

`transform-origin`は便利な機能なのでよく使われますが、これ自体は特別な機能ではなく、`translate`による移動操作のショートハンドのようなものです。 たとえば、キャラクターの足元を基準に45度回転させる操作は`transform-origin`を使わずに次のように記述しても同じ結果になります。

```
/* 中心→足元分移動してから回転、最後に逆方向に同じだけ移動 */
.charactor {
  transform: translate(0%, 50%) rotate(45deg) translate(0%, -50%);
}

/* 上と等価 */
.charactor {
  transform: rotate(45deg);
  transform-origin: center bottom;
}
```

![transform-originはtranslateで書き換え可能](https://ics.media/entry/210311/images/210311_origin2translate.png)

`translate`と`transform-origin`を両方使ってこんがらがってしまった時はこのルールを思い出すとよいでしょう。

#### すべてはmatrixへ

`transform`には複数の操作を好きなだけ書けるので、一見すると操作の数だけどんどん処理が重くなってしまうように感じられるかもしれません。 実際には、複数の変形操作は一度`matrix`という**ひとつの変形操作に集計され、この値（行列）を使って一度にすべての変形処理が行われます。**

次の図は、`transform: rotate(30deg) translate(100px, 100px)`がどのようにひとつの変形処理にまとめられるかを示したものです。このような行列を使った画像の変形はアフィン変換（Affine Transform）と呼ばれ、画像処理の領域では広く利用されているものです。

![全ての変形操作はmatrix行列に集約される](https://ics.media/entry/210311/images/210311_matrix.png)

行列の計算自体はブラウザーが行なってくれるので、通常はこの計算方法を理解する必要はありません。しかし、複数の変形操作がこうした行列計算でひとつにまとめられていることは知識として知っておきましょう。

### CSS Transformのよくある落とし穴

CSS Transformは自由度が高く便利な機能ですが、その分落とし穴にも注意が必要です。代表的なものを見てみましょう。

#### transformを書いたのに効かない

よくやってしまう落とし穴のひとつがtransformの重複（上書き）です。

次の例では、Floatボタンで`translate`を、Tiltボタンで`scale`を変更しています。両方のボタンを押すと、CSSのクラス名では`float tilt`の両方が指定されますが、変形操作は常に`tilt`の方しか適用されません。

![落とし穴1：transformの上書き](https://ics.media/entry/210311/images/210311_pitfall1.gif)

```
/* 上にずらす */
.float {
  transform: translateY(-100px);
}
/* 傾ける */
.tilt {
  transform: skewX(30deg);
}
```

```
const chara = document.getElementById("charactor");
const btnFloat = document.getElementById("btnFloat");
const btnTilt = document.getElementById("btnTilt");
const btnClear = document.getElementById("btnClear");
// Floatボタンを押したらキャラクターに"float"クラスを追加
btnFloat.addEventListener("click", () => {
  chara.classList.add("float");
});
// Tiltボタンを押したらキャラクターに"tilt"クラスを追加
btnTilt.addEventListener("click", () => {
  chara.classList.add("tilt");
});
// Clearボタンを押したら追加したクラスを除去
btnClear.addEventListener("click", () => {
  chara.classList.remove("float", "tilt");
});
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210311_css_transform/pitfall01.html)
-   [コードを確認する](https://github.com/ics-creative/210311_css_transform/blob/master/pitfall01.html)

`translate`と`skew`は共にひとつの`transform`プロパティーの値に過ぎないので、2箇所で指定した場合はCSSの詳細度に従い、どちらか一方しか有効になりません。 このルール自体は`transform`に固有のものではありませんが、複数の変形を別々のクラスで適用したいケースは多々あるため、慣れていても悩まされることが少なくありません。 とくに変形操作が`@keyframes`のアニメーション定義の中に隠れていると見落としがちなので気をつけましょう。

このようなケースでは、次のようにして`translate`と`skew`を両方指定するか、後述の方法で要素を入れ子にすることで問題を回避できます。

```
/* 上にずらす */
.float {
  transform: translateY(-100px);
}
/* 傾ける */
.tilt {
  transform: skewX(30deg);
}
/* 両方適用 */
.float.tilt {
  transform: translateY(-100px) skewX(30deg);
}
```

#### アニメーションしたら回転が足りない

`rotate`と`transition`や`animation`の組み合わせにも落とし穴があります。 次の例はどちらも、キャラクターにカーソルをのせると大きく回転することを期待していますが、実際には思ったように回ってくれません。

▼ 思ったように回転してくれない例

```
#charactor1 {
  transform: rotate(0deg);
  transition: transform 1s;
}
#charactor1:hover {
  /* 50px水平移動しながら一周回って欲しい */
  transform: translateX(50px) rotate(360deg);
}

#charactor2 {
  transform: rotate(-30deg) scale(2);
  transition: transform 1s;
}
#charactor2:hover {
  /* 拡大しながら、-30 → 180度まで時計回りに210度回って欲しい */
  transform: scale(3) rotate(180deg);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210311_css_transform/pitfall02.html)
-   [コードを確認する](https://github.com/ics-creative/210311_css_transform/blob/master/pitfall02.html)

通常、2つのtransform間の補間はtransformを構成する各変形操作の値を補間するだけです。 たとえば`scale(2) rotate(180deg)`と`scale(3) rotate(360deg)`の真ん中は単純に`scale(2.5) rotate(270deg)`です。

一方で上の例のように、アニメーションさせる2つの`transform`の操作数や順序がバラバラの場合には、単純な計算では中間値が計算できません。 このようなケースでは、操作数や順序がバラバラの部分は一度matrixの行列に変換し、この行列を使って※中間値を求めます。

※ より正確には、行列にした上でその成分から回転や平行移動といった各操作の量を逆算し、操作ごとに中間値を求める……という複雑な計算を行ないます。

多くの場合この計算は期待通りに動きますが、回転に関しては少々問題が起こります。matrixの説明の際に、回転部分に`sin`・`cos`が利用されていたことを思い出してください。`sin`・`cos`は360度で一周する周期的な関数なので、変形操作をmatrixに変換した時点で`0deg`と`360deg`は同じ値になってしまいます。 `rotate(0deg)`のmatrixと`rotate(360deg)`のmatrixでアニメーションしようとしても、キャラクターはまったく回ってくれないことになります。

このようなケースでは、アニメーションさせる2つのtransformの間で変形操作の数と順序を一致させることで問題を回避できます。

▼ 意図通りに回転するように修正した例

```
#charactor1 {
  transform: translateX(0px) rotate(0deg);
  transition: transform 1s;
}
#charactor1:hover {
  /* 50px水平移動しながら一周回る */
  transform: translateX(50px) rotate(360deg);
}

#charactor2 {
  transform: rotate(-30deg) scale(2);
  transition: transform 1s;
}
#charactor2:hover {
  /* 拡大しながら、-30 → 180度まで時計回りに210度回る */
  transform: rotate(180deg) scale(3);
}
```

▼ ひとつ目の例の修正前後を比較した様子

![落とし穴2：複数の変形の合成ミス](https://ics.media/entry/210311/images/210311_pitfall2.gif)

このテクニック自体は「おまじない」のように利用されるケースも見掛けられますが、仕様を理解することで自信をもって利用できるようになるはずです。

### 応用：transformを入れ子にして複雑な表現を作ろう

落とし穴でも例に挙げたように、ひとつの要素に回転や拡大を別々に加えたいケースは多々あります。 ひとつの`transform`プロパティーで表現することが難しい場合には、要素を入れ子にして使うのもひとつの手です。

次の例では2つのキャラクターを片方は単一の要素とtransformで、もうひとつは入れ子にして表現しています。どちらも結果の見た目は同一です。

▼ まとめて指定する場合と入れ子にしてバラバラに指定する場合の例（抜粋）

```
<h2>キャラクター1：移動・回転・拡大をまとめて設定</h2>
<div class="charactor" id="charactor1"></div>

<h2>キャラクター2：入れ子にして移動・回転・拡大をバラバラに設定</h2>
<div class="wrapper mover">
  <div class="wrapper rotator">
    <div class="charactor scaler"></div>
  </div>
</div>
```

```
/* キャラクター1の設定 */
#charactor1 {
  transform: translate(100px, 100px) rotate(45deg) scale(1.5);
}

/* キャラクター2の設定 */
.wrapper {
  position: absolute;
  width: 100px;
  height: 200px;
}
.mover {
  transform: translate(100px, 100px);
}
.rotator {
  transform: rotate(45deg);
}
.scaler {
  transform: scale(1.5);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210311_css_transform/appl01.html)
-   [コードを確認する](https://github.com/ics-creative/210311_css_transform/blob/master/appl01.html)

要素の入れ子が深くなるデメリットはありますが、各変形操作が別々の意味を持っているのであれば分けた方がわかりやすいケースもあるでしょう。また、回転と移動で異なるタイミングやイージングのアニメーションをつけたい場合にもこの方法が有効です。

### 応用：もうすぐ使える？　個別変形プロパティでもっとシンプル＆便利に

`transform`の高い自由度は魅力ですが、実際のコーディングではもっとシンプル・簡単に使いたいと思うことも少なくありません。CSS Transformの仕様には、このようなニーズに応え、個々の変形操作を簡単に指定できる追加のプロパティーが定義されています。

2021年2月時点で実装されているのはFirefoxのみですが、Safariのプレビュー版でも実装が進んでいます。近い将来すべてのモダンブラウザーで利用できるようになるかもしれません。

個別のプロパティーを使うと、移動・回転・拡大を組み合わせたtransformは次のようにバラして書き換えることができます。

```
/* 一括指定 */
#charactor1 {
  transform: translate(100px, 100px) rotate(45deg) scale(1.5);
}

/* 個別プロパティー指定（Firefox・Safariプレビュー版のみ） */
#charactor2 {
  translate: 100px, 100px;
  rotate: 45deg;
  scale: 1.5;
}
```

個別の変形プロパティーは記述の順序にかかわらず常に「`scale`→`rotate`→`translate`」の順で処理されます。柔軟性には欠けますが、間違いが起こりにくく簡単です。

わかりやすさの観点からは乱用は避けたいところですが、これらのプロパティーは従来の`transform`プロパティーと併用も可能です。両方指定した場合には「`transform`→`scale`→`rotate`→`translate`」の順で変形が適用されます。

次の例では、`rotate`プロパティーで常時ゆっくりとした回転アニメーションを表示しつつ、ホバーした時だけ`transform: rotate()`で追加の急回転を加える例です。

▼ transformと個別プロパティーの併用例（FirefoxとSafariプレビュー版のみ）

![応用2：transformと個別変形の組み合わせ](https://ics.media/entry/210311/images/210311_appl2.gif)

```
#charactor {
  /* 常にゆっくり回転 */
  animation: spin 4s linear infinite;
  transition: transform 1s ease-out;
}
#charactor:hover {
  /* ホバーした時だけさらに急回転を加える */
  transform: rotate(360deg);
}

@keyframes spin {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210311_css_transform/appl02.html)
-   [コードを確認する](https://github.com/ics-creative/210311_css_transform/blob/master/appl02.html)

### まとめ：うまくいかない時は基本の仕組みをおさらいしよう

CSS Transformは、webのコーディングをされる方であればほとんどの方が使ったことのある機能でしょう。簡単・便利でパフォーマンスも高い便利な機能ですが、高い自由度ゆえに複雑なことをしようとすると頭を悩ませる場面も少なくありません。

基本をしっかり押さえて、自信を持って活用できるようになりましょう。