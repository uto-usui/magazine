---
title: "次世代のWebGPUの可能性 - WebGLと比較して理解する描画機能の違い"
source: "https://ics.media/entry/18507/"
publishedDate: "2018-06-27"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

ウェブの3Dグラフィックスを扱う新しい仕様として提案されているWebGPU。[前回の記事](https://ics.media/entry/18467/)ではGPGPU（GPUによる汎用計算）用の機能、「コンピュートシェーダー」について紹介しました。

一方、WebGPUの描画機能については何ができるのでしょうか？　WebKitの実験ページ「[WebGPU demos](https://webkit.org/demos/webgpu/)」にWebGPUを使用したデモが示されていますが、これだけではいまいちWebGPUのポテンシャルを量ることができませんでした。そこで、WebGPUの描画機能について可能性を探るべく、WebGPUとWebGLを比較するデモを作ってみました。

WebGPUについて詳しくは以前の記事「[次世代仕様のWebGPUとは？](https://ics.media/entry/18412/)　」をご覧ください。

### WebGPUの描画デモ

3Dモデルを読み込んで、canvas要素にWebGPUのレンダリングで表示するデモです。それぞれのモデルは独立に回転しており、いわゆるドローコール（描画命令）はモデルの数だけ呼ばれています。

WebGPUには、WebGLでいうThree.jsやBabylon.jsのようなJSライブラリが現時点で存在しません。そのため、**3D空間やモデル（glTF）の読み込みは、WebGPUのAPIを直接利用して実現しています**。

[![WebGPUを使った描画デモ](https://ics.media/entry/18507/images/180626_WebGPU_Demo_world_demo.png)](https://ics-creative.github.io/180622_WebGPU_Demos/webgpu-world/dist/)

-   [デモを別ウインドウで再生する  
    （SafariでWebGPUを有効にしてご覧ください）](https://ics-creative.github.io/180622_WebGPU_Demos/webgpu-world/dist/)
-   [ソースコードを確認する](https://github.com/ics-creative/180622_WebGPU_Demos/tree/master/webgpu-world)

### WebGLの描画デモ

上記のWebGPUのデモとまったく同じ内容をWebGLで表現しました。Three.jsのようなJSライブラリは利用せず、WebGLのAPIを直接呼んで実装しています。こちらもドローコールはモデルの数だけ呼ばれています。

[![WebGLを使った描画デモ](https://ics.media/entry/18507/images/180626_WebGPU_Demo_world_demo.png)](https://ics-creative.github.io/180622_WebGPU_Demos/webgl-world/dist/)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180622_WebGPU_Demos/webgl-world/dist/)
-   [ソースコードを確認する](https://github.com/ics-creative/180622_WebGPU_Demos/tree/master/webgl-world)

### WebGPUとWebGLで3D APIとしての考え方はほぼ同じ

WebGLと比較すると、WebGPUは頂点の作り方や概念は同じでした。シェーダーについても言語こそ違うものの、**考え方としては大きく違いはありませんでした**。シェーダーとデータの結びつきはWebGLよりWebGPUのほうがすっきりしており、API操作として簡単な印象を受けました。

設計思想としての違いはあり、WebGLでは描画のたびに状態をひとつずつ設定していく必要があります。これに対し、WebGPUは描画の設定や状態を保存するオブジェクトをあらかじめ作って描画時にまとめて設定できます。これにより**あらかじめ状態の検証ができるため、描画時のコストを抑えられる**とのことです。

興味のある方はぜひ両者のソースコードを見比べてみてください。[GitHub](https://github.com/ics-creative/180622_WebGPU_Demos)にてソースコードを公開しています。

※ WebGPUのAPIはまだ提案段階であり、現状はMetalをJavaScript用にマッピングをしただけのもののため、今後VulkanやDirect3D 12の設計を取り込んで変更される可能性があります

### WebGPUのほうが性能が高い？

筆者のデスクトップマシンでは、WebGPUのデモでは6000個のモデルを表示しても60FPSを保っていましたが、WebGLのデモでは55FPS前後まで落ちました。モバイルでは、WebGPUのデモでは2000個のモデル表示まで60FPSを保っていましたが、WebGLでは1500個までしか60FPSで表示できませんでした。このデモではデスクトップ、モバイルのどちらもWebGPUのほうが少し描画性能が高い結果になりました。

WebGPUはWebGLと比べてAPIのオーバーヘッドを減らすよう設計されているとのことですので、同じドローコール数の描画でもその差がでたのかもしれません。

※ それぞれ以下の環境で確認しました。

-   デスクトップ：iMac 2017（Intel Core i7 4.2GHz, Radeon Pro 580）/ Safari 11.1.1
-   モバイル：iPhone X / Mobile Safari 11.0

### WebGPU APIには未実装の項目も

WebGPUのAPIは、[WebGPU API Proposal](https://webkit.org/wp-content/uploads/webgpu-api-proposal.html)にてWebKitから仕様の提案がされています。しかし、2018年6月現在、唯一WebGPUが動作するSafariでも実装されていないAPIも多くあります。たとえば大きなところでは、テクスチャーをシェーダーに渡すAPIである`WebGPURenderCommandEncoder.setFragmentTexture()`が実装されていないため、テクスチャーマッピングができません。

そこで、WebGPUで擬似的にテクスチャーマッピングできるデモを作ってみました。

[![WebGPUを使った疑似テクスチャーマッピングのデモ](https://ics.media/entry/18507/images/180626_WebGPU_Demo_texture_demo.png)](https://ics-creative.github.io/180622_WebGPU_Demos/webgpu-texture/dist/)

-   [デモを別ウインドウで再生する  
    （SafariでWebGPUを有効にしてご覧ください）](https://ics-creative.github.io/180622_WebGPU_Demos/webgpu-texture/dist/)
-   [ソースコードを確認する](https://github.com/ics-creative/180622_WebGPU_Demos/tree/master/webgpu-texture)

画像を2D canvasに描画してRGB値の配列を取得し、`WebGPURenderCommandEncoder.setFragmentBuffer()`でデータ配列としてシェーダーに渡します。シェーダー内でUV座標に応じたRGB値をデータ配列から読み込み、ピクセルカラーとして表示しています。**要は正攻法が使えないので、回りくどいことをして実現しています**。

テクスチャーマッピングの他にも背面カリング（三角形ポリゴンがカメラから見て裏側を向いている場合に描画を省く処理）やブレンディング（色を塗る際に元のピクセルの色と混合する処理。半透明表現や加算表現に必要）など、3D APIとして必要な機能のいくつかが提案はされていますが実装されていない状態です。**WebGPUの策定、普及については年単位の長いスパンで見守る必要がありそうです**。

### 終わりに

前回、今回とWebGPUを試してみて、**機能と性能の両方について向上が期待できるWebGPUに確かな可能性を感じました**。この記事を通して少しでもWebGPUを試してみようという人が増えると嬉しく思います。開発者の熱が伝われば仕様の策定や各ブラウザの実装が加速するかもしれません。

筆者はFlashのStage3D（Flash PlayerやAdobe AIRからOpenGL/DirectXを利用できる技術）ではじめて3D APIに触れました。**その時学んだ3D APIの概念はWebGLを学ぶときに大いに役に立ち、スムーズに理解する助けとなりました**。そして今回、WebGPUにおいても情報が少ない中ですんなりと使い方や仕様を理解できました。

**3D APIの概念は一度わかるとさまざまな言語に応用が効く知識**だと思います。Three.jsなどのライブラリを使用する場合でも、ライブラリ内部で何をやっているのかを知ることで、パフォーマンスのチューニングや機能を拡張する際の助けになります。

来たる次世代の3D API、WebGPUに向けて、今から学ぶのであれば**情報が充実してきているWebGLをオススメします**。ぜひ3D APIにチャレンジしてみませんか？

WebGPUに関する記事は3部連載になっています。ぜひ前回の記事もご覧ください。

1.  [次世代仕様のWebGPUとは](https://ics.media/entry/18412/)
2.  [WebGPUのコンピュートシェーダーで高速並列計算](https://ics.media/entry/18467/)
3.  WebGPUの描画機能はWebGLと何が違うのか（いまココ）

追記：2023年4月、WebGPUがChrome 113で搭載されました。詳細は記事『[WebGPUがついに利用可能に - WebGL以上の高速な描画と、計算処理への可能性](https://ics.media/entry/230426/)』をご覧ください。