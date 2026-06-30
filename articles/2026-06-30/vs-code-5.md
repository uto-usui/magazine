---
title: "VS Codeでマークダウンを快適に書きたい！ オススメの拡張機能と設定5選"
source: "https://ics.media/entry/240523/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2024-05-22"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

ブログの文章やドキュメント作成など、さまざまなシーンで使われる記法に「マークダウン記法」があります。文字修飾の簡単さや読みやすさから使うタイミングは多々あると思いますが、みなさんは快適にマークダウンを書けていますか？

筆者はVS Codeでドキュメントをマークダウンで書くことが多く、表の作成・編集やプレビュー表示など、めんどくさい・見づらい・使いづらいと思うことがあります。どうにか快適に書けないかと思いさまざまな拡張機能や設定を試しながら業務を行ってきました。

この記事では、筆者が試した拡張機能やVS Codeの設定の中で便利だったものを紹介します。①から⑤まではすべて無料で利用できるので気軽に試してみてください！

### ①マークダウンでの表を簡単に作成・編集できる拡張機能

VS Codeでの表の作成に重宝しているのが「[Markdown Table](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable)」です。**エクセルの表をマークダウンの表へ変換、セル間の移動、列の追加**など便利な機能が揃っています。

#### エクセルの表をマークダウンの表に変換する

列や行、文字数が多い表をエクセルで内容を整えてからマークダウンにコピペして使っています。

1.  エクセルで表を作成する
2.  コピペしたい範囲を選択、コピーする（Windows: `Ctrl` + `C`、Mac: `command` + `C`）
3.  マークダウン上で貼り付けする（Windows: `Ctrl` + `V`、Mac: `command` + `V`）
4.  内容を選択した状態で右クリックし、「Markdown Table: Convert TSV to table」を選択する

#### セル間を移動

1.  `Tab`キーで次のセルに移動
2.  `Shift` + `Tab`で前のセルに移動

#### 列の追加

1.  セルにカーソルを置いて右クリックする
2.  「Markdown Table: Insert column to right（またはleft）」で左右に列を追加する

#### スニペットを追加して表を簡単に追加する

VsCodeのスニペット機能を利用し、表を簡単に追加できます。

**スニペットの準備**

1.  VsCodeの「Code」→「基本設定」→「スニペットの構成」をクリック
2.  「markdown」を入力し、「markdown.json」を選択する
3.  以下のスニペットをコピー&ペーストして保存する

```
"Insert a simple table": {
    "prefix": "table",
    "body": [
        "| ${0:title} |  |",
        "| - | - |",
        "|   |   |"
    ],
    "description": "Insert a simple table"
}
```

**スニペットを有効にする**

スニペットはプロジェクトを問わずいつでも使いたいため**ユーザー設定（User Settings）への追加をオススメします。**もし特定のプロジェクトでのみ使いたい場合はワークスペース設定へ追加することもできます。

1.  コマンドパレットを開く（Windows: `Ctrl` + `Shift` + `P`、Mac: `command` + `shift` + `P`）
2.  `user settings`と入力し、「基本設定：ユーザー設定を開く (JSON) (Preferences: Open user Settings (JSON))」を選択する a. ※ワークスペース設定に追加したい場合は`workspace settings`と入力し、「基本設定：ワークスペース設定を開く (JSON) (Preferences: Open Workspace Settings (JSON))」を選択する
3.  以下の設定を追加する

```
"[markdown]": {
    "editor.quickSuggestions": true,
},
```

**使い方**

1.  マークダウンファイル上で「table」と入力する
2.  「table Insert a simple table」を選択する

### ②マークダウンのナビゲーションを表示する拡張機能

VS Codeではデフォルトでマークダウンの見出しを「アウトライン」に表示します。これでも十分ですが、「#」や「abc」などの余計な情報があり見づらいと感じます。

「[Markdown Navigation](https://marketplace.visualstudio.com/items?itemName=AlanWalk.markdown-navigation)」は、シンプルな表示が見やすい拡張機能です。地味ですが意外と効果があるのでぜひお手元で試してみてください。

#### 使い方

1.  拡張機能をインストールする
2.  マークダウンファイルを開くと「MARKDOWN NAVIGATION」が表示される

![VS CodeのアウトラインとMarkdown Navigationの比較](https://ics.media/entry/240523/images/240523_markdown_navigation.jpg)

### ③見出しを色分けして表示する設定

マークダウンの見出し（#や##）の表示色が設定できます。見出しのレベルをひと目で確認できるので、間違いにすぐ気付けたり文章の構造がわかりやすくなりオススメの設定です。

#### 使い方

1.  コマンドパレットを開く（Windows: `Ctrl` + `Shift` + `P`、Mac: `command` + `shift` + `P`）
2.  `settings`と入力し、「基本設定：ユーザー設定を開く (JSON) (Preferences: Open user Settings (JSON))」を開く a. ※ワークスペース設定に追加したい場合は`workspace settings`と入力し、「基本設定：ワークスペース設定を開く (JSON) (Preferences: Open Workspace Settings (JSON))」を選択する
3.  以下のように色を設定する

```
{
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        // 見出しレベル1の設定
        "scope": "heading.1.markdown entity.name.section.markdown",
        "settings": {
          // ここに任意の色を設定する
          "foreground": "#4d85c3",
        }
      },
      // 見出しレベル2以下も同様に設定する
    ]
  },
}
```

![見出しの色を設定する](https://ics.media/entry/240523/images/240523_heading_color.jpg)

### ④プレビューの見た目を整える拡張機能

マークダウンのプレビューをGitHubのスタイルにする拡張機能「[Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)」です。

フォントサイズや行の高さ、表などの見た目が整い、プレビューが見やすくなります。見た目を整える拡張機能はいくつか種類があるので気になったものをインストールしてみてください！

#### 使い方

1.  拡張機能をインストールする
2.  VS Codeを開き直す

![プレビューをGitHubスタイルに整える](https://ics.media/entry/240523/images/240523_github_style.jpg)

#### 類似の拡張機能

-   [Markdown Preview with Bitbucket Styles](https://marketplace.visualstudio.com/items?itemName=hbrok.markdown-preview-bitbucket)
-   [Markdown Emoji](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji)
-   [Markdown+Math](https://marketplace.visualstudio.com/items?itemName=goessner.mdmath)

### ⑤プレビューの見た目をcssでカスタマイズする設定

プレビューの見た目を自分流にアレンジしたい場合は、cssを書いて設定ファイルに指定することで実現できます。

⑤の拡張機能で全体的な見た目を整えた後、細かいカスタマイズをしたい時に便利です。筆者は④で設定したマークダウンの見出しの色と、プレビューの見出しの色を揃えて確認・編集の効率をあげています。

#### 使い方

1.  スタイルを記述したcssを作成し、任意の場所に配置する（下記の例ではプロジェクトルートに配置しています）
2.  `workspace settings`と入力し、「基本設定：ワークスペース設定を開く (JSON) (Preferences: Open Workspace Settings (JSON))」を選択する
3.  `settings.json`の`markdown.styles`に作成したcssのパスを指定する

```
{
  "markdown.styles": ["style.css"],
}
```

![cssファイルでプレビューをカスタマイズする](https://ics.media/entry/240523/images/240523_custom_preview_css.jpg)

**CSSをプロジェクトルートに配置する場合は、ワークスペース設定（Workspace Settings）がオススメです。**ユーザー設定に記載すると、別プロジェクトでCSSが読み取れない警告が表示される場合があります。

### おまけ：AIにやってもらう

コーディングエージェントの普及により、マークダウンもAIに書いてもらうことが増えています。エージェントを使えば、表を段落形式にしたいなどの要求に柔軟に対応してくれます。手で修正するのが大変そうなものはAIにお願いすることも多いです。

コーディングエージェントのうち、GitHubが提供しているのが「[GitHub Copilot](https://docs.github.com/ja/copilot/using-github-copilot/getting-started-with-github-copilot)」です。Copilotを使った例を紹介します。

#### 使い方

1.  GitHub Copilotをインストールし認証する（詳細は[公式ページ](https://docs.github.com/ja/copilot/using-github-copilot/getting-started-with-github-copilot)をご確認ください）
2.  変更したい箇所を選択する
3.  ショートカットでインラインチャットを開く（Windows: `Ctrl` + `I`、Mac: `command` + `I`）
4.  チャットにやりたいことを入力する

![GitHub Copilotチャットで表に2列追加する](https://ics.media/entry/240523/images/240523_copilot_chat.gif)

### まとめ

紹介した拡張機能や設定の中に役に立ちそうなものはあったでしょうか？　ちょっとした面倒ごとや見づらさなどを拡張機能や設定で快適にして、自分好みの開発環境を整えてみてください！

### 参考サイト

-   [ExcelやGoogleスプレッドシートをMarkdown出力するVS Codeの拡張機能「Excel to Markdown table」が便利すぎる件 | DevelopersIO](https://dev.classmethod.jp/articles/excel-to-markdown-table/)
-   [Markdown editing with Visual Studio Code](https://code.visualstudio.com/docs/languages/markdown)

※この記事が公開されたのは**2年前**ですが、**先月5月**に内容をメンテナンスしています。