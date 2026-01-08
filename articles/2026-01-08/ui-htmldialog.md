---
title: "モーダルUIをシンプルにできる！ 進化を続けるHTMLのdialog要素"
source: "https://ics.media/entry/250904/"
publishedDate: "2025-09-04"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

HTMLの`dialog`要素を利用すると、モーダルダイアログをシンプルに実装できます。`dialog`要素は、2022年頃から主要ブラウザで利用可能です。

モーダルとは、**表示している間は他の操作をできなくするUI**を指します。`dialog`要素の登場以前は、次のような制御を自前で用意する必要がありました。

-   画面の最前面にモーダルUIを表示
-   モーダルUIが表示されている間、ほかの操作を制限
-   モーダルUI開閉時に、フォーカス位置を調整

こうした複雑さについては記事『[HTMLでモーダルUIを作るときに気をつけたいこと](https://ics.media/entry/220620/)』でも解説しています。苦労してきたフロントエンドエンジニアは多いでしょう。

HTML標準の`dialog`要素を利用すれば、シンプルかつ一貫した方法でモーダルダイアログを扱えるようになります。本記事では、`dialog`要素の基本的な使い方を紹介します。

本記事で紹介すること：

-   `dialog`要素の基本的な使い方
-   `closedby`や`autofocus`などの便利な属性
-   CSSでスタイルを適用する例
-   JavaScript要らずで`dialog`を使う方法

### `dialog`要素の使い方

次の作例は、`dialog`要素によるモーダルダイアログです。ボタンのクリックでモーダルダイアログの表示を切り替えます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250901_dialog/plain/)
-   [コードを確認する](https://github.com/ics-creative/250901_dialog/blob/main/plain/index.html)

```
<button id="showDialog">モーダルダイアログを開く</button>

<dialog>
  <p>ダイアログボックスの説明文が入ります。</p>
  <button id="closeDialog">とじる</button>
</dialog>
```

```
const dialog = document.querySelector("dialog");

const showButton = document.querySelector("#showDialog");
showButton.addEventListener("click", () => {
  dialog.showModal(); // モーダルダイアログを開く
});

const closeButton = document.querySelector("#closeDialog");
closeButton.addEventListener("click", () => {
  dialog.close(); // モーダルダイアログを閉じる
});
```

モーダルダイアログを開くボタンが押下されると、ボタンの上に`dialog`要素が重なって表示されます。表示されている間は、モーダルダイアログを開くボタンは押下できません。

`dialog`要素は、標準で次の機能を提供します。

-   ダイアログボックスを画面の最前面に表示
-   `showModal()` / `close()`などの開閉用の関数
-   表示されている間はほかの操作を制限し、閉じたら制限を解除

`dialog`要素を利用することで、最小限のHTMLとJavaScriptだけで、モーダルダイアログを作成できます。ひととおりの動作を確認したところで、開き方や閉じ方など基本的な使い方を順番に見ていきます。

#### 開き方

`dialog`要素は、**デフォルトでは非表示**になっています。表示方法は次の3種類があります。

-   JavaScriptで`showModal()`メソッドを実行
-   JavaScriptで`show()`メソッドを実行
-   HTMLであらかじめ`open`属性を指定（ページが読み込まれたら`dialog`要素を表示）

3種類のうち、**`showModal()`メソッドのみが`dialog`要素をモーダルダイアログとして表示**します。`show()`メソッドまたは`open`属性で開くと、`dialog`要素は非モーダルとして表示されます。非モーダルとは、**画面に重ねて表示してもほかの操作を制限しないUI**を指します。

「`dialog`要素の使い方」の段落で紹介した作例では、`showModal()`メソッドを実行して`dialog`要素を表示しています。

```
const dialog = document.querySelector("dialog");

const showButton = document.querySelector("#showDialog");
showButton.addEventListener("click", () => {
  dialog.showModal(); // dialog要素を開く
});
```

#### 閉じ方

表示した`dialog`要素を閉じるには、次の方法が考えられます。

-   JavaScriptで`close()`メソッドを実行
-   JavaScriptで`requestClose()`メソッドを実行
-   ESCキーなど、ブラウザやOSが用意している閉じる操作

`dialog`要素を閉じたい場合には`close()`メソッドを実行します。次のコード例は、閉じるためのボタンを押下したら`close()`メソッドを実行します。

```
<dialog>
  <button>とじる</button>
</dialog>
```

```
const dialog = document.querySelector("dialog");

/* 表示する処理は省略 */

const button = document.querySelector("button");
button.addEventListener("click", () => {
  dialog.close(); // dialog要素を閉じる
})
```

なお、`close()`メソッドには文字列を引数として渡せて、`returnValue`というプロパティから参照できます。詳しい使い方は後述します。

#### 利用可能なイベント

`dialog`要素の主なイベントは、次の2種類です。

-   `close`：`dialog`要素が閉じられるときに発火
-   `cancel`：ダイアログを閉じる要求（ESC や戻る操作、`requestClose()`など）が発生したときに発火。`event.preventDefault()`で閉じるのを抑止可能。

2つのイベントは似ていますが、発火タイミングに違いがあることに注意してください。たとえば、`close()`メソッドで`dialog`要素が閉じられる場合は、`close`イベントのみ発火します。それに対して、ESCキーといった閉じる操作が行われた場合は、まず`cancel`イベントが発火され、キャンセルされなければ、その後`close`イベントが発火します。

また、`close`イベントの引数`event.target.returnValue`から、`close()`メソッドの引数を参照できます。押下されたボタンに応じて、閉じたあとの処理を切り替えたいときに役立ちます。次のコード例は、`dialog`要素にキャンセルと同意の2つのボタンを配置し、同意ボタンが押下されたときに追加の処理を行います。

```
<dialog>
  <button id="disagree">キャンセル</button>
  <button id="agree">同意する</button>
</dialog>
```

```
const dialog = document.querySelector("dialog");

// ⭐️closeイベントの追加
dialog.addEventListener("close", (event) => {
  if(event.target.returnValue === "agree") {
    // 同意するボタンが押下されたときの処理
  }
})

// キャンセルボタンが押下されたとき
const disagreeButton = document.querySelector("#disagree");
disagreeButton.addEventListener("click", () => {
  dialog.close("disagree"); // closeイベントに文字列 "disagree" を渡す
});

// 同意するボタンが押下されたとき
const agreeButton = document.querySelector("#agree"); 
agreeButton.addEventListener("click", () => {
  dialog.close("agree"); // closeイベントに文字列 "agree" を渡す
});
```

※`close()`メソッドに引数を渡さない場合や、ESCキーが押下されて`close`イベントが呼ばれる場合は、`returnValue`プロパティは空文字（`""`）を返します。

#### コラム：close()とrequestClose()メソッドの違い

`dialog`要素の`requestClose()`メソッドは、「`cancel`イベントを先に発火し、リスナーで抑止できる」閉じ方であり、`close()`メソッドとは性質が異なります。

たとえば、入力フォームを含むモーダルがあるとしましょう。モーダルを閉じる前に、REST APIをコールし、成功した場合にのみモーダルを閉じるといった使い方ができます（＝失敗した場合はモーダルを閉じず、入力フォームを維持したい場合）。

また`requestClose()`も`close()`と同様に引数で`returnValue`を設定できます。

`requestClose()`メソッドは、Chrome 134・Edge 134（2025年3月）、Safari 18.4（2025年3月）、Firefox 139（2025年5月）以降で利用可能です。

-   参照：[Can I use…](https://caniuse.com/wf-requestclose)

#### コラム：ほかの操作を制限する仕組み

`showModal()`メソッドで表示されるモーダルダイアログは、「Top layer」と呼ばれる特別な要素として表示されます。Top layerとして`dialog`要素が表示されると、ほかの要素はクリックもフォーカスもできなくなり、ユーザーはダイアログボックスの操作に集中できます。なお、要素がTop layerとして表示されているかどうかは、Chromeの開発者ツールから`Elements`パネルの`#top-layer`から確認できます。

![](https://ics.media/entry/250904/images/250904_toplayer.jpg)

Top layerの詳細は、MDNの以下のページを参考にしてください。

-   [Top layer (最上位レイヤー) - MDN](https://developer.mozilla.org/ja/docs/Glossary/Top_layer)

### command属性・commandfor属性

ここまでの説明では、JavaScriptを使っていました。しかし、`dialog`要素の`command`・`commandfor`属性を使うと**JavaScriptを利用せずにモーダルの開閉ができます**。

使い方は簡単で、次の3つの手順となります。

1.  `dialog`要素に`id`属性を指定。
2.  `commandfor`属性は操作したい`dialog`要素の`id`値を指定。
3.  `command`属性で命令を記載（`show-modal`と`close`等）。

```
<button command="show-modal" commandfor="my-dialog">モーダルダイアログをひらく</button>

<dialog id="my-dialog">
  <p>モーダルダイアログの説明文が入ります。</p>
  <button command="close" commandfor="my-dialog">とじる</button>
</dialog>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250901_dialog/plain-command/)
-   [コードを確認する](https://github.com/ics-creative/250901_dialog/blob/main/plain-command/index.html)

`command`属性には以下の値を指定します。いずれもJavaScriptの命令と同じものが使えます。

-   `show-modal`：モーダルとして開く（JSの`showModal()`と同じ役割）
-   `close`：閉じる（JSの`close()`と同じ役割）
-   `request-close`：閉じる要求を行う（JSの`requestClose()`と同じ役割）

#### 対応ブラウザ

`command`属性は、Chrome 135・Edge 135（2025年4月）、Safari 26.2（2025年12月）、Firefox 144（2025年10月）以降で利用可能です。

-   参照：[Can I use…](https://caniuse.com/wf-invoker-commands)

### `closedby`属性

`dialog`要素の便利なHTML属性として、`closedby`属性があり、**モーダルの閉じやすさを調整**できます。具体的には、ダイアログボックスの外側をクリックした際や、ESCキーを押下した際にモーダルを閉じるかどうかを制御できます。`closedby`属性で設定できる値は次の通りです。

-   `any`：ブラウザやOSの閉じる操作や、ダイアログボックスの外側を押下して閉じる（light dismissと呼ばれます）
-   `closerequest`：ブラウザやOSの閉じる操作で閉じる
-   `none`：標準操作には応答せず、`close()`メソッドでのみ閉じる（ESCキーでは閉じない）

なお、`closedby`属性が未指定の場合、ブラウザやOSの閉じる操作で閉じられます。次の作例では、`closedby`の各設定を動作確認できます。プルダウンメニューから`closedby`属性の値を変更できるので、試してみてください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250901_dialog/plain-closedby/)
-   [コードを確認する](https://github.com/ics-creative/250901_dialog/blob/main/plain-closedby/index.html)

#### 対応ブラウザ

`closedby`属性は、Chrome 134・Edge 134（2025年3月）、Firefox 141（2025年7月）で利用可能です。

-   参照：[Can I use…](https://caniuse.com/mdn-html_elements_dialog_closedby)

![](https://ics.media/entry/250904/images/250904_closedby_support.jpg)

### `autofocus`属性

`dialog`要素が表示されると**最初にフォーカス可能な子要素**にフォーカスが移動します。もしフォーカス対象の要素を変更したい場合は、`autofocus`属性を使います。

次の作例は、規約の同意を確認するモーダルダイアログです。キャンセルと同意の2つボタンがあり、同意ボタンに`autofocus`属性を指定しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250901_dialog/plain-autofocus/)
-   [コードを確認する](https://github.com/ics-creative/250901_dialog/blob/main/plain-autofocus/index.html)

```
<dialog>
  <p>規約に同意しますか？</p>
  <button>キャンセル</button>
  <button autofocus>同意する</button>
</dialog>
```

要素の標準の動作であれば、キャンセルボタンにフォーカスが移動しますが、作例は同意ボタンにフォーカスが移動することを確認できます。

#### 対応ブラウザ

`autofocus`属性は、Chrome 79・Edge 79（2020年1月）、Firefox 110（2023年2月）、macOS Safari 15.4（2022年3月）、iOS Safari 16.4（2023年3月）で利用可能です。

-   参照：[Can I use…](https://caniuse.com/mdn-html_global_attributes_autofocus)

※`open`属性で非モーダルダイアログの`<input autofocus />`をフォーカスした場合、2025年9月時点のiOS Safari 18.6では、仮想キーボードが表示されない仕様になっています。

### `dialog`要素にスタイルを適用する

モーダルダイアログを実装するときは、デザインにあわせて独自のスタイルを適用することが多いです。次の作例は、削除確認ダイアログを想定して`dialog`要素にスタイルを適用しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250901_dialog/styled/)
-   [コードを確認する（HTML）](https://github.com/ics-creative/250901_dialog/blob/main/styled/index.html)
-   [コードを確認する（CSS）](https://github.com/ics-creative/250901_dialog/blob/main/styled/dialog.css)

独自のスタイルを適用する際は、次のポイントを押さえておきましょう。

-   ダイアログボックスの外側に表示される半透明のオーバーレイは、`::backdrop`疑似要素でスタイルを調整。
-   開いた状態は、`dialog[open]`セレクターでスタイルを適用。
-   開閉時にアニメーションを設定する場合、`dialog`要素が非表示のときは `display: none`となるため、アニメーション用の初期スタイルを`@starting-style`で指定。

さらに応用すると次のようなデモもできます。[アンカーポジショニング](https://ics.media/entry/251215/)や[linear()関数](https://ics.media/entry/18730/#css%E3%81%AElinear\(\)%E9%96%A2%E6%95%B0%E3%81%A7%E8%87%AA%E7%94%B1%E3%81%AA%E5%8B%95%E3%81%8D%E3%82%92%E4%BD%9C%E3%82%8B)を使っています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250901_dialog/styled-animation/)
-   [コードを確認する](https://github.com/ics-creative/250901_dialog/tree/main/styled-animation)

#### コラム：背面がスクロールできる問題について

モーダルの一般的な実装として、モーダル表示中に背面にあるコンテンツをスクロールしないようにする制御が必要となることが多いです。改善策として、`dialog`要素を開いているときはルート要素のスクロールを`overflow`プロパティで抑制するといった方法が考えられます。

```
:root:has(dialog[open]) {
  overflow: hidden;
  scrollbar-gutter: stable;
}
```

※2025年9月時点では、上述したコードでもiOS Safari 18.6で完全に制御するのが難しいです。

### まとめ

モーダルUIを任意の`<div>`タグ等で自前実装しようとすると複雑な制御が必要になります。世の中には本来モーダルとして対処すべき点を未実装のまま公開しているウェブサイトも多々あります。

`dialog`要素を利用すれば、難しい制御も要りません。シンプルに確実にモーダルダイアログを実装できるので、まずは`dialog`要素を使ってモーダルを実装してみてはいかがでしょうか？

また、関連機能があり今後サポートされることが期待されます。

-   CloseWatcher API：ブラウザやOSの閉じる動作を制御する。ESCキーが押下されたら`dialog`要素を本当に閉じるかどうかを確認できる
    -   参考リンク：[Close Watcher API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CloseWatcher)