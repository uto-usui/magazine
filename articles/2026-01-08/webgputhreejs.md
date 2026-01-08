---
title: "WebGPU対応のThree.jsのはじめ方"
source: "https://ics.media/entry/250501/"
publishedDate: "2025-05-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

WebGPUは、ウェブ上で動作する新世代のグラフィックスAPIです。従来のWebGLに代わるものとして設計されており、より低レベルで効率的にGPUへアクセスできるようになっています。たとえば記事『[WebGPUがついに利用可能に](https://ics.media/entry/230426/)』で紹介したように、WebGLより高いパフォーマンスが期待できます。

[Three.js](https://threejs.org/)はウェブで3D表現を作るためのJavaScriptライブラリです。2010年代のWebGL黎明期からThree.jsが多くのウェブサイトで使われており、3Dの代表的なライブラリとも言えます。

Three.jsでは、WebGPU対応が進んでいます。WebGPU対応のレンダラー「`WebGPURenderer`」が存在し、従来の`WebGLRenderer`とほぼ同じ使い勝手で利用できます。Three.js利用者は低レベルコードを書くことなく、WebGPUの利点を活かせるようになっています。`WebGPURenderer`は現在はwip（Work in Progress）扱いです。

Three.jsでWebGPUを使うメリットはその将来性です。この記事では、Three.jsの`WebGPURenderer`の最新動向や導入ポイントについて解説します。

### Three.jsでWebGPU向けに移植してみた

WebGPU版のThree.jsは簡単に利用できます。後述しますが、WebGL向けに作っているコンテンツは、レンダラーを切り替えただけで動作するようになります。ICS MEDIAではいままで数々のオリジナルの作例を掲載してきましたが、WebGPU版に切り替えたので紹介します。

-   [別ウインドウで再生する](https://ics-creative.github.io/230411_sound_visualizer/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230411_sound_visualizer/blob/main/docs/index.html)
-   記事『[JavaScriptで作成するサウンドビジュアライザー](https://ics.media/entry/230421/)』より

-   [別ウインドウで再生する](https://ics-creative.github.io/150810_threejs_mosaic/DemoCubes.html)
-   [ソースコードを確認する](https://github.com/ics-creative/150810_threejs_mosaic/blob/master/src/DemoCubes.ts)
-   記事『[高機能なモーション制作用JSライブラリGSAPを使ったタイムリマップ表現](https://ics.media/entry/7162/)』より

-   [別ウインドウで再生する](https://ics-creative.github.io/180725_three_waves/)
-   [ソースコードを確認する](https://github.com/ics-creative/180725_three_waves)

他にも次の作例もWebGPUへ移植しています。

-   [WebGLとHTMLで作成する3DのカバーフローUI](https://ics.media/entry/1787/)
-   [エフェクト作成入門講座 Three.js編 RPGのセーブポイント風の魔法陣](https://ics.media/entry/11401/)

たくさんのコンテンツを従来の`WebGLRenderer`から`WebGPURenderer`へ移植しましたが、あまりにも簡単に動作し驚きました。開発時の気付きをお伝えします。

-   Three.jsのビルトインの機能だけで作成している場合は、レンダラーの切替だけで移植可能（本当に簡単！）
-   互換性のないコードが存在した場合は、個別に修正が必要（粒子表現、線など）。
-   シェーダーは互換性がないため、後述のGLSLからTSLへ移植。

Three.jsはWebGL専用ライブラリではなく、かつてはSVGやCanvas 2Dを使って3D表現するレンダラーも用意されていました。WebGLからWebGPUへの変遷のように基盤技術が変化しても、利用者は気にすることは少ないです。Three.jsが3D技術を高度に抽象化できているからこそ、でしょう。

### 導入方法

Three.jsでWebGPUを利用する手順を紹介します。かつてThree.jsを利用したことがある方（`WebGLRenderer`の利用者）を前提とした説明となっています。

1.  **Three.jsのインポート:**
    1.  WebGPU対応ビルドを読み込みます。
        1.  CDNの場合は、`three.module.js`ではなく`three.webgpu.js`を読み込みます。
        2.  Viteなどの場合は、とくに設定は不要です。
    2.  コードではES Moduleの読み込みとして `import { WebGPURenderer } from "three/webgpu"`と記載します。
2.  **レンダラーの作成:**
    1.  `new WebGPURenderer()`でレンダラーを生成します。
    2.  引数のオプションは`WebGLRenderer`と同じ形式で指定できます。
3.  **初期化:**
    1.  `await renderer.init();`メソッドを呼び、初期化します。
    2.  同期ではなく、`await`で非同期になっていることがポイントです。
4.  **シーン描画:**
    1.  通常のThree.jsと同様に、`Scene`や`Camera`を作成して`renderer.render(scene, camera)`を呼びます。

通常の`WebGLRenderer`と`WebGPURenderer`で実装した場合の差分は次の通りです。ほとんど違いがないことがわかります。

![](https://ics.media/entry/250501/images/images/250501_three_diff.png)

詳細な導入手順はICS MEDIA内の『Three.js入門サイト』をご覧ください。

-   [Three.jsのWebGPURendererの使い方 - ICS MEDIA](https://ics.media/tutorial-three/webgpu_renderer/)

### WebGPU非対応ブラウザのフォールバック

WebGLとWebGPUは異なる技術です。WebGLはすべてのブラウザがサポートしているため、WebGLのほうが広範囲な動作環境をサポートできます。それに対して、WebGPUはChrome 113・Edge 113（2023年5月）とSafari 26.0（2025年9月）やFirefox 141（2025年7月、Windowsのみ）が対応しています（参照：[Can I Use…](https://caniuse.com/webgpu)）。

▼WebGLの技術レイヤー

![](https://ics.media/entry/250501/images/images/250501_layer_webgl2.png)

▼WebGPUの技術レイヤー

![](https://ics.media/entry/250501/images/images/250501_layer_webgpu.png)

では、Three.jsの`WebGPURenderer`を使うと、未対応のブラウザでは表示できないのでしょうか？

Three.jsの`WebGPURenderer`の特徴として、WebGPU非対応環境ではWebGL 2.0へのフォールバックがおこなわれます。開発者が特別な対応をしなくても、ユーザー環境に応じて最適な技術が選択されるため、幅広い環境をカバーできます。

![](https://ics.media/entry/250501/images/images/250501_support_webgpurenderer.png)

つまり、新しい`WebGPURenderer`を使っておけば、新しい環境ではWebGPUの恩恵が得られ、古い環境では従来どおりWebGL 2.0で表示できます。

#### いまはWebGLRendererのほうが高速

Three.jsのr176時点（2025年5月）では、`WebGPURenderer`に比べて`WebGLRenderer`のほうが高速に動作することがあるようです。ベンチマークとして、大量のMeshを配置し検証しました。

![](https://ics.media/entry/250501/images/images/250501_three_benchmark.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250501_threejs_webgpurenderer/)
-   [コードを確認する](https://github.com/ics-creative/250501_threejs_webgpurenderer)

60FPSをキープできる直方体の数をスコアとしました。個別のメッシュでは、4倍ほどのWebGLのほうが性能が高い結果になっています。

メッシュ種別

レンダラー

直方体の数

個別 Mesh

`WebGLRenderer`

2,562

個別 Mesh

`WebGPURenderer`

682

インスタンス化 Mesh

`WebGLRenderer`

62,751

インスタンス化 Mesh

`WebGPURenderer`

31,248

※検証マシン：Windows 10 / Core i5-1135G7 @ 2.40GHz / Intel IRIS Xe Graphics /メモリー16GB

本来的にはWebGPUのほうが新しいモダンなAPIを利用でき、高速な結果が得られるはずです。記事『[WebGPUがついに利用可能に](https://ics.media/entry/230426/)』の検証では、ネイティブ実装であれば、WebGPUのほうが高い性能を記録できています。

> 1万回のドローコールを行うと、WebGLのデモでは30FPSにまで落ちているのに対し、WebGPUのデモでは50FPS近い値がでています

筆者の願望もありますが、やがてThree.jsもWebGPU版のほうが高速になっていくことでしょう。

2025年5月現在、性能向上にむけた取り組みには以下のようなプルリクエストがあります。

-   [WebGPURenderer: RenderBundle by RenaudRohlinger](https://github.com/mrdoob/three.js/pull/28347)
-   [Renderer: Auto-Instancing \[WIP\] by sunag](https://github.com/mrdoob/three.js/pull/26640)

#### React Three FiberでWebGPURendererは利用可能

記事『[React Three Fiber入門](https://ics.media/entry/250410/)』で紹介した、JSX構文でThree.jsが扱えるReact Three Fiberも、`WebGPURenderer`が利用できます。詳しくは次のドキュメントをご覧ください。

-   [v9 Migration Guide - React Three Fiber](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide#webgpu)

### TSLと GLSL / WGSL

**TSL（Three.js Shading Language）**は、Three.jsにおける新しいシェーダー記述方法です。

従来、Three.jsでリッチな視覚表現を行うにはGLSLジーエルエスエル（OpenGL Shading Language）を記述する必要がありました。WebGPUのネイティブではWGSL（WebGPU Shading Language）を利用しますが、Three.jsのWebGPURendererではTSLを使います。

TSLではJavaScriptでシェーダー定義を作成します。最終的にWebGPU用のWGSLコードと、WebGL用のGLSLコードに自動で変換されます。単一の記述で両環境をカバーでき、シェーダー言語の差異を意識せずに開発が可能です。

公式サイトの[webgpu\_tsl\_editor](https://threejs.org/examples/#webgpu_tsl_editor)で確認できるので、試してみるといいでしょう。

![](https://ics.media/entry/250501/images/images/250501_tsl_about.png)

TSLの詳細は次のリンクで学べます。TSLはノードベースでシェーダー処理を定義することが特徴です。

-   [Three.js Shading Language · mrdoob/three.js Wiki](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)

### TSLの簡単な例

TSLの簡単なコードを紹介します。

次のコードは、時間経過に合わせて頂点を波打たせるシンプルな例です。TSLノードで頂点を動的にオフセットし、法線も再計算することで滑らかな陰影が表現されています。

```
import { WebGPURenderer, MeshStandardNodeMaterial } from "three/webgpu";
import { positionLocal, normalLocal, sin, time, float } from "three/tsl";

const material = new MeshStandardNodeMaterial();
const wave = sin(positionLocal.x.add(time));
material.positionNode = positionLocal.add(normalLocal.mul(wave).mul(float(5)));
```

▼WebGPURendererとTSLを用いて平面ジオメトリに波形変形を与えた例

![](https://ics.media/entry/250501/images/images/250501_tsl_demo.png)

-   [別ウインドウで再生する](https://ics-creative.github.io/tutorial-three/samples/webgpu_renderer_cdn_tsl.html)
-   [ソースコードを確認する](https://github.com/ics-creative/tutorial-three/blob/main/samples/webgpu_renderer_cdn_tsl.html)

Three.js作者のmrdoob氏の発表『[Embracing WebGPU and WebXR With Three.js – Mr.doob, JSNation 2024](https://www.youtube.com/watch?v=7we9mqIOKyw)』によると、TSLはビルドにおいてツリーシェイキングができることや、直感的に記述できることが利点と紹介されています。

#### ポストエフェクトをTSLで作成してみた

チルトシフト効果をTSLで作成しました。Y座標の上下でブラーを適用するエフェクトです。手前と奥側がボケているような効果が得られます。

-   [別ウインドウで再生する](https://ics-creative.github.io/250423_vite_threejs_tsl/)
-   [ソースコードを確認する](https://github.com/ics-creative/250423_vite_threejs_tsl)

公式のアドオンに[さまざまなTSLノード](https://github.com/mrdoob/three.js/tree/dev/examples/jsm/tsl/display)が用意されているため、組み合わせていくだけでおもしろい効果を作れます。

#### 公式デモ

公式デモでGLSLとTSLの文法の違いを確認してみましょう。デモはドットシェーダーを題材にしてみます。

![](https://ics.media/entry/250501/images/images/250501_post_effect_demo.png)

-   [WebGL版](https://threejs.org/examples/#webgl_postprocessing)
-   [WebGPU版](https://threejs.org/examples/#webgpu_postprocessing)

以下は該当コードのピックアップしたものです。GLSLとTSL（JavaScript）の文法の違いはありますが、ほとんど同じ処理が記載されていることが確認できます。入力画像の輝度を取り出し、格子状のサイン波パターンを重ね、濃淡を強調したドットスクリーン（網点）風の色を生成しています。

![](https://ics.media/entry/250501/images/images/250501_post_effect_code.png)

-   [DotScreenShader.js (WebGL)](https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/DotScreenShader.js)
-   [DotScreenNode.js (WebGPU)](https://github.com/mrdoob/three.js/blob/dev/examples/jsm/tsl/display/DotScreenNode.js)

#### コラム： シェーダー言語と対応する技術

ウェブで利用可能なシェーダー言語はGLSL ES 1.00とGLSL ES 3.00とWGSLの3種類があります。関係性をまとめてみます。

技術

対応するシェーダー言語

WebGL 1.0

GLSL ES 1.00

WebGL 2.0

GLSL ES 1.00とGLSL ES 3.00

WebGPU

WGSL

-   WebGL 2.0ではGLSL ES 3.00を利用しますが、GLSL ES 1.00とも互換性があります。
-   GLSL ES 1.00で記載しておけば、WebGL 1.0とWebGL 2.0の両方で利用できます。
-   ただし、WebGL 2.0の機能をフルに利用するにはGLSL ES 3.00を使う必要があります。
-   WebGPUではGLSLは利用できず、WGSLを使う必要があります。
-   TSLは高級言語で、自動的にWGSLやGLSL ES 3.00に変換して動作します。

### まとめ

Three.jsの`WebGPURenderer`は開発が進んでいます。TSLの導入により、シェーダー開発も直感的に記述できるようになったと思います。

ただし対応ブラウザが限定的で、最適化も進行中のため、本番導入前に検証が必要です。まずは小規模なプロトタイプで試し、WebGPUならではの表現力と将来性を体感してみるといいでしょう。

今後のアップデートにも注目しながら、WebGPU時代の到来に備えましょう。