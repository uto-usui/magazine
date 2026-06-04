---
title: "WebStorage / IndexedDB / OPFS 個人開発でも活躍するブラウザーのデータ保存機能を紹介"
source: "https://ics.media/entry/260603/"
publishedDate: "2026-06-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

ウェブアプリではデータをサーバーのDBに保存するのが一般的です。一方、ブラウザー自身にもデータを保存するための高度な仕組みが存在します。オフラインで動く高速なエディター、巨大なファイルを扱える画像加工ツール、サーバーレスでも安心して使える個人用メモアプリなど、うまく使えば、**ネイティブアプリに近いUXをブラウザーだけで実現できます**。

とくに最近では、AIに頼んでサクッと作る「バイブコーディング」で個人用ツールを作るケースも増えてきました。個人用のツールではサーバーDBを用意するよりも、**ブラウザー内に閉じてデータを管理する方が手軽で安全なケースも多い**でしょう。

この記事では、ブラウザー内にデータを保存するための代表的な選択肢である`WebStorage`（`LocalStorage`/`SessionStorage`）、`IndexedDB`、`OPFS`（Origin Private File System）の3つを紹介し、それぞれの使いどころを整理します。

### 3つの選択肢を比較してみよう

まずは3つのストレージの特徴を一覧で比較してみましょう。

WebStorage  
(LocalStorage / SessionStorage)

IndexedDB

OPFS

**保存できるデータ**

文字列のみ

構造化データ  
（オブジェクト、Blob、ArrayBufferなど）

ファイル（バイナリ・テキスト）

**容量の目安**

最大5〜10MB程度

〜数GB  
（ブラウザーや空き容量に依存）

〜数GB  
（ブラウザーや空き容量に依存）

**APIの形式**

同期的なKey-Value

非同期のオブジェクトストア

非同期のファイルシステム

**データへのアクセス方法**

キーを指定したアクセス

主キー・インデックスによる検索

ディレクトリ・ファイル単位でアクセス

**主な用途**

設定・画面状態等の小規模データの保持

大量の構造化データの保存

大容量バイナリ・ファイルの保存

**学習コスト**

簡単

やや難しい。ライブラリの利用も検討

基本はシンプル

3つのストレージはそれぞれ得意分野が異なります。この中で一番手軽なのは`WebStorage`ですが、何も考えずになんでも入れてしまうと、容量制限やパフォーマンスの問題にぶつかりやすくなります。

### デモ：3つのストレージを併用したアプリ（簡易ペイントソフト）

まずは3つのストレージ機能を活用した簡単なデモを見てみましょう。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260601_storage_api/)

このデモは簡単なペイントツールです。複数のレイヤーを追加して好きな色と太さの線を描くことができます。**ストレージを利用することで、リロードしても設定や描いた内容が消えません**。

-   **LocalStorage**：ブラシの色・太さなどユーザー設定を保持します。設定を変えるとデバッグ表示の「LocalStorage」の値も変わることを確認してみてください。  
    [→ ソースコード：LocalStorageを使用した設定の読み書き](https://github.com/ics-creative/260601_storage_api/blob/main/src/storage/settings.ts)
-   **IndexedDB**：すべての操作履歴を保存します。線を引くたびにデバッグ表示の「IndexedDB」にレコードが追加されていくことを確認してみてください。この履歴はUndo/Redoや、保存せずにリロードした場合の復元に使用します。  
    [→ ソースコード：IndexedDBを使用した操作履歴の保存・取得](https://github.com/ics-creative/260601_storage_api/blob/main/src/storage/history.ts)
-   **OPFS**：レイヤーの画像データを保存します。線を引くたびにファイルを保存すると負荷が高いので、このデモでは「Save」ボタンを押したときにまとめて保存するようにしています。保存されたファイルはデバッグ表示の「OPFS」から確認できます。  
    [→ ソースコード：OPFSを使用したレイヤー画像の保存](https://github.com/ics-creative/260601_storage_api/blob/main/src/storage/snapshot.ts)

それぞれのストレージがどのような場面に向いているのか、なんとなくイメージが湧いてきたでしょうか？　ここから先は、3つの選択肢を順番に詳しく見ていきましょう。

### 選択肢1：LocalStorage / SessionStorage：手軽なKey-Value Store

最初に紹介するのは、もっとも手軽な`WebStorage`（`LocalStorage`と`SessionStorage`）です。

`WebStorage`は、その名の通り**文字列のKey-Value（名前と値のペア）をブラウザーに保存する**シンプルな仕組みです。`LocalStorage`はブラウザーを閉じても残り、`SessionStorage`はタブを閉じると消える点が異なりますが、基本的な使い方は同じです。

APIは最小限で、すぐに使えるのが最大の魅力です。ダークモードの切り替え状態や、フォームの入力途中の値、サイドバーの開閉状態など、**小さくて頻繁にアクセスする「設定」や「画面状態」の保存に向いています**。デモアプリではブラシの色や太さの保存に使っていましたね。

#### LocalStorage / SessionStorageの使い方

```
// 保存
localStorage.setItem("theme", "dark");

// 取り出し
const theme = localStorage.getItem("theme"); // "dark"

// 削除
localStorage.removeItem("theme");

// 全削除
localStorage.clear();
```

オブジェクトを保存したい場合は`JSON.stringify()`で文字列に変換してから保存します。

```
const settings = {
  color: "#FF0000",
  width: 4,
  selectedLayerId: "layer-1"
};
localStorage.setItem("settings", JSON.stringify(settings));

const loaded = JSON.parse(
  localStorage.getItem("settings") ?? "{}"
);
```

`LocalStorage`は簡単に使えますが、何でも入れていい場所ではありません。同期APIなので大きなデータの読み書きはメインスレッドをブロックしますし、容量も5〜10MB程度と決して大きくはありません。また、文字列しか扱えないため画像などのバイナリは扱いにくく、JSONに変換すればサイズも肥大化します。

「設定」や「ちょっとした状態」を保存する以上の用途では、次に紹介する`IndexedDB`の出番です。

### 選択肢2：IndexedDB：大容量・構造化データ

`IndexedDB`はブラウザー内に組み込まれた**非同期のオブジェクトデータベース**です。`LocalStorage`とは違い、文字列以外にもオブジェクト・配列・`Blob`・`ArrayBuffer`など、さまざまなデータをそのまま保存できます。インデックスを張って範囲検索を行うこともできるため、**大量のデータを扱うアプリケーションのデータベース**として機能します。

容量も`LocalStorage`より遥かに大きく、用途次第では数百MB〜数GB程度のデータを保存できます。「TODOアプリの全項目」「読み終わったRSS記事の本文キャッシュ」「Undo/Redo用の操作履歴」など、**ある程度の構造をもったデータをまとめて保存したい**ケースに向いています。

デモアプリでは、ユーザーの操作履歴を保存するために`IndexedDB`を使っています。操作履歴のひとつひとつは小さなデータですが、数千件単位のデータを貯めていくには`LocalStorage`では厳しいでしょう。`transaction`を利用することで安全にデータの更新ができるのもポイントです。

#### コラム：IndexedDBとRDBの違い

「データベース」と聞くとRDB（リレーショナルデータベース。MySQLやPostgreSQLなど）をイメージした方もいるかもしれません。トランザクションやインデックスといった概念は共通していますが、**RDBの感覚で扱おうとすると戸惑う点もいくつかあります**。

まず、`IndexedDB`にはSQLのようなクエリ言語がありません。データの取得は基本的に**主キーやインデックスの値を指定したルックアップ、または範囲スキャン**で行います。「`age > 30 AND city = '東京'`のような複合条件で絞り込む」といった操作を素直に書く方法はなく、複合インデックスを工夫して張るか、取得後にコード側でフィルターする必要があります。複数のオブジェクトストア（RDBでいうテーブルに近いもの）をまたいで結合する**JOIN相当の機能もありません**。

スキーマの考え方も異なります。オブジェクトストアにカラム定義はなく、任意の形のオブジェクトを自由に入れられる反面、データの整合性はアプリケーション側で担保する必要があり、RDBのような制約（NOT NULL、外部キーなど）に頼ることはできません。マイグレーションも`onupgradeneeded`イベントの中で手書きする必要があります。

複雑なクエリが必要になってきたら、[SQLite WASM](https://sqlite.org/wasm/doc/trunk/index.html)や[PGlite](https://pglite.dev/)といったブラウザー上で動くRDBを検討するのもよいでしょう。これらは裏側で`IndexedDB`や`OPFS`をストレージとして利用できます。

#### IndexedDBの使い方

`IndexedDB`は機能が豊富な分、APIがやや煩雑です。ここではメモアプリを想定して、データを保存・取得する最小限の例を紹介します。

IndexedDBを使うには`indexedDB.open()`関数でデータベースを開きます。指定したバージョンが既存のバージョンより新しい（または初回）の場合、`onupgradeneeded`イベントが発火するので、ここでオブジェクトストア（RDBでいうテーブルに近いもの）を作成します。

```
// データベースを開く（バージョン1で初期化）
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myApp", 1);

    // 初回 or バージョン更新時にオブジェクトストアを作成
    request.onupgradeneeded = event => {
      const db = event.target.result;
      db.createObjectStore("notes", { keyPath: "id" });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
```

`IndexedDB`のAPIはイベントベースで`Promise`には自然に馴染まないため、ここでは`Promise`でラップしています。一度書いてしまえば、後の処理は`async/await`でスッキリ書けるようになります。

つづけて、idを指定してメモを読み書きする関数を作ってみましょう。いずれも`transaction()`関数でトランザクションを開始し、`objectStore()`関数からストアを取り出して操作します。

```
// メモを書き込む
const putNote = async note => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("notes", "readwrite");
    tx.objectStore("notes").put(note);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

// id指定でメモを読み込む
const getNote = async id => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("notes", "readonly");
    const request = tx.objectStore("notes").get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// 使用例
await putNote({
  id: 1,
  title: "買い物リスト",
  body: "牛乳、卵、パン"
});
const note = await getNote(1);
console.log(note); // { id: 1, title: "買い物リスト", body: "牛乳、卵、パン" }
```

`put()`関数は同じidのデータがあれば上書き、なければ追加します。`get()`関数は存在しないidを指定した場合`undefined`を返します。

最小限の機能だけでもこのくらいのコード量になり、検索やインデックスの活用、複数ストアにまたがる処理などを書こうとすると、さらに分量が増えていきます。現実のプロジェクトでは`IndexedDB`をラップしたライブラリを使うことも検討しましょう。代表的なライブラリとしては、ネイティブ機能の薄いラッパーである[idb](https://github.com/jakearchibald/idb)のほか、より高機能なDBである[Dexie.js](https://dexie.org/)や[RxDB](https://rxdb.info/)などの選択肢もあります。

### 選択肢3：OPFS：本格的・ハイパフォーマンスなファイルシステム

最後に紹介する`OPFS`（Origin Private File System）は、ウェブアプリに与えられたプライベートなファイルシステムです。`IndexedDB`が「ブラウザー内のデータベース」だとすれば、`OPFS`は「ブラウザー内のファイルストレージ」という位置付けです。

この記事では詳しく紹介しませんが、ブラウザーからファイルを読み書きする機能としては`File System Access API`も存在します。`File System Access API`はChromeが強く推していたAPIで、端末上の許可を得たファイルやディレクトリを自由に読み書きできるものです。強力な反面、セキュリティの懸念により十分に普及せず、パフォーマンスにも課題がありました。`OPFS`ではユーザーや他のアプリからは直接見えない場所に「アプリ専用のディレクトリ」を用意することでこの懸念を解消しています。

`OPFS`の最大の特徴はパフォーマンスです。動画の録画データをストリーミングしながら書き出したり、巨大な画像データやバイナリを扱ったりといった、`IndexedDB`では荷が重いユースケースに対応できます。Workerからも使用でき、本格的なファイル処理を行うアプリケーションのバックエンドとして機能します。

デモアプリでは、レイヤーの画像データを保存するために`OPFS`を使っています。`OPFS`ではストリームが利用できるため、Canvasから取得した`imageData`を`CompressionStream`に接続して圧縮しながらファイルに書き込んでいます。今回のデモ程度では実感できませんが、巨大なデータを扱う際にはストリーミング処理の有無でパフォーマンスに大きな差が出てきます。

#### OPFSの使い方

`OPFS`は`navigator.storage.getDirectory()`関数でルートディレクトリを取得して使います。`getDirectoryHandle()`関数や`getFileHandle()`関数でディレクトリやファイルのハンドルを取得し、`getFile()`関数や`createWritable()`関数でファイルの内容を読み書きするのが基本の流れです。

ここでは、デモアプリと同じく**Canvasのピクセルデータを圧縮しながらOPFSに保存する**最小例を示します。`createWritable()`で得られる`WritableStream`に、`CompressionStream`を挟んだストリームをそのまま流し込めるのがポイントです。

```
// ルートディレクトリを取得
const root = await navigator.storage.getDirectory();

// Canvasからピクセルデータ（RGBAバイト列）を取り出す
const ctx = canvas.getContext("2d");
const imageData = ctx.getImageData(
  0,
  0,
  canvas.width,
  canvas.height
);

// 書き込み先のWritableStreamを取得
const fileHandle = await root.getFileHandle("layer.bin", {
  create: true
});
const writable = await fileHandle.createWritable();

// バイト列 → 圧縮 → ファイル書き込み をストリームでつなぐ
await new Blob([imageData.data])
  .stream()
  .pipeThrough(new CompressionStream("deflate-raw"))
  .pipeTo(writable);
```

読み込みは逆向きに`DecompressionStream`を通してバイト列に戻し、`ImageData`としてCanvasに書き戻します。

```
// 読み込み（解凍して ImageData に復元）
const file = await (
  await root.getFileHandle("layer.bin")
).getFile();
const buffer = await new Response(
  file
    .stream()
    .pipeThrough(new DecompressionStream("deflate-raw"))
).arrayBuffer();
ctx.putImageData(
  new ImageData(
    new Uint8ClampedArray(buffer),
    canvas.width,
    canvas.height
  ),
  0,
  0
);
```

### 注意点

3つのストレージはいずれもブラウザーが提供する仕組みであるがゆえに、サーバーのDBやストレージとは異なる注意点があります。導入前に押さえておきましょう。

#### 注意1：「オリジン分離」によりドメインやポート番号が変わるとデータにアクセスできなくなる

オリジンとは「プロトコル + ホスト + ポート」の組み合わせのことです。以下の4つはすべて別オリジンとみなされます。

-   `https://example.com`
-   `https://sub.example.com` … サブドメインが違う
-   `http://example.com` … プロトコルが違う
-   `https://example.com:8080` … ポート番号が違う

3つのストレージAPIのデータは、ブラウザー内でオリジンごとに完全に分離されて保存されます。つまり、**ドメインやポート番号が変わると、同じブラウザーを使っていてもデータにアクセスできなくなります**。これはセキュリティ上は望ましい仕様ですが、実運用ではトラブルになりやすいポイントです。必要に応じてサーバーにもデータを保存したり、ユーザーがデータをエクスポート/インポートできる仕組みを用意したりと、データのバックアップや移行の方法も検討するのがよいでしょう。

また、ドメイン失効にも注意が必要です。サーバー側のDBと異なり、ブラウザー内のストレージはサービスを終了する場合にも強制的な削除ができません。万一失効したドメインを悪意の第三者に取得されると、ユーザーのブラウザーに残っているデータにアクセスされるリスクがあります。保存するデータの性質や利用するユーザー層を考慮した運用の設計が重要になります。

#### 注意2：共有端末では他の利用者にデータが見られる可能性がある

ブラウザー内のストレージは**そのブラウザーを使う人なら誰でも読み書きできます**。開発者ツールから簡単に中身を見ることもできるため、**パスワードやAPIトークンなどの機密情報を素のまま保存するのは厳禁**です。

会社の共有PCや家族共用の端末では別のユーザーがログインしたまま離席することもありますし、ブラウザーのプロファイルを切り替えずに複数人で同じプロファイルを使うこともあります。これ自体はデスクトップにファイルを保存する場合と何ら違いはありませんが、ユーザーがそれを理解できているかは別問題です。

機密情報の保存を避けるのはもちろんのこと、ユーザーに何が保存されているかをわかりやすく伝えることが大切です。

#### 注意3：保存したデータが消える可能性がある（とくにSafari）

ブラウザー内ストレージは「容量に余裕がなければ消される可能性がある」一時的な領域です。とくに**SafariではITP（Intelligent Tracking Prevention）の仕組みにより、7日間操作（ページを表示してクリック等のインタラクションを行うこと）がないサイトのストレージが自動的に消去される**ことがあります。

消えてほしくないデータに関しては、`navigator.storage.persist()`で永続化を要求することもできますが、実際に消えないことは保証されません。また、ストレージの空き容量が逼迫したユーザー向けに「キャッシュ削除」と称してブラウザーストレージの消去を推薦する解説記事なども多数存在するため、ユーザーが意図せずデータを消してしまう危険もあります。

こちらも、重要なデータはサーバーに保存したり、エクスポートの機能を用意したりして、消えても大丈夫な運用設計を組むことが必要です。

### ブラウザー対応状況

`WebStorage`は主要ブラウザーすべてで利用可能です。

`IndexedDB`も主要ブラウザーすべてで利用可能です。ただし、`getAllRecords()`関数など一部の機能はブラウザーによって対応状況が異なります。

参照：[参照：Can I use…](https://caniuse.com/?search=IndexedDB)

`OPFS`は、Chrome・Edge 108（2022年11月）、Firefox 111（2023年3月）、Safari 16.4（2023年3月）以上で利用可能です。

参照：[参照：Can I use…](https://caniuse.com/wf-origin-private-file-system)

いずれも一部のオプションやプライベートブラウズ時の挙動など、ブラウザー環境による差異があります。利用前にはサポートする環境での仕様を確認し、動作も確認しておきましょう。

### まとめ

この記事ではブラウザー標準で利用できる3つのストレージ機能を紹介しました。

-   設定や画面状態のような小さなデータには`LocalStorage`/`SessionStorage`
-   構造化された大量のデータには`IndexedDB`
-   バイナリやファイルなど大容量データには`OPFS`

3つを排他的に捉えるのではなく、デモで紹介したように**役割を分けて併用する**のがコツです。必要に応じてサーバーサイドのDBやストレージも組み合わせつつ、ブラウザー内ストレージの特性を活かした設計を考えてみてください。