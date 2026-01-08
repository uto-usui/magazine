---
title: "サンプルで理解するWebGL 2.0 - Transform Feedbackによるパーティクル表現"
source: "https://ics.media/entry/17505/"
publishedDate: "2018-03-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

2018年3月19日 公開 / [株式会社ICS 川勝 研太郎](https://ics.media/entry/staff/kawakatsu/)

ブラウザからハードウェアアクセラレーションを使用してリッチな表現を実現できるWebGL。その新たなバージョンであるWebGL 2.0はChromeとFirefoxで標準で利用でき、次世代のウェブ3D表現技術として注目されています。

[前回の記事](https://ics.media/entry/17120/)では一度のドローコール（描画命令）で複数のテクスチャーに別々の情報を同時に描画（出力）できる**Multiple Render Targets（マルチプル・レンダー・ターゲッツ）**について紹介しました。連載の最後となる本記事では同じくWebGL 2.0で追加された代表的な機能である**Transform Feedback（トランスフォーム・フィードバック）**についてデモを交えて紹介します。

#### Transform Feedbackによるパーティクル表現

Transform Feedbackを使うと下記のデモのような表現が可能です。

[![WebGL 2.0 demo - Transform Feedback](https://ics.media/entry/17505/images/170706_webgl2_transform_feedback_demo_play-1.png)](https://ics-creative.github.io/170706_webgl2_feature/transform_feedback/src/)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/170706_webgl2_feature/transform_feedback/src/)
-   [ソースコードを確認する](https://github.com/ics-creative/170706_webgl2_feature/tree/master/transform_feedback)

マウスドラッグやマウスホイール/上下矢印キーで視点を変更できます。

※このデモはWebGL 2.0で作成しています。[WebGL 2.0に対応したブラウザ](https://caniuse.com/webgl2)でご覧ください。

#### Transform Feedbackとは

**Transform FeedbackはGPU（シェーダー）から頂点データを更新できる機能**です。従来は頂点データはCPUからGPUのメモリに転送し、GPUからは参照することしかできませんでした。前回の記事のGeometry Instancingで触れた例のように、CPUからであればデータを更新（変更）できましたが、GPUからデータを更新するすべはなかったのです。**Transform Feedbackを使えばシェーダーの計算結果を頂点データに書き戻し、新たな頂点データとして使用できます。**

下記はWebGLの一般的なレンダリングパイプライン（描画処理の流れ）です。

1.  CPUから頂点データをGPUメモリに転送
2.  描画命令
3.  頂点シェーダーからGPUメモリの頂点データを参照
4.  頂点シェーダーで頂点ごとの計算
5.  ラスタライザーでラスタライズ（ポリゴンをピクセルに分解）
6.  フラグメントシェーダーでピクセルごとの計算
7.  canvasに出力

[  
![WebGLのレンダリングパイプライン](https://ics.media/entry/17505/images/180202_webgl2_transform_feedback_pipeline1.png)](https://ics.media/entry/17505/images/180202_webgl2_transform_feedback_pipeline1.png)

Transform Feedbackを使うと、ラスタライザーに結果を渡す時に同時に頂点データを更新できます。

[  
![頂点シェーダーから頂点データを更新](https://ics.media/entry/17505/images/180202_webgl2_transform_feedback_pipeline2.png)](https://ics.media/entry/17505/images/180202_webgl2_transform_feedback_pipeline2.png)

また、頂点シェーダーの処理だけを行い、ラスタライズ以降の処理をキャンセルすることも可能です。

[  
![ラスタライズ以降の処理をキャンセル](https://ics.media/entry/17505/images/180202_webgl2_transform_feedback_pipeline3.png)](https://ics.media/entry/17505/images/180202_webgl2_transform_feedback_pipeline3.png)

#### Transform Feedbackのメリット

頂点データの更新をGPUから行えるということは、頂点の座標計算をほぼGPUのみで完結できます。計算結果を頂点データに書き出すことで次回の計算時に今回の計算結果を用いる**逐次計算**が可能となり、物理的な法則に従ったパーティクル表現やGPGPU（ジーピージーピーユー）とよばれる、**GPUによる描画以外の汎用計算**も行えるようになります。

今回のデモではTransform Feedbackを用いて10万個の粒子それぞれの座標をCurlノイズという手法にもとづいて逐次計算し、パーティクル表現を行っています。**Transform Feedbackは大量のパーティクルの座標計算、描画表現に適しています。**

[  
![Transform Feedbackのデモの流れ](https://ics.media/entry/17505/images/180202_webgl2_transform_feedback_particle.png)](https://ics.media/entry/17505/images/180202_webgl2_transform_feedback_particle.png)

### 終わりに

WebGL 2.0で使用できるTransform Feedbackについてイメージがつかめたでしょうか？　GPUから頂点データを更新できるこの機能は、使い方によってはGPUを描画ではなく純粋な計算で使用できるため非常に画期的だと思います。

3回の連載を通してWebGL 2.0で使用できる代表的な機能について紹介しました。モバイルを含めまだまだ対応ブラウザが少ない状況ですが、**WebGL 2.0にはウェブでの3D表現向上に役立つ機能が備わっています。**今のうちにできること学んでおいて対応ブラウザが増える日を楽しみに待ちましょう。

### 「サンプルで理解するWebGL 2.0」の連載記事一覧

1.  [Geometry Instancingによる大量のオブジェクト表示](https://ics.media/entry/16060/)
2.  [Multiple Render Targetsによる動的なライティング表現](https://ics.media/entry/17120/)
3.  Transform Feedbackによるパーティクル表現