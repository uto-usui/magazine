---
title: "JavaScriptでJSDocコメントを書くメリットとは"
source: "https://ics.media/entry/6789/"
publishedDate: "2015-05-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

皆さんはJavaScriptでのJSDocコメントを利用していますか？　[JSDoc](https://jsdoc.app/)コメントとは関数や変数の宣言の直前に`/** ◯◯ */`を書く記法のことです。自由なフォーマットでコメントを書くよりもルールに沿ったコメントを書くことで、プログラムの可読性が高まります。本記事ではJSDocコメントの使い方と導入のメリットを説明してきます。

### JSDocコメントの書き方

JSDocコメントは関数や変数の宣言の直前に記載します。先頭のアスタリスクを2つ記載し`/** ◯◯ */`とし、型情報等を`@type`や`@param`というキーワードとともに記述します。

```
/**
 * スマートフォンのアクセスであるかを示す真偽値です。
 * @type {boolean}
 */
const isSmartphoneAccess = true;

/**
 * ページの一番上までスクロールします。
 * @param {number} duration スクロール時間のミリ秒です。
 */
function moveTop(duration) {
  // anything...
}
```

この仕組みは他の言語でも存在し、Java言語だと[Javadoc](http://ja.wikipedia.org/wiki/Javadoc)、ActionScript 3.0だと[ASDoc](http://help.adobe.com/en_US/flex/using/WSd0ded3821e0d52fe1e63e3d11c2f44bb7b-7fef.html)が知られています。JavaScriptのコーディング規約「[Google JavaScript スタイルガイド - 日本語訳](http://www38.atwiki.jp/aias-jsstyleguide2/pages/14.html)」でも、「**すべてのファイル、クラス、メソッド、プロパティにJSDocコメントが、適切なタグとデータ型を伴って記されるべきです**」と推奨されています。

### JSDocコメントのメリット① コードヒント/コード補完の表示

JSDocコメントはコード入力時にツールチップでコードヒントが表示されます。関数のコメントが表示されるため、関数の命令の内容を確認しながら安心してコードを書くことができます。次の動画のようにWebStormでは、プログラムのコードヒントの表示や補完入力の手助けとなっています。

![](https://ics.media/entry/6789/images/150525_codehint_movie.gif)

ただし、どのエディターでもJSDocコメントに対応しているわけではありません。各種エディターのJSDocコメントの充実度を表にまとめました。

ソフト名

JSDocコメント

コード補完有無

VS Code

ヒント表示あり

コード補完あり

WebStorm

ヒント表示あり

コード補完あり

Brackets

ヒント表示一応あり

コード補完あり

Sublime Text

ヒント表示なし

コード補完あり

Atom

ヒント表示なし

コード補完なし

筆者が試したところ、開発環境として[WebStorm](https://www.jetbrains.com/webstorm/)や[VS Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)がとくに優れており、ツールチップにJSDocコメントの情報がすべて表示されました。

ちなみに[React](https://react.dev/)や[Angular](https://angular.io/)などのメジャーなJSライブラリにおいても、そのソースコードではJSDocコメントが使われています (例 : [Angular](https://github.com/angular/angular/blob/main/packages/core/src/render/api.ts)、[React](https://github.com/facebook/react))。APIが多岐に渡るJSライブラリを利用するとき、わざわざリファレンスをブラウザで開いたり解説書で調べることなく、コード上で関数の仕様を確認できます。

![](https://ics.media/entry/6789/images/150525_createjs_codehint.png)

▲描画ライブラリCreateJSのAPIを表示したもの

### JSDocコメントのメリット② APIリファレンスの生成

[TypeDoc](https://typedoc.org/)等のツールを使うことでコードのリファレンスドキュメントを作成できます。こういったJSライブラリのリファレンスはみなさんも一度は見たことがあるのではないでしょうか。

ウェブサイト案件のソースコードでAPIリファレンスを作成すると、運用保守で役立つことでしょう。

![](https://ics.media/entry/6789/images/150525_javascript_api_references.png)

### JSDocコメントのサンプル

JSDocコメントを使わずに書かれたJavaScriptを、JSDocコメント有りのJavaScriptと見比べてみましょう。まずはシンプルなコメントのコードです。

```
// カウントを管理するオブジェクトです。
class CountManager {
  constructor() {
    // カウントの数値です。
    this._count = 0;
  }

  // カウントの数値をインクリメントします。
  addCount() {
    this._count++;
  }

  // カウントの数値を取得します。
  getCount() {
    return this._count;
  }
}

const cm = new CountManager();
const item = cm.getCount();
```

このコードだと、該当関数にマウスでホバーしても、あまりコードヒントが表示されません。

![](https://ics.media/entry/6789/images/220311_jsdoc_annotation_before.png)

これをJSDocコメントとして書いてみます。`// ◯◯`として記載していたコメントを`/** ◯◯ */`の記法に変更し、引数の型なども含めて細かく指定します。

```
/** カウントを管理するオブジェクトです。 */
class CountManager {
  constructor() {
    /**
     * カウントの数値です。
     * @type {number}
     */
    this._count = 0;
  }

  /** カウントの数値をインクリメントします。 */
  addCount() {
    this._count++;
  }

  /**
   * カウントの数値を取得します。
   * @return {number} カウントの数値
   */
  getCount() {
    return this._count;
  }
}

const cm = new CountManager();
const item = cm.getCount();
```

JSDocコメントを書いたので、マウスホバー時にコードの説明が丁寧に表示できるようになりました。

![](https://ics.media/entry/6789/images/220311_jsdoc_annotation_after.png)

### TypeScriptで型までJSDocコメントに記述する必要があるか

JSDocコメントには`{string}`や`{number}`などで型を記載できます。JavaScriptの場合は、型を追跡できる手がかりはJSDocコメントしかないので記載することが望ましいです。

```
/**
 * Helloを付与する関数です。
 * @param {string} message メッセージ
 * @return {string} 加工された文字列
 */
function sayHello(message) {
  return `Hello ${message}`;
}
```

たいして、TypeScriptでは型注釈（アノテーション）によって、言語文法として型情報を記載できます。そのため、わざわざJSDocコメントに型情報を記述する必要はありません。

```
/**
 * Helloを付与する関数です。
 * @param message メッセージ
 * @return 加工された文字列
 */
function sayHello(message: string): string {
  return `Hello ${message}`;
}
```

### 代表的なJSDocコメント

現場でつかうJSDocコメントの種類は多くありません。可能な限り覚えてしまって、コードの可読性向上に役立てましょう。代表的なものを紹介します。

#### @param

関数の引数を示す`@param`。関数の引数が何を指すのか明確にできます。複数の引数が存在する場合は、引数の個数だけ`@param`を順番に記載します。

```
/**
 * DOM要素を移動させます。
 * @param {HTMLElement} element DOM要素です。
 * @param {number} duration 移動時間（単位：ミリ秒）です。
 * @param {string} direction 方向を指定します。
 */
function moveTo(element,　duration, direction) {
  // anything...
}
```

```
/**
 * DOM要素を移動させます。
 * @param element DOM要素です。
 * @param duration 移動時間（単位：ミリ秒）です。
 * @param direction 方向を指定します。
 */
function moveTop(element: HTMLElement, duration: number, direction: string) {
  // anything...
}
```

-   参照：[Use JSDoc: @param](https://jsdoc.app/tags-param.html)

#### @return / @returns

関数の戻り値を示す`@return`。`@returns`は`@return`の別名。関数の戻り値が何を指すのか明確にできます。次の例では時間を返却する関数として定義していますが、単位が不明瞭であるためJSDocの`@return`のコメントで「ミリ秒」であることを明確にしています。

```
/**
 * @return {number} 経過時間（単位：ミリ秒）を返します。
 */
function getTime() {
  const time = Date.now() - oldTime;
  return time;
}
```

```
/**
 * @return 経過時間（単位：ミリ秒）を返します。
 */
function getTime(): number {
  const time = Date.now() - oldTime;
  return time;
}
```

-   参照：[Use JSDoc: @returns](https://jsdoc.app/tags-returns.html)

#### @type

変数の型を示す`@type`。JavaScriptではTypeScriptのような型注釈がつかえないので、純粋なJavaScriptを使うときは積極的に利用するといいでしょう。型はブラケット`{}`のなかに記載します。

```
/**
 * メッセージです。
 * @type {string}
 */
const messsage = "こんにちは";

/**
 * 数値の型の例です。
 * @type {number}
 */
let count = 0;

/**
 * 配列の型の例です。
 * @type {number[]}
 */
const list = [];

/**
 * オブジェクトの型の例です。
 * @type {{name: string, age: number}}
 */
const obj = { name: "タナカ", age: 24 };
```

-   参照：[Use JSDoc: @type](https://jsdoc.app/tags-type.html)

#### @deprecated

非推奨であることを示す`@deprecated`。APIの変更や、利用してほしくない関数に書いておくといいでしょう。

```
/** 
* @deprecated
*/
function hello() {
  // 省略
}
```

▼非推奨のものには取り消し線があらわれ、エディター上でわかりやすくなります。

![](https://ics.media/entry/6789/images/images/220311_jsdoc_deprecated.png)

-   参照：[Use JSDoc: @deprecated](https://jsdoc.app/tags-deprecated.html)

#### @see

他のオブジェクトや資料を示す`@see`。あわせて見て欲しいものは`@see`で示すといいでしょう。

```
/** 
* @see https://ics.media/entry/6789/
*/
function hello() {
  // 省略
}
```

-   参照：[Use JSDoc: @see](https://jsdoc.app/tags-see.html)

#### @author

作者の名前を記載する`@author`。開発者の責任範囲を示すときに役立ちます。Gitの履歴（Blame）でも確認できそうですが、作業分担するときに使ってもいいでしょう。

```
/** 
 * @author IKEDA Yasunobu
 */
function hello() {
  // 省略
}
```

-   参照：[Use JSDoc: @author](https://jsdoc.app/tags-author.html)

#### @function

メソッドの定義であることを示す`@function`（`@func`と`@method`と同じです）。アロー関数式で関数をつくるときに指定します。JavaScriptだと`const`宣言で関数をつくると、[jsdoc](https://jsdoc.app/)でAPIドキュメントを作るときに**関数であること**が認識されません。アロー関数式で関数を作る場合は、`@function`で指定するようにしましょう。

```
/**
 * YYYY年MM月DD日の形式に変換します。
 *
 * @function
 * @param date {Date} Dateオブジェクト
 * @return {string} YYYY年MM月DD日の形式
 */
export const toLocaleDate = (date) =>
  `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
```

`function`関数宣言であれば、[jsdoc](https://jsdoc.app/)で関数として認識するので、`@function`は要りません。

```
/**
 * YYYY年MM月DD日の形式に変換します。
 *
 * @param date {Date} Dateオブジェクト
 * @return {string} YYYY年MM月DD日の形式
 */
export function toLocaleDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
```

-   参照」： [Use JSDoc: @function](https://jsdoc.app/tags-function.html)

### まとめ

**弊社では数万行〜数十万行のコードの開発案件が多いのですが、このボリュームになるとJSDocコメントの記載は必須となります。**他の開発者が開発したJSモジュールと連携するときや、開発後の保守として数ヶ月前に記載した自分のコードを見返すときに、JSDocコメントで書かれていればクラス・メソッド・プロパティを素早く理解するのに役立ちます。

JSDocコメントのメリットは初級者から上級者まで受けられます。プロジェクトの大小問わず可能な限りJSDocコメントでコメントを書いてみてはいかがでしょうか？

続編記事『[JSDocコメントの有効活用。JavaScriptやTypeScriptのドキュメントを生成する方法](https://ics.media/entry/6819/)』ではJSDocコメントの有効な使い方として、APIドキュメントの作り方を解説しています。