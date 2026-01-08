---
title: "ブラウザ拡張Selenium IDEでユーザー操作を記録・再現できる！UIテストの自動化に活用しよう"
source: "https://ics.media/entry/17626/"
publishedDate: "2018-04-05"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

[Selenium IDE](https://github.com/SeleniumHQ/selenium-ide)（セレニウム・アイディーイー）とは、ブラウザ操作を記録・再現できるChrome、Firefoxで利用可能な拡張機能（アドオン）です。

手軽に記録・再現ができるため、アイデア次第で色々な使い方ができます。筆者は、会社の打刻操作（社内サイトへアクセス → ログイン → 打刻ページへ遷移 → 打刻ボタンをクリック）を記録し、**自動実行することでいち早く出社**ができるようにしていました。

その他にも開発時に繰り返し行うようなデバッグ作業やルーティーン作業を記録することで、以下のような活用もできます。

-   入力フォームなどに文字を入力する操作を記録しておき、自動入力させる。
-   ゲームやSPAのデバッグ時に、スタート画面からデバッグしたい画面までの移動操作を記録しておき、任意の画面へ素早く遷移できるようにする。

本記事では、Webアプリケーションの開発に役立つSelenium IDEについて紹介します。

### Selenium IDEとはテストケースを生成するツール

Selenium IDEは、UIテストツールである[Selenium](https://www.seleniumhq.org/)（セレニウム）で実行するテストケースを自動生成するツールです。

テストケースは、JavaScriptやJava、Python、Rubyなどさまざまな言語で作ることができますが、普段プログラムを作成していないコーダーやデザイナーが利用するには少し抵抗がありますし、プログラム作成に慣れている方でも、大量のテストケースをゼロから作成していくにはとても手間がかかります。

Selenium IDEは、ブラウザで操作した内容を記録・再現ができるため、プログラムを書くことなくUIテストを実施したり、テストケースを作成できます。

![](https://ics.media/entry/17626/images/180404_selenium_ide_demo01_220917.gif)

UIテストツールのSeleniumについて詳しく知りたい方は、次の記事をご覧ください。

-   [UIテストの自動化！ Node.jsとSeleniumでWebアプリのUIテスト環境構築](https://ics.media/entry/5759/)

### Selenium IDEの歴史

Selenium IDE自体は、Firefoxのアドオンとして以前より多くのユーザーに使われていましたが、Firefox 55のリリースで拡張機能の仕組みが切り替わったことに影響し、動作しなくなっていました。

しかし、2017年12月に新しい拡張機能の仕組み（Web Extentions）に対応した形で作り直され、新しくなったSelenium IDEがv1.0としてリリースされました。また、**Web Extensionsに対応したことでFirefoxだけでなくChromeでも利用できるようになっています**。

#### Chromeでのインストール方法

[Chromeウェブストア](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd?hl=ja)より入手できます。［Chromeへ追加］ボタンからインストールください。

![](https://ics.media/entry/17626/images/images/180404_selenium_ide_chormestore_220917.png)

#### Firefoxでのインストール方法

[Firefox Add-ons](https://addons.mozilla.org/ja/firefox/addon/selenium-ide/)より入手できます。［Firefoxへ追加］ボタンからインストールください。

![](https://ics.media/entry/17626/images/images/180404_selenium_ide_firefox_220917.png)

### Selenium IDEの使い方

インストールが完了すると、ブラウザーのツールバーにSelenium IDEのアイコンが表示されます。アイコンをクリックするとSelenium IDEが起動し、以下の画面が表示されます。

![](https://ics.media/entry/17626/images/180404_selenium_ide_tool_2.png)

①の部分は作成したテストケースの一覧が表示される場所で、［+］ボタンでテストケースを追加できます。また、テスト実行時はテストケースを何件実施し、何件失敗したかなどの状態が確認できます。

②の部分はテスト手順を記録したり、手動で作成・編集できる画面です。右上の赤い［●］ボタンを押すと記録が開始され、ブラウザ内で行った操作がコマンドとして記録されていきます。記録したコマンドは編集することもできるため、あとから入力値を変更することもできますし、任意の箇所に新たな操作を追加することも可能です。

③の部分はログ出力領域です。テスト実行時の各手順の実施結果、各テストケースの実施結果などが確認できます。

### テストケースの作成

それでは、実際にテストケースを作っていきましょう。以下の動画は、当サイトのトップページで検索を行い、検索結果の一覧から画面遷移する試験をSelenium IDEを使って作成、テスト実施したものです。

デモ動画では、以下の手順で操作を行っています。

1.  ツールバーに表示されたSelenium IDEのアイコンをクリックし、Selenium IDEを起動します。
    
2.  画面右上の［Start recording］ボタンを選択し、操作の記録を始めます。
    
3.  ウェブページを任意に操作します。以下の操作を行っています。
    
    -   ［記事を検索］ボタンを押下し検索窓に「selenium」と入力し検索を行う。
    -   検索結果の1件目の記事を選択する。
    -   記事内のページングを操作し、1ページ目 → 2ページ目 → 1ページ目と遷移する。
    -   トップページに再度遷移する。
4.  画面右上の［Stop recording］ボタンを選択し、記録を停止します。
    
5.  実際の動作がわかりやすいよう、テストスピードを少し遅くします。
    
6.  ［Run current test］ボタンを押下し、記録したテストケースを実行します。
    

デモ動画の通り、Selenium IDEでは**非同期で表示される要素や画面遷移後の別画面の要素に対しての操作なども制御できます**。

### エクスポート機能

Selenium IDEにはエクスポート機能が搭載されており、任意の言語（JavaScriptやJava、Python、Rubyなど）に対応したテストケースを出力できまます。

![](https://ics.media/entry/17626/images/images/180404_selenium_export_220917.png)

### おわりに

みなさまも、Selenium IDEを活用し、開発やテストケースの作成に役立ててください。

また、Chromeの開発者ツールにはレコーダーパネルが同梱されており、Selenium IDEと同じようなことが実現できます。

Seleniumと[Pupeteer](https://pptr.dev/)、[Playwright](https://playwright.dev/)とさまざまなユーザー操作をシミュレーションするツールが存在します。目的にあわせて使い分けるといいでしょう。