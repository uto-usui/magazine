---
title: "最新版で学ぶwebpack 5入門 - Babel 7でES2023環境の構築(React, Vue, Three.js, jQueryのサンプル付き)"
source: "https://ics.media/entry/16028/"
publishedDate: "2017-07-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

**ECMAScript 2015(略：ES2015)以上の言語仕様でJavaScriptを書くことが、昨今のウェブのフロントエンドエンジニアの基本テクニック**です。しかし、ECMAScript 2015以上の仕様のJavaScriptで記述すると、Internet Explorer 11など古いブラウザでは動作しないこともあります。そこでBabelなどのトランスパイラと呼ばれるツールを使って、**ES2015〜ES2023の仕様で記述したJavaScriptファイルを互換性のあるECMAScript 5に変換します**。

トランスパイラとして一番有名なのが「[Babel](https://babeljs.io/)」というツールです。ただ、BabelにはECMAScript Modules（`import`や`export`文のこと。以下、ES Modulesと記載）のJSファイルをまとめる機能が提供されていません。そのため、ES ModulesのJSファイルをまとめるモジュールバンドラー（例：[webpack](https://webpack.js.org/)、[Rollup](https://rollupjs.org/)等）をBabelと合わせて使うのが一般的です。

![](https://ics.media/entry/16028/images/170704_webpack_babel.png)

この記事ではトランスパイラのBabelとモジュールバンドラーのwebpackを連携する方法を網羅的に解説します。使い方として次の5種類を解説します。

-   [シンプルな使い方](#webpack-babel)
-   [webpack + Babel + jQueryの構成](#webpack-babel-jquery)
-   [webpack + Babel + Reactの構成](#webpack-babel-react)
-   [webpack + Babel + Three.jsの構成](#webpack-babel-three)
-   [webpack + Babel + Vue.jsの構成](#webpack-babel-vue)
-   [ECMAScript 2020仕様を使う方法](#webpack-babel-esnext)

※webpackの基本的な使い方は前回の記事「[最新版で学ぶwebpack入門](https://ics.media/entry/12140/)」を参照ください。

### webpack+Babelの構成を作成しよう

webpackとBabelを最小構成で作っていきましょう。

#### npmモジュールのインストール

webpackとBabelなど必要なモジュールをインストールしましょう。Babelは複数のモジュールを組み合わせて使う形式上、「@babel/core」「@babel/preset-env」「babel-loader」と3種類を最低限インストールする必要があります。もちろん「webpack」と「webpack-cli」も指定します。

```
npm install -D webpack webpack-cli babel-loader @babel/core @babel/preset-env
```

※Babel本体のモジュール「@babel/core」「@babel/preset-env」には先頭に「@」があり、webpack用「babel-loader」には「@」がない点にも注意ください。

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドを記述しておきます。`scripts`と`devDependencies`以外の情報は省略しています。

▼package.jsonファイル

```
{
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "@babel/core": "^7.21.3",
    "@babel/preset-env": "^7.20.2",
    "babel-loader": "^9.1.2",
    "webpack": "^5.76.2",
    "webpack-cli": "^5.0.1"
  },
  "private": true
}
```

#### webpackの設定ファイル

webpackの設定ファイルには次のように記述します。`rules`の部分で`babel-loader`を指定しているのがポイントです。Babelはプリセットの設定に応じてECMAScriptのバージョンを下位にトランスパイルします。

`presets`プロパティに`@babel/preset-env`の指定することで、最新仕様（執筆時点ではECMAScript 2020)の構文をECMAScript 5に変換できます。webpack 5から`target: ["web", "es5"]`プロパティーの設定が必要になりました。これを設定しないとIE 11でバンドル後のJavaScriptファイルが動作しなくなります（アロー関数などES2015の記法がIE11で認識しないため、実行時エラーとなります）。

▼webpack.config.jsファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.js",

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、新しいESをES5に変換
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
    ],
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};
```

※プリセット「[@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)」は「[ECMAScript 5/6/7 compatibility tables](https://github.com/kangax/compat-table)」に基づきターゲットブラウザを指定できたりとさまざまな機能が提供されています。たとえば、ターゲットブラウザがSafari 10だけでよければ、ES5まで落として変換する必要はなく、ES2015(ES6)をターゲットにすれば良いということになります。興味がある方はドキュメントを参考ください。

以上で設定は完了です。`npm run build`コマンドを入力すると、`src`フォルダーに配置したJSファイルがトランスパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

![](https://ics.media/entry/16028/images/170704_webpack_tutorial_babel.png)

ここまでの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-babel）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-babel)
-   [サンプルのHTMLを開く(tutorial-babel）](https://ics-creative.github.io/170330_webpack/tutorial-babel/dist/)

### webpack+Babel+jQueryの構成を作成しよう

![](https://ics.media/entry/16028/images/170704_webpack_site_jquery.png)

[jQuery](https://jquery.com/)は言わずと知れた汎用的なJSライブラリです。webpackやBabelに興味のあるフロントエンドエンジニアであれば、「いまどき、jQueryを使いたくない」という方もいるかもしれません。しかし、**現場では使わざるを得ない状況の方も多いはずです**。まとめ記事「[jQueryはオワコンなのか - ウェブアプリ開発者とウェブサイト制作者の大きな溝 - Togetter](https://togetter.com/li/1240562)」でも、不要論の是非について話題になりましたね。ここでは、npmモジュールのjQueryをwebpackで取り込む方法について紹介します。

#### npmモジュールのインストール

必要なモジュールをインストールしましょう。上述のwebpack+Babelの構成と同じです。

```
npm install -D webpack webpack-cli babel-loader @babel/core @babel/preset-env
```

実行用の「jQuery」モジュールもインストールしましょう。こちらは実行ファイルに含まれるモジュールとして利用したいので、コマンドオプション「-D」は省いてます。「-D」を省くと`dependencies`にモジュールが記載されます。

```
npm install jquery
```

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドを記述しておきます。`scripts`と`devDependencies`、`dependencies`以外の情報は省略しています。

▼package.jsonファイル

```
{
  "scripts": {
    "build": "webpack"
  },
  "dependencies": {
    "jquery": "^3.6.4"
  },
  "devDependencies": {
    "@babel/core": "7.21.3",
    "@babel/preset-env": "7.20.2",
    "babel-loader": "^9.1.2",
    "webpack": "^5.76.2",
    "webpack-cli": "^5.0.1"
  },
  "private": true
}

```

#### webpackの設定ファイル

webpackの設定ファイルには次のように記述します。`rules`の部分で`babel-loader`を指定します。

▼webpack.config.jsファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'production',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/index.js',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES5 に変換
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};
```

以上で設定は完了です。`npm run build`コマンドを入力すると、`src`フォルダーに配置したJSファイルがトランスパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

![](https://ics.media/entry/16028/images/170704_webpack_tutorial_jquery.png)

ここまでの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-babel-jquery）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-babel-jquery)
-   [サンプルのHTMLを開く(tutorial-babel-jquery）](https://ics-creative.github.io/170330_webpack/tutorial-babel-jquery/dist/)

jQueryのサンプルの実行結果は次となります。

![](https://ics.media/entry/16028/images/170718_webpack_jquery.png)

### webpack+Babel+Reactの構成を作成しよう

![](https://ics.media/entry/16028/images/images/170704_webpack_site_react_230317.png)

[React](https://react.dev/)は**ウェブアプリケーションの開発に役立つ人気のJSライブラリ**です。2023年現在の最新版であるReact 18を例に、npmモジュールをwebpackで取り込む方法について学んでいきましょう。

#### npmモジュールのインストール

必要なモジュールをインストールしましょう。上述のwebpack+Babelの構成に加えて、トランスパイル用に「@babel/preset-react」が必要となります。

```
npm install -D webpack webpack-cli babel-loader @babel/core  @babel/preset-env @babel/preset-react
```

実行用の「react」と「react-dom」もインストールしましょう。

```
npm install react react-dom
```

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドを記述しておきます。`scripts`と`devDependencies`、`dependencies`以外の情報は省略しています。

▼package.jsonファイル

```
{
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "@babel/core": "7.21.3",
    "@babel/preset-env": "7.20.2",
    "@babel/preset-react": "7.18.6",
    "babel-loader": "^9.1.2",
    "webpack": "^5.76.2",
    "webpack-cli": "^5.0.1"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "private": true
}

```

#### webpackの設定ファイル

webpackの設定ファイルには次のように記述します。`rules`の部分で`babel-loader`を指定します。

オプションのプリセットには`@babel/preset-env`の指定だけでなく、`@babel/react`を記述するのがポイントです。これによって、**JSXと呼ばれるReact特有のシンタックス（JavaScriptの中にDOM要素を記述する方法）を解釈できるようになります**。

▼webpack.config.jsファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES5 に変換
                "@babel/preset-env",
                // React の JSX を解釈
                "@babel/react"
              ]
            }
          }
        ]
      }
    ]
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
};
```

以上で設定は完了です。`npm run build`コマンドを入力すると、`src`フォルダーに配置したJSファイルがトランスパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

![](https://ics.media/entry/16028/images/170704_webpack_tutorial_babel_react.png)

ここまでの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-babel-react）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-babel-react)
-   [サンプルのHTMLを開く(tutorial-babel-react）](https://ics-creative.github.io/170330_webpack/tutorial-babel-react/dist/)

サンプルの実行結果は次となります。

![](https://ics.media/entry/16028/images/170704_webpack_react.png)

Reactの初期設定を簡単にするツール「[create-react-app](https://github.com/facebook/create-react-app)」や[Vite](https://ja.vitejs.dev/)からReactを始める人も多いと思います。create-react-appのビルドでは、内部的にwebpackとBabelが使われています。

### webpack+Babel+Three.jsの構成を作成しよう

![](https://ics.media/entry/16028/images/170704_webpack_site_three.png)

[Three.js](https://threejs.org/)は3D表現の制作に役立つ人気のJSライブラリです。使い方は記事「[Three.js入門](https://ics.media/tutorial-three/)」で説明したことがあります。Three.jsを例に、npmモジュールをwebpackで取り込む汎用的な方法について学んでいきましょう。

#### npmモジュールのインストール

必要なモジュールをインストールしましょう。上述のwebpack+Babelの構成と同じです。

```
npm install -D webpack webpack-cli babel-loader @babel/core  @babel/preset-env
```

実行用の「three」と「core-js」モジュールもインストールしましょう。こちらは実行ファイルに含まれるモジュールとして利用したいので、コマンドオプション「-D」を省いています。`dependencies`にモジュールが記載されます。

WebGLはIE11でも動作しますが、Three.jsライブラリのコードがIE11向けに提供されていないので、ポリフィルを導入します。

```
npm install three core-js
```

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドを記述しておきます。`scripts`と`devDependencies`、`dependencies`以外の情報は省略しています。

▼package.jsonファイル

```
{
  "scripts": {
    "build": "webpack"
  },
  "dependencies": {
    "core-js": "^3.29.1",
    "three": "^0.150.1"
  },
  "devDependencies": {
    "@babel/core": "^7.21.3",
    "@babel/preset-env": "^7.20.2",
    "babel-loader": "^9.1.2",
    "webpack": "^5.76.2",
    "webpack-cli": "^5.0.1"
  },
  "private": true
}

```

#### webpackの設定ファイル

webpackの設定ファイルには次のように記述します。`rules`の部分で`babel-loader`を指定し、`exclude`で`node_modules`フォルダーを除外します。

▼webpack.config.jsファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.js",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js"
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES5 に変換
                "@babel/preset-env"
              ]
            }
          }
        ]
      }
    ]
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
};
```

Three.jsのルートファイルではポリフィルを読み込むように設定しておきます。`three`モジュールの読み込みよりも手前で`import "core-js/stable"`を取り込む必要があります。以下は抜粋のコードです。

```
import "core-js/stable"; // 古いブラウザで動作するようにポリフィルを導入
import * as THREE from "three";
```

以上で設定は完了です。`npm run build`コマンドを入力すると、`src`フォルダーに配置したJSファイルがトランスパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

![](https://ics.media/entry/16028/images/170704_webpack_tutorial_babel_three.png)

ここまでの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-babel-three）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-babel-three)
-   [サンプルのHTMLを開く(tutorial-babel-three）](https://ics-creative.github.io/170330_webpack/tutorial-babel-three/dist/)

サンプルの実行結果は次となります。

![](https://ics.media/entry/16028/images/170704_webpack_three.png)

### webpack+Babel+Vue.jsの最小構成

![](https://ics.media/entry/16028/images/images/170704_webpack_site_vue_230317.png)

▲[Vue.js公式サイト](https://ja.vuejs.org/)

Vue.jsはReactと並んで注目を集めるJSライブラリです。[@vue/cli](https://cli.vuejs.org/)や[Vite](https://github.com/vitejs/vite)で導入するのがもっとも簡単ですが、カスタマイズを目的として自前でビルド環境を用意したい方もいるでしょう。この解説ではwebpack 5とBabelとVue.jsを最小構成で作っていきます。

Vue.jsはさまざまな記述方法が可能なので、ここで紹介する構成は一例に過ぎません。アンケートで調べたところ、Vue.jsの開発では[単一ファイルコンポーネント](https://ja.vuejs.org/api/sfc-spec.html)がもっとも使われているようなので、その構成で解説します。

#### npmモジュールのインストール

webpackとBabelなど必要なモジュールをインストールしましょう。.vueファイルを読み込むために、vue-loaderやvue-template-compilerを入れておきます（必須）。`.vue`ファイルではCSSも扱うので、css-loaderも必要となります。

```
npm i -D @babel/core @babel/preset-env babel-loader css-loader vue-loader vue-style-loader vue-template-compiler webpack webpack-cli
```

実行用の「vue」モジュールもインストールしましょう。本記事はVue 3で説明しています。

```
npm i vue
```

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドを記述しておきます。`scripts`と`devDependencies`以外の情報は省略しています。

▼`package.json`ファイル

```
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch"
  },
  "dependencies": {
    "vue": "^3.2.47"
  },
  "devDependencies": {
    "@babel/core": "^7.21.3",
    "@babel/preset-env": "^7.20.2",
    "babel-loader": "^9.1.2",
    "css-loader": "^6.7.3",
    "vue-loader": "^17.0.1",
    "vue-style-loader": "^4.1.3",
    "vue-template-compiler": "^2.7.14",
    "webpack": "^5.76.2",
    "webpack-cli": "^5.0.1"
  },
  "private": true
}
```

#### webpackの設定ファイル

webpackの設定ファイルには次のように記述します。`resolve`の部分で`alias`を指定することや、プラグイン`VueLoaderPlugin`を指定することも重要です。拡張子vueやcssに対してもルールを設定し、extensionsの箇所にはvueファイルを登録しておきます。要は設定するところが多いので大変です。

▼`webpack.config.js`ファイル

```
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },

      {
        test: /\.vue$/
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        // Babel のオプションを指定する
        options: {
          presets: [
            // プリセットを指定することで、ES5 に変換
            "@babel/preset-env",
          ],
        },
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    // Webpackで利用するときの設定
    alias: {
      vue$: 'vue/dist/vue.runtime.esm-bundler.js',
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  plugins: [
    // Vueを読み込めるようにするため
    new VueLoaderPlugin(),
  ],
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};

```

以上で設定は完了です。`npm run build`コマンドを入力すると、`src`フォルダーに配置したjsやvueファイルがコンパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

ここまでの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-babel-vue）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-babel-vue)
-   [サンプルのHTMLを開く(tutorial-babel-vue）](https://ics-creative.github.io/170330_webpack/tutorial-babel-vue/dist/)

Vue.jsのサンプルの実行結果は次となります。

![](https://ics.media/entry/16028/images/170704_webpack_react.png)

### webpack+ECMAScript 2023の構成を作成しよう

ECMAScript 2023仕様のJavaScriptをフルに利用するには、さらに設定が必要です。Babelはアロー関数やクラス、`let`や`const`といった新しい構文を下位バージョンに変換しますが、`Promise`や`Array.includes()`といった機能までは変換しません。後者を利用するにはポリフィルを導入する必要があります。

![](https://ics.media/entry/16028/images/170704_webpack_babel_polyfill.png)

#### npmモジュールのインストール

必要なモジュールをインストールしましょう。

```
npm install -D webpack webpack-cli babel-loader　@babel/core @babel/preset-env
```

今回はポリフィルとして「core-js」もインストールします。

```
npm install core-js
```

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドを記述しておきます。`scripts`と`devDependencies`、`dependencies`以外の情報は省略しています。

▼package.jsonファイル

```
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack -w"
  },
  "dependencies": {
    "core-js": "^3.29.1"
  },
  "devDependencies": {
    "@babel/core": "^7.21.3",
    "@babel/preset-env": "^7.20.2",
    "babel-loader": "^9.1.2",
    "webpack": "^5.76.2",
    "webpack-cli": "^5.0.1"
  },
  "private": true
}

```

#### webpackの設定ファイル

webpackの設定ファイルには次のように記述します。

▼webpack.config.jsファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",
  devtool: "source-map",

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES5 に変換
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
    ],
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};
```

エントリーポイント`entry`のJavaScriptファイルには、ポリフィルを取り込むように記載しましょう。デフォルトでは`src/index.js`ファイルの先頭に記載します。

▼ src/index.js ファイル

```
import "core-js/stable";
```

以上で設定は完了です。`npm run build`コマンドを入力すると、`src`フォルダーに配置したJSファイルがトランスパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

![](https://ics.media/entry/16028/images/170704_webpack_tutorial_polyfill.png)

ここまでの手順をサンプルファイルとしてGitHubで公開しています。

-   [サンプルのソースファイル（tutorial-babel-esnext）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-babel-esnext)
-   [サンプルのHTMLを開く(tutorial-babel-esnext）](https://ics-creative.github.io/170330_webpack/tutorial-babel-esnext/dist/)

[サンプルのコード](https://github.com/ics-creative/170330_webpack/blob/master/tutorial-babel-esnext/src/sub.js)ではECMAScript 2015（ES6）からECMAScript 2023（ES14）までのさまざまなAPIを試しています。変換前後の結果を見比べてみるとおもしろいです。たとえば、ES2016のべき乗演算子（Exponentiation Operator)を使ったコード`3 ** 2`はBabelによって`Math.pow(3, 2)`に変換されています（次の図版はクリックで拡大できます）。ES2017の`padEnd()`メソッドや、ES2018の非同期イテレーション、ES2020のオプショナルチェインニング、ES2023の`Array.toReversed()`も動作します。

![](https://ics.media/entry/16028/images/170704_webpack_babel_es2017.png)\]

### このほかにもサンプルを用意してます

このほかにも、さまざまなJavaScriptライブラリのサンプルを用意してます。ここまで記事を読み進めて頂いた方であれば、次のリポジトリのソースコードを見れば簡単に導入できるはずです。

-   [RxJSの導入方法（Babel向け）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-babel-rxjs6)
-   [GSAPの導入方法（Babel向け）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-babel-gsap)
-   [Pixi.jsの導入方法（Babel向け）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-babel-pixijs)

### 最後に

最近のブラウザではECMAScript 2015以上の言語仕様が標準で使えるようになってきました。IE 11のサポート期間は2022年6月（Windows 8.1では2023年2月）で終了したことで、トランスパイラとしてのBabelは現在のウェブ制作では必要性が低くなりました。

モジュールバンドラーの役割は複数のファイルをまとめることです。ES Modulesは各種ブラウザが対応し利用できるようになってきました（参考記事『[ブラウザで覚えるES Modules入門](https://ics.media/entry/16511/)』）。ただ、**HTTP/1.1環境下では同時リクエスト数の上限があるため、モジュールバンドラーによってまとめる利点が依然として存在します**。npmモジュールのバンドルにも役立つことを考えると、モジュールバンドラーの寿命はトランスパイラよりも長いかもしれません。

**モジュールバンドラーとしてのwebpackは多機能であるがゆえに設定が複雑です**。本記事で紹介した設定は一例に過ぎないので、**コピペするだけではなく**理解したうえで応用しなけば現場ではまったく役に立ちません。

前回の記事「[最新版で学ぶwebpack入門](https://ics.media/entry/12140/)」には、JavaScriptの圧縮やソースマップ、webpack-dev-serverなどについて解説しています。あわせて参照くださいませ。

### 連載一覧

-   導入編
    -   [最新版で学ぶwebpack入門](https://ics.media/entry/12140/)
-   ECMAScript 2015+編
    -   [webpack + BabelでES2023ビルド環境の構築](https://ics.media/entry/16028/)（本記事）
    -   [webpack + TypeScriptの環境構築](https://ics.media/entry/16329/)
-   スタイルシート編
    -   [スタイルシート(CSSやSass)を取り込む方法](https://ics.media/entry/17376/)
    -   [Bootstrapをバンドルする方法](https://ics.media/entry/17749/)