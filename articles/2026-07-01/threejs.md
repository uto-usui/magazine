---
title: "エフェクト作成入門講座 Three.js編 ゲーム演出に役立つマグマ表現の作り方"
source: "https://ics.media/entry/13973/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2016-11-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ゲームやビジュアライゼーションのウェブコンテンツでは、印象に残る3D演出をJavaScriptとThree.jsで実装したい場面が少なくありません。この記事のシリーズでは、3Dライブラリとして定番の[Three.js](https://threejs.org/)を利用して、3Dエフェクトの作成手順を解説します。

今回、扱うテーマは「**マグマエフェクト**」。実は以前、このテーマを3Dエフェクト作成ツールであるEffekseerエフェクシアーで扱ったことがあります（記事「[エフェクト作成入門講座 Effekseer編 UVスクロールを使ったマグマエフェクトの作成](https://ics.media/entry/8674/)」)。Effekseerはプログラムを使わないデザインツールなので、今回紹介するThree.jsによるプログラムの作り方とはまったく異なります。ですが、**表現のエッセンスはどんな作り方でも共通。エフェクトの実装ポイントが理解できていれば、異なった方法でも同じ表現を実装できるのです。**

本記事ではシンプルなJavaScriptやTSLのコードに分解して、身構えることなく学べるようにしています。サンプルコードはGitHubにアップしているので参考にしながら読み進めてください。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160907_magma_effect/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/160907_magma_effect/)

※このデモは[Three.js](https://threejs.org/)(r183 / WebGPU)と[TypeScript](https://www.typescriptlang.org/)(ver 6.0)とViteで作成しました。Three.jsでWebGPUを始める手順は記事「[WebGPU対応のThree.jsのはじめ方](https://ics.media/entry/250501/)」を参照ください。右上のInspectorから各パーツを個別にON/OFFできるので、記事と見比べながら確認すると理解しやすいでしょう。

### エフェクトの構成

Effekseerを使った場合と同様に、6つのオブジェクトの集合で表現できます。それぞれのパーツに施された工夫を順に説明します。

-   マグマ球
-   オーラ球
-   外側グロー
-   スパーク
-   内側グロー
-   フレア

### マグマ球、オーラ球

![](https://ics.media/entry/13973/images/magma_and_aura.gif)

マグマ球とオーラ球は単純な球状のMeshにテクスチャーを当て、その**テクスチャーをずらすことで流れるマグマや漂うオーラを表現しています。**

```
import magmaTextureUrl from "./assets/magma.png";

// テクスチャー読み込み
const loader = new THREE.TextureLoader();
const map = loader.load(magmaTextureUrl);
map.colorSpace = THREE.SRGBColorSpace;
// UVスクロール用のリピート設定
map.wrapS = map.wrapT = THREE.RepeatWrapping;

// 半径2の球へ貼り付け
const mesh = new THREE.Mesh(
  new THREE.SphereGeometry(2, 40, 40),
  new THREE.MeshBasicMaterial({ map }),
);
```

テクスチャーをずらしアニメーションさせるコードを書いてきます。`requestAnimationFrame()`メソッドなどの毎フレーム実行される関数内に処理を追加します。

```
// 経過時間に応じたUVオフセット
// performance.now() は経過ミリ秒
// 秒へ変換しつつ、X/Yで速度差
map.offset.x = performance.now() / 1000 / 2;
map.offset.y = performance.now() / 1000 / 2.5;
```

これでテクスチャーのずれて動くアニメーションができます。このようなテクスチャーを動かすアニメーションを「**UVアニメーション**」と呼びます。オーラ球も考え方は同じで、半径を`2.02`にわずかに広げ、加算合成の透過マテリアルにしたうえで逆方向へUVを流しています。

### 外側グロー

外側のグローは**テクスチャーを貼ったビルボードを表示させます**。ビルボードとは**必ずカメラに対して正面を向く板**の事です。Three.jsでビルボードを実現するには`THREE.Sprite`を使用します。

```
import particleTextureUrl from "./assets/Particle01.png";

// 発光テクスチャー読み込み
const loader = new THREE.TextureLoader();
const map = loader.load(particleTextureUrl);
map.colorSpace = THREE.SRGBColorSpace;

// ビルボード用マテリアル
const material = new THREE.SpriteMaterial({
  map: map,
  // 色変化なし
  color: 0xffffff,
  // 加算合成で発光感
  blending: THREE.AdditiveBlending,
  // 少し薄めの不透明度
  opacity: 0.8,
  transparent: true,
});

// カメラ正面を向く発光板
const sprite = new THREE.Sprite(material);
```

以上でビルボードは作成されますが、**デフォルトの大きさが非常に小さいため適切なサイズになるように拡大を忘れないように**しましょう。

```
// 全体を包むサイズまで拡大
sprite.scale.multiplyScalar(11);
```

### スパーク

スパークは**細長い板状の`Mesh`を大量に配置し、それぞれを下方向へ流して再利用する**ことで再現します。次のコードは1つのスパークの要点です。

```
import sparkTextureUrl from "./assets/Burst01.png";

// 光条テクスチャー読み込み
const loader = new THREE.TextureLoader();
const map = loader.load(sparkTextureUrl);
map.colorSpace = THREE.SRGBColorSpace;
// UVリピート設定
map.wrapS = map.wrapT = THREE.RepeatWrapping;

// 加算合成の発光マテリアル
const material = new THREE.MeshBasicMaterial({
  map,
  transparent: true,
  // 表裏表示
  side: THREE.DoubleSide,
  // 半透明同士の破綻を抑制
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  // 初期透明度
  opacity: 0.5,
});

// 1本分のスパーク
const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 2), material);
// 開始位置をランダム化
mesh.position.y = Math.random() * 5;
// 向きもランダム化
mesh.rotation.y = Math.random() * 2;
```

※上記のコードは説明を簡略化したものです

アニメーションでは、**前フレームとの差分時間を使って移動量を補正し、フレームレートが変わっても速度感が崩れないようにしている**点がポイントです。

```
// スパークごとの速度
const speed = Math.random() * 0.2 + 0.1;
// 前回更新時刻
let previousTime = 0;

const update = () => {
  // 前フレームからの経過時間
  const delta = performance.now() - previousTime;
  // 16ms基準の速度倍率
  const speedRatio = delta / 16;

  // 少しずつフェード
  material.opacity -= 0.01 * speedRatio;
  // 下方向へ移動
  mesh.position.y -= speed * speedRatio;

  // 消えたら上へ戻して再利用
  if (mesh.position.y < 0 || material.opacity < 0) {
    mesh.position.y = 8;
    material.opacity = 0.5;
  }

  // 次フレーム用に保存
  previousTime = performance.now();
};
```

ここまでが1つ分のスパークの処理です。あとはスパークを球の周囲へ回転配置して複製します。**開始位置や向きをランダムで少しずらしておくと、均一すぎない自然な見た目になります。**

ここからはTSLを使ったパーツの紹介です。**TSL（Three.js Shading Language）は、Three.jsのノードマテリアル向けにシェーダー処理を組み立てるための記法**です。GLSLを文字列で直接書かなくても、内積やUV演算、透明度の計算をTypeScriptとして記述できます。

### 内側グロー

球の`Mesh`にTSLでグラデーションをつけ、内側グローを表現します。**法線と視線方向の関係から、球の縁ほど強く光る透明度**を作るのがポイントです。

以下のコードが重要となる部分です。

```
import { MeshBasicNodeMaterial } from "three/webgpu";
import { color, normalView, positionViewDirection, vec4 } from "three/tsl";

// ノードベースのマテリアル
const material = new MeshBasicNodeMaterial({
  // 表面側のみ描画
  side: THREE.FrontSide,
  // 加算合成
  blending: THREE.AdditiveBlending,
  transparent: true,
});

// 法線と視線方向の内積
// 正面ほど1、輪郭ほど0
const alphaNode = normalView
  .dot(positionViewDirection)
  // 0〜1 に制限
  .clamp()
  // 輪郭側を強くするため反転
  .oneMinus()
  // 強さ調整
  .mul(0.55);

// 水色 + 計算したアルファ
material.colorNode = vec4(color(0x96ecff), alphaNode);
```

`normalView.dot(positionViewDirection)`は、**面の向きが視線方向とどれくらい一致しているか**を表します。これを`oneMinus()`で反転すると、面が正面を向く場所よりも輪郭に近い場所のほうが強く光るようになります。

### フレア

![](https://ics.media/entry/13973/images/flare_2.gif)

フレアは**球の周囲を横切るリング状の発光帯**を複数重ねて表現します。**リング面の`BufferGeometry`を自前で組み立ててからTSLで見た目を作る**のがポイントです。

まず、半径2から6までの頂点を並べて薄いリング面を作成します。

```
// 外側半径
const OUTER_RADIUS = 6;
// 内側半径
const INNER_RADIUS = 2;
// 円周方向の分割数
const radialSegments = 30;
// 幅方向の分割数
const widthSegments = 3;
// 頂点座標
const positions: number[] = [];
// UV座標
const uvs: number[] = [];

// 幅方向へ半径を変えつつ頂点生成
for (let y = 0; y <= widthSegments; y++) {
  // 0〜1 の比率
  const v = y / widthSegments;
  // 内径から外径まで補間
  const radius = INNER_RADIUS + (OUTER_RADIUS - INNER_RADIUS) * v;

  // 円周方向に1周分並べる
  for (let x = 0; x <= radialSegments; x++) {
    const u = x / radialSegments;
    // 角度へ変換
    const theta = u * Math.PI * 2;
    // 極座標からXZ座標へ変換
    positions.push(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
    // 対応するUVも保存
    uvs.push(u, v);
  }
}
```

マテリアル側では、**テクスチャーのUVスクロールと、帯の中央だけが強く光る透明度**を組み合わせます。

```
import { MeshBasicNodeMaterial } from "three/webgpu";
import { PI, float, texture, uniform, uv, vec3, vec4 } from "three/tsl";

// 毎フレーム更新するUVオフセット
const offsetNode = uniform(offset);
// オフセット付きのテクスチャー参照
const textureNode = texture(map, uv().add(offsetNode));
// 帯の中央だけ強くするグラデーション
const radialFadeNode = uv().y.mul(PI).sin().clamp().mul(float(0.15));

// 青成分を足して発光色を調整
material.colorNode = vec4(
  textureNode.rgb.add(vec3(0.0, 0.0, 0.3)),
  float(1.0),
);
// テクスチャーのアルファと掛け合わせ
material.opacityNode = textureNode.a.add(float(1.0)).mul(radialFadeNode);
```

`uv().y.mul(PI).sin()`によって、**帯の内側と外側では透明度が落ち、中央だけが強く光る**グラデーションになります。さらに`textureNode.a`を掛け合わせることで、模様付きのフレアにしています。

あとは`offset`を毎フレーム更新してUVを流し、複数のフレアを回転違いで重ねます。フレアを安定して手前に重ねるため、`depthTest: false`、`depthWrite: false`、`renderOrder = 20`も設定しています。

スパークと同じように単一フレアを複数作成し、回転を少しずつ変えて重ねることで以下のようなフレアの表現ができます。

### まとめ

本記事ではEffekseerとはまったく違う技術であるThree.jsを使い、マグマ表現を組み立てる考え方を紹介しました。**TSLやNodeMaterialを使う場合でも、UVを流す、加算発光を重ねる、輪郭だけを持ち上げる、といった演出の原理は変わりません**。

ICS MEDIAではThree.jsを用いた作例を多数解説しています。他の記事もあわせてご覧ください。

※この記事が公開されたのは**9年前**ですが、**2か月前の4月**に内容をメンテナンスしています。