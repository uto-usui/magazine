---
title: "サンプルで理解するWebGL 2.0 – Multiple Render Targetsによる動的なライティング表現"
source: "https://ics.media/entry/17120/"
publishedDate: "2018-02-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

ブラウザからハードウェアアクセラレーションを使用してリッチな表現を実現できるWebGL。その新たなバージョンであるWebGL 2.0はChromeとFirefoxで標準で利用でき、次世代のウェブ3D表現技術として注目されています。

[前回の記事](https://ics.media/entry/16060/)では大量のオブジェクトを一度に描画できる**Geometry Instancing（ジオメトリ・インスタンシング）**について紹介しました。連載の第2回となる本記事では同じくWebGL 2.0で追加された代表的な機能である**Multiple Render Targets（マルチプル・レンダー・ターゲッツ）**についてデモを交えて紹介します。

### Multiple Render Targetsによる動的なライティング表現

Multiple Render Targetsを使うと下記のデモのような表現が可能です。

[![WebGL 2.0 demo - Multiple Render Targets](https://ics.media/entry/17120/images/170706_webgl2_mrt_demo_play-1.png)](https://ics-creative.github.io/170706_webgl2_feature/multiple_render_targets/src/)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/170706_webgl2_feature/multiple_render_targets/src/)
-   [ソースコードを確認する](https://github.com/ics-creative/170706_webgl2_feature/tree/master/multiple_render_targets)

右上のUIからライトの数や動きを変えたり、G-Buffer（後述）表示に切り替えられます。また、マウスドラッグやマウスホイール/上下矢印キーで視点を変更できます。

※このデモはWebGL 2.0で作成しています。[WebGL 2.0に対応したブラウザ](https://caniuse.com/webgl2)でご覧ください。

#### オフスクリーンレンダリングについて

Multiple Render Targetsの説明の前に、まずはオフスクリーンレンダリングについて説明します。WebGLは通常、描画結果を画面（canvas）に直接出力します。これに対し、描画結果をWebGLのテクスチャーに出力するレンダリング方法があり、これをオフスクリーンレンダリングとよびます。オフスクリーンレンダリングの結果は他の3Dオブジェクトのテクスチャーとして使用できます。

たとえば、3D空間のレンダリング結果をテクスチャーとして平面に貼り付けることで鏡面表現としたり、画面全体にブラーやモザイクなどのポストエフェクト表現を追加するために使われます。また、出力を目で見えるような画像データの形としてではなく、数値データとして扱うことで物体の影（シャドウ）などの表現の計算にも使われています。

[  
![オフスクリーンレンダリング](https://ics.media/entry/17120/images/180202_webgl2_mrt_offscreen_rendering.png)](https://ics.media/entry/17120/images/180202_webgl2_mrt_offscreen_rendering.png)

#### Multiple Render Targetsとは

Multiple Render Targetsは上記のオフスクリーンレンダリングを行う際に、**一度のドローコール（描画命令）で複数のテクスチャーに別々の情報を同時に描画（出力）できる機能**です。従来は一度のドローコールにつき1つのテクスチャーへの出力しかできませんでした。そのため、オブジェクトの座標や法線（面の向き）などの異なる情報を複数のテクスチャーに出力したい場合、ドローコールを複数回行う必要がありました。前回の記事でも触れましたが、一般的にドローコールはGPUの演算性能と比べると負荷が高いため、高速化のためにはドローコールの回数を少なくすることが望ましいです。こういった場合にMultiple Render Targetsが役に立ちます。

[  
![Multiple Render Targets](https://ics.media/entry/17120/images/180202_webgl2_mrt_mrt.png)](https://ics.media/entry/17120/images/180202_webgl2_mrt_mrt.png)

#### Deferredレンダリングについて

では、複数のテクスチャーに情報を出力することにどのような用途があるでしょうか？　その1つが**Deferred（ディファード／遅延）レンダリング**とよばれる手法です。通常のレンダリングでは1つのオブジェクトごとに影響するライトの計算（ライティング）を行い描画します。これを複数のオブジェクトに対して順番に行い、最終的に3D空間内のすべてのオブジェクトに対しオブジェクトとライティング結果を描画します。これをForward（フォワード／前方）レンダリングとよびます。

[  
![Forwardレンダリング](https://ics.media/entry/17120/images/180202_webgl2_mrt_forward_rendering.png)](https://ics.media/entry/17120/images/180202_webgl2_mrt_forward_rendering.png)

これに対し、Deferredレンダリングは最初に3D空間内の全オブジェクトをライティングなしでテクスチャーに描画します。その際にオブジェクトの描画色の他に、3D空間内での座標や法線など、ライティングに必要な情報をそれぞれ別のテクスチャーに出力しておきます。最後にそれらのテクスチャーの情報を元にライティングの計算を行います。

[  
![Deferredレンダリング-ジオメトリパス](https://ics.media/entry/17120/images/180202_webgl2_mrt_deferred_rendering1.png)](https://ics.media/entry/17120/images/180202_webgl2_mrt_deferred_rendering1.png)  
[  
![Deferredレンダリング-ライトパス](https://ics.media/entry/17120/images/180202_webgl2_mrt_deferred_rendering2.png)](https://ics.media/entry/17120/images/180202_webgl2_mrt_deferred_rendering2.png)

Forwardレンダリングでは、下記の理由などからあまり多くのライトを配置しません。

-   ライトの数が増えるとシェーダーが複雑化する
-   ドローコール時にオブジェクトごとに寄与する可能性のあるすべてのライトの情報を渡す必要がある
-   ピクセルに影響しないライトの計算まで行うことがあるため、ライト数の増加に対する負荷の増加が大きい

Deferredレンダリングにはこのような制約はないため、**Forwardレンダリングと比べ多くのライトを使用できる**特徴があります。

#### DeferredレンダリングにおけるMultiple Render Targets

Deferredレンダリングで最初にテクスチャーに描画する情報群はG-Buffer（ジーバッファー）とよばれ、実装によって異なりますがライティング前の描画色、座標、法線、深度などを格納します。今回のデモではG-Bufferのそれぞれの情報を可視化しています。

[  
![デモにおけるG-Buffer表示](https://ics.media/entry/17120/images/180202_webgl2_mrt_gbuffer.png)](https://ics.media/entry/17120/images/180202_webgl2_mrt_gbuffer.png)

さて、このDeferredレンダリングのG-Bufferの出力に使われているのがMultiple Render Targetsです。Multiple Render Targetsを使わなくても座標、法線などのG-Bufferに格納する情報ごとにドローコールを行えばDeferredレンダリング自体は実現可能です。しかし、これらの情報は座標変換など共通の計算過程を経ているため、一度のドローコールで複数の情報を出力できるMultiple Render Targetsと相性がよく、**ドローコールと共通計算を削減することで大きな高速化が見込めます。**

今回のデモは最大100個の動的なライトを処理しています。**Multiple Render Targetsは大量のライトをあつかえるDeferredレンダリング表現に欠かせない機能です。**

[  
![G-Bufferをもとにライティング](https://ics.media/entry/17120/images/180202_webgl2_mrt_gbuffer_lighting.png)](https://ics.media/entry/17120/images/180202_webgl2_mrt_gbuffer_lighting.png)

### 終わりに

WebGL 2.0で使用できるMultiple Render Targetsについてイメージがつかめたでしょうか？　一度のドローコールで複数のテクスチャーに情報を出力できるこの機能は現代のコンシューマーゲーム機では標準で搭載されており、今回紹介したDeferredレンダリングはゲームシーンにおいて欠かせないものとなっています。WebGL 2.0の対応ブラウザが広がることで**コンシューマーゲームと同等の表現がウェブで可能に**なるというのはなんだかワクワクしますよね。

[連載の最後の記事](https://ics.media/entry/17505/)はTransform Feedback（トランスフォーム・フィードバック）について詳しく紹介します。

※今回紹介した機能はWebGL 1.0でもブラウザによっては拡張機能として使用できます。

### 「サンプルで理解するWebGL 2.0」の連載記事一覧

1.  [Geometry Instancingによる大量のオブジェクト表示](https://ics.media/entry/16060/)
2.  Multiple Render Targetsによる動的なライティング表現
3.  [Transform Feedbackによるパーティクル表現](https://ics.media/entry/17505/)）