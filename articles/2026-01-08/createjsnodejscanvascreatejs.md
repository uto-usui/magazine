---
title: "CreateJSとNode.jsを使ってサーバーサイドでCanvasを扱おう―CreateJS勉強会"
source: "https://ics.media/entry/5192/"
publishedDate: "2015-02-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

HTML5 Canvasのフレームワーク「[CreateJS](http://createjs.com/)」(基本的な使い方は[入門サイト](https://ics.media/tutorial-createjs/)をご覧ください）について、2015年2月10日に開催された[CreateJS勉強会 (第5回)](https://atnd.org/events/61440) でライトニングトーク「CreateJSとNode.jsを使ってサーバーでCanvas要素を使おう」を発表しました。今回はそのスライドを元に、サーバーサイドでCreateJSを使うメリットを紹介します。

### デモ

今回紹介する**node-easel**を使ったデモです。スマホ画面にTwitterのアイコンが、PC画面には白い矩形が表示されています。スマホで選んだTwitterのユーザーのアイコンがPC側でアニメーションします。**画像加工はサーバーサイドで動くCreateJSを使って行われています**。

### Section1. Node.jsとモジュールについて

**Node.jsはブラウザではなくサーバーサイドで動くJavaScriptで**、手軽にhttpサーバーを立てたりファイルの読み書きができます。Node.jsにおけるさまざまな処理はモジュールという単位に分けられていて、httpサーバーを立てるための[httpモジュール](http://nodejs.jp/nodejs.org_ja/api/http.html)、リアルタイムなWebコンテンツを作るための[Socket.IO](http://socket.io/)等があります。今回はその中の**Node.jsでCanvasを扱うためのモジュールとCreateJSを扱うためのモジュール**を使います。なお、インストール方法やモジュールについては記事「[TypeScriptで始めるNode.js/io.js入門](https://ics.media/entry/4682/)」で詳しく解説してあります。

![Node.jsでCreateJSを使うことができる](https://ics.media/entry/5192/images/visual11.png)

### Section2. Node.jsでCanvasを使う

Node.jsで**[node-canvas](https://github.com/Automattic/node-canvas)**というモジュールを使うと、**サーバーサイドでHTML5 Canvas要素を使った画像処理ができるようになります。**PHP等を使った**サーバーサイドの画像加工の代替手段となるのがメリット**です。しかし、クライアントサイドのCanvasと同じく低レベルなCanvas(Context2D)のAPIを使用する必要があり、コードが複雑になりがちです。そこでCanvasを扱いやすくするためのCreateJSの登場です。 ※ node-canvasは依存ライブラリが多く、インストールがやや煩雑です。インストールの際には、[公式のWiki](https://github.com/Automattic/node-canvas/wiki)や[Qiita等の解説記事](http://qiita.com/maru_cc/items/ea483477d7ed7df6a9cc)を参照してください。

![node-canvasはNode.jsでHTML5 Canvasを扱うためのモジュール](https://ics.media/entry/5192/images/visual22.png)

### Section3. Node.jsでCreateJSを使う

**[node-easel](https://github.com/wdamien/node-easel)**というモジュールを使うと、**Node.jsでCreateJSが使えるようになります**。CreateJSのスイートであるEaselJS(0.7.0)とTweenJS(0.6.1)が使用可能で、PreloadJSやSoundJSは非対応です。**使用するAPIがクライアントサイドのCreateJSとほぼ同じあるため、学習コストを低く抑えることができるのがメリットです**。 ※ node-easelは、node-canvasがインストールされている環境でコマンドラインから`npm install node-easel`を実行することでインストールできます。

![node-canvasはNode.jsでCreateJSを扱うためのモジュール](https://ics.media/entry/5192/images/visual31.png)

### 実際のコード

それではnode-easelを使ってサーバーサイドで星の図形を描くというサンプルを通して、実際のコードを見てみましょう。Node.jsの処理はapp.jsというJavaScriptファイルに記述してあります。

```
var Canvas = require("canvas"); // node-canvasの読み込み
require("node-easel"); // node-easelの読み込み
var canvas = new Canvas(400, 400); // Canvasの作成
var stage = new createjs.Stage(canvas); // CanvasからStageを作成
var shape = new createjs.Shape(); // Shapeの作成
// Shapeのgraphicsプロパティで星の図形を描画
shape.graphics
  .beginFill("#FF3DB1")
  .drawPolyStar(200, 200, 100, 5, 0.6);
stage.addChild(shape); // ShapeをStageに配置
stage.update(); // Stageをアップデート

var base64String = canvas.toDataURL(); // Canvasの描画情報をBase64形式に変換
console.log(base64String); // コマンドラインにBase64の文字列を出力
```

上記はサーバーサイドのソースコードですが、StageクラスやShapeクラスなど**クライアントサイドでCreateJSを使う時と同じAPIが使われています**。最後に**CanvasのtoDataURL()メソッドを実行することで、Canvasの描画情報がBase64形式（※）の画像になります**。以下のコマンドをコマンドラインから実行すると、上記のJavaScriptがNode.jsとして実行され、Base64形式の画像情報が出力されます。 ※ Base64とはバイナリデータを文字列にエンコードした情報で、コード内でバイナリデータを取り扱うのに向いています。

```
node app
# Base64の画像文字列が出力される
```

HTMLファイルを作成し、imgタグのsrc属性に出力された文字列を指定し、そのHTMLをブラウザで閲覧すると以下のような図形が表示されるのが確認できます。

![Node.jsでEaselJSを実行した結果](https://ics.media/entry/5192/images/f6e96a779d8b663bf36a0b5c61dc49ec.png)

### Section4. node-easelを使った画像加工デモ

冒頭のデモにおいてはサーバーサイドで動的にスプライトシートを作っています。スマホでTwitterのユーザーを決定すると、下図のようにTwitterのプロフィール画像と事前に用意しておいたグラフィックスとを合成します。合成が完了したらCanvasのtoDataURL()メソッドを使ってBase64に変換しておきます。

![サーバーサイドでのスプライトシート作成](https://ics.media/entry/5192/images/visual4.png)

▲サーバーサイドでのスプライトシート作成

また、このスプライトシートと同時にTwitterのユーザー名が記載された吹き出し画像も作成しています。下図のようにTwitterのユーザー名をTextクラス化して事前に用意しておいたグラフィックスと合成します。

![サーバーサイドでの吹き出し画像作成](https://ics.media/entry/5192/images/visual5.png)

▲サーバーサイドでの吹き出し画像作成

スプライトシートの作成が完了したら、このBase64の画像データをクライアントサイドに送信します。送信には[Socket.IO](http://socket.io/)（※）を使っています。クライアントサイドではCreateJSのSpriteクラスを使ってアニメーションを実行します。 ※ Socket.IOは、Node.jsにおいてリアルタイムなデータ通信を簡単にしてくれる技術です。詳しくは記事「[Node.jsとSocket.IOによるPCとスマホブラウザのペアリングデモ](https://ics.media/entry/4320/)」を参照してください。

![Socket.IOによる画像送信](https://ics.media/entry/5192/images/visual6.png)

▲Socket.IOによる画像送信

### 参加者からの質問

5分という短い時間のため、ライトニングトークではお伝えできなかった点が多くありました。ここでは勉強会後にいただいたいくつかの質問にお応えします。

##### Q. サーバーサイドで画像を合成するメリットが知りたい

大きなメリットとしては**クライアントサイドの実行環境に左右されず、同じ描画結果を提供できること**です。クライアントサイドで画像を作る場合は、OSやブラウザの性能によって生成される画像に差異が生まれます。たとえばクライアントサイドでフォントを使って画像加工する場合、ブラウザによってアンチエイリアスがかからない場合があり、Webフォントを使ったとしても同じ描画結果にはなりません。サーバーサイドで画像加工をすればそのような問題は発生しません。

##### Q. リアルタイムのデータ同期について詳しく聞きたかった

スマホでTwitter IDを決定すると、サーバーサイドにそのTwitter IDのアイコンの画像加工命令が出ます。その命令を受けて画像を加工したサーバーサイドは、加工済みの画像データをPC側に送信します。このサーバー・クライアント間のデータのやりとりは、[Socket.IO](http://socket.io/)という技術で実現されています。Socket.IOはNode.jsと組み合わせてリアルタイムなデータ処理を実現する技術です。Socket.IOについては記事「[Node.jsとSocket.IOによるPCとスマホブラウザのペアリングデモ](https://ics.media/entry/4320/)」にて詳しく解説しています。

#### 最後に

勉強会の後のアンケートで、**「未知のライブラリに出会えてよかった」「サーバーサイドでCreateJSが使えるのをはじめて知った」「いろいろなコンテンツに応用できそう」**という声をいただきました。node-easelを使えば、PHP等を使ったサーバーサイドにおける画像加工の知識がなくても**JavaScriptの知識だけでサーバーサイドの画像加工ができるので、フロントエンドエンジニアにとっては新たな表現を行うチャンス**になるかと思います。 デモのソースコードはGitHubで公開してありますので興味のある方は是非御覧ください。（[ソースコード](https://github.com/ics-creative/faces_panic)）

### CreateJS勉強会（第5回）の関連記事

-   [HTML5 CanvasとWebGLの使い分け : 池田発表資料 (前編)](https://ics.media/entry/5140/)
-   [WebGLのドローコール最適化手法 : 池田発表資料(後編)](https://ics.media/entry/5221/)
-   [PreloadJSで「悩ませないローディング」の作り方](https://ics.media/entry/5239/)
-   CreateJSとNode.jsを使ってサーバーサイドでCanvasを扱おう
-   [新CreateJSをコンテンツ制作に活かす | 新しいCreateJSで書くコードはどう変わるのか : 野中氏発表資料](http://fumiononaka.com/samples/CreateJS/CreateJS_150210.html)