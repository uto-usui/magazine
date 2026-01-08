---
title: "JavaScriptのモダンな書き方 - ES2017〜ES2018のawait・async, includes(), padStart()等を解説"
source: "https://ics.media/entry/17262/"
publishedDate: "2018-02-22"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ECMAScript 2015がリリースされて以降、JavaScriptの機能は大きく強化されました。`const`/`let`、アロー関数、クラス構文、`Promise`などが有名なところですが、ES2016、ES2017、ES2018、･･･ES2022、そしてさらにその先へJavaScriptの仕様は日々進化しています。JavaScript・TypeScriptの開発では、**これまで当たり前だと思っていた手法を新しい新機能で置き換えることが何度もありました**。

本記事では、JavaScriptのモダンな書き方について説明します。おもに2017年から2018年頃に搭載されたES2017・ES2018の機能について焦点を当てて解説します。

### 非同期の`Promise`を使うなら`async`/`await`は必須

ES2015で非同期処理のために導入された[`Promise`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)ですが、`Promise`の処理は見通しが悪くなりがちでした。

次に示すのは、外部リソース取得のための[Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)を用いてJSONデータの中身を出力する例です。`then()`メソッドを使って連結しながら記述していますが、コードが複雑なように見えます。

```
fetch("./myjson.json")
  .then(
    response =>
      new Promise((resolve, reject) => {
        return response
          .json()
          .then(
            json => resolve(json),
            error => reject(error)
          );
      })
  )
  .then(
    json => console.log(json),
    error => console.log(`error : ${error}`)
  );
```

ES2017で導入された[`await`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function)/[`async`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await)を使えば、次のようにネストを深くせずに`Promise`による処理を記述可能です。

▼async関数宣言

```
async function main() {
  try {
    const result = await fetch("./myjson.json");
    const json = await result.json();
    console.log(json);
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

main();
```

アロー関数式を使う場合は以下のように記述します。function関数宣言とアロー関数式との記述が異なるだけで処理内容は同じです。

▼アロー関数式によるasyncの処理

```
const main = async () {
  try {
    const result = await fetch("./myjson.json");
    const json = await result.json();
    cojnsole.log(json);
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

main();
```

ポイント

-   `await`演算子： `Promise`による処理の結果が返るのを待つ
-   `async`: 関数内で`await`を使うための宣言

`await`は`Promise`等（`Thenable`オブジェクトも含む）の非同期処理を待機することができる演算子です。`await`を使うには関数宣言時に`async`で非同期宣言を行う必要があります。

筆者の開発では、`then()`メソッドを直接記述することはなく、ほぼ`await`と`async`で処理を作っていきます。

### 配列要素の存在チェックにはincludes()メソッド

配列内に特定の要素があるかどうかを調べる場合、従来は次のように`indexOf()`メソッドを使っていました。

```
// 対象の配列
var targetArray = ["鈴木", "田中", "高橋"];

// 田中が存在するかどうか
if (targetArray.indexOf("田中") >= 0) {
  console.log("田中が含まれています");
} else {
  console.log("田中は存在しません");
}
```

ES2017で追加された[配列のための`includes()`メソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)を使うと、インデックスではなく真偽値を使って配列内の要素の存在チェックが可能になります。

```
// 対象の配列
const targetArray = ["鈴木", "田中", "高橋"];

// 田中が存在するかどうか
if (targetArray.includes("田中")) {
  console.log("田中が含まれています");
} else {
  console.log("田中は存在しません");
}
```

ちなみにES2015では[文字列の存在チェックのための`includes()`メソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/includes)が追加されており、こちらも`indexOf()`と代わって使用しています。

```
// 対象の文字列
const targetUserAgent = navigator.userAgent;

// ES 5以下
// if (targetUserAgent.indexOf("iOS") >= 0) {
//   console.log("iOSブラウザです");
// }

// ES2015以上
if (targetUserAgent.includes("iOS")) {
  console.log("iOSブラウザです");
}
```

### ゼロパディングにはpadStart()メソッド

ゼロ埋めの処理は、時刻の表記によく使います。たとえば、4時5分を示す場合は`04:05`といった文字列に加工します。

一桁の数字の頭に`0`をつけて文字列にしたい場合、従来は次のようなコードを書いていました。

```
// 現在時刻の秒数を取得
var second = new Date().getSeconds();

// 0パディングされた文字列
var paddedSecond = String(second);

// 10秒未満なら、冒頭に0を付与する
if (second < 10) {
  paddedSecond = "0" + paddedSecond;
}

// 現時刻の秒数 01, 09, 12, ...
console.log(paddedSecond);
```

ES2017では、文字詰めのための[`padStart()`メソッド](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)が追加されました。次のように指定することで、「文字列」が指定の「長さ」になるように、「詰める文字」を文字列の前に配置します。

```
文字列.padStart(長さ, 詰める文字);
```

先ほどのコードは次のように短く書けます。

```
// 現在時刻の秒数を取得
const second = new Date().getSeconds();

// 2桁の文字列になるよう文字詰め
const paddedSecond = String(second).padStart(2, "0");

// 現時刻の秒数 01, 09, 12, ...
console.log(paddedSecond);
```

### オブジェクトのコピーにスプレッド演算子（`...`）

ES2015では、オブジェクトのコピーのための`Object.assign()`が導入され、オブジェクトのコピー（シャローコピー）が楽になりました。

```
const myObject = {
  result: true,
  members: [
    { id: 1, name: "鈴木" },
    { id: 2, name: "田中" },
    { id: 3, name: "高橋" }
  ]
};

// オブジェクトのコピー
const copiedObject = Object.assign({}, myObject);

console.log(copiedObject);
// オブジェクトがコピーされる
// {
//    result: true,
//    members: [
//      { id: 1, name: "鈴木" },
//      { id: 2, name: "田中" },
//      { id: 3, name: "高橋" }
//    ]
//  }
```

ES2018で導入されたオブジェクト用のスプレッド演算子を用いれば、次のような短いコードでオブジェクトのコピーが可能です。スプレッド演算子は配列で利用できるようになったのはES2015ですが、オブジェクトに対して利用できるようになったのはES2018です。

```
const myObject = {
  result: true,
  members: [
    { id: 1, name: "鈴木" },
    { id: 2, name: "田中" },
    { id: 3, name: "高橋" }
  ]
};

// オブジェクトのコピー
const copiedObject = { ...myObject };

console.log(copiedObject);
// オブジェクトがコピーされる
```

スプレッド演算子`...`は必須の記述方法のため、必ず覚えておきましょう。記事『[配列を征する者はJSを制す。JavaScriptのスマートな配列操作テクニック](https://ics.media/entry/200825/)』で紹介していますが、配列の操作にもスプレッド演算子`...`は必ず利用します。

### 文字数カウントにスプレッド演算子（`...`）

文字数をJavaScriptでカウントする場合は、`String`の`length`プロパティを用いてきました。しかし、このプロパティではサロゲートペア文字列（「𦥑（臼ではありません）」や、「𩸽（ホッケ）」などの漢字、「😀」「😺」といった絵文字）の文字数が2以上になります。

```
"𦥑".length; // 2
"今日は☀️です".length; // 7
```

ES2015で導入された[「`...`」で表現されるスプレッド演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_operator)。文字列と配列を組み合わせると、文字数のカウントに使えます。

```
[..."𦥑"].length; // 1
[..."今日は☀️です"].length; // 6
```

なお、JavaScriptにおける文字数の数え方についてより詳しくは記事「[JavaScript における文字コードと「文字数」の数え方 | blog.jxck.io](https://blog.jxck.io/entries/2017-03-02/unicode-in-javascript.html)」を参照ください。

### べき乗の計算にはべき乗演算子`**`

2の5乗などのべき乗計算には、従来は`Math.pow()`を使っていました。

```
Math.pow(2, 5); // 32
Math.sqrt(Math.pow(3, 2) + Math.pow(4, 2));
// (3の2乗 + 4の2乗)のルート。5
```

ES2016では[べき乗演算子`**`（Exponentiation Operator）](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#%E3%81%B9%E3%81%8D%E4%B9%97_\(**\))を使って同じようにべき乗計算が可能になりました。タイプ量が少なくなるメリットがあります。

```
2 ** 5; // 32
(3 ** 2 + 4 ** 2) ** 0.5;
// (3の2乗 + 4の2乗)のルート。5
```

### 整数部分の取得にはMath.trunc()メソッド

小数を整数に丸める場合、`Math.floor()`を使うことが多かったのですが、負の値を丸める場合の挙動が分かりづらく、複数人開発での混乱の元になりがちでした。

```
Math.floor(6.5); // 6
Math.floor(-6.5); // -7 (-6ではない)
```

ES2015で導入された整数部分だけを取得する[`Math.trunc()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc)メソッドを使えば、正の値、負の値が関係なく整数部分を取得でき、直感的な挙動となります。

```
Math.trunc(6.5); // 6
Math.trunc(-6.5); // -6
```

### 未来に向けてのJavaScript

ES2015以降、JavaScriptのは毎年メジャーバージョンアップするようになり、新しい機能が次々に追加されています。**そのアップデートに追従することで、プログラミングが効率化する、堅牢なプロジェクト作成ができるといったメリットに繋がります**。

ICS MEDIAではECMAScriptの動向を記事にしています。モダンなJavaScriptの書き方をキャッチアップするために、次の記事もあわせて確認ください。

-   [JavaScriptの次の仕様ES2022の新機能まとめ](https://ics.media/entry/220610/)
-   [JavaScriptのモダンな書き方 - ES2022](https://ics.media/entry/200128/)