---
title: "ブラウザでマークダウンを編集！？ Nuxt Studioことはじめ"
source: "https://ics.media/entry/250203/"
publishedDate: "2025-02-07"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

以前の記事「[マークダウンの力を引き出す！ Nuxt Contentで快適なウェブサイト制作](https://ics.media/entry/241108/)」では、**Nuxt Content**について紹介しました。Nuxt ConetentはVue.jsのフレームワークであるNuxtのモジュールで、マークダウンなどのコンテンツからサイトを作る強力なプラグインです。

Nuxt Contentそれ自体も強力なコンテンツ管理、運用システムですが、WordPressやヘッドレスCMSといった既存のコンテンツ管理システムと比べると以下の課題があります。

-   マークダウンの知識が要求されるため、コンテンツの作成が難しい
-   Nuxtを起動する必要があるため、環境構築する必要がある

つまり、「開発者しかコンテンツが作成できない」のが大きな課題です。

Nuxt Contentを使いつつその課題を解決するのが**Nuxt Studio**です。Nuxt StudioはNuxtのモジュールではなく、Webサービスのひとつとして提供されています。

Nuxt Studioは、Nuxt Content内のコンテンツをブラウザ上で視覚的に編集するエディターを搭載しています。これにより、開発者と編集者のシームレスなコラボレーションが可能となります。

本記事は以下の内容を含みます。

-   Nuxt Studioのはじめかた
-   NuxtアプリケーションとNuxt Studioの連携
-   Nuxt Studioで使えるテクニック

本記事を読んで、次世代のCMS、Nuxt Studioを使ってみましょう！

### Nuxt Studioとは？

前述の通り、Nuxt StudioはNuxt Content内のコンテンツをブラウザ上で編集できます。誰もが簡単にコンテンツを作成できるよう、以下の機能が提供されています。

-   Notionのようなビジュアルエディター上でのコンテンツの追加、作成、編集
-   Nuxtアプリケーション上でのリアルタイムなコンテンツのプレビュー表示
-   マークダウンのメタデータをインタラクティブに変更できる入力フォーム
-   コンテンツへのVueコンポーネントの挿入
-   共同編集機能（有料）

Nuxt Studio上で行った変更はマークダウンなどのコンテンツファイルに反映され、GitHubレポジトリに送信できます。一般的なブログサービスやコンテンツ管理サービスはデータが事業者のサーバーに保存されることが多いですが、Nuxt Studioはあくまで**自身のGitHubレポジトリにあるコンテンツ**を視覚的に編集できるという特徴があります。

Gitによるコンテンツ管理のメリットを保ちつつ、インタラクティブな操作を可能にしたプラットフォーム、それがNuxt Studioです。

また、有料プランではリアルタイム共同編集なども可能です。詳細については、以下のリンクをご確認ください。

-   [Nuxt Studio - Pricing](https://content.nuxt.com/studio/pricing)

![Nuxt Studio Pricing](https://ics.media/entry/250203/images/250206_pricing.png)

ここからは、実際にNuxt Studioのプロジェクトを作りながら使い方を解説します。

### Nuxt Studioツアー

ここからは、Nuxt Studioの画面を見ていきます。

#### アカウントの作成

Nuxt Studioを使用するにはGtiHubアカウントかGoogleアカウントでログインする必要があります。開発者はGitHubで、編集者はGoogleでのログインを想定しています。Googleアカウントでログインした場合はプロジェクトの作成ができないなど一部操作に制限があるため、今回はGitHubでログインします。

![ログインページ](https://ics.media/entry/250203/images/250206_login.png)

#### プロジェクトの作成

ログインすると、プロジェクトページに遷移します。

![プロジェクトページ](https://ics.media/entry/250203/images/250206_projects.png)

Nuxt Studioでプロジェクトを作成する方法は2つあります。

-   Nuxt Studioから新たにプロジェクトを作成する
-   GitHubレポジトリにあるNuxt Contentを使用したプロジェクトを取り込む

今回は新たにプロジェクトを作成します。プロジェクトはテンプレートから作成でき、有料プラグインのNuxt UIを使用したものと、無料の「Minimal Starter」テンプレートがあります。今回はMinimal Starterテンプレートを使用します。

「Use this template」ボタンをクリックしプロジェクト作成画面に遷移します。プロジェクトを作成するレポジトリとレポジトリ名を入力して、レポジトリを作成しましょう。

![プロジェクトの作成](https://ics.media/entry/250203/images/250206_start_project.png)

しばらく待つと、プロジェクトが作成されました！

#### プロジェクト構成

作成されたプロジェクトの中身を見ていきましょう。コンテンツに関連した3つのページを紹介します。

![コンテンツ関連のタブ](https://ics.media/entry/250203/images/250206_content.png)

**Content**タブでは、マークダウンファイルの一覧が表示されます。テンプレートではあらかじめ2つのマークダウンファイルが用意されています。

**Media**タブは画像などのファイルを表示します。コンテンツで使用するファイルはこのタブから確認、アップロードができます。

**Data**タブはアプリケーション内で使用する定数を編集できます。デフォルトでは設定されておらず、Nuxtプロジェクトで設定することで使用できます。

今回の記事ではDataの扱いには触れませんが、共通のカラーコード、文言、出し分けのフラグなどNuxtで使用できる変数はすべてここで切り替えられます。そのため、後述のプレビュー画面で見た目を素早く切り替えて確認するのに便利です。

Dataの詳細については以下のリンクを参照ください。

-   [Nuxt Content - Tailor application configuration edition](https://content.nuxt.com/docs/studio/config)

#### コンテンツ編集画面

さて、いよいよNuxt Studioの肝であるコンテンツ編集画面を見てみましょう！Contentタブから、コンテンツをひとつ開きます。

マークダウンを視覚的に編集できるビジュアルエディターが開きました。データ入力に優れているウェブアプリケーションの[Notion](https://www.notion.com/ja)のビジュアルエディターを模倣しており、公式ではNotion-likeエディターと呼ばれています。

通常のテキスト入力はもちろん、段落の頭でスラッシュ（`/`）を入力すると、入力メニューが選択でき、見出しや画像、Nuxtで作成したVueコンポーネントが挿入できます。

マークダウンのメタデータ（フロントマター）も視覚的に変更できます。上部の「Page Setting」を開くと`title`や`description`の入力フォームが表示されます。ここの項目はNuxtアプリケーションの設定ファイル（`content.config.ts`）に応じて項目が増えます。

操作の様子をキャプチャしました。

![操作の様子](https://ics.media/entry/250203/images/250206_editor_shortcut.gif)

コンテンツが変更されると、変更内容をGitHubレポジトリに反映できます。「Review ~ changes」から変更内容を確認し、コミットメッセージを入力して「Publish changes」を実行するとレポジトリに反映されます。

#### プレビュー機能

**プレビュー機能**はNuxt Studioの強力な機能です。Nuxtアプリケーションの画面を表示しながら、リアルタイムにコンテンツの変更が確認できます。

プレビュー機能を使用するにはGitHub Pagesのデプロイが必要です。Deployタブを開き、Nuxt Studioからデプロイしてみましょう。

デプロイが成功すると、Previewスイッチが有効になります。Contentタブに移動し、プレビューを有効にしてみましょう。

マークダウンの内容が表示されました！さらに、マークダウンを編集すると、リアルタイムで内容が変更されます。

### Nuxtアプリケーションのカスタマイズ

ここまでは、マークダウンの内容をNuxtで表示するアプリケーションを使用してプレビュー、編集を行ってきました。しかし、Nuxt StudioおよびNuxt Contentの真の魅力は、**アプリケーションとコンテンツの連携です**。ここからは、ヘッダーや独自のコンポーネントを作成しながらアプリケーション内でよりコンテンツを活用する方法を紹介します。

まずは下準備として、Nuxtアプリケーションの編集を行います。プロジェクト作成時にGitHubレポジトリにNuxtプロジェクトが作成されているので、このプロジェクトをクローンして自身の環境で開いてみましょう。

`npm install`を行い、`npm run dev`でアプリケーションを起動して`localhost:3000`にアクセスすると、Nuxt Studioのプレビュー画面と同様の画面が表示されます。

また、`content`ディレクトリの`index.md`ファイルを編集して保存すると画面の内容が更新されます（これはNuxt Contentの機能です）。

表示されているのは`pages/[...slug].vue`コンポーネントです。実際のプロジェクトでは目的にあわせてコンテンツごとのページを作成する場合が多いですが、今回はこのページだけを使用します。

![初期ページ](https://ics.media/entry/250203/images/250206_localhost.png)

Nuxt Studioとの連携機能を紹介するため、コンテンツ内で使用するカードコンポーネントと、各ページへのリンクを表示するヘッダーコンポーネントを作成します。また、記事の日付を表示するためマークダウンに属性を追加します。

#### カードコンポーネント

Nuxt Contentはコンテンツ内でVueファイルを使用できます。ここではそこでの使用を想定したカードのコンポーネントを作成します。

特筆すべき点は3つです。

-   それぞれ、サムネイル、タイトル、説明文を担当する`<slot>`コンポーネントを作成する
-   `mdc-unwrap`属性を付ける
-   スロット内のimg要素にスタイルを適用するため、`:slotted()`擬似クラスを使用する

```
<template>  
  <div class="card">  
    <div>  
      <slot name="thumbnail" mdc-unwrap="p"  />  
    </div>  
    <p class="title">  
      <slot name="title" mdc-unwrap="p" />  
    </p>  
    <p class="description">  
      <slot name="description" mdc-unwrap="p"/>  
    </p>  
  </div>  
</template>  
  
<style scoped>  
.card {  
  /* 省略 */
}  

/* slot内のimg要素のスタイルを設定 */
:slotted(img) {  
  object-fit: cover;  
  width: 100%;  
  height: 100%;  
}  
</style>
```

-   [ソースコードを確認する](https://github.com/ics-creative/250204_nuxt_studio/blob/main/app/components/Card.vue)

`<slot>`コンポーネントに指定した`name`属性はNuxt Studio上で表示される名称なので、わかりやすくしておきましょう。

`mdc-unwrap`属性はマークダウンをHTML化したときにタグで囲まれないようにする対応です。前回記事の[Vueコンポーネントをマークダウンで使用する](https://ics.media/entry/241108/#vue%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%82%92%E3%83%9E%E3%83%BC%E3%82%AF%E3%83%80%E3%82%A6%E3%83%B3%E3%81%A7%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B)で解説しています。

また、scoped CSSでは`<slot>`内の要素にスタイルが当たらないため、`:slotted()`擬似クラスを使用してスタイルを適用しています。

さて、このカードをマークダウン内に埋め込んでみましょう。

▼content/index.md

```
::card
#thumbnail
![profile.png](/profile.png)
#title
自己紹介カード
#description
こんにちは！私はICS MEDIAを執筆しています。一緒にフロントエンドについて学習していきましょう！
::
```

マークダウン内でコンポーネントを使用するには`::`にコンポーネント名をつなげます。どの`<slot>`に要素を挿入するかは`name`属性を`#`で指定して決定します。

この状態でブラウザを確認すると、カードが挿入されていることが確認できます。

![カードコンポーネント](https://ics.media/entry/250203/images/250206_card.png)

#### ヘッダーコンポーネント

ヘッダーコンポーネントは以下のように作成しました。`queryCollectionNavigation()`関数でコンテンツの一覧のリンクを取得し、並べています。

今回は、`index.md`と`about.md`から生成された2つのリンクが表示されます。

```
<script setup lang="ts">  
const {data} = await useAsyncData("header", () =>  
  queryCollectionNavigation("content"),  
);  
</script>  
  
<template>  
  <ul>  
    <li v-for="link in data" :key="link.path">  
      <NuxtLink :to="link.path">{{ link.title }}</NuxtLink>  
    </li>  
  </ul>  
</template>

<style scoped>
// 省略
</style>
```

-   [ソースコードを確認する](https://github.com/ics-creative/250204_nuxt_studio/blob/main/app/components/Header.vue)

コレクションはデフォルトで作成されています。あとで使うので、日付のスキーマ定義を追加しておきましょう。

▼content.config.ts

```
import { defineContentConfig, defineCollection } from '@nuxt/content';
  
export default defineContentConfig({  
  collections: {  
    content: defineCollection({  
      type: 'page',  
      source: '**',  
      // ⭐️dateスキーマを追加
      schema: z.object({
        date: z.string()  
      })
    }),  
  },  
});
```

注意点として、Nuxt Studioでは2025年2月現在、複数のコレクションを定義するとうまく動かないようです。今後の改善が期待されますが、今のところは単一のコレクションを用いるようにしましょう。

ヘッダーと記事の日付を記事ページに表示します。

```
<script setup lang="ts">  
const route = useRoute();
  
const {data: page} = await useAsyncData('page-' + route.path, () => {  
  return queryCollection('content').path(route.path).first()  
});
  
if (!page.value) {  
  throw createError({statusCode: 404, statusMessage: 'Page not found', fatal: true});  
}  
</script>  
  
<template>  
  <div>
    <!-- ⭐️ヘッダーを追加 -->
    <Header/>
    <!-- ⭐️記事の日付を追加 -->
    <p v-if="page?.date">{{ page.date }}</p>
    <ContentRenderer v-if="page" :value="page"/>
  </div>  
</template>
```

-   [ソースコードを確認する](https://github.com/ics-creative/250204_nuxt_studio/blob/main/app/pages/%5B...slug%5D.vue)

ヘッダーは表示されましたが、日付が表示されません。これはコンテンツに日付が設定されていないからです。マークダウンファイルのフロントマターにdate属性を設定してあげましょう。

▼content/index.md

```
---  
title: Top  
date: 2025/2/3
---
```

これでヘッダーが表示されました！日付も表示されています。

![ヘッダー](https://ics.media/entry/250203/images/250206_header.png)

ヘッダー内のリンクの並び順が気になりますが、あとでNuxt Studio上で変更します。変更をGitHubにプッシュしておきましょう。

### Nuxt Content × Nuxt Studio

さて、カスタマイズしたアプリケーションがNuxt Studioでどのように見えるか確認してみましょう。

再びNuxt Studioの画面に戻りプレビューを確認すると、ヘッダーなどの変更が反映されていますね。ここで先ほど追加したアプリケーションの機能を活用します。

#### カスタムコンポーネントの挿入

Nuxt Studio上で作成したカードコンポーネントを挿入してみましょう。

エディター上で`/card`と入力し、カード要素を挿入します。`+`ボタンで`Title`と`Description`の入力欄を追加します。`Thumbnail`欄には画像を挿入するので、`/image`と入力してメディア一覧から画像を挿入します。アップロードして使用することも可能です。

TitleとDescriptionも入力すると、プレビュー画面にはカード要素が配置されていることが確認できます！

#### メタデータの変更

記事の日付をNuxt Studio上で変更してみましょう。Page Settingを開くと、先ほどまでなかった`date`フィールドが追加されています。ここの値を別の値に変えてプレビュー画面を確認すると、日付の変更が確認できます。

![メタデータの変更](https://ics.media/entry/250203/images/250206_studio_meta.gif)

#### コンテンツの追加

Nuxt Studioでは、コンテンツの編集だけでなく追加、削除も行えます。例としてお知らせページを追加します。Contentタブを開き、ファイルを追加してファイル名を`info.md`とします。

![ファイルの追加](https://ics.media/entry/250203/images/250206_add_file.png)

このとき、ヘッダーに自動的に項目が追加されます。`info.md`のページ設定から`Title`を`Info`にしておきましょう。

並び順が気になるので、Nuxt Contentの仕組みを使って並び順を設定します。それぞれのファイル名を変更し、接頭辞に`数字.`をつけます。これにより、Nuxt Content内で並び順を認識し、意図通りにリンクが並んでくれました。

-   `index.md` → `1.index.md`
-   `about.md` → `2.about.md`
-   `info.md` → `3.info.md`

![ヘッダー比較図](https://ics.media/entry/250203/images/250206_header_index.png)

最後に「Review ~ changes」ボタンから変更を反映しておきましょう。

以上、簡単でしたがNuxt Studioの機能について紹介しました。

### Nuxt Studio Tips

ここでは、筆者がNuxt Studioを触っていて気になった点を軽く紹介します。

#### 要素を追加したあと、行が追加できない

最後の行にコンポーネントなどを追加した際、次の行に入力欄が出現しないことがあります。そのときは、段落の左のメニューから「Insert below」を実行ください。

![段落の追加](https://ics.media/entry/250203/images/250206_insert_below.png)

#### プレビューにデータが反映されない

Nuxt Studioはまだいくつかのバグがあり、プレビューされない場合があるようです。筆者が確認している限りでは、以下の問題がありました。

-   日付のスキーマを`z.date()`にすると、Nuxt Studio上でメタデータが変更できない
-   `content.config.ts`でコレクションを複数定義すると、2つ目以降のコレクションが取得できない
-   `nuxt.schema.ts`に設定したアプリケーションのデータを、Nuxt StudioのDataタブで変更すると反映されないことがある

Nuxt Studioの改善が待たれますが、それまではなるべくシンプルな文字列型や数値型を利用するようにして、単一のコレクションを使用しましょう。

### まとめ

Nuxt Contentで扱うコンテンツファイルを視覚的に編集できるNuxt Studioについて紹介しました。

今回作成したサンプルページはGitHub Pagesで公開されています。よければ確認ください。

-   [サンプルを別ウインドウで開く](https://ics-creative-250204-nuxt-studio.nuxt.space/)
-   [ソースコードを確認する](https://github.com/ics-creative/250204_nuxt_studio/tree/main)

マークダウンファイルでコンテンツを管理するメリットを活かしつつ、既存のCMSと遜色のないレベルでコンテンツを編集できる点はNuxt Studioの大きな魅力です。

さらに、強力なプレビュー機能は唯一無二の強みです。実際の見た目を確認しながらコンテンツを編集できる点はもちろん、アプリケーションの変更が即時に反映されるので開発者と編集者のコミュニケーションがよりスムーズに行える点はNuxt Studioを採用する十分な理由になるのではないでしょうか？

Vueコミュニティは活発に開発が行われており、Nuxt ContentやNuxt Studioだけでなく魅力的なプロダクトがたくさんあります。Vue/Nuxtエコシステムとともに、自身のプロダクトを成長させていきましょう！