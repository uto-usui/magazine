---
title: "定番のコード規約とライブラリから学ぶJavaScriptの命名テクニック（初級編）"
source: "https://ics.media/entry/220915/"
publishedDate: "2022-09-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

2022年9月15日 公開 / [株式会社ICS 北川 杏子](https://ics.media/entry/staff/kitagawa/)

プログラミングをしているとき、変数名や関数名の命名に迷ったことはないでしょうか？

時間をかけて考えた変数名や関数名を後で見返したときに何の処理なのかわからないと思ったり、他の人が書いたコードを理解するのに時間がかかった経験は誰でもあると思います。

一般に、プログラマーはコードを書いている時間より読んでいる時間の方が長いと言われています。 わかりにくい命名はコードを読んでいる時間を長くしたり、バグを生む原因になってしまいます。

この記事ではGoogleやAirbnbといった企業が採用しているスタイルガイドや、世界中で使われているJavaScriptライブラリであるReactとVue.jsのコードを調査する中で見つけた、わかりやすい命名をするためのテクニックを初級編と上級編の2回に分けて紹介します。

初級編では、実際に仕事をする中でよく目にしたり自分でも使うことの多いものなど、すぐに使えるテクニックを集めました。

### わかりにくい命名とは？

そもそもわかりにくい命名とはどのようなものなのかを考えてみましょう。

#### 1\. 省略した名前を使っている

[Node.jsのスタイルガイド](https://github.com/felixge/node-style-guide#use-lowercamelcase-for-variables-properties-and-function-names)には以下の記載があります。

> 一文字の変数や一般的でない略語は普通避けるべきです。

たとえばこのようなコードの場合、`nm`という変数は`name`の略でしょうか？　それとも`number`の略でしょうか？

```
const result = nm1 + nm2;
```

`result`に入るのは文字列の結合結果でしょうか？　足し算の結果でしょうか？

簡単なコードでも**一般的でない略語を使うと何の処理を行っているのかわかりにくくなってしまいます。**

#### 2\. 名前から読み取れる以上の意図が隠されている

[Airbnbのスタイルガイド](https://github.com/airbnb/javascript#naming-conventions)には、命名について以下のように書かれています。

> 名前が説明的である（名前から意図が読み取れる）こと。

商品の情報を取得して税込金額を計算するプログラムを考えてみましょう。

```
const TAX = 0.1;
const item = await fetchItemById(itemId);
const displayPrice = item.price + (item.price * TAX);
```

`fetchItemById()`は名前から推測すると、サーバーからアイテムの情報を取得して返す関数です。

一見何の問題もなさそうなコードですが、もしこの`fetchItemById()`の中ですでに計算が行われていて`item.price`に税込金額が入っていたとしたらどうでしょう？

結果的に`displayPrice`には間違った金額が入ってしまい、このコードがバグの原因となってしまいます。

**名前から予想できる以上の処理を行ってしまうと、思わぬバグを生むことがあります。**

#### 3\. 何をしている処理なのかわからない

[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#naming-method-names)では、変数は名詞の形、メソッド名は動詞の形で書くようにと規定されています。

スライダーを使用したWebサイトのコードを読んでいたと仮定して、この関数が何を行っているか想像できるでしょうか？

```
slider();
```

この関数名には動詞がないため、スライダーをどうする処理なのかが名前だけでは判断できません。

このような関数がいくつもある場合、どこで何の処理がされているかわからず、**目的のコードにたどり着くのに時間がかかってしまいます。**

### わかりやすい命名をするために

まずはJavaScriptで共通認識となっているルールを確認しましょう。

参考：[『Node.jsのスタイルガイド』](https://github.com/felixge/node-style-guide#use-lowercamelcase-for-variables-properties-and-function-names)

#### 変数、関数、クラス構文のメソッド、プロパティ名

これらはローワーキャメルケースで記載します。 ローワーキャメルケースとは、`familyName`のように**先頭が小文字でその後につなげる単語の頭文字を大文字にする**記法です。

```
// 変数名はローワーキャメルケース
const familyName = "田中";

// 関数名はローワーキャメルケース
const multiplyNumbers = (number1, number2) => {
  return number1 * number2;
};
```

#### クラス名

クラス名はアッパーキャメルケース（パスカルケース）で記載します。 アッパーキャメルケースとは、`SalesPerson`のように**先頭が大文字でその後につなげる単語の頭文字を大文字にする**記法です。

```
// クラス名はアッパーキャメルケース
class SalesPerson {
  constructor(familyName, givenName) {
    this.familyName = familyName;
    this.givenName = givenName;
  }

  // クラスのメソッド名はローワーキャメルケース
  getFullName() {
    // クラスのプロパティ名（familyNameやgivenName）はローワーキャメルケース
    return `${this.familyName}${this.givenName}`;
  }
}
```

#### 定数名

定数は大文字のスネークケースで記載します。 スネークケースとは、`LIMIT_PER_REQUEST`のように**単語と単語をアンダースコアで繋げた記法です。**

※ここでの定数とは単に`const`で宣言した変数のことではなく、ハードコーディング（固定値をそのままコードに書いてしまうこと）を避けるためや、プログラムの中で繰り返し使用される値を格納するために宣言される、特別な意味を持った値のことです。

```
// 定数名は大文字のスネークケース
const LIMIT_PER_REQUEST = 100;
```

共通のルールが確認できたところで、わかりやすい命名をするためのテクニックを見ていきましょう。

#### 1\. 動詞の変化で状態を伝える

動詞を変化させることで、オブジェクトの状態やステータスを簡潔に表現できます。

説明

例

過去分詞

〜された状態  
〜済み

selected: 選択された  
warned: 警告済み

現在分詞

〜している状態  
〜中

waiting: 待機している  
pending: 保留中

▼選択された数字を画面に表示するデモ

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/220912_naming_beginner/selected.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220912_naming_beginner/blob/main/docs/selected.html)

このデモでは選択された数字のことを`selectedNumber`と命名しています。

```
// ボタンを選択した時のイベント
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 選択された数字で更新する
    const selectedNumber = button.innerText;
    favoriteNumberText.innerText = selectedNumber;
  });
});
```

#### 2\. 可能性を表現する

「〜できるかどうか？」や「〜の状態であるかどうか？」は以下のような接頭辞、接尾辞をつけることで表現できます。

これらがついている変数や関数は`true`か`false`が返ってくることが期待値となります。

説明

例

is

〜であるか

isValid: 有効か  
isWhiteSpace: 空文字か

can

〜できるか

canMove: 動かせるか

should

〜するべきか

shouldCache: キャッシュするべきか

has

〜を持っているか

hasOwnProperty: 〜というプロパティを持っているか

exists

〜が存在するか

pathExists: パスが存在するか

以下のようなバリデーション関数の命名などに便利なテクニックです。

```
/**
 * 引数で渡された数字が負の数字であるかどうかを返します。
 */
const isNegative = (number) => {
  return number < 0;
};

const favoriteNumber = 7;
if (isNegative(favoriteNumber)) {
  console.log("あなたの好きな数字は負の数字です。");
} else {
  console.log("あなたの好きな数字は正の数字です。");
}
```

#### 3\. 現在の / 前回の / 次の

カルーセルやページングなど、順番があるもの（名詞）に対して「前の」「次の」と表現したいときに使えます。

説明

例

current

現在の

currentValue: 現在の値  
currentPage: 現在のページ

previous

前回の

previousValue: 前回の値  
previousPage: 前のページ

next

次の

nextValue: 次の値  
nextPage: 次のページ

```
const goToPreviousPage = () => {
  // 前のページに移動するための処理
};

const goToNextPage = () => {
  // 次のページに移動するための処理
};
```

#### 4\. 〜の前に / 〜の後に

`before`や`after`は「〜の前に〜する」「〜の後に〜する」といったように、アクションや時間軸に対して前後を表現したいときに使う表現です。

説明

例

before

〜の前に

beforeCreate: 作る前に  
insertBefore: 〜の前に挿入する

after

〜の後に

afterLeave: 離れた後に  
insertAfter: 〜の後に挿入する

```
/**
 * 処理をやめる前に警告します。
 */
const warnBeforeStop = () => {
  window.confirm("本当に処理をやめますか？");
};
```

#### 5\. 最新の / 最後の / 最初の

ニュースやブログなど、時系列になっているものを表現するときに便利な表現です。 `last`や`first`は配列の先頭や最後を取り出した時などにも使えます。

説明

例

latest

最新の

latestEntry: 最新のエントリー

last

最後の

lastComponent: 最後のコンポーネント

first

最初の

firstComponent: 最初のコンポーネント

```
// 配列の最後の要素
const last = entryList[entryList.length - 1];
```

#### 6\. 関係性を表現する

階層構造になっているHTMLや、コンテンツの関係性を表現したいときに使える表現です。

説明

例

parent

親の  
1階層上の

parentData: 親のデータ

child

子どもの  
1階層下の

childValue: 子どもの値

sibling

兄弟の  
同階層の

nextSibling: 次の兄弟要素

ancestor

祖先の  
2階層以上上の

isAncestor: 祖先かどうか

descendant

子孫の  
2階層以上下の

isDescendant: 子孫かどうか

related

関係のある

relatedTarget: 関係のある対象

```
<div class="parent">親要素
  <div class="myself">自分
    <div class="child">子ども</div>
    <div class="child">子ども</div>
  </div>
</div>
```

上記のような構造のHTMLをJavaScriptで取得する場合、構造に注目すると`parent`や`children`のように命名できます。

```
const myself = document.querySelector(".myself");

// 1階層上の要素
const parent = myself.closest(".parent");

// 1階層下の要素
const children = myself.querySelectorAll(".child");
```

#### 7\. 複数形で配列を表現する

配列は複数形で表現できます。`◯◯List`のように表現することもありますが、どちらが間違いというよりは好みの問題のようです。 ReactやVueでは複数形で表現されていることが多いようでした。

配列から取り出した一つひとつのオブジェクトは単数形で表現します。

```
// 画面から取得したボタン（複数）
const buttons = document.querySelectorAll(".submitButton");

// forEachで一つずつ取り出したものは単数形
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // ボタンを押下した時のイベント処理
  });
});
```

#### 8\. 別の形に変化させる

数字を文字列に変換するときに使う`toString()`メソッドのように、何かに変換するときには`to◯◯`という命名ができます。

郵便番号をハイフン付きの形に変化するような関数は`toHyphenatedCode`と命名できます。

```
/**
 * 郵便番号(7桁の文字列)を"-"で区切った文字列に変換します。
 * @param code {string} 郵便番号(7桁の文字列)
 */
const toHyphenatedCode = (code) => {
  return `${code.slice(0, 3)}-${code.slice(3)}`;
};
```

#### 9\. 初期化する、初期値を設定する

`init`は`initialize`の略で、プログラミングをしているとよく出てくる表現です。

説明

例

init

初期化する

initData: データを初期化する

initial

初期の

initialContext: 初期のコンテキスト

以下の`SalesPerson`クラスには`initTask()`というメソッドがあり、呼び出すと`task`プロパティに初期値が設定されます。

```
class SalesPerson {
  constructor(familyName, givenName) {
    this.familyName = familyName;
    this.givenName = givenName;
    this.initTask();
  }

  /**
   * タスクを初期化します。
   */
  initTask() {
    this.task = ["自己紹介する", "商品の説明をする"];
  }
}
```

### まとめ

初級編では、わかりやすい命名の重要性や命名におけるルール、実際によく使われているテクニックを紹介しました。 次回の[上級編](https://ics.media/entry/220929/)では、さらに複雑な処理をしたいときに役立つ命名テクニックを紹介します。

### 参考サイト

-   [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
-   [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
-   [Node.js Style Guide](https://github.com/felixge/node-style-guide)
-   [React - GitHub](https://github.com/facebook/react)
-   [Vue.js - GitHub](https://github.com/vuejs/vue)
-   [A Guide for Naming Things in Programming | by Varun Pujari | Level Up Coding](https://levelup.gitconnected.com/a-guide-for-naming-things-in-programming-2dc2d74879f8)
-   [プログラミングでよく使う英単語のまとめ【随時更新】 - Qiita](https://qiita.com/Ted-HM/items/7dde25dcffae4cdc7923)