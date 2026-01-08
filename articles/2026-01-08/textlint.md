---
title: "文章校正を行うためのtextlint入門"
source: "https://ics.media/entry/220404/"
publishedDate: "2022-04-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ICS MEDIAでは読みやすい文章作りの取り組みとして、自社で公開しているVS Code拡張機能の「[テキスト校正くん](https://marketplace.visualstudio.com/items?itemName=ICS.japanese-proofreading)」を使用して文章校正を行っています。スタッフの校正ルールを統一して、一定の品質と読みやすさを確保することを心がけています。

「テキスト校正くん」は、文章校正エンジンに[textlint](https://textlint.github.io/)というNode.jsのパッケージを使用しています。textlintは**設定した校正ルールにもとづいて文章校正を行える**ので、プロジェクトに適切なルールを設定して文章校正ができます。以下の記事で、textlintの活用事例が紹介されています。企業がtextlintを導入し、文章品質を高めるワークフローとして活用されていることがうかがえます。

-   [『textlintを使っている企業の事例・ルールをまとめてみた - Zenn』](https://zenn.dev/kgsi/articles/a88273d293abe07c5acb)
-   [『よりよい文書を書くための校正ツール「textlint」のSmartHR用ルールプリセットを公開しました！｜SmartHRオープン社内報』](https://shanaiho.smarthr.co.jp/n/n881866630eda)
-   [『文書ファイルをD＆Dするだけのシンプルな文書校正ツールが「はてブ」で話題に - 窓の社』](https://forest.watch.impress.co.jp/docs/serial/yajiuma/1323262.html)

![textlintが動作している様子](https://ics.media/entry/220404/images/intro.jpg)

この記事ではtextlintの導入手順と、ルールセットの管理・実行方法について紹介します。

### textlintとは？

textlintとはLintと呼ばれる静的解析ツールで、テキストファイル（`.txt`）やMarkdownファイル（`.md`）等を対象に、校正ルールにもとづいて文章校正を行うツールです。**校正ルールの自作**や、**提供されているルールを組み合わせて独自のルールセットを作成できます。**

![textlint公式サイト](https://ics.media/entry/220404/images/textlint_site.jpg)

textlintは本体と校正ルールのセットで構成されています。校正ルールは日本語に限らず、ほかの自然言語でも多くのルールが提供されています。

-   [textlint - GitHub](https://textlint.github.io/)
-   [textlint（日本語のコミュニティ） - GitHub](https://github.com/textlint-ja/)

### 導入手順

プロジェクトにtextlintと日本語の校正ルールをインストールする手順を紹介します。

紹介するサンプルは、以下のリポジトリから確認できます。不安な方はダウンロードして試してみてください。

-   [コードを確認する](https://github.com/ics-creative/220404_textlint_getting_started)

※本記事ではNode.jsとnpmを利用します。[Node.js](https://nodejs.org/en/download)をインストールした状態で利用ください。

①プロジェクトのディレクトリで`npm init`を実行し、npmの初期化処理を行います。

```
npm init --yes
```

②初期化後、textlintをインストールします。

```
npm install textlint
```

③使用したいルールも合わせてインストールします。

ここでは、日本語の「ら抜き言葉」を検出する[textlint-rule-no-dropping-the-ra](https://github.com/textlint-ja/textlint-rule-no-dropping-the-ra)というルールを追加してみます。

```
npm install textlint-rule-no-dropping-the-ra
```

インストール完了後、以下のコマンドでtextlintを実行できるようになります。

```
npx textlint --rule textlint-rule-no-dropping-the-ra [実行したいファイル名やパス]
```

④実際に動作しているか確認してみます。手順①で`npm init`を実行したディレクトリ直下に`file.md`というMarkdownファイルを新規作成し、以下の文章を追記します。

▼`file.md`

```
食べれる
```

⑤以下のコマンドでtextlintを実行します。

```
npx textlint --rule textlint-rule-no-dropping-the-ra file.md
```

▼実行結果で「ら抜き言葉」が検出されている様子

実行結果を見ると、問題が発生している行と文字数にエラーが表示されています。これでtextlintの実行が確認できました。

![VS Code上で「ら抜き言葉」が検出されている様子](https://ics.media/entry/220404/images/textlint_ranuki.jpg)

### 設定ファイルで管理を行う（.textlintrc）

先ほどのコマンドにルールを追加したい場合は、手順③をもとにルールをインストールします。そして手順⑤のコマンドに`--rule [追加ルール名]`というコマンドライン引数を増やしていくことでルールを追加できます。

▼例

```
npm install [追加ルール名]
```

```
npx textlint --rule textlint-rule-no-dropping-the-ra --rule [追加ルール名] file.md
```

ただし、ルールが増えていくにつれてコマンドも長くなり管理・実行が大変になります。その場合は`.textlintrc`という設定ファイルを用意することで**複数のルールをコマンドから分離して管理**できます。

#### ファイルの作成

`.textlintrc`ファイルは直接追加するか、以下のコマンドで作成できます。

```
npx textlint --init
```

`.textlintrc`は、JSON、YAML、JavaScriptとして書くことができます。また、拡張子を`.textlintrc.json`、`.textlintrc.yaml`、`.textlintrc.js`として使用することも可能です。今回は`.textlintrc`をJSONとして使用します。設定は以下のように記述します。

▼`.textlintrc`を編集

```
{
  "rules": {
    "textlint-rule-no-dropping-the-ra": true
  }
}
```

インストールされたルールを`rules`フィールドに追加していくことで複数のルールを管理できます。今回は値を`true`としていますが、設定方法はルールによって異なるため、該当するルールのリポジトリを確認して設定を行ってください。

-   [textlint-rule-no-dropping-the-ra - GitHub](https://github.com/textlint-ja/textlint-rule-no-dropping-the-ra)

#### textlintを再実行する

設定が完了したら、コマンドライン引数`--rule [ルール名]`を省略した以下のコマンドでtextlintを実行できます。

▼省略したコマンドでtextlintを実行

```
npx textlint file.md
```

設定した`.textlintrc`ファイルは自動で読み込まれるため、コマンドに「設定ファイルを読み込む」といった記述も不要です。

#### その他機能「フィルタールール」

校正ルールを追加するほか、`filters`フィールドを使用することで例外的にルールを無視するフィルタールールを設定できます。

以下の例では[textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments)というフィルタールールを追加しています。このルールで、`<!-- textlint-disable -->`というコメントに続く文章に対してtextlintを無効にし、`<!-- textlint-enable -->`というコメントに続く文章に対してtextlintを再度有効にします。

-   [textlint-filter-rule-comments - GitHub](https://github.com/textlint/textlint-filter-rule-comments)

▼フィルタールールをインストール

```
npm install textlint-filter-rule-comments
```

▼`.textlintrc`に`filters`フィールドを追加

```
{
  "rules": {
    "textlint-rule-no-dropping-the-ra": true
  },
  "filters": {
    "comments": true
  }
}
```

▼`file.md`を編集し、フィルタールールの動作確認を行う

```
<!-- textlint-disable -->
食べれる
<!-- textlint-enable -->
来れる
```

コマンドを再実行すると`<!-- textlint-enable -->`に続く「ら抜き言葉」のみエラーが表示されていると思います。

![textlint-enableに続く「ら抜き言葉」のエラー表示](https://ics.media/entry/220404/images/textlint_filter.jpg)

#### その他機能「プラグインの追加」

ルール、フィルタールールとは異なる、textlintを拡張するプラグインを設定できます。たとえば、標準のtextlintではHTMLファイル（`.html`）の文章校正を行うことはできませんが、[textlint-plugin-html](https://github.com/textlint/textlint-plugin-html)をインストールすることで利用できます。

▼プラグインのインストール

```
npm install textlint-plugin-html
```

▼`.textlintrc`に`plugins`フィールドを追加

```
{
  "rules": {
    "textlint-rule-no-dropping-the-ra": true
  },
  "filters": {
    "comments": true
  },
  "plugins": [
    "html"
  ]
}
```

▼`file.html`を新規作成

```
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>【textlint】HTMLの確認</title>
  </head>
  <body>
    <p>食べれる</p>
    <p>来れる</p>
    <p>見れる</p>
  </body>
</html>
```

▼textlintの実行

```
npx textlint file.html
```

![htmlファイルでエラーが表示される様子](https://ics.media/entry/220404/images/textlint_html.jpg)

#### その他機能「自動修正」

校正ルールの中には、エラーの内容を自動修正できる場合があります。その場合、コマンドに`--fix`という引数を追加することで自動修正を実行できます。

紹介した「ら抜き言葉」のルールでは自動修正が有効ではないため、新たに「全角文字同士の間にある半角スペース」を検出する、[textlint-rule-ja-no-space-between-full-width](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/tree/master/packages/textlint-rule-ja-no-space-between-full-width)というルールを追加します。

-   [textlint-rule-ja-no-space-between-full-width - GitHub](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/tree/master/packages/textlint-rule-ja-no-space-between-full-width)

▼校正ルールを追加インストール

```
npm install textlint-rule-ja-no-space-between-full-width
```

▼`.textlintrc`を編集し、校正ルールを追加

```
{
  "rules": {
    "textlint-rule-no-dropping-the-ra": true,
    "textlint-rule-ja-no-space-between-full-width": true
  },
  "filters": {
    "comments": true
  },
  "plugins": [
    "html"
  ]
}
```

▼`file.md`を編集し、校正ルールを確認できる文章を追加

```
<!-- textlint-disable -->
食べれる
<!-- textlint-enable -->
来れる

全角 同士
```

コマンドを実行して確認すると、チェックマークが付与されているエラーメッセージが追加されます。

```
npx textlint file.md
```

![チェックマーク付きのエラーメッセージが追加される](https://ics.media/entry/220404/images/textlint_fixable.jpg)

さらに`--fix`を追加したコマンドで再度実行すると、チェックマーク付きのエラーメッセージが自動で修正されます。

```
npx textlint --fix file.md
```

![チェックマーク付きのエラーメッセージが自動修正される様子](https://ics.media/entry/220404/images/textlint_fixed.jpg)

### アプリケーションからtextlintを自動で実行する

アプリケーションによっては、textlintを自動実行できる拡張機能が公開されています。そのひとつにVS Codeの[vscode-textlint](https://marketplace.visualstudio.com/items?itemName=taichi.vscode-textlint)という拡張機能があります。インストールするとプロジェクトにあるtextlintの設定を参照し、自動で実行するようになります。

-   [vscode-textlint - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=taichi.vscode-textlint)

※[vscode-textlint](https://marketplace.visualstudio.com/items?itemName=taichi.vscode-textlint)は**「テキスト校正くん」と指摘が重複するので、使用する際は「テキスト校正くん」を無効にしてください。**

▼VS Codeのマーケットプレイス・拡張機能で「textlint」を検索するとヒットします

![マーケットプレイス・拡張機能で「vscode-textlint」を表示](https://ics.media/entry/220404/images/vscode_plugin_install.jpg)

▼インストール後、問題パネルを開くと動作を確認できます

![インストール後、自動で動作している様子](https://ics.media/entry/220404/images/vscode_plugin_active.jpg)

コマンドを実行する手間を削減できるので、該当するアプリケーションを使用されている場合は導入を検討してみてください。対応されているアプリケーションについては[公式リポジトリのintegration.md](https://github.com/textlint/textlint/blob/master/docs/integrations.html)をご覧ください。

-   [textlint/docs/integrations.md - GitHub](https://github.com/textlint/textlint/blob/master/docs/integrations.html)

### ICS MEDIAのルールセットを紹介

ICS MEDIAでは、[textlint-rule-preset-icsmedia](https://github.com/ics-creative/textlint-rule-preset-icsmedia)というルールセットを使用しています。提供されているルールと独自の表記揺れのルールを組み合わせたもので、「テキスト校正くん」や外部ツールでも利用されています。リポジトリを公開していますので、ルールセットを作成する際の参考にしてみてください。

-   [textlint-rule-preset-icsmedia - GitHub](https://github.com/ics-creative/textlint-rule-preset-icsmedia)

▼ルールセットが利用されているツール

-   テキスト校正くん
    -   [VS Codeの拡張機能](https://ics.media/entry/18859/)
    -   [Adobe XDのプラグイン](https://ics.media/entry/19346/)
    -   [Figmaのプラグイン](https://ics.media/entry/220309/)
-   [proofreading-tool - GitHub](https://github.com/gecko655/proofreading-tool)

表記揺れ・誤字については[textlint-rule-prh](https://github.com/textlint-rule/textlint-rule-prh)を使用して実装しています。この表記揺れのルールを辞書として作成し、辞書にもとづいた校正ルールを追加できます。

-   [textlint-rule-prh - GitHub](https://github.com/textlint-rule/textlint-rule-prh)

### まとめ

textlintの導入手順と、ルールの管理・実行方法について紹介しました。textlintを利用することで、設定したルールにもとづいた文章校正ができるようになります。プロジェクトにあった校正ルールを用意したい場合や、スタッフの校正ルールを統一したい場合にぜひ活用してみてください。

また、記事では紹介していない機能として**ルールを自作する**といったことも可能です。詳しくは以下のページをご覧ください。

-   [ルールの作成（英語ページ） - textlint](https://textlint.github.io/docs/rule.html)