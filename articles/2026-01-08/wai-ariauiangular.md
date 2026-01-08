---
title: "WAI-ARIA対応のタブ型UIの作り方（Angular編）"
source: "https://ics.media/entry/17108/"
publishedDate: "2018-01-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

この記事は『[WAI-ARIA対応のタブ型UIを実装する方法](https://ics.media/entry/17107/)』の続きです。

WAI-ARIAはアクセシビリティーの改善に役立つと先の記事で紹介しました。この記事ではWAI-ARIAに対応したAngularでのタブのユーザーインタフェースを解説します。

サンプルをGitHubにアップしているので、デモとソースコードをご覧ください。

-   [別ウインドウで再生する](https://ics-creative.github.io/180109_wai_aria/react/)
-   [GitHubでコードを確認する](https://github.com/ics-creative/180109_wai_aria/tree/master/react-sample)

前提として、[Angular CLI](https://cli.angular.io/)（[Angular](https://angular.io/) 7）で環境構築したものとします。Angular 2以上であれば、本記事の内容が使えると思います。なお、AngularJS 1.x系とは互換性がないので注意ください。

### Angularでのステート管理

選択されたタブのIDをプロパティ`tab`に保持することとします。

```
export class AppComponent {
  tab = 'panel1';

  // (一部省略)
}
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[app.component.ts](https://github.com/ics-creative/180109_wai_aria/blob/master/angular-sample/src/app/app.component.ts)」を参照ください。

### HTMLの実装

HTMLの実装を紹介します。

▼app.component.html

```
<div>
  <ul role="tablist">
    <li role="presentation">
      <button role="tab"
              aria-controls="panel1"
              [attr.aria-selected]="tab === 'panel1'"
              (click)="_handleClick($event)">
        カベルネ・ソーヴィニョン
      </button>
    </li>
    <li role="presentation">
      <button role="tab"
              aria-controls="panel2"
              [attr.aria-selected]="tab === 'panel2'"
              (click)="_handleClick($event)">
        メルロー
      </button>
    </li>
    <li role="presentation">
      <button role="tab"
              aria-controls="panel3"
              [attr.aria-selected]="tab === 'panel3'"
              (click)="_handleClick($event)">
        ピノ・ノワール
      </button>
    </li>
  </ul>
  <div role="tabpanel"
       id="panel1"
       [attr.aria-hidden]="tab !== 'panel1'">
    カベルネ・ソーヴィニョンはブドウの一品種。赤ワインの中でも渋くて重い味わいが特徴です。
  </div>
  <div role="tabpanel"
       id="panel2"
       [attr.aria-hidden]="tab !== 'panel2'">
    メルローはブドウの一品種。味はカベルネ・ソーヴィニョンほど酸味やタンニンは強くなく、芳醇でまろやかで繊細な味わいです。
  </div>
  <div role="tabpanel"
       id="panel3"
       [attr.aria-hidden]="tab !== 'panel3'">
    ピノ・ノワールはブドウの一品種。カベルネ・ソーヴィニョンと対照的で比較的軽口な味わいです。
  </div>
</div>
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[app.component.html](https://github.com/ics-creative/180109_wai_aria/blob/master/angular-sample/src/app/app.component.html)」を参照ください。

HTMLコーディングのポイントとしては次の通り。

-   期待どおりに読み上げられるように`role`属性を適切に利用します
-   タブとして機能するように、`ul`要素に`role="tablist"`、 タブ部分となる`button`要素に`role="tab"`、 パネル部分の`div`要素に`role="tabpanel"`を追加します
    -   慣習にしたがって`ul>li`でマークアップしましたが、読み上げの支障となるので`li`タグには`role="presentation"`を指定してます（もしかしたらタブUIに`ul>li`を使う必要はないかもしれません）
-   タブ側のボタンは`a`要素ではなく`button`要素を使ってます。macOS Safariだと`a`要素はデフォルトでタブキーで操作できないためです。Safariでは次のように「Tabキーを押したときにWebページ上の各項目を強調表示」を選択すると、`a`要素もタブキーで選択可能になります。ただ、このオプションを設定していなくてもタブキーで選択されたほうが望ましいと考えてのことです

![macOS Safariでの設定ウインドウの「Tabキーを押したときにWebページ上の各項目を強調表示」](https://ics.media/entry/17108/images/waiaria_safari.png)

JavaScriptとAngularに絡んでくるポイントは次の通り。

-   タブとなる`button`要素とパネルの`div`要素の関連性を示すため`aria-controls`属性を指定します。値は任意で`id`属性を指定します
-   `button`要素にタブの選択状態を伝えるために、`aria-selected`を真偽値で指定します
    -   Angularのプロパティの値で動的とします。こうすれば半自動的に`aria-selected`属性が切り替わります
-   パネル部分が表示・非表示の状態を伝えるために `aria-hidden`属性を真偽値で指定します

### ボタン要素のイベントハンドラー

ボタン要素のイベントハンドラーのコードを紹介します。ボタンとパネルの紐付けは、意味的に合致している `aria-controls` 属性を利用してます。JavaScriptの制御が必要なものは独自の変数ではなく、可能な限り `aria-*` 属性で代替するのがベターなやり方と思います。

▼app.component.tsの抜粋

```
export class AppComponent {
  tab = 'panel1';

  /**
   * クリックしたときのイベントハンドラーです。
   * @param event イベントオブジェクトです。
   */
   _handleClick(event: MouseEvent): void {
    // イベント発生源の要素を取得
    const element = event.currentTarget as HTMLElement;

    // aria-controls 属性の値を取得
    const tabState = element.getAttribute('aria-controls');

    // プロパティを更新
    this.tab = tabState;
  }
}
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[app.component.ts](https://github.com/ics-creative/180109_wai_aria/blob/master/angular-sample/src/app/app.component.ts)」を参照ください。

### CSSの実装

CSSはなるべく `class` 属性を使わず、`aria-*` 属性をセレクターとして指定しています。こうすれば、余計なクラス属性を増やす必要がなくなります。

▼ app.component.cssの抜粋

```
/* UI制御のための指定 */
[aria-hidden="true"] {
  display: none;
}

[aria-hidden="false"] {
  display: block;
}

[aria-selected="true"] {
  background-color: royalblue;
  color: white;
}
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[app.component.css](https://github.com/ics-creative/180109_wai_aria/blob/master/angular-sample/src/app/app.component.css)」を参照ください。

CSSの実装はCodeGridの記事「[WAI-ARIAを活用したフロントエンド実装](https://app.codegrid.net/entry/wai-aria-1)」で紹介されている**「aria属性をCSSセレクターとして利用する」「独自に名前を付けるくらいなら、意味的に合致するaria属性を利用して、アクセシビリティーを確保しましょう」**の提案をアイデアとしています。

### まとめ

Angularで実装する場合は**タブの状態はいずれかのプロパティで管理しているはず**です。その値を間借りして `aria-*` 属性に適用すれば、簡単にアクセシビリティーを向上できます。今回はタブ型UIで紹介しましたが、これは一例に過ぎません。さまざまなユーザーインタフェースに利用できるので応用くださいませ。

昨年の記事「[脱jQueryのためにしたこと](https://ics.media/entry/17451/)」でも紹介したように、**AngularやVue.js等のJSライブラリとWAI-ARIAの相性は抜群です**。ほんの少しWAI-ARIAの理解が進めば、Angularユーザーの皆さんは簡単に利用できるでしょう。私個人としても多くのプロダクトで積極的にWAI-ARIAを実装しています（パブリックな事例としては「[ICS MEDIA](https://ics.media/)」、「[Beautifl](https://beautifl.net/)」など）。この記事によって、音声読み上げを求めているエンドユーザーへの配慮が少しでも進めばと考えています。

この方法はVue.jsやReactでも実装できるので、詳しくは次の記事を参照ください。

-   [ReactでWAI-ARIA対応のタブUIを実装する方法](https://ics.media/entry/17109/)
-   [Vue.jsでWAI-ARIA対応のタブUIを実装する方法](https://ics.media/entry/17110/)

### 補足

記事を作成するにあたり複数のサンプルを用意して音声読み上げソフト（macOSの「[VoiceOver](https://www.apple.com/jp/accessibility/mac/vision/)」や「[NVDA日本語版](https://www.nvda.jp/)」）で検証しました。