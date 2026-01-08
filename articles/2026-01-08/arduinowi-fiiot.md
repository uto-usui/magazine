---
title: "Arduinoと数百円のWi-Fiモジュールで爆安IoTをはじめよう"
source: "https://ics.media/entry/10457/"
publishedDate: "2015-12-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

**初心者でも電子工作を簡単に始められるマイコンボード[Arduinoアルドゥイーノ](https://www.arduino.cc/)**ですが、ある程度センサーやアクチュエーターが触れるようになってくると、インターネットに繋いで外出先からコントロールしたいと考える方も多いでしょう。

以前の解説記事「[JavaScriptでArduinoをコントロール](https://ics.media/entry/4758/)」ではパソコンとArduinoをUSBで接続してインターネットに接続していましたが、有線接続だったため設置できる場所が限られてしまう制限がありました。本記事では2015年に発売された**数百円で購入できる爆安のWi-Fiモジュール[ESP-WROOM-02イーエスピー・ダブルルーム・ゼロツー](http://espressif.com/en/products/wroom/)を使って、お手頃にArduinoを無線化する方法を紹介します**。

### スマートフォンからLチカしよう

まずは次の動画をご覧ください。インターネットからArduinoに設置したLEDを光らすオリジナルのデモです。Wi-Fiモジュールを使って開発しました。

本記事を試していただくと上の動画のように**スマートフォン（ウェブブラウザ）からインターネット経由でArduinoに接続し、LEDをコントロールできるようになります**。Arduinoを触ったことのある初心者の方でも、回路を組むことから各プログラミングと**約1時間で試せる**内容となっていますので、ぜひお試しください！

### Wi-Fiモジュール界に現れた黒船「ESP-WROOM-02イーエスピー・ダブルルーム・ゼロツー」

![ESP-WROOM-02](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_01.jpg)

ESP-WROOM-02は[Espressif Systems社](http://espressif.com/)の開発したWi-Fiモジュールです。従来は[ESP8266](http://espressif.com/en/products/esp8266/)というモジュールが国外で販売されてましたが、[技適ぎてき](http://www.tele.soumu.go.jp/j/adm/monitoring/summary/qa/giteki_mark/index.htm)が未取得だったため電波法によって日本国内で使用できませんでした。その後、**技適ぎてきを取得**したことによって、スイッチサイエンスでも2015年7月6日からESP-WROOM-02という製品名で販売が開始されました。電子工作界で今話題のモジュールの1つです。

#### 人気の理由は「ダントツの安さ！」

ESP-WROOM-02イーエスピー・ダブルルーム・ゼロツーが**話題になっている理由は数百円で購入できるという価格**です。Arduinoで無線LANを利用する方法は3種類ありますが、ESP-WROOM-02を利用する構成がもっともコストを抑えられます。「ArduinoとWi-Fiモジュールの一体型」と比べて、半額以下の4,104円と驚きの価格です。

構成

パーツ

価格（税込）

合計（税込）

ArduinoとWi-Fiモジュールの一体型

[Arduino YÚN](https://www.switch-science.com/catalog/2210/)

9,990円

9,990円

ArduinoとWi-Fiシールド

[Arduino Uno R3](https://www.switch-science.com/catalog/789/)

3,240円

8,432円

[CC3000 WiFi シールド](https://www.switch-science.com/catalog/1694/)

5,192円

ArduinoとESP-WROOM-02イーエスピー・ダブルルーム・ゼロツー

[Arduino Uno R3](https://www.switch-science.com/catalog/789/)

3,240円

**4,104円**

[ESP-WROOM-02](https://www.switch-science.com/catalog/2346/)

864円

### インターネット経由でLチカさせる仕組みを解説

ここからはESP-WROOM-02イーエスピー・ダブルルーム・ゼロツーを用いた電子工作を解説します。次の構成でIoTな電子工作を目指しましょう。

![構成図](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_02.jpg)

スマートフォンのウェブブラウザでボタンをON/OFFすると、サーバーに設置されているPHPへ値を渡します。Arduinoからは定期的にPHPを監視し、接続されているLEDをチカチカと点滅させます。

### 回路を組もう

![回路全体の様子](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_03.jpg)

電子工作でよく用いるブレッドボードやジャンパー線はすでに手元にあることを前提に、下記のパーツで回路を組みます。ESP-WROOM-02イーエスピー・ダブルルーム・ゼロツーはブレッドボードで扱いやすいように変換されたものを使用します。

※ESP-WROOM-02が正常に起動しない場合は、Arduino UNO R3のリセットボタンを押しながらESP-WROOM-02の電源をリセット（5V、GND線を抜き差し）すると解消されることがあります。

#### ArduinoとESP-WROOM-02でWi-Fi接続する回路

![ArduinoとESP-WROOM-02でWi-Fi接続する回路の配線図](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_04.jpg)

-   [Arduino Uno R3](https://www.switch-science.com/catalog/789/)
-   [ESP-WROOM-02ピッチ変換済みモジュール](https://www.switch-science.com/catalog/2341/)
-   [8ビット双方向ロジックレベル変換モジュール](http://akizukidenshi.com/catalog/g/gM-04522/)
-   [低損失三端子レギュレーター 3.3V500mA](http://akizukidenshi.com/catalog/g/gI-00538/)
-   [超小型スイッチングACアダプター12V1A 100V～240V](http://akizukidenshi.com/catalog/g/gM-01804/)
-   [コンデンサー 0.1μF](http://akizukidenshi.com/catalog/g/gP-00090/)
-   [抵抗 10kΩ](http://akizukidenshi.com/catalog/g/gR-25103/)

Arduino Uno R3

![Arduino Uno R3](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_06.jpg)

ESP-WROOM-02ピッチ変換済みモジュール

![ESP-WROOM-02ピッチ変換済みモジュール](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_07.jpg)

8ビット双方向ロジックレベル変換モジュール

![8ビット双方向ロジックレベル変換モジュール](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_08.jpg)

低損失三端子レギュレーター 3.3V500mA

![低損失三端子レギュレーター 3.3V500mA](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_09.jpg)

超小型スイッチングACアダプター12V1A 100V～240V

![超小型スイッチングACアダプター12V1A 100V～240V](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_10.jpg)

コンデンサー 0.1μF

![コンデンサー 0.1μF](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_11.jpg)

抵抗 10kΩ

![抵抗 10kΩ](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_12.jpg)

#### LEDを点灯させる回路

![LEDを点灯させる回路の配線図](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_05.jpg)

-   [LED](http://akizukidenshi.com/catalog/g/gI-01170/)
-   [抵抗 330Ω](http://akizukidenshi.com/catalog/g/gR-25331/)

LED

![LED](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_13.jpg)

抵抗 330Ω

![抵抗 330Ω](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_14.jpg)

### ESP-WROOM-02イーエスピー・ダブルルーム・ゼロツーの初期設定

**ArduinoアルドゥイーノとESP-WROOM-02イーエスピー・ダブルルーム・ゼロツー間の通信は[シリアル通信](https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%AA%E3%82%A2%E3%83%AB%E9%80%9A%E4%BF%A1)で行います。**ESP-WROOM-02の転送レートは工場出荷時に`115200bps`で設定されているので、Arduinoに合わせて`9600bps`に設定します。

#### 1\. 設定用のプログラムをArduinoに書き込む

Arduino IDEのメニューで\[ファイル\]→\[スケッチの例\]→\[SoftwareSerial\]→\[SoftwareSerialExample\]をクリックしSoftwareSerial用のサンプルスケッチを開き、次のようにコードを編集してArduinoへ書き込みます。

30行目

```
SoftwareSerial mySerial(12, 11); // RX, TX
```

34行目

```
Serial.begin(115200);
```

43行目

```
mySerial.begin(115200);
```

#### 2\. ATコマンドで通信速度を設定

![シリアルモニター](https://ics.media/entry/10457/images/151217_arduino_ESP-WROOM-02_v1_15.jpg)

Arduino IDEのメニューから\[ツール\]→\[シリアルモニター\]をクリックするとシリアルモニターウィンドウが開きます。右下の改行コードを「CRおよびLF」へ、転送レートを「112500」へ変更します。多少文字化けが起こりますが設定には問題ありません。ESP-WROOM-02との通信が成功すると「Hello World?」と表示されるので、上部のテキスト入力部分に「AT」と入力し\[送信\]ボタンをクリックします。

この「AT」は[ATコマンド](http://www2.mind.co.jp/apricot/manual/hw/note/alb-alr2/_manualal/at/at_idx.htm)と呼ばれるもので、ESP-WROOM-02の情報の取得や設定を行うことができます。ATコマンドについては記事「[WiFiモジュール(ESP-WROOM-02) ATコマンド一覧 : e電子工房](http://einstlab.web.fc2.com/ESP/ESP.html)」にコマンドの一覧が有りますのでご覧ください。「OK」とESP-WROOM-02側から返答があれば下記のコマンドを入力し転送レートを`9600bps`へ設定します。

```
AT+UART_DEF=9600,8,1,0,0
```

#### 3\. Arduino IDEにライブラリをインストール

ESP-WROOM-02用のライブラリ「[ITEADLIB\_Arduino\_WeeESP8266](https://github.com/itead/ITEADLIB_Arduino_WeeESP8266)」をダウンロードします。Arduino IDEのメニューから\[スケッチ\]→\[Include Library\]→\[Add .ZIP Library\]をクリックし、ダウンロードしたライブラリをインストールします。

#### 4\. ライブラリを編集

ライブラリの初期状態ではSoftwareSerialが無効になっているので、ライブラリを編集し有効にします。`Documents/Arduino/libraries/ITEADLIB_Arduino_WeeESP8266-master/`フォルダー内に`ESP8266.h`ファイルがあるので、27行目のコメントアウトを外し下記のように変更します。

```
#define ESP8266_USE_SOFTWARE_SERIAL
```

### スマートフォンからLチカさせるプログラム

GitHubにサンプルコードをアップロードしていますので、詳しい内容についてはソースコード内のコメントを参照ください。

-   [ソースコード – GitHub](https://github.com/ics-creative/151217_arduino_ESP-WROOM-02_v1)
-   [サンプルファイル一式のダウンロード (ZIP形式) – GitHub](https://github.com/ics-creative/151217_arduino_ESP-WROOM-02_v1/archive/master.zip)

`html`フォルダー内にはサーバーへアップロードするファイルが格納されています。そのままサーバーへアップロードしていただいても動作します。「arduino」フォルダー内にはArduinoスケッチが格納されており、Wi-FiのSSIDやパスワード、サーバー情報などを適宜変更してArduinoへ書き込んでください。

ウェブブラウザのボタンをタップすることにより、ON/OFF情報がPHPへ送信されPHPと同階層の`ledLog.txt`に値が保持されます。その値をArduinoから一定間隔（サンプルでは200ミリ秒）ごとに取得し、ONならLEDを点灯させるという仕組みです。

### ESP-WROOM-02のすごいところがもう1つ！

なんと、**ESP-WROOM-02自体にArduino IDEでコンパイルしたプログラムを書き込むことでArduinoのように動作させることができるのです！** Arduino UNO R3のようにUSBポートやACコネクタなどが付いていないため、1から回路を組む必要はありますがArduinoよりもコンパクトにできるので、ぜひお試しください。

### 最後に

ACアタプターのケーブルは、**別途バッテリーを接続すると完全に持ち運べる状態にすることも可能です**。LEDの代わりにGPSモジュールを接続すると、某スパイ映画のようななんちゃって発信機も作ることができます。ぜひご活用ください。