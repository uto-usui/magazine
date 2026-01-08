---
title: "クロスプラットフォーム開発の大本命!? HTML5もアプリもFlashも開発できる「OpenFL」とは？"
source: "https://ics.media/entry/1329/"
publishedDate: "2014-01-30"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

「インタラクティブコンテンツをワンソースでクロスプラットフォームに対応させたい」、それはフロントエンドのデベロッパーであれば誰もが望むことではないでしょうか。一昔前はAdobe Flashが[「Open Screen Project」](https://www.adobe.com/openscreenproject/developers/)と題して一歩手前まで実現していましたが、iPhoneからFlashを締め出そうとするAppleの強硬な姿勢によって頓挫することになりました。

[尾野さん(しっぽさん)](http://sipo.jp/blog/)からの勧めもあり調べたのですが、「[OpenFL](https://www.openfl.org/)」（オープンエフエル）というテクノロジーはさまざまな形式にインタラクティブコンテンツを出力できます。つまりOpenFLを使えばワンソースでクロスプラットフォームを実現できるのです。今回はOpenFLからHTML5とFlashを出力することによってクロスプラットフォームを実現する方法を紹介します。

### クロスプラットフォーム開発が可能なOpenFLとは

[OpenFL](https://www.openfl.org/)は、ゲームやアプリケーションを構築するための環境を提供するフリーでオープンソースのソフトウェア開発キットです。1つのコードから**さまざまなプラットフォーム（HTML5, Flash, スマホアプリ等）に出力でき**、**Flashとほぼ同じAPIを持ち合わせている**のが特徴です。

-   出力形態はiOS、Android、BlackBerry、Windows、Mac、Linux、FlashとHTML5
-   OpenFLは**プログラミング言語Haxeを使って開発**する
-   ほとんどの**プラットフォーム上のネイティブで出力される**ため本来の性能が発揮される（たとえばWindowsであればC++として展開される、AndroidならJavaとして展開される）
-   ライブラリは、2Dおよび3Dの業界標準のAPIを持っている（具体的にはFlashとほぼ同じAPIが用意されている）

![](https://ics.media/entry/1329/images/140130_haxe_crossplatform.png)

### OpenFLからHTML5とFlashが両方出力できる

HTML5とFlash Playerはどちらが優勢かという話はさておき、現在も片方の技術だけではクロスプラットフォームを実現できません。**HTML5だと古いブラウザ（たとえばIE6, 7, 8）で動作しませんし、過渡期のブラウザIE9/IE10でも動作が安定していません。**\_対して\_Flash Playerだとすべてのデスクトップブラウザで再生可能なものの、スマートフォン（iPhone, Android）のブラウザでは再生できません。そういった事情もあり、ブラウザでのクロスプラットフォームを実現するベストソリューションがないのが実情です。

※「[Internet Explorer のサポート ライフサイクル ポリシーに関する FAQ](http://support2.microsoft.com/gp/microsoft-internet-explorer)」によるとIE8は2016年1月にサポートが切れるそうですが、多くのエンドユーザーや大企業で旧式ブラウザは残っていくでしょう。

※HTML5とCSS3で機能を制限すれば古いブラウザでもコンテンツを再生できますが、コンテンツのクオリティーや開発工数を犠牲になる可能性があります。

![HTML5だと古いブラウザ(例えばIE6, 7, 8)で動作しませんし、過渡期のブラウザIE9/IE10でも動作が安定していません](https://ics.media/entry/1329/images/150806_flash_html5.png)

ところが、今回紹介するOpenFLを使えば**ワンソースでHTML5とFlashの両方を出力できます。**つまり、1つのソースコードからHTML5とFlashでまったく同じ見栄えのコンテンツを出力できるため、上記で示した問題を解決することができきるのです。特定の技術で何かしらの環境で動かないのであれば、HTML5とFlashの両方を出力して**環境に応じて最適なフォーマットで再生**するように分岐すれば、多くの環境で再生させることが可能になります。

-   **OpenFLからFlashとHTML5の両方のコンテンツを出力**する
-   古いブラウザ（たとえばIE6, 7, 8）向けにはFlash (SWF)を再生する
-   スマートフォン（iPhone, Android）向けにはHTML5を再生する

![一つのソースコードからHTML5とFlashで全く同じ見栄えのコンテンツを出力できる](https://ics.media/entry/1329/images/150806_openfl_output.png)

余談ですが[Unity](http://japan.unity3d.com/promo/unity5/)という選択肢はどうなのでしょうか？　Unityはネイティブアプリ（iOSやAndroid、コンシューマゲーム機）には向いており、[10以上のプラットフォームにパブリッシュ](http://japan.unity3d.com/unity/multiplatform/)できます。しかしWeb向けの書き出し機能が貧弱であまり使われていないのが現状です。Unity Web Playerというブラウザプラグインは現在のGoogle Chromeでは動作しませんし（ChromeではNPAPI方式のプラグインが廃止されたため ※)、Unity 5のWebGL書き出しは多くの課題がありほとんど採用事例がありません（出力したファイルサイズが巨大でWebサイトに載せるのが現実的ではない、WebGL未対応のブラウザがある、書き出し時間が長い、ワークフローが未成熟等々の数々の問題があります）。Unity 4がFlash Player (SWF)書き出しをサポートしていた頃はまだ良かったのですが…。

※Flash PlayerはPPAPI方式のブラウザプラグインであるため、Google Chromeで問題なく動作します。

### 公式サンプルでHTMLとFlashを試す

OpenFLを使うとどのようなコンテンツを作ることができるのでしょう。公式サイトである[OpenFL :: Samples](http://www.openfl.org/developer/documentation/samples/)や[openfl/openfl-samples · GitHub](https://github.com/openfl/openfl-samples)からダウンロードできるサンプルを紹介します。FlashとHTML5の両方でサンプルを出力していますが、**どちらも同じ表現とインタラクションが再現されている**のがわかります。

![](https://ics.media/entry/1329/images/150806_haxe_sample_piratepig.png)

-   [HTML5版 PiratePig](http://clockmaker.jp/labs/140130_openfl_samples/PiratePig/html5/index.html)
-   [Flash版 PiratePig](http://clockmaker.jp/labs/140130_openfl_samples/PiratePig/flash/PiratePig.swf)

![](https://ics.media/entry/1329/images/150806_haxe_sample_bunnymark.jpg)

-   [HTML5版 BunnyMark](http://clockmaker.jp/labs/140130_openfl_samples/BunnyMark/html5/index.html)
-   [Flash版 BunnyMark](http://clockmaker.jp/labs/140130_openfl_samples/BunnyMark/flash/BunnyMark.swf)

### 自作のコードでOpenFLを試す

FlashやHTML5で作ったことのあるコードをOpenFLに移植し、OpenFLの使い勝手やパフォーマンスを試しました。

![](https://ics.media/entry/1329/images/150806_mycode_particles.png)

-   [Flash版パーティクルデモ](http://clockmaker.jp/labs/140122_OpenFLParticles/flash/OpenFLParticles.swf)
-   [HTML5版パーティクルデモ](http://clockmaker.jp/labs/140122_OpenFLParticles/html5/index.html)
-   ソースコード（[Man.hx](http://clockmaker.jp/labs/140122_OpenFLParticles/src/Main.hx), [Particle.hx](http://clockmaker.jp/labs/140122_OpenFLParticles/src/Particle.hx))

※Flash版のほうがHTML5版よりもパフォーマンスが良かったため、パーティクルの個数は別々に設定しています。

![](https://ics.media/entry/1329/images/150806_openfl_arrows.png)

-   [Flash版フォースマップデモ](http://clockmaker.jp/labs/140122_openfl/flash/ArrowParticles.swf)
-   [HTML5版フォースマップデモ](http://clockmaker.jp/labs/140122_openfl/html5/index.html)（※起動に少し時間がかかります）
-   ソースコード（[Man.hx](http://clockmaker.jp/labs/140122_openfl/src/Main.hx), [Arrow.hx](http://clockmaker.jp/labs/140122_openfl/src/Arrow.hx))

さきほどOpenFLを使えば同じ見栄えのコンテンツを提供できると紹介しましたが、実際のところはFlashで出力したほうがHTML5のものより良好なパフォーマンスが得られました。以前も検証したことがありますが一般的にFlashのほうがHTML5より高いパフォーマンスが得られる傾向があります。詳しくは次の記事「[HTML5はFlashの3倍重かった! 描画パフォーマンスの比較 | ClockMaker Blog](http://clockmaker.jp/blog/2012/02/html5-flash-draw_performance/)」を参考ください。

### OpenFLの始め方

OpenFLとHaxeの始め方をビデオに録画しYouTubeにアップしました。次の**2つのビデオはどちらも10分以内の短いもの**です。すぐにOpenFLを始められるのでぜチャレンジしてみてください。

ソフトウェアはFlashDevelopが標準サポートしていて、強力なコード補完やコード生成を利用できます。

### ネイティブの出力について

アプリとしてクロスプラットフォームに出力する有用な技術としてAdobe AIRが挙られます。Adobe AIRはFlashコンテンツをワンソースでさまざまなプラットフォーム（iOSやAndroid, Mac, Windows)にも展開できる**とても利便性が高く理想的なツール**です。しかしFlashコンテンツをAIRランタイム（中間レイヤー）上で再生する形態をとるため、ネイティブで作られたコンテンツと比較するとパフォーマンスが劣ると言われています。(最近はAdobe AIRでGPUを活用できるため、描画面のパフォーマンスの差が埋まっています。詳しくは次の記事を参照ください）

-   [iOSにおけるSwift/Unity/PhoneGap/Adobe AIRのパフォーマンス比較検証](https://ics.media/entry/6137/)
-   [モバイルアプリ開発者必見！初期型から最新のAndroid端末まで、AIR製アプリのパフォーマンス徹底検証](https://ics.media/entry/6/)

それに対してOpenFLはネイティブのコードに変換したうえで出力するので、各プラットフォーム上で高いパフォーマンスを得ることができます。ネイティブ出力するとさすがC++になっているだけあってかなり高速に動作しました。

> OpenFLの続き。ちなみにWindowsネイティブアプリの出力にすると最もパフォーマンスが良い感じ。FlashやHTML5の6倍ほどのパフォーマンスが出ています。ちなみにNekoもなかなかパフォーマンスが良いです。 [#Haxe](https://x.com/search?q=%23Haxe&src=hash) [https://twitpic.com/dsybgi](https://twitpic.com/dsybgi)
> 
> — 池田 泰延 Yasunobu Ikeda (@clockmaker) [2014, 1月 21](https://x.com/clockmaker/statuses/425673916028170240)

### 試してみた感想 - クロスプラットフォームの可能性を実感

この手のクロスプラットフォームの出力ツールは他にもあるのですが、OpenFLは出力の精度が良いことに驚きました。業界標準のAPI (Flashとほぼ同じAPI)を搭載していることや、ActionScript 3.0と似たHaxe言語で開発することから、**OpenFLはFlashの開発を経験したことがある方なら習得しやすいこともわかりました**（私は上記のパーティクルデモをOpenFLを触り始めて1〜2時間ほどで作れました）。

ただ調べていると**OpenFLはそれぞれの環境で完全な互換性がまだ実現できていない**ようです。とはいえ海外では事例もでてきているそうなので、将来のクロスプラットフォームの主力技術として注目しておきたいです。

-   [OpenFL :: Showcase](http://www.openfl.org/about/showcase/)

### OpenFLフレームワークとHaxe言語の学習コストについて

新しい技術を導入するには学習コストが気になります。まずおさえておきたい点として、繰り返しになりますがOpenFLはFlashとほぼ同じAPIを使って制御するためFlash開発者であれば学習コストが抑えられます。いっぽう、Flash開発の経験がない開発者にも利点があります。多くの描画向けJavaScriptライブラリ（たとえばCreateJSやPixi.jsなど）はFlashのAPIに似た構造になっているため、OpenFLを学べば学習コストが他にも転用できるのです。

プログラミング言語としてのHaxeは、合理的で先進的な言語機能を有しているので学習する価値があります。HaxeはECMAScriptベースであるため業界標準として知っておいて損はないと思います。言語の勉強には2015年8月出版の「[Haxeプログラミング入門](http://www.amazon.co.jp/dp/4777519066)」を参考にするのがいいでしょう。

OpenFLは前身の「NME」を含めると2007年から開発がされており成熟度が高まってきています。この記事を読んで興味をもった方はぜひOpenFLとHaxeを試してみませんか？

### 参考記事

-   [X-LABO: Haxe OpenFL 調査](http://www.dango-itimi.com/blog/archives/2013/001188.html)
-   [Haxe - OpenFLでFlashと違う仕様](https://qiita.com/arlez80/items/a33fd482536e447dbd77)

### 更新履歴

-   2015/07/30 [Haxe 3.2.0](http://qiita.com/shohei909/items/4c2125a6ff065d9cc65f)と[OpenFL 3.2.0](https://x.com/Open_FL/status/623629895499821056)に対応