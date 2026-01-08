---
title: "JSFL管理の決定版！ Animate CCの拡張機能「JSFL Tool」パネルを公開"
source: "https://ics.media/entry/2302/"
publishedDate: "2014-10-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

ICSではFlash開発を行う際、「JSFL」というFlash Professional上で実行できるスクリプトを活用して処理を自動化しています。しかし、プロジェクトごとに必要なJSFLだったり、チームで作業しているとJSFLの更新があった場合の周知などしなくてはいけなかったり、JSFLは管理が大変です。しかもJSFLファイルを配置するディレクトリはユーザーディレクトリの奥深く、気を抜くとどこだったのかわからなくなってしまいます・・・。

そこでJSFLの管理を簡単にするツールを、**CEPというAdobe Creative Cloudで共通に動作するHTML5とNode.jsの拡張フレームワーク**を使用して作成してみました。具体的な制作については主に「[CEPスーパー メガ ガイド： HTML5＋NODE.JSでADOBEのツールを拡張する](https://aphall.com/2014/08/cep-mega-guide/)」を参考にしています。

### 今回のツールづくりの目的

![解決イメージ](https://ics.media/entry/2302/images/ce28e66c9347c32a9b6f465739fa26a7.png)

-   どこにあるのかわからない
-   更新されない
-   共有されないこのツールを使用することで上記3点を解決します。

### ツールの使い方

(※ツールの必要環境：Flash Pro CC)

1.  [ZXPファイルのダウンロード](https://raw.githubusercontent.com/ics-nohara/JSFLTool/master/jsfl_tool.zxp)
2.  ダウンロードしたZXPファイルをダブルクリックしてインストールします。(要：[Adobe Extension Manager CC](https://creative.adobe.com/ja/products/extension-manager))
3.  Flash Proを開き、\[ウィンドウ\]→\[エクステンション\]→\[JSFLTool\] でツールを表示
4.  .flaファイルがすでに開いていれば、自動的に同階層のJSFLファイルのリストが表示されます。
5.  右上にあるボタンをクリックすると、メニューが表示されます。メニュー上の「Add local directory」から新しいディレクトを登録できます
6.  使用したいJSFLファイルをリストからクリックで選択します
7.  その状態で下部にある「▶」ボタンをクリック、エンターキーか、選択したJSFLファイルをダブルクリックするとJSFLが実行されます

※Adobe Animate CCはExtension Manager CCに対応していないため、利用することはできません。

### ツールの機能

**.flaファイルと同階層のJSFLを実行**

プロジェクト単位でJSFLを扱えるようにする為の機能です。.flaファイルはGitやSVNなどのバージョン管理システムを使用して保管していますが、同階層に配置し同じようにバージョン管理することで。flaファイルと同じバージョンのJSFLファイルを使用できます。 \_任意のディレクトリ内のJSFLを実行チーム全体で使用するディレクトリを登録することを想定しています。ICSではよく使用するJSFLファイルをDropboxで共有しています。このディレクトリを追加登録することで、\_\*JSFLが更新されたら即座に更新され、手間なく常に新しいJSFLファイルを使用可能になります\_\_。

### 制作にあたって

今回のツール作成ではJavaScriptを使用していますが、その開発にAltJSとして[Haxe言語](https://haxe.org/)を選択しました。**型安全に作成したかったこと**、**Haxeが普段使用しているActionScriopt3の記述に近いこと**がその理由です。ほぼはじめて使用しましたが、AS3と違いコールバック用などの関数（高階関数）に引数・戻り値の型を指定できたり、Enumでcaseが足りない時にエラーを出してくれるため、実装漏れなく作成できるなどの安心感がありました。

ちなみに、このフレームワークに限ったことではないのですが、JSでは非同期の処理が発生するたびコールバック関数を使用しますが、コールバック関数は1つ使用・2つ使用と増えていくごとにどんどんネストが増えていってしまいます。ネストが増えるとプログラムの再利用がしづらくなってしまうため、**jQueryのDeferred(Promise)を使用して非同期処理を処理しています**。Deferredを使用することでメソッドチェーンでつらつらと記述できるため、処理の流れが追いやすくなっています。

#### 高階関数に引数・戻り値の型を指定できる

project.JSFLTool.hx

```
// Dynamicを引数として、Voidが返り値の関数 
private function loadXMLCallback(selectIndex:Int) : Dynamic->Void 
{
    return function (result:Dynamic) : Void{ ... } 
}
```

#### Enumでcaseが足りない時にエラーを出してくれる

project.DirectoryType.hx

```
package project; enum DirectoryType { Local; Current; Empty; }
```

project.JSFLTool.hx

```
var str:String ="";
var folderName = folder.folderName;
var type = folder.type;
var pathUrl = folder.pathUrl;
switch(folder.type) {
	case DirectoryType.Local:
		str += '
<menu>
    <path>$pathUrl</path>
    <type>$type</type>
    <folderName>$folderName</folderName>
  </menu>

';
	case DirectoryType.Current:
	// Emptyのcaseコードが無い！
				
}
```

caseが足りないとビルドエラーを出してくれる（ JSFLTool.hxの263のswitchにEmptyの記述がないよ！　)

```
Building Haxe project... 
compile.hxml
src/haxe/project/JSFLTool.hx:263: characters 10-21 : Unmatched patterns: Empty
Fatal error: Error
```

#### Deferredを使用するとメソッドチェーンで非同期処理をつなげられる

```
saveToXml()
  .then(loadMenuXML)
  .then(loadXMLCallback(folderIndex))
  .then(closeMenu);
```

### おわりに

Adobe Creative Cloudのツール作成にCEPフレームワークを使用すると、ウェブ開発者に比較的馴染みの深いHTML5を使用できるようになっています。HTML5で作成できることによりjQueryやNode.js、その他ライブラリや今まで作ってきたコード資産が使えます。みなさんも作成してみてはいかがでしょうか？ [ソースコードを見る(GitHub:ics-nohara/JSFLTool)](https://github.com/ics-nohara/JSFLTool)

#### 参考

[CEPスーパー メガ ガイド： HTML5＋NODE.JSでADOBEのツールを拡張する](https://aphall.com/2014/08/cep-mega-guide/ "CEPスーパー メガ ガイド： HTML5＋NODE.JSでADOBEのツールを拡張する") [X-LABO Flash CC 13.1 カスタムパネルから jsfl 内の値を参照する](http://www.dango-itimi.com/blog/archives/2014/001205.html)

#### 使用ライブラリ・その他

-   [Adobe Extention Builder 3](https://www.adobe.com/jp/products/adobe-extension-builder.html)
-   [JQuery 1.9.1](https://jquery.com/) (現在公開されている2.xのjQueryだと普段使用しているmacOSのFlash Pro CCで動作しなかったため、少し下げています）
-   [Grunt v0.4.5](https://gruntjs.com/)
-   [Haxe 3.1.3](https://haxe.org/)
-   [jQueryExtern](https://github.com/andyli/jQueryExternForHaxe)
-   [Haxe CEP Extern](https://github.com/tmskst/haxe-cep)