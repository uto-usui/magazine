---
title: "Android端末をFlashゲームのコントローラーに！ Adobe AIR 14の新機能AIRGamepad機能を使ってみよう"
source: "https://ics.media/entry/3947/"
publishedDate: "2014-12-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

2014年6月にAdobeからAIR 14がリリースされましたが、新機能のひとつにAIRの拡張機能としてAIRGamepad APIが提供され、**同一ネットワーク内でAIRランタイムを起動しているAndroidデバイスとデスクトップのFlash Playerをペアリングして相互に通信することが手軽にできる**ようになりました。また、2014年9月にリリースされた**Adobe AIR 15ではさらにいくつかの機能が追加され、ますます充実した**ものとなりました。試してみると驚くほど簡単にAndroidデバイスの入力をFlashに送信することができたのでご紹介いたします。まずは下記のデモをご覧ください。

[![](https://ics.media/entry/3947/images/141208_gamepaduse_demo_thumb.png)](https://ics-creative.github.io/data-demos/141208_gamepaduse_demo/gamepadUse.html)

-   [別ウィンドウでデモを再生する (要Flash Player 11.3以上 / Adobe AIR 15ランタイムがインストールされたAndroid端末)](https://ics-creative.github.io/data-demos/141208_gamepaduse_demo/gamepadUse.html)

[AIRランタイム(バージョン15.0以上)](https://play.google.com/store/apps/details?id=com.adobe.air&hl=ja)がインストールされたAndroidデバイスをPCと同じネットワークに繋ぎ、AIRランタイムアプリを起動してデバイスをシェイクさせるとPINコードが表示されます。そのPINコードをデモの画面に入力するとデバイスとのペアリングが完了し、入力を受け付けるようになります。

-   デバイスを傾ける : キャラクター移動
-   デバイスのスクリーンをタッチする : カメラ移動
-   デバイスを上に振る : ジャンプ

Androidをお持ちでない方はこちらのビデオで雰囲気を掴んでいただければと思います。

### AIRGamepad APIの仕組み

[![](https://ics.media/entry/3947/images/141208_gamepaduse_runtime.png)](https://ics.media/entry/3947/images/141208_gamepaduse_runtime.png)

▲Adobeから提供されているAIRランタイムアプリを使用してFlash Playerとペアリングします。  
開発者はAIRGamepad APIを使用してデスクトップブラウザ用のswfを作成します。デバイス側で必要なAIRランタイムアプリはAdobeからGoogle Playを通して提供されているので、開発者がモバイル用にアプリを作成、公開する必要はありません。ユーザーがAIRランタイムアプリを起動して画面に表示されるPINコードをデスクトップブラウザのFlash Playerに入力するとペアリングが完了し、Flash Playerからデバイスを操作したり、デバイスの入力を受け取ることができるようになります。

### 使用方法

AIRGamepad APIはAIRの追加ライブラリとして提供されているため、AIR SDKのデフォルト状態では使用することができません。Adobe AIR 14ではWand.swcという名前のライブラリファイルとしてSDKとは別で提供されていたのですが、Adobe AIR 15ではgamepad.swcという名前に変わり、SDKに同梱される形になりました。下記からAIR SDK(バージョン15)をダウンロードして、frameworks/libs/airフォルダーにあるgamepad.swcファイルをプロジェクトのライブラリフォルダーに追加します。

-   [Download Adobe AIR SDK](http://www.adobe.com/devnet/air/air-sdk-download.html)

swfとデバイスを接続するには、gamepad.swcを使用できる状態で下記のように記述します。

```
// AIRGamepadクラスの静的メソッドgetGamePad()でAIRGamepadインスタンスを取得します。
gamepad = AIRGamepad.getGamepad("ゲームパッドID");

// AIRGamepadインスタンスにAIRGamepadEvent.CONNECTイベントハンドラを設定します。
gamepad.addEventListener(AIRGamepadEvent.CONNECT, gamePad_connectHandler);

// AIRGamepadインスタンスの接続待機を開始します。
gamepad.connect(stage, "アプリケーションのパブリッシャー名", "http/httpsの有効なアプリケーションURL");
```

connect()メソッドの第1引数で渡したStageインスタンスに下記のようなデバイスのペアリング待機画面が表示されます。ここにデバイスのPINコードを入力するだけでペアリングは完了し、AIRGamepadEvent.CONNECTイベントが送出されて以降デバイスの各種プロパティやメソッドにアクセスできるようになります。なお、この画面は提供されているAPIに含まれ、見た目をカスタマイズすることは現状できません。

[![たった3行のコードでPINコードの入力待機画面が表示されます。](https://ics.media/entry/3947/images/141208_gamepaduse_device_wait.png)](https://ics.media/entry/3947/images/141208_gamepaduse_device_wait.png)

▲たった3行のコードでPINコードの入力待機画面が表示されます。

### デバイスからの入力受け取り/デバイスの操作

ペアリングの完了後、AIRGamepadインスタンスを通じていくつかのプロパティ、メソッド、イベントにアクセスできるようになります。たとえば下記のコードは、デバイスのタッチのイベントを取得し、バイブレーションさせます。

```
// デバイスのタッチイベントを監視します。
gamepad.addEventListener(TouchEvent.TOUCH_BEGIN, gamepad_TouchBeginHandler);

private function gamepad_TouchBeginHandler(event:TouchEvent):void
{
	// デバイスがバイブレーションをサポートしている場合、0.5秒バイブレーションさせます。
	if (gamepad.hasVibrator)
	{
		gamepad.vibrate(500);
	}
}
```

AIRGamepad APIでデバイスからアクセスできるプロパティ、メソッド、イベントは下記のとおりです。

-   スクリーンの幅と高さの取得
-   バイブレーション制御（※1）
-   スクリーンのタッチイベント
-   加速度センサーイベント（※1）
-   ジャイロスコープイベント（※1）(※2）
-   磁力計イベント（※1）(※2）

※1 デバイスがサポートしている場合  
※2 Adobe AIR 15で追加となった機能

これらの機能についてさらに詳しく知りたい方は下記のAPIリファレンスを参照してください。

-   [AIRGamepad APIリファレンス](http://help.adobe.com/en_US/FlashPlatform/reference/gamepad/index.html?com/adobe/air/gaming/AIRGamepad.html&com/adobe/air/gaming/class-list.html)

### デバイス画面の表示

drawImage()メソッドでswf側からデバイスのスクリーンに画像表示をさせることができます。

```
// 表示させたいオブジェクトからBitmapData画像を作成します。
var bmd:BitmapData = new BitmapData(gamepad.width, gamepad.height, true, 0x0);
bmd.draw("表示させたいオブジェクト");

// BitmapDataをJPEGエンコードします。
var bytes:ByteArray = new ByteArray();
bmd.encode(bmd.rect, new JPEGEncoderOptions(80), bytes);

// エンコードされたJPEG画像ByteArrayをデバイスのスクリーンに表示します。
gamepad.drawImage(data);
```

注意すべき点として、**このメソッドを通してスクリーンに表示させることができるのは、JPEG圧縮した画像のみ**です。手順としてswfでBitmapDataに表示させたいオブジェクトを転写（draw）してJPEGエンコードをしてデバイスに画像を送信する必要があり、swf-デバイス間のデータの送信にもラグがあるため、**毎フレーム画像更新をしたりアニメーションを表示させることはできない**と考えてよいでしょう。たとえば、**デバイスのスクリーンをUIとしてタッチ等の操作に反応させて視覚的な効果を表現することも現実的ではありません。**上記のデモ（ビデオ）でタッチされた座標にカメラ操作用のUIを配置させているのですが、表示までにかなりのタイムラグがあることがわかると思います。スクリーンには基本的には説明などの静止画像を配置し、タッチさせるようなUIは最小限に抑えたり、スクリーン側でタッチ時の反応を表示することはあきらめることになるでしょう。

### 最後に

本当に驚くほど簡単にデスクトップのFlash PlayerとAndroidデバイスを繋ぐことができたかと思います。Androidデバイスのスクリーンへの画像表示時にタイムラグの制約があるとはいえ、**開発者側でモバイルアプリを作成することなくAndroidデバイスを入力装置として扱うことができ、最新のAIRランタイムさえインストールさていればユーザーに追加で専用のアプリケーションをインストールさせる必要がない**というのは大きな魅力だと思います。現状だとAndoridでしか動かすことができませんが、iOSでも「専用のコントローラー用アプリをインストールしておけばさまざまなswfから共通で利用ができる」などの対応が可能かと思うので、スクリーン表示機能の向上と併せてこれからのアップデートに期待しましょう。

追記（12月19日）：本記事公開時にAdobe AIR 15の新機能とお伝えしましたが、リリースノートによるとAIRGamepad APIは[Adobe AIR 14](http://helpx.adobe.com/jp/flash-player/release-note/fp_14_air_14_release_notes.html#new_features "Adober AIR 14 リリースノート")で搭載され、[Adobe AIR 15](http://helpx.adobe.com/jp/flash-player/release-note/fp_15_air_15_release_notes.html#new_features)で機能拡張されたことがわかったため、記事タイトルと本文を修正いたしました。