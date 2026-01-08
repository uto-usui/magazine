---
title: "CSSのコード品質向上のためのStylelint入門"
source: "https://ics.media/entry/230525/"
publishedDate: "2023-05-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

[Stylelint](https://stylelint.io/)は、スタイルシートの問題検出や自動修正を行えるLintと呼ばれる静的解析ツールです。利用することで、CSSやSCSSファイルのコード品質の向上に役立ち、具体的には以下のメリットがあります。

-   プロジェクトのすべてのスタイルシートから構文エラーを検出する
-   セレクターやプロパティの重複といった、問題になりそうな実装を未然に防ぐ
-   次のようなルールを強制し、コーディングスタイルを共通化してコードに一貫性を持たせる
    -   `font-weight`の値は、`bold`といったキーワード指定を強制する
    -   疑似要素のコロンは2つに強制する（`::before`）など

ICSでは複数人で開発することが多いため、スタイルシートの一貫性のためにStylelintが役立っています。HTMLコーディングが多い場面で恩恵を得られるツールです。

この記事ではStylelintの導入方法と、必要な設定について紹介します。

### 導入手順

まずはプロジェクトにStylelintをインストールして、実行まで行う手順を紹介します。

※Node.jsとnpmを利用するため、[Node.js](https://nodejs.org/en/download)をインストールした状態でお試しください。

紹介するサンプルは以下のリポジトリでも確認できます。

-   [ソースコードを確認する](https://github.com/ics-creative/230525_stylelint-getting-started/tree/main/basic)

#### ①Node.jsプロジェクトの初期化

ターミナルから、導入したいプロジェクトのディレクトリへ移動します。移動後、`npm init`を実行しnpmの初期化処理を行います。

```
npm init --yes
```

コマンドの実行が完了すると、プロジェクトに`package.json`が作成されます。

以下の画像は、Visual Studio Codeでプロジェクトを開いて初期化処理を行った例です。

-   [Visual Studio Code](https://code.visualstudio.com/)

▼ターミナルのパネルでコマンドを実行後、`package.json`が作成される

![Visual Studio Codeで初期化処理を行う](https://ics.media/entry/230525/images/230525_install_01.png)

#### ②npmからStylelintをインストール

続いて、以下のnpmコマンドを実行して、プロジェクトにStylelintをインストールします。

```
npm install -D stylelint
```

インストールが完了すると`package.json`の情報が更新されて、`node_modules`ディレクトリにStylelintが追加されます。

▼ターミナルのパネルでコマンドを実行後、`node_modules`ディレクトリが追加される

![プロジェクトにnode_modulesディレクトリが追加される](https://ics.media/entry/230525/images/230525_install_02.png)

#### ③設定ファイルを用意する

Stylelintは**どういったコードをエラーとして扱うか**のルールが必要なため、設定ファイルを用意してルールを定義します。

実行時に`.stylelintrc.json`ファイルを自動で検出して、Stylelintの設定ファイルとして扱います。設定ファイルは`.stylelintrc.js`といった別の拡張子でも利用できます（設定ファイル内にコメント文を書けるため、`.json`より`.js`をオススメします）。

-   [Configuring | Stylelint](https://stylelint.io/user-guide/configure/)

今回は`.stylelintrc.json`を`package.json`と同じディレクトリに作成して、`no-duplicate-selectors`という「同じセレクターの重複を禁止する」ルールを追加してみます。

▼`.stylelintrc.json`

```
{
  "rules": {
    "no-duplicate-selectors": true
  }
}
```

#### ④CSSファイルを用意してStylelintを実行する

Stylelintを実行できる環境が整ったので、用意したルールに引っかかる`index.css`を作成し、Stylelintがエラーを検出するか試してみます。

▼`index.css`

```
body {
  color: red;
}

/* Stylelintが正しく動作すると、セレクターの重複でエラーとなる */
body {
  color: blue;
}
```

CSSファイルの用意ができたら、以下のコマンドで`index.css`に対してStylelintを実行してみます。

```
npx stylelint index.css
```

コマンドを実行すると、`body`に対して`no-duplicate-selectors`のエラーメッセージが表示されます。

▼ターミナルでコマンドを実行後、`no-duplicate-selectors`のエラーメッセージが表示される

![ルール「no-duplicate-selectors」のエラーメッセージ](https://ics.media/entry/230525/images/230525_install_03.png)

以上が、導入手順になります。

### 実際に利用するための設定

Stylelintのルールを増やすことでコーディングスタイルを細かく指定できますが、ルールの数が多くひとつずつ指定していくのは現実的ではありません。

-   [Rules | Stylelint](https://stylelint.io/user-guide/rules)

このセクションでは、実際に利用するためにどういった設定を行うかを簡単に紹介します。

#### 設定ファイルを利用する

プロジェクトごとにルールをひとつずつ指定するのは大変です。そのためほとんどの場合は、**あらかじめ設定がまとめられた設定ファイルを利用して、必要に応じてルールを拡張します。**

Stylelintでは、`stylelint-config-[任意の名前]`で、公式やコミュニティが作成した設定ファイルがnpmに公開されています。以下の公式リポジトリでは、公開されている設定ファイルやプラグインを紹介しています。

-   [stylelint/awesome-stylelint#configs](https://github.com/stylelint/awesome-stylelint#configs)

この設定ファイルを`extends`フィールドに指定することで自身のプロジェクトで同じ設定を利用できます。

次の例では、公式で提供している設定ファイル`stylelint-config-standard`をインストールして、`extends`フィールドに追加しています。

-   [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)

```
npm install -D stylelint-config-standard
```

▼`.stylelintrc.json`

```
{
  "extends": [
    "stylelint-config-standard"
  ]
}
```

また、`extends`フィールドを設定したうえで、ルールを拡張したり、プロジェクトに適さないルールを上書きしたい場合は`rules`フィールドを指定することで上書きできます。

▼`.stylelintrc.json`

```
{
  "extends": [
    "stylelint-config-standard"
  ],
  "rules": {
    "no-duplicate-selectors": false
  }
}
```

設定ファイルの中には、**内部で別の設定ファイルに依存している**場合があります。そのため、利用したい設定ファイルについて詳しく知りたい場合は、依存ファイルを辿っていく必要があります。

たとえば、公式が提供している設定ファイルとして[stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)と`stylelint-config-standard`が存在しますが、`stylelint-config-standard`は内部で`stylelint-config-recommended`を利用しています。

設定ファイル

特徴

`stylelint-config-recommended`

ルールがゆるめ

`stylelint-config-standard`

ルールがやや厳格。`stylelint-config-recommended`を拡張したもの

ICSでは、次の設定ファイルを使用することが多いです。

-   [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)
    -   `stylelint-config-standard`と[stylelint-config-recommended-scss](https://github.com/stylelint-scss/stylelint-config-recommended-scss)を拡張した設定ファイルで、CSSに加えてSass（SCSS記法）でもStylelintを利用できるようになります。採用している理由は、ICSではSass（SCSS記法）を利用することが多く、厳格なルールで運用するためです。
-   [stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)
    -   CSSプロパティを設定ファイルにもとづいた並び順に整理します。

#### 自動修正付きのコマンドを管理する

コマンドの実行を手軽にするため、`npm-scripts`の登録をオススメします。

`npm-scripts`については詳しく知りたい方は、次の記事を参考ください。

-   [『Node.jsユーザーなら押さえておきたいnpm-scriptsのタスク実行方法まとめ』](https://ics.media/entry/12226/)

また、Stylelintでは**一部のルールで自動修正**が可能です。これは、コマンドに`--fix`引数を追加することで実行できます。該当のルールで発生したエラーを修正するために`--fix`を追加したコマンドを管理すると便利です。

-   [ソースコードを確認する](https://github.com/ics-creative/230525_stylelint-getting-started/blob/main/basic/package.json#LL4C1-L4C1)

▼`package.json`の例

```
{
  "scripts": {
    "fix": "stylelint \"**/*.css\" --fix"
  }
}
```

※SCSSファイルに対応する場合は、拡張子を次の通りに指定します

```
{
  "scripts": {
    "fix": "stylelint \"**/*.{css,scss}\" --fix"
  }
}
```

▼実行時のコマンド

```
npm run fix
```

#### アプリケーションからStylelintを自動実行する

アプリケーションによっては、拡張機能の追加や環境設定を行うことでStylelintを自動で実行できます。作業中のファイルでエラーを確認したい時に役立ちます。

今回は、Visual Studio Codeを例に実行手順を紹介します。

①Visual Studio Codeのマーケットプレイス・拡張機能で「stylelint」を検索すると、Stylelint公式が提供している拡張機能がヒットするので、インストールします。

-   [Stylelint - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

![Visual Studio Codeで拡張機能「Stylelint」を検索した画面](https://ics.media/entry/230525/images/230525_vscode_extension_01.png)

②エラーのあるファイルを開いた状態で問題パネルを開くと、開いたファイルのエラーを確認できます。

![問題パネルでStylelintのエラーが表示される](https://ics.media/entry/230525/images/230525_vscode_extension_02.png)

#### コラム: Webフレームワークなど、さらに複雑な環境で利用したい場合

Stylelintはプロジェクトに応じてカスタマイズできます。

-   設定ファイルにおいて、customSyntax（言語に対応したカスタム構文の追加）、plugins（プラグインの追加）、overrides（特定のファイルで設定を上書きする）フィールドの指定をする
-   対象外のファイルを指定する `.stylelintignore`ファイルを用意する

公開されている設定ファイルの中には、以下のような環境設定も済んでいる設定ファイルも公開されています。

-   [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)
-   [stylelint-config-standard-vue](https://github.com/ota-meshi/stylelint-config-standard-vue)

詳細は省略しますが、Vue.jsやReact（[Emotion](https://emotion.sh/docs/introduction)を利用）の環境を想定したサンプルファイルを用意したので、参考にしてみてください。

-   [ソースコードを確認する](https://github.com/ics-creative/230525_stylelint-getting-started/tree/main/web-frame-work)

### まとめ

Stylelintの導入手順と必要な設定について紹介しました。CSSやSCSSのコード品質の向上に役立つツールですので、ぜひ活用してみてください。

普段Node.jsを利用しない方には、導入のハードルが高いかもしれません。プロジェクトで使われることも多いので、ツールの全体像を掴んでいただけたなら幸いです。