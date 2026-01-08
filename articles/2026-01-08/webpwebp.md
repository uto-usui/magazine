---
title: "WebP画像を作成できるアプリ「WebP画像を作る君」を公開"
source: "https://ics.media/entry/11711/"
publishedDate: "2016-04-14"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2016年4月14日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

みなさんは次世代の画像形式「[WebP](https://developers.google.com/speed/webp/#how_webp_works_stylefont-weight_bold)(ウェッピー)」をご存知ですか？　聞いたことはあるものの、作り方や採用したときのメリット、事例にピンとこない方が多いのではないでしょうか。「せめて手軽にWebPを作れるツールが欲しい」と思い、デスクトップアプリケーション「[WebP画像を作る君](https://github.com/ics-creative/160203_electron_webp/releases)」(英語名は「WebP Converter」)を開発し公開しました。本記事では、このアプリケーションでの使い方から、ウェブページにWebP画像を配置する方法を解説します。

![](https://ics.media/entry/11711/images/160328_app.jpg)

▲ オリジナルアプリケーション「WebP画像を作る君」。無料で配布しています

▲「WebP画像を作る君」の動作ビデオ

### WebP(ウェッピー)とは

WebP画像形式は米Googleが開発している静止画フォーマットで、採用することでWebサイトの表示速度短縮やトラフィック量の節約が期待できます。具体的には従来のPNG/GIF/JPEG画像形式に比べて次の利点があります。

-   JPEGと比較してファイルサイズが**25-34％小さくなる**（非可逆圧縮モード）
-   PNGと比較してファイルサイズが**28％小さくなる**（可逆圧縮モード）
-   JPEGとは異なり、非可逆圧縮でもアルファチャンネルを扱える

以下は弊社の検証データですが、JPEGに比べてWebPはブロックノイズの発生が少なく、低サイズでも画質が担保されていることがわかります。WebPの40％はJPEGの80％と同等の画質に見えませんか？

![JPEG 80％とWebP 40％の比較](https://ics.media/entry/11711/images/160328_compare_webp_zoom.png)

▲JPEG 80％とWebP 40％の比較。同程度の画質で、WebPはJPEGの半分の容量となりました。とはいえ、JPEGは赤い光の軌跡部分の解像感が低く、空とビルの境界にブロックノイズが確認できます

[![](https://ics.media/entry/11711/images/160328_compare_webp_jpeg.jpg)](https://ics.media/entry/11711/images/160328_compare_webp_jpeg.jpg)

▲クリックすると等倍表示できます

### プログレッシブ・エンハンスメントとしてのWebP採用

利点の大きいWebPですが、**この画像形式に対応しているブラウザーは執筆時点ではGoogle ChromeとOperaのみ**です。ウェブ制作者としては同じソースコードですべてのブラウザーに対応させたいと考えるのは自然なことです。ブラウザ別に異なる画像ファイルを判別するのは制作や管理の手間が増えるため、採用に躊躇してしまうのではないでしょうか。

しかし、プログレッシブ・エンハンスメントの考えで、**優れたブラウザーには優れた体験を提供させることに意味があります**。記事「[マイナビニュース](http://news.mynavi.jp/news/2016/02/02/137/)」によればChromeのシェアは35％を超えていますが、WebPを採用すれば35%のエンドユーザーに対しては最適化されたデータを提供できます。ウェブサービスはページの読み込み時間が早ければコンバージョンが高くなると一般的に言われていますが、アクセス数の多いサイトであれば、一部のブラウザだけでも最適化の価値を見いだせるのではないでしょうか。

![](https://ics.media/entry/11711/images/160328_youtube.jpg)

▲ たとえば、YouTubeの動画のサムネイル画像はChromeでアクセスするとWebP画像が使われています。巨大なトラフィックを持つ、GoogleのWebサービス。一部のブラウザーに限られるとはいえ、「ちりも積もれば山となる」ものでサーバーのトラフィック量の観点からみても大きな効果があるはずです。

### WebP対応ツールは少ない

WebP画像を保存や変換できるソフトウェアはほとんどありません。公式サイトでも[変換ツールが提供されています](https://developers.google.com/speed/webp/download)が、それはコマンドラインのためのツールです。コマンドラインが苦手なHTMLコーダーは多いと思うので、WebP画像に変換できるGUIツールがあればウェブ制作の現場で役に立つのでは、と開発を思い立ちました。

### 「WebP画像を作る君」を使ってみよう

前置きが長くなりましたが、ここから「**WebP画像を作る君**」の使い方を紹介します。

#### ステップ1.「WebP画像を作る君」をダウンロードする

まずは、インストーラーをダウンロードしましょう。このアプリは[Electron](https://ics.media/entry/tutorial-electron/)で開発しているため、さまざまなOSにインストールできます。

-   [Windows版](https://github.com/ics-creative/160203_electron_webp/releases/download/0.1.0/WebP-Converter-win32-x64.zip)
-   [OS X版](https://github.com/ics-creative/160203_electron_webp/releases/download/0.1.0/WebP-Converter-darwin-x64.zip)

![WebP画像に変換する君のチュートリアル - 画像選択](https://ics.media/entry/11711/images/160328_app_step_01.jpg)

▲ \[テンプレート選択\]パネルからテンプレートを選択しましょう。

#### ステップ2. 変換したいファイルを選択しよう

「WebP画像を作る君」の読み込み対応形式はPNG/GIF/JPEG/WebPです。WebP画像へ変換することを目的として使用するので、劣化していない画像を使うのがベストです。可能な限りPNG24の利用をオススメします。

![WebP画像に変換する君のチュートリアル - 保存ファイル選択](https://ics.media/entry/11711/images/160328_app_step_02.jpg)

▲ドラッグ&ドロップでもファイルの読み込みが可能。\[変換する\]ボタンをクリックしましょう。

単独でファイル変換することも、複数ファイルを変換することも可能です。

#### ステップ3. 画質を調整しよう

各静止画ファイルのフォーマットの画質を調整できます。WebPでは、60〜80％に設定すると良いと思います。

![WebP画像に変換する君のチュートリアル - 画質決定選択](https://ics.media/entry/11711/images/160328_app_step_03.jpg)

保存すると`.webp`という拡張子のファイルとして保存されます。

#### ステップ4. ウェブサイトに組み込もう

変換したWebP画像をウェブサイトに組み込みましょう。`img`要素にWebPファイルを指定してもよいですが、そうするとChromeでしか画像を表示できません。対応ブラウザーにはWebP画像を表示させ、未対応ブラウザーにはフォールバック用画像を表示するには、`picture`要素を利用します。次のサンプルコードをご覧ください。

```
<picture>
  <source type="image/webp" srcset="sample.webp" />
  <img src="sample.png" width="640" height="360" alt="サンプル画像" />
</picture>
```

`picture`要素のなかに`img`要素を含めます。`alt`属性や`width`属性・`height`属性は`img`要素にのみ記述します。対応ブラウザーでは`source`要素に指定した画像が優先されます。`img`要素内の`src`属性が`srcset`属性の内容に差し替わるイメージです。

### 開発者向け情報

デスクトップアプリのソースコードはMITライセンスで公開しています。Angular 2とElectronを使った作例としてソースコードを参考くださいませ。

-   [全体のソースコードを確認する](https://github.com/ics-creative/160203_electron_webp)

フレームワーク[Angular 2](https://angular.io/)については、カンファレンス「[ng-japan](http://ngjapan.org/)」で発表した資料「[クリエイティブの視点から探るAngular 2の可能性](http://www.slideshare.net/clockmaker_jp/angular-2-59811274)」も参考になると思います。

[![](https://ics.media/entry/11711/images/160321_angular2-ng_japan.png)](http://www.slideshare.net/clockmaker_jp/angular-2-59811274)

このアプリを開発するにあたり、WebP画像変換機能はChromeブラウザーでのHTML5 Canvasの挙動を利用してます。詳しくは記事「[HTML5のcanvas要素をbase64文字列化し画像として保存する方法まとめ - Qiita](http://qiita.com/clockmaker/items/924b5b4228484e7a09f0)」で解説したとおりですが、JavaScriptで驚くほど簡単にWebP画像に変換できます。ただし、この機能を利用できるのはGoogle Chromeブラウザーだけでした。Electronは内部的にChromeのベースとなっている[Chromium（クロミウム）](https://www.chromium.org/Home)を利用しているので、ElectronにパッケージすることでOSを選ばず利用できるようになりました。

### 終わりに

WebP形式はウェブサイトの容量最適化に活用できます。対応ブラウザーが少ないのが気がかりですが、更新頻度の低い静的なファイルであれば、WebP画像を用意しておくのは効果的かもしれません。当サイトでも、フッターに配置している写真にWebPを利用しています。ぜひご活用くださいませ。

蛇足ですが、稚拙の「[不要な不可視ファイルを削除するAIRアプリ「カス削除くん」](http://clockmaker.jp/blog/2010/08/refusedeleter/)」もよければご利用ください。

![WebP画像に変換する君のチュートリアル - 画像選択](https://ics.media/entry/11711/images/160328_icsmedia.jpg)