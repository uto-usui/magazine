---
title: "もう誤魔化さない！　CSS Transform完全入門(3D編)"
source: "https://ics.media/entry/210519/"
publishedDate: "2021-05-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

2021年5月19日 公開 / [株式会社ICS 松本 ゆき](https://ics.media/entry/staff/matsumoto/)

CSSで3D風の表現ができることをご存知の方は多いでしょう。しかし、自由に使いこなせると自信を持って言える方は少数派ではないでしょうか？　この記事ではイメージの掴みにくい3Dの変形機能について、基本の使い方から実際の適用例までしっかりと紹介します。

なお、前回の記事[『CSS Transform完全入門(2D編)』](https://ics.media/entry/210311/)では3D部分を除いた基本の2D変形について紹介しています。3Dの変形は2Dの応用で利用するプロパティーもほとんど同じです。合わせてチェックしてみてください。

### CSS 3D Transformでできること・できないこと

3Dの表現はCSSとしては少々異色の機能です。ときおり専用のライブラリやエンジンを使ったかのような高度な作品が話題になることもありますが、実装の複雑さや性能の観点で実用的なものは多くありません。

今回は見た目の派手さよりも、現実的にCSS Transformが向いており、導入しやすい例を2つ作成しました。どちらもこの記事で紹介する基本がわかれば容易に実装できます。

#### 作例1：カード入力フォーム

CSS 3D Transformを使ってオンラインショップの決済画面にありそうなカード入力フォームを作成しました。 このようなアニメーションはCSS 3D Transformの典型的な利用例です。この作例では`input`要素のフォーカス移動時に少しJavaScriptも使用していますが、カードが裏返るアニメーション自体はすべてCSSで実現しています。

![カード入力フォーム](https://ics.media/entry/210519/images/210519_demo1_card.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210519_css3d/static/cardform.html)
-   [コードを確認する](https://github.com/ics-creative/210519_css3d/tree/main/static/01cardform)

なお、このアニメーションにはちょっとしたトリックがあります。 一見してカードがめくれて裏側が見えているように感じられますが、HTMLの`div`要素には表や裏はありません。

そこでこのサンプルでは、表面の`div`と裏面の`div`を2つ重ねて、`transition-delay`でタイミングをずらして回転させることで、あたかも裏返ったかのような表現を演出しています。

![カード入力フォーム種明かし](https://ics.media/entry/210519/images/210519_demo1_card2.webp)

#### 作例2：スクロールアニメーション

次の作例はスクロール時のトランジションです。この作例では、新たなカードの登場時にCSS 3D Transformを使って少しだけ立体的な演出を加えてみました。

![スクロールのアニメーションデモ](https://ics.media/entry/210519/images/210519_demo2_scroll.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210519_css3d/static/scroll.html)
-   [コードを確認する](https://github.com/ics-creative/210519_css3d/tree/main/static/02scroll)

最近のウェブページでは、画面のスクロールに合わせて要素がアニメーションしながら現れる演出をよく見かけます。このようなトランジション・アニメーションは、ささやかな3D表現を加えるだけで演出の幅が大きく広がります。

#### transform3dの得意なこと・苦手なこと

上の作例でも紹介したように、CSS 3D Transformを使うことで比較的簡単に「3D的な」表現をウェブページに組み込めます。 一方で、CSS 3D Transformによる表現はあくまで2D変形の延長であり、本格的な3D表現を作るためのものではないことにも注意が必要です。

以下のような機能・表現は、基本的にはCSS 3D Transformでは実現できません（実現できても極めて非効率です）

-   光源や影を用いた表現（ライトの反射や角度によって落ちる影など）
-   奥行きによって見た目が変わる表現（ピンボケやかすみの表現など）
-   球体・曲面・その他モデリングツールで作成した3Dデータのような、複雑な形状の読み込みや再現

CSS 3D Transformによる3Dの表現は、基本的に**四角い平面に奥行きをつけて変形させるだけ**のものであり、過度の期待は禁物です。その一方で、CSSならではのメリットや得意なこともあります。

-   3D変形を行ってもテキストの選択やフォーム入力等ができるので、アクセシビリティに優れる
-   ページ内のどこでも特別な準備なしに利用できるので、インタラクションやトランジション等の細部の表現に使いやすい
-   簡易な表現であれば2D変形と同様に高速に動作する

派手な作例を見るとつい自分でも使ってみたくなってしまうものですが、基本的は通常のウェブの表現の中で、さりげなく使うのが最適と言えるでしょう。

#### CSS 3D Transformでできないことは？

もし、実現したいと思っていることが上記の「苦手」なことだった場合、CSSで無理をするのではなくWebGLを使う方がよいでしょう。WebGLを使用した3D描画のためのライブラリとしては、[Three.js](https://threejs.org/)が代表的です。ICS MEDIAでも[専用の入門記事を連載](https://ics.media/tutorial-three/)していますので、ぜひそちらも参照してください。

### Transform3Dの基本

ここからは実際にCSS 3D Transformで自由に要素を変形させるための基本を紹介します。 まずは3Dになって増えた基本の変形操作をチェックしましょう。

#### 平行移動

2Dの平行移動には`translate`, `translateX`, `translateY`が利用できました。 3Dでは加えて奥行き方向の移動を行う`translateZ`とXYZをまとめて移動する`translate3d`が利用できます。

平行移動は順序を問わないので、好きな順序でXYZを別々に指定しても、`translate3d`でまとめて指定しても結果はすべて同じです。

```
/* XYZをそれぞれ指定する例（XYZの順序は問わない） */
transform: translateX(100px) translateZ(300px) translateY(200px);
/* translate3dでまとめて指定する例 */
transform: translate3d(100px, 200px, 300px);
```

実際にパラメーターを調整して移動操作を試せるデモを用意しました。 「移動（X）」「移動（Y）」「移動（Z）」の各スライダーを動かすと画面左のカードが3D空間で動く様子を確認できます。

![平行移動のライブデモ](https://ics.media/entry/210519/images/210519_live1_translate.webp)

-   [サンプル（ライブデモ）を別ウインドウで開く](https://ics-creative.github.io/210519_css3d/3dlive/index.html#%7B%22cards%22%3A%5B%7B%22id%22%3A%22card-766906%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A-139%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A-199%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A148%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A0%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A50%7D%5D%2C%22selected%22%3A%22card-766906%22%2C%22perspective%22%3A600%2C%22preserve%22%3Atrue%2C%22perspectiveOriginX%22%3A50%2C%22perspectiveOriginY%22%3A45%2C%22offsetCenter%22%3Atrue%7D)

ひとつだけ注意すべき点として、奥行き（Z）には決まったサイズがないので縦横（XY）と違い`%`での指定ができません。 `px`で絶対値を指定するか、`em`や`vw`等で間接的に値を指定することになります。

#### 回転

平行移動に比べて3Dの回転は少々複雑です、`rotateX`, `rotateY`, `rotateZ`, `rotate3d`の4つが利用できます。

このうち`rotateX`, `rotateY`, `rotateZ`の3つはXYZの各軸まわりに単純な回転を行います（結果的に`rotateZ`は2Dの`rotate`と同じ動きになります）。 これもデモで操作して確認してみてください。

![回転のライブデモ](https://ics.media/entry/210519/images/210519_live2_rotate.webp)

-   [サンプル（ライブデモ）を別ウインドウで開く](https://ics-creative.github.io/210519_css3d/3dlive/index.html#%7B%22cards%22%3A%5B%7B%22id%22%3A%22card-703865%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A33%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A47%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A37%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A50%7D%5D%2C%22selected%22%3A%22card-703865%22%2C%22perspective%22%3A600%2C%22preserve%22%3Atrue%2C%22perspectiveOriginX%22%3A50%2C%22perspectiveOriginY%22%3A45%2C%22offsetCenter%22%3Atrue%7D)

なお、**回転は平行移動と異なり、XYZの操作順序で結果が変わる**ことに注意が必要です。

下のデモはXとYの回転（`rotateX(30deg)`と`rotateY(60deg)`）の順序を入れ替えている様子です。 CSS Transformの変形操作は右から（デモのスライダーだと下から）合成されることに注意して、実際に動きを試してみてください（※各変形操作はドラッグで順序を入れ替えできます）。

![回転の順序入れかえのライブデモ](https://ics.media/entry/210519/images/210519_live3_rotate2.webp)

-   [サンプル（ライブデモ）を別ウインドウで開く](https://ics-creative.github.io/210519_css3d/3dlive/index.html#%7B%22cards%22%3A%5B%7B%22id%22%3A%22card-994172%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A30%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A60%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A0%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A50%7D%5D%2C%22selected%22%3A%22card-994172%22%2C%22perspective%22%3A600%2C%22preserve%22%3Atrue%2C%22perspectiveOriginX%22%3A50%2C%22perspectiveOriginY%22%3A41%2C%22offsetCenter%22%3Atrue%7D)

もうひとつの変形操作である`rotate3d`はちょっと特殊な存在です。 先ほどの`translate3d`や後述する`scale3d`と異なり、**`rotate3d`はXYZの回転を単にまとめて書くものではありません。**

`rotate3d`は4つの引数をとり、最初の3つで回転軸のXYZを定め、最後の引数で軸の周りにどれだけ回転するかの角度を指定します。 次の例では、カードにカーソルが乗ると対角線（斜め45度のライン）を軸としてカードが裏返ります。

```
.card {
  transform: rotate3d(1, 1, 0, 0deg);
  transition: transform 1s;
}
.card:hover {
  transform: rotate3d(1, 1, 0, 180deg);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210519_css3d/static/rotate3d.html)
-   [コードを確認する](https://github.com/ics-creative/210519_css3d/tree/main/static/10rotate3d)

#### 拡大縮小

拡大縮小は3Dになっても簡単です。各方向の拡大縮小に`scaleX`, `scaleY`, `scaleZ`が、まとめて操作するために`scale3d`が利用できます。

なお、元々のhtml要素は奥行きのないただの平面なので、`scaleZ`を単体で利用しても効果はありません。まず`rotateX`や`rotateY`で奥行き方向に回転させて、その後で`scaleZ`を適用することではじめて効果が見えるようになります。

### パースをつける

ここまでのサンプルでは`transform`プロパティーに3D用の変形操作を設定するだけで要素が奥行きを持って移動・回転するように説明していました。実際には、このような表示を行うためにはもうひとつ「パース（奥行き）」の設定が必要です。

奥行きの表現に必要な`perspective`と`perspective-origin`の2つのプロパティーを理解しましょう。

#### `perspective`：要素を配置するステージの距離を設定する

2Dの世界では、大きさが100pxの`div`要素は常に100pxで表示されています。しかし、現実の3D空間ではどうでしょうか？　手前（目の近く）にあるものは大きく見え、奥（目から遠い場所）にあるものは小さく見えるはずです。

**では、画面上に100pxで描画されている`div`要素は目からどれくらい離れているのでしょうか？**

この質問は2Dの世界では意味を持たないので、もちろん答えはありません。しかし、CSS Transformを3Dに拡張する際には決めておかなくてはならない問題です。 この「目からの距離」を決めるのが`perspective`プロパティーです。

`perspective`プロパティーは変形させる要素の親要素に指定します。

```
<!-- ステージ = 変形させる要素を入れる親 -->
<div class="stage">
  <!-- ステージ内の実際に変形させて見せる要素 -->
  <div class="card">Card1</div>
  <div class="card">Card2</div>
  ...
</div>
```

```
.stage {
  perspective: 600px;
}
.card {
  width: 200px;
  height: 300px;
  transform: translateZ(-300px) rotateX(90deg);
}
```

この例ではステージの`perspective`が`600px`で中身のカードが`translateZ`でさらに300px奥に移動しているため、 カードの手前は目から`600px + 300px - 300px / 2 = 750px`離れた位置に、同様にカードの奥は`1050px`の位置にあります。

![見かけの大きさはperspectiveとZ座標で決まる](https://ics.media/entry/210519/images/210519_perspective.png)

今手元に紙やカードといった四角いものがある方は、その四角を水平にして目との距離を動かしてみましょう。目に近いほど四角形は大きく歪む（パースがつく）はずです。 同様に`perspective`プロパティーも（要素のZ位置やサイズに対して）値が小さいと、極端な歪みを生み出します。

![perspectiveを変えるライブデモ](https://ics.media/entry/210519/images/210519_live4_serspective.webp)

-   [サンプル（ライブデモ）を別ウインドウで開く](https://ics-creative.github.io/210519_css3d/3dlive/index.html#%7B%22cards%22%3A%5B%7B%22id%22%3A%22card-528780%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A-200%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A90%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A0%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A50%7D%5D%2C%22selected%22%3A%22%22%2C%22perspective%22%3A600%2C%22preserve%22%3Atrue%2C%22perspectiveOriginX%22%3A50%2C%22perspectiveOriginY%22%3A40%2C%22offsetCenter%22%3Atrue%7D)

パースの歪みが大きすぎると感じる時は、`perspective`プロパティーの値を大きくするか、要素を`translateZ`で奥に移動してちょうどよい奥行き感を調整しましょう。

#### perspective-origin：視線の向きを操作する

奥行きの見え方をコントロールするもうひとつのプロパティーが`perspective-origin`です。

`perspective-origin`も`perspective`と同様、変形させる要素の親要素に指定します。値には視点のXとYの位置を指定します。初期値は`50% 50%`（=`center center`と書いても同じ）で、これは要素の中心を真っ直ぐ見つめていることを示します。

いくつか例をみてみましょう。たとえば、次のように`left top`を指定すると左上から見下ろすような構図になります。

```
.stage {
  perspective: 600px;
  /* 「left top」は 「0% 0%」と書いても同じです */
  perspective-origin: left top;
}
```

逆に真下から見上げるにはY方向の指定に`bottom`や`120%`といった大きな値を指定します。

```
.stage {
  perspective: 600px;
  perspective-origin: center 150%;
}
```

`perspective-origin`も感覚的に理解するのは難しいので、ぜひデモを動かしてイメージをつかんでください。

![perspective-originを変えるライブデモ](https://ics.media/entry/210519/images/210519_live5_serspective-origin.webp)

-   [サンプル（ライブデモ）を別ウインドウで開く](https://ics-creative.github.io/210519_css3d/3dlive/index.html#%7B%22cards%22%3A%5B%7B%22id%22%3A%22card-703984%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A90%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A0%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A0%7D%2C%7B%22id%22%3A%22card-164786%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A-347%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A90%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A0%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A0%7D%2C%7B%22id%22%3A%22card-495480%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A338%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A90%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A0%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A0%7D%5D%2C%22selected%22%3A%22%22%2C%22perspective%22%3A913%2C%22preserve%22%3Atrue%2C%22perspectiveOriginX%22%3A71%2C%22perspectiveOriginY%22%3A20%2C%22offsetCenter%22%3Atrue%7D)

### 複数の要素を立体的に重ね合わせる

最後に紹介しておかなくてはいけないプロパティーが`transform-style`と`backface-visibility`の2つです。これらのプロパティーは、単体ではなく複数の要素を組み合わせて複雑な表示を作りたいときにとくに重要です。

#### 奥行き（Z座標）の順に表示するには`transform-style: preserve-3d`

CSS Transformの3D変形は、基本的には各要素を変形して順に描画しているだけです。 初期状態では、要素の重なりはCSS Transformで変形されていない場合と同様に`z-index`やhtml内での要素の順序によって決まります。したがって、同じz-indexで後に出てくる要素はいくら`translateZ`で奥に移動しても、常に前面に描画されてしまいます。

この挙動が意図したものではない場合、親要素に`transform-style: preserve-3d`を指定することで、奥行き（Z座標）にもとづいて要素を重ねることができます。

次の例では、`#card1`要素はhtml上で先に登場しているため本来は`#card2`要素の下（奥）に隠れて表示されますが、`preserve-3d`を指定することで `translateZ`によるZ座標により手前に表示されます。

```
<div class="stage">
  <div id="card1" class="card">Card1</div>
  <div id="card2" class="card">Card2</div>
</div>
```

```
.stage {
  transform-style: preserve-3d;
  perspective: 600px;
}
#card1 {
  transform: translateZ(0px);
}
#card2 {
  transform: translateZ(-200px);
}
```

![要素の重なり順](https://ics.media/entry/210519/images/210519_p3d_order.png)

-   [サンプル（ライブデモ）を別ウインドウで開く](https://ics-creative.github.io/210519_css3d/3dlive/index.html#%7B%22cards%22%3A%5B%7B%22id%22%3A%22card-97565%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A-150%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A13%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A0%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A50%7D%2C%7B%22id%22%3A%22card-62706%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A250%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A-250%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A-200%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A10%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A-3%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A50%7D%5D%2C%22selected%22%3A%22%22%2C%22perspective%22%3A600%2C%22preserve%22%3Atrue%2C%22perspectiveOriginX%22%3A50%2C%22perspectiveOriginY%22%3A45%2C%22offsetCenter%22%3Atrue%7D)

#### 要素を交差させるときにも`transform-style: preserve-3d`は必須

`preserve-3d`の効果は要素の表示順だけではありません。 複数の要素が交差した際に「重なりの手前側の部分だけ描画する」ためにも設定が必要です。

![要素の交差](https://ics.media/entry/210519/images/210519_p3d_intersection.png)

-   [サンプル（ライブデモ）を別ウインドウで開く](https://ics-creative.github.io/210519_css3d/3dlive/index.html#%7B%22cards%22%3A%5B%7B%22id%22%3A%22card-81026%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A-30%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A0%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A50%7D%2C%7B%22id%22%3A%22card-97419%22%2C%22transforms%22%3A%5B%7B%22id%22%3A%220%22%2C%22key%22%3A%22x%22%2C%22value%22%3A55%7D%2C%7B%22id%22%3A%221%22%2C%22key%22%3A%22y%22%2C%22value%22%3A-97%7D%2C%7B%22id%22%3A%222%22%2C%22key%22%3A%22z%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%223%22%2C%22key%22%3A%22rx%22%2C%22value%22%3A0%7D%2C%7B%22id%22%3A%224%22%2C%22key%22%3A%22ry%22%2C%22value%22%3A30%7D%2C%7B%22id%22%3A%225%22%2C%22key%22%3A%22rz%22%2C%22value%22%3A0%7D%5D%2C%22originX%22%3A50%2C%22originY%22%3A50%7D%5D%2C%22selected%22%3A%22card-97419%22%2C%22perspective%22%3A600%2C%22preserve%22%3Atrue%2C%22perspectiveOriginX%22%3A50%2C%22perspectiveOriginY%22%3A45%2C%22offsetCenter%22%3Atrue%7D)

`preserve-3d`を指定しない場合、要素の表示順にしたがってどちらか片方の要素全体が前面に表示されますが、`preserve-3d`を指定すると、斜めにクロスしたカードの手前部分だけが正しく表示されていることがわかります。

複数の要素を重ねあわせて複雑な立体形状を作りたいときには必須の指定でしょう。

ただし、複雑な要素の重なりや交差をうまくコントロールして期待通りに描画させるのは少々困難です。 とくに多数の要素が交差した場合、正しく描画されないこともあるので過度の期待は禁物です。

#### 裏側を見せたくない時は`backface-visibility: hidden`

最初のクレジットカード入力画面でも言及した通り、HTMLの要素に裏側はありません。

`rotateX(180deg)`等の3D変形で要素を回転させると、デフォルトでは要素が反転した状態（裏から透かして見た状態）で表示されます。

`backface-visibility: hidden`を指定した要素の子要素は、回転等で裏返った状態になると画面には描画されなくなります。

作例1の裏返るカードのように、反転した状態を見せたくない場合にはこのプロパティーを設定するとよいでしょう。

### まとめ：Transform3Dをマスターして、3D表現を気軽に活用しよう

CSSによる3Dの表現はイロモノ扱いされたり難しそうと敬遠されたり、普段のウェブ制作では避ける方も少なくないようです。しかし、正しい知識で節度を持って利用すれば、手軽さとパフォーマンスを両立した強力な表現ツールとなり得ます。

ぜひこの機会に習得して、さりげないトランジションやアニメーションから活用を始めてみましょう。