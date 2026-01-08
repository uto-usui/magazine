---
title: "モダンなJSとCSSで作るライブラリ不要の全画面スクロール演出"
source: "https://ics.media/entry/191211/"
publishedDate: "2019-12-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

スクロールで全画面がスライドのように切り替わるウェブサイトの表現があります。手軽にこの表現を実装するJSライブラリ、[fullPage.js](https://alvarotrigo.com/fullPage/)を使ったことのある方もいるのではないでしょうか？　かつては無料で使えたこのライブラリですが、現在はGPLライセンスのプロジェクト以外では使用料がかかります。

その一方、CSSとJavaScriptの進化により、このような表現をライブラリを使わずとも比較的簡単に実装できるようになりました。本記事では、基本的な機能をおさえた、全画面スクロールの実装方法を紹介します。

この記事を通じて以下の技術も学べます。

-   スクロールをピタッと止めるCSSプロパティ`scroll-snap-type`
-   画面と要素の交差を検知する`Intersection Observer API`
-   スムーススクロールが実装できるJavaScriptメソッド`scrollIntoView()`

![フルページスクロールのデモ画面](https://ics.media/entry/191211/images/191101_fullpage_scroll_demo.gif)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/191211_fullpage_scroll/)

### スクロールをピタッと止めるCSS

特定の位置でピタッとスクロールを止める`scroll-snap-type` というプロパティがあります。スクロールのスナップ、すなわち一定の範囲内であればスクロールを特定の位置にスナップさせるプロパティです。

`scroll-snap-type`プロパティは1つ目の値にスナップさせるスクロール方向、2つ目の値に厳密さを指定します。

```
scroll-snap-type: y mandatory;
```

上記のように`mandatory`を指定することで、y方向のスクロールを厳密にスナップさせます。2つ目の値を`proximity`にするとスナップの強制力は緩くなり、スナップ点以外でも止めることもできます。

なお、このプロパティは要素内スクロール、つまり**親要素に`overflow: scroll`や`overflow: auto`を指定していないと有効になりません**のでご注意ください。

![scroll-snap-typeに必要なプロパティ](https://ics.media/entry/191211/images/191101_fullpage_scroll_property.png)

スナップさせたい要素には`scroll-snap-align`プロパティを指定します。これにより、スナップさせる位置を指定できます。

```
.scroll-snap-align: start;
```

`scroll-snap-align`は1つ目の値がブロック方向、2つ目の値がインライン方向になります。値に`start`を指定すると、要素の上端にスナップ位置が来るようになります。`end`を指定すると、要素の下端がスナップ位置になります。今回は全画面の要素なので`start`も`end`も同じ位置になりますが、要素の大きさが画面と異なる場合にはスナップ位置が変わります。

````


### フルページスクロールの実装

では、ここから実際の実装方法を解説します。

- [デモを別ウインドウで再生する](https://ics-creative.github.io/191211_fullpage_scroll/)
- [ソースコードを確認する](https://github.com/ics-creative/191211_fullpage_scroll/blob/master/docs/index.html)

▼HTML

```html
<div class="fullPageScroll">
  <section id="section1" class="section section1">
    <!-- 中略 -->
  </section>
  <section id="section2" class="section section2">
    <!-- 中略 -->
  </section>
  <section id="section3" class="section section3">
    <!-- 中略 -->
  </section>
  <section id="section4" class="section section4">
    <!-- 中略 -->
  </section>
  <section id="section5" class="section section5">
    <!-- 中略 -->
  </section>
</div>
<nav id="pagination" class="pagination">
  <a id="pagination1" href="#section1"></a>
  <a id="pagination2" href="#section2"></a>
  <a id="pagination3" href="#section3"></a>
  <a id="pagination4" href="#section4"></a>
  <a id="pagination5" href="#section5"></a>
</nav>
````

▼CSS

```
.fullPageScroll {
  width: 100%;
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
}

.section {
  width: 100%;
  height: 100vh;
  padding: 10%;
  scroll-snap-align: start;
}

.pagination a.active {
  transform: scale(1.8);
}
```

CSSに関しては必要な部分だけを抜き出しています。

▼JavaScript

```
// スムーススクロール
const paginations = document.querySelectorAll(".pagination a");
paginations.forEach(pagination => {
  pagination.addEventListener("click", e => {
    e.preventDefault();
    const targetId = e.target.hash;
    const target = document.querySelector(targetId);
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Intersection Observer
const sections = document.querySelectorAll(".section");
const observerRoot = document.querySelector(".fullPageScroll");
const options = {
  root: observerRoot,
  rootMargin: "-50% 0px",
  threshold: 0
};
const observer = new IntersectionObserver(doWhenIntersect, options);
sections.forEach(section => {
  observer.observe(section);
});

/**
 * 交差したときに呼び出す関数
 * @param entries - IntersectionObserverEntry IntersectionObserverが交差したときに渡されるオブジェクトです。
 */
function doWhenIntersect(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activatePagination(entry.target);
    }
  });
}

/**
 * ページネーションの大きさを変える関数
 * @param element - HTMLElement 現在表示中のスライドのHTML要素を引数に取ります。
 */
function activatePagination(element) {
  const currentActiveIndex = document.querySelector("#pagination .active");
  if (currentActiveIndex !== null) {
    currentActiveIndex.classList.remove("active");
  }
  const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);
  newActiveIndex.classList.add("active");
}
```

前段のとおり、コアな部分は`scroll-snap-type`プロパティで実現できます。しかし、現実的な場面で考えるとページネーションの設置も必要になるでしょう。ページネーションに関してもモダンなJavaScriptを使えば手軽に実装できます。

#### スクロール部分の実装

`<div class="fullPageScroll"> ... </div>`で囲まれた部分が全画面スクロール部分ですので、こちらに`scroll-snap-type`のプロパティを適用します。

```
.fullPageScroll {
  width: 100%;
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

大きさは横幅`100%`、縦幅`100vh`を指定して全画面を要素内スクロールの親としています。今回は縦スクロールなので`overflow-y: auto`を指定しています。（`overflow-y: scroll`でも可）

スクロールの厳密さについては、機能の仕様上、中途半端に止めたくないので、`mandatory`を指定しています。最後の`-webkit-overflow-scrolling: touch`はiOSといったタッチデバイスへの要素内スクロールを慣性スクロールにするための指定です。

#### ページネーションの実装

ページネーションは現在どの部分が表示されているかを示す要素です。今回は画面右側に配置しています。

```
<nav id="pagination" class="pagination">
  <a id="pagination1" href="#section1"></a>
  <a id="pagination2" href="#section2"></a>
  <a id="pagination3" href="#section3"></a>
  <a id="pagination4" href="#section4"></a>
  <a id="pagination5" href="#section5"></a>
</nav>
```

```
.pagination a {
  display: block;
  width: 12px;
  height: 12px;
  margin: 24px 0;
  border-radius: 50%;
  background-color: #fcfcfc;
  transition: transform 0.2s;
}

.pagination a.active {
  transform: scale(1.8);
}
```

`<a>`タグで目的のスライドまでページ内遷移を設定しています。また`active`のクラス名が付与されると大きさが1.8倍になるよう指定しています。

#### 現在表示中のスライドの取得

まずは現在表示中のページネーションを大きくさせるために、現在のスライドを取得するスクリプトを説明します。

```
// Intersection Observer
const sections = document.querySelectorAll(".section");
const observerRoot = document.querySelector(".fullPageScroll");
const options = {
  root: observerRoot,
  rootMargin: "-50% 0px",
  threshold: 0
};
const observer = new IntersectionObserver(doWhenIntersect, options);
sections.forEach(section => {
  observer.observe(section);
});

/**
 * 交差したときに呼び出す関数
 * @param entries - IntersectionObserverEntry IntersectionObserverが交差したときに渡されるオブジェクトです。
 */
function doWhenIntersect(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activatePagination(entry.target);
    }
  });
}
```

現在のスライドはIntersection Observerを使って取得します。今回の全画面スクロールも要素内スクロールを使っているのでIntersection Observerが利用できます。APIの詳細は記事『[JSでのスクロール連動エフェクトには Intersection Observerが便利](https://ics.media/entry/190902/)』に紹介しています。

```
const observerRoot = document.querySelector(".fullPageScroll");
const options = {
  root: observerRoot,
  rootMargin: "-50% 0px",
  threshold: 0
};
```

オブザーバーのルート要素に要素内スクロールを設定している`.fullPageScroll`を指定しています。`rootMargin`は`"-50% 0px"`を指定し、画面水平中央を交差検知にしています。こうすることで要素内スクロールを監視し、新しいスライドを表示したら（＝画面中心をスライドを交差したら）コールバック関数`activatePagination()`を呼び、交差したHTML要素`entry.target`を引数として渡します。

```
/**
 * ページネーションの大きさを変える関数
 * @param element - HTMLElement 現在表示中のスライドのHTML要素を引数に取ります。
 */
function activatePagination(element) {
  const currentActiveIndex = document.querySelector("#pagination .active");
  if (currentActiveIndex !== null) {
    currentActiveIndex.classList.remove("active");
  }
  const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);
  newActiveIndex.classList.add("active");
}
```

すでに`active`のクラス名がついているページネーションがあれば削除します。次に`activatePagination()`関数では受け取った引数のid名を`element.id`で取得し、`href`属性にそのid名を持っているものを探します。そして、その要素に`active`クラス名を付与します。

これとさきほどのCSSを組み合わせれば、現在表示中のスライドのページネーションが大きくなります。

#### スムーススクロールの実装

ページネーションをクリックした時、目的のスライドまでスルスルっと移動したほうが気持ち良いですよね。そのためのスムーススクロールを実装します。

```
// スムーススクロール
const paginations = document.querySelectorAll(".pagination a");
paginations.forEach(pagination => {
  pagination.addEventListener("click", e => {
    e.preventDefault();
    const targetId = e.target.hash;
    const target = document.querySelector(targetId);
    target.scrollIntoView({ behavior: "smooth" });
  });
});
```

ページネーションの`<a>`タグそれぞれに`click`のイベントリスナーを追加し、`e.preventDefault()`でデフォルトの挙動をキャンセルします。`e.target.hash`で`<a>`タグに記述されていた飛び先を取得し、`const target = document.querySelector(targetId)` でその飛び先の要素を変数に格納します。

続いて、`scrollIntoView()`メソッドを使って飛び先までスクロールさせます。このとき、引数として`{ behavior: "smooth" }`を渡すことで、スムーススクロールを実現できます。

以上を組み合わせて、基本的なフルページスクロールの機能を実装できます。

### スライド内は比較的自由

この方法ではDOMを直接JavaScriptで生成したり、大きく内容を編集していたりしません。そのため、デモにもあるようにYouTube動画を埋め込んだり、スライド内にさらに要素内スクロールを設置したりもできます。要素内スクロールでのスクロールを画面全体のスクロールへと伝播を防止するには`overscroll-behavior-y: none`が便利です。

```
.section3 .innerScroll {
  height: 80%;
  overflow-y: scroll;
  overscroll-behavior-y: none;
}
```

この指定により内部スクロールの下端もしくは上端に達してスクロールしても次のスライドへ移ることはありません。[overscroll-behaviorがお手軽！ モーダルUI等のスクロール連鎖を防ぐ待望のCSS](https://ics.media/entry/221024/)にてスクロールに関する詳細な解説をしています。

ほかにも`scroll-margin`というスナップ位置を調整するプロパティもあり、`margin`プロパティと同様に`scroll-margin-top`など4方向に個別の指定もできます。`scroll-snap-align`を基準に指定した値の分だけスナップ位置を微調整できます。

```
.section {
  scroll-snap-align: start;
  scroll-margin-top: -50px; /* スナップ位置を50px上にずらす */
}
```

このようにスライド内は比較的自由にHTML・CSSを作成することができるので、デザイナーの要望も叶えやすいでしょう。

### UXとしては配慮が必要

スクロールの挙動をJavaScriptなどで制御することは**スクロールジャック**と呼ばれ、操作をユーザーの意志から取り上げる行為になり、UX上の懸念点として挙げられています。この表現を使う際にはUX上問題ないかよく検討した上での導入をオススメします。