---
title: "HTML5の3D表現を身につけよう！簡単なJSではじめるWebGL版Away3D入門"
source: "https://ics.media/entry/1129/"
publishedDate: "2014-01-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

[Away3D TypeScript](http://typescript.away3d.com/)はHTMLの3D技術「[WebGL](http://ja.wikipedia.org/wiki/WebGL)」を扱いやすくしたフレームワークです。個人ブログ（[HTML5で3Dを実現する本格派WebGLフレームワーク、Away3D TypeScriptの公式デモ](http://clockmaker.jp/blog/2014/01/html5-webgl-away3d-typescript-samples/))で紹介したようにAway3Dを使えばGPUによる本格的な3D表現をプラグイン無しで作成できます。

そこで、初級者にもやさしいAway3D TypeScript(以下、Away3D)チュートリアルをはじめてみることにしました。必要となるスキルレベルは、JavaScriptの入門書を一冊読み終えたぐらいを想定してます。Away3DはJavaScriptやTypeScriptのどちらでも利用できますが、本連載ではJavaScriptで解説します。

### この記事について

AwayJSは活発に開発されていないため、**本サイトとしては利用は推奨しません**。WebGLを活用したい方は、Three.jsの検討をオススメします。Three.jsの詳細は以下のサイトを参照ください。

-   [Three.js入門サイト](https://ics.media/tutorial-three/)

以下は、当時の記事の内容を残していますが、現在のフロントエンドの開発環境やブラウザ環境で有用である保証はできません。

### チュートリアル記事のテーマと目標

テーマは「短いコードで、シンプルにAway3Dを使ってみる」で、目標としてチュートリアルの後編では次のようなサンプルの解説を掲載する予定です。どちらもマウスドラッグ/タッチ操作でドラッグ可能です。

#### 地球

![](https://ics.media/entry/1129/images/140926_away_1.jpg)

#### 3Dのキャラクター表示

![](https://ics.media/entry/1129/images/140926_away_2.jpg)

### 第1回の記事では導入方法を紹介

第1回の本記事では、ライブラリのセットアップから3D画面への表示および球体の回転までを紹介します。手順通りに進めば、10分くらいで作業が完了できると思います。今回の手順は4分ほどのビデオに収録していますので、細かい設定等の不明点があればビデオを参照ください。

### ステップ 1. GitHubからAway3Dをダウンロード

まずはGitHubのページにいき、Away3DのJSファイルをダウンロードします。Away3Dは複数のライブラリが集まって構築されているので、手っ取り早くJSファイルを手に入れるには[Examples](https://github.com/awayjs/stagegl-examples-ts)からJSファイルをダウンロードするのがいいでしょう。GitHubの［Download］ボタンをクリックしてダウンロードします。なお本記事では2014年9月のリビジョンのライブラリを使用して解説しています。

-   [awayjs/stagegl-examples-ts · GitHub](https://github.com/awayjs/stagegl-examples-ts)

[![](https://ics.media/entry/1129/images/140926_away_3.png)](https://github.com/away3d/away3d-core-ts)

※もしかすると、将来的なアップデートにより動作しない可能性がありますので、もし動作しないことがありましたら、執筆時点のリビジョンのファイルを使ってお試しください。

-   [awayjs/stagegl-examples-ts (2014年9月のリビジョン) · GitHub](https://github.com/awayjs/stagegl-examples-ts/tree/5ec31c0f4251ff3ef80bd6248a872caf635c4f3d)

### ステップ 2. HTMLファイルの準備

ダウンロードしたZIPファイルを展開します。その中に「libs」フォルダーが入っていますが、その中身がAway3DのフレームワークとなるJSファイル「awayjs-core.next.min.js」「stagegl-core.next.min.js」「stagegl-extensions.next.min.js」が入っています。HTMLファイル（1\_simple.html）を用意してそれと同じ階層にそれらのファイルを配置しましょう。コンテンツを制御するスクリプトは別名で「1\_simple.js」という名前で用意しています。

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
		<title>Away3D TypeScript Sample</title>
		<script src="../libs/swfobject.js"></script>
		<script src="../libs/awayjs-core.next.min.js"></script>
		<script src="../libs/stagegl-core.next.min.js"></script>
		<script src="../libs/stagegl-extensions.next.min.js"></script>
		<script src="1_simple.js"></script>
	</head>
	<body>
	</body>
</html>
```

フォルダーの階層としては次のような状態となります。Away3D関連のJSライブラリは「libs」フォルダーに、自分で用意したファイルは「src」フォルダーに配置しておきます。このフォルダー階層でなくともパス等があっていればAway3Dは動作しますが、WebGL未対応ブラウザで自動的にFlash Playerにフォールバックする仕組み等が動作しなくなるので、特別な理由がなければこのフォルダー階層にしておくといいでしょう。

![](https://ics.media/entry/1129/images/140926_away_4.png)

ちなみに前提としてAway3DはWebGL対応のブラウザが必須となりますので、動作確認はFirefoxやChrome、Internet Explorer 11などを使うといいでしょう。

### ステップ 3. 3D表示用のJavaScriptを用意

ここからはさまざまな方法がありますが、その中でも私がもっとも一番手軽だと思う方法を紹介します。コンテンツ用のJSファイルに次のJavaScriptのコードを記述してみましょう。

```
var view;
var mesh;
function init() {
  // 3Dの土台を作成します
  var renderer = new away.render.DefaultRenderer();
  view = new away.containers.View(renderer);
  view.width = window.innerWidth; // 画面全体で表示
  view.height = window.innerHeight;
  // マテリアルを作成します
  var material = new away.materials.TriangleMethodMaterial(
    0xff0000
  );
  // 球体の形状を作成します
  var prefab = new away.prefabs.PrimitiveSpherePrefab(300);
  // 形状とマテリアルからメッシュを作成します
  mesh = prefab.getNewObject();
  mesh.material = material;
  // 3D表示インスタンスのsceneプロパティが3D表示空間となります
  view.scene.addChild(mesh);
  // アニメーションさせるためにループイベントを指定します
  var raf = new away.utils.RequestAnimationFrame(
    tick,
    this
  );
  raf.start();
}
// 毎フレーム時に実行されるループイベントです
function tick() {
  mesh.rotationY += 1;
  view.render(); // レンダリング
}
// ページが読み込まれてから実行します
window.onload = init;
```

ここまでの設定がうまくいっていれば、ブラウザの画面上に単色の球体が回転します。  
[![](https://ics.media/entry/1129/images/140926_away_5.png)](https://ics-creative.github.io/data-demos/140926_away3d_ts/src/1_simple.html)

このサンプルでは次の手順の処理を実装しています。

1.  ページが読み込まれてから初期化用の関数が実行されるように指定
2.  Away3Dの土台となる`away.containers.View`クラスのインスタンスを作成
3.  球体の形状を作成し、赤色のマテリアルを指定
4.  間経過で関数を呼び出すために`away.utils.RequestAnimationFrame`クラスのインスタンスを生成し、`start()`メソッドを実行
5.  時間経過でワイヤーフレームが回転するように`rotationY`プロパティの数値を加算
6.  レンダリングを実行

### View3Dの構造

上記のコードで出現した基本的なAway3Dの機能について紹介します。

-   `View`クラス  
    `View`クラスは統合的な3D機能を提供するクラスです。`View`クラスはシーン設定、カメラ設定、描画を担っています。Viewインスタンスを作成すると、自動的にHTMLに`canvas`タグが追加されます。
-   `View`クラスの`scene`プロパティ  
    3Dの空間を表すプロパティ。3Dのオブジェクトは`scene`プロパティに`addChild()`メソッドを利用して追加することで表示できます。
-   `View`クラスの`camera`プロパティ  
    3D空間を撮影するカメラプロパティ。視点を制御するために使用します。3D空間のどの視点で撮影しているのかの情報が必要となりますが、それを決定するのが`View`クラスのcameraプロパティです。
-   `View`クラスの`render()`¥メソッド  
    3D空間のレンダリングを行います。レンダリングとは、Away3Dで計算した3Dのオブジェクトを画面に表示することです。内部的にはAway3DがWebGLのAPIを使って、GPUで座標を計算させ画面に表示させています。Away3DではRequestAnimationFrameのタイミングにあわせて、レンダリングを行うように設定しましょう。

![](https://ics.media/entry/1129/images/away3d_1_view3d.png)

図：Away3Dを構成する基本的なオブジェクトと表示の仕組み  
ビュー（HTMLの`canvas`タグ）が実際に表示される画面となります。

### ソースファイル一式

今回のソースファイルはこちらからダウンロードできます。

-   [ソースファイル](https://ics-creative.github.io/data-demos/140926_away3d_ts/140926_away3d_ts.zip)

### 最後に

3Dと聞くと難しそうと思われがちですが、あっけなく動作したので驚かれた方も多いのではないでしょうか？

Away3Dはもともと2007年頃から存在したFlashの[Papervison3D](http://code.google.com/p/papervision3d/)というフレームワーク（参考：[Flashで動作する3Dエンジン「Papervision3D」 - GIGAZINE](http://gigazine.net/news/20070212_papervision3d/))から派生して進化してきたこともあり、APIが整備されていて使いやすいのが特徴です。