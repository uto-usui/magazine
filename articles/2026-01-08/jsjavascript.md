---
title: "配列を征する者はJSを制す。JavaScriptのスマートな配列操作テクニック"
source: "https://ics.media/entry/200825/"
publishedDate: "2020-08-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

JavaScriptでコードを記述する際、配列の各要素について処理をするケースは頻出します。開発の現場で配列操作の処理を見ていると、次のようなケースがよくあります。

-   配列の非破壊の望まれる場面が増えているが、元の配列を破壊操作している
-   `filter()`や`every()`など配列のメソッドで書けるところを、`forEach()`メソッドや`for ... of`文を使ってコードを記載し、冗長になっている
-   記述しても効果のない`Array.from()`を使用している

コード的には問題なく、アプリケーションは意図的に動作しているかもしれません。しかし、冗長な記述は可読性が低下し、予期せぬバグを誘発する可能性があるでしょう。

本記事では、**配列操作でよく見かける冗長な記述を、簡潔な記述で置き換える方法**について解説します。

本記事で紹介するJavaScriptの配列操作のチートシートを用意したので、まとめて読みたい方は手元にダウンロードしておきましょう。

![](https://ics.media/entry/200825/images/images/200825_js_cheet_230309.png)

目次

-   [要素の追加や削除](#push)
-   [配列の加工、埋める、逆順へ入れ替え、結合](#map)
-   [配列の並び替え](#sort)
-   [条件を満たす要素だけを配列として抽出する](#group)
-   [配列に含まれているか調べる](#find)
-   [重複を調べる](#dup)
-   [配列の複製](#clone)
-   [要素が1つでも条件に合致するかを調べる](#find2)
-   [多次元の配列（ジャグ配列）を1次元にする](#jag)
-   [Object.entries()のコールバック関数の引数](#entries)
-   [document.querySelectorAll()をArray.from()で不用意に囲むべからず](#querySelectorAll)

### 要素の追加や削除

配列の追加や削除は以下のメソッドが用意されています。これらは元の配列を編集する効果があります。

-   `push()`メソッド : 配列の**最後**に要素を**追加**
-   `pop()`メソッド : 配列の**最後**の要素を**削除**
-   `unshift()`メソッド : 配列の**先頭**に要素を**追加**
-   `shift()`メソッド : 配列の**先頭**の要素を**削除**

フロントエンドの開発では、元の配列を編集せず（破壊せず）、配列操作の結果を新しい配列として受け取るコードの書き方が好まれています。本記事ではその作法に基づいて説明します。

#### 要素の追加（配列の先頭に）

非破壊操作を行うには次のように記載します。`...`というスプレッド構文を使い、元の配列を要素として展開するという文法を利用します。

配列の先頭に追加したい場合のコード（`unshift()`メソッドの代わりに使いたいコード）。

```
const list1 = [1, 2, 3];

// 要素を先頭に追加
const element = 0; // 追加したい要素
const list2 = [element, ...list1]; // 先頭に追加

console.log(list2); // [0, 1, 2, 3]
```

#### 要素の追加（配列の末尾に）

配列の末尾に追加したい場合のコード（`push()`メソッドの代わりに使いたいコード）は以下の通りです。追加したい要素を、スプレッド構文で追加した配列の後ろ側に配置します。

```
const list1 = [1, 2, 3];

// 要素を末端に追加
const element = 4; // 追加したい要素
const list2 = [...list1, element]; // 末尾に追加

console.log(list2); // [1, 2, 3, 4]
```

#### 要素の削除

要素を削除するには以下のように記載します。`filter()`メソッドは、「条件を満たす要素だけを得る」機能を持ちますが、逆の考えで「条件を満たすものだけ取り除く」こともできます。その性質を利用して、除外したいものを`filter()`メソッドで取り除くことで、配列の要素の削除を実現します。

■ `配列.filter()`

-   意味：コールバック関数に合格した配列を生成する
-   戻り値：配列

配列の先頭の要素を削除したい場合のコード（`shift()`メソッドの代わりに使いたいコード）。

```
const list1 = [0, 1, 2, 3];

// 要素の削除（削除したい番号を指定）
const indexDelete = 0; // 削除したい配列番号
const list2 = list1.filter((_, index) => index !== indexDelete);

console.log(list2); // [1, 2, 3] ※0が無くなっている
```

配列の末尾の要素を削除したい場合のコード（`pop()`メソッドの代わりに使いたいコード）。

```
const list1 = [0, 1, 2, 3];

// 要素の削除（削除したい番号を指定）
const indexDelete = list1.length - 1; // 削除したい配列番号
const list2 = list1.filter((_, index) => index !== indexDelete);

console.log(list2); // [0, 1, 2] ※3が無くなっている
```

削除したい要素を指定したい場合は以下のように記載します。

```
const list1 = ["apple", "orange", "lemon"];

// 要素の削除（削除したい番号を指定）
const elementDelete = "apple"; // 削除したい配列番号
const list2 = list1.filter((item) => item !== elementDelete);

console.log(list2); // ['orange', 'lemon'] ※'apple'がなくなっている
```

ES2023では`toSpliced()`メソッドが用意され、非破壊に配列の要素の削除・置換・追加ができます。以下のコードは`toSpliced()`メソッドを要素の削除に利用した作例です。

```
const list1 = ["apple", "orange", "lemon"];

const list2 = list1.toSpliced(1, 1); // 1番目の要素を1つ削る

console.log(list1); // ['apple', 'orange', 'lemon'] 元の配列 
console.log(list2); // ['apple', 'lemon'] ※'orange'がなくなっている
```

### 配列の加工

#### 数値配列で中の値を加工

配列の`map()`メソッドを使って、新しい配列を作成します。`map()`メソッドは元の配列の内容を変更せず、新しい配列を返却します。

■ `配列.map()`

-   意味：コールバック関数によって、新しい配列を生成する
-   戻り値：配列

```
const list1 = [1, 2, 3];
const list2 = list1.map(item => item * 2); // 2倍に

console.log(list1); // [1, 2, 3] 元の配列のまま
console.log(list2); // [2, 4, 6] 加工後の配列
```

文字列を加工したい場合も同様に処理できます。

```
const list1 = ["和歌山", "岩手"];
const list2 = list1.map(item => item + "県"); // 2倍に

console.log(list1); // ['和歌山', '岩手'] 元の配列のまま
console.log(list2); // ['和歌山県', '岩手県'] 加工後の配列
```

#### 新しい要素でうめる

`new Array()`で要素数を指定し、`fill()`メソッドで埋めたい値を指定します。

```
const list = new Array(5).fill("A");

console.log(list); // ['A', 'A', 'A', 'A', 'A']
```

#### for in文をforEachメソッドで表現

`for(let i=0; i<ループ上限数; i++){}`というループ文を別の書き方で実現すると以下のように記述できます。

```
const length = 10;
[...Array(length).keys()].forEach(i => {
  console.log(i);
});
// 0から9までが出力されます
```

#### 配列の順番を逆転

`toReversed()`メソッド（ES2023）を使うと配列を逆順に編集できます。

```
const list1 = [1, 2, 3];
const list2 = list1.toReversed(); // 逆転

console.log(list1); // [1, 2, 3] 元の配列のまま
console.log(list2); // [3, 2, 1] 加工後の配列
```

別の方法として、`reverse()`メソッドでも配列を逆順にできます。ただ、`reverse()`メソッドは元の配列を編集してしまうため注意が必要です。スプレッド構文`...`で元の配列のコピーを作成して、コピー後の配列を逆順にします。

```
const list1 = [1, 2, 3];
const list2 = [...list1].reverse(); // 逆転

console.log(list1); // [1, 2, 3] 元の配列のまま
console.log(list2); // [3, 2, 1] 加工後の配列
```

#### 配列の結合

スプレッド構文`...`で展開すると結合操作ができます。

```
const list1 = [1, 2, 3];
const list2 = [4, 5, 6];

const list3 = [...list1, ...list2]; // 結合

console.log(list1); // [1, 2, 3] 元の配列のまま
console.log(list2); // [4, 5, 6] 元の配列のまま

console.log(list3); // [1, 2, 3, 4, 5, 6] 加工後の配列
```

`concat()`メソッドを使っても配列を結合できます。`concat()`メソッドは元の配列を編集しません。

```
const list1 = [1, 2, 3];
const list2 = [4, 5, 6];

const list3 = list1.concat(list2); // 結合

console.log(list1); // [1, 2, 3] 元の配列のまま
console.log(list2); // [4, 5, 6] 元の配列のまま

console.log(list3); // [1, 2, 3, 4, 5, 6] 加工後の配列
```

### 配列の並び替え

#### 並び替え（数値配列の昇順）

`toSorted()`メソッド（ES2023）使うと配列を逆順に編集できます。

```
const list1 = [3, 1, 2];
const list2 = list1.toSorted(); // 並び順の整理

console.log(list1); // [3, 1, 2] 元の配列のまま
console.log(list2); // [1, 2, 3] 加工後の配列
```

別の方法として、`sort()`メソッドでも並び替えが可能ですが、`sort()`メソッドは元の配列を編集してしまうため注意が必要です。スプレッド構文`...`で元の配列のコピーを作成して、コピー後の配列を逆順にしています。

```
const list1 = [3, 1, 2];
const list2 = [...list1].sort(); // 並び順の整理

console.log(list1); // [3, 1, 2] 元の配列のまま
console.log(list2); // [1, 2, 3] 加工後の配列
```

#### 並び替え（数値配列の降順）

`sort()`メソッドを使うと配列を逆順に編集できます。ただし、`sort()`メソッドは元の配列を編集してしまうため、スプレッド構文`...`で元の配列のコピーを作成して、コピー後の配列を逆順にしています。

```
const list1 = [3, 1, 2];
const list2 = [...list1].sort((a, b) => b - a); // 並び順の整理

console.log(list1); // [3, 1, 2] 元の配列のまま
console.log(list2); // [3, 2, 1] 加工後の配列
```

※これも同様に`toSorted()`メソッドで並び替えが可能です。

#### 並び替え（IDの昇順）

`sort()`メソッドを使うと配列を逆順に編集できます。ただし、`sort()`メソッドは元の配列を編集してしまうため、スプレッド構文`...`で元の配列のコピーを作成して、コピー後の配列を逆順にしています。

```
const list1 = [
  {id: 2, label: "青森県"},
  {id: 3, label: "秋田県"},
  {id: 1, label: "北海道"},
];
const list2 = [...list1].sort((a, b) => a.id - b.id); // 並び順の整理

console.log(list1); // 元の配列のまま
console.log(list2); // 加工後の配列 [{id: 1, label: "北海道"}, {id: 2, label: "青森県"}, {id: 3, label: "秋田県"}]
```

※これも同様に`toSorted()`メソッドで並び替えが可能です。

#### 並び替え（文字列）

```
const list1 = ["A", "C", "B"];
const list2 = [...list1].sort((a, b) => a.localeCompare(b)); // 並び順の整理

console.log(list1); // ['A', 'C', 'B'] 元の配列のまま
console.log(list2); // ['A', 'B', 'C'] 加工後の配列
```

逆順にしたければ、比較対象を変更します。

```
const list1 = ["A", "C", "B"];
const list2 = [...list1].sort((a, b) => b.localeCompare(a)); // 🌟ここを編集

console.log(list2); // ['C', 'B', 'A'] 🌟並び順が逆になっている
```

### 条件を満たす要素だけを配列として抽出する

次の配列データがあるとします。この配列から、「近畿だけの都道府県の配列」を作るにはどうしたらよいでしょうか？

```
const list1 = [
  {label: "青森県", area: "東北"},
  {label: "秋田県", area: "東北"},
  {label: "岩手県", area: "東北"},
  {label: "埼玉県", area: "関東"},
  {label: "東京都", area: "関東"},
  {label: "千葉県", area: "関東"},
  {label: "神奈川県", area: "関東"},
  {label: "大阪府", area: "近畿"},
  {label: "和歌山県", area: "近畿"},
];
```

冗長な記述は次の通り。`forEach`文で`list1`配列の各要素をチェックし、条件に合致するデータを配列に格納しています。

👎 冗長な記述

```
// list1は上記の配列データ（記載は省略）

// 新しい配列を作成
const list2 = [];

list1.forEach(data => {
  if (data.area === "近畿") { // 条件
    list2.push(data)
  }
});

console.log(list2); // area に近畿が含まれる要素だけになる
// [{label: "大阪府", area: "近畿"}, {label: "和歌山県", area: "近畿"}]
```

このようなケースでは`filter()`関数を使うとよいでしょう。

👍 簡潔な記述

```
const list1 = [
  {label: "青森県", area: "東北"},
  {label: "秋田県", area: "東北"},
  {label: "岩手県", area: "東北"},
  {label: "埼玉県", area: "関東"},
  {label: "東京都", area: "関東"},
  {label: "千葉県", area: "関東"},
  {label: "神奈川県", area: "関東"},
  {label: "大阪府", area: "近畿"},
  {label: "和歌山県", area: "近畿"},
];
const target = "近畿"; // 条件とする値
const list2 = list1.filter(item => item.area === target);

console.log(list2); // area に近畿が含まれる要素だけになる
// [{label: "大阪府", area: "近畿"}, {label: "和歌山県", area: "近畿"}]
```

都道府県の配列から都道府県情報（オブジェクト）を要素とする配列`[{label: "大阪府", area: "近畿"}, {label: "和歌山県", area: "近畿"}]`を抽出できました。

#### 戻り値を配列の特定のフィールドだけにする

`filter()`メソッドと`map()`メソッドを組み合わせて使うと、条件に合致する要素の**値だけ**を抽出できます。次の例では、都道府県の配列から都道府県名（文字列）の配列`["大阪府", "和歌山県"]`を抽出しています。

```
const list1 = [
  {label: "青森県", area: "東北"},
  {label: "秋田県", area: "東北"},
  {label: "岩手県", area: "東北"},
  {label: "埼玉県", area: "関東"},
  {label: "東京都", area: "関東"},
  {label: "千葉県", area: "関東"},
  {label: "神奈川県", area: "関東"},
  {label: "大阪府", area: "近畿"},
  {label: "和歌山県", area: "近畿"},
];
const target = "近畿"; // 条件とする値
const list2 = list1
  .filter(item => item.area === target)
  .map(item => item.label);

console.log(list2); // area に近畿が含まれる要素だけの label だけになる
// ["大阪府", "和歌山県"]
```

#### 条件は数値としても指定できる

`filter()`メソッドのアロー関数に条件文を指定すれば、数値条件を指定できます。

```
const list1 = [
  // 人口
  {label: "盛岡市", population: 290000},
  {label: "和歌山市", population: 340000},
  {label: "品川区", population: 380000},
  {label: "横浜市", population: 3720000},
  {label: "大阪市", population: 2690000},
];


const list2 = list1
  // 100万人以上の都市だけを抽出
  .filter(item => item.population > 1000000)
  // 都市名だけにする
  .map(item => item.label);

console.log(list2); // population が 1000000 を超える都市だけになる
// ['横浜市', '大阪市']
```

#### グルーピング

ES2024では`Object.groupBy()`メソッドを利用できます（参考：[Can I Use…](https://caniuse.com/mdn-javascript_builtins_object_groupby)）。このメソッドは、配列の要素をグループ化するためのメソッドです。`Object.groupBy()`メソッドは、第1引数に配列データ、第2引数にグループ化の条件を指定する関数を指定します。

都道府県を地域別にグループ化してみましょう。`Object.groupBy()`メソッドの第2引数で指定した関数の戻り値がグループのフィールド名になります。

```
const list1 = [
  {label: "青森県", area: "東北"},
  {label: "秋田県", area: "東北"},
  {label: "岩手県", area: "東北"},
  {label: "埼玉県", area: "関東"},
  {label: "東京都", area: "関東"},
  {label: "千葉県", area: "関東"},
  {label: "神奈川県", area: "関東"},
  {label: "大阪府", area: "近畿"},
  {label: "和歌山県", area: "近畿"},
];

const groupedByArea = Object.groupBy(
  list1, // 対象の配列
  (item) => item.area // グループ化の条件
);

console.log(groupedByArea);
/*
{
  "東北": [
    {label: "青森県", area: "東北"},
    {label: "秋田県", area: "東北"},
    {label: "岩手県", area: "東北"}
  ],
  "関東": [
    {label: "埼玉県", area: "関東"},
    {label: "東京都", area: "関東"},
    {label: "千葉県", area: "関東"},
    {label: "神奈川県", area: "関東"}
  ],
  "近畿": [
    {label: "大阪府", area: "近畿"},
    {label: "和歌山県", area: "近畿"}
  ]
}
*/
```

別の例も紹介します。年齢が`30`歳以上の人物データを`over30`、`30`歳未満の人物データを`under30`のフィールドに配列として格納しています。

```
const listPeople = [
  { age: 40, name: "鈴木" },
  { age: 30, name: "田中" },
  { age: 20, name: "佐藤" },
  { age: 25, name: "山田" },
  { age: 40, name: "伊藤" },
  { age: 30, name: "渡辺" },
  { age: 80, name: "中村" },
];

const groupedByAge = Object.groupBy(
  listPeople,
  (item) => item.age >= 30 ? "over30" : "under30"
);

console.log(groupedByAge);
/*
{
  "over30": [
    { age: 40, name: "鈴木" },
    { age: 30, name: "田中" },
    { age: 40, name: "伊藤" },
    { age: 30, name: "渡辺" },
    { age: 80, name: "中村" }
  ],
  "under30": [
    { age: 20, name: "佐藤" },
    { age: 25, name: "山田" }
  ]
}
```

### 配列に含まれているかを調べる

#### 含まれているかを調べる

配列の`includes()`メソッドを使うことで、該当要素が含まれているかどうかを調べられます。

```
const list1 = ["A", "C", "B"];
const target = "C"; // 条件とする値
const isHit = list1.includes(target);

console.log(isHit); // true
```

#### 要素が1つでも条件に合致するかを調べる

配列の`some()`メソッドを使うことで、該当要素が含まれているかどうかを調べられます。`includes()`メソッドは配列内の要素自体が等価であるかを調べるのに対して、`some()`メソッドは配列要素の内部フィールドの検証にも利用できます。以下の例では、オブジェクトを含む配列に対して、都道府県名が一致する要素を調べています。

```
const list1 = [
  {id: 2, label: "青森県"},
  {id: 3, label: "秋田県"},
  {id: 1, label: "北海道"},
];
const target = "秋田県"; // 条件とする値
const isHit = list1.some(item => item.label === target)

console.log(isHit); // true
```

#### すべて条件に合致するかを調べる

配列の`every()`メソッドを使うと、すべての要素が条件に満たすかどうかを調べられます。`some()`メソッドは**どれかひとつでも条件を満たす**かのチェックであるのに対して、`every()`メソッドは**すべて条件を満たすか**を調べます。

```
const list1 = [
  {label: "青森県", area: "東北地方"},
  {label: "秋田県", area: "東北地方"},
  {label: "岩手県", area: "東北地方"},
];
const target = "東北地方"; // 条件とする値
const isEvery = list1.every(item => item.area === target);

console.log(isEvery); // true 配列のすべての要素は「東北地方」である
```

#### 条件に合致する要素を調べる

配列の`find()`メソッドを使うと条件に一致する要素を見つけられます。以下の例だと、`id`値を比較することで該当の要素を調べています。

```
const list1 = [
  {id: 2, label: "青森県"},
  {id: 3, label: "秋田県"},
  {id: 1, label: "北海道"},
];
const targetId = 3; // 条件とする値
const item = list1.find(item => item.id === targetId);

console.log(item); // {id: 3, label: "秋田県"}
```

`find()`メソッドは配列の先頭から調べていき、配列の先頭に近い要素が戻り値になります。もし、配列の最後から検索したければ、`findLast()`メソッドを利用します。

```
const list = [500, 20, 200, 300, 50, 150];

// 最初から順番に、条件にあう要素を検索
const item1 = list.find(item => item < 100); 
console.log(item1); // 20

// 最後から順番に、条件にあう要素を検索
const item2 = list.findLast(item => item < 100); 
console.log(item2); // 50
```

### 重複を調べる

#### 重複を除いた配列を得る

```
// 要素の重複した配列
const list1 = [1, 2, 3, 1, 2, 3, 4];

// 重複を除去
const list2 = Array.from(new Set(list1));

console.log(list1); // [1, 2, 3, 1, 2, 3, 4]  元の配列 
console.log(list2); // [1, 2, 3, 4] 重複した要素が除去されている
```

#### 2つの配列で重複する要素を検出

2つの配列から重複する要素を調べるには以下のように記載します。

```
// 要素の重複した配列
const list1 = [1, 2, 3];
const list2 = [1, 3, 4];

// 重複した要素を調べる
const list3 = list1.filter(item => list2.includes(item));

console.log(list3); // [1, 3]。2つの配列にどちらも存在する要素
```

もし、それぞれの配列に同じ値が重複して存在する場合は、配列内の重複を除去してから調べます。

```
// 要素の重複した配列
const list1 = [1, 2, 3, 1, 2, 3, 4]; // 「1, 2, 3」が2度出現
const list2 = [1, 2, 1, 5, 6]; // 「1」が2度出現

// 重複した要素を調べる
const list3 = [...new Set(list1)].filter((item) => list2.includes(item));

console.log(list3); // [1, 2] 重複した要素が得られる
```

### 配列の複製

#### 配列のシャローコピー

配列を複製したい場合は、スプレッド構文`...`を使って以下のように記述するといいでしょう。数値や文字列、真偽値のみを含むような配列であれば、以下のように記述するのが簡単です。

```
const list1 = [1, 2, 3];
const list2 = [...list1];

console.log(list1); // [1, 2, 3]
console.log(list2); // [1, 2, 3]
console.log(list1 === list2); // false （別の配列オブジェクトである）
```

この方法だと、配列のコピーは「シャローコピー」となります。シャローコピーとは、コピーがコピー元のオブジェクトとプロパティー参照を共有することを指します。以下の例だと`list1[0].property`と`list2[0].property`は同じ参照を指します。

```
const list1 = [
  {id: 1, label: "北海道", property: {hasSea: true}},
  {id: 2, label: "青森県", property: {hasSea: true}},
  {id: 3, label: "秋田県", property: {hasSea: true}},
];

const list2 = [...list1];

// 以下の結果はtrueである。シャローコピーであるため、オブジェクトは複製されたわけではない。
console.log(list1[0].property === list2[0].property); // true
```

#### 配列のディープコピー

配列を完全に複製したい場合は、`structuredClone()`メソッドを利用します。`structuredClone()`メソッドはディープコピーを実現する関数です。

```
const list1 = [
  {id: 1, label: "北海道", property: {hasSea: true}},
  {id: 2, label: "青森県", property: {hasSea: true}},
  {id: 3, label: "秋田県", property: {hasSea: true}},
];
const list2 = structuredClone(list1);

// 以下の結果はfalseである。ディープコピーであるため、オブジェクトは別物になっている
console.log(list1[0].property === list2[0].property); // false
```

`structuredClone()`メソッドは配列だけでなくオブジェクト型にも利用できます。少し古い解説記事だと`JSON.parse(JSON.stringify())`を使ってディープコピーを紹介されていることがあります。

### 要素が1つでも条件に合致するかを調べる

ここからは少し複雑な操作を考えます。

ユーザー検索システムを作ることを考えてみましょう。サーバーからは次の配列データが返ってくるとします。

```
const dataList = [
  { id: 1, name: "鈴木" },
  { id: 2, name: "田中" },
  { id: 3, name: "ゴンザレス" }
];
```

こちらの配列データを用いて、「IDが`5`のデータがなければログを出力する」という処理を作るにはどうしたらよいでしょうか？

冗長な記述は次の通り。対象のIDが見つかったかどうかを`isFound`にて管理し、`for`文で`dataList`の各要素を参照しています。

👎 冗長な記述

```
let isFound = false;

for (const data of dataList) {
  if (data.id === 5) {
    isFound = true;
    break;
  }
}

if (isFound === false) {
  console.log("IDが5のデータはありません");
}
```

このようなケースでは`some()`関数を使うとよいでしょう。

`some()`関数は、配列内の要素で1つでも条件に合致するものがあれば`true`を返します。逆に言えば、1つも条件に合致しなければ`false`が返ります。

👍 簡潔な記述

```
const isFound = dataList.some(data => data.id === 5);

if (isFound === false) {
  console.log("IDが5のデータはありません");
}
```

▼ 実行結果

![some()メソッドの実行結果](https://ics.media/entry/200825/images/images/200825_some.png)

似た関数として、配列内のすべての要素が条件に合致するかを調べる`every()`関数というものもあります。

```
const isNoValid = dataList.every(data => data.id !== 5);

if (isNoValid === true) {
  console.log("IDが5のデータはありません");
}
```

■ `配列.some()`

-   意味：配列内の要素で1つでも条件に合致するものがあるかどうか？
-   戻り値：真偽値

■ `配列.every()`

-   意味：配列内のすべての要素が、条件に合致するかどうか？
-   戻り値：真偽値

#### コラム：厳密なif文評価

上記のコードで補足ですが、真偽値の判定文を`if (isFound === false)`として記載しているのは厳格に判定するためです。`if (!isFound)`でも同じ結果が得られますが、特定のケースで誤判定の可能性があるため、ICSでは`===`を利用して、厳密に判定するよう意識しています。

たとえば、以下のようなコードがあったとします（`null`は`undefined`でも考えは同じです）。`someValue`が`null`の場合を除外したいという意図のコードです。このコードには問題があり、もし`someValue`が`0`の場合も条件文に合致します。数値の`0`や空文字列`""`を条件文で誤判定させないために、`if()`文の条件式は省略しないほうが望ましいです。

型を表現するためにTypeScriptで説明しますが、JavaScriptでも考え方は同じです。

```
const someValue: number | null = getValue(); // 数値かnull
if(!someValue){
  console.log("対象外の処理"); // この判定方法だと数値の 0 が通過してしまう
}
```

また、`null`と`undefined`の評価については`!= null`で評価します。この評価方法が適切であることは記事『[JavaScript の undefined と null を完全に理解する](http://nmi.jp/2022-10-17-Understanding-Undefined-And-Null)』が参考になります。

```
const someValue: string | null | undefined = getValue(); // 文字列かnullかundefined
if(someValue != null){
  console.log("nullかundefinedか"); // 空文字は通過してこない
}
```

### 多次元の配列（ジャグ配列）を1次元にする

次のような配列データがあるとします。この配列から、`hash_tags`の要素だけを集めた1次元の配列を作るにはどうしたらよいでしょうか？

```
const dataList = [
  {
    tweet: "今日は朝から仕事で大変だなあ",
    hash_tags: ["出勤", "早起き", "イマソラ"]
  },
  {
    tweet: "ランチで焼き肉を食べてしまった",
    hash_tags: ["ランチ", "焼き肉"]
  },
  {
    tweet: "家に帰って新作のゲームをしよう！",
    hash_tags: ["帰宅", "ゲーム", "日常"]
  }
];
```

冗長な記述は次のとおりです。`dataList`の配列をループさせた後、さらに各要素にある配列`hash_tags`についてループしています。

👎 冗長な記述

```
const tagList = [];
dataList.forEach(data => {
  data.hash_tags.forEach(tag => {
    tagList.push(tag);
  });
});

console.log(tagList);
```

配列の多階層を解除し、別の配列に置き換えたいので、`flatMap()`メソッドを使うとよいでしょう。`flatMap()`メソッドは、`map()`メソッドの後に「`flat()`メソッド」を実行します。`flat()`メソッドとは、多次元の配列（ジャグ配列とも呼びます）を1次元にする（フラット化する）ためのメソッドです。

👍 簡潔な記述

```
const tagList = dataList.flatMap(data => data.hash_tags);

console.log(tagList);
```

▼ 実行結果

![flatMap()メソッドの実行結果](https://ics.media/entry/200825/images/images/200825_array_flat.png)

■ `配列.flat()`

-   意味：配列をフラット化する。引数でフラット化する配列の深さを指定でき、初期値は`1`
-   戻り値：配列

■ `配列.flatMap()`

-   意味：`map()`の後に`flat()`を実行する。`flat()`の深さは`1`
-   戻り値：配列

### Object.entries()のコールバック関数の引数

`Object.entries(対象オブジェクト)`を実行すると、`[[キー1, バリュー1], [キー2, バリュー2],...]`という配列が返ります。

次のオブジェクトを例に考えてみましょう。

```
const myObject = {
  age: 18,
  name: "鈴木",
  address: "福岡"
};
```

オブジェクトに対して`Object.entries(対象オブジェクト)`を実行し、戻り値の配列を`forEach()`で処理をする場合、次のようなコードが考えられます。`forEach()`メソッドのコールバック関数の引数`entry`に注目してください。

👎 冗長な記述

```
Object.entries(myObject)
  .forEach(entry => {
    console.log(`キー: ${entry[0]}`);
    console.log(`バリュー: ${entry[1]}`);
  });
```

`entry[0]`、`entry[1]`というアクセスの仕方は冗長です。どちらがキーで、どちらがバリューなのかが瞬時に判断できません。「配列の分割代入」を使ってコードを簡潔にしましょう。次のA, Bが同じ意味であることに注目します。

```
// A
const entry = [キー, 値];
// B
const [key, value] = [キー, 値];
```

前述の各値について処理を、配列の分割代入を用いて書き換えると次のようになります。`entry[0]`、`entry[1]`でアクセスするよりも、簡潔で直感的な処理となりました。

👍 簡潔な記述

```
Object.entries(myObject)
  .forEach(([key, value]) => {
    console.log(`キー: ${key}`);
    console.log(`バリュー: ${value}`);
  });
```

▼ 実行結果

![Object.entries()と分割代入](https://ics.media/entry/200825/images/images/200825_object_entries.png)

### document.querySelectorAll()をArray.from()で不用意に囲むべからず

`document.querySelectorAll()`は引数のセレクターに合致した要素を返すメソッドです。戻り値の型は[`NodeList`](https://developer.mozilla.org/ja/docs/Web/API/NodeList)です。

返された各要素に対して`forEach()`で処理をしたい場合、`Array.from()`で囲むコードをなぜかよく見かけます。

👎 冗長な記述

```
Array.from(document.querySelectorAll(".foo"))
  .forEach((element) => {
    element.addEventListener("click", () => {
      console.log("クリックされました");
    });
});
```

`document.querySelectorAll()`の戻り値の`NodeList`には`forEach()`メソッドがあるので、わざわざ`Array.from()`を使う必要はありません。次の処理で充分です。

👍 簡潔な記述

```
document.querySelectorAll(".foo")
  .forEach((element) => {
    element.addEventListener("click", () => {
      console.log("クリックされました");
    });
});
```

`Array.from()`を使うのは、`map()`や`every()`や`filter()`などの配列用のメソッドを使いたいケースです。

次の関数は、チェックボックス用`input`要素がすべてチェックされているかを調べる関数です。配列用の`every()`を使いたいので、`Array.from()`を用いています。

```
const checkedAll = () =>
  Array.from(document.querySelectorAll(`input[type="checkbox"]`)).every(
    (element) => element.checked
  );
```

`Array.from()`の代わりにスプレッド構文を用いることもできます。

```
const checkedAll = () =>
  [...document.querySelectorAll(`input[type="checkbox"]`)].every(
    (element) => element.checked
  );
```

### まとめ：配列回りの処理をスッキリさせて簡潔なコードを書こう

配列操作はフロントエンド開発では頻出します。簡潔でバグが発生しづらい処理にすることは、チーム全体の開発効率の向上に繋がります。

元の配列を壊さない書き方は実行性能にわずかなオーバーヘッドが発生しますが、多くの場面で気になるようなインパクトのある負荷ではありません。記事『[ECMAScript 2015+の構文でJSの実行性能は変化するのか](https://ics.media/entry/17247/)』で検証しているように、我々は実行性能をシビアに意識していますが、イミュータブルな操作が性能上のリスクにつながることはほとんどありません。

JavaScriptには次々と新しい処理が生まれています。次の記事もあわせて参照ください。

-   [JavaScriptの次の仕様ES2022の新機能まとめ](https://ics.media/entry/220610/)
-   [JavaScriptのモダンな書き方 - ES2020のオプショナルチェーン、null合体演算子、動的import、globalThis等を解説](https://ics.media/entry/200128/)
-   [JavaScriptのモダンな書き方 - ES2017〜ES2018のawait・async, includes(), padStart()等を解説](https://ics.media/entry/17262/)

※この記事が公開されたのは**5年前**ですが、**9か月前の2025年4月**に内容をメンテナンスしています。