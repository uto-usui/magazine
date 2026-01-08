---
title: "WebGLフレームワーク「Babylon.js 3.3.0」リリース！VR向けGUI対応、パーティクルエフェクト強化、動画キャプチャー機能など"
source: "https://ics.media/entry/19122/"
publishedDate: "2018-10-12"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

前回の記事『[「編隊少女 -フォーメーションガールズ-」における3Dレンダリング技術解説](https://ics.media/entry/18881/)』では、WebGLフレームワーク[Babylon.js](https://www.babylonjs.com/)の採用事例を紹介しました。その[Babylon.jsの最新版（3.3.0）](https://doc.babylonjs.com/whats-new#330)が2018年10月4日にリリースされましたので、最新機能をサンプルコンテンツ、ソースコードと合わせてお届けします。

### 3D GUIを簡単に作成

![](https://ics.media/entry/19122/images/181010_babylonjs_330_1.jpg)

VRコンテンツ向けのGUIを簡単に作成できる[Microsoft Mixed Reality Toolkit（MRTK）](https://github.com/Microsoft/MixedRealityToolkit)の2つの機能が追加されました。

1.  **3Dボタンを簡単に格子状に配置できる機能**。空間上の座標を意識することなく、GUIを構築できます。格子形状のカスタマイズも可能です。（扇形状にボタンを配置、ランダムに配置など）
2.  MRTKにある2つのボタン機能「**Holographic button**」と「**Push button**」が[Babylon.js](https://www.babylonjs.com/)用に追加。MRTKと同様のAPIでコンテンツを構築できます。

どれぐらい簡単かを感じていただくため、サンプルコードを載せておきます。

-   [サンプルコンテンツを開く](https://www.babylonjs-playground.com/#HB4C01#9)

#### サンプルコード

```
// Step1. GUI3DManagerを作成
var manager = new BABYLON.GUI.GUI3DManager(scene);

// Step2. 球状にボタンを配置するため、SpherePanelを作成
var panel = new BABYLON.GUI.SpherePanel();
// マージンを設定
panel.margin = 0.2;
// カラムの数を設定
panel.columns = 4;

// Step3. GUI3DManagerにSpherePanelを追加
manager.addControl(panel);

// Step4. HolographicButtonを作成
for (let index = 0; index < 60; index++) {
  // HolographicButtonを作成
  const button = new BABYLON.GUI.HolographicButton(
    "orientation"
  );
  // SpherePanelにボタンを追加
  panel.addControl(button);
  // ボタンにテキストを設定
  button.text = "Button #" + panel.children.length;
  // ボタンに画像を設定
  button.imageUrl = "./textures/down.png";
}
```

#### Microsoft Mixed Reality Toolkit（MRTK）とは

Microsoft HoloLensとWindows Mixed Realityヘッドセットを対象としたアプリケーションを開発するためのスクリプトとコンポーネントの集まりです。

参考サイト

-   [MixedRealityToolkit-Unity](https://github.com/microsoft/mixedrealitytoolkit-unity)
-   [UnityによるHoloLensアプリケーション入門](https://www.slideshare.net/YuichiIshii/unityhololens-92864583)

### パーティクルシステムの機能向上

![](https://ics.media/entry/19122/images/181010_babylonjs_330_2.jpg)

[Babylon.js](https://www.babylonjs.com/)には炎や雨などを表現する[パーティクルシステム](https://doc.babylonjs.com/typedoc/classes/BABYLON.ParticleSystem)が備わっています。今回のアップデートで、**スプライトシートアニメーションのランダム再生**、さまざまな形状からパーティクルを放出する**「emitter shape」機能の向上**、**CPUパーティクルのレンダリングパフォーマンス向上**（低スペック端末の場合に**2倍以上の向上**）をはじめ、28種類もの機能追加や更新がありました。上図の太陽のフレアのような複雑なエフェクトも作りやすくなりました。

[Babylon.js](https://www.babylonjs.com/)の素晴らしいところは、OSSでありながらも新規に追加された機能には、しっかりとしたドキュメントとPlaygroundによるデモが付いている点です。

-   [サンプルコンテンツを開く](https://playground.babylonjs.com/frame.html#46MPSD)

### ギズモで3Dオブジェクトを操作

![](https://ics.media/entry/19122/images/181010_babylonjs_330_3.jpg)

ギズモとは、Unityや3ds Maxなどのソフトウェアでお馴染みの3Dオブジェクトに付随している目印のこと（上図の中心の、赤・緑・青の円形）。これを操作することで、3Dオブジェクトを操作できます。

Babylon.jsで作成したコンテンツ内でも、ギズモを任意の3Dオブジェクトに取り付けることで、**移動・回転・スケーリングの操作を簡単に実装**できます。ギズモ機能とVRを組み合わせて、3Dメッシュの形状をユーザーがカスタマイズするようなコンテンツも作れるでしょう。

-   [サンプルコンテンツを開く](https://playground.babylonjs.com/frame.html#0LMZ2Y)

### 環境テクスチャーの品質向上

![](https://ics.media/entry/19122/images/181010_babylonjs_330_4.jpg)

環境テクスチャーが改善され、一般的なレイトレースによるレンダリング品質に近づいてきました。さらに、新たに追加された環境テクスチャツールにより、**クオリティを保ったままテクスチャーサイズを圧縮**でき、パフォーマンスの向上が計れます。

-   [サンプルコンテンツを開く](https://sandbox.babylonjs.com/?assetUrl=https://models.babylonjs.com/PBR_Spheres.glb)

### PlaygroundでのTypeScriptサポート

![](https://ics.media/entry/19122/images/181010_babylonjs_330_5.jpg)

Playgroundと呼ばれる**サンドボックス環境でTypeScriptがサポート**されました。ユーザーが自身のプロジェクトをTypeScriptで開発しながら、Playgroundを使ってコードを試しやすくなるでしょう。

### ドキュメントの強化

![](https://ics.media/entry/19122/images/181010_babylonjs_330_6.jpg)

ソースコードコメントの**TypeDoc対応**が行われ、API一覧をTypeDocのフォーマットで閲覧できます。コーディング中に表示されるドキュメントにも反映されますので、より**効率的にコンテンツを開発できる**でしょう。

-   [Babylon.js Documentation](https://doc.babylonjs.com/)

### WebM形式の動画キャプチャー機能

![](https://ics.media/entry/19122/images/181010_babylonjs_330_7.jpg)

新たに追加された**Video Recorder**機能により、たった数行のコードで**WebM形式のムービーを作成**できます。3Dシーン内でユーザーが操作した内容を録画して保存したり、ゲームプレイの録画などに利用できるでしょう。  
※MediaRecorder APIを利用した機能のためブラウザ制限があります。

-   [サンプルコンテンツを開く](https://www.babylonjs-playground.com/#47H64G#2)

#### サンプルコード

```
// ブラウザのサポート状況をチェック
if (BABYLON.VideoRecorder.IsSupported(engine)) {
  // VideoRecorderを作成
  let recorder = new BABYLON.VideoRecorder(engine);
  // 録画開始 (test.webmというファイル名で、2秒録画します)
  recorder.startRecording("test.webm", 2);
}
```

-   [MediaRecorder APIのサポート状況（Can I use…）](https://caniuse.com/#search=mediarecorder)

### まとめ

「これはおもしろい！」、オープンソースのフレームワークを使っていて、そう感じる瞬間があります。その分野の技術が、周辺の関連技術に波及していく瞬間です。今回のアップデートを通して[Babylon.js](https://www.babylonjs.com/)は、**WebGLとMR（Mixed Reality）の分野との橋渡しの存在**になっていくでしょう。柔軟に変化を遂げようとするフレームワーク「[Babylon.js](https://www.babylonjs.com/)」から、今後も目が離せません。気になる方はぜひチェックしてみてください。