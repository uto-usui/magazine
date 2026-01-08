---
title: "API通信一切なし！Nuxt Composition APIで作る完全静的サイト"
source: "https://ics.media/entry/210120/"
publishedDate: "2021-01-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

Vue.jsにはOption APIやClass方式があり、Vue.jsバージョン3からはComposition APIも増え、さまざまな作り方があります。Vue.jsを基礎としているフレームワーク、Nuxt.jsも同様にNuxt Composition APIとしてNuxt.js用に拡張されたものがリリースされています。

さらにNuxt.jsには静的サイトジェネレートという強力な機能があります。Nuxtの静的化のための機能はOption APIで提供されていましたが、Composition APIでの使い方はあまり解説記事がありません。本記事ではNuxt Composition APIを使って静的サイトを生成する方法を解説します。

下記は実際にNuxt Composition APIで静的化したものと、非同期処理を比べたデモです。

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/211020_nuxt_composition_api_full_static/)
-   [コードを確認する](https://github.com/ics-creative/211020_nuxt_composition_api_full_static/tree/main/pages)

### Nuxtの完全静的サイトジェネレート

Nuxt.js 2.13から`asyncData()`メソッド・`fetch()`メソッドで取得するデータが静的化されました。`nuxt.config.js`の`target`を `"static"`と設定し`generate`すると、`asyncData()`および`fetch()`で取得する内容が`payload.js`という静的データで保存されます。それと同時に各ページで取得した内容が織り込み済みのHTMLが生成されます。

▼`asyncData()`を使った例。`result`の内容は静的な`payload.js`として保存され、HTMLにも出力されます。

```
export default {
  // @nuxt/httpモジュールを導入済みの場合asyncDataの引数から$httpを呼び出せます
  async asyncData({ $http }) {
    console.log("asyncData");
    const result = await $http.$get(
      `https://api.nuxtjs.dev/mountains/aconcagua`
    );
    return { data: result };
  },
};
```

これにより直接ページにアクセスした時も内容取得済みのHTMLが表示されます。ページ遷移においてもあらかじめ取得しておいた`payload.js`からデータが読み出すことで非同期通信を行いません。

また、Smart Prefechingと呼ばれるプリフェッチ機能により、`payload.js`自体もページ遷移が**実行される前に**行われるので高速なページ遷移が実現できます。

▼SSRなどの非静的なページの挙動。遷移時にAPI（api.nuxtjs.dev）と通信しています。

![ネットワークタブでAPIと通信している様子](https://ics.media/entry/210120/images/async.gif)

（※「upload.wikipedia…」のURLは画像の読み込み）

▼SSGの静的なページの挙動。遷移時にAPI（api.nuxtjs.dev）と通信していません。

![ネットワークタブでAPIと通信している様子](https://ics.media/entry/210120/images/static.gif)

### Composition APIにはasyncDataがない

完全静的化を強力にサポートする`asyncData()`と`fetch()`ですが、残念ながらNuxt Composition APIにはそれらが用意されていません。その代わり、`useAsync()`, `useFetch()`, `useStatic()`の3つの非同期処理メソッドが用意されています。

この3つの非同期処理うち、完全静的化で使用するのは`useFetch()`および`useStatic()`になります。`useAsync()`は`generate`後もページ遷移時には非同期通信を行って内容を取得します。

Nuxt Composition APIのv0.20.0未満では`useFetch()`を利用して`generate`を行っても静的化されない不具合がありました。最新のバージョンでは修正されているので、完全静的化を行う場合には`useFetch()`を使うのが便利でしょう。

### useFetchを使った静的化

`useFetch()`はAPIとの通信を行う関数をコールバックとして使用します。

```
export default defineComponent({
  setup() {
    const data = ref({}); // 取得してきたコンテンツを格納するリアクティブな値
    const { $http, route } = useContext(); // @nuxt/httpモジュールを導入済みの場合useContext()から呼び出せます。
    useFetch(async () => {
      // APIからコンテンツを取得する処理
      const result = await $http.$get(
        `https://api.nuxtjs.dev/mountains/denali`
      );
      // 取得したコンテンツを格納
      data.value = result;
    });
    return { data };
  },
})
```

取得してきたコンテンツは`data`に格納されるので、テンプレート側で利用すればコンテンツを表示できます。

`useFetch()`は`asyncData()`とは違い、ページコンポーネント**以外**でも利用できます。最新の記事を表示するサイドバーのようなコンポーネントからでも呼び出せます。

APIのURLの値に動的ルーティングの変数を用いれば、URLに応じたアクセスも可能です。

```
// _id.vueで使われている想定
export default defineComponent({
  setup() {
    const data = ref({}); // 取得してきたデータを格納するリアクティブな値
    const { $http } = useContext(); // @nuxt/httpモジュールを導入済みの場合useContext()から呼び出せます。
    const id = route.value.params.id;
    useFetch(async () => {
      // APIからデータを取得する処理
      const result = await $http.$get(
        `https://api.nuxtjs.dev/mountains/${id}`
      );
      // 取得したデータを格納
      data.value = result;
    });
    return { data };
  },
})
```

`/hoge`として上記ページにアクセスした場合、`https://api.nuxtjs.dev/mountains/hoge`にアクセスします。たとえばブログのようなURLに応じた動的なAPI問い合わせも実装できます。

`generate`コマンドで静的化するとAPIとの通信結果は先述の通り`payload.js`として保存され、生成された静的サイトではそのデータを読み込むので完全静的化が実現できます。

▼useFetchを使って完全静的化している様子。Smart Prefetch機能でpayload.jsは既に読み込み済みなので遷移が高速。

![useFetchを使って完全静的化している様子](https://ics.media/entry/210120/images/use-fetch.gif)

### useStaticを使った静的化

`useStatic()`を使っても静的化が可能です。`useStatic()`は3つ引数を取ります。第一引数はAPIとの通信結果を返すファクトリー関数、第二引数はリアクティブ、あるいは算出プロパティの値をもつパラメーター、第三引数は文字列のキーベースになります。なお、第二引数はファクトリー関数の第一引数にも使われます。ファクトリー関数の第二引数はパラメーターとキーベースを合体した値になります。

![useStaticメソッドの構造](https://ics.media/entry/210120/images/210120_nuxt_composition_api_use_static.png)

```
export default defineComponent({
  setup() {
    const { $http } = useContext(); // @nuxt/httpモジュールを導入済みの場合useContext()から呼び出せます。
    const param = computed(() => "hoge");
    const keyBase = "fuga";
    /* dataを非同期で取得する */
    const data = useStatic(
      async (param, key) => {
        console.log(param); // 結果：hoge
        console.log(key); // 結果：fuga-hoge
        /* 非同期処理の結果を必ずreturnする */
        return await $http.$get(`https://api.nuxtjs.dev/mountains`);
      },
      param,
      keyBase
    );
    return { data };
  },
});
```

少し複雑な形式ではありますが、上記のようなコードでAPIから取得してきた内容を`data`としてテンプレート側で利用できます。

こちらもパラメーターの値に動的ルーティングの変数を用いれば、URLに応じたAPIへのアクセスできます。

```
// _id.vueで使われている想定
export default defineComponent({
  setup() {
    const { $http, route } = useContext(); // @nuxt/httpモジュールを導入済みの場合useContext()から呼び出せます。
    /* 動的ルーティングの値を取得 */
    const param = computed(() => route.value.params.id);
    const keyBase = "fuga";
    const data = useStatic(
      async (param) => {
        /* 非同期処理の結果を必ずreturnする */
        return await $http.$get(`https://api.nuxtjs.dev/mountains/${param}`);
      },
      param,
      keyBase
    );
    return { data };
  },
});
```

実装後`generate`コマンドで静的化すると、APIからの取得データはファクトリー関数の`key`名のJSONデータ（最初の実装例の場合`fuga-hoge.json`）として保存されます。静的化サイトはルーティングによる遷移の際も書き出されたJSONデータを元に表示するので、もとのAPIとは通信しない完全静的化を実現できます。

![useStaticの挙動の様子](https://ics.media/entry/210120/images/210120_nuxt_composition_api_static.png)

また、2度目以降のアクセスはJSONデータがキャッシュされるので、JSONとの通信もなく非常には高速な遷移になります。

▼useStaticを使ったときの静的サイトの挙動。API（api.nuxtjs.dev）と通信せず、代わりにmount-everest.jsonを読み込んでいます。

![静的化されたJSONデータと通信している様子](https://ics.media/entry/210120/images/use-static.gif)

### useAsync

`useAsync()`は`asyncData()`相当するものと考えてよいです。ただし、Option APIのように完全静的化は行いません。そのため、コンテンツの取得のための非同期通信よりは認証のようなクライアントとの通信が常に必要な場合に`useAsync()`を利用すると良いでしょう。

### useStaticの利用場面

`useStatic()`はSmart Prefetch機能がありません。そのため静的サイトジェネレートの利用シーンにおいては`useStatic()`よりも`useFetch()`の方がメリットがあります。では、`useStatic()`はどのような場面で使えるかと言えば、サーバーサイドレンダリングにおいてです。

初回アクセス時はファクトリー関数を実行してAPI通信を行いますが、2回目以降はその内容が保存され、APIとの通信を行いません。`useFetch()`はアクセスの度にAPIとの通信を行うので、2回目以降のアクセスでは`useStatic()`の方が高速に表示します。

### まとめ

このようにNuxt Compostion APIを利用しても完全静的化が可能です。一方でNuxt Composition API自体はまだまだ開発途上でもあります。

Nuxt Composition APIの目的として次のように書かれています。

> the main aim is to allow experimentation and feedback before the final release of Nuxt 3. The API of Nuxt-specific methods will likely change before Nuxt 3 is released.
> 
> 訳：（Nuxt Composition APIの）主な目的は、Nuxt 3の最終リリースの前に実験とフィードバックすることです。Nuxt固有のメソッドはNuxt 3のリリース前に変更される可能性があります。

本命はNuxt 3であり、Nuxt Composition APIはその前哨戦でもあります。Nuxt 3のリリースを期待しつつ、先取り体験しておくのもよいかもしれません。