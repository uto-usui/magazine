---
title: "マイクロインタラクションからクリエイティブ表現まで！Tween24.jsを使った演出表現"
source: "https://ics.media/entry/211209/"
publishedDate: "2021-12-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

ウェブサイトのリッチな表現に欠かせないアニメーション。実装にはCSSを使ったものからJavaScriptを使ったもの、WebGLを使ったものまでありますが、今回はTween24.jsを使ったウェブ制作の場面で使える実践的表現を紹介します。

![作例](https://ics.media/entry/211209/images/211209_samples.webp)

基本的な導入方法や使い方は記事『[新感覚！メソッドチェーンでアニメーションがスラスラ書ける「Tween24.js」を作りました](https://ics.media/entry/210409/)』をご覧ください。

### CSSアニメーションとの違い

CSSの`transition`プロパティや`@keyframes`を使ったアニメーションなどがあります。これらは比較的手軽にアニメーションを実装できるのがメリットです。手軽さとは引き換えに複雑なアニメーションや動的に変数が変わるようなアニメーションが苦手です。一方でJavaScriptを使った手法は、複雑なものや動的なアニメーションも実装できるメリットがありますが、CSSと比べると記述量も多くなりがちで、よりハイレベルなスキルも求められます。

難しいJavaScriptによるアニメーションですが、Tween24.jsを使えば直感的に記述できます。ここからは具体的アニメーションを見ていきましょう。

### 下線のアニメーション

![ホバーで下線が出てくるアニメーション](https://ics.media/entry/211209/images/211209_underline.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211209_tween24_practical/underline/)
-   [コードを確認する](https://github.com/ics-creative/211209_tween24_practical/blob/main/src/underline.js)

カーソルがホバーすると下線が出てくるアニメーションはCSSの`:hover`疑似クラスを使えばCSSのみでも実装できます。しかし、Tween24.jsを使って実装するとより小気味よいアニメーションができます。CSSとの違いを並べてみました。

![Tween24.jsを使ったものとのCSSのものの比較](https://ics.media/entry/211209/images/211209_underline_js_css.webp)

素早くカーソルを動かした時に違いがあります。CSSによるものは線が少ししか伸びないのに対し、Tween24.jsによるものは伸び切ってから戻るのでカーソルの動きに追従したようなアニメーションになります。

では、実際のコードを見てみましょう。

```
<ul class="list">
  <li class="list_item">
    <a href="#">Home <span class="underline"></span></a>
  </li>
  <li class="list_item">
    <a href="#">About <span class="underline"></span></a>
  </li>
  <!-- 中略 -->
  <li class="list_item">
    <a href="#">Contact Us <span class="underline"></span></a>
  </li>
</ul>
```

HTMLは個々のリンク内に今回動かす下線として`<span class="underline">`の要素があります。下線は`position`プロパティで下側にレイアウトするように設定しておきます。

```
document.querySelectorAll(".list_item a").forEach((element) => {
  const underLineElement = element.querySelector(".underline");

  // ホバー開始時のTween
  const enterAnimation = Tween24.tween(
    underLineElement,
    0.2,
    Ease24._2_QuadOut
  ).width("100%");

  // ホバー終了時のTween
  const leaveAnimation = Tween24.tween(
    underLineElement,
    0.5,
    Ease24._2_QuadOut
  ).width("0%");

  // ホバーイベントをaタグに付与
  Event24.add(
    element,
    Event24.MOUSE_ENTER,
    Tween24.func(() => {
      leaveAnimation.skip();
      enterAnimation.play();
    })
  );
  Event24.add(
    element,
    Event24.MOUSE_LEAVE,
    Tween24.func(() => {
      enterAnimation.skip();
      leaveAnimation.play();
    })
  );
});
```

アニメーションは`<a>`タグの要素にホバーしたら実行したいので、`forEach()`メソッドで個々に設定しています。ポイントはホバーした時と離れた時で別々のトゥイーンアニメーションを指定するところです。

```
const enterAnimation = Tween24.tween(
  underLineElement,
  0.2,
  Ease24._2_QuadOut
).width("100%");

const leaveAnimation = Tween24.tween(
  underLineElement,
  0.5,
  Ease24._2_QuadOut
).width("0%");

```

ホバー開始時は`0.2`秒で下線の長さが`100%`になるようにします。終了時は`0.5`秒で`0%`の長さにします。開始時と終了時のトゥイーンアニメーションをホバーイベントに紐付けます。

```
Event24.add(
  element,
  Event24.MOUSE_ENTER,
  Tween24.func(() => {
    leaveAnimation.skip();
    enterAnimation.play();
  })
);
Event24.add(
  element,
  Event24.MOUSE_LEAVE,
  Tween24.func(() => {
    enterAnimation.skip();
    leaveAnimation.play();
  })
);
```

イベントの付与には同梱の`Event24`が便利です。注目したいのが`skip()`メソッドです。このメソッドは途中でもトゥイーンを完了状態時まで飛ばします。ホバー開始時（`Event24.MOUSE_ENTER`）はかならず長さ`0%`の位置から始まりますし、終了時は必ず`100%`の位置から開始します。CSSでは難しい、マウスを素早く動かしても連続的なアニメーションを実現できます。

### 等速で流れていく文字

![等速で流れていく文字のアニメーション](https://ics.media/entry/211209/images/211209_text_scroll.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211209_tween24_practical/beltScroll/)
-   [コードを確認する](https://github.com/ics-creative/211209_tween24_practical/blob/main/src/beltScroll.js)

電光掲示板のように文字がずっと流れていく表現です。こちらもCSSアニメーションでも実装できますが少し面倒なポイントがあります。CSSの場合、アニメーションのスピードを**継続時間**で指定します。そのため要素の長い場合と短い場合で流れる速度が違ってきます。揃えたい場合は長さから時間を逆算しなくてはなりません。静的な要素であればあらかじめ計算できますが、CMSで出力されるなど動的な場合は事実上CSSのみでは不可能です。

そこで便利なのがTween24.jsにある`tweenVelocity()`メソッドです。`tweenVelocity()`は**速度**を指定できるので要素の長さが違っても一定の速度を指定できます。具体的実装をみていきます。

```
<p class="beltScroll">
  <span class="beltScrollText firstText"
    >メロスは激怒した。必ず、かの邪智暴虐の王を除かなければならぬと決意した。...此のシラクスの市にやって来た。</span
  >
  <span class="beltScrollText secondText"
    >メロスは激怒した。必ず、かの邪智暴虐の王を除かなければならぬと決意した。...此のシラクスの市にやって来た。</span
  >
</p>
```

`<span class="beltScrollText">`の要素を左に流します。同じ文章を繰り返しているのはループが途切れないようにしているためです（1つだけの場合、アニメーション後半で右側に空白が生じてしまいます）。

```
// スクロールする速さ
const VELOCITY = 100;

const firstText = document.querySelector(".beltScroll .firstText");
const secondText = document.querySelector(".beltScroll .secondText");

// まえ側のテキスト
const firstTextTween = Tween24.serial(
  Tween24.prop(firstText).x(0),
  Tween24.tweenVelocity(firstText, VELOCITY).x("-100%")
);
// うしろ側のテキスト（見きれないようにする）
const secondTextTween = Tween24.serial(
  Tween24.prop(secondText).x("100%"),
  Tween24.tweenVelocity(secondText, VELOCITY).x(0)
);

// 両者を同時に動かす
const beltTween = Tween24.parallel(firstTextTween, secondTextTween);

// ベルトスクロールをループ実行する
Tween24.loop(0, beltTween).play();
```

まず、文章が流れるトゥイーンを設定します。

```
// まえ側のテキスト
const firstTextTween = Tween24.serial(
  Tween24.prop(firstText).x(0),
  Tween24.tweenVelocity(firstText, VELOCITY).x("-100%")
);
// うしろ側のテキスト（見きれないようにする）
const secondTextTween = Tween24.serial(
  Tween24.prop(secondText).x("100%"),
  Tween24.tweenVelocity(secondText, VELOCITY).x(0)
);
```

前半のテキストは横位置を`0`から`-100%`の位置まで、後半テキストは前半に続くように`100%`から`0`の位置になるようなトゥイーンアニメーションにしています。`tweenVelocity()`メソッドで`VELOCITY = 100`を指定することによりどちらの要素も長さに関係なく同じ速度でトゥイーンします。

```
// 両者を同時に動かす
const beltTween = Tween24.parallel(firstTextTween, secondTextTween);

// ベルトスクロールをループ実行する
Tween24.loop(0, beltTween).play();
```

`parallel()`メソッドで両者を同時に動かし`loop()`メソッドを使ってループしています。これで電光掲示板のような流れるテキストの完成です。テキストを例にしましたが、テキストだけでなく長い画像を動かしてもおもしろい表現が作れそうです。

### テキストアニメーション

![テキストが流れるようなアニメーション](https://ics.media/entry/211209/images/211209_text.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211209_tween24_practical/text/)
-   [コードを確認する](https://github.com/ics-creative/211209_tween24_practical/blob/main/src/text.js)

Tween24.jsはテキストのアニメーションも実装可能です。ページ表示時の演出などにも使えるでしょう。まずは見出しのトゥイーンアニメーションを解説します。

```
<h1 class="headline">Lorem Ipsum</h1>
```

HTMLはなんの変哲のない見出しタグです。1文字1文字`<span>`タグで囲むようなこともないです。

```
Tween24.serial(
  Tween24.propText(".headline").x(-20).opacity(0),
  Tween24.lag(
    0.03,
    Tween24.tweenText(".headline", 0.4, Ease24._3_CubicOut).x(0).opacity(1)
  )
).play();
```

`serial()`メソッドで直列のトゥイーンをさせます。まず、`propText()`メソッドで初期値を指定します。続いて連続的に実行させる`lag()`メソッドとテキストをトゥイーンさせる`tweenText()`を使って横移動と透過度の変更を指定します。1文字が左からふわっと現れるトゥイーンを連続的に行うことで上記のようなアニメーションを実現できます。

見出しだけでなく、文章にも適用可能です。文章の場合は全体が表示される時間で調整した方が便利だと思うので`lagTotal()`を使うと良いでしょう。`lagTotal()`メソッドは完了までの時間を指定できるので、文章全体を1秒で表示したい、場面などで役立ちます。

```
<p class="text">Lorem ipsum dolor sit amet, ... voluptatibus?</p>
```

```
Tween24.serial(
  Tween24.propText(".text").xy(-5,15).opacity(0).rotation(45),
  Tween24.lagTotal(
    2,
    Tween24.tweenText(".text", 0.4, Ease24._3_CubicOut).xy(0,0).opacity(1).rotation(0)
  )
).play();
```

見出しの時と基本的な構成は同じです。プロパティを少し変えてx軸・ｙ軸と角度のトゥイーンを加えることで回転しながら出てくるような雰囲気にしています。

### ふわっと現れるカードコンポーネント

![カードコンポーネントがふわっと現れるアニメーション](https://ics.media/entry/211209/images/211209_card.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211209_tween24_practical/card/)
-   [コードを確認する](https://github.com/ics-creative/211209_tween24_practical/blob/main/src/card.js)

記事のカードコンポーネントがふわっと現れるアニメーションです。画像・タイトル・文章が連続的に出現しますが、さきほどの`lag()`メソッドを使って実現しています。

```
<div class="card">
  <img
    src="https://picsum.photos/id/93/300/200"
    alt=""
    width="300"
    height="200"
  />
  <h1>
    sunt aut facere repellat provident occaecati excepturi optio reprehenderit
  </h1>
  <p>
    quia et suscipit suscipit recusandae consequuntur expedita et cum
    reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem
    eveniet architecto
  </p>
</div>
```

```
// 初期状態（透過・y座標）をセット
const setInitialState = Tween24.prop(".card *").opacity(0).y(40);

// カード内の個々の要素のフェードTween
const fadeTween = Tween24.tween(".card *", 1, Ease24._4_QuartOut)
  .opacity(1)
  .y(0);

// 個々のフェードTweenを連続的に実行
const cardTween = Tween24.lag(0.1, fadeTween);

Tween24.serial(setInitialState, cardTween).play();
```

さきほどのテキストと同じ構成ですが、少し書き方を変えています。個別のトゥイーンを変数として格納しておくことで再利用性や、複雑になると中身が多くなりがちな`serial()`メソッドや`parallel()`メソッドの中を見通し良くします。

また今回はカードコンポーネントの中全体の要素に適用したいので全称セレクター`*`を使って指定しています。中身が増えたりタグが変わったりしてもJavaScript側のコードは編集しなくても大丈夫です。

カードコンポーネントは次のスクロールと連動させるとよりおもしろくなります。

### スクロールと連動したアニメーション

![カードコンポーネントがスクロールでふわっと現れる](https://ics.media/entry/211209/images/211209_card_list.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211209_tween24_practical/cardList/)
-   [コードを確認する](https://github.com/ics-creative/211209_tween24_practical/blob/main/src/cardList.js)

スクロールと連動させて画面内に入ってきたら出現させるアニメーションです。画面内入ったらという判定はIntersection Observerが便利です。Intersection Observerの細かい解説は割愛しますので、詳しい使い方については記事『[JSでのスクロール連動エフェクトにはIntersection Observerが便利](https://ics.media/entry/190902/)』の記事をご覧ください。

```
<div class="cardList">
  <div class="card">
    <img
      src="https://picsum.photos/id/93/300/200"
      alt=""
      width="300"
      height="200"
    />
    <h1>
      sunt aut facere repellat provident occaecati excepturi optio reprehenderit
    </h1>
    <p>
      quia et suscipit suscipit recusandae consequuntur expedita et cum
      reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem
      eveniet architecto
    </p>
  </div>
  <!-- 中略 -->
  <div class="card">
    <img
      src="https://picsum.photos/id/125/300/200"
      alt=""
      width="300"
      height="200"
    />
    <h1>doloribus ad provident suscipit at</h1>
    <p>
      qui consequuntur ducimus possimus quisquam amet similique suscipit porro
      ipsam amet eos veritatis officiis exercitationem vel fugit aut
      necessitatibus totam omnis rerum consequatur expedita quidem cumque
      explicabo
    </p>
  </div>
</div>
```

HTMLとしてはさきほどのカードコンポーネントが並んでいます。

```
/**
 * 交差時のコールバック関数
 * @param entries
 */
const intersectionCallback = (entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // 交差した要素のdata属性からtweenIdを取得
      const tweenId = entry.target.dataset.tweenId;
      // 200ミリ秒ずつ遅延させて実行
      setTimeout(() => {
        Tween24.playById(tweenId);
      }, 200 * index);
    }
  });
};

/**
 * Intersection Observerを作成
 * @type {IntersectionObserver}
 */
const observer = new IntersectionObserver(intersectionCallback, {
  // 見えてから実行したいので、画面下よりも少し上に範囲を設定
  rootMargin: "0px 0px -15%",
});

// カードコンポーネントの全要素
const cardElements = document.querySelectorAll(".card");

// Tweenアニメーションを作成
cardElements.forEach((cardElement, index) => {
  const children = cardElement.querySelectorAll("*");
  Tween24.prop(Array.from(children)).opacity(0).y(40).play();

  // カード内フェードTweenアニメーション
  const fadeTween = Tween24.tween(Array.from(children), 1, Ease24._4_QuartOut)
    .opacity(1)
    .y(0);

  // 個々のフェードTweenを連続的に実行
  const cardTween = Tween24.lag(0.1, fadeTween);

  // Tweenアニメーションにidを付与
  cardTween.id(`${index}`);

  // Intersection Observer側から読み出せるようにdata属性にセット
  cardElement.dataset.tweenId = `${index}`;

  // オブザーバーで監視
  observer.observe(cardElement);
});
```

JavaScriptの記述は少し多いですが、前半がIntersection Observerの処理、後半がトゥイーンの処理になっています。今回はトゥイーンアニメーションを別の処理から呼び出すので紐付けられるよう`id()`メソッドと`playById()`メソッドを活用します。

```
// カードコンポーネントの全要素
const cardElements = document.querySelectorAll(".card");

// Tweenアニメーションを作成
cardElements.forEach((cardElement, index) => {
  const children = cardElement.querySelectorAll("*");
  Tween24.prop(Array.from(children)).opacity(0).y(40).play();
  
  // カード内フェードTweenアニメーション
  const fadeTween = Tween24.tween(Array.from(children), 1, Ease24._4_QuartOut)
    .opacity(1)
    .y(0);
  
  // 個々のフェードTweenを連続的に実行
  const cardTween = Tween24.lag(0.1, fadeTween);

 // 以下省略 
})
```

さきほどはカードコンポーネントが1つだけだったので`tween()`メソッドに直接クエリを渡していました。しかし複数ある場合に全称セレクターを使うとすべてのコンポーネントの内部まで対象にしてしまいます。**そのコンポーネント内の要素だけ**を指定したいので`forEach()`でさらに`const children = cardElement.querySelectorAll("*")`で子要素を取得し、これを渡しています。

ただし、NodeListはTween24の引数として渡せない（\*）ので`Array.from()`で配列に変換してから渡してトゥイーンアニメーションを設定しています。

```
// Tweenアニメーションにidを付与
cardTween.id(`${index}`);

// Intersection Observer側から読み出せるようにdata属性にセット
cardElement.dataset.tweenId = `${index}`;

// オブザーバーで監視
observer.observe(cardElement);
```

`.id()`メソッドで個別のIDを付与しています。今回は`forEach()`のindexを識別子として使っています。トゥイーンにIDを設定すると同時にHTMLの`data`属性にも同じものを付与しています。Intersection Observer側は`data`属性を読み取ってアニメーションを実行させます。

```
const intersectionCallback = (entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // 交差した要素のdata属性からtweenIdを取得
      const tweenId = entry.target.dataset.tweenId;
      // 200ミリ秒ずつ遅延させて実行
      setTimeout(() => {
        Tween24.playById(tweenId);
      }, 200 * index);
    }
  });
};
```

交差時実行されるコールバック関数の中では`data`属性を読み取りそのIDにもとづいて`playById()`メソッドで実行させます。少し遅延させて実行したいので`setTimeout()`で呼び出しています。これでスクロールに合わせてカードコンポーネントが出現するアニメーションができました。

\*：今後のアップデートでNodeListも引数として渡せるようになる予定です。

### SVGのアニメーション

![円グラフのアニメーション](https://ics.media/entry/211209/images/211209_svg.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211209_tween24_practical/svg/)
-   [コードを確認する](https://github.com/ics-creative/211209_tween24_practical/blob/main/src/svg.js)

やや複雑な手順なりますが、SVGもトゥイーンアニメーションできます。Tween24.jsには`update()`が用意されているので動的にSVGの値を変更しアニメーションさせます。

```
<svg width="300" height="300" viewBox="0 0 300 300">
  <style type="text/css">
    .st0 {
      fill: none;
      stroke: #92e58c;
      stroke-width: 100;
      stroke-miterlimit: 10;
    }
  </style>
  <path
    class="st0"
    d="M150,51c54.7,0,99,44.3,99,99c0,54.7-44.3,99-99,99c-54.7,0-99-44.3-99-99C51,95.3,95.3,51,150,51z"
  />
</svg>
```

今回は円形のパスのSVGです。円グラフのようにアニメーションさせます。

```
// パス要素を取得
const path = document.querySelector("svg path");

// パスの長さを取得
const pathLength = path.getTotalLength();

// パスの長さを破線の間隔として設定
path.setAttribute("stroke-dasharray", String(pathLength));

// アニメーション進捗のオブジェクト。valueの値をTweenさせる。目標値
const tweenData = { progress: 0 };

/**
 * アップデート時の実行する関数
 * 進捗率に応じてパスのオフセットを設定する
 */
const update = () => {
  // 進捗率に長さを掛けたものがオフセット値
  const offset = pathLength * (tweenData.progress / 100);
  path.setAttribute("stroke-dashoffset", String(offset));
};

const pathTween = Tween24.serial(
  Tween24.prop(tweenData, { progress: 100 }),
  Tween24.tween(tweenData, 1, Ease24._1_SineIn, tweenData).onUpdate(update)
);

pathTween.play();

document.querySelector(".js-replay").addEventListener("click", () => {
  path.setAttribute("stroke-dasharray", String(pathLength));
  pathTween.play();
});
```

円グラフの動きはパスの破線`stroke-dasharray`属性と破線のオフセット`stroke-dashoffset`属性によって表現しています。パスの長さと同じ分の間隔の破線（塗り部分と空の部分がパスの長さ）を用意します。破線のオフセットの値を変更するとパスの領域で破線が移動します。パス長だけ移動させると、ちょうど破線1間隔分だけずれるので線が伸びているような表現になります。

![パスが伸びているようにみえる仕組み。オフセットで破線の位置をずらすことで伸びているよううに見える](https://ics.media/entry/211209/images/211209_path.png)

具体的なコードを見ていきます。

```
// パス要素を取得
const path = document.querySelector("svg path");

// パスの長さを取得
const pathLength = path.getTotalLength();

// パスの長さを破線の間隔として設定
path.setAttribute("stroke-dasharray", String(pathLength));
```

パスの長さは`getTotalLength()`メソッドで取得できます。初期値としてパスの要素に破線としてセットします。パスのオフセット値は`0`で完全に埋まっている状態、パス長で完全に空っぽの状態になるので、今回は100%→0%になるようにトゥイーンさせます。

```
/**
 * アップデート時の実行する関数
 * 進捗率に応じてパスのオフセットを設定する
 */
const update = () => {
  // 進捗率に長さを掛けたものがオフセット値
  const offset = pathLength * (tweenData.progress / 100);
  path.setAttribute("stroke-dashoffset", String(offset));
};

// パスのトゥイーン
const pathTween = Tween24.serial(
  Tween24.prop(tweenData, { progress: 100 }),
  Tween24.tween(
    tweenData,
    1,
    Ease24._1_SineIn,
    tweenData
  ).onUpdate(update)
);

pathTween.play();
```

`prop()`で初期値`100`を設定し、`0`になるよう`tween()`メソッドを実行します。この時、`onUpdate()`でSVGの属性値を進捗率に応じた値に変更する関数を実行することでアニメーションできます。

### より複雑なアニメーション表現

![より複雑なアニメーション表現の例。蠍座のデータが現れる](https://ics.media/entry/211209/images/211209_creative.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211209_tween24_practical/creative/)
-   [コードを確認する](https://github.com/ics-creative/211209_tween24_practical/blob/main/src/creative.js)

最後にTween.jsのメソッドやプロパティを使えば、上記のような、よりクリエイティビティに富んだ表現も可能になります。個別の解説は割愛しますが、今回紹介したテクニックを組み合わせています（一部未紹介のプロパティもあります）。複雑なアニメーションも小さなアニメーションの集合体です。Tween24.jsを使えばより直感的に記述できます。

### まとめ

ふわっと現れるアニメーションをいれるだけでも、ぐっとウェブサイトの表現は高まります。Tween24.jsを使って手軽に、そしてリッチにしてはいかがでしょうか？本記事のサンプルは[GitHubのリポジトリ](https://github.com/ics-creative/211209_tween24_practical/)に公開しているので合わせてぜひ参考ください。