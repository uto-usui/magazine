---
title: "VS Codeでマークダウンを快適に書きたい！ オススメの拡張機能と設定6選"
source: "https://ics.media/entry/240523/"
publishedDate: "2024-05-23"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

2024年5月23日 公開 / [株式会社ICS 北川 杏子](https://ics.media/entry/staff/kitagawa/)

ブログの文章やドキュメント作成など、さまざまなシーンで使われる記法に「マークダウン記法」があります。文字修飾の簡単さや読みやすさから使うタイミングは多々あると思いますが、みなさんは快適にマークダウンを書けていますか？

筆者はVS Codeでドキュメントをマークダウンで書くことが多く、表の作成・編集やプレビュー表示など、めんどくさい・見づらい・使いづらいと思うことがあります。どうにか快適に書けないかと思いさまざまな拡張機能や設定を試しながら業務を行ってきました。

この記事では、筆者が試した拡張機能やVS Codeの設定の中で便利だったものを紹介します。①から⑥まではすべて無料で利用できるので気軽に試してみてください！

### ①マークダウンの表をエクセルからコピペできる拡張機能

VS Codeでの表の作成に重宝しているのが「[Excel to Markdown table](https://marketplace.visualstudio.com/items?itemName=csholmq.excel-to-markdown-table)」という拡張機能です。**エクセル上の表をワンアクションでマークダウンの表に変換できます。**

列や列、文字数が多い表をエクセルで内容を整えてからマークダウンにコピペして使っています。

#### 使い方

1.  エクセルで表を作成する
2.  コピペしたい範囲を選択、コピーする（Windows: `Ctrl` + `C`、Mac: `command` + `C`）
3.  マークダウン上で貼り付けする（Windows: `Shift` + `Alt` + `V`、Mac: `shift` + `option` + `V`）

![Excel to Markdown tableで表をマークダウンに貼り付ける](https://ics.media/entry/240523/images/240523_excel_to_markdown.gif)

### ②マークダウン上での表作成・編集を支援する拡張機能

①で作った表をマークダウン上で編集したい時に便利だった拡張機能が「[Text Tables](https://marketplace.visualstudio.com/items?itemName=RomanPeshkov.vscode-text-tables)」です。

4×4など行列を指定して空の表を作ったり、`Tab`キーでセル移動をしたり、`Enter`キーで行を追加するなど、表の操作を簡単にする機能があります。

小さい表であれば①の拡張機能は使わず、これだけで表の作成・編集をすることが多いです。

#### 使い方

**4×4の表を作る場合**

1.  コマンドパレットを開く（Windows: `Ctrl` + `Shift` + `P`、Mac: `command` + `shift` + `P`）
2.  `Text Tables: Create table`を選択する
3.  行列を指定して`Enter`を押す

![Text Tablesで4×4の表を作る](https://ics.media/entry/240523/images/240523_create_table.gif)

**表の編集をする場合**

1.  コマンドパレットを開く（Windows: `Ctrl` + `Shift` + `P`、Mac: `command` + `shift` + `P`）
2.  `Text Tables: Enter table mode`を選択する
3.  `Tab`キーでセル移動、`Enter`キーで行を追加する
4.  終了したい場合はコマンドパレットから`Text Tables: Exit table mode`を選択する

![Text Tablesで表の編集をする](https://ics.media/entry/240523/images/240523_table_mode.gif)

### ③マークダウンのナビゲーションを表示する拡張機能

VS Codeではデフォルトでマークダウンの見出しを「アウトライン」に表示します。これでも十分ですが、「#」や「abc」などの余計な情報があり見づらいと感じます。

「[Markdown Navigation](https://marketplace.visualstudio.com/items?itemName=AlanWalk.markdown-navigation)」は、シンプルな表示が見やすい拡張機能です。地味ですが意外と効果があるのでぜひお手元で試してみてください。

#### 使い方

1.  拡張機能をインストールする
2.  マークダウンファイルを開くと「MARKDOWN NAVIGATION」が表示される

![VS CodeのアウトラインとMarkdown Navigationの比較](https://ics.media/entry/240523/images/240523_markdown_navigation.jpg)

### ④見出しを色分けして表示する設定

マークダウンの見出し（#や##）の表示色が設定できます。見出しのレベルをひと目で確認できるので、間違いにすぐ気付けたり文章の構造がわかりやすくなりオススメの設定です。

#### 使い方

1.  コマンドパレットを開く（Windows: `Ctrl` + `Shift` + `P`、Mac: `command` + `shift` + `P`）
2.  `settings`と入力し、「基本設定：ユーザー設定を開く (JSON) (Preferenses: Open user Settings (JSON))」を開く
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

### ⑤プレビューの見た目を整える拡張機能

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

### ⑥プレビューの見た目をcssでカスタマイズする設定

プレビューの見た目を自分流にアレンジしたい場合は、cssを書いて設定ファイルに指定することで実現できます。

⑤の拡張機能で全体的な見た目を整えた後、細かいカスタマイズをしたい時に便利です。筆者は④で設定したマークダウンの見出しの色と、プレビューの見出しの色を揃えて確認・編集の効率をあげています。

#### 使い方

1.  スタイルを記述したcssを作成し、任意の場所に配置する（下記の例ではプロジェクトルートに配置しています）
2.  `settings.json`の`markdown.styles`に作成したcssのパスを指定する

```
{
  "markdown.styles": ["style.css"],
}
```

![cssファイルでプレビューをカスタマイズする](https://ics.media/entry/240523/images/240523_custom_preview_css.jpg)

### おまけ：GitHub Copilotチャット

今やさまざまなAI関連サービスが提供されていますが、GitHubが提供しているのが「[GitHub Copilot](https://docs.github.com/ja/copilot/using-github-copilot/getting-started-with-github-copilot)」です。GitHubのアカウントが必要で有料ですが、もし機会があれば試してみてほしい機能です。

たとえば、表の1列目と2列目の間に2列追加したい、表を段落形式にしたい、などの要求に柔軟に対応してくれます。手で修正するのが大変そうなものはとりあえずチャットにお願いすることも多いです。

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