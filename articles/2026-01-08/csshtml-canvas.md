---
title: "CSSとHTML Canvasで作るモーショングラフィック"
source: "https://ics.media/entry/10141/"
publishedDate: "2015-11-24"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ICS MEDIAの[トップページ](https://ics.media/)に掲載しているモーショングラフィック。これはCSSとHTML Canvas要素を使って作成したものです。時間経過とともに波の形状と色彩が変化し、多彩な表現を楽しめるようになっています。

![](https://ics.media/entry/10141/images/151124_first.jpg)

本記事ではCSSとHTML Canvasの理解につながることを目標に、このモーショングラフィックの作成方法をステップ形式で解説します。サンプルのソースコードはすべて[GitHub](https://github.com/ics-creative/151124_createjs_waves)にて公開していますので、あわせて参照ください。

▲ 完成版サンプル

### ステップ1. CSSでグラデーション背景の作成

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/151124_createjs_waves/examples/0_bg.html)
-   [ソースコードを確認する](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/0_bg.html)

はじめに、時間経過で色彩が変化するグラフィックを作成しましょう。CSSで縦に長いグラデーションの背景を用意し、CSSアニメーションを使って縦方向に移動させることでグラデーションが変化する表現ができます（[ステップ1のソースコード](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/0_bg.html))。

```
#bg {
  /* 背景グラデーションの作成 */
  background: linear-gradient(
    to bottom,
    hsl(180, 80%, 40%),
    hsl(240, 80%, 60%),
    hsl(300, 80%, 40%)
  );
  background-size: 400% 400%;
  animation: AnimationName 10s ease infinite;
}

@keyframes AnimationName {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}
```

### ステップ2. 波のモーショングラフィックを描く

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/151124_createjs_waves/examples/1_wave.html)
-   [ソースコードを確認する](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/1_wave.html)

波のモーショングラフィックは、HTML Canvas（生のCanvas2D）で描いています。「波」の作り方は記事『[パーリンノイズを使いこなせ](https://ics.media/entry/18812/)』で詳しく紹介しているので、参考ください。

ポイントとしてはランダム関数として離散乱数が得られる`Math.random()`ではなく、連続した乱数（パーリンノイズ）が得られる`noise()`関数（JSライブラリを利用）を使って曲線の頂点を計算していることです（[波の表示クラスのコード](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/src/WaveShape.js#L35-L42))。

```
const vertexArr = [];
// 波の次の目標値を計算
for (let i = 0; i <= vertexNum; i++) {
  // 乱数を取得、-1.0〜+1.0の範囲
  const noiseNum = noise.perlin2(i * 0.2, time + timeOffset);
  // 目標座標を計算。画面の高さに比例
  vertexArr[i] = noiseNum * h * 0.5;
}
```

### ステップ3. 波に残像を加える

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/151124_createjs_waves/examples/2_wave_fading.html)
-   [ソースコードを確認する](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/2_wave_fading.html)

Canvas要素は直前の描画結果を引き継ぐという処理が可能です。この方法を使えば残像効果を実装できます。ステップ2で作成した波の表現に残像効果を加えてみましょう。

残像効果は具体的には次のコードで実装できます（[ステップ3のコード](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/src/2_wave_fading.js))。

```
// 薄く暗く塗る
const context = canvas.getContext("2d");
// 薄く暗く塗る
context.fillStyle = `rgba(0, 0, 0, 0.2)`;
context.fillRect(0, 0, canvas.width, canvas.height);
```

### ステップ4. 照明効果を作成する

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/151124_createjs_waves/examples/3_spotlight.html)
-   [ソースコードを確認する](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/3_spotlight.html)

今までのステップとは別に、演出を華やかにするために一部分だけ光があたっているような演出を`canvas`要素で作成しましょう。円形グラデーションの円を2つ配置して、左右に動かします。周期的な動きを作るには三角関数を使うと便利でしょう（[ステップ4のコード](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/src/SpotLightShape.js#L40-L49))。

```
// 円のX座標 (左右に周期的に移動させる)
const dx =
  (w * 1) / 3 + (w / 10) * Math.sin(Date.now() / 4000);
// 円のY座標
const dy = (h * 1) / 3;
// 円の大きさ
const size = w / 2;
```

### ステップ5. 波と照明効果を合算する

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/151124_createjs_waves/examples/4_spotlight_and_wave.html)
-   [ソースコードを確認する](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/4_spotlight_and_wave.html)

ステップ3とステップ4で作成した表現を合成します。輝度（ルミナンス）だけで合成したいので、`canvas`要素の`globalCompositeOperation`プロパティを`lighter`に設定して`drawImage()`メソッドで合成します（[ステップ5のコード](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/src/4_spotlight_and_wave.js))。

```
// 2つのステージを合成する
contextOverlay.globalCompositeOperation = "lighter";
contextOverlay.drawImage(canvasWave, 0, 0);
```

### ステップ6. グラデーション背景と合成

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/151124_createjs_waves/examples/5_finish.html)
-   [ソースコードを確認する](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/5_finish.html)

最後にステップ1とステップ5の表現を合成します。記事「[CSSのブレンドモードmix-blend-modeを使いこなそう](https://ics.media/entry/7258/)」で紹介したようにCSSの`mix-blend-mode`プロパティを用い特殊なブレンドモードとしてHTML要素を重ねあわせます。これで完成です！([ステップ6のコード](https://github.com/ics-creative/151124_createjs_waves/blob/main/examples/5_finish.html))

```
#canvasOverlay {
  mix-blend-mode: hard-light;
}
```

ここまでの手順を図解すると次のようになります。ひとつ1つのステップは単純ななものですが、どうやって合成するかがポイントであったかがわかります。

![](https://ics.media/entry/10141/images/151124_zuban.png)

### まとめ

この手の表現は仕組みがわかれば意外とシンプルです。ブレンドモードとして利用しているCSSの`mix-blend-mode`プロパティと、`canvas`要素の`globalCompositeOperation`プロパティの両方を使えばHTMLでの表現の幅が広がります。

いきなりコードで実現するのが難しいという方はPhotoshop等の画像加工ソフトで試してから、コードで実装するとイメージしやすいと思います。ぜひみなさんもウェブでのモーショングラフィックに挑戦ください。