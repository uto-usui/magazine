---
title: "JSDocコメントの有効活用。JavaScriptやTypeScriptのドキュメントを生成する方法"
source: "https://ics.media/entry/6819/"
publishedDate: "2015-05-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

記事「[JavaScriptでJSDocコメントを書くメリットとは](https://ics.media/entry/6789/)」でJSDocコメントの有用性について紹介しました。その中で「APIドキュメントの書き出し」をメリットの1つとして取り上げています。

APIドキュメントの利用用途として以下が挙げられます。

-   JSライブラリの使い方を参照しやすくするため、APIドキュメントとして公開したい
-   他の開発チームへモジュールの使い方を説明するために、APIドキュメントを用意したい
-   プロジェクトのJavaScriptコードを使って、形式的な納品物の成果物を作りたい

本記事ではAPIドキュメントの作成方法を解説します。

### サンプルの紹介

サンプルをGitHubに用意していますので完成系をご覧ください。サイドバーを使うことで関数や定数などのドキュメントをたどることができます。

-   [JavaScriptのドキュメントのサンプルを開く](https://ics-creative.github.io/230322_jsdoc_document/jsdoc/)
-   [TypeScriptのドキュメントのサンプルを開く](https://ics-creative.github.io/230322_jsdoc_document/typedoc/)
-   [ソースコードを確認する](https://github.com/ics-creative/230322_jsdoc_document)

### 利用するモジュール

JSDocの書き出し自体はNode.jsと以下のモジュールを使うことで実現できます。JavaScriptとTypeScriptでそれぞれ手順が異なるので両方を説明します。

-   JavaScriptの場合 : [jsdoc](https://www.npmjs.com/package/jsdoc)
-   TypeScriptの場合 : [typedoc](https://www.npmjs.com/package/typedoc)

### JavaScriptのドキュメントを作成する方法

コマンドラインツール（Macならターミナル、Windowsならコマンドプロンプト等）を使います。package.jsonファイルが存在しないようであれば、まずは以下のコマンドを入力し作成します。

```
npm init -y
```

次に、JSDocコメントをHTMLに書き出してくれるモジュールである[jsdoc](https://www.npmjs.com/package/jsdoc)をインストールします。

```
npm install jsdoc -D
```

package.jsonファイルにスクリプトを記載します。`-r`オプションを用いて、出力させたい対象のフォルダーを指定します。

```
{
  "private": true,
  "devDependencies": {
    "jsdoc": "^4.0.2"
  },
  "scripts": {
    "doc": "jsdoc -r src"
  }
}
```

続いて以下のコマンドを入力します。

```
npm run doc
```

出力先フォルダーにHTMLがずらっと格納されると成功です。デフォルトでは`out`フォルダーが出力先となっています。

![](https://ics.media/entry/6819/images/images/230322_jsdoc_folder.png)

書き出されたindex.htmlをブラウザ−で開くとこのように表示されます。各クラスのページを開くとパラメーターの説明部分などにスタイルが適応され読みやすくなっています。

![](https://ics.media/entry/6819/images/images/230322_jsdoc_1.png)

![](https://ics.media/entry/6819/images/images/230322_jsdoc_2.png)

出力先を変更したい場合は、`-d`オプションを指定します。

```
jsdoc -r src -d ../docs/jsdoc
```

そのほかのオプションは[公式ドキュメント](https://jsdoc.app/about-commandline.html)を参考しましょう。

### TypeScriptのドキュメントを作成する方法

package.jsonファイルが存在する前提で説明します。TypeScriptのJSDocコメントをHTMLに書き出してくれるモジュールである[typedoc](https://www.npmjs.com/package/typedoc)をインストールします。

```
npm install typedoc -D
```

package.jsonファイルにスクリプトを記載します。`--entryPointStrategy expand`オプションを用いて、出力させたい対象のフォルダーを指定します。`package.json`ファイルの`name`フィールドもTypeDocでは必要になるので、用意しておきます。

```
{
  "name": "example-tsdoc",
  "private": true,
  "devDependencies": {
    "typedoc": "^0.23.28"
  },
  "scripts": {
    "doc": "typedoc --entryPointStrategy expand ./src"
  }
}
```

TypeScriptで開発していれば必ず用意していると思いますが、TypeDocの生成には`tsconfig.json`ファイルも必要になります。ここでは適当な内容で用意しておきました。

```
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ESNext",
    "sourceMap": true,
    "strict": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

続いて以下のコマンドを入力します。

```
npm run doc
```

出力先フォルダーにHTMLがずらっと格納されると成功です。デフォルトでは`docs`フォルダーが出力先となっています。

![](https://ics.media/entry/6819/images/images/230322_typedoc_folder.png)

書き出されたindex.htmlをブラウザ−で開くとこのように表示されます。TypeScriptだと型情報が存在し、型推論も働くので、JavaScriptのJSDocに比べてドキュメントの質を向上させやすいです。

![](https://ics.media/entry/6819/images/images/230322_typedoc_1.png)

出力先を変更したい場合は、`--out`オプションを指定します。

```
typedoc --entryPointStrategy expand ./src --out ../docs/typedoc
```

そのほかのオプションは[公式ドキュメント](https://typedoc.org/guides/options/)を参考しましょう。

### 出力したドキュメントをPDFにする方法

出力したドキュメントをPDFにする方法をあわせて紹介します。APIドキュメントを納品物にしたい場合に活用できると思います。

![](https://ics.media/entry/6819/images/images/230322_typedoc_pdf.png)

ヘッドレスブラウザの[Puppeteer](https://pptr.dev/)を使うと、ローカルのHTMLファイルをPDFに変換できます。globモジュールで.htmlファイルを探索して、.htmlファイルをpuppeteerでひたすらPDFにします。

詳しくはサンプルにコードを載せているので利用ください。

-   [コードを確認する](https://github.com/ics-creative/230322_jsdoc_document/tree/main/tool-pdf)

PDFファイルは複数にわかれていますが、Adobe Acrobat等でマージすれば1ファイルになります。jsdocやTypeDocで生成したドキュメントはHTMLファイルとして用意されているものなので、PDFにして読みやすいものではないですが･･･。

### 最後に

ICSではオリジナルのJSライブラリを公開していますが、TypeScriptとTypeDocを使ってドキュメントを公開しています。活用例として参照ください。

-   [手軽にテキストシャッフル演出ができるJSライブラリ「shuffle-text」を公開](https://ics.media/entry/15498/)
-   [APIドキュメントのリンク](https://ics-ikeda.github.io/shuffle-text/docs/classes/default.html)

JSDocコメントを使うとAPIドキュメントとして生成できるので、普段からJSDocコメントを記載することを意識するといいでしょう。