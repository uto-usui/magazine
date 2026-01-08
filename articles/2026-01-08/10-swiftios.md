---
title: "10分で試せる！ SwiftではじめるiOSアプリ開発入門"
source: "https://ics.media/entry/6439/"
publishedDate: "2015-05-12"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

前回の記事「[WebエンジニアのためのSwift言語入門](https://ics.media/entry/5755/)」では、ActionScript 3.0やJavaScriptなどのウェブ開発技術と比較しながらSwiftすうぃふと言語を紹介しました。今回もウェブ開発技術と比較しながら、フレームワーク「UIKitゆーあいきっと」と開発環境「Xcodeえっくすこーど」を使ってiOSアプリ開発手順を紹介します。本記事ではXcode 7.2とSwift 2.1を用いて説明します。

### ウェブページ制作とiOSアプリ開発

ウェブページ制作では要素のレイアウトをHTML・CSSで行い、動的な振る舞いをJavaScriptで実装します。iOSアプリ開発においては、**ボタン要素や画像要素といったレイアウトを「Storyboard」で行い、動的な振る舞いをプログラミング言語「Swift」で実装できます。**Storyboardを使わずにSwift言語だけでアプリを作ることも可能ですが、Storyboardを使う方が直感的にUIを作成できるため最初のうちはオススメです。

![ウェブページ制作とiOSアプリ開発](https://ics.media/entry/6439/images/150512_web_ios.png)

### 開発環境の準備

開発環境であるXcodeを「[Mac App Store](https://itunes.apple.com/jp/app/xcode/id497799835)」からダウンロードします。Xcodeを起動したら\[Create a new Xcode project\]を選択します。

![Xcodeの起動画面](https://ics.media/entry/6439/images/150512_swift_xcode_cap.png)

アプリで使用するフレームワークを選択する画面になります。iOSアプリ開発のフレームワークである「UIKit」を使い、1画面のみのアプリを作りましょう。

■ 手順  
① 画面左側から「Application」を選択します。  
② 画面右側の一覧から「Single View Application」を選択します。  
③「Next」をクリックします。

![Xcodeのプロジェクト新規作成画面](https://ics.media/entry/6439/images/150512_swift_project_setting.png)

つづいて、プロジェクトの設定画面が表示されます。

■ 手順  
① 図の①の箇所は、テスト段階では任意の値で構いません。  
② \[Language\]を「Swift」、\[Devices\]を「iPhone」にします。  
③「Next」を押し、任意の場所にプロジェクトファイルを保存します。

![言語設定でSwiftを選びます](https://ics.media/entry/6439/images/150512_swift_project_setting2.png)

### Storyboardによる画面設計

プロジェクトの準備ができたので、画面を設計してきます。**iOSアプリのそれぞれの画面は、`ViewController`という単位で分かれています。**今回は1つの画面だけですが、複数の画面を設計する場合は画面の数に応じて`ViewController`が増えていくことになります。**それらの画面を設計するのがStorybordです。**実際の設計は`Main.storyboard`というファイルを使って行います。

■ 手順  
① `Main.storyboard`ファイルを選択すると中央のエリアにアプリの画面が表示されます。これが`ViewController`で、アプリの1画面になります。  
②③ 順にボタンを押します。  
④ \[Size\]の箇所で画面サイズを「iPhone 4.7-inch」（iPhone 6用の画面サイズ）に設定します。

![ストーリーボードの設定](https://ics.media/entry/6439/images/150512_swift_storyboard.png)

#### 要素の配置

画面の用意ができたので、要素を配置します。今回はボタンとテキストフィールドを配置します。

■ 手順  
① 右側のエリア（ユーティリティエリア）で図のボタンを押すと、**画像やテキスト、ボタン等の画面上に配置できるiOSの要素が表示されたビュー**（オブジェクトライブラリ）が現れます（※）。  
② ボタン要素の\[Button\]コンポーネントをドラッグします。  
③ 画面上にドロップします。  
※ ユーティリティエリアが表示されていない場合はツールバー右端のボタン、オブジェクトライブラリが表示されていない場合は\[View\]→\[Utilities\]→\[Show Object Library\]を選択すると表示されます。

![](https://ics.media/entry/6439/images/150512_swift_button_setting.png)

配置したボタン要素を選択すると、下図の赤枠部分からデザインを変更できます。

![](https://ics.media/entry/6439/images/150512_swift_button_setting2.png)

同様にしてテキストフィールドを配置します。

![](https://ics.media/entry/6439/images/150512_swift_textfield_setting.png)

以上で画面構成は完成です。

### Swiftによるプログラミング

ボタンとパーツが配置できたので、それらを操作するプログラムを記述します。今回は、ボタンをタップした時にテキストフィールド内のテキストが変わるという処理を実装します。これには以下の2つの処理が必要です。

1\. ボタンをタップした時の処理  
2\. テキストフィールドのテキストを変更する処理

#### プログラムを記述する場所

**`ViewController`上の要素は、Swift言語の`UIViewController`クラスを使って制御します**。Xcodeでプロジェクトを作成すると自動的にSwiftファイルが生成され、その中に`UIViewController`クラスが定義されています。今回の例では`ViewController.swift`というSwiftファイルが生成されているので、その中にプログラムを記述します。

#### 1\. 要素をタップした時の処理（IBAction）

まず、ボタンをタップした時の処理をプログラムに記述します。このようにアクションとプログラムを結びつける方法を`IBAction`といいます。

■ 手順  
① 画面上部のエリア（ツールバー）の図のボタンを押して、左側に`Main.storyboard`、右側に`ViewController.swift`ファイルを表示させます。  
② 図の部分を「Automatic」にします。  
③ ボタン上でControlキーを押しながら`ViewController.swift`まで線を引っ張ります。

![ボタンとSwiftの関連付け](https://ics.media/entry/6439/images/150512_swift_button_program_1.png)

④ \[Connection\]：接続方法。ここでは「Action」を選択します。  
⑤ \[Name\]：任意のメソッドの名前。「tapHandler」と入力します。  
⑥ \[Event\]：紐付けされるイベント名。「Touch Up Inside」を選択します。  
⑦ \[Connect\]を押します。

![ボタンとSwiftの関連付け その2](https://ics.media/entry/6439/images/150512_swift_button_program_2.png)

すると、下記のコードが追加されます。ボタンをタップした時、ここで定義した関数が実行されます。

![ボタンとSwiftの関連付け その3](https://ics.media/entry/6439/images/150512_swift_button_program_3.png)

#### 2\. テキストフィールドのテキストを変更する処理（IBOutlet）

次に、テキストフィールドのテキストを変更する処理を記述します。**要素とプログラムを結びつける方法を`IBOutlet`といいます**。JavaScriptで言えば`document.getElementById()`メソッドで操作対象のHTML要素を取得するようなものです。

■ 手順  
① 配置したテキストフィールド上で**Controlキーを押しながら**ViewController.swiftまで線を引っ張ります

![テキストフィールドとSwiftの関連付け](https://ics.media/entry/6439/images/150512_swift_text_program_1.png)

② \[Connection\]：接続方法。ここでは「Outlet」を選択します。  
③ \[Name\]：要素に設定する任意の名前。「myTextField」と入力します。  
④ \[Type\]：要素の種類。「UITextField」を選択します。  
⑤ \[Connect\]を押します。

![テキストフィールドとSwiftの関連付け その2](https://ics.media/entry/6439/images/150512_swift_text_program_2.png)

`ViewController.swift`ファイルを見ると、次のコードが記述されていることがわかります。③で設定した\[Name\]欄の`myTextField`を変数名として、Swiftで要素が扱えるようになっている状態です。

![テキストフィールドとSwiftの関連付け その3](https://ics.media/entry/6439/images/150512_swift_text_program_3.png)

最後に、ボタンをタップした時に`IBAction`の設定と`IBOutlet`の設定を組み合わせ、ボタンを押した時にテキストフィールド内のテキストが変わるようにします。

```
@IBAction func tapHandler(sender: AnyObject) {
  myTextField.text = "変更しました！";
}
```

今回は`IBAcion`を使いましたが、`addTarget()`メソッドを使用するとIBActionを使わずにアクションを設定できます。JavaScriptで言えば`addEventListener()`メソッドでイベント処理を行うようなものです。どちらを使うかは状況によりますが、`IBAction`を使うほうが直感的にアクションを関連付けられるので、最初のうちはこちらを使うことをオススメします。

### アプリの実行

ここまで作ったものを動作確認しましょう。Xcodeで開発したアプリは、**実機のiOS端末または「iOSシミュレーター」で動作を確認できます**。iPhoneを接続すると実機デバッグも可能ですが、[Apple Developer Program](https://developer.apple.com/jp/programs/ "Apple Developer Program")への登録が必要です。詳しくは記事「[\[iOS\]Xcodeで実機デバッグするための5STEP - デジタルクリエイティブのスーパーソフトウエア東京](http://tokyo.supersoftware.co.jp/code/2001)」を参照するといいでしょう。今回はiOSシミュレータを使ってiPhone 6での動作を確認します。

■ 手順  
① 画面上部のメニューバーより「iPhone 6s」を選択します（※）。  
② ビルドボタンを押すと、iOSシミュレーターが起動します。  
※ このボタンが表示されない場合はXcodeのウインドウサイズを広げてみてください。

![iOSシミュレータの起動](https://ics.media/entry/6439/images/150512_xcode_simulator.png)

実際に作成したアプリを実行すると、次の図板の動作になります。

![iOSシミュレーターでの動作](https://ics.media/entry/6439/images/150512_swift_app_movie.gif)

### 最後に

**自分の持っているウェブ制作の知識と絡めながら学んでいくと、iOSアプリ開発への抵抗も少なくなっていくでしょう**。 Xcodeの操作方法とUIKitの基礎知識があると、Appleの新しいデバイス「[Apple Watch](https://www.apple.com/jp/watch/)」に対応したアプリ開発も可能になります。続編記事「[WatchKitで作るApple Watchアプリのアニメーション制作入門](https://ics.media/entry/6806/)」はその制作方法を紹介します。