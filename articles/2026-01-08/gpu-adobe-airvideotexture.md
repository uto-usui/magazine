---
title: "カメラやビデオ動画をGPUで画像処理しよう！ Adobe AIRのVideoTexture機能の使い方"
source: "https://ics.media/entry/4411/"
publishedDate: "2016-07-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

Adobe AIRには、3D空間にビデオを表示できる[VideoTexture](http://help.adobe.com/ja_JP/FlashPlatform/reference/actionscript/3/flash/display3D/textures/VideoTexture.html)機能が備わっています。VideoTexture機能では**ビデオ動画をFlashのStage3Dのテクスチャーとして扱える**ため、**ビデオ動画のStage3Dコンテンツとの共存、および複雑な画像処理が可能になり、コンテンツ表現の幅がさらに広がります**。本記事ではVideoTextureを使ってサンプルを作成したので紹介します。まずはサンプルの様子を録画したビデオをご覧ください。

-   [ソースコードを確認する](https://github.com/ics-creative/160701_videoTexture/blob/master/src/Main.as)
-   [インストーラーをダウンロードする](https://github.com/ics-creative/160701_videoTexture/raw/master/VideoTexture%20Demo.air)

コンテンツを再生するとパソコンが搭載しているカメラの動画をStage3Dのテクスチャーとして画面に表示し、GPU上で画像処理をします。画面右上のコンボボックスを選択すると以下の処理をカメラ動画に対して行います。

-   normal: カメラからの動画をそのまま表示します
-   monochrome: カメラからの動画をモノクロに画像処理して表示します
-   neg: カメラからの動画をネガ（反転）に画像処理して表示します
-   sepia: カメラからの動画をセピア色に画像処理して表示します

本記事のサンプルは[GitHubのリポジトリ](https://github.com/ics-creative/160701_videoTexture)にソースコードとインストーラーを用意していますので、お手元で試したい場合はリポジトリを参考ください。なお、VideoTextureの利用には最新版の[AIR SDK](http://www.adobe.com/devnet/air/air-sdk-download.html)が必要となります。

### Flash Player/Adobe AIRにおけるビデオの扱いについて

昔のFlash Player/Adobe AIRにおいて、ビデオは`Video`オブジェクトで制御していました。従来の`Video`オブジェクトでは再生・表示処理はCPUの役割のためCPU使用率が高くなります。そのため、ビデオに対し高フレームレートでリアルタイムに画像処理をするのは現実的ではありませんでした。

2011年リリースのFlash Player 10.2でハードウェアアクセラレーションが有効な`StageVideo`機能が追加されましたが、**ビデオのフレームごとの表示データにアクセスすることができない**ため、複雑な画像処理を行うことができません。また、`StageVideo`レイヤーに対して`Stage3D`レイヤーは透過することができず、**`StageVideo`を表示させたい時は上のレイヤーにある`Stage3D`を非表示にするほかありません**でした。

2015年リリースのAdobe AIR 17で追加された`VideoTexture`クラスは**上記2種類のビデオ再生機能の弱点を克服したビデオ再生方法**といえるでしょう。

### VideoTextureの使用方法

`VideoTexture`クラスは**ビデオファイルを再生するNetStreamオブジェクトと、パソコンのカメラ画像を再生するCameraオブジェクトの2種類の再生表示に対応**しています。今回のサンプルで使用したように`Camera`オブジェクトをテクスチャーとして扱うには、下記のように記述します。

```
// Context3Dインスタンスを通してVideoTextureインスタンスを作成します。
var videoTexture:VideoTexture = context3D.createVideoTexture();

// あらかじめ取得したCameraインスタンスをVideoTextureインスタンスにアタッチします。
videoTexture.attachCamera(camera);

// VideoTextureインスタンスがパソコンのカメラとリンクしてStage3DのTextureとして有効になるまで待つため、RENDER_STATEイベントハンドラを設定します。
videoTexture.addEventListener(VideoTextureEvent.RENDER_STATE, videoTexture_renderStateHandler);
```

※`NetStream`オブジェクトを再生する場合は、`attachCamera()`メソッドを`attachNetstream()`メソッドに読み替えてください。

`VideoTexture`オブジェクトに渡した`Camera`オブジェクトの再生準備が整うと、`RENDER_STATE`イベントが送出されます。以降はStage3Dの`Texture`オブジェクトと同様に扱うことができるため、通常のレンダリング手順にしたがってテクスチャーをポリゴンに貼り付けるなどして使用します。

### 画像処理の方法

今回のサンプルでは、カメラ動画を再生するVideoTextureに対して簡単な画像処理を行いました。例として、モノクロ化（白黒化）処理を説明します。実際にビデオ表示の各ピクセルに対して画像処理を行っている処理（フラグメントシェーダー）だけ表示すると、下記のようなコードになります。  
※コードは「AGAL（エーギャル）」というFlash Stage3Dのシェーダー言語で記述してます。

```
// [AGAL]
// 変数ft0にバーテックスシェーダーから送られてきたUV座標情報をコピーします。
mov ft0 v0;

// UV座標を格納したft0に応じてVideoTextureを貼り付けます。
tex ft0, ft0, fs0<2d,clamp,linear>;

// 貼り付けたVideoTextureのR(赤)カラー成分とG(緑)カラー成分を加算した値を変数ft1.xに代入します。
add ft1.x, ft0.x, ft0.y;

// 上記の値にB(青)カラー成分を加算します。
add ft1.x, ft1.x, ft0.z;

// 上記2行で計算したRGB合計値を平均するためfc0.xとして予めGPUに送信しておいた値「3」で除算します。
div ft1.x, ft1.x, fc0.x;

// 変数ft0に上記で計算したRGBカラーの平均値(モノクロカラー)を代入します。
mov ft0.xyz, ft1.x;

// 変数ft0に格納されている画像処理済みカラーをディスプレイに出力します。
mov oc, ft0;
```

処理の内容は`VideoTexture`オブジェクトの各ピクセルに対してRGBカラーの平均値を出力するだけですが、見てわかるとおり非常に煩雑なコードになっています。Stage3Dでシェーダー言語として使われているAGALはアセンブリ言語なので、プロセッサに実際に行わせる処理1命令につき1行のコードを記述しなくてはなりません。これらのコードは**GPUで並列に処理されるためCPUでの処理に比べ非常に高速**で、うまく使うことができれば**CPUでは負荷のために断念せざるを得なかった表現も可能になる**でしょう。

### Adobe AIR以外のVideoTextureについて

VideoTexture機能は、残念ながら現在のところ利用できるのはAdobe AIRのみで、Flash Playerには対応していません。[Adobe Labs](http://labs.adobe.com/downloads/flashplayer.html)にあるβ版のFlash Playerでは以前から対応されてますが、執筆時点では正式リリースには至っていません。2016年4月に発表されたFlash Runtimeのロードマップ（[About Flash Runtime 2016](https://discuss.as3lang.org/t/about-flash-runtime-2016/239/1))ではUpcoming Priorities（次期機能）として挙げられているので、近々対応するかもしれません。

またFlash Playerと同じく、webでGPUを使用した技術であるWebGLにもActionScript 3.0の`VideoTexture`クラスと同じ機能があり、HTML5の`video`要素をテクスチャーとして使用できます。WebGLの人気ライブラリの1つ「[Three.js](https://threejs.org/)」でも対応している機能なので、Webで使用したい場合にはWebGLを検討してみるのもいいかもしれません。

### 最後に

今回ご紹介した`VideoTexture`は**Stage3Dで従来表現できなかった（あるいは処理速度等の面で妥協していた）動画表現が可能になり、さらに表現の幅を広げることができる機能**です。自分でシェーダーの処理を行おうと思うとそれなりに大変ですが、[Starling](http://gamua.com/starling/)や[Away3D](http://away3d.com/)といった**Stage3DフレームワークでVideoTextureが対応されれば手軽に恩恵を得ることもできるようになる**かと思います。今後の各フレームワークの動きにも期待しましょう。