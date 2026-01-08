---
title: "絶対つまづかないwebpack入門 - JavaScriptのモジュールバンドラ"
source: "https://ics.media/entry/12140/"
publishedDate: "2016-05-23"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

[webpack（ウェブパック）](https://webpack.js.org/)とはJSファイルをまとめる高機能なモジュールバンドラー。まとめることで**ウェブページのHTTPリクエストの数を減らしたり、高度なウェブアプリケーションの開発に役立ちます**。

連載では[TypeScript](https://ics.media/entry/16329/)や[Babel](https://ics.media/entry/16028/)などのES2015+の環境構築、ReactなどのJSライブラリの設定方法を網羅。サンプルファイルで詳しく解説します。

webpackの入門記事は他のサイトにもありますが、対象バージョンが古くて使えなかったりします。検索結果の上位の野良記事を参照にしたら古いバージョンの内容ばかり。**解説記事通りにやったのにうまく動かない･･･**なんて困った方も多いのではないでしょうか。**本記事は常に最新版に対応させているので、安心して読み進めてください**。

※本記事では2025年5月現在のwebpack 5（2020年10月リリース）以上で解説しています。

#### 本記事で解説していること

-   [webpackの概要](#webpack-general)
-   [導入手順](#webpack-setup)
-   [webpackでJSファイルをまとめる手順](#webpack-js)
-   [webpackでコードを圧縮し、ソースマップを使う](#webpack-sourcemap)
-   [webpackでファイル変更を検知し、ローカルサーバーで確認する](#webpack-devserver)
-   [ファイル変更時に差分ビルドを。ウォッチを利用する](#webpack-watch)
-   [webpackとタスクランナー(Gulp等)との使い分け](#webpack-gulp)
-   [他のモジュールバンドラーとの性能比較](#module-bundler-comparison)

### webpackの概要

webpackとはウェブコンテンツを構成するファイルをまとめてしまうツールです。**一番多い使い方は、複数のJavaScriptを1つにまとめることでしょう**。複数のJavaScriptをまとめるのは、いろんな利点があります。

#### モジュールが使える

ウェブのフロントエンド開発では、JavaScriptは処理内容に応じて、ファイルを「モジュール」としてわけて開発することがほとんどです。モジュールには標準仕様のECMAScript Modules（通称、ES ModulesやESMと呼ばれます）や、Node.jsで旧来より用いられているCommonJS形式のモジュールなど、さまざまなモジュールの形式があります。webpackはどの形式にも対応しており、モジュールをバンドルする（1つにまとめる）ことができます。

また、一般的なJSライブラリはモジュール形式で提供されており、これも同様にwebpackで取り込めます。

かつて、JavaScriptは`script`タグでJSライブラリを導入する方法が用いられていましたが、グローバルの変数名を汚染しあうという問題がありました。**ES Modulesを使うと変数の競合やグローバル汚染を防げるので開発時の安全性が高まります**。さらには、コードの可読性が上がり、開発作業の分担やテストがしやすくなり、再利用性や保守性のメリットが考えられます。

#### 転送の最適化

ファイルを1つにまとめることはウェブコンテンツの読み込み性能向上に役立ちます。たとえば、HTTP/1.1接続ではブラウザとウェブサーバーの同時接続数が限られるため、複数のファイルの転送に時間がかかります。**複数のJSファイルを1つにまとめてしまうことが一般的な解決案**として知られています。

![](https://ics.media/entry/12140/images/170704_webpack_createjs.png)

▲webpackを利用して制作した[ウェブサイト](https://ics.media/tutorial-createjs/)。リクエスト数が少ないためブラウザキャッシュのない状態でも300ミリ秒をきるほど爆速である

#### JSだけでなく、CSSや画像もバンドルできる

それだけでも便利なのですが、webpackはJavaScriptだけでなくスタイルシートや画像までもバンドルできてしまうのです。先述の転送の最適化につながるメリットです。

![](https://ics.media/entry/12140/images/160519_webpack_is.png)

▲webpackはさまざまなアセットをJavaScriptファイルにまとめることができる

#### 包括的な開発環境が整う

JSファイルの圧縮やソースマップに対応していたり、ローカルサーバーの起動まで包括的な制作環境としての機能まであります。webpackであれば、はじめから最後までwebpack一式でツールを揃えられます。

**webpackを導入しておけばフロントエンドエンジニアに必要な技術がひととおり揃う**、ということが最大の利点でしょう。

### 導入手順

webpackを使う準備をしましょう。事前にNode.jsをインストールし、コマンドラインを使う準備をしておいてください。

1.  公式サイトから[Node.js](https://nodejs.org/en/download)をインストールします
2.  コマンドラインを起動します (macOSだと「ターミナル」、Windowsだと「コマンドプロンプト」)

解説の手順はわずか2分半の動画に記録しておきました。**動画を見ればwebpackの環境を誰でも確実に設定できます**。記事を読み進めてわからない手順があれば、動画を見返してください。

#### コマンドラインでの操作

コンテンツのファイル一式が保存されるフォルダーを任意の場所に作成し、コマンドラインでその場所に移動します。`cd`コマンドで任意のフォルダーまで移動しましょう。「`MyName/myproject`」は仮の名前なので、好きなフォルダー名を指定ください。

▼ Windowsでの移動

```
cd C:¥Users¥MyName¥myproject
```

▼ macOSでの移動

```
cd /Users/MyName/myproject
```

次のコマンドを実行します。これを実行すると、プロジェクトの設定情報が記述された`package.json`ファイルが生成されます。

```
npm init -y
```

![ターミナルでnpm initコマンドを使ってpackage.jsonを作成する](https://ics.media/entry/12140/images/170704_webpack_step1.png)

webpackを実行する為に、webpack本体をインストールします。`npm install`はインストールの命令、`-D`はインストール先を`devDependencies`にするための指定、`webpack`はその名の通りインストールする対象です。

```
npm install -D webpack webpack-cli
```

![npm installコマンドを使ってwebpack関連モジュールをインストールする](https://ics.media/entry/12140/images/170704_webpack_step2.png)

以上で、webpackを使用できる準備が整いました。

### webpackでJSファイルをまとめる手順

#### モジュール方式でJavaScriptを書く理由

1つのJavaScriptファイルに長い処理を書くと、可読性が悪くなります。これを解決するには複数ファイルへ分割することでしょう。ウェブのフロントエンド界隈では、**機能ごとに分割されたJavaScriptファイルのことを一般的に「モジュール」と呼びます**。

![](https://ics.media/entry/12140/images/160519_javascript_module.png)

JavaScriptをモジュールで書くにはお作法があり、現在は標準仕様のES Modules形式で書くのが一般的です。

少し古いブラウザではJavaScriptのモジュールを取り扱うための仕組みがなかったため、モジュールを取り扱うための仕様が長いこと検討されてきました。代表的なものに[CommonJS](https://wiki.commonjs.org/wiki/CommonJS)、AMD、[ES2015のModules](https://262.ecma-international.org/6.0/#sec-module-semantics)等があります。

webpackで、モジュールとしてのJavaScriptを結合していきましょう。

#### モジュール方式のJavaScriptを書いてみよう

ES ModulesのJavaScript処理を例にして説明します。**ES Modulesをはじめて見る方は難しく思うかもしれませんが、これからのJavaScriptの基本知識になるはずなので頑張って読み進めてください**。この記事で解説するサンプルはGitHubからダウンロードできます。

-   [ソースコードを確認する](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-js)

`index.js`で`sub.js`に定義された`hello()`メソッドを呼び出す仕組みを考えてみます。ES Modulesの仕様に沿った記法としては、次のようなコードとなります。

▼index.js

```
// import 文を使って sub.js ファイルを読み込む。
import { hello } from "./sub";

// sub.jsに定義されたJavaScriptを実行する。
hello();
```

▼sub.js

```
// export文を使ってhello関数を定義する。
export function hello() {
  alert("helloメソッドが実行された。");
}
```

JavaScriptモジュールはこのままだと古いブラウザ（例：昔のInternet Explorer 11）で使用できなかったため、**古いブラウザが解釈できる形に変換する必要がありました**。そこで登場するのがwebpackです。

### webpackでJavaScriptモジュールを扱う

webpackを使うと、**JavaScriptモジュールをブラウザで扱える形に変換できます**。`index.js`のように**メインとなる処理を行うJavaScriptファイル「エントリーポイント」**と呼びます。エントリーポイントをコマンドでビルドします。

それでは、コマンドラインで次のビルドコマンドを入力してみましょう。

▼webpackによるビルド（コマンドライン）

```
npx webpack
```

![任意のindex.jsファイルを用意したらnpx webpackコマンドで打ち込む](https://ics.media/entry/12140/images/170704_webpack_step3.png)

`index.js`内で必要な`sub.js`が統合され、`dist`フォルダーのなかに`main.js`として出力されます。

![webpackによって 一つのJSファイルになる](https://ics.media/entry/12140/images/170704_webpack_step7_folder.png)

このwebpackで出力した`dist`フォルダー内のファイル`main.js`をHTMLで読みこむと、バンドルされたコードが実行されます。`dist`フォルダー内には`index.html`ファイルを用意しておきましょう（[コード例](https://github.com/ics-creative/170330_webpack/blob/master/tutorial-js/dist/index.html)）。

▼`dist/index.html`ファイル

```
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="main.js"></script>
</head>
<body>
</body>
</html>
```

ビルドしたファイルは次のリンクで確認できるので、見てみましょう。

-   [確認用のHTML](https://ics-creative.github.io/170330_webpack/tutorial-js/dist/index.html)
-   [ビルドされたJavaScriptファイル](https://github.com/ics-creative/170330_webpack/blob/master/tutorial-js/dist/main.js)

![](https://ics.media/entry/12140/images/170704_webpack_step4.png)

あっけなくwebpackのビルドができましたね。webpackの基本的な使い方の紹介は以上となりますが、さらに覚えるべき役立つ知識があるので解説します。

![webpackのバンドルの概要図](https://ics.media/entry/12140/images/160519_webpack_js_bundle.png)

▲webpackは複数のファイルの依存関係を考慮したうえで自動的に結合する

### package.jsonをカスタマイズする

`npx webpack`コマンドでビルドするのもシンプルですが、**npm scriptsを使う方が便利です**。npm scriptsとはコマンドのショートカット（エイリアス）を貼るための機能。`package.json`ファイルの`scripts`には、webpackのビルドコマンドを追加します。

▼`package.json`ファイル

```
{
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^5.99.8",
    "webpack-cli": "^6.0.1"
  },
  "private": true
}
```

※`package.json`ファイルには最低限`scripts`と`devDependencies`指定が記述されてあれば使えます。`main`や`author`などは消してしまって大丈夫です。

こうしておけば、`npm run build`とコマンドラインで入力することで、内部的にwebpackが呼び出され、さきほどの手順と同じ結果が得られます。npm scriptsの詳細は記事「[npm-scriptsのタスク実行方法まとめ](https://ics.media/entry/12226/)」で詳しく解説してるので参考ください。

![npm run build というショートカットで webpackを呼び出すことができる](https://ics.media/entry/12140/images/170704_webpack_step6.png)

### webpack.config.jsをカスタマイズする

webpack.config.jsファイルを用意することで、webpackの挙動を調整できます。

![](https://ics.media/entry/12140/images/170704_webpack_step5.png)

よく使う設定として、エントリーポイントを指定する`entry`と、出力フォルダーをカスタマイズする`output`があります。必須ではないもの、よく使うオプションのため必ずおさえておきましょう。次のように指定します。

▼webpack.config.jsファイル

```
module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/index.js`,

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js"
  }
};
```

webpackでは、エントリーポイントを指定しなければ自動的に「src/index.js」がエントリーポイントに、出力先を指定しなければ自動的に「dist/main.js」に出力されます。

`output.path`オプションを省略することもでき、その場合、出力ファイルは「dist」フォルダーにファイルが作成されます。

▼webpack.config.jsファイル

```
module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/index.js`,

  // ファイルの出力設定
  output: {
    // 出力ファイル名
    filename: "main.js"
  }
};
```

webpackではウェブコンテンツを制作に役立つ**さまざまな機能があります**。たとえば、webpackで出力したJavaScriptファイルは大きなファイル容量となるので、圧縮しておきたいと考える人も多いでしょう。そういった要望に応える機能が備わっています。

### webpackでコードの圧縮とソースマップを有効にする

JavaScriptの開発では、元のソースファイルとの関連性を示すソースマップが欠かせません。また、ウェブサイトへの公開時にはウェブページの読み込みを早くするために、ファイル容量を圧縮することも重要でしょう。webpackでは設定ファイルの記述によって、それらをカスタマイズできます。

#### webpackの設定ファイル

webpackの設定ファイルには次のように記述します。`mode`に`development`を記述することでソースマップを有効にします。逆に、`mode`の部分で`production`を指定することで、JavaSciptのコードを圧縮できます。開発時には`development`を指定し、ウェブサイト公開時には`production`に設定するのがいいでしょう。

▼webpack.config.jsファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development"
};
```

以上で設定は完了です。webpack.config.jsファイルに`development`を指定を指定した場合は、`npm run build`コマンドを入力すると、`src`フォルダーに配置したJSファイルがコンパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

![](https://ics.media/entry/12140/images/170704_webpack_step7.png)

webpack.config.jsファイルに`production`を指定を指定した場合は、`dist/main.js`ファイルの中身はムダなコメントが省略され、ファイル容量が最小化されていることが確認できるでしょう。

ここの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-optimize）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-optimize)

### webpackでローカルサーバーを起動し、変更時にブラウザをリロードする

毎回ビルドコマンドをコマンドラインで打ち込むのは効率的でありません。ファイルの変更を検知し（watchともいいます）、自動的にビルドコマンドを実行し、ブラウザをリロードする・・・といった手順を自動化できます。類似の技術として「lite-server」や「BrowserSync」といったものがありますが、それに近いものだと考えていいでしょう。

![](https://ics.media/entry/12140/images/170704_webpack-dev-server.gif)

▲webpack-dev-serverの実行例。JavaScriptを編集すると、即座にブラウザが結果を反映する。ローカルのウェブサーバーとしても利用できる。

「webpack-dev-server」はとても便利な機能です。わずかな設定でできるので構築してみましょう。

#### ビルド時間の短縮に効果的でもある

webpackは初回ビルドと二度目以降のビルドでは、かかる時間が変わります。**二度目以降のビルドは、差分ビルドとして時間が大幅に短縮されます**。そのため毎回、webpackのビルドコマンドを使うのは、ビルド時間が余計にかかり時間のムダです。**ビルド短縮のため、webpack-dev-serverもしくは後述のwatch機能は必ず利用しましょう**。

#### npmモジュールのインストール

webpack関連モジュールとwebpack-dev-serverモジュールをインストールしましょう。

```
npm i -D webpack webpack-cli webpack-dev-server
```

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドとして`"start": "webpack serve"`を記述しておくのがポイントです。

▼package.jsonファイル

```
{
  "scripts": {
    "build": "webpack",
    "start": "webpack serve"
  },
  "devDependencies": {
    "webpack": "^5.99.8",
    "webpack-cli": "^6.0.1",
    "webpack-dev-server": "^5.2.1"
  },
  "private": true
}
```

#### webpackの設定ファイル

webpackの設定ファイルには次のように記述します。`devServer`にルートフォルダーを設定します。`open: true`を指定しておくと、自動的にブラウザが立ち上がります。

▼webpack.config.jsファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    static: "dist",
    open: true
  }
};
```

以上で設定は完了です。`npm run start`コマンドを入力しましょう。もしくは、`npx webpack serve`コマンドでも起動できます。自動的にブラウザが起動しローカルホストで表示されます。ファイル保存時にブラウザが自動的にリロードするので、**コーディング作業が楽になるでしょう**。

ここの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-webpack-dev-server）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-webpack-dev-server)

### ファイル変更時に差分ビルドを。ウォッチを利用する

webpack-dev-serverはとても便利ですが、ブラウザで確認する必要がないときは機能が多すぎて余分に思うかもしれません。JavaScriptをビルドしたいだけであれば、watch機能を利用するがいいでしょう。watch機能を利用するにはコマンドラインの引数に「–watch」を追加するだけです。

```
npx webpack --watch
```

もしくは、`package.json`ファイルの`scripts`は自前のビルドコマンドとして`"start": "webpack --watch"`を記述しておくのもいいでしょう。実行コマンドは`npm run watch`となります。

▼package.jsonファイル

```
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch"
  },
  "devDependencies": {
    "webpack": "^5.99.8",
    "webpack-cli": "^6.0.1"
  }
}
```

先述の通り、**buildするよりもwatchを使ったほうが差分ビルドで高速になるの**で、積極的にwatchを利用するようにしましょう。

### タスクランナーとの使い分け

webpackはこうした性質上、タスクランナーである[Gulp](https://gulpjs.com/)や[Grunt](https://gruntjs.com/)の代わりとして紹介されることがしばしばありました。Googleトレンドで見ても、webpackは人気です。

![webpackとgulpとgruntの人気経過](https://ics.media/entry/12140/images/170704_webpack_trend.png)

▲ [2015年4月~2018年3月のGoogleトレンド調査(カテゴリー：コンピュータ)](https://trends.google.co.jp/trends/explore?cat=5&date=2015-04-01%202018-03-01&q=webpack,gulp,grunt)

**タスクランナーでできることの多くはwebpackでも可能**です。しかし、プロジェクトによってはタスクランナーGulp、Gruntの資産があり、webpackを部分的に採用したいケースもあるでしょう。また、webpackは「CSSや画像を含むあらゆるアセットファイルをJavaScriptとして出力する」ことが基本的な使い方となっているため、CSSや画像をそのまま扱いたい時はタスクランナーが必要になります。

![](https://ics.media/entry/12140/images/images/170704_webpack_npmtrends.png)

▲ [npm trends](https://npmtrends.com/grunt-vs-gulp-vs-parcel-vs-vite-vs-webpack)でもwebpackが優勢

### 他のモジュールバンドラーとの性能比較

#### 性能面での比較

モジュールバンドラーとして知られているのはwebpackだけではありません。他にも類似のツールがあるので、性能面で違いはあるのかを検証しました。有名どころのnpm modulesを3つ利用しJavaScriptをバンドルする形での比較検証です。利用方法の制約から各ツールを完全に同一条件で比較できたわけではないので、「この技術を使った場合、こういう書き方をするのでこのぐらいの結果になる」という参考値としてとらえてください。

![](https://ics.media/entry/12140/images/170704_webpack_comparison_tools.png)

-   rollup : 0.56
-   webpack@4 : 4.1
-   webpack@3 : 3.11
-   fuse-box : 3.1
-   browserify : 16.1
-   parcel-bundler : 1.6

容量に関しては、webpackとrollupがもっとも小さくなりました。webpackはES ModulesをサポートしておりTree Shaking（未使用のモジュールを省いてバンドルする機能）や、モジュールの連結機能（可能な場合は複数のモジュールを1つに連結するconcatenateModulesオプション）を搭載していることが効果的だったようです。

![](https://ics.media/entry/12140/images/170704_webpack_comparison_time.png)

ビルド時間に関してはwebpack 4（developモード）がもっとも高速でした。[最新版webpackのリリース](https://medium.com/webpack/webpack-4-released-today-6cdb994702d4)で「Build times decreased from 60 to 98%!!（意訳：ビルド時間は60％から98％に減少）」と紹介されているように、従来のwebpack 3よりも高速化したことが確認できました。

![](https://ics.media/entry/12140/images/170704_webpack_comparison_size.png)

検証の条件・詳細とソースコードはGitHubで公開しています（「[ベンチマークのソースコード](https://github.com/ics-creative/180308_js_bundler_benchmark)」）。

**ビルド時間の短さや成果物の容量から判断しても、webpackは他のツールよりも全般的に高性能である**といえそうです。もちろん、各々のツールには解決しようとしている課題が異なるので特性や使い方に違いがあります。さらに、性能は検証の条件で差がでるでしょうから、採用の前には皆さんのプロジェクトや環境で目的が合致しているか、性能に問題がないか試験されることをオススメします。

#### トレンドの比較

かつては[Browserify](https://browserify.org/)や[RequireJS](https://requirejs.org/)といったツールもありました。npm trendsで調べたところ、webpackの利用が右肩上がりで他を圧倒していることがわかります。

![](https://ics.media/entry/12140/images/170704_webpack_trend_npm.png)

▲ [各種バンドルツールのトレンド推移 | npm trends](https://npmtrends.com/browserify-vs-fuse-box-vs-parcel-bundler-vs-requirejs-vs-rollup-vs-webpack)

BrowserifyはCommonJS仕様がベースで（`module.exports`や`require()`のような独自に定義された変数やメソッドを使う仕様）、Tree Shakingが使えないという点で旧世代のツールです。**枯れた技術としてはRequireJSやBrowserifyの利点はありますが、標準仕様のES Modulesをネイティブで利用できるwebpackのほうが将来性がある**といえそうです。

webpackの他には、Parcelというツールがあります。webpackに比べて設定が少ないことが特徴です。本サイトでも解説記事をたくさん書いていますので、あわせてご覧ください。

-   [Parcel入門 - Sassの変換](https://ics.media/entry/19580/)
-   [Parcel入門 - TypeScriptのビルド](https://ics.media/entry/190325/)
-   [Parcel入門 - ES6以上のJSのトランスパイル](https://ics.media/entry/190405/)

他にもViteが注目されています。ビルド時間が少ないことが特徴です。

-   [Viteで始めるモダンで高速な開発環境構築](https://ics.media/entry/210708/)

### まとめ

大規模なJavaScriptの開発にはモジュールシステムの導入は必須。**webpackはJavaScriptのモジュールを扱いやすくするのはもちろん、他のアセットファイルの取り扱いにも長けているという便利な技術**です。実際のJavaScript開発ではBabelやTypeScriptを利用することがほとんどでしょう。

続編記事「[webpack + BabelでES2015+ビルド環境の構築](https://ics.media/entry/16028/)」と「[webpack + TypeScriptの環境構築](https://ics.media/entry/16329/)」で使い方を説明してますので、あわせてご覧ください。

### 連載一覧

-   導入編
    -   [最新版で学ぶwebpack入門](https://ics.media/entry/12140/)（本記事）
-   ECMAScript 2015+編
    -   [webpack + BabelでES2021ビルド環境の構築](https://ics.media/entry/16028/)
    -   [webpack + TypeScriptの環境構築](https://ics.media/entry/16329/)
-   スタイルシート編
    -   [スタイルシート(CSSやSass)を取り込む方法](https://ics.media/entry/17376/)
    -   [Bootstrapをバンドルする方法](https://ics.media/entry/17749/)