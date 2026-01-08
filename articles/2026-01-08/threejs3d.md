---
title: "簡単で効果大！ Three.jsのポストプロセスで映える3D表現"
source: "https://ics.media/entry/251113/"
publishedDate: "2025-11-13"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

2025年11月13日 公開 / [株式会社ICS 北川 杏子](https://ics.media/entry/staff/kitagawa/)

3DコンテンツをJavaScriptであつかうThree.jsでは、3Dシーンに印象的な効果を加えるポストプロセスの機能があります。

ポストプロセスとは、レンダリングされた画像や映像に後からエフェクトを加える処理です。グリッチやノイズなどの演出を加えたり、色を変化させたり、独特のにじみを加えたりと、さまざまな種類があります。

この記事ではポストプロセスを使い3Dシーンにエフェクトを追加する方法を紹介します。以下のデモはオリジナルの3Dシーンにポストプロセスを加えたものです。見た目の大幅な変化とは裏腹に、実装は意外とシンプルなので試したことのない方はぜひチャレンジしてみてください。

![ポストプロセスを使用したエフェクト](https://ics.media/entry/251113/images/251113_postprocess_variation.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251113_three-postprocessing/sea.html)
-   [コードを確認する](https://github.com/ics-creative/251113_three-postprocessing/tree/main/sea/src)

### ポストプロセスの事例

まずはポストプロセスが効果的に使われているウェブサイトを紹介します。

『[WindLand - By Neotix](https://windland-neotix.vercel.app/)』は、Three.jsを使った美しい3Dビジュアルが印象的なウェブサイトです（注意: 音が出ます）。

このウェブサイトでは、Three.jsの[EffectComposer](https://threejs.org/docs/#EffectComposer)を使用してポストプロセスを実装しています。昼のシーンでは`BokehPass`エフェクトを使用して、遠くにある背景をぼかすことで奥行きを表現しています。 画面右上の月のマークをクリックすると夜のシーンに変更できます。夜のシーンでは、`UnrealBloomPass`エフェクトでビルの窓から光があふれるような演出を行っています。

![WindLandのポストプロセス](https://ics.media/entry/251113/images/251113_windland.png)

このようにポストプロセスを活用することで、単なる3Dオブジェクトの配置だけでは表現できない質感や雰囲気を作り出せます。

制作者のAnderson Mancini氏の記事『[Case Study: Windland — An Immersive Three.js Experience](https://tympanus.net/codrops/2022/04/25/case-study-windland-an-immersive-three-js-experience/)』では、ポストプロセスだけでないThree.jsのテクニックが解説されています。興味のある方はぜひ読んでみてください。

### Three.jsで簡単に実装してみる

ポストプロセスは奥の深い技術ですが、Three.jsの公式アドオンを利用すると主要なエフェクトを簡単に導入できます。ここからは実際に実装してみます。

#### WebGPUを使用したポストプロセス

デモではWebGPUを使用して実装します。WebGPUは従来のWebGLとは違い、GPUを効率的に使うことでパフォーマンスの向上が期待できます。

Three.jsではWebGPUとWebGLで使用するモジュールが異なります。さきほど紹介したWindlandの事例はWebGLを使った手法です。

-   **WebGPU** ※今回のデモで採用
    -   レンダラー: [WebGPURenderer](https://threejs.org/docs/#WebGPURenderer)
    -   ポストプロセス: [PostProcessing](https://threejs.org/docs/?q=post#PostProcessing)
    -   エフェクト: WebGPU対応の[公式アドオン](https://github.com/mrdoob/three.js/tree/dev/examples/jsm/tsl/display)
-   **WebGL** ※従来の手法
    -   レンダラー: [WebGLRenderer](https://threejs.org/docs/#WebGLRenderer)
    -   ポストプロセス: [EffectComposer](https://threejs.org/docs/#EffectComposer)
    -   エフェクト: WebGL対応の[公式アドオン](https://github.com/mrdoob/three.js/tree/master/examples/jsm/postprocessing)

#### シンプルなシーンにポストプロセスを追加する

立方体をアニメーションさせているシーンにポストプロセスを追加してみましょう。関連するところを抜粋して説明します。すべてのコードを見たい方は以下のリンクから確認してください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251113_three-postprocessing/box.html)
-   [コードを確認する](https://github.com/ics-creative/251113_three-postprocessing/blob/main/box/main.ts)

1.  通常のThree.jsと同じようにシーンやカメラを追加した後、`three/webgpu`からインポートした`PostProcessing`クラスに`renderer`を渡してインスタンス化します。
2.  `scene`と`camera`を`pass()`関数に渡して`scenePass`を作成します。
3.  作成した`scenePass`からテクスチャノードを取得します。
4.  [公式のアドオン](https://github.com/mrdoob/three.js/tree/dev/examples/jsm/tsl/display)から好きなエフェクトを選んでインポートします。今回は`dotScreen()`関数を使用します。
5.  3で作成した`scenePassColor`を`dotScreen()`関数に渡し、戻り値を`postProcessing`の`outputNode`に代入します。
6.  アニメーション関数内で`postProcessing.render()`関数を呼び出して画面を描画します。

```
import { PostProcessing } from "three/webgpu";
import { pass } from "three/tsl";
import { dotScreen } from "three/examples/jsm/tsl/display/DotScreenNode.js"; // 4.

  // 省略
  // カメラ、シーン、boxオブジェクト、レンダラーを設定する

  // ポストプロセス
  const postProcessing = new PostProcessing(renderer); // 1.
  const scenePass = pass(scene, camera); // 2.
  const scenePassColor = scenePass.getTextureNode(); // 3.
  const dotScreenPass = dotScreen(scenePassColor); // 5.
  postProcessing.outputNode = dotScreenPass; // 5.

  // 省略

  const animate = () => {
    // レンダリングする
    postProcessing.render(); // 6.
  };
```

たったこれだけでポストプロセスの実装が完了しました！　いわゆるハーフトーンと呼ばれる、新聞のような雰囲気のシーンになりました。パラメーターを変更すると描画結果が変わります。ためしに`scale`の値を`0.1`に変更するとドットが大きくなりました。

```
const dotScreenPass = dotScreen(scenePassColor);
dotScreenPass.scale.value = 0.1; // ✨これを追加
```

![シンプルなシーンのdotScreenエフェクト](https://ics.media/entry/251113/images/251113_simple_box_effect.png)

### さまざまなポストプロセス

もう少し複雑なシーンに追加したデモも見てみましょう。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251113_three-postprocessing/sea.html)
-   [コードを確認する](https://github.com/ics-creative/251113_three-postprocessing/tree/main/sea/src/three/postprocess)

#### Chromatic Aberration + Depth of Fieldエフェクト

Chromatic Aberration（色収差）は画面の暗い部分と明るい部分の境目にRGBシフトのような色の差を発生させるエフェクトです。草や海の境目部分に赤や黄色の色のブレが見られます。現実のカメラレンズを通した映像のような効果が得られます。

Depth of Fieldはカメラの焦点のように、近いものにピントが合い、遠いものはぼかしを加えます（被写界深度）。

▼抜粋

```
// 省略
import { chromaticAberration } from "three/addons/tsl/display/ChromaticAberrationNode.js";
import { dof } from "three/addons/tsl/display/DepthOfFieldNode.js";

/**
 * Chromatic Aberration + Depth of Fieldエフェクトの作成
 * @param node
 * @param viewZ
 */
export const createChromatic = (node: ShaderNodeObject<TextureNode>, viewZ: ShaderNodeObject<Node>) => {
  const centerVector = new THREE.Vector2(0.4, 0.4);
  const centerNode = uniform(centerVector);
  // 色収差
  const chromaticPass = chromaticAberration(node, float(0.2), centerNode);
  // 被写界深度
  // 焦点をカメラの近くに固定し、遠くなるほどボケさせる
  const dofPass = dof(chromaticPass, viewZ, 1);
  return dofPass;
};
```

![Chromatic Aberration + Depth of Fieldエフェクト](https://ics.media/entry/251113/images/251113_chromatic_aberration_effect.png)

#### Bloomエフェクト

シーンの中の明るい場所から光があふれているような表現ができます。デモでは比較的明るい草むらの花が光っているように見えます。

※明るい場所と暗い場所をはっきりさせるため、エフェクトを実行する前に全体の色味やライトの強さなどを変更する処理を追加しています。

▼抜粋

```
// 省略
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";

/**
 * Bloomエフェクトの作成
 * @param node
 */
export const createBloom = (node: ShaderNodeObject<TextureNode>) => {
  const bloomPass = bloom(node, 0.3, 0, 0);
  bloomPass.smoothWidth.value = 0.3;
  return bloomPass;
};
```

![Bloomエフェクト](https://ics.media/entry/251113/images/251113_bloom_effect.png)

#### Pixelationエフェクト

昔のゲーム画面のようなドット絵にできるエフェクトです。レトロな雰囲気がかわいいですよね。

▼抜粋

```
// 省略
import { pixelationPass } from "three/examples/jsm/tsl/display/PixelationPassNode.js";

/**
 * Pixelationエフェクトの作成
 * @param node
 */
export const createPixelation = (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
  const size = uniform(5);
  const normalStrength = uniform(0.5);
  const edgeSharpness = uniform(1);
  const pixelation = pixelationPass(scene, camera, size, normalStrength, edgeSharpness);
  return pixelation;
};
```

![Pixelationエフェクト](https://ics.media/entry/251113/images/251113_pixelation.png)

#### Sepia + Film + Gaussian Blurエフェクト

Sepiaはその名の通り画面全体をセピア色に変化させます。昔の映像の雰囲気を出すために、Sepiaに加えてGaussian Blurエフェクトでぼかし、Filmエフェクトでざらざら感を追加しています。

このように複数のエフェクトの組み合わせも簡単です。

```
// 省略
import { sepia as sepiaPass } from "three/examples/jsm/tsl/display/Sepia.js";
import { film as filmPass } from "three/examples/jsm/tsl/display/FilmNode.js";
import { gaussianBlur as gaussianBlurPass } from "three/examples/jsm/tsl/display/GaussianBlurNode.js";

/**
 *  Sepia + Film + Gaussian Blurエフェクトの作成
 * @param node
 */
export const createSepia = (node: ShaderNodeObject<TextureNode>) => {
  const sepia = sepiaPass(node);
  const blur = gaussianBlurPass(sepia, 0.5);
  const film = filmPass(blur);
  return film;
}
```

![Sepia、Blur、Filmエフェクト](https://ics.media/entry/251113/images/251113_sepia.png)

### もっと複雑なエフェクトを作りたい

今回はあらかじめ用意してあるアドオンを使ったエフェクトを紹介しました。もっと複雑なエフェクトを作りたい場合はコードを書くことで実現できます。

Three.jsでは、WebGPUの場合はTSL言語を使い、WebGLの場合はGLSL言語で記述するのが一般的です。この記事では紹介しませんが、『[WebGPU対応のThree.jsのはじめ方](https://ics.media/entry/250501)』はTSLでの実装方法を、『[WebGLのシェーダーGLSLでの画像処理の作り方（モノクロ、セピア、モザイク、渦巻き）](https://ics.media/entry/5535/)』ではGLSLでの実装方法を解説しています。興味がある方はぜひ読んでみてください。

### コラム：react-postprocessing

ReactでThree.jsを使うためのライブラリに[React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)があります。ICS MEDIAでは『[React Three Fiber入門　ReactとThree.jsで始める3D表現](https://ics.media/entry/250410/)』で紹介しています。

React Three Fiberでポストプロセスを実装する際は[react-postprocessing](https://github.com/pmndrs/react-postprocessing)を導入するのが手軽です。今回紹介したようなエフェクトをはじめ他にも魅力的なエフェクトがたくさんあるのでオススメです。

ただし、react-postprocessingは2025年11月現在**WebGLのみに対応しており、WebGPUには対応していません。** WebGPUが主流になれば対応する可能性もありますが、現時点では未定です。

### まとめ

Three.jsのポストプロセスについて紹介しました。ポストプロセスを活用すると3Dシーンに印象的な演出を加えられます。アドオンを使えば簡単に実装できるので、自分好みの表現を探してみましょう！