---
title: "JavaScriptのES2023・ES2022の新機能まとめ"
source: "https://ics.media/entry/220610/"
publishedDate: "2022-06-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

JavaScriptの仕様であるECMAScriptはEcma Internationalによって定められています。ECMAScript 2015（ES6）の登場以降は、ECMAScript 2016、ECMAScript 2017･･･と、年次で仕様が更新されています。ECMAScript 2022（ES2022）は2022年6月22日のEcma Internationalの[GA 123rd meeting](https://www.ecma-international.org/about-ecma/meeting-calendar/)にて、ECMAScript 2023（ES2023）は2023年6月27日の[GA 125th meeting](https://www.ecma-international.org/news/ecma-international-approves-new-standards-at-the-125th-general-assembly-27-june-2023/)で承認されました。

ES2022とES2023はすでに多くのブラウザやNode.js環境で利用可能です。本記事では新仕様と使いどころを紹介します。

### ES2023 - 配列の非破壊操作

ES2023では配列を非破壊で操作できるメソッドが追加されています。非破壊とは、元の配列を変更せずに新しい配列を作成することです。

#### toSorted(), toReversed()

`toSorted()`メソッドを使うと、元の配列を編集せずに新しい配列を作成できます。

```
const list1 = [3, 1, 2];
const list2 = list1.toSorted(); // ソート

console.log(list1); // [3, 1, 2] 元の配列のまま
console.log(list2); // [1, 2, 3] 加工後の配列
```

同様に、`toReversed()`メソッドを使うと、元の配列を編集せずに新しい配列を作成できます。

```
const list1 = [1, 2, 3];
const list2 = list1.toReversed(); // 逆転

console.log(list1); // [1, 2, 3] 元の配列のまま
console.log(list2); // [3, 2, 1] 加工後の配列
```

#### toSpliced()

ES2023では`toSpliced()`メソッドが用意され、非破壊に配列の要素の削除・置換・追加ができます。`toSpliced()`メソッドは一部のブラウザでは利用できます。

以前から存在した`splice()`メソッドは元の配列に影響します。戻り値は削った要素が配列として返ってきます。

```
const list1 = ["apple", "orange", "lemon"];

const list2 = list1.splice(1, 1); // 1番目の要素を1つ削る

console.log(list1); // ['apple', 'lemon'] 元の配列は破壊的に変更されている
console.log(list2); // ['orange'] ※削り取った'orange'が戻り値になる
```

ES2023の`toSpliced()`メソッドを使うと以下のように記載できます。戻り値は変化後の配列を返しているため、`splice()`メソッドと異なることがわかります。

```
const list1 = ["apple", "orange", "lemon"];

const list2 = list1.toSpliced(1, 1); // 1番目の要素を1つ削る

console.log(list1); // ['apple', 'orange', 'lemon'] 元の配列 
console.log(list2); // ['apple', 'lemon'] ※'orange'がなくなっている
```

```
const list1 = ["apple", "orange", "lemon"];

const list2 = list1.toSpliced(1, 1, "みかん"); // 1番目の要素を1つ削り、そこに"みかん"を追加

console.log(list1); // ['apple', 'orange', 'lemon'] 元の配列 
console.log(list2); // ['apple', 'みかん', 'lemon'] ※'orange'が'みかん'に
```

#### with()

配列の`with()`メソッドは置換に役立ちます。`with(index, value)`として、第1引数にインデックス番号、第2引数に置換する値を指定します。

```
const list1 = [1, 2, 3, 4, 5];
const list2 = list1.with(1, 100)
console.log(list1); // [1, 2, 3, 4, 5]
console.log(list2); // [1, 100, 3, 4, 5]
```

### ES2023 - Array の findLast(), findLastIndex()

以前より存在する`find()`メソッドは配列の先頭から調べていき、配列の先頭に近い要素が戻り値になります。ES2023で登場する`findLast()`メソッドだと配列の最後から検索します。`findLastIndex()`も同様に配列の最後からの調べていきます。

```
const list = [500, 20, 200, 300, 50, 150];

// 最初から順番に、条件にあう要素を検索
const item1 = list.find(item => item < 100); 
console.log(item1); // 20

// 最初から順番に、条件にあう要素のインデックス番号を検索
const index1 = list.findIndex(item => item < 100);
console.log(index1); // 1

// 最後から順番に、条件にあう要素を検索
const item2 = list.findLast(item => item < 100); 
console.log(item2); // 50

// 最後から順番に、条件にあう要素のインデックス番号を検索
const index2 = list.findLastIndex(item => item < 100);
console.log(index2); // 4
```

### ES2022 - Array, String, TypedArray の .at()

配列や文字列の番号でアクセスができるメソッドとして、`at()`が用意されました。

配列記号`[]`とインデックスを使うことで配列の要素にアクセスできますが、ES2022では`at()`メソッドを使うことでもアクセスできるようになります。

```
const array = ["a", "b", "c"];

console.log(array[1]); // "b"

// ES2022
console.log(array.at(1)); // "b"
```

これだけだと利点は少なそうですが、`at()`メソッドには負の整数も指定できます。負の整数を指定すると配列の末尾から参照できます。従来だと配列の`length`を使って末尾を参照する必要がありましたが、`at()`メソッドだと直感的に記述できます。`-1`が配列の末尾を示します。

```
const array = ["a", "b", "c", "d"];

// 従来の配列末尾からの参照
console.log(array[array.length - 1]); // "d"

// ES2022で可能になる書き方
console.log(array.at(-1)); // "d"
```

※`at()`メソッドに非数や小数を利用すると複雑な結果が得られます（記事『[【追記あり】ES2022 Array#at がちょっとおかしい #fix\_ecmascript\_at - Qiita](https://qiita.com/printf_moriken/items/da03f55cb626617c1958)』）。整数以外は引数に渡さないように注意しましょう。

配列だけでなく、文字列でも`at()`メソッドを利用できます。

```
const myString = "あいうえお";

// 先頭から参照
console.log(myString.at(1)); // "い"
console.log(myString[1]); // "い"

// 末尾から参照
console.log(myString[myString.length - 2]); // "え"
console.log(myString.at(-2)); // "え"
```

### ES2022 - Top-Level Await

`await`・`async`キーワードはES2017で登場しました。`await`・`async`キーワードは`Promise`での非同期処理が扱いやすくなったことで、現在の多くのフロントエンドエンジニアは利用していることでしょう。

従来の`await`は、`async`とした関数宣言・関数式でしか利用できませんでしたが、ES2022で`async`なしでもトップレベルで`await`が利用できるようになりました。

たとえば、従来のコードとしては次のように記述しました。ラッパーとしての関数（`start`）を用意しています。

```
<script>
  // 従来のコード
  const start = async () => {
    // JSONデータを読み込む
    const data = await fetch("./example/data.json");
    const object = await data.json();
  }
  start();
</script>
```

ES2022ではラッパーとしての`async`関数を宣言せずに`await`を利用できています。

```
<script type="module">
  // ES2022で可能になった書き方
  const data = await fetch("./example/data.json");
  const object = await data.json();
  console.log(object)
</script>
```

`async`の関数宣言・関数式を用意する手間がなくなるので、書き捨てのコードをサクッと試すのに役立つでしょう。

-   ブラウザの開発者ツールのConsoleパネルでコードをサクッと試したいとき
-   Node.jsでサクッとコードを試したいとき

![](https://ics.media/entry/220610/images/220610_es2022_toplevel.png)

注意点として、`async`なしで記述できるのはトップレベルであり、`async`無しの関数宣言・関数式のなかでは`await`は利用できません。機能名のとおり「Top-Level Await」であること認識しましょう。

NG例：

```
// 🆖 失敗するコード
const start = () => { // async 宣言がないアロー関数式
  // JSONデータを読み込む
  const data = await fetch("./example/data.json"); // ❎️ シンタックスエラー
  const object = await data.json();
}
start();
```

また、Top-Level AwaitはES Moduleとしてしか利用できません。scriptタグで利用する場合は、`<script type="module">`とES Module方式で利用しなければなりません。CDNから`<script>`タグを貼り付ける･･･といった場面では利用できません。ES Moduleの使い方は記事『[ブラウザで覚えるES Modules入門](https://ics.media/entry/16511/)』を参照ください。Node.jsの場合は、拡張子を`.mjs`としてES Moduleであることを指定します。

このTop-Level Awaitは、本領として動的モジュール読み込みの`import()`と組み合わせると効果を発揮します。

```
// 外部ファイルに宣言したモジュール
const {someModule} = await import("./someModule.mjs");

console.log(someModule);
```

次のように動的`import`には文字列を利用できるので、実行環境に応じて文言リストを読み込むといった使い方もできます。モジュール方式のJavaScriptでの利用がしやすくなります。

```
// ブラウザの実行言語に応じて文言リストを取得するコード
const {wordingList} = await import(`./i18l/${navigaor.language}.js`);

console.log(wordingList);
```

TypeScript 3.8（2020年2月リリース）から利用できたので、すでに馴染みのある方が多いかもしれません。

### ES2022 - プライベートのインスタンスフィールド、メソッド

ECMAScript 2015でクラス構文が登場しました。しかし、他の言語から比べるとES2015の`class`は十分な機能を有しているとはいえない状況でした。ES2022では以下の機能を中心に仕様が追加されています。

-   クラスインスタンスのプライベートのフィールド
-   クラスインスタンスのプライベートのメソッド
-   プライベートを示すアクセサー

プライベートフィールド（プライベート変数）には接頭辞に`#`（ハッシュ）を利用します。プライベートフィールドは外部からアクセスできず、もしアクセスしようとすると実行時エラーが発生します。オブジェクト指向プログラミングの観点としては、クラス内に外部からアクセスできない変数を設けることで、カプセル化を実現するのに役立ちます。

```
class MyCounter {
  #count;

  constructor(count) {
    this.#count = count;
  }

  #calc() {
    return this.#count * 10;
  }

  say() {
    // プライベート変数にアクセスできるのはクラスの内部だけ
    console.log(this.#calc());
  }
}

const object = new MyCounter(3);
object.say(); // 30

console.log(object.#count); // ❎️ シンタックスエラー
console.log(object.#calc()); // ❎️ シンタックスエラー
```

従来では、プライベートフィールドを設けることができなかったので、接頭語に「`_`」（アンダースコア）を使い、命名規則でプライベートフィールドであることを示していたエンジニアも多いと思います。接頭語に「`_`」を使ったとしても言語的にはプライベートであることを強制できないので、アクセスしようと思えば自由にアクセスできました。ES2022の新しい接頭辞`#`を使うことで、自由にアクセスできないようになり、プライベートフィールドの安全性が高まります。

関連して、`in`を使って外部からアクセスしようとしても成功しません。これもES2022の仕様として定義されています。

```
class MyCounter {
  #count;

  constructor(count) {
    this.#count = 0;
  }
  hasCount () {
    return #count in this;
  }
}

const object = new MyCounter();
console.log(object.hasCount()); // true
console.log("#count" in object); // false
```

参考文献

-   [tc39/proposal-private-fields-in-in: EcmaScript proposal to provide brand checks without exceptions](https://github.com/tc39/proposal-private-fields-in-in)

#### ES2022 - TypeScriptのprivateと#の違い

TypeScriptではプライベートのアクセス修飾子として`private`が存在しました（ソフトプライベート）。TypeScript 3.8以降はES2022と同様の`#`を利用できます（ハードプライベート）。TypeScriptの設定ファイル`tsconfig.json`のターゲットによってコンパイル結果が異なりますが、おおよそ以下の出力となります。

-   TypeScriptでは、`private`は`#`へ変換されません。
-   `private`アクセス修飾子はターゲットにかかわらず互換コードへコンパイルされます（取り除かれた形になります）。
-   `#`はES2015〜SES2021ターゲットだと、互換コードへコンパイルされます（ES5以下にはコンパイルできません）。
-   `#`はES2022ターゲットだと、そのまま出力されます。

`private`と`#`のどちらを利用するかは開発チームで足並みを揃えたほうがいいでしょう。

### ES2022 - 静的クラスフィールド

クラスの`static`フィールドが使えるようになりました。クラス内部で`static`を宣言すると、インスタンス化せずともクラスに固有のフィールドとしてアクセスできます。

従来でも、クラスの外部で動的にフィールドを追加すると、静的フィールドのように扱う事ができました。ES2022ではクラス内部に`static`フィールドを宣言できるので、よりクラスらしい書き方ができるようになりました。

```
// 従来の書き方
class MyOldClass {
  // ...
}

MyOldClass.message = "あ"; // 動的に追加することで静的変数を表現できた

// 新しい書き方
class MyClass {
  static message = "い";
  // ...
}

console.log(MyOldClass.message); // "あ"
console.log(MyClass.message); // "い"

```

クラスの静的メソッドも定義できます。次の例では`sayHello()`というメソッドを`static`フィールドに定義しています。

```
// 新しい書き方
class MyClass {
  static message = "あ";
  static sayHello() {
    console.log(MyClass.message); // "あ"
  }
}

MyClass.sayHello();
```

`static`フィールドには`#`接頭辞が利用でき、静的なプライベートフィールドとして定義できます。

次のコードでは、クラスの部的なIDを生成する機能を静的なプライベートフィールドで用意しています。クラスの内部であるコンストラクターからは呼び出せますが、外部から呼び出せないため、意図しない呼び出しを防げます。

```
class MyCounter {
  static #counter = 1;

  // 静的なプライベート関数
  static #getNextId() {
    return MyCounter.#counter++;
  }

  #id; // プライベート変数としてのID

  constructor() {
    // 内部的に管理したいIDには、静的変数を利用する
    this.#id = MyCounter.#getNextId();
  }

  getId () {
    return this.#id;
  }
}

// 利用例
const list = [new MyCounter(), new MyCounter()]
console.log(list[1].getId()); // 2
```

### ES2022 - クラスの静的イニシャライザーブロック

静的イニシャライザーブロックを使うと、クラスの評価中にコードを実行できます。`static`キーワードで宣言したブロックステートメント内にコードを記述します。このブロックステートメント内のコードは、クラスが評価されるときに1度だけ実行されます。「静的変数に値を格納したいが、クラス宣言のタイミングでないと初期値を入れられない」といった場面で利用できます。

```
class MyClass {
  static #myProperty;

  // 静的イニシャライザーブロック
  static {
    // 外部からデータととってくるとか、環境変数から加工するとか、複雑な処理等
    // 以下はダミーの処理
    const json = JSON.parse(`{"someField": "hoge"}`);
    this.#myProperty = json.someField;
  }
  constructor() {
    console.log(MyClass.#myProperty);
  }
}

new MyClass(); // "hoge"
```

TypeScriptでは同等機能が[TypeScript 4.4](https://devblogs.microsoft.com/typescript/announcing-typescript-4-4-rc/#static-blocks)（2021年8月リリース）以降で利用できました。

### Object.hasOwn()メソッド

オブジェクトにプロパティーが存在するか確認するのが簡単になります。

従来では以下のメソッドを呼び出すことで、オブジェクト内にプロパティーが存在するか確認していました。

```
const example = {
  property: "あいう",
};

console.log(Object.prototype.hasOwnProperty.call(example, "property"));
console.log(example.hasOwnProperty("property")); // この書き方は動作するが注意が必要
```

JavaScriptは`hasOwnProperty`プロパティ名が保護されていないので（書き換えることができるので）、安全のためには`Object.prototype.hasOwnProperty.call()`を使う必要がありました。しかし、`Object.prototype.hasOwnProperty.call()`と記載するのも長くて手間です。

ES2022では`Object.hasOwn()`メソッドで同じ事ができるようになりました。

```
const example = {
  property: "あいう",
};

console.log(Object.hasOwn(example, "property")); // true
```

参考文献

-   [tc39/proposal-accessible-object-hasownproperty: Object.hasOwn() proposal for ECMAScript](https://github.com/tc39/proposal-accessible-object-hasownproperty)

### ES2022 - Error.cause

`Error`オブジェクトに`cause`というフィールドが追加されました。これは、エラーの発生源を格納できるようになります。`Error`のコンストラクターの第2引数に`cause`フィールドを含むオブジェクトを指定することで利用できます。

```
throw new Error("失敗", { cause: error }); // error は元となるエラーオブジェクト
```

#### 従来の課題

従来だと`cause`プロパティーがなかったため、`try catch`でラッパーを囲っていくと、元になるエラー起因を追跡するのが困難でした。

![](https://ics.media/entry/220610/images/220610_es2022_error.png)

#### 例

以下にネットワークエラーによる例を示します。`fetch`メソッドを使ってウェブサーバーからJSONファイルを受信するコードをサンプルとして用意しました。`fetch`でJSONファイルを読み込むときは以下の3点のエラーのケアが必要でしょう。

1.  オフライン時のネットワークエラー
2.  サーバーレスポンス404のエラー
3.  JSONのパースエラー

ラッパーの関数で`try catch`構文にて囲った場合、原因の元となるエラーを深掘りするに`cause` フィールドが役立ちます。

```
async function start() {
  try {
    await load();
  } catch (error) {
    console.log(error);
    // console.log(error.cause); // さらに奥の情報を追跡できる
  }
}

async function load() {
  try {
    const result = await loadJson();
    console.log(result);
  } catch (error) {
    throw new Error("読み込みに失敗！", { cause: error });
  }
}

async function loadJson() {
  let data;
  try {
    data = await fetch("example.json");
  } catch (error) {
    // ネットワークがオフラインの場合
    throw new Error("fetchに失敗しました。", { cause: error });
  }

  if (data.ok === false) {
    // 404 の場合等（この場合は、明示的なエラーなのでcause未指定）
    throw new Error("ファイルの読み込みに失敗しました。");
  }

  let json;
  try {
    json = await data.json();
    return json;
  } catch (error) {
    // JSONのパースに失敗
    throw new Error("JSONデータの展開に失敗しました。", { cause: error });
  }
}
```

▼ネットワークがオフライン状態であり、fetch()メソッドでエラーが起きる場合

![](https://ics.media/entry/220610/images/220610_es2022_error_cause_network.png)

▼該当ファイルがウェブサーバーに存在せず、ステータス404で読み込めない場合

![](https://ics.media/entry/220610/images/220610_es2022_error_cause_404.png)

▼ファイルを受信したが、JSONのパースに失敗する場合

![](https://ics.media/entry/220610/images/220610_es2022_error_cause_parse.png)

2022年6月現在は、Firefoxだとコンソールパネルでエラーの`cause`を自動的に展開してくれます。ChromeやSafariでは一階層目しかエラーがでてこないで、自前で`cause`プロパティーを追跡する必要があります。

参考文献

-   [tc39/proposal-error-cause: TC39 proposal for accumulating errors](https://github.com/tc39/proposal-error-cause)

### RegExp Match Indices (`/d`フラグ)

正規表現にマッチインデックス機能（`/d`フラグ）が追加されます。このオプションを指定すると、ひっかかった部分文字列の先頭と末尾のインデックスについての追加情報が得られます。

```
const text = "今日の夕食代：500円";
const regexp = /今日の夕食代：(?<digit>\d{3})円/dg;

for (const match of text.matchAll(regexp)) {
  console.log(match);
}
```

結果は次の通りです。

```
[
  '今日の夕食代：500円',
  '500',
  index: 0,
  input: "今日の夕食代：500円",
  groups: { digit: '500' },
  indices: {
    [ 0, 11 ],
    [ 7, 10 ],
    groups: { 
      digit: [7, 10]
    }
  }
]
```

注意点として、トランスパイルできず、`/d`フラグは古いブラウザでは動作しません。ポリフィル『[regexp-match-indices](https://github.com/rbuckton/regexp-match-indices)』が存在しますが、ES2022の書き方とは異なります。

参考文献

-   [tc39/proposal-regexp-match-indices: ECMAScript RegExp Match Indices](https://github.com/tc39/proposal-regexp-match-indices)
-   [RegExp match indices · V8](https://v8.dev/features/regexp-match-indices)

### 対応環境の状況

#### ES2022

本記事で紹介したES2022の仕様は、次のブラウザや実行環境で対応しています。2023年6月時点の現行ブラウザで対応しているものには「◯」を、対応開始バージョンを記載しています。

機能

Chrome

Firefox

Safari

Node.js

`.at()`

◯ 92

◯ 90

◯ 15.4

◯ 16.6

`Error.cause`

◯ 93

◯ 91

◯ 15

◯ 16.9

`Object.hasOwn`

◯ 93

◯ 92

◯ 15.4

◯ 16.9

`Top-Level Await`

◯ 89

◯ 89

◯ 15

◯ 14.8

`Class Private Features`

◯ 74

◯ 90

◯ 14.1

◯ 12.0

`Class Static Fields`

◯ 49

◯ 45

◯ 9

◯ 6.0

`RegExp: Match Indices`

◯ 90

◯ 88

◯ 15

◯ 16

#### ES2023

機能

Chrome

Firefox

Safari

Node.js

`.findLast()`・`.findLastIndex()`

◯ 97

◯ 104

◯ 15.4

◯ 18.0

`.toSorted()`

◯ 110

×

◯ 16.0

◯ 20.0

`.toReversed()`

◯ 110

×

◯ 16.0

◯ 20.0

`.toSpliced()`

◯ 93

×

◯ 15.4

◯ 20.0

`.with()`

◯ 110

×

◯ 16.0

◯ 20.0

`Hashbang Grammar #!`

◯ 74

◯ 67

◯ 13.1

◯初期から

`WeakMap`のキーに`Symbol`

◯ 108

×

◯ 16.4

×

#### トランスパイルとポリフィル

ES2022やES2023の各機能に対応していない古いブラウザバージョンに対応するには、トランスパイルをする必要があります。ただ、新しい記法が下位のECMAScriptにトランスパイルできなくなってきているのも事実です。たとえばクラスの`#`は、TypeScriptのコンパイルではES2015が最下位バージョンとなります。

IE11が2022年6月15日にサポート切れとなりましたが、新しいECMAScriptの恩恵を受けつつ、対象ブラウザの下限をどこに設定するか、JavaScriptの出力ターゲットの再検討が必要な時期に来ていると思います。

TypeScript・Babelの環境構築については、次の記事で詳しく紹介しています。

-   [webpack + TypeScriptの環境構築](https://ics.media/entry/16329/)
-   [webpack + BabelでES2022ビルド環境の構築](https://ics.media/entry/16028/)

### まとめ

今回紹介した新機能のうち、クラスの進化が興味深く感じました。クラスが求められていた時代から遅れてES2022にクラス仕様が固まったのは、興味深い進化と言えそうです。プライベートフィールドが他の言語で見られない`#`であることに、多くの議論がありましたが、ES2022として着地できたことを嬉しく思います。

新仕様はこれまで面倒だった処理を簡潔にしてくれる一面もあります。実行環境が揃うまで待ってから採用するか、トランスパイルやポリフィルを利用して早めに導入するか、この機会に検討してみてはいかがでしょうか。