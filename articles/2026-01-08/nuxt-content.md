---
title: "マークダウンの力を引き出す！Nuxt Contentで快適なウェブサイト制作"
source: "https://ics.media/entry/241108/"
publishedDate: "2024-11-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Vue.jsのフレームワークであるNuxtには便利なプラグインがたくさんあります。マークダウンファイルとNuxtを連携する**Nuxt Content**はその中のひとつとしてよく用いられています。

読者の中には「NuxtってVue.jsのフレームワークでしょ？　私はReact派だし興味ないかな…。」という人も多くいると思います。

しかし、Nuxtの強みとして、**コミュニティ主導で質の高いモジュールが管理されている**ことが挙げられます。Nuxtコミュニティでは[Nuxt Modules](https://nuxt.com/modules)という名前でライブラリが管理、提供されています。Nuxt Contentもそのひとつです。

Nuxt Modulesに追加されるライブラリについてはコミュニティ内で実装ガイドラインが定められており、Nuxtチームのレビューを受けて追加されるため**品質が担保されています**。また、Nuxtで使いやすい形になっているため導入が容易で最小限のカスタマイズで使えるのが特徴です。

▼Nuxt Modules

![Nuxt Modules](https://ics.media/entry/241108/images/241108_nuxt_modules.png)

本記事ではNuxt Contentを通じたサイト制作手法を紹介します。Nuxt Contentを用いてマークダウンからブログサイトを構築します。

### Nuxt Contentの特徴

Nuxt Contentはマークダウンファイルで管理されるコンテンツを元に、コンテンツの一覧表示、検索機能、リンクの作成、ページネーションなどを提供するプラグインです。SQLデータベースシステムに強く影響を受けており、コンテンツから柔軟に情報を引き出しアプリケーションに表示できるのが魅力です。

Vueコンポーネントをマークダウンに埋め込むこともでき、とくに普段からVueを使っているエンジニアには魅力的なライブラリです。

[公式サイト](https://content.nuxt.com/)もNuxt Contentで作られているようです。ドキュメントのページもそれぞれマークダウンで作成されており、大量のコンテンツを扱うのに適したライブラリであることが伺えます。

▼ドキュメントページ

![Nuxt Content公式ページ](https://ics.media/entry/241108/images/241108_nuxt_content_official.png)

コンテンツをマークダウンファイルで管理することは、次のようなメリットがあります。

-   バージョン管理が容易
-   テキストエディターでの編集が可能
-   メタデータの追加などが柔軟に行える
-   ローカル環境でも確認できる

ICS MEDIAもマークダウンで原稿を管理しています。以下の記事でもそのことを紹介しているので、読んでみてください。

-   [WordPressをやめ静的サイトジェネレーターで高速化した話 - ICS MEDIAリニューアルの技術選定 -](https://ics.media/entry/190410/)

今回はデモとしてブログサイトの作成を通じ、Nuxt Contentの使い方を紹介します。

▼今回作成したデモサイト

![Nuxt Contentを用いた動画デモ](https://ics.media/entry/241108/images/241108_demo.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241108_nuxt_content/)
-   [ソースコードを確認する](https://github.com/ics-creative/241108_nuxt_content)

### 基本機能の紹介

まずはNuxt Contentの基本機能を紹介し、その後に実践的な解説をします。

#### Nuxt Contentの導入

[公式サイト](https://content.nuxt.com/docs/getting-started/installation)の手順に従い、Nuxt Contentを導入します。導入には、次の3つの手順を踏みます。

1.  Nuxt Contentモジュールのインストール
2.  `nuxt.config.ts`にモジュールを登録
3.  コレクションを作成

Nuxtプロジェクトを作成し、以下のコマンドでNuxt Contentライブラリをインストールします。Nuxtプロジェクトの作成方法は、[Nuxt公式ドキュメント](https://nuxt.com/docs/getting-started/installation)を参照ください。

```
npm install @nuxt/content
```

次に、`nuxt.config.ts`にモジュールを登録します。ルートディレクトリ直下の`nuxt.config.ts`ファイルの`module`フィールドに、`@nuxt/content`を追加します。

```
export default defineNuxtConfig({
  modules: ['@nuxt/content']
});
```

最後に、**コレクション**を作成します。2025年1月にリリースされたNuxt Contentのv3ではコンテンツの参照方法が大きく変わり、コンテンツの定義をコレクションというファイルでもつようになりました。これにより、コンテンツの情報が型レベルで取得できるようになり、Nuxtとコンテンツのよりシームレスな連携が可能になりました。

コレクションはルート直下の`content.config.ts`ファイルに記述します。定義ファイルを作成しなかった場合は、`content`ディレクトリのすべてのファイルを対象に自動的にコレクションが作成されます。

ファイルを作成して以下のコレクションを記述してください。

```
import { defineContentConfig, defineCollection } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    })
  }
});
```

これで`content`というコレクションが定義され、Vueファイルから参照できるようになりました。参照の方法は後述します。

#### コンテンツの作成

Nuxt Contentはルート直下の`content`ディレクトリでマークダウン、YAML、JSON形式のファイルを管理します。これらのファイルはNuxt Contentの強力なクエリ機能によってページ内で必要な情報に加工され、表示されます。

また、Nuxt Content独自のディレクトリ名やマークダウン記法によって扱いやすいデータにできます。

例として、以下のようなマークダウンファイルを作成します。

▼content/index.md

```
# はじめての投稿

これは最初のコンテンツです。
```

#### コンテンツの取得と表示

コンテンツを表示するには、コンテンツの取得と表示を行う必要があります。

コンテンツの取得には`queryCollection()`関数を使用します。詳細な使い方は後述しますが、以下の例では`content`コレクション直下のうち最初のコンテンツを取得しています。今回は上記で作成した`content/index.md`を取得すると想定します。

ここで取得したコンテンツは`ContentRenderer`コンポーネントの`value` propsに渡すことでHTMLとして出力されます。

```
<script setup lang="ts">
const { data } = await useAsyncData(() => queryCollection('content').path('/').first())
</script>

<template>
  <ContentRenderer v-if="data" :value="data" />
  <div v-else>コンテンツが見つかりませんでした。</div>
</template>
```

この場合は、ブラウザで以下のHTMLとして表示されます。

▼レンダリング結果

```
<h1>はじめての投稿</h1>
<p>これは最初のコンテンツです。</p>
```

ここまでが簡単なコンテンツの作成から表示までの流れです。ここからは、より詳細なNuxt Contentのルールやテクニックを見ていきましょう。

### コンテンツの書き方

Nuxt Contentでは、Nuxtでコンテンツファイルを便利に扱うためのいくつかの記法が存在します。

#### コレクションとフロントマター

マークダウンファイルにメタデータを記述する方法として、フロントマターがあります。フロントマターはマークダウンファイルの先頭に記述され、コンテンツのタイトルや説明、公開日などの情報を記述します。フロントマターはページには表示されません。

▼フロントマターの例

```
---
title: ページのタイトル
description: ページの説明
navigation: true
draft: false
date: 2024-11-08
tag:
  - Nuxt
  - 初心者
---

<!-- Content of the page -->
```

以下のフィールドはNuxt ContentのAPIと組み合わせが可能な予約語になっています。

-   `title`：コンテンツのタイトル
-   `description`：コンテンツの説明
-   `navigation`：`false`のとき`queryCollectionNavigation`の結果から除外される。

#### 独自のフロントマターの追加

予約語以外のフロントマターを追加する場合、コレクションに定義を追加する必要があります。定義を追加するには、以下の手順を踏みます。

1.  `@nuxt/content`から`z`オブジェクトをimport
2.  コレクションに`schema`フィールドを追加し、フィールドのスキーマを定義する

`z`オブジェクトはZodというバリデーションライブラリがもつ機能です。Nuxt Contentが内部的にZodを持っているため、`@nuxt/content`からimportしています。

以下の例では、フロントマターに`draft`, `date`, `tag`フィールドを追加しています。Zodの機能を使用して、スキーマの型を指定できます。

▼content.config.ts

```
// ⭐️ "z"を追加でimportする
import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
      // ⭐️メタデータの追加
      schema: z.object({
        draft: z.boolean(),
        date: z.date(),
        tag: z.array(z.string())
      })
    })
  }
});
```

Zodについては次の記事でも解説しているので、詳しく知りたい場合は読んでみてください。

-   [ReactとZodで作る堅牢なフォームバリデーション](https://ics.media/entry/240611/)

スキーマを定義することで、`queryCollection`で取得するデータに型定義が追加されます。先ほどの例に以下の機能を追加する例を示します。

-   `draft`が`true`のコンテンツを除外
-   `date`フィールドから公開日を取得

```
<script setup lang="ts">
const { data } = await useAsyncData(() => queryCollection('content')
  .path('/')
  .where("draft", "=", false) // ⭐️ draftがfalseのものだけをクエリする
  .first())
</script>

<template>
  <div v-if="data">
    <p>公開日：{{data.date}}</p>
    <ContentRenderer :value="data" />
  </div>
  <div v-else>コンテンツが見つかりませんでした。</div>
</template>
```

`data.date`フィールドには`Date`型が付与されていることも確認できます。スキーマで定義した型と一致しないものをフロントマターに設定するとNuxtがエラーを起こすので、書き方を強制することも可能です。

コレクションによるスキーマ定義は、フロントマターをアプリケーションで堅牢に扱うための強力な手段です。

#### 静的ファイルについて

Nuxt Contentのマークダウン内で使用するコンテンツは`pubilc`ディレクトリに配置する点に注意しましょう。

```
content/
  index.md
public/
  img/
    image.png
nuxt.config.ts
package.json
tsconfig.json
content.config.ts
```

マークダウンの中で画像を使用する際は以下のように記述します。

```
![alt文言](/img/image.png)
```

GitHubやVisual Studio Codeのマークダウンプレビューでは画像がプレビューできないので、Nuxtアプリケーションを起動して確認しましょう。

### Nuxt Content実践

基本的なコンテンツの作り方を学習したところで、Nuxt Contentを使ったブログサイトを作ってみましょう。以下の機能を例に、それぞれ作り方を解説します。

-   ナビゲーションの作成
-   コンテンツの一覧表示
-   コンテンツの詳細表示
-   タグ検索機能

サンプルとソースコードは以下のリンク先です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241108_nuxt_content/)
-   [ソースコードを確認する](https://github.com/ics-creative/241108_nuxt_content)

#### コンテンツ構成

今回は、トップページとブログページの2つを作成します。`1.index`ディレクトリと`2.blog`ディレクトリにそれぞれのページのコンテンツを格納します。

```
content/
  1.index/
    1.index.md
  2.blog/
    index.md
    0401.md
    0402.md
```

ディレクトリの接頭辞に数字を設定しているのは並び順を定義するためです。Nuxt Contentではファイル名やディレクトリ名の接頭辞に数値を設定すると、コンテンツの並び順を指定できます。これは指定した順番でコンテンツを並べるのに便利です。 それぞれのコンテンツのパスが発行されるときは接頭辞が外れます。

例）`2.blog/0401.md`→`/blog/0401`

コレクションは以下のように定義します。`blog`コレクションでは`2.blog`ディレクトリ直下のマークダウンファイルのみを取得します。

▼content.config.ts

```
import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      source: "**/*.md",
      type: "page",
    }),
    blog: defineCollection({
      source: "2.blog/*.md",
      type: "page",
      schema: z.object({
        draft: z.boolean(),
        tag: z.array(z.string()),
        date: z.string(),
      }),
    }),
  },
});
```

#### ナビゲーションの作成

`queryCollectionNavigation`関数はコレクションのナビゲーションツリーを取得する関数です。たとえば`docs`コレクションを対象にすると、以下のような配列が取得できます。

▼取得する関数

```
const { data: navigation } = await useAsyncData("navigation", () =>
  queryCollectionNavigation("docs"),
);
```

▼結果

```
[
  { title: "Top", path: "/", stem: "1.index/1.index" },
  {
    title: "Blog",
    path: "/blog",
    stem: "2.blog",
    children: [
      { title: "BLOG始めました", path: "/blog/241105", stem: "2.blog/241105" },
      { title: "2つ目の記事です", path: "/blog/241113", stem: "2.blog/241113" },
      // 省略...
    ],
    page: false,
  },
]
```

ちなみに`blog`コレクションを対象にすると、`2.blog`ディレクトリのみが対象になるためトップページは除外された結果が取得できます。

ここで得た結果はヘッダーやサイドバーなど、必要に応じて柔軟に使用できます。今回はグローバルナビゲーションとして、トップレベルのルートだけを使用したコンポーネントに使用しましょう。

▼HeaderNav.vue

```
<script setup lang="ts">
const { data } = await useAsyncData("header", () =>
  queryCollectionNavigation("docs"),
);
</script>

<template>
  <ul v-if="data">
    <li v-for="link of data" :key="link.path">
      <NuxtLink :to="link.path" class="link">{{ link.title }}</NuxtLink>
    </li>
  </ul>
</template>
```

-   [ソースコードを確認する](https://github.com/ics-creative/241108_nuxt_content/blob/main/components/HeaderNav.vue)

![ナビゲーションの表示](https://ics.media/entry/241108/images/241108_nuxt_content_navjigation.png)

#### コンテンツの一覧を表示

ブログページで記事一覧を表示するコンポーネントを作成します。`queryCollectionNavigation`を使用してもよいですが、今回は`queryCollection`で`blog`コレクション内の全記事を取得してきます。

使い分けの明確な基準はありませんが、トップからのツリーを取得したいか、特定のパス内のコンテンツを取得したかで使い分けると良いかもしれません。

次の例では`blog`コレクションから取得したすべてのコンテンツのタイトルを降順で並べています。

▼pages/blog/index.vue

```
<script setup lang="ts">
import { parseDate } from "~/utils/parseDate";

const { data } = await useAsyncData("blog", () =>
  queryCollection("blog").order("id", "DESC").all(),
);
</script>

<template>
  <main>
    <ul v-if="data" class="list">
      <li v-for="article in data" :key="article.path" class="list_item">
        <NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
        <span class="date">{{ parseDate(article.date) }}</span>
        <div v-for="tag in article.tag" :key="tag" class="list_item_tag">
          {{ tag }}
        </div>
      </li>
    </ul>
  </main>
</template>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241108_nuxt_content/blog)
-   [ソースコードを確認する](https://github.com/ics-creative/241108_nuxt_content/blob/main/pages/blog/index.vue)

▼結果イメージ

![コンテンツ一覧](https://ics.media/entry/241108/images/221108_content_list.png)

`date`や`tag`フィールドはコレクションのスキーマで定義しているため、型が保証されて取得できるのは嬉しいポイントです。

#### コンテンツの詳細を表示

ひとつのコンテンツを表示するには、冒頭で示したように`queryCollection().first()`で取得したコンテンツを`ContentRenderer`コンポーネントの`value` propsに渡せば表示できます。

次に示すのはブログページの詳細画面です。現在のパスに対応するコンテンツを取得するため、`queryCollection()`関数に`path()`メソッドをつなげて、現在のパスを引数にしています。これにより、パスが一致するコンテンツのみを取得できます。

▼pages/blog/\[…slug\].vue

```
<script setup lang="ts">
import { parseDate } from "~/utils/parseDate";
const route = useRoute();
const { data } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).first(),
);
</script>

<template>
  <main class="article">
    <article v-if="data">
      <h1 class="title">{{ data.title }}</h1>
      <p class="date">{{ parseDate(data.date) }}</p>
      <ContentRenderer :value="data" />
    </article>
    <div v-else>
      <h1>記事が見つかりませんでした</h1>
    </div>
  </main>
</template>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241108_nuxt_content/blog/241117)
-   [ソースコードを確認する](https://github.com/ics-creative/241108_nuxt_content/blob/main/pages/blog/%5B...slug%5D.vue)

#### タグ検索

ここまでに、`queryCollection()`関数による絞り込みや並び替えの機能を使用してきました。ほかにも以下のようなクエリ検索が行えます。

-   取得上限
-   特定のフィールドで絞り込んだコレクションの取得
-   AND, OR検索

Nuxt ContentはSQLに強く影響を受けているため、SQLと同じようなことが多く行えます。`LIKE`を使ったクエリを試してみましょう。例として、特定のタグをもつコンテンツだけを取得します。

`queryCollection`に`where`メソッドをつなげ、`"tag"`フィールドに`LIKE`検索を行った例です。`"tag"`フィールドはフロントマターに**配列として**定義されているため、`IN`や`BETWEEN`句ではヒットしません。そこで、SQLでも使われている`LIKE`句でパターンマッチを行います。

次の例では、現在のパスと合致するタグを含むコンテンツをパーセントワイルドカードで検索しています。

▼pages/blog/tag/\[tag\].vue（抜粋）

```
const route = useRoute();
const { data } = await useAsyncData(route.path, () =>
  queryCollection("blog")
    .where("tag", "LIKE", `%${route.params.tag}%`)
    .order("id", "DESC")
    .all(),
);
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241108_nuxt_content/blog/tag/%E5%88%9D%E5%BF%83%E8%80%85)
-   [ソースコードを確認する](https://github.com/ics-creative/241108_nuxt_content/blob/main/pages/blog/tag/%5Btag%5D.vue)

これにより、検索中のタグをもつコンテンツの一覧だけを取得できました。

▼「初心者」タグをもつコンテンツのみ表示

![タグ検索の例](https://ics.media/entry/241108/images/241108_content_tag.png)

### Vueコンポーネントをマークダウンで使用する

最後に、標準のマークダウンでは使用しない、Nuxt Content独自の記法を紹介します。

通常、マークダウンの内容にフロントエンドの技術を持ち込むことはできません。しかし、Nuxt Contentは作成したVueコンポーネントをマークダウン内で使用し、表示できます。

以下は`BoxComponent`というコンポーネントを作成し、マークダウンの中で使用する例です。コンポーネントを使用する際は、`::`で囲みます。propsを渡すこともできます。

```
::BoxComponent
Vueコンポーネントで作成しています
::

::BoxComponent{color="red"}
propsを渡すこともできます
::
```

`BoxComponent`は以下のように実装しました。マークダウン内のコンテンツを流し込みたい箇所には`slot`要素を使います。

▼components/content/BoxComponent.vue

```
<script setup lang="ts">
const props = defineProps<{ color?: string }>();
</script>

<template>
  <div>
    <div class="box" :style="{ color: props.color, borderColor: props.color }">
      <slot mdc-unwrap="p" />
    </div>
  </div>
</template>

<style scoped>
  .box {
    margin: 8px 0;
    display: inline-block;
    padding: 4px 8px;
    border: 1px solid #000;
  }
</style>
```

`slot`要素に`mdc-unwrap`というpropsがあります。これは、slot内のコンテンツから特定のタグを取り除きたいときに使用します。デフォルトでは`p`タグなどでラップされてしまうので、アンラップしたほうが都合がよいときはこのpropsを使用します。

```
<!-- unwrapしなかった場合 -->
<div class="callout">
  <p>This is a callout.</p>
</div>

<!-- unwrapした場合 -->
<div class="callout">
  This is a callout.
</div>
```

また、マークダウンに埋め込んだコンポーネントでは**スクリプトも実行されます**。たとえば、カウンターのように値の保持、更新を行うコンポーネントも使用できるということです。

描画結果をまとめると以下のようになります。

![コンポーネントを描画する例](https://ics.media/entry/241108/images/221108_interactive.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241108_nuxt_content/blog/241117)
-   [ソースコードを確認する](https://github.com/ics-creative/241108_nuxt_content/blob/main/content/2.blog)（241117.mdを開いてください）

独自のコンポーネントを使用できるのは、他のマークダウンツールにはない魅力です。

### まとめ

マークダウンをベースにコンテンツサイトを簡単に作成できるNuxt Contentについて紹介しました。マークダウンとして記事が管理できる点、マークダウンのファイル名や階層、メタデータを使ってコンテンツの表示を制御できるのはとても魅力的なライブラリだと感じています。

一方で、読者の多くはこう思ったのではないのでしょうか。

「マークダウンは記法を覚えたりプレビューしたりするのが大変だし、エンジニアじゃなくても使えるように編集画面がほしいな…」

そんなあなたへ次回予告です。次回の記事では[Nuxt Studio](https://nuxt.studio/)を紹介します。Nuxt StudioはNuxt ContentをGitベースのCMSとして活用する強力な編集ツールです。

画面上でのマークダウンの編集はもちろん、リアルタイムなプレビュー、共同編集やドラフト機能、アセットの管理やNuxtで作成した独自コンポーネントの挿入まで画面上で行えます。

▼操作の様子

次回の記事ではNuxt ContentとNuxt Studioの連携方法やNuxt Stuioの魅力について紹介します。お楽しみに！

### Nuxt Content v2からv3へ

本記事の公開時点ではNuxt Contentはv2でしたが、2025年1月にv3がリリースされました。v3ではこれまでのファイルベースのコンテンツ管理からSQLのデータベースシステムに移行したというのが大きな変化です。公式ブログでも語られています。

-   [Nuxt Content v3](https://content.nuxt.com/blog/v3)

若干プログラマティックになって難易度が上がった印象はありますが、コレクションの定義ができたり、APIがかなり削減されシンプルになったりと開発者的としては合理的な進化を遂げていると感じています。

また、Nuxt Studioとの連携機能がかなり進化しているのも大きな見どころです。これまでv2を使っていた人も、使いやすさを実感するためにぜひマイグレーションしてみてください。

v2からv3へのマイグレーション手順についてはドキュメントを参照ください。

-   [Migration - How to migrate from v2 to v3](https://content.nuxt.com/docs/getting-started/migration)