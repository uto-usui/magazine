---
title: "シンプルで使いやすいHTML・CSSボタンデザイン集11選"
source: "https://ics.media/entry/230629/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2023-06-28"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブ制作においてボタン風の見た目はよく作成するものの、ネットには新旧さまざまな記法で紹介されています。古いやり方を紹介しているサイトも多く、課題を感じていました。

そこで、「新しい手段を用いた、手軽に使いやすいボタン」というテーマで、11種類のHTML・CSSのボタンデザインを紹介します。

この記事で紹介するボタン

-   主に`a`タグで紹介しつつ、用途に応じて`button`タグにも応用しやすい
-   JavaScriptを用いずHTMLとCSSだけで作成
-   コピペしやすい

各ボタン設計時に心掛けたポイントを終盤にコラムとしてまとめています。この記事のデモはオリジナルで、GitHubにてMITライセンスとして公開しています。ぜひご活用ください。

※デモのホバー演出は、ホバーが有効なデバイスでのみ確認可能です。詳しくはコラムで紹介します。

### アウトラインのボタン（枠線をグラデーションで再現する）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/outline-gradient.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/outline-gradient.html)

枠線の色をグラデーションで再現して、ホバー時に同じグラデーションで光る実装です。

通常の枠線には`border`プロパティの指定が考えられますが、グラデーションを行う`linear-gradient`関数を利用できません。そのため、`border`プロパティは利用せず、親要素と疑似要素に同じグラデーションを重ねて枠線を再現しています。

ホバー時に光る演出は、疑似要素に同じグラデーションを適用して、`filter`の`blur()`関数でぼかしたものをフェードインさせています。

▼ホバー演出の実装例（一部抜粋）

```
/* ボタンのスタイル */
.button-outline-gradient {
  --button-color: #fff;
  --button-surface: #222;
  --button-gradient-start: #3223b3;
  --button-gradient-end: #7a70dd;

  /* 省略 */

  background: linear-gradient(
    135deg,
    var(--button-gradient-start),
    var(--button-gradient-end)
  );
}
.button-outline-gradient::before {
  /* 省略 */

  background: linear-gradient(
    135deg,
    var(--button-gradient-start),
    var(--button-gradient-end)
  );
  filter: blur(8px);
  border-radius: inherit;
  opacity: 0;
}

@media (any-hover: hover) {
  .button-outline-gradient::before {
    transition: opacity 0.2s;
  }

  .button-outline-gradient:hover::before {
    opacity: 1;
  }
}
```

`linear-gradient`関数など、グラデーションをCSSで実装する方法は以下の記事でも紹介しています。詳しく知りたい方は参考にしてみてください。

-   [1歩踏み込んでみる！　CSSグラデーションのマニアックな世界](https://ics.media/entry/200212/)

### アウトラインのボタン（ホバー時に光沢の演出を行う）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/outline-glow.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/outline-glow.html)

枠線の光沢は`conic-gradient`関数で再現しています。`.button-glow`要素に回転する光沢を重ね、演出には`@property`と呼ばれる、カスタムプロパティ（CSS変数）の値を定義するat-ruleアットルールを利用して`conic-gradient`の光沢を回転させています。

▼ホバー演出の実装例（一部抜粋）

```
/*
 * 角度の値を保持するCSS変数を定義
 * 対応ブラウザ: https://caniuse.com/?search=%40property
 */
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.button-outline-glow {
  --button-color: #fff;
  --button-surface: #222;
  --button-outline: #7a70dd;

  .button-glow {
    background: conic-gradient(
      from var(--angle),
      var(--button-surface),
      var(--button-outline),
      var(--button-surface),
      var(--button-outline),
      var(--button-surface)
    );
    animation: gradient-spin 3s linear infinite;
  }
}

/* CSS変数の値を@keyframesで操作する */
@keyframes gradient-spin {
  from {
    --angle: 0deg;
  }

  to {
    --angle: 360deg;
  }
}
```

### ニューモーフィズムなボタン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/neumorphic.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/neumorphic.html)

`box-shadow`プロパティを複数重ねてニューモーフィズムを再現しています。円形ボタンにして、ホバー時は影を浅く、押下時は`inset`の影で押し込み感を出しています。

▼`box-shadow`の実装例（一部抜粋）

```
.button-neumorphic {
  --button-color: #222;
  --button-surface: #f5f5f5;
  --button-shadow-highlight: #fff;

  /* 省略 */

  background-color: var(--button-surface);
  border-radius: 50%;
  box-shadow:
    -4px -4px 8px var(--button-shadow-highlight),
    4px 4px 8px rgb(0 0 0 / 24%);
}
```

`box-shadow`プロパティの使い方については、以下の記事で詳しく紹介していますので、参考にしてみてください。

-   [box-shadowだけじゃない！CSSでできる色々な影の表現と意外に知らない落とし穴](https://ics.media/entry/200406/)

### テキストのボタン（ホバー時に下線部をスライドイン）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/underline.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/underline.html)

ホバー時に下線部を左からスライドさせて、ホバーを外すと右へスライドするテキストボタンです。横並びのメニューなどでよく利用される演出です。

下線部の演出は、疑似要素の`background`プロパティや`transform`プロパティを利用して実装しています。この演出は以下のポイントを踏まえて実装しています。

-   ホバーを外した時のアニメーションを**ホバーした時よりも早く終わらせる**
-   ホバーを外した時のアニメーションの**違和感がないようイージングを調整**する

使用したイージングについては、以下の記事で紹介されていますので、詳しく知りたい方は参考にしてみてください。

-   [CSSイージングのお手本 - ease-out, ease-in, linearの使い分け](https://ics.media/entry/18730/)

また、ボタンや小さなUIの演出をもう少し気持ちよく見せたい場合は、記事『[CSSのlinear()でUIが軽快になる! スプリングアニメーション活用術13選](https://ics.media/entry/260402/)』もオススメです。`linear()`を使ったスプリングアニメーションの考え方や、ボタン・トグルスイッチ・タブなどへの応用例がまとまっているので、今回のサンプルからもう一歩踏み込みたいときの参考になります。

▼ホバー演出の実装例（一部抜粋）

```
.button-underline {
  --button-color: #222;
  --button-underline-color: #3223b3;
}

.button-underline::after {
  /* 省略 */

  width: 100%;
  background-color: var(--button-underline-color);
  transform: scaleX(0);
  transform-origin: right top;
}

@media (any-hover: hover) {
  .button-underline::after {
    /* イージングはeaseOutExpo（https://ics.media/entry/18730/）を使用 */
    transition: transform 0.2s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .button-underline:hover::after {
    /* イージングはeaseInOutExpo（https://ics.media/entry/18730/）を使用 */
    transition: transform 0.4s cubic-bezier(0.9, 0, 0, 1);
    transform: scaleX(1);
    transform-origin: left top;
  }
}
```

注意点として、コピペで利用する場合は**ボタンの横幅のサイズによってアニメーションの印象が異なる**ため、都度調整が必要になります。

※より細かく調整したい場合は、JavaScriptでの制御が考えられます

また、テキストの色にも下線部と同じような演出を適用したい場合、実装方法を以下の記事で紹介しています。こちらも興味のある方は参考にしてみてください。

-   [background-imageを使ったCSSのアニメーションテクニック](https://ics.media/entry/220602/)

### アイコンとテキストが横並ぶボタン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/icon-badge.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/icon-badge.html)

円形のアイコンをボタンの端に設置した、アイコンとテキストが横並ぶボタンです。

両端どちらにアイコンを設置するかは、`.is-reverse`クラスの有無で切り替えています。

▼`.is-reverse`の実装例（一部抜粋）

```
<a href="#" class="button-icon-badge">
  <!-- 省略 -->
</a>
<a href="#" class="button-icon-badge is-reverse">
  <!-- 省略 -->
</a>
```

```
.button-icon-badge {
  --button-color: #fff;
  --button-background: #3223b3;
  --button-background-hover: #281c8f;

  /* 省略 */

  &.is-reverse {
    flex-direction: row-reverse;
    padding: 8px 8px 8px 40px;
  }
}
```

アイコンはインラインSVGで作成しています。

▼HTMLの実装例（一部抜粋）

```
<a href="#" class="button-icon-badge">
  <span class="icon-box">
    <svg viewBox="0 0 24 24">
      <rect x="3.5" y="5.5" width="17" height="12" rx="1.5" />
      <path d="M6 9C6 9 11.5 12 12 12C12.5 12 18 9 18 9" />
    </svg>
  </span>
  <span class="label">Contact</span>
</a>
```

#### 別パターン（矢印のアイコン）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/icon-arrow.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/icon-arrow.html)

横並びの別パターンで、矢印のアイコン向けに調整したボタンです。ホバー時に矢印が少しスライドする演出も加えています。

#### 別パターン（アイコンとテキストを中央寄せ）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/icon-text-centered.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/icon-text-centered.html)

横並びの別パターンで、アイコンとテキストを中央に寄せたボタンです。

### 円形ボタン（アイコンのみ）

ここからは、よりシンプルなボタンをいくつか紹介します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/icon-round.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/icon-round.html)

要素がアイコンのみのシンプルな円形ボタンです。メールアイコンに加えて上下左右の矢印パターンも並べて確認できます。

注意点として、親要素の`a`タグには`aria-label`属性を仮設定しています。

▼HTMLの実装例（一部抜粋）

```
<a href="#" class="button-icon-round" aria-label="Contact">
  <!-- 省略 -->
</a>
```

### アウトラインのボタン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/outline.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/outline.html)

ボタンの内側を透明にして、ボタンの枠線だけ色を指定したシンプルなボタンです。

### 楕円形の塗りつぶされたボタン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/solid-pill.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/solid-pill.html)

角を`border-radius`で調整して楕円形にしたシンプルなボタンです。

`border-radius`に`ボタンの高さ / 2`の値を指定することで再現しています。

▼楕円形の実装例（一部抜粋）

```
.button-solid-pill {
  /* 省略 */

  height: 64px;
  border-radius: 32px; /* (buttonの高さ / 2) の値 */
}
```

### 矩形の塗りつぶされたボタン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/solid-rectangle.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/solid-rectangle.html)

一番シンプルな矩形のボタンです。

### コラム: 実装時のポイントについて

各ボタン共通で心がけたポイントを簡単に紹介します。**プロジェクトや開発環境によっては適さない可能性がある**ため、コピペで利用する場合は、必要に応じてCSSを調整してください。

#### ブラウザが持つスタイルをリセットする

シンプルさを優先して主に`a`タグで実装しています。用途に応じて`button`タグへ置き換える場合は、ブラウザ間の表示差を抑えるためにリセット用のCSSを追加しておくと扱いやすいでしょう。以下のコードが既存のコードと重複する場合は、削除してご利用ください。

```
/* aタグのリセットCSS（不要な場合、セレクタごと削除してください） */
a {
  color: inherit;
  text-decoration: none;
}

/* buttonタグのリセットCSS（不要な場合、セレクタごと削除してください） */
button {
  padding: 0;
  font-family: inherit;
  appearance: none;
  cursor: pointer;
  background-color: transparent;
  border: none;
}
```

#### ユーザービリティの考慮（`button`タグへ置き換える場合）

今回のデモは`a`タグが中心ですが、`button`タグをタッチデバイスでタップした時、**ボタンの反応とは別に意図せずテキストが選択されてしまう**ことがあります。`button`タグへ置き換える場合は、この挙動を防ぐために`user-select: none`を指定しておくとよいでしょう。不要な場合は削除してご利用ください。

※補足ですが、Safariでベンダープレフィックスが必要なため、`-webkit-user-select`プロパティも指定しています。

```
.button {
  /* 省略 */

  /* 各ボタンのCSSクラスに共通で指定しています。不要な場合、削除してください */
  -webkit-user-select: none;
  user-select: none;
}
```

また、今回紹介していなかったプロパティに`-webkit-touch-callout`というものがあります。

`touch-callout`プロパティは、iOS Safariで長押ししたときに表示されるメニューです。遷移先の画面をプレビューしたり、別タブで開くことができます。ハンバーガーメニューの開閉などのボタンを`a`タグで実装した場合は、長押しメニューで意図しない挙動となるので、`-webkit-touch-callout: none`を指定して抑制するといいでしょう。

#### ホバーが有効なデバイスのみ、ホバー時の演出を行う

ホバーが無効なタッチデバイスでは、**タッチ時にホバーが発火してしまいます。**この問題を防ぐために、ホバーが有効なデバイスかどうかを`@media (any-hover: hover)`で判定して実装しています。

```
.button {
  --button-background: #3223b3;
  --button-background-hover: #281c8f;

  background-color: var(--button-background);
}
/* 
 * ホバーが有効なデバイスの場合、ホバー時の演出を適用する
 * デバイスの判定が不要な場合、`@media (any-hover: hover) {}` を外してください。
 */
@media (any-hover: hover) {
  .button {
    transition: background-color 0.2s;
  }
  .button:hover {
    background-color: var(--button-background-hover);
  }
}
```

`any-hover`メディア特性は、以下の記事でも同様の内容を紹介しています。

-   [『リンク/ボタン/フォームをより良くするHTML・CSS 17選』](https://ics.media/entry/221208/#10.-%E3%82%BF%E3%83%83%E3%83%81%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9%E3%81%A7%E3%81%AE%E3%83%9B%E3%83%90%E3%83%BC%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E5%9B%9E%E9%81%BF)

### まとめ

CSS・HTMLで作成する「シンプルで使いやすいボタン」を紹介しました。各ボタンの実装方法や、心掛けたポイントが参考になれば幸いです。

記事中でもいくつか紹介しましたが、ICS MEDIAでは今回紹介したテクニックを以下の記事で紹介しています。詳しく知りたい方は参考にしてみてください。

-   [リンク/ボタン/フォームをより良くするHTML・CSS 17選](https://ics.media/entry/221208/)
-   [HTMLとCSSでつくる！ リンクテキストのホバー時アニメーション11選](https://ics.media/entry/240801/)
-   [CSSのlinear()でUIが軽快になる! スプリングアニメーション活用術13選](https://ics.media/entry/260402/)
-   [HTML・CSSのおさらい! アイコンとテキストを横並びに配置する方法まとめ](https://ics.media/entry/220126/)
-   [background-imageを使ったCSSのアニメーションテクニック](https://ics.media/entry/220602/)
-   [CSSイージングのお手本 - ease-out, ease-in, linearの使い分け](https://ics.media/entry/18730/)
-   [1歩踏み込んでみる！　CSSグラデーションのマニアックな世界](https://ics.media/entry/200212/)
-   [box-shadowだけじゃない！CSSでできる色々な影の表現と意外に知らない落とし穴](https://ics.media/entry/200406/)