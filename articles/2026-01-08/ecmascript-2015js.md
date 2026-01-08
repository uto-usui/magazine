---
title: "ECMAScript 2015+の構文でJSの実行性能は変化するのか"
source: "https://ics.media/entry/17247/"
publishedDate: "2018-02-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

ECMAScriptの改訂により、JavaScriptはよりシンプルな構文や、より厳密な構文が書けるようになってきています。以前、ES2015+相当のJavaScriptはES5相当へ変換したほうが実行速度が良くなるという話がありました（参照「[2017-02-14のJS - JSer.info](https://jser.info/2017/02/14/v8-5.7es2015-npm-typescript/)」)。JavaScriptプログラマーとしてはどのような書き方が最適なのか気になります。そこで、Chrome・Safari・Firefox Quantum・Edgeで、ECMAScriptの構文を一部ピックアップして実行速度を調べてみました。

### パフォーマンスの計測方法

検証を行いたい構文を使ったコードを100万回実行・計測する関数を用意し、用意した関数を10回ずつ実行しています。

はじめに、for文を空の状態で実行するコードを用意しました。計測結果がミリ秒以下になる時があるため、さらなる精度で計測できる`console.time()`関数を使用しています。

for文を空で回した場合の結果としては、Chrome・Safariでは1回目に実行時間が大きくかかり、それ以降は高速に、Firefox・Edgeでは1・2回目に実行時間がかかり、それ以降高速になっています。これは[JITコンパイラー](https://ja.wikipedia.org/wiki/%E5%AE%9F%E8%A1%8C%E6%99%82%E3%82%B3%E3%83%B3%E3%83%91%E3%82%A4%E3%83%A9)が複数回の関数の呼び出し後にコンパイルを行い高速に実行できるようになっているためです。

-   [計測結果：空のfor文](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ86pOgS3sFKp1_MTWPG7rUGCkPfZPgqDQ6dn7FtwHHu34-026phewte59A--89umL_G3xiDJiX63An/pubhtml?gid=1643106773&single=true)
-   [ソースコード](https://github.com/ics-creative/180207_javascript_performance/blob/master/src/emptyLoop.js)

#### for文を100万回実行する

```
// forループの回数
const MAX_COUNT = 1000000;

// 計測
console.time("empty");

for (let i = 0; i < MAX_COUNT; i++) {}

console.timeEnd("empty");
```

### 変数の定義方法が変わることでパフォーマンスは変わるのか

テンプレートリテラルを使用して文字列の結合の速度を計測します。その上で変数の定義方法を「`var`」「`let`」「`const`」と変えて、パフォーマンスが変わるかどうかを調べました。

結果としては、Safariでは`var`が`const`と`let`に比べ1.3-2倍程度早く、Edgeでは`const`が最速でした。Chrome・Firefoxではどの定義方法でも大きく変わりませんでした。

-   [計測結果：変数・定数の使用](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ86pOgS3sFKp1_MTWPG7rUGCkPfZPgqDQ6dn7FtwHHu34-026phewte59A--89umL_G3xiDJiX63An/pubhtml?gid=877095955&single=true)
-   [ソースコード](https://github.com/ics-creative/180207_javascript_performance/blob/master/src/declaration.js)

#### varを使用する

```
for (let i = 0; i < MAX_COUNT; i++) {
  var a = "a";
  var b = "b";
  var c = "c";
  var d = "d";
  `${a}_${b}_${c}_${d}`;
}
```

#### letを使用する

```
for (let i = 0; i < MAX_COUNT; i++) {
  let a = "a";
  let b = "b";
  let c = "c";
  let d = "d";
  `${a}_${b}_${c}_${d}`;
}
```

#### constを使用する

```
for (let i = 0; i < MAX_COUNT; i++) {
  const a = "a";
  const b = "b";
  const c = "c";
  const d = "d";

  `${a}_${b}_${c}_${d}`;
}
```

### 文字列を結合するパターン

文字列を結合するときに、「プラス演算子」「テンプレートリテラル」を使った場合で速度に違いがあるのか計測しました。

結果としては、Firefox・Edgeではプラス演算子がテンプレートリテラルを使う場合より早くなりました。Chrome・Safariでは、プラス演算子の場合もテンプレートリテラルを使う場合も変わりがありませんでした。

-   [計測結果：文字列の結合](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ86pOgS3sFKp1_MTWPG7rUGCkPfZPgqDQ6dn7FtwHHu34-026phewte59A--89umL_G3xiDJiX63An/pubhtml?gid=1753093645&single=true)
-   [ソースコード](https://github.com/ics-creative/180207_javascript_performance/blob/master/src/joinString.js)

#### プラス演算子を使って文字列を結合する

```
for (let i = 0; i < MAX_COUNT; i++) {
  const a = "a";
  const b = "b";
  const c = "c";
  const d = "d";
  const e = "e";
  const f = "f";

  a + "_" + b + "_" + c + "_" + d + "_" + e + "_" + f;
}
```

#### テンプレートリテラルを使って文字列を結合する

```
for (let i = 0; i < MAX_COUNT; i++) {
  const a = "a";
  const b = "b";
  const c = "c";
  const d = "d";
  const e = "e";
  const f = "f";

  `${a}_${b}_${c}_${d}_${e}_${f}`;
}
```

### プロトタイプとクラスの生成

「プロトタイプ」と「クラス」を生成するときの速度に違いがあるのか計測しました。

Chrome・Edgeでは、クラスの生成がプロトタイプの生成と比べて1.2倍ほどの時間がかかっていて、Firefox・Safariではプロトタイプ、クラスの生成で大きく変わりはありませんでした。

-   [計測結果：プロトタイプ・クラスの生成](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ86pOgS3sFKp1_MTWPG7rUGCkPfZPgqDQ6dn7FtwHHu34-026phewte59A--89umL_G3xiDJiX63An/pubhtml?gid=1880984323&single=true)
-   [ソースコード](https://github.com/ics-creative/180207_javascript_performance/blob/master/src/generateClass.js)

#### Prototypeによるオブジェクトの生成

```
// プロトタイプンも定義
function PrototypeHoge() {
  this.a = 0;
}

PrototypeHoge.prototype.hoge = function(val) {
  return val + val;
};

// 計測対象
for (let i = 0; i < MAX_COUNT; i++) {
  new PrototypeHoge();
}
```

#### クラスの生成

```
// クラスの定義
class ClassHoge {
  constructor() {
    this.a = 0;
  }

  hoge(val) {
    return val + val;
  }
}

// 計測対象
for (let i = 0; i < MAX_COUNT; i++) {
  new ClassHoge();
}
```

### べき乗を表現するパターン

べき乗の計算を行うときに、「掛け算を使う」「`Math.pow()`関数を使う」「`**`演算子を使う」場合で速度に違いがあるのか計測しました。

Edgeで`Math.pow()`関数を使用した場合は掛け算と`**`演算子を使用した場合と比べて、3-25倍以上の時間がかかりました。Chrome・Safari・Firefox ではどの構文を使用しても大きく変わりませんでした。

-   [計測結果：べき乗](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ86pOgS3sFKp1_MTWPG7rUGCkPfZPgqDQ6dn7FtwHHu34-026phewte59A--89umL_G3xiDJiX63An/pubhtml?gid=1193633856&single=true)
-   [ソースコード](https://github.com/ics-creative/180207_javascript_performance/blob/master/src/pow.js)

#### 掛け算を使う

```
for (let i = 0; i < MAX_COUNT; i++) {
  2 * 2 * 2 * 2 * 2;
}
```

#### `Math.pow()`関数を使う

```
for (let i = 0; i < MAX_COUNT; i++) {
  Math.pow(2, 5);
}
```

#### `**`演算子を使う

```
for (let i = 0; i < MAX_COUNT; i++) {
  2 ** 5;
}
```

### 関数呼び出しのパフォーマンスを計測

関数の呼び出し行うときに、「関数」「アロー関数」「アロー関数で引数のカッコを省略したとき」「プロトタイプメンバー関数」「クラスメンバー関数」で速度に違いがあるのか計測しました。

Edgeではクラスメンバー関数の呼び出しは他の呼び出し方に比べ、1.4倍ほどの時間がかかりました。Chrome・Safariではどの構文を使用しても大きく変わりませんでした。

-   [計測結果：関数の実行](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ86pOgS3sFKp1_MTWPG7rUGCkPfZPgqDQ6dn7FtwHHu34-026phewte59A--89umL_G3xiDJiX63An/pubhtml?gid=1959443634&single=true)
-   [ソースコード](https://github.com/ics-creative/180207_javascript_performance/blob/master/src/func.js)

#### 関数呼び出し

```
// 関数の定義
const callFunc1 = function(x) {
  return x + x;
};

// 計測対象
for (let i = 0; i < MAX_COUNT; i++) {
  callFunc1(0);
}
```

#### アロー関数を使って呼び出し

```
// 関数の定義
const callFunc2 = x => {
  return x + x;
};

// 計測対象
for (let i = 0; i < MAX_COUNT; i++) {
  callFunc2(0);
}
```

#### アロー関数で引数のカッコを省略して呼び出し

```
// 関数の定義
const callFunc3 = x => {
  return x + x;
};

// 計測対象
for (let i = 0; i < MAX_COUNT; i++) {
  callFunc3(0);
}
```

#### プロトタイプクラスからの関数呼び出し

```
// プロトタイプの定義・生成
function PrototypeHoge() {
  this.a = 0;
}
PrototypeHoge.prototype.hoge = function(val) {
  return val + val;
};
const prototypeHoge = new PrototypeHoge();

// 計測対象
for (let i = 0; i < MAX_COUNT; i++) {
  prototypeHoge.hoge(0);
}
```

#### クラスからの関数呼び出し

```
// クラスの定義・生成
class ClassHoge {
  constructor() {
    this.a = 0;
  }
  hoge(val) {
    return val + val;
  }
}
const classHoge = new ClassHoge();

// 計測対象
for (let i = 0; i < MAX_COUNT; i++) {
  classHoge.hoge(0);
}
```

### 計測結果からのまとめ

今回の検証によると、構文の書き方はパフォーマンスに大きく影響しないことがわかりました。ただ、Edgeだと`Math.pow()`関数が極端に遅いといった結果も確認できました。特定のブラウザーでのみ性能を改善したいときに、コードの書き方を検証に含める価値は少しはあるかもしれません。

今後、ブラウザーのアップデートによりパフォーマンスが改善される可能性もあります。パフォーマンス改善のために無闇に構文を変えるよりは、まずは調査を行った上で、どこに時間がかかっているか調べてみることが大事でしょう。今回の計測コードが気になる方は、GitHubで全コードを公開していますので、ぜひお試しください。

-   [ics-creative/180207\_javascript\_performance](https://github.com/ics-creative/180207_javascript_performance)

ICSではこの他にもパフォーマンス計測を行っています。パフォーマンス計測・改善に興味がある方はぜひ次の記事も参考にしてください。

-   [最適なCSSの横並びはどっち!? Flexboxとfloatのパフォーマンス比較](https://ics.media/entry/11459/)
-   [最速のアニメーションライブラリはこれだ！ JSライブラリの性能をDOMとWebGLで比較検証](https://ics.media/entry/14993/)
-   [iOSにおけるSwift/Unity/PhoneGap/Adobe AIRのパフォーマンス比較検証](https://ics.media/entry/6137/)
-   [スマホブラウザの描画性能を比較検証 (HTML5 CanvasとWebGLを利用)](https://ics.media/entry/2372/)
-   [HTML5 CanvasとCSS3のスマホブラウザでの描画性能](https://ics.media/entry/306/)

なお、本記事の検証には[iMac (27-inch, Late 2013 / Core i7 3.5 GHz)](https://support.apple.com/kb/SP688?locale=ja_JP&viewlocale=ja_JP) 、次のブラウザーとOSを使用しました。

macOS Sierra 10.12

-   Chrome 64
-   Safari 11.0
-   Firefox Quantum 58

Parallels Desktop上のWindows 10

-   Edge 40 (EdgeHTML 15)