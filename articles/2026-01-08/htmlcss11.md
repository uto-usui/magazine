---
title: "シンプルで使いやすいHTML・CSSボタンデザイン集11選"
source: "https://ics.media/entry/230629/"
publishedDate: "2023-06-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブ制作においてボタン風の見た目はよく作成するものの、ネットには新旧さまざまな記法で紹介されています。古いやり方を紹介しているサイトも多く、課題を感じていました。

そこで、「新しい手段を用いた、手軽に使いやすいボタン」というテーマで、11種類のHTML・CSSのボタンデザインを紹介します。

この記事で紹介するボタン

-   `a`タグや`button`タグのどちらでも利用可能
-   JavaScriptを用いずHTMLとCSSだけで作成
-   コピペしやすい

各ボタン設計時に心掛けたポイントを終盤にコラムとしてまとめています。この記事のデモはオリジナルで、GitHubにてMITライセンスとして公開しています。ぜひご活用ください。

※デモのホバー演出は、ホバーが有効なデバイスでのみ確認可能です。詳しくはコラムで紹介します。

### アウトラインのボタン（枠線をグラデーションで再現する）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-outline-gradient)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-outline-gradient/buttonOutlineGradient.css)

枠線の色をグラデーションで再現して、ホバー時に同じグラデーションで光る実装です。

通常の枠線には`border`プロパティの指定が考えられますが、グラデーションを行う`linear-gradient`関数を利用できません。そのため、`border`プロパティは利用せず、親要素の背景色にグラデーションを適用して、ベタ塗りの子要素を重ねて枠線を再現しています。

ホバー時に光る演出は、疑似要素に親要素と同じグラデーションを適用して、`filter: blur;`でぼかしたものをフェードインさせています。

▼ホバー演出の実装例（一部抜粋）

```
/* ボタンのスタイル */
.buttonOutlineGradient {
  /* 省略 */

  background: linear-gradient(135deg, #6fa24a, #15a1cc);
}
.buttonOutlineGradient::before {
  /* 省略 */

  background: linear-gradient(135deg, #6fa24a, #15a1cc);
  filter: blur(8px);
  border-radius: 32px;
  opacity: 0;
}

@media (any-hover: hover) {
  .buttonOutlineGradient::before {
    transition: opacity 0.2s;
  }

  .buttonOutlineGradient:hover::before {
    opacity: 1;
  }
}
```

`linear-gradient`関数など、グラデーションをCSSで実装する方法は以下の記事でも紹介しています。詳しく知りたい方は参考にしてみてください。

-   [1歩踏み込んでみる！　CSSグラデーションのマニアックな世界](https://ics.media/entry/200212/)

### アウトラインのボタン（ホバー時に光沢の演出を行う）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-outline-glow)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-outline-glow/buttonOutlineGlow.css)

枠線の光沢は`conic-gradient`関数で再現しています。演出には`@property`と呼ばれる、カスタムプロパティ（CSS変数）の値を定義するat-ruleアットルールを利用して`conic-gradient`の光沢を回転させています。

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

.buttonOutlineGlow_bg {
  /* 省略 */

  background: conic-gradient(
    from var(--angle),
    #222,
    #939393,
    #222,
    #939393,
    #222
  );
  animation: gradient-spin 3s linear 0s infinite;
}

/* CSS変数の値を@keyframesで操作する */
@keyframes gradient-spin {
  0% {
    --angle: 0deg;
  }

  100% {
    --angle: 360deg;
  }
}
```

-   [@property - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/@property)

`@property`はChrome・Edge 85（2020年8月）以上、Safari 16.4（2023年3月）、Firefox 128（2024年7月）以上で利用可能です。

-   [@property - Can I use…](https://caniuse.com/?search=%40property)

### ニューモーフィズムなボタン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-neumorphism)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-neumorphism/buttonNeumorphism.css)

`box-shadow`プロパティを複数重ねてニューモーフィズムを再現しています。

▼`box-shadow`の実装例（一部抜粋）

```
.buttonNeumorphism {
  /* 省略 */

  box-shadow:
    -4px -4px 8px #fff,
    4px 4px 8px rgb(0 0 0 / 24%);
}
```

`box-shadow`プロパティの使い方については、以下の記事で詳しく紹介していますので、参考にしてみてください。

-   [box-shadowだけじゃない！CSSでできる色々な影の表現と意外に知らない落とし穴](https://ics.media/entry/200406/)

### テキストのボタン（ホバー時に下線部をスライドイン）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-underline)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-underline/buttonUnderline.css)

ホバー時に下線部を左からスライドさせて、ホバーを外すと右へスライドするテキストボタンです。横並びのメニューなどでよく利用される演出です。

下線部の演出は、疑似要素の`background`プロパティや`transform`プロパティを利用して実装しています。この演出は以下のポイントを踏まえて実装しています。

-   ホバーを外した時のアニメーションを**ホバーした時よりも早く終わらせる**
-   ホバーを外した時のアニメーションの**違和感がないようイージングを調整**する

使用したイージングについては、以下の記事で紹介されていますので、詳しく知りたい方は参考にしてみてください。

-   [CSSイージングのお手本 - ease-out, ease-in, linearの使い分け](https://ics.media/entry/18730/)

▼ホバー演出の実装例（一部抜粋）

```
.buttonUnderline::after {
  /* 省略 */

  width: 100%;
  background-color: #6fa24a;
  transform: scaleX(0);
  transform-origin: right top;
}

@media (any-hover: hover) {
  .buttonUnderline::after {
    /* イージングはeaseOutExpo（https://ics.media/entry/18730/）を使用 */
    transition: transform 0.2s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .buttonUnderline:hover::after {
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

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-icon-text)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-icon-text/buttonIconText.css)

円形のアイコンをボタンの端に設置した、アイコンとテキストが横並ぶボタンです。

両端どちらにアイコンを設置するかは、`buttonIconText__reverse`の有無で切り替えています。

▼`buttonIconText__reverse`の実装例（一部抜粋）

```
<a href="#" class="buttonIconText">
  <!-- 省略 -->
</a>
<a href="#" class="buttonIconText buttonIconText__reverse">
  <!-- 省略 -->
</a>
```

```
.buttonIconText__reverse {
  flex-direction: row-reverse;
  padding: 8px 8px 8px 40px;
}
```

アイコンはインラインSVGで作成しています。

▼HTMLの実装例（一部抜粋）

```
<a href="#" class="buttonIconText">
  <span class="buttonIconText_icon">
    <svg
      class="iconEmail"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3.5" y="5.5" width="17" height="12" rx="1.5" stroke="#6fa24a" />
      <path
        d="M6 9C6 9 11.5 12 12 12C12.5 12 18 9 18 9"
        stroke="#6fa24a"
        stroke-linecap="round"
      />
    </svg>
  </span>
  <span class="buttonIconText_text">お問い合わせ</span>
</a>
```

#### 別パターン（矢印のアイコン）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-icon-text-02)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-icon-text-02/buttonIconText02.css)

横並びの別パターンで、矢印のアイコン向けに調整したボタンです。

#### 別パターン（アイコンとテキストを中央寄せ）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-icon-text-03)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-icon-text-03/buttonIconText03.css)

横並びの別パターンで、アイコンとテキストを中央に寄せたボタンです。

### 円形ボタン（アイコンのみ）

ここからは、よりシンプルなボタンをいくつか紹介します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-icon)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-icon/buttonIcon.css)

要素がアイコンのみのシンプルな円形ボタンです。

注意点として、親要素の`a`タグには`aria-label`属性を仮設定しています。コピペで利用する際は適宜変更が必要です。

▼HTMLの実装例（一部抜粋）

```
<a href="#" class="buttonIcon" aria-label="お問い合わせ">
  <!-- 省略 -->
</a>
```

### アウトラインのボタン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-outline)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-outline/buttonOutline.css)

ボタンの内側を透明にして、ボタンの枠線だけ色を指定したシンプルなボタンです。

### 楕円形の塗りつぶされたボタン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-round)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-round/buttonRound.css)

角を`border-radius`で調整して楕円形にしたシンプルなボタンです。

`border-radius`に`ボタンの高さ / 2`の値を指定することで再現しています。

▼楕円形の実装例（一部抜粋）

```
.buttonRound {
  /* 省略 */

  height: 64px;
  border-radius: 32px; /* (buttonの高さ / 2) の値 */
}
```

### 矩形の塗りつぶされたボタン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230629_css-button-recipes/button-basic)
-   [ソースコードを確認する](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/button-basic/buttonBasic.css)

一番シンプルな矩形のボタンです。

### コラム: 実装時のポイントについて

各ボタン共通で心がけたポイントを簡単に紹介します。**プロジェクトや開発環境によっては適さない可能性がある**ため、コピペで利用する場合は、必要に応じてCSSを調整してください。

#### ブラウザが持つスタイルをリセットする

ブラウザ間の表示を揃えるために、`a`タグと`button`タグにリセット用のCSSをいくつか指定しています。以下のコードが既存のコードと重複する場合は、削除してご利用ください。

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

#### ユーザービリティの考慮（`button`タグ用にテキスト選択を無効化）

`button`タグをタッチデバイスでタップした時、**ボタンの反応とは別に意図せずテキストが選択されてしまう**ことがあります。この挙動を防ぐために、各ボタン共通で`user-select: none`を指定しています。不要な場合は削除してご利用ください。

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

-   [\-webkit-touch-callout - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/-webkit-touch-callout)

#### ホバーが有効なデバイスのみ、ホバー時の演出を行う

ホバーが無効なタッチデバイスでは、**タッチ時にホバーが発火してしまいます。**この問題を防ぐために、ホバーが有効なデバイスかどうかを`@media (any-hover: hover)`で判定して実装しています。

```
.button {
  background-color: #6fa24a;
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
    background-color: #6fa24a;
  }
}
```

`any-hover`メディア特性は、以下の記事でも同様の内容を紹介しています。

-   [『リンク/ボタン/フォームをより良くするHTML・CSS 17選』](https://ics.media/entry/221208/#10.-%E3%82%BF%E3%83%83%E3%83%81%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9%E3%81%A7%E3%81%AE%E3%83%9B%E3%83%90%E3%83%BC%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E5%9B%9E%E9%81%BF)

### まとめ

CSS・HTMLで作成する「シンプルで使いやすいボタン」を紹介しました。各ボタンの実装方法や、心掛けたポイントが参考になれば幸いです。

記事中でもいくつか紹介しましたが、ICS MEDIAでは今回紹介したテクニックを以下の記事で紹介しています。詳しく知りたい方は参考にしてみてください。

-   [1歩踏み込んでみる！　CSSグラデーションのマニアックな世界](https://ics.media/entry/200212/)
-   [CSSイージングのお手本 - ease-out, ease-in, linearの使い分け](https://ics.media/entry/18730/)
-   [box-shadowだけじゃない！CSSでできる色々な影の表現と意外に知らない落とし穴](https://ics.media/entry/200406/)
-   [リンク/ボタン/フォームをより良くするHTML・CSS 17選](https://ics.media/entry/221208/)
-   [background-imageを使ったCSSのアニメーションテクニック](https://ics.media/entry/220602/)
-   [HTML・CSSのおさらい! アイコンとテキストを横並びに配置する方法まとめ](https://ics.media/entry/220126/)