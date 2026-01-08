---
title: "TypeScriptで始めるNode.js入門"
source: "https://ics.media/entry/4682/"
publishedDate: "2015-01-30"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

みなさんは普段[Node.js](https://nodejs.org/en/)をどのように使っていますか？ サーバーサイドで動くJavaScriptランタイムのNode.jsは、[Socket.IO](https://ics.media/entry/4320/)と連携してリアルタイムなウェブコンテンツを作ったり、[Vite](https://ics.media/entry/210708/)や[webpack](https://ics.media/entry/12140/)のようなフロントエンドエンジニアのツールとして使われたりとさまざまな場面で活用されています。

Node.jsで大規模な開発をする場合、**TypeScriptを採用するのはオススメです**。TypeScriptの導入によって開発の生産効率性・保守性を上げることができます。[WebStorm](https://ics.media/entry/16760/)や[Visual Studio Code](https://ics.media/entry/240523/)を使えば以下の利点があります。

-   コード補完が効くためプログラミングの効率が劇的に向上
-   静的型付けによってコンパイル時型チェックが行われるので安全性が向上

Node.jsでTypeScriptを使う方法は、いくつかの方法があります。今回はNode.jsをTypeScriptで記述する基本設定を次の3種類の構成をそれぞれ説明します。

-   ネイティブNode.js（v23.6.0以降）
-   ts-node（型チェック付きランナー）
-   tsx（esbuildベースの高速ランナー）

### なぜ複数の方法があるのか

本来はNode.jsが実行できるのはJavaScriptのみです。

TypeScriptはJavaScriptのスーパーセット（上位互換）なので、TypeScriptをNode.jsで実行するためには、TypeScriptをJavaScriptに変換する必要があります。Node.jsはv23.6.0以降ではTypeScriptの型注釈などの情報を無視してJavaScriptとして実行できるようになりました。ほとんど設定が要らないため、Node.jsをTypeScriptで実行するのにもっとも簡単に扱えます。

一方、Node.jsはv23.6.0未満の環境では異なる手段を使う必要があります（ts-nodeやtsx）。

それぞれ利点があるので、本記事で説明します。

今回のサンプルコードは[GitHub](https://github.com/ics-creative/220405_node_with_typescript)で公開してるので、ダウンロードして読み進めましょう。

#### TypeScript環境の構築

使用環境を整えましょう。まずNode.jsをインストールします。Node.jsは[公式サイト](https://nodejs.org/ja/download)のインストーラーを使って手順にしたいインストールします。Node.jsは必ずバージョン23.6.0以降をインストールしてください。v23.6.0以降はNode.jsでTypeScriptが使えるようになっています。

インストール後コマンドライン（macOSだと「ターミナル.app」、Windowsだとコマンドプロンプト）にて`node -v`と実行し、Nodeのバージョンが表示されていればインストール成功です。

```
node -v
```

コマンドラインに「v23.6.0」といったバージョンが表示されれば成功です。

つづいて、作業フォルダーで次のコマンドを入力します。すると、`package.json`ファイルが作られます。

```
npm init -y
```

つづいて、TypeScriptをインストールします。コマンドラインから以下のコマンドを実行します。TypeScriptをインストールしなくてもNode.jsで動かせますが、型チェックなどの機能を使うためにはTypeScriptをインストールする必要があります。

```
npm install typescript @types/node -D
```

また、Node.jsの型定義ファイルを用意しています。TypeScriptだけだとNode.jsのモジュールにどんなメソッドや変数があるかという情報を持っていないため、コンパイルが通らないことがあります。**型定義ファイルを読み込むとTypeScriptに対応したエディターでコード補完が効く**メリットもあります。

つづいて、TypeScriptのコンパイル設定もしておきましょう。`package.json`と同階層に、`tsconfig.json`ファイルを次の内容で用意します。

▼tsconfig.jsonファイル

```
{
  "compilerOptions": {
    // コンパイル後のJavaScriptのバージョン
    "target": "ESNext",
    // モジュールシステム
    "module": "NodeNext",
    // .ts拡張子を持つファイルのインポートを可能に
    "allowImportingTsExtensions": true,
    // モジュール解決の際に、TypeScriptの構文を厳密に解釈
    "verbatimModuleSyntax": true,
    // すべての厳格な型チェックオプションを有効に
    "strict": true
  }
}
```

`package.json`ファイルの中身を少し修正し、以下のようにします。`scripts`フィールドに`typecheck`コマンドを追加しました。これでTypeScriptの型チェックができるようになります。

▼package.jsonファイル

```
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "private": true,
  "type": "module",
  "devDependencies": {
    "@types/node": "^22.15.18",
    "typescript": "^5.8.3"
  }
}
```

#### TypeScriptファイルの作成

Node.jsをTypeScriptで記述していきましょう。新規テキストファイルを作成して`example1`フォルダーの中に`index.ts`という名前にします。`index.ts`の中にテキストエディターで以下のようなコードを記述します。

```
console.log("Hello! Node.js × TypeScript");
```

-   [サンプルコード](https://github.com/ics-creative/220405_node_with_typescript/blob/main/example-nodejs/example1/index.ts)

コマンドラインで**Node.jsを実行するための`node`コマンド**を実行します。コマンドラインに「Hello! Node.js × TypeScript」と出力されるのが確認できます。

```
node example1/index.ts
```

#### ネットワークから情報を取得する

もう少し複雑な処理にも挑戦しましょう。Node.jsを使うと、ネットワークから情報を取得できます。`example2`フォルダーを作成して、`index.ts`という名前のファイルを作成します。以下のコードを記述します。気象庁のWeb APIを使って、東京都の天気予報を取得するサンプルコードです。

```
// 気象庁の指定地域の天気予報の概要を取得するURL
const url =
  "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/130000.json";

/**
 * 天気予報データを取得し、整形してコンソールに出力します。
 */
async function start() {
  // URLからデータを非同期で取得
  const response = await fetch(url);
  // 取得したレスポンスをJSON形式に変換
  const data = await response.json();

  // 取得したJSONデータを整形してコンソールに出力
  console.log(JSON.stringify(data, null, 2));
}

start();
```

-   [サンプルコード](https://github.com/ics-creative/220405_node_with_typescript/blob/main/example-nodejs/example2/index.ts)

コマンドラインで以下のコマンドを実行します。

```
node example2/index.ts
```

すると、気象庁のJSONデータを取得できます。コマンドラインに出力されます。

```
> node example2/index.ts

{
  "publishingOffice": "気象庁",
  "reportDatetime": "2025-05-14T16:34:00+09:00",
  "targetArea": "東京都",
  "headlineText": "",
  "text": "　関東甲信地方は、高気圧に覆われています。\n\n　東京地方は、晴れや曇りとなっています。\n\n　１４日は、高気圧に覆われますが、気圧の谷や湿った空気の影響を受ける見込みででしょう。\n\n【関東甲信地方】\n　関東甲信地方は、晴れや曇りとなっています。\n\n　１４日は、高気圧に覆われますが、気圧の谷や湿った空気の影響を受ける見込みです。このため、晴れや曇降る所があるでしょう。\n\n　関東地方と伊豆諸島の海上では、１４日から１５日にかけて、波がやや高いでしょう。また、所々で霧が発生する見込みです。船舶は視程障害に注意してください。"
}
```

#### 外部モジュールを作って複数のファイルに分けよう

処理が増える毎に長くなっていくスクリプトの見通しを良くするためには、機能毎に処理を分けて外部ファイル化して外部モジュールを作るといいでしょう。上記のURLの定数を外部ファイルで管理してみましょう。`index.ts`と同じ階層に`config.ts`という外部ファイルを作って`index.ts`から読み込みます。ここで注意したいのは、外部から読み込まれる変数に`export`を指定する必要があることです。

▼config.ts

```
/** 対象のURL */
export const TARGET_URL =
  "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/130000.json";
```

これを読み込む側の`index.ts`の処理ですが、Node.jsのモジュール読み込みと同じように`import`文を使います。拡張子`.ts`は省略できません。

▼index.ts

```
// 外部ファイルを読み込む
import { TARGET_URL } from "./config.ts";

/**
 * 天気予報データを取得し、整形してコンソールに出力します。
 * @param url 取得するURL
 */
async function start(url: string) {
  // URLからデータを非同期で取得
  const response = await fetch(url);
  // 取得したレスポンスをJSON形式に変換
  const data = await response.json();

  // 取得したJSONデータを整形してコンソールに出力
  console.log(JSON.stringify(data, null, 2));
}

start(TARGET_URL);
```

-   [サンプルコード](https://github.com/ics-creative/220405_node_with_typescript/tree/main/example-nodejs/example3)

このファイルを次のコマンドを入力し、実行します。

```
node example3/index.ts
```

先ほどと同様に気象庁のJSONデータが取得できたら、成功です。外部ファイル`config.ts`に記述した変数をメインの処理から参照できました。

#### 静的型チェック

ここで注意したいのは、`node`コマンドによる`.ts`ファイルの実行は、型チェックが行われないことです。コードが間違っていようが、Node.jsはそのまま実行してしまいます。たとえば、`index.ts`の`start()`関数の引数に`string`型を指定していますが、引数に`number`型の数値`123`を渡してもエラーになりません（その後のランタイム実行でコケますが、本来は引数の時点でコンパイルエラーにするべきです）。

```
start(123); // number型を渡してもコンパイルエラーにならない
```

対策として、`tsc`コマンドを使ってTypeScriptの型チェックを行います。`tsc`はTypeScriptのコンパイラで、JavaScriptに変換するだけでなく、型チェックも行います。`package.json`ファイルの`scripts`フィールドに`typecheck`コマンドを追加しているので、以下のコマンドを実行します。

```
npm run typecheck
```

もしTypeScriptの型チェックにエラーがあれば、コンパイルエラーが表示されます。すべてエラーを解消するように、コードを修正します。

これで、Node.jsを使ったTypeScriptの実行環境の作成は完了です。小規模な開発なら、Node.jsの`node`コマンドで直接実行するのが便利でしょう。

### ts-nodeを使ったTypeScript環境の構築

Node.jsのv23.6.0未満のバージョンでは、TypeScriptを直接実行することはできません。そこで、TypeScriptをコンパイルしてJavaScriptに変換してからNode.jsで実行する必要があります。

TypeScriptをコンパイルしてNode.jsを実行できるようにするモジュールが「[ts-node](https://typestrong.org/ts-node/)」です。ts-nodeは古いNode.jsのバージョンでもTypeScriptを実行できるようにしてくれます。また、型チェックの機能も存在するため、TypeScriptの型チェックの恩恵を得ながら開発したい場合に便利です。

導入の際には、以下のコマンドを実行します。

```
npm install typescript ts-node
```

```
npm install @types/node -D
```

これで`package.json`ファイルの`scripts`フィールドの中に`start`コマンドを追加しておきます。

▼package.jsonファイル

```
{
  "scripts": {
    "start": "ts-node example3/index.ts"
  },
  "dependencies": {
    "typescript": "^5.8.3",
    "ts-node": "^10.9.2"
  },
  "devDependencies": {
    "@types/node": "^22.15.18"
  },
  "private": true
}
```

つづいて、TypeScriptのコンパイル設定もしておきましょう。`package.json`と同階層に、`tsconfig.json`ファイルを次の内容で用意します。

▼tsconfig.jsonファイル

```
{
  "compilerOptions": {
    "target": "ESNext",
    // モジュールシステム
    "module": "NodeNext",
    // .ts拡張子を持つファイルのインポートを可能に
    "allowImportingTsExtensions": true,
    // すべての厳格な型チェックオプションを有効に
    "strict": true
  }
}
```

以上でNode.jsをTypeScriptで記述する環境の構築は終了です。`npm run start`コマンドをうてば動作します。

サンプルコードは以下に掲載していますのでご確認ください。

-   [サンプルコード](https://github.com/ics-creative/220405_node_with_typescript/tree/main/example-ts-node)

### tsx を使ったTypeScript環境の構築

ts-nodeはTypeScriptをコンパイルして実行するため、コンパイルに時間がかかります。ts-nodeは開発時に便利ですが、実行速度が遅くなるのがデメリットです。そこで、ts-nodeの代替品として「[tsx](https://tsx.is/)」があります。tsxは内部的にesbuildを使ってTypeScriptをコンパイルして実行するため、ts-nodeよりも高速に実行できます。

導入するには以下のコマンドでインストールします。

```
npm install tsx typescript
```

```
npm install @types/node -D
```

tsxは型チェック機能がないため、型チェックを行うにはtscコマンドを実行する必要があります。`package.json`ファイルの`scripts`フィールドに`typecheck`コマンドを追加しておきましょう。

```
{
  "scripts": {
    "start": "tsx 実行したい.tsファイルのパス",
    "typecheck": "tsc --noEmit"
  },
  "private": true,
  "dependencies": {
    "tsx": "^4.19.4",
    "typescript": "^5.8.3"
  },
  "devDependencies": {
    "@types/node": "^22.15.18"
  }
}
```

サンプルコードは以下に掲載していますのでご確認ください。

-   [サンプルコード](https://github.com/ics-creative/220405_node_with_typescript/tree/main/example-tsx)

### ネイティブかts-nodeかtsxか

Node.jsネイティブで「`.ts`をそのまま走らせる」ことはできますが、ts-nodeやtsxはどのような利点があるのでしょうか。Node.jsネイティブは実は`tsconfig.json`ファイルを一切見ません。IDE等が勝手に`tsconfig.json`をみて、コードのエラー等をエディター上で検知しているだけです。`tsconfig.json`ファイルの複雑な指定が存在する場合は、ts-nodeやtsxを使う必要があります。

とくにts-nodeやtsxは「React等のJSX/TSXファイルの扱い」、「tsconfig.jsonのpaths解決」に対応しています。

### 最後に

Node.jsをTypeScriptで記述すると静的型付けの恩恵に預かることができ、**大規模な開発やメンテナンスがやりやすくなります**。

npm scriptsにはts-nodeの起動コマンドも記述しておくと、開発が楽になるでしょう。npm scriptsについては記事「[npm-scriptsのタスク実行方法](https://ics.media/entry/12226/)」を参照ください。