---
title: "WebGLのシェーダーGLSLでの画像処理の作り方（モノクロ、セピア、モザイク、渦巻き）"
source: "https://ics.media/entry/5535/"
publishedDate: "2015-03-12"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

WebGLを使うと画像処理が実現でき、HTMLコンテンツに多彩なグラフィカル表現をもたらすことができます。たとえば、**表示をモノクロームやモザイクにするといった画像エフェクトは簡単に実現できます**。

WebGLはGPUの恩恵を受けられるため高速に実行でき、他の代替手法（canvas要素Context2Dオブジェクトによる画像処理等）よりも負荷が軽いのが利点です。

今回はWebGLの定番JSライブラリ「[Three.js](https://threejs.org/)」とGLSLというシェーダー言語を使った、9種類の画像処理の実装方法を紹介します。ソースコードは「[GitHub](https://github.com/ics-creative/180611_threejs_postprocessing)」からダウンロードして読み進めてください。

### サンプルを試してみよう

次のサンプルでは複数のシェーダーを適用できます。画面左上のチェックボックスで画像加工を選択でき、ラジオボタンから画像とビデオの2種類を切り替えることができます。

![](https://ics.media/entry/5535/images/180611_threejs_posteffect.jpg)

-   [別ウインドウでデモを開く](https://ics-creative.github.io/180611_threejs_postprocessing/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180611_threejs_postprocessing)

※ビデオは「[Big Buck Bunny | Blender Foundation](https://www.blender.org/)」を利用しています。  
※本サンプルは2025年4月現在のThree.js r175とVue.js 3で実装しています。  
※本サンプルは2025年4月に`WebGL 1.0`から`WebGL 2.0（GLSL ES3.0）`への更新を行いました。

### 前提として覚えておく必要があるのは、フラグメントシェーダーの使い方

Three.jsでフラグメントシェーダー(断片シェーダー)を適用するコードは公式のデモ「[postprocessing](https://threejs.org/examples/#webgl_postprocessing)」が参考になります。Three.jsでシェーダーを作るための必要なJavaScriptファイル「CopyShader.js」「MaskPass.js」「EffectComposer.js」「RenderPass.js」「ShaderPass.js」を手に入れるためにも、公式のソースコード「[Three.js](https://github.com/mrdoob/Three.js)」からダウンロードしておきましょう。「example」フォルダーにこれらのファイルが格納されています。

Three.jsでシェーダーを使用する際のフラグメントシェーダーの必要最低限の計算は以下となります。このコードをカスタマイズして、いろんな画像加工エフェクトを作っていきます。

▼フラグメントシェーダー

```
precision mediump float;

in vec2 vUv;
uniform sampler2D tDiffuse;
out vec4 fragColor;
void main() {
  vec4 color = texture(tDiffuse, vUv);
  fragColor = color;
}
```

`precision mediump float;`は、このシェーダー内で使う`float`型（浮動小数点数）の精度を中程度（medium precision）に設定する宣言です。モバイル環境ではパフォーマンスと描画精度のバランスを取るため、こうした精度指定が必要になります。

`vUv`はバーテックスシェーダーからフラグメントシェーダーへ渡されるUV座標で、`in`はこの値が入力であることを示します。`texture()`関数を使って、テクスチャ`tDiffuse`から`vUv`に対応するピクセルカラーを取得できます。`out`はフラグメントシェーダーの出力を指定するためのキーワードで、ここでは`fragColor`という名前の出力変数を定義しています。 この`fragColor`に色を代入することで、そのピクセルに表示される最終的な色が決まります。

### モノクローム

![](https://ics.media/entry/5535/images/180611_threejs_postprocess_mono.png)

**表示をモノクロ（白黒）に変更するシェーダー**。赤・緑・青の三原色を計算し彩度を消すことで、モノクロになります。

まずはじめにRGB各色から輝度を計算します。本来なら`(r + g + b) / 3.0`を輝度の値にしたいところですが、同じ合計値でも色によって感じる明るさが異なるため、輝度計算する計算式を使用しています。輝度を計算後、白黒になるように掛け算を行います。

▼フラグメントシェーダー

```
precision mediump float;

// 輝度を計算するときの重ねづけ。緑の重みが高いのは、人間の目が緑に敏感だからです。
#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

in vec2 vUv;
uniform sampler2D tDiffuse;

// モノクロにするためのスケール値を計算
const vec3 monochromeScale = vec3(R_LUMINANCE, G_LUMINANCE, B_LUMINANCE);
out vec4 fragColor;

void main() {
  // 現在の色RGBAを取得
  vec4 color = texture(tDiffuse, vUv);
  // モノクロの輝度を計算
  float grayColor = dot(color.rgb, monochromeScale);
  // モノクロのRGBAに変換
  color = vec4(vec3(grayColor), 1.0);
  fragColor = vec4(color);
}
```

### ネガポジ反転

![](https://ics.media/entry/5535/images/180611_threejs_postprocess_nega-posi.png)

**ネガポジとはその名の通り、色の数値を反転させることで実現できます**。具体的にはピクセルカラーを100%から反転させます`color`に入る値は「0.0〜1.0」になるので、1.0から色の値を引くだけで簡単に色が反転されます。

▼フラグメントシェーダー

```
precision mediump float;

in vec2 vUv;
uniform sampler2D tDiffuse;
out vec4 fragColor;

void main() {
  // ピクセルカラーを取得
  // colorはx,y,z,wの要素で順番に赤、緑、青、アルファとなる
  vec4 color = texture(tDiffuse, vUv);
  // 各色は0.0〜1.0の値をもつので、1.0から引くことで反転させる。
  // 順番に赤、緑、青、アルファを指定する
  fragColor = vec4(1.0 - color.x, 1.0 - color.y, 1.0 - color.z, 1.0);
}
```

### セピア調

![](https://ics.media/entry/5535/images/180611_threejs_postprocess_sepia.png)

表示をセピア調に変更するシェーダーです。**モノクロと表現は似ていますが、映画の回想シーンでよく見かけるエフェクトですよね**。まずはじめにRGB各色から輝度を計算します。本来なら`(r + g + b) / 3.0`を輝度の値にしたいところですが、同じ合計値でも色によって感じる明るさが異なるため、輝度計算する計算式を使用しています。輝度を計算後、セピア色になるように掛け算を行います。

▼フラグメントシェーダー

```
precision mediump float;

// 輝度を計算するときの重ねづけ。緑の重みが高いのは、人間の目が緑に敏感だからです。
#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

in vec2 vUv;
uniform sampler2D tDiffuse;
out vec4 fragColor;

void main() {
  vec4 color = texture(tDiffuse, vUv);
  float v = color.x * R_LUMINANCE + color.y * G_LUMINANCE + color.z * B_LUMINANCE;
  // セピア調に変換（セピアなので赤や緑を多め）
  color.x = v * 0.9; // 赤
  color.y = v * 0.7; // 緑
  color.z = v * 0.4; // 青
  fragColor = vec4(color);
}
```

### モザイク

![](https://ics.media/entry/5535/images/180611_threejs_postprocess_mosaic.png)

**モザイク処理はフラグメントシェーダーを使うと、簡単な計算式で実現できます**。

-   現在のスクリーンを任意のピクセルごとに縦横に分割
-   分割した中での中央のピクセルを見てピクセルカラーを設定する
-   本来は分割したピクセル内の平均値を設定するとベスト

以下のコードの`fMosaicScale`はシェーダー外から設定をしているモザイクのピクセル数です。

▼フラグメントシェーダー

```
precision mediump float;

in vec2 vUv;
uniform sampler2D tDiffuse;
uniform vec2 vScreenSize;
uniform float fMosaicScale;
out vec4 fragColor;

void main() {
  vec2 vUv2 = vUv;
  vUv2.x = floor(vUv2.x * vScreenSize.x / fMosaicScale) / (vScreenSize.x / fMosaicScale) + (fMosaicScale / 2.0) / vScreenSize.x;
  vUv2.y = floor(vUv2.y * vScreenSize.y / fMosaicScale) / (vScreenSize.y / fMosaicScale) + (fMosaicScale / 2.0) / vScreenSize.y;
  
  vec4 color = texture(tDiffuse, vUv2);
  fragColor = color;
}
```

### すりガラス

![](https://ics.media/entry/5535/images/180611_threejs_postprocess_diffusion.png)

**すりガラス越しに見たような効果もフラグメントシェーダーで実現できます。もしくはクレヨンでスケッチしたような効果と見立てることもできます。**

実装方法としては周辺のピクセルからランダムでピクセルを取得します。

▼フラグメントシェーダー

```
precision mediump float;

in vec2 vUv;
uniform sampler2D tDiffuse;
uniform vec2 vScreenSize;
out vec4 fragColor;

float rand(vec2 co) {
  float a = fract(dot(co, vec2(2.067390879775102, 12.451168662908249))) - 0.5;
  float s = a * (6.182785114200511 + a * a * (-38.026512460676566 + a * a * 53.392573080032137));
  float t = fract(s * 43758.5453);
  return t;
}

void main() {
  float radius = 5.0;
  float x = (vUv.x * vScreenSize.x) + rand(vUv) * radius * 2.0 - radius;
  float y = (vUv.y * vScreenSize.y) + rand(vec2(vUv.y, vUv.x)) * radius * 2.0 - radius;
  vec4 textureColor = texture(tDiffuse, vec2(x, y) / vScreenSize);
  fragColor = textureColor;
}
```

### うずまき

![](https://ics.media/entry/5535/images/180611_threejs_postprocess_uzumaki.png)

**渦巻を表現することも、シェーダーの定番処理の1つです**。うずまきは三角関数を使うと簡単に実現できます。

具体的には、渦の中心位置を基準に少しずつ回転をさせた位置のピクセルカラーを設定します。中心位置から離れるほど回転角度が強くなるようにすると渦が完成します。

▼フラグメントシェーダー

```
precision mediump float;

uniform sampler2D tDiffuse;
in vec2 vUv;
uniform vec2 vScreenSize;
uniform vec2 vCenter;
uniform float fRadius;
uniform float fUzuStrength;
out vec4 fragColor;

void main() {
  vec2 pos = (vUv * vScreenSize) - vCenter;
  float len = length(pos);
  if(len >= fRadius) {
    fragColor = texture(tDiffuse, vUv);
    return;
  } 
  float uzu = min(max(1.0 - (len / fRadius), 0.0), 1.0) * fUzuStrength; 
  float x = pos.x * cos(uzu) - pos.y * sin(uzu); 
  float y = pos.x * sin(uzu) + pos.y * cos(uzu);
  vec2 retPos = (vec2(x, y) + vCenter) / vScreenSize;
  vec4 color = texture(tDiffuse, retPos);
  fragColor = color;
}
```

### 2値化（threshold）

![](https://ics.media/entry/5535/images/180611_threejs_postprocess_threshold.png)

画像の色を黒と白のみで表現するシェーダーです。セピア調と同じように輝度の計算後、`0.5`以上なら白として`1.0`を、未満なら黒として`0.0`を設定します。そうすると明るめの場所は白に、暗めの場所は黒として表示されます。

▼フラグメントシェーダー

```
precision mediump float;

// 輝度を計算するときの重ねづけ。緑の重みが高いのは、人間の目が緑に敏感だからです。
#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

in vec2 vUv;
uniform sampler2D tDiffuse;
out vec4 fragColor;

void main() {
  vec4 color = texture(tDiffuse, vUv);
  
  // 明るさを0.0〜1.0の範囲で計算
  float v = color.x * R_LUMINANCE + color.y * G_LUMINANCE + color.z * B_LUMINANCE;
  // 明るさが半分以上なら
  if (v >= 0.5) {
    v = 1.0; // 白
  } else {
    v = 0.0; // 黒
  }
  fragColor = vec4(vec3(v, v, v), 1.0);
}
```

### 2値化（ランダムディザー）

![](https://ics.media/entry/5535/images/180611_threejs_postprocess_random_dither.png)

ランダムディザーは、thresholdを改良したものです。同じく白と黒で表現するのですが、thresholdのように一律でこの値より上だったら白・黒というようなものでなく、ある程度はランダムで決まります。ちなみにGLSLにはランダム関数はないので自分で実装する必要があります。今回は「[ランダムな値を返す関数 on GLSL](https://qiita.com/shimacpyon/items/d15dee44a0b8b3883f76)」を参考にして`rand()`関数を作成しました。

▼フラグメントシェーダー

```
precision mediump float;

#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

in vec2 vUv;
uniform sampler2D tDiffuse;
out vec4 fragColor;

// 自作のランダム関数
float rand(vec2 co) {
  float a = fract(dot(co, vec2(2.067390879775102, 12.451168662908249))) - 0.5;
  float s = a * (6.182785114200511 + a * a * (-38.026512460676566 + a * a * 53.392573080032137));
  float t = fract(s * 43758.5453);
  return t;
}

void main() {
  vec4 color = texture(tDiffuse, vUv);
  // 輝度を計算する（0.0〜1.0の値になる）
  float v = color.x * R_LUMINANCE + color.y * G_LUMINANCE + color.z * B_LUMINANCE;
  if (v > rand(vUv)) {
    // 白にする
    color.x = 1.0;
    color.y = 1.0;
    color.z = 1.0;
  } else {
    // 黒にする
    color.x = 0.0;
    color.y = 0.0;
    color.z = 0.0;
  }
  fragColor = color;
}
```

### 2値化（ベイヤーディザー）

![](https://ics.media/entry/5535/images/180611_threejs_postprocess_bayer_dither.png)

ベイヤーディザーは上記2つの2値化より濃淡を綺麗に表示できるシェーダーです。4ピクセル×4ピクセルの閾値の表を用いて各ピクセルの色を決めていきます。現在のピクセルの輝度を閾値の表と比較し、輝度が大きければ白を小さければ黒となります。また、UV位置でなく4ピクセルごとにといったピクセル位置を取得する必要があるため、`vScreenSize`としてシェーダー外からスクリーンのサイズを設定しています。

▼フラグメントシェーダー

```
precision mediump float;

#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

in vec2 vUv;
uniform sampler2D tDiffuse;
uniform vec2 vScreenSize;
out vec4 fragColor;

void main() {
  vec4 color = texture(tDiffuse, vUv);
  float x = floor(vUv.x * vScreenSize.x);
  float y = floor(vUv.y * vScreenSize.y);
  mat4 m = mat4(
    vec4( 0.0,  8.0,  2.0,  10.0),
    vec4( 12.0, 4.0,  14.0, 6.0),
    vec4( 3.0,  11.0, 1.0,  9.0),
    vec4( 15.0, 7.0,  13.0, 5.0)
  );
  int xi = int(mod(x, 4.0));
  int yi = int(mod(y, 4.0));
  float threshold = m[xi][yi];
  
  color = color * 16.0;
  
  float v = color.x * R_LUMINANCE + color.y * G_LUMINANCE + color.z * B_LUMINANCE;
  if (v < threshold) {
    color.x = 0.0;
    color.y = 0.0;
    color.z = 0.0;
  } else {
    color.x = 1.0;
    color.y = 1.0;
    color.z = 1.0;
  }
  
  fragColor = color;
}
```

※ `threshold`の計算について、`GLSL ES 1.0`では配列へのアクセスに定数が必要だったため、`if`文を使って16パターンすべてを個別に記述する必要がありました。  
一方、`GLSL ES 3.0（WebGL 2.0）`ではループ変数や動的インデックスが使用可能になり、変数による柔軟なアクセスが可能です。  
ただし、パフォーマンスや互換性を考慮すると、静的なアクセス方法が望ましいケースもあります。

### まとめ

画像加工はフラグメントシェーダーの数式だけで簡単に実現できることがおわかりになったのではないでしょうか？　Three.jsとあわせて使っていますが、GLSLのコードは他のJavaScriptライブラリや、OpenGLの実装でも役立ちます。ぜひご活用ください。

※この記事が公開されたのは**10年前**ですが、**9か月前の2025年4月**に内容をメンテナンスしています。