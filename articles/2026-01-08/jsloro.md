---
title: "共同編集アプリが作れる新しいJSライブラリ「Loro」を紹介"
source: "https://ics.media/entry/250821/"
publishedDate: "2025-08-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

2025年8月21日 公開 / [株式会社ICS 松本 ゆき](https://ics.media/entry/staff/matsumoto/)

Google DocsやFigmaのような複数人が同時編集できるアプリケーションを作るためには「ロックフリー」な共同編集の技術が必要です。誰かが文字を入力するたびにサーバーの更新完了を待つわけにはいきませんが、だからといって各自が好き勝手にデータを書き換えてしまうとテキストが混ざったり他のユーザーのアイテムを消してしまったり、さまざまな問題が発生するためです。

この問題を解決するための代表的なアルゴリズムが`CRDT`で、CRDTをベースに共同編集機能を提供するメジャーなJSライブラリが[Yjs](https://yjs.dev/)です。CRDTとYjsについては以前の記事[『共同編集を支える技術とライブラリの活用』](https://ics.media/entry/220526/)でも紹介しており、ICSではYjsを利用した開発も行っています。

このYjsの有力なライバルとして、2024年に正式リリースされたのが[Loro](https://loro.dev/)（ロロ：スペイン語でオウム）です。後発だけに、これまで実装が難しかった便利な機能が搭載されています。Yjsなどの共同編集ライブラリを使ったことがある方はもちろん、これからチャレンジしてみたい方や共同編集の面白さや難しさに触れてみたい方もぜひ読んでみてください。

### デモ：Loroで実装した共同編集アプリ

まずは簡単な共同編集のデモを動かしてみましょう。

![デモ：Loroで実装した共同編集アプリ](https://ics.media/entry/250821/images/250821_demo.gif)

-   [デモ：Loroで実装した共同編集アプリ](https://ics-creative.github.io/250821_loro_crdt/)
-   [ソースコード](https://github.com/ics-creative/250821_loro_crdt?tab=readme-ov-file)

デモはよくあるTODOアプリです。追加・削除・編集に加えて、ドラッグでの並べ替えを実装しました。複数ウィンドウ（タブ）で開くと操作がリアルタイムに同期します。Web標準の[`BroadcastChannel API`](https://developer.mozilla.org/ja/docs/Web/API/Broadcast_Channel_API)を使えば同じブラウザのタブ間で、[`WebSocket`](https://developer.mozilla.org/ja/docs/Web/API/WebSocket)を介せばインターネット全体でリアルタイム同期ができます（このデモでは`BroadcastChannel API`を使用しています）。

### 共同編集のつらさを軽減するLoroの機能

Yjsは強力で実績もあるライブラリですが、実際のアプリケーション開発では一筋縄ではいかない課題が多々発生します。設計を誤るとタイミングや操作順によって**データが欠損・重複したり不整合が発生する**といったトラブルが容易に生じます。後発のLoroでは典型的なユースケースに対して設計や実装を楽にしてくれる機能を提供しています。

#### Counter

共同編集では単純な数字のカウントひとつとっても簡単ではありません。単純に「後勝ち」にしてしまうと、複数の端末が同時に値を変更した際にどちらかの変更が失われてしまいます。

YjsにはCRDTのアルゴリズムに基づくカウンター機能がないため、カウンター用の共有型を自作するかリスト（`YArray`）やマップ（`YMap`）を使って代用することになります。やや複雑になりますが、実際のアプリケーションでは下図のようにマップを使って作るのが扱いやすいです。

![マップによるカウンター実装のイメージ](https://ics.media/entry/250821/images/250821_fig01_counter.jpg)

一方Loroではシンプルな`Counter`型が標準実装されており、簡単に利用できます。

```
const doc = new LoroDoc();
const counter = doc.getCounter("counter");
counter.increment(3); // 3を加算
counter.decrement(1); // 1を減算
```

ただし、このカウンターでできることは文字通りひとつの数値を記録することだけです。単純なアクセス数カウンター程度であれば十分ですが、「自分がカウント済みか？」を管理したり、押せる回数を制限したり…といった要件がある場合はYjsと同様にマップを使って仕組みを作り込む必要があります。

とはいえ、シンプルなカウンターが簡単に実現できるのは便利ですね。

#### MovableList

`MovableList`はYjsにはないLoroの便利な機能で、「要素の移動」ができるリストです。要素の移動とは、リストの1番目と2番目を入れ替えるような操作です。デモのTODOリストではTODO項目の並べ替えを行っていましたね。

実は、並べ替えは共同編集の落とし穴です。普通のリスト構造（Yjsの`YArray`やLoroの`List`）では「順序を入れ替える」機能が存在しないため、代わりに要素を「削除」してから「挿入」することになります（`Delete & Insert`と呼ばれます）。`[A, B, C]`の`A`と`B`を入れ替えたい場合、まず`B`をリストから削除して、直後に`A`の手前に挿入するイメージですね。

勘のよい方であればお気づきかと思いますが、このやり方には欠陥があります。複数の端末が同時に同じ要素を掴んで移動すると要素が重複してしまうのです。

![Delete & Insertで要素が重複する例](https://ics.media/entry/250821/images/250821_fig02_list_delete_insert.jpg)

この問題を回避するため、Yjsでは`Y.RelativePosition`や[Fractional-Indexing](https://www.npmjs.com/package/fractional-indexing)などを使って並び替え可能なリストの仕組みを自作する必要があります。弊社でもリストに`Fractional-Indexing`を使った経験がありますが、リストの実装のためにマップを使わなくてはいけなかったり、同時操作で`index`値が重複するケースのケアが必要だったりと、煩雑さは避けられない印象です。

Loroの`MovableList`ではこうした面倒なしにリストの並び替えが実現できます。

```
const doc = new LoroDoc();
const list = doc.getMovableList("list");
list.push("A");
list.push("B");
list.push("C");
list.move(0, 1); // 0番目=Aを1番目の位置に移動 = [B, A, C]
```

複数の端末が同時に同じ要素を移動した場合、端末のIDに基づいて一方だけが採用されます。要素が重複したり消えたりすることはありません。

#### Tree

デザインツールのレイヤーやファイル管理ツールのフォルダーのようなツリー構造の共同編集はさらに難しくなります。ツリー自体はマップ構造を入れ子にすることで実現できますが、要素を移動しようとするとリストと同様`Delete & Insert`が必要になり、重複や循環等の問題が生じます。

これを避けるためにマップは1階層だけにして、各要素に親階層のID（下図では`parent`）を持たせる方法がよく用いられます。要素を別な階層に移動する際は`parent`を書き換えるだけです。表示する時はすべての要素を1回走査すればツリー構造を組み立てられます。

![マップを使ったツリー構造の実装のイメージ](https://ics.media/entry/250821/images/250821_fig03_tree_by_map.jpg)

ただしこの方法も万能ではありません。複数の端末が別の要素を同時に移動すると、階層構造がループする可能性があります。

![同時編集でループが発生する例](https://ics.media/entry/250821/images/250821_fig04_tree_loop.jpg)

ループした要素はツリーから切り離された状態になってしまうため、画面から消えてしまいます。これを回避するにはループ発生時に一方の操作を無効にする等のリカバリー処理が必要です。

Loroの`Tree`はこうした面倒ごとをすべて引き受けて簡単に操作できるツリー型を提供します。

```
const doc = new LoroDoc();
const tree = doc.getTree("tree");
// ルートにノードA,Bを作成
const nodeA = tree.createNode();
nodeA.data.set("name", "A");
const nodeB = tree.createNode();
nodeB.data.set("name", "B");
// Bの子にCを作成
const nodeC = nodeB.createNode();
nodeC.data.set("name", "C");
// CをAの下に移動
nodeC.move(nodeA);
```

また、`MovableList`と同様に、`Tree`でも階層内の順序を制御できます。

```
const doc = new LoroDoc();
const tree = doc.getTree("tree");
// ルートにノードを作成
const nodeA = tree.createNode();
// Aの子にX,Y,Zを作成
const nodeX = nodeA.createNode();
const nodeY = nodeA.createNode();
const nodeZ = nodeA.createNode();
// ルートにノードBを作成
const nodeB = tree.createNode();
nodeB.move(nodeA, 1); // BをAの1番目に移動
nodeB.move(nodeA, 0); // BをAの0番目に移動（同階層内で移動）
```

### LoroはYjsの上位互換？　現時点での使い分け

Loroは後発ゆえの強みがありますが、必ずしもすべての面でYjsに勝るわけではないので注意が必要です。共同編集のアプリケーションを開発する際は以下のような観点でライブラリの選定をするとよいでしょう。

**何を共同編集したいのか？**

Google Docsのようなテキストの共同編集なのか、FigmaやCanvaのようなデザインの共同編集なのか等、何を共同で編集したいのかによって利用する機能は変わってきます。この記事で紹介したように、Loroの方が便利なデータ型を多く提供していますが、アプリ固有の要求を満たせない場合は結局自前で作り込む必要が出てきます。

また、どこまで整合性や正確性を保証する必要があるのかも大切な観点です。カウンターの値も「大体の雰囲気」でよいならただの後勝ちでもよいかもしれません。逆に絶対に正確に同期が必要な場合は、そもそも`Yjs`や`Loro`だけでなく、トランザクションを扱えるデータベースを組み合わせるべきかもしれません。

**重要なパフォーマンス要件は何か？**

Loroはセールスポイントのひとつに「ハイパフォーマンス」を掲げていますが、性能要件の評価軸は複雑です。

LoroはRustで実装されており、実行速度自体は有利である可能性があります。他方、Yjsは不要な履歴を自動で削除するGC（ガベージコレクション）機能があり、メモリの使用量や初期化時のロードサイズに有利である可能性があります。ベンチマークは観点や利用シーンで大きく変わるため、鵜呑みにしないようにしましょう。

**必要な周辺ツールは揃っているか？**

Loroは後発であるため、エコシステムの充実度はYjsに軍配が上がります。[Bindings](https://github.com/yjs/yjs?tab=readme-ov-file#bindings)に列挙されているように、数多くのライブラリ・フレームワークがYjsをサポートしています。また、Yjsでは[y-websocket](https://github.com/yjs/y-websocket)や[y-webrtc](https://github.com/yjs/y-webrtc)が通信部分までサポートしてくれるのも嬉しい点です。

ただし、今後Loroの利用が増えていけば差は縮まっていくかもしれません。

### まとめ

この記事では主にYjsと比較しながらLoroの便利な機能を紹介しました。

単純に優劣を評価することは難しいですが、新たな選択肢が登場するのはよいことであると感じます。共同編集はしっかり作り込むととても難しいものですが、試すだけなら簡単ですし、リアルタイムに同期した時の感動はひとしおです。この機会にぜひチャレンジしてみてください。