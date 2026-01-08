---
title: "VS Codeを極める！ MarkdownやGitにもオススメの拡張機能9選"
source: "https://ics.media/entry/18756/"
publishedDate: "2018-07-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

2018年7月25日 公開 / [株式会社ICS 渡邊 真耶](https://ics.media/entry/staff/watanabe/)

「[Visual Studio Code（略称：VS Code）](https://code.visualstudio.com/)」はMicrosoftが提供している無償で高機能なエディターです。標準でも十分な機能は備わっていますが、拡張機能をインストールすることで、より使いやすく自分にあったエディターにカスタマイズできます。

[前回の記事](https://ics.media/entry/18544/)では、「HTMLコーダー」「フロントエンジニア」に役立つ拡張機能を紹介しました。本記事では、**開発者全般の方に役立つ拡張機能**を紹介します。

### エディターを強化する拡張機能

#### 1\. Clipboard Ring

![Clipboard Ring](https://ics.media/entry/18756/images/180618_clipboardRing.jpg)

テキストを「コピー」や「切り取り（カット）」したものを「貼り付け（ペースト）」する場合に、この拡張機能を入れることで**複数件の内容を記憶できます**。ctrl+shift+v（⌘+shift+v）を押すごとに過去の情報に切り替えられます。デフォルトでは10件の情報を記憶できますが、設定を変更することで記憶する件数を増やすことも可能です。

![Clipboard Ring Demo](https://ics.media/entry/18756/images/180618_clipboardRing_thumb01.gif)

-   [Clipboard Ring - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=SirTobi.code-clip-ring)

#### 2\. Shortcuts

![](https://ics.media/entry/18756/images/180618_shortcuts.jpg)

画面下のステータスバーにショートカットボタンを追加できる拡張機能です。ショートカットは自由に設定できるため、**よく使う機能をショートカットに登録しておくことで、ワンクリックで手軽に実行できます**。設定できる項目はVisual Studio Codeの[公式サイト](https://code.visualstudio.com/docs/getstarted/keybindings#_default-keyboard-shortcuts)に掲載されています。ショートカットのアイコンも[こちら](https://octicons.github.com/)から自由に設定できます。

![Shortcuts Demo](https://ics.media/entry/18756/images/180618_shortcuts_thumb01.gif)

-   [Shortcuts - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=gizak.shortcuts)

#### 3\. Markdown All in One

![Markdown All in One](https://ics.media/entry/18756/images/180618_markdownAllinone.jpg)

**Markdownを扱う際には必ず入れておきたい便利な拡張機能です。**この拡張機能を1つインストールするだけで、以下の機能が利用できます。

-   ショートカットキーでMarkdownのタグを入力可能（ctrl+bで太字、ctrl+shift+\]でインデントの追加など）
-   画像の挿入時に画像パスの入力を補完
-   Markdownのアウトライン表示が可能
-   mdファイルを開いた際に自動的にプレビューを起動（デフォルトでは無効）

![Markdown All in One Demo](https://ics.media/entry/18756/images/180618_markdownAllinone_thumb01.gif)

-   [Markdown All in One - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

#### 4\. markdownlint

![](https://ics.media/entry/18756/images/180618_markdownlint.jpg)

Markdownの構文チェックを行ってくれる拡張機能です。構文チェックを行うことで**記述が統一された品質の高いドキュメントを作成できます**。デフォルトのチェック内容は多少厳しいですが、チェック内容は設定ファイルで変更できるため、用途にあわせてルールを設定できます。

-   [markdownlint - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

#### 5\. Paste Image

![](https://ics.media/entry/18756/images/180618_pasteImage.jpg)

クリップボード上の画像をMarkdownファイルなどに直接貼り付けられる拡張機能です。ウェブ上の画像やローカルにある画像を右クリックのメニューからコピーし、Ctrl+Alt+V (⌘+Alt+Vをするだけで、Markdownファイル内に貼り付けられ、同一ディレクトリに保存されます。（保存先は設定ファイルで変更可能です）

また、macOSのスクリーンショット機能（Shift+⌘+4+control）を利用すると、以下のデモのように手早く目的の画像を貼り付けられます。

![](https://ics.media/entry/18756/images/180618_pasteimage_thumb01.gif)

-   [Paste Image - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image)

#### 6\. Local History

![Local History](https://ics.media/entry/18756/images/180618_localHistory.jpg)

ファイルの変更履歴を保存してくれる拡張機能です。Gitなどのバージョン管理システムを利用している方も多いですが、この拡張機能はコミットなどの操作をする必要がなく、**ファイル保存のタイミングで自動的にバックアップを取得してくれます**。また、過去の変更履歴の差分が確認できるため、過去のコードを確認したり、部分的に復元することもできます。バージョン管理システムとあわせて利用できるため、コミット前の段階の更新履歴を確認したい時などに便利です。

![Local History Demo](https://ics.media/entry/18756/images/180618_localHistory_thumb01-1.jpg)

-   [Local History - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=xyz.local-history)

### 開発を補助する拡張機能

#### 7\. Git History

![Git History](https://ics.media/entry/18756/images/180618_gitHistory.jpg)

Visual Studio Codeの標準機能としてGitの一部の操作（ファイルのコミット、プッシュ、プルなど）を行うことはできますが、コミット履歴を見ることができません。この拡張機能を入れるとGitのコミット履歴やファイルごとの履歴などの情報をグラフィカルに確認できます。

![Git History Demo](https://ics.media/entry/18756/images/180618_gitHistory_thumb01.gif)

-   [Git History - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)

#### 8\. PlantUML

![](https://ics.media/entry/18756/images/180618_plantUML.jpg)

PlantUMLはテキストから**クラス図、シーケンス図、パッケージ図、ユースケース図などのUMLの図を作成する**拡張機能です。[独自の記法](http://plantuml.com/)で書いたテキストファイルからさまざまなUMLの図を表示できます。拡張機能のインストールに加えて、別途PlantUMLの実行に必要なアプリケーションのインストールが必要です。以下のサイトにインストール手順がわかりやすくまとめられています。

-   Windowsのインストール方法  
    [\[Visual Studio Code\]\[Windows\] PlantUMLの環境を設定する](https://qiita.com/koara-local/items/e7a7a7d68a4f99a91ab1)
-   macOSでのインストール方法  
    [PlantUMLの使い方 - UML図を描く - Project Unknown](http://www.project-unknown.jp/entry/plantuml)

![PlantUML Demo](https://ics.media/entry/18756/images/180618_plantUML_thumb01.gif)

-   [PlantUML - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

#### 9\. Docker

![](https://ics.media/entry/18756/images/180618_docker.jpg)

Dockerを利用する上で必要な機能が搭載されている拡張機能です。`Dockerfile`や`docker-compose.yml`のシンタックスハイライトや補完、lintのチェックまで行ってくれます。また、コンテナーの作成から起動、停止までコマンドパネルを起動することなく、マウス操作ですべて実行できます。

![Docker Demo](https://ics.media/entry/18756/images/180618_docker_thumb01.gif)

-   [Docker - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker)

### おまけ：テキスト校正くん

![](https://ics.media/entry/18756/images/180811_textlint_demo.gif)

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

VS Codeの拡張機能にはMarkdownに関する拡張機能も多く、本記事で紹介したような拡張機能（Markdown All in One、markdownlint、Paste Imageなど）を組み合わせることで、**非常に高機能なMarkdownエディターとしても利用できます。**

[Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode)にはさまざまな拡張機能が公開されており、日々あたらしい拡張機能が追加されています。また、**VS Code自体も活発に更新されており、拡張機能が必要だったものも標準機能としてどんどん搭載されており、より高機能なエディターに進化を続けています。**

拡張機能自体はJavaScriptで作成できるため、ウェブ制作をおこなっている方であれば容易に作成できます。開発ドキュメントや開発環境を構築するコードジェネレーターなども用意されており、手を付けやすい環境が準備されています。興味のある方は拡張機能の開発にも挑戦してみてはいかがでしょうか？