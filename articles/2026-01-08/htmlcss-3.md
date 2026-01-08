---
title: "HTML・CSSのおさらい! アイコンとテキストを横並びに配置する方法まとめ"
source: "https://ics.media/entry/220126/"
publishedDate: "2022-01-27"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

視覚的に情報を伝えられる「アイコン」は、ボタンやナビゲーションなどのUIによく使用されています。なかでもアイコンとテキストを横並びにするレイアウトは実務で組む場面が多くあります。

横並びのレイアウトはさまざまな実装方法が存在し、それぞれに注意すべき点があります。たとえば、Flexboxで横並びのレイアウトを作ると以下のようなレイアウト崩れが発生する場合があります。経験したことのあるHTMLコーダーの方もいるのではないでしょうか？

![見落としがちな注意点の紹介](https://ics.media/entry/220126/images/intro.jpg)

さらに、アニメーションやアクセシビリティも考慮すると実装方法に向き不向きがあります。この記事では横並びのレイアウトを例に、4つの実装方法とその注意点を紹介します。

※この記事のサンプルコードでは、CSSクラスの親子関係をわかりやすくするためにCSSネスト記法を使用しています。

### レイアウトの実装方法

まずはレイアウトの実装方法から紹介します。以下の条件で次の赤枠のUIを作成してみます。

-   アイコンはSVG形式のものを使用する
-   テキストが長い場合には、折り返されるようにする
-   テキストが折り返された場合もアイコンは上下中央に固定する

![レイアウトの実装サンプル](https://ics.media/entry/220126/images/layout_sample.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220113_align_icon_text/pages/01-layout/)
-   [コードを確認する](https://github.com/ics-creative/220113_align_icon_text/tree/main/pages/01-layout)

このような条件とデザインを題材に、4つの実装方法をみていきます。

#### パターン1: テキスト要素のbackground-imageを使用する

テキスト要素の`background-image`プロパティーにアイコンを設定する方法です。紹介する方法の中でもよりシンプルなコードで実装できます。アイコンの位置は`background-position`で調整をしています。

▼パターン1の実装例

```
<ul class="menu">
  <li class="menu-item">
    <a href="" class="button-01 fav">お気に入り</a>
  </li>
  <li class="menu-item">
    <a href="" class="button-01 message">メッセージ</a>
  </li>
  <li class="menu-item">
    <a href="" class="button-01 trash">ごみ箱</a>
  </li>
</ul>
```

```
.button-01 {
  display: block;
  width: 100%; 
  /* アイコンのスペースを確保したpadding-leftを設定する */
  padding: 16px 16px 16px 40px;
  background-color: #fff;
  // 左から16pxの上下中央に背景画像を配置
  background-position: left 16px center;
  background-repeat: no-repeat;
  background-size: 16px 16px; 
  /* 折り返しの対応 */
  overflow-wrap: break-word;
  &.fav {
    background-image: url("../../images/icon_star.svg");
  }
  &.message {
    background-image: url("../../images/icon_mail.svg");
  }
  &.trash {
    background-image: url("../../images/icon_trash_can.svg");
  }
}
```

アイコンはテキスト要素の`background-image`プロパティーで実装しているので、表示可能な領域がテキスト要素のサイズに依存していることに注意してください。今回はテキスト要素の`padding-left`プロパティーを調整してアイコンを表示するためのスペースを確保しています。

![padding-leftの範囲](https://ics.media/entry/220126/images/layout_padding_left.jpg)

#### パターン2: テキスト要素の疑似要素（::before / ::after）とpositionプロパティを使用する

テキスト要素の疑似要素に`background-image`プロパティーを設定して、`position`プロパティーで位置を調整する方法です。

▼パターン2の実装例

```
<ul class="menu">
  <li class="menu-item">
    <a href="" class="button-02 fav">お気に入り</a>
  </li>
  <li class="menu-item">
    <a href="" class="button-02 message">メッセージ</a>
  </li>
  <li class="menu-item">
    <a href="" class="button-02 trash">ごみ箱</a>
  </li>
</ul>
```

```
.button-02 {
  display: block;
  width: 100%;
  /* アイコンのスペースを確保したpadding-leftを設定する */
  padding: 16px 16px 16px 40px;
  position: relative;
  background-color: #fff;
  /* 折り返しの対応 */
  overflow-wrap: break-word;
  &::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    position: absolute;
    left: 16px;
    /* top: 50%;と、transform: translateY(-50%) で上下中央に配置 */
    top: 50%;
    transform: translateY(-50%);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  &.fav::before {
    background-image: url("../../images/icon_star.svg");
  }
  &.message::before {
    background-image: url("../../images/icon_mail.svg");
  }
  &.trash::before {
    background-image: url("../../images/icon_trash_can.svg");
  }
}
```

パターン1のように`padding-left`プロパティーの値を調整してアイコンのスペースを確保します。アイコンには`top: 50%;`と`transform: translateY(-50%);`を設定して、テキスト要素の上下中央に設置されるように実装しています。

`position`プロパティーで位置を調整するこの方法は、後述するパターン3・4のFlexboxを使用した実装では設置しづらい位置にアイコンを設置できます。

#### パターン3: テキスト要素にFlexboxを設定 ＋ 子要素（span）に疑似要素を設定する

テキスト要素にFlexboxを設定して、その子要素`span`タグの疑似要素にアイコンを設定する方法です。

▼パターン3の実装例

```
<ul class="menu">
  <li class="menu-item">
    <a href="" class="button-03">
      <span class="button-03-icon fav"></span>
      <span class="button-03-text">お気に入り</span>
    </a>
  </li>
  <li class="menu-item">
    <a href="" class="button-03">
      <span class="button-03-icon message"></span>
      <span class="button-03-text">メッセージ</span>
    </a>
  </li>
  <li class="menu-item">
    <a href="" class="button-03">
      <span class="button-03-icon trash"></span>
      <span class="button-03-text">ごみ箱</span>
    </a>
  </li>
</ul>
```

```
.button-03 {
  padding: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  /* 折り返しの対応 */
  overflow-wrap: break-word;
  .button-03-icon {
    /* アイコンの縮小を防ぐ */
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    position: relative;
    background-size: contain;
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    &.fav::before {
      background-image: url("../../images/icon_star.svg");
    }
    &.message::before {
      background-image: url("../../images/icon_mail.svg");
    }
    &.trash::before {
      background-image: url("../../images/icon_trash_can.svg");
    }
  }
  .button-03-text {
    /* 横幅の可変を維持した折り返しを行う */
    min-width: 0;
  }
}
```

この方法はパターン1・2のようなアイコンのスペースを計算する必要がないので、アイコンを変更した際も`padding-left`の**再計算が不要**となります。また、Flexboxのプロパティーを使用できるため細かいレイアウト調整が可能です。

Flexboxの初期値はFlexアイテムがサイズによって伸縮するようになっています。そのため、**テキストが折り返すほどの文字数を設定するとテキスト要素は拡大されて、アイコン要素は縮小される**ことに注意してください。テキストの折り返しも考慮して、アイコン要素に`flex-shrink: 0;`を設定して縮小されないよう対策しています。

![アイコンの縮小サンプル](https://ics.media/entry/220126/images/layout_icon.jpg)

また、横方向のFlexアイテムは横幅に関連する初期値の影響で、**親要素であるFlexコンテナーの`overflow-wrap: break-word;`が効きません。** 折り返したいFlexアイテムに対して、横幅の最大値が決まっている場合は`max-width`プロパティー、横幅の可変を維持したい場合は`min-width: 0;`を指定することで折り返しを再現できます。

参考記事

-   『[Flexbox レイアウトで内容がはみ出す理由 - Days on the Moon](https://nanto.asablo.jp/blog/2016/04/03/8063943)』
-   『[Flexbox からコンテンツはみ出る問題を完全に解決する - Qiita](https://qiita.com/mpyw/items/dfc63c1fed5dfc5eda26)』

![テキストが見切れるサンプル](https://ics.media/entry/220126/images/layout_overflow_wrap.jpg)

#### パターン4:テキスト要素にFlexboxを設定 ＋ 子要素（インラインSVG）を追加する

テキスト要素にFlexboxを設定して、子要素にインラインSVGを直接追加する方法です。2025年4月現在、[X](https://x.com/)のウェブサイトのナビゲーションは、この方法に近い実装がされています。

![Xのナビゲーション比較](https://ics.media/entry/220126/images/250422_animation_sns.png)

▼パターン4の実装例

```
<ul class="menu">
  <li class="menu-item">
    <a href="" class="button-04">
      <svg
        class="button-04-icon"
        viewBox="0 0 512 512"
        width="32"
        height="32"
      >
        <!-- SVGの中身はサンプルファイルを参照下さい -->
      </svg>
      <span class="button-04-text">お気に入り</span>
    </a>
  </li>
  <li class="menu-item">
    <a href="" class="button-04">
      <svg
        class="button-04-icon"
        viewBox="0 0 512 512"
        width="32"
        height="32"
      >
        <!-- SVGの中身はサンプルファイルを参照下さい -->
      </svg>
      <span class="button-04-text">メッセージ</span>
    </a>
  </li>
  <li class="menu-item">
    <a href="" class="button-04">
      <svg
        class="button-04-icon"
        viewBox="0 0 512 512"
        width="32"
        height="32"
      >
        <!-- SVGの中身はサンプルファイルを参照下さい -->
      </svg>
      <span class="button-04-text">ごみ箱</span>
    </a>
  </li>
</ul>
```

```
.button-04 {
  display: flex;
  align-items: center;
  /* アイコンの縮小を防ぐ */
  flex-shrink: 0;
  width: 100%;
  padding: 16px;
  background-color: #fff;
  /* 折り返しの対応 */
  overflow-wrap: break-word;
  .button-04-icon {
    /* アイコンの縮小を防ぐ */
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    fill: #4b4b4b;
    margin-right: 8px;
  }
  .button-04-text {
    /* 横幅の可変を維持した折り返しを行う */
    min-width: 0;
  }
}
```

SVGの一部プロパティーをCSSで操作できるため、`background-image`プロパティーで実装するよりもSVGに対して細かい操作が行えます。今回はCSSで`fill`プロパティーを操作して色を変更しています。

複雑な図形をSVGに書き出す場合はコード量も多くなるので、HTMLに直接追加するとコードの見通しが悪くなることに注意してください。

### レイアウトの実装方法ごとにCSSアニメーションを実装する

次に、紹介したレイアウトのパターンごとにホバー時のCSSアニメーションを実装します。条件は以下の通りです。

-   ボタンをホバーした時にアイコンとテキストの色を青色に変えたい
-   色を切り替える際にトランジションを追加したい

![アニメーションの実装サンプル](https://ics.media/entry/220126/images/animation_sample.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220113_align_icon_text/pages/02-animation/)
-   [コードを確認する](https://github.com/ics-creative/220113_align_icon_text/tree/main/pages/02-animation)

#### パターン1: テキスト要素のbackground-imageを使用する場合

`background-image`プロパティーは**CSSトランジションと相性が悪く、パターン1の場合は簡単にはアニメーションができません。** そのため、アニメーションを実装する場合は別のパターンを推奨します。

※パターン1のアニメーション実装のサンプルはありません。

#### パターン2・3: 疑似要素を使用する場合

パターン2・3の場合は、同じ方法で実装できます。`opacity: 0;`が設定されたホバー用アイコンの疑似要素を新しく追加し、既存のアイコンに重なるよう位置を調整します。そしてホバー時に`opacity`プロパティーの値を変更することで色の切り替わりを再現します。

▼パターン2: 疑似要素のアニメーション例

```
.button-02 {
  /* ...レイアウトの記述は省略 */
  
  transition-property: background-color, color;
  transition-duration: 0.2s;
  &::before,
  &::after {
    transition: opacity 0.2s;
  }
  &::after {
    opacity: 0;
  }
  &.fav {
    &::before {
      background-image: url("../../images/icon_star.svg");
    }
    &::after {
      background-image: url("../../images/icon_star_hover.svg");
    }
  }
  &.message {
    &::before {
      background-image: url("../../images/icon_mail.svg");
    }
    &::after {
      background-image: url("../../images/icon_mail_hover.svg");
    }
  }
  &.trash {
    &::before {
      background-image: url("../../images/icon_trash_can.svg");
    }
    &::after {
      background-image: url("../../images/icon_trash_can_hover.svg");
    }
  }
  &:hover,
  &:focus {
    color: #0065ff;
    background-color: #e4eaf3;
    &::before {
      opacity: 0;
    }
    &::after {
      opacity: 1;
    }
  }
}
```

今回のような色を切り替えるといった条件であればこの方法で実装が可能です。ただし、SVGのプロパティーは操作できないため**パスを扱うような複雑なアニメーションはできません。**

`background-image`プロパティーの画像は`display: none;`を設定するとレンダリング時に読み込まれないことにも注意してください。たとえば、ホバー用アイコンに`display: none;`を設定してしまうと、ホバー時に画像の読み込み処理が行われるため**初回のアニメーションにチラツキが発生する原因となります。** 今回は`opacity: 0;`のみ設定しているため、レンダリング時に画像が読み込まれるようになっています。

▼ホバー時に画像が読み込まれる例

![ホバー時に画像が読み込まれる例](https://ics.media/entry/220126/images/animation_load.gif)

#### パターン4: インラインSVGを使用する場合

パターン4の場合は、SVGの`fill`プロパティーをCSSで変更してアニメーションができます。今回は`fill`プロパティーのみ変更していますが、他のSVGプロパティーも変更が可能です。

▼パターン4: インラインSVGのアニメーション例

```
.button-04 {
  /* ...レイアウトの記述は省略 */
  
  transition-property: background-color, color;
  transition-duration: 0.2s;
  .button-04-icon {
    transition: fill 0.2s;
  }
  &:hover,
  &:focus {
    color: #0065ff;
    background-color: #e4eaf3;
    .button-04-icon {
      fill: #0065ff;
    }
  }
}
```

### アクセシビリティの注意点

`background-image`プロパティーや`content`プロパティーが空の疑似要素は、スクリーンリーダーに読み上げられません。もし、テキストだけでは何を指しているかの説明が足りない場合はアクセシビリティの考慮が必要です。

対策はいくつかありますが、以下のリロードボタンの実装例では最終更新日時を示すアイコンに`role`属性と`aria-label`属性を追加する対応を行っています。

![アクセシビリティのサンプル](https://ics.media/entry/220126/images/etc_accessibility.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220113_align_icon_text/pages/03-etc/)
-   [コードを確認する](https://github.com/ics-creative/220113_align_icon_text/tree/main/pages/03-etc)

▼`aria-label`を追加する例

```
<ul class="menu">
  <li class="menu-item">
    <button class="button-accessibility">
      <div class="button-accessibility-wrap">
        <span class="button-accessibility-text">リロード</span>
        <div class="buttonInfo">
          <span class="buttonInfo-icon" role="img" aria-label="最終更新日時"></span>
          <span class="buttonInfo-text">2022年1月1日 12:00</span>
        </div>
      </div>
      <span class="button-accessibility-icon"></span>
    </button>
  </li>
</ul>
```

また、インラインSVGのスクリーンリーダー対応が必要な時は、SVGに`title`タグや`desc`タグといったテキスト情報を追加するか、`role`属性および`aria-*`属性を追加するといった対応が必要です。

### アイコン形状のさまざまな実装方法

ここまで紹介した4つの方法ではSVGのアイコンを使用しましたが、別の方法を用いてアイコンを実装する方法があります。少しユニークな方法ですが、実装しやすかったり、アニメーション表現が豊かになるのでおさえておくと良いでしょう。

#### マスクを使用してアイコンを再現する

`mask-image`プロパティーを使用してアイコンを再現する方法です。次の例では`background-color`プロパティーを指定した要素に対して、`mask-image`プロパティーでマスクしてアイコンを再現しています。

`background-color`プロパティーを変更することで、パターン2・3のようなホバー用の画像を用意せず、色を切り替えるといったアニメーションが可能です。

CSSマスクの詳しい解説は記事『[変幻自在なグラフィック表現！CSS, SVG, Canvasでマスクを使いこなせ](https://ics.media/entry/210701/)』をご覧ください。

![mask-imageのサンプル](https://ics.media/entry/220126/images/etc_mask_image.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220113_align_icon_text/pages/03-etc/)
-   [コードを確認する](https://github.com/ics-creative/220113_align_icon_text/tree/main/pages/03-etc)

#### HTML・CSSでアイコンを作成する

プラス・マイナスや、三角形、×ボタン、ハンバーガーメニューといった単純なアイコンをHTML・CSSで作成する方法です。

この方法は画像を使用せず、アイコンの形状をCSSで変更できます。次の例では、CSSで作成したプラス・マイナスのアイコンをホバー時にアニメーションして切り替えています。

![HTML・CSSでアイコンを作成するサンプル](https://ics.media/entry/220126/images/etc_css_shape.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220113_align_icon_text/pages/03-etc/)
-   [コードを確認する](https://github.com/ics-creative/220113_align_icon_text/tree/main/pages/03-etc)

▼HTML・CSSでアイコンを作成する例

```
<ul class="menu">
  <li class="menu-item">
    <a href="" class="button-cssShape">
      <span class="button-cssShape-text">アイコンを変形する</span>
      <span class="button-cssShape-icon"></span>
    </a>
  </li>
</ul>
```

```
.button-cssShape {
  /* ...レイアウトの記述は省略 */

  .button-cssShape-icon {
    /* アイコンの縮小を防ぐ */
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    margin-top: 1px;
    margin-right: 1px;
    margin-left: 8px;
    position: relative;
    transition: transform 0.2s;
    /* 疑似要素でプラスのアイコンを作成 */
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      background-color: #4b4b4b;
      transition: background 0.2s;
    }
    &::before {
      width: 100%;
      height: 2px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &::after {
      width: 2px;
      height: 100%;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
  }
  &:hover,
  &:focus {
    color: #0065ff;
    background-color: #e4eaf3;
    .button-cssShape-icon {
      transform: rotate(90deg);
      &::before {
        opacity: 0;
      }
      &::after {
        background-color: #0065ff;
      }
    }
  }
}
```

#### アイコンをフォント化する

その他の実装方法としてアイコンをフォント化し、ウェブフォントとして使用するアイコンフォントというものがあります。HTMLはパターン3の構成に近く、疑似要素の`content`プロパティーを使用してアイコンを表示させる仕組みが一般的です。

-   参考: [Font Awesome](https://fontawesome.com/)

ウェブフォントを使用することで`font-size`、`color`、`line-height`といったCSSプロパティーでアイコンの調整が可能です。ただし、`content`プロパティーの内容はスクリーンリーダーに読み上げられるため、装飾的なアイコンでも`aria-hidden`属性といった設定が必要なことに注意してください。前述で紹介した[Font Awesome](https://fontawesome.com/)でもウェブフォントのアクセシビリティについて触れられています。

-   参考:『[Accessibility | Font Awesome](https://fontawesome.com/v5.15/how-to-use/on-the-web/other-topics/accessibility)』

### 画面幅によって小さいアイコンが見切れる問題

![アイコンが見切れる例](https://ics.media/entry/220126/images/etc_svg_shift.jpg)

画像の`width`と`height`プロパティーに小数点以下の値が入ると、ブラウザの画面幅によってアイコンのサイズに微妙なズレが生じてアイコンが見切れる場合があります。対策として小数点以下の値は避けるか、アイコン画像自体に余白をもたせるといった対策が考えられます。

### まとめ

アイコンとテキストを横並びに配置する実装自体は難しくはありませんが、アニメーションやアクセシビリティの考慮によってそれぞれ使いどころが見えてくると思います。条件に沿った実装をするために今回紹介した方法が参考になれば幸いです。