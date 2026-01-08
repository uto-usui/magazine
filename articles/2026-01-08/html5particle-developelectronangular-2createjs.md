---
title: "HTML5製アプリParticle Developの開発の裏側〜ElectronとAngular 2で開発効率が劇的に向上―CreateJS勉強会発表資料（後編）"
source: "https://ics.media/entry/10748/"
publishedDate: "2016-01-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

本記事は2016年1月26日（金）に開催されたCreateJS勉強会 （第7回） の発表資料「CreateJSで開発するクロスプラットフォームなアプリ開発〜ElectronとPhoneGapで広がる可能性〜」の後編となります。前編記事「[高まるHTML5製アプリの需要](https://ics.media/entry/10694/)」に続けて本記事ではHTML5製デザインツール「Particle Develop」の開発事例を紹介します。

### HTML5製デザインツール「Particle Develop」とは

今回、[Particle Develop](https://ics-creative.github.io/project-particle-develop/)という**美しいパーティクルを作れるHTML5製のデザインツールを作成しました**。雪や炎、キラキラなどのパーティクル表現を作成でき、ベクターグラフィックスとなっているので、保存したSVGファイルは[Adobe Illustrator](https://www.adobe.com/jp/products/illustrator.html)で配置したり、再編集できます。ベクターのパーティクルデザインツールということが、他のツールにないParticle Developの特徴です。

![](https://ics.media/entry/10748/images/160122_seminer_createjs_app_screenshot.png)

▲[Particle Develop](https://ics-creative.github.io/project-particle-develop/)のキャプチャー画像。左側にパーティクルのプレビュー画面、右側にパラメーター設定パネルがあります。

#### なぜParticle Developを作成したのか

パーティクルを作成するときに、Adobe Illustrator上でパーティクルの配置をするのは手間がかかり面倒で骨の折れる作業です。「**パーティクルをプログラムで生成することで、より表現の調整がしやすくなるのではないか？**」とデザイナーから提案されたのがもともとのアプリ作成の始まりになっています。

#### Particle Developの出力できる画像ファイル

Particle Developではパーティクルを画像ファイル（SVG・PNG・JPEG・WebP）として書き出すことができます。SVGファイルとして書き出すことでAdobe Illustratorに読み込むことが可能です。**Adobe Illustratorで開いたSVGファイルはパーティクルひとつずつがレイヤーで分かれているので、パーティクルごとに編集できます。ベクターグラフィックスですので拡大縮小を何度行っても画像が劣化しません**。

![](https://ics.media/entry/10748/images/160126_particle_develop_about.png)

### デスクトップアプリ・モバイルアプリへの展開

Particle Developはブラウザー版の他に、デスクトップアプリ版、モバイルアプリ版を開発中です。勉強会では開発中のアプリのプレビュー版を公開しました。

#### デスクトップアプリとして展開

デスクトップアプリ版ではブラウザー版の機能に加えて、調整したプロパティの保存や読み込みが可能です。

![デスクトップアプリの画面](https://ics.media/entry/10748/images/160126_seminer_createjs_capture_desktop_app.png)

▲デスクトップアプリの画面

#### モバイルアプリとして展開

モバイルアプリ版ではパーティクルのプレビュー、カメラ撮影による画像の合成、写真ライブラリーへの書き出しが可能です。

![モバイルアプリの画面](https://ics.media/entry/10748/images/160122_seminer_createjs_ios_app.jpg)

▲モバイルアプリの画面

### Particle Developの内容についてのまとめ

Particle Developの内容のまとめです。

-   美しいパーティクルの作成
-   パラメーターの調整
-   テンプレート選択機能
-   画像の書き出し
-   パラメーターの保存 / 読み込み（デスクトップアプリ版）
-   カメラ機能を使った画像合成（モバイルアプリ版）

### 使用した技術について

アプリの作成には、下記の図にある技術を使用しました。フレームワーク・ライブラリーとして、[CreateJS](http://www.createjs.com/)、[Bootstrap](http://getbootstrap.com/)、[Angular 2](https://angular.io/)を使用しています。アプリとしてパッケージングするためには、[Electron](http://electron.atom.io/)と[Apache Cordova](https://cordova.apache.org/)を使用しています。また、開発効率を上げるための開発言語として[TypeScript](http://www.typescriptlang.org/)と[Sass](https://sass-lang.com/)を使用しています。

![using technorogy](https://ics.media/entry/10748/images/160122_seminer_createjs_using_technorogy.png)

### 使用したライブラリー・フレームワーク

ライブラリーやフレームワークを組み合わせて使用すると、スピーディーな開発を行うことが可能です。今回は主に3つのライブラリー・フレームワークを使用しています。

![使用したフレームワーク](https://ics.media/entry/10748/images/160122_seminer_createjs_framework_library.png)

#### パーティクルプレビュー機能にCreateJSを利用

[CreateJS](http://www.createjs.com/)はHTML5 Canvas上でのグラフィカルな表現に最適なJSライブラリーです。主にパーティクルの表現にCreateJSを使用しています。

また、本アプリの特徴的な機能「**SVGファイルの書き出し**」ですが、CreateJSが内部でベクターグラフィックスの情報を管理しているため可能となっています。ただし、CreateJS本体のみではSVGファイルとして書き出すことができません。そのため、「[SVGExporter](https://github.com/CreateJS/EaselJS/tree/master/extras/SVGExporter)」というJSライブラリーを使用しています。SVGExporterはCreatelJSの公式のGitHubリポジトリ内で提供されています。

[![](https://ics.media/entry/10748/images/160122_seminer_createjs_svgexporter.png)](https://github.com/CreateJS/EaselJS/tree/master/extras/SVGExporter)

#### CSSのベースはBootstrapを利用

[Bootstrap](http://getbootstrap.com/)はウェブページ用の便利なコンポーネントが多数用意されているCSSフレームワークです。本アプリでは全体のデザイン設計に使用していますが、主にレスポンシブ対応や設定パネルに使用しています。

#### シングル・ページ・アプリケーション構築のためにAngular 2を利用

[Angular 2](https://angular.io/)はアプリケーションフレームワークです。本アプリでは全体を構成するフレームワークとして使用しています。Angular 2を使用するとHTMLの構造とデータをまとめてコンポーネントとして管理できます。そして、コンポーネントと関連付けたデータの変更を検知して別のコンポーネントへの値の反映が可能です。たとえば、設定パネルのスライダーを動かすと、プレビュー画面へパラメーターが反映されるところへ使用しています。

フレームワーク[Angular 2](https://angular.io/)については、カンファレンス「[ng-japan](http://ngjapan.org/)」で発表した資料「[クリエイティブの視点から探るAngular 2の可能性](http://www.slideshare.net/clockmaker_jp/angular-2-59811274)」を参照ください。Particle Developの開発で役だったAngular 2の仕組みを詳しく解説しています。

[![](https://ics.media/entry/10748/images/160321_angular2-ng_japan.png)](http://www.slideshare.net/clockmaker_jp/angular-2-59811274)

▲2016年3月に開催された Angular のカンファレンスでの発表資料（登壇者：ICS池田）

### HTMLコンテンツのパッケージング

HTML5の機能だけでは動的なファイルの保存やスマホでのカメラ機能が使用できません。そういったOS固有の機能を一般的にネイティブ機能と呼びます。今回はそれらブラウザー版では実現できないネイティブ機能の実装のために、デスクトップとモバイル向けにアプリケーション化を行いました。

#### デスクトップアプリへのパッケージングはElectronを採用

[Electron](http://electron.atom.io/)はデスクトップアプリを作成するためのフレームワークです。Electronを使うことで、Webの技術であるHTML5やJavaScriptで作ったコンテンツをデスクトップアプリにできます。具体的な内容については記事「[初めてのElectron！ HTML5でデスクトップアプリを作成しよう](https://ics.media/entry/7298/)」にて詳しく記載しています。

![Electronを使ってデスクトップアプリへパッケージングする](https://ics.media/entry/10748/images/160122_seminer_createjs_technorogy_electron.png)

Electronでネイティブ機能を使用するのは簡単です。下記のコードは保存用のダイアログを表示してファイルを保存をしています。ダイアログを表示するには必要なモジュールの取得と`dialog.showSaveDialog()`メソッドの呼び出しの3行、ファイルを保存するコードは`fs`モジュールの取得と、`fs.writeFile()`メソッドの呼び出しの2行のみとなっています。

```
let electron = require("electron"); // electronモジュールを使用する
let dialog = electron.remote.dialog; // disalogモジュールを取得する

// 保存用ダイアログを表示する
dialog.showSaveDialog();
```

```
let fs = require("fs"); // fsモジュールを使用する
fs.writeFile(); // ファイルを保存する
```

-   [アプリのソースコード](https://github.com/ics-creative/160122_createjs_app/blob/312fdc058baffa4137ab455363cd40593bbd6410/core/app/components/app-desktop.component.ts#L13-L42)

#### モバイルアプリのパッケージングはApache Cordovaで

[Apache Cordova](https://cordova.apache.org/)や[PhoneGap](http://phonegap.com/)もElectron同様Web技術を使用してアプリを作成するためのフレームワーク（※）ですが、どちらかと言えばモバイルアプリ向けに特化しています。詳細な導入手順、パッケージングの様子については別途記事で紹介するので、今回は概要だけ説明します。

※ PhoneGapはハイブリッドアプリ作成技術であるApache Cordovaを元に、Adobeが開発している技術です。ほぼ同じものと捉えていただいて差し支えありません。（参考「[ハイブリッドアプリ開発といえばこれ！PhoneGap/Cordova事始め | HTML5Experts.jp](https://html5experts.jp/fenomas/7672/)」）

![Cordovaを使ってモバイルアプリへパッケージングする](https://ics.media/entry/10748/images/160122_seminer_createjs_technorogy_cordova.png)

Apache Cordovaを使用できる環境を構築した後、WebコンテンツをiOSアプリ化する為のコマンドは下記です。

```
cordova run ios
```

また、Cordovaでネイティブの機能を使用する場合はプラグイン（[Cordova Plugins](https://cordova.apache.org/plugins/)）を経由します。たとえば、ネイティブのカメラの機能を使いたい時は、コマンドを使ってカメラを使うためのプラグイン「[cordova-plugin-camera](https://github.com/apache/cordova-plugin-camera)」をインストールします。

```
cordova plugin add https://github.com/apache/cordova-plugin-camera.git
```

続いて、Webコンテンツ側のJavaScriptにてカメラを操作するAPIを実行します。

```
// カメラを起動
navigator.camera.getPicture();
```

これだけで、Webコンテンツのアプリ化とネイティブ機能との連携が可能になります。

### Particle Developの開発を通して

Particle Developの開発を通して、前編記事「[高まるHTML5製アプリの需要](https://ics.media/entry/10694/)」で紹介したように、HTML5でのアプリ開発を取り巻く環境の好転を体感しました。canvas要素を使ったリッチなグラフィック表現、最近のライブラリーを駆使したスピーディな開発、少ない手順で可能なパッケージング技術は、より質の高いHTML5アプリ制作に役立つことでしょう。ぜひ皆さんもHTML5を使ったアプリ制作にチャレンジし、新たなコンテンツを発信してみませんか？

また、本アプリのソースコードは[GitHub](https://github.com/ics-creative/project-particle-develop)に公開しています。ぜひご覧くださいませ。