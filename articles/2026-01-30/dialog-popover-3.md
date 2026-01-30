---
title: "Dialog と Popover #3"
source: "https://blog.jxck.io/entries/2024-09-27/dialog.html"
publishedDate: "2024-09-27"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [各要素の使用](#各要素の使用)

### [`open` 属性](#open-属性)

`<dialog>` は、デフォルトでは不可視 (`display: none`) な要素となっている。`open` 属性が付くと表示される。

```
<dialog open>
  <div>
    <h1>Hello Dialog</h1>
  </div>
</dialog>
```

![dialog を open 属性で開く](https://blog.jxck.io/entries/2024-09-27/1.show.drawio.svg?240928_041512)

### [`show()`/`showModal()`](#showshowmodal)

基本的に `<dialog>` は動的に表示されるため、JS で開くことになるだろう。しかし、`open` 属性を動的に付けるのではなく、`show()`/`showModal()` を用いるのが基本だ。

```
document.querySelector("button.show").addEventListener("click", (e) => {
  document.querySelector("dialog").show()
})

document.querySelector("button.showModal").addEventListener("click", (e) => {
  document.querySelector("dialog").showModal()
})
```

まず `show()` を呼ぶと、先ほど述べた `<dialog open>` の状態になり、Dialog が開く。

これは単に non-Modal な Dialog が open しているだけなので、後ろにあるテキストの選択や、ボタンクリックといった操作は引き続き可能だ。また、この時別の `<dialog>` を `show()` しても同時に表示できる。これは、全く排他的な操作がされていないことを意味する。

Accessibility Tree を確認すると Role が `dialog` になっていることが確認できるだろう。

  ![Accessibility Tree 上は role: dialog, modal: false になっている](https://blog.jxck.io/entries/2024-09-27/2.a11y-tree.png?240928_041512)

これを、`showModal()` で開くとこうなる。

![showModal() で Modal Dialog を開く](https://blog.jxck.io/entries/2024-09-27/3.showModal.drawio.svg?240928_041512)

背景が薄くグレーになるのは、`::backdrop` のデフォルト CSS が当たっているからだ。

  ![Chrome の backdrop デフォルトスタイル](https://blog.jxck.io/entries/2024-09-27/4.default-style.png?240928_041512)

non-Modal と異なり、Modal は同時に 1 つしか開けない。

Accessibility Tree を確認すれば、`aria-modal: true` になっていることがわかる。

  ![Accessibility Tree 上は role: dialog, modal: true になっている](https://blog.jxck.io/entries/2024-09-27/5.a11y-tree.png?240928_041512)

### [Submit](#submit)

閉じるための UI は、JS を書かなくても HTML だけで実装可能だ。

```
<dialog open>
  <div>
    <h1>Hello Dialog</h1>
    <form method="dialog">
      <button type="submit">Accept</button>
      <button type="submit">Deny</button>
    </form>
  </div>
</dialog>
```

このように `<form method=dialog>` を `<dialog>` の中に書くと、その submit は Dialog を完了したことになり、Dialog を閉じる。これにより、ユーザに何かを確認させ、インタラクションを求めるユースケースを実装できる。

この時、`<button value>` の値は、JS から `returnValue` で取れるため、ボタンによる分岐が可能になる。

```
<dialog open>
  <div>
    <h1>Hello Dialog</h1>
    <form method="dialog">
      <button type="submit" value="accept">Accept</button>
      <button type="submit" value="deny">Deny</button>
    </form>
  </div>
</dialog>
<script>
document.querySelector("dialog").addEventListener("close", (e) => {
  console.log(e.target.returnValue) // "accept" / "deny"
})

document.querySelector("dialog").addEventListener("cancel", (e) => {
  console.log(e.target.returnValue) // ESC などで閉じた場合
})
</script>
```

`"cancel"` イベントは、Modal Dialog を ESC で閉じるといった操作で、`"cancel"` -> `"close"` の順で発火する。

### [`close()` と `returnValue`](#close-と-returnvalue)

この `<form>` に `<input>` などを置いても、その `value` は `returnValue` には渡らない。任意の値を渡す場合は、`close()` の引数に明示的に渡す必要がある。

```
<dialog>
  <div>
    <h1>Hello Dialog</h1>
    <form method="dialog">
      <input type="text" name="text" value="text" autofocus>
      <input type="hidden" name="hidden" value="hidden">
      <button type="submit" value="accept">Accept</button>
      <button type="button" value="deny">Deny</button>
    </form>
  </div>
</dialog>
<script>
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  // 文字列しか渡せないのでシリアライズ
  const params = new URLSearchParams(data)
  document.querySelector("dialog").close(params)
})

document.querySelector("dialog").addEventListener("close", (e) => {
  console.log(e.type, e.target.returnValue) // text=text&hidden=hidden
})
</script>
```

「閉じる」だけではなく「開く」方も JS なしでできるが、それについては話がかなり広がるので別の回で解説する。

### [formmethod=dialog](#formmethoddialog)

例えば Modal で Login Form などを出す場合を考えてみよう。

```
<dialog>
  <form method="POST" action="/sessions/new">
    <label for=username>username:</label>
    <input id=username type=text name=username>
    <label for=password>password:</label>
    <input id=password type=password name=password>
    <button type=submit>Login</button>
    <button value="cancel" formmethod="dialog">Cancel</button>
  </form>
</dialog>
```

この Form は、アカウントを入力し Login ボタンを押せば、そのまま Form を submit して POST でリクエストが飛び、画面を遷移することになる。

しかし、Cancel ボタンの方は `formmethod` 属性を用いて `form[method]` を `POST` から `dialog` に上書きしている。つまり、このボタンを押した場合は、`<dialog>` が普通に閉じて、`returnValue` に `"cancel"` が返るのだ。

このように、「キャンセル時は `<dialog>` を閉じるだけ」という分岐を実装することも可能だ。

### [aria-label / aria-labelledby](#aria-label--aria-labelledby)

WAI-ARIA では `role=dialog` に対して、`aria-label` / `aria-labelledby` を使ってアクセシブルな名前を割り当てることが推奨されている。

-   Accessible Rich Internet Applications (WAI-ARIA) 1.3
    -   [https://w3c.github.io/aria/#dialog](https://w3c.github.io/aria/#dialog)

```
<dialog aria-labelledby="dialog_name">
  <div>
    <h1 id="dialog_name">Hello Dialog</h1>
    <form method="dialog">
      <button type="submit">Confirm</button>
    </form>
  </div>
</dialog>
```

### [フォーカスの確認](#フォーカスの確認)

次は、それぞれのフォーカスの挙動を確認しよう。non-Modal ではフォーカストラップされないので、Modal に注目する。

開くボタンにフォーカスを移し、キーボードで Modal を開くと違いがわかりやすい。

共通しているのは以下だ。

-   開くための `<button>` にフォーカスし Enter で開いたら、フォーカスが `<dialog>` 内の要素に移る。
-   `<dialog>` の `<button>` で閉じたら、開いた時の `<button>` にフォーカスが戻る。

これにより、`<dialog>` を開いてもフォーカスが移らなかったり、閉じたらフォーカスが迷子になるといった事態を避けられる。

また、Modal の場合は Modal 以外の DOM にフォーカスが移動することはない。これにより、Modal を開いた状態で、想定していない別操作を行えてしまうといったことはなくなる。

しかし、ブラウザ UI (URL Bar や Bookmark など)側には出ていくことができる(できないと、行き詰まる可能性がある)ため、その点は慣れが必要かもしれない。

なお、`<dialog>` 内に `autofocus` な要素があればそこにフォーカスが移るが、これがない場合、デフォルトでどこにフォーカスを移すのかは非常に重要で、前回解説したように仕様でどうするかも結構揉めた。

そして、仕様ではデフォルトの挙動を整理しつつも、前提として「どこにフォーカスすべきかを `autofocus` で指定するのが推奨」となった。

```
<dialog>
  <div>
    <h1>Hello Dialog</h1>
    <form method="dialog">
      <button autofocus type="submit">Confirm</button>
    </form>
  </div>
</dialog>
```

現状では、`<dialog>` 自身がフォーカスを得るかどうかなどについて実装に差異があるので、明示的な指定を忘れると、フォーカス移動の回数などによって操作を覚えているユーザにとっては不便となり得る。

ただし、最初のコントローラに `autofocus` を置くと、その手前のテキストがスキップされるため、必ず最初のコントローラに `autofocus` すれば良いとは限らない点には注意したい。

### [Scrollable](#scrollable)

Dialog のユースケースの 1 つとして、「規約への同意」を求める UI がある。

規約は基本的に長文になるため、そのまま `<dialog>` にレンダリングすると、`<dialog>` 自体がスクロール可能になってしまう。

```
<dialog style="height: 100px;">
  <section>
    <p>めっちゃ</p>
    <p>長い</p>
    <p>規約</p>
    <p>...</p>
    <p>...</p>
    <p>...</p>
  </section>
  <form method="dialog">
    <button type="submit" value="agree">Agree</button>
    <button type="submit" value="disagree">Disagree</button>
  </form>
</dialog>
```

しかし、`<dialog>` 自体がスクロール可能になることは、下部にあるコントローラまでの到達を困難にするなど、様々な不便があるため、仕様では「`<dialog>` 自体を Scrollable にするのは避けるべき」とされている。

代わりに、規約を別ページにしリンクを貼る、PDF でダウンロードさせるなども考えられるが、最も簡単なのは規約のみを Scrollable なコンテナに入れる方法だ。以下の場合は、`<section>` が Scrollable になっている。

```
<dialog style="height: 100px;">
  <section style="overflow: auto; height: 60px;" autofocus>
    <p>めっちゃ</p>
    <p>長い</p>
    <p>規約</p>
  </section>
  <form method="dialog">
    <button type="submit" value="agree">Agree</button>
    <button type="submit" value="disagree">Disagree</button>
  </form>
</dialog>
```

  ![scrollable section](https://blog.jxck.io/entries/2024-09-27/6.scrollable-section.png?240928_041512)

注意点として、もしこのスクロールする `<section>` の手前に別のコントローラがあった場合を考えよう。

```
<dialog style="height: 80vh;">
  <!-- snip -->
  <button autofocus>Controller 1</button>

  <section style="overflow: auto; height: 60vh;">
    <p>めっちゃ</p>
    <p>長い</p>
    <p>規約</p>
  </section>

  <button>Controller 2</button>
  <!-- snip -->
</dialog>
```

この場合、従来は "Controller 1" で Tab 移動すると "Controller 2" にフォーカスが移り、キーボードだけで規約を読むことができなかったため、明示的に `tabindex=0` を付与する必要があった。

しかし、このような場面での不便を解消するために、「スクロール可能な要素は、デフォルトでフォーカス可能にする」という仕様が標準化され、実装が進められていた。

-   Keyboard focusable scrollers  |  Blog  |  Chrome for Developers
    -   [https://developer.chrome.com/blog/keyboard-focusable-scrollers](https://developer.chrome.com/blog/keyboard-focusable-scrollers)

既に Firefox は実装済みで、Chrome は M130 から Ship される。しかし、Safari は実装上の困難さとパフォーマンスを理由にネガティブな態度を表明している。

-   190870 - Make scrollable element focusable
    -   [https://bugs.webkit.org/show\_bug.cgi?id=190870](https://bugs.webkit.org/show_bug.cgi?id=190870)

したがって、しばらくは `tabindex=0` を明示的に付与した実装をすべきだろう。

```
<dialog style="height: 80vh;">
  <!-- snip -->
  <button autofocus>Controller 1</button>

  <div style="overflow: auto; height: 60vh;" tabindex="0">
    <p>めっちゃ</p>
    <p>長い</p>
    <p>規約</p>
  </div>

  <button>Controller 2</button>
  <!-- snip -->
</dialog>
```

-   dialog initial focus, a proposal · whatwg/html Wiki
    -   [https://github.com/whatwg/html/wiki/dialog--initial-focus,-a-proposal](https://github.com/whatwg/html/wiki/dialog--initial-focus,-a-proposal)

### [Close と returnValue](#close-と-returnvalue_1)

Dialog を閉じる場合、先のように `<form>` を使わずに JS で `close()` を呼んで閉じることもできる。なお「`open` 属性を消す」では、Modal は「消える(hidden)」が「閉じる(close)」の意味にはならない(`close` イベントも発火しない)ので、JS の場合は必ず `close()` を使って閉じるべきだ。

Dialog を閉じるとき、ユーザが何かしらのインタラクションを行った結果(同意結果や選択結果)は、`dialog.close()` に渡した文字列がそのまま取得できる。

```
dialog.close("accept")
dialog.returnValue // "accept"
```

`<form>` を使った場合に submit された結果もここから取得できる。

### [backdrop をクリックしたら閉じる](#backdrop-をクリックしたら閉じる)

Dialog の要件としてよくある「背景(backdrop)をクリックしたら閉じる(キャンセル)」というユースケースの実装を考える。

まず前提として、Modal の場合は「backdrop 含め、どこをクリックしても `<dialog>` がクリックされたことになる」という性質がある。

```
dialog.addEventListener('click', (e) => {
  // 画面のどこをクリックしても発火
  console.log(e.target) // dialog
})
```

![Modal は画面のどこをクリックしても dialog 要素で発火する](https://blog.jxck.io/entries/2024-09-27/7.backdrop-click.drawio.svg?240928_041512)

そこで、`<dialog>` を `padding: 0` にし、直下の `<div>` が `<dialog>` の内側いっぱいに表示されている状態にする。以下では、赤い `<div>` が `<dialog>` いっぱいに被さっている形だ。

```
<style>
  dialog {
    padding: 0;
    div {
      padding: 1rem;
      background-color: red;
    }
  }
</style>
<dialog>
  <div>
    <h1>Hello Dialog</h1>
    <form method="dialog">
      <button autofocus type="submit" value="confirm">Confirm</button>
      <button type="cancel" value="cancel">Cancel</button>
    </form>
  </div>
</dialog>
```

この状態で `showModal()` した場合、Dialog の領域をクリックしても `<dialog>` より先に `<div>` で Click Event が発火する。

これを利用すると、backdrop 領域をクリックしたら `target`/`currentTarget` が `<dialog>` だが、Dialog の中をクリックした場合は `target` が `<div>` になるため、これで分岐が可能になる。

```
document.querySelector('dialog').addEventListener('click', (e) => {
  // dialog 背景含めて全体がフック対象
  const { target, currentTarget } = e
  if (target === currentTarget) {
    // 両方 dialog 自身なのは backdrop のみになる
    document.querySelector('dialog').close()
  }
})
```

この要件だけでなく、Popover 相当の Light Dismiss 相当を必要とする場合は、`<dialog>` を `popover` することも可能だ。それについては後述する。

### [キーボード操作](#キーボード操作)

`<button>` を置く以外に、キーボード操作の対応もネイティブで行われている。これは、Cancel や Close を意味する操作を自動でフックする Close Watcher を内部で使うことで実現している。

non-Modal Dialog の場合は、他の要素が操作できるためキーボードには反応しないが、Modal Dialog は Close Watcher が効いているため、ESC や端末固有の操作を紐づけて閉じたりができる。

なお、Modal Dialog を ESC で閉じると、`cancel` -> `close` の順でイベントが発火する。