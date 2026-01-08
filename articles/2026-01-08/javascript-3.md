---
title: "トレンドウェブサイトから学べ！　JavaScriptで作る本格スクロール演出"
source: "https://ics.media/entry/210426/"
publishedDate: "2021-04-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

「かっこいいウェブサイト」とはどのようなものでしょう？　ICS MEDIAを見てくださるみなさんであれば、ダイナミックなアニメーションや3次元的な動きがあるウェブサイトに「おっ」と惹きつけられた経験は一度や二度ではないかと思います。たとえば、スクロールに連動したインタラクティブな動きは冒険するようなワクワクした気持ち、没入感を与えてくれます。

![ポーラ2029年ビジョン](https://ics.media/entry/210426/images/210426-scroll-animation-pola.gif)

[『ポーラ2029年ビジョン』](https://www.pola.co.jp/special/o/wecaremore/)

本記事の前半では、話題になったウェブサイトからかっこいいスクロール演出の事例を取り上げ、それらを分析します。

さらに記事の後半では、「自分でも作ってみたいなぁ、でもどうやって実装しているんだろう？」と悩むみなさんに向け、オリジナルのデモを用いて実装を紹介します。

本記事を読んだ後には、「どうやって実装しているんだろう？」と未知の技術に感じていたスクロールアニメーションも、「こうやっていたのか！」と身近に感じられるようになるはずです。さあ、技術を身につけ新たな表現の世界に足を踏み入れてみましょう！

### スクロールアニメーションの分類

一口にスクロールアニメーションと言ってもいくつかの種類があります。大まかには、以下の3つに分けられるでしょう。

#### スクロールで発火するアニメーション（トリガーアニメーション）

「スクロールバーがこの位置に達したとき、アニメーションを実行する」といった挙動を示すものです。ここでは便宜上「トリガーアニメーション」と呼びます。次に示した『CalorieMate to Programmer』では、要素が画面内に入ってくるとタイピングのようなアニメーションが発火します。

▼トリガーアニメーションの例 - [『CalorieMate to Programmer』](https://www.otsuka.co.jp/cmt/to_programmer/)

![CalorieMate to Programmer](https://ics.media/entry/210426/images/210426-scroll-animation-cmt.gif)

#### スクロールに連動したアニメーション（スクラブアニメーション）

スクロールに連動して、少しずつ動くアニメーションです。こちらは発火するアニメーションの例とは違い、ユーザーがスクロールをやめるとアニメーションも止まります。呼び方はいくつかあると思いますが、ここでは便宜上スクラブアニメーションと呼びます。

▼スクラブアニメーションの例 - 『Apple - iPhone12』 ![iPhone12製品サイト](https://ics.media/entry/210426/images/210426-scroll-animation-scrub-iphone12.webp)

複数の要素が異なる速度で移動する、いわゆる「パララックス効果」もここに分類されます。

▼パララックス効果を用いたウェブサイトの例 - [『muraflex』](https://muraflex.com/en)

![muraflexのキャプチャ](https://ics.media/entry/210426/images/210426-scroll-animation-parallax.webp)

#### 一定時間固定されるアニメーション

「アニメーション」という表現からは少しずれますが、画面内にしばらく「引っかかる」ような表現です。CSSの`position: sticky`のような挙動と言ったほうが馴染み深い人もいるかもしれませんね。

▼固定アニメーションの例（右側のイラスト）- [『BLUE HAMHAM - About』](https://bluehamham.com/about)

![固定アニメーションの例１](https://ics.media/entry/210426/images/210426-scroll-animation-pin-sample-1.gif)

スクラブアニメーションと組み合わせて、位置を固定したままスクロールに連動したアニメーションを行う例もよく見られます。

▼固定アニメーション＋スクラブアニメーションの例 - 『CRIMEA』

![固定アニメーション＋スクラブアニメーション](https://ics.media/entry/210426/images/210426-scroll-animation-pin-crimea.webp)

### それぞれの実装について考える

アニメーションの実装には、CSSのみで行うものとJavaScriptと組み合わせて動的に行うものがありますが、今回はスクロール位置を取得するためJavaScriptを用いるのが適しています。

発火アニメーションであればなんとなく実装の方針は立ちそうですが、スクラブアニメーションや固定アニメーション、さらには組み合わせとなると自作するのは茨の道となるでしょう。

以前の記事、『[フロントエンドから始めるアニメーション 最強のライブラリGSAP3を手に入れよう](https://ics.media/entry/200805/)』ではJavaScriptアニメーションライブラリを用いるメリットを紹介しました。今回もこの記事で紹介した**GSAP**のプラグインである**ScrollTrigger**を用います。ScrollTriggerでは上記のアニメーションをすべて同じような書き方で実装できます。まさに、最強のアニメーションライブラリです。

今回の記事ではライブラリの基礎的な使用法については触れませんので、あらかじめご了承ください。

では、コードの実装例を見ていきましょう！

### トリガーアニメーション

まずはスクロールで発火するアニメーションの例です。以下は説明用に作成したサンプルです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210407_scroll_demos/01_trigger.html)
-   [コードを確認する](https://github.com/ics-creative/210407_scroll_demos/blob/main/01_trigger.html)

3つの方法でアニメーションを実装しています。

-   クラスを付け替えてCSSアニメーション（ハートのアイコン）
-   トゥイーンアニメーション（カードの出現）
-   関数の実行（タイピングアニメーション）

#### クラスを付け替えてCSSアニメーション

`trigger`要素がScrollTriggerで設定したスクロール位置を行き来するたび、`toggleClass`プロパティーで設定したクラスが追加/削除されます。アニメーション自体はCSS側で実装しています。

今回はハートのアニメーションは一度だけ発火させて、その後は出現したままにしたいです。その場合は`once`プロパティーを`true`に設定することで、`toggleClass`アクションを一度だけ発火する設定にできます。

```
// ハートのアニメーション
ScrollTrigger.create({
  trigger: ".likeButton",
  start: "top center",
  toggleClass: "is-active",
  // 一度クラスがついたら消えないようにする
  once: true,
});
```

```
/*下のコードは一例です*/
.button {
  opacity: 0;
  transition: opacity 1s;
}
.button.is-active {
  opacity: 1;
}
```

![スクロールトリガーでクラスを付け替える例](https://ics.media/entry/210426/images/210426-scroll-animation-trigger-class.gif)

また、余談ですがハートのアニメーションの作り方は[『UI改善にキラリと役立つ！ SVGアニメーションの作り方まとめ』](https://ics.media/entry/15970/)に掲載しています。興味のある方はぜひご覧ください。

#### トゥイーンアニメーション

スクロールに合わせたトゥイーンアニメーションの実行は、`gsap.to()`メソッドや`gsap.from()`メソッド、 `gsap.fromTo()`メソッドのプロパティーとして`scrollTrigger`プロパティーを与え設定します。以下は、`card`クラスをもつすべての要素に同じアニメーションを付与する実装例です。

```
// カードがスクロールに合わせて出現
document.querySelectorAll(".card").forEach((el) => {
  gsap.fromTo(
    el,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      // スクロールトリガーの登録
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        ease: "expo",
      },
    }
  );
});
```

![スクロールトリガーでgsapを発火させる例](https://ics.media/entry/210426/images/210426-scroll-animation-trigger-tween.webp)

#### 関数の実行

ScrollTriggerの`onEnter`プロパティーに関数を与えると、交差時にその関数を実行します。今回は[iTyped.js](https://github.com/luisvinicius167/ityped)を使用し、タイピングアニメーションを表現しました。

```
function initTypeAnim() {
  // タイピングアニメーションの発火処理
}

ScrollTrigger.create({
  trigger: ".ityped",
  start: "top 90%",
  onEnter: initTypeAnim,
  once: true,
});
```

![スクロールトリガーで関数を実行する例](https://ics.media/entry/210426/images/210426-scroll-animation-trigger-function.gif)

以上、トリガーアニメーションの3つの活用方法を紹介しました。トリガーアニメーションは、あくまでも発火タイミングの制御にScrollTriggerを使っているだけです。これを追加すればいい感じになる、というよりはアニメーションそのものの作り込みが重要になるでしょう。

### スクラブアニメーション

スクラブアニメーションを用いたデモはこちらです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210407_scroll_demos/02_trigger_scrub.html)
-   [コードを確認する](https://github.com/ics-creative/210407_scroll_demos/blob/main/02_trigger_scrub.html)

スクラブアニメーションの実装については、ScrollTriggerのプロパティーに`scrub`を追加し、`end`プロパティーでアニメーションの終了点を設定するだけでOKです。

以下はデモの上部にあるスクロールインジケーターのアニメーションです。`body`要素のtopがウインドウのtopにあるときがアニメーションの開始点で、`body`要素のbottomがウインドウのbottomにあるとき（つまり最後までスクロールしたとき）がアニメーションの終了点です。

```
// 上のスクロールインジケーター
const barTl = gsap.timeline({
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    // スクラブアニメーションの設定「true/false」または数値
    scrub: true,
  },
});
barTl.fromTo(".header-line_inner", { width: 0 }, { width: "100%" });
```

![スクロールインジケーターの図示](https://ics.media/entry/210426/images/210426-scroll-animation-trigger-indicator.png)

`scrub`プロパティーには真偽値または数値を設定できます。`true`または数値を設定するとスクラブアニメーションが登録されます。数値を設定した場合は、「どれくらい遅れてついてくるか」の値が指定され、大きいほど遅れが大きくなり「ぬるっ」とした感じが強くなります。大きいほど粘着力が弱くなる、といった表現もできるでしょうか。

デモ最下部の「WELCOME TO ICS MEDIA」は`scrub`値を1に設定しているため「ぬるっ」とアニメーションをしているのがわかるでしょうか？

![scrubに数値を与えた例](https://ics.media/entry/210426/images/210426-scroll-animaiton-scrub-value.webp)

また、`scrub`値の設定はマウスやOSといったユーザー環境の違いによるスクロール感の差異を吸収する効果もあります。Windowsユーザーだった筆者がはじめてMacでMagic Mouseを使ったとき、ピクセル単位の流れるようなスクロールの美しさに驚いた経験があります。 かつての筆者のようにカクカクしたスクロールしかできない環境にいるユーザーにも滑らかなスクロール体験を提供するのに、ScrollTriggerは役立つでしょう。

### 固定アニメーション

固定アニメーションのデモはこちらです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210407_scroll_demos/03_trigger_pin.html)
-   [コードを確認する](https://github.com/ics-creative/210407_scroll_demos/blob/main/03_trigger_pin.html)

#### タイトルの出現アニメーション

タイトルの「Hello World」という文字列は、スクロールに合わせて透明度を上げながら拡大されるアニメーションです。単純なスクラブアニメーションと違い、スクロールの間テキストの位置は固定されています。これはプロパティー`pin: true`を追加するだけで実装できます。

どのくらいの間固定するかは`end`プロパティーに依存します。下の例では`"+=900"`と設定したため900pxスクロールすると`.top`要素の固定が終了します。

```
// タイムラインアニメーションの作成
const topTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".top",
    start: "top top",
    end: "+=900",
    scrub: true,
    // .top要素が固定される
    pin: true,
  },
});
// スクロール時のアニメーション
topTl.fromTo(
  ".top_title",
  {
    opacity: 0,
    scale: 0.2,
  },
  { opacity: 1, scale: 1, ease: "Power4.out" }
);
```

▼文字の位置は画面中央に固定され、アニメーションしている

![固定アニメーションの例](https://ics.media/entry/210426/images/210426-scroll-animation-pin-1.png)

#### pinSpacingについて

中段の画像はアニメーションせず固定するだけなので、GSAPを介さずScrollTrigger単体で用いています。

```
ScrollTrigger.create({
  trigger: ".article_image",
  start: "top 80",
  // .article_textが"center 40%"に来たら固定解除
  endTrigger: ".article_text",
  end: "center 40%",
  pin: true,
  // 余白を計算しない
  pinSpacing: false,
});
```

注目すべきは`pinSpacing`プロパティーです。固定アニメーションの仕組みを少し説明すると、`pin: true`を設定した要素はラッパー要素と呼ばれる`div`タグの子要素になります。ラッパー要素はスクロール量の分だけ高さをもつため、`trigger`プロパティーに設定した要素が`position:fixed`で固定されている間に他の要素と重なることはありません。

しかし、`pinSpacing: false`は**ラッパー要素に高さを持たせない**という設定のため下部の要素が上にかぶさる形になるのです。

▼pinSpacing: true/falseの比較

目的に合わせて、使い分けるようにしましょう。

### トラブルシューティング

ScrollTriggerは、JavaScript実行時に`trigger`プロパティーに設定した要素の位置から発火タイミングを計算します。すなわち、JavaScript実行後に**trigger要素の位置が変わると正しいアニメーションが起こりません**。

とくに固定アニメーションはラッパー要素が挿入されるためちょっとしたことでアニメーションが崩れます。以下でその解決法を示します。

#### 固定アニメーションでレイアウトが崩れる例

固定アニメーションの作成時には、前述の通りラッパー要素が挿入されます。 下の要素からスクロールトリガーを登録してしまうと、上の要素のラッパー要素が生成される前にアニメーション開始点が決定され想定とずれてしまいます。

下図は、要素BにScrollTriggerを設定した後、要素Aに設定した例です。図1では要素Bに`pin: true`が設定され、その時点の要素Bの位置からスクロールトリガーの開始点を決定します。

このとき重要になるのは、あくまで**スクロールバーが上から~pxの位置にあるとき、要素Bは固定アニメーションを発火する**という決定しかされていないということです。すなわち要素Aに`pin: true`が登録され前述のラッパー要素が挿入された場合、要素Bに設定した「~pxスクロールしたとき」の見え方は当然変わっている（要素Bはもっと下の位置にある）ため、要素Bが見える頃にはアニメーションが終わっている、ということが起こります。

![スクロール位置が変わる例](https://ics.media/entry/210426/images/210426-scroll-animation-change-scroll-posiiton.png)

なので、固定アニメーションを作成する際の大原則は**上にある要素から順にスクロールトリガーを登録する**ことです。

ただ、上から登録してもレイアウトが崩れることがあります。原因は同じで**JavaScript実行後に要素のサイズが変わる**ことです。具体的には、大きな画像の読み込み、動的なDOMの変更などがあげられます。

次に示す図は、`img`タグの`src`属性が遅れて設定されてしまったときの例です。挿入前にラッパー要素の高さが決定されてしまい、画像が潰れてしまっています。

▼スクロールトリガーを登録したあとに画像が読み込まれた例

![スクロールトリガーの生成失敗例](https://ics.media/entry/210426/images/210426-scroll-animation-load-fail.png)

この場合、`ScrollTrigger.refresh()`メソッドを実行すると、実行時の要素サイズで再度ScrollTriggerの発火点を計算し、ラッパー要素を生成し直してくれます。

次に示すのは手動でリフレッシュを行い、レイアウトを再計算させるデモです。画像が読み込まれた後に左上の「refresh」ボタンでレイアウトが修正されることを確認してください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210407_scroll_demos/04_trigger_refresh.html)
-   [コードを確認する](https://github.com/ics-creative/210407_scroll_demos/blob/main/04_trigger_refresh.html)

アニメーションが思い通りに発火しない場合は、参考にしてください。

### まとめ

アニメーションを模写する際のコツは**分解して考えること**です。一つひとつの動きが意外と単純な場合は多いので、それぞれの動きを自分の知っている分類に落とし込み、それぞれがどのように絡み合っているのかを理解すればそのアニメーションはもうあなたの手札になるはずです。本記事が、今まで未知だったアニメーションと少しでも仲良くなるきっかけになれば幸いです。