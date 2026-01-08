---
title: "Electronの公式テストフレームワークSpectron入門"
source: "https://ics.media/entry/13082/"
publishedDate: "2016-08-17"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

[Spectron（スペクトロン）](http://electron.atom.io/spectron/)は[Electron](http://electron.atom.io/)の為のテストフレームワークで、ElectronのAPIを使用したテストが可能になります。テストを取り入れることで、「想定していた動作と違う」「作成していた機能がいつの間にか動作しない」といったことを未然に防げます。

Spectronからは実際にElectronアプリを起動することができ、「ウィンドウのタイトル」「デベロッパーツールの表示状態」といったことをElectronのAPIにアクセスして取得できます。また、「ページの画像キャプチャー」機能でデザイン崩れが発生していないかのチェックや「ページのテキスト保存」でテストに失敗した時のHTMLテキストの取得、「`console.log()`で書きだした内容の取得」も可能です。これらのテストは手元の開発機だけでなく[Jenkins](https://ics.media/entry/tutorial-jenkins/)などCI（継続的インテグレーション）サービス上でも使用できます。

![Spectronの説明画像キャプチャー（公式ブログ）](https://ics.media/entry/13082/images/1608_spectron_capture-640x288.png)  
▲ 本記事で紹介する「[Spectron](http://electron.atom.io/spectron/)」（[公式ブログのキャプチャー）](http://electron.atom.io/blog/2016/05/11/electron-1-0)

### ElectronのテストフレームワークSpectronについて

Spectronは次のようなことが可能です。

-   CIサービスとの併用
-   ElectronのAPIにアクセス
-   複数のウィンドウの動作を確認
-   Promiseを使用して、非同期な動作に対応
-   アプリにヘルパーコマンドを追加
-   他のテストライブラリとの互換性

次の動画では実際にSpectronを使用したテストを実行して、エラーが出ることを確認してから、コードを修正しテストが通るようにしています。今回のテストは簡易なものですが、どのように実行するかのイメージが伝わるかと思います。

▲ Spectronでテストを実行しているところ

### Spectronを実行してみよう

実際に公式で提供されているサンプルを実行してみましょう。今回のサンプルを実行するには2つほど前提条件があります。

1.  すでにElectronアプリのプロジェクトがある ※1
2.  Electronはプロジェクト以下にインストールしている ※2

※1 Electronのアプリ作成は記事「[初めてのElectron！ HTML5でデスクトップアプリを作成しよう](https://ics.media/entry/7298/)」を参照ください

※2 プロジェクト以下に保存する場合は、Electronのインストール時に`npm install electron-prebuilt --save-dev`という形で`--save-dev`オプションを指定します。

#### Spectronのサンプルコードのフォルダー構成

```
├── package.json // electron-prebuiltがインストール済み
├── node_modules
├── index.html   // electronのメインウィンドウ
├── main.js      // electronの起動ファイル
└── test
    └── spectron_test.js
```

#### Spectronをインストール

Spectronは[npm](https://www.npmjs.com/)からインストールできます。次のコマンドでElectronアプリと同プロジェクトにnpmでSpectronをインストールします。

```
npm install spectron --save-dev
```

#### SpectronからElectronアプリをテスト

Spectronは次のようなコードで実行できます。公式で提供されているサンプルだと、パッケージ化済みのアプリのテストというコードであり手軽に実行ができません。そのためテストコードを少し修正して、パッケージ化されていない状態のアプリをテストできるようにしています。

**test/spectron\_test.js**

▼ Spectronの初期化部分

```
const Application = require("spectron").Application;
const assert = require("assert");
const path = require("path");

// Electronの実行ファイルまでのパス
//  ../node_modules/.bin/electron.cmd
const isWindows = process.platform === "win32";
const ext = isWindows ? ".cmd" : "";
const electronPath = path.join(
  __dirname,
  "..",
  "node_modules",
  ".bin",
  "electron" + ext
);

// Electronのアプリ起動パス。testフォルダーからの相対パス「../」
const appPath = path.join(__dirname, "..");

// アプリケーション
const app = new Application({
  // Electronの実行ファイルまでのパス
  path: electronPath,
  // electronを実行する際の引数
  args: [appPath]
});
```

▼ 実際にアプリケーションをテストしている箇所

```
// Promiseを使用して、非同期処理を実行している。
app
  .start()
  .then(function() {
    // ウィンドウの表示状態を取得する
    return app.browserWindow.isVisible();
  })
  .then(function(isVisible) {
    // ウィンドウが表示されているか
    assert.equal(isVisible, true);
  })
  .then(function() {
    // ウィンドウのタイトルを取得する
    return app.client.getTitle();
  })
  .then(function(title) {
    // ウィンドウのタイトルが"My App"であるか
    assert.equal(title, "My App");
  })
  .then(function() {
    // 終わったらアプリケーションを停止する
    console.info("Test Success");
    return app.stop();
  })
  .catch(function(error) {
    // エラーをキャッチしたら、テストがエラーした旨のメッセージを表示する
    console.error("Test failed", error.message);
    return app.stop();
  });
```

-   [全体のソースコード – GitHub](https://github.com/ics-creative/160810_spectron)

テストの実行は次のコマンドを打ってください。

```
node test/spectron_test
```

今回のサンプルコードを使用すると、Spectronでチェックしているコードと、実際のウィンドウのタイトルが違うため、テストでエラーが発生します。

```
Test failed 'Hello World!' == 'My App'
```

Electronで起動しているindex.htmlの`title`要素内を修正することで、テストが成功します。

```
Test Success
```

### Spectronを導入して、安心してコードを書こう

Spectronを導入することで、簡単にElectronアプリのテストを実行できるようになりました。Electronに限らずですが、コードの変更でいつの間にか不具合が発生していた、なんてことに遭遇した人は少なくないと思います。あとから気がついて後悔しないように、Electronアプリの開発にはSpectronをぜひ導入してみてください。