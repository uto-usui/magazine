---
title: "fetchのキャンセルだけじゃない！　AbortSignalで実現するクリーンなJS非同期処理"
source: "https://ics.media/entry/260423/"
publishedDate: "2026-04-22"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

イベント監視やリクエストのクリーンアップはウェブ開発で軽視されがちな処理のひとつです。一般にフロントエンドではページを閉じれば全てブラウザーが後片付けをしてくれるので、こうした処理はもれやすく、気づいていても対処されないこともままあります。しかし、長時間操作しても不整合を起こさずに軽快な操作性を維持したり、サーバーの負荷を軽減したりするためには、クリーンアップを正しく行う知識が不可欠です。

JavaScriptには`AbortSignal`と`AbortController`という仕組みがあり、処理の中断や監視の解除といったクリーンアップの処理を統一的に行えます。`AbortSignal`は元々`Fetch API`の処理を中断する方法の議論から生まれたものですが、ウェブ開発のさまざまな場面で使える汎用的な仕組みとして整備されてきました。基本機能はBaseline Widely availableで、主要ブラウザーすべてで安心して使えます。

この記事では`AbortSignal`の基本的な使い方をおさらいした上で、実務で役立つ活用パターンを紹介します。

### AbortSignalでできること

`AbortSignal`は一言でいえば「非同期処理にキャンセルを伝えるための仕組み」です。たとえば`fetch()`関数でAPIを呼び出す場合を考えてみましょう。

```
// 長時間かかるAPIを呼び出す
// 待っている間に不要になっても処理は継続される
const response = await fetch("/api/long-running-task");
```

呼び出し自体は簡単にできますが、待っている間にこのリクエストが不要になってもキャンセルする術がありません。キャンセルしなくても大きな問題にならないことも多いですが、無駄な処理は避けたいところです。このような場面で、非同期処理に「もういらないからキャンセルして」と伝えることができるのが`AbortSignal`です。

`AbortSignal`を使う手順は以下の通りです。

1.  `AbortController`を作成する
2.  `AbortController`から`signal`プロパティを取得してキャンセルしたい非同期処理に渡す
3.  キャンセルを実行するときは1で作成した`AbortController`の`abort()`メソッドを呼ぶ

![AbortControllerとAbortSignalの関係のイメージ図](https://ics.media/entry/260423/images/260423_abort_conceptual.png)

ポイントは、**ひとつの`signal`を複数の非同期処理で共有できる**ことです。「このボタンが押されたら、進行中のAPI呼び出しと、一時的に登録したイベントリスナーと、自作のアニメーション処理をまとめて全部止める」といった操作がスッキリ書けるようになります。

### 基本的な使い方：`fetch`のキャンセル

まずは定番の`fetch()`関数で具体的な使い方を見てみましょう。

```
// AbortControllerを作成（リクエストごとに作る）
const controller = new AbortController();
const { signal } = controller;

// fetchにsignalを渡す
fetch("/api/data", { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (signal.aborted) {
      console.log("キャンセルされました");
    }
  });

// どこか別の場所からキャンセル
controller.abort();
```

基本は`AbortController`のインスタンスを作って`fetch()`関数に`signal`オブジェクトを渡すだけです。コントローラーの`abort()`メソッドが呼ばれると`fetch()`関数が`AbortError`で`reject`されます。`reject`によって**そのままではエラー扱いとなる**点に注意しましょう。キャンセルは正常系として扱いたいことも多いでしょうから、その場合は`signal.aborted`プロパティを参照してエラー処理と区別します。

**`controller`は一度`abort()`メソッドでキャンセルしたら元の状態（未キャンセル状態）には戻りません**。リクエストごとに`new AbortController()`で新しいインスタンスを作成する点に注意しましょう。

### AbortSignalが使える場所

`AbortSignal`は`fetch`専用の機能ではありません。ブラウザーの非同期APIのいくつかは`signal`オプションをサポートしています。とくに覚えておきたいのが`addEventListener`です。

`addEventListener()`関数には第3引数のオプションに`signal`を渡せます。`signal`がabortされるとリスナーが自動で外れます。`removeEventListener()`関数で外すときに必要だった「登録時と同じ関数参照」を保持しておく必要がなくなり、匿名関数のままで後から解除できます。

▼ AbortSignalを使う場合

```
const controller = new AbortController();
const { signal } = controller;

window.addEventListener(
  "resize",
  () => console.log("リサイズ"),
  { signal }
);

// これでリスナーが外れる
controller.abort();
```

▼ AbortSignalを使わない場合

```
// removeEventListenerに指定するため、ハンドラー関数を変数に保持
const onResize = () => console.log("リサイズ");

window.addEventListener("resize", onResize);

// これでリスナーが外れる
window.removeEventListener("resize", onResize);
```

このほかにも`AbortSignal`が使える場所はあります。ストリームの読み書き、`navigator.locks`（Web Locks API）、`ReadableStream`、Node.jsの各種API……と対応は広がっています。利用する機会は少ないので覚える必要はありませんが、「非同期処理のキャンセルといえば`AbortSignal`」とだけ覚えておくと、いざという時に迷うことがなくなります。

### コラム：なぜ`fetch`自体にキャンセルメソッドを用意しなかったのか？

`signal`オプションを使う方法は、ただ`fetch`を中断するだけにしてはちょっとまわりくどいと感じるかもしれません。たとえば以下のようにしてキャンセルできたら簡単ですね。

```
// 注意：これは実際に動作するコードではありません

const request = fetch("/api/data");

// 3秒後にタイムアウト
setTimeout(() => {
  request.abort();
}, 3000);

// リクエストを待つ
const result = await request.promise;
```

実際に現在の仕様に落ち着くまでは、[WHATWGの`fetch`仕様の議論](https://github.com/whatwg/fetch/issues/27)や[TC39のCancelable Promises Proposal](https://github.com/tc39/proposal-cancelable-promises/)など複数の場所でかなりの長期間にわたる議論が行われ、上記のイメージに近い案も存在しました。

しかし、既存の`fetch`の挙動を大きく変えることなく、かつ`fetch`以外のWeb APIにも展開できる汎用的な仕組みを探った結果、`AbortSignal`と`AbortController`の採用が妥当と判断されたようです。

次からは実際に`AbortSignal`を使った活用例をみていきましょう。

### 活用例1：次のリクエストを送る前に先行処理をキャンセルする

タブUIや検索ボックスのインクリメンタルサーチなど、ユーザーの操作に応じてAPIを呼ぶケースを考えてみましょう。

ユーザーが高速にタブを切り替えると、取得が完了する前に次のリクエストが飛びます。何も対策しないと、次のような問題が発生します。

-   サーバーに無駄な負荷をかける
-   リクエストがキューイングされる場合、処理が詰まって応答がなかなか返ってこなくなる
-   **古いリクエストの応答が後発リクエストの応答の後に戻ってきて、画面が古い内容で上書きされる**（レースコンディション）

以下のコードは何も対策しない場合の例です。

```
// タブの内容を表示する要素
const tabBodyElement = document.getElementById("tab-body");

// タブを切り替える関数
const changeTab = async tabId => {
  tabBodyElement.textContent = "Loading...";
  const response = await fetch(`/contents/${tabId}`);
  tabBodyElement.textContent = await response.text();
};
```

ユーザーがタブを高速に切り替えたり、サーバーの応答速度にムラがあると、リクエストの「追い越し」が発生してタブと内容が一致しなくなることがあります。これがレースコンディションの例です。

![レースコンディションのイメージ図](https://ics.media/entry/260423/images/260423_request_race.png)

取得が終わるまで画面をブロックすれば問題は起きませんが、ユーザーの操作感は損なわれます。`AbortSignal`を使えば、ブロックせずに問題を回避できます。

```
// タブの内容を表示する要素
const tabBodyElement = document.getElementById("tab-body");
// 現在のリクエストを管理するAbortController
let currentController = null;

const changeTab = async tabId => {
  // 前のリクエストがあればキャンセル
  currentController?.abort();
  currentController = new AbortController();
  const { signal } = currentController;

  try {
    tabBodyElement.textContent = "Loading...";
    const response = await fetch(`/contents/${tabId}`, {
      signal
    });
    tabBodyElement.textContent = await response.text();
  } catch (err) {
    // signalのabort由来のエラーでなければ再throw
    // abortされたケースは無視（古いリクエストを止めただけなので対応不要）
    if (!signal.aborted) throw err;
  }
};
```

古いリクエストは次の操作が来た時点で打ち切られるので、応答が返ってくることはありません。

#### タイムアウトや手動のキャンセルと組み合わせる：`AbortSignal.timeout()`と`AbortSignal.any()`

`fetch`を中断したくなる理由が連続操作だけとは限りません。たとえば「一定時間応答がない場合はタイムアウトする」「キャンセルボタンを押したら中断する」といった場合です。このような場面では、`AbortSignal.any()`と`AbortSignal.timeout()`を組み合わせて使うことができます。

`AbortSignal.any()`は複数の`signal`を束ねる関数です。引数として渡した`signal`のうちどれかひとつがabortされると、束ねた`signal`もabortされます。`AbortSignal.timeout()`は指定時間が経過するとabortする`signal`を返すユーティリティです。

```
// 現在のリクエストを管理するAbortController
let currentController = null;

const changeTab = async (tabId, { signal }) => {
  // 前のリクエストがあればキャンセル
  currentController?.abort();
  currentController = new AbortController();

  // 複数のsignalを束ねる
  // いずれかがabortされたら全体もabortになる
  const combined = AbortSignal.any([
    // このリクエストのsignal = 次回呼び出し時にキャンセル
    currentController.signal,
    // 呼び出し側から指定されたsignal
    signal,
    // 5秒でタイムアウトするsignal
    AbortSignal.timeout(5000)
  ]);

  try {
    const response = await fetch(`/contents/${tabId}`, {
      signal: combined
    });
  } catch (err) {
    if (!combined.aborted) throw err;
    // ...以下略
  }
};
```

呼び出し側のコードは次のようになります。

```
// キャンセル用のAbortController
const cancelController = new AbortController();

// signalを渡してリクエスト
changeTab("tab-1", { signal: cancelController.signal });

// キャンセルボタンを押したらabort
const cancelButton = document.getElementById(
  "cancel-button"
);
cancelButton.addEventListener("click", () => {
  cancelController.abort();
});
```

キャンセルの理由やタイミングに関わらず、`fetch()`関数には結合したひとつの`signal`を渡すだけです。

### 活用例2：コンポーネントのアンマウント時にまとめて片付ける

ReactやVue.jsのコンポーネントでは、マウント時に登録したイベントリスナーや進行中の`fetch`を、アンマウント時にきちんと片付ける必要があります。

`AbortSignal`を使えば、コンポーネント単位で1つの`controller`オブジェクトを持ち、アンマウント時にまとめて`abort`するだけで済みます。

▼ Reactの例

```
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  // イベントリスナーもfetchも同じsignalで
  window.addEventListener("resize", onResize, { signal });
  window.addEventListener("scroll", onScroll, { signal });
  document.addEventListener("keydown", onKey, { signal });

  fetch("/api/data", { signal })
    .then((res) => res.json())
    .then(setData)
    .catch((err) => {
      if (!signal.aborted) console.error(err);
    });

  // アンマウント時にすべてまとめて片付ける
  return () => controller.abort();
}, []);
```

イベントリスナーがいくつあっても、クリーンアップ関数は`controller.abort()`メソッドの1つだけで済みます。`removeEventListener()`関数の呼び忘れや、イベントハンドラー関数の参照ズレによるリスナーの外し漏れも起きません。

Vue.jsの`<script setup>`でも同様に、`onMounted`と`onBeforeUnmount`の組で`AbortController`を使えば同じパターンが使えます。コンポーネントのライフサイクルと`AbortSignal`のライフサイクルを1対1で紐付けるのがコツです。

### 活用例3：オリジナルのAbortableな機能を作る

`AbortSignal`は自作の関数にも組み込めます。例として、画像の読み込みをabort可能（abortable）にする関数を作ってみましょう。画像をJavaScriptで読み込む際に`new Image()`で`img`要素を作成し、`src`属性にURLを設定する方法は定番です。しかし、この方法では`fetch`と異なり読み込みを中断できません。`AbortSignal`を使って`abort`できるようにしてみましょう。

```
/**
 * 画像を読み込んで返します
 * @param {string} src - 画像のURL
 * @param {AbortSignal} signal - 中断用のsignal
 * @returns {Promise<HTMLImageElement>} 画像のPromise。読み込みが完了するとimgをresolveします。
 */
const loadImage = (src, { signal } = {}) => {
  return new Promise((resolve, reject) => {
    // 既にabort済みなら即reject
    signal?.throwIfAborted();

    const img = new Image();
    const listenerController = new AbortController();
    const listenerSignal = listenerController.signal;

    // 読み込み完了時
    const onLoad = () => {
      listenerController.abort();
      resolve(img);
    };

    // 読み込み失敗時
    const onError = () => {
      listenerController.abort();
      reject(new Error("load error"));
    };

    // 引数で渡されたsignalがabortされた時
    const onAbort = () => {
      listenerController.abort();
      img.src = ""; // 読み込みを打ち切る
      reject(
        signal?.reason ??
          new DOMException("Aborted", "AbortError")
      );
    };

    // 引数で渡されたsignalのabortを監視
    signal?.addEventListener("abort", onAbort, {
      signal: listenerSignal
    });

    // 画像を読み込み開始
    img.addEventListener("load", onLoad, {
      signal: listenerSignal
    });
    img.addEventListener("error", onError, {
      signal: listenerSignal
    });
    img.src = src;
  });
};
```

呼び出し側は標準APIと同じ感覚で使えます。

```
const controller = new AbortController();
const signal = controller.signal;
// fetchと同様にsignalを渡してキャンセル可能
const img = await loadImage("image.jpg", { signal });

// どこか別の場所からキャンセル
controller.abort();
```

#### Abortableにできると何が嬉しいか

自作の関数をAbortableにする最大のメリットは、**標準APIと同じ`signal`で一緒に片付けられる**ことです。

先ほどのReactコンポーネントの例を思い出してください。`controller.abort()`の1行で、`addEventListener`も`fetch`もまとめてキャンセルできました。自作関数も`signal`を受け取る形にしておけば、この輪の中に入れられます。

```
const controller = new AbortController();
const { signal } = controller;

window.addEventListener("resize", onResize, { signal });
fetch("/api/data", { signal });
loadImage("hero.jpg", { signal }); // 自作関数も同じsignalで

// 全部まとめて片付く
controller.abort();
```

イベントリスナー、`fetch`、自作の非同期処理を同じ仕組みで扱えるようになるのが`AbortSignal`の大きな価値です。独自のライブラリやプロジェクトの共通関数を設計するときも、独自のキャンセル方式を再発明する代わりに`signal`オプションを受け付けるようにしておくとよいでしょう。利用者の負担を軽減できますし、AIもうまく使ってくれるはずです。

### ブラウザーの対応状況

`AbortController`と`AbortSignal`の基本機能はBaseline Widely availableで、すべての主要ブラウザーで利用可能です。`addEventListener()`関数の`signal`オプションや`fetch()`関数の`signal`オプションも含め、実務で安心して使える状態です。

参照：[Can I use…](https://caniuse.com/?search=AbortSignal)

ただし、比較的新しい機能である`AbortSignal.any()`と`AbortSignal.timeout()`のみBaseline 2024 Newly availableです。とくに`AbortSignal.any()`はSafari 17.4からのサポートとなるので、互換性を重視するプロジェクトで使う場合は注意しましょう。

Baseline statusについては、記事[『ウェブの新機能はいつまで待てば実践投入できるか』](https://ics.media/entry/250422/)で解説しています。

### まとめ

`AbortSignal`は「非同期処理のキャンセル」という地味なテーマを扱う仕組みですが、使いこなすとコードの保守性や安全性が大きく上がります。

自作の非同期処理も`signal`オプションを受け付けるように設計すれば、標準APIと同じ方法でキャンセル可能になります。次に非同期処理を書くときは、「これは外から止められるようにすべきか？」「`signal`を受け付けられないか？」と一度考えてみると、設計の選択肢が広がるはずです。