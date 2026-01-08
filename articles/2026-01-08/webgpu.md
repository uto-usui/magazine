---
title: "次世代のWebGPUの可能性 – コンピュートシェーダーで高速並列計算"
source: "https://ics.media/entry/18467/"
publishedDate: "2018-06-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

2018年6月21日 公開 / [株式会社ICS 川勝 研太郎](https://ics.media/entry/staff/kawakatsu/)

ウェブの3Dグラフィックスを扱う新しい仕様として提案されているWebGPU。仕様はまだ提案の段階ですが、すでに広く普及しているWebGLと比べて一体なにができるのでしょうか？　本記事ではWebGPUで使用できる**筆者イチオシの機能**、コンピュートシェーダーについて紹介します。

WebGPUについて詳しくは前回の記事「[次世代仕様のWebGPUとは？](https://ics.media/entry/18412/)　」をご覧ください。

![WebGPのコンピュートシェーダーを使ったバイトニックソートのデモ](https://ics.media/entry/18467/images/180619_WebGPU_ComputeShader_bitonicsort_demo.gif)  
▲WebGPUのコンピュートシェーダーを使って並列ソートの一種である「バイトニックソート」を実行するデモ。CPUとGPUとの実行時間を比較したところ、**WebGPUを使った場合は10倍高速**な結果となった

![WebGPUを使ったバイトニックソートの可視化のデモ](https://ics.media/entry/18467/images/180619_WebGPU_ComputeShader_bitonicsort_visualization_demo.gif)  
▲ランダムな要素が「バイトニックソート」アルゴリズムでソートされていく様子を可視化したデモ。ソートの計算とレンダリングにWebGPUを使用している

### コンピュートシェーダーとはGPGPUを行うためのシェーダー

GPU（グラフィックス・プロセッシング・ユニット）はもともと画面の描画に最適化されたプロセッサーでした。ディスプレイの各ピクセルの色を計算するために大量のデータに対して並列に単純な計算ができるよう設計されていたためです。近年になってGPUの演算性能の向上に伴い、**GPUを画面描画以外の汎用的な計算に使おう**という流れが出てきました。これをGPGPU（ジーピージーピーユー）といいます。現在、GPGPUは物理シミュレーションや機械学習、暗号通貨の発掘などさまざまな用途で計算に使われています。

コンピュートシェーダーはGPGPUのためのシェーダーで、**GPUの演算性能を活かして高速に数値計算をする**ために追加されました。一般的な3DグラフィックスAPIの他のシェーダーと比較すると次のような用途の違いがあります。

-   グラフィックスAPIのシェーダー
    -   頂点シェーダー： 頂点の座標を計算するためのシェーダー
    -   フラグメントシェーダー： ピクセルの色を計算するためのシェーダー
-   コンピュートシェーダー： 汎用的な計算をするためのシェーダー

[W3C Web Community GroupによるWebGPUの憲章](https://gpuweb.github.io/admin/cg-charter.html)に「より現代的なAPIによって提供され、多くのデバイスで利用可能なGPUの計算機能を提供するAPI」とある通り、WebGPUではGPUの計算機能を利用できるAPIとしてコンピュートシェーダーが提供（提案）されています。

### WebGLのGPGPUとの違い

WebGLでもGPGPUは可能です。記事「[サンプルで理解するWebGL 2.0 – Transform Feedbackによるパーティクル表現](https://ics.media/entry/17505/)」でもTransform Feedbackを使ったGPGPUについて紹介しました。WebGPUのコンピュートシェーダーはそれと比べて何が違うのでしょうか？

#### WebGLでのGPGPU利用方法① Transform Feedback機能を使う方法

WebGLでGPGPUを行う方法は2つあります。1つがWebGL 2.0のTransform Feedback機能を使用した頂点シェーダーでのGPGPUです。頂点シェーダーは頂点単位でシェーダーが実行されるため、並列動作させたい数の頂点を用意する必要があります。そして、この頂点ごとに与えられたデータに対してのみ読み書きできます。他の頂点の情報は取得できないため、頂点同士の相互作用の計算などはできません。

#### WebGLでのGPGPU利用方法② テクスチャーへのオフスクリーンレンダリング

もう1つがテクスチャーへのオフスクリーンレンダリングを使用したフラグメントシェーダーでのGPGPUです。フラグメントシェーダーはピクセル単位でシェーダーが実行されるため、並列動作させたい数のピクセルを描くように三角形を描画する必要があります。また、入出力のデータをテクスチャーとして用意する必要があり、データの取り回しが複雑になります。

#### WebGPUのコンピュートシェーダーに期待できること

WebGLでは①②のどちらの場合でも、元々グラフィックスAPIとして用意されたシェーダーを本来の用途とは違う使い方で使用することになります。そのため汎用計算に使おうとするとコードとしての見通しが良くなく、機能に制限があります。これに対して、WebGPUのコンピュートシェーダーは「スレッド」という単位でシェーダーが実行されます。**コンピュートシェーダーは元々GPGPU用に設計されているため、任意の数のスレッドを簡単に実行でき、柔軟にデータの入出力ができます。**

### コンピュートシェーダーでできること

GPUの特性から、**コンピュートシェーダーは大量のデータの並列計算を得意**としています。計算の内容によっては**CPUで計算するより何倍も高速に動作**します。WebGPUはグラッフィクスAPIですが、グラフィックスを表示せず、単純に計算目的での使用も可能です。

2018年現在、最新の通常版Safari（macOSとiOSともに）で使用できるプロトタイプのWebGPUにはコンピュートシェーダーもすでに実装されています。このコンピュートシェーダー機能を使用したWebGPUのデモを作成したので紹介します。

※ WebGPUはSafariで開発者メニューより有効にすることで試せます。設定の詳しい手順は記事「[次世代仕様のWebGPUとは？　次期macOSでのOpenGL非推奨化はWebGLに影響をもたらすのか](https://ics.media/entry/18412/)」を参照ください

#### コンピュートシェーダーによるソート計算

まずは純粋にコンピュートシェーダーのみを使用したデモです。ランダムな要素の配列を生成し、JavaScript標準の`sort()`関数でCPUを使ってソートした場合の実行時間と、コンピュートシェーダーでGPUを使ってソートした場合の実行時間とを比較します。

[![WebGPのコンピュートシェーダーを使ったバイトニックソートのデモ](https://ics.media/entry/18467/images/180619_WebGPU_ComputeShader_bitonicsort_demo.png)](https://ics-creative.github.io/180619_WebGPU_ComputeShader/webgpu-computeshader-bitonicsort/dist/)

-   [デモを別ウインドウで再生する  
    （SafariでWebGPUを有効にしてご覧ください）](https://ics-creative.github.io/180619_WebGPU_ComputeShader/webgpu-computeshader-bitonicsort/dist/)
-   [ソースコードを確認する](https://github.com/ics-creative/180619_WebGPU_ComputeShader/tree/master/webgpu-computeshader-bitonicsort)

コンピュートシェーダーでのソートには「バイトニックソート」を実装しました。バイトニックソートは並列計算に適したソートアルゴリズムです。デモではソートする要素の数が少ない場合はCPUのほうが速く、要素数が多くなるとGPUのほうが速くなりました。筆者の環境では要素数が多い場合、**デスクトップPCでは2倍強、モバイルでは10倍以上**コンピュートシェーダーでのGPUの計算のほうが速くなりました。このことからわかるように、**コンピュートシェーダーを使うと大量のデータの並列計算を大きく高速化できます。**

#### コンピュートシェーダーと3Dレンダリングを組み合わせる

コンピュートシェーダーはGPU上のメモリからデータを読み込んで計算し、更新します。そのためGPU上のメモリからデータを読み込んで頂点やピクセルの計算をする**3D表現とも相性がよく**、コンシューマゲームでもパーティクル表現などに使用されています。

次のデモはバイトニックソートをWebGPUのコンピュートシェーダーでステップ実行し、ソートされていく様子をcanvas要素にWebGPUのレンダリングで表示しました。

[![WebGPUを使ったバイトニックソートの可視化のデモ](https://ics.media/entry/18467/images/180619_WebGPU_ComputeShader_bitonicsort_visualization_demo.png)](https://ics-creative.github.io/180619_WebGPU_ComputeShader/webgpu-bitonicsort-visualization/dist/)

-   [デモを別ウインドウで再生する  
    （SafariでWebGPUを有効にしてご覧ください）](https://ics-creative.github.io/180619_WebGPU_ComputeShader/webgpu-bitonicsort-visualization/dist/)
-   [ソースコードを確認する](https://github.com/ics-creative/180619_WebGPU_ComputeShader/tree/master/webgpu-bitonicsort-visualization)

バイトニックソートアルゴリズムの特徴である「昇順と降順の山が交互に並び、マージされていく」様子が可視化されています。約26万個の頂点を描画していますが、WebGPUで大量の頂点を高速に描画できることがわかります。

### コンピュートシェーダーの使い方

WebGPUでのJavaScript側のコンピュートシェーダーの呼び出し方法は現状下記のようになっています。**コンピュートシェーダーで使用する関数とデータを設定し、起動させるスレッドの数を指定するだけで簡単に実行できます。**

```
// シェーダーのソースコードからシェーダーライブラリを作成する
const library = webgpuContext.createLibrary(myShaderSource);

// コンピュートシェーダーで実行するカーネル関数を取得する
const kernelFunction = library.functionWithName('myKernelFunction');

// カーネル関数を指定してコンピュートシェーダーの設定を作成する
const computePipelineState = webgpuContext.createComputePipelineState(kernelFunction);

// GPUに実行させるコマンドを作成する
const computeCommandEncoder = myCommandBuffer.createComputeCommandEncoder();

// コンピュートシェーダーで実行する設定（カーネル関数）をコマンドに指定する
computeCommandEncoder.setComputePipelineState(computePipelineState);

// 計算に使用するデータ領域を確保する
const dataBuffer = webgpuContext.createBuffer(myArray);

// カーネル関数で使用するデータをコマンドに指定する
computeCommandEncoder.setBuffer(dataBuffer, 0, 0);

// スレッドグループの数を指定する
const threadgroupsPerGrid = {
  width: 32,
  height: 1,
  depth: 1
};

// スレッドグループ内のスレッド数を指定する
const threadsPerThreadgroup = {
  width: 1024,
  height: 1,
  depth: 1
};

// カーネル関数を実行する（コンピュートシェーダーの起動命令）
computeCommandEncoder.dispatch(threadgroupsPerGrid, threadsPerThreadgroup);

// コンピュートシェーダーのコマンドをエンコードする
computeCommandEncoder.endEncoding();
```

シェーダーのコードは頂点シェーダーやフラグメントシェーダーと同じく、専用のシェーディング言語で記述します。簡単な例として、読み込んだデータに1.0を加算するコードは下記のようになります。

```
// [MSL]
kernel void myKernelFunction(device float *data [[buffer(0)]],
                              uint threadId [[thread_position_in_grid]])
{
  // GPU上のメモリからスレッドごとに値を読み込む
  float value = data[threadId];

  // 値を計算する
  value += 1.0;

  // GPU上のメモリに計算結果を書き込む
  data[threadId] = value;
}
```

ここでポイントとなるのは、引数として与えられたGPUメモリ上の`data`配列に対し、**任意のデータ（インデックス）にアクセスできる**ことです。上記の例では`threadId`という、スレッドごとに与えられる番号をインデックスとして配列のデータにアクセスしています。しかし、必ず`threadId`のインデックスにアクセスする必要はなく、隣の要素（`data[threadId + 1]`）にアクセスするのも遠くの要素（`data[threadId + 128]`）にアクセスするのも自由です。

※ 与えられたデータ配列の任意のデータにアクセスできることはコンピュートシェーダーに限った話ではなく、WebGPUでは頂点シェーダーでもフラグメントシェーダーでも可能です

もうひとつのポイントは読み込んだデータ配列の値を計算し、そのまま同じ配列に書き込んでいることです。WebGPUでは**データの入力と出力を同じ領域に対して行える**ため、WebGLのように入力用の領域と出力用の領域を用意する必要がありません。入出力の領域を共通化することでメモリを節約できますし、コードの見通しもよくなります。

※ 入力データへの出力は、スレッド間の任意の位置への配列アクセスと組み合わせると、実行タイミングによってはデータの不整合を引き起こす可能性があります。WebGPUではシェーダーでの自由度が上がった分、**開発者の裁量で意図しない不整合を管理する必要**がでてきます

### WebGLにコンピュートシェーダーは来ないのか？

#### OpenGLにもコンピュートシェーダーが存在する

OpenGLではバージョン4.3からコンピュートシェーダーがサポートされており、派生規格であるOpenGL ESでもバージョン3.1から使用できます。WebGLにおいては、**最新のWebGL 2.0ですらOpenGL ES 3.0の派生規格であるためコンピュートシェーダーは現状サポートされていません。**

クロノスグループによるWebGL 2.0 策定時の記事[WebGL 2.0 Arrives](https://www.khronos.org/blog/webgl-2.0-arrives)によると、今後の展望として拡張機能としてのコンピュートシェーダーの提供を予定しているとのことです。なぜ必須の仕様ではなく、拡張機能としての提供なのでしょうか？

※ WebGLではいくつかの機能について、必須の仕様ではなく拡張機能して提供されます。拡張機能を実装するかどうかはブラウザベンダー任せになります。開発者は拡張機能を使用したい場合、JavaScriptを実行しているブラウザがその拡張機能を使用できるかをチェックしなくてはなりません。当然、使用できないブラウザもあるため、幅広いターゲットを求められるウェブコンテンツでは、ブラウザの実装率が低い拡張機能の使用は見送らざるをえない場合もあります

#### AppleはOpenGLのコンピュートシェーダーをサポートしていない

その鍵はAppleにありました。WebGL 2.0の次の仕様について議論する[メールスレッド](https://www.khronos.org/webgl/public-mailing-list/public_webgl/1706/msg00034.php) に、「macOSおよびiOSがコンピュートシェーダーをサポートしているOpenGLのバージョンに対応していないため、標準仕様としてではなく、Windows/Linux/Android向けの拡張機能を検討している」とあります。

Appleの[MacコンピューターがサポートするOpenGLのバージョン表](https://support.apple.com/ja-jp/HT202823)によると、確かにmacOSがサポートするOpenGLのバージョンは最新でも4.1となっており、コンピュートシェーダーはサポートされていません。iOSに関しても、[OpenGL ES Framework Reference](https://developer.apple.com/documentation/opengles)によると、提供するOpenGL ESの  
バージョンは1.1、2.0および3.0とあり、コンピュートシェーダーをサポートしていません。

[![AppleのOpenGLの対応状況](https://ics.media/entry/18467/images/180619_WebGPU_ComputeShader_opengl_overview.png)](https://ics.media/entry/18467/images/180619_WebGPU_ComputeShader_opengl_overview.png)

#### WebGLでコンピュートシェーダーが使える日は来ないかもしれない

WWDC 18で発表された次期macOS 10.14とiOS 12では、AppleはOpenGL/OpenCLおよびOpenGL ESを非推奨とし、Metalへの置き換えを推奨しています。今後、コンピュートシェーダーに対応したOpenGL/OpenGL ESをmacOS/iOSでサポートするとは考えにくく、バックエンドでOpenGLを使用しているWebGLでもコンピュートシェーダーが使用できるようになるかは不透明です。

### 終わりに

WebGPUのコンピュートシェーダーはWebGLを扱ってきた人にとって垂涎ものの機能だと思います。**この機能を利用すれば今まで純粋な描画用シェーダーだけでは実現できなかったアレやコレがウェブでできる・・・**と広がる夢もたくさんあるでしょう。残念ながらWebGPUは現在提案段階であり、標準で使用できるようになる日はまだまだ遠いのが現状です。やがてくるその日を楽しみに待ちましょう。

また、純粋なウェブ技術とは少し離れますが、MetalやVulkan、Direct3D 12などモダンな3DグラフィックスAPIには当然コンピュートシェーダーが実装されています。これらを勉強してWebGPUに備えておくのもいいかもしれません。

WebGPUに関する記事は3部連載になっています。ぜひ続編もご覧ください。

1.  [次世代仕様のWebGPUとは](https://ics.media/entry/18412/)
2.  WebGPUのコンピュートシェーダーで高速並列計算（いまここ）
3.  [WebGPUの描画機能はWebGLと何が違うのか](https://ics.media/entry/18507/)

追記：2023年4月、WebGPUがChrome 113で搭載されました。詳細は記事『[WebGPUがついに利用可能に - WebGL以上の高速な描画と、計算処理への可能性](https://ics.media/entry/230426/)』をご覧ください。