---
title: "VS Codeを使いこなせ! フロントエンジニア必須の拡張機能7選"
source: "https://ics.media/entry/18544/"
publishedDate: "2018-07-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

「[Visual Studio Code（略称：VS Code）](https://code.visualstudio.com/)」はMicrosoftが提供している無償で高機能なエディターです。標準でも十分な機能は備わっていますが、**拡張機能をインストールすることで、より使いやすく自分にあったエディターへとカスタマイズできます**。

本記事では、**HTMLコーダーやフロントエンドエンジニアに役立つ拡張機能**を紹介します。

### 1\. IntelliCode

![](https://ics.media/entry/18544/images/190514_intellicode.png)

IntelliCodeはMicrosoft謹製の公式プラグイン。**AI支援による次世代のコード補完**がJavaScriptやTypeScriptで利用できるようになります。APIの一覧がアルファベット順に提示されるのではなく、**利用する可能性の高いAPIがAIによって予測されます**。

コード補完の様子を次のスクリーションショットでご覧ください。入力候補の「★」マークが付いているところが、補完候補になっているところです。人工知能の機械学習モデルは、**質の高いGitHubレポジトリを大量に用いて訓練されているそうで、文脈によって適切な候補が表示されます**。今までのコード補完よりも、手に馴染むこと間違いないでしょう。

![](https://ics.media/entry/18544/images/190515_vscode_intellisence.gif)

-   インストールはこちらから → [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

### 2\. indent-rainbow

![](https://ics.media/entry/18544/images/images/190514_indent_rainbow.png)

「indent-rainbow」は深さに応じて、インデントをカラーリングするプラグイン。インデントの深さが視覚でわかりやすくなるので、かなりコードが書きやすくなります。JavaScriptやHTML、CSSで利用可能です。

-   インストールはこちらから → [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)

![](https://ics.media/entry/18544/images/190514_indent_html.png)

### 3\. Prettier - Code formatter

![Prettier - Code formatter](https://ics.media/entry/18544/images/180618_prettier.jpg)

「Prettier」はJavaScriptやTypeScript、CSS、HTMLなどのコードを整形可能なコードフォーマッターです。**ファイル全体のフォーマットを整えるだけでなく、選択した部分のコードのみフォーマットを整えることも可能です**。また設定を変えることで、ファイル保存時に自動的にフォーマットを適用したり、ESLintの設定を使って整形することもできます。

![Prettier - Code formatter Demo](https://ics.media/entry/18544/images/180618_prettier_thumb01.gif)

Prettierについて詳しく知りたい方は記事『[話題のコード整形ツール「Prettier」とは](https://ics.media/entry/17030/)』をあわせてご覧ください。整形していないコードは害悪そのものです。他のコーダーのためにも、必ずコード整形しておきましょう。

-   インストールはこちらから → [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 4\. Live Server

![Live Server](https://ics.media/entry/18544/images/180618_liveServer.jpg)

「Live Server」はワンクリックでローカルのウェブサーバーを起動できる拡張機能です。オートリロードにも対応しており、**ファイルの更新を検知して自動的にリロードしてくれるため、リアルタイムに変更が確認できます**。Gulpやwebpackなどを使ってローカルサーバーを立てる方も多いですが、設定する手間がなく手軽に利用できます。

![Live Server Demo](https://ics.media/entry/18544/images/180618_liveServer_thumb01.gif)

-   インストールはこちらから → [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### 5\. Easy Sass

![Easy Sass](https://ics.media/entry/18544/images/180618_easySass.jpg)

「Easy Sass」はファイル保存時に自動でSASSをCSSにコンパイルしてくれる拡張機能です。こちらもGulpやwebpackを利用してコンパイルを行う方も多いですが、一人で開発する場合やちょっとした開発を行う際に簡単に利用できるためとても便利です。

![Easy Sass Demo](https://ics.media/entry/18544/images/180618_easySass_thumb01.gif)

-   インストールはこちらから → [Easy Sass](https://marketplace.visualstudio.com/items?itemName=spook.easysass)

### 6\. Regex Previewer

![Regex Previewer](https://ics.media/entry/18544/images/180618_regexPreviewer.jpg)

「Regex Previewer」は**正規表現を作成する際に、正規表現のテストをリアルタイムで実施できる拡張機能**です。拡張機能をインストールすると、コード中の正規表現の箇所に「Test Regex…」というリンクが表示され、リンクを押すと正規表現の確認画面が開きます。

![Regex Previewer Demo](https://ics.media/entry/18544/images/180618_regexPreviewer_thumb01.gif)

テスト実施時の注意点としては、上のデモ画像のように複数のパターンに対してテストを行う場合は、正規表現のオプションで「グローバルサーチフラグ（g）」と「マルチラインフラグ（m）」を指定する必要があります。

-   インストールはこちらから → [Regex Previewer - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=chrmarti.regex)

### 7\. JSON to TS

![JSON to TS](https://ics.media/entry/18544/images/180618_jsontots.jpg)

「JSON to TS」はJSON形式のテキストデータからTypeScriptのインターフェイスのコードに変換してくれる拡張機能です。APIから取得するJSON形式のデータなどを扱う際に、手軽にインターフェイスのコードを作成できます。

![JSON to TS Demo](https://ics.media/entry/18544/images/180618_jsontots_thumb01.gif)

-   インストールはこちらから→ [JSON to TS - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts)

### オススメ設定

#### npm-scriptsをマウス操作で行う

`package.json`ファイルに定義した**npm-scriptsはサイドパネルからダブルクリックで実行**できます。コマンドプロンプトやターミナルなどの別のソフトウェアを起動することなく実行できるため、とても便利です。ターミナルでいちいちコマンドを打ち込む手間が省けるので、オススメです。

![](https://ics.media/entry/18544/images/images/190514_npmscripts.png)

この機能はデフォルトでは有効になっておらずサイドパネルに表示されません。利用するためには設定`enableScriptExplorer`を変更する必要がります。

![](https://ics.media/entry/18544/images/190514_npmscripts_settings.png)

npm-scriptsについて詳しく知りたい方は記事『[npm-scriptsのタスク実行方法まとめ](https://ics.media/entry/12226/)』をあわせてご覧ください。

#### アウトライン表示で構造をわかりやすくする

関数名や定数名などの情報をアウトライン表示してくれます。サイドパネルに表示されるアウトラインを選択すると、該当するコードに瞬時に移動できます。さまざまな言語に対応しており、HTML、JavaScript、TypeScriptだけでなく、JSONやYAML、Dockerなどのアウトラインも表示できます。

![](https://ics.media/entry/18544/images/images/190514_outline.png)

サイドパネルの［エクスプローラー］の見出しを右クリックし、表示されるメニューから［アウトライン］を選択することで利用できます。

### おまけ：テキスト校正くん

![](https://ics.media/entry/18544/images/180811_textlint_demo.gif)

手前味噌ですが、フロントエンドエンジニアにも役立つツールなので紹介させてください。**「テキスト校正くん」はテキストやマークダウンで、日本語のおかしい箇所をチェックできる拡張機能**です。たとえば、次のようなウェブ関連の間違いやすいワードも鋭く指摘します。

-   Javascript → JavaScript
-   Github　→　GitHub
-   Mac OS X → macOS
-   iPhoneXS　→　iPhone XS
-   Amazon Web Service → Amazon Web Services

「JavaScript」を、「Java」とか「Java script」とか間違った表記をしているのを見たことはありませんか？　本人は気づかなくても、他のエンジニアからの信頼度や文章の信憑性がガクッと下がります。

VS Codeに「テキスト校正くん」をいれるだけで、**日本語のおかしな使い方、専門用語の間違った表記を防げます**。校正ルールもカスタマイズできます。無料で簡単に導入できるので、ぜひインストールくださいませ。

-   [文章作成・メール作成に役立つ！　VS Codeの拡張機能「テキスト校正くん」](https://ics.media/entry/18859/)

### おわりに

本記事で紹介した拡張機能以外でも、[Chromeと連携してJavaScriptをデバッグする拡張機能](https://ics.media/entry/11356/)など便利なものがたくさん公開されています。拡張機能はサイドパネルの拡張機能のタブから簡単に検索・インストールができますので、自分なりの使いやすいエディターにカスタマイズしてみてください。

また、今回紹介したエクステンションのような機能は**JetBrains社の[WebStorm（ウェブストーム）](https://www.jetbrains.com/webstorm/)にも標準で搭載されています**。WebStormは有料のソフトウェアですが、記事『[使用歴5年目のエンジニアが送るWebStormの厳選神業集](https://ics.media/entry/16760/)』と『[使いこなせばウェブ制作が爆速になるWebStorm](https://ics.media/entry/11642/)』で紹介したように、**ウェブ制作に役立つ機能が豊富に搭載されています**。

拡張機能で自分好みにカスタマイズするならVS Codeを、導入時から機能が揃った状態でコーディングするならWebStormを、といった感じで選んでみてはいかがでしょうか。本記事ではフロントエンドエンジニア向けの拡張機能を紹介しましたが、続編記事「[MarkdownやGitにもオススメのVS Code拡張機能9選](https://ics.media/entry/18756/)」では開発者全般の方に役立つ拡張機能を紹介してます。ぜひチェックしてください。