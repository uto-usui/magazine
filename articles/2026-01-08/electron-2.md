---
title: "Electron入門 - ファイル保存可能なテキストエディターを自作しよう"
source: "https://ics.media/entry/8401/"
publishedDate: "2015-08-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

前回の記事「[Electron入門](https://ics.media/entry/7298/)」では、[Electron](https://www.electronjs.org/)というHTML/JavaScriptのフレームワークを使って、デスクトップアプリケーションを作成するまでの手順を紹介しました。

今回は応用サンプルとしてテキストエディターの作り方を解説します。テキストエディターを作成することで、Node.jsのファイルの読み込み/書き込みや、ダイアログモジュールなど**アプリケーション開発で必須となるElectronの技術を習得できます**。30分程度で試せる内容になってますので、ぜひご覧ください。

※本記事はElectron v18を使用し、macOS 12.3 MontereyおよびWindows 10にて動作検証を行いました。

### 完成デモの紹介

今回のサンプルのテキストエディターのデモをご覧ください。このオリジナルのテキストエディターではテキストの編集ができ、ファイルの読み書きができます。このテキストエディターを一緒に作っていきましょう。

※動画内のソースコードやエディターは、昔のコードなので少し異なりますが、手順や動作自体は現行版と変わりありません。

デモのソースコードはGitHubで公開してます。この記事では要点のみ説明しているので、詳しい内容はソースコードを参照してください。

-   [GitHub（ics-creative/150819\_electron\_text\_editor）](https://github.com/ics-creative/150819_electron_text_editor)

### テキストエディターを作ってみよう！

#### 1\. ファイル構成

本デモは以下のファイル構成になっています。

![Electronのファイル構成](https://ics.media/entry/8401/images/220414_electron_editor_folder.png)

主に記事内で説明するのは、画面構成用の`index.html`、UI側の処理（レンダラープロセス）の`renderer.js`、レンダラープロセスとメインプロセスの橋渡しの`preload.js`、そしてメインプロセスの`main.js`です。Ace.jsは公式サイトよりダウンロードして利用します。

#### レンダラープロセスとメインプロセスの連携方法

Electronではレンダラープロセス（画面側のJavaScript）では、Node.jsやElectronのAPIを呼び出せません。それらは、メインプロセスからしか使えないため、レンダラープロセスからバケツリレーしてAPIを呼び出す必要があります。

![](https://ics.media/entry/8401/images/220414_electron_editor_process.png)

以下に、要点として該当するコードを列挙します。

▼ メインプロセスである `main.js` ファイル抜粋

```
// メインウィンドウを作成します
mainWindow = new BrowserWindow({
  width: 800,
  height: 540,
  webPreferences: {
    // preload.js を指定
    preload: path.join(app.getAppPath(), "./preload.js"),
  },
});

// レンダラープロセスとの連携
ipcMain.handle("openFile", openFile);
ipcMain.handle("saveFile", saveFile);
```

▼ 中継点の `preload.js` ファイル抜粋

```
const { contextBridge, ipcRenderer } = require("electron");

// レンダラープロセスのグローバル空間(window)にAPIとしての関数を生やします。
// レンダラープロセスとメインプロセスの橋渡しを行います。
contextBridge.exposeInMainWorld("myApp", {
  /**
   * 【プリロード（中継）】ファイルを開きます。
   */
  async openFile() {
    // ･･･（抜粋）
  },

  /**
   * 【プリロード（中継）】ファイルを保存します。
   */
  async saveFile(/* 抜粋 */) {
    // ･･･（抜粋）
  },
});
```

▼ レンダラープロセスである `renderer.js` ファイル抜粋

```
// レンダラープロセスから、preload.jsを経由し、メインプロセスを呼び出し、結果を得る
const result = await window.myApp.openFile();
```

```
// レンダラープロセスから、preload.jsを経由し、メインプロセスを呼び出し、結果を得る
const result = await window.myApp.saveFile(/* 抜粋 */);
```

#### 2\. 画面構成

今回作成したテキストエディターは、［保存する］ボタン・［読み込む］ボタン・［テキスト入力領域］・［フッター］と4つの部品で構成されています。

![Electron Text Editorのイメージ](https://ics.media/entry/8401/images/220414_electron_editor_ui.png)

▼ `index.html` ファイル

```
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>Electron Text Editor</title>

    <!-- セキュリティーポリシーを指定。Aceライブラリがインラインスタイルを扱うため。 -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; style-src 'self' 'unsafe-inline';"
    />

    <link href="main.css" rel="stylesheet" />
    <script defer src="libs/ace/1.4.14/ace.js"></script>
    <script defer src="libs/ace/1.4.14/theme-twilight.js"></script>
    <script defer src="renderer.js"></script>
  </head>
  <body>
    <header class="header">
      <button class="btn-primary" id="btnOpen">読み込む</button>
      <button class="btn-primary" id="btnSave">保存する</button>
    </header>
    <!-- Aceエディター -->
    <div id="inputArea"></div>
    <footer class="footer"></footer>
  </body>
</html>
```

※メタタグの`Content-Security-Policy`の箇所は、指定しなくても動作します。未指定だとコンソールパネルにElectronのセキュリティー警告が表示されます。ただ、中途半端に誤った指定をするとファイルを読み込めなくなるので、都合が悪いようであれば、開発中は未指定のほうが開発しやすいかもしれません。

#### 3\. テキストエディターライブラリを組み込む

テキスト入力部分には、[Ace](https://ace.c9.io/)というライブラリを使用しました。AceはJavaScriptライブラリで、テキストのシンタックスハイライト、シンタックスチェック、自動補完、タブインデント、入力文字の「やり直し」や「元に戻す」が行える履歴保持機能、文字列の検索などができます。

Aceを使用するには以下のコードで読み込みます。`ace.js`がメインのファイル、`theme-twilight.js`がカラーテーマ用のファイルです。

▼ `index.html`ファイルの該当箇所の抜粋

```
<script defer src="libs/ace/1.4.14/ace.js"></script>
<script defer src="libs/ace/1.4.14/theme-twilight.js"></script>
```

次に入力エリアを作成します。`ace.edit()`関数に入力エリアとなる`div`要素の`id`属性を引数で渡し、戻り値として入力エリアを操作するためのeditor変数を獲得します。`editor.setTheme()`関数でカラーテーマを設定しています。

▼ `renderer.js` ファイルの該当箇所の抜粋

```
const editor = ace.edit("inputArea");
editor.setTheme("ace/theme/twilight");
```

※Aceで設定できる詳しいパラメーターは「[Ace - How-To Guid](https://ace.c9.io/#nav=howto)」や「[Ace - API Reference](https://ace.c9.io/#nav=api)」をご参照ください。

#### 4\. ［ファイル選択］ダイアログを使用して、読み込み先ファイルを選択する

［読み込み］ボタンを押した時に`openFile()`関数が呼ばれます。この関数内で`dialog`モジュールの[showOpenDialog()](https://www.electronjs.org/ja/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options)関数を使用して、現在開いているブラウザウィンドウから［ファイル選択］ダイアログを開きます。

レンダラープロセスから、ElectronやNode.jsのAPIを直接呼び出せないことに注意してください。レンダラープロセスの`renderer.js`から、`preload.js`を経由して、メインプロセスの`main.js`の関数を実行しています。ややこしい実装となっていますが、Electronのセキュリティーポリシーから推奨されている作り方なので、そういうものだとご理解ください。

`showOpenDialog()`メソッドに関しては、第1引数には現在フォーカスされているウィンドウ、第2引数にダイアログのオプションを指定します。ダイアログでファイルが選択されると非同期でファイルパスの配列が渡されます。

▼ `renderer.js` ファイルの該当箇所の抜粋

```
const electron = require("electron");
const { BrowserWindow, ipcMain, dialog } = electron;

// レンダラープロセスとの連携
ipcMain.handle("openFile", openFile);

/**
 * 【メインプロセス】ファイルを開きます。
 * @returns {Promise<null|{textData: string, filePath: string}>}
 */
async function openFile() {
  const win = BrowserWindow.getFocusedWindow();

  const result = await dialog.showOpenDialog(
    win,
    // どんなダイアログを出すかを指定するプロパティ
    {
      properties: ["openFile"],
      filters: [
        {
          name: "Documents",
          // 読み込み可能な拡張子を指定
          extensions: ["txt", "html", "md", "js", "ts"],
        },
      ],
    }
  );

  // [ファイル選択]ダイアログが閉じられた後の処理
  if (result.filePaths.length > 0) {
    const filePath = result.filePaths[0];

    // テキストファイルを読み込む
    const textData = fs.readFileSync(filePath, "utf8");
    // ファイルパスとテキストデータを返却
    return {
      filePath,
      textData,
    };
  }
  // ファイル選択ダイアログで何も選択しなかった場合は、nullを返しておく
  return null;
}
```

#### 5\. ファイル内容を読み込む

`fs`モジュールを`require()`関数で獲得し、`fs`モジュールの[readFileSync()](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)関数からファイルの内容を読み込みます。

第1引数で読み込みパス、第2引数でオプション（文字コード）を指定します。

▼ `main.js` ファイルの該当箇所の抜粋

```
// テキストファイルを読み込む
const textData = fs.readFileSync(filePath, "utf8");
```

レンダラープロセスでは、メインプロセスでえたテキストデータをもとに、Aceエディターに文字列を代入します。`editor.setValue()`関数の第1引数で文字列を設定し、第2引数でカーソルの位置を設定します。

※ `-1`と入れるとテキストの開始地点へ移動し、1とするとテキストの終了位置に移動します。

▼ `renderer.js` ファイルの該当箇所の抜粋

```
// レンダラープロセスから、preload.jsを経由し、メインプロセスを呼び出し、結果を得る
const result = await window.myApp.openFile();

if (result) {
  const { filePath, textData } = result;

  // フッター部分に読み込み先のパスを設定する
  footerArea.textContent = currentPath = filePath;
  // テキスト入力エリアに設定する
  editor.setValue(textData, -1);
}
```

#### 6\. ［メッセージ］ダイアログを使用して、保存確認をする

［保存する］ボタンをおしたら、レンダラープロセスの`saveFile()`を呼び出し、Aceエディターに設定されている文字列を`editor.getEditor()`関数で取得します。

その文字列は、レンダラープロセスの`saveFile()`関数 → `preload.js`の`saveFile()`関数 → メインプロセスの `saveFile()`関数と順番にバケツリレーを行い、メインプロセスの`main.js`でファイル保存を行います。

ファイル保存は、`fs.writeFileSync()`関数を呼び出します。

`fs.writeFileSync()`関数には現在開いているファイルのパスと、テキストエディターに設定されている文字列を引数に指定します。

▼ `main.js` ファイルの該当箇所の抜粋

```

/**
 * 【メインプロセス】ファイルを保存します。
 * @param event
 * @param {string} currentPath 現在編集中のファイルのパス
 * @param {string} textData テキストデータ
 * @returns {Promise<{filePath: string} | void>} 保存したファイルのパス
 */
async function saveFile(event, currentPath, textData) {
  let saveFilePath;

  //　初期の入力エリアに設定されたテキストを保存しようとしたときは新規ファイルを作成する
  if (currentPath) {
    saveFilePath = currentPath;
  } else {
    const win = BrowserWindow.getFocusedWindow();
    // 新規ファイル保存の場合はダイアログをだし、ファイル名をユーザーに決定してもらう
    const result = await dialog.showSaveDialog(
      win,
      // どんなダイアログを出すかを指定するプロパティ
      {
        properties: ["openFile"],
        filters: [
          {
            name: "Documents",
            extensions: ["txt", "html", "md", "js", "ts"],
          },
        ],
      }
    );
    // キャンセルした場合
    if (result.canceled) {
      // 処理を中断
      return;
    }
    saveFilePath = result.filePath;
  }

  // ファイルを保存
  fs.writeFileSync(saveFilePath, textData);

  return { filePath: saveFilePath };
}
```

#### 7\. ファイルへ書き込む

`fs`モジュールの[fs.writeFileSync](https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options)関数でファイルを保存します。

第1引数で保存先のパス、第2引数で書き込むデータを指定します。

▼ `main.js` ファイルの該当箇所の抜粋

```
// ファイルを保存
fs.writeFileSync(saveFilePath, textData);
```

### 終わりに

アプリケーション開発で必須となるファイル入出力やダイアログ表示について、理解できましたでしょうか？　みなさんもぜひ素敵なアプリケーションを作成してみてくださいね。