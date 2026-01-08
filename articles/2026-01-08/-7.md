---
title: "共同編集を支える技術とライブラリの活用"
source: "https://ics.media/entry/220526/"
publishedDate: "2022-05-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

[『Google Docs』](https://www.google.com/intl/ja_jp/docs/about/)や[『Figma』](https://www.figma.com/)といったリアルタイムな共同編集ツールの恩恵を受けている人は数多くいるでしょう。[『Visual Studio Live Share』](https://visualstudio.microsoft.com/ja/services/live-share/)のようなエンジニアに嬉しいツールも生まれ、今日ではオンライン上でも円滑なコミュニケーションが可能になっています。

これらのツールの基礎にあるのが「共同編集」のテクノロジーです。本記事ではこの技術に焦点を当て、その仕組みと主にフロントエンドでの実用例について紹介します。

記事の前半では、リアルタイムな共同編集に用いられる技術やアルゴリズムについて、発展の歴史とあわせて紹介します。解説用のコードにはJavaScriptおよびTypeScriptを使用しますが、フロントエンドエンジニアに限らず共同編集の仕組みについて気になる読者が知識を深めるきっかけとなるはずです。

さらに後半ではフロントエンドの開発者目線で、前半で紹介した技術を使用したJavaScriptライブラリ[『Yjs』](https://docs.yjs.dev/)について共同編集エディターのデモを作成しながら紹介します。Yjsを活用すると、次のようなリアルタイムに入力内容を共有できるエディターなどが作成できます。

![動作デモ](https://ics.media/entry/220526/images/220526_demo.gif)

フロントエンド開発においては簡単にライブラリを導入し動かせることがメリットになりますが、学術的な背景を知ることでより深く広い視点でライブラリの選定、使用が可能になります。

共同編集技術に興味がある人、ブラウザで動く共同編集アプリケーションに興味がある人はぜひ最後までお付き合いください。

### 共同編集のアルゴリズム

まずは、リアルタイム共同編集の実装の難しい点についてお話しします。大きな原因のひとつには「一つのドキュメントを複数人がリアルタイムに共同編集する」という点が挙げられるでしょう。

サーバー上の「hello」という文字列が保存されたドキュメントに対して「Aさんが2文字目にAを入れる（hAello）」、「Bさんが4文字目にBを入れる（helBlo）」という処理を同時に行う場合を考えてみます。

ネットワークには必ず遅延が生じるので、Aさんの入力内容がBさんの画面に入力されるまでには時間差があります。そのため、サーバーにあるテキストはBさんの意図通りの変更が適用されない場合があります。 実行タイミングによって次のように結果に違いが生まれます。

Aさんの方が早い場合

1.  Aさんが2文字目にAを入れる → hAello
2.  Bさんが4文字目にBを入れる → hAe**Bl**lo

Bさんの方が早い場合

1.  Bさんが4文字目にBを入れる → helBlo
2.  Aさんが2文字目にAを入れる → hAe**lB**lo

前者はBさんの意図通りの位置に「B」が挿入されませんでした。

リアルタイムな共同編集においては、Gitのようにコンフリクトを手動で解決するのではなく自動的に解消する仕組みが必要です。

#### OTというアルゴリズム

そこで生み出されたのがOT（Operational Transformation、操作変換）というアルゴリズムです。OTは複数の処理の結果生まれる矛盾を吸収し解決する機能をもちます。

上記を具体例に挙げると、OTは最初に挿入された位置に応じて、次に来た処理内容を変換する仕事をします。

Aさんの方が早い場合

1.  2文字目にAを入れる → hAello
2.  4文字目にBを入れる → **5文字目にBを入れる処理に変換（OT）** → hAelBlo

Bさんの方が早い場合

1.  4文字目にBを入れる → helBlo
2.  2文字目にAを入れる → hAelBlo

![OTの説明](https://ics.media/entry/220526/images/220526_ot-description.png)

TypeScriptのコードとして記載すると、次のような形となるでしょう。

```
/**
 * 操作をオブジェクト形式で表す型
 */
interface Operation {
  /** 挿入位置 */
  p: number;
  /** 入力内容 */
  c?: string;
};

/**
 * o2に応じてo1を変換するOTの実装
 * @param o1
 * @param o2
 */
const otInsert = (o1: Operation, o2: Operation): Operation => {
  if (o1.p <= o2.p) {
    // o1より後方にo2が適用される場合は変換は不要
    return o1;
  } else {
    // o1より前方にo2が適用される場合は挿入位置を一つ後ろに変更
    return { ...o1, p: o1.p + 1 };
  }
};

const oA = { p: 2, c: "A" };
const oB = { p: 4, c: "B" };

// OT適用後のoA, oBを取得
const oA_after = otInsert(oA, oB);
const oB_after = otInsert(oB, oA);

// 以下、ドキュメントに適用
```

これでAさんとBさんの編集内容が正しく処理されました。削除の場合OTは次の処理をします。

Aさんの方が早い場合

1.  Aさんが2文字目を削除する → hllo
2.  Bさんが4文字目を削除する → **5文字目を削除する処理に変換（OT）** → hlo

Bさんの方が早い場合

1.  Bさんが4文字目を削除する → helo
2.  Aさんが2文字目を削除する → hlo

[ot.js](https://github.com/Operational-Transformation/ot.js/)というライブラリのデモ用に作られた[Visualization of OT with a central server](https://operational-transformation.github.io/)というデモサイトではOTの処理の流れを視覚的に理解できます。

![ot-visualization](https://ics.media/entry/220526/images/220526_ot_visualization.png)

#### OTの問題点

このように便利なOTですが課題も多くあります。OTをもちいたGoogle Wave（2009~2012）やShare.jsの作者でもあるJoseph Gentleさんは「Share.jsを作るのに2年かかったが、もう一度作り直すとしても同じくらいの時間がかかるだろう」との発言を残しています。

開発上では仕様の複雑さに比例してOTの実装量が増加します。前項を例に挙げ挿入と削除の処理を考えたとき、一対の処理で順番も考慮すると2×2=4通りの処理を考えなければなりません。

```
/**
 * [挿入, 挿入]の場合のOT
 * @param o1 挿入処理
 * @param o2 挿入処理
 */
const otII = (o1: Operation, o2: Operation) => {
    if (o1.p <= o2.p) {
      // o1より後方にo2（挿入）が適用される場合は変換は不要
      return o1;
    } else {
      // o1より前方にo2（挿入）が適用される場合は挿入位置を一つ後ろに変更
      return { ...o1, p: o1.p + 1 };
    }
  };

/**
 * [挿入, 削除]の場合
 * @param o1 挿入処理
 * @param o2 削除処理
 */
const otID = (o1: Operation, o2: Operation) => {
  if (o1.p <= o2.p) {
    // o1より後方にo2（削除）が適用される場合は変換は不要
    return o1;
  } else {
    // o1より前方にo2（削除）が適用される場合は挿入位置を一つ前に変更
    return { ...o1, p: o1.p - 1 };
  }
};

/**
 * [削除, 挿入]の場合
 * @param o1 削除処理
 * @param o2 挿入処理
 */
const otDI = (o1: Operation, o2: Operation) => {
  if (o1.p <= o2.p) {
    // o1より後方にo2（挿入）が適用される場合は変換は不要
    return o1;
  } else {
    // o1より前方にo2（挿入）が適用される場合は削除位置を一つ後ろに変更
    return { ...o1, p: o1.p + 1 };
  }
};

/**
 * [削除, 削除]の場合
 * @param o1 削除処理
 * @param o2 削除処理
 */
const otDD = (o1: Operation, o2: Operation) => {
  if (o1.p < o2.p) {
    // o1より後方にo2（削除）が適用される場合は変換は不要
    return o1;
  } else if (o1.p > o2.p) {
    // o1より前方にo2（削除）が適用される場合は削除位置を一つ後ろに変更
    return { ...o1, p: o1.p - 1 };
  } else {
    // o1とo2は同じものを削除するので、重複しないような処理を返す
    // Idはo1とo2が重複した場合どちらか一方のみ行うという処理（具体的な実装は割愛）
    return Id; // Id – 恒等写像;
  }
};
```

操作の数だけ場合分けを行い組み合わせを考えこのような実際を行うことを考えると、かなりハードな実装になることが予想されます。

また、[『I was wrong. CRDTs are the future』](https://josephg.com/blog/crdts-are-the-future/)という記事の中でOTの中央集権的なデータの扱いの問題点についても言及しています。

便利なOTではありますが開発者にとってはとても苦しいアルゴリズムでした。

#### CRDTの登場

OTの後発として、CRDT（Conflict-free Replicated Data Type）という手法が開発されてきました。OTと大きく異なる点は**サーバーで中央集権的なデータ管理をしない**という点です。入力結果を保持するのではなく、**操作を保存**します。また、その操作は**可換であること**（順番が交換可能であること）が前提です。

CRDTの一例を紹介します。`'taro'`と`'hanako'`、2人のユーザーの操作をオブジェクトとして記録する例です。それぞれのパラメーターは次を意味します。

-   item: 入力内容
-   isDeleted: 削除されたフラグ
-   id: 入力者と操作ID
-   seq: 入力番号（後述）
-   parent: 直前の文字列のid

```
const state = [
  { item: 'a', isDeleted: false, id: ['taro', 0], seq: 0, parent: null },
  { item: 'X', isDeleted: false, id: ['taro', 1], seq: 3, parent: ['taro', 0] },
  { item: 'b', isDeleted: true,  id: ['hanako', 0], seq: 1, parent: ['taro', 0] },
  { item: 'c', isDeleted: false, id: ['taro', 2], seq: 2, parent: ['taro',1] },
  // ...,
];
```

この例において最も重要なのは、`id`と`parent`です。これによりドキュメントのどの箇所に操作を適用するか決定され、生成されるドキュメントが一意に決定します。配列から操作オブジェクト自体を削除すると`parent`が同定できなくなる恐れがあるため、削除の操作は`isDeleted`フラグで管理し矛盾が起きないようにしています。

`seq`は入力順を管理します。新たな入力の際、その時点で（クライアント視点で）最も最後に入力された内容の`seq`に1足した値を設定します。上記の例で新たに入力される場合、`seq`は`4`になります。

複数のクライアントが同時に入力した際は、重複した`seq`が設定される場合もあります。その場合は、例えば入力ユーザーのアルファベットが小さい方を先に適用するなどのルールを設定され矛盾が生じないようにします。

以上を踏まえると、上記の操作配列をドキュメントに適用した場合再現される文字列は「aXc」となります。

CRDTは「操作を保存する」「操作が可換」という利点をもつため、OTにない次のメリットがあります。

-   オフライン状態でもデータの読み書きが可能
-   オンライン状態に復帰したときも整合性が保たれる

OTに比べ実装がしやすく運用上のメリットも大きいCRDTですが、長らく実用化には至りませんでした。大きな理由としてはパフォーマンス面の問題です。すべての操作を頭から順番に行いドキュメントを再現するCRDTはパフォーマンス面でOTに圧倒的に劣る手法しかなく、実際のプロダクトに組み込むことは困難でした。

しかし、アルゴリズムの発展によって高速なCRDTを用いた共同編集ライブラリがいくつか開発されています。そのひとつが[『Yjs』](https://github.com/yjs/yjs)です。

### 共同編集ライブラリYjs

ここからは、Yjsの特徴とその使い方について紹介します。

#### Yjsとは？

YjsはCRDTを基盤に作られた、共同編集機能を提供するライブラリです。[『Room.sh』](https://room.sh/)や[『PRSM』](https://prsm.uk/)など実際のプロダクトでも採用されています。

驚くべきは通信、データベースといった周辺技術の連携をスムーズにするエコシステムです。

-   [『ProseMirror』](https://prosemirror.net/)、[『Quill』](https://quilljs.com/)などのリッチテキストエディタライブラリとの連携
-   WebRTCやWebSocketといった通信システムとのスムーズなつなぎ込み

拡張ライブラリの概要については公式レポジトリの[Overview](https://github.com/yjs/yjs#overview)を参照ください。今回はQuillとYjsをつなげる[『y-quill』](https://github.com/yjs/y-quill)を用いて共同編集エディターのデモを作成します。

### デモの作成

ここからは、YjsとQuillを用いた次のような共同編集エディターを作成します。公式ドキュメントの[A Collaborative Editor](https://docs.yjs.dev/getting-started/a-collaborative-editor)に従い作成します。

※環境構築については割愛します。適宜ソースコードを参照ください。

![画像](https://ics.media/entry/220526/images/220526_demo.gif)

-   [デモのソースコードを見る](https://github.com/ics-creative/220526_co_editing)

#### エディターの作成

まずはエディターを作成します。次のコマンドを実行しQuill関連のパッケージを導入します。

```
npm i quill quill-cursors
```

HTML, JavaScriptファイルにそれぞれ次の内容を記載します。

▼HTML

```
<div id="editor"></div>
```

▼JavaScript

```
import Quill from "quill";
import QuillCursors from "quill-cursors";

Quill.register("modules/cursors", QuillCursors);

// 親要素
const editor = document.querySelector("#editor");

// エディターを作成
new Quill(editor, {
  modules: {
    cursors: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ],
    history: {
      userOnly: true,
    },
  },
  placeholder: "Start collaborating...",
  theme: "snow",
});

```

ローカルで動くエディターが完成しました。

#### Yjsの導入

次に、Yjsを導入し共同編集の基盤を作ります。

```
npm i yjs y-quill
```

JavaScriptファイルに次の内容を追記します。

▼JavaScript

```
import * as Y from "yjs";
import { QuillBinding } from "y-quill";

/** 省略 */

// Shared Typeを保持するYjsドキュメントを作成
const ydoc = new Y.Doc();
// shared text typeを作成（名称は任意）
const ytext = ydoc.getText("quill");

// Quillエディターとytextをバインド
new QuillBinding(ytext, quill);
```

Yjsには Shared Typeと呼ばれる概念があります。Shared Typeは入力内容に同期したテキスト、配列、Mapなどのデータです。上記例では`'quill'`という名前で定義されたテキスト型Shared Typeに入力内容が保存されます。Shared Typeの詳細については[公式ドキュメント - Shared Types](https://docs.yjs.dev/getting-started/working-with-shared-types)を参照ください。

#### WebSocketとの連携

YjsにはWebRTC, WebSocketといった通信プロトコルとそれぞれ連携する拡張ライブラリが用意されています。今回はWebSocketを採用します。まずは次のコマンドでWebSocketと連携するための`y-websocket`ライブラリをインストールします。

```
npm i y-websocket
```

JavaScriptファイルに次の内容を追記します。

▼JavaScript

```
/** 省略 */

const ydoc = new Y.Doc();

/** 省略 */

// WebSocketと連携
new WebsocketProvider('ws://localhost:1234', 'my-roomname', ydoc);
```

`ws://localhost:1234`に立てたWebSocketサーバーの`'my-roomname'`というルームに`ydoc`を連携し入力内容を同期させます。

接続時にコンソールで接続を確認する場合は次のようにイベントリスナーを追加します。

▼Providerにイベントリスナーを追加する例

```
const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc);

wsProvider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
});
```

#### サーバーの起動（補足）

具体的なWebSocketサーバーの実装については各言語ごとに異なるため本記事では解説しませんが、簡易的なサーバーの起動について紹介します。

簡易的なWebSocketサーバーは`npx`コマンドで起動できます。ターミナルで次のコマンドを実行ください。`HOST`や`PORT`は「WebSocketとの連携」で定義した引数に合わせ`localhost:1234`としますが目的に合わせ適宜変更ください。

```
HOST=localhost PORT=1234 npx y-websocket
```

※[公式ドキュメント](https://docs.yjs.dev/ecosystem/connection-provider/y-websocket#websocket-server)のコマンドは動かないようなので[y-websocketのGitHubレポジトリ](https://github.com/yjs/y-websocket#quick-start)の記載内容を参照ください。

これでWebSocketサーバーが起動しました。複数のウィンドウに入力内容が共有され、リロード後も入力内容が保持されます。

### まとめ

今回は共同編集アルゴリズムやその歴史について紹介しました。また後半ではYjsという共同編集ライブラリを紹介し、デモを作成しました。Yjsはとても便利かつ多機能なライブラリなので、ぜひ深堀りしてみてください。

フロントエンド開発では多くの開発者の尽力により、世界中の便利なツールを導入できます。場合によっては仕組みを知らなくても使えてしまいますが、ライブラリの基盤技術や内部的な仕組みを知ることでよりよいライブラリの選定に役立ちます。知識を深めればよりライブラリを活用できたり、ライブラリの自作などにも発展できるでしょう。

ライブラリの力を最大限活かせるよう意識していきましょう！

### 参考記事

-   [Are CRDTs suitable for shared editing?](https://blog.kevinjahns.de/are-crdts-suitable-for-shared-editing/)
-   [5000x faster CRDTs: An Adventure in Optimization](https://josephg.com/blog/crdts-go-brrr/)
-   [I was wrong. CRDTs are the future](https://josephg.com/blog/crdts-are-the-future/)
-   [Operational Transformations as an algorithm for automatic conflict resolution](https://medium.com/coinmonks/operational-transformations-as-an-algorithm-for-automatic-conflict-resolution-3bf8920ea447)
-   [リアルタイム共同編集エディタを作れるyjsを触ってみた](https://qiita.com/ryan5500/items/a1debe79816ee15adf9b)
-   [CRDT (Conflict-free Replicated Data Type)を15分で説明してみる](https://qiita.com/everpeace/items/bb73ec64d3e682279d26)