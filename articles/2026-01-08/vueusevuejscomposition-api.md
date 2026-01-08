---
title: "VueUseで極めるVue.jsとComposition API"
source: "https://ics.media/entry/230606/"
publishedDate: "2023-06-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Vue.js用ライブラリ[『VueUse』](https://vueuse.org/)はVue.jsの機能である、Composition APIを用いて作られた関数のパッケージです。VueUseの大きな特徴のひとつに、**コンポーザブルな関数をまとめたライブラリ**であるという点が挙げられます。

「コンポーザブルな関数」とはなんでしょう？　コンポーザブルな関数にはどのようなメリットがあるのでしょう？

本記事はVueUseの使用を通じて、Vue 3から導入されたComposition API、そしてそれを利用したコンポーザブル関数への理解を深める内容となっています。

### VueUseとは

まずはVueUseの便利さを体感してもらうため、簡単なデモを用意しました。

次のデモはVueUseに含まれている`useMouse()`関数を用いています。この関数はマウスの座標を取得し、リアクティブに返すコンポーザブルな関数です。

▼マウス座標を取得し表示するコンポーネントの例

```
<script setup>
import { useMouse } from "@vueuse/core";

const { x, y } = useMouse();
</script>

<template>
  <div>
    <p>マウスの座標は、x: {{ x }}, y: {{ y }}です。</p>
  </div>
</template>
```

-   [サンプルを別タブで開く](https://ics-creative.github.io/230606_vueuse/#/mouse)
-   [ソースコードを確認する](https://github.com/ics-creative/230606_vueuse/blob/main/src/pages/Mouse.vue)

コンポーザブルな関数とは、VueのComposition APIを使用して作られた**状態をもつ関数**を指します。Reactの世界でHookと呼ばれる処理とよく似ています。

`useMouse()`から返される`{ x, y }`はマウスの座標です。これはマウスの座標という「状態」を管理し、マウスの移動によってリアクティブに変更されます。VueUseではこのようにリアクティブな値を返す関数が多数定義されています。

### コンポーザブルな関数を作ってみよう

Composition APIへの理解を深めるため、簡単なコンポーザブル関数を自作してみましょう。つぎに示したのは、`count`というリアクティブ値をもったコンポーネントの例です。

▼Composition APIを用いたカウンターの例

```
<script setup>
import { ref } from "vue";

const count = ref(0);
 
const increment = () => {
 count.value++;
};
</script>

<template>
  <button @click="increment">
    Clicked {{ count }} times
  </button>
</template>
```

Vue 2まで主に使われていたOptions APIの記法ではコンポーネントから外に状態を切り出すことはできませんでした。しかしComposition APIの登場により状態を外部の関数に切り出せるようになりました。これにより、複数のコンポーネントでロジックの再利用が可能となりました。

次に示す`useCounter()`というコンポーザブル関数は、Composition APIを用いて上記コンポーネントの`count`と`increment()`を外部に切り出した例です。

▼useCounter.ts

```
import { ref } from "vue";

export const useCounter = () => {
  const count = ref(0);
 
  const increment = () => {
    count.value++;
  };

  return {
    count,
    increment,
  };
};
```

コンポーネントではこれらを呼び出し使用できます。

▼App.vue

```
<script setup>
import { useCounter } from "./useCounter";

const { count, increment } = useCounter();
</script>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230606_vueuse/#/count)
-   [useCounter.tsのコードを確認する](https://github.com/ics-creative/230606_vueuse/blob/main/src/composable/useCounter.ts)

`useCounter()`の作成によって、コンポーネント内の記述がスッキリしただけでなく、他のコンポーネントでも同じロジックを再利用できるメリットがあります。

本来はこのように必要なコンポーザブル関数を都度自作する必要がありますが、人々はよく使うコンポーザブル関数があることに気が付きました。それらをまとめて使いやすくしたものがVueUseです。

VueUseではそれぞれの用途に応じたコンポーザブル関数が用意されています（先ほどの`useCounter()`のような関数ももちろんあります！）。 本記事では、ブラウザ編、リアクティブ編、utils編に分けてVueUseの特徴的な関数と使用例を紹介します。

### 便利なコンポーザブル関数 - ブラウザ編

まずはブラウザ編です。JavaScriptには標準で多くのWeb APIが用意されています。（[Web API一覧](https://developer.mozilla.org/ja/docs/Web/API)）

たとえば全画面表示を行うFullscreen API, クリップボードの操作を行うClipboard API, ブラウザのリサイズを監視するResizeObserver APIなどが挙げられます。

これらのAPIはそのままでも十分便利ですが、Vueのリアクティブと組み合わせることでよりシンプルに、より使いやすく記述できます。 例としてClipboard APIをラップした`useClipboard()`関数を紹介します。次のコードは、フォームに入力した文字列をクリップボードにコピーする例です。

▼useClipboard()関数の使用例

```
<script setup>
import { useClipboard } from "@vueuse/core";
import { ref } from "vue";

const source = ref("");
const { text, copy, copied } = useClipboard({ source });
</script>

<template>
  <div>
    <input v-model="source" />
    <button @click="copy(source)">コピー</button>
    <p>コピーしたテキスト: {{ text }}</p>
    <p v-if="copied">コピーしました</p>
  </div>
</template>
```

-   [サンプルを別タブで開く](https://ics-creative.github.io/230606_vueuse/#/clipboard)
-   [ソースコードを確認する](https://github.com/ics-creative/230606_vueuse/blob/main/src/pages/Clipboard.vue)

▼サンプルの実行例

![クリップボードのサンプル](https://ics.media/entry/230606/images/230606_clipboard.gif)

単にClipboard APIの機能を提供するだけでなく、扱いやすいメソッドやコピーされた「状態」としてリアクティブ値が用意されているため、開発者の要求をより満たしてくれるコンポーザブル関数となっています。

また、`useEventListener()`もかゆいところに手が届く便利な関数です。VueやReactでは、コンポーネント内でイベントを登録した場合、ページ遷移時に処理を残さないよう`beforeUnmount`などのライフサイクルフックの中で`removeEventListener()`を行いイベントを破棄しなければなりません。

▼イベントを破棄する例

```
<script setup>
import { onMounted, onUnmounted } from "vue";

// マウント時にイベントを登録する
onMounted(() => {
  window.addEventListener("resize", onResize);
});

// コンポーネント破棄時にイベントを破棄する
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

const onResize = () => {
  console.log("リサイズされました");
};
</script>
```

一方、`useEventListener()`を使うとコンポーネント破棄時に自動的にイベントが破棄されるため、このような考慮が必要ありません。

▼useEventListener()を使う例

```
<script setup>
import { useEventListener } from "@vueuse/core";

useEventListener(window, "resize", () => {
  console.log("リサイズされました");
});
</script>
```

他にもVueUseにはWeb APIをラップした便利なコンポーザブル関数が多数用意されています。Web APIを使用する際はぜひ採用を検討してみてください。

### 便利なコンポーザブル関数 - リアクティブ編

Vue 3の最大の目玉機能はComposition APIでリアクティブな値を関数として扱えるようになったことです。Vue 2のOptions APIでは難しかった処理をシンプルにわかりやすく記述できるようになりました。

とはいえもっとシンプルに、もっと簡単に書けないか、と探求し続けることはコーディングの醍醐味と言っても過言ではありません。VueUseはその願いを叶える一助となるでしょう。

Vueのリアクティブ値は非同期な変更が反映されない、という問題があります。たとえば、次のコードでは`doublePromise1`はリアクティブ値の`num`が変更された際、その2倍の数を返す算出プロパティを想定しています。

▼非同期な値を返す算出プロパティの例（失敗例）

```
<script setup>
import { ref, computed } from "vue";

const num = ref(1);

// ❌computedはPromiseを解決しない！
const doublePromise1 = computed(async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(num.value * 2);
    }, 3000);
  });
});
</script>

<template>
  <div>
    <p>num: {{ num }}</p>
    <p>doublePromise1: {{ doublePromise1 }}</p>
  </div>
</template>
```

結果を下に示しました。`[object Promise]`という値が返却されるようです。（画像参照）

どうやら`computed`内ではPromiseオブジェクトを解決してくれないようです。これは期待値とは異なります。ではPromiseを解決した値を返すにはどうしたらよいでしょうか？　そのための関数がVueUseに用意された`computedAsync()`です。次のコードが使用例です。

▼computedAsync()を使い非同期な算出プロパティを取得する例

```
<script setup>
import { ref } from "vue";
import { computedAsync } from "@vueuse/core";

const num = ref(1);

const doublePromise2 = computedAsync(async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(num.value * 2);
    }, 3000);
  });
}, "計算中..."); // 初期値
</script>

<template>
  <div>
    <p>num: {{ num }}</p>
    <!--  num.value * 2が表示される  -->
    <p>doublePromise2: {{ doublePromise2 }}</p>
  </div>
</template>
```

![computedAsyncの例](https://ics.media/entry/230606/images/230606_promise.gif)

`num`が変更された3秒後に2倍の値が反映されるようになりました！　 これは、リアクティブな値に対応したパラメーターに対して、非同期にAPIを取得する際などに役立ちます。

`computedAsync`の使用例として、郵便番号をもとに住所を取得する例を示します。こちらのデモは株式会社アイビスの[郵便番号検索API](https://zipcloud.ibsnet.co.jp/doc/api)を使用しました。リアクティブ値の`postalCode`の変更に応じて住所を非同期で取得する処理を行います。

▼パラメーターによってAPIを都度取得する例

```
<script setup>
import { ref } from "vue";
import { computedAsync } from "@vueuse/core";
/**
 * 郵便番号から住所を取得する例です
 * 株式会社アイビスの郵便番号検索APIを使用しています：
 * https://zipcloud.ibsnet.co.jp/doc/api
 */
const postalCode = ref("");
const evaluating = ref(false);
const ENDPOINT = "https://zipcloud.ibsnet.co.jp/api/search";
const address = computedAsync(
  async () => {
    const url = `${ENDPOINT}?zipcode=${postalCode.value}`;
    if (postalCode.value.length !== 7) {
      return "7桁の郵便番号を入力してください";
    }
    const res = await fetch(url);
    const json = await res.json();
    const results = json.results;
    if (results === null) {
      return "住所が見つかりませんでした";
    }
    const result = results[0];
    return result.address1 + result.address2 + result.address3;
  }, 
  // 初期値
  "",
  evaluating
);
</script>

<template>
  <div>
    <input type="text" v-model="postalCode" placeholder="7桁の郵便番号を入力" />
    <p v-show="evaluating">取得中...</p>
    <p v-show="!evaluating">{{ address }}</p>
  </div>
</template>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230606_vueuse/#/promise)
-   [ソースコードを確認する](https://github.com/ics-creative/230606_vueuse/blob/main/src/pages/PromisePage.vue)

▼使用例

![郵便番号の検索例](https://ics.media/entry/230606/images/230606_postal.gif)

`computedAsync`をはじめとして、VueUseにはリアクティブ値を扱う便利な処理が多数用意されています。最初は抽象的で使い方があまりピンとこないものも多いですが、Composition APIに習熟するにつれ便利さを実感できるようになるでしょう。

### 便利なコンポーザブル関数 - utils編

ここではかゆいところに手が届く、「あったらいいな」を叶えてくれる便利関数を紹介します。

#### useWindowSize()

ブラウザのウィンドウサイズをリアクティブに取得できる関数です。さきほど「ブラウザ編」で紹介したリサイズの処理をさらに簡便に、扱いやすくしたものです。次に使用例を示します。

▼ブラウザのサイズを取得、表示するコンポーネントの例

```
<script setup>
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();
</script>

<template>
  <div>
    <p>width: {{ width }}</p>
    <p>height: {{ height }}</p>
  </div>
</template>
```

#### promiseTimeout()

指定秒間待機する処理を行う関数です。`setTimeout()`で記述する手間が省略できます。次のコードが使用例です。

▼1秒間待機する処理の例

```
<script setup>
import { promiseTimeout } from "@vueuse/core";
import { ref } from "vue";

const isReady = ref(false);
/**
 * isReadyをtrueにした1秒後にisReadyをfalseにする処理
 */
const timeout = async () => {
  isReady.value = true;
  await promiseTimeout(1000);
  isReady.value = false;
};
</script>

<template>
  <h2>promiseTimeout()の例</h2>
  <button @click="timeout">Ready</button>
  <p>ready: {{ isReady }}</p>
</template>

```

これらのデモも用意したので、よければご覧ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230606_vueuse/#/utils)
-   [ソースコードを確認する](https://github.com/ics-creative/230606_vueuse/blob/main/src/pages/Utils.vue)

#### useToNumber(), useToString()

数値と文字列を相互変換する関数です。地味ですが、意外と使い所は多いでしょう。次のコードが使用例です。

▼文字列型のリアクティブ値から数値型のリアクティブ値を作成する例

```
<script setup>
import { ref } from "vue";
import { useToNumber } from "@vueuse/core";

const str = ref("123")
/**
 * 文字列'123'を数値に変換したリアクティブな値を作成
 */
const number = useToNumber(str);

console.log(number.value); // 123
</script>
```

### まとめ

Composition APIの登場は単にVueの使い心地を良くしてくれただけでなく、コード資産の再利用に多大な貢献を果たしている、と筆者は考えます。ひとつのコンポーネント内で完結していた処理が複数のコンポーネントで使い回せるようになり、さらにはプロジェクトを横断して再利用できるようにもなりました。その最たる例のひとつがVueUseでしょう。

記事内で紹介した関数はほんのごく一部です。初学者の方は、まずは使い方がわかりやすいブラウザ系の関数から取り入れてみましょう。やがてVueやJavaScriptの扱いに慣れ、リアクティブな処理や非同期な処理といった難しい概念に触れるとき、VueUseの真の価値を理解できる日が来ます。

「これがほしいな」と思った関数はたいてい用意されています。使いこなすもこなさないもあなた次第です。ぜひあなたのプロジェクトにVueUseを取り入れてみてください。そしてゆくゆくはあなたの作成した関数でVueUseへ貢献してみましょう！　筆者も貢献を夢見て、研鑽を続けます。

### 参考

-   [VueUse](https://vueuse.org/)：VueUseの公式ドキュメントです
-   [コンポーネントを小さく・きれいに設計しよう Vue Composition APIを活用したコンポーネント分割術](https://ics.media/entry/210929/)：Composition APIを用いた「美しい設計」が紹介されています
-   [2022年の最新標準！ Vue 3の新しい開発体験に触れよう](https://ics.media/entry/220120/) ：Vue 3の登場がどのようなブレイクスルーをもたらしたか知りたい方は必見です