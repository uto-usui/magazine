---
title: "Canvasだけじゃない！requestAnimationFrameを使ったアニメーション表現"
source: "https://ics.media/entry/210414/"
publishedDate: "2021-04-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2021年4月16日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

`requestAnimationFrame()`というとCanvas APIなどを使ったクリエイティブコーディングでよく使われる手法ですが、クリエイティブコーディングに限ったものではなく、一般的なウェブサイトのアニメーション表現にも役立ちます。

この記事では「トップに戻るアニメーション」を例に、`requesetAnimationFrame()`の基本的な使い方から、実際のWebサイトで使える実装までチュートリアル形式で解説しています。

**この記事で学べること**

-   `requestAnimationFrame()`でアニメーションするやり方
-   ディスプレイのリフレッシュレートに依存しない実装方法
-   イージング関数を使ったアニメーション

さまざまな作例のサンプルファイルも用意しています。ぜひご覧ください。

-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/210414_requestAnimationFrame/)

### setInterval()との違い

`requestAnimationFrame()`は画面の描画毎に呼ばれる繰り返し処理です。繰り返し処理といえば`setInterval()`がありますが、こちらは固定値での繰り返しです。`requestAnimationFrame()`の利点は画面のリフレッシュレート（1秒あたりの描画切り替え回数）に合わせて繰り返されるので、リフレッシュレートに沿った滑らかアニメーションが実現できます。最近は144Hzなど高リフレッシュレートのゲーミングモニターも増えてきているので、そういったディスプレイでも滑らかなアニメーションできるのが`requestAnimationFrame()`の特徴です。

![requestAnimationFrameがリフレッシュレートに応じたアニメーションに対してsetIntervalは固定フレームレートのアニメーション](https://ics.media/entry/210414/images/210414_difference.png)

逆にパラパラ漫画のような固定フレームレートで表現したいアニメーションでは`setInterval()`のほうが向いているでしょう。

### requestAnimationFrameの使い所

要素の移動やインタラクションなどはCSS TransitionやSVG Animationなどで十分な場面が多いです。`requestAnimationFrame()`の利点として、**それらでアニメーションできないものもアニメーションさせられる**という点です。

具体的にはHTMLの属性値を連続的に変更したり、`background-image`の値を書き換えたり繰り返し処理ゆえのアニメーションが可能になります。

詳細は後述しますが、処理中のイージング関数を工夫すればいろいろな動きも可能です。

▼`background-image: radial-gradient()`をアニメーションさせている様子

![グラデーションのアニメーション](https://ics.media/entry/210414/images/210414_gradient.gif)

### 実践：requestAnimationFrameを使ったトップへ戻るスムーススクロール

ではここから、Webサイトでもよく使う、スムーススクロールを題材に`requestAnimationFrame()`の実践を解説します。最近のブラウザの中にはCSSの`scroll-behavior: smooth`でスクロールアニメーションできるものもあります。しかしSafari 14では対応していないこともあり、スクロールのアニメーションはJavaScriptで行うのが堅実でしょう。

#### requestAnimationFrameの基本

まずは、基本的な`requestAnimationFrame()`の使い方です。

```
// アニメーションさせる要素
const box = document.querySelector(".box");

// 移動量
let moveX = 0;

/**
 * アニメーションの各フレームでの処理
 * @param time
 */
const moveAnimation = () => {
  // 移動量が400以下の場合に実行
  if (moveX <= 400) {
    moveX++;
    // 移動量を要素に適用する
    box.style.transform = `translateX(${moveX}px)`;
    // ここで自分自身を呼び出し、繰り返す
    requestAnimationFrame(moveAnimation);
  }
};
// アニメーションを実行する
moveAnimation();
```

`requestAnimationFrame()`の特徴は**自分自身の処理を呼び出してループさせる**ことです。この例の場合、画面の描画ごとに`moveAnimation()`が処理され、その都度`moveX`が1つずつ増え、`.box`が1pxずつ右に移動します。`moveX`が`400`に達したら呼ばれなくなるのでアニメーションは終了します。

`requestAnimationFrame()`は各フレームでの微小な動きを指定し、それを描画毎に動かすことでアニメーションさせる、というのが基本的な書き方になります。

![requestAnimationFrameを使った基本的な箱の移動](https://ics.media/entry/210414/images/210414_basic.gif)

-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/210414_requestAnimationFrame/basic/)
-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame/blob/01a2792ee4a519182bd4d94b57f1c186893c64c4/basic/index.html#L16-L45)

#### スムーススクロールの場合

これをスムーススクロールに置き換えてみましょう。

```
// スクロール移動量
const moveY = 10;

/**
 * アニメーションの各フレームでの処理
 */
const scrollAnimation = () => {
  // スクロール移動量が0より大きい場合に実行
  if (window.scrollY > 0) {
    // 現在の位置からスクロール移動量分（10px）だけ減らした場所に移動させる
    const scrollY = window.scrollY - moveY;
    window.scrollTo(0, scrollY);
    // ここで自分自身を呼び出し、繰り返す
    requestAnimationFrame(scrollAnimation);
  }
};

// トップへ戻る要素をクリックしたらスクロールアニメーション実行
document.querySelector(".backToTop").addEventListener("click", () => {
  scrollAnimation();
});
```

-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/210414_requestAnimationFrame/simple_scroll/)

スクロールアニメーションを実現するために`window.scrollTo()`メソッドを繰り返し呼び出して移動させていきます。

![トップに戻る基本的なアニメーション](https://ics.media/entry/210414/images/210414_basic_scroll.gif)

ちなみにこの`window.scrollTo()`メソッドのオプションには`{behavior: "smooth"}`というのがあり、これを使ってもスムーススクロールを実現できます。しかし、2021年4月現在ではSafari 14・IE11が非対応です。

上記は呼び出される毎に`10px`ずつ上に移動していき、上端に達したら（＝スクロール量が0になったら）処理を終えます。これでスクロールアニメーションを実現できますが、1つ大きな問題を抱えています。それはアニメーションのスピードがディスプレイのリフレッシュレートに依存していることです。

#### リフレッシュレートによって変わるアニメーション速度

同じ手法を用いている最初の箱の移動のアニメーションで見比べると一目瞭然です。

![30Hzにくらべて60Hzの方がはやく移動するアニメーション](https://ics.media/entry/210414/images/210414_hz.gif)

60Hzのディスプレイでは1秒間に60回、`10px`移動するアニメーションが呼び出されますが、30Hzのディスプレイでは30回です。仮に`600px`移動する場合、60Hzのディスプレイでは1秒かけてアニメーションするところ、30Hzのディスプレイでは約2秒でアニメーションしてしまいます。環境によってアニメーション速度が違うのはマズイです。

#### リフレッシュレートに依存しない処理

アニメーション速度をリフレッシュレートに依存させないため、アニメーションの進捗をフレーム処理の外側から管理します。

```
// アニメーション時間（ミリ秒）
const duration = 1000;

// アニメーションの開始時間を格納する変数
let startTime;

// アニメーションの開始時のスクロール位置を格納する変数
let startScrollY;

/**
 * アニメーションの各フレームでの処理
 */
const scrollAnimation = () => {
  // 現在時間の継続時間に対する進捗度を算出
  const progress = Math.min(1, (Date.now() - startTime) / duration);
  // スクロール位置はスタート位置からの（1 - 進捗度）を掛けたもの
  const scrollY = startScrollY * (1 - progress);
  // 指定した位置へスクロール
  window.scrollTo(0, scrollY);
  // 進捗度が1未満（=100%ではない）場合、自分自身を呼び出し、繰り返す
  if (progress < 1) {
    requestAnimationFrame(scrollAnimation);
  }
};

// トップへ戻る要素をクリックしたらスクロールアニメーション実行
document.querySelector(".backToTop").addEventListener("click", () => {
  // Date.now()で開始時間をセット
  startTime = Date.now();
  // 現在のスクロール位置をセット
  startScrollY = window.scrollY;
  // アニメーション実行
  scrollAnimation();
});
```

-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/210414_requestAnimationFrame/duration_scroll/)

クリックした初回時は`Date.now()`で開始時間をセットしています。これをもとにフレーム処理内でアニメーション開始からどれだけ経過したかを計算し、その進捗度に応じたアニメーションを実行する流れです。

まず、トップへ戻るボタンが押されたらその時間と位置を変数に格納します。

```
// トップへ戻る要素をクリックしたらスクロールアニメーション実行
document.querySelector(".backToTop").addEventListener("click", () => {
  // Date.now()で開始時間をセット
  startTime = Date.now();
  // 現在のスクロール位置をセット
  startScrollY = window.scrollY;
  // アニメーション実行
  scrollAnimation();
});
```

各フレーム内では`Date.now()`から進捗度を算出します。さきほどはスクロール量で管理していたのですが、進捗度を使って管理することで指定した時間（この例なら1秒）アニメーションします。

進捗度の計算について、`Math.min()`を使い「1あるいは進捗度のうち小さい方を得る」という処理をはさんでいます。これはリフレッシュレートの関係で経過時間後でもフレームの処理が呼ばれることがあります。その場合、進捗度が1を超えるので、上限として1になる処理をしています。

```
/**
 * アニメーションの各フレームでの処理
 */
const scrollAnimation = () => {
  // 現在時間の継続時間に対する進捗度を算出
  const progress = Math.min(1, (Date.now() - startTime) / duration);
  // 省略
};
```

スクロール位置は初期位置から（1 - 進捗度）を掛けた値になります。（進捗度0でもとの位置、100%で一番上）

```
// スクロール位置はスタート位置からの（1 - 進捗度）を掛けたもの
const scrollY = startScrollY * (1 - progress);
```

算出したスクロール位置へ移動させ、繰り返し処理させます。注意したいのが、そのまま自身を呼び出すと、アニメーション終了後も延々と処理自体は呼ばれ続けてしまいます。それを防ぐため、進捗度が1になったら呼ばれないようにしています。

```
// 指定した位置へスクロール
window.scrollTo(0, scrollY);
// 進捗度が1未満（=100%ではない）場合、自分自身を呼び出し、繰り返す
if (progress < 1) {
  requestAnimationFrame(scrollAnimation);
}
```

これを繰り返すことで、指定した時間でリフレッシュレートに依らないスクロールアニメーションができます。

#### イージングをつける

これでようやくどのデバイスでも一律のアニメーションをするようになりました。しかし、ただスッとスクロールしてトップに戻るアニメーションは、少し味気ないです。速度にイージングをつけてより小気味よいスクロールにします。

```
// アニメーション時間（ミリ秒）
const duration = 1000;

// アニメーションの開始時間を格納する変数
let startTime;

// アニメーションの開始時のスクロール位置を格納する変数
let startScrollY;

/**
 * イージング関数
 * @param x
 * @returns {number}
 */
const easeOutCubic = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

/**
 * アニメーションの各フレームでの処理
 */
const scrollAnimation = () => {
  // 現在時間の継続時間に対する進捗度を算出
  const progress = Math.min(1, (Date.now() - startTime) / duration);
  // スクロール位置はスタート位置からの（1 - 進捗度）を掛けたもの。進捗度にイージングをかけることで、移動量をイージングさせる
  const scrollY = startScrollY * (1 - easeOutCubic(progress));
  // 指定した位置へスクロール
  window.scrollTo(0, scrollY);
  // 進捗度が1未満（=100%ではない）場合、自分自身を呼び出し、繰り返す
  if (progress < 1) {
    requestAnimationFrame(scrollAnimation);
  }
};

// トップへ戻る要素をクリックしたらスクロールアニメーション実行
document.querySelector(".backToTop").addEventListener("click", () => {
  // Date.now()で開始時間をセット
  startTime = Date.now();
  // 現在のスクロール位置をセット
  startScrollY = window.scrollY;
  // アニメーション実行
  scrollAnimation();
});
```

-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/210414_requestAnimationFrame/easing_scroll/)

さきほどのから新たにイージング関数の追加とスクロール位置の算出の部分に手を加えています。イージング関数は線形的な変化を曲線の変化に変換する関数です。これをスクロール位置算出部分に組み込むことで、アニメーション速度にイージングをつけられます。

![トップに戻る基本的なアニメーション](https://ics.media/entry/210414/images/210414_easing_scroll.gif)

イージング関数を変えればほかの動きも可能です。さまざまなイージング関数については[イージング関数チートシート](https://easings.net/ja)が参考になります。

### 応用編

トップに戻る処理を例に`requestAnimationFrame()`を解説しましたが、いくつか応用例を紹介します。

#### 汎用的なスムーススクロール

トップに戻るだけでなくページ内の移動もスムーススクロール化したものです。こちらの例は処理を汎用化し、関数の外に状態をもつので、汚染されないようクラス化しています。

![トップに戻る基本的なアニメーション](https://ics.media/entry/210414/images/210414_smooth_scroll.gif)

-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame/blob/master/smooth_scroll_class/ScrollAnimation.js)
-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/210414_requestAnimationFrame/smooth_scroll_class/)

#### 円グラフのアニメーション

`background-image`プロパティはCSS Transitionでアニメーションできませんが、`requestAnimationFrame()`を使えばアニメーションできます。`conic-gradient()`を用いて円グラフのアニメーションができます。

![トップに戻る基本的なアニメーション](https://ics.media/entry/210414/images/210414_pie_chart.gif)

-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame/blob/01a2792ee4a519182bd4d94b57f1c186893c64c4/pie_chart/index.html#L16-L61)
-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/210414_requestAnimationFrame/pie_chart/)

#### カウントダウン

DOM要素を連続的に変化させ、カウントダウンのような文字が連続的に変化させることも可能です。

![トップに戻る基本的なアニメーション](https://ics.media/entry/210414/images/210414_count_down.gif)

-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame/blob/01a2792ee4a519182bd4d94b57f1c186893c64c4/count_down/index.html#L25-L68)
-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/210414_requestAnimationFrame/count_down/)

#### input要素のアニメーション

こちらは`value`属性を連続的に変化させ`input`要素をアニメーションさせています。

![トップに戻る基本的なアニメーション](https://ics.media/entry/210414/images/210414_range.gif)

-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame/blob/01a2792ee4a519182bd4d94b57f1c186893c64c4/range/index.html#L22-L86)
-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/210414_requestAnimationFrame/range/)

### まとめ

`requestAnimationFrame()`は繰り返し処理をするのであらゆる要素のアニメーションが可能です。手軽に使えるCSS TransitionやCSS Animationとうまく使い分けつつ、それらでは難しいアニメーションは`requestAnimationFrame()`で行うとよいでしょう。