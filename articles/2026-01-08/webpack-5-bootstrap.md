---
title: "最新版で学ぶwebpack 5入門 - Bootstrapをバンドルする方法"
source: "https://ics.media/entry/17749/"
publishedDate: "2018-04-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

モジュールバンドラーwebpack（ウェブパック）はJavaScriptだけでなくCSSもバンドルできるツールです。タスクランナーGulpで対応していたことの多くはwebpackで置き換えが可能。JavaScriptエンジニアだけでなく、**CSSコーダーにも利用が拡大しているのではないでしょうか？**

前回の記事「[webpackにスタイルシートを取り込む方法](https://ics.media/entry/17376/)」ではCSS・Sassとwebpackの連携方法について解説しました。今回は応用としてCSSフレームワークの[Bootstrap 5](https://getbootstrap.com/)をwebpackで利用する方法を解説します。最小構成と、応用構成の二通りについて説明します。

![](https://ics.media/entry/17749/images/180410_webpack_bootstrap_site.png)

▲[Bootstrap](https://getbootstrap.com/)の公式サイト

※この記事は2023年3月現在最新のBootstrap 5、webpack 5、Node.js 19で解説しています。

### Bootstrap とは

BootstrapとはもとはTwitterからリリースされたCSSフレームワークです。今はGitHub上のチームによってメンテナンスされています([参照](https://getbootstrap.com/docs/5.3/about/overview/))。

特徴として、フォームやボタン、ナビゲーション、モーダルなど汎用的なウェブサイトのパーツのスタイルが提供されています。このような汎用パーツは一から作ると手間がかかるもの。Bootstrapを使えば車輪の再発明をおさえられるので、生産性をあげられます。

![](https://ics.media/entry/17749/images/180410_webpack_bootstrap_example.png)

▲Bootstrapの公式Example「[Jumbotron](https://getbootstrap.com/docs/4.0/examples/jumbotron/)」

弊社の実績にもBootstrap製のものが多くあります。ウェブアプリケーション「[Particle Develop](https://ics.media/entry/10748/)」やElectronアプリ「[アニメ画像に変換する君](https://ics.media/entry/12746/)」もBootstrapを利用してます。

### ミニマムにBootstrapと組み合わせる方法

まずはシンプルに手順を理解するために、webpackとBootstrapの最小構成を組んでみます。サンプルの完成品は次のリンクからコードをダウンロードできます。

-   [ソースコードを確認する](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-bootstrap-min/)
-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/170330_webpack/tutorial-bootstrap-min/dist/)

![](https://ics.media/entry/17749/images/180410_webpack_bootstrap_sample_1.png)

▲Bootstrapを使った解説用サンプル

#### モジュールのインストール

webpackのビルドに必要なモジュールをインストールしましょう。`style-loader`と`css-loader`はwebpackでスタイルシートを利用するために必要なモジュールです。`--save-dev`（短縮指定は`-D`）オプションでインストールします。

```
npm i -D webpack webpack-cli style-loader css-loader
```

Bootstrap本体もインストールしましょう。Bootstrapは内部でPopper.jsに依存しているので、あわせてインストールする必要があります。

```
npm i bootstrap @popperjs/core
```

ここまでインストールすれば、package.jsonファイルは次のような内容となっているはずです。

-   [package.jsonファイル](https://github.com/ics-creative/170330_webpack/blob/master/tutorial-bootstrap-min/package.json)

#### 設定ファイル

続いて、`webpack.config.js`ファイルに次の設定を記載します。本来はさまざまなオプションを設定しますが、最低限の内容としてコードを紹介します。CSSのバンドルには「style-loader」と「css-loader」の二種類が必要だと覚えてください。

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",
  module: {
    rules: [
      {
        // 対象となるファイルの拡張子(cssのみ)
        test: /\.css$/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // スタイルシートをJSからlinkタグに展開する機能
          "style-loader",
          // CSSをバンドルするための機能
          "css-loader"
        ],
      },
    ],
  },
};
```

![](https://ics.media/entry/17749/images/180410_webpack_bootstrap_loader_1.png)

#### コンテンツ側のソースコード

`src`フォルダー内に`index.js`ファイルを格納します。`index.js`ファイルには`import`文を用いて、Bootstrapを取り込みます。

```
// Bootstrapのスタイルシート側の機能を読み込む
import "bootstrap/dist/css/bootstrap.min.css";

// BootstrapのJavaScript側の機能を読み込む
import "bootstrap";
```

BootstrapにはスタイルシートとJavaScriptの2つの機能があります。1つ目の`import`文はスタイルシートを、2つ目のものはJavaScriptを取り込んでいます。

#### ビルド

`npx webpack`コマンドを使ってビルドすると、`dist`フォルダー内の`main.js`ファイルに出力されます。このJSファイル内にCSSコードが埋め込まれています。

```
npx webpack
```

![](https://ics.media/entry/17749/images/180410_webpack_bootstrap_folder_1.png)

ビルドで生成した`main.js`ファイルをHTMLで読み込むと、スタイルが適用されます。JSファイルしか読み込んでいない状態ですが、`main.js`ファイルには自動的にCSSに展開される機能（style-loaderによるもの）が入っているためです。

![](https://ics.media/entry/17749/images/180410_webpack_bootstrap_style_loader.png)

▲JSファイル内で自動的にスタイルシートが展開される

### 実戦向きのBoostrap+webpack構成

Bootstrapの利点はカスタマイズ性が高いことです。

先述のミニマムな構成だと、Boostrapを組み込むメリットが少なく、CDNとして提供されている公式URLを取り込んだほうが手軽ではないかと読者の皆さんは思うはずです。

巷でBootstrapのサイトに対してよく言われるのは「Bootstrapくさいよね」という指摘。そのまま使うと、**見た目が共通の仕上がりとなりBootstrap臭がどうしても出てしまいます**。CDN版だとカスタマイズ性にかけており、Bootstrapらしさを軽減するのが難しいといった課題があります。

**Bootstrapをwebpack+Sass構成で取り込む最大のうまみは、簡単にカスタマイズできることです**。特定のSass変数の値を上書きすることで、Boostrapの装飾を変更できます。カスタマイズすることでBootstrapっぽさを軽減し、コンテンツのテイストにスタイルをあわせられます。

ここからは[完成版のソースコード](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-bootstrap-style-js)を参考にしてもらいつつ、必要な箇所をポイントで紹介します。

-   [ソースコードを確認する](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-bootstrap-style-js/)
-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/170330_webpack/tutorial-bootstrap-style-js/dist/)

![](https://ics.media/entry/17749/images/180410_webpack_bootstrap_sample_2.png)

▲Bootstrapのフォントやカラーリングをカスタマイズしたサンプル

#### モジュールのインストール

webpackのビルドに必要なモジュールを`--save-dev`（短縮は`-D`）オプションインストールしましょう。多くのモジュールが登場するので、重要なものについて役割を説明します。

```
npm i -D webpack webpack-cli css-loader style-loader sass sass-loader postcss postcss-loader autoprefixer mini-css-extract-plugin
```

先述の説明と繰り返しになりますが、bootstrap関連のモジュールをインストールします。

```
npm i bootstrap @popperjs/core
```

ここまでインストールすれば、package.jsonファイルは次のような内容となっているはずです。

-   [package.jsonファイル](https://github.com/ics-creative/170330_webpack/blob/master/tutorial-bootstrap-style-js/package.json)

#### 設定ファイル

`webpack.config.js`ファイルは下記のファイルを参照ください。処理を確認できるよう、事細かにコメントを記載しています。

-   [webpack.config.jsファイルのソースコード](https://github.com/ics-creative/170330_webpack/blob/master/tutorial-bootstrap-style-js/webpack.config.js)

重要なポイントとしては次の3点です。

-   ソースマップを有効にする
-   [PostCSSでAutoprefixerを適用する](https://ics.media/entry/17376/#postcss-autoprefixer)
-   `mini-css-extract-plugin`を使う

とくに3つ目の`mini-css-extract-plugin`が大事なので、説明します。webpackはJavaScriptにすべてをバンドルするツールですが、**スタイルシートとしてのCSSファイルはJavaScriptとは別ファイルとして扱うほうが適した場面もあります**。JSファイルは読み込み順をブロックする要因なので実行タイミングを遅延させ、スタイルシートは見栄えに関するので早い段階で適用させるといった使い分けが考えられます。`mini-css-extract-plugin`を使えば、スタイルシートを別ファイルとして分離できます。CSSコーダーには必須の機能でしょう。詳しくは連載記事「[JS内にCSSをバンドルしたくない場合](https://ics.media/entry/17376/#text-extract-plugin)」をご覧ください。

![](https://ics.media/entry/17749/images/180410_webpack_bootstrap_loader_2.png)

#### コンテンツ側のソースコード

`src`フォルダー内に`index.js`ファイルを格納します。`index.js`ファイルには`import`文を用いて、自分で用意したscssファイルを読み込むように記述します。

▼src/index.jsファイル

```
// BootstrapのJavaScript側の機能を読み込む
import "bootstrap";

// スタイルシートを読み込む
import "./index.scss";
```

scssファイルの中身を説明します。Bootstrapのscssファイルを取り込むのですが、取り込む前に変数を定義します。こうすれば、Bootstrapのスタイルを調整できます。変更可能なものは「[Options · Bootstrap](https://getbootstrap.com/docs/5.3/customize/options/)」を参照ください。

▼src/index.scssファイル

```
// 例えば角丸設定を上書きする
$enable-rounded: false;

// テーマカラー設定
$primary: #c51162;

// フォントを変える
$font-family-base: serif;

/* Bootstrap を読み込む */
@import "~bootstrap/scss/bootstrap.scss";
```

なお、`~bootstrap`という記述はwebpackの記法です。scssファイルで`node_modules`フォルダーを参照できます。

以上の設定でビルドすれば、カスタマイズしたBootstrapを出力できます。

![](https://ics.media/entry/17749/images/180410_webpack_bootstrap_folder_2.png)

これでサンプルは完成です。実際はCSS側で設定した画像をバンドルしたり、ウェブフォントをコピーしたりとアセット周りの管理も必要です。連載記事「[Sass内の画像もバンドルする方法](https://ics.media/entry/17376/#bundle-sass-url)」を参考に、プロジェクトに応じた設定ファイルに仕上げてください。

### まとめ

webpackの理解が進めば、開発側の生産効率を向上でき、かつエンドユーザーに最適なデータ配信ができます。連載記事で少しずつ知識を深めて、快適にwebpackを使っていきましょう。

### 連載記事一覧

-   導入編
    -   [最新版で学ぶwebpack入門](https://ics.media/entry/12140/)
-   ECMAScript 2015+編
    -   [webpack+BabelでES2021環境の構築](https://ics.media/entry/16028/)
    -   [webpack+TypeScriptの環境構築](https://ics.media/entry/16329/)
-   スタイルシート編
    -   [スタイルシート(CSSやSass)を取り込む方法](https://ics.media/entry/17376/)
    -   Bootstrapとの連携方法（本記事）