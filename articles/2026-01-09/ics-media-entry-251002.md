---
title: "若手フロントエンドエンジニアのためのバックエンド入門（後編）"
source: "https://ics.media/entry/251002/"
publishedDate: "2025-10-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

2025年10月2日 公開 / [株式会社ICS 北川 杏子](https://ics.media/entry/staff/kitagawa/)

フロントエンド開発では`fetch()`メソッドなどを使ってREST APIにリクエストを送る処理を書くことがあります。リクエストを送られた先で動くのがバックエンドです。この記事ではバックエンドの仕組みをよく知らない若手フロントエンドエンジニア向けに、前後編に分けてハンズオン形式で仕組みを解説します。

[前編](https://ics.media/entry/250925/)では簡単なREST APIを作成してフロントエンドから呼び出すところまで実装しました。後編である今回はメモアプリを作りながら、データベースへの保存・更新・取得・削除を実装します。前編と比べると少し難しくなりますが、その分バックエンドの基本的な流れを学べます。

完成したアプリのデモは以下から確認できます。**このアプリは全体に公開されています。個人情報や誹謗中傷など、不適切な内容は書き込まないでください。** アプリの起動には時間がかかる場合があります。読み込み中の表示になる場合は1分ほど待ってから再度アクセスしてください。

-   [デモを確認する](https://two51009-memoapp-demo.onrender.com/)

![メモアプリ](https://ics.media/entry/251002/images/251002_memoapp.gif)

### バックエンドの技術構成

バックエンドは[NestJS](https://nestjs.com/) + [TypeORM](https://typeorm.io/) + [SQLite](https://sqlite.org/)という構成で作ります。バックエンドとフロントエンドの通信にはREST APIを採用します。これらは近年のGraphQLやNoSQLといった選択肢と比べてシンプルで学習コストが低く、基礎の理解に適しています。とくに以下のようなメリットがあります。

-   安定していて基本的な技術のため多くのプロジェクトで使われていて、知っておく価値が高い。
-   データベースとやり取りする流れを理解しやすい。
-   情報が豊富なので詰まったときに解決しやすい。

#### それぞれの役割

-   NestJS: Node.jsでバックエンドのアプリケーションを作るためのフレームワークです。フロントエンドからのリクエストを受け取り、処理を行い、レスポンスを返す一連の処理を行います。
-   SQLite: 軽量のデータベースで、1つのファイルにデータを保存します。今回作るメモアプリのような小さなアプリに便利です。
-   TypeORM: データベースを操作する際は通常SQLという言語を使いますが、TypeORMを使うとTypeScriptで記述できます。

### バックエンドの概念

実装に入る前に、バックエンドとREST APIの基本概念を簡単におさえておきましょう。

#### CRUD

CRUD（クラッド）とは「Create」、「Read」、「Update」、「Delete」の頭文字をとった言葉です。バックエンドの処理はほとんどこの4つの組み合わせです。

-   Create: データを新しく作る
-   Read: データを取得する
-   Update: データを更新する
-   Delete: データを削除する

#### HTTPメソッド

フロントエンドからバックエンドにリクエストを送信するときはHTTPメソッドを使います。よく使用するのは「GET」、「POST」、「PUT」、「PATCH」、「DELETE」の5つで、これらを使い分けてバックエンドにどんな処理をしてほしいかを伝えます。

-   GET: データを取得する
-   POST: 新しいデータを作る
-   PUT: データ全体を更新する
-   PATCH: データの一部を更新する
-   DELETE: データを削除する

#### RESTful API

RESTful APIは、REST形式のAPI設計の思想のひとつです。長くなってしまうのでこの記事では説明しません。興味のある方は技術ブログや技術書を読むことをオススメします。

この考え方をもとにメモアプリのREST APIを設計すると以下のようになります。

-   メモの作成: `POST /memos`
-   メモの取得:
    -   一覧: `GET /memos`
    -   特定のメモ: `GET /memos/{メモのID}`
-   メモの更新: `PATCH /memos/{メモのID}`
-   メモの削除: `DELETE /memos/{メモのID}`

ポイントは、**HTTPメソッドを使っていることと、どのメモのデータ（リソース）にアクセスするかをURLで表している**ことです（メモ全体であれば`memos`、全体の中の1つのメモであれば`memos/{メモのID}`）。

### 準備

環境構築ずみのファイルを用意してあるので、これを変更しながら進めていきます。

1.  「ファイルをダウンロードする」リンクからGitHubのページを開きます。
    -   [ファイルをダウンロードする](https://github.com/ics-creative/251009_memoapp-sample)
2.  GitHubの「Code」→「Download ZIP」からダウンロードします。
3.  ダウンロードしたファイルのルートディレクトリで`npm install`します。

![ダウンロード手順](https://ics.media/entry/251002/images/251002_download_from_git.png)

完成後のファイルも用意しています。わからないことがあればこちらも参照してください。

-   [完成後のコードを確認する](https://github.com/ics-creative/251009_memoapp-sample-complete)

### 1\. データベースを作る

SQLiteとTypeORMを使ってデータベースを作りましょう。

#### ①データベースを定義する

1.  `backend`配下に`db`ディレクトリを作成します。ここにデータを保存するファイル（`memo.sqlite`）が自動的に作成されます。
    -   後述する`MemoModule`で設定を行います。
2.  同じ`db`ディレクトリに`memo.entity.ts`というファイルを作成します。ここに保存するデータの詳細を定義します。
    -   アプリではメモのID、タイトル、内容、作成日時、更新日時を保存します。これらの項目とデータ型を記載します。

▼`memo.entity.ts`

```
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * メモのデータ定義
 */
@Entity()
export class Memo {
  /** メモID */
  @PrimaryGeneratedColumn()
  id: number;

  /** メモのタイトル */
  @Column()
  title: string;

  /** メモの内容 */
  @Column()
  content: string;

  /** 作成日時 */
  @Column()
  createdAt: Date;

  /** 更新日時 */
  @Column()
  updatedAt: Date;
}
```

`@Entity`や`@Column`はデコレーターと呼ばれます。デコレーターには、TypeScriptのもの（旧仕様）とECMAScript標準のものがあり、それぞれ別物です。この記事では前者（TypeScriptの旧仕様のデコレーター）で説明します。

デコレーターを付与することで機能の追加や変更を行えます。1つ1つの説明は割愛しますが、なんとなくそれぞれの項目がどんな型で定義されているのかわかると思います。これでデータベースの定義は完了です。

### 2\. REST APIを作る

前編でも触れましたが、バックエンドは主に「コントローラー（リクエストを受け取る）」と「サービス（データの処理を行う）」2つの種類のファイルがありました。今回もこの2つを作成します。

#### ①MemoServiceを作る

1.  `src/memo.service.ts`を開きます。
2.  コンストラクターで、先ほどのエンティティをinject（注入）して`memoRepository`を作ります。
    -   この`memoRepository`を使ってデータベースへの保存、削除などの処理を行います。

▼`memo.service.ts`

```
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Memo } from "../db/memo.entity";

/**
 * メモのサービスクラス
 */
@Injectable()
export class MemoService {

   // ✨ここを記載
  constructor(
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
  ) {}
}
```

#### ②MemoServiceにメモを登録する処理を書く

メモを1件登録する処理を書いてみましょう。

1.  `MemoService`に`create()`というメソッドを作ります。
2.  `memoRepository`を使って保存する処理を書きます。

▼`memo.service.ts`

```
export class MemoService {
  // 省略

  /**
   * メモを作成する
   * @param memo メモ
   * @returns 作成したメモ
   */
  async create(memo: { title: string; content: string }): Promise<Memo> {
    const newMemo = this.memoRepository.create({
      title: memo.title,
      content: memo.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.memoRepository.save(newMemo);
  }
}
```

`memoRepository.create()`や`save()`はTypeORMのビルトインメソッドです。やっていることは単純で、`memoRepository.create()`で`newMemo`を作り、`memoRepository.save()`でデータベースに登録しています。

#### ③残りの処理を書く

残りの処理を書いていきます。[完成後のMemoService](https://github.com/ics-creative/251009_memoapp-sample-complete/blob/main/backend/src/memo.service.ts)があるので、こちらをコピペしましょう。もちろん自力で書いてもOKです！

1.  メモ全件を取得
2.  メモを1件取得
3.  メモの更新
4.  メモの削除

これでサービスの作成は完了しました。

#### ④MemoControllerを作る

次はコントローラーの処理です。フロントエンドから送ったリクエストはコントローラーに渡り、サービスの処理を呼び出します。

1.  `src/memo.controller.ts`を開きます。
2.  冒頭の`@Controller()`の`()`の中に`"/memos"`を追記します。これはコントローラーのベースURLに当たります。
    -   たとえば、フロントエンドから`https://localhost:3000/memos`に送られたリクエストは`MemoController`が受け取ります。

▼`memo.controller.ts`

```
/**
 * メモのコントローラー
 */
@Controller("/memos") // ✨ここを記載
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  // 省略
}
```

#### ⑤MemoControllerにメモを更新する処理を書く

冒頭でメモアプリのREST APIを以下のように設計しました。コントローラーでは、それぞれの定義に対して1つの関数を書いていきます。

-   メモの作成: `POST /memos`
-   メモの取得:
    -   一覧: `GET /memos`
    -   特定のメモ: `GET /memos/{メモのID}`
-   メモの更新: `PATCH /memos/{メモのID}`
-   メモの削除: `DELETE /memos/{メモのID}`

最初に「メモの更新」処理を作成します。ポイントは3つです。

1.  関数の頭に対応させたいリクエストのHTTPメソッドを指定します。（`@Patch()`）
2.  `()`の中にベースURLに続くURLを指定します。
    -   `/memos/{メモのID}`のメモのIDの部分はパスパラメーターと呼びます。パスパラメーターは`:id`のように記載します。
    -   更新したいメモのIDがこの`:id`部分に渡ってきます。
3.  パスパラメーター、リクエストボディを引数で受け取ります。（`@Param`や`@Body`の部分）

`@Controller`などのデコレーターの説明は[前編](https://ics.media/entry/250925/#%E2%91%A0%E4%BD%9C%E6%88%90%E3%81%95%E3%82%8C%E3%81%9F%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E7%A2%BA%E8%AA%8D)で軽く触れているので、気になる方はご確認ください。

コードの1つ1つを完璧に理解する必要はありません。**Controllerの各関数でどのリクエストを受け取るかを定義し、パスパラメーターやリクエストボディを受け取る流れをざっくりと把握しておきましょう。**

▼`memo.controller.ts`

```
import {
  Body,
  Controller,
  Param,
  Patch,
} from "@nestjs/common";
import { MemoService } from "./memo.service";
import { Memo } from "../db/memo.entity";

@Controller("/memos")
export class MemoController {
// 省略

  /**
   * メモを更新する
   * @param id メモID
   * @param memo 更新するメモ
   */
  @Patch(":id")
  updateMemo(
    @Param("id") id: number,
    @Body() memo: { title: string; content: string },
  ): Promise<Memo | null> {
    return this.memoService.update(id, memo);
  }
}
```

#### ⑥残りの処理を書く

コントローラーの残りの処理を書きます。[完成後のMemoController](https://github.com/ics-creative/251009_memoapp-sample-complete/blob/main/backend/src/memo.controller.ts)をコピペしましょう。こちらも自力で書きたい方はぜひチャレンジしてください！

#### ⑦MemoModuleの設定

今まで書いたコントローラー、サービス、データベースをモジュールに登録します。これはNestJS固有の設定なので詳しい説明は割愛します。`src/memo.module.ts`に[完成後のMemoModule](https://github.com/ics-creative/251009_memoapp-sample-complete/blob/main/backend/src/memo.module.ts)の中身をコピペしましょう！

#### おさらい

ここまでの処理の流れをおさらいしましょう。

`MemoController`が送られてきたリクエストを受け取り、対応するメソッドを実行します。コントローラーから`MemoService`が呼ばれ、データの保存・更新などの処理を行います。データは`memo.sqlite`ファイルに保存されます。

![バックエンドの流れ](https://ics.media/entry/251002/images/251002_backend_flow.png)

### 3\. フロントエンドを作る

コンポーネントは作成ずみなので、REST APIを呼び出す処理を書いていきましょう。

#### ①メモを更新する処理を書く

1.  `frontend/src/logics/handleApi.ts`を開きます。
2.  メモを更新する処理`updateMemo()`を実装します。

`updateMemo()`関数は更新するメモID、タイトル、コンテンツを受け取り、バックエンドにリクエストを送ります。リクエストには[フェッチAPI](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch)を使用します。ここで注目すべきは`fetch()`メソッドの第2引数です。

第2引数は`RequestInit`オブジェクトです。フェッチリクエストを送る際のオプションを設定します。ここでHTTPメソッドや、リクエストヘッダー（今回はjsonで送るので`"Content-Type": "application/json"`を指定）、リクエストボディ（`body: JSON.stringify(memo)`）などを記載します。

▼`handleApi.ts`

```
/**
 * メモを更新する
 * @param id メモID
 * @param memo メモ
 */
export const updateMemo = async (
  id: number,
  memo: {
    title?: string;
    content?: string;
  },
): Promise<Memo> => {
  const response = await fetch(`${API_BASE_URL}/memos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memo),
  });
  if (!response.ok) throw new Error("Failed to update memo");
  return response.json();
};
```

このリクエストは先ほど作った`memo.controller.ts`の`updateMemo()`が受け取ります。`PATCH`メソッドで`/memos/{メモのID}`宛に送られたためです。

このようにフロントエンドとバックエンド間でデータをやり取りすることでアプリが動きます。

#### ②残りの処理を実装する

残りの処理も書いていきましょう。

1.  メモを1件作成
2.  メモ全件の取得
3.  メモを1件取得
4.  メモの削除

[完成後のhandleApi.tsはこちら](https://github.com/ics-creative/251009_memoapp-sample-complete/blob/main/frontend/src/logics/handleApi.ts)です。参考にしてください。

### 4\. アプリを動かしてみよう

作ったアプリを動かしてみましょう！　うまく動くでしょうか？

```
# バックエンドを起動
npm run dev:backend
```

```
# 新しいターミナルを開いてフロントエンドを起動
npm run dev:frontend
```

#### CORSエラーのケアを忘れずに

残念ながらこのままだとエラーになります。前編でも発生したCORSエラーです。前編と同様に、`/backend/src/main.ts`に設定を追加しましょう。

▼`main.ts`

```
// CORS設定（フロントエンドからアクセス可能にする）
app.enableCors({
  origin: "http://localhost:5173", // フロントエンドのURL
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
});
```

#### 完成

ついにアプリが完成しました！　メモの作成、更新、削除などの操作を実際に確かめてみましょう。

![メモアプリ](https://ics.media/entry/251002/images/251002_memoapp.gif)

### まとめ

前編では簡単なREST APIを、後編はデータベースを構築してアプリを作りました。バックエンドの仕組みが理解できたでしょうか？

バックエンドを構築できると本格的なアプリを作れるようになります。実際のサービスでは認証・認可やセキュリティなど、さらに多くの知識が求められるため、まだまだ学習すべきことはたくさんあります。筆者も勉強中です。

この記事がバックエンドの学習に踏み出すはじめの一歩となれば嬉しいです。

### 参考サイト・書籍

-   [Zalando RESTful API と イベントスキーマのガイドライン - 11. HTTPリクエスト](https://restful-api-guidelines-ja.netlify.app/#http-requests)
-   『[Webを支える技術](https://gihyo.jp/book/2010/978-4-7741-4204-3)』