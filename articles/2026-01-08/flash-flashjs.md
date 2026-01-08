---
title: "Flash作品を残すために取り組んだこと - プラグイン無しでFlashを再生できるJSライブラリを採用して"
source: "https://ics.media/entry/210215/"
publishedDate: "2021-02-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2021年2月15日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

ブラウザプラグインのFlash Playerは2020年末でサポートが終了しました。そのことにより、Flashコンテンツをブラウザで再生する手段がなくなっています。

筆者は[Beautiflビューティフル](https://beautifl.net/)というウェブサイトを個人的に運用しています。Beautiflは、ユーザーが投稿したFlash作品を紹介するギャラリーサイトです。Flash Player終了によってウェブサイトの目的であるFlashの再生体験ができなくなるので、窮地に陥りました。Flash Playerの終了は2017年にアドビが決定したことで覆せないので、ウェブサイト側として次の3つの対策を行いました。

-   Flashを**HTMLで再生可能**にする
-   Flashをビデオとして残す
-   SWFファイルをダウンロード可能にする

本記事ではウェブで**Flashコンテンツをどうやって残していこうとしたのか**、そのアプローチを紹介します。

-   [Beautifl - Flashのギャラリーサイト](https://beautifl.net/)

![](https://ics.media/entry/210215/images/210215_beautifl_net.png)

※「[wonderfl build flash online](https://www.kayac.com/service/other/94)」は面白法人カヤックがかつて運営していた、Flashを作成・投稿できるサービスです（2017年3月にサービス終了）。Beautiflはwonderflに投稿されたFlash作品を独自にピックアップして紹介しています。

### FlashをHTMLで再生可能にする

ブラウザプラグインのFlash Playerは2020年末でサポート終了しましたが、Beautifl掲載の**Flashはいまもブラウザで再生できます**。これはFlashをHTMLとして再生可能にしているからで、JavaScriptライブラリの「swf2js」によって実現しています。

[swf2js](https://swf2js.com/)はSWFをリアルタイムで分解しHTML5の技術を用いてエミュレートするライブラリです。Flash Playerに遜色のない再生実行が可能です。詳しくは公式サイトを参照ください。

-   [swf2js SWF/Flashを変換しないでHTML5で表示できる、JavaScript製FlashPlayerエミュレーター](https://swf2js.com/)

たとえば、次の作品で見比べてみましょう。左側がFlash Playerで再生したもの、右側がswf2jsで再生したものです。表現の違いはなく再生されていることがわかります。

▼[レンズフレア](https://beautifl.net/run/619/)

![](https://ics.media/entry/210215/images/210215_beautifl_flash1.png)

▼[forked from: HANABI](https://beautifl.net/run/186/)

![](https://ics.media/entry/210215/images/210215_beautifl_flash2.png)

Flashをエミュレートする技術はこれだけに限らず、他にも選択肢があります。その一例を紹介します。

-   Google Swiffy（2016年に終了）
-   [ExGame - Mobage](https://docs.mobage.com/display/JPSPBP/ExGame)
-   [Pex - Mobage](https://developers.mobage.jp/pages/pex/)
-   [LWF by GREE](http://gree.github.io/lwf/)
-   [Ruffle](https://ruffle.rs/)
-   [RS Engine.JS](http://www.realsamurai.com/)
-   [mozilla/shumway](https://github.com/mozilla/shumway)

たくさんの技術があるなかで、Beautiflではなぜswf2jsを選んだのでしょうか。それはswf2jsがActionScript 3.0に対応しているからです。

#### Flashはバイナリファイル

前提を説明します。Flashのファイルは「SWF」（スウィッフやエスダブリューエフ）と言います（拡張子は`.swf`）。SWFはバイナリですが、AdobeよりSWFの仕様書が公開されていました（現在はURLがなくなっています）。SWFファイルをバイナリ解析することで、Flash Player以外の技術でもFlashコンテンツを再現できるようになります。多くのFlashの変換技術は、SWFをバイナリ解析することが基本となっています。

Flashには大きく2つのプログラミング言語があります。1つはActionScript 1.0/2.0という言語、もう一つはActionScript 3.0というJavaに似たオブジェクト指向言語です。ActionScript 3.0は1.0/2.0に対する後継言語で、10倍高速と言われています。

Flashの変換技術の多くはActionScript 1.0/2.0のみしか対応しておらず、ActionScript 3.0を変換可能な技術はほとんどありません。ActionScript 3.0対応は極めて高度で難しいのです。

![](https://ics.media/entry/210215/images/210215_beautifl_emulatejs.png)

ウェブサイトのアーカイブ図書館を目指す米非営利団体[インターネットアーカイブ](https://archive.org/)は過去のウェブサイトを保存しています。インターネットアーカイブスはFlashコンテンツを再生可能にするために、[Ruffleラッフルを採用しました](http://blog.archive.org/2020/11/19/flash-animations-live-forever-at-the-internet-archive/)。しかし、RuffleはActionScript 1.0/2.0に対応しているものの、ActionScript 3.0にはほぼ対応していません。

Beautiflの作品はすべてActionScript 3.0製であるため、swf2jsの存在なくして実現できないものでした。問い合わせをしBeautiflで利用することになりました。

swf2jsの開発者の家永さんが「[Flash Advent Calendar 2020](https://qiita.com/advent-calendar/2020/flash)」で開発エピソードを紹介しているので、ぜひ参照ください。MacromediaとAdobeの開発陣が長年取り組んできた実行エンジンを、JavaScriptで再現しているわけです。考えただけで膨大な開発ではないでしょうか･･･。筆者としては感謝の思いでいっぱいです。

#### コラム：幻のECMAScript 4はActionScript 3.0が採用される予定だった

ActionScript 3.0は2000年代後半には未来のECMAScript 4になるとも注目されたプログラミング言語です。ベンダー間の調整に失敗したECMAScript 4は欠番となっており、ECMAScript 3.1派の流れをもつ現在のECMAScript 2020へとつながっています。ECMAScript 4のいきさつについては記事『[ECMAScript Harmony/ES3.1 と ActionScript - akihiro kamijo](http://cuaoar.jp/2008/08/ecmascript-harm.html)』が詳しいです。結果として、ECMAScript 4が目指そうとした多くの機能は、TypeScriptが実装していますが･･･。

### Flashをビデオとして残す

SWFファイルをHTMLとして再生できるようにしたとはいえ、課題はありました。

-   クロスドメインの制約でHTMLで再生不可能なものがある
-   FlashのStage3Dや動的音生成など、HTMLで再現できないものがある

クロスドメインの仕組みはFlashとHTMLで異なります。FlashはサイトルートにXMLファイル`crossdomain.xml`を設置することで別ドメイン通信を許可するのに対し、HTMLはレスポンスヘッダー`Access-Control-Allow-Origin`の値を参照します。また、2010年代後半で常時SSLが当たり前となりましたが、それ以前のウェブは非SSL環境がほとんどでした。Flash作品は別ドメインに非SSLで接続している作品も数多くあり、httpとhttpsが混在する課題（Mixed Content）もありました。Flash自体の問題というよりは、ウェブの変化が再生を困難にした例とも言えそうです。

HTMLで再現の難しいものはビデオとして残すことにしました。これは筆者の記事『[あの日見たFlashの輝きは後世に伝わらない | ClockMaker Blog](http://clockmaker.jp/blog/2016/12/swf-forever/)』で紹介したアイデアとなります。

とはいえ、Beautiflに掲載しているFlash作品は900点以上あります。これをすべて動画収録するのは大変なので、録画収録する仕組みをウェブ技術で作成しました。ビデオ録画にはElectronで自動収録アプリを自作しています。ElectronにはNode.jsとChromiumが使われており、ブラウザだけでは実現できない機能を開発できます。

Electronにはデスクトップを収録可能にする「[desktopCapturer](https://www.electronjs.org/docs/api/desktop-capturer)」があるので、それを利用しています。ただ、この機能はウインドウ枠等も動画に含まれてしまうので、HTML5 Canvasでトリミングし、Canvasをストーリーム化することで動画化しました。

![](https://ics.media/entry/210215/images/210215_beautifl_electron_arch.png)

Electronの動画保存はWebM形式が対応していますが、iOSはWebM動画形式を再生サポートしていません。WebM形式はMP4/H.264形式へと[定番のffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)でエンコードしています。

▼Electronで作成したFlashの録画アプリの実行画面

![](https://ics.media/entry/210215/images/210215_beautifl_electron_app.png)

効率的な仕組みを作ったとはいえ、ビデオ収録は自動操作ということにはなりません。

Flashにはインタラクティブ性があります。**マウスやキーボード操作によって視覚表現が変化します**。多くのFlash作品は操作しなければ、コンテンツの面白さを体験できません。そのため、すべての作品を操作しながら記録していきました。結局、手動で大量の作品を再動作させていきました。膨大な作業でしたが、もとのFlash作品が面白いため楽しみながらの再収録だったことは言うまでもありません。

### Flash Playerとしてダウンロードできるようにする

Flashはブラウザプラグインとしては再生できなくなりましたが、**ブラウザプラグインではない形では再生可能**です。スタンドアロン版Flash Playerは現在も提供されており、SWFファイルを**ブラウザを通さなければ単独実行できます**。

スタンドアロン版Flash PlayerはAdobeのサイトからダウンロードできます。

-   [Adobe Flash Player - Debug Downloads](https://www.adobe.com/support/flashplayer/debug_downloads.html)

![](https://ics.media/entry/210215/images/210215_beautifl_projector_adobe.png)

ちなみにブラウザプラグインとしてのFlash Playerは2020年末でサポートが終了しましたが、Flash技術自体は今も利用可能です。しばしばメディアは「Flash終了」と表現しますが、終了したのはブラウザプラグインの「Flash Player」のみで、Flash自体が完全に終了したわけではありません。間違えやすいので注意したいところです。

-   [Adobe Animate](https://www.adobe.com/jp/products/animate.html)もSWF出力が可能
-   Adobe AIRをはじめとするFlash技術はAdobe社から[HARMAN社](https://services.harman.com/partners/adobe)に移管済みである

BeautiflではSWFファイルをダウンロードできるようにしました。Flash Playerそのもののパフォーマンスはとても良いので、快適なネイティブの再生体験を試したい方はぜひ利用ください。

![](https://ics.media/entry/210215/images/210215_beautifl_projector_download.png)

### ウェブサイトのリニューアル

蛇足となりますが、サイト自体のリニューアルの話も最後に紹介します。

Beautiflは2009年にオープンしてから時代のニーズにあわせてリニューアルを繰り返してきました。[リリース当時](http://clockmaker.jp/blog/2009/09/beautifl-report/)はjQueryとPHPを利用していましたが、2017年のリニューアルでは[jQueryを廃し](https://ics.media/entry/17451/)、いち早く[CSS Grid Layoutを導入](https://ics.media/entry/17403/)しました。

今回の2021年のリニューアルはサーバーサイドプログラムを廃し、Jamstackジャムスタックというフロントエンドのアーキテクチャーに移行しています（この記事を掲載している[ICS MEDIAもJamstackです](https://ics.media/entry/190410/)）。ページ読み込み速度等を最適化していますので、サーバーサイドPHPを使っていた頃よりも高速に表示できるようになりました。

![](https://ics.media/entry/210215/images/210215_beautifl_jamstack_lighthouse.png)

SEO対策にも力をいれています。**NuxtでJSON+LDに対応することでリッチリザルト対応が可能**です（Google検索エンジンの表示結果を調整できます）。データベースがあればヘッダーに流し込むだけなので、JSON+LDを組むのにJamstackが適していると感じました。

今回は全作品をビデオ収録したので、Googleのビデオアイテムとして登録するようにしています。

![](https://ics.media/entry/210215/images/210215_beautifl_jamstack_seo.png)

10年におよぶリニューアルの変遷は[変更履歴](https://beautifl.net/version/)にまとめています。長期間にわたりウェブサイトを運用するのは大変ですが、ひとつの事例として参考にしていただければ嬉しいです。

### まとめ

今回はサポート終了で動作しなくなったFlashをどうやって体験できるようにしたかを紹介しました。

Flashに限らず、**ウェブの技術は常に変化しているため互換性がいつ無くなるかわかりません**。私たちウェブ制作者はウェブコンテンツを「情報」や「文化」として将来へ残していくためにも、絶え間ない取り組みが必要となることでしょう。本記事で紹介したことが、ウェブコンテンツを未来に残していくことの一助となれば幸いです。