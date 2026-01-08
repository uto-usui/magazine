---
title: "Electronで画像加工アプリケーションを作ってみた"
source: "https://ics.media/entry/10254/"
publishedDate: "2015-12-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

Webの技術でクロスプラットフォームなデスクトップアプリケーションを開発できるフレームワーク「[Electron](http://electron.atom.io/)」。今回は**発展的な内容としてElectronを使用した画像加工アプリケーションの開発に挑戦をします**。

HTML5で画像加工というとみなさんはどのテクノロジーを思い浮かべるでしょうか？　Canvas、Flash、CSS・・・といくつか手法はあるものの、**今回はシェーダーでの高速な画像処理が実現できるWebGLを選定しました**。シェーダーによる画像の加工に関しては、記事「[WebGLでおさえておきたいシェーダーの定番画像処理8選](https://ics.media/entry/5535/)」で説明しています。本記事ではその時に作成したデモを利用し、**わずかなステップでElectronによるアプリケーション化を実現します**。

※ 本アプリケーションはElectron v0.35.2 / [Node.js v4.1.1](https://nodejs.org/) / [Three.js r70](https://threejs.org/) にて制作を行い、macOS 10.11 EL CapitanおよびWindows 10にて検証を行いました。

### 画像加工アプリケーションの使い方を録画した動画

今回開発した画像加工アプリケーションを実際に使用して動画として録画しましたのでご覧ください。ウインドウ内のチェックボックスや、メニューバーのリストからの画像フィルターの切り替えや保存処理が実装されていることを確認できます。  
また、本アプリケーションはダウンロードして手元でもご確認いただけます。

-   [アプリケーションのダウンロード - GitHub](https://github.com/ics-creative/151209_electron_postprocessing_app/releases/tag/release%2F0.1.0)

### 画像加工アプリケーションの画面構成

アプリケーションの画面には、ウィンドウ全体にWebGLで作成した画像表示領域が存在します。画像のフィルターをオン・オフするためのUIが2箇所存在し、1つはウィンドウ内にチェックマークを入れることで切り替えられるもの、もう一つはメニューバーの\[Filter\]メニューのサブメニューとしてフィルターを切り替えるものです。フィルターを掛けた画像の保存はシステムメニューの\[File\]→\[Save\]を選択して保存可能なほか、ショートカットキー（Windowsなら\[Ctrl\]+\[S\]、macOSなら\[Cmd\]+\[S\]）を入力することでシステムダイアログから保存先を選択して保存できます。

![画面イメージ](https://ics.media/entry/10254/images/151209_electron_filter_app_capture.jpg)

### 画像加工アプリケーションを作成した際のファイル構成

アプリケーションを作成した時のファイル構成は「[WebGLでおさえておきたいシェーダーの定番画像処理8選](https://ics.media/entry/5535/)」のデモとほぼ同じとなっています。本アプリケーションでは[TypeScript](http://www.typescriptlang.org/)を使用しているためビルド作業が必要になります。「src」以下に配置された「ts」フォルダー以下のTypeScriptファイルはビルド時に「build/js」フォルダーに配置され、それ以外のファイルは「build」フォルダーにコピーされて配置されます。

Electronアプリケーション化のために、「src/index.js」ファイルを追加しています。「src」フォルダーから「build」フォルダーへコピーされた「index.js」ファイルを「package.json」ファイルからElectronのエントリーポイントとして指定しています。

※ 具体的なビルド方法等については[README.md](https://github.com/ics-creative/151209_electron_postprocessing_app)を参照ください。

![ファイル構成画像](https://ics.media/entry/10254/images/151204_electron_photoshop_directory.png)

### WebGLで描画した画像をNode.jsのfsモジュールで保存する

![書き出しのイメージ](https://ics.media/entry/10254/images/151204_electron_photoshop_save_image.png)

今回の肝になっている画像の書き出し部分について紹介します。

#### Three.jsでバッファーを保存の指定を行う

WebGL上で描かれた画像を取得するには、バッファーに書き込まれた画像を取得する必要がありますが、デフォルトではバッファーの情報を取得することができません。今回WebGLを使用する際に[Three.js](https://threejs.org/)をライブラリとして使用していますので、Three.jsでWebGLRendererを生成する際に下記のオプションを付けてバッファーの内容を保存します。

```
renderer = new THREE.WebGLRenderer({
  preserveDrawingBuffer: true
});
```

※ 記事「[jThree.jsやThree.jsでcanvasの画面をキャプチャして画像にする方法 - めめんと！](http://mementoo.info/archives/1904)」を参考にさせていただきました。

#### バッファーから画像を取得する

次に、バッファーから実際に画像を取得します。canvasインスタンスの`toDataURL()`関数を使用することで、画像をBase64にエンコードされたテキストとして取得することできます。テキスト内に「`data:image/png;base64,`」というBase64のエンコード形式の文字列が付与されていますが、ファイルに書き出すときには不要になるため、置換して削除を行います。

```
// ウィンドウ内に存在するCanvas要素の1つめを選択する
var canvas = document.getElementsByTagName("canvas")[0];

// 「data:image/png;base64,」の文字列を置換して削除
var dataUrl = canvas
  .toDataURL()
  .replace(/^data:image\/png;base64,/, "");
```

#### `fs`モジュールを使用してBase64で保存する

画像ファイルの保存にはNode.jsの標準の`fs`モジュールの`writeFile()`関数を使用しています。第1引数には画像の保存先、第2引数にはBase64エンコーディングされた文字列、第3引数には`Base64`形式で保存するというパラメーターを文字列で指定します。第4引数には結果を受取る関数を指定します。第4引数に指定された関数ではエラーが発生した場合のみ関数の第1引数として`error`パラメーターを受け取ります。

```
var fs = require("fs"); // fsモジュールを使用する
fs.writeFile(filename, dataUrl, "base64", function(error) {
  if (error) {
    alert(error);
  }
});
```

### 終わりに

簡易なものですが画像加工アプリケーションを作成することができました。本記事がみなさんがElectronによるアプリケーションを作る際のとっかかりになれたら嬉しいです。アプリケーションのソースコードはGitHubで公開してありますので、興味を持った方はぜひご参照ください。

-   [ソースコード - GitHub](https://github.com/ics-creative/151209_electron_postprocessing_app)
-   [アプリケーションのダウンロード - GitHub](https://github.com/ics-creative/151209_electron_postprocessing_app/releases/tag/release%2F0.1.0)