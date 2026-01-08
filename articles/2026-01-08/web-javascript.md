---
title: "Webサイトからプッシュ通知を送ろう！ JavaScriptでのプッシュ通知の実装方法"
source: "https://ics.media/entry/11763/"
publishedDate: "2016-05-17"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

スマートフォンアプリではおなじみのプッシュ通知ですが、ウェブサイトからもプッシュ通知できることをご存知でしょうか？

JavaScriptの[ServiceWorker](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorker_API)と[Push API](https://developer.mozilla.org/ja/docs/Web/API/Push_API)を使用することで、**ウェブサイトからでもスマートフォンアプリと同様に**ユーザーにプッシュ通知を送ることができます。また、モバイルだけでなくデスクトップでも通知を行うことができるため、**ユーザーエンゲージメントの向上の手法として有効です**。

### プッシュ通知のデモ

プッシュ通知を行う簡単なサンプルを用意しました。Chrome 42以降のブラウザで確認してください（2018年3月現在のChrome 65で動作することを確認しています）。

「プッシュ通知の配信設定」のトグルを選択すると、「cURLコマンド」のボックスにコマンドが生成されます。このコマンドをMacをお使いの方はTerminal上から実行してください。Windowsをお使いの方は、[こちら](https://curl.haxx.se/download.html)からcURLをインストールすれば、コマンドプロンプトから実行できます。

![プッシュ通知のサンプル](https://ics.media/entry/11763/images/160415_pushNotification_demo_image.jpg)

-   [サンプルを別ウインドウで実行する](https://ics-creative.github.io/160414_serviceworker_push_notification/)
-   [ソースコードを確認する](https://github.com/ics-creative/160414_serviceworker_push_notification)

手っ取り早く実装したい方は、ソースコードをダウンロードしてお手元でカスタマイズください。

※ブラウザの設定でプッシュ通知を拒否している方は有効にしたうえでデモをご確認ください。

▼実際にデモを操作している映像です。

![](https://ics.media/entry/11763/images/160513_serviceworker.gif)

### プッシュ通知のメリット

これまでウェブサイトの更新をユーザーに伝えるための手段としては、RSSやメールなどが利用されていました。ユーザーが利用するためには、RSSの場合はRSSリーダーに登録する手間が必要ですし、メールの場合でもメールアドレスをユーザーに登録してもらわなければいけないため、利用するためのハードルが高いです。

プッシュ通知の場合は、**ウェブサイト上で許可するだけで有効になるため、手間がかからずユーザーは気軽に利用できます**。

### プッシュ通知の実装方法について

上記のサンプルをもとに、Google Cloud Messagingを利用したプッシュ通知の実装方法を説明します。まずはGoogle Developer ConsoleよりGCM(Google Cloud Messaging)のAPIキーを取得します。

#### Google Cloud MessagingのAPIキーを取得する

[Google Developer Console](https://console.developers.google.com/project)へアクセスし、検索ボックスに`google cloud messaging`と入力し検索してください。

![APIキーを取得する](https://ics.media/entry/11763/images/160415_pushNotification_01_gcm.jpg)

検索結果から`google cloud messaging`を選択したら、次に［プロジェクトの作成］を選択します。

![APIキーを取得する](https://ics.media/entry/11763/images/160415_pushNotification_02_gcm.jpg)

プロジェクト作成画面では、任意のプロジェクト名を入力し、利用規約に同意してプロジェクトを作成します。プロジェクトを作成すると、［有効にする］ボタンが押せるようになっているので、有効にしてください。APIを有効にすると、認証情報を作成するようメッセージが表示されるため、［認証情報に進む］を選択し、認証情報の作成を行います。

![APIキーを取得する](https://ics.media/entry/11763/images/160415_pushNotification_03_gcm.jpg)

使用するAPIに「Google Cloud Messaging」を、APIを呼び出す場所に「ウェブサーバー（node.js、Tomcatなど）」を指定し、認証情報を作成してください。次の画面では任意のAPIキーの名前を設定し、［APIキーを作成する］ボタンを押してください。

![APIキーを取得する](https://ics.media/entry/11763/images/160415_pushNotification_06_gcm.jpg)

以上でAPIキーの取得は完了です。APIキーは後ほど使用するため、メモしておきましょう。［完了］ボタンを押して認証情報の作成を終了してください。

![APIキーを取得する](https://ics.media/entry/11763/images/160415_pushNotification_07_gcm.jpg)

また、後ほどプロジェクト番号も必要になりますので、[Google Cloud Platform](https://console.cloud.google.com/home/dashboard)にアクセスし、プロジェクト番号を控えておきましょう。プロジェクトIDではないので注意してください。

![APIキーを取得する](https://ics.media/entry/11763/images/160415_pushNotification_08_gcm.jpg)

ここからはサンプルコードを使用してプッシュ通知を行うまでの手順を説明します。

#### サンプルコードを使用してプッシュ通知を実装する

サンプルコードを使って、プッシュ通知を送る手順を説明します。サンプルコードの主なファイルの構成となっています。`main.js`と`manifest.json`に先ほど取得したAPIキーなどの情報を反映するだけで、サンプルを動かすことができます。

```
├ js/
　│　├ main.js
　│　└ manifest.json
　├ service-worker.js
　└ index.html
```

サンプルコードはGitHubにて公開しています。[こちらのURL](https://github.com/ics-creative/160414_serviceworker_push_notification)からソースコードを確認できるので、ダウンロードして自由に利用ください。

`manifest.json`の`gcm_sender_id`に先ほど取得した「プロジェクト番号」を指定してください。その他の部分は設定するウェブページにあわせて適宜変更してください。

```
{
  "name": "PushNotificationDemo",
  "short_name": "PushNotificationDemo",
  "icons": [{
        "src": "ics_logo_512x512.png",
        "sizes": "512x512"
      }],
  "start_url": "./",
  "display": "standalone",
  "gcm_sender_id": "xxxxxxxxxxx"
}
```

次に、`main.js`の上部に定義されている、`API_KEY`を設定します。先ほど取得した「Google Cloud MessagingのAPIキー」を設定してください。以上でサンプルコードの変更は完了です。

```
const API_KEY = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

const GCM_ENDPOINT =
  "https://android.googleapis.com/gcm/send";
```

#### プッシュ通知を実行する

それでは、サンプルコードを実行してプッシュ通知を実行してみましょう。ただし、ServiceWorkerはセキュリティの関係上、HTTPSかlocalhostでのみ動作する仕様となっています。localhost以外で試したい場合は、本デモのように[GitHub Pages](https://pages.github.com/)を利用するのが良いと思います。localhostまたはHTTPS環境にサンプルコードをアップし、ブラウザでアクセスしてください。以下の画面が表示されます。

![](https://ics.media/entry/11763/images/160513_serviceworker_demo.png)

次に、プッシュ通知の配信設定のトグルを選択し、プッシュ通知を有効にすると、さきほど設定したGoogleCloudMessagingよりエンドポイントのURLが取得できます。取得したエンドポイントをもとに、下記のルールでcURLコマンドに整形されたものが表示されれば成功です。cURLコマンド内のエンドポイントの文字列とは、エンドポイントのURLより`https://android.googleapis.com/gcm/send/`の部分を取り除いた文字列です。

```
curl --header "Authorization: key=(APIキー)" --header Content-Type:"application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"(エンドポイント文字列)\"]}"
```

このコマンドをターミナルよりコマンドを実行すると、下記の通りプッシュ通知が届くことが確認できます。

![](https://ics.media/entry/11763/images/160513_serviceworker.gif)

### 動作ブラウザ

サポートブラウザは以下の通りです。詳細は『[Push API | Can I use...](https://caniuse.com/push-api) 』を参照ください。

-   Chrome 42（2015年リリース）以上
-   Firefox 44（2016年リリース）以上
-   macOS 13 Ventura Safari 16.1（2022年10月リリース）以上
-   Safari for iOS 16.4以降（2023年3月リリース）

### おわりに

ServiceWorkerを使用することで、簡単なサンプルコードでプッシュ通知ができることが確認できたと思います。**ユーザーにとってメリットのある機能であるため、導入を検討する価値は十分にある機能です**。