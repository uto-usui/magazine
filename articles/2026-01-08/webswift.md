---
title: "WebエンジニアのためのSwift言語入門"
source: "https://ics.media/entry/5755/"
publishedDate: "2015-03-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Mac、iPhone・iPad、そしてApple Watch。これらのApple製品上で動くアプリはObjective-Cと[Swift](https://www.apple.com/jp/swift/)という言語で開発できます。Swiftは2014年に発表され、他のプログラミング言語の長所を多く取り入れたプログラミング言語です。**何かしらのプログラミングの経験がある開発者にはもちろん、これからプログラミングを始める人にも比較的学習しやすいものとなっています**。今回はiOSアプリにおけるパーティクル表現を通して、**ActionScript 3.0やJavaScriptのようなウェブ開発技術と比較しながらSwiftを始めてみましょう。**

### デモについて

Swiftで作られたパーティクルアニメーションをiPhone 6 Plus上で動かすデモです。画面上でフリックした場所にパーティクルが発生し、時間の経過とともに色が変わっていきます。

ソースコードはGitHubで公開してあります。（[サンプル：Swiftを使ったパーティクル演出デモ](https://github.com/ics-creative/SwiftParticle)）

### iOSアプリの開発技術について

Swiftを使うと**iOSの最新のAPIを使い、端末の処理能力を最大限引き出したiOSアプリを作ることができます。**一方、FlashやHTML5といったウェブ制作で使われている技術でもiOSアプリを作ることができます。Flashを使ったアプリ開発は[Adobe AIR](https://get.adobe.com/jp/air/)という技術、HTML5を使ったアプリ開発は[PhoneGap](http://phonegap.com/)や[Monaca](https://ja.monaca.io/)等のフレームワークで可能です。表を見るとわかるとおり**いずれの技術も一長一短があり、プロジェクト内容や開発リソースに応じて検討していく必要があります**(※)。

![](https://ics.media/entry/5755/images/cap3.png) ※ ウェブ制作の技術以外では[Cocos2d](http://jp.cocos2d-x.org/)や[Unity](http://japan.unity3d.com/)といった技術でiOS・Android両対応のアプリを作ることが可能です。

### Swift製アプリの開発環境で使うのはmacOSのXcode

Swiftの代表的な開発環境はmacOS上で動作する[Xcode](https://developer.apple.com/jp/xcode/)というソフトです。**XcodeはSwiftやObjective-Cのコーディング、UIを用いた画面作成、iOSシミュレーターと連携したデバッグなどができるIDE（開発統合環境）であり**、[Mac App Storeからダウンロードできます](https://itunes.apple.com/jp/app/xcode/id497799835)。一方でAdobe AIR(Flash)の開発ソフトは[Adobe Flash Professional CC](http://www.adobe.com/jp/products/flash.html)、[Adobe Flash Builder](http://www.adobe.com/jp/products/flash-builder.html)等、HTML5の開発環境は[Brackets](http://brackets.io/)、[WebStorm](https://www.jetbrains.com/webstorm/) 等があります。

![](https://ics.media/entry/5755/images/cap4.png)

### Swift製アプリを作るためのテンプレートが準備されている

Swift製のアプリを作るときは、目的に応じて必要となるファイル群（テンプレート）があらかじめ準備されています（※）。

#### UIKitはHTMLやCSSでウェブページを作るようなもの

「UIKit」というテンプレートは**iOSであらかじめ準備されたテキスト・ボタン・スライドなどのパーツを使って基本的なユーザーインターフェイスを作っていく**のに向いています。ちょうどHTMLやCSSで部品を配置しjQueryなどを使ってDOM操作をするウェブページを作るのと似ています。各パーツはXcode上で配置しSwiftコードを使ってイベント処理を設定できます。

#### SpriteKitはFlashでアニメーションをつくるようなもの

WebサイトにおけるDOM要素はページ遷移やプルダウンメニューなどのちょっとしたアニメーションには向いていますが、ゲームなどのリッチなアニメーションには向いていません。そのような表現を行いたい場合にはHTML5のCanvas要素やFlashを使います。iOSアプリにおけるUIKitもリッチなアニメーションは苦手です。そこでiOSアプリでは**2Dアニメーションのための「SpriteKit」、3Dアニメーションのための「SceneKit」**というテンプレートが準備されています。  
※ UIKitやSpriteKitなどの実態はクラス群であり、この中に各クラス（たとえば画像を表示させるクラス、アニメーションを設定するクラス等）がまとめられています。他にもApple Watch用のWatchKitや、SNS用のSocial Framework等があります。また、これらのクラスはObjective-Cでも使用可能です。

### コードを書く準備をしよう

言語の細かい仕様は後から覚えればいいので、まずは実際に画像を表示してSwiftによるアプリ作りを体験してみましょう。今回はSpriteKitのテンプレートを使います。Xcodeを起動して［Create a new Xcode project］を選択します。

![](https://ics.media/entry/5755/images/createNewPJ.png)

すると、テンプレートを選択する画面になるので左側のメニューから［iOS］→［Application］→［Game］を選択します。これがSpriteKitを使ったテンプレートです。選択が完了したら［Next］を押します。

![](https://ics.media/entry/5755/images/templateSelect.png)

するとプロジェクト設定の画面になります。テスト段階においては［Language］と［Game Technology］以外は任意の値で構いません（※）。［Language］を「Swift」、［Game Technology］を「SpriteKit」にして［Next］を押します。

![](https://ics.media/entry/5755/images/settingProject.png)

※ Project Name:プロジェクトの名前。 / Organization Name:組織の名前。アプリ申請の際に必要です。 / Organization Idenfifirer：組織の識別名。アプリ申請の際に必要です。

ファイルの保存場所を聞かれるので、任意の場所にプロジェクトファイルを保存します。プロジェクトが起動し、すでにいくつかのファイルが準備されていることがわかります。重要となるのは**GameScene.swift**で、中身を確認するとすでにサンプルのコードが記述されています。不要な箇所を削って以下のようなコードに書き換えておきます。これでプロジェクトの準備が完了です。

```
import SpriteKit

class GameScene: SKScene {
    /** 画面が表示された時に実行される */
    override func didMoveToView(view: SKView) {
    }

    /** フレーム毎に実行される */
    override func update(currentTime: CFTimeInterval) {
    }

    /** 画面をタッチしたときに実行される */
    override func touchesBegan(touches: NSSet, withEvent event: UIEvent) {
        for touch: AnyObject in touches {
            // タッチされた位置を取得
            let location = touch.locationInNode(self)
        }
    }
}
```

上記のようにコードについてのコメントを/\*\*（コメント内容）\*/という形で記述すると、コーディング中にエディター上でコードヒントが表示されるようになります。これはActionScript 3.0のASDocやJavaScriptのJSDocと同じ働きで見通しのよいコードを書くのに役立ちます。詳しい書き方は「[Swiftでヘッダドキュメント- tsntsumi’s NOOTO](http://d.hatena.ne.jp/tsntsumi/20140809/HeaderDocumentationInSwift)」をご覧ください。

### 簡単なコードでSwiftの文法に触れよう

#### 画像を表示するSKSpriteNode

SpriteKitで画像を表示するコードを通してSwiftの文法を見ていきたいと思います。あらかじめ［File］→［Add to Files（プロジェクト名）］から表示させたい画像をプロジェクトに読み込んでおきます。画面が表示されるとdidMoveToView()メソッドが最初に呼び出されるので、ここに画像の表示コードを記述します。記述後、［command］+［］を押すとiOSシミュレーターが起動し、画像が表示されるのを確認できます。

```
/** 画面が表示された時に実行される */
override func didMoveToView(view: SKView) {
 var sprite:SKSpriteNode = SKSpriteNode(imageNamed: "nezumi.png");  // ファイル名を指定して画像を作成
 sprite.position = CGPoint(x: self.size.width / 2, y: self.size.height / 2);  // 表示位置を画面中央に指定。
 addChild(sprite);  // 画像を表示
}
```

![](https://ics.media/entry/5755/images/49c47ddee9167c394d680d12fb9cfbce.png)

▲iOSシミュレーターに画像が表示される

SpritreKitにおいて画面上の表示物を取り扱うのはSKNodeというクラスです。ActionScript 3.0において表示物を管理するDisplayObjectというクラスがありますが、SKNodeクラスはこれに似ています。SKNodeクラスを拡張したのがSKSpriteNodeクラスで、画像を表示するために使われます。これはActionScript 3.0におけるBitmapクラス、JavaScriptにおけるImageクラスに似ています。 上記のコードの文法を見るとSwiftの特徴がいくつか見えてきます。型の指定の有無、変数・定数・関数の定義、クラスの定義とインスタンス化の簡単な違いを表にまとめてみました（※）。多くの場合、**ActionScript 3.0やJavaScriptと似た形で書けることがわかります**。

![](https://ics.media/entry/5755/images/cap61.png)

※ スマートフォン端末などで表が見辛い場合は、画像をタップすると拡大できます。Swiftのより詳しい文法については「[初心者のためのSwiftプログラミング入門](http://libro.tuyano.com/index2?id=10206003)」のサイトがわかりやすくてオススメです。

#### パーティクルを作ってみよう

パーティクルアニメーションはゲームではよく使う表現ですが、プログラムだけで書こうとすると難易度が高い上に実際の仕上がりをイメージしにくいです。**Xcodeを使うとSpriteKitのパーティクルをプログラムを使わずにUI上で作成することが可能**です（※）。メニューの［File］→［NEW］→［File］より、ファイルの作成画面を表示させます。［iOS］→［Resource］→［SpriteKit Particle File］を選択して［Next］を押します。［Particle Template］でパーティクルのテンプレートを選べるので、［Fire］を選択して［Next］を押して「MyParticle.sks」という名前で保存しましょう。するとパーティクルの編集画面が表示され、画面右側のメニューからパーティクルの数や速度・方向・画像など多くのパラメーターを編集できるようになります。

![](https://ics.media/entry/5755/images/particleEditor.png)

▲パーティクルの編集画面

さて、パーティクルの編集が完了したら「\*\*.sks」というファイルが作られます。Swift上でSKEmitterNodeというクラスでこのファイルを指定すると、パーティクルを画面に表示させることができます。これも先ほど紹介した表示物を扱うSKNodeクラスを拡張したもので、パーティクルの表示に特化したクラスとなっています。なお、**SKEmitterNodeクラスはパーティクルの1つ1つではなくパーティクルの発生装置を管理するクラスである**ことに注意してください。

```
/** 画面が表示された時に実行される */
override func didMoveToView(view: SKView) {
  // sksファイル名を指定してパーティクル発生装置を作成
  var particleEmitter:SKEmitterNode = SKEmitterNode(fileNamed: "myPartcile.sks");
  particleEmitter.position = CGPoint(0, 0);  // 発生装置の位置を指定
  particleEmitter.particlePosition = CGPoint(400, 400);  // パーティクルが発生する位置を指定
  addChild(particleEmitter);  // パーティクル発生装置を表示
}
```

#### 画面が更新される度に処理を実行してみよう

何かしらのアニメーションを行いたい場合、画面の更新の度に処理を実行する必要があります。SpriteKitにおいてはupdate()メソッドを使います。ActionScript 3.0でのEvent.ENTER\_FRAMEイベントに伴うイベント処理に似ています。たとえば、画面の更新毎に現在の時刻をデバッグエリアに出力するのは以下のコードです。

```
override func update(currentTime: CFTimeInterval) {
  // 現在時刻をデバッグエリアに出力。
  print(NSDate());
}
```

### 最後に

Swiftの文法やクラスの概念は、ActionScript 3.0やJavaScriptと共通する部分が多いため、言語の違いが大きいObjective-C等に比べると学習コストは低く抑えられます。Swiftのような**モダンな言語を勉強すると今まで使っていた言語との違いも見えてきて、改めてプログラミング言語全体の理解が深くなります**。macOSがあれば手軽に試せますので是非触ってみてください。