---
title: "GLSLを使ってワンランク上の表現を！ Three.jsでのぷるぷるシェーダーの作り方"
source: "https://ics.media/entry/3228/"
publishedDate: "2014-12-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

WebGLはウェブページに3D表現を組み込むための技術です。そのWebGLを扱いやすくしたJSライブラリの「[Three.js](https://threejs.org/)」。Theee.jsとシェーダー言語GLSLを組み合わせてプリンが揺れるデモを作成しました。本記事では、Three.jsでシェーダー言語を利用する手順を解説します。

### 使用技術について

**GLSL**とは**OpenGL Shading Language**の略でその名の通り、OpenGL(WebGL)で使用できるシェーディング言語です。WebGLではライブラリを使用しない場合は、このシェーディング言語を使用してシェーダー（3D描画のための一連の計算セット）を自力で作成しなければなりません。WebGLのシェーダーは2種類あり、バーテックスシェーダーでは頂点の情報を画面上に反映し、フラグメントシェーダーではピクセル単位での描画を行います。今回はバーテックスシェーダーで頂点の位置をずらしてプリンの揺れを表現します。

**Three.js**はJavaScriptで扱える3DのJavaScriptライブラリです。Three.js自体の基本的な使い方は本サイト内の「[Three.js入門](https://ics.media/tutorial-three/)」にあり、ソース部分をコピーペーストするだけで簡単に3D空間が作成できます。

### デモ

![](https://ics.media/entry/3228/images/pudding_shader_demo_1.png)

※画面内をクリックすると、プリンが揺れます

-   [別ウインドウでデモを開く](https://ics-creative.github.io/141212_glslshader/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/141212_glslshader)

※本サンプルは2025年4月に`WebGL 1.0`から`WebGL 2.0（GLSL ES3.0）`への更新を行いました。

### シェーダーの書き方

シェーダーであるGLSL言語はテキストで記述します。JavaScript内には文字列としてプログラムを記載します。バッククオートを使いテンプレート文字列を利用してプログラムを文字列として記述します。

▼ `shaderVertex.js`

[ソースコードを参照](https://github.com/ics-creative/141212_glslshader/blob/gh-pages/js/shaders/shaderVertex.js)

```
// language=GLSL
export const shaderVertex = `
  // 頂点属性
  in vec3 position;
  in vec3 normal;
  
  // フラグメントシェーダーに送る値
  out vec3 vNormal;
  out vec3 mvPosition;
  out vec2 vUv;

  // ･･･以下省略
  `;
```

WebStorm等のIDEであれば、プラグインを追加することでテンプレート文字列内のGLSL言語をシンタックスハイライトがされた状態で扱えます。

### バーテックスシェーダー

バーテックスシェーダーでは3D空間上に配置された頂点が画面上のどの位置にあるかを計算します。このシェーダー上では、頂点の情報を参照・変更することが可能です。

#### プリンを揺らす前の計算

バーテックスシェーダーの必要最低限の計算は以下となります。頂点位置（`position`）をモデル行列（`modelViewMatrix`）でワールド座標に変換し、ビュー行列（`projectionMatrix`）でスクリーン座標に変換します。この計算を基準としてプリンを揺らす処理を記述します。

```
void main(){
  gl_Position = projectionMatrix * modelViewMatrix * position;
}
```

#### プリンの揺らし方

頂点位置に当たる`position`を調整します。時間の経過によって揺れを表現しますが、シェーダー内ではコンテンツの経過時間のような外部の変数を保持することができないため、各フレーム毎にその値を送る必要があります。外部から取り込むシェーダー内の共通の値は`uniform`という識別子をつけてThree.js経由で値を送ります。今回は`frame`（時間の経過）、`modelHeight`（3Dモデルの高さ）、`swingVec`（揺れの方向）、`swingStrength`（揺れの大きさ）をThree.js経由で送っています。

![141212_プリン説明テキスト](https://ics.media/entry/3228/images/51e2387b91795b5c1c52e55959f7493e.png)

上記図を見ながら揺れの計算を説明します。

【手順1】まず、プリン型の3Dモデルの`{x:0,y:0,z:0}`の位置は中央のため底の位置を0として合わせるために `modelHeight / 2.0`（3Dモデルの高さの半分）分ずらします。また、頂点位置の情報を`0`〜`1.0`の値へ合わせると後ほど計算しやすいので「modelHeight」分で割ります。

【手順2】揺れの大きさを決めます。`swingStrength`に**1.**で決めた高さの`0〜1.0`で合わせた値で掛けます。そうすると、底部分が0の為どんな値を掛けても0のまま固定され、上部になるほど揺れが大きくなるといった動きを表現できます。

【手順3】揺れの早さの指定を行っています。`sin()`関数を使用し、波の形で揺れの形を指定しています。`frame`の値が早く大きくなるほど揺れの振動が早くなります。具体的には`sin()`の周期が`-1π〜1π`で1周期なので`2π`分時間が経つと揺れが一番上まで到達します。図の3では`1π`分上に移動しています。

【手順4】3Dモデル内の揺れの個数の計算をしています。揺れの個数とは3Dモデル内で何度振動があるかのことです。`positionNormalized(高さ0〜1.0の値) * waveNum(揺れの個数) * PI * 2`と計算しています。この値を`sin()`関数に入れているので波の形は`sin(0〜2π)`で表せられるカーブの形になっています。`waveNum`を`1`にし、最後に掛け合わせる`strength`の値を`10`と大きめに設定すると下記図5のような形になります。waveNumは大きめの値を入れるとぐにゃぐにゃと揺れて楽しいです。

![141212_プリン揺れの回数](https://ics.media/entry/3228/images/e50008500722b408cbaa2ba17ccf7f26.png)

【手順5】 最後に揺れの方向を決定します。`swingVec`という`vec3`形式の値を今までの計算で得た値に掛けあわせます。この方向を変えると揺れる形も変わっていきます。たとえばデモで一番最初に落ちてくるときの`swingVec`は縦方向に揺らすため`{x:0,y:1,z:0}`になっています。

▼ `shaderVertex.js`

```
// CPUから送られたuniform変数
// main.jsのtick()関数内から変更
uniform float frame;
uniform float modelHeight;
uniform vec3 swingVec;
uniform vec3 lightPosition;
uniform float swingStrength;
```

```
void main() {
  // PIは定義されていないので自分で定義
  const float PI = 3.14159265359;
  float waveNum = 0.5;

  // 1.位置を0〜1.0の位置に合わせる
  float fit0Position = position.y + modelHeight / 2.0;
  float positionNormalized = fit0Position / modelHeight;

  // 2.揺れ幅の調整を行う
  float strength = swingStrength * positionNormalized;
  // 3.揺れの早さ(frame) 4.3Dモデル内の揺れの個数を指定する(positionNormalized * waveNum * PI * 2.0) 
  float wave = sin(frame + positionNormalized * waveNum * PI * 2.0) * strength;

  // 5.新しい頂点位置の生成
  vec3 newPosition = position + (swingVec * wave);
  ...

  // 頂点位置の出力
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
```

### 3Dモデルにシェーダーを適用する

3Dモデルへは`THREE.RawShaderMaterial(ShaderMaterial)`というマテリアルを指定することで自作したシェーダーを適用できます。Three.jsの`THREE.RawShaderMaterial`経由でシェーダーのテキスト、`uniform`等を指定します。

```
const uniformsPudding = {
  frame: {
    type: "f", // float型
    value: 0.0
  },
  modelHeight: {
    type: "f", // float型
    value: 5
  },
  swingVec: {
    type: "v3", // Vector3型
    value: swingVec
  },
  swingStrength: {
    type: "f", // float型
    value: swingStrength
  }
  // 一部抜粋
};

const shaderMaterialPudding = new THREE.RawShaderMaterial({
  uniforms: uniformsPudding,
  // シェーダーを割り当てる
  vertexShader: shaderVertex,
  fragmentShader: shaderFragment,
  // GLSLのバージョンを指定
  glslVersion: THREE.GLSL3,
});
```

メッシュ作成時にシェーダーマテリアルを指定します。

```
const geometry = new THREE.CylinderGeometry(
  8.4, // 天盤
  11.2, // 底面
  11.2, // 高さ
  100, // 円柱状の分割
  30, // 縦方向の分割
);
const cylinder = new THREE.Mesh(geometry, shaderMaterialPudding);
```

### おわりに

今回の記事ではバーテックスシェーダーで3Dモデルの各頂点の位置をずらすことで揺れを表現してみました。この方法を用いると3Dモデルをさまざまな形に変形させることができます。みなさんも一緒にGLSLを使って表現力アップしてみませんか？

※この記事が公開されたのは**11年前**ですが、**9か月前の2025年4月**に内容をメンテナンスしています。