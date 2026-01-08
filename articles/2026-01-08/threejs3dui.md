---
title: "Three.jsで作る3DのカバーフローUI"
source: "https://ics.media/entry/1787/"
publishedDate: "2014-08-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

昔のmacOSやiTunesアプリでは、カバーフローと呼ばれるUIがありました。カバーフローでは写真が奥行き方向に傾いて表示されていたりするなど、3Dの表現が使われています。

本記事ではHTMLと3D技術（WebGPU）を用いた実装方法を解説します。3DのJavaScriptライブラリとして[Three.js](https://threejs.org/)でデモを用意しています。本記事では初級者向けにステップ形式で重要な実装のポイントを説明し、カバーフローの実装方法を学べるようにしています。

### デモの紹介

-   [デモを再生する (別ウインドウで開く)](https://ics-creative.github.io/230428_three_coverflow/)
-   [ソースコード](https://github.com/ics-creative/230428_three_coverflow)

このデモはThree.js r176（WebGPURenderer）と生のJavaScriptで作成しています。

### STEP1. カバーフローの基本実装

#### 画像ファイルの読み込み

カバーフローの実装に入る前に写真を事前に読み込むことにします。サンプルフォルダーの`imgs`フォルダーには画像ファイルを連番で`0.jpg`～`44.jpg` まで用意しています。

![](https://ics.media/entry/1787/images/images/230428_folder.jpg)

#### 3D空間への表示

画像ファイルは、Three.jsのマテリアルを作成し、`THREE.PlaneGeometry`クラスを使って平面のメッシュを作成します。

カードという名前でJavaScriptのクラスで作成しています。

```
/**
 * カバーフローのカード
 */
class Card extends THREE.Object3D {
  // (省略）

  /**
   * @param index {number}
   */
  constructor(index) {
    super();

    const texture = new THREE.TextureLoader().load("./imgs/" + index + ".jpg");

    // 上面

    // マテリアルの作成
    const material = new THREE.MeshLambertMaterial({
      map: texture,
    });

    const planeTop = new THREE.Mesh(
      new THREE.PlaneGeometry(ITEM_W, ITEM_H),
      material
    );
    this.add(planeTop);
    
    // (省略）
  }
}
```

変数`card`はスライドの整列や移動に使うので再利用できるように配列に参照を保存します。

```
/**
 * 平面を格納する配列
 * @type {Card[]}
 */
const cards = [];

/** スライドの個数 */
const MAX_SLIDE = 44;

// （省略）

// Planeの作成
for (let i = 0; i < MAX_SLIDE; i++) {
  // カード
  const card = new Card(i);

  // 3Dシーンに追加
  scene.add(card);

  // 配列に参照の保存
  cards[i] = card;
}
```

#### スライドの整列

作成した平面のスライドを3D空間で並べてみましょう。スライドは`x`座標と`z`座標、`rotation.y`の角度を調整することで整列させることができます。下図のようにスライド画像を配置してみましょう。

![](https://ics.media/entry/1787/images/coverflow_threehs_960x540.jpg)

`x`と`z`と`rotation.y`それぞれのプロパティーについて分離して考えてみます。`x`座標はスライドの横方向の座標として扱います。カメラをセンターに配置し、中央に表示されるスライドの座標を`0`としてみます。中央に配置したスライドの左右はマージンを余分に取りますが、それ以外のスライドは等間隔に配置します。

![](https://ics.media/entry/1787/images/images/230428_coverflow_positions.png)

カバーフローの場合、中央以外のスライドは斜めに傾いています。Three.jsでは`rotation.y`プロパティーがY軸の回転となりますが、中央より左側のスライドは`rotation.y`を`-45`度傾け、右側のものは`+45`度傾けます。z座標について中央のスライド画像は、他のスライド画像よりも手前に表示されるようにします。計算方法としては、中央のスライド画像のZ座標は0で、中央以外のスライド画像のZ座標を奥側に配置されるようにします。

![](https://ics.media/entry/1787/images/images/230428_coverflow_positions_rotate.png)

この処理を抜粋したのが以下のコードとなります。`id`は中央のスライド画像のIDとなります。`MAX_SLIDE`はスライド画像の総数です。`MARGIN_X`はスライド画像の横方向のマージンです。`ITEM_W`はスライド画像の横幅です。

```
for (let i = 0; i < MAX_SLIDE; i++) {
  // 移動値を初期化
  let targetX = MARGIN_X * (i - id); // X座標の計算
  let targetZ = 0;
  let targetRot = 0;

  // 中央のスライド画像より左側のもの
  if (i < id) {
    targetX -= ITEM_W * 0.6; // 余白分ずらす
    targetZ = ITEM_W; // 奥側へ配置
    targetRot = +45 * (Math.PI / 180);
  }
  // 中央のスライド画像より右側のもの
  else if (i > id) {
    targetX += ITEM_W * 0.6; // 余白分ずらす
    targetZ = ITEM_W; // 奥側へ配置
    targetRot = -45 * (Math.PI / 180);
  }
  // 中央のスライド画像
  else {
    targetX = 0;
    targetZ = 0;
    targetRot = 0;
  }

  // （反射面は後述のため省略）
}
```

#### スクロールバーの設置

ユーザーインタフェースとしてスクロールバーを画面内に配置し、スクロールバーの値に応じてスライドを移動させるようにします。

![](https://ics.media/entry/1787/images/images/230428_coverflow_input.jpg)

スクロールバーはHTMLの`input`タグの`type="range"`属性値を使います。見た目はCSSで装飾しています。

```
<input type="range" id="rangeSlider" min="0" max="1" step="0.01" />
```

CSSのコードは一部抜粋

```
input[type="range"] {
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-container {
  background: #000;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 30%;
  height: 12px;
  background: #000;
  border-radius: 10px;
  border: 1px #777 solid;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 10px;
  width: 30%;
  border-radius: 10px;
  border: 1px #000 solid;
  background: #777;
}

input[type="range"]:focus {
  outline: rgba(255, 255, 255, 0.2) solid 2px;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #222;
}

```

スクロールバーのつまみを動かしたときに`input`イベントが発生しますので、そのイベントを`addEventListener()`メソッドで受け取るようにします。`valueAsNumber`プロパティーは0～1の値をとり、スクロールバーのつまみが左端にあるときは0を、右端にあるときは1の値となります。この`valueAsNumber`プロパティーの値を使って、スライドを移動させるようにしておきます。

```
// インプット要素の制御
const elementInput = document.querySelector("input#rangeSlider");
elementInput.addEventListener("input", onInputChange);

//　(省略）

/**
 * スクロールが動いたときのイベント
 */
function onInputChange() {
  const val = elementInput.valueAsNumber;
  // スクロールバーの値からページIDの計算
  const nextId = Math.round(val * (MAX_SLIDE - 1));
  // ページ遷移
  // （省略）
}
```

### STEP2. 動きのブラッシュアップ

配置座標を計算する方法を紹介しましたが、アニメーションするように変更してみましょう。

#### モーショントゥイーンの実装

モーショントゥイーンの実装にはgsap（ジーサップ）というトゥイーンライブラリを利用することにします。

gsapはCDNで読み込むことができます。HTMLの`head`タグ内に以下のコードを追加してください。

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
```

スライドの移動は、gsapを用いてアニメーションさせます。STEP1のスクリプトでは、スライドに座標や角度をも求めていましたが、これをgsapを使ってアニメーションするように書き直します。gsapでは次の書式で記述することでパラメーターを指定した時間でトゥイーンさせることができます。

```
gsap.to(対象のオブジェクト, { 
    変化させたいパラメーター: 目的の値, 
    duration: 秒数, 
    ease: イージングの指定,
    overwrite: true, // 上書き許可
  },
  );
```

スライドの移動をgsapで実装してみましょう。配置座標と角度を別々に動かしたいので、以下のように`position`と`rotation`を独立して制御しています。

```
// 対象のカードの参照
const card = cards[i];

// (省略）

// 配置座標を指定
gsap.to(card.position, {
  x: targetX,
  z: -1 * targetZ,
  duration: 1.8, // 1.8秒かけて移動
  ease: "expo.out", // 強めのイージングを指定
  overwrite: true, // 上書き許可
});

// 角度を動かす
gsap.to(card.rotation, {
  y: targetRot,
  duration: 0.9, // 0.9秒かけて移動
  ease: "expo.out", // 強めのイージングを指定
  overwrite: true, // 上書き許可
});
```

### STEP3. 表現のブラッシュアップ

カバーフローでは、鏡面反射しているような表現をつけたいところです。

![](https://ics.media/entry/1787/images/images/230428_coverflow_reflect.jpg)

これを3D空間の上面（変数planeTop）の下側（Y座標）に配置します。垂直方向を反転して表示させたいので、メッシュとして回転させておきます。

```

/**
 * カバーフローのカード
 */
class Card extends THREE.Object3D {

  /**
   * @param index {number}
   */
  constructor(index) {
    super();

    const texture = new THREE.TextureLoader().load("./imgs/" + index + ".jpg");
    texture.colorSpace = THREE.SRGBColorSpace;

    // （上面は先述のため省略）

    // 反射面
    const materialOpt = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      side: THREE.BackSide,
      opacity: 0.2,
    });
    const planeBottom = new THREE.Mesh(
      new THREE.PlaneGeometry(ITEM_W, ITEM_H),
      materialOpt
    );
    planeBottom.rotation.y = 180 * (Math.PI / 180);
    planeBottom.rotation.z = 180 * (Math.PI / 180);
    planeBottom.position.y = -ITEM_H - 1;
    this.add(planeBottom);
  }
}
```

#### ライトと背景

![](https://ics.media/entry/1787/images/images/230428_coverflow_bg.jpg)

演出上の調整として`THREE.PointLight`を追加し、中央のスライドが強調されるようにしています。中央のスライドにライトを当てており、周辺に行くほど光量が減衰するようにPointLightのプロパティーを設定しています。

```
// ライト
const pointLight = new THREE.PointLight(0xffffff, 1000000, 1000);
pointLight.position.set(0, 0, 500);
scene.add(pointLight);
```

背景にはグラデーションの画像を配置しています。幅・高さが大きめの`THREE.PlaneGeometry`を使って、画像を貼り付けています。`THREE.MeshBasicMaterial`クラスは、ライトに影響をうけないマテリアルになります。背景はグラデーションを画像として用意しているので、ライトの影響を与えずに配置するためにこのマテリアルを使っています。

```
// 背景の生成
const bgTexture = new THREE.TextureLoader().load(URL_BG);
bgTexture.colorSpace = THREE.SRGBColorSpace;
const meshBg = new THREE.Mesh(
  new THREE.PlaneGeometry(3000, 1000),
  new THREE.MeshBasicMaterial({
    map: bgTexture,
  })
);
meshBg.position.z = -500;
scene.add(meshBg);
```

#### ユーザービリティーの改善

次の対応を行うことで、ユーザービリティーが向上します。

-   キーボードのカーソルキー（上下左右）
-   マウスホイール
-   スマートフォンのタッチ操作

キーボードのカーソルキー対応は`input`タグを活用します。`input`タグは配置するだけで自動的にキーボード操作ができ、上下キーで数値を変えられます。画面表示時には`input`タグにフォーカスをあてておきます。

```
// インプット要素の制御
const elementInput = document.querySelector("input#rangeSlider");
elementInput.addEventListener("input", onInputChange);
elementInput.focus(); // フォーカスをあたえる
```

マウスホイール対応は、`wheel`イベントを監視します。`input`タグの`valueAsNumber`値を変更することで、スライドを移動させています。

```
// マウスホイール対応
window.addEventListener(
  "wheel",
  (event) => {
    elementInput.valueAsNumber += event.deltaY * 0.0005;
    onInputChange();
    event.preventDefault();
  },
  { passive: false }
);
```

以上が実装方法の説明となります。

### コラム：別バージョンのデモ

このカバーフローのオリジナルデモは、筆者が2011年にFlashで作成していました。

![](https://ics.media/entry/1787/images/coverflow_flash_960x540.jpg)

-   [GPUを利用したCoverFlowのサンプル (ソースコード付き) | ClockMaker Blog](http://clockmaker.jp/blog/2011/10/stage3d-cover-flow/)

自著「[Stage3D プログラミング](https://ics-web.jp/showcase/stage3d_book/)」で詳しく説明しています。

WebGLの時代にあわせて、2014年にWebGL版として、JSライブラリのAway3D TypeScriptと、Three.js r68を利用して2種類のデモを制作しました。以下の作例は、Away3D TypeScript版です。

![](https://ics.media/entry/1787/images/coverflow_away3d_960x540.jpg)

-   [デモを再生する](https://ics-creative.github.io/data-demos/140805_awayjs_coverflow/src/index.html) （別ウインドウで開く）
-   [ソースコード](https://ics-creative.github.io/data-demos/140805_awayjs_coverflow/src/CoverFlowApp.ts) (TypeScript 1.0)

結果的に現在はThree.jsがデファクトスタンダードとなったので、本記事はThree.js一本で解説内容をリライトしました（Three.js自体のバージョンアップに伴い、何度かコードを書き直しています）。また、WebGPUの時代が来ようとしているので2025年にWebGLからWebGPUに移植しました。

-   [WebGPU対応のThree.jsのはじめ方](https://ics.media/entry/250501/)

ウェブコンテンツを将来にわたって維持していくことの難しさを感じますね。

### まとめ

3D表現をユーザーインタフェースに使う作例として紹介しました。Three.jsを学ぶ教材としてお手頃なテーマなので、学びはじめの方はぜひ活用してほしい作例です。

Three.jsを使いこなせばさまざまな表現を作ることができます。ぜひ、Three.jsを使ってみてください。