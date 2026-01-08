---
title: "GPGPUを体験しよう！ WebGPUのコンピュートシェーダー入門"
source: "https://ics.media/entry/250626/"
publishedDate: "2025-06-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

みなさんはGPGPUという言葉を知っていますか？　GPGPUとは「**G**eneral **P**urpose computing on **GPU**」、つまり「GPUによる汎用計算」という意味です。GPUは3Dの高速描画のために作られたものですが、GPGPUは数値シミュレーションなどの汎用計算にも活用する技術のことです。

WebGPUは、WebGLの後継として現在策定・実装が進んでいるブラウザ向けの次世代の描画・計算APIです。WebGPUが登場したことにより、JavaScriptの開発者もブラウザ上でGPGPUができるようになりました。

WebGPUについて、詳しくは記事『[WebGPUがついに利用可能に - WebGL以上の高速な描画と、計算処理への可能性](https://ics.media/entry/230426/)』で解説しているので参考ください。

本記事では、WebGPUの描画機能には一切触れず、計算機能であるコンピュートシェーダーだけに焦点を当てて紹介します。「WebGLや3Dグラフィックスの知識がない」「シェーダーは難しそう」といった不安があっても心配いりません。80行ほどのコードで、GPUを使った計算を体験できます。

この記事を読んで、WebGPUを使った汎用計算を体験してみましょう。

### なぜコンピュートシェーダーなのか

WebGPUのコンピュートシェーダーについて、従来のブラウザ向けの計算手法と比べてみましょう。

**WebAssembly**

WebAssemblyはネイティブレベルの速度でCPU上で実行されます。CPUの能力を最大限引き出せますが、GPUにはアクセスできません。CPUはコアの数が限られるため、大量の並列処理には向いていません。

**Web Workers**

Web Workersは別スレッドで処理を非同期実行できるため、メインスレッドをブロックしない特徴があります。ブラウザのレンダリングとは並列に実行できますが、GPUを使用できるわけではなく、大量の並列計算には向いていません。

**WebGL**

WebGLはブラウザからGPUを扱う手段としてこれまで使用されてきました。ただし、提供されている機能は基本的には描画専用のAPIのみです。汎用並列計算を実現するには、フラグメントシェーダーからテクスチャに計算結果を色として書き込みます。これはややハック的で、本来のWebGLの使い方ではありません。

### コンピュートシェーダーのサンプル

以下のサンプルでは、WebGPUのコンピュートシェーダーを使った最小構成の処理を体験できます。やっていることはJavaScriptからデータをGPUに転送し、シェーダーで値に加算してまたJavaScriptに戻すだけのかんたんな処理です。これ以上省略できないくらいWebGPUのコンピュートシェーダーの基本となる処理のみに絞っています。

-   [サンプルを別タブで開く](https://ics-creative.github.io/250626_webgpu_compute_simple/sample/1_computeSimplest/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250626_webgpu_compute_simple/blob/main/sample/1_computeSimplest/script.js)

※本記事のサンプルはChrome・Edge 113（2023年5月）、Safari 26.0（2025年9月）以上でご覧ください。

### サンプルのコード解説

#### 1.`GPUDevice`を取得する

最初に、`navigator.gpu`から`GPUAdapter`を取得します。`GPUAdapter`はブラウザから利用可能なGPU（`GPUDevice`）を取得したり、どのようなWebGPU拡張機能をサポートしているかの確認ができます。

次に、`GPUAdapter`から`GPUDevice`を取得します。`GPUDevice`は、WebGPUの大半の機能にアクセスするインターフェイスです。

```
// GPUAdapterを取得する
const adapter = await navigator.gpu.requestAdapter();
// GPUAdapterからGPUDeviceを取得する
const device = await adapter.requestDevice();
```

#### 2.WGSLシェーダーを定義する

シェーダーの定義をします。WebGPUではWGSL（ダブリュージーエスエル：WebGPU Shading Language）というシェーダー言語を使用します。

```
// language=WGSL
const computeShaderWGSL = `
// バインド0に符号なし整数型のストレージ配列を定義する
@binding(0) @group(0) var<storage, read_write> storageData:array<u32>;

// コンピュートシェーダーのメイン関数定義。ワークグループのスレッドサイズは8×1×1
@compute @workgroup_size(8, 1, 1)
fn main(
  // ビルトイン引数global_invocation_idをgidという名前で使用
  @builtin(global_invocation_id) gid:vec3<u32>,
) {
  // 各スレッドはスレッド番号に対応したインデックスのデータをストレージ配列から読み取り、1を足して格納する
  storageData[gid.x] = storageData[gid.x] + 1u;
}
`;
```

サンプルのWGSLについて、分解してかんたんに説明します。

**バインドの定義**

```
@binding(0) @group(0) var<storage, read_write> storageData:array<u32>;
```

メイン関数の外でバインドの変数を宣言しています。バインドとは、シェーダーが外部（JavaScriptやGPU上のメモリ）とのやりとりに使用するリソースの定義です。

コンピュートシェーダーにおいて、バインドできるリソースとして`storage`をよく使用します。`storage`は大量のデータをシェーダーやJavaScriptから読み書きできます。

`var<storage, read_write> storageData:array<u32>`は、読み書き可能なストレージデータとして`u32`（32ビット符号なし整数）配列を`storageData`という名前で宣言しています。

`@binding(0) @group(0)`はバインドする場所を定義しており、JavaScript側でリソースを指定する際にこの番号を使用します。

**メイン関数の定義**

```
@compute @workgroup_size(8, 1, 1)
fn main(
  @builtin(global_invocation_id) gid:vec3<u32>,
) {
}
```

コンピュートシェーダーで最初に実行する関数（エントリーポイント）には`@compute @workgroup_size(X, Y, Z)`を`fn`の直前に記述します。`@workgroup_size()`は、起動するスレッド数を3次元で指定します。

エントリーポイント関数の引数には、使用するビルトイン変数を指定します。ビルトイン変数は、シェーダー実行時に自動でWebGPUから渡される特別な変数です。

今回使用する`global_invocation_id`には、実行中のスレッドのグローバルID（自分が全体で何番目のスレッドか）が渡されます。

**メイン関数内の演算**

```
storageData[gid.x] = storageData[gid.x] + 1u;
```

`gid`にはスレッドのグローバルIDが入っているので、`storageData`からスレッドのインデックスに対応した値を読み込んで、`1`を足して格納しなおしています。

#### 3.コンピュートパイプラインを作成する

JavaScript側でWGSLシェーダーをコンパイルします。`entryPoint`にはコンピュートシェーダーのメイン関数名を指定します。

今回は`layout`に`"auto"`を指定します。詳しくは手順5「バインドグループを作成する」で説明します。

コンピュートパイプラインはWebGPUでコンピュートシェーダーの実行を行う単位です。パイプラインには使用するシェーダーと変数のレイアウトがセットで記録されています。パイプラインの作成は負荷の高い処理ですので、何度も呼び出さず、なるべく使い回すことが高速化の鍵になります。

```
// WGSLをコンパイルし、パイプラインを作成する
const computePipeline = device.createComputePipeline({
  layout: "auto",
  compute: {
    module: device.createShaderModule({ code: computeShaderWGSL }),
    entryPoint: "main",
  },
});
```

#### 4\. バインドで使用するバッファーを作成する

シェーダーで使用するストレージ配列に対応したバッファーをJavaScriptで作成します。バッファーとはWebGPUでデータをやり取りする際に使用するオブジェクトです。

`createBuffer()`メソッドでバッファーを作成します。`usage`にはバッファーをどの用途で使用するかのフラグを指定します。フラグの組み合わせにはルールがあり、シェーダーで使用するバッファーはJavaScriptからデータを読むことができません。WebGPUでは安全性・効率の観点からこのような仕組みになっています。

今回のように、シェーダーで計算した結果をJavaScriptから使用する場合、JavaScript→WGSLヘ、WGSL→JavaScriptへと2種類のバッファーを作成します。

**JavaScript→WGSLのバッファー作成**

```
const storageData = new Uint32Array(8);
// storageData[0] = ... // 転送したい値をいれる

// JavaScriptから値を転送し、シェーダーで使用するバッファーを作る
const storageBuffer = device.createBuffer({
  size: storageData.byteLength,
  usage:
    GPUBufferUsage.COPY_DST | // JavaScriptから値を転送するため、「転送先」のフラグを指定
    GPUBufferUsage.STORAGE | // シェーダーからstorageとして使用するフラグを指定
    GPUBufferUsage.COPY_SRC, // JavaScriptに値を転送するため、「転送元」のフラグを指定
});
// 非同期に値を転送
device.queue.writeBuffer(storageBuffer, 0, storageData);
```

**WGSL→JavaScriptのバッファー作成**

```
// JavaScriptに値を転送するバッファーを作る
const readbackBuffer = device.createBuffer({
  size: storageData.byteLength,
  usage: 
    GPUBufferUsage.COPY_DST | // JavaScriptに値を転送するため、「転送先」のフラグを指定
    GPUBufferUsage.MAP_READ, // JavaScriptから値を読み込むためのフラグを指定
});
```

#### 5.バインドグループを作成する

バッファーを用意したら、バインドグループを作成します。バインドグループを作成するには、使用する値の形式を定義したバインドグループレイアウトが必要です。

**①バインドグループレイアウトを作成する**

バインドグループレイアウトは、シェーダーがどのようなデータを外部とやりとりするかの設計図のようなものです。今回のサンプルだと、WGSLに次の1行を宣言していました。

```
@binding(0) @group(0) var<storage, read_write> storageData:array<u32>;
```

つまり「`@binding(0)`に`storage`のバッファーを使用する」という仕様です。WebGPUにはシェーダーの宣言からレイアウトを自動で書き出す機能があります。

手順3「コンピュートパイプラインを作成する」で`layout`に`"auto"`を指定していると、自動で書き出したレイアウトを`getBindGroupLayout()`メソッドで取得できます。引数の`0`はWGSLで指定した`@group(0)`に対応します。

```
// 作成したパイプラインからバインドグループレイアウトを取得する
const bindGroupLayout = computePipeline.getBindGroupLayout(0);
```

**②バインドグループを作成する**

バインドグループは、シェーダーが使用する実リソースをまとめたオブジェクトです。レイアウトに沿って、「`@binding(0)`に`storageBuffer`を使う」と明示します。

```
// バインドグループレイアウトのフォーマットに沿ったバインドグループを作成する
const bindGroup = device.createBindGroup({
  layout: bindGroupLayout, // レイアウト
  entries: [
    {
      binding: 0, // @binding(0)に
      resource: { buffer: storageBuffer }, // このバッファーを接続
    },
  ],
});
```

最初はバインドグループとレイアウトの2段階が煩雑に見えますが、この仕組みこそがWebGPUの再利用性・安全性・高速化を支える大事な設計構造です。

-   **再利用性**：同じシェーダーでも、バッファーを差し替えるだけで別データを処理できる
-   **安全性**：実行前に「型が合っているか」をGPUが検証できる
-   **高速化**：実行ごとに型を検証する必要がなく、余計なオーバーヘッドを避けられる

#### 6.コマンドを実行する

シェーダーの実行やデータの転送などのGPUへの命令は、コマンド単位で行います。`createCommandEncoder()`でコマンドエンコーダーを作成します。コマンドエンコーダーは、コマンドを記録してまとめるためのオブジェクトです。コマンドエンコーダーをキュー（実行待ちリスト）に追加することで、記録したコマンドをGPUへ転送します。

今回は、2つのコマンドを実行します。

**コマンド①：コンピュートシェーダーの実行** `beginComputePass()`を呼び出して作成したコンピュートパスに必要な設定を行っていきます。WebGPUでは描画や計算のシェーダー実行をパスという単位でまとめて1つのコマンドにします。

**コマンド②：結果をJavaScriptから参照できるバッファーにコピー** `copyBufferToBuffer()`で`storageBuffer`から`readbackBuffer`へデータを転送します。

```
// コマンドエンコーダーを作成する
const commandEncoder = device.createCommandEncoder();

// コマンド①：コンピュートシェーダーの実行
// コンピュートパスを作成する
const passEncoder = commandEncoder.beginComputePass();
// 使用するパイプラインをセットする
passEncoder.setPipeline(computePipeline);
// 使用するバインドグループをセットする
passEncoder.setBindGroup(0, bindGroup);
// コンピュートシェーダーの実行命令を呼び出す
passEncoder.dispatchWorkgroups(1, 1, 1);
// コンピュートパスの設定を完了する
passEncoder.end();

// コマンド②：結果をJavaScriptから参照できるバッファーにコピー
commandEncoder.copyBufferToBuffer(
  storageBuffer,
  0,
  readbackBuffer,
  0,
  storageData.byteLength,
);

// コマンドをキューに追加する
device.queue.submit([commandEncoder.finish()]);
```

#### 7.実行結果を取得する

JavaScriptから結果を取得します。計算結果を転送するコマンドを命令済みですので、その中身をJavaScriptから読めるようにします。

バッファーを`mapAsync(GPUMapMode.READ)`メソッドでマップすると、`getMappedRange()`メソッドでデータを`ArrayBuffer`型として取得できます。

キューに追加したコマンドは非同期で実行されるため、すぐには結果を取得できません。`mapAsync()`メソッドは非同期で、バッファーを使用しているコマンド②が完了するまで待機します。

```
// バッファーをマップしてJavaScriptから参照できるようにする
await readbackBuffer.mapAsync(GPUMapMode.READ);
// マップ完了後、ArrayBufferを取得する
const result = new Uint32Array(readbackBuffer.getMappedRange());
// 計算結果を表示
document.getElementById("output").textContent = `output: [${result}]`;
// バッファーをアンマップして再度GPUから使用可能にする
readbackBuffer.unmap();
```

### ステップアップ：`uniform`を使用する

以下のサンプルは、最初のサンプルを少し発展させて`uniform`を使用します。ボールのY座標をコンピュートシェーダーで毎フレーム並列計算し、JavaScriptから都度値を読み取ってDOMを更新します。

`uniform`はコンピュートシェーダーでバインドできるリソースです。すべてのスレッドで共通の変数として使用します。読み取り専用ですが、`storage`よりも高速にシェーダーからアクセスできます。

今回は、「現在時間」と、「ブラウザのウィンドウサイズから計算した振幅の大きさ」をJavaScriptから渡してシェーダーでの計算に使用しています。

-   [サンプルを別タブで開く](https://ics-creative.github.io/250626_webgpu_compute_simple/sample/2_computeUniform/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250626_webgpu_compute_simple/blob/main/sample/2_computeUniform/script.js)

最初のサンプルとの大きな違いとして、シェーダーに`uniform`のバインドを1つ追加しています。`uniform`には複数の値をまとめて扱えるよう、`struct`で構造体を定義しています。

```
// language=WGSL
const computeShaderWGSL = `
// 定数バッファーで使用する構造体
struct Uniform {
  time:f32,
  amplitude:f32,
}
  
// バインド0に32ビット浮動小数点数型のストレージ配列を定義する
@binding(0) @group(0) var<storage, read_write> storageData:array<f32>;
// バインド1に定数バッファーの構造体を定義する
@binding(1) @group(0) var<uniform> uniformData:Uniform;
  
// コンピュートシェーダーのメイン関数定義。ワークグループのスレッドサイズは8×1×1
@compute @workgroup_size(8, 1, 1)
fn main(
  // ビルトイン引数global_invocation_idをgidという名前で使用
  @builtin(global_invocation_id) gid:vec3<u32>,
) {
  // 各スレッドはスレッド番号に対応したインデックスのデータをストレージ配列から読み取り、定数バッファーに応じた時間や振幅でボールの座標を計算する
  storageData[gid.x] = uniformData.amplitude * 0.5 * (1.0 + sin(uniformData.time * 0.002 + f32(gid.x) * 0.5));
}
`;
```

このサンプルを発展させていくと、単に数値計算して終わりではなく、計算した結果をJavaScriptで使用してグラフィカルな表現も可能になります。

### WebGPUで20万パーティクル

次のデモは20万個の粒子をコンピュートシェーダーで動かしていますが、滑らかに動いています。

-   [サンプルを別タブで開く](https://ics-creative.github.io/250627_webgpu_particles/)
-   [コードを確認する](https://github.com/ics-creative/250627_webgpu_particles)

### まとめ

WebGPUのコンピュートシェーダーは、3D表示やグラフィックス処理に縛られない、汎用計算の新しい可能性をひらきます。今回のように「Canvasすら使わない」「1つのバッファーで加算するだけ」といったシンプルなサンプルでも、GPUの並列実行モデルに触れることができるのは大きな経験です。

この先は、画像処理や物理シミュレーション、AIの前処理など、「JavaScriptだけで実現するのは重すぎる」処理の最適化手段としてWebGPUが選ばれる時代がやってきます。その第一歩として、この記事があなたの未来を広げる入り口になれば幸いです。

### 参考サイト

-   [コンピュートパイプラインの基本 - WebGPU API | MDN](https://developer.mozilla.org/ja/docs/Web/API/WebGPU_API#%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%83%88%E3%83%91%E3%82%A4%E3%83%97%E3%83%A9%E3%82%A4%E3%83%B3%E3%81%AE%E5%9F%BA%E6%9C%AC)
    -   コンピュートシェーダーの基礎について日本語で学べます
-   [WebGPU Compute Shader Basics | WebGPU Fundamentals](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html)
    -   コンピュートシェーダーに限らず、WebGPUについて体系的に学べる学習サイトです
-   [WebGPU | W3C](https://www.w3.org/TR/webgpu/)
    -   WebGPU API仕様の公式ドキュメントです
-   [WebGPU Shading Language | W3C](https://www.w3.org/TR/WGSL/)
    -   WGSLシェーダー言語仕様の公式ドキュメントです