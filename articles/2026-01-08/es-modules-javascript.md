---
title: "ES Modules入門 - JavaScriptのモジュールを使う方法"
source: "https://ics.media/entry/16511/"
publishedDate: "2017-10-12"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

**JavaScriptには、モジュールという仕組みがあります**。[ECMAScript 2015のModules](https://262.ecma-international.org/6.0/#sec-imports)に標準仕様として策定されており、現在はすべてのブラウザで利用できます。この機能は、ECMAScript Modules、ES Modules、ESMなどと呼ばれています（以下、ES Modulesと記載します）。

[Vite](https://ics.media/entry/210708/)や[webpack](https://ics.media/entry/12140/)などのフロントエンドのツールを通して、ES Modulesを使っているエンジニアは多いでしょう。本記事では、ブラウザネイティブで使えるES Modulesに焦点をあて、**ES Modulesで解決できる課題と利点を紹介します**。

### HTML+JSではモジュールの仕組みがなかった

昔（2010年代前半）のJavaScriptには他のJSファイルを取り込む仕様が昔は存在しませんでした。外部JSファイルを読み込みたい時には、HTMLファイルに`script`タグを書き込むことで実現していました。たとえば次のようなコードです。

```
<script src="js/vender/jquery.min.js"></script>
<script src="js/vender/jquery.cookie.js"></script>
<script src="js/vender/jquery.easing.1.3.js"></script>
<script src="js/common.js"></script>
<script src="js/utils.js"></script>
<script src="js/app.js"></script>
```

この方法だと扱いづらい点があります。

-   HTMLファイルと密結合となる
-   JSファイル単独で管理できない
-   読み込みの順番を気にしなければならない

これを解決するための手段として、さまざまなアプローチが登場しました（[AMD](https://requirejs.org/docs/whyamd.html)や[CommonJS](https://wiki.commonjs.org/wiki/CommonJS)など）。これからはES Modulesが標準仕様として取って代わっていくと考えられます。

### サンプルで理解するES Modules

ES Modulesをブラウザで使うにはいくつか手順があります。サンプルを通して、1つひとつおさえていきましょう。

#### 利用可能なブラウザ

現在のブラウザではES Modulesを利用できます。「[Can I Use…](https://caniuse.com/#feat=es6-module)」によると、利用可能なブラウザのバージョンは以下の通りです。

-   iOS Safari 10.1以上（2017年3月リリース）
-   macOS Safari 10.3以上（2017年3月リリース）
-   Chrome 61以上（2017年8月リリース）
-   Edge 16以上（2017年10月リリース）
-   Firefox 60以上（2018年5月リリース）

#### 読み込まれる側の処理

モジュールとしての外部JSファイルを用意しましょう。次のコードはブラウザでアラートを表示するだけのサンプルコードです。

▼sample-alert.js

```
export function sayMessage(message) {
  alert(message);
}
```

外部ファイルのJSファイルでは`export`文を使って定義します。`export`で宣言されたものだけが他のJSファイルから参照できます。

#### 読み込む側の処理

HTMLには次のコードを記述します。従来は`type="text/javascript"`と記載していましたが、ES Modulesを使う時は`type="module"`と書きます。`module`を指定しないと、`import`や`export`などのJSコード内の宣言がエラーとなります。

▼パターン1

```
<html>
<head>
  <meta charset="UTF-8" />
  <script type="module">
    import {sayMessage} from "./sample-alert.js";
    sayMessage("こんにちは世界");
  </script>
</head>
<body>
</body>
</html>
```

`src`属性で外部ファイルを指定できます。インラインでも外部ファイルでも、どちらでもES Modulesを読み込めます。

▼パターン2

```
<html>
<head>
  <meta charset="UTF-8" />
  <script type="module" src="index.js"></script>
</head>
<body>
</body>
</html>
```

```
import { sayMessage } from "./sample-alert.js";
sayMessage("こんにちは世界");
```

`import`文の`from`の中では必ず`./`や`../`、`/`、といったパスで記述しなければなりません。`"xxx.js"`というように記述するのはNGで、`"./xxx.js"`とファイルパスを明確に記載します。拡張子も必須です。Node.jsでは拡張子無しの記述ができましたが、ブラウザでは必ず拡張子を記載ください。

これをブラウザで開くとJSファイルで記載されたコードが実行されていることがわかります。

![](https://ics.media/entry/16511/images/170906_esmodules_sample_alert.png)

-   [別ウインドウで再生する](https://ics-creative.github.io/170927_js_esm/src/sample_1.html)
-   [ソースコードを確認する](https://github.com/ics-creative/170927_js_esm/blob/master/src/sample_1.html)

### import文とexport文の書き方

ES Modulesでは、`import`文と`export`文を使ってモジュール間でコードを共有します。それぞれの書き方について詳しく見ていきましょう。はじめて学ぶ方は難しいので、必要になったときに参考にしてください。

#### export文の書き方

モジュールから要素をエクスポートするには、以下のような方法があります。

##### 名前付きエクスポート（Named Exports）

名前付きエクスポートは、モジュールから特定の名前で要素をエクスポートする方法です。以下のようなパターンがあります。

```
// 関数のエクスポート
export function sayMessage(message) {
  alert(message);
}

// 定数のエクスポート
export const PI = 3.14159;

// クラスのエクスポート
export class User {
  constructor(name) {
    this.name = name;
  }
}

// オブジェクトのエクスポート
export const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};
```

##### まとめてエクスポート

個別に定義したものを後からまとめてエクスポートすることもできます。

```
// 個別に定義
function sayHello() {
  console.log('Hello');
}

const VERSION = '1.0.0';

// まとめてエクスポート
export { sayHello, VERSION };
```

##### export default

`export default`は、モジュールから1つの要素をデフォルトとしてエクスポートする方法です。

```
export default function sayMessage(message) {
  alert(message);
}
```

#### import文の書き方

モジュールから要素をインポートするには、以下のような方法があります。

##### 個別のインポート

個別のインポートは、モジュールから必要な要素だけを選択してインポートする方法です。これは以下のような利点があります。

-   必要な要素だけをインポートするため、コードの意図が明確になる
-   バンドルサイズを最適化できる（ツリーシェイキングが効きやすい）
-   名前の衝突を避けやすい

```
// 必要なものだけを個別にインポート
import { sayMessage, PI } from './sample-alert.js';

sayMessage('こんにちは');
console.log(PI);
```

##### すべてをインポート

すべてをインポートは、モジュールからエクスポートされているすべての要素を一度にインポートする方法です。これは以下のような場合に便利です。

-   モジュールの多くの要素を使用する場合
-   モジュールの名前空間を明確にしたい場合
-   名前の衝突を避けたい場合

```
// モジュールのすべてのエクスポートをインポート
import * as utils from './sample-alert.js';

utils.sayMessage('こんにちは');
console.log(utils.PI);
const user = new utils.User('太郎');
```

注意点：

-   すべての要素をインポートするため、バンドルサイズが大きくなる可能性がある
-   ツリーシェイキングが効きにくくなる可能性がある
-   モジュールの要素が増えた場合、どの要素が実際に使用されているか分かりにくくなる

##### 別名でインポート

モジュールからインポートする際に、別名（エイリアス）を付けることができます。これは以下のような場合に便利です：

-   インポートする名前が長すぎる場合
-   同じ名前の変数や関数が既に存在する場合
-   より分かりやすい名前をつけたい場合

```
// 別名をつけてインポート
import { sayMessage as showMessage } from './sample-alert.js';

showMessage('こんにちは');
```

複数の要素に別名をつけることもできます：

```
import { 
  sayMessage as showMessage,
  PI as mathPI,
  User as UserClass
} from './sample-alert.js';
```

##### デフォルトエクスポートのインポート方法の詳細

デフォルトエクスポートされた要素をインポートする場合のコードは、`{ }`を記載しません。

デフォルトエクスポートされた要素は、インポート時に任意の名前を付けることができます。必ずしも、exportしたときの名前でなくても、importできます。exportとimportの名前が変更できることから、開発では利点のない書き方です。

```
// 同じ関数を異なる名前でインポート可能
import showMessage from './sample-alert.js';
import displayMessage from './sample-alert.js';
import alertUser from './sample-alert.js';

// すべて同じ関数を参照している
showMessage('こんにちは');
displayMessage('こんにちは');
alertUser('こんにちは');
```

##### 再エクスポート

モジュールからインポートしたものを、そのまま別のモジュールとして再エクスポートすることができます。これは以下のような場合に便利です。

-   複数のモジュールを1つのモジュールとしてまとめたい場合
-   モジュールの構造を整理したい場合
-   別名をつけて再エクスポートしたい場合

```
// 他のモジュールからインポートしたものを再エクスポート
import { sayMessage } from './sample-alert.js';
export { sayMessage };

// または、より簡潔な書き方
export { sayMessage } from './sample-alert.js';

// 別名をつけて再エクスポート
export { sayMessage as showMessage } from './sample-alert.js';

// 複数の要素を再エクスポート
export { 
  sayMessage,
  PI,
  User
} from './sample-alert.js';
```

### 外部JSも扱える

もう1つ興味深いサンプルを紹介しましょう。`import`文にはURLも指定できます。ES Modulesに対応した外部JSであれば、CDNから読み込めるので次のように記載できます。

```
<html>
<head>
  <meta charset="UTF-8" />
  <script type="module">
    import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.175.0/build/three.module.js';
    
    // Three.jsの起動コード (略)
  </script>
</head>
<body>
</body>
</html>
```

次の作例はWebGL用のJSライブラリ[Three.js](https://ics.media/entry/14771/)を使ったサンプルです。

![](https://ics.media/entry/16511/images/esmodules_script_three.png)

-   [別ウインドウで再生する](https://ics-creative.github.io/170927_js_esm/src/sample_three.html)
-   [ソースコードを確認する](https://github.com/ics-creative/170927_js_esm/blob/master/src/sample_three.html)

注意点として、どのJSライブラリでもES Modulesとして読み込めるわけではありません。Three.jsはES Modulesで設計された数少ないJSライブラリです。有名どころだとjQueryなどはES Modulesとして配布されていないため、現時点ではブラウザネイティブでES Modulesとして利用できません。

### Import mapsでESMのエイリアスをはる

ブラウザでもライブラリ名を指定したインポートを利用する方法があります。たとえば、`from "three"`や`from "vue"`といった記載が可能になります。

`script`タグに`type=importmap`属性を付与することで、インポート先のライブラリをエイリアス登録ができます。`<script type="importmap">`のタグの中には、JSON形式でエイリアスと実態のURLを指定します。

```
<script type="importmap">
{
  "imports": {
    "lodash": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js",
    "@" : "./sample-alert.js"
  }
}
</script>

<script type="module">
  import * as _ from 'lodash';
  import {sayMessage} from '@';

  const a = {'a': 1};
  const b = {'a': 3, 'b': 2};
  const c = _.defaults(a, b);

  sayMessage(JSON.stringify(c));// {a: 1, b: 2}
</script>
```

CDNのJSライブラリでも利用できますし、相対パスに対するエイリアスもはれます。

#### Vue.js

Vue.jsの場合は以下のように記述します。

```
<script type="importmap">
{
  "imports": {
    "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js"
  }
}
</script>
<script type="module">
  import {
    ref,
    computed,
    createApp,
  } from "vue";

  const app = createApp({
    setup() {
      // ･･･任意の処理
    },
  });
  app.mount("#app");
</script>
```

-   [別ウインドウで再生する](https://ics-creative.github.io/170927_js_esm/src/sample_importmaps_vue.html)
-   [ソースコードを確認する](https://github.com/ics-creative/170927_js_esm/blob/master/src/sample_importmaps_vue.html)

#### Three.js

Three.jsの場合は以下のように記述します。

```
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.175.0/build/three.module.js"
  }
}</script>
<script type="module">

  import * as THREE from "three";
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer();

  // ･･･省略
</script>
```

-   [別ウインドウで再生する](https://ics-creative.github.io/170927_js_esm/src/sample_importmaps_three.html)
-   [ソースコードを確認する](https://github.com/ics-creative/170927_js_esm/blob/master/src/sample_importmaps_three.html)

#### 対応ブラウザ

Import mapsの対応ブラウザは『[Import maps | Can I use...](https://caniuse.com/import-maps)』を参照ください。現行ブラウザはすべて対応しています。

### コラム：ES2025のインポート属性

ES2025では、`import`文に属性を付与することができるようになります。`with`を使って種類（`json`や`css`）を指定します。これにより、CSSやJSONなどのファイルをJavaScript側でインポートできます。

```
import styles from "./style.css" with { type: "css" };
import data from "./data.json" with { type: "json" };

console.log(styles); // CSSStyleSheet オブジェクト
console.log(data); // jsonファイルの展開したオブジェクト
```

### コラム：動的インポートによる動的なモジュール読み込み

ES Modulesでは、通常の静的な`import`文による読み込みのほか、必要に応じてモジュールを動的に読み込む動的インポートを利用できます。動的インポートは実行時にモジュールを非同期で読み込むため、初期ロードの軽量化や条件に応じたリソースの最適化に役立ちます。

例えば、以下のコードはボタンがクリックされたときにモジュールを動的に読み込み、モジュール内の関数を実行する例です。`await import()`と記載している箇所が、動的インポートになります。

```
<button id="loadModule">モジュールを動的に読み込む</button>
<script type="module">
  document.querySelector('#loadModule').addEventListener('click', async () => {
    const { sayMessage } = await import('./sample-alert.js');
    sayMessage("動的に読み込まれたモジュールです");
  });
</script>
```

動的インポートの`import()`メソッドはPromiseを返すため、async/await構文と組み合わせることで直感的な非同期処理が実現できます。

### ES Modulesを導入した場合の課題

ES Modulesを採用し、JSファイルを細かく分けた場合、ウェブサーバーから転送すべきファイルの数が増える傾向があります。

**HTTP/1.1プロトコルでは同時接続数が限られるため多くのファイルを転送するのが苦手です**。ウェブ制作の現場ではCSSスプライトやJSファイルの結合などの手法でファイルを1つに結合し、転送ファイルの数を減らしました。

転送ファイルが増えることの解決には、**HTTP/2に対応したウェブサーバーへ移行するのが適した手段**の1つです。ES ModulesでJSファイルの数が増えても、HTTP/2プロトコルでは支障にならないでしょう。

### キャッシュ対策が難しくなる

ブラウザキャッシュの対策として、リクエストURLに以下のようにパラメーターを付与する運用があります。パラメーターを日付等を指定することになり、URLがユニークとなり、キャッシュを避けられ、新しいファイルを配信できます。

```
<script src="main.js?2022_09_15"></script>
```

ES Modulesの場合は、ファイル参照とコードの`import`文が同一なため、この手法を利用する場合は`import`文を書き換えます。ただ、JavaScript側を修正することになるので、あまり賢い方法とは言えません。

```
import { sayMessage } from './main.js?2022_09_15';
sayMessage('こんにちは世界');
```

### モジュールバンドラーの必要性

規模のあるJavaScriptの開発ではモジュールの仕組みは必須です。昨今のフロントエンドの開発ではViteやwebpackなどのツールを使ってモジュールのJS開発をしている方がほとんどでしょう。

Vite等のツールを使うと、複数のJavaScriptファイルを必要な分だけ結合できます（バンドルといいます）。

![](https://ics.media/entry/16511/images/160519_webpack_is.png)

**パッケージマネージャーnpmで管理するJSライブラリをバンドルするにはViteなどのツールが必要**で、**[JSX](https://ics.media/entry/16028/)や[TypeScript](https://ics.media/entry/16329/)などのコンパイラは開発上は必須**です。高度なSPA開発では引き続きこの手のツールは使われています。

### まとめ

**ES ModulesはJavaScriptの開発スタイルに変化をもたらした機能**です。覚えることが多いES Modulesですが、モジュールの仕組みを使うことで、規模の大きいJavaScriptの開発が可能になります。フロントエンドの開発では、ES Modulesを使うことが必須ですので、しっかり習得しておきましょう。

本記事で解説したサンプルは[GitHub](https://github.com/ics-creative/170927_js_esm/tree/master/src)にて公開しています。