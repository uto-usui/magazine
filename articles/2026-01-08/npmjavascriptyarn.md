---
title: "npm互換のJavaScriptパッケージマネージャーYarn入門"
source: "https://ics.media/entry/13838/"
publishedDate: "2016-11-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

最近のWebのフロントエンド開発ではライブラリの管理を行う**パッケージマネージャーの採用が主流になってきています**。たとえば、タスクランナーのGulpやGruntであったり、SassやTypeScriptのコンパイルのために[Node.jsノード・ジェイエス](https://nodejs.org/en/)（[npm](https://www.npmjs.com/)）を導入している方は多いでしょう。

JavaScriptのパッケージマネージャーとしては「npmネヌ・ピー・エヌ」が有名ですが、2016年10月にFacebookが新しいパッケージマネージャー「[Yarnヤァン](https://yarnpkg.com/)」を公開しました。

Yarnはnpmと互換性のあるJavaScriptのためのパッケージマネージャーで、**「インストールが高速」「より厳密にバージョンを固定」「セキュリティが高い」といった魅力があります**。弊社はnpmからYarnに乗り換えて早3年、快適に開発に利用しています。本記事では、npmの経験者に向けてYarnの利点と使い方を紹介します。

### Yarnの特徴とは

#### インストールがとにかく早い

一度インストールしたパッケージはキャッシュされるため、**オフラインでも再インストールできます**。また、npmでは直列にインストールしていましたが、Yarnでは効率的にリクエストキューを発行し並列にインストールを行います。これにより、**高速にパッケージをインストールできます**。npmもバージョン5から高速化されましたが、Yarnのほうが圧倒的に高速です。記事「[npmから乗り換えてわかったYarnの4つのメリット](https://ics.media/entry/19384/)」でも検証済みです。

#### より厳密にバージョンを固定できる

Yarnではロックファイルによって依存パッケージをより正確なバージョンで管理できます。また、正確なアルゴリズムですべてのマシンに同じファイル構造でインストールされるため、インストールの再現が可能です。**複数人での開発時に「一部の人のみエラーが発生する」といったバグを発生しにくい環境にできます**。

#### セキュリティーが高い

パッケージのインストール前にチェックサムで整合性を確認します。パッケージに誤りがないかをチェックできるため、信頼性が高まります。

#### インストールに失敗しづらい

ネットワークへの接続に失敗した場合でも自動的に再試行されるため、インストールに失敗しづらいです。

#### フラットモード

**同パッケージの別バージョンの重複を作成せず、単一のバージョンにすることもできます**。これにより、パッケージがインストールされる`node_modules`フォルダー内の肥大化が防げます。

![](https://ics.media/entry/13838/images/161026_yarn_console.png)

▲ `yarn --flat`コマンドを使って、フラットモードでインストールしている様子。重複しているバージョンがある場合にバージョンを選んでインストールできる

#### コマンドライン出力がわかりやすい

多くの絵文字を使用し、シンプルで読みやすいコマンドライン出力がされます。

![](https://ics.media/entry/13838/images/161026_yarn_console_gif.gif)

▲ Yarnからパッケージをインストールしている様子

### Yarnをインストールしてみよう

前提として、[Node.js](https://nodejs.org/en/download)の最新版をインストールしておいてください。Node.jsに付属のパッケージマネージャー「npm」がYarnのインストールに必要だからです。

#### Windowsの場合

「[Installation | Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)」の手順にあるように、Yarnの公式インストーラーを使うのが便利でしょう。

![](https://ics.media/entry/13838/images/180611_yarn_install_windows.png)

#### macOSの場合

Yarnは`npm`コマンドからインストールできます。コマンドライン（Windowsではコマンドプロンプト、macOSではターミナル。app)を立ち上げ、以下のコマンドを実行します。成功するとYarnがグローバル環境にインストールされ、`yarn`コマンドを実行できるようになります。

```
sudo npm install -g yarn
```

もしくは公式の手順「[Installation | Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)」で進めることも可能です。ただ、公式の手順は手間が多いため、コマンドラインに不慣れな方にとっては敷居が高いでしょう。

### Yarnでプロジェクトを管理しよう

Yarnのコマンドはnpmのコマンドと少しだけ異なります。頻繁に使用するコマンドについて紹介します。

#### はじめからyarnを使ってみる場合（package.jsonがない場合）

パッケージ管理ファイルの作成には`yarn init`コマンドを使用します。このコマンドを実行すると、対話形式でプロジェクト名やバージョン情報が聞かれ、`package.json`ファイルが作成されます。このファイルを共有することで、プロジェクトにインストールするパッケージの設定情報を他の人と共有できます。中身はnpmで作る`package.json`ファイルと同じものなので、Yarnで設定したものをそのままnpmで使えます。

```
yarn init
```

※ npmコマンドの`npm init`と互換のコマンド

![](https://ics.media/entry/13838/images/161026_yarn_init.png)

▲ `yarn init`コマンドを実行した時の様子

#### 既存のプロジェクトでYarnを使用する場合（package.jsonがある場合）

既存の`package.json`ファイルから必要なモジュールをインストールするには`yarn`コマンドを使用します。パッケージの情報が記載されている状態で実行するとパッケージのバージョンを固定するための`yarn.lock`ファイルが作成されます。

```
yarn
```

※ `npm install`と互換のコマンド

### プロジェクトに必要なパッケージをインストールしてみよう

#### プロジェクトに必須なパッケージをインストールする場合

プロジェクトに必須なパッケージをインストールする場合、`yarn add`コマンドを実行します。このコマンドを実行すると、`node_modules`フォルダーにパッケージがインストールされ、`package.json`ファイルの`depencies`の箇所にパッケージ名とバージョンが記載されます。また、パッケージのバージョンを固定するための`yarn.lock`ファイルが作成されます。

```
yarn add [package名]
```

※ npmコマンドの`npm install --save`と互換

#### devDependenciesへインストールする場合

devDependenciesのパッケージとしてインストールする場合は、`yarn add [package名] --dev`コマンドを使用します。このコマンドを実行すると、`package.json`ファイルの`devDepencies`の箇所にパッケージ名とバージョンが記載されます。

```
yarn add [package名] --dev
```

もしくは`--dev`は`-D`と省略できます。

```
yarn add [package名] -D
```

※ npmコマンドの`npm install --save-dev`と互換

#### グローバルにインストールする場合

マシンのグローバルにインストールする場合は、`yarn global add`コマンドを使用します。

```
yarn global add [package名]
```

※ npmでの`npm install -g`コマンドと互換

### パッケージをアンインストールする

パッケージの削除は`yarn remove`コマンドを使用します。実行すると`package.json`ファイルや`yarn.lock`ファイルに記載されていたパッケージ名とバージョン情報が削除されます。

```
yarn remove
```

※ `npm uninstall`と互換。npmコマンドではオプションに指定していた`--save`や`--save-dev`は不要です  
※ その他、詳しいコマンドについてはYarn公式のnpm移行ガイド「[Yarn - Migrating from npm](https://classic.yarnpkg.com/en/docs/migrating-from-npm)」を参照ください

### コマンドの実行が簡単

```
yarn run モジュール名
```

とするだけで、`node_modules/.bin/`にあるスクリプトを実行できます。たとえば、`yarn add typescript`でインストールしたTypeScriptパッケージのコンパイルコマンドを実行するには、次のように実行します。

```
yarn run tsc
```

※ npmの`npx tsc`と互換

また、npm scriptsも`yarn run`コマンドで実行できます。

### Yarnをプロジェクトで使用するか？

**インストールの高速化やバージョンの固定機能、オフラインインストールと、とても魅力的な機能がそろっていて、個人的に導入してよかったと思っています**。

複数人が関わるプロジェクトに導入するには、インストールの手間や`npm`コマンドとの違いなどの周知を行う必要があります。`npm`へ戻るのは難しくないため、まずは気軽にためしてみてはいかがでしょうか？

実際にyarnを導入した体験を記事『[npmから乗り換えてわかったYarnの4つのメリット](https://ics.media/entry/19384/)』にまとめたので、あわせて参照ください。