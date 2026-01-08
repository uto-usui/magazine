---
title: "最新版で学ぶElectron入門 - ウェブ技術でPCアプリを開発しよう"
source: "https://ics.media/entry/7298/"
publishedDate: "2015-07-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

[Electron（エレクトロン）](https://www.electronjs.org/)とは、**ウェブ技術でデスクトップアプリケーションを作成できるテクノロジー**です。HTMLとCSS、JavaScriptを使って開発し、WindowsとmacOSの両OSのアプリケーションを1つのコードから作ることができます。近年、注目度が高まっておりマイクロソフトやGitHubなど、有名企業も採用しています。

Electronエレクトロン製のアプリケーションはChromiumクロミウム（Chromeブラウザの元となるもの）とNode.jsノードジェイエスがランタイムとなっています。**ウェブコンテンツをそのままアプリケーションとして動かしたり、デスクトップアプリケーションとしてブラウザだけで実現できない機能を組み込めるのが特徴**です。

利用用途として、テキストエディターやユーティリティーソフト、デザインツールなどの小規模な使い方から、イントラネット内のクライアントツール、インスタレーションやサイネージの分野でも活用が考えられます。

本記事では、Electronエレクトロンの紹介と、**デスクトップアプリケーションを作るまでの手順**を説明します。

※本記事はElectron 35.2.1、Node.js 22を対象に解説しています

### Electronの紹介と採用事例

Electronは、Windows、macOS、Linuxのデスクトップアプリケーションを作成するためのフレームワークです。Electronを使うことで、ウェブ技術であるHTMLやCSS、JavaScriptで作ったコンテンツをデスクトップアプリケーションにできます。ワンソースでそれぞれのOS向けのアプリケーションを開発できることも魅力です。

採用事例には「[Visual Studio Code](https://code.visualstudio.com/) (Microsoft)」があります。大企業も採用していることから、導入への不安が少なくなりますね。

▼ Visual Studio Code - Microsoft社が提供しているコードエディター

![Visual Studio Code](https://ics.media/entry/7298/images/220415_electron_showcase_vscode.png)

弊社の事例としてLINEアニメスタンプが制作できる「[アニメ画像に変換する君](https://ics.media/entry/12746/)」を開発しました。[Mac App Store](https://apps.apple.com/jp/app/id1127676902)と[Microsoftストア](https://apps.microsoft.com/store/detail/%E3%82%A2%E3%83%8B%E3%83%A1%E7%94%BB%E5%83%8F%E3%81%AB%E5%A4%89%E6%8F%9B%E3%81%99%E3%82%8B%E5%90%9B/9N36KVC52ST9?hl=ja-jp&gl=jp)でElectronを公開した数少ない国内事例です。

▼アニメ画像に変換する君 - APNGやWebP画像形式に変換するツール

![アニメ画像に変換する君](https://ics.media/entry/7298/images/180531_electron_showcase_animegazou_henkansuru_kun.png)

他にもどんなアプリが作成されているのか気になったときは「[Electron Awesome](https://github.com/sindresorhus/awesome-electron)」に情報がまとまっているので、確認されるとよいでしょう。

それではデスクトップアプリケーションを実際に作りながら、開発手順を学んでいきましょう。

### Electronでデスクトップアプリを作成しよう

Electronでデスクトップアプリケーションを作成していきましょう。あらかじめ準備しておく必要があるのは、macOSかWindowsのパソコンのみ。操作にはOSにもともとに入っているコマンドラインツールを使います。

また、今回のサンプルはGitHubにて公開しています。手順がわからなければダウンロードして参考にしてください。

-   [サンプルファイルを確認する](https://github.com/ics-creative/180302_electron_tutorial)

#### 1\. Node.jsのインストール

Electronを開発するためには「[Node Package Manager(npm)](https://www.npmjs.com/)」が必要となるため、まずは「[Node.js](https://nodejs.org/ja/download)」をインストールしましょう。Node.jsをインストールすれば、`npm`コマンドが使用可能となります。

![Node.jsのダウンロード](https://ics.media/entry/7298/images/250428_electron_nodejs.png)

▲Node.jsは公式サイトから無料でダウンロード可能

#### 2\. プロジェクトフォルダーの作成

任意のフォルダー（ここでは`sample-electron`フォルダーとします）を作成し、コマンドライン（Windowsではコマンドプロンプト、macOSではターミナル）を立ち上げ、以下のコマンドを実行します。このコマンドを実行すると`package.json`ファイルが作成されます。

```
npm init -y
```

▼出力例

```
{
  "name": "electron-sample",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

#### 3\. Electronのインストール

次にElectronをローカルにインストールします。ここで`node_modules`フォルダと`package-lock.json`ファイルが同時に作成されます。

```
npm install -D electron
```

![](https://ics.media/entry/7298/images/250428_electron_npm_init.png)

※Electronを`-g`オプションを使ってグローバルにインストールするよう説明している解説記事もありますが、オススメできません。グローバルにインストールするとプロジェクト（案件）ごとに異なるElectronのバージョンが使えなかったり、開発者間でElectronのバージョンが異なるといったリスクが考えられます。環境構築はプロジェクトフォルダー単位で構築するのがいいでしょう。

#### 4\. アプリケーション実行用のファイルの用意

アプリケーションを作成するために、`package.json`の編集と3つのファイルを用意します。以下にて、それぞれどのようなファイルなのかを説明します。

![](https://ics.media/entry/7298/images/250428_electron_npm_src.png)

`package.json`はElectronの実行に必要なファイルです。`package.json`を書き換え、エントリーポイントとなるJavaScriptのファイル名を指定します。

▼ `package.json`ファイル

```
{
  "name": "electron-sample",
  "version": "1.0.0",
  "main": "main.js", // ⭐️エントリーファイルの"main.js"に書き換えます
  ...
}
```

※ jsonファイルにはコメントは含められないので、//以降は記入しないでください

`main.js`はエントリーポイント（アプリケーションの実行開始場所）となるJavaScriptファイルです。ここからアプリケーションのウィンドウを開く実装を行っていきます。

▼ `main.js`ファイル

```
// アプリケーション作成用のモジュールを読み込み
const { app, BrowserWindow } = require("electron/main")
const path = require("node:path")

// メインウィンドウ
let mainWindow;

const createWindow = () => {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
      // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできます。
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // メインウィンドウに表示するURLを指定します
  // （今回はmain.jsと同じディレクトリのindex.html）
  mainWindow.loadFile("index.html");

  // デベロッパーツールの起動
  mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

//  初期化が完了した時の処理
app.whenReady().then(() => {
  createWindow();

  // アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
  app.on("activate", () => {
    // メインウィンドウが消えている場合は再度メインウィンドウを作成する
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 全てのウィンドウが閉じたときの処理
app.on("window-all-closed", () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

メインウィンドウとして開くHTMLファイルを用意いします。`main.js`でメインウィンドウとして`index.html`ファイルを指定しています。

▼ `index.html`ファイル

```
<html>
<head>
  <meta charset="UTF-8"/>
  <!-- https://developer.mozilla.org/ja/docs/Web/HTTP/CSP -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'"/>
  <title>初めてのElectron</title>
</head>

<body>
<h1>初めてのElectron</h1>
  <p>
    We are using Node.js <span id="node-version"></span>,<br />
    Chromium <span id="chrome-version"></span>,<br />
    and Electron <span id="electron-version"></span>.
  </p>
</body>
</html>
```

Electronはメインプロセスとレンダラープロセスの2つがあり、画面側のレンダラープロセスからは自由にElectronのAPIを実行することができません。プリロードスクリプトはその課題を解決する手段のひとつです。

プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行されレンダラーのグローバル（`window`や`document`など）とNode.js環境の両方にアクセスできます。

▼ `preload.js`ファイル

```
// Node.jsのすべてのAPIがプリロード処理で利用可能です。
// Chromeの拡張機能と同じサンドボックスを持っています。
window.addEventListener("DOMContentLoaded", () => {
  // DOM要素のテキストを変更します
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.textContent = text;
    }
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    // HTMLページ内の文言を差し替えます
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
```

たくさんファイルを作成しましたが、ここでフォルダーを再確認しておきましょう。

![Electronにおけるpackage.jsonファイルの役割](https://ics.media/entry/7298/images/250428_electron_samples.png)

#### 5\. アプリケーションの実行

上記のファイルが配置してあるフォルダー（本記事では`sample-electron`フォルダー）にコマンドラインで移動しましょう。次にコマンドラインから`electron`コマンドを実行します。成功するとアプリケーションとしてHTMLが表示されます。

![Electronコマンドの入力方法](https://ics.media/entry/7298/images/250428_electron_command.png)

①フォルダーを移動するコマンドを入力

```
cd プロジェクトフォルダーへのパス
```

②実行するコマンドを入力

```
npx electron .
```

![Electronコマンド実行後の画面](https://ics.media/entry/7298/images/220415_electron_launch.png)

#### 6\. パッケージング

ここまでの手順でHTMLをアプリケーションとして実行することが可能となりました。他の人へアプリとして配布するには`.exe`ファイルや`.app`ファイルにするためのパッケージング作業が必要となります。 アプリケーションのパッケージングには「[Electron Forge](https://www.electronforge.io/)」を使用すると簡単です。

1.  コマンドラインを立ち上げ、以下のコマンドを実行して`Electron Forge`のCLIツールをインストールします。

```
npm install -D @electron-forge/cli
```

2.  Electron Forgeに関わる設定やモジュールを取り込み、インストールします。

```
npx electron-forge import
```

3.  パッケージングを実行します。

```
npm run make
```

※ その他パラメーター・詳しい使い方は「[Electron Forge公式ページ](https://www.electronforge.io/)」をご参照ください。

4.  パッケージングに成功すると、プラットフォームごとにアプリケーションが作成されます。配布するときはこのフォルダーをZIPファイルに圧縮して提供するといいでしょう。

![アプリ作成完了](https://ics.media/entry/7298/images/250428_electron_firstapp.png)

### 開発TIPS: コマンドはnpm scriptsに書くのがオススメ

`npx electron-forge import`を実行すると、`package.json`内の`scripts`セクションが自動で次のように更新されます。このnpm scriptsはコマンドのショートカットとして機能し、複雑なオプションを毎回入力せずに済むうえ、どんなコマンドが用意されているかを一覧できます。

▼package.json

```
{
  ...略...
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  },
  ...略...
}
```

このscriptsは`npm run start`のように実行できます。さらに Visual Studio CodeやWebStormなどのエディターでも、GUI上でワンクリックで実行できるため開発効率が向上します。npm scriptsの使い方は記事「[Node.jsユーザーなら押さえておきたいnpm-scriptsのタスク実行方法まとめ](https://ics.media/entry/12226/)」に詳しくまとめています。

### おまけ - デバッグ方法

Chromiumクロミウムをベースとしているため、「Chrome Developer Tools」を使用できます。`electron`コマンドで実行した場合のメニューから\[View\]→\[Toggle Developer Tools\]を選択することでDevToolの表示を切り替えられます。

![Electronのデバッグ画面](https://ics.media/entry/7298/images/220415_electron_debug.png)

はじめて起動した場合、アプリケーションのウィンドウ内部にDeveloper Toolsが表示されて不便なので、右上の切り替えアイコンを長押しして別ウィンドウモードに切り替えておきましょう。また、詳しい使い方は「[Chrome DevTools Overview](https://developer.chrome.com/docs/devtools/)」を確認すると良いでしょう。

### まとめ

アプリケーション化まであっけなく実行できたのではないでしょうか。Electronを使用すればデスクトップアプリケーションをサクッと作れます。解説は続編記事「[ファイル保存可能なテキストエディターを自作しよう](https://ics.media/entry/8401/) 」へ続きます。メインプロセスとレンダラープロセス間の通信や、Node.js側の機能を利用する方法を説明しています。

#### 参考情報：類似技術との比較から見えてくるElectronの利点

Electron以外にもさまざまなデスクトップアプリケーション用のフレームワークがあります。簡単な比較用の表を作成したのでご確認ください。

名前

対応プラットフォーム

言語等

ランタイム

費用

[Electron](https://www.electronjs.org/)

Windows / macOS / Linux

Node.js + HTML (※1)

内蔵 (Chromium)

無償

[NW.js](https://nwjs.io/)

Windows / macOS / Linux

Node.js + HTML (※1)

内蔵 (Chromium)

無償

[Cordova](https://cordova.apache.org/)

Windows / iOS / Android

JavaScript + HTML

不要 (OS提供のブラウザー)

無償

[旧Adobe AIR](https://help.adobe.com/ja_JP/air/build/index.html)

Windows / macOS / iOS / Android

JavaScript + HTML (※2) / ActionScript

内蔵可 (Adobe AIR)

無償

[Qt](https://doc.qt.io/)

Windows / macOS / Linux / iOS / Android

C++ / QML

不要

有償プラン有り

※1 ChromiumのBlinkエンジン ※2 Webkitエンジン

HTMLやJavaScriptでデスクトップアプリを開発できるフレームワークはいくつかあります。ElectronエレクトロンやNW.jsはChromiumクロミウムをベースとしているため、ブラウザ依存を気にせず最新のウェブ技術を使用できます。**ウェブ技術者にとっては今まで作成してきた資産を再利用できるでしょう**。

この表だとElectronとNW.jsはまったく同じに見えますが、ElectronはJavaScriptファイルがエントリーポイントのためHTMLファイルを用意しなくても実行できる点でNW.jsとの違いがあります。