---
title: "p5.jsで作るヒーローエリア演出：実装例と注意点"
source: "https://ics.media/entry/250909/"
publishedDate: "2025-09-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "oka"
---

2025年9月9日 公開 / [株式会社ICS 岡 大貴](https://ics.media/entry/staff/oka/)

ウェブサイトにおけるクリエイティブ表現は、ユーザーの目を惹きつけ、コンテンツの印象を高める重要な要素です。前回の記事：『[p5.jsの表現力を活かしたクリエイティブなWebサイト事例集](https://ics.media/entry/250815/)』では、[p5.js](https://p5js.org/)を活用してクリエイティブな表現を実現しているウェブサイトを紹介しました。本記事では次のステップとして、実際に**p5.jsを活用しウェブサイトのヒーローエリアを実装する作例と実装時の注意点**を紹介します。本記事では、三角関数を用いた周期的なアニメーション、p5.jsによるマウスインタラクション、そしてp5.jsを全画面に展開したWebページの実装例を学べます。

### 作例とコードの解説

今回用意した作例では、波のようなビジュアル表現と、マウス操作によってビジュアルが変化する表現を組み合わせています。カーソル移動やクリックによってビジュアルが変化します。なおTypeScriptでコードを記述し、Viteを使ってバンドルしています。導入方法については記事『[jQueryからTypeScript・Reactまで！Viteで始めるモダンで高速な開発環境構築](https://ics.media/entry/210708/)』を参照ください。 以降は、**作例の実装ポイント**をいくつか解説します。

※本記事で紹介する作例中のコードはp5.jsのインスタンスモードで書かれています。本来のp5.jsの関数・変数名に`p.`がつけられていますのでご注意ください。

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/20250909_p5_wavy_website/dist/)
-   [コードを確認する](https://github.com/ics-creative/20250909_p5_wavy_website/blob/main/src/sketch.ts)

#### 1\. 三角関数を使った周期的なアニメーション

今回の作例では三角関数を使って波のようなアニメーションを実装しました。今回のようなシンプルなアニメーションであれば、p5.jsの`sin()`、`cos()`関数のような三角関数を使うことで周期的にループするアニメーションを短いコードで実装できます。以下は作例中の波を描画する部分のコードです。大まかな処理としては、x軸方向に1本の波線を描画し、それをy軸方向に何度も繰り返しています。

```
/**
 * 波形を描画する関数。
 * 与えられた間隔・閾値・振幅に基づいてcanvas全体に波のパターンを描画する。
 * マウスカーソルとの距離によって波の形を変化させる。
 **/
const drawWave = (
  step: number,
  threshold: number,
  defaultWaveAmp: number,
  effectWaveAmp: number,
) => {
  const ANIMATION_SPEED_RATIO = 0.02;
  // stepずつy軸の方向に走査
  for (let j = 0; j <= p.height; j += step) {
    p.beginShape();
    // step/4ずつx軸の正方向に走査 (終端は余白ができないようstep分大きくする)
    for (let i = 0; i < p.width + step; i += step / 4) {
      const x = i;
      const phaseDelay = (i + j) / 2;
      // マウスと波の頂点間の距離を求める
      const mouseDist = p.dist(p.mouseX, p.mouseY, x, j);
      // distanceがthreshold未満の場合に振幅を変化させる（後述）
      let waveAmp;
      if (mouseDist < threshold) {
        let normalized = p.constrain(mouseDist / threshold, 0, 1);
        const weight = p.pow(normalized, 10);
        waveAmp = p.lerp(effectWaveAmp, defaultWaveAmp, weight);
      } else {
        waveAmp = defaultWaveAmp;
      }
      const y =
        waveAmp * p.sin((p.frameCount - phaseDelay) * ANIMATION_SPEED_RATIO) +
        j;
      p.vertex(x, y);
    }
    p.endShape();
  }
  };
```

このコードでは以下の横一本の波線をいくつも縦に重ねることで、全体の波のビジュアルを構成しています。

波線の描画で活用しているのはp5.jsの`beginShape()`関数と`endShape()`関数、`vertex()`関数です。p5.jsでは`beginShape()`関数と`endShape()`関数の間に`vertex(x, y)`関数で指定した頂点座標を線で繋ぎ合わせ、図形として描画できます。

`beginShape()`、`endShape()`、`vertex()`を使って波線を描画するのが以下のコードです。ここではfor文を使ってstepずつx座標をずらした座標を描画しています。各点は`sin()`関数の値によってy座標を上下させ、各点が上下するタイミングをx座標分ずらすことで波を表現しています。（作例中では引数にy座標も含めることでy軸方向に繰り返した波の間でも点が上下するタイミングをずらしています。）

```
/**
 * 横一本の波を描画するサンプルコード
 * waveAmp: 波の振幅
 * frameCount: 描画の経過フレーム数
 * ratio: アニメーションの速さを調整する係数
 * x, y: 横方向の描画座標。ここではsin()関数の引数からxを引くことで、座標ごとに上下のタイミングをずらしている
 **/
beginShape();
for (let x = 0; x <= width; x += step) {
  const y = waveAmp * sin(frameCount * ratio - x);
  vertex(x, y);
}
endShape();
```

![波の処理の説明](https://ics.media/entry/250909/images/wave-description.png)

また、`sin()`関数の引数では、描画時の経過フレーム数を表す変数`frameCount`にアニメーションスピードを調整する係数`ratio`をかけることで、アニメーションのスピードを調整しています。

これをさらにfor文でy軸方向にも繰り返すことで、複数の波のなめらかなエフェクトを表現しています。

#### 2\. マウス操作によるエフェクトの変化

![マウス操作によるエフェクトの変化](https://ics.media/entry/250909/images/demo-mouse.gif)

マウスカーソルの移動に応じてビジュアルが変化するのもポイントです。p5.jsでは現在のマウスカーソル座標を取得する`mouseX`、`mouseY`、1フレーム前のマウスカーソル座標を取得する`pmosueX`、`pmouseY`といった変数が用意されています。これらを活用してマウスカーソルにゆっくり追従するマウスストーカー、マウスストーカーの太さ調整を実現しています。詳細は省きますが、この作例では以下のコードのように過去のマウス座標を配列`mousePosAry`に保存しておき、`curveVertex()`を使ったスプライン曲線を描画することで、曲線的なマウスストーカーを実装しています。

```
p.beginShape();
for (const pos of mousePosAry) {
  p.curveVertex(pos.x, pos.y);
}
p.endShape();
```

また1のコードにもあるように、`dist()`関数を使用してマウスカーソルと波の頂点の間の距離を求め、マウスカーソル付近では波が静かになったり、逆に波打ったりする処理を加えています。

```
const mouseDist = p.dist(p.mouseX, p.mouseY, x, y); //マウスカーソルと波の頂点間の距離を計算する
if (mouseDist < threshold) {
  /* mouseDistが閾値threshold未満の場合の処理 */
} else {
  /* 閾値thresholdを超えた場合の処理 */
}
```

加えて、マウスクリックによるシーンの変化も実装しています。「WAVY.」と表示されたシーンでは青い波がいくつも描画されマウスカーソル周辺の波は穏やかになるという演出ですが、クリックすることでテキストが「CALM.」に切り替わり、逆に全体の波が穏やかに、マウスカーソル付近は波打つようになっています。これはp5.jsの`mouseReleased()`関数を使うことでマウスクリックイベントを取得し、シーン切り替えの処理を行っています。

```
p.mouseReleased = () => {
  isWavy = !isWavy; // シーンを表す真偽値
  setModalParams(isWavy); // シーンの切り替え
};
```

#### 3\. 画面サイズ拡縮時の調整

![画面リサイズ時の挙動](https://ics.media/entry/250909/images/demo-resize.gif)

画面サイズが拡縮された際にビジュアルが崩れない工夫も加えています。p5.jsの`windowResized()`関数内で`resizeCanvas()`関数を呼び出し、リサイズ後の画面に合わせて`<canvas>`タグを再描画しています。あわせてテキストサイズやカーソルのエフェクト範囲も調整しています。

また、テキストサイズやエフェクト範囲が際限なく拡縮してしまうことを防ぐため、`constrain()`関数を使い、変数が変化する下限と上限を設定しています。たとえばマウスカーソルのエフェクト範囲は、`mouseDistThreshold = constrain(windowWidth / 6, MIN_THRESHOLD, MAX_THRESHOLD)`と指定することで、基本的にはウィンドウ幅の1/6になりますが、下限`MIN_THRESHOLD`から上限`MAX_THRESHOLD`の範囲は超えないようになります。

```
p.windowResized = () => {
  p.resizeCanvas(p.windowWidth, p.windowHeight); // canvasをリサイズ
  p.background(0);
  mouseDistThreshold = p.constrain(
    p.windowWidth / 6,
    MIN_THRESHOLD,
    MAX_THRESHOLD,
  );
  const currentTextSize = p.constrain(
    p.windowWidth / 6,
    MIN_TITLE_TEXT_SIZE,
    MAX_TITLE_TEXT_SIZE,
  );
  p.textSize(currentTextSize);
};
```

### p5.js導入時に気を付けるべきポイント

今回の作例のようにp5.jsをウェブサイトにとりいれる際には、いくつか**気を付けるべきポイント**があります。

#### 1\. バンドルする場合や他のJSライブラリと併用する場合はインスタンスモードを使う

p5.jsはグローバルスコープに`width`や`background()`などの名前をもちます。これらをそのまま使うと、CSSや他のライブラリを使ったウェブ開発において**関数や変数名がバッティングするリスク**があります。p5.jsのインスタンスモードを活用し、`p.width`や`p.background()`などインスタンスを経由して関数や変数を呼び出すことで名前の衝突を避けましょう。詳しくは記事『[VS Code & TypeScriptとp5.jsで始めるモダンなクリエイティブコーディング入門](https://ics.media/entry/210129/)』を参照ください。

#### 2\. canvasを任意の位置に配置したい場合はHTML上で親要素を作る

p5.jsは`createCanvas()`関数を実行した際に、デフォルトで`document.body`の末尾に`<canvas>`タグを追加し、p5.jsで書かれたコードを描画します。同時に`width`や`height`といったHTML属性が`<canvas>`タグに付与されるため、**別途CSSでサイズや位置を調整しても、インラインの属性やスタイルが優先されて意図通りにならない**場合があります。他のコンポーネントと組み合わせたページを実装したり、`<canvas>`タグの配置をスタイリングしたりしたい場合はラッパーコンポーネントをHTML上に作成し、`<canvas>`タグをその子要素として配置するよう指定しましょう。

たとえば、以下のようにHTML上で親の`<div>`タグを配置し、p5.js側で`parent()`を記述することで`<canvas>`タグをその子要素として配置できます。

```
<!-- HTML内にラッパーコンポーネントを用意する -->
<div id="canvas-container"></div>
```

```
/* p5.jsのsetup()関数内でcanvas要素をラッパーコンポーネントの子要素にする */
const canvas = createCanvas(windowWidth, windowHeight);
canvas.parent("canvas-container");
```

#### 3\. `windowResized()`を使い、画面サイズの拡縮に対応する

ウェブページ上で画面サイズを拡縮した際、CSSでレスポンシブ対応をしていても、**`<canvas>`タグ内で描画されるコンテンツは更新されないため、レイアウトが崩れてしまう**場合があります。今回の作例のように、p5.jsの`windowResized()`関数でブラウザサイズ変更をイベントとして取得し、その際に`resizeCanvas()`などを使用することで画面サイズ変化時に`<canvas>`タグを指定したサイズで描画し直すことができます。

### まとめ

本記事ではp5.jsを使ったクリエイティブなウェブサイト表現の例として、ヒーローエリアの作例を紹介し、実装ポイントと注意点について解説しました。今回の波のビジュアルのように、p5.jsではパーティクルやノイズ、シミュレーションなどJavaScriptを使ったクリエイティブ表現が短いコードで実現できます。他にもp5.jsをウェブサイト制作に活用できる箇所はありますので、ぜひみなさんもp5.jsを活用した演出を試してみてください。また、p5.jsに限らず、クリエイティブ表現の参考になる記事が他にもありますのであわせてご覧ください。

-   [記事：p5.jsによるクリエイティブコーディング入門](https://ics.media/entry/250611/)
-   [記事：JavaScriptで始めるジェネラティブアート - 生物アルゴリズムの応用](https://ics.media/entry/200220/)
-   [記事：JavaScriptで取り組むクリエイティブコーディング - パーティクル表現入門](https://ics.media/entry/18835/)
-   [記事：JavaScriptで取り組むクリエイティブコーディング - パーリンノイズを使いこなせ](https://ics.media/entry/18812/)
-   [記事：Adobe Flash作品から学ぶクリエイティブコーディングのテクニック](https://ics.media/entry/201113/)