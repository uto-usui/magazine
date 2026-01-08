---
title: "エフェクト作成入門講座 Three.js編 ゲーム演出に役立つマグマ表現の作り方"
source: "https://ics.media/entry/13973/"
publishedDate: "2016-11-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ゲームやビジュアライゼーションのWebコンテンツでは、華やかな3D演出の実装をJavaScriptとWebGLで求められることがあります。この記事のシリーズでは、WebGLのJSライブラリとして有名な[Three.js](https://threejs.org/)を利用して、3Dエフェクトの作成手順を解説します。

今回、扱うテーマは「**マグマエフェクト**」。実は以前、このテーマを3Dエフェクト作成ツールであるEffekseerエフェクシアーで扱ったことがあります（記事「[エフェクト作成入門講座 Effekseer編 UVスクロールを使ったマグマエフェクトの作成](https://ics.media/entry/8674/)」)。Effekseerはプログラムを使わないデザインツールなので、今回紹介するThree.jsによるプログラムの作り方とはまったく異なります。ですが、**表現のエッセンスはどんな作り方でも共通。エフェクトの実装ポイントが理解できていれば、異なった方法でも同じ表現を実装できるのです。**

本記事ではシンプルなJavaScriptやGLSLのコードに分解して、身構えることなく学べるようにしています。サンプルコードはGitHubにアップしているので参考にしながら読み進めてください。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160907_magma_effect/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/160907_magma_effect/)

※このデモは[Three.js](https://threejs.org/)(r175)と[TypeScript](https://www.typescriptlang.org/)(ver 5.8)とwebpackで作成しました。環境構築は記事「[最新版TypeScript + webpackの環境構築まとめ](https://ics.media/entry/16329/)」を参照ください

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

以下のコードで球を作りテクスチャーを当てます。

```
// テクスチャーを読み込みます。
const loader = new THREE.TextureLoader();
const map = loader.load("画像フォルダー/テクスチャー画像.png"); // 仮

// テクスチャーをあてた球のMeshを作成します。
const mesh = new THREE.Mesh(
  // ジオメトリ
  new THREE.SphereGeometry(2, 20, 20),
  // マテリアル
  new THREE.MeshBasicMaterial({ map })
);
```

次にアニメーションをさせた際に**テクスチャーがリピートするように設定を追加します。**

```
// 縦横でリピートするように設定します。
map.wrapS = map.wrapT = THREE.RepeatWrapping;
```

テクスチャーをずらしアニメーションさせるコードを書いてきます。`requestAnimationFrame()`メソッドなどの毎フレーム実行される関数内に処理を追加します。

```
// 時間の経過でテクスチャーをずらします。
// performance.now()はページを開いてからの経過ミリ秒です。
// 1000で割って単位を秒にします。
map.offset.x = performance.now() / 1000 / 2;
map.offset.y = performance.now() / 1000 / 2.5;
```

これでテクスチャーのずれて動くアニメーションができます。このようなテクスチャーを動かすアニメーションを「**UVアニメーション**」と呼びます。

### 外側グロー

![](https://ics.media/entry/13973/images/outglow.gif)

外側のグローは**テクスチャーを貼ったビルボードを表示させます。**ビルボードとは**必ずカメラに対して正面を向く板**の事です。Three.jsでビルボードを実現するには`THREE.Sprite`を使用します。

```
// テクスチャーを読み込みます。
const loader = new THREE.TextureLoader();
const map = loader.load("画像フォルダー/テクスチャー画像.png"); // 仮

// マテリアル
const material = new THREE.SpriteMaterial({
  map: map,
  color: 0xffffff,
  blending: THREE.AdditiveBlending,
  transparent: true
});

// スプライト
const sprite = new THREE.Sprite(material);
```

以上でビルボードは作成されますが、**デフォルトの大きさが非常に小さいため適切なサイズになるように拡大を忘れないように**しましょう。

```
sprite.scale.multiplyScalar(11);
```

### スパーク

![](https://ics.media/entry/13973/images/spark.gif)

スパークは**板状の`Mesh`を複数作成し、中心に集まるようなアニメーションをさせて再現します**。  
次のコードは1つのスパークを生成するものです。

```
// テクスチャーを読み込みます。
const loader = new THREE.TextureLoader();
const map = loader.load("画像フォルダー/テクスチャー画像.png"); // 仮

// 板状のMeshを作成します。
const mesh = new Mesh(
  new THREE.PlaneGeometry(0.04, 2),
  new THREE.MeshBasicMaterial({ map })
);
```

**あらかじめスパークのY座標をプラスへずらしておき、中心点`(0, 0)`に向かって進むアニメーションをつけ、さらに中心点に向かうにつれ透明度を増加させフェードアウトしていくアニメーションを加えます**。マグマ球の時と同様に毎フレーム実行される関数に処理を追加します。

```
// 毎フレーム少しずつ移動し透明に近づける。
mesh.position.y -= 0.5;
mesh.material.opacity -= 0.05;

// 透明度が0以下だったら位置と透明度を初期化する。
if (mesh.material.opacity <= 0) {
  mesh.position.y = 5;
  mesh.material.opacity = 1;
}
```

※上記のコードは説明を簡略化したものです

ここまでが1つ分のスパークの処理です。あとはスパークを中心点`(0, 0)`を支点として回転させた物を複製します。**スパークの開始位置をランダムで少しずらしておくと、既視感がなくなりクオリティが上がるのでオススメです。**

ここからはGLSLを使ったパーツの紹介です。**GLSLとはシェーダーを書くための言語の事です。**GLSLをはじめて知ったという方は記事「[GLSLを使ったThree.jsでのぷるぷるシェーダーの作り方](https://ics.media/entry/3228/)」で詳しく解説しているので参考ください。

### 内側グロー

![](https://ics.media/entry/13973/images/inglow.gif)

球の`Mesh`にGLSLからグラーデーションをつけ内側グローを表現します。頂点法線ベクトルとカメラの位置ベクトル向きが近くなればなるほど透過が増していく仕組みです。そのためには**頂点法線ベクトルとカメラの位置ベクトルの内積を計算しその値を透明度として利用します。**

以下のコードは内側グローで重要となる頂点シェーダーのコードです。

```
/**
 * 頂点シェーダー
 */
uniform vec3 viewVector;    // カメラ位置ベクトル
varying float opacity;      // フラグメントシェーダーに渡す透明度
void main()
{
  // 単位ベクトル化した頂点法線ベクトル
  vec3 nNomal = normalize(normal);
  // 単位ベクトル化したカメラの位置ベクトル
  vec3 nViewVec = normalize(viewVector);

  // 2つのベクトルの内積(これが透明度となる)
  opacity = dot(nNomal, nViewVec);
  // 反転
  opacity = 1 - opacity; 

  // 3次元上頂点座標を画面上の2次元座標に変換(お決まり)
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

内積を求めるため、JavaScriptから渡された**カメラの位置ベクトルと頂点ベクトルを単位ベクトルへ変換します**。

```
// 単位ベクトル化した頂点法線ベクトル
vec3 nNomal = normalize(normal);
// 単位ベクトル化したカメラの位置ベクトル
vec3 nViewVec = normalize(viewVector);
```

このままだと球の中心が色が濃く周りが薄い状態になってしまうため**透明度を反転させます**。

```
// 2つのベクトルの内積
opacity = dot(nNomal, nViewVec);
// 反転させる
opacity = 1 - opacity;
```

求めた`opacity`をフラグメントシェーダーへ渡し、そのまま透明度として使用すれば内側グローの完成です。

```
/**
 * フラグメントシェーダー
 */
uniform vec3 glowColor; // グローの色
varying float opacity;  // 頂点シェーダーから受け取る透明度
void main()
{
  gl_FragColor = vec4(glowColor, opacity);
}
```

### フレア

![](https://ics.media/entry/13973/images/flare_2.gif)

フレアは**ドーナツ上の単一フレアの集合**により表現できます。フレアも内側グローと同様にGLSLで作成します。

上の画像のようにドーナツ状の`Mesh`にUVアニメーションと縁の透過グラデーションを加えます。**縁の透過グラデーションはパキッとした不自然な見た目になることを防ぐためです。**

今回はフラグメントシェーダーでの処理が非常に重要になります。以下のコードは単一フレアを表現するためのフラグメントシェーダーです。

```
uniform sampler2D map;      // テクスチャーデータ
uniform float opacity;      // 透明度
uniform float topRadius;    // 外径
uniform float bottomRadius; // 内径
varying vec2 vUv;           // UV座標
varying float radius;       // 頂点位置から中心までの距離
const float PI = 3.1415926; // 円周率

void main() {
  // uvの位置情報からテクスチャーの色を取得
  vec4 tColor = texture2D(map, vUv);
  // ドーナツの辺の幅 = 円柱上面の半径 - 円柱下面の半径 
  float width = topRadius - bottomRadius;
  // 描画位置がドーナツの幅の何割の位置になるか
  float ratio = (radius - bottomRadius) / width;
  float opacity = opacity * sin(PI * ratio);
  // ベースカラー
  vec4 baseColor = (tColor + vec4(0.0, 0.0, 0.3, 1.0));
  // 透明度を反映させる
  gl_FragColor = baseColor * vec4(1.0, 1.0, 1.0, opacity);
}
```

頂点シェーダーから渡されるUV座標の値`vUv`を使い**座標に対応する色をテクスチャーから取得します。**

```
// uvの位置情報からテクスチャーの色を取得
vec4 tColor = texture2D(map, vUv);
```

**描画位置がドーナツの辺の幅の何割の位置に相当するか**を算出します。

```
// ドーナツの辺の幅 = 円柱上面の半径 - 円柱下面の半径 
float width = topRadius - bottomRadius;
// 描画位置がドーナツの幅のどの割合かを計算
float ratio = (radius - bottomRadius) / width;
```

割合をラジアン角として`sin`を使って透明度を計算します。これにより**端に行くほど値が`0`になり中央に近づけば値は`1`に近づくグラデーションができます。**

```
// 割合をラジアン角としsinで透明度を計算する
float opacity = opacity * sin(PI * ratio);
// 透明度を反映させる
gl_FragColor = baseColor * vec4(1.0, 1.0, 1.0, opacity);
```

あとは頂点シェーダーでUV座標をずらす処理を加えてUVアニメーションをさせれば単一フレアの完成です。UVアニメーションの方法は頂点シェーダーで座標をインクリメントしてずらす簡単な手法です。詳しくはソースコードを参考ください。

スパークと同じように単一フレアを複数作成し、ランダムな回転を持たせることで以下のようなフレアの表現ができます。

![](https://ics.media/entry/13973/images/flare.gif)

### まとめ

本記事ではEffekseerとはまったく違う技術であるThree.jsで同一の3D表現を実装しました。**異なる技術でも作り方の大事なポイントは同じであり、得られるヒントがとても多いことに気付いてもらえたのではないかと思います**。

ICS MEDIAではThree.jsを用いた作例を多数解説しています。他の記事もあわせてご覧ください。