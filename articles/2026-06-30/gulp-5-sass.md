---
title: "絶対つまずかないGulp 5入門 - インストールとSassを使うまでの手順"
source: "https://ics.media/entry/3290/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2014-10-30"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブサイト制作には**煩雑な処理を自動化する「タスクランナー」や「ビルドシステム」**というツールがあります。この記事では、タスクランナー「Gulp.jsガルプ」の導入手順を解説します。

導入は簡単で、本記事の手順では5分程度でセットアップできます。Gulpはコマンドラインで使うのが一般的ですが**苦手な人でも安心して学べるよう、ビデオでも解説します**。

**この記事で学べること**

-   イマドキのGulpの導入手順
-   Gulp 5に対応した書き方
-   Sassサスの導入手順

Gulpや[Sass](https://sass-lang.com/)の導入や使い方にはいろんな方法がありますが、**この記事では現場で使われている方法を紹介**します。Gulpの入門記事は他のサイトにもありますが、対象バージョンが古くて使えなかったりします。**本記事は最新版に対応させているので、安心して読み進めてください**。

※この記事では、Node.js v24で動作検証をしています。

※Gulp 5が2024年3月にリリースされました。本記事は最新版のGulp 5で説明しています。以前のバージョンGulp 4でも本記事と互換性があります。

※SassにはDart Sass、node-sass、Ruby Sassと複数の種類がありました。現在は、Dart Sass（通称`sass`モジュール）が標準であり、この記事は`sass`モジュールで紹介しています。

### 作業を自動化できるタスクランナーとは？

ウェブ制作におけるさまざまな処理を**「タスク」**という単位で扱い、このタスクを自動化するツールのことを**「タスクランナー」**と呼びます。一般的にウェブ制作の現場では、Sassサスを編集すればコンパイルを実行し、画像を編集すれば画像を圧縮するというように**多くの手間がかかります**。

タスクランナーを使うとこのような**ウェブ制作での煩雑な処理がすべて自動で行われるため、開発の工数の短縮につながります**。また、一度定義したタスクやインストールしたプラグインを開発者間で共有でき、**チーム内で一定の品質を保った開発ができる**ようになります。

![タスクランナーのメリット](https://ics.media/entry/3290/images/8303dd84c586b4cf4e91dd3bde01d14e.png)

### Gulpのメリットは簡易な記述と高速な処理

タスクランナーはGulpだけでなく[Gruntグラント](https://gruntjs.com/)というツールもありました。どちらもNode.jsノード・ジェイエスをベースに作られたタスクランナーです。どちらが優れているというわけではありませんが、**GulpはGruntに比べていくつか使いやすい点があります**。

たとえば、GruntではJSONジェイソン形式で独特の記述方法であるのに対し、GulpはJavaScriptで記述可能です。また、Gruntでは基本的に同期処理であるためタスクは1つずつ実行されますが、Gulpでは基本的に**非同期処理**なのでタスクが高速に処理できます。

![gulp（ガルプ）のメリット](https://ics.media/entry/3290/images/9d8e13bc40c43501c909619f924e2399.png)

### Gulpの導入は5分でできる

Node.jsとGulpをインストールしましょう。コマンドライン（Windowsでは「コマンドプロンプト」、macOSでは「ターミナル」)を使う場面がありますが、コピペだけで簡単にインストールできます。Windows、macOS共通の方法で導入可能です。ページの最後に導入手順の動画も掲載してありますので、あわせてご参照ください。

#### 1\. Node.jsをインストール

Gulpを使うためにはNode.jsが必要なので、[公式サイト](https://nodejs.org/en/download)よりNode.jsのインストーラーをダウンロードします。ダウンロードページには「推奨版」と「最新版」の2種類がありますが、「推奨版」をダウンロードください。ダウンロードしたら手順にしたがってインストールします。

![Node.jsインストール画面](https://ics.media/entry/3290/images/de6b41c014a27c32c7348d5239cf9287.png)

#### 2\. コマンドラインを起動しよう

Windowsにはコマンドプロンプトがインストールされています。起動方法は、検索バーに`cmd`を入力すると「コマンドプロンプト」が出現するので、選択して起動します。

![](https://ics.media/entry/3290/images/210323_gulp_command_prompt.png)

macOSには「`ターミナル.app`」というソフトウェアがインストールされています。［アプリケーション］フォルダー→［ユーティリティ］フォルダーに移動し、［ターミナル］を起動します。

![ターミナル.appを起動](https://ics.media/entry/3290/images/160603_line_stamp_14.jpg)

コマンドラインを起動したら`node -v`と実行し、Nodeのバージョンが表示されていることを確認します。これでNode.jsのインストールは成功です。

![](https://ics.media/entry/3290/images/210323_gulp_terminal2.png)

※ WindowsにてNodeのバージョンが表示されていない場合は、コマンドプロンプトを再起動ください。

#### 3\. package.jsonファイルの作成

ウェブサイトのファイル一式が保存されるフォルダー（以下、プロジェクトフォルダーと呼びます）を任意の場所に作成し、コマンドラインでその場所に移動します。今回は、`myproject`というフォルダーを使う前提で解説します。あらかじめフォルダーを作成しておき、次のコマンドで移動します。

▼ Windowsでのフォルダーの移動のコマンド

```
cd C:\Users\★★★\myproject
```

▼ macOSでのフォルダーの移動のコマンド

```
cd /Users/★★★/myproject
```

`cd`とはチェンジ・ディレクトリーの略で、フォルダーの階層を移動するコマンドです。`cd`の後ろに半角スペースを入力ください。また、★★★の部分はOSのユーザー名を入力ください。完了したら、Enterキーを押します。

![](https://ics.media/entry/3290/images/be36616cee3825e2d4f219b54b09a36a.png)

次のコマンドを実行すると、設定情報の記述された`package.json`ファイルが生成されます。

```
npm init -y
```

`package.json`ファイルの中身は次のようになっています。

![Node.jsのpackage.jsonの中身](https://ics.media/entry/3290/images/141031_gulp_packagejson_capture.png)

#### 4\. Gulpのインストール

Gulpを実行するために、プロジェクトフォルダー内へGulp本体をインストールします。

```
npm install -D gulp
```

※ `package.json`ファイルを開くと、`devDependencies`というキーに、インストールしたプラグイン名とバージョンが記載されているのを見ることができます。

※ Gulpのインストールにはオプション指定として`--save-dev`、もしくは省略形の`-D`という指定をするのが一般的です。

以上の手順でGulpが使える状態になりました。

記事によっては`npm install -g gulp-cli`とグローバルにGulpを導入する手順を解説しているところもあります。[現在ではそれは少数派](https://x.com/clockmaker/status/898128361339342849)です。Gulpはグローバルではなく、ローカルだけにインストールするのがフロントエンド界隈では一般的です。環境差異で動作しないなどトラブルのもとになるので、グローバルにインストールしないほうが望ましいでしょう。

### Gulp導入手順のビデオ

WindowsとmacOSのそれぞれのインストール手順を録画しています。導入の手順でつまづくことがあれば、次の動画と見比べて手順に間違いがないか確認ください。インストールが成功している場合は読み飛ばして構いません。

#### WindowsでのGulp導入手順

Windowsでは、公式サイトからNode.jsをインストールした後、コマンドプロンプトを使用してGulpを導入します。

#### macOSでのGulp導入手順

macOSでは、公式サイトからNode.jsをインストールした後、ターミナルを使用してGulpを導入します。

### Sassコンパイルを通して学ぶタスク処理の基本

ここからは、Sassファイルをコンパイルする手順を解説します。SassとGulpの連携を通して、Gulpの理解を深めていきましょう。

次の動画はSassのコンパイル手順をまとめたものです。もしわからないことがあれば動画を見直してください。

※ 動画はGulp v3時代のものです。現在は本文のGulp 5向けコードを利用してください。

#### 解説の概略

`css`フォルダーに配置したSassファイル（SCSSファイル）を、CSSファイルに変換（コンパイル）してみましょう。Sassには二種類の記法があり、Sass記法とSCSS記法がありますが、この記事ではSCSS記法で紹介します。

`css/style.scss`ファイルを用意しましょう。

▼ 変換前のSCSSファイル（css/style.scss）

```
// ネストのテスト
div {
  p {
    font-weight: bold;
  }
}

// 変数のテスト
$fontColor: #525252;

h1 {
  color: $fontColor;
}
```

#### タスクの作成

必要なモジュールを`npm install -D`コマンドを使って、ローカルにインストールしましょう。SassをGulpでコンパイルするためには次の3つのモジュールをインストールします。

-   Gulp本体の[gulp](https://www.npmjs.com/package/gulp)モジュール
-   Sassコンパイラ（Dart Sass）の[sass](https://www.npmjs.com/package/sass)モジュール
-   SassモジュールとGulpモジュールを連携する[gulp-sass](https://www.npmjs.com/package/gulp-sass)モジュール

```
npm install -D gulp sass gulp-sass
```

![](https://ics.media/entry/3290/images/170823_gulp_npm_install.png)

タスクを作成するには、**プロジェクトファイル直下に`gulpfile.js`というファイルを作成する必要があります**。`gulpfile.js`ファイルでの処理は、JavaScriptで記述します。

![](https://ics.media/entry/3290/images/170823_gulp_macos_finder.png)

Sassのコンパイル処理は、`gulpfile.js`ファイルに下記のコードを記述します。

▼ gulpfile.jsファイル

```
// gulpプラグインの読み込み
const { src, dest } = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass")(require("sass"));

// style.scssをタスクを作成する
function defaultTask() {
  // style.scssファイルを取得
  return (
    src("css/style.scss")
      // Sassのコンパイルを実行
      .pipe(
        sass({
          style: "expanded"
        })
      )
      // cssフォルダー以下に保存
      .pipe(dest("css"))
  );
}

exports.default = defaultTask;
```

この記述の中で使われているGulpの処理を解説します。

-   `require('プラグイン名')` 使用するプラグインを読み込みます
-   `src('取得するファイル')` タスクの対象となるファイルを取得します。複数のファイルも指定できます
-   `pipe()` 1つひとつの処理をつなげます。たとえば前述のコードでは、`src()`で取得したSassファイルをコンパイルし、それを`dest()`で書き出しています。`pipe()`メソッドはいくらでもつなげることができるので、連続した複数の処理を実装できます
-   `dest('保存先フォルダー')` 処理を行ったファイルを指定の場所に保存します
-   `exports.default` `npx gulp`コマンドを実行したときに呼び出されるタスクを指定します

#### タスクの実行

作成したタスクを実行するには、コマンドラインで`npx gulp`と入力してEnterを押します。

```
npx gulp
```

※ `npx`はNode.jsに同梱されているコマンドです。

![](https://ics.media/entry/3290/images/170823_gulp_npx_execute.png)

タスクを実行すると、`css`フォルダーにコンパイルされたCSSファイルが書き出されます。

▼ 変換されたCSSファイル（css/style.css）

```
div p {
  font-weight: bold;
}

h1 {
  color: #525252;
}
```

![](https://ics.media/entry/3290/images/170823_gulp_sass_folder.png)

ちなみに`exports.default`以外の名前でタスクを出力した場合は、`npx gulp (タスク名)`で実行します。

#### オプションの指定

上記コードでは、`sass()`メソッドでコンパイル時のオプションを`{style: "expanded"}`と指定しています。

プラグインはオプション指定で細かく設定できます。どのようなオプションが設定できるかは、プラグインによって異なります。

※ Sassの出力スタイルは`expanded`の他に、全CSSコードを1行にする`compressed`があります。

解説したサンプルは、次のGitHubから確認できます。不安な方はダウンロードしてお試しください。

-   [Sassコンパイルタスクのソースコード](https://github.com/ics-creative/170727_gulp/tree/main/sass_task/myproject)

以上で、Gulpを使ったSassのコンパイルができました。

### watch機能を使えばファイルの更新後に自動で処理を実行できる

Sassファイルの更新頻度は少なくないため、Sassファイルを更新する度にタスクを手動で実行するのは面倒です。**ファイルの更新があったらそのタイミングでタスクを自動で実行できる`watch`機能**を使うと便利です。

![](https://ics.media/entry/3290/images/17027_gulp_sass_watch.png)

#### watch機能を使ってSassファイルを自動コンパイルしてみよう

「Sassファイルに変更があった場合に、自動的にCSSにコンパイルするタスク」を例に紹介します。

次の動画はSassファイルの自動コンパイル手順をまとめたものです。もしわからないことがあれば動画を見直してください。

※ 動画はGulp v3時代のものです。現在は本文のGulp 5向けコードを利用してください。

`watch`機能で使用するのが`watch()`メソッドで、「監視するファイル」に変更があった場合、設定された「処理」が実行されます。

-   `watch('監視するファイル', 処理)`

style.scssの更新があったら、style.scssをコンパイルするタスクは次のコードです。

▼ gulpfile.jsファイル

```
// gulpプラグインの読み込み
const { src, dest, watch } = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass")(require("sass"));

function compileStyles() {
  // style.scssファイルを取得
  return (
    src("css/style.scss")
      // Sassのコンパイルを実行
      .pipe(
        sass({
          style: "expanded",
        })
        // Sassのコンパイルエラーを表示
        // (これがないと自動的に止まってしまう)
        .on("error", sass.logError)
      )
      // cssフォルダー以下に保存
      .pipe(dest("css"))
  );
}

// style.scssの監視タスクを作成する
function defaultTask() {
  // ★ style.scssファイルを監視
  return watch("css/style.scss", compileStyles);
}

exports.default = defaultTask;
```

タスクを実行すると、Sassファイルの監視と自動コンパイルが始まります。自動コンパイルについては冒頭の動画を見ると挙動がわかりやすいでしょう。

```
npx gulp
```

ファイルの監視を終了する場合は、コマンドラインでCtrlとCキーを同時に押します。

解説したサンプルコードは、次のURLからも確認できます。

-   [watchタスクのソースコード](https://github.com/ics-creative/170727_gulp/tree/main/sass_watch_task/myproject)

#### コラム：task()メソッドを使う方法

以前は`task()`メソッドでタスクを定義する書き方がよく使われていました。現在も使えないわけではありませんが、本記事ではタスクごとに関数を定義し、`exports.default`で実行するタスクを指定する方法で紹介しています。

-   参考「[task() · gulp.js](https://gulpjs.com/docs/en/api/task/)」

### ViteとGulpを用途に応じて使い分けよう

Gulpの導入はこのような手順となります。今回紹介した基本的なことをおさえておけば、**開発目的に応じたタスクを柔軟に作成できます**。

現在のフロントエンド開発では、開発サーバーやビルド環境に[Vite](https://ics.media/entry/210708/)を使うことも一般的です。一方で、既存案件の保守ではGulpを扱う場面もあります。

今回はGulp入門の内容でしたが、続編記事「[最低限おさえておきたいタスクランナーの書き方まとめ (GruntとGulpの両方のコードを掲載)](https://ics.media/entry/9199/)」ではGulpを使いこなすためのTipsをまとめています。