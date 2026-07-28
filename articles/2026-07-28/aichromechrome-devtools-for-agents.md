---
title: "AIがChromeを自分で見る時代へ。Chrome DevTools for agents入門"
source: "https://ics.media/entry/260727/"
publishedDate: "2026-07-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "yamamoto"
---

Chrome DevTools for agentsを利用すると、AIエージェントがChromeに表示された画面を確認しながらコードを修正できます。スクリーンショットやコンソール、Lighthouseを使った検証も可能です。

起動中のChromeへ接続すると、各種ウェブサービスへのログイン状態に加え、Cookie・セッションストレージ・ローカルストレージも引き継げます。 ログインが必要な管理画面も、人間が先にログインした状態からAIエージェントへ調査を任せることができます。本記事では、導入方法と実際の使い方をデモとともに紹介します。

### Chrome DevTools for agentsとは？

Chrome DevTools for agentsは、Chromeの開発者ツールをAIエージェントから利用するための技術です。次の3要素で構成されています。

-   Chromeを操作するMCP（Model Context Protocol）サーバー
-   CLI（Command Line Interface）
-   [Agentic Skills](https://github.com/ChromeDevTools/chrome-devtools-mcp/tree/main/skills)：目的に応じたツールの使い方や作業手順をAIエージェントへ伝えるスキル

※Agentic SkillsがなくてもMCPサーバーやCLIは利用できますが、導入するとブラウザー操作や接続トラブルの解決を進めやすくなります。

Chrome DevTools for agentsは、[2025年に登場したDevTools MCP](https://developer.chrome.com/blog/chrome-devtools-mcp?hl=ja)の後継技術です。2026年5月に名称を改め、バージョン1.0がリリースされました。

### Chrome DevTools for agentsでできること

Chrome DevTools for agentsでは、次のような操作や検証をAIエージェントに任せられます。

-   ページのクリックや入力
-   スクリーンショットや要素の確認
-   画面幅を変えたモバイル表示の検証
-   コンソールエラーや通信エラーの調査
-   Lighthouseの実行

利用できるツールの詳細は、[公式のツールリファレンス](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md#chrome-devtools-mcp-tool-reference)を参照してください。

### MCPサーバー？　CLI？　どちらを使うべきか

Chrome DevTools for agentsには、MCPサーバーとCLIという2つの操作方法があります。基本的にはどちらも同じように、AIエージェントがページの確認や操作、検証を行い、結果に応じて次の作業を判断できます。おもな違いは、ブラウザー操作をMCPサーバーのツールとして呼び出すか、ターミナルからコマンドとして実行するかです。

項目

MCPサーバー

CLI

AIエージェントからの利用方法

MCPサーバーが公開する型付きツールを直接呼び出す

ターミナルから`chrome-devtools`コマンドを実行する

判断と操作の繰り返し

ツールの実行結果を受け取り、次のツールを選ぶ

コマンドの実行結果を受け取り、次のコマンドを選ぶ

複数操作の実行

基本的に操作単位でツールを呼び出す

複数の操作をシェルスクリプトにまとめられる

中間結果

構造化された結果や画像をAIエージェントへ直接返せる

JSONやファイルへ保存し、必要な情報だけをAIエージェントへ返せる

スクリーンショット

画像として直接返すか、ファイルへ保存する

一時ファイルまたは指定したパスへ保存し、AIエージェントが画像を読み取る

利用できる機能

MCPサーバーが公開するツールを利用できる

基本的には同じだが、一部の機能に制限がある

### 導入手順（MCP）

導入には、Node.jsのLTS版とnpm、Chromeが必要です。詳細は[公式の導入手順](https://github.com/ChromeDevTools/chrome-devtools-mcp#getting-started)を参照ください。利用するAIエージェントごとに、次の手順でChrome DevTools MCPを導入します。

#### Claude Code

①Claude Codeを起動し、次のスラッシュコマンドを順番に実行します。はじめに、Chrome DevTools for agentsのマーケットプレイスを追加します。

```
/plugin marketplace add ChromeDevTools/chrome-devtools-mcp
```

②続いて、追加したマーケットプレイスからプラグインをインストールします。

```
/plugin install chrome-devtools-mcp@chrome-devtools-plugins
```

③このプラグインにはMCPサーバーとAgentic Skillsが含まれています。インストール後にClaude Codeを再起動すると、設定が反映されます。

#### Codex CLI

①ターミナルで次のコマンドを実行します。

```
codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
```

このコマンドはCodexへMCPサーバーを登録するもので、後述するChrome DevTools CLIの導入とは異なります。

Windowsの場合は、[公式ドキュメント](https://github.com/ChromeDevTools/chrome-devtools-mcp#mcp-client-configuration)を参照してください。

②設定を反映するため、コマンドの実行後にCodexを再起動します。

#### 動作を確認する

Claude CodeとCodexのどちらも、ここまでの設定だけで利用できます。AIエージェントへ次のように依頼して、動作を確認してみてください。

```
Chrome DevTools MCPを使って、
https://ics-creative.github.io/260727_chrome-devtools/demo/01/before/index.html を開き、
ページのタイトルを教えてください。
```

設定が正しければ、普段利用しているChromeとは別のブラウザーインスタンスが起動し、指定したページが開きます。続けて、AIエージェントからページタイトルなどの回答が返ってくれば、導入は成功です。

![](https://ics.media/entry/260727/images/260727_chrome-devtools_check.png)

#### （任意）MCPサーバーから起動中のChromeに接続する

開いているタブやログイン状態を引き継ぎたい場合は、以下の順序で設定してください。信頼できるAIエージェントでのみ使用し、機密情報の取り扱いに注意しましょう。

①Chromeで`chrome://inspect/#remote-debugging`を開き、リモートデバッグを有効にします。

![](https://ics.media/entry/260727/images/260727_chrome-devtools_flg.png)

②MCPサーバーへ`--autoConnect`を設定します。

Claude Codeでプロジェクト単位に設定するには、プロジェクト直下の`.mcp.json`ファイルへ次の内容を記述します。

```
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest", "--autoConnect"]
    }
  }
}
```

Codexの場合は、`~/.codex/config.toml`ファイルへ次の内容を記述します。

```
[mcp_servers.chrome-devtools]
command = "npx"
args = [
  "chrome-devtools-mcp@latest",
  "--autoConnect",
]
```

③AIエージェントへ操作を依頼すると接続許可のダイアログが表示されるため、内容を確認して許可してください。

![](https://ics.media/entry/260727/images/260727_chrome-devtools_dialog.png)

#### おもな設定オプション

Chrome DevTools for agentsには、起動方法や画面サイズ・利用するツールの範囲などを変更するオプションが用意されています。設定ファイルで指定する場合は、MCPサーバーの`args`へ追加します。オプションの組み合わせやすべての設定項目は、公式リポジトリの[Configuration](https://github.com/ChromeDevTools/chrome-devtools-mcp#configuration)で確認できます。

### 導入手順（CLI）

Chrome DevTools CLIは、[公式リポジトリの手順](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/cli.md#getting-started)に沿って、次のコマンドで導入できます。

```
npm i chrome-devtools-mcp@latest -g
chrome-devtools status # check if install worked.
```

インストールすると、ターミナルやAIエージェントから`chrome-devtools`コマンドを実行できるようになります。

#### （任意）Chrome DevTools CLIから起動中のChromeに接続する

CLIでも起動中のChromeへ接続できます。先ほどと同様にリモートデバッグを有効にし、次のコマンドを実行します。2026年7月現在、CLIは`--userDataDir`を省略すると`--isolated`を自動的に設定するため、`--autoConnect`とあわせて指定してください。

```
chrome-devtools start --autoConnect \
  --userDataDir="$HOME/Library/Application Support/Google/Chrome"
```

`--userDataDir`に指定するのはChrome本体ではなく、Cookieなどを保存するディレクトリです。Chromeで`chrome://version`を開き、「プロフィール パス」の親ディレクトリを確認します。保存先はOSで異なるため、Windowsを含む詳細は[Chromiumの公式ドキュメント](https://chromium.googlesource.com/chromium/src/+/main/docs/user_data_dir.md#Default-Location)を参照してください。

### デモ

ここからは、2つのデモを紹介します。ミートアップイベントを題材とした簡単な応募サイトをイメージしています。AIエージェントへ修正を依頼するときは、期待する表示や確認条件など、ゴールを具体的に伝えることが大切です。なお、デモのフォームに入力した内容は外部へ送信されません。

本記事のデモでは、CLIをベースに進めます。

#### デモ01：画面を確認し、自律的にレイアウト崩れを修正

このデモでは、AIエージェントに次の修正を実装してもらいます。

-   カードの項目の高さを揃える
-   カード幅が小さくなったら折り返し

以下は、AIエージェントが実装している様子です。動画では、AIエージェントがブラウザー幅を変更し、修正後の表示を確認しています。

▼修正前

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260727_chrome-devtools/demo/01/before/index.html)
-   [コードを確認する](https://github.com/ics-creative/260727_chrome-devtools/blob/main/demo/01/before/index.html)

▼修正後

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260727_chrome-devtools/demo/01/after/index.html)
-   [コードを確認する](https://github.com/ics-creative/260727_chrome-devtools/blob/main/demo/01/after/index.html)

以下の修正前後の比較画像ではカードの各項目の高さが合うように調整されているのが分かります。

![](https://ics.media/entry/260727/images/260727_chrome-devtools_01-01.png)

以下の画像ではカードの折り返しが問題なく実装されているのが確認できます。とくに細かい指定はしていませんが、CSSの指定で`minmax()`関数に`min()` 関数を使用して横スクロールが出ないようケアをしているのも安心感があります。

```
.plans {
  /* 子要素の幅が320pxを下回った場合でも横スクロールが発生しない。*/
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  /*...以下省略 */
}
```

![](https://ics.media/entry/260727/images/260727_chrome-devtools_01-02.png)

このデモではChrome DevTools CLIによって以下の点を自動化しています。

-   開いている対象ページの特定
-   ページのDOM構造と表示内容の確認
-   ページの再読み込み
-   ブラウザー幅の変更とモバイル表示のエミュレーション
-   要素のサイズ・位置・レイアウトの計測
-   横スクロールや要素のはみ出しの検出
-   スクリーンショットの撮影
-   PC・モバイルでの表示崩れの確認

今回のデモでは以下のプロンプトを使用しました。

```
Chrome DevTools CLIのみを使用。
開いているイベント申し込みページを確認。

・3つの参加プランは、subgridでカード内の各要素の高さを揃えるように。
・カード幅が320px未満になる場合は折り返し。
・修正後は再読み込みし、幅1280pxと375pxで表示を確認。

スクリーンショットを撮って崩れてる箇所があれば再度修正。
```

#### デモ02：フォームを自動操作し、送信時の動作を確認

このデモでは、AIエージェントに次の修正を実装してもらいます。

-   名前とメールアドレスの必須チェック
-   未入力時のエラー表示
-   送信完了を知らせるトーストUIの実装
-   有効値・無効値の全パターンでの送信テスト

以下は、AIエージェントがフォームを実装し、送信テストを行う様子です。ページから必要な要素を自ら取得し、入力から送信、結果の確認まで自律的に進めています。実装後の動作確認も任せられるため、人間がフォームを1つずつ操作して結果を伝える手間を減らせます。

▼修正前

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260727_chrome-devtools/demo/02/before/index.html)
-   [コードを確認する](https://github.com/ics-creative/260727_chrome-devtools/blob/main/demo/02/before/index.html)

▼修正後

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260727_chrome-devtools/demo/02/after/index.html)
-   [コードを確認する](https://github.com/ics-creative/260727_chrome-devtools/blob/main/demo/02/after/index.html)

修正前後の比較画像では、入力エラーと送信完了時のトーストUIを確認できます。

▼入力エラーの実装

![](https://ics.media/entry/260727/images/260727_chrome-devtools_02-01.png)

▼トーストUIの実装

![](https://ics.media/entry/260727/images/260727_chrome-devtools_02-02.png)

このデモではChrome DevTools CLIによって以下の点を自動化しています。

-   開いているページの状態を取得
-   フォームへの有効値・無効値の入力
-   各入力パターンでフォームを送信
-   エラー表示とフォーカス移動を確認
-   スクリーンショットで表示崩れを確認
-   トーストUIの表示・消去を時系列で確認
-   モバイル・デスクトップ表示を切り替えて確認
-   コンソールのエラー・警告を確認
-   問題の修正後にページを再読み込みして再検証

AIエージェントには、次のプロンプトを渡しました。

```
Chrome DevTools CLIを使用。
開いているイベント申し込みページを確認。

実装
・申し込みフォームに入力チェックを実装。
・名前とメールアドレスを必須にし、未入力時はエラーを表示。
・正しく入力された場合は、画面右上に送信完了のトーストUIを表示。
・トーストUIは右からスライドインし、3秒後に右へスライドアウト。
・サーバー通信やページ遷移は不要。
・送信後はフォームの入力値を空にする。

テスト
・実装後、有効値と無効値の全パターンでフォームを送信。
・スクリーンショットとコンソールを確認し、表示崩れやエラーがあれば再度修正。
```

#### その他のプロンプト例

今回のデモ以外にも、次のような調査や修正を依頼できます。

> コンソールエラーを確認して、原因を調べて修正してください。

> Lighthouseを実行して、スコアを下げている原因と改善方法をまとめてください。

> アクセシビリティー上の問題を調べて、対応できる箇所を修正してください。

### コラム：MCPとCLIのトークン使用量の比較

参考までに、デモ01と同じ修正と表示確認をMCPサーバーとCLIで3回ずつ実行し、消費トークンの中央値を比較しました。

指標

MCPサーバー

CLI

CLIの差

消費トークン

296,744

176,241

40.6%少ない

今回の固定タスクでは、CLIの合計トークンが約41%少なくなりました。MCPサーバーでは一連のブラウザー操作に7〜8回のツール呼び出しが発生したのに対し、CLIでは複数の操作を1〜3回のシェル呼び出しへまとめています。この結果は、CLIコマンド自体が常に軽いことではなく、操作をまとめてAIエージェントへ返す中間結果を減らせることを示しています。

※タスクの内容、処理のまとめ方、AIエージェントの進め方によって結果は変わるため、あくまで参考値としてご覧ください。以下の条件で測定した、本記事独自の結果です。

-   Codex CLI 0.145.0
-   モデル：`gpt-5.6-sol`
-   reasoning effort：`medium`
-   Chrome DevTools for agents 1.6.0

### コラム：公式情報から見るMCPサーバーとCLIの使い分け

MCPサーバーでは、AIエージェントがページ移動、クリック、入力、スクリーンショットなどのツールを直接呼び出し、結果を確認しながら操作を続けます。[公式事例](https://developer.chrome.com/blog/p2er-ui-verification-with-devtools-for-agents)でも、実際のデータや認証を伴う操作、画面の状態を確認する対話的なUI検証にMCPサーバーを使用しています。

一方、CLIは、複数の操作をスクリプトにまとめられる[トークン効率のよい選択肢](https://developer.chrome.com/blog/devtools-for-agents-v1)として紹介されています。同じ公式事例でも、長く反復的なフローではCLIへ切り替えています。

### まとめ

ブラウザー上の確認までAIエージェントに任せると、人間が画面を確認して指示する手間が減ります。その結果、HTMLコーディングや見た目の調整をスムーズに進められます。コーディングでAIが担える範囲はさらに広がるでしょう。

ブラウザーを操作する選択肢には、[Playwright MCP](https://github.com/microsoft/playwright-mcp)や[Safari MCP server](https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/)もあります。Playwright MCPは、複数のブラウザーを対象とした操作や調査、再現可能なテストに適しています。一方、Safari MCP serverは、Safari上での表示確認や互換性の検証に役立ちます。これらは競合するものではないため、対象ブラウザーや目的に応じて使い分けることが大切です。