---
title: "HTMLでモーダルUIを作るときに気をつけたいこと"
source: "https://ics.media/entry/220620/"
publishedDate: "2022-06-23"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ダイアログやハンバーガーメニューといったユーザーインタフェース（UI）は、多くのウェブサイトで利用されており頻繁に見かけます。どこでも見かけることから「**簡単に作成できる**」と思われがちですが、**意外と実装が難しいUI**です。たとえば、エンジニアでなくとも、以下のような現象に気付いたことはないでしょうか？

-   ダイアログを表示中に、**裏側のコンテンツがスクロールできてしまった**
-   ダイアログを表示中に、Tabキーでキーボード操作を行うと**裏側を操作できてしまった**

▼裏側がスクロールできてしまう例

![裏側がスクロールできてしまう例](https://ics.media/entry/220620/images/images/demo01_scroll_bug_01.gif)

▼裏側がキーボード操作できてしまう例

![裏側がキーボード操作できてしまう例](https://ics.media/entry/220620/images/images/demo01_focus_bug.gif)

これらを解決するためには、実装で注意する必要があります。本記事では、ダイアログやハンバーガーメニュー等のモーダル系のUIに存在する**気付きづらい問題点**と、解決方法を紹介します。ダイアログとハンバーガーメニューはそれぞれ役割の異なるUIですが、画面全域を覆うUIという意味において同種の問題が発生するので、本記事ではあわせて説明します。

### よくありがちなHTMLの実装を紹介

問題点を示すために、シンプルなHTMLの作例を用意しました。ダイアログとハンバーガーメニューのデモです。それぞれのボタンをクリックすると画面全域を覆うUIが出現し、［閉じる］ボタンをクリックすることで閉じられます。

▼モーダルダイアログの表示

![表示を切り替えるだけのシンプルなモーダルダイアログ](https://ics.media/entry/220620/images/images/demo01_01.gif)

▼ハンバーガーメニューの表示

![表示を切り替えるだけのシンプルなハンバーガーメニュー](https://ics.media/entry/220620/images/images/demo01_02.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220620_fixed_scrolling/demo01.html)
-   コードを確認する
    -   [HTML](https://github.com/ics-creative/220620_fixed_scrolling/blob/main/demo01.html)
    -   [JavaScript](https://github.com/ics-creative/220620_fixed_scrolling/tree/main/src/demo01)

CSSとJavaScriptの制御として、要素に`.is-show`というCSSクラスを付与することで表示させています。

▼モーダルダイアログのコード例

```
// DOM要素の参照を取得
const modalOpenButton = document.querySelector("#js-modal-button");
const modalCloseButton = document.querySelector("#js-modal-close");
const modalOverlay = document.querySelector("#js-modal-overlay");
const modalContent = document.querySelector("#js-modal");

// 開くボタンがクリックされたらモーダルを開く
modalOpenButton.addEventListener("click", () => {
  modalContent.classList.add("is-show");
  document.body.classList.add("is-scrollLock");
});
// 閉じるボタンまたはモーダルの背景がクリックされたらモーダルを閉じる
const closableElement = [modalCloseButton, modalOverlay];
closableElement.forEach((element) => {
  element.addEventListener("click", () => {
    modalContent.classList.remove("is-show");
    document.body.classList.remove("is-scrollLock");
  });
});
```

モーダルの表示中は`<body>`要素にスタイル`overflow: hidden`を設定し、マウスホイールやタッチ操作によるスクロールを無効化しています。

一見、問題なく動作しているように見えますが、以下の2つの課題があります。先ほどの[作例](https://ics-creative.github.io/220620_fixed_scrolling/demo01.html)をブラウザで開きながら問題点を確認していきましょう。

-   課題1: iOS Safariで裏側がスクロールされる現象
-   課題2: 裏側にキーボードフォーカスされる現象

### 課題1: iOS Safariで裏側がスクロールされる現象

スタイル`overflow: hidden`でスクロールを固定していても、iOS Safariでは以下のような特定のタイミングで**裏側のコンテンツがスクロールできてしまいます**。

-   画面下部のタブバーの表示が切り替わるタイミング
-   最前面のコンテンツを上下どちらかにスクロールしきった後に、もう一度スクロールしたタイミング

▼モーダルダイアログの裏側がスクロールされる様子

![モーダルダイアログの裏側がスクロールされる例](https://ics.media/entry/220620/images/images/demo01_scroll_bug_01.gif)

▼ハンバーガーメニューの裏側がスクロールされる様子

![ハンバーガーメニューの裏側がスクロールされる例](https://ics.media/entry/220620/images/images/demo01_scroll_bug_02.gif)

この挙動は、モーダルダイアログ内にスクロール可能なコンテンツが存在する場合に弊害があります。ページ全体のスクロール挙動に影響をうけ、モーダルダイアログ内でのスクロールができなくなります。モーダルダイアログ内にスクロール可能なコンテンツがない場合は問題になりませんが、UIの制約が生まれてしまうので対策を検討したいところです。

#### この課題を対策した作例

この課題を対策するには、以下の方針が考えられます。

-   スクロールをさせたくない要素には`Event`の`preventDefault()`や`stopPropagation()`メソッドでスクロール挙動を抑制
-   スクロール対象の要素を上下どちらかにスクロールしきった時に、スクロール量を微調整

この方針で対策した作例は以下の通りです。

▼モーダルダイアログの裏側を固定する例

![モーダルダイアログの裏側を固定する例](https://ics.media/entry/220620/images/images/demo02_scroll_01.gif)

▼メニューの裏側を固定する例

![メニューの裏側をする例](https://ics.media/entry/220620/images/images/demo02_scroll_02.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220620_fixed_scrolling/demo02.html)
-   コードを確認する
    -   [HTML](https://github.com/ics-creative/220620_fixed_scrolling/blob/main/demo02.html)
    -   [JavaScript](https://github.com/ics-creative/220620_fixed_scrolling/tree/main/src/demo02)

具体的なJavaScriptの実装は次のリンク先から参照ください。

-   [スクロール対象以外の要素を制御](https://github.com/ics-creative/220620_fixed_scrolling/blob/main/src/demo02/logics/scrollLock.ts)
-   [スクロール量の微調整](https://github.com/ics-creative/220620_fixed_scrolling/blob/main/src/demo02/logics/scrollLockFix.ts)

### 課題2: 裏側にキーボードフォーカスされる現象

従来は`div`タグでモーダルUIを作ることが一般的でした。キーボード操作を行うと、モーダルの裏側のコンテンツにフォーカスがあたってしまう問題があります。モーダルダイアログの表示中は背面が操作できないような表示になりますが、Tabキーでフォーカスを移動できています。モーダルダイアログの表示中に**裏側のボタンや入力欄の操作ができる**ため、意図しない動作の起きるリスクが考えられます。

![メニューの裏側がキーボードフォーカスされる例](https://ics.media/entry/220620/images/images/demo01_focus_bug.gif)

もう1つ関連した問題があります。モーダルダイアログの実装においては、`z-index`の重なり順の対策もかねて`<body>`要素の末尾に表示用の要素が置くことあります。その実装をすると、モーダルダイアログの表示直後に**フォーカスがすぐに当たらない**という現象も発生します。

モーダルを開くボタンとダイアログのDOM要素の間に、フォーカス可能なDOM要素が存在するため、フォーカスがモーダルダイアログでない場所にあたってしまいます。

![間にある要素がフォーカスされるコード例](https://ics.media/entry/220620/images/images/demo01_focus_code.png)

#### この課題を対策した作例：dialog要素版

キーボードフォーカスやスクリーンリーダーをケアする最適な手段は、`<dialog>`要素を使うことです。`<dialog>`要素は`showModal()`や`close()`など、ダイアログの開閉に必要なJavaScriptのメソッドが備わっています。次のデモは`<dialog>`要素を利用した実装例です。

![dialog要素を使用したモーダルダイアログ](https://ics.media/entry/220620/images/images/demo03.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220620_fixed_scrolling/demo03.html)
-   コードを確認する
    -   [HTML](https://github.com/ics-creative/220620_fixed_scrolling/blob/main/demo03.html)
    -   [JavaScript](https://github.com/ics-creative/220620_fixed_scrolling/tree/main/src/demo03)

`<dialog>`要素は主要なブラウザの最新版で利用可能です（2022年3月リリースのFirefox 98以上やSafari 15.4以上で利用可能）。

詳細は次の記事を参照ください。

-   [モーダルUIをシンプルにできる！ 進化を続けるHTMLのdialog要素](https://ics.media/entry/250904/)

#### この課題を対策した作例：自前divモーダル

`dialog`要素が普及していない時代は`div`タグでモーダルUIを実装していました。自前の`div`タグで対応するには、複雑なJavaScriptの処理（`keydown`イベントのケア）が必要となります。作例とコードを示すので、詳細を知りたい方はぜひ参考ください。

![メニューのキーボードフォーカスを制御する例](https://ics.media/entry/220620/images/images/demo02_focus.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220620_fixed_scrolling/demo02.html)
-   コードを確認する
    -   [HTML](https://github.com/ics-creative/220620_fixed_scrolling/blob/main/demo02.html)
    -   [JavaScript](https://github.com/ics-creative/220620_fixed_scrolling/tree/main/src/demo02)

#### コラム： キーボードフォーカスの制御をinert属性で実装する

キーボードフォーカスの制御は、`inert`属性を利用して実装することもできます。`inert`属性はあらゆるユーザー操作を無効化するHTMLのグローバル属性で、キーボードフォーカスやスクリーンリーダーによる操作を無効化できます。

紹介した作例では、スクリーンリーダーとキーボードフォーカスの問題を個別に対策しましたが、`inert`属性を利用することでまとめて対策できます。`inert`属性を利用したキーボードフォーカスの制御を次の記事で紹介しています。

-   [ユーザー操作の一括無効化で役立つ！HTMLのinert属性の紹介](https://ics.media/entry/230406/)

#### dialog要素はスクロール挙動の対策に効果はない

`<dialog>`要素はキーボードフォーカスやスクリーンリーダーの対策に利用できますが、前述したiOS Safariのスクロール挙動の対策には効果がありません。別の対策として、CSSの`overscroll-behavior`プロパティを利用することで、`<dialog>`要素でもスクロール挙動の対策ができます。

`overscroll-behavior`プロパティは、主要なブラウザの最新版で利用可能です。`<dialog>`要素と`overscroll-behavior`プロパティを利用したダイアログの実装は、次の記事で紹介しています。

-   [コンテンツのスクロールを制御する、overscroll-behaviorの紹介](https://ics.media/entry/221024/)

### まとめ

モーダル系のUIでの「裏側のコンテンツ」に関する注意点を本記事で紹介しました。「**スクロールの制御**」「**フォーカスの制御**」の両方をケアしないと良いモーダルUIの挙動にはなりません。「ささいなことだから、対策しなくてもいいのでは･･･」となりがちな挙動かもしれませんが、ユーザビリティーやウェブアクセシビリティの観点で改善できれば理想的です。本記事がこれらの問題をケアするために参考となれば幸いです。

※この記事が公開されたのは**3年前**ですが、**4か月前の2025年9月**に内容をメンテナンスしています。