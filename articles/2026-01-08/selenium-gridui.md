---
title: "Selenium GridでUI自動テストの並列実行環境を構築"
source: "https://ics.media/entry/11141/"
publishedDate: "2016-04-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

2016年4月1日 公開 / [株式会社ICS 渡邊 真耶](https://ics.media/entry/staff/watanabe/)

以前の記事「[UIテストの自動化！Node.jsとSeleniumでWebアプリのUIテスト環境構築](https://ics.media/entry/5759/)」で、[Selenium](http://www.seleniumhq.org/)を使ったUIテストの自動化の手法について紹介しました。こちらの記事ではシンプルなUIテストのサンプルを使用しましたが、実際にWebサービスのテストスクリプトを実装していくと、テストケースが増加していき、それにともなってテストの実行時間も増加します。また、対象となるブラウザが増えるとテストケースがさらに倍増します。

「[Selenium Grid](http://www.seleniumhq.org/docs/07_selenium_grid.jsp)」を使用すると、1つのテストスクリプトで**複数環境でのテストを並列実行できるため、テストの実行にかかる時間を大幅に削減できます。**

本記事では、**1つのテストスクリプトから複数の異なる環境でスクリーンショットを取得する**サンプルをもとに、「Selenium Grid」で環境を構築していく手順を紹介します。

### Selenium Gridとは

複数のSeleniumの実行環境を管理し、並列にテストを実行できるツールです。1つのテストスクリプトを複数環境で並行して実行できるため、テストの実行時間を大幅に短縮できます。

Selenium Gridは、「Hub」と呼ばれるテストスクリプトを受け付けるサーバーと「Node」と呼ばれる実際にテストを実行する環境で構成されています。イメージとしては下記の図のような構成になります。

![SeleniumGrid環境のイメージ図](https://ics.media/entry/11141/images/160226_SeleniumGrid_Image.png)

Hubサーバーに、OS・ブラウザー・バージョンを指定してテストスクリプトを送ることで、登録されているNodeサーバーの中から空いているNodeに対して処理を振り分け、並列で実行してくれます。

### Hubサーバーを立ち上げる

Hubとして使用するマシンに下記のSeleniumの公式サイトより、「Selenium Standalone Server」をダウンロードしてきます。

[http://docs.seleniumhq.org/download/](http://docs.seleniumhq.org/download/)

※本記事では、記事執筆時点の最新バージョンである2.53.0を使用した手順を記載します。

ダウンロードしたファイルを下記のコマンドで実行すると、Hubサーバーを立ち上げることができます。

```
java -jar selenium-server-standalone-2.53.0.jar -role hub
```

※コマンドの実行にはJava Runtime Environment (JRE) が必要です。本記事ではJRE\_1.8.0\_73を使用しています。

※JREのバージョンが低い場合、実行出来ない場合があります。最新バージョンにアップデートしてください。

※下記のコマンドを実行することでJavaのバージョンを確認できます。

```
java -version
```

コマンド実行後、下記のURLへアクセスするとHubサーバーのコンソール画面が表示されます。

[http://xx.xx.xx.xx:4444/grid/console](http://xx.xx.xx.xx:4444/grid/console)

※「xx.xx.xx.xx」にはHubサーバーのIPアドレスを入力してください。

![](https://ics.media/entry/11141/images/160226_grid_console01.png)

まだNodeとなるサーバーを立ち上げていないため、何も表示されていません。それではNodeサーバを立ち上げていきます。

### Nodeサーバーを立ち上げる

Hubサーバーと同様に、Nodeサーバーとするマシンに公式サイトより「Selenium Standalone Server」をダウンロードしてきます。また、Nodeサーバーにはテストを実行したいブラウザーのWebDriverをダウンロードしてきます。

※WebDriverについては、過去記事の「[UIテストの自動化！Node.jsとSeleniumでWebアプリのUIテスト環境構築](https://ics.media/entry/5759/)」をご参照ください。

次に、Nodeサーバーの設定ファイルを作成します。コマンドの引数として情報を指定することもできますが、設定ファイルを作成した方がわかりやすいと思います。json形式の下記のファイルを作成し、使用可能なBrowserの情報を記載します。

```
{
  "capabilities":
    [
      {
        // OS名
        "platform": "Windows 10",
        // Browser名
        "browserName": "firefox",
        // 起動するインスタンスの最大数
        "maxInstances": 2,
        // Browserのバージョン番号
        "version": "44.0",
        // Selenium RC、Selenium WebDriverのどちらのモードで実行するかを設定
        "seleniumProtocol": "WebDriver"
      },
      {
        "platform": "Windows 10",
        "browserName": "chrome",
        "maxInstances": 2,
        "version": "48.0",
        "seleniumProtocol": "WebDriver"
      }
    ],
  "configuration":
  {
    // Nodeとして追加するHubサーバーのアドレス
    "hub": "http://10.211.55.5:4444/grid/register"
  }
}
```

設定ファイルを引数として指定し、Nodeサーバーを立ち上げます。また、今回はChromeのWebDriverを使用するため、あわせて引数に指定します。

```
java -jar selenium-server-standalone-2.53.0.jar -role node -nodeConfig node\_config.json -Dwebdriver.chrome.driver=chromedriver.exe
```

Nodeサーバーを起動したら、HubサーバーのコンソールにNodeサーバーの情報が反映されていることが確認できます。同様の手順でNodeサーバーを追加します。下記のスクリーンショットは同様の手順でmacOSでもNodeサーバーを立ち上げた際のものです。

![](https://ics.media/entry/11141/images/160226_grid_console02.png)

以上で環境の構築は完了です。

### テストスクリプトの作成

今回は並列実行をするスクリプトを、[wd-parallel](https://www.npmjs.com/package/wd-parallel)を利用して作成しました。本サイトの[トップページ](https://ics.media/)のスクリーンショットを取得し保存するスクリプトです。

【testscript.js】

```
var parallel_webdriver = require("wd-parallel");
// Hubサーバーのアドレスを指定
var browsers = parallel_webdriver.remote(
  "10.211.55.5",
  4444
);

browsers.test = function(browser, target) {
  // 初期化処理
  browser.init(target);

  // Windowサイズを設定する
  browser.setWindowSize(960, 480, function(error) {});

  // ウェブページを開く
  browser.get("https://ics.media/");

  // 画面の読み込みが完了するまで待つ(60秒)
  browser.waitForElementByCss("#top-image-wrap", 3000);

  // スクリーンショットを取得し保存する
  browser.saveScreenshot(
    "screenshots/" + target.name + ".jpg",
    function(error, file) {}
  );

  // ブラウザを閉じる
  browser.close();

  // 終了
  browser.quit();
};

// 並列実行するブラウザーの設定ファイルを読み込む
browsers.loadConfigFile("config.json");

// テスト実行
browsers.run();
```

【config.json】

```
{
  "desired" : [
    {
      "platform": "Windows 10",
      "name" : "Windows10_Chrome",
      "browserName" : "chrome",
      "chromeOptions" :
        {
          "args" : ["--test-type"]
        }    },
    {
      "platform": "Windows 10",
      "name" : "Windows10_FireFox",
      "browserName" : "firefox"
    },
    {
      "platform": "MAC",
      "name" : "Mac_Chrome",
      "browserName" : "chrome",
      "chromeOptions" :
        {
          "args" : ["--test-type"]
        }
    },
    {
      "platform": "MAC",
      "name" : "Mac_FireFox",
      "browserName" : "firefox"
    }
  ]
}
```

上記の準備ができたら、下記のコマンドでテストスクリプトを実行します。

```
node testscript.js
```

実行結果は下記になります。無事に各Nodeサーバーで実行したスクリーンショットが取得できました。

![](https://ics.media/entry/11141/images/160226_SeleniumGrid_result.png)

### おわりに

上記の通り、Selenium Gridを使用することで、指定したOSの指定したバージョンのブラウザーでテストを並列実行をすることができました。

UIの自動テストは、UIの操作やウェブページの読み込みやレンダリングの待ち時間などの時間があるため、どうしても時間がかかってしまいます。Selenium Gridはテスト実行時に空いているNodeに対して処理を振り分けてくれるため、**登録するNodeを増やしていけば、さらにテストにかかる時間を短縮できます。**

テスト実行に時間がかかり困っている方はぜひお試しください。