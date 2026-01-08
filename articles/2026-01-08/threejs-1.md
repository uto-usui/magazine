---
title: "エフェクト作成入門講座 Three.js編 - レンズフレア表現"
source: "https://ics.media/entry/476/"
publishedDate: "2013-07-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

レンズフレアは、カメラのレンズに光源が直接入ったときに発生する光の現象です。映画やゲームでよく見られる演出で、リアルなシーンを演出するために使われます。**Three.js** でレンズフレアを表現するデモを紹介します。

本記事はThree.js r176（2025年5月）のバージョンで作成しています。

## デモとサンプルコード

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250512_three_lens_flare/)
-   [コードを確認する](https://github.com/ics-creative/250512_three_lens_flare)

マウスドラッグすることで、レンズフレアを確認できます。

### Three.jsでのレンズフレア

レンズフレアの実現には、Three.jsの[Lensflare](https://threejs.org/docs/#examples/en/objects/Lensflare)を使います。Three.jsではレンズフレア機能が **アドオン** として分離されているため、`Lensflare.js`を個別に読み込みます。

```
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare.js";

const flareTexture = new THREE.TextureLoader().load("./textures/flare0.png");
const lensflare = new Lensflare();
lensflare.addElement(new LensflareElement(flareTexture, 512, 0));
pointLight.add(lensflare); // 光源にレンズフレアを追加
```

レンズフレアは光源と関連付けるのがポイントです。光源の裏側に視点が移動すると、自動的にレンズフレアの要素が見えなくなります。

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

## まとめ

レンズフレアのような演出は、グラフィックソフトで作成することも重要です。今回はAfter Effectsを使いましたが、他のソフトウェアでも同様の効果を得ることができます。

カメラやレンズなどの光学の世界では、レンズフレアはコントラストを下げる性能低下の現象といわれています。しかし、CGの世界ではあえて演出に使うことで、リアルな表現に近づきます。いろいろな表現の引き出しを増やすことで、演出制作に役立てみましょう。

### 移植前のFlashのコード

本記事はもともと『超高精細！巨大テクスチャをサポートしたFlash Player 11.8で実現するリアルな地球の表現』というタイトルで、FlashのAway3Dを使った地球の表現を紹介したものです。2025年にThree.jsでレンズフレアを実装する方法を解説する内容にリライトしました。

元記事のデモのコードを以下に示します。Flash Player 11.8で実現するリアルな地球の表現を紹介したものです。

![](https://ics.media/entry/476/images/away_earth_3.jpg)

-   [デモを再生する (要Flash Player 11.8)](https://ics-creative.github.io/data-demos/130725_away3d_extended/index.html)
-   [ソースコードをダウンロードする](https://ics-creative.github.io/data-demos/130725_away3d_extended/src.zip)

※この記事が公開されたのは**12年前**ですが、**8か月前の2025年5月**に内容をメンテナンスしています。