---
title: "WatchKitで作るApple Watchアプリのアニメーション制作入門"
source: "https://ics.media/entry/6806/"
publishedDate: "2015-06-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

**[Apple Watch](http://www.apple.com/jp/watch/ "Apple - Apple Watch")のアプリは、Swift(またはObjective-C)の開発フレームワーク「[WatchKit](https://developer.apple.com/watchkit/)」を用いて作成できます**。今回は、Apple Watchで動作するパーティクルアニメーションのデモを紹介しながら、WatchKitにおけるアニメーション作成方法を説明します。

### デモについて

Apple Watch上で動作するパーティクルアニメーションのデモです。最初は3色のパーティクルが順番に表示されますが、画面下部のスライダーで特定の色に固定できます。  

ソースコードはGitHubにて公開してあります。（[ソースコード](https://github.com/ics-creative/ParticleWatch)）

### Apple Watchにおけるアニメーション表示について

WatchKitにおいては、プログラム上から表示オブジェクトを追加する、オブジェクトの位置座標を指定する、オブジェクトを別のオブジェクトの上に重ねるといったことができません（※）。ではどうやってアニメーション表現をするのかというと、**連番の画像をパラパラ漫画のように切り替えて表示することで実現します**。WatchKitではこの連番アニメーションを取り扱いやすくするための仕組みが用意されています。  
※ 執筆時点 Xcode 6.3 / Swift 1.2

### パーティクルアニメーションの作成

では具体的なアニメーションの作り方を見ていきましょう。**表示オブジェクトの配置方法やSwiftとの連携方法については、基本的にはiPhoneアプリ開発と同じ**ですので、はじめての方は記事「[10分で試せる！ Swiftを使った初めてのiOSアプリ開発入門](https://ics.media/entry/6439/)」をご覧ください。iPhone用のプロジェクトをXcodeを作った後、\[File\]→\[New\]→\[Target\]を選択し、\[Apple Watch\]→\[WatchKit App\]を選択すると、プロジェクト内にWatchKit開発用のファイルが書き出されます。InterfaceController.swiftがメインとなるプログラム、interface.storyboardがストーリーボード（※）です。  
※ ストーリーボードは表示オブジェクトをXcodeでレイアウトするためのものです。

![](https://ics.media/entry/6806/images/xcode1.png)

#### アニメーション素材の作成

プロジェクトの準備ができたので、アニメーション素材を準備します。連番画像を作るためのツールはいくつかありますが、今回は[Adobe Flash Professional CC](http://www.adobe.com/jp/products/flash.html)の「ムービーの書き出し」機能を使用します。画像のサイズは縦390px横312px（※ 1）、フレームレートは60fpsにしました。**連番画像の数字は0から始める必要がある**ので、p-0.png、p-1.png…という名前にしておきます（※2）。  
※1 Apple Watchの画面サイズは縦340px横272px、縦390px横312pxの2種類です。今回は後者のサイズに合わせて作成しました。  
※2 Adobe Flash Professional CCで連番画像を書き出すと、数字は1から始まります。

![Adobe Flash Professional CCによるパーティクル作成](https://ics.media/entry/6806/images/flashCap1.png)

▲Adobe Flash Professional CCによるパーティクル作成

![作成した連番画像](https://ics.media/entry/6806/images/images.png)

▲作成した連番画像

作成した画像は、WatchKit Appフォルダー（WatchKit Extensionフォルダーではありません）内にあるImages.assetsを開き、ドラッグアンドドロップして登録しておきます。

#### アニメーションの表示

つづいて、作成したアニメーション素材を実際に画面上に配置します。 ■ 手順 ①「Group」をドラッグ ② 画面上にドロップ ③ プロパティの「BackGround」で画像の番号を抜いた名前（今回は「p-」）を指定。\[Animate\]を「Yes」、\[Duration\]でアニメーションの表示時間を設定し、\[Animate on Load\]にチェックを入れる。

![](https://ics.media/entry/6806/images/group.png)

#### デバッグビルド

設定後、ツールバーでWatchKit appを選択してデバッグビルドを実行すると、iPhoneとApple Watchの実機、またはiOSシミュレータを使ってアニメーションが確認できます。iPhone実機を使うと、**ペアリング済みのApple Watchにアプリが自動でインストールされます**。iOSシミュレータの場合は、\[Hardware\]→\[External Displays\]より、38mmまたは42mmのApple Watchを選択して確認できます。

![](https://ics.media/entry/6806/images/toolbar.png)

#### アニメーションの制御

Swiftではアニメーションの再生・停止はもちろんのこと再生範囲・再生速度・繰り返し回数を設定できます。**再生が始まれば何も制御できないgifアニメとは違い、ちょっとしたインタラクションを加える事が可能です**。たとえば、200コマ目から300コマ目の間を2秒かけてアニメーションさせるには、startAnimatingWithImagesInRange()メソッドを使って以下のような記述になります。デモにおいてはアニメーションの再生範囲を変更することでパーティクルの色を変化させています。

```
// 「layer」は「アニメーションの表示」で配置したオブジェクト
// （IBOutlet接続）
layer.startAnimatingWithImagesInRange(
     NSMakeRange(200, 100),
     duration: 2,
     repeatCount: 0);
```

### 最後に

Apple Watchにおけるアニメーションの実装は多くの制約があります。今後Apple Watchアプリの需要が徐々に高まってくる中で、今回のような工夫やノウハウが必要となりそうです。是非試してみてください。