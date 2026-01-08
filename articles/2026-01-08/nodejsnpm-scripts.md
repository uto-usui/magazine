---
title: "Node.jsユーザーなら押さえておきたいnpm-scriptsのタスク実行方法まとめ"
source: "https://ics.media/entry/12226/"
publishedDate: "2016-06-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブ制作の現場では作業の自動化を行うことが多いです。Node.jsインストール時に付属する[npm (Node Package Manager)](https://www.npmjs.com/)を使用すれば、タスク処理が実現できます。

npmとはNode.jsのモジュールを管理するためのツールであり、タスク処理にはnpmの機能の[npm-scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts)を使用します。本記事はnpm-scriptsを使ったタスク実行環境が構築できることを目標に解説します。

### そもそもnpm-scriptsとは何か？

npm-scriptsとは、**`package.json`ファイルに記述可能なシェルスクリプトのエイリアスです**。エイリアスとはコマンド名を別のコマンド名に置き換えることです。以下のnpm-scriptsは`Hello world!!`を表示させるコマンドのエイリアスを作成する例です。

▼package.jsonファイル

```
{
  "scripts": {
    "say": "echo 'Hello world!!'"
  }
}
```

※解説のために`package.json`ファイルの`scripts`フィールド以外の項目は省略しています。

上のように`package.json`ファイルに記述しておけば以下のコマンドでエイリアスを実行可能になります。これがnpm-scriptsです。

```
$ npm run say

> echo 'Hello world!!'

Hello world!!
```

※上記の例では`echo`コマンドを使用していますが、OS特有のコマンドを使用した場合、環境によって動作しない場合があります。UNIXのコマンドやWindowsのコマンドを使用する際は気をつけましょう。

### npm-scriptsの使い方

[Sass](https://sass-lang.com/)と[TypeScript](https://www.typescriptlang.org/)のビルドを例にnpm-scriptsの使い方をさらに詳しく解説します。

#### 1\. モジュールのインストール

まずは空のプロジェクトを作成します。`npm init`コマンドを実行すると`package.json`ファイルが作成されます。`-y`はオプションで、`package.json`ファイルの設定をデフォルト値で作成する指定です。

```
npm init -y
```

SassとTypeScriptのビルド用モジュールをそれぞれインストールします。プロジェクト単体で使用するモジュールとしてインストールしたいのでオプションに`--save-dev`(ショートカットは`-D`)を指定します。

```
npm i -D sass
npm i -D typescript
```

#### 2\. モジュールのコマンド実行

インストールが完了したので`sass`のコマンドを登録します。**`--save-dev`(もしくは`-D`)でインストールしたモジュールのコマンドは、グローバルなコマンドとして実行できません**。`package.json`ファイル内の`scripts`フィールドにコマンドを記載することで実行できるようになります。`package.json`ファイルの`scripts`フィールドに以下の内容を追記しましょう。

▼package.jsonファイル（一部抜粋）

```
{
  "scripts": {
    "sass:version": "sass --version"
  },
  "devDependencies": {
    "sass": "^1.62.0",
    "typescript": "^5.0.4"
  }
}
```

追加した`sass:version`コマンドを`npm run sass:version`と入力して実行してみます。npm-scriptsに記述したタスクは`npm run タスク名`と入力することで実行可能です。

```
$ npm run sass:version

> sass --version

1.62.0 compiled with dart2js 2.19.6
$
```

無事`sass`のバージョンが表示されました。このように**モジュールの機能はnpm-scriptsから使用可能**です。

#### コラム：npm-scriptsに書かない方がよいコマンド

npm-scriptsのフィールドのコマンドでは`node_modules`フォルダー内の実行ファイルを呼び出すことができます。そのため、わざわざ実行ファイルのパスや`npx`コマンドを記述する必要はありません。

NG例：`npx`コマンドを記載

```
{
  "scripts": {
    "sass:version": "npx sass --version"
  }
}
```

NG例：`node_modules/.bin`パスを記載

```
{
  "scripts": {
    "sass:version": "node_modules/.bin/sass --version"
  }
}
```

#### 3\. scriptsの整理術

npm-scriptsの記述においてのちょっとした整理術を紹介します。まず実際にwatchするためのnpm-scriptsを`packgage.json`に記載します。

```
{
  "scripts": {
    "watch:sass": "sass --watch input.scss output.css",
    "watch:ts": "tsc -w main.ts"
  }
}
```

適当なファイルを作成しておきましょう。

input.scss

```
.example {
  font-size: 1rem;
  color: red;

  &_strong {
    font-weight: bold;
  }
}
```

main.ts

```
const message: string = "Hello TypeScript!"

console.log(message);
```

SassとTypeScriptをそれぞれwatchするためのコマンドが完成しました。実行するためには以下のコマンドを実行します。

```
npm run watch:scss & npm run watch:ts
```

シェルスクリプトは`&`で接続することで並列処理、`&&`では直列処理を行うことができます。しかし、**コマンドを接続したことで冗長になってしまいました。使用する上で少々不便なので、このコマンドもnpm-scriptsへ追加**してしまいます。

```
{
  "scripts": {
    "watch": "npm run watch:sass & npm run watch:ts", // <= 追加
    "watch:sass": "sass --watch input.scss output.css",
    "watch:ts": "tsc -w main.ts"
  }
}
```

以下のように短いコマンドでSassとTypeScriptのwatchを同時に実行可能になりました。

```
npm run watch
```

同じようにビルドコマンドを追加してひととおり完成です。**buildとwatchの行いやすい整理されたnpm-scriptsができあがりました。**

```
{
  "scripts": {
    "build": "npm run build:sass && npm run build:ts",
    "build:sass": "sass input.scss output.css",
    "build:ts": "tsc main.ts",
    "watch": "npm run watch:sass & npm run watch:ts",
    "watch:sass": "sass --watch input.scss output.css",
    "watch:ts": "tsc -w main.ts"
  }
}
```

#### 4\. おまけテクニック

npm-scriptsにはユーザーのアクションをきっかけに自動で実行してくれるコマンドがいくつか用意されています。その中の`postinstall`コマンドを使用することで、効率良い開発環境構築が行えるようになるので少しだけ紹介します。

`postinstall`コマンドとは`npm install`コマンドの終了時に実行されるコマンドです。

```
{
 "scripts": {
    "build:ts": "tsc main.ts",
    "postinstall": "npm run build:ts"
  }
}
```

この例では、開発者が`npm install`を実行してモジュールのインストールが終了したタイミングで`build:ts`コマンドを実行してくれます。`postinstall`コマンドを用意しておくことで、ちょっとした手間を解消できるのでオススメです。

### Visual Studio Codeでnpm scriptsを呼び出す方法

Visual Studio Codeでは、［NPM SCRIPTS］というパネルが存在します。`package.json`ファイルに記載されている`scripts`フィールドの内容を画面上に表示してくれます。

この［NPM SCRIPTS］パネルのコマンドをクリックすると、スクリプトが実行されるのでとても便利です。

![](https://ics.media/entry/12226/images/images/230120_npmscripts_vscode.png)

**ターミナルでコマンドを毎度打ち込むより圧倒的に便利**なので使い方を覚えておきましょう。

![](https://ics.media/entry/12226/images/images/230120_npmscripts_vscode_gui.gif)

### WebStormでnpm scriptsを呼び出す方法

WebStormでも同様に、［npm］というパネルが存在します。`package.json`ファイルに記載されている`scripts`フィールドの内容を画面上に表示してくれます。

この［npm］パネルのコマンドをクリックすると、スクリプトが実行されるのでとても便利です。

![](https://ics.media/entry/12226/images/images/230120_npmscripts_webstorm.png)

使い方

-   ①pakcage.jsonファイルを右クリック
-   ②［npm スクリプトの表示］を選択
-   ③［npm］パネルの出現を確認する
-   ④使いたいコマンドをダブルクリックする

これを使わないで**npm scriptsをターミナルで手打ちするのは効率が悪い**ので、［npm］パネルを活用するのがオススメです。

### 終わりに

意外と知られていないnpm-scriptsの使い方ですが、知っていると非常に役立ちます。ICSでもnpm-scriptsを積極的に活用しています。

また、npm-scriptsは多くのエディターでサポートされています。Visual Studio CodeやWebStormだとマウス操作でnpm scriptsを呼び出せます。わざわざターミナルを起動する必要がなく効率的なので、下記の記事を参考にしてくださいませ。

-   [VS Codeを使いこなせ! フロントエンジニア必須の拡張機能7選](https://ics.media/entry/18544/)
-   [JavaScriptのプログラミングはこれだけ効率化できる！ 使用歴5年目のエンジニアが送るWebStormの厳選神業集](https://ics.media/entry/16760/)

**npmモジュールの流行り廃りは早いですが、npm自体はしばらくは廃れることもないはず**なので、フロントエンドエンジニアの基礎知識としてみなさんも是非この機会に触れてみてください。