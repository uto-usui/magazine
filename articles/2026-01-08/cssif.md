---
title: "便利？　それとも混乱？　CSSのif()関数"
source: "https://ics.media/entry/250919/"
publishedDate: "2025-09-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2025年9月19日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

CSSの仕様の策定を行っているCSS Working Group（CSSWG）では、CSSに`if()`関数を追加する提案が出されています。この`if()`関数は文字通りCSSにおける**分岐を行う関数**です。仕様策定中ではありますが、すでにChrome・Edge 137（2025年5月リリース）より利用可能となっています。この新しい`if()`関数の特性、もたらすメリット、そしてデメリットについて解説します。

![CSS if()関数を使ったアニメーション表現](https://ics.media/entry/250919/images/images/250918_animation.gif)

▼Chrome・Edge 137以降のブラウザでご確認ください

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250918_css_if/)
-   [コードを確認する](https://github.com/ics-creative/250918_css_if)

### if()関数の基本的な使い方

CSSの`if()`関数の基本的な使い方について解説します。`if()`関数はCSSの値を条件分岐するので値部分に記述します。

```
/* --colorの値がprimaryなら赤、それ以外は青 */
.hoge {
  background-color: if(
    style(--color: primary): red;
    else: blue;
  );
}
```

`style(--color: primary)`の部分が条件になります。これは「`--color`というCSS変数の値が`primary`のとき」という条件を表します。この書き方はコンテナースタイルクエリーと同じです。コンテナースタイルクエリーについては記事『[CSSのコンテナースタイルクエリーstyle()の使い方](https://ics.media/entry/240723/)』で解説しています。

条件にはスタイルの他にも`@media`で使うメディア特性や`@supports`で使う機能の有無なども条件に指定できます。複数条件も書けるので上から評価するelse-if的な使い方もできます。

```
/* 画面幅が768px以下のときは赤、それ以外は青 */
.fuga {
  background-color: if(
    media(width <= 768px): red;
    else: blue;
  );
}

/* display: gridが使えるときは赤、それ以外は青 */
.piyo {
  background-color: if(
    supports(display: grid): red;
    else: blue;
  );
}
```

![分岐条件の種類](https://ics.media/entry/250919/images/images/250918_basic_use1.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250918_css_if/basic/)
-   [コードを確認する](https://github.com/ics-creative/250918_css_if/blob/main/src/assets/style/basic.css)

※`if()`関数をサポートするブラウザなら当然`display: grid`が使えるので、赤にしかなりえません。あくまで例として紹介しています。

より具体的な使用例としてはデザインシステムなどにおけるボタンのバリアント管理に利用できます。

```
<button class="buttonVariant" style="--variant: primary;">Button</button>
```

```
/* ボタンバリアントのスタイル。バリアントに応じて背景色、ボーダー色、文字色が変化する */
.buttonVariant {
  background-color: if(
    style(--variant: primary): var(--color-primary);
    style(--variant: secondary): var(--color-secondary);
    style(--variant: tertiary): transparent;
  );
  border-color: if(
    style(--variant: primary): var(--color-primary);
    style(--variant: secondary): var(--color-secondary);
    style(--variant: tertiary): var(--color-tertiary);
  );
  color: if(
    style(--variant: tertiary): var(--color-text);
    else: var(--color-text-inverted)
  );
}
```

![バリアントを出し分けたボタン](https://ics.media/entry/250919/images/images/250918_basic_use2.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250918_css_if/basic/#:~:text=%E4%BB%A5%E5%A4%96%E3%81%AF%E9%9D%92-,%E3%83%9C%E3%82%BF%E3%83%B3%E3%81%AE%E7%A8%AE%E9%A1%9E%E3%82%92%E5%88%87%E3%82%8A%E6%9B%BF%E3%81%88%E3%82%8B,-%E3%83%97%E3%83%A9%E3%82%A4%E3%83%9E%E3%83%AA%E3%83%BC)
-   [コードを確認する](https://github.com/ics-creative/250918_css_if/blob/41f49579415793f7ec8a8ab02cd1c804689af647/src/assets/style/basic.css#L15C1-L53C2)

また`if()`関数はCSS変数の値としても利用できるので、次のようにも書けます。

```
/* ボタンバリアントのスタイル 別の書き方 */
.buttonVariant {
  --background-color: if(
    style(--variant: primary): var(--color-primary);
    style(--variant: secondary): var(--color-secondary);
    style(--variant: tertiary): transparent;
  );
  --border-color: if(
    style(--variant: primary): var(--color-primary);
    style(--variant: secondary): var(--color-secondary);
    style(--variant: tertiary): var(--color-tertiary);
  );
  --text-color: if(
    style(--variant: tertiary): var(--color-text);
    else: var(--color-text-inverted)
  );

  background-color: var(--background-color);
  border-color: var(--border-color);
  color: var(--text-color);
}
```

条件とスタイリングを分離して記述できるのも特徴です。

ボタンバリアントの例では直接インラインスタイルにてCSS変数を渡していましたが、クラス名経由で渡す書き方もできます。タイポグラフィの例では次のように書けます。

```
<p class="typography fontSize-display fontWeight-bold">メロスは激怒した</p>
```

```
.typography {
  font-size: if(
    style(--font-size: display): 48px;
    style(--font-size: heading): 32px;
    style(--font-size: body): 16px;
    style(--font-size: small): 14px;
    else: 16px;
  );
  font-weight: if(
    style(--font-weight: bold): bold;
    style(--font-weight: regular): normal;
    else: normal;
  );
}

.fontSize-display {
  --font-size: display;
}

.fontSize-heading {
  --font-size: heading;
}

.fontSize-body {
  --font-size: body;
}

.fontSize-small {
  --font-size: small;
}

.fontWeight-bold {
  --font-weight: bold;
}

.fontWeight-regular {
  --font-weight: regular;
}
```

![フォントサイズ、ウェイト、カラーに設定によって変化するテキスト](https://ics.media/entry/250919/images/images/250918_font.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250918_css_if/basic/#:~:text=%E3%82%BF%E3%82%A4%E3%83%9D%E3%82%B0%E3%83%A9%E3%83%95%E3%82%A3%E3%81%AE%E7%A8%AE%E9%A1%9E%E3%82%92%E3%82%AF%E3%83%A9%E3%82%B9%E5%90%8D%E3%81%A7%E5%88%87%E3%82%8A%E6%9B%BF%E3%81%88%E3%82%8B)
-   [コードを確認する](https://github.com/ics-creative/250918_css_if/blob/c976a43147ca91260bafc9f8e106c76910962806/src/assets/style/basic.css#L57C1-L91C2)

デザインシステムのデザイントークンとして管理されているようなスタイルにも活用できます。

### 従来技術との違い

CSSに詳しい方ならここまで紹介したものは既存の機能でも実現可能であることにお気づきかもしれません。たとえば、ボタンのバリアントはCSS変数のかわりにクラス名で条件分岐が可能です。

```
.buttonVariant {
  &.primary {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-text-inverted);
  }
  &.secondary {
    background-color: var(--color-secondary);
    border-color: var(--color-secondary);
    color: var(--color-text-inverted);
  }
  &.tertiary {
    background-color: transparent;
    border-color: var(--color-tertiary);
    color: var(--color-text);
  }
}
```

あるいはコンテナースタイルクエリーを用いても同じようなことができます。

```
@container style(--variant: primary) {
  .buttonVariant {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-text-inverted)
  }
}

@container style(--variant: secondary) {
  .buttonVariant {
    background-color: var(--color-secondary);
    border-color: var(--color-secondary);
    color: var(--color-text-inverted);
  }
}

@container style(--variant: tertiary) {
  .buttonVariant {
    background-color: transparent;
    border-color: var(--color-tertiary);
    color: var(--color-text);
  }
}
```

そのため、`if()`関数を使わず既存の技術を用いてもスタイルの出し分けは可能です。ここでは従来技術と`if()`関数の違いについて解説します。

#### 詳細度をあげない

`if()`関数による値の分岐はCSSの詳細度があがりません。1つ目に挙げたクラス名による分岐は詳細度の高低による上書きによって行われています。スタイルが3種類のみのバリエーションであればそこまで問題ありませんが、ここに状態による出し分け、たとえば非活性時、ホバー時のスタイルなどが加わると詳細度の管理が難しくなります。

状態によるスタイルは`:disabled`や`:hover`などの疑似クラスで表現できますが、これらはクラス名と同じ詳細度をもちます。種類×状態によって組み合わせが増大する場合は**詳細度をコントロールする適切なCSSを書く必要**があります。

`if()`関数を用いると詳細度バトルではなく、**仕様の論理に沿って**書けます。次のような仕様のボタンがあったとします。

1.  プライマリー、セカンダリー、ターシャリーの3種類のバリエーションがある
2.  3種類それぞれ非活性時の色、ホバーの色がある
3.  非活性時はホバーによる色の変化がなく、それ以外はホバー時の色が適用される

![複雑な条件によるスタイルをもつボタン](https://ics.media/entry/250919/images/images/250918_complicated.png)

▼background-colorのみ抜粋

```
.buttonVariant {
  &:disabled {
    --isDisabled: true;
  }
  &:hover {
    --isHover: true;
  }
}

.buttonVariant {
 background-color: if(
    style(--variant: primary): if(
      style(--isDisabled: true): var(--color-primary-disabled);
      style(--isHover: true): var(--color-primary-hover);
      else: var(--color-primary);
    );
    style(--variant: secondary): if(
      style(--isDisabled: true): var(--color-secondary-disabled);
      style(--isHover: true): var(--color-secondary-hover);
      else: var(--color-secondary);
    );
    style(--variant: tertiary): if(
      style(--isDisabled: true): transparent;
      style(--isHover: true): var(--color-tertiary-hover);
      else: transparent;
    );
  );
}
```

ただし、これはこれで`if()`がネストされるので可読性が高いとも言えません。可読性が高いが複雑な詳細度による上書きとするか、可読性が低いが仕様に沿った記述ができる`if()`関数を使うかは、開発環境やメンバーの好みなどによって決めていくとよいでしょう。

#### ラッパー要素が必要ない

`if()`関数はコンテナースタイルクエリーと似た性質をもっていますが、コンテナースタイルクエリーを適用するにはその親要素が必要になります。

```
@container style(--variant: primary) {
  .buttonVariant {
    /* 省略 */
  }
}
```

このようにしたい場合にはHTMLは`.buttonVariant`の親要素に分岐のためのスタイルを書く必要があります。

```
<div style="--variant: primary;">
  <button class="buttonVariant">Button</button>
</div>
```

このようなHTML上の制約はレイアウトのスタイリングで問題になることもあります。FlexboxやGridなどは直下の要素に対して作用するので、このようなラッパー要素はスタイリングの取り回しを悪くする可能性があります。ただし、大きめのコンポーネントなどはラッパー要素をはじめからもつ場合もあるので、そのような場合では**ラッパー要素をもたない**という`if()`関数のメリットは薄まるでしょう。

### 応用例

`if()`関数の性質や従来技術との違いを踏まえて、`if()`関数を活用する応用例をいくつか紹介します。

#### グローバルの状態管理への利用

画面幅のサイズをCSS変数として管理し、画面幅に応じたスタイルの変更をメディアクエリーを書くことなく、直接プロパティにて記述できます。

```
@property --window-size {
  syntax: "mobile | tablet | desktop";
  inherits: true;
  initial-value: desktop;
}

:root {
  --window-size: if(
    media(width >= 1024px): desktop;
    media(768px <= width < 1024px): tablet;
    else: mobile;
  );
}

.sizeJudgeBox {
  /* 画面幅ごとにメディアクエリーをかかなくてよい */
  background-color: if(
    style(--window-size: mobile): var(--color-tertiary);
    style(--window-size: tablet): var(--color-secondary);
    style(--window-size: desktop): var(--color-primary);
  );
}

/* デスクトップ幅でのみ表示 */
.desktopOnly {
  display: if(
    style(--window-size: desktop): revert;
    else: none;
  );
}

/* タブレット幅でのみ表示 */
.tabletOnly {
  display: if(
    style(--window-size: tablet): revert;
    else: none;
  );
}

/* モバイル幅でのみ表示 */
.mobileOnly {
  display: if(
    style(--window-size: mobile): revert;
    else: none;
  );
}
```

![画面幅を変えている様子](https://ics.media/entry/250919/images/images/250918_resize.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250918_css_if/globalState/#:~:text=%E3%81%B8%E3%81%AE%E5%88%A9%E7%94%A8-,%E7%94%BB%E9%9D%A2%E3%82%B5%E3%82%A4%E3%82%BA%E3%81%AB%E5%BF%9C%E3%81%98%E3%81%A6%E8%A1%A8%E7%A4%BA%E3%81%8C%E5%A4%89%E3%82%8F%E3%82%8B,-%E7%94%BB%E9%9D%A2%E3%82%B5%E3%82%A4%E3%82%BA%EF%BC%9A%E3%83%87%E3%82%B9%E3%82%AF)
-   [コードを確認する](https://github.com/ics-creative/250918_css_if/blob/c976a43147ca91260bafc9f8e106c76910962806/src/assets/style/globalState.css#L34C1-L52C2)

グローバルな状態をCSS変数にもたせ、それに応じたスタイルの変更を`if()`関数で行うことで、スタイルにおいてメディアクエリーを書かなくてよくなります。個別のメディアクエリーを書かないメリットは、ブレークポイントを`--window-size`変数の算出している部分1箇所で管理できるので、ブレークポイントの変更が容易になることです。

なお、CSS変数の初期値をいきなり`if()`関数で設定するとうまくCSS変数が設定されないようなので`@property`でCSS変数を設定するとよいです。`@property`については記事『[意外？ @propertyがCSSアニメーションを激変させる理由](https://ics.media/entry/241219/)』で解説しています。

カラースキームのような全体のカラー設定にも活用できます。

```
/** カラースキームによって色を変える */
:root {
  --color-1: if(
    style(--color-scheme: type1): #28536B;
    style(--color-scheme: type2): #5BC0EB;
    style(--color-scheme: type3): #36213E;
  );
  --color-2: if(
    style(--color-scheme: type1): #C2948A;
    style(--color-scheme: type2): #FDE74C;
    style(--color-scheme: type3): #554971;
  );
  --color-3: if(
    style(--color-scheme: type1): #7EA8BE;
    style(--color-scheme: type2): #9BC53D;
    style(--color-scheme: type3): #63768D;
  );
}
```

![カラースキームによって色を変える](https://ics.media/entry/250919/images/250918_color_scheme.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250918_css_if/globalState/#:~:text=%E3%82%B5%E3%82%A4%E3%82%BA%EF%BC%9A%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%EF%BC%88%E7%B7%91%E8%89%B2%EF%BC%89-,%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%A0,-%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%A0%E3%82%92)
-   [コードを確認する](https://github.com/ics-creative/250918_css_if/blob/41f49579415793f7ec8a8ab02cd1c804689af647/src/assets/style/globalState.css#L51C1-L79C2)

#### CSSアニメーションへの応用

`if()`関数による条件分岐はCSSアニメーションにおいても活用できます。連続的に値の変化するCSS変数を特定の値以下になったらアニメーションを変える、といったことがCSSのみできるようになりました。たとえばゲームで見るような残りHPによって色の変わるHPバーもCSSのみで実現できます。

![色が変わるHPバー](https://ics.media/entry/250919/images/images/250918_hp.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250918_css_if/cssAnimation/)
-   [コードを確認する](https://github.com/ics-creative/250918_css_if/blob/c976a43147ca91260bafc9f8e106c76910962806/src/assets/style/cssAnimation.css#L1C1-L44C2)

```
@property --is-under-50 {
  syntax: "<integer>";
  inherits: false;
  initial-value: 0;
}

@property --is-under-20 {
  syntax: "<integer>";
  inherits: false;
  initial-value: 0;
}

@property --hp-bar-width {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}

.hpBarInner {
  --is-under-50: sign(var(--hp-bar-width) - 50%);
  --is-under-20: sign(var(--hp-bar-width) - 20%);
  width: var(--hp-bar-width);
  background-color: if(
    style(--is-under-20: -1): #e60c30;
    style(--is-under-50: -1): #e6df0c;
    else: #0ec70b;
  );
  animation: hpBar 3s linear infinite backwards;
}

/* 開始前の溜めと終了後の溜めを作るため20%〜70%の間でアニメーションしている */
@keyframes hpBar {
  0% {
    --hp-bar-width: 100%;
  }
  20% {
    --hp-bar-width: 100%;
  }
  70% {
    --hp-bar-width: 0%;
  }
  100% {
    --hp-bar-width: 0%;
  }
}
```

少し複雑なCSSですが、おおまかには`--hp-bar-width`変数の値を動かしてHPバーの横幅と背景色を変えています。この`--hp-bar-width`変数の値が50%以上は緑、50%未満になったら黄色、20%未満になったら赤く、この条件分岐を`if()`関数で行っています。

`if()`関数は値の一致しか判定できませんが、CSSの関数である`sign()`関数を使うことで疑似的に未満の判定を行うことができます。`sign()`関数は値が0より大きい場合は`1`、0の場合は`0`、0より小さい場合は`-1`を返す関数です。

-   [sign() - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/sign)

この`sign()`関数を使い`--is-under-50`変数と`--is-under-20`変数という2変数を経由することで、`--hp-bar-width`変数の値が50%未満の場合、および20%未満の場合に-1を返すことができます。この変数を`if()`関数で判定することで、条件分岐を行うことができます。

あとは`--hp-bar-width`変数を変動させれば、その値に応じた色と幅になります。今回はCSSアニメーションを用いて連続的に動かしています。

ほかにもJavaScriptを使ったアニメーションとの連携も可能です。

![温度によって顔文字が変わるスライダー](https://ics.media/entry/250919/images/images/250918_temperature.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250918_css_if/cssAnimation/#:~:text=HP%3A-,JavaScript%E3%81%A8%E3%81%AE%E9%80%A3%E5%8B%95,-%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%80%E3%83%BC%E3%82%92%E6%93%8D%E4%BD%9C)
-   [コードを確認する（CSS）](https://github.com/ics-creative/250918_css_if/blob/c976a43147ca91260bafc9f8e106c76910962806/src/assets/style/cssAnimation.css#L46C1-L102C2)
-   [コードを確認する（JavaScript）](https://github.com/ics-creative/250918_css_if/blob/41f49579415793f7ec8a8ab02cd1c804689af647/src/assets/script/slideTemperature.js)

こちらの例も仕組みはHPバーと同じです。スライダーの値をJavaScriptで取得し、CSSに反映しています。従来であれば表示の出し分けのための処理をJavaScriptで行う必要がありました。`if()`関数を使うことでJavaScriptは純粋に値の通知だけを行えばよく、**スタイリングに関する責任をCSSに分離**できます。

#### コンポーネント間のやりとり

前段落のグローバルの状態管理に似た話ですが、コンポーネント間のやりとりにも使えます。とくにReactやVue.jsといったコンポーネントベースのフレームワークではコンポーネント間でスタイルのやりとりは制限されていることも多いです。たとえば、親コンポーネントでホバー状態のとき、子コンポーネントのスタイルを変更するといった制御は意外と面倒です。

以下のようなカードコンポーネントがあったとします。このコンポーネントはカードコンポーネントが親で、子コンポーネントとしてボタンコンポーネントをもっています。

![カードコンポーネントがホバー状態のとき、子コンポーネントのボタンの色が変わる](https://ics.media/entry/250919/images/images/250918_hover.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250918_css_if/betweenComponents/)
-   [コードを確認する](https://github.com/ics-creative/250918_css_if/blob/c976a43147ca91260bafc9f8e106c76910962806/src/assets/style/between.css#L1C1-L10C2)

（デモおよびサンプルコードでは概念を簡略化しているため素のHTMLとCSSで記述しています）

```
/* 純粋なCSSでは可能だが、ReactやVue.jsではできないことが多い */
.cardComponent {
  &:hover{
    .buttonComponent{
      color: red;
    }
  }
}
```

しかし、CSS変数を経由すれば状態による分岐が可能になります。

```
.cardComponent {
  --is-hover: false;
  &:hover{
    --is-hover: true;
  }
}

.buttonComponent {
  background-color: if(
    style(--is-hover: true): #31316d;
    else: #6767d2;);
}
```

ホバー状態などはCSSのほうがJavaScriptより簡便なのでCSSのみで実現できると楽な場面もあります。

ほかにも階層の離れたコンポーネント間のスタイル制御にも使えます。たとえばドラッグ＆ドロップで、ドラッグ中にドロップ可能なエリアの色が変わるような例です。

![ドラッグ＆ドロップでドロップ領域の色が変わる](https://ics.media/entry/250919/images/images/250918_drag_drop.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250918_css_if/betweenComponents/#:~:text=Action%20Button-,%E3%83%89%E3%83%A9%E3%83%83%E3%82%B0%E3%82%A2%E3%83%B3%E3%83%89%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E3%81%AE%E7%8A%B6%E6%85%8B%E4%BC%9D%E6%92%AD,-Drag%20and%20Drop)
-   [コードを確認する](https://github.com/ics-creative/250918_css_if/blob/c976a43147ca91260bafc9f8e106c76910962806/src/assets/style/between.css#L12C1-L59C2)

```
.dropArea {
  /* ドロップ可能な状態のスタイル */
  &.typeA {
    border-color: var(--color-typeA);
    &:not(:has(.draggableItem)) {
      background-color: if(
        style(--dragging-type: A): if(
          style(--is-dragging-over: true): var(--color-typeA-droppable-hover); 
          else: var(--color-typeA-droppable);
        );
        else: transparent;
      );
    }
  }
  &.typeB {
    /* 省略 */
  }
  &.typeC {
    /* 省略 */
  }
}
```

▼スタイル関するもののみ抜粋。別途ドラッグ終了時の処理もあり。

```
/**
 * ドラッグ開始時の処理
 * @param  event {DragEvent}
 */
const handleDragStart = (event) => {
  draggedElement = event.target;
  dragAndDropArea.style.setProperty("--dragging-type", event.target.dataset.type);
  event.dataTransfer.setData("text/type", event.target.dataset.type);
}

/**
 * ドラッグオーバー時の処理
 * @param  event {DragEvent}
 * @param  dropArea {HTMLElement}
 */
const handleDragOver = (event, dropArea) => {
  event.preventDefault(); // デフォルトの動作を防ぐ
  // ドラッグした要素のタイプを取得
  const draggedType = draggedElement.dataset.type;

  // 対象のドロップエリアが空かどうか？出発地点のドロップエリアを対象外とするため。
  const isEmpty = dropArea.querySelector(".draggableItem") === null;

  // ドラッグした要素のタイプとドロップエリアのタイプが一致するか？
  const isSameType = draggedType === dropArea.dataset.droppableType;
  if (isEmpty && isSameType) {
    dragAndDropArea.style.setProperty("--is-dragging-over", "true");
  }
};
```

ドラッグの状態に関する2つのCSS変数を設定しています。ドラッグしている要素を表す`--dragging-type`変数と、ドラッグ中か否かの`--is-dragging-over`変数です。これら2つの変数を共通祖先要素の`.dragAndDropArea`要素にセットし、ドロップ可能な枠の色を変更します。ドロップエリアから見て、ドロップ可能な要素であれば背景色が変わり、ドラッグオーバーされていたら濃い色に変わるという処理をCSSで記述できます。

### if()関数の危険なかおり

`if()`関数は強力なツールですが、使い方によっては危ない面もあります。CSS変数は子孫要素であればその値の上書きが可能です。想定外の上書きで意図しないスタイルが適用されてしまう可能性があります。また、コンポーネント内で使われるCSS変数は同名のCSS変数が複数存在することになります。同じ変数名でも先祖要素の条件により値が変わるので混乱のもとになるかもしれません。

これらの問題は`if()`関数自体の問題というよりはCSS変数の問題です。しかしながら`if()`関数によって条件分岐が可能になるとこれらの問題がより複雑化する可能性をはらんでいます。`if()`関数は**強力な機能である反面、CSS変数をきちんとコントロールしないと混沌としたCSSを生み出す可能性**があります。`if()`関数を使うときはそのスコープ範囲や影響範囲を把握したうえで使うのがよいでしょう。

### まとめ

`if()`関数の性質とその応用について解説しました。強力な反面、複雑なCSSを生む可能性もある諸刃の剣でもあります。また、既存の技術でも同じことができる場合もあります。そのため、`if()`関数は斬新で話題性のある機能ですが、必須で習得すべき技術でもないでしょう。ただ知っておくと、そして節度をもって使うことで困ったときに助けてくれるかもしれません。