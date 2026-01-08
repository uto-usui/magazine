---
title: "ゲームパッドでブラウザゲームが遊べる時代が来た！FlashのGameInput APIを使ってみよう"
source: "https://ics.media/entry/512/"
publishedDate: "2013-07-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

Flash Player 11.8とAIR 3.8の新機能のひとつに**デスクトップ端末でのゲームパッドの対応**があります。このGameInput APIについて早速デモを作成してみましたので試してみてくださいませ。

[![](https://ics.media/entry/512/images/130729_demo1.png)](https://ics-creative.github.io/data-demos/130729_gameinput_demo/gameInputChara.html)

-   [デモを再生する (要Flash Player 11.8 / ゲームパッド / Chrome PPAPI非推奨)](https://ics-creative.github.io/data-demos/130729_gameinput_demo/gameInputChara.html)

ゲームパッドを所持していない方はこちらのビデオで雰囲気を掴んでいただければと思います。  

ゲームパッドの2つのスティックでキャラクターの操作とカメラの操作ができます。  
キャラクターの操作方法として以下の2種類を実装してみました。

-   スティックを上に向ければキャラクターが向いている方向に進み、左右で旋回する操作方法（ラジコン操作）
-   スティックを傾けた方向にキャラクターが進む操作方法（アナログスティック操作）

また、スティックの傾きが小さければ歩くモーションになったり、なにかボタンを押したらジャンプをします。ただ3D空間を移動するだけなのですが、**ゲームパッドの操作が加わるだけでぐっとゲームっぽさが増したように思います。**

### GameInput APIの使用方法

GameInput APIの使用方法はシンプルです。次の図を御覧ください。

![](https://ics.media/entry/512/images/130729_gameinput.fw_.png)

GameInputクラスインスタンスがゲームパッドデバイスを一括で管理しています。デバイスそれぞれにGameInputDeviceクラスインスタンスが作成され、そのデバイスの入力の数だけGameInputControlクラスインスタンスが割り当てられます。このGameInputControlオブジェクト1つ1つにEvent.CHANGEイベントで入力を監視します。

GameInputControlオブジェクトは"AXIS\_0","BUTTON\_4"のようなidと、スティックならば`-1`～`1`、ボタンであれば`0`か`1`を返すプロパティを持ちますので、開発側はCHANGEイベントに応じて入力を行ったデバイス、ボタンを特定して値によって処理を行います。

#### 下記にデバイスの入力値をビジュアライズするデモを作成しました

[![](https://ics.media/entry/512/images/130729_demo2.png)](https://ics-creative.github.io/data-demos/130729_gameinput_demo/gameInputTest.html)

-   [デモを再生する (要Flash Player 11.8 / ゲームパッド](https://ics-creative.github.io/data-demos/130729_gameinput_demo/gameInputTest.html)[/ Chrome PPAPI非推奨](https://ics-creative.github.io/data-demos/130729_gameinput_demo/gameInputChara.html))

ゲームパッドを接続すると、コンボボックスが表示されるのでその中から好きなデバイスを選択すればそのゲームパッドの入力とGameInputControlのid（ボタン、スティック名）を確認できます。

また、ゲームパッドを複数台つないで同時に操作したり、フレームレートより短い周期の入力をByteArrayにキャッシュして参照できる機能もあります。入力がシビアなコンテンツを作成することも可能です。その他使用方法を詳しく知りたい方は最下部の参考記事を参照してください。

### キーコンフィグの設定

入力1つ1つに割り当てられるGameInputControlインスタンスですが、そのidは**ゲームパッドによってバラバラ**です。

今回テストとして使用したゲームパッドは3種類ありますが、それぞれ以下の様なidが割り当てられていました。軸が緑でボタンが赤です。（実際のidは"AXIS\_0","BUTTON\_4"など数字にAXIS\_かBUTTON\_をつけたものになります）

1.  XBOX 360 Controller For Windows（2010年製）  
    ![](https://ics.media/entry/512/images/130729_controller1.png)
2.  PlayStation2 DUALSHOCK 2（2000年製）+コンバーター（2003年製）  
    ![](https://ics.media/entry/512/images/130729_controller2.png)
3.  ゲームに付属していたゲームパッド（2000年製）  
    ![](https://ics.media/entry/512/images/130729_controller3.png)

さらには1と2,3のように**Y軸の入力だけ逆さま**のものあり、そのため最初のデモではY軸の入力を逆さに検出する設定を加えてあります。ユーザーに設定してもらうキーコンフィグ機能は必須といえるでしょう。

### その他の注意点

ところでおもしろいことに、**ブラウザの複数のタブ、ウィンドウで開いているすべてのFlashPlayerにGameInputのイベントは送出されてしまいます。**試しに前述のデモをブラウザで2つ開くと、ゲームパッドの操作で2つのFlashPlayerでキャラクターを動かすことができるかと思います。

chromeのデフォルトのFlashPlayer(PPAPI)ではゲームパッドを接続しても認識しないことがありました。どういった条件で起こるのかは検証中ですが、まだ対応は完璧ではないようです。

### まとめ

以前はゲームパッドの入力をキーボードにマッピングするネイティブのソフトウェアを使用して実現するしかなかったFlashコンテンツのゲームパッド対応ですが、今回の更新でぐっと**ブラウザFlashゲーム（もちろんAIRコンテンツも！）の幅が広がった**ことと思います。

また、FlashPlayerの自動アップデート機能のおかげで最新の機能を使ったコンテンツを公開しやすくなっているのも良い点ですね。

**HTML5にもGamePad APIはありますが、まだまだ使用できるブラウザは少ない**ようですので、ゲームパッド対応のブラウザゲームを出したいゲーム製作者にとってはFlashPlayerのゲームパッドのサポートは嬉しいところだと思います。

### 参考記事

-   [Adobe AIR の GameInput クラス](http://cuaoar.jp/2013/04/adobe-air-gameinput.html)
-   [Game controllers on Adobe AIR](http://www.adobe.com/devnet/air/articles/game-controllers-on-air.html)