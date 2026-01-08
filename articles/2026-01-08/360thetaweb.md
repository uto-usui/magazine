---
title: "お手軽360°パノラマ制作入門。THETAで撮影しWeb公開に挑戦しよう"
source: "https://ics.media/entry/14150/"
publishedDate: "2016-12-13"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

360°の全方向を自由に見渡せるコンテンツと言えばGoogleストリートビューが有名ですが、近年ではFacebookのタイムラインやYouTubeでも360°のパノラマ映像を見られるようになりました。不動産ポータルサイト「[SUUMO](http://suumo.jp/)」では、[スーモスコープ](http://scope.suumo.jp/lp/)というダンボール製のVRビューワーを情報誌に付属し、物件の中を自由な視点で見渡せるVRコンテンツを公開しています。最近話題になったWebサイトでパノラマ動画を使った事例がありました（[参照](https://ics.media/entry/13619/)）。これらを一例として、**Web業界では視点を自由に動かせる360°パノラマコンテンツが増えてきています。**

「パノラマを作るのは難しそう」「どうやって作るのか想像がつかない」と思われがちですが、実は数万円程度の機材を準備すれば簡単にパノラマは作れます。本記事では、オススメの360°カメラ「[RICOH THETA S](https://theta360.com/ja/about/theta/s.html)」の利点を紹介しつつ、パノラマ（静止画と動画の両方）をWebサービスで公開するお手軽な方法を解説します。

![theta360.comのデモ](https://ics.media/entry/14150/images/161208_panorama20.jpg)

▲theta.comへアップロードしたパノラマ画像

-   [デモを別ウィンドウで開く](https://ics-creative.github.io/161208_panorama/sample05/)

### 360°の撮影には「RICOH THETA S」がオススメ

[RICOH THETA S](https://theta360.com/ja/about/theta/s.html)は価格や持ち運びやすさ以外にも、スマートフォンと相性がいいことも特徴の1つです。スマートフォンに専用のアプリ（※）をインストールすると、スマートフォンからの遠隔撮影や、Webへの公開が可能になります。

※専用アプリ「RICOH THETA S」\[[App Store](https://itunes.apple.com/jp/app/id1023254741)\]\[[Google Play](https://play.google.com/store/apps/details?id=com.theta360)\]

![RICOH THETA S](https://ics.media/entry/14150/images/161208_panorama05.jpg)

▲RICOH THETA Sは前面と背面の2つのレンズでパノラマを撮影します

![RICOH THETA Sで撮影したパノラマ画像](https://ics.media/entry/14150/images/161208_panorama02.jpg)

▲RICOH THETA Sで撮影したパノラマ画像

### スマートフォンや一眼レフカメラで撮影する方法もある

RICOH THETA Sは安価で扱いやすい360°カメラですが、費用をかけずさらに手軽に撮影する方法や、もっと高解像の撮影が可能になる手段もあります。

#### スマートフォンで手軽に撮影する方法

手軽にパノラマを撮影したいという方にはスマートフォンアプリ「[Googleストリートビュー](https://www.google.co.jp/intl/ja/streetview/apps/)」がオススメです。  
アプリの指示する方向にカメラを向けて撮影すると、簡単にパノラマを撮影できます。複数の画像を重ね合わせて1つのパノラマ画像を生成することもできます。画像のつなぎ目が荒い場合がありますが、モックアップ用途として見れば充分な出来栄えです。

![Googleストリートビューのスマートフォンアプリで撮影したパノラマ](https://ics.media/entry/14150/images/161208_panorama04.jpg)

▲スマートフォンアプリ「Googleストリートビュー」で撮影したパノラマ

#### 一眼レフカメラで高画質に撮影する方法

クライアントワークなどで高画質なパノラマが求められる場合は、一眼レフカメラを使って撮影します。一眼レフカメラの他に魚眼レンズやパノラマ撮影用の雲台、パノラマ編集ソフトなどが必要となり、少々ハードルが高い撮影方法です。詳しい撮影方法については記事「[業務向けの高品質な360度パノラマ写真の作り方を紹介 | DRONEDIY](http://www.dronediy.jp/2016/01/panorama-camera-satuei.html)」を参照ください。

### パノラマを静止画として公開しよう

RICOH THETA Sで撮影したパノラマ画像を[theta360.com](https://theta360.com/)で公開する手順を解説します。theta360.comにはマウス操作でパノラマ画像をぐるぐると見渡せる360°パノラマビューワーが用意されています。その360°パノラマビューワーは、埋め込み用のHTMLタグが生成できるので、HTMLファイルにコピー&ペーストするだけでtheta360.com以外のページにも埋め込めます。

本記事ではパソコンでの公開方法を紹介します。スマートフォンの専用アプリ（※）からも公開できるので、詳しくはアプリ内の使用説明書をご覧ください。

※専用アプリ「RICOH THETA S」\[[App Store](https://itunes.apple.com/jp/app/id1023254741)\]\[[Google Play](https://play.google.com/store/apps/details?id=com.theta360)\]

![theta360.comのデモ](https://ics.media/entry/14150/images/161208_panorama20.jpg)

-   [デモを別ウィンドウで開く](https://ics-creative.github.io/161208_panorama/sample05/)

#### 1\. アプリのインストール

パソコンでRICOH THETA Sで撮影した素材を扱うにはアプリをインストールする必要があります。RICOH THETAの[ダウンロードページ](https://theta360.com/ja/support/download/)より\[パソコン用アプリケーション\] → \[基本アプリ\]からインストーラーをダウンロードし、パソコンにインストールします。インストーラーはWindowsとmacOSが用意されています

#### 2\. アプリにパノラマ画像を読み込む

RICOH THETAアプリを起動し、パノラマ画像をドラッグ&ドロップで読み込みます。読み込みに成功すると、ウィンドウ内にパノラマ画像が表示されます。ウィンドウ内をマウスドラッグすると視点を操作できます。

![アプリにパノラマ画像を読み込む様子](https://ics.media/entry/14150/images/161208_panorama06.jpg)

#### 3\. theta360.comへログイン

theta360.comへコンテンツをアップロードするためにはログインが必要です。メニューの\[theta360.com\] → \[ログイン\]をクリックし、手順沿ってログインします。

![theta360.comへログインする様子](https://ics.media/entry/14150/images/161208_panorama10.jpg)

#### 4\. theta360.comへアップロード

theta360.comへのログインに成功したら、メニューの\[theta360.com\] → \[投稿（SNS共有）\]をクリックします。クリックすると\[theta360.comへの投稿\]ウィンドウが開くので、必要事項を入力して「投稿」ボタンをクリックします。これでtheta360.comへパノラマ画像が公開されました。公開したパノラマ画像はtheta360.comで見られます。

![[theta360.comへの投稿]ウィンドウ](https://ics.media/entry/14150/images/161208_panorama08.jpg)

#### 5\. 埋め込みHTMLコードの取得

アップロードしたパノラマ画像のtheta360.comページで、埋め込み用のHTMLコードを生成できます。それをHTML内に記述すると、ページ内に360°パノラマビューワーを埋め込めます。theta360.comページ内にある「埋め込みコード」ボタンをクリックするとHTMLコードが生成されます。

![theta360.comのページ](https://ics.media/entry/14150/images/161208_panorama09.jpg)

HTMLコード内の`data-width`と`data-height`に`100%`を指定すると、HTMLコードを記述するDOM内全体にコンテンツを広げられます。

```
<blockquote data-width="100%" data-height="100%" class="ricoh-theta-spherical-image" >
  Post from RICOH THETA. - <a href="アップロードしたパノラマ画像のURL" target="_blank">Spherical Image - RICOH THETA</a>
</blockquote>
<script async src="https://theta360.com/widgets.js" charset="utf-8"></script>
```

### パノラマを動画として公開しよう

RICOH THETA Sで撮影したパノラマ動画を[YouTube](https://www.youtube.com/)で公開する手順を解説します。YouTubeにアップロードすると、パソコンではマウスドラッグ、スマートフォンではジャイロセンサー（方向・傾き）で自由に動画内の視点を切り替えられます。

本記事ではパソコンでの公開方法を紹介します。スマートフォンの専用アプリ（※）からも公開できるので、詳しくはアプリ内の使用説明書をご覧ください。

※専用アプリ「RICOH THETA S」\[[App Store](https://itunes.apple.com/jp/app/id1023254741)\]\[[Google Play](https://play.google.com/store/apps/details?id=com.theta360)\]

▲YouTubeへアップロードしたパノラマ動画

すでにアプリをインストール済みの方は「2. パノラマ動画を変換」へ進んでください。

#### 1\. アプリのインストール

パソコンでRICOH THETA Sで撮影した素材を扱うにはアプリをインストールする必要があります。RICOH THETAの[ダウンロードページ](https://theta360.com/ja/support/download/)より\[パソコン用アプリケーション\] → \[基本アプリ\]からインストーラーをダウンロードし、パソコンにインストールします。インストーラーはWindowsとmacOSが用意されています。

#### 2\. パノラマ動画を変換

RICOH THETA Sで撮影したパノラマ動画は、そのままでは次のように2つに分かれた状態になってます。このままではYouTubeで正しく表示できないため、アプリで変換します。アプリを起動し、パノラマ動画をドラッグ&ドロップで読み込み、手順に沿って変換します。

![変換前のパノラマ動画](https://ics.media/entry/14150/images/161208_panorama07.jpg)

▲変換前のパノラマ動画

![変換後のパノラマ動画](https://ics.media/entry/14150/images/161208_panorama11.jpg)

▲変換後のパノラマ動画

#### 3\. YouTubeへアップロード

[YouTubeのアップロードページ](https://www.youtube.com/upload)を開き、変換したパノラマ動画をドラッグ&ドロップします。

![YouTubeへアップロードする様子](https://ics.media/entry/14150/images/161208_panorama12.jpg)

#### 4\. パノラマ動画の公開情報を入力

パノラマ動画のアップロードが始まると公開に必要な情報を入力するページへ遷移します。アップロードが完了したら、右上の「公開」ボタンをクリックして動画を公開状態にします。これでYouTubeへパノラマ動画が公開されました。こちらで公開されたものが冒頭の[動画](https://www.youtube.com/watch?v=ndKhKjpWB9k)です。

### 最後に

VRが一般に普及し始め、ユーザーが自由に視点を切り替えられる360°コンテンツが増えてきました。数十万円のカメラを用意するなどの大掛かりだった360°のパノラマ撮影も、小型でスマートフォンとの相性もいいRICOH THETAの登場で身近なものになってきています。FacebookなどのSNSでパノラマ画像を友達と共有するユーザーも増えていくでしょう。これからも増えていくであろう360°コンテンツの作成にあなたも挑戦してみてください。

今回紹介したものはWebサービスを使ってパノラマを公開する方法でした。この方法は手軽に公開できるものの、インタラクションやデザインの面で表現の自由度があまりありません。次回は、JavaScript製の3Dライブラリとして有名な「[Three.js](https://threejs.org/)」や、HTMLをマークアップするように3Dコンテンツが作成できる「[A-Frame](https://aframe.io/)」を使って、カスタマイズ性の高い360°パノラマビューワーの実装方法を紹介します。