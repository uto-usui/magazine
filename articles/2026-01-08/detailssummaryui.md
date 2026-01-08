---
title: "detailsとsummaryタグで作るアコーディオンUI - アニメーションのより良い実装方法"
source: "https://ics.media/entry/220901/"
publishedDate: "2022-09-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

アコーディオン型ユーザーインターフェイス（UI）はウェブページでよくみられる表現です。巷ではさまざまな方法でアコーディオンUIを作る方法が紹介されていますが、みなさんはどのような方法で実装していますか？　見た目だけでなくアクセシビリティ対策までしっかりとできているでしょうか？

`<details>`要素と`<summary>`要素は、アコーディオンUIを実装するのに最適です。過去にIE対策として`<button>`要素や`<div>`要素、`<input>`要素などでアコーディオンUIを作っていた方は、**アクセシビリティ対策が簡単にできるので、`<details>`要素と`<summary>`要素の採用がオススメ**です。

この記事では、`<details>`要素と`<summary>`要素がアコーディオンUIに最適と言える理由と、HTMLのマークアップからCSSでのスタイリング、JavaScriptでのアニメーション制御まで順を追ってアコーディオンUIの作り方をご紹介します。

### アコーディオンUIを作る際によくある課題

`<details>`要素と`<summary>`要素は[HTML 5.1](https://www.w3.org/TR/2016/REC-html51-20161101/)（リンク先は2016年当時の仕様書）で登場した比較的新しいタグです。IEサポート終了前の対策としてなのか、`<button>`要素や`<div>`要素、`<input>`要素の`type="checkbox"`などに開閉の動作を追加した作例がアコーディオンUIの作り方として多く見られます。これらはアコーディオンのような開閉動作は作れるものの、以下のようにさまざまな面で課題があります。

#### コード面

HTMLの構造が複雑。本来の使用用途からずれてしまっているタグで作ると、ひと目見ただけでは何を表すのかが分かりにくいでしょう。

▼`<input>`要素で作った例

```
<input id="accordion" type="checkbox" class="open" />
<label class="summary" for="accordion">概要</label>
<div class="content">コンテンツ詳細</div>
```

#### 実装工数の面

必要最低限のアコーディオンの開閉の動きを作る場合でもCSSを使った実装が必須です。

#### アクセシビリティ面・ユーザビリティ面

-   キーボード操作の対策を行わなければ、タブフォーカスを行えないことが多いです。エンターキーやスペースキーによるアコーディオンの開閉操作もJavaScriptなしではできません。
-   スクリーンリーダーの対策を行わなければ、開閉状態を読み上げてくれることはありません。
-   サイト内単語検索でアコーディオンの中にある単語が引っかからないことはありがちです。また単語が引っかかったとしてもアコーディオンが開かず、単語を見つけられないことがあります。

### アコーディオンUIを作る際に`<details>`要素と`<summary>`要素を使うメリット

課題がわかったところで、今度はアコーディオンUIで`<details>`要素と`<summary>`要素を使うメリットを見てみましょう。先にあげた課題点をすべてカバーでき、アクセシビリティ面ではとくに優れていると言えます。

#### コード面

HTMLの構造がシンプル。タグ名から構造を理解できることがおわかりいただけるでしょう。

```
<details>
  <summary>概要</summary>
  コンテンツ詳細
</details>
```

#### 実装工数の面

必要最低限のアコーディオンの開閉動作を作る場合にはCSSは不要で、HTMLだけで十分です。

#### アクセシビリティ面・ユーザビリティ面

**特別なケアをしなくてもアクセシビリティ面で最適化されています。**

-   JavaScriptでキーボードイベントを登録することなく、タブフォーカスとエンターキー・スペースキーでの開閉操作ができます。
    
-   スクリーンリーダーが開閉状態について適切に読み上げてくれます。たとえばmacOSのVoiceOverを使ってGoogle Chromeを読み上げさせてみましょう。アコーディオンが閉じている状態では「（概要文）下位項目が折りたたまれました、三角形の展開ボタン、グループ」、開いている状態では「（概要文）字間広く、三角形の展開ボタン、グループ」のように開閉状態を判断した内容が読まれます。
    
-   サイト内で単語検索を行うと、検索した単語の含まれるアコーディオンが開き、中身の単語に直接移動できます。
    

![アクセシビリティに優れたアコーディオン](https://ics.media/entry/220901/images/images/220906_accordionUI_accessibility.gif)

以上で、`<details>`要素と`<summary>`要素が最適と言える理由を説明しました。つづいて、STEP1〜3の手順でアコーディオンUIを作成していきましょう。

### STEP 1: HTMLでマークアップ

概要文などを入れる`<summary>`要素を`<details>`要素で囲うと基本的な形ができます。つづいて、`<summary>`要素の下に、コンテンツ詳細文などの折りたたませておく部分をマークアップすればアコーディオンが完成です。以下の例では折りたたまれている部分にタグをつけていませんが、この部分にはさまざまなタグが使えます。

▼基本的なHTMLの形

```
<details>
  <summary>概要</summary>
  折りたたまれている部分です。
</details>
```

ブラウザーで確認してみましょう。なんと**たった2つのタグを使うだけでアコーディオンを開閉**できました！

▼基本的なHTMLで作ったアコーディオンの動作

![基本的なHTMLで作ったアコーディオン](https://ics.media/entry/220901/images/images/220906_accordionUI_step1.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220831_details_summary_accordion/demo1/index.html)
-   [コードを確認する](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo1/index.html)

#### name属性の指定でグループ化

複数の`<details>`要素に同じ値を持つ`name`属性を指定すると、グループ内でひとつのアコーディオンだけが開き、そのほかは自動で閉じられます。

```
<details name="accordion">
  <summary>アコーディオン１</summary>
  中身
</details>
<details name="accordion">
  <summary>アコーディオン２</summary>
  中身
</details>
```

▼左：すべてのアコーディオンが個別に開く、右：グループでひとつだけが開く ![name属性を指定すると排他的なアコーディオンになる](https://ics.media/entry/220901/images/images/250507_accordionUI_name.gif)

対応ブラウザー：[HTML element: details: name | Can I use…](https://caniuse.com/mdn-html_elements_details_name)

### STEP 2: CSSでスタイリング

次にCSSで見た目を変えていきます。以下のようなアイコンを持つ、アコーディオンUIを作成します。

![CSSでスタイリングした例](https://ics.media/entry/220901/images/images/220906_accordionUI_step2.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220831_details_summary_accordion/demo2/index.html)
-   コードを確認する（[HTML](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo2/index.html)、[CSS](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo2/style.css)）

まず、アイコンを変えるため表示されているデフォルトの三角形アイコンを消しましょう。初期値の`display: list-item`で三角形アイコンが表示されている状態なので`display`プロパティの値を変更するか、`list-style-type: none;`を指定すると非表示になります。

```
summary {
  /* display: list-item;以外を指定してデフォルトの三角形アイコンを消します */
  display: block;
  /** もしくは、以下を指定する方法でもOK */
  list-style-type: none;
}
```

そのほか、`::marker`疑似要素の`content`プロパティに空文字を指定することでも非表示にできますが、Safariは三角形アイコンの表示方法が異なるためこの指定は効きません。前述のいずれかの指定をオススメします。

```
summary::marker {
  content: "";
}
```

注意点として、Safari 18.4（2025年4月リリース）未満では`-webkit-details-marker`というCSSの疑似要素で三角形アイコンが表示されていました。対応したいバージョンに応じて別途指定しておくとよいでしょう。

```
/* Safariで表示されるデフォルトの三角形アイコンを消します */
summary::-webkit-details-marker {
  display: none;
}
```

つづいて、新しくアイコンを作っていきます。アイコン用タグを追加する場合は以下のように`<span>`要素等をHTMLに追加します。アイコン自体のCSSは長くなるのでソースコードを参照ください。

```
<details>
  <summary>概要<span class="icon"></span></summary>
  折りたたまれている部分です。
</details>
```

`<summary>`要素のアイコンとテキストのレイアウトを整えていきましょう。今回は`display: grid`を使いました。

▼アイコンとテキストのレイアウトを調整するサンプルCSS（一部抜粋）

```
summary {
  display: grid; /* 初期値の display: list-item 以外を指定したので、デフォルトの三角形アイコンは非表示になる */
  grid-template-columns: 1fr 24px;
  gap: 6px;
  align-items: center;
  padding: 16px 24px;
}
```

#### CSSでアイコンをアニメーションさせる

以下のように`details[open]`セレクターでアコーディオンが開いたときのスタイルを登録し、アイコンをアニメーションさせることが可能です。

```
.icon {
  /* 省略 */

  transition: transform 0.4s;
}

/* アコーディオンが開いた時のスタイル */
details[open] .icon {
  transform: rotate(180deg);
}
```

#### Safariの注意点

[サンプルコード](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo2/style.css#L45-L64)に`<summary>`タグの`after`擬似要素でアイコンを作るバージョンを用意しました。より簡潔なDOM構造にしたい場合に採用することも多い手法でしょう。

しかし、Safari 17.4（2024年3月リリース）以前で`before`・`after`といったCSS疑似要素が`transform: rotate()`でトランジションしないバグがあるので注意が必要です。アイコンをアニメーションさせたい場合は、前述したアイコン用タグを用意する方法がオススメです。

### STEP 3-A: 開閉アニメーション（CSSのみ）

クリックまたはキーボード操作によって、アコーディオンがアニメーションしながら開閉するという動きを作っていきましょう。一部のブラウザーで対応しているCSSだけを用いた実装と、全ブラウザーに対応しているJavaScriptを使用した2種類の実装方法を紹介します。

#### CSSだけで開閉アニメーションをつける方法（一部のブラウザーのみ対応）

![CSSで開閉アニメーションをつけた作例](https://ics.media/entry/220901/images/images/250507_accordionUI_step3-0.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220831_details_summary_accordion/demo3-0/index.html)
-   コードを確認する（[HTML](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo3-0/index.html)、[CSS](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo3-0/style.css)）

`<details>`要素の中身が表示される時に付与される`open`属性は、アコーディオンのクリック時に付与状態が切り替わります。仮に詳細コンテンツに対して開閉アニメーションを指定したとしても、閉じはじめた瞬間に`open`属性はすでに取り除かれているため、アニメーションが見られないという問題がありました。

これを解消するのが`::details-content`疑似要素です。

![details-content](https://ics.media/entry/220901/images/images/250507_accordionUI_details_content.png)

`::details-content`疑似要素の`transition`プロパティに対し、アニメーションさせたいプロパティと値に加え、`content-visibility （アニメーションさせたい秒数）s allow-discrete`を指定します。これで表示状態を保ったまま、開閉アニメーションが再生されます。

```
details {
  /* --------アコーディオンの中身のスタイル-------- */
  &::details-content {
    transition:
      height 0.4s,
      opacity 0.4s,
      content-visibility 0.4s allow-discrete;
    height: 0;
    opacity: 0;
    overflow: clip;
    background-color: #f0f2ff;
  }

  /* --------アコーディオンの中身のスタイル（開いている時）-------- */
  &[open]::details-content {
    opacity: 1;
  }

  /* アコーディオンが開いた時のスタイル */
  &[open] .icon {
    transform: rotate(180deg);
  }
}

@supports (interpolate-size: allow-keywords) {
  :root {
    interpolate-size: allow-keywords; /* height:0（数値型） → auto（文字型） のアニメーションを可能にするための指定 */
  }
  details[open]::details-content {
    height: auto;
  }
}

/* height:0→autoへのアニメーションが対応していない場合は、固定値にアニメーションさせる */
@supports not (interpolate-size: allow-keywords) {
  details[open]::details-content {
    height: 150px;
    overflow-y: scroll;
  }
}
```

対応ブラウザーは以下の通りで、2025年5月時点ではChromeとEdgeが完全に対応しています。Safariは`interpolate-size: allow-keywords;`（`height`プロパティの値を`0`から`auto`へ変換を可能にさせるための設定）が未対応のため、固定数値へのアニメーション（※）をフォールバックとして指定しています。Firefoxは未対応のためアニメーションされません。

-   [CSS selector: ::details-content | Can I use…](https://caniuse.com/mdn-css_selectors_details-content)
-   [CSS property: interpolate-size | Can I use…](https://caniuse.com/mdn-css_properties_interpolate-size)

※ 高さを固定値でアニメーションする場合、コンテンツの量に応じた可変対応ができなくなるため、表示領域が狭すぎたり逆に余分に広く見える可能性があります。

### STEP 3-B: 開閉アニメーション（JS併用）

#### JavaScriptで開閉アニメーションをつける方法（全ブラウザー対応）

ブラウザー標準機能である`Web Animations API`を使ってアコーディオンの中身をアニメーションさせます。 アニメーションライブラリ等はお好みのものを使うとよいでしょう。迷ったときは『[現場で使えるアニメーション系JSライブラリまとめ](https://ics.media/entry/14973/)』をご覧ください。

▼今回作る作例

![JavaScript操作を加えた作例](https://ics.media/entry/220901/images/images/220906_accordionUI_step3-1.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220831_details_summary_accordion/demo3-1/index.html)
-   コードを確認する（[HTML](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo3-1/index.html)、[CSS](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo3-1/style.css)、[JavaScript](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo3-1/webAnimationsApiAccordion.js)）

JavaScript実装にあたってHTMLとCSSを少し変えます。まずHTMLにJavaScript操作用のクラスを追加し、折りたたまれている部分（`<summary>`要素の下）は二重の`<div>`要素で囲うようにしました。

▼中身をアニメーションさせるために変更したHTML

```
<details class="js-details">
  <summary class="js-summary">概要<span class="icon"></span></summary>
  <div class="content js-content">
    <div class="content_inner">折りたたまれている部分です。</div>
  </div>
</details>
```

次に、外側の`<div>`要素である`content`クラスにCSSで`overflow: hidden`を指定します。そして内側の`<div>`要素である`content_inner`クラスに対して、`padding`を指定します。**`<details>`タグ直下である`content`クラスには上下の`padding`を指定しないことがポイント**です。上下`padding`を指定するとアニメーションするときにカクついてしまうためです。

▼中身をアニメーションさせるために変更したCSS（一部抜粋）

```
/* --------アコーディオンの中身のスタイル-------- */
.content {
  overflow: hidden;

  /* details直下のタグにpaddingを設定すると挙動がおかしくなるので、ここには指定しない */
}

.content_inner {
  padding: 24px 48px;
}
```

#### アニメーションの登録

HTMLとCSSの準備ができたところで、JavaScriptの実装に入ります。まず、中身の`js-content`を表示・非表示させるアニメーションを登録します。 今回は高さと透明度を変えるシンプルなアニメーションを用意しました。

```
/**
 * アニメーションの時間とイージング
 */
const animTiming = {
  duration: 400,
  easing: "ease-out",
};

/**
 * アコーディオンを閉じるときのキーフレームを作成します。
 * @param content {HTMLElement}
 */
const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + "px", // height: "auto"だとうまく計算されないため要素の高さを指定する
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];

/**
 * アコーディオンを開くときのキーフレームを作成します。
 * @param content {HTMLElement}
 */
const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
];
```

#### クリックイベントの登録

次に、`<summary>`要素に対してクリックイベントを登録します。`<details>`要素は`open`属性の有無（論理属性）によってアコーディオンの中身を表示・非表示と切り替えています。`<details>`要素の`open`プロパティ（論理値）で開閉状態の判定が可能なので、`details.open`で判定して、先ほど登録したアニメーションを実行します。

ところが、**`<details>`要素から`open`属性が取り除かれると中身は一瞬で非表示に**なってしまいます。これではいくらアニメーションさせても見えません（`display: none`のようなイメージ）。そこで、アニメーションを表示させるため`<summary>`要素のクリックイベントに`preventDefault()`メソッドを追加してデフォルトの挙動を無効化します。

また、デフォルトの挙動を無効化すると当然アコーディオンの開閉操作ができなくなってしまうので、手動で`open`属性の切り替えを行います。アコーディオンが**開くときはクリック時に`open`属性を付与し、閉じるときはアニメーション完了後に`open`属性を取り除きます。**

```
const details = document.querySelector(".js-details");
const summary = document.querySelector(".js-summary");

summary.addEventListener("click", (event) => {
  // デフォルトの挙動を無効化
  event.preventDefault();

  // detailsのopen属性を判定
  if (details.open) {
    // アコーディオンを閉じるときの処理
    // ...略

    // アニメーションを実行
    const closingAnim = content.animate(
      closingAnimKeyframes(content),
      animTiming,
    );

    closingAnim.onfinish = () => {
      // アニメーションの完了後にopen属性を取り除く
      details.removeAttribute("open");
    };
  } else {
    // アコーディオンを開くときの処理
    // open属性を付与
    details.setAttribute("open", "true");

    // アニメーションを実行
    const openingAnim = content.animate(
      openingAnimKeyframes(content),
      animTiming,
    );

    // ...略
  }
});
```

お気づきの方もいるかもしれませんが、開くときには表示状態になってから中身がアニメーションするので、普通なら手動で`open`属性をつける必要はないはずです。しかし、Safariでアニメーションされないバグがあるため、開くとき・閉じるときどちらに対しても、手動で`open`属性を切り替えるようにしてあります。

▼アニメーションの実行・`open`属性の切り替えタイミングは異なる

![アニメーションの実行とopen属性の切り替えタイミングを整理したタイムライン](https://ics.media/entry/220901/images/images/220906_accordionUI_timeline.png)

詳しい解説は省略しますが、アイコンのアニメーションを行うタイミングを管理するため、`is-opened`クラスをサンプルコードには追加しています。どのタイミングでアイコンが動作するのかぜひ確認してみてください。

#### 連打対策

これで中身がアニメーションして開閉するようになりました。しかしこのままでは不完全です。連打するとアニメーション実行中に次のアニメーションが始まってしまい、アニメーションの挙動が不安定になります。

そこでアニメーション中に連打しても開閉状態が切り替わらないように対策します。今回は連打防止用の`data-anim-status`というカスタムデータ属性を用意し、値`running`でアニメーション状態を管理する処理を追加しました。アニメーション中だけ値を入れておき、値が入っている間はクリックしてもリターンするようにします。JavaScriptでは`dataset.animStatus`で、用意したカスタムデータ属性への参照が行えます。

▼連打防止用の処理を追加したJavaScript（一部抜粋）

```
summary.addEventListener("click", (event) => {
  // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
  if (details.dataset.animStatus === "running") {
    return;
  }

  // detailsのopen属性を判定
  if (details.open) {
    // ...略
    // アニメーション実行中用の値を付与
    details.dataset.animStatus = "running";

    closingAnim.onfinish = () => {
      // アニメーションの完了後に値を取り除く
      details.dataset.animStatus = "";
    };
  } else {
    // ...略
    // アニメーション実行中用の値を付与
    details.dataset.animStatus = "running";

    openingAnim.onfinish = () => {
      // アニメーションの完了後に値を取り除く
      details.dataset.animStatus = "";
    };
  }
});
```

#### 注意点

`<details>`要素にクリックイベントを追加すると、開いた中身の部分もクリックできてしまいます。**クリックイベントは`<summary>`要素に対して追加する**ようにしましょう。

#### おまけ：連打対応バージョン

アコーディオンの開閉アニメーション途中でもクリックできる、連打対応バージョンも用意しました。連打してみると挙動の違いがわかるでしょう。詳しくはデモとサンプルコードをご覧ください。作成にはJavaScriptアニメーションライブラリGSAPジーサップを使っています。

![連打対応アコーディオン](https://ics.media/entry/220901/images/images/220906_accordionUI_step3-2.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220831_details_summary_accordion/demo3-2/index.html)
-   [コードを確認する](https://github.com/ics-creative/220831_details_summary_accordion/blob/main/demo3-2/gsapAccordion.js)

### まとめ

アコーディオン型UIを`<details>`要素と`<summary>`要素で作ると得られるメリットから、詳しい作り方までを紹介しました。 実装するデザインに応じて、以下のように段階を踏んで手を加えてくとよいでしょう。

-   とりあえずアコーディオンUIをお手軽に作りたい→HTMLだけで
-   アコーディオンUIの見た目にこだわって作りたい→HTML・CSSで
-   アコーディオンUIの見た目も動きもこだわって作りたい→HTML・CSS・JavaScriptで

アコーディオンUIを作る際のさまざまな課題ケアには、`<details>`要素と`<summary>`要素が最適です。ぜひ使っていきましょう。

#### 参照記事

-   [<details>:詳細折りたたみ要素 - MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/details)
-   [<summary>:概要明示要素 - MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/summary)
-   [Web Animations API を利用する - MDN](https://developer.mozilla.org/ja/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
-   [HTML Living Standard - The details element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element)