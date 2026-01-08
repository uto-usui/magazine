---
title: "has()疑似クラスでコーディングが変わる！　CSS最新スタイリング"
source: "https://ics.media/entry/240808/"
publishedDate: "2024-08-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2024年のブラウザならCSSの`:has()`疑似クラスが使えます。この`:has()`疑似クラスは非常に強力なポテンシャルをもっています。というのも`:has()`疑似クラスを使えば、**どんな関係のセレクターも指定可能**になります。これを使えば多彩なセレクターが記述できるようになり、より表現力豊かなCSSを実現できます。この記事では`:has()`疑似クラスを使ったCSSの表現手法やテクニックを紹介します。

![has()を使ったさまざまなテクニック](https://ics.media/entry/240808/images/240808_css_has.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240808_css_has/)
-   [コードを確認する](https://github.com/ics-creative/240808_css_has)

### :has()疑似クラスの基本的な使い方

`:has()`疑似クラスの使い方について簡単に説明します。`:has()`疑似クラスは渡したセレクターを持つ親要素を選択します。たとえば、次のようなHTMLとCSSがあるとします。

```
<p class="text">
  <strong>メロス</strong>は激怒した。必ず、かの邪智暴虐の王を除かなければならぬと決意した。
</p>
<p class="text">メロスには政治がわからぬ。メロスは、村の牧人である。</p>
```

```
.text {
  color: #000;
}

.text:has(strong) {
  color: red;
}
```

このとき、最初の1つ目の`.text`要素は`<strong>`タグを持っているため、`:has(strong)`疑似クラスが適用されて、文字色が赤くなります。2つ目の`.text`要素は`<strong>`タグを持っていないため、文字色は黒のままです。

![「メロスは激怒した。必ず、かの邪智暴虐の王を除かなければならぬと決意した」のみ赤い文字になっている](https://ics.media/entry/240808/images/240808_base.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240808_css_has/basic/)
-   [コードを確認する](https://github.com/ics-creative/240808_css_has/blob/main/src/assets/style/basic.css)

これだけでは、単なる親要素へのセレクターに過ぎませんが、`:has()`疑似クラスの真の力は親要素にさかのぼれることで、**HTMLの親子関係を超えたセレクターを記述できる**ことにあります。ここに他の疑似クラスなどを組み合わせると**状態に応じたスタイリングが容易**になります。

### フォームの状態に応じたスタイル

フォームのバリデーションで妥当な値でない場合に、それを強調するために見た目を変える場合があるでしょう。

▼入力エラー時は赤く強調したい ![入力エラー時はフォームラベルと入力フォームが赤くなっている](https://ics.media/entry/240808/images/240808_form_design.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240808_css_has/validation/)
-   [コードを確認する](https://github.com/ics-creative/240808_css_has/blob/main/src/assets/style/validation.css)

`<input>`タグなどが対応しているHTMLバリデーションなら、妥当でない場合は`:user-invalid`疑似クラスを用いて検出できます。ただし、このセレクターで選択できるのはその`<input>`タグ自身だけです。`~`で表す後続兄弟結合子を使ってもその後続のタグしか選択できません。しかし、`:has()`疑似クラスを使えば、親要素のセレクターまでいったん戻ったあと、子孫セレクターを使うことでその前の要素にも適用できます。

ちなみに`:user-invalid`疑似クラスは`:invalid`疑似クラスと違い、ユーザーが入力後に妥当性を検証します。必須要素などが初めからエラーにならないので便利です。

具体例を見てみましょう。ラベルと入力フォームがセットになったフォームがあるとします。

```
<p>
  <label class="formWrapper">
    <span class="formLabel">お名前</span>
    <input type="text" class="textForm" placeholder="山田 太郎" required />
    <span class="errorMessage">お名前は必須項目です</span>
  </label>
</p>
<p>
  <label class="formWrapper">
    <span class="formLabel">郵便番号</span>
    <input
      type="text"
      class="textForm"
      placeholder="000-0000"
      pattern="\d{3}-\d{4}"
    />
    <span class="errorMessage">正しい形式で入力してください</span>
  </label>
</p>
```

このようなHTMLがあるとき、従来は`:user-invalid`疑似クラスを用いても、`<input>`タグより前にある`.formLabel`要素、つまりラベル名にスタイルを適用することはできません（※）でした。そのため、HTML順を`<input>`タグの後にもってくるか、JavaScriptでスタイルを適用する必要がありました。しかし、`:has()`疑似クラスを使えば、次のように記述できます。

（※）`:has()`疑似クラス以外に前のタグに適用する方法は`:focus-within()`疑似クラスを用いた方法があります。ただし、これはフォーカス時のみ適用されるため、フォーカスなどの状況に依らない`:has()`の方が汎用性に富んでいます。

▼エラー時のスタイル（CSSネスティング記法を使っています）

```
/* エラーがある場合 */
.formWrapper:has(.textForm:user-invalid) {
  /* ラベルを赤くする */
  .formLabel {
    color: var(--color-alert);
  }
  /* エラーメッセージを表示する */
  .errorMessage {
    display: block;
  }
}

/* 入力フォームを赤くする */
.textForm:user-invalid {
  background-color: var(--color-alert-bg);
  border-color: var(--color-alert);
  color: var(--color-alert);
}

/* プレースホルダーも赤くする */
.textForm:user-invalid::placeholder {
  color: var(--color-alert-placeholder);
}
```

![妥当な入力でない場合に赤くなるフォーム](https://ics.media/entry/240808/images/240808_form_validation.gif)

このように、`:has()`疑似クラスと状態を検知する`:user-invalid`疑似クラスを組み合わせることで、HTMLの構造を変えずに、フォームのバリデーションエラー時にラベルやプレースホルダーなどのスタイルを変更できます。

今回はHTMLバリデーションを使った例を紹介しましたが、JavaScriptでバリデーションを行う場合でも各要素にクラス名を付与せず、`<input>`タグのみにクラス名を付与するだけで、`:has()`疑似クラスを使って同様にスタイルを変更できます。フォームバリデーションは下記の記事にて詳しく解説されています。

-   [『2024年版 HTMLで作るフォームバリデーション』](https://ics.media/entry/240418/)
-   [『ReactとZodで作る堅牢なフォームバリデーション』](https://ics.media/entry/240611/)

ほかにもおもしろい応用表現として、パスワード入力中は目隠しするキャラクターなども作れます。

![パスワード入力中はサングラスをかける顔文字](https://ics.media/entry/240808/images/240808_form_password.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240808_css_has/password/)
-   [コードを確認する](https://github.com/ics-creative/240808_css_has/blob/main/src/assets/style/password.css)

### サイドパネルの開閉

さきほど「HTMLの親子関係を超えたセレクターを記述できる」と述べましたが、これはハンバーガーボタンとサイドパネルの開閉などにも応用できます。次のようなよくあるハンバーガーボタンとサイドパネルを考えてみます。

-   ボタンをクリックすると三本線アイコンからバッテンに変わる
-   ボタンをクリックするとサイドパネルが開閉する

![ハンバーガーボタンを押すとサイドパネルが開閉する](https://ics.media/entry/240808/images/240808_side_panel.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240808_css_has/side_panel/)
-   [コードを確認する](https://github.com/ics-creative/240808_css_has/blob/main/src/assets/style/sidePanel.css)

HTMLは以下のようになります。（細かい部分は省略）

```
<div class="hamburgerAndPanel">
  <button class="hamburgerButton">
    <span class="hamburgerButtonIcon">
      <!-- 開くアイコン -->
      <img
        src="/assets/images/open.svg"
        alt="Open"
        class="hamburgerButtonIcon openIcon"
      />
      <!-- 閉じるアイコン -->
      <img
        src="/assets/images/close.svg"
        alt="Close"
        class="hamburgerButtonIcon closeIcon"
      />
    </span>
    <span class="hamburgerButtonText">Menu</span>
  </button>

  <aside class="sidePanel">
    <ul class="linkList">
      <!-- サイドパネルの中身 省略 -->
    </ul>
  </aside>
</div>
```

クリックによる状態変更自体はJavaScriptを通じて行います。このとき、ハンバーガーボタンのアイコン状態とサイドパネルの状態を連動させるには、それぞれの要素に`isOpen`クラスを付与する必要がありそうです。しかし、`:has()`疑似クラスを使えば、ハンバーガーボタンの方だけにクラスを付与するだけで、サイドパネルの開閉も連動できます。

```
/* メニューが開いている場合の制御 */
.hamburgerAndPanel:has(.hamburgerButton.isOpen) {
  /* 開アイコンは非表示に、閉アイコンが表示 */
  .openIcon {
    visibility: hidden;
    opacity: 0;
  }

  .closeIcon {
    visibility: visible;
    opacity: 1;
  }

  /* サイドパネルと背景を開く */
  .sidePanelBackdrop {
    visibility: visible;
    opacity: 1;
  }

  .sidePanel {
    transform: translateX(0);
  }
}
```

この例でも`.hamburgerAndPanel:has(.hamburgerButton.isOpen)`という「開いているハンバーガーボタンを持つラッパー要素」とすることで、子孫セレクターからサイドパネルの要素へアクセスできます。サイドパネルの開閉に関するクラスをJavaScriptが制御せずに済み、JavaScriptのコードがスッキリします。実際にはサイドパネルに`aria-hidden`属性などの制御をした方がアクセシビリティ的には望ましいので、完全になくせるわけではないかもしれません。それでも記述が減るのでコードの見通しは良くなるはずです。

もっと踏み込むと、理論的には`body:has()`という形式にすればすべての要素へアクセスでき、事実上`:has()`疑似クラスを使えばどんな2要素間の関係も記述できます。これが**どんな関係のセレクターも可能**たるゆえんです。

### モーダルのスクロールバー制御

モーダルを表示した際、後ろのコンテンツがスクロールしないよう`<body>`タグに`overflow: hidden`のスタイルを適用することがあります。コンテンツが画面より十分長い場合にはスクロールバーがあり、モーダル表示時には消えます。このとき、Windowsなどではスクロールバーの幅分だけレイアウトがズレ、ガタツキが発生することがあります。ガタツキを防止するために`scrollbar-gutter`プロパティを用いて制御できます。この制御については記事[『HTML制作で気をつけたいスクロールバーの挙動 - ガタつきをCSSのscrollbar-gutterで防ぐ方法など -』](https://ics.media/entry/230206/)で詳しく解説されています。

この`scrollbar-gutter`プロパティの制御を`has()`を使うとJavaScriptなしで行えます。

```
<body>
  <div class="scrollControl">
    <dialog class="modal">
      <!-- 省略 -->
    </dialog>
  </div>
</body>
```

```
/* モーダルが開いている場合 */
body:has(dialog[open]) {
  overflow: hidden;
}

body:has(dialog[open]) .scrollControl {
  overflow: auto;
  scrollbar-gutter: stable;
}
```

▼モーダル出現・解除時にスクロールバーの分ガタつくことがない ![](https://ics.media/entry/240808/images/240808_modal.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240808_css_has/modal/)
-   [コードを確認する](https://github.com/ics-creative/240808_css_has/blob/main/src/assets/style/modal.css)

`<dialog>`要素は`open`属性を持つと表示されるため、`:has(dialog[open])`とすることでモーダルが開いているときのスタイルを指定できます。`:has()`疑似クラスを使うことで、モーダルが開いているときだけ`<body>`タグに`overflow: hidden`を適用し、またスクロールを制御するためのラッパー要素に`overflow: auto`と`scrollbar-gutter: stable`を適用できます。

なお、今回の例では`<dialog>`要素を使いましたが、モーダルを`<div>`タグなどで作っても開いているのがわかるクラス名さえあれば同様に制御可能です。

▼`.modal`の要素に`.isOpen`クラスで開閉を制御する場合

```
/* モーダルが開いている場合 */
body:has(.modal.isOpen) {
  overflow: hidden;
}

body:has(.modal.isOpen) .scrollControl {
  overflow: auto;
  scrollbar-gutter: stable;
}
```

モーダルの作り方については記事[『HTMLでモーダルUIを作るときに気をつけたいこと』](https://ics.media/entry/220620/)にて詳しく解説されているので、合わせて参考にしてください。

### マウスストーカーのホバー制御

`:has()`疑似クラスはインタラクションとも相性が良いです。このマウスストーカーは`<a>`タグの領域にくると大きくなるというものです。

![aタグの部分にホバーすると円が大きくなるマウスストーカー](https://ics.media/entry/240808/images/240808_mouse_stalker_css.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240808_css_has/mouse_stalker/)
-   [コードを確認する](https://github.com/ics-creative/240808_css_has/blob/main/src/assets/style/mouseStalker.css)

マウスストーカーの追従する動作自体は次のようなHTMLとJavaScriptで実装できます。

```
<div id="mouseStalker"></div>
```

```
const mouseStalkerElement = document.querySelector("#mouseStalker");
document.addEventListener("mousemove", (event) => {
  mouseStalkerElement.style.translate = `${event.clientX}px ${event.clientY}px`;
});
```

マウスの動きに応じてその位置を取得し、マウスストーカーの要素へ反映しています。このとき、`<a>`タグにマウスが乗ったときにマウスストーカーを大きくしたい場合、JavaScriptで次のように記述すると良さそうです。

```
const handleLinkHoverNg = (event) => {
  // ホバーした先がaタグだった場合はクラスを付与
  event.target.tagName === "A"
    ? mouseStalkerElement.classList.add("isLinkHover")
    : mouseStalkerElement.classList.remove("isLinkHover");
};

document.addEventListener("mousemove", (event) => {
  mouseStalkerElement.style.translate = `${event.clientX}px ${event.clientY}px`;
  handleLinkHoverNg(event);
});
```

しかし、このコードだと必ずしもうまくいきません。というのも`<a>`タグの中に`<span>`タグなどがある場合、`<span>`タグにマウスが乗ったときに`event.target`は`<span>`タグになってしまうからです。

この場合、別に各`<a>`タグに対して`mouseenter`イベントと`mouseleave`イベントを設定して、マウスが乗ったときにクラスを付与し、離れたときにクラスを削除するという方法があります。ですが、`:has()`疑似クラスを使えば、ホバーの制御をJavaScriptを使わずにCSSだけで実現できます。

```
.mouseStalker {
  /* 省略 */
  border: 2px solid var(--color-text);
  transition:
    translate 0.3s var(--ease-out-quart),
    scale 0.2s var(--ease-out-quart);
  scale: 0.25;
}

body:has(a:hover) .mouseStalker {
  border-width: 1px;
  scale: 1;
}
```

このようにすることでJavaScriptはマウスストーカーの位置だけを操作すればよいため、コードがスッキリします。`:has()`疑似クラスを使えば、従来はJavaScriptで行っていたような処理もできてしまいます。

### JavaScriptでのhas()の利用

さきほどのマウスストーカーの例はホバー時の見た目の変化をCSSで行うものでしたが、Canvasなどで描画する場合はJavaScriptで見た目の変化を操作する場合もあります。その場合は`:has()`疑似クラスをCSSだけでなくJavaScriptの`querySelector()`関数のクエリーとして利用できます。

![aタグの部分にホバーするとキラキラが大きくなるマウスストーカー](https://ics.media/entry/240808/images/240808_mouse_stalker_canvas.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240808_css_has/canvas/)
-   [コードを確認する](https://github.com/ics-creative/240808_css_has/blob/b6f792e4bb2fadb6183807265a45935cb05d6294/src/canvas/index.html#L36C5-L172C14)

こちらの例はCanvasに描かれたマウスストーカーが`<a>`タグへホバーしたときに変化させるJavaScriptです。JavaScriptで`:has()`疑似クラスを使うと次のように記述できます。

▼一部抜粋

```
// マウス座標
const mousePosition = { x: 0, y: 0 };

// パーティクルのデフォルト設定
const defualtSettings = {
  /* 省略 */
};

// パーティクルの設定
let particleSettings = {
  /* 省略 */
};

document.addEventListener("mousemove", (event) => {
  // マウス座標を更新し、パーティクルの発生位置を変更
  mousePosition.x = event.pageX;
  mousePosition.y = event.pageY;

  const isATagHovered = document.querySelector("body:has(a:hover)");

  if (isATagHovered) {
    // ホバー時はパーティクルの設定を変更
    particleSettings = {
      ...defaultSettings,
      particleNum: 4,
      xVariance: 70,
      yVariance: 70,
    };
  } else {
    // それ以外のときはデフォルトの設定に戻す
    particleSettings = { ...defaultSettings };
  }
});
```

`:has()`を使うことのメリットとして、個別の`<a>`タグにイベントハンドラーを設定する必要がなくなり、`mousemove`イベント内でホバー時の制御を完結できるところにあります。この例では`<a>`タグのイベントハンドラーより、`:has()`を使う大きなメリットはそこまでないかもしれませんが、複雑な状態を扱う場合には同時に別々のイベントハンドラーから発せられた処理をまとめるのは難しくなりがちです。複雑なCanvas表現を扱う場合などではその力を発揮するでしょう。

なお、こちらのデモは[PixiJS](https://pixijs.com/)を用いて作成しています。パーティクルの作り方は以下の記事が参考になるでしょう。

-   [『センスだけに頼らない！ CSSとJSで作るパーティクル表現のテクニック』](https://ics.media/entry/220420/)
-   [『JavaScriptで取り組むクリエイティブコーディング パーティクル表現入門』](https://ics.media/entry/18835/)

#### コラム：has()のパフォーマンス

CSS、Canvasいずれのマウスストーカーの例でも、`body:has(a:hover)`という全域を対象としたセレクターを使いました。このとき、ブラウザは全域のタグを探索するのでパフォーマンスに懸念があるかもしれません。

結論から言うと、一般的なページ量のHTMLであれば`body:has(a:hover)`の利用は問題ありません。具体的には`div`の入れ子構造が50階層あり、それが500個ほどあるようなHTMLでさきほどのCSSとJavaScriptのマウスストーカーを試してみました。iPhone 12 miniなら目立ったカクツキなどは見当たりませんでした。一般的なページで50階層タグが500個もあることは稀なので、通常の利用であれば問題ないでしょう。下記のリンクはそのデモになります。階層数や個数を調整しながら試してみてください。

-   [サンプルを別ウインドウで開く（CSS版）](https://ics-creative.github.io/240808_css_has/mouse_stalker_performance/)
-   [サンプルを別ウインドウで開く（Canvas版）](https://ics-creative.github.io/240808_css_has/canvas_performance/)

### Anchor Positioningと組み合わせたアニメーション

最後にCSS Anchor Positioning APIと組み合わせたアニメーションを紹介します。Anchor Positioningに対応しているのはChrome 125、Edge 125（2024年5月）、Safari 26.0（2025年9月）以上です。`:has()`疑似クラスと組み合わせることで、次のようなアニメーションをCSSのみで実現できます。

![aタグの部分にホバーするとキラキラが大きくなるマウスストーカー](https://ics.media/entry/240808/images/240808_anchor_positioning.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240808_css_has/anchor_hover/)
-   [コードを確認する](https://github.com/ics-creative/240808_css_has/blob/main/src/assets/style/anchorHover.css)

```
<div class="anchorHoverListWrapper">
  <ul class="anchorHoverList">
    <li class="anchorHoverListItem"><!-- 省略 --></li>
    <li class="anchorHoverListItem"><!-- 省略 --></li>
    <li class="anchorHoverListItem"><!-- 省略 --></li>
    <li class="anchorHoverListItem"><!-- 省略 --></li>
    <li class="anchorHoverListItem"><!-- 省略 --></li>
    <li class="anchorHoverListItem"><!-- 省略 --></li>
    <li class="anchorHoverListItem"><!-- 省略 --></li>
  </ul>
  <div class="anchorHoverListBackground"></div>
</div>
```

▼一部抜粋

```
.anchorHoverListWrapper {
  position: relative;
}

.anchorHoverListItem {
  transition: color 0.3s 0.05s var(--ease-out-quart);
}

/* 背景の非ホバー時のスタイル */
.anchorHoverListBackground {
  position: absolute;
  z-index: -1;
  top: 0;
  left: anchor(left);
  position-anchor: --anchor-hover;
  scale: 1 0;
  transform-origin: center center;
  transition:
    top 0s 1s,
    scale 0.5s var(--ease-out-quart);
}

/* 初期位置 */
.anchorHoverListItem:not(:hover):first-child {
  anchor-name: --anchor-hover;
}

/* ホバー時 */
.anchorHoverListItem:hover {
  anchor-name: --anchor-hover; /** ホバーしたものをアンカーに指定 */
  color: #fff;
  transition: color 0.6s 0.1s var(--ease-out-quart);
}

/* リスト上にホバーしていたら、その位置へ背景を移動させる */
.anchorHoverListWrapper:has(.anchorHoverListItem:hover) {
  .anchorHoverListBackground {
    top: anchor(top);
    scale: 1 1;
    transition:
      top 0.3s var(--ease-out-quart),
      scale 0.3s 0.15s var(--ease-out-quart);
  }
}
```

CSS Anchor Positioning APIは記事[『階層メニューやトーストUIが簡単に作れる新技術！　JavaScriptで利用するポップオーバーAPI』](https://ics.media/entry/230530/#4.-%E3%83%84%E3%83%BC%E3%83%AB%E3%83%81%E3%83%83%E3%83%97)にて詳しく紹介されていますので、ここでは割愛し、おおまかなコードの流れを説明します。

リストアイテムへホバーしたときにその要素をアンカーに指定します。アンカーが変化したことで背景がその要素へ移動します。このとき`top`プロパティに`transition`が指定されているのでアニメーションがかかります。また、ホバーアウトしているときは背景が消えていてほしいので、通常時は`scale: 1 0`で高さを0にし、一番上で待機しています。`:has(.anchorHoverListItem:hover)`でホバーを検知したら`scale`を`1 1`にしてもとの大きさに戻し、アンカーした要素の位置へ移動させます。このとき、`transition`プロパティの値を調整することでその場から出現しているように見せています。

ホバーアウト時の制御のために`:has()`を利用していますが、もし背景がホバーアウト時に戻る場所が定められているなら`:has()`なしでも可能です。

### 対応ブラウザ

Chrome・Edge 105（2022年8月）、Safari 15.4（2022年3月）、Firefox 121（2023年12月）以降のブラウザが`:has()`疑似クラスに対応しています。

▼:has()疑似クラスのブラウザ対応状況

![:has()疑似クラスのブラウザ対応状況](https://ics.media/entry/240808/images/240808_caniuse.png)

[:has() CSS relational pseudo-class | Can I use…](https://caniuse.com/css-has)

### まとめ

`:has()`疑似クラスは単に特定の要素を持っている親のセレクターに限らず、親子関係を超えたセレクターを記述できます。これにより、JavaScriptを使わずとも複雑な状態をCSSのみで制御できるようになります。`:has()`疑似クラスの応用幅は大きいです。`:has()`疑似クラスを使って、より豊かなCSSを書いてみてください。