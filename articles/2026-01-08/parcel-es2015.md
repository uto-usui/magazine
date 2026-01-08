---
title: "Parcel入門 - ES2015+の導入方法"
source: "https://ics.media/entry/190405/"
publishedDate: "2019-04-17"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

モダンなフロントエンドの現場では、ES2015以降のJavaScriptの構文を使うことがほとんどです。たとえば次に示すコードでは、ES2015で導入されたアロー関数やES Modulesを使っています。

▼ index.js

```
import { myFunction } from "./myFunction.js";
const todayWeather = myFunction(14);
document
  .querySelector("#weather")
  .textContent
  = todayWeather;
```

▼ myFunction.js

```
export const myFunction = temperature => {
  return `岡山県の気温は${temperature}度です`;
};
```

ES2015以降の構文はブラウザーによっては対応していないこともあるため、BabelでES5相当のコードに変換（トランスパイル）したり、webpackでモジュールをバンドル（複数のファイルを1つにまとめる）したりします。

しかし、それらの環境準備には設定ファイルが必要で学習コストは高めです。**「モダンなビルド環境を準備したいだけなのに、なぜツールの設定に時間をとられるのか？」「環境構築に時間をかけたくない」と思っている人も多い**のではないでしょうか？

「[Parcelパーセル](https://parceljs.org/)」というツールを使うと、**独自の設定ファイルを使うことなくBabelのトランスパイルやES Modulesバンドル環境が3ステップで作れます**。

▼ Babel、ES ModulesをParcelで自動ビルドしている様子

### 完成サンプル

本記事を通して作成するサンプルです。文字列を表示するだけのシンプルなものです。

![本記事を通して作成するサンプル](https://ics.media/entry/190405/images/images/190405_parcel_babel_capture.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/181220_parcel/parcel-babel/dist/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/181220_parcel/tree/main/parcel-babel)

※本記事はParcel 2.4で解説しています。

ソースファイルの構成は次のようになっています。文字列を出力するプログラムは`index.js`と`myFunction.js`という2つのJavaScriptファイルで記述されています。`myFunction.js`ではアロー関数（`() => {}`）が使われ、ESモジュールとしてエキスポートされています。

▼ index.js（メイン）

```
// myFunction.jsをインポートする
import { myFunction } from "./myFunction.js";
// 今日の天気用文字列を生成する
const todayWeather = myFunction(14);
// #weather要素のテキストとして今日の天気を設定する
document
  .querySelector("#weather")
  .textContent
  = todayWeather;
```

▼ myFunction.js

```
/**
 * 気温の数値を受け取って文字列を返す関数
 */
export const myFunction = temperature => {
  return `岡山県の気温は${temperature}度です`;
};
```

このサンプルコードをParcelでビルドします。

### 3ステップでできるBabel・ES Moduleのビルド環境

Parcelによるビルド環境は3ステップでできます。

なお、Parcelを使うにはNode.jsが必要です。手元のパソコンにインストールされていない場合は、Node.jsを[公式サイト](https://nodejs.org/en/download)からインストールしておいてください。

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

以上でParcelの環境設定は終了です。Parcelのための設定ファイルを作成する必要はないことに注目してください。

環境構築後のフォルダー構成は、次のスクリーンショットのようになります。

![環境構築後のフォルダー構成](https://ics.media/entry/190405/images/images/190405_parcel_babel_finder.png)

### HTMLファイルでメインのJavaScriptを読み込む

ビルド対象のソースフォルダー構成は次のとおりです。

```
myproject
　├ src
　│　　├ scripts
　│　　│ 　├ index.js
　│　　│ 　└ myFunction.js
　│　　└ index.html
（中略）
```

HTMLコードの`script`タグにて`index.js`を読み込みます。

▼ index.html

```
<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- ★index.jsの読み込み -->
  <script src="scripts/index.js" type="module"></script>
</head>
<body>
<main>
  <p id="weather"></p>
</main>
</body>
```

### ローカルサーバーの起動

Parcelによるビルド環境構築が完了したので、ローカルサーバーの起動について解説します。

ローカルサーバーとJavaScriptファイルのビルドを行うには次のコマンドを使います。`--open`は省略可能ですが、付与しておくとブラウザーが自動で開きます。

▼ コマンド

```
npx parcel src/index.html --open
```

※ `src/index.html`の箇所はフォルダー構成に応じて変更ください。

### 実行の様子

`parcel`コマンドにより、ESモジュールを使ったJavaScriptのプログラムを実行している様子を動画にしました。

▼ サンプルコードをParcelで自動ビルドしている様子

ESモジュールのバンドルの他にも、モダンなビルド環境が整っていることがわかります。いくつか紹介しましょう。

#### ファイルの編集と同時にリロードされる（ホットリロード）

Parcelによる開発サーバーの起動中は、ファイルを編集すると自動的にプレビューしているブラウザーがリロードされます。手動でビルドコマンドを再実行する必要はありません。

#### ソースマップが有効になる

Chromeの開発者ツールなどで確認すると、ソースのソースマップが正しく反映されていることがわかります。ソースマップを使うと、ビルド後のJavaScriptではなくビルド前のJavaScriptを調査できるので、デバッグに役立ちます。

▼ Google Chromeでソースマップを確認している様子

![Google Chromeでソースマップを確認している様子](https://ics.media/entry/190405/images/images/190405_parcel_babel_sourcemaps.jpg)

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

-   [ビルドタスクの例](https://github.com/ics-creative/181220_parcel/blob/main/parcel-babel/package.json#L5-L6)

### なぜBabelやES Modulesのビルド環境にParcelが必要なのか？

ES2015以降の構文やES Modulesは、IE11を除くモダンブラウザーでの対応が増えてきているので、なぜParcelが必要なのかと感じるかもしれません。

たしかにES2015だけを見れば、IE11を除くモダンブラウザーでの対応は増えました。しかし、JavaScriptはES2015以降もES2016、ES2017、ES2018、･･･そしてES2022へと進化を続けています。一斉にモダンブラウザーでES2022などの最新構文に対応するわけではないので、構文をクロスブラウザーで動作させるためにBabelが必要です。

さらに、モダンなビルド環境では次のような作業も求められます。webpackやGulp.jsでBabelのトランスパイルを組みわせつつこれらの作業を行うのですが、いずれも設定ファイルの知識が必要です。

-   各Alt以外の言語のコンパイル（Sassなど）
-   開発中のローカルサーバー起動
-   ポリフィルのバンドル
-   モジュールの遅延読み込み（`import()`メソッド）
-   使用しないモジュールを削除する（Tree Shaking）
-   出力ファイルの最適化

**Parcelでは設定ファイルを使う必要はありません**。1行のコマンドを実行するだけで、ビルド環境が整います。細かい設定やチューニングとなるとwebpackにカスマイズ性は劣るものの、**環境構築に時間をかけず、コンテンツの作り込みに時間をかけることができるのは大きなメリットです**。

### まとめ

**我々がかけるべき時間は環境構築ではなく、コンテンツの作り込みです**。

Parcelは独自設定ファイルがないため、学習コストが低いです。わずか3ステップでモダンなビルド環境が構築できるというのは時間短縮の観点で大きなメリットと言えるでしょう。

Parcelはまだまだ魅力がたくさんあります。次の記事で学ぶと、より理解が深まるでしょう。

-   [Parcel入門 - TypeScriptの導入方法](https://ics.media/entry/190325/)
-   [Parcel入門 - Sassの導入方法](https://ics.media/entry/19580/)