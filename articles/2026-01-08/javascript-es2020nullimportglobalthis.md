---
title: "JavaScriptのモダンな書き方 - ES2020のオプショナルチェーン、null合体演算子、動的import、globalThis等を解説"
source: "https://ics.media/entry/200128/"
publishedDate: "2020-02-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

JavaScriptの仕様であるECMAScriptは年次で仕様が更新されています。ECMAScript 2020（ES2020）は2020年6月にリリースとなりました。現行のすべてのブラウザでES2020の機能は利用できますが、フロントエンドエンジニアにとって使いこなしたい記法ばかりです。

本記事ではES2020に焦点をあて、JavaScriptの新しい記述方法のメリットと使いどころを解説します。

### オプショナルチェーン

Optional Chaining（オプショナルチェーンやオプショナルチェーニングと呼ばれています）とは、`?.`構文を用いて`null`や`undefined`になりうる値へ安全にアクセスできる仕組みです。

#### 利用シーン

-   `null`や`undefined`になるかもしれない値にアクセスしたいとき

#### 何がメリットなのか？

APIからユーザーの住所を取得して出力するプログラムを考えてみましょう。サーバーからは次のようなオブジェクトが返ってくる想定です。

▼ APIから返ってくる想定のオブジェクト

```
const userData = {
  name: "鈴木",
  address: {
    // データによっては存在しないかもしれない
    city: "港区"
  }
};
```

上記のオブジェクトから`city`を出力したいのですが、ユーザーデータによっては`address`が存在しないかもしれません。従来は、`address`の存在を考慮に入れて次のようなコードを記述する必要がありました。

▼ 従来のコード

```
const address = userData.address;
if(address != null){
  const city = address.city;
  console.log(city);
}
// 結果: addressがある場合は「港区」が出力される
```

もしくは`&&`を使って以下のようにも処理を記述していました。

```
const city = userData.address && userData.address.city;
console.log(city);
// 結果: addressがある場合は「港区」が出力される
```

オプショナルチェーンを使うと、次のようにコードが記述できます。`?`がオプショナルチェーン用の演算子です。

▼ オプショナルチェーンを使った新コード

```
const city = userData.address?.city;
console.log(city);
// 結果: addressがある場合は「港区」が出力される。
//       addressがない場合はundefinedになる（エラーにならない）。
```

▼ オプショナルチェーンの実行結果

![Optional Chainingの実行結果](https://ics.media/entry/200128/images/images/200128_es2020_optional_chaining.png)

`?.`構文は何個でも使用できるので、`userData`も`null`になりえるのであれば次のように記述できます。

▼ `?.`構文を複数使う例

```
const city = userData?.address?.city;
// 結果: userDataもaddressもある場合は「港区」が出力される。
//      それ以外はundefinedになる（エラーにならない）。
```

DOM要素へ`querySelector()`を用いてアクセスする場合にも便利に使えます。

▼ HTMLコード

```
<p>こんにちは</p>
```

▼ `p`タグ内のテキストを出力する例

```
const paragraphText = document.querySelector("p")?.innerHTML;
console.log(paragraphText);
// 結果: p要素がある場合は、p要素内のテキストを参照して「こんにちは」が出力される。
//      それ以外はundefinedになる（エラーにならない）。
```

-   関連資料：「[Optional Chaining for JavaScript - tc39](https://github.com/TC39/proposal-optional-chaining)」

### `null`か`undefined`のときだけ値を返せるnull合体演算子

Nullish coalescing Operator（null合体演算子）は、「`A ?? B`」という形で用い、`A`が`null`か`undefined`のときだけ`B`を返します。「coalescing」は聞き慣れない単語かもしれませんが、「合体」という意味を持ちます。

構文

意味

`A ?? B`

`A`が`null`か`undefined`のとき`B`

#### 利用シーン

-   `0`、`false`などに`false`に評価されうる値を正しく扱いたい時

#### 何がメリットなのか？

次のようなオブジェクトから、`foo`値を取得して出力する関数を考えてみましょう。もし`foo`が未設定（`null`または`undefined`）ならば、「値なし」という文字列を出力したいです。

▼ 対象のオブジェクト

```
const myObject1 = {
  foo: 1
};

const myObject2 = {
  foo: 0
};

const myObject3 = {
  foo: false
};

const myObject4 = {
  foo: null
};
```

`||`（論理OR）演算子（参考：「[論理演算子 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators)」を使って、**次のような`getFoo`関数を定義するのは望ましくありません**。`myObject2`、`myObject3`が引数として渡された場合に`object.foo`が`false`と評価されて「値なし」が出力されるからです。

▼ `foo`の取得関数のNG例

```
function getFoo(object) {
  return object.foo || "値なし";
}

console.log(getFoo(myObject1)); // 結果: 1
console.log(getFoo(myObject2)); // 結果: ☆「値なし」（0が期待値）
console.log(getFoo(myObject3)); // 結果: ☆「値なし」（falseが期待値）
console.log(getFoo(myObject4)); // 結果: 「値なし」
```

ES2020のnull合体演算子を使えば、`object.foo`が`null`か`undefined`の場合**のみ**「値なし」を返すので、目的の挙動となります。

▼ null合体演算子を使った処理

```
function getFoo(object) {
  return object.foo ?? "値なし";
}

console.log(getFoo(myObject1)); // 結果: 1
console.log(getFoo(myObject2)); // 結果: 0
console.log(getFoo(myObject3)); // 結果: false
console.log(getFoo(myObject4)); // 結果: 「値なし」
```

▼ null合体演算子の実行結果

![Nullish coalescing Operatorの実行結果](https://ics.media/entry/200128/images/images/200128_es2020_nullish_coalescing_operator.png)

-   関連資料：「[Nullish Coalescing for JavaScript - tc39](https://github.com/tc39/proposal-nullish-coalescing)」

### 関数形式でモジュールを読み込む`import()`

`import()`関数は、関数形式でモジュールを読み込むための仕組みです。dynamic importとも呼ばれます。

[従来の`import`文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import)とは異なり、JavaScriptコードの任意の場所で実行でき、任意のタイミングでモジュールを読み込めます。

メソッド

意味

戻り値

`import(モジュール名)`

モジュールを読み込む

`Promise`

#### 利用シーン

-   モジュールを遅延読み込みしたいとき
-   関数形式でモジュールを読み込みたい

#### 何がメリットなのか？

次のモジュール「`sub.js`」を用いて解説します。

▼ モジュール`sub.js`

```
export const foo = "Hello World";
```

従来の`import`文はJavaScriptのトップレベルでしか用いることができず、モジュールは即座に読み込まれる仕様でした。

▼ 従来の`import`文でモジュールを読み込む処理

```
// 即座にsub.jsが読み込まれる
import { sub } from "./sub.js";

console.log(sub); // 結果："Hello World"
```

ES2020で導入される`import()`関数は、モジュールを動的に読み込みます。巨大なモジュールを遅延して読み込む場合などに便利です。戻り値の`Promise`の結果としてモジュールを受け取るため、次のようにすれば`sub.js`内の`sub`定数にアクセスできます。

▼ `import()`関数でモジュールを読み込む処理

```
// import()のタイミングでsub.jsが読み込まれる
import("./sub.js").then(module => {
  // subモジュールの定数を読み込んで出力します
  console.log(module.sub);
});
```

[オブジェクトの分割代入（destructuring assignment）](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring)を使うのがよいでしょう。

▼ `import()`とオブジェクトの分割代入を使用したモジュール読み込み

```
// import()のタイミングでsub.jsが読み込まれる
import("./sub.js").then(({ sub }) => {
  // subモジュールの定数を読み込んで出力します
  console.log(sub);
});
```

`import()`関数は任意のタイミングで実行できるので、次のように画面表示から2秒後にモジュールを読み込むということも可能です。また、ES2017で導入された`async`関数と`await`式を使うとよりスッキリコードを記述できます。

▼ 画面表示から2秒後にモジュールを読み込んで定数を出力する例

```
setTimeout(async () => {
  const { sub } = await import("./sub.js");
  console.log(sub);
}, 2000);
```

▼ `sub.js`モジュールが2秒後に読み込まれている様子

![モジュールが2秒後に読み込まれている様子](https://ics.media/entry/200128/images/images/200128_es2020_dynamic_import.png)

-   関連資料：「[import() - tc39](https://github.com/tc39/proposal-dynamic-import)」

### `Promise`の複数処理に便利な`Promise.allSettled()`

`Promise.allSettled()`は、複数の`Promise`の処理を扱うためのメソッドです。複数の`Promise`の1つが`reject`されても処理を続行できます。

メソッド

意味

戻り値

`Promise.allSettled([Promise1, Promise2, ...])`

各Promiseを実行する

Promiseの結果のイテレータ

#### 利用シーン

-   複数のPromiseを、成功・失敗によらずすべて実行したいとき

#### 何がメリットなのか？

`Promise`の複数同時処理といえば、ES2015で導入された`Promise.all()`というメソッドがあります。`Promise.all()`は複数の`Promise`の処理を実行し、全部が成功した場合にはじめて処理が終了するものです。もし、1つでも`reject`されるものがあればその時点で処理を終了します。

▼ `Promise.all()`で`reject`されるものがあった場合

```
const promiseList = [
  Promise.resolve("😊"),
  Promise.resolve("😊"),
  Promise.reject("😡"),
  Promise.resolve("😊")
];

Promise.all(promiseList).then(
  resolve => console.log(`resolve: ${resolve}`),
  reject => console.log(`reject: ${reject}`)
);

// 結果：「reject: 😡」が出力される
```

▼ `Promise.all()`の実行結果

![Promise.all()の実行結果](https://ics.media/entry/200128/images/images/200128_es2020_promise_all.png)

ES2020の`Promise.allSettled()`では、**rejectされるものがあってもすべての処理が実行されます**。したがって、複数の配列のどれかが失敗したとしても処理をすべて実行したい場合に便利です。

▼ `Promise.allSettled()`で`reject`されるものがあった場合

```
const promiseList = [
  Promise.resolve("😊"),
  Promise.resolve("😊"),
  Promise.reject("😡"),
  Promise.resolve("😊")
];

Promise.allSettled(promiseList).then(
  resolveList => {
    console.log("resolve");
    for (const resolve of resolveList) {
      console.log(resolve);
    }
  },
  reject => {
    console.log("reject");
    console.log(reject);
  }
);

// 結果：「resolve」のあと、各promiseの値が出力される
```

▼ `Promise.allSettled()`の実行結果

![Promise.allSettled()の実行結果](https://ics.media/entry/200128/images/images/200128_es2020_promise_all_settled.png)

関連資料：「[Promise.allSettled - tc39](https://github.com/tc39/proposal-promise-allSettled)」

### 正規表現で一致したものをキャプチャグループとともに返す`matchAll()`メソッド

対象文字列について、正規表現で一致したものをキャプチャグループ（参考：「[グループと後方参照 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences)」）とともにイテレータで返すためのメソッドです。一致した部分の各インデックス、各キャプチャーグループを返すことが可能です。

メソッド

意味

戻り値

`対象の文字列.matchAll(正規表現)`

正規表現で一致したものを返す

文字列のイテレータ

#### 利用シーン

-   正規表現で一致する複数の文字列のインデックスなどを取り扱いたいとき

#### 何がメリットなのか？

従来は、正規表現で一致した文字列のインデックスやキャプチャグループを取得するには、`正規表現.exec()`を使う必要がありました。

▼ 従来の処理

```
const myString = "JavaScriptを覚えよう";
const myRegex = /a/g;
let match;
while ((match = myRegex.exec(myString))) {
  console.log(match);
}

// 結果
// ["a", index: 1, input: "JavaScriptを覚えよう", groups: undefined]
// ["a", index: 3, input: "JavaScriptを覚えよう", groups: undefined]
```

`文字列.matchAll()`を使えば、イテレータ形式で処理ができて簡潔に記述可能です。

▼ `文字列.matchAll()`を使った処理

```
const myString = "JavaScriptを覚えよう";
const myRegex = /a/g;
for (const match of myString.matchAll(myRegex)) {
  console.log(match);
}

// 結果
// ["a", index: 1, input: "JavaScriptを覚えよう", groups: undefined]
// ["a", index: 3, input: "JavaScriptを覚えよう", groups: undefined]
```

▼ `matchAll()`の実行結果

![matchAll()の実行結果](https://ics.media/entry/200128/images/images/200128_es2020_match_all.png)

-   関連資料：「[String.prototype.matchAll - tc39](https://github.com/tc39/proposal-string-matchall)」

### ウェブブラウザでもNode.jsもグローバルオブジェクトを参照できるglobalThis

`globalThis`は、ウェブブラウザ（クライアントサイド）でもNode.js（サーバーサイド）もグローバルオブジェクトを参照できるオブジェクトです。

構文

意味

`globalThis`

グローバルオブジェクトを参照する

#### 利用シーン

-   ウェブブラウザの処理とNode.jsの処理で共通のコードを使いたいとき

#### 何がメリットなのか？

JavaScriptは、ウェブブラウザ上だけではなくNode.jsでも実行されます。しかし、グローバルオブジェクトの参照を考えた場合、ウェブブラウザでは`window`がグローバルオブジェクト、Node.jsでは`global`がグローバルオブジェクトなので、コードを共通化できませんでした。

`globalThis`を使えば、ウェブブラウザ・Node.jsに共通でグローバルオブジェクトを参照できるので、コードの共通化に役立ちます。もちろん、従来どおりウェブブラウザでの`window`、Node.jsでの`global`も使用可能です。

次のコードを用いてウェブブラウザでの実行結果を確認してみましょう。

▼ index.html

```
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <script>
      // globalThisの値を出力します
      console.log(globalThis);
    </script>
  </head>
  <body></body>
</html>
```

HTMLファイルをChromeで開くと、コンソールタブに次のように出力されます。`globalThis`によって、`Window`が出力されていることがわかります。

▼ ウェブブラウザで`globalThis`を参照している様子

![ウェブブラウザでglobalThisを参照している様子](https://ics.media/entry/200128/images/images/200128_es2020_global_this_client.png)

※ ブラウザ：Google Chrome v80

続いて、Node.jsでの実行結果を見てみましょう。次のコードが記述されたJavaScriptファイル「script.js」を準備します。

▼ script.js

```
console.log(globalThis);
```

コマンドラインで`node script.js`と入力するとNode.jsを実行できます。次のキャプチャーが実行結果です。赤枠部分が実行結果ですが、`globalThis`によって`Global`が出力されていることがわかります。

▼ Node.jsで`globalThis`を参照している様子

![Node.jsでglobalThisを参照している様子](https://ics.media/entry/200128/images/images/200128_es2020_global_this_serverside.png)

※ Node.js v13.7.0

-   関連資料：「[globalThis - tc39](https://github.com/tc39/proposal-global)」

### `2^53`以上の整数を扱える`BigInt`

`BigInt`は、`Number`より大きな整数`2^53`以上の整数を扱えるオブジェクトです。

メソッド

意味

戻り値

`BigInt(数値)`

数値を`BigInt`の値にする

BigIntの整数

構文

意味

`数値n`

数値をBigIntの値にする

#### 利用シーン

-   `2^53` 以上の整数の計算をしたいとき
-   符号付きまたは符号なしの64ビット整数を扱いたいとき

#### 何がメリットなのか？

JavaScriptの数値（`Number`）で正確に扱える最大整数は、`2^53-1`です。定数でいえば、`Number.MAX_SAFE_INTEGER`となります。`2^53`以上の値を計算しようとすると、計算結果に誤差が生じます。

▼ 計算結果に誤差が生じる例

```
console.log(Number.MAX_SAFE_INTEGER); // 結果: 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 2); // 結果: 9007199254740992（9007199254740993ではない）
```

`BitInt`を使うと、`2^53`以上の整数も扱えるようになります。`BigInt`を扱うには、`BigInt(数値)`とするか、`数値n`という記述をします。`BigInt`は`BigInt`同士でしか計算ができないので、`Number`とあわせて使う場合は`Number`も`BigInt`に変換するようにしましょう。

▼ `BigInt`の計算例

```
console.log(BigInt(Number.MAX_SAFE_INTEGER) + 2n);
// 結果: 9007199254740993n
```

▼ 実行結果

![BigIntの実行結果](https://ics.media/entry/200128/images/images/200128_es2020_bigint.png)

出力された`9007199254740993n`は数学世界での整数`9007199254740993`を指します。

-   関連資料：「[BigInt - tc39](https://github.com/tc39/proposal-bigint)」

### `for...in`の順序固定

ここでいう`for...in`とは、次のように列挙可能なプロパティを反復する処理のことです。

```
const myData = { name: "鈴木", age: 23, address: "TOKYO" };

for (const key in myData) {
  console.log(`${key}: ${myData[key]}`);
}
```

従来のECMAScriptの仕様では、`for...in`の実行順序は固定されていませんでした。ES2020では、その実行順序が指定されます。仕様は次のとおりです。

-   [For-in enumeration order](https://tc39.es/proposal-for-in-order/)
-   関連資料：「[Specifying for-in enumeration order - tc39](https://github.com/tc39/proposal-for-in-order)」

### 対応環境の状況

#### ウェブブラウザの対応状況

本記事で紹介したES2020の仕様は、次のブラウザで対応しています。2023年時点の現行ブラウザですべて対応しています。

機能

Chrome

Firefox

Safari

Edge

[オプショナルチェーン ?.構文](https://caniuse.com/mdn-javascript_operators_optional_chaining)

◯

◯

◯

◯

[null合体演算子 ??演算子](https://caniuse.com/mdn-javascript_operators_nullish_coalescing)

◯

◯

◯

◯

[import()](https://caniuse.com/es6-module-dynamic-import)

◯

◯

◯

◯

[Promise.allSettled()](https://caniuse.com/mdn-javascript_builtins_promise_allsettled)

◯

◯

◯

◯

[文字列.matchAll()](https://caniuse.com/mdn-javascript_builtins_string_matchall)

◯

◯

◯

◯

[globalThis](https://caniuse.com/mdn-javascript_builtins_globalthis)

◯

◯

◯

◯

[BigInt](https://caniuse.com/bigint)

◯

◯

◯

◯

`for...in`の順序保証

◯

◯

◯

◯

### ES2020は便利な新機能がたくさん

今回紹介したES2020の新機能のうち、個人的にはオプショナルチェーン、null合体演算子、`import()`、`Promise.allSettled()`がとても便利に感じます。新機能はこれまで面倒だった処理を簡潔にしてくれる効果があるので、積極的にキャッチアップしていきましょう。

JavaScriptの新機能の情報は、次の記事にもまとまっています。あわせて参照くださいませ。

-   [JavaScriptの次の仕様ES2022の新機能まとめ](https://ics.media/entry/220610/)
-   [JavaScriptのモダンな書き方 - ES2017〜ES2018のawait・async, includes(), padStart()等を解説](https://ics.media/entry/17262/)