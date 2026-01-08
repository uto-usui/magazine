---
title: "滑らかなスクロール体験を！ JSライブラリでお手軽に導入する慣性スクロール（後編）"
source: "https://ics.media/entry/230817/"
publishedDate: "2023-08-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

ウェブサイトをスクロールした時に少し余韻が残りながらスクロールが継続する挙動は慣性スクロールと呼ばれ、演出と組み合わせることで世界観や没入感を表現できる手法です。

[前回の記事](https://ics.media/entry/230804/)では慣性スクロールの特徴や注意点の紹介、JavaScriptライブラリ「[Lenis](https://lenis.studiofreight.com/)」を使った簡単な実装方法を紹介しました。

後編である今回の記事ではLenisの応用的な使い方を紹介します。この記事のデモは以下のリンクから参照できるので、ぜひ読みながらデモを触ってみてください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230817_scroll_lenis_2/)
-   [ソースコードを確認する](https://github.com/ics-creative/230817_scroll_lenis_2)

### アンカーリンク

アンカーリンクはページ内の特定の位置まで移動する機能です。Lenisを使うとアンカーリンクを押した際にスルスルっと目的の位置までスクロールする演出を簡単に実装できます。

![アンカーリンクで目的の位置までスクロールする](https://ics.media/entry/230817/images/230817_anchor.gif)

```
// 設定を行ったLenisのインスタンスを作成
const lenis = setupLenis();

// アンカーリンクを取得
const anchor = document.querySelector(".js-anchor");
// クリック時に目的の箇所までスクロールする
anchor.addEventListener("click", (e) => {
  // urlを変更しないようにする
  e.preventDefault();
  // スクロール
  lenis.scrollTo("#animation");
});
```

Lenisには`scrollTo`というメソッドがあり、引数にはCSSセレクターや、スクロールしたい場所の位置（数字）を指定できるほか、DOMエレメントを直接渡すこともできます。

-   [ソースコードを確認する](https://github.com/ics-creative/230817_scroll_lenis_2/blob/main/main.js#L14)

### 慣性の強さ、イージングのカスタマイズ

慣性の強さ（スクロールの余韻の強さ）、イージングをカスタマイズすることもできます。

```
/**
 * イージング関数
 * @see https://easings.net/ja
 * @param {number} x アニメーションの進行度（正規化された0から1までの値）
 * @return {number} イージングを適用した後の進行度（正規化された0から1までの値）
 */
const easeOutQuart = (x: number) => {
  return 1 - Math.pow(1 - x, 4);
};

const lenis = new Lenis({
  lerp: 0.2, // 慣性の強さ
  duration: 1, // スクロールアニメーションの時間
  easing: easeOutQuart, // イージング関数
});
```

Lenisをインスタンス化する際に`lerp`や`easing`といったオプションを渡すことでカスタマイズできます。

イージングは関数として渡す必要があります。『[easing.net](https://easings.net/ja)』ではさまざまなイージングを直感的に選ぶことができ、関数も掲載されているのでこちらで目的にあったイージングを探してみましょう。

-   [ソースコードを確認する](https://github.com/ics-creative/230817_scroll_lenis_2/blob/main/src/scripts/lenis.js#L9)

### モーダルの制御

モーダルを表示した時など、スクロールを止めたい場合は`stop()`、`start()`というメソッドを使ってスクロールを停止・再開できます。

```
// モーダルを開くボタン
const openButton = document.querySelector(".js-modal-open-button");
// モーダルを閉じるボタン
const closeButton = document.querySelector(".js-modal-close-button");
// モーダル本体
const modal = document.querySelector("#modal");

openButton.addEventListener("click", () => {
  // モーダルを表示する
  modal.showModal();
  // スクロールを止める
  lenis.stop();
});

closeButton.addEventListener("click", () => {
  // モーダルを閉じる
  modal.close();
  // スクロールを再開する
  lenis.start();
});
```

-   [ソースコードを確認する](https://github.com/ics-creative/230817_scroll_lenis_2/blob/main/main.js#L18)

### タッチイベントでの挙動

Lenisではスマートフォンでの操作時などに使われるタッチイベントの際は、デフォルトで慣性スクロールが無効になっています。スマートフォンなどはもともとスムーズにスクロールできるようになっているため、ほとんどの場合はこのままで問題ありません。しかし、スクロールと連動したアニメーションは無効のままだとうまくアニメーションしません。

タッチイベントでも慣性スクロールの挙動を有効にしたい場合は以下のように設定します。

```
// Lenisを設定
const lenis = new Lenis({
  smoothTouch: true, // タッチイベントでも慣性スクロールを有効にする
});
```

**▼タッチイベントを有効にした時と無効にした時の比較**

無効にした右側では、スクロールと連動したアニメーションが動いていないのがわかります。

![タッチイベント有効と無効の比較](https://ics.media/entry/230817/images/230817_smooth_touch.gif)

-   [ソースコードを確認する](https://github.com/ics-creative/230817_scroll_lenis_2/blob/main/src/scripts/lenis.js#L12)

### スクロールに連動したアニメーション

Lenisではスクロールの量を`velocity`というプロパティから取得できます。

デモではこのプロパティの値を利用して、スクロールに連動してうさぎが回るアニメーションを追加しています。

```
// model(うさぎ)の読み込みが完了してからアニメーションを実行する
if (model) {
  // スクロールの強さに応じてモデルを回転させる
  model.rotation.y += 0.01 + Math.abs(lenis.velocity * 0.005);
  // lenis.velocityをコンソールログで表示
  Math.abs(lenis.velocity) > 0.01 && console.log(lenis.velocity);
}
```

デベロッパーツールでコンソールパネルを表示すると、スクロールした時に`velocity`の値が表示されます。

![スクロールした時にvelocityの値が表示される](https://ics.media/entry/230817/images/230817_velocity.gif)

-   [ソースコードを確認する](https://github.com/ics-creative/230817_scroll_lenis_2/blob/main/src/scripts/three/setupAnimation.js#L23)

### まとめ

Lenisの[GitHubページ](https://github.com/darkroomengineering/lenis)では他にもいろいろなプロパティやメソッドなどが紹介されています。ウェブ制作で必要な機能はひととおり揃っていて、とても使いやすいライブラリという印象です。慣性スクロールを使ったウェブ制作で選択肢の1つとしてぜひ使ってみてください。

また、今回のデモの背景のうさぎの描画やアニメーションには「[Three.js](https://threejs.org/)」というライブラリを使用しています。興味のある方はICS MEDIAのThree.jsに関する入門記事も読んでみてください。

-   [最新版で学ぶThree.js入門 手軽にWebGLを扱える3Dライブラリ](https://ics.media/entry/14771/)
-   [Three.js入門サイト - ICS MEDIA](https://ics.media/tutorial-three/)

※この記事が公開されたのは**2年前**ですが、**1年前の2024年3月**に内容をメンテナンスしています。