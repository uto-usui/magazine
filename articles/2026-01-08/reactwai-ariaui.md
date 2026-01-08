---
title: "Reactで作る、WAI-ARIA対応のアクセシブルなタブ型UI"
source: "https://ics.media/entry/17109/"
publishedDate: "2018-01-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

この記事は『[WAI-ARIA対応のアクセシブルなタブ型UI（基本編）](https://ics.media/entry/17107/)』の続きです。

WAI-ARIAはアクセシビリティーの改善に役立つと先の記事で紹介しました。この記事ではWAI-ARIAに対応したReactでのタブのユーザーインタフェースを解説します。

サンプルをGitHubにアップしているので、デモとソースコードをご覧ください。

-   [別ウインドウで再生する](https://ics-creative.github.io/180109_wai_aria/react/)
-   [GitHubでコードを確認する](https://github.com/ics-creative/180109_wai_aria/tree/master/react-sample)

※本記事はViteで開発環境を用意し、React 19で説明しています。

### Reactでのステート管理

実装の要素として`state`に選択されたタブのIDを保持することとします。

▼ステート定義の部分の抜粋

```
// タブの選択状態をステート管理
const [state, setState] = useState<string>("1");
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[App.tsx](https://github.com/ics-creative/180109_wai_aria/blob/master/react-sample/src/App.tsx)」を参照ください。

### HTMLの実装

HTMLの実装を紹介します。このコードはJSXで書いています。

▼JSXの部分の抜粋

```
<div>
  <ul role="tablist">
    {CONTENT_LIST.map((tab) => (
      <li key={tab.id} role="presentation">
        <button
          role="tab"
          id={toTabId(tab.id)}
          aria-controls={toPanelId(tab.id)}
          aria-selected={state === tab.id}
          onClick={handleClick}
        >
          {tab.label}
        </button>
      </li>
    ))}
  </ul>
  {CONTENT_LIST.map((tab) => (
    <div
      key={tab.id}
      role="tabpanel"
      id={toPanelId(tab.id)}
      aria-describedby={toTabId(tab.id)}
      hidden={state !== tab.id}
    >
      {tab.content}
    </div>
  ))}
</div>
```

HTMLコーディングのポイントとしては次の通りです。

①期待どおりに読み上げられるように`role`属性を適切に利用します

タブとして機能するように、`ul`要素に`role="tablist"`、 タブ部分となる`button`要素に`role="tab"`、 パネル部分の`div`要素に`role="tabpanel"`を追加します

```
<ul role="tablist"></ul>
```

```
<div role="tabpanel" …></div>
```

慣習にしたがって`ul>li`でマークアップしましたが、読み上げの支障となるので`li`タグには`role="presentation"`を指定してます（もしかしたらタブUIに`ul>li`を使う必要はないかもしれません）

②タブ側のボタンは`a`要素ではなく`button`要素を使ってます。

```
<button role="tab" …></button>
```

macOS Safariだと`a`タグはデフォルトでタブキーで操作できないためです。Safariでは次のように「Tabキーを押したときにウェブページ上の各項目を強調表示」を選択すると、a要素もタブキーで選択可能になります。ただ、このオプションを設定していなくてもタブキーで選択されたほうが望ましいと考えてのことです

![macOS Safariでの設定ウインドウの「Tabキーを押したときにWebページ上の各項目を強調表示」](https://ics.media/entry/17109/images/waiaria_safari.png)

### JavaScriptとReactに絡んでくるポイント

-   タブとなる`button`要素とパネルの`div`要素の関連性を示すため`aria-controls`属性を指定します。値は任意で`id`属性を指定します
-   `button`要素にタブの選択状態を伝えるために、`aria-selected`を真偽値で指定します
    -   Reactのステートの値で動的とします。こうすれば半自動的に`aria-selected`属性が切り替わります
-   パネル部分が表示・非表示の状態を伝えるために `hidden`属性を真偽値で指定します

またReactでは、`id`属性を生成するための`useId`フックを利用しています。`useId`フックは各コンポーネントで一意のIDを生成するためのフックです。これを利用することで、タブボタンやタブパネルに固有のid属性を付与しやすくなります。

```
const id = useId();
```

タブボタンやタブパネルの`id`属性は扱いやすくするために変換用の関数を用意しました。

```
const toPanelId = (panelId: string) => id + "-panel-" + panelId;
const toTabId = (tabId: string) => id + "-tab-" + tabId;
```

### ボタン要素のイベントハンドラー

ボタン要素のイベントハンドラーのコードを紹介します。ボタンとパネルの紐付けは、意味的に合致している `aria-controls` 属性を利用してます。JavaScriptの制御が必要なものは独自の変数ではなく、可能な限り `aria-*` 属性で代替するのがベターなやり方と思います。なお、React Hooksを使って書いています。

▼イベントハンドラーの部分の抜粋

```
// タブの選択状態をステート管理
const [state, setState] = useState<string>("1");

// クリックしたときのイベントハンドラーです。
const handleClick = (event: React.MouseEvent) => {
  // イベント発生源の要素を取得
  const element = event.currentTarget;

  // aria-controls 属性の値を取得
  const tabState = element.getAttribute("aria-controls");

  if (!tabState) {
    return;
  }

  const tabId = tabState.split("-").pop();
  if (!tabId) {
    return;
  }

  // プロパティーを更新
  setState(tabId);
};
```

### CSSの実装

CSSはなるべく `class` 属性を使わず、`aria-*` 属性をセレクターとして指定しています。こうすれば、余計なクラス属性を増やす必要がなくなります。

```
/* UI制御のための指定 */
[aria-selected="true"] {
  background-color: royalblue;
  color: white;
}
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[App.css](https://github.com/ics-creative/180109_wai_aria/blob/master/react-sample/src/App.css)」を参照ください。

CSSの実装はCodeGridの記事「[WAI-ARIAを活用したフロントエンド実装](https://www.codegrid.net/articles/2016-wai-aria-1)」で紹介されている**「aria属性をCSSセレクターとして利用する」「独自に名前を付けるくらいなら、意味的に合致するaria属性を利用して、アクセシビリティーを確保しましょう」**の提案をアイデアとしています。

### まとめ

Reactで実装する場合はタブの状態はいずれかの`state`か`props`で管理しているはずです。その値を間借りして`aria-*`属性に適用すれば、簡単にアクセシビリティーを向上できます。これは一例に過ぎません。さまざまなユーザーインターフェイスに利用できるので応用くださいませ。

昨年の記事「[脱jQueryのためにしたこと](https://ics.media/entry/17451/)」でも紹介したように、これらのJSライブラリとWAI-ARIAの相性は抜群です。Reactユーザーがほんの少しWAI-ARIAの理解が進めば、簡単に利用できるでしょう。この記事によって、音声読み上げを求めているエンドユーザーへの配慮が少しでも進めばと考えています。

この方法はAngularやVue.jsでも実装できます。詳しくは次の記事を参照ください。

-   [AngularでWAI-ARIA対応のタブUIを実装する方法](https://ics.media/entry/17108/)
-   [Vue.jsでWAI-ARIA対応のタブUIを実装する方法](https://ics.media/entry/17110/)

### 補足

記事を作成するにあたり複数のサンプルを用意して音声読み上げソフト（macOSの「[VoiceOver](https://www.apple.com/jp/accessibility/vision/)」や「[NVDA日本語版](https://www.nvda.jp/)」）で検証しました。

※この記事が公開されたのは**7年前**ですが、**8か月前の2025年5月**に内容をメンテナンスしています。