---
title: "Node.jsとSocket.IOによるPCとスマホブラウザのペアリングデモ"
source: "https://ics.media/entry/4320/"
publishedDate: "2014-12-22"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

リアルタイムなデータ通信はインタラクティブなwebコンテンツには不可欠の要素です。今回は**リアルタイムなデータ通信を簡単にしてくれる[Socket.IO](https://socket.io/)**を使って**パソコンとスマホがペアリングするコンテンツ**を作りました。Socket.IOの簡単な解説と共に紹介します。まずは次のデモをご覧ください。

※ ファイアーウォールの設定によっては閲覧できない可能性があります。デモ動画も御覧ください。

-   [別画面でデモを再生する](https://kanosocket.herokuapp.com/)
-   [サーバーサイドのソースコード(Node.js)](https://github.com/ics-creative/141223_nodejs_socketio/blob/master/demo/server.js)
-   [サーバーサイドのJavaScriptを含む全ソースコード](https://github.com/ics-creative/141223_nodejs_socketio/tree/master/demo)

※ 全ソースコードをダウンロードし展開後のフォルダーにてコマンドラインで`node server`を実行後、[http://localhost:5000](http://localhost:5000/)にアクセスするとローカル環境でもデモを確認できます。

### デモについて

デモページにアクセスするとURLとペアリングコードが表示されます。以下、この画面をメイン画面と呼びます。指定のURLにスマホブラウザ等の別クライアント（ブラウザの別タブ、他の端末のブラウザ等。以下、コントローラーと呼びます）でアクセスしてペアリングコードを入力するとその2つのクライアントが連携します。**フリックするとメイン画面でパーティクルが発生**します。また、1つのペアリングコードを使って**複数のメイン画面をコントロールすることも可能**です。

### [リアルタイムWebの実現とSocket.IO](http://xn--websocket-de4h9bz9a0a19aqq6esa7987q50yd.io/)

web上においてリアルタイムの通信を実現するには、[WebSocket](https://ja.wikipedia.org/wiki/WebSocket "WebSocket")や[Comet](https://ja.wikipedia.org/wiki/Comet)といった技術があり、ブラウザによってその実装状況やAPIもさまざまです。**Socket.IOはこれらのさまざまな実装の差異を吸収し統一されたAPIで使えるようにしたNode.jsの技術**です。Node.jsとSocket.IOで構築されたwebサーバーにクライアントがwebブラウザを使ってアクセスすると、サーバーとリアルタイムにデータを送受信できるようになります。開発者は**ブラウザ間の実装の差異を意識することなくリアルタイムな通信処理を実現**できます。

![](https://ics.media/entry/4320/images/socket_sample1644.png)

### Node.jsとhttpサーバー、Socket.IOの準備

ここからはSocket.IOの簡単な使い方について説明します。まず、Socket.IOを使用するにはNode.jsが必要なので[公式サイト](https://nodejs.org/en/download)よりインストーラーをダウンロードし手順にしたがってインストールしてください。インストール後、コマンドラインにて`node -v`と実行し、Nodeのバージョンが表示されていればインストール成功です。

![Node.jsインストール画面](https://ics.media/entry/4320/images/de6b41c014a27c32c7348d5239cf9287.png)

つづいて、Node.jsが動作するhttpサーバーを準備します。もしお手元にNode.jsのhttpサーバーが存在しない場合は下記のファイルを使用ください。Node.jsの[httpモジュール](http://nodejs.org/api/http.html)と[fsモジュール](http://nodejs.org/api/fs.html)を使ったシンプルなhttpサーバーです。Node.jsの処理は`server.js`ファイルに記述してあります。

-   [Node.jsで作られたhttpサーバー(zip)](https://github.com/ics-creative/141223_nodejs_socketio/tree/master/sample_server)

上記をダウンロードして展開しコマンドラインでそのフォルダーに移動して`node`（サーバーサイドのJavaScriptのスクリプト名）を実行すると[http://localhost:5000](http://localhost:5000/)にてローカルサーバーが起動します。今回のデモは`server.js`ファイルがサーバーサイドのスクリプト名なので、`node server`と実行します。Socket.IOはもちろん、**Node.jsを試してみたい場合はこの`server.js`ファイルに処理を追記すると便利**です。

※ ファイアーウォールの設定によっては5000ポートでは起動できない場合があります。  
※ 今回はサーバーサイドのJavaScriptとクライアントのファイルをすべてルート直下に配置します。

【コマンドライン】

```
// Windows での移動
cd C:¥Users¥MyName¥sample_server
// もしくは macOS での移動
cd /Users/MyName/sample_server
// httpサーバーの起動
node server
```

Socket.IOは以下のコマンドでインストールできます。今回使用したSocket.IOのバージョンは記事メンテナンス時点（2018年6月現在）の最新バージョンである2.1.1です。

【コマンドライン】

```
// Socket.IOのインストールコマンド
npm install socket.io
```

### Socket.IOの使い方

#### サーバー側での処理

Node.jsで立てられたhttpサーバーが`server`オブジェクトに格納されているとします。このhttpサーバーでSoclet.IOを使うには以下のようにします。

【サーバー側のJavaScript】

```
// socket.ioの読み込み
const socketIO = require("socket.io");
// サーバーでSocket.IOを使える状態にする
const io = socketIO.listen(server);
```

このNode.jsが動いているサーバーに**クライアントのアクセスがあった場合、`io.sockets`の`connection`イベントが発生**します。**この時発行される`socket`オブジェクトを使ってクライアントとのデータのやりとりをします**。コードの例として、`dataName1`という名前で`{ hoge : 1 }`というデータをクライアントに送信し、`dataName2`という名前の`{ fuga : "piyo" }`というデータをクライアントから受信するコードを紹介します。

【サーバー側のJavaScript】

```
// サーバーへのアクセスを監視。アクセスがあったらコールバックが実行
io.sockets.on("connection", socket => {
  const dataToClient = { hoge: 1 }; // クライアントに送信するデータ例
  // 接続元のクライアントだけにデータ送信。
  socket.emit("dataName1", dataToClient);
  // 接続元のクライアント以外にデータ送信
  socket.broadcast.emit("dataName1", dataToClient);

  // クライアントからのデータの受信
  socket.on("dataName2", function(dataFromClient) {
    // 「piyo」という文字列がターミナルに出力される。
    console.log(dataFromClient.fuga);
  });
});
```

#### クライアント側でSocket.IOを使う

まず、**クライアント側からSocket.IOを扱う為のJavaScriptである`socket.io.js`ファイルを読み込みます**。socket.io.jsはサーバー側で`socketIO.listen（server）`（上記参照）を実行すると自動的に用意されるJavaScriptで、`（サーバーのURL）/socket.io/socket.io.js`の場所に用意されます。

【HTMLコード】

```
<script src="/socket.io/socket.io.js"></script>
<script src="/js/main.js"></script>
```

Socket.IOを使ってサーバーと接続するには`io.connect()`メソッドを使います。**ここで生成される`socket`オブジェクトを使ってサーバー側とデータをやりとりします**。`dataName2`という名前で`{ fuga : "piyo" }`というデータをサーバーに送信し、`dataName1`という名前の`{ hoge : 1 }`というデータをサーバーから受信するコードの例を紹介します。サーバー側のAPIと見比べるとわかるように、**サーバー側とクライアント側のAPIは共通**しており扱いやすいものとなっています。

【クライアント側のJavaScript main.js】

```
// サーバーに接続
const socket = io.connect(location.origin);
// サーバーへデータを送信
socket.emit("dataName2", { fuga: "piyo" });
// サーバーからのデータを受信
socket.on("dataName1", dataFromServer => {
  // 「1」という数値がブラウザのコンソールに出力される。
  console.log(dataFromServer.hoge);
});
```

#### 上記コードのデモ

-   [Socket.IOのデモ(zip)](https://github.com/ics-creative/141223_nodejs_socketio/tree/master/SocketIOTest)

説明したコードを記述した簡単なSocket.IOのデモを準備しました。上記ファイルをダウンロードして展開したファルダに移動して、コマンドラインで`node server`を実行してみてください。ブラウザのコンソールに`1`、コマンドラインに`fuga`が表示されていることが確認できます。

### ペアリングを行う

今回のデモでは、メイン画面側はクライアントAがアクセスしてきた際にランダムなコードを発行します。コントローラーでそのコードを入力するとクライアントAとクライアントBがサーバー側で同じグループに分けられます。その**同じグループ間でのみデータを送受信**することで、ペアリングを実現しています。Socket.IOには、**アクセス中のクライアントをグループ化し通信処理を分けるroom機能**があります。

![room機能説明](https://ics.media/entry/4320/images/55d92aaf11c2555cc77b3164989c3cbc.png)

`socket.join("ルームID")`を実行することでそのクライアントは指定されたグループ（ルームと呼ぶ）に所属している状態になります。クライアントからサーバーへデータを送信する際、送信先のグループを指定することで**任意のグループにのみデータを送信**できます。

【サーバー側クライアント側共通のJavaScript記述】

```
const data = { hoge: 1 }; // 送信データ例
// roomIDのグループ(ルーム)に入れる
socket.join("roomID");
// roomIDにデータを送信する
socket.to("roomID").emit("someData", data);
```

### PaaS「Heroku」を使ってリモートサーバー公開

Node.jsのコンテンツをリモートサーバーで確認するにはそのコンテンツを実行するための環境が必要です。自前で準備するのは大変なので、その**実行環境を提供してくれるサービスPaaS(Platform as a Service)を使うと便利**です。今回は[SalesforceのHeroku](https://www.heroku.com/)を使いました。Herokuの使い方やPaaSの説明は下記をご参照ください。公式ドキュメントにてHerokuでの公開手順がわかりやすく説明されています。

-   [PaaSの基礎知識とHerokuで開発を始める準備(CodeZine)](https://codezine.jp/article/detail/8051)
-   [Getting Started with Node.js on Heroku(公式ドキュメント)](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

### 最後に

今回のSocket.IOを使ったサーバーとクライアント間のリアルタイムなデータ通信を使うと**フロントエンドだけでは実現できない表現が可能**になります。サーバーサイドにNode.jsを使用することでフロントエンドエンジニアにとっては**使い慣れたJavaScriptで1つのコンテンツ制作を完結させられます**。是非お試しください。