---
title: "Parcel入門 - Sassの導入方法"
source: "https://ics.media/entry/19580/"
publishedDate: "2018-12-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブ開発ではSass、TypeScriptなどの言語のコンパイルや、出力ファイルの最適化、ローカルサーバーの起動などさまざまな作業が求められます。現在は、それらの作業を自動化する[webpack](https://ics.media/entry/12140/)や[Gulp.js](https://ics.media/entry/3290/)がよく使われています。

webpackには`webpack.config.js`、Gulp.jsには`gulpfile.js`という設定ファイルがそれぞれ必要で、両ツールともその使用方法を覚える学習コストがあります。

[Parcelパーセル](https://parceljs.org/)というツールを使うと、**webpackやGulp.jsのような独自の設定ファイルを使うことなく、各種言語のコンパイルやバンドルができるようになります**。バンドルとは、複数のファイルを1つにまとめることを指します。Parcelとは、設定ファイルが不要で高速なウェブアプリケーションのバンドルツール。次のようなことが可能です。

-   Sassのコンパイル
-   Autoprefixerによるベンダープレフィックスの自動付与
-   ソースマップの作成
-   モジュールのバンドル
-   モジュールのTreeShaking
-   TypeScriptのコンパイル
-   Babelのコンパイル
-   ビルドファイルのminify
-   ローカルサーバーの起動、自動リロード

本エントリーではParcelの入門編として次の内容を解説します。

-   Sassのコンパイル方法
-   ローカルサーバーの起動・自動リロード方法
-   納品ファイルの作成方法
-   webpackとの使い分け

### 本記事のサンプルファイル

GitHubにサンプルファイルを用意しているので、ダウンロードしてご利用ください。

-   [ソースコードを確認する](https://github.com/ics-creative/181220_parcel/tree/main/parcel-sass)
-   [ビルド結果を別ウインドウで開く](https://ics-creative.github.io/181220_parcel/parcel-sass/dist/index.html)

2022年4月時点のParcel 2.4でサンプルを用意しています。

### 環境準備

今回はプロジェクトフォルダー（ウェブサイトのファイル一式が保存されるフォルダー）として、`myproject`というフォルダーを使う前提で解説します。コマンドラインで`myproject`フォルダーに移動します（※1）。

▼ macOSでのフォルダーの移動のコマンド

```
cd /Users/★★★/myproject
```

▼ Windowsでのフォルダーの移動のコマンド

```
cd C:¥Users¥★★★¥myproject
```

以下のnpmコマンドで初期化します。

```
npm init -y
```

完了すると、`package.json`ファイルがプロジェクトフォルダー内に作られます。

![](https://ics.media/entry/19580/images/181220_parcel_package.png)

続いて、Parcelを次のコマンドでインストールします。

▼ コマンド

```
npm install -D parcel
```

以上でParcelの環境設定は終了です。Parcelのための設定ファイルを作成する必要はありません。

※`-y`や`-D`は、`npm`コマンドを扱う際の便利なショートカットです。

### Sassのコンパイル

`style.scss`というSassファイルのコンパイルを通して、Parcelの使い方を学びましょう。`src`フォルダーに`style.scss`というファイル名でテキストファイルを作成ください。

```
./
├── package.json
└── src
    └── style.scss
```

`style.scss`は次の内容とします。Sass特有の機能である「変数」や「ネスト」を使っています。

▼ src/style.scss

```
$redColor: #ea5b54;

.container {
  .box {
    background-color: $redColor;
  }
}
```

Sassファイルをコンパイルするには次のコマンドを使います。

▼ コマンド

```
npx parcel コンパイルしたいファイル名
```

`src/style.scss`をコンパイルするには次のとおりです。

▼ コマンド

```
npx parcel src/style.scss
```

プロジェクトフォルダー内に`dist`フォルダーが生成され、コンパイル後のCSSファイルが生成されているのがわかります。

```
./
├── dist
│   ├── style.css
│   └── style.css.map
├── node_modules
├── package.json
└── src
     └── style.scss
```

▼ `dist/style.css`ファイルの中身

```
.container .box {
  background-color: #ea5b54;
}
```

#### Sassファイルの更新は自動で反映される

Sassファイルを更新すると、Parcelは自動で再コンパイルを行い、`dist`フォルダーに出力します。

なお、ファイルの監視を終了する場合は、コマンドラインでCtrl+Cキーを同時に押します。

#### 不足しているモジュールは自動でインストールされる

Sassのコンパイルコマンドは、初回実行時はやや時間がかかります。Sassのコンパイルに必要なモジュールを、Parcelが自動でインストールしているためです。Parcelは必要なモジュールが`node_modules`フォルダーに存在しない場合、それをインストールしようとする仕組みがあります。開発者のモジュールインストールの負担を減らす便利な機能です。

`package.json`の見ると、モジュールがインストールされていることがわかります。

▼ package.json。`@parcel/transformer-sass`モジュールが`devDependencies`に追加されている

```
{
  // （抜粋）
  "devDependencies": {
    "@parcel/transformer-sass": "2.4.1",
    "parcel": "^2.4.1"
  }
}
```

#### 出力フォルダーを変更したい場合

初期設定ではコンパイル後のファイルは`dist`フォルダーに格納されます。出力フォルダーを変更するには、コマンドに`--dist-dir 出力したいフォルダー名`を設定します。たとえば、`public`フォルダーに格納するコードを紹介します。

▼ コマンド

```
npx parcel src/style.scss --dist-dir public
```

実行すると、`public`フォルダーにコンパイル後のCSSファイルが格納されます。

```
./
├── package.json
├── node_modules
├── public
│   ├── style.css
│   └── style.css.map
└── src
    ├── index.js
    └── style.scss
```

### ローカルサーバーの起動

これまで紹介したのはSassファイル単体をコンパイルする方法でした。現場の開発では、次のような開発手法を行いたいケースも多いでしょう。

-   コンパイルされたCSSファイルが、ウェブページにどのように反映されるかを確認したい
-   ローカルサーバーを起動したい
-   ファイルを更新したら確認中のウェブページを自動的に更新したい

Parcelにはそれらを実現する手法が備わっています。

#### メインの処理を行うJavaScriptファイル作成

まず、メインとなる処理を行うJavaScriptファイル「エントリーポイント」を作成します。今回は`index.js`というファイル名にします。ファイル構成は次のとおり。挙動をわかりやすくするため、前回の解説で用いた`dist`フォルダーや`public`フォルダーは手動で削除してあります。

```
./
├── package.json
├── node_modules
└── src
    ├── index.js
    └── style.scss
```

エントリーポイント内ではコンパイルやバンドルをしたいファイルを`import`宣言で読み込みます。今回の例で言えば`style.scss`ファイルです。

▼ src/index.js

```
import "./style.scss";
```

`import`の宣言は複数可能なので、CSS・SassファイルやTypeScriptファイルなど、バンドルしたいファイルを含められます。

#### メインのエントリーポイントをHTMLで読み込む

HTMLファイルを作成し、エントリーポイントを読み込みます。フォルダー構成は次のとおりです。

```
./
├── package.json
├── node_modules
└── src
    ├── index.html
    ├── index.js
    └── style.scss
```

HTMLファイルでは、作成したいウェブページのHTMLコードに加えてエントリーポイントの読み込みを追加します。次のコードの★部分です。

▼ src/index.html

```
<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>サンプル</title>
  <!-- ★エントリーポイントの読み込み -->
  <script src="index.js" type="module"></script>
</head>
<body>
<div class="container">
  <div class="box">.box要素です</div>
</div>
</body>
</html>
```

#### ローカルサーバーを起動する

ローカルサーバーの起動とSassファイルのコンパイル・バンドルを行うには次のコマンドを使います。`--open`は省略可能ですが、付与しておくとブラウザーが自動で開きます。

▼ コマンド

```
npx parcel HTMLファイル名 --open
```

今回の例で言えば次のコマンドです。

▼ コマンド

```
npx parcel src/index.html --open
```

実行している様子は次のとおりです。編集したSassファイルが自動的にコンパイルされ、ウェブページに反映されているのがわかります。ソースマップにも対応しているので、デバッグも容易です。

Sassの単体コンパイルで説明した不足モジュールの自動インストール、出力フォルダー変更なども有効です。なお、ファイルの監視を終了する場合は、コマンドラインでCtrl+Cキーを同時に押します。

### AutoprefixerでCSSの古い記法に対応したい

開発の現場では、Sassと共にAutoprefixer（CSSのベンダープレフィックスや旧記法を自動付与するツール）を導入したいケースも多いでしょう。

次のCSSで考えてみます。

▼ CSS

```
main {
  display: flex;
  user-select: none;
}
```

`npx parcel src/index.html`を実行すると、出力されたCSSファイルにベンダープレフィックスが付与されていることがわかります。このことにより、幅広いブラウザでCSSの互換性を保つことができます。

▼ 変換後のCSS

```
main {
  -webkit-user-select: none;
  user-select: none;
  display: flex;
}
```

### 納品用にビルドファイルを生成する

納品用ファイルを作成するようなケースでは、以下のコマンドでビルドファイルを生成できます。minify（ファイル圧縮）された納品用ファイルが`dist`フォルダーに出力されます。

▼ コマンド

```
npx parcel build ビルドしたいファイル名
```

たとえば、前述のエントリーポイントを用いたファイルをビルドするには次のとおりです。

▼ コマンド

```
npx parcel build src/index.html
```

いくつかオプションがあるのであわせて覚えておくと便利です。

-   `--dist-dir 出力フォルダー名`：出力フォルダーを設定できます。デフォルトは`dist`です。
-   `--no-source-maps`：ソースマップを無効化できます。
-   `--public-url URL名`：CSSやJavaScriptのファイルに対するパスを設定可能です。デフォルトでは`<script src="/index.e5f6g7.js"></script>`のように`/`から始まるルートパスとなります。`--public-url ./`のように設定すれば相対パスで指定できます。

公式のドキュメントもあわせて参照ください。

-   [CLI - Parcel](https://parceljs.org/features/cli/)

GitHubにアップしているサンプルでは、次の設定を行っています。

-   ソースマップを無効化
-   CSSやJavaScriptのパスを相対パスに

今回のサンプルでは、npm-scripts（参考記事[npm-scriptsのタスク実行方法まとめ](https://ics.media/entry/12226/)）を使って`npm rum build`でビルドタスクが実行できるように設定しました。設定の参考にしていただければと思います。

-   [ビルドタスクの例](https://github.com/ics-creative/181220_parcel/blob/main/parcel-sass/package.json#L6)

### webpackとの使い分け

解説してきたように、Parcelには独自の設定ファイルがなく、コンパイル設定は使用している各ツールの設定ファイルに任せています。これにより**Parcelというバンドルツールへの依存度が小さくなり、将来的にParcelから別のバンドルツールへ移行するのもラクになると期待できます**。移り変わりの早いウェブ開発のツールにとっては大きなメリットと言えるでしょう。

ただ、**独自設定ファイルがないということは、バンドル過程がブラックボックス化してしまい凝ったカスタマイズが難しい**とも言えます。案件の性質によっては細かいところまでカスタマイズできるwebpackのほうが向いているケースも多いので、見極めが必要でしょう。

### まとめ

Parcelは独自設定ファイルがないため、学習コストが低いです。ただ単にSassコンパイルやローカルサーバーのための環境を作りたければ、わざわざwebpackやGulp.jsを使わずとも事足りる事が多いでしょう。

高度化・複雑化するウェブ開発の中で、こういった独自設定不要（ゼロコンフィグ）のツールが登場したのは開発者にとっては嬉しいことです。**面倒な作業はできるだけツールや機械に任せ、我々開発者はコンテンツの作り込みに時間をかけましょう**。