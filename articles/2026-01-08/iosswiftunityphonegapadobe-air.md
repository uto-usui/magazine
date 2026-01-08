---
title: "iOSにおけるSwift/Unity/PhoneGap/Adobe AIRのパフォーマンス比較検証"
source: "https://ics.media/entry/6137/"
publishedDate: "2015-04-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

スマホのアプリ開発を検討する際に、ネイティブ言語と中間プラットフォームのどちらを選択するべきか迷う方は多いのではないでしょうか？　ネイティブ言語である[Objective-C](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html "Objective-C")/[Swift](https://www.apple.com/jp/swift/ "Swift")やJavaを選択するほうがパフォーマンスが高いと言われていますが、それで開発すると固有のOSだけにしかデプロイできません。中間プラットフォームである[Adobe AIR](http://www.adobe.com/jp/products/air.html "Adobe AIR")や[Unity](http://japan.unity3d.com/)を使うとiOSとAndroidの両方にアプリをデプロイできますが、見返りにネイティブと比べてパフォーマンスが低下すると言われています。

本記事ではスマホアプリ開発の技術選定の参考になることを目指し、異なる4種類の技術を使ってiOSでの描画パフォーマンスを検証しました。

### 今回使用したテクノロジー・フレームワーク

-   [Swift 1.2](https://www.apple.com/jp/swift/ "Swift") ([Sprite Kit 1.6](https://developer.apple.com/library/ios/documentation/SpriteKit/Reference/SpriteKitFramework_Ref/))
-   [Unity 5.0](http://japan.unity3d.com/)
-   [PhoneGap 4.2.0](http://phonegap.com/ "PhoneGap") (WebGL と [pixi.js v2.2.9](https://pixijs.com/))
-   [Adobe AIR SDK 17](http://www.adobe.com/jp/products/air.html "Adobe AIR") (Stage3D と [Starling 1.6](http://gamua.com/starling/))

#### 検証動画

※動画はiPhone 6 Plusで検証したものとなります。他の端末で検証した結果は下記に記述しています。

### iOS端末における描画パフォーマンスの検証結果

検証結果は次のグラフにまとめました。スコアが大きいほどパフォーマンスが高いことを示しています。 ![20150421_bunny_performance_グラフ](https://ics.media/entry/6137/images/7b04e5fff4cfb9a162b3fba279200bf51.png)

### 検証環境の仕様

#### 検証デモ

今回の検証は記事[「ブラウザのCanvas/CSS3描画パフォーマンス徹底検証」](http://ics.media/entry/306/)でも使用した[BunnyMark](http://blog.iainlobb.com/2010/11/display-list-vs-blitting-results.html)で検証しています。Bunnyの表示は「移動スピード・方向」「回転」「拡縮」「透明度」をランダムで適用し、毎フレーム移動をさせています。時間経過とともにオブジェクト数を増やし、直前3回のフレームレートの平均が30fpsを下回った段階での表示されているオブジェクトの個数をスコアにしています。

![](https://ics.media/entry/6137/images/20150420_demo_image.png)

上記のデモは「PhoneGap」用の検証デモを、ウェブページとして掲載したものです。4種類のテクノロジーそれぞれで同一の動作する検証デモを用意しました。

#### 表示オブジェクトの生成コードの紹介

-   Swift (Sprite Kit)

```
let sprite = SKSpriteNode(imageNamed:"bunny.png")
```

-   Unity

```
/** bunnySpriteはSpriteRendererとスピードを保持できるスクリプトを持ったPrefab */
Transform transform = Instantiate(bunnySprite) as Transform;
```

-   Adobe AIR (Stage3D と Starling)

```
var image: Image = new Image(
  Texture.fromBitmapData(bitmapData)
);
```

-   PhoneGap (WebGL と pixi.js)

```
var sprite = new PIXI.Sprite(texture);
```

### 検証の結果

-   ほとんどの端末で Swift ＞ Adobe AIR ＞ PhoneGap ＞ Unity の順でパフォーマンスが高い傾向が確認できた （Swift が一番スコアが良い）
-   「Swift」で作成したアプリは他の方法で作成したアプリより108%〜190%ほど良いパフォーマンスがでている。
-   「iPad 2 Air」上での「Swift」は突出してパフォーマンスが良い。
-   中間言語を使うものとしては「Adobe AIR」がもっともパフォーマンスが良好だった。
-   「iPhone 5」上ではどのテクノロジーも「iPhone 6」の半分ほどしかパフォーマンスが出ない。
-   「Unity」は比較的パフォーマンスが優れない傾向があった。
-   Adobe AIR (Stage3D)とPhoneGap(WebGL)は低レベルではともにOpenGL ES 2.0を使っているが、スコアに差があるのは言語の違いかもしれない。前者はActionScript 3.0がアプリ生成時にコンパイルされるものの、後者はJavaScriptがWebView内で実行されている形である。

### まとめ

冒頭の説明の通りiOSのネイティブ開発言語であるSwiftがもっとも良好な結果でしたが、中間言語を使った場合はSwiftよりも52〜92％ほどのパフォーマンスとなりました。iOS/Androidの両方にデプロイできる（工数を削減できる）見返りが52〜92％のパフォーマンス低下だと考えると、中間プラットフォームを採用するメリットは十分あるかと思いました。一画面に同時に2000以上の表示オブジェクトを表示可能ということなので、多くの2Dアプリ開発に必要十分なパフォーマンスをクリアしているのではないでしょうか。

アプリ開発はパフォーマンス以外の観点もありますので、選定基準の1つとして参考にして頂ければ幸いです。Android (Java)やCocos2dなど他の中間プラットフォーム等、今回実施できなかった検証は本記事の評判がよければ実施したいと思います。

今回作成した検証コードはこちらです。

-   [ソースコードをダウンロードする](https://ics-creative.github.io/data-demos/150420_performance/20150421_ios_performance.zip)