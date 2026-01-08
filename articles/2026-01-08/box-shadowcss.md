---
title: "box-shadowだけじゃない！CSSでできる色々な影の表現と意外に知らない落とし穴"
source: "https://ics.media/entry/200406/"
publishedDate: "2020-04-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

ウェブページのデザインやコーディングをしている人なら、誰でも一度は影をつけたことがあるでしょう。一方でその影にどれほどの表現や技術のバリエーションがあるか、意識したことのある人は少ないかもしれません。

影を付ける方法としてはCSSの`box-shadow`が一般ですが、そのほかにもいくつもの技術・手法が存在します。ウェブの世界に限らず、年々変化するデザイントレンドにおいても影の扱いは重要なテーマです。

たとえば少し前に流行したロングシャドウや今年のトレンドとも言われるNeumorphism（ニューモーフィズム）など、ユニークな表現には影のテクニックを活用できるものがたくさんあります。

▼ CSSで作成したロングシャドウ（画像上部）とニューモーフィズム（画像下部）の例： ![トレンドのデザインには影を活用したものも多い](https://ics.media/entry/200406/images/200406_css_shadow_pop_shadows.gif)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/00_popular_shadow.html)
-   [デモのソースコードを表示](https://github.com/ics-creative/200406_css_shadow/blob/master/public/static/00_popular_shadow.html)

この記事では影を表現するためのさまざまな技術・手法を説明しながら、その技術で実現できる表現のバリエーションも合わせて紹介します。

### まずは基本のbox-shadowを理解しよう

CSSで影をつけるための一番基本的なプロパティーが`box-shadow`です。`box-shadow`を使うと、その名の通り要素のボックス領域（ボーダーとその内側）に対する影を描画できます。

#### おさらい：box-shadowの使い方

まずは基本の`box-shadow`を復習しましょう。

![基本のbox-sahdowの書式](https://ics.media/entry/200406/images/200406_css_shadow_fig01.png)

この基本形だけでも、さまざまな表現が可能です。

![基本のbox-sahdowのサンプル](https://ics.media/entry/200406/images/200406_css_shadow_img01.png)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/01_basic_box_shadow.html#ex1)
-   [デモのソースコードを表示](https://github.com/ics-creative/200406_css_shadow/blob/master/public/static/01_basic_box_shadow.html#L11)

```
/* 1. 基本のbox-shadow */
.basic1 {
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
}
/* 2. insetで内側に影をつける。角丸や円形もOK */
.basic2 {
  box-shadow: inset 0 10px 25px 0 rgba(0, 0, 0, .5);
}
/* 3. 影の色・透明度は任意に設定できる */
.basic3 {
  box-shadow: 0 10px 25px 0 rgba(60, 194, 235, 0.5);
}
/* 4. ぼかしを0にしてボーダーのような表現も可能 */
.basic4 {
  box-shadow: 15px 15px 0px 0 rgb(60, 194, 235);
}
```

#### マテリアルデザインにも！　複数の影を重ねる

さらにこの影はいくつでも自由に重ねることができます。 これも例を見てみましょう。

![基本のbox-sahdowのサンプル](https://ics.media/entry/200406/images/200406_css_shadow_img02.png)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/01_basic_box_shadow.html#ex2)
-   [デモのソースコードを表示](https://github.com/ics-creative/200406_css_shadow/blob/master/public/static/01_basic_box_shadow.html#L25)

```
/* 1. 6層のbox-shadowで作った滑らかな影 */
.layer1 {
  box-shadow:
    0 1.9px 2.5px rgba(0, 0, 0, 0.057),
    0 5px 6.1px rgba(0, 0, 0, 0.076),
    0 10.1px 11.4px rgba(0, 0, 0, 0.086),
    0 19.2px 19.8px rgba(0, 0, 0, 0.092),
    0 38.4px 34.8px rgba(0, 0, 0, 0.1),
    0 101px 74px rgba(0, 0, 0, 0.13);
}
/* 2. 影ごとに異なる向き・色を適用した例 */
.layer2 {
  box-shadow:
    -10px 10px 25px rgba(230, 180, 15, 0.9),
    10px -10px 25px rgba(8, 131, 161, 0.9)
}
/* 3. ぼかさない影を重ねて紙が重なったような表現も */
.layer3 {
  box-shadow:
    0 20px 0 -10px rgb(198, 224, 231),
    0 40px 0 -20px rgb(105, 171, 209),
    0 60px 0 -30px rgb(27, 115, 165)
}
```

複数の影を重ねるのは一見特殊なテクニックのように思えるかもしれません。しかしよく観察してみると、Googleのマテリアルデザイン等、日常よく見かけるデザインの中でも多用されていることに気づくはずです。

![複数の影の例](https://ics.media/entry/200406/images/200406_css_shadow_img10.png) 上の図はGoogle Driveのダイアログについた影を開発者ツールで表示したところです。さりげない影ですが、自然に見せるために3つの`box-shadow`で構成されていることがわかります。

### box-shadowだけでは真似できない！　疑似要素を使ったオリジナルの影

`box-shadow`は簡単ですが、簡単さゆえにできないこともたくさんあります。 下の図（左）は、市松模様の上に水色の`box-shadow`で影を落としたものです。 表現によってはこれもありですが、影としてよりリアルなのは（右）の方ではないでしょうか？

![複数の影の例](https://ics.media/entry/200406/images/200406_css_shadow_img03.png)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/02_blur_shadow.html#ex1)

#### 疑似要素でリアルな影を作る

`box-shadow`はただ指定した色のボックスにブラー（ぼかし）をかけているだけなので、影色と背景の組み合わせによっては自然な影に見えません。 より自然な影に見せるには、CSSの`filter`と`mix-blend-mode`を使うことができます。 （※なお、この章で解説する`filter`と`mix-blend-mode`はIEではサポートされていません）

```
.box::after {
  /* 疑似要素で同じ大きさのboxを作り、position: absoluteで背面に表示 */
  content: '';
  display: block;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* ①疑似要素のボックスを影色で塗りつぶし */
  background-color: rgb(42, 159, 226);
  /* ②ブラーフィルターでぼかす */
  filter: blur(15px);
  /* ③位置やサイズを調整 */
  transform: translateY(10px) scale(1.05);
  /* ④乗算で重ねる */
  mix-blend-mode: multiply;
}
```

①疑似要素を影色で塗り潰し、②ブラーフィルターでぼかして、③位置やサイズを調整し、④最後に乗算で合成しています。 1行で済む`box-shadow`と比べると随分と面倒ですね。その一方で、疑似要素の形やサイズを調整したり、異なるフィルターを使ったり、自由なカスタマイズが可能になるメリットもあります。

いくつか例を見てみましょう。

#### グラデーションや画像を影にする

`box-shadow`の影色と異なり、疑似要素の背景にはグラデーションでも画像でも好きな内容を表示できます。これをぼかして影にすることで、サイトの配色や背景画像に合わせた印象深い影を作ることができます。

![グラデーションや画像を影にするサンプル](https://ics.media/entry/200406/images/200406_css_shadow_img04.png)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/02_blur_shadow.html#ex2)
-   [デモのソースコードを表示](https://github.com/ics-creative/200406_css_shadow/blob/master/public/static/02_blur_shadow.html#L35)

グラデーションの使いこなしについては、過去の記事『[1歩踏み込んでみる! CSSグラデーションのマニアックな世界](https://ics.media/entry/200212/)』も参考にしてください。

#### ブレンドモードを変えてみる

普通のリアルな影であれば乗算を使うのがベストですが、異なるブレンドモードを試してみることでもっとインパクトの強い表現を作れます。

![ブレンドモードを変えてみるサンプル](https://ics.media/entry/200406/images/200406_css_shadow_img05.png)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/02_blur_shadow.html#ex3)
-   [デモのソースコードを表示](https://github.com/ics-creative/200406_css_shadow/blob/master/public/static/02_blur_shadow.html#L57)

上の例のように覆い焼き（`color-dodge`）で発光を表現したり、焼き込み（`color-burn`）やオーバーレイ（`overlay`）でビビットな影をつけたり、背景と影の組み合わせで多様な表現が可能になります。ブレンドモードについては、過去の記事『[CSS3のブレンドモードが素敵！新プロパティmix-blend-modeを使いこなそう](https://ics.media/entry/7258/)』も参照してください。ブレンドモードの一覧と使い所をサンプル付きで解説しています。

### もうひとつの影：drop-shadow

もうひとつ、忘れてはいけないのが`drop-shadow`です。`box-shadow`が要素を囲う四角の領域に影を付けるのに対し、`drop-shadow`は要素の実際の描画内容に合わせた影を生成してくれる優れものです。「描画内容」にはビットマップやSVGといった画像・テキスト・子要素等、あらゆるものが含まれます。**「見えているものそのままの形に影をつけたい」**、というときは`drop-shadow`を使いましょう。

![drip-shadowで画像に影をつけるサンプル](https://ics.media/entry/200406/images/200406_css_shadow_img06.png)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/03_drop_shadow.html#ex1)

#### box-shadowにそっくりだけどちょっと違う？drop-shadowの書き方

`drop-shadow`はCSS filterの一種なので書き方は少し異なりますが、`box-shadow`と同じようなパラメーターを設定できます。

![filter:drop-sahdowの書式](https://ics.media/entry/200406/images/200406_css_shadow_fig02.png)

ただし、いくつか注意すべき違いがあります。

-   同じ数値を指定しても、影の見た目は`box-shadow`と一致しません。 **形状がただの四角形であっても、です。** これは3つ目の[ぼかし量の計算方法がbox-shadowとdrop-shadowで異なる](https://www.w3.org/TR/filter-effects-1/#funcdef-filter-drop-shadow)ためです。同じ値の場合`drop-shadow`の方がより強くぼけて見えます
-   `box-shadow`の`inset`キーワードは`drop-shadow`では使えません
-   `box-shadow`で4つ目の数値に指定できるスプレッド半径は`drop-shadow`では使えません。主要なブラウザーでは、たとえ`0`であっても指定すると`drop-shadow`全体を無効とみなすため、指定してはいけません
-   `drop-shadow`(CSS filter)はIEでは利用できません。（独自拡張の`filter: progid:DXImageTransform.Microsoft.DropShadow`等を用いる方法もありましたが、この記事では解説しません）

下の図は同じパラメーター値を設定した`box-shadow`と`drop-shadow`を比較したものです。似ていますが単純に置き換えができるものではないので、デザインとコーディングの高い一致が求められる場面では注意が必要です。

![box-shadowとdrop-shadowの比較](https://ics.media/entry/200406/images/200406_css_shadow_img07.png)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/03_drop_shadow.html#ex2)
-   [デモのソースコードを表示](https://github.com/ics-creative/200406_css_shadow/blob/master/public/static/03_drop_shadow.html#L36)

#### 影の重なりで悩んだ時はdrop-shadowで解決！

画像やSVGのロゴ等に便利な`drop-shadow`ですが、使い所はそれだけではありません。

次のサンプルはCSS Animationで作ったローディングスピナーです。8個の丸（`<span>`要素）を回転させてアニメーションにしています。

![スピナーに影をつけた比較](https://ics.media/entry/200406/images/200406_css_shadow_img08.png)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/03_drop_shadow.html#ex3)
-   [デモのソースコードを表示](https://github.com/ics-creative/200406_css_shadow/blob/master/public/static/03_drop_shadow.html#L44)

2つのスピナーのうち、`box-shadow`で影をつけたのが左側です。いくつか気になる部分がありますね。

-   丸ひとつとつに影がついてしまうので、重なった丸がひとつに繋がって見えない
-   影ごと回転させているので、影の角度がバラバラ

一方、右側は`drop-shadow`でスビナー全体に影をつけたものです。回転した複数の`<span>`にまとめて影をつけることで、上記の問題が回避できていることがわかると思います。

**「box-shadowで影を落とした要素を近くに配置したら影が重なってしまった！」** そんな時には`drop-shadow`を使うと問題を解決できるかもしれません。

### 影の闇 - トラブルと回避策

簡単で幅広い表現のできる`box-shadow`や`drop-shadow`ですが、内部で複雑な描画計算を行うものゆえにトラブルもつきものです。この章では、とくに影をアニメーションと組み合わせたときに発生しがちなトラブルと、トラブルを避けるためのポイントを紹介します。

#### トラブル！　影のアニメーションがなんとなくカクカクする（Safari）

`box-shadow`を使って要素のホバー時にフワッと浮き出るエフェクトをつけたい場面多くあると思います。このような場面で何も考えずに`box-shadow`を`transition`等でアニメーションすると、影部分のアニメーションがなんとなくカクツク（フレームレートが下がる）ように見えることがあります。

![ChromeとSafariで影のアニメーションを比較](https://ics.media/entry/200406/images/200406_css_shadow_trouble1.gif)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/11_troubles.html#ex1)

この現象は主に`box-shadow`のぼかし半径を変更する等して、影の描画領域が変わったときに発生します。完全に同じ描画にはなりませんが、滑らかさを重視する場合にはぼかしの半径は変えず、透明度をアニメーションさせることで問題を回避できます。

```
/* 1. 影のぼかし半径をtransitionで変更 */
.box1{
  transition: box-shadow 2s ease-out, transform 2s ease-out;
}
.box1:hover {
  box-shadow: 0 15px 10px 5px rgb(0, 0, 0);
  transform: translateY(-10px);
}

/* 2. 影の透明度のみをtransitionで変更 */
.box2{
  transition: box-shadow 2s ease-out, transform 2s ease-out;
  box-shadow: 0 15px 10px 5px rgba(0, 0, 0, 0);
}
.box2:hover {
  box-shadow: 0 15px 10px 5px rgba(0, 0, 0, 1);
  transform: translateY(-10px);
}
```

#### トラブル！　hoverで影を出したら周辺が欠ける（Safari）

ホバー時のトラブルは`drop-shadow`でも発生します。

![ChromeとSafariで影のアニメーションを比較](https://ics.media/entry/200406/images/200406_css_shadow_trouble2.gif)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/11_troubles.html#ex2)
-   [デモのソースコードを表示](https://github.com/ics-creative/200406_css_shadow/blob/master/public/static/11_troubles.html#L39)

Safariでは`drop-shadow`を変更した際の再描画が要素のボックス内部しか行われない問題があるようです。少し面倒ですが、影をつけたい要素を十分な`padding`を持ったボックスで囲い、外側のボックスに対して`drop-shadow`を適用することで問題を回避できます。

```
.ok {
  display: inline-block;
  font-size: 0;
  padding: 100px; /* drop-shadowを適用する要素に十分なpaddingをつける等して、影の対象に十分な余白を作る */
  filter: drop-shadow(0 0px 3px rgba(0, 0, 0, .9));
}
.ok:hover {
  filter: drop-shadow(0 10px 60px rgba(0, 0, 0, .9));
}
```

#### トラブル！　アニメーション中だけ影が表示されない（Safari）

これもSafariで発生する事象です。

3つのバー(`<div>`)をCSS Transitionsで動かしてハンバーガーメニューのアイコンを作りました。このアイコン全体に`drop-shadow`で影をつけると、Safariではアニメーション中だけ影が表示されません。

![ChromeとSafariで影のアニメーションを比較](https://ics.media/entry/200406/images/200406_css_shadow_trouble3.gif)

-   [デモを別ウインドウで表示](https://ics-creative.github.io/200406_css_shadow/static/11_troubles.html#ex3)
-   [デモのソースコードを表示](https://github.com/ics-creative/200406_css_shadow/blob/master/public/static/11_troubles.html#L69)

このトラブルは以下の条件が重なると発生します：

1.  複数の子要素を`transition: transform`でアニメーションする
2.  親要素に対して`drop-shadow`を2つ以上適用

複数の影を重ねるテクニックはマテリアルデザインでも多用されるため、うっかりコピペで影をつけるとこの条件に当てはまってしまうかもしれません。

#### トラブル！　たくさん影をつけたらアニメーションが重い（Chrome/Firefox）

最後はChrome/Firefoxで発生するパフォーマンスのトラブルです。100個の`<div>`に影をつけてCSS Animationで回転させてみます。影の付け方として、次の3つを試してみましょう：

1.  各々に`box-shadow`をつける
2.  各々に`drop-shadow`をつける
3.  100個まとめて`drop-shadow`をつける

細かな数値は環境によって変わるため、ここではiMac（iMac 5K, 27-inch, 2019）で執筆時の最新OSとブラウザを使って試した概要だけ掲載します。

[実際に試してみたい場合はこちらから](https://ics-creative.github.io/200406_css_shadow/20_performance.html)

ブラウザー

1\. 各々にbox-shadow

2\. 各々にdrop-shadow

3\. まとめてdrop-shadow

Chrome(80)

速い

**極めて遅い**

速い

Safari(13.1)

速い

中程度

速い

Firefox(74)

速い

速い

**遅い**

見事に各ブラウザーで異なる傾向がみられました。とくにChromeの`drop-shadow`は上記環境では200個で10fpsを割っており、とても実用には耐えないレベルです。

![Chromeでdrop-shadowが遅い](https://ics.media/entry/200406/images/200406_css_shadow_performance.png)

一般的な傾向としては、Safariは一度GPUにより開始されたアニメーションはスムーズに処理されるのに対し、ChromeはCPUに引きずられて遅延しがちです。ただし、このような傾向は環境やバージョンで変わるので、複雑なアニメーションを表示するときには主要な環境での動作をしっかりと確認する他ありません。現時点では、アニメーションをともなう複雑な要素の影は`box-shadow`を使うのが無難でしょう。

### まとめ

この記事では、ポピュラーな`box-shadow`に加えて、`drop-shadow`や`blur`といったCSS filterを利用した多様な影の技術と表現を紹介しました。とくにアニメーションとの併用ではブラウザ差異やパフォーマンス等の注意が必要な点もありますが、用法用量を守って上手に使えば、CSSだけで高度な表現ができるようになります。影の技術をマスターして、次のトレンドになるような表現をぜひ作ってみてください。