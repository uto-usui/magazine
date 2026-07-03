---
title: "スクロール完了をawaitで待てる！ 進化したJSのスクロール関数"
source: "https://ics.media/entry/260702/"
publishedDate: "2026-07-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

JavaScriptには、`scrollTo()`メソッドや`scrollBy()`メソッドなど、目的のところまでスクロールする関数があります。これらの関数と一緒に使われることが多いのが`behavior`プロパティに`"smooth"`を設定して、目的地まで滑らかにアニメーションさせる方法です。たとえば目次をクリックしたら該当の章までスムーズにスクロールさせるなど、使ったことがある方も多いと思います。

スムーズスクロールの課題として一番大きなものは、**スクロールの完了後に行う処理が書きづらい**ことです。Chrome・Edge 150から使える**プログラマティック・スクロール・プロミス**では、今まで`scrollend`イベントの監視や`setTimeout()`メソッドなどで検知していたスクロール完了を、`Promise`を使って制御できるようになります。

### スクロール完了を`Promise`であつかう

`Promise`は非同期の処理を制御するためのオブジェクトです。**サーバーからのデータ取得やアニメーションなど、時間がかかる処理の完了や失敗をあつかう**際によく使われます。`Promise`は`await`と組み合わせることで、処理が完了するまで待ってから次の処理を実行できます。`Promise`や`await`については記事『[JavaScriptのモダンな書き方- ES2017〜ES2018のawait・async, includes(), padStart()等を解説](https://ics.media/entry/17262/)』もあわせてご確認ください。

#### スクロールを`await`するだけで簡単に使える

今までの`scrollTo()`等のメソッドは`undefined`を返す仕様でした。プログラマティック・スクロール・プロミスでは、スクロール関連のメソッドが`Promise`を返すようになります。`Promise`を利用することで、スクロールの完了を待つ→次の処理をするという流れを制御できます。

以下は`scrollTo()`メソッドでのスムーズスクロールの完了を`await`で待ち、完了後にメッセージを出す処理です。`await`を追加するだけなので、とても簡単に実現できますよね！

**※以降のデモはChrome・Edge 150以上でご確認ください。**

```
// 省略
const message = document.querySelector("#message");

const onClick = async () => {
  message.textContent = "";
  // awaitでスクロールの完了を待つ
  await window.scrollTo({
    top: target.offsetTop,
    behavior: "smooth",
  });
  // スクロールが完了したらメッセージを出す
  message.textContent = "scroll end!";
};
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260702_programmatic-scroll-promises/01_basic/)
-   [コードを確認する](https://github.com/ics-creative/260702_programmatic-scroll-promises/blob/main/docs/01_basic/index.html#L29)

#### 対象のメソッド

プログラマティック・スクロール・プロミスの概要が書かれている「[explainers-by-googlers/promisify-scroll](https://github.com/explainers-by-googlers/promisify-scroll)」には、以下のメソッドが対象だと書かれています。

-   `scroll()`: ページや要素を指定した位置までスクロールする
-   `scrollTo()`: `scroll()`と同様
-   `scrollBy()`: 現在の位置を基準に、指定した量スクロールする
-   `scrollIntoView()`: メソッドを呼び出した要素が表示範囲に入るように、ページや親コンテナーをスクロールする

※2026年7月時点、筆者の環境では`scrollIntoView()`はスクロール完了前に`Promise`が解決されてしまいました。これからの開発に期待しましょう！（検証環境：Chrome 150.0.7871.46 / macOS 26.5.1 / MacBook Air M1, 2020）

### 何が嬉しいの？

`Promise`で制御できるとどのようなメリットがあるのでしょうか？　目次をクリックしたら該当の章までスクロールし、完了後に章のタイトルをハイライトする処理を考えてみましょう。次のような仕様だと仮定します。

-   目次をクリックした場合、スムーズにスクロールしてタイトルのハイライトをアニメーションさせる
-   目次クリック以外でのスクロールの場合はアニメーションさせない

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260702_programmatic-scroll-promises/02_highlight/)
-   [コードを確認する](https://github.com/ics-creative/260702_programmatic-scroll-promises/blob/main/docs/02_highlight/index.html#L96)

#### 今までの課題

**`scrollend`イベントを監視する方法**

**目次をクリックしたのか、それ以外のスクロールなのかを判別する必要があります。**`scrollend`イベントはページ全体や特定のDOM要素のスクロールが完了したことはわかりますが、そのスクロールが何を契機に発生したのかはわかりません。

次のコードではスクロールのきっかけを判別するため`shouldHighlight`フラグで処理を分岐します。しかし、フラグでの管理はON/OFFを忘れると意図しない表示になる可能性があります。SPAの構成の場合、別ページに遷移する際にイベントリスナーの解除を忘れてしまうと不要な`scrollend`イベントが発火し続けるリスクがあります。

```
let shouldHighlight = false;

// 目次をクリックした時の処理
const onClick = () => {
  // フラグを立てる
  shouldHighlight = true;
  window.scrollTo({
    top: targetSection.offsetTop,
    behavior: "smooth",
  });
};

window.addEventListener("scrollend", () => {
  if (!shouldHighlight) {
    // 目次クリック以外なら何もしない
    return;
  }
  shouldHighlight = false;
  highlightTitle(targetSection);
});
```

**`setTimeout()`メソッドを使う場合**

目次をクリックしたあと、`setTimeout()`で特定の秒数待ってからアニメーションさせます。**スクロールの時間は距離に応じて変化するので、アニメーション開始が早すぎたり遅すぎたりします。**

```
const onClick = () => {
  window.scrollTo({
    top: section.offsetTop,
    behavior: "smooth",
  });

  // 0.5秒後にハイライトする
  window.setTimeout(() => {
    highlightTitle(section);
  }, 500);
};
```

**`Intersection Observer`を使う場合**

Intersection Observerを使う場合も、問題点は`scrollend`と同じです。目次をクリックしたのか、それ以外のスクロールなのかの分岐が必要です。

```
let shouldHighlight = false;

const observer = new IntersectionObserver((entries) => {
  if (!shouldHighlight) {
    // 目次クリック以外なら何もしない
    return;
  }
  entries.forEach((entry) => {
    if (entry.target === targetSection && entry.isIntersecting) {
      // ターゲットが交差したらハイライトする
      shouldHighlight = false;
      highlightTitle(targetSection);
    }
  });
});
```

Intersection Observerについての詳細は記事『[JSでのスクロール連動エフェクトにはIntersection Observerが便利](https://ics.media/entry/190902/)』をご覧ください。

#### プログラマティック・スクロール・プロミスを使うと

スクロール完了を`Promise`で制御できれば処理をシンプルに書けます。不要なイベントの監視をすることもありません。

```
const onClick = async (event) => {
  // 省略
  await window.scrollTo({
    top: section.offsetTop,
    behavior: "smooth",
  });
  // スクロール後にハイライトする
  highlightTitle(section);
};
```

### 応用: ガイドツアーのデモ

アプリケーション内で操作の説明をするガイドツアーを実装します。特定のUIまでスクロールしてから説明を表示し、次のUIへ進む処理はプログラマティック・スクロール・プロミスととても相性がいいユースケースです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260702_programmatic-scroll-promises/03_tour/)
-   [コードを確認する](https://github.com/ics-creative/260702_programmatic-scroll-promises/blob/main/docs/03_tour/script.js)

スクロールが完了した後に対象のセクションを強調表示します。スクロールが完了してからCSSを適用することで、ユーザーの注目が自然に対象セクションに向きます。

```
const showStep = async (stepIndex) => {
  const step = steps[stepIndex];
  const target = document.querySelector(step.selector);

  // 省略

  await window.scrollTo({
    behavior: "smooth",
    top: centerY,
  });

  // スクロール後にターゲットにis-activeをつけて強調表示する
  target.classList.add("is-active");
};
```

ツアー完了を検知して「Start tour」ボタンを活性に戻す処理も追加します。スクロールの完了を待ってから活性にすることで、ツアー中の重複実行を避けられます。

```
const endTour = async () => {
  // 省略

  await window.scrollTo({
    behavior: "smooth",
    top: 0,
  });
  // スクロール後にボタンを活性化
  startButton.disabled = false;
};
```

#### スクロールが中断されたとき

プログラマティック・スクロール・プロミスは、スクロールが中断されたとき`Promise`はすぐ`resolve`され次の処理は必ず実行されます。ガイドツアーでは、「Next」ボタンを連打すると複数のパネルが強調表示されてしまいます。

回避するためにはスクロールメソッドからの戻り値を使います。中断された場合は戻り値の`interrupted`の値が`true`になるため、条件分岐して次の処理をスキップします。

```
const showStep = async (stepIndex) => {
  // 省略
  const result = await window.scrollTo({
    behavior: "smooth",
    top: centerY,
  });

  if (result.interrupted) {
    // 中断された場合は何もしない
    return;
  }

  // スクロール後にactiveにする
  target.classList.add("is-active");
};
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260702_programmatic-scroll-promises/03_tour-interrupt/)
-   [コードを確認する](https://github.com/ics-creative/260702_programmatic-scroll-promises/blob/main/docs/03_tour-interrupt/script.js#L92)

### 対応ブラウザ

プログラマティック・スクロール・プロミスは、Chrome・Edge 150（2026年7月）以上で利用可能です。

参照：[Can I use…](https://caniuse.com/mdn-api_window_scroll_returns_promise)

### まとめ

プログラマティック・スクロール・プロミスを紹介しました。スクロールの完了を待つ処理を`Promise`で制御できると非常にシンプルに書け、余計なフラグやイベントの監視が不要になるのが嬉しいポイントです。

今後Chrome/Edge以外のブラウザでも対応され、標準的な機能になっていくことを楽しみにしています！