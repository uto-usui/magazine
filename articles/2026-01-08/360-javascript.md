---
title: "お手軽360°パノラマ制作入門！ JavaScriptでパノラマビューワーを自作しよう"
source: "https://ics.media/entry/14490/"
publishedDate: "2017-01-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

360°の全方向を自由に見渡せるパノラマコンテンツは、Googleストリートビューのようなウェブサービスによって身近なものになってきています。

前回の記事『[THETAで撮影しWeb公開に挑戦しよう](https://ics.media/entry/14150/)』では、360°の静止画・動画が撮影できるカメラ「[RICOH THETA](https://www.ricoh360.com/theta/)」で撮影したパノラマをYouTubeなどのウェブサービスで手軽に公開する方法を紹介しました。

今回は、カスタマイズ性の高いウェブ用の360°パノラマビューワーの実装方法を、初心者用と上級者用として二通り紹介します。初心者用のものはHTMLで3Dを作成できるライブラリ「[A-Frame](https://aframe.io/)」を使い、上級者用としてはJavaScript製の3Dライブラリ「[Three.js](https://threejs.org/)」を用います。

### パノラマ静止画を表示する360°パノラマビューワー

本記事で解説するサンプルの完成形を紹介します。360°パノラマビューワーで、パソコンではマウスドラッグで視点を操作できます。手元のパソコンでお試しください。

![Three.jsを使った静止画用パノラマビューワー](https://ics.media/entry/14490/images/170112_panorama04.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/161208_panorama/sample03/)

本記事で紹介するデモのソースコードはGitHubに公開してます。ソースコードをダウンロードした上で記事を読み進めてください。それではこのサンプルの作り方を解説します。

-   [ソースコード - GitHub](https://github.com/ics-creative/161208_panorama)

### 360°パノラマビューワーの仕組み

![360°パノラマビューワーの仕組み解説図](https://ics.media/entry/14490/images/170112_panorama06.jpg)

360°パノラマビューワーの仕組みは意外と単純です。3D空間上に球体を配置し、パノラマ静止画をテクスチャーとして貼り付けます。その球体の中心にカメラを配置し、ぐるぐると視点を切り替えると360°の全方向を見渡せる360°パノラマビューワーの完成です。

![RICOH THETA Sで撮影したパノラマ](https://ics.media/entry/14490/images/170112_panorama07.jpg)

▲RICOH THETA Sで撮影したパノラマ

### A-FrameでHTMLをマークアップするように手軽に実装する方法

MozillaのVRチームが開発した3Dライブラリ「[A-Frame](https://aframe.io/)」を使うと、**HTMLのマークアップのように手軽に実装できます**。

![A-Frameの公式ページ](https://ics.media/entry/14490/images/170112_panorama01.jpg)

▲A-Frameの公式ページ

A-Frameで作成したパノラマ静止画を表示する360°パノラマビューワーをお試しください。

![A-Frameを使った静止画用パノラマビューワー](https://ics.media/entry/14490/images/170112_panorama02.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/161208_panorama/sample01/)
-   [コードを確認する](https://github.com/ics-creative/161208_panorama/blob/main/sample01/index.html)

続いて動画バージョンのデモもお試しください。スマートフォン・タブレットは未対応なので、パソコンで再生ください。

![A-Frameを使った動画用パノラマビューワー](https://ics.media/entry/14490/images/170112_panorama03.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/161208_panorama/sample02/)
-   [コードを確認する](https://github.com/ics-creative/161208_panorama/blob/main/sample02/index.html)

ここでは、JavaScriptにあまり触れたことのない方を対象に、A-Frameの導入方法からパノラマ静止画・動画を表示できる360°パノラマビューワーの実装方法までを順を追って紹介します。**手順通りに進めれば十数行のコードで実装できます**。

※ A-Frameの詳しい使い方は記事「[HTMLタグで本格VRコンテンツが作れる！ Mozillaが開発した3Dライブラリ「A-Frame」がすごい](https://ics.media/entry/13401/)」を参照ください。

#### 1\. HTMLからライブラリを読み込む

A-Frameのライブラリを読み込むために、`head`要素内に`script`要素を記述します。A-FrameのライブラリはCDN（コンテンツデリバリネットワーク）を使って読み込むことができます。

```
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- A-FrameのJavaScriptファイルを読み込みます -->
    <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
  </head>
  <body>
    <!-- A-Frameのタグを記述します -->
  </body>
</html>
```

#### 2\. シーンの作成

球体とカメラを配置する3D空間（シーン）を作成します。A-Frameでは、シーンにオブジェクトを追加してコンテンツを作っていきます。`a-scene`要素を`body`要素内に記述すると簡単にシーンが作成できます。

```
<body>
  <!-- シーン -->
  <a-scene></a-scene>
</body>
```

#### 3\. パノラマ静止画の読み込み

A-Frameでパノラマ静止画などの外部ファイルを使用するときは、`a-assets`要素内に`img`要素で指定します。読み込んだパノラマ静止画をテクスチャーとして参照するために`id`属性を記述します。

```
<body>
  <!-- シーン -->
  <a-scene>
    <!-- アセット -->
    <a-assets>
      <img id="sky" src="../common/images/image.jpg" />
    </a-assets>
  </a-scene>
</body>
```

#### 4\. 読み込んだパノラマ静止画を背景に指定する

読み込んだパノラマ静止画を背景として設定するには、`a-sky`要素を指定します。`a-sky`要素の`src`属性に、`img`要素の`id`属性を記述すると背景として表示されます。これでパノラマ静止画を表示する360°パノラマビューワーの完成です。

```
<body>
  <!-- シーン -->
  <a-scene>
    <!-- アセット -->
    <a-assets>
      <img id="sky" src="../common/images/image.jpg" />
    </a-assets>
    <!-- 全天球背景 -->
    <a-sky src="#sky" rotation="0 -130 0"></a-sky>
  </a-scene>
</body>
```

360°パノラマビューワーの仕組みで「中心にカメラを配置する」と解説しましたが、A-Frameでは初期状態でカメラがシーンの中央に配置されているため、とくにカメラの設定は行いません。

#### 発展：パノラマ動画を読み込む場合

パノラマ静止画の代わりにパノラマ動画を背景として表示するには、`a-assets`要素内に`video`要素を指定し、`a-videosphere`要素で参照するだけで簡単に実装できます。

```
<body>
  <!-- シーン -->
  <a-scene>
    <!-- アセット -->
    <a-assets>
      <!-- 動画をループ再生する -->
      <video
        id="video"
        src="../common/videos/video.mp4"
        loop
        autoplay
        muted
        playsinline
      ></video>
    </a-assets>
    <!-- 全天球背景 -->
    <a-videosphere src="#video" rotation="0 -130 0"></a-videosphere>
  </a-scene>
</body>
```

### Three.jsで本格的に実装する方法

自由にカスタマイズしたり、凝ったインタラクションを加えたい場合は、JavaScript製の3Dライブラリとして有名な[Three.js](https://threejs.org/)で実装します。Three.jsを使えばA-Frameで実装するよりも設計の自由度が高いため、幅広い用途で利用できます。

Three.jsで作成したパノラマ静止画を表示する360°パノラマビューワーをお試しください。

![Three.jsを使った静止画用パノラマビューワー](https://ics.media/entry/14490/images/170112_panorama04.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/161208_panorama/sample03/)
-   [コードを確認する](https://github.com/ics-creative/161208_panorama/blob/main/sample03/js/main.js)

続いて動画バージョンのデモもお試しください。スマートフォン・タブレットは未対応なので、パソコンで再生ください。

![Three.jsを使った動画用パノラマビューワー](https://ics.media/entry/14490/images/170112_panorama05.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/161208_panorama/sample04/)
-   [コードを確認する](https://github.com/ics-creative/161208_panorama/blob/main/sample04/js/main.js)

ここでは、JavaScriptの経験がある方を対象に、360°パノラマビューワーの実装に便利なモジュールの使い方から、パノラマ静止画・動画を表示できる360°パノラマビューワーの実装方法までを順を追って紹介します。

#### 1\. HTMLからライブラリを読み込む

Three.jsはESモジュールを使って取りこみます。以下のコードを`head`タグ内に記載します。

```
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.167.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.167.0/examples/jsm/"
    }
  }
</script>
```

#### 2\. シーンの作成

球体とカメラを配置するシーンを作成します。

```
// シーンの作成
const scene = new THREE.Scene();
```

#### 3\. カメラの作成

カメラを作成し、さきほどのシーンへXYZ座標すべてが0になるように配置します。

```
// カメラの作成
const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
camera.position.set(0, 0, 0);
scene.add(camera);
```

#### 4\. 球体を作成してパノラマ静止画をテクスチャーとして設定

球体を作成してパノラマ静止画をテクスチャーとして設定します。設定できたらシーンへ配置します。

```
// 球体の形状を作成
const geometry = new THREE.SphereGeometry(5, 60, 40);
geometry.scale(-1, 1, 1);

// 画像を読み込み
const texture = new THREE.TextureLoader().load("../common/images/image.jpg");
texture.colorSpace = THREE.SRGBColorSpace;

//　マテリアルの作成
const material = new THREE.MeshBasicMaterial({
  // 画像をテクスチャとして指定
  map: texture,
});

// 球体(形状)にマテリアル(質感)を貼り付けて物体を作成
const sphere = new THREE.Mesh(geometry, material);

//　シーンに追加
scene.add(sphere);
```

#### 5\. パソコンで閲覧時の視点操作する処理を実装

パソコンで閲覧時は、マウスドラッグで視点を操作します。

```
// パソコン閲覧時マウスドラッグで視点操作する
const controls = new OrbitControls(camera, element);
controls.target.set(
  camera.position.x + 0.15,
  camera.position.y,
  camera.position.z,
);
// 視点操作のイージングをONにする
controls.enableDamping = true;
// 視点操作のイージングの値
controls.dampingFactor = 0.1;
// 視点変更の速さ
controls.rotateSpeed = 0.5;
// ズーム禁止
controls.noZoom = false;
// パン操作禁止
controls.noPan = false;
```

#### 6\. 視点操作処理をレンダラーに登録

最後に3Dの描画をレンダリングするレンダラーに、視点操作処理を登録すると視点操作が可能になります。これでパノラマ静止画を表示する360°パノラマビューワーの完成です。

```
function tick() {
  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  controls.update();
}
```

#### 発展：パノラマ動画をテクスチャーとして設定する場合

「4. 球体を作成してパノラマ静止画をテクスチャーとして設定」のコードを次のように変更すると、パノラマ動画をテクスチャーとして設定できます。

```
// 球体の形状を作成
const geometry = new THREE.SphereGeometry(5, 60, 40);
geometry.scale(-1, 1, 1);

// 動画の読み込み
const video = document.createElement("video");
video.src = "../common/videos/video.mp4";
video.autoplay = true;
video.loop = true;
video.playsInline = true;
video.muted = true;
video.play();

//テクスチャーにvideoを設定
const texture = new THREE.VideoTexture(video);
texture.colorSpace = THREE.SRGBColorSpace;

//マテリアルの作成
const material = new THREE.MeshBasicMaterial({
  // 画像をテクスチャとして読み込み
  map: texture,
});

// 球体(形状)にマテリアル(質感)を貼り付けて物体を作成
const sphere = new THREE.Mesh(geometry, material);

//　シーンに追加
scene.add(sphere);
```

### 最後に

今回は、「A-Frame」と「Three.js」を使った360°パノラマビューワーの基本的な実装方法を紹介しました。こちらをベースに、3Dモデルを動かしたり、インタラクションによってパノラマを切り替えたりとカスタマイズを加えることで、オリジナルの360°パノラマコンテンツが作成できます。

また、パノラマはVR（Virtual Reality）と相性がよく、**作成した360°パノラマビューワーに一手間加えるだけで、VRコンテンツも作成できます**。ICS MEDIAでは、『[たった4行でできる！ ブラウザ向けVRをThree.jsで実装する方法](https://ics.media/entry/18793/)』も紹介しているので、ぜひ挑戦してみてください！