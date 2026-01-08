---
title: "jQueryからTypeScript・Reactまで - Viteで始めるモダンで高速な開発環境構築"
source: "https://ics.media/entry/210708/"
publishedDate: "2021-07-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

Vite（ヴィート＝フランス語で「速い」の意味）は2020年に発表された新しいフロントエンドのビルドツールです。

開発者がVue.jsの作者であるEvan You氏であるため、Vue.jsのツールであると誤解されることもありますが、プレーンなJavaScript（バニラJS）からVue.js・React・Svelteといった流行のフレームワークまで、さまざまな環境で利用できる汎用的なツールです。

位置付けとしてはwebpackのようなバンドラーと呼ばれるものに近い存在ですが、それだけではありません。この記事では、Viteを導入してプレーンなJavaScriptから、TypeScript+Vue.js・Reactといったフレームワークまで、快適な開発環境を手に入れる方法を紹介します。

この記事で紹介すること：

-   [Viteの特徴と基本の仕組み](#contents-anchor-features)
-   [基本の使い方](#contents-anchor-basic)
-   [Vite + SCSS](#contents-anchor-scss)
-   [Vite + TypeScript](#contents-anchor-typescript)
-   [Vite + アセット（画像など）](#contents-anchor-assets)
-   [Vite + TypeScript + Vue](#contents-anchor-vue)
-   [Vite + TypeScript + React](#contents-anchor-react)
-   [設定のカスタマイズ](#contents-anchor-config)
-   [IE11に対応する方法](#contents-anchor-ie11)
-   [落とし穴と回避方法](#contents-anchor-pitfalls)

### Viteの特徴と基本の仕組み

近年のウェブ開発では、JavaScriptファイルをすべて手書きしてHTMLファイルからひとつひとつ読み込む……といった作業をすることは少なくなりました。分割したモジュールの結合や圧縮を行う「ビルド」のため、なんらかのツールを使うことが多いでしょう。TypeScriptやSassのようなコンパイル（トランスパイル）が必要な言語を使うことも一般的になってきました。

Viteはこのビルドで使用するツールです。簡単に特徴を紹介しましょう。

#### ①モダンブラウザが備える仕組み（ES modulesやDynamic import）を利用して高速な起動/更新ができる

Viteの何よりの売りが速さです。webpackを代表とする従来のツールは実行すると、プロジェクトのすべてのファイルをコンパイル・結合してバンドルと呼ばれるひと塊のプログラムを生成します。効率化の仕組みはありますが、概してプロジェクトが大きくなるほど、処理にかかる時間も長くなります。

一方Viteは「ES modules」と呼ばれるモジュール分割の仕組みを使い、必要な時に必要なファイルだけをコンパイルしてブラウザーに送ります。この仕組みにより、**大きなプロジェクトでも起動や更新が一瞬で（ほとんどのケースで数百ms）できます。**

ES modulesはInternet Explorer 11（以下IE11）以外のほとんどのブラウザーで利用できます。標準の機能を利用することで、複雑な仕組みを導入せずとも高速化ができるのです。

#### ②TypeScriptやVue/React等のライブラリが設定なしですぐに使える

Viteの主要なコンセプトは「out of the box（箱から出してすぐに使える）」です。この後紹介しますが、Viteではほとんどの一般的な開発で面倒な設定が不要です。**シンプルなJavaScriptだけのウェブページからVue.jsとTypeScriptを使った本格的なウェブアプリケーションまで**、ほとんど同じ早さで開発を始めることができるのです。

また、ホットリロード（開発中にファイルを変更すると差分を検知してブラウザーをリロードしてくれる機能）に標準で対応しているのもありがたいポイントです。

#### ③IEを含めたプロダクションビルドもできる

さきほどの説明でViteがIE11では使えないと聞いて、ちょっとがっかりした方もいるかもしれません。確かにViteを使った開発（デバッグ起動）はIE11ではできません。しかし、ビルドした結果はIE11でも動かすことができます。

Viteは開発時にはモダンブラウザーのES modulesを使って高速に動作しますが、最終的にビルドする際は従来型のバンドラーと同様、すべてのファイルをひとつにまとめてくれるためです（具体的には、ビルド時は内部的に[rollup.js](https://rollupjs.org/)を使用しています）。

IE11向けのビルドには追加の設定が必要なので、この記事の後半で解説します。新しいツールではありますが、**プロダクションでも安心して利用できる**と言えるでしょう。

### 基本の使い方

Viteの使い方はとても簡単です。まずはフレームワークを使わないプレーンなHTML+JavaScriptのウェブページをViteで作ってみましょう。

※ この記事では2021年7月時点の最新版であるバージョン2.4をベースに解説します。

#### プロジェクトの初期化

プロジェクトを作成するため、ターミナル（コマンドプロンプト）で、以下のコマンドを実行します。Viteを事前にインストールする必要はありません。

```
npm init vite@latest
```

`npm`の代わりに`yarn`を使う場合は`yarn create`になります。

```
yarn create vite
```

実行すると、「プロジェクト名」「フレームワーク（テンプレート）」「テンプレートのバリエーション」の3つの質問が表示されます。ここでは下の要領で一番シンプルなバニラJSを指定します。

```
? Project name: › hello-vite # ①プロジェクト名を入力
? Select a framework: › - Use arrow-keys. Return to submit.
❯   vanilla # ②フレームワークを選択（vanilla = フレームワークを使わない）
    vue
    react
    preact
    lit-element
    svelte
? Select a variant: › - Use arrow-keys. Return to submit.
❯   vanilla # ③バリエーションを選択（TypeScriptは使わない）
    vanilla-ts
```

作成したプロジェクトは次のような構成になっているはずです。

![作成したプロジェクトの構成（バニラJS）](https://ics.media/entry/210708/images/210708_dir_vanilla.png)

#### デバッグ起動

以下のようにプロジェクトのディレクトリで`npm install`と`npm run dev`を実行すると、開発サーバが起動して動作が確認できるようになります。

```
cd hello-vite # ①作成したプロジェクトのフォルダに移動
npm install   # ②モジュールインストールを実行（初回のみ）
 # ... インストール（出力は省略）
npm run dev   # ③開発サーバを起動

Vite v2.3.6 dev server running at:

> Local: http://localhost:3000/ # ... このURLをブラウザーで開く
> Network: use `--host` to expose

ready in 95ms.
```

この状態で、`main.js`を編集・保存してブラウザーを見てみましょう。ホットリロードによって即座に変更が反映されるはずです。

▼ Viteを起動してファイルを編集する様子。一瞬でブラウザーに変更が反映されている

![ホットリロードのデモ](https://ics.media/entry/210708/images/210708_hotreload-demo.gif)

#### ビルド

ビルドするには`build`コマンドを実行します。

```
npm run build
```

ビルド結果は`dist`ディレクトリーに出力されます。

#### Viteのみ（バニラJS=フレームワークなし）のサンプル

Viteの基本的な構成を使用して、TODOアプリのサンプルを作成しました。

![Vite + バニラJSのサンプル](https://ics.media/entry/210708/images/210708_demo_vanilla.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210708_vite/vite-vanilla-js-jquery/)
-   [コードを確認する](https://github.com/ics-creative/210708_vite/tree/main/vite-vanilla-js-jquery)

この例では、DOMの操作を簡単にするため、以下のコマンドでjQueryを追加しています。

```
npm install jquery
```

バニラJS + jQueryと聞くと「モダンではない」「開発体験が悪そう」といった印象を持たれるかもしれません。しかし、Viteを使うことで、ソースコードの分割や高速なホットリロードが行え、フレームワークを使用せずとも快適な開発ができるようになります。ぜひ、サンプルをクローンしてViteでの開発を体感してみてください。

### Vite + Sass(SCSS)

バニラJSで作成したプロジェクトの`main.js`を見ると次のようにしてCSSを読み込んでいることがわかります（もちろん、`index.html`から`<link>`タグを使って読み込んでも構いません）。

```
import './style.css'
```

簡単な作業でこのCSSをSass(SCSS)に変更できます。まず、`sass`モジュールをインストールしましょう。

```
npm install -D sass
```

インストールが完了したら、`style.css`を`style.scss`にリネームし、`main.js`の`import`文も変更します。Viteは標準で`.scss`の拡張子を認識するので、これだけで`sass`モジュールを使用してCSSのコンパイルをしてくれるようになります。

### Vite + TypeScript

ViteではTypeScriptも簡単に利用できます。`npm init vite@latest`でプロジェクトを作成し、最後の質問で`vanilla-ts`を選択するだけです。

```
npm init vite@latest
? Project name: › hello-vite-ts # ①プロジェクト名を入力
? Select a framework: › - Use arrow-keys. Return to submit.
❯   vanilla # ②フレームワークを選択（vanilla = フレームワークを使わない）
    vue
    react
    preact
    lit-element
    svelte
? Select a variant: › - Use arrow-keys. Return to submit.
    vanilla
❯   vanilla-ts # ③TypeScriptを使用する
```

作成されたプロジェクトの構造は次のようになっています。TypeScriptの設定をおこなう`tsconfig.json`も作成済みです。必要に応じて修正すると良いでしょう。

![作成したプロジェクトの構成（TypeScript）](https://ics.media/entry/210708/images/210708_dir_ts.png)

#### Vite + TypeScriptのサンプル

Vite + TypeScriptのサンプルとして、3D表現制作の定番ライブラリである[Three.js](https://threejs.org/)を組み込んだデモを作成しました。

![Vite + TypeScript + Three.jsのサンプル](https://ics.media/entry/210708/images/210708_demo_ts.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210708_vite/vite-typescript-three/)
-   [コードを確認する](https://github.com/ics-creative/210708_vite/tree/main/vite-typescript-three)

`npm init vite@latest`コマンドでTypeScriptのプロジェクトを作成した後、以下のコマンドでThree.jsと型定義をインストールするだけです。

```
npm install three @types/three
```

サンプルの中でThree.jsを利用する部分は、入門記事[『Three.js入門 - 手軽にWebGLを扱える3Dライブラリ』](https://ics.media/entry/14771/)で解説しています。Three.jsは慣れるまでが大変ですが、TypeScriptのサポートとViteの素早い起動や更新は、学習するときにも強い味方となるはずです。

### Vite + アセット（画像など）

上で作成した「Vite + TypeScript」のプロジェクトで画像等のアセットを使う方法を確認しましょう。webpackではTypeScriptからアセットを利用するためにやや面倒な設定が必要でしたが、Viteの場合は簡単です。

#### JavaScript/TypeScriptから画像を読み込む

JavaScript/TypeScriptから画像を読み込むには、その画像のパスを`import`するだけです。画像を`import`するとViteではその画像の実際のパス（URL）を返します。ビルドを行うと、画像ファイルは1カ所にまとめられてファイル名も変更されますが、`import`したURLでアクセスする限り、何も気にする必要はありません。

下の例では`dog.png`と`cat.png`の2枚の画像を`import`し、ボタンを押すたびにどちらかをランダムに追加します。

```
// 開発時・ビルド時の状態にかかわらず、適切な画像パスが取得できる
import srcDog from './assets/dog.png'
import srcCat from './assets/cat.png'

// 犬か猫をランダムに追加
const addImage = () => {
  const img = new Image()
  img.src = Math.random() > 0.5 ? srcDog : srcCat
  document.body.appendChild(img)
}

document.getElementById('addButton').addEventListener('click', addImage)
```

#### 静的な画像の利用

画像のファイル名を実行時に組み立てる場合など、`import`でパスを指定できない場合には`public`ディレクトリを使うことができます。

プロジェクトルートに`public`というディレクトリを作成し、画像等のアセットを格納しておくと、それらはビルド時に単純に出力先（`dist`ディレクトリの直下）にコピーされます。

```
// publicディレクトリに入れたimg.pngを表示する
// パスに"public"はいらないことに注意
img.src = 'img.png'
```

#### Vite + TypeScript + アセットのサンプル

Vite + TypeScriptのプロジェクトで上記の2通りの画像読み込みを行うサンプルを作成しました。ビルド結果のデモの動作をソースコードと比較し、それぞれの画像読み込みがビルド時にどのように変換されるのか、理解しておくと良いでしょう。

▼ assetsフォルダーからimportする例 ![Vite + TypeScript + アセットのサンプル（assetsフォルダーからimportする例）](https://ics.media/entry/210708/images/210708_demo_assets1.png)

▼ publicフォルダーを使う例 ![Vite + TypeScript + アセットのサンプル（publicフォルダーを使う例）](https://ics.media/entry/210708/images/210708_demo_assets2.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210708_vite/vite-typescript-assets/)
-   [コードを確認する](https://github.com/ics-creative/210708_vite/tree/main/vite-typescript-assets)

### Vite + TypeScript + Vue

現代でウェブアプリケーションを開発する場合、何かしらのJavaScriptフレームワークを利用することが多いでしょう。Viteでは標準のテンプレートとして[Vue.js](https://ja.vuejs.org/)・[React](https://ja.reactjs.org/)・[Preact](https://preactjs.com/)・[LitElement](https://lit-element.polymer-project.org/)・[Svelte](https://svelte.dev/)といったメジャーなフレームワークを利用できます。また、標準提供のテンプレート以外にも、さまざまなテンプレートが公開されています。気になる方は[『Awesome Vite.js』](https://github.com/vitejs/awesome-vite#templates)をチェックしてみると良いでしょう。

とくに`Vue`については、作者が同じであることから完成度の高いテンプレートが標準提供されています。`Vue`でプロジェクトを作る場合は、以下のようにフレームワークを選択します。

```
npm init vite@latest
? Project name: › hello-vite-vue # ①プロジェクト名を入力
? Select a framework: › - Use arrow-keys. Return to submit.
    vanilla
❯   vue    # ②フレームワークとしてVueを選択
    ...
? Select a variant: › - Use arrow-keys. Return to submit.
    vue
❯   vue-ts # ③TypeScriptを使用する
```

フレームワークを使用しない場合と同様、`npm run dev`（または`yarn dev`）でデバッグ起動ができます。`Vue CLI`を使って開発したことのある方であれば、起動や更新の早さに驚くでしょう。

```
cd hello-vite-vue
npm install   # モジュールインストール（初回のみ）
npm run dev   # デバッグ起動
npm run build # ビルド
```

#### VuexやVue Routerを追加する

ViteのVueテンプレートはとてもシンプルな構成のため、VuexやVue Routerを使いたい場合には自分で追加の導入作業が必要です。どちらも`npm install`で簡単に追加できます。

```
# Vuexを追加。2021/7時点ではVue3対応版のVuex4系は@nextが必要です
npm install vuex@next

# Vue Routerを追加。こちらも2021/7時点では@4の指定が必要です
npm install vue-router@4
```

#### Vite + TypeScript + Vueのサンプル

Vite + TypeScript + Vueのプロジェクトを作成しました。VuexとVue Routerも最小限機能するものを組み込んでいますので、セットアップの参考にしてください。

![Vite + TypeScript + Vueのサンプル](https://ics.media/entry/210708/images/210708_demo_vue.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210708_vite/vite-typescript-vue/)
-   [コードを確認する](https://github.com/ics-creative/210708_vite/tree/main/vite-typescript-vue)

### Vite + TypeScript + React

ViteではVue.jsと同様、Reactも簡単に使うことができます。Reactでプロジェクトを作る場合は、以下のようにフレームワークを選択します。

```
npm init vite@latest
? Project name: › hello-vite-react # ①プロジェクト名を入力
? Select a framework: › - Use arrow-keys. Return to submit.
   vanilla
    vue
❯   react    # ②フレームワークとしてReactを選択
    ...
? Select a variant: › - Use arrow-keys. Return to submit.
    react
❯   react-ts # ③TypeScriptを使用する
```

プロジェクト作成後の起動やビルドのコマンドはフレームワークを使わない場合と変わりません。

```
cd hello-vite-react
npm install   # モジュールインストール（初回のみ）
npm run dev   # デバッグ起動
npm run build # ビルド
```

なお、2021年後半にリリースされた[create-vue](https://github.com/vuejs/create-vue)を使用すると、Vite + Vueのプロジェクトを公式の推薦構成で自動セットアップしてくれます。構築したプロジェクトの使い方や設定の方法はcreate-vueを使った場合も変わりません。create-vueを含めた公式の推薦構成については[『2022年の最新標準！　Vue 3の新しい開発体験に触れよう』](https://ics.media/entry/220120/)で紹介していますので、参考にしてください。

#### jsx/tsxを使う場合の注意

Viteで作成したReactプロジェクトでも、jsxやtsxを問題なく扱うことができます（jsxやtsxはReactだけでなくVue.jsのプロジェクトでも利用できます）。ただし、React17でサポートされた[新しい JSX トランスフォーム](https://ja.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)には対応していないため、若干注意が必要です。

Reactでjsx/tsxを使う場合、React16までは`import React from 'react'`の形で`react`モジュールを読み込む必要がありました。

```
import React from 'react' // ←"React"はコードには出てこないが必要

function App() {
  return <h1>Hello Vite + React!</h1>
}
```

React17の「新しいJSXトランスフォーム」では`webpack`を使うことで、この`import`が不要になりました。しかしViteはこの機能に対応していないため、引き続き`import`が必須です。

どうしても`import`なしでjsx/tsxを使用したい場合、プロジェクトのルートに`vite.config.ts`という名前の設定ファイルを作成し、以下のように記述することで同等の結果を得ることができます。

▼ vite.config.ts

```
export default {
  esbuild: {
    jsxInject: `import React from 'react'`
  }
}
```

設定ファイルについては次の節で詳しく紹介します。

### 設定のカスタマイズ

冒頭で紹介した通り、Viteのコンセプトは「out of the box（箱から出してすぐに使えること）」です。ここまでの例で紹介したように、テンプレートを選択するだけで十分実用的な開発環境が手に入ります。

しかし、実際のプロダクト開発や業務利用では、設定のカスタマイズが必要なことも少なくありません。このような時はプロジェクトのルートディレクトリに`vite.config.js`（TypeScriptのプロジェクトであれば`vite.config.ts`）というファイルを作成することで設定のカスタマイズが可能です。

`vite.config.ts`ファイルの中身は、基本的には`export default {}`の形式で設定を記述するだけです。以下のように`defineConfig`関数を挟むとエディターの補完や型チェックが効くようになるのでオススメです。

▼ vite.config.ts

```
import { defineConfig } from 'vite'

export default defineConfig({
  // ここに設定を追加
})
```

設定可能な項目は[公式の『Configuring Vite』](https://vitejs.dev/config/)に掲載されています。かなりの数になるので、よく使う基本の設定をいくつか紹介しましょう。

#### server.port：開発時のポート番号衝突を避ける

Viteの開発サーバはデフォルトで`3000`番ポートを使用します。ポートが使用中の場合は自動的に空いている他のポートを使用しますが、無用な混乱を割けるためにも、複数のプロジェクトを同時に扱う場合にはポート番号を決めておくのも良いでしょう。

▼ 例：vite.config.tsでポート番号を8080にする

```
import { defineConfig } from 'vite'
export default defineConfig({
  server: {
    port: 8080
  }
})
```

なお、一時的に変更したいだけであれば、コマンドラインオプションを使用して`npm run dev -- --port 12345`のように指定することもできます。

#### base：「デプロイしたら画面が出ない」問題を回避

Viteではスクリプトや画像等のリソースを読み込む時、`/`で始まる絶対URLを使用します。GitHub Pagesのようにデプロイ先がウェブサーバーのルートディレクトリではない場合、この設定を変更しないと画面が表示されません。

この挙動を変更するのが`base`です。`base`には任意のURLを指定できますが、下の例のように`./`を指定するのが柔軟で良いでしょう。

▼ 例：vite.config.tsでbaseに相対パスを指定する

```
import { defineConfig } from 'vite'
export default defineConfig({
  base: './'
})
```

#### resolve.alias：importするパスで`@components/`のようなエイリアス名を使えるようにする

Vue CLIで作成したプロジェクトでは、デフォルトで`import HelloWorld from '@/components/HelloWorld.vue'`のような、`@/`で始まるパスを利用できました。Viteで同じ機能を利用するには、`resolve.alias`の設定が必要です。

▼ vue-tsテンプレートで作成したプロジェクトのvite.config.tsにエイリアスの設定を追加する

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@/': path.join(__dirname, './src/')
    }
  }
})
```

上記はVue.jsのプロジェクトの例ですが、Vue以外のフレームワークを使う場合も設定は同様です。

※ 以前のバージョンでは`alias`は設定のルート階層にありましたが、現在ではdeprecatedになっています。`resolve.alias`を使用しましょう。

### IE11に対応する方法

IE11向けのビルドを作成するには、ビルドに追加の設定が必要です。幸い、ほとんどの設定は[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)というプラグインがまとめて提供しています。以下のコマンドでインストールします。

```
# IE11向けビルドを行うプラグインを追加
npm install -D @vitejs/plugin-legacy
```

インストールができたら、設定ファイルにこのプラグインを使用する記述を追加します。

▼ vite.config.ts（JavaScriptの場合はvite.config.js）

```
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  // IE11向けの変換を行うプラグインの設定
  plugins: [
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ]
})
```

あとは今まで同様、`npm run build`でビルドするだけです。

#### すべてが変換できるわけではないので注意！

プラグインを使用することで簡単にIE11向けのビルドを作成できるようになりますが、対応できるのはあくまで古い構文（ES5）への変換やポリフィルの使用でサポートできる範囲です。これはwebpack等他のツールを使用した場合と基本的には変わりません。

たとえば、ViteでVue.jsのプロジェクトを作成すると、デフォルトではVue3を使用します。しかしVue3はIE11に対応していないため、このプラグインを使用してもIE11では動かすことはできません。このような場合は、IE11でも動作可能なVue2を使用するなど、個別の対応が必要になります。

使用するライブラリやフレームワークごとにIE11向けの変換が可能か、確認した上で導入するようにしましょう。

#### IE11対応のサンプル

Vite + TypeScript + jQueryで作成し、IEでも動作するように設定・ビルドしたサンプルを作成しました。内容は最初のバニラJSのサンプルと同様のTODOリストです。IEで動作させた場合だけ「legacy」と名前のついた別のJavaScriptファイルを読み込んで動作していることがわかります。

▼ IE向けビルドの動作例（左：IE11 / 右：Chromium版Edge） ![Vite + TypeScript + アセットのサンプル（assetsフォルダーからimportする例）](https://ics.media/entry/210708/images/210708_demo_ie.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210708_vite/vite-typescript-ie/)
-   [コードを確認する](https://github.com/ics-creative/210708_vite/tree/main/vite-typescript-ie)

### 落とし穴と回避方法

Viteは簡単で高速な開発体験を提供してくれますが、落とし穴がないわけではありません。注意すべきケースと回避方法を紹介します。

#### ケース1：開発環境では動いているのに、ビルドするとエラーになる

冒頭で紹介した通り、Viteの開発サーバは必要な時に必要なソースコードだけを読み込んでコンパイルすることで高速な起動や更新を実現しています。逆にいうと、文法誤りのような明らかな問題があっても、画面から要求されない限りエラーとして検出されません。

通常の開発では、エディターでソースコードを書き換えた時点で、エディター上にエラーが表示されて間違いに気づくことができるので、大きな問題になることはないでしょう。しかし、エディター以外のツールでソースコードを触ってしまったり、機械的な一括置換でコードを修正してしまったりすると、この限りではありません。このままでは**ビルドの通らないコードがコミット・プッシュされることになり大変危険です。**

**対処** [Gitフック](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF)やCIを使用して、コミットやプッシュ・マージの前に最低限ビルドが通ることを確認すると良いでしょう。TypeScriptの型チェックが目的であれば、これらのタイミングで`tsc --noEmit`を実行するだけでも十分かもしれません。

#### ケース2：ライブラリやモジュールを追加・更新したのに反映されない

前述の通り、Viteは必要な時に必要なものだけを読み込んでコンパイルします。しかしこの方法で`node_modules`にインストールされた大量の依存モジュールを読み込んでいてはキリがありません。このためViteは`node_modules`のモジュールについては事前に取りまとめ（バンドル）を行い、キャッシュする仕組みを持っています。

依存モジュールが変わるとこのキャッシュも自動的に再生成されますが、`package.json`を手で編集した場合などは、再生成がうまく行われないこともあるので、注意が必要です。

**対処** `dev`コマンドに`--force`オプションをつけることで強制的にキャッシュをクリアできます。

```
# npmを使う場合
npm run dev -- --force
# yarnを使う場合
yarn dev --force
```

変更したはずの依存モジュールがうまく読み込めていないと思ったら、まずは試してみると良いでしょう。

### まとめ：モダンな開発の入門からプロの現場まで、Viteは幅広く使える開発ツール

Viteは登場してからまだ1年余りの新しいツールです。その新しさゆえ、導入はまだ先と考えている方も多いでしょう。しかし、Viteの技術はウェブ標準や実績のあるOSSライブラリを下敷きにしており、すでに十分実用に耐えるレベルです。ICSでは2021年にバージョン2がリリースされてから、徐々にViteを業務に利用しています。

その一方で、Viteはwebpackと比較すると細かな設定がやりにくく、周辺ツールやウェブ上の情報もまだまだ十分とは言えません。当面は小規模で開発のスピード感を重視するプロジェクトを中心に利用され、webpackとは棲み分けていくことになるでしょう。

なお、Nuxt.jsをViteで動かす[『Nuxt Vite』](https://vite.nuxtjs.org/)の開発や、[Next.jsでViteをサポートするディスカッション](https://github.com/vercel/next.js/discussions/22406)も進んでいるようです。これらのフレームワークを利用している方は動向をチェックしておくと良いでしょう。

もうひとつのViteの魅力は、これらの最新のフレームワークに馴染みがない方でも、好きな構成で快適に開発を始められることです。まずはシンプルなJavaScriptからはじめて、徐々にモダンなフレームワークを学習していくのもViteなら難しくありません。ぜひこの機会にチャレンジしてみてください。