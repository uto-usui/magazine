---
title: "ウェブサイトに演出は不要!? ユーザー設定にレスポンシブ対応できる新しいCSS"
source: "https://ics.media/entry/210604/"
publishedDate: "2021-06-04"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2021年6月4日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

画面サイズだけではなく、デバイスのユーザー設定に対してレスポンシブにできる新しいCSSのメディアクエリーが登場しています。スマートフォンやパソコンで、画面サイズに応じてレイアウトが変化する「レスポンシブ・ウェブ・デザイン」はほとんどのウェブサイトで実装されているでしょう。新しい世代の**レスポンシブ手法**は、画面サイズだけでなくユーザー設定に対して挙動やスタイルを変更させることができ、ユーザービリティーやアクセシビリティーの向上に役立ちます。

本記事では事例とあわせて最近のレスポンシブ手法を紹介します。

**この記事で紹介すること**

-   ダークモード対応
-   モーションの無効化設定
-   iOSのフォントサイズ変更

### ダークモード対応

OSには外観モードの設定項目があります。Windows 10やmacOS、iOS、Androidのいずれも**ライトモードとダークモードの切り替え機能が提供**されています。ライトモード・ダークモードに対応するにはCSSのメディアクエリー`prefers-color-scheme`を使います。

本サイトでは対応しているので、次のようにテーマが切り替わります。

![](https://ics.media/entry/210604/images/210604_prefers_media_query_icsmedia_article.png)

次のコードはシンプルな例ですが、メディアクエリー側で配色を上書きすることでダークモードの色を指定できます。

```
<meta name="color-scheme" content="light dark" />
```

```
body {
  /* 白色の背景 */
  background-color: #f9f9f9;
  /* 黒色のテキスト */
  color: #333333;
}

/* ダークモードの対応 */
@media (prefers-color-scheme: dark) {
  body {
    /* 黒色の背景 */
    background-color: #333333;
    /* 白色のテキスト */
    color: #ffffff;
  }
}
```

ライトモードとダークモードの両方のスタイルを指定するにあたり、いたる所にメディアクエリーを記述するのも大変でしょう。**CSS変数と組み合わせるのが便利な手段**としてよく知られています。ルートにCSS変数を定義しておき、`prefers-color-scheme`でCSS変数を上書きします。こうすれば一箇所で色を管理できるようになります。

```
:root {
  /* ベースの色（白色） */
  --color-bg: #f9f9f9;
  /* テキストの色（黒色） */
  --color-text: #333333;
}

/* ダークモードの対応 */
@media (prefers-color-scheme: dark) {
  :root {
    /* ベースの色（黒色） */
    --color-bg: #333333;
    /* テキストの色（白色） */
    --color-text: #ffffff;
  }
}

body {
  /* CSS変数: 背景の色 */
  background-color: var(--color-bg);
  /* CSS変数：テキストの色 */
  color: var(--color-text);
}

/* 応用して細かい配色を追加していく */
```

このダークモードはどのぐらい利用されているのでしょうか？ 私がTwitterで実施したアンケート（回答数693票）では約55%の方がダークモードを利用している結果になりました。

また記事『[ダークモードの観察｜鈴木慎吾 / TSUMIKI INC.](https://note.tsumikiinc.com/n/n949a295574d8)』でもダークモード使用率は約７割と紹介されています。

ダークモードの利点として、スクリーンによってはバッテリーの消費量が下がるといったレポートもあります（記事『[Google confirms dark mode is a huge help for battery life on Android - The Verge](https://www.theverge.com/2018/11/8/18076502/google-dark-mode-android-battery-life)』）。ダークモードの設定はユーザーがカジュアルに変更できる項目であり、本記事で紹介する技術のなかではニーズが大きい部類になるでしょう。

### モーションの無効化設定

OSの設定でモーションを減らす機能が提供されています。モーションの設定は、WindowsやmacOS、iOSに存在します。

![](https://ics.media/entry/210604/images/210604_prefers_media_query_reducedmotion.png)

モーションを減らす設定は、CSSの`prefers-reduced-motion`をメディアクエリーで検知できます。本サイトではこれに対応しているので、次のようにモーションの有無が切り替わります。

#### CSSで適用する簡単な方法

簡単な使い方はワイルドカードを使い`prefers-reduced-motion`のメディアクエリーの中でCSSアニメーション（CSS TransitionsとCSS Animations）の時間をゼロに近い値を設定します。見落としがちですが、疑似要素にCSSアニメーションを利用している場合もあるので、疑似要素にも適用しています。少し乱暴なやり方のように思えますが、ウェブサイトにおけるCSSアニメーションを一括で無効化できます。

```
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

#### JavaScript側でも制御する方法

ウェブサイトでモーションを実現できるのはCSSアニメーションだけではありません。ics.mediaではヒーロースペースでWebGLとcanvasタグによるモーショングラフィックスを配置しています。

![](https://ics.media/entry/210604/images/210604_prefers_media_query_icsmedia_hero.png)

WebGLはJavaScriptを使って制御しているため、OSのモーション設定を検知する必要があります。幸いにもJavaScriptにはCSSのメディアクエリーを調べるための`matchMedia()`メソッドが用意されています。ics.mediaでは`prefers-reduced-motion`の値を監視し、その状態に応じてWebGL・Canvasのレンダリングを再生・停止しています。

```
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

mediaQuery.addEventListener("change", () => {
  // Canvasにレンダリング停止命令を行う
  const enabledMotion = !mediaQuery.matches;
  // 変更時の処理を適用
  // (省略)
}));
const enabledMotion = !mediaQuery.matches;
// 初期化処理
// (省略)
```

利用者は多様であり、「**ウェブに余計な表現は不要**」といった意見をもつ方や、**バッテリー消費量への影響を懸念する方**、**動きが苦手で目が疲れる方**もいます。私たちICSはユーザーインタフェースの効果を最大化するためにインタラクションを大事にしていますが、モーションを必要としない方の意見も尊重しています。そのためOSでモーションを減らす設定をしている方には、モーションが再生されないように配慮しています。

※iOSとmacOSの設定項目は日本語では「**視差効果を減らす**」という名称になっています。しかし、英語OSでの名称は「**Reduced Motion（動きを減らす）**」とニュアンスが異なります。視差効果のみに限定した設定項目ではなく、本来は「OSのさまざまなモーションを減らす」役割の設定項目のようです（『[Human Interface Guidelines - Apple Developer](https://developer.apple.com/design/human-interface-guidelines/motion/)』より）。

※もうすこし内部処理を説明します。ics.mediaでのWebGLのレンダリング処理は、レイアウト計算などのメインスレッドに影響を与えないようにWeb Worker側で処理しています（[オフスクリーンキャンバス](https://ics.media/entry/19043/)）。`matchMedia()`メソッドはメインスレッド側でしか利用できないので、メインスレッド側で検知し、Web Worker側に連携することでレンダリング可否を制御しています。

### ダイナミックタイプ対応

最後に説明するのは、新しいメディアクエリーというわけではありません。iOS Safariに特化したアプローチを紹介します。

iOSには「**ダイナミックタイプ**」という機能が備わっています。iOSの設定で文字サイズを指定すると、アプリの文字サイズを一括で指定できます（対応アプリのみ）。設定アプリの［画面の表示と明るさ］→［テキストサイズを変更］から利用でき、スライダーで文字の大きさを7段階で設定できます。**小さな文字が読みづらい方は文字サイズを大きくする**でしょうし、**一度にたくさんの情報を得たい方はフォントサイズを小さくする**でしょう。

![](https://ics.media/entry/210604/images/210604_prefers_media_query_dynamic_text_pref.png)

ics.mediaではこれにも対応しています。OSの設定でテキストサイズを最小にすると一行あたり23文字ほどになり、最大にすると一行あたり14文字になります。

![](https://ics.media/entry/210604/images/210604_prefers_media_query_dynamic_text.png)

しかし、iOSのダイナミックタイプを設定しても**通常のウェブサイトでは文字サイズが変更されません**。`rem`単位でスタイルシートを作成していても、です。ダイナミックタイプで設定したフォントサイズを適用するにはウェブサイト側のCSSをレスポンシブに対応させる必要があります。

実現するには`font`プロパティーに`-apple-system-body`値を指定します。ただし、`-apple-system-body`はフォントサイズのみを指定する値ではないので、注意が必要です。`-apple-system-body`を適用すると`font-family`がシステムフォント（San FransiscoとHiragino Sansの特殊な組み合わせ）に変わります。異なるフォントを指定したい場合は`font-family`を上書きする必要があります。

```
:root {
  /* iOS と iPadOS だけに適用する
   (font: -apple-system-body) の条件だと macOS Safari も適用されてしまうため、
   (-webkit-touch-callout: none) で絞っている */
  @supports (-webkit-touch-callout: none) and (font: -apple-system-body) {
    font: -apple-system-body;
  }
}
body {
  /* フォントファミリーを上書き */
  font-family: "Helvetica Neue", "Arial", "Hiragino Sans",
    "Hiragino Kaku Gothic ProN", "BIZ UDPGothic", "Meiryo", sans-serif;
}
```

もう1つ注意したいことがあります。`-apple-system-body`はiOSだけでなくmacOS Safariでも利用できますが、macOSにはダイナミックタイプ機能が提供されていません。残念なことに`-apple-system-body`はmacOS Safariではフォントサイズが12px相当で表示されます。一般的なウェブサイトでは16pxが標準的なフォントサイズなので、かなり小さく見えてしまいます。つまり、`-apple-system-body`はmacOS Safariでは適用して欲しくない値になります。対策として、`@supports`を使ってiOS Safariだけ`-apple-system-body`が適用されるように組んでいます。この組み方はハック的な手段であり、将来的に他の望ましい方法が登場するかもしれません。

![](https://ics.media/entry/210604/images/210604_prefers_media_query_macos_safari.png)

ics.mediaのスタイルシートでは、基本的には`rem`を単位として利用し、相対的にフォントサイズを適用するようにしています。フォントサイズが可変だとレイアウトが崩れてしまう箇所では、フォントサイズを部分的にピクセル指定にします。**ピクセル指定をしたフォントはダイナミックタイプの値に影響を受けず、一貫したフォントサイズで表示される**ようになります。箇所によって使い分けるといいでしょう。

ウェブサイトもOS設定に依存させることで、統一的な可読性を提供できるようになりユーザーへの負担が減るでしょう。

#### コラム： iOS Safariのズーム機能

iOS Safariのアドレスバーからズーム設定を利用できます。ただし、これは画面の拡大率を制御するもので、文字のみを変更するユーザーインタフェースではありません。今回紹介したCSSは、ダイナミックタイプに連動してフォントサイズのみを変更する手段となります。

![](https://ics.media/entry/210604/images/210604_prefers_media_query_iossafari.png)

### まとめ： ユーザー設定に応じた対策は必要か？

最後に、ユーザー設定に応じたCSSの是非について考えてみたいと思います。

ウェブサイトの価値や効果を高める一般的な施策は、利用者の傾向を把握したうえで、多数をしめる利用者層にアプローチすることです。今回説明したダイナミックタイプやモーション設定について、求める利用者の割合ははたして多いと言えるでしょうか？　アクセス解析や利用者アンケートでデータが示せれば費用対効果は期待できそうですが、そういった場面は珍しいかもしれません。**少数のユーザーのニーズに対し、ウェブ制作者が多大な工数をかけて対応する必要があるのか**は、考えなければならない難しい課題でしょう。もしかしたらビジネスとしては、関係者の理解や予算を得にくいかもしれません。

コンテンツの性質によっては、ユーザー環境に変化させず決まったデザインで見せた方が強くメッセージが届くといったケースもあるでしょう。逆に情報はユーザーの環境に応じて変化させた方が「使いやすい」場面もありえます。コンテンツの性質に応じて今回のCSSの利用有無を検討して、よりよいユーザー体験の提供につなげましょう。