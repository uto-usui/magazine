---
title: "Three.jsとCurl Noiseで動かす3Dパーティクル表現"
source: "https://ics.media/entry/251120/"
publishedDate: "2025-11-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "oka"
---

2025年11月20日 公開 / [株式会社ICS 岡 大貴](https://ics.media/entry/staff/oka/)

3Dを用いたウェブサイトでは、パーティクルを使った表現をよく目にします。メインのビジュアルにパーティクルのアニメーションを重ねることで、サイトの視覚的な印象を強めることができます。

この記事では、パーティクル表現を用いたウェブサイトの事例を紹介しつつ、数ある表現手法の中でも**3D空間を漂うパーティクル表現**をThree.jsを使って実装します。なお、本記事のデモにはThree.js r181とTypeScriptを使用しています。

### 事例紹介

サイト『[Heidelberg Materials](https://ccus.heidelbergmaterials.com/)』では、パーティクルを使って3Dオブジェクトが描画されています。さらに周囲にも無数のパーティクルがゆっくりと漂っています。3Dオブジェクトにマウスを合わせるとパーティクルが一瞬散るエフェクトも見られます。

▼ サイト『[Heidelberg Materials](https://ccus.heidelbergmaterials.com/)』

![Heidelberg Materials](https://ics.media/entry/251120/images/heidelbergmaterials.gif)

サイト『[Utsubo](https://www.utsubo.com/ja)』では、走るチーターの周辺にパーティクルを配置し、パーティクルを一方向に動かすことで躍動感を表現しています。パーティクルがチーターやマウスにぶつかると弾かれるエフェクトも実装されています。

▼ サイト『[Utsubo](https://www.utsubo.com/ja)』

![Utsubo](https://ics.media/entry/251120/images/utsubo.gif)

サイト『[Blue Yard](https://blueyard.com/)』のトップページでは、球体とパーティクルを組み合わせた表現をしています。外側のパーティクルは放射状に広がり、内側は群のように球体の内部を渦巻いています。こちらのサイトもマウスを近づけることでパーティクルの軌道を変えるようなエフェクトが実装されています。

▼ サイト『[Blue Yard](https://blueyard.com/)』

![Blue Yard](https://ics.media/entry/251120/images/blueyard.gif)

これらのウェブサイトのように、パーティクルを自動的に動かしたり、マウスと連動して動きを変化させたりすることで、没入感の高い体験を実現できます。

### デモ：3D空間を漂うパーティクル

今回は3D空間上にベクトル場を用意し、複数のパーティクルがさまざまな方向に漂うデモを作成します。

ここでいうベクトル場とは、空間のあらゆる位置に「向き」と「強さ」をもつベクトル（力）を割り当てたものです。パーティクルは自身の位置に存在するベクトルの影響を受けて動き、全体として流体のような滑らかな流れが生まれます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251120_threejs-particles/dist/)
-   [コードを確認する](https://github.com/ics-creative/251120_threejs-particles/blob/main/src/main.ts)

### ソースコードの解説

今回実装したデモのソースコードのうち、要点となる箇所をピックアップして解説します。

#### パーティクルの作成

まずパーティクルの個数と初期座標を決め、パーティクルを作成する部分です。

パーティクル座標は`positions`という変数で管理し、初期座標にはThree.jsのMathUtilsで提供されている`randFloatSpread(range)`メソッドを使用します。`randFloatSpread(range)`メソッドは引数で指定した`range`を基準に、`-range/2`~`range/2`の範囲のランダムな浮動小数点数を返します。これを利用して、パーティクル座標を指定した範囲内のランダムな場所に配置します。

なお`positions`には`Float32Array`オブジェクトを活用し、効率的な座標の処理を実現しています。詳しくは記事『[あらためて理解するArrayBuffer - JavaScriptでバイナリデータを扱う方法](https://ics.media/entry/250408/)』をご覧ください。

```
// パーティクルの初期化
const MAX = 2400;
const range = 24;
const positions = new Float32Array(MAX * 3);

for (let i = 0; i < MAX; i++) {
  positions[i * 3] = THREE.MathUtils.randFloatSpread(range);
  positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(range);
  positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(range);
}
```

#### パーティクルのテクスチャ作成

Three.jsのPointsMaterialクラスを使ってパーティクルを作成すると、テクスチャにはデフォルトで正方形が描画されます。これをより自然で柔らかい見た目にするため、`canvas`で作成したテクスチャを貼り付けています。

ここでは`createRadialGradient()`メソッドを利用して、中央が明るく外側へ向かって透明にフェードする円形のグラデーションを描画しています。

そして描画したグラデーションを、Three.jsの`CanvasTexture`クラスを使い、パーティクルのテクスチャとして使用します。

```
// パーティクルのテクスチャを作成
function makeCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  // 円形のグラデーションを作成
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)"); // 中央の明るい円
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // 外側の透明な円
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}
material.map = makeCircleTexture();
```

![テクスチャの比較](https://ics.media/entry/251120/images/texture-before-after.jpg)

デフォルトのテクスチャと`canvas`によるテクスチャを比較すると、印象が大きく変わるのではないでしょうか。

#### パーティクルを動かす

作成したパーティクルを3D空間に漂わせるために、**カールノイズ**と呼ばれるノイズ関数を簡易的に実装し、その結果を利用しています。

処理全体を簡単に説明すると、各パーティクル付近のベクトル場がどの方向に流れているのかを調べ、ベクトル場の流れの向きをパーティクルの位置に加算することで、流体のような動きを作り出しています。

今回のデモではまず、3次元のベクトル場を返す関数`sampleVectorField()`を作成しています。これを利用し、関数`curlNoise()`内では、パーティクルの座標から付近6点のベクトル場を調べ、**ベクトル場の影響でパーティクルがどう流れるか**を計算します。

```
// 3次元のベクトル場を作成
function sampleVectorField(x: number, y: number, z: number) {
  return new THREE.Vector3(
    noise.noise3d(y, z, x),
    noise.noise3d(z, x, y),
    noise.noise3d(x, y, z),
  );
}

// 三次元ベクトル場の回転成分を近似で求める
function curlNoise(x: number, y: number, z: number) {
  const E = 0.0001; // サンプリングのための微小な座標の差分
  // パーティクル付近の6点をサンプリング
  const fx1 = sampleVectorField(x + E, y, z);
  const fx2 = sampleVectorField(x - E, y, z);
  const fy1 = sampleVectorField(x, y + E, z);
  const fy2 = sampleVectorField(x, y - E, z);
  const fz1 = sampleVectorField(x, y, z + E);
  const fz2 = sampleVectorField(x, y, z - E);

  // 回転成分を計算
  return new THREE.Vector3(
    (fy1.z - fy2.z - (fz1.y - fz2.y)) / (2 * E),
    (fz1.x - fz2.x - (fx1.z - fx2.z)) / (2 * E),
    (fx1.y - fx2.y - (fy1.x - fy2.x)) / (2 * E),
  );
}
```

関数`curlNoise()`を使用してそれぞれのパーティクルを更新していく処理が以下のコードです。各パーティクルの座標に対して`curlNoise()`による力を加算して移動させています。

また、パーティクルの座標が離れ過ぎた場合は`randFloatSpread()`メソッドを使って再度初期化しています。

```
const noiseScale = 0.1;      // ノイズの大きさ。大きいほどパーティクルの動きが揺らぐ。
const flowStrength = 0.003;  // ベクトル場による力の大きさ。大きいほどパーティクルが速く動く。
// パーティクルをアニメーションさせる
function animate() {
  const pos = geometry.attributes.position;

  for (let i = 0; i < MAX; i++) {
    // Curl Noiseのベクトル場flowをパーティクルの位置に加算
    const p = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
    const flow = curlNoise(
      p.x * noiseScale,
      p.y * noiseScale,
      p.z * noiseScale,
    );
    flow.multiplyScalar(flowStrength);
    pos.setX(i, pos.getX(i) + flow.x);
    pos.setY(i, pos.getY(i) + flow.y);
    pos.setZ(i, pos.getZ(i) + flow.z);

    // パーティクルがrangeよりも離れたら位置をリセット
    if (p.length() > 2 * range) {
      pos.setX(i, THREE.MathUtils.randFloatSpread(range));
      pos.setY(i, THREE.MathUtils.randFloatSpread(range));
      pos.setZ(i, THREE.MathUtils.randFloatSpread(range));
    }
  }

  pos.needsUpdate = true;
  controls.update();
  composer.render();
  requestAnimationFrame(animate);
}
```

カールノイズについてさらに理解を深めたい方は、記事『[【WebGPU】Compute Shader で Curl Noise を計算してパーティクルを動かす - KAYAC Engineers’ Blog](https://techblog.kayac.com/webgpu-particle-compute-shader-curl-noise)』が参考になります。

#### ポストプロセス

この作例ではThree.jsのポストプロセスを使った視覚効果を2つ加えています。

1つは`UnrealBloomPass`クラスを使った**光のぼかし**です。明るい部分をぼかすブルーム効果により、パーティクルが柔らかく光るように見せています。

2つ目は`AfterimagePass`クラスによる**光の残像**の描画です。前のフレームを少し残して重ね描きすることでパーティクルの軌跡を残し、動きの方向や流れが視覚的にわかりやすくしています。

```
// ポストプロセス処理
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// UnrealBloomPass (光のぼかし）
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.8,
  0.8,
  0.0,
);
composer.addPass(bloom);

// AfterimagePass (光の残像)
const afterimage = new AfterimagePass();
afterimage.uniforms["damp"].value = 0.86;
composer.addPass(afterimage);
```

![ポストプロセスによる視覚効果の比較](https://ics.media/entry/251120/images/postprocess-compare.jpg)

ポストプロセスなしの場合とポストプロセスを適用した場合を比較すると、数行のコードを加えるだけでも大きくビジュアルが変化することがわかりますね。Three.jsのポストプロセスについてもっと知りたい方は記事『[簡単で効果大！Three.jsのポストプロセスで映える3D表現](https://ics.media/entry/251113/)』をご覧ください。

### まとめ

この記事ではThree.jsを使ったパーティクル表現の一例を紹介しました。

デモで紹介した手法に加えて、パーティクルの動き方を変えたり、マウスインタラクションを組み合わせたりすることで、さらに豊かな表現を作り出すことができます。

ICS MEDIAでは他にも記事『[Three.js(WebGPU)で実現するStable Fluids - 2Dの流体シミュレーション](https://ics.media/entry/250916/)』や『[エフェクト作成入門講座 Three.js編 - レンズフレア表現](https://ics.media/entry/476/)』などThree.jsを使ったさまざまな表現を取り上げていますので、あわせてご覧ください。また、Three.jsがはじめての方は、本サイト内の『[Three.js入門サイト](https://ics.media/tutorial-three/)』を参照ください。