---
title: "Parcel入門 - TypeScriptの導入方法"
source: "https://ics.media/entry/190325/"
publishedDate: "2019-03-28"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

「[TypeScript](https://www.typescriptlang.org/)」とは、JavaScriptに「型」を指定できるオープンソースのプログラミング言語です。型によりプログラム実行前にエラーを見つけ出すことができるため、大規模なプロジェクトを安全に開発できます。Microsoft社製で、多くのフロントエンドエンジニアに採用されています。

TypeScriptのモダンなビルド環境を作るためには[webpack](https://ics.media/entry/16329/)や[Gulp.js](https://ics.media/entry/3290/)がよく使われていますが、設定ファイルが必要で学習コストは高めです。**「TypeScriptのビルド環境がほしいだけなのに、なぜツールの設定に時間をとられるのか？」「TypeScriptを始めるときに苦労したくない」と思っている人も多い**のではないでしょうか？

「[Parcelパーセル](https://parceljs.org/)」というツールを使うと、**独自の設定ファイルを使うことなくTypeScriptのモダンなビルド環境がわずか3ステップで作れます**。

▼ TypeScriptをParcelで自動コンパイルしている様子

### 完成サンプル

本記事を通して作成するサンプルです。文字列を表示するだけのシンプルなものです。

![本記事を通して作成するサンプル](https://ics.media/entry/190325/images/images/190325_parcel_ts_capture.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/181220_parcel/parcel-typescript/dist/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/181220_parcel/tree/main/parcel-typescript)

※本記事はParcel 2.4で解説しています。

ソースファイルの構成は次のようになっています。文字列を出力するプログラムは`index.ts`と`myFunction.ts`という2つのTypeScriptファイルで記述されています。`myFunction.ts`はESモジュールとしてエキスポートされています。

▼ index.ts（メイン）

```
// myFunction.tsをインポートする
import { myFunction } from "./myFunction";
// 今日の天気用文字列を生成する
const todayWeather = myFunction(27);
// #weather要素のテキストとして今日の天気を設定する
document.querySelector("#weather").textContent = todayWeather;
```

▼ myFunction.ts

```
/** 気温の数値を受け取って文字列を返す関数 */
export function myFunction(temperature: number): string {
  return `東京の気温は${temperature}度です`;
}
```

このサンプルのTypeScriptのコンパイルを通して、Parcelの使い方を解説します。

### 3ステップでできるTypeScriptのビルド環境構築

Parcelによるビルド環境は、3ステップでできます。

なお、TypeScriptやParcelを使うにはNode.jsが必要です。手元のパソコンにインストールされていない場合は、Node.jsを[公式サイト](https://nodejs.org/en/download)からインストールしておいてください。

#### STEP1. プロジェクトフォルダーに移動

今回はプロジェクトフォルダー（ウェブサイトのファイル一式が保存されるフォルダー）として、`myproject`というフォルダーを使う前提で解説します。コマンドラインで`myproject`フォルダーに移動します。

▼ macOSでのフォルダーの移動のコマンド

```
cd /Users/★★★/myproject
```

▼ Windowsでのフォルダーの移動のコマンド

```
cd C:¥Users¥★★★¥myproject
```

#### STEP2. プロジェクトの初期化

次のnpmコマンドでプロジェクトを初期化します。

```
npm init -y
```

※ `-y`はダイアログなしにプロジェクトを初期化するためのオプション

#### STEP3. Parcelのインストール

Parcelを次のコマンドでインストールします。

▼ コマンド

```
npm install -D parcel
```

※`-D`は`--save-dev`の省略形

以上でParcelの環境設定は終了です。Parcelのための設定ファイルを作成する必要はないこと、[TypeScriptのモジュール](https://www.npmjs.com/package/typescript)をインストールしていないことに注目してください。

環境構築後のフォルダー構成は、次のスクリーンショットのようになります。

![環境構築後のフォルダー構成](https://ics.media/entry/190325/images/190325_parcel_ts_finder.png)

### HTMLファイルでTypeScriptを読み込む

ビルド対象のソースフォルダー構成は次のとおりです。

```
myproject
　├ src
　│　　├ scripts
　│　　│ 　├ index.ts
　│　　│ 　└ myFunction.ts
　│　　└ index.html
（中略）
```

TypeScriptファイルの中身は記事冒頭で解説しました。TypeScriptファイルを読み込むHTMLのコードは次のとおりです。`script`タグにて`index.ts`を読み込みます。**読み込むファイルの拡張子が`.js`でなく`.ts`になっていることに注意してください**。

▼ index.html

```
<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- ★index.tsの読み込み -->
  <script src="scripts/index.ts" type="module"></script>
</head>
<body>
<main>
  <p id="weather"></p>
</main>
</body>
```

### ローカルサーバーの起動

Parcelによるビルド環境構築と、動作確認用のTypeScriptファイルができたので、ローカルサーバーの起動について解説します。

ローカルサーバーの起動とTypeScriptファイルのコンパイル・バンドルを行うには次のコマンドを使います。`--open`は省略可能ですが、付与しておくとブラウザーが自動で開きます。

▼ コマンド

```
npx parcel src/index.html --open
```

※ `src/index.html`の箇所はフォルダー構成に応じて変更ください。

### 実行の様子

`parcel`コマンドにより、ESモジュールを使ったTypeScriptのプログラムを実行している様子を動画にしました。

▼ TypeScriptをParcelで自動コンパイルしている様子

ESモジュールのバンドルの他にも、モダンなビルド環境が整っていることがわかります。いくつか紹介しましょう。

#### ファイルの編集と同時にリロードされる（ホットリロード）

Parcelによる開発サーバーの起動中は、ファイルを編集すると自動的にプレビューしているブラウザーがリロードされます。手動でコンパイルコマンドを再実行する必要はありません。

#### ソースマップが有効になる

Chromeの開発者ツールなどで確認すると、TypeScriptのソースマップが正しく反映されていることがわかります。ソースマップを使うと、コンパイル後のJavaScriptではなくコンパイル前のTypeScriptを調査できるので、デバッグに役立ちます。

▼ Google Chromeでソースマップを確認している様子

![](https://ics.media/entry/190325/images/images/190325_parcel_ts_sourcemaps.png)

#### `tsconfig.json`によるTypeScriptのカスタマイズも可能

TypeScriptを使う際、`null`チェックを厳しくしたり、暗黙の`any`を許容するなど、設定をカスタマイズするケースも多いでしょう。その場合は通常のTypeScriptのコンパイル手順と同じく`tsconfig.json`が使えます。

### ホスティングや納品用にビルドファイルを生成する

さて、ここまでは開発用ファイルの説明をしてきましたが、ホスティングしたり、クライアントにファイルを納品する際にはビルドファイルの生成が必要になります。

Parcelでは次のコマンドでビルドファイルを生成できます。minify（ファイル圧縮）された納品用ファイルが`dist`フォルダーに出力されます。

▼ コマンド

```
npx parcel build src/index.html
```

`build`コマンドにはいくつかオプションがあるのであわせて覚えておくと便利です。

-   `--dist-dir 出力フォルダー名`：出力フォルダーを設定できます。デフォルトは`dist`です。
-   `--no-source-maps`：ソースマップを無効化できます。
-   `--public-url URL名`：CSSやJavaScriptのファイルに対するパスを設定可能です。デフォルトでは`<script src="/index.e5f6g7.js"></script>`のように`/`から始まるルートパスですが、`--public-url ./`のように設定すれば相対パスで指定できます。

公式のドキュメントもあわせて参照ください。

-   [CLI - Parcel](https://parceljs.org/features/cli/)

今回のサンプルでは、npm-scripts（参考記事『[npm-scriptsのタスク実行方法まとめ](https://ics.media/entry/12226/)』）を使って`npm rum build`でビルドタスクが実行できるように設定しました。設定の参考にしていただければと思います。

-   [ビルドタスクの例](https://github.com/ics-creative/181220_parcel/blob/main/parcel-typescript/package.json#L5-L6)

### なぜTypeScriptのバンドルにParcelが必要なのか？

1ファイルのTypeScriptをコンパイルするには、[typescriptモジュール](https://www.npmjs.com/package/typescript)があれば可能です。たとえば`index.ts`というTypeScriptファイルをコンパイルするには次のコマンドを使います。

▼ 単一TypeScriptファイルのコンパイルコマンド

```
npx tsc index.ts
```

しかし、開発の現場でTypeScriptを使う際、単一のファイルのみを使うケースは稀です。多くの場合、ESモジュールを用いて処理ごとにファイルを分割し、再利用性の高い構成にします。

▼ ESモジュールによるファイル構成例

```
src
　　├ scripts
　　│　├ index.ts
　　│　├ page1
　　│　│　├ module1_1.ts
　　│　│　└ module1_2.ts
　　│　├ page2
　　│　│　├ module2_1.ts
　　│　│　└ module2_2.ts
（中略）
```

モジュールのバンドルにはwebpackのようなツールを使いますが、設定ファイルである`webpack.config.js`が必要です。

▼ TypeScriptをコンパイルする際の`webpack.config.js`設定例

```
module.exports = {
 mode: "development",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  }
};
```

また、モダンなビルド環境では、次のような作業も求められます。webpackやGulp.jsでこれらの作業を行うのですが、いずれも設定ファイルの知識が必要です。

-   TypeScript以外の言語のコンパイル（Sassなど）
-   開発中のローカルサーバー起動
-   ポリフィルのバンドル
-   モジュールの遅延読み込み（`import()`メソッド）
-   使用しないモジュールを削除する（Tree Shaking）
-   出力ファイルの最適化

**Parcelでは設定ファイルを使う必要はありません**。1行のコマンドを実行するだけで、TypeScriptのビルド環境が整います。細かい設定やチューニングとなるとwebpackにカスマイズ性は劣るものの、**環境構築に時間をかけず、コンテンツの作り込みに時間をかけることができるのは大きなメリットです**。

### まとめ

**我々がかけるべき時間は環境構築ではなく、コンテンツの作り込みです**。

Parcelは独自設定ファイルがないため、学習コストが低いです。TypeScriptの基本的なビルド環境を作るならば、わざわざwebpackやGulp.jsを使わずとも事足りる事が多いでしょう。

Parcelのような自動ビルド環境を駆使しながら時間を節約してコンテンツをどんどん作り出しましょう。

記事『[Parcel入門 - Sassの導入方法](https://ics.media/entry/19580/)』ではParcelを使ったSassのコンパイル方法やwebpackとの使い分け方法について解説しています。また、記事『[最新版TypeScript + webpackの環境構築まとめ](https://ics.media/entry/16329/)』ではwebpackによるビルド環境構築方法を解説しています。あわせて参照するとより理解が深まるでしょう。