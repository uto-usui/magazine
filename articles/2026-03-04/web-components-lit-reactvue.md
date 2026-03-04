---
title: "Web Components × Litが便利! ReactでもVueでも、どこでも使えるコンポーネントを作ろう"
source: "https://ics.media/entry/260303/"
publishedDate: "2026-03-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "narayama"
---

Reactで作ったコンポーネントを、Vue.jsのプロジェクトに持っていくには書き直しが必要です。Vue.jsで作ったものをSvelteで使うのも同様で、フレームワークが違えばコンポーネントは動きません。

この問題を解決する選択肢のひとつが、Web Componentsウェブ コンポーネンツです。Web Componentsはブラウザの標準仕様であり、`<my-component>`タグという形で定義したコンポーネントは、ReactでもVue.jsでもSvelteでも、素のHTMLでも動きます。そのWeb Componentsを実用的に書くためのライブラリが[Lit](https://lit.dev/)です。

本記事では、Litで作ったコンポーネントを各フレームワークから使う際の具体的な方法と注意点を解説します。コード例は、TypeScriptで記載しています。

### 最小例とフレームワーク横断サンプル

まずは「フレームワークなしでも使える」ことを、最小の例で見てみます。

```
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-button")
export class MyButton extends LitElement {
  // スタイルを静的に定義
  static styles = css`
    button {
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      background-color: var(--btn-bg, #eee);
    }
  `;

  // 属性（Property）の定義。変化したら自動で再描画される
  @property({ type: String }) 
  label = "Default";

  // 宣言的なレンダリング
  render() {
    return html`
      <button @click="${this._handleClick}">
        ${this.label}
      </button>
    `;
  }

  private _handleClick() {
    console.log(`${this.label} がクリックされました`);
  }
}
```

```
<script type="module" src="./src/my-button.js"></script>
<my-button label="ボタン"></my-button>
```

この2行だけで、Custom Elementsとして定義した`<my-button>`を素のHTMLから利用できます。以降では、同じ考え方をReact・Vue.js・Svelteに持ち込むときの差分を見ていきます。

以下にサンプルを用意しました。1ページにReact、Vue.js、Svelteのコンポーネントが埋まっている、通常ではありえないサンプルですが、Litの可能性を感じてもらうために、あえてこのようなサンプルとしています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260303_lit_sample/)
-   [コードを確認する](https://github.com/ics-creative/260303_lit_sample)

### Litの基本

LitはCustom Elements（カスタム要素）とShadow DOMシャドウ ドムというブラウザ標準仕様の薄いラッパーライブラリです。サイズは約7KB（gzip）で、最小限のAPIを覚えるだけで書き始められます。

```
import { LitElement, css, html } from "lit";
import type { DictionaryEntry } from "../shared/types";

class WordCard extends LitElement {
  static properties = {
    entry: { attribute: false }, // オブジェクトは属性ではなくプロパティで受け取る
  };

  static styles = css`
    /* スコープ付きCSS */
    .card {
      background: #fff;
    }
  `;

  declare entry: DictionaryEntry; // 親から渡される単語データ

  render() {
    // Litテンプレートを返して描画
    return html`<div class="card">${this.entry.japanese}</div>`;
  }
}

// 既に定義済みなら再登録しない（重複読み込み対策）
if (!customElements.get("word-card")) {
  customElements.define("word-card", WordCard);
}
```

`customElements.define()`メソッドで登録すると、以降は`<word-card>`タグというHTML要素として使えます。なお、TypeScriptの設定によっては`@customElement`や`@property`などのデコレーター構文でも同じコンポーネントを記述できます。

### 実際に作る：コンポーネント

#### `<word-card>` の実装

単語カードコンポーネントを例として用意しました。

```
import { LitElement, css, html } from "lit";
import type { CardClickDetail, DictionaryEntry } from "../shared/types";

/**
 * 単語データを表示する Web Components 本体。
 * React / Vue.js / Svelte から共通で利用される。
 */
class WordCard extends LitElement {
  static properties = {
    entry: { attribute: false }, // オブジェクトは属性ではなくプロパティで受け取る
  };

  static styles = css`
    :host {
      display: block;
    }
    .card {
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background: white;
      padding: 16px;
      cursor: pointer;
      width: 100%;
      text-align: left;
      transition:
        border-color 0.2s,
        background-color 0.2s,
        scale 0.2s;

      &:hover {
        border-color: var(--color-primary);
        background: rgb(0 0 0 / 2%);
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }

      &:active {
        scale: 0.99;
        background: rgb(0 0 0 / 4%);
      }
    }
    .meta {
      margin: 0 0 8px;
      display: flex;
      justify-content: flex-end;
    }
    .hint {
      margin: 0;
      font-size: var(--font-size-small);
      font-weight: bold;
      color: var(--color-secondary);
    }
    .japanese {
      font-size: var(--font-size-large);
      font-weight: bold;
      margin: 0 0 8px;
    }
    .latin {
      font-size: var(--font-size-medium);
      font-weight: normal;
      color: var(--color-primary);
      margin: 0 0 8px;
    }
    .meaning {
      font-size: var(--font-size-small);
      font-weight: normal;
      color: var(--color-secondary);
      margin: 0;
    }
  `;

  declare entry: DictionaryEntry; // 親から渡される単語データ

  constructor() {
    super();
    // 初回レンダリング時のundefined参照を避ける
    this.entry = {
      japanese: "",
      latin: "",
      meaning: "",
    };
  }

  private onCardClick = (): void => {
    // クリックした単語データを親コンポーネントへ通知
    this.dispatchEvent(
      new CustomEvent<CardClickDetail>("card-click", {
        // 親側が扱いやすいよう detail に entry をまとめる
        detail: { entry: this.entry },
      }),
    );
  };

  render() {
    // クリック可能な単語カードUIを描画
    return html`
      <button class="card" type="button" @click=${this.onCardClick}>
        <div class="meta">
          <p class="hint">クリックできます</p>
        </div>
        <p class="japanese">${this.entry.japanese}</p>
        <p class="latin">${this.entry.latin}</p>
        <p class="meaning">${this.entry.meaning}</p>
      </button>
    `;
  }
}

// 既に定義済みなら再登録しない（重複読み込み対策）
if (!customElements.get("word-card")) {
  customElements.define("word-card", WordCard);
}
```

-   [コードを確認する](https://github.com/ics-creative/260303_lit_sample/blob/main/src/components/word-card.ts)

#### Shadow DOMによるCSSスコープの恩恵

`static styles`プロパティに書いたCSSは、Shadow DOMによってこのコンポーネントの中にだけ適用されます。`.japanese`というクラス名が他のコンポーネントで宣言されているクラス名と衝突することはありません。CSS ModulesもBEMも不要で動作するのは、Shadow DOMがブラウザレベルでスコープを保証しているからです。

#### プロパティとカスタムイベントの設計

データの受け渡しは2通りあります。親から子へはプロパティ、子から親へはカスタムイベントを使います。

親 → 子（プロパティ）：

```
// コンポーネント側
static properties = {
  entry: { attribute: false }, // オブジェクトを直接受け取る
};

// 使う側
card.entry = { japanese: "水", latin: "water", ... };
```

子 → 親（カスタムイベント）：

```
this.dispatchEvent(
  new CustomEvent("card-click", {
    detail: { entry: this.entry }, // 押下された単語を渡す
  }),
);
```

今回のように「カスタム要素（ホスト）自身」から`dispatchEvent()`する場合は、`bubbles`/`composed`を省略しても受け取り側で扱えます。一方で、Shadow DOM内の子要素からイベントを発火してホスト外で拾いたい場合は、`composed: true`（必要に応じて`bubbles: true`）を明示します。

### 各フレームワークから使う

作った`<word-card>`タグを各フレームワークから使ってみます。`<my-button>`のように独立して完結するコンポーネントであれば、基本はタグを書くだけで使えます。一方、今回の`<word-card>`はフレームワーク側の状態と双方向に連携するため、プロパティ代入やイベント購読のつなぎ込みが必要です。そのぶん記述は増えますが、やっていることは「データを渡す」「イベントを受け取る」の2点です。

#### React

まずはReactでの使い方から見ていきます。

```
import { useState } from "react";
import type { DictionaryEntry, CardClickDetail } from "../shared/types";

type Props = {
  /** 表示対象の単語データ */
  entry: DictionaryEntry;
};

/**
 * React から <word-card> を利用するデモ。
 * プロパティ代入とカスタムイベント購読の流れを示す。
 */
export function ReactDemo({ entry }: Props) {
  // 表示するクリック結果メッセージ
  const [message, setMessage] = useState("未クリック");
  // カウント値のみを管理するstate（表示はmessageに反映）
  const [, setCount] = useState(0);

  const onCardClick = (event: Event): void => {
    const customEvent = event as CustomEvent<CardClickDetail>;
    // 関数形式で前回値を受け取り確実にインクリメント
    setCount((previous) => {
      const next = previous + 1;
      setMessage(`クリック: ${customEvent.detail.entry.japanese}（${next}回）`);
      return next;
    });
  };

  return (
    <div className="demo-block">
      <word-card entry={entry} oncard-click={onCardClick}></word-card>
      <p>{message}</p>
    </div>
  );
}
```

-   [コードを確認する](https://github.com/ics-creative/260303_lit_sample/blob/main/src/react/ReactDemo.tsx)

イベントは`on`プレフィックス付きの属性（例: `oncard-click`）で宣言的に購読できます。イベント名は大文字小文字を区別するため、`-`（ダッシュ）を含めて正確に一致させます。

#### Vue.js

次にVue.jsでの使い方を見ていきます。

```
<script setup lang="ts">
import { ref } from "vue";
import type { DictionaryEntry, CardClickDetail } from "../shared/types";

const props = defineProps<{
  /** 表示対象の単語データ */
  entry: DictionaryEntry;
}>();

// 表示メッセージとクリック回数
const message = ref("未クリック");
const count = ref(0);

const onCardClick = (event: Event): void => {
  // CustomEvent に型を付けて detail.entry を安全に扱う
  const customEvent = event as CustomEvent<CardClickDetail>;
  // クリック回数を増やし、UI表示を更新
  count.value += 1;
  message.value = `クリック: ${customEvent.detail.entry.japanese}（${count.value}回）`;
};
</script>

<template>
  <div class="demo-block">
    <word-card :entry="props.entry" @card-click="onCardClick"></word-card>
    <p>{{ message }}</p>
  </div>
</template>
```

-   [コードを確認する](https://github.com/ics-creative/260303_lit_sample/blob/main/src/vue/VueDemo.vue)

Vue.jsでは`:entry`と`@card-click`を使うと、宣言的に書きつつ型安全を保ちやすくなります。

#### Svelte

最後にSvelteでの使い方を見ていきます。

```
<script lang="ts">
  import type { CardClickDetail, DictionaryEntry } from "../shared/types";

  // 親から受け取る単語データ（Svelte 5 の $props）
  let { entry }: { entry: DictionaryEntry } = $props();
  // 表示メッセージとクリック回数
  let message = $state("未クリック");
  let count = $state(0);

  const onCardClick = (event: Event): void => {
    // CustomEvent の detail から選択データを取り出す
    const customEvent = event as CustomEvent<CardClickDetail>;
    // クリック時にカウントアップして表示更新
    count += 1;
    message = `クリック: ${customEvent.detail.entry.japanese}（${count}回）`;
  };

</script>

<div class="demo-block">
  <word-card entry={entry} oncard-click={onCardClick}></word-card>
  <p>{message}</p>
</div>
```

-   [コードを確認する](https://github.com/ics-creative/260303_lit_sample/blob/main/src/svelte/SvelteDemo.svelte)

Svelte 5ではリアクティブな変数に`$state()`を使います。今回のように`entry`をそのまま渡すケースでは、`entry={entry}`と`oncard-click`だけで十分です。

### 制約と判断基準

#### Litランタイムは使う側にも必要

「Web Componentsだからどこでも使える」という理解は正しいです。ただし、`<word-card>`タグの内部実装はLitに依存しています。配布方法によっては、Litのランタイム（約7KB）が最終バンドルサイズに影響します。`word-card`のビルド成果物にLit由来のコードを同梱するか、利用側で依存を解決するかで、最終的なバンドルサイズは変わります。

目安はシンプルで、導入を簡単にしたい場合は同梱、複数コンポーネント間で依存を共有してサイズ効率を優先したい場合は`peerDependencies`として外出し、という使い分けです。入門段階では、まず同梱で動かし、ライブラリ化の段階で外出しを検討すると進めやすいです。

#### 素のWeb Componentsを手書きする場合との違い

Web ComponentsはLitなしでも実装できます。依存を増やしたくない小規模な用途では、ブラウザ標準APIだけで書く選択も有効です。一方で、コンポーネント数が増えると、テンプレート記述、更新処理、プロパティ反映、スタイル管理を毎回組み立てる作業量が増えます。Litはこの定型作業を薄いランタイムでまとめられるため、「サイズ最小化」より「開発・保守効率」を重視する場面でメリットがあります。

#### Shadow DOMの外からスタイルを当てにくい

Shadow DOMはCSSの隔離を保証するため、外からスタイルを上書きすることが原則できません。テーマ対応が必要な場合は、CSS変数か`::part`疑似要素を使って、外部からカスタマイズできる入口を用意する必要があります。

```
static styles = css`
  .card {
    background: var(--card-bg, #fff);     /* CSS変数で上書き口を用意 */
    border-radius: var(--card-radius, 8px);
  }
`;
```

```
/* 使う側から上書き */
word-card {
  --card-bg: #f0f9ff;
}
```

```
// コンポーネント側（公開する要素に part 属性を付ける）
render() {
  return html`<button part="card" class="card">${this.entry.japanese}</button>`;
}
```

```
/* 使う側（::part で Shadow DOM 内の公開パーツを装飾） */
word-card::part(card) {
  border: 2px solid #2563eb;
  border-radius: 12px;
}
```

#### 型定義の共有

`static properties`で受け渡すデータの型をTypeScriptで共有するには、型定義ファイルを別途パッケージとして切り出すか、コンポーネントのパッケージから再エクスポートする設計が必要です。

```
// word-card.ts から型をエクスポート
export type { DictionaryEntry } from "./types.js";
```

### Litの可能性と周辺整備

Litは「コンポーネント本体」だけでなく、周辺を含めて段階的に拡張できる点が強みです。[`lit/lit`のモノレポ](https://github.com/lit/lit/)には、基本パッケージ（`lit`、`lit-element`、`lit-html`）に加えて、実務で使いやすくするための追加パッケージがそろっています。

-   `@lit/react`：ReactアプリにWeb Componentsを橋渡しするためのラッパー生成
-   `@lit/localize`：多言語対応を前提にしたローカライズ基盤
-   `@lit/task`：非同期処理の状態管理をテンプレート側で整理
-   `@lit-labs/ssr`系：サーバーサイドレンダリングやフレームワーク連携の検証基盤
-   `@lit-labs/testing`：コンポーネントテストの補助

実際に、LitベースのUIコンポーネントライブラリとして『[Shoelace](https://shoelace.style/)』や『[Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/index.html)』のような事例があります。いずれもフレームワーク非依存で利用できる形を重視しており、「一度作ったコンポーネントを複数環境で使う」というWeb Componentsの価値を示す具体例です。

したがって、最初は小さな部品を配布する用途から始めて、必要に応じてローカライズ、React統合、SSR対応へと広げる進め方ができます。とくにSSRは、サーバー側の出力とクライアント側の初期描画をそろえる設計が必要で、検討項目が増える領域です。そのため、必要になった段階で`@lit-labs/ssr`系を使って段階的に導入できる点が利点です。フレームワーク非依存の設計を取りつつ、実務で必要な周辺機能まで同じエコシステムでそろえられるのが、Litの現実的な可能性です。

### まとめ

LitはReactやVue.jsの対抗馬ではなく、「フレームワークをまたいで使えるコンポーネントを作るための選択肢」です。作ったコンポーネントをReact・Vue.js・Svelteのどれからでも`<word-card>`タグとして使えるのは強みですが、Litのランタイム依存や配布設計の検討など、正直に向き合うべき制約も存在します。コンポーネントの再利用性を優先すべき場面があるなら、Litは検討する価値があります。