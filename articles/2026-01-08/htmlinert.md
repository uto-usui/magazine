---
title: "ユーザー操作の一括無効化で役立つ！ HTMLのinert属性の紹介"
source: "https://ics.media/entry/230406/"
publishedDate: "2023-04-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

HTMLやCSSには、ユーザーインタラクション（ユーザー操作）を無効化するための方法がいくつか存在します。たとえば、マウスやタッチ操作を無効化したいときはCSSで`pointer-events: none`を要素に指定するなど、制御したいユーザー操作によってさまざまです。

カルーセルやモーダルなユーザーインターフェイス（UI）では、非アクティブな要素が操作されないように「**画面には表示されているが、あらゆるユーザー操作を受け付けない状態**」にしたい場合があります。具体的には、以下のユーザー操作を無効化します。

-   マウスやタッチ操作を無効化したい
-   テキスト選択を無効化したい
-   キーボードフォーカスをあえて無効化したい
-   音声読み上げをあえて無効化したい

必要なプロパティや属性を複数指定することが考えられますが、そのようなときに役立つのが`inert`イナートと呼ばれるHTMLのグローバル属性です。

`inert`属性は、指定された要素を子孫要素含めて非活性な状態として扱い、あらゆるユーザー操作を無効化します。2023年4月12日にFirefox 112がリリースされたことで、主要なブラウザで利用可能になりました。

▼[inert | Can I use…](https://caniuse.com/?search=inert)

![inert属性のサポート状況](https://ics.media/entry/230406/images/230406_support.png)

この記事では、`inert`属性について作例とあわせて紹介します。

### inert属性の使い方

冒頭でも少し説明しましたが、`inert`属性を有効にすると子孫要素を含め要素を非活性な状態として扱い、あらゆるユーザー操作を無効化します。また、アクセシビリティーツリーからは削除され、音声読み上げソフトの読み上げも無効となります。

`inert`属性は論理属性で、JavaScriptでは`HTMLElement.inert`を利用して値を指定します。

▼HTMLでの利用例

```
<div inert>
  <!-- div要素含め、子孫要素が非活性な状態となる -->
</div>
```

▼JavaScriptでの利用例

```
// id="target"の要素にinert属性を付与する
const element = document.querySelector("#target");
element.inert = true;
```

#### これまでの実装方法と比較

`inert`属性を使わずに`inert`属性の動作を再現する場合、次のいくつかの設定が必要でした。

-   クリックやタッチ操作を無効化する
    -   CSSで`pointer-events: none`を指定する
-   選択を無効化する
    -   CSSで`user-select: none`を指定する
-   キーボードフォーカスを無効化する
    -   HTMLで`tabindex="-1"`を指定する
-   音声読み上げを無効化する
    -   HTMLで`aria-hidden="true"`を指定する

従来の方法では、UIの状態が切り替わるときにこれらの設定をJavaScriptで操作します。`inert`属性を利用することで各ユーザー操作をまとめて無効化できます。

`inert`属性を含め、それぞれの値を確認できるサンプルを用意しましたので、実際に触って確認してみてください。

▼各ユーザー操作を制御するサンプル

![各ユーザー操作を制御するサンプル](https://ics.media/entry/230406/images/230406_demo04.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230406_inert/demo04/)
-   [コードを確認する](https://github.com/ics-creative/230406_inert/blob/main/demo04/index.html)

操作を無効化する別の方法として、`disabled`属性で非活性化させる方法があります。`disabled`属性は特定の要素でのみ使用できる属性なので、該当しない要素を`inert`属性で制御するといった使いわけが考えられます。

また、`disabled`属性と`inert`属性はまったく同じものというわけでもなく、`disabled`属性の場合はアクセシビリティーツリーから残るといった挙動に違いがあります。

※`display: none`を使用することでもユーザーインタラクションを無効化できますが、要素自体が非表示になりレイアウトにも影響を与えてしまうため、同じ用途で使用できませんでした。

### 作例の紹介

ここからは`inert`属性の利用が考えられる作例を紹介します。

#### 入力内容の送信から送信完了の間を制御する

次の作例は、入力内容の送信から送信完了までの間、一時的にユーザー操作を受け付けないようにしたものです。

実際には、入力内容は送信ボタンが押されてもどこにも送信されません。この作例では疑似的に送信を`setTimeout()`で待機して、送信が完了したらアラートを表示する実装をしています。待機中は`form`タグを`<div inert>`で囲い、CSSで半透明にしています。

▼入力内容の送信完了を待機する例

![入力内容の送信完了を待機する例](https://ics.media/entry/230406/images/230406_demo01.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230406_inert/demo01/)
-   [コードを確認する](https://github.com/ics-creative/230406_inert/blob/main/demo01/index.html)

`inert`属性が設定されている間はフォームの操作を無効化し、**表示上の送信連打防止**も行えています。

注意点として、フォームでよく利用する`fieldset`、`input`、`button`タグには`disabled`属性が存在します。これらの要素を個別で非活性化したい場合は、`disabled`属性を使用したほうがよりウェブ標準の仕様に準拠したマークアップができるかもしれません。

#### カルーセルUIの前後スライドに適用する

カルーセルUIを実装するとき、前後のスライドを見切れで非表示にしたり、反対にUIの視覚的なアフォーダンスを高めるために前後のスライドを部分的に表示したい場合があります。どちらの場合も、前後のスライドのユーザー操作を無効化したいときに`inert`属性が役立ちます。

次の作例は、[Swiper.js](https://swiperjs.com/)（v8.4.7）というカルーセルライブラリを利用しつつ、前後のスライドのユーザー操作を`inert`属性で抑制しているサンプルです。前後のスライドは部分的に表示しています。

▼カルーセルUIの前後スライドを制御する例

![カルーセルUIの前後スライドを制御する例](https://ics.media/entry/230406/images/230406_demo02.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230406_inert/demo02/)
-   [コードを確認する](https://github.com/ics-creative/230406_inert/blob/main/demo02/index.html)

カルーセルUIの注意点として、前後のスライドをマウスやタッチ操作でスワイプできる場合があります。`inert`属性はマウスやタッチ操作を無効化してしまうため、スワイプ機能を保持するためには工夫が必要です。

作例ではマウスやタッチ操作によるスワイプ機能が存在するため、前後のスライド部分もスワイプできるように次の対応をおこないました。

-   スライドの親要素（`.swiper-slide`）は、音声読み上げのみ無効化（`aria-hidden="true"`）
-   `.swiper-slide`の子要素に`inert`属性を指定

#### `dialog`タグを使用しないモーダルなUIで、背面を制御する

今回はハンバーガーメニューを例に紹介します。ハンバーガーメニューはメニューの構成がサイトによってさまざまで、`dialog`タグを利用せずモーダルな実装をすることが多いです。開かれたメニューを画面全域で覆ってモーダルダイアログのような表示にしたいとき、背面の制御に`inert`属性が役立ちます。

※HTML標準の`dialog`タグを`showModal()`メソッドで表示すると、モーダルダイアログの外側が一切操作できなくなります。`inert`属性はそれと同様の動作を任意の要素で行えるものです。

背面の制御については『[HTMLでモーダルUIを作るときに気をつけたいこと](https://ics.media/entry/220620/)』の「課題2: 裏側にキーボードフォーカスされる現象」でも紹介しています。紹介記事では次の対策を行っていました。

-   背面にキーボードフォーカスが当たらないようにJSで制御する
-   背面の音声読み上げが行われないように`aria-hidden="true"`を一時的に指定する

次の作例では、両方の対策を`inert`属性でまとめて行っています。

▼モーダルなメニューの背面を制御する例

![モーダルなメニューの背面を制御する例](https://ics.media/entry/230406/images/230406_demo03.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230406_inert/demo03/)
-   [コードを確認する](https://github.com/ics-creative/230406_inert/blob/main/demo03/index.html)

作例のポイントとして、キーボードフォーカスの順番が自然になるようにDOM構造では開閉ボタンの後ろにメニューを配置しています。

音声読み上げの対策は、`aria-hidden`の指定と同じように必要な数だけ`inert`属性の指定が必要ですが、それ以外の対策はまとめて行えています。

### コラム: その他の注意点

`inert`属性が有効になっている要素は、Chromeの開発者ツールにある「ページ内から要素を選択する」機能で選択できません。デバッグの際によく利用されている方は注意が必要です。

![開発者ツールから選択できない例](https://ics.media/entry/230406/images/230406_note_01.gif)

また、`inert`属性は指定しても画面上の表示は変化しません。属性の切り替わりを視覚的にわかりやすくしたい場合は、個別でスタイルの追加が必要です。

![inert属性を指定してもスタイルが変更されない例](https://ics.media/entry/230406/images/230406_note_02.png)

### まとめ

あらゆるユーザー操作を無効化する`inert`属性について紹介しました。視覚的に表示しつつも、あらゆるユーザー操作を一時的に無効化したいときに役立ちます。使用の際は、各操作の動作確認も忘れずにおこないましょう。

`disabled`属性が利用可能な要素や、操作方法が複雑なUIで`inert`属性を利用したい場合はとくに検討が必要です。今回紹介した作例が参考になれば幸いです。

### 参考サイト

-   [6.3 Inert subtrees - HTML Standard](https://html.spec.whatwg.org/multipage/interaction.html#inert-subtrees)
-   [HTMLElement.inert - MDN](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/inert)
-   [Introducing inert - Chrome Developers](https://developer.chrome.com/articles/inert/)
-   [Non-interactive Elements with the inert attribute - Webkit](https://webkit.org/blog/12578/non-interactive-elements-with-the-inert-attribute/)
-   [Swiperアクセシビリティ改善のススメ - Qiita（@a\_Iwahashi）](https://qiita.com/a_Iwahashi/items/d544ad077946073373a8)