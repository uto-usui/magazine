---
title: "若手フロントエンドエンジニアのためのバックエンド入門（前編）"
source: "https://ics.media/entry/250925/"
publishedDate: "2025-09-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

2025年9月25日 公開 / [株式会社ICS 北川 杏子](https://ics.media/entry/staff/kitagawa/)

フロントエンド開発では、よく`fetch()`メソッドや`axios`等でREST APIにリクエストを送る処理を書くことがあります。リクエストを送ったあとにサーバー側で動くのがバックエンドですが、仕組みをよく知らない方もいるのではないでしょうか？

この記事では前後編に分けて、フロントエンド開発をはじめた若手エンジニアに向けて**ハンズオン形式でバックエンドの仕組みを解説します。**

前編である今回は、「こんにちは！」という文字を返す簡単なREST APIを実装して画面から呼び出します。

![REST APIを呼び出す](https://ics.media/entry/250925/images/250925_firstapp_done.gif)

### バックエンドって？

一般的に、フロントエンドが「見た目・操作」を担当するなら、**バックエンドは「データの保存・処理・提供」を担当します。** ECサイトを例にすると、以下のように役割が分かれていることが多いです。

-   フロントエンド：商品一覧やカート画面など、ユーザーが直接目にする部分を担当
-   バックエンド：商品情報、在庫、ユーザーの購入履歴などをデータベースに保存しておく。ユーザーの操作に応じて検索や購入処理、在庫数の管理を担当

![バックエンドとフロントエンドの役割](https://ics.media/entry/250925/images/250925_front_back.png)

#### なぜバックエンドが必要か

商品がいくらで、今の在庫はいくつか？　などの情報は、すべてのユーザーに同じ内容を表示する必要があります。ユーザー個人の情報は、本人にだけ表示します。

ここで活躍するのバックエンドです。データを保存しておき、それを管理し、必要な分だけ取り出すといった処理を実現するためにバックエンドが必要です。

#### この記事でのバックエンドの位置づけ

この記事では、前述したECサイトの例のように見た目とデータの処理を分離し、データの処理を行う部分を「バックエンド」と定義します。一方で、WordPressのように見た目とデータの処理の分かれ目をあまり意識しない構成もあります。

また、フロントエンドとバックエンドの間の通信方法として「REST API」を使いますが、「GraphQL」等の別の方法もあることを補足しておきます。

### さっそくREST APIを作ってみよう！

今回使う[NestJS](https://nestjs.com/)はTypeScriptで記述できるNode.jsのフレームワークです。JavaやPHPといった別の言語を学ぶ必要はないので手を動かしながら学んでいきましょう。

この記事では[Node.js](https://nodejs.org/ja/download)（例：v22.19.0 LTS以上）とnpmがインストール済みであることを前提としています。

#### ディレクトリ構造

今回のディレクトリ構造は以下の通りです。まずバックエンドを作成し、その後フロントエンドを作成します。

```
first-app/
├─ backend/ # NestJS のバックエンド
└─ frontend/ # Vite + React のフロントエンド
```

進める上でわからないことがあれば、完成後のコードも用意してあるので参照してください。

-   [完成後のコードを確認する](https://github.com/ics-creative/250925_first-app-sample)

### 1\. バックエンドのプロジェクトを作る

まずはプロジェクトルートのフォルダーを作成します。記事や完成後のコードでは`first-app`という名前を使いますが、好きな名前に変更しても大丈夫です。

#### ①NestJSのプロジェクトを作成する

プロジェクトルートに移動し、NestJSのプロジェクトを作成します。パッケージマネージャーを選択するよう求められるので、お好きなものを選択してください。この記事では`npm`を使用します。

```
# プロジェクトルートに移動
cd first-app
# NestJSのプロジェクトを作成
npx @nestjs/cli@latest new backend --strict
```

`backend`というディレクトリができました。これでプロジェクトの作成は完了です！

### 2\. すでに作られている処理を見てみよう

`backend`ディレクトリを確認すると`src`の中にすでにファイルがあります。

#### ①作成されたファイルの確認

`src`の中の重要なファイルを解説します。大まかな処理の流れを把握しましょう。

-   `main.ts`: エントリーポイント。サーバーを立ち上げる処理が書かれています。
-   `app.controller.ts`: フロントエンドから送られたリクエストはここに届き、リクエストの種類に応じて各メソッドを呼び出します。
-   `app.service.ts`: controllerから呼ばれ、実際のロジック（データの処理など）はここに書きます。
-   `app.controller.spec.ts`: テストコードです。今回は編集しません。
-   `app.module.ts`: NestJSではアプリを「モジュール」単位に分けて構築します。このモジュールを定義するファイルです。今回は編集しません。

`app.controller.ts`と`app.service.ts`のなかを見てみると、実はすでにGETで「Hello World!」という文字列を返す処理が書かれています。

▼`app.controller.ts`

```
// 省略

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // GETメソッドで呼ばれたリクエストはここに来る
    // app.service.tsのgetHello()メソッドを呼ぶ
    return this.appService.getHello();
  }
}
```

▼`app.service.ts`

```
// 省略

@Injectable()
export class AppService {
  getHello(): string {
    // Hello World!という文字列を返す
    return "Hello World!";
  }
}
```

見慣れない`@Controller()`や`@Get()`という記載があります。これらはデコレーターと呼ばれます。デコレーターには、TypeScriptのもの（旧仕様）とECMAScript標準のものがあり、それぞれ別物です。この記事では前者（TypeScriptの旧仕様のデコレーター）で説明します。

NestJSでは`@Controller()`でルーティングをあつかいます。たとえば`@Controller("/user")`と書いた場合は`https://(任意のURL)/user`あてのリクエストを受け取ります。`@Get()`はHTTPメソッドのGETに対応する関数を定義するために使います。

`app.controller.ts`では、`@Controller()`は引数がないためベースURL（`https://(任意のURL)/`）あてのリクエストを受け取り、GETメソッドであれば`getHello()`が実行されます。

#### ②実際にREST APIを呼び出してみる

ブラウザでREST APIを呼び出してみましょう。まずはバックエンドを起動します。

```
# backendディレクトリに移動
cd backend
# バックエンドを起動する
npm run start:dev
```

初期設定では`3000`のポートが使われるので、`http://localhost:3000`をブラウザに入力してみましょう。「Hello World!」が画面に表示されたら成功です！

![Hello Worldが画面に表示される](https://ics.media/entry/250925/images/250925_api_browser.png)

#### ③文字列を変更してみる

文字列を変更してみましょう。`AppService`の`getHello()`メソッドで返す文字列を「こんにちは！」に変更します。

▼`app.service.ts`

```
export class AppService {
  getHello(): string {
    return "こんにちは！"; // ✨ここを変更する
  }
}
```

もう1度`http://localhost:3000`をブラウザに入力すると、「こんにちは！」が表示されます。

### 3\. フロントエンドのプロジェクトを作る

次はフロントエンドの構築です。ビルドツールはViteヴィート、ライブラリはReactを使います。

#### ①Reactプロジェクトを作る

バックエンドとは別のターミナルまたはコマンドプロンプトを開きます。バックエンドはそのままサーバーを起動し続けておく必要があるためです。

```
# 新しいターミナルを開き、プロジェクトルートに移動する
# ViteでReactのプロジェクトを作成
npm create vite@latest
```

対話型のCLIでいくつか質問されるので、以下のように回答します。

1.  Project name: `frontend`
2.  Select a framework: `React`
3.  Select a variant: `TypeScript`
4.  そのほかの質問はデフォルトの選択肢を選びましょう

#### ②`frontend`プロジェクトで依存関係をインストールする

作成した`frontend`ディレクトリに移動し、`npm install`コマンドを実行します。

```
cd frontend
npm install
```

### 4\. フロントエンドからREST APIを呼び出す

最後のステップです。REST APIを呼び出して「こんにちは！」を画面に表示しましょう。

#### ①REST APIを呼び出す処理を書く

`App.tsx`に処理を記載します。デフォルトで書かれている不要なコードは削除してください。

▼`App.tsx`

```
import { useState } from "react";
import "./App.css";

function App() {
  // バックエンドから取得したデータを格納する
  const [hello, setHello] = useState<string | null>(null);

  // バックエンドからデータを取得する関数
  const fetchHello = async () => {
    const response = await fetch("http://localhost:3000");
    const text = await response.text();
    setHello(text);
  };

  return (
    <>
      <button onClick={fetchHello}>あいさつする</button>
      {hello && <p>{hello}</p>}
    </>
  );
}

export default App;
```

#### ②動かしてみよう

フロントエンドを起動します。もしバックエンドのプロジェクトを起動していない場合は、別のターミナルで起動しておきましょう。

```
## フロントエンドを起動する
npm run dev
```

```
## 別のターミナルでbackendディレクトリに移動し起動する
cd /backend
npm run start:dev
```

デフォルトではポートは`5173`になっているので、`http://localhost:5173`をブラウザに入力します。

※Viteのプロジェクトを複数起動していた場合は`5173`ではない場合もあります。`5173`で表示できない場合はターミナルに表示されるURLを確認してください。

画面の「あいさつする」ボタンをクリックします。しかし、このままでは画面に何も表示されません。

![あいさつするボタンをクリック](https://ics.media/entry/250925/images/250925_front_say_hello.png)

#### ③CORSエラーの解決

ブラウザの「検証」パネルを開いてみると、コンソールログにエラーの表示があります。**CORSエラーです。**

![コンソールログにCORSエラーの表示](https://ics.media/entry/250925/images/250925_cors_error.png)

CORSエラーは「Cross-Origin Resource Sharing」の略で、別のオリジンどうし（今回で言えば`localhost:5173`と`localhost:3000`）でやり取りすると起こるエラーです。フロントエンド開発ではよく遭遇するため、見たことがある方もいるのではないでしょうか？

解決する方法は簡単です。バックエンド側でこのオリジンなら信用していいよ、という設定をするだけです。以下の通り、`backend/src/main.ts`に`http://localhost:5173`からのGETのアクセスを許可する設定を記述します。

▼`main.ts`

```
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS設定（フロントエンドからアクセス可能にする）
  app.enableCors({
    origin: "http://localhost:5173", // ✨フロントエンドのURLを記載する
    methods: ["GET"], // ✨GETメソッドならOKだよと記載する
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
```

#### ④もう一度動かしてみよう

画面の「あいさつする」ボタンをクリックして、「こんにちは！」が表示されたら完成です！

![こんにちは！が表示される](https://ics.media/entry/250925/images/250925_front_say_hello_2.png)

### まとめ

簡単なREST APIを作り、画面に表示するところまで実装しました。フロントエンド開発をしているとよく遭遇するCORSエラーを解消することもできました。実際に作ってみると意外とシンプルですよね。

ただ、もちろんこのままでは何のおもしろみもありません。せっかくならアプリを作りたいですよね！

[後編](https://ics.media/entry/251002/)ではメモアプリを作ります。画面で入力した内容をデータベースに保存したり、保存した値を取り出して表示する実装に挑戦します。