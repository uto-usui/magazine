---
title: "WebGL開発者必見！ Flash Stage3Dとの比較から見えてくるWebGLのあり方について"
source: "https://ics.media/entry/3865/"
publishedDate: "2014-12-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2014年12月3日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

12月といえばアドベントカレンダー。今年は[WebGLのアドベントカレンダー](http://qiita.com/advent-calendar/2014/webgl)に私も表明しましたので、テーマ「Flash Stage3Dとの比較から見えてくる WebGLのあり方について」をテーマとして記事を書いてみます。長文ですが、WebGLとStage3Dのそれぞれの技術について特徴をまとめていますので最後までお付き合いくださいませ。

### WebGLとStage3Dとは

Stage3Dとは**Flash(Flash PlayerやAdobe AIR)からOpenGL/DirectXを利用することのできる技術**です。2011年にリリースされたFlash Player 11 / Adobe AIR 3に搭載され、多くの商用コンテンツで利用されてきました。

[Nissan Stage Juke (Flash Stage3D 事例)](https://ics.media/entry/3865/images/141203_juke.jpg)

[http://nissan-stagejuk3d.com](http://nissan-stagejuk3d.com/)

WebGLはプラグイン無しに**ブラウザの標準技術としてOpenGLを利用することのできる技術**です。2014年になってIE11やiOS8 Safariで搭載されたことにより多くのブラウザで表示できるようになり注目を集めています。CSS3やCanvas Context2Dなどの他のWeb標準技術で3Dを実現できますが、WebGLを使えばより高度な3D表現や高速な2D表現の作成が可能になります。

[WebGLで作られたゲーム。Papervision3Dの開発者としても有名なC4LOS氏も参加しています。](https://ics.media/entry/3865/images/141203_hellorun.jpg)

[http://hellorun.helloenjoy.com](http://hellorun.helloenjoy.com/)

WebGLで作られたゲーム。Papervision3Dの開発者としても有名なC4LOS氏も開発に参加しています。

ともにGPUを利用する技術ですが、**ほぼ同等の表現が実現**できます。今回の記事ではそれぞれの技術の異なる点と両技術のメリット・デメリットを掘り下げていきます。

### 対応環境について（ブラウザ編）

両者の特徴的な**相違点は再生できる実行環境の違い**です。Stage3Dのほうがリリースされた時期が早かったことやブラウザのプラグインモデルを採用していることもあり、**Stage3Dは新旧幅広いデスクトップブラウザで利用できます**。たとえば、サポート終了した13年前の**ブラウザIE6でも動作します**し、IE10以上やGoogle ChromeにはFlash Playerがデフォルトでインストールされています。追記すると、[旧式プラグインモデルNPAPIを排除することを宣言した](http://www.forest.impress.co.jp/docs/news/20130925_616845.html)Google Chromeに対しても新式のPPAPI版Flash Playerが標準搭載されています。ただしFlash Playerがスマートフォンのブラウザに搭載されていない（※一部を除く）のため、スマートフォンのブラウザではStage3Dを再生することができません。

対して**WebGLは2014年現在使用できるブラウザが限られます**。大きなシェアを持つ旧式のIE8〜10はWebGLに対応しておらず、商用案件では利用しにくいことがデメリットでしょう。スマートフォンではiOS 8 Safariで標準対応、Androidでは一部を除き再生できます（AndroidではOS/メーカー/ブラウザによって対応状況が異なる）。Androidでは一律に再生可能だと言い切れないことや、iOS 7以前はWebGLが再生できませんが、近い将来にWebGLがスマホブラウザで幅広く実行できる時代がやってくると予想できます。[Can I Use](https://caniuse.com/webgl)によれば現時点で**74.64%のGlobal Browser UageでWebGLが利用可能**としています。

\[![](https://ics.media/entry/3865/images/141203_caniuse_webgl.png)

[https://caniuse.com/webgl](https://caniuse.com/webgl)

※追記：FirefoxやAndroid2.x系の標準ブラウザではFlash PlayerをインストールしてFlashコンテンツを再生できます。しかし、Stage3DはスマートフォンのブラウザではAPIが未対応のため再生できません。

※追記：類似の技術Unityに関してはPPAPI版のUnity Web Playerが存在しないため従来のUnityコンテンツがGoogle Chromeで再生できなくなります。しかしUnity 5ではWebGLとして出力できるようになる予定で期待されています。

[Unity から WebGL 出力されたアピールコンテンツ](https://ics.media/entry/3865/images/141203_unity.jpg)\]([http://unity-chan.com/events/c86/WebGL/](http://unity-chan.com/events/c86/WebGL/)) Unity から WebGL 出力されたアピールコンテンツ

### 対応環境について（アプリ編）

Stage3Dのメリットとして、それのランタイムであるFlash(Adobe AIR)はスマートフォンのアプリケーションとしてデプロイ可能なことが挙られます。**Adobe AIRはiOSとAndroidのそれぞれに同一のコードからアプリケーションとして出力でき**、最近のスマートフォンではほぼOpenGL ES 2.0が搭載されているため、**ほぼ確実にStage3Dを利用できます**。スマホアプリ/タブレットアプリとして同一のコードからGPUをしたコンテンツを制作するには適した技術だと言えます。

![](https://ics.media/entry/3865/images/141203_adobeair.png)

**WebGLはWeb Viewを介することでHTML5のアプリケーションとしてデプロイすることが可能**です（たとえば[PhoneGap](http://phonegap.com/)がWeb Viewを介する技術です）。しかしアプリとしてデプロイしたからと言って**必ずしもWebGLが動作することは限りません**。それはWeb Viewは端末の標準ブラウザを利用する仕組みであるためで、標準ブラウザがWebGLに対応していることが条件となります。つまり、スマホブラウザと同様にWebGLが標準搭載されたスマホのシェアが浸透するまで、WebGLをスマホアプリとしてデプロイする手段は商用に利用しにくいと言えます。

-   [HTML5で可能になった6OS対応時代のスマート開発（4）：WebGLアプリをPhoneGapを使ってAndroid／iOSで動かしてみた (1/3) - ＠IT](http://www.atmarkit.co.jp/ait/articles/1402/10/news026.html)

![Phone Gapを使えばHTMLをアプリ化することが可能だが、WebGLがどの環境でも確実に動作するかは別問題](https://ics.media/entry/3865/images/build-diagram-1280x441.png)

### シェーダー言語の違い

Stage3DとWebGLはともに**頂点シェーダー(バーテックスシェーダー)と断片シェーダー―(フラグメントシェーダー―)の両方を使って3Dを実現**します。しかしシェーダー言語が異なり、Stage3DではAGAL（エーギャル）を、WebGLではGLSL（ジーエルエスエル）を利用します。

![](https://ics.media/entry/3865/images/shaders.jpg)

[http://cuaoar.jp/2011/11/stage3d-2.html](http://cuaoar.jp/2011/11/stage3d-2.html)

Stage3Dでは幅広い環境で再生できるようにするための解決策として、ブラウザ/OSによってOpenGLかDirectXかどちらか最適な方を利用する仕組みとなってます。そのため、シェーダー言語は両方に変換可能なものを使う必要があり、AdobeはAGALという言語を用意してそれを実現しました。対してWebGLではOpenGLのみを利用するため、OpenGLのシェーダー言語であるGLSLをそのまま記述できます。

[AGAL(左)とGLSL(右)の違い。](https://ics.media/entry/3865/images/141203_agal_glsl.png)

両者を比較すると、**GLSLでは関数が使えることが大きなメリット**でしょう。AGALでは1回のドローコールで実行できる命令長が200まで、各シェーダーで使用できる変数がベクトル換算で8本ずつまでというような決して充分とは言えない上限があります。これに加えて関数を使用できないため少し複雑なことをしようとするとすぐにこれらの上限に達してしまいます。たとえば、ライトを1つ実現するために命令を数十使うために使用できるライトの数に制約ができてしまい、3D空間にライトを数個しか配置できないというような不便なことになってしまいます。**GLSLでは関数が使えるため命令数をコンパクトに抑えることができる**ので、AGALで不便に思うような制約があまりありません。

上記のような使用できるリソースの制限に関して言えば、一見すると使用できる数が多いためGLSLのほうに軍配が上がります。ただし、この数は実行環境に依存するため、「経験則から考えられるある程度の数」以上を使おうと思うと、実行時に使用できるリソース数のチェックと、条件に満たなかった場合の対策が必要になってきます。もちろんAGALも実行環境に依存する点はあるのですが、リソースに関しては再生できる環境であれば最低限が保証されているため、とくに気にする必要がないというのはAGALのメリットと言えるでしょう。

※AGALの上限はAGAL2 (Stage3DのStandardプロファイル）で[緩和](https://ics.media/entry/3865/images/agal-agal2-registers-300x184.png)されています。

### フレームワークの違い

両者の技術も共にシェーダー言語を使って1から作るのではなく、**フレームワークを利用して開発することが一般的なワークフロー**として想定されています。ではStage3DとWebGLではどのようなフレームワークが存在するのでしょうか？　次に各種フレームワークをまとめてみました。

Stage3Dのフレームワーク

-   [Starling](http://gamua.com/starling/) (2D)
-   [Feathers](http://feathersui.com/) (2D)
-   [Away3D](http://away3d.com/) (3D)
-   [Flare3D](http://www.flare3d.com/) (3D)
-   [Alternativa3D](http://old.alternativaplatform.com/en/technologies/alternativa3d/) (3D)
-   [Minko](http://minko.io/) (3D)

WebGLのフレームワーク

-   [EaselJS](http://www.createjs.com/) (2D)
-   [Pixi.js](http://www.pixijs.com/) (2D)
-   [Three.js](http://threejs.org/) (3D)
-   [Away3D TypeScript](http://typescript.away3d.com/) (2D・3D)

GPUを利用するというイメージから3D表現を思い浮かべられますが、**WebGLもStage3Dも3D表現のものだけではありません**。ともに2Dと3Dのフレームワークが存在し、2Dでも3DでもGPUの恩恵をうけることができます。

フレームワークの選定にあたっては3Dの表現、パフォーマンス、モデルデータの読み込み対応（読み込める形式の種類やパースの速度）、モデルデータ作成のワークフローなどさまざまな観点から検討する必要があります。WebGL界隈では「Three.js」一強の状態が続いていますが、採用にあたっては慎重に検討したほうがいいのではないかと思います。

![3Dモデリングソフトからの取り込みのワークフローの充実が必要。Away3DではExporterのプラグインが用意されている。](https://ics.media/entry/3865/images/141203_webgl-stage3d.png)

Away3DではExporterのプラグインが用意されている。おもしろいことに、**WebGLのフレームワークもStage3Dのそれもほとんど同じ設計**となっています。基本的な機能に関してはほとんどのフレームワークで似たAPIを持ちあわせいるので、1つのフレームワークを習得すれば他のフレームワークでノウハウやテクニックを活かすことができます。Away3DやMinkoなどはWebGLとStage3Dの両方にフレームワークを提供していますし、フレームワークレベルの技術習得の観点でいえば、WebGLとStage3Dは垣根が低いものではないでしょうか。

### 2Dと3Dの組み合わせ

WebGLであれば、WebGLのビューポートであるcanvasタグよりも上位にDOMエレメントを配置しCSSで制御が可能なためHUDの構築が簡単です。これに関してはさくーしゃさんもHTML5 Rocksの記事「[Case Study: Inside World Wide Maze](http://www.html5rocks.com/ja/tutorials/casestudies/world_wide_maze/)」で「**HTML5 + CSS3 のレイアウト機能は非常に強力で**」とメリットとしてあげています。

対してStage3Dも同様にFlashのDisplayListを利用してHUDを作ることができます（Stage3Dの上位レイヤーにDisplayListを配置することで）。[Adobe Flash Professional CC](http://www.adobe.com/jp/products/flash.html)を使ってGUIのツールで直感的に作成できます。この設計は弊社も開発に関わっている[スクエニレジェンドワールド](https://ics-web.jp/showcase/legend_world)で採用しています。

![WebGLでUIパーツはどのように作るのがいいか。ビューポートとDOMエレメントを分離するのが生産効率が良い。](https://ics.media/entry/3865/images/141204_webgl_layer.png)

[https://plus.google.com/102594170131511973965/posts/b7qdNHLPGLk?pid=5893990719404976978&oid=102594170131511973965](https://plus.google.com/102594170131511973965/posts/b7qdNHLPGLk?pid=5893990719404976978&oid=102594170131511973965)

### 制御スクリプト

**Flash Stage3DはActionScript 3.0で実装します**(ActionScript 1.0/2.0でStage3Dを制御することはできません）。ActionScript 3.0はECMAScript 4をベースとしており、Javaのような言語となっています。開発環境として高機能なAdobe Flash Builderや無償のFlashDevelop等が充実しているため、大規模開発に向いているという利点があります。

**WebGLはJavaScriptで実装します**。ご存知の通りJavaScript （現行のECMAScript 5も含む）はレガシーな言語であり、言語機能がニーズ（リッチコンテンツ開発）に追いついていないのが現状です。JavaScriptを使ってWebGLコンテンツを作るのはデモレベルならいいですが、高度なコンテンツを作るには個人的にはJavaScriptを素のまま記述するのは向いているとは思えません。WebGLフレームワークのAPIが多岐に渡ることと3Dコンテンツでの大規模開発を見越して、**WebGL開発には静的型付けの言語のTypeScriptやHaxeを利用することを提案したい**です。

-   [モダンな言語でHTML5を開発しよう！ 俯瞰して理解するaltJSの比較](http://html5experts.jp/clockmaker/2183/)

#### スクリプトのパフォーマンス

JavaScriptはインタプリタでActionScript 3.0はコンパイル済となるため、**実行時のパフォーマンスは一般的にはActionScript 3.0のほうが高い**と言われています。次の図板はHTML5にもFlashにも両方存在する物理演算ライブラリBox2Dを使って、ActionScriptとJavaScript等のパフォーマンスをグラフ化したものです（左側にあるほうが高速）。

\[![](https://ics.media/entry/3865/images/graph0.png)

[http://www.j15r.com/blog/2013/04/25/Box2d\_Revisited](http://www.j15r.com/blog/2013/04/25/Box2d_Revisited)

#### ネイティブレベルの実行速度を実現する技術

話題がStage3DとWebGLから離れますが、**JavaScriptとActionScriptをさらに高速に実行する手段が存在**します。これらの技術はアプローチはそれぞれ異なりますが、基本的にはネイティブレベルのパフォーマンスを得るためにC/C++等で開発されたロジックをモジュール化し、JSやAS3で叩けるようにしています。高度な計算や計算量の多いロジック（たとえば物理演算など）で使うことで、実行速度の遅いJS/AS3の弱点を補うことができます。3D実装においては計算量が大きくなる傾向があるため、描画はStage3DやWebGLに担当させ、高度な計算は下記技術に担当させることで、コンテンツのパフォーマンスを高めることができます。

#### Flash/ActionScript 3.0側

-   [CrossBridge (旧Flash C++ Compiler)](http://www.adobe.com/jp/joc/gaming/flascc.html) ：CrossBridgeは最終的にはFlashコンテンツに組み込まれるのでさまざまなブラウザで利用可能

#### ブラウザ/JavaScript側

-   [asm.js](http://asmjs.org/)：asm.jsの本来の効果が得られるのがFirefoxのみ (ただしasm.jsは最終的にはJSになるので他のブラウザでも実行可能）
-   [PNaCL](http://www.chromium.org/nativeclient/pnacl)：PNaCLはネイティブモジュールとなりGoogle Chromeのみで利用可能

CrossBridgeは幅広いブラウザ環境で実行できるのに対して、asm.jsとPNaCLは一部のブラウザでしかその効果の恩恵をうけることができません。**実行環境の多さで言えばFlash Stage3D+CrossBridgeの組み合わせのほうがWebコンテンツとして利用しやすいでしょう。**ただ実際のところ、これらの技術は実装難易度が高すぎるので、アピールコンテンツを除いては採用事例はほとんどありません。

![CrossBridgeを使って作られたUnreal Engineのデモ](https://ics.media/entry/3865/images/141204_epic_crossbridge.png)

[https://www.youtube.com/watch?v=UQiUP2Hd60Y&hd=1](https://www.youtube.com/watch?v=UQiUP2Hd60Y&hd=1)

![asm.jsを使って移植されたUnreal Engineのデモ](https://ics.media/entry/3865/images/0baaa604ca4788826b8e0299488830e7.png)

[https://blog.mozilla.org/blog/2014/03/12/mozilla-and-epic-preview-unreal-engine-4-running-in-firefox/](https://blog.mozilla.org/blog/2014/03/12/mozilla-and-epic-preview-unreal-engine-4-running-in-firefox/)

### デバッグ

Flash Stage3Dではデバッグツールとして[Adobe Scout](http://www.adobe.com/jp/joc/gaming/scout.html)が存在します。Adobe Scoutは非常に高性能・多機能でフレームレート・CPU負荷・メモリ量・GPUメモリ量・AGAL命令・ActionScriptの関数実行時間を計測できます。

![Stage3Dに関しては命令毎に実行結果をプレビューする機能も備わっているため、AGALの命令が正しく実装できているかどうかを確認するのに役立つWebGLにも同様の機能を備えたツールが存在します。この点ではStage3DとWebGLはほぼ同等の機能が存在すると見ていいでしょう。](https://ics.media/entry/3865/images/scout_2.png)

-   実行されているドローコール等の命令をチェックできるツール [Canvas Profiles が超便利なのでご紹介 - latest log](http://uupaa.hatenablog.com/entry/2014/05/20/182051)
-   シェーダーや頂点バッファー等の状態をチェックできるツール [Chrome extension, WebGL Inspectorが超便利 « イナヅマTVログ](http://www.inazumatv.com/contents/archives/8738)

制御スクリプトに関してもAdobe ScoutとFlash Builderのプロファイラーを併用することでFlashだと非常に精度の高いチューニングが可能です。

-   [Flash Player/Adobe AIRでのメモリリーク対策まとめ (Flash Builder/Scout編)](https://ics.media/entry/1115/)

JavaScriptだとChromeのデベロッパーツールでも残インスタンスの計測ができます。

-   [JavaScript アプリケーションのメモリー・リークを理解する](http://www.ibm.com/developerworks/jp/web/library/wa-jsmemory/)

[Chromeだと残インスタンスのチェックして、メモリリークチェックができる](https://ics.media/entry/3865/images/53ba71e9a7f8b774831d9e39f6e1c33e.png)

### まとめ

Stage3DとWebGLの違いをまとめてきましたが、コンテンツ制作においては類似の技術であるため、**片方で習得したノウハウやテクニックはもう片方でも同様に応用できる**ことが多々ありました。一例を紹介すると、[私個人のブログClockMaker Blog](http://clockmaker.jp/blog)ではFlashからWebGLへの移植に成功しています。先述の通り両方の技術は実行環境に違いがありますが、**WebGLとStage3Dの両者の技術を使えれば非常に幅広い環境へアウトプットできるようになり、インタラクションデベロッパーの強力な武器となるでしょう**。

\[![Stage3Dで作っているのでIE6でも動作し、WebGLでも作っているのでiPhone/iPadでも動作する](https://ics.media/entry/3865/images/141203_stage3d_and_webgl.jpg)\]

[http://clockmaker.jp/blog/2014/01/away3d-typescript-fire/](http://clockmaker.jp/blog/2014/01/away3d-typescript-fire/)

世論や流行だけで判断するのではなく、エンジニアとしてそれぞれの技術の特性を正しく理解し、最適な使い分けを心がけていきたいところです。ICSではWebGLとStage3Dの両者の技術のそれぞれの長所を活かして、今後も取り組んでいます。

### 最後に

難しい話が多くなってしまいましたが、[WebGLアドベントカレンダー](http://qiita.com/advent-calendar/2014/webgl)の今後も楽しみにしています。