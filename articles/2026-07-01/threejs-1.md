---
title: "エフェクト作成入門講座 Three.js編 - レンズフレア表現"
source: "https://ics.media/entry/476/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2013-07-24"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

レンズフレアは、カメラのレンズに光源が直接入ったときに発生する光の現象です。映画やゲームでよく見られる演出で、リアルなシーンを演出するために使われます。**Three.js** でレンズフレアを表現するデモを紹介します。

本記事はThree.js r183（2025年2月）のバージョンで作成しています。

## デモとサンプルコード

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250512_three_lens_flare/)
-   [コードを確認する](https://github.com/ics-creative/250512_three_lens_flare)

マウスドラッグすることで、レンズフレアを確認できます。

### Three.jsでのレンズフレア

Three.jsの **WebGPUレンダラー** と [LensflareMesh](https://threejs.org/docs/pages/LensflareMesh.html) を使って実装します。

```
// Three.js本体の読み込み
import * as THREE from "three";

// WebGPUレンダラーの読み込み
import { WebGPURenderer } from "three/webgpu";

// レンズフレア用クラスの読み込み
import { LensflareMesh, LensflareElement } from "three/examples/jsm/objects/LensflareMesh.js";

// WebGPU版レンダラーの作成
// antialias: true を指定して輪郭のジャギーを軽減
const renderer = new WebGPURenderer({ antialias: true });

// WebGPUレンダラーの初期化
// この await を挟まないと描画準備が未完了
await renderer.init();

// レンズフレア用画像の読み込み
const texture = textureLoader.load(flare0TextureUrl);

// テクスチャを sRGB として扱う設定
// 色空間を合わせないと発色が意図どおりにならない
texture.colorSpace = THREE.SRGBColorSpace;

// レンズフレア全体を管理するオブジェクトの作成
const lensFlare = new LensflareMesh();

// レンズフレア要素を1つ追加
// 第2引数はサイズ、第3引数は中心からの配置係数
lensFlare.addElement(new LensflareElement(texture, 2000, 0));

// レンズフレアを光源へ追加
// こうしておくと光源の位置に追従
pointLight.add(lensFlare);
```

レンズフレアは光源に子要素として追加します。視点が光源の裏側へ回り込むと、自動的にレンズフレアの要素が見えなくなります。

1枚だけではなく複数のフレア画像を距離違いで重ねています。`LensflareElement` の第2引数がサイズ、第3引数が中心からの配置係数です。

```
// フレア画像ごとの設定を配列で定義
// textureUrl は画像のURL
// size はフレア要素の大きさ
// dist は中心からどれだけ離して配置するかの係数
const flareTextures = [
  { textureUrl: flare0TextureUrl, size: 2000, dist: 0 },
  { textureUrl: flare5TextureUrl, size: 2500, dist: 0.1 },
  { textureUrl: flare2TextureUrl, size: 1250, dist: 0.4 },
  { textureUrl: flare4TextureUrl, size: 3750, dist: 1.8 },
];

// 配列を順番に処理してレンズフレア要素を追加
flareTextures.forEach((item) => {
  // 画像の読み込み
  const texture = textureLoader.load(item.textureUrl);

  // フレア画像も sRGB として扱う設定
  // 見た目の明るさと色味を揃えるための指定
  texture.colorSpace = THREE.SRGBColorSpace;

  // 個別のフレア要素を生成
  // item.size で大きさを指定
  // item.dist で中心からの位置を指定
  const element = new LensflareElement(texture, item.size, item.dist);

  // 作成した要素をレンズフレア全体へ追加
  lensFlare.addElement(element);
});
```

実際のリポジトリでは、画像アセットを `src/assets` 配下に置き、importしてから読み込んでいます。

▼レンズフレアが見える角度

![](https://ics.media/entry/476/images/images/250512_three_lens_flare.png)

▼光源がギリギリ見える角度だとレンズフレアが薄くなる

![](https://ics.media/entry/476/images/images/250512_three_lens_flare_2.png)

▼光源が見えない角度

![](https://ics.media/entry/476/images/images/250512_three_lens_flare_3.png)

視点まで光源の光が届くかどうかをThree.js側で計算しているため、レンズフレアの要素を手動で移動させる必要はありません。便利ですね！

### レンズフレアの作成方法

レンズフレア自体はAdobe After EffectsのKnoll Light Factoryで作成しました。デフォルトのレンズフレアのまま使っています。

![](https://ics.media/entry/476/images/knolllight.png)

After Effectsのレンズフレアの要素を1つひとつのPNG画像に手作業で書き出して、それをコードで合成しています。

![](https://ics.media/entry/476/images/flare0.jpg)

![](https://ics.media/entry/476/images/flare1.jpg)

![](https://ics.media/entry/476/images/flare4.jpg)

詳しくはソースコードにPhotoshopのファイルを同梱していますので参照くださいませ。

### WebGPU版Three.jsだとHDRが可能

Three.jsにはさまざまなレンダリングエンジンがあり、WebGLとWebGPUの2種類が主流です。WebGPU版を使うと、HDR（ハイダイナミックレンジ）が扱えます。

-   [WebGPU対応のThree.jsのはじめ方 - ICS MEDIA](https://ics.media/entry/250501/)

レンズフレアの光がより高輝度で表現できるためリアリティーのある体験を実現できます。次のデモをマウスドラッグで試してみてください。

-   [サンプルを別ウインドウで開く](https://ics-ikeda.github.io/260206_threejs_particles/)
-   ※コードは非公開

## まとめ

レンズフレアのような演出は、グラフィックソフトで作成することも重要です。今回はAfter Effectsを使いましたが、他のソフトウェアでも同様の効果を得ることができます。

カメラやレンズなどの光学の世界では、レンズフレアはコントラストを下げる性能低下の現象といわれています。しかし、CGの世界ではあえて演出に使うことで、リアルな表現に近づきます。いろいろな表現の引き出しを増やすことで、演出制作に役立てみましょう。

### 移植前のFlashのコード

本記事はもともと『超高精細！巨大テクスチャをサポートしたFlash Player 11.8で実現するリアルな地球の表現』というタイトルで、FlashのAway3Dを使った地球の表現を紹介したものです。2025年にThree.jsでレンズフレアを実装する方法を解説する内容にリライトしました。

元記事のデモのコードを以下に示します。Flash Player 11.8で実現するリアルな地球の表現を紹介したものです。

![](https://ics.media/entry/476/images/away_earth_3.jpg)

-   [デモを再生する (要Flash Player 11.8)](https://ics-creative.github.io/data-demos/130725_away3d_extended/index.html)
-   [ソースコードをダウンロードする](https://ics-creative.github.io/data-demos/130725_away3d_extended/src.zip)

※この記事が公開されたのは**12年前**ですが、**2か月前の4月**に内容をメンテナンスしています。