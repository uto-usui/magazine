---
title: "コピペで使える! HTMLのチェックボックスを独自のデザインで実装する方法"
source: "https://ics.media/entry/241004/"
publishedDate: "2024-10-04"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

チェックボックスは、HTML・CSSで独自にデザインすると手間のかかる要素です。ほとんどの場合は、`<input type="checkbox" />`を利用することになりますが、以下の課題があります。

-   標準の`input`タグはブラウザごとに見た目が異なり、利用できるCSSプロパティにばらつきがある。
-   実装方法が複数存在し、どの方法が適しているか判断しにくい。
-   チェックボックスには複数の状態が存在し、用意すべき見た目がわかりにくい。

慣れていない方にとっては、判断に迷いやすい要素です。この記事では、独自にデザインされたチェックボックスの作り方を4つのポイントに分けて紹介します。

**本記事で紹介すること**

-   チェックボックスの独自のデザインを、シンプルなHTML構造で実装する方法
-   標準の`input`タグの利点を落とさず、独自のデザインを適用する方法
-   コピペで使えるチェックボックスの作例

### シンプルなチェックボックスの作り方

ここからは、シンプルなデザインを例に紹介します。まずは次の作例をご覧ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241004_checkbox/)
-   [コードを確認する](https://github.com/ics-creative/241004_checkbox/tree/main/docs/)

作例のチェックボックスは、ひとつのクラスをもとに複数のレイアウトを用意しています。いずれのブラウザでも見た目が揃っており、用途に応じて使い分けられるのでぜひご活用ください。

本記事では、横並びのレイアウトをもとに作り方を紹介します。作り方は、大きく分けて以下の4つのポイントがあります。

-   アイコンの見た目を`input`タグで作成する
-   キーボードでも操作可能にする
-   状態に応じた見た目を追加する
-   強制カラーモードをサポートする

次の章では、それぞれのポイントを解説します。

#### 1\. アイコンの見た目を`input`タグで作成する

操作性やHTML構造のシンプルさを意識して、`<input type="checkbox" />`でアイコンの見た目を作成しています。標準の`input`タグは、利用可能なCSSプロパティに制限があります。対策として`appearance: none`で標準の見た目とCSSの制限を除去して、独自のスタイルを適用しています。

今回の作例では、チェックマークの見た目を疑似要素で作成しています。疑似要素は、`appearance: none`を利用することで、いずれのブラウザでも疑似要素を利用できるようになります。疑似要素を使用した作成方法は、以下のMDNのドキュメントでも紹介されています。

-   [フォームへの高度なスタイル設定 - MDN](https://developer.mozilla.org/ja/docs/Learn/Forms/Advanced_form_styling)

▼チェックボックスのアイコンの実装イメージ

![](https://ics.media/entry/241004/images/241004_checkbox_icon.png)

```
<input class="checkbox_icon" type="checkbox" />
```

```
/* チェックボックスのアイコン */
.checkbox_icon {
  position: relative;
  width: 24px;
  height: 24px;
  appearance: none;
  background: #FFFFFF;
  border: solid 2px #808080;
  border-radius: 4px;
  box-shadow: 0 0 0 0 transparent;

  /* チェックマーク */
  &::before {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    content: "";
    opacity: 0;
    mask-image: url("icon.svg");
    mask-repeat: no-repeat;
    mask-size: contain;
    background-color: #FFFFFF;
  }
}
```

チェックマークは、非選択のときは`opacity: 0`で透過しているため表示されません。チェック時には`opacity: 1`にして表示します。また、チェックマークの見た目は、背景色をSVG画像でマスクして作成しています。マークの色を自由に変えたいときに役立ちます。

#### 2\. キーボードでも操作可能にする

チェックボックスは、キーボードでも操作できるようにしましょう。具体的には、対象の`input`タグをフォーカスして操作可能な要素にすることと、フォーカス時に要素の周囲に輪郭線（「フォーカスリング」と呼ばれます）を表示します。

標準の`input`タグは、はじめからキーボードで操作可能です。作例のチェックボックスは、標準の`input`タグの見た目を除去していますが、キーボード操作に影響はありません。

作例のフォーカス時の見え方と、チェックボックス全体の実装イメージは次の通りです。全体の実装イメージは、キーボード操作に影響がないことを示すために紹介しています。

▼チェックボックス全体の実装イメージ

![](https://ics.media/entry/241004/images/241004_checkbox_whole.png)

```
<label class="checkbox">
  <input class="checkbox_icon" type="checkbox" />
  りんご
</label>
```

```
/* チェックボックス全体 */
.checkbox {
  width: fit-content;
  display: grid;
  grid-template-columns: auto 1fr; /* auto はアイコン、1fr はラベル文字列を想定 */
  gap: 10px;
  padding: 8px;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  color: #404040;
}

/* アイコン */
.checkbox_icon {
  /* 省略 */
}
```

`label`タグの子要素に必要な要素をまとめて、横並びにする見た目を適用しています。キーボード操作で要素をフォーカスすると、アイコンの周囲に輪郭線が表示されます。

慣習的な実装方法として、inputタグを隠して、ほかの要素で見た目を作る方法があります。その方法では、キーボード操作に課題が発生しやすいです。`input`タグに`display: none`を指定したときに操作できなくなる動作は、以下の記事で紹介しています。興味のある方は参考ください。

-   『リンク/ボタン/フォームをより良くするHTML・CSS 17選』
    -   [15\. input要素をカスタムするときにdisplay:noneにしない](https://ics.media/entry/221208/#15.-input%E8%A6%81%E7%B4%A0%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%81%99%E3%82%8B%E3%81%A8%E3%81%8D%E3%81%ABdisplay%3Anone%E3%81%AB%E3%81%97%E3%81%AA%E3%81%84)

#### 3\. 状態に応じた見た目を追加する

チェックボックスのそれぞれの状態に応じたデザインを考えてみましょう。具体的には、以下の状態を示す見た目が必要です。

-   非選択
-   選択済み
-   非活性（選択不可能な項目）
-   非活性かつ、選択済み

※ほかにも、非選択と選択済みどちらともいえない未決定状態が存在します。詳細は以下のMDNを参照ください。

-   [<input type=“checkbox”> #未決定状態のチェックボックス - MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/checkbox#%E6%9C%AA%E6%B1%BA%E5%AE%9A%E7%8A%B6%E6%85%8B%E3%81%AE%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9)

チェックボックスの状態は、`input`タグの属性に応じて判定できます。選択状態を`checked`属性、非活性状態を`disabled`属性で判定します。CSSでは、`:checked`や`:disabled`という疑似クラスで表します。実装イメージは次の通りです。

▼スタイルを適用する条件

-   非選択：`input`タグの`checked`属性が存在しないとき
-   選択済み：`input`タグの`checked`属性が存在するとき
-   非活性：`input`タグの`disabled`属性が存在するとき
-   非活性かつ、選択済み：`input`タグの`checked`属性と`disabled`属性が存在するとき

▼HTML・CSSの実装イメージ

![](https://ics.media/entry/241004/images/241004_checkbox_state.png)

```
<!-- 非選択 -->
<label class="checkbox">
  <input class="checkbox_icon" type="checkbox" />
  りんご
</label>

<!-- 選択済み -->
<label class="checkbox">
  <input class="checkbox_icon" type="checkbox" checked />
  りんご
</label>

<!-- 非活性 -->
<label class="checkbox">
  <input class="checkbox_icon" type="checkbox" disabled />
  りんご
</label>

<!-- 非選択かつ、選択済み -->
<label class="checkbox">
  <input class="checkbox_icon" type="checkbox" disabled checked />
  りんご
</label>
```

```
/* チェックボックス全体 */
.checkbox {
  /* 省略 */
  
  /* チェックボックス全体：非活性の見た目 */
  &:has(.checkbox_icon:disabled) {
    opacity: 0.4;
  }
}
```

```
/* アイコン */
.checkbox_icon {
  /* 省略 */
  
  /* アイコン：選択済みの見た目 */
  &:checked {
    background: #3223B3; /* 紫色 */
    border-color: #3223B3; /* 紫色 */
  }

  /* チェックマーク */
  &::before {
    /* 省略 */
  }

  /* チェックマーク：選択済みの見た目 */
  &:checked::before {
    opacity: 1;
  }
}
```

#### 4\. 強制カラーモードをサポートする

OSの設定に応じて、ブラウザの強制カラーモードが有効になる場合があります。強制カラーモードが有効になると、設定に応じた限られた配色でウェブサイトが表示されます。有効になる具体例として、Windows 11のコントラスト設定があります。

強制カラーモードが有効のときは、実装によっては**チェックボックスの状態が視覚的に判別できない**ため注意が必要です。作例でも視覚的にチェックの可否が判別できなくなるという問題があります。アイコンの背景色とマークの背景色がひとつの値で固定されるためです。

対策として、強制カラーモードが有効のときはアイコンの色を別途指定しています。色はシステムカラーと呼ばれる、ブラウザがもつ既定の色を指定します。 システムカラーの詳細は、以下のMDNを参照ください。

-   [<system-color> - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/system-color)

また、強制カラーモードの判定には、`@media (forced-colors: active)`というアットルールを使用しています。実装イメージは次の通りです。

▼対策前と対策後の強制カラーモードの見え方を比較（Windows 11）

![](https://ics.media/entry/241004/images/241004_forced_colors_demo.png)

▼対策後の実装イメージ

```
/* アイコン */
.checkbox_icon {
  /* 省略 */

  /* 強制カラーモードが有効のときは、既定の色を設定 */
  @media (forced-colors: active) {
    border-color: CanvasText;
  }

  /* アイコン：選択済みの見た目 */
  &:checked {
    /* 省略 */

    /* 強制カラーモードが有効のときは、既定の色を設定 */
    @media (forced-colors: active) {
      background-color: Canvas;
      border-color: CanvasText;
    }
  }

  /* チェックマーク */
  &::before {
    /* 省略 */
  }
  /* 強制カラーモードが有効のときは、既定の色を設定 */
  @media (forced-colors: active) {
    &::before {
      background-color: CanvasText;
    }
  }
}
```

Windows 11で強制カラーモードの表示を確認するには、［設定］→［アクセシビリティ］にあるコントラストテーマを適用すると、強制カラーモードが有効になります。

▼Windows 11のコントラストテーマ設定画面

![](https://ics.media/entry/241004/images/241004_forced_colors_settings.png)

macOS Sonoma 14では、強制カラーモードを有効にする設定がありませんが、ブラウザの設定でエミュレートできます。Firefoxでは、設定画面から［一般］→［言語と外観］→［カラー］→［カラーの管理］をクリックして、［選択したカラーで上書きをする］という項目を「常に上書き」に変更すると強制カラーモードが有効になります。

▼強制カラーモードのエミュレート手順（Firefox 129.0.2）

![](https://ics.media/entry/241004/images/241004_forced_colors_settings_firefox.png)

### コラム：`accent-color`プロパティで選択時の色のみ変更する

`<input type="checkbox" />`は、`accent-color`プロパティを利用することで、選択時の背景色（強調色と呼ばれます）を変更できます。チェックマークの色は、`accent-color`プロパティの色に応じて自動的に調整されます。**ゼロからCSSを用意せず、標準の見た目をおおまかに整えたいとき**に役立つCSSプロパティです。

▼`accent-color`プロパティの実装イメージ

![](https://ics.media/entry/241004/images/241004_accent_color_demo.png)

```
<label>
  <input type="checkbox" />
  りんご
</label>
```

```
label {
  /* 省略 */
}

input[type="checkbox"] {
  accent-color: red;
}
```

`accent-color`プロパティの初期値には`auto`が設定されていて、ブラウザの既定の色が指定されます。詳細は以下のMDNを参照ください。

-   [accent-color - MDN](https://developer.mozilla.org/ja/docs/Web/CSS/accent-color)

### まとめ

チェックボックスを独自のデザインで実装する方法を紹介しました。

`input`タグでアイコンを作成することで、`input`タグの利点を落とさずチェックボックスを実装できます。より複雑なデザインを実装するとき、紹介したHTML構造では難しい場面があるかもしれません。そんなときでも、紹介したポイントを意識することで操作に関わる考慮不足を防げます。

### 参考サイト

-   [フォームへの高度なスタイル設定 - MDN](https://developer.mozilla.org/ja/docs/Learn/Forms/Advanced_form_styling)
-   [CSSでチェックボックスやラジオボタンをカスタマイズする 2024年版 - Days on the Moon](https://nanto.asablo.jp/blog/2024/05/24/9686885)
-   [コントラストテーマのテスト結果 - SmartHR ACCESSIBILITY](https://note.com/a11y_tester/n/nfc61bfd225c9)
-   [強制カラーモードに対するメディアクエリforced-colorsの使い方 - ミツエーリンクス](https://www.mitsue.co.jp/knowledge/blog/frontend/202405/17_1401.html)