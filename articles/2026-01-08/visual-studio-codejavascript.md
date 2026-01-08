---
title: "Visual Studio CodeでのJavaScriptのデバッグ方法"
source: "https://ics.media/entry/11356/"
publishedDate: "2016-04-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

マイクロソフトが無償で提供しているコードエディター「[Visual Studio Code](https://www.visualstudio.com/ja-jp/products/code-vs.aspx)（略称：VS Code）」はGoogle ChromeやMicrosoft Edgeのデバッグ機能と連携できます。**VS Code上でブレークポイントを設定してコールスタックを確認したり、ステップ実行や変数のウォッチなどを行えます**。複雑なJavaScript開発を行っている方は、デバッグ機能を使うことで、効率のよい開発体験を得られるでしょう。

![](https://ics.media/entry/11356/images/220408_vscode_debug_intro.png)

本記事ではデバッグ機能を使うためのVS Codeの導入方法について説明します。

### 導入手順と前提

VS Codeにはデフォルトでデバッグ機能が搭載されています。

※2021年8月以前のVS Codeでは拡張機能「Debugger for Chrome」の導入が別途必要でしたが、今のVS Codeでは拡張機能をインストールする必要はありません。

本記事では、ウェブページのデバッグ方法として、`http://`のURLを扱う方法で説明します。昨今のウェブ制作では、localhostでウェブサーバーを立ち上げることが多いでしょう。たとえば、VS Codeの拡張機能『[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)』を使うと、HTMLファイルからローカルサーバーを手軽に立ち上げられます。

### シンプルなHTMLでデバッグを試そう

以下のHTMLファイルを題材に説明します。ボタンを押したら、単純な数値計算をするというJavaScriptが記載されています。サンプルはGitHubにて公開しています。

-   [GitHubでソースコードを確認する](https://github.com/ics-creative/220408_vscode_debug/tree/main/1_debugger_simple)

[index.html](https://github.com/ics-creative/220408_vscode_debug/blob/main/1_debugger_simple/index.html)

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <script defer src="main.js"></script>
    <!-- スタイルシートは省略 -->
  </head>

  <body>
    <div>
      <div class="form">
        <input type="number" value="1" id="num1" />
        +
        <input type="number" value="2" id="num2" /> =
        <span id="result"></span>
      </div>
      <div class="action">
        <button id="buttonExecute">計算</button>
      </div>
    </div>
  </body>
</html>
```

[main.js](https://github.com/ics-creative/220408_vscode_debug/blob/main/1_debugger_simple/main.js)

```
// DOM要素を参照
const elementButton = document.querySelector("#buttonExecute");

// イベントを登録
elementButton.addEventListener("click", update);

/** 計算し画面に結果を表示します。 */
function update() {
  // 要素を参照
  const elementNum1 = document.querySelector("#num1");
  const elementNum2 = document.querySelector("#num2");
  const elementResult = document.querySelector("#result");

  // フォーム値を取得
  const num1 = Number(elementNum1.value);
  const num2 = Number(elementNum2.value);

  // 足し算を行う
  const result = num1 + num2;

  // 画面に表示
  elementResult.innerHTML = result; // テキストを代入
}

```

ブレークポイントとは、プログラムの実行を止めたい場所のことです。JavaScriptファイルの追跡したい箇所にブレークポイントを仕込みます。ブレークポイントは行番号の箇所をクリックすることで、有効になります（赤丸が目印です）。

![](https://ics.media/entry/11356/images/220408_vscode_debug_breakpoint.png)

#### 構成ファイルの作成

サイドバーから［デバッグと実行］を選択し、`.vscode/launch.json`ファイルを作成しましょう。

![](https://ics.media/entry/11356/images/220408_vscode_debug_steps.png)

構成ファイルは、デバッグに必要な設定情報を定義したものです。見慣れない記述が多く戸惑うと思いますが、編集すべき箇所はURLのパスです。「🌟ここを編集」とコメントしている箇所に注目ください。

```
{
    // IntelliSense を使用して利用可能な属性を学べます。
    // 既存の属性の説明をホバーして表示します。
    // 詳細情報は次を確認してください: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:8080", // 🌟ここを編集
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

拡張機能「Live Server」でウェブサーバーを起動する想定で説明します。`index.html`ファイルをひらいた後、\[Go Live\]ボタンでウェブサーバーを起動します。同時に立ち上がったブラウザーのURLを確認し、`http://`からはじまるURLを記載します。このURLは実行環境で変わるため、ご自身のブラウザでURLを確認して入力ください。

![](https://ics.media/entry/11356/images/220408_vscode_debug_url.png)

[launch.json](https://github.com/ics-creative/220408_vscode_debug/blob/main/1_debugger_simple/.vscode/launch.json)

```
{
    // IntelliSense を使用して利用可能な属性を学べます。
    // 既存の属性の説明をホバーして表示します。
    // 詳細情報は次を確認してください: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://127.0.0.1:5500/index.html", // 🌟ここを編集しました
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

準備ができたので、VS Codeからデバッグしてみましょう。画面上部の実行ボタンをクリックします。

![](https://ics.media/entry/11356/images/220408_vscode_debug_steps2.png)

すると、Chromeが立ち上がります。この状態で、ウェブページ上のボタンを押してみましょう。

![](https://ics.media/entry/11356/images/220408_vscode_debug_html.png)

ウェブページ上の［計算］ボタンを押すと、VS Codeがアクティブになります。そして、`main.js`ファイルに定義した関数`update`内のコードで、止まった状態で表示されます。

![](https://ics.media/entry/11356/images/220408_vscode_debug_debugger.png)

この状態で、マウスで変数にカーソルをあわせると、ツールチップで変数の値が表示されます。

![](https://ics.media/entry/11356/images/220408_vscode_debug_hover.gif)

画面上側のUIから［↓］ボタンを押してみましょう。これは「ステップイン」というデバッグ操作で、プログラムのコードを1行だけ進めることができるボタンです。結果として19行目が実行され、変数`result`に`num1`と`num2`の加算された値が格納されます。画面左上の［変数］パネル内の変数`result`にも値`3`が入っていることを確認できます。

![](https://ics.media/entry/11356/images/220408_vscode_debug_stepin.gif)

停止するには画面上部から［□］ボタンをクリックします。

以上がVS Codeのデバッグ機能の使い方です。

### フロントエンドの開発に

TypeScriptやReactの開発にも、VS Codeのデバッグ機能が役立ちます。`sourceMaps`と`trace`を有効にすると検証できるので役立ててみるといいでしょう。

![](https://ics.media/entry/11356/images/220408_vscode_debug_typescript.png)

TypeScriptの動作サンプルは、以下のURLから確認できます。 本サンプルは、`npm run dev`コマンドを実行することで、TypeScriptの変更検知ビルドとウェブサーバーが起動する仕組みになっています。

-   [GitHubでソースコードを確認する](https://github.com/ics-creative/220408_vscode_debug/tree/main/2_debugger_typescript)

```
{
    // IntelliSense を使用して利用可能な属性を学べます。
    // 既存の属性の説明をホバーして表示します。
    // 詳細情報は次を確認してください: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000/",
            "webRoot": "${workspaceFolder}",
            "sourceMaps":true, // ソースマップを有効にする
            "trace": true, // デバッグ コンソールを取り込む
        }
    ]
}
```

### おわりに

ソースマップにも対応しているため、**圧縮されたJavaScriptファイルやTypeScriptのコードもそのままデバッグできます**。エディター上でデバッグができるため、デバッグ効率もあがり開発効率も格段にアップします。

また、**Google Chromeのデベロッパーツールでも同様のデバッグを行うことができます**。詳しくは「[ChromeのデベロッパーツールでJSをデバッグする方法(入門編)](https://ics.media/entry/190517/)」をご参照ください。

※本記事は、2025年4月時点最新のVisual Studio Code 1.99.2、Chrome 135で動作確認を行っています。

※この記事が公開されたのは**9年前**ですが、**9か月前の2025年4月**に内容をメンテナンスしています。