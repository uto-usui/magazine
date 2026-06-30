---
title: "dialogタグで面倒が減る！ 見直したいハンバーガーメニューの作り方"
source: "https://ics.media/entry/260527/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2026-05-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ハンバーガーメニューは、スマートフォン向けウェブサイトでよく使われるナビゲーションUIです。ヘッダーの［≡］ボタンを押すと、リンクの一覧が、現在のページの上に重なって表示されます。

横三本線のボタンが、パン（バンズ）とお肉（パティ）を挟む🍔のように見えることから、慣習的に「ハンバーガーメニュー」と呼ばれています。

新旧さまざまな作り方がありますが、**今はHTMLの`<dialog>`タグで作るのがオススメです！**　2020年代以降に登場した新しめのCSSと組み合わせることで、スマートに作れます。

### 古い作り方を避けたい理由

ハンバーガーメニューは2000年代後半のスマートフォンが出始めた頃よりウェブサイトで流行ってきました。旧式の作り方にどんな課題があったのかを振り返りましょう。もしかしたら「**知らずに使っていた😨**」といったケースもあるかもしれません。

#### はりぼてのdivタグ

ハンバーガーメニューの作例では、`<div>`タグにクラスを付け外しして表示を切り替えるコードを昔からよく見かけます。たとえば、表示状態をクラス名だけで切り替える作り方です。

```
<!-- 表示状態はクラス名で管理する -->
<button class="...">Menu</button>
<div class="... is-open">
  <a href="#">Work</a>
</div>
```

`<div>`タグで作るデメリットのひとつに、メニューをひらいたままTabキーを押すと、**背面のリンクやフォームへフォーカスが移動できる**ことが挙げられます。

作り手は操作できないつもりだったのに、**ユーザーが裏技的に操作できてしまい**、思わぬトラブルにつながります。

#### チェックボックスを使うハック

`<input>`タグのチェックボックスと`<label>`タグで表示を切り替える方法もあります。JavaScriptなしで動かせる点が利点です。

たとえば、チェック状態をメニューの表示状態として使います。

```
<!-- チェック状態でメニューを切り替える -->
<input id="menu-toggle" type="checkbox" />
<label for="menu-toggle">Menu</label>
<nav class="...">...</nav>
```

とはいえ、ナビゲーションをひらく・とじる方法としてはオススメしません。チェックボックスはフォーム部品なので、支援技術には「メニューをひらくボタン」ではなく**「チェックボックス」として伝わります**。

#### dialogタグの利点

そこで役立つのが`<dialog>`タグです。`<dialog>`タグには**モーダルUIを作るための標準機能**があります。

利点

-   `showModal()`でトップレイヤーに表示でき、`z-index`の調整が不要
-   ハンバーガーメニューをひらいている間、Tabキーで背面へフォーカスが移動しない
-   Escapeキーでとじる動作を利用できる
-   背景の暗い座布団レイヤーを`::backdrop`疑似要素で指定できる
-   スクリーンリーダーにもダイアログとして伝わる
-   短いコードで実装できる

▼フォーカストラップが効いていて、下層にフォーカスが移動せず安心

フルスクリーンのメニューやドロワーは、現在のページに全面に重なるレイヤーのため、モーダルUIとして`<dialog>`タグが活用できます。`<dialog>`タグという名称から、アラートダイアログのようなUIを想定されがちですが、幅広くモーダルUI全般にも役立ちます。

`<dialog>`タグの詳細は、記事『[モーダルUIをシンプルにできる！ 進化を続けるHTMLのdialog要素](https://ics.media/entry/250904/)』で紹介していますので、参照ください。

### dialogタグを使った基本形

ハンバーガーメニューの作例をみていきましょう。サンプルの右上の「≡」ボタンで操作できます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260527_hamburger_menu/1_fullscreen.html)
-   [コードを確認する](https://github.com/ics-creative/260527_hamburger_menu/blob/main/1_fullscreen.html)

HTMLのコードの抜粋です。

```
<!-- ひらくボタン -->
<button id="button-open" class="..."></button>

<dialog id="menu" class="...">
  <!-- とじるボタンとナビゲーション -->
  <button id="button-close" class="..."></button>
  <nav class="...">...</nav>
</dialog>
```

JavaScriptでは、ひらく処理に`showModal()`メソッド、とじる処理に`close()`メソッドを使います。

```
buttonOpen.addEventListener("click", () => {
  // モーダルとしてひらく
  menu.showModal();
});
buttonClose.addEventListener("click", () => {
  // メニューをとじる
  menu.close();
});
```

他にも、背景クリックとメニュー内リンクのクリックでも、ハンバーガーメニューをとじられるようにします。詳しくは以下のJavaScriptコードをご確認ください。

-   [JavaScriptを確認する](https://github.com/ics-creative/260527_hamburger_menu/blob/main/scripts/menu.js)

### フルスクリーン型のCSS

`<dialog>`タグをハンバーガーメニューとして利用するためには、いくつかスタイルシートで調整します。[共通CSS](https://github.com/ics-creative/260527_hamburger_menu/blob/main/styles/menu.css)をご覧ください。

-   `<dialog>`タグのブラウザ標準スタイルを上書き
-   `::backdrop`疑似要素
-   背景スクロールの停止

背景スクロールの停止は、共通CSSで指定しています。

```
body:has(dialog[open]) {
  /* 背景ページのスクロールを止める */
  overflow: hidden;
}
```

#### モーション

モーダルの開閉にモーションを加えると、画面転換のインパクトを和らげ、読み手への視線誘導に役立ちます。

モーダルの開閉モーションは、旧来の作り方ではJavaScriptの実装を必要とし、複雑で難しいものでした。ここ最近のCSSを使うことで、開閉モーションを作りやすくなっています。ポイントは、CSSの`@starting-style`と`allow-discrete`アラウ・ディスクリートです。

**@starting-style**

`@starting-style`はCSSトランジションの開始状態を指定できるアットルールです。`<dialog>`タグは初期状態（非表示）→表示→閉じた状態（非表示）と遷移しますが、はじめの初期状態（非表示）を作るのに`@starting-style`が役立ちます。画期的な機能なので覚えておきましょう。

開始時の`opacity`や`translate`は、`@starting-style`にまとめます。

```
.full-menu[open] {
  opacity: 1;
  translate: 0 0;
  @starting-style {
    /* ひらき始めは少し上に置く */
    opacity: 0;
    translate: 0 -24px;
  }
}
```

**transition-behavior: allow-discrete**

もう1つの、`transition-behavior: allow-discrete`は別の概念ですが、モーションの実装には重要な役割を持ちます。`opacity`や`translate`は数値が連続的に変化します（たとえば、`0.0`〜`1.0`は連続している値です）。たいして、`display`は、`block`・`inline`・`none`のように中間の値がないプロパティーです。このような値を「離散値りさんち」といいます。「離散」は英語で「Discreteディスクリート」です。

離散的な`display`プロパティの切り替えはCSSトランジションと相性が悪いものでしたが、`transition-behavior: allow-discrete`を使えば、モーションが完了するまで切り替わりを待ってくれます。

```
.menu-dialog {
  transition:
    /* 離散値の切り替えも待たせる */
    display 1s allow-discrete,
    overlay 1s allow-discrete;
}
```

`@starting-style`の考え方は動画でも解説しています。詳しくはYouTubeの『[かんたんなCSSで入退場アニメーションを！ @starting-styleとallow-discreteを学ぼう](https://www.youtube.com/watch?v=QoIRifrTrxo)』をご覧ください。

なお、モーションが苦手な人にむけては、メディアクエリーの`prefers-reduced-motion`も指定できます。詳しくは記事『[CSSでもアクセシビリティに配慮しよう！ モーション軽減・文字サイズ変更・ダークモードの実装方法 - ICS MEDIA](https://ics.media/entry/210604/)』で解説しています。

#### モーション中の連打防止

忘れてはいけないのは、**モーダルの開閉モーション中の連打防止**です。開閉中にモーダルの中のボタンを触れてしまい、不具合が起きる……という事象はフロントエンド開発者なら一度は経験したことがあるでしょう。

とじている間のクリック抑制のため、次のスタイルを指定します。

-   `pointer-events: none`：ポインターデバイスの操作のみブロック
-   `interactivity: inert`：ポインターとキーボード操作も含めてブロック。HTMLの`inert`属性のCSS版

```
.menu-dialog {
  /* モーション中の操作を止める */
  interactivity: inert;
  pointer-events: none;
}
```

本来は`interactivity: inert`のみでよいのですが、未対応ブラウザがあるため`pointer-events: none`も保険のために指定しています（後述の対象ブラウザを参照ください）。

#### スクロール防止

メニューをひらいている間は、ページ本体のスクロールを止めます。ページ本体が背面で動くと、メニューをとじたあとに表示位置が変わってしまうためです。

メニュー項目が多い場合は、メニュー内だけをスクロールさせます。フルスクリーン型ではメニュー全体、ドロワー型ではパネル内など、レイアウトに合わせてスクロール領域をつくりましょう。

スクロール制御の考え方は、記事『[overscroll-behaviorがお手軽！ モーダルUI等のスクロール連鎖を防ぐ待望のCSS](https://ics.media/entry/221024/)』で詳しく紹介しています。

### ドロワー型

ドロワーというのは画面端から出現するメニューUIのことです。「ドロワーナビ」「スライドナビ」とかさまざまな呼び方がありますが、これもハンバーガーメニューの一種といえます。ドロワー型も、外側は`<dialog>`タグです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260527_hamburger_menu/2_drawer.html)
-   [コードを確認する](https://github.com/ics-creative/260527_hamburger_menu/blob/main/2_drawer.html)

```
<dialog id="menu" class="...">
  <!-- 右から出るパネル -->
  <div class="...">...</div>
  <!-- 三本線ボタンと同じ位置のとじるボタン -->
  <button id="button-close" class="..."></button>
</dialog>
```

フルスクリーン型とドロワー型は、同じJavaScriptで動かしています。

### メニューの中身

ハンバーガーメニューの中身はサイトのレイアウトとして自由に実装できます。作例のバリエーションとして紹介します。

#### 例：アコーディオンを含むハンバーガーメニュー

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260527_hamburger_menu/3_content_accordion.html)
-   [コードを確認する](https://github.com/ics-creative/260527_hamburger_menu/blob/main/3_content_accordion.html)

アコーディオンは`<details>`タグで作っています。

```
<details>
  <!-- 見出し部分 -->
  <summary><span class="...">Residents</span></summary>
  <!-- 展開時に出るリンク -->
  <a href="#">Certificates</a>
  <a href="#">Health services</a>
</details>
```

#### 例：検索フォーム付きハンバーガーメニュー

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260527_hamburger_menu/4_content_extras.html)
-   [コードを確認する](https://github.com/ics-creative/260527_hamburger_menu/blob/main/4_content_extras.html)

### dialogタグのデメリット

`<dialog>`タグでの作り方にもデメリットがあります。よくある「**三本線のメニューボタンが、連続的に×ボタンへ変形する**」ようなモーションは難しくなります。

デモ：[CSSアニメーションで実現！ コピペで使えるマイクロインタラクション - ICS MEDIA](https://ics.media/entry/15130/)

ヘッダーに配置した［≡］ボタンと、`<dialog>`タグ内の［×］ボタンが別々のレイヤーになるため、ひとつのボタンを表示状態に合わせて連続的に変形させる作りとは相性がよくありません。

### コラム：JavaScriptの制御は近い将来不要になる？

最新ブラウザでは、`<button>`タグの`command` / `commandfor`属性で、JavaScriptでの`showModal()`メソッドや`close()`メソッド相当の操作ができます。さらに、`<dialog>`タグに`closedby="any"`を指定すると、座布団としての`::backdrop`疑似要素のクリックでもとじます。そうすれば、コードは大幅に短くできます。

`command`属性の基本は、記事『[モーダルやツールチップで役立つ! HTMLのcommandとinterestfor属性を使って、JSを減らすスマートなUI開発](https://ics.media/entry/260209/)』で紹介しています。

将来的には、次のようなHTMLだけで操作できます。

```
<!-- HTMLだけでdialogをひらく -->
<button commandfor="menu" command="show-modal"></button>

<dialog id="menu" closedby="any">
  <!-- HTMLだけでdialogをとじる -->
  <button commandfor="menu" command="close"></button>
</dialog>
```

2026年5月時点では一世代前のiOS 18 Safariが`command`属性などに未対応です。iOS 18が現存する間はJavaScriptで制御するほうが無難でしょう。2027年〜2028年ごろには、JavaScriptを使わずにハンバーガーメニューを作れる時代がやってくると思います。

### 対応ブラウザ

`<dialog>`タグは、Chrome 37（2014年8月）、Edge 79（2020年1月）、Safari 15.4（2022年3月）、Firefox 98（2022年3月）以上で利用できます。そのため、現行すべてのブラウザで`<dialog>`タグが利用可能と受け取って問題ありません。

参照：[`<dialog>`タグ | Can I use…](https://caniuse.com/dialog)

表示モーションに使っているのは次のCSSです。

-   `@starting-style`は、Chrome・Edge 117（2023年9月）、Safari 17.5（2024年5月）、Firefox 129（2024年8月）以上で利用できます。
-   `transition-behavior`は、Chrome・Edge 117（2023年9月）、Safari 17.4（2024年3月）、Firefox 129（2024年8月）以上で利用できます。
-   `interactivity`プロパティは、Chrome・Edge 135（2025年4月）以上で利用できます。先述のとおり、フォールバックに`pointer-events`を併用します。

参照：

-   [`@starting-style` | Can I use…](https://caniuse.com/mdn-css_at-rules_starting-style)
-   [`transition-behavior` | Can I use…](https://caniuse.com/mdn-css_properties_transition-behavior)
-   [`interactivity` | Can I use…](https://caniuse.com/wf-interactivity)

### コラム：popover属性を使うケース

画面全体を覆わない簡易メニューでは、`<dialog>`タグではなく、`popover`属性を使う作り方もあります。`popover`属性は非モーダルのため、**背面のリンクやフォームは操作できます**。ヘッダー右上から小さな一覧を出す、カテゴリ一覧を一時的に見せる、といった用途に向いています。

小さなメニューなら、`popover`属性と`popovertarget`属性で対応できます。

```
<!-- ボタンが表示対象を指す -->
<button popovertarget="menu-compact"></button>
<div id="menu-compact" popover>...</div>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260527_hamburger_menu/10_compact.html)
-   [コードを確認する](https://github.com/ics-creative/260527_hamburger_menu/blob/main/10_compact.html)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260527_hamburger_menu/11_header_dropdown.html)
-   [コードを確認する](https://github.com/ics-creative/260527_hamburger_menu/blob/main/11_header_dropdown.html)

### UIフレームワークはどうなのか？

UIフレームワークのメニューは、`<dialog>`タグではなく、`<div>`タグで作られていることが多いです。しかしご安心を。フレームワーク側の膨大なJavaScriptの制御によって、フォーカストラップなどケアされていることが多いです。

参考記事：

-   [ウェブ制作にも便利！React & Vueで始めるヘッドレスUI - ICS MEDIA](https://ics.media/entry/230413/)

### まとめ

ハンバーガーメニューを`<dialog>`タグで作る方法を紹介しました。いまも生の`<div>`タグで作られているサイトを見かけたら、Tabキー操作をして、考慮されているかを確認してみるといいでしょう。**もし裏側を操作できたら、改善すべきサインです**。

`<dialog>`タグを使えば、手間なく、高品質なハンバーガーメニューを作れるので、ぜひご検討ください！