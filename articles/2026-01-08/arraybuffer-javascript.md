---
title: "あらためて理解するArrayBuffer - JavaScriptでバイナリデータを扱う方法"
source: "https://ics.media/entry/250408/"
publishedDate: "2025-04-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

JavaScriptの`ArrayBuffer`はWebGLなどでまとまったバイナリデータを扱う際に使用されています。`ArrayBuffer`という用語だけ聞くとピンとこない人もいるかもしれません。開発者が主に目にするのは、`Float32Array`や`Uint16Array`といった`TypedArray`（型付き配列）の形式です。こちらであれば見覚えがあるという方もいるでしょう。実は`Float32Array`や`Uint16Array`の本体は、`ArrayBuffer`というバイナリデータを扱うためのオブジェクトなのです。

本記事では、`ArrayBuffer`について深く理解し、正しく使用できるようになることを目指します。そのことで、省メモリーなウェブアプリケーションの開発に役立つはずです。

主な対象読者

-   TypeScriptの型推論で`ArrayBuffer`や`TypedArray`が引数に求められるので、よくわからず参考サイトのコードをコピペしている
-   `Array`と`TypedArray`との違いを詳しく知りたい

### なぜ`ArrayBuffer`が必要なのか

コンピューターは、内部的にすべてのデータをバイナリ形式、すなわち「0」と「1」の二進数で表現しています。これは、電気的な信号のオフ（0）とオン（1）を組み合わせて情報を処理するためです。

バイナリ形式は、コンピューターがデータを効率的かつ高速に処理するために最適化されています。また、バイナリ形式はデータサイズを小さく保てるため、**保存容量の節約や通信の効率化**にもつながります。コンピューターはすべてのデータをバイナリ形式で扱うことで、その高い計算能力を実現しています。

`ArrayBuffer`登場以前のJavaScriptのデータ型や構造では、バイナリデータを効率的に扱うことが困難でした。しかし、ネットワークの高速化やウェブ技術の進化にともなって、以下のような複雑で大きなデータを処理する必要性が高まりました。

-   メディアデータの操作：画像・動画・音声データの生成・編集・解析
-   ファイル操作：ユーザーがアップロードしたファイルの解析。ファイルの生成、ダウンロードなど
-   ネットワーク通信：データの送受信や解析
-   グラフィックス処理：WebGLを用いた高度なグラフィックス描画

そこで、バイナリデータを効果的に操作するための仕組みとして、`ArrayBuffer`がECMAScript 2015で導入されました。

### `ArrayBuffer`と`TypedArray`

`ArrayBuffer`とは、**バイナリデータそのものをメモリー上に確保するためのオブジェクト**です。1バイト（8ビット）を単位とし、複数のバイト列が並んだデータのかたまりとなっています。

実は、`ArrayBuffer`それ自体にはバイナリデータを1バイトずつ管理する機能しかなく、データ型の概念もありません。バイナリデータに意味をもってアクセスするには`TypedArray`オブジェクトが必要になります。

```
// 16バイトのメモリー領域を確保
const array = new ArrayBuffer(16);

// ArrayBufferからデータを読んだり書き込むことはできない
console.log(array[0]); // undefined
```

`TypedArray`は`ArrayBuffer`のバイナリデータを数バイト単位で特定のデータ型として解釈し、配列風のインターフェイスを提供するための「ビュー」オブジェクトです。実際には、`TypedArray`という名前のクラスやAPIはありません。`Float32Array`や`Uint8Array`といった、型ごとに管理する配列風ビューオブジェクトのAPIの総称です。

次の図版では、同じ`ArrayBuffer`インスタンスを`Uint8Array`と`Uint32Array`の2通りの`TypedArray`で参照した場合のイメージを示しています。

![画像：ArrayBufferとTypedArray（Uint8Array）](https://ics.media/entry/250408/images/250408_arraybuffer_uint8array.png)

![画像：ArrayBufferとTypedArray（Uint32Array）](https://ics.media/entry/250408/images/250408_arraybuffer_uint32array.png)

`TypedArray`はコンストラクターの引数に`ArrayBuffer`を指定することで、その`ArrayBuffer`を参照する`TypedArray`オブジェクトを作成します。

また、単に配列の要素数を指定して`TypedArray`のコンストラクターを呼び出すことでも作成できます。しかし、**内部では上記の書き方と同じように`ArrayBuffer`が作られ、管理されます**。

```
// 16バイトのメモリー領域を確保
const array = new ArrayBuffer(16);

// ArrayBufferを8ビット符号なし整数で解釈するためのTypedArrayを作成
const uint8A = new Uint8Array(array);
// TypedArrayには配列アクセス演算子[]を使用して各要素に決まった型のデータを読み書きできる
uint8A[0] = 100;

// 8ビット符号なし整数を16個格納できるTypedArrayを作成
// 内部では16バイトのArrayBufferが自動的に作られる
// この作成方法は上の例とほぼ同じ動きをする
const uint8B = new Uint8Array(16);
```

`TypedArray`に格納できる代表的なデータ型には下記のような種類があります。`TypedArray`には他にもたくさんの種類があります。詳しくは『[TypedArray オブジェクト | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#typedarray_%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)』を参照ください。

TypedArray

格納できるデータ型

値の範囲

バイト数

Uint8Array

8ビット符号なし整数

0 〜 255

1

Uint8ClampedArray

8ビット符号なし整数

0 〜 255（\*1）

1

Float32Array

32ビット浮動小数点数

およそ-3.4x10^38 〜 3.4x10^38

4

Float64Array（\*2）

64ビット浮動小数点数

およそ-1.8x10^308 〜 1.8x10^308

8

（\*1）範囲外のデータを設定すると、この範囲に補正される。

（\*2）JavaScriptにおける数値型は`Number`しかありません。`Number`は内部的には64ビット浮動小数点数で、整数も小数もすべて`Number`型で扱います。`Number`と同じ精度の`TypedArray`を使いたい場合は、`Float64Array`を選択します。

大事な点として、**`TypedArray`は`ArrayBuffer`を解釈するためのビューに過ぎない**ことをもう一度強調しておきます。100MBの`Uint8Array`を作成したところで、実際にメモリーを確保しているのは中身の`ArrayBuffer`です。

#### コラム：任意のデータ型で`ArrayBuffer`にアクセスできる`DataView`

`ArrayBuffer`にアクセス可能な「ビュー」として、`TypedArray`の他に`DataView`があります。`DataView`は`ArrayBuffer`に任意のデータ型としてアクセス可能です。また、複数バイトにアクセスするデータのエンディアンを実行環境にかかわらず指定できます。

※エンディアンとは、メモリー上で複数バイトを解釈する際のバイトの並び順です。

#### コラム：`TypedArray`の新しいデータ型

基本的なデータ型はECMAScript 2015で追加されましたが、その後も`TypedArray`の種類が追加されているので紹介します。

①`BigInt64Array`

`BigInt64Array`は64ビット符号付き整数を扱えるデータ型です。JavaScriptの`Number`では表現しきれない大きな整数を正確に扱えます。`BigInt64Array`はECMAScript 2020で`BigInt`とあわせて追加されました。`BigInt64Array`から得られる数値は`BigInt`ですので、そのままでは`Number`との演算は行えないことに注意が必要です。

参考記事：[JavaScriptのモダンな書き方- ES2020のオプショナルチェーン、null合体演算子、動的import、globalThis等を解説](https://ics.media/entry/200128/#2%5E53%E4%BB%A5%E4%B8%8A%E3%81%AE%E6%95%B4%E6%95%B0%E3%82%92%E6%89%B1%E3%81%88%E3%82%8Bbigint)

②`Float16Array`

`Float16Array`は16ビット浮動小数点数を扱えるデータ型です。16ビット浮動小数点数は、ディープラーニングなどのAIの計算でよく使われます。`Float32Array`と比べると精度が落ちるものの、データ量が半分です。そのため、使用するメモリー容量や帯域が半分で済み、演算も高速に実行可能です。

`Float16Array`はChrome 135、Edge 135（2025年4月）、Safari 18.2（2024年12月）、Firefox 129（2024年8月）で利用可能です。ただし、2025年4月執筆時点では、ECMAScriptの仕様になっておらず、[TC39でStage 3の段階](https://tc39.es/proposal-float16array/)です。

### `TypedArray`の作成方法

`TypedArray`について、作成方法と注意点を詳しく説明します。方法によって内部の`ArrayBuffer`の状態が異なります。とくに、`ArrayBuffer`を**新しく作成するのか、しないのか**について焦点をあてています。

`ArrayBuffer`が新しく作成されると、**メモリーの容量がサイズ分確保されます**。不要にメモリーを消費しないよう注意が必要です。また、元の`ArrayBuffer`および`TypedArray`の変更の影響を受けるかどうかにもかかわってきます。正しくデータ処理を行う上でハマりやすいポイントですので、意識しましょう。

#### `new`演算子（コンストラクター）

コンストラクターから`new`演算子で`TypedArray`を作成する際、引数によって`ArrayBuffer`**を新しく作成するのか、しないのかが異なります**。

A：引数に要素数を指定する

対応したデータ型のバイト数を要素数分確保した`ArrayBuffer`が**内部で自動生成**されます。

B：引数に配列を指定する

対応したデータ型のバイト数を指定した配列の要素数分確保した`ArrayBuffer`が**内部で自動生成**されます。

C：引数に`ArrayBuffer`を指定する

**内部で新しく`ArrayBuffer`は作成されず**、コンストラクターで渡した`ArrayBuffer`を解釈する`TypedArray`を作成します。

```
// A：32ビット浮動小数点数の配列を4要素確保。内部では16バイトのArrayBufferが作成される
const float32A = new Float32Array(4);

// B：32ビット浮動小数点数の配列を4要素、値を指定して確保
// 内部では16バイトのArrayBufferが作成される
const float32B = new Float32Array([0.25, 0.5, 0.75, 1.0]);

// 16バイトのメモリー領域を確保
const array = new ArrayBuffer(16);
// C：渡した16バイトのArraybufferを32ビット浮動小数点数の配列として解釈
// float32Cは4要素の配列になる
const float32C = new Float32Array(array);
```

同じ`ArrayBuffer`から複数の`TypedArray`を作成することも可能です。このとき、データの本体である`ArrayBuffer`は共有しています。そのため、ひとつの`TypedArray`を変更すると、他の`TypedArray`に影響します。

```
// 16バイトのメモリー領域を確保
const array = new ArrayBuffer(16);

// ArraybufferからFloat32Arrayを作成
const float32A = new Float32Array(array);
// 同じArraybufferから別のFloat32Arrayを作成
const float32B = new Float32Array(array);

// すべてのArrayBufferは同一
console.log(float32A.buffer === array); // true
console.log(float32B.buffer === float32A.buffer); // true

// ArrayBufferを共有している場合、一方の変更は他方にも反映される
float32A[0] = 0.25;
console.log(float32B[0]); // 0.25
```

#### `slice()`メソッド

作成済みの`TypedArray`インスタンスから`slice()`メソッドで新しい`TypedArray`を作成できます。引数で切り出す**要素の範囲**を指定します。このとき、作成元の`ArrayBuffer`は共有せず、**新しい`ArrayBuffer`が作成されます**。

#### `subarray()`メソッド

作成済みの`TypedArray`インスタンスから`subarray()`メソッドで新しい`TypedArray`を作成できます。引数で切り出す**要素の範囲**を指定します。このとき、作成元の`ArrayBuffer`を共有するため、**新しい`ArrayBuffer`は作成されません**。

以上をまとめると下記のようになります。`TypedArray`を作成する際に`ArrayBuffer`が内部で新しく作られるか、元の`ArrayBuffer`を共有するかはメモリー効率の大事なポイントです。

`TypedArray`の作成方法

`ArrayBuffer`の作成・共有

`ArrayBuffer`の中身

`new TypedArray(要素数)`

新規作成される

初期値で埋められる

`new TypedArray(配列)`

新規作成される

引数の配列が要素に代入される

`new TypedArray(ArrayBuffer)`

引数の`ArrayBuffer`を共有する

引数のArrayBufferを引き継ぐ（変更されない）

`slice(start, end)`

新規作成される

元のArrayBufferの値が複製され代入される

`subarray(begin, end)`

作成元の`ArrayBuffer`を共有する

元のArrayBufferを引き継ぐ（変更されない）

### 配列（`Array`）との比較

JavaScriptには`TypedArray`とは別に配列（`Array`）の違いを説明します。

`Array`は`TypedArray`と比べると柔軟で汎用性が高いです。しかし、`Array`は内部で動的なメモリー管理を行うため、データ処理や転送を高い頻度で行う場合にはオーバーヘッドが発生する可能性があります。

`TypedArray`は長さが固定であり、バイト単位のデータ格納が可能なため、メモリーアクセスが効率的に行われます。数値計算においてもバイナリデータを直接操作できるので、高いパフォーマンスが期待できます。また、**メモリー領域が連続しているので高速なデータの転送が可能**です。

大量のデータを処理する数値計算の場合には`TypedArray`で管理するとデータのまとめた取り回しが楽になります。逆にデータの規模が小さい時は汎用的な`Array`が良いでしょう。

#### `TypedArray`は決まった型の数値しか格納できない

`Array`は数値、文字列、オブジェクトなど、任意のデータを混在させて格納できます。

```
// 配列は数値や文字列、オブジェクトを混在できる
const array = [10, "hello", { key: "value" }];
```

`TypedArray`は決まった型の**数値**しか格納できません。

```
// 32ビット浮動小数点数が10個格納できるメモリー領域を確保
const float32 = new Float32Array(10);

// Float32Arrayに32ビット浮動小数点数を格納
float32[0] = 0.5;

// 数値として表現できないオブジェクトを代入するとNaNが格納される
float32[1] = "文字列"; // a[1] = NaN
```

#### `TypedArray`はサイズを変更できない

`Array`は配列サイズの変更が容易に可能です。

```
const array = [10, "hello", { key: "value" }];
console.log(array.length); // 3

// 配列はサイズの変更が簡単にできる
array.push("newValue");
console.log(array.length); // 4
```

一方、`TypedArray`は配列のサイズの変更ができません。これは、`TypedArray`が先にメモリー領域をまとめて一箇所に確保し、効率的に処理するための制約です。配列の長さが変わる操作はできないため、`concat()`メソッドや`splice()`メソッドもありません。

```
// 32ビット浮動小数点数が10個格納できるメモリー領域を確保
const float32 = new Float32Array(10);
// push()やpop()など、配列のサイズが変更されるメソッドは持たない
// float32.push(0.5); // ✗
```

逆に、`Array`は中身がメモリー上で連続していない可能性があります。サイズも可変で配列内にどのような大きさのオブジェクトでも格納できるので、必要なメモリー領域があらかじめわからないためです。

`Array`は操作を柔軟にできる反面、配列の中身をまるまる複製したり、転送するためにはメモリーに散らばったデータを集める必要があります。転送のような操作を行うときは、`TypedArray`と比べると効率がよくありません。

![画像：配列のメモリー配置イメージ](https://ics.media/entry/250408/images/250408_array_location.png)

#### コラム：サイズを変更できる`TypedArray`

ECMAScript 2024で`ArrayBuffer`のサイズを変えられる`resize()`メソッドが追加されました。`ArrayBuffer`を作るときに最大の想定バイトサイズを指定しておくと、後からそのサイズまで拡張できます。

```
// 8バイトのArrayBufferを作成（最大16バイトまで拡張可能）
const array = new ArrayBuffer(8, { maxByteLength: 16 });
console.log(array.byteLength); // 8

// サイズを拡張
buffer.resize(12);
console.log(array.byteLength); // 12
```

サイズ変更は可能になるものの、最初からバイト数を見積もっておかなくてはならないため、やはり柔軟性は高くありません。

#### `TypedArray`の配列操作

`TypedArray`は、`Array`にある`map()`メソッドや`forEach()`メソッド、`filter()`メソッドなどの配列操作が可能です。しかし、`TypedArray`ならではの注意点があります。

たとえば、`map()`メソッドを使用する場合、返却される新しい配列は**元の`TypedArray`と同じ型**になります。また、**中の`ArrayBuffer`は新しく作られます**。

大きなデータに対して`map()`操作を行うと、内部的には同じサイズの新たなメモリー領域が確保されることになります。知らずにメモリーを消費していることがあるため、注意が必要です。

```
// 要素を指定してFloat32Arrayを作成
const float32 = new Float32Array([1, 4, 9, 16]);
// map()操作が可能
const newFloat32 = float32.map(value => value + 1);

console.log(newFloat32); // Float32Array, [2, 5, 10, 17]
// 元のTypedArrayはそのまま
console.log(float32); // Float32Array, [1, 4, 9, 16]
// TypedArrayが参照するArrayBufferは新しく作られる
console.log(float32.buffer === newFloat32.buffer); // false
```

`sort()`や`reverse()`などは元の`ArrayBuffer`を操作するため、新しい`ArrayBuffer`は作られません。新しい`ArrayBuffer`が作られるかどうかは、`Array`の同名の配列操作メソッドが元の配列を操作するかどうかに対応しています。

```
// 要素を指定してFloat32Arrayを作成
const float32 = new Float32Array([9, 4, 16, 1]);
// sort()操作が可能
float32.sort();

// 元のArrayBufferが変更される
console.log(float32); // Float32Array, [1, 4, 9, 16]
```

### `ArrayBuffer`および`TypedArray`を使用するAPI

`ArrayBuffer`は大きなデータを編集したり転送するAPIで使用されます。`ArrayBuffer`と`TypedArray`について、ウェブ開発のどのような場面で利用するか具体的にみていきましょう。

#### 2D Canvas

`TypedArray`が利用される実用的な例として2D Canvas（`CanvasRenderingContext2D`）があります。2D CanvasはHTMLの`<canvas>`要素に自由に図形や文字、画像などを描画できるAPIです。線や図形などのベクターグラフィックスも描画できますが、最終的にはピクセルごとにRGBAのデータを持ったビットマップに変換されます。

`CanvasRenderingContext2D`の`getImageData()`メソッドは、描画されたCanvasの指定領域のピクセルデータを`ImageData`として取得します。`ImageData`は画素のRGBAデータ（`Uint8ClampedArray`）と領域のサイズ（幅と高さ）を持ったオブジェクトです。

逆に、`putImageData()`メソッドで`ImageData`をCanvasに描画できます。簡単な画像処理であれば`Uint8ClampedArray`の画素データを通してJavaScriptのみで実装できます。

以下のサンプルでは、ネットワークから読み込んだ画像をCanvasに描画したあと`getImageData()`で各画素を取得し、モノクロ風に加工します。

-   [サンプルを別タブで開く](https://ics-creative.github.io/250408_array-buffer/sample/1_getImageData/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250408_array-buffer/blob/main/sample/1_getImageData/script.js)

```
const canvas = document.querySelector("canvas");
// CanvasからCanvasRenderingContext2Dを取得
const ctx = canvas.getContext("2d");

// Canvasの画素のImageDataをgetImageData()で取得
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
// 画素のデータを参照できるビュー配列、Uint8ClampedArrayを取得
const data = imageData.data;

// 1ピクセルにつき4バイト（4要素）のUint8ClampedArrayデータが返却される。
const pixelLength = data.length / 4;
// すべてのピクセルについて処理
for (let i = 0; i < pixelLength; i += 1) {
  // 注目ピクセルの最初の要素（R）のTypedArray内の位置
  const pixelId = i * 4;
  // モノクロ化には様々な方法があるが、今回は単純に平均をとる
  const average = (data[pixelId] + data[pixelId + 1] + data[pixelId + 2]) / 3;
  data[pixelId] = average; // R
  data[pixelId + 1] = average; // G
  data[pixelId + 2] = average; // B
  // data[i + 3]はアルファのデータのためそのまま変更しない
}

// 変更したピクセルのデータをCanvasにセット
ctx.putImageData(imageData, 0, 0);
```

`ImageData`は`getImageData()`で取得する方法の他に、`Uint8ClampedArray`から作成もできます。以下のサンプルでは、自分で作成したランダムな色の画素データを`putImageData()`でCanvasに設定します。

-   [サンプルを別タブで開く](https://ics-creative.github.io/250408_array-buffer/sample/2_putImageData/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250408_array-buffer/blob/main/sample/2_putImageData/script.js)

#### WebGL

WebGLではJavaScript（CPU）とシェーダー（GPU）でデータのやり取りをするときに、`TypedArray`がよく出てきます。一例として、`bufferData()`メソッドを紹介します。

`bufferData()`メソッドはGPU上に確保した領域（バッファー）に頂点ごとの座標や色のデータを送ります。下記のソースコードで`srcData`には`Float32Array`などの`TypedArray`、もしくは`ArrayBuffer`を指定します。`TypedArray`を指定しても結局は参照する`ArrayBuffer`の中身がまとめて転送されます。

```
// CanvasからWebGLRenderingContextを取得
const gl = document.querySelector("canvas").getContext("webgl");

// バッファーを作成
const vertexBuffer = gl.createBuffer(); 
// バッファーをバインドする
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// バッファーにデータを転送
// 引数のsrcDataには、転送したいデータをTypedArrayやArrayBufferの形式で指定する
gl.bufferData(gl.ARRAY_BUFFER, srcData, gl.STATIC_DRAW);
```

`bufferData()`に転送する頂点データを定義して保持するのに、`Array`と`TypedArray`の2通りの方法があります。`Array`で定義する方法では、データ転送時に`TypedArray`に変換します。

```
// CanvasからWebGLRenderingContextを取得
const gl = document.querySelector("canvas").getContext("webgl");

// 方法① Arrayでデータ管理する
const positionArr = [];
// 配列に座標データを設定（省略）
positionArr[0] = 0.1; // x座標
// 配列をTypedArrayに変換しつつバッファーにデータを転送
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionArr), gl.STATIC_DRAW);

// 方法② 最初から頂点数分のTypedArrayを作成しておく
const positionData = new Float32Array(100 * 3);
// positionDataに座標データを設定（省略）
positionData[0] = 0.1; // x座標
// バッファーにデータを転送
gl.bufferData(gl.ARRAY_BUFFER, positionData, gl.STATIC_DRAW);
```

サイズ（=頂点数）を容易に変更できるメリットがあるため一長一短ですが、JavaScript側の頂点データを最初から`TypedArray`で管理することも考えてみましょう。

#### fetch

皆さんがよく使う`fetch()`メソッドにも`ArrayBuffer`が登場します。たとえば、普段JSONファイルを読み込むとき、`fetch()`後に`response.json()`を呼び出していると思います。`Response`オブジェクトには、読み込んだデータをバイナリデータとして変換する`response.arrayBuffer()`が用意されています。外部ファイルの画像やバイナリデータを読み込んで、`ArrayBuffer`として処理する場合に使用します。

```
// JSONファイルをロード
const response = await fetch("setting.json");
// レスポンスをJSONとして読み込み
const json = await response.json();

// レスポンスをバイナリとして読み込み
const jsonBinary = await response.arrayBuffer();
// 元がJSONファイルなので、バイナリにはテキストの文字コードの羅列が入る
console.log(new Uint8Array(jsonBinary));
```

#### Web Audio

Web AudioはJavaScript上で音声に柔軟な操作を行えるAPIです。読み込んだ音声ファイルから`AudioBuffer`を作成する際に、ファイルのバイナリ形式である`ArrayBuffer`を渡します。`AudioBuffer`はWeb Audioで短い音声データを扱う際に使用するオブジェクトです。

また、`AudioBuffer`からは音声チャンネルごとのPCMデータを取得したり加工できます。取得するオブジェクトの形式は`Float32Array`となっており、ここでも`ArrayBuffer`が登場します。

```
// 新しいAudioContextを作成
const audioContext = new AudioContext();

// 音声ファイルを読み込んでArrayBufferとして取得
const response = await fetch("audioFile.mp3");
const arrayBuffer = await response.arrayBuffer();

// ArrayBufferをWeb Audioで扱えるAudioBufferデータ形式に変換
const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

// AudioBufferから指定したチャンネルのPCMデータを取得できる
// 取得したデータはFloat32Array形式で、各要素に-1.0から1.0の間の数値が入っている
const channel0Data = audioBuffer.getChannelData(0);
console.log(channel0Data); // Float32Array [-0.47540074586868286, ...
```

参考記事：[音を操るWeb技術 - Web Audio API入門](https://ics.media/entry/200427/)

#### Web Workers

Web Workersは、ページ表示に使用しているメインスレッド以外のスレッドでJavaScriptを実行できるAPIです。Web Workersではデータをメインスレッドからワーカー側に渡すと、通常はデータのコピーが発生します。大量のデータをワーカー側に処理させたい場合には、コピーが発生するとパフォーマンスが低下します。

Web Workersには委譲可能オブジェクト（Transferable objects）という仕組みが用意されています。`ArrayBuffer`も委譲可能オブジェクトの一種です。委譲可能オブジェクトはメインスレッドでのアクセス権を失う代わりに、コピーすることなくワーカースレッドで使用できるようになります。`ArrayBuffer`を委譲可能オブジェクトとしてワーカーに転送すれば、大量のデータをコピーコストなしにワーカー側で処理できます。

```
// プログラムファイルからワーカーインスタンスを作成
const worker = new Worker("worker.js");

// 大量のデータ例
const uint8 = new Uint8Array(1024 * 1024 * 100);

// ワーカーインスタンスにArrayBufferを移譲可能オブジェクトとして渡す
worker.postMessage(uint8.buffer, [uint8.buffer]);
```

#### WebAssembly

WebAssemblyは、JavaScriptより高速の、ネイティブに近いパフォーマンスでプログラムを実行できる仕組みです。JavaScriptからWebAssemblyのプログラムを呼び出す際に、処理するデータのメモリー領域として`WebAssembly.Memory`オブジェクトを渡せます。

このメモリー領域も正体は`ArrayBuffer`なので、JavaScriptからデータの読み書きをする際には`TypedArray`形式にしてアクセス可能です。

```
// WebAssemblyに渡すメモリーを作成
const memory = new WebAssembly.Memory({ initial: 10, maximum: 100 });

// メモリーのバッファーにJavaScriptからアクセス
const uint8 = new Uint8Array(memory.buffer);
uint8[0] = 100;

// WebAssemblyプログラムをインスタンス化する
const response = await fetch("program.wasm");
const programBinary = await response.arrayBuffer();
// JavaScriptでデータ設定済みのWebAssembly.Memoryを渡す
WebAssembly.instantiate(programBinary, {js: { memory }});
```

### まとめ

`TypedArray`と、その内部で使われている`ArrayBuffer`の仕組みを正しく理解しておくことは、今後低レベルなデータを扱うAPIを利用する際に役立ちます。とくに、`TypedArray`の操作が求められる場面でも、スムーズに対応できるようになるでしょう。

`TypedArray`は内部の`ArrayBuffer`の変更の影響を受けるなど、一見すると不可解な挙動に感じられることもあります。`TypedArray`の特殊な挙動の理解に、本記事が役立てば幸いです。