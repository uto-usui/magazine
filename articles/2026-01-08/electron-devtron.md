---
title: "Electronの開発には導入しておきたい！ 公式デバッグツールDevtron入門"
source: "https://ics.media/entry/12230/"
publishedDate: "2016-06-13"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

2016年5月11日、**米GitHub社から「[Electron 1.0](http://electron.atom.io/)」がリリースされました**（参照「[Electron 1.0 - 公式ブログより](http://electron.atom.io/blog/2016/05/11/electron-1-0)」）。合わせて周辺ツールとして、ElectronのAPIが学べるアプリの「[Electron API Demos](https://github.com/electron/electron-api-demos)」、デバッガーの拡張機能の「[Devtron 1.0（デブトロン）](http://electron.atom.io/devtron/)」、テストフレームワークの「[Spectron 3.0（スペクトロン）](http://electron.atom.io/spectron/)」が同時に公開されています。

今回は周辺ツールの中の1つ、Devtronについて紹介します。Devtronを使うと今までのElectronのデバッガーの\[Developer Tool\]本体だけでは検証しづらかった部分が可視化されデバッグできるようになりました。具体的には、「不要なコードが混入していないか」「不要なイベントを登録していないか」「バグを引き起こすプロセス間通信はいつ起こったか」「アプリに本当に必要な機能は足りているのか」といった問題を可視化できます。

この記事ではDevtronの概要、インストールの仕方、使い方について説明します。

![devtron official capture](https://ics.media/entry/12230/images/160608_devtron_official.png)

▲ 本記事で紹介する「Devtron」（公式ブログのキャプチャー）

### ElectronのデバッガーのDevtronについて

Devtronには次の4つの機能があります。

-   Require Graph（コードの依存関係の可視化）
-   Event Listeners（コア部分に登録されているイベントの可視化）
-   IPC Monitor（プロセス間通信の監視
-   Lint（アプリに必要な機能の検証）

実際に動かしている動画を撮りました。次の動画をご覧ください。

※今回はElectron v1.2.1、Devtron 1.1.2を使用し、macOS 10.11 El Capitanにて動作検証を行いました。

### Devtronをインストールしよう

ここからはDevtronをインストールする方法について説明します。DevtronはElectron上のデバッガーの拡張機能のため、すでにElectronアプリのプロジェクトがあることを前提として進めていきます（Electronのアプリ作成は記事「[初めてのElectron！ HTML5でデスクトップアプリを作成しよう](https://ics.media/entry/7298/)」を参照ください）。

1\. Electronアプリと同プロジェクトに[npm](https://www.npmjs.com/)でDevtronをインストールします。

```
npm install --save-dev devtron
```

2\. Electronアプリを起動します。

```
electron .
```

3\. \[Developer Tools\]の\[Console\]タブを開き、コンソールに次のコードを入力しエンターキーを押して実行します。

```
require("devtron").install();
```

※ Developer Toolsが起動していない場合は、\[View\]→\[Toggle Developer Tools\]から起動します。

▼ コードの入力

![devtron install](https://ics.media/entry/12230/images/160602_devtron_install.png)

▼ Enterキーで実行

![devtron installed](https://ics.media/entry/12230/images/160602_devtron_installed.png)

\[Developer Tools\]の一番右側に\[Devtron\]というタブが追加されたら成功です！

### Devtronの使い方

Devtronのインストール後、どのように使うのかを説明します。

#### 1\. Require Graph（コードの依存関係の可視化）

\[Require Graph\]のメニューでは、アプリの内部と外部のライブラリーの依存関係を可視化します。

\[Load Graph\]ボタンをクリックすると、メインプロセス、レンダラープロセスのそれぞれのJavaScriptファイルのロード順と依存関係のグラフが表示されます。

![Require Graph](https://ics.media/entry/12230/images/160602_devtron_require_graph.png)

#### 2\. Event Listeners（コア部分に登録されているイベントの可視化）

\[Event Listeners\]メニューでは、ウィンドウ、アプリケーション、およびメインとレンダラプロセスなどのコア部分に登録されたイベントリスナーを確認できます。

JavaScriptのイベントはメモリリークの原因になりやすかったり、登録箇所が特定しにくいといったことがあるので、可視化によってデバッグが便利になるでしょう。

\[Load Listeners\]ボタンをクリックすると、登録されているイベントリスナーの確認ができます。

![event listeners](https://ics.media/entry/12230/images/160602_devtron_event_listeners.png)

▲ メインプロセスで登録されているイベントの内容が確認できた。

#### 3\. IPC Monitor（プロセス間通信の監視）

\[IPC Monitor\]メニューでは「メインプロセス」と「レンダラープロセス」のプロセス間の通信を監視します。

Electronアプリではアプリの起動を行い、アプリの終了まで起動している「メインプロセス」とブラウザー側の処理を受け持ち、個別に終了可能な「レンダラープロセス」に分かれています。

たとえば、タスクトレイやシステムメニューはアプリが起動している間は管理する必要があるため、普通はメインプロセス側で管理します。そのためブラウザー側（レンダラープロセス）の処理からタスクトレイ（メインプロセス）に命令を出す場合には「IPC」というプロセス間通信の機能を使う必要があります。

次のイメージのように\[● Record\]ボタンをクリックして、「記録」状態にすると、IPCの送受信でどのような変数が渡されたかを見られます。

![](https://ics.media/entry/12230/images/160602_devtron_ipc.png)

#### 4\. Lint（アプリに必要な機能の検証）

\[Lint\]メニューでは、Electronアプリに問題や不足している機能がないかを確認できます。具体的な内容は次の5項目です。

-   最新のElectronを使用しているか
-   asar形式でアーカイブされているか
-   アプリケーションがクラッシュされた時のイベントを登録しているか
-   アプリケーションの応答が無くなった時のイベントを登録しているか
-   原因不明のエラーが発生した時のイベントを登録しているか

次のイメージでは、\[Listening for crash events」（アプリケーションがクラッシュされた時のイベントを登録しているか？）がNGとなっています。このようにNGの場合は手引きやドキュメントへのリンク、実際どのようにコードを書けばいいのかといったコードスニペットを表示してくれます。\[Lint App\]ボタンをクリックすると、アプリケーションの状態のチェックを行います。

![](https://ics.media/entry/12230/images/160602_devtron_lint.png)

### 終わりに

Devtronを使うことで、いままではなかなか検証しづらかった部分が可視化されデバッグできるようになりました。今後はより品質の高いElectronアプリが作れるでしょう。Devtronは手軽に導入できるため、Electronアプリを作成している皆さまはぜひお試しください。

次回はElectronのAPIをテストできるフレームワーク「[Spectron](http://electron.atom.io/spectron/)」について紹介します。