---
title: "高まるHTML5製アプリの需要 ―CreateJS勉強会（前編）"
source: "https://ics.media/entry/10694/"
publishedDate: "2016-01-27"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

2016年1月、[CreateJS勉強会(第7回）](https://atnd.org/events/73535)が[ICTCO](http://ictco.jp/access.html)で80人の定員規模で開催されました。勉強会のフォローアップとして、発表資料「CreateJSで開発するクロスプラットフォームなアプリ開発〜ElectronとPhoneGapで広がる可能性〜」のスライドを一部抜粋して記事という形で公開します。

なお、前編記事「高まるHTML5製アプリの需要」と後編記事「[HTML5製アプリParticle Developの開発の裏側〜ElectronとAngular 2で開発効率が劇的に向上](https://ics.media/entry/10748/)」の二部構成にしています。前編となる本記事では、Web技術を取り巻く最近の事情について分析し、HTML5製アプリの需要の高まりについてまとめています。

### Web技術を取り巻く事情が好転している

近年、Web技術を取り巻く環境は好転しています。4つの観点から見てみましょう。

#### 1\. HTML5の需要が高まっている

簡単にHTMLの歴史を振り返ってみましょう。HTMLは1990年前半に文書構造を定義する手段として生まれました。グラフィック表現やマルチメディアの取り扱いはHTMLには不向きだったので、Flash Playerを始めとするプラグインがその役割を担う時代となっていきます。ところが、2007年頃に登場したiPhone等のスマートフォンブラウザではプラグインを使うことはできません。そこで**プラグインを使わずともグラフィック表現やマルチメディアを取り扱うことのできるHTML5の需要が高まってきました**。

![HTML5の需要が高まっている](https://ics.media/entry/10694/images/160122_seminer_createjs_history_of_web.png)

#### 2\. 2014年にHTML5がW3Cの勧告となった

とは言え、スマートフォンが出たばかりの頃はHTML5はまだ策定途中で、ブラウザ間の実装差異により充分に使えない時代でした。それから数年でブラウザの対応が急速に進み、さらに**2014年10月28日にHTML5がW3Cの勧告となった**ことで、今やほぼすべてのブラウザでHTML5が使える時代になっています。

[![HTML5の仕様決定](https://ics.media/entry/10694/images/160122_seminer_createjs_html5_w3c.png)](https://www.w3.org/TR/html5/)

▲ [Web技術標準化団体「W3C」公式サイトのHTML5ページ](https://www.w3.org/TR/html5/)より

#### 3\. 2016年にIE11未満の対応は実質不要になった

ウェブ開発にHTML5を使う時の大きなネックだったのは、HTML5に対応していないIE8以下の存在でした。[2016年1月12日にMicrosoft社が発表したIEのサポートポリシー変更](https://www.microsoft.com/ja-jp/windows/lifecycle/iesupport/)により、Windows VistaではIE9以上が、Windows 7やWindows 8ではIE11以上がサポート対象となりました。Windows Vistaのシェアは全世界で1%程（[マイナビニュース調べ](http://news.mynavi.jp/news/2015/11/04/099/)）ですので、**IEの対応はHTML5に対応しているIE11以上のみで充分**と考えられます。

![2016年1月12日にMicrosoft社が発表したIEのサポートポリシー変更](https://ics.media/entry/10694/images/160122_seminer_createjs_ie_polisy.png)

▲ Windows OSとIEのサポートバージョンの対応表

#### 4\. 近年のWeb技術のパフォーマンス性能は向上している

HTML5の弱点の1つはパフォーマンスの低さでしたが、近年ではそれも改善しつつあります。記事「[Swift/Unity/PhoneGap/Adobe AIRのパフォーマンス比較検証](https://ics.media/entry/6137/)」では、Swift（ネイティブアプリ開発技術）、Adobe AIR（Flash製アプリ開発技術）、そしてPhoneGap（Web製アプリ開発技術）を使って、スマートフォンにおけるアプリのパフォーマンスを比較しました。PhoneGapではHTML5 Canvasを使用しています。すると、ネイティブやFlashには及ばないものの、**Web技術のパフォーマンスは充分に高い**ことがわかりました。

![Swift/Unity/PhoneGap/Adobe AIRのパフォーマンス比較検証](https://ics.media/entry/10694/images/160122_seminer_createjs_ios_performance.png)

▲ 黄色がWeb技術を使ったコンテンツのパフォーマンス

以上のように、近年Web技術を取り巻く背景は好転しており、2016年の現在ではHTML5が堂々と使える時代になっています。近年ではHTML5をアプリ開発に採用する例が登場しています。

### Web技術で開発されたアプリの登場

「[Visual Studio Code](https://www.visualstudio.com/ja-jp/products/code-vs.aspx)」は、HTML・CSS・JavaScriptで作られたアプリです。[Microsoft](https://www.microsoft.com/ja-jp/)社が2015年4月にリリースしたもので、**Windows・macOS・LinuxといったさまざまなOSで動く**エディターです。開発者が今後使いたいエディターの調査結果では上位にランクインしています。（引用「[技術トレンド調査 - Build Insider](http://www.buildinsider.net/hub/survey/201511-techtrend-ja)」）

![Visual Studio Code](https://ics.media/entry/10694/images/160122_seminer_createjs_visual_studio_code.png)

「[Slack](https://slack.com/)」のデスクトップアプリも、HTML・CSS・JavaScriptで作られています。Slackは[MetaLab](https://metalab.co/)社が2014年1月にリリースしたもので、Web・デスクトップアプリ・モバイルアプリに展開するチャットツールです。**ブラウザサービスで展開しているものと同じものがデスクトップアプリとしても利用できる**ことも魅力の1つです。

![](https://ics.media/entry/10694/images/160122_seminer_createjs_slack.png)

モバイルでは[Wikipedia Mobile](https://itunes.apple.com/jp/app/wikipedia-mobile/id324715238)、[LinkedIn](https://itunes.apple.com/jp/app/linkedin/id288429040)等がWeb技術で開発されています。

![モバイルでのWeb技術採用例](https://ics.media/entry/10694/images/160122_seminer_createjs_mobile.jpg)

### Web技術を使ったアプリ化のメリットは開発タスクの軽減

では、Web技術を使ってアプリ化をするとどのようなメリットがあるのでしょうか？ **最大のメリットは、開発タスクの軽減**です。デスクトップとモバイル等、複数のプラットフォーム対応のアプリを開発する場合、従来ではそれぞれのプラットフォーム向けの開発が必要でした。Web技術を使えば各プラットフォーム向けの開発を同時にできるため、開発タスクが減り、その分ブラッシュアップやデバッグに時間を注ぐことができます。

![開発タスクの軽減](https://ics.media/entry/10694/images/160122_seminer_createjs_app_merritt.png)

### アプリ化は簡単にできる

Web技術を使ったアプリ化はネイティブの知識が必要で難しいと感じるかもしれません。しかし、近年では簡単にアプリ化できる技術が現れています。それが[Electron](http://electron.atom.io/)と[Apache Cordova](https://cordova.apache.org/)です。これらの技術を使うと**HTML・CSS・JavaScriptで作ったコンテンツにほぼ手を加えることなくアプリ化することが可能**です。また、ネイティブ機能との連携も手軽に実現できます。

![Electron、Cordovaを使ったアプリ化](https://ics.media/entry/10694/images/160122_seminer_createjs_electron_cordova.png)

### これからはHTML5でアプリを作ろう

Webを取り巻く時代背景が変わり、HTML5にとって良い時代になってきています。今後もHTML5の資産は増えていくことでしょう。**HTML5をWebブラウザだけではなく、アプリにも活用する時代になったのではないでしょうか？** 後編記事「[HTML5製アプリParticle Developの開発の裏側〜ElectronとAngular 2で開発効率が劇的に向上](https://ics.media/entry/10748/)」では、実際に弊社で作成したHTML5製のデザインツール「Particle Develop」の事例を紹介します。