---
title: "Node.jsとSeleniumでWebアプリのUIテストを自動化"
source: "https://ics.media/entry/5759/"
publishedDate: "2015-03-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

ウェブアプリケーションを開発する際、みなさんはどのように動作確認（試験）を行っていますか？　ウェブアプリケーションは、ユーザーごとに異なるブラウザを使用しており、ユーザー操作も必要となるため、手作業でテストをされている方も多いと思います。また、機能改修やバグフィクス後に、リグレッションテスト（改修により既存機能への影響がないかを確認する回帰テスト）が必要となりますが、時間が取れず試験ができていない方も多いのではないでしょうか。

本記事では、これらのテストを自動化することのできる「[Selenium Webdriver](https://www.selenium.dev/documentation/webdriver/)」（セレニウム・ウェブドライバー）について紹介します。

### 入力フォームのバリデーション機能をチェックするデモ

簡単な入力フォームのバリデーション機能をチェックするデモを動画で紹介しましょう。入力値に対して期待するエラー文言が表示されているかのテストを実施しています。Selenium Webdriverでできることがイメージできると思います。

### Selenium Webdriver とは

Seleniumは、ウェブアプリケーションのテストを自動化するオープンソースソフトウェアです。2011年に、Google開発していた「WebDriver」と統合し、「Selenium WebDriver」としてリリースされました。「Selenium WebDriver」の大きな特徴としては、複数言語対応とマルチブラウザ対応の2点が挙げられます。

#### 複数言語対応

さまざまな言語でSeleniumのテストコードを作成できます。現在（2025年5月）時点では以下の言語に対応しているため幅広いユーザーに使いやすくなっています。

-   JavaScript
-   Java
-   .NET/C#
-   Ruby
-   Python

#### マルチブラウザー対応

現在（2025年5月）時点では以下の通り、デスクトップのブラウザーだけでなくiPhoneやAndroidのモバイルブラウザーに対応しています（関連記事『[iOS 13のSafariブラウザが「WebDriver」を正式サポート。SeleniumなどによるUIテストの自動化が容易に － Publickey](https://www.publickey1.jp/blog/19/ios_13safariwebdriverseleniumui.html)』）。

-   Chrome
-   Edge
-   Safari
-   Firefox

※以前はSeleniumはサードパーティーが公開しているドライバーを使用することで、さまざまなブラウザーで利用できましたが、今はブラウザが標準にドライバーを組み込んでいるため、特別な設定がなくても利用できます。

### Selenium Webdriverでできること

Selenium Webdriverは、ユーザー操作でできることはほとんど実行できます。クリックやスクロール・文字入力などはもちろん、ウィンドウサイズの調整やCookieやセッション情報の書き換えも可能です。

また、スクリーンショットを撮ることもできるため、レスポンシブレイアウト等の表示確認やテスト実施時のテストエビデンス（※1）として画面を残しておくことができるため、テストの用途だけでなく、自動化ツールとしても使用できます。

Selenium Webdriverは、ウェブサイトの管理画面やユーザーのマイページ、SPA（シングル・ページ・アプリケーション）などのテストに適しています。

※1　テストエビデンスとは、テスト実施の記録（証拠）となるもので、テストを実施時のスクリーンショットなどが使われます。

### Node.jsとSeleniumの環境構築の手順

JavaScript（Node.js）を使ってChromeブラウザでテストを実施するテストコードを作成します。この記事で解説するサンプルはGitHubからダウンロードできます。

-   [ソースコードを確認する](https://github.com/ics-creative/180523_selenium_webdriver)

事前にNode.jsをインストールし、コマンドラインを使う準備をしておいてください。

1.  公式サイトから[Node.js](https://nodejs.org/ja/download)をインストールします  
    （バージョン22以上をインストールください）
2.  コマンドラインを起動します  
    (macOSだと「ターミナル」、Windowsだと「コマンドプロンプト」)

テストコードを保存するフォルダーを任意の場所に作成し、コマンドラインでその場所に移動します。cdコマンドで任意のフォルダーまで移動しましょう。

▼ Windowsでの移動

```
cd C:¥Users¥MyName¥myproject
```

▼ macOSでの移動

```
cd /Users/MyName/myproject
```

続けて、次のコマンドを実行します。こちらを実行すると、プロジェクトの設定情報が記述された`package.json`ファイルが生成されます。

```
npm init -y
```

#### 各種モジュールのインストール

本記事では、`selenium-webdriver`とあわせて、テスティングフレームワークの[Vitest](https://vitest.dev/)を使ってテストコードを作成します。次のコマンドを実行し、インストールを行います。

```
npm i -D selenium-webdriver vitest
```

### テストコードの作成

テストコードとして次のJavaScriptを記述したファイル`form.test.js`を作成しましょう。Vitestでは拡張子が`.test.js`のファイルが自動的にテストの対象になります（正確には`.test.[jt]s[x]`が対象）。

```
import { Builder, By } from "selenium-webdriver";
import { describe, beforeAll, afterAll, test, expect } from "vitest";

let driver;

describe("入力フォーム デモ", () => {
  // テスト開始前にドライバーを起動
  beforeAll(async () => {
    driver = new Builder().forBrowser("chrome").build();
  });

  // テスト終了後にドライバーを終了
  afterAll(async () => await driver.quit());

  test("名前欄の必須入力チェック その1", async () => {
    // テスト対象のページへアクセス
    await driver.get("https://ics-creative.github.io/180523_selenium_webdriver/");

    // 何も入力せずにSubmitする
    await driver.findElement(By.id("submitButton")).click();

    // エラーメッセージを取得して、エラー文言が正しいかチェックする
    const errorMessage = await driver.findElement(By.id("error_name")).getText();
    expect(errorMessage).toBe("名前を入力してください。");
  });

  test("名前欄の必須入力チェック その2", async () => {
    // テスト対象のページへアクセス
    await driver.get("https://ics-creative.github.io/180523_selenium_webdriver/");

    // 名前を入力してSubmitする
    await driver.findElement(By.id("name")).sendKeys("品川太郎");
    await driver.findElement(By.id("submitButton")).click();

    // エラーメッセージを取得して、エラー文言が空であるかチェックする
    const errorMessage = await driver.findElement(By.id("error_name")).getText();
    expect(errorMessage).toBe("");
  });
});
```

`beforeAll()`メソッドと`afterAll()`メソッドはそれぞれテスト前・後に実行される処理を記述します。上記のコードでは、テスト実施前に`new Builder().forBrowser("chrome").build()`のコードによってChromeを起動し、テスト実施後に終了する処理を記述しています。もし、Safariでテストしたければ`new Builder().forBrowser("safari").build()`と指定します。

実際のテスト処理は`test()`メソッドにそれぞれ記述しています。`driver.findElement()`メソッドはHTMLのDOMにアクセスできるメソッドで、`By.id()`メソッドを使ってDOMの中から指定したIDの要素を取得しています。`By.id()`メソッドの他にも`By.name()`、`By.css()`、`By.tagName()`メソッドなどが用意されており、それぞれ`name`属性、cssのクラス、タグなどを指定して要素を取得できます。

テストの合否の判定する処理は、Vitestの`expect()`メソッドを使い`expect(××).toBe(××);`と記述します。`expect()`メソッドは、期待値と合致しているかを検証する命令で、上記のコードでは取得したエラーコードの文言が正しいかを検証している処理になります。

### テストコードの実行

#### 手順1

`npm scripts`を使ってテストを実行するコマンドを準備します。`package.json`ファイルの`scripts`フィールドに、vitestを使ってテストを実行する次のコマンドを追加します。

▼package.json

```
{
  "devDependencies": {
    "vitest": "^3.1.3",
    "selenium-webdriver": "^4.32.0"
  },
  "scripts": {
    "test": "vitest run"
  },
  "private": true
}
```

#### 手順2

次のコマンドを入力し、作成したテストコードを実行します。

```
npm run test
```

#### 手順3

コマンドを実行するとテスト結果がコンソールに表示されます。緑のチェックが入っているものは「テストOK」、赤字になっているものは「テストNG」となります。

サンプルコードの期待値を変更することで、テストNG時の挙動も確認できます。テストNG時の表示では、期待値と実際のエラー文言の内容が違うため、NGとなっていることが確認できます。

▼テストOK時の表示  
![](https://ics.media/entry/5759/images/images/180523_selenium_demo_ok_230120.png)

▼テストNG時の表示  
![](https://ics.media/entry/5759/images/images/180523_selenium_demo_ng_230120.png)

### おわりに

慣れるまではテストコードを作るのに時間がかかり、手動でテストした方が早いのではと思うかもしれません。しかし、**規模が巨大化すると、手動でのテスト工数は膨大な時間になり、自動化のメリットが大きくなります**。また、一度テストコードを作成しておけば、機能改修や運用でのバグ修正時にリグレッションテストを簡単に行えるため、プロジェクト全体を通して見ると、自動化するメリットがあります。

みなさまもご自身のプロジェクトのテスト手法を一度見直してみてはいかがでしょうか？　今回は導入手順の解説のみでしたが、次の続編記事もあわせてご覧ください。

-   [JenkinsとSeleniumでWebの自動UIテスト環境を作ろう](https://ics.media/entry/6031/)
-   [Selenium GridでUI自動テストの並列実行環境を構築](https://ics.media/entry/11141/)
-   [ユーザー操作を記録・再現できるブラウザ拡張Selenium IDEを活用しよう](https://ics.media/entry/17626/)

編集部注＊

-   この記事は、2015年3月公開当初はselenium-webdriver v2.44.0での手順を解説していましたが、2018年5月にv4.0.0-alpha.1を使用した手順に更新しています。それに伴い、selenium serverを起動する手順が不要となり削除しています。
-   2018年にWebDriverがW3C勧告となり、WebDriverがブラウザに標準搭載されたことでドライバーの準備が不要となりました。そのため、ドライバーのインストール手順を記事から削除しています。
-   解説に用いているテストフレームワークはmocha（2015年）→Jest（2023年）→Vitest（2025年）へ変更しています。

※この記事が公開されたのは**10年前**ですが、**8か月前の2025年5月**に内容をメンテナンスしています。