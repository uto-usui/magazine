---
title: "エフェクト作成入門講座 Three.js編 RPGのセーブポイント風の魔法陣"
source: "https://ics.media/entry/11401/"
publishedDate: "2016-03-23"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

昨今のWebサイトでは3D表現を利用した3Dコンテンツをしばしば見かけるようになってきました。WebGLに対応した端末が普及してきていることや、[Three.js](https://ics.media/entry/14771/)などのライブラリが充実していることもあり、**実案件での採用が現実的になってきているから**です。

しかし、いざ3Dコンテンツを作ってみると、**どこか味気のないものになってしまう事があります**。そんな時は**エフェクトの追加をオススメ**です。エフェクトを追加することで、**コンテンツの見栄えが派手になったり、キャラやゲームの状態が伝わりやすくなります**。今回エフェクトの例として、**RPGのセーブポイントや回復ポイント**で使用されそうなデモを制作してみました。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/160304_threejs_save_point/demo/)
-   [ソースコードを見る](https://github.com/ics-creative/160304_threejs_save_point)

※このデモはThree.js r175（WebGPU）とTypeScript 5.8によって書かれています。

本記事では、**セーブポイント風なエフェクトの作成を通して、Three.jsを使ったエフェクト作成の3つの基本ノウハウを解説します**。他のエフェクト作成にも応用できるので是非ご参考ください。

### 制作の流れ

冒頭のデモは下図のパーツで構成されています。複雑そうに見えますが、分解してみるとシンプルなパーツで構成されている事が分かります。

![](https://ics.media/entry/11401/images/setting.png)

今回は以下の3つに絞って順に解説します。その他のパーツはこの3つの方法の応用で作る事ができます。

1.  **光の柱**
2.  **渦**
3.  **パーティクル**

### ステップ1. 光の柱の作成

![](https://ics.media/entry/11401/images/step1.png)

#### 円柱を作る

光の柱は縦に伸びる**円柱**のような形をしています。Three.jsでは`CylinderGeometry`という円柱型のジオメトリが用意されているのでこちらを使用して表現します。

```
// THREE.CylinderGeometry(上面円の半径, 下面円の半径, 高さ, 縦分割数, 横分割数, 上下面を無くすか否か)
const geometry = new THREE.CylinderGeometry(
  5,
  5,
  15,
  25,
  25,
  true
);
```

この時、第6引数の**上下面を無くすか否か**に`true`を指定するように注意ください。**蓋のある円柱になってしまうのを防ぐため**です。

#### 柱を光らせる

円柱に光っているかような質感をもたせます。 **発光体を表現する際は、光源に関係なく発色できる`MeshBasicMaterial`が最適**です。

```
const material = new THREE.MeshBasicMaterial({
  map: texture, // テクスチャーを指定
  color: 0x007eff, // 色
  transparent: true, // 透明の表示許可
  blending: THREE.AdditiveBlending, // ブレンドモード
  side: THREE.DoubleSide, // 表裏の表示設定
  depthWrite: false // デプスバッファへの書き込み可否
});
```

設定しているパラメーターを順に解説します。

##### map

`map`パラメーターは使用するテクスチャーを指定できます。**テクスチャーはモノクロで作成しておくと`color`パラメーターから白色部分を指定した色に変更できる**ため、汎用性が高く扱いやすいのでオススメです。

##### blending

`blending`パラメーターはブレンドモード指定できます。`NoBlending`（無し）、`NormalBlending`（半透明合成）、`AdditiveBlending`（加算合成）、`SubtractiveBlending`（減算合成）、`MultiplyBlending`（乗算合成）の5つから選択できます。

今回は重なった部分を白く発光させたいため`AdditiveBlending`を指定します。

##### side

`side`パラメーターは描画面を指定できます。`FrontSide`（表のみ）、`BackSide`（裏のみ）、`DoubleSide`（表裏両方）の3つから選択できますが、今回は**筒の中も表示させたいため`DoubleSide`を指定します**。

##### depthWrite

`depthWrite`パラメーターは面と面が重なって見える時に、**陰に隠れてしまった面を描画させないようにするかどうか**を設定できます。今回は光が重なって見える必要があるので`false`を指定します。

`depthWrite: false`にすると深度バッファーを更新しない（深度テストはする）ので、深度的には何も書かれてなかったことになり、それより奥のオブジェクトを後から描画できる（=後ろが透けて見える）ことになります。 基本的に「不透明オブジェクトは深度書き込み**アリ**」、「半透明オブジェクトは深度書き込み**ナシ**」がセオリーです。

3D的に「半透明」というのは、「完全不透明でない箇所が一部でもある」ことを指します。アルファ50%の透けているガラスのようなものだけでなく、パーティクルでよくある板ポリに●を書いて丸の中はアルファ100%、外は0%というようなものも半透明扱いとする必要があります。

ジオメトリとマテリアルが完成したので、この2つを使用したメッシュを作成すれば光の柱の完成です。

```
// 光る柱のメッシュを作成
const mesh = new THREE.Mesh(geometry, material);
```

### ステップ2. 渦の作成

![](https://ics.media/entry/11401/images/step2.png)

#### 渦をつくる

渦は地面に**ドーナツ型**に渦を発生させたいので、`TorusGeometry`というドーナツ型のジオメトリを使用します。本来は立体のドーナツ型を想定したジオメトリですが、**第3引数の分割数の値を`2`にすることで平面のドーナツ型を作成できます**。

```
// THREE.TorusGeometry(半径, 太さ, 放射状の分割数, 管の分割数)
const geometry = new THREE.TorusGeometry(6, 3, 2, 100);
```

マテリアルは前章の光の柱とほぼ同じ内容で、テクスチャーのみ変更したものを使用します。

```
const material = new THREE.MeshBasicMaterial({
  color: 0x007eff,
  map: texture,
  transparent: true,
  blending: THREE.AdditiveBlending,
  side: THREE.FrontSide,
});
```

#### 地面に設置する

`TorusGeometry`はデフォルトで縦に立っているので、90度回転させて地面と平行にします。描画面はFrontSideとしているので、**表面が見えるように回転させる向きに注意してください**。

```
torus.rotation.x = 90 * Math.PI / 180;
```

地面と平行になりましたが、このままでは地面とエフェクトが重なってしまい下図のようなチラつきが発生してしまいます。

![](https://ics.media/entry/11401/images/flicker.gif)

この問題はメッシュを少しだけ浮かせる事で回避できます。

```
torus.position.y = 0.01; // 少しだけ浮かせる
```

#### 回転させる

渦を巻いているアニメーションをつけます。回転角度をフレーム毎に増やしメッシュを回転させます。

```
public update(speedRate: number) {
  this._counter += speedRate;
  const angle = (this._counter * Math.PI) / 180;
  this._texture.offset.x = -angle * 0.2;
}
```

回転させたことで渦を巻いているような見栄えになりました。

### ステップ3. パーティクルの作成

![](https://ics.media/entry/11401/images/step3.png)

#### 粒をつくる

パーティクルには`Sprite`というオブジェクトを使用します。**`Sprite`は必ずカメラに正面を向くという特徴のある平面オブジェクト**で、パーティクルを表現する場合に、テクスチャーの見え方が均一になるため非常に有効です。このような手法を一般的に**ビルボード**と呼びます。`Sprite`を生成する場合のマテリアルは`SpriteMaterial`を使用します。

```
const texture = new THREE.TextureLoader().load("img/particle.png");
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.SpriteMaterial({
  color: 0x007eff,
  map: texture,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const sprite = new THREE.Sprite(material);
```

これで一粒分のパーティクルを作成できました。

#### 湧き出させる

パーティクルが下から湧き出るような演出を作っていきます。下から上へと上がっていく動きと、フェードアウトさせる動きを合わせる事で表現します。

```
// 徐々に上へ
sprite.position.y += 0.1;
// 徐々に薄く
material.opacity -= 0.01;
```

真上に上がって消えていくアニメーションができました。あとは**同じパーティクルをいくつか生成し、時間差をつけてアニメーションさせることで、湧き出るような演出を表現できます**。さらに横方向の動きや拡縮を入れるとよりクオリティーが上がります。

### まとめ

特別なツールを使用する事なく、**JavaScriptのコードのみでセーブポイント風なエフェクトを作成できました**。今回紹介した基本ノウハウは、セーブポイントだけでなく、**波動や爆発などのさまざまなエフェクトを作成する際に応用できます**。ぜひ、みなさんも色々なエフェクト作成に挑戦してみてください。

※この記事が公開されたのは**9年前**ですが、**9か月前の2025年4月**に内容をメンテナンスしています。