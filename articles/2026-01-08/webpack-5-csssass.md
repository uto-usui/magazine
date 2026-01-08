---
title: "最新版で学ぶwebpack 5入門 - スタイルシート(CSS/Sass)を取り込む方法"
source: "https://ics.media/entry/17376/"
publishedDate: "2018-03-05"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ウェブのフロントエンドエンジニア開発で人気を集めるモジュールバンドラーのwebpack（ウェブパック）。webpackにはJavaScriptファイルのバンドルだけではなく、スタイルシート（CSSやSass）のバンドルもできます。ICS MEDIAの記事「[最新版で学ぶwebpack入門](https://ics.media/entry/12140/)」では、webpackの基本的な使い方を解説しましたが、この記事ではスタイルシートに焦点をあてて解説します。

※webpackを利用するには事前に[Node.js](https://nodejs.org/en/download)をインストールしておいてください。この記事では2021年5月現在最新のNode.js v14、npm 7と、webpack 5をもとに解説しています。

### この記事で説明していること

-   [CSSをバンドルする利点](#procon-css)
-   [CSSのバンドル方法](#bundle-css)
-   [Sassのバンドル方法](#bundle-sass)
-   [Sass内の画像もバンドルする方法](#bundle-sass-url)
-   [容量の閾値で画像のバンドルを制御する方法](#bundle-sass-url-limit)
-   [PostCSS(Autoprefixer)のバンドル方法](#postcss-autoprefixer)

### CSSをバンドルする利点

webpackでは、JavaScriptだけではなく**スタイルシート、画像、ウェブフォント等あらゆるリソースをモジュールとして取り扱えます**。JavaScriptファイル以外のファイルを扱うには、webpackの[Loaders](https://webpack.js.org/loaders/)機能を用います。

さまざまなファイルをバンドルする利点は読み込みの高速化が挙げられます。HTTP/1.1接続ではブラウザとウェブサーバーの同時接続数が限られるため、複数のファイルの転送に時間がかかります。複数のJSファイルを1つにまとめてしまうことが一般的な解決案として知られています。

手前ミソですが、webpackを利用して制作したウェブサイト「[CreateJS入門サイト](https://ics.media/tutorial-createjs/)」を紹介します。スタイルシートで画像もバンドルしているため、リクエスト数が少なくなりページの表示高速に役立ちました。ブラウザキャッシュのない状態でも300ミリ秒をきるほど高速に読み込みできています。

![](https://ics.media/entry/17376/images/170704_webpack_createjs.png)

### webpack+CSSの構成を作成しよう

CSSファイルの読み込み例を紹介します。サンプルは次のリンクにあるので、手順がわからなければ参照ください。

-   [webpack+CSSのサンプル](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-css)
-   [サンプルのビルド結果を別ウインドウで開く](https://ics-creative.github.io/170330_webpack/tutorial-css/dist/)

#### モジュールのインストール

前回の記事「[最新版で学ぶwebpack入門](https://ics.media/entry/12140/)」を済まし、プロジェクトフォルダーでコマンド「`npm init -y`」を打ち込んだ状態から解説をはじめます。

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_css_before.png)

CSSの読み込みに必要なローダーは、[Style Loader](https://github.com/webpack/style-loader)と[CSS Loader](https://github.com/webpack/css-loader)なので、この2つのプラグインをプロジェクトフォルダーにインストールします。コマンドラインで次のコマンドを入力ください。

```
npm i -D webpack webpack-cli style-loader css-loader
```

#### 設定ファイル

続いて、`webpack.config.js`ファイルに次の設定を追記します。本来は細かいオプションを設定できますが、最低限の内容としては次のコードとなります。CSSのバンドルには「style-loader」と「css-loader」の2種類が必要だと覚えてください。

▼webpack.config.js （簡略版）

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
        ]
      }
    ]
  }
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};
```

拡張子が`.css`のファイルに対して、`use`配列で指定したLoaderが**後ろから順番に適用**されます。処理を図示すると次のような流れになります。

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_flow_css.png)

-   style-loader: 動的にstyleタグが作られ、head要素内に差し込まれることでcssが適用されます
-   css-loader: css内の`url()`メソッドや`@import`文をJavaScriptの`require()`メソッドに変換。webpackが画像も依存解決します

とりあえずwebpackを動かすために最小限の構成で説明しています。現場で使えるwebpack.config.jsファイルの書き方は後述します。

#### コンテンツ側のソースコード

`src`フォルダー内に`index.js`と`style.css`の2つのファイルを格納します。`index.js`ファイルには`import`文を用いて、CSSファイルを読み込むように記述します。

▼src/index.js

```
// import 文を使ってstyle.cssファイルを読み込む。
import "./style.css";
```

#### ビルド

`npx webpack`コマンドを使ってビルドすると、ビルドされた`dist/main.js`の中にCSSコードが埋め込まれます。

```
npx webpack
```

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_css_after.png)

▲ビルドコマンドによってmain.jsファイルにバンドルされる

HTML側で`dist/main.js`ファイルを読み込むと、スタイルが適用されます。JSファイルしか読み込んでいない状態ですが、main.jsファイルには自動的にCSSに展開される機能が入っているためです。

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_css_preview.png)

▲ビルドコマンドによってmain.jsファイルにバンドルされる

#### 実戦向きのwebpack.config.jsファイル

制作の現場ではソースマップの出力は必須です。**ソースマップとは変換前のコードの情報を残すことで開発時に役立てることができる機能**です。変換前後ではコードの形が大きく変わってしまうため、元のコードの何行目が影響しているのかわかりやすくする効果があります。

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_css_sourcemap.png)

webpack.config.jsファイルのコードが長くなりますが、慣れてきたら次のような設定をするといいでしょう。webpackの仕様として、`mode`値が`development`であってもCSSのソースマップは自動的に有効にはなりません。逆に、`mode`値が`production`であってもCSSのソースマップは自動的に無効にはなりません。そのため、**ソースマップの有効無効は自前の変数で管理しています**。

▼webpack.config.js （現場で利用する設定例）

```
// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "development";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,

  module: {
    rules: [
      // CSSファイルの読み込み
      {
        // 対象となるファイルの拡張子
        test: /\.css/,
        // ローダー名
        use: [
          // linkタグに出力する機能
          "style-loader",
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップを有効にする
              sourceMap: enabledSourceMap
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

### 中間言語の変換 - webpack+Sassの構成を作成しよう

フロントエンド開発では、[Sass](https://sass-lang.com/)などの中間言語を使うことが多いでしょう。**webpackではこれらの中間言語を変換できます**。アンケートをしてみたところ、多くのCSSコーダーはSassを利用していることがわかりました。

SassのSCSSファイルを読み込む手順を解説します。サンプルは次のリンクにあるので、手順がわからなければ参照ください。

-   [webpack+Sassのサンプル](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-sass)
-   [サンプルのビルド結果を別ウインドウで開く](https://ics-creative.github.io/170330_webpack/tutorial-sass/dist/)

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_scss_folder.png)

▲これから説明するサンプル。ビルドコマンドによってmain.jsファイルにバンドルする

#### モジュールのインストール

Sassの読み込みに必要なローダーは、[sass-loader](https://github.com/jtangelder/sass-loader)です。また、Sass LoaderはSassのコンパイル用モジュール[sass](https://www.npmjs.com/package/sass)に依存しているので、あわせてインストールします。コマンドラインで次のコマンドを入力します。

```
npm i -D webpack webpack-cli sass-loader sass style-loader css-loader
```

#### 設定ファイル

続いて、`webpack.config.js`ファイルに次の設定を追記します。

▼webpack.config.jsファイル

```
// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "development";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,

  module: {
    rules: [
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          // linkタグに出力する機能
          "style-loader",
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap
            },
          },
        ],
      },
    ],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
};
```

拡張子が`.scss`のファイルに対して、`use`配列で指定したLoaderが後ろから順番に適用されます。処理を図示すると次のような流れになります。

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_flow_scss.png)

#### コンテンツ側のソースコード

ローダーを用いてSassを読み込むには、エントリーポイント内で`import`文を用いて次のように記述します。`src`フォルダー内に`index.js`ファイルと`style.css`ファイルを格納しているとして解説します。

▼src/index.js

```
// import文を使ってSassファイルを読み込む。
import "./style.scss";
```

#### ビルド

`webpack`コマンドを使ってビルドすると、webpackはSassをコンパイルします。

```
npx webpack
```

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_scss_preview.png)

▲ビルドコマンドによってmain.jsファイルにバンドルされる。このサンプルでは、画像は取り込んでいないのがポイント。

### Sass内の画像もバンドルする方法

**webpackでは画像もJSファイルにバンドルできます**。画像はBase64文字列として変換され、コンパイル後のJSファイルに含まれます。何でもかんでもJSファイルにするのは違和感があるかもしれませんが、**HTTP/1.1環境下でリクエスト数を極限まで下げるには1つの最適解**だと思います。

サンプルは次のリンクにあるので、手順がわからなければ参照ください。

-   [Sassで画像を取り込むサンプル](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-sass-image-url)
-   [サンプルのビルド結果を別ウインドウで開く](https://ics-creative.github.io/170330_webpack/tutorial-sass-image-url/dist/)

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_scss_image_folder.png)

▲これから説明するサンプル。ビルドコマンドによってmain.jsファイルにバンドルする

#### モジュールのインストール

基本的には先述のSassの手順と同じです。

```
npm i -D webpack webpack-cli sass-loader sass style-loader css-loader
```

#### 設定ファイル

その上で、webpackの設定ファイルには次のように指定します。JPGやPNGなどの画像形式の箇所に、`type: "asset/inline"`を指定します。`type`プロパティーはwebpack 5から搭載された新機能で従来の`url-loader`と似た機能が提供されています。

▼webpack.config.js

```
// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "production";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,

  module: {
    rules: [
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        // ローダー名
        use: [
          // linkタグに出力する機能
          "style-loader",
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドを取り込む
              url: true,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          // Sassをバンドルするための機能
          {
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg)$/,
        // 画像をBase64として取り込む
        type: "asset/inline",
      },
    ],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
};
```

拡張子が`.scss`のなかでURL参照をしている画像ファイルがあれば、webpackが取り込みます。処理を図示すると次のような流れになります。

![](https://ics.media/entry/17376/images/210518_webpack_stylesheet_flow_image.png)

エントリーポイントの`src/index.js`の内容は前述のSassのサンプルと同じです。

#### ビルド

`webpack`コマンドを使ってビルドすると、webpackはSassをコンパイルします。すると、画像も取り込まれて`dist/main.js`ファイルが生成されます。

```
npx webpack
```

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_scss_image_preview.png)

▲ビルドコマンドによってmain.jsファイルにバンドルされる。このサンプルでは、画像も取り込んでいるのがポイント。

### 画像をバンドルしない場合/一部だけバンドルする場合

CSSの場合、画像の取り扱いがポイントです。`type: asset/inline`の指定だと一括ですべてのファイルをCSSファイル内に埋め込みますが、逆に画像を埋め込みたくないという方もいるでしょう。

その場合には`type: "asset/resource"`の指定を使います。この指定だと外部ファイルとしてビルド時にコピーされるようになります。

▼webpack.config.js

```
// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "production";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,

  module: {
    rules: [
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        // ローダー名
        use: [
          // linkタグに出力する機能
          "style-loader",
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドを取り込む
              url: true,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          // Sassをバンドルするための機能
          {
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg)$/,
        // 画像を埋め込まず任意のフォルダに保存する
        type: "asset/resource",
      },
    ],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
};
```

サンプルファイルは以下のリンクから確認できます。

-   [type: assetのサンプルのコード](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-sass-image-file)
-   [サンプルのビルド結果を別ウインドウで開く](https://ics-creative.github.io/170330_webpack/tutorial-sass-image-file/dist/)

#### 容量の閾値でバンドル有無を制御する方法

高度なテクニックとして、一定のサイズまでは画像をバンドルして、閾値を超えた場合は埋め込まず外部参照にするといった柔軟な設定もできます。

![](https://ics.media/entry/17376/images/180305_webpack_stylesheet_limit.png)

▲画像ファイルの容量で埋め込み有無を分岐することも可能

JavaScriptに画像をバンドルすると①JSファイルの評価時間の増大 ②本来のファイルに比べてBase64化することで容量が1.33倍に大きくなるといったデメリットがあります。ただし、サーバーリクエスト処理のコストに比べて①②のほうが小さい場合もあります。容量の大小で制御するのは1つの現実解でしょう。

以下にwebpack.config.jsのコードを紹介します。`type: "asset"`を指定することがポイントです。

```
// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "production";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,
  output: {
    assetModuleFilename: "imgs/[name][ext]",
  },

  module: {
    rules: [
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        // ローダー名
        use: [
          // linkタグに出力する機能
          "style-loader",
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドを取り込む
              url: true,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          // Sassをバンドルするための機能
          {
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg)$/,
        // 閾値以上だったら埋め込まずファイルとして分離する
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 100KB以上だったら埋め込まずファイルとして分離する
            maxSize: 100 * 1024,
          },
        },
      },
    ],
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};
```

サンプルファイルは以下のリンクから確認できます。

-   [type: assetのサンプルのコード](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-sass-image-url-limit)
-   [サンプルのビルド結果を別ウインドウで開く](https://ics-creative.github.io/170330_webpack/tutorial-sass-image-url-limit/dist/)

JavaScript内にバンドルすることがwebpackの利点であると紹介してきましたが、**一般的なウェブサイト制作ではcssファイルを用意してstyleタグで読ませる場合が多い**でしょう。

```
<!-- スタイルシートを読み込む -->
<link rel="stylesheet" href="style.css" />

<!-- JavaScriptを読み込む -->
<script src="main.js"></script>
```

▲一般的なスタイルシートの読み込み方

webpackの[MiniCssExtractPluginミニ・シーエスエス・エクストラクト・プラグイン](https://github.com/webpack-contrib/mini-css-extract-plugin)を使うと、それが実現できます。このプラグインはバンドルしたJavaScriptから任意のテキスト（スタイルシートの部分）を別ファイルとして（CSSファイルとして）出力できます。詳しくはサンプルファイルを用意したので、次のリンクを参照ください。

#### CSSの場合

以下のモジュールをインストールします。

```
npm i -D webpack webpack-cli css-loader mini-css-extract-plugin
```

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // CSSファイルを書き出すオプションを有効にする
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSを読み込む
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
```

サンプルファイルは以下のリンクから確認できます。

-   [tutorial-css-extract-pluginのサンプルのコード](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-css-extract-plugin)
-   [サンプルのビルド結果を別ウインドウで開く](https://ics-creative.github.io/170330_webpack/tutorial-css-extract-plugin/dist/)

#### Sassの場合

以下のモジュールをインストールします。

```
npm i -D webpack webpack-cli css-loader sass sass-loader mini-css-extract-plugin
```

webpack.config.jsには以下のコードを記述します。

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "production";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.js",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js",
  },

  module: {
    rules: [
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          // CSSファイルを書き出すオプションを有効にする
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // CSSファイルを外だしにするプラグイン
    new MiniCssExtractPlugin({
      // ファイル名を設定します
      filename: "style.css",
    }),
  ],
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};
```

サンプルファイルは以下のリンクから確認できます。

-   [tutorial-sass-extract-pluginのサンプルのコード](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-sass-extract-plugin)
-   [サンプルのビルド結果を別ウインドウで開く](https://ics-creative.github.io/170330_webpack/tutorial-sass-extract-plugin/dist/)

従来は「[ExtractTextPluginエキストラクト・テキスト・プラグイン](https://github.com/webpack-contrib/extract-text-webpack-plugin)」が使われていましたが、2019年から非推奨となっています。そのため、ExtractTextPluginではなくMiniCssExtractPluginを利用ください。

### PostCSS(Autoprefixer)のバンドル方法

スタイルシートに関してはベンダープレフィックスを付与するのが一般的でしょう。古めのAndroidやIE 11への対応を考慮すると、ベンダープレフィックスを付与するのが安全です。webpack単体ではその機能は存在しないので、PostCSSの機能を読み込んで実現します。AutoprefixerはPostCSSの中の1つのモジュールであるため、利用するにはPostCSSとAutoprefixerを両方インストールする必要があります。

サンプルは次のリンクにあるので、手順がわからなければ参照ください。

-   [PostCSS用のサンプル](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-sass-postcss)
-   [サンプルのビルド結果を別ウインドウで開く](https://ics-creative.github.io/170330_webpack/tutorial-sass-postcss/dist/)

#### モジュールのインストール

コマンドラインで次のコマンドを入力ください。似たような名前のモジュールが多くて不安になりますが、最低限必要なものです。

```
npm i -D webpack webpack-cli style-loader css-loader sass sass-loader postcss postcss-loader autoprefixer
```

インストールしたら、`package.json`は[サンプルのファイル](https://github.com/ics-creative/170330_webpack/blob/master/tutorial-sass-postcss/package.json)と同じような内容となるはずです。

#### 設定ファイル

続いて、webpack.config.jsファイルに次の設定を追記します。ソースマップを有効にしています。

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",
  // source-map 方式でないと、CSSの元ソースが追跡できないため
  devtool: "source-map",
  module: {
    rules: [
      {
        // 対象となるファイルの拡張子
        test: /\.scss/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // linkタグに出力する機能
          "style-loader",
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // CSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: true,
              // Sass+PostCSSの場合は2を指定
              importLoaders: 2,
            },
          },
          // PostCSSのための設定
          {
            loader: "postcss-loader",
            options: {
              // PostCSS側でもソースマップを有効にする
              // sourceMap: true,
              postcssOptions: {
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  ["autoprefixer", { grid: true }],
                ],
              },
            },
          },
          // Sassをバンドルするための機能
          {
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: true,
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

PostCSSの設定はpostcss-loader内のオプションで指定しています。以上で完成です。

コマンドラインを叩いて確認してみましょう。このコマンドで、`dist/main.js`に書き出されます。

```
npx webpack
```

### まとめ

JavaScriptだけではなくCSSもwebpackで一元管理すると、**webpackの周辺技術をふんだんに使えるため開発が楽になります**。たとえば、CSSの編集で、webpack-dev-serverでローカルサーバーを立てれるのはとても便利です。webpackの設定ファイルははじめはややこしいかもしれませんが、コピペで動かして少しずつ理解していくといいでしょう。書き慣れてくると、**痒いところまで手がとどくのでwebpackの柔軟性に利点を感じるようになってきます**。

ウェブ制作の現場では、CSSにベンダープレフィックスを付与することも多いでしょう。そのときにはAutoPrefixerなどPostCSSの技術を利用します。この記事は「[Bootstrapをバンドルする方法](https://ics.media/entry/17749/)」に続きます。

### 連載記事一覧

-   導入編
    -   [最新版で学ぶwebpack入門](https://ics.media/entry/12140/)
-   ECMAScript 2015+編
    -   [webpack + BabelでES2021環境の構築](https://ics.media/entry/16028/)
    -   [webpack + TypeScriptの環境構築](https://ics.media/entry/16329/)
-   スタイルシート編
    -   スタイルシート（CSSやSass）を取り込む方法（本記事）
    -   [Bootstrapをバンドルする方法](https://ics.media/entry/17749/)