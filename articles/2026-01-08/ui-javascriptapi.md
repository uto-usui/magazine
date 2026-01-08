---
title: "階層メニューやトーストUIが簡単に作れる新技術！　JavaScriptで利用するポップオーバーAPI"
source: "https://ics.media/entry/230530/"
publishedDate: "2023-05-31"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

ポップオーバーとはコンテンツの1番上に重ねて表示するUIで、ユーザーにアクションを促したり、補足の情報などを伝えるために画面に表示します。[ポップオーバーAPIのMDNのドキュメント](https://developer.mozilla.org/ja/docs/Web/API/Popover_API)ではオーバーレイ、ポップアップ、ポップオーバー、ダイアログなどを総称して「ポップオーバー」と呼んでいます。

ウェブサイトでよく見かけるポップオーバーですが、実装するには意外と調整や考慮の多いUIです。たとえば、画面の1番上に重ねるためには`z-index`で他の要素との重なり順を調整する必要があります。`Esc`キーを押した時や要素外をクリックした時にポップオーバーを閉じるには、JavaScriptで制御を追加します。ポップオーバーが複数あった場合どうでしょう？　1つだけ表示するのか、すべて表示したままにするのか？　その場合は重なり順や閉じる挙動はどうなるのか？　など、少し考えただけでさまざまな課題が出てきます。

今回紹介するポップオーバーAPIは上記のような機能は標準で搭載されているため、簡単に最低限の機能を備えたポップオーバーを実装できます。この記事ではポップオーバーAPIを使ってどのようなことができるのか、作例を交えながら紹介します。

### ポップオーバーとモーダルの違い

APIの解説に入る前に、ポップオーバーとモーダルの違いについて確認しましょう。

ポップオーバーもモーダルもどちらも画面の1番上に重ねて表示するUIですが、決定的な違いは**表示している間に他の要素の操作を許すかどうか**です。モーダルは表示されている間スクロールや他の要素のクリックなどの操作はできません。それに対し、今回紹介する**ポップオーバーは表示されている間も他の要素を操作できるUI**です。

もし他の操作をブロックするモーダルを作成したい場合は、ポップオーバーAPIではなく`dialog`要素で作成すると良いでしょう。『[overscroll-behaviorがお手軽！モーダルUI等のスクロール連鎖を防ぐ待望のCSS](https://ics.media/entry/221024/)』で`dialog`要素を使ったモーダルの作り方を解説しているので、興味のある方はご確認ください。

### 1\. JavaScriptを使わないポップオーバー

ポップオーバーAPIを使うと、JavaScriptなしで以下のようなポップオーバーを作れます。

![JavaScriptを使わないポップオーバー](https://ics.media/entry/230530/images/230530_simple_popover.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230601_popover-api/01_popover/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230601_popover-api/blob/main/01_popover/index.html)

#### HTML属性を指定するだけで実装できる

このポップオーバーの実装方法はいたってシンプルです。

1.  ポップオーバー本体に`popover`属性を付与し、任意のidを与えます（`id="popover1"`など）。
2.  ポップオーバーの開閉を制御したいボタンに`popovertarget`属性を付与し、1で与えたidを指定します。

```
<!-- ▼ポップオーバーを制御するボタン -->
<button popovertarget="popover1">Popover 1</button>
<!-- ▼ポップオーバー本体 -->
<div id="popover1" popover class="popover-content">
  <p>JavaScriptを使わずに最低限の機能が実現できます。</p>
</div>

<!-- ▼ポップオーバーを制御するボタン -->
<button popovertarget="popover2">Popover 2</button>
<!-- ▼ポップオーバー本体 -->
<div id="popover2" popover class="popover-content">
  <p>2つめのポップオーバーを開くと、1つめは自動的に閉じます</p>
</div>
```

これだけでシンプルなポップオーバーの完成です。このように簡単に実装できるうえ、ポップオーバーAPIには便利な機能が標準で搭載されています。

#### ポップオーバーAPIに標準で搭載されている機能

**(1)最上位レイヤーに配置される**

このAPIを使ったポップオーバー本体はデフォルトで最上位レイヤーに配置されます。このレイヤーは特別で、他の要素の`z-index`の値などにかかわらず、必ず画面の1番上に表示されます。

**(2)簡単な解除が可能**

「ポップオーバーの外側をクリックする」もしくは「`Esc`キーを押す」ことで、ポップオーバーを閉じることができます。MDNのドキュメントではこれを「簡単な解除（light dismissed）」と呼んでいます。

**(3)複数のポップオーバーがあった場合は勝手に他を閉じてくれる**

通常、ポップオーバーは画面に1つだけ表示できます。そのため、2つのポップオーバーがあった場合に1つめを開いた状態で2つめを開くと、1つめを自動的に閉じてくれます。

「簡単な解除」と「ポップオーバーは画面に1つだけ」の挙動は変更できます。詳しくは2つめの作例で紹介します。

#### ポップオーバーにスタイルを適用する

ポップオーバーにスタイルを適用する際は、以下の疑似要素と疑似クラスを使います。

-   `:popover-open`： ポップオーバーが開いた状態を指す疑似クラス。
-   `::backdrop`： ポップオーバーの後ろに背景として配置される疑似要素。

```
/* ⭐️:popover-openを使って表示時のスタイルを適用 */
.popover-content:popover-open {
  width: 300px;
  height: 120px;
  border-radius: 8px;
  border: none;
  padding: 24px;
  box-shadow: 8px 8px 10px #707070;
  background: #ffffff;
}
/* ⭐️背景にスタイルを適用する場合は::backdropを使用する */
.popover-content::backdrop {
  background-color: #505050;
  opacity: 0.5;
}
```

### 2\. トースト

ユーザーに処理が完了したことやエラーを知らせるトーストをポップオーバーAPIで実装した例です。

![ポップオーバーAPIを使ったトースト](https://ics.media/entry/230530/images/230530_toast.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230601_popover-api/02_toast/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230601_popover-api/tree/main/02_toast)

#### ポップオーバーの表示/非表示を手動で切り替える

1つめの例ではHTMLに`popover`や`popovertarget`といった属性を指定することで、ポップオーバーの表示/非表示を実装しました。今回はJavaScriptを使用して手動で表示/非表示を切り替えてみます。

ここでポイントとなる点は以下の4つです。

1.  トーストとして作成した`div`要素の`popover`属性に`manual`を指定します。こうすることで「簡単な解除」と「画面にポップオーバーは1つだけ」の機能を持たないポップオーバーを作成できます。
2.  トーストを表示する際に`showPopover()`メソッドを使用します。このメソッドで表示すると最上位レイヤーに配置されます。
3.  トーストの非表示には`hidePopover()`メソッドを使用します。
4.  `hidePopover()`だけだとDOMに要素が残ったままなので、`remove()`メソッドでDOMから削除します。

以下は作例を一部抜粋したものです。このようにJavaScriptを使うとさらに柔軟な実装ができます。

```
const setupToast = ({ message, cssName }) => {
  // トーストをDOMに追加する
  const toast = createToastElm(message, cssName);
  document.body.appendChild(toast);
  // ⭐️showPopoverメソッドで表示する
  toast.showPopover();

  // -----省略-----
};

/**
 * トーストを作成します。
 * @param {string} message 表示するメッセージ
 * @param {string} cssName cssのクラス名
 * @return {HTMLDivElement} 作成したトーストエレメント
 */
const createToastElm = (message, cssName) => {
  const toast = document.createElement("div");
  // ⭐️popover属性に"manual"を指定する
  toast.popover = "manual";

  // -----省略-----

  // 閉じるボタン
  const closeButton = document.createElement("button");
  closeButton.addEventListener("click", () => removeToast(toast));
  toast.appendChild(closeButton);
  return toast;
};

/**
 * トーストを削除します。
 * @param {HTMLDivElement} toast 削除したいトースト
 */
const removeToast = (toast) => {
  // ⭐️hidePopoverメソッドで非表示にする
  toast.hidePopover();
  // ⭐️非表示にした後にDOMから削除する
  toast.remove();
};
```

#### toggleイベントの検知

この作例では、新しいトーストが作成された時と削除されたときに並び替えを行いアニメーションをつけています。一連の処理は以下のような流れになっています。

1.  トーストの表示/非表示を検知する
2.  アニメーションを行う
    -   表示（新しいトーストが作成された）時：1番下に新しいトーストをふわっと表示する
    -   非表示（トーストが削除された）時：全体をふわっと上に移動する

このトーストの表示/非表示を検知するために使っているのが`toggle`イベントです。

`toggle`イベントはポップオーバー要素独自のイベントで、表示または非表示になった直後に発行されます。このイベントに渡される`event`オブジェクトの`newState`の値を使ってさらにアニメーションを分岐させています。

```
// トーストの表示時と非表示時に並び替える
toast.addEventListener("toggle", (event) => {
  alignToast(event.newState === "closed");
});

// -----省略-----

const alignToast = (withMoveAnim) => {
  const toasts = document.querySelectorAll(".toast");
  // トーストを順番に縦に並べる
  // withMoveAnimがtrue：opacityとtranslateのアニメーション
  // withMoveAnimがfalse：opacityのアニメーション
  toasts.forEach((toast, index) => {
    toast.style.transition = withMoveAnim
      ? "translate 0.2s linear, opacity 0.2s linear"
      : "opacity 0.2s linear";
    toast.style.translate = `0px ${(56 + 10) * index}px`;
    toast.style.opacity = 1;
  });
};
```

`event.newState`の値が`closed`の時は、トーストが消えたので画面の残りのトーストを上に移動するアニメーションを行い、それ以外（`event.newState`の値は`open`になります）の場合はふわっと表示するアニメーションを行います。

アニメーション以外にも、トーストを表示した後3秒後に自動的に削除する実装も行なっています。興味がある方はソースコードを確認してみてください。

### 3\. 入れ子になったポップオーバー

入れ子になったメニューをポップオーバーAPIで実装した例です。ポップオーバーを入れ子にすることで「ポップオーバーは画面に1つだけ」の機能を持たずに作成できます。

![入れ子になったポップオーバー](https://ics.media/entry/230530/images/230530_nest.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230601_popover-api/03_nest/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230601_popover-api/tree/main/03_nest)

#### キーボードのフォーカスやマウスオーバーに対応する

トーストの作例とやっていることはほぼ変わりませんが、この例ではキーボードのフォーカスやマウスオーバーでメニューを開くようにしています。

`mouseenter`や`focusin`といったイベントを検知して制御します。`:popover-open`の状態によって、すでに開いている場合やすでに閉じている場合には処理を行わないよう`if`文で分岐しています。

```
const popoverContainers = document.querySelectorAll(".popover-container");
// -----省略-----

popoverContainers.forEach((container) => {
  // マウス操作の制御
  container.addEventListener("mouseenter", () => openPopoverOf(container));
  container.addEventListener("mouseleave", () => closePopoverOf(container));
  // キーボード操作の制御
  container.addEventListener("focusin", () => openPopoverOf(container));
  // -----省略-----
});

const openPopoverOf = (container) => {
  // containerから一番近いポップオーバーを取得する
  const popover = container.querySelector(".popover");
  if (popover == null) {
    return;
  }
  // まだ開いていない場合だけshowPopoverを呼ぶ
  if (!popover.matches(":popover-open")) {
    popover.showPopover();
  }
};

const closePopoverOf = (container) => {
  // containerから一番近いポップオーバーを取得する
  const popover = container.querySelector(".popover");
  if (popover == null) {
    return;
  }
  // まだ閉じていない場合だけhidePopoverを呼ぶ
  if (popover.matches(":popover-open")) {
    popover.hidePopover();
  }
};

// -----省略-----
```

### 4\. ツールチップ

最後に紹介するのは、ポップオーバーAPIを使用したツールチップです。

この作例ではツールチップの位置を制御するため『[CSS Anchor Positioning API](https://www.w3.org/TR/css-anchor-position-1/)』を使っています。この機能はChrome 125、Edge 125（2024年5月）、Safari 26.0（2025年9月）から利用可能です。ポップオーバーAPIと一緒に使うと便利なので紹介します。

![ツールチップ](https://ics.media/entry/230530/images/230530_tooltip.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230601_popover-api/04_tooltip/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230601_popover-api/tree/main/04_tooltip)

#### anchor属性でポップオーバーの親子関係を定義する

ポップオーバーAPIには`anchor`属性というものがあります（これは先ほど紹介したCSS Anchor Positioning APIとはまた別のものです）。`anchor`属性を設定すると、HTMLの構造的に入れ子にしなくてもポップオーバーの親子関係を定義できます。

1.  親としたい要素（この作例では`a`要素）にidを設定します。
2.  子に設定したいポップオーバー（この作例では`div`要素）の`anchor`属性に、1の`id`と同じ名前を設定します。

```
<div class="container">

  <h1>一、
    <!-- ⭐️親としたい要素にidを設定 -->
    <a href="#" id="afternoon">午后</a>
    の授業
  </h1>
  <p>「ではみなさんは、そういうふうに川だと云われたり...</p>

  <!-- 省略 -->

  <!-- ⭐️子にしたい要素のanchorに親のidを設定する -->
  <div class="tooltip" popover="manual" anchor="afternoon">午後のこと。</div>
</div>
```

`a`要素とポップオーバーである`div`要素はHTML構造としては入れ子になってはいませんが、このように`anchor`属性を用いることで「親子である」と紐づけることができます。

#### ポップオーバーの位置を指定する

ツールチップの位置をCSSで調整しましょう。ここでCSS Anchor Positioning APIが登場します。 先ほどのポップオーバーの親子関係の定義と似ていますが、まずは次の手順で基準となる要素とツールチップとの紐づけを行います。

1.  基準としたい要素（この作例では`a`要素）に`anchor-name`プロパティを設定して、値には一意になるような名前を入れます。ルールとして、たとえば`--anchor-el`といった形で先頭にダッシュを2つ付けます。
2.  ツールチップ要素（この作例では`div`要素）に`position-anchor`プロパティを設定して、`anchor-name`プロパティで設定したものと同じ値を入れます。

```
<div class="container">
  <h1>
    一、
    <!-- ⭐️基準としたい要素にanchor-nameプロパティを設定し、一意な名前を入れる -->
    <a href="#" id="afternoon" style="anchor-name: --afternoon">午后</a>
    の授業
  </h1>
  <p>「ではみなさんは、そういうふうに川だと云われたり...</p>

  <!-- 省略 -->

  <!-- ⭐️ツールチップ要素にposition-anchorプロパティを設定し、anchor-nameと同じ値を入れる -->
  <div
    class="tooltip"
    popover="manual"
    anchor="afternoon"
    style="position-anchor: --afternoon"
  >
    午後のこと。
  </div>
</div>
```

続いて、`position-area`プロパティでツールチップの表示位置を調整します。`a`要素に対して、どの位置にツールチップを表示するか指定できます。今回はツールチップを`a`要素の左上に出したいので、`span-right top`を指定します。

また、`position-area`の値による表示場所の変化は以下のサイトがわかりやすいので、ぜひ参考ください。

-   [Anchor position tool](https://anchor-tool.com/)

さらに、ポップオーバーに付いているブラウザのデフォルトスタイルにより、ツールチップの位置がずれてしまうことがあります。その場合は、`margin`プロパティは`0`を指定して初期値にリセットします。今回は`margin-bottom`のみ、レイアウトに必要なため`4px`を指定しています。

```
.tooltip {
  position-area: span-right top;
  margin: 0 0 4px;
  /* -----省略----- */
}
```

このように記述することで、`a`要素の左上にツールチップを配置することができました。CSS Anchor Positioning APIで配置を行うと、ウィンドウサイズを変更してもブラウザ側で勝手にツールチップの位置を変更してくれます。

![ツールチップ](https://ics.media/entry/230530/images/230530_tooltip_res.gif)

### 対応ブラウザ

ポップオーバーAPIはChrome・Edge 114（2023年5月）、Safari 17.0（2023年9月）、Firefox 125（2024年4月）以降で対応しています。

-   参照：[Can I use…](https://caniuse.com/mdn-api_htmlelement_popover)

![ポップオーバーAPIの各ブラウザの対応状況](https://ics.media/entry/230530/images/240501_caniuse.png)

### まとめ

ここまでポップオーバーAPIについて紹介しました。今まで自分で複雑な実装を行っていたUIも、このような新しいAPIを使うことで簡単に記述できるようになります。新しい機能にキャッチアップするのは大変でもありますが、今までできなかったことができるようになるのはワクワクしませんか？　ぜひ皆さんも実際に使ってみてください！

続編として『[ツールチップの実装に役立つ！ HTMLの新属性popover="hint"の使い方](https://ics.media/entry/250417/)』では`popover="hint"`属性を紹介しています。こちらもぜひあわせてご確認ください。

### 参考サイト

-   [ポップオーバー API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Popover_API)
-   [CSSアンカーポジショニングAPIのご紹介 | Blog | Chrome for Developers](https://developer.chrome.com/blog/anchor-positioning-api?hl=ja)