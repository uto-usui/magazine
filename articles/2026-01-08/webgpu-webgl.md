---
title: "WebGPUがついに利用可能に - WebGL以上の高速な描画と、計算処理への可能性"
source: "https://ics.media/entry/230426/"
publishedDate: "2023-05-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

次世代WebグラフィックスのJavaScript APIである**WebGPU（ウェブジーピーユー）**が注目を集めています。ICS MEDIAでは2018年に[WebGPUについて紹介](https://ics.media/entry/18412/)していましたが、当時はSafariで開発者向けのフラグを有効にした場合にのみお試しできる実験的機能でした。

WebGPUが一般ユーザーの環境でも動作できるようになったいま、オリジナルのデモを交えてあらためてWebGPUを紹介します。

**この記事で紹介すること**

-   WebGPUがChrome・Edge 113（2023年5月）、Safari 26.0（2025年9月）で利用可能になった
-   WebGPUはモダンな3D APIに直接アクセスすることで、WebGLより高い性能が得られる
-   WebGPUだとドローコールの最適化をしなくても十分に高速
-   WebGPUはコンピュートシェーダーが使え、汎用計算にも応用できる
-   WebGPU対応のJavaScriptライブラリも出揃いつつある

### WebGPUとは

WebGPUは、ウェブブラウザ向けの次世代のグラフィックスおよび計算APIです。現在、ウェブの3D表現や高パフォーマンスを求める2D表現では、多くのコンテンツでWebGLが使われていますが、WebGPUはWebGLの後継となりうる技術です。WebGLをより効率的かつパワフルに置き換えることを目的として、W3Cによって策定が進められています。

WebGPUは、Direct3D 12（Windows）、Metal（macOS、iOS）、Vulkanヴァルカン（Android）といった**モダンでよりGPUのネイティブに近い3D APIに直接アクセスすることで、高いパフォーマンスと効率を実現**します。

### WebGPUはじめの一歩

最初に単純な三角形を描画してみます。3Dでは定番のHello Worldみたいなものですね。`canvas`タグにWebGPUのレンダリングで表示しています。WebGPUにトライしてみようという方はぜひソースコードをご覧ください。メインの処理は130行ほどのJavaScriptです。

[![WebGPUを使った単純な三角形の描画デモ](https://ics.media/entry/230426/images/230426_webgpu_helloworld.png)](https://ics-creative.github.io/230426_webgpu_demo/hello-webgpu/)

-   [デモを別タブで再生する （最新版のChromeなどWebGPUが有効な環境でご覧ください）](https://ics-creative.github.io/230426_webgpu_demo/hello-webgpu/)
-   [ソースコードを確認する](https://github.com/ics-creative/230426_webgpu_demo/blob/main/hello-webgpu/script.js)

APIの使用方法はWebGLとは違う点がいくつかあるものの、三角形を描画するだけであれば比較的単純なコードで実現可能です。新しい概念を学ぶときは、まずは単純化し、一歩ずつステップアップしていくことは重要です。

### WebGPUの描画性能

WebGPUの描画性能を紹介します。次のデモは、WebGPUで3Dシーン内にたくさんのオブジェクトを配置した場合に、パフォーマンスにどう影響するのかを模しています。

▼WebGPU版デモ

[![WebGPUを使った描画デモ](https://ics.media/entry/230426/images/230426_WebGPU_Demo_world_demo.png)](https://ics-creative.github.io/230426_webgpu_demo/webgpu-world/)

-   [デモを別タブで再生する （最新版のChromeなどWebGPUが有効な環境でご覧ください）](https://ics-creative.github.io/230426_webgpu_demo/webgpu-world/)
-   [ソースコードを確認する](https://github.com/ics-creative/230426_webgpu_demo/blob/main/webgpu-world/script.js)

3Dモデルは単一のものを使用していますが、それぞれのモデルは独立にパラメーター制御（回転）をしており、いわゆるドローコール（描画命令）はモデルの数と同じ回数呼びだしています。

WebGLで開発をしたことがある人は、ドローコールが大量に発生すると、パフォーマンスが低下しがちになることを知っていると思います。しかし、デモを実際に試してみると、環境にもよりますが数千回のドローコールでも安定して実行できています。**WebGPUは、ドローコール呼び出し自体の負荷がWebGLよりも低くなります**。

#### WebGLとWebGPUの比較

比較のため、同じ内容のデモをWebGLで作成しました。WebGPUとWebGLで実行性能の違いはあるのでしょうか？

▼WebGL版デモ（比較用）

[![WebGLを使った描画デモ](https://ics.media/entry/230426/images/230426_WebGPU_Demo_world_demo.png)](https://ics-creative.github.io/180622_WebGPU_Demos/webgl-world/dist/)

-   [デモを別タブで再生する](https://ics-creative.github.io/180622_WebGPU_Demos/webgl-world/dist/)
-   [ソースコードを確認する](https://github.com/ics-creative/180622_WebGPU_Demos/tree/master/webgl-world)

右上のスライダーで描画するモデルの数を変更したときの、それぞれのデモでフレームレートを確認ください。**WebGPUのデモのほうが、60FPSを保ったまま描画できるモデルの数が多くなっている**と思います。

2つのデモで、3Dモデルを一定数表示したときのフレームレートはそれぞれ下記の結果になりました。1万回のドローコールを行うと、WebGLのデモでは30FPSにまで落ちているのに対し、WebGPUのデモでは50FPS近い値がでています。個数を増やしていっても一貫してWebGPUのほうがパフォーマンスがでていました。

![](https://ics.media/entry/230426/images/230426_draw_result.png)

▲数値が高いほどパフォーマンスが良好なことを示します。青がWebGPU、オレンジがWebGLです。

検証環境： Chrome 113.0.5672.53 / macOS 13.3.1 / MacBook Air M1, 2020

#### コラム： なぜWebGPUのほうが高速に実行できるのか？

（WebGLの開発経験者向けのコラムです）

WebGLでは、ドローコール実行時にそれまでに`WebGLRenderingContext`に設定された各種ステート（描画時の設定等）の検証のため、CPUでの負荷が大きくなっていました。対してWebGPUでは、実行に必要な各種ステートをあらかじめ設定する「パイプライン（描画時は`GPURenderPipeline`）」と呼ばれるオブジェクトを作成します。ステートの検証は作成時点で行うため、**実際のドローコール実行時の負荷を大きく軽減できる**メリットがあります。

また、描画設定のバリエーションごとに別個のパイプラインを事前に作成する必要があるものの、パイプラインの切り替え自体は一度のAPI呼び出しで完結します。WebGLではステートを変更するAPIが設定ごとに個別に別れているため、1度の画面更新でオブジェクトごとに描画設定を変えようとすると切り替えのAPI呼び出しが多くなり、これも負荷の原因となっています。

まとめると、**WebGPUのパイプラインは描画や計算に実行に必要な設定をすべて詰め込んであるため、描画時の検証や設定の切り替えがWebGLと比べて低負荷です**。

※頂点の座標やシェーダーで使用する定数などの実際のデータはパイプラインに含めません。これらのデータに関してパイプラインに含めるのは頂点や定数のフォーマットや使用方法のみのため、検証を高速化しつつ、実データは柔軟に設定変更できます。たとえば同じシェーダー、描画設定であれば1つのパイプラインを使用して頂点バッファーとテクスチャのみを切り替えて複数のモデルを描画できます。

※WebGLで一度に大量の同一オブジェクトを描画する場合、[ジオメトリインスタンシング](https://ics.media/entry/16060/)機能を使用するとドローコールの呼び出し回数を抑えてパフォーマンスを大きく改善できます。今回のデモでは、負荷をみるためあえてこの最適化は行わず、愚直にドローコール呼び出しをしています。また、もちろんWebGPUでもジオメトリインスタンシング機能は利用できます。

### WebGPUで新たに使用できるようになるコンピュートシェーダー

WebGLと比べて、WebGPUで新たに使用できるようになった大きな機能の1つは**コンピュートシェーダー**といえるでしょう。コンピュートシェーダーはGPGPUジーピージーピーユー（GPUを使用した汎用計算）のためのシェーダーで、**GPUの演算性能を活かして高速に数値計算を実行できます**。

ここ数年のコンピューター技術の話題をふりかえると、AI（人工知能）の分野でGPUが使用されています。また、暗号通貨の採掘のためにグラフィックスボードの需要が高まった結果売り切れてしまうなど、GPGPUはすでに身近なものになっていることがわかるでしょう。もちろんコンピュートシェーダーは3D描画で使用するオブジェクトの座標や状態の計算にも活用できます。

#### コンピュートシェーダーのデモ

WebGPUのコンピュートシェーダーを使用して「バイトニックソート」を行うデモを作成しました。ランダムな要素の配列を生成し、JavaScript標準の`sort()`関数でCPUを使ってソートした場合の実行時間と、コンピュートシェーダーでGPUを使ってソートした場合の実行時間とを比較します。

下記のデモを実際に試してみましょう。要素数が少ないときはCPUのほうが実行時間が短いのですが、**要素数が大きくなると速度は逆転し、GPUでの実行がCPUに大差をつけて高速になる**ことがわかります。

[![WebGPUのコンピュートシェーダーを使ったバイトニックソートのデモ](https://ics.media/entry/230426/images/230426_WebGPU_ComputeShader_bitonicsort_demo.png)](https://ics-creative.github.io/230426_webgpu_demo/compute-bitonicSort/)

-   [デモを別タブで再生する （最新版のChromeなどWebGPUが有効な環境でご覧ください）](https://ics-creative.github.io/230426_webgpu_demo/compute-bitonicSort/)
-   [ソースコードを確認する](https://github.com/ics-creative/230426_webgpu_demo/blob/main/compute-bitonicSort/script.js)

バイトニックソートは並列計算に適したソートアルゴリズムです。GPUは並列計算が得意なので、コンピュートシェーダーを使用して並列計算することで、効率的にソートを実行できます。

※バイトニックソートはソートする要素数が2の累乗でないと適用できない制約があるため、場合によってはダミーデータの追加が必要です

#### CPUとWebGPUの計算時間の比較

CPUとGPUそれぞれのソート実行時間は、要素数に対して下記の結果になりました。グラフ上で、WebGPU（青の線）は4096要素以下ではCPU（緑の先）より少しだけ上になっており、時間がかかっています。しかし要素数が増えるにつれて実行時間は逆転し、その差は大きく開いていきます。CPUでの実行は指数関数的に処理時間が増大しているのに対し、WebGPUの方は30ミリ秒以下のまま線形での増加で落ち着いていることがわかります。

![](https://ics.media/entry/230426/images/230426_compute_result.png)

▲数値が低い方が良好な成功です。青がWebGPU、緑がCPUです。

検証環境： Chrome 113.0.5672.53 / macOS 13.3.1 / MacBook Air M1, 2020

#### コラム： なぜ要素数が少ないとCPUのほうが高速に実行できるのか？

GPUでのソート実行時間の計測には、GPUにソート対象のデータを転送し、ソート実行後にまたCPUに戻す時間も含まれています。要素数が少ないうちは、転送時間やGPUに命令をするためのオーバーヘッドのぶんGPUでの実行のほうがCPUより時間がかかるようです。要素数が多くなるとオーバーヘッドを補ってあまりある計算能力で速度が逆転していると考えられます。

このことからわかるように、**コンピュートシェーダーを使うと大量のデータの並列計算を大きく高速化できます**。

### WebGPUの現在の実装状況

2025年4月現在、ChromeのWebGPU実装はAPI仕様のほとんどが動作します。WebGL、さらにはWebGL 2で作成できるものと同じ表現をWebGPUの新しいAPIを使用して再現できます。

試しに、[ICS MEDIAで以前紹介](https://ics.media/entry/17120/)したWebGL 2のMRT（マルチプル・レンダー・ターゲッツ）機能を使用したデモをWebGPU向けにリプレースしてみました。ディファードレンダリングという手法で、3Dシーンに多数のライトを配置してライティング表現を行っています。

[![WebGPUでMultiple Render Targetsを使用した描画デモ](https://ics.media/entry/230426/images/230426_webgl2_mrt_demo_play.png)](https://ics-creative.github.io/230426_webgpu_demo/mrt-gbuffer/)

-   [デモを別タブで再生する （最新版のChromeなどWebGPUが有効な環境でご覧ください）](https://ics-creative.github.io/230426_webgpu_demo/mrt-gbuffer/)
-   [ソースコードを確認する](https://github.com/ics-creative/230426_webgpu_demo/blob/main/mrt-gbuffer/script.js)

一例ですが、WebGLに対してWebGPUが同じ表現を再現できるAPIであることを示しています。

#### 各ブラウザのWebGPU対応状況

Chrome以外の各ブラウザでもWebGPUの実装は進んでいます。2025年4月現在の主要ブラウザの対応状況をみてみましょう。

Chrome

-   Chrome 113よりデフォルトで使用できるようになりました。
    -   ただしLinuxでは利用できません。

Edge

-   Edge 113よりデフォルトで使用できるようになりました。

Safari / Safari on iOS

-   2025年9月リリースのSafari 26.0から利用できます。
-   以前は「WebMetal」フラグを有効化することで、**古い仕様**のWebGPU APIが使用できました。現在このフラグはなくなっています。

Firefox

-   2025年7月リリースのFirefox 141からWebGPUを使用できます。
    -   ただしWindowsのみです。

Chrome for Android

-   Chrome 121よりデフォルトで使用できるようになりました。

#### ライブラリのWebGPU対応状況

今回のデモはライブラリを使用せずにネイティブのJavaScript APIとWGSLシェーディング言語を使用してスクラッチで実装しました。多くの方はライブラリを使用してコンテンツを開発しているので、ライブラリの動向が気になると思います。

以下の主要なWebGLの3D描画ライブラリでは、すでにWebGPUを使用可能です。

-   [Three.js](https://threejs.org/examples/?q=webgpu#webgpu_particles): 実験的機能として使用可能
-   [Babylon.js](https://doc.babylonjs.com/setup/support/webGPU): 一部機能を除き対応が完了しており、使用可能（[詳細](https://doc.babylonjs.com/setup/support/webGPU/webGPUStatus)）

Three.jsでのWebGPU対応の方法については、ICS MEDIAでも[Three.jsのWebGPURendererの使い方](https://ics.media/tutorial-three/webgpu_renderer/)で紹介していますので参考ください。

![Three.jsのexamplesに掲載されているWebGPUデモ](https://ics.media/entry/230426/images/230426_threejs_webgpu.png)

▲Three.jsで動作する[WebGPUのサンプル](https://threejs.org/examples/#webgpu_cubemap_adjustments)。WebGPUの対応は各ライブラリでも進められている

2D描画ライブラリの[PixiJS](https://pixijs.com/)では、2024年3月にリリースされたv8でWebGPUがサポートされています。また、描画ライブラリではありませんが、JavaScriptで機械学習を実行できる[TensorFlow.js](https://github.com/tensorflow/tfjs/tree/master/tfjs-backend-webgpu)でもWebGPUをバックエンドに使用して高速化するオプションを選択できるようです。

多くのユーザーが恩恵を受けることになるこれらのライブラリでの使い方も、今後ICS MEDIAで紹介していければと思いますのでぜひ今後の動向もチェックしてみてください。

### おわりに

WebGLを策定しているのはKhronos Group（クロノスグループ）ですが、WebGPUはW3Cが策定しています。WebGPUのW3C上の勧告プロセスでは2025年4月時点でまだCandidate Recommendation Draftであり、正式勧告までは時間がかかりそうです。

Chrome・Edge以外のブラウザでも開発者版を使用したり、フラグを設定することによって機能を試せます。フィードバックやバグ報告することもWebGPUの標準化の助けになります。皆さんもまずはWebGPUを使ってみましょう！

### 参考文献

-   [WebGPU | W3C](https://www.w3.org/TR/webgpu/)
-   [WebGPU Shading Language | W3C](https://www.w3.org/TR/WGSL/)
-   [WebGPU Explainer | gpuweb](https://gpuweb.github.io/gpuweb/explainer/)
-   [WebGPU API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
-   [Chrome ships WebGPU - Chrome Developers](https://developer.chrome.com/blog/webgpu-release/)
-   [WebGPU Logo | gpuweb](https://github.com/gpuweb/gpuweb/tree/main/logo)