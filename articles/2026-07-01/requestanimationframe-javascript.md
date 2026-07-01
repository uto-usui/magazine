---
title: "requestAnimationFrame入門 - JavaScriptでアニメーションを実装するための基本機能"
source: "https://ics.media/entry/210414/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2021-04-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

`requestAnimationFrame()`は、ブラウザーの描画タイミングに合わせて処理を実行するための関数です。頭文字をとってRAFラフと呼ばれることもあります。

この記事では要素の移動アニメーションを例に、`requestAnimationFrame()`の基本的な使い方、リフレッシュレートに依存しない動かし方、関連する関数との違いを解説します。

**この記事で学べること**

-   `requestAnimationFrame()`で処理を繰り返す基本形
-   リフレッシュレートによってアニメーション速度が変わる理由
-   `setInterval()`、`setTimeout()`、`cancelAnimationFrame()`、`requestIdleCallback()`との違い

さまざまな作例のサンプルファイルも用意しています。ぜひご覧ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210414_requestAnimationFrame/)
-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame)

### requestAnimationFrameの基本

まずは、基本的な`requestAnimationFrame()`の使い方です。

```
// 対象要素
const box = document.querySelector(".box");

// 現在位置
let x = 0;

// フレームごとの処理
const tick = () => {
  // 1px進める
  x += 1;

  // CSSに反映
  box.style.translate = `${x}px`;

  // 次フレームを予約
  requestAnimationFrame(tick);
};

// 開始
tick();
```

基本形は、フレームごとに実行したい処理を`tick()`関数にまとめ、その関数の中で`requestAnimationFrame(tick)`を呼ぶことです。上の例では、`tick()`が呼ばれるたびに`x`を増やし、要素の位置を更新しています。

ただし、このままだと止まらないアニメーションになります。実際には、次のように条件をつけて終了できるようにします。

### 終了条件をつける

```
// 対象要素
const box = document.querySelector(".box");

// 最大移動距離
const maxX = 400;

// 現在位置
let moveX = 0;

/**
 * フレームごとの処理
 */
const tick = () => {
  // 1px進める
  // maxXを超えないようにする
  moveX = Math.min(moveX + 1, maxX);

  // CSSに反映
  box.style.translate = `${moveX}px`;

  // 最大距離に達するまで継続
  if (moveX < maxX) {
    // 次フレームを予約
    requestAnimationFrame(tick);
  }
};

// 開始
tick();
```

`requestAnimationFrame()`の特徴は**自分自身の処理を呼び出してループさせる**ことです。

このコードでは、最初に`tick()`を1回実行しています。その中で`moveX`を更新し、`.box`の位置を変更します。ここまでは通常の関数呼び出しです。

関数の最後にある`requestAnimationFrame(tick)`は、`tick()`をその場ですぐ実行するものではありません。「次の描画タイミングでもう一度`tick`を呼び出してほしい」とブラウザーへ予約しています。

次の描画タイミングで`tick()`が呼ばれると、また`moveX`が更新され、要素の位置が変わります。そして条件を満たしていれば、再び`requestAnimationFrame(tick)`で次のフレームを予約します。この「値を更新する」「描画に反映する」「次のフレームを予約する」という流れを繰り返すことで、連続したアニメーションになります。

この例では、`moveX`が`400`に達したら`if (moveX < maxX)`の条件を満たさなくなります。次のフレームを予約しなくなるので、アニメーションはそこで終了します。

`requestAnimationFrame()`は各フレームでの微小な動きを指定し、それを描画毎に動かすことでアニメーションさせる、というのが基本的な書き方になります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210414_requestAnimationFrame/basic/)
-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame/blob/master/basic/index.html#L16-L33)

### リフレッシュレートによって変わるアニメーション速度

ディスプレイにはリフレッシュレートがあります。リフレッシュレートとは、1秒間に画面を何回更新するかを表す値です。60Hzなら1秒間に約60回、120Hzなら1秒間に約120回、画面が更新されます。

`requestAnimationFrame()`は、この画面更新のタイミングに合わせてコールバック関数を呼び出します。そのため、先ほどのように1フレームごとに`1px`ずつ進める実装では、アニメーションのスピードがディスプレイのリフレッシュレートに依存します。

![30Hzにくらべて60Hzの方がはやく移動するアニメーション](https://ics.media/entry/210414/images/210414_hz.gif)

60Hzのディスプレイでは1秒間に約60回、30Hzのディスプレイでは1秒間に約30回、アニメーションの処理が呼び出されます。1回の呼び出しごとに同じ距離だけ移動させると、高リフレッシュレートの環境ほど速く進んでしまいます。環境によってアニメーション速度が違うのはマズイです。

iPhoneを例にすると、ProMotion対応の上位モデル（iPhone 17 Pro等）では最大120Hzで表示されます。一般的な無印モデルでは60Hzです。注意したいのは、iOSの低電力モードでは、`requestAnimationFrame()`の呼び出しが30fps相当まで落ちることです。iPhoneではバッテリー残量が少なくなると自動的に低電力モードに切り替わります。

### setInterval()・setTimeout()との違い

`requestAnimationFrame()`と`setInterval()`、`setTimeout()`はいずれもコールバック関数をあとで実行する仕組みですが、実行タイミングの考え方が異なります。

関数

実行タイミング

向いている用途

`requestAnimationFrame()`

ブラウザーの次の描画タイミング

画面上のアニメーション

`setInterval()`

指定した時間間隔で繰り返し実行

時計の表示更新、一定間隔の状態確認

`setTimeout()`

指定した時間が経過したあとに1回だけ実行

少し待ってからの処理、遅延実行

`setInterval()`と`setTimeout()`は、どちらも「何ミリ秒後に実行するか」を指定する仕組みです。画面の描画タイミングに合わせて呼ばれるわけではありません。

![requestAnimationFrameがリフレッシュレートに応じたアニメーションに対してsetIntervalは固定フレームレートのアニメーション](https://ics.media/entry/210414/images/210414_difference.png)

画面上のアニメーションでは`requestAnimationFrame()`が基本です。一方で、パラパラ漫画のようにあえて固定フレームレートで表示を切り替えたい場合や、画面更新とは関係ない遅延処理では、`setInterval()`や`setTimeout()`が向いています。

### リフレッシュレートに依存しない処理

アニメーション速度をリフレッシュレートに依存させないためには、アニメーションの進捗をフレーム数ではなく経過時間で管理します。

```
// 再生時間（ミリ秒）
const duration = 1000;

// 対象要素
const box = document.querySelector(".box");

// 最終移動距離
const moveX = 400;

// 開始時刻
let startTime = performance.now();

// timestampを使って進捗を計算
const tick = (timestamp) => {
  // 経過時間を0〜1の進捗度に変換
  // 上限は1
  const progress = Math.min((timestamp - startTime) / duration, 1);

  // 現在位置をCSSに反映
  box.style.translate = `${moveX * progress}px`;

  // 進捗が100%未満なら継続
  if (progress < 1) {
    // 次フレームを予約
    requestAnimationFrame(tick);
  }
};

// 開始
requestAnimationFrame(tick);
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210414_requestAnimationFrame/duration/)
-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame/blob/master/duration/index.html#L16-L37)

`requestAnimationFrame()`のコールバックには`timestamp`が渡されます。アニメーション開始時の時刻を`startTime`変数に保持し、以降のフレームではその差分からアニメーション開始後の経過時間を計算します。

各フレーム内では`timestamp`から進捗度を算出します。さきほどはフレームごとの移動量で管理していたのですが、進捗度を使って管理することで指定した時間（この例なら1秒）アニメーションします。

進捗度の計算について、`Math.min()`を使い「1あるいは進捗度のうち小さい方を得る」という処理をはさんでいます。これはリフレッシュレートの関係で経過時間後でもフレームの処理が呼ばれることがあります。その場合、進捗度が1を超えるので、上限として1になる処理をしています。

```
/**
 * フレームごとの処理
 */
const tick = (timestamp) => {
  // 経過時間を0〜1の進捗度に変換
  // 終了時は1
  const progress = Math.min((timestamp - startTime) / duration, 1);

  // 省略
};
```

移動量は最終的な移動距離に進捗度を掛けた値になります。（進捗度0で`0px`、100%で`400px`）

```
// 現在の移動量
const deltaX = moveX * progress;

// CSSに反映
box.style.translate = `${deltaX}px`;
```

算出した移動量を要素へ適用し、繰り返し処理させます。注意したいのが、そのまま自身を呼び出すと、アニメーション終了後も延々と処理自体は呼ばれ続けてしまいます。それを防ぐため、進捗度が1になったら呼ばれないようにしています。

```
// 100%未満なら継続
if (progress < 1) {
  // 次フレームを予約
  requestAnimationFrame(tick);
}
```

これを繰り返すことで、指定した時間でリフレッシュレートに依らないアニメーションができます。

### 応用編

要素の移動を例に`requestAnimationFrame()`を解説しましたが、いくつか応用例を紹介します。

#### イージングをつける

指定時間で動かす実装をもとに、速度にイージングをつける例です。実装の詳細はデモのコードを確認ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210414_requestAnimationFrame/easing/)
-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame/blob/master/easing/index.html#L16-L46)

#### カウントダウン

DOM要素を連続的に変化させ、カウントダウンのような文字が連続的に変化させることも可能です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210414_requestAnimationFrame/count_down/)
-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame/blob/master/count_down/index.html#L92-L117)

#### progressタグ・meterタグのアニメーション

`progress`タグは、タスクの進捗状況を表すHTMLタグです。たとえば、アップロードやダウンロードの進行度を0〜100%のように表示する用途に向いています。

`meter`タグは、既知の範囲内にある値を表すHTMLタグです。たとえば、ディスク使用量、スコア、残量のように「最小値から最大値までのどの位置にあるか」を示す用途に向いています。

どちらも`value`属性を更新することで表示が変わります。CSSのトランジションだけでは扱いづらいタグの値も、`requestAnimationFrame()`であればフレームごとに制御できます。

```
// 対象のprogressタグ
const progress = document.querySelector(".progressBar");

// 現在値
let progressValue = 0;

// フレームごとの処理
const tick = () => {
  // valueを1ずつ増やす
  // 上限は100
  progressValue = Math.min(progressValue + 1, 100);

  // value属性に反映
  progress.value = progressValue;

  // 100未満なら継続
  if (progressValue < 100) {
    // 次フレームを予約
    requestAnimationFrame(tick);
  }
};

// 開始
tick();
```

サンプルでは、`progress`タグの再生と`meter`タグの再生・停止を実装しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210414_requestAnimationFrame/inputElement/)
-   [コードを確認する](https://github.com/ics-creative/210414_requestAnimationFrame/blob/master/inputElement/index.html#L30-L67)

### cancelAnimationFrameで停止する

`requestAnimationFrame()`は、呼び出すとリクエストIDを返します。このIDを`cancelAnimationFrame()`に渡すと、予約済みのフレーム処理を取り消せます。

```
// 停止ボタン
const stopButton = document.querySelector(".stopButton");

// リクエストID
// cancelAnimationFrame()で使う
let animationId = 0;

// フレームごとの処理
const tick = () => {
  // フレームごとの更新

  // 次フレームを予約
  animationId = requestAnimationFrame(tick);
};

// 開始
animationId = requestAnimationFrame(tick);

// 停止ボタンを押したら停止
stopButton.addEventListener("click", () => {
  // 予約済みの次フレームを取り消す
  cancelAnimationFrame(animationId);
});
```

アニメーションを途中で止めたい場合や、再生中のアニメーションをリセットして最初から開始したい場合に使います。たとえば、停止ボタンを押したとき、画面遷移で対象の要素が不要になったとき、同じアニメーションを開始し直すときなどです。

`cancelAnimationFrame()`が取り消すのは、「次に実行される予定の処理」です。すでに実行中の関数を途中で止めるものではありません。

### requestIdleCallbackとの違い

`requestAnimationFrame()`に似た名前の関数に、`requestIdleCallback()`があります。どちらもコールバック関数をブラウザーに予約するものですが、用途は異なります。

`requestAnimationFrame()`は、次の描画タイミングに合わせて処理を実行します。そのため、画面に反映するアニメーションや描画更新に向いています。

一方、`requestIdleCallback()`は、ブラウザーのメインスレッドが空いているタイミングで処理を実行します。画面更新に直結しない処理、たとえばログ送信、軽い事前計算、優先度の低い後処理などに向いています。

2026年現在、`requestIdleCallback()`はChromeやEdgeなどのChromium系ブラウザーとFirefoxで利用できます。一方、SafariとiOS Safariは未対応です。

```
requestIdleCallback(() => {
  // 優先度の低い処理
  console.log("空き時間に実行");
});
```

アニメーションのように「次の描画に間に合わせたい処理」は`requestAnimationFrame()`を使います。急がなくてよい処理を、描画や入力の邪魔になりにくいタイミングへ回したい場合は`requestIdleCallback()`を検討するとよいでしょう。

### まとめ

CanvasやWebGPUの実装では、`requestAnimationFrame()`は必須の技術です。しかし、ウェブではさまざまなアニメーションの実装方法があります。

要素の移動やインタラクションなどは、CSS Transition、CSS Animation、SVG Animationで十分な場面が多いです。JavaScriptからDOM要素のアニメーションを制御したい場合も、まずは`Element.animate()`などの標準機能を検討するとよいでしょう。

`requestAnimationFrame()`は、CanvasやWebGL/WebGPUの描画、HTMLの属性値の連続的な変更、時刻に応じた独自計算など、毎フレームの処理を自分で制御したい場面で役立ちます。複雑なモーションならGSAPなどのライブラリが扱いやすい場面も多いので、目的に応じて使い分けるのがよいでしょう。

アニメーションの仕組みをもう少し深く知りたい場合は、記事『[JavaScript製アニメーションライブラリの原理を理解しよう](https://ics.media/entry/17183/)』も参考になります。時間の進み方から値を補間する考え方を理解できます。ライブラリ選びでは、記事『[現場で使えるアニメーション系JSライブラリまとめ](https://ics.media/entry/14973/)』で、GSAPやAnime.jsなどの特徴を比較しています。