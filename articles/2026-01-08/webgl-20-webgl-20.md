---
title: "サンプルで理解するWebGL 2.0 - WebGL 2.0の利点とは"
source: "https://ics.media/entry/16060/"
publishedDate: "2017-07-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

ブラウザからハードウェアアクセラレーションを使用してリッチな表現を実現できるWebGL。その新たなバージョンであるWebGL 2.0が主要なブラウザで正式対応し始めました。2017年1月にリリースされたChrome 56とFirefox 51や、2021年9月のSafari 15から標準で利用でき、ウェブ表現のさらなる進化への期待が高まります。

本連載では3回に分けてWebGL 2.0の新機能をデモを交えて紹介します。

#### WebGL 2.0の機能を使ったデモ

まずはWebGL 2.0ではどんなことができるのか、機能ごとにデモを作成したので紹介します。それぞれ、マウスドラッグやマウスホイール/上下矢印キーで視点を変更できるので動かしてみてください。

※各デモはWebGL 2.0で作成しています。[WebGL 2.0に対応したブラウザ](https://caniuse.com/webgl2)でご覧ください。

#### Geometry Instancing

Geometry Instancing（ジオメトリインスタンシング）は一度のドローコール（描画命令）で同じオブジェクトを複数同時に描画する機能です。この機能を使うと従来と比べ大量のオブジェクトを高速に描画できます。デモ右上の\[Num\]からオブジェクトの数を変更しても高いフレームレートが保てていることがわかります。

[![WebGL 2.0 demo - Gepmetry Instancing](https://ics.media/entry/16060/images/170706_webgl2_instancing_demo_play-1.png)](https://ics-creative.github.io/170706_webgl2_feature/geometry_instancing/src/)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/170706_webgl2_feature/geometry_instancing/src/)
-   [ソースコードを確認する](https://github.com/ics-creative/170706_webgl2_feature/tree/master/geometry_instancing)

#### Multiple Render Targets

Multiple Render Targets（マルチプルレンダーターゲッツ）は一度のドローコールで複数のテクスチャに描画（出力）ができる機能です。この機能を使って、大量のライトを扱える「Deferred（ディファード）レンダリング」表現のデモを作成しました。デモ右上の\[Num\]からライトの数を変更できます。従来の手法では1つのオブジェクトに対して影響を与えるライトは数個〜十数個が一般的でしたが、このデモでは最大100個ものライトを配置できます。

[![WebGL 2.0 demo - Multiple Render Targets](https://ics.media/entry/16060/images/170706_webgl2_mrt_demo_play-1.png)](https://ics-creative.github.io/170706_webgl2_feature/multiple_render_targets/src/)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/170706_webgl2_feature/multiple_render_targets/src/)
-   [ソースコードを確認する](https://github.com/ics-creative/170706_webgl2_feature/tree/master/multiple_render_targets)

#### Transform Feedback

Transform Feedback（トランスフォームフィードバック）はGPUから頂点データを更新できる機能です。この機能を使用すると頂点の座標計算をGPUで高速に行えるため、大量のパーティクルを用いた表現が可能になります。このデモでは10万個という大量のパーティクルの座標をCurlノイズという手法にもとづいてGPUで計算して表示しています。

[![WebGL 2.0 demo - Transform Feedback](https://ics.media/entry/16060/images/170706_webgl2_transform_feedback_demo_play-1.png)](https://ics-creative.github.io/170706_webgl2_feature/transform_feedback/src/)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/170706_webgl2_feature/transform_feedback/src/)
-   [ソースコードを確認する](https://github.com/ics-creative/170706_webgl2_feature/tree/master/transform_feedback)

### WebGL 2.0の位置づけ

WebGLは組み込み機器向けのコンピューターグラフィックスAPI仕様であるOpenGL ESのブラウザ向けの派生版です（さらにOpenGL ESはOpenGLの派生版です）。WebGL 1.0はこのOpenGL ES 2.0の派生版でしたが、WebGL 2.0はOpenGL ES 2.0の次バージョンであるOpenGL ES 3.0の派生版となっています。OpenGL ES 3.0は2.0と後方互換性があるため、WebGL 2.0もWebGL 1.0と後方互換性があるといえるでしょう。

[  
![WebGL 2.0の位置付け](https://ics.media/entry/16060/images/170706_webgl2_overview.png)](https://ics.media/entry/16060/images/170706_webgl2_overview.png)

WebGL 2.0の機能を使用する場合はシェーダーの文法など一部変わる部分もありますが、単純に**WebGL 1.0に機能が追加されたものがWebGL 2.0**と考えてよいでしょう。本連載を通して、この追加された機能の中から代表的な下記の3つを紹介します。

-   Geometry Instancing
-   Multiple Render Targets（第2回）
-   Transform Feedback（第3回）

第1回ではこの中のGeometry Instancingについて詳しく紹介します。

### Geometry Instancing

#### Geometry Instancingのデモ

Geometry Instancingを使うと、下記のデモのように大量のオブジェクトを高速に表示できます。

[![WebGL 2.0 demo - Gepmetry Instancing](https://ics.media/entry/16060/images/170706_webgl2_instancing_demo_play-1.png)](https://ics-creative.github.io/170706_webgl2_feature/geometry_instancing/src/)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/170706_webgl2_feature/geometry_instancing/src/)
-   [ソースコードを確認する](https://github.com/ics-creative/170706_webgl2_feature/tree/master/geometry_instancing)

右上のUIからトーラス（ドーナツ形状の3Dオブジェクト）の数を変えたり、ワイヤーフレーム表示に切り替えられます。また、マウスドラッグやマウスホイール/上下矢印キーで視点を変更できます。

※このデモはWebGL 2.0で作成しています。[WebGL 2.0に対応したブラウザ](https://caniuse.com/webgl2)でご覧ください。

#### 従来のオブジェクトの描画方法

通常、WebGLではオブジェクトを描画する場合に下記のようなフローで実行します。最初にオブジェクトの各頂点をローカル座標（オブジェクトの中心を決め、その中心から見たそれぞれの頂点の座標）で定義しGPUに転送します。そして、オブジェクトのグローバル座標（オブジェクトの中心を3D空間のどこに配置するのかの座標）や拡縮、回転などのオブジェクトのプロパティを指定しつつドローコールを行いディスプレイに描画します。

[  
![WebGLの一般的な描画](https://ics.media/entry/16060/images/170706_webgl2_instancing1.png)](https://ics.media/entry/16060/images/170706_webgl2_instancing1.png)

#### 従来のオブジェクトの描画方法の問題点

この方法だと**1つのオブジェクトの描画に一度のドローコールを行います。**1フレームに数100回程度の実行であれば通常の使用の範囲内ですが（モバイル向けの場合はもっと少なくする必要があるでしょうが）、たとえば木や岩などの同じオブジェクト（以下この単位となるオブジェクトをインスタンスとよぶことにします）千個を少しずつ位置や大きさなどのプロパティを変えて描画したい場合には千回のドローコールが必要となります。**一般的にドローコールはGPUの演算性能と比べると負荷が高く、大量のドローコールを行うとGPUの性能を発揮できませんし、ドローコール自体のCPU負荷によってフレームレート低下の原因にもなります。**

[  
![大量のインスタンスごとにそれぞれドローコールを行う](https://ics.media/entry/16060/images/170706_webgl2_instancing2.png)](https://ics.media/entry/16060/images/170706_webgl2_instancing2.png)

#### 従来の方法で大量のオブジェクトを描画する工夫

この問題の解決として、複数のインスタンスを1つのオブジェクトとして扱う方法があります。インスタンスのそれぞれの頂点をインスタンスごとのグローバル座標や拡縮、回転、その他のプロパティを適用した状態で複数描画したいインスタンスの数だけ用意してGPUに転送しておきます。そうすれば一つのオブジェクトとして一度のドローコールで描画できます。

[  
![大量のインスタンスをGPUに定義し、一度のドローコールで描画する](https://ics.media/entry/16060/images/170706_webgl2_instancing3.png)](https://ics.media/entry/16060/images/170706_webgl2_instancing3.png)

しかし、この方法には問題が2つあります。まず一つはメモリ容量の問題です。複数のインスタンスを一つのオブジェクトとして扱うため、大量の頂点をGPUのメモリ（VRAM）に保持する必要があります。その容量は`インスタンスあたりの頂点数 * インスタンス数 * インスタンスごとのプロパティ数`に比例します。もう1つの問題は複数のインスタンスを一つのオブジェクトとして扱うことにより、個々のインスタンスのプロパティを個別に更新できないことです。ドローコール時にプロパティを指定する方法はオブジェクト全体に適用されるため、すべてのインスタンスを同時に同じ方向に動かすことはできますが、それぞれを別々の方向に動かすことはできません。

#### 従来の方法で大量のオブジェクトを個別に動かす工夫

2つ目の問題にも解決のアプローチはあります。GPUに配置した頂点情報をCPU側から変更する方法です。ドローコールの前にすべてのインスタンスのそれぞれの頂点についてCPUで位置の更新を行ってからGPUに転送することでインスタンスごとに個別の動きをさせることができます。

[  
![大量のインスタンスの頂点情報をCPUから変更する](https://ics.media/entry/16060/images/170706_webgl2_instancing4.png)](https://ics.media/entry/16060/images/170706_webgl2_instancing4.png)

ただし、この方法でもまだ問題は残っており、大量のインスタンスのすべての頂点に対してデータ更新をしてGPUに転送する必要があります。このデータ転送量は`インスタンスあたりの頂点数 * インスタンス数 * データを更新するプロパティ数`に比例します。**一般的にCPU側メモリからGPU側メモリへのデータ転送はGPUの演算性能と比べると低速なため、大量のデータ転送はGPUの性能を発揮できません。**

#### Geometry Instancingのメリット

ここで登場するのがGeometry Instancingです。**Geometry Instancingは一度のドローコール（描画命令）で複数のオブジェクトを一度に描画する機能**です。同時に描画するオブジェクトは同じ形状（頂点）、マテリアル（シェーダー）である必要がありますが、**オブジェクトごとのプロパティを個別に設定できます。**大量に描画したいインスタンスそれぞれのプロパティをGPUに転送しておくことで、ドローコール時にインスタンスごとの頂点がそれぞれのインスタンスのプロパティを参照して描画されます。

[  
![Geometry Instancingで描画する](https://ics.media/entry/16060/images/170706_webgl2_instancing5.png)](https://ics.media/entry/16060/images/170706_webgl2_instancing5.png)

先ほどの方法では頂点ごとに必要だったインスタンスのプロパティが**インスタンスの頂点に共通で参照できる**ことがGeometry Instancingのキモです。問題になっていたGPUのメモリ量は`インスタンスあたりの頂点数 + インスタンス数 * インスタンスごとのプロパティ数`で済みますし、インスタンスごとに個別にプロパティを変更したい場合もデータ転送量は`インスタンス数 * データを更新するプロパティ数`で済みます。**Geometry Instancingを使用しない場合と比べると、複数描画したいインスタンスあたりの頂点数が多いほど恩恵を受けます。**

表題のデモは約1000頂点のトーラスをインスタンスとして1度のドローコールで100〜5000個描画しています。インスタンスごとに色と位置を設定し、それぞれ個別に回転させています。**Geometry Instancingを使うことで大量の同じオブジェクトを高速に描画できることがわかります。**

※Geometry InstancingはWebGL 1.0でもブラウザによっては拡張機能として使えます。

### 終わりに

WebGL 2.0で使用できるGeometry Instancingについてイメージがつかめたでしょうか？　大量のオブジェクトを一度に描画できるこの機能は3Dコンテンツを作成したことのある方にとってはとてもうれしい機能だと思います。

次回は**Multiple Render Targets**について詳しく紹介します。

### 「サンプルで理解するWebGL 2.0」の連載記事一覧

1.  Geometry Instancingによる大量のオブジェクト表示
2.  [Multiple Render Targetsによる動的なライティング表現](https://ics.media/entry/17120/)
3.  [Transform Feedbackによるパーティクル表現](https://ics.media/entry/17505/)