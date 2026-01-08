---
title: "ブラウザ確認が一瞬！ Browsersync入門（＋Gulpの利用方法）"
source: "https://ics.media/entry/3405/"
publishedDate: "2014-11-27"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブサイトを閲覧するユーザーの環境は多岐に渡ります。したがって、ウェブ制作者は多くの環境の動作確認をしなければなりません。その時の手間を大きく省いてくれる[Browsersync](https://browsersync.io/)というツールを紹介します。

Browsersyncとはファイル変更を監視し、自動でブラウザリロードを行ってくれるツールです。ローカルサーバーも起動できたり、複数のブラウザで操作の同期が可能といった便利機能も満載です。

### Browsersyncのデモ動画

Browsersyncのデモ動画を紹介します。デスクトップブラウザとスマートフォン（iPhone）のブラウザが同期しており、ファイルの編集後に自動リロードしています。CSSでハリネズミを走らせるアニメーションです。HTMLやCSSのファイル編集がリアルタイムに反映されていることがわかります。

### Browsersyncは何を便利にしてくれるのか

![Browsersyncのメリット](https://ics.media/entry/3405/images/f5a74a22425e8b80507dcba586a23968.png)

ファイルの編集後に複数ブラウザの確認をする際、以下のような手間があります。

1.  ファイルを編集する度に、ブラウザを**すべて手動で**リロードする手間
2.  別のデスクトップブラウザやスマートフォンブラウザでの表示確認の為に、ローカルサーバーやリモートサーバーを立てる手間

Browsersyncを使用すると、これらの手間が省け制作効率を多くアップさせることができます。Browsersyncの主な特徴は以下です。

1.  **ローカルサーバーが自動で起動**
2.  同じネットワークにある端末の**すべてのブラウザが同期される**
3.  同期されたブラウザにおいては、スクロール、クリック、再読み込み等の**ユーザーアクションがすべて同期**される

### Browsersyncを単独で導入する方法

ローカルでのNode.jsのプロジェクトを作成します。

```
npm init -y
```

Browsersyncをインストールします。

```
npm install browser-sync -D
```

`package.json`ファイルのscriptsフォールドを次のように編集します。 `--server src`の`src`はフォルダーを指します。任意のフォルダーを指定してもらってかまいません。これがブラウザを同期した場合のルートフォルダーとなります。

```
{
  "scripts": {
    "start": "browser-sync start --server src"
  },
  "devDependencies": {
    "browser-sync": "^2.27.10"
  }
}
```

次のコマンドを実行するとBrowsersyncが開始します。

```
npm run start
```

BrowserSyncが開始されるとログに以下のように出力されます。

```
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.86.23:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 --------------------------------------
[Browsersync] Serving files from: src
```

「External」が自動で立ち上がったローカルサーバーのURLです。同じネットワークにあるデスクトップブラウザやスマートフォンのブラウザからこのURLにアクセスすれば、すべてのブラウザが同期されます。

### GulpとBrowsersyncの連携

Browsersync単独でも便利なのですが、[Gulp](https://gulpjs.com/)といったタスクランナーと連携するとさらに便利です。たとえば、Sassをコンパイルした後にブラウザをリロードしたり、スプライトシートを作りながら実機で表示確認をしたり等ができるようになります。ここではGulpと連携する例をご紹介します。Gulpの基本的な導入方法については、記事『[5分で導入できる！ タスクランナーGulpを使ってウェブ制作を爆速にしよう](https://ics.media/entry/3290/)』をご覧ください。

#### Gulpの導入方法

```
npm init -y
```

```
npm install -D gulp
```

Browsersyncのインストールは簡単です。Node.jsがインストールされた環境で、以下のコマンドを使ってBrowsersyncプラグインをインストールします。

```
npm install browser-sync -D
```

#### Browsersyncの基本は2つのAPI

Browsersyncを使うときにおさえておきたいAPIは以下の2つです。

-   `browserSync({server: {baseDir: ルートフォルダ}})`  
    ブラウザを同期した場合のルートフォルダーを指定します。
-   `.reload()`  
    同期しているブラウザをすべてリロードします。

#### Gulpでのタスク設定

`gulpfile.js`ファイルでプラグインの読み込みとタスクの設定を行います。`src`フォルダー以下のファイルの更新を監視し、ファイルが更新されたら同期しているブラウザをリロードするというタスクを作ってみます。

```
// gulpプラグインの読みこみ
const gulp = require("gulp");

// browser-syncのプラグインの読み込み
const browserSync = require("browser-sync");

// タスクの設定
gulp.task("browserSyncTask", function () {
  browserSync({
    server: {
      baseDir: "src", // ルートとなるディレクトリを指定
    },
  });

  // srcフォルダ以下のファイルを監視
  gulp.watch("src/**", function () {
    browserSync.reload(); // ファイルに変更があれば同期しているブラウザをリロード
  });
});
```

pacakage.jsonのscriptsフィールドは次のように変更しておきましょう。startコマンドには、`gulp browserSyncTask`を登録しています。

```
{
  "scripts": {
    "start": "gulp browserSyncTask"
  },
  "devDependencies": {
    "browser-sync": "^2.27.10",
    "gulp": "^4.0.2"
  }
}
```

タスクを実行するとBrowsersyncが開始します。

```
npm run start
```

BrowserSyncが開始されるとログに以下のように出力されます。

![Browsersyncのログ](https://ics.media/entry/3405/images/d3f305494bb1b4b3aee4b9d8ca281d61.png)

「External URL」が自動で立ち上がったローカルサーバーのURLです。同じネットワークにあるデスクトップブラウザやスマートフォンのブラウザからこのURLにアクセスすれば、すべてのブラウザが同期されます。

### 最後に

Browsersyncを使うと、複数のブラウザや複数の端末における**動作確認が容易**になり、制作者のみならずチーム内のメンバーによる確認の手助けにもなります。動作確認がスムーズになると、**制作のブラッシュアップに注力**できます。ぜひお試しください。