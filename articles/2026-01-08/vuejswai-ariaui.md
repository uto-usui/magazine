---
title: "Vue.jsで作る、WAI-ARIA対応のアクセシブルなタブ型UI"
source: "https://ics.media/entry/17110/"
publishedDate: "2019-03-27"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

この記事は『[WAI-ARIA対応のタブ型UIを実装する方法](https://ics.media/entry/17107/)』の続きです。

WAI-ARIAはアクセシビリティーの改善に役立つと先の記事で紹介しました。この記事ではWAI-ARIAに対応したVue.jsでのタブのユーザーインターフェイスを解説します。

サンプルをGitHubにアップしているので、デモとソースコードをご覧ください。

-   [別ウインドウで再生する](https://ics-creative.github.io/180109_wai_aria/vue/)
-   [GitHubでコードを確認する](https://github.com/ics-creative/180109_wai_aria/tree/master/vue-sample)

本記事のコードは開発環境としてViteを利用しており、Vue.jsのsetup構文で作成しています。

### Vue.jsでのステート管理

選択されたタブのIDをプロパティ`tab`に保持することとします。

▼App.vueファイルの抜粋

```
// ステートを定義
const activeTabId = ref("1");
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[App.vue](https://github.com/ics-creative/180109_wai_aria/blob/master/vue-sample/src/App.vue)」を参照ください。

### HTMLの実装

HTMLの実装を紹介します。

▼App.vueファイルの抜粋

```
<template>
  <div>
    <ul role="tablist">
      <li v-for="tab in CONTENT_LIST" :key="tab.id" role="presentation">
        <button
          role="tab"
          :id="`tab-${tab.id}`"
          :aria-controls="`panel-${tab.id}`"
          :aria-selected="activeTabId === tab.id"
          @click="handleClick"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>
    <div v-for="tab in CONTENT_LIST" :key="tab.id">
      <div
        role="tabpanel"
        :id="`panel-${tab.id}`"
        :aria-labelledby="`tab-${tab.id}`"
        :hidden="activeTabId !== tab.id "
        class="panel"
      >
        {{ tab.content }}
      </div>
    </div>
  </div>
</template>
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[App.vue](https://github.com/ics-creative/180109_wai_aria/blob/master/vue-sample/src/App.vue)」を参照ください。

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

Safariでは次のように「Tabキーを押したときにWebページ上の各項目を強調表示」を選択すると、a要素もタブキーで選択可能になります。ただ、このオプションを設定していなくてもタブキーで選択されたほうが望ましいと考えてのことです。

![macOS Safariでの設定ウインドウの「Tabキーを押したときにWebページ上の各項目を強調表示」](https://ics.media/entry/17110/images/waiaria_safari.png)

#### JavaScriptとVue.jsに絡んでくるポイント

-   タブとなる`button`要素とパネルの`div`要素の関連性を示すため`aria-controls`属性を指定します。値は任意で`id`属性を指定します
-   `button`要素にタブの選択状態を伝えるために、`aria-selected`を真偽値で指定します
    -   Vue.jsのプロパティの値で動的とします。こうすれば半自動的に`aria-selected`属性が切り替わります

### ボタン要素のイベントハンドラー

ボタン要素のイベントハンドラーのコードを紹介します。ボタンとパネルの紐付けは、意味的に合致している `aria-controls` 属性を利用してます。JavaScriptの制御が必要なものは独自の変数ではなく、可能な限り `aria-*` 属性で代替するのがベターなやり方と思います。

▼App.vueファイルの抜粋

```
// ステートを定義
const activeTabId = ref("1");

// クリックしたときのイベントハンドラーです。
const handleClick = (event) => {
  const element = event.currentTarget;
  const controlsId = element.getAttribute("aria-controls");

  if (!controlsId) {
    return;
  }

  const tabId = controlsId.replace("panel-"", "");
  if (!tabId) {
    return;
  }
  activeTabId.value = tabId;
};
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[App.vue](https://github.com/ics-creative/180109_wai_aria/blob/master/vue-sample/src/App.vue)」を参照ください。

### CSSの実装

CSSはなるべく `class` 属性を使わず、`aria-*` 属性をセレクターとして指定しています。こうすれば、余計なクラス属性を増やす必要がなくなります。

▼ app.component.cssの抜粋

```
/* UI制御のための指定 */
[aria-selected="true"] {
  background-color: royalblue;
  color: white;
}
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[App.vue](https://github.com/ics-creative/180109_wai_aria/blob/master/vue-sample/src/App.vue)」を参照ください。

CSSの実装はCodeGridの記事「[WAI-ARIAを活用したフロントエンド実装](https://www.codegrid.net/articles/2016-wai-aria-1)」で紹介されている「aria属性をCSSセレクターとして利用する」「独自に名前を付けるくらいなら、意味的に合致するaria属性を利用して、アクセシビリティーを確保しましょう」の提案をアイデアとしています。

### まとめ

Vue.jsで実装する場合は**タブの状態はいずれかのプロパティで管理しているはず**です。その値を間借りして `aria-*` 属性に適用すれば、簡単にアクセシビリティーを向上できます。今回はタブ型UIで紹介しましたが、これは一例に過ぎません。さまざまなユーザーインターフェイスに利用できるので応用くださいませ。

2018年の記事「[脱jQueryのためにしたこと](https://ics.media/entry/17451/)」でも紹介したように、**ReactやVue.js等のJSライブラリとWAI-ARIAの相性は抜群です**。ほんの少しWAI-ARIAの理解が進めば、Vue.jsユーザーの皆さんは簡単に利用できるでしょう。この記事によって、音声読み上げを求めているエンドユーザーへの配慮が少しでも進めばと考えています。

この方法はAngularやReactでも実装できるので、次の記事で紹介しています。ぜひご利用ください。

-   [AngularでWAI-ARIA対応のタブUIを実装する方法](https://ics.media/entry/17108/)
-   [ReactでWAI-ARIA対応のタブUIを実装する方法](https://ics.media/entry/17109/)

### 補足

記事を作成するにあたり複数のサンプルを用意して音声読み上げソフト（macOSの「[VoiceOver](https://www.apple.com/jp/accessibility/vision/)」や「[NVDA日本語版](https://www.nvda.jp/)」）で検証しました。

※この記事が公開されたのは**6年前**ですが、**8か月前の2025年5月**に内容をメンテナンスしています。