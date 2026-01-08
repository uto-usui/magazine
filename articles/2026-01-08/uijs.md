---
title: "カルーセルUIを実現するJSライブラリまとめ - 導入手間や機能の比較紹介"
source: "https://ics.media/entry/210902/"
publishedDate: "2021-09-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブ制作ではカルーセル（スライドショーとも呼びます）はよく利用されるユーザーインターフェイスです。複数のバナーをスペースを節約してレイアウトできるので、情報を整理しやすく、訴求しやすいといった利点があります。

近年では、CSSだけでスライダーを実装する方法も登場していますが、2025年5月時点では対応ブラウザが限定的（Chrome 135、Edge 135以降）です。柔軟な制御やスムーズな挙動を求める場合は、JavaScriptライブラリの活用が依然として有効といえます。

-   参照: 記事『[JavaScript不要! HTMLとCSSでつくるカルーセルUI](https://ics.media/entry/250516/)』

自力でゼロから実装すると想像以上に大変なものです。そのため、制作現場ではJavaScriptライブラリを採用することが多いです。数多くのJSライブラリが存在しますが、著者がピックアップした4種類のライブラリを比較紹介します。

### 紹介するJSライブラリ

次の4種類のライブラリを紹介します。

-   [Slick.js](https://kenwheeler.github.io/slick/)
-   [Swiper.js](https://swiperjs.com/)
-   [keen-slider.js](https://keen-slider.io/)
-   [Splide](https://ja.splidejs.com/)

それぞれのJSライブラリについて、ファイルサイズやTypeScriptのサポート状況などを比較表としてまとめました。

Slick.js

Swiper.js

keen-slider.js

Splide

ファイルサイズ

約52KB

約150KB

10KB

約30KB

依存ライブラリ

jQuery

Dom7  
（内部で使用）

\-

\-

CDN

◯

◯

◯

◯

npm

◯

◯

◯

◯

TypeScriptのサポート

非公式

◯

◯

◯

React, Vue, Angular

非公式

◯

◯

◯ (React, Vue, Svelte)

a11yのサポート

◯

◯

\-

◎

ナビゲーション  
（前後へスライドするボタンなど）

◯

◯

\-

◯

いずれも[MITライセンス](https://opensource.org/license/mit)で公開されていますので、個人・商用問わず利用可能です。

### Slick.js

![Slick.jsのサイトイメージ](https://ics.media/entry/210902/images/slick_site.png)

[Slickスリック.js](https://kenwheeler.github.io/slick/)は簡潔なコードで実装できるのが特徴のモバイルフレンドリーなカルーセルライブラリです。機能は少なめですが、ナビゲーションや表示するスライド数を変更するといった基本的な機能は備わっています。jQueryプラグインのため実装にはjQueryを読み込む必要があります。タッチ・スワイプ操作にも対応しています。ReactやVue向けのモジュール、TypeScriptのサポートは公式で提供されていませんがOSSで存在します。

このJSライブラリの基本的な実装と、アニメーションをフェードに変えた作例を用意しました。

#### 基本の作例

![Slick.js 基本の作例](https://ics.media/entry/210902/images/slick_demo.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210826_carousel/slick.html)
-   [コードを確認する](https://github.com/ics-creative/210826_carousel/blob/main/slick.html)

```
<div class="slick carousel">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

```
$(document).ready(() => {
  $(".slick").slick({
    infinite: true, // ループの有効化
    dots: true, // ドットインジケーターの表示
  });
});
```

#### アニメーションをフェードに変えた作例

アニメーションをフェードに切り替えたい場合は、`fade`プロパティを有効化します。有効化すると、スワイプ中にアニメーションが発生しなくなるため注意が必要です。

![Slick.js アニメーションをフェードに変えた作例](https://ics.media/entry/210902/images/slick_demo_fade.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210826_carousel/slick.html#fade)
-   [コードを確認する](https://github.com/ics-creative/210826_carousel/blob/main/slick.html)

（上述の作例とHTMLコードは同じ）

```
$(document).ready(() => {
  $(".slick").slick({
    infinite: true, // ループの有効化
    dots: true, // ドットインジケーターの表示
    fade: true, // フェードアニメーションを有効化
  });
});
```

### Swiper.js

![Swiper.jsのサイトイメージ](https://ics.media/entry/210902/images/swiper_site.png)

[Swiperスワイパー.js](https://swiperjs.com/)はタッチパネルのデバイスで使われることを重点においているカルーセルライブラリです。Slick.jsと同様に、タッチ・スワイプ操作にも対応しています。エフェクトモジュールを使用して、簡単に多彩な表現ができるのが大きな特徴です。機能が豊富なため容量も大きいですが、ES Modulesのimport文でモジュールを絞ったインポートができるので工夫次第で容量を節約できます。

-   [インポート可能なモジュール一覧](https://swiperjs.com/swiper-api#using-js-modules)

多くのイベントが準備されているため、さまざまな表現に柔軟に対応できます。今も更新が頻繁に行われているためバージョンアップのサイクルが早いことも特徴です。

依存ライブラリについては、同じ作者が開発されている[Dom7](https://framework7.jp/docs/dom7.html)というJSライブラリが使われていますが、Swiper.jsに内蔵されているためとくに意識する必要はありません。

このJSライブラリの基本的な実装と、エフェクトモジュールを利用した作例をいくつか用意しました。

#### 基本の作例

![Swiper.js 基本の作例](https://ics.media/entry/210902/images/swiper_demo.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210826_carousel/swiper.html)
-   [コードを確認する](https://github.com/ics-creative/210826_carousel/blob/main/swiper.html)

```
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <div>1</div>
    </div>
    <div class="swiper-slide">
      <div>2</div>
    </div>
    <div class="swiper-slide">
      <div>3</div>
    </div>
  </div>

  <div class="swiper-pagination"></div>

  <button type="button" class="swiper-button-prev"></button>
  <button type="button" class="swiper-button-next"></button>
</div>
```

```
const swiper = new Swiper(".swiper-container", {
  // ドットインジケーターの表示
  pagination: {
    el: ".swiper-pagination",
  },
  // 前後スライドボタンを表示
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true, // ループの有効化
});
```

#### フェードエフェクトを使用した作例

![Swiper.js フェードアニメーションの作例](https://ics.media/entry/210902/images/swiper_demo_fade.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210826_carousel/swiper.html#fade)
-   [コードを確認する](https://github.com/ics-creative/210826_carousel/blob/main/swiper.html)

（上述の作例とHTMLコードは同じ）

```
const swiper = new Swiper(".swiper-container", {
  /* ドットインジケーター、前後ボタン、ループの記述は省略 */
  
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
});
```

#### カバーフローエフェクトを使用した作例

![Swiper.js カバーフローアニメーションの作例](https://ics.media/entry/210902/images/2404_swiper_demo_coverflow.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210826_carousel/swiper.html#coverflow)
-   [コードを確認する](https://github.com/ics-creative/210826_carousel/blob/main/swiper.html)

（上述の作例とHTMLコードは同じ）

```
const swiper = new Swiper(".swiper-container", {
  /* ドットインジケーター、前後ボタン、ループの記述は省略 */
  
  slidesPerView: 1.6, // 表示するスライドの枚数
  centeredSlides : true, // スライドを中央揃えを有効化
  effect: "coverflow",
  coverflowEffect: {
    rotate: 0, // スライドの回転角度
    stretch: 50, // スライドの間隔（px単位）
    depth: 200, // 奥行きの設定（translateをZ方向にpx単位で移動）
    modifier: 1, //
    slideShadows : true, // 先頭スライドのbox-shadowを有効化
  },
});
```

#### カードエフェクトを使用した作例

![Swiper.js カードアニメーションの作例](https://ics.media/entry/210902/images/swiper_demo_cards.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210826_carousel/swiper.html#cards)
-   [コードを確認する](https://github.com/ics-creative/210826_carousel/blob/main/swiper.html)

（上述の作例とHTMLコードは同じ）

```
const swiper = new Swiper(".swiper-container", {
  /* ドットインジケーター、前後ボタン、ループの記述は省略 */

  grabCursor: true,
  effect: "cards",
});
```

#### クリエイティブエフェクトを使用した作例

クリエイティブエフェクトは表示しているスライドの移動先と、次に表示されるスライドのCSSプロパティをいくつか操作できます。このサンプルでは、前後のスライドがアニメーションされる時の`transform: translate()`を操作しています。

![Swiper.js クリエイティブアニメーションの作例](https://ics.media/entry/210902/images/swiper_demo_creative.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210826_carousel/swiper.html#creative)
-   [コードを確認する](https://github.com/ics-creative/210826_carousel/blob/main/swiper.html)

（上述の作例とHTMLコードは同じ）

```
const swiper = new Swiper(".swiper-container", {
  /* ドットインジケーター、前後ボタン、ループの記述は省略 */

  grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: { // 表示しているスライドの移動先
      shadow: true, // 影の有効化
      translate: [0, 0, -400], // translateをX,Y,Zで指定
    },
    next: { // 次に表示されるスライドの設定
      translate: ["100%", 0, 0], // translateをX,Y,Zで指定
    },
  },
});
```

#### スライド数の注意点

本記事で検証を行っているv11では、ループさせる場合の必要最低スライド数に条件があります。 用意するスライド数は、`slidesPerView`（1回に表示するスライド枚数）+ `slidesPerGroup`（一度にスライドさせる枚数）以上でなければいけません。`slidesPerView`と`slidesPerGroup`の初期値はともに`1`です。

-   参考: [Swiper v11 - Back To Basics](https://swiperjs.com/blog/swiper-v11-back-to-basics#loop-mode)

たとえば、画面に3枚表示して一度に1枚ずつスライドさせる場合には、4枚以上のスライドが必要です。

スライド数が足りていない場合、コンソールに以下のエラーがでます。スライド数を追加するか、もしくは`slidesPerView`や`slidesPerGroup`の値を低くするよう促しています。

```
Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters
```

さらに、`centeredSlides: true`（アクティブなスライドを中央配置する）を指定する場合は少し注意が必要です。`slidesPerView`や`slidesPerGroup`の割り付け状況により、必要最低スライド数に加えて、1枚追加のスライドが必要になる場合があります。

そのため、`centeredSlides: true`を指定している「カードエフェクトを使用した作例」では、調整を行い4枚のスライドで作成しています。

### keen-slider.js

![keen-slider.jsのサイトイメージ](https://ics.media/entry/210902/images/keen-slider_site.png)

[keen-sliderキーンスライダー.js](https://keen-slider.io/)はカスタマイズが前提とされているシンプルなカルーセルライブラリです。カルーセルを実装するために必要なコアな機能が用意されていて、Slick.jsやSwiper.js同様にタッチ・スワイプ操作にも対応しています。よくある機能の実装方法については公式ドキュメントで作例が紹介されています。

機能が豊富なJSライブラリは便利なことも多いですが、ウェブサイトの要件次第でライブラリ自体のデフォルト挙動が不都合になる場合があります。このライブラリではコアな役割はライブラリにまかせつつ、必要な機能はライブラリの挙動になるべく干渉せず実装できます。

このJSライブラリの基本的な作例を用意しました。ドットのインジケーターや前後へのスライドボタンなど、必要な機能はイベントやメソッドを利用して実装しています。

#### 基本の作例

![keen-slider.js 基本の作例](https://ics.media/entry/210902/images/keen-slider_demo.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210826_carousel/keen-slider.html)
-   [コードを確認する](https://github.com/ics-creative/210826_carousel/blob/main/keen-slider.html)

```
<div class="keen-slider carousel">
  <div class="keen-slider__slide">
    <div class="carousel-item carousel-item__bgcBlue">1</div>
  </div>
  <div class="keen-slider__slide">
    <div class="carousel-item carousel-item__bgcYellow">2</div>
  </div>
  <div class="keen-slider__slide">
    <div class="carousel-item carousel-item__bgcRed">3</div>
  </div>
</div>

<button type="button" id="arrow-left" class="arrow arrow--left">
  <img src="./assets/arrow-left.svg" alt="">
</button>
<button type="button" id="arrow-right" class="arrow arrow--right">
  <img src="./assets/arrow-right.svg" alt="">
</button>

<div id="dots" class="dots"></div>
```

```
const keenSlider = new KeenSlider(".keen-slider", {
  loop: true,
  created: (instance) => { // はじめて初期化された後に実行
    // 左の矢印ボタンをクリックしたら1つ前のスライドに移動
    document
      .getElementById("arrow-left")
      .addEventListener("click", () => {
        instance.prev();
      });

    // 右の矢印ボタンをクリックしたら1つ先のスライドに移動
    document
      .getElementById("arrow-right")
      .addEventListener("click", () => {
        instance.next();
      });

    // ドットインジケーターを生成する親要素を取得
    const dots_wrapper = document.getElementById("dots");

    // スライドと同じ数のドットインジケーターを生成
    const slides = document.querySelectorAll(".keen-slider__slide");
    slides.forEach((t, idx) => {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      dots_wrapper.appendChild(dot);

      // ドットインジケーターをクリックしたら同じ列番号のスライドへ移動
      dot.addEventListener("click", () => {
        instance.moveToSlide(idx);
      });
    });

    // CSSクラスの更新
    updateClasses(instance);
  },
  slideChanged: (instance) => { // 現在表示されているスライドが変更された時に実行
    // CSSクラスの更新
    updateClasses(instance);
  },
})

/**
 * 各要素のCSSクラスを更新
 * @param instance
 */
function updateClasses(instance) {
  // 現在表示しているスライドの列番号を取得
  const slide = instance.details().relativeSlide;

  // 生成されたドットインジケーターの要素を取得し状態を更新
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, idx) => {
    idx === slide
      ? dot.classList.add("dot--active")
      : dot.classList.remove("dot--active");
  })
}
```

### Splide

[Splide](https://ja.splidejs.com/)は軽くてモダンなカルーセルライブラリです。タッチ・スワイプ操作にも対応しており、シンプルなJavaScriptで柔軟にカスタマイズできます。よくある機能については、公式ドキュメントで実例とともにわかりやすく紹介されています。

また、アクセシブルなカルーセルが実装できる点や、日本語ドキュメントが充実している点も魅力で安心して開発に取り組めます。

参考：[アクセシビリティ - Splide](https://ja.splidejs.com/guides/accessibility/)

![Splideのサイトイメージ](https://ics.media/entry/210902/images/splide_site.png)

このJSライブラリの基本的な作例を用意しました。インスタンスを生成するだけでドットのインジケーターや前後へのスライドボタンなどが、表示・動作します。インスタンスの第二引数にオプションを指定しカスタマイズできます。

#### 基本の作例

![Splide 基本の作例](https://ics.media/entry/210902/images/splide_demo.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210826_carousel/splide.html)
-   [コードを確認する](https://github.com/ics-creative/210826_carousel/blob/main/splide.html)

```
<div class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">
        <span class="item item__blue">1</span>
      </li>
      <li class="splide__slide">
        <span class="item item__yellow">2</span>
      </li>
      <li class="splide__slide">
        <span class="item item__red">3</span>
      </li>
    </ul>
  </div>
</div>
```

```
new Splide(".splide", {
  type: "loop", // ループ可能にする
}).mount();
```

### わかりやすいカルーセルを心がけよう

カルーセルは便利なユーザーインターフェイスですが、はじめに表示されているスライド以外はユーザーに気づかれにくいといったデメリットも存在します。

今回紹介したほとんどのサンプルは、次のスライドが存在していることが視覚的にわかりにくいため、ユーザーインターフェイスであることに気づかれない可能性があります。Swiper.jsで紹介した[カバーフローのサンプル](https://ics-creative.github.io/210826_carousel/swiper.html#coverflow)のように次のスライドを一部表示させるなど、効果的に使うためにはカルーセルの特徴をおさえておく必要があるでしょう。

-   参考: [Carousels on Mobile Devices](https://www.nngroup.com/articles/mobile-carousels/)
-   参考: [Carousels on Mobile Devices 日本語訳](https://u-site.jp/alertbox/mobile-carousels/)

### まとめ

自力でゼロから実装すると大変なカルーセルですが、ライブラリを使用することで手軽に実装できます。基本的な機能はどのライブラリも似ているところがありますが、少し踏み込むとそれぞれの特徴あるので目的に合わせて選びましょう。

紹介したライブラリの中から選ぶ場合は、以下の判断基準を参考にしてみてください。

-   高機能で多彩な表現を使用したい場合はSwiper.js
-   jQueryを使用しているプロジェクトや、Swiper.jsほど機能を必要としない場合はSlick.js
-   独自の機能や演出を取り入れたい場合はkeen-slider.js
-   アクセシブルかつ軽量・簡単・モダンなスライダーを作成したい場合はSplide

※この記事が公開されたのは**4年前**ですが、**8か月前の2025年5月**に内容をメンテナンスしています。