---
title: "JSでのスクロール連動エフェクトにはIntersection Observerが便利"
source: "https://ics.media/entry/190902/"
publishedDate: "2019-09-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

ウェブのリッチな表現としてスクロールに応じたエフェクトがあります。これまでJavaScriptの`scroll`イベントで実装していましたが、Intersection Observer APIを使うとより効率的に実装できます。ブラウザーのサポートも拡充し、今後は標準となる技術でしょう。

▼スクロールで目次の色が変わるエフェクト ![スクロールで目次の色が変わる様子](https://ics.media/entry/190902/images/190828_intersection_observer_demo.gif)

本記事ではIntersection Observer APIの使い方と実践例を解説します。

### 特定の位置で発火する従来の手法

これまで、特定の位置で発火するイベントには`scroll`イベントを使う必要がありました。以下のコードは、あらかじめページ上部からの距離を取得し、スクロール量が規定に達したところで発火させる手法です。

```
window.addEventListener("scroll", () => {
  const srollVal = window.pageYOffset;
  if (srollVal > contentsPosition) {
    // 発火させるイベント
    doSomething();
  }
});
```

この手法で厄介なのは、**発火するのに必要なスクロール量が状況によって変わってくる**ことです。たとえば、見えたときに発火するイベントの必要スクロール量は「コンテンツの上部からの高さ ー ビューポートの高さ」になります。

この時、ビューポートサイズが変わると必要スクロール量を再計算する必要があります。スクロールで発火するイベントとは別に再計算する関数も用意しないといけません。

```
window.addEventListener("resize", () => {
  // 再計算する関数
  reCompute();
});
```

開発途中に発火のタイミングが変更になった場合は再計算する関数も変更しなくてはならず、バグの温床になりがちです。さらにこれらの関数は**開発上の手間**だけでなく、スクロールやリサイズのたびに呼び出されるため、**パフォーマンスにも影響**を及ぼします。

![スクロールイベントが呼び出されている様子](https://ics.media/entry/190902/images/190828_intersection_observer_scroll.gif)

### Intersection Observer APIを使った新しい手法

Intersection Observer APIは直訳すると**交差監視API**という名前です。これは要素と要素の交差を検知するAPIになります。一見するとスクロールとの関連性がないようにも思えますが、**「スクロールして特定位置にきたら」** というのは **「要素と交差したら」** ということに置き換えられるので、このAPIを活用できます。

従来の`scroll`を使った手法とは違い、ビューポートサイズの変更で交差する位置が変わっても、自動的に反応します。また、スクロールに関するイベントではないので、スクロールのたびに呼ばれることもなくパフォーマンス面でも有利です。

### Intersection Observer APIの概要

Intesection Observer APIは`const observer = new IntersectionObserver(callback, options)`という`IntersectionObserver`コンストラクターを呼び出して使います。第1引数には交差したときに実行する関数（コールバック関数）を、第2引数にはオプション設定のオブジェクトを渡します。オプションは以下のような設定が可能です。

```
const options = {
  root: document.querySelector("#observerArea"),
  rootMargin: "10px",
  threshold: 0
};

const observer = new IntersectionObserver(callback, options);
```

`root`は交差監視をする枠のような要素（ルート要素）です。`null`（デフォルト値）にするとビューポート、つまり見ている画面との交差監視を有効にします。ビューポートを指定することが多いと思いますが、上記の例では`#observerArea`という要素を指定しています。`#observerArea`が`overflow: scroll`で要素内スクロールができ、その中の要素と`#observerArea`との交差監視を有効にしたい場合には、このようにルート要素を指定します。

`rootMargin`は交差を検知するルート要素からの距離です。上記のように`10px`を指定した場合、交差判定をルート要素の周囲10px分拡大します。見える少し前にイベントを発火させたい場合などに有効です。また負の値も指定できるので、ある程度見えてからイベントを発火させる、といった使い方もできます。

`rootMargin`の指定方法はCSSのmarginなどと同じように`"10px 15px 10px"`といったショートハンドで指定できます。すこし注意したいのが、たとえ値が`0`であっても **`"0px 15px 10px"`のように単位をつける必要がある**、ということです。

`threshold`は閾値になります。`0〜1`の間を数値もしくは配列形式で入力します（デフォルトは`0`）。`rootMargin`がルート要素にもとづくオプションに対して、`threshold`は交差する要素にもとづくオプションです。

この値には、コールバック関数を呼び出したい交差割合を入力します。具体的には、`threshold: 0`とした場合、交差量が`0`になった瞬間、つまり見え始めと見え終わりのときにコールバック関数が呼ばれます。

![Intersection Observer APIの概念図](https://ics.media/entry/190902/images/190828_intersection_observer_concept.png)

`threshold: 0.25`とした場合は要素の交差割合が25％の時にコールバックが呼ばれます。スクロールしていって25％見え始めた時と、そのまま過ぎ去っていって見えている部分が残り25％の時の2回のポイントがあります。

![threshold:0.25の時にcallbackが呼ばれるタイミングの図](https://ics.media/entry/190902/images/190828_intersection_observer_threshold.png)

`[0, 0.25, 0.5, 0.75, 1]`のように配列で指定した場合、それぞれ、交差量が0％、25％、50％、75％、100％の時にコールバックが呼ばれます。ルート要素に対して交差する要素が十分大きい時に100%といった値にしてしまうと、コールバックが呼ばれなくなってしまいます。

![ルート要素に対して、交差する要素が大きいとthresholdの値が打ち止めになる図](https://ics.media/entry/190902/images/190828_intersection_observer_llimit.png)

### Intersection Observer APIを使って表示中コンテンツに合わせて目次を色を変える実装

では具体的な実践例として、スクロールしていくと目次の色が変わるデモを用いて実装方法を説明します。

![スクロールで目次の色が変わる様子](https://ics.media/entry/190902/images/190828_intersection_observer_demo.gif)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/190828_intersection_observer/)
-   [ソースコードを確認する](https://github.com/ics-creative/190828_intersection_observer/blob/master/index.html)

▼HTML

```
<aside class="indexWrapper">
  <h1>目次</h1>
  <ol id="indexList" class="index">
    <li><a href="#index1">Lorem</a></li>
    <li><a href="#index2">Ipsum </a></li>
    <li><a href="#index3">Dolor</a></li>
    <li><a href="#index4">Sit amet</a></li>
    <li><a href="#index5">Consectetur</a></li>
  </ol>
</aside>
<main class="contents">
  <div class="box" id="index1">
    <!-- 中略 -->
  </div>

  <div class="box" id="index2">
    <!-- 中略 -->
  </div>

  <div class="box" id="index3">
    <!-- 中略 -->
  </div>

  <div class="box" id="index4">
    <!-- 中略 -->
  </div>

  <div class="box" id="index5">
    <!-- 中略 -->
  </div>
</main>
```

HTMLは簡潔です。目次には`<a>`タグにid名を指定したリストがあります。コンテンツの方には各章のところにアンカーとなるid名を付けています。各章には共通の`box`というクラス名を付けています。

▼CSS

```
.index a.active {
  color: #333333;
  background-color: #f3f3f3;
}
```

今回の実装ではレイアウト周りのCSSは関係ないので省いています。目次の`<a>`タグに`active`クラスを付与すると文字色と背景色が変わるようなCSSを設定してあります。

▼JavaScript

```
// 今回の交差を監視する要素
const boxes = document.querySelectorAll(".box");

const options = {
  root: null, // 今回はビューポートをルート要素とする
  rootMargin: "-50% 0px", // ビューポートの中心を判定基準にする
  threshold: 0 // 閾値は0
};
const observer = new IntersectionObserver(doWhenIntersect, options);
// それぞれのboxを監視する
boxes.forEach(box => {
  observer.observe(box);
});

/**
 * 交差したときに呼び出す関数
 * @param {IntersectionObserverEntry[]} entries
 */
function doWhenIntersect(entries) {
  // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activateIndex(entry.target);
    }
  });
}

/**
 * 目次の色を変える関数
 * @param {HTMLElement} element
 */
function activateIndex(element) {
  // すでにアクティブになっている目次を選択
  const currentActiveIndex = document.querySelector("#indexList .active");
  // すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
  if (currentActiveIndex !== null) {
    currentActiveIndex.classList.remove("active");
  }
  // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
  const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);
  newActiveIndex.classList.add("active");
}
```

#### Intersection Observer周りの設定

```
const boxes = document.querySelectorAll(".box");
```

上から順に見ていきます。クラス名`box`の要素の交差を監視したいので、`querySelectorAll`で要素を取得しています。

```
const options = {
  root: null, // 今回はビューポートをルート要素とする
  rootMargin: "-50% 0px", // ビューポートの中心を判定基準にする
  threshold: 0 // 閾値は0
};
```

続いてオプション設定です。今回はビューポートをルート要素としたいので`null`としています。`rootMargin`ですが、`"-50% 0px"`としています。これは上下に50％分ルート要素から内側に判定部分をずらすことになります。つまり画面上下中央部分の一直線との交差を判定にします。

![画面真ん中を交差判定として設定する図](https://ics.media/entry/190902/images/190828_intersection_observer_margin.png)

少し不思議な設定かもしれませんが、`rootMargin: "0px"`で交差し始めをトリガーとした場合、画面下側から交差した時と、戻って画面上側から交差した時両方でトリガーされてしまい、意図した挙動とはなりません。

![目次の挙動がおかしい様子](https://ics.media/entry/190902/images/190828_intersection_observer_fail.png)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/190828_intersection_observer/failed/)

判定を線とすることで、画面中央線を超えた要素を`active`にし、**現在見ているコンテンツの色を変える**という挙動を実現できます。

閾値については見え始めを基準としているので0で指定しています。

```
const observer = new IntersectionObserver(doWhenIntersect, options);
```

`IntersectionObserver`インスタンスにコールバックとして`doWhenIntersect`関数（後述）と上記オプション渡して作成しています。

```
boxes.forEach(box => {
  observer.observe(box);
});
```

このままだと、ルート要素とコールバック関数を用意しただけなので、交差を監視する要素を登録する必要があります。さきほど取得してきた`boxes`それぞれを、作成した`observer`に`observe`メソッドを生やして監視させます。

Intesection Observer APIの周りの設定は以上です。

#### コールバック関数

```
/**
 * 交差したときに呼び出す関数
 * @param {IntersectionObserverEntry[]} entries
 */
function doWhenIntersect(entries) {
  // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activateIndex(entry.target);
    }
  });
}
```

コールバック関数として呼ばれる関数ですが、呼ばれた際に配列で`IntersectionObserverEntry`という交差状況が渡されます。渡された引数の中でプロパティ`isIntersecting`がtrueのものを抽出しています。`forEach`を使っているのは監視する要素同士がくっついている場合、引数として交差し終わった要素（`isIntersecting: false`）と交差し始めた要素（`isIntersecting: true`）の2つが渡されるためです。

そして交差し始めた要素を示す`entry.target`を色を変える別の関数へ渡しています。

#### 目次の色を変える関数

```
/**
 * 目次の色を変える関数
 * @param {HTMLElement} element
 */
function activateIndex(element) {
  // すでにアクティブになっている目次を選択
  const currentActiveIndex = document.querySelector("#indexList .active");
  // すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
  if (currentActiveIndex !== null) {
    currentActiveIndex.classList.remove("active");
  }
  // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
  const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);
  newActiveIndex.classList.add("active");
}
```

すでにアクティブになっている目次があれば取得し、`active`クラスを除去しておきます。渡されたHTML Elementにはid名が含まれているので、そのidが飛び先になっている`<a>`タグを取得します。そしてその`<a>`タグに`active`クラスを付与します。

### 自動的にレスポンシブにも対応

デモで実際にブラウザサイズを変更するとわかるのですが、レスポンシブに伴う、レイアウト変更で交差位置が変わっても自動的にトリガーし色が変わります。わざわざリサイズ時の関数を用意しなくても大丈夫です。

### animation-timelineとの比較

スクロールと連動させる技術にCSSの`animation-timeline`プロパティがあります。これはCSSのアニメーションをスクロール量と連動させるものです。`animation-timeline`はCSSのプロパティなので、JavaScriptを使わずともスクロールに連動したアニメーションを実現できます。詳しくは記事『[CSSだけでスクロールアニメーションが作れる！？　新技術Scroll-driven Animationsとは](https://ics.media/entry/230718/)』を参照してください。

ただし、Intersection Observer APIとは少し違いがあります。Intersection Observer APIは画面内へ入ったときに**発火する**タイプです。そのため、画面内に入るとふわっと出てくるようなスクロールを契機に実行されるアニメーションなどと相性が良いです。たとえば記事『[CSSひとつで印象が変わる！　スクロールでふわっと出るアニメーション](https://ics.media/entry/250221/)』のような表現はIntersection Observer APIです。

それに対して`animation-timeline`プロパティはスクロール量に応じて**アニメーションの進行度を変化させる**ものです。たとえば、スクロール量に応じて要素の大きさを変化させたり、色を徐々に変化させたりするようなアニメーションが得意です。

同じスクロールを利用したアニメーションでも使う場面や表現が異なるので使い分けていきましょう。

### まとめ

従来の`scroll`を使った方法に比べIntersection Observer APIは、

-   発火する必要スクロール量を計算する必要がない。
-   複数の要素の交差を検知する場合でもif文をたくさん書く必要がない。
-   レスポンシブにも自動で対応。
-   スクロールのたびに呼び出されないので、パフォーマンスでも有利。

といったメリットがあります。今回のデモは目次の色を変えるものでしたが、画像の遅延読み込みや、ふわっと出てくる演出といった使い方もできます。

これからは、スクロールで発火するイベントはIntesection Observer APIに置き換えて、より快適で軽量な開発を進めましょう。

#### 今回使用したデモ

-   [目次が色で変わるデモ](https://ics-creative.github.io/190828_intersection_observer/)
-   [ふわっと出てくるデモ](https://ics-creative.github.io/190828_intersection_observer/scroll_effect/)