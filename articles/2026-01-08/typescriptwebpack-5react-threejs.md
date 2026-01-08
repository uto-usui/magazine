---
title: "最新版TypeScript+webpack 5の環境構築まとめ(React, Three.jsのサンプル付き)"
source: "https://ics.media/entry/16329/"
publishedDate: "2017-08-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

[TypeScript](https://www.typescriptlang.org/)はMicrosoftが開発するプログラミング言語です。JavaScriptのスーパーセットという位置づけで、静的型付けなど強力な言語機能を備えています。TypeScriptは高度なウェブアプリケーションの開発で使われることが多く、ほとんどのフロントエンドエンジニアが使っているといっても過言ではありません。

![](https://ics.media/entry/16329/images/170808_typescript_official_website.png)

▲TypeScriptの公式サイト

TypeScriptはコンパイラによってJavaScriptのコードが得られますが、TypeScriptのコンパイラにはECMAScript Modules（ES Modules = `import`や`export`文のこと）をまとめる機能が提供されていません。そのため、ES ModulesのJSファイルをまとめるモジュールバンドラー（例：webpack、Rollup等）をTypeScriptと合わせて使うのが一般的です。

![](https://ics.media/entry/16329/images/170704_webpack_ts.png)

この記事では、TypeScriptとwebpackの組み合わせた環境構築の方法を説明します。ライブラリごとに設定項目の違いがあるので、例示しながら説明しています。

#### 本記事で解説していること

-   [webpack + TypeScriptの最小構成](#webpack-ts)
-   [webpack + TypeScript + Three.jsの最小構成](#webpack-ts-three)
-   [webpack + TypeScript + Reactの最小構成](#webpack-ts-react)
-   [webpack + TypeScript + 画像バンドルの最小構成](#webpack-ts-urlloader)

※webpackの基本的な使い方は前回の記事「[最新版で学ぶwebpack入門](https://ics.media/entry/12140/)」を参照ください。

### webpack+TypeScriptの最小構成

webpackとTypeScriptを最小構成として作っていきましょう。初回で解説したように、[Node.js](https://nodejs.org/en/download)を事前にインストールしておいてください。

#### npmモジュールのインストール

「webpack」や「webpack-cli」と「typescript」など必要なモジュールをインストールしましょう。TypeScriptをwebpackで処理するために「ts-loader」をを利用します。

```
npm i -D webpack webpack-cli typescript ts-loader
```

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドを記述しておきます。`scripts`と`devDependencies`以外の情報は省略しています。

▼`package.json`ファイル

```
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack -w"
  },
  "devDependencies": {
    "ts-loader": "^9.5.2",
    "typescript": "^5.8.3",
    "webpack": "^5.99.8",
    "webpack-cli": "^6.0.1"
  },
  "private": true
}
```

#### TypeScriptの設定ファイル： tsconfig.json

次にTypeScriptの設定ファイルを用意しましょう。`tsconfig.json`というテキストファイルをプロジェクトのルートに作成し、次の内容を記述します。ソースマップを有効にすること、ES Modulesのまま出力することを指定しています。

▼`tsconfig.json`ファイル

```
{
  "compilerOptions": {
    // ソースマップを有効化
    "sourceMap": true,

    // TSのモジュールはES Modulesとして出力
    "module": "ES2015",
    // 厳密モードとして設定
    "strict": true
  }
}
```

とくに`module`に`ES2015`を指定するのが重要です。これを指定しないと、TypeScriptコードの`import`文と`export`文がコンパイラによってCommonJSとして変換されるため、webpackによるツリーシェイキング（Tree Shaking = 未使用の`import`を静的解析によって振り落とす機能）のメリットが得られません。ツリーシェイキングの効果を得るためには明示的にES Modulesをコンパイルオプションで指定します。

#### webpackの設定ファイル：webpack.config.js

webpackの設定ファイルには次のように記述します。

-   `rules`の部分で拡張子`.ts`には`ts-loader`を指定します
-   `resolve.extensions`に拡張子`.ts`を登録することで、TypeScript内の`import`文で拡張子を書く手間が省けます
-   webpackの`import`文でコンパイルが通らないときは、`resolve.extensions`配列の指定が漏れているケースが多いです。しっかりと記述しましょう

▼`webpack.config.js`ファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/main.ts',

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js',
    ],
  },
};
```

以上で設定は完了です。`npm run build`コマンドを入力すると、`src`フォルダーに配置したTSファイルがコンパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

![](https://ics.media/entry/16329/images/170704_webpack_tutorial_typescript.png)

ここまでの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-typescript）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-typescript)
-   [サンプルのHTMLを開く(tutorial-typescript）](https://ics-creative.github.io/170330_webpack/tutorial-typescript/dist/)

### webpack+TypeScript+Three.jsの最小構成

![](https://ics.media/entry/16329/images/170704_webpack_site_three.png)

▲[Three.js公式サイト](https://threejs.org/)

[Three.js](https://threejs.org/)は3D表現の制作に役立つ人気のJSライブラリです。使い方は記事「[Three.js入門](https://ics.media/tutorial-three/)」で説明していますので参照ください。webpackとTypeScriptとThree.jsを最小構成として作っていきましょう。

#### npmモジュールのインストール

webpackとTypeScriptなど必要なモジュールをインストールしましょう。TypeScriptをwebpackで処理するためには「ts-loader」を利用します。

```
npm i -D webpack webpack-cli typescript ts-loader
```

実行用の「three」モジュールもインストールしましょう。なお、実行ファイルに含まれるモジュールとして利用したいので、コマンドオプション「-S」を指定します。

```
npm i -S three @types/three
```

※ヒント：TypeScriptの型定義ファイルは2019年〜2020年頃まで「three」に内包されていましたが、r125から[含まれなくなりました](https://x.com/threejs/status/1357643198353539073)（[開発者の事情](https://github.com/mrdoob/three.js/pull/21174)）。そのため、「@types/three」のインストールは必要です。

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドを記述しておきます。`scripts`と`devDependencies`以外の情報は省略しています。

▼`package.json`ファイル

```
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack -w"
  },
  "devDependencies": {
    "ts-loader": "^9.5.2",
    "typescript": "^5.8.3",
    "webpack": "^5.99.8",
    "webpack-cli": "^6.0.1"
  },
  "dependencies": {
    "@types/three": "^0.176.0",
    "three": "^0.176.0"
  },
  "private": true
}

```

#### TypeScriptの設定ファイル

次にTypeScriptの設定ファイルを用意しましょう。`tsconfig.json`というテキストファイルをプロジェクトのルートに作成し、次の内容を記述します。`lib`にはTypeScriptでのコンパイル時にECMAScriptの先端機能を使うことを明示的に指定します。これはThree.jsが内部的に最新のECMAScript 2015+を一部使っているためで、コンパイルを通すためです。

▼`tsconfig.json`ファイル

```
{
  "compilerOptions": {
    // TSのモジュールはES Modulesとして出力
    "module": "ES2015",
    // node_modules からライブラリを読み込む
    "moduleResolution": "bundler",
    // 厳密モード
    "strict": true,
    "lib": [
      "ES2023",
      "DOM"
    ]
  }
}
```

#### webpackの設定ファイル：webpack.config.js

webpackの設定ファイルには次のように記述します。`rules`の部分で`ts-loader`を指定。`resolve`に拡張子`.ts`や`.js`を指定しています。

▼`webpack.config.js`ファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.ts",
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
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [".ts", ".js"]
  }
};
```

以上で設定は完了です。`npm run build`コマンドを入力すると、`src`フォルダーに配置したTSファイルがコンパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

![](https://ics.media/entry/16329/images/170704_webpack_tutorial_typescript_three.png)

ここまでの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-typescript-three）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-typescript-three)
-   [サンプルのHTMLを開く(tutorial-typescript-three）](https://ics-creative.github.io/170330_webpack/tutorial-typescript-three/dist/)

Three.jsのサンプルの実行結果は次となります。

![](https://ics.media/entry/16329/images/170704_webpack_three.png)

### webpack+TypeScript+Reactの最小構成

![](https://ics.media/entry/16329/images/170704_webpack_site_react_230317.png)

▲[React公式サイト](https://react.dev/)

[React](https://react.dev/)はウェブアプリケーションの開発に役立つ人気のJSライブラリです。ReactではJSXと言われる独特の記法を使えるようにしなければなりません。webpackとTypeScriptで最小構成として作っていきましょう。

#### npmモジュールのインストール

webpackとTypeScriptなど必要なモジュールをインストールしましょう。TypeScriptをwebpackで処理するためには「ts-loader」を利用します。

```
npm i -D webpack webpack-cli typescript ts-loader
```

実行用の「react」「react-dom」モジュールもインストールしましょう。型定義ファイルも欲しいので「@types/react」「@types/react-dom」も指定します。なお、実行ファイルに含まれるモジュールとして利用したいので、コマンドオプション「-S」を指定します。

```
npm i -S react react-dom @types/react @types/react-dom
```

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドを記述しておきます。`scripts`と`devDependencies`以外の情報は省略しています。

▼`package.json`ファイル

```
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack -w"
  },
  "devDependencies": {
    "ts-loader": "^9.5.2",
    "typescript": "^5.8.3",
    "webpack": "^5.99.8",
    "webpack-cli": "^6.0.1"
  },
  "dependencies": {
    "@types/react": "^19.1.3",
    "@types/react-dom": "^19.1.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "private": true
}
```

#### TypeScriptの設定ファイル： tsconfig.json

次にTypeScriptの設定ファイルを用意しましょう。`tsconfig.json`というテキストファイルをプロジェクトのルートに作成し、次の内容を記述します。`jsx`オプションには`react-jsx`を指定するのがポイントです。これによって、**JSXと呼ばれるReact特有のシンタックス（JavaScriptの中にDOM要素を記述する方法）を解釈できるようになります**。

▼`tsconfig.json`ファイル

```
{
  "compilerOptions": {
    // 厳密モードとして設定
    "strict": true,
    // ソースマップを有効化
    "sourceMap": true,
    // TSのモジュールはES Modulesとして出力
    "module": "ES2015",
    // JSXの書式を有効に設定
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "lib": [
      "ES2023",
      "DOM"
    ]
  }
}
```

#### webpackの設定ファイル：webpack.config.js

webpackの設定ファイルには次のように記述します。`rules`や`resolve`の部分で拡張子`.tsx`を指定するのが重要です。

▼`webpack.config.js`ファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/main.tsx",
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
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
      }
    ]
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
};
```

以上で設定は完了です。`npm run build`コマンドを入力すると、`src`フォルダーに配置したTSXファイルがコンパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

![](https://ics.media/entry/16329/images/170704_webpack_tutorial_typescript_react.png)

ここまでの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-typescript-react）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-typescript-react)
-   [サンプルのHTMLを開く(tutorial-typescript-react）](https://ics-creative.github.io/170330_webpack/tutorial-typescript-react/dist/)

Reactのサンプルの実行結果は次となります。

![](https://ics.media/entry/16329/images/170704_webpack_react.png)

### このほかにもサンプルを用意してます

このほかにも、さまざまなJavaScriptライブラリのサンプルを用意してます。ここまで記事を読み進めて頂いた方であれば、次のリポジトリのソースコードを見れば簡単に導入できるはずです。

-   [Babylon.jsの導入方法（TypeScript向け）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-typescript-babylonjs)
-   [GSAPの導入方法（TypeScript向け）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-typescript-gsap)
-   [Pixi.jsの導入方法（TypeScript向け）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-typescript-pixijs)

### webpack+TypeScript+画像バンドルの最小構成

webpackは画像を取り込めることが1つの利点です。webpack 5ではデフォルトで、画像はBase64文字列としてJavaScriptにバンドルできます。しかし、TypeScriptで扱おうとすると工夫が必要です。

#### npmモジュールのインストール

webpackとTypeScriptなど必要なモジュールをインストールしましょう。TypeScriptをwebpackで処理するためには「ts-loader」を利用します。

```
npm i -D webpack webpack-cli typescript ts-loader
```

これをインストールすると、`package.json`ファイルは次の内容になります。`scripts`は自前のビルドコマンドを記述しておきます。`scripts`と`devDependencies`以外の情報は省略しています。

▼`package.json`ファイル

```
{
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "ts-loader": "^9.5.2",
    "typescript": "^5.8.3",
    "webpack": "^5.99.8",
    "webpack-cli": "^6.0.1"
  },
  "private": true
}
```

#### TypeScriptの設定ファイル

次にTypeScriptの設定ファイルを用意しましょう。特記するような注意点はありません。

▼`tsconfig.json`ファイル

```
{
  "compilerOptions": {
    "sourceMap": true,
    // TSのモジュールはES Modulesとして出力
    "module": "ES2015",
    // これの設定も必要 デフォルトインポートの有効化
    "allowSyntheticDefaultImports": true
  }
}
```

#### webpackの設定ファイル

webpackの設定ファイルには次のように記述します。画像ファイルの箇所で`type: "asset/inline"`を指定します。`type`プロパティーはwebpack 5から搭載された新機能で従来の`url-loader`と似た機能が提供されています。

▼`webpack.config.js`ファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
        // 画像をBase64として取り込む
        type: "asset/inline",
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [".ts", ".js"]
  },
};
```

次に定義ファイルを用意します。srcフォルダーに格納しておけば、自動的に型定義が認識されます。

▼ `src/definitions.d.ts` ファイル

```
declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.gif' {
  const value: any;
  export = value;
}
```

TypeScriptからは次のように利用します。

▼ `src/definitions.d.ts` ファイル

```
// import文を解決する
import myImage from "./images/bg.jpg";

// img要素を生成
const img = document.createElement("img");

// Base64の画像を代入
img.src = myImage;

// 画面に表示する
document.body.appendChild(img);
```

以上で設定は完了です。`npm run build`コマンドを入力すると、`src`フォルダーに配置したtsファイルがコンパイルされ、`dist`フォルダーに`main.js`ファイルが出力されます。

ここまでの手順をサンプルファイルとしてGitHubで公開していますので、参考ください。

-   [サンプルのソースファイル（tutorial-typescript-urlloader）](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-typescript-urlloader)
-   [サンプルのHTMLを開く(tutorial-typescript-urlloader）](https://ics-creative.github.io/170330_webpack/tutorial-typescript-urlloader/dist/)

### 最後に

弊社ではTypeScriptを2013年から導入し、多くのプロジェクトで活用してきました。「この言語には将来性がある」「もっと広く使われるはず」と考え、2013年に記事「[HTML5デモを作って分かったCreateJSとTypeScriptでの効率的な開発手法](https://ics.media/entry/132/)」でTypeScriptの利点を紹介しました。

当時はそれでもTypeScriptに懐疑的な意見をもつフロントエンドエンジニアも多くいましたが、記事「[人気上昇中のJavaScriptライブラリを調べてみた【2016年版】 - Build Insider](https://www.buildinsider.net/web/popularjslib/2016)」あたりから状況は変わり、今ではaltJSの中ではTypeScriptの人気が飛び抜け、他をさらに引き離し続けています。

ECMAScript最新仕様のJavaScriptがブラウザで使えるようになってきたとはいえ、静的型付けのあるTypeScriptは魅力的です。コンパイル時の型チェックなど開発の安全性があったり、WebStormをはじめとする開発ツールのサポートの充実（コードヒントやコード補完、import文の追加/整理）によって、さらに便利になっています。また、AIエージェントによる支援でも、型情報が存在するとより高精度にAIが機能します。

本記事では、webpackとTypeScriptの連携について最小構成で説明しました。現場ではJavaScriptの圧縮やソースマップ、ローカルサーバーの起動（[webpack-dev-server](https://github.com/webpack/webpack-dev-server)）なども合わせて使うのが一般的です。連載の初回「[最新版で学ぶwebpack入門](https://ics.media/entry/12140/)」で解説してますので、あわせて参照くださいませ。

### 連載一覧

-   導入編
    -   [最新版で学ぶwebpack入門](https://ics.media/entry/12140/)
-   ECMAScript 2015+編
    -   [webpack + BabelでES2023ビルド環境の構築](https://ics.media/entry/16028/)
    -   [webpack + TypeScriptの環境構築](https://ics.media/entry/16329/)（本記事）
-   スタイルシート編
    -   [スタイルシート(CSSやSass)を取り込む方法](https://ics.media/entry/17376/)
    -   [Bootstrapをバンドルする方法](https://ics.media/entry/17749/)