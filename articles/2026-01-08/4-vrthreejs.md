---
title: "たった4行でできる！ ブラウザ向けVRをThree.jsで実装する方法"
source: "https://ics.media/entry/18793/"
publishedDate: "2018-08-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

2018年にOculus Go（オキュラス・ゴー）が発売されました。Oculus Goはパソコンやスマートフォンを必要とせず、単体でVR（バーチャルリアリティ、仮想現実）が楽しめるスタンドアロン型VR HMD（ヘッドマウントディスプレイ）として登場しました。価格も当時は23,800円からと比較的安価で、**日本でも購入者が増え、これまでと比べ一気にVR環境が広がるきっかけとなりました**。

その後継として登場したのが、より高度なVR体験が可能になり現在も進化を続ける「[Meta Quest](https://www.meta.com/jp/quest/)」シリーズ（旧Oculus Quest）です。2025年現在、VRはエンタメや教育、ビジネスなど多分野で広く活用されています。

VR環境の普及に伴い、**ウェブコンテンツにおいてもVR対応へのニーズが増えています**。ウェブブラウザには[WebXR Device API](https://immersive-web.github.io/webxr/)が策定されており、これを使用することでブラウザでもVR体験が可能です。

※以前はWebXR APIではなく、[WebVR API](https://immersive-web.github.io/webvr/spec/1.1/)という仕様がありました。WebVR APIの策定はv1.1で停止しています。VR以外にもAR（拡張現実）やMR（複合現実）といったXR（◯◯現実）を総合的に扱うWebXR Device APIに統合されました。

最新の[Three.js](https://threejs.org/)であれば、既存のThree.jsコンテンツをWebXRに対応するのは驚くほど簡単です。**スクリプトを4行変更するだけですべてのWebXR処理をThree.js内で完結してくれます**。デモを作成したのでご覧ください。

![Three.jsのVRデモ](https://ics.media/entry/18793/images/180801_three_webvr_demo.png)

-   [デモを別ウインドウで再生する  
    （スマートフォンやMeta QuestなどのVR HMDからご覧ください）](https://ics-creative.github.io/180801_three-vr/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/180801_three-vr/blob/master/docs/index.html)

※この記事のソースコードは2025年4月時点のThree.js(r175)によって書かれています

Three.jsのVRコンテンツ化の方法は、公式のドキュメントは『[How to create VR content – three.js docs](https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content)』（英語）でも解説されています。

### Three.jsでのVRの対応方法

まずは通常通りThree.jsコンテンツを作成しましょう。本記事ではThree.js自体の説明は割愛しますが、基本的な使い方はICS MEDIAの[Three.js入門サイト](https://ics.media/tutorial-three/)で学べます。作成したThree.jsコンテンツに対し、以下の変更を加えてVRに対応します。

#### 1\. XRを有効にする

最初に、Three.jsのレンダラー（`THREE.WebGLRenderer`）に対してWebXRが有効になるようフラグを設定します。

```
// レンダラーのWebVR設定を有効にする
renderer.xr.enabled = true;
```

#### 2.アニメーションのループを設定する

次に、レンダラーに対して毎フレーム実行されるループ関数を登録します。

```
// レンダラーにループ関数を登録
renderer.setAnimationLoop(tick);
```

通常は毎フレーム実行するループ関数を`Window`オブジェクトの`requestAnimationFrame()`メソッドに設定します。一方、WebXRではHMDデバイスに対応した`XRSession`オブジェクトの`requestAnimationFrame()`メソッドに対して設定する必要があります。ループ関数をThree.jsのレンダラーの`setAnimationLoop()`メソッドに登録することで、表示状態に応じてThree.jsがこの2つを適切にスイッチしてくれます。`Window`オブジェクトに設定した`requestAnimationFrame()`メソッドは削除してください。

以上でThree.jsのVR対応は完了です。追加で下記の対応を行います。

#### 3\. VRの判定、開始ボタンを表示する

VRの表示は、クリックやタップなどのユーザー操作を起点としてのみ開始できます。VRコンテンツにはこのためのUIが必要となります。また、WebXR Device APIに対応した環境かどうかの判定も必要です。

この2つの機能を実現できる[VRButton](https://github.com/mrdoob/three.js/blob/dev/examples/jsm/webxr/VRButton.js)というヘルパーがThree.jsのサンプルとして提供されています。VRButton.jsを`import`文で取り込み、`VRButton.createButton()`メソッドでボタン要素を作成し、DOMに追加します。

```
// VRの判定、遷移ボタンのスクリプト
// three/addons/ エイリアスはESMのimportmapで定義しています。詳しくはHTMLソースを確認ください。
import { VRButton } from "three/addons/webxr/VRButton.js";

// ･･･（省略）･･･

// WebVRの開始ボタンをDOMに追加
 document.body.appendChild(VRButton.createButton(renderer));
```

![「ENTER VR」ボタン](https://ics.media/entry/18793/images/180801_three_webvr_entervr.png)

VRを表示できる環境の場合は「ENTER VR」ボタンが表示され、クリックするとVRの表示を開始できるようになります。

#### 4.ポリフィルを追加する

[Immersive Web Developer Home](https://immersiveweb.dev/#supporttable)にてWebVR APIに対応しているブラウザを確認できます。より多くのユーザーに体験してもらうためにWebXR Device APIのポリフィルを使用しましょう。

[webxr-polyfill](https://github.com/immersive-web/webxr-polyfill)を読み込み、スクリプト冒頭で`new WebXRPolyfill()`と記述すればポリフィルを適用できます。

```
// WebXRのポリフィルを読み込み
// webxr-polyfill エイリアスはESMのimportmapで定義しています。詳しくはHTMLソースを確認ください。
import WebXRPolyfill from "webxr-polyfill";

// ポリフィルを使用
const polyfill = new WebXRPolyfill();
```

以上の4ステップでThree.jsのコンテンツをVR対応できました。**3D空間内を見回すだけのコンテンツであれば簡単に対応できる**ことがわかります。

### 開発TIPS

Three.jsの既存コンテンツをVR対応する上で注意するポイントを紹介します。

#### 指定したcanvas以外の要素は表示されない

WebXR Device APIは`canvas`要素をHMDに表示する機能です。そのため、**指定したcanvas以外のcanvas要素や他のDOM要素は画面に表示されません**。VRに2次元のUIなどを表示したい場合はThree.jsと同じcanvasレイヤーに描画する必要があります。たとえば、[dat.GUI for VR](https://github.com/dataarts/dat.guiVR)を使えばThree.js空間上にUIを表示できます。

![](https://ics.media/entry/18793/images/180801_three_webvr_datgui.gif)

#### カメラのFOVに注意

Three.jsのカメラ（`THREE.PerspectiveCamera`）に設定したFOV（画角）値はVR表示時には無視され、**HMDデバイスのFOV値が使用されます**。極端なFOV値でコンテンツを作成すると、PCで表示したときとVR HMDで表示した時の差が大きくなり、意図しない見た目になることがあります。最初からカメラのFOV値を90°くらいで作っておきましょう。

#### カメラ座標を変更したい場合

Three.jsでカメラを動かすときは`camera`の`position`プロパティを使いますが、VRでは`camera`の`position`プロパティは無視されます。この方法では座標の変更ができません。

```
// VRではカメラの座標を変更できない
// camera.position.x = 100;
```

代わりに、**カメラ用の空コンテナーを作り、カメラではなくコンテナーに対して座標を設定します**。カメラ用コンテナーを`scene`に追加することも忘れないでください。

```
// カメラ用のコンテナを作成
const cameraContainer = new THREE.Object3D();

// カメラをコンテナに追加
cameraContainer.add(camera);

// カメラ用コンテナをsceneに追加
scene.add(cameraContainer);

// コンテナに対して座標を設定することでカメラの座標を変更可能
cameraContainer.position.x = 100;
```

※ カメラを動かす場合は、ユーザーがVR酔いしないよう充分に注意してください

#### 動作確認に便利な拡張機能

Chromeの拡張機能『[Immersive Web Developer Home](https://immersiveweb.dev/#supporttable)』を使うと、WebXRのエミュレートを行えます。使い方は以下の通りです。

1.  拡張機能をインストールする
2.  VRコンテンツのページを開く
3.  デベロッパーツールを開く
4.  ［XR］タブを開く
5.  ブラウザをリロードする
6.  ページ内のコンテンツでVRを開始する（例:［Enter VR］ボタンを押す）
7.  デベロッパーツール内のヘッドセットをドラッグして、視点を回転する

![](https://ics.media/entry/18793/images/images/180801_webxr_chrome_extention.gif)

### 終わりに

Oculus Goの登場でVR環境の普及が加速し、その波はウェブ業界にも押し寄せてきています。Three.jsを使えば簡単にVR対応できるので、みなさんのウェブコンテンツもぜひVRで表示してみませんか？　**HMDをかぶって自分で作成した3Dコンテンツ内に入り込んだときの感動はひとしお**です。

ICS MEDIAでは[Three.jsの入門サイト](https://ics.media/tutorial-three/)を公開しています。まだThree.jsをさわったことがない方もこの機会にチャレンジしてみましょう。