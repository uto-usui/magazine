---
title: "ウェブ制作にも便利！React & Vueで始めるヘッドレスUI"
source: "https://ics.media/entry/230413/"
publishedDate: "2023-04-13"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

ウェブの表現がリッチになるに従い、コーポレートサイトやキャンペーンページのような「普通のウェブページ」でもモーダルダイアログやアコーディオンといった、ちょっと凝ったUIを見かけることが増えてきました。こうしたUIが必要な場合、皆さんはどのように実装していますか？

2023年3月にモーダルダイアログの実装について聞いたアンケートでは`<div>`で自前実装派とJSライブラリ利用派で回答が二分されました。

この記事ではリッチで使いやすいUIを実装するための選択肢として「ヘッドレスUI」ライブラリを紹介します。ヘッドレスUIライブラリも大きな括りでは「JSライブラリ利用派」に含まれますが、古くから定番のBootstrapやMaterial UI・Vuetifyなどとはちょっと毛色の違う存在です。

### ヘッドレスUIとは？　BootstrapやVuetifyとは何が違う？

**ヘッドレスUIとは「デザイン（見た目）を持たず、振る舞い（機能）だけを提供するライブラリ」です**。

この説明だけではピンとこない方も多いでしょうから、試しにひとつ使ってみましょう。ヘッドレスUIを提供するライブラリには元祖とも言える[Headless UI](https://headlessui.com/)のほか、後発でより高機能な[Radix UI](https://www.radix-ui.com/)もあります。どちらも基本的な考え方や使い方は同じなので、ここではシンプルなHeadless UIを主に紹介します。

※ この記事ではライブラリ名の固有名詞として英文字表記の「Headless UI」を、「デザイン（見た目）を持たず、振る舞い（機能）だけを提供するライブラリ」の総称として日本語表記の「ヘッドレスUI」を使用します。

次のコードはHeadless UIの`<Listbox>`コンポーネント（セレクトメニュー・ドロップダウンメニュー）をReactで利用したものです（[公式ページの例](https://headlessui.com/react/listbox#basic-example)を少し簡略にしています）。ReactやVue.jsへの導入方法や使い方の詳細はこの記事の後半で紹介しますので、まずはざっくりと感触だけ掴んでみてください。

▼ Headless UIを使って選択リストを作る例

```
import { useState } from 'react'
import { Listbox } from '@headlessui/react'

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button>{selectedPerson.name}</Listbox.Button>
      <Listbox.Options>
        {people.map((person) => (
          <Listbox.Option key={person.id} value={person}>
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230413_headless_ui/hui-react-min/)
-   [ソースコードを確認する](https://github.com/ics-creative/230413_headless_ui/blob/main/hui-react-min/src/MyListbox.tsx)

`<Listbox>`の中に`<Listbox.Button>`や`<Listbox.Option>`などリストを構成するコンポーネントが入れ子になっています。最初のサンプルとしては少し長いコードですが、決して難しくはないはずです。

コードが書けたら早速表示してみましょう。

![公式サイトのサンプルのキャプチャと↑で実装したものの比較。公式サンプルのようなきれいなリストは表示されない](https://ics.media/entry/230413/images/230413_nostyle.png)

公式ページのようなきれいなリストが表示されるのかと思いきや、ただのボタンがひとつ表示されただけです。クリックするとリストメニューらしきものが表示されますが、こちらもブラウザ標準の`<ul>`と`<li>`タグで作ったただのリストにしか見えません。

ちょっと盛り上がりにはかけますが、これで正常な表示です。**ヘッドレスUIは見た目のデザインを提供しないので、初期状態では一切のスタイルが当たっていません**。公式サイトでデモされている見た目はあくまで「こういうデザインにもできますよ」という一例です。

### ヘッドレスUIを使うと何が嬉しいか？

長いコードを書いてなお整った見た目も付かないのであれば、なぜヘッドレスUIを使うのでしょうか？　ヘッドレスUIを使う3つのメリットを説明します。

#### 1\. ウェブサイト全体のデザインに合わせやすい

個人開発のプロダクトやちょっとした社内ツールでは、最初から整ったデザインを提供してくれるUIライブラリはとてもありがたい存在です。一方で、デザイナーが入ってページ全体のデザインや触り心地を設計するきちんとしたウェブサイトでは、UIライブラリが提供するデフォルトの見た目はむしろ邪魔になることが少なくありません。

UIライブラリのコンポーネントが提供する範囲を超えたスタイルの調整は、コンポーネントの内部構造やCSSの詳細度に依存した不安定な実装となりがちです。カスタマイズのための高度なテンプレートやエディターを備えたライブラリも存在しますが、その分書き方やツールが限定されるため、導入には慎重にならざるを得ません。

ヘッドレスUIではそもそもデザインが提供されないため、このようなストレスは生じません。**ライブラリの便利な機能は享受しつつ、デザイナーが設計したデザインに合わせたUIを自由に作ることができます**。

![UIライブラリが提供するデフォルトのスタイルが邪魔になる場合にはヘッドレスUIがストレスフリー](https://ics.media/entry/230413/images/230413_difference.png)

#### 2\. アクセシビリティの基本的な対応が組み込まれている

UIコンポーネントを自作する際の悩みのひとつがキーボード操作や読み上げの対応といったアクセシビリティの確保です。ヘッドレスUIを使うことで、基本的な対応の多くを自分で実装する必要がなくなります。

次のキャプチャは先ほど紹介したHeadless UIのリストを読み上げツール（macOSのVoiceOver）を使用してキーボードで操作している様子です。

![VoiceOverでキーボード操作している様子。Headless UIが基本的なアクセシビリティを確保してくれる](https://ics.media/entry/230413/images/230413_accessible.gif)

見た目としては不十分なリストですが、**読み上げを使ってキーボードで操作すると完璧に機能している**ことがわかります。また、このリストをChromeのDevToolsで確認すると、さまざまなアクセシビリティの属性が自動的に付与されていることがわかります。もちろん、すべてをライブラリ任せにできるとは限りませんが、基本的な対応をひととおりやってくれるだけで十分強力な機能と言えます。

#### 3\. 気が付きにくい＆難しいUIの挙動をフォローしてくれる

最後のメリットはちょっと説明しにくいので、先に例を見てみましょう。次の例はRadix UIの`<Popover>`コンポーネントを使って、ボタンを押した時に吹き出しを表示する機能を実装したものです（最低限のスタイルを追加しています）。

![Radix UIのpopoverコンポーネントを使った吹き出しの実装。表示される位置に応じて吹き出しやツノの位置が調整される](https://ics.media/entry/230413/images/230413_popover.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230413_headless_ui/radix-react/)
-   [ソースコードを確認する（コンポーネント）](https://github.com/ics-creative/230413_headless_ui/blob/main/radix-react/src/components/MyPopover.tsx)
-   [ソースコードを確認する（CSS）](https://github.com/ics-creative/230413_headless_ui/blob/main/radix-react/src/components/MyPopover.module.scss)

一見簡単に見えるUIですが、これをライブラリに頼らず実装するのは、実はなかなか大変です。たとえばボタンが画面の下方にある場合、吹き出しは上側に出現するべきですし、左右ギリギリにある場合にもはみ出さないように横方向の位置を調整しなくてはいけません。これらの考慮が足りていないために、吹き出しが見切れている、あるいはムダな横スクロールが生じてしまう…　そんなページを目にしたことのある方も少なくないでしょう。

Radix UIのPopoverはこうしたケースの考慮までしてくれています。こうしたちょっとイレギュラーな挙動は見落としがちですし、たとえ認識できても実装するのは大変です。うまくライブラリを活用できれば、少ない手間でより良い操作性を実現できるでしょう。

### ヘッドレスUIを使う場合の注意点

メリットのたくさんあるヘッドレスUIですが、使う場合にはいくつか注意点もあります。

#### 1\. 用意されているコンポーネントは限られている

**ヘッドレスUIを提供してくれるライブラリはまだまだ少なく、用意されているコンポーネントの種類も決して多いとは言えません**。また、前提としてデザインシステム全体をカバーしようとするUIライブラリ（こうしたものはとくに「UIフレームワーク」と呼ばれることが多いです）と比べると、そもそも適用範囲が限定的です。当然ですが、カラーテーマやタイポグラフィーの統一といった見た目のための機能はありません。

必要な機能がHeadless UIやRadix UIで提供されているか、エンジニア・デザイナーともに確認しておく必要があるでしょう。

後発のライブラリでは[MUI Base](https://mui.com/base/getting-started/overview/)のように、「ヘッドフル」な従来型のUIライブラリから見た目部分を取り除いてヘッドレスにする取り組みもあるようです。まだまだ発展途上ではあるようですが、気になる方はこうした動きもウォッチしておくと良いでしょう。

#### 2\. 機能（振る舞い）のカスタマイズは難しい

ヘッドレスUIでは見た目の部分はかなり自由にカスタマイズが可能な一方、**機能（振る舞い）のカスタマイズは難しいことがあります**。

たとえば、先ほど紹介したRadix UIのPopoverで表示する吹き出しの位置をボタンの右側や左下固定にしたい場合、簡単にできるでしょうか？　記事公開時点（バージョン1.0.5）のPopoverでは、左や右に固定することはできますが、左下や右上といった角に固定する機能はありません。自力で表示位置を制御することも理論的には可能ですが、なまじ高機能な位置調整の機能があるので、常に正しい位置に表示させるのはちょっと苦労しそうです。

UIの挙動に細かな要求がある場合、先にしっかりと**ドキュメントを精査し、実現したい挙動がサポートされているか確認**した方が良いでしょう。**顧客やデザイナーと事前に調整して「このライブラリができる範囲で実装します」と合意しておく**のもひとつの方法です。うまく活用できれば高品質なUIを安価に実装できるので、メリットを伝えて上手に活用したいですね。

#### 3\. ライブラリによって利用できるフレームワークが異なる

2023年4月時点では、ヘッドレスUIを提供するライブラリのほとんどがReactでの利用を前提としており、Vueやその他のフレームワークでの選択肢は限られています。

ReactやVueのような特定のフレームワークを必要としない[Xtend UI](https://xtendui.com/)のようなライブラリもありますが、フレームワークの支援がない分、複雑なマークアップが必要になったり機能が限定されたりと、デメリットも多いようです。

ヘッドレスUIを導入したい環境が決まっている場合は、対応しているライブラリを調べた上で、そのライブラリでやりたいことができるのか、よく確認する必要があるでしょう。

### Headless UIをReactで使ってみる

最後に、Headless UIをReactとVueで使ってみるサンプルを紹介します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230413_headless_ui/hui-react/)
-   [ソースコードを確認する](https://github.com/ics-creative/230413_headless_ui/tree/main/hui-react)

※ このサンプルではTypeScriptとSass(SCSS)を使用しています。標準のJavaScriptとCSSで実装する場合も構成は変わりません。

Headless UIの導入自体はとても簡単です。まずは下記のコマンドで`Headless UI`をインストールします。

```
npm install @headlessui/react
```

次に、`<Listbox>`コンポーネントをimportしてオリジナルのリストボックスを実装します。公式サイトのサンプルを雛形としてコピーして、必要な部分を書き換えていくのが良いでしょう。

以下の例ではリストの選択肢等のデータをpropsで受け取るようにした上で、スタイルの代わりに絵文字を使って選択されている項目を表示するようにしています。

▼ スタイルなしのリストコンポーネント（`ListboxPlain.tsx`）

```
import { FC, Fragment } from "react";
import { Listbox } from "@headlessui/react";

type ListItem = {
  id: string;
  text: string;
};
type Props = {
  /** 選択肢 */
  items: ListItem[];
  /** 選択項目のvalue(itemのid) */
  value: string | null;
  /** 未選択時に表示するテキスト */
  prompt?: string;
  /** 選択変更時のコールバック */
  onChange?: (value: string | null) => void;
};

const findItem = (items: ListItem[], value: string | null) =>
  items.find((item) => item.id === value);

export const ListboxPlain: FC<Props> = (
  {items, value, prompt = "unselected", onChange}
) => {
  const selectedItem = value ? findItem(items, value) : null;
  const select = (item: ListItem) => onChange?.(item.id);

  return (
    <Listbox value={selectedItem} onChange={select}>
      <Listbox.Button>{selectedItem?.text ?? prompt}</Listbox.Button>
      <Listbox.Options>
        {items.map((item) => (
          <Listbox.Option key={item.id} value={item} as={Fragment}>
            {({ active, selected }) => (
              <li>
                {active && "👉"}
                {selected && "✅"}
                {item.text}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
```

-   [ソースコードを確認する](https://github.com/ics-creative/230413_headless_ui/blob/main/hui-react/src/components/ListboxPlain.tsx)

ここまでできれば、次のように使うことができます。

```
const cats = [
  { id: "item-1", text: "スコティッシュ・フォールド" },
  { id: "item-2", text: "マンチカン" },
  { id: "item-3", text: "アメリカン・ショートヘア" },
  { id: "item-4", text: "ノルウェージャン・フォレスト・キャット" },
  { id: "item-5", text: "ブリティッシュ・ショートヘア" },
];

export const ListboxPlainSample = () => {
  const [value, setValue] = useState<string | null>(null);
  const selectedCatName = cats.find((cat) => cat.id === value)?.text;

  return (
    <div>
      <ListboxPlain
        items={cats}
        value={value}
        onChange={setValue}
        prompt="好きな猫を選んでね"
      />
      {selectedCatName && <p>{selectedCatName}を選びました！</p>}
    </div>
  );
};
```

-   [ソースコードを確認する](https://github.com/ics-creative/230413_headless_ui/blob/main/hui-react/src/components/ListPlainSample.tsx)

動作の確認ができたら最後にスタイルを追加しましょう。

▼ スタイルを追加したリストコンポーネント（`ListboxStyled.tsx`）

```
// CSS Modulesのスタイルをimport
// 具体的なスタイルの中身はサンプルファイルを参照してください。
import styles from "./ListboxStyled.module.scss";

// その他のimportとPropsの定義は省略

// クラス名を結合して一つの文字列にするユーティリティ関数
const classes = (...names: (string | false)[]) =>
  names.filter(Boolean).join(" ");

export const ListboxStyled: FC<Props> = (
  {items, value, prompt = "unselected", onChange}
) => {
  const selectedItem = value ? findItem(items, value) : null;
  const select = (item: ListItem) => onChange?.(item.id);

  return (
    <Listbox value={selectedItem} onChange={select}>
      <div className={styles.root}>
        <Listbox.Button className={styles.trigger}>
          {selectedItem?.text ?? prompt}
        </Listbox.Button>
        <Transition
          enter={styles.listEnterActive}
          enterFrom={styles.listEnterFrom}
          leave={styles.listLeaveActive}
          leaveTo={styles.listLeaveTo}
        >
          <Listbox.Options className={styles.options}>
            {items.map((item) => (
              <Listbox.Option key={item.id} value={item} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={classes(
                      styles.option,
                      active && styles.active,
                      selected && styles.selected
                    )}
                  >
                    {item.text}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
```

-   [ソースコードを確認する（コンポーネント）](https://github.com/ics-creative/230413_headless_ui/blob/main/hui-react/src/components/ListboxStyled.tsx)
-   [ソースコードを確認する（CSS）](https://github.com/ics-creative/230413_headless_ui/blob/main/hui-react/src/components/ListboxStyled.module.scss)

基本的にはCSS Modulesで定義したスタイルを読み込んでクラス名を`className`に指定するだけです。メニュー開閉のアニメーションには[`<Transition>`コンポーネント](https://headlessui.com/react/transition)を使います。

この例ではCSS Modulesを使いましたが、もちろん生のCSSを使っても、Tailwind CSSやstyled-componentsといったCSSライブラリを使っても構いません。

### Headless UIをVue.jsで使ってみる

続けて、Vue.jsの場合のサンプルです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230413_headless_ui/hui-vue/)
-   [ソースコードを確認する](https://github.com/ics-creative/230413_headless_ui/tree/main/hui-vue)

※ このサンプルではTypeScriptとSass(SCSS)を使用しています。標準のJavaScriptとCSSで実装する場合も構成は変わりません。

Vueの場合も導入手順はほぼ同じです。まずは下記のコマンドで`Headless UI`をインストールします。

```
npm install @headlessui/vue
```

次に、Listboxの各コンポーネントをimportしてオリジナルのリストボックスを実装します。公式サイトのサンプルを雛形としてコピーして、必要な部分を書き換えていくのが良いでしょう。以下の例ではリストの選択肢等のデータをpropsで受け取るようにした上で、スタイルの代わりに絵文字を使って選択されている項目を表示するようにしています。

▼ スタイルなしのリストコンポーネント（`ListboxPlain.vue`）

```
<script lang="ts" setup>
import { computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

type ListItem = {
  id: string;
  text: string;
};

const props = withDefaults(
  defineProps<{
    /** 選択肢 */
    items: ListItem[];
    /** 選択項目 */
    value: string | null;
    /** 未選択時に表示するテキスト */
    prompt?: string;
  }>(),
  {
    prompt: "unselected",
  }
);

const emit = defineEmits<{
  /** 選択肢が変更されたときに発火するイベント */
  (e: "update:value", v: string | null): void;
}>();

/**
 * 選択アイテムを保持するref。
 * ここでは親コンポーネントのprops&emitと連動させるため、computedを使用しています。
 */
const selectedItem = computed<ListItem | null>({
  get() {
    // propsのitemsからvalueに一致するitemを返す
    return props.items.find((item) => item.id === props.value) ?? null;
  },
  set(item) {
    // 選択項目のidをemit
    emit("update:value", item?.id ?? null);
  },
});
</script>

<template>
  <Listbox v-model="selectedItem">
    <ListboxButton>{{ selectedItem?.text ?? prompt }}</ListboxButton>
    <ListboxOptions>
      <ListboxOption
        v-for="item in items"
        :key="item.id"
        :value="item"
        as="template"
        v-slot="{ active, selected }"
      >
        <li>
          <span v-show="active">👉</span>
          <span v-show="selected">✅</span>
          {{ item.text }}
        </li>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>
```

-   [ソースコードを確認する](https://github.com/ics-creative/230413_headless_ui/blob/main/hui-vue/src/components/ListboxPlain.vue)

ここまでできれば、以下のように使うことができます。

```
<script setup lang="ts">
import { ref, computed } from "vue";
import ListboxPlain from "./components/ListboxPlain.vue";

const cats = [
  { id: "item-1", text: "スコティッシュ・フォールド" },
  { id: "item-2", text: "マンチカン" },
  { id: "item-3", text: "アメリカン・ショートヘア" },
  { id: "item-4", text: "ノルウェージャン・フォレスト・キャット" },
  { id: "item-5", text: "ブリティッシュ・ショートヘア" },
];

const selectedCatId = ref<string | null>(null);
const selectedCatName = computed(
  () => cats.find((c) => c.id === selectedCatId.value)?.text
);
</script>

<template>
  <div>
    <ListboxPlain
      :items="cats"
      v-model:value="selectedCatId"
      prompt="好きな猫を選んでね"
    />
    <p v-if="selectedCatName">{{ selectedCatName }}を選びました！</p>
  </div>
</template>
```

-   [ソースコードを確認する](https://github.com/ics-creative/230413_headless_ui/blob/main/hui-vue/src/ListPlainSample.vue)

動作の確認ができたら最後にスタイルを追加しましょう。

▼ スタイルを追加したリストコンポーネント（`ListboxStyled.vue`）

```
<script lang="ts" setup>
// scriptは同じなので省略
</script>

<template>
  <Listbox v-model="selectedItem">
    <div class="Listbox">
      <ListboxButton class="trigger">{{
        selectedItem?.text ?? prompt
      }}</ListboxButton>
      <Transition name="list">
        <ListboxOptions class="options">
          <ListboxOption
            v-for="item in items"
            :key="item.id"
            :value="item"
            as="template"
            v-slot="{ active, selected }"
          >
            <li class="option" :class="{ selected, active }">
              {{ item.text }}
            </li>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </div>
  </Listbox>
</template>

<style lang="scss" scoped>
// 以下、構造のみ記載しています。具体的なスタイルはサンプルのソースコードを参照してください。
.Listbox {
  .trigger {
    // トリガー（開閉ボタン）のスタイル
  }
  .options {
    // 選択肢リスト全体のスタイル
  }
  .option {
    // 選択肢のスタイル
  }

  // トランジションのスタイル
  .list-enter-active {
    // フェードイン
  }
  .list-leave-active {
    // フェードアウト
  }
  .list-enter-from,
  .list-leave-to {
  }
}
</style>
```

-   [ソースコードを確認する](https://github.com/ics-creative/230413_headless_ui/blob/main/hui-vue/src/components/ListboxStyled.vue)

基本的には各要素に`class`を指定して好きなスタイルを適用するだけです。また、Vueの場合は標準でトランジション表現のための`<Transition>`コンポーネントが用意されているため、アニメーションも簡単に実装できます。

### まとめ：ヘッドレスUIで高品質なUIを実装しよう

この記事ではUIを実装する際に活用できるヘッドレスUIの概念を説明し、実際にReactとVue.jsで利用する例を紹介しました。ヘッドレスUIはアプリ開発の文脈で紹介されることの多いライブラリですが、実際にはウェブサイトの制作にも大いに活用できるものです。優れたUIを手軽に実装する手段として、ぜひ試してみてください。